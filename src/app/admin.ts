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
export function buildAdminRoutes(base = '/app'): RouteRecordRaw[] {
  const root = `${base}/admin`;
  return [
    {
      path: root,
      // Lazy section shell: sidebar + <RouterView>. The `base` prop lets the sidebar
      // build its links for whatever router base the host app uses.
      component: () => import('./AdminLayout.vue'),
      props: { base },
      children: [
        // Bare `<base>/admin` → the dashboard.
        { path: '', redirect: { name: 'admin-dashboard' } },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../pages/admin/DashboardPage.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../pages/admin/UsersPage.vue'),
        },
        {
          path: 'logs',
          name: 'admin-logs',
          component: () => import('../pages/admin/LogsPage.vue'),
        },
        {
          path: 'webhooks',
          name: 'admin-webhooks',
          component: () => import('../pages/admin/WebhooksPage.vue'),
        },
        {
          path: 'services',
          name: 'admin-services',
          component: () => import('../pages/admin/ServicesPage.vue'),
        },
        {
          path: 'integrations',
          name: 'admin-integrations',
          component: () => import('../pages/admin/IntegrationsPage.vue'),
        },
        {
          path: 'backup',
          name: 'admin-backup',
          component: () => import('../pages/admin/BackupPage.vue'),
        },
        {
          path: 'cast-devices',
          name: 'admin-cast',
          component: () => import('../pages/admin/CastDevicesPage.vue'),
        },
        {
          path: 'dlna',
          name: 'admin-dlna',
          component: () => import('../pages/admin/DlnaServerPage.vue'),
        },
        {
          path: 'remote-access',
          name: 'admin-remote-access',
          component: () => import('../pages/admin/RemoteAccessPage.vue'),
        },
        {
          path: 'livetv',
          name: 'admin-livetv',
          component: () => import('../pages/admin/LiveTvPage.vue'),
        },
        {
          path: 'collections',
          name: 'admin-collections',
          component: () => import('../pages/admin/CollectionsPage.vue'),
        },
        {
          path: 'history',
          name: 'admin-history',
          component: () => import('../pages/admin/HistoryPage.vue'),
        },
        {
          path: 'syncplay',
          name: 'admin-syncplay',
          component: () => import('../pages/admin/SyncPlayPage.vue'),
        },
        {
          path: 'libraries',
          name: 'admin-libraries',
          component: () => import('../pages/admin/LibrariesPage.vue'),
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../pages/admin/SettingsPage.vue'),
        },
      ],
    },
  ];
}

/** Admin navigation entries, parented under an "Admin" group. Feeds the
 *  {@link AdminLayout} sidebar (and any consumer that renders a grouped menu). */
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
        { id: 'admin-dlna', label: 'DLNA Server', icon: 'monitor', to: `${root}/dlna` },
        { id: 'admin-remote-access', label: 'Remote Access', icon: 'expand', to: `${root}/remote-access` },
        { id: 'admin-livetv', label: 'Live TV / DVR', icon: 'tv', to: `${root}/livetv` },
        { id: 'admin-collections', label: 'Collections', icon: 'list', to: `${root}/collections` },
        { id: 'admin-history', label: 'Watch History', icon: 'film', to: `${root}/history` },
        { id: 'admin-syncplay', label: 'SyncPlay', icon: 'play', to: `${root}/syncplay` },
        { id: 'admin-libraries', label: 'Libraries', icon: 'image', to: `${root}/libraries` },
        { id: 'admin-settings', label: 'Settings', icon: 'settings', to: `${root}/settings` },
      ],
    },
  ];
}
