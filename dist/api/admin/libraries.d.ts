/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
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
 * The library `type` values the DB actually accepts.
 *
 * The `libraries.type` ENUM is SEVEN members. It started as five (migration
 * 001), and **migration 035 added `book` and `audiobook`**. Verified against
 * the production column:
 *
 *     enum('movie','series','music','photo','video','book','audiobook')
 *
 * and `LibraryController::create()` accepts exactly the same seven
 * (`$validTypes`, LibraryController.php:314).
 *
 * This list previously stopped at five, carrying a comment that `book` was
 * "intentionally absent … because a `book` insert would 500 at the DB ENUM".
 * That was TRUE before migration 035 and false afterwards, so the admin UI
 * silently offered no way to create a book or audiobook library on a server
 * that fully supported both.
 *
 * NOTE this is the LIBRARY-kind vocabulary, which is NOT the same as
 * `MediaType` (the 13-member `media_items.type` ENUM). They overlap but are
 * distinct — do not merge them.
 */
export declare const LIBRARY_TYPES: readonly ["movie", "series", "music", "photo", "video", "book", "audiobook"];
/** A single DB-valid library type. */
export type LibraryType = (typeof LIBRARY_TYPES)[number];
/**
 * One artwork/image type in the per-library catalogue (M5). `type` is the
 * canonical key persisted under `options.image_types`; `label` is the
 * human-readable name; `default` is whether the type is enabled by default when
 * a library has no explicit selection; `providers` names the metadata providers
 * that can supply it (a hint shown to the admin).
 */
export interface ImageTypeOption {
    type: string;
    label: string;
    default: boolean;
    providers: string[];
}
/**
 * The `image_types` block on a library row (M5), emitted by
 * `LibraryRow::toArray()` on both the list and single-get responses.
 * `available` is the full canonical catalogue (identical across libraries);
 * `enabled` is THIS library's selection in catalogue order, falling back to the
 * default-on set when the library has no stored selection.
 */
export interface LibraryImageTypes {
    available: ImageTypeOption[];
    enabled: string[];
}
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
    /**
     * Per-library artwork selection (M5). Present on every row from
     * `LibraryRow::toArray()` (list + get): `available` is the catalogue of every
     * selectable type, `enabled` is this library's current selection.
     */
    image_types?: LibraryImageTypes;
    /**
     * Effective per-library TMDB box-set auto-collection toggle (S33). Surfaced on
     * every library row by `LibraryRow::toArray()` as `{ enabled: bool }`. The
     * server DEFAULTS `enabled` to `true` for libraries that never stored the flag
     * (`LibraryRow::autoCollectionsEnabled()`), so the effective value is always
     * concrete; the UI still treats an absent block as enabled to match that
     * default.
     */
    auto_collections?: {
        enabled: boolean;
    };
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
    /**
     * Per-library metadata-source priority, keyed by the library's media type,
     * e.g. `{ movie: ['tmdb','local'] }`. `LibraryController` accepts it at the
     * body top level and persists it canonically in `options.metadata_priority`.
     * Send `null` to clear the per-library override (falls back to the global default).
     */
    metadata_priority?: Record<string, string[]> | null;
    /**
     * Per-library artwork selection (M5). A `{type: boolean}` map (or a
     * `string[]` of enabled type names) sent at the body top level;
     * `LibraryController` normalises it via `ImageType::toStorageMap()` (unknown
     * type keys are dropped) and persists it canonically under
     * `options.image_types`. Send `null` to clear the override (fall back to the
     * default image-type set).
     */
    image_types?: Record<string, boolean> | string[] | null;
    /**
     * Per-library TMDB box-set auto-collection toggle (S33). Sent at the body top
     * level as a bare boolean; `LibraryController` accepts it (or a
     * `{ enabled: bool }` object) and persists the canonical `{ enabled: bool }`
     * under `options.autoCollections`, MERGING it so unrelated option keys survive.
     * Absent means "leave the stored value / default (ON) untouched".
     */
    autoCollections?: boolean;
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
    /** See {@link CreateLibraryInput.metadata_priority}. */
    metadata_priority?: Record<string, string[]> | null;
    /** See {@link CreateLibraryInput.image_types}. */
    image_types?: Record<string, boolean> | string[] | null;
    /** See {@link CreateLibraryInput.autoCollections}. */
    autoCollections?: boolean;
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
     * `POST /api/v1/libraries/{id}/refresh-metadata` → `202 { job_id, status, message }`.
     * Forces a metadata re-fetch for EVERY item (updates existing entries and
     * backfills newly-tracked fields — episode stills, trailers, logos,
     * certifications), unlike {@link matchMetadata} which only fills items that
     * have no metadata yet. Same async job shape as scan, so it drives the same
     * status-polling UI.
     */
    refreshMetadata(id: string): Promise<ScanQueuedResult>;
    /**
     * `POST /api/v1/libraries/{id}/prune` → `202 { job_id, status, message }`.
     * Removes ONLY items whose files no longer exist on disk, without a full
     * rescan; surviving items keep their metadata / watch data. Same async job
     * shape as scan.
     */
    prune(id: string): Promise<ScanQueuedResult>;
    /**
     * `POST /api/v1/libraries/{id}/clear-metadata` → `202 { job_id, status, message }`.
     * Resets every item to filesystem basics (keeps the items + user watch data)
     * so a later {@link matchMetadata} can re-fetch cleanly. Same async job shape.
     */
    clearMetadata(id: string): Promise<ScanQueuedResult>;
    /**
     * `POST /api/v1/libraries/{id}/clear-artwork` → `202 { job_id, status, message }`.
     * Deletes locally cached images to free disk; artwork is re-downloaded on the
     * next metadata match. Same async job shape.
     */
    clearArtwork(id: string): Promise<ScanQueuedResult>;
    /**
     * `POST /api/v1/libraries/{id}/delete-all?confirm=true` → `202 { job_id, status,
     * message }`. DESTRUCTIVE: removes EVERY item in the library along with its
     * watch progress / favorites / ratings. The server 400s without an explicit
     * `confirm=true`, so it is sent both in the query string AND the JSON body to
     * satisfy the guard regardless of how the controller reads it. Same async job
     * shape, so it drives the same status-polling UI.
     */
    deleteAll(id: string): Promise<ScanQueuedResult>;
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
