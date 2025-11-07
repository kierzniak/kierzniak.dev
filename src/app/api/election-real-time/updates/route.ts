import { redis, REDIS_KEYS } from '@/lib/redis';

export const runtime = 'edge';

// Helper to create SSE message
function createSSEMessage(data: Record<string, unknown>): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function GET() {
  // Create a TransformStream for Server-Sent Events
  const encoder = new TextEncoder();

  let intervalId: NodeJS.Timeout | null = null;
  let isClosed = false;

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(createSSEMessage({ type: 'connected', timestamp: Date.now() }))
      );

      // Store the last known update time
      let lastUpdateTime = await redis.get(REDIS_KEYS.LAST_UPDATE_TIME) || Date.now();

      // Poll Redis every 2 seconds for updates
      intervalId = setInterval(async () => {
        if (isClosed) {
          if (intervalId) clearInterval(intervalId);
          return;
        }

        try {
          const currentUpdateTime = await redis.get(REDIS_KEYS.LAST_UPDATE_TIME);

          // If update time changed, send new data
          if (currentUpdateTime && currentUpdateTime !== lastUpdateTime) {
            lastUpdateTime = currentUpdateTime;

            // Fetch latest data
            const pollData = await redis.get(REDIS_KEYS.POLL_DATA);
            const liveUpdates = await redis.get(REDIS_KEYS.LIVE_UPDATES);

            // Send update
            controller.enqueue(
              encoder.encode(
                createSSEMessage({
                  type: 'update',
                  timestamp: Date.now(),
                  data: {
                    pollData,
                    liveUpdates,
                  },
                })
              )
            );
          }

          // Send heartbeat every interval
          controller.enqueue(
            encoder.encode(createSSEMessage({ type: 'heartbeat', timestamp: Date.now() }))
          );
        } catch {
          // Silently handle errors
        }
      }, 2000);
    },
    cancel() {
      isClosed = true;
      if (intervalId) {
        clearInterval(intervalId);
      }
    },
  });

  // Return response with SSE headers
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
