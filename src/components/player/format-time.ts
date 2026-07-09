/**
 * formatTime (R3.2) — seconds → `m:ss` (or `h:mm:ss` past an hour), zero-padded.
 * Shared by the Player chrome and the Scrubber so the timecode reads identically.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
export function formatTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return '0:00';
  const total = Math.floor(secs);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  return `${h > 0 ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}
