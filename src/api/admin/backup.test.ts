/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminBackupApi, type Backup, type ScheduleData } from './backup';
import type { ApiClient } from '../client';

/** A mock ApiClient whose verbs are vi.fn()s the test can assert on. */
function makeClient() {
  const get = vi.fn();
  const post = vi.fn();
  const put = vi.fn();
  const patch = vi.fn();
  const del = vi.fn();
  const client = { get, post, put, patch, delete: del } as unknown as ApiClient;
  return { api: new AdminBackupApi(client), get, post, put, patch, del };
}

const sampleBackup: Backup = {
  id: 'backup-1',
  label: 'Weekly Backup',
  file_path: '/backups/backup-1.tar.gz',
  size_bytes: 1048576,
  checksum_sha256: 'abc123',
  is_s3: false,
  created_at: '2026-05-27T00:00:00Z',
  expires_at: '2026-06-27T00:00:00Z',
};

const sampleSchedule: ScheduleData = {
  auto_backup_interval_days: 7,
  retention_count: 5,
  next_scheduled_backup: 1769459200,
  next_scheduled_backup_iso: '2026-05-28T00:00:00Z',
};

describe('AdminBackupApi — list', () => {
  it('GETs /api/v1/admin/backup/list and unwraps { data }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ success: true, data: [sampleBackup], count: 1 });
    const res = await api.list();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/backup/list');
    expect(res).toEqual([sampleBackup]);
  });

  it('returns [] when no backups exist', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ success: true, data: [], count: 0 });
    expect(await api.list()).toEqual([]);
  });

  it('degrades to [] when data is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ success: true });
    expect(await api.list()).toEqual([]);
  });
});

describe('AdminBackupApi — create', () => {
  it('POSTs /create with an optional label and parses { message, data }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({
      success: true,
      message: 'Backup created successfully',
      data: { backup_id: 'backup-2', file_path: '/backups/backup-2.tar.gz', size_bytes: 2097152 },
    });
    const res = await api.create({ label: 'My Backup' });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/backup/create', { label: 'My Backup' });
    expect(res).toEqual({
      message: 'Backup created successfully',
      backup_id: 'backup-2',
      file_path: '/backups/backup-2.tar.gz',
      size_bytes: 2097152,
    });
  });

  it('POSTs an empty body when no input is passed', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({
      success: true,
      message: 'Backup created',
      data: { backup_id: 'backup-3', file_path: '/backups/backup-3.tar.gz', size_bytes: 3145728 },
    });
    const res = await api.create();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/backup/create', {});
    expect(res).toEqual({
      message: 'Backup created',
      backup_id: 'backup-3',
      file_path: '/backups/backup-3.tar.gz',
      size_bytes: 3145728,
    });
  });
});

describe('AdminBackupApi — delete / restore / uploadToS3', () => {
  it('delete() DELETEs /api/v1/admin/backup/{id} (encoded)', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ message: 'Backup deleted successfully' });
    const res = await api.delete('backup 1');
    expect(del).toHaveBeenCalledWith('/api/v1/admin/backup/backup%201');
    expect(res).toEqual({ message: 'Backup deleted successfully' });
  });

  it('restore() POSTs /api/v1/admin/backup/{id}/restore (encoded)', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'Restore completed' });
    const res = await api.restore('backup/1');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/backup/backup%2F1/restore');
    expect(res).toEqual({ message: 'Restore completed' });
  });

  it('uploadToS3() POSTs /api/v1/admin/backup/{id}/upload-s3 (encoded)', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ message: 'Backup uploaded to S3' });
    const res = await api.uploadToS3('backup-1');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/backup/backup-1/upload-s3');
    expect(res).toEqual({ message: 'Backup uploaded to S3' });
  });
});

describe('AdminBackupApi — schedule', () => {
  it('getSchedule() GETs /schedule and unwraps { data }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ success: true, data: sampleSchedule });
    const res = await api.getSchedule();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/backup/schedule');
    expect(res).toEqual(sampleSchedule);
  });

  it('getSchedule() preserves null next-backup values', async () => {
    const { api, get } = makeClient();
    const scheduleNoNext: ScheduleData = {
      auto_backup_interval_days: 7,
      retention_count: 5,
      next_scheduled_backup: null,
      next_scheduled_backup_iso: null,
    };
    get.mockResolvedValue({ success: true, data: scheduleNoNext });
    const res = await api.getSchedule();
    expect(res.next_scheduled_backup).toBeNull();
    expect(res.next_scheduled_backup_iso).toBeNull();
  });

  it('updateSchedule() PUTs /schedule with interval and retention', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({
      success: true,
      message: 'Schedule updated successfully',
      data: { auto_backup_interval_days: 14, retention_count: 10 },
    });
    const res = await api.updateSchedule({ auto_backup_interval_days: 14, retention_count: 10 });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/backup/schedule', {
      auto_backup_interval_days: 14,
      retention_count: 10,
    });
    expect(res).toEqual({ auto_backup_interval_days: 14, retention_count: 10 });
  });

  it('updateSchedule() forwards only the interval when retention is omitted', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({
      success: true,
      message: 'ok',
      data: { auto_backup_interval_days: 3, retention_count: 5 },
    });
    await api.updateSchedule({ auto_backup_interval_days: 3 });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/backup/schedule', {
      auto_backup_interval_days: 3,
    });
  });
});

describe('AdminBackupApi — error propagation', () => {
  it('propagates a client rejection (e.g. missing backup on delete)', async () => {
    const { api, del } = makeClient();
    del.mockRejectedValue(new Error('Backup not found'));
    await expect(api.delete('nope')).rejects.toThrow('Backup not found');
  });
});
