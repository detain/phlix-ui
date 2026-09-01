/**
 * S280 — the client route gate, phlix-ui API layer.
 *
 * Every request-issuing method of every server-addressed `src/api` module is
 * driven through {@link makeRouteGateServer}, which answers a real 404 to any
 * url phlix-server does not register (400 routes — the canonical
 * phlix-contracts export `dist/server-route-manifest.json`, vendored verbatim
 * here as `server-route-manifest.json`; see {@link routeGateServer}).
 *
 * Per module the gate pins:
 * 1. ANTI-VACUITY — the drive really issued ≥N requests (a zero-request module
 *    would make the membership assertions trivially true).
 * 2. NO 404 — every requested url is one the server registers.
 * 3. TUPLE-EXACT — the DISTINCT `[method, template]` set is pinned exactly, so
 *    a rename that a wildcard sibling absorbs still reds via the set.
 *
 * The covered-URL count per module IS the pinned distinct-set size below — the
 * assertion and the enumeration are the same line.
 *
 * Hub-addressed modules (claimServer, invite-links, mcp-tokens) are enumerated
 * and asserted NOT to be server routes — their gate is the HUB's contract,
 * a named W18 follow-up.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiClient } from '../client';
import { MemoryTokenStore } from './memoryTokenStore';
import { SyncPlayApi } from '../syncplay';
import { photoApi } from '../photos';
import { fetchThemes } from '../themes';
import { fetchRecommendations } from '../recommendations';
import { fetchNextUp } from '../nextUp';
import { fetchMostWatched } from '../mostWatched';
import { fetchLibraries } from '../libraries';
import { fetchLetterIndex } from '../letter-index';
import { fetchIndexBuckets, cache as indexBucketsCache } from '../index-buckets';
import {
    SERVER_ROUTE_MANIFEST,
    SERVER_ROUTE_MANIFEST_PROVENANCE,
    makeRouteGateServer,
    driveGated,
    expectGateClean,
    isRegisteredRoute,
    type RouteGateServer,
} from './routeGateServer';

const BASE = 'https://media.example.com';

function clientFor(server: RouteGateServer): ApiClient {
    return new ApiClient({
        baseUrl: BASE,
        fetchImpl: server.fetch,
        tokenStore: new MemoryTokenStore({ access: 'access-token', refresh: 'refresh-token' }),
    });
}

let server: RouteGateServer;

beforeEach(() => {
    server = makeRouteGateServer(BASE);
    vi.stubGlobal('fetch', server.fetch);
});

afterEach(() => {
    vi.unstubAllGlobals();
});

// ── vendored contracts artifact — currency + integrity ────────────────────────

describe('route gate — vendored contracts export (S280 re-adoption)', () => {
    /**
     * S280 ui re-adoption: this gate consumes the CANONICAL phlix-contracts
     * export, vendored verbatim (interim pattern until the next contracts tag —
     * see {@link routeGateServer} header). These pins fail if the vendored file
     * is edited, re-derived locally, or replaced: the md5 is the byte-identity
     * proof against `phlix-contracts/dist/server-route-manifest.json` at
     * contracts `09161041`, and the sha pin is the server-currency proof.
     */
    const VENDORED_MANIFEST_MD5 = '6ea0eac92bfb0632d986b122608b9acc';
    const VENDORED_MANIFEST_SERVER_SHA = '0134063318bf601dcc152c6c175368cdf9168378';

    it('is the canonical artifact byte-for-byte — md5 + provenance sha + size', () => {
        // jsdom makes import.meta.url an http URL — resolve through the file
        // scheme exactly like routeGate.enumeration.test.ts does.
        const vendoredFile = path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            'server-route-manifest.json',
        );
        const bytes = readFileSync(vendoredFile);
        expect(createHash('md5').update(bytes).digest('hex')).toBe(VENDORED_MANIFEST_MD5);
        expect(SERVER_ROUTE_MANIFEST).toHaveLength(400);
        expect(SERVER_ROUTE_MANIFEST.length).toBe(SERVER_ROUTE_MANIFEST_PROVENANCE.total);
        expect(SERVER_ROUTE_MANIFEST_PROVENANCE.serverSha).toBe(VENDORED_MANIFEST_SERVER_SHA);
    });
});

