/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';

// Mock useAuthStore before importing BrowsePage (which uses it).
// This is needed because useResumeSync calls auth.client.get() for continue-watching,
// and vi.stubGlobal('fetch') doesn't work with ApiClient's bound fetch reference.
const { authGet, authState, authUser } = vi.hoisted(() => ({
  authGet: vi.fn(),
  authState: { loggedIn: true },
  // Use a plain object so tests can directly assign auth.user = { id: 'admin', is_admin: true }
  authUser: { id: '', is_admin: false } as { id: string; is_admin?: boolean },
}));
vi.mock('../stores/useAuthStore', () => ({
  useAuthStore: () => ({
    get isLoggedIn() {
      return authState.loggedIn;
    },
    get isAdmin() {
      return authUser.is_admin === true;
    },
    client: { get: authGet },
    get user() {
      return authUser;
    },
    set user(val) {
      // Keep authUser in sync when tests do auth.user = {...}
      Object.assign(authUser, val);
    },
  }),
}));

// NOTE (U-N4 regression guard): `useResumeSync` is intentionally NOT mocked here.
// The Continue Watching rail is driven by the REAL composable so this suite
// genuinely exercises the reactivity contract — a `syncResume()` that REASSIGNS
// the shared reactive ref must propagate to BrowsePage's `continueItems`. The
// composable fetches continue-watching via `auth.client.get(...)` (= `authGet`
// above), so `stubFetch`/`beforeEach` configure that call. (This test FAILS
// against the pre-fix code, where the composable reassigned a plain `let` and
// BrowsePage destructured a getter-returned array — capturing a stale empty
// reference that never updated, so the rail never showed cross-device items.)

import BrowsePage from './BrowsePage.vue';
import MediaRow from '../components/MediaRow.vue';
import HomeRow from '../components/HomeRow.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import MediaCard from '../components/MediaCard.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { MediaItem } from '../types/media-item';
import type { LibrarySummary } from '../api/libraries';
import type { PhlixAppConfig } from '../app/types';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    type: 'movie',
    poster_url: null,
    genres: [],
    year: 2024,
    rating: null,
    runtime: 120,
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

const ONE_LIBRARY: LibrarySummary[] = [{ id: 'lib1', name: 'Movies', type: 'movie' }];

/**
 * Stub fetch, branching by URL: `/api/v1/libraries` → `{ libraries }`,
 * `/api/v1/users/me/favorites` → `{ items, limit, offset }` (the favorites rail;
 * `favorites` defaults to none so the rail is hidden unless a test supplies
 * items — and it can supply a `() => MediaItem[]` so a re-fetch sees fresh data),
 * `/api/v1/users/me/continue-watching` → `{ items }` (the Continue Watching rail;
 * `continueWatching` defaults to none so the rail is hidden unless a test supplies
 * items — items can include `position_ticks` for resume position),
 * any other `/api/v1/media` rail fetch → `{ items, total }`. `libraryError`
 * rejects the library-list request specifically.
 */
function stubFetch(
  opts: {
    libraries?: LibrarySummary[];
    media?: { items: MediaItem[]; total: number };
    favorites?: MediaItem[] | (() => MediaItem[]);
    /** Continue Watching items with optional position_ticks for resume position.
     *  Defaults to empty, hiding the Continue Watching rail unless supplied.
     *  Items carry an extra `position_ticks` field (the resume payload shape,
     *  see useResumeSync) on top of the list-row MediaItem fields. */
    continueWatching?: Array<MediaItem & { position_ticks?: number }>;
    libraryError?: boolean;
    /** Reject the library-list request with a hub-style 503 `{error, code}` body
     *  (drives the relay-code → actionable-message mapping in BrowsePage). */
    library503?: { error: string; code: string };
  } = {},
) {
  const libraries = opts.libraries ?? ONE_LIBRARY;
  const mediaBody = opts.media ?? { items: [], total: 0 };
  const favoritesOf = (): MediaItem[] =>
    typeof opts.favorites === 'function' ? opts.favorites() : (opts.favorites ?? []);
  const continueWatchingItems = opts.continueWatching ?? [];
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/users/me/favorites')) {
      const items = favoritesOf();
      return Promise.resolve(jsonResponse({ items, limit: 24, offset: 0 }));
    }
    if (u.includes('/api/v1/users/me/continue-watching')) {
      // Return items with position_ticks for resume position
      const items = continueWatchingItems.map((item) => ({
        ...item,
        position_ticks: (item as MediaItem & { position_ticks?: number }).position_ticks ?? 0,
      }));
      return Promise.resolve(jsonResponse({ items }));
    }
    if (u.includes('/api/v1/libraries')) {
      if (opts.libraryError) return Promise.reject(new Error('library list offline'));
      if (opts.library503) return Promise.resolve(errorResponse(503, opts.library503));
      return Promise.resolve(jsonResponse({ libraries }));
    }
    return Promise.resolve(jsonResponse(mediaBody));
  });
  vi.stubGlobal('fetch', fn);

  // Drive the REAL useResumeSync via the mocked auth client (U-N4). The
  // composable fetches continue-watching through `auth.client.get` (= authGet),
  // NOT the global fetch, so route that call to the configured items (carrying
  // their position_ticks) and everything else to an empty payload.
  authGet.mockImplementation((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/users/me/continue-watching')) {
      return Promise.resolve({
        items: continueWatchingItems.map((item) => ({
          ...item,
          position_ticks:
            (item as MediaItem & { position_ticks?: number }).position_ticks ?? 0,
        })),
      });
    }
    return Promise.resolve({});
  });

  return fn;
}

