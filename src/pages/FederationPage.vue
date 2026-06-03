<script setup lang="ts">
/**
 * FederationPage (R5.2c) — the hub's peer-federation page, re-skinned onto the
 * Nocturne tokens + `@phlix/ui` primitives.
 *
 * Data flows are UNCHANGED from the pre-redo page (presentation-only re-skin):
 *   - GET  /api/v1/federation/peers              → { peers }
 *   - POST /api/v1/federation/connect            { url }
 *   - POST /api/v1/federation/peers/:id/disconnect
 *
 * Bug fix carried in this re-skin: the original add-peer <input> had no v-model
 * and the form hardcoded `connectPeer('')`, so it always sent an empty url. The
 * input is now bound to `peerUrl`, so the SAME `{ url }` POST actually carries the
 * typed value (endpoint + payload shape unchanged).
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

interface FederationPeer {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'pending';
  shared_libraries_count?: number;
  last_sync?: string;
}

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get' | 'post'> = props.client ?? api;
const toasts = useToastStore();

const peers = ref<FederationPeer[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const peerUrl = ref('');
const connecting = ref(false);

/**
 * Load the peer list. `initial` shows the full-page skeleton (mount / retry);
 * action-triggered reloads (after connect/disconnect) update the table in place
 * so the list + add-peer form don't flash out.
 */
async function loadPeers(initial = false): Promise<void> {
  if (initial) loading.value = true;
  error.value = null;
  try {
    const data = await http.get<{ peers: FederationPeer[] }>('/api/v1/federation/peers');
    peers.value = data.peers || [];
  } catch (e) {
    error.value = errMessage(e, 'Failed to load federation peers.');
    toasts.error(error.value);
  } finally {
    if (initial) loading.value = false;
  }
}

async function connectPeer(): Promise<void> {
  const url = peerUrl.value.trim();
  if (!url) return;
  connecting.value = true;
  try {
    await http.post('/api/v1/federation/connect', { url });
    toasts.success('Peer connection requested.');
    peerUrl.value = '';
    await loadPeers();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to connect to peer.'));
  } finally {
    connecting.value = false;
  }
}

async function disconnectPeer(peerId: string): Promise<void> {
  try {
    await http.post(`/api/v1/federation/peers/${peerId}/disconnect`);
    toasts.success('Peer disconnected.');
    await loadPeers();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to disconnect peer.'));
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleString();
}

/** Human-readable label for a peer status. */
function statusLabel(status: string): string {
  switch (status) {
    case 'connected':
      return 'Connected';
    case 'disconnected':
      return 'Disconnected';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
}

/** Badge tone for a peer status. */
function statusTone(status: string): 'neutral' | 'success' | 'warning' | 'error' {
  switch (status) {
    case 'connected':
      return 'success';
    case 'disconnected':
      return 'error';
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
}

onMounted(() => loadPeers(true));
</script>

<template>
  <section class="federation" aria-labelledby="federation-heading">
    <header class="federation__head">
      <h1 id="federation-heading" class="federation__title">Federation</h1>
      <p class="federation__subtitle">Connect with other Phlix servers to share libraries.</p>
    </header>

    <div v-if="loading" class="federation__skel"><Skeleton variant="text" :lines="6" /></div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load federation peers"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadPeers(true)">Retry</Button>
      </template>
    </EmptyState>

    <div v-else class="federation__content">
      <h2 class="federation__section-title">Connected peers</h2>

      <EmptyState
        v-if="peers.length === 0"
        icon="cast"
        title="No federation peers connected"
        description="Add a peer below to start sharing libraries."
      />
      <div v-else class="federation__table-wrap">
        <table class="federation__table" aria-label="Federation peers">
          <thead>
            <tr>
              <th scope="col">Peer</th>
              <th scope="col">Shared libraries</th>
              <th scope="col">Last sync</th>
              <th scope="col">Status</th>
              <th scope="col" class="federation__actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="peer in peers" :key="peer.id">
              <td>
                <div class="federation__name">{{ peer.name }}</div>
                <div class="federation__url">{{ peer.url }}</div>
              </td>
              <td class="federation__num">
                {{ peer.shared_libraries_count !== undefined ? peer.shared_libraries_count : '—' }}
              </td>
              <td class="federation__date">{{ formatDate(peer.last_sync) }}</td>
              <td>
                <span class="federation__status" :data-testid="`status-${peer.id}`">
                  <Badge :tone="statusTone(peer.status)">{{ statusLabel(peer.status) }}</Badge>
                </span>
              </td>
              <td>
                <div class="federation__actions">
                  <Button
                    v-if="peer.status === 'connected'"
                    variant="ghost"
                    size="sm"
                    :aria-label="`Disconnect ${peer.name}`"
                    @click="disconnectPeer(peer.id)"
                  >
                    Disconnect
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <section class="federation__add" aria-labelledby="federation-add-heading">
        <h2 id="federation-add-heading" class="federation__section-title">Add peer</h2>
        <form class="federation__form" @submit.prevent="connectPeer">
          <input
            v-model="peerUrl"
            type="url"
            class="federation__input"
            placeholder="https://other-server.example.com"
            aria-label="Peer server URL"
            autocomplete="off"
          />
          <Button type="submit" variant="solid" left-icon="plus" :loading="connecting" :disabled="!peerUrl.trim()">
            Connect
          </Button>
        </form>
      </section>
    </div>
  </section>
</template>

<style scoped>
.federation {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-6);
}
.federation__head {
  margin-bottom: var(--space-6);
}
.federation__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}
.federation__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}
.federation__section-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-4);
}
.federation__skel {
  padding-block: var(--space-2);
}
.federation__table-wrap {
  overflow-x: auto;
}
.federation__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.federation__table th {
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
.federation__table td {
  padding: var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.federation__name {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.federation__url {
  margin-top: var(--space-1);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  word-break: break-all;
}
.federation__num,
.federation__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.federation__status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.federation__actions-col {
  width: 1%;
}
.federation__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.federation__add {
  margin-top: var(--space-8);
}
.federation__form {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.federation__input {
  flex: 1;
  min-width: 16rem;
  height: var(--control-h);
  padding: var(--space-2) var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.federation__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.federation__input::placeholder {
  color: var(--text-subtle);
}
@media (prefers-reduced-motion: reduce) {
  .federation__input {
    transition: none;
  }
}
</style>
