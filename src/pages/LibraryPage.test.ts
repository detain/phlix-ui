/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { Comment, Fragment, nextTick, type VNode } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import LibraryPage from './LibraryPage.vue';
import { isRoute, hasQuery } from '../test/route-match';
import EmptyState from '../components/ui/EmptyState.vue';
import { useMediaStore } from '../stores/useMediaStore';
import { useToastStore } from '../stores/useToastStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { useAuthStore } from '../stores/useAuthStore';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import ItemDataInspector from '../components/ItemDataInspector.vue';
import MediaCard from '../components/MediaCard.vue';
import MediaListRow from '../components/MediaListRow.vue';
import MediaBackdropRow from '../components/MediaBackdropRow.vue';
import MediaTableRow from '../components/MediaTableRow.vue';
import {
  BACKDROP_ROW_HEIGHT,
  computeFixedRowHeight,
  LIST_ROW_HEIGHT,
  TABLE_COLUMNS,
  TABLE_ROW_HEIGHT,
  TABLE_ROW_TEMPLATE_COLUMNS,
} from '../components/virtual-grid';
import type { MediaItem } from '../types/media-item';
import type { LibrarySummary } from '../api/libraries';

/**
 * The LIST shape `GET /api/v1/media` returns. `backdrop_url`/`backdrop_srcset` are
 * present-and-`null` on purpose: that is what the shaper emits for an item with no
 * backdrop (the seven backdrop-less types, and any unmatched title), and it keeps the
 * backdrop-branch tests below discriminating. Do NOT populate them here — pass a
 * backdrop-bearing item explicitly to `mountWithMode` instead.
 */
function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    type: 'movie',
    poster_url: null,
    backdrop_url: null,
    backdrop_srcset: null,
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
 * The two exact routes this page reads: the library list (`api/libraries.ts:69`)
 * and the media list (`stores/useMediaStore` → `GET /api/v1/media?...`).
 *
 * S193: matched with {@link isRoute} — the pathname (query stripped) must END WITH
 * the route — because `u.includes('/api/v1/libraries')` also matches
 * `/api/v1/libraries-MUTATED`, so the stub served a library list to a route that
 * would 404. It is also strictly more precise for the media list: a substring
 * `'/api/v1/media'` search finds `/api/v1/media/facets` and `/api/v1/media/index`
 * too, so `find(...)` could return a DIFFERENT call than the one the
 * `libraryId=`/`topLevel=` assertions are about. `endsWith`, not `===`: a base
 * legitimately prefixes the path on the hub.
 */
const LIBRARIES_PATH = '/api/v1/libraries';
const MEDIA_PATH = '/api/v1/media';

const LIBS: LibrarySummary[] = [
  { id: 'lib1', name: 'Movies', type: 'movie' },
  { id: 'lib2', name: 'Anime', type: 'series' },
];

function stubFetch(opts: { media?: { items: MediaItem[]; total: number }; mediaError?: boolean } = {}) {
  const mediaBody = opts.media ?? { items: [media()], total: 3 };
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (isRoute(u, LIBRARIES_PATH)) {
      return Promise.resolve(jsonResponse({ libraries: LIBS }));
    }
    if (opts.mediaError) return Promise.reject(new Error('library offline'));
    return Promise.resolve(jsonResponse(mediaBody));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

/**
 * A fetch stub where a `parentId=` request (the series-children fetch
 * `resolvePlayable` issues for a series Play) returns `episodes`; the library
 * list resolves, and the grid's own (non-parentId) media fetch returns a single
 * series card. Used by the Feature 9 series-resolve tests.
 */
function stubSeriesFetch(episodes: MediaItem[]) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (isRoute(u, LIBRARIES_PATH)) {
      return Promise.resolve(jsonResponse({ libraries: LIBS }));
    }
    // A QUERY key, not a path suffix: the series-children fetch is
    // `GET /api/v1/media?parentId=<id>` — the SAME route as the grid's own media
    // fetch — so only the parameter distinguishes it (S193).
    if (hasQuery(u, 'parentId')) {
      return Promise.resolve(jsonResponse({ items: episodes, total: episodes.length }));
    }
    return Promise.resolve(jsonResponse({ items: [media({ id: 's1', type: 'series' })], total: 1 }));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

/**
 * A series-children fetch whose `parentId=` response is held until
 * `resolveWith(episodes)` — lets a test start a slow series resolve, supersede
 * it with a second Play, then complete the stale one and assert no navigation.
 */
function deferredSeriesFetch() {
  let release!: (eps: MediaItem[]) => void;
  const gate = new Promise<MediaItem[]>((res) => {
    release = res;
  });
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (isRoute(u, LIBRARIES_PATH)) {
      return Promise.resolve(jsonResponse({ libraries: LIBS }));
    }
    // A QUERY key, not a path suffix: the series-children fetch is
    // `GET /api/v1/media?parentId=<id>` — the SAME route as the grid's own media
    // fetch — so only the parameter distinguishes it (S193).
    if (hasQuery(u, 'parentId')) {
      return gate.then((eps) => jsonResponse({ items: eps, total: eps.length }));
    }
    return Promise.resolve(jsonResponse({ items: [media({ id: 's1', type: 'series' })], total: 1 }));
  });
  vi.stubGlobal('fetch', fn);
  return { fn, resolveWith: (eps: MediaItem[]) => release(eps) };
}

function makeRouter(): Router {
  const stub = { template: '<div />' };
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/player/:id', name: 'player', component: stub },
      { path: '/app/media/:id', name: 'media', component: stub },
      { path: '/app/library/:id', name: 'library', component: LibraryPage },
    ],
  });
}