// ── client.ts — the shared ApiClient ──────────────────────────────────────────

describe('route gate — client.ts (ApiClient)', () => {
    /** Every request-issuing method, with representative args. */
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/collections/{id}',
        'DELETE /api/v1/media/{id}',
        'DELETE /api/v1/media/{id}/favorite',
        'DELETE /api/v1/users/me/avatar',
        'GET /api/v1/auth/me',
        'GET /api/v1/media/{id}/download',
        'GET /api/v1/media/{id}/match/search',
        'GET /api/v1/media/{id}/missing-episodes',
        'GET /api/v1/media/{id}/posters',
        'GET /api/v1/media/{id}/subtitles/search',
        'GET /api/v1/media/{id}/trickplay',
        'GET /api/v1/media/most-watched',
        'GET /api/v1/media/search/by-marker',
        'GET /api/v1/music/albums',
        'GET /api/v1/music/albums/{mbid}',
        'GET /api/v1/music/artists',
        'GET /api/v1/music/artists/{mbid}',
        'GET /api/v1/music/tracks',
        'GET /api/v1/music/tracks/{id}',
        'GET /api/v1/users/me/favorites',
        'PATCH /api/v1/media/{id}/metadata',
        'POST /api/v1/auth/refresh',
        'POST /api/v1/collections/{id}/items/{mediaItemId}',
        'POST /api/v1/media/{id}/favorite',
        'POST /api/v1/media/{id}/match/apply',
        'POST /api/v1/media/{id}/subtitles/download',
        'POST /api/v1/media/{id}/unwatched',
        'POST /api/v1/media/{id}/watched',
        'POST /api/v1/playlists',
        'POST /api/v1/sessions',
        'POST /api/v1/shuffle',
        'POST /api/v1/users/me/avatar',
        'PUT /api/v1/media/{id}/like',
        'PUT /api/v1/media/{id}/poster',
        'PUT /api/v1/media/{id}/rating',
    ];

    it('issues 35 distinct urls, every one a registered server route', async () => {
        const client = clientFor(server);

        // Verb primitives — the URL-building core, driven with explicit paths.
        await driveGated(server, 'client.get', () => client.get('/api/v1/media/most-watched'));
        await driveGated(server, 'client.post', () => client.post('/api/v1/auth/refresh', { refresh_token: 'x' }));
        await driveGated(server, 'client.put', () => client.put('/api/v1/media/abc/rating', { rating: 5 }));
        await driveGated(server, 'client.patch', () => client.patch('/api/v1/media/abc/metadata', { title: 'x' }));
        await driveGated(server, 'client.delete', () => client.delete('/api/v1/collections/abc'));
        await driveGated(server, 'client.request', () => client.request('POST', '/api/v1/sessions', {}));

        // Auth.
        await driveGated(server, 'refreshToken', () => client.refreshToken());
        await driveGated(server, 'getCurrentUser', () => client.getCurrentUser());
        await driveGated(server, 'logout (issues no request — driven for completeness)', () =>
            Promise.resolve(client.logout(false)),
        );

        // Media item interactions.
        await driveGated(server, 'matchSearch', () => client.matchSearch('abc', { query: 'q' }));
        await driveGated(server, 'matchApply', () => client.matchApply('abc', { tmdb_id: 123 }));
        await driveGated(server, 'addFavorite', () => client.addFavorite('abc'));
        await driveGated(server, 'removeFavorite', () => client.removeFavorite('abc'));
        await driveGated(server, 'markWatched', () => client.markWatched('abc'));
        await driveGated(server, 'markUnwatched', () => client.markUnwatched('abc'));
        await driveGated(server, 'deleteMediaItem', () => client.deleteMediaItem('abc'));
        await driveGated(server, 'setRating', () => client.setRating('abc', 5));
        await driveGated(server, 'setLikeLevel', () => client.setLikeLevel('abc', 1));
        await driveGated(server, 'listFavorites', () => client.listFavorites({ limit: 20 }));
        await driveGated(server, 'listPosters', () => client.listPosters('abc'));
        await driveGated(server, 'setPoster', () => client.setPoster('abc', 'http://x/y.jpg'));
        await driveGated(server, 'searchByMarker', () => client.searchByMarker('intro', 1000));
        await driveGated(server, 'getTrickplay', () => client.getTrickplay('abc'));
        await driveGated(server, 'getDownloadUrl', () => client.getDownloadUrl('abc'));
        await driveGated(server, 'getMissingEpisodes', () => client.getMissingEpisodes('abc'));
        await driveGated(server, 'shufflePlay', () => client.shufflePlay('abc'));
        await driveGated(server, 'updateMetadata', () => client.updateMetadata('abc', { title: 'x' }));
        await driveGated(server, 'searchSubtitles', () => client.searchSubtitles('abc', ['en']));
        await driveGated(server, 'downloadSubtitle', () =>
            client.downloadSubtitle('abc', { provider: 'opensubtitles', downloadId: 'd1', language: 'en' }),
        );

        // Playlists.
        await driveGated(server, 'createPlaylist', () => client.createPlaylist('Watchlist'));
        await driveGated(server, 'addToPlaylist', () => client.addToPlaylist('pl-1', 'abc'));

        // Avatar (multipart + direct-fetch delete).
        await driveGated(server, 'uploadAvatar', () =>
            client.uploadAvatar(new File(['x'], 'a.png', { type: 'image/png' })),
        );
        await driveGated(server, 'deleteAvatar', () => client.deleteAvatar());

        // Music.
        await driveGated(server, 'listArtists', () => client.listArtists({ limit: 10 }));
        await driveGated(server, 'getArtist', () => client.getArtist('Artist Name'));
        await driveGated(server, 'listAlbums', () => client.listAlbums({ limit: 10 }));
        await driveGated(server, 'getAlbum', () => client.getAlbum('Album Title', 'Artist Name'));
        await driveGated(server, 'listTracks', () => client.listTracks({ limit: 10 }));
        await driveGated(server, 'getTrack', () => client.getTrack('track-1'));

        expectGateClean(server, EXPECTED, 38);
    });
});

