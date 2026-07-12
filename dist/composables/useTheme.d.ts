/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type Preferences, type ThemeName } from '../stores/usePreferencesStore';
/**
 * applyStoredThemeEarly (R1.1) — call ONCE before mount (in createPhlixApp) to set
 * <html> from persisted prefs synchronously, avoiding a theme flash on load.
 *
 * `defaultTheme` (R1.5) seeds the theme for first-time visitors with no stored
 * preference (an app's per-app default); a stored user choice always wins.
 * `defaultTv` follows the same first-time-visitor rule for TV mode.
 */
export declare function applyStoredThemeEarly(defaultTheme?: ThemeName, defaultTv?: boolean): void;
/**
 * useTheme (R1.1) — reactively reflect the preferences store onto <html>. Call
 * once near the app root (PhlixApp). Switching theme/accent/density/reduced-motion
 * updates the live DOM instantly.
 */
export declare function useTheme(): import("pinia").Store<"phlix-prefs", Pick<{
    theme: import("vue").Ref<ThemeName, ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<import("..").MotionPref, import("..").MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
    defaultAudioLang: import("vue").Ref<string | null, string | null>;
    subtitlePreferenceSet: import("vue").Ref<boolean, boolean>;
    captionStyle: import("vue").Ref<{
        size: import("..").CaptionSize;
        textColor: string;
        background: import("..").CaptionBackground;
        edge: import("..").CaptionEdge;
    }, import("..").CaptionStyle | {
        size: import("..").CaptionSize;
        textColor: string;
        background: import("..").CaptionBackground;
        edge: import("..").CaptionEdge;
    }>;
    atmosphere: import("vue").Ref<boolean, boolean>;
    tv: import("vue").Ref<boolean, boolean>;
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], import("..").FilterPreset[] | {
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
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => import("..").FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "tv" | "theme" | "accent" | "density" | "cardSize" | "gridDensity" | "reducedMotion" | "autoplay" | "defaultVolume" | "defaultQuality" | "defaultSubtitleLang" | "defaultAudioLang" | "subtitlePreferenceSet" | "captionStyle" | "atmosphere" | "filterPresets" | "showMarkerTimeline" | "crossfadeDuration" | "crossfadeFadeIn" | "crossfadeFadeOut" | "gaplessEnabled" | "preferredAudioQuality" | "systemReduced">, Pick<{
    theme: import("vue").Ref<ThemeName, ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<import("..").MotionPref, import("..").MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
    defaultAudioLang: import("vue").Ref<string | null, string | null>;
    subtitlePreferenceSet: import("vue").Ref<boolean, boolean>;
    captionStyle: import("vue").Ref<{
        size: import("..").CaptionSize;
        textColor: string;
        background: import("..").CaptionBackground;
        edge: import("..").CaptionEdge;
    }, import("..").CaptionStyle | {
        size: import("..").CaptionSize;
        textColor: string;
        background: import("..").CaptionBackground;
        edge: import("..").CaptionEdge;
    }>;
    atmosphere: import("vue").Ref<boolean, boolean>;
    tv: import("vue").Ref<boolean, boolean>;
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], import("..").FilterPreset[] | {
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
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => import("..").FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "effectiveReducedMotion">, Pick<{
    theme: import("vue").Ref<ThemeName, ThemeName>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    reducedMotion: import("vue").Ref<import("..").MotionPref, import("..").MotionPref>;
    autoplay: import("vue").Ref<boolean, boolean>;
    defaultVolume: import("vue").Ref<number, number>;
    defaultQuality: import("vue").Ref<string, string>;
    defaultSubtitleLang: import("vue").Ref<string | null, string | null>;
    defaultAudioLang: import("vue").Ref<string | null, string | null>;
    subtitlePreferenceSet: import("vue").Ref<boolean, boolean>;
    captionStyle: import("vue").Ref<{
        size: import("..").CaptionSize;
        textColor: string;
        background: import("..").CaptionBackground;
        edge: import("..").CaptionEdge;
    }, import("..").CaptionStyle | {
        size: import("..").CaptionSize;
        textColor: string;
        background: import("..").CaptionBackground;
        edge: import("..").CaptionEdge;
    }>;
    atmosphere: import("vue").Ref<boolean, boolean>;
    tv: import("vue").Ref<boolean, boolean>;
    filterPresets: import("vue").Ref<{
        id: string;
        name: string;
        query: Record<string, string | string[]>;
    }[], import("..").FilterPreset[] | {
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
    saveFilterPreset: (name: string, query: Record<string, string | string[]>) => import("..").FilterPreset;
    removeFilterPreset: (id: string) => void;
    reset: () => void;
}, "reset" | "snapshot" | "saveFilterPreset" | "removeFilterPreset">>;
