import { describe, it, expect } from 'vitest';
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
