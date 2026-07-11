/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

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

  it('round-trips companies through setCompanies/queryParams/toQuery/applyQuery and the URL', async () => {
    const s = useMediaStore();
    s.setCompanies(['Legendary']);
    expect(s.selectedCompanies).toEqual(['Legendary']);
    expect(s.queryParams.companies).toEqual(['Legendary']);
    const q = s.toQuery();
    expect(q.companies).toEqual(['Legendary']);

    setActivePinia(createPinia());
    const s2 = useMediaStore();
    s2.applyQuery({ companies: 'A24' });
    expect(s2.selectedCompanies).toEqual(['A24']);
    expect(s2.queryParams.companies).toEqual(['A24']);

    // and it reaches the request URL as `companies[]=`
    await s2.fetchMedia('');
    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toMatch(/companies(\[\]|%5B%5D)=A24/);
  });

  it('ignores an invalid match value', () => {
    const s = useMediaStore();
    s.applyQuery({ match: 'bogus' });
    expect(s.matchStatus).toBe('');
    expect(s.queryParams.match).toBeUndefined();
  });

  it('sends match + actors in the request URL — not just in queryParams', async () => {
    // Regression: the store serialized requests with a duplicated local builder
    // that dropped `match` and `actors`, so the grid query never carried them
    // (server returned the full, unfiltered set) even though queryParams had them.
    const s = useMediaStore();
    s.setMatchStatus('unmatched');
    s.setActors(['Tom Hanks']);
    await s.fetchMedia('');
    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain('match=unmatched');
    expect(url).toMatch(/actors(\[\]|%5B%5D)=Tom/);
  });

  it('gives matched vs unmatched DIFFERENT cache keys (a toggle refetches)', async () => {
    const s = useMediaStore();
    s.setMatchStatus('unmatched');
    await s.fetchMedia('');
    s.setMatchStatus('matched');
    await s.fetchMedia('');
    // Distinct match values must hit the network distinctly (no cache collision).
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[0][0])).toContain('match=unmatched');
    expect(String(fetchMock.mock.calls[1][0])).toContain('match=matched');
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

describe('useMediaStore — ensureRange (random-access paging / A-Z jump)', () => {
  /** A fetch mock that tags returned items with the requested offset, so a page
   *  placed at an absolute index can be identified. */
  function offsetAware() {
    return vi.fn((url: string) => {
      const off = Number(/[?&]offset=(\d+)/.exec(url)?.[1] ?? 0);
      return Promise.resolve(jsonResponse({ items: makeItems(`o${off}`, 3), total: 30, limit: 3, offset: off }));
    });
  }

  it('fetches the page AT the jumped-to offset and places it at the absolute index', async () => {
    fetchMock = offsetAware();
    vi.stubGlobal('fetch', fetchMock);
    const s = useMediaStore();
    s.limit = 3;
    await s.fetchMedia(''); // page 0 → items[0..2]
    expect(s.items[0]?.id).toBe('o0-0');

    await s.ensureRange('', 9, 12); // "jump" to index 9 → page at offset 9
    expect(s.items[9]?.id).toBe('o9-0'); // placed at its ABSOLUTE index, not appended
    expect(s.items[11]?.id).toBe('o9-2');
    expect(s.items[3]).toBeUndefined(); // the un-scrolled gap stays a skeleton
  });

  it('skips pages already loaded — no duplicate network calls', async () => {
    fetchMock = offsetAware();
    vi.stubGlobal('fetch', fetchMock);
    const s = useMediaStore();
    s.limit = 3;
    await s.fetchMedia(''); // 1 call (page 0)
    await s.ensureRange('', 0, 3); // page 0 already loaded → no fetch
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await s.ensureRange('', 9, 12); // page 9 → 1 fetch
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await s.ensureRange('', 9, 12); // already present → no fetch
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not exceed total when the window runs past the end', async () => {
    fetchMock = offsetAware();
    vi.stubGlobal('fetch', fetchMock);
    const s = useMediaStore();
    s.limit = 3;
    await s.fetchMedia(''); // total = 30
    await s.ensureRange('', 28, 60); // clamps to the last page (offset 27)
    expect(s.items[27]?.id).toBe('o27-0');
    // never requested an offset >= total (30)
    const requested = fetchMock.mock.calls.map((c: [string]) => Number(/[?&]offset=(\d+)/.exec(c[0])?.[1] ?? 0));
    expect(Math.max(...requested)).toBeLessThan(30);
  });
});

