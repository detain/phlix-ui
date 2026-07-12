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
import MediaDetailPage from './MediaDetailPage.vue';
import MediaDetail from '../components/MediaDetail.vue';
import SeriesDetail from '../components/SeriesDetail.vue';
import { useToastStore } from '../stores/useToastStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { clearMediaItemCache } from '../composables/useMediaItemCache';
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
      { path: '/app/library/:id', name: 'library', component: stub },
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
  // The SWR item cache (UI-2.1) is a module-level singleton shared across tests; clear
  // it so each test starts cold and the by-id fetch assertions below are deterministic.
  clearMediaItemCache();
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

  it('onGenre pushes the owning library filtered by that genre', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', library_id: 'lib-7', genres: ['Sci-Fi'] })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaDetail).vm.$emit('genre', 'Sci-Fi');
    expect(push).toHaveBeenCalledWith({ name: 'library', params: { id: 'lib-7' }, query: { genres: 'Sci-Fi' } });
  });

  it('onCompany pushes the owning library filtered by that company', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', library_id: 'lib-7' })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaDetail).vm.$emit('company', 'Legendary');
    expect(push).toHaveBeenCalledWith({ name: 'library', params: { id: 'lib-7' }, query: { companies: 'Legendary' } });
  });

  it('onGenre is a no-op without an owning library_id', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', library_id: null, genres: ['Sci-Fi'] })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w, router } = await mountAt('m1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaDetail).vm.$emit('genre', 'Sci-Fi');
    expect(push).not.toHaveBeenCalled();
  });

  it('hydrates the favorite store from the server user_data on load', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'Dune', user_data: { favorite: true, rating: 8 } })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    await mountAt('m1', fetchMock);
    const userItemData = useUserItemDataStore();
    await flushPromises();
    // Detail shows the correct initial favorite state right after load()+hydrate.
    expect(userItemData.isFavorite('m1')).toBe(true);
    expect(userItemData.get('m1').rating).toBe(8);
  });

  it('emits a state-aware "added" toast on watchlist when the item is favorited', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'Dune', user_data: { favorite: true, rating: null } })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w } = await mountAt('m1', fetchMock);
    const toasts = useToastStore();
    await flushPromises();
    w.findComponent(MediaDetail).vm.$emit('watchlist', media({ id: 'm1', name: 'Dune' }));
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'success' && t.message.includes('Dune') && /favorites/i.test(t.message),
      ),
    ).toBe(true);
  });

  it('emits a state-aware "removed" toast on watchlist when the item is not favorited', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'Dune', user_data: { favorite: false, rating: null } })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w } = await mountAt('m1', fetchMock);
    const toasts = useToastStore();
    await flushPromises();
    w.findComponent(MediaDetail).vm.$emit('watchlist', media({ id: 'm1', name: 'Dune' }));
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'info' && t.message.includes('Dune') && /favorites/i.test(t.message),
      ),
    ).toBe(true);
  });

  it('does NOT toggle the favorite from the watchlist handler (no double-flip)', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'Dune', user_data: { favorite: true, rating: null } })))
      .mockResolvedValue(jsonResponse({ items: [], total: 0 }));
    const { w } = await mountAt('m1', fetchMock);
    const userItemData = useUserItemDataStore();
    await flushPromises();
    const toggleSpy = vi.spyOn(userItemData, 'toggleFavorite');
    w.findComponent(MediaDetail).vm.$emit('watchlist', media({ id: 'm1', name: 'Dune' }));
    expect(toggleSpy).not.toHaveBeenCalled();
    expect(userItemData.isFavorite('m1')).toBe(true);
  });

  // The reviewer flagged that the page tests above pre-seed the store and emit
  // `watchlist` directly — which masked the real defect. These exercise an ACTUAL
  // hero-button CLICK end-to-end (MediaDetail.onFavorite → store.toggleFavorite →
  // emit watchlist → page.onWatchlist → toast) so the toggle, the persistence and
  // the toast accuracy are all proven, with NO pre-seeding for the add case.
  it('hero favorite click on a NON-favorited item persists (toggles once) and yields an accurate "Added" toast', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'Dune', user_data: { favorite: false, rating: null } })))
      .mockResolvedValueOnce(jsonResponse({ items: [], total: 0 })) // similar
      .mockResolvedValueOnce(jsonResponse({ message: 'Added to favorites' })); // POST favorite
    const { w } = await mountAt('m1', fetchMock);
    const userItemData = useUserItemDataStore();
    const toasts = useToastStore();
    await flushPromises();
    const toggleSpy = vi.spyOn(userItemData, 'toggleFavorite');

    await w.find('.media-detail__favorite').trigger('click');
    await flushPromises();

    // exactly one toggle (the hero button), and it persisted via a POST
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(toggleSpy).toHaveBeenCalledWith('m1', expect.any(String));
    expect(userItemData.isFavorite('m1')).toBe(true);
    const favCall = fetchMock.mock.calls.find((c) => String(c[0]).includes('/api/v1/media/m1/favorite'));
    expect(favCall).toBeTruthy();
    expect((favCall?.[1] as RequestInit | undefined)?.method).toBe('POST');
    // the page toast reads the CORRECT post-toggle state → "Added" (success)
    expect(
      toasts.toasts.some((t) => t.tone === 'success' && t.message.includes('Dune') && /favorites/i.test(t.message)),
    ).toBe(true);
    // and NOT a misleading "Removed" toast
    expect(toasts.toasts.some((t) => /removed/i.test(t.message))).toBe(false);
  });

  it('hero favorite click on an ALREADY-favorited item persists (toggles once → remove) and yields an accurate "Removed" toast', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'm1', name: 'Dune', user_data: { favorite: true, rating: null } })))
      .mockResolvedValueOnce(jsonResponse({ items: [], total: 0 })) // similar
      .mockResolvedValueOnce(jsonResponse({ message: 'Removed from favorites' })); // DELETE favorite
    const { w } = await mountAt('m1', fetchMock);
    const userItemData = useUserItemDataStore();
    const toasts = useToastStore();
    await flushPromises();
    const toggleSpy = vi.spyOn(userItemData, 'toggleFavorite');

    await w.find('.media-detail__favorite').trigger('click');
    await flushPromises();

    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(userItemData.isFavorite('m1')).toBe(false);
    const favCall = fetchMock.mock.calls.find((c) => String(c[0]).includes('/api/v1/media/m1/favorite'));
    expect(favCall).toBeTruthy();
    expect((favCall?.[1] as RequestInit | undefined)?.method).toBe('DELETE');
    // the page toast reads the CORRECT post-toggle state → "Removed" (info)
    expect(
      toasts.toasts.some((t) => t.tone === 'info' && t.message.includes('Dune') && /favorites/i.test(t.message)),
    ).toBe(true);
    expect(toasts.toasts.some((t) => /added/i.test(t.message))).toBe(false);
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
    const labels = w.findAll('.media-card__caption-title').map((n) => n.text());
    expect(labels).toEqual(['Season 1', 'Season 2']);
    const counts = w.findAll('.media-card__caption-sub').map((n) => n.text());
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
    const hrefs = w.findAll('.media-card__link').map((a) => a.attributes('href'));
    expect(hrefs).toContain('/app/media/sh1/season/1');
    expect(hrefs).toContain('/app/media/sh1/season/0'); // Specials → 0
  });

  it('plays the whole season from a season card: first episode when nothing is in progress', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', type: 'series' })))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            episode({ id: 's1e1', season_number: 1, episode_number: 1 }),
            episode({ id: 's1e2', season_number: 1, episode_number: 2 }),
            episode({ id: 's2e1', season_number: 2, episode_number: 1 }),
          ],
          total: 3,
        }),
      );
    const { w, router } = await mountAt('sh1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    // Season 2's card is the second Play button in the season grid.
    // UI-2.5: reveal the lazy overlay action rows before clicking a card's Play.
    for (const c of w.findAll('.media-card')) await c.trigger('pointerenter');
    await w.findAll('.media-card__iconbtn--play')[1].trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 's2e1' } });
  });

  it('plays the whole season from a season card: prefers that season\'s resume-in-progress episode', async () => {
    localStorage.setItem('phlix.resume', JSON.stringify({ s1e2: 240 }));
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', type: 'series' })))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            episode({ id: 's1e1', season_number: 1, episode_number: 1 }),
            episode({ id: 's1e2', season_number: 1, episode_number: 2 }),
          ],
          total: 2,
        }),
      );
    const { w, router } = await mountAt('sh1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    for (const c of w.findAll('.media-card')) await c.trigger('pointerenter');
    await w.find('.media-card__iconbtn--play').trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 's1e2' } });
  });

  it('starts the first episode when Play is pressed on the series hero (no resume entry)', async () => {
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
    // No resume entry → first episode in whole-series playback order (s1e1),
    // explicitly NOT the series id and NOT the higher-season s2e1.
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 's1e1' } });
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 'sh1' } });
  });

  it('resumes the in-progress episode when Play is pressed on the series hero', async () => {
    // The player store seeds resumeMap from localStorage('phlix.resume'); a
    // positive entry on s1e2 marks it resume-in-progress.
    localStorage.setItem('phlix.resume', JSON.stringify({ s1e2: 240 }));
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', type: 'series' })))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            episode({ id: 's1e1', season_number: 1, episode_number: 1 }),
            episode({ id: 's1e2', season_number: 1, episode_number: 2 }),
            episode({ id: 's2e1', season_number: 2, episode_number: 1 }),
          ],
          total: 3,
        }),
      );
    const { w, router } = await mountAt('sh1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaDetail).vm.$emit('play', media({ id: 'sh1', type: 'series' }));
    // Resume-in-progress wins over the first episode.
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 's1e2' } });
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 's1e1' } });
  });

  it('toasts and does NOT navigate when a series has no playable episodes on Play', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', type: 'series' })))
      // only a Specials (season 0) episode → excluded from playback order → null
      .mockResolvedValueOnce(
        jsonResponse({
          items: [episode({ id: 'sp1', season_number: 0, episode_number: 1 })],
          total: 1,
        }),
      );
    const { w, router } = await mountAt('sh1', fetchMock);
    const toasts = useToastStore();
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(MediaDetail).vm.$emit('play', media({ id: 'sh1', type: 'series' }));
    expect(push).not.toHaveBeenCalled();
    expect(toasts.toasts.some((t) => /no episodes to play/i.test(t.message))).toBe(true);
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
    const labels = w.findAll('.media-card__caption-title').map((n) => n.text());
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
    expect(w.findAll('.media-card__link')).toHaveLength(0);
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
