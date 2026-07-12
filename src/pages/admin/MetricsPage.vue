<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin MetricsPage (S3) — live server traffic graphs powered by ApexCharts.
 * Four charts + two tables:
 *   1. Area chart  — bandwidth in/out (Mbps) from history data
 *   2. Line chart  — p50 / p95 / p99 latency from history data
 *   3. Line+bar chart — request rate + error rate from history data
 *   4. Connections table — live connections with inline throughput bars
 *   5. Slow-routes table — top N routes by max latency
 *
 * Polling: snapshot + connections every 5s; history + routes every 15s.
 * ApexCharts and vue3-apexcharts are lazy-imported so they stay in their
 * own chunk and do not bloat the main bundle for users who never visit this page.
 *
 * UI-3.4 [U-B4] — apex dedupe: we import the `vue3-apexcharts/core` wrapper, NOT
 * the default `vue3-apexcharts` entry. The default entry carries a dynamic
 * `import("./apexcharts.ssr.esm-*.js")` — a self-contained ~626 KB SSR copy of
 * ApexCharts for the onServerPrefetch/SSR path — that Rollup always emits as a
 * chunk. Phlix is a client-only SPA that never server-prefetches, so that copy is
 * dead weight AND double-ships alongside the browser build. The `/core` wrapper
 * instead statically imports `apexcharts/core` (the browser build) and bundles a
 * SINGLE apex copy. See vite.config.ts (apexcharts is NOT externalized so the one
 * copy is self-contained in dist) and src/__tests__/dist-apex-dedupe.test.ts.
 */
import { ref, computed, onMounted, onBeforeUnmount, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminMetricsApi,
  type MetricsSnapshot,
  type MetricsHistoryBucket,
  type MetricsConnection,
  type MetricsRoute,
} from '../../api/admin/metrics';
import { AdminServersApi, type ServerListItem, type ServerInfo } from '../../api/admin/servers';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Badge from '../../components/ui/Badge.vue';
import ServerInfoCard from '../../components/admin/ServerInfo.vue';
import ServerSelector from '../../components/admin/ServerSelector.vue';
import NetworkHealthIndicator from '../../components/NetworkHealthIndicator.vue';
import { defineAsyncComponent } from 'vue';

// Lazy-load the ApexCharts wrapper so the library lands in its own chunk.
// Use the `/core` entry (browser build via `apexcharts/core`) — NOT the default
// entry, which would drag in the ~626 KB `apexcharts.ssr.esm-*` SSR copy (UI-3.4).
const VueApexCharts = defineAsyncComponent(() => import('vue3-apexcharts/core'));

// ---------------------------------------------------------------------------
// Props / API setup
// ---------------------------------------------------------------------------

type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminMetricsApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const serversApi = new AdminServersApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ---------------------------------------------------------------------------
// Polling intervals
// ---------------------------------------------------------------------------

const SNAPSHOT_POLL_MS = 5_000;
const HISTORY_POLL_MS = 15_000;

let snapshotTimer: ReturnType<typeof setInterval> | null = null;
let connectionsTimer: ReturnType<typeof setInterval> | null = null;
let historyTimer: ReturnType<typeof setInterval> | null = null;
let routesTimer: ReturnType<typeof setInterval> | null = null;

// ---------------------------------------------------------------------------
// Section data
// ---------------------------------------------------------------------------

const snapshot = ref<MetricsSnapshot | null>(null);
const history = ref<MetricsHistoryBucket[]>([]);
const connections = ref<MetricsConnection[]>([]);
const routes = ref<MetricsRoute[]>([]);

const loadingSnapshot = ref(true);
const loadingHistory = ref(true);
const loadingConnections = ref(true);
const loadingRoutes = ref(true);

const snapshotError = ref<string | null>(null);
const historyError = ref<string | null>(null);
const connectionsError = ref<string | null>(null);
const routesError = ref<string | null>(null);

