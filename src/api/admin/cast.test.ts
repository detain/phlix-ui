/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, vi } from 'vitest';
import {
  AdminCastApi,
  type AirPlayDevice,
  type AirPlayPlaybackState,
  type CastDevice,
  type CastPlaybackState,
} from './cast';
import type { ApiClient } from '../client';

function makeClient(over: {
  get?: ReturnType<typeof vi.fn>;
  post?: ReturnType<typeof vi.fn>;
} = {}) {
  const get = over.get ?? vi.fn();
  const post = over.post ?? vi.fn(async () => ({ success: true }));
  const client = { get, post } as unknown as ApiClient;
  return { api: new AdminCastApi(client), get, post };
}

const castDevice: CastDevice = {
  device_id: 'cast-1',
  name: 'Living Room TV',
  host: '192.168.1.100',
  port: 8009,
  model: 'Chromecast Ultra',
  address: 'aa:bb:cc:dd:ee:ff',
};

const airplayDevice: AirPlayDevice = {
  device_id: 'airplay-1',
  name: 'Kitchen Speaker',
  host: '192.168.1.101',
  port: 7000,
  model: 'Apple TV 4K',
  address: 'aa:bb:cc:dd:ee:01',
};

describe('AdminCastApi — Chromecast', () => {
  it('lists Cast devices, unwrapping { devices }', async () => {
    const get = vi.fn().mockResolvedValue({ devices: [castDevice] });
    const { api } = makeClient({ get });
    const result = await api.listCastDevices();
    expect(get).toHaveBeenCalledWith('/api/v1/cast/devices');
    expect(result).toEqual([castDevice]);
  });

  it('accepts the { data } list shape', async () => {
    const get = vi.fn().mockResolvedValue({ data: [castDevice] });
    const { api } = makeClient({ get });
    expect(await api.listCastDevices()).toEqual([castDevice]);
  });

  it('degrades to [] when the Cast list payload is malformed', async () => {
    const get = vi.fn().mockResolvedValue({ devices: 'nope' });
    const { api } = makeClient({ get });
    expect(await api.listCastDevices()).toEqual([]);
  });

  it('normalises the flat Cast status (nested media_status)', async () => {
    const get = vi.fn().mockResolvedValue({
      device_id: 'cast-1',
      active: true,
      state: 'PLAYING',
      media_item_id: 'm1',
      volume_level: 0.75,
      muted: false,
      media_status: { media_title: 'My Movie', position_seconds: 1800, duration_seconds: 7200 },
    });
    const { api } = makeClient({ get });
    const result = await api.getCastStatus('cast-1');
    expect(get).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/status');
    const expected: CastPlaybackState = {
      device_id: 'cast-1',
      media_title: 'My Movie',
      media_item_id: 'm1',
      transport_state: 'PLAYING',
      volume_level: 0.75,
      muted: false,
      duration_seconds: 7200,
      position_seconds: 1800,
    };
    expect(result).toEqual(expected);
  });

  it('derives transport_state from the active flag and defaults safely', async () => {
    const get = vi.fn().mockResolvedValue({ active: true });
    const { api } = makeClient({ get });
    const result = await api.getCastStatus('cast-2');
    expect(result).toEqual({
      device_id: 'cast-2',
      media_title: '',
      media_item_id: null,
      transport_state: 'PLAYING',
      volume_level: 0,
      muted: false,
      position_seconds: 0,
      duration_seconds: 0,
    });
  });

  it('falls back to STOPPED when inactive and ignores a non-object media_status', async () => {
    const get = vi.fn().mockResolvedValue({ active: false, media_status: 'bad' });
    const { api } = makeClient({ get });
    const result = await api.getCastStatus('cast-3');
    expect(result.transport_state).toBe('STOPPED');
    expect(result.media_title).toBe('');
  });

  it('encodes the deviceId in the status URL', async () => {
    const get = vi.fn().mockResolvedValue({});
    const { api } = makeClient({ get });
    await api.getCastStatus('device with spaces');
    expect(get).toHaveBeenCalledWith('/api/v1/cast/devices/device%20with%20spaces/status');
  });

  it('plays a Cast device', async () => {
    const post = vi.fn(async () => ({ message: 'Playing' }));
    const { api } = makeClient({ post });
    const result = await api.castPlay('cast-1');
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/play');
    expect(result).toEqual({ success: true, message: 'Playing' });
  });

  it('pauses a Cast device', async () => {
    const post = vi.fn(async () => ({}));
    const { api } = makeClient({ post });
    const result = await api.castPause('cast-1');
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/pause');
    expect(result.success).toBe(true);
  });

  it('stops a Cast device', async () => {
    const post = vi.fn(async () => ({}));
    const { api } = makeClient({ post });
    await api.castStop('cast-1');
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/stop');
  });

  it('seeks with position_ms converted from seconds', async () => {
    const post = vi.fn(async () => ({}));
    const { api } = makeClient({ post });
    await api.castSeek('cast-1', 3600);
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/seek', { position_ms: 3600000 });
  });

  it('seeks to position 0', async () => {
    const post = vi.fn(async () => ({}));
    const { api } = makeClient({ post });
    await api.castSeek('cast-1', 0);
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/seek', { position_ms: 0 });
  });

  it('propagates a rejected list fetch', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const { api } = makeClient({ get });
    await expect(api.listCastDevices()).rejects.toThrow('boom');
  });
});

