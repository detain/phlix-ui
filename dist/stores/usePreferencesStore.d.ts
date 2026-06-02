export type ThemeName = 'nocturne' | 'daylight' | 'midnight';
export type Density = 'comfortable' | 'compact';
export type MotionPref = 'auto' | 'on' | 'off';
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
    atmosphere: boolean;
}
export declare const DEFAULT_PREFERENCES: Preferences;
/** Read persisted prefs synchronously (used both by the store and the early
 *  pre-mount theme bootstrap to avoid a flash). Safe on SSR / bad JSON. */
export declare function readStoredPreferences(): Preferences;
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
    atmosphere: import("vue").Ref<boolean, boolean>;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    reset: () => void;
}, "theme" | "accent" | "density" | "cardSize" | "gridDensity" | "reducedMotion" | "autoplay" | "defaultVolume" | "defaultQuality" | "defaultSubtitleLang" | "atmosphere" | "systemReduced">, Pick<{
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
    atmosphere: import("vue").Ref<boolean, boolean>;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
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
    atmosphere: import("vue").Ref<boolean, boolean>;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    reset: () => void;
}, "reset" | "snapshot">>;