async function mountAt(id: string, router?: Router) {
  const r = router ?? makeRouter();
  await r.push(`/app/library/${id}`);
  await r.isReady();
  const w = mount(LibraryPage, {
    global: { plugins: [r], provide: { apiBase: '', phlixConfig: { app: 'server', apiBase: '' } } },
  });
  return { w, router: r };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  vi.stubGlobal('IntersectionObserver', undefined);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('LibraryPage', () => {
  it('scopes the store to the route library id and fetches it', async () => {
    const fn = stubFetch();
    await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    expect(store.libraryId).toBe('lib1');
    // the media request carried the scoping param
    const mediaCall = fn.mock.calls.find(([u]) => isRoute(u, MEDIA_PATH));
    expect(mediaCall).toBeTruthy();
    expect(mediaCall![0]).toContain('libraryId=lib1');
  });

  it('requests top-level items only (so a series library shows shows, not episodes)', async () => {
    const fn = stubFetch();
    await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    expect(store.topLevel).toBe(true);
    const mediaCall = fn.mock.calls.find(([u]) => isRoute(u, MEDIA_PATH));
    expect(mediaCall![0]).toContain('topLevel=1');
  });

  it('clears the top-level restriction on unmount', async () => {
    stubFetch();
    const { w } = await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    expect(store.topLevel).toBe(true);
    w.unmount();
    expect(store.topLevel).toBe(false);
  });

  it('titles the page with the library name and shows the total', async () => {
    stubFetch({ media: { items: [media()], total: 42 } });
    const { w } = await mountAt('lib1');
    await flushPromises();
    expect(w.find('.library-title').text()).toBe('Movies');
    expect(w.find('.library-count').text()).toContain('42');
  });

  it('reloads on a FilterBar change', async () => {
    stubFetch();
    const { w } = await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    const reset = vi.spyOn(store, 'reset');
    const fetchMedia = vi.spyOn(store, 'fetchMedia');
    w.findComponent({ name: 'FilterBar' }).vm.$emit('change');
    expect(reset).toHaveBeenCalled();
    expect(fetchMedia).toHaveBeenCalled();
  });

  it('forwards the grid need-range to store.ensureRange (random-access paging / A-Z jump)', async () => {
    stubFetch({ media: { items: [media()], total: 50 } });
    const { w } = await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    const ensureRange = vi.spyOn(store, 'ensureRange').mockResolvedValue();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('need-range', 24, 48);
    expect(ensureRange).toHaveBeenCalledWith(expect.anything(), 24, 48);
  });

  it('re-scopes and reloads when navigating to another library', async () => {
    const fn = stubFetch();
    const { router } = await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    fn.mockClear();
    await router.push('/app/library/lib2');
    await flushPromises();
    expect(store.libraryId).toBe('lib2');
    const mediaCall = fn.mock.calls.find(([u]) => isRoute(u, MEDIA_PATH));
    expect(mediaCall![0]).toContain('libraryId=lib2');
  });

  it('clears the store scope AND filters on unmount', async () => {
    stubFetch();
    const { w } = await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    store.setGenres(['Action']);
    store.setSearch('dune');
    expect(store.libraryId).toBe('lib1');
    w.unmount();
    expect(store.libraryId).toBeUndefined();
    expect(store.selectedGenres).toEqual([]);
    expect(store.search).toBe('');
  });

  it('clears filters when switching to another library (no bleed)', async () => {
    stubFetch();
    const { router } = await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    // apply a filter on lib1, then navigate to lib2
    store.setGenres(['Action']);
    store.setSearch('dune');
    await router.push('/app/library/lib2');
    await flushPromises();
    expect(store.libraryId).toBe('lib2');
    expect(store.selectedGenres).toEqual([]);
    expect(store.search).toBe('');
  });

  it('shows the error EmptyState with a working retry', async () => {
    const fn = stubFetch({ mediaError: true });
    const { w } = await mountAt('lib1');
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain('library offline');
    const before = fn.mock.calls.length;
    await empty.find('button').trigger('click');
    await flushPromises();
    expect(fn.mock.calls.length).toBeGreaterThan(before);
  });

  it('routes Play on a movie straight to the player route (resolves to self)', async () => {
    stubFetch({ media: { items: [media({ id: 'p1' })], total: 1 } });
    const { w, router } = await mountAt('lib1');
    const push = vi.spyOn(router, 'push');
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('play', media({ id: 'p1' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'p1' } });
  });

  it('resolves Play on a SERIES to its next-up/first episode and plays THAT (not the series id)', async () => {
    const fn = stubSeriesFetch([
      media({ id: 'e1', type: 'episode', season_number: 1, episode_number: 1 }),
      media({ id: 'e2', type: 'episode', season_number: 1, episode_number: 2 }),
    ]);
    const { w, router } = await mountAt('lib2');
    const push = vi.spyOn(router, 'push');
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('play', media({ id: 's1', type: 'series' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'e1' } });
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 's1' } });
    expect(fn.mock.calls.some(([u]) => typeof u === 'string' && (u as string).includes('parentId=s1'))).toBe(true);
  });

  it('plays the resume-in-progress episode when the series has one', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ e2: 600 }));
    stubSeriesFetch([
      media({ id: 'e1', type: 'episode', season_number: 1, episode_number: 1 }),
      media({ id: 'e2', type: 'episode', season_number: 1, episode_number: 2 }),
    ]);
    const { w, router } = await mountAt('lib2');
    const push = vi.spyOn(router, 'push');
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('play', media({ id: 's1', type: 'series' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'e2' } });
  });

  it('toasts and does NOT navigate when a series resolves to nothing playable', async () => {
    stubSeriesFetch([]); // no episodes → resolvePlayable returns null
    const { w, router } = await mountAt('lib2');
    const push = vi.spyOn(router, 'push');
    const toasts = useToastStore();
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('play', media({ id: 's1', type: 'series' }));
    await flushPromises();
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 's1' } });
    expect(toasts.toasts.some((t) => /nothing to play/i.test(t.message))).toBe(true);
  });

  it('a rapid second Play supersedes the first (stale resolve is discarded)', async () => {
    const slow = deferredSeriesFetch();
    const { w, router } = await mountAt('lib2');
    const push = vi.spyOn(router, 'push');
    await flushPromises();
    const grid = w.findComponent({ name: 'MediaGrid' });
    grid.vm.$emit('play', media({ id: 's1', type: 'series' }));
    await Promise.resolve();
    grid.vm.$emit('play', media({ id: 'm9' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'm9' } });
    slow.resolveWith([media({ id: 'e1', type: 'episode', season_number: 1, episode_number: 1 })]);
    await flushPromises();
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 'e1' } });
  });

  // UI-0.1 REGRESSION GUARD: the card already toggled + persisted the watched
  // state (MediaCard.onWatched → toggleWatched) before re-emitting `mark-watched`.
  // LibraryPage.onMarkWatched must be REPORT-ONLY: it must NEVER call
  // toggleFavorite (the historical favorite-corruption bug U-H4) and its toast
  // must match the resulting `isWatched()` state.
  describe('mark-watched (UI-0.1: report-only, never mutates favorite)', () => {
    it('never calls toggleFavorite and toasts success when the item is now watched', async () => {
      stubFetch({ media: { items: [media({ id: 'w1' })], total: 1 } });
      const { w } = await mountAt('lib1');
      await flushPromises();
      const userItemData = useUserItemDataStore();
      const toasts = useToastStore();
      const toggleFavorite = vi.spyOn(userItemData, 'toggleFavorite').mockResolvedValue(undefined);
      // Card has already persisted the toggle → item is watched.
      userItemData.entries.set('w1', { favorite: false, rating: null, like_level: 0, watched: true });

      w.findComponent({ name: 'MediaGrid' }).vm.$emit('mark-watched', media({ id: 'w1', name: 'Dune' }));
      await flushPromises();

      expect(toggleFavorite).not.toHaveBeenCalled();
      expect(toasts.toasts.some((t) => t.tone === 'success' && /marked "Dune" as watched/i.test(t.message))).toBe(true);
    });

    it('never calls toggleFavorite and toasts info when the item is now unwatched', async () => {
      stubFetch({ media: { items: [media({ id: 'w2' })], total: 1 } });
      const { w } = await mountAt('lib1');
      await flushPromises();
      const userItemData = useUserItemDataStore();
      const toasts = useToastStore();
      const toggleFavorite = vi.spyOn(userItemData, 'toggleFavorite').mockResolvedValue(undefined);
      // Card toggled watched OFF → item is unwatched (no entry / watched:false).
      userItemData.entries.set('w2', { favorite: false, rating: null, like_level: 0, watched: false });

      w.findComponent({ name: 'MediaGrid' }).vm.$emit('mark-watched', media({ id: 'w2', name: 'Dune' }));
      await flushPromises();

      expect(toggleFavorite).not.toHaveBeenCalled();
      expect(toasts.toasts.some((t) => t.tone === 'info' && /marked "Dune" as unwatched/i.test(t.message))).toBe(true);
    });
  });
});

