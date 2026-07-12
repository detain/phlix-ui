/**
 * SyncPlay store drift detection tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSyncPlayStore, SYNC_DRIFT_THRESHOLD_SECONDS } from './useSyncPlayStore';
import type { SyncPlaySession, SyncPlayPlaybackCommand } from '../types/syncplay';

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

// ── real drift math (deterministic clock) ───────────────────────────────────────
//
// These exercise the ACTUAL extrapolation:
//   drift = localPlaybackPosition − (playbackPosition + elapsedSec × playbackRate)
// with a stubbed clock so `elapsedSec` is exact. The store anchors its capture
// timestamp (`_lastDriftCaptureMs`, private) via onRemoteStateUpdate('seek'|'sync'),
// so we anchor at a known instant, advance the clock, then feed a local position.
// A hardwired `driftAmount === 0` would fail every one of these.

describe('useSyncPlayStore drift math (deterministic clock)', () => {
  let nowMs = 0;

  beforeEach(() => {
    nowMs = 1_700_000_000_000;
    vi.spyOn(Date, 'now').mockImplementation(() => nowMs);
  });

  /** Anchor a PLAYING session at `pos`/`rate` with the capture timestamp = current clock. */
  function anchorPlaying(store: ReturnType<typeof useSyncPlayStore>, pos: number, rate: number): void {
    store.currentSession = makeSession(pos, rate, 'playing');
    // 'seek' stamps _lastDriftCaptureMs = Date.now() (== nowMs) and pins playbackPosition.
    const cmd: SyncPlayPlaybackCommand = { type: 'seek', position: pos, issuedBy: 'u1', issuedAt: '2026-07-12T00:00:00Z' };
    store.onRemoteStateUpdate(cmd);
  }

  it('computes a POSITIVE drift when local runs AHEAD of the extrapolated server position', () => {
    const store = useSyncPlayStore();
    anchorPlaying(store, 100, 1); // server anchored at 100s, rate 1×
    nowMs += 10_000; // 10s of wall-clock elapse → expected server position = 110
    store.updateLocalPosition(113); // local is at 113 → +3s ahead
    // If drift were stubbed to 0 this would read 0, not 3.
    expect(store.driftAmount).toBeCloseTo(3, 6);
    expect(store.syncStatus).toBe('outOfSync'); // |3| > 2
  });

  it('computes a NEGATIVE drift when local lags BEHIND the extrapolated server position', () => {
    const store = useSyncPlayStore();
    anchorPlaying(store, 100, 1);
    nowMs += 10_000; // expected = 110
    store.updateLocalPosition(107); // local at 107 → -3s behind
    expect(store.driftAmount).toBeCloseTo(-3, 6);
    expect(store.syncStatus).toBe('outOfSync'); // |−3| > 2
  });

  it('honours playbackRate in the extrapolation (rate ≠ 1)', () => {
    const store = useSyncPlayStore();
    anchorPlaying(store, 100, 1.5); // 1.5× speed
    nowMs += 10_000; // expected = 100 + 10 × 1.5 = 115
    store.updateLocalPosition(115); // dead-on for a 1.5× stream
    expect(store.driftAmount).toBeCloseTo(0, 6);
    expect(store.syncStatus).toBe('synced');
    store.updateLocalPosition(120); // now +5 ahead at 1.5×
    expect(store.driftAmount).toBeCloseTo(5, 6);
    expect(store.syncStatus).toBe('outOfSync');
  });

  it('reports SYNCED while |drift| stays within the threshold', () => {
    const store = useSyncPlayStore();
    anchorPlaying(store, 100, 1);
    nowMs += 10_000; // expected = 110
    store.updateLocalPosition(111.5); // +1.5s, inside the 2s window
    expect(store.driftAmount).toBeCloseTo(1.5, 6);
    expect(store.syncStatus).toBe('synced');
  });

  it('is boundary-exact: just over 2s → outOfSync, just under and exactly 2s → synced', () => {
    const store = useSyncPlayStore();
    anchorPlaying(store, 100, 1);
    nowMs += 10_000; // expected = 110

    store.updateLocalPosition(112.001); // drift ≈ 2.001 (> threshold)
    expect(store.driftAmount).toBeCloseTo(2.001, 6);
    expect(store.syncStatus).toBe('outOfSync');

    store.updateLocalPosition(111.999); // drift ≈ 1.999 (< threshold)
    expect(store.driftAmount).toBeCloseTo(1.999, 6);
    expect(store.syncStatus).toBe('synced');

    store.updateLocalPosition(112); // drift == 2 exactly — NOT strictly greater than 2
    expect(store.driftAmount).toBeCloseTo(2, 6);
    expect(store.syncStatus).toBe('synced');
  });
});

// ── threshold constant ────────────────────────────────────────────────────────

describe('SYNC_DRIFT_THRESHOLD_SECONDS', () => {
  it('is exported and equals 2', () => {
    expect(SYNC_DRIFT_THRESHOLD_SECONDS).toBe(2);
  });
});
