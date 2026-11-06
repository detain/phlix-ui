/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * One-time pre-blur for the PlayerPage poster backdrop.
 *
 * The backdrop used to be the raw poster under a live CSS
 * `filter: blur(80px) saturate(1.35)` spanning the whole page. The image never
 * changes, but compositors (Firefox's in particular) re-rasterise that filter as
 * the playing <video> above it updates — measured on an RTX 3060 Ti: 8 presented
 * fps with the filter vs 22 without, decoding a steady 24 with 0 dropped. The
 * cure is to pay for the blur (and the layer's radial mask) ONCE: draw the
 * poster into a tiny canvas with the same blur/saturate/fade applied, and let
 * the browser's smooth upscale of that tiny bitmap do the rest. No CSS filter
 * or mask remains on the layer, so there is nothing to re-render per frame.
 */
/** Width of the pre-blurred bitmap. Tiny on purpose: upscaling it is itself a blur. */
export declare const PREBLUR_WIDTH = 64;
/**
 * The live CSS filter is `blur(80px)` at page scale (~1600px wide); at
 * {@link PREBLUR_WIDTH} the equivalent radius is ~80 * 64 / 1600 ≈ 3px.
 */
export declare const PREBLUR_FILTER = "blur(3px) saturate(1.35)";
/**
 * Produce a pre-blurred, pre-masked data: URL for `src`, or `null` when it
 * cannot be done (no 2D canvas, image failed to load, tainted cross-origin
 * canvas, …). Never throws — a `null` keeps the caller on its CSS fallback.
 *
 * `aspect` is the backdrop element's width/height. The poster is cover-cropped
 * to it (what `background-size: cover` did), then the layer's radial fade (the
 * old `mask-image: radial-gradient(ellipse at center, #000 0%, transparent 75%)`)
 * is baked in, so the element needs neither a filter nor a mask. A later resize
 * only shifts the soft fade slightly.
 */
export declare function preblurImage(src: string, doc?: Document, aspect?: number): Promise<string | null>;
