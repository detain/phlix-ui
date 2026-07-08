/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import type { ApiClient } from '../client';

/**
 * AdminMetadataSourcesApi (Feature 3.6) — typed wrapper over the admin
 * metadata-source listing endpoint exposed by the server-side
 * `AdminMetadataSourceController` (merged: phlix-server master `bd595a9`):
 *
 *  - `GET /api/v1/admin/metadata/sources` → `{ sources: string[] }`
 *
 * The endpoint returns the REAL set of metadata-source names the
 * {@link SourcePriorityEditor} should offer: the built-in sources the host
 * always ships (`tmdb`, `imdb`, `tvdb`, `fanart`, `local`) followed by any
 * plugin-contributed sources currently registered (e.g. `anidb` /
 * `myanimelist` when those plugins are enabled), de-duplicated.
 *
 * It uses the per-controller **top-level NAMED-KEY** envelope (NOT the
 * `{ success, data }` wrapper): a success reply carries the bare `{ sources }`
 * key, and a failure replies `{ error }` with a 4xx/5xx status (surfaced as
 * `ApiError` by the shared client). The unwrap is defensively `Array.isArray`-
 * guarded so a malformed payload degrades to `[]` rather than throwing.
 */
export class AdminMetadataSourcesApi {
  constructor(private readonly client: ApiClient) {}

  /**
   * `GET /api/v1/admin/metadata/sources` → unwraps `{ sources }`.
   * A malformed payload (or absent named key) degrades to `[]`.
   */
  async listSources(): Promise<string[]> {
    const { sources } = await this.client.get<{ sources: string[] }>(
      '/api/v1/admin/metadata/sources',
    );
    return Array.isArray(sources) ? sources : [];
  }
}
