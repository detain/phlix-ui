/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { errorCodeMessage, isRegisteredErrorCode, type PhlixErrorLocale } from '../i18n/errors';

/** A resolved redirect-carried auth message. */
export interface RedirectEnvelope {
  kind: 'error' | 'notice';
  message: string;
  /** The machine code when one was carried (or recognised in `error`). */
  code: string | null;
}

/** Bare OAuth-callback codes (GitHub/OIDC `?error=<code>`) mapped onto registered codes. */
const OAUTH_BARE_ALIASES: Record<string, string> = {
  internal: 'unknown_error',
  password_change_required: 'auth.password_change_required',
};

const CODE_SHAPE = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)*$/;

function first(v: unknown): string | null {
  const raw = Array.isArray(v) ? v[0] : v;
  return typeof raw === 'string' && raw.trim() !== '' ? raw : null;
}

/**
 * Resolve the server's redirect envelope (`?error=` | `?notice=`, optional `&code=`)
 * into display text: machine code (`code ?? error` when code-shaped) localizes
 * through the error catalog; otherwise the server's human text is shown verbatim.
 * Returns null when the query carries no envelope.
 */
export function resolveRedirectEnvelope(
  query: Record<string, unknown>,
  locale?: PhlixErrorLocale | null,
): RedirectEnvelope | null {
  const error = first(query.error);
  const notice = first(query.notice);
  const human = error ?? notice;
  if (human === null) return null;
  const explicit = first(query.code);
  const bare = explicit === null && error !== null && CODE_SHAPE.test(error) ? error : null;
  let code = explicit ?? bare;
  if (code !== null && !isRegisteredErrorCode(code) && OAUTH_BARE_ALIASES[code]) {
    code = OAUTH_BARE_ALIASES[code]!;
  }
  // A bare unregistered code is not human text; let the generic message cover it.
  const fallback = bare !== null && !isRegisteredErrorCode(code) ? null : human;
  return {
    kind: error !== null ? 'error' : 'notice',
    message: errorCodeMessage(code, locale, fallback),
    code,
  };
}
