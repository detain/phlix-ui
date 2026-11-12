/**
 * Device-session management client — the auth-token family (D-1a).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient, ApiError } from './client';

/**
 * One active login session of the signed-in account.
 *
 * The shape is the VERBATIM server wire (phlix-server 413765b6,
 * `AuthController::listTokenSessions`: id/created_at/last_used_at/device_type/
 * device_name SELECT columns + the controller-computed `current` flag), and
 * the hub (c0ed2c28, `AuthController::indexUserTokenSessions`) serves the
 * byte-identical twin — so this page works on both mounts with no proxy leg.
 *
 * What each field honestly is:
 *  - `device_type` / `device_name` arrive as UNTRUSTED client-supplied strings
 *    (the registering client states them; the server stores VARCHAR(255) or
 *    NULL and verifies nothing). Surfaces without a device concept (API
 *    tokens, the console TUI) legitimately leave them NULL — render as
 *    "unknown", never guess a kind the wire did not say.
 *  - `created_at` / `last_used_at` are MySQL TIMESTAMP text ('YYYY-MM-DD
 *    HH:MM:SS') on the SERVER clock with NO timezone marker. Display code
 *    must not fabricate a conversion — see the page's date formatter.
 *  - `current` is the session that authenticated THIS request. Revoking it
 *    succeeds and signs the caller out, so the UI never offers that action
 *    (it renders the row as read-only "this device" instead). Exact scope:
 *    a claim-less pre-055 legacy token carries no session claim, so no row
 *    can be marked `current` for it; the law holds for every row the wire
 *    does flag, and that edge simply shows no "this device" row.
 *
 * There is deliberately NO "revoke all others" endpoint: the server register
 * (.reviews/2026-11-10/FIX-server-CP029-d1a.md :90-96) ships exactly two
 * routes — the list above and `DELETE /api/v1/auth/sessions/{id}` — and the
 * contracts route manifest at 418 tuples carries nothing else under
 * `/auth/sessions`. The bulk action is composed CLIENT-side from single
 * revocations (bounded sequential fan-out in the page).
 *
 * Errors REJECT untouched (the themeSettings.ts law): this seam classifies
 * nothing; the page owns disclosure through `wireErrorLine`.
 */
export interface DeviceSessionRow {
  id: string;
  current: boolean;
  created_at: string | null;
  last_used_at: string | null;
  device_type: string | null;
  device_name: string | null;
}

const SESSIONS_ENDPOINT = '/api/v1/auth/sessions';

/**
 * The server's hard row cap for the list (phlix-server + phlix-hub
 * `TokenSessionRepository::MAX_LISTED_SESSIONS = 200`, `LIMIT` on the
 * `last_used_at DESC` query). A list this long may be truncated — the page
 * must say so rather than present it as the complete set.
 */
export const DEVICE_SESSIONS_LIST_CAP = 200;

/**
 * The list response carried no `sessions` array. Deliberately message-light
 * and English-free in the UI path: the page maps it to its own localized
 * load-error line (a raw `Error.message` would otherwise surface through
 * `errMessage`).
 */
export class MalformedSessionsEnvelopeError extends Error {
  constructor() {
    super('Malformed /api/v1/auth/sessions envelope: missing or non-array "sessions"');
    this.name = 'MalformedSessionsEnvelopeError';
  }
}

/**
 * List the account's ACTIVE sessions, server-ordered by `last_used_at DESC`.
 *
 * The server sorts; the client must not re-sort (a locale-aware re-order
 * would fight the wire contract's stated order). Malformed rows — missing/
 * non-string `id` — are dropped at this parse boundary, never rendered as
 * ghosts.
 *
 * MALFORMED ≠ EMPTY (UI-14): an envelope without a `sessions` ARRAY (proxy
 * HTML page, captive portal, future reshaping) REJECTS with
 * {@link MalformedSessionsEnvelopeError}. On a security screen "No active
 * sessions" is a claim about the account; it may only render when the
 * server actually said `{"sessions": []}`, never as the fallback for a body
 * we could not read.
 *
 * At most {@link DEVICE_SESSIONS_LIST_CAP} rows ever arrive (the server's
 * `LIMIT`); the page discloses a full page as "200+" (UI-41).
 */
export async function fetchDeviceSessions(apiBase: string, signal?: AbortSignal): Promise<DeviceSessionRow[]> {
  const client = new ApiClient({ baseUrl: apiBase });
  const res = await client.get<{ sessions?: unknown }>(SESSIONS_ENDPOINT, undefined, signal);

  const rows: unknown = (res as { sessions?: unknown } | null)?.sessions;
  if (!Array.isArray(rows)) {
    throw new MalformedSessionsEnvelopeError();
  }

  const sessions: DeviceSessionRow[] = [];
  for (const raw of rows) {
    if (typeof raw !== 'object' || raw === null) continue;
    const row = raw as Record<string, unknown>;
    if (typeof row.id !== 'string' || row.id === '') continue;
    sessions.push({
      id: row.id,
      current: row.current === true,
      created_at: typeof row.created_at === 'string' ? row.created_at : null,
      last_used_at: typeof row.last_used_at === 'string' ? row.last_used_at : null,
      device_type: typeof row.device_type === 'string' && row.device_type !== '' ? row.device_type : null,
      device_name: typeof row.device_name === 'string' && row.device_name !== '' ? row.device_name : null,
    });
  }
  return sessions;
}

/**
 * Revoke ONE session by id. Resolves on the server's 204 (also on the
 * idempotent 204 for an already-revoked OWN-family row); rejects with the
 * untouched `ApiError` on anything else — a 404 means unknown-or-foreign id
 * (the server returns a uniform "Session not found" for both, no oracle).
 */
export async function revokeDeviceSession(apiBase: string, id: string, signal?: AbortSignal): Promise<void> {
  const client = new ApiClient({ baseUrl: apiBase });
  await client.delete(`${SESSIONS_ENDPOINT}/${encodeURIComponent(id)}`, signal);
}

/**
 * True when a revoke rejection means the session is ALREADY gone (404:
 * unknown-or-foreign-or-expired id, uniform on the server). For a bulk
 * sign-out that is the desired end state, so the fan-out counts it as
 * success and continues; every other failure remains a genuine error.
 */
export function isSessionGoneError(e: unknown): boolean {
  return e instanceof ApiError && e.status === 404;
}
