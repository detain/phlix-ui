/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { effectScope, nextTick, ref, type Ref } from 'vue';
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

/**
 * CU-108 — the hiding is `transform: translateY(-100%)` (visual only), so the
 * bar's chrome stays in the tab order while it is off-screen. With a `barRef`
 * the composable takes focus custody: focus entering the bar reveals it, and
 * while focus is inside it, scroll-down must not re-hide it.
 */
function makeBar(): { bar: HTMLElement; inner: HTMLButtonElement; barRef: Ref<HTMLElement | null> } {
  const bar = document.createElement('header');
  const inner = document.createElement('button');
  bar.appendChild(inner);
  document.body.appendChild(bar);
  return { bar, inner, barRef: ref(bar) };
}

describe('useHeaderHideOnScroll — focus custody (CU-108)', () => {
  it('reveals a hidden bar when focus lands inside it', async () => {
    const { bar, inner, barRef } = makeBar();
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll(barRef);
      });

      simulateScroll(100);
      await nextTick();
      expect(result.isHidden.value).toBe(true);

      // jsdom fires a bubbling `focusin` from .focus() — the bar's listener
      // must catch it and bring the chrome back.
      inner.focus();
      await nextTick();
      expect(result.isHidden.value).toBe(false);
    } finally {
      inner.blur();
      scope.stop();
      bar.remove();
    }
  });

  it('suppresses hiding while focus stays inside the bar', async () => {
    const { bar, inner, barRef } = makeBar();
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll(barRef);
      });

      inner.focus();
      simulateScroll(100);
      await nextTick();
      expect(result.scrollDirection.value).toBe('down'); // the scroll still reads as down
      expect(result.isHidden.value).toBe(false); // but the bar cannot slide out from under focus
    } finally {
      inner.blur();
      scope.stop();
      bar.remove();
    }
  });

  it('attach-after-setup re-arms the listener (the ref binds post-mount)', async () => {
    const barRef = ref<HTMLElement | null>(null);
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll(barRef);
      });

      simulateScroll(100);
      await nextTick();
      expect(result.isHidden.value).toBe(true);

      // The element only exists after mount (template-ref timing): the watch
      // must adopt it, and focus must then reach the still-hidden bar's chrome.
      const { bar, inner } = makeBar();
      barRef.value = bar;
      await nextTick();
      inner.focus();
      await nextTick();
      expect(result.isHidden.value).toBe(false);
      inner.blur();
      bar.remove();
    } finally {
      scope.stop();
    }
  });

  it('reveal() re-shows the bar and re-bases the scroll delta', async () => {
    const scope = effectScope();
    try {
      let result!: ReturnType<typeof useHeaderHideOnScroll>;
      scope.run(() => {
        result = useHeaderHideOnScroll();
      });

      simulateScroll(100);
      await nextTick();
      expect(result.isHidden.value).toBe(true);

      result.reveal();
      expect(result.isHidden.value).toBe(false);

      // A 40px continuation is below THRESHOLD from the re-based origin — no
      // re-hide until a full scroll delta accrues again.
      simulateScroll(140);
      await nextTick();
      expect(result.isHidden.value).toBe(false);

      simulateScroll(200);
      await nextTick();
      expect(result.isHidden.value).toBe(true);
    } finally {
      scope.stop();
    }
  });
});