// Server list + selection (for multi-server setups)
const servers = ref<ServerListItem[]>([]);
const serverInfo = ref<ServerInfo | null>(null);
const selectedServerId = ref<string | null>(null);
const loadingServers = ref(true);
const loadingServerInfo = ref(true);
const serversError = ref<string | null>(null);
const serverInfoError = ref<string | null>(null);

// ---------------------------------------------------------------------------
// Chart series helpers
// ---------------------------------------------------------------------------

/** Convert bytes/s to Mbps (megaBITS/s): bytes×8 ÷ 1e6. */
function bpsToMbps(bps: number): number {
  return (bps * 8) / 1_000_000;
}

/** Parse a server datetime bucket ("Y-m-d H:i:s") to epoch ms, or NaN. */
function bucketToMs(bucket: string): number {
  // Normalise the SQL "space" separator to ISO so Date.parse is deterministic.
  return Date.parse(bucket.replace(' ', 'T'));
}

/** History bucket timestamps as clock strings for the ApexCharts xaxis. */
const historyLabels = computed<string[]>(() =>
  history.value.map((b) => {
    const ms = bucketToMs(b.bucket);
    const d = new Date(Number.isFinite(ms) ? ms : 0);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }),
);

/** Bandwidth area chart series. */
const bandwidthSeries = computed(() => [
  {
    name: 'In (Mbps)',
    data: history.value.map((b) => Number(bpsToMbps(b.bytes_in).toFixed(3))),
  },
  {
    name: 'Out (Mbps)',
    data: history.value.map((b) => Number(bpsToMbps(b.bytes_out).toFixed(3))),
  },
]);

/** Latency line chart series (ms). */
const latencySeries = computed(() => [
  { name: 'p50', data: history.value.map((b) => b.p50_ms) },
  { name: 'p95', data: history.value.map((b) => b.p95_ms) },
]);

/** Request + error rate chart series. */
const requestSeries = computed(() => [
  { name: 'Requests', data: history.value.map((b) => b.requests) },
  { name: 'Errors', data: history.value.map((b) => b.errors) },
]);

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** Format bytes/s as Mbps. */
function formatMbps(bps: number): string {
  return `${bpsToMbps(bps).toFixed(2)} Mbps`;
}

