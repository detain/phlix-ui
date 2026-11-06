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
import PosterPicker from '../components/PosterPicker.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { MediaItem } from '../types/media-item';
import { isRoute } from '../test/route-match';
import { ERROR_MESSAGES, ERROR_TITLES } from '../i18n/errors';
import { DEFAULT_MESSAGES } from '../i18n/messages';

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

function stubFetch(opts: { items?: MediaItem[]; total?: number; error?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (isRoute(u, SEARCH_PATH)) {
      if (opts.error) return Promise.reject(new Error('search boom'));
      const items = opts.items ?? [media()];
      return Promise.resolve(jsonResponse({ items, query: 'q', total: opts.total ?? items.length }));
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

async function mountAt(opts: {
  query?: Record<string, string>;
  router?: Router;
  config?: Record<string, unknown>;
} = {}): Promise<VueWrapper> {
  const router = opts.router ?? makeRouter();
  await router.push({ path: '/app/search', query: opts.query ?? {} });
  await router.isReady();
  return mount(SearchPage, {
    global: {
      plugins: [router],
      provide: { apiBase: '', ...(opts.config ? { phlixConfig: opts.config } : {}) },
    },
  });
}

/** A non-2xx JSON response — the exact shape `ApiClient.handleResponse` throws an `ApiError` from. */
function jsonError(status: number, body: unknown): Response {
  return {
    ok: false,
    status,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function stubFetchErrorBody(status: number, body: unknown) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (isRoute(u, SEARCH_PATH)) return Promise.resolve(jsonError(status, body));
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
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

// ui__webux M5 — the wire says `total` matches; the page holds a capped
// slice. Before the cure the grid was bound to `items.length` and the list
// read like the complete answer: 25-of-400 rendered as "25 results".
describe('SearchPage — server total vs capped page (ui__webux M5)', () => {
  it('binds the server total to the grid, not the loaded page length', async () => {
    stubFetch({ items: [media({ id: 'a' }), media({ id: 'b' })], total: 25 });
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    expect(w.findComponent(MediaGrid).props('total')).toBe(25);
    w.unmount();
  });

  it('says the cap out loud when the page holds only part of the matches', async () => {
    stubFetch({ items: [media({ id: 'a' }), media({ id: 'b' })], total: 25 });
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    expect(w.find('.search-cap-notice').text()).toBe('Showing 2 of 25 results');
    w.unmount();
  });

  it('stays silent when the page already holds every match', async () => {
    stubFetch({ items: [media()], total: 1 });
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    expect(w.find('.search-cap-notice').exists()).toBe(false);
    expect(w.findComponent(MediaGrid).props('total')).toBe(1);
    w.unmount();
  });

  it('degrades to null total when the wire carries no numeric total', async () => {
    // The endpoint TYPE promises `total`; a stale proxy could omit it. Nothing
    // may render NaN and the grid falls back to its loaded-count sizing.
    const fn = vi.fn((url: unknown) => {
      const u = typeof url === 'string' ? url : '';
      if (isRoute(u, SEARCH_PATH)) {
        return Promise.resolve(jsonResponse({ items: [media()], query: 'q' }));
      }
      return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
    });
    vi.stubGlobal('fetch', fn);
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    expect(w.find('.search-cap-notice').exists()).toBe(false);
    expect(w.findComponent(MediaGrid).props('total')).toBeNull();
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

  it('@refresh from the grid (⋯-menu "Match metadata") → opens the MetadataMatchModal', async () => {
    const w = await mountAdmin();
    const modal = w.findComponent(MetadataMatchModal);
    expect(modal.exists()).toBe(true);
    expect(modal.props('modelValue')).toBe(false);

    w.findComponent(MediaGrid).vm.$emit('refresh', media({ id: 'm1', name: 'Dune' }));
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

// ui__webux M6 — the error path must flow through the same classification
// layer Browse uses (`searchErrors.ts` → contracts error catalog), not dump
// raw wire text into the card. A 503 from the hub relay carries the wire code
// in the `{error, code}` envelope; the card shows the localized title + body
// and never the SQLSTATE-style debug text the proxy passes through.
describe('SearchPage — error classification (ui__webux M6)', () => {
  it('localizes a code-carrying ApiError through the error catalog', async () => {
    stubFetchErrorBody(503, {
      error: 'SQLSTATE[HY000] [2002] Connection refused',
      code: 'server.offline',
    });
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe(ERROR_TITLES.en['server.offline']);
    expect(empty.props('description')).toBe(ERROR_MESSAGES.en['server.offline']);
    w.unmount();
  });

  it('honors the app-configured locale on the error card', async () => {
    stubFetchErrorBody(503, {
      error: 'SQLSTATE[HY000] [2002] Connection refused',
      code: 'server.no_tunnel',
    });
    const w = await mountAt({ query: { q: 'dune' }, config: { locale: 'de' } });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.props('title')).toBe(ERROR_TITLES.de['server.no_tunnel']);
    expect(empty.props('description')).toBe(ERROR_MESSAGES.de['server.no_tunnel']);
    w.unmount();
  });

  it('keeps the generic title + own message for code-less failures (no behavior change)', async () => {
    stubFetch({ error: true });
    const w = await mountAt({ query: { q: 'boom' } });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.props('title')).toBe('Search failed');
    expect(empty.props('description')).toBe('search boom');
    w.unmount();
  });

  it('shows only ONE EmptyState card while an error is set (no-results card must not co-render)', async () => {
    // Pre-existing law: the v-else-if chain + the error-null guard on
    // showNoResults keep the cards mutually exclusive. Pinned (not cured) so
    // the classification rework cannot silently regress it.
    stubFetchErrorBody(500, { error: 'boom', code: 'something.else' });
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    expect(w.findAllComponents(EmptyState)).toHaveLength(1);
    w.unmount();
  });
});

// ui__webux m27 — the primary search field was named only by its placeholder.
// A placeholder is a hint, not an accessible name: assistive tech announced
// the input as unlabelled. The name now flows from the message catalog (all
// seven locales carry the key), so the pin checks the WIRING; the English
// wording is the catalog's own value, not a second copy of it.
describe('SearchPage — input accessible name (ui__webux m27)', () => {
  it('gives the search input an accessible name from the catalog', async () => {
    stubFetch();
    const w = await mountAt();
    await flushPromises();
    const input = w.find('input[type="search"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('aria-label'), 'accessible name exists').toBeTruthy();
    expect(input.attributes('aria-label')).toBe(DEFAULT_MESSAGES.search.inputLabel);
    w.unmount();
  });
});

// CU-089 (ui__enduser #1): the results grid carried only the admin metadata
// bindings — Play, details, watchlist and watched were DEAD on the one surface
// members actually use to find something to watch. These pins exercise the
// BrowsePage card-action protocol now mirrored here. RED AT PARENT: the emits
// below had no listener — findComponent(MediaGrid).vm.$emit('play', …) simply
// evaporated and the route stayed /app/search.
describe('SearchPage — card actions reach the page (CU-089)', () => {
  it('Play on a movie result navigates to the player route', async () => {
    stubFetch();
    const router = makeRouter();
    const w = await mountAt({ query: { q: 'dune' }, router });
    await flushPromises();
    w.findComponent(MediaGrid).vm.$emit('play', media({ id: 'm1' }));
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/app/player/m1');
    w.unmount();
  });

  it('Info on a result navigates to the media detail route', async () => {
    stubFetch();
    const router = makeRouter();
    const w = await mountAt({ query: { q: 'dune' }, router });
    await flushPromises();
    w.findComponent(MediaGrid).vm.$emit('info', media({ id: 'm1' }));
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/app/media/m1');
    w.unmount();
  });

  it('Info degrades to a toast on hosts without a media route', async () => {
    stubFetch();
    // A consumer mounting the library without the optional detail route (the
    // onInfo contract): the member gets the localized reason, not silence.
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/app', name: 'browse', component: stub },
        { path: '/app/search', name: 'search', component: stub },
        { path: '/app/player/:id', name: 'player', component: stub },
      ],
    });
    const w = await mountAt({ query: { q: 'dune' }, router });
    await flushPromises();
    const toasts = useToastStore();
    w.findComponent(MediaGrid).vm.$emit('info', media({ id: 'm1', name: 'Dune' }));
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'info' && t.message.includes('Dune'),
      ),
    ).toBe(true);
    w.unmount();
  });

  it('watchlist re-emit toasts the persisted state WITHOUT a second toggle', async () => {
    stubFetch();
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    const userItemData = useUserItemDataStore();
    const toasts = useToastStore();
    // The card ALREADY toggled favorite ON (Step 17.3) before re-emitting.
    userItemData.hydrate(media({ id: 'm1', user_data: { favorite: true, rating: null } }));
    w.findComponent(MediaGrid).vm.$emit('watchlist', media({ id: 'm1', name: 'Dune' }));
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'success' && t.message.includes('Dune') && /my list/i.test(t.message),
      ),
    ).toBe(true);
    // No double-flip: the store still reads favorited after the handler ran.
    expect(userItemData.isFavorite('m1')).toBe(true);
    w.unmount();
  });

  it('mark-watched re-emit reports the resulting watched state', async () => {
    stubFetch();
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    const userItemData = useUserItemDataStore();
    const toasts = useToastStore();
    userItemData.hydrate(media({ id: 'm1', user_data: { favorite: false, watched: true, rating: null } }));
    w.findComponent(MediaGrid).vm.$emit('mark-watched', media({ id: 'm1', name: 'Dune' }));
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'success' && t.message === 'Marked “Dune” as watched.',
      ),
    ).toBe(true);
    w.unmount();
  });

  it('admin: Choose poster arms the PosterPicker modal for the picked item', async () => {
    stubFetch();
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true } as unknown as (typeof auth)['user'];
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    w.findComponent(MediaGrid).vm.$emit('choose-poster', media({ id: 'm1' }));
    await flushPromises();
    const picker = w.findComponent(PosterPicker);
    expect(picker.exists()).toBe(true);
    expect(picker.props('item')?.id).toBe('m1');
    w.unmount();
  });

  it('admin: Remove arms the confirm dialog and deleting drops the row', async () => {
    const fetchFn = vi.fn((url: unknown, init?: { method?: string }) => {
      const u = typeof url === 'string' ? url : '';
      if (init?.method === 'DELETE' && isRoute(u, '/api/v1/media/m1')) {
        return Promise.resolve(jsonResponse({ id: 'm1' }));
      }
      if (isRoute(u, SEARCH_PATH)) {
        return Promise.resolve(jsonResponse({ items: [media({ id: 'm1' })], query: 'q', total: 1 }));
      }
      return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
    });
    vi.stubGlobal('fetch', fetchFn);
    const auth = useAuthStore();
    auth.user = { id: 'admin', is_admin: true } as unknown as (typeof auth)['user'];
    const w = await mountAt({ query: { q: 'dune' } });
    await flushPromises();
    w.findComponent(MediaGrid).vm.$emit('remove', media({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    const dialog = w.findComponent(ConfirmDialog);
    expect(dialog.props('open')).toBe(true);
    expect(String(dialog.props('message'))).toContain('Remove “Dune” from the library?');
    dialog.vm.$emit('confirm');
    await flushPromises();
    expect(
      fetchFn.mock.calls.some(([u, i]) => (i as { method?: string })?.method === 'DELETE' && isRoute(u, '/api/v1/media/m1')),
    ).toBe(true);
    // The row leaves: with the last result gone the grid itself unmounts back
    // to the no-results state, and a success toast names the removed title.
    expect(w.findComponent(MediaGrid).exists()).toBe(false);
    expect(
      useToastStore().toasts.some((t) => t.tone === 'success' && t.message.includes('Dune')),
    ).toBe(true);
    w.unmount();
  });
});
