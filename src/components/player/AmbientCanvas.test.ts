/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import AmbientCanvas from './AmbientCanvas.vue';
import { AMBIENT_SAMPLE_W, AMBIENT_SAMPLE_H } from './ambient';

type NavWithBattery = Navigator & { getBattery?: unknown };

/** A solid-color RGBA buffer the right size for the sampler. */
function solid(r: number, g: number, b: number): Uint8ClampedArray {
  const data = new Uint8ClampedArray(AMBIENT_SAMPLE_W * AMBIENT_SAMPLE_H * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;
  }
  return data;
}

/** A <video> with controllable dimensions + optional requestVideoFrameCallback. */
function videoEl(opts: { width?: number; height?: number; rvfc?: boolean } = {}) {
  const v = document.createElement('video');
  Object.defineProperty(v, 'videoWidth', { configurable: true, get: () => opts.width ?? 0 });
  Object.defineProperty(v, 'videoHeight', { configurable: true, get: () => opts.height ?? 0 });
  let lastCb: ((now: number) => void) | null = null;
  const rvfc = vi.fn((cb: (n: number) => void) => {
    lastCb = cb;
    return 7;
  });
  const cancel = vi.fn();
  if (opts.rvfc) {
    (v as unknown as { requestVideoFrameCallback: unknown }).requestVideoFrameCallback = rvfc;
    (v as unknown as { cancelVideoFrameCallback: unknown }).cancelVideoFrameCallback = cancel;
  }
  return { v, rvfc, cancel, getCb: () => lastCb };
}

function fakeCtx(data: Uint8ClampedArray) {
  return { drawImage: vi.fn(), getImageData: vi.fn(() => ({ data })) };
}
function stubCanvas(ctx: unknown) {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as CanvasRenderingContext2D | null);
}

const tracked: VueWrapper[] = [];
function mountTracked(props: Record<string, unknown>) {
  const w = mount(AmbientCanvas, { props });
  tracked.push(w);
  return w;
}

afterEach(() => {
  while (tracked.length) tracked.pop()?.unmount();
  vi.restoreAllMocks();
  vi.useRealTimers();
  delete (navigator as NavWithBattery).getBattery;
});

describe('AmbientCanvas — gating', () => {
  it('is decorative (aria-hidden) and pointer-inert', () => {
    const w = mountTracked({ enabled: true });
    expect(w.attributes('aria-hidden')).toBe('true');
  });

  it('is inactive (no inline style) when disabled', () => {
    const w = mountTracked({ enabled: false });
    expect(w.classes()).not.toContain('is-active');
    expect(w.attributes('style')).toBeFalsy(); // :style is undefined → falls to the static CSS glow
  });

  it('is inactive under reduced motion', () => {
    const w = mountTracked({ enabled: true, reducedMotion: true });
    expect(w.classes()).not.toContain('is-active');
  });

  it('is active (static fallback) when enabled with no live sample yet', () => {
    const w = mountTracked({ enabled: true, reducedMotion: false });
    expect(w.classes()).toContain('is-active');
    const style = w.attributes('style') ?? '';
    expect(style).toContain('opacity'); // intensity-driven opacity
    expect(style).not.toContain('background'); // no live frame → static CSS glow shows through
  });

  it('reflects intensity in the glow opacity (theater boost caps at 1)', () => {
    expect(mountTracked({ enabled: true, intensity: 1 }).attributes('style')).toContain('opacity: 0.85');
    expect(mountTracked({ enabled: true, intensity: 2 }).attributes('style')).toContain('opacity: 1');
  });
});

