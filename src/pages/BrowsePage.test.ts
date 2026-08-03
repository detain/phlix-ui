/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref, computed, type ComputedRef } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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
import ItemDataInspector from '../components/ItemDataInspector.vue';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { MediaItem } from '../types/media-item';
import type { LibrarySummary } from '../api/libraries';
import type { PhlixAppConfig } from '../app/types';
import { isRoute, hasQuery } from '../test/route-match';

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

/**
 * The exact server routes this page's rails read, one constant per rail.
 *
 * Every one of them is matched through the shared {@link isRoute}: the request's
 * pathname (query stripped) must END WITH the route. Substring matching CANNOT
 * distinguish the real path from a suffix-appended one —
 * `'…/next-up-typo'.includes('…/next-up')` is `true`. Measured 2026-08-03 (#291):
 * changing the production path in `api/nextUp.ts` to
 * `/api/v1/users/me/next-up-MUTATED` left all four S37 tests GREEN, because both
 * the stub matcher and the "it hit the endpoint" assertion self-matched the
 * mutated path. #291 fixed Next Up; S193 fixed the other five here, which had the
 * identical shape.
 *
 * `endsWith` — not `===` — is required because the media base legitimately
 * PREFIXES these paths on the hub, where `useMediaApiBase` resolves to the
 * relay-proxy base and the real request is
 * `/api/v1/servers/{id}/proxy/api/v1/users/me/next-up`. An exact-equality matcher
 * was tried first and is WRONG: it silently stops matching as soon as a base is
 * set, so the request falls through to the empty default payload and the rail
 * hides for the wrong reason. Every pre-existing test mounts with base `''`, so
 * none of them would have caught that; the base-prefixed test below does.
 */
const NEXT_UP_PATH = '/api/v1/users/me/next-up';
const MOST_WATCHED_PATH = '/api/v1/media/most-watched';
const RECOMMENDATIONS_PATH = '/api/v1/me/recommendations';
const FAVORITES_PATH = '/api/v1/users/me/favorites';
const CONTINUE_WATCHING_PATH = '/api/v1/users/me/continue-watching';
const LIBRARIES_PATH = '/api/v1/libraries';

/**
 * Whether a fetch URL addresses the Next Up endpoint — base-prefix tolerant but
 * suffix-exact. See {@link NEXT_UP_PATH}.
 */
function isNextUpUrl(url: unknown): boolean {
  return isRoute(url, NEXT_UP_PATH);
}

const ONE_LIBRARY: LibrarySummary[] = [{ id: 'lib1', name: 'Movies', type: 'movie' }];

