/**
 * Source file.
 *
 * UI-2.1 (finding U-N2) — stale-while-revalidate media-item cache.
 *
 * Covers the shared `useMediaItemCache` singleton directly, then the page-level
 * behaviour on BOTH MediaDetailPage and PlayerPage now that they share one cache:
 *   - a second visit within the TTL renders from cache with NO by-id refetch;
 *   - a stale (TTL-expired) entry triggers a background refresh;
 *   - a fetch failure serves the stale cache instead of erroring;
 *   - the cache is shared across pages (detail populates it → player reuses it).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import MediaDetailPage from './MediaDetailPage.vue';
import PlayerPage from './PlayerPage.vue';
import MediaDetail from '../components/MediaDetail.vue';
import Player from '../components/Player.vue';
import type { MediaItem } from '../types/media-item';
import {
  MEDIA_CACHE_TTL_MS,
  getMediaItemCacheEntry,
  isMediaItemCacheFresh,
  cacheMediaItem,
  clearMediaItemCache,
} from '../composables/useMediaItemCache';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    // A genre-less movie: MediaDetailPage skips the "similar" fetch and PlayerPage
    // skips both the genre queue and the episode-neighbour fetches, so a fresh cache
    // hit fires ZERO additional network calls (playback-info aside on the player).
    type: 'movie',
    poster_url: null,
    genres: [],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: 'x',
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
function byId(item: MediaItem): Response {
  return jsonResponse({ item });
}

/** True when a call URL is the exact by-id item endpoint `/api/v1/media/:id` (no suffix). */
function isByIdCall(url: unknown): boolean {
  const s = String(url);
  return /\/api\/v1\/media\/[^/?]+(\?|$)/.test(s) && !s.includes('playback-info');
}
function byIdCallCount(fetchMock: ReturnType<typeof vi.fn>): number {
  return fetchMock.mock.calls.filter((c) => isByIdCall(c[0])).length;
}

const stub = { template: '<div />' };

// --- MediaDetailPage harness -------------------------------------------------
function makeDetailRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/media/:id', name: 'media', component: MediaDetailPage },
      { path: '/app/media/:id/season/:season', name: 'season', component: stub },
      { path: '/app/library/:id', name: 'library', component: stub },
      { path: '/app/player/:id', name: 'player', component: stub },
    ],
  });
}
async function mountDetail(id: string, fetchMock: ReturnType<typeof vi.fn>) {
  vi.stubGlobal('fetch', fetchMock);
  const router = makeDetailRouter();
  await router.push(`/app/media/${id}`);
  await router.isReady();
  const w = mount(MediaDetailPage, { global: { plugins: [router] } });
  wrappers.push(w);
  return { w, router };
}

