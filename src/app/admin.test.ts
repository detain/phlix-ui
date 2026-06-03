import { describe, it, expect } from 'vitest';
import { createRouter, createMemoryHistory, type RouteRecordRaw } from 'vue-router';
import { buildAdminRoutes, adminMenu } from './admin';

/** name → URL segment under `<base>/admin/`. Locks every page's name + URL. */
const PAGES: ReadonlyArray<readonly [string, string]> = [
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
  ['admin-settings', 'settings'],
];

function childrenOf(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return (routes[0].children ?? []) as RouteRecordRaw[];
}

describe('buildAdminRoutes — nested AdminLayout shape', () => {
  it('returns a single admin parent route rendering a lazily-loaded layout', () => {
    const routes = buildAdminRoutes();
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('/app/admin');
    expect(typeof routes[0].component).toBe('function'); // lazy AdminLayout chunk
  });

  it('passes the router base to the layout as a prop', () => {
    const def = buildAdminRoutes()[0] as RouteRecordRaw & { props?: unknown };
    expect(def.props).toEqual({ base: '/app' });
    const portal = buildAdminRoutes('/portal')[0] as RouteRecordRaw & { props?: unknown };
    expect(portal.path).toBe('/portal/admin');
    expect(portal.props).toEqual({ base: '/portal' });
  });

  it('nests every admin page as a relatively-pathed, named, lazily-imported child', () => {
    const children = childrenOf(buildAdminRoutes());
    for (const [name, segment] of PAGES) {
      const child = children.find((c) => c.name === name);
      expect(child, `child "${name}" exists`).toBeTruthy();
      // Relative path (no leading slash) so it resolves under the parent.
      expect(child?.path).toBe(segment);
      expect(typeof child?.component, `child "${name}" is a lazy loader`).toBe('function');
    }
  });

  it('keeps the dashboard first and redirects the bare /admin index to it', () => {
    const children = childrenOf(buildAdminRoutes());
    const index = children.find((c) => c.path === '');
    expect(index?.redirect).toEqual({ name: 'admin-dashboard' });
    // first *page* child (after the index redirect) is the dashboard
    expect(children.find((c) => c.name)?.name).toBe('admin-dashboard');
  });
});

describe('buildAdminRoutes — resolved URLs + redirect (real router)', () => {
  function routerFor(base?: string) {
    return createRouter({ history: createMemoryHistory(), routes: buildAdminRoutes(base) });
  }

  it('resolves every page name to its unchanged /app/admin/<segment> URL', () => {
    const router = routerFor();
    for (const [name, segment] of PAGES) {
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

describe('adminMenu', () => {
  it('returns an Admin group whose children point at the admin routes', () => {
    const [group] = adminMenu();
    expect(group.id).toBe('admin');
    expect(group.label).toBe('Admin');
    expect(group.children?.find((c) => c.id === 'admin-logs')?.to).toBe('/app/admin/logs');
  });

  it('honors a custom base in the child links', () => {
    const [group] = adminMenu('/portal');
    expect(group.children?.find((c) => c.id === 'admin-logs')?.to).toBe('/portal/admin/logs');
  });

  it('exposes a child for every admin page with its label, link and icon', () => {
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
      'admin-settings': { label: 'Settings', to: '/app/admin/settings' },
    };
    for (const [id, { label, to }] of Object.entries(expected)) {
      const child = group.children?.find((c) => c.id === id);
      expect(child?.label, `${id} label`).toBe(label);
      expect(child?.to, `${id} link`).toBe(to);
      expect(child?.icon, `${id} has an icon`).toBeTruthy();
    }
  });

  it('exposes exactly the 16 ported admin pages as children', () => {
    const [group] = adminMenu();
    expect(group.children).toHaveLength(16);
  });
});
