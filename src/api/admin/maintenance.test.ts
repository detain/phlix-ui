/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * `AdminMaintenanceApi` (S78) — the wire contract with S77's `MaintenanceController`.
 *
 * ⚠ **Every path assertion here is an EXACT compare.** Four of the seven paths
 * share the `/api/v1/admin/maintenance/` prefix, two more share `reap-`, and
 * `…/jobs` is a prefix of `…/jobs/{id}`. A `toContain`/`includes` assertion
 * passes on the wrong endpoint for all of those pairs, which is precisely the
 * mutation this file is here to catch. Where a method must call ONE endpoint,
 * the whole recorded call list is compared with `toEqual`, so a stray extra
 * request fails too.
 */

import { describe, it, expect, vi } from 'vitest';
import {
  AdminMaintenanceApi,
  MAINTENANCE_ENDPOINTS,
  MAINTENANCE_TASK_NAMES,
  parseJob,
  type MaintenanceJob,
} from './maintenance';
import type { ApiClient } from '../client';

const rawJob = {
  id: 'job-1',
  task: 'storage-snapshot',
  status: 'queued',
  params: { a: 1 },
  result: null,
  error: null,
  requested_by: 'admin@example.com',
  queued_at: '2026-08-07 10:00:00',
  started_at: null,
  completed_at: null,
};

function makeClient(handlers: { get?: unknown; post?: unknown } = {}) {
  const get = vi.fn(async () => handlers.get ?? { success: true, data: [] });
  const post = vi.fn(async () => handlers.post ?? { success: true });
  const client = { get, post, put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { api: new AdminMaintenanceApi(client), get, post };
}

/** The path argument of every recorded call, in order. */
function paths(spy: { mock: { calls: unknown[][] } }): unknown[] {
  return spy.mock.calls.map((c) => c[0]);
}

describe('maintenance endpoint constants', () => {
  it('are the exact seven paths the server registers', () => {
    // Pinned as a whole object: an entry renamed, dropped or re-pointed fails
    // here even if some caller still "works" by hitting a sibling.
    expect(MAINTENANCE_ENDPOINTS).toEqual({
      tasks: '/api/v1/admin/maintenance/tasks',
      jobs: '/api/v1/admin/maintenance/jobs',
      storageSnapshot: '/api/v1/admin/maintenance/storage-snapshot',
      reapScanJobs: '/api/v1/admin/maintenance/reap-scan-jobs',
      reapTranscodeJobs: '/api/v1/admin/maintenance/reap-transcode-jobs',
      cleanupOrphanedStats: '/api/v1/admin/maintenance/cleanup-orphaned-stats',
      dedupePaths: '/api/v1/admin/maintenance/dedupe-paths',
    });
  });

  it('are all distinct — no two actions share a path', () => {
    const values = Object.values(MAINTENANCE_ENDPOINTS);
    expect(new Set(values).size).toBe(values.length);
  });

  it('the two reapers differ by more than a prefix (why substring assertions are banned here)', () => {
    // Anti-vacuity for the rule this file follows: `reap-scan-jobs` is NOT a
    // substring of `reap-transcode-jobs`, but both contain `reap-`, so a
    // `toContain('reap-')` style assertion cannot tell them apart.
    expect(MAINTENANCE_ENDPOINTS.reapScanJobs).not.toBe(MAINTENANCE_ENDPOINTS.reapTranscodeJobs);
    expect(MAINTENANCE_ENDPOINTS.reapScanJobs.includes(MAINTENANCE_ENDPOINTS.reapTranscodeJobs)).toBe(false);
    expect(MAINTENANCE_ENDPOINTS.reapTranscodeJobs.includes(MAINTENANCE_ENDPOINTS.reapScanJobs)).toBe(false);
    // …but `…/jobs` IS a prefix of the single-job path, so that pair genuinely
    // needs the exact compare.
    expect(`${MAINTENANCE_ENDPOINTS.jobs}/job-1`.startsWith(MAINTENANCE_ENDPOINTS.jobs)).toBe(true);
  });

  it('names the five catalogue tasks', () => {
    expect([...MAINTENANCE_TASK_NAMES]).toEqual([
      'storage-snapshot',
      'reap-scan-jobs',
      'reap-transcode-jobs',
      'cleanup-orphaned-stats',
      'dedupe-paths',
    ]);
  });
});

describe('AdminMaintenanceApi — reads', () => {
  it('listTasks GETs exactly /api/v1/admin/maintenance/tasks', async () => {
    const { api, get } = makeClient({
      get: { success: true, data: [{ task: 'dedupe-paths', mode: 'queued', label: 'L', description: 'D', destructive: true }] },
    });
    const tasks = await api.listTasks();
    expect(paths(get)).toEqual(['/api/v1/admin/maintenance/tasks']);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].task).toBe('dedupe-paths');
  });

  it('listTasks degrades to [] when data is not an array', async () => {
    const { api } = makeClient({ get: { success: true, data: null } });
    expect(await api.listTasks()).toEqual([]);
  });

  it('listJobs GETs exactly /api/v1/admin/maintenance/jobs with the limit query', async () => {
    const { api, get } = makeClient({ get: { success: true, data: [rawJob] } });
    const jobs = await api.listJobs({ limit: 20 });
    expect(paths(get)).toEqual(['/api/v1/admin/maintenance/jobs']);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/maintenance/jobs', { limit: '20' }, undefined);
    expect(jobs.map((j) => j.id)).toEqual(['job-1']);
  });

  it('listJobs sends no query object when given no params', async () => {
    const { api, get } = makeClient({ get: { success: true, data: [] } });
    await api.listJobs();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/maintenance/jobs', undefined, undefined);
  });

  it('listJobs passes a task filter through', async () => {
    const { api, get } = makeClient({ get: { success: true, data: [] } });
    await api.listJobs({ task: 'dedupe-paths' });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/maintenance/jobs', { task: 'dedupe-paths' }, undefined);
  });

  it('listJobs drops malformed rows rather than emitting half-built jobs', async () => {
    const { api } = makeClient({ get: { success: true, data: [rawJob, { id: '' }, 7, null] } });
    const jobs = await api.listJobs();
    expect(jobs).toHaveLength(1);
  });

  it('getJob GETs the per-id path, which is NOT the collection path', async () => {
    const { api, get } = makeClient({ get: { success: true, data: rawJob } });
    const job = await api.getJob('job 1/x');
    expect(paths(get)).toEqual(['/api/v1/admin/maintenance/jobs/job%201%2Fx']);
    // Exact, so a mutation that dropped the id segment (leaving the collection
    // path) reds instead of silently listing every job.
    expect(paths(get)).not.toEqual(['/api/v1/admin/maintenance/jobs']);
    expect(job?.id).toBe('job-1');
  });
});

