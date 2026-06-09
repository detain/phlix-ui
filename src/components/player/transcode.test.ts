import { describe, it, expect } from 'vitest';
import {
  transcodeStartPath,
  transcodeStatusPath,
  parseTranscodeStart,
  parseTranscodeStatus,
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
    it('defaults the profile to web', () => {
      expect(transcodeStartPath('m1')).toBe('/api/v1/media/m1/transcode?profile=web');
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
