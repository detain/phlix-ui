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
          template: '<div class="track-list"><slot /></div>',
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
    // Replace Audio with a fake for the player.
    fakeAudio = new FakeAudioElement();
    vi.stubGlobal('Audio', vi.fn(() => fakeAudio) as unknown as typeof Audio);
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

  // UI-3.6 playback deferred — blocked on server music-track stream endpoint
  // (X8/SV-3.2); see performance_worklog_ui.md
  it.skip('emits play event and calls audio play', async () => {
    const artistsList = [artist()];
    const albumsList = [album({ tracks: [track({ id: 't42', metadata: { title: 'Test Track', duration_secs: 200, track_number: 1 } })] })];
    stubFetch(artistsList, albumsList, []);

    const wrapper = mountPage();
    await flushPromises();

    // Click artist → albums.
    await wrapper.find('.artist-card').trigger('click');
    await flushPromises();

    // Click album → tracks.
    await wrapper.find('.album-card').trigger('click');
    await flushPromises();

    // Find the MusicTrackList component
    const trackList = wrapper.findComponent({ name: 'MusicTrackList' });
    expect(trackList.exists()).toBe(true);

    // Set up spy on fakeAudio.play BEFORE emitting play event
    const playSpy = vi.spyOn(fakeAudio, 'play');

    // Emit play with track id t42
    await trackList.vm.$emit('play', track({ id: 't42' }));

    // The audio element's play should have been called.
    expect(playSpy).toHaveBeenCalled();
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
});
