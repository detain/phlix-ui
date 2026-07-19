/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import MusicArtistsPage from './MusicArtistsPage.vue';

interface ServerArtist {
  name: string;
  album_count: number;
  image_url?: string | null;
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

function stubFetch(opts: { artists?: ServerArtist[]; error?: boolean; hang?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/music/artists')) {
      if (opts.hang) return new Promise<Response>(() => {});
      if (opts.error) return Promise.reject(new Error('artists down'));
      return Promise.resolve(jsonResponse({
        artists: opts.artists ?? [{ name: 'Radiohead', album_count: 9 }],
      }));
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
      { path: '/app/music/artists', name: 'music-artists', component: stub },
      { path: '/app/music/artist/:name', name: 'music-artist', component: stub },
    ],
  });
}

function mountPage(router: Router): VueWrapper {
  return mount(MusicArtistsPage, {
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: { Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' } },
    },
  });
}

beforeEach(() => localStorage.clear());
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('MusicArtistsPage', () => {
  it('loads artists on mount and renders a grid of artist cards', async () => {
    const fetchFn = stubFetch({ artists: [{ name: 'Radiohead', album_count: 9 }, { name: 'Bjork', album_count: 10 }] });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(fetchFn.mock.calls[0][0]).toContain('/api/v1/music/artists');
    const cards = w.findAll('.artist-card');
    expect(cards).toHaveLength(2);
    expect(cards[0].text()).toContain('Radiohead');
    expect(cards[0].text()).toContain('9 albums');
    w.unmount();
  });

  it('shows the loading skeleton while the request is in flight', async () => {
    stubFetch({ hang: true });
    const w = mountPage(makeRouter());
    await Promise.resolve();
    expect(w.find('.artists-page__loading').exists()).toBe(true);
    expect(w.find('.artist-card').exists()).toBe(false);
    w.unmount();
  });

  it('shows the empty state when there are no artists', async () => {
    stubFetch({ artists: [] });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.artists-page__empty').exists()).toBe(true);
    w.unmount();
  });

  it('shows the error state when the load fails', async () => {
    stubFetch({ error: true });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.artists-page__error').exists()).toBe(true);
    w.unmount();
  });

  it('navigates to the music-artist route with the name param on click', async () => {
    stubFetch({ artists: [{ name: 'Aphex Twin', album_count: 13 }] });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage(router);
    await flushPromises();
    await w.find('.artist-card').trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'music-artist', params: { name: 'Aphex Twin' } });
    w.unmount();
  });
});
