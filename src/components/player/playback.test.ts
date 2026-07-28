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
  canDecodeVideoCodec,
  needsTranscodeWithCapabilities,
  videoCodecFromStreams,
  videoCodecPolicy,
  containerMimeForExtension,
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
  // NOT "the runtime error is the backstop" — measured, it is not one (see the block
  // comment above VIDEO_CODEC_FAMILY in playback.ts). This gate only declines to GUESS
  // from an extension; the codec allowlist in videoCodecPolicy() is what decides.
  it('returns false for unknown / extensionless / nullish sources (we do not guess — the codec guard decides)', () => {
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

describe('playback — videoCodecFromStreams (media detail streams[])', () => {
  it('returns the codec of the video stream row', () => {
    // Shape of the real `GET /api/v1/media/{id}` streams[] — raw media_streams
    // rows, so the numeric columns arrive JSON-encoded as strings.
    const streams = [
      { stream_index: '0', stream_type: 'video', codec: 'h264', width: '1920', height: '1080' },
      { stream_index: '1', stream_type: 'audio', codec: 'aac', channels: '2' },
      { stream_index: '2', stream_type: 'subtitle', codec: 'subrip' },
    ];
    expect(videoCodecFromStreams(streams)).toBe('h264');
  });

  it('ignores audio/subtitle rows and picks HEVC out of a video row', () => {
    const streams = [
      { stream_index: '0', stream_type: 'audio', codec: 'eac3' },
      { stream_index: '1', stream_type: 'video', codec: 'hevc' },
    ];
    expect(videoCodecFromStreams(streams)).toBe('hevc');
  });

  it('returns "" (unknown) for a missing / non-array / video-less value', () => {
    expect(videoCodecFromStreams(undefined)).toBe('');
    expect(videoCodecFromStreams(null)).toBe('');
    expect(videoCodecFromStreams('nope')).toBe('');
    expect(videoCodecFromStreams([])).toBe('');
    expect(videoCodecFromStreams([{ stream_type: 'audio', codec: 'aac' }])).toBe('');
    // A video row with no codec is still unknown, not a guess.
    expect(videoCodecFromStreams([{ stream_type: 'video', codec: null }])).toBe('');
    expect(videoCodecFromStreams([{ stream_type: 'video' }])).toBe('');
  });

  it('skips junk entries and tolerates a camelCase streamType', () => {
    expect(videoCodecFromStreams([null, 'junk', 42, { streamType: 'VIDEO', codec: 'av1' }])).toBe('av1');
  });
});

describe('playback — videoCodecPolicy (decodable-codec allowlist)', () => {
  it('treats an unknown / absent codec as direct play', () => {
    // Preserves the original fix's goal: never force a transcode just because the
    // server did not tell us the codec.
    expect(videoCodecPolicy('')).toBe('direct');
    expect(videoCodecPolicy('   ')).toBe('direct');
    expect(videoCodecPolicy(null)).toBe('direct');
    expect(videoCodecPolicy(undefined)).toBe('direct');
  });

  it('treats H.264 and its aliases as direct play with no probe', () => {
    for (const codec of ['h264', 'H264', ' h264 ', 'avc', 'avc1', 'x264']) {
      expect(videoCodecPolicy(codec)).toBe('direct');
    }
  });

  it('probes the conditionally decodable codecs', () => {
    // Every spelling of HEVC that can reach us: the server stores ffprobe's
    // `codec_name` verbatim (`hevc`), `hvc1`/`hev1` are the mp4 sample-entry
    // brandings and `h265`/`x265` are common aliases. Trimmed + case-insensitive.
    for (const codec of ['hevc', 'HEVC', ' hevc ', 'h265', 'H265', 'hvc1', 'HVC1', 'hev1', 'x265', 'av1', 'av01', 'vp9', 'vp09', 'vp8', 'theora']) {
      expect(videoCodecPolicy(codec)).toBe('probe');
    }
  });

  it('transcodes every other REPORTED codec', () => {
    // Prod's full distinct video-codec set outside the allowlist — all genuinely
    // undecodable in a browser, and all of them silent black screens (no `error`
    // event) if they reach direct play.
    for (const codec of ['mpeg4', 'msmpeg4v1', 'msmpeg4v2', 'msmpeg4v3', 'mpeg1video', 'mjpeg']) {
      expect(videoCodecPolicy(codec)).toBe('transcode');
    }
    // …and anything else we have not positively cleared.
    for (const codec of ['mpeg2video', 'vc1', 'wmv3', 'prores', 'dnxhd', 'rv40', 'not-a-codec']) {
      expect(videoCodecPolicy(codec)).toBe('transcode');
    }
  });
});

describe('playback — containerMimeForExtension', () => {
  it('maps every direct-play extension to a REAL container MIME', () => {
    // Never `video/${ext}`: `video/m4v`, `video/mov` and `video/ogv` are MIME types
    // no browser knows, so probing them answers '' for every codec and the file
    // force-transcodes (measured in Chrome 150).
    expect(containerMimeForExtension('mp4')).toBe('video/mp4');
    expect(containerMimeForExtension('m4v')).toBe('video/mp4');
    expect(containerMimeForExtension('mov')).toBe('video/quicktime');
    expect(containerMimeForExtension('webm')).toBe('video/webm');
    expect(containerMimeForExtension('ogg')).toBe('video/ogg');
    expect(containerMimeForExtension('ogv')).toBe('video/ogg');
  });

  it('maps every DIRECT_PLAY_EXTENSIONS entry to a MIME browsers actually know', () => {
    // The guard only ever asks about these six, so none may fall through to the
    // default by accident — and `m4v`/`mov`/`ogv` must NOT be `video/<ext>`.
    const real = new Set(['video/mp4', 'video/quicktime', 'video/webm', 'video/ogg']);
    for (const ext of DIRECT_PLAY_EXTENSIONS) {
      expect(real.has(containerMimeForExtension(ext))).toBe(true);
    }
    for (const ext of ['m4v', 'mov', 'ogv'] as const) {
      expect(containerMimeForExtension(ext)).not.toBe(`video/${ext}`);
    }
  });

  it('falls back to video/mp4 for an unknown / absent extension', () => {
    expect(containerMimeForExtension('')).toBe('video/mp4');
    expect(containerMimeForExtension(null)).toBe('video/mp4');
    expect(containerMimeForExtension(undefined)).toBe('video/mp4');
    expect(containerMimeForExtension('MP4')).toBe('video/mp4');
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

// HEVC-in-mp4 specifically — the codec/container pair the original regression was
// about. These assertions used to run through a `canDecodeHevcInMp4()` alias; that
// alias had no production caller and was not on the `@phlix/ui/player` public
// surface, so it was deleted and the assertions retargeted at the real function with
// the arguments the alias used to pass.
describe('playback — canDecodeVideoCodec (HEVC in mp4)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when decodingInfo reports supported: true', async () => {
    const mc = fakeMediaCapabilities(true);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await canDecodeVideoCodec('hevc', 'video/mp4');

    expect(result).toBe(true);
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  it('returns false when decodingInfo reports supported: false', async () => {
    const mc = fakeMediaCapabilities(false);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await canDecodeVideoCodec('hevc', 'video/mp4');

    expect(result).toBe(false);
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  // REGRESSION: the probe used to pass a bare `video/mp4` contentType. A
  // codec-less contentType is not a decodable configuration, so Chromium answered
  // `supported: false` for it — the probe never tested HEVC at all. It must carry a
  // real RFC 6381 HEVC codec string.
  it('probes decodingInfo with a real RFC 6381 HEVC codec string, not a bare video/mp4', async () => {
    const mc = fakeMediaCapabilities(true);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    await canDecodeVideoCodec('hevc', 'video/mp4');

    const config = mc.decodingInfo.mock.calls[0][0] as {
      video?: { contentType?: string };
    };
    expect(config.video?.contentType).toMatch(/^video\/mp4;\s*codecs="(hvc1|hev1)\./);
  });

  it('returns true when canPlayType returns "probably" after decodingInfo fails', async () => {
    const mc = {
      decodingInfo: vi.fn().mockRejectedValue(new Error('not supported')),
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument('probably'));

    const result = await canDecodeVideoCodec('hevc', 'video/mp4');

    expect(result).toBe(true);
  });

  it('returns false when canPlayType also returns empty', async () => {
    const mc = {
      decodingInfo: vi.fn().mockRejectedValue(new Error('not supported')),
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument(''));

    const result = await canDecodeVideoCodec('hevc', 'video/mp4');

    expect(result).toBe(false);
  });

  it('returns false when navigator is undefined', async () => {
    vi.stubGlobal('navigator', undefined);

    const result = await canDecodeVideoCodec('hevc', 'video/mp4');

    expect(result).toBe(false);
  });
});

describe('playback — canDecodeVideoCodec', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('probes the requested codec inside the requested CONTAINER', async () => {
    const mc = fakeMediaCapabilities(false);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    await canDecodeVideoCodec('vp9', 'video/webm');

    const config = mc.decodingInfo.mock.calls[0][0] as { video?: { contentType?: string } };
    expect(config.video?.contentType).toBe('video/webm; codecs="vp09.00.10.08"');
  });

  it('falls back to the canPlayType ladder when decodingInfo says no', async () => {
    const mc = fakeMediaCapabilities(false);
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument('maybe'));

    expect(await canDecodeVideoCodec('av1', 'video/mp4')).toBe(true);
  });

  it('returns false for codecs it has no probe string for (never read as "undecodable")', async () => {
    // h264 is `direct` and mpeg4 is `transcode` — both are decided by
    // videoCodecPolicy, never by this probe, so a bare false here is correct.
    vi.stubGlobal('navigator', { mediaCapabilities: fakeMediaCapabilities(true) });
    vi.stubGlobal('document', fakeDocument('probably'));

    expect(await canDecodeVideoCodec('h264', 'video/mp4')).toBe(false);
    expect(await canDecodeVideoCodec('mpeg4', 'video/mp4')).toBe(false);
    expect(await canDecodeVideoCodec('', 'video/mp4')).toBe(false);
    expect(await canDecodeVideoCodec(null)).toBe(false);
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

  it('returns true when the source IS HEVC in mp4 and HEVC is unsupported (black-flash guard)', async () => {
    // The VIDEO decision runs first and is independent of the audio data, so the
    // single decodingInfo call here is the HEVC probe; canPlayType ('' from
    // fakeDocument) fails the fallback ladder too, so the guard short-circuits
    // before the audio codec is ever consulted.
    const mc = {
      decodingInfo: vi.fn().mockResolvedValue({ supported: false }), // HEVC probe
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await needsTranscodeWithCapabilities(
      ['/lib/movie.mp4'],
      [{ index: 0, streamIndex: 1, language: 'eng', label: 'English', default: true, codec: 'aac' }],
      'hevc',
    );

    expect(result).toBe(true);
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  it('returns false when all checks pass (extension, HEVC, audio codec)', async () => {
    const mc = {
      decodingInfo: vi
        .fn()
        .mockResolvedValueOnce({ supported: true })  // HEVC video probe
        .mockResolvedValueOnce({ supported: true }), // audio codec check
    };
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', fakeDocument());

    const result = await needsTranscodeWithCapabilities(
      ['/lib/movie.mp4'],
      [{ index: 0, streamIndex: 1, language: 'eng', label: 'English', default: true, codec: 'aac' }],
      'hevc',
    );

    expect(result).toBe(false);
  });

  // ---- the guard must be a decodable-codec ALLOWLIST, on a REAL container MIME --
  //
  // Two bugs are pinned here, and both need mocks that are no more permissive than
  // the browser they claim to model — otherwise these assertions pass for the wrong
  // reason (a `.m4v` case "passing" through the audio branch while the video branch
  // is never reached, for instance).
  //
  //   1. The guard fired for EVERY mp4, so plain H.264 files were force-transcoded
  //      on any browser without HEVC (Chrome/Chromium/Firefox on Linux). Narrowing
  //      it to an HEVC-only DENYLIST then silently black-screened every other
  //      undecodable codec, because an undecodable video stream next to a decodable
  //      audio stream fires no `error` event at all.
  //   2. `containerMime` was built as `video/${ext}`, producing `video/m4v` /
  //      `video/mov` / `video/ogv` — MIME types no browser knows, so every probe
  //      against them answered `''` and every such file force-transcoded.

  /**
   * `canPlayType` EXACTLY as measured in Chrome 150 (headless, Linux x86_64,
   * driven through Playwright against `/usr/bin/google-chrome-stable`) over the
   * FULL cross product of container MIME × every codec parameter this module can
   * generate. Only these container/codec pairs answer `'probably'`; EVERYTHING
   * else answers `''`.
   *
   * Deliberately NOT decodable, and each one load-bearing for a test below:
   *   - `hvc1…` / `hev1…` (HEVC) under every container — the guard's whole point.
   *   - `theora` under `video/ogg` — Chrome dropped Theora in 123.
   *   - `ec-3` / `ac-3` / `dtsc` / `dtshd` / `mlp` / `mp4a.40.34` — the audio veto.
   *   - EVERY codec under `video/quicktime` — Chrome advertises no QuickTime
   *     support at all (Safari does), so `.mov` still declines direct play here.
   *   - EVERY codec under `video/m4v` / `video/mov` / `video/ogv` — not MIME types
   *     any browser knows. This is the bogus-MIME bug: an older mock answered
   *     `'probably'` for `video/m4v; codecs="mp4a.40.2"`, where the real browser
   *     answers `''`, which is what let the `.m4v` assertion look non-vacuous.
   */
  const MEASURED_DECODABLE: ReadonlyMap<string, ReadonlySet<string>> = new Map([
    ['video/mp4', new Set(['mp4a.40.2', 'opus', 'flac', 'av01.0.08M.08', 'av01.0.05M.08', 'vp09.00.10.08'])],
    ['video/webm', new Set(['opus', 'vorbis', 'av01.0.08M.08', 'av01.0.05M.08', 'vp09.00.10.08', 'vp9', 'vp8'])],
    ['video/ogg', new Set(['opus', 'vorbis', 'flac', 'vp8'])],
  ]);

  /** The measured `canPlayType`. A bare (codec-less) MIME the browser recognises
   *  is `'maybe'`; a MIME it does not recognise is `''` whatever the codecs say. */
  function measuredCanPlayType(mime: string): '' | 'maybe' | 'probably' {
    const parsed = /^\s*([^;]+?)\s*(?:;\s*codecs="([^"]*)")?\s*$/.exec(mime);
    if (!parsed) return '';
    const decodable = MEASURED_DECODABLE.get(parsed[1].toLowerCase());
    if (!decodable) return '';
    if (parsed[2] === undefined) return 'maybe';
    return decodable.has(parsed[2]) ? 'probably' : '';
  }

  /** A `document` whose detached `<video>` answers exactly like that browser. */
  function measuredDocument() {
    return { createElement: vi.fn(() => ({ canPlayType: vi.fn(measuredCanPlayType) })) };
  }

  /**
   * `navigator.mediaCapabilities` as measured on the same browser:
   *   - a config carrying an AUDIO block whose `contentType` is a `video/*` MIME —
   *     exactly what {@link canDecodeAudioCodec} builds — THROWS
   *     `TypeError: The audio configuration dictionary is not valid.`, so the audio
   *     branch ALWAYS lands on the `canPlayType` fallback.
   *   - a video-only config reports `supported` iff `canPlayType` says `'probably'`
   *     (measured: bare `video/mp4` → false, `avc1…`/`av01…`/`vp09…` → true,
   *     `hvc1…`/`hev1…` → false, `mp4v.20.9` → false, `video/quicktime; codecs="avc1…"`
   *     → false).
   */
  function measuredBrowser() {
    return {
      decodingInfo: vi.fn(async (config: { video?: { contentType?: string }; audio?: unknown }) => {
        if (config.audio) throw new TypeError('The audio configuration dictionary is not valid.');
        return { supported: measuredCanPlayType(config.video?.contentType ?? '') === 'probably' };
      }),
    };
  }

  it('the measured-browser mock reproduces the probed Chrome 150 answers', () => {
    // Guards the guard: if this model drifts more permissive than the real browser,
    // every assertion below can start passing for the wrong reason.
    expect(measuredCanPlayType('video/mp4; codecs="mp4a.40.2"')).toBe('probably');
    expect(measuredCanPlayType('video/mp4; codecs="avc1.640028"')).toBe('');       // not probed by this module
    expect(measuredCanPlayType('video/mp4; codecs="hvc1.1.6.L93.B0"')).toBe('');
    expect(measuredCanPlayType('video/mp4; codecs="ec-3"')).toBe('');
    expect(measuredCanPlayType('video/mp4; codecs="ac-3"')).toBe('');
    expect(measuredCanPlayType('video/mp4; codecs="dtsc"')).toBe('');
    expect(measuredCanPlayType('video/mp4; codecs="vp09.00.10.08"')).toBe('probably');
    expect(measuredCanPlayType('video/mp4')).toBe('maybe');
    // THE bogus MIMEs — all '' in the real browser, whatever the codec.
    expect(measuredCanPlayType('video/m4v; codecs="mp4a.40.2"')).toBe('');
    expect(measuredCanPlayType('video/mov; codecs="mp4a.40.2"')).toBe('');
    expect(measuredCanPlayType('video/ogv; codecs="vorbis"')).toBe('');
    // Real, but unsupported by Chrome (Safari says yes).
    expect(measuredCanPlayType('video/quicktime')).toBe('');
    expect(measuredCanPlayType('video/quicktime; codecs="mp4a.40.2"')).toBe('');
    // webm / ogg.
    expect(measuredCanPlayType('video/webm; codecs="vp09.00.10.08"')).toBe('probably');
    expect(measuredCanPlayType('video/webm; codecs="opus"')).toBe('probably');
    expect(measuredCanPlayType('video/ogg; codecs="vorbis"')).toBe('probably');
    expect(measuredCanPlayType('video/ogg; codecs="theora"')).toBe('');
  });

  const aacDefault = [
    { index: 0, streamIndex: 1, language: 'eng', label: 'English', default: true, codec: 'aac' },
  ];

  it('does NOT flag an H.264 mp4 on a browser that cannot decode HEVC (THE regression)', async () => {
    const mc = measuredBrowser();
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', measuredDocument());

    const result = await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, 'h264');

    expect(result).toBe(false);
    // H.264 is on the direct-play allowlist, so no VIDEO probe runs at all: the
    // single decodingInfo call is the audio one (which throws, per the measurement).
    expect(mc.decodingInfo).toHaveBeenCalledOnce();
  });

  it('does NOT flag an H.264 .m4v — the container MIME must be video/mp4', async () => {
    // 112 of prod's 117 `.m4v` items are plain h264. Building the container MIME by
    // concatenation gave `video/m4v`, which the browser does not recognise, so the
    // AUDIO probe returned false and every `.m4v` force-transcoded — the headline
    // fix reached `.mp4` only.
    vi.stubGlobal('navigator', { mediaCapabilities: measuredBrowser() });
    vi.stubGlobal('document', measuredDocument());

    expect(await needsTranscodeWithCapabilities(['/lib/movie.m4v'], aacDefault, 'h264')).toBe(false);
    // …including when only the library PATH carries the extension.
    expect(
      await needsTranscodeWithCapabilities(['http://x/media/m1/stream', '/lib/movie.m4v'], aacDefault, 'h264'),
    ).toBe(false);
  });

  it('flags an mp4 whose video codec is undecodable but NOT HEVC (allowlist, not denylist)', async () => {
    // Measured with a real MPEG-4 Part 2 file: Chromium demuxes it, fires
    // `canplay`/`playing`, plays the AAC — and renders videoWidth 0 / 0 decoded
    // frames with NO `error` event. An HEVC-only denylist let every one of these
    // through to a permanent black screen with audio.
    vi.stubGlobal('navigator', { mediaCapabilities: measuredBrowser() });
    vi.stubGlobal('document', measuredDocument());

    for (const codec of ['mpeg4', 'msmpeg4v3', 'msmpeg4v2', 'msmpeg4v1', 'mpeg1video', 'mpeg2video', 'mjpeg', 'vc1', 'prores']) {
      expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, codec)).toBe(true);
    }
    // …and in a `.m4v` too, now that its MIME is no longer bogus.
    expect(await needsTranscodeWithCapabilities(['/lib/movie.m4v'], aacDefault, 'mpeg4')).toBe(true);
  });

  it('still flags a real HEVC mp4 on a browser that cannot decode HEVC', async () => {
    vi.stubGlobal('navigator', { mediaCapabilities: measuredBrowser() });
    vi.stubGlobal('document', measuredDocument());

    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, 'hevc')).toBe(true);
    // Alternate spellings of the same codec, case-insensitively.
    expect(await needsTranscodeWithCapabilities(['/lib/movie.m4v'], aacDefault, 'HEVC')).toBe(true);
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, 'h265')).toBe(true);
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, 'hvc1')).toBe(true);
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, 'hev1')).toBe(true);
    // …and with NO audio-track data at all: the video decision is independent, so
    // the guard does not have to wait for playback-info to make it.
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], [], 'hevc')).toBe(true);
  });

  it('does NOT flag an mp4 whose video codec is unknown/absent (no runtime recovery exists — see docs)', async () => {
    const mc = measuredBrowser();
    vi.stubGlobal('navigator', { mediaCapabilities: mc });
    vi.stubGlobal('document', measuredDocument());

    // Omitted argument, empty string and null all mean "unknown". Direct play is
    // preferred so the H.264 fix is not undone for items whose `streams[]` lost the
    // race with playback-info — NOT because anything downstream would catch a bad
    // source: measured, an undecodable video with decodable audio fires no error.
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault)).toBe(false);
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, '')).toBe(false);
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, null)).toBe(false);
    expect(await needsTranscodeWithCapabilities(['/lib/movie.m4v'], aacDefault, undefined)).toBe(false);
  });

  it('probes conditionally-decodable codecs against the SOURCE container', async () => {
    vi.stubGlobal('navigator', { mediaCapabilities: measuredBrowser() });
    vi.stubGlobal('document', measuredDocument());

    const opus = [{ index: 0, streamIndex: 1, language: '', label: 'Audio 1', default: true, codec: 'opus' }];
    // Chrome decodes VP9/VP8/AV1 in webm → direct play.
    expect(await needsTranscodeWithCapabilities(['/lib/clip.webm'], opus, 'vp9')).toBe(false);
    expect(await needsTranscodeWithCapabilities(['/lib/clip.webm'], opus, 'vp8')).toBe(false);
    expect(await needsTranscodeWithCapabilities(['/lib/clip.webm'], opus, 'av1')).toBe(false);
    // …and AV1 in mp4 (prod has 41 AV1 streams; none in an mp4 yet).
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, 'av1')).toBe(false);
    // Theora in ogg is NOT decodable on Chrome 150 (dropped in 123) → transcode.
    const vorbis = [{ index: 0, streamIndex: 1, language: '', label: 'Audio 1', default: true, codec: 'vorbis' }];
    expect(await needsTranscodeWithCapabilities(['/lib/clip.ogv'], vorbis, 'theora')).toBe(true);
  });

  it('leaves .mov on the transcode path — Chrome advertises no QuickTime support', async () => {
    // `.mov` used to avoid direct play only by accident (the bogus `video/mov`
    // MIME). With the real `video/quicktime` the answer is now the browser's own:
    // Chrome declines every codec under it, so behaviour is unchanged there, while
    // Safari — which genuinely plays QuickTime — would accept it.
    vi.stubGlobal('navigator', { mediaCapabilities: measuredBrowser() });
    vi.stubGlobal('document', measuredDocument());

    expect(await needsTranscodeWithCapabilities(['/lib/clip.mov'], aacDefault, 'h264')).toBe(true);
    expect(await needsTranscodeWithCapabilities(['/lib/clip.mov'], aacDefault, 'hevc')).toBe(true);
    expect(await needsTranscodeWithCapabilities(['/lib/clip.mov'], aacDefault, 'prores')).toBe(true);
  });

  it('still forces a transcode for undecodable audio regardless of the video codec', async () => {
    // Same measured browser: no E-AC-3 / AC-3 / DTS. The audio branch must still
    // veto direct play even though the video is plain H.264 — the video allowlist
    // must not weaken the audio probe.
    vi.stubGlobal('navigator', { mediaCapabilities: measuredBrowser() });
    vi.stubGlobal('document', measuredDocument());

    for (const codec of ['eac3', 'ec3', 'ac3', 'dts', 'dtshd', 'truehd', 'mp3']) {
      const tracks = [{ index: 0, streamIndex: 1, language: 'eng', label: 'English', default: true, codec }];
      expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], tracks, 'h264')).toBe(true);
      // …and in a `.m4v`, which must not regress now that its MIME is correct.
      expect(await needsTranscodeWithCapabilities(['/lib/movie.m4v'], tracks, 'h264')).toBe(true);
    }
    // …and the AAC files that share this code path stay direct-play.
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], aacDefault, 'h264')).toBe(false);
    // The DEFAULT track decides, not the first one.
    const eac3Default = [
      { index: 0, streamIndex: 1, language: 'eng', label: 'English', default: false, codec: 'aac' },
      { index: 1, streamIndex: 2, language: 'eng', label: 'Surround', default: true, codec: 'eac3' },
    ];
    expect(await needsTranscodeWithCapabilities(['/lib/movie.mp4'], eac3Default, 'h264')).toBe(true);
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
