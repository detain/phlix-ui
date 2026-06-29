import { describe, it, expect, vi } from 'vitest';
import { AdminUsersApi, RATING_LABELS, RATING_OPTIONS, USER_STATUSES } from './users';
import type { ApiClient } from '../client';

/** A mock ApiClient whose verbs are vi.fn()s the test can assert on. */
function makeClient() {
  const get = vi.fn();
  const post = vi.fn();
  const put = vi.fn();
  const patch = vi.fn();
  const del = vi.fn();
  const client = { get, post, put, patch, delete: del } as unknown as ApiClient;
  return { api: new AdminUsersApi(client), get, post, put, patch, del };
}

const sampleUser = {
  id: 1,
  username: 'alice',
  email: 'alice@example.com',
  is_admin: 1 as const,
  status: 'active' as const,
  created_at: '2026-05-27T00:00:00Z',
  updated_at: '2026-05-27T00:00:00Z',
};

const sampleProfile = {
  id: 7,
  user_id: 1,
  name: 'Kids',
  pin_hash: null,
  rating: 1,
  created_at: '2026-05-27T00:00:00Z',
};

describe('AdminUsersApi — users', () => {
  it('list() GETs /api/v1/admin/users and unwraps { users }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ users: [sampleUser] });
    const res = await api.list();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/users');
    // `is_admin` is normalized to a real boolean (sampleUser ships `1`).
    expect(res).toEqual([{ ...sampleUser, is_admin: true }]);
  });

  it('list() normalizes is_admin to a boolean for every wire shape', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({
      users: [
        { ...sampleUser, id: 1, is_admin: 1 },
        { ...sampleUser, id: 2, is_admin: true },
        { ...sampleUser, id: 3, is_admin: '1' },
        { ...sampleUser, id: 4, is_admin: 0 },
        { ...sampleUser, id: 5, is_admin: '0' },
        { ...sampleUser, id: 6, is_admin: false },
      ],
    });
    const res = await api.list();
    expect(res.map((u) => u.is_admin)).toEqual([true, true, true, false, false, false]);
    // Every value is a real boolean, never a number/string.
    expect(res.every((u) => typeof u.is_admin === 'boolean')).toBe(true);
  });

  it('list() degrades to [] when users is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.list()).toEqual([]);
  });

  it('list({ status }) appends ?status= and unwraps { users }', async () => {
    const { api, get } = makeClient();
    const pending = { ...sampleUser, id: 5, status: 'pending' as const };
    get.mockResolvedValue({ users: [pending] });
    const res = await api.list({ status: 'pending' });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/users?status=pending');
    // `is_admin` is normalized to a real boolean (pending inherits sampleUser's `1`).
    expect(res).toEqual([{ ...pending, is_admin: true }]);
  });

  it('list() with no status omits the query string', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ users: [] });
    await api.list({});
    expect(get).toHaveBeenCalledWith('/api/v1/admin/users');
  });

  it('carries the status field through on each row', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ users: [{ ...sampleUser, status: 'disabled' }] });
    const res = await api.list();
    expect(res[0].status).toBe('disabled');
  });

  it('approve() POSTs /{id}/approve', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'approved' });
    const res = await api.approve(5);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/5/approve');
    expect(res).toEqual({ message: 'approved' });
  });

  it('disable() POSTs /{id}/disable', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'disabled' });
    const res = await api.disable(5);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/5/disable');
    expect(res).toEqual({ message: 'disabled' });
  });

  it('reject() POSTs /{id}/reject', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'rejected' });
    const res = await api.reject(5);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/5/reject');
    expect(res).toEqual({ message: 'rejected' });
  });

  it('get(id) GETs /api/v1/admin/users/{id} and unwraps { user }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ user: sampleUser });
    const res = await api.get(1);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/users/1');
    // `is_admin` is normalized to a real boolean (sampleUser ships `1`).
    expect(res).toEqual({ ...sampleUser, is_admin: true });
  });

  it('get(id) normalizes is_admin to a boolean (e.g. wire "0")', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ user: { ...sampleUser, is_admin: '0' } });
    const res = await api.get(1);
    expect(res.is_admin).toBe(false);
    expect(typeof res.is_admin).toBe('boolean');
  });

  it('create() POSTs the body and returns { user_id, message }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ user_id: 9, message: 'User created.' });
    const res = await api.create({
      username: 'bob',
      email: 'bob@example.com',
      password: 'secret123',
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users', {
      username: 'bob',
      email: 'bob@example.com',
      password: 'secret123',
    });
    expect(res).toEqual({ user_id: 9, message: 'User created.' });
  });

  it('create() forwards is_admin when provided', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ user_id: 9, message: 'ok' });
    await api.create({
      username: 'bob',
      email: 'bob@example.com',
      password: 'secret123',
      is_admin: true,
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users', {
      username: 'bob',
      email: 'bob@example.com',
      password: 'secret123',
      is_admin: true,
    });
  });

  it('update() PUTs only the provided fields', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({ message: 'updated' });
    const res = await api.update(1, { username: 'alice2' });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/users/1', { username: 'alice2' });
    expect(res).toEqual({ message: 'updated' });
  });

  it('remove() DELETEs /api/v1/admin/users/{id}', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ message: 'deleted' });
    const res = await api.remove(1);
    expect(del).toHaveBeenCalledWith('/api/v1/admin/users/1');
    expect(res).toEqual({ message: 'deleted' });
  });

  it('setAdmin() POSTs /{id}/set-admin with { is_admin: bool }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'admin updated' });
    const res = await api.setAdmin(1, true);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/1/set-admin', { is_admin: true });
    expect(res).toEqual({ message: 'admin updated' });
  });

  it('setAdmin() sends a real boolean false (not 0)', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'ok' });
    await api.setAdmin(2, false);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/2/set-admin', { is_admin: false });
  });

  it('resetPassword() POSTs /{id}/reset-password and parses { message, new_password }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'Password reset.', new_password: 'TempPass99' });
    const res = await api.resetPassword(1);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/1/reset-password');
    expect(res).toEqual({ message: 'Password reset.', new_password: 'TempPass99' });
  });

  it('propagates a rejection from the client (e.g. last-admin delete)', async () => {
    const { api, del } = makeClient();
    del.mockRejectedValue(new Error('Cannot delete the last admin'));
    await expect(api.remove(1)).rejects.toThrow('Cannot delete the last admin');
  });
});

