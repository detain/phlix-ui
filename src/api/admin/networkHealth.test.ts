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
    // 🚨 S257 — THIS ASSERTION USED TO READ `.toBe(0)`, WITH THE COMMENT
    // "asNumber(null, 0) returns 0, not null, since null is not a finite
    // number". It was green, it was accurate about the code, and it was pinning
    // the defect: it documented that a missing latency becomes the FASTEST
    // possible reading. `latencyMs` is declared `number | null` precisely so
    // "never measured" can be said out loud.
    expect(result.latencyMs).toBeNull();
    expect(result.measuredAt).toBeDefined();
    // ⚠ `error` is DELIBERATELY still `''` here and not `undefined`. It is
    // declared `error?: string` (optional, not nullable), both values are
    // falsy at every read site, and it was outside S257's enumerated scope —
    // recorded as found-not-fixed rather than swept in.
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

/**
 * S251 — the S40 staleness verdicts survive the mapper.
 *
 * `/health/network` emits `stale` ONLY in its stale branch, so absent must map
 * to `false`, not `undefined`; `/health/relay` emits it unconditionally on both
 * halves. Each assertion below has its opposite beside it, so a mapper that
 * hardcoded either value would red.
 */
describe('AdminNetworkHealthApi — S40 staleness flags (S251)', () => {
  function clientReturning(relay: unknown, network: unknown) {
    const get = vi.fn().mockImplementation((url: string) => {
      if (url === '/api/v1/health/relay') return Promise.resolve({ data: relay });
      if (url === '/api/v1/health/network') return Promise.resolve({ data: network });
      return Promise.resolve({ data: {} });
    });
    return new AdminNetworkHealthApi({ get } as unknown as ApiClient);
  }

  it('maps an ABSENT network `stale` to false and a present `true` to true', async () => {
    const absent = await clientReturning({}, {
      latencyMs: 45, status: 'healthy', measuredAt: '2026-07-01T12:00:00Z',
    }).getNetworkHealth();
    expect(absent.stale).toBe(false);

    const present = await clientReturning({}, {
      latencyMs: 45,
      status: 'offline',
      measuredAt: '2026-07-01T12:00:00Z',
      stale: true,
      error: 'Hub heartbeat state is stale — the phlix-hub-heartbeat worker is not running',
    }).getNetworkHealth();
    expect(present.stale).toBe(true);
    expect(present.error).toBe(
      'Hub heartbeat state is stale — the phlix-hub-heartbeat worker is not running',
    );
  });

  it('maps `stale` on an UNKNOWN status body too', async () => {
    const health = await clientReturning({}, {
      latencyMs: 45, status: 'banana', measuredAt: '2026-07-01T12:00:00Z', stale: true,
    }).getNetworkHealth();
    expect(health.status).toBe('offline');
    expect(health.stale).toBe(true);
  });

  it('maps the relay and hub `stale` flags independently', async () => {
    const mixed = await clientReturning(
      {
        relay: { connected: false, active: false, activeSessions: 0, stale: true },
        hub: { consecutiveFailures: 0, isEnrolled: true, stale: false },
      },
      {},
    ).getRelayHealth();
    expect(mixed.relay.stale).toBe(true);
    expect(mixed.hub.stale).toBe(false);

    // Swapped, so neither field can be reading the other's value.
    const swapped = await clientReturning(
      {
        relay: { connected: true, active: true, activeSessions: 0, stale: false },
        hub: { consecutiveFailures: 0, isEnrolled: true, stale: true },
      },
      {},
    ).getRelayHealth();
    expect(swapped.relay.stale).toBe(false);
    expect(swapped.hub.stale).toBe(true);
  });
});

