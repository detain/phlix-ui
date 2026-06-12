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
 */
import { type Ref } from 'vue';
import { type AttachHlsOptions, type HlsHandle } from '../components/player/hls-playback';
import { type SubtitleTrack } from '../components/player/transcode';
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
    start(video: HTMLVideoElement, mediaId: string, profile?: string): Promise<void>;
    cleanup(): void;
    reset(): void;
}
export declare function useHlsTranscode(opts: UseHlsTranscodeOptions): HlsTranscodeController;
