import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import MyServersPage from './MyServersPage.vue';
import Button from '../components/ui/Button.vue';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { api, type ApiClient } from '../api/client';

// Raw hub shape from GET /api/v1/me/servers (camelCase ServerInfoDto). lastSeenAt
// is UNIX seconds; the hub has no owner name / url / library count.
const hubServer = {
  serverId: 'srv-1',
  serverName: 'Home Theater',
  status: 'online',
  hostnameCandidates: ['https://home.example.com'],
  lastSeenAt: 1748304000,
};

interface Overrides {
  servers?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/me/servers') return { servers: over.servers ?? [hubServer] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const client = { get } as unknown as ApiClient;
  return { client, get };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(MyServersPage, { props: { client }, attachTo: document.body });
}

function findBtn(w: VueWrapper, label: string) {
  return w.findAllComponents(Button).find((b) => b.attributes('aria-label') === label);
}
function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

/** Seed the signed-in user so the page's "owner" column resolves to a name. */
function signIn(username = 'alice'): void {
  useAuthStore().user = { id: 'u1', username } as never;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  signIn();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('MyServersPage — list + states', () => {
  it('renders a row with name, url, owner (current user), last seen, and status', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/servers');
    const text = w.text();
    expect(text).toContain('Home Theater');
    expect(text).toContain('https://home.example.com');
    expect(text).toContain('alice'); // owner = signed-in user (servers are scoped to them)
    expect(w.find('[data-testid="status-srv-1"]').text()).toContain('Online');
    expect(findBtn(w, 'Manage Home Theater')).toBeTruthy();
    w.unmount();
  });

  it('shows a skeleton while loading, then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const client = { get } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.my-servers__skel').exists()).toBe(true);
    resolve({ servers: [hubServer] });
    await flushPromises();
    expect(w.find('.my-servers__skel').exists()).toBe(false);
    expect(w.find('.my-servers__table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state (with an Add server action) when there are no servers', async () => {
    const { client } = makeClient({ servers: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No servers connected yet');
    expect(w.find('.my-servers__table').exists()).toBe(false);
    expect(findBtnByText(w, 'Add server')).toBeTruthy();
    w.unmount();
  });

  it('treats a response with no `servers` key as empty', async () => {
    const get = vi.fn(async () => ({}));
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('No servers connected yet');
    w.unmount();
  });

  it('renders "Never" for a server with no lastSeenAt and "—" for the (hub-absent) library count', async () => {
    const { client } = makeClient({
      servers: [{ serverId: 'srv-2', serverName: 'NAS', status: 'offline', hostnameCandidates: ['http://nas'] }],
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Never');
    expect(w.text()).toContain('—');
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ servers: [] } as never);
    const w = mount(MyServersPage, { attachTo: document.body });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/me/servers');
    expect(w.text()).toContain('No servers connected yet');
    w.unmount();
  });
});

describe('MyServersPage — load errors', () => {
  it('shows an error EmptyState + toasts when the list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('hub unreachable'));
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load servers");
    expect(w.text()).toContain('hub unreachable');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'hub unreachable')).toBe(true);
    w.unmount();
  });

  it('uses a generic message for a non-Error rejection', async () => {
    const get = vi.fn().mockRejectedValue('weird');
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain('Failed to load servers.');
    expect(toasts.toasts.some((t) => t.message === 'Failed to load servers.')).toBe(true);
    w.unmount();
  });

  it('Retry re-loads after a failure', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('hub unreachable'))
      .mockResolvedValueOnce({ servers: [hubServer] });
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load servers");
    await findBtnByText(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.find('.my-servers__table').exists()).toBe(true);
    expect(w.text()).toContain('Home Theater');
    w.unmount();
  });
});

describe('MyServersPage — status badges', () => {
  it.each([
    ['online', 'Online'],
    ['offline', 'Offline'],
    ['connecting', 'Connecting'],
    ['degraded', 'degraded'],
  ])('renders the %s status as "%s"', async (status, label) => {
    const { client } = makeClient({ servers: [{ ...hubServer, status }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="status-srv-1"]').text()).toContain(label);
    w.unmount();
  });
});

describe('MyServersPage — add server', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('opens the claim modal from the header "Add server" button', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();

    expect(document.querySelector('#claim-code')).toBeNull();
    await findBtnByText(w, 'Add server')!.trigger('click');
    await flushPromises();
    expect(document.querySelector('#claim-code')).not.toBeNull();
    w.unmount();
  });

  it('claims a server (token + protocol header), closes the modal, and refreshes the list', async () => {
    const { client, get } = makeClient();
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200, json: async () => ({ server_id: 'srv-2' }) });
    vi.stubGlobal('fetch', fetchMock);

    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledTimes(1);

    await findBtnByText(w, 'Add server')!.trigger('click');
    await flushPromises();
    const input = document.querySelector('#claim-code') as HTMLInputElement;
    input.value = 'ABC-123';
    input.dispatchEvent(new Event('input'));
    await flushPromises();

    // Submit via the form to disambiguate from the header's same-label button.
    (document.querySelector('.my-servers__add-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/v1/server-claims/claim');
    expect((init.headers as Record<string, string>)['Accept-Phlix-Protocol']).toBe('v1');
    expect(JSON.parse(init.body as string)).toEqual({ claim_code: 'ABC-123' });
    expect(get).toHaveBeenCalledTimes(2); // list refreshed after claim
    expect(document.querySelector('#claim-code')).toBeNull(); // modal closed
    w.unmount();
  });

  it('keeps the modal open and shows a friendly error on a bad claim code', async () => {
    const { client } = makeClient();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) }));

    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Add server')!.trigger('click');
    await flushPromises();
    const input = document.querySelector('#claim-code') as HTMLInputElement;
    input.value = 'WRONG';
    input.dispatchEvent(new Event('input'));
    await flushPromises();
    (document.querySelector('.my-servers__add-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
    await flushPromises();

    const err = document.querySelector('.my-servers__add-error');
    expect(err?.textContent).toContain('was not found');
    expect(document.querySelector('#claim-code')).not.toBeNull(); // stays open to retry
    w.unmount();
  });
});
