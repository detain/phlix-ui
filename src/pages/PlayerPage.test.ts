/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import PlayerPage from './PlayerPage.vue';
import Player from '../components/Player.vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { usePlayerUiStore } from '../stores/usePlayerUiStore';
import { clearMediaItemCache } from '../composables/useMediaItemCache';
import type { MediaItem } from '../types/media-item';
import { isRoute, hasQuery, pathnameOf } from '../test/route-match';

/** Server playback-info shape (markers + chapters; NO stream url). */
interface PlaybackInfo {
  intro_marker: { start_seconds: number; end_seconds: number } | null;
  outro_marker: { start_seconds: number; end_seconds: number } | null;
  chapters: { start_seconds: number; end_seconds?: number; title?: string }[];
}

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}
function errorResponse(status = 500, body: unknown = { error: 'boom' }): Response {
  return {
    ok: false,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

/** A full happy-path fetch sequence: by-id → playback-info → up-next list.
 *  The real server wraps the item as `{ item }` and returns playback-info as
 *  `{ intro_marker, outro_marker, chapters }` (NO stream url — playback is always the
 *  deterministic /media/:id/stream endpoint). Pass `playback` to seed markers/chapters,
 *  or `null` to make playback-info 404 (absent).
 *
 *  Uses mockImplementation to route by URL so retry calls (which re-use the same
 *  mock) still get the correct response per endpoint, not the fallback queue response.
 *  Routing order: by-id (exact /media/:id) → playback-info → the up-next queue
 *  fall-through (the genre-similar list fetch, and the series-children ?parentId=). */
/**
 * The exact routes this page reads, as PATH builders + shape predicates.
 *
 * S193: every fetch double here now decides by PATHNAME (query stripped), suffix-
 * exact and prefix-tolerant, instead of by substring. Substring matching could not
 * tell the real route from a suffix-appended one — `'/api/v1/media/m1'.includes(…)`
 * is also true of `/api/v1/media/m1-MUTATED` — and it conflated routes that are NOT
 * the same: `u.includes('/api/v1/media/e2')` matched the by-id route, the
 * `/playback-info` sub-route and any id merely PREFIXED by `e2`, which is why every
 * stub in this file carried hand-written `&& !u.includes('playback-info')` /
 * `&& !u.includes('parentId')` exclusions. `isRoute` makes those exclusions
 * unnecessary: `/api/v1/media/e2/playback-info` simply does not END WITH
 * `/api/v1/media/e2`.
 *
 * `endsWith`, not `===`: the media base legitimately PREFIXES these paths on the hub
 * (`/api/v1/servers/{id}/proxy/api/v1/media/e2`), and `mountAt` can set a
 * `mediaApiBase`, so an exact-equality matcher would stop matching.
 */
const MEDIA_LIST_PATH = '/api/v1/media';
const byIdPath = (id: string): string => `${MEDIA_LIST_PATH}/${encodeURIComponent(id)}`;
const playbackInfoPath = (id: string): string => `${byIdPath(id)}/playback-info`;

/** The by-id detail route for `id` — NOT its `/playback-info` sub-route. */
const isById = (url: unknown, id: string): boolean => isRoute(url, byIdPath(id));

/**
 * ANY per-item playback-info route, for stubs that serve several ids (binge
 * navigation). A pathname SHAPE anchored at the end, so — unlike
 * `.includes('/playback-info')` — `/playback-info-MUTATED` and
 * `/api/v1/media-MUTATED/m1/playback-info` do not match.
 */
const isAnyPlaybackInfo = (url: unknown): boolean =>
  /\/api\/v1\/media\/[^/]+\/playback-info$/.test(pathnameOf(url));

/**
 * The series-children fetch: `GET /api/v1/media?parentId=<id>` — the SAME route as
 * the list/genre-queue fetch, so only the QUERY distinguishes it. Read as a parsed
 * parameter rather than the substring `'parentId=<id>'`, which would also fire on
 * `?notParentId=x` and on `?parentId=<id>-other`.
 */
const isChildrenOf = (url: unknown, parentId: string): boolean =>
  isRoute(url, MEDIA_LIST_PATH) && hasQuery(url, 'parentId', parentId);

function okFetch(item: MediaItem, playback: Partial<PlaybackInfo> | null = {}, items: MediaItem[] = []) {
  const fn = vi.fn().mockImplementation((url: string) => {
    const urlStr = String(url);
    // by-id endpoint: /api/v1/media/{id}. Suffix-exact, so it can no longer swallow
    // /playback-info or the ?parentId= children fetch — the two exclusions this
    // branch used to need are now structural. (The `/similar` branch that used to sit
    // above it was DEAD: PlayerPage has no `/similar` call — its queue is the
    // genre-similar LIST fetch, which the fall-through below already serves.)
    if (isById(urlStr, item.id)) {
      return Promise.resolve(jsonResponse({ item }));
    }
    // playback-info endpoint: /api/v1/media/{id}/playback-info
    if (isAnyPlaybackInfo(urlStr)) {
      if (playback === null) return Promise.resolve(errorResponse(404));
      return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [], ...playback }));
    }
    // Fallback: queue (for any other URL pattern, e.g. series children with parentId)
    return Promise.resolve(jsonResponse({ items, total: items.length }));
  });
  return fn;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/media/:id', name: 'media', component: stub },
      { path: '/app/settings', name: 'settings', component: stub },
      { path: '/app/player/:id', name: 'player', component: PlayerPage },
    ],
  });
}

const wrappers: VueWrapper[] = [];
/** Mount the player route through a <router-view> harness so onBeforeRouteLeave is a
 *  real route-component guard (matches production; no "must be a route component" warn). */
