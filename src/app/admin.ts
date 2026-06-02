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
export function buildAdminRoutes(base = '/app'): RouteRecordRaw[] {
  const root = `${base}/admin`;
  return [
    {
      path: `${root}/dashboard`,
      name: 'admin-dashboard',
      component: () => import('../pages/admin/DashboardPage.vue'),
    },
    {
      path: `${root}/logs`,
      name: 'admin-logs',
      component: () => import('../pages/admin/LogsPage.vue'),
    },
  ];
}

/** Admin navigation entries, parented under an "Admin" group. */
export function adminMenu(base = '/app'): MenuItem[] {
  const root = `${base}/admin`;
  return [
    {
      id: 'admin',
      label: 'Admin',
      icon: 'settings',
      children: [
        { id: 'admin-dashboard', label: 'Dashboard', icon: 'speed', to: `${root}/dashboard` },
        { id: 'admin-logs', label: 'Logs', icon: 'list', to: `${root}/logs` },
      ],
    },
  ];
}
