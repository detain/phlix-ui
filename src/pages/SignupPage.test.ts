import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import SignupPage from './SignupPage.vue';
import SignupForm from '../components/SignupForm.vue';
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
  const w = mount(SignupPage, {
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

describe('SignupPage', () => {
  it('hosts the SignupForm card', () => {
    const w = mountPage();
    expect(w.findComponent(SignupForm).exists()).toBe(true);
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
    expect(w.find('.signup__oauth .sso').exists()).toBe(true);
  });
});
