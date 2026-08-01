/**
 * AdminTranscodingApi tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import { AdminTranscodingApi } from './transcoding';
import { ApiClient } from '../client';
import { MemoryTokenStore, makeFetch } from '../test/memoryTokenStore';

describe('AdminTranscodingApi', () => {
  function makeTestClient(fetchImpl: typeof fetch): AdminTranscodingApi {
    const client = new ApiClient({
      baseUrl: 'https://hub.example.com',
      tokenStore: new MemoryTokenStore({ access: 'tok-1' }),
      fetchImpl,
    });
    return new AdminTranscodingApi(client);
  }

  describe('getAccelerators', () => {
    it('GETs /api/v1/admin/transcoding/accelerators and returns AcceleratorsResponse', async () => {
      const { fetch, calls } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: {
              accelerators: [
                { name: 'cuda', encoders: ['h264_nvenc', 'hevc_nvenc'], isHardware: true },
                { name: 'qsv', encoders: ['h264_qsv', 'hevc_qsv'], isHardware: true },
              ],
              ffmpegVersion: '6.0',
              preferredAccelerator: 'cuda',
            },
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const response = await api.getAccelerators();

      expect(calls[0]!.url).toBe('https://hub.example.com/api/v1/admin/transcoding/accelerators');
      expect(calls[0]!.init!.method).toBe('GET');
      expect(response.accelerators).toHaveLength(2);
      expect(response.accelerators[0]!.name).toBe('cuda');
      expect(response.accelerators[0]!.encoders).toContain('h264_nvenc');
      expect(response.ffmpegVersion).toBe('6.0');
      expect(response.preferredAccelerator).toBe('cuda');
    });

    it('handles null preferredAccelerator', async () => {
      const { fetch } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: {
              accelerators: [{ name: 'cpu', encoders: ['libx264'], isHardware: false }],
              ffmpegVersion: '5.0',
              preferredAccelerator: null,
            },
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const response = await api.getAccelerators();

      expect(response.preferredAccelerator).toBeNull();
    });

    it('handles missing accelerators array gracefully', async () => {
      const { fetch } = makeFetch([
        { status: 200, body: { success: true, data: { ffmpegVersion: '6.0' } } },
      ]);
      const api = makeTestClient(fetch);

      const response = await api.getAccelerators();

      expect(response.accelerators).toEqual([]);
      expect(response.ffmpegVersion).toBe('6.0');
    });

    it('handles non-array accelerators payload gracefully', async () => {
      const { fetch } = makeFetch([
        { status: 200, body: { success: true, data: { accelerators: 'not-an-array', ffmpegVersion: '6.0' } } },
      ]);
      const api = makeTestClient(fetch);

      const response = await api.getAccelerators();

      expect(response.accelerators).toEqual([]);
    });
  });

  describe('setPreferredAccelerator', () => {
    it('PUTs name to /api/v1/admin/transcoding/accelerators', async () => {
      const { fetch, calls } = makeFetch([{ status: 200, body: { success: true, message: 'Updated' } }]);
      const api = makeTestClient(fetch);

      await api.setPreferredAccelerator('cuda');

      expect(calls[0]!.url).toBe('https://hub.example.com/api/v1/admin/transcoding/accelerators');
      expect(calls[0]!.init!.method).toBe('PUT');
      expect(calls[0]!.init!.body).toBe(JSON.stringify({ name: 'cuda' }));
    });

    it('does not return anything (void)', async () => {
      const { fetch } = makeFetch([{ status: 200, body: { success: true, message: 'Done' } }]);
      const api = makeTestClient(fetch);

      const result = await api.setPreferredAccelerator('qsv');

      expect(result).toBeUndefined();
    });
  });

  describe('getToneMapping', () => {
    it('GETs /api/v1/admin/transcoding/tone-mapping and returns ToneMappingSettings', async () => {
      const { fetch, calls } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: {
              prefer_hdr_output: true,
              tone_map_mode: 'zscale',
            },
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const settings = await api.getToneMapping();

      expect(calls[0]!.url).toBe('https://hub.example.com/api/v1/admin/transcoding/tone-mapping');
      expect(calls[0]!.init!.method).toBe('GET');
      expect(settings.prefer_hdr_output).toBe(true);
      expect(settings.tone_map_mode).toBe('zscale');
    });

    it('handles tone_map_mode=libplacebo', async () => {
      const { fetch } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: {
              prefer_hdr_output: false,
              tone_map_mode: 'libplacebo',
            },
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const settings = await api.getToneMapping();

      expect(settings.tone_map_mode).toBe('libplacebo');
    });

    it('passes through invalid tone_map_mode without validation (no enum enforcement at runtime)', async () => {
      const { fetch } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: {
              prefer_hdr_output: false,
              tone_map_mode: 'invalid_mode',
            },
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const settings = await api.getToneMapping();

      // The implementation just casts, no runtime validation - invalid values pass through
      expect(settings.tone_map_mode).toBe('invalid_mode');
    });

    it('handles prefer_hdr_output as non-boolean truthy value', async () => {
      const { fetch } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: {
              prefer_hdr_output: 'yes' as unknown as boolean,
              tone_map_mode: 'none',
            },
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const settings = await api.getToneMapping();

      expect(settings.prefer_hdr_output).toBe(false); // only true is strictly true
    });

    it('defaults to prefer_hdr_output=false when missing', async () => {
      const { fetch } = makeFetch([
        { status: 200, body: { success: true, data: { tone_map_mode: 'none' } } },
      ]);
      const api = makeTestClient(fetch);

      const settings = await api.getToneMapping();

      expect(settings.prefer_hdr_output).toBe(false);
    });

    it('defaults to tone_map_mode=none when missing', async () => {
      const { fetch } = makeFetch([
        { status: 200, body: { success: true, data: { prefer_hdr_output: true } } },
      ]);
      const api = makeTestClient(fetch);

      const settings = await api.getToneMapping();

      expect(settings.tone_map_mode).toBe('none');
    });
  });

  describe('setToneMapping', () => {
    it('PUTs ToneMappingSettings to /api/v1/admin/transcoding/tone-mapping', async () => {
      const { fetch, calls } = makeFetch([{ status: 200, body: { success: true, message: 'Updated' } }]);
      const api = makeTestClient(fetch);

      await api.setToneMapping({ prefer_hdr_output: true, tone_map_mode: 'zscale' });

      expect(calls[0]!.url).toBe('https://hub.example.com/api/v1/admin/transcoding/tone-mapping');
      expect(calls[0]!.init!.method).toBe('PUT');
      expect(calls[0]!.init!.body).toBe(JSON.stringify({ prefer_hdr_output: true, tone_map_mode: 'zscale' }));
    });

    it('sends tone_map_mode=libplacebo correctly', async () => {
      const { fetch, calls } = makeFetch([{ status: 200, body: { success: true, message: 'Done' } }]);
      const api = makeTestClient(fetch);

      await api.setToneMapping({ prefer_hdr_output: false, tone_map_mode: 'libplacebo' });

      const body = JSON.parse(calls[0]!.init!.body as string);
      expect(body.tone_map_mode).toBe('libplacebo');
    });

    it('does not return anything (void)', async () => {
      const { fetch } = makeFetch([{ status: 200, body: { success: true, message: 'Done' } }]);
      const api = makeTestClient(fetch);

      const result = await api.setToneMapping({ prefer_hdr_output: true, tone_map_mode: 'none' });

      expect(result).toBeUndefined();
    });
  });
});
