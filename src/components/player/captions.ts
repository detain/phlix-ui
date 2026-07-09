/**
 * captions.ts (R3.5) — pure, DOM-light helpers behind the player's caption UX.
 *
 * The Player renders cues itself (a custom overlay, not native `::cue`) for full
 * styling control: the selected text track is put in `mode='hidden'` so the UA
 * parses cues and fires `cuechange` WITHOUT painting them, and we draw the active
 * cue lines into our own layer. Everything here is feature-detected + array-like
 * guarded so it degrades to no-ops under jsdom/SSR (which expose empty track
 * lists). Cue text is stripped of markup and rendered as TEXT (never v-html).
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { SelectOption } from '../ui/listbox';
import type {
  CaptionStyle,
  CaptionSize,
  CaptionBackground,
  CaptionEdge,
} from '../../stores/usePreferencesStore';

/** A subtitle / audio track surfaced to the menu. */
export interface TextTrackInfo {
  /** Position within its (filtered) kind list — the key used to switch audio. */
  index: number;
  /** BCP-47 language code, or a stable fallback key when the track has none. */
  language: string;
  /** Human label (track label → language display name → "Track N"). */
  label: string;
  kind: string;
}

/** Loosely-typed media element (audioTracks isn't in the standard DOM lib). */
type MediaElementLike = (HTMLVideoElement | null | undefined) & {
  audioTracks?: ArrayLike<{ language?: string; label?: string; id?: string; enabled?: boolean }>;
};

/** A live array-like (TextTrackList / AudioTrackList) → a real array. */
function toArray<T>(list: ArrayLike<T> | null | undefined): T[] {
  if (!list) return [];
  const n = typeof list.length === 'number' ? list.length : 0;
  const out: T[] = [];
  for (let i = 0; i < n; i++) {
    const item = list[i];
    if (item != null) out.push(item);
  }
  return out;
}

function isSubtitleTrack(t: TextTrack): boolean {
  return t.kind === 'subtitles' || t.kind === 'captions';
}

/** The stable key for a subtitle track (== `TextTrackInfo.language`). Enumeration
 *  and resolution MUST share this so a stored selection round-trips. */
function subtitleKey(t: TextTrack, i: number): string {
  return t.language || t.label || `track-${i}`;
}

/** Best-effort human language name (e.g. 'en' → "English"), guarded for envs
 *  without `Intl.DisplayNames`. */
function languageLabel(code: string | undefined): string {
  if (!code) return '';
  try {
    const DN = (Intl as { DisplayNames?: typeof Intl.DisplayNames }).DisplayNames;
    if (DN) return new DN(['en'], { type: 'language' }).of(code) ?? code;
  } catch {
    /* unsupported code / no ICU — fall through */
  }
  return code;
}

/** Subtitle/caption tracks on a `<video>` (empty under jsdom/SSR). */
export function listSubtitleTracks(video: HTMLVideoElement | null | undefined): TextTrackInfo[] {
  if (!video) return [];
  const subs = toArray<TextTrack>(video.textTracks as unknown as ArrayLike<TextTrack>).filter(isSubtitleTrack);
  return subs.map((t, i) => ({
    index: i,
    language: subtitleKey(t, i),
    label: t.label || languageLabel(t.language) || `Track ${i + 1}`,
    kind: t.kind,
  }));
}

/** Audio tracks on a `<video>` — only meaningful where the browser exposes
 *  `audioTracks` (Safari / flagged Chromium); empty elsewhere. */
export function listAudioTracks(video: HTMLVideoElement | null | undefined): TextTrackInfo[] {
  const list = (video as MediaElementLike)?.audioTracks;
  return toArray(list).map((t, i) => ({
    index: i,
    language: t.language || t.id || `audio-${i}`,
    label: t.label || languageLabel(t.language) || `Audio ${i + 1}`,
    kind: 'audio',
  }));
}

/** The native TextTrack for a stored language key, or null (off / no match). */
export function resolveTextTrack(
  video: HTMLVideoElement | null | undefined,
  language: string | null | undefined,
): TextTrack | null {
  if (!video || language == null) return null;
  const subs = toArray<TextTrack>(video.textTracks as unknown as ArrayLike<TextTrack>).filter(isSubtitleTrack);
  const found = subs.find((t, i) => subtitleKey(t, i) === language);
  return found ?? null;
}

/** True when `language` resolves to an available subtitle track (captions are on). */
export function hasActiveCaptions(
  video: HTMLVideoElement | null | undefined,
  language: string | null | undefined,
): boolean {
  return resolveTextTrack(video, language) != null;
}

/** Put the selected track in `mode='hidden'` (parsed, not painted) and disable
 *  the rest, so only our overlay renders. Safe if `mode` is read-only. */
