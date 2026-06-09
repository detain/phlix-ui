import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import BrowsePage from './BrowsePage.vue';
import MediaRow from '../components/MediaRow.vue';
import HomeRow from '../components/HomeRow.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import { useToastStore } from '../stores/useToastStore';
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
 * Stub fetch, branching by URL: `/api/v1/libraries` → `{ libraries }`, any
 * `/api/v1/media` rail fetch → `{ items, total }`. `libraryError` rejects the
 * library-list request specifically.
 */
function stubFetch(
  opts: {
    libraries?: LibrarySummary[];
    media?: { items: MediaItem[]; total: number };
    libraryError?: boolean;
  } = {},
) {
  const libraries = opts.libraries ?? ONE_LIBRARY;
  const mediaBody = opts.media ?? { items: [], total: 0 };
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/libraries')) {
      if (opts.libraryError) return Promise.reject(new Error('library list offline'));
      return Promise.resolve(jsonResponse({ libraries }));
    }
    return Promise.resolve(jsonResponse(mediaBody));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
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
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function continueRow(w: ReturnType<typeof mountPage>) {
  return w.findAllComponents(MediaRow).find((c) => c.props('title') === 'Continue Watching');
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
});

describe('BrowsePage — Continue Watching', () => {
  it('derives the rail from the resume map resolved against library-rail items', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ a: 600 }));
    stubFetch({
      libraries: ONE_LIBRARY,
      media: { items: [media({ id: 'a', name: 'Resumed' }), media({ id: 'b' })], total: 2 },
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

describe('BrowsePage — card actions', () => {
  it('routes Play to the player route', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'p1' })], total: 1 } });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('play', media({ id: 'p1' }));
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'p1' } });
  });

  it('routes Play on a SERIES to its detail page, not the (unplayable) player', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 's1', type: 'series' })], total: 1 } });
    const router = makeRouter(true); // media route present
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('play', media({ id: 's1', type: 'series' }));
    expect(push).toHaveBeenCalledWith({ name: 'media', params: { id: 's1' } });
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 's1' } });
  });

  it('shows a toast when adding to the watchlist', async () => {
    stubFetch({ libraries: ONE_LIBRARY, media: { items: [media({ id: 'p1', name: 'Dune' })], total: 1 } });
    const w = mountPage();
    const toasts = useToastStore();
    await flushPromises();
    w.findComponent(HomeRow).vm.$emit('watchlist', media({ id: 'p1', name: 'Dune' }));
    expect(toasts.toasts.some((t) => t.tone === 'success' && t.message.includes('Dune'))).toBe(true);
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