/**
 * S257 — the "nullable" wire fields can finally BE null, and the three relay
 * fields the mapper silently discarded are surfaced.
 *
 * 🚨 The live defect this closes: `NetworkHealth.latencyMs` is declared
 * `number | null`, but the mapper ran it through `asNumber(… ?? null)`, whose
 * fallback is `0`. The server's honest `latencyMs: null` — emitted when the
 * server is not enrolled, has never recorded a successful heartbeat, or has no
 * latency sample (`HealthController.php:185, 194, 219`) — therefore arrived as
 * `0`: the FASTEST possible reading, and the best bar on the history chart.
 *
 * ⚠ The fix is deliberately NOT "make everything nullable". `reconnectAttempts`,
 * `activeSessions` and `consecutiveFailures` come from the server's `intOrZero()`
 * and are declared plain `int`; their `0` fallback is CORRECT and a test below
 * pins that it survived, so the diff cannot be read as a blanket sweep.
 *
 * ⚠ Also not fixed here, deliberately: `NetworkHealth.error` is declared
 * `error?: string` and the mapper always produces a string (`''` when absent).
 * That is the same family, but `error` is OPTIONAL rather than nullable, both
 * values are falsy at every read site, and it was outside this step's enumerated
 * scope. Recorded, not swept in.
 *
 * Wire shape verified against phlix-server `origin/master`
 * (`src/Server/Http/Controllers/Admin/HealthController.php`), not against the
 * brief: `/health/relay` emits `relay.lastConnectError`, `relay.lastConnectErrorAt`
 * (both `nullableString`) and `hub.lastLatencyMs` (`nullableInt`) as ALWAYS-PRESENT
 * keys with nullable values; `nullableString()` is "non-empty string, or null",
 * which is why the UI normaliser treats `''` as absence too.
 */
