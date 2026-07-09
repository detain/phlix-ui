<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin WebhookLogsPage (RA.4 extended) — webhook delivery log viewer.
 *
 * Shows a paginated, filterable table of every webhook delivery attempt:
 * - Which webhook and event triggered it
 * - Whether it succeeded, failed, or is pending/retry
 * - The HTTP status code and response body snippet on failure
 * - Retry count and next retry time for failed deliveries
 *
 * Supports filtering by webhook and status. Failed deliveries can be
 * manually re-queued. Each row can be expanded to show full details.
 */
import { ref, computed, watch, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminWebhookLogsApi,
  AdminWebhooksApi,
  type WebhookDeliveryLog,
  type WebhookDeliveryStatus,
  type WebhookLogsFilter,
  type Webhook,
} from '../../api/admin/webhooks';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Select from '../../components/ui/Select.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminWebhookLogsApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const webhooksApi = new AdminWebhooksApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ── Webhook list for filter dropdown ─────────────────────────────────────────
const webhooks = ref<Webhook[]>([]);

async function loadWebhooks(): Promise<void> {
  try {
    webhooks.value = await webhooksApi.list();
  } catch {
    // Non-critical — logs will still load, just no webhook filter
    webhooks.value = [];
  }
}

// ── Log list state ───────────────────────────────────────────────────────────
const logs = ref<WebhookDeliveryLog[]>([]);
const total = ref(0);
const page = ref(1);
const perPage = ref(50);
const loading = ref(true);
const error = ref<string | null>(null);

// ── Filters ───────────────────────────────────────────────────────────────────
const selectedWebhookId = ref<string>('');
const selectedStatus = ref<WebhookDeliveryStatus | ''>('');

const STATUS_OPTIONS: Array<{ value: WebhookDeliveryStatus | ''; label: string }> = [
  { value: '', label: 'All statuses' },
  { value: 'success', label: 'Success' },
  { value: 'failed', label: 'Failed' },
  { value: 'pending', label: 'Pending' },
  { value: 'retry', label: 'Retry' },
];

async function loadLogs(): Promise<void> {
  loading.value = true;
  error.value = null;

  const filter: WebhookLogsFilter = {
    page: page.value,
    per_page: perPage.value,
  };

  if (selectedWebhookId.value) filter.webhook_id = selectedWebhookId.value;
  if (selectedStatus.value) filter.status = selectedStatus.value as WebhookDeliveryStatus;

  try {
    const result = await api.list(filter);
    logs.value = result.logs;
    total.value = result.total;
    page.value = result.page;
    perPage.value = result.per_page;
  } catch (e) {
    error.value = errMessage(e, 'Failed to load webhook logs.');
    toasts.error(error.value);
    logs.value = [];
  } finally {
    loading.value = false;
  }
}

function onFilterChange(): void {
  page.value = 1;
  void loadLogs();
}

// Watch filter changes and reload
watch([selectedWebhookId, selectedStatus], onFilterChange);

function onPageChange(newPage: number): void {
  page.value = newPage;
  void loadLogs();
}

// ── Retry failed delivery ─────────────────────────────────────────────────────
const retryingId = ref<string | null>(null);

async function handleRetry(logId: string): Promise<void> {
  if (retryingId.value !== null) return;
  retryingId.value = logId;
  try {
    const result = await api.retry(logId);
    if (result.success) {
      toasts.success('Delivery re-queued successfully.');
    } else {
      toasts.error(result.message || 'Failed to re-queue delivery.');
    }
    await loadLogs();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to re-queue delivery.'));
  } finally {
    retryingId.value = null;
  }
}

// ── Delete log entry ─────────────────────────────────────────────────────────
const deletingId = ref<string | null>(null);

async function handleDelete(logId: string): Promise<void> {
  if (deletingId.value !== null) return;
  deletingId.value = logId;
  try {
    await api.deleteLog(logId);
    toasts.success('Log entry deleted.');
    await loadLogs();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete log entry.'));
  } finally {
    deletingId.value = null;
  }
}

