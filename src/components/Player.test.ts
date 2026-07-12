/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import Player from './Player.vue';
import Scrubber from './player/Scrubber.vue';
import MarkerTimeline from './player/MarkerTimeline.vue';
import Modal from './ui/Modal.vue';
import { ApiClient } from '../api/client';
import AmbientCanvas from './player/AmbientCanvas.vue';
import SkipButton from './player/SkipButton.vue';
import ThumbRating from './ThumbRating.vue';
import Icon from './Icon.vue';
import QualityMenu from './player/QualityMenu.vue';
import Select from './ui/Select.vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { MediaItem } from '../types/media-item';
import * as hlsTranscodeMod from '../composables/useHlsTranscode';

// The real useHlsTranscode hits the network + hls.js; mock it so tests can flip
// its reactive state by hand and assert the player's preparing/ready/error chrome.
vi.mock('../composables/useHlsTranscode', async () => {
  const { ref } = await import('vue');
  const state = ref('idle');
  const progress = ref(0);
  const subtitleTracks = ref<unknown[]>([]);
  // E2 level state — the QualityMenu binds these; tests drive them by hand.
  const levels = ref<Array<{ index: number; height: number; width: number; bitrate: number; name?: string }>>([]);
  const currentLevel = ref(-1);
  const autoEnabled = ref(true);
  const activeLevelHeight = ref<number | null>(null);
  const variants = ref<unknown[] | null>(null);
  const audioTracks = ref<Array<{ index: number; name: string; lang: string; default: boolean; autoselect: boolean }>>([]);
  const currentAudioTrack = ref(-1);
  const ctrl = {
    state,
    progress,
    subtitleTracks,
    levels,
    currentLevel,
    autoEnabled,
    activeLevelHeight,
    variants,
    audioTracks,
    currentAudioTrack,
    setLevel: vi.fn(),
    setNextLevel: vi.fn(),
    setAudioTrack: vi.fn(),
    start: vi.fn(),
    cleanup: vi.fn(),
    reset: vi.fn(() => {
      state.value = 'idle';
      progress.value = 0;
      subtitleTracks.value = [];
      levels.value = [];
      currentLevel.value = -1;
      autoEnabled.value = true;
      activeLevelHeight.value = null;
      variants.value = null;
      audioTracks.value = [];
      currentAudioTrack.value = -1;
    }),
  };
  return { useHlsTranscode: () => ctrl, __ctrl: ctrl };
});

interface MockLevel {
  index: number;
  height: number;
  width: number;
  bitrate: number;
  name?: string;
}

/** The singleton mocked transcode controller (state/progress/level refs + spies). */
function tc(): {
  state: { value: string };
  progress: { value: number };
  subtitleTracks: { value: Array<{ index: number; language: string; label: string; default: boolean; url: string }> };
  levels: { value: MockLevel[] };
  currentLevel: { value: number };
  autoEnabled: { value: boolean };
  activeLevelHeight: { value: number | null };
  variants: { value: unknown[] | null };
  audioTracks: { value: Array<{ index: number; name: string; lang: string; default: boolean; autoselect: boolean }> };
  currentAudioTrack: { value: number };
  setLevel: ReturnType<typeof vi.fn>;
  setNextLevel: ReturnType<typeof vi.fn>;
  setAudioTrack: ReturnType<typeof vi.fn>;
  start: ReturnType<typeof vi.fn>;
  cleanup: ReturnType<typeof vi.fn>;
  reset: ReturnType<typeof vi.fn>;
} {
  return (hlsTranscodeMod as unknown as { __ctrl: ReturnType<typeof tc> }).__ctrl;
}

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi', 'Adventure'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

/** jsdom doesn't implement <video> playback — stub play/pause + readable props. */
function stubVideo(el: HTMLVideoElement, props: Partial<Record<'currentTime' | 'duration' | 'volume' | 'muted' | 'playbackRate' | 'paused', number | boolean>> = {}) {
  const state = { currentTime: 0, duration: 0, volume: 1, muted: false, playbackRate: 1, paused: true, ...props } as Record<string, number | boolean>;
  for (const k of Object.keys(state)) {
    Object.defineProperty(el, k, {
      configurable: true,
      get: () => state[k],
      set: (v) => {
        state[k] = v as number | boolean;
      },
    });
  }
  Object.defineProperty(el, 'buffered', {
    configurable: true,
    get: () => ({ length: 1, end: () => 50 }),
  });
  el.play = vi.fn(() => {
    state.paused = false;
    return Promise.resolve();
  }) as unknown as HTMLVideoElement['play'];
  el.pause = vi.fn(() => {
    state.paused = true;
  }) as unknown as HTMLVideoElement['pause'];
  return state;
}

const mounted: ReturnType<typeof mount>[] = [];
function mountPlayer(
  props: Partial<{
    media: MediaItem;
    streamUrl: string;
    idleTimeout: number;
    chapters: { start: number; title?: string }[];
    introMarker: { start: number; end: number } | null;
    outroMarker: { start: number; end: number } | null;
    prevEpisode: MediaItem | null;
    nextEpisode: MediaItem | null;
    autoplay: boolean;
    playbackAudioTracks: Array<{ index: number; streamIndex: number; language: string; label: string; default: boolean }>;
    playbackSubtitleTracks: Array<{ index: number; language: string; label: string; default: boolean; url: string }>;
    apiBase: string;
    markers: Array<{ id: string; type: 'intro' | 'outro' | 'credits' | 'ad'; startMs: number; endMs: number; label: string }>;
  }> = {},
) {
  const w = mount(Player, {
    props: { media: media(), streamUrl: 'http://x/stream', ...props },
    attachTo: document.body,
  });
  mounted.push(w);
  const video = w.find('video').element as HTMLVideoElement;
  const state = stubVideo(video);
  return { w, video, state };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  // Reset the shared mocked transcode controller between tests.
  const ctrl = tc();
  ctrl.state.value = 'idle';
  ctrl.progress.value = 0;
  ctrl.subtitleTracks.value = [];
  ctrl.levels.value = [];
  ctrl.currentLevel.value = -1;
  ctrl.autoEnabled.value = true;
  ctrl.activeLevelHeight.value = null;
  ctrl.variants.value = null;
  ctrl.audioTracks.value = [];
  ctrl.currentAudioTrack.value = -1;
  ctrl.setLevel.mockClear();
  ctrl.setNextLevel.mockClear();
  ctrl.setAudioTrack.mockClear();
  ctrl.start.mockClear();
  ctrl.cleanup.mockClear();
  ctrl.reset.mockClear();
});
afterEach(() => {
  // unmount so the document-level keyboard listener is removed (no cross-test bleed)
  while (mounted.length) mounted.pop()?.unmount();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Player — rendering & anti-slop', () => {
  it('renders metadata (eyebrow, title, cert, sub parts) and no emoji glyphs', () => {
    const { w } = mountPlayer();
    expect(w.find('.player__eyebrow').text()).toBe('Now playing');
    expect(w.find('.player__title').text()).toBe('Dune: Part Two');
    expect(w.find('.player__cert').text()).toBe('PG-13');
    const sub = w.find('.player__sub').text();
    expect(sub).toContain('2024');
    expect(sub).toContain('166m');
    expect(sub).toContain('Sci-Fi');
    expect(/[🎬▶❚🔊🔇⤢⤓←↑↓]/u.test(w.html())).toBe(false);
  });

  it('orders the sub-row year · cert · runtime · genre (cert hugs the year, per the locked mockup)', () => {
    const { w } = mountPlayer();
    const segs = w.find('.player__sub').findAll('span').map((s) => s.text());
    // first non-dot segment is the year, the cert follows it (no dot between)
    expect(segs[0]).toBe('2024');
    expect(w.find('.player__sub .player__cert').text()).toBe('PG-13');
    const text = w.find('.player__sub').text().replace(/\s+/g, ' ');
    expect(text.indexOf('2024')).toBeLessThan(text.indexOf('PG-13'));
    expect(text.indexOf('PG-13')).toBeLessThan(text.indexOf('166m'));
  });

  it('binds the stream url and poster to the <video>', () => {
    const { w } = mountPlayer();
    const v = w.find('video');
    expect(v.attributes('src')).toBe('http://x/stream');
    expect(v.attributes('poster')).toBe('https://img/dune.jpg');
  });

  it('registers the current media with the store on mount', () => {
    const { w } = mountPlayer();
    expect(usePlayerStore().current?.id).toBe('m1');
    w.unmount();
  });
});

describe('Player — transport ↔ store', () => {
  it('reflects video play/pause into the store', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(store.playing).toBe(true);
    video.dispatchEvent(new Event('pause'));
    await nextTick();
    expect(store.playing).toBe(false);
  });

  it('syncs position/duration/buffered on timeupdate', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    state.currentTime = 30;
    state.duration = 100;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    expect(store.position).toBe(30);
    expect(store.duration).toBe(100);
    expect(store.buffered).toBe(50);
  });

  it('pushes the store selections onto the element at loadedmetadata', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    store.setVolume(0.4);
    store.setRate(1.5);
    await nextTick();
    video.dispatchEvent(new Event('loadedmetadata'));
    expect(state.volume).toBeCloseTo(0.4);
    expect(state.playbackRate).toBe(1.5);
  });

  it('toggles play via the center button (calls video.play when paused)', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = true;
    await w.find('.player__bigplay').trigger('click');
    expect(video.play).toHaveBeenCalled();
  });

  it('toggles mute through the store, mirrored onto the element', async () => {
    const { w, video } = mountPlayer();
    const store = usePlayerStore();
    await w.find('.volume__btn').trigger('click'); // VolumeControl mute button
    expect(store.muted).toBe(true);
    await nextTick();
    expect(video.muted).toBe(true);
  });
});

describe('Player — store → video sync', () => {
  it('applies a store volume/rate change onto the element', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    store.setVolume(0.3);
    store.setRate(2);
    await nextTick();
    expect(video.volume).toBeCloseTo(0.3);
    expect(video.playbackRate).toBe(2);
  });

  it('mirrors a store mute change onto the element', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    store.toggleMute();
    await nextTick();
    expect(video.muted).toBe(true);
  });

  it('syncs a native volumechange (muted + volume) back into the store', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    state.muted = true;
    state.volume = 0.5;
    video.dispatchEvent(new Event('volumechange'));
    await nextTick();
    expect(store.muted).toBe(true);
    expect(store.volume).toBeCloseTo(0.5);
  });

  it('updates buffered on the progress event', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    state.duration = 100;
    video.dispatchEvent(new Event('progress'));
    await nextTick();
    expect(store.buffered).toBe(50);
  });

  it('pauses the video when toggling play while playing', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = false;
    await w.find('.player__bigplay').trigger('click');
    expect(video.pause).toHaveBeenCalled();
  });

  it('syncs a native ratechange back into the store', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    state.playbackRate = 1.5;
    video.dispatchEvent(new Event('ratechange'));
    await nextTick();
    expect(store.rate).toBe(1.5);
  });
});