describe('AmbientCanvas — sampling', () => {
  it('paints a live gradient sampled from the current frame', async () => {
    const ctx = fakeCtx(solid(255, 0, 0));
    stubCanvas(ctx);
    const { v } = videoEl({ width: 1920, height: 1080 });
    const w = mountTracked({ enabled: true, video: v });
    (w.vm as unknown as { sampleNow: () => void }).sampleNow();
    await nextTick();
    expect(ctx.drawImage).toHaveBeenCalledWith(v, 0, 0, AMBIENT_SAMPLE_W, AMBIENT_SAMPLE_H);
    expect(w.attributes('style')).toContain('rgba(255, 0, 0'); // red glow from the sampled frame
  });

  it('does not sample before the video has frame dimensions', async () => {
    const ctx = fakeCtx(solid(0, 255, 0));
    stubCanvas(ctx);
    const { v } = videoEl({ width: 0, height: 0 });
    const w = mountTracked({ enabled: true, video: v });
    (w.vm as unknown as { sampleNow: () => void }).sampleNow();
    await nextTick();
    expect(ctx.drawImage).not.toHaveBeenCalled();
    expect(w.attributes('style')).not.toContain('background');
  });

  it('does not sample while inactive', async () => {
    const ctx = fakeCtx(solid(0, 0, 255));
    stubCanvas(ctx);
    const { v } = videoEl({ width: 1920, height: 1080 });
    const w = mountTracked({ enabled: false, video: v });
    (w.vm as unknown as { sampleNow: () => void }).sampleNow();
    await nextTick();
    expect(ctx.drawImage).not.toHaveBeenCalled();
  });
});

describe('AmbientCanvas — sample loop', () => {
  it('schedules requestVideoFrameCallback while active+playing and cancels on unmount', async () => {
    const ctx = fakeCtx(solid(10, 20, 30));
    stubCanvas(ctx);
    const { v, rvfc, cancel } = videoEl({ width: 1920, height: 1080, rvfc: true });
    const w = mount(AmbientCanvas, { props: { enabled: true, playing: true, video: v } });
    await nextTick();
    expect(rvfc).toHaveBeenCalledTimes(1);
    w.unmount();
    expect(cancel).toHaveBeenCalledWith(7);
  });

  it('samples + reschedules on each throttled rVFC tick', async () => {
    const ctx = fakeCtx(solid(10, 20, 30));
    stubCanvas(ctx);
    const { v, rvfc, getCb } = videoEl({ width: 1920, height: 1080, rvfc: true });
    const w = mount(AmbientCanvas, { props: { enabled: true, playing: true, video: v } });
    await nextTick();
    const cb = getCb();
    expect(cb).toBeTruthy();
    cb!(300); // now=300 ≥ 250ms cadence → sample + reschedule
    await nextTick();
    expect(ctx.drawImage).toHaveBeenCalled();
    expect(rvfc).toHaveBeenCalledTimes(2);
    w.unmount();
  });

  it('falls back to a setInterval sampler when rVFC is absent', async () => {
    vi.useFakeTimers();
    const ctx = fakeCtx(solid(40, 50, 60));
    stubCanvas(ctx);
    const { v } = videoEl({ width: 1920, height: 1080 }); // no rVFC
    const w = mount(AmbientCanvas, { props: { enabled: true, playing: true, video: v } });
    await nextTick();
    expect(ctx.drawImage).toHaveBeenCalledTimes(1); // immediate first sample
    vi.advanceTimersByTime(260);
    expect(ctx.drawImage).toHaveBeenCalledTimes(2); // interval tick
    w.unmount();
  });

  it('runs NO interval when there is no usable 2D context (jsdom/SSR)', async () => {
    stubCanvas(null);
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');
    const { v } = videoEl({ width: 1920, height: 1080 }); // ready, no rVFC
    const w = mount(AmbientCanvas, { props: { enabled: true, playing: true, video: v } });
    await nextTick();
    expect(setIntervalSpy).not.toHaveBeenCalled();
    w.unmount();
  });

  it('clears the interval fallback on unmount (no samples afterwards)', async () => {
    vi.useFakeTimers();
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const ctx = fakeCtx(solid(1, 2, 3));
    stubCanvas(ctx);
    const { v } = videoEl({ width: 1920, height: 1080 }); // no rVFC → interval path
    const w = mount(AmbientCanvas, { props: { enabled: true, playing: true, video: v } });
    await nextTick();
    vi.advanceTimersByTime(260);
    const samples = ctx.drawImage.mock.calls.length;
    w.unmount();
    expect(clearSpy).toHaveBeenCalled();
    vi.advanceTimersByTime(600);
    expect(ctx.drawImage).toHaveBeenCalledTimes(samples); // loop stopped — no more samples
  });

  it('does not loop while paused', async () => {
    const ctx = fakeCtx(solid(1, 2, 3));
    stubCanvas(ctx);
    const { v, rvfc } = videoEl({ width: 1920, height: 1080, rvfc: true });
    const w = mount(AmbientCanvas, { props: { enabled: true, playing: false, video: v } });
    await nextTick();
    expect(rvfc).not.toHaveBeenCalled();
    w.unmount();
  });
});

