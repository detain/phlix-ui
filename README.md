# @phlix/ui

[![CI](https://github.com/detain/phlix-ui/actions/workflows/ui-ci.yml/badge.svg)](https://github.com/detain/phlix-ui/actions/workflows/ui-ci.yml)
[![codecov](https://codecov.io/gh/detain/phlix-ui/graph/badge.svg)](https://codecov.io/gh/detain/phlix-ui)
[![Version](https://img.shields.io/github/v/tag/detain/phlix-ui?label=version&sort=semver)](https://github.com/detain/phlix-ui/tags)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)

The shared **Vue 3 design system + application shell** for [Phlix](https://github.com/detain).
Both Phlix products — **phlix-server** (the media server) and **phlix-hub** (the federation hub) —
mount this one package to render their entire `/app/*` single-page experience. Build a feature here
once and it ships to both.

`@phlix/ui` is a self-contained kit: a 3-theme **"Nocturne" cinema-after-dark** token system, ~20
accessible primitives, a media-browsing + video-player surface, auth/settings forms, a ⌘K command
palette, four Pinia stores, and a `createPhlixApp()` factory that wires it all into a ready-to-mount
Vue app.

- 🎨 **Three built-in themes** (`nocturne` dark · `daylight` light · `midnight` OLED) with live
  user controls for accent color, density, card size, and motion.
- 🧩 **~20 token-driven, accessible primitives** + higher-level media/player/auth surfaces.
- 🎬 **Full HTML5 video player** — rich scrubber, keyboard map, captions, ambient glow, theater/PiP,
  mini-player, resume + up-next.
- ⌘ **Fuzzy command palette** (⌘K / Ctrl-K), extensible by the host app.
- ⚡ **Code-split + lazy-routed** — the entry bundle is ~57 kB; routes, the player, and the palette
  load on demand.
- ♿ **WCAG 2.1 AA** — axe-clean across every surface × theme, full keyboard support, honored
  reduced-motion, an i18n-readiness seam.
- 🔤 **Self-hosted variable fonts**, no CDN — Fraunces / Hanken Grotesk / JetBrains Mono.

> **Status:** `v0.9.0`. Pre-1.0, so minor releases may include breaking changes. See
> [`CHANGELOG.md`](./CHANGELOG.md) for the full history.

---

## Table of contents

- [Install](#install)
- [Quick start](#quick-start)
- [Configuration — `PhlixAppConfig`](#configuration--phlixappconfig)
- [Theming & user preferences](#theming--user-preferences)
- [Stores & composables](#stores--composables)
- [Component catalog](#component-catalog)
- [Command palette (⌘K)](#command-palette-k)
- [Admin surface](#admin-surface)
- [CSS & font delivery](#css--font-delivery)
- [Development](#development)
- [Build output](#build-output)
- [Compatibility & notes](#compatibility--notes)

---

## Install

`@phlix/ui` is distributed as a **git-tagged dependency** (not published to npm). Pin an exact tag:

```jsonc
// package.json
{
  "dependencies": {
    "@phlix/ui": "github:detain/phlix-ui#v0.9.0"
  }
}
```

```sh
npm install
```

### Peer dependencies

You must provide compatible copies of Vue, Pinia, and Vue Router:

| Peer | Range |
| --- | --- |
| `vue` | `^3.5.0` |
| `pinia` | `^3.0.0` |
| `vue-router` | `^5.0.0` |

Node **≥ 18** is required to build.

---

## Quick start

`createPhlixApp(config)` returns a fully-wired Vue app (Pinia + Vue Router + theme bootstrap +
provides). Import the two stylesheets, then mount:

```ts
import { createPhlixApp } from '@phlix/ui';
import '@phlix/ui/style.css'; // design tokens + component styles (required)
import '@phlix/ui/fonts.css'; // self-hosted @font-face declarations (recommended)

createPhlixApp({
  app: 'server',                       // 'server' | 'hub'
  apiBase: 'https://phlix.example.com', // base URL for /api/v1 calls
}).mount('#app');
```

That single call mounts the whole experience under `/app` (Vue Router history base, configurable):
Browse (`/app`), a per-library page (`/app/library/:id`), media detail (`/app/media/:id`), player
(`/app/player/:id`), login/signup (`/app/login`, `/app/signup`), and settings (`/app/settings`). The
built-in route pages, the player surface, and the command palette are lazy chunks — they load only
when first reached.

**Browse is organized per library.** The Browse home renders a "Continue Watching" rail, any configured
`homeRows`, then **one rail per library** ("Movies", "TV", "Anime", …) read from `GET /api/v1/libraries`.
Each rail's "See all" opens that library's dedicated `/app/library/:id` page (the full filterable grid).
Set `libraryLinks: true` on a `MenuItem` to also surface one nav link per library.

> **CSS is not auto-injected.** The two `import '...css'` lines above are required — without
> `style.css` nothing is styled; without `fonts.css` the type falls back to metric-matched system
> faces (no layout shift, but not the intended typography). See
> [CSS & font delivery](#css--font-delivery).

---

## Configuration — `PhlixAppConfig`

`createPhlixApp(config?: Partial<PhlixAppConfig>)`. Every field is optional except the two you almost
always want (`app`, `apiBase`):

| Field | Type | Purpose |
| --- | --- | --- |
| `app` | `'server' \| 'hub'` | Which Phlix product is mounting the package. |
| `apiBase` | `string` | Base URL for all `/api/v1` calls (provided to the stores via `inject('apiBase')`). |
| `imageOrigin?` | `string` | Cross-origin host serving posters/artwork (a CDN/proxy). Warmed early via `usePreconnect`; falls back to the `apiBase` host when omitted. |
| `routerBase?` | `string` | Vue Router history base. Default `'/app'`. |
| `menu?` | `MenuItem[]` | Navigation entries rendered in the app shell. |
| `extraRoutes?` | `RouteRecordRaw[]` | Extra routes merged after the built-ins (e.g. spread `buildAdminRoutes()` here). |
| `features?` | `Record<string, boolean>` | Arbitrary feature-flag map. |
| `commands?` | `Command[]` | App-injected ⌘K command-palette entries (registered alongside the built-ins). |
| `defaultTheme?` | `'nocturne' \| 'daylight' \| 'midnight'` | Initial theme for a first-time visitor. A stored user choice always wins. |
| `branding?` | `BrandingConfig` | Per-app brand: `wordmark?`, `logoSrc?`, `logoAlt?`, `tagline?`. |
| `homeRows?` | `HomeRow[]` | Browse home-row shelves: `{ id, title, query? }` (query is a partial `LibraryQueryParams`, incl. `libraryId`). Rendered _in addition to_ the automatic per-library rails. |
| `messages?` | `PhlixMessagesConfig` | Deep-partial override of user-facing English strings (the i18n-readiness seam). |

```ts
import { createPhlixApp, buildAdminRoutes, adminMenu } from '@phlix/ui';

createPhlixApp({
  app: 'server',
  apiBase: '',
  branding: { wordmark: 'Phlix', tagline: 'Your cinema, after dark' },
  defaultTheme: 'nocturne',
  homeRows: [
    { id: 'continue', title: 'Continue Watching' },
    { id: 'recent', title: 'Recently Added', query: { sort: 'added', order: 'desc' } },
  ],
  commands: [
    { id: 'rescan', title: 'Rescan library', run: () => rescan() },
  ],
  extraRoutes: buildAdminRoutes('/app'),
  menu: adminMenu('/app'),
}).mount('#app');
```

---

## Theming & user preferences

### Three built-in themes

The "Nocturne" system ships three themes, applied via a `data-theme` attribute on `<html>`:

| Theme | Scheme | Feel |
| --- | --- | --- |
| `nocturne` | dark | Default — deep-brown cinema dark with projector-amber accent. |
| `daylight` | light | Warm parchment light theme. |
| `midnight` | dark | Pure-black OLED variant (`--bg: #000`). |

### Live user controls

`usePreferencesStore` holds the user's appearance + playback preferences, persisted to
`localStorage` (`phlix.prefs`). `useTheme()` reflects them onto `<html>` reactively
(`data-theme`, `data-density`, `data-reduced-motion`, and inline `--accent*` variables). The
`AppearanceSettings` panel (mounted by the built-in Settings page) exposes them all:

| Preference | Default | Notes |
| --- | --- | --- |
| `theme` | `'nocturne'` | one of the three above |
| `accent` | `null` | a hex string overrides projector-amber via `deriveAccentVars()` |
| `density` | `'comfortable'` | or `'compact'` (smaller controls) |
| `cardSize` | `180` | poster width in px (drives grid auto-fit) |
| `gridDensity` | `'comfy'` | `'cozy' \| 'comfy' \| 'dense'` |
| `reducedMotion` | `'auto'` | `'auto' \| 'on' \| 'off'` (auto honors the OS setting) |
| `atmosphere` | `true` | film-grain/vignette + ambient player glow |
| `autoplay` | `true` | up-next auto-advance |
| `defaultVolume` / `defaultQuality` / `defaultSubtitleLang` | `1` / `'auto'` / — | player seeds |
| `captionStyle` | size `md`, white, no bg, drop-shadow | caption rendering |
| `filterPresets` | `[]` | saved Browse filter presets |

To prevent a flash of the wrong theme, `createPhlixApp` calls `applyStoredThemeEarly()` synchronously
before mount. If you mount `PhlixApp.vue` yourself, call it first.

```ts
import { usePreferencesStore } from '@phlix/ui';

const prefs = usePreferencesStore();
prefs.theme = 'daylight';
prefs.accent = '#7c5cff'; // live re-themes via deriveAccentVars()
prefs.reset();            // back to DEFAULT_PREFERENCES
```

---

## Stores & composables

Four Pinia stores plus auth/toast carry all app state. Import the composables directly; they expect to
run inside an app created by `createPhlixApp` (which provides `apiBase`).

| Store | Responsibility | Key methods |
| --- | --- | --- |
| `usePreferencesStore` | Appearance + playback prefs (persisted) | `saveFilterPreset`, `removeFilterPreset`, `reset`, `snapshot` |
| `useMediaStore` | Library browsing — query-keyed cache (60 s TTL), dedupe, debounced search, URL sync | `fetchMedia`, `scheduleFetch`, `loadMore`, `prefetch`, `toQuery`, `applyQuery`, `setSearch`, `setGenres`, `setSort` |
| `usePlayerStore` | Singleton playback shared across routes (so the mini-player survives navigation), resume map, queue, Media Session | `setCurrent`, `updateProgress`, `play`/`pause`, `next`, `setQueue`, `showMiniPlayer`, `resumePositionFor`, `bindMediaSession` |
| `useCommandStore` | ⌘K registry + palette state, persisted recents | `register` (→ disposer), `togglePalette`, `runId` |
| `useAuthStore` | Auth state over `ApiClient` + `LocalStorageTokenStore` | `login`, `signup`, `fetchUser`, `logout` |
| `useToastStore` | Transient notifications (rendered by `<ToastHost>`) | `success`, `error`, `warning`, `info`, `dismiss` |

### Standalone composables

| Composable | Purpose |
| --- | --- |
| `useTheme()` | Reflect prefs onto `<html>` live (call once near the root). |
| `applyStoredThemeEarly(defaultTheme?)` | Synchronous pre-mount theme bootstrap (no-flash). |
| `useMessages()` | Returns `{ t }` — `t('group.key', params?)` resolves the i18n catalog + overrides. |
| `usePreconnect(input, opts?)` | Inject `<link rel=preconnect/dns-prefetch>` for a cross-origin asset host. SSR-safe, self-cleaning. |
| `usePrefetch()` | `{ prefetch(to) }` — warm a lazy route's chunk on hover/focus without navigating. |
| `useCommandPaletteHotkey()` | Owns the global ⌘K/Ctrl-K listener (lives outside the lazy palette chunk). |
| `useOnline()` | Reactive, SSR-safe `navigator.onLine`. |
| `bindMediaStoreToRouter(router, apiBase)` | Two-way sync of `useMediaStore` filters ↔ URL query (returns teardown). |
| `useFocusTrap(container, active, opts?)` | Focus-trap + scroll-lock + Escape for overlays (powers `Modal`/`Sheet`). |
| `deriveAccentVars(hex)` | Pure: a hex → the full `--accent*` custom-property ramp. |

### Performance Patterns

**Page Visibility API for Polling:**

Polling timers (e.g., for live scan status) should pause when the tab is hidden to avoid unnecessary server load and battery drain. Use the Page Visibility API (`document.visibilityState` / `visibilitychange` event):

```ts
function handleVisibilityChange(): void {
  if (document.hidden) {
    pauseAllPolling();
  } else {
    resumeAllPolling();
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
```

See `LibrariesPage.vue` (scan status polling), `LogsPage.vue` (auto-refresh), `DashboardPage.vue` (now-playing refresh), and `MetricsPage.vue` (snapshot/connections/history polling) for examples.

**Scroll Handler Throttling:**

Scroll events can fire hundreds of times per second. Use timestamp-based throttling rather than `requestAnimationFrame` alone, because Firefox aggressively throttles rAF during scrolling which causes visual "freezing":

```ts
let lastScrollMeasureTime = 0;
const SCROLL_MEASURE_THROTTLE_MS = 16; // ~60fps

function throttledMeasure(): void {
  const now = performance.now();
  if (now - lastScrollMeasureTime < SCROLL_MEASURE_THROTTLE_MS) return;
  lastScrollMeasureTime = now;
  measure();
}

window.addEventListener('scroll', throttledMeasure, { passive: true });
```

For rAF-coalesced measurements (used in `MediaGrid.vue` for layout calculations after scroll settles):

```ts
let frame = 0;
function scheduleMeasure(): void {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    measure();
  });
}
```

The two patterns are complementary: timestamp throttling limits how often the measurement runs, while rAF coalescing ensures layout recalculations sync with the browser's paint cycle.

---

## Component catalog

Everything below is a named export from the package root (`import { Button } from '@phlix/ui'`).

### Primitives (`src/components/ui/`)

`Button` · `IconButton` · `Badge` · `Slider` · `Switch` · `Chip` · `Select` · `Combobox` · `Modal` ·
`Sheet` · `Tooltip` · `ToastHost` · `Skeleton` · `Spinner` · `EmptyState` · `Tabs` · `Kbd` ·
`Reveal` · `PageTransition` — all token-driven, theme-aware, keyboard-accessible. Plus `Icon`
(Lucide via `unplugin-icons`; type-checked `IconName`) and `AppBackdrop` (the atmosphere layer).

### Media surfaces

`MediaCard` · `MediaGrid` (virtualized) · `MediaRow` · `MediaHomeRow` · `MediaDetail` · `FilterBar`.

### Player surface

`Player` · `MiniPlayer` · `Scrubber` · `VolumeControl` · `SpeedMenu` · `QualityMenu` ·
`CaptionsMenu` · `CaptionOverlay` · `AmbientCanvas` · `ResumePrompt` · `UpNext` · `TranscodeNotice` ·
`ShortcutsHelp`. Pure helpers live alongside (`playback.ts`, `captions.ts`, `ambient.ts`,
`shortcuts.ts`, `format-time.ts`).

### Forms & long-tail pages

`LoginForm` · `SignupForm` · `SettingsForm`, plus the directly-exported consumer pages
`LibraryScanPage` · `MyServersPage` · `FederationPage` · `ManageSharesPage` · `AuditLogsPage`.

> The six built-in **route** pages (Browse/Detail/Player/Login/Signup/Settings) and the 16 admin pages
> are intentionally **not** re-exported — they are lazy chunks mounted by `createPhlixApp` /
> `buildAdminRoutes`. Compose your own pages from the building blocks above, or let the factory mount
> the built-ins.

---

## Command palette (⌘K)

The palette is a lazy chunk; the **hotkey** is always live. Built-in commands (navigation, theme
switching, etc.) are registered automatically; add your own via config or at runtime:

```ts
import { useCommandStore } from '@phlix/ui';

const commands = useCommandStore();
const dispose = commands.register({
  id: 'scan-all',
  title: 'Scan all libraries',
  run: () => scanAll(),
});
// dispose() to unregister
```

`fuzzyScore` / `matchCommand` are exported for custom command UIs. Recents persist to
`localStorage` (`phlix.cmd.recents`, capped at 8).

---

## Admin surface

The 16 admin pages (Dashboard, Users, Libraries, Settings, Live TV, Cast Devices, …) are produced as
lazy routes — no static JS in the entry:

```ts
import { createPhlixApp, buildAdminRoutes, adminMenu } from '@phlix/ui';

createPhlixApp({
  app: 'server',
  apiBase: '',
  extraRoutes: buildAdminRoutes('/app'), // 16 lazy routes under /app/admin/*
  menu: adminMenu('/app'),               // matching nav entries
}).mount('#app');
```

Admin API clients (`AdminUsersApi`, `AdminLiveTvApi`, …) and their types are exported for direct use.

---

## CSS & font delivery

The package publishes only `dist/`, and CSS is **not** auto-injected — import it explicitly:

```ts
import '@phlix/ui/style.css'; // tokens + component styles + reset (required)
import '@phlix/ui/fonts.css'; // @font-face declarations (recommended)
```

- **`@phlix/ui/style.css`** — all design tokens (colors, type scale, spacing, radius, shadow, motion,
  density) plus every component's styles. Does *not* embed font bytes.
- **`@phlix/ui/fonts.css`** — the `@font-face` rules only. The three `.woff2` files sit next to it in
  `dist/fonts/` (relative `url()`), so serve them co-located. The faces include metric-matched system
  fallbacks for zero-CLS swapping. Fonts are self-hosted (no CDN). Kept separate so Vite's lib build
  doesn't base64-inline the woff2 into the main CSS.

---

## Development

```sh
npm install
npm run dev          # Vite dev server (open src/dev/gallery.html for the primitive Gallery)
npm run build        # vue-tsc typecheck + vite lib build + d.ts emit + copy fonts
npm run test         # vitest (watch)
npm run test:run     # vitest run (CI)
npm run typecheck    # vue-tsc --noEmit
npm run test:visual  # Playwright visual-regression suite (on-demand; not in the default gate)
npm run test:a11y    # Playwright + axe — 0 WCAG 2.0/2.1 A+AA violations across surfaces × themes
```

- **`src/dev/Gallery.vue`** — a dev-only showcase of every primitive × every theme, with a
  theme switcher and density toggle. The source of truth for visual QA.
- **Visual + a11y harnesses** (`src/dev/visual/*`) mount the real surfaces (Browse, Detail, Player,
  Auth, Settings, shell) with deterministic offline data for Playwright. These suites are **on-demand**
  — they're not part of the blocking `build`/`vitest` gate (PNG baselines are environment-fragile).
- Toolchain: **Vite 8 · Vitest 4 · TypeScript 6 · vue-tsc 3 · Vue 3.5 · Pinia 3 · Vue Router 5.**

---

## Build output

`npm run build` emits to `dist/` (committed in this repo):

| Output | Notes |
| --- | --- |
| `dist/phlix-ui.js` | ESM entry (~57 kB; routes/player/palette split into lazy chunks). |
| `dist/phlix-ui.umd.cjs` | UMD/CJS build for `require()`. |
| `dist/style.css` | Tokens + component styles. |
| `dist/fonts/` | `fonts.css` + three variable `.woff2` files. |
| `dist/index.d.ts` + per-module `.d.ts` | Type declarations. |
| `dist/<Chunk>-<hash>.js` | On-demand chunks (each route page, the player surface, the palette). |

---

## Compatibility & notes

- **Pre-1.0 semver** — `0.x` minor bumps may include breaking changes. Pin an exact tag; read the
  `CHANGELOG` before upgrading.
- **Icons, never emoji** — all iconography is Lucide SVG via the type-checked `Icon` component.
- **SSR-safe composables** — `usePreconnect`/`useOnline`/`useMessages`/`useTheme` guard `window`/
  `document` access.
- **Stores need the provided `apiBase`** — they `inject('apiBase')`, so run them inside a
  `createPhlixApp` tree (or provide `apiBase` yourself).
- **One package, two consumers** — `phlix-server/web-ui` and `phlix-hub/web-ui` both pin the same
  git tag and commit a rebuilt `public/assets/app/**` bundle. They always track the same MAJOR.

---

## License

MIT © Phlix
