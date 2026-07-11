/**
 * Music playback composable with gapless/crossfade support.
 *
 * Uses Web Audio API with two audio elements (primary + secondary) and
 * GainNode for crossfade curves. Reads crossfade/gapless settings from
 * usePreferencesStore so the existing settings UI actually takes effect.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ref, computed, watch } from 'vue';
import type { MusicTrack } from '../types/music';
import { usePreferencesStore } from '../stores/usePreferencesStore';

/** Server base URL for media streaming (e.g. signed /music/:id/stream). */
function buildStreamUrl(apiBase: string, trackId: number): string {
  // Strip trailing slash then append the stream path.
  const base = apiBase.replace(/\/$/, '');
  return `${base}/api/v1/music/tracks/${trackId}/stream`;
}

/**
 * useMusicPlayer — gapless + crossfade audio playback composable.
 *
 * Uses two HTMLAudioElement nodes (primary / secondary) wired through a
 * shared AudioContext + GainNode so crossfade curves can be applied via the
 * Web Audio API.  The "active" element is the one currently audible; the
 * "idle" element is pre-loaded with the next track for gapless transitions.
 *
 * Call `loadTracks()` to set the current album's track list, then
 * `play(track)` to start playback of a specific track.
 */
export function useMusicPlayer(apiBase: () => string) {
  const prefs = usePreferencesStore();

  // ---- AudioContext + GainNode (created lazily on first user interaction) ----
  let audioCtx: AudioContext | null = null;
  let primaryGain: GainNode | null = null;
  let secondaryGain: GainNode | null = null;
  /** Tracks which audio elements have already been connected to the AudioContext */
  const connectedElements = new WeakMap<HTMLAudioElement, true>();
  // 'primary' = primaryEl is currently audible, 'secondary' = secondaryEl is
  let activeSlot: 'primary' | 'secondary' = 'primary';

  function ensureContext(): AudioContext {
    if (audioCtx) return audioCtx;
    audioCtx = new AudioContext();
    primaryGain = audioCtx.createGain();
    secondaryGain = audioCtx.createGain();
    primaryGain.connect(audioCtx.destination);
    secondaryGain.connect(audioCtx.destination);
    primaryGain.gain.value = 1;
    secondaryGain.gain.value = 0;
    return audioCtx;
  }

  // ---- Two audio nodes for gapless / crossfade --------------------------------
  const primaryEl = ref<HTMLAudioElement | null>(null);
  const secondaryEl = ref<HTMLAudioElement | null>(null);

  function createAudioElement(): HTMLAudioElement {
    const el = new Audio();
    el.preload = 'none';
    return el;
  }

  // Lazily create audio elements on first access (avoids SSR issues).
  function getOrCreatePrimary(): HTMLAudioElement {
    if (!primaryEl.value) primaryEl.value = createAudioElement();
    return primaryEl.value;
  }
  function getOrCreateSecondary(): HTMLAudioElement {
    if (!secondaryEl.value) secondaryEl.value = createAudioElement();
    return secondaryEl.value;
  }

  // ---- Playback state ---------------------------------------------------------
  const queue = ref<MusicTrack[]>([]);
  const currentTrack = ref<MusicTrack | null>(null);
  const currentIndex = ref<number>(-1);
  const playing = ref(false);
  /** Playback position in seconds (updated via timeupdate event). */
  const position = ref(0);
  /** Total duration in seconds (updated via loadedmetadata / canplay). */
  const duration = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ---- Derived helpers --------------------------------------------------------
  const hasNext = computed(() => currentIndex.value < queue.value.length - 1);
  const hasPrev = computed(() => currentIndex.value > 0);

  // ---- Crossfade helpers ------------------------------------------------------
  /**
   * Apply the configured crossfade curve using Web Audio API GainNodes.
   * @param fadeOutEl  Element currently playing (to fade out)
   * @param fadeInEl   Element to fade in
   * @param fadeInGain GainNode for the fade-in element
   */
  function applyCrossfade(fadeOutEl: HTMLAudioElement, _fadeInEl: HTMLAudioElement, fadeInGain: GainNode | null): void {
    const ctx = ensureContext();
    const dur = prefs.crossfadeDuration;
    const fadeIn = prefs.crossfadeFadeIn;
    const fadeOut = prefs.crossfadeFadeOut;
    const now = ctx.currentTime;

    // fade-out: primaryGain.gain.value → 0 using curve
    if (primaryGain) {
      primaryGain.gain.setValueCurveAtTime(
        new Float32Array([1, 1 - fadeOut]),
        now,
        dur,
      );
    }
    // fade-in: 0 → 1 using curve
    if (fadeInGain) {
      fadeInGain.gain.setValueCurveAtTime(
        new Float32Array([0, fadeIn]),
        now,
        dur,
      );
    }

    // After crossfade ends, detach the faded-out element.
    setTimeout(() => {
      fadeOutEl.pause();
      fadeOutEl.src = '';
    }, dur * 1000 + 100);
  }

  /**
   * Swap the active/secondary audio elements after a crossfade completes.
   * The previously-active element becomes the idle one for future pre-loading.
   */
  function swapActiveSlot(): void {
    activeSlot = activeSlot === 'primary' ? 'secondary' : 'primary';
  }

  /**
   * Start playing `track` on the specified audio element, routing it through
   * the correct GainNode (primary or secondary).
   */
  function playOnElement(el: HTMLAudioElement, track: MusicTrack, gainNode: GainNode | null): void {
    const ctx = ensureContext();
    // Resume AudioContext if suspended (browser autoplay policy).
    if (ctx.state === 'suspended') ctx.resume();

    el.src = buildStreamUrl(apiBase(), track.id);
    el.load();

    // Wire MediaElementSourceNode if not already connected.
    if (gainNode && !connectedElements.has(el)) {
      const source = ctx.createMediaElementSource(el);
      source.connect(gainNode);
      connectedElements.set(el, true);
    }

    el.play().catch(() => {
      /* ignore autoplay-blocked — UI can show paused state */
    });
  }

  /**
   * Pre-load the next track onto the idle audio element (gapless prep).
   * Does NOT start playing — just loads and buffers so the swap is instant.
   */
  function preloadNext(): void {
    if (!prefs.gaplessEnabled || !hasNext.value) return;
    const nextTrack = queue.value[currentIndex.value + 1];
    const idleEl = activeSlot === 'primary' ? getOrCreateSecondary() : getOrCreatePrimary();
    idleEl.preload = 'auto';
    idleEl.src = buildStreamUrl(apiBase(), nextTrack.id);
    idleEl.load();
  }

  /**
   * Advance to the next track in the queue, honouring gapless/crossfade prefs.
   * Returns true if a next track was started, false if queue is exhausted.
   */
  function advanceToNext(): boolean {
    if (!hasNext.value) {
      playing.value = false;
      currentTrack.value = null;
      return false;
    }
    const nextTrack = queue.value[currentIndex.value + 1];
    return transitionTo(nextTrack, currentIndex.value + 1);
  }

  /**
   * Perform the transition from current track to `nextTrack` at index `nextIndex`.
   * Uses gapless (instant swap) when gaplessEnabled && crossfadeDuration == 0,
   * otherwise applies a crossfade curve.
   */
  function transitionTo(nextTrack: MusicTrack, nextIndex: number): boolean {
    const crossfadeDur = prefs.crossfadeDuration;
    const useGapless = prefs.gaplessEnabled && crossfadeDur === 0;

    const curEl = activeSlot === 'primary' ? getOrCreatePrimary() : getOrCreateSecondary();
    const nextEl = activeSlot === 'primary' ? getOrCreateSecondary() : getOrCreatePrimary();
    const nextGain = activeSlot === 'primary' ? secondaryGain : primaryGain;

    if (useGapless) {
      // Gapless: pause current, swap immediately, start next.
      curEl.pause();
      curEl.src = '';
      currentTrack.value = nextTrack;
      currentIndex.value = nextIndex;
      position.value = 0;
      duration.value = 0;
      playOnElement(nextEl, nextTrack, nextGain);
      swapActiveSlot();
      preloadNext();
      return true;
    }

    // Crossfade: schedule gain curves, then swap after duration.
    currentTrack.value = nextTrack;
    currentIndex.value = nextIndex;
    position.value = 0;
    duration.value = 0;

    nextEl.src = buildStreamUrl(apiBase(), nextTrack.id);
    nextEl.load();

    if (crossfadeDur > 0) {
      applyCrossfade(curEl, nextEl, nextGain);
      nextEl.play().catch(() => {});

      setTimeout(() => {
        swapActiveSlot();
        preloadNext();
      }, crossfadeDur * 1000 + 200);
    } else {
      // crossfadeDur == 0 but gaplessEnabled == false: hard cut.
      curEl.pause();
      curEl.src = '';
      playOnElement(nextEl, nextTrack, nextGain);
      swapActiveSlot();
      preloadNext();
    }

    return true;
  }

  // ---- Public API -------------------------------------------------------------

  /**
   * Load a track list as the playback queue. Resets playback state.
   */
  function loadTracks(tracks: MusicTrack[]): void {
    queue.value = [...tracks];
    currentTrack.value = null;
    currentIndex.value = -1;
    playing.value = false;
    position.value = 0;
    duration.value = 0;
    error.value = null;
  }

  /**
   * Start (or resume) playback.
   * If a track is already current, resumes from its position.
   * If not playing anything, starts the first track in queue.
   */
  async function play(track?: MusicTrack): Promise<void> {
    const ctx = ensureContext();
    if (ctx.state === 'suspended') ctx.resume();

    if (track) {
      const idx = queue.value.findIndex((t) => t.id === track.id);
      if (idx === -1) return;
      if (currentTrack.value?.id === track.id && primaryEl.value) {
        // Already this track — just resume.
        await primaryEl.value.play().catch(() => {});
        playing.value = true;
        return;
      }
      // Switch to the requested track.
      transitionTo(track, idx);
      playing.value = true;
      return;
    }

    if (currentTrack.value) {
      const el = activeSlot === 'primary' ? getOrCreatePrimary() : getOrCreateSecondary();
      await el.play().catch(() => {});
      playing.value = true;
      return;
    }

    // Nothing playing — start queue from beginning if available.
    if (queue.value.length > 0) {
      const first = queue.value[0];
      transitionTo(first, 0);
      playing.value = true;
    }
  }

  /** Pause playback. */
  function pause(): void {
    const el = activeSlot === 'primary' ? getOrCreatePrimary() : getOrCreateSecondary();
    el.pause();
    playing.value = false;
  }

  /** Stop playback and reset position. */
  function stop(): void {
    const el = activeSlot === 'primary' ? getOrCreatePrimary() : getOrCreateSecondary();
    el.pause();
    el.src = '';
    playing.value = false;
    position.value = 0;
    duration.value = 0;
    currentTrack.value = null;
    currentIndex.value = -1;
  }

  /** Skip to the next track. */
  function next(): void {
    if (!hasNext.value) return;
    const idx = currentIndex.value + 1;
    const track = queue.value[idx];
    transitionTo(track, idx);
  }

  /** Go to the previous track. */
  function previous(): void {
    if (!hasPrev.value) return;
    const idx = currentIndex.value - 1;
    const track = queue.value[idx];
    transitionTo(track, idx);
  }

  /** Seek to an absolute position in seconds. */
  function seek(seconds: number): void {
    const el = activeSlot === 'primary' ? getOrCreatePrimary() : getOrCreateSecondary();
    if (isFinite(seconds) && seconds >= 0) {
      el.currentTime = seconds;
    }
  }

  /**
   * Wire up the timeupdate + ended event listeners on the currently active
   * audio element. Call this once after creating the composable.
   * Returns a teardown function.
   */
  function bindActiveElement(): () => void {
    function getActiveEl(): HTMLAudioElement | null {
      return activeSlot === 'primary' ? primaryEl.value : secondaryEl.value;
    }

    const onTimeUpdate = (): void => {
      const el = getActiveEl();
      if (!el) return;
      position.value = el.currentTime;

      // Trigger crossfade when close to end (if crossfade enabled and not already crossfading).
      if (prefs.crossfadeDuration > 0 && !prefs.gaplessEnabled && hasNext.value) {
        const timeLeft = (el.duration || 0) - el.currentTime;
        if (timeLeft <= prefs.crossfadeDuration && timeLeft > 0) {
          advanceToNext();
        }
      }
    };

    const onLoadedMetadata = (): void => {
      const el = getActiveEl();
      if (el && isFinite(el.duration)) {
        duration.value = el.duration;
      }
    };

    const onEnded = (): void => {
      // If gapless + crossfade disabled: advance immediately.
      if (prefs.gaplessEnabled && prefs.crossfadeDuration === 0) {
        advanceToNext();
      } else if (!prefs.gaplessEnabled && !hasNext.value) {
        // End of queue.
        playing.value = false;
        currentTrack.value = null;
        currentIndex.value = -1;
      } else if (hasNext.value) {
        advanceToNext();
      } else {
        playing.value = false;
      }
    };

    const el = getActiveEl();
    if (el) {
      el.addEventListener('timeupdate', onTimeUpdate);
      el.addEventListener('loadedmetadata', onLoadedMetadata);
      el.addEventListener('ended', onEnded);
    }

    return () => {
      const e = getActiveEl();
      if (e) {
        e.removeEventListener('timeupdate', onTimeUpdate);
        e.removeEventListener('loadedmetadata', onLoadedMetadata);
        e.removeEventListener('ended', onEnded);
      }
    };
  }

  // When the crossfadeDuration preference changes to 0 while gapless is on,
  // preloadNext on the now-idle element so gapless is ready.
  watch(
    () => [prefs.gaplessEnabled, prefs.crossfadeDuration],
    () => {
      if (prefs.gaplessEnabled && prefs.crossfadeDuration === 0 && playing.value) {
        preloadNext();
      }
    },
  );

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
    // Computed
    hasNext,
    hasPrev,
    // Methods
    loadTracks,
    play,
    pause,
    stop,
    next,
    previous,
    seek,
    bindActiveElement,
  };
}
