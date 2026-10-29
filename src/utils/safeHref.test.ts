/**
 * `safeHref` — the shared blocklist sanitizer for wire-supplied link
 * destinations (M-UI-11 [review ui__seceng MAJ-1]).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { safeHref } from './safeHref';

describe('safeHref — blocked script-y schemes', () => {
  it.each([
    'javascript:alert(1)',
    'JavaScript:alert(1)',
    'JAVASCRIPT:alert(1)',
    'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
    'DATA:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'VBScript:msgbox(1)',
  ])('blocks %s', (href) => {
    expect(safeHref(href)).toBeUndefined();
  });

  // L6 law: browsers ignore control/whitespace characters INSIDE the URL
  // scheme when parsing, so every obfuscated spelling of a blocked scheme must
  // still be blocked. These datasets are the regression teeth for that law —
  // dropping the control-char strip in the sanitizer reddens them all.
  it.each([
    'java\tscript:alert(1)',
    'java\nscript:alert(1)',
    'java\rscript:alert(1)',
    'java\x01script:alert(1)',
    'java\x00script:alert(1)',
    '\tjavascript:alert(1)',
    ' javascript:alert(1)',
    '\njAvAsCrIpT:alert(1)',
    'da\tta:text/html,<script>',
    'vbs\rcript:msgbox(1)',
  ])('blocks control/whitespace-obfuscated %j', (href) => {
    expect(safeHref(href)).toBeUndefined();
  });
});

describe('safeHref — allowed destinations pass through unchanged', () => {
  it.each([
    'https://example.com/plugins',
    'http://192.168.1.5:32400/web/index.html',
    'mailto:admin@example.com',
    'tel:+15551234567',
    '/app/media/42',
    '/docs/index.html',
    '#section-anchor',
    'relative/path.html',
    '',
  ])('passes %s', (href) => {
    expect(safeHref(href)).toBe(href);
  });

  it('does not rewrite the string when it is safe (identity, not copy-coercion)', () => {
    const href = 'https://example.com/a?b=1#c';
    expect(safeHref(href)).toEqual(href);
  });

  // Lookalikes that must NOT be blocked — the blocklist is scheme-anchored, so
  // an over-eager `includes`-style filter would trip on these.
  it.each([
    'https://example.com/javascript:guides',
    'https://data.example.com/docs',
    '/app/data:collection',
  ])('passes scheme-lookalike %s', (href) => {
    expect(safeHref(href)).toBe(href);
  });
});
