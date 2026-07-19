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
import EmptyState from '../components/ui/EmptyState.vue';
import type { MediaItem } from '../types/media-item';

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
    if (u.includes('/api/v1/media/search')) {
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
    expect(calledUrl).toContain('/api/v1/media/search');
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
