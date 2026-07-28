/**
 * playback.ts (R3.8) — pure, DOM-free helpers for the player's closing moments:
 * the direct-play / "needs transcode" guard and the end-of-video up-next ring.
 *
 * Browsers can only direct-play a handful of containers (mp4/webm/…). Files in a
 * non-web container (MKV, AVI, …) or an undecodable codec (HEVC in an otherwise
 * playable container) would otherwise render as a silent black screen — these
 * helpers let the player detect that case and transcode instead.
 *
 * Detection is PROACTIVE: by extension ({@link needsTranscode}) and by codec
 * ({@link needsTranscodeWithCapabilities}). The reactive `<video>`-error path
 * ({@link isFatalMediaError}) is a partial extra, NOT a backstop — measured, a
 * source whose video is undecodable but whose audio is fine fires no error event
 * at all, so nothing reactive ever sees it.
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
 * false on purpose — we do not guess.
 *
 * This is the cheap synchronous gate only. Codec-level cases (HEVC inside an mp4,
 * E-AC-3 audio, …) are decided by {@link needsTranscodeWithCapabilities}, NOT by
 * the runtime `<video>` error: measured, an undecodable video stream alongside a
 * decodable audio stream fires no error at all.
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

// ---- video codec allowlist --------------------------------------------------
//
// ⚠ There is NO runtime safety net for a video codec the browser cannot decode.
// Measured (Chrome 150 / Linux, real files over HTTP): an mp4 whose VIDEO stream
// is undecodable but whose AUDIO stream is fine fires NO `error` event at all —
// `video.error` stays `null`, `readyState` reaches 4, `canplay`/`playing` fire and
// the audio plays, while `videoWidth` is 0 and `decodedFrames` never leaves 0. So
// {@link isFatalMediaError} / `onVideoError` never sees anything and the viewer
// gets a PERMANENT BLACK SCREEN WITH AUDIO and no recovery path:
//
//   H.264 + AAC mp4        → no error, readyState 4, videoWidth 320, 101 frames  ✅
//   HEVC (hvc1) + AAC mp4  → NO error, readyState 4, videoWidth 0, 0 frames, audio plays
//   HEVC, no audio track   → error code 4 DEMUXER_ERROR_NO_SUPPORTED_STREAMS
//   MPEG-4 Part 2 + AAC    → NO error, readyState 4, videoWidth 0, 0 frames, audio plays
//
// Only the video-only row produces an error. That is why the guard below is an
// ALLOWLIST of codecs known to decode rather than a denylist of known-bad ones:
// anything we have not positively cleared must be transcoded up front, because
// nothing downstream will catch it.

/**
 * Canonical codec family for every video-codec spelling that can reach us.
 *
 * The server stores ffprobe's `codec_name` verbatim in `media_streams.codec`, so
 * the spellings that actually occur are ffprobe's. Measured on prod (video stream
 * rows, whole library): `h264` 25 462 · `hevc` 11 253 · `mpeg4` 949 ·
 * `msmpeg4v3` 195 · `av1` 41 · NULL 18 · `msmpeg4v2` 3 · `msmpeg4v1` 2 ·
 * `mpeg1video` 1 · `mjpeg` 1 — HEVC is only ever spelled `hevc`. The `hvc1`/`hev1`
 * sample-entry brandings, `h265`, `avc1` and the `vp09`/`av01` RFC 6381 prefixes
 * are accepted too because other producers' metadata uses them and a codec we fail
 * to recognise is treated as undecodable (see {@link videoCodecPolicy}).
 * Compared case-insensitively.
 */
const VIDEO_CODEC_FAMILY: ReadonlyMap<string, string> = new Map([
  ['h264', 'h264'], ['avc', 'h264'], ['avc1', 'h264'], ['x264', 'h264'],
  ['hevc', 'hevc'], ['h265', 'hevc'], ['hvc1', 'hevc'], ['hev1', 'hevc'], ['x265', 'hevc'],
  ['av1', 'av1'], ['av01', 'av1'],
  ['vp9', 'vp9'], ['vp09', 'vp9'],
  ['vp8', 'vp8'], ['vp08', 'vp8'],
  ['theora', 'theora'],
]);

