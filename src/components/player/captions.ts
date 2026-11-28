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
import { DEFAULT_MESSAGES, type MessageKey, type Translate } from '../../i18n/messages';
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
  /**
   * The stable per-track key (the track's uid). For entries produced by
   * {@link listSubtitleTracks} / {@link listAudioTracks} this equals `uid`:
   * the track's identity, NOT necessarily its raw language — same-language
   * duplicates get an occurrence suffix (finding phlix-ui-player-017) so each
   * stays separately selectable. Hand-built / legacy entries may carry a plain
   * language code here; {@link trackUid} resolves either shape.
   */
  language: string;
  /** Human label (track label → language display name → "Track N"). */
  label: string;
  /**
   * How `label` was derived (finding phlix-ui-player-018). Render-time
   * consumers re-localize 'language'/'generated' labels via
   * {@link trackDisplayLabel}; 'title' labels are author-provided and pass
   * through verbatim.
   */
  labelKind?: CaptionLabelSource;
  kind: string;
  /**
   * Stable unique identity for THIS track within its enumeration (finding
   * phlix-ui-player-017): the raw language/id/label base, with `#2`, `#3` …
   * suffixed on duplicate occurrences so two 'eng' subtitle tracks get
   * distinct, idempotent keys. Absent on legacy hand-built entries, where
   * `language` stands in via {@link trackUid}.
   */
  uid?: string;
  /** Raw BCP-47 code reported by the engine ('' when the track has none) —
   *  the label input, kept separate from the uid so a disambiguated duplicate
   *  ('eng#2') can still render its language name or a numbered fallback. */
  trackLanguage?: string;
}

/** A non-standard `audioTracks` entry (Safari / flagged Chromium). */
type AudioTrackLike = { language?: string; label?: string; id?: string; enabled?: boolean };

