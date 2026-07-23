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
 *  Routing order: queue (/similar) → by-id (exact /media/:id) → playback-info. */
function okFetch(item: MediaItem, playback: Partial<PlaybackInfo> | null = {}, items: MediaItem[] = []) {
  const fn = vi.fn().mockImplementation((url: string) => {
    const urlStr = String(url);
    // Queue endpoint: /api/v1/media/{id}/similar?genres[]=...
    if (urlStr.includes('/similar')) {
      return Promise.resolve(jsonResponse({ items, total: items.length }));
    }
    // by-id endpoint: /api/v1/media/{id} (NOT /media/{id}/playback-info or /media/{id}/...)
    // Use a regex to match /media/{id} exactly (no trailing path segments beyond the id)
    if (urlStr.match(/\/api\/v1\/media\/[^/?]+(\?|$)/) && !urlStr.includes('playback-info') && !urlStr.includes('parentId')) {
      return Promise.resolve(jsonResponse({ item }));
    }
    // playback-info endpoint: /api/v1/media/{id}/playback-info
    if (urlStr.includes('/playback-info')) {
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
    // first call hit the by-id endpoint
    expect(fetchMock.mock.calls[0][0]).toContain('/api/v1/media/m1');
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
      if (u.includes('/playback-info')) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (u.match(/\/api\/v1\/media\/[^/?]+(\?|$)/) && !u.includes('parentId')) {
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
      if (u.includes('/playback-info')) return new Promise<Response>(() => {}); // NEVER resolves
      if (u.match(/\/api\/v1\/media\/[^/?]+(\?|$)/) && !u.includes('parentId')) {
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
    expect(fetchMock.mock.calls.some(([u]) => String(u).includes('/playback-info'))).toBe(true);
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
  // authoritative episode order. This models the race: the episode HAS a real genre (so
  // the old code WOULD fire a genre fetch) and that fetch is DELAYED well past the
  // (immediate) series-tree fetches, so under the old code it would win. The
  // episode-neighbour path must win and the slow genre response must never overwrite it.
  const isGenreQueue = (u: string) => u.includes('/api/v1/media?') && u.includes('sort=rating');

  it('deterministically seeds remaining series episodes even when the genre queue fetch is SLOW (race regression)', async () => {
    function ep(over: Partial<MediaItem> & { id: string }): MediaItem {
      // Real genre so loadQueue would issue a genre-similar fetch under the old racy code.
      return media({ name: over.id, type: 'episode', genres: ['Sci-Fi'], ...over });
    }
    const e1 = ep({ id: 'q-e1', parent_id: 'q-ser', season_number: 1, episode_number: 1 });
    const e2 = ep({ id: 'q-e2', parent_id: 'q-ser', season_number: 1, episode_number: 2 });
    const e3 = ep({ id: 'q-e3', parent_id: 'q-ser', season_number: 1, episode_number: 3 });
    // Genre-similar rows the SLOW loadQueue fetch would return — these must NOT win.
    const g1 = media({ id: 'q-g1', type: 'movie', genres: ['Sci-Fi'] });
    const g2 = media({ id: 'q-g2', type: 'movie', genres: ['Sci-Fi'] });
    const isById = (u: string, id: string) =>
      u.includes(`/api/v1/media/${id}`) && !u.includes('parentId') && !u.includes('playback-info');
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      // Genre queue (the only request with sort=rating): resolve LATE so, under the old
      // racy code, it would land AFTER loadEpisodeNeighbours already seeded the queue.
      if (isGenreQueue(u)) {
        return new Promise<Response>((resolve) =>
          setTimeout(() => resolve(jsonResponse({ items: [g1, g2], total: 2 })), 40),
        );
      }
      // Series-tree + by-id + playback-info all resolve IMMEDIATELY.
      if (isById(u, 'q-e1')) return Promise.resolve(jsonResponse({ item: e1 }));
      if (u.includes('playback-info')) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (u.includes('/api/v1/media/q-ser') && !u.includes('parentId')) {
        return Promise.resolve(jsonResponse({ item: media({ id: 'q-ser', type: 'series' }) }));
      }
      if (u.includes('parentId=q-ser')) return Promise.resolve(jsonResponse({ items: [e1, e2, e3], total: 3 }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    await mountAt('q-e1', fetchMock);
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    // The awaited episode-neighbour path seeded the authoritative queue [e2, e3].
    expect(player.queue.map((m) => m.id)).toEqual(['q-e2', 'q-e3']);
    // Wait PAST the slow genre response — under the old racy code it would have
    // clobbered the queue to [q-g1, q-g2] here. It must not.
    await new Promise((r) => setTimeout(r, 80));
    await flushPromises();
    expect(player.queue.map((m) => m.id)).toEqual(['q-e2', 'q-e3']);
    // The deterministic fix short-circuits the genre queue for an episode WITH a next
    // neighbour: the slow genre fetch is never even issued.
    expect(fetchMock.mock.calls.some(([u]) => isGenreQueue(String(u)))).toBe(false);
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
    const isById = (u: string, id: string) =>
      u.includes(`/api/v1/media/${id}`) && !u.includes('parentId') && !u.includes('playback-info');
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isById(u, 'bz-e1')) return Promise.resolve(jsonResponse({ item: byId['bz-e1'] }));
      if (isById(u, 'bz-e2')) return Promise.resolve(jsonResponse({ item: byId['bz-e2'] }));
      if (isById(u, 'bz-e3')) return Promise.resolve(jsonResponse({ item: byId['bz-e3'] }));
      if (u.includes('playback-info')) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (u.includes('/api/v1/media/bz-ser') && !u.includes('parentId')) {
        return Promise.resolve(jsonResponse({ item: media({ id: 'bz-ser', type: 'series' }) }));
      }
      if (u.includes('parentId=bz-ser')) return Promise.resolve(jsonResponse({ items: [e1, e2, e3], total: 3 }));
      if (isGenreQueue(u)) return Promise.resolve(jsonResponse({ items: [media({ id: 'bz-g9' })], total: 1 }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    const { router } = await mountAt('bz-e1', fetchMock);
    await flushPromises();
    await flushPromises();
    const player = usePlayerStore();
    expect(player.queue.map((m) => m.id)).toEqual(['bz-e2', 'bz-e3']);
    const childrenCalls = () =>
      fetchMock.mock.calls.filter((c) => String(c[0]).includes('parentId=bz-ser')).length;
    expect(childrenCalls()).toBe(1);

    // Binge to the next sibling — CACHE HIT: queue reseeds to [e3] from the cached order,
    // with no series-tree re-walk and no genre fallback.
    await router.push('/app/player/bz-e2');
    await flushPromises();
    await flushPromises();
    expect(player.queue.map((m) => m.id)).toEqual(['bz-e3']);
    expect(childrenCalls()).toBe(1); // series tree NOT re-fetched (cache hit)
    expect(fetchMock.mock.calls.some(([u]) => isGenreQueue(String(u)))).toBe(false); // genre queue never used
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
    const isById = (u: string, id: string) =>
      u.includes(`/api/v1/media/${id}`) && !u.includes('parentId') && !u.includes('playback-info');
    const fetchMock = vi.fn((url: string) => {
      const u = String(url);
      if (isGenreQueue(u)) return Promise.resolve(jsonResponse({ items: [g1, g2], total: 2 }));
      if (isById(u, 'fe-e2')) return Promise.resolve(jsonResponse({ item: e2 }));
      if (u.includes('playback-info')) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (u.includes('/api/v1/media/fe-ser') && !u.includes('parentId')) {
        return Promise.resolve(jsonResponse({ item: media({ id: 'fe-ser', type: 'series' }) }));
      }
      if (u.includes('parentId=fe-ser')) return Promise.resolve(jsonResponse({ items: [e1, e2], total: 2 }));
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
      { match: (u) => u.includes('/api/v1/media/e2') && !u.includes('parentId') && !u.includes('playback-info'), body: { item: e2 } },
      { match: (u) => u.includes('playback-info'), body: { intro_marker: null, outro_marker: null, chapters: [] } },
      { match: (u) => u.includes('/api/v1/media/ser1') && !u.includes('parentId'), body: { item: media({ id: 'ser1', type: 'series' }) } },
      { match: (u) => u.includes('parentId=ser1'), body: { items: [e1, e2, e3], total: 3 } },
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
      { match: (u) => u.includes('/api/v1/media/sp-e2') && !u.includes('parentId') && !u.includes('playback-info'), body: { item: e2 } },
      { match: (u) => u.includes('playback-info'), body: { intro_marker: null, outro_marker: null, chapters: [] } },
      { match: (u) => u.includes('/api/v1/media/sp-ser') && !u.includes('parentId'), body: { item: media({ id: 'sp-ser', type: 'series' }) } },
      { match: (u) => u.includes('parentId=sp-ser'), body: { items: [e1, e2, sp], total: 3 } },
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
    const isById = (u: string, id: string) =>
      u.includes(`/api/v1/media/${id}`) && !u.includes('parentId') && !u.includes('playback-info');
    const fetchMock = routedFetch([
      { match: (u) => isById(u, 'cache-e1'), body: { item: byId['cache-e1'] } },
      { match: (u) => isById(u, 'cache-e2'), body: { item: byId['cache-e2'] } },
      { match: (u) => isById(u, 'cache-e3'), body: { item: byId['cache-e3'] } },
      { match: (u) => u.includes('playback-info'), body: { intro_marker: null, outro_marker: null, chapters: [] } },
      { match: (u) => u.includes('/api/v1/media/cache-ser') && !u.includes('parentId'), body: { item: media({ id: 'cache-ser', type: 'series' }) } },
      { match: (u) => u.includes('parentId=cache-ser'), body: { items: [e1, e2, e3], total: 3 } },
    ]);

    const { w, router } = await mountAt('cache-e2', fetchMock);
    await flushPromises();
    await flushPromises();
    // First load fetched the series tree exactly once: parent-hop + root children.
    const rootHopCalls = () => fetchMock.mock.calls.filter((c) => String(c[0]).includes('/api/v1/media/cache-ser') && !String(c[0]).includes('parentId')).length;
    const childrenCalls = () => fetchMock.mock.calls.filter((c) => String(c[0]).includes('parentId=cache-ser')).length;
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
      if (u.includes('playback-info')) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (u.match(/\/api\/v1\/media\/m1(\?|$)/)) return Promise.resolve(jsonResponse({ item: media({ id: 'm1' }) }));
      if (u.match(/\/api\/v1\/media\/m2(\?|$)/)) return Promise.resolve(jsonResponse({ item: media({ id: 'm2' }) }));
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
      if (u.includes('/similar')) return Promise.reject(new Error('queue down')); // up-next list rejects
      if (u.includes('/playback-info')) {
        return Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }));
      }
      if (u.match(/\/api\/v1\/media\/[^/?]+(\?|$)/) && !u.includes('parentId')) {
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
