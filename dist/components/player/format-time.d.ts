/**
 * formatTime (R3.2) — seconds → `m:ss` (or `h:mm:ss` past an hour), zero-padded.
 * Shared by the Player chrome and the Scrubber so the timecode reads identically.
 */
export declare function formatTime(secs: number): string;
