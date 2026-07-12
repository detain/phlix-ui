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
export declare const AMBIENT_SAMPLE_W = 32;
export declare const AMBIENT_SAMPLE_H = 18;
/** Min ms between samples (~4 Hz) — keeps the cost far under the <2ms/frame budget. */
export declare const AMBIENT_SAMPLE_INTERVAL_MS = 250;
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
/**
 * Average RGB over the half-open sub-rectangle [x0,x1) x [y0,y1) of an RGBA
 * buffer (`data` length must be width*height*4). Bounds are clamped to the
 * buffer; an empty rect returns black. Alpha is ignored (video frames are
 * opaque).
 */
export declare function averageRegion(data: Uint8ClampedArray | number[], width: number, height: number, x0: number, y0: number, x1: number, y1: number): Rgb;
/**
 * Sample the left edge, right edge, and whole-frame center of a downscaled
 * frame buffer into the three glow colors the ambient gradient uses.
 */
export declare function sampleAmbient(data: Uint8ClampedArray | number[], width: number, height: number): AmbientSample;
export declare function rgbString({ r, g, b }: Rgb): string;
export declare function rgbaString({ r, g, b }: Rgb, alpha: number): string;
/**
 * Build the layered radial-gradient `background` for the glow, matching the
 * locked mockup's three-glow layout (left / right / center). `intensity` scales
 * the per-layer alpha (clamped to [0,1]); the component drives the overall
 * brightness via element opacity, so this defaults to 1.
 */
export declare function ambientGradient(sample: AmbientSample, intensity?: number): string;
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
export declare function isBatterySaving(battery: BatteryLike | null | undefined): boolean;
