/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from './types';
import type { IconName } from '../components/Icon.vue';

/**
 * Admin routes + menu seam (RA — admin port; H0 — composable page groups).
 *
 * The shared admin surface is an **opt-in, per-consumer** section: a host app
 * spreads `buildAdminRoutes()` (server) or `buildHubAdminRoutes()` (hub) into its
 * `PhlixAppConfig.extraRoutes`. The pages nest under a single parent route that
 * renders {@link AdminLayout} (a sidebar of the admin links + a `<RouterView>`),
 * so the admin section gets its own navigation chrome without the host shell
 * having to render a nested menu. Every page — and the layout itself — is a
 * lazily-imported chunk, so a consumer that never shows admin doesn't pay for it.
 *
 * **Page groups (H0).** Admin pages are exported as three registries so each app
 * mounts only the surfaces it has a backend for:
 * - {@link commonAdminPages} — portable to BOTH apps: Users, Logs, Settings.
 * - {@link serverAdminPages} — media-server-only: Dashboard, Webhooks, Services,
 *   Integrations, Backup, Cast Devices, DLNA, Remote Access, Live TV, Collections,
 *   History, SyncPlay, Libraries, Duplicates, Plugins.
 * - {@link hubAdminPages} — hub-only: Hub Dashboard, Audit Logs.
 *
 * `buildAdminRoutes(base)` with no `pages` argument yields the **server pages in
 * their original sidebar order** (Dashboard first), so the server's admin landing
 * page and sidebar ordering are unchanged (U6 adds Plugins after Libraries).
 * `buildServerAdminRoutes` is the explicit synonym for that default;
 * `buildHubAdminRoutes` mounts the hub set (Hub Dashboard, Users, Logs, Settings,
 * Audit Logs). Each child keeps a stable `admin-*` route name and resolves to
 * `<base>/admin/<segment>`.
 */
export interface AdminPage {
  /** Route name (and menu-item id), e.g. `admin-users`. Stable across releases. */
  name: string;
  /** URL segment under `<base>/admin/`, e.g. `users`. Relative (no leading slash). */
  path: string;
  /** Sidebar / menu label. */
  label: string;
  /** Sidebar / menu icon. */
  icon: IconName;
  /** Lazy component loader — keeps each page in its own split chunk. */
  component: () => Promise<unknown>;
}

// ---------------------------------------------------------------------------
// Page descriptors — the single source of truth for every admin page. The
// group arrays + the legacy default below are assembled from these, so a page's
// name/segment/label/icon/loader live in exactly one place.
// ---------------------------------------------------------------------------

