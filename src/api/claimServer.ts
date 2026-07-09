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

export class ClaimError extends Error {
  constructor(
    public readonly kind: ClaimErrorKind,
    message: string,
  ) {
    super(message);
    this.name = 'ClaimError';
  }
}

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

  const body = (await res.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof body.message === 'string' ? body.message : '';
  switch (res.status) {
    case 401:
      throw new ClaimError('unauthorized', 'Your session expired — please sign in again.');
    case 404:
      throw new ClaimError('not_found', 'That claim code was not found. Double-check it and try again.');
    case 410:
      throw new ClaimError('expired', 'That claim code has expired. Generate a new one on your server.');
    case 409:
      throw new ClaimError('already_claimed', 'That server has already been claimed.');
    default:
      throw new ClaimError('invalid', message || 'Could not add the server. Check the claim code and try again.');
  }
}
