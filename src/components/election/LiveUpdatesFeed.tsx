'use client';

import { useEffect, useState } from 'react';
import { LiveUpdate, PollData } from '@/types/election';
import { UpdateCard } from './UpdateCard';

interface LiveUpdatesFeedProps {
  initialUpdates: LiveUpdate[];
  onPollDataUpdate?: (pollData: PollData) => void;
}

export function LiveUpdatesFeed({ initialUpdates, onPollDataUpdate }: LiveUpdatesFeedProps) {
  const [updates, setUpdates] = useState<LiveUpdate[]>(initialUpdates);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  useEffect(() => {
    // Create EventSource for SSE
    const eventSource = new EventSource('/api/election-real-time/updates');

    eventSource.onopen = () => {
      setConnectionStatus('connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'connected') {
          setConnectionStatus('connected');
        } else if (message.type === 'update' && message.data) {
          // Update both poll data and live updates
          if (message.data.pollData && onPollDataUpdate) {
            onPollDataUpdate(message.data.pollData);
          }
          if (message.data.liveUpdates) {
            setUpdates(message.data.liveUpdates);
          }
        } else if (message.type === 'heartbeat') {
          // Keep connection alive
        }
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    eventSource.onerror = () => {
      setConnectionStatus('disconnected');
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only connect once on mount

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#CCCCCC]">
        <h2 className="text-lg font-bold font-serif" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>Live Updates</h2>
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected'
                ? 'bg-[#00AA00] animate-pulse'
                : connectionStatus === 'connecting'
                ? 'bg-[#CD5200] animate-pulse'
                : 'bg-[#CC0000]'
            }`}
          />
          <span className="text-xs text-[#666666] font-serif font-medium">
            {connectionStatus === 'connected'
              ? 'Live'
              : connectionStatus === 'connecting'
              ? 'Connecting...'
              : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="space-y-0">
        {updates.length === 0 ? (
          <p className="text-[#666666] font-serif text-sm">No updates yet</p>
        ) : (
          updates.map((update) => <UpdateCard key={update.id} update={update} />)
        )}
      </div>
    </div>
  );
}