/** A non-2xx JSON response (so ApiClient throws an ApiError carrying `body`). */
function errorResponse(status: number, body: unknown): Response {
  return {
    ok: false,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

/**
 * Like {@link stubFetch} but a `parentId=` request (the series-children fetch
 * that `resolvePlayable` issues for a series Play) returns `episodes`; the
 * library list + plain rail media still resolve normally. Used by the Feature 9
 * series-resolve tests.
 */
function stubSeriesFetch(episodes: MediaItem[]) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/users/me/favorites')) {
      return Promise.resolve(jsonResponse({ items: [], limit: 24, offset: 0 }));
    }
    if (u.includes('/api/v1/libraries')) {
      return Promise.resolve(jsonResponse({ libraries: ONE_LIBRARY }));
    }
    if (u.includes('parentId=')) {
      return Promise.resolve(jsonResponse({ items: episodes, total: episodes.length }));
    }
    return Promise.resolve(jsonResponse({ items: [], total: 0 }));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

/**
 * A series-children fetch whose `parentId=` response is held open until
 * `resolveWith(episodes)` is called — lets a test start a slow series resolve,
 * supersede it with a second Play, then complete the stale one and assert it
 * never navigated.
 */
function deferredSeriesFetch() {
  let release!: (eps: MediaItem[]) => void;
  const gate = new Promise<MediaItem[]>((res) => {
    release = res;
  });
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/users/me/favorites')) {
      return Promise.resolve(jsonResponse({ items: [], limit: 24, offset: 0 }));
    }
    if (u.includes('/api/v1/libraries')) {
      return Promise.resolve(jsonResponse({ libraries: ONE_LIBRARY }));
    }
    if (u.includes('parentId=')) {
      return gate.then((eps) => jsonResponse({ items: eps, total: eps.length }));
    }
    return Promise.resolve(jsonResponse({ items: [], total: 0 }));
  });
  vi.stubGlobal('fetch', fn);
  return { fn, resolveWith: (eps: MediaItem[]) => release(eps) };
}

function makeRouter(withMedia = false): Router {
  const stub = { template: '<div />' };
  const routes = [
    { path: '/app', name: 'browse', component: stub },
    { path: '/app/player/:id', name: 'player', component: stub },
    { path: '/app/library/:id', name: 'library', component: stub },
  ];
  if (withMedia) routes.push({ path: '/app/media/:id', name: 'media', component: stub });
  return createRouter({ history: createMemoryHistory(), routes });
}

