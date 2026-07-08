import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

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
export const DEFAULT_CAPTION_STYLE: CaptionStyle = {
  size: 'md',
  textColor: '#ffffff',
  background: 'none',
  edge: 'drop-shadow',
};

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
  defaultVolume: number; // 0–1
  // 'auto' or a RenditionId rung: 'auto' | '2160p' | '1440p' | '1080p' | '720p' | '480p' | '360p' | '240p' | 'original'.
  // Kept as `string` (not a union) — an unknown/stale value safely falls back to Auto (see
  // quality.ts's levelIndexForQuality), so this store's type doesn't need to widen per new rung.
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
  /** TV mode — a device/mode flag (orthogonal to theme + density). When true the
   *  app applies 10-foot sizing + a visible focus ring (`[data-tv]` on <html>).
   *  Composes with any theme; default false. */
  tv: boolean;
  /** Saved Browse filter presets. */
  filterPresets: FilterPreset[];
}

export const DEFAULT_PREFERENCES: Preferences = {
  theme: 'nocturne',
  accent: null,
  density: 'comfortable',
  cardSize: 200,
  gridDensity: 'comfy',
  reducedMotion: 'auto',
  autoplay: true,
  defaultVolume: 1,
  defaultQuality: 'auto',
  defaultSubtitleLang: null,
  subtitlePreferenceSet: false,
  captionStyle: { ...DEFAULT_CAPTION_STYLE },
  atmosphere: true,
  tv: false,
  filterPresets: [],
};

/** Stable id from a preset name (so re-saving the same name overwrites it). */
function presetId(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'preset'
  );
}

const STORAGE_KEY = 'phlix.prefs';

/** Read persisted prefs synchronously (used both by the store and the early
 *  pre-mount theme bootstrap to avoid a flash). Safe on SSR / bad JSON. */
export function readStoredPreferences(): Preferences {
  if (typeof localStorage === 'undefined') return { ...DEFAULT_PREFERENCES };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFERENCES };
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

/** True when the user has an explicit persisted preferences blob (so an app's
 *  `defaultTheme` should NOT override their choice). SSR-safe. */
export function hasStoredPreferences(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

function systemPrefersReduced(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * usePreferencesStore (R1.1) — user-facing appearance + playback prefs, persisted
 * to localStorage ('phlix.prefs'). The useTheme() composable reflects these onto
 * <html> live. `effectiveReducedMotion` resolves the 'auto' setting against the OS.
 */
export const usePreferencesStore = defineStore('phlix-prefs', () => {
  const initial = readStoredPreferences();

  const theme = ref<ThemeName>(initial.theme);
  const accent = ref<string | null>(initial.accent);
  const density = ref<Density>(initial.density);
  const cardSize = ref<number>(initial.cardSize);
  const gridDensity = ref<Preferences['gridDensity']>(initial.gridDensity);
  const reducedMotion = ref<MotionPref>(initial.reducedMotion);
  const autoplay = ref<boolean>(initial.autoplay);
  const defaultVolume = ref<number>(initial.defaultVolume);
  const defaultQuality = ref<string>(initial.defaultQuality);
  const defaultSubtitleLang = ref<string | null>(initial.defaultSubtitleLang);
  const subtitlePreferenceSet = ref<boolean>(initial.subtitlePreferenceSet);
  // Merge over the defaults (readStoredPreferences shallow-spreads, so a stored
  // partial style would otherwise drop keys) AND copy so the shared
  // DEFAULT_CAPTION_STYLE object is never mutated through the ref.
  const captionStyle = ref<CaptionStyle>({ ...DEFAULT_CAPTION_STYLE, ...initial.captionStyle });
  const atmosphere = ref<boolean>(initial.atmosphere);
  const tv = ref<boolean>(initial.tv);
  // Copy so the shared DEFAULT_PREFERENCES.filterPresets array is never mutated.
  const filterPresets = ref<FilterPreset[]>(initial.filterPresets ? [...initial.filterPresets] : []);

  const systemReduced = ref(systemPrefersReduced());
  let mq: MediaQueryList | null = null;
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener?.('change', (e) => (systemReduced.value = e.matches));
  }

  const effectiveReducedMotion = computed(() =>
    reducedMotion.value === 'on' ? true : reducedMotion.value === 'off' ? false : systemReduced.value,
  );

  function snapshot(): Preferences {
    return {
      theme: theme.value,
      accent: accent.value,
      density: density.value,
      cardSize: cardSize.value,
      gridDensity: gridDensity.value,
      reducedMotion: reducedMotion.value,
      autoplay: autoplay.value,
      defaultVolume: defaultVolume.value,
      defaultQuality: defaultQuality.value,
      defaultSubtitleLang: defaultSubtitleLang.value,
      subtitlePreferenceSet: subtitlePreferenceSet.value,
      captionStyle: captionStyle.value,
      atmosphere: atmosphere.value,
      tv: tv.value,
      filterPresets: filterPresets.value,
    };
  }

  /** Save the current filters as a named preset (re-saving a name overwrites it). */
  function saveFilterPreset(name: string, query: Record<string, string | string[]>): FilterPreset {
    const preset: FilterPreset = { id: presetId(name), name: name.trim(), query };
    const i = filterPresets.value.findIndex((p) => p.id === preset.id);
    if (i >= 0) filterPresets.value.splice(i, 1, preset);
    else filterPresets.value.push(preset);
    return preset;
  }
  function removeFilterPreset(id: string): void {
    filterPresets.value = filterPresets.value.filter((p) => p.id !== id);
  }

  // persist on any change
  watch(
    snapshot,
    (val) => {
      if (typeof localStorage === 'undefined') return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
      } catch {
        /* quota / private mode — ignore */
      }
    },
    { deep: true },
  );

  function reset() {
    const d = DEFAULT_PREFERENCES;
    theme.value = d.theme;
    accent.value = d.accent;
    density.value = d.density;
    cardSize.value = d.cardSize;
    gridDensity.value = d.gridDensity;
    reducedMotion.value = d.reducedMotion;
    autoplay.value = d.autoplay;
    defaultVolume.value = d.defaultVolume;
    defaultQuality.value = d.defaultQuality;
    defaultSubtitleLang.value = d.defaultSubtitleLang;
    subtitlePreferenceSet.value = d.subtitlePreferenceSet;
    captionStyle.value = { ...DEFAULT_CAPTION_STYLE };
    atmosphere.value = d.atmosphere;
    tv.value = d.tv;
    filterPresets.value = [...d.filterPresets];
  }

  return {
    theme,
    accent,
    density,
    cardSize,
    gridDensity,
    reducedMotion,
    autoplay,
    defaultVolume,
    defaultQuality,
    defaultSubtitleLang,
    subtitlePreferenceSet,
    captionStyle,
    atmosphere,
    tv,
    filterPresets,
    systemReduced,
    effectiveReducedMotion,
    snapshot,
    saveFilterPreset,
    removeFilterPreset,
    reset,
  };
});
