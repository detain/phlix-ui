/**
 * Regression tests for `src/api/photos.ts` path-segment encoding (audit #17).
 *
 * Album ids are md5 hex and photo ids numeric in practice, but the interpolation
 * was raw — any id carrying a path-significant character (`/`, `?`, `#`, a
 * space…) could escape its segment. The fix routes both through
 * `encodeURIComponent`; these tests pin that behavior on the request URL.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { photoApi } from './photos';

afterEach(() => {
  vi.unstubAllGlobals();
});

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  } as ResponseInit);
}

/** First fetch call's URL. */
function firstUrl(fetchMock: ReturnType<typeof vi.fn>): URL {
  return new URL(String(fetchMock.mock.calls[0][0]));
}

describe('photoApi path encoding', () => {
  it('getAlbum percent-encodes an album id with path-significant characters', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ album: { id: 'a/b?c d#e' } }));
    vi.stubGlobal('fetch', fetchMock);

    await photoApi.getAlbum('https://h', 'a/b?c d#e', 'lib-1');

    const parsed = firstUrl(fetchMock);
    // The id survives as ONE path segment — no traversal, no query bleed.
    expect(parsed.pathname).toBe('/api/v1/photo/albums/a%2Fb%3Fc%20d%23e');
    expect(parsed.searchParams.get('library_id')).toBe('lib-1');
  });

  it('getPhoto percent-encodes the photo id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ photo: { id: '7/8' } }));
    vi.stubGlobal('fetch', fetchMock);

    await photoApi.getPhoto('https://h', '7/8');

    expect(firstUrl(fetchMock).pathname).toBe('/api/v1/photo/photos/7%2F8');
  });

  it('leaves ordinary ids byte-identical (no over-encoding regressions)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ photo: { id: '123' } }));
    vi.stubGlobal('fetch', fetchMock);

    await photoApi.getPhoto('https://h', '123');

    expect(String(fetchMock.mock.calls[0][0])).toBe('https://h/api/v1/photo/photos/123');
  });
});
