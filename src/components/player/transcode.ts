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

/** Result of starting (or reusing) a transcode job. */
export interface TranscodeStart {
  jobId: string;
  /** Server-relative master playlist URL, e.g. `/hls/<job>/master.m3u8`. */
  masterUrl: string;
  status: string;
  reused: boolean;
  /** Embedded text subtitle tracks extracted to WebVTT sidecars (may be empty). */
  subtitles: SubtitleTrack[];
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

/** Path to start (or reuse) a transcode job for a media item. */
export function transcodeStartPath(mediaId: string, profile = 'web'): string {
  return `/api/v1/media/${encodeURIComponent(mediaId)}/transcode?profile=${encodeURIComponent(profile)}`;
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
