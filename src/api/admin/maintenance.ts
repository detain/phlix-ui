/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { ApiClient } from '../client';

/**
 * AdminMaintenanceApi (S78) — typed wrapper over the admin maintenance-task
 * endpoints shipped by S77's `MaintenanceController`
 * (`/api/v1/admin/maintenance/*`, all behind `AdminMiddleware` plus an in-body
 * admin re-check).
 *
 * ## Two modes, two very different response shapes
 *
 * The catalogue splits into **sync** tasks (cheap, bounded DB work that has
 * already finished by the time the response arrives — the response body IS the
 * result) and **queued** tasks (expensive work handed to the maintenance queue
 * worker — the response body carries a {@link MaintenanceJob} to poll). A UI
 * that renders both the same way lies about one of them, so the two are given
 * different result types here rather than one union with optional fields.
 *
 * ## `created: false` is a SUCCESS, not an error
 *
 * A queued POST issued while a job for that task is already `queued`/`running`
 * replies **`200 { created: false, data: { job } }`** with the EXISTING job —
 * the server deliberately refuses to stack a second run of an idempotent task.
 * It is not a 4xx and it is not a fresh submission. {@link QueuedTaskResult}
 * therefore surfaces `created` as a required boolean so a caller cannot forget
 * to branch on it; rendering both cases identically would make a repeat click
 * look like a no-op and invite the operator to click again.
 *
 * ## `dedupe-paths` is a DRY RUN unless `apply` is a real boolean `true`
 *
 * The server does `=== true`, on purpose: the STRING `"false"` is truthy in PHP
 * and this task deletes media rows. {@link AdminMaintenanceApi.dedupePaths}
 * normalises with `=== true` on this side too, so no caller can accidentally
 * send a truthy non-boolean and arm a destructive run.
 */

/** Every task name the server's catalogue exposes. Exact strings — two of them share a `reap-` prefix. */
export const MAINTENANCE_TASK_NAMES = [
  'storage-snapshot',
  'reap-scan-jobs',
  'reap-transcode-jobs',
  'cleanup-orphaned-stats',
  'dedupe-paths',
] as const;

/** A task name from {@link MAINTENANCE_TASK_NAMES}. */
export type MaintenanceTaskName = (typeof MAINTENANCE_TASK_NAMES)[number];

/** How a task executes: `sync` finishes inside the request, `queued` returns a job to poll. */
export type MaintenanceTaskMode = 'sync' | 'queued';

/** A job's lifecycle state, as recorded in `maintenance_jobs.status`. */
export type MaintenanceJobStatus = 'queued' | 'running' | 'completed' | 'failed';

/**
 * The exact endpoint paths, exported so both the page and its tests name them
 * from one place. Two of these share the `reap-` prefix and a third shares the
 * `…/jobs` prefix with the jobs collection — every assertion against them must
 * be an exact compare, never a substring match.
 */
export const MAINTENANCE_ENDPOINTS = {
  tasks: '/api/v1/admin/maintenance/tasks',
  jobs: '/api/v1/admin/maintenance/jobs',
  storageSnapshot: '/api/v1/admin/maintenance/storage-snapshot',
  reapScanJobs: '/api/v1/admin/maintenance/reap-scan-jobs',
  reapTranscodeJobs: '/api/v1/admin/maintenance/reap-transcode-jobs',
  cleanupOrphanedStats: '/api/v1/admin/maintenance/cleanup-orphaned-stats',
  dedupePaths: '/api/v1/admin/maintenance/dedupe-paths',
} as const;

/** One entry of `GET /api/v1/admin/maintenance/tasks`. */
export interface MaintenanceTask {
  task: string;
  mode: MaintenanceTaskMode;
  label: string;
  description: string;
  /** `true` for `cleanup-orphaned-stats` and `dedupe-paths` — confirm before firing. */
  destructive: boolean;
}

/** A `maintenance_jobs` row, as returned by a 202, `GET …/jobs` and `GET …/jobs/{id}`. */
export interface MaintenanceJob {
  id: string;
  task: string;
  status: MaintenanceJobStatus;
  params: Record<string, unknown>;
  result: Record<string, unknown> | null;
  error: string | null;
  requested_by: string | null;
  queued_at: string | null;
  started_at: string | null;
  completed_at: string | null;
}

/**
 * The outcome of POSTing a **queued** task.
 *
 * `created === false` means the server found a job for this task already
 * `queued` or `running` and returned THAT one (HTTP 200) instead of enqueuing a
 * second. `created === true` is a fresh enqueue (HTTP 202).
 */
export interface QueuedTaskResult {
  task: string;
  created: boolean;
  job: MaintenanceJob | null;
}

