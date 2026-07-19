<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 -->

<script setup lang="ts">
/**
 * ServerDetailPage — displays server detail dashboard with 4 sections:
 *   - Server Info
 *   - Relay Session (if active)
 *   - TLS Status (if FQDN exists)
 *   - Heartbeat History (collapsible table)
 *
 * Data: GET /api/v1/me/servers/{id}
 *
 * `client` is an injectable test seam; `id` is the route param.
 */
import { ref, onMounted, computed } from 'vue';
import { api, ApiClient } from '../api/client';
import { errMessage } from '../api/errors';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ServerInfo {
  id: string;
  server_name: string;
  version: string;
  status: string;
  last_seen_at: number;
  hostname_candidates: string[];
  relay_active: boolean;
  subdomain: string | null;
  fqdn: string | null;
}

interface RelaySession {
  id: string;
  worker_node: string;
  opened_at: string;
  bytes_in: number;
  bytes_out: number;
  last_frame_at: number;
}

interface HeartbeatEntry {
  id: string;
  version: string;
  uptime_seconds: number;
  active_sessions: number;
  active_transcodes: number;
  received_at: number;
}

interface TlsStatus {
  provisioned: boolean;
  cert_path: string;
  key_path: string;
  needs_renewal: boolean;
  expiry_days_remaining: number;
  fqdn: string;
}

interface ServerDetailResponse {
  server: ServerInfo;
  relay_session: RelaySession | null;
  heartbeat_history: HeartbeatEntry[];
  tls_status: TlsStatus | null;
}

// ---------------------------------------------------------------------------
// Props & setup
// ---------------------------------------------------------------------------

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
  /** Server ID from route param. */
  id: string;
}>();

const http: Pick<ApiClient, 'get'> = props.client ?? api;

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const server = ref<ServerInfo | null>(null);
const relaySession = ref<RelaySession | null>(null);
const heartbeats = ref<HeartbeatEntry[]>([]);
const tlsStatus = ref<TlsStatus | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const heartbeatExpanded = ref(false);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Unix timestamp → human-readable datetime. */
function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleString();
}