/**
 * Codec families decodable by every browser that can run this SPA, so no runtime
 * probe is worth its latency. H.264 only: it is the one video codec in the HTML5
 * baseline that every shipping browser decodes, and it is 25 462 of prod's ~37 900
 * video streams. Everything else in {@link VIDEO_CODEC_FAMILY} gets probed.
 */
const DIRECT_PLAY_VIDEO_FAMILIES: ReadonlySet<string> = new Set(['h264']);

/**
 * RFC 6381 codec parameters probed per family, most representative first. The
 * first entry is the one `decodingInfo()` is asked about (kept to ONE call so the
 * guard costs a single await); the whole ladder is then tried through
 * `canPlayType`. Combined with the source's real container MIME by
 * {@link canDecodeVideoCodec}, so the same family answers differently per
 * container — measured: `video/mp4; codecs="vp09.00.10.08"` → `'probably'` in
 * Chrome, `video/quicktime; codecs="avc1.640028"` → `''`.
 *
 * A `VideoConfiguration.contentType` MUST carry a codecs parameter naming exactly
 * one codec: a bare `video/mp4` is not a decodable configuration, so probing with
 * one reports `supported: false` on every browser (measured) and tells us nothing.
 */
const VIDEO_CODEC_PROBE_PARAMS: ReadonlyMap<string, readonly string[]> = new Map([
  // HEVC Main L93 / Main 4.1 L120, both hvc1 and hev1 brandings, with and without tier.
  ['hevc', ['hvc1.1.6.L93.B0', 'hvc1.1.4.L120.90', 'hev1.1.4.L120.90', 'hvc1.1.4.L120']],
  ['av1', ['av01.0.08M.08', 'av01.0.05M.08']],
  ['vp9', ['vp09.00.10.08', 'vp9']],
  ['vp8', ['vp8']],
  // Chrome dropped Theora in 123 — measured: canPlayType('video/ogg; codecs="theora"') → ''.
  ['theora', ['theora']],
]);

/**
 * What the direct-play guard should do about a given video codec.
 *
 * - `direct`   — play the file as-is, no probe.
 * - `probe`    — ask the browser (MediaCapabilities / `canPlayType`) and transcode
 *                only when it says no.
 * - `transcode` — do not attempt direct play.
 */
export type VideoCodecPolicy = 'direct' | 'probe' | 'transcode';

/**
 * Classifies a server-reported video codec for the direct-play guard.
 *
 *   `''` / null / undefined  → `direct`  (UNKNOWN — see the caveat below)
 *   `h264` and its aliases   → `direct`
 *   `hevc` / `av1` / `vp9` / `vp8` / `theora` → `probe`
 *   anything else non-empty  → `transcode`
 *
 * The last rule is the important one: an mp4 carrying MPEG-4 Part 2, MS-MPEG4,
 * MPEG-1 or MJPEG decodes NOTHING and reports NO error (see the block comment
 * above), so a codec we cannot positively clear must never reach direct play.
 * Prod's entire distinct set is covered: every spelling not in
 * {@link VIDEO_CODEC_FAMILY} (`mpeg4`, `msmpeg4v1/2/3`, `mpeg1video`, `mjpeg`) is
 * genuinely browser-undecodable.
 *
 * ⚠ UNKNOWN → `direct` is a deliberate, imperfect choice, not a safe one. It
 * preserves direct play for an item whose `streams[]` arrived empty, at the cost of
 * a black-screen-with-audio if that item really is HEVC. Do NOT re-describe this as
 * "the `<video>`-error backstop will catch it": measured, it does not (see the
 * block comment above {@link VIDEO_CODEC_FAMILY}).
 *
 * WHERE THE UNKNOWN ACTUALLY COMES FROM — a concurrency window, not missing codecs:
 * `GET /api/v1/media/{id}/playback-info` runs `StreamProbeBackfill::ensureFor()`,
 * which REPLACES the item's rows — `deleteStreamsByItem($itemId)` followed by a
 * row-at-a-time `addStream()` loop — while `PlayerPage.load()` dispatches
 * playback-info and the detail request CONCURRENTLY. A detail read that lands inside
 * that delete-then-reinsert window returns `streams: []`, or a partial set whose
 * video row is not back yet, and this function is then asked about `''`. Live for the
 * 79 218 of 116 325 prod items whose `streams_probed_at IS NULL`, once each on first
 * playback. Closing it belongs on the server (backfill idempotently / before the read
 * on the same request); a SECOND delete+insert on the detail path would widen it.
 *
 * ⚠ It is NOT "18 prod items have a NULL codec" — that claim has now been made and
 * withdrawn twice, so do not restate it a third time. Counted directly against prod
 * (2026-07-28): the 18 NULL-codec video rows sit on 14 items, at `stream_index` 2/3
 * with nonsense dimensions (1920×0, or 4×3841 / 4×5634) — non-video payload mis-typed
 * as `video`. Every one of those 14 items ALSO carries a codec-bearing video row at
 * `stream_index 0`: `hevc` 10, `h264` 3, `mpeg4` 1. `ItemRepository::getItemStreams()`
 * is `ORDER BY stream_index` and {@link videoCodecFromStreams} skips a codec-less row
 * and keeps looking, so all 14 resolve to a REAL codec. mp4/m4v items with NO
 * codec-bearing video row: 0 (of 16 731). So no prod item reaches this function with
 * `''` from stored data — the exposure is the race above, and only that.
 */
