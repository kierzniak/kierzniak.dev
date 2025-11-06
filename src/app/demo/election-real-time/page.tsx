'use client';

import { useState, useEffect } from 'react';
import { ElectionData, PollData } from '@/types/election';
import { USElectionMap } from '@/components/election/USElectionMap';
import { LiveUpdatesFeed } from '@/components/election/LiveUpdatesFeed';
import { MapSkeleton } from '@/components/election/MapSkeleton';
import { LiveUpdatesSkeleton } from '@/components/election/LiveUpdatesSkeleton';

export default function ElectionRealTimePage() {
  const [data, setData] = useState<ElectionData | null>(null);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const response = await fetch('/api/election-real-time/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const electionData: ElectionData = await response.json();
      setData(electionData);
      setPollData(electionData.pollData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setLoading(false);
    }
  };

  const handlePollDataUpdate = (newPollData: PollData) => {
    setPollData(newPollData);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F3EF] text-black flex items-center justify-center font-serif">
        <div className="text-center">
          <div className="text-[#CC0000] text-xl mb-4 font-semibold">Error loading data</div>
          <p className="text-[#666666] mb-4">{error}</p>
          <button
            onClick={fetchInitialData}
            className="px-6 py-2 bg-[#0066CC] text-white rounded hover:bg-[#004D99] transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EF] text-black font-serif">
      {/* Header */}
      <header className="border-b border-[#CCCCCC] bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-5xl font-bold mb-2 tracking-tight leading-tight" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            2024 US Presidential Election
          </h1>
          <p className="text-[#666666] text-base">
            A demonstration of real-time data synchronization using Server-Sent Events (SSE). • Built for demonstration purposes • All data is simulated
          </p>
        </div>
      </header>

      {/* Instructions */}
      <div className="bg-[#FFF9E6] border-b border-[#E5DDB8]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h3 className="font-bold text-[#CD5200] mb-2 text-base" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Interactive Demo: Real-Time Election Updates
          </h3>
          <div className="text-[#666666] text-sm space-y-2 leading-relaxed">
            <p>
              This demo showcases <strong className="text-black">Server-Sent Events (SSE)</strong> for real-time data synchronization.
              To see it in action, open the{' '}
              <a
                href="/demo/election-admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0066CC] font-bold hover:underline"
              >
                admin page
              </a>
              {' '}in a second browser window.
            </p>
            <p>
              On the admin page, you can <strong className="text-black">update state results</strong> by selecting a state and assigning it to Democrat or Republican.
              When you update a state, the <strong className="text-black">map</strong> will highlight it in <strong className="text-[#0066CC]">blue</strong> (Democrat) or <strong className="text-[#CC0000]">red</strong> (Republican),
              and the electoral vote totals will update <strong className="text-black">instantly</strong> through SSE. You can also <strong className="text-black">add live updates</strong> (news posts) on the admin page,
              which will appear immediately in the <strong className="text-black">Live Updates feed</strong> (left sidebar) showing a chronological stream of all changes.
            </p>
            <p className="italic">
              <strong className="text-black">Tip:</strong> Open this page and the Admin page side-by-side to see real-time synchronization in action!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Electoral Vote Progress Bar */}
        <div className="mb-8 bg-white border border-[#CCCCCC] rounded shadow-sm p-6" style={{ height: '174px' }}>
          {loading || !pollData ? (
            <div className="animate-pulse h-full flex flex-col justify-between">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-baseline gap-3">
                  <div className="h-9 w-16 bg-[#CCCCCC] rounded"></div>
                  <div className="h-4 w-20 bg-[#CCCCCC] rounded"></div>
                </div>
                <div className="h-4 w-20 bg-[#CCCCCC] rounded"></div>
                <div className="flex items-baseline gap-3">
                  <div className="h-4 w-20 bg-[#CCCCCC] rounded"></div>
                  <div className="h-9 w-16 bg-[#CCCCCC] rounded"></div>
                </div>
              </div>
              <div className="h-12 bg-[#E5E5E5] rounded-sm"></div>
              <div className="text-center">
                <div className="h-3 w-40 bg-[#CCCCCC] rounded mx-auto"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#0066CC]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                    {pollData.totalElectoralVotes.democrat}
                  </span>
                  <span className="text-sm text-[#666666] font-medium uppercase tracking-wide">Democrat</span>
                </div>
                <div className="text-sm text-[#666666] font-medium">270 to win</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-[#666666] font-medium uppercase tracking-wide">Republican</span>
                  <span className="text-3xl font-bold text-[#CC0000]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                    {pollData.totalElectoralVotes.republican}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-12 bg-[#E5E5E5] rounded-sm overflow-hidden">
                {/* Democrat Side */}
                <div
                  className="absolute left-0 top-0 h-full bg-[#0066CC] transition-all duration-500"
                  style={{ width: `${(pollData.totalElectoralVotes.democrat / 538) * 100}%` }}
                />
                {/* Republican Side */}
                <div
                  className="absolute right-0 top-0 h-full bg-[#CC0000] transition-all duration-500"
                  style={{ width: `${(pollData.totalElectoralVotes.republican / 538) * 100}%` }}
                />
                {/* 270 Marker */}
                <div
                  className="absolute top-0 h-full w-0.5 bg-[#000000] z-10"
                  style={{ left: '50.19%' }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-[#000000] bg-white px-1 rounded">
                    270
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center text-xs text-[#666666]">
                {538 - pollData.totalElectoralVotes.democrat - pollData.totalElectoralVotes.republican} electoral votes remaining
              </div>
            </>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Live Updates Feed (1/4 width) */}
          <div className="lg:col-span-1 bg-white border border-[#CCCCCC] rounded shadow-sm p-6">
            {loading || !data ? (
              <LiveUpdatesSkeleton />
            ) : (
              <LiveUpdatesFeed
                initialUpdates={data.liveUpdates}
                onPollDataUpdate={handlePollDataUpdate}
              />
            )}
          </div>

          {/* Right Column - Map (3/4 width) */}
          <div className="lg:col-span-3 bg-white border border-[#CCCCCC] rounded shadow-sm p-8">
            {loading || !pollData ? (
              <MapSkeleton />
            ) : (
              <USElectionMap pollData={pollData} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#CCCCCC] mt-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <h4 className="font-bold text-[#000000] text-base mb-3" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Real-Time Election Demo
            </h4>
            <p className="text-[#666666] text-sm max-w-2xl mx-auto leading-relaxed">
              A demonstration of real-time data synchronization using Server-Sent Events (SSE).
              This application showcases live updates across multiple clients without polling or WebSockets.
            </p>
          </div>

          <div className="text-center text-[#666666] text-xs border-t border-[#CCCCCC] pt-4">
            <p>Built for demonstration purposes • All data is simulated</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
