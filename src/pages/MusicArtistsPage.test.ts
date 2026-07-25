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

/**
 * A paging server (S110): `/artists` is a BOUNDED page — it honours `?limit=`/
 * `?offset=` and reports the true `total`, exactly like the real endpoint. Against
 * this, a page that sends no paging params can only ever show its first slice.
 */
function stubPagingFetch(totalArtists: number) {
  const calls: string[] = [];
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    calls.push(u);
    const parsed = new URL(u, 'http://server.test');
    const limit = Math.min(100, Number(parsed.searchParams.get('limit') ?? 100));
    const offset = Math.max(0, Number(parsed.searchParams.get('offset') ?? 0));
    const artists: ServerArtist[] = [];
    for (let i = offset + 1; i <= Math.min(totalArtists, offset + limit); i += 1) {
      artists.push({ name: `Artist ${String(i).padStart(4, '0')}`, album_count: 2 });
    }
    return Promise.resolve(jsonResponse({ artists, total: totalArtists, limit, offset }));
  });
  vi.stubGlobal('fetch', fn);
  return { fn, calls };
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
      // MusicPager is deliberately NOT stubbed: the paging tests below exercise
      // the real control, which is the thing that makes the library reachable.
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

  // ---- S110: paging + the true count -------------------------------------
  describe('paging (S110)', () => {
    it('requests a bounded page and shows the DB total, not the page length', async () => {
      const { calls } = stubPagingFetch(2197);
      const w = mountPage(makeRouter());
      await flushPromises();

      expect(calls[0]).toBe('/api/v1/music/artists?limit=100&offset=0');
      expect(w.findAll('.artist-card')).toHaveLength(100);
      expect(w.find('[data-count="artists"]').text()).toBe('2,197 artists');
      expect(w.find('[data-nav="info"]').text()).toContain('Page 1 of 22');
      w.unmount();
    });

    it('reaches the last artist of a 2,197-artist library', async () => {
      const { calls } = stubPagingFetch(2197);
      const w = mountPage(makeRouter());
      await flushPromises();

      await w.find('[data-nav="last"]').trigger('click');
      await flushPromises();

      expect(calls).toContain('/api/v1/music/artists?limit=100&offset=2100');
      const cards = w.findAll('.artist-card');
      expect(cards).toHaveLength(97);
      expect(cards[96]!.text()).toContain('Artist 2197');
      w.unmount();
    });

    it('renders no pager when the whole library fits on one page', async () => {
      stubPagingFetch(9);
      const w = mountPage(makeRouter());
      await flushPromises();
      expect(w.find('.music-pager').exists()).toBe(false);
      expect(w.find('[data-count="artists"]').text()).toBe('9 artists');
      w.unmount();
    });

    it('surfaces the error and stops claiming a count when a page fails', async () => {
      stubPagingFetch(2197);
      const w = mountPage(makeRouter());
      await flushPromises();
      expect(w.find('[data-count="artists"]').text()).toBe('2,197 artists');

      // Page 2 fails.
      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('down'))));
      await w.find('[data-nav="next"]').trigger('click');
      await flushPromises();

      expect(w.find('.artists-page__error').exists()).toBe(true);
      // No pager and no count: both would be claims about a listing we no longer
      // have. (The alternative — keeping the old total beside an error — would
      // page a grid that is not on screen.)
      expect(w.find('.music-pager').exists()).toBe(false);
      expect(w.find('[data-count="artists"]').exists()).toBe(false);
      w.unmount();
    });
  });
});
