/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { createApp, type App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import {
    createRouter,
    createWebHistory,
    type Router,
    type RouteRecordRaw,
    type RouteLocationNormalized,
    type RouteLocationRaw,
} from 'vue-router';
import PhlixApp from './PhlixApp.vue';
import Placeholder from './placeholder/Placeholder.vue';
// The 6 built-in route pages are lazy `() => import()` chunks (R6.1a), NOT static
// imports — so each splits out of the main bundle and loads on demand. PlayerPage in
// particular pulls the entire Player surface, so deferring it is the biggest win. They
// are also intentionally NOT re-exported from `index.ts` (same reason as the admin
// pages); a static re-export would re-merge them into the main chunk and defeat the
// split (Rollup's INEFFECTIVE_DYNAMIC_IMPORT warning).
import { computed } from 'vue';
import { setDefaultApiHeaders } from '../api/client';
import { applyStoredThemeEarly } from '../composables/useTheme';
import { installFocusable } from '../directives/focusable';
import { usePreferencesStore, hasStoredPreferences } from '../stores/usePreferencesStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useLibrariesStore } from '../stores/useLibrariesStore';
import { useServerStore } from '../stores/useServerStore';
import { useConnectionStore } from '../stores/useConnectionStore';
import { setAppName, setPageTitle } from '../composables/usePageTitle';
import { adminPageLabel } from './admin';
import { createTranslator, type Translate, type MessageKey } from '../i18n/messages';
import type { MenuItem, PhlixAppConfig } from './types';

/**
 * Route names reachable WITHOUT authentication. Everything else is gated by
 * {@link authGuard} — an unauthenticated visit redirects to `login`. A consumer
 * route can also opt out by setting `meta: { public: true }`.
 */
export const PUBLIC_ROUTE_NAMES: readonly string[] = ['login', 'signup', 'connect'];

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
export function authGuard(
    to: RouteLocationNormalized,
    isLoggedIn: boolean,
    isAdmin = false,
    home: RouteLocationRaw = { name: 'browse' },
): true | RouteLocationRaw {
    const name = typeof to.name === 'string' ? to.name : '';
    const isPublic = PUBLIC_ROUTE_NAMES.includes(name) || to.meta?.public === true;
    if (isPublic) {
        return true;
    }
    if (!isLoggedIn) {
        // Preserve where they were headed so the login flow can return there.
        return { name: 'login', query: to.fullPath ? { redirect: to.fullPath } : {} };
    }
    if (to.meta?.requiresAdmin === true && !isAdmin) {
        return home;
    }
    return true;
}

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
export function connectGuard(
    to: RouteLocationNormalized,
    requireConnection: boolean,
    hasBase: boolean,
): true | RouteLocationRaw | null {
    if (!requireConnection || hasBase) {
        return null;
    }
    if (to.name === 'connect') {
        return true;
    }
    return { name: 'connect', query: to.fullPath ? { redirect: to.fullPath } : {} };
}

/**
 * Route name of the hub's MCP personal-access-token manager (S243). Exported so
 * a consumer can `router.push({ name: MCP_TOKENS_ROUTE_NAME })` without
 * duplicating the string.
 */
export const MCP_TOKENS_ROUTE_NAME = 'mcp-tokens';

/** URL segment the MCP token manager mounts at, under the app's `routerBase`. */
export const MCP_TOKENS_ROUTE_PATH = 'mcp-tokens';

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
export function mcpTokensMenuItem(base = '/app'): MenuItem {
    return {
        id: MCP_TOKENS_ROUTE_NAME,
        label: 'MCP Tokens',
        icon: 'key',
        to: `${base}/${MCP_TOKENS_ROUTE_PATH}`,
    };
}

/** Route name of the generic per-library grid (`/app/library/:id`). */
const LIBRARY_ROUTE_NAME = 'library';
/** Route name of the dedicated music surface (`/app/music`). */
const MUSIC_ROUTE_NAME = 'music';
/** The `libraries.type` ENUM member the server uses for a music library. */
const MUSIC_LIBRARY_TYPE = 'music';

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
export function musicLibraryRedirect(
    to: RouteLocationNormalized,
    libraryType: string | null | undefined,
    hasMusicRoute = true,
): RouteLocationRaw | null {
    // Loop guard: never bounce the destination of this very redirect.
    if (to.name === MUSIC_ROUTE_NAME) {
        return null;
    }
    if (to.name !== LIBRARY_ROUTE_NAME) {
        return null;
    }
    if (!hasMusicRoute) {
        return null;
    }
    if (libraryType !== MUSIC_LIBRARY_TYPE) {
        return null;
    }
    return { name: MUSIC_ROUTE_NAME };
}

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
export function resolveRouteTitle(to: RouteLocationNormalized, t: Translate): string | null {
    const metaTitle = to.meta?.title;
    if (typeof metaTitle === 'string' && metaTitle) {
        return t(metaTitle as MessageKey);
    }
    const name = typeof to.name === 'string' ? to.name : '';
    const label = adminPageLabel(name);
    if (label) {
        return `Admin · ${label}`;
    }
    return null;
}

/**
 * Resolve the base for MEDIA browsing from the app kind + the host's own API base
 * + the currently selected server. On the hub with a server selected this is that
 * server's relay-proxy base (`{apiBase}/api/v1/servers/{id}/proxy`) so the shared
 * media pages fetch the paired server's API over the reverse tunnel; otherwise
 * (the media server, or the hub with no server selected) it is the host's own
 * base. Pure so it unit-tests without a live store/app; `createPhlixApp` wraps it
 * in a computed over {@link useServerStore}.
 */
export function mediaApiBaseFor(
    app: 'server' | 'hub',
    apiBase: string,
    currentServerId: string | null,
): string {
    if (app === 'hub' && currentServerId) {
        return `${apiBase}/api/v1/servers/${currentServerId}/proxy`;
    }
    return apiBase;
}

/**
 * Resolve the base the player streams media BYTES from directly (bypassing the
 * relay proxy). On the hub this is the selected server's own public origin
 * (`https://server.example`), so a `<video src>` hits the paired server directly
 * with native Range support. Returns '' on the media server (where the page
 * origin already serves the bytes) or when no server / no reachable URL is
 * selected, in which case the caller falls back to {@link mediaApiBaseFor} — the
 * relay proxy. The origin is normalised (trailing slashes trimmed) so
 * concatenating a root-relative signed path yields a clean URL. Pure for unit
 * testing.
 *
 * ## Direct is a PREFERENCE, not a requirement (S247)
 *
 * ⚠ This docblock used to say the relay proxy "intentionally does NOT route the
 * `/media/:id/stream` byte-stream endpoint" — while the very next lines fell
 * back to exactly that. The comment and the code disagreed, and the code was
 * right: `''` here means every caller's `directBase || apiBase` resolves to the
 * relay base. The claim was also factually wrong about the hub, which has
 * forwarded `/media/{id}/stream` since its first streaming release.
 *
 * S247 settled it deliberately: the byte stream IS relay-reachable, because a
 * server with no reachable public URL is precisely the population a relay
 * product exists to serve, and without it playback for that population is
 * simply dead. The hub admits it as an anchored `#^/media/[^/]+/stream$#`
 * (never a `/media` prefix), forwards `Range` verbatim and passes the `206` +
 * `Content-Range` back untouched, and answers a `HEAD` probe with the server's
 * real `Content-Length` and no body.
 *
 * Relay streaming is still the FALLBACK and must stay one: every byte then
 * traverses the hub, so the hub pays the bandwidth and the egress, and the
 * hub's per-user throttle and concurrent-stream cap apply. That is why the
 * `||` order in every caller is direct-first, and why it is pinned by tests
 * rather than left to convention.
 */
export function mediaDirectBaseFor(
    app: 'server' | 'hub',
    currentServerUrl: string | null,
): string {
    if (app !== 'hub' || currentServerUrl === null || currentServerUrl === '') {
        return '';
    }
    return currentServerUrl.replace(/\/+$/, '');
}

declare global {
    interface Window {
        __PHLIX__?: PhlixAppConfig;
    }
}

function readConfig(): PhlixAppConfig {
    if (typeof window !== 'undefined' && window.__PHLIX__) {
        return window.__PHLIX__;
    }
    return {
        app: 'server',
        apiBase: '',
        routerBase: '/app',
        menu: [],
        extraRoutes: [],
        features: {},
        deviceHeaders: {},
    };
}

/**
 * Build the router route table from config. Exported from this module (but NOT
 * re-exported by `index.ts`, so it stays out of the public package API) so R6.1a
 * tests can assert the built-in pages are lazy `() => import()` route chunks.
 */
export function buildRoutes(config: PhlixAppConfig): RouteRecordRaw[] {
    const base = config.routerBase || '/app';

    // `meta.title` carries the STATIC page title for each built-in route. Where a
    // translatable string already exists in the i18n catalog the value is that
    // message KEY (resolved through the consumer's translator in `afterEach`);
    // routes whose title is async data (media/library/player) carry no static
    // title — their page sets it via `usePageTitle`/`setPageTitle` once the item
    // or library name loads, and `afterEach` clears to the app-name-only default
    // until then. `catchall` likewise has no static title (the app name shows).
    const routes: RouteRecordRaw[] = [
        {
            path: base,
            name: 'browse',
            meta: { title: 'shell.browse' },
            component: () => import('../pages/BrowsePage.vue'),
        },
        {
            path: `${base}/media/:id`,
            name: 'media',
            component: () => import('../pages/MediaDetailPage.vue'),
        },
        {
            // Per-season page for a series (U3). `:season` is the season number
            // (Specials = 0). A static segment under `/media/:id`, so it ranks
            // above the bare `:id` detail route. Title is async (`<Series> ·
            // Season N`, set by the page), so no static `meta.title`.
            path: `${base}/media/:id/season/:season`,
            name: 'season',
            component: () => import('../pages/SeasonPage.vue'),
        },
        {
            // The dedicated per-library grid. A consumer's literal `/app/library/scan`
            // (registered via extraRoutes) still wins over this `:id` param — vue-router
            // ranks a static segment above a dynamic one regardless of registration order.
            path: `${base}/library/:id`,
            name: 'library',
            component: () => import('../pages/LibraryPage.vue'),
        },
        {
            // `meta.fullBleed` opts this route out of the shell chrome (S34): the
            // shell renders `.shell--flush` (header hidden + main padding zeroed) so
            // the in-window player owns the whole viewport — see PhlixApp.vue +
            // AppLayout.vue. The video still shows at 16:9/90vh until the in-player
            // "theater" toggle grows it to 100dvh; native OS fullscreen is separate.
            path: `${base}/player/:id`,
            name: 'player',
            meta: { fullBleed: true },
            component: () => import('../pages/PlayerPage.vue'),
        },
        {
            path: `${base}/login`,
            name: 'login',
            meta: { title: 'auth.loginTitle' },
            component: () => import('../pages/LoginPage.vue'),
        },
        {
            path: `${base}/signup`,
            name: 'signup',
            meta: { title: 'auth.signupTitle' },
            component: () => import('../pages/SignupPage.vue'),
        },
        {
            // First-run "connect to your server" screen for native clients with no
            // baked-in origin. Public (in PUBLIC_ROUTE_NAMES) + reached via the
            // connect-gate in `beforeEach` when `requireConnection` is set and no
            // base is resolved yet. A web-hosted server/hub never routes here.
            path: `${base}/connect`,
            name: 'connect',
            meta: { title: 'connect.title' },
            component: () => import('../pages/ConnectPage.vue'),
        },
        {
            path: `${base}/settings`,
            name: 'settings',
            meta: { title: 'settings.title' },
            component: () => import('../pages/SettingsPage.vue'),
        },
        {
            path: `${base}/explore`,
            name: 'explore',
            meta: { title: 'explore.title' },
            component: () => import('../pages/ExplorePage.vue'),
        },
        {
            path: `${base}/recommendations`,
            name: 'recommendations',
            meta: { title: 'recommendations.title' },
            component: () => import('../pages/RecommendationsPage.vue'),
        },
        {
            path: `${base}/history`,
            name: 'history',
            meta: { title: 'history.title' },
            component: () => import('../pages/WatchHistoryPage.vue'),
        },
        {
            path: `${base}/syncplay`,
            name: 'syncplay',
            meta: { title: 'syncplay.syncPlay' },
            component: () => import('../pages/SyncPlayPage.vue'),
        },
        {
            path: `${base}/music`,
            name: 'music',
            meta: { title: 'music.title' },
            component: () => import('../pages/MusicLibraryPage.vue'),
        },
        {
            path: `${base}/parental`,
            name: 'parental',
            meta: { title: 'parental.title' },
            component: () => import('../pages/ParentalControlsPage.vue'),
        },
    ];

    // S243 — the MCP personal-access-token manager. HUB-ONLY, and gated on
    // `config.app` rather than registered unconditionally: `/api/v1/me/mcp-tokens`
    // exists only on the hub (MCP is a hub surface — `phlix-hub`
    // `Application.php:497-519`), so on the media server this route could only
    // ever render a load error at a URL nothing links to. It is a per-USER page,
    // NOT an admin one: the endpoints are `/me/…` and are gated on
    // `$request->userId` alone, so putting it behind `meta.requiresAdmin` would
    // stop an ordinary hub user managing their own credentials.
    if (config.app === 'hub') {
        routes.push({
            path: `${base}/${MCP_TOKENS_ROUTE_PATH}`,
            name: MCP_TOKENS_ROUTE_NAME,
            // A literal, not an i18n key: `resolveRouteTitle` runs every
            // `meta.title` through `t()` and an unknown key echoes back unchanged.
            meta: { title: 'MCP Tokens' },
            component: () => import('../pages/McpTokensPage.vue'),
        });
    }

    if (config.extraRoutes) {
        routes.push(...config.extraRoutes);
    }

    routes.push({
        path: `${base}/:pathMatch(.*)*`,
        name: 'catchall',
        component: Placeholder,
        props: { appName: config.app },
    });

    return routes;
}

export function createPhlixApp(config?: Partial<PhlixAppConfig>): VueApp {
    const fullConfig: PhlixAppConfig = {
        ...readConfig(),
        ...config,
    };

    // Register the per-app device-identity headers (X-Phlix-Device-*) into the
    // shared ApiClient default-headers registry BEFORE any store/component
    // constructs a client — so every request (incl. the boot-time auth.init())
    // carries them. Native clients (Windows/Tizen) pass these via deviceHeaders.
    setDefaultApiHeaders(fullConfig.deviceHeaders ?? {});

    // Set <html> theme/density/accent + TV mode from persisted prefs before mount
    // → no flash. First-time visitors get the app's defaultTheme/defaultTv; a
    // stored choice always wins.
    applyStoredThemeEarly(fullConfig.defaultTheme, fullConfig.defaultTv);

    // Page-title suffix = the app's wordmark ("Phlix" by default). Set once at boot
    // so every `setPageTitle()` (the afterEach hook + the data-driven pages) uses
    // the same suffix without threading it through each call site.
    setAppName(fullConfig.branding?.wordmark);

    // Translator for STATIC route titles, built from the consumer's message
    // overrides. Pure data (no Vue context needed), so it resolves titles inside
    // the router hook below.
    const translate = createTranslator(fullConfig.messages);

    const pinia = createPinia();

    // Seed the per-app default theme + TV mode into the store for first-time
    // visitors only (a stored user choice always wins). Read once so a single
    // hasStoredPreferences() decides both.
    if (!hasStoredPreferences()) {
        const prefs = usePreferencesStore(pinia);
        if (fullConfig.defaultTheme) prefs.theme = fullConfig.defaultTheme;
        if (fullConfig.defaultTv !== undefined) prefs.tv = fullConfig.defaultTv;
    }

    // History base stays at '/'. Every route path AND every nav link already
    // carries the full `routerBase` prefix (see buildRoutes() and the `homePath`
    // computed in the shell/forms), so passing routerBase to createWebHistory too
    // would prepend it a SECOND time — turning /app/login into /app/app/login and
    // making a push('/app') ping-pong forever. Each host app serves the SPA under
    // `${routerBase}/*`, so booting at /app/… resolves cleanly against the prefixed
    // records with no base stripping.
    const router: Router = createRouter({
        history: createWebHistory(),
        routes: buildRoutes(fullConfig),
    });

    // Gate every non-public route on auth: an unauthenticated visit redirects to
    // login (so a failed/absent login can't "fall through" to the app shell —
    // e.g. the hub's `/` → `/app/servers` landing), and an admin-only route a
    // non-admin reaches is sent home. Pinia 3 resolves the store's
    // `inject('apiBase')` against this app's provides even from inside the guard.
    //
    // `auth.init()` validates a token restored from localStorage exactly once
    // before the first protected route resolves — without it a stale/expired token
    // would satisfy `isLoggedIn` (mere token presence) and render protected/admin
    // pages off an invalid session, and `user` would never be rehydrated (so the
    // account badge fell back to a generic "A"). It is memoised, so after the first
    // navigation this awaits an already-resolved promise.
    // The home a logged-in non-admin is bounced to from an admin-only route: the
    // hub points this at its servers list (`/app/servers`) so the bounce never
    // lands on the media-server Browse page (server-only endpoints 404 on the hub).
    // Defaults to the `browse` route (the media server's home).
    const home: RouteLocationRaw = fullConfig.home ? { path: fullConfig.home } : { name: 'browse' };

    // The runtime-chosen API base for a native client (no baked-in origin). A
    // web-hosted server/hub leaves this empty and falls back to `fullConfig.apiBase`
    // (its own origin). `configure()` lets the host shell mirror the chosen URL into
    // its own durable store (e.g. the Electron client's `setServerUrl`).
    const connection = useConnectionStore(pinia);
    connection.configure(fullConfig.onConnectionChange ?? null);

    /** The app's own API base: the runtime connection if set, else the seeded config base. */
    const effectiveBase = (): string => connection.apiBase || fullConfig.apiBase;

    // The base for MEDIA browsing (libraries/media/detail/player). On the media
    // server it is just the app's own base. On the hub it is the relay-proxy base
    // for the currently selected server — `/api/v1/servers/{id}/proxy` — so the
    // shared Browse/library/detail pages fetch that paired server's API over the
    // reverse tunnel (the proxy validates the user's Bearer + ownership, strips it,
    // and the server trusts the tunnel). It is a COMPUTED tracking useServerStore,
    // so picking a different server on My Servers re-points every media fetch
    // reactively. The host's own endpoints (auth/`/me`/admin) stay on `apiBase`.
    // Declared BEFORE `beforeEach` because the music-library gate below resolves
    // the library list against this same media base (a hub must ask the paired
    // server, not itself, what type a library is).
    const serverStore = useServerStore(pinia);
    const mediaApiBase = computed(() =>
        mediaApiBaseFor(fullConfig.app, effectiveBase(), serverStore.currentServerId),
    );

    // The base the player streams media BYTES from directly (bypassing the proxy):
    // on the hub it is the selected server's own public origin, so a `<video>` plays
    // the paired server's stream straight from the server with native Range; '' on
    // the media server (the page origin serves the bytes) or with no server selected.
    const mediaDirectBase = computed(() =>
        mediaDirectBaseFor(fullConfig.app, serverStore.currentServerUrl),
    );

    /**
     * S97 — route a MUSIC library to `/app/music` instead of the generic grid.
     * Runs INSIDE `beforeEach` (never on the page), so the wrong grid is never
     * painted and bounced; a visible flash of a flat artist+album+track dump is
     * the outcome this exists to prevent.
     *
     * The library `type` is not known synchronously on a deep link, so the list
     * is loaded first. `useLibrariesStore.load()` is idempotent and dedupes an
     * in-flight call, and `LibraryPage` loads the very same list on mount, so on
     * the SUCCESS path this adds at most ONE round trip per session, not one per
     * navigation: `loaded` latches true and every later gate run is a no-op.
     *
     * ⚠ On the FAILURE path the cost claim above does NOT hold. `load()` records
     * `error` and leaves `loaded` false, so while `/api/v1/libraries` is erroring
     * the gate retries: ONE failing request per `library` navigation (and
     * `LibraryPage` then issues its own, the in-flight dedupe having already
     * settled). That is the price of not caching a failure — one blip must not
     * leave a music library stuck on the generic grid for the rest of the session.
     *
     * `load()` never rejects (it records `error` internally) — the try/catch is
     * belt-and-braces, and every failure path falls through to the existing
     * behaviour via {@link musicLibraryRedirect} returning `null`.
     */
    async function musicLibraryGate(to: RouteLocationNormalized): Promise<true | RouteLocationRaw> {
        // Cheap exit for every other route: no store touch, no fetch.
        if (to.name !== LIBRARY_ROUTE_NAME) {
            return true;
        }
        const rawId = to.params.id;
        const id = Array.isArray(rawId) ? rawId[0] : rawId;
        if (!id) {
            return true; // no id → LibraryPage renders its own "Library not found".
        }
        const libraries = useLibrariesStore(pinia);
        if (!libraries.loaded) {
            try {
                await libraries.load(mediaApiBase.value);
            } catch {
                return true; // unknown type → existing behaviour, never a blank page.
            }
        }
        return (
            musicLibraryRedirect(to, libraries.byId(id)?.type, router.hasRoute(MUSIC_ROUTE_NAME)) ??
            true
        );
    }

    router.beforeEach(async (to) => {
        // Connect-gate (native clients only): until a base is resolved, force the
        // Connect screen and DON'T run auth.init() — there's no server to validate
        // a token against yet. A non-null return short-circuits before auth.init().
        const gate = connectGuard(to, fullConfig.requireConnection === true, effectiveBase() !== '');
        if (gate !== null) {
            return gate;
        }
        const auth = useAuthStore(pinia);

        // Admin routes require strict validation: await auth.init() to confirm
        // isAdmin before rendering. Non-admin routes resolve optimistically on
        // token presence and validate /auth/me in the background — if the token
        // is invalid, fetchUser clears it and the next navigation redirects.
        let allowed: true | RouteLocationRaw;
        if (to.meta?.requiresAdmin === true) {
            await auth.init();
            allowed = authGuard(to, auth.isLoggedIn, auth.isAdmin, home);
        } else if (auth.isLoggedIn === true) {
            // Non-admin route: token presence is sufficient to render immediately.
            // Start background validation (fire-and-forget); fetchUser() clears
            // tokens on failure, so the next navigation will see isLoggedIn=false
            // and redirect.
            auth.init(); // fire-and-forget background validation
            allowed = authGuard(to, true, false, home);
        } else {
            // No token — must validate to confirm (handles edge case where a
            // cleared token hasn't propagated to isLoggedIn yet via the reactive
            // update).
            await auth.init();
            allowed = authGuard(to, auth.isLoggedIn, auth.isAdmin, home);
        }
        if (allowed !== true) {
            return allowed;
        }

        // Only once the route is allowed: send a MUSIC library to `/app/music`
        // (S97). Ordering matters — an unauthenticated visitor must still be
        // bounced to login with the ORIGINAL destination preserved, and the
        // library list this needs is itself an authenticated fetch.
        return musicLibraryGate(to);
    });

    // Set the DEFAULT document title for every navigation from the route's static
    // `meta.title` (or admin label). Pages whose title is async-loaded content
    // (media/series/library/player) carry no static title and override this from
    // their own `usePageTitle(...)` once the item/library name resolves — and
    // because this runs on EVERY navigation, leaving such a page resets the title
    // to the next route's default (a stale media name never lingers). A route with
    // no resolvable title falls back to the bare app name (`setPageTitle(null)`).
    router.afterEach((to) => {
        setPageTitle(resolveRouteTitle(to, translate));
    });

    const app: VueApp = createApp(PhlixApp);
    // Provide `apiBase` as a COMPUTED (not the static config string) so a native
    // client's runtime connection choice re-points every consumer reactively.
    // `useApiBase` and the admin pages already accept `string | ComputedRef`.
    app.provide('apiBase', computed(() => effectiveBase()));
    app.provide('mediaApiBase', mediaApiBase);
    app.provide('mediaDirectBase', mediaDirectBase);
    // loginPath: the redirect target for logout. Uses config.routerBase when set
    // (e.g. '/app' → '/app/login' on the hub), falling back to '/login' for the
    // media server. Provided as a ComputedRef for API consistency with apiBase.
    app.provide('loginPath', computed(() => `${fullConfig.routerBase ?? '/app'}/login`));
    app.provide('phlixCommands', fullConfig.commands ?? []);
    app.provide('phlixConfig', fullConfig);
    app.use(pinia);
    // Provide auth store for components that use inject (e.g. SeriesSeasons).
    // Must be after app.use(pinia) so getActivePinia() resolves correctly.
    app.provide('auth', useAuthStore(pinia));
    app.use(router);

    // Register `v-focusable` globally so consumers get the spatial-nav directive
    // (used by TV mode's D-pad engine) without manual registration.
    installFocusable(app);

    return app;
}
