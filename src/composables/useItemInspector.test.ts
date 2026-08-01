/**
 * useItemInspector tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { useItemInspector } from './useItemInspector';
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

describe('useItemInspector', () => {
    it('starts with null item and closed state', () => {
        const { inspectorItem, inspectorOpen } = useItemInspector();
        expect(inspectorItem.value).toBeNull();
        expect(inspectorOpen.value).toBe(false);
    });

    it('openInspector sets the item and opens the modal', () => {
        const { inspectorItem, inspectorOpen, openInspector } = useItemInspector();
        const item = makeItem({ id: 'movie-1', name: 'Test Movie' });

        openInspector(item);

        expect(inspectorItem.value).toEqual(item);
        expect(inspectorOpen.value).toBe(true);
    });

    it('openInspector overwrites previous item', () => {
        const { inspectorItem, inspectorOpen, openInspector } = useItemInspector();
        const item1 = makeItem({ id: 'item-1', name: 'First' });
        const item2 = makeItem({ id: 'item-2', name: 'Second' });

        openInspector(item1);
        openInspector(item2);

        expect(inspectorItem.value?.id).toBe('item-2');
        expect(inspectorOpen.value).toBe(true);
    });

    it('openInspector can be called multiple times', () => {
        const { inspectorItem, openInspector } = useItemInspector();
        const item = makeItem({ id: 'item-x' });

        openInspector(item);
        openInspector(item);
        openInspector(item);

        expect(inspectorItem.value?.id).toBe('item-x');
    });

    it('exposes the correct return shape', () => {
        const result = useItemInspector();
        expect(result).toHaveProperty('inspectorItem');
        expect(result).toHaveProperty('inspectorOpen');
        expect(result).toHaveProperty('openInspector');
        expect(typeof result.openInspector).toBe('function');
    });

    it('handles items with various types', () => {
        const { inspectorItem, openInspector } = useItemInspector();

        const movie = makeItem({ id: 'm1', type: 'movie' });
        openInspector(movie);
        expect(inspectorItem.value?.type).toBe('movie');

        const series = makeItem({ id: 's1', type: 'series' });
        openInspector(series);
        expect(inspectorItem.value?.type).toBe('series');

        const episode = makeItem({ id: 'e1', type: 'episode' });
        openInspector(episode);
        expect(inspectorItem.value?.type).toBe('episode');
    });
});
