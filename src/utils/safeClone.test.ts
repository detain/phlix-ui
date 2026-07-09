/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { safeClone } from './safeClone';

describe('safeClone', () => {
  const original = globalThis.structuredClone;
  afterEach(() => {
    // Restore the real implementation (some tests delete it).
    globalThis.structuredClone = original;
  });

  it('deep-clones using structuredClone when available', () => {
    const src = { a: 1, nested: { b: [1, 2, 3] } };
    const out = safeClone(src);
    expect(out).toEqual(src);
    expect(out).not.toBe(src);
    expect(out.nested).not.toBe(src.nested);
  });

  it('falls back to a JSON round-trip when structuredClone is missing (older Tizen webviews)', () => {
    // Simulate a webview without structuredClone (Chrome <98).
    (globalThis as { structuredClone?: unknown }).structuredClone = undefined;
    const src = { a: 1, nested: { b: [1, 2, 3] }, s: 'x' };
    const out = safeClone(src);
    expect(out).toEqual(src);
    expect(out).not.toBe(src);
    expect(out.nested).not.toBe(src.nested);
  });
});
