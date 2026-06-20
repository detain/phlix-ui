import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMediaStore } from './useMediaStore';
import type { MediaItem } from '../types/media-item';

function makeItems(prefix: string, n: number): MediaItem[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `${prefix}-${i}`,
    name: `${prefix} ${i}`,
    type: 'movie',
    poster_url: null,
    genres: [],
    year: 2000 + i,
    rating: null,
    runtime: null,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
  }));
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fetchMock: any;
let signals: AbortSignal[];

beforeEach(() => {
  setActivePinia(createPinia());
  signals = [];
  fetchMock = vi.fn((_url: string, init?: RequestInit) => {
    if (init?.signal) signals.push(init.signal);
    return Promise.resolve(jsonResponse({ items: makeItems('a', 3), total: 30, limit: 24, offset: 0 }));
  });
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('useMediaStore — fetch + cache', () => {
  it('fetches and populates items/total', async () => {
    const s = useMediaStore();
    await s.fetchMedia('');
    expect(s.items).toHaveLength(3);
    expect(s.total).toBe(30);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('serves an identical query from cache (no second network call)', async () => {
    const s = useMediaStore();
    await s.fetchMedia('');
    await s.fetchMedia('');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('refetches when a filter changes (different cache key)', async () => {
    const s = useMediaStore();
    await s.fetchMedia('');
    s.setGenres(['Sci-Fi']);
    await s.fetchMedia('');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('expires the cache after TTL', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const s = useMediaStore();
    await s.fetchMedia('');
    vi.setSystemTime(61_000); // > 60s TTL
    await s.fetchMedia('');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('clearCache forces a refetch', async () => {
    const s = useMediaStore();
    await s.fetchMedia('');
    s.clearCache();
    await s.fetchMedia('');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe('useMediaStore — dedupe + abort', () => {
  it('dedupes concurrent identical queries into one network call', async () => {
    const s = useMediaStore();
    await Promise.all([s.fetchMedia(''), s.fetchMedia('')]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('aborts a superseded query and keeps the latest result', async () => {
    // first call hangs; second (different filter) supersedes + resolves
    let resolveFirst: (r: Response) => void = () => {};
    fetchMock.mockImplementationOnce((_url: string, init?: RequestInit) => {
      if (init?.signal) signals.push(init.signal);
      return new Promise<Response>((res) => (resolveFirst = res));
    });
    const s = useMediaStore();
    const p1 = s.fetchMedia(''); // hangs, tracked as active
    s.setGenres(['Drama']);
    const p2 = s.fetchMedia(''); // supersedes → aborts the first
    await p2;
    expect(signals[0].aborted).toBe(true); // first was aborted
    expect(s.items.map((i) => i.id)).toEqual(['a-0', 'a-1', 'a-2']);
    resolveFirst(jsonResponse({ items: makeItems('STALE', 5), total: 5, limit: 24, offset: 0 }));
    await p1;
    // stale resolution must NOT clobber the latest state
    expect(s.total).toBe(30);
  });
});

describe('useMediaStore — debounce + prefetch + loadMore', () => {
  it('scheduleFetch debounces to one call per pause', async () => {
    vi.useFakeTimers();
    const s = useMediaStore();
    s.setSearch('a'); s.scheduleFetch('', 250);
    s.setSearch('ab'); s.scheduleFetch('', 250);
    s.setSearch('abc'); s.scheduleFetch('', 250);
    expect(fetchMock).toHaveBeenCalledTimes(0);
    await vi.advanceTimersByTimeAsync(250);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('a fetch that dedupes onto an in-flight prefetch still applies + clears loading', async () => {
    // prefetch holds the request open; the click-fetch arrives for the SAME key
    let resolveIt: (r: Response) => void = () => {};
    fetchMock.mockImplementationOnce((_url: string, init?: RequestInit) => {
      if (init?.signal) signals.push(init.signal);
      return new Promise<Response>((res) => (resolveIt = res));
    });
    const s = useMediaStore();
    const pf = s.prefetch(''); // track=false, registers inflight
    const main = s.fetchMedia(''); // dedupes onto the prefetch, but must adopt active
    resolveIt(jsonResponse({ items: makeItems('z', 4), total: 12, limit: 24, offset: 0 }));
    await Promise.all([pf, main]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(s.items).toHaveLength(4);
    expect(s.loading).toBe(false); // not stuck
  });

  it('loadMore serves a prefetched next page from cache (no extra call)', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ items: makeItems('p1', 3), total: 6, limit: 3, offset: 0 }))
      .mockResolvedValueOnce(jsonResponse({ items: makeItems('p2', 3), total: 6, limit: 3, offset: 3 }));
    const s = useMediaStore();
    s.limit = 3;
    await s.fetchMedia('');
    await s.prefetch('', { offset: 3 }); // warm page 2
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await s.loadMore(''); // from cache
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(s.items).toHaveLength(6);
  });

  it('prefetch warms the cache so the next fetch is free', async () => {
    const s = useMediaStore();
    await s.prefetch('', { offset: 24 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    s.offset = 24;
    await s.fetchMedia(''); // served from the prefetched cache
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('loadMore appends the next page', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ items: makeItems('p1', 3), total: 6, limit: 3, offset: 0 }))
      .mockResolvedValueOnce(jsonResponse({ items: makeItems('p2', 3), total: 6, limit: 3, offset: 3 }));
    const s = useMediaStore();
    s.limit = 3;
    await s.fetchMedia('');
    expect(s.hasMore).toBe(true);
    await s.loadMore('');
    expect(s.items).toHaveLength(6);
    expect(s.hasMore).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe('useMediaStore — URL sync', () => {
  it('toQuery / applyQuery round-trip filters (paging omitted)', () => {
    const s = useMediaStore();
    s.setSearch('dune');
    s.setGenres(['Sci-Fi', 'Drama']);
    s.setRatings(['PG-13']);
    s.setYearRange(2000, 2024);
    s.setSort('year', 'desc');
    const q = s.toQuery();
    expect(q).toEqual({
      search: 'dune',
      genres: ['Sci-Fi', 'Drama'],
      ratings: ['PG-13'],
      yearFrom: '2000',
      yearTo: '2024',
      sort: 'year',
      order: 'desc',
    });
    // apply onto a fresh store in a new pinia
    setActivePinia(createPinia());
    const s3 = useMediaStore();
    s3.applyQuery(q);
    expect(s3.search).toBe('dune');
    expect(s3.selectedGenres).toEqual(['Sci-Fi', 'Drama']);
    expect(s3.selectedRatings).toEqual(['PG-13']);
    expect(s3.yearFrom).toBe(2000);
    expect(s3.yearTo).toBe(2024);
    expect(s3.sort).toBe('year');
    expect(s3.order).toBe('desc');
  });

  it('applyQuery normalizes a single-value query param into an array', () => {
    const s = useMediaStore();
    s.applyQuery({ genres: 'Action' });
    expect(s.selectedGenres).toEqual(['Action']);
  });

  it('round-trips match status + actors through toQuery/applyQuery and queryParams', () => {
    const s = useMediaStore();
    s.setMatchStatus('unmatched');
    s.setActors(['Tom Hanks']);
    expect(s.queryParams.match).toBe('unmatched');
    expect(s.queryParams.actors).toEqual(['Tom Hanks']);
    const q = s.toQuery();
    expect(q.match).toBe('unmatched');
    expect(q.actors).toEqual(['Tom Hanks']);

    setActivePinia(createPinia());
    const s2 = useMediaStore();
    s2.applyQuery({ match: 'matched', actors: 'Sigourney Weaver' });
    expect(s2.matchStatus).toBe('matched');
    expect(s2.selectedActors).toEqual(['Sigourney Weaver']);
    expect(s2.queryParams.match).toBe('matched');
  });

  it('ignores an invalid match value', () => {
    const s = useMediaStore();
    s.applyQuery({ match: 'bogus' });
    expect(s.matchStatus).toBe('');
    expect(s.queryParams.match).toBeUndefined();
  });
});

describe('useMediaStore — topLevel scope', () => {
  it('adds topLevel=1 to the request URL when set', async () => {
    const s = useMediaStore();
    s.setTopLevel(true);
    await s.fetchMedia('');
    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain('topLevel=1');
  });

  it('omits topLevel from the URL by default', async () => {
    const s = useMediaStore();
    await s.fetchMedia('');
    expect(String(fetchMock.mock.calls[0][0])).not.toContain('topLevel');
  });

  it('exposes topLevel in queryParams only when true', () => {
    const s = useMediaStore();
    expect(s.queryParams.topLevel).toBeUndefined();
    s.setTopLevel(true);
    expect(s.queryParams.topLevel).toBe(true);
  });

  it('setTopLevel resets paging and changes the cache key (forces a refetch)', async () => {
    const s = useMediaStore();
    s.offset = 24;
    await s.fetchMedia('');
    s.setTopLevel(true);
    expect(s.offset).toBe(0);
    await s.fetchMedia('');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('setTopLevel is a no-op when the value is unchanged', () => {
    const s = useMediaStore();
    s.offset = 12;
    s.setTopLevel(false); // already false
    expect(s.offset).toBe(12); // paging untouched
  });
});