/** The outcome of POSTing a **sync** task — the work is already done. */
export interface SyncTaskResult<T> {
  task: string;
  data: T;
}

/** `data` of a `reap-scan-jobs` run. */
export interface ReapScanJobsData {
  reaped: number;
  older_than_seconds: number;
  requested_older_than_seconds: number;
  /** `true` when the request asked for an age below the six-hour floor and was RAISED to it. */
  floor_applied: boolean;
}

/** `data` of a `reap-transcode-jobs` run. */
export interface ReapTranscodeJobsData {
  reaped: number;
  older_than_seconds: number;
}

/** `data` of a `cleanup-orphaned-stats` run. */
export interface CleanupOrphanedStatsData {
  /** Rows deleted per `"<table>.<column>"`. */
  deleted: Record<string, number>;
  total: number;
  limit: number;
  /** `true` when the per-table cap was hit — there is more to delete, offer "run again". */
  truncated: boolean;
}

/** Body accepted by {@link AdminMaintenanceApi.dedupePaths}. */
export interface DedupePathsInput {
  /** Must be a real boolean. Anything but `true` leaves the run a preview. */
  apply?: boolean;
  batch_size?: number;
}

/** Body accepted by the two reaper endpoints. */
export interface ReapInput {
  older_than_seconds?: number;
}

/** Body accepted by {@link AdminMaintenanceApi.cleanupOrphanedStats}. */
export interface CleanupOrphanedStatsInput {
  limit?: number;
}

type Raw = Record<string, unknown>;

