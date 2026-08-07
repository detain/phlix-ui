/**
 * `isMediaDetail()` — the one executable line in `src/types/media-item.ts`, and
 * the reason that file sat at `LF:1 LH:0, FNF:1 FNH:0, BRF:7 BRH:0` (measured
 * 2026-08-07, S182 re-enumeration).
 *
 * ⚠ REACHABILITY, stated honestly: nothing under `src/` calls this predicate and
 * it is not re-exported from `src/index.ts` (only `MediaItem` is, as a `type`), so
 * consumers cannot reach it either. It is dead as shipped — recorded as a finding
 * in the S182 worklog rather than deleted, because "unreachable" is a hypothesis.
 *
 * The predicate is a seven-way `||`. A test that passes one detail-shaped object
 * exercises exactly one arm and leaves the other six at zero while the FUNCTION
 * reads as covered — so each arm gets its own case, and the negative case is the
 * control that makes them all falsifiable.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { isMediaDetail, type MediaItem } from './media-item';

/** The minimum a `MediaItem` needs; deliberately carries NO detail-only field. */
function listRow(over: Partial<MediaItem> = {}): MediaItem {
  return { id: 'itm-1', title: 'Arrival', type: 'movie', ...over } as MediaItem;
}

/** The seven fields whose mere PRESENCE promotes a list row to a detail. */
const DISCRIMINATORS = [
  'stream_url',
  'duration',
  'cast',
  'crew',
  'production_companies',
  'studio',
  'library_id',
] as const;

describe('isMediaDetail', () => {
  it('rejects a bare list row — the control every case below depends on', () => {
    // Without this, a mutation to `return true` would leave all seven arms green.
    expect(isMediaDetail(listRow())).toBe(false);
  });

  it('rejects a row carrying only NON-discriminating fields', () => {
    expect(
      isMediaDetail(
        listRow({ year: 2016, overview: 'linguist meets heptapods', poster_url: '/p.jpg' } as Partial<MediaItem>),
      ),
    ).toBe(false);
  });

  it.each(DISCRIMINATORS)('accepts a row on the strength of `%s` ALONE', (field) => {
    // One arm at a time: a `&&`-for-`||` mutation, or a dropped arm, reds exactly
    // the affected case rather than hiding behind a fixture that sets all seven.
    expect(isMediaDetail(listRow({ [field]: 'x' } as unknown as Partial<MediaItem>))).toBe(true);
  });

  it.each(DISCRIMINATORS)('accepts `%s` set to NULL — presence, not truthiness', (field) => {
    // The predicate tests `!== undefined`. A `!= null` or a truthiness rewrite
    // would call a detail with `stream_url: null` a list row; the server sends
    // exactly that for a local file (see the field's own docblock).
    expect(isMediaDetail(listRow({ [field]: null } as unknown as Partial<MediaItem>))).toBe(true);
  });

  it('accepts `duration: 0` — 0 is not undefined', () => {
    // The S177 trap in its purest form.
    expect(isMediaDetail(listRow({ duration: 0 } as unknown as Partial<MediaItem>))).toBe(true);
  });

  it('accepts an EMPTY cast array', () => {
    expect(isMediaDetail(listRow({ cast: [] } as unknown as Partial<MediaItem>))).toBe(true);
  });

  it('accepts an EMPTY stream_url string', () => {
    expect(isMediaDetail(listRow({ stream_url: '' } as unknown as Partial<MediaItem>))).toBe(true);
  });

  it('rejects a row whose discriminator is EXPLICITLY undefined', () => {
    // `{ duration: undefined }` has the key but not the value. `in` would say yes;
    // `!== undefined` says no. This case is what separates the two implementations.
    expect(isMediaDetail(listRow({ duration: undefined } as unknown as Partial<MediaItem>))).toBe(
      false,
    );
    expect('duration' in listRow({ duration: undefined } as unknown as Partial<MediaItem>)).toBe(
      true,
    );
  });

  it('narrows the type for the compiler as well as at runtime', () => {
    const item = listRow({ duration: 142, stream_url: '/s.m3u8' } as unknown as Partial<MediaItem>);
    if (!isMediaDetail(item)) throw new Error('expected a MediaDetail');
    // Reachable only through the narrowing; `item.duration` does not typecheck on
    // the un-narrowed `MediaItem`, so `vue-tsc --noEmit` is part of this assertion.
    expect(item.duration).toBe(142);
    expect(item.stream_url).toBe('/s.m3u8');
  });
});
