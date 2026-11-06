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
    /** Injectable availability probe for a rung's mini-master index, used by
     *  {@link HlsTranscodeController.loadVariantPlaylist} (L1 forward-compat: a
     *  server predating the index, or a rung dir whose self-heal regeneration
     *  raced). `'absent'` (an explicit HTTP 404) is the ONLY outcome that falls
     *  back to the legacy bare rung playlist; `'available'` and `'unknown'`
     *  (5xx / network throw) load the mini-master unchanged so a transient
     *  failure can never silently degrade a working stream. Defaults to a HEAD
     *  request carrying the same bearer header hls.js uses. Overridden in tests. */
    probeRungPlaylist?: (url: string) => Promise<RungPlaylistProbe>;
}
/** Outcome of a rung-playlist availability probe — see
 *  {@link UseHlsTranscodeOptions.probeRungPlaylist}. */
export type RungPlaylistProbe = 'available' | 'absent' | 'unknown';
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
    /** The available audio tracks from the attached stream (P3B-S3 multi-audio).
     *  Mirrors {@link HlsHandle.audioTracks} live: re-read on manifest parse
     *  (including every rung reload), on each LEVEL_LOADED tick, and on settled
     *  track switches — so a playlist reload that empties or refills the group
     *  (hls.js fires only AUDIO_TRACKS_UPDATED there) can never leave stale
     *  renditions in the menu. Empty when the manifest has no
     *  #EXT-X-MEDIA:TYPE=AUDIO groups or on the native-HLS (Safari) path where
     *  audio tracks come from video.audioTracks. */
    audioTracks: Ref<HlsAudioTrack[]>;
    /** The currently selected audio track index, or `-1` when no audio track
     *  is active (e.g. native HLS path or a manifest with no audio groups). */
    currentAudioTrack: Ref<number>;
    /** True when the attached stream carries audio at all — a selectable
     *  rendition group OR audio muxed into the video segments (the rung's
     *  manifest `CODECS` declares an audio elementary stream). The
     *  player renders its single synthesized 'Original' audio track entry from
     *  this when {@link audioTracks} is empty but audio plays; a source with
     *  no audio (or the native-HLS path, where presence is unknowable here)
     *  keeps the menu hidden. Re-evaluated on manifest parse, LEVEL_LOADED
     *  (the codec reconciliation for a newly loaded level lands there), settled
     *  switches, and rung reloads. */
    hasAudio: Ref<boolean>;
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
    /** Load a specific variant playlist directly (e.g. the rung's
     *  `media_voriginal_master.m3u8`) instead of using ABR level switching. This
     *  is used for the "Original" quality option when the original variant is
     *  not in the ABR ladder. The URL comes from the server's advertised
     *  `playlist_url` when the ladder carries one (URL-contract law — consume it
     *  VERBATIM); only a rung the ladder never advertises falls back to a
     *  PATH-scoped derivation from the master URL.
     *  The chosen index is probed first; only an explicit 404 falls
     *  back to the legacy bare rung playlist (L1 forward-compat — see
     *  {@link UseHlsTranscodeOptions.probeRungPlaylist}).
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
export declare function useHlsTranscode(opts: UseHlsTranscodeOptions): HlsTranscodeController;
/**
 * Default rung-mini-master probe: one HEAD request carrying the SAME bearer
 * header hls.js attaches to the playlist itself. Only an explicit HTTP 404 is
 * decisive ('absent'); 2xx is 'available'; any other status or a network throw
 * is 'unknown' — which never triggers the fallback (see the law documented on
 * {@link UseHlsTranscodeOptions.probeRungPlaylist}). Exported so the shipped
 * fetch shape (HEAD / bearer / status mapping) is pinned directly, not only
 * through the injected test seam.
 */
export declare function defaultProbeRungPlaylist(url: string, getToken: () => string | null): Promise<RungPlaylistProbe>;
