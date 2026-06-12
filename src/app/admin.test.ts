import { describe, it, expect } from 'vitest';
import { createRouter, createMemoryHistory, type RouteRecordRaw } from 'vue-router';
import {
  buildAdminRoutes,
  buildServerAdminRoutes,
  buildHubAdminRoutes,
  adminMenu,
  commonAdminPages,
  serverAdminPages,
  hubAdminPages,
  type AdminPage,
} from './admin';

/** name → URL segment under `<base>/admin/`. Locks every server page's name + URL
 *  in its historical sidebar order (the byte-identical server default). */
const SERVER_PAGES: ReadonlyArray<readonly [string, string]> = [
  ['admin-dashboard', 'dashboard'],
  ['admin-users', 'users'],
  ['admin-logs', 'logs'],
  ['admin-webhooks', 'webhooks'],
  ['admin-services', 'services'],
  ['admin-integrations', 'integrations'],
  ['admin-backup', 'backup'],
  ['admin-cast', 'cast-devices'],
  ['admin-dlna', 'dlna'],
  ['admin-remote-access', 'remote-access'],
  ['admin-livetv', 'livetv'],
  ['admin-collections', 'collections'],
  ['admin-history', 'history'],
  ['admin-syncplay', 'syncplay'],
  ['admin-libraries', 'libraries'],
  ['admin-plugins', 'plugins'],
  ['admin-settings', 'settings'],
];

/** name → URL segment for the hub admin set (Hub Dashboard, common, Audit Logs). */
const HUB_PAGES: ReadonlyArray<readonly [string, string]> = [
  ['admin-hub-dashboard', 'dashboard'],
  ['admin-users', 'users'],
  ['admin-logs', 'logs'],
  ['admin-settings', 'settings'],
  ['admin-audit-logs', 'audit-logs'],
];

function childrenOf(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return (routes[0].children ?? []) as RouteRecordRaw[];
}

/** The named (non-redirect) children of an admin route set, in order. */
function namedChildren(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return childrenOf(routes).filter((c) => c.name);
}

describe('buildAdminRoutes — nested AdminLayout shape (default = legacy server set)', () => {
  it('returns a single admin parent route rendering a lazily-loaded layout', () => {
    const routes = buildAdminRoutes();
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('/app/admin');
    expect(typeof routes[0].component).toBe('function'); // lazy AdminLayout chunk
  });

  it('passes the router base AND the page list to the layout as props', () => {
    const def = buildAdminRoutes()[0] as RouteRecordRaw & { props?: { base?: string; pages?: AdminPage[] } };
    expect(def.props?.base).toBe('/app');
    expect(def.props?.pages?.map((p) => p.name)).toEqual(SERVER_PAGES.map(([n]) => n));
    const portal = buildAdminRoutes('/portal')[0] as RouteRecordRaw & { props?: { base?: string } };
    expect(portal.path).toBe('/portal/admin');
    expect(portal.props?.base).toBe('/portal');
  });

  it('nests every server page as a relatively-pathed, named, lazily-imported child in legacy order', () => {
    const named = namedChildren(buildAdminRoutes());
    expect(named.map((c) => [c.name, c.path])).toEqual(SERVER_PAGES.map(([n, s]) => [n, s]));
    for (const c of named) {
      expect(typeof c.component, `child "${String(c.name)}" is a lazy loader`).toBe('function');
    }
  });

  it('keeps the dashboard first and redirects the bare /admin index to it', () => {
    const children = childrenOf(buildAdminRoutes());
    const index = children.find((c) => c.path === '');
    expect(index?.redirect).toEqual({ name: 'admin-dashboard' });
    expect(namedChildren(buildAdminRoutes())[0].name).toBe('admin-dashboard');
  });

  it('exposes exactly the 17 server pages (16 historical + Plugins, U6)', () => {
    expect(namedChildren(buildAdminRoutes())).toHaveLength(17);
  });

  it('buildServerAdminRoutes is the explicit synonym for the default', () => {
    const a = namedChildren(buildAdminRoutes()).map((c) => [c.name, c.path]);
    const b = namedChildren(buildServerAdminRoutes()).map((c) => [c.name, c.path]);
    expect(b).toEqual(a);
    expect(buildServerAdminRoutes('/portal')[0].path).toBe('/portal/admin');
  });

  it('marks the admin section parent route as admin-only (meta.requiresAdmin) so the router guard gates every child', () => {
    const meta = buildAdminRoutes()[0].meta as { requiresAdmin?: unknown } | undefined;
    expect(meta?.requiresAdmin).toBe(true);
    const hubMeta = buildHubAdminRoutes()[0].meta as { requiresAdmin?: unknown } | undefined;
    expect(hubMeta?.requiresAdmin).toBe(true);
  });
});

