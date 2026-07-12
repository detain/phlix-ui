/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type Ref } from 'vue';
import type { MediaItem } from '../types/media-item';
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
export declare function useResumeSync(): UseResumeSync;
