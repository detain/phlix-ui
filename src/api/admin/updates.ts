/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { ApiClient } from '../client';

/**
 * The core (application) update-check status, as returned by BOTH backends'
 * `GET /api/v1/admin/updates/status` (S74 phlix-server / S75 phlix-hub).
 *
 * The two services deliberately ship the SAME wire shape — envelope
 * `{ success, data }` with camelCase keys — so one parser serves both:
 *  - phlix-server `src/Server/Updates/CoreUpdateStatus.php::toArray()` (:64-75)
 *  - phlix-hub    `src/Hub/Updates/CoreUpdateStatus.php::toArray()`    (:63-74)
 *
 * Field-by-field, both `toArray()` implementations emit exactly:
 * `currentVersion`, `latestVersion`, `updateAvailable`, `checkEnabled`,
 * `lastCheckedAt`, `lastError`, `updateCommand` — nothing else.
 */
export interface CoreUpdateStatus {
  /** The running build (`Version::STRING` / `Version::VERSION`). */
  currentVersion: string;
  /** Last successfully fetched remote version marker, or null if never fetched. */
  latestVersion: string | null;
  /** True when `latestVersion` is strictly newer. Computed by the BACKEND — the UI never re-derives it. */
  updateAvailable: boolean;
  /** Effective `updates.check_enabled` setting. */
  checkEnabled: boolean;
  /** Unix timestamp (SECONDS, from PHP `time()`) of the last completed check, or null. */
  lastCheckedAt: number | null;
  /** Error recorded by the last FAILED background check, or null when the last check was clean. */
  lastError: string | null;
  /** Copy-to-clipboard shell command that performs the update. Supplied by the service; never built here. */
  updateCommand: string;
}

/** The status path. Identical on phlix-server and phlix-hub — that is the point. */
export const ADMIN_UPDATES_STATUS_ENDPOINT = '/api/v1/admin/updates/status';

type Raw = Record<string, unknown>;

function isRecord(value: unknown): value is Raw {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** A trimmed non-empty string, else null. Blank/whitespace reads as "absent", not as a value. */
function asOptionalString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

/** A finite number (numeric strings parse), else null. */
function asOptionalNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

/**
 * Parse one status payload into {@link CoreUpdateStatus}.
 *
 * ## Two deliberately DIFFERENT boolean defaults
 *
 * `updateAvailable` is `=== true` (strict): an unrecognised value must never be
 * read as "an update is waiting", or a malformed payload would nag every admin
 * forever. Note this rejects the STRING `'true'` on purpose — both backends type
 * the field `bool`, so a string here means the payload is not the contract, and
 * accepting truthy strings would also accept `'false'` (a truthy string) as an
 * update. Same reasoning as `updateSettings()`'s `is_bool()` refusal to coerce.
 *
 * `checkEnabled` is `!== false` (defaults TRUE): it only ever SUPPRESSES the
 * "your update check is broken" warning, so an unrecognised value must not be
 * read as "the operator turned checking off" — that would silence exactly the
 * signal the banner exists to carry.
 *
 * @param raw The `data` object (or a whole `{success, data}` envelope).
 */
export function parseCoreUpdateStatus(raw: unknown): CoreUpdateStatus {
  const envelope = isRecord(raw) ? raw : {};
  // Both services wrap the DTO in `{ success, data }`; tolerate a bare DTO too.
  const d = isRecord(envelope['data']) ? envelope['data'] : envelope;

  return {
    currentVersion: asOptionalString(d['currentVersion']) ?? '',
    latestVersion: asOptionalString(d['latestVersion']),
    updateAvailable: d['updateAvailable'] === true,
    checkEnabled: d['checkEnabled'] !== false,
    lastCheckedAt: asOptionalNumber(d['lastCheckedAt']),
    lastError: asOptionalString(d['lastError']),
    updateCommand: asOptionalString(d['updateCommand']) ?? '',
  };
}

/**
 * AdminUpdatesApi (S76) — typed wrapper over the core update-check status
 * endpoint, consumed by `UpdateAvailableBanner`.
 *
 * There is intentionally NO apply/upgrade method: neither backend exposes one
 * (both refuse to run git/composer/systemctl from an HTTP handler), and
 * `updateCommand` is a string for the operator to paste into a root shell.
 */
export class AdminUpdatesApi {
  constructor(private readonly client: ApiClient) {}

  /**
   * `GET /api/v1/admin/updates/status` → the host service's update-check state.
   *
   * Resolves against whichever service hosts the admin console (phlix-server or
   * phlix-hub); the path and payload are identical on both.
   */
  async getStatus(signal?: AbortSignal): Promise<CoreUpdateStatus> {
    const raw = await this.client.get<unknown>(ADMIN_UPDATES_STATUS_ENDPOINT, undefined, signal);
    return parseCoreUpdateStatus(raw);
  }
}
