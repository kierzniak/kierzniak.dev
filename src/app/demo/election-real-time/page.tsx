'use client';

import { useState, useEffect } from 'react';
import { ElectionData, PollData } from '@/types/election';
import { USElectionMap } from '@/components/election/USElectionMap';
import { LiveUpdatesFeed } from '@/components/election/LiveUpdatesFeed';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EF] text-black flex items-center justify-center font-serif">
        <div className="text-center">
          <div className="animate-pulse text-[#CD5200] text-xl mb-4 font-semibold">Loading election data...</div>
          <div className="text-[#666666]">Connecting to live feed</div>
        </div>
      </div>
    );
  }

  if (error || !data || !pollData) {
    return (
      <div className="min-h-screen bg-[#F7F3EF] text-black flex items-center justify-center font-serif">
        <div className="text-center">
          <div className="text-[#CC0000] text-xl mb-4 font-semibold">Error loading data</div>
          <p className="text-[#666666] mb-4">{error || 'Unknown error occurred'}</p>
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
            Live results and updates • Real-time data
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Electoral Vote Progress Bar */}
        <div className="mb-8 bg-white border border-[#CCCCCC] rounded shadow-sm p-6">
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
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Live Updates Feed (1/4 width) */}
          <div className="lg:col-span-1 bg-white border border-[#CCCCCC] rounded shadow-sm p-6">
            <LiveUpdatesFeed
              initialUpdates={data.liveUpdates}
              onPollDataUpdate={handlePollDataUpdate}
            />
          </div>

          {/* Right Column - Map (3/4 width) */}
          <div className="lg:col-span-3 bg-white border border-[#CCCCCC] rounded shadow-sm p-8">
            <USElectionMap pollData={pollData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#CCCCCC] mt-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#666666] text-sm">
          <p className="font-medium">Demo: Real-time election data with Server-Sent Events</p>
          <p className="mt-2">
            Data updates automatically • Powered by Upstash Redis & Vercel Edge
          </p>
        </div>
      </footer>
    </div>
  );
}
