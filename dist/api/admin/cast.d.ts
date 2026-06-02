import type { ApiClient } from '../client';
/**
 * AdminCastApi (RA.8) — typed wrapper over the Chromecast + AirPlay device
 * management endpoints (`/api/v1/cast/*` and `/api/v1/airplay/*`), consolidating
 * the deleted React `CastApi` + `AirPlayApi` into one class. Every method is a
 * 1:1 port: same endpoint paths, verbs and request bodies, with the server↔SPA
 * normalisers carried over (the server returns flat `{ devices, count }` /
 * flat status objects, NOT `{ success, data }`), `Array.isArray` guards on
 * device lists, and `encodeURIComponent` on every device-id path segment.
 *
 * Capabilities differ by transport:
 *   - Chromecast: play, pause, seek, stop
 *   - AirPlay:    play (resume), pause, stop  (NO seek)
 */
/** A discovered Chromecast device. */
export interface CastDevice {
    device_id: string;
    name: string;
    host: string;
    port: number;
    model: string;
    address: string;
}
/** Current playback state on a Cast device. */
export interface CastPlaybackState {
    device_id: string;
    media_title: string;
    media_item_id: string | null;
    transport_state: string;
    volume_level: number;
    muted: boolean;
    duration_seconds: number | null;
    position_seconds: number | null;
}
/** A discovered AirPlay device. */
export interface AirPlayDevice {
    device_id: string;
    name: string;
    host: string;
    port: number;
    model: string;
    address: string;
}
/** Current playback state on an AirPlay device (no seek/position). */
export interface AirPlayPlaybackState {
    device_id: string;
    media_title: string;
    media_item_id: string | null;
    transport_state: string;
    volume_level: number;
    muted: boolean;
}
/** Result of a transport action (play/pause/seek/stop). */
export interface CastActionResult {
    success: boolean;
    message?: string;
}
/**
 * AdminCastApi — consolidated Chromecast + AirPlay device client.
 */
export declare class AdminCastApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/cast/devices` → accepts `{ devices }` or `{ data }`, defaults `[]`. */
    listCastDevices(): Promise<CastDevice[]>;
    /** `GET /api/v1/cast/devices/:id/status` → normalised {@link CastPlaybackState}. */
    getCastStatus(deviceId: string): Promise<CastPlaybackState>;
    /** `POST /api/v1/cast/devices/:id/play` → normalised `{ success: true, … }`. */
    castPlay(deviceId: string): Promise<CastActionResult>;
    /** `POST /api/v1/cast/devices/:id/pause` → normalised `{ success: true, … }`. */
    castPause(deviceId: string): Promise<CastActionResult>;
    /** `POST /api/v1/cast/devices/:id/stop` → normalised `{ success: true, … }`. */
    castStop(deviceId: string): Promise<CastActionResult>;
    /**
     * `POST /api/v1/cast/devices/:id/seek`. The server expects `position_ms`
     * (ChromecastController::seek), so convert from seconds.
     */
    castSeek(deviceId: string, positionSeconds: number): Promise<CastActionResult>;
    /** `GET /api/v1/airplay/devices` → accepts `{ devices }` or `{ data }`, defaults `[]`. */
    listAirPlayDevices(): Promise<AirPlayDevice[]>;
    /** `GET /api/v1/airplay/devices/:id/status` → normalised {@link AirPlayPlaybackState}. */
    getAirPlayStatus(deviceId: string): Promise<AirPlayPlaybackState>;
    /**
     * Resume playback. The server has no `/play` route — AirPlay uses `/resume`
     * for an active stream. The client throws on non-2xx, so normalise to success.
     */
    airPlayPlay(deviceId: string): Promise<CastActionResult>;
    /** `POST /api/v1/airplay/devices/:id/pause` → normalised `{ success: true, … }`. */
    airPlayPause(deviceId: string): Promise<CastActionResult>;
    /** `POST /api/v1/airplay/devices/:id/stop` → normalised `{ success: true, … }`. */
    airPlayStop(deviceId: string): Promise<CastActionResult>;
}