describe('AmbientCanvas — graceful degradation', () => {
  it('degrades to the static glow when no 2D context exists, and stops retrying', () => {
    const getCtx = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null as unknown as CanvasRenderingContext2D);
    const { v } = videoEl({ width: 1920, height: 1080 });
    const w = mountTracked({ enabled: true, video: v });
    const vm = w.vm as unknown as { sampleNow: () => void };
    vm.sampleNow(); // creates the canvas; getContext → null → marks unavailable
    vm.sampleNow(); // ensureCtx short-circuits (no second getContext)
    expect(getCtx).toHaveBeenCalledTimes(1);
    expect(w.attributes('style')).not.toContain('background');
  });

  it('treats a throwing getContext as no context', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      throw new Error('blocked');
    });
    const { v } = videoEl({ width: 1920, height: 1080 });
    const w = mountTracked({ enabled: true, video: v });
    (w.vm as unknown as { sampleNow: () => void }).sampleNow();
    expect(w.attributes('style')).not.toContain('background');
  });

  it('keeps the static glow when the frame read throws (tainted cross-origin frame)', async () => {
    const ctx = {
      drawImage: vi.fn(),
      getImageData: vi.fn(() => {
        throw new Error('tainted');
      }),
    };
    stubCanvas(ctx);
    const { v } = videoEl({ width: 1920, height: 1080 });
    const w = mountTracked({ enabled: true, video: v });
    (w.vm as unknown as { sampleNow: () => void }).sampleNow();
    await nextTick();
    expect(ctx.drawImage).toHaveBeenCalled();
    expect(w.attributes('style')).not.toContain('background'); // live gradient reset → static glow
  });
});

describe('AmbientCanvas — battery saver', () => {
  it('disables the glow when the battery is low + discharging', async () => {
    (navigator as NavWithBattery).getBattery = vi.fn(() =>
      Promise.resolve({ charging: false, level: 0.1, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
    );
    const w = mountTracked({ enabled: true });
    expect(w.classes()).toContain('is-active'); // before the battery promise resolves
    await flushPromises();
    await nextTick();
    expect(w.classes()).not.toContain('is-active'); // battery-saver wins
  });

  it('stays active when charging', async () => {
    (navigator as NavWithBattery).getBattery = vi.fn(() =>
      Promise.resolve({ charging: true, level: 0.05, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
    );
    const w = mountTracked({ enabled: true });
    await flushPromises();
    await nextTick();
    expect(w.classes()).toContain('is-active');
  });

  it('binds the battery listeners on mount and removes them on unmount', async () => {
    const add = vi.fn();
    const remove = vi.fn();
    (navigator as NavWithBattery).getBattery = vi.fn(() =>
      Promise.resolve({ charging: true, level: 0.8, addEventListener: add, removeEventListener: remove }),
    );
    const w = mount(AmbientCanvas, { props: { enabled: true } });
    await flushPromises();
    expect(add).toHaveBeenCalledWith('chargingchange', expect.any(Function));
    expect(add).toHaveBeenCalledWith('levelchange', expect.any(Function));
    w.unmount();
    expect(remove).toHaveBeenCalledWith('chargingchange', expect.any(Function));
    expect(remove).toHaveBeenCalledWith('levelchange', expect.any(Function));
  });
});