async function mountAt(
  id: string,
  fetchMock: ReturnType<typeof vi.fn>,
  provide: Record<string, unknown> = {},
) {
  vi.stubGlobal('fetch', fetchMock);
  const router = makeRouter();
  await router.push(`/app/player/${id}`);
  await router.isReady();
  const Harness = { template: '<router-view />' };
  const w = mount(Harness, { global: { plugins: [router], provide } });
  wrappers.push(w);
  return { w, router };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  // The SWR item cache (UI-2.1) is a module-level singleton shared across tests + with
  // MediaDetailPage; clear it so each test starts cold and by-id fetch assertions hold.
  clearMediaItemCache();
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('PlayerPage — load + stream resolution', () => {
  it('shows a loading skeleton before the fetch resolves', async () => {
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => {})); // never resolves
    const { w } = await mountAt('m1', fetchMock);
    expect(w.find('[role="status"][aria-busy="true"]').exists()).toBe(true);
    expect(w.findComponent(Player).exists()).toBe(false);
  });

  it('fetches the title by id (unwrapping { item }) and renders <Player> with the direct-stream url', async () => {
    const fetchMock = okFetch(media({ id: 'm1', name: 'Dune: Part Two' }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const player = w.findComponent(Player);
    expect(player.exists()).toBe(true);
    expect((player.props('media') as MediaItem).name).toBe('Dune: Part Two');
    expect(player.props('streamUrl')).toBe('/media/m1/stream');
    // It hit the by-id endpoint — suffix-exact, so `/api/v1/media/m1-MUTATED` and
    // `/api/v1/media/m1/playback-info` no longer satisfy it (S193).
    //
    // ⚠ This used to read `expect(calls[0][0]).toContain('/api/v1/media/m1')` under the
    // comment "first call hit the by-id endpoint". That claim is FALSE and the substring
    // hid it: item and playback-info are dispatched CONCURRENTLY (UI-0.4), and
    // `/api/v1/media/m1/playback-info` CONTAINS `/api/v1/media/m1`, so whichever of the
    // two landed first satisfied it. Asserting the by-id call happened at all is the
    // claim this test can actually make; the order is asserted nowhere because the page
    // deliberately does not define one.
    expect(fetchMock.mock.calls.some(([u]) => isById(u, 'm1'))).toBe(true);
    expect(fetchMock.mock.calls.some(([u]) => isRoute(u, playbackInfoPath('m1')))).toBe(true);
  });

  it('still streams from /media/:id/stream when playback-info is absent (404)', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }), null); // playback-info → 404
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.findComponent(Player).props('streamUrl')).toBe('/media/m1/stream');
  });

  it('supplies a synchronous streamUrlFor resolver that yields the direct-stream url', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const resolve = w.findComponent(Player).props('streamUrlFor') as (m: MediaItem) => string;
    expect(typeof resolve).toBe('function');
    expect(resolve(media({ id: 'abc 1' }))).toBe('/media/abc%201/stream'); // encoded
  });

  it('prefers the server-minted signed stream_url over the bare path', async () => {
    const signed = '/media/m1/stream?exp=9999999999&sig=abc123';
    const fetchMock = okFetch(media({ id: 'm1', stream_url: signed }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const player = w.findComponent(Player);
    // The <video> source (streamUrl prop) is the signed URL, not /media/m1/stream.
    expect(player.props('streamUrl')).toBe(signed);
    // The resolver also returns the signed URL for an item that carries one.
    const resolve = player.props('streamUrlFor') as (m: MediaItem) => string;
    expect(resolve(media({ id: 'm1', stream_url: signed }))).toBe(signed);
    // ...and still falls back to the bare path for a list row without one.
    expect(resolve(media({ id: 'm2' }))).toBe('/media/m2/stream');
  });

  it('resolves a root-relative stream_url against the direct base (hub: paired server origin), NOT the proxy base', async () => {
    // On the hub `mediaApiBase` is the relay-proxy base and `mediaDirectBase` is the
    // paired server's own origin. A signed, root-relative stream_url must stream
    // straight from the server (direct base), bypassing the proxy.
    const signed = '/media/m1/stream?exp=9999999999&sig=abc123';
    const fetchMock = okFetch(media({ id: 'm1', stream_url: signed }));
    const { w } = await mountAt('m1', fetchMock, {
      mediaApiBase: '/api/v1/servers/srv-1/proxy',
      mediaDirectBase: 'https://server.test',
    });
    await flushPromises();
    const player = w.findComponent(Player);
    expect(player.props('streamUrl')).toBe(`https://server.test${signed}`);
    // The bare-path branch resolves against the direct base too.
    const resolve = player.props('streamUrlFor') as (m: MediaItem) => string;
    expect(resolve(media({ id: 'm2' }))).toBe('https://server.test/media/m2/stream');
  });

  it('resolves a root-relative stream_url against the media-api base when no direct base is provided (media server)', async () => {
    const signed = '/media/m1/stream?exp=9999999999&sig=abc123';
    const fetchMock = okFetch(media({ id: 'm1', stream_url: signed }));
    // mediaApiBase given, but mediaDirectBase absent → resolve against the api base.
    const { w } = await mountAt('m1', fetchMock, { mediaApiBase: 'https://server.test' });
    await flushPromises();
    const player = w.findComponent(Player);
    expect(player.props('streamUrl')).toBe(`https://server.test${signed}`);
    const resolve = player.props('streamUrlFor') as (m: MediaItem) => string;
    expect(resolve(media({ id: 'm2' }))).toBe('https://server.test/media/m2/stream');
  });

  it('returns an absolute http(s) stream_url unchanged even when a direct base is provided', async () => {
    const absolute = 'https://cdn.test/media/m1/stream?sig=abc';
    const fetchMock = okFetch(media({ id: 'm1', stream_url: absolute }));
    const { w } = await mountAt('m1', fetchMock, {
      mediaApiBase: '/api/v1/servers/srv-1/proxy',
      mediaDirectBase: 'https://server.test',
    });
    await flushPromises();
    const player = w.findComponent(Player);
    expect(player.props('streamUrl')).toBe(absolute);
    const resolve = player.props('streamUrlFor') as (m: MediaItem) => string;
    expect(resolve(media({ id: 'm9', stream_url: absolute }))).toBe(absolute);
  });

  it('shows an error state with Retry/Back when the by-id fetch fails, and Retry re-loads', async () => {
    // UI-0.4: item + playback-info fire concurrently, so this routes by URL (not by
    // call order). The by-id endpoint fails once then succeeds on retry.
    let byIdCalls = 0;
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      const u = String(url);
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, 'm1')) {
        byIdCalls += 1;
        return byIdCalls === 1
          ? Promise.resolve(errorResponse(500)) // initial by-id fails
          : Promise.resolve(jsonResponse({ item: media({ id: 'm1' }) })); // retry by-id
      }
      return Promise.resolve(jsonResponse({ items: [], total: 0 })); // queue
    });
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.findComponent(Player).exists()).toBe(false);
    expect(w.text()).toContain("Couldn't play this title");

    const retry = w.findAll('button').find((b) => b.text() === 'Retry');
    expect(retry).toBeTruthy();
    await retry!.trigger('click');
    await flushPromises();
    expect(w.findComponent(Player).exists()).toBe(true);
  });
});

describe('PlayerPage — playback-info (chapters + skip markers)', () => {
  it('maps server chapters (start_seconds → start) onto the Player', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }), {
      chapters: [
        { start_seconds: 0, end_seconds: 60, title: 'Cold open' },
        { start_seconds: 90, end_seconds: 200 },
      ],
    });
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.findComponent(Player).props('chapters')).toEqual([
      { start: 0, end: 60, title: 'Cold open' },
      { start: 90, end: 200, title: undefined },
    ]);
  });

  it('maps intro/outro markers (start_seconds/end_seconds → start/end) onto the Player', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }), {
      intro_marker: { start_seconds: 5, end_seconds: 35 },
      outro_marker: { start_seconds: 600, end_seconds: 660 },
    });
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const player = w.findComponent(Player);
    expect(player.props('introMarker')).toEqual({ start: 5, end: 35 });
    expect(player.props('outroMarker')).toEqual({ start: 600, end: 660 });
  });

  it('passes empty chapters + null markers when playback-info is absent', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }), null); // playback-info 404
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const player = w.findComponent(Player);
    expect(player.props('chapters')).toEqual([]);
    expect(player.props('introMarker')).toBeNull();
    expect(player.props('outroMarker')).toBeNull();
  });

  // UI-0.4: item + playback-info are fired CONCURRENTLY (both dispatched before
  // either is awaited). `loading` gates on the item ONLY, so the <Player> mounts as
  // soon as the item resolves even if playback-info never settles — markers just stay
  // empty and fill in reactively later.
  it('clears loading and mounts <Player> when the item resolves even if playback-info never settles', async () => {
    const item = media({ id: 'm1' });
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      const u = String(url);
      if (isAnyPlaybackInfo(u)) return new Promise<Response>(() => {}); // NEVER resolves
      if (isById(u, 'm1')) {
        return Promise.resolve(jsonResponse({ item }));
      }
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    // Player mounted (loading cleared) despite the hung playback-info request.
    const player = w.findComponent(Player);
    expect(player.exists()).toBe(true);
    expect(player.props('streamUrl')).toBe('/media/m1/stream');
    // Markers stay empty until playback-info lands (it never does here).
    expect(player.props('chapters')).toEqual([]);
    expect(player.props('introMarker')).toBeNull();
    // playback-info WAS dispatched (concurrent), not skipped.
    expect(fetchMock.mock.calls.some(([u]) => isRoute(u, playbackInfoPath('m1')))).toBe(true);
  });
});

