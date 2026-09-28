/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { getCurrentInstance, onUnmounted, shallowRef, type Ref } from 'vue';
import { usePlayerStore, TICKS_PER_SECOND } from '../stores/usePlayerStore';
import { useAuthStore } from '../stores/useAuthStore';
import type { MediaItem } from '../types/media-item';

/** One row of `GET /api/v1/users/me/continue-watching`. The server returns the
 *  full MediaListItem shape (all list-row fields) plus `position_ticks`.
 *  We persist the full item for the Continue Watching rail and convert
 *  ticks→seconds for the resume map. */
interface ContinueWatchingItem extends MediaItem {
  position_ticks?: number;
}

export interface UseResumeSync {
  /**
   * Pull the user's server-side resume positions (from continue-watching) and
   * merge them into the local resume map. No-op when logged out; best-effort —
   * any failure (offline, 401, non-JSON) silently leaves the local map untouched.
   */
  syncResume: () => Promise<void>;
  /** Reactive feed of the full items from the last successful sync — powers the
   *  Continue Watching rail directly so a title paused on another device shows
   *  even if it isn't loaded in any rail. Shared across every composable
   *  instance so a sync from anywhere (login, tab refocus, BrowsePage mount)
   *  propagates to every consumer via ordinary reactivity. */
  continueWatchingItems: Readonly<Ref<readonly MediaItem[]>>;
}

// Module-level SHARED reactive source. Every useResumeSync() instance
// (PhlixApp on login, BrowsePage on mount, the visibility handler) reads and
// writes the SAME ref, so the item feed — not just the position map — is shared
// across the app. A shallowRef suffices because the array is REPLACED wholesale
// on each sync (never mutated in place); the wholesale reassignment is exactly
// what propagates the update to a `computed`/consuming component. (Previously
// this was a per-call plain `let`, so a consumer that destructured a
// getter-returned array captured a stale empty reference and never updated —
// the Continue Watching rail never showed cross-device items. U-N4.)
const syncedItems = shallowRef<readonly MediaItem[]>([]);

// The document `visibilitychange` listener is refcounted against the component
// callers that mounted it: it survives until the LAST scoped consumer unmounts.
// (Previously a single boolean tore it down on the FIRST unmount while other
// consumers stayed mounted — visibility re-sync silently died; and the flag then
// stayed consistent with "removed", but any unscoped re-attach raced the same
// trap. S: audit finding 5.)
let listenerAttached = false;
let scopedConsumers = 0;

function handleVisibilityChange(): void {
  if (document.visibilityState === 'visible') {
    // Re-sync positions when the tab regains focus so the rail reflects any
    // progress made on other devices while this tab was hidden (U-N8).
    // Defer to avoid racing with the browser's own restoration.
    setTimeout(() => void useResumeSync().syncResume(), 100);
  }
}

function attachVisibilityListener(): void {
  // Only callers inside a component setup join the refcount and register
  // teardown; the deferred visibility callback (and tests) call unscoped and
  // must NOT register an onUnmounted they never trigger.
  if (getCurrentInstance()) {
    scopedConsumers += 1;
    onUnmounted(() => {
      scopedConsumers = Math.max(0, scopedConsumers - 1);
      if (scopedConsumers === 0 && listenerAttached) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        listenerAttached = false;
      }
    });
  }
  if (listenerAttached) return;
  listenerAttached = true;
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

/**
 * Shared in-flight memo (same shape as `ApiClient.refreshToken`): concurrent
 * callers — login + tab refocus + a component mount in the same tick — await ONE
 * request instead of stampeding the endpoint. Cleared in `finally` so the next
 * intent after a settle fetches fresh.
 */
let syncInFlight: Promise<void> | null = null;

async function runSyncResume(): Promise<void> {
  const player = usePlayerStore();
  const auth = useAuthStore();
  if (!auth.isLoggedIn) return;

  try {
    const data = await auth.client.get<{ items?: ContinueWatchingItem[] }>(
      '/api/v1/users/me/continue-watching',
    );
    const positions: Record<string, number> = {};
    const validItems: MediaItem[] = [];
    for (const item of data.items ?? []) {
      const ticks = item.position_ticks;
      if (typeof item.id === 'string' && typeof ticks === 'number' && ticks > 0) {
        positions[item.id] = Math.floor(ticks / TICKS_PER_SECOND);
        // Retain the full item payload so BrowsePage can render the rail
        // without requiring the item to be present in any loaded rail.
        validItems.push(item as MediaItem);
      }
    }
    player.mergeServerResume(positions);
    // Wholesale reassignment (NOT in-place mutation) of the shared ref so its
    // consumers reactively update — this is the fix for U-N4.
    syncedItems.value = validItems;
  } catch {
    // Best-effort enhancement over the local map — never block or surface errors.
  }
}

function syncResumeShared(): Promise<void> {
  if (syncInFlight) return syncInFlight;
  syncInFlight = runSyncResume().finally(() => {
    syncInFlight = null;
  });
  return syncInFlight;
}

/**
 * useResumeSync — the cross-device resume READ path.
 *
 * The web player's resume map is otherwise localStorage-only, so a title paused on
 * another device (Roku/mobile, which report progress through their playback
 * sessions) never surfaced here. This fetches the server's per-user resume
 * positions (`GET /api/v1/users/me/continue-watching`, already aggregated across
 * the user's sessions) and merges them in via `usePlayerStore.mergeServerResume`
 * (which keeps any local position — see its fill-gaps policy). The merged map feeds
 * both the player's resume prompt and the Browse "Continue Watching" rail, while the
 * full item payloads feed the rail directly (`continueWatchingItems`).
 *
 * Reporting the web player's OWN progress back to the server (the write path) needs
 * the web player to participate in the session model and is a separate follow-up.
 */
export function useResumeSync(): UseResumeSync {
  attachVisibilityListener();

  return {
    syncResume: syncResumeShared,
    continueWatchingItems: syncedItems,
  };
}