function mountPage(opts: { config?: Partial<PhlixAppConfig>; router?: Router } = {}) {
  const router = opts.router ?? makeRouter();
  const config: PhlixAppConfig = { app: 'server', apiBase: '', ...opts.config };
  return mount(BrowsePage, {
    global: {
      plugins: [router],
      provide: { apiBase: config.apiBase, phlixConfig: config },
    },
  });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  // HomeRow loads eagerly without an IntersectionObserver (SSR/jsdom path).
  vi.stubGlobal('IntersectionObserver', undefined);
  // Real useResumeSync reads auth.client.get; default to an empty payload so a
  // mount without configured continue-watching clears the shared module ref
  // (self-heals any items retained from a prior test). stubFetch overrides this.
  authState.loggedIn = true;
  authGet.mockReset();
  authGet.mockResolvedValue({});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function continueRow(w: ReturnType<typeof mountPage>) {
  return w.findAllComponents(MediaRow).find((c) => c.props('title') === 'Continue Watching');
}

function favoritesRow(w: ReturnType<typeof mountPage>) {
  // S07: the favorites rail is now displayed under the title "My List" (label-only
  // rename; the underlying favorites store/API/client are unchanged).
  return w.findAllComponents(MediaRow).find((c) => c.props('title') === 'My List');
}

describe('BrowsePage — per-library sections', () => {
  it('renders one HomeRow per library, titled by library name', async () => {
    stubFetch({
      libraries: [
        { id: 'lib1', name: 'Movies', type: 'movie', display_order: 0 },
        { id: 'lib2', name: 'TV', type: 'series', display_order: 1 },
        { id: 'lib3', name: 'Anime', type: 'series', display_order: 2 },
      ],
    });
    const w = mountPage();
    await flushPromises();
    const rows = w.findAllComponents(HomeRow);
    expect(rows).toHaveLength(3);
    expect(rows.map((r) => r.props('row').title)).toEqual(['Movies', 'TV', 'Anime']);
    // each rail is scoped to its library and asks for top-level items only
    // (so a series library's rail shows shows, not a flat dump of episodes)
    expect(rows[0].props('row').query).toEqual({ libraryId: 'lib1', topLevel: true });
  });

  it('also renders configured home rows alongside the library rails', async () => {
    stubFetch({ libraries: ONE_LIBRARY });
    const w = mountPage({
      config: { homeRows: [{ id: 'r1', title: 'Recently Added' }] },
    });
    await flushPromises();
    const titles = w.findAllComponents(HomeRow).map((r) => r.props('row').title);
    // configured row(s) first, then one per library
    expect(titles).toEqual(['Recently Added', 'Movies']);
  });

  it('keeps the #toolbar-extra slot', () => {
    stubFetch();
    const w = mount(BrowsePage, {
      global: { plugins: [makeRouter()], provide: { apiBase: '', phlixConfig: { app: 'server', apiBase: '' } } },
      slots: { 'toolbar-extra': '<button class="extra">x</button>' },
    });
    expect(w.find('.browse-toolbar .extra').exists()).toBe(true);
    w.unmount();
  });
});

describe('BrowsePage — empty + error', () => {
  it('shows an empty state when there are no libraries', async () => {
    stubFetch({ libraries: [] });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('No libraries yet');
    expect(w.findAllComponents(HomeRow)).toHaveLength(0);
  });

  it('shows the canonical error EmptyState + working retry when the library list fails', async () => {
    const fn = stubFetch({ libraryError: true });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain('library list offline');
    // Retry re-requests the library list.
    const callsBefore = fn.mock.calls.length;
    await empty.find('button').trigger('click');
    await flushPromises();
    expect(fn.mock.calls.length).toBeGreaterThan(callsBefore);
  });

  it('maps a hub relay 503 to the actionable "relay not connected" EmptyState', async () => {
    stubFetch({
      library503: { error: 'Relay tunnel unavailable', code: 'server.relay_unavailable' },
    });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('Server relay not connected');
    expect(empty.text()).toContain("secure relay tunnel isn't connected");
  });

  it('maps a hub server.offline 503 to the "Server offline" EmptyState', async () => {
    stubFetch({ library503: { error: 'Server is offline.', code: 'server.offline' } });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.props('title')).toBe('Server offline');
  });
});

describe('BrowsePage — Continue Watching', () => {
  it('renders Continue Watching items from the sync payload regardless of loaded rails', async () => {
    // U-N4: Continue Watching items come from the server sync payload (via
    // continueWatchingItems), not from resolving against loaded rails. A title
    // paused on another device shows even if not in any rail.
    stubFetch({
      libraries: ONE_LIBRARY,
      // Media items are NOT required for Continue Watching in the new behavior
      media: { items: [media({ id: 'other', name: 'Other Title' })], total: 1 },
      // continueWatching items come from GET /api/v1/users/me/continue-watching
      continueWatching: [{ ...media({ id: 'a', name: 'Resumed', type: 'movie' }), position_ticks: 600_000_000 }],
    });
    const w = mountPage();
    await flushPromises();
    const row = continueRow(w);
    expect(row).toBeTruthy();
    expect(row!.props('items')).toHaveLength(1);
    expect((row!.props('items') as MediaItem[])[0].id).toBe('a');
  });

  it('hides Continue Watching when the resume map is empty', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'a' })], total: 1 } });
    const w = mountPage();
    await flushPromises();
    expect(continueRow(w)).toBeUndefined();
  });

  it('does not list a resumed id absent from the loaded rail items', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ ghost: 600 }));
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'a' })], total: 1 } });
    const w = mountPage();
    await flushPromises();
    expect(continueRow(w)).toBeUndefined();
  });
});

