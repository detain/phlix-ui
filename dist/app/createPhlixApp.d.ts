import { type App as VueApp } from 'vue';
import { type RouteRecordRaw, type RouteLocationNormalized, type RouteLocationRaw } from 'vue-router';
import { type Translate } from '../i18n/messages';
import type { PhlixAppConfig } from './types';
/**
 * Route names reachable WITHOUT authentication. Everything else is gated by
 * {@link authGuard} — an unauthenticated visit redirects to `login`. A consumer
 * route can also opt out by setting `meta: { public: true }`.
 */
export declare const PUBLIC_ROUTE_NAMES: readonly string[];
/**
 * Navigation guard. Pure (the auth state is passed in) so it unit-tests without a
 * live router/store. Returns `true` to allow, or a redirect location.
 *
 * - Public routes (`login`/`signup` or `meta.public`) always pass.
 * - An unauthenticated visit to any other route redirects to `login` (preserving
 *   the intended destination so the login flow can return there).
 * - An admin-only route (`meta.requiresAdmin`, set on the whole `/app/admin/*`
 *   section and inherited by every child) requires `isAdmin`. A logged-in
 *   non-admin is sent `home` — NOT to `login`: they are already authenticated,
 *   so bouncing them to login would just loop back here after a successful
 *   re-auth. `home` defaults to the `browse` route (the media server's home);
 *   the hub passes its servers list (`/app/servers`) so a non-admin lands there
 *   rather than on the media-server Browse page (which calls server-only
 *   endpoints that 404 on the hub). (The server API authorizes regardless; this
 *   only stops the admin UI from rendering for a non-admin or an unvalidated
 *   session.)
 */
export declare function authGuard(to: RouteLocationNormalized, isLoggedIn: boolean, isAdmin?: boolean, home?: RouteLocationRaw): true | RouteLocationRaw;
/**
 * Connect-gate for native clients (no baked-in server origin). Pure (the state is
 * passed in) so it unit-tests without a live router/store. Returns:
 *
 * - `null` when the gate does NOT apply (web-hosted app, or a base is already
 *   resolved) — the caller falls through to {@link authGuard}.
 * - `true` when the gate applies and the target IS the `connect` screen itself
 *   (let it render; it is public and must reach the user with no base).
 * - a redirect to `connect` (preserving the intended destination) otherwise.
 *
 * While unconnected the caller must NOT run `auth.init()` — there is no server to
 * validate a token against — which a non-null return here lets it skip.
 */
export declare function connectGuard(to: RouteLocationNormalized, requireConnection: boolean, hasBase: boolean): true | RouteLocationRaw | null;
/**
 * Resolve the STATIC page title for a route (the page-specific part, WITHOUT the
 * ` · Phlix` suffix — {@link setPageTitle} adds that). Pure (translator passed
 * in) so it unit-tests without a live router.
 *
 * Resolution order:
 * 1. `meta.title` — a string. Run through `t()`: a known i18n message key (e.g.
 *    `shell.browse`) resolves to its (possibly overridden) translation; an
 *    unknown key / plain literal echoes back unchanged, so a literal title also
 *    works.
 * 2. An `admin-*` route name → `Admin · <label>` from the canonical page labels.
 * 3. Otherwise `null` — the page either sets its own title from async data
 *    (media/library/player) or simply shows the bare app name (catchall).
 */
export declare function resolveRouteTitle(to: RouteLocationNormalized, t: Translate): string | null;
/**
 * Resolve the base for MEDIA browsing from the app kind + the host's own API base
 * + the currently selected server. On the hub with a server selected this is that
 * server's relay-proxy base (`{apiBase}/api/v1/servers/{id}/proxy`) so the shared
 * media pages fetch the paired server's API over the reverse tunnel; otherwise
 * (the media server, or the hub with no server selected) it is the host's own
 * base. Pure so it unit-tests without a live store/app; `createPhlixApp` wraps it
 * in a computed over {@link useServerStore}.
 */
export declare function mediaApiBaseFor(app: 'server' | 'hub', apiBase: string, currentServerId: string | null): string;
/**
 * Resolve the base the player streams media BYTES from directly (bypassing the
 * relay proxy). On the hub this is the selected server's own public origin
 * (`https://server.example`), so a `<video src>` hits the paired server directly
 * with native Range support — the relay proxy intentionally does NOT route the
 * `/media/:id/stream` byte-stream endpoint (it carries only JSON/browse traffic
 * and small HLS segments). Returns '' on the media server (where the page origin
 * already serves the bytes) or when no server / no reachable URL is selected, in
 * which case the caller falls back to {@link mediaApiBaseFor}. The origin is
 * normalised (trailing slashes trimmed) so concatenating a root-relative signed
 * path yields a clean URL. Pure for unit testing.
 */
export declare function mediaDirectBaseFor(app: 'server' | 'hub', currentServerUrl: string | null): string;
declare global {
    interface Window {
        __PHLIX__?: PhlixAppConfig;
    }
}
/**
 * Build the router route table from config. Exported from this module (but NOT
 * re-exported by `index.ts`, so it stays out of the public package API) so R6.1a
 * tests can assert the built-in pages are lazy `() => import()` route chunks.
 */
export declare function buildRoutes(config: PhlixAppConfig): RouteRecordRaw[];
export declare function createPhlixApp(config?: Partial<PhlixAppConfig>): VueApp;
