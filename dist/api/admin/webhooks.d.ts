/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
/**
 * A webhook subscription row as returned by `WebhookAdminController`
 * (`/api/v1/admin/webhooks`).
 */
export interface Webhook {
    id: string;
    name: string;
    url: string;
    /** Secret is write-only — never returned by GET. */
    secret?: string;
    events: string[];
    created_at?: string;
    [k: string]: unknown;
}
/** Body accepted by {@link AdminWebhooksApi.create}. */
export interface CreateWebhookInput {
    name: string;
    url: string;
    secret: string;
    events: string[];
}
/**
 * Body accepted by {@link AdminWebhooksApi.update}.
 * Secret is optional — omit to keep the existing secret server-side.
 */
export interface UpdateWebhookInput {
    name: string;
    url: string;
    /** Omit to keep the current secret server-side. */
    secret?: string;
    events: string[];
}
/** Result of {@link AdminWebhooksApi.test}. */
export interface TestResult {
    success: boolean;
    success_count: number;
    failure_count: number;
    failures: string[];
}
/**
 * Event catalog — grouped by category for the checkbox UI.
 * `webhook.test` is NOT user-subscribable (internal only, from the test button).
 */
export declare const WEBHOOK_EVENT_CATEGORIES: ReadonlyArray<{
    label: string;
    events: ReadonlyArray<{
        id: string;
        label: string;
    }>;
}>;
/** All user-subscribable event IDs (excludes `webhook.test`). */
export declare const SUBSCRIBABLE_EVENTS: ReadonlyArray<string>;
/**
 * AdminWebhooksApi (RA.4) — typed wrapper over the admin webhook CRUD + test
 * endpoints (`/api/v1/admin/webhooks*`), ported 1:1 from the deleted React
 * `WebhooksApi`. Lists webhook subscriptions, creates / updates / removes them,
 * and fires a test delivery.
 *
 * Each method maps 1:1 to an endpoint shipped by `WebhookAdminController` and
 * unwraps the single-key envelopes it returns (`{ webhooks }`, `{ webhook }`).
 * The list unwrap is defensively guarded so a malformed payload degrades to
 * `[]` rather than throwing; non-2xx responses surface `ApiError` via the
 * shared client.
 *
 * Contract notes (traced from source, not assumed):
 *  - The secret is write-only — GET never returns it; `update()` omits the
 *    secret from the body when blank so the server keeps the current one.
 *  - `DELETE` may answer `{ message }` or `204 No Content`; the latter is
 *    normalised to a synthetic `{ message: 'Webhook deleted' }`.
 *  - `test()` returns a `{ success, success_count, failure_count, failures }`
 *    dispatch summary.
 */
export declare class AdminWebhooksApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/webhooks` → unwraps `{ webhooks }`. */
    list(): Promise<Webhook[]>;
    /** `POST /api/v1/admin/webhooks` → `201 { webhook }`. */
    create(input: CreateWebhookInput): Promise<Webhook>;
    /**
     * `PUT /api/v1/admin/webhooks/{id}` → `{ webhook }`.
     * Secret is never returned by GET — if omitted on update, server keeps existing.
     */
    update(id: string, input: UpdateWebhookInput): Promise<Webhook>;
    /** `DELETE /api/v1/admin/webhooks/{id}` → `{ message }` or 204 No Content. */
    remove(id: string): Promise<{
        message: string;
    }>;
    /** `POST /api/v1/admin/webhooks/{id}/test` → dispatch summary. */
    test(id: string): Promise<TestResult>;
}
/**
 * Delivery status for a webhook log entry.
 * - `pending`: scheduled for delivery
 * - `success`: delivered successfully (2xx response)
 * - `failed`: delivery failed (non-2xx or network error)
 * - `retry`: scheduled for retry after previous failure
 */
export type WebhookDeliveryStatus = 'pending' | 'success' | 'failed' | 'retry';
/**
 * One webhook delivery log entry as returned by
 * `WebhookAdminController::getDeliveryLogs()` (`GET /api/v1/admin/webhooks/logs`).
 */
export interface WebhookDeliveryLog {
    id: string;
    webhook_id: string;
    webhook_name: string;
    event: string;
    status: WebhookDeliveryStatus;
    /** Unix timestamp when delivery was attempted. */
    attempted_at: number;
    /** HTTP status code from the target server (null for network errors). */
    status_code: number | null;
    /** Response body from the target server (truncated to 500 chars). */
    response_body: string | null;
    /** Error message if delivery failed. */
    error_message: string | null;
    /** Number of retry attempts made. */
    retry_count: number;
    /** Next retry timestamp if status is `retry`. */
    next_retry_at: number | null;
}
/** Paginated response for webhook delivery logs. */
export interface WebhookLogsResponse {
    logs: WebhookDeliveryLog[];
    total: number;
    page: number;
    per_page: number;
}
/**
 * Query params for filtering webhook delivery logs.
 */
export interface WebhookLogsFilter {
    webhook_id?: string;
    status?: WebhookDeliveryStatus;
    page?: number;
    per_page?: number;
}
/**
 * AdminWebhooksApi extension for delivery logs (RA.4 extended).
 * These methods provide visibility into webhook delivery history.
 */
export declare class AdminWebhookLogsApi {
    private readonly client;
    constructor(client: ApiClient);
    /**
     * `GET /api/v1/admin/webhooks/logs` → paginated delivery logs.
     * Optionally filter by webhook_id and/or status.
     */
    list(filter?: WebhookLogsFilter): Promise<WebhookLogsResponse>;
    /**
     * `POST /api/v1/admin/webhooks/logs/{id}/retry` → re-queue a failed delivery.
     */
    retry(logId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * `DELETE /api/v1/admin/webhooks/logs/{id}` → delete a log entry.
     */
    deleteLog(logId: string): Promise<{
        message: string;
    }>;
}
