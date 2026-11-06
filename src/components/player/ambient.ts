/**
 * Ambient ("Ambilight") helpers (R3.6) — pure, DOM-free, unit-testable.
 *
 * The player samples a heavily-downscaled copy of the current video frame and
 * turns a few representative edge/center colors into a layered radial-gradient
 * glow behind the video (the locked R0 "Ambilight" art direction,
 * `player-chrome.html` .player-wrap::before). These helpers do the maths on a
 * raw RGBA pixel buffer so `AmbientCanvas.vue` stays a thin canvas shell.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/** Downscaled frame the canvas samples (tiny -> cheap drawImage + getImageData). */
export const AMBIENT_SAMPLE_W = 32;
export const AMBIENT_SAMPLE_H = 18;
/** Min ms between samples (~4 Hz) — keeps the cost far under the <2ms/frame budget. */
export const AMBIENT_SAMPLE_INTERVAL_MS = 250;

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** The three glow colors the ambient gradient is built from. */
export interface AmbientSample {
  left: Rgb;
  right: Rgb;
  center: Rgb;
}

const clamp8 = (n: number): number => (n < 0 ? 0 : n > 255 ? 255 : Math.round(n));

/**
 * Average RGB over the half-open sub-rectangle [x0,x1) x [y0,y1) of an RGBA
 * buffer (`data` length must be width*height*4). Bounds are clamped to the
 * buffer; an empty rect returns black. Alpha is ignored (video frames are
 * opaque).
 */
export function averageRegion(
  data: Uint8ClampedArray | number[],
  width: number,
  height: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Rgb {
  const lx = Math.max(0, Math.min(width, Math.floor(x0)));
  const ly = Math.max(0, Math.min(height, Math.floor(y0)));
  const hx = Math.max(lx, Math.min(width, Math.ceil(x1)));
  const hy = Math.max(ly, Math.min(height, Math.ceil(y1)));
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let y = ly; y < hy; y++) {
    for (let x = lx; x < hx; x++) {
      const i = (y * width + x) * 4;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n++;
    }
  }
  if (n === 0) return { r: 0, g: 0, b: 0 };
  return { r: clamp8(r / n), g: clamp8(g / n), b: clamp8(b / n) };
}

/**
 * Sample the left edge, right edge, and whole-frame center of a downscaled
 * frame buffer into the three glow colors the ambient gradient uses.
 */
export function sampleAmbient(data: Uint8ClampedArray | number[], width: number, height: number): AmbientSample {
  const edge = Math.max(1, Math.round(width * 0.25));
  return {
    left: averageRegion(data, width, height, 0, 0, edge, height),
    right: averageRegion(data, width, height, width - edge, 0, width, height),
    center: averageRegion(data, width, height, 0, 0, width, height),
  };
}

