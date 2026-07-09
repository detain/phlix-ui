/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { usePlayerStore, TICKS_PER_SECOND } from '../stores/usePlayerStore';
import { useAuthStore } from '../stores/useAuthStore';

/** One row of `GET /api/v1/users/me/continue-watching`. The server returns the
 *  position in 100-nanosecond ticks; only `id` + `position_ticks` are read here. */
interface ContinueWatchingItem {
  id?: string;
  position_ticks?: number;
}

export interface UseResumeSync {
  /**
   * Pull the user's server-side resume positions (from continue-watching) and
   * merge them into the local resume map. No-op when logged out; best-effort —
   * any failure (offline, 401, non-JSON) silently leaves the local map untouched.
   */
  syncResume: () => Promise<void>;
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

  async function syncResume(): Promise<void> {
    if (!auth.isLoggedIn) return;
    try {
      const data = await auth.client.get<{ items?: ContinueWatchingItem[] }>(
        '/api/v1/users/me/continue-watching',
      );
      const positions: Record<string, number> = {};
      for (const item of data.items ?? []) {
        const ticks = item.position_ticks;
        if (typeof item.id === 'string' && typeof ticks === 'number' && ticks > 0) {
          positions[item.id] = Math.floor(ticks / TICKS_PER_SECOND);
        }
      }
      player.mergeServerResume(positions);
    } catch {
      // Best-effort enhancement over the local map — never block or surface errors.
    }
  }

  return { syncResume };
}
