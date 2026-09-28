/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { LocalStorageTokenStore } from './tokenStore';

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

export type ClaimErrorKind =
  | 'empty'
  | 'not_found'
  | 'expired'
  | 'already_claimed'
  | 'unauthorized'
  | 'invalid'
  | 'network';

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
export class ClaimError extends Error {
  constructor(
    public readonly kind: ClaimErrorKind,
    message: string,
    /** Server machine code (e.g. `claim.code_expired`), null when absent. */
    public readonly code: string | null = null,
  ) {
    super(message);
    this.name = 'ClaimError';
  }
}

/** Wire machine code → the UI's `kind`, preferred over the status guess. */
const KIND_BY_SERVER_CODE: Record<string, ClaimErrorKind> = {
  'claim.code_not_found': 'not_found',
  'claim.code_expired': 'expired',
  'claim.code_already_claimed': 'already_claimed',
  'auth.unauthenticated': 'unauthorized',
};

/** Status → `kind` fallback for servers that answer with a bare status. */
const KIND_BY_HTTP_STATUS: Record<number, ClaimErrorKind> = {
  401: 'unauthorized',
  404: 'not_found',
  409: 'already_claimed',
  410: 'expired',
};

/**
 * Legacy per-kind English copy (the pre-code UI strings). Kept byte-identical
 * so un-localized consumers see exactly what they saw before the `code` field
 * existed; localizing consumers use `errorCodeMessage(error.code, …)` instead.
 */
const LEGACY_KIND_MESSAGE: Record<ClaimErrorKind, string> = {
  empty: 'Enter the claim code shown on your server.',
  network: 'Network error — check your connection and try again.',
  unauthorized: 'Your session expired — please sign in again.',
  not_found: 'That claim code was not found. Double-check it and try again.',
  expired: 'That claim code has expired. Generate a new one on your server.',
  already_claimed: 'That server has already been claimed.',
  invalid: 'Could not add the server. Check the claim code and try again.',
};

export interface ClaimServerResult {
  serverId: string;
}

/**
 * @param apiBase  Origin to hit (default `''` → same-origin relative URL).
 * @param claimCode The code shown on the media server's "connect to hub" screen.
 */
export async function claimServer(
  apiBase: string,
  claimCode: string,
  signal?: AbortSignal,
): Promise<ClaimServerResult> {
  const code = claimCode.trim();
  if (code === '') {
    throw new ClaimError('empty', 'Enter the claim code shown on your server.');
  }

  const token =
    typeof window !== 'undefined' ? new LocalStorageTokenStore().getAccessToken() : null;

  let res: Response;
  try {
    res = await fetch(`${apiBase}/api/v1/server-claims/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Phlix-Protocol': 'v1',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'same-origin',
      body: JSON.stringify({ claim_code: code }),
      signal,
    });
  } catch {
    throw new ClaimError('network', 'Network error — check your connection and try again.');
  }

  if (res.ok) {
    const data = (await res.json().catch(() => ({}))) as { server_id?: unknown };
    return { serverId: typeof data.server_id === 'string' ? data.server_id : '' };
  }

  const body = (await res.json().catch(() => ({}))) as {
    message?: unknown;
    error?: unknown;
    code?: unknown;
  };
  const serverMessage =
    typeof body.message === 'string'
      ? body.message
      : typeof body.error === 'string'
        ? body.error
        : '';
  // Parse the machine code at the boundary. When the server named the failure,
  // `kind` comes from THAT — the status mapping below only stands in for
  // servers that answer with a bare status. The code rides along either way so
  // the consumer can localize via `errorCodeMessage` regardless of how `kind`
  // was chosen (the status and code mappings agree on every hub reply).
  const serverCode = typeof body.code === 'string' && body.code !== '' ? body.code : null;
  const kind: ClaimErrorKind =
    (serverCode !== null ? KIND_BY_SERVER_CODE[serverCode] : undefined) ??
    KIND_BY_HTTP_STATUS[res.status] ??
    'invalid';
  // Known kinds keep their curated English copy byte-identical to the pre-code
  // behavior (un-localized consumers see no change); only genuinely unmapped
  // failures fall back to the server's own text. Localizing consumers read
  // `error.code` through `errorCodeMessage` and never see either string.
  const legacy = LEGACY_KIND_MESSAGE[kind];
  const friendly = kind === 'invalid' ? serverMessage || legacy : legacy;
  throw new ClaimError(kind, friendly, serverCode);
}
