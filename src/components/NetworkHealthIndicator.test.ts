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
    relay: { connected: true, active: true, reconnectAttempts: 0, lastDisconnectTime: null, activeSessions: 0 },
    hub: { lastSuccessfulHeartbeat: null, consecutiveFailures: 0, isEnrolled: true, enrollmentExpiresAt: null },
    network: { latencyMs: 20, status: 'healthy', measuredAt: new Date().toISOString() },
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