// S67 — the persisted `viewMode` preference reaches the page through the single
// MediaGrid mount. The alternate renderers themselves are S68-S70; here the only
// requirement is that switching mode is a no-op for the grid (which keeps
// rendering) and never spawns a second grid / paging path.
describe('LibraryPage — view mode (S67)', () => {
  function viewButtons(w: Awaited<ReturnType<typeof mountAt>>['w']) {
    return w.find('[aria-label="View mode"]').findAll('button');
  }

  it('reflects the persisted mode on ONE MediaGrid mount (grid by default)', async () => {
    stubFetch();
    const { w } = await mountAt('lib1');
    await flushPromises();
    const grids = w.findAllComponents({ name: 'MediaGrid' });
    expect(grids).toHaveLength(1);
    expect(w.find('.media-grid-root').attributes('data-view-mode')).toBe('grid');
  });

  it('starts from a mode hydrated out of storage', async () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ viewMode: 'backdrop' }));
    setActivePinia(createPinia());
    stubFetch();
    const { w } = await mountAt('lib1');
    await flushPromises();
    expect(w.find('.media-grid-root').attributes('data-view-mode')).toBe('backdrop');
  });

  it('the FilterBar toggle switches the mode without touching the grid or reloading', async () => {
    stubFetch();
    const { w } = await mountAt('lib1');
    await flushPromises();
    const prefs = usePreferencesStore();
    const store = useMediaStore();
    // Spy on the RELOAD PATH, not on `fetch`: a `fetch` call-count assertion here
    // cannot fail, because the counterfactual (`setViewMode` emitting `change` →
    // onFilterChange → reload) hits `fetchMedia`'s 60 s in-memory cache — which
    // `reset()` does not clear — and `fetchIndexBuckets`' own module-level cache,
    // so it issues ZERO requests. `reset` + `fetchMedia` are what `reload()`
    // actually calls (see 'reloads on a FilterBar change' above), so spying on
    // them discriminates. Complements FilterBar.test.ts's `emitted('change')`
    // assertion, which guards the same invariant one layer up.
    const reset = vi.spyOn(store, 'reset');
    const fetchMedia = vi.spyOn(store, 'fetchMedia');

    await viewButtons(w)[1].trigger('click'); // List
    await nextTick();

    expect(prefs.viewMode).toBe('list');
    expect(w.find('.media-grid-root').attributes('data-view-mode')).toBe('list');
    // still exactly one grid, still rendering poster cards (grid is the only
    // renderer until S68), and the library was NOT reloaded.
    expect(w.findAllComponents({ name: 'MediaGrid' })).toHaveLength(1);
    expect(w.findComponent({ name: 'MediaCard' }).exists()).toBe(true);
    expect(reset).not.toHaveBeenCalled();
    expect(fetchMedia).not.toHaveBeenCalled();
  });
});

// ── shared #card-slot harness (S68 + S69, and S70 when it lands) ──────────────

/** MediaCard's complete host-emit surface (MediaCard.vue `defineEmits`). */
const HOST_EVENTS = [
  'play',
  'watchlist',
  'info',
  'match',
  'mark-watched',
  'refresh',
  'choose-poster',
  'remove',
  'edit-metadata',
  'explore-data',
] as const;

/** Vue's listener prop key for an emit name: `mark-watched` → `onMarkWatched`. */
function handlerKey(event: string): string {
  return `on${event.replace(/(^|-)([a-z])/g, (_m, _d, c: string) => c.toUpperCase())}`;
}

/**
 * The listener prop keys the page binds on a renderer, read from the PUBLIC
 * `VNode.props` of the vnode its `#card` slot produces (`slotRenderers()` below).
 *
 * Deliberately not `vm.$.vnode.props`: `$` is Vue's internal instance handle, so
 * that shape can change in any minor and the assertions would then fail
 * confusingly (or pass vacuously). `VNode.props` is the documented render-function
 * contract — the same object `h()` accepts — and it is exactly what the compiled
 * template wrote, so dropping `@play` from a branch is still caught.
 */
function boundListeners(vnode: VNode): string[] {
  return Object.keys(vnode.props ?? {}).filter((k) => k.startsWith('on'));
}

/**
 * The component vnodes LibraryPage's `#card` slot produces for one item.
 *
 * Asserting on the DOM alone CANNOT prove the `v-else` is unconditional: Vue's
 * `renderSlot` treats a slot that yields only a comment vnode (every `v-if` /
 * `v-else-if` false) as empty and silently renders MediaGrid's own DEFAULT card
 * instead — which still looks and behaves right here, because the grid-level
 * listeners are also still bound. Invoking the slot directly is what
 * discriminates: a `v-else-if` chain that can all be false returns a bare
 * Comment, an unconditional `v-else` always returns a real renderer.
 */
function slotRenderers(w: Awaited<ReturnType<typeof mountAt>>['w'], item: MediaItem): VNode[] {
  const slot = w.findComponent({ name: 'MediaGrid' }).vm.$slots.card as
    | ((p: { item: MediaItem; index: number }) => VNode[])
    | undefined;
  expect(slot, 'LibraryPage no longer fills MediaGrid’s #card slot').toBeTypeOf('function');
  // The compiled slot wraps its branch in a Fragment; keep only the real
  // component vnodes (a `v-if` placeholder is a Comment).
  const flatten = (nodes: VNode[]): VNode[] =>
    nodes.flatMap((n) =>
      n.type === Fragment ? flatten((n.children ?? []) as VNode[]) : n.type === Comment ? [] : [n],
    );
  return flatten(slot!({ item, index: 0 }) ?? []);
}

/**
 * Mount the page with a persisted `viewMode`, optionally over a specific payload.
 *
 * The default payload is `media()` — the LIST shape with no backdrop (both keys null),
 * which is what a backdrop-less type or an unmatched title really returns. Pass
 * `items` when a test needs a backdrop-bearing row; do NOT populate the backdrop
 * fields in the shared `media()` helper, or the backdrop-branch tests below stop
 * discriminating (S69 review, finding 1).
 */
async function mountWithMode(mode: string, items?: MediaItem[]) {
  localStorage.setItem('phlix.prefs', JSON.stringify({ viewMode: mode }));
  setActivePinia(createPinia());
  const payload = items ?? [media({ id: 'lr1', name: 'Dune' })];
  stubFetch({ media: { items: payload, total: payload.length } });
  const out = await mountAt('lib1');
  await flushPromises();
  return out;
}

/**
 * S68 — the `list` view mode renders `MediaListRow` through the SINGLE MediaGrid
 * mount's `#card` slot. The invariants under test:
 *   1. still exactly one MediaGrid (no second grid / parallel pagination path),
 *   2. the per-mode layout travels through the grid's `columns`/`row-height` props
 *      (never CSS), and the row height is the list row's own — not a 2:3 poster's,
 *   3. the `v-else` grid branch is UNCONDITIONAL, so a garbage persisted mode
 *      still renders items,
 *   4. BOTH branches wire every one of MediaCard's ten host events — filling the
 *      `#card` slot bypasses MediaGrid's own wiring, so a missing listener here is
 *      a button that silently does nothing.
 */
