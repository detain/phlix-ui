import { describe, it, expect, vi } from 'vitest';
import { AdminHistoryApi, type RecentlyWatchedItem } from './history';
import type { ApiClient } from '../client';

function clientWith(over: Partial<Record<'get' | 'delete', ReturnType<typeof vi.fn>>>): ApiClient {
  return {
    get: over.get ?? vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: over.delete ?? vi.fn(),
  } as unknown as ApiClient;
}

const sampleItem: RecentlyWatchedItem = {
  id: 'wh-1',
  media_item_id: 'media-1',
  name: 'Test Movie',
  title: 'Test Movie',
  media_type: 'movie',
  type: 'movie',
  progress_percent: 45.5,
  last_watched_at: '2026-05-28T10:30:00Z',
  thumbnail_url: 'https://example.com/thumb.jpg',
  poster_url: 'https://example.com/poster.jpg',
};

describe('AdminHistoryApi', () => {
  it('getRecentlyWatched() GETs the endpoint and unwraps { items }', async () => {
    const get = vi.fn().mockResolvedValue({ items: [sampleItem] });
    const api = new AdminHistoryApi(clientWith({ get }));
    const result = await api.getRecentlyWatched();
    expect(get).toHaveBeenCalledWith('/api/v1/users/me/recently-watched');
    expect(result).toEqual([sampleItem]);
  });

  it('degrades getRecentlyWatched() to [] when items is missing', async () => {
    const get = vi.fn().mockResolvedValue({});
    const api = new AdminHistoryApi(clientWith({ get }));
    expect(await api.getRecentlyWatched()).toEqual([]);
  });

  it('degrades getRecentlyWatched() to [] when items is not an array', async () => {
    const get = vi.fn().mockResolvedValue({ items: 'nope' });
    const api = new AdminHistoryApi(clientWith({ get }));
    expect(await api.getRecentlyWatched()).toEqual([]);
  });

  it('removeFromHistory(id) DELETEs the per-item endpoint', async () => {
    const del = vi.fn().mockResolvedValue({ message: 'Removed from watch history' });
    const api = new AdminHistoryApi(clientWith({ delete: del }));
    const result = await api.removeFromHistory('media-1');
    expect(del).toHaveBeenCalledWith('/api/v1/users/me/history/media-1');
    expect(result).toEqual({ message: 'Removed from watch history' });
  });

  it('encodes path-unsafe media item IDs in removeFromHistory()', async () => {
    const del = vi.fn().mockResolvedValue({ message: 'ok' });
    const api = new AdminHistoryApi(clientWith({ delete: del }));
    await api.removeFromHistory('a/b c');
    expect(del).toHaveBeenCalledWith('/api/v1/users/me/history/a%2Fb%20c');
  });

  it('clearHistory() DELETEs the collection endpoint', async () => {
    const del = vi.fn().mockResolvedValue({ message: 'Watch history cleared' });
    const api = new AdminHistoryApi(clientWith({ delete: del }));
    const result = await api.clearHistory();
    expect(del).toHaveBeenCalledWith('/api/v1/users/me/history');
    expect(result).toEqual({ message: 'Watch history cleared' });
  });

  it('propagates errors from getRecentlyWatched()', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const api = new AdminHistoryApi(clientWith({ get }));
    await expect(api.getRecentlyWatched()).rejects.toThrow('boom');
  });

  it('propagates errors from removeFromHistory()', async () => {
    const del = vi.fn().mockRejectedValue(new Error('not found'));
    const api = new AdminHistoryApi(clientWith({ delete: del }));
    await expect(api.removeFromHistory('media-999')).rejects.toThrow('not found');
  });

  it('propagates errors from clearHistory()', async () => {
    const del = vi.fn().mockRejectedValue(new Error('unauthorized'));
    const api = new AdminHistoryApi(clientWith({ delete: del }));
    await expect(api.clearHistory()).rejects.toThrow('unauthorized');
  });
});
