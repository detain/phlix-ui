/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import type { ApiClient } from '../client';

/**
 * Shape of the `GET /api/v1/admin/settings` response `data` envelope.
 *
 * `settings` is a flat map of dotted setting key → current value (mixed types).
 * `overridden` lists the keys whose value differs from the env/config default
 * (rendered with a "custom" badge). `types` maps each key to its schema type
 * (`bool` | `int` | `float` | `string`) so the UI knows how to render + coerce.
 */
export interface SettingsResponse {
  settings: Record<string, unknown>;
  overridden: string[];
  types: Record<string, string>;
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
export class AdminSettingsApi {
  constructor(private readonly client: ApiClient) {}

  /**
   * `GET /api/v1/admin/settings` → unwraps `{ data: { settings, overridden, types } }`.
   */
  async get(): Promise<SettingsResponse> {
    const { data } = await this.client.get<{ data: Partial<SettingsResponse> }>(
      '/api/v1/admin/settings',
    );
    return {
      settings: isRecord(data?.settings) ? data.settings : {},
      overridden: Array.isArray(data?.overridden) ? data.overridden : [],
      types: isRecord(data?.types) ? (data.types as Record<string, string>) : {},
    };
  }

  /**
   * `PUT /api/v1/admin/settings` → unwraps `{ data: { settings, overridden } }`.
   *
   * @param settings - A map of only the changed setting key → coerced value
   *   (bool/int/float/string). The controller validates + persists them.
   */
  async save(settings: Record<string, unknown>): Promise<SettingsSaveResponse> {
    const { data } = await this.client.put<{ data: Partial<SettingsSaveResponse> }>(
      '/api/v1/admin/settings',
      { settings },
    );
    return {
      settings: isRecord(data?.settings) ? data.settings : {},
      overridden: Array.isArray(data?.overridden) ? data.overridden : [],
    };
  }
}

/** Narrow an `unknown` to a plain `Record<string, unknown>`. */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