describe('LibraryPage — list view (S68)', () => {
  it('renders MediaListRow (not the poster card) through the ONE existing grid', async () => {
    const { w } = await mountWithMode('list');
    expect(w.findAllComponents({ name: 'MediaGrid' })).toHaveLength(1);
    expect(w.findComponent(MediaListRow).exists()).toBe(true);
    expect(w.find('.media-list-row').exists()).toBe(true);
    // the row composes a MediaCard for its poster column, with the duplicate
    // caption suppressed — that is how we tell the two renderers apart.
    expect(w.find('.media-card__caption').exists()).toBe(false);
    expect(w.find('.media-grid-root').attributes('data-view-mode')).toBe('list');
  });

  it('drives the list layout through the grid props, with the list row height', async () => {
    const { w } = await mountWithMode('list');
    const grid = w.findComponent({ name: 'MediaGrid' });
    expect(grid.props('columns')).toBe(1);
    // computeFixedRowHeight(LIST_ROW_HEIGHT) — NOT computeRowHeight()'s
    // cardWidth * 2:3 + label, which for a full-width row is ~10x too tall.
    expect(grid.props('rowHeight')).toBe(computeFixedRowHeight(LIST_ROW_HEIGHT));
    expect(grid.props('rowHeight')).toBe(LIST_ROW_HEIGHT + 24);
  });

  it('leaves the grid layout props unset in grid mode (auto-fit poster grid)', async () => {
    const { w } = await mountWithMode('grid');
    const grid = w.findComponent({ name: 'MediaGrid' });
    expect(grid.props('columns')).toBeUndefined();
    expect(grid.props('rowHeight')).toBeUndefined();
    expect(w.findComponent(MediaListRow).exists()).toBe(false);
    expect(w.findComponent(MediaCard).exists()).toBe(true);
    expect(w.find('.media-card__caption').exists()).toBe(true);
  });

  // The preferences store deliberately does NOT sanitize `viewMode` on hydration,
  // so the unconditional `v-else` is the only thing the page itself renders for a
  // stale/garbage persisted value.
  it('falls back to the poster grid for an out-of-union persisted mode', async () => {
    const { w } = await mountWithMode('sideways-carousel');
    expect(w.findAllComponents({ name: 'MediaGrid' })).toHaveLength(1);
    expect(w.findComponent(MediaListRow).exists()).toBe(false);
    // items still render — the fallback is load-bearing, not decoration
    expect(w.findComponent(MediaCard).exists()).toBe(true);
    expect(w.find('.media-card__caption-title').text()).toBe('Dune');
    const grid = w.findComponent({ name: 'MediaGrid' });
    expect(grid.props('columns')).toBeUndefined();
    expect(grid.props('rowHeight')).toBeUndefined();
  });

  // ...and the branch that renders it must be the PAGE's own `v-else`, not Vue's
  // silent slot-fallback to MediaGrid's default card (see `slotRenderers`).
  it('the #card slot itself yields a renderer for EVERY mode, garbage included', async () => {
    // One entry per IMPLEMENTED renderer; every other mode (outright garbage, and
    // the empty string a cleared preference can leave behind) must reach the
    // `v-else` card. The garbage arms below are load-bearing and must stay: they
    // are the only thing that proves the final branch is an unconditional `v-else`
    // rather than a fourth `v-else-if` (an all-false chain yields a bare Comment,
    // which Vue's `renderSlot` treats as EMPTY and silently backfills with
    // MediaGrid's own default card — so the DOM still looks right).
    //
    // ⚠ THREE of the garbage modes are SUPERSTRINGS of a real one — 'listicle',
    // 'backdrop-hero', 'not-a-table'. They exist because the page's mode tests are
    // strict `===` and must stay that way (S191/S193): loosening any of them to
    // `.includes()`/`.startsWith()` is invisible to every other assertion in this
    // suite, and was mutation-verified during S70 to turn the whole 4,800-test
    // suite ZERO red before these three arms were added. Do not prune them for
    // looking redundant with 'sideways-carousel' — that one shares no substring
    // with any mode and therefore cannot detect the loosening.
    const RENDERERS: Record<string, unknown> = {
      list: MediaListRow,
      backdrop: MediaBackdropRow,
      table: MediaTableRow,
    };
    const item = media({ id: 'lr1' });
    for (const mode of [
      'list',
      'grid',
      'backdrop',
      'table',
      'sideways-carousel',
      '',
      'listicle',
      'backdrop-hero',
      'not-a-table',
    ]) {
      const { w } = await mountWithMode(mode);
      const rendered = slotRenderers(w, item);
      expect(rendered, `#card slot rendered nothing for viewMode="${mode}"`).toHaveLength(1);
      expect(rendered[0].type, `wrong renderer for viewMode="${mode}"`).toBe(
        RENDERERS[mode] ?? MediaCard,
      );
      w.unmount();
    }
  });

  it('wires ALL TEN host events onto the list row', async () => {
    const { w } = await mountWithMode('list');
    const [row] = slotRenderers(w, media({ id: 'lr1' }));
    expect(row.type).toBe(MediaListRow);
    const bound = boundListeners(row);
    for (const event of HOST_EVENTS) {
      expect(bound, `list row is missing a \`${event}\` listener`).toContain(handlerKey(event));
    }
  });

  it('wires ALL TEN host events onto the v-else poster card too', async () => {
    const { w } = await mountWithMode('grid');
    const [card] = slotRenderers(w, media({ id: 'lr1' }));
    expect(card.type).toBe(MediaCard);
    const bound = boundListeners(card);
    for (const event of HOST_EVENTS) {
      expect(bound, `poster card is missing a \`${event}\` listener`).toContain(handlerKey(event));
    }
  });

  /**
   * S68 review finding 1, at the page level: the two renderers must be at PARITY on
   * heading count, or navigating a list-mode library by heading announces every
   * title twice (the composed card's overlay `<h3>` is only `opacity: 0`, which does
   * not remove it from the accessibility tree).
   */
  it('emits exactly ONE heading per item in list mode and in grid mode', async () => {
    const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      .map((h) => `.media-grid ${h}`)
      .join(', ');
    for (const mode of ['list', 'grid'] as const) {
      const { w } = await mountWithMode(mode);
      const headings = w.findAll(HEADINGS);
      expect(headings, `viewMode="${mode}" must emit ONE heading per item`).toHaveLength(1);
      expect(headings[0].text()).toBe('Dune');
      w.unmount();
    }
  });

  it('a list row `play` reaches the page handler and navigates', async () => {
    const { w, router } = await mountWithMode('list');
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaListRow).vm.$emit('play', media({ id: 'lr1' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'lr1' } });
  });

  it('a list row `mark-watched` reaches the page handler and reports the state', async () => {
    const { w } = await mountWithMode('list');
    const userItemData = useUserItemDataStore();
    const toasts = useToastStore();
    userItemData.entries.set('lr1', { favorite: false, rating: null, like_level: 0, watched: true });
    w.findComponent(MediaListRow).vm.$emit('mark-watched', media({ id: 'lr1', name: 'Dune' }));
    await flushPromises();
    expect(toasts.toasts.some((t) => /marked "Dune" as watched/i.test(t.message))).toBe(true);
  });

  it('a list row admin action (`explore-data`) opens the inspector', async () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ viewMode: 'list' }));
    setActivePinia(createPinia());
    stubFetch({ media: { items: [media({ id: 'lr1' })], total: 1 } });
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true } as unknown as (typeof auth)['user'];
    const r = makeRouter();
    await r.push('/app/library/lib1');
    await r.isReady();
    const w = mount(LibraryPage, {
      global: {
        plugins: [r],
        provide: { apiBase: '', phlixConfig: { app: 'server', apiBase: '' } },
        stubs: { MetadataMatchModal: true, PosterPicker: true },
      },
    });
    await flushPromises();

    // admin ⇒ the row forwards `can-match` so the Match quick-action exists
    expect(w.findComponent(MediaListRow).props('canMatch')).toBe(true);

    const inspector = w.findComponent(ItemDataInspector);
    expect(inspector.props('modelValue')).toBe(false);
    w.findComponent(MediaListRow).vm.$emit('explore-data', media({ id: 'lr1' }));
    await flushPromises();
    expect(inspector.props('modelValue')).toBe(true);
    expect((inspector.props('item') as MediaItem).id).toBe('lr1');
    // The inspector TELEPORTS to document.body, and there is no global auto-unmount
    // (`src/test/setup.ts` only restores timers). Leaving this wrapper mounted would
    // leak an open JSON pane into every later test in this file.
    w.unmount();
  });
});

/**
 * S69 — the `backdrop` view mode renders `MediaBackdropRow` (one wide hero strip
 * per item) through the SAME single MediaGrid mount. Same four invariants as S68,
 * at a different fixed height:
 *   1. still exactly one MediaGrid (no second grid / parallel pagination path),
 *   2. the layout travels through the grid's `columns`/`row-height` props with the
 *      STRIP's own height — so virtualization stays intact,
 *   3. the `v-else` grid branch is still UNCONDITIONAL (asserted by the shared
 *      slot-invocation test in the S68 block, which now covers 'backdrop' too),
 *   4. the branch wires every one of MediaCard's ten host events.
 */