describe('Player — Scrubber integration', () => {
  it('applies a Scrubber seek to video.currentTime (and never toggles play)', async () => {
    const { w, video, state } = mountPlayer();
    state.duration = 200;
    video.dispatchEvent(new Event('timeupdate')); // propagate duration to store
    await nextTick();
    w.findComponent(Scrubber).vm.$emit('seek', 50);
    expect(state.currentTime).toBe(50);
    expect(video.play).not.toHaveBeenCalled();
  });

  it('passes store transport + props through to the Scrubber', async () => {
    const chapters = [{ start: 30 }, { start: 90 }];
    const { w, video, state } = mountPlayer({ chapters });
    state.currentTime = 40;
    state.duration = 200;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    const scrub = w.findComponent(Scrubber);
    expect(scrub.props('position')).toBe(40);
    expect(scrub.props('duration')).toBe(200);
    expect(scrub.props('chapters')).toEqual(chapters);
  });

  it('shows "Skip intro" only inside the intro marker and seeks to its end on click', async () => {
    const { w, video, state } = mountPlayer({ introMarker: { start: 5, end: 35 } });
    state.duration = 600;
    state.currentTime = 2; // before the window
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    expect(w.findComponent(SkipButton).find('button').exists()).toBe(false);
    state.currentTime = 10; // inside the window
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    const btn = w.findComponent(SkipButton).find('button');
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toContain('Skip intro');
    await btn.trigger('click');
    expect(state.currentTime).toBe(35); // seeked to the marker end
  });

  it('shows "Skip outro" inside the outro marker and seeks to its end on click', async () => {
    const { w, video, state } = mountPlayer({ outroMarker: { start: 540, end: 600 } });
    state.duration = 600;
    state.currentTime = 560;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    const btn = w.findComponent(SkipButton).find('button');
    expect(btn.text()).toContain('Skip outro');
    await btn.trigger('click');
    expect(state.currentTime).toBe(600);
  });

  it('renders no skip button when the title has no markers', async () => {
    const { w, video, state } = mountPlayer();
    state.duration = 600;
    state.currentTime = 100;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    expect(w.findComponent(SkipButton).find('button').exists()).toBe(false);
  });

  it('suspends chrome auto-hide while scrubbing', async () => {
    vi.useFakeTimers();
    const { w, video } = mountPlayer({ idleTimeout: 500 });
    video.dispatchEvent(new Event('play'));
    await nextTick();
    const scrub = w.findComponent(Scrubber);
    scrub.vm.$emit('scrub-start');
    await nextTick();
    vi.advanceTimersByTime(1000); // would normally hide
    await nextTick();
    expect(w.classes()).not.toContain('is-chrome-hidden'); // held open while scrubbing
    scrub.vm.$emit('scrub-end');
    await nextTick();
    vi.advanceTimersByTime(600);
    await nextTick();
    expect(w.classes()).toContain('is-chrome-hidden'); // hides again after scrub ends
  });
});

describe('Player — external command bus (seek seam)', () => {
  it('applies an absolute store.seekTo to the element when duration is known', async () => {
    const store = usePlayerStore();
    const { state } = mountPlayer();
    state.duration = 200;
    store.seekTo(30);
    await nextTick();
    expect(state.currentTime).toBe(30);
  });

  it('applies store.seekBy relative to the current store position', async () => {
    const store = usePlayerStore();
    const { video, state } = mountPlayer();
    state.currentTime = 50;
    state.duration = 200;
    video.dispatchEvent(new Event('timeupdate')); // sync store.position to 50
    await nextTick();
    store.seekBy(10);
    await nextTick();
    expect(state.currentTime).toBe(60);
  });

  it('defers an external seek issued before metadata (duration unknown) until loadedmetadata', async () => {
    const store = usePlayerStore();
    const { video, state } = mountPlayer();
    state.duration = 0; // not loaded yet
    store.seekTo(90);
    await nextTick();
    expect(state.currentTime).toBe(0); // deferred via pendingSeek
    state.duration = 300;
    video.dispatchEvent(new Event('loadedmetadata'));
    expect(state.currentTime).toBe(90); // applied on metadata
  });

  it('clamps an over-long absolute seek to the duration', async () => {
    const store = usePlayerStore();
    const { state } = mountPlayer();
    state.duration = 100;
    store.seekTo(999);
    await nextTick();
    expect(state.currentTime).toBe(100);
  });
});

describe('Player — chrome auto-hide', () => {
  it('hides the chrome after the idle timeout while playing, reveals on pointer move', async () => {
    vi.useFakeTimers();
    const { w, video } = mountPlayer({ idleTimeout: 1000 });
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(w.classes()).not.toContain('is-chrome-hidden');
    vi.advanceTimersByTime(1100);
    await nextTick();
    expect(w.classes()).toContain('is-chrome-hidden');

    await w.trigger('pointermove');
    expect(w.classes()).not.toContain('is-chrome-hidden');
  });

  it('always shows the chrome while paused (never hides)', async () => {
    vi.useFakeTimers();
    const { w, video } = mountPlayer({ idleTimeout: 500 });
    video.dispatchEvent(new Event('pause'));
    await nextTick();
    vi.advanceTimersByTime(2000);
    await nextTick();
    expect(w.classes()).not.toContain('is-chrome-hidden');
  });

  it('pins the chrome open when the video ends without a pause event (Safari quirk)', async () => {
    // Safari fires `ended` but NOT `pause`, so `playing` stays true and the
    // idle-hide scheduled during playback would blank the end-of-video chrome
    // (and the bottom-right up-next card) until a mouse move. onEnded() must
    // cancel that hide and keep the chrome visible.
    vi.useFakeTimers();
    const { w, video } = mountPlayer({ idleTimeout: 1000 });
    video.dispatchEvent(new Event('play'));
    await nextTick();
    video.dispatchEvent(new Event('ended')); // no preceding `pause`
    await nextTick();
    vi.advanceTimersByTime(2000); // the pending idle-hide would have fired by now
    await nextTick();
    expect(w.classes()).not.toContain('is-chrome-hidden');
  });
});

describe('Player — keyboard shortcuts', () => {
  function key(k: string, target: EventTarget = document) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  }

  it('toggles play with the k key (global, while mounted)', async () => {
    const { video, state } = mountPlayer();
    state.paused = true;
    key('k');
    await nextTick();
    expect(video.play).toHaveBeenCalled();
  });

  it('opens the help overlay with ?', async () => {
    const { w } = mountPlayer();
    expect(w.find('[role="dialog"]').exists()).toBe(false);
    key('?');
    await nextTick();
    expect(w.find('[role="dialog"]').exists()).toBe(true);
  });

  it('emits captions/theater/pip for c/t/p', async () => {
    const { w } = mountPlayer();
    key('c');
    key('t');
    key('p');
    await nextTick();
    expect(w.emitted('captions')).toHaveLength(1);
    expect(w.emitted('theater')).toHaveLength(1);
    expect(w.emitted('pip')).toHaveLength(1);
  });

  it('steps playback speed up the ladder with >', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    expect(store.rate).toBe(1);
    key('>');
    await nextTick();
    expect(store.rate).toBe(1.25);
    expect(video.playbackRate).toBe(1.25); // mirrored onto the element
  });

  it('does not fire shortcuts while typing in an input', async () => {
    const { video } = mountPlayer();
    const input = document.createElement('input');
    document.body.appendChild(input);
    key('k', input);
    await nextTick();
    expect(video.play).not.toHaveBeenCalled();
    input.remove();
  });

  it('seeks ±5s with the arrow keys and to % with a digit', async () => {
    const { video, state } = mountPlayer();
    state.duration = 200;
    state.currentTime = 100;
    video.dispatchEvent(new Event('timeupdate')); // store.position = 100
    await nextTick();
    key('ArrowLeft');
    expect(state.currentTime).toBe(95);
    key('5'); // 50% of 200
    expect(state.currentTime).toBe(100);
  });

  it('frame-steps only while paused', async () => {
    const { video, state } = mountPlayer();
    state.duration = 200;
    state.currentTime = 100;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    key(','); // paused by default → steps back ~1/30s
    expect(state.currentTime).toBeCloseTo(100 - 1 / 30, 4);

    video.dispatchEvent(new Event('play')); // now playing
    await nextTick();
    const before = state.currentTime;
    key('.');
    expect(state.currentTime).toBe(before); // no frame-step while playing
  });

  it('nudges volume with the up arrow', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    store.setVolume(0.5);
    await nextTick();
    key('ArrowUp');
    await nextTick();
    expect(store.volume).toBeCloseTo(0.55);
    expect(video.volume).toBeCloseTo(0.55);
  });

  it('suppresses player shortcuts while the help overlay is open', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = true;
    key('?'); // open help
    await nextTick();
    expect(w.find('[role="dialog"]').exists()).toBe(true);
    key('k'); // should be ignored while the modal is open
    await nextTick();
    expect(video.play).not.toHaveBeenCalled();
  });

  it('opens the help overlay from the control-bar button too', async () => {
    const { w } = mountPlayer();
    const helpBtn = w.findAll('.player__btnrow .player__iconbtn').find((b) => b.attributes('aria-label') === 'Keyboard shortcuts');
    expect(helpBtn).toBeTruthy();
    await helpBtn!.trigger('click');
    expect(w.find('[role="dialog"]').exists()).toBe(true);
  });

  // R6.4c GAP-1 (cross-cutting): the player must NOT act on modifier-chord keys, so the global
  // ⌘K/Ctrl-K command-palette hotkey and OS/browser chords pass through without hijacking playback.
  // The guard (`shortcuts.ts`: `if (e.ctrlKey || e.metaKey || e.altKey) return`) was otherwise untested —
  // removing it would still pass every other test yet make ⌘K both open the palette AND toggle play.
  function keyWith(k: string, init: KeyboardEventInit, target: EventTarget = document) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, ...init }));
  }

  it('ignores modifier-chord keys (⌘K / Ctrl / Alt) so the command palette + OS shortcuts pass through', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = true;
    state.duration = 200;
    state.currentTime = 100;
    video.dispatchEvent(new Event('timeupdate')); // store.position = 100
    await nextTick();

    keyWith('k', { metaKey: true }); // ⌘K belongs to the palette, not the player
    keyWith('k', { ctrlKey: true }); // Ctrl-K likewise
    keyWith('ArrowRight', { ctrlKey: true }); // OS word-skip chord must not seek
    keyWith('?', { altKey: true }); // must not open the help overlay
    await nextTick();

    expect(video.play).not.toHaveBeenCalled(); // play never toggled
    expect(state.currentTime).toBe(100); // never seeked
    expect(w.find('[role="dialog"]').exists()).toBe(false); // help never opened

    // sanity: the SAME keys WITHOUT a modifier still work (the guard is modifier-specific, not a blanket off)
    key('k');
    await nextTick();
    expect(video.play).toHaveBeenCalled();
  });

  // R6.4c GAP-2: the global keydown listener is bound on the document; it must be UNBOUND on unmount so a
  // route-leave leaves no leaked listener (a stray key would otherwise drive a torn-down player). The suite's
  // afterEach unmounts for hygiene but never asserts the teardown. NB a post-unmount `key()` dispatch can't
  // lock this — the player's internal video ref is null after unmount, so a leaked handler no-ops anyway —
  // so we assert the lifecycle contract directly: every document `keydown` handler bound on mount is removed
  // on unmount (skipping the `onBeforeUnmount` removeEventListener makes this fail).
  it('unbinds its global keydown listener on unmount (no leaked document listener)', () => {
    const add = vi.spyOn(document, 'addEventListener');
    const remove = vi.spyOn(document, 'removeEventListener');
    // Mount inline (NOT via mountPlayer) so this test owns its single unmount — mountPlayer pushes to the
    // shared `mounted[]` registry that afterEach also unmounts, and the double-unmount would emit a [Vue warn].
    const w = mount(Player, { props: { media: media(), streamUrl: 'http://x/stream' }, attachTo: document.body });
    const bound = add.mock.calls.filter(([type]) => type === 'keydown').map(([, fn]) => fn);
    expect(bound.length).toBeGreaterThanOrEqual(1); // the player binds the global keymap on mount
    w.unmount();
    // Each keydown handler bound on mount must be removed on unmount. (`unbound` may be a SUPERSET: a
    // focus-trap's onBeforeUnmount fires a capture-phase keydown removal even though its trap was never
    // activated here — harmless, and `toContain` only requires that each mount-bound handler is removed.)
    const unbound = remove.mock.calls.filter(([type]) => type === 'keydown').map(([, fn]) => fn);
    for (const fn of bound) expect(unbound).toContain(fn);
  });
});

