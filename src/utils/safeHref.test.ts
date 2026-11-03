/**
 * `safeHref` — the shared allow-list sanitizer for wire-supplied link
 * destinations (M-UI-11 [review ui__seceng MAJ-1], allow-listed by M-UI-15
 * [review ui__secaudit m2]).
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

// M-UI-15: the allow-list's whole point is that the schemes the old blocklist
// simply never enumerated are now the DEFAULT-DENY case. If the implementation
// regresses to an enumeration of bad schemes (or its admitted-set comparison
// loosens to a prefix test), this dataset is what reddens — every entry passes
// the OLD blocklist and must fail the new one.
describe('safeHref — schemes outside {http, https} are denied (allow-list teeth)', () => {
  it.each([
    'mailto:admin@example.com',
    'tel:+15551234567',
    'blob:https://hub.example/1234-5678',
    'file:///etc/passwd',
    'about:blank',
    'ftp://files.example.com/pub',
    'ws://relay.example:8804',
    'wss://relay.example:8804',
    'view-source:https://example.com/x',
    'jar:https://example.com/app.zip!/entry',
    'geo:63.0,44.0',
    'sms:+15551234567',
    'intent://scan/#Intent;scheme=x;end',
    'chrome-extension://extension-id/page.html',
    'ms-msdtc:someprotocol',
    'C:\\Windows\\System32\\calc.exe',
    'file:.',
  ])('blocks %s', (href) => {
    expect(safeHref(href)).toBeUndefined();
  });

  // The same L6 law covers the NEWLY denied classes: an obfuscated mailto/blob
  // must be judged by its stripped spelling, not its broken one. (\u000b is the
  // vertical tab — inside the [\x00-\x20] strip class, like every other entry.)
  it.each([
    'mai\tlto:admin@example.com',
    ' mailto:admin@example.com',
    '\u000bmailto:admin@example.com',
    '\nbl\u000bob:https://example/1',
    'FILE:/etc/shadow',
    'blo\nb:https://example/1',
  ])('blocks obfuscated %j', (href) => {
    expect(safeHref(href)).toBeUndefined();
  });

  // Protocol-relative is NOT a relative form: it silently inherits the page's
  // scheme and re-points at any host (the row class tizen's discovery
  // allow-list rejects).
  it.each([
    '//evil.example/x',
    '/\t/evil.example/x',
    ' //evil.example/x',
  ])('blocks protocol-relative %j', (href) => {
    expect(safeHref(href)).toBeUndefined();
  });

  // The admitted set is EXACT, not a prefix: a scheme that merely starts with
  // an admitted name must not lap the comparison. These all passed the old
  // anchored blocklist; the allow-list is what catches them.
  it.each([
    'httpx://example.com/',
    'httpsjavascript:alert(1)',
    'http-javascript:alert(1)',
  ])('blocks lookalike scheme %s', (href) => {
    expect(safeHref(href)).toBeUndefined();
  });
});

describe('safeHref — allowed destinations pass through unchanged', () => {
  it.each([
    'https://example.com/plugins',
    'http://192.168.1.5:32400/web/index.html',
    'HTTPS://EXAMPLE.COM/Mixed-Case-Scheme',
    'https://user:pass@host.example/p?x=1#y',
    '/app/media/42',
    '/docs/index.html',
    './relative/only.html',
    '../up/one.html',
    '#section-anchor',
    '?only=a-query',
    'relative/path.html',
    '',
  ])('passes %s', (href) => {
    expect(safeHref(href)).toBe(href);
  });

  // RFC 3986 honesty: a colon-less value that reads like a scheme word is a
  // RELATIVE PATH, not a scheme — `https` names a file, `java%09script:` is a
  // percent-encoded path (browsers do not decode before scheme parsing). The
  // allow-list classifies both as relative and passes them unchanged.
  it.each(['https', 'java%09script:x'])('passes scheme-lookalike relative %s', (href) => {
    expect(safeHref(href)).toBe(href);
  });

  it('does not rewrite the string when it is safe (identity, not copy-coercion)', () => {
    const href = 'https://example.com/a?b=1#c';
    expect(safeHref(href)).toEqual(href);
  });

  it('returns the original bytes, not the control-stripped probe, for an admitted obfuscated URL', () => {
    // L6's flip side: classification uses the stripped probe, but a value whose
    // TRUE scheme is admitted must survive byte-for-byte (signed query law).
    const href = 'https:/\t/example.com/sig';
    expect(safeHref(href)).toBe(href);
  });

  // Lookalikes that must NOT be blocked — classification is scheme-anchored, so
  // an over-eager `includes`-style filter would trip on these.
  it.each([
    'https://example.com/javascript:guides',
    'https://data.example.com/docs',
    '/app/data:collection',
  ])('passes scheme-lookalike %s', (href) => {
    expect(safeHref(href)).toBe(href);
  });
});
