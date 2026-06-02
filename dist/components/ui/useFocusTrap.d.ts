import { type Ref } from 'vue';
/**
 * Focus-trap + scroll-lock + Escape for overlay surfaces (Modal/Sheet, R0.4d).
 *
 * While `active`, it: remembers the previously-focused element, optionally locks
 * body scroll (refcounted for stacking), moves focus into `container`, traps
 * Tab/Shift+Tab inside it, and calls `onEscape` on Esc. `onEscape` returns truthy
 * when it handled the key — only then is the default prevented, so a non-handling
 * (e.g. non-dismissible) overlay doesn't swallow Esc from outer handlers. On
 * deactivate (or unmount) it restores scroll + focus (only if the opener is still
 * in the DOM). The keydown listener is capture-phase on document.
 */
export declare function useFocusTrap(container: Ref<HTMLElement | null>, active: Ref<boolean>, opts?: {
    onEscape?: () => boolean | void;
    lockScroll?: boolean;
}): void;