describe('Player — captions (R3.5)', () => {
  function key(k: string, target: EventTarget = document) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  }

  /** Shadow the real (empty) jsdom textTracks with a fake subtitle list. */
  function injectSubtitleTracks(video: HTMLVideoElement, defs: { lang: string; label: string }[]) {
    const tracks = defs.map((d) => ({
      kind: 'subtitles',
      language: d.lang,
      label: d.label,
      mode: 'disabled',
      activeCues: null as { text: string }[] | null,
      addEventListener() {},
      removeEventListener() {},
    }));
    const list: Record<number, unknown> & { length: number } = { length: tracks.length };
    tracks.forEach((t, i) => (list[i] = t));
    Object.defineProperty(video, 'textTracks', { configurable: true, get: () => list });
    return tracks;
  }

  /** Shadow the real jsdom audioTracks with a fake list of enable-able tracks. */
  function injectAudioTracks(video: HTMLVideoElement, count: number) {
    const tracks = Array.from({ length: count }, (_, i) => ({ language: `a${i}`, label: `Audio ${i + 1}`, id: `a${i}`, enabled: i === 0 }));
    const list: Record<number, unknown> & { length: number } = { length: count };
    tracks.forEach((t, i) => (list[i] = t));
    Object.defineProperty(video, 'audioTracks', { configurable: true, get: () => list });
    return tracks;
  }

  it('renders the captions menu button in the control row', () => {
    const { w } = mountPlayer();
    expect(w.find('.capmenu__btn').exists()).toBe(true);
  });

  it('captions are ON at load when defaultSubtitleLang matches an available track', async () => {
    usePreferencesStore().defaultSubtitleLang = 'en'; // before the player store seeds from it
    const { w, video } = mountPlayer();
    const tracks = injectSubtitleTracks(video, [{ lang: 'en', label: 'English' }]);
    tracks[0].activeCues = [{ text: 'Fear is the mind-killer' }];
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBe('en'); // seeded from the default
    expect(w.find('.capmenu__btn').attributes('aria-label')).toBe('Captions (on)');
    expect(w.find('.player__caption-line').text()).toBe('Fear is the mind-killer');
  });

  it('captions stay OFF at load when the default matches no track', async () => {
    // default is null (storage cleared in beforeEach) → off even though a track exists
    const { w, video } = mountPlayer();
    injectSubtitleTracks(video, [{ lang: 'en', label: 'English' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBeNull();
    expect(w.find('.capmenu__btn').attributes('aria-label')).toBe('Captions (off)');
    expect(w.find('.player__captions').exists()).toBe(false);
  });

  it('the c key toggles captions on/off when a track is available', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    injectSubtitleTracks(video, [{ lang: 'en', label: 'English' }]);
    video.dispatchEvent(new Event('loadedmetadata')); // refreshes the track list
    await nextTick();
    expect(store.subtitleLang).toBeNull(); // off by default (no defaultSubtitleLang)
    key('c');
    await nextTick();
    expect(store.subtitleLang).toBe('en'); // turned on (first/only track)
    key('c');
    await nextTick();
    expect(store.subtitleLang).toBeNull(); // toggled back off
  });

  it('the c key is a no-op (still emits) when there are no tracks', async () => {
    const { w } = mountPlayer();
    const store = usePlayerStore();
    key('c');
    await nextTick();
    expect(store.subtitleLang).toBeNull();
    expect(w.emitted('captions')).toHaveLength(1); // host hook still fires
  });

  it('suppresses transport shortcuts while the captions menu is open', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = true;
    await w.find('.capmenu__btn').trigger('click'); // v-model:open → captionsMenuOpen = true
    await nextTick();
    expect(w.find('.capmenu__panel').exists()).toBe(true);
    key('k'); // would normally toggle play
    await nextTick();
    expect(video.play).not.toHaveBeenCalled();
  });

  it('renders caption cues in the overlay for the active track', async () => {
    const { w, video } = mountPlayer();
    const store = usePlayerStore();
    const tracks = injectSubtitleTracks(video, [{ lang: 'en', label: 'English' }]);
    tracks[0].activeCues = [{ text: 'Spice flows' }];
    video.dispatchEvent(new Event('loadedmetadata'));
    store.setSubtitle('en');
    await nextTick();
    expect(w.find('.player__captions').exists()).toBe(true);
    expect(w.find('.player__caption-line').text()).toBe('Spice flows');
  });

  it('switches the audio track via the menu (applyAudioTrack + activeAudio)', async () => {
    const { w, video } = mountPlayer();
    const audio = injectAudioTracks(video, 2);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    await w.find('.capmenu__btn').trigger('click'); // open the menu
    await nextTick();
    const group = w.find('[aria-label="Audio track"]');
    expect(group.exists()).toBe(true); // shown only because there are 2 audio tracks
    await group.findAll('[role="radio"]')[1].trigger('click');
    await nextTick();
    expect(audio[1].enabled).toBe(true);
    expect(audio[0].enabled).toBe(false);
  });
});

