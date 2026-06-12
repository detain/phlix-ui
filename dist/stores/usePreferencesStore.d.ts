export type ThemeName = 'nocturne' | 'daylight' | 'midnight';
export type Density = 'comfortable' | 'compact';
export type MotionPref = 'auto' | 'on' | 'off';
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
    reducedMotion: MotionPref;
    autoplay: boolean;
    defaultVolume: number;
    defaultQuality: string;
    defaultSubtitleLang: string | null;
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
    /** Saved Browse filter presets. */
    filterPresets: FilterPreset[];
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
    theme: import("vue").Ref<ThemeName, ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<Density, Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<MotionPref, MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
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
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], FilterPreset[] | {
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[]>;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "theme" | "accent" | "density" | "cardSize" | "gridDensity" | "reducedMotion" | "autoplay" | "defaultVolume" | "defaultQuality" | "defaultSubtitleLang" | "subtitlePreferenceSet" | "captionStyle" | "atmosphere" | "filterPresets" | "systemReduced">, Pick<{
    theme: import("vue").Ref<ThemeName, ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<Density, Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<MotionPref, MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
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
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], FilterPreset[] | {
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[]>;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "effectiveReducedMotion">, Pick<{
    theme: import("vue").Ref<ThemeName, ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<Density, Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<MotionPref, MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
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
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], FilterPreset[] | {
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[]>;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "reset" | "snapshot" | "saveFilterPreset" | "removeFilterPreset">>;
