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
/** Result of starting (or reusing) a transcode job. */
export interface TranscodeStart {
    jobId: string;
    /** Server-relative master playlist URL, e.g. `/hls/<job>/master.m3u8`. */
    masterUrl: string;
    status: string;
    reused: boolean;
}
/** A transcode job's readiness snapshot. */
export interface TranscodeStatus {
    jobId: string;
    status: string;
    playlistReady: boolean;
    /** 0–100 best-effort progress. */
    progress: number;
    masterUrl: string;
}
/** Path to start (or reuse) a transcode job for a media item. */
export declare function transcodeStartPath(mediaId: string, profile?: string): string;
/** Path to poll a transcode job's readiness. */
export declare function transcodeStatusPath(jobId: string): string;
/** Normalizes a `POST .../transcode` response (snake- or camelCase) to {@link TranscodeStart}. */
export declare function parseTranscodeStart(raw: unknown): TranscodeStart;
/** Normalizes a `GET .../status` response (snake- or camelCase) to {@link TranscodeStatus}. */
export declare function parseTranscodeStatus(raw: unknown): TranscodeStatus;
/** True once the variant playlist has segments and can start playing. */
export declare function isPlayable(status: TranscodeStatus): boolean;
/** True when the job has terminally failed and will never play. */
export declare function isFailedStatus(status: string): boolean;
/**
 * Joins an API base with a server-relative URL, avoiding a double slash.
 * An already-absolute URL (http/https) is returned unchanged.
 */
export declare function resolveStreamUrl(apiBase: string, relative: string): string;