describe('BrowsePage — Favorites row (Feature 17.5)', () => {
  it('renders a "Favorites" rail with the favorited items from listFavorites()', async () => {
    stubFetch({
      libraries: ONE_LIBRARY,
      favorites: [media({ id: 'f1', name: 'Favorited Movie' }), media({ id: 'f2', name: 'Another Fave' })],
    });
    const w = mountPage();
    await flushPromises();
    const row = favoritesRow(w);
    expect(row).toBeTruthy();
    const items = row!.props('items') as MediaItem[];
    expect(items.map((i) => i.id)).toEqual(['f1', 'f2']);
  });

  it('placed immediately after Continue Watching', async () => {
    // U-N4: Continue Watching comes from the sync payload, Favorites follows it
    stubFetch({
      libraries: ONE_LIBRARY,
      // Item 'a' is in continueWatching (not in media items), showing that
      // Continue Watching works even when the title is not in any loaded rail
      continueWatching: [{ ...media({ id: 'a', name: 'Resumed', type: 'movie' }), position_ticks: 600_000_000 }],
      favorites: [media({ id: 'f1', name: 'Favorited Movie' })],
    });
    const w = mountPage();
    await flushPromises();
    const titles = w.findAllComponents(MediaRow).map((r) => r.props('title'));
    const ci = titles.indexOf('Continue Watching');
    const fav = titles.indexOf('My List'); // S07: favorites rail now titled "My List"
    expect(ci).toBeGreaterThanOrEqual(0);
    expect(fav).toBe(ci + 1);
  });

  it('hides the Favorites rail when there are no favorites', async () => {
    stubFetch({ libraries: ONE_LIBRARY, favorites: [] });
    const w = mountPage();
    await flushPromises();
    expect(favoritesRow(w)).toBeUndefined();
  });

  it('hydrates the favorites store from the fetched items', async () => {
    stubFetch({
      libraries: ONE_LIBRARY,
      favorites: [media({ id: 'f1', name: 'Fave', user_data: { favorite: true, rating: 7 } })],
    });
    const w = mountPage();
    const userItemData = useUserItemDataStore();
    await flushPromises();
    expect(favoritesRow(w)).toBeTruthy();
    expect(userItemData.isFavorite('f1')).toBe(true);
    expect(userItemData.get('f1').rating).toBe(7);
  });

  it('patches favoriteItems in-place when onWatchlist is called (no refetch)', async () => {
    // U-N5: onWatchlist patches favoriteItems locally instead of refetching.
    // The MediaCard already toggled the store optimistically before emitting
    // `watchlist`. onWatchlist reads userItemData.isFavorite(id) and patches
    // favoriteItems in-place: adding the item if favorite=true, removing it if false.
    const fav = (id: string, name: string) =>
      media({ id, name, user_data: { favorite: true, rating: null } });
    stubFetch({
      libraries: ONE_LIBRARY,
      favorites: [fav('f1', 'Keep'), fav('f2', 'Drop')],
    });
    const w = mountPage();
    const userItemData = useUserItemDataStore();
    await flushPromises();

    // Both seeded into the store + rendered in the rail.
    expect((favoritesRow(w)!.props('items') as MediaItem[]).map((i) => i.id)).toEqual(['f1', 'f2']);
    expect(userItemData.isFavorite('f1')).toBe(true);
    expect(userItemData.isFavorite('f2')).toBe(true);

    // Simulate MediaCard's optimistic toggle + watchlist relay: toggle f2 off,
    // then emit `watchlist` from the favorites MediaRow so BrowsePage.onWatchlist
    // receives it and patches favoriteItems in-place.
    const favRow = favoritesRow(w)!;
    await userItemData.toggleFavorite('f2', '');
    await flushPromises();
    // Pass the item without user_data.favorite — onWatchlist reads the store.
    favRow.vm.$emit('watchlist', media({ id: 'f2', name: 'Drop' }));
    await flushPromises();

    const items = favoritesRow(w)!.props('items') as MediaItem[];
    expect(items.map((i) => i.id)).toEqual(['f1']);
    // The store reflects the unfavorite state.
    expect(userItemData.isFavorite('f2')).toBe(false);
  });

  it('hides the favorites rail when onWatchlist removes the last item', async () => {
    // U-N5: onWatchlist locally removes the item; when favoriteItems becomes
    // empty, showFavorites computed flips and the rail v-if hides it.
    // Note: f1 must be in media response so userItemData.get('f1') is hydrated
    // (loadFavorites only populates favoriteItems, not userItemData store).
    stubFetch({
      libraries: ONE_LIBRARY,
      media: { items: [media({ id: 'f1', name: 'Only Fave', user_data: { favorite: true, rating: null } })], total: 1 },
      favorites: [media({ id: 'f1', name: 'Only Fave', user_data: { favorite: true, rating: null } })],
    });
    const w = mountPage();
    const userItemData = useUserItemDataStore();
    await flushPromises();
    expect(favoritesRow(w)).toBeTruthy();
    // Confirm userItemData is hydrated so toggleFavorite flips correctly.
    expect(userItemData.isFavorite('f1')).toBe(true);

    // Simulate MediaCard's toggle + watchlist relay: emit from the MediaRow.
    const favRow = favoritesRow(w)!;
    await userItemData.toggleFavorite('f1', '');
    await flushPromises();
    // Pass the item without user_data.favorite — onWatchlist reads the store.
    favRow.vm.$emit('watchlist', media({ id: 'f1', name: 'Only Fave' }));
    await flushPromises();

    expect(favoritesRow(w)).toBeUndefined();
  });
});

