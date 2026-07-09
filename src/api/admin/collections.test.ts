/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminCollectionsApi } from './collections';
import type { ApiClient } from '../client';

/** A mock ApiClient whose verbs are vi.fn()s the test can assert on. */
function makeClient() {
  const get = vi.fn();
  const post = vi.fn();
  const put = vi.fn();
  const patch = vi.fn();
  const del = vi.fn();
  const client = { get, post, put, patch, delete: del } as unknown as ApiClient;
  return { api: new AdminCollectionsApi(client), get, post, put, patch, del };
}

const sampleCollection = {
  id: 'col-1',
  name: 'My Movies',
  library_id: 'lib-1',
  item_count: 12,
  created_at: '2026-05-27T00:00:00Z',
};

const sampleItem = { id: 'item-1', title: 'Test Movie' };

describe('AdminCollectionsApi — CRUD', () => {
  it('list() GETs /api/v1/collections and unwraps { collections }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ collections: [sampleCollection] });
    const res = await api.list();
    expect(get).toHaveBeenCalledWith('/api/v1/collections');
    expect(res).toEqual([sampleCollection]);
  });

  it('list() falls back to [] when collections is missing/non-array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ collections: undefined });
    expect(await api.list()).toEqual([]);
    get.mockResolvedValue({ collections: 'nope' });
    expect(await api.list()).toEqual([]);
  });

  it('get(id) GETs /api/v1/collections/{id} and unwraps { collection, items }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ collection: sampleCollection, items: [sampleItem] });
    const res = await api.get('col-1');
    expect(get).toHaveBeenCalledWith('/api/v1/collections/col-1');
    expect(res.collection).toEqual(sampleCollection);
    expect(res.items).toEqual([sampleItem]);
  });

  it('get() falls back to [] items when omitted/non-array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ collection: sampleCollection });
    expect((await api.get('col-1')).items).toEqual([]);
    get.mockResolvedValue({ collection: sampleCollection, items: 'nope' });
    expect((await api.get('col-1')).items).toEqual([]);
  });

  it('get() encodes a path-unsafe id', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ collection: sampleCollection, items: [] });
    await api.get('a/b c');
    expect(get).toHaveBeenCalledWith('/api/v1/collections/a%2Fb%20c');
  });

  it('create() POSTs the body and parses { collection }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ collection: sampleCollection });
    const res = await api.create({ name: 'My Movies', library_id: 'lib-1' });
    expect(post).toHaveBeenCalledWith('/api/v1/collections', {
      name: 'My Movies',
      library_id: 'lib-1',
    });
    expect(res.collection).toEqual(sampleCollection);
  });

  it('update() PUTs the body and parses { collection }', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({ collection: { ...sampleCollection, name: 'Renamed' } });
    const res = await api.update('col-1', { name: 'Renamed' });
    expect(put).toHaveBeenCalledWith('/api/v1/collections/col-1', { name: 'Renamed' });
    expect(res.collection.name).toBe('Renamed');
  });

  it('remove() DELETEs /api/v1/collections/{id}', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ message: 'deleted' });
    const res = await api.remove('col-1');
    expect(del).toHaveBeenCalledWith('/api/v1/collections/col-1');
    expect(res).toEqual({ message: 'deleted' });
  });
});

describe('AdminCollectionsApi — item membership', () => {
  it('addItem() POSTs to /items/{mediaItemId}', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'added' });
    const res = await api.addItem('col-1', 'item-1');
    expect(post).toHaveBeenCalledWith('/api/v1/collections/col-1/items/item-1');
    expect(res).toEqual({ message: 'added' });
  });

  it('addItem() encodes both path ids', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'added' });
    await api.addItem('c/1', 'i 2');
    expect(post).toHaveBeenCalledWith('/api/v1/collections/c%2F1/items/i%202');
  });

  it('removeItem() DELETEs from /items/{mediaItemId}', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ message: 'removed' });
    const res = await api.removeItem('col-1', 'item-1');
    expect(del).toHaveBeenCalledWith('/api/v1/collections/col-1/items/item-1');
    expect(res).toEqual({ message: 'removed' });
  });

  it('bulkAdd() POSTs with the query body', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'added' });
    const res = await api.bulkAdd('col-1', 'genre:action');
    expect(post).toHaveBeenCalledWith('/api/v1/collections/col-1/bulk-add', {
      query: 'genre:action',
    });
    expect(res).toEqual({ message: 'added' });
  });

  it('refresh() POSTs to /refresh', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'refreshed' });
    const res = await api.refresh('col-1');
    expect(post).toHaveBeenCalledWith('/api/v1/collections/col-1/refresh');
    expect(res).toEqual({ message: 'refreshed' });
  });

  it('propagates a rejected client call', async () => {
    const { api, get } = makeClient();
    get.mockRejectedValue(new Error('Not found'));
    await expect(api.get('col-999')).rejects.toThrow('Not found');
  });
});
