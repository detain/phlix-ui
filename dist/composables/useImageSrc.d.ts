/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** The pair of resolvers a component binds its image attributes through. */
export interface ImageSrcResolvers {
    /**
     * Resolve one image URL (an `src`, a `poster`, a CSS `url()` value) against
     * the media API base for the currently selected server.
     */
    imgSrc: <T extends string | null | undefined>(url: T) => T | string;
    /** Resolve every candidate in a `srcset` against that same base. */
    imgSrcset: <T extends string | null | undefined>(srcset: T) => T | string;
}
/**
 * S241 — the binding seam for image URLs that arrive inside a JSON payload.
 *
 * phlix-server emits posters, avatars, photo thumbnails and book covers as
 * ROOT-RELATIVE signed paths (`/api/v1/artwork/{id}?size=…&exp=…&sig=…`). Bound
 * verbatim into `:src` those resolve against the *document* origin, which is
 * correct on the media server and wrong on the hub, where the payload actually
 * came over the relay proxy for the selected server. Every image binding whose
 * value came from the media API goes through `imgSrc`/`imgSrcset` so it
 * resolves against the same base its JSON did.
 *
 * The returned functions read `useMediaApiBase().value` at CALL time, so
 * invoking them inside a template (or a `computed`) tracks the base as a
 * reactive dependency: selecting a different server on the hub re-renders every
 * poster against the new relay base without any per-component watcher.
 *
 * Absolute URLs (TMDB/fanart CDN links, `data:`, `blob:`) pass through
 * byte-for-byte — see {@link resolveImageSrc} for the full rule and for why the
 * join is a concatenation rather than a `URL` round-trip (the signed `exp`/`sig`
 * must survive verbatim).
 *
 * Must be called from `setup()` (it `inject`s the base); both resolvers may then
 * be called anywhere, including in a render.
 */
export declare function useImageSrc(): ImageSrcResolvers;
