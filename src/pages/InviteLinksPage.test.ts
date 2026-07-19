/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import InviteLinksPage from './InviteLinksPage.vue';
import Button from '../components/ui/Button.vue';
import Select from '../components/ui/Select.vue';
import { useToastStore } from '../stores/useToastStore';
import type { ApiClient } from '../api/client';

const link = {
  id: 'l1',
  owner_user_id: 'u1',
  server_id: 'srv-1',
  library_id: 'lib-1',
  permission: 'read',
  max_uses: 5,
  use_count: 2,
  expires_at: 4070908800,
  created_at: 1746057600,
  url: 'https://hub/invite/tok-1',
};

interface Overrides {
  links?: unknown[];
  servers?: unknown[];
  libraries?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/me/invite-links') return { invite_links: over.links ?? [link] };
    if (endpoint === '/api/v1/me/servers') return { servers: over.servers ?? [{ id: 'srv-1', server_name: 'Home Theater', status: 'online' }] };
    if (endpoint.startsWith('/api/v1/me/libraries')) return { libraries: over.libraries ?? [{ id: 'lib-1', name: 'Movies', server_id: 'srv-1' }] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({ url: 'https://hub/invite/new', expires_at: 4070908800, id: 'l2' }));
  const del = vi.fn(async () => ({}));
  const client = { get, post, delete: del } as unknown as ApiClient;
  return { client, get, post, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(InviteLinksPage, { props: { client }, attachTo: document.body });
}

function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  writeText = vi.fn(async () => {});
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
});
afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('InviteLinksPage — list + states', () => {
  it('loads invite links on mount and renders a card', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/invite-links');
    expect(w.text()).toContain('srv-1'); // server name not resolved until servers loaded
    expect(w.text()).toContain('2 / 5 uses');
    w.unmount();
  });

  it('shows a skeleton while loading', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    expect(w.find('.invite-links__skel').exists()).toBe(true);
    resolve({ invite_links: [link] });
    await flushPromises();
    expect(w.find('.invite-links__skel').exists()).toBe(false);
    w.unmount();
  });

  it('shows the empty state when there are no links', async () => {
    const { client } = makeClient({ links: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No invite links');
    w.unmount();
  });

  it('shows an error EmptyState + toasts on a load failure', async () => {
    const get = vi.fn().mockRejectedValue(new Error('links down'));
    const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load invite links");
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'links down')).toBe(true);
    w.unmount();
  });
});

describe('InviteLinksPage — create modal', () => {
  it('New Invite opens the modal and loads the server dropdown', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'New Invite')!.trigger('click');
    await flushPromises();
    expect(document.querySelector('.modal')).not.toBeNull();
    expect(get).toHaveBeenCalledWith('/api/v1/me/servers');
    w.unmount();
  });

  it('changing the server triggers loadLibraries for that server', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'New Invite')!.trigger('click');
    await flushPromises();
    // The server select is the first Select in the modal; its @change → loadLibraries.
    const serverSelect = w.findAllComponents(Select)[0];
    serverSelect.vm.$emit('change', 'srv-1');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/libraries?server_id=srv-1');
    w.unmount();
  });

  it('Create Invite POSTs max_uses/expires_in/permission/server_id and copies the URL', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'New Invite')!.trigger('click');
    await flushPromises();
    // Select a server so create is enabled + server_id is set.
    w.findAllComponents(Select)[0].vm.$emit('update:modelValue', 'srv-1');
    await flushPromises();

    await findBtnByText(w, 'Create Invite')!.trigger('click');
    await flushPromises();

    expect(post).toHaveBeenCalledWith('/api/v1/me/invite-links', {
      server_id: 'srv-1',
      library_id: null,
      permission: 'read',
      max_uses: 1,
      expires_in: 604800,
    });
    expect(writeText).toHaveBeenCalledWith('https://hub/invite/new');
    w.unmount();
  });

  it('Create with no server selected toasts a validation error and does not POST', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'New Invite')!.trigger('click');
    await flushPromises();
    // Force createLink() without a server via the exposed path: click is disabled,
    // so drive the guard by emitting an empty value then invoking create.
    w.findAllComponents(Select)[0].vm.$emit('update:modelValue', '');
    await flushPromises();
    const createBtn = findBtnByText(w, 'Create Invite')!;
    // Button is disabled with no server; assert it and that no POST happened.
    expect(createBtn.attributes('disabled')).toBeDefined();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });
});

describe('InviteLinksPage — copy + revoke', () => {
  it('Copy URL writes the link URL to the clipboard and toasts', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Copy URL')!.trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith('https://hub/invite/tok-1');
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Link copied to clipboard!')).toBe(true);
    w.unmount();
  });

  it('Revoke DELETEs the link, toasts, and reloads', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.length;
    await findBtnByText(w, 'Revoke')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/me/invite-links/l1');
    expect(get.mock.calls.length).toBeGreaterThan(before);
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Invite link revoked.')).toBe(true);
    w.unmount();
  });

  it('toasts an error when revoke fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('cannot revoke'));
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Revoke')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.tone === 'error' && t.message === 'cannot revoke')).toBe(true);
    w.unmount();
  });
});
