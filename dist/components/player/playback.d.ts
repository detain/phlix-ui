/**
 * playback.ts (R3.8) — pure, DOM-free helpers for the player's closing moments:
 * the direct-play / "needs transcode" guard and the end-of-video up-next ring.
 *
 * Browsers can only direct-play a handful of containers (mp4/webm/…). Files in a
 * non-web container (MKV, AVI, …) or an undecodable codec (HEVC in an otherwise
 * playable container) would otherwise render as a silent black screen — these
 * helpers let the player detect that case (proactively by extension, reactively
 * by the <video> error code) and show a clear notice instead.
 */
/** Containers a browser <video> can generally play directly (no transcode). */
export declare const DIRECT_PLAY_EXTENSIONS: readonly ["mp4", "m4v", "webm", "ogg", "ogv", "mov"];
/** Containers we KNOW require server-side transcoding for browser playback. */
export declare const TRANSCODE_EXTENSIONS: readonly ["mkv", "avi", "wmv", "flv", "ts", "m2ts", "mts", "mpg", "mpeg", "vob", "divx", "3gp", "rmvb"];
/**
 * Lowercased file extension (without the dot) of a URL or path, or '' when there
 * is none. Strips a `?query` / `#hash` and looks only at the last path segment,
 * so `/media/42/stream?token=x` → '' and `/lib/Dune (2024).mkv` → 'mkv'.
 */
export declare function extensionOf(url: string | null | undefined): string;
/**
 * True when ANY of the given sources (stream URL, library path, …) is a container
 * we know the browser cannot direct-play. Unknown / extensionless sources return
 * false on purpose — we do not guess; the runtime <video> error (see
 * {@link isFatalMediaError}) is the backstop for those (e.g. HEVC inside an mp4).
 */
export declare function needsTranscode(...sources: (string | null | undefined)[]): boolean;
/**
 * True when a <video> element's current error is a fatal format/decode error
 * (MEDIA_ERR_DECODE = 3, MEDIA_ERR_SRC_NOT_SUPPORTED = 4) — i.e. the browser
 * cannot play this source, so the "needs transcode" notice should replace the
 * black frame. Network/abort errors (1, 2) are NOT treated as transcode-needed.
 */
export declare function isFatalMediaError(video: HTMLVideoElement | null | undefined): boolean;
/** Default end-of-video countdown in seconds (matches the mockup's "Starts in 8s"). */
export declare const UPNEXT_COUNTDOWN_SECONDS = 8;
/** Up-next ring radius (the locked mockup's `circle r="15"` on a 36×36 viewBox). */
export declare const UPNEXT_RING_RADIUS = 15;
/** Circumference of the up-next ring (≈ 94.25 — the mockup's `stroke-dasharray`). */
export declare const UPNEXT_RING_CIRCUMFERENCE: number;
/**
 * `stroke-dashoffset` for the depleting countdown ring: a full arc at
 * `remaining === total` (offset 0) shrinking to an empty ring at `remaining === 0`
 * (offset = circumference). `total <= 0` → empty. `remaining` is clamped to
 * `[0, total]` so an out-of-range value can't produce a negative/overlong dash.
 */
export declare function ringDashoffset(remaining: number, total: number, circumference?: number): number;
