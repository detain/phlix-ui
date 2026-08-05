/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminDlnaServerApi, type DlnaServerStatus } from './dlnaServer';
import type { ApiClient } from '../client';

function clientWith(over: { get?: ReturnType<typeof vi.fn>; post?: ReturnType<typeof vi.fn> }): ApiClient {
  return { get: over.get ?? vi.fn(), post: over.post ?? vi.fn() } as unknown as ApiClient;
}

const runningStatus: DlnaServerStatus = {
  enabled: true,
  running: true,
  reloadPending: false,
  serverId: 'uuid:phlix-server-main',
  friendlyName: 'Phlix Media Server',
  port: 8200,
  baseUrl: '192.168.1.100',
};

describe('AdminDlnaServerApi', () => {
  describe('getStatus()', () => {
    it('GETs /api/v1/admin/dlna/status and normalises a running status', async () => {
      const get = vi.fn().mockResolvedValue(runningStatus);
      const api = new AdminDlnaServerApi(clientWith({ get }));
      const res = await api.getStatus();
      expect(get).toHaveBeenCalledWith('/api/v1/admin/dlna/status');
      expect(res).toEqual(runningStatus);
    });

    it('normalises a stopped status', async () => {
      const get = vi.fn().mockResolvedValue({ ...runningStatus, running: false });
      const api = new AdminDlnaServerApi(clientWith({ get }));
      const res = await api.getStatus();
      expect(res.enabled).toBe(true);
      expect(res.running).toBe(false);
    });

    it('normalises a stopped (cds_enabled=false) status, keeping the message', async () => {
      // S214/S28: `enabled: false` is the STOCK INSTALL — a stopped server, not
      // an unconfigured one. The payload has no "configured" field at all.
      const get = vi.fn().mockResolvedValue({
        enabled: false,
        running: false,
        reloadPending: false,
        serverId: null,
        friendlyName: null,
        port: null,
        baseUrl: null,
        message: 'DLNA server not configured',
      });
      const api = new AdminDlnaServerApi(clientWith({ get }));
      const res = await api.getStatus();
      expect(res.enabled).toBe(false);
      expect(res.running).toBe(false);
      expect(res.reloadPending).toBe(false);
      expect(res.serverId).toBeNull();
      expect(res.friendlyName).toBeNull();
      expect(res.port).toBeNull();
      expect(res.baseUrl).toBeNull();
      expect(res.message).toBe('DLNA server not configured');
    });

    it('keeps the server-computed reloadPending VERBATIM instead of recomputing it (S214)', async () => {
      // The decisive case: enabled === running, so a client-side
      // `enabled !== running` would answer false. Only reading the field the
      // server actually sent can produce true here.
      const get = vi.fn().mockResolvedValue({ ...runningStatus, reloadPending: true });
      const api = new AdminDlnaServerApi(clientWith({ get }));
      const res = await api.getStatus();
      expect(res.enabled).toBe(true);
      expect(res.running).toBe(true);
      expect(res.reloadPending).toBe(true);
    });

    it('defaults reloadPending to false when an older server omits it', async () => {
      const { reloadPending: _dropped, ...withoutField } = runningStatus;
      const get = vi.fn().mockResolvedValue(withoutField);
      const api = new AdminDlnaServerApi(clientWith({ get }));
      expect((await api.getStatus()).reloadPending).toBe(false);
    });

    it('degrades a malformed payload to a safe typed shape (no message key)', async () => {
      const get = vi.fn().mockResolvedValue({});
      const api = new AdminDlnaServerApi(clientWith({ get }));
      const res = await api.getStatus();
      expect(res).toEqual({
        enabled: false,
        running: false,
        reloadPending: false,
        serverId: null,
        friendlyName: null,
        port: null,
        baseUrl: null,
      });
      expect('message' in res).toBe(false);
    });

    it('coerces wrong-typed fields to their safe defaults', async () => {
      const get = vi.fn().mockResolvedValue({
        enabled: 'yes',
        running: 1,
        reloadPending: 'maybe',
        serverId: 42,
        friendlyName: false,
        port: '8200',
        baseUrl: null,
        message: 99,
      });
      const api = new AdminDlnaServerApi(clientWith({ get }));
      const res = await api.getStatus();
      expect(res).toEqual({
        enabled: false,
        running: false,
        reloadPending: false,
        serverId: null,
        friendlyName: null,
        port: null,
        baseUrl: null,
      });
    });
  });

  describe('start()', () => {
    it('POSTs /api/v1/admin/dlna/start and normalises success', async () => {
      const post = vi.fn().mockResolvedValue({ success: true });
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.start();
      expect(post).toHaveBeenCalledWith('/api/v1/admin/dlna/start');
      expect(res).toEqual({ success: true });
    });

    it('keeps a failure message from start', async () => {
      const post = vi.fn().mockResolvedValue({ success: false, message: 'already running' });
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.start();
      expect(res).toEqual({ success: false, message: 'already running' });
    });

    it('keeps the success message + reloadScheduled + enabled the server sent (S214)', async () => {
      // The real 200 body from AdminDlnaServerController::applyEnabled(). All
      // three fields used to be dropped, so the page could only ever say
      // "DLNA server started." — including when nothing had been applied.
      const post = vi.fn().mockResolvedValue({
        success: true,
        enabled: true,
        reloadScheduled: false,
        message: 'DLNA content directory enabled; restart the server to apply it (automatic reload unavailable).',
      });
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.start();
      expect(res).toEqual({
        success: true,
        enabled: true,
        reloadScheduled: false,
        message: 'DLNA content directory enabled; restart the server to apply it (automatic reload unavailable).',
      });
    });

    it('degrades a malformed start payload to { success: false }', async () => {
      const post = vi.fn().mockResolvedValue({});
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.start();
      expect(res).toEqual({ success: false });
    });

    it('drops wrong-typed enabled/reloadScheduled rather than coercing them', async () => {
      // "absent" must stay distinguishable from "the server said false".
      const post = vi.fn().mockResolvedValue({ success: true, enabled: 'yes', reloadScheduled: 1 });
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.start();
      expect(res).toEqual({ success: true });
    });
  });

  describe('stop()', () => {
    it('POSTs /api/v1/admin/dlna/stop and normalises success', async () => {
      const post = vi.fn().mockResolvedValue({ success: true });
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.stop();
      expect(post).toHaveBeenCalledWith('/api/v1/admin/dlna/stop');
      expect(res).toEqual({ success: true });
    });

    it('keeps a failure message from stop', async () => {
      const post = vi.fn().mockResolvedValue({ success: false, message: 'not running' });
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.stop();
      expect(res).toEqual({ success: false, message: 'not running' });
    });

    it('keeps the success message + reloadScheduled the server sent (S214)', async () => {
      const post = vi.fn().mockResolvedValue({
        success: true,
        enabled: false,
        reloadScheduled: true,
        message: 'DLNA content directory disabled; workers are reloading to apply it.',
      });
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.stop();
      expect(res).toEqual({
        success: true,
        enabled: false,
        reloadScheduled: true,
        message: 'DLNA content directory disabled; workers are reloading to apply it.',
      });
    });

    it('degrades a malformed stop payload to { success: false }', async () => {
      const post = vi.fn().mockResolvedValue({});
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.stop();
      expect(res).toEqual({ success: false });
    });
  });

  it('propagates rejections from getStatus', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const api = new AdminDlnaServerApi(clientWith({ get }));
    await expect(api.getStatus()).rejects.toThrow('boom');
  });
});
