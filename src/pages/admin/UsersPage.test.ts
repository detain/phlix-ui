/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import UsersPage from './UsersPage.vue';
import Button from '../../components/ui/Button.vue';
import Switch from '../../components/ui/Switch.vue';
import Select from '../../components/ui/Select.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const userA = {
  id: 1,
  username: 'alice',
  email: 'alice@example.com',
  is_admin: 1 as const,
  status: 'active' as const,
  created_at: '2026-05-27T00:00:00Z',
  updated_at: '2026-05-27T00:00:00Z',
};
const userB = {
  id: 2,
  username: 'bob',
  email: 'bob@example.com',
  is_admin: 0 as const,
  status: 'active' as const,
  created_at: '2026-05-26T00:00:00Z',
  updated_at: '2026-05-26T00:00:00Z',
};
const userPending = {
  id: 3,
  username: 'carol',
  email: 'carol@example.com',
  is_admin: 0 as const,
  status: 'pending' as const,
  created_at: '2026-05-25T00:00:00Z',
  updated_at: '2026-05-25T00:00:00Z',
};
const userDisabled = {
  id: 4,
  username: 'dave',
  email: 'dave@example.com',
  is_admin: 0 as const,
  status: 'disabled' as const,
  created_at: '2026-05-24T00:00:00Z',
  updated_at: '2026-05-24T00:00:00Z',
};
const profileNoPin = {
  id: 7,
  user_id: 1,
  name: 'Kids',
  pin_hash: null,
  rating: 1,
  created_at: '2026-05-27T00:00:00Z',
};
const profileWithPin = { ...profileNoPin, id: 8, name: 'Adults', pin_hash: 'x' as unknown as null };

/** A relay bandwidth rollup for user 1 (100 GiB down cap, 3 streams, 5 Mbps throttle). */
const bandwidthA = {
  user_id: 'u-1',
  bytes_in: 2048,
  bytes_out: 512,
  quota_bytes_in: 107374182400, // 100 GiB
  quota_bytes_out: 0,
  max_concurrent_streams: 3,
  throttle_bps: 5000000,
};

interface Overrides {
  users?: unknown[];
  profiles?: unknown[];
  bandwidth?: unknown;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/users') return { users: over.users ?? [userA, userB] };
    if (/\/api\/v1\/admin\/users\/\d+\/profiles$/.test(endpoint)) {
      return { profiles: over.profiles ?? [profileNoPin, profileWithPin] };
    }
    if (/\/api\/v1\/admin\/users\/\d+\/bandwidth$/.test(endpoint)) {
      return over.bandwidth ?? bandwidthA;
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({ message: 'ok', user_id: 99, profile_id: 99, new_password: 'NewPass12' }));
  const put = vi.fn(async () => ({ message: 'ok' }));
  const del = vi.fn(async () => ({ message: 'ok' }));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(UsersPage, { props: { client }, attachTo: document.body });
}

/** Mount as the HUB app so the hub-only Relay control renders (`phlixConfig.app === 'hub'`). */
function mountHubPage(client: ApiClient): VueWrapper {
  return mount(UsersPage, {
    props: { client },
    attachTo: document.body,
    global: { provide: { phlixConfig: { app: 'hub' } } },
  });
}

/** Find a Button by its (trimmed) text. */
function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

/**
 * Find a Button by its trimmed text but only among those whose root element is
 * inside `root` (a teleported modal panel / subform). Modal content teleports to
 * `document.body`, so several buttons can share the same label (e.g. a row's
 * "Delete" and the confirm modal's "Delete"); scope to the right container.
 */
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

