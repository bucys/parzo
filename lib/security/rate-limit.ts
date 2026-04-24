const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

type MemoryBucket = {
  count: number;
  reset: number;
};

declare global {
  // Persist lightweight fallback buckets across hot reloads in development.
  var __parzoRateLimitBuckets: Map<string, MemoryBucket> | undefined;
}

const memoryBuckets = globalThis.__parzoRateLimitBuckets ?? new Map<string, MemoryBucket>();

if (!globalThis.__parzoRateLimitBuckets) {
  globalThis.__parzoRateLimitBuckets = memoryBuckets;
}

function getFallbackBucket(key: string, limit: number): RateLimitResult {
  const now = Date.now();
  const existing = memoryBuckets.get(key);

  if (!existing || existing.reset <= now) {
    const reset = now + RATE_LIMIT_WINDOW_SECONDS * 1000;
    memoryBuckets.set(key, { count: 1, reset });
    return { allowed: true, limit, remaining: limit - 1, reset };
  }

  existing.count += 1;
  memoryBuckets.set(key, existing);

  return {
    allowed: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    reset: existing.reset,
  };
}

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    return null;
  }

  return { url: url.replace(/\/+$/, ''), token };
}

export async function applyRateLimit(identifier: string, limit: number): Promise<RateLimitResult> {
  const key = `rate_limit:extract-invoice:${identifier}`;
  const upstash = getUpstashConfig();

  if (!upstash) {
    return getFallbackBucket(key, limit);
  }

  try {
    const response = await fetch(`${upstash.url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${upstash.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, RATE_LIMIT_WINDOW_SECONDS, 'NX'],
        ['TTL', key],
      ]),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Upstash responded with ${response.status}`);
    }

    const json = (await response.json()) as Array<{ result?: number | string | null }>;
    const count = Number(json[0]?.result ?? 0);
    const ttlSeconds = Number(json[2]?.result ?? RATE_LIMIT_WINDOW_SECONDS);
    const reset = Date.now() + Math.max(0, ttlSeconds) * 1000;

    return {
      allowed: count <= limit,
      limit,
      remaining: Math.max(0, limit - count),
      reset,
    };
  } catch {
    return getFallbackBucket(key, limit);
  }
}
