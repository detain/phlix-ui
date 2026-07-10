/**
 * hls-playback.ts — attach an HLS (`.m3u8`) source to a <video> element.
 *
 * Browsers split two ways on HLS: Safari/iOS play it natively (set `video.src`),
 * everyone else needs Media Source Extensions driven by hls.js. {@link attachHls}
 * picks the right path and returns a handle whose `destroy()` tears the player
 * down (critical: an undestroyed hls.js instance keeps fetching segments).
 *
 * hls.js is imported dynamically so its ~100 kB only loads when a transcode is
 * actually played — direct-play sessions never pull it into the bundle.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * A single selectable quality rung, mapped from an hls.js {@link https://github.com/video-dev/hls.js Level}.
 *
 * `index` is the position in {@link HlsHandle.levels} — pass it to
 * {@link HlsHandle.setCurrentLevel}/{@link HlsHandle.setNextLevel} to pin that
 * rung. It is the same numbering hls.js uses for `currentLevel`/`nextLevel`
 * (an index of `-1` everywhere means "Auto / ABR").
 */
export interface HlsLevel {
    /** Position in the master playlist / {@link HlsHandle.levels}; the value to pin. */
    index: number;
    /** Encoded height in px (e.g. 720). */
    height: number;
    /** Encoded width in px (e.g. 1280). */
    width: number;
    /** Advertised `BANDWIDTH` in bits/sec. */
    bitrate: number;
    /** hls.js level name (usually the resolution label), if the manifest carried one. */
    name: string | undefined;
}
/**
 * A single selectable audio track, mapped from an hls.js audio track group
 * ({@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#audiotracks}.
 *
 * hls.js exposes `audioTracks` (array) and `audioTrack` (current index) once
 * the manifest is parsed. Each entry has `name`, `lang`, `url` (if external),
 * and `details` (the audio-only playlist).
 *
 * An index of `-1` means no audio track is active (or the native path where
 * hls.js audio track API is unavailable).
 */
export interface HlsAudioTrack {
    /** Position in the audio track list. */
    index: number;
    /** Display name (e.g. "English", "Spanish", "Director's Commentary"). */
    name: string;
    /** BCP 47 language tag (e.g. "en", "es-ES"), or empty string if unknown. */
    lang: string;
    /** True when this track is marked DEFAULT in the manifest. */
    default: boolean;
    /** True when this track is marked AUTOSELECT in the manifest. */
    autoselect: boolean;
}
/**
 * A live HLS attachment.
 *
 * `destroy()` stops loading and detaches (critical: an undestroyed hls.js
 * instance keeps fetching segments). The level API drives manual quality
 * selection; on the native-HLS (Safari/iOS) path the browser owns ABR, so the
 * level members degrade to an Auto-only, no-op shape rather than throwing.
 * The audio-track API drives audio language selection on the hls.js path;
 * on native HLS audio tracks come from `video.audioTracks` instead.
 */
export interface HlsHandle {
    destroy(): void;
    /**
     * The available quality rungs, highest-first as the master lists them.
     *
     * This is a **live getter**: hls.js only populates its levels once the master
     * manifest is parsed, which happens asynchronously AFTER {@link attachHls}
     * resolves — so reads before `MANIFEST_PARSED` (see {@link AttachHlsOptions.onReady})
     * return `[]`. Read it again after `onReady`, or on an
     * {@link HlsHandle.onLevelSwitched} callback, to get the populated ladder.
     * Always `[]` on the native-HLS path.
     */
    readonly levels: HlsLevel[];
    /** Current pinned level index, or `-1` when ABR ("Auto") is choosing. */
    getCurrentLevel(): number;
    /**
     * Pin a level by index, flushing the buffer for an IMMEDIATE switch. Pass `-1`
     * to re-enable Auto/ABR. No-op on the native-HLS path.
     */
    setCurrentLevel(index: number): void;
    /**
     * Queue a level switch that takes effect on the NEXT fragment (no buffer
     * flush) — smoother than {@link setCurrentLevel} but not immediate. Pass `-1`
     * for Auto. No-op on the native-HLS path.
     */
    setNextLevel(index: number): void;
    /** True while ABR ("Auto") is picking the level. Always `true` on native HLS. */
    readonly autoLevelEnabled: boolean;
    /** hls.js's rolling bandwidth estimate in bits/sec (0 on the native path). */
    readonly bandwidthEstimate: number;
    /**
     * Subscribe to hls.js `LEVEL_SWITCHED` — fires with the newly-active level
     * index after a switch settles. Returns an unsubscribe function. On the
     * native-HLS path this never fires and returns a no-op unsubscribe.
     */
    onLevelSwitched(callback: (levelIndex: number) => void): () => void;
    /**
     * The available audio tracks parsed from the manifest (P3B-S3 multi-audio).
     * Empty when the manifest has no #EXT-X-MEDIA:TYPE=AUDIO entries, and always
     * empty on the native-HLS path where audio tracks come from `video.audioTracks`.
     */
    readonly audioTracks: HlsAudioTrack[];
    /**
     * The current audio track index, or `-1` when no audio track is active
     * (native HLS path or a manifest with no audio groups).
     */
    getCurrentAudioTrack(): number;
    /**
     * Switch to a different audio track by index. The index maps into
     * {@link HlsHandle.audioTracks}. No-op on the native-HLS path.
     */
    setAudioTrack(index: number): void;
    /**
     * Subscribe to hls.js `AUDIO_TRACK_SWITCHED` — fires when the active audio
     * track changes. Returns an unsubscribe function. On the native-HLS path this
     * never fires and returns a no-op unsubscribe.
     */
    onAudioTrackSwitched(callback: (trackIndex: number) => void): () => void;
}
/** Options for {@link attachHls}. */
export interface AttachHlsOptions {
    /** Optional bearer token to attach to segment/playlist requests. */
    getToken?: () => string | null;
    /** Called on a fatal playback error (after hls.js gives up recovering). */
    onError?: (detail: string) => void;
    /** Called once media is attached and the manifest is parsed (ready to play). */
    onReady?: () => void;
    /** Optional per-app hls.js config overrides (e.g. a constrained TV tuning
     *  `maxBufferLength` / `backBufferLength` down to cap RAM). Shallow-merged
     *  OVER phlix-ui's defaults (`enableWorker` / `lowLatencyMode`), so a consumer
     *  key wins — EXCEPT `xhrSetup`, which is always re-applied last so a consumer
     *  can never accidentally drop the bearer-token auth header (see {@link attachHls}). */
    hlsConfig?: Partial<import('hls.js').HlsConfig>;
}
/** True when the browser can play HLS natively (Safari / iOS). */
export declare function isNativeHlsSupported(video: HTMLVideoElement): boolean;
/**
 * Attaches an HLS playlist URL to a <video> element.
 *
 * Prefers hls.js (MSE) when supported; otherwise falls back to native HLS.
 * Throws if neither path is available so the caller can surface the
 * "can't play" notice.
 *
 * @param video The target media element.
 * @param url   Absolute master playlist URL.
 * @param opts  Token / error / ready hooks.
 *
 * @returns A handle whose `destroy()` detaches and stops loading.
 */
export declare function attachHls(video: HTMLVideoElement, url: string, opts?: AttachHlsOptions): Promise<HlsHandle>;
