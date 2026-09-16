/**
 * transcode.ts — pure, DOM-free helpers for the on-demand HLS transcode flow.
 *
 * When a file can't be direct-played (see {@link ./playback}'s `needsTranscode`
 * / `isFatalMediaError`), the player asks the server to transcode it to HLS:
 *   POST /api/v1/media/:id/transcode            -> { job_id, master_url, status }
 *   GET  /api/v1/transcode/:jobId/status        -> { status, playlist_ready, ... }
 * and then plays the returned master playlist via hls.js (see ./hls-playback).
 *
 * These helpers build the endpoint paths and normalize the server payloads
 * (which use snake_case) into a stable camelCase shape, tolerating either
 * casing so a contract tweak doesn't silently break parsing.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * A subtitle sidecar track the server extracted from the source as WebVTT (S4).
 * `url` is a server-relative path (e.g. `/hls/<job>/sub-0.vtt`) that resolves
 * against the API base the same way the master playlist URL does.
 */
export interface SubtitleTrack {
  /** Source stream index (stable identity within a job). */
  index: number;
  /** BCP-47 language code (e.g. `eng`), or '' when the source carries none. */
  language: string;
  /** Human label (server-disambiguated, e.g. "English 1"). */
  label: string;
  /** True for the track the server marks as the default selection. */
  default: boolean;
  /** Server-relative WebVTT sidecar URL (`/hls/<job>/sub-<index>.vtt`). */
  url: string;
}

/**
 * A server-provided quality rung, mirroring the wire shape verbatim.
 * Only the fields needed for the quality menu (height, bitrate, label) are
 * captured; full fidelity is not needed since hls.js is the primary source.
 */
export interface Variant {
  id: string;
  label: string;
  height: number;
  width: number;
  bitrate: number;
}

/** Result of starting (or reusing) a transcode job. */
export interface TranscodeStart {
  jobId: string;
  /** Server-relative master playlist URL, e.g. `/hls/<job>/master.m3u8`. */
  masterUrl: string;
  status: string;
  reused: boolean;
  /** Embedded text subtitle tracks extracted to WebVTT sidecars (may be empty). */
  subtitles: SubtitleTrack[];
  /** The playable quality ladder from the server (null on a legacy pre-ABR job). */
  variants: Variant[] | null;
}

/** A transcode job's readiness snapshot. */
export interface TranscodeStatus {
  jobId: string;
  status: string;
  playlistReady: boolean;
  /** 0–100 best-effort progress. */
  progress: number;
  masterUrl: string;
  /** Embedded text subtitle tracks (may arrive late, once extraction finishes). */
  subtitles: SubtitleTrack[];
  /** The playable quality ladder from the server (null on a legacy pre-ABR job). */
  variants: Variant[] | null;
}

/** Statuses from which the job will never become playable. */
const FAILED_STATUSES: ReadonlySet<string> = new Set(['failed', 'cancelled', 'not_found', 'error']);

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function bool(value: unknown): boolean {
  return value === true || value === 'true' || value === 1;
}

function num(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) return Number(value);
  return 0;
}

/**
 * Normalizes the server's `subtitles` array (per-track snake- or camelCase) into
 * a list of {@link SubtitleTrack}. Tolerates a missing/non-array value (→ []),
 * junk entries (skipped), and either casing so a contract tweak doesn't break it.
 */
export function parseSubtitleTracks(value: unknown): SubtitleTrack[] {
  if (!Array.isArray(value)) return [];
  const out: SubtitleTrack[] = [];
  for (const entry of value) {
    if (entry == null || typeof entry !== 'object') continue;
    const o = entry as Record<string, unknown>;
    const url = str(o.url ?? o.src);
    if (url === '') continue; // a track with no sidecar URL is unusable
    out.push({
      index: num(o.index),
      language: str(o.language ?? o.lang ?? o.srclang),
      label: str(o.label),
      default: bool(o.default ?? o.isDefault),
      url,
    });
  }
  return out;
}

/**
 * Normalizes the server's `variants` array (per-rung snake- or camelCase) into
 * a list of {@link Variant}. Tolerates a missing/null value (→ null), junk
 * entries (skipped), and either casing so a contract tweak doesn't break it.
 */
