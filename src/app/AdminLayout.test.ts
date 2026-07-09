/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router, type RouteRecordRaw } from 'vue-router';
import AdminLayout from './AdminLayout.vue';
import { buildAdminRoutes, buildHubAdminRoutes, type AdminPage } from './admin';

/**
 * Mount the REAL AdminLayout as the parent route of a stub-children router (the
 * children stand in for the heavy lazy admin pages). The layout + its `pages`
 * prop come straight from the production builder so the test exercises the same
 * page list the consumer mounts.
 */
async function mountAdmin(
  build: (base?: string) => RouteRecordRaw[] = buildAdminRoutes,
  base = '/app',
): Promise<{ wrapper: ReturnType<typeof mount>; router: Router; pages: AdminPage[] }> {
  const parent = build(base)[0] as RouteRecordRaw & { props?: { pages?: AdminPage[] } };
  const pages = parent.props?.pages ?? [];
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: `${base}/admin`,
        component: AdminLayout,
        props: { base, pages },
        children: [
          { path: '', redirect: { name: pages[0].name } },
          ...pages.map((p) => ({
            path: p.path,
            name: p.name,
            component: { template: `<div class="stub-page">${p.name}</div>` },
          })),
        ],
      },
    ],
  });
  const wrapper = mount({ template: '<RouterView />' }, { global: { plugins: [router] } });
  await router.push(`${base}/admin/${pages[0].path}`);
  await router.isReady();
  await flushPromises();
  return { wrapper, router, pages };
}

describe('AdminLayout — server set', () => {
  it('renders a labelled Admin nav landmark with all 20 page links', async () => {
    const { wrapper } = await mountAdmin();
    const nav = wrapper.find('nav.admin__nav');
    expect(nav.exists()).toBe(true);
    expect(nav.attributes('aria-labelledby')).toBe('admin-nav-heading');
    expect(wrapper.find('#admin-nav-heading').text()).toBe('Admin');

    const links = wrapper.findAll('.admin__link');
    expect(links).toHaveLength(20);
    const labels = links.map((l) => l.text());
    expect(labels).toContain('Dashboard');
    expect(labels).toContain('Server Traffic');
    expect(labels).toContain('Cast Devices');
    expect(labels).toContain('Live TV / DVR');
    expect(labels).toContain('Libraries');
    expect(labels).toContain('Duplicates');
    expect(labels).toContain('Plugins');
    expect(labels).toContain('Settings');
    expect(labels).toContain('Transcoding');
  });

  it('renders a real Icon component for every link (icon-only, never emoji)', async () => {
    const { wrapper } = await mountAdmin();
    expect(wrapper.findAll('.admin__icon')).toHaveLength(20);
  });

  it('points each sidebar link at its admin page URL', async () => {
    const { wrapper } = await mountAdmin();
    const users = wrapper.findAll('.admin__link').find((l) => l.text() === 'Users')!;
    expect(users.attributes('href')).toBe('/app/admin/users');
  });

  it('renders the open admin page in the content RouterView', async () => {
    const { wrapper } = await mountAdmin();
    expect(wrapper.find('.admin__content .stub-page').text()).toBe('admin-dashboard');
  });

  it('marks the open page link active (aria-current="page") and leaves the rest inactive', async () => {
    const { wrapper } = await mountAdmin();
    const dash = wrapper.findAll('.admin__link').find((l) => l.text() === 'Dashboard')!;
    expect(dash.classes()).toContain('router-link-active');
    expect(dash.attributes('aria-current')).toBe('page');
    const users = wrapper.findAll('.admin__link').find((l) => l.text() === 'Users')!;
    expect(users.attributes('aria-current')).toBeUndefined();
  });

  it('redirects the bare base/admin to the dashboard child rendered inside the layout', async () => {
    const { wrapper, router } = await mountAdmin();
    await router.push('/app/admin');
    await flushPromises();
    expect(router.currentRoute.value.name).toBe('admin-dashboard');
    expect(wrapper.find('.admin__content .stub-page').text()).toBe('admin-dashboard');
  });

  it('reacts to navigation — content + active link follow the route', async () => {
    const { wrapper, router } = await mountAdmin();
    await router.push('/app/admin/users');
    await flushPromises();
    expect(wrapper.find('.admin__content .stub-page').text()).toBe('admin-users');
    const users = wrapper.findAll('.admin__link').find((l) => l.text() === 'Users')!;
    expect(users.classes()).toContain('router-link-active');
  });

  it('honors a custom router base in the link targets', async () => {
    const { wrapper } = await mountAdmin(buildAdminRoutes, '/portal');
    const users = wrapper.findAll('.admin__link').find((l) => l.text() === 'Users')!;
    expect(users.attributes('href')).toBe('/portal/admin/users');
  });
});

describe('AdminLayout — hub set', () => {
  it('renders only the 6 hub admin links, in order', async () => {
    const { wrapper } = await mountAdmin(buildHubAdminRoutes);
    const labels = wrapper.findAll('.admin__link').map((l) => l.text());
    expect(labels).toEqual(['Dashboard', 'Server Traffic', 'Users', 'Logs', 'Settings', 'Audit Logs']);
  });

  it('links the hub dashboard + audit logs to their /app/admin/* URLs', async () => {
    const { wrapper } = await mountAdmin(buildHubAdminRoutes);
    const audit = wrapper.findAll('.admin__link').find((l) => l.text() === 'Audit Logs')!;
    expect(audit.attributes('href')).toBe('/app/admin/audit-logs');
    const dash = wrapper.findAll('.admin__link').find((l) => l.text() === 'Dashboard')!;
    expect(dash.attributes('href')).toBe('/app/admin/dashboard');
  });

  it('renders the hub dashboard as the bare-/admin landing page', async () => {
    const { wrapper } = await mountAdmin(buildHubAdminRoutes);
    expect(wrapper.find('.admin__content .stub-page').text()).toBe('admin-hub-dashboard');
  });
});