function isRecord(value: unknown): value is Raw {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Narrow one raw job object. Returns `null` for anything that is not at least
 * `{ id, task, status }` — a queued POST whose `data.job` is malformed must not
 * produce a poll loop against `undefined`.
 */
export function parseJob(raw: unknown): MaintenanceJob | null {
  if (!isRecord(raw)) {
    return null;
  }
  const id = raw['id'];
  const task = raw['task'];
  const status = raw['status'];
  if (typeof id !== 'string' || id === '' || typeof task !== 'string' || typeof status !== 'string') {
    return null;
  }
  return {
    id,
    task,
    status: status as MaintenanceJobStatus,
    params: isRecord(raw['params']) ? raw['params'] : {},
    result: isRecord(raw['result']) ? raw['result'] : null,
    error: typeof raw['error'] === 'string' ? raw['error'] : null,
    requested_by: typeof raw['requested_by'] === 'string' ? raw['requested_by'] : null,
    queued_at: typeof raw['queued_at'] === 'string' ? raw['queued_at'] : null,
    started_at: typeof raw['started_at'] === 'string' ? raw['started_at'] : null,
    completed_at: typeof raw['completed_at'] === 'string' ? raw['completed_at'] : null,
  };
}

/** Envelope of a queued POST. */
interface QueuedEnvelope {
  task?: unknown;
  created?: unknown;
  data?: unknown;
}

/**
 * Narrow a queued POST envelope.
 *
 * `created` is read with `=== true`, matching the way the server writes it: an
 * absent or unrecognised value must degrade to "this was NOT a fresh enqueue",
 * because the harmful direction is telling the operator a new run started when
 * one did not. The opposite default would hide the already-running case
 * entirely — which is the exact behaviour this whole branch exists to expose.
 */
function parseQueued(raw: unknown, fallbackTask: string): QueuedTaskResult {
  const envelope: QueuedEnvelope = isRecord(raw) ? raw : {};
  const data = isRecord(envelope.data) ? envelope.data : {};
  return {
    task: typeof envelope.task === 'string' && envelope.task !== '' ? envelope.task : fallbackTask,
    created: envelope.created === true,
    job: parseJob(data['job']),
  };
}

/** AdminMaintenanceApi — see the module docblock for the two-mode contract. */
export class AdminMaintenanceApi {
  constructor(private readonly client: ApiClient) {}

  /** `GET /api/v1/admin/maintenance/tasks` → the catalogue, in render order. */
  async listTasks(signal?: AbortSignal): Promise<MaintenanceTask[]> {
    const response = await this.client.get<{ success: boolean; data: MaintenanceTask[] }>(
      MAINTENANCE_ENDPOINTS.tasks,
      undefined,
      signal,
    );
    return Array.isArray(response?.data) ? response.data : [];
  }

  /**
   * `GET /api/v1/admin/maintenance/jobs` → recent jobs, newest first.
   *
   * An unknown `task` filter is a **400** on the server, not an empty list, so
   * only names from {@link MAINTENANCE_TASK_NAMES} may be passed.
   */
  async listJobs(params: { limit?: number; task?: MaintenanceTaskName } = {}, signal?: AbortSignal): Promise<MaintenanceJob[]> {
    const query: Record<string, string> = {};
    if (typeof params.limit === 'number') {
      query['limit'] = String(params.limit);
    }
    if (params.task) {
      query['task'] = params.task;
    }
    const response = await this.client.get<{ success: boolean; data: unknown[] }>(
      MAINTENANCE_ENDPOINTS.jobs,
      Object.keys(query).length > 0 ? query : undefined,
      signal,
    );
    const rows = Array.isArray(response?.data) ? response.data : [];
    return rows.map(parseJob).filter((j): j is MaintenanceJob => j !== null);
  }

  /** `GET /api/v1/admin/maintenance/jobs/{id}` → one job, or throws on 404. */
  async getJob(id: string, signal?: AbortSignal): Promise<MaintenanceJob | null> {
    const response = await this.client.get<{ success: boolean; data: unknown }>(
      `${MAINTENANCE_ENDPOINTS.jobs}/${encodeURIComponent(id)}`,
      undefined,
      signal,
    );
    return parseJob(isRecord(response) ? response['data'] : null);
  }

  /** `POST /api/v1/admin/maintenance/storage-snapshot` — queued. */
  async storageSnapshot(): Promise<QueuedTaskResult> {
    const raw = await this.client.post<unknown>(MAINTENANCE_ENDPOINTS.storageSnapshot, {});
    return parseQueued(raw, 'storage-snapshot');
  }

  /**
   * `POST /api/v1/admin/maintenance/dedupe-paths` — queued, **dry run by default**.
   *
   * `apply` is forced through `=== true` so only a genuine boolean `true` arms
   * the destructive path; every other value sends `false` and previews.
   */
  async dedupePaths(input: DedupePathsInput = {}): Promise<QueuedTaskResult> {
    const body: { apply: boolean; batch_size?: number } = { apply: input.apply === true };
    if (typeof input.batch_size === 'number') {
      body.batch_size = input.batch_size;
    }
    const raw = await this.client.post<unknown>(MAINTENANCE_ENDPOINTS.dedupePaths, body);
    return parseQueued(raw, 'dedupe-paths');
  }

  /**
   * `POST /api/v1/admin/maintenance/reap-scan-jobs` — sync.
   *
   * The server imposes a **six-hour floor** on `older_than_seconds` (a live
   * production music scan ran 4 h 09 m before its first durable write and there
   * is no heartbeat column). A smaller request is raised and the response says
   * so via `floor_applied`.
   */
  async reapScanJobs(input: ReapInput = {}): Promise<SyncTaskResult<ReapScanJobsData>> {
    const raw = await this.client.post<{ task?: string; data?: Partial<ReapScanJobsData> }>(
      MAINTENANCE_ENDPOINTS.reapScanJobs,
      input,
    );
    const data = raw?.data;
    return {
      task: raw?.task ?? 'reap-scan-jobs',
      data: {
        reaped: Number(data?.reaped ?? 0),
        older_than_seconds: Number(data?.older_than_seconds ?? 0),
        requested_older_than_seconds: Number(data?.requested_older_than_seconds ?? 0),
        floor_applied: data?.floor_applied === true,
      },
    };
  }

  /** `POST /api/v1/admin/maintenance/reap-transcode-jobs` — sync. */
  async reapTranscodeJobs(input: ReapInput = {}): Promise<SyncTaskResult<ReapTranscodeJobsData>> {
    const raw = await this.client.post<{ task?: string; data?: Partial<ReapTranscodeJobsData> }>(
      MAINTENANCE_ENDPOINTS.reapTranscodeJobs,
      input,
    );
    const data = raw?.data;
    return {
      task: raw?.task ?? 'reap-transcode-jobs',
      data: {
        reaped: Number(data?.reaped ?? 0),
        older_than_seconds: Number(data?.older_than_seconds ?? 0),
      },
    };
  }

  /** `POST /api/v1/admin/maintenance/cleanup-orphaned-stats` — sync, destructive. */
  async cleanupOrphanedStats(
    input: CleanupOrphanedStatsInput = {},
  ): Promise<SyncTaskResult<CleanupOrphanedStatsData>> {
    const raw = await this.client.post<{ task?: string; data?: Partial<CleanupOrphanedStatsData> }>(
      MAINTENANCE_ENDPOINTS.cleanupOrphanedStats,
      input,
    );
    const data = raw?.data;
    const rawDeleted = data?.deleted;
    return {
      task: raw?.task ?? 'cleanup-orphaned-stats',
      data: {
        deleted: isRecord(rawDeleted) ? (rawDeleted as Record<string, number>) : {},
        total: Number(data?.total ?? 0),
        limit: Number(data?.limit ?? 0),
        truncated: data?.truncated === true,
      },
    };
  }
}
