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
import MusicPager from '../components/MusicPager.vue';

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
//
// KNOWN, DELIBERATE APPROXIMATIONS vs `phlix-server` (verified in S110 review r1 —
// recorded here so the next reader does not mistake the fake for authoritative):
//   1. The real server ALSO applies a 2,000-row PER-PAGE ceiling to embedded tracks
//      that degrades round-robin (`MusicLibraryService::MAX_EMBEDDED_ROWS`), so a
//      full 100-album page embeds ~20 tracks/album and `tracks_truncated` fires far
//      more often in production than here. The fake is strictly MORE generous and
//      the client is flag-driven, so no client behaviour is masked; modelling it
//      would be dead code at this fixture's 5 tracks/album.
//   2. `?artist=` here folds case AND accents via `localeCompare(sensitivity:'base')`
//      to approximate `utf8mb4_unicode_ci` (so `bjork` matches `Björk`). It is an
//      approximation of a MySQL collation, not a reimplementation of it.
// Everything else the client reads was verified field-identical: no `{success,data}`
// envelope, `{artists|albums|tracks, total, limit, offset[, artist]}`, `?limit=`
// clamped to [1,100], `ORDER BY ar.name, al.title`, snake_case `tracks_truncated`,
// `albums_truncated`, `album_art_url`, 404 + `{error}` for a missing album, and a
// detail route exempt from the per-album embed cap.
// ---------------------------------------------------------------------------

const PAGE_SIZE = 100;
/** `PageLimit::MIN` — the real server clamps `?limit=` up to 1, never to 0. */
const PAGE_SIZE_MIN = 1;
/** Above this the server caps the tracks it embeds in a LIST row and flags it. */
const EMBED_CAP = 100;

/** `utf8mb4_unicode_ci`-ish: case- AND accent-insensitive equality. */
function collationEquals(a: string, b: string): boolean {
  return a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0;
}

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
    // Real emitted field the client currently ignores — present so the fake is not
    // quietly narrower than the wire.
    album_art_url: null,
    track_count: album.trackCount,
    tracks_truncated: embedded < album.trackCount,
    tracks: fakeTracks(album, embedded),
  };
}

/** A 404 + `{error}`, which is what the real album-detail route returns. */
function notFoundResponse(message: string): Response {
  return {
    ok: false,
    status: 404,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => ({ error: message }),
    text: async () => JSON.stringify({ error: message }),
  } as unknown as Response;
}

interface FakeServer {
  /** Call the fake endpoint directly — used to show what the OLD code fetched. */
  request: (url: string) => Promise<Response>;
  /** The stub itself, to re-install after a test temporarily breaks `fetch`. */
  fetchImpl: typeof fetch;
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
    // `PageLimit::clamp` — [MIN, MAX], not just "at most MAX".
    const limit = Math.max(
      PAGE_SIZE_MIN,
      Math.min(PAGE_SIZE, Number(parsed.searchParams.get('limit') ?? PAGE_SIZE)),
    );
    const offset = Math.max(0, Number(parsed.searchParams.get('offset') ?? 0));
    const artistParam = (parsed.searchParams.get('artist') ?? '').trim();