describe('Admin UsersPage — list', () => {
  it('loads and renders the user rows', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/users');
    const text = w.text();
    expect(text).toContain('alice');
    expect(text).toContain('bob@example.com');
    expect(text).toContain('Admin');
    expect(text).toContain('User');
    w.unmount();
  });

  it('shows a skeleton while loading then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(
      () => new Promise((r) => { resolve = r; }),
    );
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-users__skel').exists()).toBe(true);
    resolve({ users: [userA] });
    await flushPromises();
    expect(w.find('table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when there are no users', async () => {
    const { client } = makeClient({ users: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No users yet');
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the user list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    // R5.3d.1: the load failure renders an in-body EmptyState (error + Retry)
    // instead of the misleading "No users yet", and still fires a toast.
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain('load users');
    expect(w.text()).toContain('boom');
    expect(w.text()).not.toContain('No users yet');
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
    w.unmount();
  });

  it('retries the user list load from the error state', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce({ users: [userA] });
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledTimes(2);
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.find('table').exists()).toBe(true);
    expect(w.text()).toContain('alice');
    w.unmount();
  });
});

describe('Admin UsersPage — create / edit / delete', () => {
  it('creates a user via the modal form', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add user')!.trigger('click');
    await flushPromises();
    const inputs = document.querySelectorAll<HTMLInputElement>('.admin-users__input');
    inputs[0].value = 'carol'; inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'carol@example.com'; inputs[1].dispatchEvent(new Event('input'));
    inputs[2].value = 'password1'; inputs[2].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtn(w, 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users', {
      username: 'carol',
      email: 'carol@example.com',
      password: 'password1',
      is_admin: false,
    });
    // Refetches the list after the mutation.
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/users').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('rejects a too-short password on create', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add user')!.trigger('click');
    await flushPromises();
    const inputs = document.querySelectorAll<HTMLInputElement>('.admin-users__input');
    inputs[0].value = 'carol'; inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'carol@example.com'; inputs[1].dispatchEvent(new Event('input'));
    inputs[2].value = 'short'; inputs[2].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtn(w, 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('at least 8'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('requires username and email', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add user')!.trigger('click');
    await flushPromises();
    await findBtn(w, 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('required'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('edits a user and calls setAdmin when the admin flag changes', async () => {
    const { client, put, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // bob (id 2) is not an admin — edit and promote.
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit bob')!.trigger('click');
    await flushPromises();
    // Toggle the admin switch on.
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    await findBtn(w, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/2', { username: 'bob', email: 'bob@example.com' });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/2/set-admin', { is_admin: true });
    w.unmount();
  });

  it('edit includes a new password only when entered', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit alice')!.trigger('click');
    await flushPromises();
    const inputs = document.querySelectorAll<HTMLInputElement>('.admin-users__input');
    inputs[2].value = 'brandnewpass'; inputs[2].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtn(w, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/1', {
      username: 'alice',
      email: 'alice@example.com',
      password: 'brandnewpass',
    });
    w.unmount();
  });

  it('deletes a user after confirmation', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete alice')!.trigger('click');
    await flushPromises();
    // Scope to the confirm modal — the row also has a "Delete" button.
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/users/1');
    w.unmount();
  });
});

/**
 * S06 — anti-autofill hints on the password input.
 *
 * jsdom cannot simulate a real password-manager autofill offer, so the
 * regression guard is the rendered DOM: the create/edit password input must
 * carry `autocomplete="new-password"` + the four opt-out hints, while the
 * non-secret username field on the same form must NOT.
 */
describe('Admin UsersPage — anti-autofill hints on the password input (S06)', () => {
  it('stamps the password input with new-password + password-manager ignore hints', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add user')!.trigger('click');
    await flushPromises();
    // Modal input order: [0] username, [1] email, [2] password.
    const password = document.querySelectorAll<HTMLInputElement>('.admin-users__input')[2];
    expect(password.getAttribute('type')).toBe('password');
    expect(password.getAttribute('autocomplete')).toBe('new-password');
    expect(password.getAttribute('data-lpignore')).toBe('true');
    expect(password.hasAttribute('data-1p-ignore')).toBe(true);
    expect(password.hasAttribute('data-bwignore')).toBe(true);
    expect(password.getAttribute('data-form-type')).toBe('other');
    w.unmount();
  });

  it('does NOT stamp the hints on the non-secret username field (no over-application)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add user')!.trigger('click');
    await flushPromises();
    const username = document.querySelectorAll<HTMLInputElement>('.admin-users__input')[0];
    expect(username.getAttribute('autocomplete')).toBe('off');
    expect(username.hasAttribute('data-form-type')).toBe(false);
    expect(username.hasAttribute('data-1p-ignore')).toBe(false);
    expect(username.hasAttribute('data-lpignore')).toBe(false);
    w.unmount();
  });
});