describe('buildAdminRoutes — resolved URLs + redirect (real router)', () => {
  function routerFor(base?: string) {
    return createRouter({ history: createMemoryHistory(), routes: buildAdminRoutes(base) });
  }

  it('resolves every server page name to its unchanged /app/admin/<segment> URL', () => {
    const router = routerFor();
    for (const [name, segment] of SERVER_PAGES) {
      expect(router.resolve({ name }).href).toBe(`/app/admin/${segment}`);
    }
  });

  it('redirects the bare /app/admin to the dashboard (navigation follows the redirect)', async () => {
    const router = routerFor();
    await router.push('/app/admin');
    expect(router.currentRoute.value.name).toBe('admin-dashboard');
  });

  it('honors a custom base in resolved URLs', async () => {
    const router = routerFor('/portal');
    expect(router.resolve({ name: 'admin-cast' }).href).toBe('/portal/admin/cast-devices');
    await router.push('/portal/admin');
    expect(router.currentRoute.value.name).toBe('admin-dashboard');
  });
});

describe('buildHubAdminRoutes — the hub admin set', () => {
  it('mounts exactly Hub Dashboard, Users, Logs, Settings, Audit Logs', () => {
    const named = namedChildren(buildHubAdminRoutes());
    expect(named.map((c) => [c.name, c.path])).toEqual(HUB_PAGES.map(([n, s]) => [n, s]));
  });

  it('passes the hub page list to the layout props', () => {
    const def = buildHubAdminRoutes()[0] as RouteRecordRaw & { props?: { pages?: AdminPage[] } };
    expect(def.props?.pages?.map((p) => p.name)).toEqual(HUB_PAGES.map(([n]) => n));
  });

  it('redirects the bare /app/admin to the hub dashboard (its first page)', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes: buildHubAdminRoutes() });
    await router.push('/app/admin');
    expect(router.currentRoute.value.name).toBe('admin-hub-dashboard');
  });

  it('resolves every hub page name to its /app/admin/<segment> URL', () => {
    const router = createRouter({ history: createMemoryHistory(), routes: buildHubAdminRoutes() });
    for (const [name, segment] of HUB_PAGES) {
      expect(router.resolve({ name }).href).toBe(`/app/admin/${segment}`);
    }
  });

  it('honors a custom base', () => {
    const router = createRouter({ history: createMemoryHistory(), routes: buildHubAdminRoutes('/portal') });
    expect(router.resolve({ name: 'admin-audit-logs' }).href).toBe('/portal/admin/audit-logs');
  });
});

