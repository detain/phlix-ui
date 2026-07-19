/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { safeRedirect } from './safeRedirect';

describe('safeRedirect — open-redirect guard', () => {
  // Every accepted value: an internal `/app/`-rooted path is returned verbatim.
  it.each([
    ['/app/x', '/app/x'],
    ['/app/shared-with-me', '/app/shared-with-me'],
    ['/app/invite/abc123', '/app/invite/abc123'],
    ['/app/servers?tab=1', '/app/servers?tab=1'],
    ['/app/a/b/c#frag', '/app/a/b/c#frag'],
  ])('accepts internal path %s → %s', (input, expected) => {
    expect(safeRedirect(input)).toBe(expected);
  });

  // Every rejected value maps to null (caller falls back to its home).
  it.each([
    ['absolute https URL', 'https://evil.example'],
    ['absolute http URL', 'http://evil.example'],
    ['protocol-relative //host', '//evil.example'],
    ['backslash trick /\\host', '/\\evil.example'],
    ['bare /app (no trailing slash/content)', '/app'],
    ['a non-/app internal path', '/login'],
    ['a root path', '/'],
    ['a relative path', 'app/x'],
    ['a javascript: scheme', 'javascript:alert(1)'],
    ['an empty string', ''],
  ])('rejects %s → null', (_label, input) => {
    expect(safeRedirect(input)).toBeNull();
  });

  // Non-string inputs are rejected without throwing.
  it.each([
    ['undefined', undefined],
    ['null', null],
    ['a number', 42],
    ['an array', ['/app/x']],
    ['an object', { path: '/app/x' }],
    ['a boolean', true],
  ])('rejects non-string input (%s) → null', (_label, input) => {
    expect(safeRedirect(input)).toBeNull();
  });

  it('rejects `/app` but accepts `/app/` (the guard requires the trailing slash)', () => {
    expect(safeRedirect('/app')).toBeNull();
    expect(safeRedirect('/app/')).toBe('/app/');
  });
});
