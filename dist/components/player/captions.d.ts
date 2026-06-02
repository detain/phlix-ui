/**
 * captions.ts (R3.5) — pure, DOM-light helpers behind the player's caption UX.
 *
 * The Player renders cues itself (a custom overlay, not native `::cue`) for full
 * styling control: the selected text track is put in `mode='hidden'` so the UA
 * parses cues and fires `cuechange` WITHOUT painting them, and we draw the active
 * cue lines into our own layer. Everything here is feature-detected + array-like
 * guarded so it degrades to no-ops under jsdom/SSR (which expose empty track
 * lists). Cue text is stripped of markup and rendered as TEXT (never v-html).
 */
import type { SelectOption } from '../ui/listbox';
import type { CaptionStyle, CaptionSize, CaptionEdge } from '../../stores/usePreferencesStore';
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
/** Subtitle/caption tracks on a `<video>` (empty under jsdom/SSR). */
export declare function listSubtitleTracks(video: HTMLVideoElement | null | undefined): TextTrackInfo[];
/** Audio tracks on a `<video>` — only meaningful where the browser exposes
 *  `audioTracks` (Safari / flagged Chromium); empty elsewhere. */
export declare function listAudioTracks(video: HTMLVideoElement | null | undefined): TextTrackInfo[];
/** The native TextTrack for a stored language key, or null (off / no match). */
export declare function resolveTextTrack(video: HTMLVideoElement | null | undefined, language: string | null | undefined): TextTrack | null;
/** True when `language` resolves to an available subtitle track (captions are on). */
export declare function hasActiveCaptions(video: HTMLVideoElement | null | undefined, language: string | null | undefined): boolean;
/** Put the selected track in `mode='hidden'` (parsed, not painted) and disable
 *  the rest, so only our overlay renders. Safe if `mode` is read-only. */
export declare function applyTrackModes(video: HTMLVideoElement | null | undefined, activeLanguage: string | null | undefined): void;
/** Enable the audio track at `index`, disabling the others (session-only). */
export declare function applyAudioTrack(video: HTMLVideoElement | null | undefined, index: number): void;
/** Index of the currently-enabled audio track, or -1. */
export declare function activeAudioIndex(video: HTMLVideoElement | null | undefined): number;
/** A raw VTT cue payload → visible text lines (tags stripped, entities decoded). */
export declare function cleanCueText(raw: string | null | undefined): string[];
/** The active cue lines of a track (empty if none / unsupported). */
export declare function readActiveCueLines(track: TextTrack | null | undefined): string[];
/** Multiplier applied to the overlay's responsive base font-size. */
export declare const CAPTION_SIZE_SCALE: Record<CaptionSize, number>;
/** Menu option lists (used by CaptionsMenu's `Select`s). */
export declare const CAPTION_SIZE_OPTIONS: readonly SelectOption[];
export declare const CAPTION_COLOR_OPTIONS: readonly SelectOption[];
export declare const CAPTION_BACKGROUND_OPTIONS: readonly SelectOption[];
export declare const CAPTION_EDGE_OPTIONS: readonly SelectOption[];
/** The CSS `text-shadow` for each edge treatment. */
export declare function edgeShadow(edge: CaptionEdge): string;
/** Map a CaptionStyle to the CSS custom properties the overlay consumes. */
export declare function captionStyleVars(style: CaptionStyle): Record<string, string>;
