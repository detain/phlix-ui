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

  it('renders the per-card album count through i18n, singular and with separators', async () => {
    // Was `{{ n }} {{ n === 1 ? 'album' : 'albums' }}` inlined in the template —
    // untranslatable and unformatted, on a file this very step had already edited.
    stubFetch({
      artists: [
        { name: 'One', album_count: 1 },
        { name: 'Many', album_count: 2197 },
        { name: 'None', album_count: 0 },
      ],
    });
    const w = mountPage(makeRouter());
    await flushPromises();
    const counts = w.findAll('[data-count="albums"]').map((c) => c.text());
    expect(counts).toEqual(['1 album', '2,197 albums', '0 albums']);
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

    it('a failed page keeps the user where they were, and navigable', async () => {
      stubPagingFetch(2197);
      const w = mountPage(makeRouter());
      await flushPromises();
      expect(w.find('[data-count="artists"]').text()).toBe('2,197 artists');
      expect(w.findAll('.artist-card')).toHaveLength(100);

      // Page 2 fails.
      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('down'))));
      await w.find('[data-nav="next"]').trigger('click');
      await flushPromises();

      expect(w.find('.artists-page__error').exists(), 'the failure must be stated').toBe(true);
      expect(
        w.findAll('.artist-card'),
        'page 1 must still be on screen — a blip must not discard it',
      ).toHaveLength(100);
      expect(
        w.find('.music-pager').exists(),
        'the pager must survive so the user is not stranded',
      ).toBe(true);
      expect(
        w.find('[data-count="artists"]').text(),
        'the library size is still known, so keep showing it',
      ).toBe('2,197 artists');
      expect(
        w.find('.artists-page__empty').exists(),
        'a failure must never render as "No artists"',
      ).toBe(false);

      // And navigation genuinely works from the failed state.
      const { calls } = stubPagingFetch(2197);
      await w.find('[data-nav="next"]').trigger('click');
      await flushPromises();
      expect(calls[0]).toBe('/api/v1/music/artists?limit=100&offset=100');
      expect(w.find('.artists-page__error').exists(), 'the banner clears on success').toBe(false);
      w.unmount();
    });

    it('a FIRST-load failure shows the error alone, with no pager and no empty state', async () => {
      // Nothing to preserve here, so the error legitimately takes the whole area —
      // and `total` is still 0, so `MusicPager` hides itself without special-casing.
      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('down'))));
      const w = mountPage(makeRouter());
      await flushPromises();

      expect(w.find('.artists-page__error').exists()).toBe(true);
      expect(w.find('.artists-page__empty').exists()).toBe(false);
      expect(w.find('.music-pager').exists()).toBe(false);
      w.unmount();
    });

    it('keeps the aria-controls IDREF resolvable WHILE a page is loading', async () => {
      // The id used to live on the grid inside the v-if chain, so during every page
      // change the pager advertised an IDREF that resolved to nothing (axe
      // `aria-valid-attr-value`) — precisely when an AT user is listening.
      stubPagingFetch(2197);
      const w = mountPage(makeRouter());
      await flushPromises();

      const target = w.find('[data-nav="jump"]').attributes('aria-controls');
      expect(target).toBe('music-artists-list');

      // Freeze the next page in flight and assert the IDREF still resolves.
      vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(() => {})));
      await w.find('[data-nav="next"]').trigger('click');
      await Promise.resolve();

      expect(w.find('.artists-page__loading').exists(), 'must really be mid-load').toBe(true);
      expect(
        w.find(`#${target}`).exists(),
        'aria-controls must not dangle mid-load',
      ).toBe(true);
      w.unmount();
    });
  });
});