describe('Admin UsersPage — set admin + reset password', () => {
  it('toggles admin from the row action', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // alice is admin → Demote sends is_admin:false.
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Demote alice')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/1/set-admin', { is_admin: false });
    // bob is not admin → Set Admin sends is_admin:true.
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Promote bob')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/2/set-admin', { is_admin: true });
    w.unmount();
  });

  it('computes the row toggle target correctly for every is_admin wire shape', async () => {
    // The list flows through the real AdminUsersApi (normalizeBool), so a row that
    // arrives as `1`/`"1"`/`true` is an admin (label "Demote", target false) and a
    // row that arrives as `0`/`"0"`/`false` is not (label "Set Admin", target true).
    // Pre-normalization this compared `0 | 1` against a boolean and mis-toggled.
    const adminNum = { ...userA, id: 11, username: 'an', is_admin: 1 as unknown as boolean };
    const adminStr = { ...userA, id: 12, username: 'as', is_admin: '1' as unknown as boolean };
    const adminBool = { ...userA, id: 13, username: 'ab', is_admin: true };
    const plainNum = { ...userB, id: 21, username: 'pn', is_admin: 0 as unknown as boolean };
    const plainStr = { ...userB, id: 22, username: 'ps', is_admin: '0' as unknown as boolean };
    const plainBool = { ...userB, id: 23, username: 'pb', is_admin: false };
    const { client, post } = makeClient({
      users: [adminNum, adminStr, adminBool, plainNum, plainStr, plainBool],
    });
    const w = mountPage(client);
    await flushPromises();

    // Admins (any wire shape) render a "Demote" action that targets is_admin:false.
    for (const u of [adminNum, adminStr, adminBool]) {
      await w
        .findAllComponents(Button)
        .find((b) => b.attributes('aria-label') === `Demote ${u.username}`)!
        .trigger('click');
      await flushPromises();
      expect(post).toHaveBeenCalledWith(`/api/v1/admin/users/${u.id}/set-admin`, { is_admin: false });
    }
    // Non-admins (any wire shape) render a "Promote" action that targets is_admin:true.
    for (const u of [plainNum, plainStr, plainBool]) {
      await w
        .findAllComponents(Button)
        .find((b) => b.attributes('aria-label') === `Promote ${u.username}`)!
        .trigger('click');
      await flushPromises();
      expect(post).toHaveBeenCalledWith(`/api/v1/admin/users/${u.id}/set-admin`, { is_admin: true });
    }
    w.unmount();
  });

  it('edit form preselects the admin switch from a numeric is_admin wire value', async () => {
    // `is_admin: 1` (numeric wire) must normalize so the edit switch starts ON and
    // saving WITHOUT toggling does NOT spuriously hit set-admin (the latent bug).
    const adminNum = { ...userA, id: 31, username: 'numadmin', is_admin: 1 as unknown as boolean };
    const { client, post, put } = makeClient({ users: [adminNum] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Edit numadmin')!
      .trigger('click');
    await flushPromises();
    // Switch reflects normalized admin = true.
    expect(w.findComponent(Switch).props('modelValue')).toBe(true);
    await findBtn(w, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/31', {
      username: 'numadmin',
      email: 'alice@example.com',
    });
    // Admin flag unchanged (true → true) → set-admin never hit.
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/users/31/set-admin', expect.anything());
    w.unmount();
  });

  it('resets a password and reveals the generated value', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Reset password for alice')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/1/reset-password');
    // The generated password renders in a readonly input's value, not text.
    const pwInput = modalPanel().querySelector<HTMLInputElement>('.admin-users__input[readonly]')!;
    expect(pwInput.value).toContain('NewPass12');
    w.unmount();
  });

  it('toasts when reset password fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('reset boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Reset password for alice')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'reset boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin UsersPage — profiles modal', () => {
  async function openProfiles(w: VueWrapper) {
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Manage profiles for alice')!.trigger('click');
    await flushPromises();
  }

  it('loads profiles for the user and renders PIN status', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/users/1/profiles');
    expect(document.body.textContent).toContain('Kids');
    expect(document.body.textContent).toContain('Has PIN');
    expect(document.body.textContent).toContain('No PIN');
    w.unmount();
  });

  it('shows an empty state with no profiles', async () => {
    const { client } = makeClient({ profiles: [] });
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    expect(document.body.textContent).toContain('No profiles yet');
    w.unmount();
  });

  it('creates a profile', async () => {
    const { client, post } = makeClient({ profiles: [] });
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await findBtn(w, 'Add profile')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.admin-users__subform .admin-users__input')!;
    nameInput.value = 'Guest'; nameInput.dispatchEvent(new Event('input'));
    await flushPromises();
    // Pick a rating via the Select.
    w.findAllComponents(Select).forEach((s) => s.vm.$emit('update:modelValue', 2));
    await flushPromises();
    await findBtn(w, 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/1/profiles', { name: 'Guest', rating: 2 });
    w.unmount();
  });

  it('blocks adding a profile beyond the 5-profile limit', async () => {
    const fiveProfiles = Array.from({ length: 5 }, (_, i) => ({ ...profileNoPin, id: 100 + i, name: `P${i}` }));
    const { client } = makeClient({ profiles: fiveProfiles });
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    const addBtn = w.findAllComponents(Button).find((b) => b.text().includes('Add profile'));
    expect(addBtn!.text()).toContain('max 5');
    expect(addBtn!.attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('edits a profile', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit profile Kids')!.trigger('click');
    await flushPromises();
    await findBtn(w, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/profiles/7', { name: 'Kids', rating: 1 });
    w.unmount();
  });

  it('deletes a profile after confirmation', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete profile Kids')!.trigger('click');
    await flushPromises();
    // Scope to the confirm subform — each profile row also has a "Delete" button.
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    await findBtnIn(w, subform, 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/profiles/7');
    w.unmount();
  });

  it('sets a PIN with a valid 4-digit value', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Set PIN for Kids')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    const pinInput = subform.querySelector<HTMLInputElement>('.admin-users__input')!;
    pinInput.value = '1234'; pinInput.dispatchEvent(new Event('input'));
    await flushPromises();
    // Scope to the subform — each profile row also has a "Set PIN" button.
    await findBtnIn(w, subform, 'Set PIN')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/profiles/7/pin', { pin: '1234' });
    w.unmount();
  });

  it('rejects an invalid PIN', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Set PIN for Kids')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    const pinInput = subform.querySelector<HTMLInputElement>('.admin-users__input')!;
    pinInput.value = '12'; pinInput.dispatchEvent(new Event('input'));
    await flushPromises();
    // Scope to the subform — each profile row also has a "Set PIN" button.
    await findBtnIn(w, subform, 'Set PIN')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('4 or 6 digits'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('clears a PIN from a profile that has one', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Clear PIN for Adults')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/profiles/8/pin');
    w.unmount();
  });

  it('toasts when profiles fail to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/users') return { users: [userA] };
      throw new Error('profiles boom');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Manage profiles for alice')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'profiles boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin UsersPage — user mutation error & branch paths', () => {
  it('cancels the add-user form without mutating', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add user')!.trigger('click');
    await flushPromises();
    expect(modalPanel()).toBeTruthy();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    // Modal closed (userFormOpen → false): no Create button remains.
    expect(findBtn(w, 'Create')).toBeUndefined();
    w.unmount();
  });

  it('toasts when create fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('create boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add user')!.trigger('click');
    await flushPromises();
    const inputs = document.querySelectorAll<HTMLInputElement>('.admin-users__input');
    inputs[0].value = 'carol'; inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'carol@example.com'; inputs[1].dispatchEvent(new Event('input'));
    inputs[2].value = 'password1'; inputs[2].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtn(w, 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'create boom')).toBe(true);
    w.unmount();
  });

  it('edits a user without touching admin when the flag is unchanged', async () => {
    const { client, put, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // bob (id 2) is not admin; edit and save without toggling the switch.
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit bob')!.trigger('click');
    await flushPromises();
    await findBtn(w, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/2', { username: 'bob', email: 'bob@example.com' });
    // Admin flag unchanged → setAdmin endpoint never hit.
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/users/2/set-admin', expect.anything());
    w.unmount();
  });

  it('toasts when an edit (PUT) fails', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new Error('update boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit alice')!.trigger('click');
    await flushPromises();
    await findBtn(w, 'Save')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'update boom')).toBe(true);
    w.unmount();
  });

  it('toasts when deleting a user fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('delete boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete alice')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'delete boom')).toBe(true);
    w.unmount();
  });

  it('cancels the delete-user confirm without deleting', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete alice')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when set-admin from the row action fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('admin boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Demote alice')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'admin boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin UsersPage — reset password modal', () => {
  it('copies the generated password to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Reset password for alice')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Copy')!.trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith('NewPass12');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('copied'))).toBe(true);
    vi.unstubAllGlobals();
    w.unmount();
  });

  it('toasts when the clipboard copy rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Reset password for alice')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Copy')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('Could not copy'))).toBe(true);
    vi.unstubAllGlobals();
    w.unmount();
  });

  it('closes the reset-password modal via Close', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Reset password for alice')!.trigger('click');
    await flushPromises();
    // the generated password renders in a readonly input (not text content)
    expect((modalPanel()!.querySelector('.admin-users__input[readonly]') as HTMLInputElement).value).toBe('NewPass12');
    await findBtnIn(w, modalPanel(), 'Close')!.trigger('click');
    await flushPromises();
    // Modal closed → no Copy button left.
    expect(findBtn(w, 'Copy')).toBeUndefined();
    w.unmount();
  });
});

