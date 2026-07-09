/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

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

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}
function asNumber(v: unknown): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : 0;
}

/**
 * Map the Chromecast server's flat status object to {@link CastPlaybackState}.
 * `state` (or the `active` flag) drives `transport_state`; media metadata is read
 * from the nested `media_status` when present. All fields default safely.
 */
function normalizeCastStatus(res: Record<string, unknown>, deviceId: string): CastPlaybackState {
  const ms =
    typeof res['media_status'] === 'object' && res['media_status'] !== null
      ? (res['media_status'] as Record<string, unknown>)
      : {};
  const transport =
    asString(res['transport_state'] ?? res['state']) || (res['active'] === true ? 'PLAYING' : 'STOPPED');
  return {
    device_id: asString(res['device_id']) || deviceId,
    media_title: asString(res['media_title'] ?? ms['media_title'] ?? ms['title']),
    media_item_id: typeof res['media_item_id'] === 'string' ? res['media_item_id'] : null,
    transport_state: transport,
    volume_level: asNumber(res['volume_level'] ?? ms['volume_level']),
    muted: res['muted'] === true,
    position_seconds: asNumber(res['position_seconds'] ?? ms['position_seconds'] ?? ms['current_time']),
    duration_seconds: asNumber(res['duration_seconds'] ?? ms['duration_seconds'] ?? ms['duration']),
  };
}

/**
 * Map the AirPlay server's flat status object to {@link AirPlayPlaybackState}.
 */
function normalizeAirPlayStatus(res: Record<string, unknown>, deviceId: string): AirPlayPlaybackState {
  return {
    device_id: asString(res['device_id']) || deviceId,
    media_title: asString(res['media_title']),
    media_item_id: typeof res['media_item_id'] === 'string' ? res['media_item_id'] : null,
    transport_state:
      asString(res['transport_state'] ?? res['state']) || (res['active'] === true ? 'PLAYING' : 'STOPPED'),
    volume_level: asNumber(res['volume_level']),
    muted: res['muted'] === true,
  };
}

/**
 * AdminCastApi — consolidated Chromecast + AirPlay device client.
 */
export class AdminCastApi {
  constructor(private readonly client: ApiClient) {}

  // ── Chromecast ─────────────────────────────────────────────────────────────

  /** `GET /api/v1/cast/devices` → accepts `{ devices }` or `{ data }`, defaults `[]`. */
  async listCastDevices(): Promise<CastDevice[]> {
    const res = await this.client.get<{ devices?: CastDevice[]; data?: CastDevice[] }>(
      '/api/v1/cast/devices',
    );
    const list = res.devices ?? res.data;
    return Array.isArray(list) ? list : [];
  }

  /** `GET /api/v1/cast/devices/:id/status` → normalised {@link CastPlaybackState}. */
  async getCastStatus(deviceId: string): Promise<CastPlaybackState> {
    const res = await this.client.get<Record<string, unknown>>(
      `/api/v1/cast/devices/${encodeURIComponent(deviceId)}/status`,
    );
    return normalizeCastStatus(res, deviceId);
  }

  /** `POST /api/v1/cast/devices/:id/play` → normalised `{ success: true, … }`. */
  async castPlay(deviceId: string): Promise<CastActionResult> {
    const res = await this.client.post<Partial<CastActionResult>>(
      `/api/v1/cast/devices/${encodeURIComponent(deviceId)}/play`,
    );
    return { success: true, ...res };
  }

  /** `POST /api/v1/cast/devices/:id/pause` → normalised `{ success: true, … }`. */
  async castPause(deviceId: string): Promise<CastActionResult> {
    const res = await this.client.post<Partial<CastActionResult>>(
      `/api/v1/cast/devices/${encodeURIComponent(deviceId)}/pause`,
    );
    return { success: true, ...res };
  }

  /** `POST /api/v1/cast/devices/:id/stop` → normalised `{ success: true, … }`. */
  async castStop(deviceId: string): Promise<CastActionResult> {
    const res = await this.client.post<Partial<CastActionResult>>(
      `/api/v1/cast/devices/${encodeURIComponent(deviceId)}/stop`,
    );
    return { success: true, ...res };
  }

  /**
   * `POST /api/v1/cast/devices/:id/seek`. The server expects `position_ms`
   * (ChromecastController::seek), so convert from seconds.
   */
  async castSeek(deviceId: string, positionSeconds: number): Promise<CastActionResult> {
    const res = await this.client.post<Partial<CastActionResult>>(
      `/api/v1/cast/devices/${encodeURIComponent(deviceId)}/seek`,
      { position_ms: Math.round(positionSeconds * 1000) },
    );
    return { success: true, ...res };
  }

  // ── AirPlay ──────────────────────────────────────────────────────────────────

  /** `GET /api/v1/airplay/devices` → accepts `{ devices }` or `{ data }`, defaults `[]`. */
  async listAirPlayDevices(): Promise<AirPlayDevice[]> {
    const res = await this.client.get<{ devices?: AirPlayDevice[]; data?: AirPlayDevice[] }>(
      '/api/v1/airplay/devices',
    );
    const list = res.devices ?? res.data;
    return Array.isArray(list) ? list : [];
  }

  /** `GET /api/v1/airplay/devices/:id/status` → normalised {@link AirPlayPlaybackState}. */
  async getAirPlayStatus(deviceId: string): Promise<AirPlayPlaybackState> {
    const res = await this.client.get<Record<string, unknown>>(
      `/api/v1/airplay/devices/${encodeURIComponent(deviceId)}/status`,
    );
    return normalizeAirPlayStatus(res, deviceId);
  }

  /**
   * Resume playback. The server has no `/play` route — AirPlay uses `/resume`
   * for an active stream. The client throws on non-2xx, so normalise to success.
   */
  async airPlayPlay(deviceId: string): Promise<CastActionResult> {
    const res = await this.client.post<Partial<CastActionResult>>(
      `/api/v1/airplay/devices/${encodeURIComponent(deviceId)}/resume`,
    );
    return { success: true, ...res };
  }

  /** `POST /api/v1/airplay/devices/:id/pause` → normalised `{ success: true, … }`. */
  async airPlayPause(deviceId: string): Promise<CastActionResult> {
    const res = await this.client.post<Partial<CastActionResult>>(
      `/api/v1/airplay/devices/${encodeURIComponent(deviceId)}/pause`,
    );
    return { success: true, ...res };
  }

  /** `POST /api/v1/airplay/devices/:id/stop` → normalised `{ success: true, … }`. */
  async airPlayStop(deviceId: string): Promise<CastActionResult> {
    const res = await this.client.post<Partial<CastActionResult>>(
      `/api/v1/airplay/devices/${encodeURIComponent(deviceId)}/stop`,
    );
    return { success: true, ...res };
  }
}
