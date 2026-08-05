/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import {
  AdminUpdatesApi,
  ADMIN_UPDATES_STATUS_ENDPOINT,
  parseCoreUpdateStatus,
} from './updates';
import type { ApiClient } from '../client';

/**
 * The EXACT `{success, data}` payload phlix-server's
 * `src/Server/Updates/CoreUpdateStatus.php::toArray()` (:64-75) emits, wrapped by
 * `AdminUpdatesController::status()` (:85-88). Transcribed key-for-key from that
 * source, not paraphrased — if either back end renames a key this fixture is the
 * thing that stops being true.
 */
function serverEnvelope(overrides: Record<string, unknown> = {}): unknown {
  return {
    success: true,
    data: {
      currentVersion: '1.2.2',
      latestVersion: '1.3.0',
      updateAvailable: true,
      checkEnabled: true,
      lastCheckedAt: 1770000000,
      lastError: null,
      updateCommand: 'curl -sSL https://phlix.tv/install.sh | sudo bash -s -- --update',
      ...overrides,
    },
  };
}

/**
 * The EXACT payload phlix-hub's `src/Hub/Updates/CoreUpdateStatus.php::toArray()`
 * (:63-74) emits via `AdminUpdatesController::status()` (:78-81). Same seven keys
 * — that byte-compatibility is the premise of a single shared banner.
 */
function hubEnvelope(overrides: Record<string, unknown> = {}): unknown {
  return {
    success: true,
    data: {
      currentVersion: '0.5.0',
      latestVersion: '0.6.0',
      updateAvailable: true,
      checkEnabled: true,
      lastCheckedAt: 1770000001,
      lastError: null,
      updateCommand: 'curl -sSL https://phlix.tv/hub-install.sh | sudo bash -s -- --update',
      ...overrides,
    },
  };
}

