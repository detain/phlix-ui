import { ApiClient } from './client';
import { LocalStorageTokenStore } from './tokenStore';
import { compareByStrippedTitle } from '../utils/sortTitle';

/**
 * Public (non-admin) library listing used by the Browse surface to render one
 * section/rail per library and to build the per-library nav links + pages.
 *
 * This is deliberately separate from `api/admin/libraries.ts` (the full CRUD +
 * scan wrapper): Browse only needs the lightweight identity of each library
 * (`id` / `name` / `type` / ordering) and must work for any signed-in viewer,
 * not just admins. It hits the same read endpoint (`GET /api/v1/libraries`,
 * registered on the main router — not behind AdminMiddleware) and unwraps the
 * `{ libraries }` envelope, degrading a malformed payload to `[]` rather than
 * throwing.
 */

/** A library as the Browse surface needs it — a slim view of the `libraries` row. */
export interface LibrarySummary {
  id: string;
  name: string;
  /** Library kind — movie | series | music | photo | video (server ENUM). */
  type: string;
  /** Admin-defined ordering; lower sorts first. Optional (may be absent). */
  display_order?: number;
  /** Item count when the server includes it; optional. */
  item_count?: number;
  [k: string]: unknown;
}

/**
 * Stable sort for the Browse surface: by `display_order` ascending (missing
 * orders sort last), then case-insensitively by name with a leading article
 * ignored (so a "The …" library files under its real letter, matching how media
 * listings sort). Pure + side-effect free (operates on a copy) so it is
 * trivially unit-testable.
 */
export function sortLibraries(list: readonly LibrarySummary[]): LibrarySummary[] {
  return [...list].sort((a, b) => {
    const ao = typeof a.display_order === 'number' ? a.display_order : Number.POSITIVE_INFINITY;
    const bo = typeof b.display_order === 'number' ? b.display_order : Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return compareByStrippedTitle(a.name, b.name);
  });
}

/**
 * Fetch the viewer's libraries from `GET /api/v1/libraries`, sorted for display.
 * Authenticates with the stored access token (the same endpoint the admin client
 * authorizes against) so it works whether the server gates the listing on a
 * Bearer token or a same-origin session. Optionally honours an `AbortSignal` so a
 * teardown can cancel the request.
 */
export async function fetchLibraries(apiBase: string, signal?: AbortSignal): Promise<LibrarySummary[]> {
  const client = new ApiClient({
    baseUrl: apiBase,
    // Guarded for SSR/no-window (this only ever runs client-side, but the store's
    // localStorage access would throw if it were ever pre-rendered).
    tokenStore: typeof window !== 'undefined' ? new LocalStorageTokenStore() : undefined,
  });
  // Path only — ApiClient prepends `baseUrl` (= apiBase) itself.
  const res = await client.get<{ libraries?: LibrarySummary[] }>('/api/v1/libraries', undefined, signal);
  const list = Array.isArray(res.libraries) ? res.libraries : [];
  return sortLibraries(list);
}
