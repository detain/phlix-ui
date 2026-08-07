/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { resolveSubtitleUrl, resolveSubtitleTracks } from './subtitleSrc';
import type { SubtitleTrack } from '../components/player/transcode';

/**
 * S242 — the resolution RULE for a WebVTT sidecar URL.
 *
 * Every expectation here is the resolved string, never "the helper was called":
 * a no-op `resolveSubtitleUrl` fails the first block and a pass-through
 * `resolveSubtitleTracks` fails the second.
 */

const RELAY = '/api/v1/servers/srv-7/proxy';
/** An embedded text track exactly as `StreamTrackShaper::subtitleTracks()` mints it. */
const SIGNED = '/api/v1/media/m1/subtitles/0?exp=1785000000&sig=deadbeefcafe';
/** A downloaded sidecar, served by media_streams row id. */
const SIGNED_EXTERNAL = '/api/v1/media/m1/subtitles/external/st-9?exp=1785000000&sig=abc123';

function track(over: Partial<SubtitleTrack> = {}): SubtitleTrack {
  return { index: 0, language: 'eng', label: 'English', default: false, url: SIGNED, ...over };
}

describe('S242 — resolveSubtitleUrl', () => {
  it('prefixes a root-relative signed sidecar with the relay base', () => {
    expect(resolveSubtitleUrl(RELAY, SIGNED)).toBe(
      '/api/v1/servers/srv-7/proxy/api/v1/media/m1/subtitles/0?exp=1785000000&sig=deadbeefcafe',
    );
    expect(resolveSubtitleUrl(RELAY, SIGNED_EXTERNAL)).toBe(
      '/api/v1/servers/srv-7/proxy/api/v1/media/m1/subtitles/external/st-9?exp=1785000000&sig=abc123',
    );
  });

  it('works with an absolute-origin base (a native client points at a server host)', () => {
    expect(resolveSubtitleUrl('https://hub.example/api/v1/servers/srv-7/proxy', SIGNED)).toBe(
      'https://hub.example/api/v1/servers/srv-7/proxy/api/v1/media/m1/subtitles/0?exp=1785000000&sig=deadbeefcafe',
    );
  });

  it('leaves the signed query byte-for-byte identical (no URL round-trip)', () => {
    // `SignedUrlMiddleware` verifies `sig` against the QUERY-LESS path, and the
    // hub forwards `queryString` verbatim; re-ordering or re-encoding a single
    // byte here is a silent 401, not a visible error.
    //
    // ⚠ The sample is deliberately NOT a `URLSearchParams` fixed point. An
    // earlier version used `sig=a%2Fb%2Bc%3D`, which survives a full
    // decode/re-encode round trip unchanged — so a planted
    // `new URLSearchParams(q).toString()` mutation PASSED the test it exists to
    // kill. Every escape below changes under that round trip: `%2f` upper-cases,
    // `%20` becomes `+`, `%7E` collapses to a literal `~`.
    const messy = '/api/v1/media/m1/subtitles/0?size=w500&exp=1785000000&sig=Ab%2fC%20d%7Ee';
    const out = resolveSubtitleUrl(RELAY, messy);
    expect(out).toBe(RELAY + messy);
    expect(out.slice(out.indexOf('?'))).toBe('?size=w500&exp=1785000000&sig=Ab%2fC%20d%7Ee');
    // The control that makes the assertion above non-vacuous: prove the sample
    // really would change if anything re-encoded it.
    const query = messy.slice(messy.indexOf('?') + 1);
    expect(new URLSearchParams(query).toString()).not.toBe(query);
  });

  it('CONTROL — an empty base is a strict no-op (the media server)', () => {
    expect(resolveSubtitleUrl('', SIGNED)).toBe(SIGNED);
  });

  it('CONTROL — an already-absolute sidecar passes through unchanged', () => {
    const abs = 'https://cdn.example/subs/en.vtt';
    expect(resolveSubtitleUrl(RELAY, abs)).toBe(abs);
    // Protocol-relative is absolute too (it inherits the page scheme).
    expect(resolveSubtitleUrl(RELAY, '//cdn.example/subs/en.vtt')).toBe('//cdn.example/subs/en.vtt');
    expect(resolveSubtitleUrl(RELAY, 'blob:https://hub.example/1234')).toBe('blob:https://hub.example/1234');
  });

  it('CONTROL — an empty url stays empty (never becomes the base)', () => {
    expect(resolveSubtitleUrl(RELAY, '')).toBe('');
  });

  it('trims a trailing slash on the base so the join never doubles', () => {
    expect(resolveSubtitleUrl(RELAY + '/', SIGNED)).toBe(RELAY + SIGNED);
  });
});

describe('S242 — resolveSubtitleTracks', () => {
  it('resolves every track url and preserves the other fields', () => {
    const out = resolveSubtitleTracks(RELAY, [
      track({ index: 0, url: SIGNED }),
      track({ index: 1, language: 'fra', label: 'French', default: true, url: SIGNED_EXTERNAL }),
    ]);
    expect(out.map((t) => t.url)).toEqual([RELAY + SIGNED, RELAY + SIGNED_EXTERNAL]);
    expect(out[1]).toMatchObject({ index: 1, language: 'fra', label: 'French', default: true });
  });

  it('never mutates the caller’s array or its objects', () => {
    const source = track();
    const list = [source];
    const out = resolveSubtitleTracks(RELAY, list);
    expect(source.url).toBe(SIGNED);
    expect(list[0]).toBe(source);
    expect(out[0]).not.toBe(source);
  });

  it('CONTROL — returns the SAME array identity when nothing needed prefixing', () => {
    // Identity matters: a `computed` that returns a fresh array every read would
    // re-trigger the deep watch that re-enumerates the native TextTrackList.
    const list = [track()];
    expect(resolveSubtitleTracks('', list)).toBe(list);
    const absolute = [track({ url: 'https://cdn.example/subs/en.vtt' })];
    expect(resolveSubtitleTracks(RELAY, absolute)).toBe(absolute);
  });

  it('handles an empty list', () => {
    const empty: SubtitleTrack[] = [];
    expect(resolveSubtitleTracks(RELAY, empty)).toBe(empty);
  });
});
