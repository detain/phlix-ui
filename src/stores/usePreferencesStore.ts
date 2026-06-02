import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

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
  defaultVolume: number; // 0–1
  defaultQuality: string; // 'auto' | '4k' | '1080p' | …
  defaultSubtitleLang: string | null;
  atmosphere: boolean;
}

export const DEFAULT_PREFERENCES: Preferences = {
  theme: 'nocturne',
  accent: null,
  density: 'comfortable',
  cardSize: 180,
  gridDensity: 'comfy',
  reducedMotion: 'auto',
  autoplay: true,
  defaultVolume: 1,
  defaultQuality: 'auto',
  defaultSubtitleLang: null,
  atmosphere: true,
};

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
  const atmosphere = ref<boolean>(initial.atmosphere);

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
      atmosphere: atmosphere.value,
    };
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
    atmosphere.value = d.atmosphere;
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
    atmosphere,
    systemReduced,
    effectiveReducedMotion,
    snapshot,
    reset,
  };
});
