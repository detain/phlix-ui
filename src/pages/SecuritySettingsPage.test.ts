/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SecuritySettingsPage from './SecuritySettingsPage.vue';
import { useToastStore } from '../stores/useToastStore';
import { isRoute } from '../test/route-match';

/**
 * The three exact routes this page reads (`SecuritySettingsPage.vue:64`, `:81`,
 * `:101`, `:153`), plus the per-credential DELETE route.
 *
 * S193: matched with {@link isRoute} — the pathname must END WITH the route —
 * rather than substring. `u.includes('/api/v1/me/webauthn/credentials')` matched the
 * collection AND every per-credential DELETE url AND `…/credentials-MUTATED`, so one
 * branch answered three different routes and the endpoint assertions agreed with a
 * mutated path. The DELETE now matches the credential id the stub actually seeded.
 * `endsWith`, not `===`: a base legitimately prefixes the path on the hub.
 */
const CREDENTIALS_PATH = '/api/v1/me/webauthn/credentials';
const credentialPath = (id: string): string => `${CREDENTIALS_PATH}/${encodeURIComponent(id)}`;
const REGISTER_OPTIONS_PATH = '/api/v1/auth/webauthn/register/options';
const REGISTER_VERIFY_PATH = '/api/v1/auth/webauthn/register/verify';

interface Credential {
  credential_id: string;
  registered_at: number;
  device_type: 'platform' | 'cross-platform';
  counter?: number;
}

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function credential(over: Partial<Credential> = {}): Credential {
  return {
    credential_id: 'abcdefghijklmnopqrstuvwxyz012345',
    registered_at: 1700000000,
    device_type: 'cross-platform',
    ...over,
  };
}

/**
 * A fetch stub that routes by URL + method. `credentials` seeds the list GET;
 * `listError` fails it. Register/verify/delete resolve OK and are recorded so
 * the WebAuthn round-trip can be asserted.
 */
function stubFetch(opts: {
  credentials?: Credential[];
  listError?: boolean;
} = {}) {
  const fn = vi.fn((url: unknown, init?: RequestInit) => {
    const u = typeof url === 'string' ? url : '';
    const method = (init?.method ?? 'GET').toUpperCase();
    // DELETE addresses ONE credential — a different route from the collection, and
    // matched against the ids this stub actually seeded so a mutated path cannot
    // self-match.
    const target = (opts.credentials ?? []).find((c) => isRoute(u, credentialPath(c.credential_id)));
    if (method === 'DELETE' && target) return Promise.resolve(jsonResponse({ success: true }));
    if (isRoute(u, CREDENTIALS_PATH)) {
      if (opts.listError) return Promise.reject(new Error('creds down'));
      return Promise.resolve(jsonResponse({ credentials: opts.credentials ?? [] }));
    }
    if (isRoute(u, REGISTER_OPTIONS_PATH)) {
      return Promise.resolve(jsonResponse({
        challenge: btoa('challenge-bytes'),
        user: { id: btoa('user-id') },
        excludeCredentials: [],
      }));
    }
    if (isRoute(u, REGISTER_VERIFY_PATH)) {
      return Promise.resolve(jsonResponse({ success: true }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

function fakeCredential(): PublicKeyCredential {
  const response = {
    attestationObject: new Uint8Array([1, 2, 3]).buffer,
    clientDataJSON: new Uint8Array([4, 5, 6]).buffer,
    getTransports: () => ['usb'],
  };
  return { id: 'newcred', type: 'public-key', response } as unknown as PublicKeyCredential;
}

function mountPage(): VueWrapper {
  return mount(SecuritySettingsPage, {
    global: {
      plugins: [createPinia()],
      provide: { apiBase: '' },
      stubs: {
        Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' },
        Spinner: { template: '<span class="spinner" />' },
      },
    },
  });
}

beforeEach(() => {
  setActivePinia(createPinia());
  localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('SecuritySettingsPage', () => {
  it('loads credentials on mount and lists them with device type + label', async () => {
    const fetchFn = stubFetch({
      credentials: [credential({ device_type: 'platform', credential_id: 'PLATFORMabcdefghijklmnop' })],
    });
    const w = mountPage();
    await flushPromises();

    expect(isRoute(fetchFn.mock.calls[0][0], CREDENTIALS_PATH)).toBe(true);
    const items = w.findAll('.credential-item');
    expect(items).toHaveLength(1);
    // Platform authenticator → 'monitor' icon + "Platform authenticator" label.
    expect(items[0].find('.credential-item__icon .icon').attributes('data-icon')).toBe('monitor');
    expect(items[0].text()).toContain('Platform authenticator');
    w.unmount();
  });

  it('renders the security-key icon/label for cross-platform devices', async () => {
    stubFetch({ credentials: [credential({ device_type: 'cross-platform' })] });
    const w = mountPage();
    await flushPromises();
    const item = w.find('.credential-item');
    expect(item.find('.credential-item__icon .icon').attributes('data-icon')).toBe('key');
    expect(item.text()).toContain('Security key');
    w.unmount();
  });

  it('shows the empty state when no passkeys are registered', async () => {
    stubFetch({ credentials: [] });
    const w = mountPage();
    await flushPromises();
    expect(w.text()).toContain('No passkeys registered');
    w.unmount();
  });

  it('shows the error state when the credentials load fails', async () => {
    stubFetch({ listError: true });
    const w = mountPage();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load passkeys");
    w.unmount();
  });

  it('deletes a passkey after confirm and toasts success', async () => {
    const fetchFn = stubFetch({ credentials: [credential({ credential_id: 'toDelete-abcdefghijklmnop' })] });
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const w = mountPage();
    await flushPromises();
    const toasts = useToastStore();
    const successSpy = vi.spyOn(toasts, 'success');

    await w.find('.credential-item__delete').trigger('click');
    await flushPromises();

    const deleteCall = fetchFn.mock.calls.find(
      (c) => (c[1] as RequestInit | undefined)?.method === 'DELETE',
    );
    expect(deleteCall).toBeTruthy();
    expect(isRoute(deleteCall![0], credentialPath('toDelete-abcdefghijklmnop'))).toBe(true);
    expect(successSpy).toHaveBeenCalledWith('Passkey deleted successfully');
    w.unmount();
  });

  it('does NOT delete when the confirm dialog is dismissed', async () => {
    const fetchFn = stubFetch({ credentials: [credential()] });
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const w = mountPage();
    await flushPromises();

    await w.find('.credential-item__delete').trigger('click');
    await flushPromises();
    expect(fetchFn.mock.calls.some((c) => (c[1] as RequestInit | undefined)?.method === 'DELETE')).toBe(false);
    w.unmount();
  });

  it('runs the full WebAuthn register round-trip: options → create → verify', async () => {
    const fetchFn = stubFetch({ credentials: [] });
    const createMock = vi.fn(async () => fakeCredential());
    Object.defineProperty(globalThis.navigator, 'credentials', {
      value: { create: createMock },
      configurable: true,
    });
    const w = mountPage();
    await flushPromises();
    const toasts = useToastStore();
    const successSpy = vi.spyOn(toasts, 'success');

    // Footer "Add Passkey" button.
    await w.find('.security-settings-page__card-footer button').trigger('click');
    await flushPromises();

    const urls = fetchFn.mock.calls.map((c) => String(c[0]));
    expect(urls.some((u) => isRoute(u, REGISTER_OPTIONS_PATH))).toBe(true);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(urls.some((u) => isRoute(u, REGISTER_VERIFY_PATH))).toBe(true);
    expect(successSpy).toHaveBeenCalledWith('Passkey registered successfully');
    w.unmount();
  });
});
