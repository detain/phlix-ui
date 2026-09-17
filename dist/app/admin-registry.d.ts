/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Admin-label resolver seam (S528 — admin-graph decoupling).
 *
 * The shell (`createPhlixApp`) titles admin routes as `Admin · <label>`, but it
 * must NOT statically import the admin barrel (`./admin`) to do it: that import
 * edge keeps every lazily-imported admin page chunk alive in the bundler graph
 * even for consumers that never mount admin (measured in the S517 tizen receipt —
 * flag-off dropped the layout chunk but the shell's label lookup pinned the pages).
 *
 * This module is the cut point: it holds only a nullable function reference, so
 * its top level is side-effect-free and bundle-trivial. `./admin` hands itself in
 * at `buildAdminRoutes()` time (self-registration); consumers that never build
 * admin routes never pull the admin graph in — the resolver simply stays unset
 * and admin titles resolve to `null` exactly like any unknown route.
 */
/** Resolves an `admin-*` route name to its sidebar label, or `null` if unknown. */
type AdminLabelResolver = (name: string) => string | null;
/**
 * Install the admin label resolver (called by `buildAdminRoutes`). Passing
 * `null` uninstalls it — the seam's own reset for isolated tests.
 */
export declare function setAdminLabelResolver(resolver: AdminLabelResolver | null): void;
/**
 * Look up the label for an `admin-*` route name. `null` (no section mounted,
 * or unknown name) — callers fall through to their default title logic.
 */
export declare function adminLabelFor(name: string | null | undefined): string | null;
export {};
