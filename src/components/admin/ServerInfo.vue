<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * ServerInfo — displays server hostname, version, active session count,
 * uptime, and storage usage (libraries count + total items). Consumes
 * `AdminServersApi.getServerInfo()`.
 */
import { computed } from 'vue';
import type { ServerInfo } from '../../api/admin/servers';
import Badge from '../ui/Badge.vue';

const props = defineProps<{
  /** Pre-loaded server info (avoids a fetch when the parent already has it). */
  serverInfo?: ServerInfo | null;
  /** Whether the parent is loading server info. */
  loading?: boolean;
}>();

/** Format seconds as "Xh Ym" or "Xm" or "Xs" (dash if 0). */
function formatDuration(seconds: number): string {
  if (seconds === 0) return '—';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/** Format bytes as a human-readable string (B/KB/MB/GB/TB). */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

/** Badge tone based on online status. */
const onlineTone = computed<'success' | 'error'>(() =>
  props.serverInfo?.online ? 'success' : 'error',
);

/** Online status label. */
const onlineLabel = computed(() =>
  props.serverInfo?.online ? 'Online' : 'Offline',
);
</script>

<template>
  <div class="server-info" :class="{ 'is-loading': loading }">
    <template v-if="loading && !serverInfo">
      <div class="server-info__skel">
        <div class="skel-line skel-line--short" />
        <div class="skel-line" />
        <div class="skel-line skel-line--medium" />
      </div>
    </template>

    <template v-else-if="serverInfo">
      <div class="server-info__header">
        <div class="server-info__identity">
          <h3 class="server-info__hostname">{{ serverInfo.hostname || serverInfo.name }}</h3>
          <Badge v-if="serverInfo.version" tone="neutral" mono>
            v{{ serverInfo.version }}
          </Badge>
        </div>
        <Badge :tone="onlineTone" :label="onlineLabel">
          <span class="server-info__dot" aria-hidden="true" />
          {{ onlineLabel }}
        </Badge>
      </div>

      <dl class="server-info__stats">
        <div class="server-info__stat">
          <dt class="server-info__stat-label">Active sessions</dt>
          <dd class="server-info__stat-value">
            <span class="server-info__stat-num">{{ serverInfo.activeSessionCount.toLocaleString() }}</span>
          </dd>
        </div>

        <div class="server-info__stat">
          <dt class="server-info__stat-label">Uptime</dt>
          <dd class="server-info__stat-value">
            <span class="server-info__stat-num">{{ formatDuration(serverInfo.uptimeSeconds) }}</span>
          </dd>
        </div>

        <div class="server-info__stat">
          <dt class="server-info__stat-label">Libraries</dt>
          <dd class="server-info__stat-value">
            <span class="server-info__stat-num">{{ serverInfo.libraryCount.toLocaleString() }}</span>
          </dd>
        </div>

        <div class="server-info__stat">
          <dt class="server-info__stat-label">Total items</dt>
          <dd class="server-info__stat-value">
            <span class="server-info__stat-num">{{ serverInfo.totalItemCount.toLocaleString() }}</span>
          </dd>
        </div>

        <div class="server-info__stat">
          <dt class="server-info__stat-label">Storage used</dt>
          <dd class="server-info__stat-value">
            <span class="server-info__stat-num">{{ formatBytes(serverInfo.totalStorageBytes) }}</span>
          </dd>
        </div>
      </dl>
    </template>

    <template v-else>
      <p class="server-info__empty">No server information available.</p>
    </template>
  </div>
</template>

<style scoped>
.server-info {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}

/* Loading skeleton */
.server-info.is-loading {
  pointer-events: none;
}
.server-info__skel {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.skel-line {
  height: 1rem;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  animation: skel-pulse 1.4s ease-in-out infinite;
}
.skel-line--short { width: 40%; }
.skel-line--medium { width: 65%; }
@keyframes skel-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

/* Header */
.server-info__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
}
.server-info__identity {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}
.server-info__hostname {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Status dot */
.server-info__dot {
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  border-radius: var(--radius-full);
  background: currentColor;
}

/* Stats grid */
.server-info__stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-4);
  margin: 0;
}
.server-info__stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.server-info__stat-label {
  font-size: var(--text-2xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.server-info__stat-value {
  margin: 0;
}
.server-info__stat-num {
  font-family: var(--font-mono);
  font-size: var(--text-md);
  font-variant-numeric: tabular-nums;
  color: var(--text);
}

.server-info__empty {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-subtle);
}

@media (prefers-reduced-motion: reduce) {
  .skel-line { animation: none; }
}
</style>
