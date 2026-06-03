import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ServicesPage from './ServicesPage.vue';
import Button from '../../components/ui/Button.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const TRAKT_STATUS = '/api/v1/admin/services/trakt/status';
const TRAKT_DISCONNECT = '/api/v1/admin/services/trakt/disconnect';
const LASTFM_STATUS = '/api/v1/admin/services/lastfm/status';
const LASTFM_DISCONNECT = '/api/v1/admin/services/lastfm/disconnect';

interface Overrides {
  trakt?: unknown;
  lastfm?: unknown;
  traktReject?: boolean;
  lastfmReject?: boolean;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === TRAKT_STATUS) {
      if (over.traktReject) throw new Error('trakt status boom');
      return over.trakt ?? { connected: false, username: null };
    }
    if (endpoint === LASTFM_STATUS) {
      if (over.lastfmReject) throw new Error('lastfm status boom');
      return over.lastfm ?? { connected: false, username: null, api_key_set: false };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({ message: 'Disconnected' }));
  const client = { get, post } as unknown as ApiClient;
  return { client, get, post };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(ServicesPage, { props: { client }, attachTo: document.body });
}

/** Find a Button by its (trimmed) text. */
function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Admin ServicesPage — load + render', () => {
  it('renders the heading and both section titles', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('Services');
    expect(text).toContain('Trakt.tv');
    expect(text).toContain('Last.fm');
    w.unmount();
  });

  it('shows a skeleton while statuses load, then the cards', async () => {
    const resolvers: ((v: unknown) => void)[] = [];
    const get = vi.fn(() => new Promise((r) => { resolvers.push(r); }));
    const client = { get, post: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.findComponent(Skeleton).exists()).toBe(true);
    // Both the Trakt and Last.fm status loads are independent — settle every pending one.
    resolvers.forEach((r) => r({ connected: false, username: null }));
    await flushPromises();
    expect(w.findComponent(Skeleton).exists()).toBe(false);
    w.unmount();
  });

  it('fetches both service statuses on mount', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith(TRAKT_STATUS);
    expect(get).toHaveBeenCalledWith(LASTFM_STATUS);
    w.unmount();
  });
});

describe('Admin ServicesPage — Trakt section', () => {
  it('renders the connected state with the username and Connected badge', async () => {
    const { client } = makeClient({ trakt: { connected: true, username: 'traktuser' } });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('traktuser');
    expect(text).toContain('Connected');
    expect(findBtn(w, 'Disconnect')).toBeTruthy();
    w.unmount();
  });

  it('renders the disconnected state with an enabled Connect button when configured', async () => {
    const { client } = makeClient({ trakt: { connected: false, username: null, configured: true } });
    const w = mountPage(client);
    await flushPromises();
    const btn = findBtn(w, 'Connect to Trakt');
    expect(btn).toBeTruthy();
    expect(btn!.attributes('disabled')).toBeUndefined();
    expect(w.text()).not.toContain("Trakt isn't configured yet");
    w.unmount();
  });

  it('shows setup guidance and disables Connect when not configured', async () => {
    const { client } = makeClient({ trakt: { connected: false, username: null, configured: false } });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain("Trakt isn't configured yet");
    const btn = findBtn(w, 'Connect to Trakt');
    expect(btn!.attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('navigates to the Trakt OAuth URL when Connect is clicked', async () => {
    const setHref = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { set href(v: string) { setHref(v); } },
    });
    const { client } = makeClient({ trakt: { connected: false, username: null, configured: true } });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Connect to Trakt')!.trigger('click');
    expect(setHref).toHaveBeenCalledWith('/api/v1/oauth/trakt');
    Object.defineProperty(window, 'location', { configurable: true, value: { href: '' } });
    w.unmount();
  });

  it('disconnects Trakt, toasts success, and refetches status', async () => {
    const { client, get, post } = makeClient({ trakt: { connected: true, username: 'traktuser' } });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Disconnect')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith(TRAKT_DISCONNECT);
    expect(get.mock.calls.filter((c) => c[0] === TRAKT_STATUS).length).toBeGreaterThan(1);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Trakt disconnected.')).toBe(true);
    w.unmount();
  });

  it('toasts when disconnecting Trakt fails', async () => {
    const { client, post } = makeClient({ trakt: { connected: true, username: 'traktuser' } });
    post.mockRejectedValueOnce(new Error('trakt disconnect boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Disconnect')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'trakt disconnect boom')).toBe(true);
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the Trakt status fails to load', async () => {
    const { client } = makeClient({ traktReject: true });
    const w = mountPage(client);
    await flushPromises();
    expect(w.findAllComponents(EmptyState).length).toBeGreaterThan(0);
    expect(w.text()).toContain("Couldn't load Trakt");
    expect(w.text()).toContain('trakt status boom');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'trakt status boom')).toBe(true);
    w.unmount();
  });

  it('retries the Trakt status load from the error state', async () => {
    let calls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === TRAKT_STATUS) {
        calls += 1;
        if (calls === 1) throw new Error('trakt status boom');
        return { connected: true, username: 'traktuser' };
      }
      if (endpoint === LASTFM_STATUS) return { connected: false, username: null, api_key_set: false };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load Trakt");
    // Only the Trakt section errored → exactly one Retry button.
    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load Trakt");
    expect(w.text()).toContain('traktuser');
    w.unmount();
  });
});

