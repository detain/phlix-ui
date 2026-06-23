import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import LoginForm from './LoginForm.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import type { PhlixAppConfig } from '../app/types';

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', component: stub },
      { path: '/hub', component: stub },
      { path: '/:rest(.*)*', component: stub },
    ],
  });
}

const wrappers: VueWrapper[] = [];
function mountForm(opts: { config?: Partial<PhlixAppConfig> | null; slots?: Record<string, string> } = {}) {
  const router = makeRouter();
  const auth = useAuthStore();
  const toasts = useToastStore();
  const push = vi.spyOn(router, 'push');
  const w = mount(LoginForm, {
    slots: opts.slots,
    global: { plugins: [router], provide: { phlixConfig: opts.config ?? null } },
  });
  wrappers.push(w);
  return { w, auth, toasts, router, push };
}

const setIdentifier = (w: VueWrapper, v: string) => w.get('input[name="identifier"]').setValue(v);
const setPassword = (w: VueWrapper, v: string) => w.get('input[type="password"]').setValue(v);
const submit = (w: VueWrapper) => w.get('form').trigger('submit');

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('LoginForm', () => {
  it('renders the redesigned card heading + submit', () => {
    const { w } = mountForm();
    expect(w.get('.authcard__title').text()).toBe('Welcome back');
    expect(w.get('button[type="submit"]').text()).toContain('Sign in');
  });

  it('blocks submit + shows inline errors when both fields are empty', async () => {
    const { w, auth } = mountForm();
    const login = vi.spyOn(auth, 'login');
    await submit(w);
    await flushPromises();
    expect(login).not.toHaveBeenCalled();
    expect(w.text()).toContain('Enter your username or email.');
    expect(w.text()).toContain('Enter your password.');
  });

  it('accepts a plain username (no email-format gate) and submits it as the identifier', async () => {
    const { w, auth } = mountForm();
    const login = vi.spyOn(auth, 'login').mockResolvedValue(true);
    await setIdentifier(w, '  joe_user  ');
    await setPassword(w, 'secret');
    await submit(w);
    await flushPromises();
    expect(login).toHaveBeenCalledWith('joe_user', 'secret');
  });

  it('logs in with trimmed credentials, emits success, and routes home on success', async () => {
    const { w, auth, push } = mountForm();
    const login = vi.spyOn(auth, 'login').mockResolvedValue(true);
    await setIdentifier(w, '  a@b.c  ');
    await setPassword(w, 'pw');
    await submit(w);
    await flushPromises();
    expect(login).toHaveBeenCalledWith('a@b.c', 'pw');
    expect(w.emitted('success')).toHaveLength(1);
    expect(push).toHaveBeenCalledWith('/app');
  });

  it('routes to the configured home on success (hub lands on /app/servers, not Browse)', async () => {
    const { w, auth, push } = mountForm({ config: { app: 'hub', home: '/app/servers' } });
    vi.spyOn(auth, 'login').mockResolvedValue(true);
    await setIdentifier(w, 'a@b.c');
    await setPassword(w, 'pw');
    await submit(w);
    await flushPromises();
    expect(push).toHaveBeenCalledWith('/app/servers');
  });

  it('shows an error banner + fires a toast when login fails', async () => {
    const { w, auth, toasts } = mountForm();
    const toastErr = vi.spyOn(toasts, 'error');
    vi.spyOn(auth, 'login').mockImplementation(async () => {
      auth.error = 'Invalid email or password.';
      return false;
    });
    await setIdentifier(w, 'a@b.c');
    await setPassword(w, 'wrong');
    await submit(w);
    await flushPromises();
    const banner = w.get('[role="alert"]');
    expect(banner.text()).toContain('Invalid email or password.');
    expect(toastErr).toHaveBeenCalledWith('Invalid email or password.');
  });

  it('falls back to a generic toast when login fails without a store error', async () => {
    const { w, auth, toasts } = mountForm();
    const toastErr = vi.spyOn(toasts, 'error');
    vi.spyOn(auth, 'login').mockResolvedValue(false); // resolves false, leaves auth.error null
    await setIdentifier(w, 'a@b.c');
    await setPassword(w, 'pw');
    await submit(w);
    await flushPromises();
    expect(toastErr).toHaveBeenCalledWith('Sign in failed.');
  });

  it('does not render the oauth divider/region unless a #oauth slot is provided', () => {
    const without = mountForm();
    expect(without.w.find('.login__oauth').exists()).toBe(false);
    expect(without.w.text()).not.toContain('or continue with');

    const withSlot = mountForm({ slots: { oauth: '<button class="sso">SSO</button>' } });
    expect(withSlot.w.find('.login__oauth .sso').exists()).toBe(true);
    expect(withSlot.w.text()).toContain('or continue with');
  });

  it('links to the signup route (config routerBase aware)', () => {
    const def = mountForm();
    expect(def.w.get('.login__link').attributes('href')).toBe('/app/signup');

    const hub = mountForm({ config: { routerBase: '/hub' } });
    expect(hub.w.get('.login__link').attributes('href')).toBe('/hub/signup');
  });

  it('routes to the configured routerBase on success', async () => {
    const { w, auth, push } = mountForm({ config: { routerBase: '/hub' } });
    vi.spyOn(auth, 'login').mockResolvedValue(true);
    await setIdentifier(w, 'a@b.c');
    await setPassword(w, 'pw');
    await submit(w);
    await flushPromises();
    expect(push).toHaveBeenCalledWith('/hub');
  });

  it('disables the submit button while auth.loading', async () => {
    const { w, auth } = mountForm();
    auth.loading = true;
    await flushPromises();
    const btn = w.get('button[type="submit"]');
    expect(btn.attributes('disabled')).toBeDefined();
    expect(btn.attributes('aria-busy')).toBe('true');
    expect(btn.text()).toContain('Signing in');
  });
});
