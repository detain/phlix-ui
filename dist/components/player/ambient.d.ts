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
export declare function ambientGradient(sample: AmbientSample, intensity?: number): string;
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
export declare function ambientGlowLayers(sample: AmbientSample, intensity?: number): AmbientGlowLayer[];
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
export declare const GLOW_BOX_W = 96;
export declare const GLOW_BOX_H = 54;
export declare const GLOW_PAD_X = 8;
export declare const GLOW_PAD_Y = 9;
export declare const GLOW_BLUR_PX = 3;
/** Minimal 2D-context surface {@link paintAmbientGlow} needs. */
export type GlowContext = Pick<CanvasRenderingContext2D, 'clearRect' | 'save' | 'restore' | 'translate' | 'scale' | 'createRadialGradient' | 'fillRect'> & {
    filter: string;
    fillStyle: CanvasRenderingContext2D['fillStyle'];
};
/** Paint the glow layers (blurred) into a canvas of size (BOX + 2*PAD). */
export declare function paintAmbientGlow(ctx: GlowContext, layers: AmbientGlowLayer[]): void;
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