/** Unix timestamp → relative time (e.g. "3 minutes ago"). */
function formatRelativeTime(ts: number): string {
  const diff = Math.floor(Date.now() / 1000) - ts;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/** Bytes → human-readable (MB or KB). */
function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${Math.round(bytes / 1024 / 1024 * 100) / 100} MB`;
}

/** Uptime seconds → "Xd Xh Xm". */
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);
  return parts.join(' ');
}

/** ISO string → human-readable datetime. */
function formatIsoDate(isoStr: string): string {
  return new Date(isoStr).toLocaleString();
}

/** Status tone mapping. */
function statusTone(status: string): 'success' | 'warning' | 'error' | 'neutral' {
  switch (status.toLowerCase()) {
    case 'online':
    case 'connected':
      return 'success';
    case 'offline':
    case 'disconnected':
      return 'error';
    case 'degraded':
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
}

// ---------------------------------------------------------------------------
// Data loading
// ---------------------------------------------------------------------------

async function loadServer(initial = false): Promise<void> {
  if (initial) loading.value = true;
  error.value = null;
  try {
    const data = await http.get<ServerDetailResponse>(`/api/v1/me/servers/${props.id}`);
    server.value = data.server;
    relaySession.value = data.relay_session ?? null;
    heartbeats.value = data.heartbeat_history ?? [];
    tlsStatus.value = data.tls_status ?? null;
  } catch (e) {
    error.value = errMessage(e, 'Failed to load server details.');
  } finally {
    if (initial) loading.value = false;
  }
}

// ---------------------------------------------------------------------------
// Computed
// ---------------------------------------------------------------------------

const visibleHeartbeats = computed(() => {
  if (heartbeatExpanded.value) return heartbeats.value;
  return heartbeats.value.slice(0, 5);
});

onMounted(() => loadServer(true));
</script>

<template>
  <section class="server-detail" aria-labelledby="server-detail-heading">
    <!-- Back button -->
    <div class="server-detail__back">
      <Button variant="ghost" size="sm" left-icon="chevron-left" @click="$router.push('/app/servers')">
        Back to My Servers
      </Button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="server-detail__skeleton">
      <div class="server-detail__skeleton-card">
        <Skeleton variant="text" :lines="4" />
      </div>
      <div class="server-detail__skeleton-card">
        <Skeleton variant="text" :lines="4" />
      </div>
      <div class="server-detail__skeleton-card">
        <Skeleton variant="text" :lines="4" />
      </div>
      <div class="server-detail__skeleton-card">
        <Skeleton variant="text" :lines="4" />
      </div>
    </div>

    <!-- Error state -->
    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load server details"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadServer(true)">Retry</Button>
      </template>
    </EmptyState>

    <!-- Content -->
    <div v-else-if="server" class="server-detail__content">

      <!-- ================================================================
           1. Server Info Card (always shown)
           ================================================================ -->
      <article class="server-detail__card" aria-labelledby="server-info-heading">
        <header class="server-detail__card-header">
          <div class="server-detail__card-title-row">
            <h1 id="server-info-heading" class="server-detail__card-title">{{ server.server_name }}</h1>
            <div class="server-detail__badges">
              <Badge tone="neutral">{{ server.version }}</Badge>
              <Badge :tone="statusTone(server.status)">{{ server.status }}</Badge>
              <span
                class="server-detail__relay-indicator"
                :class="{ 'server-detail__relay-indicator--active': server.relay_active }"
                :title="server.relay_active ? 'Relay active' : 'Relay inactive'"
              >
                <span class="server-detail__relay-dot"></span>
                Relay
              </span>
            </div>
          </div>
        </header>

        <dl class="server-detail__info-list">
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Last seen</dt>
            <dd class="server-detail__info-value">{{ formatTimestamp(server.last_seen_at) }}</dd>
          </div>
          <div v-if="server.hostname_candidates.length > 0" class="server-detail__info-row">
            <dt class="server-detail__info-label">Hostname candidates</dt>
            <dd class="server-detail__info-value">
              <ul class="server-detail__hostnames">
                <li v-for="host in server.hostname_candidates" :key="host">{{ host }}</li>
              </ul>
            </dd>
          </div>
          <div v-if="server.subdomain" class="server-detail__info-row">
            <dt class="server-detail__info-label">Subdomain</dt>
            <dd class="server-detail__info-value server-detail__mono">{{ server.subdomain }}</dd>
          </div>
          <div v-if="server.fqdn" class="server-detail__info-row">
            <dt class="server-detail__info-label">FQDN</dt>
            <dd class="server-detail__info-value server-detail__mono">{{ server.fqdn }}</dd>
          </div>
        </dl>
      </article>

      <!-- ================================================================
           2. Relay Session Card (only if active)
           ================================================================ -->
      <article v-if="relaySession" class="server-detail__card" aria-labelledby="relay-session-heading">
        <header class="server-detail__card-header">
          <h2 id="relay-session-heading" class="server-detail__card-title">Relay Session</h2>
          <Badge tone="success">Active</Badge>
        </header>

        <dl class="server-detail__info-list">
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Worker node</dt>
            <dd class="server-detail__info-value server-detail__mono">{{ relaySession.worker_node }}</dd>
          </div>
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Session opened</dt>
            <dd class="server-detail__info-value">{{ formatIsoDate(relaySession.opened_at) }}</dd>
          </div>
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Data in</dt>
            <dd class="server-detail__info-value">{{ formatBytes(relaySession.bytes_in) }}</dd>
          </div>
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Data out</dt>
            <dd class="server-detail__info-value">{{ formatBytes(relaySession.bytes_out) }}</dd>
          </div>
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Last frame</dt>
            <dd class="server-detail__info-value">{{ formatRelativeTime(relaySession.last_frame_at) }}</dd>
          </div>
        </dl>
      </article>

      <!-- No relay session message -->
      <article v-else class="server-detail__card server-detail__card--muted" aria-labelledby="relay-session-heading">
        <header class="server-detail__card-header">
          <h2 id="relay-session-heading" class="server-detail__card-title">Relay Session</h2>
        </header>
        <p class="server-detail__empty-message">No active relay session.</p>
      </article>

      <!-- ================================================================
           3. TLS Status Card (only if TLS provisioned and FQDN exists)
           ================================================================ -->
      <article
        v-if="tlsStatus && server.fqdn"
        class="server-detail__card"
        aria-labelledby="tls-status-heading"
      >
        <header class="server-detail__card-header">
          <h2 id="tls-status-heading" class="server-detail__card-title">TLS Status</h2>
          <div class="server-detail__badges">
            <Badge :tone="tlsStatus.provisioned ? 'success' : 'error'">
              {{ tlsStatus.provisioned ? 'Provisioned' : 'Not provisioned' }}
            </Badge>
            <Badge v-if="tlsStatus.needs_renewal" tone="error">Needs renewal</Badge>
          </div>
        </header>

        <dl class="server-detail__info-list">
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Domain</dt>
            <dd class="server-detail__info-value server-detail__mono">{{ tlsStatus.fqdn }}</dd>
          </div>
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Expiry</dt>
            <dd class="server-detail__info-value">
              <span :class="{ 'server-detail__expired': tlsStatus.expiry_days_remaining <= 0 }">
                {{ tlsStatus.expiry_days_remaining > 0
                  ? `${tlsStatus.expiry_days_remaining} days remaining`
                  : 'Expired!' }}
              </span>
            </dd>
          </div>
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Certificate</dt>
            <dd class="server-detail__info-value server-detail__mono server-detail__path">{{ tlsStatus.cert_path }}</dd>
          </div>
          <div class="server-detail__info-row">
            <dt class="server-detail__info-label">Key</dt>
            <dd class="server-detail__info-value server-detail__mono server-detail__path">{{ tlsStatus.key_path }}</dd>
          </div>
        </dl>
      </article>

      <!-- ================================================================
           4. Heartbeat History Card
           ================================================================ -->
      <article class="server-detail__card" aria-labelledby="heartbeat-heading">
        <header class="server-detail__card-header">
          <div class="server-detail__card-title-row">
            <h2 id="heartbeat-heading" class="server-detail__card-title">Heartbeat History</h2>
            <Button
              v-if="heartbeats.length > 5"
              variant="ghost"
              size="sm"
              @click="heartbeatExpanded = !heartbeatExpanded"
            >
              {{ heartbeatExpanded ? 'Show less' : `Show all (${heartbeats.length})` }}
            </Button>
          </div>
        </header>

        <div v-if="heartbeats.length === 0" class="server-detail__empty-message">
          No heartbeat history available.
        </div>

        <div v-else class="server-detail__table-wrap">
          <table class="server-detail__table" aria-label="Heartbeat history">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Version</th>
                <th scope="col">Uptime</th>
                <th scope="col">Sessions</th>
                <th scope="col">Transcodes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hb in visibleHeartbeats" :key="hb.id">
                <td class="server-detail__date">{{ formatTimestamp(hb.received_at) }}</td>
                <td><Badge tone="neutral">{{ hb.version }}</Badge></td>
                <td class="server-detail__uptime">{{ formatUptime(hb.uptime_seconds) }}</td>
                <td class="server-detail__num">{{ hb.active_sessions }}</td>
                <td class="server-detail__num">{{ hb.active_transcodes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

    </div>
  </section>
</template>

<style scoped>
.server-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-6);
}

.server-detail__back {
  margin-bottom: var(--space-4);
}

/* Skeleton */
.server-detail__skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.server-detail__skeleton-card {
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

/* Content layout */
.server-detail__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Card */
.server-detail__card {
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.server-detail__card--muted {
  opacity: 0.7;
}

.server-detail__card-header {
  margin-bottom: var(--space-4);
}

.server-detail__card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.server-detail__card-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0;
}

.server-detail__badges {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

/* Relay indicator */
.server-detail__relay-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.server-detail__relay-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-subtle);
  transition: background var(--dur-fast) var(--ease-out);
}

.server-detail__relay-indicator--active .server-detail__relay-dot {
  background: var(--green-11);
  box-shadow: 0 0 0 2px var(--green-5);
}

/* Info list */
.server-detail__info-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
}

.server-detail__info-row {
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: var(--space-4);
  align-items: baseline;
}

.server-detail__info-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  flex-shrink: 0;
}

.server-detail__info-value {
  font-size: var(--text-sm);
  color: var(--text-muted);
  word-break: break-word;
}

.server-detail__mono {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
}

.server-detail__path {
  color: var(--text-subtle);
  word-break: break-all;
}

.server-detail__hostnames {
  list-style: disc;
  margin: 0;
  padding-left: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.server-detail__expired {
  color: var(--red-11);
  font-weight: var(--font-semibold);
}

/* Empty message */
.server-detail__empty-message {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}

/* Table */
.server-detail__table-wrap {
  overflow-x: auto;
}

.server-detail__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.server-detail__table th {
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

.server-detail__table td {
  padding: var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}

.server-detail__table tr:last-child td {
  border-bottom: none;
}

.server-detail__date,
.server-detail__uptime,
.server-detail__num {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.server-detail__date {
  color: var(--text-subtle);
}

.server-detail__uptime {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
}

/* Responsive */
@media (max-width: 600px) {
  .server-detail__info-row {
    grid-template-columns: 1fr;
    gap: var(--space-1);
  }
}
</style>
