/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { ApiClient } from './client';

export interface IndexBucket {
  key: string;
  label: string;
  offset: number;
  count: number;
  ariaLabel?: string;
}

export interface MediaIndexResponse {
  field: string;
  buckets: IndexBucket[];
  total: number;
}

interface CacheEntry {
  data: { field: string; buckets: IndexBucket[]; total: number };
  ts: number;
}

const CACHE_TTL = 300_000;

export { CACHE_TTL };

const cache = new Map<string, CacheEntry>();
export { cache };

/**
 * Cache key MUST include every param that changes the returned buckets — most
 * importantly `field` and `order`, plus the active filters. Keying on
 * `libraryId` alone (the old bug) meant changing the sort (name → year → genre…)
 * returned the previously-cached buckets, so the jump rail never updated.
 */
function cacheKey(params: {
  field: string;
  order?: string;
  libraryId?: string;
  query?: string;
  genres?: string[];
  yearMin?: number;
  yearMax?: number;
  ratings?: number[];
  actors?: string[];
  studios?: string[];
  match?: string;
  topLevel?: boolean;
}): string {
  return JSON.stringify([
    params.libraryId ?? '',
    params.field,
    params.order ?? '',
    params.query ?? '',
    params.genres ?? [],
    params.ratings ?? [],
    params.actors ?? [],
    params.studios ?? [],
    params.yearMin ?? '',
    params.yearMax ?? '',
    params.match ?? '',
    params.topLevel ? 1 : 0,
  ]);
}

async function apiFetch(
  apiBase: string,
  params: {
    field: string;
    order?: string;
    libraryId?: string;
    query?: string;
    genres?: string[];
    yearMin?: number;
    yearMax?: number;
    ratings?: number[];
    actors?: string[];
    studios?: string[];
    match?: string;
    topLevel?: boolean;
  },
  signal?: AbortSignal,
): Promise<{ field: string; buckets: IndexBucket[]; total: number }> {
  const client = new ApiClient({ baseUrl: apiBase });

  const query: Record<string, string> = {};
  query['field'] = params.field;
  if (params.order) query['order'] = params.order;
  if (params.libraryId) query['libraryId'] = params.libraryId;
  if (params.query) query['search'] = params.query;
  if (params.topLevel) query['topLevel'] = '1';
  if (params.yearMin !== undefined) query['yearFrom'] = String(params.yearMin);
  if (params.yearMax !== undefined) query['yearTo'] = String(params.yearMax);
  if (params.match) query['match'] = params.match;
  params.genres?.forEach((g) => query['genres[]'] = g);
  params.ratings?.forEach((r) => query['ratings[]'] = String(r));
  params.actors?.forEach((a) => query['actors[]'] = a);
  params.studios?.forEach((s) => query['companies[]'] = s);

  const data = await client.get<MediaIndexResponse>('/api/v1/media/index', query, signal);
  return {
    field: data.field ?? params.field,
    buckets: Array.isArray(data.buckets) ? data.buckets : [],
    total: typeof data.total === 'number' ? data.total : 0,
  };
}

export async function fetchIndexBuckets(
  apiBase: string,
  params: {
    field: string;
    order?: string;
    libraryId?: string;
    query?: string;
    genres?: string[];
    yearMin?: number;
    yearMax?: number;
    ratings?: number[];
    actors?: string[];
    studios?: string[];
    match?: string;
    topLevel?: boolean;
  },
  signal?: AbortSignal,
): Promise<{ field: string; buckets: IndexBucket[]; total: number }> {
  const key = cacheKey(params);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  try {
    const data = await apiFetch(apiBase, params, signal);
    cache.set(key, { data, ts: Date.now() });
    return data;
  } catch {
    return { field: params.field, buckets: [], total: 0 };
  }
}
