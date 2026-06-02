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
      path: `${root}/users`,
      name: 'admin-users',
      component: () => import('../pages/admin/UsersPage.vue'),
    },
    {
      path: `${root}/logs`,
      name: 'admin-logs',
      component: () => import('../pages/admin/LogsPage.vue'),
    },
    {
      path: `${root}/webhooks`,
      name: 'admin-webhooks',
      component: () => import('../pages/admin/WebhooksPage.vue'),
    },
    {
      path: `${root}/services`,
      name: 'admin-services',
      component: () => import('../pages/admin/ServicesPage.vue'),
    },
    {
      path: `${root}/integrations`,
      name: 'admin-integrations',
      component: () => import('../pages/admin/IntegrationsPage.vue'),
    },
    {
      path: `${root}/backup`,
      name: 'admin-backup',
      component: () => import('../pages/admin/BackupPage.vue'),
    },
    {
      path: `${root}/cast-devices`,
      name: 'admin-cast',
      component: () => import('../pages/admin/CastDevicesPage.vue'),
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
        { id: 'admin-users', label: 'Users', icon: 'user', to: `${root}/users` },
        { id: 'admin-logs', label: 'Logs', icon: 'list', to: `${root}/logs` },
        { id: 'admin-webhooks', label: 'Webhooks', icon: 'settings', to: `${root}/webhooks` },
        { id: 'admin-services', label: 'Services', icon: 'star', to: `${root}/services` },
        { id: 'admin-integrations', label: 'Integrations', icon: 'settings', to: `${root}/integrations` },
        { id: 'admin-backup', label: 'Backup', icon: 'bookmark', to: `${root}/backup` },
        { id: 'admin-cast', label: 'Cast Devices', icon: 'cast', to: `${root}/cast-devices` },
      ],
    },
  ];
}