describe('Admin UsersPage — profile mutation error & branch paths', () => {
  async function openProfiles(w: VueWrapper) {
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Manage profiles for alice')!.trigger('click');
    await flushPromises();
  }

  it('renders the UNRATED fallback label for an out-of-range rating', async () => {
    const oddProfile = { ...profileNoPin, id: 9, name: 'Weird', rating: 99 };
    const { client } = makeClient({ profiles: [oddProfile] });
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    expect(document.body.textContent).toContain('UNRATED');
    w.unmount();
  });

  it('cancels the add-profile subform', async () => {
    const { client, post } = makeClient({ profiles: [] });
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await findBtn(w, 'Add profile')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    await findBtnIn(w, subform, 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/users/1/profiles', expect.anything());
    // Subform closed.
    expect(modalPanel().querySelector('.admin-users__subform')).toBeNull();
    w.unmount();
  });

  it('requires a profile name', async () => {
    const { client, post } = makeClient({ profiles: [] });
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await findBtn(w, 'Add profile')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    await findBtnIn(w, subform, 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('Profile name is required'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when creating a profile fails', async () => {
    const { client, post } = makeClient({ profiles: [] });
    post.mockRejectedValueOnce(new Error('profile create boom'));
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await findBtn(w, 'Add profile')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.admin-users__subform .admin-users__input')!;
    nameInput.value = 'Guest'; nameInput.dispatchEvent(new Event('input'));
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    await findBtnIn(w, subform, 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'profile create boom')).toBe(true);
    w.unmount();
  });

  it('toasts when editing a profile fails', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new Error('profile update boom'));
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit profile Kids')!.trigger('click');
    await flushPromises();
    await findBtn(w, 'Save')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'profile update boom')).toBe(true);
    w.unmount();
  });

  it('toasts when deleting a profile fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('profile delete boom'));
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete profile Kids')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    await findBtnIn(w, subform, 'Delete')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'profile delete boom')).toBe(true);
    w.unmount();
  });

  it('cancels the delete-profile confirm without deleting', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete profile Kids')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    await findBtnIn(w, subform, 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when setting a PIN fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('pin boom'));
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Set PIN for Kids')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    const pinInput = subform.querySelector<HTMLInputElement>('.admin-users__input')!;
    pinInput.value = '123456'; pinInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, subform, 'Set PIN')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'pin boom')).toBe(true);
    w.unmount();
  });

  it('cancels the set-PIN subform', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Set PIN for Kids')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    await findBtnIn(w, subform, 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    expect(modalPanel().querySelector('.admin-users__subform')).toBeNull();
    w.unmount();
  });

  it('toasts when clearing a PIN fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('clear boom'));
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Clear PIN for Adults')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'clear boom')).toBe(true);
    w.unmount();
  });

  it('blocks the create submit when already at the 5-profile limit', async () => {
    // Open the add-profile subform while under the limit (Add button enabled),
    // then push the user to the limit via a profiles refetch before submitting
    // so the in-handler `atProfileLimit` guard — not just the disabled button —
    // is exercised. Reopening "Manage profiles" refetches without clearing the
    // already-open create subform.
    const fourProfiles = Array.from({ length: 4 }, (_, i) => ({ ...profileNoPin, id: 200 + i, name: `P${i}` }));
    const fiveProfiles = Array.from({ length: 5 }, (_, i) => ({ ...profileNoPin, id: 200 + i, name: `P${i}` }));
    let profilesPayload: unknown[] = fourProfiles;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/users') return { users: [userA] };
      if (/\/api\/v1\/admin\/users\/\d+\/profiles$/.test(endpoint)) return { profiles: profilesPayload };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const post = vi.fn(async () => ({ message: 'ok', profile_id: 99 }));
    const client = { get, post, put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await openProfiles(w);
    await findBtn(w, 'Add profile')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.admin-users__subform .admin-users__input')!;
    nameInput.value = 'Sixth'; nameInput.dispatchEvent(new Event('input'));
    await flushPromises();
    // Refetch with five profiles so atProfileLimit becomes true.
    profilesPayload = fiveProfiles;
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Manage profiles for alice')!.trigger('click');
    await flushPromises();
    const subform = modalPanel().querySelector<HTMLElement>('.admin-users__subform')!;
    await findBtnIn(w, subform, 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('Maximum 5 profiles'))).toBe(true);
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/users/1/profiles', expect.anything());
    w.unmount();
  });
});

