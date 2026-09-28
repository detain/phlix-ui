/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { onScopeDispose, readonly, ref, type DeepReadonly, type Ref } from 'vue';

/** Return shape of {@link useHeaderHideOnScroll}. */
export interface UseHeaderHideOnScroll {
  /** Whether the header is currently hidden (scrolled out of view). */
  isHidden: DeepReadonly<Ref<boolean>>;
  /** Current scroll direction. */
  scrollDirection: DeepReadonly<Ref<'up' | 'down' | 'none'>>;
}

/**
 * Hide-on-scroll composable for the app header (R5.1).
 *
 * Tracks scroll direction and hides the header when scrolling down past the
 * threshold, revealing it again when scrolling up. The header stays visible
 * when `prefers-reduced-motion: reduce` is set.
 *
 * SSR-safe: no listeners are attached when `window` is unavailable.
 *
 * @example
 * const { isHidden, scrollDirection } = useHeaderHideOnScroll();
 */
export function useHeaderHideOnScroll(): UseHeaderHideOnScroll {
  /** px of scroll before the header hides — prevents micro-scrolls triggering hide. */
  const THRESHOLD = 50;

  const lastScrollY = ref(0);
  const scrollDirection = ref<'up' | 'down' | 'none'>('none');
  const isHidden = ref(false);

  /** Check if user prefers reduced motion — if so, never hide the header. */
  const prefersReducedMotion = ref(false);

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
    // Only hide if user has scrolled down enough AND is not at the top
    if (currentScrollY > THRESHOLD) {
      isHidden.value = scrollDirection.value === 'down';
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

    // Initialize state on mount
    onScroll();
  }

  return {
    isHidden: readonly(isHidden),
    scrollDirection: readonly(scrollDirection),
  };
}
