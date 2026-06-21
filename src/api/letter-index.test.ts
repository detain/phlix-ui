import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchLetterIndex } from './letter-index';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('fetchLetterIndex', () => {
  it('hits the letter-index endpoint with the query filters and parses buckets', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        letters: [
          { letter: 'A', offset: 0, count: 3 },
          { letter: 'B', offset: 3, count: 1 },
        ],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchLetterIndex('http://x', { match: 'unmatched', libraryId: 'lib-1' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const url = fetchMock.mock.calls[0][0] as string;
    expect(url).toContain('/api/v1/media/letter-index?');
    expect(url).toContain('match=unmatched');
    expect(url).toContain('libraryId=lib-1');
    expect(result).toEqual([
      { letter: 'A', offset: 0, count: 3 },
      { letter: 'B', offset: 3, count: 1 },
    ]);
  });

  it('returns [] on a non-ok response, a throw, or a non-array body', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));
    expect(await fetchLetterIndex('http://x', {})).toEqual([]);

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    expect(await fetchLetterIndex('http://x', {})).toEqual([]);

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ letters: 'nope' }) }));
    expect(await fetchLetterIndex('http://x', {})).toEqual([]);
  });

  it('drops malformed buckets', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ letters: [{ letter: 'A', offset: 0, count: 3 }, null, { offset: 1 }, 'x'] }),
    }));
    expect(await fetchLetterIndex('http://x', {})).toEqual([{ letter: 'A', offset: 0, count: 3 }]);
  });
});
