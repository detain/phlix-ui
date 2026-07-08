/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminHubDashboardApi } from './hubDashboard';
import type { ApiClient } from '../client';

function clientWith(get: ReturnType<typeof vi.fn>): ApiClient {
  return { get } as unknown as ApiClient;
}

const summaryPayload = {
  servers: { total: 5, online: 3, offline: 2 },
  activeRelaySessions: 4,
  pendingRequests: 7,
  userCount: 12,
};

const auditEvent = {
  id: 'evt-1',
  action: 'server.enrolled',
  actor: 'alice',
  target: 'media-box-1',
  created_at: '2026-06-04T10:00:00Z',
};

describe('AdminHubDashboardApi', () => {
  // -------------------------------------------------------------------------
  // getSummary
  // -------------------------------------------------------------------------

  it('getSummary() GETs the summary endpoint and unwraps { success, data }', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: summaryPayload });
    const api = new AdminHubDashboardApi(clientWith(get));
    const res = await api.getSummary();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/summary');
    expect(res).toEqual(summaryPayload);
  });

  it('getSummary() normalises snake_case + nested server fields', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      data: {
        servers: { total: '8', online: '6', offline: '2' },
        active_relay_sessions: '3',
        pending_requests: 1,
        user_count: '20',
      },
    });
    const api = new AdminHubDashboardApi(clientWith(get));
    expect(await api.getSummary()).toEqual({
      servers: { total: 8, online: 6, offline: 2 },
      activeRelaySessions: 3,
      pendingRequests: 1,
      userCount: 20,
    });
  });

  it('getSummary() degrades to zeros when the payload is missing/partial', async () => {
    const api = new AdminHubDashboardApi(clientWith(vi.fn().mockResolvedValue({ success: true })));
    expect(await api.getSummary()).toEqual({
      servers: { total: 0, online: 0, offline: 0 },
      activeRelaySessions: 0,
      pendingRequests: 0,
      userCount: 0,
    });
  });

  it('getSummary() tolerates a non-object servers field', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: { servers: null, userCount: 4 } });
    const api = new AdminHubDashboardApi(clientWith(get));
    const res = await api.getSummary();
    expect(res.servers).toEqual({ total: 0, online: 0, offline: 0 });
    expect(res.userCount).toBe(4);
  });

  // -------------------------------------------------------------------------
  // getRecentActivity
  // -------------------------------------------------------------------------

  it('getRecentActivity() passes the limit param and unwraps the data array', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [auditEvent] });
    const api = new AdminHubDashboardApi(clientWith(get));
    const res = await api.getRecentActivity(20);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/activity', { limit: '20' });
    expect(res).toEqual([auditEvent]);
  });

  it('getRecentActivity() omits the limit param when not provided', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [auditEvent] });
    const api = new AdminHubDashboardApi(clientWith(get));
    await api.getRecentActivity();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/activity', undefined);
  });

  it('getRecentActivity() degrades to [] when data is not an array', async () => {
    const api = new AdminHubDashboardApi(clientWith(vi.fn().mockResolvedValue({ success: true, data: {} })));
    expect(await api.getRecentActivity()).toEqual([]);
  });

  it('getRecentActivity() normalises event_type→action and falls back actor→"system"', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      data: [{ id: 'e2', event_type: 'request.approved', occurred_at: '2026-06-04T11:00:00Z' }],
    });
    const api = new AdminHubDashboardApi(clientWith(get));
    const res = await api.getRecentActivity();
    expect(res[0]).toEqual({
      id: 'e2',
      action: 'request.approved',
      actor: 'system',
      target: '',
      created_at: '2026-06-04T11:00:00Z',
    });
  });

  it('getRecentActivity() accepts alternate actor/target field names', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      data: [{ id: 'e3', action: 'x', actor_name: 'bob', resource: 'lib-9', created_at: 't' }],
    });
    const api = new AdminHubDashboardApi(clientWith(get));
    const res = await api.getRecentActivity();
    expect(res[0]).toMatchObject({ actor: 'bob', target: 'lib-9' });
  });

  it('getRecentActivity() coerces a non-string scalar field and drops a non-scalar one', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      // `action` arrives as a number (→ stringified); `target` as an object (→ dropped to '').
      data: [{ id: 7, action: 200, target: { nested: true }, created_at: 't' }],
    });
    const api = new AdminHubDashboardApi(clientWith(get));
    const res = await api.getRecentActivity();
    expect(res[0]).toMatchObject({ id: '7', action: '200', target: '', actor: 'system' });
  });
});
