/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { debounce, REQUEST_SEARCH_DEBOUNCE_MS, type Debounced } from './debounce';

/** A typed alias so the helpers below don't sprinkle `any` on every fixture. */
type Spy = Debounced<[string]>;

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe('debounce — trailing collapse (AD-16 drop-superseded)', () => {
  it('does not fire before the window elapses', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 500);
    d('a');
    vi.advanceTimersByTime(499);
    expect(spy).not.toHaveBeenCalled();
  });

  it('fires once with the LAST arguments after a burst — earlier calls dropped', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 500);
    d('f');
    d('fi');
    d('fig');
    vi.advanceTimersByTime(500);
    expect(spy).toHaveBeenCalledTimes(1); // one recompute, not three (no flicker)
    expect(spy).toHaveBeenCalledWith('fig'); // superseded keystrokes discarded
  });

  it('re-arms after a fire so a later burst schedules afresh', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 200);
    d('1');
    vi.advanceTimersByTime(200);
    expect(spy).toHaveBeenCalledTimes(1);
    d('2');
    vi.advanceTimersByTime(199);
    expect(spy).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith('2');
  });

  it('a call after the window is an independent trailing fire, not a coalesce', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 100);
    d('x');
    vi.advanceTimersByTime(100);
    d('y'); // fresh burst — timer already flushed
    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, 'x');
    expect(spy).toHaveBeenNthCalledWith(2, 'y');
  });
});

describe('debounce — control handles', () => {
  it('cancel() drops a pending fire without invoking', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 100);
    d('a');
    d.cancel();
    vi.advanceTimersByTime(1000);
    expect(spy).not.toHaveBeenCalled();
  });

  it('cancel() is a safe no-op when nothing is pending', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 100);
    expect(() => d.cancel()).not.toThrow();
    d('a');
    vi.advanceTimersByTime(100);
    d.cancel(); // already fired
    vi.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('flush() fires the pending call immediately with the last args', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 100);
    d('a');
    d('b');
    d.flush();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('b');
    // the armed timer was consumed by flush — nothing double-fires later
    vi.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('flush() is a no-op when nothing is pending', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 100);
    d.flush();
    expect(spy).not.toHaveBeenCalled();
    d('a');
    vi.advanceTimersByTime(100);
    d.flush(); // already fired
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('debounce — pending flag', () => {
  it('tracks the in-flight window', () => {
    const spy = vi.fn() as unknown as Spy;
    const d = debounce(spy, 100);
    expect(d.pending).toBe(false);
    d('a');
    expect(d.pending).toBe(true);
    vi.advanceTimersByTime(100);
    expect(d.pending).toBe(false);
  });

  it('clears on cancel and flush', () => {
    const spy = vi.fn() as unknown as Spy;
    const a = debounce(spy, 100);
    a('x');
    a.cancel();
    expect(a.pending).toBe(false);

    const b = debounce(spy, 100);
    b('x');
    b.flush();
    expect(b.pending).toBe(false);
  });
});

describe('debounce — argument pass-through', () => {
  it('forwards every argument of the LAST call verbatim', () => {
    const spy = vi.fn();
    const d = debounce(spy, 50);
    d(1, 'two', { three: 3 });
    d(9, 'nine', { nine: 9 }); // supersede
    vi.advanceTimersByTime(50);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(9, 'nine', { nine: 9 });
  });
});

describe('REQUEST_SEARCH_DEBOUNCE_MS', () => {
  it('is inside the AD-16 400–600 ms window', () => {
    expect(REQUEST_SEARCH_DEBOUNCE_MS).toBeGreaterThanOrEqual(400);
    expect(REQUEST_SEARCH_DEBOUNCE_MS).toBeLessThanOrEqual(600);
    expect(REQUEST_SEARCH_DEBOUNCE_MS).toBe(500);
  });
});
