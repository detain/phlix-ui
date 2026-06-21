import type { ApiClient } from '../client';
/**
 * AdminPluginsApi (U6) — typed wrapper over the admin plugin-management endpoints
 * (`/api/v1/admin/plugins/*`), shipped by `PluginAdminController` (S6). Covers the
 * full lifecycle: list, detail (with the manifest settings schema for rendering a
 * configure form), install-by-URL, enable/disable, uninstall, and a settings save
 * that validates against the manifest and masks secrets.
 *
 * Contract notes (traced from the S6 worklog + the server source, not assumed):
 *  - `GET /plugins` → `{ plugins: [...] }`; each row carries identity + `enabled`.
 *  - `GET /plugins/{name}` → `{ plugin: { ...identity, settings_schema, settings } }`.
 *    `settings_schema` is `{ key: { type, required, secret, label, description,
 *    default? } }` — `default` is present ONLY when the manifest declares one (so
 *    the UI can tell "no default" from "default null"). `settings` is `{ key:
 *    value }` with every `secret:true` value replaced by the mask sentinel `***`.
 *  - `POST /plugins/install` `{ url }` → `201` manifest, or `400`/`422` with a
 *    `{ code }` the UI surfaces (see {@link pluginErrorCode}).
 *  - `POST /plugins/{name}/enable` / `/disable` → `200`.
 *  - `DELETE /plugins/{name}` → `204` (uninstall).
 *  - `PUT /plugins/{name}/settings` `{ settings: {...} }` → validates unknown keys
 *    / type mismatches (`400 plugin.settings.validation_failed` with
 *    `{ errors: { key: msg } }`), MERGES the accepted keys over the stored
 *    settings, and returns the refreshed masked detail. SECRET RULE: a secret
 *    submitted as the `***` mask sentinel is treated as unchanged and is NOT
 *    overwritten — so the configure form prefills secrets with `***` and only
 *    sends a secret back when the admin actually typed a new value.
 */
/** The mask sentinel the server substitutes for every `secret:true` value. */
export declare const PLUGIN_SECRET_MASK = "***";
/** One settings-schema descriptor projected from the plugin manifest. */
export interface PluginSettingDescriptor {
    /** Manifest type vocabulary: `string` | `int`/`integer` | `bool`/`boolean` | `number`/`float` | `array` | `object`. */
    type: string;
    required: boolean;
    secret: boolean;
    label: string;
    description: string;
    /** Present ONLY when the manifest declares a default (distinguish "no default" from "default null"). */
    default?: unknown;
}
/** The manifest settings schema: one descriptor per setting key. */
export type PluginSettingsSchema = Record<string, PluginSettingDescriptor>;
/** Current (masked) setting values: secrets are replaced by {@link PLUGIN_SECRET_MASK}. */
export type PluginSettings = Record<string, unknown>;
/** A plugin row as returned by the list endpoint. */
export interface Plugin {
    id?: string | number;
    name: string;
    version: string;
    type: string;
    enabled: boolean;
    installed_at?: string;
    [key: string]: unknown;
}
/** A plugin's detail: identity + the manifest settings schema + masked values. */
export interface PluginDetail extends Plugin {
    settings_schema: PluginSettingsSchema;
    settings: PluginSettings;
}
/**
 * One plugin entry from a catalog's `plugins.json`, annotated by the server
 * with whether it is already installed (and enabled). `name` is the manifest
 * name used to cross-reference the installed list; `repo` is the URL passed to
 * the install endpoint.
 */
export interface CatalogPlugin {
    name: string;
    title: string;
    type: string;
    summary: string;
    description: string;
    repo: string;
    author: string;
    tags: string[];
    installed: boolean;
    enabled: boolean;
}
/** One fetched catalog: its source URL, display name, and plugin entries. */
export interface Catalog {
    source: string;
    name: string;
    plugins: CatalogPlugin[];
}
/** A catalog source that could not be fetched/parsed. */
export interface CatalogError {
    source: string;
    error: string;
}
/** The aggregated catalog response across every configured source. */
export interface CatalogResponse {
    /** The immutable default catalog source (cannot be removed). */
    default_source: string;
    /** Every configured source URL (default first, then operator extras). */
    sources: string[];
    /** Successfully fetched catalogs. */
    catalogs: Catalog[];
    /** Per-source fetch/parse failures (so the UI can show them inline). */
    errors: CatalogError[];
}
/**
 * One plugin's update status, as returned by the updates endpoint. `latest_version`
 * is `null` when it can't be determined (e.g. no source or a check error);
 * `update_available` is the server's verdict (installed < latest). `checkable` is
 * `false` for plugins with no update source (built-ins / manual installs without a
 * resolvable repo), and `error` carries a per-plugin check failure message.
 */
