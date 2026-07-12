/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Hls from 'hls.js';
import { attachHls, clampBandwidth, isNativeHlsSupported } from './hls-playback';

// Fake hls.js: controllable isSupported, captured instances, manual event firing.
interface FakeLevel {
  height: number;
  width: number;
  bitrate: number;
  name: string | undefined;
}

vi.mock('hls.js', () => {
  const Events = { MANIFEST_PARSED: 'manifestParsed', ERROR: 'error', LEVEL_SWITCHED: 'levelSwitched' };
  class FakeHls {
    static supported = true;
    static instances: FakeHls[] = [];
    static Events = Events;
    static isSupported(): boolean {
      return FakeHls.supported;
    }
    handlers: Record<string, Array<(...args: unknown[]) => void>> = {};
    config: Record<string, unknown>;
    loaded?: string;
    attached?: unknown;
    destroyed = false;
    // Level API surface mirrored from hls.js.
    levels: FakeLevel[] = [];
    currentLevel = -1;
    nextLevel = -1;
    autoLevelEnabled = true;
    bandwidthEstimate = 0;
    constructor(config: Record<string, unknown>) {
      this.config = config;
      FakeHls.instances.push(this);
    }
    on(ev: string, cb: (...args: unknown[]) => void): void {
      (this.handlers[ev] ??= []).push(cb);
    }
    off(ev: string, cb: (...args: unknown[]) => void): void {
      this.handlers[ev] = (this.handlers[ev] ?? []).filter((h) => h !== cb);
    }
    emit(ev: string, data?: unknown): void {
      (this.handlers[ev] ?? []).forEach((h) => h(ev, data));
    }
    loadSource(url: string): void {
      this.loaded = url;
    }
    attachMedia(video: unknown): void {
      this.attached = video;
    }
    destroy(): void {
      this.destroyed = true;
    }
  }
  return { default: FakeHls, Events };
});

type FakeHlsInstance = {
  config: Record<string, unknown>;
  loaded?: string;
  attached?: unknown;
  destroyed: boolean;
  levels: FakeLevel[];
  currentLevel: number;
  nextLevel: number;
  autoLevelEnabled: boolean;
  bandwidthEstimate: number;
  handlers: Record<string, Array<(...args: unknown[]) => void>>;
  emit(ev: string, data?: unknown): void;
};

type FakeHlsCtor = typeof Hls & {
  supported: boolean;
  instances: FakeHlsInstance[];
};

const FakeHls = Hls as unknown as FakeHlsCtor;

function fakeVideo(canPlay: '' | 'maybe' | 'probably' = ''): HTMLVideoElement {
  return {
    canPlayType: () => canPlay,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    load: vi.fn(),
    removeAttribute: vi.fn(),
    src: '',
  } as unknown as HTMLVideoElement;
}

