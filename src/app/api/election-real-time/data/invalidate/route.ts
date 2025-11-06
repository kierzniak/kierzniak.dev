import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Get the key from query params
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');

    // Verify the invalidation key
    if (!key || key !== process.env.CACHE_INVALIDATION_KEY) {
      return NextResponse.json(
        { error: 'Invalid or missing invalidation key' },
        { status: 401 }
      );
    }

    // Invalidate the cache tag
    revalidateTag('election-real-time-data');

    // Also send cache purge headers for Vercel
    const response = NextResponse.json({
      success: true,
      message: 'Cache invalidated successfully',
      timestamp: Date.now(),
    });

    // Set cache purge header
    response.headers.set('x-vercel-purge-cache-tags', 'election-real-time-data');

    return response;
  } catch (error) {
    console.error('Error invalidating cache:', error);
    return NextResponse.json(
      { error: 'Failed to invalidate cache' },
      { status: 500 }
    );
  }
}
