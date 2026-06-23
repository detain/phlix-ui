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
export const DIRECT_PLAY_EXTENSIONS = ['mp4', 'm4v', 'webm', 'ogg', 'ogv', 'mov'] as const;

/** Containers we KNOW require server-side transcoding for browser playback. */
export const TRANSCODE_EXTENSIONS = [
  'mkv',
  'avi',
  'wmv',
  'flv',
  'ts',
  'm2ts',
  'mts',
  'mpg',
  'mpeg',
  'vob',
  'divx',
  '3gp',
  'rmvb',
] as const;

const TRANSCODE_SET: ReadonlySet<string> = new Set(TRANSCODE_EXTENSIONS);

/**
 * Lowercased file extension (without the dot) of a URL or path, or '' when there
 * is none. Strips a `?query` / `#hash` and looks only at the last path segment,
 * so `/media/42/stream?token=x` → '' and `/lib/Dune (2024).mkv` → 'mkv'.
 */
export function extensionOf(url: string | null | undefined): string {
  if (!url) return '';
  const path = url.split(/[?#]/)[0]; // drop any ?query / #hash
  const segment = path.slice(path.lastIndexOf('/') + 1); // last path segment
  const dot = segment.lastIndexOf('.');
  // no dot, a leading-dot "hidden file", or a trailing dot → no real extension
  if (dot <= 0 || dot === segment.length - 1) return '';
  return segment.slice(dot + 1).toLowerCase();
}

/**
 * True when ANY of the given sources (stream URL, library path, …) is a container
 * we know the browser cannot direct-play. Unknown / extensionless sources return
 * false on purpose — we do not guess; the runtime <video> error (see
 * {@link isFatalMediaError}) is the backstop for those (e.g. HEVC inside an mp4).
 */
export function needsTranscode(...sources: (string | null | undefined)[]): boolean {
  return sources.some((s) => TRANSCODE_SET.has(extensionOf(s)));
}

/**
 * True when a <video> element's current error is a fatal format/decode error
 * (MEDIA_ERR_DECODE = 3, MEDIA_ERR_SRC_NOT_SUPPORTED = 4) — i.e. the browser
 * cannot play this source, so the "needs transcode" notice should replace the
 * black frame. Network/abort errors (1, 2) are NOT treated as transcode-needed.
 */
export function isFatalMediaError(video: HTMLVideoElement | null | undefined): boolean {
  const code = video?.error?.code;
  return code === 3 || code === 4;
}

/**
 * True when a <video> element's current error is a network error
 * (MEDIA_ERR_NETWORK = 2) — the source host could not be reached. On the hub a
 * direct-play stream points at the paired server's own public origin; when that
 * origin is unreachable from the browser the element errors with this code before
 * any frame plays, and the player falls back to an HLS transcode over the relay
 * proxy. The caller gates this on no playback progress yet so a transient mid-play
 * network blip does not wrongly tear a healthy session down.
 */
export function isNetworkMediaError(video: HTMLVideoElement | null | undefined): boolean {
  return video?.error?.code === 2;
}

/**
 * An intro / outro time range (seconds), from `GET /api/v1/media/:id/playback-info`.
 * `start`/`end` are absolute positions in the title; the player shows a "Skip"
 * affordance while the playhead sits inside `[start, end)` and seeks to `end` on use.
 */
export interface TimeMarker {
  start: number;
  end: number;
}

/** Default end-of-video countdown in seconds (matches the mockup's "Starts in 8s"). */
export const UPNEXT_COUNTDOWN_SECONDS = 8;
/** Up-next ring radius (the locked mockup's `circle r="15"` on a 36×36 viewBox). */
export const UPNEXT_RING_RADIUS = 15;
/** Circumference of the up-next ring (≈ 94.25 — the mockup's `stroke-dasharray`). */
export const UPNEXT_RING_CIRCUMFERENCE = 2 * Math.PI * UPNEXT_RING_RADIUS;

/**
 * `stroke-dashoffset` for the depleting countdown ring: a full arc at
 * `remaining === total` (offset 0) shrinking to an empty ring at `remaining === 0`
 * (offset = circumference). `total <= 0` → empty. `remaining` is clamped to
 * `[0, total]` so an out-of-range value can't produce a negative/overlong dash.
 */
export function ringDashoffset(
  remaining: number,
  total: number,
  circumference: number = UPNEXT_RING_CIRCUMFERENCE,
): number {
  if (!(total > 0)) return circumference;
  const fraction = Math.max(0, Math.min(1, remaining / total));
  return circumference * (1 - fraction);
}
