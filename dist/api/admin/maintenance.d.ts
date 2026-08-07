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
export declare const MAINTENANCE_TASK_NAMES: readonly ["storage-snapshot", "reap-scan-jobs", "reap-transcode-jobs", "cleanup-orphaned-stats", "dedupe-paths"];
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
export declare const MAINTENANCE_ENDPOINTS: {
    readonly tasks: "/api/v1/admin/maintenance/tasks";
    readonly jobs: "/api/v1/admin/maintenance/jobs";
    readonly storageSnapshot: "/api/v1/admin/maintenance/storage-snapshot";
    readonly reapScanJobs: "/api/v1/admin/maintenance/reap-scan-jobs";
    readonly reapTranscodeJobs: "/api/v1/admin/maintenance/reap-transcode-jobs";
    readonly cleanupOrphanedStats: "/api/v1/admin/maintenance/cleanup-orphaned-stats";
    readonly dedupePaths: "/api/v1/admin/maintenance/dedupe-paths";
};
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
/**
 * Narrow one raw job object. Returns `null` for anything that is not at least
 * `{ id, task, status }` — a queued POST whose `data.job` is malformed must not
 * produce a poll loop against `undefined`.
 */
export declare function parseJob(raw: unknown): MaintenanceJob | null;
/** AdminMaintenanceApi — see the module docblock for the two-mode contract. */
export declare class AdminMaintenanceApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/maintenance/tasks` → the catalogue, in render order. */
    listTasks(signal?: AbortSignal): Promise<MaintenanceTask[]>;
    /**
     * `GET /api/v1/admin/maintenance/jobs` → recent jobs, newest first.
     *
     * An unknown `task` filter is a **400** on the server, not an empty list, so
     * only names from {@link MAINTENANCE_TASK_NAMES} may be passed.
     */
    listJobs(params?: {
        limit?: number;
        task?: MaintenanceTaskName;
    }, signal?: AbortSignal): Promise<MaintenanceJob[]>;
    /** `GET /api/v1/admin/maintenance/jobs/{id}` → one job, or throws on 404. */
    getJob(id: string, signal?: AbortSignal): Promise<MaintenanceJob | null>;
    /** `POST /api/v1/admin/maintenance/storage-snapshot` — queued. */
    storageSnapshot(): Promise<QueuedTaskResult>;
    /**
     * `POST /api/v1/admin/maintenance/dedupe-paths` — queued, **dry run by default**.
     *
     * `apply` is forced through `=== true` so only a genuine boolean `true` arms
     * the destructive path; every other value sends `false` and previews.
     */
    dedupePaths(input?: DedupePathsInput): Promise<QueuedTaskResult>;
    /**
     * `POST /api/v1/admin/maintenance/reap-scan-jobs` — sync.
     *
     * The server imposes a **six-hour floor** on `older_than_seconds` (a live
     * production music scan ran 4 h 09 m before its first durable write and there
     * is no heartbeat column). A smaller request is raised and the response says
     * so via `floor_applied`.
     */
    reapScanJobs(input?: ReapInput): Promise<SyncTaskResult<ReapScanJobsData>>;
    /** `POST /api/v1/admin/maintenance/reap-transcode-jobs` — sync. */
    reapTranscodeJobs(input?: ReapInput): Promise<SyncTaskResult<ReapTranscodeJobsData>>;
    /** `POST /api/v1/admin/maintenance/cleanup-orphaned-stats` — sync, destructive. */
    cleanupOrphanedStats(input?: CleanupOrphanedStatsInput): Promise<SyncTaskResult<CleanupOrphanedStatsData>>;
}
