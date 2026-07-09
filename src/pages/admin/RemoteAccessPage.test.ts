/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import RemoteAccessPage from './RemoteAccessPage.vue';
import Button from '../../components/ui/Button.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

interface Over {
  hub?: unknown;
  subdomain?: unknown;
  relay?: unknown;
  portforward?: unknown;
  candidates?: unknown;
}

function makeClient(over: Over = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/remote/hub/status') return over.hub ?? { paired: false };
    if (endpoint === '/api/v1/admin/remote/subdomain/status') return over.subdomain ?? { claimed: false };
    if (endpoint === '/api/v1/admin/remote/relay/status') return over.relay ?? { connected: false, active: false };
    if (endpoint === '/api/v1/admin/remote/portforward/status') return over.portforward ?? { enabled: false };
    if (endpoint === '/api/v1/admin/remote/portforward/candidates') {
      return { candidates: over.candidates ?? [] };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({ success: true, latencyMs: 42, receivedAt: 't' }));
  const client = { get, post, put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { client, get, post };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(RemoteAccessPage, { props: { client }, attachTo: document.body });
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}
function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text && root.contains(b.element));
}
function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1];
}
/** Expand a collapsed section by its heading text. */
async function expandSection(w: VueWrapper, heading: string): Promise<void> {
  const btn = w.findAll('.admin-remote__section-header').find((b) => b.text().includes(heading));
  await btn!.trigger('click');
  await flushPromises();
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Admin RemoteAccessPage — layout & loading', () => {
  it('renders the heading and all four section headings', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('Remote Access');
    expect(text).toContain('Hub Pairing');
    expect(text).toContain('Subdomain');
    expect(text).toContain('Relay Tunnel');
    expect(text).toContain('Port Forward');
    w.unmount();
  });

  it('loads all four section statuses on mount', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/hub/status');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/subdomain/status');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/relay/status');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/portforward/status');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/portforward/candidates');
    w.unmount();
  });

  it('shows a skeleton in the open hub section while loading', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-remote__skel').exists()).toBe(true);
    resolve({ paired: false });
    await flushPromises();
    w.unmount();
  });
});

