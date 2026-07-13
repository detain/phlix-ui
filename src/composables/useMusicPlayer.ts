/**
 * Music playback composable — gapless + crossfade, fully client-side.
 *
 * Drives two alternating `<audio>` elements whose `src` is a track's
 * server-minted **signed** `stream_url` (`/media/:id/stream?exp&sig`, the field
 * emitted by the server's `formatTrack`; see UI-3.6 / X8). No Bearer header is
 * needed — the signature authorizes the byte stream — so the URL works directly
 * as an `<audio src>`.
 *
 * Crossfade and gapless are implemented with NO server dependency:
 *   - **Gapless:** the next track's `stream_url` is pre-loaded onto the idle
 *     `<audio>` element (`preload='auto'`) so the swap at track-end is instant.
 *   - **Crossfade:** the idle element starts at `volume = 0` while the active
 *     element ramps down, stepping both volumes over `crossfadeDuration` so the
 *     two overlap-fade. The server `buildGaplessSegmentCommand` path is NOT used.
 *
 * Both settings are read live from {@link usePreferencesStore}, so the existing
 * crossfade/gapless settings UI finally takes effect.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ref, computed } from 'vue';
import type { MusicTrack } from '../types/music';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import { ApiClient } from '../api/client';

/** Number of volume steps used to render a crossfade ramp. */
const CROSSFADE_STEPS = 20;

export interface MusicPlayerOptions {
  /**
   * Media API base for resolving a track's signed `stream_url` via `getTrack`
   * (relay-proxied on the hub). Called lazily, only when a track lacks its own
   * `stream_url` (e.g. album fast-path items).
   */
  apiBase: () => string;
  /**
   * Byte-stream base that prefixes the signed relative `/media/:id/stream` path
   * (mirrors `PlayerPage.streamUrlFor`: `directBase || apiBase`). On the media
   * server this is '' (same-origin); on the hub it is the selected server's own
   * public origin so audio bytes stream direct with native Range.
   */
  streamBase: () => string;
}

/**
 * useMusicPlayer — dual-`<audio>` gapless + crossfade playback.
 *
 * @param opts base resolvers ({@link MusicPlayerOptions}).
 */