describe('parseJob', () => {
  it('fills every optional field from a complete row', () => {
    const job = parseJob({ ...rawJob, status: 'completed', result: { x: 1 }, completed_at: 'later' });
    expect(job).toEqual<MaintenanceJob>({
      id: 'job-1',
      task: 'storage-snapshot',
      status: 'completed',
      params: { a: 1 },
      result: { x: 1 },
      error: null,
      requested_by: 'admin@example.com',
      queued_at: '2026-08-07 10:00:00',
      started_at: null,
      completed_at: 'later',
    });
  });

  it('rejects a row with no usable id', () => {
    expect(parseJob({ ...rawJob, id: '' })).toBeNull();
    expect(parseJob({ ...rawJob, id: 42 })).toBeNull();
    expect(parseJob(null)).toBeNull();
    expect(parseJob([rawJob])).toBeNull();
  });
});

describe('AdminMaintenanceApi — queued POSTs', () => {
  it('storageSnapshot POSTs exactly its own path and reads created:true', async () => {
    const { api, post } = makeClient({
      post: { success: true, task: 'storage-snapshot', mode: 'queued', created: true, data: { job: rawJob } },
    });
    const result = await api.storageSnapshot();
    expect(paths(post)).toEqual(['/api/v1/admin/maintenance/storage-snapshot']);
    expect(result.created).toBe(true);
    expect(result.job?.id).toBe('job-1');
  });

  it('storageSnapshot reads created:false as "already running", not as an error', async () => {
    const { api } = makeClient({
      post: { success: true, task: 'storage-snapshot', created: false, data: { job: { ...rawJob, status: 'running' } } },
    });
    const result = await api.storageSnapshot();
    expect(result.created).toBe(false);
    expect(result.job?.status).toBe('running');
  });

  it('a missing/odd `created` degrades to false, never to "a new run started"', async () => {
    for (const created of [undefined, 'true', 1, null]) {
      const { api } = makeClient({ post: { success: true, created, data: { job: rawJob } } });
      expect((await api.storageSnapshot()).created).toBe(false);
    }
  });

  it('dedupePaths defaults to a DRY RUN — apply:false is sent explicitly', async () => {
    const { api, post } = makeClient({ post: { success: true, created: true, data: { job: rawJob } } });
    await api.dedupePaths();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/maintenance/dedupe-paths', { apply: false });
  });

  it('dedupePaths sends a strict boolean true only for a real `true`', async () => {
    const { api, post } = makeClient({ post: { success: true, created: true, data: { job: rawJob } } });
    await api.dedupePaths({ apply: true });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/maintenance/dedupe-paths', { apply: true });
  });

  it('dedupePaths refuses to arm a destructive run from a truthy non-boolean', async () => {
    // The server does `=== true` because PHP reads the STRING "false" as truthy.
    // Mirroring that here means no caller can arm it by accident through the
    // typed seam either.
    const { api, post } = makeClient({ post: { success: true, created: true, data: { job: rawJob } } });
    await api.dedupePaths({ apply: 'false' as unknown as boolean });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/maintenance/dedupe-paths', { apply: false });
  });

  it('dedupePaths forwards batch_size only when given', async () => {
    const { api, post } = makeClient({ post: { success: true, created: true, data: { job: rawJob } } });
    await api.dedupePaths({ apply: false, batch_size: 250 });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/maintenance/dedupe-paths', { apply: false, batch_size: 250 });
  });

  it('a queued result with a malformed job yields job:null rather than a broken poll target', async () => {
    const { api } = makeClient({ post: { success: true, created: true, data: { job: { nope: 1 } } } });
    expect((await api.storageSnapshot()).job).toBeNull();
  });
});