describe('AdminCastApi — AirPlay', () => {
  it('lists AirPlay devices, unwrapping { devices }', async () => {
    const get = vi.fn().mockResolvedValue({ devices: [airplayDevice] });
    const { api } = makeClient({ get });
    const result = await api.listAirPlayDevices();
    expect(get).toHaveBeenCalledWith('/api/v1/airplay/devices');
    expect(result).toEqual([airplayDevice]);
  });

  it('accepts the { data } list shape and defaults to []', async () => {
    const { api: a1 } = makeClient({ get: vi.fn().mockResolvedValue({ data: [airplayDevice] }) });
    expect(await a1.listAirPlayDevices()).toEqual([airplayDevice]);
    const { api: a2 } = makeClient({ get: vi.fn().mockResolvedValue({}) });
    expect(await a2.listAirPlayDevices()).toEqual([]);
  });

  it('normalises the flat AirPlay status (no position/duration)', async () => {
    const get = vi.fn().mockResolvedValue({
      device_id: 'airplay-1',
      media_title: 'My Podcast',
      media_item_id: 'p1',
      state: 'PLAYING',
      volume_level: 0.5,
      muted: false,
    });
    const { api } = makeClient({ get });
    const result = await api.getAirPlayStatus('airplay-1');
    expect(get).toHaveBeenCalledWith('/api/v1/airplay/devices/airplay-1/status');
    const expected: AirPlayPlaybackState = {
      device_id: 'airplay-1',
      media_title: 'My Podcast',
      media_item_id: 'p1',
      transport_state: 'PLAYING',
      volume_level: 0.5,
      muted: false,
    };
    expect(result).toEqual(expected);
  });

  it('derives AirPlay transport from active flag + encodes the id', async () => {
    const get = vi.fn().mockResolvedValue({ active: true });
    const { api } = makeClient({ get });
    const result = await api.getAirPlayStatus('device with spaces');
    expect(get).toHaveBeenCalledWith('/api/v1/airplay/devices/device%20with%20spaces/status');
    expect(result.transport_state).toBe('PLAYING');
    expect(result.media_item_id).toBe(null);
  });

  it('resumes AirPlay via /resume (server has no /play)', async () => {
    const post = vi.fn(async () => ({ message: 'Playing' }));
    const { api } = makeClient({ post });
    const result = await api.airPlayPlay('airplay-1');
    expect(post).toHaveBeenCalledWith('/api/v1/airplay/devices/airplay-1/resume');
    expect(result).toEqual({ success: true, message: 'Playing' });
  });

  it('pauses AirPlay', async () => {
    const post = vi.fn(async () => ({}));
    const { api } = makeClient({ post });
    await api.airPlayPause('airplay-1');
    expect(post).toHaveBeenCalledWith('/api/v1/airplay/devices/airplay-1/pause');
  });

  it('stops AirPlay', async () => {
    const post = vi.fn(async () => ({}));
    const { api } = makeClient({ post });
    const result = await api.airPlayStop('airplay-1');
    expect(post).toHaveBeenCalledWith('/api/v1/airplay/devices/airplay-1/stop');
    expect(result.success).toBe(true);
  });

  it('propagates a rejected AirPlay fetch', async () => {
    const get = vi.fn().mockRejectedValue(new Error('net'));
    const { api } = makeClient({ get });
    await expect(api.listAirPlayDevices()).rejects.toThrow('net');
  });
});
