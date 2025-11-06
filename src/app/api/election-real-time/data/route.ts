import { NextResponse } from 'next/server';
import { redis, REDIS_KEYS } from '@/lib/redis';
import { createInitialPollData, createInitialLiveUpdates } from '@/lib/election-data';
import { ElectionData, PollData, LiveUpdate } from '@/types/election';

export const runtime = 'edge';

export async function GET() {
  try {
    // Try to get data from Redis
    let pollData = await redis.get(REDIS_KEYS.POLL_DATA);
    let liveUpdates = await redis.get(REDIS_KEYS.LIVE_UPDATES);

    // If no data exists, initialize with mock data
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

    // Create response with CDN cache headers
    const response = NextResponse.json(data);

    // Cache for 24 hours with stale-while-revalidate
    // Use cache tag for selective invalidation
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=172800'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=86400');

    // Set cache tags for Vercel
    response.headers.set('Cache-Tag', 'election-real-time-data');

    return response;
  } catch (error) {
    console.error('Error fetching election data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch election data' },
      { status: 500 }
    );
  }
}
