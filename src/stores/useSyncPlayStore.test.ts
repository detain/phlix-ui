/**
 * SyncPlay store drift detection tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSyncPlayStore, SYNC_DRIFT_THRESHOLD_SECONDS } from './useSyncPlayStore';
import type { SyncPlaySession } from '../types/syncplay';

// ── helpers ───────────────────────────────────────────────────────────────────

/** Build a full session anchored at position and rate. */
function makeSession(position = 100, rate = 1, state: SyncPlaySession['state'] = 'playing'): SyncPlaySession {
  return {
    id: 'sess-1',
    roomId: 'room-1',
    serverId: 'srv-1',
    createdBy: 'user-1',
    createdAt: new Date().toISOString(),
    state,
    playbackPosition: position,
    playbackRate: rate,
    serverTime: Date.now(),
    lastSync: new Date().toISOString(),
    activeUsers: [],
    roles: {},
    permissions: {},
  };
}

// ── setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  setActivePinia(createPinia());
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── drift computation ─────────────────────────────────────────────────────────

describe('useSyncPlayStore drift detection', () => {
  it('returns 0 drift when session is absent', () => {
    const store = useSyncPlayStore();
    expect(store.driftAmount).toBe(0);
  });

  it('returns 0 drift when session is paused', () => {
    const store = useSyncPlayStore();
    store.currentSession = makeSession(100, 1, 'paused');
    store.updateLocalPosition(50);
    expect(store.driftAmount).toBe(0);
  });

  it('returns 0 drift when session is waiting', () => {
    const store = useSyncPlayStore();
    store.currentSession = makeSession(100, 1, 'waiting');
    store.updateLocalPosition(50);
    expect(store.driftAmount).toBe(0);
  });
});

// ── syncStatus ────────────────────────────────────────────────────────────────

describe('useSyncPlayStore syncStatus', () => {
  it('returns outOfSync when session is null', () => {
    const store = useSyncPlayStore();
    expect(store.syncStatus).toBe('outOfSync');
  });

  it('returns re-syncing when session state is waiting', () => {
    const store = useSyncPlayStore();
    store.currentSession = makeSession(100, 1, 'waiting');
    expect(store.syncStatus).toBe('re-syncing');
  });
});

// ── threshold constant ────────────────────────────────────────────────────────

describe('SYNC_DRIFT_THRESHOLD_SECONDS', () => {
  it('is exported and equals 2', () => {
    expect(SYNC_DRIFT_THRESHOLD_SECONDS).toBe(2);
  });
});