/** Loosely-typed media element (audioTracks isn't in the standard DOM lib). */
type MediaElementLike = (HTMLVideoElement | null | undefined) & {
  audioTracks?: ArrayLike<AudioTrackLike>;
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

/** The stable uid for a track entry: its dedicated `uid` when enumerated,
 *  otherwise the `language` key (legacy / hand-built entries). Consumers that
 *  compare a stored selection against track rows MUST use this, never raw
 *  language equality (finding phlix-ui-player-017). */
export function trackUid(t: TextTrackInfo): string {
  return t.uid ?? t.language;
}

/** Count-occurrence dedup: the base key of entry `i` gets `#N` when the same
 *  base has appeared N≥2 times in the list up to and including `i`. The first
 *  occurrence keeps the BARE base, so keys persisted under the old
 *  language-equality scheme still resolve (phlix-ui-player-017). Pure re-walk
 *  over the list → deterministic and idempotent: re-listing the same tracks
 *  (TextTrackList/AudioTrackList order is stable) yields the same uids. */
function dedupAt<T>(list: ArrayLike<T>, i: number, baseOf: (t: T, k: number) => string): string {
  const base = baseOf(list[i], i);
  let occurrence = 0;
  for (let j = 0; j <= i; j++) {
    if (baseOf(list[j], j) === base) occurrence += 1;
  }
  if (occurrence > 1) return `${base}#${occurrence}`;
  return base;
}

/** Subtitle-track identity: language → id → label → `track-N` base, deduped by
 *  occurrence. Enumeration AND resolution MUST share this so a stored uid
 *  round-trips (finding phlix-ui-player-017). */
function subtitleUidAt(subs: TextTrack[], i: number): string {
  return dedupAt(subs, i, (t, k) => t.language || t.id || t.label || `track-${k}`);
}

/** Audio-track identity: language → id → `audio-N` base, deduped by occurrence. */
function audioUidAt(tracks: ArrayLike<AudioTrackLike>, i: number): string {
  return dedupAt(tracks, i, (t, k) => t.language || t.id || `audio-${k}`);
}

/**
 * Provenance of a track's display label (finding phlix-ui-player-018):
 * 'title' = author-provided (never translated), 'language' = derived from a
 * language code, 'generated' = numbered fallback resolved via the catalog.
 */
export type CaptionLabelSource = 'title' | 'language' | 'generated';

/** Best-effort human language name (e.g. 'en' → "English", or "Englisch" when
 *  the active message locale is German), guarded for envs without
 *  `Intl.DisplayNames` (finding phlix-ui-player-018: names must follow the UI
 *  locale, not hardcoded English). */
export function languageLabel(code: string | undefined, locale?: string | null): string {
  if (!code) return '';
  const DN = (Intl as { DisplayNames?: typeof Intl.DisplayNames }).DisplayNames;
  if (!DN) return code;
  const names = locale ? [locale.replace(/_/g, '-'), 'en'] : ['en'];
  try {
    return new DN(names, { type: 'language' }).of(code) ?? code;
  } catch {
    /* invalid locale tag / unsupported code — retry English, then raw code */
  }
  try {
    return new DN(['en'], { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** Subtitle/caption tracks on a `<video>` (empty under jsdom/SSR). */
export function listSubtitleTracks(video: HTMLVideoElement | null | undefined): TextTrackInfo[] {
  if (!video) return [];
  const subs = toArray<TextTrack>(video.textTracks as unknown as ArrayLike<TextTrack>).filter(isSubtitleTrack);
  return subs.map((t, i) => {
    const uid = subtitleUidAt(subs, i);
    return {
      index: i,
      language: uid,
      uid,
      trackLanguage: t.language || '',
      label: t.label || languageLabel(t.language) || `Track ${i + 1}`,
      kind: t.kind,
      labelKind: t.label ? 'title' : t.language ? 'language' : 'generated',
    };
  });
}

/** Audio tracks on a `<video>` — only meaningful where the browser exposes
 *  `audioTracks` (Safari / flagged Chromium); empty elsewhere. */
export function listAudioTracks(video: HTMLVideoElement | null | undefined): TextTrackInfo[] {
  const list = (video as MediaElementLike)?.audioTracks;
  if (!list) return [];
  const tracks = toArray<AudioTrackLike>(list);
  return tracks.map((t, i) => {
    const uid = audioUidAt(tracks, i);
    return {
      index: i,
      language: uid,
      uid,
      trackLanguage: t.language || '',
      label: t.label || languageLabel(t.language) || `Audio ${i + 1}`,
      kind: 'audio',
      labelKind: t.label ? 'title' : t.language ? 'language' : 'generated',
    };
  });
}

/** The native TextTrack for a stored uid, or null (off / no match). */
export function resolveTextTrack(
  video: HTMLVideoElement | null | undefined,
  language: string | null | undefined,
): TextTrack | null {
  if (!video || language == null) return null;
  const subs = toArray<TextTrack>(video.textTracks as unknown as ArrayLike<TextTrack>).filter(isSubtitleTrack);
  const found = subs.find((_, i) => subtitleUidAt(subs, i) === language);
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
 *  the rest, so only our overlay renders. Matching is by uid (finding
 *  phlix-ui-player-017), never by raw language equality. Safe if `mode` is
 *  read-only. */
export function applyTrackModes(
  video: HTMLVideoElement | null | undefined,
  activeLanguage: string | null | undefined,
): void {
  if (!video) return;
  const subs = toArray<TextTrack>(video.textTracks as unknown as ArrayLike<TextTrack>).filter(isSubtitleTrack);
  subs.forEach((t, i) => {
    try {
      t.mode = subtitleUidAt(subs, i) === activeLanguage ? 'hidden' : 'disabled';
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

// ---- render timing offset (S-ui-once-16 / phlix-ui-once-020) ------------------

/**
 * The media position whose cues should PAINT now under a delay. A positive
 * delay means "show captions later than the audio": at media time t the
 * overlay paints the cues of `t - delay`, i.e. it reads BACK into the past;
 * a leading (negative) delay reads ahead. A non-finite delay is refused to 0
 * (the raw media-time read) — the same refusal discipline the store parsers
 * apply, so a corrupt value can never fling the render window off-scale.
 */
export function captionRenderTime(mediaTime: number, delaySeconds: number): number {
  const delay = Number.isFinite(delaySeconds) ? delaySeconds : 0;
  return mediaTime - delay;
}

/**
 * Offset-aware twin of readActiveCueLines(): the cue lines whose `[start, end)`
 * window covers `positionSeconds`, read from the track's FULL cue list rather
 * than the engine's `activeCues` — the engine windows cues at the raw media
 * time and knows nothing about our delay. Bounds are start-inclusive /
 * end-exclusive (the engine's own semantics); cues with non-numeric bounds are
 * skipped. A caller falls back to readActiveCueLines when `track.cues` is
 * unavailable (sidecar still loading, an exotic engine, jsdom): the delay then
 * stays INERT for that read rather than blanking a cue the engine can paint.
 */
export function readCueLinesAt(track: TextTrack | null | undefined, positionSeconds: number): string[] {
  if (!track || !Number.isFinite(positionSeconds)) return [];
  const cues = toArray<TextTrackCue>(track.cues as unknown as ArrayLike<TextTrackCue>);
  const lines: string[] = [];
  for (const cue of cues) {
    const { start, end } = cue as { start?: number; end?: number };
    if (typeof start !== 'number' || typeof end !== 'number') continue;
    if (start <= positionSeconds && positionSeconds < end) {
      lines.push(...cleanCueText((cue as VTTCue).text));
    }
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

/**
 * Option entry for the caption-style menus (finding phlix-ui-player-018).
 * `label` carries the English catalog default so out-of-catalog consumers
 * (e.g. AppearanceSettings, the public `player.ts` re-exports) keep rendering
 * a sane value, while `key` names the message-catalog entry menus resolve
 * through at RENDER time via {@link localizeCaptionOptions}.
 */
export interface CaptionOption extends SelectOption {
  /** Message-catalog key the option label resolves through at render time. */
  readonly key: MessageKey;
}

/** Build one option straight from the English catalog — zero raw literals. */
function captionOption(value: string, name: keyof typeof DEFAULT_MESSAGES.player): CaptionOption {
  return { value, label: DEFAULT_MESSAGES.player[name] as string, key: `player.${name}` as MessageKey };
}

/** Menu option lists (used by CaptionsMenu's `Select`s). */
export const CAPTION_SIZE_OPTIONS: readonly CaptionOption[] = [
  captionOption('sm', 'captionSizeSmall'),
  captionOption('md', 'captionSizeMedium'),
  captionOption('lg', 'captionSizeLarge'),
  captionOption('xl', 'captionSizeExtraLarge'),
];
export const CAPTION_COLOR_OPTIONS: readonly CaptionOption[] = [
  captionOption('#ffffff', 'captionColorWhite'),
  captionOption('#ffd400', 'captionColorYellow'),
  captionOption('#66e0ff', 'captionColorCyan'),
  captionOption('#7cff7c', 'captionColorGreen'),
];
export const CAPTION_BACKGROUND_OPTIONS: readonly CaptionOption[] = [
  // REUSES the existing player.off entry ('Off') — no re-mint (mint law).
  { value: 'none', label: DEFAULT_MESSAGES.player.off, key: 'player.off' },
  captionOption('semi', 'captionBackgroundSemi'),
  captionOption('solid', 'captionBackgroundSolid'),
];
export const CAPTION_EDGE_OPTIONS: readonly CaptionOption[] = [
  captionOption('none', 'captionEdgeNone'),
  captionOption('drop-shadow', 'captionEdgeDropShadow'),
  captionOption('outline', 'captionEdgeOutline'),
  captionOption('raised', 'captionEdgeRaised'),
];

/**
 * Resolve catalog-keyed option labels through the active translator so menus
 * localize on locale switch instead of at module load (finding
 * phlix-ui-player-018). Returns plain SelectOption rows.
 */
export function localizeCaptionOptions(
  options: readonly CaptionOption[],
  translate: Translate,
): SelectOption[] {
  return options.map((option) => ({ value: option.value, label: translate(option.key) }));
}

/**
 * Display label for a track entry, localized at render time (finding
 * phlix-ui-player-018): 'generated' → numbered catalog fallback with a
 * {number} placeholder, 'language' → language name resolved in the active
 * message locale, otherwise the stored label verbatim ('title' / unmarked).
 */
export function trackDisplayLabel(
  track: TextTrackInfo,
  translate: Translate,
  locale?: string | null,
): string {
  if (track.labelKind === 'generated') {
    return translate(track.kind === 'audio' ? 'player.audioTrackNumbered' : 'player.trackNumbered', {
      number: track.index + 1,
    });
  }
  if (track.labelKind === 'language') {
    const raw = track.trackLanguage ?? track.language;
    if (track.language !== raw) {
      // Disambiguated same-language duplicate (finding phlix-ui-player-017):
      // naming both rows identically would hide which is which, so fall back
      // to the numbered catalog label (position carries the distinction).
      return translate(track.kind === 'audio' ? 'player.audioTrackNumbered' : 'player.trackNumbered', {
        number: track.index + 1,
      });
    }
    return languageLabel(raw, locale) || track.label;
  }
  return track.label;
}

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