describe('Admin RemoteAccessPage — hub pairing', () => {
  it('shows Not paired with an Initiate Pairing button', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Not paired');
    expect(findBtn(w, 'Initiate Pairing')).toBeTruthy();
    w.unmount();
  });

  it('shows paired status with Send Heartbeat and Unenroll', async () => {
    const { client } = makeClient({ hub: { paired: true, serverId: 'srv-123', hubUrl: 'https://h', enrolledAt: '2024-01-15T10:00:00Z' } });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Paired (srv-123)');
    expect(findBtn(w, 'Send Heartbeat')).toBeTruthy();
    expect(findBtn(w, 'Unenroll')).toBeTruthy();
    w.unmount();
  });

  it('shows an in-body EmptyState error when hub status fails to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/remote/hub/status') throw new Error('hub boom');
      if (endpoint === '/api/v1/admin/remote/portforward/candidates') return { candidates: [] };
      return {};
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'hub boom')).toBe(true);
    // hub section is expanded by default → its EmptyState (error + Retry) renders in-body
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    expect(w.text()).toContain('hub boom');
    expect(w.text()).toContain('load hub status');
    w.unmount();
  });

  it('retries the hub-status load from the error state', async () => {
    let hubCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/remote/hub/status') {
        hubCalls++;
        if (hubCalls === 1) throw new Error('hub boom');
        return { paired: false };
      }
      if (endpoint === '/api/v1/admin/remote/portforward/candidates') return { candidates: [] };
      return {};
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(findBtn(w, 'Initiate Pairing')).toBeTruthy();
    w.unmount();
  });

  it('sends a heartbeat and toasts success', async () => {
    const { client, post } = makeClient({ hub: { paired: true, serverId: 'srv-1' } });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Send Heartbeat')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/heartbeat');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Heartbeat sent.')).toBe(true);
    w.unmount();
  });

  it('toasts when the heartbeat fails', async () => {
    const { client, post } = makeClient({ hub: { paired: true } });
    post.mockRejectedValueOnce(new Error('hb boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Send Heartbeat')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'hb boom')).toBe(true);
    w.unmount();
  });

  it('unenrolls and refetches the hub status', async () => {
    const { client, post, get } = makeClient({ hub: { paired: true } });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Unenroll')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/unenroll');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/remote/hub/status').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('toasts when unenroll fails', async () => {
    const { client, post } = makeClient({ hub: { paired: true } });
    post.mockRejectedValueOnce(new Error('unenroll boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Unenroll')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'unenroll boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin RemoteAccessPage — pairing modal', () => {
  async function openModal(w: VueWrapper) {
    await findBtn(w, 'Initiate Pairing')!.trigger('click');
    await flushPromises();
  }

  it('rejects an empty Hub URL when initiating from the modal button', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openModal(w);
    // The footer Initiate Pairing button is disabled while URL empty; call the
    // form-submit path which guards on the empty URL.
    await modalPanel().querySelector('form')!.dispatchEvent(new Event('submit'));
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Hub URL is required.')).toBe(true);
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/remote/hub/pair', expect.anything());
    w.unmount();
  });

  it('initiates pairing, shows the claim code, polls, completes and refetches', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/remote/hub/pair') return { success: true, claimCode: 'CODE123', claimId: 'id-456', serverId: '', hubUrl: 'h' };
      if (endpoint === '/api/v1/admin/remote/hub/poll') return { success: true, token: 'jwt-abc', serverId: 'srv-9' };
      if (endpoint === '/api/v1/admin/remote/hub/complete') return { success: true };
      return { success: true };
    });
    const { client, get } = makeClient();
    (client as unknown as { post: typeof post }).post = post;
    const w = mountPage(client);
    await flushPromises();
    await openModal(w);
    const urlInput = modalPanel().querySelector<HTMLInputElement>('.admin-remote__input')!;
    urlInput.value = 'https://hub.example.com';
    urlInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Initiate Pairing')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/pair', {
      hubUrl: 'https://hub.example.com',
      serverName: 'Phlix Server',
    });
    expect(modalPanel().textContent).toContain('CODE123');
    // Poll → complete.
    await findBtnIn(w, modalPanel(), 'Poll for Completion')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/poll', {
      claimId: 'id-456',
      hubUrl: 'https://hub.example.com',
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/complete', {
      enrollmentJwt: 'jwt-abc',
      hubJwksUrl: '',
      serverId: 'srv-9',
      hubUrl: 'https://hub.example.com',
    });
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/remote/hub/status').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('toasts the poll message when the claim is still pending', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/remote/hub/pair') return { success: true, claimCode: 'C', claimId: 'id-1', serverId: '', hubUrl: 'h' };
      if (endpoint === '/api/v1/admin/remote/hub/poll') return { success: false, message: 'Claim is still pending.' };
      return { success: true };
    });
    const { client } = makeClient();
    (client as unknown as { post: typeof post }).post = post;
    const w = mountPage(client);
    await flushPromises();
    await openModal(w);
    const urlInput = modalPanel().querySelector<HTMLInputElement>('.admin-remote__input')!;
    urlInput.value = 'https://h'; urlInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Initiate Pairing')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Poll for Completion')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Claim is still pending.')).toBe(true);
    w.unmount();
  });

  it('toasts when initiating pairing fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('pair boom'));
    const w = mountPage(client);
    await flushPromises();
    await openModal(w);
    const urlInput = modalPanel().querySelector<HTMLInputElement>('.admin-remote__input')!;
    urlInput.value = 'https://h'; urlInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Initiate Pairing')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'pair boom')).toBe(true);
    w.unmount();
  });

  it('toasts when polling fails', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/remote/hub/pair') return { success: true, claimCode: 'C', claimId: 'id-1', serverId: '', hubUrl: 'h' };
      throw new Error('poll boom');
    });
    const { client } = makeClient();
    (client as unknown as { post: typeof post }).post = post;
    const w = mountPage(client);
    await flushPromises();
    await openModal(w);
    const urlInput = modalPanel().querySelector<HTMLInputElement>('.admin-remote__input')!;
    urlInput.value = 'https://h'; urlInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Initiate Pairing')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Poll for Completion')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'poll boom')).toBe(true);
    w.unmount();
  });

  it('cancels the pairing modal', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openModal(w);
    expect(modalPanel()).toBeTruthy();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    expect(document.querySelector('.phlix-modal__panel')).toBeNull();
    w.unmount();
  });
});

