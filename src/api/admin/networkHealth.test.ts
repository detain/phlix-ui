/**
 * Network health API tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminNetworkHealthApi } from './networkHealth';
import type { ApiClient } from '../client';

/** A mock ApiClient that returns different responses based on the URL.
 *  Note: ApiClient.get() returns Promise<{ data: T }>, not just T.
 */
function makeClient() {
  const get = vi.fn().mockImplementation((url: string) => {
    if (url === '/api/v1/health/relay') {
      return Promise.resolve({
        data: {
          relay: {
            connected: true,
            active: true,
            reconnectAttempts: 0,
            lastDisconnectTime: null,
            activeSessions: 5,
          },
          hub: {
            lastSuccessfulHeartbeat: '2026-07-01T00:00:00Z',
            consecutiveFailures: 0,
            isEnrolled: true,
            enrollmentExpiresAt: '2027-01-01T00:00:00Z',
          },
        },
      });
    }
    if (url === '/api/v1/health/network') {
      return Promise.resolve({
        data: {
          latencyMs: 45,
          status: 'healthy',
          measuredAt: '2026-07-01T12:00:00Z',
        },
      });
    }
    return Promise.resolve({ data: {} });
  });
  const client = { get } as unknown as ApiClient;
  return { api: new AdminNetworkHealthApi(client), get };
}

describe('AdminNetworkHealthApi — relay health', () => {
  it('GETs /api/v1/health/relay and returns typed relay health', async () => {
    const { api, get } = makeClient();

    const result = await api.getRelayHealth();

    expect(get).toHaveBeenCalledWith('/api/v1/health/relay');
    expect(result.relay.connected).toBe(true);
    expect(result.relay.active).toBe(true);
    expect(result.relay.activeSessions).toBe(5);
    expect(result.hub.consecutiveFailures).toBe(0);
  });

  it('handles missing relay key gracefully', async () => {
    const get = vi.fn().mockResolvedValue({ data: {} });
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    const result = await api.getRelayHealth();

    expect(result.relay.connected).toBe(false);
    expect(result.relay.active).toBe(false);
    expect(result.relay.reconnectAttempts).toBe(0);
    expect(result.hub.consecutiveFailures).toBe(0);
  });

  // Note: asBool/asNumber only accept actual boolean/number types, not string
  // representations. String 'true' falls back to false, string '5' falls back to 0.
  it('uses actual boolean/number values correctly', async () => {
    const get = vi.fn().mockResolvedValue({
      data: {
        relay: {
          connected: true, // actual boolean
          active: false, // actual boolean
          reconnectAttempts: 3, // actual number
          lastDisconnectTime: null,
          activeSessions: 12, // actual number
        },
        hub: {
          lastSuccessfulHeartbeat: null,
          consecutiveFailures: 5, // actual number
          isEnrolled: true, // actual boolean
          enrollmentExpiresAt: null,
        },
      },
    });
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    const result = await api.getRelayHealth();

    expect(result.relay.connected).toBe(true);
    expect(result.relay.active).toBe(false);
    expect(result.relay.reconnectAttempts).toBe(3);
    expect(result.relay.activeSessions).toBe(12);
    expect(result.hub.consecutiveFailures).toBe(5);
    expect(result.hub.isEnrolled).toBe(true);
  });
});

describe('AdminNetworkHealthApi — network health', () => {
  it('GETs /api/v1/health/network and returns typed network health', async () => {
    const get = vi.fn().mockResolvedValue({
      data: {
        latencyMs: 45,
        status: 'healthy',
        measuredAt: '2026-07-01T12:00:00Z',
      },
    });
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    const result = await api.getNetworkHealth();

    expect(get).toHaveBeenCalledWith('/api/v1/health/network');
    expect(result.latencyMs).toBe(45);
    expect(result.status).toBe('healthy');
  });

  it('returns offline status for unknown status strings', async () => {
    const get = vi.fn().mockResolvedValue({
      data: {
        latencyMs: null,
        status: 'unknown-status',
        measuredAt: '2026-07-01T12:00:00Z',
        error: 'Unknown status',
      },
    });
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    const result = await api.getNetworkHealth();

    expect(result.status).toBe('offline');
    expect(result.latencyMs).toBeNull();
    expect(result.error).toBe('Unknown status');
  });

  it('handles degraded status', async () => {
    const get = vi.fn().mockResolvedValue({
      data: {
        latencyMs: 500,
        status: 'degraded',
        measuredAt: '2026-07-01T12:00:00Z',
      },
    });
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    const result = await api.getNetworkHealth();

    expect(result.status).toBe('degraded');
    expect(result.latencyMs).toBe(500);
  });

  it('handles missing fields with defaults', async () => {
    const get = vi.fn().mockResolvedValue({ data: {} });
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    const result = await api.getNetworkHealth();

    expect(result.status).toBe('offline');
    // asNumber(null, 0) returns 0, not null, since null is not a finite number
    expect(result.latencyMs).toBe(0);
    expect(result.measuredAt).toBeDefined();
    // asString(null) returns '' since null is not a string
    expect(result.error).toBe('');
  });

  it('converts string latencyMs to number', async () => {
    const get = vi.fn().mockResolvedValue({
      data: {
        latencyMs: '120',
        status: 'healthy',
        measuredAt: '2026-07-01T12:00:00Z',
      },
    });
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    const result = await api.getNetworkHealth();

    expect(result.latencyMs).toBe(120);
  });
});

describe('AdminNetworkHealthApi — health snapshot', () => {
  it('combines relay and network health into a single snapshot', async () => {
    const get = vi.fn().mockImplementation((url: string) => {
      if (url === '/api/v1/health/relay') {
        return Promise.resolve({
          data: {
            relay: {
              connected: true,
              active: true,
              reconnectAttempts: 0,
              lastDisconnectTime: null,
              activeSessions: 3,
            },
            hub: {
              lastSuccessfulHeartbeat: '2026-07-01T00:00:00Z',
              consecutiveFailures: 0,
              isEnrolled: true,
              enrollmentExpiresAt: null,
            },
          },
        });
      }
      if (url === '/api/v1/health/network') {
        return Promise.resolve({
          data: {
            latencyMs: 30,
            status: 'healthy',
            measuredAt: '2026-07-01T12:00:00Z',
          },
        });
      }
      return Promise.resolve({ data: {} });
    });
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    const result = await api.getHealthSnapshot();

    expect(result.relay.connected).toBe(true);
    expect(result.hub.consecutiveFailures).toBe(0);
    expect(result.network.status).toBe('healthy');
    expect(result.network.latencyMs).toBe(30);
  });

  it('handles snapshot when network request fails', async () => {
    const get = vi.fn().mockRejectedValue(new Error('Network error'));
    const client = { get } as unknown as ApiClient;
    const api = new AdminNetworkHealthApi(client);

    await expect(api.getHealthSnapshot()).rejects.toThrow('Network error');
  });
});
