import type { RouteRecordRaw } from 'vue-router';
import type { Command } from '../stores/useCommandStore';

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
    /** App-injected ⌘K command-palette commands (R1.4). Registered alongside the
     *  built-ins by `createPhlixApp` (provided under the `phlixCommands` key). */
    commands?: Command[];
}