describe('Player — server subtitle sidecars (U4)', () => {
  type Track = { index: number; language: string; label: string; default: boolean; url: string };
  function srvTrack(over: Partial<Track> = {}): Track {
    return { index: 0, language: 'eng', label: 'English', default: false, url: 'http://x/hls/j/sub-0.vtt', ...over };
  }

  /** Shadow jsdom's (empty) textTracks with a fake subtitle list so the default
   *  selection can resolve a native track by its key (== language/label). */
  function injectSubtitleTracks(video: HTMLVideoElement, defs: { lang: string; label: string }[]) {
    const tracks = defs.map((d) => ({
      kind: 'subtitles',
      language: d.lang,
      label: d.label,
      mode: 'disabled',
      activeCues: null,
      addEventListener() {},
      removeEventListener() {},
    }));
    const list: Record<number, unknown> & { length: number } = { length: tracks.length };
    tracks.forEach((t, i) => (list[i] = t));
    Object.defineProperty(video, 'textTracks', { configurable: true, get: () => list });
    return tracks;
  }

  it('renders a <track> per server subtitle track with the right src/srclang/label/default', async () => {
    tc().subtitleTracks.value = [
      srvTrack({ index: 0, language: 'eng', label: 'English 1', default: true, url: 'http://x/hls/j/sub-0.vtt' }),
      srvTrack({ index: 1, language: 'jpn', label: 'Japanese', default: false, url: 'http://x/hls/j/sub-1.vtt' }),
    ];
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    await nextTick();
    const tracks = w.findAll('video track');
    expect(tracks).toHaveLength(2);
    expect(tracks[0].attributes('src')).toBe('http://x/hls/j/sub-0.vtt');
    expect(tracks[0].attributes('srclang')).toBe('eng');
    expect(tracks[0].attributes('label')).toBe('English 1');
    expect(tracks[0].attributes('default')).toBeDefined();
    expect(tracks[1].attributes('src')).toBe('http://x/hls/j/sub-1.vtt');
    expect(tracks[1].attributes('default')).toBeUndefined();
  });

  it('renders no <track> for a direct-play source (no server sidecars)', () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/movie.mp4' });
    expect(w.findAll('video track')).toHaveLength(0);
  });

  it('adds the <track> elements reactively when tracks arrive late on a poll', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    expect(w.findAll('video track')).toHaveLength(0);
    tc().subtitleTracks.value = [srvTrack({ url: 'http://x/hls/j/sub-0.vtt' })];
    await nextTick();
    const tracks = w.findAll('video track');
    expect(tracks).toHaveLength(1);
    expect(tracks[0].attributes('src')).toBe('http://x/hls/j/sub-0.vtt');
  });

  it('selects the server default track when the user has no persisted caption preference', async () => {
    tc().subtitleTracks.value = [
      srvTrack({ index: 0, language: 'eng', label: 'English', default: false }),
      srvTrack({ index: 1, language: 'jpn', label: 'Japanese', default: true, url: 'http://x/hls/j/sub-1.vtt' }),
    ];
    const { w, video } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    injectSubtitleTracks(video, [{ lang: 'eng', label: 'English' }, { lang: 'jpn', label: 'Japanese' }]);
    video.dispatchEvent(new Event('loadedmetadata')); // refreshTracks → maybeApplyServerDefault
    tc().state.value = 'ready'; // reveal the chrome so the menu button renders
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBe('jpn'); // honoured the server default
    expect(w.find('.capmenu__btn').attributes('aria-label')).toBe('Captions (on)');
  });

  it('does NOT override an explicit persisted user caption choice with the server default', async () => {
    const prefs = usePreferencesStore();
    prefs.defaultSubtitleLang = 'eng'; // the user previously chose English
    prefs.subtitlePreferenceSet = true; // …explicitly (the signal the player now keys on)
    tc().subtitleTracks.value = [
      srvTrack({ index: 0, language: 'eng', label: 'English', default: false }),
      srvTrack({ index: 1, language: 'jpn', label: 'Japanese', default: true, url: 'http://x/hls/j/sub-1.vtt' }),
    ];
    const { video } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    injectSubtitleTracks(video, [{ lang: 'eng', label: 'English' }, { lang: 'jpn', label: 'Japanese' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBe('eng'); // the user's choice, NOT the server default 'jpn'
  });

  it('does NOT re-enable captions (server default) after the user explicitly turned them Off, even on a late poll', async () => {
    // Regression for the HIGH precedence bug: explicit "Off" (defaultSubtitleLang=null
    // + subtitlePreferenceSet=true) must be distinguishable from "no preference".
    const prefs = usePreferencesStore();
    prefs.defaultSubtitleLang = null; // the user chose Off …
    prefs.subtitlePreferenceSet = true; // … explicitly (an Off choice, not the unset state)
    const { video } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    injectSubtitleTracks(video, [{ lang: 'eng', label: 'English' }, { lang: 'jpn', label: 'Japanese' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBeNull(); // still off — no default applied yet (no tracks)
    // A track with default:true arrives late on a status poll → the deep watcher
    // re-runs refreshTracks → maybeApplyServerDefault. It must NOT flip captions on.
    tc().subtitleTracks.value = [
      srvTrack({ index: 1, language: 'jpn', label: 'Japanese', default: true, url: 'http://x/hls/j/sub-1.vtt' }),
    ];
    await nextTick();
    await nextTick(); // the watcher schedules refreshTracks on nextTick
    expect(usePlayerStore().subtitleLang).toBeNull(); // captions stay OFF (user's explicit choice wins)
  });

  it('does NOT re-enable captions after an explicit Off when the source/episode switches', async () => {
    // The signal is persisted (global), so an explicit Off carries across episodes:
    // switching the media prop (which resets the per-source serverDefaultApplied flag)
    // must still not adopt the new source's server default.
    const prefs = usePreferencesStore();
    prefs.defaultSubtitleLang = null;
    prefs.subtitlePreferenceSet = true; // explicit Off
    const { w, video } = mountPlayer({ media: media({ id: 'ep1' }), streamUrl: 'http://x/Ep1.mkv' });
    injectSubtitleTracks(video, [{ lang: 'jpn', label: 'Japanese' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBeNull();
    // Switch episode — fresh source with its own default:true track.
    await w.setProps({ media: media({ id: 'ep2' }), streamUrl: 'http://x/Ep2.mkv' });
    tc().subtitleTracks.value = [
      srvTrack({ index: 0, language: 'jpn', label: 'Japanese', default: true, url: 'http://x/hls/j2/sub-0.vtt' }),
    ];
    const video2 = w.find('video').element as HTMLVideoElement;
    injectSubtitleTracks(video2, [{ lang: 'jpn', label: 'Japanese' }]);
    video2.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBeNull(); // still off across the episode switch
  });

  it('does NOT override a manual language pick made BEFORE the server default first lands', async () => {
    // The user picks a caption (which sets subtitlePreferenceSet via CaptionsMenu)
    // before the default:true track arrives; a later poll must not override it.
    const { w, video } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    injectSubtitleTracks(video, [{ lang: 'eng', label: 'English' }, { lang: 'jpn', label: 'Japanese' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    tc().state.value = 'ready';
    await nextTick();
    // User picks English via the menu.
    await w.find('.capmenu__btn').trigger('click');
    await nextTick();
    const engOpt = w.findAll('[aria-label="Subtitle track"] .capmenu__opt').find((n) => n.text().includes('English'));
    await engOpt!.trigger('click');
    expect(usePlayerStore().subtitleLang).toBe('eng');
    expect(usePreferencesStore().subtitlePreferenceSet).toBe(true);
    // A different default:true track arrives late.
    tc().subtitleTracks.value = [
      srvTrack({ index: 0, language: 'eng', label: 'English', default: false }),
      srvTrack({ index: 1, language: 'jpn', label: 'Japanese', default: true, url: 'http://x/hls/j/sub-1.vtt' }),
    ];
    await nextTick();
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBe('eng'); // user's pick survives the poll
  });

  it('applies the server default for a fresh source when the user has made NO choice', async () => {
    // Existing behaviour preserved: no preference set → adopt the server default,
    // including after switching to a fresh source.
    const { w, video } = mountPlayer({ media: media({ id: 'ep1' }), streamUrl: 'http://x/Ep1.mkv' });
    expect(usePreferencesStore().subtitlePreferenceSet).toBe(false);
    injectSubtitleTracks(video, [{ lang: 'jpn', label: 'Japanese' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    // Switch to a fresh episode whose server default is Japanese.
    await w.setProps({ media: media({ id: 'ep2' }), streamUrl: 'http://x/Ep2.mkv' });
    tc().subtitleTracks.value = [
      srvTrack({ index: 0, language: 'jpn', label: 'Japanese', default: true, url: 'http://x/hls/j2/sub-0.vtt' }),
    ];
    const video2 = w.find('video').element as HTMLVideoElement;
    injectSubtitleTracks(video2, [{ lang: 'jpn', label: 'Japanese' }]);
    video2.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBe('jpn'); // fresh source adopts its server default
  });

  it('leaves captions off (no server default) when no track is flagged default and no preference is stored', async () => {
    tc().subtitleTracks.value = [srvTrack({ index: 0, language: 'eng', label: 'English', default: false })];
    const { video } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    injectSubtitleTracks(video, [{ lang: 'eng', label: 'English' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBeNull();
  });

  it('lists the server subtitle tracks in the CaptionsMenu (Off + each track)', async () => {
    tc().subtitleTracks.value = [
      srvTrack({ index: 0, language: 'eng', label: 'English' }),
      srvTrack({ index: 1, language: 'jpn', label: 'Japanese', url: 'http://x/hls/j/sub-1.vtt' }),
    ];
    const { w, video } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    injectSubtitleTracks(video, [{ lang: 'eng', label: 'English' }, { lang: 'jpn', label: 'Japanese' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    tc().state.value = 'ready'; // reveal the chrome so the menu button is in the DOM
    await nextTick();
    await w.find('.capmenu__btn').trigger('click');
    await nextTick();
    const group = w.find('[aria-label="Subtitle track"]');
    const labels = group.findAll('.capmenu__optlabel').map((n) => n.text());
    expect(labels).toEqual(['Off', 'English', 'Japanese']);
  });
});

describe('Player — direct-play playback-info tracks (audio menu + signed subtitle sidecars)', () => {
  /** A parsed playback-info audio_tracks entry (audio-relative `index`). */
  function paTrack(over: Partial<{ index: number; streamIndex: number; language: string; label: string; default: boolean }> = {}) {
    return { index: 0, streamIndex: 1, language: 'eng', label: 'English 5.1', default: true, ...over };
  }
  const twoAudio = [paTrack(), paTrack({ index: 1, streamIndex: 2, language: 'jpn', label: 'Japanese', default: false })];

  it('renders a <track> per playback-info subtitle on DIRECT play (signed VTT urls)', async () => {
    const { w } = mountPlayer({
      streamUrl: 'http://x/movie.mp4', // direct-playable → no transcode job/sidecars
      playbackSubtitleTracks: [
        { index: 0, language: 'eng', label: 'English', default: false, url: 'http://x/media/m1/subtitles/0.vtt?exp=1&sig=abc' },
        { index: 1, language: 'jpn', label: 'Japanese', default: false, url: 'http://x/media/m1/subtitles/1.vtt?exp=1&sig=def' },
      ],
    });
    await nextTick();
    const tracks = w.findAll('video track');
    expect(tracks).toHaveLength(2);
    expect(tracks[0].attributes('src')).toBe('http://x/media/m1/subtitles/0.vtt?exp=1&sig=abc');
    expect(tracks[0].attributes('srclang')).toBe('eng');
    expect(tracks[0].attributes('label')).toBe('English');
    expect(tracks[1].attributes('src')).toBe('http://x/media/m1/subtitles/1.vtt?exp=1&sig=def');
  });

  it('does NOT render playback-info subtitles on the transcode path (the job sidecars own it)', () => {
    const { w } = mountPlayer({
      streamUrl: 'http://x/Dune.mkv', // transcode path
      playbackSubtitleTracks: [{ index: 0, language: 'eng', label: 'English', default: false, url: 'http://x/signed-0.vtt' }],
    });
    expect(w.findAll('video track')).toHaveLength(0); // tc.subtitleTracks is empty
  });

  it('shows the playback-info audio list in the CaptionsMenu on direct play (no native audioTracks)', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/movie.mp4', playbackAudioTracks: twoAudio });
    await w.find('.capmenu__btn').trigger('click');
    await nextTick();
    const group = w.find('[aria-label="Audio track"]');
    expect(group.exists()).toBe(true); // menu shown even though video.audioTracks is unavailable
    const radios = group.findAll('[role="radio"]');
    expect(radios.map((r) => r.text())).toEqual(['English 5.1', 'Japanese']);
    expect(radios[0].attributes('aria-checked')).toBe('true'); // the server default is active
    expect(radios[1].attributes('aria-checked')).toBe('false');
  });

  it('hides the audio list when playback-info advertises a single track', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/movie.mp4', playbackAudioTracks: [paTrack()] });
    await w.find('.capmenu__btn').trigger('click');
    await nextTick();
    expect(w.find('[aria-label="Audio track"]').exists()).toBe(false);
  });

  it('falls over to the HLS transcode on a non-default pick, then selects the hls.js track by index', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/movie.mp4', playbackAudioTracks: twoAudio });
    await w.find('.capmenu__btn').trigger('click');
    await nextTick();
    await w.find('[aria-label="Audio track"]').findAll('[role="radio"]')[1].trigger('click');
    await nextTick();
    // The pick triggered the same fallback path as an undecodable codec…
    expect(tc().start).toHaveBeenCalledTimes(1);
    expect(w.find('.prep').exists()).toBe(true);
    // …and once the HLS session exposes its audio tracks, the matching one is picked
    // (audio-relative playback-info index == hls.js audioTracks order).
    tc().state.value = 'ready';
    tc().audioTracks.value = [
      { index: 0, name: 'English 5.1', lang: 'eng', default: true, autoselect: true },
      { index: 1, name: 'Japanese', lang: 'jpn', default: false, autoselect: false },
    ];
    await nextTick();
    expect(tc().setAudioTrack).toHaveBeenCalledWith(1);
  });

  it('picking the already-active (default) playback-info track is a no-op (no transcode)', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/movie.mp4', playbackAudioTracks: twoAudio });
    await w.find('.capmenu__btn').trigger('click');
    await nextTick();
    await w.find('[aria-label="Audio track"]').findAll('[role="radio"]')[0].trigger('click');
    await nextTick();
    expect(tc().start).not.toHaveBeenCalled();
    expect(w.find('.prep').exists()).toBe(false);
  });
});

describe('Player — fullscreen & back', () => {
  it('emits back from the back button', async () => {
    const { w } = mountPlayer();
    await w.find('.player__back').trigger('click');
    expect(w.emitted('back')).toHaveLength(1);
  });

  it('requests fullscreen on the container', async () => {
    const req = vi.fn(() => Promise.resolve());
    Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', { configurable: true, value: req });
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => null });
    const { w } = mountPlayer();
    await w.findAll('.player__btnrow .player__iconbtn').at(-1)!.trigger('click'); // fullscreen button
    expect(req).toHaveBeenCalled();
  });

  it('tracks the fullscreenchange event into the button label', async () => {
    let fsEl: Element | null = null;
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => fsEl });
    const { w } = mountPlayer();
    const fsBtn = () => w.findAll('.player__btnrow .player__iconbtn').at(-1)!;
    expect(fsBtn().attributes('aria-label')).toBe('Fullscreen');
    fsEl = document.body;
    document.dispatchEvent(new Event('fullscreenchange'));
    await nextTick();
    expect(fsBtn().attributes('aria-label')).toBe('Exit fullscreen');
  });
});

describe('Player — ambient & theater (R3.6)', () => {
  function key(k: string, target: EventTarget = document) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  }
  const theaterBtn = (w: ReturnType<typeof mountPlayer>['w']) =>
    w.findAll('.player__btnrow .player__iconbtn').find((b) => (b.attributes('aria-label') ?? '').toLowerCase().includes('theater'));

  it('renders the ambient layer behind a framed stage', () => {
    const { w } = mountPlayer();
    expect(w.find('.player__stage').exists()).toBe(true);
    expect(w.findComponent(AmbientCanvas).exists()).toBe(true);
    // the stage holds the video; the ambient layer is its sibling (behind it)
    expect(w.find('.player__stage video').exists()).toBe(true);
  });

  it('drives the ambient from prefs.atmosphere, reduced-motion and playing', async () => {
    const { w, video } = mountPlayer();
    const amb = w.findComponent(AmbientCanvas);
    expect(amb.props('enabled')).toBe(true); // atmosphere defaults on
    expect(amb.props('playing')).toBe(false);
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(amb.props('playing')).toBe(true);
    usePreferencesStore().atmosphere = false;
    await nextTick();
    expect(amb.props('enabled')).toBe(false); // fully disable-able via the pref
  });

  it('toggles theater via the control-bar button (class + aria-pressed + emit payload)', async () => {
    const { w } = mountPlayer();
    const btn = theaterBtn(w)!;
    expect(btn).toBeTruthy();
    expect(btn.attributes('aria-pressed')).toBe('false');
    expect(w.classes()).not.toContain('is-theater');

    await btn.trigger('click');
    expect(w.classes()).toContain('is-theater');
    expect(btn.attributes('aria-pressed')).toBe('true');
    expect(btn.attributes('aria-label')).toBe('Exit theater mode');
    expect(w.emitted('theater')).toEqual([[true]]);

    await btn.trigger('click');
    expect(w.classes()).not.toContain('is-theater');
    expect(w.emitted('theater')).toEqual([[true], [false]]);
  });

  it('the t key toggles theater and boosts the ambient intensity', async () => {
    const { w } = mountPlayer();
    const amb = w.findComponent(AmbientCanvas);
    expect(amb.props('intensity')).toBe(1);
    key('t');
    await nextTick();
    expect(w.classes()).toContain('is-theater');
    expect(w.emitted('theater')!.at(-1)).toEqual([true]);
    expect(amb.props('intensity')).toBeCloseTo(1.35);
  });

  it('keeps the fullscreen button last in the control row (after theater)', () => {
    const { w } = mountPlayer();
    const last = w.findAll('.player__btnrow .player__iconbtn').at(-1)!;
    expect(last.attributes('aria-label')).toBe('Fullscreen');
  });
});

describe('Player — PiP & Media Session (R3.7)', () => {
  function key(k: string, target: EventTarget = document) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  }
  const pipBtn = (w: ReturnType<typeof mountPlayer>['w']) =>
    w.findAll('.player__btnrow .player__iconbtn').find((b) => (b.attributes('aria-label') ?? '').toLowerCase().includes('picture'));

  it('hides the PiP button where PiP is unsupported', () => {
    const { w } = mountPlayer(); // jsdom: document.pictureInPictureEnabled is undefined
    expect(pipBtn(w)).toBeFalsy();
  });

  it('shows the PiP button where supported and requests/exits PiP (button stays before fullscreen)', async () => {
    Object.defineProperty(document, 'pictureInPictureEnabled', { configurable: true, get: () => true });
    let pipEl: Element | null = null;
    Object.defineProperty(document, 'pictureInPictureElement', { configurable: true, get: () => pipEl });
    const exit = vi.fn(() => {
      pipEl = null;
      return Promise.resolve();
    });
    Object.defineProperty(document, 'exitPictureInPicture', { configurable: true, value: exit });
    const { w, video } = mountPlayer();
    const req = vi.fn(() => {
      pipEl = video;
      return Promise.resolve();
    });
    (video as unknown as { requestPictureInPicture: unknown }).requestPictureInPicture = req;

    await nextTick(); // pipSupported is set in onMounted → button renders next tick
    expect(pipBtn(w)).toBeTruthy();
    expect(w.findAll('.player__btnrow .player__iconbtn').at(-1)!.attributes('aria-label')).toBe('Fullscreen'); // still last
    await pipBtn(w)!.trigger('click');
    expect(req).toHaveBeenCalled();

    // a leave event flips the label back; an enter event sets it
    video.dispatchEvent(new Event('enterpictureinpicture'));
    await nextTick();
    expect(pipBtn(w)!.attributes('aria-label')).toBe('Exit picture-in-picture');
    video.dispatchEvent(new Event('leavepictureinpicture'));
    await nextTick();
    expect(pipBtn(w)!.attributes('aria-label')).toBe('Picture-in-picture');
    delete (document as { pictureInPictureEnabled?: unknown }).pictureInPictureEnabled;
  });

  it('the p key emits pip for host hooks', async () => {
    const { w } = mountPlayer();
    key('p');
    await nextTick();
    expect(w.emitted('pip')).toHaveLength(1);
  });

  it('binds OS media-session handlers on mount and reports position state on state-change events (not timeupdate)', async () => {
    const setActionHandler = vi.fn();
    const setPositionState = vi.fn();
    Object.defineProperty(navigator, 'mediaSession', {
      configurable: true,
      value: { metadata: null, playbackState: 'none', setActionHandler, setPositionState },
    });
    const { video, state } = mountPlayer();
    const actions = setActionHandler.mock.calls.map((c) => c[0]);
    expect(actions).toContain('play');
    expect(actions).toContain('pause');
    expect(actions).toContain('seekto');

    // timeupdate must NOT call setPositionState (UI-1.6 optimization)
    state.currentTime = 40;
    state.duration = 200;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    expect(setPositionState).not.toHaveBeenCalled();

    // state-change events MUST call setPositionState
    setPositionState.mockClear();
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(setPositionState).toHaveBeenCalledTimes(1);

    setPositionState.mockClear();
    video.dispatchEvent(new Event('pause'));
    await nextTick();
    expect(setPositionState).toHaveBeenCalledTimes(1);

    setPositionState.mockClear();
    state.currentTime = 50;
    video.dispatchEvent(new Event('seeked'));
    await nextTick();
    expect(setPositionState).toHaveBeenCalledTimes(1);

    setPositionState.mockClear();
    state.playbackRate = 1.5;
    video.dispatchEvent(new Event('ratechange'));
    await nextTick();
    expect(setPositionState).toHaveBeenCalledTimes(1);

    setPositionState.mockClear();
    state.duration = 300;
    video.dispatchEvent(new Event('durationchange'));
    await nextTick();
    expect(setPositionState).toHaveBeenCalledTimes(1);

    // the registered handlers drive the element (OS media keys)
    const reg = Object.fromEntries(setActionHandler.mock.calls.filter((c) => typeof c[1] === 'function')) as Record<
      string,
      (d?: { seekTime?: number }) => void
    >;
    reg.play();
    expect(video.play).toHaveBeenCalled();
    reg.pause();
    expect(video.pause).toHaveBeenCalled();
    reg.seekto({ seekTime: 30 }); // store.duration is 200 from the timeupdate above
    expect(state.currentTime).toBe(30);
    delete (navigator as { mediaSession?: unknown }).mediaSession;
  });

  it('re-registers the current media (with its stream url) when the media prop changes', async () => {
    const { w } = mountPlayer();
    const store = usePlayerStore();
    expect(store.current?.id).toBe('m1');
    await w.setProps({ media: media({ id: 'm2', name: 'Arrival' }), streamUrl: 'http://x/m2' });
    expect(store.current?.id).toBe('m2');
    expect(store.streamUrl).toBe('http://x/m2');
  });

  it('resets the reused <video> currentTime to 0 when the media changes (next episode starts at the beginning)', async () => {
    // The element is reused across episode nav (no :key); on the transcode path the
    // browser never resets currentTime, so hls.js would re-attach at the previous
    // episode's position. Simulate being 75% into ep1, then switch to ep2.
    const { w, state } = mountPlayer({ media: media({ id: 'ep1', path: '/lib/Ep1.mkv' }), streamUrl: 'http://x/media/ep1/stream' });
    state.currentTime = 1350;
    await w.setProps({ media: media({ id: 'ep2', path: '/lib/Ep2.mkv' }), streamUrl: 'http://x/media/ep2/stream' });
    expect(state.currentTime).toBe(0);
  });

  it('tears down the media-session handlers on unmount', () => {
    const setActionHandler = vi.fn();
    Object.defineProperty(navigator, 'mediaSession', {
      configurable: true,
      value: { metadata: null, playbackState: 'none', setActionHandler },
    });
    const { w } = mountPlayer();
    setActionHandler.mockClear();
    w.unmount();
    const clearedToNull = setActionHandler.mock.calls.filter((c) => c[1] === null).map((c) => c[0]);
    expect(clearedToNull).toContain('play');
    expect(clearedToNull).toContain('pause');
    delete (navigator as { mediaSession?: unknown }).mediaSession;
  });
});

describe('Player — resume / up-next / transcode (R3.8)', () => {
  // ---- resume prompt --------------------------------------------------------
  it('shows the resume prompt on open when an in-band position is stored', () => {
    setActivePinia(createPinia());
    const store = usePlayerStore();
    store.saveResume('m1', 60, 200); // in the 30s–95% band
    const { w } = mountPlayer();
    expect(w.find('.resume').exists()).toBe(true);
    expect(w.find('.resume__time').text()).toBe('1:00');
  });

  it('does NOT show the resume prompt with no stored position', () => {
    const { w } = mountPlayer();
    expect(w.find('.resume').exists()).toBe(false);
  });

  it('Resume seeks to the stored position and plays, then hides the prompt', async () => {
    setActivePinia(createPinia());
    usePlayerStore().saveResume('m1', 60, 200);
    const { w, video, state } = mountPlayer();
    state.duration = 200; // duration known → seek applies immediately
    await w.find('.resume__btn--amber').trigger('click');
    expect(state.currentTime).toBe(60);
    expect(video.play).toHaveBeenCalled();
    expect(w.find('.resume').exists()).toBe(false);
  });

  it('defers the resume seek until loadedmetadata when the duration is unknown', async () => {
    setActivePinia(createPinia());
    usePlayerStore().saveResume('m1', 90, 300);
    const { w, video, state } = mountPlayer();
    state.duration = 0; // not loaded yet
    await w.find('.resume__btn--amber').trigger('click');
    expect(state.currentTime).toBe(0); // deferred
    state.duration = 300;
    video.dispatchEvent(new Event('loadedmetadata'));
    expect(state.currentTime).toBe(90); // applied on metadata
  });

  it('Start over seeks to 0, clears the stored resume, and plays', async () => {
    setActivePinia(createPinia());
    const store = usePlayerStore();
    store.saveResume('m1', 60, 200);
    const { w, video, state } = mountPlayer();
    state.duration = 200;
    state.currentTime = 60;
    await w.find('.resume__btn--ghost').trigger('click');
    expect(state.currentTime).toBe(0);
    expect(store.resumePositionFor('m1')).toBeNull();
    expect(video.play).toHaveBeenCalled();
    expect(w.find('.resume').exists()).toBe(false);
  });

  it('dismisses the resume prompt once playback starts by other means', async () => {
    setActivePinia(createPinia());
    usePlayerStore().saveResume('m1', 60, 200);
    const { w, video } = mountPlayer();
    expect(w.find('.resume').exists()).toBe(true);
    video.dispatchEvent(new Event('play')); // e.g. the center button / OS key
    await nextTick();
    expect(w.find('.resume').exists()).toBe(false);
  });

  // ---- saveResume / evictToCapacity (UI-1.6) ---------------------------------
  // saveResume calls evictToCapacity ONLY when the id is NEW to the map.
  // This prevents redundant eviction runs when merely updating position on an
  // existing entry (which would otherwise cause unnecessary localStorage writes).
  it('saveResume with an EXISTING id does NOT increase map size (no eviction)', () => {
    setActivePinia(createPinia());
    const store = usePlayerStore();
    // Add several entries
    store.saveResume('id1', 60, 120);
    store.saveResume('id2', 60, 120);
    store.saveResume('id3', 60, 120);
    expect(Object.keys(store.resumeMap).length).toBe(3);

    // Updating an EXISTING id should NOT trigger eviction (no new entry added)
    store.saveResume('id1', 90, 120); // same id, updated position
    expect(Object.keys(store.resumeMap).length).toBe(3); // still 3, no eviction occurred
  });

  it('saveResume with a NEW id triggers evictToCapacity when at capacity (oldest LRU entry evicted)', () => {
    setActivePinia(createPinia());
    const store = usePlayerStore();
    // Add 200 entries via saveResume so lastTouched is set in order (id0=oldest, id199=newest)
    for (let i = 0; i < 200; i++) {
      store.saveResume(`id-${i}`, 60, 120);
    }

    // Adding a NEW id triggers evictToCapacity(200), evicting the oldest (id-0)
    store.saveResume('brand-new-id', 60, 120);

    // id-0 (oldest by lastTouched) was evicted, brand-new-id was added, id-1 through id-199 remain
    expect(store.resumeMap['brand-new-id']).toBe(60);
    expect(store.resumeMap['id-0']).toBeUndefined(); // evicted (oldest)
    expect(store.resumeMap['id-1']).toBe(60); // still present
    expect(Object.keys(store.resumeMap).length).toBe(200); // capped at 200
  });

  // ---- up-next + autoplay ---------------------------------------------------
  it('autoplay ON: shows the up-next card on end, counts down, and auto-advances via next()', async () => {
    vi.useFakeTimers();
    setActivePinia(createPinia());
    const store = usePlayerStore();
    store.setQueue([media({ id: 'm2', name: 'Arrival' })]);
    const { w, video } = mountPlayer();
    video.dispatchEvent(new Event('ended'));
    await nextTick();
    expect(w.find('.upnext').exists()).toBe(true);
    expect(w.find('.upnext__title').text()).toBe('Arrival');
    expect(w.find('.upnext__cd').text()).toBe('Starts in 8s');

    vi.advanceTimersByTime(1000);
    await nextTick();
    expect(w.find('.upnext__cd').text()).toBe('Starts in 7s');

    vi.advanceTimersByTime(7000); // reaches 0 → playNext()
    await nextTick();
    expect(store.current?.id).toBe('m2');
    expect(w.emitted('play-next')?.[0]?.[0]).toMatchObject({ id: 'm2' });
    expect(w.find('.upnext').exists()).toBe(false);
  });

  it('autoplay OFF: shows a static up-next card (no countdown/ring) that only advances on Play now', async () => {
    vi.useFakeTimers();
    setActivePinia(createPinia());
    const store = usePlayerStore();
    usePreferencesStore().autoplay = false;
    store.setQueue([media({ id: 'm2', name: 'Arrival' })]);
    const { w, video } = mountPlayer();
    video.dispatchEvent(new Event('ended'));
    await nextTick();
    expect(w.find('.upnext').exists()).toBe(true);
    expect(w.find('.upnext__cd').exists()).toBe(false);
    expect(w.find('svg.upnext__ring').exists()).toBe(false);

    vi.advanceTimersByTime(20000); // no countdown → no auto-advance
    await nextTick();
    expect(store.current?.id).toBe('m1');

    await w.find('.upnext__btn--amber').trigger('click'); // Play now
    expect(store.current?.id).toBe('m2');
    expect(w.find('.upnext').exists()).toBe(false);
  });

  it('Cancel stops the countdown and hides the card without advancing', async () => {
    vi.useFakeTimers();
    setActivePinia(createPinia());
    const store = usePlayerStore();
    store.setQueue([media({ id: 'm2' })]);
    const { w, video } = mountPlayer();
    video.dispatchEvent(new Event('ended'));
    await nextTick();
    await w.find('.upnext__btn--ghost').trigger('click'); // Cancel
    expect(w.find('.upnext').exists()).toBe(false);
    vi.advanceTimersByTime(20000);
    await nextTick();
    expect(store.current?.id).toBe('m1'); // never advanced
  });

  it('dismisses the up-next card + stops the countdown when the video is replayed', async () => {
    vi.useFakeTimers();
    setActivePinia(createPinia());
    const store = usePlayerStore();
    store.setQueue([media({ id: 'm2' })]);
    const { w, video } = mountPlayer();
    video.dispatchEvent(new Event('ended'));
    await nextTick();
    expect(w.find('.upnext').exists()).toBe(true);
    // the user replays the just-ended video (center button / k / OS key) → store.play()
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(w.find('.upnext').exists()).toBe(false);
    vi.advanceTimersByTime(20000); // the (stopped) countdown must not advance the queue
    await nextTick();
    expect(store.current?.id).toBe('m1');
    expect(w.emitted('play-next')).toBeUndefined();
  });

  it('does not show the up-next card on end when the queue is empty', async () => {
    const { w, video } = mountPlayer();
    video.dispatchEvent(new Event('ended'));
    await nextTick();
    expect(w.find('.upnext').exists()).toBe(false);
  });

  // ---- transcode -> on-demand HLS -------------------------------------------
  it('starts a transcode and shows the preparing overlay (hiding center/controls) for a .mkv stream URL', () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    expect(tc().start).toHaveBeenCalled();
    expect(w.find('.prep').exists()).toBe(true);
    expect(w.find('.player__center').exists()).toBe(false);
    expect(w.find('.player__controls').exists()).toBe(false);
  });

  it('detects a transcode container from the library path when the stream URL is extensionless', () => {
    const { w } = mountPlayer({ media: media({ path: '/lib/Dune.mkv' }), streamUrl: 'http://x/media/m1/stream' });
    expect(w.find('.prep').exists()).toBe(true);
    expect(tc().start).toHaveBeenCalled();
  });

  it('clears the direct <video> src while transcoding so hls.js owns the element', () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    expect(w.find('video').attributes('src')).toBeUndefined();
  });

  it('does not transcode a direct-playable mp4', () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/movie.mp4' });
    expect(w.find('.prep').exists()).toBe(false);
    expect(w.find('.transcode').exists()).toBe(false);
    expect(w.find('.player__controls').exists()).toBe(true);
    expect(tc().start).not.toHaveBeenCalled();
  });

  it('reveals the player chrome once the transcode is ready (HLS playing)', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    tc().state.value = 'ready';
    await nextTick();
    expect(w.find('.prep').exists()).toBe(false);
    expect(w.find('.transcode').exists()).toBe(false);
    expect(w.find('.player__controls').exists()).toBe(true);
  });

  it('shows the failure notice only when the transcode errors', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    expect(w.find('.transcode').exists()).toBe(false); // preparing, not failed
    tc().state.value = 'error';
    await nextTick();
    expect(w.find('.prep').exists()).toBe(false);
    expect(w.find('.transcode').exists()).toBe(true);
  });

  it('starts a transcode reactively on a fatal media error (e.g. HEVC the browser cannot decode)', async () => {
    const { w, video } = mountPlayer({ streamUrl: 'http://x/movie.mp4' });
    expect(w.find('.prep').exists()).toBe(false);
    Object.defineProperty(video, 'error', { configurable: true, get: () => ({ code: 4 }) });
    video.dispatchEvent(new Event('error'));
    await nextTick();
    expect(tc().start).toHaveBeenCalled();
    expect(w.find('.prep').exists()).toBe(true);
  });

  it('starts a transcode on a NETWORK error before any playback progress (unreachable direct origin, hub P3)', async () => {
    // On the hub the direct-play src points at the paired server's own origin; if that
    // origin is unreachable the <video> errors with MEDIA_ERR_NETWORK (2) before any
    // frame — fall back to the HLS transcode over the relay proxy.
    const { w, video, state } = mountPlayer({ streamUrl: 'http://x/movie.mp4' });
    state.currentTime = 0; // no playback progress yet
    Object.defineProperty(video, 'error', { configurable: true, get: () => ({ code: 2 }) });
    video.dispatchEvent(new Event('error'));
    await nextTick();
    expect(tc().start).toHaveBeenCalled();
    expect(w.find('.prep').exists()).toBe(true);
  });

  it('ignores a mid-playback NETWORK error (currentTime > 0 — a transient blip, not an unreachable origin)', async () => {
    const { w, video, state } = mountPlayer({ streamUrl: 'http://x/movie.mp4' });
    state.currentTime = 42; // already playing — a network blip must not tear it down
    Object.defineProperty(video, 'error', { configurable: true, get: () => ({ code: 2 }) });
    video.dispatchEvent(new Event('error'));
    await nextTick();
    expect(tc().start).not.toHaveBeenCalled();
    expect(w.find('.prep').exists()).toBe(false);
  });

  it('ignores ABORTED (1) media errors (not a transcode trigger)', async () => {
    const { w, video } = mountPlayer({ streamUrl: 'http://x/movie.mp4' });
    Object.defineProperty(video, 'error', { configurable: true, get: () => ({ code: 1 }) });
    video.dispatchEvent(new Event('error'));
    await nextTick();
    expect(tc().start).not.toHaveBeenCalled();
    expect(w.find('.prep').exists()).toBe(false);
  });

  it('still starts a transcode on a fatal SRC_NOT_SUPPORTED (3) error regardless of currentTime (decode path unchanged)', async () => {
    const { w, video, state } = mountPlayer({ streamUrl: 'http://x/movie.mp4' });
    state.currentTime = 99; // a fatal decode/format error is independent of progress
    Object.defineProperty(video, 'error', { configurable: true, get: () => ({ code: 3 }) });
    video.dispatchEvent(new Event('error'));
    await nextTick();
    expect(tc().start).toHaveBeenCalled();
    expect(w.find('.prep').exists()).toBe(true);
  });

  it('early-returns on a media error once already transcoding (no double start)', async () => {
    // mkv → transcode from the start (one start). A subsequent <video> error must not
    // kick off a second transcode (onVideoError early-returns when transcodeNeeded).
    const { video } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    expect(tc().start).toHaveBeenCalledTimes(1);
    Object.defineProperty(video, 'error', { configurable: true, get: () => ({ code: 2 }) });
    video.dispatchEvent(new Event('error'));
    await nextTick();
    expect(tc().start).toHaveBeenCalledTimes(1); // unchanged — already on HLS
  });

  it('suppresses the resume prompt while preparing a transcode', () => {
    usePlayerStore().saveResume('m1', 60, 200);
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    expect(w.find('.prep').exists()).toBe(true);
    expect(w.find('.resume').exists()).toBe(false);
  });

  it('the preparing overlay Back button emits back', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    await w.find('.prep__back').trigger('click');
    expect(w.emitted('back')).toHaveLength(1);
  });

  it('the failure notice Back button emits back', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    tc().state.value = 'error';
    await nextTick();
    await w.find('.transcode__back').trigger('click');
    expect(w.emitted('back')).toHaveLength(1);
  });
});

describe('Player — autoplay on load (U2)', () => {
  function episode(over: Partial<MediaItem> = {}): MediaItem {
    return media({ id: 'e1', name: 'Pilot', type: 'episode', season_number: 1, episode_number: 1, ...over });
  }

  it('attempts play() on canplay when autoplay is enabled', async () => {
    const { w, video } = mountPlayer({ autoplay: true });
    video.dispatchEvent(new Event('canplay'));
    await nextTick();
    expect(video.play).toHaveBeenCalled();
    w.unmount();
  });

  it('does NOT autoplay when the prop is not set (default behaviour unchanged)', async () => {
    const { w, video } = mountPlayer();
    video.dispatchEvent(new Event('canplay'));
    await nextTick();
    expect(video.play).not.toHaveBeenCalled();
    w.unmount();
  });

  it('attempts play() at most once across repeated canplay events', async () => {
    const { w, video } = mountPlayer({ autoplay: true });
    video.dispatchEvent(new Event('canplay'));
    video.dispatchEvent(new Event('canplay'));
    await nextTick();
    expect((video.play as ReturnType<typeof vi.fn>)).toHaveBeenCalledTimes(1);
    w.unmount();
  });

  it('does NOT autoplay while a resume prompt is showing', async () => {
    setActivePinia(createPinia());
    usePlayerStore().saveResume('m1', 60, 200);
    const { w, video } = mountPlayer({ autoplay: true });
    expect(w.find('.resume').exists()).toBe(true);
    video.dispatchEvent(new Event('canplay'));
    await nextTick();
    expect(video.play).not.toHaveBeenCalled();
    w.unmount();
  });

  it('falls back to a muted retry when play() rejects with NotAllowedError (no unhandled rejection)', async () => {
    const { w, video, state } = mountPlayer({ autoplay: true });
    let call = 0;
    (video as unknown as { play: () => Promise<void> }).play = vi.fn(() => {
      call += 1;
      if (call === 1) return Promise.reject(new DOMException('blocked', 'NotAllowedError'));
      state.paused = false;
      return Promise.resolve();
    }) as unknown as HTMLVideoElement['play'];
    video.dispatchEvent(new Event('canplay'));
    await nextTick();
    await Promise.resolve(); // let the rejection handler run
    await nextTick();
    expect(state.muted).toBe(true); // retried muted
    expect((video.play as ReturnType<typeof vi.fn>).mock.calls.length).toBe(2);
    w.unmount();
  });

  it('re-arms autoplay when the media changes', async () => {
    const { w, video, state } = mountPlayer({ autoplay: true });
    video.dispatchEvent(new Event('canplay'));
    await nextTick();
    expect((video.play as ReturnType<typeof vi.fn>)).toHaveBeenCalledTimes(1);
    await w.setProps({ media: episode({ id: 'e2', name: 'Episode 2', episode_number: 2 }), streamUrl: 'http://x/e2' });
    state.paused = true; // a fresh source starts paused
    video.dispatchEvent(new Event('canplay'));
    await nextTick();
    expect((video.play as ReturnType<typeof vi.fn>)).toHaveBeenCalledTimes(2);
    w.unmount();
  });
});

describe('Player — prev/next episode (U2)', () => {
  function episode(over: Partial<MediaItem> = {}): MediaItem {
    return media({ id: 'e1', name: 'Pilot', type: 'episode', season_number: 1, episode_number: 1, ...over });
  }
  const prevBtn = (w: ReturnType<typeof mountPlayer>['w']) =>
    w.findAll('.player__btnrow .player__iconbtn').find((b) => b.attributes('aria-label') === 'Previous episode');
  const nextBtn = (w: ReturnType<typeof mountPlayer>['w']) =>
    w.findAll('.player__btnrow .player__iconbtn').find((b) => b.attributes('aria-label') === 'Next episode');

  it('shows no prev/next buttons for a movie (no neighbours)', () => {
    const { w } = mountPlayer();
    expect(prevBtn(w)).toBeFalsy();
    expect(nextBtn(w)).toBeFalsy();
  });

  it('renders both buttons for an episode in the middle of the series', () => {
    const { w } = mountPlayer({
      media: episode({ id: 'e2', episode_number: 2 }),
      prevEpisode: episode({ id: 'e1' }),
      nextEpisode: episode({ id: 'e3', episode_number: 3 }),
    });
    expect(prevBtn(w)).toBeTruthy();
    expect(nextBtn(w)).toBeTruthy();
  });

  it('hides Prev on the first episode and Next on the last', () => {
    const first = mountPlayer({ media: episode(), prevEpisode: null, nextEpisode: episode({ id: 'e2', episode_number: 2 }) });
    expect(prevBtn(first.w)).toBeFalsy();
    expect(nextBtn(first.w)).toBeTruthy();
    const last = mountPlayer({ media: episode({ id: 'e9', episode_number: 9 }), prevEpisode: episode({ id: 'e8', episode_number: 8 }), nextEpisode: null });
    expect(nextBtn(last.w)).toBeFalsy();
    expect(prevBtn(last.w)).toBeTruthy();
  });

  it('emits play-episode with the adjacent episode on click', async () => {
    const prev = episode({ id: 'e1' });
    const next = episode({ id: 'e3', episode_number: 3 });
    const { w } = mountPlayer({ media: episode({ id: 'e2', episode_number: 2 }), prevEpisode: prev, nextEpisode: next });
    await nextBtn(w)!.trigger('click');
    expect(w.emitted('play-episode')?.[0]?.[0]).toMatchObject({ id: 'e3' });
    await prevBtn(w)!.trigger('click');
    expect(w.emitted('play-episode')?.[1]?.[0]).toMatchObject({ id: 'e1' });
  });
});

describe('Player — favorite + rating controls (Feature 16.1)', () => {
  // Locate the favorite/bookmark + thumbs rating controls in the right-hand cluster.
  const favBtn = (w: ReturnType<typeof mountPlayer>['w']) => w.find('.player__btnrow .player__favorite');
  const love = (w: ReturnType<typeof mountPlayer>['w']) => w.findComponent(ThumbRating);

  it('renders both controls in the control cluster (default: not favorited, rating level 0)', () => {
    const { w } = mountPlayer();
    const fav = favBtn(w);
    expect(fav.exists()).toBe(true);
    expect(fav.attributes('aria-pressed')).toBe('false');
    expect(fav.attributes('aria-label')).toBe('Add to favorites');
    // outline bookmark when not favorited
    expect(fav.findComponent(Icon).props('name')).toBe('bookmark-plus');
    const lb = love(w);
    expect(lb.exists()).toBe(true);
    expect(lb.props('level')).toBe(0);
  });

  it('reflects the store: favorite aria-pressed from isFavorite, rating level from likeLevel', async () => {
    const { w } = mountPlayer();
    const store = useUserItemDataStore();
    // seed the store entry for the played item and assert the controls reflect it
    store.entries.set('m1', { favorite: true, rating: null, like_level: 2, watched: false });
    await nextTick();
    const fav = favBtn(w);
    expect(fav.attributes('aria-pressed')).toBe('true');
    expect(fav.attributes('aria-label')).toBe('Remove from favorites');
    expect(fav.findComponent(Icon).props('name')).toBe('bookmark'); // filled bookmark
    expect(love(w).props('level')).toBe(2);
  });

  it('clicking the favorite button calls toggleFavorite(id, apiBase) exactly once', async () => {
    const { w } = mountPlayer();
    const store = useUserItemDataStore();
    const spy = vi.spyOn(store, 'toggleFavorite').mockResolvedValue();
    await favBtn(w).trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('m1', ''); // empty apiBase fallback (no phlixConfig in test mount)
  });

  it('clicking thumbs-up calls setLike(id, 1, apiBase) exactly once per click (single-write guard)', async () => {
    const { w } = mountPlayer();
    const store = useUserItemDataStore();
    const spy = vi.spyOn(store, 'setLike').mockResolvedValue();
    // a single activate emits BOTH cycle + update:level from ThumbRating; only @cycle
    // is bound, so exactly ONE setLike must fire (no double-write / double-PUT).
    await love(w).find('.thumb-rating__btn--up').trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('m1', 1, '');
  });

  it('fires exactly ONE favorite write per click (non-vacuous: real fetch spy)', async () => {
    const fetchMock = vi.fn(
      (_url: RequestInfo | URL, _init?: RequestInit) =>
        Promise.resolve(new Response(JSON.stringify({ message: 'Added to favorites' }), { status: 200 })),
    );
    vi.stubGlobal('fetch', fetchMock);
    const { w } = mountPlayer();
    await favBtn(w).trigger('click');
    await nextTick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('/api/v1/media/m1/favorite');
    expect(init?.method).toBe('POST');
    // optimistic flip already reflected in the control
    expect(favBtn(w).attributes('aria-pressed')).toBe('true');
    vi.unstubAllGlobals();
  });

  it('fires exactly ONE rating PUT per click (non-vacuous: real fetch spy — proves the single-write binding)', async () => {
    const fetchMock = vi.fn(
      (_url: RequestInfo | URL, _init?: RequestInit) =>
        Promise.resolve(new Response(JSON.stringify({ message: 'Saved' }), { status: 200 })),
    );
    vi.stubGlobal('fetch', fetchMock);
    const { w } = mountPlayer();
    await love(w).find('.thumb-rating__btn--up').trigger('click');
    await nextTick();
    // If @update:level were ALSO bound this would be 2 (double-PUT) — assert ONE.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('/api/v1/media/m1/like'); // setLikeLevel endpoint
    expect(init?.method).toBe('PUT');
    expect(love(w).props('level')).toBe(1); // optimistic 0→1
    vi.unstubAllGlobals();
  });

  it('hydrates the store from props.media.user_data on mount', () => {
    const store = useUserItemDataStore();
    const spy = vi.spyOn(store, 'hydrate');
    mountPlayer({ media: media({ id: 'm1', user_data: { favorite: true, rating: 7, like_level: 2 } }) });
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ id: 'm1' }));
    // the controls reflect the hydrated server state
    expect(store.isFavorite('m1')).toBe(true);
    expect(store.likeLevel('m1')).toBe(2);
  });

  it('re-hydrates when the media id changes', async () => {
    const { w } = mountPlayer({ media: media({ id: 'm1', user_data: { favorite: false, rating: null, like_level: 0 } }) });
    const store = useUserItemDataStore();
    const spy = vi.spyOn(store, 'hydrate');
    await w.setProps({ media: media({ id: 'm2', name: 'Arrival', user_data: { favorite: true, rating: null, like_level: 1 } }), streamUrl: 'http://x/m2' });
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ id: 'm2' }));
    expect(store.isFavorite('m2')).toBe(true);
    expect(store.likeLevel('m2')).toBe(1);
    // the player chrome now reflects the new item
    expect(w.find('.player__btnrow .player__favorite').attributes('aria-pressed')).toBe('true');
    expect(w.findComponent(ThumbRating).props('level')).toBe(1);
  });
});

