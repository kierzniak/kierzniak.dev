import { Redis } from '@upstash/redis';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error(
    'KV_REST_API_URL and KV_REST_API_TOKEN must be defined in environment variables'
  );
}

export const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Redis keys for the election demo
export const REDIS_KEYS = {
  POLL_DATA: 'election:poll-data',
  LIVE_UPDATES: 'election:live-updates',
  LAST_UPDATE_TIME: 'election:last-update',
} as const;
