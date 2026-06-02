import { createApp, type App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router';
import PhlixApp from './PhlixApp.vue';
import Placeholder from './placeholder/Placeholder.vue';
import BrowsePage from '../pages/BrowsePage.vue';
import MediaDetailPage from '../pages/MediaDetailPage.vue';
import PlayerPage from '../pages/PlayerPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignupPage from '../pages/SignupPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';
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

function buildRoutes(config: PhlixAppConfig): RouteRecordRaw[] {
    const base = config.routerBase || '/app';

    const routes: RouteRecordRaw[] = [
        {
            path: `${base}/`,
            redirect: base,
        },
        {
            path: base,
            name: 'browse',
            component: BrowsePage,
        },
        {
            path: `${base}/media/:id`,
            name: 'media',
            component: MediaDetailPage,
        },
        {
            path: `${base}/player/:id`,
            name: 'player',
            component: PlayerPage,
        },
        {
            path: `${base}/login`,
            name: 'login',
            component: LoginPage,
        },
        {
            path: `${base}/signup`,
            name: 'signup',
            component: SignupPage,
        },
        {
            path: `${base}/settings`,
            name: 'settings',
            component: SettingsPage,
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

    const routerBase = fullConfig.routerBase || '/app';
    const router: Router = createRouter({
        history: createWebHistory(routerBase),
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
