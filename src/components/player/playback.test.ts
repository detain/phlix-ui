/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import {
  extensionOf,
  needsTranscode,
  parsePlaybackAudioTracks,
  isFatalMediaError,
  isNetworkMediaError,
  ringDashoffset,
  DIRECT_PLAY_EXTENSIONS,
  TRANSCODE_EXTENSIONS,
  UPNEXT_COUNTDOWN_SECONDS,
  UPNEXT_RING_RADIUS,
  UPNEXT_RING_CIRCUMFERENCE,
} from './playback';

describe('playback — extensionOf', () => {
  it('lowercases the extension of the last path segment', () => {
    expect(extensionOf('/lib/Dune (2024).MKV')).toBe('mkv');
    expect(extensionOf('https://h/movies/clip.MP4')).toBe('mp4');
  });
  it('strips a query string and hash before reading the extension', () => {
    expect(extensionOf('movie.mkv?token=abc#t=10')).toBe('mkv');
    expect(extensionOf('/media/42/stream?x=1')).toBe('');
  });
  it('returns "" for extensionless / dot-edge / empty / nullish inputs', () => {
    expect(extensionOf('/media/42/stream')).toBe('');
    expect(extensionOf('.mkv')).toBe(''); // leading-dot hidden file → no extension
    expect(extensionOf('trailingdot.')).toBe('');
    expect(extensionOf('')).toBe('');
    expect(extensionOf(null)).toBe('');
    expect(extensionOf(undefined)).toBe('');
  });
  it('only considers the last segment (a dotted dir does not count)', () => {
    expect(extensionOf('/v1.2/release/stream')).toBe('');
  });
});

describe('playback — needsTranscode', () => {
  it('flags known non-web containers', () => {
    for (const ext of TRANSCODE_EXTENSIONS) {
      expect(needsTranscode(`/lib/movie.${ext}`)).toBe(true);
    }
  });
  it('does not flag direct-playable containers', () => {
    for (const ext of DIRECT_PLAY_EXTENSIONS) {
      expect(needsTranscode(`/lib/movie.${ext}`)).toBe(false);
    }
  });
  it('returns false for unknown / extensionless / nullish sources (the runtime error is the backstop)', () => {
    expect(needsTranscode('/media/42/stream')).toBe(false);
    expect(needsTranscode(null, undefined)).toBe(false);
    expect(needsTranscode()).toBe(false);
  });
  it('returns true when ANY source is a transcode container (e.g. extensionless URL + .mkv path)', () => {
    expect(needsTranscode('/media/42/stream', '/lib/Dune.mkv')).toBe(true);
    expect(needsTranscode('/media/42/stream', '/lib/Dune.mp4')).toBe(false);
  });
});

describe('playback — isFatalMediaError', () => {
  const withError = (code: number | undefined) =>
    ({ error: code === undefined ? null : { code } }) as unknown as HTMLVideoElement;

  it('is true for DECODE (3) and SRC_NOT_SUPPORTED (4)', () => {
    expect(isFatalMediaError(withError(3))).toBe(true);
    expect(isFatalMediaError(withError(4))).toBe(true);
  });
  it('is false for ABORTED (1) / NETWORK (2) / no error / nullish element', () => {
    expect(isFatalMediaError(withError(1))).toBe(false);
    expect(isFatalMediaError(withError(2))).toBe(false);
    expect(isFatalMediaError(withError(undefined))).toBe(false);
    expect(isFatalMediaError(null)).toBe(false);
    expect(isFatalMediaError(undefined)).toBe(false);
  });
});

