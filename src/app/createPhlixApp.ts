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
import { applyStoredThemeEarly } from '../composables/useTheme';
import { usePreferencesStore, hasStoredPreferences } from '../stores/usePreferencesStore';
import { useAuthStore } from '../stores/useAuthStore';
import type { PhlixAppConfig } from './types';

/**
 * Route names reachable WITHOUT authentication. Everything else is gated by
 * {@link authGuard} — an unauthenticated visit redirects to `login`. A consumer
 * route can also opt out by setting `meta: { public: true }`.
 */
export const PUBLIC_ROUTE_NAMES: readonly string[] = ['login', 'signup'];

/**
 * Navigation guard. Pure (the auth state is passed in) so it unit-tests without a
 * live router/store. Returns `true` to allow, or a redirect location.
 *
 * - Public routes (`login`/`signup` or `meta.public`) always pass.
 * - An unauthenticated visit to any other route redirects to `login` (preserving
 *   the intended destination so the login flow can return there).
 * - An admin-only route (`meta.requiresAdmin`, set on the whole `/app/admin/*`
 *   section and inherited by every child) requires `isAdmin`. A logged-in
 *   non-admin is sent to `browse` — NOT to `login`: they are already
 *   authenticated, so bouncing them to login would just loop back here after a
 *   successful re-auth. (The server API authorizes regardless; this stops the
 *   admin UI from rendering for a non-admin or an unvalidated session.)
 */
export function authGuard(
    to: RouteLocationNormalized,
    isLoggedIn: boolean,
    isAdmin = false,
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
        return { name: 'browse' };
    }
    return true;
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
    };
}

/**
 * Build the router route table from config. Exported from this module (but NOT
 * re-exported by `index.ts`, so it stays out of the public package API) so R6.1a
 * tests can assert the built-in pages are lazy `() => import()` route chunks.
 */
export function buildRoutes(config: PhlixAppConfig): RouteRecordRaw[] {
    const base = config.routerBase || '/app';

    const routes: RouteRecordRaw[] = [
        {
            path: base,
            name: 'browse',
            component: () => import('../pages/BrowsePage.vue'),
        },
        {
            path: `${base}/media/:id`,
            name: 'media',
            component: () => import('../pages/MediaDetailPage.vue'),
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
            path: `${base}/player/:id`,
            name: 'player',
            component: () => import('../pages/PlayerPage.vue'),
        },
        {
            path: `${base}/login`,
            name: 'login',
            component: () => import('../pages/LoginPage.vue'),
        },
        {
            path: `${base}/signup`,
            name: 'signup',
            component: () => import('../pages/SignupPage.vue'),
        },
        {
            path: `${base}/settings`,
            name: 'settings',
            component: () => import('../pages/SettingsPage.vue'),
        },
    ];

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

    // Set <html> theme/density/accent from persisted prefs before mount → no flash.
    // First-time visitors get the app's defaultTheme; a stored choice always wins.
    applyStoredThemeEarly(fullConfig.defaultTheme);

    const pinia = createPinia();

    // Seed the per-app default theme into the store for first-time visitors only.
    if (fullConfig.defaultTheme && !hasStoredPreferences()) {
        usePreferencesStore(pinia).theme = fullConfig.defaultTheme;
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
    router.beforeEach(async (to) => {
        const auth = useAuthStore(pinia);
        await auth.init();
        return authGuard(to, auth.isLoggedIn, auth.isAdmin);
    });

    const app: VueApp = createApp(PhlixApp);
    app.provide('apiBase', fullConfig.apiBase);
    app.provide('phlixCommands', fullConfig.commands ?? []);
    app.provide('phlixConfig', fullConfig);
    app.use(pinia);
    app.use(router);

    return app;
}
