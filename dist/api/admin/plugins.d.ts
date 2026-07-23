/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
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
 *    value }` with every `secret:true` value replaced by the mask sentinel `***`,
 *    so it CANNOT distinguish a configured secret from an empty one —
 *    `secret_status` is the only thing that can.
 *  - `POST /plugins/install` `{ url }` → `201` manifest, or `400`/`422` with a
 *    `{ code }` the UI surfaces (see {@link pluginErrorCode}).
 *  - `POST /plugins/{name}/enable` / `/disable` → `200`.
 *  - `DELETE /plugins/{name}` → `204` (uninstall).
 *  - `PUT /plugins/{name}/settings` `{ settings: {...} }` → validates unknown keys
 *    / type mismatches (`400 plugin.settings.validation_failed` with
 *    `{ errors: { key: msg } }`), MERGES the accepted keys over the stored
 *    settings, and returns the refreshed masked detail. SECRET RULE: a secret
 *    submitted as the `***` mask sentinel is treated as unchanged and is NOT
 *    overwritten. The configure forms do not rely on that round-trip: they start
 *    secret inputs EMPTY and omit a blank secret from the payload entirely, so
 *    the mask never enters the DOM and the stored value survives untouched.
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
    /** Optional "where to get this value" URL (from the manifest or the server field-help overlay). */
    link?: string;
    /** Optional anchor text for {@link link}; defaults to a generic label in the UI. */
    link_text?: string;
    /**
     * OPTIONAL disclosure tier, mirroring the server-settings schema `tier`
     * keyword (plan §3.2/§3.3). A manifest or field-help overlay that predates the
     * concept simply omits it, and the UI treats a missing tier as `standard`.
     */
    tier?: 'standard' | 'advanced';
}
/** The manifest settings schema: one descriptor per setting key. */
export type PluginSettingsSchema = Record<string, PluginSettingDescriptor>;
/** Current (masked) setting values: secrets are replaced by {@link PLUGIN_SECRET_MASK}. */
export type PluginSettings = Record<string, unknown>;
/**
 * Per-secret "is it set?" status: whether a non-empty value is stored and its
 * character length (never the value itself). Lets the configure form tell a set
 * secret from an unset one and render a length-appropriate row of dots.
 *
 * Structurally identical to the server-settings {@link SecretStatus} — both
 * mirror the one server-side shape (`SettingsMasker::secretStatus()`), which the
 * plugin detail endpoint emits under the snake_case key `secret_status` and the
 * settings endpoint under `secretStatus`.
 */
export interface PluginSecretStatus {
    set: boolean;
    length: number;
}
/** Map of secret setting key → {@link PluginSecretStatus} (only secret keys appear). */
export type PluginSecretStatusMap = Record<string, PluginSecretStatus>;
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
    /** Per-secret set/length status (secret keys only); absent on older servers. */
    secret_status?: PluginSecretStatusMap;
    /** Optional redirect URL for OAuth-style plugins. */
    redirect_url?: string;
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
/**
 * One selectable catalog release-channel option (S27), as emitted by the
 * server's `channelInfo()`. `advanced:true` + the `description` flag the `dev`
 * channel as opt-in so the admin UI can gate it clearly; the description is the
 * server-side source of truth for WHY `dev` differs (it tracks the moving
 * `master` branch, and per-entry pin+checksum verification still gates every
 * install regardless of channel).
 */
export interface CatalogChannelOption {
    /** The wire value to PUT back: `stable` | `dev`. */
    value: string;
    /** Human label, e.g. `Stable (recommended)` / `Development (advanced)`. */
    label: string;
    /** Server-authored explanation of what the channel does (opt-in warning for `dev`). */
    description: string;
    /** True for opt-in / advanced channels (`dev`) — the UI marks these prominently. */
    advanced: boolean;
}
/**
 * The catalog release-channel state: the currently-selected channel plus the
 * option metadata to render (S27). Returned by both `GET` and `PUT
 * /plugins/catalog/channel`, and embedded in the catalog `index()` response
 * under `channel`.
 */
export interface CatalogChannelInfo {
    /** The active channel value (`stable` default | `dev`). */
    channel: string;
    /** Every selectable channel with its label/description/advanced metadata. */
    options: CatalogChannelOption[];
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
    /** The catalog release-channel state (S27); absent on older servers. */
    channel?: CatalogChannelInfo;
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
 * Coerce the raw `channel` payload into a well-typed {@link CatalogChannelInfo},
 * defending every field so a malformed / older-server response degrades to the
 * safe `stable` default with no options rather than throwing. Options that lack
 * a `value` are dropped.
 */
export declare function normaliseChannelInfo(raw: unknown): CatalogChannelInfo;
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
    /** `GET /api/v1/admin/plugins/{name}` → unwraps `{ plugin }` (schema + masked settings + secret status). */
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
     * `GET /api/v1/admin/plugins/catalog/channel` (S27) → the selected catalog
     * release channel plus its option metadata. The response is defended to the
     * safe `stable` default so an older server (no such endpoint / no `channel`
     * key) degrades gracefully.
     */
    getChannel(): Promise<CatalogChannelInfo>;
    /**
     * `PUT /api/v1/admin/plugins/catalog/channel` `{ channel }` (S27) → the
     * persisted channel + options. The server normalises anything that is not
     * `dev` back to `stable`, so the UI binds to the confirmed value it returns.
     * A `400 plugin.catalog.channel.invalid` surfaces as an {@link ApiError}.
     */
    setChannel(channel: string): Promise<CatalogChannelInfo>;
    /**
     * `PUT /api/v1/admin/plugins/{name}/settings` `{ settings }` → the refreshed
     * masked {@link PluginDetail}. Pass ONLY the keys the admin changed; a secret
     * left at the `***` mask is preserved server-side (omit it, or send `***`).
     * A `400 plugin.settings.validation_failed` surfaces as an {@link ApiError} —
     * read its per-field map with {@link pluginValidationErrors}.
     */
    updateSettings(name: string, settings: PluginSettings): Promise<PluginDetail>;
    /**
     * `POST /api/v1/admin/plugins/{name}/test` `{ settings }` → tests credentials
     * and returns `{ success: boolean; message: string }`.
     *
     * Pass the settings the admin has TYPED, using the same rules as
     * {@link updateSettings}: only the changed keys, and a secret only when a new
     * value was actually entered. An untouched secret must be OMITTED — never sent
     * as {@link PLUGIN_SECRET_MASK}, which the plugin would test as a literal
     * credential. The server instantiates the plugin entry with its *persisted*
     * settings before calling `testCredentials()` (`PluginLoader::getEntryInstance()`
     * → `applyPersistedSettings()`), so an omitted secret is still available to the
     * plugin under test; the submitted map is the delta layered on top.
     *
     * `settings` is deliberately `unknown`-valued rather than string-valued:
     * booleans and numbers must reach the plugin as their real JSON types, not as
     * `"true"`/`"30"`, or a plugin that type-checks its own config sees the wrong
     * shape.
     *
     * Failure modes worth distinguishing at the call site:
     *  - `501 plugin.test_not_supported` — the plugin implements no
     *    `testCredentials()` method. That is a capability gap, NOT a failed test,
     *    and must not be presented as "credentials are invalid".
     *  - `404 plugin.not_found` — no such installed plugin / entry class.
     * A plugin whose own test throws is mapped server-side to a normal
     * `200 { success: false, message }`, so a rejected promise always means the
     * request itself failed.
     *
     * SECURITY: the server scrubs every submitted credential out of `message`
     * before it is returned (`PluginAdminController::redactSubmittedSecrets()`),
     * because a plugin's exception text routinely embeds a request URI carrying
     * the API key. Do not log this response, and render `message` only in the
     * result line the admin asked for.
     */
    testCredentials(name: string, settings: Record<string, unknown>): Promise<{
        success: boolean;
        message: string;
    }>;
}
