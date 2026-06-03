import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import FederationPage from './FederationPage.vue';
import Button from '../components/ui/Button.vue';
import { useToastStore } from '../stores/useToastStore';
import { api, type ApiClient } from '../api/client';

// Raw peer shape from GET /api/v1/me/federation/peers (snake_case). The hub
// enriches each peer with shared_library_count; last_sync maps from
// last_connected_at (falling back to last_seen_at).
const hubPeer = {
  id: 'p1',
  name: 'Friend Server',
  url: 'https://friend.example.com',
  status: 'connected',
  shared_library_count: 5,
  last_connected_at: '2026-05-27T00:00:00Z',
};

interface Overrides {
  peers?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/me/federation/peers') return { peers: over.peers ?? [hubPeer] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async (): Promise<Record<string, unknown>> => ({}));
  const del = vi.fn(async (): Promise<Record<string, unknown>> => ({}));
  const client = { get, post, delete: del } as unknown as ApiClient;
  return { client, get, post, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(FederationPage, { props: { client }, attachTo: document.body });
}

function findBtn(w: VueWrapper, label: string) {
  return w.findAllComponents(Button).find((b) => b.attributes('aria-label') === label);
}
function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

/** Fill the (now three-field) add-peer form. */
async function fillAddPeer(
  w: VueWrapper,
  vals: { name?: string; url?: string; key?: string } = {},
): Promise<void> {
  await w.find('input[aria-label="Peer name"]').setValue(vals.name ?? 'New Peer');
  await w.find('input[aria-label="Peer server URL"]').setValue(vals.url ?? 'https://new-peer.example.com');
  await w.find('input[aria-label="Peer public key"]').setValue(vals.key ?? 'PUBKEY123');
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('FederationPage — list + states', () => {
  it('renders a peer row with name, url, shared libraries, last sync, status', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/federation/peers');
    const text = w.text();
    expect(text).toContain('Friend Server');
    expect(text).toContain('https://friend.example.com');
    expect(text).toContain('5'); // shared_library_count
    expect(w.find('[data-testid="status-p1"]').text()).toContain('Connected');
    w.unmount();
  });

  it('shows a skeleton while loading, then the content', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const client = { get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.federation__skel').exists()).toBe(true);
    resolve({ peers: [hubPeer] });
    await flushPromises();
    expect(w.find('.federation__skel').exists()).toBe(false);
    expect(w.find('.federation__table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state but still renders the add-peer form when there are no peers', async () => {
    const { client } = makeClient({ peers: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No federation peers connected');
    expect(w.find('.federation__table').exists()).toBe(false);
    expect(w.find('.federation__form').exists()).toBe(true);
    w.unmount();
  });

  it('treats a response with no `peers` key as empty', async () => {
    const get = vi.fn(async () => ({}));
    const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('No federation peers connected');
    w.unmount();
  });

  it('renders "Never" and "—" for a peer with no last_sync / shared count', async () => {
    const { client } = makeClient({
      peers: [{ id: 'p2', name: 'Bare', url: 'https://bare', status: 'pending' }],
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Never');
    expect(w.text()).toContain('—');
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ peers: [] } as never);
    const w = mount(FederationPage, { attachTo: document.body });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/me/federation/peers');
    expect(w.text()).toContain('No federation peers connected');
    w.unmount();
  });
});

describe('FederationPage — load errors', () => {
  it('shows an error EmptyState + toasts when peers fail to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('federation down'));
    const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load federation peers");
    expect(w.text()).toContain('federation down');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'federation down')).toBe(true);
    w.unmount();
  });

  it('uses a generic message for a non-Error rejection', async () => {
    const get = vi.fn().mockRejectedValue('weird');
    const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('Failed to load federation peers.');
    w.unmount();
  });

  it('Retry re-loads after a failure', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('down'))
      .mockResolvedValueOnce({ peers: [hubPeer] });
    const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load federation peers");
    await findBtnByText(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.find('.federation__table').exists()).toBe(true);
    w.unmount();
  });
});

describe('FederationPage — status + remove', () => {
  it.each([
    ['connected', 'Connected'],
    ['disconnected', 'Disconnected'],
    ['pending', 'Pending'],
    ['blocked', 'blocked'],
  ])('renders the %s status as "%s"', async (status, label) => {
    const { client } = makeClient({ peers: [{ ...hubPeer, status }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="status-p1"]').text()).toContain(label);
    w.unmount();
  });

  it('shows a Remove button for peers of ANY status (delete works regardless)', async () => {
    const { client } = makeClient({
      peers: [
        { ...hubPeer, id: 'c', name: 'Conn', status: 'connected' },
        { ...hubPeer, id: 'd', name: 'Disc', status: 'disconnected' },
        { ...hubPeer, id: 'p', name: 'Pend', status: 'pending' },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    expect(findBtn(w, 'Remove Conn')).toBeTruthy();
    expect(findBtn(w, 'Remove Disc')).toBeTruthy();
    expect(findBtn(w, 'Remove Pend')).toBeTruthy();
    w.unmount();
  });

  it('remove → DELETEs the peer, toasts, and reloads', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.length;
    await findBtn(w, 'Remove Friend Server')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/me/federation/peers/p1');
    expect(get.mock.calls.length).toBeGreaterThan(before);
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Peer removed.')).toBe(true);
    w.unmount();
  });

  it('toasts when remove fails (non-Error fallback)', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce('nope');
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Remove Friend Server')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'Failed to remove peer.')).toBe(true);
    w.unmount();
  });
});

describe('FederationPage — add peer (createPeer)', () => {
  it('add peer → POSTs url+name+public_key, toasts, clears the form, and reloads', async () => {
    const { client, post, get } = makeClient({ peers: [] });
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.length;
    await fillAddPeer(w, { name: 'New Peer', url: 'https://new-peer.example.com', key: 'PUBKEY123' });
    await w.find('.federation__form').trigger('submit');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/me/federation/peers', {
      url: 'https://new-peer.example.com',
      name: 'New Peer',
      public_key: 'PUBKEY123',
    });
    expect((w.find('input[aria-label="Peer server URL"]').element as HTMLInputElement).value).toBe('');
    expect(get.mock.calls.length).toBeGreaterThan(before);
    expect(useToastStore().toasts.some((t) => t.tone === 'success')).toBe(true);
    w.unmount();
  });

  it('does not POST when required fields are missing (guard)', async () => {
    const { client, post } = makeClient({ peers: [] });
    const w = mountPage(client);
    await flushPromises();
    await w.find('input[aria-label="Peer server URL"]').setValue('https://only-url.example.com');
    await w.find('.federation__form').trigger('submit');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('disables "Add peer" until name, url, and public key are all entered', async () => {
    const { client } = makeClient({ peers: [] });
    const w = mountPage(client);
    await flushPromises();
    const add = findBtnByText(w, 'Add peer')!;
    expect((add.element as HTMLButtonElement).disabled).toBe(true);
    await fillAddPeer(w);
    expect((add.element as HTMLButtonElement).disabled).toBe(false);
    w.unmount();
  });

  it('toasts when add fails (Error)', async () => {
    const { client, post } = makeClient({ peers: [] });
    post.mockRejectedValueOnce(new Error('handshake failed'));
    const w = mountPage(client);
    await flushPromises();
    await fillAddPeer(w);
    await w.find('.federation__form').trigger('submit');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.tone === 'error' && t.message === 'handshake failed')).toBe(true);
    w.unmount();
  });

  it('toasts a generic message when add fails (non-Error)', async () => {
    const { client, post } = makeClient({ peers: [] });
    post.mockRejectedValueOnce('nope');
    const w = mountPage(client);
    await flushPromises();
    await fillAddPeer(w);
    await w.find('.federation__form').trigger('submit');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'Failed to add peer.')).toBe(true);
    w.unmount();
  });
});
