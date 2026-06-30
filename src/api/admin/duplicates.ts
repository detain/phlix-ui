import type { ApiClient } from '../client';

/**
 * AdminDuplicatesApi (Feature 1.7) — typed wrapper over the admin duplicate-merge
 * endpoints exposed by the server-side `AdminMergeController` (merged + deployed):
 *
 *  - `GET  /api/v1/admin/libraries/{id}/duplicates` → `{ groups: [...] }`
 *  - `POST /api/v1/admin/media/merge` `{ primary_id, duplicate_ids }` → `{ moved, deleted }`
 *
 * Both endpoints use the per-controller **top-level NAMED-KEY** envelope (NOT the
 * `{ success, data }` wrapper): success replies carry the bare named key, and a
 * failure replies `{ error }` with a 4xx/5xx status. We never re-implement error
 * handling here — a non-2xx response surfaces `ApiError` via the shared client.
 * The list unwrap is defensively `Array.isArray`-guarded so a malformed payload
 * degrades to `[]` rather than throwing.
 *
 * Contract notes (traced from the 1.3/1.6 backend, not assumed):
 *  - A group's `library_id` is a CHAR(36) UUID **string** (never an int).
 *  - Each group is a set of media-items that share a `CanonicalKey`: one
 *    `primary` (the keep row, pre-selected in the UI) plus one or more
 *    `duplicates`. Every member is a hydrated `media_items` row (at least `id`,
 *    `name`, `type`) carrying one ADD-ONLY `descendant_count` int (the child
 *    count — episodes/seasons — so the UI shows "100 eps" vs "1 ep").
 *  - `merge()` returns `{ moved, deleted }`: `moved` = re-parented child rows,
 *    `deleted` = removed empty shells / duplicate movie rows.
 */

/**
 * A single member of a duplicate group: a hydrated `media_items` row plus the
 * add-only `descendant_count`. The index signature keeps the full row available
 * (metadata etc.) without enumerating every column the server may send.
 */
export interface DuplicateMember {
  /** `media_items.id` (CHAR(36) UUID). */
  id: string;
  /** Display name (`media_items.name`). Some rows may also carry a `title`. */
  name?: string;
  /** Optional alias the server may include alongside `name`. */
  title?: string;
  /** Item type (`movie` / `series` / …) — same across a group. */
  type?: string;
  /** Child-row count (episodes/seasons) for this row, added by the finder. */
  descendant_count: number;
  [k: string]: unknown;
}

/**
 * A duplicate group as returned verbatim by `DuplicateFinder::findForLibrary()`
 * (Step 1.3) and passed through by `AdminMergeController::duplicates()`.
 */
export interface DuplicateGroup {
  /** The shared `CanonicalKey` value the members collide on. */
  canonical_key: string;
  /** The members' common type (e.g. `movie`, `series`). */
  type: string;
  /** Owning library id (CHAR(36) UUID string). */
  library_id: string;
  /** The keep row (UI pre-selects + locks this as the merge target). */
  primary: DuplicateMember;
  /** The other colliding rows (UI offers each as a checkable merge source). */
  duplicates: DuplicateMember[];
}

/** Result of {@link AdminDuplicatesApi.mergeDuplicates}. */
export interface MergeResult {
  /** Count of child rows re-parented onto the primary. */
  moved: number;
  /** Count of rows deleted (emptied shells / duplicate movie rows). */
  deleted: number;
}

/** Typed client for the admin duplicate-merge endpoints. */
export class AdminDuplicatesApi {
  constructor(private readonly client: ApiClient) {}

  /**
   * `GET /api/v1/admin/libraries/{id}/duplicates` → unwraps `{ groups }`.
   * A malformed payload (or no-dupes library) degrades to `[]`.
   */
  async listDuplicates(libraryId: string): Promise<DuplicateGroup[]> {
    const { groups } = await this.client.get<{ groups: DuplicateGroup[] }>(
      `/api/v1/admin/libraries/${encodeURIComponent(libraryId)}/duplicates`,
    );
    return Array.isArray(groups) ? groups : [];
  }

  /**
   * `POST /api/v1/admin/media/merge` `{ primary_id, duplicate_ids }`
   * → `{ moved, deleted }`. Non-2xx (400 validation / 404 / 503) surfaces
   * `ApiError` via the shared client.
   */
  mergeDuplicates(primaryId: string, duplicateIds: string[]): Promise<MergeResult> {
    return this.client.post<MergeResult>('/api/v1/admin/media/merge', {
      primary_id: primaryId,
      duplicate_ids: duplicateIds,
    });
  }
}
