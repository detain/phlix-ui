/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
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
/**
 * Resolve the sidebar label for an `admin-*` route name (e.g. `admin-users` →
 * `Users`), or `null` when the name is not a known admin page. Lets the page-
 * title hook reuse the canonical labels rather than re-deriving them.
 */
export declare function adminPageLabel(name: string | null | undefined): string | null;
/** Admin pages portable to BOTH apps (they hit endpoints both backends serve). */
export declare const commonAdminPages: AdminPage[];
/** Media-server-only admin pages (the surfaces that depend on a media backend). */
export declare const serverAdminPages: AdminPage[];
/** Hub-only admin pages: a hub-scoped dashboard + the re-homed audit log. */
export declare const hubAdminPages: AdminPage[];
/**
 * Build the nested admin route record for a consumer's `extraRoutes`.
 *
 * @param base  Router base prefix every page lives under (default `/app`).
 * @param pages Ordered admin pages to mount (default = the legacy server set,
 *   keeping the server byte-identical). The bare `<base>/admin` index redirects
 *   to the first page in this list (the dashboard for both shipped apps).
 */
export declare function buildAdminRoutes(base?: string, pages?: AdminPage[]): RouteRecordRaw[];
/** Server admin routes — the canonical default page set in the legacy sidebar order
 *  (explicit synonym for {@link buildAdminRoutes} with no `pages`). */
export declare function buildServerAdminRoutes(base?: string): RouteRecordRaw[];
/** Hub admin routes — Hub Dashboard (landing), Users, Logs, Settings, Audit Logs. */
export declare function buildHubAdminRoutes(base?: string): RouteRecordRaw[];
/** Admin navigation entries, parented under an "Admin" group. Feeds any consumer
 *  that renders a grouped menu (the {@link AdminLayout} sidebar builds its links
 *  directly from the page list it is handed). `pages` defaults to the legacy
 *  server set so existing callers are unaffected. */
export declare function adminMenu(base?: string, pages?: AdminPage[]): MenuItem[];
