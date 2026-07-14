/**
 * Source file.
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
export declare function useHeaderHideOnScroll(): UseHeaderHideOnScroll;
