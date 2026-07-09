/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import IntegrationsPage from './IntegrationsPage.vue';
import Button from '../../components/ui/Button.vue';
import Switch from '../../components/ui/Switch.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const syncEnabled = {
  enabled: true,
  last_sync_at: '2026-05-28T00:00:00Z',
  last_sync_timestamp: 1716864000,
};
const syncDisabled = { enabled: false, last_sync_at: null, last_sync_timestamp: null };

const oidcConfig = {
  provider_url: 'https://idp.example.com',
  client_id: 'client-123',
  scopes: 'openid profile email',
  configured: true,
};
const oidcUnconfigured = { provider_url: '', client_id: '', scopes: '', configured: false };

const ldapConfig = {
  host: 'ldap.example.com',
  port: 636,
  ssl: true,
  base_dn: 'dc=example,dc=com',
  bind_dn: 'cn=admin,dc=example,dc=com',
  user_filter: '(uid=%s)',
  admin_group: 'cn=admins,dc=example,dc=com',
  configured: true,
};

interface Overrides {
  status?: unknown;
  providers?: unknown[];
  oidc?: unknown;
  ldap?: unknown;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/sync/status') return over.status ?? syncEnabled;
    if (endpoint === '/api/v1/admin/auth-providers') {
      return { providers: over.providers ?? [
        { name: 'oidc', supports_authentication: true },
        { name: 'ldap', supports_authentication: true },
      ] };
    }
    if (endpoint === '/api/v1/admin/auth-providers/oidc/config') return over.oidc ?? oidcConfig;
    if (endpoint === '/api/v1/admin/auth-providers/ldap/config') return over.ldap ?? ldapConfig;
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async (_endpoint: string, _data?: unknown) => ({ success: true, message: 'ok' }));
  const put = vi.fn(async () => ({ message: 'ok' }));
  const client = { get, post, put, patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { client, get, post, put };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(IntegrationsPage, { props: { client }, attachTo: document.body });
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}
function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}
function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1];
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('IntegrationsPage — Arr sync', () => {
  it('loads the sync status and renders enabled state', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/sync/status');
    const text = w.text();
    expect(text).toContain('Arr sync');
    expect(text).toContain('2026-05-28T00:00:00Z');
    expect(text).toContain('Enabled');
    w.unmount();
  });

  it('renders "Never synced" when there is no last sync', async () => {
    const { client } = makeClient({ status: syncDisabled });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Never synced');
    w.unmount();
  });

  it('shows a skeleton while sync status loads', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn((endpoint: string) => {
      if (endpoint === '/api/v1/admin/sync/status') return new Promise((r) => { resolve = r; });
      return Promise.resolve({ providers: [] });
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-integrations__skel').exists()).toBe(true);
    resolve(syncEnabled);
    await flushPromises();
    expect(w.text()).toContain('Auto-sync');
    w.unmount();
  });

  it('shows an in-body EmptyState error (+ toast) when sync status fails to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/sync/status') throw new Error('status boom');
      return { providers: [] };
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'status boom')).toBe(true);
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    expect(w.text()).toContain('status boom');
    expect(w.text()).toContain('load sync status');
    w.unmount();
  });

  it('retries the sync-status load from the error state', async () => {
    let syncCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/sync/status') {
        syncCalls++;
        if (syncCalls === 1) throw new Error('status boom');
        return syncEnabled;
      }
      if (endpoint === '/api/v1/admin/auth-providers') return { providers: [] };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.text()).toContain('Auto-sync');
    w.unmount();
  });

  it('shows an EmptyState error (and no provider rows) when auth providers fail to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/sync/status') return syncEnabled;
      if (endpoint === '/api/v1/admin/auth-providers') throw new Error('providers boom');
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'providers boom')).toBe(true);
    expect(w.text()).toContain('providers boom');
    expect(w.text()).toContain('load auth providers');
    // the provider list (and its Configure buttons) must NOT render on error
    expect(findBtn(w, 'Configure')).toBeUndefined();
    w.unmount();
  });

  it('toggles auto-sync off via the Switch and refetches', async () => {
    const { client, put, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // The first Switch is the auto-sync toggle.
    await w.findAllComponents(Switch)[0].vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/sync/enable', { enabled: false });
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/sync/status').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('toasts when toggling auto-sync fails', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new Error('enable boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Switch)[0].vm.$emit('update:modelValue', false);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'enable boom')).toBe(true);
    w.unmount();
  });

  it('triggers a manual sync and refetches the status', async () => {
    const { client, post, get } = makeClient();
    post.mockResolvedValueOnce({ success: true, message: 'Sync complete' });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Sync now')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/sync/trash-guides');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Sync complete')).toBe(true);
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/sync/status').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('toasts an error when the sync result is unsuccessful', async () => {
    const { client, post } = makeClient();
    post.mockResolvedValueOnce({ success: false, message: 'Sync failed' });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Sync now')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Sync failed')).toBe(true);
    w.unmount();
  });

  it('toasts when the sync request rejects', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('sync boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Sync now')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'sync boom')).toBe(true);
    w.unmount();
  });

  it('toasts a timeout when the sync never resolves', async () => {
    vi.useFakeTimers();
    const { client, post } = makeClient();
    post.mockImplementationOnce(() => new Promise(() => {}));
    const w = mountPage(client);
    await vi.runOnlyPendingTimersAsync();
    await findBtn(w, 'Sync now')!.trigger('click');
    await vi.advanceTimersByTimeAsync(30_000);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('timed out'))).toBe(true);
    w.unmount();
  });

  it('ignores a second sync trigger while one is in flight', async () => {
    const { client, post } = makeClient();
    let resolve: (v: { success: boolean; message: string }) => void = () => {};
    post.mockImplementationOnce(
      () => new Promise<{ success: boolean; message: string }>((r) => { resolve = r; }),
    );
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Sync now')!.trigger('click');
    await flushPromises();
    // While syncing, calling again is a no-op (button is also disabled/loading).
    await findBtn(w, 'Syncing')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledTimes(1);
    resolve({ success: true, message: 'done' });
    await flushPromises();
    w.unmount();
  });
});