describe('useMediaStore — facets', () => {
  it('loadFacets populates serverFacets and availableGenres from the server', async () => {
    // Build the mock so first call (media items) returns items, second (facets) returns facets
    let callCount = 0;
    fetchMock.mockImplementation((_url: string) => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve(jsonResponse({ items: makeItems('a', 3), total: 30, limit: 24, offset: 0 }));
      }
      return Promise.resolve(jsonResponse({ genres: ['Sci-Fi', 'Drama', 'Comedy', 'Horror'] }));
    });
    const s = useMediaStore();
    s.reset();
    expect(s.serverFacets).toBeNull(); // Initial state
    await s.fetchMedia('');
    await s.loadFacets('');
    expect(callCount).toBe(2);
    expect(s.serverFacets).toEqual({ genres: ['Sci-Fi', 'Drama', 'Comedy', 'Horror'] });
    expect(s.availableGenres).toEqual(['Comedy', 'Drama', 'Horror', 'Sci-Fi']);
  });

  it('availableGenres falls back to derived genres when facets endpoint is absent (404)', async () => {
    let callCount = 0;
    fetchMock.mockImplementation((_url: string) => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve(jsonResponse({ items: makeItems('a', 3), total: 30, limit: 24, offset: 0 }));
      }
      return Promise.resolve(new Response(null, { status: 404 }));
    });
    const s = useMediaStore();
    s.reset();
    await s.fetchMedia('');
    // Simulate items with genres in the loaded items
    s.items[0] = { ...s.items[0], genres: ['Action', 'Thriller'] };
    s.items[1] = { ...s.items[1], genres: ['Comedy'] };
    s.items[2] = { ...s.items[2], genres: ['Drama'] };
    await s.loadFacets('');
    expect(s.serverFacets).toBeNull();
    expect(s.availableGenres).toEqual(['Action', 'Comedy', 'Drama', 'Thriller']);
  });

  it('loadFacets caches results and does not re-fetch within TTL', async () => {
    let facetsCalls = 0;
    fetchMock.mockImplementation((url: string) => {
      if (url.includes('/media/facets')) facetsCalls++;
      return Promise.resolve(jsonResponse({ genres: ['Sci-Fi'] }));
    });
    const s = useMediaStore();
    s.reset();
    await s.fetchMedia('');
    await s.loadFacets('');
    await s.loadFacets('');
    expect(facetsCalls).toBe(1);
  });

  it('loadFacets includes libraryId in the request when set', async () => {
    let capturedUrl: string | undefined;
    fetchMock.mockImplementation((url: string) => {
      if (url.includes('/media/facets')) capturedUrl = url;
      return Promise.resolve(jsonResponse({ genres: ['Sci-Fi'] }));
    });
    const s = useMediaStore();
    s.reset();
    s.setLibraryId('lib-123');
    await s.loadFacets('');
    expect(capturedUrl).toContain('libraryId=lib-123');
  });
});

describe('useMediaStore — setSort per-field defaults', () => {
  it('sets name→asc by default', () => {
    const store = useMediaStore();
    store.setSort('name');
    expect(store.sort).toBe('name');
    expect(store.order).toBe('asc');
  });

  it('sets year→desc by default', () => {
    const store = useMediaStore();
    store.setSort('year');
    expect(store.sort).toBe('year');
    expect(store.order).toBe('desc');
  });

  it('sets rating→desc by default', () => {
    const store = useMediaStore();
    store.setSort('rating');
    expect(store.order).toBe('desc');
  });

  it('sets runtime→desc by default', () => {
    const store = useMediaStore();
    store.setSort('runtime');
    expect(store.order).toBe('desc');
  });

  it('sets date_added→desc by default', () => {
    const store = useMediaStore();
    store.setSort('date_added');
    expect(store.order).toBe('desc');
  });

  it('honors explicit order', () => {
    const store = useMediaStore();
    store.setSort('name', 'desc');
    expect(store.order).toBe('desc');
  });

  it('resets offset', () => {
    const store = useMediaStore();
    store.offset = 50;
    store.setSort('year');
    expect(store.offset).toBe(0);
  });
});

describe('useMediaStore — LRU cache eviction', () => {
  it('cache size stays at 100 after adding 101+ entries', async () => {
    const store = useMediaStore();
    store.limit = 3;

    // Set up mock that returns unique content per call (by checking call order)
    let callCount = 0;
    fetchMock.mockImplementation((_url: string) => {
      const i = callCount++;
      return Promise.resolve(jsonResponse({ items: makeItems(`offset${i}`, 3), total: 303, limit: 3, offset: i * 3 }));
    });

    // Fill cache with 101 entries via prefetch (each with a unique offset → unique cache key)
    for (let i = 0; i < 101; i++) {
      await store.prefetch('', { offset: i * 3 });
    }

    expect(store.cache.size).toBe(100);
  });

  it('oldest entry (first inserted) is evicted when cache exceeds max capacity', async () => {
    const store = useMediaStore();
    store.limit = 3;

    // Capture the first cache key that will be inserted (offset=0)
    const firstKey = store.cacheKey({ ...store.queryParams, offset: 0 });

    // Set up mock that returns unique content per call
    let callCount = 0;
    fetchMock.mockImplementation((_url: string) => {
      const i = callCount++;
      return Promise.resolve(jsonResponse({ items: makeItems(`offset${i}`, 3), total: 303, limit: 3, offset: i * 3 }));
    });

    // Fill cache with 101 entries
    for (let i = 0; i < 101; i++) {
      await store.prefetch('', { offset: i * 3 });
    }

    // The first-inserted key must have been evicted (LRU: oldest removed)
    expect(store.cache.has(firstKey)).toBe(false);

    // The most recent entry (offset=300) should still be in cache
    const lastKey = store.cacheKey({ ...store.queryParams, offset: 300 });
    expect(store.cache.has(lastKey)).toBe(true);
  });
});
