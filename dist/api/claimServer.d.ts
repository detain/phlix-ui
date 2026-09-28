/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Links ("claims") a media server to the signed-in hub user by posting the
 * claim code the server displays. Hits `POST /api/v1/server-claims/claim`, which
 * the hub gates with BOTH the user's Bearer token AND an
 * `Accept-Phlix-Protocol: v1` header — the latter is hub-protocol-specific and
 * not sent by the generic ApiClient, so this is a small dedicated helper rather
 * than a plain `api.post`.
 *
 * Resolves with the claimed server id on success; rejects with a {@link ClaimError}
 * whose `kind` lets the caller show a precise, friendly message.
 */
export type ClaimErrorKind = 'empty' | 'not_found' | 'expired' | 'already_claimed' | 'unauthorized' | 'invalid' | 'network';
/**
 * Hub claim failures parsed at this boundary.
 *
 * `code` carries the server's stable machine code when the wire supplied one
 * (the `{ error|message, code }` envelope). Error-code doctrine: components
 * localize THAT via `errorCodeMessage` from `src/i18n/errors.ts` — the catalog
 * already registers `claim.code_not_found` / `claim.code_expired` /
 * `claim.code_already_claimed` and `auth.unauthenticated` for exactly these
 * failures. `kind`/`message` remain as the status-guessed English fallback for
 * consumers (and servers) that predate the code, so nothing that reads today's
 * shape breaks; `code` is what makes localization possible at all.
 */
export declare class ClaimError extends Error {
    readonly kind: ClaimErrorKind;
    /** Server machine code (e.g. `claim.code_expired`), null when absent. */
    readonly code: string | null;
    constructor(kind: ClaimErrorKind, message: string, 
    /** Server machine code (e.g. `claim.code_expired`), null when absent. */
    code?: string | null);
}
export interface ClaimServerResult {
    serverId: string;
}
/**
 * @param apiBase  Origin to hit (default `''` → same-origin relative URL).
 * @param claimCode The code shown on the media server's "connect to hub" screen.
 */
export declare function claimServer(apiBase: string, claimCode: string, signal?: AbortSignal): Promise<ClaimServerResult>;
