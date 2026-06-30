import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AdminDuplicatesApi, type DuplicateGroup } from './duplicates';
import type { ApiClient } from '../client';

const sampleGroup: DuplicateGroup = {
  canonical_key: 'hunterxhunter',
  type: 'series',
  library_id: '11111111-1111-1111-1111-111111111111',
  primary: { id: 'item-primary', name: 'Hunter x Hunter', type: 'series', descendant_count: 101 },
  duplicates: [{ id: 'item-dup', name: 'Hunter x Hunter', type: 'series', descendant_count: 1 }],
};

function makeApi(handlers: {
  get?: (endpoint: string, params?: Record<string, string>) => unknown;
  post?: (endpoint: string, data?: unknown) => unknown;
} = {}) {
  const get = vi.fn(async (endpoint: string, params?: Record<string, string>) =>
    handlers.get ? handlers.get(endpoint, params) : {},
  );
  const post = vi.fn(async (endpoint: string, data?: unknown) =>
    handlers.post ? handlers.post(endpoint, data) : {},
  );
  const client = { get, post, put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { api: new AdminDuplicatesApi(client), get, post };
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('AdminDuplicatesApi', () => {
  it('listDuplicates() GETs the library duplicates URL and unwraps { groups }', async () => {
    const { api, get } = makeApi({ get: () => ({ groups: [sampleGroup] }) });
    const result = await api.listDuplicates('11111111-1111-1111-1111-111111111111');
    expect(get).toHaveBeenCalledWith(
      '/api/v1/admin/libraries/11111111-1111-1111-1111-111111111111/duplicates',
    );
    expect(result).toEqual([sampleGroup]);
  });

  it('listDuplicates() falls back to [] on a malformed payload', async () => {
    const { api } = makeApi({ get: () => ({ groups: null }) });
    await expect(api.listDuplicates('lib-1')).resolves.toEqual([]);
  });

  it('listDuplicates() falls back to [] when the named key is absent', async () => {
    const { api } = makeApi({ get: () => ({}) });
    await expect(api.listDuplicates('lib-1')).resolves.toEqual([]);
  });

  it('listDuplicates() encodes a path-unsafe library id', async () => {
    const { api, get } = makeApi({ get: () => ({ groups: [] }) });
    await api.listDuplicates('a/b c');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/libraries/a%2Fb%20c/duplicates');
  });

  it('mergeDuplicates() POSTs /api/v1/admin/media/merge with { primary_id, duplicate_ids }', async () => {
    const { api, post } = makeApi({ post: () => ({ moved: 1, deleted: 2 }) });
    const result = await api.mergeDuplicates('item-primary', ['item-dup', 'item-dup-2']);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/media/merge', {
      primary_id: 'item-primary',
      duplicate_ids: ['item-dup', 'item-dup-2'],
    });
    expect(result).toEqual({ moved: 1, deleted: 2 });
  });

  it('mergeDuplicates() returns the { moved, deleted } envelope verbatim', async () => {
    const { api } = makeApi({ post: () => ({ moved: 0, deleted: 1 }) });
    await expect(api.mergeDuplicates('p', ['d'])).resolves.toEqual({ moved: 0, deleted: 1 });
  });

  it('propagates an error thrown by the client (e.g. a 4xx ApiError)', async () => {
    const { api } = makeApi({
      post: () => {
        throw new Error('Cannot merge across libraries');
      },
    });
    await expect(api.mergeDuplicates('p', ['d'])).rejects.toThrow('Cannot merge across libraries');
  });

  it('propagates an error thrown by the client on listDuplicates (e.g. a 403)', async () => {
    const { api } = makeApi({
      get: () => {
        throw new Error('Forbidden');
      },
    });
    await expect(api.listDuplicates('lib-1')).rejects.toThrow('Forbidden');
  });
});
