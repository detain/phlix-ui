import { describe, it, expect, vi } from 'vitest';
import { AdminDlnaServerApi, type DlnaServerStatus } from './dlnaServer';
import type { ApiClient } from '../client';

function clientWith(over: { get?: ReturnType<typeof vi.fn>; post?: ReturnType<typeof vi.fn> }): ApiClient {
  return { get: over.get ?? vi.fn(), post: over.post ?? vi.fn() } as unknown as ApiClient;
}

const runningStatus: DlnaServerStatus = {
  enabled: true,
  running: true,
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

    it('normalises a not-configured status, keeping the message', async () => {
      const get = vi.fn().mockResolvedValue({
        enabled: false,
        running: false,
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
      expect(res.serverId).toBeNull();
      expect(res.friendlyName).toBeNull();
      expect(res.port).toBeNull();
      expect(res.baseUrl).toBeNull();
      expect(res.message).toBe('DLNA server not configured');
    });

    it('degrades a malformed payload to a safe typed shape (no message key)', async () => {
      const get = vi.fn().mockResolvedValue({});
      const api = new AdminDlnaServerApi(clientWith({ get }));
      const res = await api.getStatus();
      expect(res).toEqual({
        enabled: false,
        running: false,
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

    it('degrades a malformed start payload to { success: false }', async () => {
      const post = vi.fn().mockResolvedValue({});
      const api = new AdminDlnaServerApi(clientWith({ post }));
      const res = await api.start();
      expect(res).toEqual({ success: false });
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