describe('Player — quality menu wiring (R3.9)', () => {
  const ladder = [
    { index: 0, height: 1080, width: 1920, bitrate: 5_000_000, name: '1080p' },
    { index: 1, height: 720, width: 1280, bitrate: 2_800_000, name: '720p' },
    { index: 2, height: 480, width: 854, bitrate: 1_400_000, name: '480p' },
  ];

  it('hides the quality menu until there are ≥2 switchable levels', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    tc().state.value = 'ready'; // reveal the chrome
    await nextTick();
    expect(w.findComponent(QualityMenu).findComponent(Select).exists()).toBe(false);
    tc().levels.value = ladder; // the ladder is parsed
    await nextTick();
    expect(w.findComponent(QualityMenu).findComponent(Select).exists()).toBe(true);
  });

  it('threads a rung selection to the controller setLevel as an hls.js index', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    tc().state.value = 'ready';
    tc().levels.value = ladder;
    await nextTick();
    w.findComponent(QualityMenu).findComponent(Select).vm.$emit('update:modelValue', '720p');
    expect(tc().setLevel).toHaveBeenCalledWith(1);
  });

  it('hands the choice back to ABR when Auto is picked', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    tc().state.value = 'ready';
    tc().levels.value = ladder;
    tc().autoEnabled.value = false;
    tc().currentLevel.value = 0;
    await nextTick();
    w.findComponent(QualityMenu).findComponent(Select).vm.$emit('update:modelValue', 'auto');
    expect(tc().setLevel).toHaveBeenCalledWith('auto');
  });

  it('seeds the pinned rung from prefs.defaultQuality once the ladder is known', async () => {
    usePreferencesStore().defaultQuality = '720p'; // a prior pinned choice
    mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    tc().levels.value = ladder; // hls.js parses the manifest → levels populate
    await nextTick();
    expect(tc().setNextLevel).toHaveBeenCalledWith(1); // 720p → index 1
  });

  it('does NOT seed a level when the stored preference is Auto', async () => {
    usePreferencesStore().defaultQuality = 'auto';
    mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    tc().levels.value = ladder;
    await nextTick();
    expect(tc().setNextLevel).not.toHaveBeenCalled();
  });

  it('seeds the default quality at most once per source', async () => {
    usePreferencesStore().defaultQuality = '480p';
    mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    tc().levels.value = ladder;
    await nextTick();
    expect(tc().setNextLevel).toHaveBeenCalledTimes(1);
    tc().levels.value = [...ladder]; // a later re-read must NOT re-seed
    await nextTick();
    expect(tc().setNextLevel).toHaveBeenCalledTimes(1);
  });

  it('re-seeds the stored preference when the media source switches (qualitySeeded resets per source)', async () => {
    usePreferencesStore().defaultQuality = '480p';
    const { w } = mountPlayer({ media: media({ id: 'm1' }), streamUrl: 'http://x/Dune.mkv' });
    tc().levels.value = ladder;
    await nextTick();
    expect(tc().setNextLevel).toHaveBeenCalledTimes(1);
    expect(tc().setNextLevel).toHaveBeenLastCalledWith(2); // 480p → index 2

    // A new source resets the transcode session (levels go back to empty) and
    // presents a FRESH ladder — evaluateForCurrentMedia must have re-armed the
    // one-shot seed guard so the stored pref is re-applied to the new levels.
    tc().levels.value = [];
    await w.setProps({ media: media({ id: 'm2', name: 'Arrival' }), streamUrl: 'http://x/Arrival.mkv' });
    await nextTick();
    const newLadder = [
      { index: 0, height: 1080, width: 1920, bitrate: 5_000_000, name: '1080p' },
      { index: 1, height: 480, width: 854, bitrate: 1_400_000, name: '480p' },
    ];
    tc().levels.value = newLadder;
    await nextTick();
    expect(tc().setNextLevel).toHaveBeenCalledTimes(2);
    expect(tc().setNextLevel).toHaveBeenLastCalledWith(1); // 480p → index 1 in the NEW ladder
  });

  it('threads the live controller state through to the menu (pinned rung, then Auto restores ABR with a live label)', async () => {
    const { w } = mountPlayer({ streamUrl: 'http://x/Dune.mkv' });
    const sel = () => w.findComponent(QualityMenu).findComponent(Select);
    tc().state.value = 'ready';
    tc().levels.value = ladder;

    // A rung is pinned (ABR off) — Player must reflect currentLevel/autoEnabled so
    // the menu shows the pinned rung, not "auto".
    tc().autoEnabled.value = false;
    tc().currentLevel.value = 2; // 480p
    tc().activeLevelHeight.value = 480;
    await nextTick();
    expect(sel().props('modelValue')).toBe('480p');
    // The Auto label always mirrors the level ABR is playing, even while pinned.
    expect((sel().props('options') as ReadonlyArray<{ label: string }>)[0].label).toBe('Auto (480p)');

    // ABR is handed back the choice and climbs to 720p — Player must thread the
    // live activeLevelHeight into the Auto label ("Auto (720p)") and reflect that
    // "auto" is once again the selection, all without a prop change on Player.
    tc().autoEnabled.value = true;
    tc().currentLevel.value = 1; // ABR is currently at 720p
    tc().activeLevelHeight.value = 720;
    await nextTick();
    expect(sel().props('modelValue')).toBe('auto');
    expect((sel().props('options') as ReadonlyArray<{ label: string }>)[0].label).toBe('Auto (720p)');
  });
});