describe('parseCoreUpdateStatus — the ONE parser for both services', () => {
  it('parses the phlix-server payload field-for-field', () => {
    expect(parseCoreUpdateStatus(serverEnvelope())).toEqual({
      currentVersion: '1.2.2',
      latestVersion: '1.3.0',
      updateAvailable: true,
      checkEnabled: true,
      lastCheckedAt: 1770000000,
      lastError: null,
      updateCommand: 'curl -sSL https://phlix.tv/install.sh | sudo bash -s -- --update',
    });
  });

  it('parses the phlix-hub payload field-for-field with the same parser', () => {
    expect(parseCoreUpdateStatus(hubEnvelope())).toEqual({
      currentVersion: '0.5.0',
      latestVersion: '0.6.0',
      updateAvailable: true,
      checkEnabled: true,
      lastCheckedAt: 1770000001,
      lastError: null,
      updateCommand: 'curl -sSL https://phlix.tv/hub-install.sh | sudo bash -s -- --update',
    });
  });

  it('accepts a bare DTO (no {success,data} envelope) as well', () => {
    const bare = {
      currentVersion: '1.0.0',
      latestVersion: null,
      updateAvailable: false,
      checkEnabled: true,
      lastCheckedAt: null,
      lastError: null,
      updateCommand: 'x',
    };
    expect(parseCoreUpdateStatus(bare).currentVersion).toBe('1.0.0');
  });

  describe('updateAvailable is STRICTLY the boolean true', () => {
    // The garbage values below are chosen so none of them can pass by accident:
    // `'true'` is the string SUPERSTRING-adjacent case (a `Boolean(x)` or an
    // `x == true` implementation would accept it), and `'false'`/`'no-update'`
    // are truthy strings that a naive truthiness check would also accept —
    // `'no-update'` in particular CONTAINS neither a real value nor a negation a
    // substring test could latch onto, while `'not-available'` contains
    // `available`. All must read as false.
    it.each([
      ['the string "true"', 'true'],
      ['the string "false"', 'false'],
      ['the string "not-available"', 'not-available'],
      ['the number 1', 1],
      ['the number 0', 0],
      ['null', null],
      ['undefined', undefined],
      ['an empty object', {}],
    ])('reads %s as NOT an available update', (_label, value) => {
      expect(parseCoreUpdateStatus(serverEnvelope({ updateAvailable: value })).updateAvailable).toBe(
        false,
      );
    });

    it('reads the real boolean true as an available update', () => {
      expect(parseCoreUpdateStatus(serverEnvelope({ updateAvailable: true })).updateAvailable).toBe(
        true,
      );
    });

    it('reads the real boolean false as no available update', () => {
      expect(parseCoreUpdateStatus(serverEnvelope({ updateAvailable: false })).updateAvailable).toBe(
        false,
      );
    });
  });

  describe('checkEnabled defaults TRUE and only an explicit boolean false disables', () => {
    it('is false only for the real boolean false', () => {
      expect(parseCoreUpdateStatus(serverEnvelope({ checkEnabled: false })).checkEnabled).toBe(false);
    });

    it.each([
      ['the string "false"', 'false'],
      ['the number 0', 0],
      ['null', null],
      ['undefined', undefined],
    ])('stays enabled for %s — an unknown value must not silence the warning', (_label, value) => {
      expect(parseCoreUpdateStatus(serverEnvelope({ checkEnabled: value })).checkEnabled).toBe(true);
    });
  });

  it('normalises a blank latestVersion / lastError to null, not an empty string', () => {
    const parsed = parseCoreUpdateStatus(serverEnvelope({ latestVersion: '   ', lastError: '' }));
    expect(parsed.latestVersion).toBeNull();
    expect(parsed.lastError).toBeNull();
  });

  it('keeps a real lastError string', () => {
    expect(parseCoreUpdateStatus(serverEnvelope({ lastError: 'DNS failure' })).lastError).toBe(
      'DNS failure',
    );
  });

  it('parses a numeric-string lastCheckedAt and rejects a non-numeric one', () => {
    expect(parseCoreUpdateStatus(serverEnvelope({ lastCheckedAt: '1770000000' })).lastCheckedAt).toBe(
      1770000000,
    );
    expect(parseCoreUpdateStatus(serverEnvelope({ lastCheckedAt: 'soon' })).lastCheckedAt).toBeNull();
  });

  it('degrades a completely malformed payload to a safe no-update status', () => {
    expect(parseCoreUpdateStatus('nonsense')).toEqual({
      currentVersion: '',
      latestVersion: null,
      updateAvailable: false,
      checkEnabled: true,
      lastCheckedAt: null,
      lastError: null,
      updateCommand: '',
    });
  });
});

describe('AdminUpdatesApi', () => {
  it('GETs the shared status path — the SAME path on both services', async () => {
    const get = vi.fn().mockResolvedValue(serverEnvelope());
    const api = new AdminUpdatesApi({ get } as unknown as ApiClient);

    await api.getStatus();

    expect(get).toHaveBeenCalledWith('/api/v1/admin/updates/status', undefined, undefined);
    // Pinned as a literal above AND against the exported constant, so renaming
    // the constant cannot quietly move the endpoint.
    expect(ADMIN_UPDATES_STATUS_ENDPOINT).toBe('/api/v1/admin/updates/status');
  });

  it('forwards an abort signal', async () => {
    const get = vi.fn().mockResolvedValue(serverEnvelope());
    const api = new AdminUpdatesApi({ get } as unknown as ApiClient);
    const controller = new AbortController();

    await api.getStatus(controller.signal);

    expect(get).toHaveBeenCalledWith(
      '/api/v1/admin/updates/status',
      undefined,
      controller.signal,
    );
  });

  it('returns the parsed status, not the raw envelope', async () => {
    const get = vi.fn().mockResolvedValue(hubEnvelope());
    const api = new AdminUpdatesApi({ get } as unknown as ApiClient);

    const status = await api.getStatus();

    expect(status.currentVersion).toBe('0.5.0');
    expect(status).not.toHaveProperty('success');
  });

  it('propagates a rejection rather than swallowing it', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const api = new AdminUpdatesApi({ get } as unknown as ApiClient);

    await expect(api.getStatus()).rejects.toThrow('boom');
  });
});
