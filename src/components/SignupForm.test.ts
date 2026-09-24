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
import SignupForm from './SignupForm.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { ERROR_MESSAGES } from '../i18n/errors';
import type { PhlixAppConfig } from '../app/types';

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', component: stub },
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
  const w = mount(SignupForm, {
    slots: opts.slots,
    global: { plugins: [router], provide: { phlixConfig: opts.config ?? null } },
  });
  wrappers.push(w);
  return { w, auth, toasts, router, push };
}

const setEmail = (w: VueWrapper, v: string) => w.get('input[type="email"]').setValue(v);
const setUsername = (w: VueWrapper, v: string) => w.get('input[autocomplete="username"]').setValue(v);
const setPassword = (w: VueWrapper, v: string) => w.get('input[placeholder="At least 8 characters"]').setValue(v);
const setConfirm = (w: VueWrapper, v: string) => w.get('input[placeholder="Repeat your password"]').setValue(v);
const submit = (w: VueWrapper) => w.get('form').trigger('submit');

async function fillValid(w: VueWrapper) {
  await setEmail(w, 'n@b.c');
  await setUsername(w, 'nick');
  await setPassword(w, 'longenough');
  await setConfirm(w, 'longenough');
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('SignupForm', () => {
  it('renders the redesigned card heading + submit', () => {
    const { w } = mountForm();
    expect(w.get('.authcard__title').text()).toBe('Create your account');
    expect(w.get('button[type="submit"]').text()).toContain('Create account');
  });

  it('blocks submit + shows all inline errors when empty', async () => {
    const { w, auth } = mountForm();
    const signup = vi.spyOn(auth, 'signup');
    await submit(w);
    await flushPromises();
    expect(signup).not.toHaveBeenCalled();
    expect(w.text()).toContain('Enter your email.');
    expect(w.text()).toContain('Choose a username.');
    expect(w.text()).toContain('Choose a password.');
  });

  it('rejects an invalid email format', async () => {
    const { w, auth } = mountForm();
    const signup = vi.spyOn(auth, 'signup');
    await setEmail(w, 'not-an-email');
    await setUsername(w, 'nick');
    await setPassword(w, 'longenough');
    await setConfirm(w, 'longenough');
    await submit(w);
    await flushPromises();
    expect(signup).not.toHaveBeenCalled();
    expect(w.text()).toContain('Enter a valid email address.');
  });

  it('rejects a username shorter than 3 characters', async () => {
    const { w, auth } = mountForm();
    const signup = vi.spyOn(auth, 'signup');
    await setEmail(w, 'n@b.c');
    await setUsername(w, 'ab');
    await setPassword(w, 'longenough');
    await setConfirm(w, 'longenough');
    await submit(w);
    await flushPromises();
    expect(signup).not.toHaveBeenCalled();
    expect(w.text()).toContain('Username must be at least 3 characters.');
  });

  it('rejects a password shorter than 8 characters', async () => {
    const { w, auth } = mountForm();
    const signup = vi.spyOn(auth, 'signup');
    await setEmail(w, 'n@b.c');
    await setUsername(w, 'nick');
    await setPassword(w, 'short');
    await setConfirm(w, 'short');
    await submit(w);
    await flushPromises();
    expect(signup).not.toHaveBeenCalled();
    expect(w.text()).toContain('Password must be at least 8 characters.');
  });

  it('rejects mismatched passwords', async () => {
    const { w, auth } = mountForm();
    const signup = vi.spyOn(auth, 'signup');
    await setEmail(w, 'n@b.c');
    await setUsername(w, 'nick');
    await setPassword(w, 'longenough');
    await setConfirm(w, 'different1');
    await submit(w);
    await flushPromises();
    expect(signup).not.toHaveBeenCalled();
    expect(w.text()).toContain('Passwords do not match.');
  });

  it('registers with trimmed values, emits success, and routes home on success', async () => {
    const { w, auth, push } = mountForm();
    const signup = vi.spyOn(auth, 'signup').mockResolvedValue(true);
    await setEmail(w, '  n@b.c ');
    await setUsername(w, '  nick ');
    await setPassword(w, 'longenough');
    await setConfirm(w, 'longenough');
    await submit(w);
    await flushPromises();
    expect(signup).toHaveBeenCalledWith('n@b.c', 'nick', 'longenough');
    expect(w.emitted('success')).toHaveLength(1);
    expect(push).toHaveBeenCalledWith('/app');
  });

  it('shows an error banner + fires a toast when registration fails', async () => {
    const { w, auth, toasts } = mountForm();
    const toastErr = vi.spyOn(toasts, 'error');
    vi.spyOn(auth, 'signup').mockImplementation(async () => {
      auth.error = 'Email already taken.';
      return false;
    });
    await fillValid(w);
    await submit(w);
    await flushPromises();
    expect(w.get('[role="alert"]').text()).toContain('Email already taken.');
    expect(toastErr).toHaveBeenCalledWith('Email already taken.');
  });

  // W4 error-code doctrine (mirroring LoginForm.test.ts): a registered wire code
  // localizes through the contracts catalog for the configured locale; the
  // server's English text is only ever the fallback for code-less failures
  // (previous test).
  it('renders the LOCALIZED catalog message, not the server text, for a registered error code (es)', async () => {
    const { w, auth, toasts } = mountForm({ config: { locale: 'es' } });
    const toastErr = vi.spyOn(toasts, 'error');
    vi.spyOn(auth, 'signup').mockImplementation(async () => {
      auth.error = 'Registration refused by server';
      auth.errorCode = 'auth.signups_disabled'; // real server register rejection (403)
      return false;
    });
    await fillValid(w);
    await submit(w);
    await flushPromises();
    const localized = ERROR_MESSAGES.es['auth.signups_disabled'];
    expect(w.get('[role="alert"]').text()).toContain(localized);
    expect(w.get('[role="alert"]').text()).not.toContain('Registration refused by server');
    expect(toastErr).toHaveBeenCalledWith(localized);
  });

  // End-to-end: a REAL rejected signup (fetch-level 403 `{error, code}` envelope)
  // flows through the actual store → ApiError → parseErrorCode → catalog path —
  // direct `auth.errorCode = ...` seeding alone would not prove the wiring.
  // The stub must be installed BEFORE mountForm — ApiClient binds globalThis.fetch
  // at construction. Stale-code clearing across attempts is pinned store-side in
  // useAuthStore.test.ts and is deliberately not duplicated here.
  it('localizes an end-to-end rejected signup (real store path) into Spanish', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          Promise.resolve(
            new Response(
              JSON.stringify({
                error: 'Registration refused by server',
                code: 'auth.signups_disabled',
              }),
              {
                status: 403,
                headers: { 'content-type': 'application/json' },
              },
            ),
          ),
      ),
    );
    const { w, auth, toasts } = mountForm({ config: { locale: 'es' } });
    const toastErr = vi.spyOn(toasts, 'error');
    await fillValid(w);
    await submit(w);
    await flushPromises();
    const localized = ERROR_MESSAGES.es['auth.signups_disabled'];
    expect(auth.errorCode).toBe('auth.signups_disabled'); // set by the store's catch, not the test
    expect(w.get('[role="alert"]').text()).toContain(localized);
    expect(w.get('[role="alert"]').text()).not.toContain('Registration refused by server');
    expect(toastErr).toHaveBeenCalledWith(localized);
  });

  it('resolves the error code against the English catalog when no locale is configured', async () => {
    const { w, auth } = mountForm();
    vi.spyOn(auth, 'signup').mockImplementation(async () => {
      auth.error = 'Registration refused by server';
      auth.errorCode = 'auth.signups_disabled';
      return false;
    });
    await fillValid(w);
    await submit(w);
    await flushPromises();
    expect(w.get('[role="alert"]').text()).toContain(ERROR_MESSAGES.en['auth.signups_disabled']);
    expect(w.get('[role="alert"]').text()).not.toContain('Registration refused by server');
  });

  it('falls back to a generic toast when registration fails without a store error', async () => {
    const { w, auth, toasts } = mountForm();
    const toastErr = vi.spyOn(toasts, 'error');
    vi.spyOn(auth, 'signup').mockResolvedValue(false);
    await fillValid(w);
    await submit(w);
    await flushPromises();
    expect(toastErr).toHaveBeenCalledWith('Registration failed.');
  });

  it('disables the submit button + shows the busy label while auth.loading', async () => {
    const { w, auth } = mountForm();
    auth.loading = true;
    await flushPromises();
    const btn = w.get('button[type="submit"]');
    expect(btn.attributes('disabled')).toBeDefined();
    expect(btn.text()).toContain('Creating account');
  });

  it('does not render the oauth divider/region unless a #oauth slot is provided', () => {
    const without = mountForm();
    expect(without.w.find('.signup__oauth').exists()).toBe(false);

    const withSlot = mountForm({ slots: { oauth: '<button class="sso">SSO</button>' } });
    expect(withSlot.w.find('.signup__oauth .sso').exists()).toBe(true);
    expect(withSlot.w.text()).toContain('or continue with');
  });

  it('links to the login route', () => {
    const { w } = mountForm();
    expect(w.get('.signup__link').attributes('href')).toBe('/app/login');
  });
});
