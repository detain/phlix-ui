/**
 * S280 — the client route gate, phlix-ui app layer.
 *
 * The stores and composables that mint request URLs directly (outside
 * `src/api`) are driven through the same route-gated server. Their URLs are
 * typically the same routes the api modules already pin — the point here is
 * that a URL minted HERE is pinned HERE, tuple-exact, and that every
 * request-issuing file in the app layer is enumerated (see
 * `routeGate.enumeration.test.ts`).
 *
 * The gate server answers every registered route with `{}`, which is enough
 * for pure api-layer modules (they degrade on malformed payloads). A few app
 * flows gate their requests on RESPONSE CONTENT — `login()` only reports
 * success if `fetchUser()` round-trips, the resume reporter needs a
 * `session_id` to progress/complete, and the HLS transcode flow needs a
 * `job_id` to poll. For those, a thin response wrapper injects the minimum
 * realistic fields (the same wrapper pattern S276 uses for stateful fixtures).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { ApiClient } from '../client';
import { useAuthStore } from '../../stores/useAuthStore';
import { useMediaStore } from '../../stores/useMediaStore';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { useResumeReporter } from '../../composables/useResumeReporter';
import { useResumeSync } from '../../composables/useResumeSync';
import { useHlsTranscode } from '../../composables/useHlsTranscode';
import { loadSeriesSeasons } from '../../composables/useSeriesSeasons';
import { useMusicPlayer } from '../../composables/useMusicPlayer';
import { useUserItemDataStore } from '../../stores/useUserItemDataStore';
import { useTrickplay } from '../../composables/useTrickplay';
import { makeRouteGateServer, driveGated, expectGateClean, type RouteGateServer } from './routeGateServer';

const BASE = 'https://media.example.com';

let server: RouteGateServer;

beforeEach(() => {
    server = makeRouteGateServer(BASE);
    vi.stubGlobal('fetch', server.fetch);
    setActivePinia(createPinia());
    localStorage.clear();
});

afterEach(() => {
    vi.unstubAllGlobals();
});

/**
 * Wrap the gate server's fetch with the minimum realistic response fields the
 * app flows gate on (everything else stays `{}`). The wrapped fetch records
 * exactly the same requests as the raw server.
 */
function withRealisticBodies(): typeof fetch {
    const original = server.fetch;
    return ((url: string, init?: RequestInit) =>
        original(url, init).then(async (res) => {
            const body = (await res.json()) as Record<string, unknown>;
            const path = (url as string).split('?')[0] ?? '';
            if (path.endsWith('/api/v1/auth/me')) {
                body['user'] = { id: 'u1', username: 'alice', is_admin: false };
            } else if (path.endsWith('/api/v1/sessions')) {
                body['session_id'] = 'sess-1';
            } else if (path.endsWith('/transcode') && (init?.method ?? 'GET') === 'POST') {
                body['job_id'] = 'job-1';
                body['master_url'] = '/hls/job-1/master.m3u8';
                body['status'] = 'running';
            } else if (path.includes('/transcode/') && path.endsWith('/status')) {
                body['status'] = 'running';
                body['playlist_ready'] = true;
                body['progress'] = 60;
            }
            return {
                ok: res.ok,
                status: res.status,
                headers: res.headers,
                json: () => Promise.resolve(body),
                text: () => Promise.resolve(JSON.stringify(body)),
            } as unknown as Response;
        })) as unknown as typeof fetch;
}

/** Log in for real (user round-trip succeeds under {@link withRealisticBodies}). */
async function loggedInAuth(): Promise<ReturnType<typeof useAuthStore>> {
    vi.stubGlobal('fetch', withRealisticBodies());
    const auth = useAuthStore();
    expect(await auth.login('alice', 'secret')).toBe(true);
    return auth;
}

describe('route gate — stores/useAuthStore.ts (login/signup)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/auth/me',
        'POST /api/v1/auth/login',
        'POST /api/v1/auth/register',
    ];

    it('issues 3 distinct urls, every one a registered server route', async () => {
        const auth = await loggedInAuth();
        await driveGated(server, 'signup', () => auth.signup('bob@example.com', 'bob', 'secret'));
        expectGateClean(server, EXPECTED, 4);
    });
});

describe('route gate — stores/useMediaStore.ts (facets + media query)', () => {
    const EXPECTED: ReadonlyArray<string> = ['GET /api/v1/media', 'GET /api/v1/media/facets'];

    it('issues 2 distinct urls, every one a registered server route', async () => {
        const store = useMediaStore();
        await driveGated(server, 'prefetch', () => store.prefetch(BASE, { limit: 20 }));
        await driveGated(server, 'loadFacets', () => store.loadFacets(BASE));
        expectGateClean(server, EXPECTED, 2);
    });
});

