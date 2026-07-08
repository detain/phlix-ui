/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { onBeforeUnmount, watch, nextTick, type Ref } from 'vue';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/* Module-level scroll-lock refcount so stacked overlays (Modal + Sheet) don't
   clobber each other's saved body overflow on non-LIFO close. */
let scrollLocks = 0;
let savedOverflow = '';
function lockBodyScroll() {
  if (scrollLocks === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLocks++;
}
function unlockBodyScroll() {
  if (scrollLocks === 0) return;
  scrollLocks--;
  if (scrollLocks === 0) document.body.style.overflow = savedOverflow;
}

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
export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  active: Ref<boolean>,
  opts: { onEscape?: () => boolean | void; lockScroll?: boolean } = {},
) {
  const lockScroll = opts.lockScroll ?? true;
  let prevFocus: HTMLElement | null = null;
  let locked = false;

  function focusables(): HTMLElement[] {
    const root = container.value;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true',
    );
  }

  function onKeydown(e: KeyboardEvent) {
    if (!active.value || !container.value) return;
    if (e.key === 'Escape') {
      if (opts.onEscape?.()) e.preventDefault();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = focusables();
    if (items.length === 0) {
      e.preventDefault();
      container.value.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const act = document.activeElement as HTMLElement | null;
    if (!container.value.contains(act)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && act === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && act === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function activate() {
    prevFocus = document.activeElement as HTMLElement | null;
    container.value?.setAttribute('data-focus-trap', '');
    if (lockScroll) {
      lockBodyScroll();
      locked = true;
    }
    document.addEventListener('keydown', onKeydown, true);
    nextTick(() => {
      // Re-assert once the container ref is bound (e.g. mounted already-active,
      // where it was still null synchronously above) so the spatial-nav engine
      // can detect the active trap.
      container.value?.setAttribute('data-focus-trap', '');
      const items = focusables();
      (items[0] ?? container.value)?.focus();
    });
  }

  function deactivate() {
    container.value?.removeAttribute('data-focus-trap');
    document.removeEventListener('keydown', onKeydown, true);
    if (locked) {
      unlockBodyScroll();
      locked = false;
    }
    if (prevFocus && document.contains(prevFocus)) prevFocus.focus?.();
    prevFocus = null;
  }

  watch(active, (v) => (v ? activate() : deactivate()), { immediate: true });
  onBeforeUnmount(() => {
    container.value?.removeAttribute('data-focus-trap');
    document.removeEventListener('keydown', onKeydown, true);
    if (locked) {
      unlockBodyScroll();
      locked = false;
    }
  });
}
