/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import MusicArtistPage from './MusicArtistPage.vue';

interface ServerAlbum {
  name: string;
  artist: string;
  year?: number | null;
  track_count?: number;
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

/**
 * A FILTERING, PAGING album server — the real `/albums` contract (S99 + S110).
 *
 * It applies `?artist=` in "SQL" and slices by `?limit=`/`?offset=`, and it does
 * NOT filter when the parameter is absent. That matters: the page used to fetch
 * page 1 of `/albums` and filter it in the browser, and because `/albums` is
 * ordered globally by artist, page 1 spans only ~23 of production's 2,197 artists
 * — so 77 of the 100 visible artists rendered an EMPTY album list. A stub that
 * filters for the client (the old one here did, by only ever returning two rows)
 * cannot tell the two strategies apart.
 */
function stubFetch(opts: { artistName?: string; albums?: ServerAlbum[]; error?: boolean } = {}) {
  const library: ServerAlbum[] = opts.albums ?? [
    { name: 'OK Computer', artist: 'Radiohead', track_count: 12 },
    { name: 'Homework', artist: 'Daft Punk', track_count: 16 },
  ];
  const calls: string[] = [];
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    calls.push(u);
    // Order matters: the more specific /artists/{name} check first.
    if (u.includes('/api/v1/music/artists/')) {
      if (opts.error) return Promise.reject(new Error('artist down'));
      return Promise.resolve(jsonResponse({
        artist: { name: opts.artistName ?? 'Radiohead', album_count: 2 },
      }));
    }
    if (u.includes('/api/v1/music/albums')) {
      const parsed = new URL(u, 'http://server.test');
      const artist = (parsed.searchParams.get('artist') ?? '').trim();
      const limit = Math.min(100, Number(parsed.searchParams.get('limit') ?? 100));
      const offset = Math.max(0, Number(parsed.searchParams.get('offset') ?? 0));
      const rows = artist === ''
        ? library
        : library.filter((a) => a.artist.toLowerCase() === artist.toLowerCase());
      return Promise.resolve(jsonResponse({
        albums: rows.slice(offset, offset + limit),
        total: rows.length,
        limit,
        offset,
        artist: artist === '' ? null : artist,
      }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return Object.assign(fn, { calls });
}

/** Build `count` albums for one artist, titled so they sort predictably. */
function albumsFor(artist: string, count: number): ServerAlbum[] {
  const out: ServerAlbum[] = [];
  for (let i = 1; i <= count; i += 1) {
    out.push({ name: `${artist} Album ${String(i).padStart(3, '0')}`, artist, track_count: 5 });
  }
  return out;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/music/artists', name: 'music-artists', component: stub },
      { path: '/app/music/artist/:name', name: 'music-artist', component: stub },
      { path: '/app/music/album/:name', name: 'music-album', component: stub },
    ],
  });
}

function mountPage(router: Router, name = 'Radiohead'): VueWrapper {
  return mount(MusicArtistPage, {
    props: { name },
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: {
        Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' },
        MusicAlbumCard: {
          props: ['album'],
          emits: ['click'],
          template: '<button class="album-card" @click="$emit(\'click\', album)">{{ album.title }}</button>',
        },
      },
    },
  });
}

