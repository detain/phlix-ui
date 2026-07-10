/**
 * media-poster (R6.2b) — pure helpers for responsive poster `srcset`/`sizes`.
 *
 * The backend (or a consumer) can optionally supply multiple sized poster URLs;
 * `MediaCard` renders them as a responsive `srcset` so the browser fetches the
 * resolution that fits the device instead of always pulling one fixed poster.
 * With no sized URLs supplied the card degrades to the single `poster_url` and
 * the markup is byte-identical to the pre-R6.2b card (no `srcset`/`sizes`).
 *
 * DOM-free + side-effect-free so it can be unit-tested directly (mirrors
 * `virtual-grid.ts`). The optional image-proxy server hook that would emit sized
 * URLs (`phlix_ui_redo.md` §Optional#6) is NOT built yet — this is the opt-in
 * client seam that lights up the moment a consumer provides sized URLs.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { PosterSrcsetInput } from '../types/media-item';
/**
 * Default `sizes` hint used when a width-descriptor `srcset` is resolved but the
 * consumer did not pass an explicit `posterSizes`. Mirrors the poster's real
 * rendered width in this UI (grid `minmax(180px, 1fr)` / row `minmax(160px,
 * 180px)` → ~160–200px on desktop, roughly two columns ≈ 45vw on a phone). It is
 * a CSS-pixel hint — the browser multiplies by device pixel ratio itself — and
 * is fully overridable per card via the `posterSizes` prop.
 */
export declare const DEFAULT_POSTER_SIZES = "(max-width: 600px) 45vw, 200px";
/** True when a `srcset` string carries at least one width (`w`) descriptor. */
export declare function srcsetHasWidthDescriptor(srcset: string): boolean;
/**
 * Build a `srcset` attribute string from either a ready-made `srcset` string
 * (passed through, trimmed) or an array of sized candidates. Returns `undefined`
 * when nothing usable is supplied — so binding it omits the attribute entirely
 * (Vue drops `undefined` attrs), keeping the single-`src` markup byte-identical.
 */
export declare function buildSrcset(input: PosterSrcsetInput): string | undefined;
/** Resolved responsive-image attributes for a poster `<img>`. */
export interface PosterImageSources {
    /** The `srcset` attribute value, or `undefined` to omit it. */
    srcset?: string;
    /** The `sizes` attribute value, or `undefined` to omit it. */
    sizes?: string;
}
/**
 * Resolve the `srcset` + `sizes` attributes for a poster `<img>`.
 *
 * - No usable sources → `{}` (omit both — single-`src` markup is unchanged).
 * - A width-descriptor `srcset` → emit `sizes` (explicit `posterSizes`, else the
 *   safe-by-default {@link DEFAULT_POSTER_SIZES}) so the browser can pick the
 *   right candidate instead of assuming `100vw` and always fetching the largest.
 * - A density (`x`) `srcset` → emit `sizes` only if explicitly provided
 *   (`sizes` is ignored for density descriptors, so we don't manufacture one).
 */
export declare function resolvePosterSources(input: PosterSrcsetInput, explicitSizes?: string | null): PosterImageSources;
