import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import BrowsePage from './BrowsePage.vue';
import MediaRow from '../components/MediaRow.vue';
import HomeRow from '../components/HomeRow.vue';
import { useMediaStore } from '../stores/useMediaStore';
import { useToastStore } from '../stores/useToastStore';
import type { MediaItem } from '../types/media-item';
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

function makeRouter(withMedia = false): Router {
  const stub = { template: '<div />' };
  const routes = [
    { path: '/app', name: 'browse', component: stub },
    { path: '/app/player/:id', name: 'player', component: stub },
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
  vi.stubGlobal('IntersectionObserver', undefined);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function continueRow(w: ReturnType<typeof mountPage>) {
  return w.findAllComponents(MediaRow).find((c) => c.props('title') === 'Continue Watching');
}

describe('BrowsePage — grid load', () => {
  it('fetches the library on mount and shows the title + count', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media()], total: 7 })));
    const w = mountPage();
    await flushPromises();
    expect(w.find('.browse-title').text()).toBe('Browse');
    expect(w.find('.browse-count').text()).toContain('7');
    expect(useMediaStore().items).toHaveLength(1);
  });

  it('keeps the #toolbar-extra slot', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [], total: 0 })));
    const w = mountPage();
    // re-mount with the slot
    const w2 = mount(BrowsePage, {
      global: { plugins: [makeRouter()], provide: { apiBase: '', phlixConfig: { app: 'server', apiBase: '' } } },
      slots: { 'toolbar-extra': '<button class="extra">x</button>' },
    });
    expect(w2.find('.browse-toolbar .extra').exists()).toBe(true);
    w.unmount();
    w2.unmount();
  });
});

describe('BrowsePage — Continue Watching', () => {
  it('derives the rail from the resume map resolved against loaded items', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ a: 600 }));
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'a', name: 'Resumed' }), media({ id: 'b' })], total: 2 })),
    );
    const w = mountPage();
    await flushPromises();
    const row = continueRow(w);
    expect(row).toBeTruthy();
    expect(row!.props('items')).toHaveLength(1);
    expect((row!.props('items') as MediaItem[])[0].id).toBe('a');
  });

  it('hides Continue Watching when the resume map is empty', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'a' })], total: 1 })));
    const w = mountPage();
    await flushPromises();
    expect(continueRow(w)).toBeUndefined();
  });

  it('does not list a resumed id that is not among loaded items', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ ghost: 600 }));
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'a' })], total: 1 })));
    const w = mountPage();
    await flushPromises();
    expect(continueRow(w)).toBeUndefined();
  });

  it('orders the rail by resume seconds desc and caps at 12', async () => {
    // 13 resumable ids with ascending seconds; expect the highest 12, ordered desc.
    const resume: Record<string, number> = {};
    const items: MediaItem[] = [];
    for (let i = 0; i < 13; i++) {
      resume[`x${i}`] = i * 100; // x12 highest, x0 lowest
      items.push(media({ id: `x${i}`, name: `Title ${i}` }));
    }
    localStorage.setItem('phlix.resume', JSON.stringify(resume));
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items, total: items.length })));
    const w = mountPage();
    await flushPromises();
    const row = continueRow(w);
    const list = row!.props('items') as MediaItem[];
    expect(list).toHaveLength(12);
    expect(list[0].id).toBe('x12'); // highest seconds first
    expect(list[11].id).toBe('x1'); // x0 (lowest) dropped by the cap
  });
});

describe('BrowsePage — home rows', () => {
  it('renders one HomeRow per configured row', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media()], total: 1 })));
    const w = mountPage({
      config: {
        homeRows: [
          { id: 'r1', title: 'Recently Added' },
          { id: 'r2', title: 'Sci-Fi', query: { genres: ['Sci-Fi'] } },
        ],
      },
    });
    await flushPromises();
    expect(w.findAllComponents(HomeRow)).toHaveLength(2);
  });

  it('renders no HomeRow when none are configured', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [], total: 0 })));
    const w = mountPage();
    await flushPromises();
    expect(w.findAllComponents(HomeRow)).toHaveLength(0);
  });
});

describe('BrowsePage — card actions', () => {
  it('routes Play to the player route', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'p1' })], total: 1 })));
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('play', media({ id: 'p1' }));
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'p1' } });
  });

  it('shows a toast when adding to the watchlist', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'p1', name: 'Dune' })], total: 1 })));
    const w = mountPage();
    const toasts = useToastStore();
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('watchlist', media({ id: 'p1', name: 'Dune' }));
    expect(toasts.toasts.some((t) => t.tone === 'success' && t.message.includes('Dune'))).toBe(true);
  });

  it('routes Info to the detail route when it exists', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'i1' })], total: 1 })));
    const router = makeRouter(true);
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('info', media({ id: 'i1' }));
    expect(push).toHaveBeenCalledWith({ name: 'media', params: { id: 'i1' } });
  });

  it('shows a "coming soon" toast for Info when no detail route exists (no playback)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'i2', name: 'Arrival' })], total: 1 })));
    const router = makeRouter(false);
    const push = vi.spyOn(router, 'push');
    const w = mountPage({ router });
    const toasts = useToastStore();
    await flushPromises();
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('info', media({ id: 'i2', name: 'Arrival' }));
    expect(push).not.toHaveBeenCalled();
    expect(toasts.toasts.some((t) => t.tone === 'info' && t.message.includes('Arrival'))).toBe(true);
  });
});

describe('BrowsePage — see-all', () => {
  it('applies a row query to the store and reloads the grid', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media()], total: 1 })));
    const w = mountPage({ config: { homeRows: [{ id: 'r2', title: 'Sci-Fi', query: { genres: ['Sci-Fi'] } }] } });
    await flushPromises();
    const store = useMediaStore();
    w.findComponent(HomeRow).vm.$emit('see-all', { id: 'r2', title: 'Sci-Fi', query: { genres: ['Sci-Fi'] } });
    await flushPromises();
    expect(store.selectedGenres).toEqual(['Sci-Fi']);
  });
});

describe('BrowsePage — grid wiring', () => {
  it('reloads on a FilterBar change', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media()], total: 1 })));
    const w = mountPage();
    const store = useMediaStore();
    await flushPromises();
    const reset = vi.spyOn(store, 'reset');
    const fetchMedia = vi.spyOn(store, 'fetchMedia');
    w.findComponent({ name: 'FilterBar' }).vm.$emit('change');
    expect(reset).toHaveBeenCalled();
    expect(fetchMedia).toHaveBeenCalled();
  });

  it('forwards load-more to the store', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media()], total: 50 })));
    const w = mountPage();
    const store = useMediaStore();
    await flushPromises();
    const loadMore = vi.spyOn(store, 'loadMore');
    w.findComponent({ name: 'MediaGrid' }).vm.$emit('load-more');
    expect(loadMore).toHaveBeenCalled();
  });
});

describe('BrowsePage — error', () => {
  it('shows the inline error + retry when the grid fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('library offline')));
    const w = mountPage();
    await flushPromises();
    expect(w.find('.browse-error').text()).toContain('library offline');
    expect(w.find('.browse-retry').exists()).toBe(true);
  });
});
