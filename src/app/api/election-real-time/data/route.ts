import { redis, REDIS_KEYS } from '@/lib/redis';
import { createInitialPollData, createInitialLiveUpdates } from '@/lib/election-data';
import { ElectionData, PollData, LiveUpdate } from '@/types/election';

export const runtime = 'edge';

export async function GET() {
  try {
    let pollData = await redis.get(REDIS_KEYS.POLL_DATA);
    let liveUpdates = await redis.get(REDIS_KEYS.LIVE_UPDATES);

    if (!pollData) {
      pollData = createInitialPollData();
      await redis.set(REDIS_KEYS.POLL_DATA, pollData);
    }

    if (!liveUpdates) {
      liveUpdates = createInitialLiveUpdates();
      await redis.set(REDIS_KEYS.LIVE_UPDATES, liveUpdates);
    }

    const data: ElectionData = {
      pollData: pollData as PollData,
      liveUpdates: liveUpdates as LiveUpdate[],
    };

    return Response.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching election data:', error);
    return Response.json(
      { error: 'Failed to fetch election data' },
      { status: 500 }
    );
  }
}
