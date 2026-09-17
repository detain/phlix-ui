/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type Ref } from 'vue';
/** How many focus layers are currently open (0 = base screen). */
export declare function layerFocusDepth(): number;
/** Orphan-recovery teardown: forget all remembered openers at once. */
export declare function clearLayerFocus(): void;
/**
 * Focus-trap + scroll-lock + Escape for overlay surfaces (Modal/Sheet, R0.4d).
 *
 * While `active`, it: remembers the previously-focused element, optionally locks
 * body scroll (refcounted for stacking), moves focus into `container`, traps
 * Tab/Shift+Tab inside it, and calls `onEscape` on Esc. `onEscape` returns truthy
 * when it handled the key — only then is the default prevented, so a non-handling
 * (e.g. non-dismissible) overlay doesn't swallow Esc from outer handlers. On
 * deactivate (or unmount) it restores scroll + focus — the opener if it is
 * still in the DOM, or a defined spatial anchor when the LAST layer closes
 * over an orphaned opener (AD-9 layer focus memory, never a silent body leak).
 * The keydown listener is capture-phase on document.
 */
export declare function useFocusTrap(container: Ref<HTMLElement | null>, active: Ref<boolean>, opts?: {
    onEscape?: () => boolean | void;
    lockScroll?: boolean;
}): void;