export function videoCodecPolicy(codec: string | null | undefined): VideoCodecPolicy {
  const name = typeof codec === 'string' ? codec.trim().toLowerCase() : '';
  if (name === '') return 'direct'; // unknown — no codec reported at all
  const family = VIDEO_CODEC_FAMILY.get(name);
  if (family === undefined) return 'transcode'; // reported, but not on the allowlist
  return DIRECT_PLAY_VIDEO_FAMILIES.has(family) ? 'direct' : 'probe';
}

/**
 * Pulls the source's VIDEO codec out of the `streams[]` array on the media
 * DETAIL response (`GET /api/v1/media/{id}`) — the only endpoint that carries
 * video stream info (`playback-info` emits audio/subtitle tracks only).
 *
 * Entries are the raw `media_streams` rows, so `stream_type` is one of the
 * lowercase ENUM values `video` / `audio` / `subtitle` and `codec` is ffprobe's
 * `codec_name` (`h264`, `hevc`, `av1`, …). Numeric columns arrive JSON-encoded as
 * strings, hence nothing here relies on a numeric type. Returns `''` when the
 * value is absent / not an array / has no video row with a codec — i.e. UNKNOWN,
 * never a guess. Lenient like {@link parsePlaybackAudioTracks}: junk entries are
 * skipped and a camelCase `streamType` is tolerated.
 */
export function videoCodecFromStreams(value: unknown): string {
  if (!Array.isArray(value)) return '';
  for (const entry of value) {
    if (entry == null || typeof entry !== 'object') continue;
    const o = entry as Record<string, unknown>;
    const rawType = o.stream_type ?? o.streamType;
    if (typeof rawType !== 'string' || rawType.trim().toLowerCase() !== 'video') continue;
    const codec = typeof o.codec === 'string' ? o.codec.trim() : '';
    if (codec !== '') return codec;
  }
  return '';
}

/**
 * REAL container MIME type for each direct-play extension.
 *
 * ⚠ Never build this by concatenation (`video/${ext}`). `video/m4v`, `video/mov`
 * and `video/ogv` are not MIME types any browser knows, and a `canPlayType` /
 * `decodingInfo` probe against a MIME the browser does not recognise answers `''`
 * / `supported: false` for EVERY codec — which the guard reads as "undecodable"
 * and force-transcodes. Measured (Chrome 150 / Linux):
 *
 *   `video/m4v; codecs="mp4a.40.2"`       → `''`          ← the bug
 *   `video/mp4; codecs="mp4a.40.2"`       → `'probably'`
 *   `video/ogv; codecs="vorbis"`          → `''`          ← the bug
 *   `video/ogg; codecs="vorbis"`          → `'probably'`
 *   `video/quicktime; codecs="mp4a.40.2"` → `''`   (Chrome advertises no QuickTime
 *                                                   support; Safari answers yes)
 *
 * `.mov` maps to its true type `video/quicktime` rather than being laundered
 * through `video/mp4`: Chrome then still declines it (so `.mov` does not newly
 * start direct-playing there) while Safari, which really does play QuickTime,
 * accepts it.
 *
 * ⚠ But that is the CONSERVATIVE choice, not one the server corroborates. Our own
 * server labels `.mov` bytes `video/mp4` on the wire — `HttpHandler::streamMimeFor()`
 * in phlix-server maps `'mov' => 'video/mp4'` in its extension→MIME table
 * — so `video/quicktime` is a MIME this player never actually receives, and probing it
 * asks a question about a labelling that does not happen. A `.mov` whose bytes Chrome
 * gets as `video/mp4` (same ISO-BMFF demuxer) would very likely play, yet we transcode
 * it. No regression: prod has 0 `.mov` items, and `.mov` transcoded before this change
 * too (via the bogus `video/mov`); Safari is strictly improved. If `.mov` ever matters,
 * align the two ends deliberately — do not assume the server agrees with this map.
 */
