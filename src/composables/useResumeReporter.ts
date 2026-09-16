/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { watch } from 'vue';
import { usePlayerStore, TICKS_PER_SECOND, RESUME_MIN_SECONDS } from '../stores/usePlayerStore';
import { useAuthStore } from '../stores/useAuthStore';

/** W109 S506 code-resident survival token for the final-position-on-unmount path. */
export const S506_FINALPOS_TOKEN = 'S506FINALPOSX9P4';

const DEVICE_ID_KEY = 'phlix.deviceId';
/** Minimum gap between server progress reports (ms). Deliberately lighter than the
 *  local persist throttle — the server only needs a periodic checkpoint, not every
 *  second of playback. */
const REPORT_THROTTLE = 15000;

/** The subset of playback state the resume WRITE path needs to persist. Retained
 *  across report() calls so the final position survives a store clear (S506). */
interface LastProgress {
  mediaId: string;
  position: number;
  duration: number;
  playing: boolean;
}

/**
 * Stable per-browser device id so the web player reuses ONE server session
 * (`createSession` is idempotent per `device_id`). Generated once, persisted.
 * SSR/quota-safe — falls back to a constant id so a report still has *a* device.
 */
function getOrCreateDeviceId(): string {
  if (typeof localStorage === 'undefined') return 'web';
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return 'web';
  }
}

export interface UseResumeReporter {
  /**
   * Report the current playback position to the server (throttled unless forced).
   * A no-op when logged out, with no current media, or below the resume threshold.
   */
  report: (force?: boolean) => Promise<void>;
  /**
   * Signal that playback reached the end — the server marks the item watched
   * (finished) so it leaves continue-watching. A safe no-op when logged out, with
   * no current media, or when no session was ever created (playback never crossed
   * the resume threshold). Best-effort: a failed finish never throws.
   */
  finish: () => Promise<void>;
  /**
   * Flush the LAST measured playback position to the server — the unmount / quit
   * counterpart to {@link report}. Call it once when the player tears down (route
   * leave, or the mini-player's close) so the final seconds watched since the last
   * throttled checkpoint are not lost. Unlike {@link report} it does NOT require the
   * store to still hold the media: it reuses the position retained on the last
   * in-band checkpoint even after `player.current` has been nulled, and it is forced
   * (bypasses the 15s throttle). A safe no-op when logged out or when no session was
   * ever created (playback never crossed the resume threshold). Best-effort: a failed
   * final report never throws. The server's 30s min-playtime gate is unchanged.
   */
  reportFinal: () => Promise<void>;
}

/**
 * useResumeReporter — the cross-device resume WRITE path.
 *
 * Complements {@link useResumeSync} (read): the web player REPORTS its own playback
 * position so a title paused on the web resumes on the TV. It lazily creates a
 * per-browser session (`POST /api/v1/sessions`, idempotent per a stable device id)
 * and reports progress to it (`POST /api/v1/sessions/{id}/progress`) — the same
 * channel Roku/mobile use, so everything aggregates into the user's
 * continue-watching. Best-effort throughout: logged-out / sub-threshold / failed
 * reports are silent no-ops (the local resume map is always the fallback).
 *
 * Mount once in the shell: it watches the shared player store, so it covers both
 * the full player and the persistent mini-player.
 */