export function applyTrackModes(
  video: HTMLVideoElement | null | undefined,
  activeLanguage: string | null | undefined,
): void {
  if (!video) return;
  const subs = toArray<TextTrack>(video.textTracks as unknown as ArrayLike<TextTrack>).filter(isSubtitleTrack);
  subs.forEach((t, i) => {
    try {
      t.mode = subtitleKey(t, i) === activeLanguage ? 'hidden' : 'disabled';
    } catch {
      /* mode may be read-only in some engines — ignore */
    }
  });
}

/** Enable the audio track at `index`, disabling the others (session-only). */
export function applyAudioTrack(video: HTMLVideoElement | null | undefined, index: number): void {
  const list = (video as MediaElementLike)?.audioTracks;
  toArray(list).forEach((t, i) => {
    try {
      t.enabled = i === index;
    } catch {
      /* ignore */
    }
  });
}

/** Index of the currently-enabled audio track, or -1. */
export function activeAudioIndex(video: HTMLVideoElement | null | undefined): number {
  const list = (video as MediaElementLike)?.audioTracks;
  return toArray(list).findIndex((t) => t.enabled);
}

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00a0',
  lrm: '\u200e',
  rlm: '\u200f',
};

function fromCodePoint(cp: number): string {
  try {
    return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : '';
  } catch {
    return '';
  }
}

/** Decode the small set of entities WebVTT allows (+ numeric refs). Output is
 *  rendered as TEXT, so even a decoded `<` is never parsed as markup. */
function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, body: string) => {
    if (body[0] === '#') {
      const hex = body[1]?.toLowerCase() === 'x';
      const cp = hex ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(cp) ? fromCodePoint(cp) || m : m;
    }
    const key = body.toLowerCase();
    return Object.prototype.hasOwnProperty.call(ENTITIES, key) ? ENTITIES[key] : m;
  });
}

/** A raw VTT cue payload → visible text lines (tags stripped, entities decoded). */
export function cleanCueText(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .replace(/<[^>]*>/g, '') // strip <c>/<i>/<b>/<00:00:01.000> etc.
    .split(/\r?\n/)
    .map((line) => decodeEntities(line).trim())
    .filter((line) => line.length > 0);
}

/** The active cue lines of a track (empty if none / unsupported). */
export function readActiveCueLines(track: TextTrack | null | undefined): string[] {
  if (!track) return [];
  const cues = toArray<TextTrackCue>(track.activeCues as unknown as ArrayLike<TextTrackCue>);
  const lines: string[] = [];
  for (const cue of cues) {
    lines.push(...cleanCueText((cue as VTTCue).text));
  }
  return lines;
}

// ---- styling ----------------------------------------------------------------

/** Multiplier applied to the overlay's responsive base font-size. */
export const CAPTION_SIZE_SCALE: Record<CaptionSize, number> = {
  sm: 0.75,
  md: 1,
  lg: 1.35,
  xl: 1.75,
};

/** Menu option lists (used by CaptionsMenu's `Select`s). */
export const CAPTION_SIZE_OPTIONS: readonly SelectOption[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra large' },
];
export const CAPTION_COLOR_OPTIONS: readonly SelectOption[] = [
  { value: '#ffffff', label: 'White' },
  { value: '#ffd400', label: 'Yellow' },
  { value: '#66e0ff', label: 'Cyan' },
  { value: '#7cff7c', label: 'Green' },
];
export const CAPTION_BACKGROUND_OPTIONS: readonly SelectOption[] = [
  { value: 'none', label: 'Off' },
  { value: 'semi', label: 'Semi-transparent' },
  { value: 'solid', label: 'Solid' },
];
export const CAPTION_EDGE_OPTIONS: readonly SelectOption[] = [
  { value: 'none', label: 'None' },
  { value: 'drop-shadow', label: 'Drop shadow' },
  { value: 'outline', label: 'Outline' },
  { value: 'raised', label: 'Raised' },
];

function backgroundCss(bg: CaptionBackground): string {
  switch (bg) {
    case 'semi':
      return 'rgba(0, 0, 0, 0.6)';
    case 'solid':
      return '#000000';
    default:
      return 'transparent';
  }
}

/** The CSS `text-shadow` for each edge treatment. */
export function edgeShadow(edge: CaptionEdge): string {
  switch (edge) {
    case 'drop-shadow':
      return '0 2px 6px rgba(0, 0, 0, 0.85)';
    case 'outline':
      return '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)';
    case 'raised':
      return '1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)';
    default:
      return 'none';
  }
}

/** Map a CaptionStyle to the CSS custom properties the overlay consumes. */
export function captionStyleVars(style: CaptionStyle): Record<string, string> {
  return {
    '--cap-scale': String(CAPTION_SIZE_SCALE[style.size] ?? 1),
    '--cap-color': style.textColor,
    '--cap-bg': backgroundCss(style.background),
    '--cap-pad': style.background === 'none' ? '0' : '0.12em 0.42em',
    '--cap-shadow': edgeShadow(style.edge),
  };
}
