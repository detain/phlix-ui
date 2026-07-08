/**
 * useHlsTranscode — orchestrates the on-demand HLS transcode → playback flow.
 *
 * Given a <video> element and a media id, it asks the server to transcode the
 * file (POST /api/v1/media/:id/transcode), polls readiness
 * (GET /api/v1/transcode/:jobId/status) until the variant playlist has segments,
 * then attaches the HLS master playlist to the element via hls.js
 * ({@link attachHls}). It exposes a small reactive state machine the player uses
 * to show a "preparing" overlay, then the normal chrome once `ready` (or the
 * "can't play" notice on `error`).
 *
 * Everything external (the HTTP client, the hls attach, the inter-poll sleep) is
 * injectable so the flow can be unit-tested without a network or a real browser.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */
import { ref, type Ref } from 'vue';
import { ApiClient } from '../api/client';
import { LocalStorageTokenStore } from '../api/tokenStore';
import { attachHls as defaultAttach, type AttachHlsOptions, type HlsHandle, type HlsLevel } from '../components/player/hls-playback';
import {
  isFailedStatus,
  isPlayable,
  parseTranscodeStart,
  parseTranscodeStatus,
  resolveStreamUrl,
  transcodeStartPath,
  transcodeStatusPath,
  type SubtitleTrack,
} from '../components/player/transcode';

/** State machine for the transcode-to-play flow. */
export type TranscodeState = 'idle' | 'preparing' | 'ready' | 'error';

/** Minimal HTTP surface this composable needs (ApiClient-compatible). */
export interface TranscodeHttpClient {
  post<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
  get<T = unknown>(endpoint: string, params?: Record<string, string>, signal?: AbortSignal): Promise<T>;
}

/** Options for {@link useHlsTranscode}. */
export interface UseHlsTranscodeOptions {
  /** Resolver for the API base (PlayerPage injects the app's base). */
  apiBase: () => string;
  /** Injectable HTTP client (defaults to a token-aware ApiClient). */
  client?: TranscodeHttpClient;
  /** Injectable hls attach (defaults to the real {@link attachHls}). */
  attach?: (video: HTMLVideoElement, url: string, opts?: AttachHlsOptions) => Promise<HlsHandle>;
  /** Bearer-token getter for segment requests. */
  getToken?: () => string | null;
  /** Poll interval between status checks (ms). */
  pollIntervalMs?: number;
  /** Give up after this long (ms). */
  maxWaitMs?: number;
  /** Injectable delay (defaults to setTimeout) — overridden in tests. */
  sleep?: (ms: number) => Promise<void>;
  /** Optional per-app hls.js config overrides threaded down to {@link attachHls}
   *  (e.g. a constrained TV tuning buffer lengths down to cap RAM). Merged OVER
   *  phlix-ui's defaults; never overrides the auth `xhrSetup` (see hls-playback). */
  hlsConfig?: Partial<import('hls.js').HlsConfig>;
}

/**
 * A subtitle sidecar track exposed to the player, with its `url` already
 * resolved against the API base (an absolute URL ready for a `<track src>`).
 */
export type ResolvedSubtitleTrack = SubtitleTrack;

