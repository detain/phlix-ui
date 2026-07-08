/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SyncPlayPage from './SyncPlayPage.vue';
import Button from '../../components/ui/Button.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const groupOpen = {
  id: 'sp_abc123',
  name: 'Movie Night',
  member_count: 3,
  has_password: false,
  current_media: null,
  is_playing: false,
};
const groupLocked = {
  id: 'sp_def456',
  name: 'Private Party',
  member_count: 1,
  has_password: true,
  current_media: 'media-1',
  is_playing: true,
};

const groupState = {
  id: 'sp_abc123',
  name: 'Movie Night',
  host_id: 'user-1',
  has_password: false,
  members: [],
  playback_state: { state: 'paused', position: 0, server_time: 0 },
  queue: [],
  created_at: 1,
  last_activity: 1,
};

interface Overrides {
  groups?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/syncplay/groups') return { groups: over.groups ?? [groupOpen, groupLocked] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({ success: true, group: groupState }));
  const put = vi.fn();
  const del = vi.fn();
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(SyncPlayPage, { props: { client }, attachTo: document.body });
}

/** Find a Button by its trimmed text. */
function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

/** Find a Button by trimmed text scoped to a container (e.g. a teleported modal panel). */
function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}

/** The currently-open modal panel teleported to body. */
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
});

describe('Admin SyncPlayPage — list', () => {
  it('renders the heading', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('#syncplay-heading').text()).toBe('SyncPlay');
    w.unmount();
  });

  it('shows a skeleton while loading then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-syncplay__skel').exists()).toBe(true);
    resolve({ groups: [groupOpen] });
    await flushPromises();
    expect(w.find('table').exists()).toBe(true);
    w.unmount();
  });

  it('loads and renders group rows with member counts and badges', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/syncplay/groups');
    const text = w.text();
    expect(text).toContain('Movie Night');
    expect(text).toContain('3 members');
    expect(text).toContain('Private Party');
    expect(text).toContain('1 member');
    expect(text).toContain('Password');
    expect(text).toContain('Playing');
    expect(text).toContain('Idle');
    expect(text).toContain('media-1');
    w.unmount();
  });

  it('shows an em-dash when no media is playing', async () => {
    const { client } = makeClient({ groups: [groupOpen] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-syncplay__media').text()).toBe('—');
    w.unmount();
  });

  it('shows an empty state when there are no groups', async () => {
    const { client } = makeClient({ groups: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No groups yet');
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the group list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('list boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    const toasts = useToastStore();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain("Couldn't load groups");
    expect(w.text()).toContain('list boom');
    expect(w.text()).not.toContain('No groups yet');
    expect(toasts.toasts.some((t) => t.message === 'list boom')).toBe(true);
    w.unmount();
  });

  it('retries the group list load from the error state', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('list boom'))
      .mockResolvedValue({ groups: [groupOpen] });
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.text()).toContain('Movie Night');
    w.unmount();
  });

  it('uses the fallback toast message when the error has no message', async () => {
    const get = vi.fn().mockRejectedValue({});
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Failed to load groups.')).toBe(true);
    w.unmount();
  });
});

describe('Admin SyncPlayPage — create group', () => {
  it('creates a group and refetches the list', async () => {
    const { client, post, get } = makeClient({ groups: [] });
    const w = mountPage(client);
    await flushPromises();
    // Open via the empty-state action.
    await findBtn(w, 'Create group')!.trigger('click');
    await flushPromises();
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('.admin-syncplay__input');
    inputs[0].value = 'New Group'; inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'pw'; inputs[1].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create group')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups', { name: 'New Group', password: 'pw' });
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/syncplay/groups').length).toBeGreaterThan(1);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Group created.')).toBe(true);
    w.unmount();
  });

  it('omits the password when left blank', async () => {
    const { client, post } = makeClient({ groups: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create group')!.trigger('click');
    await flushPromises();
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('.admin-syncplay__input');
    inputs[0].value = 'Open Group'; inputs[0].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create group')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups', { name: 'Open Group' });
    w.unmount();
  });

  it('requires a group name', async () => {
    const { client, post } = makeClient({ groups: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create group')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create group')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('Group name is required'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when creating a group fails', async () => {
    const { client, post } = makeClient({ groups: [] });
    post.mockRejectedValueOnce(new Error('create boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create group')!.trigger('click');
    await flushPromises();
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('.admin-syncplay__input');
    inputs[0].value = 'Boom Group'; inputs[0].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create group')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'create boom')).toBe(true);
    w.unmount();
  });

  it('cancels the create modal without mutating', async () => {
    const { client, post } = makeClient({ groups: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create group')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });
});

describe('Admin SyncPlayPage — join group', () => {
  it('opens the join modal prefilled with the row group id and joins (no refetch)', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const callsBefore = get.mock.calls.length;
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Join Movie Night')!.trigger('click');
    await flushPromises();
    const idInput = modalPanel().querySelectorAll<HTMLInputElement>('.admin-syncplay__input')[0];
    expect(idInput.value).toBe('sp_abc123');
    const pwInput = modalPanel().querySelectorAll<HTMLInputElement>('.admin-syncplay__input')[1];
    pwInput.value = 'secret'; pwInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Join group')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc123/join', { password: 'secret' });
    // joinGroup does not refetch the list.
    expect(get.mock.calls.length).toBe(callsBefore);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Joined group.')).toBe(true);
    w.unmount();
  });

  it('joins without a password when blank', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Join Movie Night')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Join group')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc123/join', {});
    w.unmount();
  });

  it('requires a group id', async () => {
    const { client, post } = makeClient({ groups: [groupOpen] });
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Join Movie Night')!.trigger('click');
    await flushPromises();
    const idInput = modalPanel().querySelectorAll<HTMLInputElement>('.admin-syncplay__input')[0];
    idInput.value = ''; idInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Join group')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('Group ID is required'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when joining a group fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('join boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Join Movie Night')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Join group')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'join boom')).toBe(true);
    w.unmount();
  });

  it('cancels the join modal without mutating', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Join Movie Night')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });
});
