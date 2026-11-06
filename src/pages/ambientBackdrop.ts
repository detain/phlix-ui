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
export const PREBLUR_WIDTH = 64;

/**
 * The live CSS filter is `blur(80px)` at page scale (~1600px wide); at
 * {@link PREBLUR_WIDTH} the equivalent radius is ~80 * 64 / 1600 ≈ 3px.
 */
export const PREBLUR_FILTER = 'blur(3px) saturate(1.35)';

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
export async function preblurImage(src: string, doc: Document = document, aspect = 16 / 9): Promise<string | null> {
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    await img.decode();
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih) return null;

    const ratio = Number.isFinite(aspect) && aspect > 0 ? Math.min(4, Math.max(0.25, aspect)) : 16 / 9;
    const cw = PREBLUR_WIDTH;
    const ch = Math.max(1, Math.round(cw / ratio));
    const canvas = doc.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // cover-crop: scale so the image fills the canvas, centred
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    // Overdraw a few px past every edge so the blur does not pull transparent
    // black in from outside the bitmap.
    const pad = 4;
    if ('filter' in ctx) ctx.filter = PREBLUR_FILTER;
    ctx.drawImage(img, (cw - dw) / 2 - pad, (ch - dh) / 2 - pad, dw + pad * 2, dh + pad * 2);

    // bake the radial fade: CSS `ellipse at center` defaults to farthest-corner,
    // i.e. radii (w/2)·√2 x (h/2)·√2; opaque at 0, transparent at 75%.
    if ('filter' in ctx) ctx.filter = 'none';
    ctx.globalCompositeOperation = 'destination-in';
    ctx.save();
    ctx.translate(cw / 2, ch / 2);
    ctx.scale((cw / 2) * Math.SQRT2, (ch / 2) * Math.SQRT2);
    const fade = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    fade.addColorStop(0, 'rgba(0, 0, 0, 1)');
    fade.addColorStop(0.75, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = fade;
    ctx.fillRect(-1, -1, 2, 2);
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';

    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}