const dashboardPage: AdminPage = {
  name: 'admin-dashboard',
  path: 'dashboard',
  label: 'Dashboard',
  icon: 'speed',
  component: () => import('../pages/admin/DashboardPage.vue'),
};
const usersPage: AdminPage = {
  name: 'admin-users',
  path: 'users',
  label: 'Users',
  icon: 'user',
  component: () => import('../pages/admin/UsersPage.vue'),
};
const logsPage: AdminPage = {
  name: 'admin-logs',
  path: 'logs',
  label: 'Logs',
  icon: 'list',
  component: () => import('../pages/admin/LogsPage.vue'),
};
const webhooksPage: AdminPage = {
  name: 'admin-webhooks',
  path: 'webhooks',
  label: 'Webhooks',
  icon: 'settings',
  component: () => import('../pages/admin/WebhooksPage.vue'),
};
const servicesPage: AdminPage = {
  name: 'admin-services',
  path: 'services',
  label: 'Services',
  icon: 'star',
  component: () => import('../pages/admin/ServicesPage.vue'),
};
const integrationsPage: AdminPage = {
  name: 'admin-integrations',
  path: 'integrations',
  label: 'Integrations',
  icon: 'settings',
  component: () => import('../pages/admin/IntegrationsPage.vue'),
};
const backupPage: AdminPage = {
  name: 'admin-backup',
  path: 'backup',
  label: 'Backup',
  icon: 'bookmark',
  component: () => import('../pages/admin/BackupPage.vue'),
};
const castPage: AdminPage = {
  name: 'admin-cast',
  path: 'cast-devices',
  label: 'Cast Devices',
  icon: 'cast',
  component: () => import('../pages/admin/CastDevicesPage.vue'),
};
const dlnaPage: AdminPage = {
  name: 'admin-dlna',
  path: 'dlna',
  label: 'DLNA Server',
  icon: 'monitor',
  component: () => import('../pages/admin/DlnaServerPage.vue'),
};
const remoteAccessPage: AdminPage = {
  name: 'admin-remote-access',
  path: 'remote-access',
  label: 'Remote Access',
  icon: 'expand',
  component: () => import('../pages/admin/RemoteAccessPage.vue'),
};
const livetvPage: AdminPage = {
  name: 'admin-livetv',
  path: 'livetv',
  label: 'Live TV / DVR',
  icon: 'tv',
  component: () => import('../pages/admin/LiveTvPage.vue'),
};
const collectionsPage: AdminPage = {
  name: 'admin-collections',
  path: 'collections',
  label: 'Collections',
  icon: 'list',
  component: () => import('../pages/admin/CollectionsPage.vue'),
};
const historyPage: AdminPage = {
  name: 'admin-history',
  path: 'history',
  label: 'Watch History',
  icon: 'film',
  component: () => import('../pages/admin/HistoryPage.vue'),
};
const syncplayPage: AdminPage = {
  name: 'admin-syncplay',
  path: 'syncplay',
  label: 'SyncPlay',
  icon: 'play',
  component: () => import('../pages/admin/SyncPlayPage.vue'),
};
const librariesPage: AdminPage = {
  name: 'admin-libraries',
  path: 'libraries',
  label: 'Libraries',
  icon: 'image',
  component: () => import('../pages/admin/LibrariesPage.vue'),
};
const duplicatesPage: AdminPage = {
  name: 'admin-duplicates',
  path: 'duplicates',
  label: 'Duplicates',
  icon: 'filter',
  component: () => import('../pages/admin/DuplicatesPage.vue'),
};
const pluginsPage: AdminPage = {
  name: 'admin-plugins',
  path: 'plugins',
  label: 'Plugins',
  icon: 'settings',
  component: () => import('../pages/admin/PluginsPage.vue'),
};
const settingsPage: AdminPage = {
  name: 'admin-settings',
  path: 'settings',
  label: 'Settings',
  icon: 'settings',
  component: () => import('../pages/admin/SettingsPage.vue'),
};
const hubDashboardPage: AdminPage = {
  name: 'admin-hub-dashboard',
  path: 'dashboard',
  label: 'Dashboard',
  icon: 'speed',
  component: () => import('../pages/admin/HubDashboardPage.vue'),
};
const metricsPage: AdminPage = {
  name: 'admin-metrics',
  path: 'metrics',
  label: 'Server Traffic',
  icon: 'speed',
  component: () => import('../pages/admin/MetricsPage.vue'),
};
const auditLogsPage: AdminPage = {
  name: 'admin-audit-logs',
  path: 'audit-logs',
  label: 'Audit Logs',
  icon: 'eye',
  component: () => import('../pages/AuditLogsPage.vue'),
};

/**
 * Every admin page descriptor, keyed by route name → label. The single source
 * for resolving an `admin-*` route's human label (used by the page-title hook,
 * U1, to build `Admin · <label> · Phlix`). Built from the same descriptors the
 * route/menu builders use, so labels never drift. Both `dashboard` variants
 * (server `admin-dashboard`, hub `admin-hub-dashboard`) are included.
 */
const ALL_ADMIN_PAGES: AdminPage[] = [
  dashboardPage,
  metricsPage,
  usersPage,
  logsPage,
  webhooksPage,
  servicesPage,
  integrationsPage,
  backupPage,
  castPage,
  dlnaPage,
  remoteAccessPage,
  livetvPage,
  collectionsPage,
  historyPage,
  syncplayPage,
  librariesPage,
  duplicatesPage,
  pluginsPage,
  settingsPage,
  hubDashboardPage,
  auditLogsPage,
];

const ADMIN_LABELS: Readonly<Record<string, string>> = Object.fromEntries(
  ALL_ADMIN_PAGES.map((page) => [page.name, page.label]),
);

/**
 * Resolve the sidebar label for an `admin-*` route name (e.g. `admin-users` →
 * `Users`), or `null` when the name is not a known admin page. Lets the page-
 * title hook reuse the canonical labels rather than re-deriving them.
 */
export function adminPageLabel(name: string | null | undefined): string | null {
  return name ? ADMIN_LABELS[name] ?? null : null;
}

/** Admin pages portable to BOTH apps (they hit endpoints both backends serve). */
export const commonAdminPages: AdminPage[] = [usersPage, logsPage, settingsPage];

