/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { watch } from 'vue';
import { usePlayerStore, TICKS_PER_SECOND, RESUME_MIN_SECONDS } from '../stores/usePlayerStore';
import { useAuthStore } from '../stores/useAuthStore';

const DEVICE_ID_KEY = 'phlix.deviceId';
/** Minimum gap between server progress reports (ms). Deliberately lighter than the
 *  local persist throttle — the server only needs a periodic checkpoint, not every
 *  second of playback. */
const REPORT_THROTTLE = 15000;

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

  // A throttled checkpoint as the position advances, plus an immediate (forced)
  // checkpoint on each play/pause transition so a pause is captured even between
  // throttle windows.
  watch(
    () => Math.floor(player.position),
    () => void report(),
  );
  watch(
    () => player.playing,
    () => void report(true),
  );

  return { report };
}
