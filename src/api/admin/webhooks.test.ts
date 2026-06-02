import { describe, it, expect, vi } from 'vitest';
import {
  AdminWebhooksApi,
  SUBSCRIBABLE_EVENTS,
  WEBHOOK_EVENT_CATEGORIES,
} from './webhooks';
import type { ApiClient } from '../client';

/** A mock ApiClient whose verbs are vi.fn()s the test can assert on. */
function makeClient() {
  const get = vi.fn();
  const post = vi.fn();
  const put = vi.fn();
  const patch = vi.fn();
  const del = vi.fn();
  const client = { get, post, put, patch, delete: del } as unknown as ApiClient;
  return { api: new AdminWebhooksApi(client), get, post, put, patch, del };
}

const sampleWebhook = {
  id: 'wh-1',
  name: 'My Webhook',
  url: 'https://example.com/webhook',
  events: ['playback.started', 'library.updated'],
  created_at: '2026-05-27T00:00:00Z',
};

describe('AdminWebhooksApi — event catalog', () => {
  it('exposes 7 subscribable events (excludes webhook.test)', () => {
    expect(SUBSCRIBABLE_EVENTS).toHaveLength(7);
    expect(SUBSCRIBABLE_EVENTS).not.toContain('webhook.test');
  });

  it('groups events into 5 categories', () => {
    expect(WEBHOOK_EVENT_CATEGORIES).toHaveLength(5);
    expect(WEBHOOK_EVENT_CATEGORIES.map((c) => c.label)).toEqual([
      'Playback',
      'Library',
      'Downloads',
      'Recordings',
      'System',
    ]);
  });
});

describe('AdminWebhooksApi — list', () => {
  it('GETs /api/v1/admin/webhooks and unwraps { webhooks }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ webhooks: [sampleWebhook] });
    const res = await api.list();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/webhooks');
    expect(res).toEqual([sampleWebhook]);
  });

  it('returns empty array when no webhooks', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ webhooks: [] });
    expect(await api.list()).toEqual([]);
  });

  it('degrades to [] when webhooks is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.list()).toEqual([]);
  });
});

describe('AdminWebhooksApi — create', () => {
  it('POSTs to /api/v1/admin/webhooks with the body and unwraps { webhook }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({
      webhook: {
        id: 'wh-new',
        name: 'New',
        url: 'https://x.com/wh',
        events: ['playback.started'],
      },
    });
    const res = await api.create({
      name: 'New',
      url: 'https://x.com/wh',
      secret: 's3cr3t',
      events: ['playback.started'],
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/webhooks', {
      name: 'New',
      url: 'https://x.com/wh',
      secret: 's3cr3t',
      events: ['playback.started'],
    });
    expect(res.name).toBe('New');
  });

  it('propagates a rejection from the client (e.g. 400 invalid URL)', async () => {
    const { api, post } = makeClient();
    post.mockRejectedValue(new Error('URL is not a valid webhook URL'));
    await expect(
      api.create({ name: 'X', url: 'not-a-url', secret: 'x', events: [] }),
    ).rejects.toThrow('URL is not a valid webhook URL');
  });
});

describe('AdminWebhooksApi — update', () => {
  it('PUTs to /api/v1/admin/webhooks/{id} with the body and unwraps { webhook }', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({
      webhook: { id: 'wh-1', name: 'Updated', url: 'https://x.com/wh2', events: ['alert'] },
    });
    const res = await api.update('wh-1', {
      name: 'Updated',
      url: 'https://x.com/wh2',
      events: ['alert'],
    });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/webhooks/wh-1', {
      name: 'Updated',
      url: 'https://x.com/wh2',
      events: ['alert'],
    });
    // secret must NOT be in the forwarded body when omitted
    const body = put.mock.calls[0]![1] as Record<string, unknown>;
    expect(body).not.toHaveProperty('secret');
    expect(res.name).toBe('Updated');
  });

  it('forwards the secret when provided', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({
      webhook: { id: 'wh-1', name: 'X', url: 'https://x.com', events: [] },
    });
    await api.update('wh-1', {
      name: 'X',
      url: 'https://x.com',
      secret: 'new-secret',
      events: [],
    });
    const body = put.mock.calls[0]![1] as Record<string, unknown>;
    expect(body.secret).toBe('new-secret');
  });

  it('encodes the id segment', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({ webhook: sampleWebhook });
    await api.update('a/b', { name: 'X', url: 'https://x.com', events: [] });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/webhooks/a%2Fb', {
      name: 'X',
      url: 'https://x.com',
      events: [],
    });
  });

  it('propagates a rejection from the client (e.g. 404)', async () => {
    const { api, put } = makeClient();
    put.mockRejectedValue(new Error('Webhook not found'));
    await expect(
      api.update('nope', { name: 'X', url: 'https://x.com', events: [] }),
    ).rejects.toThrow('Webhook not found');
  });
});

describe('AdminWebhooksApi — remove', () => {
  it('DELETEs /api/v1/admin/webhooks/{id} and returns { message }', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ message: 'Webhook deleted' });
    const res = await api.remove('wh-1');
    expect(del).toHaveBeenCalledWith('/api/v1/admin/webhooks/wh-1');
    expect(res).toEqual({ message: 'Webhook deleted' });
  });

  it('synthesizes a message on 204 No Content (null body)', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue(null);
    expect(await api.remove('wh-1')).toEqual({ message: 'Webhook deleted' });
  });

  it('synthesizes a message on an undefined body', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue(undefined);
    expect(await api.remove('wh-1')).toEqual({ message: 'Webhook deleted' });
  });

  it('propagates a rejection from the client (e.g. 404)', async () => {
    const { api, del } = makeClient();
    del.mockRejectedValue(new Error('Webhook not found'));
    await expect(api.remove('nope')).rejects.toThrow('Webhook not found');
  });
});

describe('AdminWebhooksApi — test', () => {
  it('POSTs /api/v1/admin/webhooks/{id}/test and returns the dispatch result', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true, success_count: 1, failure_count: 0, failures: [] });
    const res = await api.test('wh-1');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/webhooks/wh-1/test');
    expect(res).toEqual({ success: true, success_count: 1, failure_count: 0, failures: [] });
  });

  it('returns the failure summary when delivery fails', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({
      success: false,
      success_count: 0,
      failure_count: 1,
      failures: ['Connection refused'],
    });
    const res = await api.test('wh-1');
    expect(res.success).toBe(false);
    expect(res.failure_count).toBe(1);
    expect(res.failures[0]).toBe('Connection refused');
  });

  it('propagates a rejection from the client (e.g. 404)', async () => {
    const { api, post } = makeClient();
    post.mockRejectedValue(new Error('Webhook not found'));
    await expect(api.test('nope')).rejects.toThrow('Webhook not found');
  });
});
