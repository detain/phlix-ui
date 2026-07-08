/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { onScopeDispose } from 'vue';
import { useCommandStore } from '../stores/useCommandStore';

/**
 * Always-on global ⌘K / Ctrl-K command-palette hotkey (R6.1b).
 *
 * Lives in this tiny composable — separate from the heavy `CommandPalette.vue`
 * UI — so the shell can mount the palette as a lazy `defineAsyncComponent` that
 * only fetches its chunk on first open, while the hotkey that *triggers* that
 * first open stays in the main bundle and works before the palette has ever
 * rendered. Mount it once in the app shell (`PhlixApp`).
 *
 * SSR-safe: attaches a `keydown` listener for the lifetime of the owning
 * reactive scope (component setup or `effectScope`) and detaches it on dispose.
 * The modifier guard mirrors what the palette used before: Cmd/Ctrl + K (with no
 * Alt) toggles the palette and `preventDefault()`s the event.
 *
 * @example
 * // in the app shell setup:
 * useCommandPaletteHotkey();
 */
export function useCommandPaletteHotkey(): void {
  const store = useCommandStore();

  const onKey = (e: KeyboardEvent): void => {
    if ((e.metaKey || e.ctrlKey) && !e.altKey && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      store.togglePalette();
    }
  };

  if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    document.addEventListener('keydown', onKey);
    onScopeDispose(() => document.removeEventListener('keydown', onKey));
  }
}
