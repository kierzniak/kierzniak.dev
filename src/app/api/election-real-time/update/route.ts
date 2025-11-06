import { NextRequest, NextResponse } from 'next/server';
import { redis, REDIS_KEYS } from '@/lib/redis';
import { PollData, LiveUpdate } from '@/types/election';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'poll-data') {
      // Update poll data
      const pollData: PollData = data;
      await redis.set(REDIS_KEYS.POLL_DATA, pollData);
      await redis.set(REDIS_KEYS.LAST_UPDATE_TIME, Date.now());

      // Invalidate cache
      await fetch(
        `${request.nextUrl.origin}/api/election-real-time/data/invalidate?key=${process.env.CACHE_INVALIDATION_KEY}`,
        { method: 'POST' }
      );

      // Warm cache with fresh data
      await fetch(`${request.nextUrl.origin}/api/election-real-time/data`);

      return NextResponse.json({
        success: true,
        message: 'Poll data updated successfully',
      });
    } else if (type === 'live-update') {
      // Add a new live update
      const newUpdate: LiveUpdate = data;

      // Get existing updates
      let updates = await redis.get(REDIS_KEYS.LIVE_UPDATES) as LiveUpdate[] || [];

      // Add new update at the beginning
      updates = [newUpdate, ...updates];

      // Keep only the last 50 updates
      if (updates.length > 50) {
        updates = updates.slice(0, 50);
      }

      await redis.set(REDIS_KEYS.LIVE_UPDATES, updates);
      await redis.set(REDIS_KEYS.LAST_UPDATE_TIME, Date.now());

      // Invalidate cache
      await fetch(
        `${request.nextUrl.origin}/api/election-real-time/data/invalidate?key=${process.env.CACHE_INVALIDATION_KEY}`,
        { method: 'POST' }
      );

      // Warm cache with fresh data
      await fetch(`${request.nextUrl.origin}/api/election-real-time/data`);

      return NextResponse.json({
        success: true,
        message: 'Live update added successfully',
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid update type' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error updating election data:', error);
    return NextResponse.json(
      { error: 'Failed to update election data' },
      { status: 500 }
    );
  }
}
