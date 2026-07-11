/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  canDecodeAudioCodec,
  canDecodeHevcInMp4,
  needsTranscodeWithCapabilities,
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
      { index: 0, streamIndex: 1, language: 'eng', label: 'English 5.1', default: true, codec: 'aac' },
      { index: 1, streamIndex: 2, language: 'jpn', label: 'jpn', default: false, codec: 'ac3' },
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

// ---- MediaCapabilities / codec probing (UI-1.3) ------------------------------

const fakeMediaCapabilities = (supported: boolean) => ({
  decodingInfo: vi.fn().mockResolvedValue({ supported }),
});

function fakeDocument(canPlayTypeResult: '' | 'maybe' | 'probably' = '') {
  return {
    createElement: vi.fn(() => ({
      canPlayType: vi.fn(() => canPlayTypeResult),
    })),
  };
}

describe('playback — canDecodeAudioCodec', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when decodingInfo reports supported: true', async () => {
    const mc = fakeMediaCapabilities(true);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await canDecodeAudioCodec('eac3', 'video/mp4');

    expect(result).toBe(true);
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  it('returns false when decodingInfo reports supported: false', async () => {
    const mc = fakeMediaCapabilities(false);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await canDecodeAudioCodec('eac3', 'video/mp4');

    expect(result).toBe(false);
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  it('returns false when audioCodec is empty (no restriction)', async () => {
    const mc = fakeMediaCapabilities(true);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });

    const result = await canDecodeAudioCodec('', 'video/mp4');

    expect(result).toBe(true);
    // Must not probe when codec is empty — safe fallback for missing codec data.
    expect(mc.decodingInfo).not.toHaveBeenCalled();
  });

  it('returns false for an unrecognised codec', async () => {
    const mc = fakeMediaCapabilities(true);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await canDecodeAudioCodec('unsupported-codec', 'video/mp4');

    expect(result).toBe(false);
    expect(mc.decodingInfo).not.toHaveBeenCalled();
  });

  it('falls back to canPlayType when decodingInfo throws', async () => {
    const mc = {
      decodingInfo: vi.fn().mockRejectedValue(new Error('not supported')),
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument('probably'));

    const result = await canDecodeAudioCodec('eac3', 'video/mp4');

    expect(result).toBe(true);
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  it('returns false when canPlayType also returns empty (no fallback available)', async () => {
    const mc = {
      decodingInfo: vi.fn().mockRejectedValue(new Error('not supported')),
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument(''));

    const result = await canDecodeAudioCodec('eac3', 'video/mp4');

    expect(result).toBe(false);
  });
});

describe('playback — canDecodeHevcInMp4', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when decodingInfo reports supported: true', async () => {
    const mc = fakeMediaCapabilities(true);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await canDecodeHevcInMp4();

    expect(result).toBe(true);
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  it('returns false when decodingInfo reports supported: false', async () => {
    const mc = fakeMediaCapabilities(false);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await canDecodeHevcInMp4();

    expect(result).toBe(false);
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  it('returns true when canPlayType returns "probably" after decodingInfo fails', async () => {
    const mc = {
      decodingInfo: vi.fn().mockRejectedValue(new Error('not supported')),
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument('probably'));

    const result = await canDecodeHevcInMp4();

    expect(result).toBe(true);
  });

  it('returns false when canPlayType also returns empty', async () => {
    const mc = {
      decodingInfo: vi.fn().mockRejectedValue(new Error('not supported')),
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument(''));

    const result = await canDecodeHevcInMp4();

    expect(result).toBe(false);
  });

  it('returns false when navigator is undefined', async () => {
    vi.stubGlobal('navigator', undefined);

    const result = await canDecodeHevcInMp4();

    expect(result).toBe(false);
  });
});

describe('playback — needsTranscodeWithCapabilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when the extension is a known transcode container', async () => {
    vi.stubGlobal('navigator', { mediaCapabilities: fakeMediaCapabilities(true) });
    vi.stubGlobal('document', fakeDocument());

    const result = await needsTranscodeWithCapabilities(['/lib/movie.mkv'], []);

    expect(result).toBe(true);
  });

  it('returns false when extension is a direct-play container and audio codec is supported', async () => {
    const mc = fakeMediaCapabilities(true);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await needsTranscodeWithCapabilities(
      ['/lib/movie.mp4'],
      [{ index: 0, streamIndex: 1, language: 'eng', label: 'English', default: true, codec: 'aac' }],
    );

    expect(result).toBe(false);
  });

  it('returns true when the primary audio codec is unsupported', async () => {
    // decodingInfo reports unsupported.
    const mc = fakeMediaCapabilities(false);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await needsTranscodeWithCapabilities(
      ['/lib/movie.mp4'],
      [{ index: 0, streamIndex: 1, language: 'eng', label: 'English', default: true, codec: 'eac3' }],
    );

    expect(result).toBe(true);
  });

  it('returns true when the source is mp4 and HEVC is unsupported (black-flash guard)', async () => {
    // First call: audio codec check → supported. Second call: HEVC check → unsupported.
    const mc = {
      decodingInfo: vi
        .fn()
        .mockResolvedValueOnce({ supported: true })  // audio codec check
        .mockResolvedValueOnce({ supported: false }), // HEVC check
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await needsTranscodeWithCapabilities(
      ['/lib/movie.mp4'],
      [{ index: 0, streamIndex: 1, language: 'eng', label: 'English', default: true, codec: 'aac' }],
    );

    expect(result).toBe(true);
  });

  it('returns false when all checks pass (extension, audio codec, HEVC)', async () => {
    const mc = {
      decodingInfo: vi
        .fn()
        .mockResolvedValueOnce({ supported: true })  // audio codec check
        .mockResolvedValueOnce({ supported: true }), // HEVC check
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await needsTranscodeWithCapabilities(
      ['/lib/movie.mp4'],
      [{ index: 0, streamIndex: 1, language: 'eng', label: 'English', default: true, codec: 'aac' }],
    );

    expect(result).toBe(false);
  });

  it('skips audio probe when playbackAudioTracks is empty (no server data yet)', async () => {
    const mc = fakeMediaCapabilities(false);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    // Even though decodingInfo returns false for audio, empty tracks means
    // the caller should watch for late audio-track arrival and re-evaluate.
    const result = await needsTranscodeWithCapabilities(['/lib/movie.mp4'], []);

    // Extension check passes (mp4 is direct-play) and no audio probe when tracks empty.
    expect(result).toBe(false);
    expect(mc.decodingInfo).not.toHaveBeenCalled();
  });
});