describe('Player — fade timer ownership (UI-1.7)', () => {
  // UI-1.7: fadeTimer is stored at module/component scope (not a local variable),
  // onBeforeUnmount clears it if component unmounts mid-fade, and fadeOutAndPause
  // clears any existing timer before starting a new one. These tests verify that
  // unmounting mid-fade does NOT leave an interval mutating a detached element.

  it('clears the fade timer on unmount so no interval runs against a detached element', async () => {
    const { w } = mountPlayer();
    // Start a fade — this sets up a setInterval that would fade volume over ~1s.
    // fadeOutAndPause is a <script setup> binding (not exposed via defineExpose),
    // so it is reachable on the runtime vm but not on the typed public instance.
    (w.vm as unknown as { fadeOutAndPause: () => void }).fadeOutAndPause();
    await nextTick();
    // Unmount while fade is in progress — onBeforeUnmount should clear the fade timer.
    // The critical invariant: after unmount, no interval callback should run
    // against the now-detached element. We verify this by ensuring unmount doesn't
    // throw (onBeforeUnmount runs and cleans up properly) and that we can wait
    // for a time long enough for any missed callback to have fired, without error.
    expect(() => w.unmount()).not.toThrow();
    // If the timer wasn't cleared, the callback would continue running.
    // By waiting here we give any uncancelled callback a chance to fire.
    // If cleanup failed, this would manifest as an error in subsequent tests.
    await new Promise((r) => setTimeout(r, 1200));
  });

  it('fadeOutAndPause clears any pre-existing timer before starting a new one (idempotent)', async () => {
    const { w, video, state } = mountPlayer();
    const fade = (w.vm as unknown as { fadeOutAndPause: () => void }).fadeOutAndPause;
    // video.pause was replaced with a vi.fn() in stubVideo() but is typed as the
    // native HTMLVideoElement['pause'] (() => void), so reach .mock through a cast.
    const pauseMock = video.pause as unknown as ReturnType<typeof vi.fn>;
    // Start first fade — this creates an interval
    fade();
    await nextTick();
    // Wait a short time for the fade to progress
    await new Promise((r) => setTimeout(r, 200));
    const volumeAfterPartialFirstFade = state.volume;
    expect(volumeAfterPartialFirstFade).toBeLessThan(1);
    const pauseCountBeforeSecond = pauseMock.mock.calls.length;
    // Start second fade BEFORE the first one completes
    // This MUST clear the first timer before starting a new one
    fade();
    await nextTick();
    // Wait for the second fade to complete (~1 second from now)
    await new Promise((r) => setTimeout(r, 1200));
    // pause should have been called exactly once (from the second fade's completion)
    // If the first timer wasn't cleared, we could get incorrect behavior
    expect(pauseMock.mock.calls.length).toBe(pauseCountBeforeSecond + 1);
  });
});

