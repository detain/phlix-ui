/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import UserMenu from './UserMenu.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useProfileStore } from '../stores/useProfileStore';

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/app', component: stub }, { path: '/:rest(.*)*', component: stub }],
  });
}

const wrappers: VueWrapper[] = [];
function mountMenu(
  loggedIn = false,
  user: Record<string, unknown> = { id: '1', username: 'Ada' },
  attach = false,
) {
  if (loggedIn) localStorage.setItem('access_token', 'TOKEN');
  const router = makeRouter();
  const auth = useAuthStore();
  if (loggedIn) auth.user = user as never;
  const push = vi.spyOn(router, 'push');
  const w = mount(UserMenu, {
    ...(attach ? { attachTo: document.body } : {}),
    global: { plugins: [router], provide: { phlixConfig: { routerBase: '/app' } } },
  });
  wrappers.push(w);
  return { w, auth, router, push };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('UserMenu — signed out', () => {
  it('shows a user icon and a Sign in action that routes to login', async () => {
    const { w, push } = mountMenu(false);
    expect(w.find('.usermenu__avatar').exists()).toBe(false);
    expect(w.find('.usermenu__panel').exists()).toBe(false);
    await w.get('.usermenu__trigger').trigger('click');
    const panel = w.get('.usermenu__panel');
    expect(panel.text()).toContain('Sign in');
    await panel.find('.usermenu__item').trigger('click');
    expect(push).toHaveBeenCalledWith('/app/login');
  });
});

describe('UserMenu — signed in', () => {
  it('shows the avatar initial + name and a Settings link', async () => {
    const { w, push } = mountMenu(true);
    expect(w.get('.usermenu__trigger .usermenu__avatar').text()).toBe('AD');
    await w.get('.usermenu__trigger').trigger('click');
    const panel = w.get('.usermenu__panel');
    expect(panel.text()).toContain('Ada');
    expect(panel.text()).toContain('Settings');
    expect(panel.text()).toContain('Sign out');
    // Menu order (S82): History, Switch Profile, Manage Profiles, Settings, Sign out.
    await panel.findAll('.usermenu__item')[3].trigger('click');
    expect(push).toHaveBeenCalledWith('/app/settings');
  });

  it('signs out (clears the session) and routes to login', async () => {
    const { w, auth, push } = mountMenu(true);
    expect(auth.isLoggedIn).toBe(true);
    await w.get('.usermenu__trigger').trigger('click');
    const items = w.get('.usermenu__panel').findAll('.usermenu__item');
    await items[items.length - 1].trigger('click'); // Sign out
    expect(auth.isLoggedIn).toBe(false);
    expect(push).toHaveBeenCalledWith('/app/login');
  });

  it('toggles the menu closed when the trigger is clicked again', async () => {
    const { w } = mountMenu(true);
    await w.get('.usermenu__trigger').trigger('click');
    expect(w.find('.usermenu__panel').exists()).toBe(true);
    await w.get('.usermenu__trigger').trigger('click');
    expect(w.find('.usermenu__panel').exists()).toBe(false);
  });

  it('reflects aria-expanded on the trigger', async () => {
    const { w } = mountMenu(true);
    const trigger = w.get('.usermenu__trigger');
    expect(trigger.attributes('aria-expanded')).toBe('false');
    await trigger.trigger('click');
    expect(trigger.attributes('aria-expanded')).toBe('true');
  });

  it('falls back to the name then email for the display name', async () => {
    const byName = mountMenu(true, { id: '2', name: 'Bob Bobson' });
    expect(byName.w.get('.usermenu__trigger .usermenu__avatar').text()).toBe('BB');
    await byName.w.get('.usermenu__trigger').trigger('click');
    expect(byName.w.get('.usermenu__panel').text()).toContain('Bob Bobson');

    const byEmail = mountMenu(true, { id: '3', email: 'eve@example.com' });
    await byEmail.w.get('.usermenu__trigger').trigger('click');
    expect(byEmail.w.get('.usermenu__panel').text()).toContain('eve@example.com');
  });

  it('closes when a pointerdown happens outside the menu', async () => {
    const { w } = mountMenu(true, { id: '1', username: 'Ada' }, true);
    await w.get('.usermenu__trigger').trigger('click');
    expect(w.find('.usermenu__panel').exists()).toBe(true);
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await flushPromises();
    expect(w.find('.usermenu__panel').exists()).toBe(false);
  });
});

// S82 — the two new profile entries. They live in the signed-in panel alongside
// History / Settings / Sign out: "Switch Profile" re-arms the Who's-watching
// gate (and closes the menu), "Manage Profiles" routes to <base>/profiles.
describe('UserMenu — profile entries (S82)', () => {
  beforeEach(() => {
    // The profile store lazily reads the list; answer with one honest row so
    // openGate()'s user-initiated retry never hits the network.
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        ({
          ok: true,
          status: 200,
          headers: { get: () => 'application/json' },
          json: async () => ({ profiles: [] }),
          text: async () => '{"profiles":[]}',
        }) as unknown as Response,
      ),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('offers Switch Profile and Manage Profiles in the signed-in panel', async () => {
    const { w } = mountMenu(true);
    await w.get('.usermenu__trigger').trigger('click');
    const panel = w.get('.usermenu__panel');
    expect(panel.find('[data-testid="usermenu-switch-profile"]').exists()).toBe(true);
    expect(panel.find('[data-testid="usermenu-manage-profiles"]').exists()).toBe(true);
    expect(panel.text()).toContain('Switch Profile');
    expect(panel.text()).toContain('Manage Profiles');
  });

  it('Switch Profile re-opens the Who’s-watching gate and closes the menu', async () => {
    const { w } = mountMenu(true);
    const profiles = useProfileStore();
    profiles.acknowledgeChoice();
    expect(profiles.choiceMade).toBe(true);
    await w.get('.usermenu__trigger').trigger('click');
    await w.get('[data-testid="usermenu-switch-profile"]').trigger('click');
    expect(profiles.choiceMade).toBe(false); // gate re-armed
    expect(w.find('.usermenu__panel').exists()).toBe(false); // menu closed on pick
  });

  it('Manage Profiles routes to the profiles page under the router base', async () => {
    const { w, push } = mountMenu(true);
    await w.get('.usermenu__trigger').trigger('click');
    await w.get('[data-testid="usermenu-manage-profiles"]').trigger('click');
    expect(push).toHaveBeenCalledWith('/app/profiles');
  });

  it('does not render the profile entries when signed out', async () => {
    const { w } = mountMenu(false);
    await w.get('.usermenu__trigger').trigger('click');
    expect(w.find('[data-testid="usermenu-switch-profile"]').exists()).toBe(false);
    expect(w.find('[data-testid="usermenu-manage-profiles"]').exists()).toBe(false);
  });
});
