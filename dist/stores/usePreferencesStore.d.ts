/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * The id of the active theme.
 *
 * **Deliberately `string`, not a closed union** (S86). It used to be
 * `'nocturne' | 'daylight' | 'midnight'`, which made the three themes the SPA
 * ships the only themes that could ever exist: a theme registered by a server
 * plugin (`GET /api/v1/themes`) has an id nobody can enumerate at SPA build
 * time, and assigning it here was a compile error. Widening is what lets a
 * plugin theme be *selected* at all.
 *
 * The three shipped ids are still first-class — see `BUILT_IN_THEME_IDS` in
 * `composables/themeTokens`, which is the runtime membership test (`data-theme`
 * alone renders those; anything else additionally needs a token map applied).
 * The safety that the union used to provide has NOT been dropped, it has moved
 * to where it can actually cover server data: an unknown id is validated
 * against the same slug pattern the server uses, and its tokens against the
 * same allowlist + value grammar, before either reaches the DOM.
 *
 * Same tolerance as `viewMode`/`defaultQuality` on hydration: a persisted id
 * for a theme that has since been uninstalled hydrates verbatim and degrades to
 * the built-in default at apply time (`resolveThemeBase`), rather than being
 * silently rewritten.
 */
export type ThemeName = string;
export type Density = 'comfortable' | 'compact';
export type MotionPref = 'auto' | 'on' | 'off';
/** How a library/section renders its items (S67). ALL FOUR now have real
 *  renderers, wired through `MediaGrid`'s `#card` slot: 'grid' (poster grid),
 *  'list' (S68 `MediaListRow`), 'backdrop' (S69 `MediaBackdropRow`) and 'table'
 *  (S70 `MediaTableRow`). This union is deliberately NOT sanitized on read, so a
 *  stale/out-of-union persisted value still hydrates verbatim — `LibraryPage`'s
 *  unconditional `v-else` renders it as the poster grid rather than dropping it. */
export type ViewMode = 'grid' | 'list' | 'backdrop' | 'table';
/** A saved Browse filter set — `query` is the `useMediaStore.toQuery()` shape. */
export interface FilterPreset {
    id: string;
    name: string;
    query: Record<string, string | string[]>;
}
/** Relative caption text size. */
export type CaptionSize = 'sm' | 'md' | 'lg' | 'xl';
/** Caption background box treatment. */
export type CaptionBackground = 'none' | 'semi' | 'solid';
/** Caption text-edge legibility treatment. */
export type CaptionEdge = 'none' | 'drop-shadow' | 'outline' | 'raised';
/** Persisted caption/subtitle appearance (R3.5). The active track itself lives in
 *  `defaultSubtitleLang` (default) / `usePlayerStore.subtitleLang` (session). */
export interface CaptionStyle {
    size: CaptionSize;
    /** Text fill — a hex color. */
    textColor: string;
    background: CaptionBackground;
    edge: CaptionEdge;
}
/** Cinematic default: white text, no box, soft drop-shadow (legible + clean). */
export declare const DEFAULT_CAPTION_STYLE: CaptionStyle;
export interface Preferences {
    theme: ThemeName;
    /** null = use the theme's default amber accent; otherwise a hex override. */
    accent: string | null;
    density: Density;
    /** poster card size in px (grid min column width). */
    cardSize: number;
    /** grid density hint — cozy = larger cards, dense = more columns. */
    gridDensity: 'cozy' | 'comfy' | 'dense';
    /** Which renderer a library/section uses (S67); 'grid' is the poster grid.
     *  NOT sanitized on hydration (same tolerance as `density`/`defaultQuality`
     *  below): a persisted blob carrying `null` or a removed/renamed mode
     *  hydrates verbatim, which leaves the FilterBar toggle with no pressed
     *  button until the user clicks one (that click self-heals and re-persists).
     *  Accepted deliberately, so every renderer host MUST keep an unconditional
     *  (`v-else`) grid branch — that fallback is load-bearing for S68-S70, not
     *  decoration: it is the only thing that renders items for an out-of-union
     *  value. Add a sanitizer here if that ever stops being true. */
    viewMode: ViewMode;
    reducedMotion: MotionPref;
    autoplay: boolean;
    defaultVolume: number;
    defaultQuality: string;
    defaultSubtitleLang: string | null;
    /** Preferred audio language (BCP-47, e.g. 'en', 'es-ES'); null = no preference. */
    defaultAudioLang: string | null;
    /** True once the user has explicitly chosen a caption state (a language, or
     *  "Off") via the CaptionsMenu or the Settings default-subtitle dropdown.
     *  Distinguishes an explicit "Off" (`defaultSubtitleLang === null` + this
     *  `true`) from the initial no-preference state (`null` + this `false`), so the
     *  player only adopts a server `default:true` track when the user has NOT
     *  chosen. Persisted (so an explicit Off carries across episodes/sessions). */
    subtitlePreferenceSet: boolean;
    /** Persisted caption appearance (R3.5). */
    captionStyle: CaptionStyle;
    atmosphere: boolean;
    /** TV mode — a device/mode flag (orthogonal to theme + density). When true the
     *  app applies 10-foot sizing + a visible focus ring (`[data-tv]` on <html>).
     *  Composes with any theme; default false. */
    tv: boolean;
    /** Saved Browse filter presets. */
    filterPresets: FilterPreset[];
    /** Whether to show the marker timeline bar (chapter/ad markers) in the player. */
    showMarkerTimeline: boolean;
    /** Crossfade duration in seconds (0 = disabled). */
    crossfadeDuration: number;
    /** Crossfade fade-in fraction (0–1). */
    crossfadeFadeIn: number;
    /** Crossfade fade-out fraction (0–1). */
    crossfadeFadeOut: number;
    /** Enable gapless playback. */
    gaplessEnabled: boolean;
    /** Preferred audio quality tier. */
    preferredAudioQuality: 'low' | 'medium' | 'high' | 'lossless';
}
export declare const DEFAULT_PREFERENCES: Preferences;
/** Read persisted prefs synchronously (used both by the store and the early
 *  pre-mount theme bootstrap to avoid a flash). Safe on SSR / bad JSON. */
