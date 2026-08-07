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
import { ApiError } from '../../api/errors';
import type { ApiClient } from '../../api/client';

interface Over {
  hub?: unknown;
  subdomain?: unknown;
  relay?: unknown;
  portforward?: unknown;
  candidates?: unknown;
  /**
   * S251: successive `GET /api/v1/health/network` bodies. Each call shifts the
   * next entry and the LAST one repeats forever, so a test can hand the page two
   * polls carrying the same `measuredAt` (or two different ones) without
   * touching the rest of the stub. Omitted → the pre-S251 single fixed body.
   */
  networkSeq?: unknown[];
  /** S251: body for `GET /api/v1/health/relay`. */
  relayHealth?: unknown;
}

function makeClient(over: Over = {}) {
  const networkSeq = [...(over.networkSeq ?? [])];
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/remote/hub/status') return over.hub ?? { paired: false };
    if (endpoint === '/api/v1/admin/remote/subdomain/status') return over.subdomain ?? { claimed: false };
    if (endpoint === '/api/v1/admin/remote/relay/status') return over.relay ?? { connected: false, active: false };
    if (endpoint === '/api/v1/admin/remote/portforward/status') return over.portforward ?? { enabled: false };
    if (endpoint === '/api/v1/admin/remote/portforward/candidates') {
      return { candidates: over.candidates ?? [] };
    }
    // S134: the Network Health section (and therefore the latency graph, which
    // carries a pluralised measurement count) had NO stub at all before this, so
    // the whole section was unreachable from this suite.
    if (endpoint === '/api/v1/health/relay') {
      return {
        data: over.relayHealth ?? {
          relay: { connected: true, active: true, enrolled: true, disabled: false },
          hub: { reachable: true, consecutiveFailures: 0 },
        },
      };
    }
    if (endpoint === '/api/v1/health/network') {
      if (networkSeq.length > 0) {
        // Shift while more remain; the last body is returned for every further poll.
        const body = networkSeq.length > 1 ? networkSeq.shift() : networkSeq[0];
        return { data: body };
      }
      return { data: { latencyMs: 42, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' } };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async (): Promise<unknown> => ({ success: true, latencyMs: 42, receivedAt: 't' }));
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

describe('Admin RemoteAccessPage — relay tunnel (S39 honest reframe)', () => {
  it('renders the honest status fields (enrolled + kill-switch) and the reload notice', async () => {
    const { client } = makeClient({
      relay: { connected: true, active: true, enrolled: true, disabled: false },
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    const body = w.find('#remote-relay-body').text();
    // Real state fields the server now persists, not a fake success flag.
    expect(body).toContain('Connected');
    expect(body).toContain('Enrolled');
    expect(body).toContain('Kill-switch');
    expect(body).toContain('Enabled');
    // Honest "not instant" notice is always visible on the panel.
    expect(body).toContain('takes effect on the next server reload');
    // Connected + not-disabled → the Disable lever is the offered action.
    expect(findBtn(w, 'Ping')).toBeTruthy();
    expect(findBtn(w, 'Disable')).toBeTruthy();
    expect(findBtn(w, 'Enable')).toBeFalsy();
    w.unmount();
  });

  it('shows an in-body error + retry when the relay status fails to load', async () => {
    let relayCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/remote/relay/status') {
        relayCalls++;
        if (relayCalls === 1) throw new Error('relay boom');
        return { connected: false, active: false, enrolled: true, disabled: false };
      }
      if (endpoint === '/api/v1/admin/remote/portforward/candidates') return { candidates: [] };
      if (endpoint === '/api/v1/admin/remote/hub/status') return { paired: false };
      if (endpoint === '/api/v1/admin/remote/subdomain/status') return { claimed: false };
      if (endpoint === '/api/v1/admin/remote/portforward/status') return { enabled: false };
      return {};
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'relay boom')).toBe(true);
    await expandSection(w, 'Relay Tunnel');
    // Summary reflects the unable-to-load state honestly.
    expect(w.text()).toContain('Unable to load');
    // In-body EmptyState + Retry.
    expect(w.find('#remote-relay-body').text()).toContain('load relay status');
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(w.find('#remote-relay-body').text()).toContain('Disconnected');
    w.unmount();
  });

  it('surfaces the persisted last-connect error reason when the tunnel is down', async () => {
    const { client } = makeClient({
      relay: {
        connected: false,
        active: false,
        enrolled: true,
        disabled: false,
        lastConnectError: 'TLS handshake to a plaintext relay port',
        lastConnectErrorAt: '2024-01-15T10:00:00Z',
      },
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    const body = w.find('#remote-relay-body').text();
    expect(body).toContain('Disconnected');
    expect(body).toContain('Last error');
    expect(body).toContain('TLS handshake to a plaintext relay port');
    // Summary reflects the disconnected-but-enabled state, not a fabricated one.
    expect(w.text()).toContain('Disconnected');
    w.unmount();
  });

  it('shows a Disabled summary + Enable button and disables Ping when the kill-switch is set', async () => {
    const { client } = makeClient({
      relay: { connected: false, active: false, enrolled: true, disabled: true },
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    expect(w.text()).toContain('Disabled');
    expect(findBtn(w, 'Enable')).toBeTruthy();
    expect(findBtn(w, 'Disable')).toBeFalsy();
    expect(findBtn(w, 'Ping')!.attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('shows a Not paired summary when the server is not enrolled', async () => {
    const { client } = makeClient({
      relay: { connected: false, active: false, enrolled: false, disabled: false },
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    expect(w.text()).toContain('Not paired');
    w.unmount();
  });

  it('enables the relay (reload lever), surfaces the server message and refetches', async () => {
    const { client, post, get } = makeClient({
      relay: { connected: false, active: false, enrolled: true, disabled: true },
    });
    post.mockResolvedValueOnce({
      success: true,
      disabled: false,
      enrolled: true,
      takesEffectOnReload: true,
      message: 'Relay enabled; the tunnel will (re)connect on the next server reload.',
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Enable')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/enable');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/remote/relay/status').length).toBeGreaterThan(1);
    const toasts = useToastStore();
    expect(
      toasts.toasts.some(
        (t) => t.message === 'Relay enabled; the tunnel will (re)connect on the next server reload.',
      ),
    ).toBe(true);
    w.unmount();
  });

  it('shows the honest env-forced message as a warning when Enable cannot clear the env kill-switch', async () => {
    const envMsg =
      'Relay kill-switch cleared, but PHLIX_RELAY_DISABLED is set in the environment; '
      + 'the tunnel stays disabled until that is removed and the server reloads.';
    const { client, post } = makeClient({
      relay: { connected: false, active: false, enrolled: true, disabled: true },
    });
    post.mockResolvedValueOnce({
      success: true,
      disabled: true, // env still forces it disabled
      enrolled: true,
      takesEffectOnReload: true,
      message: envMsg,
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Enable')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    const toast = toasts.toasts.find((t) => t.message === envMsg);
    expect(toast).toBeTruthy();
    expect(toast!.tone).toBe('warning');
    w.unmount();
  });

  it('disables the relay (reload lever) and surfaces the server message', async () => {
    const { client, post } = makeClient({
      relay: { connected: true, active: true, enrolled: true, disabled: false },
    });
    post.mockResolvedValueOnce({
      success: true,
      disabled: true,
      enrolled: true,
      takesEffectOnReload: true,
      message: 'Relay disabled; the tunnel will disconnect on the next server reload.',
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Disable')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/disable');
    const toasts = useToastStore();
    expect(
      toasts.toasts.some(
        (t) => t.message === 'Relay disabled; the tunnel will disconnect on the next server reload.',
      ),
    ).toBe(true);
    w.unmount();
  });

  it('pings the relay and shows the persisted latency', async () => {
    const { client, post } = makeClient({
      relay: { connected: true, active: true, enrolled: true, disabled: false },
    });
    post.mockResolvedValueOnce({
      success: true,
      connected: true,
      active: true,
      latencyMs: 42,
      lastHeartbeatAt: '2024-01-15T10:00:00Z',
      latencySource: 'persisted',
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Ping')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/ping');
    expect(w.text()).toContain('42ms latency'); // summary
    expect(w.find('#remote-relay-body').text()).toContain('last recorded heartbeat');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Relay latency: 42ms')).toBe(true);
    w.unmount();
  });

  it('handles a null ping latency gracefully (not measured yet, until S40)', async () => {
    const { client, post } = makeClient({
      relay: { connected: true, active: true, enrolled: true, disabled: false },
    });
    post.mockResolvedValueOnce({
      success: true,
      connected: true,
      active: true,
      latencyMs: null, // no heartbeat recorded yet — honest, not fabricated
      lastHeartbeatAt: null,
      latencySource: 'persisted',
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Ping')!.trigger('click');
    await flushPromises();
    const body = w.find('#remote-relay-body').text();
    expect(body).toContain('Not measured yet');
    expect(body).not.toContain('last recorded heartbeat');
    // Summary must NOT invent a latency number.
    expect(w.text()).not.toContain('ms latency');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Relay connected; latency not measured yet.')).toBe(true);
    w.unmount();
  });

  it('handles the 409 not-connected ping by surfacing the message + last error', async () => {
    const { client, post } = makeClient({
      relay: { connected: true, active: true, enrolled: true, disabled: false },
    });
    post.mockRejectedValueOnce(
      new ApiError('Relay not connected.', 409, {
        success: false,
        connected: false,
        active: false,
        message: 'Relay not connected.',
        lastConnectError: 'TLS handshake to a plaintext relay port',
        lastConnectErrorAt: '2024-01-15T10:00:00Z',
      }),
    );
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    await findBtn(w, 'Ping')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/ping');
    const toasts = useToastStore();
    expect(
      toasts.toasts.some(
        (t) => t.message === 'Relay not connected. (TLS handshake to a plaintext relay port)',
      ),
    ).toBe(true);
    // 409 clears any stale latency line and refetches status.
    expect(w.find('#remote-relay-body').text()).not.toContain('Not measured yet');
    w.unmount();
  });

  it('toasts when enable fails', async () => {
    const { client, post } = makeClient({
      relay: { connected: false, active: false, enrolled: true, disabled: true },
    });
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
    const { client, post } = makeClient({
      relay: { connected: true, active: true, enrolled: true, disabled: false },
    });
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

  it('toasts when ping fails with a non-409 error', async () => {
    const { client, post } = makeClient({
      relay: { connected: true, active: true, enrolled: true, disabled: false },
    });
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


/**
 * S134 — the latency-graph heading and its aria-label go through the shared
 * plural helper.
 *
 * This was the LAST unpinned migrated site: `getHealthSnapshot` was never stubbed
 * anywhere in this 839-line file, so the entire Network Health section — heading,
 * graph, legend and all — was unreachable from the suite, and swapping the plural
 * helper's arguments left everything green. The site is another instance of the
 * shape the plan's four-form inventory could not see: a hard-coded `measurements`
 * with no singular branch, which rendered "last 1 measurements".
 */
describe('RemoteAccessPage — latency-graph pluralisation (S134)', () => {
  async function openHealth(w: VueWrapper): Promise<void> {
    await expandSection(w, 'Network Health');
    await flushPromises();
  }

  it('renders the SINGULAR noun after a single measurement', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openHealth(w);
    const title = w.find('.admin-remote__latency-graph-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Latency History (last 1 measurement)');
    expect(w.find('.admin-remote__latency-bars').attributes('aria-label')).toBe(
      'Latency graph showing 1 measurement',
    );
    w.unmount();
  });

  it('renders the PLURAL noun once a second measurement is recorded', async () => {
    // S251: this test used to reuse ONE fixed `measuredAt` for both polls and
    // still expect two points — it pinned the duplicate-append defect. The
    // second poll now carries a genuinely different `measuredAt`, which is what
    // "a second measurement" means.
    const { client } = makeClient({
      networkSeq: [
        { latencyMs: 42, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' },
        { latencyMs: 43, status: 'healthy', measuredAt: '2026-01-01T00:01:00Z' },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    await openHealth(w);
    // A second Refresh pushes another point onto the history.
    const body = w.find('#remote-networkhealth-body');
    await findBtnIn(w, body.element, 'Refresh')!.trigger('click');
    await flushPromises();
    expect(w.find('.admin-remote__latency-graph-title').text()).toBe(
      'Latency History (last 2 measurements)',
    );
    expect(w.find('.admin-remote__latency-bars').attributes('aria-label')).toBe(
      'Latency graph showing 2 measurements',
    );
    w.unmount();
  });
});


/**
 * S251 — the latency history is keyed on `measuredAt`, and a stale reading is
 * rendered as such.
 *
 * `GET /api/v1/health/network` is a cheap read of the hub-heartbeat fork's
 * PERSISTED snapshot: `measuredAt` is that fork's write time, on a 60 s cadence,
 * while this panel refetches on every Refresh click. Before this step every poll
 * appended, so ONE measurement drew a flat run of N identical bars and the
 * heading counted them as N measurements — visually identical to N genuinely
 * stable measurements, and to a dead fork.
 *
 * The dedupe assertion is USELESS on its own: a dedupe that rejected everything
 * would also yield "one point". Each of the two tests below is therefore the
 * other's control — same stub, same clicks, only `measuredAt` differs.
 */
describe('RemoteAccessPage — latency history dedupe on measuredAt (S251)', () => {
  async function openHealth(w: VueWrapper): Promise<void> {
    await expandSection(w, 'Network Health');
    await flushPromises();
  }

  async function refresh(w: VueWrapper): Promise<void> {
    const body = w.find('#remote-networkhealth-body');
    await findBtnIn(w, body.element, 'Refresh')!.trigger('click');
    await flushPromises();
  }

  it('records ONE point when two polls carry the SAME measuredAt', async () => {
    const sample = { latencyMs: 42, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' };
    const { client } = makeClient({ networkSeq: [sample, { ...sample }] });
    const w = mountPage(client);
    await flushPromises();
    await openHealth(w);
    await refresh(w);

    expect(w.findAll('.admin-remote__latency-bar-wrap')).toHaveLength(1);
    expect(w.find('.admin-remote__latency-graph-title').text()).toBe(
      'Latency History (last 1 measurement)',
    );
    w.unmount();
  });

  it('records TWO points when the second poll carries a DIFFERENT measuredAt (control)', async () => {
    // Identical to the test above in every respect EXCEPT `measuredAt`. Without
    // this control, a dedupe that dropped every sample would pass that one.
    const { client } = makeClient({
      networkSeq: [
        { latencyMs: 42, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' },
        { latencyMs: 55, status: 'healthy', measuredAt: '2026-01-01T00:01:00Z' },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    await openHealth(w);
    await refresh(w);

    expect(w.findAll('.admin-remote__latency-bar-wrap')).toHaveLength(2);
    expect(w.find('.admin-remote__latency-graph-title').text()).toBe(
      'Latency History (last 2 measurements)',
    );
    // Both samples are the ones that were served, in order — proving the second
    // point is the NEW measurement and not a re-append of the first.
    expect(w.findAll('.admin-remote__latency-value').map((n) => n.text())).toEqual(['42', '55']);
    w.unmount();
  });

  it('keeps deduping across FOUR polls of one 60 s heartbeat window', async () => {
    // The realistic shape: the operator clicks Refresh repeatedly inside a single
    // heartbeat cadence. One measurement must stay one bar however many polls
    // land on it — and a shape-varying case beyond the two-poll minimum.
    const sample = { latencyMs: 42, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' };
    const { client } = makeClient({ networkSeq: [sample] });
    const w = mountPage(client);
    await flushPromises();
    await openHealth(w);
    await refresh(w);
    await refresh(w);
    await refresh(w);

    expect(w.findAll('.admin-remote__latency-bar-wrap')).toHaveLength(1);
    w.unmount();
  });
});

/**
 * S251 — a `stale: true` payload is VISIBLY distinct from a fresh one.
 *
 * The server (S40, phlix-server PR #647) emits `stale` on `/health/network` and
 * on both halves of `/health/relay`, derived from a writer-declared
 * `staleAfterSeconds`. Until this step none of it reached the UI, so a snapshot
 * frozen by a dead fork rendered exactly like a live one.
 *
 * ⚠ Every status assertion here is `toBe` on the exact rendered word. The
 * `"Enabled"`/`"Disabled"` substring trap S44-a hit lives in this same file;
 * `"Live"` and `"Stale"` are deliberately not substrings of one another, and the
 * first test below pins that property so a future rename cannot quietly
 * reintroduce the hazard.
 *
 * ⚠ The stale bar's hatching is CSS, and jsdom applies no SFC `<style>`, so it
 * is unobservable here by construction. Nothing below asserts on it: the
 * load-bearing signals are the exact freshness word, the note text, and the
 * bar's `title` attribute — all of which jsdom (and a screen reader) can see.
 */
describe('RemoteAccessPage — stale network reading (S251)', () => {
  const STALE_REASON = 'Hub heartbeat state is stale — the phlix-hub-heartbeat worker is not running';

  async function openHealth(w: VueWrapper): Promise<void> {
    await expandSection(w, 'Network Health');
    await flushPromises();
  }

  it('uses freshness words that are not substrings of each other', () => {
    expect('Stale'.includes('Live')).toBe(false);
    expect('Live'.includes('Stale')).toBe(false);
  });

  it('renders the exact word "Live" for a fresh reading (control)', async () => {
    const { client } = makeClient({
      networkSeq: [{ latencyMs: 42, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' }],
    });
    const w = mountPage(client);
    await flushPromises();
    await openHealth(w);

    expect(w.find('.admin-remote__freshness--network').text()).toBe('Live');
    expect(w.find('.admin-remote__latency-stale-note').exists()).toBe(false);
    expect(w.find('.admin-remote__stale-reason').exists()).toBe(false);
    expect(w.find('.admin-remote__latency-bar-wrap').attributes('title')).toBe(
      `42ms at ${new Date('2026-01-01T00:00:00Z').toLocaleString()}`,
    );
    w.unmount();
  });

  it('renders the exact word "Stale", the reason, and a stale note for a stale reading', async () => {
    const { client } = makeClient({
      networkSeq: [
        {
          latencyMs: 42,
          status: 'offline',
          measuredAt: '2026-01-01T00:00:00Z',
          stale: true,
          error: STALE_REASON,
        },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    await openHealth(w);

    expect(w.find('.admin-remote__freshness--network').text()).toBe('Stale');
    expect(w.find('.admin-remote__latency-stale-note').text()).toBe(
      'No new measurement — the newest reading is stale.',
    );
    expect(w.find('.admin-remote__stale-reason').text()).toBe(STALE_REASON);
    // The bar itself carries the verdict, so hovering a frozen sample says so.
    expect(w.find('.admin-remote__latency-bar-wrap').attributes('title')).toBe(
      `42ms at ${new Date('2026-01-01T00:00:00Z').toLocaleString()} (stale)`,
    );
    w.unmount();
  });

  it('marks the section summary stale rather than reporting it as a current reading', async () => {
    const fresh = makeClient({
      networkSeq: [{ latencyMs: 42, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' }],
    });
    const wf = mountPage(fresh.client);
    await flushPromises();
    await openHealth(wf);
    const freshSummary = wf
      .findAll('.admin-remote__section-summary')
      .map((n) => n.text())
      .filter((t) => t.includes('42ms'));
    expect(freshSummary).toEqual(['healthy (42ms)']);
    wf.unmount();

    const stale = makeClient({
      networkSeq: [
        { latencyMs: 42, status: 'offline', measuredAt: '2026-01-01T00:00:00Z', stale: true },
      ],
    });
    const ws = mountPage(stale.client);
    await flushPromises();
    await openHealth(ws);
    const staleSummary = ws
      .findAll('.admin-remote__section-summary')
      .map((n) => n.text())
      .filter((t) => t.includes('42ms'));
    expect(staleSummary).toEqual(['offline (42ms) — stale']);
    ws.unmount();
  });

  it('renders the relay and hub STATE FILE freshness from /health/relay', async () => {
    const staleRelay = makeClient({
      relayHealth: {
        relay: { connected: false, active: false, reconnectAttempts: 0, activeSessions: 0, stale: true },
        hub: { consecutiveFailures: 0, isEnrolled: true, stale: true },
      },
    });
    const w = mountPage(staleRelay.client);
    await flushPromises();
    await openHealth(w);
    expect(w.find('.admin-remote__freshness--relay-health').text()).toBe('Stale');
    expect(w.find('.admin-remote__freshness--hub-health').text()).toBe('Stale');
    w.unmount();

    // Control: the same two rows read "Live" when the server says nothing is stale.
    const freshRelay = makeClient({
      relayHealth: {
        relay: { connected: true, active: true, reconnectAttempts: 0, activeSessions: 0, stale: false },
        hub: { consecutiveFailures: 0, isEnrolled: true, stale: false },
      },
    });
    const w2 = mountPage(freshRelay.client);
    await flushPromises();
    await openHealth(w2);
    expect(w2.find('.admin-remote__freshness--relay-health').text()).toBe('Live');
    expect(w2.find('.admin-remote__freshness--hub-health').text()).toBe('Live');
    w2.unmount();
  });

  it('renders the relay-status state-file freshness in the Relay Tunnel section', async () => {
    const w = mountPage(makeClient({ relay: { connected: true, active: true, stale: true } }).client);
    await flushPromises();
    await expandSection(w, 'Relay Tunnel');
    expect(w.find('.admin-remote__freshness--relay-status').text()).toBe('Stale');
    w.unmount();

    const w2 = mountPage(makeClient({ relay: { connected: true, active: true, stale: false } }).client);
    await flushPromises();
    await expandSection(w2, 'Relay Tunnel');
    expect(w2.find('.admin-remote__freshness--relay-status').text()).toBe('Live');
    w2.unmount();
  });
});

/**
 * S257 — "never measured" is a NAMED state, visibly distinct from a number.
 *
 * 🚨 The defect: `NetworkHealth.latencyMs` is declared `number | null`, but the
 * mapper's `asNumber(… ?? null)` fallback is `0`. An honest `latencyMs: null`
 * from the server therefore arrived as `0`, and this page rendered it three
 * ways, all wrong: the Current badge showed `0ms`, the section summary showed
 * `offline (0ms)`, and `loadNetworkHealth()`'s `!== null` guard — being
 * permanently true — pushed a 0 ms bar onto the history chart, i.e. THE FASTEST
 * POINT ON THE GRAPH, at exactly the moment nothing had been measured.
 *
 * Every test below pairs the null case with a NUMERIC control in the same
 * assertion set, because "renders something for null" is not evidence that null
 * and a real reading are distinguishable.
 *
 * ⚠ Substring hazard checked before asserting (the `"Enabled"` inside
 * `"Disabled"` trap this very file was bitten by): the first test pins that
 * "Not measured yet" and a numeric `"<n>ms"` are not substrings of one another.
 * Note `relayLatencyLabel` in the Relay Tunnel section renders the SAME words —
 * every assertion here therefore targets a specific element, never `w.text()`.
 */
describe('RemoteAccessPage — never-measured latency (S257)', () => {
  const NOT_MEASURED = 'Not measured yet';

  async function openHealth(w: VueWrapper): Promise<void> {
    await expandSection(w, 'Network Health');
    await flushPromises();
  }

  it('the not-measured label and a numeric reading are not substrings of each other', () => {
    for (const numeric of ['0ms', '87ms', '1234ms']) {
      expect(NOT_MEASURED.includes(numeric)).toBe(false);
      expect(numeric.includes(NOT_MEASURED)).toBe(false);
    }
  });

  it('renders "Not measured yet" for latencyMs: null — with a NUMERIC control beside it', async () => {
    const nulled = mountPage(
      makeClient({
        networkSeq: [{
          latencyMs: null, status: 'offline', measuredAt: '2026-01-01T00:00:00Z',
          error: 'No successful heartbeat recorded yet',
        }],
      }).client,
    );
    await flushPromises();
    await openHealth(nulled);

    const measured = mountPage(
      makeClient({
        networkSeq: [{ latencyMs: 87, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' }],
      }).client,
    );
    await flushPromises();
    await openHealth(measured);

    // Exact rendered text, same element, two payloads. Restoring the mapper's
    // `0` fallback turns the first into "0ms" and reds this.
    expect(nulled.find('.admin-remote__latency-current').text()).toBe(NOT_MEASURED);
    expect(measured.find('.admin-remote__latency-current').text()).toBe('87ms');

    nulled.unmount();
    measured.unmount();
  });

  it('renders a REAL 0 ms measurement as "0ms", not as the not-measured label', async () => {
    // The inverse hazard, and the reason the label is chosen by `!= null` rather
    // than by truthiness: a genuine sub-millisecond round-trip is data.
    const w = mountPage(
      makeClient({
        networkSeq: [{ latencyMs: 0, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' }],
      }).client,
    );
    await flushPromises();
    await openHealth(w);

    expect(w.find('.admin-remote__latency-current').text()).toBe('0ms');
    w.unmount();
  });

  it('plots NO bar for a never-measured reading, and one for a real one (control)', async () => {
    // The chart is where the defect was worst: a 0 ms bar reads as the best
    // sample ever taken. `loadNetworkHealth()`'s `latencyMs !== null` guard was
    // already written correctly — it was simply unreachable.
    const nulled = mountPage(
      makeClient({
        networkSeq: [{ latencyMs: null, status: 'offline', measuredAt: '2026-01-01T00:00:00Z' }],
      }).client,
    );
    await flushPromises();
    await openHealth(nulled);
    expect(nulled.findAll('.admin-remote__latency-bar-wrap')).toHaveLength(0);
    expect(nulled.find('.admin-remote__latency-graph').exists()).toBe(false);

    const measured = mountPage(
      makeClient({
        networkSeq: [{ latencyMs: 87, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' }],
      }).client,
    );
    await flushPromises();
    await openHealth(measured);
    expect(measured.findAll('.admin-remote__latency-bar-wrap')).toHaveLength(1);
    expect(measured.find('.admin-remote__latency-value').text()).toBe('87');

    nulled.unmount();
    measured.unmount();
  });

  it('summarises a never-measured reading WITHOUT a parenthesised number', async () => {
    const nulled = mountPage(
      makeClient({
        networkSeq: [{ latencyMs: null, status: 'offline', measuredAt: '2026-01-01T00:00:00Z' }],
      }).client,
    );
    await flushPromises();
    await openHealth(nulled);
    const nulledSummary = nulled
      .findAll('.admin-remote__section-header')
      .find((h) => h.text().includes('Network Health'))!
      .find('.admin-remote__section-summary');
    expect(nulledSummary.text()).toBe('offline');

    const measured = mountPage(
      makeClient({
        networkSeq: [{ latencyMs: 87, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z' }],
      }).client,
    );
    await flushPromises();
    await openHealth(measured);
    const measuredSummary = measured
      .findAll('.admin-remote__section-header')
      .find((h) => h.text().includes('Network Health'))!
      .find('.admin-remote__section-summary');
    // The control: the parenthesised number IS rendered when there is one, so
    // its absence above is a real difference and not a broken selector.
    expect(measuredSummary.text()).toBe('healthy (87ms)');

    nulled.unmount();
    measured.unmount();
  });
});

/**
 * S257 — the three relay fields `/health/relay` has always emitted and the UI
 * mapper silently discarded: `relay.lastConnectError`, `relay.lastConnectErrorAt`
 * and `hub.lastLatencyMs`.
 *
 * Until now the Network Health panel could report the tunnel as Disconnected and
 * had no way to say WHY, while the Relay Tunnel section a few hundred pixels
 * above (fed by `/relay/status`) could. Each assertion has an OMITTED-payload
 * control beside it: an assertion that passes whether or not the field is
 * surfaced is worth nothing.
 */
describe('RemoteAccessPage — surfaced relay-error fields (S257)', () => {
  async function openHealth(w: VueWrapper): Promise<void> {
    await expandSection(w, 'Network Health');
    await flushPromises();
  }

  const WITH_ERROR = {
    relay: {
      connected: false, active: false, reconnectAttempts: 4, activeSessions: 0,
      lastConnectError: 'hub refused the tunnel handshake: 403',
      lastConnectErrorAt: '2026-01-01T00:02:00Z',
      stale: false,
    },
    hub: { isEnrolled: true, consecutiveFailures: 2, lastLatencyMs: 143, stale: false },
  };

  const WITHOUT_ERROR = {
    relay: {
      connected: true, active: true, reconnectAttempts: 0, activeSessions: 1,
      lastConnectError: null, lastConnectErrorAt: null, stale: false,
    },
    hub: { isEnrolled: true, consecutiveFailures: 0, lastLatencyMs: null, stale: false },
  };

  it('renders the last connect error and its timestamp', async () => {
    const w = mountPage(makeClient({ relayHealth: WITH_ERROR }).client);
    await flushPromises();
    await openHealth(w);

    expect(w.find('.admin-remote__health-connect-error').text()).toBe(
      'hub refused the tunnel handshake: 403',
    );
    expect(w.find('.admin-remote__health-connect-error-at').text()).toBe(
      new Date('2026-01-01T00:02:00Z').toLocaleString(),
    );
    w.unmount();
  });

  it('renders NEITHER row when the server reports no connect error (non-vacuity control)', async () => {
    // ⚠ Without this the test above would also pass against a template that
    // rendered the rows unconditionally with empty content.
    const w = mountPage(makeClient({ relayHealth: WITHOUT_ERROR }).client);
    await flushPromises();
    await openHealth(w);

    expect(w.find('.admin-remote__health-connect-error').exists()).toBe(false);
    expect(w.find('.admin-remote__health-connect-error-at').exists()).toBe(false);
    w.unmount();
  });

  it('renders hub.lastLatencyMs as a number, and "Not measured yet" when it is null', async () => {
    const withValue = mountPage(makeClient({ relayHealth: WITH_ERROR }).client);
    await flushPromises();
    await openHealth(withValue);
    expect(withValue.find('.admin-remote__hub-last-latency').text()).toBe('143ms');

    const withNull = mountPage(makeClient({ relayHealth: WITHOUT_ERROR }).client);
    await flushPromises();
    await openHealth(withNull);
    // The same honesty as `network.latencyMs`: null is never 0 ms.
    expect(withNull.find('.admin-remote__hub-last-latency').text()).toBe('Not measured yet');
    expect(withNull.find('.admin-remote__hub-last-latency').text()).not.toBe('0ms');

    withValue.unmount();
    withNull.unmount();
  });
});