export function parseVariants(value: unknown): Variant[] | null {
  if (value == null) return null;
  // Handle LadderResult.toArray() format: {renditions: [...], original: {...}}
  if (!Array.isArray(value) && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    if (Array.isArray(o.renditions)) {
      value = o.renditions;
    }
  }
  if (!Array.isArray(value)) return null;
  const out: Variant[] = [];
  for (const entry of value) {
    if (entry == null || typeof entry !== 'object') continue;
    const o = entry as Record<string, unknown>;
    const height = num(o.height);
    if (height <= 0) continue;
    out.push({
      id: str(o.id),
      label: str(o.label),
      height,
      width: num(o.width),
      bitrate: num(o.bitrate),
    });
  }
  return out.length > 0 ? out : null;
}

/**
 * Path to start (or reuse) a transcode job for a media item.
 *
 * `profile` is OPTIONAL: when omitted (or empty) NO `?profile=` query is sent, so
 * the server maps the quality profile from the request's `X-Phlix-Device-Type`
 * header (a TV identifies itself → gets >1080p; a browser sends no device header
 * → the server still defaults to `web`, unchanged). Pass an explicit profile to
 * pin it client-side (e.g. `'tv-4k'`).
 */
export function transcodeStartPath(mediaId: string, profile?: string): string {
  const base = `/api/v1/media/${encodeURIComponent(mediaId)}/transcode`;
  return profile ? `${base}?profile=${encodeURIComponent(profile)}` : base;
}

/** W110 S514 survival sentinel — must stay in this one file (see the plan step). */
export const S514_DOWNLINK_CAP_TOKEN = 'S514DOWNLINKX9P5';

/**
 * Fraction of the reported `downlinkMax` we are willing to aim at.
 *
 * `NetworkInformation.downlinkMax` is the MAXIMUM bandwidth the interface can
 * currently receive — an optimistic ceiling, not the throughput a stream will
 * actually get. 0.7 leaves headroom for the rest of the page and the variability
 * hls.js's ABR has to absorb on the first segments, so an over-generous initial
 * rung does not immediately starve and thrash down. This is only the STARTING cap;
 * ABR still adapts within it.
 */
const DOWNLINK_CONSERVATISM = 0.7;

/**
 * The `max_bitrate` ceiling (bits/sec) of each EXISTING web-or-below server
 * quality profile, ascending. This mirrors — and does NOT define — the vocabulary
 * in phlix-server `QualitySelector::loadDefaultProfiles()`; it lives here only so
 * the client can speak the `?profile=` hint the server already accepts. It is
 * deliberately capped at the `web` (1080p) rung: a browser downlink cap may lower
 * the rung, never raise it above the `web` profile a browser already receives by
 * default (the server maps an absent `X-Phlix-Device-Type` to `web`).
 *
 * ⚠ If the server's profile ladder changes, this table is a MIRROR to be kept
 * honest, not a source of truth — the server remains the authority and is
 * intentionally untouched by this step.
 */
const WEB_AND_BELOW_PROFILE_CEILINGS_BPS: readonly (readonly [string, number])[] = [
  ['mobile-low', 1_500_000],
  ['mobile-high', 4_000_000],
  ['web', 10_000_000],
];

/** The rung a browser already gets with no explicit profile — the cap's own ceiling. */
const BASELINE_WEB_PROFILE_CEILING_BPS = 10_000_000;

/** The lowest rung we can fall back to — a cap below every rung still picks it. */
const FLOOR_PROFILE = 'mobile-low';

/**
 * Conservative target bitrate (bits/sec) derived from `downlinkMax` (Mbps), or
 * `undefined` when the reading must be ignored — API absent (`null`/`undefined`),
 * a non-finite value (`downlinkMax` is `Infinity` on some wireless/radio links,
 * where it means "unbounded", not "huge"), or a non-positive reading.
 *
 * Returning `undefined` (rather than a number) is what lets the caller send NO
 * `?profile=` hint and stay byte-identical to today's request.
 */
