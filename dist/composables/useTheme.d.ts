import { type Preferences } from '../stores/usePreferencesStore';
/**
 * applyStoredThemeEarly (R1.1) — call ONCE before mount (in createPhlixApp) to set
 * <html> from persisted prefs synchronously, avoiding a theme flash on load.
 */
export declare function applyStoredThemeEarly(): void;
/**
 * useTheme (R1.1) — reactively reflect the preferences store onto <html>. Call
 * once near the app root (PhlixApp). Switching theme/accent/density/reduced-motion
 * updates the live DOM instantly.
 */
export declare function useTheme(): import("pinia").Store<"phlix-prefs", Pick<{
    theme: import("vue").Ref<import("..").ThemeName, import("..").ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<import("..").MotionPref, import("..").MotionPref>;
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
    theme: import("vue").Ref<import("..").ThemeName, import("..").ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<import("..").MotionPref, import("..").MotionPref>;
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
    theme: import("vue").Ref<import("..").ThemeName, import("..").ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<import("..").MotionPref, import("..").MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
    atmosphere: import("vue").Ref<boolean, boolean>;
    systemReduced: import("vue").Ref<boolean, boolean>;
    effectiveReducedMotion: import("vue").ComputedRef<boolean>;
    snapshot: () => Preferences;
    reset: () => void;
}, "snapshot" | "reset">>;