beforeEach(() => localStorage.clear());
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('MusicArtistPage', () => {
  it('loads the artist and asks the SERVER to filter its albums (?artist=)', async () => {
    const fetchFn = stubFetch();
    const w = mountPage(makeRouter());
    await flushPromises();

    expect(fetchFn.mock.calls.some((c) => String(c[0]).includes('/api/v1/music/artists/'))).toBe(true);
    // Paged AND filtered server-side — not "fetch everything, filter here".
    expect(fetchFn.calls).toContain('/api/v1/music/albums?limit=100&offset=0&artist=Radiohead');
    expect(w.find('.artist-header__name').text()).toBe('Radiohead');
    const cards = w.findAll('.album-card');
    expect(cards).toHaveLength(1);
    expect(cards[0].text()).toContain('OK Computer');
    w.unmount();
  });

  it('shows the error state when the artist load fails', async () => {
    stubFetch({ error: true });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.artist-page__error').exists()).toBe(true);
    w.unmount();
  });

  it('shows the albums empty state when the artist has none', async () => {
    stubFetch({ albums: [{ name: 'Discovery', artist: 'Daft Punk', track_count: 14 }] });
    const w = mountPage(makeRouter());
    await flushPromises();
    // The server's ?artist=Radiohead filter matches nothing → empty state.
    expect(w.find('.artist-albums__empty').exists()).toBe(true);
    expect(w.find('.album-card').exists()).toBe(false);
    w.unmount();
  });

  // ---- S110: reachability of albums beyond page 1 --------------------------

  it('resolves the albums of an artist whose albums fall far beyond page 1 of /albums', async () => {
    // 300 albums by another artist come FIRST in the global order, so page 1 of
    // /albums contains none of Radiohead's. This is the 77-of-100 shape.
    const library = [...albumsFor('Aaaa Filler', 300), ...albumsFor('Radiohead', 3)];
    const fetchFn = stubFetch({ albums: library });
    const w = mountPage(makeRouter());
    await flushPromises();

    const cards = w.findAll('.album-card');
    expect(cards).toHaveLength(3);
    expect(cards[0].text()).toContain('Radiohead Album 001');
    expect(w.find('[data-count="albums"]').text()).toBe('3 albums');
    expect(fetchFn.calls).toContain('/api/v1/music/albums?limit=100&offset=0&artist=Radiohead');
    w.unmount();
  });

  it('pages an artist with more albums than one page (142 — production maximum)', async () => {
    const fetchFn = stubFetch({ albums: albumsFor('Radiohead', 142) });
    const w = mountPage(makeRouter());
    await flushPromises();

    expect(w.findAll('.album-card')).toHaveLength(100);
    expect(w.find('[data-count="albums"]').text()).toBe('142 albums');
    expect(w.find('[data-nav="info"]').text()).toContain('Page 1 of 2');

    await w.find('[data-nav="next"]').trigger('click');
    await flushPromises();

    expect(fetchFn.calls).toContain('/api/v1/music/albums?limit=100&offset=100&artist=Radiohead');
    const second = w.findAll('.album-card');
    expect(second).toHaveLength(42);
    expect(second[41].text()).toContain('Radiohead Album 142');
    // The second page re-reads only the album list, not the artist row.
    expect(fetchFn.calls.filter((u) => u.includes('/api/v1/music/artists/'))).toHaveLength(1);
    w.unmount();
  });

  it('renders no album pager when the artist fits on one page', async () => {
    stubFetch({ albums: albumsFor('Radiohead', 4) });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.findAll('.album-card')).toHaveLength(4);
    expect(w.find('.music-pager').exists()).toBe(false);
    w.unmount();
  });

  it('falls back to the artist row album_count before any album page loads', async () => {
    // The artist row says 2; the filtered album list is empty (nothing indexed
    // yet). The header must not claim "0 albums" when the DB says otherwise.
    stubFetch({ albums: [] });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('[data-count="albums"]').text()).toBe('2 albums');
    w.unmount();
  });

  it('navigates to the music-album route with the album title on click', async () => {
    stubFetch();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage(router);
    await flushPromises();
    await w.find('.album-card').trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'music-album', params: { name: 'OK Computer' } });
    w.unmount();
  });

  it('renders a back link to the artists listing', async () => {
    stubFetch();
    const w = mountPage(makeRouter());
    await flushPromises();
    const back = w.find('a.artist-page__back-link');
    expect(back.exists()).toBe(true);
    expect(back.attributes('href')).toContain('/app/music/artists');
    w.unmount();
  });
});
