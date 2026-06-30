import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AdminMetadataSourcesApi } from './metadata-sources';
import type { ApiClient } from '../client';

function makeApi(handlers: { get?: (endpoint: string) => unknown } = {}) {
  const get = vi.fn(async (endpoint: string) => (handlers.get ? handlers.get(endpoint) : {}));
  const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { api: new AdminMetadataSourcesApi(client), get };
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('AdminMetadataSourcesApi', () => {
  it('listSources() GETs the sources URL and unwraps { sources }', async () => {
    const { api, get } = makeApi({ get: () => ({ sources: ['tmdb', 'imdb', 'anidb'] }) });
    const result = await api.listSources();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metadata/sources');
    expect(result).toEqual(['tmdb', 'imdb', 'anidb']);
  });

  it('listSources() falls back to [] on a malformed payload', async () => {
    const { api } = makeApi({ get: () => ({ sources: null }) });
    await expect(api.listSources()).resolves.toEqual([]);
  });

  it('listSources() falls back to [] when the named key is absent', async () => {
    const { api } = makeApi({ get: () => ({}) });
    await expect(api.listSources()).resolves.toEqual([]);
  });

  it('propagates an error thrown by the client (e.g. a 403 ApiError)', async () => {
    const { api } = makeApi({
      get: () => {
        throw new Error('Forbidden');
      },
    });
    await expect(api.listSources()).rejects.toThrow('Forbidden');
  });
});
