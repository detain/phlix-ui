/**
 * useThemeSyncStore — the law of one server-side copy of the theme pref.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePreferencesStore } from './usePreferencesStore';
import { useThemesStore } from './useThemesStore';
import { useAuthStore } from './useAuthStore';
import { isBuiltInThemeId } from '../composables/themeTokens';
import { fetchThemeSetting, putThemeSetting } from '../api/themeSettings';

/** Rapid pick-through (arrows/clicks) must cost ONE write, not a stampede. */
const PUT_DEBOUNCE_MS = 1000;

/**
 * Keeps the account's server-side theme in step with the device.
 *
 * Three laws, each pinned in `useThemeSyncStore.test.ts`:
 *
 *  1. **Adoption is silent and server-wins.** Once per login the store reads
 *     `GET /api/v1/users/me/settings`; a theme that is known here (a built-in
 *     or in the catalogue) and differs from the local preference REPLACES it —
 *     that is the cross-device unification this feature exists for, and a
 *     console-client choice therefore follows the user into the browser.
 *     EVERY failure on that path (hub 404, offline, auth, malformed envelope)
 *     degrades to local-only with zero UI noise: the server copy is a bonus,
 *     never a dependency. A dead catalogue short-circuits the sync entirely —
 *     `/api/v1/users/me/settings` is absent on exactly the mounts where
 *     `/api/v1/themes` is absent (the hub), so there is nothing to ask.
 *  2. **An adoption never echoes back as a save.** `serverTheme` holds the
 *     value known durable on the server and is written BEFORE the preference
 *     it triggers; the selection watcher in `useTheme` routes through
 *     `queuePut`, whose first check is equality against it.
 *  3. **A failed save is disclosure, not drama.** `putFailed` drives one
 *     unobtrusive inline hint. Nothing rolls back, nothing repaints — the
 *     instant local apply (S86) stays exactly as it was; the next successful
 *     save clears the flag.
 *
 * Optimistic bookkeeping, stated honestly: `serverTheme` advances only on a
 * PUT that both carried the LATEST user value and succeeded — so the guard
 * can never bless a value the server rejected, and a stale in-flight write
 * (user moved on while it was sent) does not move the guard either.
 */
export const useThemeSyncStore = defineStore('themeSync', () => {
  const prefs = usePreferencesStore();
  const themes = useThemesStore();
  const auth = useAuthStore();

  /** The value known durable on the server right now — THE loop guard. */
  const serverTheme = ref<string | null>(null);
  /** The latest debounced save could not be completed (drives the hint). */
  const putFailed = ref(false);

  let syncStarted = false;
  let pendingTimer: ReturnType<typeof setTimeout> | undefined;
  /** The value the pending/in-flight PUT carries (success bookkeeping). */
  let lastArmed: string | null = null;
  let inflight = 0;

  function disarm(): void {
    if (pendingTimer !== undefined) {
      clearTimeout(pendingTimer);
      pendingTimer = undefined;
    }
  }

  /**
   * One-shot, once per login: pull the account's theme and adopt it when real
   * and known. Call from a reactive seam that watches `isLoggedIn` (useTheme
   * does); {@link endSession} re-arms it on logout.
   */
  async function syncFromServer(apiBase: string | null): Promise<void> {
    if (apiBase === null || syncStarted) return;
    syncStarted = true;
    try {
      // The catalogue decides whether a server-sent id is adoptable; `load()`
      // is idempotent and dedupes the picker's concurrent force-load.
      await themes.load(apiBase);
      if (themes.error !== null) return; // see law 1: a dead catalogue means no settings route either.

      const theme = await fetchThemeSetting(apiBase);
      if (theme === null) return; // fresh account: the server holds nothing yet.
      if (!(isBuiltInThemeId(theme) || themes.byId(theme) !== undefined)) return; // fossil/renamed: local stands.

      serverTheme.value = theme; // BEFORE the reactive write — the echo guard must already see it.
      if (prefs.theme !== theme) prefs.theme = theme;
    } catch {
      // Silent by design — the whole degrade path is one test line away.
    }
  }

  /**
   * A user selection (click or arrow key) reached the preferences store:
   * schedule its server-side persistence, coalescing rapid changes.
   *
   * No-ops signed out (an anonymous preference is device-local by
   * definition), and no-ops for the value already durable — which is how an
   * adopted theme never PUTs itself back.
   */
  function queuePut(apiBase: string, theme: string): void {
    if (!auth.isLoggedIn) return;
    disarm(); // the newest intent always wins the slot — even a "back to the server value" change of mind.
    if (theme === serverTheme.value && inflight === 0) return;

    lastArmed = theme;
    pendingTimer = setTimeout(() => {
      pendingTimer = undefined;
      const value = lastArmed;
      if (value === null || (value === serverTheme.value && inflight === 0)) return;

      inflight += 1;
      void putThemeSetting(apiBase, value)
        .then(() => {
          if (value === lastArmed) serverTheme.value = value;
          putFailed.value = false;
        })
        .catch(() => {
          // A failed save changes NOTHING visible except the hint: the local
          // apply stands (law 3), and `serverTheme` stays the last truth.
          if (value === lastArmed) putFailed.value = true;
        })
        .finally(() => {
          inflight -= 1;
        });
    }, PUT_DEBOUNCE_MS);
  }

  /** Logout / session end: forget everything known about the old account. */
  function endSession(): void {
    syncStarted = false;
    disarm();
    lastArmed = null;
    serverTheme.value = null;
    putFailed.value = false;
  }

  return { serverTheme, putFailed, syncFromServer, queuePut, endSession };
});
