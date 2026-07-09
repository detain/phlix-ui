/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import WatchHistoryPage from './WatchHistoryPage.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import type { PhlixAppConfig } from '../app/types';
import type { MediaItem } from '../types/media-item';

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

interface ProgressItem {
  id: string;
  progress: number;
  updated_at: string;
  media: MediaItem;
}

function stubFetch(opts: {
  historyItems?: Array<{ id: string; media: MediaItem; progress: number; updated_at: string }>;
  progressItems?: ProgressItem[];
  error?: boolean;
} = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/me/history')) {
      if (opts.error) return Promise.reject(new Error('server error'));
      return Promise.resolve(jsonResponse({ items: opts.historyItems ?? [] }));
    }
    if (u.includes('/api/v1/me/progress')) {
      if (opts.error) return Promise.reject(new Error('server error'));
      return Promise.resolve(jsonResponse({ items: opts.progressItems ?? [] }));
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
    { path: '/app/history', name: 'history', component: stub },
    { path: '/app/player/:id', name: 'player', component: stub },
    { path: '/app/media/:id', name: 'media', component: stub },
  ];
  return createRouter({ history: createMemoryHistory(), routes });
}

function mountPage(opts: { config?: Partial<PhlixAppConfig>; router?: Router } = {}) {
  const router = opts.router ?? makeRouter();
  const config: PhlixAppConfig = { app: 'server', apiBase: '', ...opts.config };
  return mount(WatchHistoryPage, {
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

describe('WatchHistoryPage — renders', () => {
  it('shows spinner while loading', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    const w = mountPage();
    await flushPromises();
    expect(w.findComponent(Spinner).exists()).toBe(true);
  });

  it('renders empty state when no history', async () => {
    stubFetch({ historyItems: [] });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('No watch history yet');
  });

  it('renders error state when API fails', async () => {
    stubFetch({ error: true });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe("Couldn't load watch history");
  });

  it('renders retry button on error', async () => {
    stubFetch({ error: true });
    const w = mountPage();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.find('button').exists()).toBe(true);
  });
});

describe('WatchHistoryPage — groups by date', () => {
  it('falls back to progress endpoint when history returns error', async () => {
    const progressItems: ProgressItem[] = [
      { id: 'p1', progress: 0.5, updated_at: '2026-07-09T10:00:00Z', media: media({ id: 'm1', name: 'Movie 1' }) },
      { id: 'p2', progress: 0.3, updated_at: '2026-07-08T10:00:00Z', media: media({ id: 'm2', name: 'Movie 2' }) },
    ];
    const fn = stubFetch({ progressItems });
    const w = mountPage();
    await flushPromises();
    // Should have called progress endpoint as fallback
    expect(fn.mock.calls.some(([u]) => typeof u === 'string' && (u as string).includes('/me/progress'))).toBe(true);
    // Should show items
    expect(w.findAll('.history-group')).toHaveLength(2);
  });

  it('filters progress > 0 items only', async () => {
    const progressItems: ProgressItem[] = [
      { id: 'p1', progress: 0.5, updated_at: '2026-07-09T10:00:00Z', media: media({ id: 'm1' }) },
      { id: 'p2', progress: 0, updated_at: '2026-07-09T11:00:00Z', media: media({ id: 'm2' }) }, // should be filtered
    ];
    stubFetch({ progressItems });
    const w = mountPage();
    await flushPromises();
    const items = w.findAll('.history-item');
    expect(items).toHaveLength(1);
  });

  it('displays Today and Yesterday labels correctly', async () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const progressItems: ProgressItem[] = [
      { id: 'p1', progress: 0.5, updated_at: `${today}T10:00:00Z`, media: media({ id: 'm1' }) },
      { id: 'p2', progress: 0.3, updated_at: `${yesterday}T10:00:00Z`, media: media({ id: 'm2' }) },
    ];
    stubFetch({ progressItems });
    const w = mountPage();
    await flushPromises();
    const dates = w.findAll('.history-group__date').map((el) => el.text());
    expect(dates).toContain('Today');
    expect(dates).toContain('Yesterday');
  });
});
