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
import SearchPage from './SearchPage.vue';
import MediaGrid from '../components/MediaGrid.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import ItemDataInspector from '../components/ItemDataInspector.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import { useAuthStore } from '../stores/useAuthStore';
import type { MediaItem } from '../types/media-item';
import { isRoute } from '../test/route-match';

/**
 * The exact search route `SearchPage.vue:70` requests.
 *
 * S193: matched with {@link isRoute} — the pathname (query stripped) must END WITH
 * this — because `u.includes('/api/v1/media/search')` also matches
 * `/api/v1/media/search-MUTATED` (and `/api/v1/media/search/by-marker`), so the stub
 * answered routes it does not model and the endpoint assertion agreed. `endsWith`,
 * not `===`: the media base legitimately prefixes the path on the hub.
 */
const SEARCH_PATH = '/api/v1/media/search';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: null,
    genres: ['Sci-Fi'],
    year: 2024,
    rating: null,
    runtime: 166,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  } as MediaItem;
}

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function stubFetch(opts: { items?: MediaItem[]; error?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (isRoute(u, SEARCH_PATH)) {
      if (opts.error) return Promise.reject(new Error('search boom'));
      const items = opts.items ?? [media()];
      return Promise.resolve(jsonResponse({ items, query: 'q', total: items.length }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/search', name: 'search', component: stub },
      { path: '/app/media/:id', name: 'media', component: stub },
      { path: '/app/player/:id', name: 'player', component: stub },
    ],
  });
}

async function mountAt(opts: { query?: Record<string, string>; router?: Router } = {}): Promise<VueWrapper> {
  const router = opts.router ?? makeRouter();
  await router.push({ path: '/app/search', query: opts.query ?? {} });
  await router.isReady();
  return mount(SearchPage, {
    global: {
      plugins: [router],
      provide: { apiBase: '' },
    },
  });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  vi.stubGlobal('IntersectionObserver', undefined);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('SearchPage — states', () => {
  it('shows the search prompt when there is no query', async () => {
    stubFetch();
    const w = await mountAt();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('Search your library');
    expect(w.findComponent(MediaGrid).exists()).toBe(false);
    w.unmount();
  });

  it('runs the search from the ?q= URL param on mount and renders the results grid', async () => {
    const fetchFn = stubFetch({ items: [media({ id: 'x', name: 'Arrival' })] });
    const w = await mountAt({ query: { q: 'arrival' } });
    await flushPromises();
    const calledUrl = String(fetchFn.mock.calls[0][0]);
    expect(isRoute(calledUrl, SEARCH_PATH)).toBe(true);
    expect(calledUrl).toContain('q=arrival');
    const grid = w.findComponent(MediaGrid);
    expect(grid.exists()).toBe(true);
    expect((grid.props('items') as MediaItem[]).length).toBe(1);
    w.unmount();
  });

  it('shows the no-results empty state when the query returns nothing', async () => {
    stubFetch({ items: [] });
    const w = await mountAt({ query: { q: 'zzzzz' } });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toContain('No results for');
    w.unmount();
  });

  it('shows the error empty state when the search request fails', async () => {
    stubFetch({ error: true });
    const w = await mountAt({ query: { q: 'boom' } });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('Search failed');
    w.unmount();
  });
});

describe('SearchPage — debounced typing', () => {
  it('debounces input, syncs ?q=, and calls the search API', async () => {
    vi.useFakeTimers();
    const router = makeRouter();
    const fetchFn = stubFetch({ items: [media({ name: 'Interstellar' })] });
    const replace = vi.spyOn(router, 'replace');
    const w = await mountAt({ router });
    await flushPromises();

    const input = w.find('input[type="search"]');
    await input.setValue('inter');
    // Debounced — nothing fired yet.
    expect(fetchFn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(300);
    await flushPromises();

    expect(replace).toHaveBeenCalledWith({ query: { q: 'inter' } });
    expect(fetchFn).toHaveBeenCalled();
    expect(String(fetchFn.mock.calls[0][0])).toContain('q=inter');
    w.unmount();
  });

  it('clears results and the URL query when the input is emptied', async () => {
    vi.useFakeTimers();
    const router = makeRouter();
    stubFetch({ items: [media()] });
    const replace = vi.spyOn(router, 'replace');
    const w = await mountAt({ query: { q: 'dune' }, router });
    await flushPromises();
    expect(w.findComponent(MediaGrid).exists()).toBe(true);

    const input = w.find('input[type="search"]');
    await input.setValue('');
    await vi.advanceTimersByTimeAsync(300);
    await flushPromises();

    expect(replace).toHaveBeenCalledWith({ query: {} });
    expect(w.findComponent(MediaGrid).exists()).toBe(false);
    // Back to the search prompt.
    expect(w.findComponent(EmptyState).props('title')).toBe('Search your library');
    w.unmount();
  });
});

// S324 — the admin ⋯-menu "Edit metadata" / "Explore item data" actions must
// produce visible UI on the Search results grid too. This page was the one
// MediaCard host S15's In-scope list omitted: the grid rendered with NO
// @edit-metadata / @explore-data listeners and NEITHER modal mounted, so an
// admin's two ⋯-menu actions were dead on /app/search (the emit chain in
// MediaCard → MediaGrid is live and un-gated, so the menu items showed anyway).
describe('SearchPage — Edit metadata / Explore item data (S324)', () => {
  async function mountAdmin(): Promise<VueWrapper> {
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true } as unknown as (typeof auth)['user'];
    stubFetch({ items: [media({ id: 'm1', name: 'Dune' })] });
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    return w;
  }

  it('@edit-metadata from the grid → opens the MetadataMatchModal with the item', async () => {
    const w = await mountAdmin();
    const modal = w.findComponent(MetadataMatchModal);
    expect(modal.exists()).toBe(true);
    expect(modal.props('modelValue')).toBe(false);

    w.findComponent(MediaGrid).vm.$emit('edit-metadata', media({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    expect(modal.props('modelValue')).toBe(true);
    expect((modal.props('item') as MediaItem).id).toBe('m1');
    w.unmount();
  });

  it('@explore-data from the grid → opens the read-only ItemDataInspector', async () => {
    const w = await mountAdmin();
    const inspector = w.findComponent(ItemDataInspector);
    expect(inspector.exists()).toBe(true);
    expect(inspector.props('modelValue')).toBe(false);

    // Non-inertness control: nothing is teleported before the action, so the
    // post-action DOM assertion below cannot be satisfied by a leftover mount.
    expect(document.body.querySelectorAll('[data-test="item-json"]').length).toBe(0);

    w.findComponent(MediaGrid).vm.$emit('explore-data', media({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    expect(inspector.props('modelValue')).toBe(true);
    expect((inspector.props('item') as MediaItem).id).toBe('m1');
    // The AC is "produces VISIBLE UI", not "sets a prop": assert the inspector's
    // teleported JSON pane actually rendered the item. Measured 2026-08-02 —
    // emptying that <pre> left this host's prop-only assertions GREEN.
    const panes = document.body.querySelectorAll('[data-test="item-json"]');
    expect(panes.length).toBe(1);
    expect(panes[0].textContent).toContain('"id": "m1"');
    w.unmount();
  });

  it('mounts neither admin modal for a non-admin user', async () => {
    const auth = useAuthStore();
    auth.user = { id: 'user', is_admin: false } as unknown as (typeof auth)['user'];
    stubFetch({ items: [media()] });
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    expect(w.findComponent(MediaGrid).exists()).toBe(true);
    // The modals are admin-gated (v-if="auth.isAdmin"), so a non-admin never
    // even mounts them — and with no modal to receive them, the grid's
    // @edit-metadata / @explore-data events are inert. The admin "Match" quick
    // action is gated the same way on the grid (canMatch = auth.isAdmin).
    expect(w.findComponent(MetadataMatchModal).exists()).toBe(false);
    expect(w.findComponent(ItemDataInspector).exists()).toBe(false);
    expect(w.findComponent(MediaGrid).props('canMatch')).toBe(false);
    w.unmount();
  });
});