// ── Status badge tone ─────────────────────────────────────────────────────────
function statusTone(status: WebhookDeliveryStatus): 'success' | 'error' | 'warning' | 'neutral' {
  switch (status) {
    case 'success':
      return 'success';
    case 'failed':
      return 'error';
    case 'retry':
      return 'warning';
    case 'pending':
    default:
      return 'neutral';
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleString();
}

// ── Expand row state ──────────────────────────────────────────────────────────
const expandedId = ref<string | null>(null);

function toggleExpand(id: string): void {
  expandedId.value = expandedId.value === id ? null : id;
}

// ── Init ──────────────────────────────────────────────────────────────────────
onMounted(async () => {
  await loadWebhooks();
  await loadLogs();
});
</script>

<template>
  <section class="admin-webhook-logs" aria-labelledby="webhook-logs-heading">
    <header class="admin-webhook-logs__head">
      <h1 id="webhook-logs-heading" class="admin-webhook-logs__title">Webhook Delivery Logs</h1>
    </header>

    <PageHint>
      History of every webhook delivery attempt. Use the filters to narrow down by
      <strong>webhook</strong> or <strong>status</strong>. Failed deliveries can be
      re-queued manually via the <strong>Retry</strong> button.
    </PageHint>

    <!-- Filters -->
    <div class="admin-webhook-logs__filters">
      <div class="admin-webhook-logs__filter">
        <label for="webhook-filter" class="admin-webhook-logs__filter-label">Webhook</label>
        <Select
          id="webhook-filter"
          v-model="selectedWebhookId"
          :options="[
            { value: '', label: 'All webhooks' },
            ...webhooks.map(w => ({ value: w.id, label: w.name }))
          ]"
        />
      </div>

      <div class="admin-webhook-logs__filter">
        <label for="status-filter" class="admin-webhook-logs__filter-label">Status</label>
        <Select
          id="status-filter"
          v-model="selectedStatus"
          :options="STATUS_OPTIONS"
        />
      </div>

      <div class="admin-webhook-logs__filter admin-webhook-logs__filter--right">
        <span class="admin-webhook-logs__count">
          {{ total }} {{ total === 1 ? 'entry' : 'entries' }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="admin-webhook-logs__content" aria-live="polite">
      <div v-if="loading" class="admin-webhook-logs__skel">
        <Skeleton variant="text" :lines="8" />
      </div>

      <EmptyState
        v-else-if="error"
        title="Couldn't load webhook logs"
        :message="error"
      >
        <Button variant="solid" size="sm" @click="loadLogs">Retry</Button>
      </EmptyState>

      <EmptyState
        v-else-if="logs.length === 0"
        title="No webhook logs yet"
        message="No delivery attempts match your current filters."
      />

      <template v-else>
        <table class="admin-webhook-logs__table" aria-label="Webhook Delivery Logs">
          <thead>
            <tr>
              <th scope="col" class="admin-webhook-logs__col admin-webhook-logs__col--webhook">Webhook</th>
              <th scope="col" class="admin-webhook-logs__col admin-webhook-logs__col--event">Event</th>
              <th scope="col" class="admin-webhook-logs__col admin-webhook-logs__col--status">Status</th>
              <th scope="col" class="admin-webhook-logs__col admin-webhook-logs__col--time">Time</th>
              <th scope="col" class="admin-webhook-logs__col admin-webhook-logs__col--code">Code</th>
              <th scope="col" class="admin-webhook-logs__col admin-webhook-logs__col--actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="log in logs" :key="log.id">
              <tr
                class="admin-webhook-logs__row"
                :class="{ 'admin-webhook-logs__row--expanded': expandedId === log.id }"
                @click="toggleExpand(log.id)"
              >
                <td class="admin-webhook-logs__cell admin-webhook-logs__cell--webhook">
                  {{ log.webhook_name }}
                </td>
                <td class="admin-webhook-logs__cell admin-webhook-logs__cell--event">
                  {{ log.event }}
                </td>
                <td class="admin-webhook-logs__cell admin-webhook-logs__cell--status">
                  <Badge :tone="statusTone(log.status)">
                    {{ log.status }}
                  </Badge>
                  <span v-if="log.retry_count > 0" class="admin-webhook-logs__retry-badge">
                    {{ log.retry_count }} {{ log.retry_count === 1 ? 'retry' : 'retries' }}
                  </span>
                </td>
                <td class="admin-webhook-logs__cell admin-webhook-logs__cell--time">
                  {{ formatTimestamp(log.attempted_at) }}
                </td>
                <td class="admin-webhook-logs__cell admin-webhook-logs__cell--code">
                  <span v-if="log.status_code !== null">{{ log.status_code }}</span>
                  <span v-else class="admin-webhook-logs__no-code">—</span>
                </td>
                <td class="admin-webhook-logs__cell admin-webhook-logs__cell--actions" @click.stop>
                  <div class="admin-webhook-logs__row-actions">
                    <Button
                      v-if="log.status === 'failed'"
                      variant="ghost"
                      size="sm"
                      :loading="retryingId === log.id"
                      @click="handleRetry(log.id)"
                    >
                      Retry
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      :loading="deletingId === log.id"
                      @click="handleDelete(log.id)"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>

              <!-- Expanded detail row -->
              <tr v-if="expandedId === log.id" class="admin-webhook-logs__detail-row">
                <td colspan="6" class="admin-webhook-logs__detail">
                  <div class="admin-webhook-logs__detail-inner">
                    <div class="admin-webhook-logs__detail-grid">
                      <div class="admin-webhook-logs__detail-item">
                        <span class="admin-webhook-logs__detail-label">Log ID</span>
                        <code class="admin-webhook-logs__detail-value">{{ log.id }}</code>
                      </div>
                      <div class="admin-webhook-logs__detail-item">
                        <span class="admin-webhook-logs__detail-label">Webhook ID</span>
                        <code class="admin-webhook-logs__detail-value">{{ log.webhook_id }}</code>
                      </div>
                      <div v-if="log.next_retry_at" class="admin-webhook-logs__detail-item">
                        <span class="admin-webhook-logs__detail-label">Next retry</span>
                        <span class="admin-webhook-logs__detail-value">
                          {{ formatTimestamp(log.next_retry_at) }}
                        </span>
                      </div>
                    </div>

                    <div v-if="log.error_message" class="admin-webhook-logs__detail-item">
                      <span class="admin-webhook-logs__detail-label">Error</span>
                      <span class="admin-webhook-logs__detail-value admin-webhook-logs__detail-value--error">
                        {{ log.error_message }}
                      </span>
                    </div>

                    <div v-if="log.response_body" class="admin-webhook-logs__detail-item">
                      <span class="admin-webhook-logs__detail-label">Response body</span>
                      <pre class="admin-webhook-logs__detail-value admin-webhook-logs__detail-value--pre">{{
                        log.response_body
                      }}</pre>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="admin-webhook-logs__pagination">
          <span class="admin-webhook-logs__pagination-info">
            Page {{ page }} of {{ Math.ceil(total / perPage) || 1 }}
          </span>
          <div class="admin-webhook-logs__pagination-btns">
            <Button
              variant="ghost"
              size="sm"
              :disabled="page <= 1"
              @click="onPageChange(page - 1)"
            >
              Previous
            </Button>
            <Button
              variant="ghost"
              size="sm"
              :disabled="page >= Math.ceil(total / perPage)"
              @click="onPageChange(page + 1)"
            >
              Next
            </Button>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.admin-webhook-logs {
  padding: 1.5rem;
  max-width: 1200px;
}

.admin-webhook-logs__head {
  margin-bottom: 0.5rem;
}

.admin-webhook-logs__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-heading, #1a1a1a);
  margin: 0;
}

