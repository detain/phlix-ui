/**
 * useHeaderHideOnScroll — hide-on-scroll-down / reveal-on-scroll-up header chrome.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type DeepReadonly, type Ref } from 'vue';
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
export declare function useHeaderHideOnScroll(barRef?: Ref<HTMLElement | null>): UseHeaderHideOnScroll;