/** Media-server-only admin pages (the surfaces that depend on a media backend). */
export const serverAdminPages: AdminPage[] = [
  dashboardPage,
  metricsPage,
  webhooksPage,
  servicesPage,
  integrationsPage,
  backupPage,
  castPage,
  dlnaPage,
  remoteAccessPage,
  livetvPage,
  collectionsPage,
  historyPage,
  syncplayPage,
  librariesPage,
  duplicatesPage,
  pluginsPage,
];

/** Hub-only admin pages: a hub-scoped dashboard + the re-homed audit log. */
export const hubAdminPages: AdminPage[] = [hubDashboardPage, metricsPage, auditLogsPage];

/**
 * The server's full page set in its original sidebar order. Used as the default
 * for {@link buildAdminRoutes}/{@link adminMenu} so the server admin console —
 * its landing page (Dashboard) and sidebar ordering — stays stable (U6 appends
 * Plugins after Libraries). It is the same set as
 * `[...commonAdminPages, ...serverAdminPages]` (Dashboard + the media pages +
 * Users/Logs/Settings), re-interleaved to preserve the legacy order.
 */
const defaultAdminPages: AdminPage[] = [
  dashboardPage,
  metricsPage,
  usersPage,
  logsPage,
  webhooksPage,
  servicesPage,
  integrationsPage,
  backupPage,
  castPage,
  dlnaPage,
  remoteAccessPage,
  livetvPage,
  collectionsPage,
  historyPage,
  syncplayPage,
  librariesPage,
  duplicatesPage,
  pluginsPage,
  settingsPage,
];

/** The hub admin set: Hub Dashboard (landing), the common pages, then Audit Logs. */
const hubAdminSet: AdminPage[] = [hubDashboardPage, metricsPage, ...commonAdminPages, auditLogsPage];

/**
 * Build the nested admin route record for a consumer's `extraRoutes`.
 *
 * @param base  Router base prefix every page lives under (default `/app`).
 * @param pages Ordered admin pages to mount (default = the legacy server set,
 *   keeping the server byte-identical). The bare `<base>/admin` index redirects
 *   to the first page in this list (the dashboard for both shipped apps).
 */
export function buildAdminRoutes(base = '/app', pages: AdminPage[] = defaultAdminPages): RouteRecordRaw[] {
  const root = `${base}/admin`;
  const children: RouteRecordRaw[] = pages.map((page) => ({
    path: page.path,
    name: page.name,
    component: page.component,
  }));
  // Bare `<base>/admin` → the first page (Dashboard in both shipped apps).
  if (pages.length > 0) {
    children.unshift({ path: '', redirect: { name: pages[0].name } });
  }
  return [
    {
      path: root,
      // The whole admin section is admin-only. vue-router merges parent `meta`
      // onto every child, so this gates each `/app/admin/*` page via the router
      // guard (`authGuard` redirects a non-admin away). The nav-link filter in the
      // shell is only progressive disclosure; this is the actual client-side gate
      // (the back end authorizes regardless).
      meta: { requiresAdmin: true },
      // Lazy section shell: sidebar + <RouterView>. `base`/`pages` props let the
      // sidebar build its links for whatever router base + page set the host uses.
      component: () => import('./AdminLayout.vue'),
      props: { base, pages },
      children,
    },
  ];
}

/** Server admin routes — the canonical default page set in the legacy sidebar order
 *  (explicit synonym for {@link buildAdminRoutes} with no `pages`). */
export function buildServerAdminRoutes(base = '/app'): RouteRecordRaw[] {
  return buildAdminRoutes(base, defaultAdminPages);
}

/** Hub admin routes — Hub Dashboard (landing), Users, Logs, Settings, Audit Logs. */
export function buildHubAdminRoutes(base = '/app'): RouteRecordRaw[] {
  return buildAdminRoutes(base, hubAdminSet);
}

/** Admin navigation entries, parented under an "Admin" group. Feeds any consumer
 *  that renders a grouped menu (the {@link AdminLayout} sidebar builds its links
 *  directly from the page list it is handed). `pages` defaults to the legacy
 *  server set so existing callers are unaffected. */
export function adminMenu(base = '/app', pages: AdminPage[] = defaultAdminPages): MenuItem[] {
  const root = `${base}/admin`;
  return [
    {
      id: 'admin',
      label: 'Admin',
      icon: 'settings',
      children: pages.map((page) => ({
        id: page.name,
        label: page.label,
        icon: page.icon,
        to: `${root}/${page.path}`,
      })),
    },
  ];
}