describe('BrowsePage — card actions', () => {
  it('routes Play on a movie straight to the player route (resolves to self)', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'p1' })], total: 1 } });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('play', media({ id: 'p1' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'p1' } });
  });

  it('resolves Play on a SERIES to its next-up/first episode and plays THAT (not the series id)', async () => {
    // The series fetch returns two episodes; with no resume the first plays.
    const episodes = [
      media({ id: 'e1', type: 'episode', season_number: 1, episode_number: 1 }),
      media({ id: 'e2', type: 'episode', season_number: 1, episode_number: 2 }),
    ];
    const fn = stubSeriesFetch(episodes);
    const router = makeRouter(true); // media route present (poster click target)
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('play', media({ id: 's1', type: 'series' }));
    await flushPromises();
    // Plays the RESOLVED episode, never the (unplayable) series id.
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'e1' } });
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 's1' } });
    // It actually fetched the series' children to resolve.
    expect(fn.mock.calls.some(([u]) => typeof u === 'string' && (u as string).includes('parentId=s1'))).toBe(true);
  });

  it('plays the resume-in-progress episode when the series has one', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ e2: 600 }));
    const episodes = [
      media({ id: 'e1', type: 'episode', season_number: 1, episode_number: 1 }),
      media({ id: 'e2', type: 'episode', season_number: 1, episode_number: 2 }),
    ];
    stubSeriesFetch(episodes);
    const router = makeRouter(true);
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('play', media({ id: 's1', type: 'series' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'e2' } });
  });

  it('toasts and does NOT navigate when a series resolves to nothing playable', async () => {
    stubSeriesFetch([]); // no episodes → resolvePlayable returns null
    const router = makeRouter(true);
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    const toasts = useToastStore();
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('play', media({ id: 's1', type: 'series' }));
    await flushPromises();
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 's1' } });
    expect(toasts.toasts.some((t) => /nothing to play/i.test(t.message))).toBe(true);
  });

  it('a rapid second Play supersedes the first (stale resolve is discarded)', async () => {
    // First Play is a slow series resolve; a second Play (a movie) lands while the
    // first is still in flight. The first must be aborted and never navigate.
    const slow = deferredSeriesFetch();
    const router = makeRouter(true);
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    const row = w.findComponent(HomeRow);
    // Kick off the slow series resolve (its fetch hangs until we resolve it).
    row.vm.$emit('play', media({ id: 's1', type: 'series' }));
    await Promise.resolve();
    // Second Play supersedes — a directly-playable movie navigates immediately.
    row.vm.$emit('play', media({ id: 'm9' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'm9' } });
    // Now let the first (superseded) series fetch finish; it must NOT navigate.
    slow.resolveWith([media({ id: 'e1', type: 'episode', season_number: 1, episode_number: 1 })]);
    await flushPromises();
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 'e1' } });
  });

  it('shows a state-aware "added" toast when the item is now favorited', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'p1', name: 'Dune' })], total: 1 } });
    const w = mountPage();
    const toasts = useToastStore();
    // The card already toggled the favorite ON (Step 17.3) before re-emitting
    // `watchlist`; the page reads that persisted state and toasts accordingly.
    const userItemData = useUserItemDataStore();
    userItemData.hydrate(media({ id: 'p1', user_data: { favorite: true, rating: null } }));
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('watchlist', media({ id: 'p1', name: 'Dune' }));
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'success' && t.message.includes('Dune') && /favorites/i.test(t.message),
      ),
    ).toBe(true);
  });

  it('shows a state-aware "removed" toast when the item is no longer favorited', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'p2', name: 'Arrival' })], total: 1 } });
    const w = mountPage();
    const toasts = useToastStore();
    const userItemData = useUserItemDataStore();
    userItemData.hydrate(media({ id: 'p2', user_data: { favorite: false, rating: null } }));
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('watchlist', media({ id: 'p2', name: 'Arrival' }));
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'info' && t.message.includes('Arrival') && /favorites/i.test(t.message),
      ),
    ).toBe(true);
  });

  it('does NOT toggle the favorite a second time from the watchlist handler (no double-flip)', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'p3', name: 'Sicario' })], total: 1 } });
    const w = mountPage();
    const userItemData = useUserItemDataStore();
    // Simulate the card having already toggled the favorite ON.
    userItemData.hydrate(media({ id: 'p3', user_data: { favorite: true, rating: null } }));
    const toggleSpy = vi.spyOn(userItemData, 'toggleFavorite');
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('watchlist', media({ id: 'p3', name: 'Sicario' }));
    // The page never calls toggleFavorite — the card is the single source of truth.
    expect(toggleSpy).not.toHaveBeenCalled();
    // …and the favorite state survives the handler (no flip back to false).
    expect(userItemData.isFavorite('p3')).toBe(true);
  });

  it('routes Info to the detail route when it exists', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'i1' })], total: 1 } });
    const router = makeRouter(true);
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('info', media({ id: 'i1' }));
    expect(push).toHaveBeenCalledWith({ name: 'media', params: { id: 'i1' } });
  });
});

