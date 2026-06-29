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
/** Companion key holding per-id last-touched epoch-ms timestamps used to bound the
 *  resume map (LRU). Stored SEPARATELY so `phlix.resume`'s payload shape stays a
 *  flat `Record<string, number>` (id → seconds) for backward compatibility. */
const RESUME_TOUCHED_KEY = 'phlix.resume.touched';
/** Hard cap on the number of distinct ids the persisted resume map may hold. Beyond
 *  this, the least-recently-touched entries are evicted before each persist so the
 *  map can never grow unbounded across a user's lifetime of watching. */
export const RESUME_MAX_ENTRIES = 200;
/** 100-nanosecond ticks per second — the server reports playback position in these
 *  (Jellyfin-style) ticks; the local resume map is in whole seconds. */
export const TICKS_PER_SECOND = 10_000_000;

/**
 * A transport command pushed onto the store's command bus by a host OUTSIDE the
 * Vue tree (Electron tray / media keys, TV remotes). The live media component
 * (Player.vue or MiniPlayer.vue) watches `lastCommand` and applies it to its REAL
 * `<video>` element — mirroring the `bindMediaSession` pattern: the store records
 * an intent, the element owner enacts it. `seq` is bumped on every dispatch so two
 * identical successive commands still re-trigger the watcher.
 */
export interface PlayerCommand {
  type: 'seekTo' | 'seekBy';
  /** seconds (seekTo = absolute) or delta seconds (seekBy = relative). */
  value: number;
  /** bump id so two identical successive commands still trigger the watcher. */
  seq: number;
}

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

/** Best-effort read of the companion last-touched map. Always returns a usable
 *  object — a missing/corrupt/partial map just means those ids have no recorded
 *  touch time (treated as oldest), so eviction still works without it. */
