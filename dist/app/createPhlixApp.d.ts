/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type App as VueApp } from 'vue';
import { type RouteRecordRaw, type RouteLocationNormalized, type RouteLocationRaw } from 'vue-router';
import { type Translate } from '../i18n/messages';
import type { MenuItem, PhlixAppConfig } from './types';
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
 * Route name of the hub's MCP personal-access-token manager (S243). Exported so
 * a consumer can `router.push({ name: MCP_TOKENS_ROUTE_NAME })` without
 * duplicating the string.
 */
export declare const MCP_TOKENS_ROUTE_NAME = "mcp-tokens";
/** URL segment the MCP token manager mounts at, under the app's `routerBase`. */
export declare const MCP_TOKENS_ROUTE_PATH = "mcp-tokens";
/**
 * The nav entry for the MCP token manager (S243).
 *
 * Menus are entirely consumer-owned in this library — `PhlixAppConfig.menu` is
 * supplied by each host's `main.ts` and there is no default — so phlix-ui cannot
 * add a hub nav item on its own. This builder is the seam that keeps the LABEL,
 * ICON and PATH here (one source of truth, exactly as `adminMenu()` does for the
 * admin section) while the host contributes the single line that mounts it:
 *
 * ```ts
 * menu: [ …, mcpTokensMenuItem() ],
 * ```
 *
 * The ROUTE itself needs no host change — `buildRoutes` registers it for every
 * `app: 'hub'` consumer.
 *
 * @param base Router base prefix the app mounts under (default `/app`).
 */
export declare function mcpTokensMenuItem(base?: string): MenuItem;
/**
 * S97 — a library whose `type` is `music` must NOT render the generic
 * per-library grid; it belongs on the dedicated music surface (`/app/music`).
 *
 * Why: `/app/library/:id` lists `media_items` flat, so a music library dumps
 * `artist` + `album` + `track` rows into one grid, sorted by a JSON path that is
 * NULL for all of them. `/app/music` reads the `music_*` tables directly (the
 * authoritative hierarchy per S97's option-B verdict) and already pages
 * artists/albums/tracks, so sending music libraries there leaves exactly ONE
 * music browse surface to keep in sync rather than two.
 *
 * Pure (the resolved type and the route-table fact are passed in) so it unit
 * tests without a live router/store. Returns the redirect location, or `null`
 * meaning "fall through to the EXISTING behaviour" — which is what an unknown,
 * not-yet-loaded or failed type lookup must do, so a lookup failure can never
 * produce a blank page.
 *
 * Loop safety is asserted here rather than left to construction: the guard fires
 * ONLY on the `library` route and never on its own destination (`music`), so the
 * redirect cannot re-enter itself. Both halves are pinned by tests.
 *
 * `hasMusicRoute` lets the caller pass `router.hasRoute('music')`: a consumer
 * that rebuilt/pruned the route table without the music page keeps the generic
 * grid instead of being pushed at a route that does not exist.
 *
 * Scope: today the server has a single music library, so the global `/app/music`
 * loses no scoping in practice. If a second one is ever added, this is where a
 * per-library music surface would be selected.
 */
export declare function musicLibraryRedirect(to: RouteLocationNormalized, libraryType: string | null | undefined, hasMusicRoute?: boolean): RouteLocationRaw | null;
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
