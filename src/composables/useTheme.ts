import { watchEffect } from 'vue';
import {
  usePreferencesStore,
  readStoredPreferences,
  hasStoredPreferences,
  type Preferences,
  type ThemeName,
} from '../stores/usePreferencesStore';
import { deriveAccentVars } from './color';

const ACCENT_KEYS = ['--accent', '--accent-hover', '--accent-active', '--accent-soft', '--accent-ring', '--accent-contrast'];

/** Apply a flat prefs object to <html> (data-theme/density + accent override +
 *  reduced-motion attr). Used both by useTheme (reactive) and the early bootstrap. */
function applyToRoot(p: Pick<Preferences, 'theme' | 'density' | 'accent'>, reducedMotion: boolean) {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  el.setAttribute('data-theme', p.theme);
  el.setAttribute('data-density', p.density);
  if (reducedMotion) el.setAttribute('data-reduced-motion', 'true');
  else el.removeAttribute('data-reduced-motion');

  const vars = p.accent ? deriveAccentVars(p.accent) : null;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
  } else {
    for (const k of ACCENT_KEYS) el.style.removeProperty(k); // fall back to theme amber
  }
}

/**
 * applyStoredThemeEarly (R1.1) — call ONCE before mount (in createPhlixApp) to set
 * <html> from persisted prefs synchronously, avoiding a theme flash on load.
 *
 * `defaultTheme` (R1.5) seeds the theme for first-time visitors with no stored
 * preference (an app's per-app default); a stored user choice always wins.
 */
export function applyStoredThemeEarly(defaultTheme?: ThemeName): void {
  const p = readStoredPreferences();
  if (defaultTheme && !hasStoredPreferences()) p.theme = defaultTheme;
  const reduced =
    p.reducedMotion === 'on'
      ? true
      : p.reducedMotion === 'off'
        ? false
        : typeof window !== 'undefined' &&
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  applyToRoot(p, reduced);
}

/**
 * useTheme (R1.1) — reactively reflect the preferences store onto <html>. Call
 * once near the app root (PhlixApp). Switching theme/accent/density/reduced-motion
 * updates the live DOM instantly.
 */
export function useTheme() {
  const prefs = usePreferencesStore();
  watchEffect(() => {
    applyToRoot(
      { theme: prefs.theme, density: prefs.density, accent: prefs.accent },
      prefs.effectiveReducedMotion,
    );
  });
  return prefs;
}
