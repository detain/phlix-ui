/**
 * useMediaItemCache tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
    getMediaItemCacheEntry,
    isMediaItemCacheFresh,
    cacheMediaItem,
    clearMediaItemCache,
    MEDIA_CACHE_TTL_MS,
} from './useMediaItemCache';
import type { MediaItem } from '../types/media-item';

function makeItem(over: Partial<MediaItem> = {}): MediaItem {
    return {
        id: 'x',
        name: 'Test Item',
        type: 'movie',
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
        ...over,
    };
}

describe('useMediaItemCache', () => {
    beforeEach(() => {
        clearMediaItemCache();
    });
    afterEach(() => {
        clearMediaItemCache();
    });

    describe('getMediaItemCacheEntry', () => {
        it('returns undefined for absent id', () => {
            expect(getMediaItemCacheEntry('nonexistent')).toBeUndefined();
        });

        it('returns the cached entry after storing', () => {
            const item = makeItem({ id: 'movie-1' });
            cacheMediaItem('movie-1', item, 1000);

            const entry = getMediaItemCacheEntry('movie-1');
            expect(entry).toBeDefined();
            expect(entry?.item).toBe(item);
            expect(entry?.ts).toBe(1000);
        });

        it('returns the latest entry when same id is cached twice', () => {
            const item1 = makeItem({ id: 'movie-1', name: 'First' });
            const item2 = makeItem({ id: 'movie-1', name: 'Second' });
            cacheMediaItem('movie-1', item1, 1000);
            cacheMediaItem('movie-1', item2, 2000);

            const entry = getMediaItemCacheEntry('movie-1');
            expect(entry?.item.name).toBe('Second');
            expect(entry?.ts).toBe(2000);
        });
    });

    describe('isMediaItemCacheFresh', () => {
        it('returns false for undefined entry', () => {
            expect(isMediaItemCacheFresh(undefined)).toBe(false);
        });

        it('returns true for a fresh entry (within TTL)', () => {
            const now = Date.now();
            const item = makeItem({ id: 'm1' });
            const entry = { item, ts: now - 1000 }; // 1 second ago

            expect(isMediaItemCacheFresh(entry, now)).toBe(true);
        });

        it('returns false for a stale entry (beyond TTL)', () => {
            const now = Date.now();
            const item = makeItem({ id: 'm1' });
            const entry = { item, ts: now - MEDIA_CACHE_TTL_MS - 1000 }; // past TTL

            expect(isMediaItemCacheFresh(entry, now)).toBe(false);
        });

        it('returns true exactly at TTL boundary (just within)', () => {
            const now = Date.now();
            const item = makeItem({ id: 'm1' });
            const entry = { item, ts: now - MEDIA_CACHE_TTL_MS + 1 };

            expect(isMediaItemCacheFresh(entry, now)).toBe(true);
        });

        it('returns false exactly at TTL boundary (just past)', () => {
            const now = Date.now();
            const item = makeItem({ id: 'm1' });
            const entry = { item, ts: now - MEDIA_CACHE_TTL_MS - 1 };

            expect(isMediaItemCacheFresh(entry, now)).toBe(false);
        });

        it('uses Date.now() when no now argument provided', () => {
            const item = makeItem({ id: 'm1' });
            const entry = { item, ts: Date.now() - 1000 };

            expect(isMediaItemCacheFresh(entry)).toBe(true);
        });
    });

    describe('cacheMediaItem', () => {
        it('stores item with current timestamp by default', () => {
            const item = makeItem({ id: 'movie-1' });
            const before = Date.now();
            cacheMediaItem('movie-1', item);
            const after = Date.now();

            const entry = getMediaItemCacheEntry('movie-1');
            expect(entry?.item).toBe(item);
            expect(entry?.ts).toBeGreaterThanOrEqual(before);
            expect(entry?.ts).toBeLessThanOrEqual(after);
        });

        it('stores item with provided timestamp', () => {
            const item = makeItem({ id: 'movie-1' });
            cacheMediaItem('movie-1', item, 9999);

            const entry = getMediaItemCacheEntry('movie-1');
            expect(entry?.ts).toBe(9999);
        });

        it('can cache multiple different items', () => {
            const item1 = makeItem({ id: 'm1' });
            const item2 = makeItem({ id: 'm2' });
            cacheMediaItem('m1', item1, 1000);
            cacheMediaItem('m2', item2, 2000);

            expect(getMediaItemCacheEntry('m1')?.item).toBe(item1);
            expect(getMediaItemCacheEntry('m2')?.item).toBe(item2);
        });
    });

    describe('clearMediaItemCache', () => {
        it('removes all cached entries', () => {
            cacheMediaItem('m1', makeItem({ id: 'm1' }));
            cacheMediaItem('m2', makeItem({ id: 'm2' }));

            clearMediaItemCache();

            expect(getMediaItemCacheEntry('m1')).toBeUndefined();
            expect(getMediaItemCacheEntry('m2')).toBeUndefined();
        });

        it('is safe to call when cache is empty', () => {
            expect(() => clearMediaItemCache()).not.toThrow();
        });
    });

    describe('MEDIA_CACHE_TTL_MS constant', () => {
        it('is 60 seconds', () => {
            expect(MEDIA_CACHE_TTL_MS).toBe(60_000);
        });
    });

    describe('cache isolation across operations', () => {
        it('freshness check does not modify entry', () => {
            const item = makeItem({ id: 'm1' });
            const ts = Date.now() - 1000;
            cacheMediaItem('m1', item, ts);

            const entryBefore = getMediaItemCacheEntry('m1');
            isMediaItemCacheFresh(entryBefore);
            const entryAfter = getMediaItemCacheEntry('m1');

            expect(entryAfter?.ts).toBe(ts);
        });
    });
});
