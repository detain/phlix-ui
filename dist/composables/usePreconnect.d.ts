/**
 * usePreconnect (R6.2c) — warm the connection to cross-origin asset hosts.
 *
 * `@phlix/ui` is a component library and cannot edit the consumer's static
 * `<head>`, so resource hints are injected at runtime instead. The shell uses
 * this to preconnect the poster image origin (a CDN / image proxy, or an
 * absolute API host) so the first poster paints sooner; {@link resolveImageOrigin}
 * is the pure policy that turns app config into the origin to warm.
 */
/** Options for {@link resolveImageOrigin}. */
export interface ResolveImageOriginOptions {
    /** Explicit image/CDN origin or absolute URL (a `PhlixAppConfig.imageOrigin`). Wins over `apiBase`. */
    imageOrigin?: string | null;
    /** The API base URL/path — posters are commonly served from the same host. */
    apiBase?: string | null;
    /** Current document origin (`window.location.origin`) for the same-origin skip. */
    documentOrigin?: string | null;
}
/**
 * Resolve the cross-origin image host worth preconnecting to, or `null` when
 * there is nothing to do.
 *
 * Policy: prefer an explicit `imageOrigin` (a CDN / image-proxy host); otherwise
 * fall back to the `apiBase` host (posters are usually served from the API host).
 * An empty/relative candidate, an invalid or non-http(s) URL, or a host equal to
 * `documentOrigin` all resolve to `null` — preconnecting a same-origin host is
 * pointless (the connection is already open) and an invalid one is ignored.
 *
 * Pure + DOM-free (the document origin is injected) so it unit-tests directly.
 */
export declare function resolveImageOrigin(opts: ResolveImageOriginOptions): string | null;
/** Options for {@link usePreconnect}. */
export interface UsePreconnectOptions {
    /**
     * Add `crossorigin="anonymous"` to the `preconnect` link. Leave OFF (default)
     * for plain `<img src>` posters: those are *no-cors* fetches, so a crossorigin
     * preconnect warms a *different* (CORS) connection the image would not reuse —
     * wasting it. Turn ON only when the origin's requests are CORS (web fonts,
     * `fetch()`, or a `crossorigin`-attributed `<img>`). The `dns-prefetch` hint is
     * never given `crossorigin` (it resolves DNS only).
     */
    crossOrigin?: boolean;
}
/**
 * Inject `<link rel="preconnect">` (TCP + TLS) and `<link rel="dns-prefetch">`
 * (DNS-only fallback for browsers/cases that don't honor preconnect) into
 * `document.head` for one or more cross-origin hosts.
 *
 * SSR-safe (no-op without a `document`), deduped (skips same-origin, invalid /
 * non-http(s) hosts, repeats within the call, and any host already linked —
 * including one a consumer put in their HTML), and self-cleaning: the links this
 * call created are removed when the owning reactive scope is disposed. Mirrors
 * the lifecycle of {@link useOnline}/{@link usePrefetch}.
 *
 * @param input one or more origins/URLs — only the origin is used (any path is
 *   dropped); `null`/`undefined`/empty entries are skipped, so `usePreconnect(null)`
 *   is a clean no-op.
 * @param options see {@link UsePreconnectOptions} (notably `crossOrigin`).
 *
 * @example
 * usePreconnect(
 *   resolveImageOrigin({ imageOrigin: config.imageOrigin, apiBase: config.apiBase, documentOrigin: location.origin }),
 * );
 */
export declare function usePreconnect(input: string | readonly string[] | null | undefined, options?: UsePreconnectOptions): void;
