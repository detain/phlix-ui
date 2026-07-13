/**
 * Tests for useMusicPlayer — signed-stream_url playback + client-side
 * crossfade/gapless (UI-3.6 / X8).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useMusicPlayer } from './useMusicPlayer';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import type { MusicTrack } from '../types/music';

// --- Fake <audio> element (distinct instance per `new Audio()`) --------------
class FakeAudioElement {
  src = '';
  preload = 'none';
  currentTime = 0;
  duration = 100;
  paused = true;
  volume = 1;
  play = vi.fn(async () => { this.paused = false; });
  pause = vi.fn(() => { this.paused = true; });
  load = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
}

let created: FakeAudioElement[] = [];

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function mkTrack(id: string, streamUrl: string | null): MusicTrack {
  return { id, title: id.toUpperCase(), durationSecs: 100, trackNumber: 1, streamUrl };
}

function makePlayer() {
  return useMusicPlayer({ apiBase: () => '', streamBase: () => '' });
}

describe('useMusicPlayer', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    created = [];
    // `new Audio()` needs a real constructor (a vi.fn arrow cannot be `new`-ed).
    function AudioMock(this: unknown) {
      const el = new FakeAudioElement();
      created.push(el);
      return el;
    }
    vi.stubGlobal('Audio', AudioMock as unknown as typeof Audio);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('play(track) points the active <audio> at the signed stream_url and starts', async () => {
    const player = makePlayer();
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1'), mkTrack('b', '/media/b/stream?sig=2')]);

    await player.play(player.queue.value[0]);
    await flushPromises();

    expect(created[0].src).toBe('/media/a/stream?sig=1');
    expect(created[0].play).toHaveBeenCalled();
    expect(player.playing.value).toBe(true);
    expect(player.currentTrack.value?.id).toBe('a');
  });

  it('prefixes a relative stream_url with the stream base', async () => {
    const player = useMusicPlayer({ apiBase: () => '', streamBase: () => 'https://srv.example' });
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1')]);
    await player.play(player.queue.value[0]);
    await flushPromises();
    expect(created[0].src).toBe('https://srv.example/media/a/stream?sig=1');
  });

  it('pause() stops the active element and clears playing', async () => {
    const player = makePlayer();
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1')]);
    await player.play(player.queue.value[0]);
    await flushPromises();

    player.pause();
    expect(created[0].pause).toHaveBeenCalled();
    expect(player.playing.value).toBe(false);
  });

  it('seek() sets currentTime on the active element and updates position', async () => {
    const player = makePlayer();
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1')]);
    await player.play(player.queue.value[0]);
    await flushPromises();

    player.seek(42);
    expect(created[0].currentTime).toBe(42);
    expect(player.position.value).toBe(42);
  });

  it('next()/previous() advance and rewind the queue (no crossfade)', async () => {
    const prefs = usePreferencesStore();
    prefs.crossfadeDuration = 0;
    prefs.gaplessEnabled = false;

    const player = makePlayer();
    player.loadTracks([
      mkTrack('a', '/media/a/stream?sig=1'),
      mkTrack('b', '/media/b/stream?sig=2'),
      mkTrack('c', '/media/c/stream?sig=3'),
    ]);

    await player.play(player.queue.value[0]);
    await flushPromises();
    expect(player.currentIndex.value).toBe(0);

    await player.next();
    await flushPromises();
    expect(player.currentTrack.value?.id).toBe('b');
    expect(player.currentIndex.value).toBe(1);

    await player.previous();
    await flushPromises();
    expect(player.currentTrack.value?.id).toBe('a');
    expect(player.currentIndex.value).toBe(0);
  });

  it('gapless: preloads the next track onto the idle element', async () => {
    const prefs = usePreferencesStore();
    prefs.gaplessEnabled = true;
    prefs.crossfadeDuration = 0;

    const player = makePlayer();
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1'), mkTrack('b', '/media/b/stream?sig=2')]);

    await player.play(player.queue.value[0]);
    await flushPromises();

    // A second element was created (the idle one) and pre-loaded with track b.
    expect(created.length).toBe(2);
    expect(created[1].src).toBe('/media/b/stream?sig=2');
    expect(created[1].preload).toBe('auto');
    // Preload does NOT start playback on the idle element.
    expect(created[1].play).not.toHaveBeenCalled();
  });

  it('crossfade: next() overlaps both elements with a volume fade', async () => {
    const prefs = usePreferencesStore();
    prefs.crossfadeDuration = 5;
    prefs.gaplessEnabled = false;

    const player = makePlayer();
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1'), mkTrack('b', '/media/b/stream?sig=2')]);

    await player.play(player.queue.value[0]);
    await flushPromises();

    await player.next();
    await flushPromises();

    // A crossfade is in progress: the idle element was created, pointed at the
    // next track, started at volume 0, and is playing WHILE the outgoing element
    // is still playing (the two overlap-fade).
    expect(player.crossfading.value).toBe(true);
    expect(created.length).toBe(2);
    expect(created[1].src).toBe('/media/b/stream?sig=2');
    expect(created[1].play).toHaveBeenCalled();
    expect(created[1].volume).toBe(0);
    expect(created[0].play).toHaveBeenCalled();
    expect(player.currentTrack.value?.id).toBe('b');

    player.dispose(); // clear the fade interval
  });

  it('gapless: advance CONSUMES the preloaded idle element (no reload of a new src)', async () => {
    const prefs = usePreferencesStore();
    prefs.gaplessEnabled = true;
    prefs.crossfadeDuration = 0;

    const player = makePlayer();
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1'), mkTrack('b', '/media/b/stream?sig=2')]);

    await player.play(player.queue.value[0]);
    await flushPromises();

    // Track b was preloaded onto the idle element (created[1]) — loaded exactly once.
    expect(created.length).toBe(2);
    expect(created[1].src).toBe('/media/b/stream?sig=2');
    expect(created[1].load).toHaveBeenCalledTimes(1);

    await player.next();
    await flushPromises();

    // The gapless advance SWAPPED IN the already-preloaded element (played it),
    // rather than reloading the active element with a fresh src.
    expect(player.currentTrack.value?.id).toBe('b');
    expect(created[1].play).toHaveBeenCalled();
    // Not reloaded: the preload's single load() is the only one — the feature the
    // step exists to deliver (no load/decode gap at the boundary).
    expect(created[1].load).toHaveBeenCalledTimes(1);
    // The outgoing element was paused, and no fresh third element was created.
    expect(created[0].pause).toHaveBeenCalled();
    expect(created.length).toBe(2);
  });

  it('duration reflects the NEW track after a crossfade (seek slider max not stuck at 0)', async () => {
    const prefs = usePreferencesStore();
    prefs.crossfadeDuration = 5;
    prefs.gaplessEnabled = false;

    const player = makePlayer();
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1'), mkTrack('b', '/media/b/stream?sig=2')]);

    await player.play(player.queue.value[0]);
    await flushPromises();

    await player.next();
    await flushPromises();

    // After the crossfade begins, the transport bar reads the fade-in track's
    // duration (FakeAudioElement default 100), NOT 0.
    expect(player.crossfading.value).toBe(true);
    expect(player.currentTrack.value?.id).toBe('b');
    expect(player.duration.value).toBe(100);

    player.dispose(); // clear the fade interval
  });

  it('concurrent near-end triggers start only ONE crossfade (no orphaned interval)', async () => {
    // Track b has no streamUrl → resolved via a network getTrack, the slow path
    // where the pre-fix guard-after-await allowed re-entrant crossfades.
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({
      track: { id: 'b', name: 'B', duration_secs: 100, track_number: 2, stream_url: '/media/b/stream?sig=2' },
    })));

    const prefs = usePreferencesStore();
    prefs.crossfadeDuration = 5;
    prefs.gaplessEnabled = false;

    const player = makePlayer();
    player.loadTracks([mkTrack('a', '/media/a/stream?sig=1'), mkTrack('b', null)]);

    await player.play(player.queue.value[0]);
    await flushPromises();

    // Two near-simultaneous advances (as two near-end timeupdate events would do).
    const p1 = player.next();
    const p2 = player.next();
    await Promise.all([p1, p2]);
    await flushPromises();

    // Only one crossfade ran: the single idle element was played exactly once
    // (pre-fix: two concurrent crossfades → play called twice + a leaked interval).
    expect(created.length).toBe(2);
    expect(created[1].play).toHaveBeenCalledTimes(1);
    expect(player.crossfading.value).toBe(true);

    player.dispose();
  });

  it('resolves stream_url via getTrack when a track has none (album fast-path)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({
      track: { id: 'z', name: 'Z', duration_secs: 50, track_number: 1, stream_url: '/media/z/stream?sig=zz' },
    })));

    const player = makePlayer();
    player.loadTracks([mkTrack('z', null)]);

    await player.play(player.queue.value[0]);
    await flushPromises();

    expect(created[0].src).toBe('/media/z/stream?sig=zz');
    expect(created[0].play).toHaveBeenCalled();
  });
});
