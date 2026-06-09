import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import LibraryPage from './LibraryPage.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import { useMediaStore } from '../stores/useMediaStore';
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

  it('forwards load-more to the store', async () => {
    stubFetch({ media: { items: [media()], total: 50 } });
    const { w } = await mountAt('lib1');
    await flushPromises();
    const store = useMediaStore();
    const loadMore = vi.spyOn(store, 'loadMore');
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('load-more');
    expect(loadMore).toHaveBeenCalled();
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

  it('routes Play to the player route', async () => {
    stubFetch({ media: { items: [media({ id: 'p1' })], total: 1 } });
    const { w, router } = await mountAt('lib1');
    const push = vi.spyOn(router, 'push');
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('play', media({ id: 'p1' }));
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'p1' } });
  });

  it('routes Play on a SERIES to its detail page, not the (unplayable) player', async () => {
    stubFetch({ media: { items: [media({ id: 's1', type: 'series' })], total: 1 } });
    const { w, router } = await mountAt('lib1');
    const push = vi.spyOn(router, 'push');
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('play', media({ id: 's1', type: 'series' }));
    expect(push).toHaveBeenCalledWith({ name: 'media', params: { id: 's1' } });
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 's1' } });
  });
});
