import { describe, it, expect, beforeEach, vi } from 'vitest';
import Hls from 'hls.js';
import { attachHls, isNativeHlsSupported } from './hls-playback';

// Fake hls.js: controllable isSupported, captured instances, manual event firing.
vi.mock('hls.js', () => {
  const Events = { MANIFEST_PARSED: 'manifestParsed', ERROR: 'error' };
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
    constructor(config: Record<string, unknown>) {
      this.config = config;
      FakeHls.instances.push(this);
    }
    on(ev: string, cb: (...args: unknown[]) => void): void {
      (this.handlers[ev] ??= []).push(cb);
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

type FakeHlsCtor = typeof Hls & {
  supported: boolean;
  instances: Array<{
    config: Record<string, unknown>;
    loaded?: string;
    attached?: unknown;
    destroyed: boolean;
    emit(ev: string, data?: unknown): void;
  }>;
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
    it('is true for probably/maybe, false otherwise', () => {
      expect(isNativeHlsSupported(fakeVideo('probably'))).toBe(true);
      expect(isNativeHlsSupported(fakeVideo('maybe'))).toBe(true);
      expect(isNativeHlsSupported(fakeVideo(''))).toBe(false);
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

    it('throws when neither hls.js nor native HLS is available', async () => {
      FakeHls.supported = false;
      await expect(attachHls(fakeVideo(''), 'http://h/x.m3u8')).rejects.toThrow(/not supported/i);
    });
  });
});
