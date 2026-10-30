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

/**
 * The shared ConfirmDialog (R13-05) renders inside a `<Modal>`, which teleports
 * to `document.body` — so its footer buttons are invisible to the page wrapper
 * and must be reached through the DOM directly.
 */
function dialogButton(affirmative: boolean): HTMLButtonElement {
  const buttons = Array.from(
    document.body.querySelectorAll<HTMLButtonElement>('.phlix-modal__footer button'),
  );
  const btn = affirmative
    ? buttons.find((b) => b.dataset.testid === 'confirm-dialog-affirmative')
    : buttons.find((b) => b.dataset.testid !== 'confirm-dialog-affirmative');
  if (!btn) throw new Error(`ConfirmDialog ${affirmative ? 'affirmative' : 'cancel'} button not found`);
  return btn;
}

async function clickDialogButton(affirmative: boolean): Promise<void> {
  dialogButton(affirmative).click();
  await flushPromises();
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
    expect(w.text()).toContain("Couldn’t load passkeys");
    w.unmount();
  });

  it('deletes a passkey after confirming in the shared dialog and toasts success', async () => {
    const fetchFn = stubFetch({ credentials: [credential({ credential_id: 'toDelete-abcdefghijklmnop' })] });
    const w = mountPage();
    await flushPromises();
    const toasts = useToastStore();
    const successSpy = vi.spyOn(toasts, 'success');

    // R13-05: the delete button ARMS the ConfirmDialog; nothing is sent until
    // the user affirms it.
    await w.find('.credential-item__delete').trigger('click');
    await flushPromises();
    expect(
      fetchFn.mock.calls.some((c) => (c[1] as RequestInit | undefined)?.method === 'DELETE'),
    ).toBe(false);
    expect(dialogButton(true).closest('.phlix-modal')).toBeTruthy();
    expect(document.body.textContent).toContain('Deleting this passkey is permanent');
    await clickDialogButton(true);

    const deleteCall = fetchFn.mock.calls.find(
      (c) => (c[1] as RequestInit | undefined)?.method === 'DELETE',
    );
    expect(deleteCall).toBeTruthy();
    expect(isRoute(deleteCall![0], credentialPath('toDelete-abcdefghijklmnop'))).toBe(true);
    expect(successSpy).toHaveBeenCalledWith('Passkey deleted successfully.');
    w.unmount();
  });

  it('does NOT delete when the confirm dialog is dismissed', async () => {
    const fetchFn = stubFetch({ credentials: [credential()] });
    const w = mountPage();
    await flushPromises();

    await w.find('.credential-item__delete').trigger('click');
    await flushPromises();
    await clickDialogButton(false);
    expect(fetchFn.mock.calls.some((c) => (c[1] as RequestInit | undefined)?.method === 'DELETE')).toBe(false);
    w.unmount();
  });

  it('runs the full WebAuthn register round-trip: options → create → verify', async () => {
    const fetchFn = stubFetch({ credentials: [] });
    const createMock = vi.fn(async (_options: CredentialCreationOptions) => fakeCredential());
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
    expect(successSpy).toHaveBeenCalledWith('Passkey registered successfully.');
    w.unmount();
  });

  // R13-03 pins -------------------------------------------------------------

  it('sends the server-resolved real identity as user.name/displayName', async () => {
    const fn = vi.fn((url: unknown, init?: RequestInit) => {
      const u = typeof url === 'string' ? url : '';
      const method = (init?.method ?? 'GET').toUpperCase();
      if (isRoute(u, CREDENTIALS_PATH)) {
        return Promise.resolve(jsonResponse({ credentials: [] }));
      }
      if (isRoute(u, REGISTER_OPTIONS_PATH)) {
        return Promise.resolve(jsonResponse({
          challenge: btoa('challenge-bytes'),
          user: {
            id: btoa('user-id'),
            name: 'alice@example.com',
            displayName: 'Alice Example',
          },
          excludeCredentials: [],
        }));
      }
      if (isRoute(u, REGISTER_VERIFY_PATH) && method === 'POST') {
        return Promise.resolve(jsonResponse({ credential_id: 'newcred' }));
      }
      return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
    });
    vi.stubGlobal('fetch', fn);
    const createMock = vi.fn(async (_options: CredentialCreationOptions) => fakeCredential());
    Object.defineProperty(globalThis.navigator, 'credentials', {
      value: { create: createMock },
      configurable: true,
    });
    const w = mountPage();
    await flushPromises();

    await w.find('.security-settings-page__card-footer button').trigger('click');
    await flushPromises();

    const call = createMock.mock.calls[0][0] as CredentialCreationOptions;
    const user = (call.publicKey as PublicKeyCredentialCreationOptions).user;
    expect(user.name).toBe('alice@example.com');
    expect(user.displayName).toBe('Alice Example');
    w.unmount();
  });

  it('omits authenticatorAttachment by default and honours an explicit choice', async () => {
    stubFetch({ credentials: [] });
    const createMock = vi.fn(async (_options: CredentialCreationOptions) => fakeCredential());
    Object.defineProperty(globalThis.navigator, 'credentials', {
      value: { create: createMock },
      configurable: true,
    });
    const w = mountPage();
    await flushPromises();

    // Default: "Let device decide" — NO authenticatorAttachment constraint.
    await w.find('.security-settings-page__card-footer button').trigger('click');
    await flushPromises();
    let options = createMock.mock.calls[0][0] as CredentialCreationOptions;
    let selection = (options.publicKey as PublicKeyCredentialCreationOptions).authenticatorSelection;
    expect(selection).toBeDefined();
    expect(selection && 'authenticatorAttachment' in selection).toBe(false);

    // Explicit: "Device passkey" → platform.
    const radios = w.findAll('input[name="passkey-attachment"]');
    expect(radios).toHaveLength(3);
    await radios[1].setValue('platform');
    await w.find('.security-settings-page__card-footer button').trigger('click');
    await flushPromises();
    options = createMock.mock.calls[1][0] as CredentialCreationOptions;
    selection = (options.publicKey as PublicKeyCredentialCreationOptions).authenticatorSelection;
    expect(selection?.authenticatorAttachment).toBe('platform');
    w.unmount();
  });

  it('shows a neutral status line when registration is cancelled (NotAllowedError)', async () => {
    stubFetch({ credentials: [] });
    const cancelled = new Error('The operation was aborted by the user.');
    cancelled.name = 'NotAllowedError';
    Object.defineProperty(globalThis.navigator, 'credentials', {
      value: { create: async () => { throw cancelled; } },
      configurable: true,
    });
    const w = mountPage();
    await flushPromises();
    const toasts = useToastStore();
    const errorSpy = vi.spyOn(toasts, 'error');

    await w.find('.security-settings-page__card-footer button').trigger('click');
    await flushPromises();

    expect(w.find('.security-settings-page__status').text())
      .toBe('Registration was cancelled or timed out — try again.');
    expect(errorSpy).not.toHaveBeenCalled();
    w.unmount();
  });

  it('renders a stored nickname in the list and falls back to kind "Passkey" for null device_type', async () => {
    localStorage.setItem(
      'phlix.passkey-meta',
      JSON.stringify({ abcdefghijklmnopqrstuvwxyz012345: { nickname: 'Work laptop' } }),
    );
    stubFetch({ credentials: [credential({ device_type: null as unknown as Credential['device_type'] })] });
    const w = mountPage();
    await flushPromises();

    const item = w.find('.credential-item');
    expect(item.text()).toContain('Work laptop');
    // Server stores device_type NULL today; without local kind metadata the
    // honest label is 'Passkey', never 'Security key'.
    expect(item.text()).toContain('Passkey');
    expect(item.text()).not.toContain('Security key');
    w.unmount();
  });

  it('stores the chosen nickname against the credential id echoed by verify', async () => {
    const fn = vi.fn((url: unknown, init?: RequestInit) => {
      const u = typeof url === 'string' ? url : '';
      const method = (init?.method ?? 'GET').toUpperCase();
      if (isRoute(u, CREDENTIALS_PATH)) {
        return Promise.resolve(jsonResponse({ credentials: [] }));
      }
      if (isRoute(u, REGISTER_OPTIONS_PATH)) {
        return Promise.resolve(jsonResponse({
          challenge: btoa('challenge-bytes'),
          user: { id: btoa('user-id') },
          excludeCredentials: [],
        }));
      }
      if (isRoute(u, REGISTER_VERIFY_PATH) && method === 'POST') {
        return Promise.resolve(jsonResponse({ credential_id: 'echoed-cred-id' }));
      }
      return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
    });
    vi.stubGlobal('fetch', fn);
    Object.defineProperty(globalThis.navigator, 'credentials', {
      value: { create: async () => fakeCredential() },
      configurable: true,
    });
    const w = mountPage();
    await flushPromises();

    await w.find('.register-form__input').setValue('Phone passkey');
    await w.find('.security-settings-page__card-footer button').trigger('click');
    await flushPromises();

    const raw = localStorage.getItem('phlix.passkey-meta');
    expect(raw).toBeTruthy();
    const meta = JSON.parse(raw!) as Record<string, { nickname?: string }>;
    expect(meta['echoed-cred-id']?.nickname).toBe('Phone passkey');
    w.unmount();
  });
});
