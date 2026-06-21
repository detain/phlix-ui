import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchLibraries, sortLibraries, type LibrarySummary } from './libraries';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('sortLibraries', () => {
  it('orders by display_order asc, then name (case-insensitive)', () => {
    const list: LibrarySummary[] = [
      { id: '3', name: 'anime', type: 'series', display_order: 2 },
      { id: '1', name: 'Movies', type: 'movie', display_order: 0 },
      { id: '2', name: 'TV', type: 'series', display_order: 1 },
    ];
    expect(sortLibraries(list).map((l) => l.id)).toEqual(['1', '2', '3']);
  });

  it('sorts libraries without a display_order last, by name', () => {
    const list: LibrarySummary[] = [
      { id: 'b', name: 'Books', type: 'video' },
      { id: 'm', name: 'Movies', type: 'movie', display_order: 5 },
      { id: 'a', name: 'Audiobooks', type: 'video' },
    ];
    expect(sortLibraries(list).map((l) => l.id)).toEqual(['m', 'a', 'b']);
  });

  it('ignores a leading article in the name tiebreak ("The Classics" files under C)', () => {
    const list: LibrarySummary[] = [
      { id: 'd', name: 'Documentaries', type: 'movie' },
      { id: 'c', name: 'The Classics', type: 'movie' },
      { id: 'b', name: 'Anime', type: 'series' },
    ];
    // No display_order on any → sort by article-stripped name: Anime, [The] Classics, Documentaries.
    expect(sortLibraries(list).map((l) => l.id)).toEqual(['b', 'c', 'd']);
  });

  it('does not mutate the input array', () => {
    const list: LibrarySummary[] = [
      { id: '2', name: 'B', type: 'movie', display_order: 1 },
      { id: '1', name: 'A', type: 'movie', display_order: 0 },
    ];
    const copy = [...list];
    sortLibraries(list);
    expect(list).toEqual(copy);
  });
});

describe('fetchLibraries', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('requests /api/v1/libraries and returns the sorted list', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        libraries: [
          { id: 'tv', name: 'TV', type: 'series', display_order: 1 },
          { id: 'mv', name: 'Movies', type: 'movie', display_order: 0 },
        ],
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchLibraries('');
    expect(result.map((l) => l.id)).toEqual(['mv', 'tv']);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain('/api/v1/libraries');
  });

  it('degrades a malformed payload to an empty list', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({})));
    expect(await fetchLibraries('')).toEqual([]);
  });
});