const CONTAINER_MIME_BY_EXTENSION: ReadonlyMap<string, string> = new Map([
  ['mp4', 'video/mp4'],
  ['m4v', 'video/mp4'],
  ['mov', 'video/quicktime'],
  ['webm', 'video/webm'],
  ['ogg', 'video/ogg'],
  ['ogv', 'video/ogg'],
]);

/**
 * Container MIME type for a file extension (see {@link CONTAINER_MIME_BY_EXTENSION}).
 * Falls back to `video/mp4` for an unknown/absent extension — the guard only
 * reaches here for {@link DIRECT_PLAY_EXTENSIONS}, all of which are mapped.
 */
export function containerMimeForExtension(ext: string | null | undefined): string {
  const key = typeof ext === 'string' ? ext.trim().toLowerCase() : '';
  return CONTAINER_MIME_BY_EXTENSION.get(key) ?? 'video/mp4';
}

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
 *
 * ⚠ In practice the `canPlayType` fallback is what answers, and that is FINE —
 * do not "tidy" it away. Measured (Chrome 150 / Linux): an `AudioConfiguration`
 * whose `contentType` is a `video/*` MIME — which is exactly what
 * {@link buildAudioCodecString} produces here — makes `decodingInfo()` throw
 * `TypeError: The audio configuration dictionary is not valid.`, so the catch
 * below fires and `canPlayType('video/mp4; codecs="…"')` decides. That still
 * yields the RIGHT verdict (`'probably'` for AAC, `''` for E-AC-3 / AC-3 / DTS),
 * so the E-AC-3-forces-a-transcode behaviour is real and load-bearing.
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
 * Probes whether the browser can decode `videoCodec` inside `containerMime`,
 * using `navigator.mediaCapabilities.decodingInfo()` where available and falling
 * back to `HTMLVideoElement.prototype.canPlayType()`.
 *
 * Only the `probe`-policy families of {@link videoCodecPolicy} have probe strings;
 * anything else (including an unknown codec) returns `false`, so callers must
 * consult the policy first rather than reading a `false` here as "undecodable".
 * Any probing failure is `false` — the safe fallback is to transcode.
 *
 * Probes with a REAL RFC 6381 codec string. An earlier version passed a bare
 * `video/mp4`, on the (wrong) assumption that a full `hvc1…`/`hev1…` string is
 * invalid for `VideoConfiguration.contentType` and always throws. It does not
 * throw — but a codec-less contentType is not a decodable configuration, so
 * Chromium answered `supported: false` for EVERY mp4, which made this report
 * "no HEVC" on browsers that in fact decode it and (worse) made the caller force
 * a transcode for every mp4.
 */
export async function canDecodeVideoCodec(
  videoCodec: string | null | undefined,
  containerMime = 'video/mp4',
): Promise<boolean> {
  const name = typeof videoCodec === 'string' ? videoCodec.trim().toLowerCase() : '';
  const family = VIDEO_CODEC_FAMILY.get(name);
  const params = family !== undefined ? VIDEO_CODEC_PROBE_PARAMS.get(family) : undefined;
  if (!params || params.length === 0) return false;

  if (typeof navigator === 'undefined') return false;

  const mc = (navigator as Navigator & { mediaCapabilities?: MediaCapabilities }).mediaCapabilities;

  if (mc && typeof mc.decodingInfo === 'function') {
    try {
      const result = await mc.decodingInfo({
        type: 'media-source',
        video: {
          contentType: `${containerMime}; codecs="${params[0]}"`,
          width: 3840,
          height: 2160,
          bitrate: 50_000_000,
          framerate: 60,
        },
      } as MediaDecodingConfiguration);
      if (result.supported) return true;
    } catch {
      // decodingInfo failed — fall through to canPlayType
    }
  }

  // Fallback canPlayType — try the whole ladder of profile/level spellings.
  if (typeof document !== 'undefined') {
    const v = document.createElement('video');
    for (const param of params) {
      const result = v.canPlayType(`${containerMime}; codecs="${param}"`);
      if (result === 'probably' || result === 'maybe') return true;
    }
  }

  return false;
}

