/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref, computed, onScopeDispose, watch } from 'vue';

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
  defaultVolume: number; // 0–1
  // 'auto' or a RenditionId rung: 'auto' | '2160p' | '1440p' | '1080p' | '720p' | '480p' | '360p' | '240p' | 'original'.
  // Kept as `string` (not a union) — an unknown/stale value safely falls back to Auto (see
  // quality.ts's levelIndexForQuality), so this store's type doesn't need to widen per new rung.
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

export const DEFAULT_PREFERENCES: Preferences = {
  theme: 'nocturne',
  accent: null,
  density: 'comfortable',
  cardSize: 200,
  gridDensity: 'comfy',
  viewMode: 'grid',
  reducedMotion: 'auto',
  autoplay: true,
  defaultVolume: 1,
  defaultQuality: 'auto',
  defaultSubtitleLang: null,
  defaultAudioLang: null,
  subtitlePreferenceSet: false,
  captionStyle: { ...DEFAULT_CAPTION_STYLE },
  atmosphere: true,
  tv: false,
  filterPresets: [],
  showMarkerTimeline: true,
  crossfadeDuration: 0,
  crossfadeFadeIn: 0.5,
  crossfadeFadeOut: 0.5,
  gaplessEnabled: true,
  preferredAudioQuality: 'high',
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
  const viewMode = ref<ViewMode>(initial.viewMode);
  const reducedMotion = ref<MotionPref>(initial.reducedMotion);
  const autoplay = ref<boolean>(initial.autoplay);
  const defaultVolume = ref<number>(initial.defaultVolume);
  const defaultQuality = ref<string>(initial.defaultQuality);
  const defaultSubtitleLang = ref<string | null>(initial.defaultSubtitleLang);
  const defaultAudioLang = ref<string | null>(initial.defaultAudioLang);
  const subtitlePreferenceSet = ref<boolean>(initial.subtitlePreferenceSet);
  // Merge over the defaults (readStoredPreferences shallow-spreads, so a stored
  // partial style would otherwise drop keys) AND copy so the shared
  // DEFAULT_CAPTION_STYLE object is never mutated through the ref.
  const captionStyle = ref<CaptionStyle>({ ...DEFAULT_CAPTION_STYLE, ...initial.captionStyle });
  const atmosphere = ref<boolean>(initial.atmosphere);
  const tv = ref<boolean>(initial.tv);
  // Copy so the shared DEFAULT_PREFERENCES.filterPresets array is never mutated.
  const filterPresets = ref<FilterPreset[]>(initial.filterPresets ? [...initial.filterPresets] : []);
  const showMarkerTimeline = ref<boolean>(initial.showMarkerTimeline);
  const crossfadeDuration = ref<number>(initial.crossfadeDuration);
  const crossfadeFadeIn = ref<number>(initial.crossfadeFadeIn);
  const crossfadeFadeOut = ref<number>(initial.crossfadeFadeOut);
  const gaplessEnabled = ref<boolean>(initial.gaplessEnabled);
  const preferredAudioQuality = ref<Preferences['preferredAudioQuality']>(initial.preferredAudioQuality);

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
      viewMode: viewMode.value,
      reducedMotion: reducedMotion.value,
      autoplay: autoplay.value,
      defaultVolume: defaultVolume.value,
      defaultQuality: defaultQuality.value,
      defaultSubtitleLang: defaultSubtitleLang.value,
      defaultAudioLang: defaultAudioLang.value,
      subtitlePreferenceSet: subtitlePreferenceSet.value,
      captionStyle: captionStyle.value,
      atmosphere: atmosphere.value,
      tv: tv.value,
      filterPresets: filterPresets.value,
      showMarkerTimeline: showMarkerTimeline.value,
      crossfadeDuration: crossfadeDuration.value,
      crossfadeFadeIn: crossfadeFadeIn.value,
      crossfadeFadeOut: crossfadeFadeOut.value,
      gaplessEnabled: gaplessEnabled.value,
      preferredAudioQuality: preferredAudioQuality.value,
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

  // Debounced persist — 250 ms trailing prevents hammering localStorage on
  // rapid slider drags. flush() forces an immediate write (used on pagehide).
  let persistTimer: ReturnType<typeof setTimeout> | null = null;
  function flushPersist() {
    if (persistTimer !== null) {
      clearTimeout(persistTimer);
      persistTimer = null;
    }
    const val = snapshot();
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    } catch {
      /* quota / private mode — ignore */
    }
  }
  const debouncedPersist = (val: Preferences) => {
    if (persistTimer !== null) clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      persistTimer = null;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
      } catch {
        /* quota / private mode — ignore */
      }
    }, 250);
  };
  watch(snapshot, debouncedPersist, { deep: true });

  // Flush immediately when the page is being discarded (mobile tab close, etc.).
  if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', flushPersist);
  }

  /**
   * Tear down everything that outlives the store's effect scope.
   *
   * In the app this fires only on teardown/HMR (the store is a singleton that
   * lives as long as the page), but it is load-bearing for TEST ISOLATION, and
   * that is the reason it exists. `watch(snapshot, …)` above is owned by the
   * store's scope, so `disposePinia()` / `store.$dispose()` stops it — but neither
   * of those can reach these two, and a suite that replaces its pinia between
   * tests leaks them:
   *   - a PENDING 250 ms debounce timer still fires afterwards and writes the OLD
   *     store's snapshot into `localStorage`, landing in whichever test happens to
   *     be running at that moment (`vi.useRealTimers()` discards fake timers, not
   *     a real one already scheduled). That late flush is a genuine cross-test
   *     flake: a test asserting the blob is absent, or asserting a value it just
   *     wrote, sees the stale write instead;
   *   - every discarded store leaves a `pagehide` listener on `window`, so one
   *     dispatched `pagehide` makes N stale stores all write their own snapshots
   *     and the winner is registration order.
   * Clearing the timer here also means a disposed store can never write again.
   */
  onScopeDispose(() => {
    if (persistTimer !== null) {
      clearTimeout(persistTimer);
      persistTimer = null;
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('pagehide', flushPersist);
    }
  });

  function reset() {
    const d = DEFAULT_PREFERENCES;
    theme.value = d.theme;
    accent.value = d.accent;
    density.value = d.density;
    cardSize.value = d.cardSize;
    gridDensity.value = d.gridDensity;
    viewMode.value = d.viewMode;
    reducedMotion.value = d.reducedMotion;
    autoplay.value = d.autoplay;
    defaultVolume.value = d.defaultVolume;
    defaultQuality.value = d.defaultQuality;
    defaultSubtitleLang.value = d.defaultSubtitleLang;
    defaultAudioLang.value = d.defaultAudioLang;
    subtitlePreferenceSet.value = d.subtitlePreferenceSet;
    captionStyle.value = { ...DEFAULT_CAPTION_STYLE };
    atmosphere.value = d.atmosphere;
    tv.value = d.tv;
    filterPresets.value = [...d.filterPresets];
    showMarkerTimeline.value = d.showMarkerTimeline;
    crossfadeDuration.value = d.crossfadeDuration;
    crossfadeFadeIn.value = d.crossfadeFadeIn;
    crossfadeFadeOut.value = d.crossfadeFadeOut;
    gaplessEnabled.value = d.gaplessEnabled;
    preferredAudioQuality.value = d.preferredAudioQuality;
  }

  return {
    theme,
    accent,
    density,
    cardSize,
    gridDensity,
    viewMode,
    reducedMotion,
    autoplay,
    defaultVolume,
    defaultQuality,
    defaultSubtitleLang,
    defaultAudioLang,
    subtitlePreferenceSet,
    captionStyle,
    atmosphere,
    tv,
    filterPresets,
    showMarkerTimeline,
    crossfadeDuration,
    crossfadeFadeIn,
    crossfadeFadeOut,
    gaplessEnabled,
    preferredAudioQuality,
    systemReduced,
    effectiveReducedMotion,
    snapshot,
    saveFilterPreset,
    removeFilterPreset,
    reset,
  };
});
