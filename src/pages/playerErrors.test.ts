/**
 * Player blocking-error decoding (W4). The server puts pseudo-codes in the
 * `error` TEXT field; server W2 added a real `code` channel alongside them.
 * Both eras must resolve, and unknown shapes must degrade to `null` so the
 * caller's SWR path is untouched.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it, vi } from 'vitest';
import { playbackBlockingMessage, mediaLoadErrorMessage, localizedFailureMessage } from './playerErrors';
import { ApiError } from '../api/errors';
import { ERROR_MESSAGES, GENERIC_ERROR_MESSAGE } from '../i18n/errors';

describe('playbackBlockingMessage', () => {
  it('matches the legacy AccessScheduled pseudo-code in the error TEXT (pre-W2 era) [phlix-ui-player-029]', () => {
    // Phlix-server has always emitted exactly 'AccessScheduled' (with the d) in
    // the error text — AccessScheduleMiddleware pre- and post-W2 alike. The
    // legacy match still identifies the block, but the USER-VISIBLE copy now
    // routes through the localized catalog (phlix-ui-player-029): the English
    // literal embedded in the source never reaches a member.
    expect(playbackBlockingMessage({ error: 'AccessScheduled' })).toBe(
      ERROR_MESSAGES.en['access.scheduled'],
    );
  });

  it('resolves the post-W2 access.scheduled code through the catalog even with the legacy text present', () => {
    expect(playbackBlockingMessage({ code: 'access.scheduled', error: 'AccessScheduled' })).toBe(
      ERROR_MESSAGES.en['access.scheduled'],
    );
  });

  it('matches the legacy StreamLimitExceeded pseudo-code in the error TEXT (pre-W2 era) [phlix-ui-player-029]', () => {
    expect(playbackBlockingMessage({ error: 'StreamLimitExceeded' })).toBe(
      ERROR_MESSAGES.en['stream.limit_exceeded'],
    );
  });

  it('prefers a real machine code once W2 adds it, localizing through the catalog', () => {
    expect(playbackBlockingMessage({ error: 'whatever prose', code: 'stream.limit' })).toBe(
      ERROR_MESSAGES.en['stream.limit'],
    );
  });

  it('resolves a machine code in the configured locale', () => {
    expect(playbackBlockingMessage({ code: 'stream.limit' }, 'ja')).toBe(
      ERROR_MESSAGES.ja['stream.limit'],
    );
    expect(playbackBlockingMessage({ code: 'dlna.forbidden' }, 'fr')).toBe(
      ERROR_MESSAGES.fr['dlna.forbidden'],
    );
  });

  it('falls through to the legacy text match when `code` is present but unregistered', () => {
    // Hub SCREAMING words ride `code` today; they must not block via this rail,
    // and a legacy `error` text on the same body still matches (transition
    // safety) — but the matched copy is now the localized catalog sentence
    // [phlix-ui-player-029], not the embedded English literal.
    expect(
      playbackBlockingMessage({ code: 'AUTHORIZATION_FAILED', error: 'StreamLimitExceeded' }),
    ).toBe(ERROR_MESSAGES.en['stream.limit_exceeded']);
    expect(playbackBlockingMessage({ code: 'AUTHORIZATION_FAILED', error: 'Other' })).toBeNull();
  });

  it('degrades to null for every non-matching body shape', () => {
    for (const body of [
      null,
      undefined,
      'string body',
      42,
      {},
      { error: 'Some human sentence' },
      { error: '' },
      { code: '' },
      { error: 7 },
      { code: ['stream.limit'] },
    ]) {
      expect(playbackBlockingMessage(body), JSON.stringify(body)).toBeNull();
    }
  });

  it('refuses a non-record wire body even when it CARRIES a registered code key (phlix-ui-player-051)', () => {
    // The reader used to guard only `typeof body === 'object'` and then index
    // through an `as Record` cast — arrays are objects, so an anomalous ARRAY
    // body carrying a code key slipped past the guard and the cast read the key
    // anyway, producing a blocking message from a payload a real shape guard
    // must refuse outright. The isRecord predicate rejects arrays before any
    // property access (red pre-change: the localized string came back).
    const coded: unknown[] = [];
    Object.defineProperty(coded, 'code', { value: 'stream.limit_exceeded', enumerable: true, writable: true });
    expect(playbackBlockingMessage(coded)).toBeNull();
    // [phlix-ui-player-015] the refused throw is neither an Error nor a coded
    // ApiError, so the inverted rail lands on the localized generic copy —
    // and a non-Error value is never echoed to the console either.
    const noise = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(mediaLoadErrorMessage(coded)).toBe(GENERIC_ERROR_MESSAGE.en);
    expect(noise).not.toHaveBeenCalled();
    vi.restoreAllMocks();

    const legacy: unknown[] = [];
    Object.defineProperty(legacy, 'error', { value: 'AccessScheduled', enumerable: true, writable: true });
    expect(playbackBlockingMessage(legacy)).toBeNull();
  });

  it('still resolves registered codes on genuine objects (positive control)', () => {
    expect(playbackBlockingMessage({ code: 'stream.limit_exceeded' })).toBe(
      ERROR_MESSAGES.en['stream.limit_exceeded'],
    );
  });
});

/**
 * The generic media-load failure rail (ui-min3 U3): a REGISTERED wire code
 * must localize through the contracts catalog — the server's English debug
 * text is doctrine-ineligible for member-facing copy — while every shape the
 * catalog does not name keeps the page's pre-existing behavior verbatim.
 */
