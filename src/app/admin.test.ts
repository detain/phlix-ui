import { describe, it, expect } from 'vitest';
import { buildAdminRoutes, adminMenu } from './admin';

describe('buildAdminRoutes', () => {
  it('returns admin routes under the default /app base', () => {
    const routes = buildAdminRoutes();
    const logs = routes.find((r) => r.name === 'admin-logs');
    expect(logs?.path).toBe('/app/admin/logs');
    expect(typeof logs?.component).toBe('function'); // lazily imported chunk
  });

  it('honors a custom router base', () => {
    const routes = buildAdminRoutes('/portal');
    expect(routes.find((r) => r.name === 'admin-logs')?.path).toBe('/portal/admin/logs');
  });

  it('returns the dashboard route FIRST, lazily imported', () => {
    const routes = buildAdminRoutes();
    expect(routes[0].name).toBe('admin-dashboard');
    expect(routes[0].path).toBe('/app/admin/dashboard');
    expect(typeof routes[0].component).toBe('function');
  });

  it('honors a custom base for the dashboard route', () => {
    const routes = buildAdminRoutes('/portal');
    expect(routes.find((r) => r.name === 'admin-dashboard')?.path).toBe('/portal/admin/dashboard');
  });

  it('exposes the users route after the dashboard, lazily imported', () => {
    const routes = buildAdminRoutes();
    const users = routes.find((r) => r.name === 'admin-users');
    expect(users?.path).toBe('/app/admin/users');
    expect(typeof users?.component).toBe('function');
    // Dashboard stays first; users comes after it.
    expect(routes[0].name).toBe('admin-dashboard');
    expect(routes.findIndex((r) => r.name === 'admin-users')).toBeGreaterThan(0);
  });

  it('honors a custom base for the users route', () => {
    const routes = buildAdminRoutes('/portal');
    expect(routes.find((r) => r.name === 'admin-users')?.path).toBe('/portal/admin/users');
  });

  it('exposes the webhooks route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const webhooks = routes.find((r) => r.name === 'admin-webhooks');
    expect(webhooks?.path).toBe('/app/admin/webhooks');
    expect(typeof webhooks?.component).toBe('function');
  });

  it('honors a custom base for the webhooks route', () => {
    const routes = buildAdminRoutes('/portal');
    expect(routes.find((r) => r.name === 'admin-webhooks')?.path).toBe('/portal/admin/webhooks');
  });

  it('exposes the services route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const services = routes.find((r) => r.name === 'admin-services');
    expect(services?.path).toBe('/app/admin/services');
    expect(typeof services?.component).toBe('function');
  });

  it('exposes the integrations route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const integrations = routes.find((r) => r.name === 'admin-integrations');
    expect(integrations?.path).toBe('/app/admin/integrations');
    expect(typeof integrations?.component).toBe('function');
  });

  it('exposes the backup route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const backup = routes.find((r) => r.name === 'admin-backup');
    expect(backup?.path).toBe('/app/admin/backup');
    expect(typeof backup?.component).toBe('function');
  });

  it('exposes the cast-devices route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const cast = routes.find((r) => r.name === 'admin-cast');
    expect(cast?.path).toBe('/app/admin/cast-devices');
    expect(typeof cast?.component).toBe('function');
  });

  it('exposes the dlna route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const dlna = routes.find((r) => r.name === 'admin-dlna');
    expect(dlna?.path).toBe('/app/admin/dlna');
    expect(typeof dlna?.component).toBe('function');
  });

  it('exposes the remote-access route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const ra = routes.find((r) => r.name === 'admin-remote-access');
    expect(ra?.path).toBe('/app/admin/remote-access');
    expect(typeof ra?.component).toBe('function');
  });

  it('exposes the livetv route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const livetv = routes.find((r) => r.name === 'admin-livetv');
    expect(livetv?.path).toBe('/app/admin/livetv');
    expect(typeof livetv?.component).toBe('function');
  });

  it('exposes the collections route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const collections = routes.find((r) => r.name === 'admin-collections');
    expect(collections?.path).toBe('/app/admin/collections');
    expect(typeof collections?.component).toBe('function');
  });

  it('exposes the history route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const history = routes.find((r) => r.name === 'admin-history');
    expect(history?.path).toBe('/app/admin/history');
    expect(typeof history?.component).toBe('function');
  });

  it('exposes the syncplay route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const syncplay = routes.find((r) => r.name === 'admin-syncplay');
    expect(syncplay?.path).toBe('/app/admin/syncplay');
    expect(typeof syncplay?.component).toBe('function');
  });

  it('exposes the libraries route, lazily imported', () => {
    const routes = buildAdminRoutes();
    const libraries = routes.find((r) => r.name === 'admin-libraries');
    expect(libraries?.path).toBe('/app/admin/libraries');
    expect(typeof libraries?.component).toBe('function');
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

  it('exposes a dashboard child pointing at the dashboard route', () => {
    const [group] = adminMenu();
    const dash = group.children?.find((c) => c.id === 'admin-dashboard');
    expect(dash?.label).toBe('Dashboard');
    expect(dash?.to).toBe('/app/admin/dashboard');
  });

  it('exposes a users child pointing at the users route', () => {
    const [group] = adminMenu();
    const users = group.children?.find((c) => c.id === 'admin-users');
    expect(users?.label).toBe('Users');
    expect(users?.to).toBe('/app/admin/users');
    expect(users?.icon).toBe('user');
  });

  it('honors a custom base in the users child link', () => {
    const [group] = adminMenu('/portal');
    expect(group.children?.find((c) => c.id === 'admin-users')?.to).toBe('/portal/admin/users');
  });

  it('exposes a webhooks child pointing at the webhooks route', () => {
    const [group] = adminMenu();
    const webhooks = group.children?.find((c) => c.id === 'admin-webhooks');
    expect(webhooks?.label).toBe('Webhooks');
    expect(webhooks?.to).toBe('/app/admin/webhooks');
  });

  it('exposes a services child pointing at the services route', () => {
    const [group] = adminMenu();
    const services = group.children?.find((c) => c.id === 'admin-services');
    expect(services?.label).toBe('Services');
    expect(services?.to).toBe('/app/admin/services');
  });

  it('exposes an integrations child pointing at the integrations route', () => {
    const [group] = adminMenu();
    const integrations = group.children?.find((c) => c.id === 'admin-integrations');
    expect(integrations?.label).toBe('Integrations');
    expect(integrations?.to).toBe('/app/admin/integrations');
  });

  it('exposes a backup child pointing at the backup route', () => {
    const [group] = adminMenu();
    const backup = group.children?.find((c) => c.id === 'admin-backup');
    expect(backup?.label).toBe('Backup');
    expect(backup?.to).toBe('/app/admin/backup');
  });

  it('exposes a cast-devices child pointing at the cast route', () => {
    const [group] = adminMenu();
    const cast = group.children?.find((c) => c.id === 'admin-cast');
    expect(cast?.label).toBe('Cast Devices');
    expect(cast?.to).toBe('/app/admin/cast-devices');
  });

  it('exposes a dlna child pointing at the dlna route', () => {
    const [group] = adminMenu();
    const dlna = group.children?.find((c) => c.id === 'admin-dlna');
    expect(dlna?.label).toBe('DLNA Server');
    expect(dlna?.to).toBe('/app/admin/dlna');
  });

  it('exposes a remote-access child pointing at the remote-access route', () => {
    const [group] = adminMenu();
    const ra = group.children?.find((c) => c.id === 'admin-remote-access');
    expect(ra?.label).toBe('Remote Access');
    expect(ra?.to).toBe('/app/admin/remote-access');
  });

  it('exposes a livetv child pointing at the livetv route', () => {
    const [group] = adminMenu();
    const livetv = group.children?.find((c) => c.id === 'admin-livetv');
    expect(livetv?.label).toBe('Live TV / DVR');
    expect(livetv?.to).toBe('/app/admin/livetv');
  });

  it('exposes a collections child pointing at the collections route', () => {
    const [group] = adminMenu();
    const collections = group.children?.find((c) => c.id === 'admin-collections');
    expect(collections?.label).toBe('Collections');
    expect(collections?.to).toBe('/app/admin/collections');
  });

  it('exposes a history child pointing at the history route', () => {
    const [group] = adminMenu();
    const history = group.children?.find((c) => c.id === 'admin-history');
    expect(history?.label).toBe('Watch History');
    expect(history?.to).toBe('/app/admin/history');
  });

  it('exposes a syncplay child pointing at the syncplay route', () => {
    const [group] = adminMenu();
    const syncplay = group.children?.find((c) => c.id === 'admin-syncplay');
    expect(syncplay?.label).toBe('SyncPlay');
    expect(syncplay?.to).toBe('/app/admin/syncplay');
  });

  it('exposes a libraries child pointing at the libraries route', () => {
    const [group] = adminMenu();
    const libraries = group.children?.find((c) => c.id === 'admin-libraries');
    expect(libraries?.label).toBe('Libraries');
    expect(libraries?.to).toBe('/app/admin/libraries');
  });
});
