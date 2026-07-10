/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
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
export declare class AdminTranscodingApi {
    private readonly client;
    constructor(client: ApiClient);
    /**
     * `GET /api/v1/admin/transcoding/accelerators` → unwraps `{ data }`.
     */
    getAccelerators(): Promise<AcceleratorsResponse>;
    /**
     * `PUT /api/v1/admin/transcoding/accelerators` → `{ success, message }`.
     */
    setPreferredAccelerator(name: string): Promise<void>;
    /**
     * `GET /api/v1/admin/transcoding/tone-mapping` → unwraps `{ data }`.
     */
    getToneMapping(): Promise<ToneMappingSettings>;
    /**
     * `PUT /api/v1/admin/transcoding/tone-mapping` → `{ success, message }`.
     */
    setToneMapping(settings: ToneMappingSettings): Promise<void>;
}
