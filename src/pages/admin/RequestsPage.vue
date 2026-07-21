<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * RequestsPage (WS-D D-HUB-2) — hub-only admin surface for the content-request
 * queue.  Allows moderators to inspect pending/available requests and approve or
 * deny them one at a time.
 *
 * API surface (read-only):
 *   GET  /api/v1/admin/requests?status=pending|available
 *   POST /api/v1/admin/requests/{id}/approve
 *   POST /api/v1/admin/requests/{id}/deny  { reason?: string }
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton.
 */
import { ref, onMounted } from 'vue';
import { api, ApiClient } from '../../api/client';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import PageHint from '../../components/ui/PageHint.vue';
import { adminPageHelp } from './helpLinks';

/** Raw entry shape from the hub's GET /api/v1/admin/requests (snake_case). */
interface AdminRequest {
  id: string;
  user_id: string;
  type: 'movie' | 'series';
  tmdb_id: number;
  title: string;
  poster_url: string | null;
  season: number | null;
  episode: number | null;
  status: 'pending' | 'approved' | 'available' | 'rejected';
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get' | 'post'> = props.client ?? api;
const toasts = useToastStore();

const requests = ref<AdminRequest[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const activeTab = ref<'pending' | 'available'>('pending');
const processingIds = ref(new Set<string>());

/** Map a raw server row to our local interface (identity in this case). */
function mapRow(r: Record<string, unknown>): AdminRequest {
  return {
    id: String(r.id ?? ''),
    user_id: String(r.user_id ?? ''),
    type: (r.type === 'movie' || r.type === 'series' ? r.type : 'movie') as 'movie' | 'series',
    tmdb_id: typeof r.tmdb_id === 'number' ? r.tmdb_id : 0,
    title: String(r.title ?? ''),
    poster_url: r.poster_url === null ? null : String(r.poster_url),
    season: r.season === null ? null : typeof r.season === 'number' ? r.season : null,
    episode: r.episode === null ? null : typeof r.episode === 'number' ? r.episode : null,
    status: (r.status === 'pending' || r.status === 'approved' || r.status === 'available' || r.status === 'rejected'
      ? r.status
      : 'pending') as AdminRequest['status'],
    rejection_reason: r.rejection_reason === null ? null : String(r.rejection_reason),
    created_at: String(r.created_at ?? ''),
    updated_at: String(r.updated_at ?? ''),
  };
}

async function loadRequests(tab: string): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const data = await http.get<{ requests: Record<string, unknown>[]; count: number }>(
      '/api/v1/admin/requests',
      { status: tab },
    );
    requests.value = (data.requests || []).map(mapRow);
  } catch (e) {
    error.value = errMessage(e, 'Failed to load requests.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

async function approveRequest(id: string): Promise<void> {
  if (processingIds.value.has(id)) return;
  processingIds.value = new Set([...processingIds.value, id]);
  try {
    await http.post<{ message: string; request_id: string }>(
      `/api/v1/admin/requests/${id}/approve`,
    );
    toasts.success('Request approved.');
    await loadRequests(activeTab.value);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to approve request.'));
  } finally {
    processingIds.value = new Set([...processingIds.value].filter((i) => i !== id));
  }
}

async function denyRequest(id: string, reason = ''): Promise<void> {
  if (processingIds.value.has(id)) return;
  processingIds.value = new Set([...processingIds.value, id]);
  try {
    const body = reason.trim() !== '' ? { reason } : {};
    await http.post<{ message: string; request_id: string }>(
      `/api/v1/admin/requests/${id}/deny`,
      body,
    );
    toasts.success('Request denied.');
    await loadRequests(activeTab.value);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to deny request.'));
  } finally {
    processingIds.value = new Set([...processingIds.value].filter((i) => i !== id));
  }
}

function confirmDeny(id: string): void {
  const reason = window.prompt('Rejection reason (optional):');
  if (reason === null) return; // user cancelled
  void denyRequest(id, reason);
}

function setTab(tab: 'pending' | 'available'): void {
  activeTab.value = tab;
  void loadRequests(tab);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString();
}

function typeLabel(type: 'movie' | 'series'): string {
  return type === 'movie' ? 'Movie' : 'Series';
}

function typeTone(type: 'movie' | 'series'): 'neutral' | 'info' {
  return type === 'movie' ? 'neutral' : 'info';
}

onMounted(() => void loadRequests(activeTab.value));
</script>

<template>
  <section class="requests" aria-labelledby="requests-heading">
    <PageHint :links="adminPageHelp.requests.links" :details="adminPageHelp.requests.details" title="Request Queue">
      Review and act on content requests from your users.
    </PageHint>

    <div class="requests__tabs" role="tablist" aria-label="Request status filter">
      <button
        role="tab"
        class="requests__tab"
        :class="{ 'requests__tab--active': activeTab === 'pending' }"
        :aria-selected="activeTab === 'pending'"
        @click="setTab('pending')"
      >
        Pending
      </button>
      <button
        role="tab"
        class="requests__tab"
        :class="{ 'requests__tab--active': activeTab === 'available' }"
        :aria-selected="activeTab === 'available'"
        @click="setTab('available')"
      >
        Available
      </button>
    </div>

    <div v-if="loading" class="requests__skel"><Skeleton variant="text" :lines="8" /></div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load requests"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadRequests(activeTab)">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="requests.length === 0"
      icon="list"
      title="No requests"
      description="No requests found for this status."
    />

    <div v-else class="requests__content">
      <div class="requests__table-wrap">
        <table class="requests__table" aria-label="Content requests">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Type</th>
              <th scope="col">TMDB ID</th>
              <th scope="col">Submitted</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in requests" :key="req.id">
              <td class="requests__title-cell">
                <span class="requests__title-text">{{ req.title }}</span>
                <span v-if="req.type === 'series' && req.season !== null" class="requests__episode">
                  S{{ req.season }}<span v-if="req.episode !== null">E{{ req.episode }}</span>
                </span>
              </td>
              <td>
                <Badge :tone="typeTone(req.type)">{{ typeLabel(req.type) }}</Badge>
              </td>
              <td class="requests__tmdb">{{ req.tmdb_id }}</td>
              <td class="requests__date">{{ formatDate(req.created_at) }}</td>
              <td>
                <Badge
                  :tone="
                    req.status === 'pending'
                      ? 'warning'
                      : req.status === 'available'
                        ? 'success'
                        : req.status === 'approved'
                          ? 'info'
                          : 'error'
                  "
                >{{ req.status }}</Badge>
              </td>
              <td class="requests__actions">
                <Button
                  v-if="activeTab === 'pending'"
                  variant="solid"
                  size="sm"
                  left-icon="check"
                  :loading="processingIds.has(req.id)"
                  :disabled="processingIds.has(req.id)"
                  @click="approveRequest(req.id)"
                >
                  Approve
                </Button>
                <Button
                  v-if="activeTab === 'pending'"
                  variant="ghost"
                  size="sm"
                  left-icon="x"
                  :loading="processingIds.has(req.id)"
                  :disabled="processingIds.has(req.id)"
                  class="requests__deny-btn"
                  @click="confirmDeny(req.id)"
                >
                  Deny
                </Button>
                <span v-if="activeTab === 'available'" class="requests__action-note">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.requests {
  max-width: 100%;
  margin: 0 auto;
  padding: var(--space-6);
}
.requests__head {
  margin-bottom: var(--space-6);
}
.requests__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}
.requests__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}
.requests__tabs {
  display: flex;
  gap: var(--space-1);
  margin-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}
.requests__tab {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-muted);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  margin-bottom: -1px;
}
.requests__tab:hover {
  color: var(--text);
}
.requests__tab--active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
.requests__skel {
  padding-block: var(--space-2);
}
.requests__table-wrap {
  overflow-x: auto;
}
.requests__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.requests__table th {
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
.requests__table td {
  padding: var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.requests__title-cell {
  max-width: 20rem;
}
.requests__title-text {
  display: block;
  font-weight: var(--font-medium);
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.requests__episode {
  display: block;
  font-size: var(--text-xs);
  color: var(--text-subtle);
  margin-top: var(--space-1);
}
.requests__tmdb {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  white-space: nowrap;
}
.requests__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.requests__actions {
  white-space: nowrap;
}
.requests__action-note {
  color: var(--text-subtle);
  font-size: var(--text-sm);
}
.requests__deny-btn {
  margin-left: var(--space-2);
  color: var(--error);
}
.requests__deny-btn:hover {
  background: var(--error-bg);
}
</style>
