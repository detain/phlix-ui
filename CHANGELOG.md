# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] — UI Redo ("Nocturne")

The UI Redo (R0→R6) re-skins every surface on a tokenized, multi-theme, customizable design
system. Additive + back-compatible during R0–R5; first tag at the end of R1.

### Added
- **Design system "Nocturne" (R0.0):** art-direction mockups + a distilled design spec under
  `src/dev/mockups/` (poster card, browse grid + filter bar, player chrome; nocturne/daylight/midnight).
  Cinema-after-dark aesthetic — projector-amber accent, Fraunces/Hanken Grotesk/JetBrains Mono,
  film-grain + vignette + poster-ambient atmosphere. Dev-only reference artifacts (not bundled).
- **Token system (R0.1):** semantic, `[data-theme]`-scoped tokens with three built-in themes —
  `nocturne` (default dark), `daylight` (warm light), `midnight` (OLED true-black).
  - Amber accent ramp `--amber-50…950` + `--accent`/`-hover`/`-active`/`-soft`/`-ring`/`--accent-contrast`.
  - Surface ladder (`--bg`, `--surface`, `--surface-2`, `--surface-3`, `--surface-glass`,
    `--surface-glass-strong`), text ramp (`--text`/`-muted`/`-subtle`/`-faint`/`--text-on-accent`),
    borders (`--border`/`-subtle`/`-strong`), state colors (+`-bg`).
  - Atmosphere hooks: `--grain-opacity`, `--vignette`, `--ambient`.
  - Elevation (`--shadow-1…4`, `--glow-amber`), motion scale (`--ease-*`, `--dur-*`),
    density scale (`[data-density=comfortable|compact]` → `--control-h`, `--control-pad-x`, …).
  - `src/dev/swatches.html` validates every token across all three themes.
- **Typography (R0.2):** self-hosted, no CDN. Three OFL latin-subset **variable** woff2 (~133 kB):
  Fraunces (display, opsz 9–144 / wght 100–900), Hanken Grotesk (UI/body, wght 100–900), JetBrains Mono
  (timecode/numerals, wght 400–800). Family tokens `--font-display`/`--font-sans`/`--font-mono`, a fluid
  `clamp()` type scale (`--text-2xs…hero`), tracking/leading tokens, `.numeric` (tabular-nums) + `.eyebrow`.
  Each face has a metric-matched fallback `@font-face` (size-adjust + ascent/descent overrides from real
  font metrics) for CLS≈0 swap. Shipped as a **separate** `@phlix/ui/fonts.css` + `dist/fonts/*.woff2`
  (kept out of the bundled `style.css` so the woff2 stay cacheable; copied by `scripts/copy-fonts.mjs`).
  New package exports: `./fonts.css`, `./style.css`, `./dist/*`. Consumers wire the imports in R6.6.

### Changed
- Accent is now **projector-amber `#f5a524`** (was indigo `#6366f1`). Radius scale softened
  (sm 6 / md 10 / lg 14 / xl 20 / 2xl 28). `:root` defaults to the Nocturne theme.

### Deprecated
- Legacy `--color-*` and `--shadow-*` token names are retained as **aliases** that map onto the new
  tokens (in every theme scope) for back-compat; prefer the new semantic names going forward.

## [0.7.0] - 2026-06-01

### Added
- LibraryScanPage for server library scanning (`/app/library/scan`)
- MyServersPage for hub server management (`/app/servers`)
- FederationPage for federated server connections (`/app/federation`)
- ManageSharesPage for library sharing (`/app/shares`)
- AuditLogsPage for audit trail (`/app/audit-logs`)

## [0.6.0] - 2026-06-01

### Added
- `SettingsForm.vue` - schema-driven settings form from `server-settings.schema.json`
- `SettingsPage.vue` - settings page component

### Changed
- Flip Admin link to `/app/settings` behind `PHLIX_VUE_AUTH` flag

## [0.5.0] - 2026-06-01

### Added
- Auth surface: `LoginForm.vue`, `LoginPage.vue`, `SignupForm`, `SignupPage`
- `useAuthStore` for authentication state management

## [0.4.0] - 2026-06-01

### Added
- Player surface: `Player.vue` and `PlayerPage.vue` (`/app/player/:id`)

## [0.3.0] - 2026-06-01

### Added
- Browse surface: `MediaCard.vue`, `MediaGrid.vue`, `FilterBar.vue`, `BrowsePage.vue`
- `useMediaStore` for filter/sort/search/pagination

## [0.1.0] - 2026-06-01

### Added
- Initial release
- Repository skeleton with Vue 3 + TypeScript + Vite
- Package structure with barrel exports (`index.ts`)
- `ApiClient` + `LocalStorageTokenStore` (ported from `admin-ui`)
- `TokenStore` + `AuthUser` TypeScript types
- `MediaItem`, `LibraryQuery`, `LibraryQueryParams` types (from Phase-B schemas)
- `ServerSettings` type (from `server-settings.schema.json`)
- Design tokens: `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadow.css`, `index.css`
- `createPhlixApp(config)` factory with Pinia + Vue Router + `window.__PHLIX__` reader
- `PhlixApp.vue` root component with `AppLayout.vue` shell
- `PhlixAppConfig` type: `app`, `apiBase`, `routerBase`, `menu`, `extraRoutes`, `features`
- Placeholder page routing `/app/*` via `browse` + catchall route
- 21 unit tests for `ApiClient` + `tokenStore`
