import { describe, it, expect } from 'vitest';
import {
  transcodeStartPath,
  transcodeStatusPath,
  parseTranscodeStart,
  parseTranscodeStatus,
  parseSubtitleTracks,
  isPlayable,
  isFailedStatus,
  resolveStreamUrl,
} from './transcode';

describe('transcode helpers', () => {
  describe('path builders', () => {
    it('builds the start path with an encoded id + profile', () => {
      expect(transcodeStartPath('a b/c', 'mobile-high')).toBe(
        '/api/v1/media/a%20b%2Fc/transcode?profile=mobile-high',
      );
    });
    it('omits the ?profile= query when no profile is given (server maps from device header)', () => {
      expect(transcodeStartPath('m1')).toBe('/api/v1/media/m1/transcode');
    });
    it('omits the ?profile= query for an empty-string profile', () => {
      expect(transcodeStartPath('m1', '')).toBe('/api/v1/media/m1/transcode');
    });
    it('includes the ?profile= query for an explicit profile (e.g. tv-4k)', () => {
      expect(transcodeStartPath('m1', 'tv-4k')).toBe('/api/v1/media/m1/transcode?profile=tv-4k');
    });
    it('builds the status path with an encoded job id', () => {
      expect(transcodeStatusPath('job 7')).toBe('/api/v1/transcode/job%207/status');
    });
  });

  describe('parseTranscodeStart', () => {
    it('reads snake_case server payloads', () => {
      const r = parseTranscodeStart({
        job_id: 'job-7',
        master_url: '/hls/job-7/master.m3u8',
        status: 'running',
        reused: false,
      });
      expect(r).toEqual({
        jobId: 'job-7',
        masterUrl: '/hls/job-7/master.m3u8',
        status: 'running',
        reused: false,
        subtitles: [],
      });
    });
    it('also accepts camelCase + hls_url fallback', () => {
      const r = parseTranscodeStart({ jobId: 'j', hlsUrl: '/hls/j/master.m3u8', reused: true });
      expect(r.jobId).toBe('j');
      expect(r.masterUrl).toBe('/hls/j/master.m3u8');
      expect(r.reused).toBe(true);
      expect(r.status).toBe('running'); // default
    });
    it('tolerates junk', () => {
      const r = parseTranscodeStart(null);
      expect(r.jobId).toBe('');
      expect(r.masterUrl).toBe('');
    });
  });

  describe('parseTranscodeStatus', () => {
    it('normalizes readiness fields', () => {
      const r = parseTranscodeStatus({
        job_id: 'j',
        status: 'running',
        playlist_ready: true,
        progress: 42,
        master_url: '/hls/j/master.m3u8',
      });
      expect(r).toEqual({
        jobId: 'j',
        status: 'running',
        playlistReady: true,
        progress: 42,
        masterUrl: '/hls/j/master.m3u8',
        subtitles: [],
      });
    });
    it('coerces a numeric-string progress', () => {
      expect(parseTranscodeStatus({ progress: '17' }).progress).toBe(17);
    });
  });

  describe('isPlayable', () => {
    it('is true once the playlist is ready', () => {
      expect(isPlayable(parseTranscodeStatus({ playlist_ready: true }))).toBe(true);
    });
    it('is true when completed even if the ready flag lags', () => {
      expect(isPlayable(parseTranscodeStatus({ status: 'completed', playlist_ready: false }))).toBe(true);
    });
    it('is false while still warming up', () => {
      expect(isPlayable(parseTranscodeStatus({ status: 'running', playlist_ready: false }))).toBe(false);
    });
  });

  describe('isFailedStatus', () => {
    it.each(['failed', 'cancelled', 'not_found', 'error'])('treats %s as terminal failure', (s) => {
      expect(isFailedStatus(s)).toBe(true);
    });
    it.each(['running', 'completed', ''])('does not fail on %s', (s) => {
      expect(isFailedStatus(s)).toBe(false);
    });
  });

  describe('parseSubtitleTracks', () => {
    it('reads the server subtitle shape ({index,language,label,default,url})', () => {
      const tracks = parseSubtitleTracks([
        { index: 0, language: 'eng', label: 'English 1', default: true, url: '/hls/j/sub-0.vtt' },
        { index: 1, language: 'jpn', label: 'Japanese', default: false, url: '/hls/j/sub-1.vtt' },
      ]);
      expect(tracks).toEqual([
        { index: 0, language: 'eng', label: 'English 1', default: true, url: '/hls/j/sub-0.vtt' },
        { index: 1, language: 'jpn', label: 'Japanese', default: false, url: '/hls/j/sub-1.vtt' },
      ]);
    });
    it('returns an empty list for a missing / non-array value', () => {
      expect(parseSubtitleTracks(undefined)).toEqual([]);
      expect(parseSubtitleTracks(null)).toEqual([]);
      expect(parseSubtitleTracks({})).toEqual([]);
      expect(parseSubtitleTracks('nope')).toEqual([]);
    });
    it('skips junk entries and tracks without a url', () => {
      const tracks = parseSubtitleTracks([null, 7, { index: 0, language: 'eng' }, { url: '/hls/j/sub-2.vtt' }]);
      expect(tracks).toEqual([{ index: 0, language: '', label: '', default: false, url: '/hls/j/sub-2.vtt' }]);
    });
    it('accepts camelCase / alternate field names + coerces a numeric-string index', () => {
      const tracks = parseSubtitleTracks([
        { index: '3', srclang: 'fre', label: 'French', isDefault: true, src: '/hls/j/sub-3.vtt' },
      ]);
      expect(tracks).toEqual([{ index: 3, language: 'fre', label: 'French', default: true, url: '/hls/j/sub-3.vtt' }]);
    });
  });

  describe('subtitles on the start/status responses', () => {
    it('parses the subtitles array from a start response', () => {
      const r = parseTranscodeStart({
        job_id: 'j',
        master_url: '/hls/j/master.m3u8',
        subtitles: [{ index: 0, language: 'eng', label: 'English', default: true, url: '/hls/j/sub-0.vtt' }],
      });
      expect(r.subtitles).toEqual([
        { index: 0, language: 'eng', label: 'English', default: true, url: '/hls/j/sub-0.vtt' },
      ]);
    });
    it('parses the subtitles array from a status response (snake_case alias)', () => {
      const r = parseTranscodeStatus({
        status: 'running',
        playlist_ready: true,
        subtitle_tracks: [{ index: 1, language: 'jpn', label: 'Japanese', default: false, url: '/hls/j/sub-1.vtt' }],
      });
      expect(r.subtitles).toEqual([
        { index: 1, language: 'jpn', label: 'Japanese', default: false, url: '/hls/j/sub-1.vtt' },
      ]);
    });
    it('defaults to an empty list when the server omits subtitles', () => {
      expect(parseTranscodeStart({ job_id: 'j', master_url: '/m' }).subtitles).toEqual([]);
      expect(parseTranscodeStatus({ status: 'running' }).subtitles).toEqual([]);
    });
  });

  describe('resolveStreamUrl', () => {
    it('joins base + relative without a double slash', () => {
      expect(resolveStreamUrl('http://h:8096/', '/hls/j/master.m3u8')).toBe('http://h:8096/hls/j/master.m3u8');
      expect(resolveStreamUrl('http://h:8096', 'hls/j/master.m3u8')).toBe('http://h:8096/hls/j/master.m3u8');
    });
    it('passes through an already-absolute url', () => {
      expect(resolveStreamUrl('http://h', 'https://cdn/x.m3u8')).toBe('https://cdn/x.m3u8');
    });
  });
});