function readTouchedMap(): Record<string, number> {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(RESUME_TOUCHED_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, number>) : {};
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
  /** INTERNAL per-id last-touched timestamps (epoch ms) driving LRU eviction of the
   *  bounded resume map. Deliberately NOT in the public store return — no consumer
   *  reads it; it exists only to decide which resume entries to drop at the cap. */
  const lastTouched = ref<Record<string, number>>(readTouchedMap());

  /** Command bus (see PlayerCommand) — the latest external transport intent. The
   *  live media component watches this and applies it to its real <video>. */
  const lastCommand = ref<PlayerCommand | null>(null);
  let cmdSeq = 0;

  const progress = computed(() => (duration.value > 0 ? position.value / duration.value : 0));
  const upNext = computed<MediaItem | null>(() => queue.value[0] ?? null);

  // ---- resume map (throttled persistence) ---------------------------------
  /** Stamp an id as touched-now (called on every write to the resume map). */
  function touch(id: string): void {
    lastTouched.value[id] = Date.now();
  }

  /**
   * Evict the least-recently-touched resume entries until at most `cap` remain,
   * dropping each evicted id from BOTH the resume map and the touched map. Ids with
   * no recorded touch time sort as oldest. Also prunes any orphaned touched entries
   * (ids no longer present in the resume map) so the companion map can't drift
   * unbounded either. Returns true if anything was removed.
   */
  function evictToCapacity(cap: number): boolean {
    const ids = Object.keys(resumeMap.value);
    // Prune orphaned touched entries (touched ids not in the resume map).
    let removed = false;
    for (const id of Object.keys(lastTouched.value)) {
      if (!(id in resumeMap.value)) {
        delete lastTouched.value[id];
        removed = true;
      }
    }
    if (ids.length <= cap) return removed;
    // Oldest-first by last-touched (absent → 0 → evicted first).
    ids.sort((a, b) => (lastTouched.value[a] ?? 0) - (lastTouched.value[b] ?? 0));
    const evictCount = ids.length - cap;
    for (let i = 0; i < evictCount; i++) {
      const id = ids[i];
      delete resumeMap.value[id];
      delete lastTouched.value[id];
    }
    return true;
  }

  let persistTimer: ReturnType<typeof setTimeout> | undefined;
  let lastPersist = 0;
  function persistResume(force = false): void {
    if (typeof localStorage === 'undefined') return;
    const write = () => {
      lastPersist = Date.now();
      const commit = () => {
        localStorage.setItem(RESUME_KEY, JSON.stringify(resumeMap.value));
        localStorage.setItem(RESUME_TOUCHED_KEY, JSON.stringify(lastTouched.value));
      };
      try {
        commit();
      } catch {
        // Likely a quota error. Make ONE eviction pass (drop the oldest ~25%) and
        // retry the write once; if it still fails, swallow it (no UX regression —
        // an unpersisted resume position is recoverable, an exception is not).
        try {
          evictToCapacity(Math.floor(Object.keys(resumeMap.value).length * 0.75));
          commit();
        } catch {
          /* ignore quota */
        }
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
      touch(id);
      evictToCapacity(RESUME_MAX_ENTRIES);
    } else {
      delete resumeMap.value[id]; // too early or effectively finished
      delete lastTouched.value[id];
    }
    persistResume();
  }

  function resumePositionFor(id: string | null | undefined): number | null {
    if (!id) return null;
    return resumeMap.value[id] ?? null;
  }
  function clearResume(id: string): void {
    delete resumeMap.value[id];
    delete lastTouched.value[id];
    persistResume(true);
  }

  /**
   * Merge server-side resume positions (seconds, keyed by media id) into the local
   * map — the cross-device resume READ path. Positions recorded on OTHER devices
   * (Roku/mobile, via their playback sessions) reach the web player here from
   * `GET /api/v1/users/me/continue-watching`, so a title you paused on the TV
   * offers to resume on the web.
   *
   * Fill-gaps policy: a position already in the local map (set by THIS device's
   * recent watching) always wins; server positions only seed ids the local map
   * doesn't already track. The local map carries no per-id timestamps, so this
   * conservative choice never overwrites a fresh local position with a possibly
   * staler server one. Persists once if anything changed.
   */
  function mergeServerResume(positions: Record<string, number>): void {
    let changed = false;
    for (const [id, seconds] of Object.entries(positions)) {
      if (id && !(id in resumeMap.value) && seconds > 0) {
        resumeMap.value[id] = Math.floor(seconds);
        touch(id);
        changed = true;
      }
    }
    if (changed) {
      // Server-seeded ids count toward the cap too — bound the map before persisting
      // so a large continue-watching payload can't blow past RESUME_MAX_ENTRIES.
      evictToCapacity(RESUME_MAX_ENTRIES);
      persistResume(true);
    }
  }

  // ---- transport ----------------------------------------------------------
  function setCurrent(media: MediaItem, opts: { resetPosition?: boolean; streamUrl?: string } = {}): void {
    current.value = media;
    if (opts.streamUrl !== undefined) streamUrl.value = opts.streamUrl;
    if (opts.resetPosition !== false) {
      position.value = 0;
      // Seed the scrubber length from the server's probed total length (seconds)
      // when known, so it starts at the true total instead of growing as a
      // transcode/HLS stream loads. With no server duration this is 0 (today's
      // reset) and updateProgress fills it from the <video> element.
      duration.value =
        typeof media.duration === 'number' && isFinite(media.duration) && media.duration > 0 ? media.duration : 0;
      buffered.value = 0;
    }
    setMediaSessionMetadata(media);
  }

  function updateProgress(pos: number, dur?: number, buf?: number): void {
    position.value = pos;
    if (dur !== undefined) {
      if (duration.value > 0) {
        // A server-probed total is already seeded — only ADOPT the element's
        // duration if it is finite and LARGER, so the scrubber never shrinks below
        // the known total while a transcode/HLS stream is still loading.
        if (isFinite(dur) && dur > duration.value) duration.value = dur;
      } else {
        // No seed — keep the original behavior (the element's duration drives it).
        duration.value = dur;
      }
    }
    if (buf !== undefined) buffered.value = buf;
    if (current.value) saveResume(current.value.id, pos, duration.value);
  }

  // ---- command bus (external transport seam) ------------------------------
  /** Request an ABSOLUTE seek (seconds). Records an intent on `lastCommand`; the
   *  live media component applies it to its real <video>. Does NOT touch the
   *  element or store position directly — the element's seek then drives
   *  `updateProgress`, exactly as a user scrubber seek does. */
  function seekTo(seconds: number): void {
    lastCommand.value = { type: 'seekTo', value: seconds, seq: ++cmdSeq };
  }
  /** Request a RELATIVE seek (delta seconds). See `seekTo`. */
  function seekBy(delta: number): void {
    lastCommand.value = { type: 'seekBy', value: delta, seq: ++cmdSeq };
  }

  /**
   * Play an arbitrary local file (Windows host "Open File…"). Builds a minimal
   * synthetic MediaItem (stable id `'local'`, title from `meta` or the URL
   * basename) and routes it through the EXISTING setCurrent so all the usual
   * media-session + transport seeding runs, then clears the queue (a local file
   * has no up-next). `url` becomes the stream URL with a fresh position.
   */
  function playLocalFile(url: string, meta: Partial<MediaItem> = {}): void {
    const basename = decodeURIComponent(url.split(/[?#]/)[0].split('/').pop() ?? '') || url;
    const item: MediaItem = {
      id: 'local',
      name: basename,
      type: 'movie',
      poster_url: null,
      genres: [],
      year: null,
      rating: null,
      runtime: null,
      overview: null,
      actors: [],
      director: null,
      created_at: null,
      updated_at: null,
      ...meta,
    };
    setCurrent(item, { streamUrl: url, resetPosition: true });
    queue.value = [];
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
  /**
   * Advance to the next queued item; returns it (or null when the queue is empty).
   * Threads a fresh stream URL via `resolveStreamUrl` so advancing never leaves a
   * STALE `streamUrl` (the previous item's): with no resolver — or one that returns
   * nothing — `streamUrl` is CLEARED to '' rather than left pointing at the prior
   * stream (the mini-player gates on `streamUrl`, so it hides instead of playing the
   * wrong media). R3.9's PlayerPage supplies the real `/media/:id/stream` resolver.
   */
  function next(resolveStreamUrl?: (m: MediaItem) => string | undefined): MediaItem | null {
    const n = queue.value.shift() ?? null;
    if (n) setCurrent(n, { streamUrl: resolveStreamUrl?.(n) ?? '' });
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
    lastCommand,
    progress,
    upNext,
    inResumeBand,
    saveResume,
    resumePositionFor,
    clearResume,
    mergeServerResume,
    setCurrent,
    updateProgress,
    seekTo,
    seekBy,
    playLocalFile,
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
