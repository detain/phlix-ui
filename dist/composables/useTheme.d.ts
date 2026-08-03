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
 *
 * ## No FOUC for a plugin theme either (S86)
 *
 * `/api/v1/themes` is an AUTHENTICATED async fetch, so it can never inform the
 * first paint — waiting for it would be the flash, not the fix. Instead the
 * resolved token map of the active plugin theme is cached in `localStorage`
 * (`phlix.theme.active`) whenever it is applied, and read back here
 * synchronously, on the same tick as `data-theme`, before mount. So a returning
 * user's plugin theme paints on frame one exactly like a built-in.
 *
 * The cache is re-validated on read (`readCachedTheme`), not trusted: it is
 * attacker-writable storage that feeds `setProperty`.
 *
 * The one unavoidable exception, called out honestly: the FIRST load on a
 * device that has never applied that plugin theme (chosen on another device,
 * or freshly installed) has nothing to read, so it paints the built-in default
 * and swaps when the catalogue lands. There is no way to avoid that without a
 * synchronous, unauthenticated, blocking round-trip.
 */
export declare function applyStoredThemeEarly(defaultTheme?: ThemeName, defaultTv?: boolean): void;
/**
 * useTheme (R1.1) — reactively reflect the preferences store onto <html>. Call
 * once near the app root (PhlixApp). Switching theme/accent/density/reduced-motion
 * updates the live DOM instantly.
 *
 * S86 adds the server/plugin theme leg:
 *  - kicks off ONE authenticated fetch of the catalogue, but only once there is
 *    an `apiBase` AND a session — a signed-out or standalone mount makes no
 *    request at all;
 *  - re-applies whenever the chosen theme or the catalogue changes;
 *  - keeps the `localStorage` boot cache in step with what is on screen, so the
 *    next load repaints it with no flash.
 */
export declare function useTheme(): import("pinia").Store<"phlix-prefs", Pick<{
    theme: import("vue").Ref<string, string>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    viewMode: import("vue").Ref<import("..").ViewMode, import("..").ViewMode>;
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
}, "tv" | "theme" | "accent" | "density" | "cardSize" | "gridDensity" | "viewMode" | "reducedMotion" | "autoplay" | "defaultVolume" | "defaultQuality" | "defaultSubtitleLang" | "defaultAudioLang" | "subtitlePreferenceSet" | "captionStyle" | "atmosphere" | "filterPresets" | "showMarkerTimeline" | "crossfadeDuration" | "crossfadeFadeIn" | "crossfadeFadeOut" | "gaplessEnabled" | "preferredAudioQuality" | "systemReduced">, Pick<{
    theme: import("vue").Ref<string, string>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    viewMode: import("vue").Ref<import("..").ViewMode, import("..").ViewMode>;
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
    theme: import("vue").Ref<string, string>;
    accent: import("vue").Ref<string | null, string | null>;
    density: import("vue").Ref<import("..").Density, import("..").Density>;
    cardSize: import("vue").Ref<number, number>;
    gridDensity: import("vue").Ref<"cozy" | "comfy" | "dense", "cozy" | "comfy" | "dense">;
    viewMode: import("vue").Ref<import("..").ViewMode, import("..").ViewMode>;
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