/** Format a Unix timestamp (seconds) as a relative time string. */
function relativeTime(epochSeconds: number): string {
  const diff = Math.floor((Date.now() / 1000) - epochSeconds);
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

/** "Started" cell: a server datetime string → relative time, or "—" if unparseable. */
function openedAgo(openedAt: string): string {
  const ms = bucketToMs(openedAt);
  if (!Number.isFinite(ms)) return '—';
  return relativeTime(Math.floor(ms / 1000));
}

/** ms tone: green under 100, yellow under 500, red otherwise. */
function latencyTone(ms: number): BadgeTone {
  if (ms < 100) return 'success';
  if (ms < 500) return 'warning';
  return 'error';
}

/** Method badge tone. */
function methodTone(method: string): BadgeTone {
  switch ((method ?? '').toUpperCase()) {
    case 'GET':
      return 'accent';
    case 'POST':
      return 'success';
    case 'PUT':
    case 'PATCH':
      return 'warning';
    case 'DELETE':
      return 'error';
    default:
      return 'neutral';
  }
}

// ---------------------------------------------------------------------------
// Fetchers
// ---------------------------------------------------------------------------

async function fetchSnapshot(): Promise<void> {
  snapshotError.value = null;
  try {
    snapshot.value = await api.getSnapshot(60);
  } catch (e) {
    snapshotError.value = errMessage(e, 'Failed to load metrics snapshot.');
    toasts.error(snapshotError.value);
  } finally {
    loadingSnapshot.value = false;
  }
}

async function fetchHistory(): Promise<void> {
  historyError.value = null;
  try {
    history.value = await api.getHistory(60, 60);
  } catch (e) {
    historyError.value = errMessage(e, 'Failed to load history.');
    toasts.error(historyError.value);
  } finally {
    loadingHistory.value = false;
  }
}

async function fetchConnections(): Promise<void> {
  connectionsError.value = null;
  try {
    connections.value = await api.getConnections(15);
  } catch (e) {
    connectionsError.value = errMessage(e, 'Failed to load connections.');
    toasts.error(connectionsError.value);
  } finally {
    loadingConnections.value = false;
  }
}

async function fetchRoutes(): Promise<void> {
  routesError.value = null;
  try {
    routes.value = await api.getRoutes(15, 20);
  } catch (e) {
    routesError.value = errMessage(e, 'Failed to load routes.');
    toasts.error(routesError.value);
  } finally {
    loadingRoutes.value = false;
  }
}

async function fetchServers(): Promise<void> {
  serversError.value = null;
  try {
    servers.value = await serversApi.listServers();
  } catch (e) {
    serversError.value = errMessage(e, 'Failed to load servers.');
    toasts.error(serversError.value);
  } finally {
    loadingServers.value = false;
  }
}

async function fetchServerInfo(id: string | null): Promise<void> {
  serverInfoError.value = null;
  if (!id) {
    serverInfo.value = null;
    loadingServerInfo.value = false;
    return;
  }
  try {
    serverInfo.value = await serversApi.getServerInfo(id);
  } catch (e) {
    serverInfoError.value = errMessage(e, 'Failed to load server info.');
    toasts.error(serverInfoError.value);
  } finally {
    loadingServerInfo.value = false;
  }
}

/** Watcher to re-fetch server info when the selected server changes. */
function handleServerChange(id: string | null): void {
  selectedServerId.value = id;
  loadingServerInfo.value = true;
  void fetchServerInfo(id);
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Visibility-aware polling: pause timers when the tab is hidden to avoid
// wasting CPU/bandwidth and restart them when the tab becomes visible again.
// ---------------------------------------------------------------------------

function pausePolling(): void {
  if (snapshotTimer !== null) { clearInterval(snapshotTimer); snapshotTimer = null; }
  if (connectionsTimer !== null) { clearInterval(connectionsTimer); connectionsTimer = null; }
  if (historyTimer !== null) { clearInterval(historyTimer); historyTimer = null; }
  if (routesTimer !== null) { clearInterval(routesTimer); routesTimer = null; }
}

function resumePolling(): void {
  if (snapshotTimer === null) snapshotTimer = setInterval(() => void fetchSnapshot(), SNAPSHOT_POLL_MS);
  if (connectionsTimer === null) connectionsTimer = setInterval(() => void fetchConnections(), SNAPSHOT_POLL_MS);
  if (historyTimer === null) historyTimer = setInterval(() => void fetchHistory(), HISTORY_POLL_MS);
  if (routesTimer === null) routesTimer = setInterval(() => void fetchRoutes(), HISTORY_POLL_MS);
}

function handleVisibilityChange(): void {
  if (document.hidden) {
    pausePolling();
  } else {
    resumePolling();
  }
}

onMounted(() => {
  void fetchServers();
  void fetchSnapshot();
  void fetchHistory();
  void fetchConnections();
  void fetchRoutes();

  resumePolling();

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
});

onBeforeUnmount(() => {
  pausePolling();
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }
});

// ---------------------------------------------------------------------------
// Chart config (reusable options objects)
// ---------------------------------------------------------------------------

const chartDefaults = {
  toolbar: { show: false },
  zoom: { enabled: false },
  animations: { enabled: true, easing: 'easeinout', speed: 400 },
  stroke: { curve: 'smooth', width: 2 },
  dataLabels: { enabled: false },
  tooltip: { x: { show: true } },
} as const;

const xaxisDefaults = computed(() => ({
  categories: historyLabels.value,
  labels: { show: true, rotate: -30, style: { fontSize: '11px' } },
  axisBorder: { show: false },
  axisTicks: { show: false },
}));

const yaxisDefaults = (unit: string) =>
  ({
    labels: {
      formatter: (v: number) => `${v}${unit}`,
      style: { fontSize: '11px' },
    },
  }) as const;

const gridDefaults = {
  borderColor: 'var(--border-subtle)',
  strokeDashArray: 3,
  xaxis: { lines: { show: false } },
  yaxis: { lines: { show: true } },
} as const;
</script>

<template>
  <section class="metrics" aria-labelledby="metrics-heading">
    <header class="metrics__head">
      <div class="metrics__title-row">
        <h1 id="metrics-heading" class="metrics__title">Server Traffic</h1>
        <ServerSelector
          v-model="selectedServerId"
          :servers="servers"
          :loading="loadingServers"
          @change="handleServerChange"
        />
        <NetworkHealthIndicator />
      </div>
      <div class="metrics__snapshot" v-if="snapshot !== null && !loadingSnapshot">
        <Badge tone="accent">{{ snapshot.active_connections }} active connections</Badge>
        <span class="metrics__rate">
          {{ formatMbps(snapshot.bytes_in_per_sec) }} in /
          {{ formatMbps(snapshot.bytes_out_per_sec) }} out
        </span>
        <span class="metrics__rate">
          {{ snapshot.requests_per_sec.toFixed(1) }} req/s
          &middot;
          {{ (snapshot.error_rate * 100).toFixed(2) }}% errors
        </span>
        <span class="metrics__latency">
          p50 {{ snapshot.p50_ms }}ms /
          p95 {{ snapshot.p95_ms }}ms /
          p99 {{ snapshot.p99_ms }}ms
        </span>
      </div>
    </header>

    <PageHint>
      Real-time server traffic graphs. <strong>Bandwidth</strong> shows in/out throughput,
      <strong>Latency</strong> shows response-time percentiles, and
      <strong>Request Rate</strong> shows requests vs. errors over time. Data refreshes
      automatically — snapshot every 5s, history every 15s.
    </PageHint>

    <!-- Server Info Card -->
    <div v-if="servers.length > 0" class="metrics__server-info">
      <ServerInfoCard
        :server-info="serverInfo"
        :loading="loadingServerInfo"
      />
    </div>

    <!-- Snapshot loading skeleton -->
    <div v-if="loadingSnapshot" class="metrics__snapshot-skel">
      <Skeleton variant="text" :lines="1" />
    </div>

    <!-- Charts grid -->
    <div class="metrics__grid">
      <!-- Bandwidth area chart -->
      <section class="metrics__card metrics__card--full" aria-labelledby="bw-heading">
        <header class="metrics__card-head">
          <h2 id="bw-heading" class="metrics__card-title">Bandwidth</h2>
          <Badge tone="neutral">Mbps</Badge>
        </header>
        <div v-if="loadingHistory" class="metrics__skel"><Skeleton variant="text" :lines="6" /></div>
        <EmptyState
          v-else-if="historyError"
          icon="alert"
          title="Couldn't load bandwidth history"
          :description="historyError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="fetchHistory">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState
          v-else-if="history.length === 0"
          icon="speed"
          title="No bandwidth data yet"
        />
        <VueApexCharts
          v-else
          type="area"
          height="220"
          :options="{
            ...chartDefaults,
            chart: { id: 'bandwidth', group: 'metrics', type: 'area' },
            colors: ['#22c55e', '#3b82f6'],
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
            xaxis: xaxisDefaults,
            yaxis: yaxisDefaults(' Mbps'),
            grid: gridDefaults,
            legend: { show: true, position: 'top', horizontalAlign: 'right' },
          }"
          :series="bandwidthSeries"
        />
      </section>

      <!-- Latency line chart -->
      <section class="metrics__card" aria-labelledby="lat-heading">
        <header class="metrics__card-head">
          <h2 id="lat-heading" class="metrics__card-title">Latency</h2>
          <Badge tone="neutral">ms</Badge>
        </header>
        <div v-if="loadingHistory" class="metrics__skel"><Skeleton variant="text" :lines="4" /></div>
        <EmptyState
          v-else-if="historyError"
          icon="alert"
          title="Couldn't load latency history"
          :description="historyError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="fetchHistory">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState v-else-if="history.length === 0" icon="speed" title="No latency data yet" />
        <VueApexCharts
          v-else
          type="line"
          height="200"
          :options="{
            ...chartDefaults,
            chart: { id: 'latency', group: 'metrics', type: 'line' },
            colors: ['#a78bfa', '#f97316'],
            xaxis: xaxisDefaults,
            yaxis: yaxisDefaults(' ms'),
            grid: gridDefaults,
            legend: { show: true, position: 'top', horizontalAlign: 'right' },
          }"
          :series="latencySeries"
        />
      </section>

      <!-- Request + error rate -->
      <section class="metrics__card" aria-labelledby="req-heading">
        <header class="metrics__card-head">
          <h2 id="req-heading" class="metrics__card-title">Request Rate</h2>
          <Badge tone="neutral">req</Badge>
        </header>
        <div v-if="loadingHistory" class="metrics__skel"><Skeleton variant="text" :lines="4" /></div>
        <EmptyState
          v-else-if="historyError"
          icon="alert"
          title="Couldn't load request history"
          :description="historyError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="fetchHistory">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState
          v-else-if="history.length === 0"
          icon="speed"
          title="No request data yet"
        />
        <VueApexCharts
          v-else
          type="line"
          height="200"
          :options="{
            ...chartDefaults,
            chart: { id: 'requests', group: 'metrics', type: 'line' },
            colors: ['#06b6d4', '#ef4444'],
            xaxis: xaxisDefaults,
            yaxis: yaxisDefaults(''),
            grid: gridDefaults,
            legend: { show: true, position: 'top', horizontalAlign: 'right' },
            markers: { size: 0 },
          }"
          :series="requestSeries"
        />
      </section>

      <!-- Live Connections -->
      <section class="metrics__card metrics__card--full" aria-labelledby="conn-heading">
        <header class="metrics__card-head">
          <h2 id="conn-heading" class="metrics__card-title">Live Connections</h2>
          <Badge v-if="connections.length > 0" tone="accent" :label="`${connections.length} active`">
            {{ connections.length }}
          </Badge>
        </header>
        <div v-if="loadingConnections" class="metrics__skel"><Skeleton variant="text" :lines="4" /></div>
        <EmptyState
          v-else-if="connectionsError"
          icon="alert"
          title="Couldn't load connections"
          :description="connectionsError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="fetchConnections">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState
          v-else-if="connections.length === 0"
          icon="speed"
          title="No active connections"
        />
        <table v-else class="metrics__table" aria-label="Live connections">
          <thead>
            <tr>
              <th scope="col">Remote</th>
              <th scope="col">User</th>
              <th scope="col">Kind</th>
              <th scope="col">Started</th>
              <th scope="col" class="metrics__th--bar">Throughput (in / out)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in connections" :key="c.id">
              <td class="metrics__mono">{{ c.remote_ip || '—' }}</td>
              <td class="metrics__mono">{{ c.user_id ?? '—' }}</td>
              <td><Badge tone="neutral">{{ c.kind }}</Badge></td>
              <td class="metrics__muted">{{ openedAgo(c.opened_at) }}</td>
              <td class="metrics__bar-cell">
                <div class="metrics__bar-row">
                  <div class="metrics__bar-wrap">
                    <div
                      class="metrics__bar metrics__bar--in"
                      :style="{ width: `${Math.min(100, bpsToMbps(c.bytes_in_rate))}%` }"
                      :title="`In: ${formatMbps(c.bytes_in_rate)}`"
                    />
                  </div>
                  <span class="metrics__bar-label">{{ formatMbps(c.bytes_in_rate) }}</span>
                </div>
                <div class="metrics__bar-row">
                  <div class="metrics__bar-wrap">
                    <div
                      class="metrics__bar metrics__bar--out"
                      :style="{ width: `${Math.min(100, bpsToMbps(c.bytes_out_rate))}%` }"
                      :title="`Out: ${formatMbps(c.bytes_out_rate)}`"
                    />
                  </div>
                  <span class="metrics__bar-label">{{ formatMbps(c.bytes_out_rate) }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Slow Routes -->
      <section class="metrics__card metrics__card--full" aria-labelledby="routes-heading">
        <header class="metrics__card-head">
          <h2 id="routes-heading" class="metrics__card-title">Top Routes by Latency</h2>
        </header>
        <div v-if="loadingRoutes" class="metrics__skel"><Skeleton variant="text" :lines="4" /></div>
        <EmptyState
          v-else-if="routesError"
          icon="alert"
          title="Couldn't load routes"
          :description="routesError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="fetchRoutes">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState v-else-if="routes.length === 0" icon="speed" title="No route data yet" />
        <table v-else class="metrics__table" aria-label="Top routes by latency">
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Route</th>
              <th scope="col">Requests</th>
              <th scope="col">Errors</th>
              <th scope="col">Avg ms</th>
              <th scope="col">Max ms</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in routes" :key="`${r.method}:${r.route}`">
              <td><Badge :tone="methodTone(r.method)">{{ r.method }}</Badge></td>
              <td class="metrics__mono metrics__route">{{ r.route }}</td>
              <td class="metrics__mono">{{ r.request_count.toLocaleString() }}</td>
              <td>
                <Badge v-if="r.error_count > 0" tone="error">{{ r.error_count }}</Badge>
                <span v-else class="metrics__muted">0</span>
              </td>
              <td class="metrics__mono">{{ r.avg_ms }}ms</td>
              <td class="metrics__mono">
                <Badge :tone="latencyTone(r.max_ms)">{{ r.max_ms }}ms</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>
</template>

<style scoped>
.metrics {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.metrics__head {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.metrics__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
}
.metrics__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.metrics__snapshot {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  font-size: var(--text-sm);
}
.metrics__rate {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-muted);
}
.metrics__latency {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.metrics__snapshot-skel {
  margin-bottom: var(--space-4);
  max-width: 400px;
}
.metrics__server-info {
  margin-bottom: var(--space-6);
}
.metrics__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-5);
}
.metrics__card {
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.metrics__card--full {
  grid-column: 1 / -1;
}
.metrics__card-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.metrics__card-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.metrics__skel {
  padding-block: var(--space-2);
}

/* Tables */
.metrics__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.metrics__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.metrics__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.metrics__mono {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: var(--text-xs);
}
.metrics__muted {
  color: var(--text-subtle);
  font-size: var(--text-xs);
}
.metrics__route {
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Throughput bars */
.metrics__th--bar {
  min-width: 180px;
}
.metrics__bar-cell {
  padding-block: var(--space-2);
}
.metrics__bar-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: 2px;
}
.metrics__bar-wrap {
  flex: 1;
  height: 0.35rem;
  border-radius: var(--radius-full);
  background: var(--surface-3);
  overflow: hidden;
}
.metrics__bar {
  height: 100%;
  border-radius: var(--radius-full);
  min-width: 2px;
}
.metrics__bar--in {
  background: #22c55e;
}
.metrics__bar--out {
  background: #3b82f6;
}
.metrics__bar-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
  min-width: 70px;
}

@media (max-width: 640px) {
  .metrics__grid {
    grid-template-columns: 1fr;
  }
  .metrics__th--bar {
    min-width: 140px;
  }
}
</style>
