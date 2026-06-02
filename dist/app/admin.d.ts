import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from './types';
/**
 * Admin routes + menu seam (RA — admin port).
 *
 * The server consumer mounts the ported admin pages by spreading these into its
 * `PhlixAppConfig.extraRoutes` / `menu` (the R1.5 config seam — no `if (app === …)`
 * in shared code). Each page is a lazily-imported chunk so a consumer that never
 * shows admin doesn't pay for it. New ports append their route + menu entry here.
 */
export declare function buildAdminRoutes(base?: string): RouteRecordRaw[];
/** Admin navigation entries, parented under an "Admin" group. */
export declare function adminMenu(base?: string): MenuItem[];
