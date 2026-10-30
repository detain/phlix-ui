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
/** The exact package.json version this bundle was built from, e.g. '0.99.11'. */
export declare const phlixUiVersion: string;
