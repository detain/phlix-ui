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
 * false on purpose — we do not guess.
 *
 * This is the cheap synchronous gate only. Codec-level cases (HEVC inside an mp4,
 * E-AC-3 audio, …) are decided by {@link needsTranscodeWithCapabilities}, NOT by
 * the runtime `<video>` error: measured, an undecodable video stream alongside a
 * decodable audio stream fires no error at all.
 */
export declare function needsTranscode(...sources: (string | null | undefined)[]): boolean;
/**
 * True when a <video> element's current error is a fatal format/decode error
 * (MEDIA_ERR_DECODE = 3, MEDIA_ERR_SRC_NOT_SUPPORTED = 4) — i.e. the browser
 * cannot play this source, so the "needs transcode" notice should replace the
 * black frame. Network/abort errors (1, 2) are NOT treated as transcode-needed.
 */
export declare function isFatalMediaError(video: HTMLVideoElement | null | undefined): boolean;
/**
 * True when a <video> element's current error is a network error
 * (MEDIA_ERR_NETWORK = 2) — the source host could not be reached. On the hub a
 * direct-play stream points at the paired server's own public origin; when that
 * origin is unreachable from the browser the element errors with this code before
 * any frame plays, and the player falls back to an HLS transcode over the relay
 * proxy. The caller gates this on no playback progress yet so a transient mid-play
 * network blip does not wrongly tear a healthy session down.
 */
export declare function isNetworkMediaError(video: HTMLVideoElement | null | undefined): boolean;
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
export declare function parsePlaybackAudioTracks(value: unknown): PlaybackAudioTrack[];
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
export declare function videoCodecPolicy(codec: string | null | undefined): VideoCodecPolicy;
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
export declare function videoCodecFromStreams(value: unknown): string;
/**
 * Container MIME type for a file extension (see {@link CONTAINER_MIME_BY_EXTENSION}).
 * Falls back to `video/mp4` for an unknown/absent extension — the guard only
 * reaches here for {@link DIRECT_PLAY_EXTENSIONS}, all of which are mapped.
 */
export declare function containerMimeForExtension(ext: string | null | undefined): string;
/**
 * Builds a `video/mp4; codecs="..."` string for the given audio codec, or null
 * if the codec is not recognised. Suitable for both `decodingInfo()` and the
 * `video.canPlayType()` fallback.
 */
export declare function buildAudioCodecString(audioCodec: string, containerMime?: string): string | null;
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
export declare function canDecodeAudioCodec(audioCodec: string, containerMime?: string): Promise<boolean>;
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
export declare function canDecodeVideoCodec(videoCodec: string | null | undefined, containerMime?: string): Promise<boolean>;
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
export declare function needsTranscodeWithCapabilities(sources: (string | null | undefined)[], playbackAudioTracks: PlaybackAudioTrack[], videoCodec?: string | null | undefined): Promise<boolean>;
