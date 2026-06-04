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
export declare function useResumeReporter(): UseResumeReporter;