export declare function readStoredPreferences(): Preferences;
/** True when the user has an explicit persisted preferences blob (so an app's
 *  `defaultTheme` should NOT override their choice). SSR-safe. */
export declare function hasStoredPreferences(): boolean;
/**
 * usePreferencesStore (R1.1) — user-facing appearance + playback prefs, persisted
 * to localStorage ('phlix.prefs'). The useTheme() composable reflects these onto
 * <html> live. `effectiveReducedMotion` resolves the 'auto' setting against the OS.
 */
export declare const usePreferencesStore: import("pinia").StoreDefinition<"phlix-prefs", Pick<{
    theme: import("vue").Ref<string, string>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<Density, Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    viewMode: import("vue").Ref<ViewMode, ViewMode>;
    reducedMotion: import("vue").Ref<MotionPref, MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
    defaultAudioLang: import("vue").Ref<string | null, string | null>;
    subtitlePreferenceSet: import("vue").Ref<boolean, boolean>;
    captionStyle: import("vue").Ref<{
        size: CaptionSize;
        textColor: string;
        background: CaptionBackground;
        edge: CaptionEdge;
    }, CaptionStyle | {
        size: CaptionSize;
        textColor: string;
        background: CaptionBackground;
        edge: CaptionEdge;
    }>;
    atmosphere: import("vue").Ref<boolean, boolean>;
    tv: import("vue").Ref<boolean, boolean>;
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], FilterPreset[] | {
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[]>;
    showMarkerTimeline: import("vue").Ref<boolean, boolean>;
    crossfadeDuration: import("vue").Ref<number, number>;
    crossfadeFadeIn: import("vue").Ref<number, number>;
    crossfadeFadeOut: import("vue").Ref<number, number>;
    gaplessEnabled: import("vue").Ref<boolean, boolean>;
    preferredAudioQuality: import("vue").Ref<"medium" | "low" | "high" | "lossless", "medium" | "low" | "high" | "lossless">;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "tv" | "theme" | "accent" | "density" | "cardSize" | "gridDensity" | "viewMode" | "reducedMotion" | "autoplay" | "defaultVolume" | "defaultQuality" | "defaultSubtitleLang" | "defaultAudioLang" | "subtitlePreferenceSet" | "captionStyle" | "atmosphere" | "filterPresets" | "showMarkerTimeline" | "crossfadeDuration" | "crossfadeFadeIn" | "crossfadeFadeOut" | "gaplessEnabled" | "preferredAudioQuality" | "systemReduced">, Pick<{
    theme: import("vue").Ref<string, string>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<Density, Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    viewMode: import("vue").Ref<ViewMode, ViewMode>;
    reducedMotion: import("vue").Ref<MotionPref, MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
    defaultAudioLang: import("vue").Ref<string | null, string | null>;
    subtitlePreferenceSet: import("vue").Ref<boolean, boolean>;
    captionStyle: import("vue").Ref<{
        size: CaptionSize;
        textColor: string;
        background: CaptionBackground;
        edge: CaptionEdge;
    }, CaptionStyle | {
        size: CaptionSize;
        textColor: string;
        background: CaptionBackground;
        edge: CaptionEdge;
    }>;
    atmosphere: import("vue").Ref<boolean, boolean>;
    tv: import("vue").Ref<boolean, boolean>;
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], FilterPreset[] | {
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[]>;
    showMarkerTimeline: import("vue").Ref<boolean, boolean>;
    crossfadeDuration: import("vue").Ref<number, number>;
    crossfadeFadeIn: import("vue").Ref<number, number>;
    crossfadeFadeOut: import("vue").Ref<number, number>;
    gaplessEnabled: import("vue").Ref<boolean, boolean>;
    preferredAudioQuality: import("vue").Ref<"medium" | "low" | "high" | "lossless", "medium" | "low" | "high" | "lossless">;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "effectiveReducedMotion">, Pick<{
    theme: import("vue").Ref<string, string>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<Density, Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    viewMode: import("vue").Ref<ViewMode, ViewMode>;
    reducedMotion: import("vue").Ref<MotionPref, MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
    defaultAudioLang: import("vue").Ref<string | null, string | null>;
    subtitlePreferenceSet: import("vue").Ref<boolean, boolean>;
    captionStyle: import("vue").Ref<{
        size: CaptionSize;
        textColor: string;
        background: CaptionBackground;
        edge: CaptionEdge;
    }, CaptionStyle | {
        size: CaptionSize;
        textColor: string;
        background: CaptionBackground;
        edge: CaptionEdge;
    }>;
    atmosphere: import("vue").Ref<boolean, boolean>;
    tv: import("vue").Ref<boolean, boolean>;
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], FilterPreset[] | {
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[]>;
    showMarkerTimeline: import("vue").Ref<boolean, boolean>;
    crossfadeDuration: import("vue").Ref<number, number>;
    crossfadeFadeIn: import("vue").Ref<number, number>;
    crossfadeFadeOut: import("vue").Ref<number, number>;
    gaplessEnabled: import("vue").Ref<boolean, boolean>;
    preferredAudioQuality: import("vue").Ref<"medium" | "low" | "high" | "lossless", "medium" | "low" | "high" | "lossless">;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "reset" | "snapshot" | "saveFilterPreset" | "removeFilterPreset">>;
