/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import RecommendationsPage from './RecommendationsPage.vue';
import MediaGrid from '../components/MediaGrid.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import type { PhlixAppConfig } from '../app/types';

/** User recommendation from the because-you-watched engine (mirrors @phlix/contracts). */
interface UserRecommendation {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  score: number;
  reason: 'because_you_watched';
  computedAt: string;
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

function stubFetch(opts: { recommendations?: UserRecommendation[]; error?: boolean } = {}) {
  const recommendations = opts.recommendations ?? [
    { id: 'r1', title: 'Rec Movie 1', posterUrl: null, year: 2024, score: 0.85, reason: 'because_you_watched', computedAt: '2026-07-09T00:00:00Z' },
    { id: 'r2', title: 'Rec Movie 2', posterUrl: null, year: 2023, score: 0.72, reason: 'because_you_watched', computedAt: '2026-07-09T00:00:00Z' },
  ];
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/recommendations')) {
      if (opts.error) return Promise.reject(new Error('server error'));
      return Promise.resolve(jsonResponse({ recommendations }));
    }
    return Promise.resolve(jsonResponse({ recommendations: [] }));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

function makeRouter(): Router {
  const stub = { template: '<div />' };
  const routes = [
    { path: '/app', name: 'browse', component: stub },
    { path: '/app/recommendations', name: 'recommendations', component: stub },
    { path: '/app/player/:id', name: 'player', component: stub },
    { path: '/app/media/:id', name: 'media', component: stub },
  ];
  return createRouter({ history: createMemoryHistory(), routes });
}

function mountPage(opts: { config?: Partial<PhlixAppConfig>; router?: Router } = {}) {
  const router = opts.router ?? makeRouter();
  const config: PhlixAppConfig = { app: 'server', apiBase: '', ...opts.config };
  return mount(RecommendationsPage, {
    global: {
      plugins: [router],
      provide: { apiBase: config.apiBase, phlixConfig: config },
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
});

describe('RecommendationsPage — renders', () => {
  it('shows spinner while loading', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    const w = mountPage();
    await flushPromises();
    expect(w.findComponent(Spinner).exists()).toBe(true);
  });

  it('renders MediaGrid with items when loaded', async () => {
    stubFetch();
    const w = mountPage();
    await flushPromises();
    expect(w.findComponent(MediaGrid).exists()).toBe(true);
    expect(w.findComponent(MediaGrid).props('items').length).toBeGreaterThan(0);
  });

  it('renders empty state when no recommendations', async () => {
    stubFetch({ recommendations: [] });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('No recommendations yet');
  });

  it('renders error state when API fails', async () => {
    stubFetch({ error: true });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe("Couldn't load recommendations");
  });

  it('renders retry button on error', async () => {
    stubFetch({ error: true });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.find('button').exists()).toBe(true);
  });
});

describe('RecommendationsPage — converts UserRecommendation to MediaItem', () => {
  it('maps UserRecommendation fields correctly', async () => {
    const recommendations: UserRecommendation[] = [
      { id: 'r1', title: 'Test Rec', posterUrl: 'https://img.jpg', year: 2024, score: 0.9, reason: 'because_you_watched', computedAt: '2026-07-09T00:00:00Z' },
    ];
    stubFetch({ recommendations });
    const w = mountPage();
    await flushPromises();
    const gridItems = w.findComponent(MediaGrid).props('items') as Array<{ id: string; name: string; poster_url: string | null; year: number | null }>;
    expect(gridItems[0].id).toBe('r1');
    expect(gridItems[0].name).toBe('Test Rec');
    expect(gridItems[0].poster_url).toBe('https://img.jpg');
    expect(gridItems[0].year).toBe(2024);
  });
});
