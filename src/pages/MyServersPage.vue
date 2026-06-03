<script setup lang="ts">
/**
 * MyServersPage (R5.2b) — the hub's connected-media-servers list, re-skinned onto
 * the Nocturne tokens + `@phlix/ui` primitives.
 *
 * Data flow is UNCHANGED from the pre-redo page (presentation-only re-skin):
 *   - GET /api/v1/servers → { servers }
 * The per-row "Manage" and empty-state "Add Server" buttons are pre-existing
 * placeholders (no handler/endpoint in the original); they stay styled placeholders
 * until a future functional step wires them.
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton.
 */
import { ref, onMounted } from 'vue';
import { api, ApiClient } from '../api/client';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';

interface Server {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline' | 'connecting';
  owner: string;
  library_count?: number;
  last_seen?: string;
}

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get'> = props.client ?? api;
const toasts = useToastStore();

const servers = ref<Server[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadServers(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const data = await http.get<{ servers: Server[] }>('/api/v1/servers');
    servers.value = data.servers || [];
  } catch (e) {
    error.value = errMessage(e, 'Failed to load servers.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleString();
}

/** Human-readable label for a server connection status. */
function statusLabel(status: string): string {
  switch (status) {
    case 'online':
      return 'Online';
    case 'offline':
      return 'Offline';
    case 'connecting':
      return 'Connecting';
    default:
      return status;
  }
}

/** Badge tone for a server connection status. */
function statusTone(status: string): 'neutral' | 'success' | 'warning' | 'error' {
  switch (status) {
    case 'online':
      return 'success';
    case 'offline':
      return 'error';
    case 'connecting':
      return 'warning';
    default:
      return 'neutral';
  }
}

onMounted(loadServers);
</script>

<template>
  <section class="my-servers" aria-labelledby="my-servers-heading">
    <header class="my-servers__head">
      <div>
        <h1 id="my-servers-heading" class="my-servers__title">My Servers</h1>
        <p class="my-servers__subtitle">Manage your connected media servers.</p>
      </div>
      <Button variant="solid" size="sm" left-icon="plus">Add server</Button>
    </header>

    <div v-if="loading" class="my-servers__skel"><Skeleton variant="text" :lines="6" /></div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load servers"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadServers">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="servers.length === 0"
      icon="tv"
      title="No servers connected yet"
      description="Connect a media server to start streaming."
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="plus">Add server</Button>
      </template>
    </EmptyState>

    <div v-else class="my-servers__table-wrap">
      <table class="my-servers__table" aria-label="Connected servers">
        <thead>
          <tr>
            <th scope="col">Server</th>
            <th scope="col">Owner</th>
            <th scope="col">Libraries</th>
            <th scope="col">Last seen</th>
            <th scope="col">Status</th>
            <th scope="col" class="my-servers__actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="server in servers" :key="server.id">
            <td>
              <div class="my-servers__name">{{ server.name }}</div>
              <div class="my-servers__url">{{ server.url }}</div>
            </td>
            <td>{{ server.owner }}</td>
            <td class="my-servers__num">
              {{ server.library_count !== undefined ? server.library_count : '—' }}
            </td>
            <td class="my-servers__date">{{ formatDate(server.last_seen) }}</td>
            <td>
              <span class="my-servers__status" :data-testid="`status-${server.id}`">
                <Badge :tone="statusTone(server.status)">{{ statusLabel(server.status) }}</Badge>
              </span>
            </td>
            <td>
              <div class="my-servers__actions">
                <Button variant="ghost" size="sm" :aria-label="`Manage ${server.name}`">Manage</Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.my-servers {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-6);
}
.my-servers__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.my-servers__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}
.my-servers__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}
.my-servers__skel {
  padding-block: var(--space-2);
}
.my-servers__table-wrap {
  overflow-x: auto;
}
.my-servers__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.my-servers__table th {
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
.my-servers__table td {
  padding: var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.my-servers__name {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.my-servers__url {
  margin-top: var(--space-1);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  word-break: break-all;
}
.my-servers__num,
.my-servers__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.my-servers__status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.my-servers__actions-col {
  width: 1%;
}
.my-servers__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
