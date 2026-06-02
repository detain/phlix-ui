/** A keyboard shortcut row — display only (the matching lives in the handler). */
export interface ShortcutRow {
    id: string;
    /** Display key caps (chord/alternatives), e.g. `['Space', 'K']`. */
    keys: string[];
    label: string;
}
/**
 * The player's keyboard map — the single source the help overlay renders from.
 * Arrow keys use the `Arrow*` tokens (rendered as SVG arrow icons by the help
 * overlay, never glyph chars — keeps the anti-slop gate clean); `–` is a literal
 * range separator.
 */
export declare const PLAYER_SHORTCUTS: ShortcutRow[];
/** Map an arrow key token to its icon name (for help-overlay rendering). */
export declare const ARROW_ICONS: Record<string, string>;
/** Accessible names for the arrow-key caps in the help overlay. */
export declare const ARROW_LABELS: Record<string, string>;
/** Action callbacks the player wires to its transport/store. */
export interface ShortcutActions {
    playPause(): void;
    /** Seek by a delta in seconds (can be negative). */
    seekBy(deltaSeconds: number): void;
    /** Step one frame in the given direction (only meaningful while paused). */
    frameStep(direction: 1 | -1): void;
    /** Nudge volume by a 0–1 delta. */
    volumeBy(delta: number): void;
    toggleMute(): void;
    toggleFullscreen(): void;
    toggleCaptions(): void;
    toggleTheater(): void;
    togglePip(): void;
    /** Seek to a 0–1 fraction of the duration. */
    seekToPercent(fraction: number): void;
    /** Step playback speed up/down the ladder. */
    speedStep(direction: 1 | -1): void;
    toggleHelp(): void;
}
/** True when the event originates from a text-entry control (don't hijack typing). */
export declare function isTypingTarget(target: EventTarget | null): boolean;
/**
 * Resolve a keydown into a player action, returning true when it was handled.
 * Pure (no DOM) so it is trivially unit-testable; the composable wires it to the
 * document and adds the typing-suppression + modifier guards.
 */
export declare function handleShortcut(e: KeyboardEvent, a: ShortcutActions): boolean;
/**
 * useKeyboardShortcuts — bind the player's global key map while mounted.
 * Suppresses shortcuts while the user is typing in an input and ignores
 * modifier chords (Ctrl/Meta/Alt) so browser/OS shortcuts still work.
 */
export declare function useKeyboardShortcuts(actions: ShortcutActions, opts?: {
    enabled?: () => boolean;
}): void;