describe('Admin ServicesPage — Last.fm section', () => {
  it('renders the connected state with username and API key status', async () => {
    const { client } = makeClient({ lastfm: { connected: true, username: 'lastfmuser', api_key_set: true } });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('lastfmuser');
    expect(text).toContain('Set');
    w.unmount();
  });

  it('shows "Not set" when the API key is absent for a connected account', async () => {
    const { client } = makeClient({ lastfm: { connected: true, username: 'lastfmuser', api_key_set: false } });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Not set');
    w.unmount();
  });

  it('renders the disconnected state with a Connect button', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(findBtn(w, 'Connect Last.fm')).toBeTruthy();
    w.unmount();
  });

  it('navigates to the Last.fm connect page when Connect is clicked', async () => {
    const setHref = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { set href(v: string) { setHref(v); } },
    });
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Connect Last.fm')!.trigger('click');
    expect(setHref).toHaveBeenCalledWith('/admin/lastfm');
    Object.defineProperty(window, 'location', { configurable: true, value: { href: '' } });
    w.unmount();
  });

  it('disconnects Last.fm, toasts success, and refetches status', async () => {
    const { client, get, post } = makeClient({ lastfm: { connected: true, username: 'lastfmuser', api_key_set: true } });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Disconnect')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith(LASTFM_DISCONNECT);
    expect(get.mock.calls.filter((c) => c[0] === LASTFM_STATUS).length).toBeGreaterThan(1);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Last.fm disconnected.')).toBe(true);
    w.unmount();
  });

  it('toasts when disconnecting Last.fm fails', async () => {
    const { client, post } = makeClient({ lastfm: { connected: true, username: 'lastfmuser', api_key_set: true } });
    post.mockRejectedValueOnce(new Error('lastfm disconnect boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Disconnect')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'lastfm disconnect boom')).toBe(true);
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the Last.fm status fails to load', async () => {
    const { client } = makeClient({ lastfmReject: true });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load Last.fm");
    expect(w.text()).toContain('lastfm status boom');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'lastfm status boom')).toBe(true);
    w.unmount();
  });

  it('retries the Last.fm status load from the error state', async () => {
    let calls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === LASTFM_STATUS) {
        calls += 1;
        if (calls === 1) throw new Error('lastfm status boom');
        return { connected: true, username: 'lastfmuser', api_key_set: true };
      }
      if (endpoint === TRAKT_STATUS) return { connected: false, username: null };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load Last.fm");
    // Trakt loaded fine → the only Retry button is Last.fm's.
    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load Last.fm");
    expect(w.text()).toContain('lastfmuser');
    w.unmount();
  });
});
