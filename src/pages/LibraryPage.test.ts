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
import LibraryPage from './LibraryPage.vue';
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
import {
  BACKDROP_ROW_HEIGHT,
  computeFixedRowHeight,
  LIST_ROW_HEIGHT,
} from '../components/virtual-grid';
import type { MediaItem } from '../types/media-item';
import type { LibrarySummary } from '../api/libraries';

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

const LIBS: LibrarySummary[] = [
  { id: 'lib1', name: 'Movies', type: 'movie' },
  { id: 'lib2', name: 'Anime', type: 'series' },
];

function stubFetch(opts: { media?: { items: MediaItem[]; total: number }; mediaError?: boolean } = {}) {
  const mediaBody = opts.media ?? { items: [media()], total: 3 };
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/libraries')) {
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
    if (u.includes('/api/v1/libraries')) {
      return Promise.resolve(jsonResponse({ libraries: LIBS }));
    }
    if (u.includes('parentId=')) {
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
    if (u.includes('/api/v1/libraries')) {
      return Promise.resolve(jsonResponse({ libraries: LIBS }));
    }
    if (u.includes('parentId=')) {
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
    const mediaCall = fn.mock.calls.find(([u]) => typeof u === 'string' && (u as string).includes('/api/v1/media'));
    expect(mediaCall).toBeTruthy();
    expect(mediaCall![0]).toContain('libraryId=lib1');
  });

  it('requests top-level items only (so a series library shows shows, not episodes)', async () => {
    const fn = stubFetch();
    await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    expect(store.topLevel).toBe(true);
    const mediaCall = fn.mock.calls.find(([u]) => typeof u === 'string' && (u as string).includes('/api/v1/media'));
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
    const mediaCall = fn.mock.calls.find(([u]) => typeof u === 'string' && (u as string).includes('/api/v1/media'));
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

async function mountWithMode(mode: string) {
  localStorage.setItem('phlix.prefs', JSON.stringify({ viewMode: mode }));
  setActivePinia(createPinia());
  stubFetch({ media: { items: [media({ id: 'lr1', name: 'Dune' })], total: 1 } });
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
    // One entry per IMPLEMENTED renderer; every other mode (including S70's
    // not-yet-built 'table' and outright garbage) must reach the `v-else` card.
    const RENDERERS: Record<string, unknown> = { list: MediaListRow, backdrop: MediaBackdropRow };
    const item = media({ id: 'lr1' });
    for (const mode of ['list', 'grid', 'backdrop', 'table', 'sideways-carousel', '']) {
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

    grid.vm.$emit('explore-data', media({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    expect(inspector.props('modelValue')).toBe(true);
    expect((inspector.props('item') as MediaItem).id).toBe('m1');
  });
});