describe('LibraryPage — backdrop hero view (S69)', () => {
  it('renders MediaBackdropRow (not the poster card, not a list row) through the ONE grid', async () => {
    const { w } = await mountWithMode('backdrop');
    expect(w.findAllComponents({ name: 'MediaGrid' })).toHaveLength(1);
    expect(w.findComponent(MediaBackdropRow).exists()).toBe(true);
    expect(w.find('.media-backdrop-row').exists()).toBe(true);
    expect(w.findComponent(MediaListRow).exists()).toBe(false);
    // it composes a MediaCard for its poster column with the caption suppressed
    expect(w.find('.media-card').exists()).toBe(true);
    expect(w.find('.media-card__caption').exists()).toBe(false);
    expect(w.find('.media-grid-root').attributes('data-view-mode')).toBe('backdrop');
  });

  it('drives the strip layout through the grid props, with the STRIP row height', async () => {
    const { w } = await mountWithMode('backdrop');
    const grid = w.findComponent({ name: 'MediaGrid' });
    expect(grid.props('columns')).toBe(1);
    expect(grid.props('rowHeight')).toBe(computeFixedRowHeight(BACKDROP_ROW_HEIGHT));
    expect(grid.props('rowHeight')).toBe(BACKDROP_ROW_HEIGHT + 24);
    // NOT the list row's height (the two renderers must not share one number) and
    // NOT computeRowHeight()'s cardWidth * 2:3 + label, which for a full-width row
    // reserves several times too much and desyncs padTop/totalHeight.
    expect(grid.props('rowHeight')).not.toBe(computeFixedRowHeight(LIST_ROW_HEIGHT));
  });

  it('virtualization stays intact: the grid pins the strip row TRACK and one column', async () => {
    // The props above are only half the contract — MediaGrid must actually apply
    // them, or a hero strip in a pre-sized grid would push every following row out
    // of the position padTop reserved. `grid-auto-rows` is MediaGrid ENFORCING the
    // height the windowing math assumes; the inline `grid-template-columns` is the
    // same `columns` value it windows on (never a CSS override).
    const { w } = await mountWithMode('backdrop');
    const style = w.find('.media-grid').attributes('style') ?? '';
    expect(style).toContain('grid-template-columns: repeat(1, minmax(0, 1fr))');
    expect(style).toContain(`grid-auto-rows: ${BACKDROP_ROW_HEIGHT}px`);
  });

  it('wires ALL TEN host events onto the backdrop strip', async () => {
    const { w } = await mountWithMode('backdrop');
    const [strip] = slotRenderers(w, media({ id: 'lr1' }));
    expect(strip.type).toBe(MediaBackdropRow);
    const bound = boundListeners(strip);
    for (const event of HOST_EVENTS) {
      expect(bound, `backdrop strip is missing a \`${event}\` listener`).toContain(
        handlerKey(event),
      );
    }
  });

  /**
   * Heading parity with the other two renderers (S68 review finding 1): the
   * composed card's overlay `<h3>` is only `opacity: 0`, which does NOT remove it
   * from the accessibility tree, so without `hide-caption` a backdrop library would
   * announce every title twice.
   */
  it('emits exactly ONE heading per item, like grid and list mode', async () => {
    const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      .map((h) => `.media-grid ${h}`)
      .join(', ');
    for (const mode of ['backdrop', 'list', 'grid'] as const) {
      const { w } = await mountWithMode(mode);
      const headings = w.findAll(HEADINGS);
      expect(headings, `viewMode="${mode}" must emit ONE heading per item`).toHaveLength(1);
      expect(headings[0].text()).toBe('Dune');
      w.unmount();
    }
  });

  it('a backdrop strip `play` reaches the page handler and navigates', async () => {
    const { w, router } = await mountWithMode('backdrop');
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaBackdropRow).vm.$emit('play', media({ id: 'lr1' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'lr1' } });
  });

  it('a backdrop strip admin action (`explore-data`) opens the inspector', async () => {
    // Admin state must exist BEFORE mount (the inspector/modals are `v-if`
    // isAdmin), so this mounts inline like the S68 counterpart above; the
    // MetadataMatchModal is stubbed so its auto-search doesn't run.
    localStorage.setItem('phlix.prefs', JSON.stringify({ viewMode: 'backdrop' }));
    setActivePinia(createPinia());
    stubFetch({ media: { items: [media({ id: 'lr1' })], total: 1 } });
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true } as unknown as (typeof auth)['user'];
    const r = makeRouter();
    await r.push('/app/library/lib1');
    await r.isReady();
    const w = mount(LibraryPage, {
      global: {
        plugins: [r],
        provide: { apiBase: '', phlixConfig: { app: 'server', apiBase: '' } },
        stubs: { MetadataMatchModal: true, PosterPicker: true },
      },
    });
    await flushPromises();

    // admin ⇒ the strip forwards `can-match` so the Match quick-action exists
    expect(w.findComponent(MediaBackdropRow).props('canMatch')).toBe(true);

    const inspector = w.findComponent(ItemDataInspector);
    expect(inspector.props('modelValue')).toBe(false);
    w.findComponent(MediaBackdropRow).vm.$emit('explore-data', media({ id: 'lr1' }));
    await flushPromises();
    expect(inspector.props('modelValue')).toBe(true);
    expect((inspector.props('item') as MediaItem).id).toBe('lr1');
    // See the list-row twin above: unmount so the teleported pane does not leak.
    w.unmount();
  });

  /**
   * Switching mode must re-drive the geometry, not just the renderer: the
   * `columns`/`row-height` props are computed from `viewMode`, so a live toggle
   * swaps the strip height in the same flush that swaps the component. (A renderer
   * that changed without its row height — or vice versa — is exactly the
   * layout/windowing desync S67 warned about.)
   */
  it('swaps renderer AND row height when the mode changes at runtime', async () => {
    const { w } = await mountWithMode('list');
    const prefs = usePreferencesStore();
    const grid = w.findComponent({ name: 'MediaGrid' });
    expect(grid.props('rowHeight')).toBe(computeFixedRowHeight(LIST_ROW_HEIGHT));

    prefs.viewMode = 'backdrop';
    await nextTick();
    expect(w.findComponent(MediaBackdropRow).exists()).toBe(true);
    expect(w.findComponent(MediaListRow).exists()).toBe(false);
    expect(grid.props('rowHeight')).toBe(computeFixedRowHeight(BACKDROP_ROW_HEIGHT));
    expect(grid.props('columns')).toBe(1);

    prefs.viewMode = 'grid';
    await nextTick();
    expect(w.findComponent(MediaBackdropRow).exists()).toBe(false);
    expect(grid.props('rowHeight')).toBeUndefined();
    expect(grid.props('columns')).toBeUndefined();
  });
});

/**
 * S70 — the `table` view mode renders `MediaTableRow` through the SAME single
 * MediaGrid mount, and additionally asserts an ARIA `table` structure that spans
 * BOTH sides of the component boundary. The invariants:
 *   1. still exactly one MediaGrid (no second grid / parallel pagination path),
 *   2. the layout travels through the grid's `columns`/`row-height` props with the
 *      TABLE row's own height — so virtualization stays intact (the AC's second
 *      half: "renders correctly AND virtualized"),
 *   3. the `v-else` grid branch is still UNCONDITIONAL (the shared slot-invocation
 *      test in the S68 block covers 'table' + two garbage modes),
 *   4. the branch wires every one of MediaCard's ten host events,
 *   5. the a11y chain is UNBROKEN end to end — `role="table"` here owns a header
 *      `rowgroup` and, through MediaGrid's `grid-role` prop flattening the two
 *      intermediate boxes, the body `rowgroup` and its rows. Asserting the roles
 *      one at a time would pass even if a link in the chain were missing, so the
 *      chain test below walks it by DOM ancestry.
 */
