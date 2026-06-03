import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from './types';
/**
 * Admin routes + menu seam (RA — admin port).
 *
 * The server consumer mounts the ported admin pages by spreading `buildAdminRoutes()`
 * into its `PhlixAppConfig.extraRoutes` (the R1.5 config seam — no `if (app === …)`
 * in shared code). The pages nest under a single parent route that renders
 * {@link AdminLayout} (a sidebar of the admin links + a `<RouterView>`), so the
 * admin section gets its own navigation chrome without the host shell needing to
 * render a nested menu. Every page — and the layout itself — is a lazily-imported
 * chunk, so a consumer that never shows admin doesn't pay for it.
 *
 * Each child keeps its original `admin-*` route name and its full resolved URL
 * (`<base>/admin/<segment>`); only the record nesting changed. New ports append a
 * child here plus its `adminMenu` entry below.
 */
export declare function buildAdminRoutes(base?: string): RouteRecordRaw[];
/** Admin navigation entries, parented under an "Admin" group. Feeds the
 *  {@link AdminLayout} sidebar (and any consumer that renders a grouped menu). */
export declare function adminMenu(base?: string): MenuItem[];