.admin-webhook-logs__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--color-surface, #f8f9fa);
  border-radius: 8px;
}

.admin-webhook-logs__filter {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 160px;
}

.admin-webhook-logs__filter--right {
  margin-left: auto;
}

.admin-webhook-logs__filter-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-webhook-logs__count {
  font-size: 0.875rem;
  color: var(--color-text-muted, #6b7280);
}

.admin-webhook-logs__content {
  background: var(--color-background, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
}

.admin-webhook-logs__skel {
  padding: 1.5rem;
}

.admin-webhook-logs__table {
  width: 100%;
  border-collapse: collapse;
}

.admin-webhook-logs__col {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--color-surface, #f8f9fa);
  border-bottom: 1px solid var(--color-border, #e5e7eb);
}

.admin-webhook-logs__col--webhook { width: 20%; }
.admin-webhook-logs__col--event { width: 20%; }
.admin-webhook-logs__col--status { width: 15%; }
.admin-webhook-logs__col--time { width: 20%; }
.admin-webhook-logs__col--code { width: 10%; }
.admin-webhook-logs__col--actions { width: 15%; }

.admin-webhook-logs__row {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.admin-webhook-logs__row:hover {
  background: var(--color-surface, #f8f9fa);
}

.admin-webhook-logs__row--expanded {
  background: var(--color-surface, #f8f9fa);
}

.admin-webhook-logs__cell {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: var(--color-text, #1a1a1a);
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  vertical-align: middle;
}

.admin-webhook-logs__retry-badge {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-muted, #6b7280);
}

.admin-webhook-logs__no-code {
  color: var(--color-text-muted, #6b7280);
}

.admin-webhook-logs__row-actions {
  display: flex;
  gap: 0.25rem;
}

.admin-webhook-logs__detail-row {
  background: var(--color-surface, #f8f9fa);
}

.admin-webhook-logs__detail {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
}

.admin-webhook-logs__detail-inner {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.admin-webhook-logs__detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.admin-webhook-logs__detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-webhook-logs__detail-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-webhook-logs__detail-value {
  font-size: 0.875rem;
  color: var(--color-text, #1a1a1a);
}

.admin-webhook-logs__detail-value--error {
  color: var(--color-danger, #dc2626);
}

.admin-webhook-logs__detail-value--pre {
  font-family: monospace;
  font-size: 0.8rem;
  background: var(--color-background, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 4px;
  padding: 0.5rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.admin-webhook-logs__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-border, #e5e7eb);
  background: var(--color-surface, #f8f9fa);
}

.admin-webhook-logs__pagination-info {
  font-size: 0.875rem;
  color: var(--color-text-muted, #6b7280);
}

.admin-webhook-logs__pagination-btns {
  display: flex;
  gap: 0.5rem;
}
</style>
