import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchLetterIndex } from './letter-index';
import { ACCESS_TOKEN_KEY } from './tokenStore';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
});

/** A fetch Response shaped the way ApiClient consumes it (status + headers.get +
 *  json/text), since fetchLetterIndex now goes through ApiClient (token-aware). */
function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

describe('fetchLetterIndex', () => {
  it('hits the letter-index endpoint with the query filters and parses buckets', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        letters: [
          { letter: 'A', offset: 0, count: 3 },
          { letter: 'B', offset: 3, count: 1 },
        ],
      }),
    );
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

  it('sends the logged-in user Bearer token (endpoint is auth-gated)', async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'tok-123');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ letters: [] }));
    vi.stubGlobal('fetch', fetchMock);

    await fetchLetterIndex('http://x', {});

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers['Authorization']).toBe('Bearer tok-123');
  });

  it('returns [] on a non-ok response, a throw, or a non-array body', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, false, 500)));
    expect(await fetchLetterIndex('http://x', {})).toEqual([]);

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    expect(await fetchLetterIndex('http://x', {})).toEqual([]);

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ letters: 'nope' })));
    expect(await fetchLetterIndex('http://x', {})).toEqual([]);
  });

  it('drops malformed buckets', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({ letters: [{ letter: 'A', offset: 0, count: 3 }, null, { offset: 1 }, 'x'] }),
      ),
    );
    expect(await fetchLetterIndex('http://x', {})).toEqual([{ letter: 'A', offset: 0, count: 3 }]);
  });
});
