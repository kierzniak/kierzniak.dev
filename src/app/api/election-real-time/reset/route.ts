import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { redis, REDIS_KEYS } from '@/lib/redis';
import { createInitialPollData, createInitialLiveUpdates } from '@/lib/election-data';

export const runtime = 'edge';

export async function POST() {
  try {
    const initialPollData = createInitialPollData();
    const initialLiveUpdates = createInitialLiveUpdates();

    await redis.set(REDIS_KEYS.POLL_DATA, JSON.stringify(initialPollData));
    await redis.set(REDIS_KEYS.LIVE_UPDATES, JSON.stringify(initialLiveUpdates));
    await redis.set(REDIS_KEYS.LAST_UPDATE_TIME, Date.now());

    revalidatePath('/', 'layout');

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