export function useMusicPlayer(opts: MusicPlayerOptions) {
  const prefs = usePreferencesStore();

  // ---- Two audio elements (created lazily to avoid SSR / test issues) --------
  const elA = ref<HTMLAudioElement | null>(null);
  const elB = ref<HTMLAudioElement | null>(null);
  /** 0 = elA is audible, 1 = elB is audible. */
  let activeSlot: 0 | 1 = 0;

  function createAudioElement(): HTMLAudioElement {
    const el = new Audio();
    el.preload = 'none';
    // Persistent listeners: each element only reacts while it is the active one.
    el.addEventListener('timeupdate', () => onTimeUpdate(el));
    el.addEventListener('loadedmetadata', () => onLoadedMetadata(el));
    el.addEventListener('ended', () => onEnded(el));
    return el;
  }

  function getA(): HTMLAudioElement {
    if (!elA.value) elA.value = createAudioElement();
    return elA.value;
  }
  function getB(): HTMLAudioElement {
    if (!elB.value) elB.value = createAudioElement();
    return elB.value;
  }
  function activeEl(): HTMLAudioElement {
    return activeSlot === 0 ? getA() : getB();
  }
  function idleEl(): HTMLAudioElement {
    return activeSlot === 0 ? getB() : getA();
  }
  function swapSlots(): void {
    activeSlot = activeSlot === 0 ? 1 : 0;
  }

  // ---- Playback state --------------------------------------------------------
  const queue = ref<MusicTrack[]>([]);
  const currentTrack = ref<MusicTrack | null>(null);
  const currentIndex = ref(-1);
  const playing = ref(false);
  /** Playback position in seconds (timeupdate). */
  const position = ref(0);
  /** Total duration in seconds (loadedmetadata). */
  const duration = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);
  /** True while a crossfade overlap is in progress. */
  const crossfading = ref(false);

  const hasNext = computed(() => currentIndex.value >= 0 && currentIndex.value < queue.value.length - 1);
  const hasPrev = computed(() => currentIndex.value > 0);

  let crossfadeTimer: ReturnType<typeof setInterval> | null = null;

  function clearCrossfade(): void {
    if (crossfadeTimer !== null) {
      clearInterval(crossfadeTimer);
      crossfadeTimer = null;
    }
    crossfading.value = false;
  }

  // ---- Stream-URL resolution -------------------------------------------------
  /**
   * Resolve a playable, base-prefixed URL for `track`. Prefers the track's own
   * signed `stream_url`; falls back to `getTrack(id)` (which carries one) for
   * album fast-path items that have none. Returns '' if unresolvable.
   */
  async function resolveSrc(track: MusicTrack): Promise<string> {
    let url = track.streamUrl;
    if (!url) {
      try {
        const full = await new ApiClient({ baseUrl: opts.apiBase() }).getTrack(track.id);
        url = full.streamUrl;
      } catch {
        url = null;
      }
    }
    if (!url) return '';
    if (/^https?:\/\//.test(url)) return url;
    return `${opts.streamBase()}${url}`;
  }

  // ---- Event handlers (bound once per element) -------------------------------
  function onTimeUpdate(el: HTMLAudioElement): void {
    if (el !== activeEl()) return;
    position.value = el.currentTime;

    // Near-end crossfade trigger (crossfade on, gapless off, next available).
    if (
      prefs.crossfadeDuration > 0
      && !crossfading.value
      && hasNext.value
      && isFinite(el.duration)
      && el.duration > 0
    ) {
      const timeLeft = el.duration - el.currentTime;
      if (timeLeft > 0 && timeLeft <= prefs.crossfadeDuration) {
        void crossfadeToNext();
      }
    }
  }

  function onLoadedMetadata(el: HTMLAudioElement): void {
    if (el !== activeEl()) return;
    if (isFinite(el.duration)) duration.value = el.duration;
  }

  function onEnded(el: HTMLAudioElement): void {
    if (el !== activeEl()) return;
    // A crossfade already advanced the queue; ignore the tail element's end.
    if (crossfading.value) return;
    if (hasNext.value) {
      void advance(currentIndex.value + 1);
    } else {
      playing.value = false;
    }
  }

  // ---- Transitions -----------------------------------------------------------
  /**
   * Hard-switch to `queue[index]` on the active element (immediate cut). Used
   * for explicit track selection, previous(), and gapless/no-crossfade advance.
   */
  async function playAt(index: number): Promise<void> {
    const track = queue.value[index];
    if (!track) return;
    clearCrossfade();
    const el = activeEl();
    const src = await resolveSrc(track);
    error.value = src === '' ? 'stream-unavailable' : null;
    el.src = src;
    el.volume = 1;
    el.load();
    currentTrack.value = track;
    currentIndex.value = index;
    position.value = 0;
    duration.value = 0;
    await el.play().catch(() => { /* autoplay-blocked — UI shows paused */ });
    playing.value = true;
    void preloadNext();
  }

  /**
   * Advance to `index` honouring prefs: crossfade when `crossfadeDuration > 0`,
   * otherwise an immediate (gapless-preloaded) cut.
   */
  async function advance(index: number): Promise<void> {
    if (prefs.crossfadeDuration > 0) {
      await crossfadeTo(index);
    } else {
      await playAt(index);
    }
  }

  /** Crossfade from the active track to the next track in the queue. */
  async function crossfadeToNext(): Promise<void> {
    if (!hasNext.value) return;
    await crossfadeTo(currentIndex.value + 1);
  }

  /**
   * Overlap-fade to `queue[index]`: bring the idle element up from volume 0
   * while the active element ramps to 0, stepping over `crossfadeDuration`.
   */
  async function crossfadeTo(index: number): Promise<void> {
    const track = queue.value[index];
    if (!track) return;
    clearCrossfade();

    const fadeOut = activeEl();
    const fadeIn = idleEl();

    // Reuse a matching preload; otherwise resolve + load now.
    const src = await resolveSrc(track);
    if (fadeIn.src !== src) {
      fadeIn.src = src;
      fadeIn.load();
    }
    error.value = src === '' ? 'stream-unavailable' : null;

    fadeIn.volume = 0;
    await fadeIn.play().catch(() => {});

    // Advance logical state immediately (the fade-in element is now "current").
    currentTrack.value = track;
    currentIndex.value = index;
    position.value = 0;
    duration.value = 0;
    playing.value = true;
    crossfading.value = true;

    const dur = prefs.crossfadeDuration;
    const stepMs = Math.max(10, (dur * 1000) / CROSSFADE_STEPS);
    let step = 0;
    crossfadeTimer = setInterval(() => {
      step += 1;
      const p = Math.min(1, step / CROSSFADE_STEPS);
      fadeOut.volume = Math.max(0, 1 - p);
      fadeIn.volume = Math.min(1, p);
      if (step >= CROSSFADE_STEPS) {
        clearInterval(crossfadeTimer as ReturnType<typeof setInterval>);
        crossfadeTimer = null;
        fadeOut.pause();
        fadeOut.currentTime = 0;
        fadeOut.volume = 1;
        swapSlots();
        crossfading.value = false;
        void preloadNext();
      }
    }, stepMs);
  }

  /**
   * Pre-load the next track's resolved `stream_url` onto the idle element so a
   * gapless (or crossfade) transition is instant. No-op when gapless is off.
   */
  async function preloadNext(): Promise<void> {
    if (!prefs.gaplessEnabled || !hasNext.value) return;
    const next = queue.value[currentIndex.value + 1];
    if (!next) return;
    const src = await resolveSrc(next);
    if (src === '') return;
    const el = idleEl();
    el.preload = 'auto';
    el.src = src;
    el.load();
  }

  // ---- Public API ------------------------------------------------------------

  /** Load a track list as the playback queue. Resets playback state. */
  function loadTracks(tracks: MusicTrack[]): void {
    clearCrossfade();
    queue.value = [...tracks];
    currentTrack.value = null;
    currentIndex.value = -1;
    playing.value = false;
    position.value = 0;
    duration.value = 0;
    error.value = null;
  }

  /**
   * Start or resume playback.
   * - `play(track)` plays that queue track (resumes if already current).
   * - `play()` resumes the current track, or starts the queue from the top.
   */
  async function play(track?: MusicTrack): Promise<void> {
    if (track) {
      const idx = queue.value.findIndex((t) => t.id === track.id);
      if (idx === -1) return;
      if (currentTrack.value?.id === track.id) {
        await activeEl().play().catch(() => {});
        playing.value = true;
        return;
      }
      await playAt(idx);
      return;
    }
    if (currentTrack.value) {
      await activeEl().play().catch(() => {});
      playing.value = true;
      return;
    }
    if (queue.value.length > 0) await playAt(0);
  }

  /** Pause the active element. */
  function pause(): void {
    activeEl().pause();
    playing.value = false;
  }

  /** Toggle play/pause for the current track. */
  async function toggle(): Promise<void> {
    if (playing.value) pause();
    else await play();
  }

  /** Stop playback and reset position/queue pointer. */
  function stop(): void {
    clearCrossfade();
    getA().pause();
    getB().pause();
    getA().src = '';
    getB().src = '';
    playing.value = false;
    position.value = 0;
    duration.value = 0;
    currentTrack.value = null;
    currentIndex.value = -1;
  }

  /** Skip to the next track (crossfades when the pref is set). */
  async function next(): Promise<void> {
    if (!hasNext.value) return;
    await advance(currentIndex.value + 1);
  }

  /** Go to the previous track (immediate cut). */
  async function previous(): Promise<void> {
    if (!hasPrev.value) return;
    await playAt(currentIndex.value - 1);
  }

  /** Seek to an absolute position (seconds) on the active element. */
  function seek(seconds: number): void {
    if (isFinite(seconds) && seconds >= 0) {
      activeEl().currentTime = seconds;
      position.value = seconds;
    }
  }

  /** Tear down elements + timers (call from onUnmounted). */
  function dispose(): void {
    clearCrossfade();
    if (elA.value) { elA.value.pause(); elA.value.src = ''; }
    if (elB.value) { elB.value.pause(); elB.value.src = ''; }
  }

  return {
    // State
    queue,
    currentTrack,
    currentIndex,
    playing,
    position,
    duration,
    loading,
    error,
    crossfading,
    // Computed
    hasNext,
    hasPrev,
    // Methods
    loadTracks,
    play,
    pause,
    toggle,
    stop,
    next,
    previous,
    seek,
    dispose,
  };
}