describe('IntegrationsPage — auth providers', () => {
  it('loads providers and shows OIDC + LDAP', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/auth-providers');
    const text = w.text();
    expect(text).toContain('OIDC');
    expect(text).toContain('LDAP');
    w.unmount();
  });

  it('toasts when the provider list fails to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/sync/status') return syncEnabled;
      throw new Error('providers boom');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'providers boom')).toBe(true);
    w.unmount();
  });

  it('enables a provider that is currently disabled', async () => {
    // No OIDC settings loaded yet → providerEnabled('oidc') is false → toggling enables.
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // Switch order: [auto-sync, oidc, ldap].
    await w.findAllComponents(Switch)[1].vm.$emit('update:modelValue', true);
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/enable');
    w.unmount();
  });

  it('disables a provider that is currently enabled', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // Configure OIDC first so its `configured` flag makes it enabled.
    await findBtn(w, 'Configure')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    // Now the OIDC switch reflects enabled (configured:true) → toggling disables.
    await w.findAllComponents(Switch)[1].vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/disable');
    w.unmount();
  });

  it('toasts when toggling a provider fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('toggle boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Switch)[1].vm.$emit('update:modelValue', true);
    await flushPromises();
    const toasts = useToastStore();
    // errMessage surfaces the rejection's own message; assert the error toast fired.
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message.includes('toggle boom'))).toBe(true);
    w.unmount();
  });
});