/** The reactive handle returned by {@link useHlsTranscode}. */
export interface HlsTranscodeController {
  state: Ref<TranscodeState>;
  progress: Ref<number>;
  /** Server-provided WebVTT subtitle tracks (absolute URLs). May arrive late on
   *  a status poll once extraction completes; empty for sources with no embedded
   *  text subtitles. The Player renders a `<track>` per entry. */
  subtitleTracks: Ref<ResolvedSubtitleTrack[]>;
  /** The selectable quality rungs of the attached stream, highest-first (mirrors
   *  {@link HlsHandle.levels}). Empty until the manifest is parsed, and always
   *  empty on the native-HLS (Safari) path where the browser owns ABR. */
  levels: Ref<HlsLevel[]>;
  /** The pinned level index, or `-1` when ABR ("Auto") is choosing. Reflects the
   *  user's {@link setLevel} choice and any ABR/manual switch. */
  currentLevel: Ref<number>;
  /** True while ABR ("Auto") is picking the level; stays `true` on native HLS. */
  autoEnabled: Ref<boolean>;
  /** Height (px) of whichever level is currently playing — useful for an
   *  "Auto (→720p)" label — or `null` when unknown / no levels (e.g. native HLS
   *  or before the first level switch settles). */
  activeLevelHeight: Ref<number | null>;
  /** Pin a quality rung by level index for an IMMEDIATE switch, or pass `'auto'`
   *  to hand the choice back to ABR. Safe no-op before a stream is attached or on
   *  the native-HLS path. Updates {@link currentLevel}/{@link autoEnabled}
   *  optimistically; a later switch event reconciles the exact active level. */
  setLevel(level: number | 'auto'): void;
  /** Start (or restart) the transcode-to-play flow. `profile` is OPTIONAL: when
   *  omitted the start request sends NO `?profile=` query, letting the server map
   *  the quality profile from the request's `X-Phlix-Device-Type` header (a TV
   *  identifies itself → gets >1080p). Pass an explicit profile to pin it. */
  start(video: HTMLVideoElement, mediaId: string, profile?: string): Promise<void>;
  cleanup(): void;
  reset(): void;
}

