/**
 * Small shape-normalization helpers for reconciling hub/server JSON responses
 * with the SPA's display models. Pure + dependency-free.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Convert a UNIX timestamp in SECONDS (the hub returns `created_at`/`expires_at`/
 * `lastSeenAt` as integer seconds) to an ISO-8601 string the UI can pass to
 * `new Date(...)`. Returns `undefined` for null/undefined/non-numeric input so
 * callers render a placeholder rather than `Invalid Date`.
 *
 * Already-ISO string inputs are passed through unchanged (defensive: some
 * endpoints/back ends already send a string).
 */
export declare function unixToIso(value: number | string | null | undefined): string | undefined;
