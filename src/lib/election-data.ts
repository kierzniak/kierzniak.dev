import { PollData, LiveUpdate, StateResult } from '@/types/election';

// Electoral votes per state (simplified for demo - only showing key swing states + some others)
const ELECTORAL_VOTES: Record<string, number> = {
  'California': 54,
  'Texas': 40,
  'Florida': 30,
  'New York': 28,
  'Pennsylvania': 19,
  'Illinois': 19,
  'Ohio': 17,
  'Georgia': 16,
  'North Carolina': 16,
  'Michigan': 15,
  'Arizona': 11,
  'Wisconsin': 10,
  'Nevada': 6,
};

// US state postal codes
const STATE_CODES: Record<string, string> = {
  'California': 'CA',
  'Texas': 'TX',
  'Florida': 'FL',
  'New York': 'NY',
  'Pennsylvania': 'PA',
  'Illinois': 'IL',
  'Ohio': 'OH',
  'Georgia': 'GA',
  'North Carolina': 'NC',
  'Michigan': 'MI',
  'Arizona': 'AZ',
  'Wisconsin': 'WI',
  'Nevada': 'NV',
};

// Fixed initial state winners
const INITIAL_WINNERS: Record<string, 'democrat' | 'republican' | 'tossup'> = {
  'California': 'democrat',
  'Texas': 'republican',
  'Florida': 'republican',
  'New York': 'democrat',
  'Pennsylvania': 'democrat',
  'Illinois': 'democrat',
  'Ohio': 'republican',
  'Georgia': 'tossup',
  'North Carolina': 'tossup',
  'Michigan': 'democrat',
  'Arizona': 'tossup',
  'Wisconsin': 'tossup',
  'Nevada': 'tossup',
};

export function createInitialPollData(): PollData {
  const states: StateResult[] = Object.entries(ELECTORAL_VOTES).map(([state, electoralVotes]) => {
    return {
      state,
      stateCode: STATE_CODES[state],
      electoralVotes,
      winner: INITIAL_WINNERS[state] || 'tossup',
    };
  });

  // Calculate total electoral votes
  const totalElectoralVotes = states.reduce(
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

  return {
    totalElectoralVotes,
    states,
    lastUpdated: Date.now(),
  };
}

export function createInitialLiveUpdates(): LiveUpdate[] {
  return [
    {
      id: '1',
      timestamp: Date.now() - 300000, // 5 minutes ago
      content: 'Polls are closing across the Eastern United States. Early results starting to come in from key battleground states.',
      type: 'breaking',
    },
    {
      id: '2',
      timestamp: Date.now() - 240000, // 4 minutes ago
      content: 'High voter turnout reported in Pennsylvania, with some precincts reporting wait times of over an hour.',
      type: 'update',
    },
    {
      id: '3',
      timestamp: Date.now() - 180000, // 3 minutes ago
      content: 'First results coming in from Georgia. Early numbers show a tight race.',
      imageUrl: '/placeholder-map.jpg',
      type: 'result',
    },
    {
      id: '4',
      timestamp: Date.now() - 120000, // 2 minutes ago
      content: 'Arizona polls have closed. Officials expect a lengthy count due to high mail-in ballot volume.',
      type: 'update',
    },
    {
      id: '5',
      timestamp: Date.now() - 60000, // 1 minute ago
      content: 'Michigan reporting 15% of precincts. Race remains too close to call.',
      type: 'result',
    },
  ];
}

export function generateUpdateId(): string {
  return `update-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

export function getAllStates(): Array<{ name: string; code: string; electoralVotes: number }> {
  return Object.entries(ELECTORAL_VOTES).map(([name, votes]) => ({
    name,
    code: STATE_CODES[name],
    electoralVotes: votes,
  }));
}