export function useHlsTranscode(opts: UseHlsTranscodeOptions): HlsTranscodeController {
  const state = ref<TranscodeState>('idle');
  const progress = ref(0);
  const subtitleTracks = ref<ResolvedSubtitleTrack[]>([]);
  const levels = ref<HlsLevel[]>([]);
  const currentLevel = ref<number>(-1);
  const autoEnabled = ref<boolean>(true);
  const activeLevelHeight = ref<number | null>(null);

  /** Pull the live level getters off the attached handle into reactive state.
   *  Called on manifest-parse (`onReady`) and on every settled level switch —
   *  the two moments hls.js's live `levels`/`autoLevelEnabled` getters change.
   *  `activeIndex`, when given (from the switch event), names the level that is
   *  actually playing; otherwise we fall back to the pinned level. */
  function syncLevelState(activeIndex?: number): void {
    if (!handle) return;
    levels.value = handle.levels;
    currentLevel.value = handle.getCurrentLevel();
    autoEnabled.value = handle.autoLevelEnabled;
    const active = activeIndex ?? handle.getCurrentLevel();
    const match = active >= 0 ? levels.value.find((l) => l.index === active) : undefined;
    activeLevelHeight.value = match ? match.height : null;
  }

  /** Return the level refs to their Auto/empty defaults (no handle attached). */
  function resetLevelState(): void {
    levels.value = [];
    currentLevel.value = -1;
    autoEnabled.value = true;
    activeLevelHeight.value = null;
  }

  /** Replace the exposed track list, resolving each sidecar URL against the API
   *  base exactly like the master playlist URL. A later poll only overwrites the
   *  list when it actually carries tracks, so an empty poll never clobbers tracks
   *  the start response already surfaced. */
  function setSubtitleTracks(tracks: SubtitleTrack[]): void {
    if (tracks.length === 0) return;
    const base = opts.apiBase();
    subtitleTracks.value = tracks.map((t) => ({ ...t, url: resolveStreamUrl(base, t.url) }));
  }

  const attach = opts.attach ?? defaultAttach;
  const pollIntervalMs = opts.pollIntervalMs ?? 1000;
  const maxWaitMs = opts.maxWaitMs ?? 120000;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const maxAttempts = Math.max(1, Math.ceil(maxWaitMs / Math.max(1, pollIntervalMs)));

  const tokenStore = createTokenStore();
  const getToken = opts.getToken ?? (() => safeToken(tokenStore));

  let handle: HlsHandle | null = null;
  let unsubscribeLevelSwitched: (() => void) | null = null;
  let cancelled = false;

  function makeClient(): TranscodeHttpClient {
    return opts.client ?? new ApiClient({ baseUrl: opts.apiBase(), tokenStore: tokenStore ?? undefined });
  }

  async function start(video: HTMLVideoElement, mediaId: string, profile?: string): Promise<void> {
    cleanup();
    cancelled = false;
    state.value = 'preparing';
    progress.value = 0;
    subtitleTracks.value = [];
    resetLevelState();

    try {
      const client = makeClient();
      const startRes = parseTranscodeStart(await client.post(transcodeStartPath(mediaId, profile)));
      if (cancelled) return;
      if (!startRes.jobId || !startRes.masterUrl) {
        throw new Error('transcode start returned no job');
      }
      // Tracks may already be present on the start response (a reused job that
      // already finished extracting); otherwise they arrive on a later poll.
      setSubtitleTracks(startRes.subtitles);

      const masterUrl = resolveStreamUrl(opts.apiBase(), startRes.masterUrl);

      let ready = startRes.status === 'completed';
      for (let attempt = 0; !ready && attempt < maxAttempts; attempt++) {
        const status = parseTranscodeStatus(await client.get(transcodeStatusPath(startRes.jobId)));
        if (cancelled) return;
        progress.value = status.progress;
        // Late-arriving tracks (extraction completes after the playlist is ready)
        // update the exposed list reactively → the Player adds the <track>s.
        setSubtitleTracks(status.subtitles);
        if (isFailedStatus(status.status)) {
          throw new Error(`transcode ${status.status}`);
        }
        if (isPlayable(status)) {
          ready = true;
          break;
        }
        await sleep(pollIntervalMs);
        if (cancelled) return;
      }

      if (!ready) {
        throw new Error('transcode timed out');
      }

      handle = await attach(video, masterUrl, {
        getToken,
        hlsConfig: opts.hlsConfig,
        onReady: () => syncLevelState(),
        onError: () => {
          if (!cancelled) {
            state.value = 'error';
          }
        },
      });
      if (cancelled) {
        handle.destroy();
        handle = null;
        return;
      }
      unsubscribeLevelSwitched = handle.onLevelSwitched((index) => syncLevelState(index));
      // Seed from the handle now: covers the native/degraded shape (empty levels,
      // Auto) and a manifest that parsed before this point.
      syncLevelState();
      state.value = 'ready';
    } catch {
      if (!cancelled) {
        state.value = 'error';
      }
    }
  }

  function setLevel(level: number | 'auto'): void {
    if (!handle) return;
    // Immediate (buffer-flushing) switch: a user clicking "480p" expects the
    // picture to change now, not on the next fragment. The optimistic sync below
    // updates the label instantly; the settled LEVEL_SWITCHED event reconciles it.
    handle.setCurrentLevel(level === 'auto' ? -1 : level);
    syncLevelState();
  }

  function cleanup(): void {
    cancelled = true;
    if (unsubscribeLevelSwitched) {
      try {
        unsubscribeLevelSwitched();
      } catch {
        /* already unsubscribed */
      }
      unsubscribeLevelSwitched = null;
    }
    if (handle) {
      try {
        handle.destroy();
      } catch {
        /* already torn down */
      }
      handle = null;
    }
  }

  function reset(): void {
    cleanup();
    state.value = 'idle';
    progress.value = 0;
    subtitleTracks.value = [];
    resetLevelState();
  }

  return {
    state,
    progress,
    subtitleTracks,
    levels,
    currentLevel,
    autoEnabled,
    activeLevelHeight,
    setLevel,
    start,
    cleanup,
    reset,
  };
}

function createTokenStore(): LocalStorageTokenStore | null {
  try {
    return new LocalStorageTokenStore();
  } catch {
    return null;
  }
}

function safeToken(store: LocalStorageTokenStore | null): string | null {
  try {
    return store?.getAccessToken() ?? null;
  } catch {
    return null;
  }
}