// ── the root api modules ──────────────────────────────────────────────────────

describe('route gate — syncplay.ts (SyncPlayApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/syncplay/groups',
        'GET /api/v1/syncplay/groups/{id}',
        'POST /api/v1/syncplay/groups',
        'POST /api/v1/syncplay/groups/{id}/join',
        'POST /api/v1/syncplay/groups/{id}/leave',
    ];

    it('issues 5 distinct urls (7 calls), every one a registered server route', async () => {
        const api = new SyncPlayApi(BASE);
        await driveGated(server, 'listGroups', () => api.listGroups());
        await driveGated(server, 'listPublicRooms', () => api.listPublicRooms());
        await driveGated(server, 'createRoom', () => api.createRoom({ name: 'Movie Night', isPublic: true }));
        await driveGated(server, 'getState', () => api.getState('sp_abc123'));
        await driveGated(server, 'getMembers', () => api.getMembers('sp_abc123'));
        await driveGated(server, 'joinRoom', () => api.joinRoom('sp_abc123'));
        await driveGated(server, 'leaveRoom', () => api.leaveRoom('sp_abc123'));
        expectGateClean(server, EXPECTED, 7);
    });
});

describe('route gate — photos.ts (PhotoApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/photo/albums',
        'GET /api/v1/photo/albums/{id}',
        'GET /api/v1/photo/photos',
        'GET /api/v1/photo/photos/{id}',
        'GET /api/v1/photo/slideshow',
    ];

    it('issues 5 distinct urls, every one a registered server route', async () => {
        await driveGated(server, 'getAlbums', () => photoApi.getAlbums(BASE, 'lib-1'));
        await driveGated(server, 'getAlbum', () => photoApi.getAlbum(BASE, 'alb-1', 'lib-1'));
        await driveGated(server, 'getPhotos', () => photoApi.getPhotos(BASE, 'lib-1', { limit: 20 }));
        await driveGated(server, 'getPhoto', () => photoApi.getPhoto(BASE, 'ph-1'));
        await driveGated(server, 'getSlideshow', () => photoApi.getSlideshow(BASE, 'lib-1', { interval: 10 }));
        expectGateClean(server, EXPECTED, 5);
    });
});

