import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import MediaDetailPage from './MediaDetailPage.vue';
import MediaDetail from '../components/MediaDetail.vue';
import SeriesDetail from '../components/SeriesDetail.vue';
import { useToastStore } from '../stores/useToastStore';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    type: 'movie',
    poster_url: null,
    genres: ['Sci-Fi'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: 'x',
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
function errorResponse(status = 500, body: unknown = { error: 'boom' }): Response {
  return {
    ok: false,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}
/** The by-id endpoint wraps the item as { item } (matches the real server). */
function byId(item: MediaItem): Response {
  return jsonResponse({ item });
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/media/:id', name: 'media', component: MediaDetailPage },
      { path: '/app/media/:id/season/:season', name: 'season', component: stub },
      { path: '/app/player/:id', name: 'player', component: stub },
    ],
  });
}

async function mountAt(id: string, fetchMock: ReturnType<typeof vi.fn>) {
  vi.stubGlobal('fetch', fetchMock);
  const router = makeRouter();
  router.push(`/app/media/${id}`);
  await router.isReady();
  const w = mount(MediaDetailPage, { global: { plugins: [router] } });
  return { w, router };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('MediaDetailPage — load', () => {
  it('shows a loading skeleton before the fetch resolves', async () => {
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => {})); // never resolves
    const { w } = await mountAt('m1', fetchMock);
    expect(w.find('[role="status"][aria-busy="true"]').exists()).toBe(true);
  });

  it('fetches the title by id and renders MediaDetail', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'Dune' })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const detail = w.findComponent(MediaDetail);
    expect(detail.exists()).toBe(true);
    expect((detail.props('item') as MediaItem).name).toBe('Dune');
    // first call hit the by-id endpoint
    expect(fetchMock.mock.calls[0][0]).toContain('/api/v1/media/m1');
  });

  it('shows an error state with retry when the fetch fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue(errorResponse());
    const { w } = await mountAt('bad', fetchMock);
    await flushPromises();
    expect(w.findComponent(MediaDetail).exists()).toBe(false);
    expect(w.text()).toContain("Couldn't load this title");
  });
});

describe('MediaDetailPage — similar', () => {
  it('fetches similar by the first genre, excludes the current id, and caps at 12', async () => {
    const base = media({ id: 'm1', genres: ['Sci-Fi'] });
    const similar: MediaItem[] = [base, ...Array.from({ length: 13 }, (_, i) => media({ id: `s${i}` }))];
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(base))
      .mockResolvedValueOnce(jsonResponse({ items: similar, total: similar.length }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const detail = w.findComponent(MediaDetail);
    const list = detail.props('similar') as MediaItem[];
    expect(list.find((m) => m.id === 'm1')).toBeUndefined(); // self excluded
    expect(list).toHaveLength(12); // capped
    // similar request scoped by genre
    // genres are sent as `genres[]=` (URL-encoded) so PHP parses them into an array
    expect(fetchMock.mock.calls[1][0]).toContain('genres%5B%5D=Sci-Fi');
  });

  it('skips the similar fetch when the title has no genres', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(byId(media({ id: 'm1', genres: [] })));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(fetchMock).toHaveBeenCalledTimes(1); // only the by-id fetch
    expect((w.findComponent(MediaDetail).props('similar') as MediaItem[])).toHaveLength(0);
  });
});

describe('MediaDetailPage — actions & navigation', () => {
  it('routes Play to the player', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1' })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaDetail).vm.$emit('play', media({ id: 'm1' }));
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'm1' } });
  });

  it('toasts on watchlist', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'Dune' })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w } = await mountAt('m1', fetchMock);
    const toasts = useToastStore();
    await flushPromises();
    w.findComponent(MediaDetail).vm.$emit('watchlist', media({ id: 'm1', name: 'Dune' }));
    expect(toasts.toasts.some((t) => t.tone === 'success' && t.message.includes('Dune'))).toBe(true);
  });

  it('goes back via router.back from the detail back affordance', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1' })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const back = vi.spyOn(router, 'back');
    w.findComponent(MediaDetail).vm.$emit('back');
    expect(back).toHaveBeenCalled();
  });

  it('treats a failed similar fetch as non-fatal (empty rail, title still shows)', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', genres: ['Sci-Fi'] })))
      .mockRejectedValueOnce(new Error('similar down'));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    const detail = w.findComponent(MediaDetail);
    expect(detail.exists()).toBe(true);
    expect((detail.props('similar') as MediaItem[])).toHaveLength(0);
  });

  it('re-fetches when navigating to another title (info on a similar card)', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'First' })))
      .mockResolvedValueOnce(jsonResponse({ items: [], total: 0 }))
      .mockResolvedValueOnce(byId(media({ id: 'm2', name: 'Second' })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect((w.findComponent(MediaDetail).props('item') as MediaItem).name).toBe('First');

    w.findComponent(MediaDetail).vm.$emit('info', media({ id: 'm2' }));
    await flushPromises();
    await router.isReady();
    await flushPromises();
    expect((w.findComponent(MediaDetail).props('item') as MediaItem).name).toBe('Second');
  });
});

