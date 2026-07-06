<script setup lang="ts">
/**
 * Admin LogsPage (RA.1) — view & tail the server log files, ported from the
 * deleted React `LogsPage` onto the `@phlix/ui` primitives. Lists `.log` files,
 * tails the selected one (or all merged), and can auto-refresh every 5s. Errors
 * surface as toasts; the view pins to the newest lines; timers clear on unmount.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import { AdminLogsApi, ALL_LOGS, type LogFile } from '../../api/admin/logs';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Select from '../../components/ui/Select.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Switch from '../../components/ui/Switch.vue';
import Button from '../../components/ui/Button.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import type { SelectOptionInput } from '../../components/ui/listbox';

const LINE_OPTIONS = [200, 500, 1000, 2000];
const AUTO_REFRESH_MS = 5000;

const props = defineProps<{
  /** Inject a pre-built API for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminLogsApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

const files = ref<LogFile[]>([]);
const selected = ref<string>('');
const lineCount = ref<number>(200);
const lines = ref<string[]>([]);
const truncated = ref(false);
const loading = ref(false);
const listLoading = ref(true);
const listError = ref<string | null>(null);
const contentError = ref<string | null>(null);

const preEl = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setInterval> | null = null;

const fileOptions = computed<SelectOptionInput[]>(() => {
  if (files.value.length === 0) return [{ value: '', label: '(no log files)' }];
  return [
    { value: ALL_LOGS, label: 'All logs (combined)' },
    ...files.value.map((f) => ({ value: f.name, label: f.name })),
  ];
});
const lineOptions = computed<SelectOptionInput[]>(() => LINE_OPTIONS.map((n) => ({ value: n, label: String(n) })));

async function loadList(): Promise<void> {
  listLoading.value = true;
  listError.value = null;
  try {
    const list = await api.list();
    files.value = list;
    if (list.length > 0 && selected.value === '') selected.value = list[0].name;
  } catch (e) {
    listError.value = errMessage(e, 'Failed to list logs.');
    toasts.error(listError.value);
  } finally {
    listLoading.value = false;
  }
}

async function refresh(): Promise<void> {
  const file = selected.value;
  if (file === '') return;
  loading.value = true;
  contentError.value = null;
  try {
    const res = file === ALL_LOGS ? await api.tailAll(lineCount.value) : await api.tail(file, lineCount.value);
    lines.value = res.lines;
    truncated.value = res.truncated;
    void nextTick(() => {
      if (preEl.value) preEl.value.scrollTop = preEl.value.scrollHeight;
    });
  } catch (e) {
    contentError.value = errMessage(e, 'Failed to read log.');
    toasts.error(contentError.value);
  } finally {
    loading.value = false;
  }
}

function stopTimer(): void {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function syncTimer(): void {
  stopTimer();
  if (autoRefresh.value && selected.value !== '') {
    timer = setInterval(() => void refresh(), AUTO_REFRESH_MS);
  }
}

// ---------------------------------------------------------------------------
// Visibility-aware polling: pause auto-refresh when the tab is hidden and
// resume it when the tab becomes visible again (if conditions still met).
// ---------------------------------------------------------------------------

function handleVisibilityChange(): void {
  if (document.hidden) {
    stopTimer();
  } else {
    // Restart timer if auto-refresh is still enabled and a file is selected
    if (autoRefresh.value && selected.value !== '') {
      timer = setInterval(() => void refresh(), AUTO_REFRESH_MS);
    }
  }
}

const autoRefresh = ref(false);

watch([selected, lineCount], () => void refresh());
watch([autoRefresh, selected, lineCount], syncTimer);

onMounted(() => {
  loadList();
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
});

onBeforeUnmount(() => {
  stopTimer();
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }
});
</script>

<template>
  <section class="admin-logs" aria-labelledby="logs-heading">
    <header class="admin-logs__head">
      <h1 id="logs-heading" class="admin-logs__title">Logs</h1>
    </header>

    <PageHint>
      Read the server's log files to troubleshoot problems. Pick a file with the
      <strong>File</strong> menu (or <strong>All logs</strong> to merge them), set how many recent
      lines to show with <strong>Lines</strong>, and press <strong>Refresh</strong> to reload.
      Turn on <strong>Auto-refresh</strong> to keep the newest entries streaming in every few
      seconds.
    </PageHint>

    <div class="admin-logs__controls">
      <label class="admin-logs__field">
        <span class="admin-logs__label">File</span>
        <Select v-model="selected" :options="fileOptions" label="Log file" />
      </label>
      <label class="admin-logs__field">
        <span class="admin-logs__label">Lines</span>
        <Select
          :model-value="lineCount"
          :options="lineOptions"
          label="Line count"
          @update:model-value="(v) => (lineCount = Number(v))"
        />
      </label>
      <Button variant="outline" size="sm" :loading="loading" :disabled="selected === ''" @click="refresh">
        Refresh
      </Button>
      <Switch v-model="autoRefresh" label="Auto-refresh (5s)" class="admin-logs__toggle" />
    </div>

    <p v-if="truncated" class="admin-logs__truncated" role="note">
      Showing the most recent {{ lineCount }} lines
      ({{ selected === ALL_LOGS ? 'more lines available across files' : 'file is larger' }}).
    </p>

    <div v-if="(listLoading || loading) && lines.length === 0" class="admin-logs__loading" aria-hidden="true">
      <Skeleton variant="text" :lines="8" />
    </div>
    <EmptyState
      v-else-if="listError"
      icon="alert"
      title="Couldn't load log files"
      :description="listError"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadList">Retry</Button>
      </template>
    </EmptyState>
    <EmptyState
      v-else-if="contentError"
      icon="alert"
      title="Couldn't read log"
      :description="contentError"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="refresh">Retry</Button>
      </template>
    </EmptyState>
    <pre v-else ref="preEl" class="admin-logs__output" data-testid="logs-output" aria-live="polite">{{ lines.length === 0 ? '(no output)' : lines.join('\n') }}</pre>
  </section>
</template>

<style scoped>
.admin-logs {
  /* Use (almost) the full available width so long log lines wrap far less than
     at the old fixed 1100px document width. */
  max-width: 100%;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-logs__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-4);
}
.admin-logs__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}
.admin-logs__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-logs__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-logs__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.admin-logs__truncated {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin-bottom: var(--space-2);
}
.admin-logs__output {
  max-height: 60vh;
  overflow: auto;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--text-muted);
  /* Don't wrap long log lines — scroll horizontally instead, so each entry stays
     on one line and is far easier to scan (the container is now full-width). */
  white-space: pre;
  overflow-x: auto;
}
</style>
