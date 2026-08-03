/**
 * useSeriesSeasons tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchChildren, loadSeriesSeasons } from './useSeriesSeasons';
import type { ApiClient } from '../api/client';
import type { MediaItem } from '../types/media-item';
import { isRoute } from '../test/route-match';

function makeItem(over: Partial<MediaItem> = {}): MediaItem {
    return {
        id: 'x',
        name: 'Test Item',
        type: 'episode',
        poster_url: null,
        genres: [],
        year: null,
        rating: null,
        runtime: null,
        overview: null,
        actors: [],
        director: null,
        created_at: null,
        updated_at: null,
        season_number: 1,
        episode_number: 1,
        ...over,
    };
}

function fakeClient(getMock: ReturnType<typeof vi.fn>) {
    return { get: getMock } as unknown as ApiClient;
}

const API_BASE = 'https://hub.example.com';

describe('fetchChildren', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls client.get with correct URL', async () => {
        const getMock = vi.fn().mockResolvedValue({ items: [], total: 0 });
        const client = fakeClient(getMock);

        await fetchChildren(client, API_BASE, 'series-1');

        expect(getMock).toHaveBeenCalledTimes(1);
        const url = getMock.mock.calls[0][0] as string;
        // S193: suffix-exact on the PATHNAME (query stripped) — `toContain` was also
        // satisfied by `/api/v1/media/anything` and by `/api/v1/media-MUTATED`.
        expect(isRoute(url, '/api/v1/media')).toBe(true);
        expect(url).toContain('parentId=series-1');
        expect(url).toContain('limit=100');
        expect(url).toContain('sort=name');
        expect(url).toContain('order=asc');
    });

    it('returns items array from response', async () => {
        const items = [makeItem({ id: 'ep1' }), makeItem({ id: 'ep2' })];
        const getMock = vi.fn().mockResolvedValue({ items, total: 2 });
        const client = fakeClient(getMock);

        const result = await fetchChildren(client, API_BASE, 'series-1');

        expect(result).toHaveLength(2);
        expect(result[0]!.id).toBe('ep1');
    });

    it('returns empty array when response has no items', async () => {
        const getMock = vi.fn().mockResolvedValue({ items: null, total: 0 });
        const client = fakeClient(getMock);

        const result = await fetchChildren(client, API_BASE, 'series-1');

        expect(result).toEqual([]);
    });

    it('passes signal to client.get', async () => {
        const getMock = vi.fn().mockResolvedValue({ items: [] });
        const client = fakeClient(getMock);
        const controller = new AbortController();

        await fetchChildren(client, API_BASE, 'series-1', controller.signal);

        expect(getMock.mock.calls[0][2]).toBe(controller.signal);
    });
});

describe('loadSeriesSeasons', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('groups episodes by season number', async () => {
        const children = [
            makeItem({ id: 'ep1', season_number: 1, episode_number: 1 }),
            makeItem({ id: 'ep2', season_number: 1, episode_number: 2 }),
            makeItem({ id: 'ep3', season_number: 2, episode_number: 1 }),
        ];
        const getMock = vi.fn().mockResolvedValue({ items: children, total: 3 });
        const client = fakeClient(getMock);

        const result = await loadSeriesSeasons(client, API_BASE, 'series-1');

        expect(result).toHaveLength(2);
        expect(result[0]!.seasonNumber).toBe(1);
        expect(result[0]!.episodes).toHaveLength(2);
        expect(result[1]!.seasonNumber).toBe(2);
        expect(result[1]!.episodes).toHaveLength(1);
    });

    it('sorts seasons in ascending order with specials last', async () => {
        const children = [
            makeItem({ id: 'sp1', season_number: 0, episode_number: 1 }),
            makeItem({ id: 'ep1', season_number: 2, episode_number: 1 }),
            makeItem({ id: 'ep2', season_number: 1, episode_number: 1 }),
        ];
        const getMock = vi.fn().mockResolvedValue({ items: children, total: 3 });
        const client = fakeClient(getMock);

        const result = await loadSeriesSeasons(client, API_BASE, 'series-1');

        expect(result[0]!.seasonNumber).toBe(1);
        expect(result[1]!.seasonNumber).toBe(2);
        expect(result[2]!.seasonNumber).toBeNull(); // Specials
        expect(result[2]!.isSpecials).toBe(true);
    });

    it('handles flat list without season containers', async () => {
        const children = [
            makeItem({ id: 'ep1', season_number: 1, episode_number: 1 }),
        ];
        const getMock = vi.fn().mockResolvedValue({ items: children, total: 1 });
        const client = fakeClient(getMock);

        const result = await loadSeriesSeasons(client, API_BASE, 'series-1');

        expect(result).toHaveLength(1);
        expect(result[0]!.episodes).toHaveLength(1);
    });

    it('fetches episodes from season containers when hasSeasonRows is true', async () => {
        const seasonRow = makeItem({ id: 's1', type: 'season', season_number: 1 });
        const children = [seasonRow];
        const season1Episodes = [
            makeItem({ id: 'ep1', parent_id: 's1', season_number: 1, episode_number: 1 }),
            makeItem({ id: 'ep2', parent_id: 's1', season_number: 1, episode_number: 2 }),
        ];

        let callCount = 0;
        const getMock = vi.fn().mockImplementation(() => {
            callCount++;
            if (callCount === 1) {
                return Promise.resolve({ items: children, total: 1 });
            }
            return Promise.resolve({ items: season1Episodes, total: 2 });
        });
        const client = fakeClient(getMock);

        const result = await loadSeriesSeasons(client, API_BASE, 'series-1');

        expect(getMock).toHaveBeenCalledTimes(2);
        expect(result).toHaveLength(1);
        expect(result[0]!.episodes).toHaveLength(2);
        expect(result[0]!.seasonItem?.id).toBe('s1');
    });

    it('handles fetch failure for season episodes gracefully', async () => {
        const seasonRow = makeItem({ id: 's1', type: 'season', season_number: 1 });
        const children = [seasonRow];
        const directEp = makeItem({ id: 'ep0', season_number: 99, episode_number: 1 });

        let callCount = 0;
        const getMock = vi.fn().mockImplementation(() => {
            callCount++;
            if (callCount === 1) {
                return Promise.resolve({ items: [directEp, ...children], total: 2 });
            }
            return Promise.reject(new Error('Network error'));
        });
        const client = fakeClient(getMock);

        const result = await loadSeriesSeasons(client, API_BASE, 'series-1');

        // The direct episode is returned as its own season group.
        // The failed season container has no episodes (fetch returned empty),
        // so it doesn't create an empty group.
        expect(result).toHaveLength(1);
        expect(result[0]!.seasonNumber).toBe(99);
        expect(result[0]!.episodes).toHaveLength(1);
        expect(result[0]!.episodes[0]!.id).toBe('ep0');
    });

    it('returns empty array when series has no children', async () => {
        const getMock = vi.fn().mockResolvedValue({ items: [], total: 0 });
        const client = fakeClient(getMock);

        const result = await loadSeriesSeasons(client, API_BASE, 'series-1');

        expect(result).toHaveLength(0);
    });

    it('passes signal to all fetchChildren calls', async () => {
        const seasonRow = makeItem({ id: 's1', type: 'season', season_number: 1 });
        const children = [seasonRow];
        const seasonEpisodes = [makeItem({ id: 'ep1', season_number: 1, episode_number: 1 })];

        let callCount = 0;
        const getMock = vi.fn().mockImplementation(() => {
            callCount++;
            if (callCount === 1) {
                return Promise.resolve({ items: children });
            }
            return Promise.resolve({ items: seasonEpisodes });
        });
        const client = fakeClient(getMock);
        const controller = new AbortController();

        await loadSeriesSeasons(client, API_BASE, 'series-1', controller.signal);

        expect(getMock.mock.calls[0][2]).toBe(controller.signal);
        expect(getMock.mock.calls[1][2]).toBe(controller.signal);
    });
});