describe('AdminNetworkHealthApi — nullable wire fields (S257)', () => {
  function networkClient(body: unknown) {
    const get = vi.fn().mockResolvedValue({ data: body });
    return new AdminNetworkHealthApi({ get } as unknown as ApiClient);
  }
  function relayClient(body: unknown) {
    const get = vi.fn().mockResolvedValue({ data: body });
    return new AdminNetworkHealthApi({ get } as unknown as ApiClient);
  }

  it('maps an explicit `latencyMs: null` to null, with a NUMERIC control beside it', async () => {
    // The control is the whole point: `toBeNull()` alone would also pass against
    // a mapper that returned null for everything.
    const notMeasured = await networkClient({
      latencyMs: null, status: 'offline', measuredAt: '2026-01-01T00:00:00Z',
      error: 'No successful heartbeat recorded yet',
    }).getNetworkHealth();
    const measured = await networkClient({
      latencyMs: 87, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z',
    }).getNetworkHealth();

    expect(notMeasured.latencyMs).toBeNull();
    expect(measured.latencyMs).toBe(87);
    // Naming the wrong answer explicitly: restoring the `0` fallback reds here
    // even if someone later loosens the assertion above to a truthiness check.
    expect(notMeasured.latencyMs).not.toBe(0);
  });

  it('maps an ABSENT `latencyMs` to null, and still coerces a numeric STRING', async () => {
    const absent = await networkClient({
      status: 'offline', measuredAt: '2026-01-01T00:00:00Z',
    }).getNetworkHealth();
    expect(absent.latencyMs).toBeNull();

    // The server's `nullableInt()` is `is_numeric($v) ? (int) $v : null`, so a
    // numeric string is a real value, not absence. Losing this arm would be a
    // silent regression the null assertions above cannot see.
    const stringy = await networkClient({
      latencyMs: '120', status: 'healthy', measuredAt: '2026-01-01T00:00:00Z',
    }).getNetworkHealth();
    expect(stringy.latencyMs).toBe(120);

    // …and a genuinely non-numeric value is absence, not 0.
    const junk = await networkClient({
      latencyMs: 'n/a', status: 'offline', measuredAt: '2026-01-01T00:00:00Z',
    }).getNetworkHealth();
    expect(junk.latencyMs).toBeNull();
  });

  it('maps `latencyMs: 0` to 0 — a real zero is NOT absence', async () => {
    // The inverse hazard. A fix written as `x || null` would erase a genuine
    // sub-millisecond measurement, which is the same lie in the other direction.
    const zero = await networkClient({
      latencyMs: 0, status: 'healthy', measuredAt: '2026-01-01T00:00:00Z',
    }).getNetworkHealth();
    expect(zero.latencyMs).toBe(0);
  });

  it('maps the three `string | null` fields to null — absent, null AND empty', async () => {
    const empty = await relayClient({
      relay: { lastDisconnectTime: null },
      hub: { lastSuccessfulHeartbeat: '', isEnrolled: false },
    }).getRelayHealth();

    expect(empty.relay.lastDisconnectTime).toBeNull();
    expect(empty.hub.lastSuccessfulHeartbeat).toBeNull();
    expect(empty.hub.enrollmentExpiresAt).toBeNull();
    // The old mapper produced `''` here, so the declared `string | null` was a
    // type the data could never inhabit and any `!== null` check was permanent.
    expect(empty.relay.lastDisconnectTime).not.toBe('');
    expect(empty.hub.lastSuccessfulHeartbeat).not.toBe('');
    expect(empty.hub.enrollmentExpiresAt).not.toBe('');
  });

  it('passes the three `string | null` fields through when the server DOES know (control)', async () => {
    const present = await relayClient({
      relay: { lastDisconnectTime: '2026-01-01T00:00:00Z' },
      hub: {
        lastSuccessfulHeartbeat: '2026-01-01T00:01:00Z',
        enrollmentExpiresAt: '2027-01-01T00:00:00Z',
        isEnrolled: true,
      },
    }).getRelayHealth();

    expect(present.relay.lastDisconnectTime).toBe('2026-01-01T00:00:00Z');
    expect(present.hub.lastSuccessfulHeartbeat).toBe('2026-01-01T00:01:00Z');
    expect(present.hub.enrollmentExpiresAt).toBe('2027-01-01T00:00:00Z');
  });

  it('KEEPS the 0 fallback on the fields the server declares plain `int` (scope control)', async () => {
    // `intOrZero()` server-side. If these had also been made nullable the diff
    // would be a blanket sweep rather than a targeted fix, and this test says so.
    const missing = await relayClient({ relay: {}, hub: {} }).getRelayHealth();
    expect(missing.relay.reconnectAttempts).toBe(0);
    expect(missing.relay.activeSessions).toBe(0);
    expect(missing.hub.consecutiveFailures).toBe(0);
  });

  it('SURFACES lastConnectError, lastConnectErrorAt and hub.lastLatencyMs', async () => {
    const carried = await relayClient({
      relay: {
        connected: false,
        active: false,
        lastConnectError: 'hub refused the tunnel handshake: 403',
        lastConnectErrorAt: '2026-01-01T00:02:00Z',
      },
      hub: { isEnrolled: true, lastLatencyMs: 143 },
    }).getRelayHealth();

    expect(carried.relay.lastConnectError).toBe('hub refused the tunnel handshake: 403');
    expect(carried.relay.lastConnectErrorAt).toBe('2026-01-01T00:02:00Z');
    expect(carried.hub.lastLatencyMs).toBe(143);
  });

  it('yields null for all three when the payload OMITS them — the non-vacuity control', async () => {
    // ⚠ Without this the test above proves nothing: an assertion that passes on
    // both presence and absence is worth nothing. The KEYS must exist either way
    // (the mapper always writes them), and the VALUES must differ.
    const omitted = await relayClient({
      relay: { connected: false, active: false },
      hub: { isEnrolled: true },
    }).getRelayHealth();

    expect(Object.keys(omitted.relay)).toContain('lastConnectError');
    expect(Object.keys(omitted.relay)).toContain('lastConnectErrorAt');
    expect(Object.keys(omitted.hub)).toContain('lastLatencyMs');
    expect(omitted.relay.lastConnectError).toBeNull();
    expect(omitted.relay.lastConnectErrorAt).toBeNull();
    expect(omitted.hub.lastLatencyMs).toBeNull();
    // …and specifically NOT the old fallbacks a re-broken mapper would produce.
    expect(omitted.hub.lastLatencyMs).not.toBe(0);
  });

  it('carries all three through `getHealthSnapshot()`, not just `getRelayHealth()`', async () => {
    // The snapshot is what both consumers actually read; a mapper fix that
    // stopped at `getRelayHealth()` would be invisible to the UI.
    const get = vi.fn().mockImplementation((url: string) => {
      if (url === '/api/v1/health/relay') {
        return Promise.resolve({
          data: {
            relay: {
              connected: false, active: false,
              lastConnectError: 'connect ETIMEDOUT',
              lastConnectErrorAt: '2026-01-01T00:03:00Z',
            },
            hub: { isEnrolled: true, lastLatencyMs: 77 },
          },
        });
      }
      return Promise.resolve({
        data: { latencyMs: null, status: 'offline', measuredAt: '2026-01-01T00:00:00Z' },
      });
    });
    const snap = await new AdminNetworkHealthApi({ get } as unknown as ApiClient).getHealthSnapshot();

    expect(snap.relay.lastConnectError).toBe('connect ETIMEDOUT');
    expect(snap.relay.lastConnectErrorAt).toBe('2026-01-01T00:03:00Z');
    expect(snap.hub.lastLatencyMs).toBe(77);
    expect(snap.network.latencyMs).toBeNull();
  });
});
