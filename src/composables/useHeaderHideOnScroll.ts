/**
 * useHeaderHideOnScroll — hide-on-scroll-down / reveal-on-scroll-up header chrome.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { onScopeDispose, readonly, ref, watch, type DeepReadonly, type Ref } from 'vue';

/** Return shape of {@link useHeaderHideOnScroll}. */
export interface UseHeaderHideOnScroll {
  /** Whether the header is currently hidden (scrolled out of view). */
  isHidden: DeepReadonly<Ref<boolean>>;
  /** Current scroll direction. */
  scrollDirection: DeepReadonly<Ref<'up' | 'down' | 'none'>>;
  /** Bring the header back now (CU-108): the focus-custody reveal, also callable by hosts. */
  reveal: () => void;
}

/**
 * Hide-on-scroll composable for the app header (R5.1).
 *
 * Tracks scroll direction and hides the header when scrolling down past the
 * threshold, revealing it again when scrolling up. The header stays visible
 * when `prefers-reduced-motion: reduce` is set.
 *
 * CU-108 — hiding is `transform: translateY(-100%)` (visual only), so the bar's
 * links and buttons stay in the tab order while it is off-screen. Focus custody
 * law: when a `barRef` is provided and focus lands inside the bar (focusin
 * bubbles), the bar reveals itself, and while focus is inside it the hide arm of
 * `onScroll` is suppressed — keyboard focus can never sit on chrome the user
 * cannot see. Without `barRef` the pre-CU-108 posture ships byte-identically.
 *
 * SSR-safe: no listeners are attached when `window` is unavailable.
 *
 * @example
 * const { isHidden, scrollDirection } = useHeaderHideOnScroll();
 * // or with focus custody:
 * const barRef = ref<HTMLElement | null>(null);
 * const { isHidden } = useHeaderHideOnScroll(barRef);
 */
export function useHeaderHideOnScroll(barRef?: Ref<HTMLElement | null>): UseHeaderHideOnScroll {
  /** px of scroll before the header hides — prevents micro-scrolls triggering hide. */
  const THRESHOLD = 50;

  const lastScrollY = ref(0);
  const scrollDirection = ref<'up' | 'down' | 'none'>('none');
  const isHidden = ref(false);

  /** Check if user prefers reduced motion — if so, never hide the header. */
  const prefersReducedMotion = ref(false);

  /** True while DOM focus sits inside the header bar (CU-108 focus custody). */
  function focusInsideBar(): boolean {
    const bar = barRef?.value;
    if (!bar || typeof document === 'undefined') return false;
    const active = document.activeElement;
    return active !== null && active !== document.body && bar.contains(active);
  }

  /**
   * Bring the bar back and reset the delta reference (CU-108). Shared by the
   * scroll-up reveal paths and focus custody, so a re-hide needs a fresh
   * scroll of `THRESHOLD` px past wherever the user actually is.
   */
  function reveal(): void {
    isHidden.value = false;
    scrollDirection.value = 'none';
    lastScrollY.value = typeof window !== 'undefined' ? window.scrollY : 0;
  }

  function onScroll(): void {
    if (typeof window === 'undefined') return;

    // Never hide when user prefers reduced motion
    if (prefersReducedMotion.value) return;

    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY.value;

    // Determine direction (only when delta exceeds threshold)
    if (Math.abs(delta) > THRESHOLD) {
      scrollDirection.value = delta > 0 ? 'down' : 'up';
      lastScrollY.value = currentScrollY;
    }

    // Hide header on scroll down past threshold, show on scroll up
    // Only hide if user has scrolled down enough AND is not at the top.
    // CU-108: while focus is inside the bar it must not slide out from under
    // the keyboard — a hidden-but-focused header is focus stolen by CSS.
    if (currentScrollY > THRESHOLD) {
      isHidden.value = scrollDirection.value === 'down' && !focusInsideBar();
    } else {
      // At top of page — always show header
      isHidden.value = false;
    }
  }

  // M6: hoisted so onScopeDispose can detach it — the anonymous version leaked
  // a document-wide media-query listener for every consumer on every unmount.
  let motionQuery: MediaQueryList | null = null;
  function onMotionChange(e: MediaQueryListEvent): void {
    prefersReducedMotion.value = e.matches;
    if (prefersReducedMotion.value) {
      // Reset state when motion preference is enabled
      isHidden.value = false;
      scrollDirection.value = 'none';
    }
  }

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    // Check for reduced motion preference
    if (typeof window.matchMedia === 'function') {
      motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.value = motionQuery.matches;
      // Listen for changes in case user toggles the setting
      motionQuery.addEventListener('change', onMotionChange);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScopeDispose(() => {
      window.removeEventListener('scroll', onScroll);
      motionQuery?.removeEventListener('change', onMotionChange);
      motionQuery = null;
    });

    // CU-108: focus custody. `focusin` bubbles, so one listener on the bar
    // itself catches focus landing on ANY chrome inside it — tabbing into the
    // header reveals it instead of typing blind into an off-screen bar. The
    // ref binds after mount, hence the watch (an element that appears later,
    // or is swapped, re-arms the listener).
    if (barRef) {
      const onFocusIn = (): void => {
        if (isHidden.value) reveal();
      };
      let attachedBar: HTMLElement | null = null;
      const stopBarWatch = watch(
        barRef,
        (bar) => {
          const next = bar ?? null;
          if (next === attachedBar) return;
          attachedBar?.removeEventListener('focusin', onFocusIn);
          attachedBar = next;
          attachedBar?.addEventListener('focusin', onFocusIn);
        },
        { immediate: true },
      );
      onScopeDispose(() => {
        stopBarWatch();
        attachedBar?.removeEventListener('focusin', onFocusIn);
        attachedBar = null;
      });
    }

    // Initialize state on mount
    onScroll();
  }

  return {
    isHidden: readonly(isHidden),
    scrollDirection: readonly(scrollDirection),
    reveal,
  };
}