describe('Admin UsersPage — status badges + approval queue (S1)', () => {
  it('renders a status badge for each user', async () => {
    const { client } = makeClient({ users: [userA, userPending, userDisabled] });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('Active');
    expect(text).toContain('Pending');
    expect(text).toContain('Disabled');
    w.unmount();
  });

  it('treats a missing status as Active', async () => {
    const noStatus = { ...userA, status: undefined };
    const { client } = makeClient({ users: [noStatus] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Active');
    w.unmount();
  });

  it('shows a prominent Pending approval queue with the count', async () => {
    const { client } = makeClient({ users: [userA, userPending] });
    const w = mountPage(client);
    await flushPromises();
    const pending = w.find('.admin-users__pending');
    expect(pending.exists()).toBe(true);
    expect(pending.text()).toContain('Pending approval');
    expect(pending.text()).toContain('carol');
    w.unmount();
  });

  it('hides the pending queue when there are none', async () => {
    const { client } = makeClient({ users: [userA, userB] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-users__pending').exists()).toBe(false);
    w.unmount();
  });

  it('approves a pending user and refreshes the list', async () => {
    const { client, post, get } = makeClient({ users: [userPending] });
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.filter((c) => c[0] === '/api/v1/admin/users').length;
    // Two Approve buttons exist (queue + row) — both call approve(3); use the first.
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Approve carol')!
      .trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/3/approve');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/users').length).toBeGreaterThan(before);
    w.unmount();
  });

  it('toasts when approve fails', async () => {
    const { client, post } = makeClient({ users: [userPending] });
    post.mockRejectedValueOnce(new Error('approve boom'));
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Approve carol')!
      .trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'approve boom')).toBe(true);
    w.unmount();
  });

  it('rejects a pending user after confirmation', async () => {
    const { client, post } = makeClient({ users: [userPending] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Reject carol')!
      .trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Reject')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/3/reject');
    w.unmount();
  });

  it('cancels the reject confirm without rejecting', async () => {
    const { client, post } = makeClient({ users: [userPending] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Reject carol')!
      .trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/users/3/reject');
    w.unmount();
  });

  it('disables an active user after confirmation', async () => {
    const { client, post } = makeClient({ users: [userB] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Disable bob')!
      .trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Disable')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/2/disable');
    w.unmount();
  });

  it('toasts when disable fails', async () => {
    const { client, post } = makeClient({ users: [userB] });
    post.mockRejectedValueOnce(new Error('disable boom'));
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Disable bob')!
      .trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Disable')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'disable boom')).toBe(true);
    w.unmount();
  });

  it('enables a disabled user (calls approve → active)', async () => {
    const { client, post } = makeClient({ users: [userDisabled] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Enable dave')!
      .trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/4/approve');
    w.unmount();
  });
});

/**
 * S41 (deferred follow-up) — the per-user relay quota + bandwidth-throttle admin
 * control. It is HUB-ONLY (the media server does not serve the `/bandwidth`,
 * `/quota`, `/throttle` sub-routes), so the "Relay" row action renders only when
 * the page runs inside the hub app (`phlixConfig.app === 'hub'`).
 */
describe('Admin UsersPage — relay limits (hub-only)', () => {
  const relayBtn = (w: VueWrapper, user: string) =>
    w.findAllComponents(Button).find((b) => b.attributes('aria-label') === `Relay limits for ${user}`);

  /** The number inputs in the relay modal, in order: [0] download, [1] upload, [2] streams. */
  function quotaInputs(): HTMLInputElement[] {
    return Array.from(modalPanel().querySelectorAll<HTMLInputElement>('.admin-users__input'));
  }

  async function openRelay(w: VueWrapper, user = 'alice') {
    await relayBtn(w, user)!.trigger('click');
    await flushPromises();
  }

  it('does NOT render the Relay action on the media server (no hub config)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(relayBtn(w, 'alice')).toBeUndefined();
    w.unmount();
  });

  it('renders the Relay action in the hub and loads the current limits', async () => {
    const { client, get } = makeClient();
    const w = mountHubPage(client);
    await flushPromises();
    expect(relayBtn(w, 'alice')).toBeDefined();
    await openRelay(w);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/users/1/bandwidth');
    // Throttle preselected from the loaded value (5 Mbps).
    expect(w.findComponent(Select).props('modelValue')).toBe(5000000);
    // Quota inputs populated: 100 GiB down, 0 up, 3 streams.
    const [down, up, streams] = quotaInputs();
    expect(down.value).toBe('100');
    expect(up.value).toBe('0');
    expect(streams.value).toBe('3');
    // Current usage is surfaced.
    expect(modalPanel().textContent).toContain('2 KiB');
    w.unmount();
  });

  it('saves a changed throttle via PUT /throttle only (quota untouched)', async () => {
    const { client, put } = makeClient();
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    // Bump the throttle to 10 Mbps.
    w.findComponent(Select).vm.$emit('update:modelValue', 10000000);
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/1/throttle', { throttle_bps: 10000000 });
    expect(put).not.toHaveBeenCalledWith('/api/v1/admin/users/1/quota', expect.anything());
    w.unmount();
  });

  it('saves changed quota via PUT /quota only (throttle untouched)', async () => {
    const { client, put } = makeClient();
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    // Lower the download cap from 100 GiB to 50 GiB.
    const [down] = quotaInputs();
    down.value = '50';
    down.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/1/quota', {
      quota_bytes_in: 53687091200, // 50 GiB
      quota_bytes_out: 0,
      max_concurrent_streams: 3,
    });
    expect(put).not.toHaveBeenCalledWith('/api/v1/admin/users/1/throttle', expect.anything());
    w.unmount();
  });

  it('saves both endpoints when both changed', async () => {
    const { client, put } = makeClient();
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    w.findComponent(Select).vm.$emit('update:modelValue', 0); // Unlimited
    const [, , streams] = quotaInputs();
    streams.value = '5';
    streams.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/1/throttle', { throttle_bps: 0 });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/1/quota', {
      quota_bytes_in: 107374182400,
      quota_bytes_out: 0,
      max_concurrent_streams: 5,
    });
    w.unmount();
  });

  it('does not PUT anything when nothing changed', async () => {
    const { client, put } = makeClient();
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).not.toHaveBeenCalled();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('No changes'))).toBe(true);
    w.unmount();
  });

  // LOW review finding fix — change detection compares the input STRING against the
  // seed captured when the modal opened (not re-parsed GiB→bytes vs the loaded
  // bytes). A quota byte value set OUTSIDE this UI (e.g. via curl) that is NOT an
  // exact multiple of what the GiB input round-trips (100 GiB + 500 B renders as
  // the trimmed "100") must NOT be flagged "changed" on a no-op Save — the old
  // byte-reparse would give 107374182400 ≠ 107374182900 and fire a spurious PUT.
  it('does NOT fire a spurious quota PUT for a drifted byte cap set outside this UI (no-op Save)', async () => {
    const drifted = { ...bandwidthA, quota_bytes_in: 107374182900 }; // 100 GiB + 500 B
    const { client, put } = makeClient({ bandwidth: drifted });
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    // The drifted cap still renders as the trimmed "100" GiB input.
    const [down] = quotaInputs();
    expect(down.value).toBe('100');
    // Save without touching anything.
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    // No spurious drifted PUT — neither quota nor throttle.
    expect(put).not.toHaveBeenCalledWith('/api/v1/admin/users/1/quota', expect.anything());
    expect(put).not.toHaveBeenCalledWith('/api/v1/admin/users/1/throttle', expect.anything());
    expect(put).not.toHaveBeenCalled();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('No changes'))).toBe(true);
    w.unmount();
  });

  it('changing ONLY the throttle does not drag a drifted quota into a spurious PUT', async () => {
    const drifted = { ...bandwidthA, quota_bytes_in: 107374182900 }; // 100 GiB + 500 B
    const { client, put } = makeClient({ bandwidth: drifted });
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    // Change the throttle only (quota inputs untouched).
    w.findComponent(Select).vm.$emit('update:modelValue', 10000000);
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/1/throttle', { throttle_bps: 10000000 });
    // The untouched, drifted quota must NOT be dragged into a spurious PUT.
    expect(put).not.toHaveBeenCalledWith('/api/v1/admin/users/1/quota', expect.anything());
    w.unmount();
  });

  it('rejects an out-of-range quota (over 1 PiB) without PUTing', async () => {
    const { client, put } = makeClient();
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    const [down] = quotaInputs();
    down.value = '2000000'; // 2,000,000 GiB > 1 PiB
    down.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).not.toHaveBeenCalled();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('Byte caps'))).toBe(true);
    w.unmount();
  });

  it('rejects an out-of-range concurrent-stream cap without PUTing', async () => {
    const { client, put } = makeClient();
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    const [, , streams] = quotaInputs();
    streams.value = '5000'; // > 1000
    streams.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).not.toHaveBeenCalled();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('concurrent streams'))).toBe(true);
    w.unmount();
  });

  it('toasts and closes when the bandwidth load fails', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/users') return { users: [userA] };
      if (/\/bandwidth$/.test(endpoint)) throw new Error('bw boom');
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'bw boom')).toBe(true);
    // Modal did not stay open (relayUser cleared on load failure).
    expect(w.findComponent(Select).exists()).toBe(false);
    w.unmount();
  });

  it('toasts when a save fails', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new Error('save boom'));
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    w.findComponent(Select).vm.$emit('update:modelValue', 20000000);
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'save boom')).toBe(true);
    w.unmount();
  });

  it('cancels the relay modal without saving', async () => {
    const { client, put } = makeClient();
    const w = mountHubPage(client);
    await flushPromises();
    await openRelay(w);
    w.findComponent(Select).vm.$emit('update:modelValue', 50000000);
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(put).not.toHaveBeenCalled();
    expect(w.findComponent(Select).exists()).toBe(false);
    w.unmount();
  });
});