// --- PlayerPage harness ------------------------------------------------------
/** by-id → playback-info → queue routing, so retries/queue don't consume a fixed queue. */
function okPlayerFetch(item: MediaItem, playbackOk = true) {
  return vi.fn().mockImplementation((url: string) => {
    const s = String(url);
    if (s.includes('/playback-info')) {
      return playbackOk
        ? Promise.resolve(jsonResponse({ intro_marker: null, outro_marker: null, chapters: [] }))
        : Promise.resolve(errorResponse(404));
    }
    if (isByIdCall(s)) return Promise.resolve(byId(item));
    return Promise.resolve(jsonResponse({ items: [], total: 0 }));
  });
}
function makePlayerRouter(): Router {
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
async function mountPlayer(id: string, fetchMock: ReturnType<typeof vi.fn>) {
  vi.stubGlobal('fetch', fetchMock);
  const router = makePlayerRouter();
  await router.push(`/app/player/${id}`);
  await router.isReady();
  const Harness = { template: '<router-view />' };
  const w = mount(Harness, { global: { plugins: [router] } });
  wrappers.push(w);
  return { w, router };
}

const wrappers: VueWrapper[] = [];

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  clearMediaItemCache();
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('useMediaItemCache (shared SWR singleton)', () => {
  it('stores + returns entries and reports freshness against the TTL', () => {
    expect(getMediaItemCacheEntry('m1')).toBeUndefined();
    const now = 1_000_000;
    cacheMediaItem('m1', media({ id: 'm1', name: 'Dune' }), now);
    const entry = getMediaItemCacheEntry('m1');
    expect(entry?.item.name).toBe('Dune');
    expect(entry?.ts).toBe(now);
    // Fresh within the TTL, stale once it elapses.
    expect(isMediaItemCacheFresh(entry, now + MEDIA_CACHE_TTL_MS - 1)).toBe(true);
    expect(isMediaItemCacheFresh(entry, now + MEDIA_CACHE_TTL_MS)).toBe(false);
    expect(isMediaItemCacheFresh(entry, now + MEDIA_CACHE_TTL_MS + 5_000)).toBe(false);
    expect(isMediaItemCacheFresh(undefined)).toBe(false);
  });

  it('clearMediaItemCache empties the singleton', () => {
    cacheMediaItem('m1', media({ id: 'm1' }));
    expect(getMediaItemCacheEntry('m1')).toBeDefined();
    clearMediaItemCache();
    expect(getMediaItemCacheEntry('m1')).toBeUndefined();
  });

  it('is one singleton shared across importers (detail visit populates it for the player)', async () => {
    const fetch1 = vi.fn().mockResolvedValue(byId(media({ id: 'shared1', name: 'Shared' })));
    await mountDetail('shared1', fetch1);
    await flushPromises();
    // The detail visit cached the item — the player can read it with no import of its own.
    expect(getMediaItemCacheEntry('shared1')?.item.name).toBe('Shared');
  });
});

describe('MediaDetailPage — SWR item cache (UI-2.1)', () => {
  it('second visit within TTL renders from cache with NO by-id refetch', async () => {
    const fetch1 = vi.fn().mockResolvedValue(byId(media({ id: 'm1', name: 'Dune' })));
    const first = await mountDetail('m1', fetch1);
    await flushPromises();
    expect(byIdCallCount(fetch1)).toBe(1); // cold: one by-id fetch
    first.w.unmount();
    wrappers.pop();

    // Re-visit the same id with a fresh spy — a fresh cache hit means zero fetches.
    const fetch2 = vi.fn().mockResolvedValue(byId(media({ id: 'm1', name: 'STALE-SERVER' })));
    const second = await mountDetail('m1', fetch2);
    await flushPromises();
    expect(fetch2).not.toHaveBeenCalled();
    const detail = second.w.findComponent(MediaDetail);
    expect(detail.exists()).toBe(true);
    expect((detail.props('item') as MediaItem).name).toBe('Dune'); // rendered from cache
  });

  it('a stale (TTL-expired) entry triggers a background refresh', async () => {
    // Pre-seed a stale entry (older than the TTL).
    cacheMediaItem('m1', media({ id: 'm1', name: 'OLD' }), Date.now() - MEDIA_CACHE_TTL_MS - 5_000);
    const fetchMock = vi.fn().mockResolvedValue(byId(media({ id: 'm1', name: 'FRESH' })));
    const { w } = await mountDetail('m1', fetchMock);
    await flushPromises();
    expect(byIdCallCount(fetchMock)).toBe(1); // stale ⇒ refreshed
    expect((w.findComponent(MediaDetail).props('item') as MediaItem).name).toBe('FRESH');
    // …and the refresh re-stamped the cache fresh for next time.
    expect(isMediaItemCacheFresh(getMediaItemCacheEntry('m1'))).toBe(true);
  });

  it('serves the stale cache when the refresh fetch fails', async () => {
    cacheMediaItem('m1', media({ id: 'm1', name: 'STALE-BUT-USABLE' }), Date.now() - MEDIA_CACHE_TTL_MS - 5_000);
    const fetchMock = vi.fn().mockResolvedValue(errorResponse(500));
    const { w } = await mountDetail('m1', fetchMock);
    await flushPromises();
    expect(byIdCallCount(fetchMock)).toBe(1); // it did try to refresh
    const detail = w.findComponent(MediaDetail);
    expect(detail.exists()).toBe(true); // no error state — stale cache shown
    expect((detail.props('item') as MediaItem).name).toBe('STALE-BUT-USABLE');
    expect(w.text()).not.toContain("Couldn't load this title");
  });
});

describe('PlayerPage — SWR item cache (UI-2.1)', () => {
  it('second visit within TTL mounts <Player> from cache with NO by-id refetch', async () => {
    const fetch1 = okPlayerFetch(media({ id: 'm1', name: 'Dune' }));
    const first = await mountPlayer('m1', fetch1);
    await flushPromises();
    expect(byIdCallCount(fetch1)).toBe(1);
    first.w.unmount();
    wrappers.pop();

    const fetch2 = okPlayerFetch(media({ id: 'm1', name: 'STALE-SERVER' }));
    const second = await mountPlayer('m1', fetch2);
    await flushPromises();
    expect(byIdCallCount(fetch2)).toBe(0); // by-id skipped on the cache hit
    const player = second.w.findComponent(Player);
    expect(player.exists()).toBe(true);
    expect((player.props('media') as MediaItem).name).toBe('Dune');
    expect(player.props('streamUrl')).toBe('/media/m1/stream');
  });

  it('a stale entry triggers a by-id refresh', async () => {
    cacheMediaItem('m1', media({ id: 'm1', name: 'OLD' }), Date.now() - MEDIA_CACHE_TTL_MS - 5_000);
    const fetchMock = okPlayerFetch(media({ id: 'm1', name: 'FRESH' }));
    const { w } = await mountPlayer('m1', fetchMock);
    await flushPromises();
    expect(byIdCallCount(fetchMock)).toBe(1);
    expect((w.findComponent(Player).props('media') as MediaItem).name).toBe('FRESH');
  });

  it('serves the stale cache when the by-id refresh fails', async () => {
    cacheMediaItem('m1', media({ id: 'm1', name: 'STALE-BUT-USABLE' }), Date.now() - MEDIA_CACHE_TTL_MS - 5_000);
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      const s = String(url);
      if (s.includes('/playback-info')) return Promise.resolve(errorResponse(404));
      if (isByIdCall(s)) return Promise.resolve(errorResponse(500)); // refresh fails
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    const { w } = await mountPlayer('m1', fetchMock);
    await flushPromises();
    const player = w.findComponent(Player);
    expect(player.exists()).toBe(true); // no error state — stale cache played
    expect((player.props('media') as MediaItem).name).toBe('STALE-BUT-USABLE');
    expect(player.props('streamUrl')).toBe('/media/m1/stream');
  });

  it('a hard access block is NOT masked by a stale cache', async () => {
    cacheMediaItem('m1', media({ id: 'm1', name: 'STALE' }), Date.now() - MEDIA_CACHE_TTL_MS - 5_000);
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      const s = String(url);
      if (s.includes('/playback-info')) return Promise.resolve(errorResponse(404));
      if (isByIdCall(s)) return Promise.resolve(errorResponse(429, { error: 'StreamLimitExceeded' }));
      return Promise.resolve(jsonResponse({ items: [], total: 0 }));
    });
    const { w } = await mountPlayer('m1', fetchMock);
    await flushPromises();
    // The block wins — no player is mounted from the stale cache.
    expect(w.findComponent(Player).exists()).toBe(false);
    // The blocking notice renders in a teleported Modal (mounted to document.body).
    expect(document.body.textContent).toContain('Stream limit reached');
  });
});

describe('shared cache — cross-page reuse (browse→detail→player)', () => {
  it('a detail visit primes the cache so the player mounts with NO by-id fetch', async () => {
    const fetchDetail = vi.fn().mockResolvedValue(byId(media({ id: 'x9', name: 'Crossed' })));
    const d = await mountDetail('x9', fetchDetail);
    await flushPromises();
    expect(byIdCallCount(fetchDetail)).toBe(1);
    d.w.unmount();
    wrappers.pop();

    // Now open the SAME title in the player — it should reuse the detail-page cache.
    const fetchPlayer = okPlayerFetch(media({ id: 'x9', name: 'STALE-SERVER' }));
    const p = await mountPlayer('x9', fetchPlayer);
    await flushPromises();
    expect(byIdCallCount(fetchPlayer)).toBe(0);
    expect((p.w.findComponent(Player).props('media') as MediaItem).name).toBe('Crossed');
  });
});
