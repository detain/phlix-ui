/**
 * Ambient ("Ambilight") helpers (R3.6) — pure, DOM-free, unit-testable.
 *
 * The player samples a heavily-downscaled copy of the current video frame and
 * turns a few representative edge/center colors into a layered radial-gradient
 * glow behind the video (the locked R0 "Ambilight" art direction,
 * `player-chrome.html` .player-wrap::before). These helpers do the maths on a
 * raw RGBA pixel buffer so `AmbientCanvas.vue` stays a thin canvas shell.
 * @copyright 2026 Joe Huss <detain@interserver.net>
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
export function ambientGradient(sample: AmbientSample, intensity = 1): string {
  const a = (base: number): number => {
    const v = base * intensity;
    return v < 0 ? 0 : v > 1 ? 1 : v;
  };
  return [
    `radial-gradient(40% 60% at 12% 30%, ${rgbaString(sample.left, a(0.55))}, transparent 70%)`,
    `radial-gradient(45% 55% at 88% 70%, ${rgbaString(sample.right, a(0.5))}, transparent 70%)`,
    `radial-gradient(50% 50% at 50% 50%, ${rgbaString(sample.center, a(0.3))}, transparent 75%)`,
  ].join(', ');
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