describe('playback — isNetworkMediaError', () => {
  const withError = (code: number | undefined) =>
    ({ error: code === undefined ? null : { code } }) as unknown as HTMLVideoElement;

  it('is true only for NETWORK (2)', () => {
    expect(isNetworkMediaError(withError(2))).toBe(true);
  });
  it('is false for ABORTED (1) / DECODE (3) / SRC_NOT_SUPPORTED (4) / no error / nullish element', () => {
    expect(isNetworkMediaError(withError(1))).toBe(false);
    expect(isNetworkMediaError(withError(3))).toBe(false);
    expect(isNetworkMediaError(withError(4))).toBe(false);
    expect(isNetworkMediaError(withError(undefined))).toBe(false);
    expect(isNetworkMediaError(null)).toBe(false);
    expect(isNetworkMediaError(undefined)).toBe(false);
  });
});

describe('playback — ringDashoffset + constants', () => {
  it('exposes the mockup ring geometry + 8s countdown', () => {
    expect(UPNEXT_COUNTDOWN_SECONDS).toBe(8);
    expect(UPNEXT_RING_RADIUS).toBe(15);
    expect(UPNEXT_RING_CIRCUMFERENCE).toBeCloseTo(2 * Math.PI * 15, 5);
  });
  it('is a full arc (offset 0) at remaining=total and empty (offset=C) at remaining=0', () => {
    expect(ringDashoffset(8, 8, 100)).toBe(0);
    expect(ringDashoffset(0, 8, 100)).toBe(100);
  });
  it('depletes proportionally through the countdown', () => {
    expect(ringDashoffset(4, 8, 100)).toBe(50);
    expect(ringDashoffset(2, 8, 100)).toBe(75);
  });
  it('clamps an out-of-range remaining and treats total<=0 as empty', () => {
    expect(ringDashoffset(99, 8, 100)).toBe(0); // remaining > total clamps to full
    expect(ringDashoffset(-5, 8, 100)).toBe(100); // remaining < 0 clamps to empty
    expect(ringDashoffset(5, 0, 100)).toBe(100);
    expect(ringDashoffset(5, -1, 100)).toBe(100);
  });
  it('defaults the circumference to the ring constant', () => {
    expect(ringDashoffset(0, 8)).toBeCloseTo(UPNEXT_RING_CIRCUMFERENCE, 5);
  });
});

describe('playback — parsePlaybackAudioTracks (playback-info audio_tracks)', () => {
  it('parses the server wire shape (snake_case stream_index, title → label)', () => {
    const out = parsePlaybackAudioTracks([
      { id: 'a0', codec: 'aac', language: 'eng', channels: 6, bitrate: 384000, title: 'English 5.1', index: 0, stream_index: 1, default: true },
      { id: 'a1', codec: 'ac3', language: 'jpn', channels: 2, bitrate: 192000, title: '', index: 1, stream_index: 2, default: false },
    ]);
    expect(out).toEqual([
      { index: 0, streamIndex: 1, language: 'eng', label: 'English 5.1', default: true },
      { index: 1, streamIndex: 2, language: 'jpn', label: 'jpn', default: false },
    ]);
  });

  it('falls back to "Audio N" when a track has neither title nor language', () => {
    const out = parsePlaybackAudioTracks([{ index: 0, stream_index: 1 }, { index: 1, stream_index: 2 }]);
    expect(out[0].label).toBe('Audio 1');
    expect(out[1].label).toBe('Audio 2');
    expect(out[0].default).toBe(false);
  });

  it('returns [] for a missing / non-array value and skips junk entries', () => {
    expect(parsePlaybackAudioTracks(undefined)).toEqual([]);
    expect(parsePlaybackAudioTracks(null)).toEqual([]);
    expect(parsePlaybackAudioTracks('nope')).toEqual([]);
    const out = parsePlaybackAudioTracks([null, 'junk', { index: 0, language: 'eng' }]);
    expect(out).toHaveLength(1);
    expect(out[0].language).toBe('eng');
  });

  it('synthesises a sane index/streamIndex when the entry omits them', () => {
    const out = parsePlaybackAudioTracks([{ language: 'eng' }, { language: 'jpn' }]);
    expect(out[0]).toMatchObject({ index: 0, streamIndex: 0 });
    expect(out[1]).toMatchObject({ index: 1, streamIndex: 1 });
  });
});
