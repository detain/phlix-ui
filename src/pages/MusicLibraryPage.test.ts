/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import MusicLibraryPage from './MusicLibraryPage.vue';

// ---------------------------------------------------------------------------
// Test data helpers — these mirror the REAL server music API shapes
// (snake_case, FLAT routes). The server groups by name (no artist/album PK),
// embeds raw scanner items under an album's `tracks`, and exposes no per-artist
// or per-album nested routes. The ApiClient normalizes these to camelCase.
// ---------------------------------------------------------------------------

interface ServerTrackItem {
  id: string;
  metadata: { title: string; duration_secs: number; track_number: number | null };
  /** Signed direct-play URL (present on /tracks + when a fixture opts in). */
  stream_url?: string;
}
interface ServerArtist {
  name: string;
  album_count: number;
  track_count: number;
  albums: string[];
}
interface ServerAlbum {
  name: string;
  artist: string;
  year: number | null;
  track_count: number;
  tracks: ServerTrackItem[];
}

function artist(over: Partial<ServerArtist> = {}): ServerArtist {
  return { name: 'The Flaming Lips', album_count: 2, track_count: 0, albums: [], ...over };
}

function album(over: Partial<ServerAlbum> = {}): ServerAlbum {
  return {
    name: 'Yoshimi Battles the Pink Robots',
    artist: 'The Flaming Lips',
    year: 1999,
    track_count: 10,
    tracks: [],
    ...over,
  };
}

