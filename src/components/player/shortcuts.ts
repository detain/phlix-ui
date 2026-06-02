import { onMounted, onBeforeUnmount } from 'vue';

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
export const PLAYER_SHORTCUTS: ShortcutRow[] = [
  { id: 'playpause', keys: ['Space', 'K'], label: 'Play / pause' },
  { id: 'seek5', keys: ['ArrowLeft', 'ArrowRight'], label: 'Seek ±5s' },
  { id: 'seek10', keys: ['J', 'L'], label: 'Seek ±10s' },
  { id: 'frame', keys: [',', '.'], label: 'Frame step (paused)' },
  { id: 'volume', keys: ['ArrowUp', 'ArrowDown'], label: 'Volume' },
  { id: 'mute', keys: ['M'], label: 'Mute' },
  { id: 'fullscreen', keys: ['F'], label: 'Fullscreen' },
  { id: 'captions', keys: ['C'], label: 'Captions' },
  { id: 'theater', keys: ['T'], label: 'Theater' },
  { id: 'pip', keys: ['I'], label: 'Picture-in-picture' },
  { id: 'seekpct', keys: ['0', '–', '9'], label: 'Seek to %' },
  { id: 'speed', keys: ['<', '>'], label: 'Speed' },
  { id: 'help', keys: ['?'], label: 'This help' },
];

/** Map an arrow key token to its icon name (for help-overlay rendering). */
export const ARROW_ICONS: Record<string, string> = {
  ArrowLeft: 'arrow-left',
  ArrowRight: 'arrow-right',
  ArrowUp: 'arrow-up',
  ArrowDown: 'arrow-down',
};

/** Accessible names for the arrow-key caps in the help overlay. */
export const ARROW_LABELS: Record<string, string> = {
  ArrowLeft: 'Left arrow',
  ArrowRight: 'Right arrow',
  ArrowUp: 'Up arrow',
  ArrowDown: 'Down arrow',
};

/** True when the event originates from a button/link (Space/Enter already activate it). */
function isButtonTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toLowerCase();
  return tag === 'button' || tag === 'a' || el.getAttribute?.('role') === 'button';
}

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
export function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
  if (el.isContentEditable) return true;
  const role = el.getAttribute?.('role');
  return role === 'textbox' || role === 'searchbox';
}

/**
 * Resolve a keydown into a player action, returning true when it was handled.
 * Pure (no DOM) so it is trivially unit-testable; the composable wires it to the
 * document and adds the typing-suppression + modifier guards.
 */
export function handleShortcut(e: KeyboardEvent, a: ShortcutActions): boolean {
  switch (e.key) {
    case ' ':
      // Space already activates a focused button/link — don't also toggle play.
      if (isButtonTarget(e.target)) return false;
      a.playPause();
      return true;
    case 'k':
    case 'K':
      a.playPause();
      return true;
    case 'ArrowLeft':
      a.seekBy(-5);
      return true;
    case 'ArrowRight':
      a.seekBy(5);
      return true;
    case 'j':
    case 'J':
      a.seekBy(-10);
      return true;
    case 'l':
    case 'L':
      a.seekBy(10);
      return true;
    case ',':
      a.frameStep(-1);
      return true;
    case '.':
      a.frameStep(1);
      return true;
    case 'ArrowUp':
      a.volumeBy(0.05);
      return true;
    case 'ArrowDown':
      a.volumeBy(-0.05);
      return true;
    case 'm':
    case 'M':
      a.toggleMute();
      return true;
    case 'f':
    case 'F':
      a.toggleFullscreen();
      return true;
    case 'c':
    case 'C':
      a.toggleCaptions();
      return true;
    case 't':
    case 'T':
      a.toggleTheater();
      return true;
    case 'i':
    case 'I':
      a.togglePip();
      return true;
    case '<':
      a.speedStep(-1);
      return true;
    case '>':
      a.speedStep(1);
      return true;
    case '?':
      a.toggleHelp();
      return true;
    default:
      if (e.key >= '0' && e.key <= '9') {
        a.seekToPercent(Number(e.key) / 10);
        return true;
      }
      return false;
  }
}

/**
 * useKeyboardShortcuts — bind the player's global key map while mounted.
 * Suppresses shortcuts while the user is typing in an input and ignores
 * modifier chords (Ctrl/Meta/Alt) so browser/OS shortcuts still work.
 */
export function useKeyboardShortcuts(actions: ShortcutActions, opts: { enabled?: () => boolean } = {}): void {
  function onKeydown(e: KeyboardEvent): void {
    if (opts.enabled && !opts.enabled()) return; // e.g. suppressed while a modal is open
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTypingTarget(e.target)) return;
    if (handleShortcut(e, actions)) e.preventDefault();
  }
  onMounted(() => {
    if (typeof document !== 'undefined') document.addEventListener('keydown', onKeydown);
  });
  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') document.removeEventListener('keydown', onKeydown);
  });
}