describe('Admin RemoteAccessPage — subdomain', () => {
  it('shows claimed details with a Release button', async () => {
    const { client } = makeClient({ subdomain: { claimed: true, subdomain: 'myserver', fqdn: 'myserver.hub.example.com' } });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Subdomain');
    expect(document.body.textContent).toContain('myserver.hub.example.com');
    expect(findBtn(w, 'Release Subdomain')).toBeTruthy();
    w.unmount();
  });

  it('claims a subdomain and refetches', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Subdomain');
    await findBtn(w, 'Claim Subdomain')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/subdomain/claim');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/remote/subdomain/status').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('releases a subdomain', async () => {
    const { client, post } = makeClient({ subdomain: { claimed: true, subdomain: 's' } });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Subdomain');
    await findBtn(w, 'Release Subdomain')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/subdomain/release');
    w.unmount();
  });

  it('toasts when claim fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('claim boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Subdomain');
    await findBtn(w, 'Claim Subdomain')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'claim boom')).toBe(true);
    w.unmount();
  });

  it('toasts when release fails', async () => {
    const { client, post } = makeClient({ subdomain: { claimed: true } });
    post.mockRejectedValueOnce(new Error('release boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Subdomain');
    await findBtn(w, 'Release Subdomain')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'release boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin RemoteAccessPage — relay tunnel', () => {
  it('shows connected status with Ping and Disable buttons', async () => {
    const { client } = makeClient({ relay: { connected: true, active: true } });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    expect(document.body.textContent).toContain('Connected');
    expect(findBtn(w, 'Ping')).toBeTruthy();
    expect(findBtn(w, 'Disable')).toBeTruthy();
    w.unmount();
  });

  it('disables Ping while disconnected and shows an Enable button', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    expect(findBtn(w, 'Ping')!.attributes('disabled')).toBeDefined();
    expect(findBtn(w, 'Enable')).toBeTruthy();
    w.unmount();
  });

  it('enables the relay and refetches', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Enable')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/enable');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/remote/relay/status').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('disables the relay', async () => {
    const { client, post } = makeClient({ relay: { connected: true, active: true } });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Disable')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/disable');
    w.unmount();
  });

  it('pings the relay and shows the latency summary', async () => {
    const post = vi.fn(async () => ({ success: true, latencyMs: 42 }));
    const { client } = makeClient({ relay: { connected: true, active: true } });
    (client as unknown as { post: typeof post }).post = post;
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Ping')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/ping');
    expect(w.text()).toContain('42ms latency');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Relay latency: 42ms')).toBe(true);
    w.unmount();
  });

  it('toasts when enable fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('relay enable boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Enable')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'relay enable boom')).toBe(true);
    w.unmount();
  });

  it('toasts when disable fails', async () => {
    const { client, post } = makeClient({ relay: { connected: true, active: true } });
    post.mockRejectedValueOnce(new Error('relay disable boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Disable')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'relay disable boom')).toBe(true);
    w.unmount();
  });

  it('toasts when ping fails', async () => {
    const { client, post } = makeClient({ relay: { connected: true, active: true } });
    post.mockRejectedValueOnce(new Error('ping boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Ping')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'ping boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin RemoteAccessPage — port forward', () => {
  it('shows enabled status with a Disable button and candidates', async () => {
    const { client } = makeClient({
      portforward: { enabled: true, method: 'upnp', externalIp: '203.0.113.50', externalPort: 32400 },
      candidates: [{ hostname: 'http://192.168.1.100:32400', externalIp: '192.168.1.100', port: 32400 }],
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Port Forward');
    expect(document.body.textContent).toContain('upnp');
    expect(document.body.textContent).toContain('Hostname Candidates');
    expect(document.body.textContent).toContain('http://192.168.1.100:32400');
    expect(findBtn(w, 'Disable')).toBeTruthy();
    w.unmount();
  });

  it('shows the disabled summary and an Enable button', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Port Forward');
    expect(w.text()).toContain('Disabled');
    expect(findBtn(w, 'Enable')).toBeTruthy();
    w.unmount();
  });

  it('enables port forwarding and refetches', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Port Forward');
    await findBtn(w, 'Enable')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/portforward/enable');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/remote/portforward/status').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('disables port forwarding', async () => {
    const { client, post } = makeClient({ portforward: { enabled: true } });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Port Forward');
    await findBtn(w, 'Disable')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/portforward/disable');
    w.unmount();
  });

  it('toasts when enable fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('pf enable boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Port Forward');
    await findBtn(w, 'Enable')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'pf enable boom')).toBe(true);
    w.unmount();
  });

  it('toasts when disable fails', async () => {
    const { client, post } = makeClient({ portforward: { enabled: true } });
    post.mockRejectedValueOnce(new Error('pf disable boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Port Forward');
    await findBtn(w, 'Disable')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'pf disable boom')).toBe(true);
    w.unmount();
  });

  it('toasts when the port-forward status fails to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/remote/portforward/status') throw new Error('pf boom');
      if (endpoint === '/api/v1/admin/remote/portforward/candidates') return { candidates: [] };
      if (endpoint === '/api/v1/admin/remote/hub/status') return { paired: false };
      if (endpoint === '/api/v1/admin/remote/subdomain/status') return { claimed: false };
      if (endpoint === '/api/v1/admin/remote/relay/status') return { connected: false, active: false };
      return {};
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Port Forward');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'pf boom')).toBe(true);
    expect(document.body.textContent).toContain('pf boom');
    expect(document.body.textContent).toContain('load port-forward status');
    w.unmount();
  });
});

describe('Admin RemoteAccessPage — section expand/collapse', () => {
  it('hub section is expanded by default; others collapsed', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // Hub body visible.
    expect(w.find('#remote-hub-body').exists()).toBe(true);
    // Subdomain body hidden until expanded.
    expect(w.find('#remote-subdomain-body').exists()).toBe(false);
    w.unmount();
  });

  it('collapses the hub section when its header is clicked', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Hub Pairing');
    expect(w.find('#remote-hub-body').exists()).toBe(false);
    w.unmount();
  });
});
