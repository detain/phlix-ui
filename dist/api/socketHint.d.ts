/**
 * R12-02 — the `window.__PHLIX__` WebSocket-endpoint seam.
 *
 * The estate problem this closes: the SPA derives its socket URLs from the PAGE
 * origin plus a hardcoded port (`:8097` SyncPlay direct, `:8804` hub relay).
 * Behind a TLS-terminating proxy that is wrong twice over — https pages escalate
 * to `wss://host:<plaintext-port>` and the handshake dies as a silent 1006 loop
 * the user can never diagnose — and an operator running the socket on any other
 * host/port has no lever at all.
 *
 * The fix is host-injected, per the contract phlix-hub `6175184` shipped (and
 * phlix-server mirrors in its own shell lane): the server-rendered shell may add
 * two fields to the `window.__PHLIX__` bootstrap payload:
 *
 * - `wsUrl`  — `string | null` — explicit `ws(s)://host[:port]`, NO path, query,
 *              or userinfo (env `HUB_WS_URL` on the hub).
 * - `wsPath` — `string | null` — a single absolute path like `/syncplay`
 *              (env `HUB_WS_PATH`).
 *
 * Precedence law: a VALID `wsUrl` wins over every same-origin derivation;
 * `null`/absent/invalid ⇒ the legacy behavior ships unchanged, so a page served
 * without the seam behaves byte-identically to the previous bundle. `wsPath`
 * only refines a present `wsUrl` (a path without a host cannot move a port) and
 * is only consulted by the socket whose URL carries a path (the hub relay);
 * the `:8097` direct socket's worker ignores request paths, so its URL stays
 * query-only.
 *
 * Fail-soft doctrine: anything malformed in the injected payload parses to
 * `null` here and falls back — a broken operator hint must never brick the
 * socket that a working legacy derivation could have dialed.
 *
 * HTTPS note (no seam configured): the legacy derivation escalates the scheme
 * with the page (`https:` ⇒ `wss:`). Against a plaintext-only listener the
 * browser reports the failed handshake as close-code 1006; the socket surfaces
 * it through the existing `onStatusChange` / `onDisconnect` callbacks and (per
 * R12-07) the injectable logger — never as console noise by default.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** The validated seam, as the socket builders consume it. */
export interface PhlixSocketHint {
    /** `ws(s)://host[:port]` with no path/query/userinfo, or `null` = not set. */
    readonly wsUrl: string | null;
    /** A single absolute path (`/syncplay`), trailing slashes trimmed, or `null`. */
    readonly wsPath: string | null;
}
/** Parse one injected value into the validated hint. Never throws. */
export declare function parseSocketHint(config: unknown): PhlixSocketHint;
/** Read + validate the seam from the live `window.__PHLIX__` payload (SSR-safe). */
export declare function readSocketHint(): PhlixSocketHint;
