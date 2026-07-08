/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
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
export const WEBHOOK_EVENT_CATEGORIES: ReadonlyArray<{
  label: string;
  events: ReadonlyArray<{ id: string; label: string }>;
}> = Object.freeze([
  {
    label: 'Playback',
    events: [
      { id: 'playback.started', label: 'Playback started' },
      { id: 'playback.ended', label: 'Playback ended' },
    ],
  },
  {
    label: 'Library',
    events: [{ id: 'library.updated', label: 'Library updated' }],
  },
  {
    label: 'Downloads',
    events: [{ id: 'download.complete', label: 'Download complete' }],
  },
  {
    label: 'Recordings',
    events: [
      { id: 'recording.started', label: 'Recording started' },
      { id: 'recording.stopped', label: 'Recording stopped' },
    ],
  },
  {
    label: 'System',
    events: [{ id: 'alert', label: 'Alert' }],
  },
]);

/** All user-subscribable event IDs (excludes `webhook.test`). */
export const SUBSCRIBABLE_EVENTS: ReadonlyArray<string> = Object.freeze(
  WEBHOOK_EVENT_CATEGORIES.flatMap((cat) => cat.events.map((e) => e.id)),
);

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
export class AdminWebhooksApi {
  constructor(private readonly client: ApiClient) {}

  /** `GET /api/v1/admin/webhooks` → unwraps `{ webhooks }`. */
  async list(): Promise<Webhook[]> {
    const { webhooks } = await this.client.get<{ webhooks: Webhook[] }>(
      '/api/v1/admin/webhooks',
    );
    return Array.isArray(webhooks) ? webhooks : [];
  }

  /** `POST /api/v1/admin/webhooks` → `201 { webhook }`. */
  create(input: CreateWebhookInput): Promise<Webhook> {
    return this.client
      .post<{ webhook: Webhook }>('/api/v1/admin/webhooks', input)
      .then(({ webhook }) => webhook);
  }

  /**
   * `PUT /api/v1/admin/webhooks/{id}` → `{ webhook }`.
   * Secret is never returned by GET — if omitted on update, server keeps existing.
   */
  update(id: string, input: UpdateWebhookInput): Promise<Webhook> {
    return this.client
      .put<{ webhook: Webhook }>(
        `/api/v1/admin/webhooks/${encodeURIComponent(id)}`,
        input,
      )
      .then(({ webhook }) => webhook);
  }

  /** `DELETE /api/v1/admin/webhooks/{id}` → `{ message }` or 204 No Content. */
  remove(id: string): Promise<{ message: string }> {
    return this.client
      .delete<{ message: string } | null>(
        `/api/v1/admin/webhooks/${encodeURIComponent(id)}`,
      )
      .then((res) => {
        if (res === null || res === undefined) {
          return { message: 'Webhook deleted' };
        }
        return res;
      });
  }

  /** `POST /api/v1/admin/webhooks/{id}/test` → dispatch summary. */
  test(id: string): Promise<TestResult> {
    return this.client.post<TestResult>(
      `/api/v1/admin/webhooks/${encodeURIComponent(id)}/test`,
    );
  }
}