describe('LibraryPage — table view (S70)', () => {
  it('renders MediaTableRow (not the poster card, not a list row) through the ONE grid', async () => {
    const { w } = await mountWithMode('table');
    expect(w.findAllComponents({ name: 'MediaGrid' })).toHaveLength(1);
    expect(w.findComponent(MediaTableRow).exists()).toBe(true);
    expect(w.find('.media-table-row').exists()).toBe(true);
    expect(w.findComponent(MediaListRow).exists()).toBe(false);
    expect(w.findComponent(MediaBackdropRow).exists()).toBe(false);
    // it composes a MediaCard for its poster column with the caption suppressed
    expect(w.find('.media-card').exists()).toBe(true);
    expect(w.find('.media-card__caption').exists()).toBe(false);
    expect(w.find('.media-grid-root').attributes('data-view-mode')).toBe('table');
  });

  it('drives the table layout through the grid props, with the TABLE row height', async () => {
    const { w } = await mountWithMode('table');
    const grid = w.findComponent({ name: 'MediaGrid' });
    expect(grid.props('columns')).toBe(1);
    expect(grid.props('rowHeight')).toBe(computeFixedRowHeight(TABLE_ROW_HEIGHT));
    expect(grid.props('rowHeight')).toBe(TABLE_ROW_HEIGHT + 24);
    // ...and the LITERAL. Both lines above derive their expectation from the
    // constant under test and so cannot detect its VALUE changing; this can.
    expect(grid.props('rowHeight')).toBe(204);
    // NOT computeRowHeight()'s cardWidth * 2:3 + label, which for a full-width row
    // reserves several times too much and desyncs padTop/totalHeight.
    expect(grid.props('rowHeight')).not.toBe(computeFixedRowHeight(BACKDROP_ROW_HEIGHT));
    // ⚠ Deliberately NOT asserted `!== the list row's height`: TABLE_ROW_HEIGHT and
    // LIST_ROW_HEIGHT are EQUAL on purpose (both derive from the 120px poster width
    // that is the audited floor for a composed full-action MediaCard overlay — see
    // TABLE_ROW_POSTER_WIDTH). A `not.toBe(list)` here would be a false claim.
    expect(TABLE_ROW_HEIGHT).toBe(LIST_ROW_HEIGHT);
  });

  it('virtualization stays intact: the grid pins the table row TRACK and one column', async () => {
    const { w } = await mountWithMode('table');
    const style = w.find('.media-grid').attributes('style') ?? '';
    expect(style).toContain('grid-template-columns: repeat(1, minmax(0, 1fr))');
    expect(style).toContain(`grid-auto-rows: ${TABLE_ROW_HEIGHT}px`);
  });

  it('wires ALL TEN host events onto the table row', async () => {
    const { w } = await mountWithMode('table');
    const [row] = slotRenderers(w, media({ id: 'lr1' }));
    expect(row.type).toBe(MediaTableRow);
    const bound = boundListeners(row);
    for (const event of HOST_EVENTS) {
      expect(bound, `table row is missing a \`${event}\` listener`).toContain(handlerKey(event));
    }
  });

  it('hands the row its ABSOLUTE index, not its position in the rendered window', async () => {
    // aria-rowindex is the only thing that survives virtualization; it is derived
    // from the slot's `index`, so the page dropping that binding is the failure
    // this catches (the row would then silently report every item as row 2).
    const { w } = await mountWithMode('table');
    const slot = w.findComponent({ name: 'MediaGrid' }).vm.$slots.card as (p: {
      item: MediaItem;
      index: number;
    }) => VNode[];
    const [row] = slotRenderers(w, media({ id: 'lr1' }));
    expect(row.props?.index).toBe(0);
    const flat = slot({ item: media({ id: 'lr1' }), index: 41 }).flatMap((n) =>
      n.type === Fragment ? ((n.children ?? []) as VNode[]) : [n],
    );
    expect(flat.find((n) => n.type === MediaTableRow)?.props?.index).toBe(41);
  });

  it('emits exactly ONE heading per item, like grid, list and backdrop mode', async () => {
    const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      .map((h) => `.media-grid ${h}`)
      .join(', ');
    for (const mode of ['table', 'backdrop', 'list', 'grid'] as const) {
      const { w } = await mountWithMode(mode);
      const headings = w.findAll(HEADINGS);
      expect(headings, `viewMode="${mode}" must emit ONE heading per item`).toHaveLength(1);
      expect(headings[0].text()).toBe('Dune');
      w.unmount();
    }
  });

  it('renders the column header row OUTSIDE the grid, on the SAME tracks as the rows', async () => {
    const { w } = await mountWithMode('table');
    const head = w.find('.library-table__head-row');
    expect(head.exists()).toBe(true);
    // Outside the virtualized container — inside it the header would be pushed by
    // `translateY(padTop)` and would consume a row slot.
    expect(w.find('.media-grid .library-table__head-row').exists()).toBe(false);
    const headers = head.findAll('[role="columnheader"]');
    expect(headers).toHaveLength(TABLE_COLUMNS.length);
    expect(headers.map((h) => h.text())).toEqual(TABLE_COLUMNS.map((c) => c.label));
    // Literal, so the shared-constant assertion above cannot self-adjust to a
    // silently reshaped column set.
    expect(headers.map((h) => h.text())).toEqual([
      'Poster',
      'Title',
      'Year',
      'Rating',
      'Runtime',
      'Genres',
    ]);
    // The one thing that keeps the two separate grids aligned.
    expect(head.attributes('style')).toContain(TABLE_ROW_TEMPLATE_COLUMNS);
    expect(w.find('.media-table-row').attributes('style')).toContain(TABLE_ROW_TEMPLATE_COLUMNS);
  });

  it('the ARIA table OWNS its rows: table → rowgroup → row, with no generic box between', async () => {
    const { w } = await mountWithMode('table');
    const table = w.find('[role="table"]');
    expect(table.exists()).toBe(true);
    expect(table.attributes('aria-rowcount')).toBe('2'); // 1 item + the header row

    // Walk UP from a rendered row: every ancestor between it and the table must be
    // a rowgroup or presentational, or `table` does not own the row. Asserting the
    // three roles independently would pass with a `generic` div still in the chain,
    // which is precisely the defect MediaGrid's `grid-role` prop exists to fix.
    const rowEl = w.find('.media-table-row').element;
    expect(rowEl.getAttribute('role')).toBe('row');
    const chain: string[] = [];
    for (let el = rowEl.parentElement; el && el !== table.element; el = el.parentElement) {
      chain.push(el.getAttribute('role') ?? 'GENERIC');
    }
    expect(chain, `unowned box between the row and the table: ${chain.join(' < ')}`).toEqual([
      'rowgroup', // .media-grid
      'presentation', // .media-grid-sizer
      'presentation', // .media-grid-root
    ]);

    // The header is the table's OTHER rowgroup, and is row 1.
    const headGroup = w.find('.library-table__head');
    expect(headGroup.attributes('role')).toBe('rowgroup');
    expect(headGroup.element.parentElement).toBe(table.element);
    expect(w.find('.library-table__head-row').attributes('aria-rowindex')).toBe('1');
    // ...and the item row is row 2 — the header's index + 1, not its DOM position.
    expect(w.find('.media-table-row').attributes('aria-rowindex')).toBe('2');
  });

  it('asserts NO table role in any other view mode', async () => {
    for (const mode of ['grid', 'list', 'backdrop', 'sideways-carousel'] as const) {
      const { w } = await mountWithMode(mode);
      expect(w.find('[role="table"]').exists(), `viewMode="${mode}" claimed a table`).toBe(false);
      expect(w.find('.library-table__head').exists()).toBe(false);
      // MediaGrid's own boxes keep their original (absent) roles — the prop must
      // emit no attribute at all when unset, or every other surface changes.
      expect(w.find('.media-grid-root').attributes('role')).toBeUndefined();
      expect(w.find('.media-grid').attributes('role')).toBeUndefined();
      w.unmount();
    }
  });

  /**
   * S191/S193 shape, pinned at the LAYOUT seam rather than only the renderer seam.
   *
   * `tableMode` is consumed in four places — the `#card` `v-else-if`, `gridColumns`,
   * `gridRowHeight` and `tableSemantics` — and the slot-renderer test above only
   * covers the first. Loosening `=== 'table'` to `.includes('table')` at any of the
   * others was mutation-verified to be invisible to the rest of this suite: a
   * SUPERSTRING mode is the only input that separates the two comparisons.
   */
  it('a SUPERSTRING of "table" gets no table layout, no table semantics, no table row', async () => {
    for (const mode of ['not-a-table', 'table-view', 'timetable']) {
      const { w } = await mountWithMode(mode);
      const grid = w.findComponent({ name: 'MediaGrid' });
      expect(grid.props('columns'), `viewMode="${mode}" took the table column count`).toBeUndefined();
      expect(grid.props('rowHeight'), `viewMode="${mode}" took the table row height`).toBeUndefined();
      expect(grid.props('gridRole')).toBeUndefined();
      expect(w.findComponent(MediaTableRow).exists(), `viewMode="${mode}" rendered a table row`).toBe(
        false,
      );
      expect(w.find('[role="table"]').exists()).toBe(false);
      expect(w.find('.library-table__head').exists()).toBe(false);
      // ...and it still renders items, via the unconditional `v-else`.
      expect(w.findComponent(MediaCard).exists()).toBe(true);
      w.unmount();
    }
  });

  it('does NOT claim a table (or draw headers) when there is nothing to put in it', async () => {
    // ARIA `table` requires row/rowgroup children; with no items MediaGrid renders
    // its `role="status"` empty state and there are no rows at all.
    localStorage.setItem('phlix.prefs', JSON.stringify({ viewMode: 'table' }));
    setActivePinia(createPinia());
    stubFetch({ media: { items: [], total: 0 } });
    const { w } = await mountAt('lib1');
    await flushPromises();
    expect(w.findComponent(MediaTableRow).exists()).toBe(false);
    expect(w.find('[role="table"]').exists()).toBe(false);
    expect(w.find('.library-table__head').exists()).toBe(false);
    expect(w.find('.media-grid-root').attributes('role')).toBeUndefined();
    // ...but the LAYOUT props stay applied, so skeletons are already row-sized and
    // the first loaded page does not shift the page.
    expect(w.findComponent({ name: 'MediaGrid' }).props('rowHeight')).toBe(
      computeFixedRowHeight(TABLE_ROW_HEIGHT),
    );
    expect(w.findComponent({ name: 'MediaGrid' }).props('columns')).toBe(1);
  });

  it('a table row `play` reaches the page handler and navigates', async () => {
    const { w, router } = await mountWithMode('table');
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaTableRow).vm.$emit('play', media({ id: 'lr1' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'lr1' } });
  });

  it('a table row admin action (`explore-data`) opens the inspector', async () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ viewMode: 'table' }));
    setActivePinia(createPinia());
    stubFetch({ media: { items: [media({ id: 'lr1' })], total: 1 } });
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true } as unknown as (typeof auth)['user'];
    const r = makeRouter();
    await r.push('/app/library/lib1');
    await r.isReady();
    const w = mount(LibraryPage, {
      global: {
        plugins: [r],
        provide: { apiBase: '', phlixConfig: { app: 'server', apiBase: '' } },
        stubs: { MetadataMatchModal: true, PosterPicker: true },
      },
    });
    await flushPromises();

    expect(w.findComponent(MediaTableRow).props('canMatch')).toBe(true);

    const inspector = w.findComponent(ItemDataInspector);
    expect(inspector.props('modelValue')).toBe(false);
    w.findComponent(MediaTableRow).vm.$emit('explore-data', media({ id: 'lr1' }));
    await flushPromises();
    expect(inspector.props('modelValue')).toBe(true);
    expect((inspector.props('item') as MediaItem).id).toBe('lr1');
    // See the list-row twin above: unmount so the teleported pane does not leak.
    w.unmount();
  });

  it('swaps renderer, row height AND table semantics when the mode changes at runtime', async () => {
    const { w } = await mountWithMode('list');
    const prefs = usePreferencesStore();
    const grid = w.findComponent({ name: 'MediaGrid' });
    expect(w.find('[role="table"]').exists()).toBe(false);

    prefs.viewMode = 'table';
    await nextTick();
    expect(w.findComponent(MediaTableRow).exists()).toBe(true);
    expect(w.findComponent(MediaListRow).exists()).toBe(false);
    expect(grid.props('rowHeight')).toBe(computeFixedRowHeight(TABLE_ROW_HEIGHT));
    expect(grid.props('columns')).toBe(1);
    expect(grid.props('gridRole')).toBe('rowgroup');
    expect(w.find('[role="table"]').exists()).toBe(true);

    prefs.viewMode = 'grid';
    await nextTick();
    expect(w.findComponent(MediaTableRow).exists()).toBe(false);
    expect(grid.props('rowHeight')).toBeUndefined();
    expect(grid.props('columns')).toBeUndefined();
    expect(grid.props('gridRole')).toBeUndefined();
    expect(w.find('[role="table"]').exists()).toBe(false);
  });
});

