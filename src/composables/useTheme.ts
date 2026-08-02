/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { watchEffect } from 'vue';
import {
  usePreferencesStore,
  readStoredPreferences,
  hasStoredPreferences,
  type Preferences,
  type ThemeName,
} from '../stores/usePreferencesStore';
import { useThemesStore } from '../stores/useThemesStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useApiBase } from './useApiBase';
import { deriveAccentVars } from './color';
import {
  applyThemeTokens,
  clearThemeTokens,
  isBuiltInThemeId,
  readCachedTheme,
  writeCachedTheme,
  type ActiveThemeStyle,
} from './themeTokens';

const ACCENT_KEYS = ['--accent', '--accent-hover', '--accent-active', '--accent-soft', '--accent-ring', '--accent-contrast'];

/**
 * Apply a flat prefs object to <html> (data-theme/density + plugin-theme token
 * map + accent override + reduced-motion attr). Used both by useTheme
 * (reactive) and the early bootstrap.
 *
 * ## Order is the contract
 *
 * 1. **Reset** every custom property this function can own — the 53 allowlisted
 *    theme tokens plus the accent role set. Removing a property that was never
 *    set is a CSSOM no-op, so on a `<html>` that has only ever run a built-in
 *    theme this whole step is invisible. That is exactly what keeps
 *    nocturne/daylight/midnight unaffected by S86, and it is also what stops a
 *    stale override surviving a switch from a plugin theme back to a built-in.
 * 2. **`data-theme`** — for a built-in, its own id; for a plugin theme, the
 *    BASE built-in it layers over. The stylesheet then supplies a complete set
 *    of 53 values, so anything the plugin does not override still resolves.
 * 3. **Plugin tokens** on top, via `el.style.setProperty` (inline styles beat
 *    the stylesheet's `[data-theme=…]` rule, and CSSOM writes need no
 *    `style-src 'unsafe-inline'`).
 * 4. **Accent override** last, so an explicit user accent beats a plugin
 *    theme's accent rather than the other way round.
 */
function applyToRoot(
  p: Pick<Preferences, 'theme' | 'density' | 'accent' | 'tv'>,
  reducedMotion: boolean,
  active: ActiveThemeStyle | null,
) {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;

  // 1. Reset — see the docblock. Must precede everything else.
  clearThemeTokens(el);
  for (const k of ACCENT_KEYS) el.style.removeProperty(k);

  // 2. Base block. An id we know nothing about (a theme uninstalled since it
  //    was chosen, before the catalogue loads) is written through verbatim: it
  //    matches no `[data-theme=…]` rule, so the `:root` defaults apply and the
  //    page renders as nocturne rather than unstyled, while the DOM still says
  //    what is selected.
  el.setAttribute('data-theme', active !== null ? active.base : p.theme);
  el.setAttribute('data-density', p.density);
  if (reducedMotion) el.setAttribute('data-reduced-motion', 'true');
  else el.removeAttribute('data-reduced-motion');
  // TV mode is a device/mode flag, orthogonal to theme/density — mirrored as a
  // `data-tv` boolean exactly like `data-reduced-motion`.
  if (p.tv) el.setAttribute('data-tv', 'true');
  else el.removeAttribute('data-tv');

  // 3. Plugin/server theme tokens.
  if (active !== null) applyThemeTokens(el, active.tokens);

  // 4. Accent override wins over both the stylesheet and a plugin theme.
  const vars = p.accent ? deriveAccentVars(p.accent) : null;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
  }
}

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
export function applyStoredThemeEarly(defaultTheme?: ThemeName, defaultTv?: boolean): void {
  const p = readStoredPreferences();
  const firstTime = !hasStoredPreferences();
  if (defaultTheme && firstTime) p.theme = defaultTheme;
  if (defaultTv !== undefined && firstTime) p.tv = defaultTv;
  const reduced =
    p.reducedMotion === 'on'
      ? true
      : p.reducedMotion === 'off'
        ? false
        : typeof window !== 'undefined' &&
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Only honour the cache when it is for the theme actually selected — a stale
  // entry from a previous choice must never repaint over the current one.
  const cached = readCachedTheme();
  const active = cached !== null && cached.id === p.theme ? cached : null;

  applyToRoot(p, reduced, active);
}

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
export function useTheme() {
  const prefs = usePreferencesStore();
  const themes = useThemesStore();
  const auth = useAuthStore();
  const apiBase = useApiBase();

  // Load the catalogue when (and only when) it can succeed. `load()` is
  // idempotent and swallows its own failures, so this is safe to re-run.
  watchEffect(() => {
    if (apiBase.value === '' || !auth.isLoggedIn) return;
    void themes.load(apiBase.value);
  });

  watchEffect(() => {
    // Reading `themes.items` through `styleFor` is what makes this effect
    // re-run when the catalogue arrives.
    const active = themes.styleFor(prefs.theme);

    applyToRoot(
      { theme: prefs.theme, density: prefs.density, accent: prefs.accent, tv: prefs.tv },
      prefs.effectiveReducedMotion,
      active,
    );

    // Keep the no-FOUC cache in step. A built-in needs none (and must actively
    // CLEAR any previous one, or switching back would leave a stale map to
    // repaint on the next boot). While the catalogue is still loading, a
    // non-built-in id resolves to null — leave whatever is cached alone rather
    // than deleting the very entry the next boot needs.
    if (isBuiltInThemeId(prefs.theme)) writeCachedTheme(null);
    else if (active !== null) writeCachedTheme(active);
  });

  return prefs;
}