describe('PlayerPage — up-next queue', () => {
  it('builds a genre-scoped queue (excludes self, caps at 12) for movies', async () => {
    // Movie: loadQueue falls through to genre path, loadEpisodeNeighbours returns early
    const base = media({ id: 'm1', genres: ['Sci-Fi'] });
    const items: MediaItem[] = [base, ...Array.from({ length: 13 }, (_, i) => media({ id: `s${i}` }))];
    const fetchMock = okFetch(base, {}, items);
    await mountAt('m1', fetchMock);
    await flushPromises();
    await flushPromises(); // drain loadQueue's fetch + .then (fire-and-forget after item resolves)
    const player = usePlayerStore();
    // Movie uses genre-scoped queue: self excluded, capped at 12
    expect(player.queue.find((m) => m.id === 'm1')).toBeUndefined(); // self excluded
    expect(player.queue).toHaveLength(12); // capped
    expect(player.upNext?.id).toBe('s0');
  });

  it('skips the queue fetch and sets empty queue when the title has no genres', async () => {
    // loadQueue returns early (genre=undefined) without making a network call
    const fetchMock = okFetch(media({ id: 'm1', genres: [] }));
    await mountAt('m1', fetchMock);
    await flushPromises();
    const player = usePlayerStore();
    expect(player.queue).toHaveLength(0);
  });

  // S12 (updates.md #12) — DETERMINISTIC auto-play-next. The queue used to be written by
  // TWO unawaited racers: the genre-similar `loadQueue` and the episode-ordered
  // `loadEpisodeNeighbours`. When the genre fetch resolved LAST it clobbered the
  // authoritative episode order.
  //
  // These tests do NOT sample the race with a timer (a 40ms/80ms window is a coin flip
  // dressed as evidence, and repeating it N times proves nothing). Instead the genre
  // response is held behind a DEFERRED promise the test itself resolves: the "slow genre
  // fetch lands LAST" interleaving — the exact one the old code lost to — is FORCED, not
  // hoped for. If the genre fetch is issued at all, its response is guaranteed to arrive
  // after the episode-ordered path has already written the queue.
  // The genre-similar queue: `GET /api/v1/media?…&sort=rating&…` (buildMediaUrl, in
  // PlayerPage.vue:234). Path + PARSED query, not two substrings: `'sort=rating'`
  // also matches `?sort=ratingX`, and `'/api/v1/media?'` misses a base-prefixed url
  // with no query at all.
  const isGenreQueue = (u: string): boolean =>
    isRoute(u, MEDIA_LIST_PATH) && hasQuery(u, 'sort', 'rating');

  /** A promise whose settlement the TEST controls — no timers, no sampling, no retries. */
  function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void } {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((r) => {
      resolve = r;
    });
    return { promise, resolve };
  }

  it('deterministically seeds remaining series episodes even when the genre queue fetch resolves LAST (race regression)', async () => {
    function ep(over: Partial<MediaItem> & { id: string }): MediaItem {
      // Real genre so loadQueue would issue a genre-similar fetch under the old racy code.
      return media({ name: over.id, type: 'episode', genres: ['Sci-Fi'], ...over });
    }
    const e1 = ep({ id: 'q-e1', parent_id: 'q-ser', season_number: 1, episode_number: 1 });
    const e2 = ep({ id: 'q-e2', parent_id: 'q-ser', season_number: 1, episode_number: 2 });
    const e3 = ep({ id: 'q-e3', parent_id: 'q-ser', season_number: 1, episode_number: 3 });
    // Genre-similar rows the held-open loadQueue fetch would return — these must NOT win.
    const g1 = media({ id: 'q-g1', type: 'movie', genres: ['Sci-Fi'] });
    const g2 = media({ id: 'q-g2', type: 'movie', genres: ['Sci-Fi'] });
    // The genre response is HELD until the test releases it — see the note above.
    const genreGate = deferred<Response>();
    let genreRequests = 0;
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isGenreQueue(u)) {
        genreRequests += 1;
        return genreGate.promise;
      }
      // Series-tree + by-id + playback-info all resolve IMMEDIATELY.
      if (isById(u, 'q-e1')) return Promise.resolve(jsonResponse({ item: e1 }));
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, 'q-ser')) {
        return Promise.resolve(jsonResponse({ item: media({ id: 'q-ser', type: 'series' }) }));
      }
      if (isChildrenOf(u, 'q-ser')) return Promise.resolve(jsonResponse({ items: [e1, e2, e3], total: 3 }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    await mountAt('q-e1', fetchMock);
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    // The awaited episode-neighbour path seeded the authoritative queue [e2, e3].
    expect(player.queue.map((m) => m.id)).toEqual(['q-e2', 'q-e3']);

    // Release the genre response NOW — strictly after the episode-ordered write. Under the
    // old two-writer code the genre fetch IS in flight here and this resolve() deterministically
    // clobbers the queue to [q-g1, q-g2]. Under the fix the fetch was never issued, so the
    // resolve is inert. (The `CONTROL` test below proves this gate is not inert by construction.)
    genreGate.resolve(jsonResponse({ items: [g1, g2], total: 2 }));
    await flushPromises();
    await flushPromises();
    expect(player.queue.map((m) => m.id)).toEqual(['q-e2', 'q-e3']);
    // The deterministic fix short-circuits the genre queue for an episode WITH a next
    // neighbour: the genre fetch is never even issued.
    expect(genreRequests).toBe(0);
  });

  it('CONTROL: the identical deferred genre gate DOES reach player.setQueue when loadQueue is the legitimate writer', async () => {
    // Non-inertness control for the race test above. That test asserts a NEGATIVE ("the
    // released genre response did not overwrite the queue"), which a mis-routed fetch mock
    // or a dead gate would satisfy vacuously. Here the SAME gate + the SAME `sort=rating`
    // URL matcher is used on a MOVIE, where loadQueue is the rightful writer: the request IS
    // issued, the queue stays empty while the gate is held, and releasing the gate writes
    // the genre rows through. So a vacuous pass in the race test is ruled out.
    const base = media({ id: 'ctl-m1', type: 'movie', genres: ['Sci-Fi'] });
    const g1 = media({ id: 'ctl-g1', type: 'movie', genres: ['Sci-Fi'] });
    const g2 = media({ id: 'ctl-g2', type: 'movie', genres: ['Sci-Fi'] });
    const genreGate = deferred<Response>();
    let genreRequests = 0;
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isGenreQueue(u)) {
        genreRequests += 1;
        return genreGate.promise;
      }
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, 'ctl-m1')) return Promise.resolve(jsonResponse({ item: base }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    await mountAt('ctl-m1', fetchMock);
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    // The gate really is wired to the production genre URL...
    expect(genreRequests).toBe(1);
    // ...and it really is holding the response open (nothing written yet).
    expect(player.queue).toHaveLength(0);
    // ...and releasing it really does propagate all the way to player.setQueue.
    genreGate.resolve(jsonResponse({ items: [g1, g2], total: 2 }));
    await flushPromises();
    await flushPromises();
    expect(player.queue.map((m) => m.id)).toEqual(['ctl-g1', 'ctl-g2']);
  });

  it('treats a type:"episode" row with NO parsed episode_number as an episode (up-next = next episode, not genre rows)', async () => {
    // S12 residual. `loadEpisodeNeighbours` calls an item an episode when
    // `type === 'episode' || episode_number != null`, and `series-grouping.episodesOf()`
    // uses the same union — so a `type:'episode'` row with a NULL episode_number IS in the
    // ordered playback list. `applyItem` used to test `episode_number` ALONE, so for such a
    // row it skipped the episode path entirely and went straight to loadQueue. Before S12
    // that was survivable (loadQueue had its own `type === 'episode'` cache lookup); S12
    // deleted that lookup, so the narrower predicate silently stranded these rows on the
    // genre queue with no prev/next. The server produces this shape whenever the scanner
    // parsed no episode number (phlix-server MediaItemShaper.php:279 → episode_number null).
    function ep(over: Partial<MediaItem> & { id: string }): MediaItem {
      return media({ name: over.id, type: 'episode', genres: ['Sci-Fi'], ...over });
    }
    const e1 = ep({ id: 'nx-e1', parent_id: 'nx-ser', season_number: 1, episode_number: 1 });
    // The row under test: typed as an episode, but the scanner parsed no episode number.
    const e2 = ep({ id: 'nx-e2', parent_id: 'nx-ser', season_number: 1, episode_number: null });
    const e3 = ep({ id: 'nx-e3', parent_id: 'nx-ser', season_number: 2, episode_number: 1 });
    const g1 = media({ id: 'nx-g1', type: 'movie', genres: ['Sci-Fi'] });
    const genreGate = deferred<Response>();
    let genreRequests = 0;
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isGenreQueue(u)) {
        genreRequests += 1;
        return genreGate.promise;
      }
      if (isById(u, 'nx-e2')) return Promise.resolve(jsonResponse({ item: e2 }));
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, 'nx-ser')) {
        return Promise.resolve(jsonResponse({ item: media({ id: 'nx-ser', type: 'series' }) }));
      }
      if (isChildrenOf(u, 'nx-ser')) return Promise.resolve(jsonResponse({ items: [e1, e2, e3], total: 3 }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    const { w } = await mountAt('nx-e2', fetchMock);
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    // Playback order is [nx-e1, nx-e2 (no number → last in S1), nx-e3 (S2E1)].
    expect((w.findComponent(Player).props('nextEpisode') as MediaItem | null)?.id).toBe('nx-e3');
    expect((w.findComponent(Player).props('prevEpisode') as MediaItem | null)?.id).toBe('nx-e1');
    expect(player.queue.map((m) => m.id)).toEqual(['nx-e3']);
    // The genre fallback must never have been reached for a row that HAS a next episode.
    expect(genreRequests).toBe(0);
    // Release the gate anyway: even if a future change re-issues the fetch, the episode
    // order must survive it.
    genreGate.resolve(jsonResponse({ items: [g1], total: 1 }));
    await flushPromises();
    await flushPromises();
    expect(player.queue.map((m) => m.id)).toEqual(['nx-e3']);
  });

  it('reseeds the up-next queue from the CACHED series order on binge navigation (no re-fetch, no genre queue)', async () => {
    // Binge fast path: after the first episode fetched + cached the series tree, advancing
    // to a sibling must reseed the queue from seriesEpisodeCache WITHOUT re-walking the
    // tree AND without falling back to the genre queue.
    function ep(over: Partial<MediaItem> & { id: string }): MediaItem {
      return media({ name: over.id, type: 'episode', genres: ['Sci-Fi'], ...over });
    }
    const e1 = ep({ id: 'bz-e1', parent_id: 'bz-ser', season_number: 1, episode_number: 1 });
    const e2 = ep({ id: 'bz-e2', parent_id: 'bz-ser', season_number: 1, episode_number: 2 });
    const e3 = ep({ id: 'bz-e3', parent_id: 'bz-ser', season_number: 1, episode_number: 3 });
    const byId: Record<string, MediaItem> = { 'bz-e1': e1, 'bz-e2': e2, 'bz-e3': e3 };
    // Same deferred gate as the race test: if anything DID fire the genre queue during the
    // binge, its response is forced to land after both navigations have settled.
    const genreGate = deferred<Response>();
    let genreRequests = 0;
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isGenreQueue(u)) {
        genreRequests += 1;
        return genreGate.promise;
      }
      if (isById(u, 'bz-e1')) return Promise.resolve(jsonResponse({ item: byId['bz-e1'] }));
      if (isById(u, 'bz-e2')) return Promise.resolve(jsonResponse({ item: byId['bz-e2'] }));
      if (isById(u, 'bz-e3')) return Promise.resolve(jsonResponse({ item: byId['bz-e3'] }));
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, 'bz-ser')) {
        return Promise.resolve(jsonResponse({ item: media({ id: 'bz-ser', type: 'series' }) }));
      }
      if (isChildrenOf(u, 'bz-ser')) return Promise.resolve(jsonResponse({ items: [e1, e2, e3], total: 3 }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    const { router } = await mountAt('bz-e1', fetchMock);
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    expect(player.queue.map((m) => m.id)).toEqual(['bz-e2', 'bz-e3']);
    const childrenCalls = () =>
      fetchMock.mock.calls.filter((c) => isChildrenOf(c[0], 'bz-ser')).length;
    expect(childrenCalls()).toBe(1);

    // Binge to the next sibling — CACHE HIT: queue reseeds to [e3] from the cached order,
    // with no series-tree re-walk and no genre fallback.
    await router.push('/app/player/bz-e2');
    await flushPromises();
    await flushPromises();
    expect(player.queue.map((m) => m.id)).toEqual(['bz-e3']);
    expect(childrenCalls()).toBe(1); // series tree NOT re-fetched (cache hit)
    expect(genreRequests).toBe(0); // genre queue never used across the whole binge
    // Release the (never-issued) genre gate last: the cache-seeded queue must survive it.
    genreGate.resolve(jsonResponse({ items: [media({ id: 'bz-g9' })], total: 1 }));
    await flushPromises();
    await flushPromises();
    expect(player.queue.map((m) => m.id)).toEqual(['bz-e3']);
  });

  it('falls through to the genre-similar queue for the LAST episode (no next neighbour), which is NOT short-circuited', async () => {
    // S12 fall-through edge: an episode with a genre but NO next neighbour (series finale)
    // must NOT early-return in applyItem. loadEpisodeNeighbours resolves nextEp=null and
    // seeds no queue (remaining empty), so applyItem falls through to the genre fallback —
    // the finale still gets an up-next queue instead of a dead one.
    function ep(over: Partial<MediaItem> & { id: string }): MediaItem {
      return media({ name: over.id, type: 'episode', genres: ['Sci-Fi'], ...over });
    }
    const e1 = ep({ id: 'fe-e1', parent_id: 'fe-ser', season_number: 1, episode_number: 1 });
    const e2 = ep({ id: 'fe-e2', parent_id: 'fe-ser', season_number: 1, episode_number: 2 }); // finale
    const g1 = media({ id: 'fe-g1', type: 'movie', genres: ['Sci-Fi'] });
    const g2 = media({ id: 'fe-g2', type: 'movie', genres: ['Sci-Fi'] });
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isGenreQueue(u)) return Promise.resolve(jsonResponse({ items: [g1, g2], total: 2 }));
      if (isById(u, 'fe-e2')) return Promise.resolve(jsonResponse({ item: e2 }));
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, 'fe-ser')) {
        return Promise.resolve(jsonResponse({ item: media({ id: 'fe-ser', type: 'series' }) }));
      }
      if (isChildrenOf(u, 'fe-ser')) return Promise.resolve(jsonResponse({ items: [e1, e2], total: 2 }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    const { w } = await mountAt('fe-e2', fetchMock);
    await flushPromises();
    await flushPromises();
    await flushPromises(); // drain the fall-through genre fetch + its .then
    const player = usePlayerStore();
    // Finale: no next episode, so applyItem did NOT early-return.
    expect(w.findComponent(Player).props('nextEpisode')).toBeNull();
    // The genre fallback fired (proving the fall-through) and seeded the up-next queue.
    expect(fetchMock.mock.calls.some(([u]) => isGenreQueue(String(u)))).toBe(true);
    expect(player.queue.map((m) => m.id)).toEqual(['fe-g1', 'fe-g2']);
  });
});

