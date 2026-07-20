/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
/**
 * Metadata for a single setting, providing UI hints like labels, help text,
 * validation bounds, enum options, and whether changing the value requires a
 * service restart.
 */
export interface SettingMeta {
    label: string;
    helpText: string;
    helpLinks: Array<{
        text: string;
        url: string;
    }>;
    tier: 'standard' | 'advanced';
    group: string;
    /**
     * OPTIONAL human-readable caption for {@link group}. The server does not emit
     * this today — the UI derives a tab caption from the group key — but the field
     * is honoured when present so the server can become the single authority for
     * group captions without a UI change.
     */
    groupLabel?: string;
    enum: string[] | null;
    enumLabels: Record<string, string> | null;
    optionHelp: Record<string, string> | null;
    minimum: number | null;
    maximum: number | null;
    default: unknown;
    secret: boolean;
    restart: boolean;
}
/**
 * Sentinel the server substitutes for every `secret: true` value before it
 * leaves the process — the server-side constant is `SettingsMasker::MASK`.
 *
 * A secret's real value NEVER reaches the browser, so this is what
 * `settings[<secretKey>]` contains for a configured secret AND for an empty
 * one; {@link SettingsResponse.secretStatus} is the only way to tell them
 * apart. Re-submitting this exact string on a PUT is the server's "unchanged"
 * signal and is skipped rather than persisted.
 *
 * Identical by construction to {@link PLUGIN_SECRET_MASK} — both mirror the one
 * server constant. `settings.masker-parity.test.ts` asserts they stay in step.
 */
export declare const SETTINGS_SECRET_MASK = "***";
/**
 * Per-secret "is it actually set?" summary emitted alongside the masked
 * `settings` map, mirroring the server's `secretStatus()`.
 *
 * Carries no secret material: only whether a non-empty value is stored and how
 * many characters it has, so the UI can distinguish a configured secret from an
 * unconfigured one without ever receiving the value.
 */
export interface SecretStatus {
    set: boolean;
    length: number;
}
/**
 * Shape of the `GET /api/v1/admin/settings` response `data` envelope.
 *
 * `settings` is a flat map of dotted setting key → current value (mixed types),
 * with every `secret: true` key's value replaced by
 * {@link SETTINGS_SECRET_MASK}. `overridden` lists the keys whose value differs
 * from the env/config default (rendered with a "custom" badge). `types` maps
 * each key to its schema type (`bool` | `int` | `float` | `string`) so the UI
 * knows how to render + coerce. `meta` maps each key to its full metadata for
 * rendering help, labels, and validation hints. `secretStatus` is keyed by
 * secret key only and says whether each one is configured.
 */
export interface SettingsResponse {
    settings: Record<string, unknown>;
    overridden: string[];
    types: Record<string, string>;
    meta: Record<string, SettingMeta>;
    secretStatus: Record<string, SecretStatus>;
}
/**
 * Shape of the `PUT /api/v1/admin/settings` success `data` envelope. The save
 * response echoes the (re-resolved) settings + the new overridden list, but not
 * the `types` map (which never changes).
 */
export interface SettingsSaveResponse {
    settings: Record<string, unknown>;
    overridden: string[];
}
/**
 * AdminSettingsApi (RA.16) — typed wrapper over the admin server-settings
 * endpoints (`/api/v1/admin/settings`), ported 1:1 from the deleted React
 * `SettingsApi`. Reads the full grouped settings map (`get`) and persists a
 * partial set of changed key/value pairs (`save`).
 *
 * Both endpoints wrap their payload in the shared `{ success, data }` envelope;
 * the verbs unwrap `data` and defensively normalise the list/record fields so a
 * malformed payload degrades to empty rather than throwing. Non-2xx responses
 * (e.g. a 400 with per-field `errors`) surface as `ApiError` via the shared
 * client.
 */
export declare class AdminSettingsApi {
    private readonly client;
    constructor(client: ApiClient);
    /**
     * `GET /api/v1/admin/settings` → unwraps
     * `{ data: { settings, overridden, types, meta, secretStatus } }`.
     *
     * A server too old to emit `secretStatus` yields `{}`, which the UI reads as
     * "unknown" rather than "not configured".
     */
    get(): Promise<SettingsResponse>;
    /**
     * `PUT /api/v1/admin/settings` → unwraps `{ data: { settings, overridden } }`.
     *
     * @param settings - A map of only the changed setting key → coerced value
     *   (bool/int/float/string). The controller validates + persists them.
     */
    save(settings: Record<string, unknown>): Promise<SettingsSaveResponse>;
    /**
     * `POST /api/v1/admin/restart` → sends a restart signal to the server.
     * Returns `{ message }` on success.
     */
    restartServer(): Promise<{
        message: string;
    }>;
}
