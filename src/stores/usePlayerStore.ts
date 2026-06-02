import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { MediaItem } from '../types/media-item';
import { usePreferencesStore } from './usePreferencesStore';

/** Resume is offered only when progress is past this many seconds… */
export const RESUME_MIN_SECONDS = 30;
/** …and before this fraction of the runtime (else it's effectively finished). */
export const RESUME_MAX_RATIO = 0.95;
/** Throttle window for persisting the resume map to localStorage. */
const RESUME_PERSIST_THROTTLE = 5000;
const RESUME_KEY = 'phlix.resume';

export interface MediaSessionHandlers {
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (to: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

function readResumeMap(): Record<string, number> {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(RESUME_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

/**
 * usePlayerStore (R1.3) — singleton playback state shared across routes so a
 * mini-player can keep playing during navigation and "resume" / "up-next" work.
 *
 * Holds the current media + queue, transport state (position/duration/buffered),
 * and user selections (volume/muted/rate/quality/subtitle) seeded from prefs. A
 * persisted, throttled resume map records per-media positions in the 30s–95% band.
 * Media Session metadata + handlers are wired via bindMediaSession().
 */
export const usePlayerStore = defineStore('phlix-player', () => {
  const prefs = usePreferencesStore();

  const current = ref<MediaItem | null>(null);
  /** Stream URL of the current media — so a mini-player can continue the EXACT
   *  stream across routes without re-deriving a URL. Set via setCurrent. */
  const streamUrl = ref('');
  const queue = ref<MediaItem[]>([]);
  const playing = ref(false);
  const position = ref(0);
  const duration = ref(0);
  const buffered = ref(0);

  const volume = ref(prefs.defaultVolume);
  const muted = ref(false);
  const rate = ref(1);
  const quality = ref(prefs.defaultQuality);
  const subtitleLang = ref<string | null>(prefs.defaultSubtitleLang);

  const miniPlayer = ref(false);
  const resumeMap = ref<Record<string, number>>(readResumeMap());

  const progress = computed(() => (duration.value > 0 ? position.value / duration.value : 0));
  const upNext = computed<MediaItem | null>(() => queue.value[0] ?? null);

  // ---- resume map (throttled persistence) ---------------------------------
  let persistTimer: ReturnType<typeof setTimeout> | undefined;
  let lastPersist = 0;
  function persistResume(force = false): void {
    if (typeof localStorage === 'undefined') return;
    const write = () => {
      lastPersist = Date.now();
      try {
        localStorage.setItem(RESUME_KEY, JSON.stringify(resumeMap.value));
      } catch {
        /* ignore quota */
      }
    };
    const since = Date.now() - lastPersist;
    clearTimeout(persistTimer);
    if (force || since >= RESUME_PERSIST_THROTTLE) {
      write();
    } else {
      persistTimer = setTimeout(write, RESUME_PERSIST_THROTTLE - since);
    }
  }

  function inResumeBand(pos: number, dur: number): boolean {
    return dur > 0 && pos > RESUME_MIN_SECONDS && pos < dur * RESUME_MAX_RATIO;
  }

  /** Record (or clear) the resume position for a media id, throttled. */
  function saveResume(id: string, pos: number, dur: number): void {
    if (inResumeBand(pos, dur)) {
      resumeMap.value[id] = Math.floor(pos);
    } else {
      delete resumeMap.value[id]; // too early or effectively finished
    }
    persistResume();
  }

  function resumePositionFor(id: string | null | undefined): number | null {
    if (!id) return null;
    return resumeMap.value[id] ?? null;
  }
  function clearResume(id: string): void {
    delete resumeMap.value[id];
    persistResume(true);
  }

  // ---- transport ----------------------------------------------------------
  function setCurrent(media: MediaItem, opts: { resetPosition?: boolean; streamUrl?: string } = {}): void {
    current.value = media;
    if (opts.streamUrl !== undefined) streamUrl.value = opts.streamUrl;
    if (opts.resetPosition !== false) {
      position.value = 0;
      duration.value = 0;
      buffered.value = 0;
    }
    setMediaSessionMetadata(media);
  }

  function updateProgress(pos: number, dur?: number, buf?: number): void {
    position.value = pos;
    if (dur !== undefined) duration.value = dur;
    if (buf !== undefined) buffered.value = buf;
    if (current.value) saveResume(current.value.id, pos, duration.value);
  }

  function play(): void {
    playing.value = true;
    if (typeof navigator !== 'undefined' && navigator.mediaSession) navigator.mediaSession.playbackState = 'playing';
  }
  function pause(): void {
    playing.value = false;
    if (current.value) saveResume(current.value.id, position.value, duration.value);
    persistResume(true);
    if (typeof navigator !== 'undefined' && navigator.mediaSession) navigator.mediaSession.playbackState = 'paused';
  }
  function setVolume(v: number): void {
    volume.value = Math.min(1, Math.max(0, v));
    if (volume.value > 0) muted.value = false;
  }
  function toggleMute(): void {
    muted.value = !muted.value;
  }
  function setRate(r: number): void {
    rate.value = r;
  }
  function setQuality(q: string): void {
    quality.value = q;
  }
  function setSubtitle(lang: string | null): void {
    subtitleLang.value = lang;
  }

  // ---- queue / up-next ----------------------------------------------------
  function setQueue(items: MediaItem[]): void {
    queue.value = [...items];
  }
  function enqueue(item: MediaItem): void {
    queue.value.push(item);
  }
  /** Advance to the next queued item; returns it (or null when the queue is empty). */
  function next(): MediaItem | null {
    const n = queue.value.shift() ?? null;
    if (n) setCurrent(n);
    return n;
  }

  // ---- mini-player --------------------------------------------------------
  function showMiniPlayer(): void {
    miniPlayer.value = true;
  }
  function hideMiniPlayer(): void {
    miniPlayer.value = false;
  }
  function closePlayer(): void {
    if (current.value) saveResume(current.value.id, position.value, duration.value);
    persistResume(true);
    playing.value = false;
    miniPlayer.value = false;
    current.value = null;
    streamUrl.value = '';
  }

  // ---- Media Session ------------------------------------------------------
  function setMediaSessionMetadata(media: MediaItem): void {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    const MM = (globalThis as { MediaMetadata?: typeof MediaMetadata }).MediaMetadata;
    if (!MM) return;
    navigator.mediaSession.metadata = new MM({
      title: media.name,
      artist: media.director ?? media.genres?.join(', ') ?? '',
      album: media.year ? String(media.year) : '',
      artwork: media.poster_url ? [{ src: media.poster_url }] : [],
    });
  }

  /** Push the current position/duration/rate to the OS Media Session so the
   *  lock-screen/notification scrubber reflects progress. Guarded + best-effort. */
  function setMediaPositionState(): void {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    if (typeof ms.setPositionState !== 'function') return;
    if (!(duration.value > 0) || !Number.isFinite(duration.value)) return;
    try {
      ms.setPositionState({
        duration: duration.value,
        position: Math.min(Math.max(0, position.value), duration.value),
        playbackRate: rate.value || 1,
      });
    } catch {
      /* invalid state (e.g. position > duration mid-seek) — ignore */
    }
  }

  /** Wire OS/lock-screen transport controls. Returns a teardown that clears them. */
  function bindMediaSession(handlers: MediaSessionHandlers): () => void {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return () => {};
    const ms = navigator.mediaSession;
    const set = (action: MediaSessionAction, fn: (() => void) | ((d: MediaSessionActionDetails) => void) | null) => {
      try {
        ms.setActionHandler(action, fn as MediaSessionActionHandler | null);
      } catch {
        /* unsupported action — ignore */
      }
    };
    if (handlers.onPlay) set('play', handlers.onPlay);
    if (handlers.onPause) set('pause', handlers.onPause);
    if (handlers.onNext) set('nexttrack', handlers.onNext);
    if (handlers.onPrevious) set('previoustrack', handlers.onPrevious);
    if (handlers.onSeek) {
      set('seekto', (d: MediaSessionActionDetails) => handlers.onSeek?.(d.seekTime ?? 0));
    }
    return () => {
      for (const a of ['play', 'pause', 'nexttrack', 'previoustrack', 'seekto'] as MediaSessionAction[]) set(a, null);
    };
  }

  /** Re-seed volume/quality/subtitle from the current preferences (e.g. on open). */
  function seedFromPreferences(): void {
    volume.value = prefs.defaultVolume;
    quality.value = prefs.defaultQuality;
    subtitleLang.value = prefs.defaultSubtitleLang;
  }

  return {
    current,
    streamUrl,
    queue,
    playing,
    position,
    duration,
    buffered,
    volume,
    muted,
    rate,
    quality,
    subtitleLang,
    miniPlayer,
    resumeMap,
    progress,
    upNext,
    inResumeBand,
    saveResume,
    resumePositionFor,
    clearResume,
    setCurrent,
    updateProgress,
    play,
    pause,
    setVolume,
    toggleMute,
    setRate,
    setQuality,
    setSubtitle,
    setQueue,
    enqueue,
    next,
    showMiniPlayer,
    hideMiniPlayer,
    closePlayer,
    setMediaSessionMetadata,
    setMediaPositionState,
    bindMediaSession,
    seedFromPreferences,
  };
});
