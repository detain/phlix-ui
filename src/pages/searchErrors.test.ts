/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { searchErrorCode, searchErrorInfo } from './searchErrors';
import { ApiError } from '../api/errors';
import { ERROR_MESSAGES, ERROR_TITLES } from '../i18n/errors';

describe('searchErrorInfo', () => {
  it('maps server.relay_unavailable to the localized "relay not connected" card', () => {
    const info = searchErrorInfo('server.relay_unavailable', 'fallback');
    expect(info.title).toBe(ERROR_TITLES.en['server.relay_unavailable']);
    expect(info.description).toBe(ERROR_MESSAGES.en['server.relay_unavailable']);
    // ignores the raw debug fallback when a code matched
    expect(info.description).not.toContain('fallback');
  });

  it('maps server.no_tunnel to the same "relay not connected" card', () => {
    const info = searchErrorInfo('server.no_tunnel', 'fallback');
    expect(info.title).toBe(ERROR_TITLES.en['server.no_tunnel']);
    expect(info.description).toBe(ERROR_MESSAGES.en['server.no_tunnel']);
  });

  it('maps server.offline to the offline card', () => {
    const info = searchErrorInfo('server.offline', 'fallback');
    expect(info.title).toBe(ERROR_TITLES.en['server.offline']);
    expect(info.description).toBe(ERROR_MESSAGES.en['server.offline']);
  });

  it('localizes title + description per locale for the relay codes', () => {
    const es = searchErrorInfo('server.no_tunnel', 'fallback', 'es');
    expect(es.title).toBe(ERROR_TITLES.es['server.no_tunnel']);
    expect(es.description).toBe(ERROR_MESSAGES.es['server.no_tunnel']);
    const ja = searchErrorInfo('server.offline', 'fallback', 'ja');
    expect(ja.title).toBe(ERROR_TITLES.ja['server.offline']);
    expect(ja.description).toBe(ERROR_MESSAGES.ja['server.offline']);
  });

  it('falls back to the generic title + caller description for an unknown code', () => {
    const info = searchErrorInfo('something.else', 'a falhou tudo', 'pt_BR');
    expect(info.title).toBe('Search failed');
    expect(info.description).toBe('a falhou tudo');
  });

  it('falls back to the generic title + caller description when there is no code', () => {
    const info = searchErrorInfo(null, 'search boom');
    expect(info.title).toBe('Search failed');
    expect(info.description).toBe('search boom');
  });
});

describe('searchErrorCode', () => {
  it('reads the contracts-law {error, code} body off an ApiError', () => {
    const e = new ApiError('SQLSTATE[HY000]: generic error', 503, {
      error: 'SQLSTATE[HY000]: generic error',
      code: 'server.relay_unavailable',
    });
    expect(searchErrorCode(e)).toBe('server.relay_unavailable');
  });

  it('returns null for a body without a string code', () => {
    expect(searchErrorCode(new ApiError('boom', 500, { error: 'boom' }))).toBeNull();
    expect(searchErrorCode(new ApiError('boom', 500, null))).toBeNull();
  });

  it('returns null for non-ApiError throws (never invents a code)', () => {
    expect(searchErrorCode(new Error('search boom'))).toBeNull();
    expect(searchErrorCode('plain string')).toBeNull();
    expect(searchErrorCode(undefined)).toBeNull();
  });

  it('classifies a relay-failure ApiError end-to-end instead of leaking its debug text', () => {
    const e = new ApiError('SQLSTATE[HY000]: Cannot connect: tunnel not open', 503, {
      error: 'SQLSTATE[HY000]: Cannot connect: tunnel not open',
      code: 'server.no_tunnel',
    });
    const info = searchErrorInfo(searchErrorCode(e), e.message);
    expect(info.title).toBe(ERROR_TITLES.en['server.no_tunnel']);
    expect(info.description).toBe(ERROR_MESSAGES.en['server.no_tunnel']);
    expect(info.description).not.toContain('SQLSTATE');
  });
});
