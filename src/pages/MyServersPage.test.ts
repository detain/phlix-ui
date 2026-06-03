import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import MyServersPage from './MyServersPage.vue';
import Button from '../components/ui/Button.vue';
import { useToastStore } from '../stores/useToastStore';
import { api, type ApiClient } from '../api/client';

const server = {
  id: 'srv-1',
  name: 'Home Theater',
  url: 'https://home.example.com',
  status: 'online',
  owner: 'alice',
  library_count: 3,
  last_seen: '2026-05-27T00:00:00Z',
};

interface Overrides {
  servers?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/servers') return { servers: over.servers ?? [server] };
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

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('MyServersPage — list + states', () => {
  it('renders a row with name, url, owner, libraries, last seen, and status', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/servers');
    const text = w.text();
    expect(text).toContain('Home Theater');
    expect(text).toContain('https://home.example.com');
    expect(text).toContain('alice');
    expect(text).toContain('3');
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
    resolve({ servers: [server] });
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

  it('renders "Never" and "—" for a server with no last_seen / library_count', async () => {
    const { client } = makeClient({
      servers: [{ id: 'srv-2', name: 'NAS', url: 'http://nas', status: 'offline', owner: 'bob' }],
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
    expect(spy).toHaveBeenCalledWith('/api/v1/servers');
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
      .mockResolvedValueOnce({ servers: [server] });
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
    const { client } = makeClient({ servers: [{ ...server, status }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="status-srv-1"]').text()).toContain(label);
    w.unmount();
  });
});