export function downlinkBitrateCapBps(downlinkMaxMbps: number | null | undefined): number | undefined {
  if (typeof downlinkMaxMbps !== 'number') return undefined;
  if (!Number.isFinite(downlinkMaxMbps)) return undefined; // Infinity / NaN → unbounded, ignore
  if (downlinkMaxMbps <= 0) return undefined; // no usable bandwidth signal
  return downlinkMaxMbps * 1_000_000 * DOWNLINK_CONSERVATISM;
}

/**
 * The existing `?profile=` hint to pin a transcode to, given the device's reported
 * `downlinkMax` (Mbps), or `undefined` to send NO hint (today's behavior).
 *
 * The cap only ever lowers the browser's default `web` rung:
 *   - cap unknown / unbounded / at-or-above `web`   → `undefined` (no request change)
 *   - cap fits `mobile-high` (4M) but not `web`      → `'mobile-high'`
 *   - anything below that                            → `'mobile-low'` (floor rung)
 *
 * Pure over its one argument, so the derivation and the byte-identical-absent path
 * are both unit-testable without a browser; the caller samples `navigator.connection`
 * and feeds the number in.
 */
export function profileForDownlinkCap(downlinkMaxMbps: number | null | undefined): string | undefined {
  const cap = downlinkBitrateCapBps(downlinkMaxMbps);
  if (cap === undefined) return undefined;
  if (cap >= BASELINE_WEB_PROFILE_CEILING_BPS) return undefined; // not a real constraint
  let chosen = FLOOR_PROFILE;
  for (const [name, ceiling] of WEB_AND_BELOW_PROFILE_CEILINGS_BPS) {
    if (ceiling <= cap) chosen = name; // ascending, so the last fit is the highest
  }
  return chosen;
}


/** Path to poll a transcode job's readiness. */
export function transcodeStatusPath(jobId: string): string {
  return `/api/v1/transcode/${encodeURIComponent(jobId)}/status`;
}

/** Normalizes a `POST .../transcode` response (snake- or camelCase) to {@link TranscodeStart}. */
export function parseTranscodeStart(raw: unknown): TranscodeStart {
  const o = (raw ?? {}) as Record<string, unknown>;
  return {
    jobId: str(o.job_id ?? o.jobId),
    masterUrl: str(o.master_url ?? o.masterUrl ?? o.hls_url ?? o.hlsUrl),
    status: str(o.status, 'running'),
    reused: bool(o.reused),
    subtitles: parseSubtitleTracks(o.subtitles ?? o.subtitle_tracks ?? o.subtitleTracks),
    variants: parseVariants(o.variants ?? o.variants_list ?? o.Variants),
  };
}

/** Normalizes a `GET .../status` response (snake- or camelCase) to {@link TranscodeStatus}. */
export function parseTranscodeStatus(raw: unknown): TranscodeStatus {
  const o = (raw ?? {}) as Record<string, unknown>;
  return {
    jobId: str(o.job_id ?? o.jobId),
    status: str(o.status, 'running'),
    playlistReady: bool(o.playlist_ready ?? o.playlistReady),
    progress: num(o.progress),
    masterUrl: str(o.master_url ?? o.masterUrl),
    subtitles: parseSubtitleTracks(o.subtitles ?? o.subtitle_tracks ?? o.subtitleTracks),
    variants: parseVariants(o.variants ?? o.variants_list ?? o.Variants),
  };
}

/** True once the variant playlist has segments and can start playing. */
export function isPlayable(status: TranscodeStatus): boolean {
  return status.playlistReady || status.status === 'completed';
}

/** True when the job has terminally failed and will never play. */
export function isFailedStatus(status: string): boolean {
  return FAILED_STATUSES.has(status);
}

/**
 * Joins an API base with a server-relative URL, avoiding a double slash.
 * An already-absolute URL (http/https) is returned unchanged.
 */
export function resolveStreamUrl(apiBase: string, relative: string): string {
  if (/^https?:\/\//i.test(relative)) return relative;
  const base = apiBase.replace(/\/+$/, '');
  const rel = relative.startsWith('/') ? relative : `/${relative}`;
  return `${base}${rel}`;
}
