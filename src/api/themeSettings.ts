/**
 * Per-user THEME setting client — the narrow seam over the settings endpoint.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';

/**
 * The server keeps a per-user theme (`PUT /api/v1/users/me/settings`), which
 * is what makes a chosen theme follow the account across devices — including
 * choices made in non-browser clients like the console TUI. The web portal
 * previously persisted the theme to `localStorage` only, so every device
 * drifted on its own.
 *
 * Deliberate scope limit: this seam knows the SINGLE field `theme` and
 * nothing else. The endpoint carries many settings, but every one of them
 * already has its own client path; inventing a generic wrapper here would
 * create a second, divergent way to write the same rows.
 *
 * Two server facts shape the contract (verified against phlix-server
 * `UserRepository`/`WebPortalRouter`):
 *  - `GET` returns the settings map with the `theme` key PRESENT ONLY WHEN a
 *    theme was actually saved — a fresh account legitimately has none, which
 *    this module reports as `null`, never as an error;
 *  - `PUT` accepts the flat single-field body (`{"theme": …}`); the server
 *    upserts exactly the columns supplied, so this call cannot stomp other
 *    settings.
 *
 * The HUB serves NEITHER route (no `/api/v1/users/me/settings`, no
 * `/api/v1/themes`) — on a hub mount both verbs fail with 404. That is a
 * normal, expected deployment, so failures here are PROPAGATED untouched and
 * swallowed in exactly one place: `useThemeSyncStore`, whose whole design is
 * "server state is a bonus". A silent catch spread across layers would make
 * the degrade untestable; one silent catch in the store keeps the law honest.
 */

/**
 * Read the server-side theme id for the signed-in user, or `null` when the
 * account has none saved (or the value is not a usable string).
 *
 * Transport/auth/refusal errors REJECT (see the module docblock for why the
 * caller — not this function — owns the silence).
 */
export async function fetchThemeSetting(apiBase: string, signal?: AbortSignal): Promise<string | null> {
  const client = new ApiClient({ baseUrl: apiBase });
  const res = await client.get<{ settings?: unknown }>('/api/v1/users/me/settings', undefined, signal);

  // A malformed envelope (proxy HTML page, future reshaping) degrades to
  // "no server theme" rather than adopting garbage.
  const raw = (res as { settings?: unknown } | null | undefined)?.settings;
  if (typeof raw !== 'object' || raw === null) return null;

  const theme = (raw as Record<string, unknown>).theme;
  return typeof theme === 'string' && theme !== '' ? theme : null;
}

/**
 * Persist the theme for the signed-in user. Resolves on 2xx; rejects on
 * anything else (unknown-theme 400 from the server's own validation, hub 404,
 * auth, network) — the caller records the failure for the inline disclosure
 * and never rolls back the instant local repaint.
 */
export async function putThemeSetting(apiBase: string, theme: string, signal?: AbortSignal): Promise<void> {
  const client = new ApiClient({ baseUrl: apiBase });
  await client.put('/api/v1/users/me/settings', { theme }, signal);
}
