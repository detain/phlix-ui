<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Hub admin HubDashboardPage (H0) — the hub's admin landing surface. Unlike the
 * media-server `DashboardPage` (now-playing / top-media / storage), this renders
 * hub-scoped operational metrics: the server fleet (total + online/offline),
 * active relay sessions, pending requests, and the user count, plus a recent
 * audit-event feed. Built on the `@phlix/ui` primitives. Errors surface as toasts
 * and a recoverable in-body EmptyState; there is no auto-refresh timer.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminHubDashboardApi,
  type HubSummary,
  type HubAuditEvent,
} from '../../api/admin/hubDashboard';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import { adminPageHelp } from './helpLinks';
import Button from '../../components/ui/Button.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';

const ACTIVITY_LIMIT = 20;

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminHubDashboardApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const summary = ref<HubSummary | null>(null);
const activity = ref<HubAuditEvent[]>([]);

const loadingSummary = ref(true);
const loadingActivity = ref(true);

const summaryError = ref<string | null>(null);
const activityError = ref<string | null>(null);

/** Metric cards derived from the summary (0 while loading / on error). */
const metrics = computed(() => {
  const s = summary.value;
  return [
    { key: 'servers', label: 'Servers', value: s?.servers.total ?? 0 },
    { key: 'online', label: 'Online', value: s?.servers.online ?? 0 },
    { key: 'sessions', label: 'Active Relays', value: s?.activeRelaySessions ?? 0 },
    { key: 'requests', label: 'Pending Requests', value: s?.pendingRequests ?? 0 },
    { key: 'users', label: 'Users', value: s?.userCount ?? 0 },
  ];
});

const offlineCount = computed(() => summary.value?.servers.offline ?? 0);

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

/** Return a relative time string like "2m ago". */
function relativeTime(isoDate: string): string {
  const t = new Date(isoDate).getTime();
  if (!Number.isFinite(t)) return '';
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// ---------------------------------------------------------------------------
// Fetchers
// ---------------------------------------------------------------------------

async function fetchSummary(): Promise<void> {
  loadingSummary.value = true;
  summaryError.value = null;
  try {
    summary.value = await api.getSummary();
  } catch (e) {
    summaryError.value = errMessage(e, 'Failed to load hub summary.');
    toasts.error(summaryError.value);
  } finally {
    loadingSummary.value = false;
  }
}

async function fetchActivity(): Promise<void> {
  loadingActivity.value = true;
  activityError.value = null;
  try {
    activity.value = await api.getRecentActivity(ACTIVITY_LIMIT);
  } catch (e) {
    activityError.value = errMessage(e, 'Failed to load recent activity.');
    toasts.error(activityError.value);
  } finally {
    loadingActivity.value = false;
  }
}

onMounted(() => {
  void fetchSummary();
  void fetchActivity();
});
</script>

<template>
  <section class="hub-dash" aria-labelledby="hub-dash-heading">
    <header class="hub-dash__head">
      <h1 id="hub-dash-heading" class="hub-dash__title">Dashboard</h1>
    </header>

    <PageHint :links="adminPageHelp['hub-dashboard'].links" :details="adminPageHelp['hub-dashboard'].details">
      An at-a-glance view of your hub's health: how many <strong>servers</strong> are connected,
      active <strong>relay sessions</strong>, <strong>pending requests</strong>, and total
      <strong>users</strong>, plus a feed of recent audit activity. If a section fails to load,
      use its <strong>Retry</strong> button to fetch it again.
    </PageHint>

    <!-- Metric cards -->
    <div v-if="loadingSummary" class="hub-dash__metrics-skel"><Skeleton variant="text" :lines="2" /></div>
    <EmptyState
      v-else-if="summaryError"
      icon="alert"
      title="Couldn't load hub summary"
      :description="summaryError"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="fetchSummary">Retry</Button>
      </template>
    </EmptyState>
    <div v-else class="hub-dash__metrics">
      <div v-for="m in metrics" :key="m.key" class="hub-dash__metric">
        <span class="hub-dash__metric-label">{{ m.label }}</span>
        <span class="hub-dash__metric-value">{{ m.value.toLocaleString() }}</span>
        <Badge v-if="m.key === 'servers' && offlineCount > 0" tone="warning">
          {{ offlineCount }} offline
        </Badge>
      </div>
    </div>

    <!-- Recent Activity -->
    <section class="hub-dash__card" aria-labelledby="hub-act-heading">
      <header class="hub-dash__card-head">
        <h2 id="hub-act-heading" class="hub-dash__card-title">Recent Activity</h2>
      </header>
      <div v-if="loadingActivity" class="hub-dash__skel"><Skeleton variant="text" :lines="5" /></div>
      <EmptyState
        v-else-if="activityError"
        icon="alert"
        title="Couldn't load activity"
        :description="activityError"
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="rewind" @click="fetchActivity">Retry</Button>
        </template>
      </EmptyState>
      <EmptyState v-else-if="activity.length === 0" icon="list" title="No recent activity" />
      <ul v-else class="hub-dash__activity-list" role="list">
        <li v-for="e in activity" :key="e.id" class="hub-dash__activity-item">
          <Badge tone="neutral">{{ e.action }}</Badge>
          <span class="hub-dash__activity-actor">{{ e.actor }}</span>
          <span v-if="e.target" class="hub-dash__activity-target" :title="e.target">{{ e.target }}</span>
          <time class="hub-dash__activity-time" :datetime="e.created_at" :title="e.created_at">
            {{ relativeTime(e.created_at) }}
          </time>
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.hub-dash {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.hub-dash__head {
  margin-bottom: var(--space-6);
}
.hub-dash__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.hub-dash__metrics-skel {
  margin-bottom: var(--space-6);
}
.hub-dash__metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.hub-dash__metric {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.hub-dash__metric-label {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-subtle);
}
.hub-dash__metric-value {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  font-variant-numeric: tabular-nums;
  color: var(--text);
}
.hub-dash__card {
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.hub-dash__card-head {
  margin-bottom: var(--space-4);
}
.hub-dash__card-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.hub-dash__skel {
  padding-block: var(--space-2);
}
.hub-dash__activity-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.hub-dash__activity-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}
.hub-dash__activity-actor {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.hub-dash__activity-target {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-muted);
}
.hub-dash__activity-time {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  white-space: nowrap;
  margin-left: auto;
}
</style>
