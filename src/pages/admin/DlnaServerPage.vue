<script setup lang="ts">
/**
 * Admin DlnaServerPage (RA.9) — DLNA CDS server status & toggle, ported 1:1
 * from the deleted React `DlnaServerPage` onto the `@phlix/ui` primitives.
 * Shows the running state (Badge tone instead of the old emoji dot), the server
 * details (friendly name, UDN, port, base URL) when running, and a Start/Stop
 * button with a loading state. Errors surface as toasts; every action awaits a
 * status refetch afterward.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import { AdminDlnaServerApi, type DlnaServerStatus } from '../../api/admin/dlnaServer';
import { useToastStore } from '../../stores/useToastStore';
import Button from '../../components/ui/Button.vue';
import Badge from '../../components/ui/Badge.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';

const props = defineProps<{
  /** Inject a pre-built API for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminDlnaServerApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

const status = ref<DlnaServerStatus | null>(null);
const loading = ref(true);
const acting = ref(false);

const isRunning = computed(() => status.value?.running ?? false);
const isEnabled = computed(() => status.value?.enabled ?? false);

async function loadStatus(): Promise<void> {
  loading.value = true;
  try {
    status.value = await api.getStatus();
  } catch (e) {
    toasts.error(e instanceof Error ? e.message : 'Failed to load DLNA server status.');
  } finally {
    loading.value = false;
  }
}

async function handleStart(): Promise<void> {
  if (acting.value) return;
  acting.value = true;
  try {
    const result = await api.start();
    if (!result.success) {
      toasts.error(result.message || 'Failed to start DLNA server.');
      return;
    }
    toasts.success('DLNA server started.');
    await loadStatus();
  } catch (e) {
    toasts.error(e instanceof Error ? e.message : 'Failed to start DLNA server.');
  } finally {
    acting.value = false;
  }
}

async function handleStop(): Promise<void> {
  if (acting.value) return;
  acting.value = true;
  try {
    const result = await api.stop();
    if (!result.success) {
      toasts.error(result.message || 'Failed to stop DLNA server.');
      return;
    }
    toasts.success('DLNA server stopped.');
    await loadStatus();
  } catch (e) {
    toasts.error(e instanceof Error ? e.message : 'Failed to stop DLNA server.');
  } finally {
    acting.value = false;
  }
}

onMounted(loadStatus);
</script>

<template>
  <section class="admin-dlna" aria-labelledby="dlna-heading">
    <header class="admin-dlna__head">
      <h1 id="dlna-heading" class="admin-dlna__title">DLNA Server</h1>
    </header>

    <div class="admin-dlna__card" aria-live="polite">
      <div v-if="loading" class="admin-dlna__loading" aria-hidden="true">
        <Skeleton variant="text" :lines="4" />
      </div>

      <EmptyState
        v-else-if="!isEnabled"
        icon="monitor"
        title="DLNA server is not configured."
        :description="status?.message ?? undefined"
      />

      <template v-else>
        <div class="admin-dlna__status">
          <Badge :tone="isRunning ? 'success' : 'neutral'" size="md" icon="monitor">
            {{ isRunning ? 'Running' : 'Stopped' }}
          </Badge>
        </div>

        <dl v-if="isRunning && status !== null" class="admin-dlna__details">
          <template v-if="status.friendlyName">
            <dt>Friendly Name</dt>
            <dd>{{ status.friendlyName }}</dd>
          </template>
          <template v-if="status.serverId">
            <dt>UDN</dt>
            <dd>{{ status.serverId }}</dd>
          </template>
          <template v-if="status.port !== null">
            <dt>Port</dt>
            <dd>{{ status.port }}</dd>
          </template>
          <template v-if="status.baseUrl">
            <dt>Base URL</dt>
            <dd>{{ status.baseUrl }}</dd>
          </template>
        </dl>

        <div class="admin-dlna__actions">
          <Button
            v-if="!isRunning"
            variant="solid"
            :loading="acting"
            leftIcon="play"
            @click="handleStart"
          >
            {{ acting ? 'Starting…' : 'Start Server' }}
          </Button>
          <Button
            v-else
            variant="outline"
            :loading="acting"
            leftIcon="pause"
            @click="handleStop"
          >
            {{ acting ? 'Stopping…' : 'Stop Server' }}
          </Button>
        </div>
      </template>
    </div>

    <p class="admin-dlna__note" role="note">
      The DLNA server announces this Phlix instance on the local network as a
      UPnP MediaServer. Restart the server to apply configuration changes.
    </p>
  </section>
</template>

<style scoped>
.admin-dlna {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-dlna__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-4);
}
.admin-dlna__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-dlna__loading {
  min-height: 4rem;
}
.admin-dlna__status {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.admin-dlna__details {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: var(--space-6);
  row-gap: var(--space-2);
  margin: 0;
}
.admin-dlna__details dt {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-dlna__details dd {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text);
  font-family: var(--font-mono);
  word-break: break-word;
}
.admin-dlna__actions {
  display: flex;
  gap: var(--space-3);
}
.admin-dlna__note {
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
</style>
