<script setup lang="ts">
/**
 * AuditLogsPage (R5.2e) — the hub's audit-log viewer (paginated), re-skinned onto
 * the Nocturne tokens + `@phlix/ui` primitives.
 *
 * Data flow is UNCHANGED from the pre-redo page (presentation-only re-skin):
 *   - GET /api/v1/audit-logs?page=N → { logs, total, page, total_pages }
 * The action is now shown as a category-toned `Badge` instead of the old raw-hex
 * coloured square with an ASCII-glyph ("+/-/~/@/#") icon.
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton.
 */
import { ref, onMounted } from 'vue';
import { api, ApiClient } from '../api/client';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import Badge from '../components/ui/Badge.vue';
import PageHint from '../components/ui/PageHint.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';

interface AuditLog {
  id: string;
  action: string;
  actor: string;
  target?: string;
  details?: string;
  ip_address?: string;
  created_at: string;
}

/** Raw entry shape from the hub's `GET /api/v1/me/audit-logs` (snake_case). */
interface HubAuditLog {
  id?: string;
  event?: string;
  action?: string | null;
  actor?: string | null;
  user_id?: string | null;
  resource?: string | null;
  reason?: string | null;
  ip_address?: string | null;
  created_at?: string | null;
}

/** The hub paginates by limit/offset, not page number. */
const PAGE_SIZE = 50;

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get'> = props.client ?? api;
const toasts = useToastStore();

const logs = ref<AuditLog[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const page = ref(1);
const totalPages = ref(1);

async function loadLogs(pageNum = 1): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const offset = Math.max(0, (pageNum - 1) * PAGE_SIZE);
    const data = await http.get<{ logs: HubAuditLog[]; total: number; limit?: number }>(
      '/api/v1/me/audit-logs',
      { limit: String(PAGE_SIZE), offset: String(offset) },
    );
    const limit = data.limit && data.limit > 0 ? data.limit : PAGE_SIZE;
    logs.value = (data.logs || []).map((l) => ({
      id: l.id ?? '',
      // `event` (e.g. "user.login") is always present; `action` is an optional finer tag.
      action: l.action && l.action !== '' ? l.action : (l.event ?? ''),
      // `actor` is the hub-enriched display name; fall back to the raw user id.
      actor: l.actor ?? l.user_id ?? '',
      target: l.resource ?? undefined,
      details: l.reason ?? undefined,
      ip_address: l.ip_address ?? undefined,
      created_at: l.created_at ?? '',
    }));
    page.value = pageNum;
    totalPages.value = Math.max(1, Math.ceil((data.total || 0) / limit));
  } catch (e) {
    error.value = errMessage(e, 'Failed to load audit logs.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString();
}

/** Badge tone for an audit action, by coarse category match. */
function actionTone(action: string): 'neutral' | 'success' | 'info' | 'error' | 'accent' {
  if (action.includes('create') || action.includes('add')) return 'success';
  if (action.includes('delete') || action.includes('remove')) return 'error';
  if (action.includes('update') || action.includes('edit')) return 'info';
  if (action.includes('login') || action.includes('auth')) return 'accent';
  return 'neutral';
}

onMounted(() => loadLogs());
</script>

<template>
  <section class="audit" aria-labelledby="audit-heading">
    <header class="audit__head">
      <h1 id="audit-heading" class="audit__title">Audit Logs</h1>
      <p class="audit__subtitle">View system activity and user actions.</p>
    </header>

    <PageHint>
      A running record of everything that happens on your hub — pairings, sign-ins, and other
      system and user actions — for security and troubleshooting. Entries are shown newest-first;
      use <strong>Previous</strong> and <strong>Next</strong> to page through the history.
    </PageHint>

    <div v-if="loading" class="audit__skel"><Skeleton variant="text" :lines="8" /></div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load audit logs"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadLogs(page)">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="logs.length === 0"
      icon="list"
      title="No audit logs"
      description="System activity and user actions will appear here."
    />

    <div v-else class="audit__content">
      <div class="audit__table-wrap">
        <table class="audit__table" aria-label="Audit logs">
          <thead>
            <tr>
              <th scope="col">Action</th>
              <th scope="col">Actor</th>
              <th scope="col">Target</th>
              <th scope="col">Details</th>
              <th scope="col">IP</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :key="log.id">
              <td>
                <span :data-testid="`action-${log.id}`">
                  <Badge :tone="actionTone(log.action)">{{ log.action }}</Badge>
                </span>
              </td>
              <td>{{ log.actor }}</td>
              <td>{{ log.target || '—' }}</td>
              <td class="audit__details">{{ log.details || '—' }}</td>
              <td class="audit__ip">{{ log.ip_address || '—' }}</td>
              <td class="audit__date">{{ formatDate(log.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav v-if="totalPages > 1" class="audit__pagination" aria-label="Audit log pages">
        <Button
          variant="ghost"
          size="sm"
          left-icon="chevron-left"
          :disabled="page <= 1"
          @click="loadLogs(page - 1)"
        >
          Previous
        </Button>
        <span class="audit__page-info" aria-live="polite">Page {{ page }} of {{ totalPages }}</span>
        <Button
          variant="ghost"
          size="sm"
          right-icon="chevron-right"
          :disabled="page >= totalPages"
          @click="loadLogs(page + 1)"
        >
          Next
        </Button>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.audit {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.audit__head {
  margin-bottom: var(--space-6);
}
.audit__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}
.audit__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}
.audit__skel {
  padding-block: var(--space-2);
}
.audit__table-wrap {
  overflow-x: auto;
}
.audit__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.audit__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
  white-space: nowrap;
}
.audit__table td {
  padding: var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: top;
}
.audit__details {
  max-width: 28rem;
  word-break: break-word;
}
.audit__ip {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  white-space: nowrap;
}
.audit__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.audit__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
}
.audit__page-info {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  font-variant-numeric: tabular-nums;
}
</style>
