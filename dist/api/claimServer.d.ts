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
export declare class ClaimError extends Error {
    readonly kind: ClaimErrorKind;
    constructor(kind: ClaimErrorKind, message: string);
}
export interface ClaimServerResult {
    serverId: string;
}
/**
 * @param apiBase  Origin to hit (default `''` → same-origin relative URL).
 * @param claimCode The code shown on the media server's "connect to hub" screen.
 */
export declare function claimServer(apiBase: string, claimCode: string, signal?: AbortSignal): Promise<ClaimServerResult>;
