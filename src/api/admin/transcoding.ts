/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import type { ApiClient } from '../client';

/**
 * A hardware accelerator as detected by the server's FFmpeg probe.
 */
export interface HardwareAccelerator {
  /** Display name, e.g. `cuda`, `qsv`, `videotoolbox`, `amf`. */
  name: string;
  /** Available encoder names for this accelerator, e.g. `['h264_nvenc', 'hevc_nvenc']`. */
  encoders: string[];
  /** True when this is a hardware accelerator; false = software / CPU-based. */
  isHardware: boolean;
}

/** Response shape from `GET /api/v1/admin/transcoding/accelerators`. */
export interface AcceleratorsResponse {
  accelerators: HardwareAccelerator[];
  ffmpegVersion: string;
  /** The currently preferred accelerator name, or `null` when none is set. */
  preferredAccelerator: string | null;
}

/** Body accepted by `PUT /api/v1/admin/transcoding/accelerators`. */
export interface SetPreferredAcceleratorInput {
  name: string;
}

/** Body accepted by `PUT /api/v1/admin/transcoding/tone-mapping`. */
export interface ToneMappingSettings {
  /** Whether to prefer HDR output when available. */
  prefer_hdr_output: boolean;
  /** Tone-mapping mode: `none`, `zscale`, or `libplacebo`. */
  tone_map_mode: 'none' | 'zscale' | 'libplacebo';
}

/**
 * AdminTranscodingApi (P6) — typed wrapper over the admin transcoding endpoints
 * (`/api/v1/admin/transcoding/*`), covering hardware accelerator detection and
 * HDR tone-mapping configuration.
 *
 * Contract (traced from P6-S1 / P6-S2):
 *  - `getAccelerators()` replies
 *    `{ success, data: { accelerators, ffmpegVersion, preferredAccelerator } }`
 *  - `setPreferredAccelerator()` posts `{ name }` and replies `{ success, message }`
 *  - `getToneMapping()` replies `{ success, data: ToneMappingSettings }`
 *  - `setToneMapping()` posts `ToneMappingSettings` and replies `{ success, message }`
 */
export class AdminTranscodingApi {
  constructor(private readonly client: ApiClient) {}

  /**
   * `GET /api/v1/admin/transcoding/accelerators` → unwraps `{ data }`.
   */
  async getAccelerators(): Promise<AcceleratorsResponse> {
    const response = await this.client.get<{
      success: boolean;
      data: Partial<AcceleratorsResponse>;
    }>('/api/v1/admin/transcoding/accelerators');
    return {
      accelerators: Array.isArray(response.data?.accelerators)
        ? response.data.accelerators
        : [],
      ffmpegVersion:
        typeof response.data?.ffmpegVersion === 'string'
          ? response.data.ffmpegVersion
          : '',
      preferredAccelerator:
        response.data?.preferredAccelerator ?? null,
    };
  }

  /**
   * `PUT /api/v1/admin/transcoding/accelerators` → `{ success, message }`.
   */
  async setPreferredAccelerator(name: string): Promise<void> {
    await this.client.put<{ success: boolean; message: string }>(
      '/api/v1/admin/transcoding/accelerators',
      { name },
    );
  }

  /**
   * `GET /api/v1/admin/transcoding/tone-mapping` → unwraps `{ data }`.
   */
  async getToneMapping(): Promise<ToneMappingSettings> {
    const response = await this.client.get<{
      success: boolean;
      data: Partial<ToneMappingSettings>;
    }>('/api/v1/admin/transcoding/tone-mapping');
    return {
      prefer_hdr_output:
        response.data?.prefer_hdr_output === true,
      tone_map_mode:
        (response.data?.tone_map_mode as ToneMappingSettings['tone_map_mode']) ?? 'none',
    };
  }

  /**
   * `PUT /api/v1/admin/transcoding/tone-mapping` → `{ success, message }`.
   */
  async setToneMapping(settings: ToneMappingSettings): Promise<void> {
    await this.client.put<{ success: boolean; message: string }>(
      '/api/v1/admin/transcoding/tone-mapping',
      settings,
    );
  }
}
