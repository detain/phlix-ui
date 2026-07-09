<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * ServerSelector — dropdown for selecting a server in multi-server setups.
 * Shows connection status as a colored dot and last-seen timestamp.
 * Consumes `AdminServersApi.listServers()`.
 */
import { computed } from 'vue';
import type { ServerListItem } from '../../api/admin/servers';
import Select from '../ui/Select.vue';
import type { SelectOptionInput } from '../ui/listbox';

const props = defineProps<{
  /** List of servers from `AdminServersApi.listServers()`. */
  servers: ServerListItem[];
  /** The currently selected server id. */
  modelValue: string | null;
  /** Whether the parent is loading the server list. */
  loading?: boolean;
  /** Disable the selector. */
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | null): void;
  (e: 'change', v: string | null): void;
}>();

/** Format a Unix timestamp as a relative time string like "2m ago". */
function relativeTime(ts: number | null): string {
  if (!ts || !Number.isFinite(ts)) return 'Never';
  const s = Math.floor((Date.now() / 1000) - ts);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/** Convert the server list to Select options, appending status suffix. */
const options = computed<SelectOptionInput[]>(() =>
  props.servers.map((s) => {
    const label = s.hostname || s.name;
    return {
      value: s.id,
      label,
      title: `Last seen: ${relativeTime(s.lastSeenAt)}`,
    };
  }),
);

/** Select-compatible model value (string or number). */
const selectValue = computed<string | number | null>(() => props.modelValue ?? null);

/** Options include an "All servers" placeholder when there are multiple. */
const selectOptions = computed<SelectOptionInput[]>(() => {
  if (props.servers.length > 1) {
    return [{ value: '', label: 'All servers' }, ...options.value];
  }
  return options.value;
});

function handleUpdate(value: string | number | null): void {
  const id = value === '' || value === null ? null : String(value);
  emit('update:modelValue', id);
  emit('change', id);
}

/** The server entry matching the current selection, if any. */
const selectedServer = computed<ServerListItem | undefined>(() =>
  props.servers.find((s) => s.id === props.modelValue),
);

/** Status tone for the selected server's online indicator. */
const selectedTone = computed<'success' | 'error' | 'warning' | 'neutral'>(() => {
  const s = selectedServer.value;
  if (!s) return 'neutral';
  if (s.online) return 'success';
  return 'error';
});
</script>

<template>
  <div class="server-selector" :class="{ 'is-loading': loading }">
    <Select
      :model-value="selectValue"
      :options="selectOptions"
      :disabled="disabled || loading"
      :loading="loading"
      label="Server"
      placeholder="All servers"
      @update:model-value="handleUpdate"
    />

    <div v-if="selectedServer" class="server-selector__status" aria-live="polite">
      <span
        class="server-selector__dot"
        :class="`server-selector__dot--${selectedTone}`"
        aria-hidden="true"
      />
      <span class="server-selector__last-seen">
        Last seen: {{ relativeTime(selectedServer.lastSeenAt) }}
      </span>
    </div>
    <div v-else-if="servers.length === 0 && !loading" class="server-selector__status">
      <span class="server-selector__hint">No servers available.</span>
    </div>
  </div>
</template>

<style scoped>
.server-selector {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* Status row */
.server-selector__status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.server-selector__dot {
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}
.server-selector__dot--success { background: var(--success); }
.server-selector__dot--error   { background: var(--error); }
.server-selector__dot--warning { background: var(--warning); }
.server-selector__dot--neutral { background: var(--text-subtle); }

.server-selector__last-seen {
  font-variant-numeric: tabular-nums;
}

.server-selector__hint {
  font-style: italic;
}
</style>
