import { describe, expect, it, vi } from 'vitest';
import { effectScope, nextTick } from 'vue';
import { useOnline } from './useOnline';

function stubOnLine(value: boolean): () => void {
  const orig = Object.getOwnPropertyDescriptor(navigator, 'onLine');
  Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => value });
  return () => {
    if (orig) Object.defineProperty(navigator, 'onLine', orig);
    else Object.defineProperty(navigator, 'onLine', { configurable: true, value: true });
  };
}

describe('useOnline (R5.3a)', () => {
  it('reads the initial navigator.onLine value', () => {
    const restore = stubOnLine(false);
    const scope = effectScope();
    try {
      let online!: ReturnType<typeof useOnline>;
      scope.run(() => {
        online = useOnline();
      });
      expect(online.value).toBe(false);
    } finally {
      scope.stop();
      restore();
    }
  });

  it('reacts to window offline then online events', async () => {
    const restore = stubOnLine(true);
    const scope = effectScope();
    try {
      let online!: ReturnType<typeof useOnline>;
      scope.run(() => {
        online = useOnline();
      });
      expect(online.value).toBe(true);

      const restoreOff = stubOnLine(false);
      window.dispatchEvent(new Event('offline'));
      await nextTick();
      expect(online.value).toBe(false);
      restoreOff();

      stubOnLine(true);
      window.dispatchEvent(new Event('online'));
      await nextTick();
      expect(online.value).toBe(true);
    } finally {
      scope.stop();
      restore();
    }
  });

  it('detaches the listeners when the scope is disposed', () => {
    const restore = stubOnLine(true);
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const scope = effectScope();
    let online!: ReturnType<typeof useOnline>;
    scope.run(() => {
      online = useOnline();
    });
    scope.stop();

    // After dispose, an offline event must NOT mutate the ref any more.
    stubOnLine(false);
    window.dispatchEvent(new Event('offline'));
    expect(online.value).toBe(true);

    expect(removeSpy).toHaveBeenCalledWith('online', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('offline', expect.any(Function));
    removeSpy.mockRestore();
    restore();
  });

  it('defaults to online and attaches no listeners when window is unavailable (SSR)', () => {
    vi.stubGlobal('window', undefined);
    vi.stubGlobal('navigator', undefined);
    const scope = effectScope();
    try {
      let online!: ReturnType<typeof useOnline>;
      scope.run(() => {
        online = useOnline();
      });
      expect(online.value).toBe(true);
    } finally {
      scope.stop();
      vi.unstubAllGlobals();
    }
  });
});
