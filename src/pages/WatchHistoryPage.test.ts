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
import WatchHistoryPage from './WatchHistoryPage.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import type { PhlixAppConfig } from '../app/types';
import type { MediaItem } from '../types/media-item';
import type { ApiClient } from '../api/client';

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

interface ProgressItem {
  id: string;
  progress: number;
  updated_at: string;
  media: MediaItem;
}

interface HistoryItem {
  id: string;
  media: MediaItem;
  progress: number;
  updated_at: string;
}

function makeClient(overrides: {
  historyItems?: HistoryItem[];
  progressItems?: ProgressItem[];
  error?: boolean;
} = {}) {
  const { historyItems = [], progressItems = [], error = false } = overrides;

  const get = vi.fn(async (endpoint: string) => {
    if (error) {
      throw new Error('server error');
    }
    if (endpoint.startsWith('/api/v1/me/history')) {
      return { items: historyItems };
    }
    if (endpoint.startsWith('/api/v1/me/progress')) {
      return { items: progressItems };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });

  const client = {
    get,
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  } as unknown as ApiClient;

  return { client, get };
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

function mountPage(opts: {
  client?: ApiClient;
  config?: Partial<PhlixAppConfig>;
  router?: Router;
} = {}) {
  const router = opts.router ?? makeRouter();
  const config: PhlixAppConfig = { app: 'server', apiBase: '', ...opts.config };
  return mount(WatchHistoryPage, {
    props: { client: opts.client },
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
    const get = vi.fn(() => new Promise(() => {}));
    const client = { get } as unknown as ApiClient;
    const w = mountPage({ client });
    await flushPromises();
    expect(w.findComponent(Spinner).exists()).toBe(true);
  });

  it('renders empty state when no history', async () => {
    const { client } = makeClient({ historyItems: [] });
    const w = mountPage({ client });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe('No watch history yet');
  });

  it('renders error state when API fails', async () => {
    const { client } = makeClient({ error: true });
    const w = mountPage({ client });
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe("Couldn't load watch history");
  });

  it('renders retry button on error', async () => {
    const { client } = makeClient({ error: true });
    const w = mountPage({ client });
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

    // History endpoint fails, progress succeeds
    const historyGet = vi.fn(async () => {
      throw new Error('server error');
    });
    const progressGet = vi.fn(async () => {
      return { items: progressItems };
    });

    const client = {
      get: vi.fn(async (endpoint: string) => {
        if (endpoint.startsWith('/api/v1/me/history')) return historyGet();
        if (endpoint.startsWith('/api/v1/me/progress')) return progressGet();
        throw new Error(`unexpected GET ${endpoint}`);
      }),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as unknown as ApiClient;

    const w = mountPage({ client });
    await flushPromises();

    // Should have called progress endpoint as fallback
    expect(progressGet).toHaveBeenCalled();
    // Should show items
    expect(w.findAll('.history-group')).toHaveLength(2);
  });

  it('filters progress > 0 items only', async () => {
    const progressItems: ProgressItem[] = [
      { id: 'p1', progress: 0.5, updated_at: '2026-07-09T10:00:00Z', media: media({ id: 'm1' }) },
      { id: 'p2', progress: 0, updated_at: '2026-07-09T11:00:00Z', media: media({ id: 'm2' }) }, // should be filtered
    ];
    // Create a client that throws for history (forcing fallback to progress)
    const historyGet = vi.fn(async () => {
      throw new Error('server error');
    });
    const progressGet = vi.fn(async () => {
      return { items: progressItems };
    });
    const client = {
      get: vi.fn(async (endpoint: string) => {
        if (endpoint.startsWith('/api/v1/me/history')) return historyGet();
        if (endpoint.startsWith('/api/v1/me/progress')) return progressGet();
        throw new Error(`unexpected GET ${endpoint}`);
      }),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as unknown as ApiClient;
    const w = mountPage({ client });
    await flushPromises();
    const items = w.findAll('.history-item');
    expect(items).toHaveLength(1);
  });

  it('displays Today and Yesterday labels correctly', async () => {
    // Use fixed dates that fall within the test execution
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const progressItems: ProgressItem[] = [
      { id: 'p1', progress: 0.5, updated_at: `${today}T10:00:00Z`, media: media({ id: 'm1' }) },
      { id: 'p2', progress: 0.3, updated_at: `${yesterday}T10:00:00Z`, media: media({ id: 'm2' }) },
    ];

    // Force the history endpoint to fail so we use the progress fallback
    const historyGet = vi.fn(async () => {
      throw new Error('server error');
    });
    const progressGet = vi.fn(async () => {
      return { items: progressItems };
    });

    const client = {
      get: vi.fn(async (endpoint: string) => {
        if (endpoint.startsWith('/api/v1/me/history')) return historyGet();
        if (endpoint.startsWith('/api/v1/me/progress')) return progressGet();
        throw new Error(`unexpected GET ${endpoint}`);
      }),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as unknown as ApiClient;

    const w = mountPage({ client });
    await flushPromises();

    const dates = w.findAll('.history-group__date').map((el) => el.text());
    expect(dates).toContain('Today');
    expect(dates).toContain('Yesterday');
  });
});
