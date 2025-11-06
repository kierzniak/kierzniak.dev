export interface StateResult {
  state: string;
  stateCode: string;
  electoralVotes: number;
  winner: 'democrat' | 'republican' | 'tossup';
}

export interface PollData {
  totalElectoralVotes: {
    democrat: number;
    republican: number;
  };
  states: StateResult[];
  lastUpdated: number;
}

export interface LiveUpdate {
  id: string;
  timestamp: number;
  content: string;
  imageUrl?: string;
  type: 'update' | 'breaking' | 'result';
}

export interface ElectionData {
  pollData: PollData;
  liveUpdates: LiveUpdate[];
}
