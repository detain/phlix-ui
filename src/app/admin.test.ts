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
});
