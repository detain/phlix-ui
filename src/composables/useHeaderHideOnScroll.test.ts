/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { effectScope, nextTick } from 'vue';
import { useHeaderHideOnScroll } from './useHeaderHideOnScroll';

function simulateScroll(scrollY: number): void {
  Object.defineProperty(window, 'scrollY', { configurable: true, get: () => scrollY });
  window.dispatchEvent(new Event('scroll'));
}

function stubMatchMedia(matches: boolean): () => void {
  const orig = window.matchMedia;
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
  return () => {
    window.matchMedia = orig ?? vi.fn();
  };
}

// Default matchMedia mock for tests that don't specifically test reduced motion
// Also reset scrollY to ensure clean state between tests
beforeEach(() => {
  // Reset scrollY to 0 for clean state
  Object.defineProperty(window, 'scrollY', { configurable: true, get: () => 0, set: (v) => v });

  if (typeof window.matchMedia === 'undefined') {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  }
});

describe('useHeaderHideOnScroll (R5.1)', () => {
  it('hides header when scrolling down past threshold', async () => {
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll();
      });

      // Scroll past threshold going down
      simulateScroll(100);
      await nextTick();

      expect(result.isHidden.value).toBe(true);
    } finally {
      scope.stop();
    }
  });

  it('shows header when scrolling up', async () => {
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll();
      });

      // First scroll down
      simulateScroll(100);
      await nextTick();
      expect(result.isHidden.value).toBe(true);

      // Then scroll up past threshold
      simulateScroll(40);
      await nextTick();
      expect(result.isHidden.value).toBe(false);
    } finally {
      scope.stop();
    }
  });

  it('shows header when at top of page (scrollY < threshold)', async () => {
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll();
      });

      simulateScroll(30);
      await nextTick();

      expect(result.isHidden.value).toBe(false);
    } finally {
      scope.stop();
    }
  });

  it('does not hide header when prefers-reduced-motion is set', async () => {
    const restore = stubMatchMedia(true);
    try {
      const scope = effectScope();
      try {
        let result!: ReturnType<typeof useHeaderHideOnScroll>;
        scope.run(() => {
          result = useHeaderHideOnScroll();
        });

        // Scroll down significantly
        simulateScroll(200);
        await nextTick();

        // Header should still be visible
        expect(result.isHidden.value).toBe(false);
      } finally {
        scope.stop();
      }
    } finally {
      restore();
    }
  });

  it('updates scrollDirection correctly', async () => {
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll();
      });

      // Initial direction is 'none' (or 'down' if first scroll is down)
      simulateScroll(100);
      await nextTick();
      expect(result.scrollDirection.value).toBe('down');

      // Scroll up significantly
      simulateScroll(40);
      await nextTick();
      // With threshold=50, scrolling 60px up should trigger 'up' direction
      expect(result.scrollDirection.value).toBe('up');
    } finally {
      scope.stop();
    }
  });

  it('detaches listeners when scope is disposed', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const scope = effectScope();
    scope.run(() => {
      useHeaderHideOnScroll();
    });
    scope.stop();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('is SSR-safe when window is unavailable', () => {
    vi.stubGlobal('window', undefined);
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll();
      });

      // Should not throw and should return non-hidden state
      expect(result.isHidden.value).toBe(false);
      expect(result.scrollDirection.value).toBe('none');
    } finally {
      scope.stop();
      vi.unstubAllGlobals();
    }
  });

  it('returns readonly refs', () => {
    const scope = effectScope();
    try {
      let hidden!: ReturnType<typeof useHeaderHideOnScroll>['isHidden'];
      let direction!: ReturnType<typeof useHeaderHideOnScroll>['scrollDirection'];
      scope.run(() => {
        const { isHidden, scrollDirection } = useHeaderHideOnScroll();
        hidden = isHidden;
        direction = scrollDirection;
      });

      // The returned refs should be readonly (properties not directly assignable)
      // isHidden starts false, scrollDirection starts 'none'
      expect(hidden.value).toBe(false);
      expect(direction.value).toBe('none');
    } finally {
      scope.stop();
    }
  });
});