function track(over: Partial<ServerTrackItem> = {}): ServerTrackItem {
  return { id: 't1', metadata: { title: 'Fight Test', duration_secs: 245, track_number: 1 }, ...over };
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

// ---------------------------------------------------------------------------
// Fake HTMLAudioElement
// ---------------------------------------------------------------------------

class FakeAudioElement {
  src = '';
  preload = 'none';
  currentTime = 0;
  duration = NaN;
  paused = true;
  volume = 1;
  private _listeners: Map<string, Set<(...args: unknown[]) => void>> = new Map();

  play = vi.fn(async () => { this.paused = false; });
  pause = vi.fn(() => { this.paused = true; });
  load = vi.fn(() => {
    this.duration = 245;
  });

  addEventListener(event: string, handler: (...args: unknown[]) => void): void {
    if (!this._listeners.has(event)) this._listeners.set(event, new Set());
    this._listeners.get(event)!.add(handler);
  }

  removeEventListener(event: string, handler: (...args: unknown[]) => void): void {
    this._listeners.get(event)?.delete(handler);
  }

  /** Dispatch a fake event to all registered listeners. */
  dispatchEvent(event: string, ...args: unknown[]): void {
    this._listeners.get(event)?.forEach((h) => h(...args));
  }
}

// ---------------------------------------------------------------------------
// Shared stores / mocks setup
// ---------------------------------------------------------------------------

let fetchStub: any;
let fakeAudio: FakeAudioElement;

function stubFetch(artistsList: ServerArtist[], albumsList: ServerAlbum[], tracksList: ServerTrackItem[]) {
  // Real server routes are FLAT: /api/v1/music/{artists,albums,tracks}. There
  // are no nested /artists/{id}/albums or /albums/{id}/tracks routes — the page
  // lists albums (filtered client-side by artist) and relies on the album's
  // embedded tracks, falling back to /tracks only when an album has none.
  fetchStub = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/music/albums')) {
      return Promise.resolve(jsonResponse({ albums: albumsList }));
    }
    if (u.includes('/api/v1/music/tracks')) {
      return Promise.resolve(jsonResponse({ tracks: tracksList }));
    }
    if (u.includes('/api/v1/music/artists')) {
      return Promise.resolve(jsonResponse({ artists: artistsList }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fetchStub);
}

// ---------------------------------------------------------------------------
// A prod-shaped FAKE MUSIC SERVER (S110).
//
// The stub above answers every request with the same whole list, which is exactly
// how the 100-of-2,197 bug survived review: a page that never sends `limit`/
// `offset` looks correct against a server that ignores them. This one behaves like
// the real endpoints instead:
//   - `/artists`             → ORDER BY name, sliced by ?limit/?offset, plus `total`
//   - `/albums`              → ORDER BY artist, title — sliced the SAME way, and
//                              filtered by ?artist= ONLY when that param is sent
//   - `/albums/{title}`      → detail: the album's WHOLE track list, ?artist= to
//                              disambiguate a title shared by several artists
// Because the album list is ordered globally by artist, its first page spans only
// a handful of artists — which is what made a client-side filter return nothing for
// everyone else. A page that filters client-side therefore FAILS these tests.
// ---------------------------------------------------------------------------

const PAGE_SIZE = 100;
/** Above this the server caps the tracks it embeds in a LIST row and flags it. */
const EMBED_CAP = 100;

interface FakeAlbum {
  name: string;
  artist: string;
  year: number;
  trackCount: number;
}

interface FakeLibrary {
  artists: { name: string; albumCount: number }[];
  albums: FakeAlbum[];
}

/** Zero-padded so lexicographic order equals numeric order, like `ORDER BY name`. */
function artistName(index: number): string {
  return `Artist ${String(index).padStart(4, '0')}`;
}

/**
 * Build a library of `artistCount` artists where `albumsFor(i)` gives the album
 * count of the i-th artist (1-based). Album titles are unique per artist and
 * sorted, so the global album order is (artist, title) — the real ORDER BY.
 */
function makeLibrary(artistCount: number, albumsFor: (i: number) => number): FakeLibrary {
  const artists: FakeLibrary['artists'] = [];
  const albums: FakeAlbum[] = [];
  for (let i = 1; i <= artistCount; i += 1) {
    const name = artistName(i);
    const count = albumsFor(i);
    artists.push({ name, albumCount: count });
    for (let j = 1; j <= count; j += 1) {
      albums.push({
        name: `${name} Album ${String(j).padStart(3, '0')}`,
        artist: name,
        year: 1990 + (j % 30),
        trackCount: 5,
      });
    }
  }
  return { artists, albums };
}

function fakeTracks(album: FakeAlbum, count: number): ServerTrackItem[] {
  const out: ServerTrackItem[] = [];
  for (let k = 1; k <= count; k += 1) {
    out.push({
      id: `${album.name}#${k}`,
      metadata: { title: `${album.name} Track ${k}`, duration_secs: 100 + k, track_number: k },
      stream_url: `/media/${encodeURIComponent(album.name)}-${k}/stream?exp=9&sig=a`,
    });
  }
  return out;
}

/** Shape one album LIST row: embedded tracks capped + flagged, like S99. */
function albumListRow(album: FakeAlbum): Record<string, unknown> {
  const embedded = Math.min(album.trackCount, EMBED_CAP);
  return {
    name: album.name,
    artist: album.artist,
    year: album.year,
    track_count: album.trackCount,
    tracks_truncated: embedded < album.trackCount,
    tracks: fakeTracks(album, embedded),
  };
}

interface FakeServer {
  fetch: ReturnType<typeof vi.fn>;
  /** Every requested URL, in order. */
  urls: () => string[];
  /** URLs for one endpoint prefix. */
  urlsFor: (prefix: string) => string[];
  library: FakeLibrary;
}

function stubMusicServer(library: FakeLibrary): FakeServer {
  const calls: string[] = [];
  const fetchFn = vi.fn((url: unknown) => {
    const raw = typeof url === 'string' ? url : '';
    calls.push(raw);
    const parsed = new URL(raw, 'http://server.test');
    const path = parsed.pathname;
    const limit = Math.min(PAGE_SIZE, Number(parsed.searchParams.get('limit') ?? PAGE_SIZE));
    const offset = Math.max(0, Number(parsed.searchParams.get('offset') ?? 0));
    const artistParam = (parsed.searchParams.get('artist') ?? '').trim();

    // --- album DETAIL: /api/v1/music/albums/{title}
    const albumDetail = /^\/api\/v1\/music\/albums\/(.+)$/.exec(path);
    if (albumDetail) {
      const title = decodeURIComponent(albumDetail[1]!);
      const found = library.albums.find(
        (a) => a.name === title
          && (artistParam === '' || a.artist.toLowerCase() === artistParam.toLowerCase()),
      );
      if (!found) return Promise.resolve(jsonResponse({ album: null }));
      return Promise.resolve(jsonResponse({
        album: {
          name: found.name,
          artist: found.artist,
          year: found.year,
          track_count: found.trackCount,
          // The detail route is exempt from the list route's per-album cap.
          tracks: fakeTracks(found, found.trackCount),
        },
      }));
    }

    // --- album LIST: /api/v1/music/albums
    if (path === '/api/v1/music/albums') {
      const rows = artistParam === ''
        ? library.albums
        : library.albums.filter((a) => a.artist.toLowerCase() === artistParam.toLowerCase());
      return Promise.resolve(jsonResponse({
        albums: rows.slice(offset, offset + limit).map(albumListRow),
        total: rows.length,
        limit,
        offset,
        artist: artistParam === '' ? null : artistParam,
      }));
    }

    // --- track DETAIL (the player resolves signed URLs through it)
    const trackDetail = /^\/api\/v1\/music\/tracks\/(.+)$/.exec(path);
    if (trackDetail) {
      const id = decodeURIComponent(trackDetail[1]!);
      return Promise.resolve(jsonResponse({
        track: { id, name: id, duration_secs: 1, stream_url: `/media/${id}/stream?exp=9&sig=a` },
      }));
    }

    // --- artist LIST: /api/v1/music/artists
    if (path === '/api/v1/music/artists') {
      const rows = library.artists.slice(offset, offset + limit);
      return Promise.resolve(jsonResponse({
        artists: rows.map((a) => ({
          name: a.name,
          album_count: a.albumCount,
          track_count: a.albumCount * 5,
          albums: [],
          image_url: null,
        })),
        total: library.artists.length,
        limit,
        offset,
      }));
    }

    return Promise.reject(new Error(`Unexpected fetch URL: ${raw}`));
  });
  vi.stubGlobal('fetch', fetchFn);
  return {
    fetch: fetchFn,
    urls: () => [...calls],
    urlsFor: (prefix: string) => calls.filter((u) => u.startsWith(prefix)),
    library,
  };
}

function providePinia() {
  const pinia = createPinia();
  setActivePinia(pinia);
  return pinia;
}

function mountPage() {
  return mount(MusicLibraryPage, {
    global: {
      plugins: [providePinia()],
      stubs: {
        MusicArtistCard: {
          props: ['artist'],
          // Declare the emit (like the real component) so `@click` is treated as
          // a component event, not a native DOM click that also falls through to
          // the parent handler — otherwise selectArtist fires twice (once with
          // the artist, once with a MouseEvent).
          emits: ['click'],
          template: '<button class="artist-card" @click="$emit(\'click\', artist)">{{ artist.name }}</button>',
        },
        MusicAlbumCard: {
          props: ['album'],
          emits: ['click'],
          template: '<button class="album-card" @click="$emit(\'click\', album)">{{ album.title }}</button>',
        },
        MusicTrackList: {
          props: ['tracks', 'playingTrackId', 'loading'],
          emits: ['play'],
          template:
            '<div class="track-list" :data-playing="playingTrackId ?? \'\'">'
            + '<button v-for="tk in tracks" :key="tk.id" class="track-play" :data-id="tk.id" @click="$emit(\'play\', tk)">{{ tk.title }}</button>'
            + '</div>',
        },
        Icon: { template: '<span class="icon" />' },
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MusicLibraryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Replace Audio with a fake for the player (`new Audio()` needs a real
    // constructor — a vi.fn arrow cannot be `new`-ed).
    fakeAudio = new FakeAudioElement();
    function AudioMock(this: unknown) { return fakeAudio; }
    vi.stubGlobal('Audio', AudioMock as unknown as typeof Audio);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ---- Rendering -----------------------------------------------------------

  it('renders the artists grid on mount', async () => {
    stubFetch([artist({ name: 'Radiohead' })], [], []);
    const wrapper = mountPage();
    await flushPromises();

    const cards = wrapper.findAll('.artist-card');
    expect(cards).toHaveLength(1);
    expect(cards[0].text()).toContain('Radiohead');
  });

  it('shows empty state when no artists exist', async () => {
    stubFetch([], [], []);
    const wrapper = mountPage();
    await flushPromises();
    expect(wrapper.find('.music-page__empty').exists()).toBe(true);
  });

  it('calls fetchArtists on mount', async () => {
    const artistsList = [artist()];
    stubFetch(artistsList, [], []);
    mountPage();
    await flushPromises();

    expect(fetchStub).toHaveBeenCalled();
    const calledUrl = fetchStub.mock.calls[0][0] as string;
    expect(calledUrl).toContain('/api/v1/music/artists');
  });

  // ---- Artist → Album navigation -------------------------------------------

  it('navigates to albums view and fetches albums when artist is clicked', async () => {
    const artistsList = [artist({ name: 'Radiohead' })];
    const albumsList = [album({ name: 'OK Computer', artist: 'Radiohead' })];
    stubFetch(artistsList, albumsList, []);

    const wrapper = mountPage();
    await flushPromises();

    // Click the artist card.
    await wrapper.find('.artist-card').trigger('click');
    await flushPromises();

    // Should now show album cards (title normalized from the server `name`).
    const albumCards = wrapper.findAll('.album-card');
    expect(albumCards).toHaveLength(1);
    expect(albumCards[0].text()).toContain('OK Computer');

    // Should have fetched albums from the FLAT albums route.
    const albumFetchCalls = fetchStub.mock.calls.filter(
      (c: unknown[]) => (c[0] as string).includes('/api/v1/music/albums'),
    );
    expect(albumFetchCalls).toHaveLength(1);
  });

  // ---- Album → Tracks navigation ------------------------------------------

  it('navigates to tracks view when album is clicked', async () => {
    const artistsList = [artist()];
    const albumsList = [album({ tracks: [track({ id: 't1' }), track({ id: 't2' })] })];
    // Album has embedded tracks, so no fetch needed
    stubFetch(artistsList, albumsList, []);

    const wrapper = mountPage();
    await flushPromises();

    // Click artist → albums.
    await wrapper.find('.artist-card').trigger('click');
    await flushPromises();

    // Click album → tracks.
    await wrapper.find('.album-card').trigger('click');
    await flushPromises();

    // Should show the track list (MusicTrackList is stubbed but rendered).
    expect(wrapper.find('.track-list').exists()).toBe(true);

    // No tracks fetch since the album carries its embedded (normalized) tracks.
    const tracksFetchCalls = fetchStub.mock.calls.filter(
      (c: unknown[]) => (c[0] as string).includes('/api/v1/music/tracks'),
    );
    expect(tracksFetchCalls).toHaveLength(0);
  });

  // ---- Playback -----------------------------------------------------------

  // UI-3.6 / X8 — playback now consumes the server's signed `stream_url`.
  it('plays a track: sets <audio>.src to the signed stream_url and starts playback', async () => {
    const streamUrl = '/media/t42/stream?exp=9999999999&sig=deadbeef';
    const artistsList = [artist()];
    const albumsList = [
      album({
        tracks: [
          track({
            id: 't42',
            metadata: { title: 'Test Track', duration_secs: 200, track_number: 1 },
            stream_url: streamUrl,
          }),
        ],
      }),
    ];
    stubFetch(artistsList, albumsList, []);

    const wrapper = mountPage();
    await flushPromises();

    // Artist → albums → tracks.
    await wrapper.find('.artist-card').trigger('click');
    await flushPromises();
    await wrapper.find('.album-card').trigger('click');
    await flushPromises();

    expect(wrapper.find('.track-list').exists()).toBe(true);

    // Click the track's play button (emits play with the normalized MusicTrack).
    await wrapper.find('.track-play').trigger('click');
    await flushPromises();

    // The active <audio> element was pointed at the signed stream_url and played.
    expect(fakeAudio.play).toHaveBeenCalled();
    expect(fakeAudio.src).toBe(streamUrl);

    // The now-playing highlight reflects the current track, and the transport
    // bar renders.
    expect(wrapper.find('.track-list').attributes('data-playing')).toBe('t42');
    expect(wrapper.find('.music-bar').exists()).toBe(true);
  });

  it('toggles pause when the currently-playing track is played again', async () => {
    const streamUrl = '/media/t7/stream?exp=1&sig=ab';
    const artistsList = [artist()];
    const albumsList = [
      album({
        tracks: [
          track({ id: 't7', metadata: { title: 'Loop', duration_secs: 100, track_number: 1 }, stream_url: streamUrl }),
        ],
      }),
    ];
    stubFetch(artistsList, albumsList, []);

    const wrapper = mountPage();
    await flushPromises();
    await wrapper.find('.artist-card').trigger('click');
    await flushPromises();
    await wrapper.find('.album-card').trigger('click');
    await flushPromises();

    await wrapper.find('.track-play').trigger('click');
    await flushPromises();
    expect(wrapper.find('.track-list').attributes('data-playing')).toBe('t7');

    // Playing the same track again pauses it.
    await wrapper.find('.track-play').trigger('click');
    await flushPromises();
    expect(fakeAudio.pause).toHaveBeenCalled();
    expect(wrapper.find('.track-list').attributes('data-playing')).toBe('');
  });

  it('surfaces a stream error in the transport bar when the signed URL is unavailable', async () => {
    // Album track carries NO stream_url; the getTrack fast-path resolve also
    // yields none (the /tracks/{id} stub returns no `track`), so the player
    // cannot resolve a playable URL and sets error='stream-unavailable'.
    const artistsList = [artist()];
    const albumsList = [
      album({
        tracks: [
          track({ id: 'tX', metadata: { title: 'Broken', duration_secs: 100, track_number: 1 } }),
        ],
      }),
    ];
    stubFetch(artistsList, albumsList, []);

    const wrapper = mountPage();
    await flushPromises();
    await wrapper.find('.artist-card').trigger('click');
    await flushPromises();
    await wrapper.find('.album-card').trigger('click');
    await flushPromises();

    await wrapper.find('.track-play').trigger('click');
    await flushPromises();

    // The transport bar renders and shows the error state (not a silent failure).
    expect(wrapper.find('.music-bar').exists()).toBe(true);
    const err = wrapper.find('.music-bar__error');
    expect(err.exists()).toBe(true);
    expect(err.text()).toContain('Playback unavailable');
  });

  // ---- Gapless / Crossfade settings in usePreferencesStore ---------------

  it('reads gaplessEnabled and crossfadeDuration from usePreferencesStore', async () => {
    // Verify the preferences store is correctly set up.
    const pinia = createPinia();
    setActivePinia(pinia);
    const prefsStore = await import('../stores/usePreferencesStore');
    const store = prefsStore.usePreferencesStore();

    expect(store.gaplessEnabled).toBe(true); // default from DEFAULT_PREFERENCES
    expect(store.crossfadeDuration).toBe(0); // default
  });

  // =========================================================================
  // S110 — paging + server-side artist filter, against the prod-shaped fake
  // server. The numbers below are production's: 2,197 artists / 5,091 albums.
  // =========================================================================
  describe('paging the library (S110)', () => {
    /**
     * 2,197 artists and EXACTLY 5,091 albums: two each, one artist with 142 (the
     * production maximum) and 557 others with three.
     * 2·2197 + 140 + 557 = 5,091.
     */
    function prodLibrary(): FakeLibrary {
      return makeLibrary(2197, (i) => (i === 1 ? 142 : i <= 558 ? 3 : 2));
    }

    it('the fixture reproduces production: 2,197 artists / 5,091 albums', () => {
      const lib = prodLibrary();
      expect(lib.artists).toHaveLength(2197);
      expect(lib.albums).toHaveLength(5091);
    });

    it('asks for one page and shows the DB total, not the page length', async () => {
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      // The request is paged…
      expect(server.urlsFor('/api/v1/music/artists')[0]).toBe(
        '/api/v1/music/artists?limit=100&offset=0',
      );
      // …the grid holds one page…
      expect(wrapper.findAll('.artist-card')).toHaveLength(100);
      // …and the true size is on screen. THIS is the bug's user-visible half:
      // before S110 nothing on the page distinguished 100 artists from 2,197.
      expect(wrapper.find('[data-count="artists"]').text()).toBe('2,197 artists');
      expect(wrapper.find('[data-pager="artists"] [data-nav="info"]').text())
        .toContain('Page 1 of 22');
      wrapper.unmount();
    });

    it('reaches the 2,197th artist — the last page is one click away', async () => {
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      await wrapper.find('[data-pager="artists"] [data-nav="last"]').trigger('click');
      await flushPromises();

      expect(server.urlsFor('/api/v1/music/artists')).toContain(
        '/api/v1/music/artists?limit=100&offset=2100',
      );
      const cards = wrapper.findAll('.artist-card');
      expect(cards).toHaveLength(97); // 2197 − 2100
      expect(cards[96]!.text()).toContain(artistName(2197));
      expect(wrapper.find('[data-pager="artists"] [data-nav="info"]').text())
        .toContain('Page 22 of 22');
      wrapper.unmount();
    });

    it('walks every artist page and covers all 2,197 artists exactly once', async () => {
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      const seen = new Set<string>();
      for (let page = 1; page <= 22; page += 1) {
        for (const card of wrapper.findAll('.artist-card')) seen.add(card.text());
        if (page < 22) {
          await wrapper.find('[data-pager="artists"] [data-nav="next"]').trigger('click');
          await flushPromises();
        }
      }

      // Every artist reachable, none duplicated → the pager's offsets tile the
      // library with no gap and no overlap.
      expect(seen.size).toBe(2197);
      expect(seen.has(artistName(1))).toBe(true);
      expect(seen.has(artistName(2197))).toBe(true);
      expect(server.urlsFor('/api/v1/music/artists')).toHaveLength(22);
      wrapper.unmount();
    });

    it('jumps straight to an arbitrary artist page', async () => {
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      await wrapper.find('[data-pager="artists"] [data-nav="jump"]').setValue('14');
      await flushPromises();

      expect(server.urlsFor('/api/v1/music/artists')).toContain(
        '/api/v1/music/artists?limit=100&offset=1300',
      );
      expect(wrapper.findAll('.artist-card')[0]!.text()).toContain(artistName(1301));
      wrapper.unmount();
    });

    it('drill-down asks the SERVER to filter by artist', async () => {
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();

      const albumCalls = server.urlsFor('/api/v1/music/albums');
      expect(albumCalls).toHaveLength(1);
      // URLSearchParams encodes the space as `+`.
      expect(albumCalls[0]).toBe('/api/v1/music/albums?limit=100&offset=0&artist=Artist+0001');
      wrapper.unmount();
    });

    // ---- the 77-of-100 defect, pinned ------------------------------------
    //
    // Measured by the S99 reviewer against production: page 1 of `/albums` spans
    // only 23 distinct artists, so filtering it client-side left 77 of the 100
    // visible artists with an EMPTY album list. The next two tests establish both
    // halves against the fake server: first that the old strategy really would
    // return nothing, then that the new one returns the right albums.

    it('page 1 of /albums spans a handful of artists — so client-side filtering CANNOT work', async () => {
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      // What the old code fetched: the first unfiltered album page.
      const res = await (globalThis.fetch as unknown as (u: string) => Promise<Response>)(
        '/api/v1/music/albums?limit=100&offset=0',
      );
      const body = (await res.json()) as { albums: { artist: string }[] };
      const spanned = new Set(body.albums.map((a) => a.artist));

      // 142 albums for Artist 0001 alone → page 1 is ONE artist here, 23 on
      // production. Either way it is a tiny fraction of the 100 on screen.
      expect(spanned.size).toBeLessThan(5);
      const visible = wrapper.findAll('.artist-card').map((c) => c.text());
      expect(visible).toHaveLength(100);
      const resolvableByClientFilter = visible.filter((name) =>
        [...spanned].some((a) => name.includes(a)),
      );
      // ⇒ 99 of the 100 visible artists would drill down EMPTY with the old
      // client-side filter. That is the defect, reproduced.
      expect(resolvableByClientFilter.length).toBeLessThan(5);
      void server;
      wrapper.unmount();
    });

    it('every artist on the LAST page drills down to its own, correct albums', async () => {
      // These are the worst case for the old code: their albums sit past offset
      // 4,900 of `/albums`, so page 1 could never contain them.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      await wrapper.find('[data-pager="artists"] [data-nav="last"]').trigger('click');
      await flushPromises();

      const count = wrapper.findAll('.artist-card').length;
      expect(count).toBe(97);

      let emptyDrillDowns = 0;
      for (let i = 0; i < count; i += 1) {
        const cards = wrapper.findAll('.artist-card');
        const name = cards[i]!.text();
        await cards[i]!.trigger('click');
        await flushPromises();

        const albums = wrapper.findAll('.album-card').map((c) => c.text());
        if (albums.length === 0) emptyDrillDowns += 1;
        // Right albums, not just some albums: every title belongs to this artist.
        expect(albums.every((title) => title.startsWith(name))).toBe(true);
        expect(wrapper.find('[data-count="albums"]').text()).toBe('2 albums');

        await wrapper.find('.music-page__crumb').trigger('click');
        await flushPromises();
      }

      // 0 empty, where the old client-side filter gave 97 empty.
      expect(emptyDrillDowns).toBe(0);
      // One filtered album request per artist, each naming that artist.
      expect(server.urlsFor('/api/v1/music/albums')).toHaveLength(97);
      expect(server.urlsFor('/api/v1/music/albums').every((u) => u.includes('artist='))).toBe(true);
      wrapper.unmount();
      // 97 real drill-downs, each re-rendering the 97-card grid: this one earns a
      // longer budget than the 5 s default (it runs in ~2 s alone, but the suite
      // runs 200+ files in parallel).
    }, 30000);

    it('keeps the artist page when returning from an album list', async () => {
      stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      await wrapper.find('[data-pager="artists"] [data-nav="jump"]').setValue('7');
      await flushPromises();
      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();
      await wrapper.find('.music-page__crumb').trigger('click');
      await flushPromises();

      // Back on page 7, not dumped at page 1.
      expect(wrapper.find('[data-pager="artists"] [data-nav="info"]').text())
        .toContain('Page 7 of 22');
      expect(wrapper.findAll('.artist-card')[0]!.text()).toContain(artistName(601));
      wrapper.unmount();
    });

    it('pages the albums of an artist who has more than one page of them', async () => {
      // Artist 0001 holds 142 albums — production's maximum, and more than the
      // 100-row page, so albums 101-142 are unreachable without an album pager.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();

      expect(wrapper.findAll('.album-card')).toHaveLength(100);
      expect(wrapper.find('[data-count="albums"]').text()).toBe('142 albums');
      expect(wrapper.find('[data-pager="albums"] [data-nav="info"]').text())
        .toContain('Page 1 of 2');

      await wrapper.find('[data-pager="albums"] [data-nav="next"]').trigger('click');
      await flushPromises();

      expect(server.urlsFor('/api/v1/music/albums')).toContain(
        '/api/v1/music/albums?limit=100&offset=100&artist=Artist+0001',
      );
      const second = wrapper.findAll('.album-card');
      expect(second).toHaveLength(42);
      expect(second[41]!.text()).toContain(`${artistName(1)} Album 142`);
      wrapper.unmount();
    });

    it('does not show an album pager for an artist that fits on one page', async () => {
      stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      await wrapper.find('[data-pager="artists"] [data-nav="last"]').trigger('click');
      await flushPromises();

      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();

      expect(wrapper.findAll('.album-card')).toHaveLength(2);
      expect(wrapper.find('[data-pager="albums"] .music-pager').exists()).toBe(false);
      wrapper.unmount();
    });

    it('fetches the album detail when the embedded track list is a truncated prefix', async () => {
      // One 125-track album: the LIST row embeds 100 and flags it, the DETAIL
      // route returns all 125. Production has exactly two albums like this.
      const lib = makeLibrary(1, () => 1);
      lib.albums[0]!.trackCount = 125;
      const server = stubMusicServer(lib);
      const wrapper = mountPage();
      await flushPromises();

      await wrapper.find('.artist-card').trigger('click');
      await flushPromises();
      await wrapper.find('.album-card').trigger('click');
      await flushPromises();

      // The whole album is playable, not the first 100 tracks…
      expect(wrapper.findAll('.track-play')).toHaveLength(125);
      // …and it came from the album DETAIL route, carrying the artist so a shared
      // title cannot resolve to another artist's album.
      const detail = server.urls().filter((u) => /\/api\/v1\/music\/albums\/.+/.test(u));
      expect(detail).toHaveLength(1);
      expect(detail[0]).toContain('artist=Artist+0001');
      // NOT the /tracks listing, which has no album filter.
      expect(server.urlsFor('/api/v1/music/tracks?')).toHaveLength(0);
      wrapper.unmount();
    });

    it('does not re-fetch an album whose embedded track list is complete', async () => {
      const server = stubMusicServer(makeLibrary(1, () => 1));
      const wrapper = mountPage();
      await flushPromises();

      await wrapper.find('.artist-card').trigger('click');
      await flushPromises();
      await wrapper.find('.album-card').trigger('click');
      await flushPromises();

      expect(wrapper.findAll('.track-play')).toHaveLength(5);
      expect(server.urls().filter((u) => /\/api\/v1\/music\/albums\/.+/.test(u))).toHaveLength(0);
      wrapper.unmount();
    });

    it('keeps the truncated prefix playable when the album detail request fails', async () => {
      const lib = makeLibrary(1, () => 1);
      lib.albums[0]!.trackCount = 125;
      stubMusicServer(lib);
      const wrapper = mountPage();
      await flushPromises();
      await wrapper.find('.artist-card').trigger('click');
      await flushPromises();

      // Break only the detail route, after the list page has been served.
      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('detail down'))));
      await wrapper.find('.album-card').trigger('click');
      await flushPromises();

      // Degraded, not blank: the 100 embedded tracks still play.
      expect(wrapper.findAll('.track-play')).toHaveLength(100);
      wrapper.unmount();
    });

    it('shows an empty grid and no pager when the artists request fails', async () => {
      stubMusicServer(prodLibrary());
      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('artists down'))));
      const wrapper = mountPage();
      await flushPromises();

      expect(wrapper.find('.music-page__empty').exists()).toBe(true);
      expect(wrapper.find('[data-count="artists"]').text()).toBe('0 artists');
      expect(wrapper.find('[data-pager="artists"] .music-pager').exists()).toBe(false);
      wrapper.unmount();
    });

    it('renders the singular count for a one-artist library', async () => {
      stubMusicServer(makeLibrary(1, () => 1));
      const wrapper = mountPage();
      await flushPromises();
      expect(wrapper.find('[data-count="artists"]').text()).toBe('1 artist');
      wrapper.unmount();
    });
  });
});