describe('PlayerPage — prev/next episode (U2)', () => {
  function ep(over: Partial<MediaItem> & { id: string }): MediaItem {
    return media({ name: over.id, type: 'episode', genres: [], ...over });
  }

  /** URL-routed fetch so the episode-neighbour walk (parent lookup + parentId
   *  children) resolves deterministically regardless of call order. */
  function routedFetch(routes: { match: (url: string) => boolean; body: unknown }[]) {
    return vi.fn((url: string) => {
      const hit = routes.find((r) => r.match(url));
      return Promise.resolve(jsonResponse(hit ? hit.body : { items: [], total: 0 }));
    });
  }

  it('resolves prev/next across the series and passes them + autoplay to the Player', async () => {
    const e1 = ep({ id: 'e1', parent_id: 'ser1', season_number: 1, episode_number: 1 });
    const e2 = ep({ id: 'e2', parent_id: 'ser1', season_number: 1, episode_number: 2 });
    const e3 = ep({ id: 'e3', parent_id: 'ser1', season_number: 2, episode_number: 1 }); // cross-season
    const fetchMock = routedFetch([
      { match: (u) => isById(u, 'e2'), body: { item: e2 } },
      { match: (u) => isAnyPlaybackInfo(u), body: { intro_marker: null, outro_marker: null, chapters: [] } },
      { match: (u) => isById(u, 'ser1'), body: { item: media({ id: 'ser1', type: 'series' }) } },
      { match: (u) => isChildrenOf(u, 'ser1'), body: { items: [e1, e2, e3], total: 3 } },
    ]);
    const { w } = await mountAt('e2', fetchMock);
    await flushPromises();
    await flushPromises();
    const player = w.findComponent(Player);
    expect((player.props('prevEpisode') as MediaItem | null)?.id).toBe('e1');
    expect((player.props('nextEpisode') as MediaItem | null)?.id).toBe('e3'); // rolls into next season
    expect(player.props('autoplay')).toBe(true);
  });

  it('leaves prev/next null for a movie (no neighbour fetch)', async () => {
    const fetchMock = okFetch(media({ id: 'm1', type: 'movie' }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const player = w.findComponent(Player);
    expect(player.props('prevEpisode')).toBeNull();
    expect(player.props('nextEpisode')).toBeNull();
  });

  it('navigates to the adjacent episode route on the Player play-episode emit', async () => {
    const fetchMock = okFetch(media({ id: 'e2', type: 'episode' }));
    const { w, router } = await mountAt('e2', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(Player).vm.$emit('play-episode', media({ id: 'e3' }));
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'e3' } });
  });

  it('excludes Specials (season 0) from the auto-advance chain (Next off the finale is disabled)', async () => {
    const e1 = ep({ id: 'sp-e1', parent_id: 'sp-ser', season_number: 1, episode_number: 1 });
    const e2 = ep({ id: 'sp-e2', parent_id: 'sp-ser', season_number: 1, episode_number: 2 }); // finale
    const sp = ep({ id: 'sp-x', parent_id: 'sp-ser', season_number: 0, episode_number: 1 }); // Special
    const fetchMock = routedFetch([
      { match: (u) => isById(u, 'sp-e2'), body: { item: e2 } },
      { match: (u) => isAnyPlaybackInfo(u), body: { intro_marker: null, outro_marker: null, chapters: [] } },
      { match: (u) => isById(u, 'sp-ser'), body: { item: media({ id: 'sp-ser', type: 'series' }) } },
      { match: (u) => isChildrenOf(u, 'sp-ser'), body: { items: [e1, e2, sp], total: 3 } },
    ]);
    const { w } = await mountAt('sp-e2', fetchMock);
    await flushPromises();
    await flushPromises();
    const player = w.findComponent(Player);
    expect((player.props('prevEpisode') as MediaItem | null)?.id).toBe('sp-e1');
    expect(player.props('nextEpisode')).toBeNull(); // finale → Special is NOT auto-advanced into
  });

  it('reuses the cached series order on sibling navigation — no re-fetch of the series tree', async () => {
    // Distinct series id so the module-level cache entry is unique to this test.
    const e1 = ep({ id: 'cache-e1', parent_id: 'cache-ser', season_number: 1, episode_number: 1 });
    const e2 = ep({ id: 'cache-e2', parent_id: 'cache-ser', season_number: 1, episode_number: 2 });
    const e3 = ep({ id: 'cache-e3', parent_id: 'cache-ser', season_number: 1, episode_number: 3 });
    const byId: Record<string, MediaItem> = { 'cache-e1': e1, 'cache-e2': e2, 'cache-e3': e3 };
    const fetchMock = routedFetch([
      { match: (u) => isById(u, 'cache-e1'), body: { item: byId['cache-e1'] } },
      { match: (u) => isById(u, 'cache-e2'), body: { item: byId['cache-e2'] } },
      { match: (u) => isById(u, 'cache-e3'), body: { item: byId['cache-e3'] } },
      { match: (u) => isAnyPlaybackInfo(u), body: { intro_marker: null, outro_marker: null, chapters: [] } },
      { match: (u) => isById(u, 'cache-ser'), body: { item: media({ id: 'cache-ser', type: 'series' }) } },
      { match: (u) => isChildrenOf(u, 'cache-ser'), body: { items: [e1, e2, e3], total: 3 } },
    ]);

    const { w, router } = await mountAt('cache-e2', fetchMock);
    await flushPromises();
    await flushPromises();
    // First load fetched the series tree exactly once: parent-hop + root children.
    const rootHopCalls = () => fetchMock.mock.calls.filter((c) => isById(c[0], 'cache-ser')).length;
    const childrenCalls = () => fetchMock.mock.calls.filter((c) => isChildrenOf(c[0], 'cache-ser')).length;
    expect(rootHopCalls()).toBe(1);
    expect(childrenCalls()).toBe(1);
    expect((w.findComponent(Player).props('nextEpisode') as MediaItem | null)?.id).toBe('cache-e3');

    // Navigate to the next sibling (same series) — should be a CACHE HIT: no new
    // series-root lookup, no new children fetch.
    await router.push('/app/player/cache-e3');
    await flushPromises();
    await flushPromises();
    expect(rootHopCalls()).toBe(1); // unchanged — series tree not re-walked
    expect(childrenCalls()).toBe(1); // unchanged — children not re-fetched
    const player = w.findComponent(Player);
    expect((player.props('prevEpisode') as MediaItem | null)?.id).toBe('cache-e2'); // recomputed from cache
    expect(player.props('nextEpisode')).toBeNull(); // e3 is the last numbered episode
  });
});

