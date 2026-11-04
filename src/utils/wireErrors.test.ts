/**
 * Core pins for the shared wire-error classifier (review ui__webux survivor
 * class — the promoted shape of browseErrors.ts / searchErrors.ts).
 *
 * The law under test: server `error` text is debug payload, never UI copy;
 * registered wire codes localize through the contracts catalog
 * (`src/i18n/errors.ts`), everything else falls to the caller's generic line,
 * and typed client errors keep their own friendly messages untouched.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import { ApiError, NetworkError, TimeoutError } from '../api/errors';
import { ERROR_MESSAGES } from '../i18n/errors';
import { wireErrorCode, wireErrorInfo, wireErrorLine } from './wireErrors';

/** A catalog code WITH an EmptyState title (Browse/Search card arm). */
const TITLED = 'server.offline';
/** A catalog code WITHOUT a title — arm-1 law: message still routes. */
const UNTITLED = 'hub.jwt_invalid';
/** Raw hub-relay-style debug prose a survivor surface used to render. */
const RAW = 'SQLSTATE[HY000] [2002] Connection refused';

describe('wireErrorCode', () => {
  it('reads the code off an ApiError contracts envelope body', () => {
    expect(wireErrorCode(new ApiError(RAW, 503, { error: RAW, code: TITLED }))).toBe(TITLED);
  });

  it('never invents a code: null body, non-object body, non-string code', () => {
    expect(wireErrorCode(new ApiError(RAW, 500, null))).toBeNull();
    expect(wireErrorCode(new ApiError(RAW, 500, 'plain text body'))).toBeNull();
    expect(wireErrorCode(new ApiError(RAW, 500, { error: RAW, code: 42 }))).toBeNull();
    expect(wireErrorCode(new ApiError(RAW, 500, {}))).toBeNull();
  });

  it('returns null for non-ApiError throws', () => {
    expect(wireErrorCode(new Error(RAW))).toBeNull();
    expect(wireErrorCode(new NetworkError())).toBeNull();
    expect(wireErrorCode('weird')).toBeNull();
  });
});

describe('wireErrorInfo', () => {
  const generic = { title: 'Search failed', description: 'the thrown message' };

  it('localizes a titled code to the catalog {title, description}', () => {
    const card = wireErrorInfo(TITLED, generic);
    expect(card.description).toBe(ERROR_MESSAGES.en[TITLED]);
  });

  it('honors the caller locale', () => {
    expect(wireErrorInfo(TITLED, generic, 'de').description).toBe(ERROR_MESSAGES.de[TITLED]);
  });

  it('returns the caller card verbatim for unknown/null/title-less codes', () => {
    expect(wireErrorInfo('not.a.registered.code', generic)).toEqual(generic);
    expect(wireErrorInfo(null, generic)).toEqual(generic);
    // Title-less registered codes have no CARD (the card arm keys on title);
    // wireErrorLine is their single-line route.
    expect(wireErrorInfo(UNTITLED, generic)).toEqual(generic);
  });
});

describe('wireErrorLine', () => {
  it('routes a titled-code ApiError to the catalog message, not the raw text', () => {
    const line = wireErrorLine(new ApiError(RAW, 503, { error: RAW, code: TITLED }), 'Generic line');
    expect(line).toBe(ERROR_MESSAGES.en[TITLED]);
    expect(line).not.toContain('SQLSTATE');
  });

  it('routes a TITLE-LESS registered code to its catalog message (arm-1 law)', () => {
    const line = wireErrorLine(new ApiError('bad token', 401, { error: 'bad token', code: UNTITLED }), 'Generic line');
    expect(line).toBe(ERROR_MESSAGES.en[UNTITLED]);
  });

  it('localizes through the caller locale', () => {
    const line = wireErrorLine(new ApiError(RAW, 503, { error: RAW, code: TITLED }), 'Generic line', 'de');
    expect(line).toBe(ERROR_MESSAGES.de[TITLED]);
  });

  it('DROPS raw server text for a codeless ApiError (the survivor cure)', () => {
    const line = wireErrorLine(new ApiError(RAW, 500, { error: RAW }), 'Generic line');
    expect(line).toBe('Generic line');
    expect(line).not.toContain('SQLSTATE');
  });

  it('falls to the caller generic for an unregistered code', () => {
    const line = wireErrorLine(new ApiError(RAW, 500, { error: RAW, code: 'brand.new.code' }), 'Generic line');
    expect(line).toBe('Generic line');
  });

  it('preserves typed client error copy verbatim (arm 3)', () => {
    expect(wireErrorLine(new NetworkError(), 'Generic line')).toBe('You appear to be offline. Check your connection and try again.');
    expect(wireErrorLine(new TimeoutError(), 'Generic line')).toBe('The request timed out. Please try again.');
  });

  it('preserves the plain-Error law (arm 3)', () => {
    expect(wireErrorLine(new Error('audit db down'), 'Generic line')).toBe('audit db down');
  });

  it('yields the caller generic for non-Error throws', () => {
    expect(wireErrorLine('weird', 'Generic line')).toBe('Generic line');
    expect(wireErrorLine(null, 'Generic line')).toBe('Generic line');
  });
});
