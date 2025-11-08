'use client';

import { useState, useEffect } from 'react';
import { PollData, LiveUpdate } from '@/types/election';
import { generateUpdateId } from '@/lib/election-data';

export default function ElectionAdminPage() {
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedWinner, setSelectedWinner] = useState<'democrat' | 'republican'>('democrat');
  const [updateContent, setUpdateContent] = useState('');
  const [updateType, setUpdateType] = useState<'update' | 'breaking' | 'result'>('update');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Filter to only show toss-up states in the dropdown
  const tossupStates = pollData?.states.filter(s => s.winner === 'tossup') || [];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/election-real-time/data');
      const data = await response.json();
      setPollData(data.pollData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error loading data');
      setLoading(false);
    }
  };

  const handleUpdateState = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pollData || !selectedState) return;

    const updatedStates = pollData.states.map(s => {
      if (s.state === selectedState) {
        return {
          ...s,
          winner: selectedWinner,
        };
      }
      return s;
    });

    // Recalculate electoral votes
    const totalElectoralVotes = updatedStates.reduce(
      (acc, state) => {
        if (state.winner === 'democrat') {
          acc.democrat += state.electoralVotes;
        } else if (state.winner === 'republican') {
          acc.republican += state.electoralVotes;
        }
        return acc;
      },
      { democrat: 0, republican: 0 }
    );

    const updatedPollData: PollData = {
      states: updatedStates,
      totalElectoralVotes,
      lastUpdated: Date.now(),
    };

    try {
      const response = await fetch('/api/election-real-time/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'poll-data',
          data: updatedPollData,
        }),
      });

      if (response.ok) {
        setPollData(updatedPollData);
        setMessage(`Updated ${selectedState}: ${selectedWinner.toUpperCase()}`);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating poll data:', error);
      setMessage('Error updating poll data');
    }
  };

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updateContent.trim()) {
      setMessage('Please enter update content');
      return;
    }

    const newUpdate: LiveUpdate = {
      id: generateUpdateId(),
      timestamp: Date.now(),
      content: updateContent,
      type: updateType,
    };

    try {
      const response = await fetch('/api/election-real-time/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'live-update',
          data: newUpdate,
        }),
      });

      if (response.ok) {
        setUpdateContent('');
        setMessage('Live update added successfully');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error adding live update:', error);
      setMessage('Error adding live update');
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all election data to initial values? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/election-real-time/reset', {
        method: 'POST',
      });

      if (response.ok) {
        await fetchData();
        setMessage('Election data reset to initial values');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error resetting data:', error);
      setMessage('Error resetting data');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EF] text-black p-8 font-serif">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#666666]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EF] text-black p-8 font-serif">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>Election Admin Panel</h1>
        <p className="text-[#666666] mb-8">Update poll results and post live updates</p>

        {message && (
          <div className="mb-6 p-4 bg-[#CD5200] text-white rounded shadow-sm">
            {message}
          </div>
        )}

        {/* Poll Data Updates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>Update State Winner</h2>
          <div className="bg-white border border-[#CCCCCC] rounded shadow-sm p-8">
            {/* Electoral Vote Count */}
            <div className="mb-8 pb-6 border-b border-[#CCCCCC]">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-[#666666]">Current Electoral Count</h3>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-[#CD5200] text-white rounded hover:bg-[#A34100] transition-colors font-semibold text-sm"
                >
                  Reset to Initial Data
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                <div>
                  <span className="text-[#0066CC] text-4xl font-bold" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                    {pollData?.totalElectoralVotes.democrat || 0}
                  </span>
                  <span className="text-[#666666] ml-3 font-medium">Democrat</span>
                </div>
                <div>
                  <span className="text-[#CC0000] text-4xl font-bold" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                    {pollData?.totalElectoralVotes.republican || 0}
                  </span>
                  <span className="text-[#666666] ml-3 font-medium">Republican</span>
                </div>
              </div>
            </div>

            {/* Simple State Update Form */}
            <form onSubmit={handleUpdateState}>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-[#3F4345]">Select Toss-up State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F7F3EF] border border-[#CCCCCC] rounded focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] font-serif"
                  required
                >
                  <option value="">Choose a toss-up state...</option>
                  {tossupStates.map((state) => (
                    <option key={state.stateCode} value={state.state}>
                      {state.state} ({state.electoralVotes} electoral votes)
                    </option>
                  ))}
                </select>
                {tossupStates.length === 0 && (
                  <p className="mt-2 text-sm text-[#666666]">No toss-up states remaining. All states have been called.</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-[#3F4345]">Call Winner</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="winner"
                      value="democrat"
                      checked={selectedWinner === 'democrat'}
                      onChange={() => setSelectedWinner('democrat')}
                      className="sr-only peer"
                    />
                    <div className="border-2 border-[#CCCCCC] rounded p-4 text-center peer-checked:border-[#0066CC] peer-checked:bg-[#0066CC] peer-checked:text-white transition-colors">
                      <span className="font-bold">Democrat</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="winner"
                      value="republican"
                      checked={selectedWinner === 'republican'}
                      onChange={() => setSelectedWinner('republican')}
                      className="sr-only peer"
                    />
                    <div className="border-2 border-[#CCCCCC] rounded p-4 text-center peer-checked:border-[#CC0000] peer-checked:bg-[#CC0000] peer-checked:text-white transition-colors">
                      <span className="font-bold">Republican</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-[#0066CC] text-white rounded hover:bg-[#004D99] transition-colors font-semibold"
                disabled={tossupStates.length === 0}
              >
                Call State for Winner
              </button>
            </form>
          </div>
        </div>

        {/* Live Updates */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>Post Live Update</h2>
          <div className="bg-white border border-[#CCCCCC] rounded shadow-sm p-8">
            <form onSubmit={handleAddUpdate}>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-[#3F4345]">Update Type</label>
                <select
                  value={updateType}
                  onChange={(e) => setUpdateType(e.target.value as 'update' | 'breaking' | 'result')}
                  className="w-full px-4 py-3 bg-[#F7F3EF] border border-[#CCCCCC] rounded focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] font-serif"
                >
                  <option value="update">Regular Update</option>
                  <option value="breaking">Breaking News</option>
                  <option value="result">Result</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-[#3F4345]">Update Content</label>
                <textarea
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F7F3EF] border border-[#CCCCCC] rounded focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] font-serif"
                  rows={5}
                  placeholder="Enter update text..."
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-[#0066CC] text-white rounded hover:bg-[#004D99] transition-colors font-semibold"
              >
                Post Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
