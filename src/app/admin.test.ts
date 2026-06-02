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
});