describe('route gate — composables/useResumeReporter.ts', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'POST /api/v1/sessions',
        'POST /api/v1/sessions/{id}/complete',
        'POST /api/v1/sessions/{id}/progress',
    ];

    it('issues 3 distinct urls, every one a registered server route', async () => {
        const auth = await loggedInAuth();
        void auth;
        server.requests.length = 0;

        const player = usePlayerStore();
        player.setCurrent({ id: 'm1', name: 'M1', type: 'movie' } as never);
        player.updateProgress(120, 600);
        player.play();

        const reporter = useResumeReporter();
        await driveGated(server, 'report', () => reporter.report(true));
        await driveGated(server, 'finish', () => reporter.finish());
        expectGateClean(server, EXPECTED, 3);
    });
});

describe('route gate — composables/useResumeSync.ts', () => {
    it('issues exactly GET /api/v1/users/me/continue-watching', async () => {
        await loggedInAuth();
        server.requests.length = 0;
        const { syncResume } = useResumeSync();
        await driveGated(server, 'syncResume', () => syncResume());
        expectGateClean(server, ['GET /api/v1/users/me/continue-watching'], 1);
    });
});

describe('route gate — composables/useHlsTranscode.ts', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/transcode/{jobId}/status',
        'POST /api/v1/media/{id}/transcode',
    ];

    it('issues 2 distinct urls, every one a registered server route', async () => {
        vi.stubGlobal('fetch', withRealisticBodies());
        // The composable's own client must see the realistic bodies too — pass
        // the WRAPPED fetch as its fetchImpl, not the raw gate server.
        const client = new ApiClient({ baseUrl: BASE, fetchImpl: withRealisticBodies() });
        const controller = useHlsTranscode({
            apiBase: () => BASE,
            client,
            attach: async () => ({ destroy: () => {} }) as never,
            pollIntervalMs: 60_000,
            maxWaitMs: 60_000,
            sleep: async () => {},
        });
        await driveGated(server, 'start', () => controller.start({} as HTMLVideoElement, 'media-1', 'web'));
        expectGateClean(server, EXPECTED, 2);
    });
});

describe('route gate — stores/useUserItemDataStore.ts', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/media/{id}/favorite',
        'POST /api/v1/media/{id}/favorite',
        'POST /api/v1/media/{id}/unwatched',
        'POST /api/v1/media/{id}/watched',
        'PUT /api/v1/media/{id}/like',
    ];

    it('issues 5 distinct urls, every one a registered server route', async () => {
        const store = useUserItemDataStore();
        await driveGated(server, 'toggleFavorite (on)', () => store.toggleFavorite('m1', BASE));
        await driveGated(server, 'toggleFavorite (off)', () => store.toggleFavorite('m1', BASE));
        await driveGated(server, 'toggleWatched (on)', () => store.toggleWatched('m1', BASE));
        await driveGated(server, 'toggleWatched (off)', () => store.toggleWatched('m1', BASE));
        await driveGated(server, 'setLike', () => store.setLike('m1', 2, BASE));
        expectGateClean(server, EXPECTED, 5);
    });
});

describe('route gate — composables/useMusicPlayer.ts (getTrack fallback)', () => {
    it('issues exactly GET /api/v1/music/tracks/{id} (signed-url fallback)', async () => {
        function AudioMock(this: unknown) {
            return {
                src: '',
                play: async () => {},
                pause: () => {},
                addEventListener: () => {},
                removeEventListener: () => {},
            };
        }
        vi.stubGlobal('Audio', AudioMock as unknown as typeof Audio);
        const player = useMusicPlayer({ apiBase: () => BASE, streamBase: () => BASE });
        // `loadTracks` only fills the queue; the URL is minted by `play` →
        // `resolveSrc` → `getTrack` (the album fast-path fallback).
        player.loadTracks([
            { id: 't1', title: 'T1', durationSecs: 100, trackNumber: 1, streamUrl: null },
        ]);
        const track = { id: 't1', title: 'T1', durationSecs: 100, trackNumber: 1, streamUrl: null };
        await driveGated(server, 'play', () => player.play(track));
        expectGateClean(server, ['GET /api/v1/music/tracks/{id}'], 1);
    });
});

describe('route gate — composables/useSeriesSeasons.ts', () => {
    it('issues exactly GET /api/v1/media (season children query)', async () => {
        const client = new ApiClient({ baseUrl: BASE, fetchImpl: server.fetch });
        await driveGated(server, 'loadSeriesSeasons', () => loadSeriesSeasons(client, BASE, 'series-1'));
        expectGateClean(server, ['GET /api/v1/media'], 1);
    });
});

describe('route gate — composables/useTrickplay.ts', () => {
    it('issues exactly GET /api/v1/media/{id}/trickplay (via client.getTrickplay)', async () => {
        const trickplay = useTrickplay({ apiBase: () => BASE });
        await driveGated(server, 'trickplay.fetch', () => trickplay.fetch('media-1'));
        expectGateClean(server, ['GET /api/v1/media/{id}/trickplay'], 1);
    });
});