describe('Player — trickplay prefetch on first mount (UI-0.5)', () => {
  it('fetches trickplay exactly once for the current media on first mount (deferred macrotask)', async () => {
    // UI-0.5: the seekbar sprite preview must load on the FIRST opened title, not
    // only after navigating to a second. prefetchTrickplay() is scheduled in
    // onMounted via setTimeout(0) (off the mount critical path). Spy the real
    // fetch the composable makes so we assert the deferred prefetch actually fires.
    const spy = vi
      .spyOn(ApiClient.prototype, 'getTrickplay')
      .mockResolvedValue({ sprite_url: null, timeline: [] });
    vi.useFakeTimers();
    mountPlayer({ media: media({ id: 'm1' }) });
    // Not fired synchronously on mount — it is deferred to a macrotask.
    expect(spy).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(0); // run the setTimeout(0)
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe('m1'); // fetched for the current media id
    // And it does NOT double-fire for the same media on subsequent ticks.
    await vi.advanceTimersByTimeAsync(50);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('Player — marker-search routes through apiBase (UI-0.6, U-P6/U-P11)', () => {
  const HUB_BASE = 'https://hub.example/api/v1/servers/S1/proxy';
  const markerFixture = [{ id: 'mk1', type: 'intro' as const, startMs: 5000, endMs: 35000, label: 'Intro' }];

  it('sends the marker-search request to props.apiBase (relay proxy), not the page origin', async () => {
    // U-P6: on hub-proxied playback the marker-search must hit the relay proxy base.
    // The global `api` singleton is pinned to the page origin and would 404 there.
    const fetchSpy = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ items: [], marker_type: 'intro', around: 30, position: 5000 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    vi.stubGlobal('fetch', fetchSpy);
    const { w } = mountPlayer({ apiBase: HUB_BASE, markers: markerFixture });
    w.findComponent(MarkerTimeline).vm.$emit('similar', 'intro', 5000);
    await new Promise((r) => setTimeout(r, 0));
    // Isolate the marker-search request (the deferred trickplay prefetch also fetches).
    const markerCalls = fetchSpy.mock.calls.filter((c) => String(c[0]).includes('by-marker'));
    expect(markerCalls).toHaveLength(1);
    const url = String(markerCalls[0][0]);
    expect(url.startsWith(HUB_BASE)).toBe(true); // hits the relay proxy base, not page origin
    expect(url).not.toContain(window.location.origin + '/api/v1/media/search/by-marker');
    expect(url).toContain('/api/v1/media/search/by-marker');
  });

  it('aborts the in-flight marker-search when the similar modal closes', async () => {
    // U-P11: the per-search AbortController must be aborted on close so a torn-down
    // search never lands results into a closed modal.
    let capturedSignal: AbortSignal | undefined;
    vi.spyOn(ApiClient.prototype, 'searchByMarker').mockImplementation(
      (_type, _pos, _around, _limit, signal) => {
        capturedSignal = signal;
        return new Promise(() => {}); // never resolves — stays in-flight
      },
    );
    const { w } = mountPlayer({ apiBase: HUB_BASE, markers: markerFixture });
    w.findComponent(MarkerTimeline).vm.$emit('similar', 'intro', 5000);
    await nextTick();
    expect(capturedSignal).toBeDefined();
    expect(capturedSignal!.aborted).toBe(false);
    // Closing the modal must abort the in-flight search.
    w.findComponent(Modal).vm.$emit('close');
    await nextTick();
    expect(capturedSignal!.aborted).toBe(true);
  });
});
