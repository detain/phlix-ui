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
function stubFetch(opts: {
  artistName?: string;
  albums?: ServerAlbum[];
  error?: boolean;
  /** `album_count` on the artist ROW (the DB truth, independent of any page). */
  albumCount?: number;
  /** `track_count` on the artist ROW — the artist's TRUE track total. */
  trackCount?: number;
  /** Reject only the album LIST route (the artist row still resolves). */
  albumsError?: boolean;
} = {}) {
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
        artist: {
          name: opts.artistName ?? 'Radiohead',
          album_count: opts.albumCount ?? 2,
          // Emitted by `formatArtist()` on BOTH shapes; the artist's whole-library
          // track total, which is what the header must show.
          ...(opts.trackCount === undefined ? {} : { track_count: opts.trackCount }),
        },
      }));
    }
    if (opts.albumsError && u.includes('/api/v1/music/albums')) {
      return Promise.reject(new Error('albums down'));
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

  it('navigates to the music-album route carrying BOTH the title and the artist', async () => {
    stubFetch();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage(router);
    await flushPromises();
    await w.find('.album-card').trigger('click');
    // The artist is the disambiguator: 2,622 of 5,091 production album titles are
    // shared between artists, so a title-only push resolves to the server's first
    // match and can open a DIFFERENT artist's album.
    expect(push).toHaveBeenCalledWith({
      name: 'music-album',
      params: { name: 'OK Computer' },
      query: { artist: 'Radiohead' },
    });
    w.unmount();
  });

  it('falls back to the route artist when an album row carries no artist', async () => {
    stubFetch({ albums: [{ name: 'Untitled', artist: 'Radiohead' } as ServerAlbum] });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage(router, 'Radiohead');
    await flushPromises();
    await w.find('.album-card').trigger('click');
    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ query: { artist: 'Radiohead' } }),
    );
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

  // ---- MED-1: the header counts must come from the DB, not from a page --------

  it('shows the artist track total from the server and keeps it STABLE across album pages', async () => {
    // 142 albums × 5 tracks = 710 for the artist; page 1 holds 100 albums (500
    // tracks' worth) and page 2 holds 42 (210). Summing the loaded page therefore
    // showed 500, then 210 — a count that both contradicted the DB and shrank as the
    // user paged. The server's `track_count` is the only stable, correct value.
    const albums = albumsFor('Radiohead', 142);
    stubFetch({ albums, albumCount: 142, trackCount: 710 });
    const w = mountPage(makeRouter());
    await flushPromises();

    expect(w.findAll('.album-card')).toHaveLength(100);
    expect(w.find('[data-count="albums"]').text()).toBe('142 albums');
    expect(w.find('[data-count="tracks"]').text()).toContain('710 tracks');
    // The page sum, which the old code showed. Pinned so a regression to it is
    // named rather than just "some other number".
    expect(w.find('[data-count="tracks"]').text()).not.toContain('500');

    await w.find('[data-nav="next"]').trigger('click');
    await flushPromises();

    expect(w.findAll('.album-card')).toHaveLength(42);
    expect(w.find('[data-count="albums"]').text()).toBe('142 albums');
    // SAME number on page 2 — the whole point.
    expect(w.find('[data-count="tracks"]').text()).toContain('710 tracks');
    expect(w.find('[data-count="tracks"]').text()).not.toContain('210');
    w.unmount();
  });

  it('formats the counts through the i18n catalog with thousands separators', async () => {
    stubFetch({ albums: albumsFor('Radiohead', 4), albumCount: 4, trackCount: 12345 });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('[data-count="tracks"]').text()).toContain('12,345 tracks');
    w.unmount();
  });

  it('uses the singular form for a one-album, one-track artist', async () => {
    stubFetch({ albums: albumsFor('Radiohead', 1), albumCount: 1, trackCount: 1 });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('[data-count="albums"]').text()).toBe('1 album');
    expect(w.find('[data-count="tracks"]').text()).toContain('1 track');
    expect(w.find('[data-count="tracks"]').text()).not.toContain('1 tracks');
    w.unmount();
  });

  it('falls back to summing the loaded page when the server sends no track_count', async () => {
    // Pre-S99 servers omit it; degrade rather than show nothing.
    stubFetch({ albums: albumsFor('Radiohead', 3), albumCount: 3 });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('[data-count="tracks"]').text()).toContain('15 tracks'); // 3 × 5
    w.unmount();
  });

  // ---- LOW-8: one loader, one failure policy ---------------------------------

  it('zeroes the album total when a LATER album page fails, like its sibling pages', async () => {
    stubFetch({ albums: albumsFor('Radiohead', 142), albumCount: 142, trackCount: 710 });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('[data-nav="info"]').text()).toContain('Page 1 of 2');

    // Page 2 fails. The duplicated loader used to clear `albums` but keep
    // `albumTotal`, so the pager went on paging a listing that was not on screen.
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('page down'))));
    await w.find('[data-nav="next"]').trigger('click');
    await flushPromises();

    expect(w.find('.album-card').exists(), 'the failed page must not leave stale cards').toBe(false);
    expect(
        w.find('.music-pager').exists(),
        'albumTotal must be zeroed: a pager here would page a listing that is no longer on screen',
    ).toBe(false);
    expect(w.find('.artist-albums__empty').exists(), 'the empty state must take over').toBe(true);
    w.unmount();
  });

  it('shows the error state when the album page fails on FIRST load', async () => {
    stubFetch({ albumsError: true });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.artist-page__error').exists()).toBe(true);
    expect(w.find('.music-pager').exists()).toBe(false);
    w.unmount();
  });
});
