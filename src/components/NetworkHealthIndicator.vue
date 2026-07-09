<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * NetworkHealthIndicator (P3B-S7) — small status badge for the app header.
 *
 * Displays a colored dot (green/yellow/red) reflecting the combined relay + hub +
 * network health status. Hover/focus shows a detailed tooltip with relay tunnel
 * state, hub heartbeat metrics, active sessions, and network latency.
 *
 * Green  = healthy:  latency < 100ms, relay connected, no heartbeat failures
 * Yellow = degraded: latency 100-500ms OR some relay issues OR heartbeat failures
 * Red    = offline:  latency > 500ms OR relay disconnected OR not enrolled
 *
 * Polls `/api/v1/health/relay` + `/api/v1/health/network` every 30 seconds.
 * Shows a spinner while the first request is in-flight.
 */
import { ref, computed, onMounted, onUnmounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../api/client';
import { LocalStorageTokenStore } from '../api/tokenStore';
import { AdminNetworkHealthApi, type HealthSnapshot } from '../api/admin/networkHealth';
import { errMessage } from '../api/errors';
import Tooltip from './ui/Tooltip.vue';
import Icon from './Icon.vue';
import Spinner from './ui/Spinner.vue';

const POLL_INTERVAL_MS = 30_000;

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminNetworkHealthApi(
  new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);

// ── State ───────────────────────────────────────────────────────────────────

const health = ref<HealthSnapshot | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
let pollTimer: ReturnType<typeof setInterval> | undefined;

// ── Computed health status ─────────────────────────────────────────────────

/**
 * Derive the composite health status from all three signals:
 * - network latency
 * - relay tunnel state
 * - hub heartbeat failures
 */
const status = computed<'healthy' | 'degraded' | 'offline'>(() => {
  if (health.value === null) return 'offline';
  const { relay, hub, network } = health.value;

  // Offline: not enrolled, relay disconnected, or network error
  if (!hub.isEnrolled) return 'offline';
  if (!relay.connected) return 'offline';
  if (network.status === 'offline') return 'offline';

  // Degraded: elevated latency, relay issues, or heartbeat failures
  if (network.latencyMs !== null && network.latencyMs > 500) return 'offline';
  if (network.status === 'degraded') return 'degraded';
  if (relay.reconnectAttempts > 0) return 'degraded';
  if (hub.consecutiveFailures > 0) return 'degraded';

  // Healthy
  if (network.latencyMs !== null && network.latencyMs < 100) return 'healthy';
  return 'degraded'; // assume degraded if we can't determine healthy
});

/** Icon name for the current status. */
const iconName = computed(() => {
  switch (status.value) {
    case 'healthy':  return 'check';
    case 'degraded': return 'alert';
    case 'offline':  return 'error';
    default:         return 'error';
  }
});

/** Human-readable label for the status. */
const statusLabel = computed(() => {
  switch (status.value) {
    case 'healthy':  return 'Network Healthy';
    case 'degraded': return 'Network Degraded';
    case 'offline':  return 'Network Offline';
    default:         return 'Network Offline';
  }
});

// ── Tooltip content ─────────────────────────────────────────────────────────

const tooltipContent = computed(() => {
  if (health.value === null) {
    return loading.value ? 'Loading health status…' : 'Unable to load health status';
  }
  const { relay, hub, network } = health.value;
  const lines = [
    `Relay: ${relay.connected ? (relay.active ? 'Connected' : 'Connecting…') : 'Disconnected'}`,
    `Relay Sessions: ${relay.activeSessions}`,
  ];
  if (relay.lastDisconnectTime) {
    lines.push(`Last disconnect: ${formatRelativeTime(relay.lastDisconnectTime)}`);
  }
  lines.push('');
  lines.push(`Hub enrolled: ${hub.isEnrolled ? 'Yes' : 'No'}`);
  if (hub.lastSuccessfulHeartbeat) {
    lines.push(`Last heartbeat: ${formatRelativeTime(hub.lastSuccessfulHeartbeat)}`);
  }
  if (hub.consecutiveFailures > 0) {
    lines.push(`Heartbeat failures: ${hub.consecutiveFailures}`);
  }
  lines.push('');
  if (network.latencyMs !== null) {
    lines.push(`Latency: ${network.latencyMs}ms (${network.status})`);
  } else if (network.error) {
    lines.push(`Network error: ${network.error}`);
  } else {
    lines.push('Latency: unknown');
  }
  lines.push(`Measured: ${formatRelativeTime(network.measuredAt)}`);
  return lines.join('\n');
});

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatRelativeTime(isoDate: string): string {
  const t = new Date(isoDate).getTime();
  if (!Number.isFinite(t)) return 'never';
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// ── Polling ─────────────────────────────────────────────────────────────────

async function fetchHealth(): Promise<void> {
  try {
    health.value = await api.getHealthSnapshot();
    error.value = null;
  } catch (e) {
    error.value = errMessage(e, 'Failed to fetch health');
  } finally {
    loading.value = false;
  }
}

function startPolling(): void {
  void fetchHealth();
  pollTimer = setInterval(() => { void fetchHealth(); }, POLL_INTERVAL_MS);
}

function stopPolling(): void {
  if (pollTimer !== undefined) {
    clearInterval(pollTimer);
    pollTimer = undefined;
  }
}

onMounted(startPolling);
onUnmounted(stopPolling);
</script>

<template>
  <Tooltip :text="tooltipContent" placement="bottom">
    <span
      class="health-indicator"
      :class="`health-indicator--${status}`"
      role="img"
      :aria-label="statusLabel"
    >
      <Spinner v-if="loading" class="health-indicator__spinner" />
      <Icon v-else :name="iconName" class="health-indicator__icon" />
    </span>
  </Tooltip>
</template>

<style scoped>
.health-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--radius-full);
  transition: background var(--dur-fast) var(--ease-out);
  cursor: default;
}
.health-indicator--healthy {
  background: var(--success-bg);
  color: var(--success);
}
.health-indicator--degraded {
  background: var(--warning-bg);
  color: var(--warning);
}
.health-indicator--offline {
  background: var(--error-bg);
  color: var(--error);
}
.health-indicator__spinner {
  width: 0.9em;
  height: 0.9em;
}
.health-indicator__icon {
  width: 0.9em;
  height: 0.9em;
}
</style>
