/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type PhlixErrorLocale } from '../i18n/errors';
/** A resolved redirect-carried auth message. */
export interface RedirectEnvelope {
    kind: 'error' | 'notice';
    message: string;
    /** The machine code when one was carried (or recognised in `error`). */
    code: string | null;
}
/**
 * Resolve the server's redirect envelope (`?error=` | `?notice=`, optional `&code=`)
 * into display text: machine code (`code ?? error` when code-shaped) localizes
 * through the error catalog; otherwise the server's human text is shown verbatim.
 * Returns null when the query carries no envelope.
 */
export declare function resolveRedirectEnvelope(query: Record<string, unknown>, locale?: PhlixErrorLocale | null): RedirectEnvelope | null;