describe('route gate — themes.ts (fetchThemes)', () => {
    it('issues exactly GET /api/v1/themes', async () => {
        await driveGated(server, 'fetchThemes', () => fetchThemes(BASE));
        expectGateClean(server, ['GET /api/v1/themes'], 1);
    });
});

describe('route gate — recommendations.ts (fetchRecommendations)', () => {
    it('issues exactly GET /api/v1/me/recommendations', async () => {
        await driveGated(server, 'fetchRecommendations', () =>
            fetchRecommendations(clientFor(server), { limit: 20 }),
        );
        expectGateClean(server, ['GET /api/v1/me/recommendations'], 1);
    });
});

describe('route gate — nextUp.ts (fetchNextUp)', () => {
    it('issues exactly GET /api/v1/users/me/next-up', async () => {
        await driveGated(server, 'fetchNextUp', () => fetchNextUp(clientFor(server), { limit: 20 }));
        expectGateClean(server, ['GET /api/v1/users/me/next-up'], 1);
    });
});

describe('route gate — mostWatched.ts (fetchMostWatched)', () => {
    it('issues exactly GET /api/v1/media/most-watched', async () => {
        await driveGated(server, 'fetchMostWatched', () => fetchMostWatched(clientFor(server), { limit: 20 }));
        expectGateClean(server, ['GET /api/v1/media/most-watched'], 1);
    });
});

describe('route gate — libraries.ts (fetchLibraries)', () => {
    it('issues exactly GET /api/v1/libraries', async () => {
        await driveGated(server, 'fetchLibraries', () => fetchLibraries(BASE));
        expectGateClean(server, ['GET /api/v1/libraries'], 1);
    });
});

describe('route gate — letter-index.ts (fetchLetterIndex)', () => {
    it('issues exactly GET /api/v1/media/letter-index', async () => {
        await driveGated(server, 'fetchLetterIndex', () =>
            fetchLetterIndex(BASE, { libraryId: 'lib-1' }),
        );
        expectGateClean(server, ['GET /api/v1/media/letter-index'], 1);
    });
});

describe('route gate — index-buckets.ts (fetchIndexBuckets)', () => {
    it('issues exactly GET /api/v1/media/index', async () => {
        indexBucketsCache.clear();
        await driveGated(server, 'fetchIndexBuckets', () =>
            fetchIndexBuckets(BASE, { field: 'name', libraryId: 'lib-1' }),
        );
        expectGateClean(server, ['GET /api/v1/media/index'], 1);
    });
});

// ── hub-addressed modules — enumerated, gated in W18 ─────────────────────────

describe('route gate — hub-addressed modules (enumerated; W18 follow-up)', () => {
    /**
     * Three src/api modules address the HUB's HTTP surface, not the media
     * server's: claimServer (`POST /api/v1/server-claims/claim`, hub-gated by
     * `Accept-Phlix-Protocol: v1`), invite-links (`/api/v1/me/invite-links`,
     * `/api/v1/me/servers`, `/api/v1/me/libraries`) and mcp-tokens
     * (`/api/v1/me/mcp-tokens`, phlix-hub `Application.php:497-519`). Pinning
     * them against the SERVER manifest would be a false red — the server does
     * not serve them; the hub does. Their gate is the HUB's route contract, a
     * named W18 follow-up (s280rest). Asserting they are NOT server routes
     * keeps the partition honest: if one of these ever lands on the server,
     * this reds and the partition must be re-drawn.
     */
    const HUB_URLS: ReadonlyArray<string> = [
        'POST /api/v1/server-claims/claim',
        'GET /api/v1/me/invite-links',
        'POST /api/v1/me/invite-links',
        'DELETE /api/v1/me/invite-links/{id}',
        'GET /api/v1/me/servers',
        'GET /api/v1/me/libraries',
        'GET /api/v1/me/mcp-tokens',
        'POST /api/v1/me/mcp-tokens',
        'DELETE /api/v1/me/mcp-tokens/{id}',
    ];

    it('enumerates every hub URL and confirms none is a server route', () => {
        for (const key of HUB_URLS) {
            const [method, path] = key.split(' ');
            expect(isRegisteredRoute(method!, path!)).toBe(false);
        }
    });
});