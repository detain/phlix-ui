/**
 * Shared bootstrap for the R6.4b per-surface visual harnesses. NOT shipped
 * (`src/dev/**` is excluded from the lib build + coverage). Each surface harness
 * (`browse.ts`, `player.ts`, …) calls `mountVisual(RootComponent, { setup })`.
 *
 * It mounts the REAL `@phlix/ui` SFCs with deterministic, OFFLINE mock data so a
 * Playwright `toHaveScreenshot` baseline is reproducible:
 *   · theme comes from `?theme=nocturne|daylight|midnight` (default nocturne);
 *   · density is pinned `comfortable`;
 *   · atmosphere (film-grain/ambient) + motion are FORCED OFF — the grain/ambient
 *     are non-deterministic GPU layers, and the determinism is also enforced at
 *     the Playwright layer (`reducedMotion:'reduce'` + `animations:'disabled'`).
 *
 * The theme/density/reduced-motion attributes are written to <html> ONCE here;
 * `useTheme()` is deliberately NOT used so nothing reactively re-applies them and
 * fights the deterministic capture. CONSEQUENCE: these are STATIC visual fixtures,
 * not interactive tests — interactive theme controls (the shell `ThemeToggle`, the
 * Settings theme/accent swatches) update the prefs store but will NOT re-theme
 * <html> here (in production, `PhlixApp`'s `useTheme()` watcher does that). Pick the
 * theme via `?theme=`. A minimal in-memory `vue-router` is installed
 * so the router-dependent surfaces (Auth `useRouter`, shell `UserMenu`/RouterLink)
 * mount without errors; the router-free surfaces ignore it.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */
import { createApp, type Component } from 'vue';
import { createPinia, type Pinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import '../../assets/fonts/fonts.css';
import '@phlix/tokens/style.css';
import { usePreferencesStore, type ThemeName } from '../../stores/usePreferencesStore';
import type { PhlixAppConfig } from '../../app/types';

const VALID_THEMES: readonly ThemeName[] = ['nocturne', 'daylight', 'midnight'];

/** Resolve the requested theme from `?theme=`, defaulting to nocturne. */
export function themeFromQuery(): ThemeName {
  const raw =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('theme') : null;
  return (VALID_THEMES as readonly string[]).includes(raw ?? '') ? (raw as ThemeName) : 'nocturne';
}

/** Demo app config (branding + routerBase) for AuthCard / UserMenu / LoginForm. */
const DEMO_CONFIG: PhlixAppConfig = {
  app: 'server',
  apiBase: '',
  routerBase: '/',
  defaultTheme: 'nocturne',
  branding: { wordmark: 'Phlix' },
  menu: [],
};

export interface MountVisualOptions {
  /** Seed stores before mount (e.g. `usePlayerStore(pinia)`, `useAuthStore(pinia)`). */
  setup?: (ctx: { pinia: Pinia; theme: ThemeName }) => void;
}

/** Mount a surface harness root with deterministic theme + atmosphere-off state. */
export function mountVisual(root: Component, opts: MountVisualOptions = {}): void {
  const theme = themeFromQuery();

  // Start each harness page pristine (Playwright already isolates storage per test,
  // but this also makes manual `npm run dev` visits deterministic). `opts.setup` may
  // then seed exactly what a surface needs (e.g. an `access_token` for a signed-in shell).
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.clear();
    } catch {
      /* private mode / disabled — ignore */
    }
  }

  const pinia = createPinia();

  // Deterministic preferences: requested theme, comfortable density, NO atmosphere
  // (film-grain/ambient), reduced motion ON, default amber accent.
  const prefs = usePreferencesStore(pinia);
  prefs.theme = theme;
  prefs.density = 'comfortable';
  prefs.atmosphere = false;
  prefs.reducedMotion = 'on';
  prefs.accent = null;

  // Reflect onto <html> once (mirrors useTheme's applyToRoot, without the watcher).
  if (typeof document !== 'undefined') {
    const el = document.documentElement;
    el.setAttribute('data-theme', theme);
    el.setAttribute('data-density', 'comfortable');
    el.setAttribute('data-reduced-motion', 'true');
  }

  opts.setup?.({ pinia, theme });

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:rest(.*)*', component: { render: () => null } }],
  });

  const app = createApp(root);
  app.use(pinia);
  app.use(router);
  app.provide('apiBase', '');
  app.provide('phlixConfig', DEMO_CONFIG);
  app.provide('phlixCommands', []);
  app.mount('#app');
}
