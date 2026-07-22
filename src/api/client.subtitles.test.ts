/**
 * Subtitle search / download client methods (Wave 3 F3).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import { ApiClient, ApiError } from './client';
import { MemoryTokenStore, makeFetch } from './test/memoryTokenStore';

describe('ApiClient.searchSubtitles', () => {
  it('GETs the search endpoint with the joined lang param + bearer auth', async () => {
    const { fetch, calls } = makeFetch([{ status: 200, body: { candidates: [] } }]);
    const client = new ApiClient({
      baseUrl: 'https://h',
      tokenStore: new MemoryTokenStore({ access: 'tok-1' }),
      fetchImpl: fetch,
    });

    await client.searchSubtitles('m-42', ['en', 'es']);

    expect(calls[0]!.url).toBe('https://h/api/v1/media/m-42/subtitles/search?lang=en%2Ces');
    const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
    expect(headers['Authorization']).toBe('Bearer tok-1');
  });

  it('omits the lang param when no languages are supplied', async () => {
    const { fetch, calls } = makeFetch([{ status: 200, body: { candidates: [] } }]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });

    await client.searchSubtitles('m-1', []);

    expect(calls[0]!.url).toBe('/api/v1/media/m-1/subtitles/search');
  });

  it('normalizes candidates (camelCase + snake_case) and coerces types', async () => {
    const { fetch } = makeFetch([
      {
        status: 200,
        body: {
          candidates: [
            {
              provider: 'opensubtitles',
              language: 'en',
              downloadId: 'dl-1',
              releaseName: 'Movie.1080p',
              format: 'srt',
              matchedBy: 'hash',
              rating: '8.5',
              download_count: 1200,
              hearing_impaired: 1,
              fps: '23.976',
            },
          ],
        },
      },
    ]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });

    const out = await client.searchSubtitles('m-1', ['en']);

    expect(out).toHaveLength(1);
    expect(out[0]).toEqual({
      provider: 'opensubtitles',
      language: 'en',
      downloadId: 'dl-1',
      releaseName: 'Movie.1080p',
      format: 'srt',
      matchedBy: 'hash',
      rating: 8.5,
      downloadCount: 1200,
      hearingImpaired: true,
      fps: 23.976,
    });
  });

  it('degrades a malformed payload to an empty array', async () => {
    const { fetch } = makeFetch([{ status: 200, body: { candidates: 'nope' } }]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });

    expect(await client.searchSubtitles('m-1', ['en'])).toEqual([]);
  });
});

describe('ApiClient.downloadSubtitle', () => {
  it('POSTs the download endpoint with the candidate body + bearer auth', async () => {
    const { fetch, calls } = makeFetch([{ status: 200, body: { track: { url: '/hls/x/sub-0.vtt' } } }]);
    const client = new ApiClient({
      baseUrl: 'https://h',
      tokenStore: new MemoryTokenStore({ access: 'tok-9' }),
      fetchImpl: fetch,
    });

    const res = await client.downloadSubtitle('m-7', {
      provider: 'opensubtitles',
      downloadId: 'dl-2',
      language: 'es',
      format: 'srt',
      releaseName: 'rel',
      hearingImpaired: false,
    });

    expect(calls[0]!.url).toBe('https://h/api/v1/media/m-7/subtitles/download');
    expect(calls[0]!.init!.method).toBe('POST');
    expect(JSON.parse(calls[0]!.init!.body as string)).toEqual({
      provider: 'opensubtitles',
      downloadId: 'dl-2',
      language: 'es',
      format: 'srt',
      releaseName: 'rel',
      hearingImpaired: false,
    });
    const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
    expect(headers['Authorization']).toBe('Bearer tok-9');
    expect(res.track).toEqual({ url: '/hls/x/sub-0.vtt' });
  });

  it('throws an ApiError carrying the 429 quota body', async () => {
    const { fetch } = makeFetch([
      { status: 429, body: { error: 'quota', downloadsRemaining: 0, resetTimeUtc: '2026-07-22T00:00:00Z' } },
    ]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });

    let caught: unknown;
    try {
      await client.downloadSubtitle('m-1', { provider: 'p', downloadId: 'd', language: 'en' });
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(429);
    const body = (caught as ApiError).body as { downloadsRemaining?: number; resetTimeUtc?: string };
    expect(body.downloadsRemaining).toBe(0);
    expect(body.resetTimeUtc).toBe('2026-07-22T00:00:00Z');
  });
});
