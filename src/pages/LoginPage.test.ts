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
import LoginPage from './LoginPage.vue';
import LoginForm from '../components/LoginForm.vue';
import AppBackdrop from '../components/AppBackdrop.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/app', component: stub }, { path: '/:rest(.*)*', component: stub }],
  });
}

const wrappers: VueWrapper[] = [];
function mountPage(slots: Record<string, string> = {}) {
  const router = makeRouter();
  const w = mount(LoginPage, {
    slots,
    global: { plugins: [router], provide: { phlixConfig: null } },
  });
  wrappers.push(w);
  return w;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('LoginPage', () => {
  it('hosts the LoginForm card', () => {
    const w = mountPage();
    expect(w.findComponent(LoginForm).exists()).toBe(true);
    expect(w.find('.authcard').exists()).toBe(true);
  });

  it('mounts the atmosphere + booth glow when prefs.atmosphere is on (default)', () => {
    const w = mountPage();
    expect(w.findComponent(AppBackdrop).props('enabled')).toBe(true);
    expect(w.find('.auth-page__glow').exists()).toBe(true);
  });

  it('disables the atmosphere + hides the glow when prefs.atmosphere is off', async () => {
    const w = mountPage();
    const prefs = usePreferencesStore();
    prefs.atmosphere = false;
    await flushPromises();
    expect(w.findComponent(AppBackdrop).props('enabled')).toBe(false);
    expect(w.find('.auth-page__glow').exists()).toBe(false);
  });

  it('forwards a #oauth slot through to the form', () => {
    const w = mountPage({ oauth: '<button class="sso">SSO</button>' });
    expect(w.find('.login__oauth .sso').exists()).toBe(true);
  });

  it('renders the redirect envelope: machine code localized, human text as fallback', async () => {
    const router = makeRouter();
    await router.push('/login?error=Bad%20thing&code=auth.invalid_credentials');
    await router.isReady();
    const w = mount(LoginPage, { global: { plugins: [router], provide: { phlixConfig: null } } });
    wrappers.push(w);
    const n = w.find('.auth-redirect');
    expect(n.exists()).toBe(true);
    expect(n.attributes('role')).toBe('alert');
    expect(n.text()).toBe('The credentials you entered are not correct.');
    await router.push('/login?notice=Pending%20approval');
    await flushPromises();
    expect(w.find('.auth-redirect').text()).toBe('Pending approval');
    expect(w.find('.auth-redirect').attributes('role')).toBe('status');
  });

  it('renders no notice without an envelope', () => {
    const w = mountPage();
    expect(w.find('.auth-redirect').exists()).toBe(false);
  });
});
