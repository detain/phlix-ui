/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchThemes } from '../api/themes';
import { errMessage } from '../api/errors';
import { activeThemeStyle, type ActiveThemeStyle, type ServerTheme } from '../composables/themeTokens';

/**
 * useThemesStore (S86) — the server's theme catalogue, fetched once per session.
 *
 * Deliberately shaped like `useLibrariesStore`: `load()` is idempotent, dedupes
 * a concurrent in-flight call, and a failure is RECORDED rather than thrown. A
 * failed load must be a complete non-event for the user — the three built-in
 * themes live in the SPA's own stylesheet and are already painted, so an
 * unreachable/unauthenticated `/api/v1/themes` just means the picker shows
 * three entries instead of four.
 *
 * The store holds only the catalogue. Nothing here touches the DOM; applying a
 * theme is `useTheme`'s job, which reads `styleFor()`.
 */
export const useThemesStore = defineStore('themes', () => {
  /** Every theme the server serves — built-ins first, then plugin themes by id. */
  const items = ref<ServerTheme[]>([]);
  const loading = ref(false);
  const loaded = ref(false);
  const error = ref<string | null>(null);

  let inflight: Promise<void> | null = null;

  /**
   * Fetch the catalogue. No-ops once loaded (pass `force` after enabling or
   * disabling a theme plugin) and no-ops entirely without an `apiBase`, so a
   * host app or unit test that never provides one makes no network call.
   */
  async function load(apiBase: string, force = false): Promise<void> {
    if (apiBase === '') return;
    if (loaded.value && !force) return;
    if (inflight) return inflight;

    loading.value = true;
    error.value = null;
    inflight = (async () => {
      try {
        items.value = await fetchThemes(apiBase);
        loaded.value = true;
      } catch (e) {
        error.value = errMessage(e, 'Failed to load themes');
      } finally {
        loading.value = false;
        inflight = null;
      }
    })();
    return inflight;
  }

  /**
   * The non-built-in themes, i.e. everything a theme PLUGIN contributed. These
   * are what the appearance picker appends after its three static entries.
   */
  const pluginThemes = computed(() => items.value.filter((t) => !t.builtIn));

  /** Look up a theme by id (e.g. to label the current selection). */
  function byId(id: string): ServerTheme | undefined {
    return items.value.find((t) => t.id === id);
  }

  /**
   * The `<html>` style a chosen theme id needs — a built-in base to sit on plus
   * the flattened token map — or null for a built-in (nothing to apply) or an
   * id this server does not serve.
   */
  function styleFor(id: string): ActiveThemeStyle | null {
    return activeThemeStyle(id, items.value);
  }

  return { items, loading, loaded, error, pluginThemes, load, byId, styleFor };
});
