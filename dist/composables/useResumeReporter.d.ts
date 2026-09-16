/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** W109 S506 code-resident survival token for the final-position-on-unmount path. */
export declare const S506_FINALPOS_TOKEN = "S506FINALPOSX9P4";
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
     * final report never throws. The server's 30s min-playtime gate is unchanged. Live
     * streams need no separate close here: sessions are idempotent per device id (see
     * `getOrCreateDeviceId`), so there is no per-stream session to tear down on unmount —
     * flushing the final position IS the complete quit contract (S506: the finding's
     * "close live-stream ids on unmount" is therefore n/a, recorded here as the note it
     * required).
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
export declare function useResumeReporter(): UseResumeReporter;