/** One recommendation as GET /api/v1/me/recommendations returns it (S26). */
interface UserRecommendation {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  score: number;
  reason: 'because_you_watched';
  computedAt: string;
}

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
    /** Recommended rail payload (S26). Defaults to empty, hiding the rail unless
     *  a test supplies items — mirrors the favorites/continue-watching defaults. */
    recommendations?: UserRecommendation[];
    /** Most Watched rail payload (S32) — GET /api/v1/media/most-watched returns
     *  `{ items, total, limit, offset }` with items already shaped as MediaItems
     *  (server-side MediaItemShaper). Defaults to empty, hiding the rail unless a
     *  test supplies items — mirrors the recommendations/favorites defaults. */
    mostWatched?: MediaItem[];
    /** Next Up rail payload (S37) — GET /api/v1/users/me/next-up returns
     *  `{ items }` with items already shaped as MediaItems (server-side
     *  MediaItemShaper; a superset of the CW shape adding series_id/series_name,
     *  position_ticks/duration_ticks = 0) and NO per-user `user_data`. Defaults to
     *  empty, hiding the rail unless a test supplies items — mirrors the siblings. */
    nextUp?: MediaItem[];
    /** Reject the Next Up request (network failure), driving BrowsePage's
     *  `nextUpError` branch so the rail must stay hidden rather than render an
     *  empty shell.
     *
     *  Accepts a THUNK, evaluated per request (like `favorites`), so one stub can
     *  succeed and then fail. That matters because `ApiClient` binds
     *  `globalThis.fetch` once in its constructor (`client.ts:499`,
     *  `options.fetchImpl ?? globalThis.fetch.bind(globalThis)`) and BrowsePage
     *  MEMOIZES `nextUpClient`: re-calling `stubFetch` mid-test installs a new
     *  global fetch that the already-constructed client will never call, so a
     *  reload would silently keep hitting the FIRST stub. */
    nextUpError?: boolean | (() => boolean);
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
  const recommendations = opts.recommendations ?? [];
  const mostWatched = opts.mostWatched ?? [];
  const nextUp = opts.nextUp ?? [];
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    // Suffix-exact, base-tolerant (not substring) — see NEXT_UP_PATH: a substring
    // match makes a suffix-appended production path indistinguishable from the real
    // one, while `===` would break under a non-empty media base.
    if (isNextUpUrl(u)) {
      const fails =
        typeof opts.nextUpError === 'function' ? opts.nextUpError() : opts.nextUpError === true;
      if (fails) return Promise.reject(new Error('next-up offline'));
      return Promise.resolve(jsonResponse({ items: nextUp }));
    }
    if (isRoute(u, MOST_WATCHED_PATH)) {
      return Promise.resolve(
        jsonResponse({ items: mostWatched, total: mostWatched.length, limit: 20, offset: 0 }),
      );
    }
    if (isRoute(u, RECOMMENDATIONS_PATH)) {
      return Promise.resolve(jsonResponse({ recommendations }));
    }
    if (isRoute(u, FAVORITES_PATH)) {
      const items = favoritesOf();
      return Promise.resolve(jsonResponse({ items, limit: 24, offset: 0 }));
    }
    if (isRoute(u, CONTINUE_WATCHING_PATH)) {
      // Return items with position_ticks for resume position
      const items = continueWatchingItems.map((item) => ({
        ...item,
        position_ticks: (item as MediaItem & { position_ticks?: number }).position_ticks ?? 0,
      }));
      return Promise.resolve(jsonResponse({ items }));
    }
    if (isRoute(u, LIBRARIES_PATH)) {
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
    if (isRoute(u, CONTINUE_WATCHING_PATH)) {
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
    if (isRoute(u, FAVORITES_PATH)) {
      return Promise.resolve(jsonResponse({ items: [], limit: 24, offset: 0 }));
    }
    if (isRoute(u, LIBRARIES_PATH)) {
      return Promise.resolve(jsonResponse({ libraries: ONE_LIBRARY }));
    }
    // A QUERY key, not a path suffix — see `hasQuery`. The series-children fetch
    // is `GET /api/v1/media?parentId=<id>` (useSeriesSeasons), i.e. the SAME route
    // as the plain rail fetch, so only the parameter distinguishes it and forcing
    // it through `isRoute` would be wrong.
    if (hasQuery(u, 'parentId')) {
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
    if (isRoute(u, FAVORITES_PATH)) {
      return Promise.resolve(jsonResponse({ items: [], limit: 24, offset: 0 }));
    }
    if (isRoute(u, LIBRARIES_PATH)) {
      return Promise.resolve(jsonResponse({ libraries: ONE_LIBRARY }));
    }
    // A QUERY key, not a path suffix — see `stubSeriesFetch`.
    if (hasQuery(u, 'parentId')) {
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

function mountPage(
  opts: {
    config?: Partial<PhlixAppConfig>;
    router?: Router;
    /** Override the provided `apiBase`. `useMediaApiBase` accepts a plain string
     *  OR a `ComputedRef<string>` (the hub's relay-proxy base, which changes when
     *  the selected server changes); passing a ref-backed computed here is what
     *  lets a test drive BrowsePage's `watch(apiBase, load)` RELOAD path. */
    apiBase?: string | ComputedRef<string>;
  } = {},
) {
  const router = opts.router ?? makeRouter();
  const config: PhlixAppConfig = { app: 'server', apiBase: '', ...opts.config };
  return mount(BrowsePage, {
    global: {
      plugins: [router],
      provide: { apiBase: opts.apiBase ?? config.apiBase, phlixConfig: config },
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

function recommendedRow(w: ReturnType<typeof mountPage>) {
  // S26: the Recommended rail reuses the existing recommendations endpoint.
  return w.findAllComponents(MediaRow).find((c) => c.props('title') === 'Recommended');
}

function mostWatchedRow(w: ReturnType<typeof mountPage>) {
  // S32: the Most Watched rail reuses the existing GET /api/v1/media/most-watched
  // endpoint (S31; GLOBAL server-wide trending aggregate).
  return w.findAllComponents(MediaRow).find((c) => c.props('title') === 'Most Watched');
}

function nextUpRow(w: ReturnType<typeof mountPage>) {
  // S37: the Next Up rail consumes GET /api/v1/users/me/next-up (S36; per-user
  // next-unwatched-episode picks), positioned immediately after Continue Watching.
  return w.findAllComponents(MediaRow).find((c) => c.props('title') === 'Next Up');
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

describe('BrowsePage — Recommended row (S26)', () => {
  it('renders a "Recommended" rail with items from GET /api/v1/me/recommendations', async () => {
    const fn = stubFetch({
      libraries: ONE_LIBRARY,
      recommendations: [
        {
          id: 'rec1',
          title: 'Because You Watched Dune',
          posterUrl: null,
          year: 2024,
          score: 0.9,
          reason: 'because_you_watched',
          computedAt: '2026-07-23T00:00:00Z',
        },
        {
          id: 'rec2',
          title: 'Another Pick',
          posterUrl: 'https://img/rec2.jpg',
          year: 2023,
          score: 0.7,
          reason: 'because_you_watched',
          computedAt: '2026-07-23T00:00:00Z',
        },
      ],
    });
    const w = mountPage();
    await flushPromises();
    const row = recommendedRow(w);
    expect(row).toBeTruthy();
    const items = row!.props('items') as MediaItem[];
    expect(items.map((i) => i.id)).toEqual(['rec1', 'rec2']);
    expect(items[0].name).toBe('Because You Watched Dune');
    // It reused the EXISTING recommendations endpoint (no backend change).
    expect(
      fn.mock.calls.some(([u]) => isRoute(u, RECOMMENDATIONS_PATH)),
    ).toBe(true);
  });

  it('hides the Recommended rail when there are no recommendations', async () => {
    stubFetch({ libraries: ONE_LIBRARY, recommendations: [] });
    const w = mountPage();
    await flushPromises();
    expect(recommendedRow(w)).toBeUndefined();
  });
});

describe('BrowsePage — Most Watched row (S32)', () => {
  it('renders a "Most Watched" rail with items from GET /api/v1/media/most-watched', async () => {
    const fn = stubFetch({
      libraries: ONE_LIBRARY,
      // The endpoint returns items already shaped as MediaItems (server-side
      // MediaItemShaper), so no client-side field remapping — identity mapping.
      mostWatched: [
        media({ id: 'mw1', name: 'Most Popular' }),
        media({ id: 'mw2', name: 'Runner Up' }),
      ],
    });
    const w = mountPage();
    await flushPromises();
    const row = mostWatchedRow(w);
    expect(row).toBeTruthy();
    const items = row!.props('items') as MediaItem[];
    expect(items.map((i) => i.id)).toEqual(['mw1', 'mw2']);
    expect(items[0].name).toBe('Most Popular');
    // It reused the EXISTING most-watched endpoint (no backend change).
    expect(
      fn.mock.calls.some(([u]) => isRoute(u, MOST_WATCHED_PATH)),
    ).toBe(true);
  });

  it('hides the Most Watched rail when there is nothing watched yet', async () => {
    stubFetch({ libraries: ONE_LIBRARY, mostWatched: [] });
    const w = mountPage();
    await flushPromises();
    expect(mostWatchedRow(w)).toBeUndefined();
  });

  it('does NOT overwrite existing useUserItemDataStore entries (no state-wipe race)', async () => {
    // Regression (Fixer): loadMostWatched must NEVER write to useUserItemDataStore.
    // Most-watched rows carry NO per-user `user_data` (MostWatchedController shapes
    // rows with no user context — same as Recommended), so calling `hydrate` on them
    // would REPLACE a correct store entry with all-false defaults, transiently wiping
    // the favorite heart / watched badge / rating for an item that is BOTH a favorite
    // (or watched/rated) AND globally most-watched. Mirrors the Recommended sibling,
    // which never hydrates. Pre-fix (the copied `hydrate` call) these assertions fail.
    const userItemData = useUserItemDataStore();
    // Seed the store as Favorites / Continue-Watching / a detail visit legitimately
    // would: this item is a favorite, watched, and rated.
    userItemData.hydrate(
      media({ id: 'mw1', user_data: { favorite: true, watched: true, rating: 9 } }),
    );
    expect(userItemData.isFavorite('mw1')).toBe(true);

    // The Most Watched endpoint returns the SAME id with NO user_data.
    stubFetch({
      libraries: ONE_LIBRARY,
      mostWatched: [media({ id: 'mw1', name: 'Most Popular' })],
    });
    const w = mountPage();
    await flushPromises();

    // The rail rendered the item (confirms loadMostWatched actually ran)...
    expect(mostWatchedRow(w)).toBeTruthy();
    // ...but the pre-seeded store entry is UNCHANGED (pre-fix: hydrate REPLACED it
    // with all-false, so favorite/watched/rating would be wiped here).
    expect(userItemData.isFavorite('mw1')).toBe(true);
    expect(userItemData.isWatched('mw1')).toBe(true);
    expect(userItemData.get('mw1').rating).toBe(9);
  });
});

describe('BrowsePage — Next Up row (S37)', () => {
  it('renders a "Next Up" rail with items from GET /api/v1/users/me/next-up', async () => {
    const fn = stubFetch({
      libraries: ONE_LIBRARY,
      // The endpoint returns items already shaped as MediaItems (server-side
      // MediaItemShaper; a superset of the CW shape), so no client-side field
      // remapping — identity mapping via the shared api/nextUp helper.
      nextUp: [
        media({ id: 'nu1', name: 'Show A — S01E03', type: 'episode' }),
        media({ id: 'nu2', name: 'Show B — S02E01', type: 'episode' }),
      ],
    });
    const w = mountPage();
    await flushPromises();
    const row = nextUpRow(w);
    expect(row).toBeTruthy();
    const items = row!.props('items') as MediaItem[];
    expect(items.map((i) => i.id)).toEqual(['nu1', 'nu2']);
    expect(items[0].name).toBe('Show A — S01E03');
    // It consumed the S36 next-up endpoint (backend already shipped; no change).
    // Suffix-exact, not `includes` — see NEXT_UP_PATH: a substring assertion is
    // satisfied by a suffix-appended path, so it pinned nothing about the route.
    expect(fn.mock.calls.some(([u]) => isNextUpUrl(u))).toBe(true);
  });

  it('places Next Up immediately after Continue Watching (and before My List)', async () => {
    // S37 AC: the rail must sit directly after Continue Watching. Seed both CW and
    // Next Up (and a favorite) so all three rails render, then assert the order.
    stubFetch({
      libraries: ONE_LIBRARY,
      continueWatching: [
        { ...media({ id: 'cw', name: 'Resumed', type: 'movie' }), position_ticks: 600_000_000 },
      ],
      nextUp: [media({ id: 'nu1', name: 'Show A — S01E03', type: 'episode' })],
      favorites: [media({ id: 'f1', name: 'Favorited Movie' })],
    });
    const w = mountPage();
    await flushPromises();
    const titles = w.findAllComponents(MediaRow).map((r) => r.props('title'));
    const ci = titles.indexOf('Continue Watching');
    const nu = titles.indexOf('Next Up');
    const fav = titles.indexOf('My List');
    expect(ci).toBeGreaterThanOrEqual(0);
    // Next Up is the very next rail after Continue Watching...
    expect(nu).toBe(ci + 1);
    // ...and it precedes My List (which used to be CW+1).
    expect(fav).toBeGreaterThan(nu);
  });

  it('hides the Next Up rail when there is nothing to watch next', async () => {
    stubFetch({ libraries: ONE_LIBRARY, nextUp: [] });
    const w = mountPage();
    await flushPromises();
    expect(nextUpRow(w)).toBeUndefined();
  });

  it('hides the Next Up rail when the endpoint fails, and contains the failure', async () => {
    // A failed next-up fetch must leave the rail ABSENT rather than surface a
    // titled, empty rail, and must not take the rest of the page down with it.
    // NOTE: on a FIRST-load failure this is enforced by the `length > 0` term
    // alone (nextUpItems is still []), so this test does NOT pin
    // `!nextUpError.value` — the reload test below does that.
    stubFetch({ libraries: ONE_LIBRARY, nextUpError: true });
    const w = mountPage();
    await flushPromises();
    expect(nextUpRow(w)).toBeUndefined();
    // The failure is contained to the rail — the library list still rendered.
    expect(w.findAllComponents(HomeRow).length).toBeGreaterThan(0);
  });

  it('keeps Next Up hidden when a RELOAD fails, instead of showing stale picks', async () => {
    // Pins the `!nextUpError.value` half of `showNextUp` SPECIFICALLY, which
    // nothing guarded: measured 2026-08-03, deleting that term left all 239 files
    // / 4478 tests GREEN, and it still passes the first-load error test above.
    // The reason is that on a first-load failure the term is REDUNDANT —
    // nextUpItems is still `[]`, so `length > 0` hides the rail on its own.
    // The two terms only diverge on a RELOAD: loadNextUp never clears nextUpItems
    // on failure, so after a successful load followed by a failed one the items
    // are NON-EMPTY and the error is set, and the error term is the ONLY thing
    // keeping the rail hidden.
    // ONE stub, flipped by this flag — a second stubFetch() could not reach the
    // memoized nextUpClient (see the `nextUpError` docs: ApiClient binds fetch in
    // its constructor).
    let failNextUp = false;
    const base = ref('');
    const fn = stubFetch({
      libraries: ONE_LIBRARY,
      nextUp: [media({ id: 'nu1', name: 'Show A — S01E03', type: 'episode' })],
      nextUpError: () => failNextUp,
    });
    const w = mountPage({ apiBase: computed(() => base.value) });
    await flushPromises();
    // First load succeeded: the rail is on screen with its pick.
    expect(nextUpRow(w)).toBeTruthy();
    const callsAfterFirstLoad = fn.mock.calls.filter(([u]) => isNextUpUrl(u)).length;
    expect(callsAfterFirstLoad).toBeGreaterThan(0);

    // Now the endpoint fails and a base change (the hub's server switch) reloads
    // via BrowsePage's `watch(apiBase, load)`.
    failNextUp = true;
    base.value = '/api/v1/servers/s2/proxy';
    await flushPromises();

    // The reload really did re-hit the endpoint (through the new, BASE-PREFIXED
    // url) — without this the assertion below could pass because nothing reloaded
    // at all, which is exactly how an earlier version of this test fooled itself.
    expect(fn.mock.calls.filter(([u]) => isNextUpUrl(u)).length).toBeGreaterThan(
      callsAfterFirstLoad,
    );

    // Stale picks must NOT keep the rail on screen after a failed refresh.
    expect(nextUpRow(w)).toBeUndefined();
  });

  it('does NOT overwrite existing useUserItemDataStore entries (no state-wipe race)', async () => {
    // Regression (S32 lesson): loadNextUp must NEVER write to useUserItemDataStore.
    // Next-up rows carry NO per-user `user_data` (shapeNextEpisode passes no
    // `user_data` key to the shaper — same as Recommended / Most Watched), so
    // calling `hydrate` on them would REPLACE a correct store entry with all-false
    // defaults, transiently wiping the favorite heart / watched badge / rating for
    // an item that is BOTH a favorite (or watched/rated) AND a next-up pick.
    // Mirrors the Most Watched / Recommended siblings, which never hydrate.
    // Pre-fix (a copied `hydrate` call) these assertions fail.
    const userItemData = useUserItemDataStore();
    // Seed the store as Favorites / Continue-Watching / a detail visit legitimately
    // would: this episode is a favorite, watched, and rated.
    userItemData.hydrate(
      media({ id: 'nu1', user_data: { favorite: true, watched: true, rating: 9 } }),
    );
    expect(userItemData.isFavorite('nu1')).toBe(true);

    // The Next Up endpoint returns the SAME id with NO user_data.
    stubFetch({
      libraries: ONE_LIBRARY,
      nextUp: [media({ id: 'nu1', name: 'Show A — S01E03', type: 'episode' })],
    });
    const w = mountPage();
    await flushPromises();

    // The rail rendered the item (confirms loadNextUp actually ran)...
    expect(nextUpRow(w)).toBeTruthy();
    // ...but the pre-seeded store entry is UNCHANGED (pre-fix: hydrate REPLACED it
    // with all-false, so favorite/watched/rating would be wiped here).
    expect(userItemData.isFavorite('nu1')).toBe(true);
    expect(userItemData.isWatched('nu1')).toBe(true);
    expect(userItemData.get('nu1').rating).toBe(9);
  });
});

describe('BrowsePage — every rail still resolves behind a hub relay-proxy base (S193)', () => {
  it('renders all five fetch-driven rails when the media base PREFIXES each path', async () => {
    // The S193 landmine, made observable. Tightening the stub's route matching is
    // only safe if the rule tolerates a base prefix: on the hub `useMediaApiBase`
    // resolves to `/api/v1/servers/{id}/proxy`, so the real request is
    // `/api/v1/servers/srv-7/proxy/api/v1/users/me/favorites`, and an
    // exact-equality matcher (`pathname === path`) stops matching every one of
    // these — the request falls through to the stub's DEFAULT `{ items: [], total }`
    // payload and each rail hides FOR THE WRONG REASON, with nothing red.
    //
    // Every other test in this file mounts with base `''`, so none of them can see
    // that; this one can. It is deliberately a POSITIVE test — all rails present —
    // because the failure mode of the wrong fix is silent absence.
    const HUB_BASE = '/api/v1/servers/srv-7/proxy';
    const fn = stubFetch({
      libraries: ONE_LIBRARY,
      favorites: [media({ id: 'f1', name: 'Favorited Movie' })],
      recommendations: [
        {
          id: 'rec1',
          title: 'Because You Watched Dune',
          posterUrl: null,
          year: 2024,
          score: 0.9,
          reason: 'because_you_watched',
          computedAt: '2026-08-03T00:00:00Z',
        },
      ],
      mostWatched: [media({ id: 'mw1', name: 'Most Popular' })],
      nextUp: [media({ id: 'nu1', name: 'Show A — S01E03', type: 'episode' })],
      continueWatching: [
        { ...media({ id: 'cw1', name: 'Resumed', type: 'movie' }), position_ticks: 600_000_000 },
      ],
    });
    const w = mountPage({ apiBase: HUB_BASE, config: { app: 'hub', apiBase: HUB_BASE } });
    await flushPromises();

    // Non-inertness FIRST: the base really did prefix the requests. Without this
    // the rail assertions below would also pass on a plain `''` mount, i.e. the
    // test would claim to exercise the hub shape while exercising the server shape.
    const urls = fn.mock.calls.map(([u]) => String(u));
    expect(urls.length).toBeGreaterThan(0);
    expect(urls.every((u) => u.startsWith(HUB_BASE))).toBe(true);
    for (const path of [FAVORITES_PATH, RECOMMENDATIONS_PATH, MOST_WATCHED_PATH, NEXT_UP_PATH, LIBRARIES_PATH]) {
      // The matcher's contract, asserted on the REAL urls: prefixed, still matched.
      expect(urls.some((u) => isRoute(u, path))).toBe(true);
    }

    // …and each rail actually got its payload rather than the empty default.
    expect(favoritesRow(w)!.props('items')).toHaveLength(1);
    expect(recommendedRow(w)!.props('items')).toHaveLength(1);
    expect(mostWatchedRow(w)!.props('items')).toHaveLength(1);
    expect(nextUpRow(w)!.props('items')).toHaveLength(1);
    // Continue Watching is fed by `auth.client.get` (useResumeSync), NOT the global
    // fetch, so its url is NOT base-prefixed — it is asserted here only to show the
    // hub mount does not break the rail that takes the other seam.
    expect(continueRow(w)!.props('items')).toHaveLength(1);
    // The library list resolved too (HomeRow is the per-library rail).
    expect(w.findAllComponents(HomeRow).length).toBeGreaterThan(0);
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

// S15 — the admin ⋯-menu "Edit metadata" / "Explore item data" actions bubble
// from a HomeRow rail up to BrowsePage, which opens the (shared) match modal /
// the read-only inspector. Both must produce VISIBLE UI on this MediaCard host.
describe('BrowsePage — Edit metadata / Explore item data (S15)', () => {
  async function mountAdmin() {
    stubFetch({
      libraries: ONE_LIBRARY,
      media: { items: [media({ id: 'p1', name: 'Dune' })], total: 1 },
    });
    const w = mountPage();
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true };
    await flushPromises();
    return w;
  }

  it('@edit-metadata from a rail → opens the shared MetadataMatchModal', async () => {
    const w = await mountAdmin();
    const modal = w.findComponent(MetadataMatchModal);
    expect(modal.exists()).toBe(true);
    expect(modal.props('modelValue')).toBe(false);

    w.findComponent(HomeRow).vm.$emit('edit-metadata', media({ id: 'p1', name: 'Dune' }));
    await flushPromises();
    expect(modal.props('modelValue')).toBe(true);
    expect((modal.props('item') as MediaItem).id).toBe('p1');
  });

  it('@explore-data from a rail → opens the read-only ItemDataInspector', async () => {
    const w = await mountAdmin();
    const inspector = w.findComponent(ItemDataInspector);
    expect(inspector.exists()).toBe(true);
    expect(inspector.props('modelValue')).toBe(false);

    // Non-inertness control: nothing is teleported before the action, so the
    // post-action DOM assertion below cannot be satisfied by a leftover mount.
    expect(document.body.querySelectorAll('[data-test="item-json"]').length).toBe(0);

    w.findComponent(HomeRow).vm.$emit('explore-data', media({ id: 'p1', name: 'Dune' }));
    await flushPromises();
    expect(inspector.props('modelValue')).toBe(true);
    expect((inspector.props('item') as MediaItem).id).toBe('p1');
    // The AC is "produces VISIBLE UI", not "sets a prop": assert the inspector's
    // teleported JSON pane actually rendered the item. Measured 2026-08-02 —
    // emptying that <pre> left this host's prop-only assertions GREEN.
    const panes = document.body.querySelectorAll('[data-test="item-json"]');
    expect(panes.length).toBe(1);
    expect(panes[0].textContent).toContain('"id": "p1"');
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

/**
 * S09 — the Browse page's double-padding fix.
 *
 * jsdom does not apply an SFC's compiled `<style>`. Measured 2026-08-01, putting
 * `.browse-page`'s own `padding: var(--space-6)` back — the exact pre-S09 state —
 * left the full 4,207-test suite GREEN, so the step's only user-visible effect
 * was unpinned. Follows the `AppLayout.test.ts` CSS-contract convention.
 */
describe('BrowsePage — double-padding CSS contract (S09)', () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), './BrowsePage.vue'), 'utf8');
  const pageBlock = /(?<![\w.-])\.browse-page\s*\{([^}]*)\}/.exec(src);

  it('gives `.browse-page` no outer padding of its own', () => {
    expect(pageBlock).not.toBeNull();
    expect(pageBlock![1]).toMatch(/padding:\s*0;/);
  });

  it('does not smuggle the gutter back in as a margin or a one-sided padding', () => {
    expect(pageBlock![1]).not.toMatch(/margin:\s*var\(--space/);
    expect(pageBlock![1]).not.toMatch(/padding-(top|block|block-start|inline):/);
  });

  it('fixes it PAGE-SCOPED, never by shrinking the shared shell gutter', () => {
    // S09's out-of-scope line is explicit: Settings/Admin/Music/Search must not
    // move. The complement of this assertion — `.shell__main` still declaring
    // `padding: var(--space-6) var(--space-5)` — is pinned in AppLayout.test.ts;
    // here we pin that BrowsePage did not reach across and override it.
    // Comments are stripped first: the SFC legitimately NAMES `.shell__main` in
    // prose to explain why the page zeroes its own padding, and matching that
    // would make this assertion fail for the right code.
    const selectors = cssSelectors(src);
    expect(selectors.length).toBeGreaterThan(0);
    expect(selectors.filter((s) => s.includes('shell__main'))).toEqual([]);
  });
});

/**
 * Every CSS selector declared in an SFC's `<style>` blocks, with `/* … *␘/`
 * comments removed and at-rule/nested-block noise filtered out.
 */
function cssSelectors(sfc: string): string[] {
  return [...sfc.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1].replace(/\/\*[\s\S]*?\*\//g, ''))
    .flatMap((block) => [...block.matchAll(/([^{}]+)\{/g)].map((m) => m[1].trim()))
    .filter((s) => s.length > 0 && !s.startsWith('@'));
}