export interface PluginUpdate {
    name: string;
    installed_version: string;
    latest_version: string | null;
    update_available: boolean;
    repo: string | null;
    checkable: boolean;
    error: string | null;
}
/** The aggregated update-check response: the auto-update flag + per-plugin rows. */
export interface UpdateCheckResponse {
    auto_update: boolean;
    /** Count of plugins with an update available (server-computed convenience). */
    available: number;
    updates: PluginUpdate[];
}
/** The result of applying all available updates: per-plugin successes + failures. */
export interface UpdateAllResult {
    updated: Array<{
        name: string;
        from: string;
        to: string;
    }>;
    failed: Array<{
        name: string;
        error: string;
    }>;
}
/**
 * The server error `code` carried by a failed install / settings save (e.g.
 * `plugin.install_failed`, `plugin.invalid_url`, `plugin.settings.validation_failed`).
 * Returns `null` when the thrown error is not an {@link ApiError} or carries no
 * `code`. Lets the UI map a code to a helpful message instead of the generic text.
 */
export declare function pluginErrorCode(e: unknown): string | null;
/**
 * The per-field validation errors carried by a `400
 * plugin.settings.validation_failed` (`{ errors: { key: message } }`). Returns an
 * empty map when the error is not that shape — so the caller can always iterate.
 */
export declare function pluginValidationErrors(e: unknown): Record<string, string>;
export declare class AdminPluginsApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/plugins` → unwraps `{ plugins }` (defended to `[]`). */
    list(): Promise<Plugin[]>;
    /** `GET /api/v1/admin/plugins/{name}` → unwraps `{ plugin }` (schema + masked settings). */
    get(name: string): Promise<PluginDetail>;
    /**
     * `POST /api/v1/admin/plugins/install` `{ url }` → `201` manifest. A `400`/`422`
     * surfaces as an {@link ApiError}; read its `{ code }` with {@link pluginErrorCode}.
     */
    install(url: string): Promise<unknown>;
    /** `POST /api/v1/admin/plugins/{name}/enable` → `200`. */
    enable(name: string): Promise<unknown>;
    /** `POST /api/v1/admin/plugins/{name}/disable` → `200`. */
    disable(name: string): Promise<unknown>;
    /** `DELETE /api/v1/admin/plugins/{name}` → `204` (uninstall). */
    uninstall(name: string): Promise<unknown>;
    /**
     * `GET /api/v1/admin/plugins/catalog` → the aggregated catalog across every
     * configured source, each entry annotated with `installed`/`enabled`. All
     * arrays are defended so a malformed payload degrades to empty rather than
     * throwing on `.map`.
     */
    catalog(): Promise<CatalogResponse>;
    /**
     * `POST /api/v1/admin/plugins/catalog/sources` `{ url }` → the updated source
     * list. A `400 plugin.catalog.url.invalid` (bad scheme) surfaces as an
     * {@link ApiError}; read its `{ code }` with {@link pluginErrorCode}.
     */
    addCatalogSource(url: string): Promise<string[]>;
    /**
     * `DELETE /api/v1/admin/plugins/catalog/sources?url=…` → the updated source
     * list. The URL travels on the query string because the browser's DELETE
     * carries no body. The default source cannot be removed (server no-op).
     */
    removeCatalogSource(url: string): Promise<string[]>;
    /**
     * `GET /api/v1/admin/plugins/updates` → the per-plugin update status across the
     * installed set, plus the `auto_update` flag and an `available` count. All
     * arrays/shapes are defended so a malformed payload degrades to empty rather
     * than throwing on `.map`.
     */
    checkUpdates(): Promise<UpdateCheckResponse>;
    /**
     * `POST /api/v1/admin/plugins/{name}/update` → `200 { plugin: { name, version } }`.
     * A `404 plugin.update.no_source` / `422 plugin.update.failed` surfaces as an
     * {@link ApiError}; read its `{ code }` with {@link pluginErrorCode}.
     */
    updatePlugin(name: string): Promise<unknown>;
    /**
     * `POST /api/v1/admin/plugins/updates/apply` → applies every available update,
     * returning the per-plugin successes (`updated`) and failures (`failed`). Both
     * arrays are defended so the caller can always iterate.
     */
    updateAll(): Promise<UpdateAllResult>;
    /** `GET /api/v1/admin/plugins/auto-update` → unwraps the `auto_update` flag. */
    getAutoUpdate(): Promise<boolean>;
    /**
     * `PUT /api/v1/admin/plugins/auto-update` `{ enabled }` → the persisted flag.
     * Returns the server's `auto_update` (so the UI binds to the confirmed value).
     */
    setAutoUpdate(enabled: boolean): Promise<boolean>;
    /**
     * `PUT /api/v1/admin/plugins/{name}/settings` `{ settings }` → the refreshed
     * masked {@link PluginDetail}. Pass ONLY the keys the admin changed; a secret
     * left at the `***` mask is preserved server-side (omit it, or send `***`).
     * A `400 plugin.settings.validation_failed` surfaces as an {@link ApiError} —
     * read its per-field map with {@link pluginValidationErrors}.
     */
    updateSettings(name: string, settings: PluginSettings): Promise<PluginDetail>;
}
