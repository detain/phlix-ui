/**
 * playback.ts (R3.8) — pure, DOM-free helpers for the player's closing moments:
 * the direct-play / "needs transcode" guard and the end-of-video up-next ring.
 *
 * Browsers can only direct-play a handful of containers (mp4/webm/…). Files in a
 * non-web container (MKV, AVI, …) or an undecodable codec (HEVC in an otherwise
 * playable container) would otherwise render as a silent black screen — these
 * helpers let the player detect that case (proactively by extension, reactively
 * by the <video> error code) and show a clear notice instead.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
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
 * An audio stream advertised by `GET /api/v1/media/:id/playback-info`
 * (`audio_tracks[]`). On direct play (non-Safari) the browser exposes NO
 * `video.audioTracks`, so this server-side list is what lets the player show an
 * audio menu at all; switching to a non-default entry falls the session over to
 * the HLS transcode path, where `index` (0-based among the source's AUDIO streams)
 * aligns with the hls.js `audioTracks` order of the transcode master playlist.
 */
export interface PlaybackAudioTrack {
  /** 0-based position among the source's audio streams (== hls.js audioTracks order). */
  index: number;
  /** Absolute ffmpeg stream index in the container. */
  streamIndex: number;
  /** BCP-47 / ISO language code, or '' when the source carries none. */
  language: string;
  /** Human label (stream title → language → "Audio N"). */
  label: string;
  /** True for the source's default audio stream. */
  default: boolean;
  /** Audio codec identifier from the server (e.g. 'aac', 'ac3', 'ec-3', 'dts').
   *  Empty string when the server doesn't send codec info (older servers). */
  codec?: string;
}

/**
 * Normalizes the server's `audio_tracks` array (snake- or camelCase) into
 * {@link PlaybackAudioTrack}s. Tolerates a missing/non-array value (→ []) and
 * junk entries (skipped). Mirrors `transcode.ts`' parser conventions.
 */