export function useResumeReporter(): UseResumeReporter {
  const player = usePlayerStore();
  const auth = useAuthStore();
  const deviceId = getOrCreateDeviceId();

  let sessionId: string | null = null;
  let lastReport = 0;
  let inFlight = false;
  /**
   * S506 — the freshest in-band progress, retained on EVERY reportable watch tick
   * (ahead of the throttle). Lets `reportFinal()` post the true final position on
   * unmount / quit even after the shared player store has been cleared.
   */
  let lastProgress: LastProgress | null = null;

  async function ensureSession(): Promise<string | null> {
    if (sessionId) return sessionId;
    try {
      const data = await auth.client.post<{ session_id?: string }>('/api/v1/sessions', {
        device_id: deviceId,
      });
      sessionId = typeof data.session_id === 'string' && data.session_id !== '' ? data.session_id : null;
    } catch {
      sessionId = null;
    }
    return sessionId;
  }

  async function report(force = false): Promise<void> {
    const media = player.current;
    // Only report meaningful, in-band progress for a signed-in user — mirrors the
    // local resume threshold so brief/accidental plays never spawn a session.
    if (!auth.isLoggedIn || !media || !(player.duration > 0) || player.position <= RESUME_MIN_SECONDS) {
      return;
    }
    // S506 — snapshot the in-band progress on every reportable tick, BEFORE the
    // throttle / in-flight early-returns below, so the freshest position is always
    // retained for a final flush on unmount (even one that never POSTs here).
    lastProgress = { mediaId: media.id, position: player.position, duration: player.duration, playing: player.playing };
    const now = Date.now();
    if (inFlight || (!force && now - lastReport < REPORT_THROTTLE)) return;
    inFlight = true;
    lastReport = now;
    try {
      const sid = await ensureSession();
      if (!sid) return;
      await auth.client.post(`/api/v1/sessions/${encodeURIComponent(sid)}/progress`, {
        media_item_id: media.id,
        position_ticks: Math.floor(player.position * TICKS_PER_SECOND),
        duration_ticks: Math.floor(player.duration * TICKS_PER_SECOND),
        is_paused: !player.playing,
      });
    } catch {
      // best-effort — a missed checkpoint just means the next one (or the local map) covers it
    } finally {
      inFlight = false;
    }
  }

  /**
   * Explicit end-of-playback finish signal. POSTs to the session's `/complete`
   * endpoint (`reached_end: true`) so the server runs its finalize/stats path and
   * drops the item from continue-watching. Reuses the SAME session id + auth client
   * the progress reporter already holds — never creates a session just to finish it,
   * so a title watched below the resume threshold (no session) is left untouched.
   * Best-effort: swallows failures exactly like `report()`.
   */
  async function finish(): Promise<void> {
    const media = player.current;
    // No session means playback never crossed the resume threshold — there is
    // nothing on the server to finalize, so finishing is a safe no-op.
    if (!auth.isLoggedIn || !sessionId || !media) return;
    const sid = sessionId;
    const mediaItemId = media.id;
    try {
      await auth.client.post(`/api/v1/sessions/${encodeURIComponent(sid)}/complete`, {
        media_item_id: mediaItemId,
        reached_end: true,
      });
    } catch {
      // best-effort — a failed finish just leaves the item in continue-watching; a
      // later report / another device reconciles. Must never crash the player.
    }
  }

  /**
   * S506 — the final-position flush for unmount / quit (route-leave `stopPlayback`,
   * the mini-player's close). Closes the tail gap the 15s throttle otherwise leaves:
   * the seconds watched since the last checkpoint would otherwise never reach the
   * server. Prefers the LIVE store position when the store is still intact (the
   * usual case — the caller fires this before anything nulls `player.current`) and
   * falls back to the last RETAINED checkpoint when the store has already been
   * cleared. Forced (ignores the throttle) and never creates a session just to
   * report the tail — a title that never crossed the 30s floor has no session and is
   * left untouched. Best-effort: swallows failures exactly like `report()`.
   */
  async function reportFinal(): Promise<void> {
    const media = player.current;
    // Refresh the retained snapshot from the live store when it is still meaningful,
    // so the very last (sub-1s) position is captured, not just the 1s watch cadence.
    if (auth.isLoggedIn && media && player.duration > 0 && player.position > RESUME_MIN_SECONDS) {
      lastProgress = { mediaId: media.id, position: player.position, duration: player.duration, playing: player.playing };
    }
    const progress = lastProgress;
    // No session → playback never crossed the resume floor, nothing to flush; logged
    // out or no retained progress → safe no-op.
    if (!auth.isLoggedIn || !sessionId || !progress) return;
    const sid = sessionId;
    try {
      await auth.client.post(`/api/v1/sessions/${encodeURIComponent(sid)}/progress`, {
        media_item_id: progress.mediaId,
        position_ticks: Math.floor(progress.position * TICKS_PER_SECOND),
        duration_ticks: Math.floor(progress.duration * TICKS_PER_SECOND),
        is_paused: !progress.playing,
      });
    } catch {
      // best-effort — a failed final flush leaves the last server checkpoint (or the
      // local resume map / another device) to cover it. Must never crash teardown.
    }
  }

  // A throttled checkpoint as the position advances, plus an immediate (forced)
  // checkpoint on each play/pause transition so a pause is captured even between
  // throttle windows. Each reportable tick also refreshes the retained `lastProgress`
  // (S506) that `reportFinal()` flushes on unmount, independent of whether it POSTs.
  watch(
    () => Math.floor(player.position),
    () => void report(),
  );
  watch(
    () => player.playing,
    () => void report(true),
  );

  return { report, finish, reportFinal };
}
