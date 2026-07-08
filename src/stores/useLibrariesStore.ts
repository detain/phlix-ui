/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchLibraries, type LibrarySummary } from '../api/libraries';
import { errMessage, ApiError } from '../api/errors';

/**
 * useLibrariesStore — a tiny shared cache of the viewer's libraries (already
 * sorted for display). Both the Browse rails and the dynamic library nav read
 * from here, so the list is fetched once per session and reused (the shell nav
 * and the Browse page would otherwise each hit `/api/v1/libraries`).
 *
 * `load()` is idempotent: it no-ops once loaded (pass `force` after a library
 * is created/removed in admin) and dedupes a concurrent in-flight call. A failed
 * load leaves `items` empty and records `error`; the Browse page renders an
 * EmptyState and the nav simply shows no library links (it never blocks the app).
 */
export const useLibrariesStore = defineStore('libraries', () => {
  const items = ref<LibrarySummary[]>([]);
  const loading = ref(false);
  const loaded = ref(false);
  const error = ref<string | null>(null);
  // The machine-readable error `code` from an `ApiError` body (e.g. the hub relay
  // proxy's `server.offline` / `server.relay_unavailable` 503s), preserved
  // ALONGSIDE `error` because `extractError` collapses the payload to its short
  // `error` label and drops the `code`. Consumers (BrowsePage) map it to an
  // actionable message; null when the failure carried no code (plain Error, etc.).
  const errorCode = ref<string | null>(null);

  let inflight: Promise<void> | null = null;

  async function load(apiBase: string, force = false): Promise<void> {
    if (loaded.value && !force) return;
    if (inflight) return inflight;

    loading.value = true;
    error.value = null;
    errorCode.value = null;
    inflight = (async () => {
      try {
        items.value = await fetchLibraries(apiBase);
        loaded.value = true;
      } catch (e) {
        error.value = errMessage(e, 'Failed to load libraries');
        errorCode.value =
          e instanceof ApiError && e.body && typeof e.body === 'object' && 'code' in e.body
            ? String((e.body as { code?: unknown }).code ?? '') || null
            : null;
      } finally {
        loading.value = false;
        inflight = null;
      }
    })();
    return inflight;
  }

  /** Look up a loaded library by id (e.g. to title the per-library page). */
  function byId(id: string): LibrarySummary | undefined {
    return items.value.find((l) => l.id === id);
  }

  return { items, loading, loaded, error, errorCode, load, byId };
});
