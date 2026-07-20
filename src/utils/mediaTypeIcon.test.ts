/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import type { MediaType } from '../types/media-item';
import { mediaTypeIcon } from './mediaTypeIcon';

/** Every member of the media_items.type ENUM. */
const ALL_TYPES: MediaType[] = [
    'movie',
    'series',
    'season',
    'episode',
    'track',
    'music',
    'album',
    'artist',
    'video',
    'audio',
    'book',
    'photo',
    'audiobook',
];

describe('mediaTypeIcon', () => {
    it('maps the video hierarchy', () => {
        expect(mediaTypeIcon('movie')).toBe('film');
        expect(mediaTypeIcon('series')).toBe('tv');
        expect(mediaTypeIcon('season')).toBe('tv');
        expect(mediaTypeIcon('episode')).toBe('tv');
        expect(mediaTypeIcon('video')).toBe('video');
    });

    it('maps the music hierarchy to distinct icons', () => {
        expect(mediaTypeIcon('track')).toBe('music');
        expect(mediaTypeIcon('music')).toBe('music');
        expect(mediaTypeIcon('audio')).toBe('music');
        expect(mediaTypeIcon('album')).toBe('disc');
        expect(mediaTypeIcon('artist')).toBe('mic');
    });

    it('maps the kinds the old ternaries dropped entirely', () => {
        // These all fell through to the generic 'film' icon before: the
        // ternaries handled only audio/image/series and keyed the photo case on
        // 'image', a value the server never emits.
        expect(mediaTypeIcon('photo')).toBe('image');
        expect(mediaTypeIcon('book')).toBe('book');
        expect(mediaTypeIcon('audiobook')).toBe('headphones');
    });

    it('covers every ENUM member without falling back', () => {
        // A missing entry would silently return 'film'; only `movie` may map to
        // it, so this catches an unmapped new member.
        for (const t of ALL_TYPES) {
            if (t === 'movie') continue;
            expect(mediaTypeIcon(t)).not.toBe('film');
        }
    });

    it('falls back to film for absent or unknown types', () => {
        expect(mediaTypeIcon(null)).toBe('film');
        expect(mediaTypeIcon(undefined)).toBe('film');
        expect(mediaTypeIcon('')).toBe('film');
        // A server newer than this client, or the retired 'image' label.
        expect(mediaTypeIcon('hologram')).toBe('film');
        expect(mediaTypeIcon('image')).toBe('film');
    });
});
