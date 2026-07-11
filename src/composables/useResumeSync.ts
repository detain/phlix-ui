/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { onUnmounted } from 'vue';
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
  /** Full items from the last successful sync — powers the Continue Watching
   *  rail directly so a title paused on another device shows even if not
   *  loaded in any rail. */
  continueWatchingItems: readonly MediaItem[];
}

let syncedItems: MediaItem[] = [];

function handleVisibilityChange(): void {
  if (document.visibilityState === 'visible') {
    // Re-sync positions when the tab regains focus so the rail reflects any
    // progress made on other devices while this tab was hidden.
    // Defer to avoid racing with the browser's own restoration.
    setTimeout(() => void useResumeSync().syncResume(), 100);
  }
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
 * both the player's resume prompt and the Browse "Continue Watching" rail.
 *
 * Reporting the web player's OWN progress back to the server (the write path) needs
 * the web player to participate in the session model and is a separate follow-up.
 */
export function useResumeSync(): UseResumeSync {
  const player = usePlayerStore();
  const auth = useAuthStore();

  // Attach visibilitychange once per composable instance (on first syncResume call
  // from this instance). Subsequent calls skip the attachment. The listener is
  // idempotent so multiple instances don't cause issues.
  let listenerAttached = false;

  async function syncResume(): Promise<void> {
    if (!auth.isLoggedIn) return;

    if (!listenerAttached) {
      listenerAttached = true;
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

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
      syncedItems = validItems;
    } catch {
      // Best-effort enhancement over the local map — never block or surface errors.
    }
  }

  return {
    syncResume,
    get continueWatchingItems(): readonly MediaItem[] {
      return syncedItems;
    },
  };
}

// Ensure the visibilitychange listener is cleaned up when the app unloads.
onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
