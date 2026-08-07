/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';

/**
 * Typed wrapper over the hub's MCP personal-access-token endpoints (S62 API,
 * S243 UI).
 *
 * ⚠ These are **hub session** endpoints. They sit inside the hub's auth-gated
 * route group (`phlix-hub/src/Application.php:497-519`), so the credential that
 * authenticates them is the ordinary hub **session JWT** the SPA already holds.
 * An MCP personal access token is useless here and must never be presented to
 * this surface — its only audience is `POST /mcp`.
 *
 * | method   | path                            | controller                       |
 * |----------|---------------------------------|----------------------------------|
 * | `GET`    | `/api/v1/me/mcp-tokens`         | `McpTokenController::index()`    |
 * | `POST`   | `/api/v1/me/mcp-tokens`         | `McpTokenController::create()`   |
 * | `DELETE` | `/api/v1/me/mcp-tokens/{id}`    | `McpTokenController::revoke()`   |
 *
 * ## The plaintext is SHOW-ONCE
 *
 * `POST` is the only response that has ever carried a `token` field, and it
 * carries it exactly once: `McpTokenService::mint()` stores only the SHA-256
 * hash, and `listForUser()` selects `id, name, scopes, created_at, expires_at,
 * last_used_at, revoked_at` — there is no column that could return the
 * plaintext, so no endpoint can show it again. A user who dismisses the reveal
 * without copying has lost the credential permanently; the only recovery is
 * revoke-and-remint. {@link McpTokenSummary} deliberately has no `token` field
 * so the type system cannot be talked into reading one.
 */

/**
 * The scopes this build knows about, mirroring `McpScopes::all()`
 * (`phlix-hub/src/Mcp/McpScopes.php:66-73`) in its stable order.
 *
 * ⚠ This is a **fallback only**. The create form offers whatever
 * `GET /api/v1/me/mcp-tokens` reports in `available_scopes` (which the hub
 * builds from `McpScopes::all()` itself), so a hub that gains or drops a scope
 * needs no UI release. The constant covers the single case where the list
 * response omits the field, and it is pinned against the PHP source by
 * `mcp-tokens.test.ts` so the two cannot drift silently.
 */
export const MCP_SCOPES = [
    'mcp:servers:read',
    'mcp:library:read',
    'mcp:playback:read',
] as const;

/** One of the scopes {@link MCP_SCOPES} enumerates. */
export type McpScope = (typeof MCP_SCOPES)[number];

/**
 * Human copy for each scope, so the create form explains what it is granting
 * rather than showing a bare `mcp:library:read`. Keyed by the wire value; an
 * unrecognised scope (a hub newer than this build) falls back to its raw
 * string via {@link scopeLabel}, so a new server-side scope is still selectable.
 */
export const MCP_SCOPE_LABELS: Readonly<Record<string, string>> = {
    'mcp:servers:read': 'List my servers',
    'mcp:library:read': 'Read library and media metadata',
    'mcp:playback:read': 'Read playback information',
};

/** Longer explanation per scope, shown under its label in the create form. */
export const MCP_SCOPE_DESCRIPTIONS: Readonly<Record<string, string>> = {
    'mcp:servers:read': 'Enumerate the media servers this account owns.',
    'mcp:library:read': 'Browse libraries and read media metadata over the relay.',
    'mcp:playback:read': 'Read stream decisions for an owned media item.',
};

/** The label for a scope, falling back to the raw wire value when unknown. */
export function scopeLabel(scope: string): string {
    return MCP_SCOPE_LABELS[scope] ?? scope;
}

/** The description for a scope, or '' when this build has no copy for it. */
export function scopeDescription(scope: string): string {
    return MCP_SCOPE_DESCRIPTIONS[scope] ?? '';
}

/**
 * The prefix every minted plaintext carries
 * (`McpTokenService::TOKEN_PREFIX`). Used only for display/verification hints —
 * never as an authentication decision.
 */
export const MCP_TOKEN_PREFIX = 'phlix-mcp-';

/**
 * One row of `GET /api/v1/me/mcp-tokens` — metadata ONLY.
 *
 * Revoked and expired rows are included so the owner can see their history;
 * each carries its own flag. Timestamps are absolute Unix **seconds**
 * (`UNIX_TIMESTAMP(...)` in `McpTokenService::listForUser()`), and
 * `last_used_at` is `null` for a token that has never authenticated a call.
 */
export interface McpTokenSummary {
    id: string;
    name: string;
    scopes: string[];
    created_at: number;
    expires_at: number;
    last_used_at: number | null;
    revoked: boolean;
    expired: boolean;
}

/** Envelope of `GET /api/v1/me/mcp-tokens`. */
export interface McpTokenListResponse {
    tokens: McpTokenSummary[];
    /** `McpScopes::all()` as the hub currently defines it. */
    available_scopes: string[];
}

/** Body of `POST /api/v1/me/mcp-tokens`. Both members are optional on the wire. */
export interface MintMcpTokenInput {
    /** Operator label, truncated server-side to 191 chars. */
    name?: string;
    /**
     * Scopes to request. Unknown members are dropped by `McpScopes::fromArray()`;
     * a list with nothing known left is a **400** (`mcp_token.no_valid_scopes`),
     * not a token that authenticates but authorises nothing. Omitting the key
     * entirely grants every scope.
     */
    scopes?: string[];
}

/**
 * 201 body of `POST /api/v1/me/mcp-tokens` — the ONLY response that ever
 * carries the plaintext.
 */
export interface McpTokenMinted {
    id: string;
    /** The plaintext, prefixed `phlix-mcp-`. Shown once; never retrievable. */
    token: string;
    name: string;
    scopes: string[];
    /** Absolute Unix expiry (seconds). Always finite; default lifetime 90 days. */
    expires_at: number;
}

/** 200 body of `DELETE /api/v1/me/mcp-tokens/{id}`. */
export interface McpTokenRevoked {
    revoked: boolean;
    id: string;
}

/**
 * Thin typed wrapper around the three MCP-token endpoints. Modelled on
 * {@link ../api/invite-links.InviteLinksApi} — same shape, same injection seam
 * for tests.
 */
export class McpTokensApi {
    constructor(private client: ApiClient) {}

    /** List the caller's tokens (metadata only) plus the hub's scope vocabulary. */
    list(): Promise<McpTokenListResponse> {
        return this.client.get<McpTokenListResponse>('/api/v1/me/mcp-tokens');
    }

    /** Mint a token. The response's `token` is the only sight of the plaintext. */
    create(input: MintMcpTokenInput): Promise<McpTokenMinted> {
        return this.client.post<McpTokenMinted>('/api/v1/me/mcp-tokens', input);
    }

    /**
     * Revoke one of the caller's tokens. Unknown id / already revoked / someone
     * else's token are deliberately indistinguishable (all 404) so the endpoint
     * cannot be used as an oracle for other users' ids.
     */
    revoke(id: string): Promise<McpTokenRevoked> {
        return this.client.delete<McpTokenRevoked>(
            `/api/v1/me/mcp-tokens/${encodeURIComponent(id)}`,
        );
    }
}
