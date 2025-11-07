'use cache'
import { cacheTag, cacheLife } from 'next/cache'
import { redis, REDIS_KEYS } from '@/lib/redis';
import { createInitialPollData, createInitialLiveUpdates } from '@/lib/election-data';
import { ElectionData, PollData, LiveUpdate } from '@/types/election';

export default async function ElectionDataPage() {
  cacheLife('minutes');
  cacheTag('election-pool-data');

  // Fetch data from Redis
  let pollData = await redis.get(REDIS_KEYS.POLL_DATA);
  let liveUpdates = await redis.get(REDIS_KEYS.LIVE_UPDATES);
  const lastUpdateTime = await redis.get(REDIS_KEYS.LAST_UPDATE_TIME);

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

  const now = new Date().toISOString();
  const lastUpdate = lastUpdateTime ? new Date(lastUpdateTime as number).toISOString() : 'Never';

  return (
    <div className="min-h-screen bg-[#F7F3EF] text-black font-serif">
      <header className="border-b border-[#CCCCCC] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Election Data Cache Test
          </h1>
          <p className="text-[#666666] text-base">
            Testing Next.js &apos;use cache&apos; directive with cacheTag and cacheLife
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Cache Info */}
        <div className="bg-[#FFF9E6] border border-[#E5DDB8] rounded p-6 mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Cache Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-bold text-[#CD5200]">Cache Tag:</div>
              <div className="text-[#666666]">election-pool-data</div>
            </div>
            <div>
              <div className="font-bold text-[#CD5200]">Cache Life:</div>
              <div className="text-[#666666]">minutes</div>
            </div>
            <div>
              <div className="font-bold text-[#CD5200]">Cache Directive:</div>
              <div className="text-[#666666]">&apos;use cache&apos;</div>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-white border border-[#CCCCCC] rounded p-6 mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Timestamps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-bold text-[#000000]">Page Rendered At:</div>
              <div className="text-[#666666] font-mono">{now}</div>
            </div>
            <div>
              <div className="font-bold text-[#000000]">Last Data Update:</div>
              <div className="text-[#666666] font-mono">{lastUpdate}</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-[#F7F3EF] rounded text-xs text-[#666666]">
            If this page is cached, &quot;Page Rendered At&quot; will remain the same across refreshes until cache is invalidated.
            Use the Admin page to update data and trigger revalidateTag(&apos;election-pool-data&apos;).
          </div>
        </div>

        {/* Election Data */}
        <div className="bg-white border border-[#CCCCCC] rounded p-6">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Election Data (JSON)
          </h2>
          <pre className="bg-[#F7F3EF] p-4 rounded overflow-x-auto text-xs font-mono text-[#000000] leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        {/* Testing Instructions */}
        <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-6 mt-8">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Testing Instructions
          </h2>
          <ol className="text-sm text-[#666666] space-y-2 list-decimal list-inside">
            <li>Note the &quot;Page Rendered At&quot; timestamp above</li>
            <li>Refresh this page multiple times - timestamp should stay the same (cached)</li>
            <li>Go to the Admin page and update state data or add a live update</li>
            <li>The update route calls revalidateTag(&apos;election-pool-data&apos;)</li>
            <li>Refresh this page - timestamp should update (cache invalidated)</li>
            <li>Compare this behavior with /api/election-real-time/data (no cache)</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