describe('MediaDetailPage — series season grid (U3)', () => {
  function episode(over: Partial<MediaItem> = {}): MediaItem {
    return media({ type: 'episode', genres: [], ...over });
  }

  it('fetches a series\' children by parentId and renders a season-card grid (not similar)', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', name: 'Breaking Bad', type: 'series' })))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            episode({ id: 's1e1', season_number: 1, episode_number: 1, episode_title: 'Pilot' }),
            episode({ id: 's1e2', season_number: 1, episode_number: 2 }),
            episode({ id: 's2e1', season_number: 2, episode_number: 1 }),
          ],
          total: 3,
        }),
      );
    const { w } = await mountAt('sh1', fetchMock);
    await flushPromises();

    // the children fetch was scoped by parentId, NOT a genre similar query
    expect(fetchMock.mock.calls[1][0]).toContain('parentId=sh1');
    expect(fetchMock.mock.calls[1][0]).not.toContain('genres');

    const series = w.findComponent(SeriesDetail);
    expect(series.exists()).toBe(true);
    // one card per season with the correct labels + episode counts
    const labels = w.findAll('.series-detail__label').map((n) => n.text());
    expect(labels).toEqual(['Season 1', 'Season 2']);
    const counts = w.findAll('.series-detail__count').map((n) => n.text());
    expect(counts[0]).toContain('2 episodes');
    expect(counts[1]).toContain('1 episode');
  });

  it('links each season card to its per-season route', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', type: 'series' })))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            episode({ id: 's1e1', season_number: 1, episode_number: 1 }),
            episode({ id: 'sp1', season_number: 0, episode_number: 1 }),
          ],
          total: 2,
        }),
      );
    const { w } = await mountAt('sh1', fetchMock);
    await flushPromises();
    const hrefs = w.findAll('.series-detail__card').map((a) => a.attributes('href'));
    expect(hrefs).toContain('/app/media/sh1/season/1');
    expect(hrefs).toContain('/app/media/sh1/season/0'); // Specials → 0
  });

  it('starts the first episode when Play is pressed on the series hero', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', type: 'series' })))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            episode({ id: 's2e1', season_number: 2, episode_number: 1 }),
            episode({ id: 's1e1', season_number: 1, episode_number: 1 }),
          ],
          total: 2,
        }),
      );
    const { w, router } = await mountAt('sh1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaDetail).vm.$emit('play', media({ id: 'sh1', type: 'series' }));
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 's1e1' } });
  });

  it('flattens server-modeled season rows by fetching each season\'s episodes', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', type: 'series' })))
      // direct children: two season container rows
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            media({ id: 'se1', type: 'season', season_number: 1 }),
            media({ id: 'se2', type: 'season', season_number: 2 }),
          ],
          total: 2,
        }),
      )
      // each season's episodes (order of the Promise.all calls follows the rows)
      .mockResolvedValueOnce(
        jsonResponse({ items: [episode({ id: 's1e1', season_number: 1, episode_number: 1 })], total: 1 }),
      )
      .mockResolvedValueOnce(
        jsonResponse({ items: [episode({ id: 's2e1', season_number: 2, episode_number: 1 })], total: 1 }),
      );
    const { w } = await mountAt('sh1', fetchMock);
    await flushPromises();
    await flushPromises();
    const labels = w.findAll('.series-detail__label').map((n) => n.text());
    expect(labels).toEqual(['Season 1', 'Season 2']);
    // season-row children were fetched by their own ids
    const urls = fetchMock.mock.calls.map((c) => String(c[0]));
    expect(urls.some((u) => u.includes('parentId=se1'))).toBe(true);
    expect(urls.some((u) => u.includes('parentId=se2'))).toBe(true);
  });

  it('shows an empty message when a series has no seasons', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', type: 'series' })))
      .mockResolvedValueOnce(jsonResponse({ items: [], total: 0 }));
    const { w } = await mountAt('sh1', fetchMock);
    await flushPromises();
    expect(w.findComponent(SeriesDetail).exists()).toBe(true);
    expect(w.findAll('.series-detail__card')).toHaveLength(0);
    expect(w.text()).toContain('no seasons available');
  });

  it('a movie still gets the similar rail and no season grid', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', type: 'movie', genres: ['Sci-Fi'] })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.findComponent(SeriesDetail).exists()).toBe(false);
    expect(w.findComponent(MediaDetail).exists()).toBe(true);
    // the second fetch was the genre-scoped similar query, not a parentId one
    expect(fetchMock.mock.calls[1][0]).toContain('genres');
  });
});

describe('MediaDetailPage — teardown', () => {
  it('does not write state or toast when unmounted mid-fetch', async () => {
    let resolveFetch!: (r: Response) => void;
    const pending = new Promise<Response>((res) => {
      resolveFetch = res;
    });
    const fetchMock = vi.fn().mockReturnValue(pending);
    const { w } = await mountAt('m1', fetchMock);
    const toasts = useToastStore();
    expect(w.find('[role="status"][aria-busy="true"]').exists()).toBe(true);

    w.unmount(); // tear down while the by-id request is outstanding
    resolveFetch(byId(media({ id: 'm1' })));
    await flushPromises();

    expect(w.findComponent(MediaDetail).exists()).toBe(false);
    expect(toasts.toasts).toHaveLength(0);
  });
});

describe('MediaDetailPage — resume', () => {
  it('passes the resume position from the player store to MediaDetail', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ m1: 500 }));
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1' })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w } = await mountAt('m1', fetchMock);
    await flushPromises();
    expect(w.findComponent(MediaDetail).props('resumeSeconds')).toBe(500);
  });
});