describe('mediaLoadErrorMessage', () => {
  it('routes a registered wire code through the catalog, never the server English', () => {
    const e = new ApiError('TUNNEL DEBUG TEXT', 503, {
      error: 'TUNNEL DEBUG TEXT',
      code: 'server.relay_unavailable',
    });
    expect(mediaLoadErrorMessage(e)).toBe(ERROR_MESSAGES.en['server.relay_unavailable']);
  });

  it('routes an unregistered-code error’s raw text to the console, NOT to the member [phlix-ui-player-015]', () => {
    // The old rail echoed the server/proxy debug string straight into the DOM.
    // Inverted: the member-facing string is the localized generic copy and the
    // raw detail is console-only (developer channel).
    const noise = vi.spyOn(console, 'error').mockImplementation(() => {});
    const e = new ApiError('Weird proxy text', 502, { error: 'Weird proxy text', code: 'proxy.nope' });
    expect(mediaLoadErrorMessage(e)).toBe(GENERIC_ERROR_MESSAGE.en);
    expect(noise).toHaveBeenCalledTimes(1);
    expect(noise.mock.calls[0]?.join(' ')).toContain('Weird proxy text');
    vi.restoreAllMocks();
  });

  it('routes a network TypeError message to the console, not the member [phlix-ui-player-015]', () => {
    const noise = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(mediaLoadErrorMessage(new TypeError('fetch failed'))).toBe(GENERIC_ERROR_MESSAGE.en);
    expect(noise).toHaveBeenCalledTimes(1);
    expect(noise.mock.calls[0]?.join(' ')).toContain('fetch failed');
    vi.restoreAllMocks();
  });

  it('falls back to the localized generic copy for non-Error throws and message-less Errors [phlix-ui-player-015]', () => {
    const noise = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(mediaLoadErrorMessage({})).toBe(GENERIC_ERROR_MESSAGE.en);
    expect(mediaLoadErrorMessage(new Error(''))).toBe(GENERIC_ERROR_MESSAGE.en);
    // A message-less Error and a non-Error throw carry nothing dev-useful —
    // the inverted rail must NOT cry console wolf for them.
    expect(noise).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });
});

/**
 * [phlix-ui-player-015] the shared inversion helper: a registered wire code
 * localizes through the catalog untouched; everything else surfaces the
 * CALLER's localized fallback string while the raw detail is console-only.
 */
describe('localizedFailureMessage', () => {
  it('resolves a registered wire code through the catalog and stays silent', () => {
    const noise = vi.spyOn(console, 'error').mockImplementation(() => {});
    const e = new ApiError('DEBUG', 503, { error: 'DEBUG', code: 'server.relay_unavailable' });
    expect(localizedFailureMessage(e, 'en', 'Fallback copy')).toBe(
      ERROR_MESSAGES.en['server.relay_unavailable'],
    );
    expect(noise).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('returns the caller fallback for an unregistered raw Error and logs the raw text', () => {
    const noise = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(localizedFailureMessage(new Error('socket hang up'), 'de', 'Lokaler Text')).toBe(
      'Lokaler Text',
    );
    expect(noise).toHaveBeenCalledTimes(1);
    expect(noise.mock.calls[0]?.join(' ')).toContain('socket hang up');
    vi.restoreAllMocks();
  });

  it('returns the caller fallback for a non-Error throw WITHOUT a console line', () => {
    const noise = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(localizedFailureMessage('a bare string', undefined, 'Plain copy')).toBe('Plain copy');
    expect(noise).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('honours the locale for a registered code', () => {
    const e = new ApiError('X', 503, { code: 'server.relay_unavailable' });
    expect(localizedFailureMessage(e, 'ja', 'Ignored')).toBe(
      ERROR_MESSAGES.ja['server.relay_unavailable'],
    );
  });
});
