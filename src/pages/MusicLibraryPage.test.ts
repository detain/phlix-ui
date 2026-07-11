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
import type { MusicArtist, MusicAlbum, MusicTrack } from '../types/music';

// ---------------------------------------------------------------------------
// Test data helpers
// ---------------------------------------------------------------------------

function artist(over: Partial<MusicArtist> = {}): MusicArtist {
  return { id: 'a1', name: 'The Flaming Lips', imageUrl: null, albumCount: 2, ...over };
}

function album(over: Partial<MusicAlbum> = {}): MusicAlbum {
  return { id: 'b1', title: 'Yoshimi Battles the Pink Robots', albumArtUrl: null, year: 1999, totalTracks: 10, ...over };
}

function track(over: Partial<MusicTrack> = {}): MusicTrack {
  return { id: 1, title: 'Fight Test', durationSecs: 245, trackNumber: 1, ...over };
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

function stubFetch(artistsList: MusicArtist[], albumsList: MusicAlbum[], tracksList: MusicTrack[]) {
  fetchStub = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/music/artists') && !u.includes('/albums')) {
      return Promise.resolve(jsonResponse({ artists: artistsList }));
    }
    if (u.includes('/api/v1/music/artists/') && u.includes('/albums')) {
      return Promise.resolve(jsonResponse({ albums: albumsList }));
    }
    if (u.includes('/api/v1/music/albums/') && u.includes('/tracks')) {
      return Promise.resolve(jsonResponse({ tracks: tracksList }));
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
          template: '<button class="artist-card" @click="$emit(\'click\', artist)">{{ artist.name }}</button>',
        },
        MusicAlbumCard: {
          props: ['album'],
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
    stubFetch([artist({ id: 'a1', name: 'Radiohead' })], [], []);
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
    const artistsList = [artist({ id: 'a1', name: 'Radiohead' })];
    const albumsList = [album({ id: 'b1', title: 'OK Computer' })];
    stubFetch(artistsList, albumsList, []);

    const wrapper = mountPage();
    await flushPromises();

    // Click the artist card.
    await wrapper.find('.artist-card').trigger('click');
    await flushPromises();

    // Should now show album cards.
    const albumCards = wrapper.findAll('.album-card');
    expect(albumCards).toHaveLength(1);
    expect(albumCards[0].text()).toContain('OK Computer');

    // Should have fetched albums from the API.
    const albumFetchCalls = fetchStub.mock.calls.filter(
      (c: unknown[]) => (c[0] as string).includes('/api/v1/music/artists/') && (c[0] as string).includes('/albums'),
    );
    expect(albumFetchCalls).toHaveLength(1);
  });

  // ---- Album → Tracks navigation ------------------------------------------

  it('navigates to tracks view when album is clicked', async () => {
    const artistsList = [artist()];
    const albumsList = [album({ id: 'b1', tracks: [track({ id: 1 }), track({ id: 2 })] })];
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

    // No tracks fetch since album has embedded tracks
    const tracksFetchCalls = fetchStub.mock.calls.filter(
      (c: unknown[]) => (c[0] as string).includes('/api/v1/music/albums/') && (c[0] as string).includes('/tracks'),
    );
    expect(tracksFetchCalls).toHaveLength(0);
  });

  // ---- Playback -----------------------------------------------------------

  it('emits play event and calls audio play', async () => {
    const artistsList = [artist()];
    const albumsList = [album({ id: 'b1', tracks: [track({ id: 42, title: 'Test Track' })] })];
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

    // Emit play with track id 42
    await trackList.vm.$emit('play', track({ id: 42 }));

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
