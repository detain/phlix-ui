/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchIndexBuckets, cache, CACHE_TTL } from './index-buckets';

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

describe('fetchIndexBuckets', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: false });
    vi.setSystemTime(0);
    cache.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    cache.clear();
  });

  it('parses response correctly', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        field: 'name',
        buckets: [
          { key: 'A', label: 'A', offset: 0, count: 3 },
          { key: 'B', label: 'B', offset: 3, count: 1 },
        ],
        total: 4,
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchIndexBuckets('http://x', { field: 'name', libraryId: 'lib-1' });

    expect(result).toEqual({
      field: 'name',
      buckets: [
        { key: 'A', label: 'A', offset: 0, count: 3 },
        { key: 'B', label: 'B', offset: 3, count: 1 },
      ],
      total: 4,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const url = fetchMock.mock.calls[0][0] as string;
    expect(url).toContain('/api/v1/media/index');
    expect(url).toContain('field=name');
    expect(url).toContain('libraryId=lib-1');
    expect(CACHE_TTL).toBe(300_000);
  });

  it('returns empty buckets on 404', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}, false, 404));
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchIndexBuckets('http://x', { field: 'year' });

    expect(result).toEqual({ field: 'year', buckets: [], total: 0 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('returns empty buckets on network error', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('network failure'));
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchIndexBuckets('http://x', { field: 'rating' });

    expect(result).toEqual({ field: 'rating', buckets: [], total: 0 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('uses cache — second call within TTL does not fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ field: 'name', buckets: [{ key: 'A', label: 'A', offset: 0, count: 5 }], total: 5 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const r1 = await fetchIndexBuckets('http://x', { field: 'name', libraryId: 'lib-1' });
    expect(r1.total).toBe(5);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const r2 = await fetchIndexBuckets('http://x', { field: 'name', libraryId: 'lib-1' });
    expect(r2.total).toBe(5);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('cache miss on different libraryId', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ field: 'name', buckets: [{ key: 'A', label: 'A', offset: 0, count: 2 }], total: 2 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await fetchIndexBuckets('http://x', { field: 'name', libraryId: 'lib-1' });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const fetchMock2 = vi.fn().mockResolvedValue(
      jsonResponse({ field: 'name', buckets: [{ key: 'B', label: 'B', offset: 0, count: 7 }], total: 7 }),
    );
    vi.stubGlobal('fetch', fetchMock2);

    await fetchIndexBuckets('http://x', { field: 'name', libraryId: 'lib-2' });
    expect(fetchMock2).toHaveBeenCalledTimes(1);
  });

  it('cache miss on different sort field (rail updates when sort changes)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ field: 'name', buckets: [{ key: 'A', label: 'A', offset: 0, count: 2 }], total: 2 }),
    );
    vi.stubGlobal('fetch', fetchMock);
    await fetchIndexBuckets('http://x', { field: 'name', libraryId: 'lib-1' });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const fetchMock2 = vi.fn().mockResolvedValue(
      jsonResponse({ field: 'year', buckets: [{ key: '2024', label: '2024', offset: 0, count: 7 }], total: 7 }),
    );
    vi.stubGlobal('fetch', fetchMock2);
    // Same library, DIFFERENT field → must re-fetch (not serve the cached name buckets).
    const r = await fetchIndexBuckets('http://x', { field: 'year', libraryId: 'lib-1' });
    expect(fetchMock2).toHaveBeenCalledTimes(1);
    expect(r.field).toBe('year');
  });

  it('cache expires after TTL', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ field: 'name', buckets: [{ key: 'A', label: 'A', offset: 0, count: 3 }], total: 3 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await fetchIndexBuckets('http://x', { field: 'name', libraryId: 'lib-1' });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300_000);

    const fetchMock2 = vi.fn().mockResolvedValue(
      jsonResponse({ field: 'name', buckets: [{ key: 'A', label: 'A', offset: 0, count: 9 }], total: 9 }),
    );
    vi.stubGlobal('fetch', fetchMock2);

    await fetchIndexBuckets('http://x', { field: 'name', libraryId: 'lib-1' });
    expect(fetchMock2).toHaveBeenCalledTimes(1);
  });
});