    // --- album DETAIL: /api/v1/music/albums/{title}
    const albumDetail = /^\/api\/v1\/music\/albums\/(.+)$/.exec(path);
    if (albumDetail) {
      const title = decodeURIComponent(albumDetail[1]!);
      const found = library.albums.find(
        (a) => a.name === title
          && (artistParam === '' || collationEquals(a.artist, artistParam)),
      );
      // The real route 404s (it does NOT answer 200 with `album: null`), so the
      // client's ApiError path is the one exercised here too.
      if (!found) return Promise.resolve(notFoundResponse('Album not found'));
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
        : library.albums.filter((a) => collationEquals(a.artist, artistParam));
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
          // Real emitted field the client currently ignores — see the header note.
          albums_truncated: false,
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
    request: fetchFn as unknown as (url: string) => Promise<Response>,
    fetchImpl: fetchFn as unknown as typeof fetch,
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
  // S118 (completion) — an explicit budget for this whole describe, above the
  // GLOBAL `testTimeout`, not equal to it.
  //
  // `vite.config.ts`'s global default was raised 5 000 → 30 000 ms by 39092c5d
  // (2026-08-01), which is AFTER S118 granted three specific sites an explicit
  // 30 000. A global raised to an override's own value silently DELETES that
  // override: the literal still reads as deliberate but grants nothing. The
  // per-test `30000` at the end of "every artist on the LAST page…" below was
  // exactly that, and it is the one that was measured to be in trouble —
  // 19 960 ms of its 30 000 ms budget in a PASSING full-suite verbose run, i.e.
  // 1.50x headroom. Two of twenty consecutive `npm run test:run` invocations
  // then went red here, both on the two slowest runs of the twenty (77 s and
  // 82 s against a 37 s median). The second casualty on one of those runs —
  // "an album request abandoned by a view change…", which measures 117 ms —
  // was collateral: vitest runs a file's tests serially in one worker, so the
  // 20 s sibling starves whatever else is executing when the clock expires.
  // Hence a floor on the describe as well as a raise on the one heavy test.
  describe('paging the library (S110)', { timeout: 60_000 }, () => {
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
      const res = await server.request('/api/v1/music/albums?limit=100&offset=0');
      const body = (await res.json()) as { albums: { artist: string }[] };
      // Cardinality pin FIRST: an empty album page would otherwise satisfy every
      // `toBeLessThan` below and let this test pass for the wrong reason.
      expect(body.albums).toHaveLength(100);
      const spanned = new Set(body.albums.map((a) => a.artist));

      // 142 albums for Artist 0001 alone → page 1 is exactly ONE artist here, 23 on
      // production. Either way it is a tiny fraction of the 100 on screen. Bounded on
      // BOTH sides: `>= 1` because a real page always spans at least one artist.
      expect(spanned.size).toBeGreaterThanOrEqual(1);
      expect(spanned.size).toBeLessThan(5);
      const visible = wrapper.findAll('.artist-card').map((c) => c.text());
      expect(visible).toHaveLength(100);
      const resolvableByClientFilter = visible.filter((name) =>
        [...spanned].some((a) => name.includes(a)),
      );
      // ⇒ 99 of the 100 visible artists would drill down EMPTY with the old
      // client-side filter. That is the defect, reproduced. Again two-sided: the one
      // artist that page 1 DOES span is on screen, so this is never 0 either.
      expect(resolvableByClientFilter.length).toBeGreaterThanOrEqual(1);
      expect(resolvableByClientFilter.length).toBeLessThan(5);
      expect(visible.length - resolvableByClientFilter.length).toBeGreaterThanOrEqual(96);
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

      // Collected, then asserted in aggregate: a per-iteration expect would report
      // "expected 0 to be 2" for artist #2101 and say nothing about the other 96.
      const results: { name: string; albums: string[]; countText: string }[] = [];
      for (let i = 0; i < count; i += 1) {
        const cards = wrapper.findAll('.artist-card');
        const name = cards[i]!.text();
        await cards[i]!.trigger('click');
        await flushPromises();
        results.push({
          name,
          albums: wrapper.findAll('.album-card').map((c) => c.text()),
          countText: wrapper.find('[data-count="albums"]').text(),
        });
        await wrapper.find('.music-page__crumb').trigger('click');
        await flushPromises();
      }

      // THE defect: with the old client-side filter every one of these 97 came
      // back empty. The failure diff names them, so a regression is unmistakable.
      expect(results.filter((r) => r.albums.length === 0).map((r) => r.name)).toEqual([]);
      // Right albums, not just some albums: each artist has exactly its own two.
      expect(results.filter((r) => r.albums.length !== 2).map((r) => r.name)).toEqual([]);
      expect(
        results.filter((r) => !r.albums.every((t) => t.startsWith(r.name))).map((r) => r.name),
      ).toEqual([]);
      // And the count shown is the artist's, not the whole library's.
      expect([...new Set(results.map((r) => r.countText))]).toEqual(['2 albums']);
      // One filtered album request per artist, each naming that artist.
      expect(server.urlsFor('/api/v1/music/albums')).toHaveLength(97);
      expect(server.urlsFor('/api/v1/music/albums').every((u) => u.includes('artist='))).toBe(true);
      wrapper.unmount();
      // 97 real drill-downs, each re-rendering the 97-card grid: this one earns a
      // longer budget than the global default (it runs in ~2 s alone, but the
      // suite runs 200+ files in parallel).
      //
      // S118 (completion): this was `30000`, which stopped meaning anything the
      // moment 39092c5d raised the GLOBAL default to the same 30 000 ms.
      // Measured at 19 960 ms under the full parallel suite on a run that
      // PASSED — 1.50x headroom, thinner than anything S118 originally fixed —
      // and it duly went red twice in twenty runs. 120 000 ms is 6.0x the
      // measured cost and matches the budget S118 itself chose for the same
      // class of "the work is genuinely this expensive" case at
      // `src/__tests__/dist-player-split.test.ts:113`. Underscored so a future
      // global raise cannot quietly equal it without someone reading this.
    }, 120_000);

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
      // `data-pager` lands on the pager's ROOT <nav class="music-pager">, so assert on
      // the nav ITSELF — `[data-pager] .music-pager` would ask for a descendant that
      // cannot exist and would pass vacuously for any `toBe(false)`.
      expect(wrapper.find('[data-pager="albums"]').exists()).toBe(false);
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

    it('states the error and shows no pager when the FIRST artists request fails', async () => {
      stubMusicServer(prodLibrary());
      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('artists down'))));
      const wrapper = mountPage();
      await flushPromises();

