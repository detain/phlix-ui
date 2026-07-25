/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref } from 'vue';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import MusicAlbumPage from './MusicAlbumPage.vue';

// The shared player is mocked so the page is tested in isolation (no real
// <audio>, no pinia preferences store). A hoisted holder lets each test swap in
// a fresh fake before mount.
const holder = vi.hoisted(() => ({ player: null as unknown }));
vi.mock('../composables/useMusicPlayer', () => ({
  useMusicPlayer: () => holder.player,
}));

function makeFakePlayer(over: Record<string, unknown> = {}) {
  return {
    queue: ref([]),
    currentTrack: ref(null),
    currentIndex: ref(-1),
    playing: ref(false),
    position: ref(0),
    duration: ref(0),
    loading: ref(false),
    error: ref(null),
    crossfading: ref(false),
    hasNext: ref(false),
    hasPrev: ref(false),
    loadTracks: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    toggle: vi.fn(),
    stop: vi.fn(),
    next: vi.fn(),
    previous: vi.fn(),
    seek: vi.fn(),
    dispose: vi.fn(),
    ...over,
  };
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

interface ServerTrackItem { id: string; metadata: { title: string; duration_secs: number; track_number: number | null }; }
interface ServerAlbum { name: string; artist: string; year: number | null; track_count: number; tracks: ServerTrackItem[]; }

function album(over: Partial<ServerAlbum> = {}): ServerAlbum {
  return {
    name: 'OK Computer',
    artist: 'Radiohead',
    year: 1997,
    track_count: 2,
    tracks: [
      { id: 't1', metadata: { title: 'Airbag', duration_secs: 284, track_number: 1 } },
      { id: 't2', metadata: { title: 'Paranoid Android', duration_secs: 383, track_number: 2 } },
    ],
    ...over,
  };
}

function stubFetch(opts: { album?: ServerAlbum; error?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/music/albums/')) {
      if (opts.error) return Promise.reject(new Error('album down'));
      return Promise.resolve(jsonResponse({ album: opts.album ?? album() }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

/**
 * A library where TWO artists ship the same album TITLE — the production shape:
 * 2,622 of 5,091 titles are shared, while ZERO repeat within one artist. The stub
 * resolves by title + `?artist=` and, when no artist is supplied, returns the
 * server's "deterministic first match" (first by artist name) exactly as
 * `findAlbumByTitle()` does. So a page that drops the artist silently opens the
 * WRONG artist's album, and this stub is what makes that visible.
 */
function stubSharedTitleFetch(title = 'Greatest Hits') {
  const library: ServerAlbum[] = [
    {
      name: title,
      artist: 'ABBA',
      year: 1975,
      track_count: 1,
      tracks: [{ id: 'abba-1', metadata: { title: 'Dancing Queen', duration_secs: 231, track_number: 1 } }],
    },
    {
      name: title,
      artist: 'Queen',
      year: 1981,
      track_count: 1,
      tracks: [{ id: 'queen-1', metadata: { title: 'Bohemian Rhapsody', duration_secs: 355, track_number: 1 } }],
    },
  ];
  const calls: string[] = [];
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    calls.push(u);
    if (u.includes('/api/v1/music/albums/')) {
      const parsed = new URL(u, 'http://server.test');
      const artist = (parsed.searchParams.get('artist') ?? '').trim();
      const matches = library.filter(
        (a) => a.name === title
          && (artist === '' || a.artist.toLowerCase() === artist.toLowerCase()),
      );
      if (matches.length === 0) {
        return Promise.resolve(jsonResponse({ album: null }));
      }
      // ORDER BY ar.name, al.id → first artist name wins when unfiltered.
      const winner = [...matches].sort((a, b) => a.artist.localeCompare(b.artist))[0]!;
      return Promise.resolve(jsonResponse({ album: winner }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return Object.assign(fn, { calls });
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/music', name: 'music', component: stub },
      { path: '/app/music/album/:name', name: 'music-album', component: stub },
    ],
  });
}

function mountPage(router: Router, name = 'OK Computer'): VueWrapper {
  return mount(MusicAlbumPage, {
    props: { name },
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: {
        Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' },
        MusicTrackList: {
          props: ['tracks', 'playingTrackId'],
          emits: ['play'],
          template:
            '<div class="track-list">'
            + '<button v-for="tk in tracks" :key="tk.id" class="track-play" :data-id="tk.id" @click="$emit(\'play\', tk)">{{ tk.title }}</button>'
            + '</div>',
        },
      },
    },
  });
}

beforeEach(() => {
  localStorage.clear();
  holder.player = makeFakePlayer();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('MusicAlbumPage', () => {
  it('loads the album by name and renders its header + track list', async () => {
    const fetchFn = stubFetch();
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(String(fetchFn.mock.calls[0][0])).toContain('/api/v1/music/albums/');
    expect(w.find('.album-header__title').text()).toBe('OK Computer');
    expect(w.find('.album-header__artist').text()).toBe('Radiohead');
    expect(w.findAll('.track-play')).toHaveLength(2);
    w.unmount();
  });

  it('shows the error state when the album load fails', async () => {
    stubFetch({ error: true });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.album-page__error').exists()).toBe(true);
    w.unmount();
  });

  it('plays a track through the shared player when a row is clicked', async () => {
    stubFetch();
    const w = mountPage(makeRouter());
    await flushPromises();

    await w.findAll('.track-play')[1].trigger('click');
    const player = holder.player as ReturnType<typeof makeFakePlayer>;
    expect(player.loadTracks).toHaveBeenCalled();
    expect(player.play).toHaveBeenCalledTimes(1);
    // The normalized track for the clicked row is handed to play().
    expect((player.play.mock.calls[0][0] as { id: string }).id).toBe('t2');
    w.unmount();
  });

  it('plays the whole album from the header Play button', async () => {
    stubFetch();
    const w = mountPage(makeRouter());
    await flushPromises();
    await w.find('.album-header__play-btn').trigger('click');
    const player = holder.player as ReturnType<typeof makeFakePlayer>;
    expect(player.loadTracks).toHaveBeenCalled();
    expect(player.play).toHaveBeenCalled();
    w.unmount();
  });

  it('renders a back link to the music home', async () => {
    stubFetch();
    const w = mountPage(makeRouter());
    await flushPromises();
    const back = w.find('a.album-page__back-link');
    expect(back.attributes('href')).toContain('/app/music');
    w.unmount();
  });

  // ---- MED-3: a shared album title must resolve to the RIGHT artist ---------

  it('sends ?artist= from the route query so a shared title resolves to its own artist', async () => {
    const fetchFn = stubSharedTitleFetch();
    const router = makeRouter();
    await router.push({
      name: 'music-album',
      params: { name: 'Greatest Hits' },
      query: { artist: 'Queen' },
    });
    await router.isReady();
    const w = mountPage(router, 'Greatest Hits');
    await flushPromises();

    expect(fetchFn.calls[0]).toBe('/api/v1/music/albums/Greatest%20Hits?artist=Queen');
    // Queen's album, NOT ABBA's — which is the one the server returns unfiltered
    // because "ABBA" sorts first.
    expect(w.find('.album-header__artist').text()).toBe('Queen');
    expect(w.findAll('.track-play')[0]!.text()).toBe('Bohemian Rhapsody');
    w.unmount();
  });

  it('resolves the OTHER artist of the same title from the same route', async () => {
    // The complement: the disambiguator is actually read, not a constant.
    const fetchFn = stubSharedTitleFetch();
    const router = makeRouter();
    await router.push({
      name: 'music-album',
      params: { name: 'Greatest Hits' },
      query: { artist: 'ABBA' },
    });
    await router.isReady();
    const w = mountPage(router, 'Greatest Hits');
    await flushPromises();

    expect(fetchFn.calls[0]).toBe('/api/v1/music/albums/Greatest%20Hits?artist=ABBA');
    expect(w.find('.album-header__artist').text()).toBe('ABBA');
    expect(w.findAll('.track-play')[0]!.text()).toBe('Dancing Queen');
    w.unmount();
  });

  it('prefers an explicit artist PROP over the route query', async () => {
    const fetchFn = stubSharedTitleFetch();
    const router = makeRouter();
    await router.push({
      name: 'music-album',
      params: { name: 'Greatest Hits' },
      query: { artist: 'ABBA' },
    });
    await router.isReady();
    const w = mount(MusicAlbumPage, {
      props: { name: 'Greatest Hits', artist: 'Queen' },
      global: {
        plugins: [router],
        provide: { apiBase: '' },
        stubs: {
          Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' },
          MusicTrackList: {
            props: ['tracks'],
            template: '<div class="track-list"><span v-for="tk in tracks" :key="tk.id" class="track-play">{{ tk.title }}</span></div>',
          },
        },
      },
    });
    await flushPromises();

    expect(fetchFn.calls[0]).toContain('artist=Queen');
    expect(w.find('.album-header__artist').text()).toBe('Queen');
    w.unmount();
  });

  it('still loads (ambiguously) from a bare deep link with no artist at all', async () => {
    // Backwards compatibility: an existing `/app/music/album/:name` bookmark must
    // not break. It resolves to the server's first match — documented, not fixed
    // here, because only the caller knows which artist was meant.
    const fetchFn = stubSharedTitleFetch();
    const w = mountPage(makeRouter(), 'Greatest Hits');
    await flushPromises();
    expect(fetchFn.calls[0]).toBe('/api/v1/music/albums/Greatest%20Hits');
    expect(w.find('.album-header__artist').text()).toBe('ABBA');
    w.unmount();
  });
});
