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
import ExplorePage from './ExplorePage.vue';
import MediaGrid from '../components/MediaGrid.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import type { PhlixAppConfig } from '../app/types';

/** Similar item from the similar-items engine (mirrors @phlix/contracts). */
interface SimilarItem {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  score: number;
  reason: 'genre' | 'actor' | 'director' | 'rating' | 'year';
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

function stubFetch(opts: { items?: SimilarItem[]; error?: boolean } = {}) {
  const items = opts.items ?? [
    { id: 's1', title: 'Similar Movie 1', posterUrl: null, year: 2024, score: 0.85, reason: 'genre' as const },
    { id: 's2', title: 'Similar Movie 2', posterUrl: null, year: 2023, score: 0.72, reason: 'actor' as const },
  ];
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/similar')) {
      if (opts.error) return Promise.reject(new Error('server error'));
      return Promise.resolve(jsonResponse({ items }));
    }
    return Promise.resolve(jsonResponse({ items: [] }));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

function makeRouter(): Router {
  const stub = { template: '<div />' };
  const routes = [
    { path: '/app', name: 'browse', component: stub },
    { path: '/app/explore', name: 'explore', component: stub },
    { path: '/app/player/:id', name: 'player', component: stub },
    { path: '/app/media/:id', name: 'media', component: stub },
  ];
  return createRouter({ history: createMemoryHistory(), routes });
}

async function mountPage(opts: { config?: Partial<PhlixAppConfig>; router?: Router; query?: Record<string, string> } = {}) {
  const router = opts.router ?? makeRouter();
  const config: PhlixAppConfig = { app: 'server', apiBase: '', ...opts.config };
  if (opts.query) {
    // Navigate to explore route first so router.replace doesn't fail on unmatched root
    await router.push({ path: '/app/explore', query: opts.query });
  }
  const page = mount(ExplorePage, {
    global: {
      plugins: [router],
      provide: { apiBase: config.apiBase, phlixConfig: config },
    },
  });
  return page;
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

describe('ExplorePage — renders', () => {
  it('shows spinner while loading', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    const w = await mountPage({ query: { item: 'm1' } });
    await flushPromises();
    expect(w.findComponent(Spinner).exists()).toBe(true);
  });

  it('renders MediaGrid with items when loaded', async () => {
    stubFetch();
    const w = await mountPage({ query: { item: 'm1' } });
    await flushPromises();
    expect(w.findComponent(MediaGrid).exists()).toBe(true);
    expect(w.findComponent(MediaGrid).props('items').length).toBeGreaterThan(0);
  });

  it('renders empty state when no item is selected', async () => {
    stubFetch();
    const w = await mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('Select an item to explore');
  });

  it('renders empty state when API returns no items', async () => {
    stubFetch({ items: [] });
    const w = await mountPage({ query: { item: 'm1' } });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('No similar items found');
  });

  it('renders error state when API fails', async () => {
    stubFetch({ error: true });
    const w = await mountPage({ query: { item: 'm1' } });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe("Couldn't load similar items");
  });

  it('renders retry button on error', async () => {
    stubFetch({ error: true });
    const w = await mountPage({ query: { item: 'm1' } });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.find('button').exists()).toBe(true);
  });
});

describe('ExplorePage — converts SimilarItem to MediaItem', () => {
  it('maps SimilarItem fields correctly', async () => {
    const items: SimilarItem[] = [
      { id: 's1', title: 'Test Title', posterUrl: 'https://img.jpg', year: 2024, score: 0.9, reason: 'genre' },
    ];
    stubFetch({ items });
    const w = await mountPage({ query: { item: 'm1' } });
    await flushPromises();
    const gridItems = w.findComponent(MediaGrid).props('items') as Array<{ id: string; name: string; poster_url: string | null; year: number | null }>;
    expect(gridItems[0].id).toBe('s1');
    expect(gridItems[0].name).toBe('Test Title');
    expect(gridItems[0].poster_url).toBe('https://img.jpg');
    expect(gridItems[0].year).toBe(2024);
  });
});