describe('AdminUsersApi — profiles', () => {
  it('listProfiles() GETs /users/{userId}/profiles and unwraps { profiles }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ profiles: [sampleProfile] });
    const res = await api.listProfiles(1);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/users/1/profiles');
    expect(res).toEqual([sampleProfile]);
  });

  it('listProfiles() degrades to [] when profiles is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listProfiles(1)).toEqual([]);
  });

  it('createProfile() POSTs the body and returns { profile_id, message }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ profile_id: 12, message: 'Profile created.' });
    const res = await api.createProfile(1, { name: 'Kids', rating: 1 });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/users/1/profiles', { name: 'Kids', rating: 1 });
    expect(res).toEqual({ profile_id: 12, message: 'Profile created.' });
  });

  it('updateProfile() PUTs /profiles/{id}', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({ message: 'updated' });
    const res = await api.updateProfile(7, { name: 'Teens', rating: 2 });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/profiles/7', { name: 'Teens', rating: 2 });
    expect(res).toEqual({ message: 'updated' });
  });

  it('removeProfile() DELETEs /profiles/{id}', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ message: 'deleted' });
    const res = await api.removeProfile(7);
    expect(del).toHaveBeenCalledWith('/api/v1/admin/profiles/7');
    expect(res).toEqual({ message: 'deleted' });
  });

  it('setPin() POSTs /profiles/{id}/pin with { pin }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'PIN set' });
    const res = await api.setPin(7, '1234');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/profiles/7/pin', { pin: '1234' });
    expect(res).toEqual({ message: 'PIN set' });
  });

  it('clearPin() DELETEs /profiles/{id}/pin', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ message: 'PIN cleared' });
    const res = await api.clearPin(7);
    expect(del).toHaveBeenCalledWith('/api/v1/admin/profiles/7/pin');
    expect(res).toEqual({ message: 'PIN cleared' });
  });
});

describe('rating tables', () => {
  it('RATING_LABELS covers the full 0-6 scale', () => {
    expect(Object.keys(RATING_LABELS)).toHaveLength(7);
    expect(RATING_LABELS[0]).toContain('G');
    expect(RATING_LABELS[6]).toContain('UNRATED');
  });

  it('RATING_OPTIONS mirrors RATING_LABELS with numeric values', () => {
    expect(RATING_OPTIONS).toHaveLength(7);
    expect(RATING_OPTIONS[0]).toEqual({ value: 0, label: RATING_LABELS[0] });
    expect(RATING_OPTIONS.every((o) => typeof o.value === 'number')).toBe(true);
  });
});

describe('user statuses', () => {
  it('USER_STATUSES lists the three statuses, pending first', () => {
    expect(USER_STATUSES).toEqual(['pending', 'active', 'disabled']);
  });
});
