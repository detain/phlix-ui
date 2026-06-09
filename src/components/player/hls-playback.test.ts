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
