import type { RouteRecordRaw } from 'vue-router';
export interface MenuItem {
    id: string;
    label: string;
    icon?: string;
    to?: string;
    href?: string;
    children?: MenuItem[];
}
export interface PhlixAppConfig {
    app: 'server' | 'hub';
    apiBase: string;
    routerBase?: string;
    menu?: MenuItem[];
    extraRoutes?: RouteRecordRaw[];
    features?: Record<string, boolean>;
}
