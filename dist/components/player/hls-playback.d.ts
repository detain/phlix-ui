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
 */
/** A live HLS attachment; call `destroy()` to stop loading and detach. */
export interface HlsHandle {
    destroy(): void;
}
/** Options for {@link attachHls}. */
export interface AttachHlsOptions {
    /** Optional bearer token to attach to segment/playlist requests. */
    getToken?: () => string | null;
    /** Called on a fatal playback error (after hls.js gives up recovering). */
    onError?: (detail: string) => void;
    /** Called once media is attached and the manifest is parsed (ready to play). */
    onReady?: () => void;
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