export function parsePlaybackAudioTracks(value: unknown): PlaybackAudioTrack[] {
  if (!Array.isArray(value)) return [];
  const out: PlaybackAudioTrack[] = [];
  for (const entry of value) {
    if (entry == null || typeof entry !== 'object') continue;
    const o = entry as Record<string, unknown>;
    const index = typeof o.index === 'number' && Number.isInteger(o.index) && o.index >= 0 ? o.index : out.length;
    const language = typeof o.language === 'string' ? o.language : '';
    const title = typeof o.title === 'string' ? o.title : '';
    const streamIndexRaw = o.stream_index ?? o.streamIndex;
    const codec = typeof o.codec === 'string' ? o.codec : '';
    out.push({
      index,
      streamIndex: typeof streamIndexRaw === 'number' ? streamIndexRaw : index,
      language,
      label: title || language || `Audio ${index + 1}`,
      default: o.default === true,
      codec,
    });
  }
  return out;
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

// ---- MediaCapabilities / codec probing (U-1.3) ------------------------------

/** Maps server-side audio codec names to their RFC 6381 codec string parameter.
 *  Unrecognised codecs return null (caller should treat as "unsupported"). */
const AUDIO_CODEC_MAP: ReadonlyMap<string, string> = new Map([
  ['aac', 'mp4a.40.2'],
  ['aac-latm', 'mp4a.40.2'],
  ['ac3', 'ac-3'],
  ['eac3', 'ec-3'],
  ['ec3', 'ec-3'],
  ['dts', 'dtsc'],
  ['dtshd', 'dtshd'],
  ['mp3', 'mp4a.40.34'],
  ['opus', 'opus'],
  ['vorbis', 'vorbis'],
  ['flac', 'flac'],
  ['truehd', 'mlp'],
]);

/** Known HEVC profile/level strings to probe for HEVC-in-MP4 support.
 *  These are broad enough to detect HEVC-capable browsers without needing
 *  the exact server-sent profile/level. Probing fails gracefully in browsers
 *  that don't support HEVC at all. */
const HEVC_CODEC_STRINGS = [
  'video/mp4; codecs="hvc1.1.4.L120.90"',   // HEVC Main 4.1 L120 (common)
  'video/mp4; codecs="hev1.1.4.L120.90"',   // HEVC alternate hvc1/hev1 branding
  'video/mp4; codecs="hvc1.1.6.L93.B0"',   // HEVC Main 4.1 L93
  'video/mp4; codecs="hvc1.1.4.L120"',     // without tier
] as const;

/**
 * Builds a `video/mp4; codecs="..."` string for the given audio codec, or null
 * if the codec is not recognised. Suitable for both `decodingInfo()` and the
 * `video.canPlayType()` fallback.
 */
export function buildAudioCodecString(
  audioCodec: string,
  containerMime = 'video/mp4',
): string | null {
  const codecParam = AUDIO_CODEC_MAP.get(audioCodec.toLowerCase());
  if (!codecParam) return null;
  return `${containerMime}; codecs="${codecParam}"`;
}

/**
 * Checks whether the browser can decode a specific audio codec when wrapped in
 * the given container, using `navigator.mediaCapabilities.decodingInfo()` where
 * available and falling back to `HTMLVideoElement.prototype.canPlayType()`.
 *
 * Returns `true` for supported, `false` for unsupported, and `false` for any
 * error (we do not throw on capability-probing failures — safe fallback is
 * transcode).
 */
export async function canDecodeAudioCodec(
  audioCodec: string,
  containerMime = 'video/mp4',
): Promise<boolean> {
  if (!audioCodec) return true; // empty codec = no restriction

  const fullMime = buildAudioCodecString(audioCodec, containerMime);
  if (!fullMime) return false; // unknown codec = transcode

  // Try MediaCapabilities API first (most accurate).
  if (
    typeof navigator !== 'undefined' &&
    typeof (navigator as Navigator & { mediaCapabilities?: MediaCapabilities }).mediaCapabilities?.decodingInfo ===
      'function'
  ) {
    try {
      const mc = (navigator as Navigator & { mediaCapabilities: MediaCapabilities }).mediaCapabilities;
      const result = await mc.decodingInfo({
        type: 'media-source',
        video: { contentType: containerMime, width: 1920, height: 1080, bitrate: 10_000_000, framerate: 30 },
        audio: { contentType: fullMime, channels: 6, bitrate: 384_000, samplerate: 48_000 },
      } as unknown as MediaDecodingConfiguration);
      return result.supported;
    } catch {
      // decodingInfo threw — fall through to canPlayType
    }
  }

  // Fallback: canPlayType on a detached video element.
  if (typeof document !== 'undefined') {
    const v = document.createElement('video');
    const result = v.canPlayType(fullMime);
    return result === 'probably' || result === 'maybe';
  }

  return false;
}

/**
 * Probes HEVC-in-MP4 support by attempting to decode a known HEVC codec string.
 * Returns `true` if HEVC appears to be decodable, `false` otherwise.
 * Uses the same MediaCapabilities → canPlayType fallback chain.
 */
export async function canDecodeHevcInMp4(): Promise<boolean> {
  if (typeof navigator === 'undefined') return false;

  const mc = (navigator as Navigator & { mediaCapabilities?: MediaCapabilities }).mediaCapabilities;

  if (mc && typeof mc.decodingInfo === 'function') {
    // Probe with the base video/mp4 MIME type — the browser resolves codec support
    // from its own internal tables; passing the full RFC 6381 string (hvc1…/hev1…)
    // is invalid for VideoConfiguration.contentType and always throws.
    try {
      const result = await mc.decodingInfo({
        type: 'media-source',
        video: { contentType: 'video/mp4', width: 3840, height: 2160, bitrate: 50_000_000, framerate: 60 },
      } as MediaDecodingConfiguration);
      if (result.supported) return true;
    } catch {
      // decodingInfo failed — fall through to canPlayType
    }
  }

  // Fallback canPlayType
  if (typeof document !== 'undefined') {
    const v = document.createElement('video');
    for (const codecString of HEVC_CODEC_STRINGS) {
      const result = v.canPlayType(codecString);
      if (result === 'probably' || result === 'maybe') return true;
    }
  }

  return false;
}

/**
 * Combines the extension-based `needsTranscode` check with a runtime
 * MediaCapabilities probe of the audio codecs listed in `playback-info`.
 *
 * Returns `true` (transcode recommended) if:
 *   - the extension is a known non-web container, OR
 *   - the browser cannot decode the primary audio codec (E-AC-3 / AC-3 / DTS, …), OR
 *   - the source is an mp4 but HEVC is unsupported (black-flash guard).
 *
 * When `playbackAudioTracks` is empty the probe is skipped (no server data yet —
 * the caller should watch for late audio-track arrival and re-evaluate).
 *
 * @param sources              - URL / path strings to check by extension.
 * @param playbackAudioTracks - Parsed audio tracks from playback-info `audio_tracks`.
 */
export async function needsTranscodeWithCapabilities(
  sources: (string | null | undefined)[],
  playbackAudioTracks: PlaybackAudioTrack[],
): Promise<boolean> {
  // Extension check first — the cheap synchronous gate.
  if (needsTranscode(...sources)) return true;

  const ext = sources.map((s) => extensionOf(s)).find((e) => (DIRECT_PLAY_EXTENSIONS as readonly string[]).includes(e)) ?? '';
  const containerMime = ext ? (`video/${ext}` as const) : 'video/mp4';

  // If the file extension is a known direct-play container, probe the audio codecs.
  if ((DIRECT_PLAY_EXTENSIONS as readonly string[]).includes(ext) && playbackAudioTracks.length > 0) {
    // Check the primary (default) audio track's codec.
    const primaryTrack = playbackAudioTracks.find((t) => t.default) ?? playbackAudioTracks[0];
    if (primaryTrack?.codec) {
      const canAudio = await canDecodeAudioCodec(primaryTrack.codec, containerMime);
      if (!canAudio) return true;
    }

    // HEVC-in-MP4 black-flash guard.
    if (ext === 'mp4' || ext === 'm4v') {
      const canHevc = await canDecodeHevcInMp4();
      if (!canHevc) return true;
    }
  }

  return false;
}
