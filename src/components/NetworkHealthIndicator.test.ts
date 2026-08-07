/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import NetworkHealthIndicator from './NetworkHealthIndicator.vue';
import { AdminNetworkHealthApi, type HealthSnapshot } from '../api/admin/networkHealth';
import { useAuthStore } from '../stores/useAuthStore';

function snapshot(): HealthSnapshot {
  return {
    // S251: `stale` is the S40 staleness verdict the server now emits on every
    // one of these three; a fresh fixture declares it false explicitly.
    relay: {
      connected: true, active: true, reconnectAttempts: 0, lastDisconnectTime: null,
      activeSessions: 0, lastConnectError: null, lastConnectErrorAt: null, stale: false,
    },
    hub: {
      lastSuccessfulHeartbeat: null, consecutiveFailures: 0, lastLatencyMs: null,
      isEnrolled: true, enrollmentExpiresAt: null, stale: false,
    },
    network: { latencyMs: 20, status: 'healthy', measuredAt: new Date().toISOString(), stale: false },
  };
}

/** Force `document.hidden` for the visibility-gating tests. */
function setHidden(hidden: boolean): void {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden });
}

let wrapper: VueWrapper | null = null;

function mountIndicator() {
  const w = mount(NetworkHealthIndicator, {
    global: { provide: { apiBase: '' } },
  });
  wrapper = w;
  return w;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  setHidden(false);
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('NetworkHealthIndicator — admin + visibility gating (UI-0.8)', () => {
  it('never polls the admin health endpoint for a non-admin (no fetch, no timer armed)', async () => {
    const spy = vi.spyOn(AdminNetworkHealthApi.prototype, 'getHealthSnapshot').mockResolvedValue(snapshot());
    vi.useFakeTimers();
    // user is null → isAdmin false
    mountIndicator();
    expect(spy).not.toHaveBeenCalled();
    // Advancing well past the poll interval proves no interval was armed either.
    await vi.advanceTimersByTimeAsync(120_000);
    expect(spy).not.toHaveBeenCalled();
  });

  it('polls on mount for an admin, then STOPS when the tab is hidden', async () => {
    const spy = vi.spyOn(AdminNetworkHealthApi.prototype, 'getHealthSnapshot').mockResolvedValue(snapshot());
    vi.useFakeTimers();
    useAuthStore().user = { id: 'u1', is_admin: true };
    mountIndicator();
    // Initial poll fires synchronously on mount.
    expect(spy).toHaveBeenCalledTimes(1);
    // Tab hidden → polling paused: advancing time issues no further requests.
    setHidden(true);
    document.dispatchEvent(new Event('visibilitychange'));
    await vi.advanceTimersByTimeAsync(120_000);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('resumes polling when the tab becomes visible again', async () => {
    const spy = vi.spyOn(AdminNetworkHealthApi.prototype, 'getHealthSnapshot').mockResolvedValue(snapshot());
    vi.useFakeTimers();
    useAuthStore().user = { id: 'u1', is_admin: true };
    mountIndicator();
    expect(spy).toHaveBeenCalledTimes(1);
    // Hide → stop.
    setHidden(true);
    document.dispatchEvent(new Event('visibilitychange'));
    await vi.advanceTimersByTimeAsync(60_000);
    expect(spy).toHaveBeenCalledTimes(1);
    // Show → resume (a fresh immediate poll fires on becoming visible).
    setHidden(false);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

/**
 * S257 — the tooltip's honest branches were UNREACHABLE, and the relay's
 * last-connect reason never reached it at all.
 *
 * 🚨 `tooltipContent` has always read `if (network.latencyMs !== null) … else …`.
 * That `else` was DEAD CODE: `latencyMs` is declared `number | null`, but the
 * mapper's `asNumber(… ?? null)` fallback is `0`, so the field could never be
 * null and the tooltip always printed `Latency: 0ms (offline)` for a
 * never-measured relay. The branch was correct; its input was a lie. Making the
 * mapper honest is what makes it reachable — this file is the proof it now runs.
 *
 * ⚠ Assertions are on the tooltip element's rendered text after a real
 * `mouseenter` + the component's open delay, not on the `text` prop, and each
 * line is compared with EXACT equality against a split on `\n`. `Latency:` is a
 * prefix shared by both branches, so a `toContain` check could not tell them
 * apart — the two full lines are not substrings of one another and a test below
 * pins that.
 */
describe('NetworkHealthIndicator — honest latency + relay reason (S257)', () => {
  const NOT_MEASURED_LINE = 'Latency: not measured yet';

  /** Hover the indicator and return the tooltip's rendered lines. */
  async function tooltipLines(w: VueWrapper): Promise<string[]> {
    await w.find('.phlix-tooltip-wrap').trigger('mouseenter');
    await vi.advanceTimersByTimeAsync(1_000);
    await w.vm.$nextTick();
    const tip = w.find('[role="tooltip"]');
    expect(tip.exists()).toBe(true);
    return tip.text().split('\n').map((l) => l.trim());
  }

  async function mountWith(snap: HealthSnapshot): Promise<VueWrapper> {
    vi.spyOn(AdminNetworkHealthApi.prototype, 'getHealthSnapshot').mockResolvedValue(snap);
    vi.useFakeTimers();
    useAuthStore().user = { id: 'u1', is_admin: true };
    const w = mountIndicator();
    await vi.advanceTimersByTimeAsync(0);
    await w.vm.$nextTick();
    return w;
  }

  it('the not-measured line and a numeric latency line are not substrings of each other', () => {
    const numericLine = 'Latency: 87ms (healthy)';
    expect(NOT_MEASURED_LINE.includes(numericLine)).toBe(false);
    expect(numericLine.includes(NOT_MEASURED_LINE)).toBe(false);
  });

  it('says "Latency: not measured yet" for a null reading', async () => {
    const snap = snapshot();
    snap.network = { latencyMs: null, status: 'offline', measuredAt: new Date().toISOString(), stale: false };
    const w = await mountWith(snap);

    const lines = await tooltipLines(w);
    expect(lines).toContain(NOT_MEASURED_LINE);
    // …and specifically not the old, wrong answer.
    expect(lines).not.toContain('Latency: 0ms (offline)');
  });

  it('says "Latency: <n>ms (<status>)" for a real reading — the control', async () => {
    // Without this beside the test above, "renders a latency line" would be
    // satisfied by a component that printed the not-measured line always.
    const snap = snapshot();
    snap.network = { latencyMs: 87, status: 'healthy', measuredAt: new Date().toISOString(), stale: false };
    const w = await mountWith(snap);

    const lines = await tooltipLines(w);
    expect(lines).toContain('Latency: 87ms (healthy)');
    expect(lines).not.toContain(NOT_MEASURED_LINE);
  });

  it('renders a REAL 0 ms reading as a number, not as the not-measured line', async () => {
    const snap = snapshot();
    snap.network = { latencyMs: 0, status: 'healthy', measuredAt: new Date().toISOString(), stale: false };
    const w = await mountWith(snap);

    const lines = await tooltipLines(w);
    expect(lines).toContain('Latency: 0ms (healthy)');
    expect(lines).not.toContain(NOT_MEASURED_LINE);
  });

  it('surfaces the relay connect error and hub.lastLatencyMs when the server knows them', async () => {
    const snap = snapshot();
    snap.relay.connected = false;
    snap.relay.lastConnectError = 'connect ETIMEDOUT';
    snap.relay.lastConnectErrorAt = new Date(Date.now() - 5_000).toISOString();
    snap.hub.lastLatencyMs = 143;
    const w = await mountWith(snap);

    const lines = await tooltipLines(w);
    expect(lines).toContain('Relay error: connect ETIMEDOUT');
    expect(lines).toContain('Relay error at: 5s ago');
    expect(lines).toContain('Last hub latency: 143ms');
  });

  it('omits all three lines when the server reports none — the non-vacuity control', async () => {
    // ⚠ An assertion that passes on both presence and absence is worth nothing.
    // The base fixture carries null for all three.
    const w = await mountWith(snapshot());

    const lines = await tooltipLines(w);
    expect(lines.some((l) => l.startsWith('Relay error:'))).toBe(false);
    expect(lines.some((l) => l.startsWith('Relay error at:'))).toBe(false);
    expect(lines.some((l) => l.startsWith('Last hub latency:'))).toBe(false);
    // …while the lines that are unconditional are still there, so an empty
    // tooltip cannot be what made the three checks above pass.
    expect(lines).toContain('Hub enrolled: Yes');
  });
});