/**
 * S69 review, finding 1 — WHICH wash the backdrop view actually paints on THIS
 * surface, pinned at the page level.
 *
 * `MediaBackdropRow` has two wash states: the wide backdrop `<img>` when the item
 * carries backdrop data, and a poster-derived colour wash when it does not. The
 * component suite proves both work, but it does so from a hand-built fixture — and
 * the original eight page-level S69 tests all ran the FALLBACK branch (the page's
 * `media()` helper has no backdrop fields) without one of them asserting which branch
 * had been taken. Both halves of that were the defect.
 *
 * What the list shape carries, as of the companion server step S101, is exactly two
 * keys: `backdrop_url` (a TMDB `/w780` URL) and `backdrop_srcset` (`w780` + `w1280`,
 * never `/original`). Both are `null` for the seven backdrop-less types (`track`,
 * `music`, `album`, `artist`, `photo`, `book`, `audiobook`) and for unmatched titles,
 * and absent entirely against a pre-S101 server — so BOTH states are live traffic,
 * not one real state plus a theoretical one.
 *
 * These tests pin both from the page, so that:
 *   - the behaviour is stated rather than accidental,
 *   - the backdrop-bearing fixture is the REAL server shape rather than an invented
 *     one, and
 *   - a renderer that collapsed to a single branch fails, whichever branch it picked.
 */