describe('PlayerPage — navigation + handoff', () => {
  it('navigates to the next player route on the Player play-next emit', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(Player).vm.$emit('play-next', media({ id: 'm2' }));
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'm2' } });
  });

  it('hides the mini-player on enter so the full player reclaims playback', async () => {
    const player = usePlayerStore();
    player.showMiniPlayer(); // pretend we arrived from the docked mini-player
    expect(player.miniPlayer).toBe(true);
    const fetchMock = okFetch(media({ id: 'm1' }));
    await mountAt('m1', fetchMock);
    await flushPromises();
    expect(player.miniPlayer).toBe(false);
  });

  it('hands off to the mini-player on route-leave when a session is live', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const player = usePlayerStore();
    expect(player.miniPlayer).toBe(false);
    expect(player.current?.id).toBe('m1'); // <Player> seeded the store
    expect(player.streamUrl).toBe('/media/m1/stream');

    await router.push('/app'); // leave the player route
    await flushPromises();
    expect(player.miniPlayer).toBe(true);
  });

  it('does not show the mini-player on leave when there is no live session', async () => {
    const fetchMock = vi.fn().mockResolvedValue(errorResponse(500)); // load fails → no <Player>
    const { router } = await mountAt('bad', fetchMock);
    await flushPromises();
    const player = usePlayerStore();
    expect(player.current).toBeNull();

    await router.push('/app');
    await flushPromises();
    expect(player.miniPlayer).toBe(false);
  });
});

describe('PlayerPage — resume + theater + ambient', () => {
  it('restores the resume prompt on open from the persisted resume map', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ m1: 500 }));
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    // the resume prompt is owned by <Player> (R3.8) — this proves the page feeds the
    // right id so the resume map entry resolves end-to-end.
    expect(w.find('[role="region"][aria-label="Resume playback"]').exists()).toBe(true);
  });

  it('widens + dims the page (is-theater) when <Player> emits theater', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.find('.player-page').classes()).not.toContain('is-theater');
    w.findComponent(Player).vm.$emit('theater', true);
    await w.vm.$nextTick();
    expect(w.find('.player-page').classes()).toContain('is-theater');
  });

  it('mirrors the theater toggle into the shared player-UI store (drives the shell chrome removal — S34 fix)', async () => {
    // The shell (PhlixApp) removes its chrome (`shell--flush`) on the SAME trigger as
    // the 100dvh growth, reading this shared flag. Default is false → the non-theater
    // player view keeps its header; entering theater surfaces `true` up to the shell.
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const playerUi = usePlayerUiStore();
    expect(playerUi.theaterActive).toBe(false); // default: chrome stays (regression guard)
    w.findComponent(Player).vm.$emit('theater', true);
    await w.vm.$nextTick();
    expect(playerUi.theaterActive).toBe(true); // entering theater flushes the shell
    w.findComponent(Player).vm.$emit('theater', false);
    await w.vm.$nextTick();
    expect(playerUi.theaterActive).toBe(false); // leaving theater restores the chrome
  });

  it('keeps the shared theater state across binge (player→player) navigation — the page instance is reused, no reset', async () => {
    const routed = vi.fn((url: string) => {
      const u = String(url);
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, 'm1')) return Promise.resolve(jsonResponse({ item: media({ id: 'm1' }) }));
      if (isById(u, 'm2')) return Promise.resolve(jsonResponse({ item: media({ id: 'm2' }) }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    const { w, router } = await mountAt('m1', routed);
    await flushPromises();
    const playerUi = usePlayerUiStore();
    w.findComponent(Player).vm.$emit('theater', true);
    await w.vm.$nextTick();
    expect(playerUi.theaterActive).toBe(true);

    // Binge-advance to another player route: same PlayerPage instance (param change,
    // NOT a remount → no onBeforeUnmount), so theater persists into the next title.
    await router.push('/app/player/m2');
    await flushPromises();
    expect(playerUi.theaterActive).toBe(true);
  });

  it('grows the stage to 100dvh under theater, keeping the default 16:9/90vh cap (S34)', () => {
    // jsdom does not apply an SFC's compiled <style>, so pin the sizing contract
    // off the raw source. The DEFAULT stage carries no viewport-height cap; the
    // theater stage fills 100dvh (with a vh fallback) once the shell chrome is gone.
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), './PlayerPage.vue'), 'utf8');
    // The loading skeleton keeps the 16:9 / 90vh footprint as the default look.
    expect(src).toMatch(/\.player-page__skeleton\s*\{[\s\S]*?aspect-ratio:\s*16\s*\/\s*9;[\s\S]*?max-height:\s*90vh;/);
    // The theater stage grows full-bleed.
    const rule = src.match(/\.player-page\.is-theater\s+\.player-page__stage\s*\{([\s\S]*?)\}/);
    expect(rule, 'a theater stage rule exists').toBeTruthy();
    const body = rule![1];
    expect(body).toMatch(/padding:\s*0;/); // gutter removed
    expect(body).toMatch(/height:\s*100dvh;/); // fills the dynamic viewport
    expect(body).toMatch(/height:\s*100vh;/); // …with a vh fallback
  });

  it('escapes the poster url in the ambient backdrop so it cannot break out of CSS url()', async () => {
    const fetchMock = okFetch(media({ id: 'm1', poster_url: 'evil.jpg") ; background: url("x' }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const style = w.find('.player-page__ambient').attributes('style') ?? '';
    expect(style).toContain('\\"'); // inner quotes backslash-escaped
    expect(style).not.toMatch(/url\("evil\.jpg"\)/); // not left as a bare closeable url
  });

  it('omits the ambient backdrop when the title has no poster', async () => {
    const fetchMock = okFetch(media({ id: 'm1', poster_url: null }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.find('.player-page__ambient').exists()).toBe(false);
  });
});

describe('PlayerPage — edge cases', () => {
  it('goes back via router.back when <Player> emits back', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const back = vi.spyOn(router, 'back');
    w.findComponent(Player).vm.$emit('back');
    expect(back).toHaveBeenCalled();
  });

  it('treats a failed up-next queue fetch as non-fatal (player still renders, empty queue)', async () => {
    // UI-0.4: item + playback-info fire concurrently → route by URL, not call order.
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      const u = String(url);
      // The up-next queue is the genre-similar LIST fetch (`/api/v1/media?…sort=rating`),
      // NOT a `/similar` route — PlayerPage.vue has no `/similar` call at all, so the
      // `.includes('/similar')` branch this replaces never fired and the trailing
      // rejection was doing the work. Named explicitly now (S193).
      if (isRoute(u, MEDIA_LIST_PATH) && hasQuery(u, 'sort', 'rating')) {
        return Promise.reject(new Error('queue down')); // up-next list rejects
      }
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, 'm1')) {
        return Promise.resolve(jsonResponse({ item: media({ id: 'm1', genres: ['Sci-Fi'] }) }));
      }
      return Promise.reject(new Error('queue down'));
    });
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.findComponent(Player).exists()).toBe(true);
    expect(usePlayerStore().queue).toHaveLength(0);
  });

  it('shows a generic error message when the failure is not an Error instance', async () => {
    const fetchMock = vi.fn().mockRejectedValue('network gone'); // non-Error throw
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.text()).toContain('Failed to load media');
  });

  it('shows an error and skips fetching when the route has no media id', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/app/player/:id?', name: 'player', component: PlayerPage }],
    });
    await router.push('/app/player');
    await router.isReady();
    const Harness = { template: '<router-view />' };
    const w = mount(Harness, { global: { plugins: [router] } });
    wrappers.push(w);
    await flushPromises();
    expect(w.text()).toContain('No media id provided');
    expect(w.findComponent(Player).exists()).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('PlayerPage — user_data hydrate (Feature 16.3)', () => {
  it('hydrates the favorites store from the fetched item after a successful load', async () => {
    const userItemData = useUserItemDataStore();
    const hydrate = vi.spyOn(userItemData, 'hydrate');
    const item = media({
      id: 'm1',
      // user_data lives on MediaDetail (type split) — the page-level fetch is the
      // authoritative source the player controls pre-fill from.
      user_data: { favorite: true, rating: 8, like_level: 2 },
    } as Partial<MediaItem>);
    const fetchMock = okFetch(item);
    await mountAt('m1', fetchMock);
    await flushPromises();

    // The page hydrated with the fetched item (carrying user_data).
    expect(hydrate).toHaveBeenCalled();
    const hydratedWith = hydrate.mock.calls.map((c) => c[0] as MediaItem | null | undefined);
    expect(hydratedWith.some((m) => m?.id === 'm1')).toBe(true);
    // And the store reflects the server state so the controls pre-fill on open.
    expect(userItemData.isFavorite('m1')).toBe(true);
    expect(userItemData.likeLevel('m1')).toBe(2);
  });

  it('does not hydrate when the by-id fetch fails (no <Player>, no item)', async () => {
    const userItemData = useUserItemDataStore();
    const hydrate = vi.spyOn(userItemData, 'hydrate');
    const fetchMock = vi.fn().mockResolvedValue(errorResponse(500)); // load fails
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();

    expect(w.findComponent(Player).exists()).toBe(false); // no Player ⇒ no Player-side hydrate either
    expect(hydrate).not.toHaveBeenCalled();
  });
});

