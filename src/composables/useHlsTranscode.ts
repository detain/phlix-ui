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
 * @license MIT
 */
import { ref, type Ref } from 'vue';
import { ApiClient } from '../api/client';
import { LocalStorageTokenStore } from '../api/tokenStore';
import { usePlayerStore } from '../stores/usePlayerStore';
import { attachHls as defaultAttach, type AttachHlsOptions, type HlsAudioTrack, type HlsHandle, type HlsLevel } from '../components/player/hls-playback';
import {
  isFailedStatus,
  isPlayable,
  parseTranscodeStart,
  parseTranscodeStatus,
  resolveStreamUrl,
  transcodeStartPath,
  transcodeStatusPath,
  type SubtitleTrack,
  type Variant,
} from '../components/player/transcode';

/** State machine for the transcode-to-play flow. */
export type TranscodeState = 'idle' | 'preparing' | 'ready' | 'error';

/** Minimal HTTP surface this composable needs (ApiClient-compatible). */
export interface TranscodeHttpClient {
  post<T = unknown>(endpoint: string, data?: unknown, signal?: AbortSignal): Promise<T>;
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
  /** Server-provided quality ladder ({@link Variant}[]) from the transcode
   *  start/status response. Used as fallback when hls.js levels are insufficient
   *  (e.g. manifest only has one quality) to populate the quality selector.
   *  Null on a legacy pre-ABR job. */
  variants: Ref<Variant[] | null>;
  /** The available audio tracks from the HLS manifest (P3B-S3 multi-audio).
   *  Populated once the manifest is parsed via {@link HlsHandle.audioTracks}.
   *  Empty when the manifest has no #EXT-X-MEDIA:TYPE=AUDIO groups or on the
   *  native-HLS (Safari) path where audio tracks come from video.audioTracks. */
  audioTracks: Ref<HlsAudioTrack[]>;
  /** The currently selected audio track index, or `-1` when no audio track
   *  is active (e.g. native HLS path or a manifest with no audio groups). */
  currentAudioTrack: Ref<number>;
  /** Pin a quality rung by level index for an IMMEDIATE switch, or pass `'auto'`
    *  to hand the choice back to ABR. Safe no-op before a stream is attached or on
    *  the native-HLS path. Updates {@link currentLevel}/{@link autoEnabled}
    *  optimistically; a later switch event reconciles the exact active level. */
  setLevel(level: number | 'auto'): void;
  /** Like {@link setLevel} but schedules the switch for the NEXT fragment load
    *  (non-flushing). Use for automatic/pref-seeded quality pins where you do
    *  NOT want to interrupt the in-flight buffer. User-initiated quality changes
    *  should still use {@link setLevel} (buffer-flushing is correct there). */
  setNextLevel(level: number | 'auto'): void;
  /** Switch to a different audio track by index (P3B-S3). Safe no-op before a
   *  stream is attached, when there are no audio tracks, or on the native-HLS
   *  path. Updates {@link currentAudioTrack} optimistically; a later
   *  AUDIO_TRACK_SWITCHED event reconciles the exact active track. */
  setAudioTrack(track: number): void;
  /** The transcode job ID, set once the start response arrives. Used to
   *  construct variant playlist URLs for non-ABR quality selection (e.g. "Original"). */
  jobId: Ref<string | null>;
  /** The master playlist URL, set once the start response arrives. Used to
   *  construct variant playlist URLs for non-ABR quality selection. */
  masterUrl: Ref<string | null>;
  /** Load a specific variant playlist directly (e.g. `media_voriginal.m3u8`)
   *  instead of using ABR level switching. This is used for the "Original"
   *  quality option when the original variant is not in the ABR ladder.
   *  Calling this will clear the buffer and restart playback. */
  loadVariantPlaylist(variantId: string): void;
  /** Start (or restart) the transcode-to-play flow. `profile` is OPTIONAL: when
   *  omitted the start request sends NO `?profile=` query, letting the server map
   *  the quality profile from the request's `X-Phlix-Device-Type` header (a TV
   *  identifies itself → gets >1080p). Pass an explicit profile to pin it.
   *  `startPosition` is the playback position in seconds to resume from on the
   *  transcode path (preserves position when falling back from direct play). */
  start(video: HTMLVideoElement, mediaId: string, profile?: string, startPosition?: number): Promise<void>;
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
  const variants = ref<Variant[] | null>(null);
  const audioTracks = ref<HlsAudioTrack[]>([]);
  const currentAudioTrack = ref<number>(-1);
  /** The transcode job ID, set once the start response arrives. */
  const jobId = ref<string | null>(null);
  /** The master playlist URL, set once the start response arrives. */
  const masterUrl = ref<string | null>(null);

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
    variants.value = null;
  }

  /** Pull audio track state from the attached handle. Called on manifest-parse
   *  and on every settled audio track switch. `activeIndex`, when given (from
   *  the switch event), names the track that is actually playing. */
  function syncAudioTrackState(activeIndex?: number): void {
    if (!handle) return;
    audioTracks.value = handle.audioTracks;
    currentAudioTrack.value = activeIndex ?? handle.getCurrentAudioTrack();
  }

  /** Return the audio track refs to their defaults (no handle attached). */
  function resetAudioTrackState(): void {
    audioTracks.value = [];
    currentAudioTrack.value = -1;
  }

  /** Replace the exposed variants list. Overwrites only when non-empty so a
   *  later poll never clobbers variants the start response already surfaced. */
  function setVariants(v: Variant[] | null): void {
    if (!v || v.length === 0) return;
    variants.value = v;
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
  let unsubscribeAudioTrackSwitched: (() => void) | null = null;
  let cancelled = false;
  let abortController: AbortController | null = null;

  function makeClient(): TranscodeHttpClient {
    return opts.client ?? new ApiClient({ baseUrl: opts.apiBase(), tokenStore: tokenStore ?? undefined, timeoutMs: 60000 });
  }

  async function start(video: HTMLVideoElement, mediaId: string, profile?: string, startPosition?: number): Promise<void> {
    cleanup();
    cancelled = false;
    abortController = new AbortController();
    state.value = 'preparing';
    progress.value = 0;
    subtitleTracks.value = [];
    resetLevelState();

    try {
      const client = makeClient();
      const startRes = parseTranscodeStart(await client.post(transcodeStartPath(mediaId, profile), undefined, abortController.signal));
      if (cancelled) return;
      if (!startRes.jobId || !startRes.masterUrl) {
        throw new Error('transcode start returned no job');
      }
      // Tracks may already be present on the start response (a reused job that
      // already finished extracting); otherwise they arrive on a later poll.
      setSubtitleTracks(startRes.subtitles);
      // Variants (the quality ladder) may also be present on the start response.
      setVariants(startRes.variants);

      // Store jobId and masterUrl for variant playlist construction (e.g. "Original").
      jobId.value = startRes.jobId;
      masterUrl.value = resolveStreamUrl(opts.apiBase(), startRes.masterUrl);

      let ready = startRes.status === 'completed';
      for (let attempt = 0; !ready && attempt < maxAttempts; attempt++) {
        const status = parseTranscodeStatus(await client.get(transcodeStatusPath(startRes.jobId), undefined, abortController.signal));
        if (cancelled) return;
        progress.value = status.progress;
        // Late-arriving tracks (extraction completes after the playlist is ready)
        // update the exposed list reactively → the Player adds the <track>s.
        setSubtitleTracks(status.subtitles);
        // Late-arriving variants update the quality ladder if the start response
        // had none (e.g. a reused job where variants arrived after initial response).
        setVariants(status.variants);
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

      handle = await attach(video, masterUrl.value, {
        getToken,
        hlsConfig: opts.hlsConfig,
        startPosition,
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
      unsubscribeAudioTrackSwitched = handle.onAudioTrackSwitched((index) => syncAudioTrackState(index));
      // Seed from the handle now: covers the native/degraded shape (empty levels,
      // Auto) and a manifest that parsed before this point.
      syncLevelState();
      syncAudioTrackState();
      // Persist the resolved HLS master URL so the mini-player can continue
      // a transcoded title when the user docks away from the full player.
      try {
        const playerStore = usePlayerStore();
        playerStore.hlsMasterUrl = masterUrl.value!;
      } catch {
        /* store not available (e.g. test environment without Pinia) — ignore */
      }
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

  function setNextLevel(level: number | 'auto'): void {
    if (!handle) return;
    // Non-flushing switch: schedules the level change for the next fragment.
    // Safe for automatic pref-seeding where interrupting the buffer is unwanted.
    handle.setNextLevel(level === 'auto' ? -1 : level);
    syncLevelState();
  }

  function setAudioTrack(track: number): void {
    if (!handle) return;
    handle.setAudioTrack(track);
    syncAudioTrackState();
  }

  /** Load a specific variant playlist directly (e.g. `media_voriginal.m3u8`).
   *  Used for "Original" quality when the original variant is not in the ABR ladder.
   *  This clears the buffer and restarts playback. */
  function loadVariantPlaylist(variantId: string): void {
    if (!handle || !masterUrl.value) return;
    // Construct variant URL from master URL: replace "master.m3u8" with "media_v{variantId}.m3u8"
    const variantUrl = masterUrl.value.replace('master.m3u8', `media_v${variantId}.m3u8`);
    handle.loadSource(variantUrl);
    // Reset level state since the variant playlist has different levels
    resetLevelState();
  }

  function cleanup(): void {
    cancelled = true;
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    if (unsubscribeLevelSwitched) {
      try {
        unsubscribeLevelSwitched();
      } catch {
        /* already unsubscribed */
      }
      unsubscribeLevelSwitched = null;
    }
    if (unsubscribeAudioTrackSwitched) {
      try {
        unsubscribeAudioTrackSwitched();
      } catch {
        /* already unsubscribed */
      }
      unsubscribeAudioTrackSwitched = null;
    }
    if (handle) {
      try {
        handle.destroy();
      } catch {
        /* already torn down */
      }
      handle = null;
    }
    // Clear job tracking since this session's stream is done.
    jobId.value = null;
    masterUrl.value = null;
  }

  function reset(): void {
    cleanup();
    state.value = 'idle';
    progress.value = 0;
    subtitleTracks.value = [];
    resetLevelState();
    resetAudioTrackState();
  }

  return {
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
    setLevel,
    setNextLevel,
    setAudioTrack,
    jobId,
    masterUrl,
    loadVariantPlaylist,
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