describe('LibraryPage — which backdrop wash the LIST payload renders (S69)', () => {
  /** A real list row with no backdrop: both keys present and null. */
  function noBackdropItem(): MediaItem {
    const item = media({ id: 'lr1', name: 'Dune', poster_url: 'https://img/dune.jpg' });
    expect(item.backdrop_url, 'null, not missing — guard on null').toBeNull();
    expect(item.backdrop_srcset).toBeNull();
    return item;
  }

  /** A real list row WITH a backdrop, in the exact shape S101 emits. */
  function backdropBearingItem(): MediaItem {
    return media({
      id: 'lr1',
      name: 'Dune',
      poster_url: 'https://img/dune.jpg',
      backdrop_url: 'https://img/dune-w780.jpg',
      backdrop_srcset: 'https://img/dune-w780.jpg 780w, https://img/dune-w1280.jpg 1280w',
    });
  }

  it('a backdrop-less row renders the AMBIENT wash, never an <img>', async () => {
    const { w } = await mountWithMode('backdrop', [noBackdropItem()]);
    expect(w.findComponent(MediaBackdropRow).exists()).toBe(true);
    expect(w.find('.media-backdrop-row__ambient').exists()).toBe(true);
    expect(
      w.find('.media-backdrop-row__img').exists(),
      'no backdrop on the row means no wide-backdrop <img> can render',
    ).toBe(false);
    expect(w.find('.media-backdrop-row__wash').attributes('data-wash')).toBe('ambient');
  });

  it('a backdrop-bearing row renders the wide backdrop <img> and drops the ambient', async () => {
    const { w } = await mountWithMode('backdrop', [backdropBearingItem()]);
    const img = w.find('.media-backdrop-row__img');
    expect(img.exists()).toBe(true);
    // the /w780 src and the two-candidate srcset, exactly as the shaper sends them
    expect(img.attributes('src')).toBe('https://img/dune-w780.jpg');
    expect(img.attributes('srcset')).toContain('1280w');
    expect(img.attributes('srcset')).not.toContain('original');
    expect(w.find('.media-backdrop-row__ambient').exists()).toBe(false);
    expect(w.find('.media-backdrop-row__wash').attributes('data-wash')).toBe('backdrop');
  });

  /**
   * The discriminator. Either branch being hard-wired fails this: "always ambient"
   * breaks the second column, "always <img>" breaks the first. A test that only ever
   * mounted one payload (which is what the eight original S69 page tests did) cannot
   * fail either way.
   */
  it('takes DIFFERENT branches for the two payloads — neither branch is hard-wired', async () => {
    const states: Array<{ img: boolean; ambient: boolean; wash: string | undefined }> = [];
    for (const item of [noBackdropItem(), backdropBearingItem()]) {
      const { w } = await mountWithMode('backdrop', [item]);
      states.push({
        img: w.find('.media-backdrop-row__img').exists(),
        ambient: w.find('.media-backdrop-row__ambient').exists(),
        wash: w.find('.media-backdrop-row__wash').attributes('data-wash'),
      });
      w.unmount();
    }
    expect(states.map((s) => s.img)).toEqual([false, true]);
    expect(states.map((s) => s.ambient)).toEqual([true, false]);
    expect(states.map((s) => s.wash)).toEqual(['ambient', 'backdrop']);
  });

  it('renders no wash layer at all for a row with no backdrop and no poster either', async () => {
    const { w } = await mountWithMode('backdrop', [media({ id: 'lr1', name: 'Dune' })]);
    expect(w.find('.media-backdrop-row').exists()).toBe(true);
    expect(w.find('.media-backdrop-row__wash').exists()).toBe(false);
    // the strip is still a working item: title link + the composed card's overlay
    expect(w.find('.media-backdrop-row__title').text()).toBe('Dune');
    expect(w.find('.media-card').exists()).toBe(true);
  });
});

// S15 — the admin ⋯-menu "Edit metadata" / "Explore item data" actions must
// produce visible UI on the Library grid: the match modal / the read-only
// inspector. (The MetadataMatchModal is stubbed so its auto-search doesn't run.)
describe('LibraryPage — Edit metadata / Explore item data (S15)', () => {
  const MatchModalStub = {
    name: 'MetadataMatchModal',
    props: ['modelValue', 'item'],
    template:
      '<div class="match-modal-stub" :data-open="String(modelValue)" :data-item-id="item ? item.id : \'\'" />',
  };

  async function mountAdmin() {
    stubFetch({ media: { items: [media({ id: 'm1' })], total: 1 } });
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true } as unknown as (typeof auth)['user'];
    const r = makeRouter();
    await r.push('/app/library/lib1');
    await r.isReady();
    const w = mount(LibraryPage, {
      global: {
        plugins: [r],
        provide: { apiBase: '', phlixConfig: { app: 'server', apiBase: '' } },
        stubs: { MetadataMatchModal: MatchModalStub, PosterPicker: true },
      },
    });
    await flushPromises();
    return w;
  }

  it('@edit-metadata from the grid → opens the match modal with the item', async () => {
    const w = await mountAdmin();
    const grid = w.findComponent({ name: 'MediaGrid' });
    expect(w.find('.match-modal-stub').attributes('data-open')).toBe('false');

    grid.vm.$emit('edit-metadata', media({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    expect(w.find('.match-modal-stub').attributes('data-open')).toBe('true');
    expect(w.find('.match-modal-stub').attributes('data-item-id')).toBe('m1');
  });

  it('@explore-data from the grid → opens the read-only ItemDataInspector', async () => {
    const w = await mountAdmin();
    const grid = w.findComponent({ name: 'MediaGrid' });
    const inspector = w.findComponent(ItemDataInspector);
    expect(inspector.exists()).toBe(true);
    expect(inspector.props('modelValue')).toBe(false);

    // Non-inertness control: nothing is teleported before the action, so the
    // post-action DOM assertion below cannot be satisfied by a leftover mount.
    expect(document.body.querySelectorAll('[data-test="item-json"]').length).toBe(0);

    grid.vm.$emit('explore-data', media({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    expect(inspector.props('modelValue')).toBe(true);
    expect((inspector.props('item') as MediaItem).id).toBe('m1');
    // The AC is "produces VISIBLE UI", not "sets a prop": assert the inspector's
    // teleported JSON pane actually rendered the item. Measured 2026-08-02 —
    // emptying that <pre> left this host's prop-only assertions GREEN.
    const panes = document.body.querySelectorAll('[data-test="item-json"]');
    expect(panes.length).toBe(1);
    expect(panes[0].textContent).toContain('"id": "m1"');
  });
});

/**
 * S08 — the Library page's top-spacing CSS contract.
 *
 * jsdom does not apply an SFC's compiled `<style>`, so none of S08's three
 * spacing decisions is visible to a mounted-component test. Measured 2026-08-01:
 * reverting all of them at once — `.library-page` back to `padding: var(--space-6)`,
 * `.library-header` back to `margin-bottom: var(--space-4)`, and deleting the
 * FilterBar gap — left the full 4,207-test suite GREEN. The step's only
 * user-visible effect was completely unpinned.
 *
 * Follows the `AppLayout.test.ts` CSS-contract convention: read the raw SFC and
 * assert the declarations. The FilterBar half lives in `FilterBar.test.ts`
 * (the margin is declared there, on the shared component).
 */
describe('LibraryPage — top-spacing CSS contract (S08/S09)', () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), './LibraryPage.vue'), 'utf8');

  /** The `.library-page { … }` declaration body. */
  const pageBlock = /(?<![\w.-])\.library-page\s*\{([^}]*)\}/.exec(src);

  it('gives `.library-page` no outer padding of its own (no double-count with .shell__main)', () => {
    // `.shell__main` already supplies `var(--space-6) var(--space-5)` — pinned in
    // AppLayout.test.ts. Stacking a second gutter here is exactly the bug S08/S09
    // fixed, so the page must declare a literal zero, not merely omit the property
    // (an omission would let a later shorthand reintroduce one unnoticed).
    expect(pageBlock).not.toBeNull();
    expect(pageBlock![1]).toMatch(/padding:\s*0;/);
  });

  it('does not smuggle the gutter back in as a margin or inset', () => {
    expect(pageBlock![1]).not.toMatch(/margin:\s*var\(--space/);
    expect(pageBlock![1]).not.toMatch(/padding-(top|block|block-start):/);
  });

  it('keeps `.library-header` on the tightened --space-3 bottom margin', () => {
    const header = /(?<![\w.-])\.library-header\s*\{([^}]*)\}/.exec(src);
    expect(header).not.toBeNull();
    expect(header![1]).toMatch(/margin-bottom:\s*var\(--space-3\);/);
  });

  it('fixes it PAGE-SCOPED, never by shrinking the shared shell gutter', () => {
    // S09's out-of-scope line: Settings/Admin/Music/Search must not move. The
    // complement — `.shell__main` still declaring its own gutter — is pinned in
    // AppLayout.test.ts. Comments are stripped because the SFC legitimately
    // NAMES `.shell__main` in prose to explain why the page zeroes its padding.
    const selectors = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
      .map((m) => m[1].replace(/\/\*[\s\S]*?\*\//g, ''))
      .flatMap((block) => [...block.matchAll(/([^{}]+)\{/g)].map((m) => m[1].trim()))
      .filter((s) => s.length > 0 && !s.startsWith('@'));
    expect(selectors.length).toBeGreaterThan(0);
    expect(selectors.filter((s) => s.includes('shell__main'))).toEqual([]);
  });
});