export function rgbString({ r, g, b }: Rgb): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function rgbaString({ r, g, b }: Rgb, alpha: number): string {
  const a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Build the layered radial-gradient `background` for the glow, matching the
 * locked mockup's three-glow layout (left / right / center). `intensity` scales
 * the per-layer alpha (clamped to [0,1]); the component drives the overall
 * brightness via element opacity, so this defaults to 1.
 */
/** Fraction → CSS percent, free of float noise (0.55 * 100 is 55.00000000000001). */
const pct = (f: number): string => `${Math.round(f * 1000) / 10}%`;

export function ambientGradient(sample: AmbientSample, intensity = 1): string {
  return ambientGlowLayers(sample, intensity)
    .map(
      (l) =>
        `radial-gradient(${pct(l.rx)} ${pct(l.ry)} at ${pct(l.cx)} ${pct(l.cy)}, ` +
        `${rgbaString(l.color, l.alpha)}, transparent ${pct(l.stop)})`,
    )
    .join(', ');
}

/** One elliptical glow layer, in fractions of the glow box. */
export interface AmbientGlowLayer {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  color: Rgb;
  alpha: number;
  /** Gradient position (fraction of the radius) where the layer reaches transparent. */
  stop: number;
}

/**
 * The glow geometry — SINGLE SOURCE for both the CSS gradient string
 * ({@link ambientGradient}) and the pre-blurred bitmap ({@link paintAmbientGlow}),
 * so the two renderings cannot drift apart.
 */
export function ambientGlowLayers(sample: AmbientSample, intensity = 1): AmbientGlowLayer[] {
  const a = (base: number): number => {
    const v = base * intensity;
    return v < 0 ? 0 : v > 1 ? 1 : v;
  };
  return [
    { cx: 0.12, cy: 0.3, rx: 0.4, ry: 0.6, color: sample.left, alpha: a(0.55), stop: 0.7 },
    { cx: 0.88, cy: 0.7, rx: 0.45, ry: 0.55, color: sample.right, alpha: a(0.5), stop: 0.7 },
    { cx: 0.5, cy: 0.5, rx: 0.5, ry: 0.5, color: sample.center, alpha: a(0.3), stop: 0.75 },
  ];
}

/**
 * Pre-blurred glow bitmap geometry. The glow box is drawn at
 * GLOW_BOX_W x GLOW_BOX_H inside a transparent pad so the blur can feather past
 * the box edge, exactly like the CSS `filter: blur(60px)` it replaces did. The
 * blur radius is that 60px at the bitmap's scale (box ≈ 1800px wide on a
 * typical page → 96px here ≈ 1/19).
 *
 * Why a bitmap at all: a live CSS blur over a full-width layer is re-rasterised
 * by the compositor as the video above it repaints (Firefox measured 8→~20
 * presented fps with the page's filters gone). A tiny bitmap the browser just
 * stretches costs nothing per frame.
 */
export const GLOW_BOX_W = 96;
export const GLOW_BOX_H = 54;
export const GLOW_PAD_X = 8;
export const GLOW_PAD_Y = 9;
export const GLOW_BLUR_PX = 3;

/** Minimal 2D-context surface {@link paintAmbientGlow} needs. */
export type GlowContext = Pick<
  CanvasRenderingContext2D,
  'clearRect' | 'save' | 'restore' | 'translate' | 'scale' | 'createRadialGradient' | 'fillRect'
> & { filter: string; fillStyle: CanvasRenderingContext2D['fillStyle'] };

/** Paint the glow layers (blurred) into a canvas of size (BOX + 2*PAD). */
export function paintAmbientGlow(ctx: GlowContext, layers: AmbientGlowLayer[]): void {
  const bw = GLOW_BOX_W;
  const bh = GLOW_BOX_H;
  ctx.clearRect(0, 0, bw + GLOW_PAD_X * 2, bh + GLOW_PAD_Y * 2);
  ctx.filter = `blur(${GLOW_BLUR_PX}px)`;
  for (const l of layers) {
    const x = GLOW_PAD_X + l.cx * bw;
    const y = GLOW_PAD_Y + l.cy * bh;
    const sx = l.rx * bw;
    const sy = l.ry * bh;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sx, sy);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    const { r, g: gg, b } = l.color;
    g.addColorStop(0, rgbaString(l.color, l.alpha));
    g.addColorStop(l.stop, `rgba(${r}, ${gg}, ${b}, 0)`);
    ctx.fillStyle = g;
    // fill exactly the glow box, expressed in this layer's local coordinates
    ctx.fillRect((GLOW_PAD_X - x) / sx, (GLOW_PAD_Y - y) / sy, bw / sx, bh / sy);
    ctx.restore();
  }
}

/** Minimal shape of the Battery Status API's BatteryManager we read. */
export interface BatteryLike {
  charging: boolean;
  level: number;
}

/**
 * Best-effort "battery saver" heuristic: discharging and at/below 20%. The
 * Battery Status API is absent in Firefox/Safari, so callers treat a missing
 * battery as "not saving" (ambient allowed).
 */
export function isBatterySaving(battery: BatteryLike | null | undefined): boolean {
  return !!battery && !battery.charging && battery.level <= 0.2;
}