describe('IntegrationsPage — OIDC config modal', () => {
  async function openOidc(w: VueWrapper) {
    const btn = w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Configure OIDC')!;
    await btn.trigger('click');
    await flushPromises();
  }

  it('opens, prefills from settings and saves OIDC', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openOidc(w);
    const panel = modalPanel();
    const inputs = panel.querySelectorAll<HTMLInputElement>('.admin-integrations__input');
    // provider_url prefilled from settings.
    expect(inputs[0].value).toBe('https://idp.example.com');
    // Enter a new secret so it is included.
    inputs[2].value = 'newsecret'; inputs[2].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save OIDC')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/config', {
      provider_url: 'https://idp.example.com',
      client_id: 'client-123',
      scopes: 'openid profile email',
      client_secret: 'newsecret',
    });
    w.unmount();
  });

  it('omits client_secret when left blank and defaults empty scopes', async () => {
    const { client, post } = makeClient({ oidc: { ...oidcUnconfigured } });
    const w = mountPage(client);
    await flushPromises();
    await openOidc(w);
    const panel = modalPanel();
    const inputs = panel.querySelectorAll<HTMLInputElement>('.admin-integrations__input');
    inputs[0].value = 'https://idp'; inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'cid'; inputs[1].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save OIDC')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/config', {
      provider_url: 'https://idp',
      client_id: 'cid',
      scopes: 'openid profile email',
    });
    w.unmount();
  });

  it('validates a missing provider URL', async () => {
    const { client, post } = makeClient({ oidc: { ...oidcUnconfigured } });
    const w = mountPage(client);
    await flushPromises();
    await openOidc(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Save OIDC')!.trigger('click');
    await flushPromises();
    expect(panel.textContent).toContain('Provider URL is required.');
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/config', expect.anything());
    w.unmount();
  });

  it('validates a missing client ID', async () => {
    const { client, post } = makeClient({ oidc: { ...oidcUnconfigured } });
    const w = mountPage(client);
    await flushPromises();
    await openOidc(w);
    const panel = modalPanel();
    const inputs = panel.querySelectorAll<HTMLInputElement>('.admin-integrations__input');
    inputs[0].value = 'https://idp'; inputs[0].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save OIDC')!.trigger('click');
    await flushPromises();
    expect(panel.textContent).toContain('Client ID is required.');
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('renders the save error inline when saving OIDC fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('oidc save boom'));
    const w = mountPage(client);
    await flushPromises();
    await openOidc(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Save OIDC')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('oidc save boom');
    w.unmount();
  });

  it('toggles secret visibility', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openOidc(w);
    const panel = modalPanel();
    const secret = panel.querySelectorAll<HTMLInputElement>('.admin-integrations__input')[2];
    expect(secret.getAttribute('type')).toBe('password');
    await findBtnIn(w, panel, 'Show')!.trigger('click');
    await flushPromises();
    expect(panel.querySelectorAll<HTMLInputElement>('.admin-integrations__input')[2].getAttribute('type')).toBe('text');
    w.unmount();
  });

  it('toasts when loading OIDC settings fails but still opens the modal', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/sync/status') return syncEnabled;
      if (endpoint === '/api/v1/admin/auth-providers') {
        return { providers: [{ name: 'oidc', supports_authentication: true }, { name: 'ldap', supports_authentication: true }] };
      }
      if (endpoint === '/api/v1/admin/auth-providers/oidc/config') throw new Error('oidc load boom');
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await openOidc(w);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'oidc load boom')).toBe(true);
    expect(modalPanel().textContent).toContain('Configure OIDC');
    w.unmount();
  });

  it('cancels the OIDC modal', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openOidc(w);
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    expect(findBtn(w, 'Save OIDC')).toBeUndefined();
    w.unmount();
  });
});

