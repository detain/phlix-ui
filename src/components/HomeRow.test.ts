import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import HomeRow from './HomeRow.vue';
import MediaRow from './MediaRow.vue';
import MediaCard from './MediaCard.vue';
import { useToastStore } from '../stores/useToastStore';
import type { MediaItem } from '../types/media-item';
import type { HomeRow as HomeRowConfig } from '../app/types';

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

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

const row: HomeRowConfig = { id: 'recent', title: 'Recently Added', query: { sort: 'date_added', order: 'desc' } };

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('HomeRow — eager (no IntersectionObserver)', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', undefined);
  });

  it('fetches its query on mount and renders the items', async () => {
    const items = [media({ id: 'a' }), media({ id: 'b' })];
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ items, total: 42 }));
    vi.stubGlobal('fetch', fetchMock);

    const w = mount(HomeRow, { props: { row, apiBase: 'https://api.test', limit: 6 } });
    await flushPromises();

    // requested the right endpoint with the row's query + limit
    const url = fetchMock.mock.calls[0][0] as string;
    expect(url).toContain('https://api.test/api/v1/media?');
    expect(url).toContain('sort=date_added');
    expect(url).toContain('order=desc');
    expect(url).toContain('limit=6');

    expect(w.findAllComponents(MediaCard)).toHaveLength(2);
    expect(w.findComponent(MediaRow).props('count')).toBe(42);
  });

  it('emits items-loaded with the fetched items', async () => {
    const items = [media({ id: 'a' })];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items, total: 1 })));
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    await flushPromises();
    expect(w.emitted('items-loaded')?.[0]?.[0]).toEqual(items);
  });

  it('shows an error and fires an error toast on a failed fetch', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    const toasts = useToastStore();
    await flushPromises();
    expect(w.find('[role="alert"]').exists()).toBe(true);
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
  });

  it('retries the fetch from the error state', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce(jsonResponse({ items: [media({ id: 'ok' })], total: 1 }));
    vi.stubGlobal('fetch', fetchMock);
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    await flushPromises();
    expect(w.find('[role="alert"]').exists()).toBe(true);

    await w.find('.media-row__retry').trigger('click');
    await flushPromises();
    expect(w.find('[role="alert"]').exists()).toBe(false);
    expect(w.findAllComponents(MediaCard)).toHaveLength(1);
  });

  it('does not write state, emit, or toast when unmounted mid-fetch', async () => {
    let resolveFetch!: (r: Response) => void;
    const pending = new Promise<Response>((res) => {
      resolveFetch = res;
    });
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(pending));
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    const toasts = useToastStore();
    await flushPromises(); // fetch is now in flight

    w.unmount(); // tear down while the request is outstanding
    resolveFetch(jsonResponse({ items: [media({ id: 'late' })], total: 1 }));
    await flushPromises();

    expect(w.emitted('items-loaded')).toBeUndefined();
    expect(toasts.toasts).toHaveLength(0);
  });

  it('collapses when the fetch returns no items (hide-when-empty)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [], total: 0 })));
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    await flushPromises();
    expect(w.find('.media-row').exists()).toBe(false);
  });

  it('emits see-all with the row config when "See all" is clicked', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media()], total: 1 })));
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    await flushPromises();
    await w.find('.home-row__seeall').trigger('click');
    expect(w.emitted('see-all')?.[0]).toEqual([row]);
  });

  it('forwards play/watchlist/info from the inner rail', async () => {
    const item = media({ id: 'fwd' });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [item], total: 1 })));
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    await flushPromises();
    const inner = w.findComponent(MediaRow);
    inner.vm.$emit('play', item);
    inner.vm.$emit('watchlist', item);
    inner.vm.$emit('info', item);
    expect(w.emitted('play')?.[0]).toEqual([item]);
    expect(w.emitted('watchlist')?.[0]).toEqual([item]);
    expect(w.emitted('info')?.[0]).toEqual([item]);
  });
});

describe('HomeRow — lazy (IntersectionObserver present)', () => {
  let trigger: ((intersecting: boolean) => void) | null = null;
  let disconnected = 0;

  beforeEach(() => {
    trigger = null;
    disconnected = 0;
    class IO {
      cb: IntersectionObserverCallback;
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
        trigger = (intersecting: boolean) =>
          cb([{ isIntersecting: intersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
      }
      observe() {}
      disconnect() {
        disconnected++;
      }
      unobserve() {}
      takeRecords() {
        return [];
      }
      root = null;
      rootMargin = '';
      thresholds = [];
    }
    vi.stubGlobal('IntersectionObserver', IO);
  });

  it('does not fetch until the rail scrolls into view, then fetches once', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'a' })], total: 1 }));
    vi.stubGlobal('fetch', fetchMock);
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    await flushPromises();
    expect(fetchMock).not.toHaveBeenCalled();
    // shows a skeleton placeholder while deferred
    expect(w.find('.media-row__rail[aria-busy="true"]').exists()).toBe(true);

    // a non-intersecting tick is ignored
    trigger?.(false);
    await flushPromises();
    expect(fetchMock).not.toHaveBeenCalled();

    trigger?.(true);
    await flushPromises();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(w.findAllComponents(MediaCard)).toHaveLength(1);
  });

  it('disconnects the observer on unmount before it ever intersects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [], total: 0 })));
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    await flushPromises();
    w.unmount();
    expect(disconnected).toBeGreaterThanOrEqual(1);
  });

  it('falls back to items.length for the count when total is absent', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ items: [media({ id: 'a' }), media({ id: 'b' })] })));
    const w = mount(HomeRow, { props: { row, apiBase: '' } });
    trigger?.(true);
    await flushPromises();
    expect(w.findComponent(MediaRow).props('count')).toBe(2);
  });
});
