import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import PlayerPage from './PlayerPage.vue';
import Player from '../components/Player.vue';
import { usePlayerStore } from '../stores/usePlayerStore';
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
 *  or `null` to make playback-info 404 (absent). */
function okFetch(item: MediaItem, playback: Partial<PlaybackInfo> | null = {}, items: MediaItem[] = []) {
  const fn = vi.fn();
  fn.mockResolvedValueOnce(jsonResponse({ item })); // GET /api/v1/media/:id
  if (playback === null) fn.mockResolvedValueOnce(errorResponse(404)); // playback-info absent
  else fn.mockResolvedValueOnce(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [], ...playback }));
  fn.mockResolvedValue(jsonResponse({ items, total: items.length })); // up-next queue (+ any tail)
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
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(errorResponse(500)) // initial by-id fails
      .mockResolvedValueOnce(jsonResponse({ item: media({ id: 'm1' }) })) // retry by-id
      .mockResolvedValueOnce(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] })) // retry playback-info
      .mockResolvedValue(jsonResponse({ items: [], total: 0 })); // retry queue
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
      { start: 0, title: 'Cold open' },
      { start: 90, title: undefined },
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
});

describe('PlayerPage — up-next queue', () => {
  it('builds a genre-scoped queue (excludes self, caps at 12) for the up-next card', async () => {
    const base = media({ id: 'm1', genres: ['Sci-Fi'] });
    const items: MediaItem[] = [base, ...Array.from({ length: 13 }, (_, i) => media({ id: `s${i}` }))];
    const fetchMock = okFetch(base, {}, items);
    await mountAt('m1', fetchMock);
    await flushPromises();
    const player = usePlayerStore();
    expect(player.queue.find((m) => m.id === 'm1')).toBeUndefined(); // self excluded
    expect(player.queue).toHaveLength(12); // capped
    expect(player.upNext?.id).toBe('s0');
    // the queue request is genre-scoped (genres[]= URL-encoded for PHP array parsing)
    expect(fetchMock.mock.calls[2][0]).toContain('genres%5B%5D=Sci-Fi');
  });

  it('skips the queue fetch when the title has no genres', async () => {
    const fetchMock = okFetch(media({ id: 'm1', genres: [] }));
    await mountAt('m1', fetchMock);
    await flushPromises();
    const player = usePlayerStore();
    expect(player.queue).toHaveLength(0);
    expect(fetchMock).toHaveBeenCalledTimes(2); // by-id + playback-info only (no list)
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
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ item: media({ id: 'm1', genres: ['Sci-Fi'] }) })) // by-id
      .mockResolvedValueOnce(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] })) // playback-info
      .mockRejectedValueOnce(new Error('queue down')); // up-next list rejects
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

describe('PlayerPage — teardown', () => {
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