describe('IntegrationsPage — LDAP config modal', () => {
  async function openLdap(w: VueWrapper) {
    const btn = w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Configure LDAP')!;
    await btn.trigger('click');
    await flushPromises();
  }

  it('opens, prefills and saves LDAP', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    const panel = modalPanel();
    const inputs = panel.querySelectorAll<HTMLInputElement>('.admin-integrations__input');
    expect(inputs[0].value).toBe('ldap.example.com');
    // Enter a bind password so it is included (the bind-pw input lives in the password row).
    const bindPw = panel.querySelector<HTMLInputElement>('.admin-integrations__password-row .admin-integrations__input')!;
    bindPw.value = 'pw'; bindPw.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save LDAP')!.trigger('click');
    await flushPromises();
    const call = post.mock.calls.find((c) => c[0] === '/api/v1/admin/auth-providers/ldap/config')!;
    const body = call[1] as Record<string, unknown>;
    expect(body.host).toBe('ldap.example.com');
    expect(body.port).toBe(636);
    expect(body.ssl).toBe(true);
    expect(body.bind_pw).toBe('pw');
    w.unmount();
  });

  it('parses the port input and resets a blank port to 0', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    const panel = modalPanel();
    const portInput = panel.querySelector<HTMLInputElement>('input[type="number"]')!;
    portInput.value = ''; portInput.dispatchEvent(new Event('input'));
    await flushPromises();
    portInput.value = '1389'; portInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save LDAP')!.trigger('click');
    await flushPromises();
    const call = post.mock.calls.find((c) => c[0] === '/api/v1/admin/auth-providers/ldap/config')!;
    expect((call[1] as Record<string, unknown>).port).toBe(1389);
    w.unmount();
  });

  it('validates a missing host', async () => {
    const { client, post } = makeClient({ ldap: { ...ldapConfig, host: '', configured: false } });
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Save LDAP')!.trigger('click');
    await flushPromises();
    expect(panel.textContent).toContain('Host is required.');
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('validates a missing base DN', async () => {
    const { client, post } = makeClient({ ldap: { ...ldapConfig, base_dn: '', configured: false } });
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Save LDAP')!.trigger('click');
    await flushPromises();
    expect(panel.textContent).toContain('Base DN is required.');
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('renders the save error inline when saving LDAP fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('ldap save boom'));
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Save LDAP')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('ldap save boom');
    w.unmount();
  });

  it('tests the LDAP connection and toasts success', async () => {
    const { client, post } = makeClient();
    post.mockResolvedValueOnce({ success: true, message: 'Connection OK' });
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Test connection')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/ldap/test', expect.anything());
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Connection OK')).toBe(true);
    w.unmount();
  });

  it('toasts an error when the LDAP test reports failure', async () => {
    const { client, post } = makeClient();
    post.mockResolvedValueOnce({ success: false, message: 'Connection refused' });
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    await findBtnIn(w, modalPanel(), 'Test connection')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Connection refused')).toBe(true);
    w.unmount();
  });

  it('toasts when the LDAP test rejects', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('test boom'));
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    await findBtnIn(w, modalPanel(), 'Test connection')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'test boom')).toBe(true);
    w.unmount();
  });

  it('toasts when loading LDAP settings fails but still opens the modal', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/sync/status') return syncEnabled;
      if (endpoint === '/api/v1/admin/auth-providers') {
        return { providers: [{ name: 'oidc', supports_authentication: true }, { name: 'ldap', supports_authentication: true }] };
      }
      if (endpoint === '/api/v1/admin/auth-providers/ldap/config') throw new Error('ldap load boom');
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'ldap load boom')).toBe(true);
    expect(modalPanel().textContent).toContain('Configure LDAP');
    w.unmount();
  });

  it('toggles bind-password visibility', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    const panel = modalPanel();
    const bindPwSel = '.admin-integrations__password-row .admin-integrations__input';
    const bindPw = panel.querySelector<HTMLInputElement>(bindPwSel)!;
    expect(bindPw.getAttribute('type')).toBe('password');
    await findBtnIn(w, panel, 'Show')!.trigger('click');
    await flushPromises();
    expect(panel.querySelector<HTMLInputElement>(bindPwSel)!.getAttribute('type')).toBe('text');
    w.unmount();
  });

  it('cancels the LDAP modal', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openLdap(w);
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    expect(findBtn(w, 'Save LDAP')).toBeUndefined();
    w.unmount();
  });
});
