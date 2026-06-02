import { describe, it, expect, vi } from 'vitest';
import { AdminSyncPlayApi } from './syncPlay';
import type { ApiClient } from '../client';

/** A mock ApiClient whose verbs are vi.fn()s the test can assert on. */
function makeClient() {
  const get = vi.fn();
  const post = vi.fn();
  const put = vi.fn();
  const patch = vi.fn();
  const del = vi.fn();
  const client = { get, post, put, patch, delete: del } as unknown as ApiClient;
  return { api: new AdminSyncPlayApi(client), get, post, put, patch, del };
}

const sampleGroup = {
  id: 'sp_abc123',
  name: 'Movie Night',
  member_count: 3,
  has_password: false,
  current_media: null,
  is_playing: false,
};

const sampleGroupState = {
  id: 'sp_abc123',
  name: 'Movie Night',
  host_id: 'user-1',
  has_password: false,
  members: [
    { id: 'user-1', name: 'Alice', is_host: true, joined_at: 1717000000 },
    { id: 'user-2', name: 'Bob', is_host: false, joined_at: 1717000010 },
  ],
  playback_state: { state: 'paused', position: 120000, server_time: 1717000100 },
  queue: [],
  created_at: 1717000000,
  last_activity: 1717000100,
};

describe('AdminSyncPlayApi', () => {
  it('listGroups() GETs /api/v1/syncplay/groups and unwraps { groups }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ groups: [sampleGroup] });
    const res = await api.listGroups();
    expect(get).toHaveBeenCalledWith('/api/v1/syncplay/groups');
    expect(res).toEqual([sampleGroup]);
  });

  it('listGroups() degrades to [] when groups is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listGroups()).toEqual([]);
  });

  it('createGroup() POSTs the body and parses { success, group }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true, group: sampleGroupState });
    const res = await api.createGroup({ name: 'Movie Night' });
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups', { name: 'Movie Night' });
    expect(res).toEqual({ success: true, group: sampleGroupState });
  });

  it('createGroup() forwards the password when provided', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true, group: { ...sampleGroupState, has_password: true } });
    await api.createGroup({ name: 'Private Watch Party', password: 'secret' });
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups', {
      name: 'Private Watch Party',
      password: 'secret',
    });
  });

  it('getGroup() GETs /api/v1/syncplay/groups/{id} and unwraps { group }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ group: sampleGroupState });
    const res = await api.getGroup('sp_abc123');
    expect(get).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc123');
    expect(res.group).toEqual(sampleGroupState);
  });

  it('getGroup() encodes a path-unsafe group id', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ group: sampleGroupState });
    await api.getGroup('sp_abc/123');
    expect(get).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc%2F123');
  });

  it('joinGroup() POSTs an empty body to /join and parses { success, group }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true, group: sampleGroupState });
    const res = await api.joinGroup('sp_abc123');
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc123/join', {});
    expect(res).toEqual({ success: true, group: sampleGroupState });
  });

  it('joinGroup() forwards the password when provided', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true, group: sampleGroupState });
    await api.joinGroup('sp_abc123', { password: 'secret' });
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc123/join', { password: 'secret' });
  });

  it('joinGroup() encodes a path-unsafe group id', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true, group: sampleGroupState });
    await api.joinGroup('sp_abc/123');
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc%2F123/join', {});
  });

  it('leaveGroup() POSTs an empty body to /leave and parses { success, message }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true, message: 'Left the group' });
    const res = await api.leaveGroup('sp_abc123');
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc123/leave', {});
    expect(res).toEqual({ success: true, message: 'Left the group' });
  });

  it('leaveGroup() encodes a path-unsafe group id', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true });
    await api.leaveGroup('sp_abc/123');
    expect(post).toHaveBeenCalledWith('/api/v1/syncplay/groups/sp_abc%2F123/leave', {});
  });

  it('propagates a rejection from the client', async () => {
    const { api, get } = makeClient();
    get.mockRejectedValue(new Error('Group not found'));
    await expect(api.getGroup('sp_notfound')).rejects.toThrow('Group not found');
  });
});
