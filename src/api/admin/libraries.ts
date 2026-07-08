/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
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
 * The library `type` values the DB actually accepts. The `libraries.type`
 * ENUM (migration 001) is exactly these five — `book` is intentionally absent
 * even though `LibraryController::create()` lists it in `$validTypes`, because
 * a `book` insert would 500 at the DB ENUM. Offer ONLY these in the UI.
 */
export const LIBRARY_TYPES = ['movie', 'series', 'music', 'photo', 'video'] as const;

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
export class AdminLibrariesApi {
  constructor(private readonly client: ApiClient) {}

  /** `GET /api/v1/libraries` → unwraps `{ libraries }`. */
  async list(): Promise<Library[]> {
    const { libraries } = await this.client.get<{ libraries: Library[] }>('/api/v1/libraries');
    return Array.isArray(libraries) ? libraries : [];
  }

  /** `GET /api/v1/libraries/{id}` → unwraps `{ library }`. */
  async get(id: string): Promise<Library> {
    const { library } = await this.client.get<{ library: Library }>(
      `/api/v1/libraries/${encodeURIComponent(id)}`,
    );
    return library;
  }

  /** `POST /api/v1/libraries` → `201 { library_id, message }`. */
  create(input: CreateLibraryInput): Promise<CreateLibraryResult> {
    return this.client.post<CreateLibraryResult>('/api/v1/libraries', input);
  }

  /**
   * `PUT /api/v1/libraries/{id}` → `{ message }`. Sends only the editable
   * fields; `type` is intentionally not part of {@link UpdateLibraryInput}.
   */
  update(id: string, input: UpdateLibraryInput): Promise<{ message: string }> {
    return this.client.put<{ message: string }>(
      `/api/v1/libraries/${encodeURIComponent(id)}`,
      input,
    );
  }

  /** `DELETE /api/v1/libraries/{id}` → `{ message }`. */
  remove(id: string): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>(
      `/api/v1/libraries/${encodeURIComponent(id)}`,
    );
  }

  /** `POST /api/v1/libraries/{id}/scan` → `202 { job_id, status, message }`. */
  scan(id: string): Promise<ScanQueuedResult> {
    return this.client.post<ScanQueuedResult>(
      `/api/v1/libraries/${encodeURIComponent(id)}/scan`,
    );
  }

  /** `POST /api/v1/libraries/{id}/rescan` → `202 { job_id, status, message }`. */
  rescan(id: string): Promise<ScanQueuedResult> {
    return this.client.post<ScanQueuedResult>(
      `/api/v1/libraries/${encodeURIComponent(id)}/rescan`,
    );
  }

  /** `POST /api/v1/libraries/{id}/match-metadata` → `202 { job_id, status, message }`. */
  matchMetadata(id: string): Promise<ScanQueuedResult> {
    return this.client.post<ScanQueuedResult>(
      `/api/v1/libraries/${encodeURIComponent(id)}/match-metadata`,
    );
  }

  /**
   * `GET /api/v1/libraries/{id}/scan-status` → unwraps
   * `{ scan_status: ScanJob | null }`. A `null` means no job has run yet.
   */
  async scanStatus(id: string): Promise<ScanJob | null> {
    const { scan_status } = await this.client.get<{ scan_status: ScanJob | null }>(
      `/api/v1/libraries/${encodeURIComponent(id)}/scan-status`,
    );
    return scan_status ?? null;
  }

  /**
   * `GET /api/v1/libraries/{id}/scan-history?limit=N` → unwraps `{ history }`
   * (newest first; `limit` defaults to 20 server-side, clamped `[1, 100]`).
   */
  async scanHistory(id: string, limit?: number): Promise<ScanJob[]> {
    const params = limit === undefined ? undefined : { limit: String(limit) };
    const { history } = await this.client.get<{ history: ScanJob[] }>(
      `/api/v1/libraries/${encodeURIComponent(id)}/scan-history`,
      params,
    );
    return Array.isArray(history) ? history : [];
  }
}
