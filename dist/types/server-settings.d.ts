/**
 * Value shapes for the two non-scalar server settings.
 *
 * This module used to also declare a hand-maintained `ServerSettings` interface
 * and a `SettingGroup` union enumerating every server setting key and group.
 * Both were RETIRED: the server settings schema is the single source of truth
 * and reaches the UI at runtime through the `meta` block of
 * `GET /api/v1/admin/settings` (see {@link ../api/admin/settings.SettingMeta}).
 * The hand-written copies had drifted to roughly a third of the real key set and
 * three quarters of the groups, and nothing consumed them once the settings page
 * became schema-driven.
 *
 * What remains here are the two value-shape aliases that describe how a setting's
 * VALUE is structured — information the schema's `type: object` / `type: array`
 * does not carry — and which are useful to consumers reading those settings.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * How the `genres` field is combined across metadata sources
 * (`metadata.genres_mode`): `'first'` = take the genres from the first source
 * in the priority order that supplies any (first-non-empty); `'union'` = merge
 * the distinct genres from every contributing source.
 */
export type GenresMode = 'first' | 'union';
/**
 * Per-media-type ordered metadata-source priority
 * (`metadata.provider_priority`). Keys are media types (e.g. `movie`,
 * `series`, `anime`); values are ordered arrays of source names (e.g. `tmdb`,
 * `imdb`, `anidb`, `myanimelist`, `tvdb`, `fanart`, `local`). For each metadata
 * field the resolver walks the list in order and takes the first non-empty
 * value. A media type absent from the override falls back to the server config
 * default for that type.
 */
export type ProviderPriority = Record<string, string[]>;
