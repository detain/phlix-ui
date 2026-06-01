# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
