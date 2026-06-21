import type { ApiClient } from '../client';
/**
 * AdminLibrariesApi (RA.15) — typed wrapper over the library CRUD + async-scan
 * endpoints (`/api/v1/libraries/*`), ported 1:1 from the deleted React
 * `LibrariesApi`. This SUPERSEDES the scan-only `LibraryScanPage`: it covers the
 * full library lifecycle (list / get / create / update / delete) plus async
 * scan / rescan / match-metadata triggers and the coarse scan-status + history
 * read surface.
 *
 * Every method maps 1:1 to an endpoint shipped by `LibraryController` (plus the
 * 1.1b async-scan additions) and unwraps the single-key envelopes those
 * controllers return (`{ libraries }`, `{ library }`, `{ scan_status }`,
 * `{ history }`) so callers receive the bare domain object. List unwraps are
 * defensively guarded with `Array.isArray(...)` so a malformed payload degrades
 * to `[]` rather than throwing; non-2xx responses surface `ApiError` via the
 * shared client (we never re-implement error handling here).
 *
 * Contract notes (traced from source, not assumed):
 *  - `create()` posts `{ name, type, paths, options? }` and replies
 *    `201 { library_id, message }`.
 *  - `update()` NEVER sends `type`: the controller silently ignores it and the
 *    `type` column is not updatable, so it is omitted from the typed input.
 *  - `scan()`/`rescan()`/`matchMetadata()` are async: they reply
 *    `202 { job_id, status:'queued', message }`; the work runs in a worker.
 *  - `scanStatus()` may legitimately return `null` (no job has ever run).
 *  - Progress is LIVE: while a job runs, `ScanJob.items_found` (total) /
 *    `items_updated` (processed) + `current_path` are streamed onto the row
 *    (scan, rescan, and metadata-match all report this), so the UI can show a
 *    percentage. They may still be `0`/`null` briefly before the first tick.
 */
/**
 * The library `type` values the DB actually accepts. The `libraries.type`
 * ENUM (migration 001) is exactly these five — `book` is intentionally absent
 * even though `LibraryController::create()` lists it in `$validTypes`, because
 * a `book` insert would 500 at the DB ENUM. Offer ONLY these in the UI.
 */
export declare const LIBRARY_TYPES: readonly ["movie", "series", "music", "photo", "video"];
/** A single DB-valid library type. */
export type LibraryType = (typeof LIBRARY_TYPES)[number];
/**
 * A library row as returned by `LibraryManager`/`LibraryRow::toArray()` — the
 * raw `libraries` row with `paths`/`options` already JSON-decoded.
 */
export interface Library {
    id: string;
    name: string;
    type: string;
    paths: string[];
    options?: Record<string, unknown>;
    created_at?: string;
    display_order?: number;
    [k: string]: unknown;
}
/**
 * A scan-job row as returned by `ScanJobRepository::decodeRow()` (13 fields).
 *
 * Live progress: while `status === 'running'`, `items_found` is the total work,
 * `items_updated` the amount processed, and `current_path` the item in flight
 * (scan, rescan, and metadata-match all stream these). `items_updated /
 * items_found` is the completion fraction.
 */
export interface ScanJob {
    id: string;
    library_id: string;
    type: 'scan' | 'rescan' | 'metadata';
    status: 'queued' | 'running' | 'completed' | 'failed';
    items_found: number;
    items_added: number;
    items_updated: number;
    items_removed: number;
    current_path: string | null;
    error: string | null;
    queued_at: string | null;
    started_at: string | null;
    completed_at: string | null;
}
/** Body accepted by {@link AdminLibrariesApi.create}. */
export interface CreateLibraryInput {
    name: string;
    type: string;
    paths: string[];
    options?: Record<string, unknown>;
    /**
     * Per-library "each series is in its own folder" flag (series libraries only).
     * `LibraryController` accepts it at the body top level (or nested in `options`)
     * and persists it canonically inside `options.series_per_directory`.
     */
    series_per_directory?: boolean;
}
/**
 * Body accepted by {@link AdminLibrariesApi.update}. NOTE the deliberate
 * absence of `type` — the controller ignores it and the column is not updatable.
 */
export interface UpdateLibraryInput {
    name?: string;
    paths?: string[];
    options?: Record<string, unknown>;
    /** See {@link CreateLibraryInput.series_per_directory}. */
    series_per_directory?: boolean;
}
/** Result of {@link AdminLibrariesApi.create}. */
export interface CreateLibraryResult {
    library_id: string;
    message: string;
    /** Async initial-scan job id (create enqueues a background scan). */
    job_id?: string;
    /** 'scanning' while the background initial scan runs. */
    status?: string;
}
/** Result of {@link AdminLibrariesApi.scan}/{@link AdminLibrariesApi.rescan}. */
export interface ScanQueuedResult {
    job_id: string;
    status: string;
    message: string;
}
/** Typed client for the library + scan endpoints. */
export declare class AdminLibrariesApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/libraries` → unwraps `{ libraries }`. */
    list(): Promise<Library[]>;
    /** `GET /api/v1/libraries/{id}` → unwraps `{ library }`. */
    get(id: string): Promise<Library>;
    /** `POST /api/v1/libraries` → `201 { library_id, message }`. */
    create(input: CreateLibraryInput): Promise<CreateLibraryResult>;
    /**
     * `PUT /api/v1/libraries/{id}` → `{ message }`. Sends only the editable
     * fields; `type` is intentionally not part of {@link UpdateLibraryInput}.
     */
    update(id: string, input: UpdateLibraryInput): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/libraries/{id}` → `{ message }`. */
    remove(id: string): Promise<{
        message: string;
    }>;
    /** `POST /api/v1/libraries/{id}/scan` → `202 { job_id, status, message }`. */
    scan(id: string): Promise<ScanQueuedResult>;
    /** `POST /api/v1/libraries/{id}/rescan` → `202 { job_id, status, message }`. */
    rescan(id: string): Promise<ScanQueuedResult>;
    /** `POST /api/v1/libraries/{id}/match-metadata` → `202 { job_id, status, message }`. */
    matchMetadata(id: string): Promise<ScanQueuedResult>;
    /**
     * `GET /api/v1/libraries/{id}/scan-status` → unwraps
     * `{ scan_status: ScanJob | null }`. A `null` means no job has run yet.
     */
    scanStatus(id: string): Promise<ScanJob | null>;
    /**
     * `GET /api/v1/libraries/{id}/scan-history?limit=N` → unwraps `{ history }`
     * (newest first; `limit` defaults to 20 server-side, clamped `[1, 100]`).
     */
    scanHistory(id: string, limit?: number): Promise<ScanJob[]>;
}