describe('AdminMaintenanceApi — sync POSTs', () => {
  it('reapScanJobs POSTs its OWN path, not the transcode sibling', async () => {
    const { api, post } = makeClient({
      post: {
        success: true,
        task: 'reap-scan-jobs',
        mode: 'sync',
        data: { reaped: 3, older_than_seconds: 21600, requested_older_than_seconds: 60, floor_applied: true },
      },
    });
    const result = await api.reapScanJobs({ older_than_seconds: 60 });
    expect(paths(post)).toEqual(['/api/v1/admin/maintenance/reap-scan-jobs']);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/maintenance/reap-scan-jobs', { older_than_seconds: 60 });
    expect(result.data.reaped).toBe(3);
    expect(result.data.floor_applied).toBe(true);
    expect(result.data.older_than_seconds).toBe(21600);
  });

  it('reapTranscodeJobs POSTs its OWN path, not the scan sibling', async () => {
    const { api, post } = makeClient({
      post: { success: true, task: 'reap-transcode-jobs', data: { reaped: 1, older_than_seconds: 300 } },
    });
    const result = await api.reapTranscodeJobs();
    expect(paths(post)).toEqual(['/api/v1/admin/maintenance/reap-transcode-jobs']);
    expect(result.data.reaped).toBe(1);
  });

  it('floor_applied is strict — a truthy non-boolean does not claim the floor fired', async () => {
    const { api } = makeClient({
      post: { success: true, data: { reaped: 0, older_than_seconds: 21600, requested_older_than_seconds: 21600, floor_applied: 'yes' } },
    });
    expect((await api.reapScanJobs()).data.floor_applied).toBe(false);
  });

  it('cleanupOrphanedStats POSTs its own path and surfaces the truncation flag', async () => {
    const { api, post } = makeClient({
      post: {
        success: true,
        task: 'cleanup-orphaned-stats',
        data: { deleted: { 'watch_history.media_item_id': 5 }, total: 5, limit: 5000, truncated: true },
      },
    });
    const result = await api.cleanupOrphanedStats({ limit: 5000 });
    expect(paths(post)).toEqual(['/api/v1/admin/maintenance/cleanup-orphaned-stats']);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/maintenance/cleanup-orphaned-stats', { limit: 5000 });
    expect(result.data.total).toBe(5);
    expect(result.data.truncated).toBe(true);
    expect(result.data.deleted).toEqual({ 'watch_history.media_item_id': 5 });
  });

  it('cleanupOrphanedStats tolerates a missing data block', async () => {
    const { api } = makeClient({ post: { success: true } });
    const result = await api.cleanupOrphanedStats();
    expect(result.data.total).toBe(0);
    expect(result.data.deleted).toEqual({});
    expect(result.data.truncated).toBe(false);
  });

  it('propagates a rejection instead of swallowing it into a fake success', async () => {
    const client = {
      get: vi.fn(),
      post: vi.fn(async () => {
        throw new Error('scan reaper exploded');
      }),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as unknown as ApiClient;
    await expect(new AdminMaintenanceApi(client).reapScanJobs()).rejects.toThrow('scan reaper exploded');
  });
});
