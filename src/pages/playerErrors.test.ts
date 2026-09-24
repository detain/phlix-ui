/**
 * Player blocking-error decoding (W4). The server puts pseudo-codes in the
 * `error` TEXT field; server W2 added a real `code` channel alongside them.
 * Both eras must resolve, and unknown shapes must degrade to `null` so the
 * caller's SWR path is untouched.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import { playbackBlockingMessage } from './playerErrors';
import { ERROR_MESSAGES } from '../i18n/errors';

describe('playbackBlockingMessage', () => {
  it('matches the legacy AccessScheduled pseudo-code in the error TEXT (pre-W2 era)', () => {
    // Phlix-server has always emitted exactly 'AccessScheduled' (with the d) in
    // the error text — AccessScheduleMiddleware pre- and post-W2 alike.
    expect(playbackBlockingMessage({ error: 'AccessScheduled' })).toBe(
      'Playback blocked by access schedule. Try again during allowed hours.',
    );
  });

  it('resolves the post-W2 access.scheduled code through the catalog even with the legacy text present', () => {
    expect(playbackBlockingMessage({ code: 'access.scheduled', error: 'AccessScheduled' })).toBe(
      ERROR_MESSAGES.en['access.scheduled'],
    );
  });

  it('matches the legacy StreamLimitExceeded pseudo-code in the error TEXT (pre-W2 era)', () => {
    expect(playbackBlockingMessage({ error: 'StreamLimitExceeded' })).toBe(
      'Stream limit reached. Stop another stream to continue watching.',
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
    // and a legacy `error` text on the same body still matches (transition safety).
    expect(
      playbackBlockingMessage({ code: 'AUTHORIZATION_FAILED', error: 'StreamLimitExceeded' }),
    ).toBe('Stream limit reached. Stop another stream to continue watching.');
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
});