/**
 * Combines the extension-based `needsTranscode` check with runtime capability
 * probes of the source's VIDEO codec (media detail `streams[]`) and its primary
 * AUDIO codec (playback-info `audio_tracks`).
 *
 * Returns `true` (transcode recommended) if:
 *   - the extension is a known non-web container, OR
 *   - the video codec is not on the decodable allowlist, or is on it only
 *     conditionally and the browser says it cannot decode it, OR
 *   - the browser cannot decode the primary audio codec (E-AC-3 / AC-3 / DTS, …).
 *
 * The two probes are INDEPENDENT. The video decision uses only `videoCodec`, so it
 * runs on mount from the detail response without waiting for playback-info; the
 * audio probe is skipped while `playbackAudioTracks` is empty (no server data yet
 * — the caller re-evaluates when tracks arrive). Neither is a black-flash guard
 * any more: an undecodable video stream produces no error event at all, so this is
 * the ONLY thing standing between the viewer and a permanent black screen.
 *
 * ⚠ This used to fire the HEVC probe for EVERY mp4 with no check that the file
 * contained HEVC at all, which killed direct play for plain H.264 mp4s on every
 * browser without HEVC support (Chrome/Chromium/Firefox on Linux, Windows without
 * the HEVC extension) — measured live. It was then narrowed to an HEVC-only
 * denylist, which silently black-screened every OTHER undecodable codec. Hence the
 * allowlist in {@link videoCodecPolicy}. An UNKNOWN / absent video codec still
 * prefers direct play; see that function for why that is a tradeoff, not a net.
 *
 * @param sources             - URL / path strings to check by extension.
 * @param playbackAudioTracks - Parsed audio tracks from playback-info `audio_tracks`.
 * @param videoCodec          - The source's video codec as the media DETAIL response
 *                              reports it (`streams[]` where `stream_type === 'video'`;
 *                              see {@link videoCodecFromStreams}). `''`/absent = unknown.
 */
export async function needsTranscodeWithCapabilities(
  sources: (string | null | undefined)[],
  playbackAudioTracks: PlaybackAudioTrack[],
  videoCodec: string | null | undefined = '',
): Promise<boolean> {
  // Extension check first — the cheap synchronous gate.
  if (needsTranscode(...sources)) return true;

  const ext = sources.map((s) => extensionOf(s)).find((e) => (DIRECT_PLAY_EXTENSIONS as readonly string[]).includes(e)) ?? '';
  // Not a container we recognise as direct-playable — nothing further to decide.
  if (!(DIRECT_PLAY_EXTENSIONS as readonly string[]).includes(ext)) return false;

  // A REAL container MIME, never `video/${ext}` — see CONTAINER_MIME_BY_EXTENSION.
  const containerMime = containerMimeForExtension(ext);

  // VIDEO codec allowlist. Deliberately BEFORE the audio probe and independent of
  // it: `videoCodec` comes from the detail response, which is available at mount,
  // whereas playback-info may never arrive.
  const policy = videoCodecPolicy(videoCodec);
  if (policy === 'transcode') return true;
  if (policy === 'probe' && !(await canDecodeVideoCodec(videoCodec, containerMime))) return true;

  // AUDIO codec probe — needs playback-info, so only once tracks are known.
  if (playbackAudioTracks.length > 0) {
    // Check the primary (default) audio track's codec.
    const primaryTrack = playbackAudioTracks.find((t) => t.default) ?? playbackAudioTracks[0];
    if (primaryTrack?.codec) {
      const canAudio = await canDecodeAudioCodec(primaryTrack.codec, containerMime);
      if (!canAudio) return true;
    }
  }

  return false;
}