      expect(wrapper.find('.music-page__error').exists(), 'the failure must be stated').toBe(true);
      expect(
        wrapper.find('.music-page__empty').exists(),
        'a failure must never render as the "No artists" empty state',
      ).toBe(false);
      // Nothing was ever loaded, so `total` is genuinely 0 and the pager correctly
      // hides itself — no special case needed.
      expect(wrapper.find('[data-pager="artists"]').exists()).toBe(false);
      wrapper.unmount();
    });

    it('a failed artist page keeps the grid, the count and the pager navigable', async () => {
      // The dead end this closes was NEW with S110's pager: zeroing `total` on
      // failure removed the pager, so a blip on page 7 of 22 left an empty grid, no
      // pager, and a false "No artists".
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      await wrapper.find('[data-pager="artists"] [data-nav="jump"]').setValue('7');
      await flushPromises();
      expect(wrapper.findAll('.artist-card')).toHaveLength(100);
      expect(wrapper.find('[data-pager="artists"] [data-nav="info"]').text())
        .toContain('Page 7 of 22');

      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('page down'))));
      await wrapper.find('[data-pager="artists"] [data-nav="next"]').trigger('click');
      await flushPromises();

      expect(wrapper.find('.music-page__error').exists(), 'the failure must be stated').toBe(true);
      expect(
        wrapper.findAll('.artist-card'),
        'page 7 must still be on screen — a blip must not discard it',
      ).toHaveLength(100);
      expect(
        wrapper.find('[data-pager="artists"]').exists(),
        'the pager must survive so the user is not stranded on a failed page',
      ).toBe(true);
      expect(
        wrapper.find('[data-count="artists"]').text(),
        'the library size is still known',
      ).toBe('2,197 artists');
      expect(
        wrapper.find('.music-page__empty').exists(),
        'a failure must never render as "No artists"',
      ).toBe(false);

      // And the user can navigate out of it.
      vi.stubGlobal('fetch', server.fetchImpl);
      await wrapper.find('[data-pager="artists"] [data-nav="first"]').trigger('click');
      await flushPromises();
      expect(wrapper.findAll('.artist-card')[0]!.text()).toContain(artistName(1));
      expect(wrapper.find('.music-page__error').exists(), 'the banner clears on success').toBe(false);
      wrapper.unmount();
    });

    it('a failed ALBUM page keeps that artist\'s albums and pager', async () => {
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      // Artist 0001 has 142 albums → 2 pages.
      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();
      expect(wrapper.findAll('.album-card')).toHaveLength(100);

      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('page down'))));
      await wrapper.find('[data-pager="albums"] [data-nav="next"]').trigger('click');
      await flushPromises();

      expect(wrapper.find('.music-page__error').exists()).toBe(true);
      expect(wrapper.findAll('.album-card'), 'the albums stay on screen').toHaveLength(100);
      expect(
        wrapper.find('[data-pager="albums"]').exists(),
        'the album pager must survive too',
      ).toBe(true);
      expect(wrapper.find('.music-page__empty').exists()).toBe(false);
      void server;
      wrapper.unmount();
    });

    it('drops the banner when the view changes — an alert must not outlive its view', async () => {
      // `error` is ONE ref shared by both listings and the banner is a `role="alert"`,
      // so a failed ALBUM page whose banner survives a Back click asserts a failure on
      // the healthy artists grid. `goToArtists()` deliberately does not re-fetch, so
      // clearing on view change (`setView`) is the ONLY thing that can dismiss it.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      // Artist 0001 has 142 albums → 2 pages, so page 2 is reachable and can fail.
      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();

      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('page down'))));
      await wrapper.find('[data-pager="albums"] [data-nav="next"]').trigger('click');
      await flushPromises();
      expect(
        wrapper.find('.music-page__error').exists(),
        'the album page must really have failed, or this test proves nothing',
      ).toBe(true);

      vi.stubGlobal('fetch', server.fetchImpl);
      const requestsBefore = server.urls().length;
      await wrapper.find('.music-page__back').trigger('click');
      await flushPromises();

      expect(
        wrapper.findAll('.artist-card'),
        'the artists grid is healthy and still loaded',
      ).toHaveLength(100);
      expect(
        server.urls().length,
        'going back must NOT re-fetch — which is exactly why the view change has to clear it',
      ).toBe(requestsBefore);
      expect(
        wrapper.find('.music-page__error').exists(),
        'an alert about a failed ALBUM page must not be announced on the artists grid',
      ).toBe(false);
      wrapper.unmount();
    });

    it('does not resurrect the album banner when coming back from the track list', async () => {
      // The tracks view used to hide the banner with a `view !== 'tracks'` template
      // guard while `error` stayed set underneath, so stepping into an album and back
      // out re-announced a failure for a page that was never on screen.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();

      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('page down'))));
      await wrapper.find('[data-pager="albums"] [data-nav="next"]').trigger('click');
      await flushPromises();
      expect(wrapper.find('.music-page__error').exists(), 'the album page really failed').toBe(true);

      // Into the track list (the album row embeds its tracks, so nothing is fetched)…
      vi.stubGlobal('fetch', server.fetchImpl);
      await wrapper.findAll('.album-card')[0]!.trigger('click');
      await flushPromises();
      expect(wrapper.find('.track-list').exists(), 'must really be on the tracks view').toBe(true);
      expect(
        wrapper.find('.music-page__error').exists(),
        'the tracks view has nothing to report',
      ).toBe(false);

      // …and back out to the album list the user actually has on screen.
      await wrapper.find('.music-page__back').trigger('click');
      await flushPromises();
      expect(
        wrapper.findAll('.album-card'),
        'back on the album page the user came from',
      ).toHaveLength(100);
      expect(
        wrapper.find('.music-page__error').exists(),
        'the banner must not come back from the dead — the page it described was never shown',
      ).toBe(false);
      wrapper.unmount();
    });

    it('an album request abandoned by a view change must not re-arm the banner', async () => {
      // `setView` clears `error` SYNCHRONOUSLY, at click time; a rejected request's
      // `catch` runs LATER — so the clear alone cannot stop a request the user walked
      // away from re-arming the `role="alert"` banner over the artists grid it does not
      // describe. Only the generation guard closes that window.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      expect(wrapper.findAll('.artist-card'), 'the artists grid is loaded').toHaveLength(100);

      // Hold the album page open: a hand-held promise, so the request is still in
      // flight while the user navigates, instead of settling inside the same flush.
      let rejectAlbums: (reason: Error) => void = () => {};
      const holdFetch = vi.fn(() => new Promise<Response>((_resolve, reject) => {
        rejectAlbums = reject;
      }));
      vi.stubGlobal('fetch', holdFetch);
      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();

      // PRECONDITION 1 — the view really did change: the breadcrumb only renders OFF
      // the artists view.
      expect(
        wrapper.find('.music-page__crumb-nav').exists(),
        'must really have navigated to the album list',
      ).toBe(true);
      // PRECONDITION 2 — the album request really is still in flight: the albums grid
      // holds its skeleton, and exactly one request was issued and has not settled.
      expect(
        wrapper.find('#music-albums-grid .music-page__loading').exists(),
        'the album page must really still be loading, or nothing is abandoned below',
      ).toBe(true);
      expect(holdFetch.mock.calls, 'exactly one album request is in flight').toHaveLength(1);
      expect(wrapper.find('.music-page__error').exists(), 'nothing has failed yet').toBe(false);

      // Back to the artists grid via the breadcrumb (`goToArtists`, which deliberately
      // does not re-fetch — so no later success can overwrite the stale banner either).
      await wrapper.find('.music-page__crumb').trigger('click');
      await flushPromises();
      // PRECONDITION 3 — really back on the artists view, and really without a re-fetch.
      expect(
        wrapper.find('.music-page__crumb-nav').exists(),
        'the breadcrumb is gone ⇒ definitively the artists view',
      ).toBe(false);
      expect(
        holdFetch.mock.calls,
        'coming back must NOT re-fetch, which is why nothing later clears the banner',
      ).toHaveLength(1);
      expect(
        wrapper.find('.music-page__error').exists(),
        'setView cleared the banner at click time',
      ).toBe(false);

      // …and only NOW does the abandoned request fail.
      rejectAlbums(new Error('album page down'));
      await flushPromises();

      // The 100 cards are back, which also pins the deliberate asymmetry: `loading` IS
      // reset unconditionally in `finally`, because nothing else takes the skeleton
      // down on a path that does not re-fetch.
      expect(
        wrapper.findAll('.artist-card'),
        'the artists grid is on screen, healthy, and its skeleton is gone',
      ).toHaveLength(100);
      expect(wrapper.find('.music-page__crumb-nav').exists(), 'still the artists view').toBe(false);
      expect(
        wrapper.find('.music-page__error').exists(),
        'a request the user walked away from must not announce its failure over a healthy grid',
      ).toBe(false);
      void server;
      wrapper.unmount();
    });

    it('a late album-detail resolve must not repopulate the tracks of an album the user left', async () => {
      // The same root cause on the other loader. There is no DOM face for this one:
      // every entry to the tracks view reassigns `tracks` first, and `loading` keeps the
      // album cards hidden until the detail request settles, so `tracks` itself is the
      // observable — hence the setup-binding assertions (the repo idiom, cf.
      // Player.test.ts / AmbientCanvas.test.ts).
      const lib = makeLibrary(1, () => 1);
      lib.albums[0]!.trackCount = 125; // truncated LIST row ⇒ the DETAIL fetch happens
      const server = stubMusicServer(lib);
      const wrapper = mountPage();
      await flushPromises();
      await wrapper.find('.artist-card').trigger('click');
      await flushPromises();

      // Hold the album DETAIL request open across the navigation.
      let resolveDetail: (value: Response) => void = () => {};
      const holdFetch = vi.fn((_url: unknown) => new Promise<Response>((resolve) => {
        resolveDetail = resolve;
      }));
      vi.stubGlobal('fetch', holdFetch);
      await wrapper.find('.album-card').trigger('click');
      await flushPromises();

      const vm = wrapper.vm as unknown as { tracks: { id: string }[] };
      // PRECONDITION 1 — on the tracks view, showing the truncated 100-track prefix.
      expect(wrapper.find('.track-list').exists(), 'must really be on the tracks view').toBe(true);
      expect(
        wrapper.findAll('.track-play'),
        'the truncated prefix is what is on screen',
      ).toHaveLength(100);
      // PRECONDITION 2 — the detail request really was sent and really has not landed
      // (the whole 125-track list is not here yet).
      expect(
        holdFetch.mock.calls.map((c) => String(c[0])).filter((u) => /\/music\/albums\/.+/.test(u)),
        'the album DETAIL request must really have been issued',
      ).toHaveLength(1);
      expect(vm.tracks, 'and must really still be pending').toHaveLength(100);

      // The user leaves before it lands.
      await wrapper.find('.music-page__back').trigger('click');
      await flushPromises();
      // PRECONDITION 3 — really off the tracks view, with `tracks` emptied by goBack().
      expect(
        wrapper.find('.track-list').exists(),
        'must really have left the tracks view',
      ).toBe(false);
      expect(vm.tracks, 'goBack() empties the list it was showing').toHaveLength(0);

      // …and only now does the abandoned request resolve, with the real 125-track body.
      resolveDetail(await server.request(
        `/api/v1/music/albums/${encodeURIComponent(lib.albums[0]!.name)}?artist=Artist+0001`,
      ));
      await flushPromises();

      expect(
        vm.tracks,
        'a resolve the user walked away from must not repopulate the track list',
      ).toHaveLength(0);
      expect(
        wrapper.findAll('.album-card'),
        'and the album list the user IS looking at came back, skeleton gone',
      ).toHaveLength(1);
      wrapper.unmount();
    });

    it('an album page abandoned by a view change must not write its ROWS either', async () => {
      // The resolve arm of the same guard the two tests above pin on the catch arm and
      // on `selectAlbum`. Without it a page the user walked away from still lands in
      // `albums`/`albumTotal`/`albumOffset`, so the albums state describes an artist
      // nobody is looking at. Like the `tracks` case there is no DOM face — `goToArtists`
      // has already emptied the grid and `selectArtist` re-empties it on the way back in
      // — so the refs are the observable, via the repo's setup-binding idiom.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      expect(wrapper.findAll('.artist-card'), 'the artists grid is loaded').toHaveLength(100);

      let resolveAlbums: (value: Response) => void = () => {};
      const holdFetch = vi.fn(() => new Promise<Response>((resolve) => {
        resolveAlbums = resolve;
      }));
      vi.stubGlobal('fetch', holdFetch);
      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();

      const vm = wrapper.vm as unknown as {
        albums: unknown[]; albumTotal: number; albumOffset: number;
      };
      // PRECONDITION 1 — really on the album list, with its request really in flight.
      expect(
        wrapper.find('.music-page__crumb-nav').exists(),
        'must really have navigated to the album list',
      ).toBe(true);
      expect(
        wrapper.find('#music-albums-grid .music-page__loading').exists(),
        'the album page must really still be loading, or nothing is abandoned below',
      ).toBe(true);
      expect(holdFetch.mock.calls, 'exactly one album request is in flight').toHaveLength(1);

      // The user goes back before it lands.
      await wrapper.find('.music-page__crumb').trigger('click');
      await flushPromises();
      // PRECONDITION 2 — really back on the artists view, with the album state cleared
      // by `goToArtists()`, so anything found below can only have come from the
      // abandoned request.
      expect(
        wrapper.find('.music-page__crumb-nav').exists(),
        'the breadcrumb is gone ⇒ definitively the artists view',
      ).toBe(false);
      expect(vm.albums, 'goToArtists() emptied the album list').toHaveLength(0);
      expect(vm.albumTotal, 'and zeroed its total').toBe(0);

      // …and only now does it SUCCEED, with the real 100-row body for that artist.
      const landed = await server.request(
        '/api/v1/music/albums?limit=100&offset=0&artist=Artist+0001',
      );
      const body = (await landed.json()) as { albums: unknown[]; total: number };
      // PRECONDITION 3 — the abandoned response really carries rows, so "nothing was
      // written" is a real outcome and not an empty payload arriving.
      expect(body.albums, 'the abandoned response really carried a full page').toHaveLength(100);
      expect(body.total, 'and a real total').toBe(142);
      resolveAlbums(landed);
      await flushPromises();

      expect(
        vm.albums,
        'a page the user walked away from must not become the album list',
      ).toHaveLength(0);
      expect(vm.albumTotal, 'nor its total').toBe(0);
      expect(vm.albumOffset, 'nor its offset').toBe(0);
      expect(
        wrapper.findAll('.artist-card'),
        'the artists grid is on screen, healthy, and its skeleton is gone',
      ).toHaveLength(100);
      expect(wrapper.find('.music-page__crumb-nav').exists(), 'still the artists view').toBe(false);
      wrapper.unmount();
    });

    it('re-selecting the page already on screen refetches nothing, on BOTH listings', async () => {
      // `MusicPager` is a controlled component: it emits the offset for whatever option
      // is committed, including the current one (which an AT/keyboard user commits while
      // moving through the list). Rejecting the no-op is each handler's job, or every
      // such commit costs a request and drops a skeleton over rows already correct.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      const artistCalls = () => server.urlsFor('/api/v1/music/artists').length;
      const albumCalls = () => server.urlsFor('/api/v1/music/albums').length;
      expect(artistCalls(), 'only the mount request so far').toBe(1);
      expect(wrapper.findAll('.artist-card'), 'artists page 1 is on screen').toHaveLength(100);

      // --- the artists pager
      await wrapper.find('[data-pager="artists"] [data-nav="jump"]').setValue('1');
      await flushPromises();
      expect(
        wrapper.findComponent(MusicPager).emitted('go'),
        'the artists select really did commit and emit the current offset',
      ).toEqual([[0]]);
      expect(artistCalls(), 'the artists page on screen must not be refetched').toBe(1);
      expect(wrapper.findAll('.artist-card'), 'and its rows are untouched').toHaveLength(100);

      // --- the albums pager, for the 142-album artist (2 pages)
      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();
      expect(albumCalls(), 'one album page was loaded by the drill-down').toBe(1);
      expect(wrapper.findAll('.album-card'), 'albums page 1 is on screen').toHaveLength(100);
      expect(wrapper.find('[data-nav="info"]').text()).toContain('Page 1 of 2');

      await wrapper.find('[data-pager="albums"] [data-nav="jump"]').setValue('1');
      await flushPromises();
      expect(
        wrapper.findComponent(MusicPager).emitted('go'),
        'the albums select really did commit and emit the current offset',
      ).toEqual([[0]]);
      expect(albumCalls(), 'the album page on screen must not be refetched').toBe(1);
      expect(wrapper.findAll('.album-card'), 'and its cards are untouched').toHaveLength(100);
      wrapper.unmount();
    });

    it('says "No albums" for an artist that genuinely has none', async () => {
      const server = stubMusicServer(makeLibrary(1, () => 0));
      const wrapper = mountPage();
      await flushPromises();
      expect(wrapper.findAll('.artist-card'), 'the artist is on screen').toHaveLength(1);

      await wrapper.find('.artist-card').trigger('click');
      await flushPromises();

      expect(
        wrapper.find('.music-page__crumb-nav').exists(),
        'must really be on the album list',
      ).toBe(true);
      expect(wrapper.findAll('.album-card'), 'and it really is empty').toHaveLength(0);
      const empty = wrapper.find('#music-albums-grid .music-page__empty');
      expect(empty.exists(), 'the empty state belongs INSIDE the grid it replaces').toBe(true);
      expect(empty.text()).toContain('No albums');
      void server;
      wrapper.unmount();
    });

    it('a failed FIRST album page must not read as "No albums"', async () => {
      // The `&& !error` half of the same v-if chain. "No albums found" is a claim about
      // the library; a failure is a claim about the request, and rendering the first as
      // the second is the exact lie S110 exists to stop telling.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      expect(wrapper.findAll('.artist-card')).toHaveLength(100);

      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('albums down'))));
      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();

      expect(
        wrapper.find('.music-page__crumb-nav').exists(),
        'must really be on the album list',
      ).toBe(true);
      expect(wrapper.findAll('.album-card'), 'nothing loaded').toHaveLength(0);
      expect(wrapper.find('.music-page__error').exists(), 'the failure must be stated').toBe(true);
      expect(
        wrapper.find('#music-albums-grid .music-page__empty').exists(),
        'a failure must never render as "No albums"',
      ).toBe(false);
      void server;
      wrapper.unmount();
    });

    it('disambiguates the detail fetch with the SELECTED artist when the row carries none', async () => {
      // Two things at once, both only reachable from a row with no `artist` key:
      //   1. `album.artist ?? selectedArtist.name` — without the fallback the detail
      //      request goes out bare and the server's first match wins, and 2,622 of
      //      production's 5,091 titles are shared between artists.
      //   2. a detail body with NO tracks must leave the truncated prefix on screen
      //      rather than blanking the track list.
      const prefix = Array.from({ length: 100 }, (_, i) => ({
        id: `p${i + 1}`,
        metadata: { title: `Prefix ${i + 1}`, duration_secs: 100, track_number: i + 1 },
      }));
      const detailCalls: string[] = [];
      const fetchFn = vi.fn((url: unknown) => {
        const raw = String(url);
        const parsed = new URL(raw, 'http://server.test');
        if (parsed.pathname === '/api/v1/music/artists') {
          return Promise.resolve(jsonResponse({
            artists: [{ name: 'Sigur Ros', album_count: 1, track_count: 125, image_url: null }],
            total: 1,
            limit: 100,
            offset: 0,
          }));
        }
        if (parsed.pathname === '/api/v1/music/albums') {
          // The row is filtered correctly but does NOT echo its artist back.
          return Promise.resolve(jsonResponse({
            albums: [{
              name: 'Untitled Album',
              year: 2002,
              album_art_url: null,
              track_count: 125,
              tracks_truncated: true,
              tracks: prefix,
            }],
            total: 1,
            limit: 100,
            offset: 0,
            artist: parsed.searchParams.get('artist'),
          }));
        }
        if (parsed.pathname.startsWith('/api/v1/music/albums/')) {
          detailCalls.push(raw);
          return Promise.resolve(jsonResponse({
            album: {
              name: 'Untitled Album', artist: 'Sigur Ros', year: 2002, track_count: 125, tracks: [],
            },
          }));
        }
        return Promise.reject(new Error(`Unexpected fetch URL: ${raw}`));
      });
      vi.stubGlobal('fetch', fetchFn);

      const wrapper = mountPage();
      await flushPromises();
      await wrapper.find('.artist-card').trigger('click');
      await flushPromises();
      expect(wrapper.findAll('.album-card'), 'the artist-less row rendered').toHaveLength(1);

      await wrapper.find('.album-card').trigger('click');
      await flushPromises();

      // The list row was flagged truncated, so the detail route really was consulted…
      expect(detailCalls, 'the album DETAIL request really was issued').toHaveLength(1);
      // …carrying the only artist name left anywhere: the selected one.
      expect(detailCalls[0]).toBe('/api/v1/music/albums/Untitled%20Album?artist=Sigur+Ros');
      // …and a track-less detail body leaves the prefix alone instead of blanking it.
      expect(
        wrapper.findAll('.track-play'),
        'an empty detail track list must not replace the prefix',
      ).toHaveLength(100);
      wrapper.unmount();
    });

    it('mounts each pager as a SIBLING of the grid it controls, never inside it', async () => {
      // The structural half of the geometry change, which IS assertable in jsdom (the
      // 20px gap itself is not — see the GEOMETRY RECORD comment in the SFC and the
      // note in the worklog: `test:visual` is banned here, so spacing has no gate).
      // `aria-controls` pointing at its own ANCESTOR is meaningless to AT, so this is
      // the pin that stops someone re-nesting the pager back into the grid.
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();

      expect(wrapper.find('[data-pager="artists"]').exists(), 'the pager renders').toBe(true);
      expect(
        wrapper.find('#music-artists-grid [data-pager="artists"]').exists(),
        'the pager must NOT be a descendant of the grid its aria-controls names',
      ).toBe(false);

      await wrapper.findAll('.artist-card')[0]!.trigger('click');
      await flushPromises();
      expect(wrapper.find('[data-pager="albums"]').exists(), 'the album pager renders').toBe(true);
      expect(
        wrapper.find('#music-albums-grid [data-pager="albums"]').exists(),
        'the album pager must NOT be a descendant of the grid its aria-controls names',
      ).toBe(false);
      void server;
      wrapper.unmount();
    });

    it('keeps the aria-controls IDREF resolvable WHILE a page is loading', async () => {
      const server = stubMusicServer(prodLibrary());
      const wrapper = mountPage();
      await flushPromises();
      const target = wrapper.find('[data-pager="artists"] [data-nav="jump"]')
        .attributes('aria-controls');
      expect(target).toBe('music-artists-grid');

      vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(() => {})));
      await wrapper.find('[data-pager="artists"] [data-nav="next"]').trigger('click');
      await Promise.resolve();

      expect(wrapper.find('.music-page__loading').exists(), 'must really be mid-load').toBe(true);
      expect(
        wrapper.find(`#${target}`).exists(),
        'aria-controls must not dangle mid-load',
      ).toBe(true);
      void server;
      wrapper.unmount();
    });

    it('renders the singular count for a one-artist library', async () => {
      stubMusicServer(makeLibrary(1, () => 1));
      const wrapper = mountPage();
      await flushPromises();
      expect(wrapper.find('[data-count="artists"]').text()).toBe('1 artist');
      wrapper.unmount();
    });

    it('keeps the truncated prefix playable when the album detail 404s', async () => {
      // The 404 path, distinct from a rejected fetch: the real detail route answers
      // 404 + {error} for an unknown title/artist pair, which the client surfaces as
      // an ApiError. Pinned because error handling is exactly where a fake that
      // diverges from the real server hides bugs.
      const lib = makeLibrary(1, () => 1);
      lib.albums[0]!.trackCount = 125;
      const server = stubMusicServer(lib);
      const wrapper = mountPage();
      await flushPromises();
      await wrapper.find('.artist-card').trigger('click');
      await flushPromises();

      // Confirm the fake really 404s an unknown album rather than 200-ing a null.
      const probe = await server.request('/api/v1/music/albums/Nope?artist=Nobody');
      expect(probe.status).toBe(404);

      // Now rename the album out from under the page so its detail lookup 404s.
      lib.albums[0]!.name = 'Renamed Out From Under It';
      await wrapper.find('.album-card').trigger('click');
      await flushPromises();

      expect(wrapper.findAll('.track-play')).toHaveLength(100);
      wrapper.unmount();
    });

    it('the fake applies the same [MIN,MAX] limit clamp the server does', async () => {
      // PageLimit clamps to [1,100]: a 0/negative limit becomes 1, an absurd one 100.
      const server = stubMusicServer(makeLibrary(3, () => 1));
      const cases: [string, number][] = [
        ['/api/v1/music/artists?limit=0&offset=0', 1],
        ['/api/v1/music/artists?limit=-5&offset=0', 1],
        ['/api/v1/music/artists?limit=5000000&offset=0', 100],
      ];
      const applied: number[] = [];
      for (const [url] of cases) {
        const res = await server.request(url);
        const body = (await res.json()) as { limit: number };
        applied.push(body.limit);
      }
      expect(applied).toEqual(cases.map(([, expected]) => expected));
    });

    it('the fake folds case AND accents on ?artist=, like utf8mb4_unicode_ci', async () => {
      const lib = makeLibrary(0, () => 0);
      lib.artists.push({ name: 'Björk', albumCount: 1 });
      lib.albums.push({ name: 'Homogenic', artist: 'Björk', year: 1997, trackCount: 5 });
      const server = stubMusicServer(lib);

      for (const probe of ['Björk', 'björk', 'BJORK', 'bjork']) {
        const res = await server.request(
          `/api/v1/music/albums?limit=100&offset=0&artist=${encodeURIComponent(probe)}`,
        );
        const body = (await res.json()) as { albums: unknown[]; total: number };
        expect(body.albums, `?artist=${probe} should match Björk`).toHaveLength(1);
        expect(body.total).toBe(1);
      }
      // …and still does not match a different artist.
      const miss = await server.request('/api/v1/music/albums?limit=100&offset=0&artist=Sigur+Ros');
      expect(((await miss.json()) as { albums: unknown[] }).albums).toHaveLength(0);
    });
  });
});
