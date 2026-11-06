/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import {
  averageRegion,
  sampleAmbient,
  ambientGradient,
  rgbString,
  rgbaString,
  isBatterySaving,
  AMBIENT_SAMPLE_W,
  AMBIENT_SAMPLE_H,
  AMBIENT_SAMPLE_INTERVAL_MS,
  ambientGlowLayers,
  paintAmbientGlow,
  GLOW_BLUR_PX,
  GLOW_BOX_H,
  GLOW_BOX_W,
  GLOW_PAD_X,
  GLOW_PAD_Y,
  type GlowContext,
  type Rgb,
} from './ambient';

/** Build an RGBA buffer by calling `fill(x, y)` → [r,g,b] for each pixel. */
function buffer(width: number, height: number, fill: (x: number, y: number) => [number, number, number]): Uint8ClampedArray {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const [r, g, b] = fill(x, y);
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }
  return data;
}

describe('ambient — constants', () => {
  it('samples a tiny frame at a throttled cadence', () => {
    expect(AMBIENT_SAMPLE_W).toBe(32);
    expect(AMBIENT_SAMPLE_H).toBe(18);
    expect(AMBIENT_SAMPLE_INTERVAL_MS).toBe(250); // ~4 Hz
  });
});

describe('ambient — averageRegion', () => {
  it('averages a uniform region', () => {
    const data = buffer(4, 4, () => [100, 150, 200]);
    expect(averageRegion(data, 4, 4, 0, 0, 4, 4)).toEqual({ r: 100, g: 150, b: 200 });
  });

  it('averages only the requested sub-rectangle', () => {
    // left half red, right half blue
    const data = buffer(4, 2, (x) => (x < 2 ? [255, 0, 0] : [0, 0, 255]));
    expect(averageRegion(data, 4, 2, 0, 0, 2, 2)).toEqual({ r: 255, g: 0, b: 0 });
    expect(averageRegion(data, 4, 2, 2, 0, 4, 2)).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('rounds the channel averages to integers', () => {
    // two pixels: (0,0,0) and (255,255,255) → mean 127.5 → 128
    const data = buffer(2, 1, (x) => (x === 0 ? [0, 0, 0] : [255, 255, 255]));
    expect(averageRegion(data, 2, 1, 0, 0, 2, 1)).toEqual({ r: 128, g: 128, b: 128 });
  });

  it('clamps out-of-range bounds to the buffer', () => {
    const data = buffer(2, 2, () => [10, 20, 30]);
    expect(averageRegion(data, 2, 2, -50, -50, 999, 999)).toEqual({ r: 10, g: 20, b: 30 });
  });

  it('returns black for an empty rect', () => {
    const data = buffer(4, 4, () => [255, 255, 255]);
    expect(averageRegion(data, 4, 4, 2, 2, 2, 4)).toEqual({ r: 0, g: 0, b: 0 }); // x0 === x1
  });
});

describe('ambient — sampleAmbient', () => {
  it('reads left edge, right edge and whole-frame center', () => {
    // left half red, right half blue across the real 32×18 sample size
    const data = buffer(AMBIENT_SAMPLE_W, AMBIENT_SAMPLE_H, (x) => (x < AMBIENT_SAMPLE_W / 2 ? [255, 0, 0] : [0, 0, 255]));
    const s = sampleAmbient(data, AMBIENT_SAMPLE_W, AMBIENT_SAMPLE_H);
    expect(s.left).toEqual({ r: 255, g: 0, b: 0 }); // first 25% is all red
    expect(s.right).toEqual({ r: 0, g: 0, b: 255 }); // last 25% is all blue
    expect(s.center).toEqual({ r: 128, g: 0, b: 128 }); // whole frame: half red / half blue
  });
});

describe('ambient — rgb/rgba strings', () => {
  it('formats rgb()', () => {
    expect(rgbString({ r: 1, g: 2, b: 3 })).toBe('rgb(1, 2, 3)');
  });
  it('formats rgba() and clamps alpha to [0,1]', () => {
    const c: Rgb = { r: 10, g: 20, b: 30 };
    expect(rgbaString(c, 0.5)).toBe('rgba(10, 20, 30, 0.5)');
    expect(rgbaString(c, 5)).toBe('rgba(10, 20, 30, 1)');
    expect(rgbaString(c, -2)).toBe('rgba(10, 20, 30, 0)');
  });
});

describe('ambient — ambientGradient', () => {
  const sample = { left: { r: 200, g: 0, b: 0 }, right: { r: 0, g: 0, b: 200 }, center: { r: 100, g: 100, b: 100 } };

  it('builds three radial-gradient layers from the sampled colors', () => {
    const bg = ambientGradient(sample);
    expect(bg.match(/radial-gradient/g)).toHaveLength(3);
    expect(bg).toContain('rgba(200, 0, 0, 0.55)'); // left @ 12% 30%
    expect(bg).toContain('rgba(0, 0, 200, 0.5)'); // right @ 88% 70%
    expect(bg).toContain('rgba(100, 100, 100, 0.3)'); // center
    expect(bg).toContain('12% 30%');
    expect(bg).toContain('88% 70%');
  });

  it('scales per-layer alpha by intensity (clamped to 1)', () => {
    expect(ambientGradient(sample, 2)).toContain('rgba(200, 0, 0, 1)'); // 0.55*2 → clamp 1
    expect(ambientGradient(sample, 0)).toContain('rgba(200, 0, 0, 0)');
    // a modest boost stays < 1
    expect(ambientGradient(sample, 1.2)).toContain('rgba(0, 0, 200, 0.6)'); // 0.5 * 1.2
  });
});

describe('ambient — isBatterySaving', () => {
  it('is false when the battery is missing', () => {
    expect(isBatterySaving(null)).toBe(false);
    expect(isBatterySaving(undefined)).toBe(false);
  });
  it('is false while charging (any level)', () => {
    expect(isBatterySaving({ charging: true, level: 0.05 })).toBe(false);
  });
  it('is true when discharging at/below 20%', () => {
    expect(isBatterySaving({ charging: false, level: 0.2 })).toBe(true);
    expect(isBatterySaving({ charging: false, level: 0.1 })).toBe(true);
  });
  it('is false when discharging above 20%', () => {
    expect(isBatterySaving({ charging: false, level: 0.5 })).toBe(false);
  });
});

describe('ambient — glow layers + bitmap painter', () => {
  const sample = { left: { r: 10, g: 20, b: 30 }, right: { r: 40, g: 50, b: 60 }, center: { r: 70, g: 80, b: 90 } };

  it('ambientGradient is built from the same layer geometry (single source)', () => {
    const layers = ambientGlowLayers(sample);
    expect(layers.map((l) => [l.cx, l.cy, l.rx, l.ry, l.stop])).toEqual([
      [0.12, 0.3, 0.4, 0.6, 0.7],
      [0.88, 0.7, 0.45, 0.55, 0.7],
      [0.5, 0.5, 0.5, 0.5, 0.75],
    ]);
    // byte-identical to the pre-refactor literal (0.55*100 float noise must not leak)
    expect(ambientGradient(sample)).toBe(
      'radial-gradient(40% 60% at 12% 30%, rgba(10, 20, 30, 0.55), transparent 70%), ' +
        'radial-gradient(45% 55% at 88% 70%, rgba(40, 50, 60, 0.5), transparent 70%), ' +
        'radial-gradient(50% 50% at 50% 50%, rgba(70, 80, 90, 0.3), transparent 75%)',
    );
  });

  it('paintAmbientGlow blurs once and fills exactly the glow box for every layer', () => {
    const stops: Array<[number, string]> = [];
    const transforms: number[][] = [];
    const ctx = {
      filter: 'none',
      fillStyle: '' as unknown,
      clearRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn((x: number, y: number) => transforms.push([x, y])),
      scale: vi.fn((x: number, y: number) => transforms.push([x, y])),
      fillRect: vi.fn(),
      createRadialGradient: vi.fn(() => ({ addColorStop: (o: number, c: string) => stops.push([o, c]) })),
    };
    paintAmbientGlow(ctx as unknown as GlowContext, ambientGlowLayers(sample));

    expect(ctx.filter).toBe(`blur(${GLOW_BLUR_PX}px)`);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, GLOW_BOX_W + GLOW_PAD_X * 2, GLOW_BOX_H + GLOW_PAD_Y * 2);
    expect(ctx.fillRect).toHaveBeenCalledTimes(3);
    // first layer: centre (pad + 0.12*W, pad + 0.3*H), radii (0.4*W, 0.6*H)
    const x = GLOW_PAD_X + 0.12 * GLOW_BOX_W;
    const y = GLOW_PAD_Y + 0.3 * GLOW_BOX_H;
    const sx = 0.4 * GLOW_BOX_W;
    const sy = 0.6 * GLOW_BOX_H;
    expect(transforms[0]).toEqual([x, y]);
    expect(transforms[1]).toEqual([sx, sy]);
    // the fill rect maps back to exactly the glow box in canvas space
    const [rx, ry, rw, rh] = ctx.fillRect.mock.calls[0] as number[];
    expect(x + rx * sx).toBeCloseTo(GLOW_PAD_X);
    expect(y + ry * sy).toBeCloseTo(GLOW_PAD_Y);
    expect(rw * sx).toBeCloseTo(GLOW_BOX_W);
    expect(rh * sy).toBeCloseTo(GLOW_BOX_H);
    expect(stops.slice(0, 2)).toEqual([
      [0, 'rgba(10, 20, 30, 0.55)'],
      [0.7, 'rgba(10, 20, 30, 0)'],
    ]);
  });
});
