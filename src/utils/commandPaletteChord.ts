/**
 * Platform-appropriate command-palette chord label (review C2).
 *
 * The ⌘ glyph does not exist on Windows/Linux keyboards, yet the hotkey
 * (`useCommandPaletteHotkey`) fires on `metaKey || ctrlKey` everywhere. The
 * trigger button's accessible name must therefore name the chord the user can
 * actually press: ⌘K on Apple platforms, Ctrl+K elsewhere.
 *
 * `userAgent` is injectable so callers (and tests) can pin a platform without
 * touching `navigator`; when no UA is visible (SSR, worker) we fall back to
 * the non-Apple label — `Ctrl+K` is never a *wrong* instruction on keyboards
 * that lack a ⌘ key, while `⌘K` is always wrong off-Apple.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

const APPLE_UA_PATTERN = /Macintosh|Mac OS X|iPhone|iPad|iPod/;

/** True when the given (or ambient) user agent is an Apple platform. */
export function isApplePlatform(userAgent?: string): boolean {
  const ua = userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  return APPLE_UA_PATTERN.test(ua);
}

/** The chord label to render into `{chord}` message interpolations. */
export function commandPaletteChord(userAgent?: string): '⌘K' | 'Ctrl+K' {
  return isApplePlatform(userAgent) ? '⌘K' : 'Ctrl+K';
}