describe('page-group registries', () => {
  it('commonAdminPages = Users, Logs, Settings', () => {
    expect(commonAdminPages.map((p) => p.name)).toEqual(['admin-users', 'admin-logs', 'admin-settings']);
  });

  it('serverAdminPages = the 14 media-server pages incl. Plugins (Dashboard first, no common pages)', () => {
    expect(serverAdminPages).toHaveLength(14);
    expect(serverAdminPages[0].name).toBe('admin-dashboard');
    const names = serverAdminPages.map((p) => p.name);
    expect(names).toContain('admin-plugins');
    expect(names).not.toContain('admin-users');
    expect(names).not.toContain('admin-logs');
    expect(names).not.toContain('admin-settings');
  });

  it('hubAdminPages = Hub Dashboard + Audit Logs', () => {
    expect(hubAdminPages.map((p) => p.name)).toEqual(['admin-hub-dashboard', 'admin-audit-logs']);
  });

  it('every page descriptor carries a name, segment, label, icon and a lazy loader', () => {
    for (const p of [...commonAdminPages, ...serverAdminPages, ...hubAdminPages]) {
      expect(p.name).toMatch(/^admin-/);
      expect(p.path.length).toBeGreaterThan(0);
      expect(p.label.length).toBeGreaterThan(0);
      expect(p.icon.length).toBeGreaterThan(0);
      expect(typeof p.component).toBe('function');
    }
  });

  it('default server set is the same pages as common ∪ server', () => {
    const defaultNames = new Set(namedChildren(buildAdminRoutes()).map((c) => c.name));
    const unionNames = new Set([...commonAdminPages, ...serverAdminPages].map((p) => p.name));
    expect(defaultNames).toEqual(unionNames);
  });
});

describe('adminMenu', () => {
  it('returns an Admin group whose children point at the (default) admin routes', () => {
    const [group] = adminMenu();
    expect(group.id).toBe('admin');
    expect(group.label).toBe('Admin');
    expect(group.children?.find((c) => c.id === 'admin-logs')?.to).toBe('/app/admin/logs');
  });

  it('honors a custom base in the child links', () => {
    const [group] = adminMenu('/portal');
    expect(group.children?.find((c) => c.id === 'admin-logs')?.to).toBe('/portal/admin/logs');
  });

  it('exposes a labelled, linked, icon-bearing child for every default admin page', () => {
    const [group] = adminMenu();
    const expected: Record<string, { label: string; to: string }> = {
      'admin-dashboard': { label: 'Dashboard', to: '/app/admin/dashboard' },
      'admin-users': { label: 'Users', to: '/app/admin/users' },
      'admin-logs': { label: 'Logs', to: '/app/admin/logs' },
      'admin-webhooks': { label: 'Webhooks', to: '/app/admin/webhooks' },
      'admin-services': { label: 'Services', to: '/app/admin/services' },
      'admin-integrations': { label: 'Integrations', to: '/app/admin/integrations' },
      'admin-backup': { label: 'Backup', to: '/app/admin/backup' },
      'admin-cast': { label: 'Cast Devices', to: '/app/admin/cast-devices' },
      'admin-dlna': { label: 'DLNA Server', to: '/app/admin/dlna' },
      'admin-remote-access': { label: 'Remote Access', to: '/app/admin/remote-access' },
      'admin-livetv': { label: 'Live TV / DVR', to: '/app/admin/livetv' },
      'admin-collections': { label: 'Collections', to: '/app/admin/collections' },
      'admin-history': { label: 'Watch History', to: '/app/admin/history' },
      'admin-syncplay': { label: 'SyncPlay', to: '/app/admin/syncplay' },
      'admin-libraries': { label: 'Libraries', to: '/app/admin/libraries' },
      'admin-plugins': { label: 'Plugins', to: '/app/admin/plugins' },
      'admin-settings': { label: 'Settings', to: '/app/admin/settings' },
    };
    for (const [id, { label, to }] of Object.entries(expected)) {
      const child = group.children?.find((c) => c.id === id);
      expect(child?.label, `${id} label`).toBe(label);
      expect(child?.to, `${id} link`).toBe(to);
      expect(child?.icon, `${id} has an icon`).toBeTruthy();
    }
  });

  it('exposes exactly the 17 default admin pages as children (incl. Plugins, U6)', () => {
    const [group] = adminMenu();
    expect(group.children).toHaveLength(17);
  });

  it('builds a menu from an arbitrary page set (the hub set)', () => {
    const [group] = adminMenu('/app', hubAdminPages);
    expect(group.children?.map((c) => c.id)).toEqual(['admin-hub-dashboard', 'admin-audit-logs']);
    expect(group.children?.find((c) => c.id === 'admin-hub-dashboard')?.to).toBe('/app/admin/dashboard');
  });
});
