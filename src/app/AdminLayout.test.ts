import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import AdminLayout from './AdminLayout.vue';
import { adminMenu } from './admin';

/**
 * Mount the REAL AdminLayout as the parent route of a stub-children router (the
 * children stand in for the heavy lazy admin pages), navigated to the dashboard.
 */
async function mountAdmin(base = '/app'): Promise<{ wrapper: ReturnType<typeof mount>; router: Router }> {
  const prefix = `${base}/admin/`;
  const items = adminMenu(base)[0].children ?? [];
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: `${base}/admin`,
        component: AdminLayout,
        props: { base },
        children: [
          { path: '', redirect: { name: 'admin-dashboard' } },
          ...items.map((it) => ({
            path: (it.to ?? '').slice(prefix.length),
            name: it.id,
            component: { template: `<div class="stub-page">${it.id}</div>` },
          })),
        ],
      },
    ],
  });
  const wrapper = mount({ template: '<RouterView />' }, { global: { plugins: [router] } });
  await router.push(`${base}/admin/dashboard`);
  await router.isReady();
  await flushPromises();
  return { wrapper, router };
}

describe('AdminLayout', () => {
  it('renders a labelled Admin nav landmark with all 16 page links', async () => {
    const { wrapper } = await mountAdmin();
    const nav = wrapper.find('nav.admin__nav');
    expect(nav.exists()).toBe(true);
    expect(nav.attributes('aria-labelledby')).toBe('admin-nav-heading');
    expect(wrapper.find('#admin-nav-heading').text()).toBe('Admin');

    const links = wrapper.findAll('.admin__link');
    expect(links).toHaveLength(16);
    const labels = links.map((l) => l.text());
    expect(labels).toContain('Dashboard');
    expect(labels).toContain('Cast Devices');
    expect(labels).toContain('Live TV / DVR');
    expect(labels).toContain('Settings');
  });

  it('renders a real Icon component for every link (icon-only, never emoji)', async () => {
    const { wrapper } = await mountAdmin();
    // One rendered Icon per admin page — the icon-only contract, locked structurally
    // (the package-wide emoji gate guards against glyphs).
    expect(wrapper.findAll('.admin__icon')).toHaveLength(16);
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
    await router.push('/app/admin'); // hit the index redirect explicitly
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
    const { wrapper } = await mountAdmin('/portal');
    const users = wrapper.findAll('.admin__link').find((l) => l.text() === 'Users')!;
    expect(users.attributes('href')).toBe('/portal/admin/users');
  });
});
