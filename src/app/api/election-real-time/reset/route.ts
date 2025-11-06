import { NextResponse } from 'next/server';
import { redis, REDIS_KEYS } from '@/lib/redis';
import { createInitialPollData, createInitialLiveUpdates } from '@/lib/election-data';
import { revalidateTag } from 'next/cache';

export const runtime = 'edge';

export async function POST() {
  try {
    // Generate fresh initial data
    const initialPollData = createInitialPollData();
    const initialLiveUpdates = createInitialLiveUpdates();

    // Store in Redis
    await redis.set(REDIS_KEYS.POLL_DATA, JSON.stringify(initialPollData));
    await redis.set(REDIS_KEYS.LIVE_UPDATES, JSON.stringify(initialLiveUpdates));
    await redis.set(REDIS_KEYS.LAST_UPDATE_TIME, Date.now());

    // Invalidate cache
    revalidateTag('election-real-time-data');

    // Warm cache with fresh data
    const origin = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    await fetch(`${origin}/api/election-real-time/data`);

    return NextResponse.json({
      success: true,
      message: 'Election data reset to initial values',
    });
  } catch (error) {
    console.error('Error resetting election data:', error);
    return NextResponse.json(
      { error: 'Failed to reset election data' },
      { status: 500 }
    );
  }
}