describe('BrowsePage — match-apply refresh (U5)', () => {
  it('patches the matched card in a library rail, not only Continue Watching', async () => {
    stubFetch({
      libraries: ONE_LIBRARY,
      media: { items: [media({ id: 'p1', name: 'Old Name' })], total: 1 },
    });
    const w = mountPage();
    // admin → the match action + modal mount are enabled
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true };
    await flushPromises();

    // the library rail rendered the (pre-match) card
    const before = w.findAllComponents(MediaCard).map((c) => (c.props('item') as MediaItem).name);
    expect(before).toContain('Old Name');

    // simulate a successful apply: the modal emits the re-shaped item
    const modal = w.findComponent(MetadataMatchModal);
    expect(modal.exists()).toBe(true);
    modal.vm.$emit('applied', media({ id: 'p1', name: 'New Name', poster_url: 'https://img/new.jpg' }));
    await flushPromises();

    // the library/genre rail card reflects the new data without a re-fetch
    const after = w.findAllComponents(MediaCard).map((c) => (c.props('item') as MediaItem).name);
    expect(after).toContain('New Name');
    expect(after).not.toContain('Old Name');
  });
});

describe('BrowsePage — see-all', () => {
  it('routes a library rail see-all to that library page', async () => {
    stubFetch({ libraries: ONE_LIBRARY });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('see-all', {
      id: 'library-lib1',
      title: 'Movies',
      query: { libraryId: 'lib1' },
    });
    expect(push).toHaveBeenCalledWith({ name: 'library', params: { id: 'lib1' } });
  });

  it('does not render a "See all" button for a configured (non-library) row', async () => {
    stubFetch({ libraries: [], media: { items: [media()], total: 1 } });
    const w = mountPage({ config: { homeRows: [{ id: 'r2', title: 'Sci-Fi', query: { genres: ['Sci-Fi'] } }] } });
    await flushPromises();
    // the genre shelf has no navigable target, so its See-all is suppressed
    expect(w.find('.home-row__seeall').exists()).toBe(false);
  });

  it('does not navigate if a configured-row see-all is somehow emitted', async () => {
    stubFetch({ libraries: [] });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router, config: { homeRows: [{ id: 'r2', title: 'Sci-Fi', query: { genres: ['Sci-Fi'] } }] } });
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('see-all', { id: 'r2', title: 'Sci-Fi', query: { genres: ['Sci-Fi'] } });
    expect(push).not.toHaveBeenCalled();
  });
});
