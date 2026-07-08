/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import SeasonPage from './SeasonPage.vue';
import SeriesSeasons from '../components/SeriesSeasons.vue';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'sh1',
    name: 'Breaking Bad',
    type: 'series',
    poster_url: null,
    genres: [],
    year: 2008,
    rating: null,
    runtime: null,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}
function episode(over: Partial<MediaItem> = {}): MediaItem {
  return media({ type: 'episode', ...over });
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
function byId(item: MediaItem): Response {
  return jsonResponse({ item });
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/media/:id', name: 'media', component: stub },
      { path: '/app/media/:id/season/:season', name: 'season', component: SeasonPage },
      { path: '/app/player/:id', name: 'player', component: stub },
    ],
  });
}

async function mountAt(id: string, season: string, fetchMock: ReturnType<typeof vi.fn>) {
  vi.stubGlobal('fetch', fetchMock);
  const router = makeRouter();
  router.push(`/app/media/${id}/season/${season}`);
  await router.isReady();
  const w = mount(SeasonPage, { global: { plugins: [router] } });
  return { w, router };
}

/** A series whose children fetch returns two seasons + a Specials episode. */
function seriesFetch(): ReturnType<typeof vi.fn> {
  return vi
    .fn()
    .mockResolvedValueOnce(byId(media({ id: 'sh1', name: 'Breaking Bad', type: 'series' })))
    .mockResolvedValueOnce(
      jsonResponse({
        items: [
          episode({ id: 's1e1', season_number: 1, episode_number: 1, episode_title: 'Pilot' }),
          episode({ id: 's1e2', season_number: 1, episode_number: 2, episode_title: 'Cat in the Bag' }),
          episode({ id: 's2e1', season_number: 2, episode_number: 1 }),
          episode({ id: 'sp1', season_number: 0, episode_number: 1 }),
        ],
        total: 4,
      }),
    );
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('SeasonPage (U3)', () => {
  it('shows a loading state before the fetch resolves', async () => {
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => {}));
    const { w } = await mountAt('sh1', '1', fetchMock);
    expect(w.find('[role="status"][aria-busy="true"]').exists()).toBe(true);
  });

  it('fetches the series + its children and renders the requested season\'s episodes', async () => {
    const fetchMock = seriesFetch();
    const { w } = await mountAt('sh1', '1', fetchMock);
    await flushPromises();

    // by-id then a parentId children fetch
    expect(fetchMock.mock.calls[0][0]).toContain('/api/v1/media/sh1');
    expect(fetchMock.mock.calls[1][0]).toContain('parentId=sh1');

    expect(w.text()).toContain('Season 1');
    const titles = w.findAll('.series-seasons__episode-title').map((n) => n.text());
    expect(titles).toContain('1. Pilot');
    expect(titles).toContain('2. Cat in the Bag');
    // not the other season's episode
    expect(w.findAll('.series-seasons__episode')).toHaveLength(2);
  });

  it('renders the Specials bucket for season 0', async () => {
    const fetchMock = seriesFetch();
    const { w } = await mountAt('sh1', '0', fetchMock);
    await flushPromises();
    expect(w.find('.season-page__title').text()).toBe('Specials');
    expect(w.findAll('.series-seasons__episode')).toHaveLength(1);
  });

  it('navigates Play of an episode to the player route', async () => {
    const fetchMock = seriesFetch();
    const { w, router } = await mountAt('sh1', '1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(SeriesSeasons).vm.$emit('play', episode({ id: 's1e1' }));
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 's1e1' } });
  });

  it('navigates opening an episode row to that episode’s detail page', async () => {
    const fetchMock = seriesFetch();
    const { w, router } = await mountAt('sh1', '1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    w.findComponent(SeriesSeasons).vm.$emit('open', episode({ id: 's1e1' }));
    expect(push).toHaveBeenCalledWith({ name: 'media', params: { id: 's1e1' } });
  });

  it('the back-link navigates to the series detail', async () => {
    const fetchMock = seriesFetch();
    const { w, router } = await mountAt('sh1', '1', fetchMock);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    await w.find('.season-page__back').trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'media', params: { id: 'sh1' } });
  });

  it('shows a "season not found" empty state for an invalid season number', async () => {
    const fetchMock = seriesFetch();
    const { w } = await mountAt('sh1', '99', fetchMock);
    await flushPromises();
    expect(w.findComponent(SeriesSeasons).exists()).toBe(false);
    expect(w.text()).toContain('Season not found');
  });

  it('shows an error state with retry when the series fetch fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue(errorResponse());
    const { w } = await mountAt('sh1', '1', fetchMock);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load this season");
  });

  it('sets the document title to "<Series> · Season N"', async () => {
    const fetchMock = seriesFetch();
    await mountAt('sh1', '1', fetchMock);
    await flushPromises();
    expect(document.title).toContain('Breaking Bad · Season 1');
  });

  it('re-fetches when the season param changes', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(byId(media({ id: 'sh1', name: 'Breaking Bad', type: 'series' })))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            episode({ id: 's1e1', season_number: 1, episode_number: 1 }),
            episode({ id: 's2e1', season_number: 2, episode_number: 1 }),
          ],
          total: 2,
        }),
      )
      .mockResolvedValueOnce(byId(media({ id: 'sh1', name: 'Breaking Bad', type: 'series' })))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            episode({ id: 's1e1', season_number: 1, episode_number: 1 }),
            episode({ id: 's2e1', season_number: 2, episode_number: 1 }),
          ],
          total: 2,
        }),
      );
    const { w, router } = await mountAt('sh1', '1', fetchMock);
    await flushPromises();
    expect(w.find('.season-page__title').text()).toBe('Season 1');

    router.push('/app/media/sh1/season/2');
    await flushPromises();
    await flushPromises();
    expect(w.find('.season-page__title').text()).toBe('Season 2');
  });
});
