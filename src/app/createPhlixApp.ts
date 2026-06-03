import { createApp, type App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router';
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
import type { PhlixAppConfig } from './types';

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

    const app: VueApp = createApp(PhlixApp);
    app.provide('apiBase', fullConfig.apiBase);
    app.provide('phlixCommands', fullConfig.commands ?? []);
    app.provide('phlixConfig', fullConfig);
    app.use(pinia);
    app.use(router);

    return app;
}
