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
import { type Ref } from 'vue';
import { type AttachHlsOptions, type HlsAudioTrack, type HlsHandle, type HlsLevel } from '../components/player/hls-playback';
import { type SubtitleTrack, type Variant } from '../components/player/transcode';
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
export declare function useHlsTranscode(opts: UseHlsTranscodeOptions): HlsTranscodeController;
