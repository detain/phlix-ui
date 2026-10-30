/**
 * Build version stamp (M-UI-23).
 *
 * `dist/` ships by tag and consumers vendor it into `/app`; when a copy drifts
 * from its claimed tag (the S176 class `npm run dist:check` guards at build
 * time), nothing client-side could previously report which build a live `/app`
 * actually is. The Vite configs substitute `__PHLIX_UI_VERSION__` with the
 * package.json version at build time (define), so the shipped bundle carries a
 * literal — observable programmatically via this export and in the field via
 * `window.__PHLIX_UI_VERSION__` (stamped by `createPhlixApp`).
 *
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

// Present in every Vite-built context (both lib entries and vitest, which
// shares vite.config.ts); `undefined` only if someone compiles src/ through a
// pipeline that knows nothing about the define.
declare const __PHLIX_UI_VERSION__: string | undefined;

/** The exact package.json version this bundle was built from, e.g. '0.99.11'. */
export const phlixUiVersion: string =
    typeof __PHLIX_UI_VERSION__ === 'string' ? __PHLIX_UI_VERSION__ : '0.0.0-dev';