describe('PlayerPage — teardown', () => {
  it('resets the shared theater state when the page unmounts (so a later non-theater visit keeps the shell chrome — S34 fix)', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const playerUi = usePlayerUiStore();
    w.findComponent(Player).vm.$emit('theater', true);
    await w.vm.$nextTick();
    expect(playerUi.theaterActive).toBe(true);

    w.unmount(); // leaving the route unmounts PlayerPage → onBeforeUnmount reset
    expect(playerUi.theaterActive).toBe(false);
  });

  it('resets the shared theater state on route-leave (no stale flush on the next non-theater visit)', async () => {
    const fetchMock = okFetch(media({ id: 'm1' }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const playerUi = usePlayerUiStore();
    w.findComponent(Player).vm.$emit('theater', true);
    await w.vm.$nextTick();
    expect(playerUi.theaterActive).toBe(true);

    await router.push('/app'); // leave the player route → PlayerPage unmounts
    await flushPromises();
    expect(playerUi.theaterActive).toBe(false);
  });

  it('does not write state when unmounted mid-fetch', async () => {
    let resolveFetch!: (r: Response) => void;
    const pending = new Promise<Response>((res) => {
      resolveFetch = res;
    });
    const fetchMock = vi.fn().mockReturnValue(pending);
    const { w } = await mountAt('m1', fetchMock);
    expect(w.find('[role="status"][aria-busy="true"]').exists()).toBe(true);

    w.unmount(); // tear down while the by-id request is outstanding
    resolveFetch(jsonResponse({ item: media({ id: 'm1' }) }));
    await flushPromises();

    expect(w.findComponent(Player).exists()).toBe(false);
  });
});

/**
 * S172 — a SUPERSEDED `applyItem()` run must not commit anything for the item the user
 * navigated AWAY from.
 *
 * The mechanism, and why S12's fix does not cover it. `load()` does not await
 * `applyItem()`, and `applyItem` itself awaits (`loadEpisodeNeighbours`) before it fires
 * the genre fallback. So a second `load()` can complete ENTIRELY inside that await. When
 * the first run resumes it calls `loadQueue(client, itemA)` — and `loadQueue` reads the
 * module-level `controller` at CALL time, which by then is the NEW run's controller. Its
 * own staleness predicate (`myController !== controller`) therefore compares the new
 * controller with itself and can never trip: the superseded run writes item A's
 * genre rows into item B's up-next queue. S12's early return is inside a run that is
 * already superseded, so it cannot help.
 *
 * Two things make the reproduction deterministic rather than a sampled timing window
 * (this estate has a recorded race test that went 15/15 green on known-broken code):
 *  - the response run A is parked on is a DEFERRED promise this test settles by hand, so
 *    "A resumes strictly after B has fully settled" is FORCED, not hoped for;
 *  - A and B carry DIFFERENT genres (Horror vs Comedy), so the up-next rows and the
 *    queue REQUEST identify which run wrote — an `A || B` outcome cannot be misread.
 *
 * Branch observation, not inference: `applyItem` has three shapes (episode-ordered
 * awaited path, cached-order fast path, genre fallback). Each test asserts on request
 * counters that only ONE of them produces — A's series-root lookup (`{p}-ser` by-id)
 * proves the awaited episode path was entered, `genres[]=Horror` proves A's genre
 * fallback fired, `genres[]=Comedy` proves B's did.
 */
describe('PlayerPage — a superseded applyItem() must not write the new item’s up-next (S172)', () => {
  function ep(over: Partial<MediaItem> & { id: string }): MediaItem {
    return media({ name: over.id, type: 'episode', ...over });
  }

  /** A promise whose settlement the TEST controls — no timers, no sampling, no retries. */
  function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void; reject: (e: unknown) => void } {
    let resolve!: (value: T) => void;
    let reject!: (e: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }

  /** What a signal-honouring `fetch` rejects with when its caller aborts it. */
  const abortError = (): Error => Object.assign(new Error('The operation was aborted.'), { name: 'AbortError' });

  /**
   * The genre-similar fallback queue FOR ONE GENRE:
   * `GET /api/v1/media?genres[]=<g>&limit=13&sort=rating&order=desc` (PlayerPage.vue:234).
   * Path + two PARSED query params — `buildMediaUrl` appends the repeated-array form
   * `genres[]`, so reading it as a parameter also pins the wire shape the server needs.
   */
  const isGenreQueueFor = (url: unknown, genre: string): boolean =>
    isRoute(url, MEDIA_LIST_PATH) && hasQuery(url, 'sort', 'rating') && hasQuery(url, 'genres[]', genre);

  /**
   * The A→B fixture. Episode A (`{p}-a1`, **Horror**) is episode 1 of series `{p}-ser`
   * and HAS a next episode, so run A necessarily takes the awaited episode-ordered path.
   * Movie B (`{p}-b1`, **Comedy**) is what the user navigates to. A's series-root lookup
   * — the FIRST await inside `loadEpisodeNeighbours`, which `applyItem` awaits — is held
   * open by `rootGate`, so the test decides exactly when run A regains control.
   *
   * `{p}` prefixes every id because `seriesEpisodeCache` is a module-level singleton with
   * no test hook: ids must not collide across tests in this file.
   */
  function fixture(p: string) {
    const a1 = ep({ id: `${p}-a1`, parent_id: `${p}-ser`, season_number: 1, episode_number: 1, genres: ['Horror'] });
    const a2 = ep({ id: `${p}-a2`, parent_id: `${p}-ser`, season_number: 1, episode_number: 2, genres: ['Horror'] });
    const b1 = media({ id: `${p}-b1`, type: 'movie', genres: ['Comedy'] });
    const horrorRow = media({ id: `${p}-horror-row`, genres: ['Horror'] });
    const comedyRow = media({ id: `${p}-comedy-row`, genres: ['Comedy'] });
    const rootGate = deferred<Response>();
    const counts = { root: 0, children: 0, horror: 0, comedy: 0 };
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isById(u, `${p}-ser`)) {
        counts.root += 1;
        return rootGate.promise; // run A parks HERE
      }
      if (isChildrenOf(u, `${p}-ser`)) {
        counts.children += 1;
        return Promise.resolve(jsonResponse({ items: [a1, a2], total: 2 }));
      }
      if (isGenreQueueFor(u, 'Horror')) {
        counts.horror += 1;
        return Promise.resolve(jsonResponse({ items: [horrorRow], total: 1 }));
      }
      if (isGenreQueueFor(u, 'Comedy')) {
        counts.comedy += 1;
        return Promise.resolve(jsonResponse({ items: [comedyRow], total: 1 }));
      }
      if (isById(u, a1.id)) return Promise.resolve(jsonResponse({ item: a1 }));
      if (isById(u, a2.id)) return Promise.resolve(jsonResponse({ item: a2 }));
      if (isById(u, b1.id)) return Promise.resolve(jsonResponse({ item: b1 }));
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    return { a1, a2, b1, horrorRow, comedyRow, rootGate, counts, fetchMock };
  }

  /**
   * Drive the shared interleaving up to the point where run A is about to regain control,
   * asserting at each step WHICH branch ran. Returns the fixture + the store.
   */
  async function parkAThenApplyB(p: string) {
    const f = fixture(p);
    const { router } = await mountAt(f.a1.id, f.fetchMock);
    await flushPromises();
    await flushPromises();
    // BRANCH: run A took the awaited episode-ordered path and is parked in
    // resolveSeriesRoot — not the cached-order fast path, not the genre fallback.
    expect(f.counts.root).toBe(1);
    expect(f.counts.children).toBe(0);
    expect(f.counts.horror).toBe(0);
    const player = usePlayerStore();
    expect(player.queue).toHaveLength(0); // nothing written yet, by anyone

    // Navigate to movie B while run A is parked. Same route name + a new param, so the
    // page is NOT remounted (`disposed` stays false) — the production binge/nav path.
    await router.push(`/app/player/${f.b1.id}`);
    await flushPromises();
    await flushPromises();
    await flushPromises();
    // BRANCH: B is a movie, so ITS applyItem fired the genre fallback and wrote the queue.
    expect(f.counts.comedy).toBe(1);
    expect(player.queue.map((m) => m.id)).toEqual([f.comedyRow.id]);
    return { f, player };
  }

  it('does not overwrite movie B’s queue when episode A’s held series-root lookup resolves late', async () => {
    const { f, player } = await parkAThenApplyB('s172r');

    // Release A's series-root response NOW — strictly after B has been fully applied.
    // Run A regains control here. Under the unfixed code it walks on to
    // `void loadQueue(client, A)`, whose `myController` is B's live controller, so its
    // staleness check cannot trip and A's Horror row lands in B's queue.
    f.rootGate.resolve(jsonResponse({ item: media({ id: 's172r-ser', type: 'series' }) }));
    await flushPromises();
    await flushPromises();
    await flushPromises();

    // The harm, stated first: B's up-next is still B's.
    expect(player.queue.map((m) => m.id)).toEqual([f.comedyRow.id]);
    // And the superseded run must not even ASK for its queue — a request counter, so this
    // is not the vacuous negative the queue assertion alone would be.
    expect(f.counts.horror).toBe(0);
    expect(f.counts.children).toBe(0); // nor resume the series-tree walk it abandoned
  });

  it('does not overwrite movie B’s queue when episode A’s series-root lookup REJECTS with the abort it was given (production shape)', async () => {
    // The same interleaving as above, reached the way a real browser reaches it: `load()`
    // for B aborts A's controller, so A's in-flight series-root fetch REJECTS with an
    // AbortError. `loadEpisodeNeighbours` swallows that (`isAbort`) and returns — and
    // `applyItem` then runs the genre fallback anyway, with B's un-aborted controller.
    // This variant does not depend on the fetch double ignoring `signal`.
    const { f, player } = await parkAThenApplyB('s172a');

    f.rootGate.reject(abortError());
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(player.queue.map((m) => m.id)).toEqual([f.comedyRow.id]);
    expect(f.counts.horror).toBe(0);
  });

  it('CONTROL: the identical Horror gate DOES reach player.setQueue when that run is still current', async () => {
    // Non-inertness control for both tests above, which assert a NEGATIVE ("A's rows did
    // not land") that a mis-routed double or a dead branch satisfies vacuously. Same
    // fixture, same `genres[]=Horror` matcher, same row payload — but NO navigation, and
    // the item is the LAST episode, so `applyItem` legitimately falls through to the genre
    // fallback. Every link in the chain is therefore proven live: the gate really holds
    // the series-root response, releasing it really completes the episode-ordered path,
    // and the Horror request really does write `{p}-horror-row` into the queue.
    const f = fixture('s172c');
    await mountAt(f.a2.id, f.fetchMock); // a2 = the finale ⇒ no next neighbour
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    expect(f.counts.root).toBe(1); // parked in the same place
    expect(f.counts.horror).toBe(0); // gate is genuinely holding: nothing issued yet
    expect(player.queue).toHaveLength(0);

    f.rootGate.resolve(jsonResponse({ item: media({ id: 's172c-ser', type: 'series' }) }));
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(f.counts.children).toBe(1); // the episode path completed this time
    expect(f.counts.horror).toBe(1); // …and fell through to the genre fallback
    expect(player.queue.map((m) => m.id)).toEqual([f.horrorRow.id]);
  });

  /**
   * The prev/next-episode half of the acceptance criteria (`nextEp`, `prevEp`).
   *
   * Reachability, stated honestly: this interleaving needs `applyItem` to be ENTERED
   * while already superseded, i.e. `load()`'s own by-id await to resume after a newer
   * `load()` finished. A signal-honouring `fetch` normally rejects that request instead
   * (leaving only the queue-write path above, which the abort cannot stop). It is
   * reachable when the abort cannot help: `load()` sets `controller = null` where
   * `AbortController` is undefined (PlayerPage.vue:346), and in that configuration EVERY
   * `myController !== controller` guard in the file degrades to `null !== null` — false —
   * so nothing is superseded and nothing is aborted. A monotonic generation is immune to
   * that, which is why the guard is a counter rather than the controller identity.
   */
  it('a superseded run does not replace the new episode’s prev/next or its item', async () => {
    const p = 's172n';
    // Series A — the episode being left. Its BY-ID response is held, so run A parks
    // inside `load()` itself.
    const a1 = ep({ id: `${p}-a1`, parent_id: `${p}-serA`, season_number: 1, episode_number: 1, genres: ['Horror'] });
    const a2 = ep({ id: `${p}-a2`, parent_id: `${p}-serA`, season_number: 1, episode_number: 2, genres: ['Horror'] });
    // Series B — the episode navigated TO. Everything for B resolves immediately.
    const b1 = ep({ id: `${p}-b1`, parent_id: `${p}-serB`, season_number: 1, episode_number: 1, genres: ['Comedy'] });
    const b2 = ep({ id: `${p}-b2`, parent_id: `${p}-serB`, season_number: 1, episode_number: 2, genres: ['Comedy'] });
    const itemGate = deferred<Response>();
    const counts = { aChildren: 0, bChildren: 0 };
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isById(u, a1.id)) return itemGate.promise; // run A parks HERE
      if (isById(u, b1.id)) return Promise.resolve(jsonResponse({ item: b1 }));
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, `${p}-serA`)) return Promise.resolve(jsonResponse({ item: media({ id: `${p}-serA`, type: 'series' }) }));
      if (isById(u, `${p}-serB`)) return Promise.resolve(jsonResponse({ item: media({ id: `${p}-serB`, type: 'series' }) }));
      if (isChildrenOf(u, `${p}-serA`)) {
        counts.aChildren += 1;
        return Promise.resolve(jsonResponse({ items: [a1, a2], total: 2 }));
      }
      if (isChildrenOf(u, `${p}-serB`)) {
        counts.bChildren += 1;
        return Promise.resolve(jsonResponse({ items: [b1, b2], total: 2 }));
      }
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });

    const { w, router } = await mountAt(a1.id, fetchMock);
    await flushPromises();
    expect(w.find('[role="status"][aria-busy="true"]').exists()).toBe(true); // A still loading

    await router.push(`/app/player/${b1.id}`);
    await flushPromises();
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    // BRANCH: B walked its OWN series tree and seeded the episode-ordered queue.
    expect(counts.bChildren).toBe(1);
    expect(counts.aChildren).toBe(0);
    expect((w.findComponent(Player).props('nextEpisode') as MediaItem | null)?.id).toBe(b2.id);
    expect(player.queue.map((m) => m.id)).toEqual([b2.id]);

    // Release A's item — run A resumes with a stale item after B is fully applied.
    itemGate.resolve(jsonResponse({ item: a1 }));
    await flushPromises();
    await flushPromises();
    await flushPromises();

    // Nothing of A's may commit: not the item the page is showing, not prev/next, not the
    // queue, and not the series walk that produces them.
    expect((w.findComponent(Player).props('media') as MediaItem).id).toBe(b1.id);
    expect((w.findComponent(Player).props('nextEpisode') as MediaItem | null)?.id).toBe(b2.id);
    expect((w.findComponent(Player).props('prevEpisode') as MediaItem | null)?.id).toBeUndefined();
    expect(player.queue.map((m) => m.id)).toEqual([b2.id]);
    expect(counts.aChildren).toBe(0);
  });

  it('CONTROL: the identical item gate DOES apply A (item, prev/next, queue) when that run is still current', async () => {
    // Non-inertness control for the test above: with no navigation, releasing the SAME
    // held by-id response must apply A end-to-end. So the negatives above are the guard
    // firing, not a mis-routed double.
    const p = 's172nc';
    const a1 = ep({ id: `${p}-a1`, parent_id: `${p}-serA`, season_number: 1, episode_number: 1, genres: ['Horror'] });
    const a2 = ep({ id: `${p}-a2`, parent_id: `${p}-serA`, season_number: 1, episode_number: 2, genres: ['Horror'] });
    const itemGate = deferred<Response>();
    const counts = { aChildren: 0 };
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isById(u, a1.id)) return itemGate.promise;
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (isById(u, `${p}-serA`)) return Promise.resolve(jsonResponse({ item: media({ id: `${p}-serA`, type: 'series' }) }));
      if (isChildrenOf(u, `${p}-serA`)) {
        counts.aChildren += 1;
        return Promise.resolve(jsonResponse({ items: [a1, a2], total: 2 }));
      }
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });

    const { w } = await mountAt(a1.id, fetchMock);
    await flushPromises();
    expect(w.find('[role="status"][aria-busy="true"]').exists()).toBe(true);

    itemGate.resolve(jsonResponse({ item: a1 }));
    await flushPromises();
    await flushPromises();
    await flushPromises();

    const player = usePlayerStore();
    expect(counts.aChildren).toBe(1);
    expect((w.findComponent(Player).props('media') as MediaItem).id).toBe(a1.id);
    expect((w.findComponent(Player).props('nextEpisode') as MediaItem | null)?.id).toBe(a2.id);
    expect(player.queue.map((m) => m.id)).toEqual([a2.id]);
  });

  it('does not write a queue that was superseded DURING its own genre fetch', async () => {
    // The other half of `loadQueue`'s exposure, and — measured — a check that NO test in
    // this file pinned before S172: here `loadQueue` is entered while its run is still
    // current and is superseded inside its OWN await, rather than being called by an
    // already-superseded run. Deleting its `stale()` return reds this test.
    //
    // ⚠ This test does NOT distinguish the run-scoped token from the controller identity it
    // replaced: for THIS interleaving the old `myController` was captured while the run was
    // current, so it was already correct. The reason for the change is the other
    // interleaving (above) plus the null-`AbortController` case, neither of which a
    // same-shape test can separate here.
    const p = 's172q';
    const a1 = media({ id: `${p}-a1`, type: 'movie', genres: ['Horror'] });
    const b1 = media({ id: `${p}-b1`, type: 'movie', genres: ['Comedy'] });
    const horrorRow = media({ id: `${p}-horror-row`, genres: ['Horror'] });
    const comedyRow = media({ id: `${p}-comedy-row`, genres: ['Comedy'] });
    const genreGate = deferred<Response>();
    const counts = { horror: 0, comedy: 0 };
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isGenreQueueFor(u, 'Horror')) {
        counts.horror += 1;
        return genreGate.promise; // run A parks inside loadQueue itself
      }
      if (isGenreQueueFor(u, 'Comedy')) {
        counts.comedy += 1;
        return Promise.resolve(jsonResponse({ items: [comedyRow], total: 1 }));
      }
      if (isById(u, a1.id)) return Promise.resolve(jsonResponse({ item: a1 }));
      if (isById(u, b1.id)) return Promise.resolve(jsonResponse({ item: b1 }));
      if (isAnyPlaybackInfo(u)) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });

    const { router } = await mountAt(a1.id, fetchMock);
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    // BRANCH: A is a movie, so its genre fallback IS the writer, and it is in flight.
    expect(counts.horror).toBe(1);
    expect(player.queue).toHaveLength(0); // the gate is genuinely holding

    await router.push(`/app/player/${b1.id}`);
    await flushPromises();
    await flushPromises();
    expect(counts.comedy).toBe(1);
    expect(player.queue.map((m) => m.id)).toEqual([comedyRow.id]);

    genreGate.resolve(jsonResponse({ items: [horrorRow], total: 1 }));
    await flushPromises();
    await flushPromises();
    expect(player.queue.map((m) => m.id)).toEqual([comedyRow.id]);
  });

  /**
   * The other three writes in `load()` that outlive their own run, each pinned so the guard
   * on it is falsifiable rather than decoration: the playback-info `.then` (markers,
   * chapters, audio/subtitle tracks) and the two error assignments the by-id await can
   * reach. Same technique — one gated response, released strictly after the newer item is
   * on screen — and each has a CONTROL proving the gate is live.
   *
   * These share the queue tests' reachability caveat (a signal-honouring `fetch` usually
   * rejects the superseded request instead), and the same answer: where `AbortController`
   * is undefined nothing is aborted at all, and a response already delivered cannot be
   * un-delivered by a later `abort()`.
   */
  function twoMovieFetch(p: string, gate: Promise<Response>, gateOn: 'playback-info' | 'by-id') {
    // No genres on either movie ⇒ `loadQueue` writes an empty queue without a request, so
    // playback-info / the by-id error are the only moving parts.
    const a1 = media({ id: `${p}-a1`, name: 'Item A', type: 'movie', genres: [] });
    const b1 = media({ id: `${p}-b1`, name: 'Item B', type: 'movie', genres: [] });
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isRoute(u, playbackInfoPath(a1.id))) return gateOn === 'playback-info' ? gate : Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      if (isById(u, a1.id)) return gateOn === 'by-id' ? gate : Promise.resolve(jsonResponse({ item: a1 }));
      if (isRoute(u, playbackInfoPath(b1.id))) {
        return Promise.resolve(jsonResponse({ intro_marker: { start_seconds: 100, end_seconds: 130 }, outro_marker: null, chapters: [] }));
      }
      if (isById(u, b1.id)) return Promise.resolve(jsonResponse({ item: b1 }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    return { a1, b1, fetchMock };
  }

  it('a superseded run’s playback-info does not paint its markers over the new item', async () => {
    const gate = deferred<Response>();
    const { a1, b1, fetchMock } = twoMovieFetch('s172p', gate.promise, 'playback-info');
    const { w, router } = await mountAt(a1.id, fetchMock);
    await flushPromises();
    await flushPromises();
    expect((w.findComponent(Player).props('media') as MediaItem).id).toBe(a1.id); // A is on screen
    expect(w.findComponent(Player).props('introMarker')).toBeNull(); // gate is holding

    await router.push(`/app/player/${b1.id}`);
    await flushPromises();
    await flushPromises();
    expect((w.findComponent(Player).props('media') as MediaItem).id).toBe(b1.id);
    expect(w.findComponent(Player).props('introMarker')).toEqual({ start: 100, end: 130 }); // B's own

    // A's playback-info arrives late. Its intro marker belongs to the title the user left.
    gate.resolve(jsonResponse({ intro_marker: { start_seconds: 5, end_seconds: 35 }, outro_marker: null, chapters: [{ start_seconds: 0, title: 'A cold open' }] }));
    await flushPromises();
    await flushPromises();
    expect(w.findComponent(Player).props('introMarker')).toEqual({ start: 100, end: 130 });
    expect(w.findComponent(Player).props('chapters')).toEqual([]);
  });

  it('CONTROL: the identical playback-info gate DOES paint markers when that run is still current', async () => {
    const gate = deferred<Response>();
    const { a1, fetchMock } = twoMovieFetch('s172pc', gate.promise, 'playback-info');
    const { w } = await mountAt(a1.id, fetchMock);
    await flushPromises();
    await flushPromises();
    expect(w.findComponent(Player).props('introMarker')).toBeNull();

    gate.resolve(jsonResponse({ intro_marker: { start_seconds: 5, end_seconds: 35 }, outro_marker: null, chapters: [{ start_seconds: 0, title: 'A cold open' }] }));
    await flushPromises();
    await flushPromises();
    expect(w.findComponent(Player).props('introMarker')).toEqual({ start: 5, end: 35 });
    expect(w.findComponent(Player).props('chapters')).toHaveLength(1);
  });

  it('a superseded run’s failed by-id does not replace the new item with an error state', async () => {
    const gate = deferred<Response>();
    const { a1, b1, fetchMock } = twoMovieFetch('s172e', gate.promise, 'by-id');
    const { w, router } = await mountAt(a1.id, fetchMock);
    await flushPromises();

    await router.push(`/app/player/${b1.id}`);
    await flushPromises();
    await flushPromises();
    expect((w.findComponent(Player).props('media') as MediaItem).id).toBe(b1.id);

    // A's request fails with a 500 — NOT an abort, so `isAbort` does not cover it, and A
    // was never cached, so there is no SWR fallback either: the unguarded path writes
    // `error.value`, and the template's `v-else-if="error"` outranks `v-else-if="item"`,
    // so B's <Player> is torn down and replaced by A's failure.
    gate.resolve(errorResponse(500, { error: 'A exploded' }));
    await flushPromises();
    await flushPromises();
    expect(w.text()).not.toContain('A exploded');
    expect(w.findComponent(Player).exists()).toBe(true);
    expect((w.findComponent(Player).props('media') as MediaItem).id).toBe(b1.id);
  });

  it('a superseded run’s empty by-id response does not replace the new item with an error state', async () => {
    // The `!mediaItem` degenerate branch (a resolved response carrying no `item`) reaches a
    // SECOND error assignment, on a different line from the catch above.
    const gate = deferred<Response>();
    const { a1, b1, fetchMock } = twoMovieFetch('s172z', gate.promise, 'by-id');
    const { w, router } = await mountAt(a1.id, fetchMock);
    await flushPromises();

    await router.push(`/app/player/${b1.id}`);
    await flushPromises();
    await flushPromises();
    expect((w.findComponent(Player).props('media') as MediaItem).id).toBe(b1.id);

    gate.resolve(jsonResponse({})); // 200 with no `item`
    await flushPromises();
    await flushPromises();
    expect(w.text()).not.toContain('Failed to load media item');
    expect((w.findComponent(Player).props('media') as MediaItem).id).toBe(b1.id);
  });

  it('CONTROL: the identical by-id gate DOES surface both error states when that run is still current', async () => {
    // Non-inertness for the two tests above: with no navigation the SAME held responses
    // must produce the very messages they assert the absence of.
    const failGate = deferred<Response>();
    const fail = twoMovieFetch('s172ec', failGate.promise, 'by-id');
    const { w: w1 } = await mountAt(fail.a1.id, fail.fetchMock);
    await flushPromises();
    failGate.resolve(errorResponse(500, { error: 'A exploded' }));
    await flushPromises();
    await flushPromises();
    expect(w1.text()).toContain('A exploded');
    expect(w1.findComponent(Player).exists()).toBe(false);

    const emptyGate = deferred<Response>();
    const empty = twoMovieFetch('s172zc', emptyGate.promise, 'by-id');
    const { w: w2 } = await mountAt(empty.a1.id, empty.fetchMock);
    await flushPromises();
    emptyGate.resolve(jsonResponse({}));
    await flushPromises();
    await flushPromises();
    expect(w2.text()).toContain('Failed to load media item');
    expect(w2.findComponent(Player).exists()).toBe(false);
  });
});