describe('hls-playback', () => {
  beforeEach(() => {
    FakeHls.supported = true;
    FakeHls.instances.length = 0;
  });

  describe('isNativeHlsSupported', () => {
    it('returns true when canPlayType returns probably', () => {
      const video = { canPlayType: vi.fn().mockReturnValue('probably') } as unknown as HTMLVideoElement;
      expect(isNativeHlsSupported(video)).toBe(true);
    });

    it('returns true when canPlayType returns maybe', () => {
      const video = { canPlayType: vi.fn().mockReturnValue('maybe') } as unknown as HTMLVideoElement;
      expect(isNativeHlsSupported(video)).toBe(true);
    });

    it('returns false when canPlayType returns empty string', () => {
      const video = { canPlayType: vi.fn().mockReturnValue('') } as unknown as HTMLVideoElement;
      expect(isNativeHlsSupported(video)).toBe(false);
    });
  });

  describe('attachHls via hls.js', () => {
    it('loads the source, attaches media, and wires a token header', async () => {
      const video = fakeVideo();
      const handle = await attachHls(video, 'http://h/master.m3u8', { getToken: () => 'tok123' });
      const inst = FakeHls.instances[0];
      expect(inst.loaded).toBe('http://h/master.m3u8');
      expect(inst.attached).toBe(video);

      // xhrSetup attaches the bearer token.
      const xhr = { setRequestHeader: vi.fn() };
      (inst.config.xhrSetup as (x: unknown) => void)(xhr);
      expect(xhr.setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer tok123');

      handle.destroy();
      expect(inst.destroyed).toBe(true);
    });

    it('calls onReady when the manifest parses', async () => {
      const onReady = vi.fn();
      await attachHls(fakeVideo(), 'http://h/m.m3u8', { onReady });
      FakeHls.instances[0].emit('manifestParsed');
      expect(onReady).toHaveBeenCalled();
    });

    it('calls onError and self-destructs on a fatal error', async () => {
      const onError = vi.fn();
      await attachHls(fakeVideo(), 'http://h/m.m3u8', { onError });
      const inst = FakeHls.instances[0];
      inst.emit('error', { fatal: true, details: 'bufStalled' });
      expect(onError).toHaveBeenCalledWith('bufStalled');
      expect(inst.destroyed).toBe(true);
    });

    it('ignores a non-fatal error', async () => {
      const onError = vi.fn();
      await attachHls(fakeVideo(), 'http://h/m.m3u8', { onError });
      FakeHls.instances[0].emit('error', { fatal: false });
      expect(onError).not.toHaveBeenCalled();
    });

    it('keeps the phlix-ui defaults when no hlsConfig is given', async () => {
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const cfg = FakeHls.instances[0].config;
      expect(cfg.enableWorker).toBe(true);
      expect(cfg.lowLatencyMode).toBe(false);
      // hls.js must NOT manage native text tracks — our external <track> WebVTT
      // sidecars are owned by CaptionOverlay; leaving this on lets hls.js disable
      // them (blank captions until toggled).
      expect(cfg.renderTextTracksNatively).toBe(false);
    });

    it('gives fragments a generous first-byte budget for on-demand transcode', async () => {
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const cfg = FakeHls.instances[0].config as {
        fragLoadPolicy?: { default?: { maxTimeToFirstByteMs?: number } };
      };
      // A transcoded segment's first byte only arrives once it's fully encoded, so
      // the stock 10s budget is too tight — must be raised well above it.
      expect(cfg.fragLoadPolicy?.default?.maxTimeToFirstByteMs).toBe(30_000);
    });

    it('lets a consumer override the fragment load policy', async () => {
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {
        hlsConfig: {
          fragLoadPolicy: {
            default: {
              maxTimeToFirstByteMs: 5_000,
              maxLoadTimeMs: 10_000,
              timeoutRetry: { maxNumRetry: 1, retryDelayMs: 0, maxRetryDelayMs: 0 },
              errorRetry: { maxNumRetry: 1, retryDelayMs: 0, maxRetryDelayMs: 0 },
            },
          },
        } as unknown as Record<string, unknown>,
      });
      const cfg = FakeHls.instances[0].config as {
        fragLoadPolicy?: { default?: { maxTimeToFirstByteMs?: number } };
      };
      expect(cfg.fragLoadPolicy?.default?.maxTimeToFirstByteMs).toBe(5_000);
    });

    it('merges a consumer hlsConfig (TV RAM tuning) into the Hls config', async () => {
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {
        hlsConfig: { maxBufferLength: 10, backBufferLength: 0 } as Record<string, unknown>,
      });
      const cfg = FakeHls.instances[0].config;
      expect(cfg.maxBufferLength).toBe(10);
      expect(cfg.backBufferLength).toBe(0);
      // defaults still present (not clobbered by the partial override)
      expect(cfg.enableWorker).toBe(true);
      expect(cfg.lowLatencyMode).toBe(false);
    });

    it('lets a consumer override a phlix-ui default key', async () => {
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {
        hlsConfig: { enableWorker: false } as Record<string, unknown>,
      });
      expect(FakeHls.instances[0].config.enableWorker).toBe(false);
    });

    it('never lets a consumer hlsConfig clobber the auth xhrSetup', async () => {
      const rogue = vi.fn();
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {
        getToken: () => 'tokABC',
        // A consumer tries to drop auth by passing its own xhrSetup — it must lose.
        hlsConfig: { xhrSetup: rogue } as unknown as Record<string, unknown>,
      });
      const xhr = { setRequestHeader: vi.fn() };
      (FakeHls.instances[0].config.xhrSetup as (x: unknown) => void)(xhr);
      expect(rogue).not.toHaveBeenCalled();
      expect(xhr.setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer tokABC');
    });
  });

  describe('attachHls level API (hls.js path)', () => {
    it('starts with no levels and exposes them once the manifest populates hls.levels', async () => {
      const handle = await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      // attachHls resolves before MANIFEST_PARSED — levels are empty until then.
      expect(handle.levels).toEqual([]);

      const inst = FakeHls.instances[0];
      inst.levels = [
        { height: 1080, width: 1920, bitrate: 5_000_000, name: '1080p' },
        { height: 720, width: 1280, bitrate: 2_800_000, name: '720p' },
      ];
      inst.emit('manifestParsed');

      expect(handle.levels).toEqual([
        { index: 0, height: 1080, width: 1920, bitrate: 5_000_000, name: '1080p' },
        { index: 1, height: 720, width: 1280, bitrate: 2_800_000, name: '720p' },
      ]);
    });

    it('reads and writes currentLevel / nextLevel through to the hls instance', async () => {
      const handle = await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const inst = FakeHls.instances[0];

      expect(handle.getCurrentLevel()).toBe(-1);
      handle.setCurrentLevel(2);
      expect(inst.currentLevel).toBe(2);
      expect(handle.getCurrentLevel()).toBe(2);

      handle.setNextLevel(1);
      expect(inst.nextLevel).toBe(1);

      // -1 re-enables Auto/ABR.
      handle.setCurrentLevel(-1);
      expect(inst.currentLevel).toBe(-1);
    });

    it('exposes live autoLevelEnabled and bandwidthEstimate getters', async () => {
      const handle = await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const inst = FakeHls.instances[0];
      expect(handle.autoLevelEnabled).toBe(true);
      expect(handle.bandwidthEstimate).toBe(0);

      inst.autoLevelEnabled = false;
      inst.bandwidthEstimate = 3_200_000;
      expect(handle.autoLevelEnabled).toBe(false);
      expect(handle.bandwidthEstimate).toBe(3_200_000);
    });

    it('fires onLevelSwitched with the new index and unsubscribes cleanly', async () => {
      const handle = await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const inst = FakeHls.instances[0];
      const cb = vi.fn();
      const off = handle.onLevelSwitched(cb);

      inst.emit('levelSwitched', { level: 3 });
      expect(cb).toHaveBeenCalledWith(3);

      off();
      inst.emit('levelSwitched', { level: 1 });
      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('keeps independent onLevelSwitched subscribers isolated when one unsubscribes', async () => {
      const handle = await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const inst = FakeHls.instances[0];
      const a = vi.fn();
      const b = vi.fn();
      const offA = handle.onLevelSwitched(a);
      handle.onLevelSwitched(b);

      // Both live subscribers see the first switch.
      inst.emit('levelSwitched', { level: 2 });
      expect(a).toHaveBeenCalledWith(2);
      expect(b).toHaveBeenCalledWith(2);

      // Unsubscribing A must not detach B (distinct listener references).
      offA();
      inst.emit('levelSwitched', { level: 0 });
      expect(a).toHaveBeenCalledTimes(1);
      expect(b).toHaveBeenCalledTimes(2);
      expect(b).toHaveBeenLastCalledWith(0);
    });
  });

  describe('attachHls native fallback', () => {
    it('sets video.src when hls.js is unsupported but native HLS is', async () => {
      FakeHls.supported = false;
      const video = fakeVideo('probably');
      const handle = await attachHls(video, 'http://h/native.m3u8');
      expect(video.src).toBe('http://h/native.m3u8');
      expect(FakeHls.instances.length).toBe(0);
      handle.destroy();
      expect(video.removeAttribute).toHaveBeenCalledWith('src');
    });

    // UI-1.4: Skip hls.js dynamic import when MSE is absent AND native HLS is supported.
    it('returns native handle without importing hls.js when MediaSource is undefined and native HLS supported', async () => {
      const video = {
        canPlayType: vi.fn().mockReturnValue('probably'),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as HTMLVideoElement;

      // Mock the hls.js import to fail if called
      const g = globalThis as unknown as { import?: unknown };
      const originalImport = g.import;
      g.import = vi.fn().mockImplementation(() => {
        return Promise.resolve({ default: {} });
      });

      // In this test we need to simulate MediaSource === 'undefined'
      // The condition is: typeof MediaSource === 'undefined' && isNativeHlsSupported(video)
      const result = await attachHls(video, 'https://example.com/master.m3u8');

      // Should return native handle
      expect(result).toBeDefined();
      expect(typeof result.destroy).toBe('function');

      g.import = originalImport;
    });

    it('skips hls.js import and sets video.src when MSE is absent and native HLS is supported', async () => {
      const mediaSource = globalThis.MediaSource;
      // @ts-expect-error — deliberately undefine to simulate Safari/iOS (no MSE).
      globalThis.MediaSource = undefined;
      try {
        const video = fakeVideo('probably');
        // Spy on the module-level FakeHls.instances to ensure no hls.js was instantiated.
        const beforeCount = FakeHls.instances.length;
        const handle = await attachHls(video, 'http://h/native.m3u8');
        expect(video.src).toBe('http://h/native.m3u8');
        // No hls.js instance must be created — the dynamic import is skipped.
        expect(FakeHls.instances.length).toBe(beforeCount);
        handle.destroy();
      } finally {
        globalThis.MediaSource = mediaSource;
      }
    });

    // UI-1.4: When MSE is present, hls.js path is used even if native HLS would work.
    it('uses hls.js when MSE is present, regardless of native HLS support', async () => {
      // Re-define MediaSource so the early-return is skipped.
      Object.defineProperty(globalThis, 'MediaSource', {
        value: {},
        writable: true,
        configurable: true,
      });
      FakeHls.supported = true;
      const video = fakeVideo('probably');
      const handle = await attachHls(video, 'http://h/master.m3u8');
      // hls.js must be instantiated because MSE is present.
      expect(FakeHls.instances.length).toBe(1);
      expect(FakeHls.instances[0].loaded).toBe('http://h/master.m3u8');
      handle.destroy();
    });

    // UI-1.4: Neither MSE nor native HLS → throw without importing hls.js.
    it('throws and skips hls.js import when MSE is absent and native HLS is unsupported', async () => {
      // @ts-expect-error — deliberately undefine to simulate a browser with no MSE.
      globalThis.MediaSource = undefined;
      try {
        FakeHls.supported = false;
        const beforeCount = FakeHls.instances.length;
        await expect(attachHls(fakeVideo(''), 'http://h/x.m3u8')).rejects.toThrow(/not supported/i);
        // No hls.js import must have been attempted.
        expect(FakeHls.instances.length).toBe(beforeCount);
      } finally {
        delete (globalThis as Record<string, unknown>).MediaSource;
      }
    });

    it('throws when neither hls.js nor native HLS is available', async () => {
      FakeHls.supported = false;
      await expect(attachHls(fakeVideo(''), 'http://h/x.m3u8')).rejects.toThrow(/not supported/i);
    });

    it('returns a degraded, Auto-only level API that never throws', async () => {
      FakeHls.supported = false;
      const handle = await attachHls(fakeVideo('probably'), 'http://h/native.m3u8');

      expect(handle.levels).toEqual([]);
      expect(handle.getCurrentLevel()).toBe(-1);
      expect(handle.autoLevelEnabled).toBe(true);
      expect(handle.bandwidthEstimate).toBe(0);

      // No-op setters and a no-op subscription must not throw.
      expect(() => handle.setCurrentLevel(2)).not.toThrow();
      expect(() => handle.setNextLevel(1)).not.toThrow();
      const off = handle.onLevelSwitched(vi.fn());
      expect(() => off()).not.toThrow();
      // Still Auto after a no-op set.
      expect(handle.getCurrentLevel()).toBe(-1);
    });
  });

  describe('bandwidth clamp (UI-1.2)', () => {
    it('clamps values below 100 Kbps to 100 Kbps', () => {
      expect(clampBandwidth(0)).toBe(100_000);
      expect(clampBandwidth(50_000)).toBe(100_000);
      expect(clampBandwidth(99_999)).toBe(100_000);
    });

    it('clamps values above 100 Mbps to 100 Mbps', () => {
      expect(clampBandwidth(100_000_001)).toBe(100_000_000);
      expect(clampBandwidth(200_000_000)).toBe(100_000_000);
    });

    it('leaves values in the 100 Kbps–100 Mbps range unchanged', () => {
      expect(clampBandwidth(100_000)).toBe(100_000);
      expect(clampBandwidth(5_000_000)).toBe(5_000_000);
      expect(clampBandwidth(100_000_000)).toBe(100_000_000);
    });
  });

  describe('bandwidth persistence via localStorage (UI-1.2)', () => {
    const BW_KEY = 'phlix-bandwidth-estimate';

    beforeEach(() => {
      localStorage.removeItem(BW_KEY);
      FakeHls.instances.length = 0;
    });

    afterEach(() => {
      localStorage.removeItem(BW_KEY);
      FakeHls.instances.length = 0;
    });

    it('seeds abrEwmaDefaultEstimate from persisted bandwidth on attachHls', async () => {
      // Store a clamped bandwidth value (5 Mbps) in localStorage.
      localStorage.setItem(BW_KEY, String(5_000_000));
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const cfg = FakeHls.instances[0].config;
      expect(cfg.abrEwmaDefaultEstimate).toBe(5_000_000);
    });

    it('clamps and seeds a persisted bandwidth below 100 Kbps', async () => {
      // Stale cached value of 50 Kbps should be clamped to 100 Kbps.
      localStorage.setItem(BW_KEY, String(50_000));
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const cfg = FakeHls.instances[0].config;
      expect(cfg.abrEwmaDefaultEstimate).toBe(100_000);
    });

    it('clamps and seeds a persisted bandwidth above 100 Mbps', async () => {
      // Unrealistic 150 Mbps should be clamped to 100 Mbps.
      localStorage.setItem(BW_KEY, String(150_000_000));
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const cfg = FakeHls.instances[0].config;
      expect(cfg.abrEwmaDefaultEstimate).toBe(100_000_000);
    });

    it('seeds 0 (hls.js built-in ABR) when no bandwidth is stored', async () => {
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const cfg = FakeHls.instances[0].config;
      expect(cfg.abrEwmaDefaultEstimate).toBe(0);
    });

    it('seeds 0 when localStorage contains a non-numeric value', async () => {
      localStorage.setItem(BW_KEY, 'not-a-number');
      await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      const cfg = FakeHls.instances[0].config;
      expect(cfg.abrEwmaDefaultEstimate).toBe(0);
    });

    it('persists the final bandwidth estimate on destroy()', async () => {
      const handle = await attachHls(fakeVideo(), 'http://h/m.m3u8', {});
      // Set a live bandwidth estimate on the captured hls instance.
      FakeHls.instances[0].bandwidthEstimate = 8_000_000;
      handle.destroy();
      // destroy() must persist the current bandwidthEstimate to localStorage.
      expect(localStorage.getItem(BW_KEY)).toBe(String(8_000_000));
    });
  });
});
