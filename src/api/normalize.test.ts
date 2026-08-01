/**
 * unixToIso normalization helpers.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { unixToIso } from './normalize';

describe('unixToIso', () => {
  it('returns undefined for null', () => {
    expect(unixToIso(null)).toBeUndefined();
  });

  it('returns undefined for undefined', () => {
    expect(unixToIso(undefined)).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(unixToIso('')).toBeUndefined();
  });

  it('converts a Unix timestamp in seconds to ISO string', () => {
    // 1700000000 seconds = 2023-11-14T22:13:20.000Z
    expect(unixToIso(1700000000)).toBe('2023-11-14T22:13:20.000Z');
  });

  it('converts a numeric string timestamp to ISO string', () => {
    expect(unixToIso('1700000000')).toBe('2023-11-14T22:13:20.000Z');
  });

  it('passes through an already-ISO string unchanged', () => {
    const iso = '2023-11-14T17:46:40.000Z';
    expect(unixToIso(iso)).toBe(iso);
  });

  it('passes through an arbitrary date string unchanged', () => {
    expect(unixToIso('January 1, 2024')).toBe('January 1, 2024');
  });

  it('returns undefined for non-finite numbers', () => {
    expect(unixToIso(NaN)).toBeUndefined();
    expect(unixToIso(Infinity)).toBeUndefined();
    expect(unixToIso(-Infinity)).toBeUndefined();
  });

  it('handles zero', () => {
    // Unix epoch
    expect(unixToIso(0)).toBe('1970-01-01T00:00:00.000Z');
  });

  it('handles negative timestamps', () => {
    // Dec 31, 1969
    expect(unixToIso(-86400)).toBe('1969-12-31T00:00:00.000Z');
  });
});
