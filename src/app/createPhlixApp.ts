import { createApp, type App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router';
import PhlixApp from './PhlixApp.vue';
import Placeholder from './placeholder/Placeholder.vue';
import BrowsePage from '../pages/BrowsePage.vue';
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

    const pinia = createPinia();
    const routerBase = fullConfig.routerBase || '/app';
    const router: Router = createRouter({
        history: createWebHistory(routerBase),
        routes: buildRoutes(fullConfig),
    });

    const app: VueApp = createApp(PhlixApp);
    app.provide('apiBase', fullConfig.apiBase);
    app.use(pinia);
    app.use(router);

    return app;
}
