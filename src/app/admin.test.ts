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
    expect(group.children?.[0].to).toBe('/portal/admin/logs');
  });
});
