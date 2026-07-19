<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 -->

<script setup lang="ts">
/**
 * FederationSharesPage (WS-D D-HUB-6) — library share offers between federation peers.
 *
 * This is a SEPARATE page from FederationPage.vue (which handles peer management).
 * It registers at /app/federation/shares.
 *
 * Data flows:
 *   - GET  /api/v1/me/federation/library-shares/incoming  → incoming_offers
 *   - GET  /api/v1/me/federation/library-shares/outgoing  → outgoing_shares
 *   - POST .../incoming/{id}/accept                       → accept offer
 *   - POST .../incoming/{id}/reject                       → reject offer
 *   - DELETE .../outgoing/{id}                           → revoke share
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton.
 */
import { ref, computed, onMounted } from 'vue';
import { api, ApiClient } from '../api/client';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import { unixToIso } from '../api/normalize';
import type { IncomingOffer, OutgoingShare, HubIncomingOffer, HubOutgoingShare } from '../types/federation-share';

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get' | 'post' | 'delete'> = props.client ?? api;
const toasts = useToastStore();

const activeTab = ref<'incoming' | 'outgoing'>('incoming');
const incoming = ref<IncomingOffer[]>([]);
const outgoing = ref<OutgoingShare[]>([]);
const loadingIncoming = ref(false);
const loadingOutgoing = ref(false);
const errorIncoming = ref<string | null>(null);
const errorOutgoing = ref<string | null>(null);
const processingIds = ref(new Set<string>());

const isProcessing = (id: string) => processingIds.value.has(id);

async function loadIncoming(): Promise<void> {
  loadingIncoming.value = true;
  errorIncoming.value = null;
  try {
    const data = await http.get<{ incoming_offers?: HubIncomingOffer[] }>(
      '/api/v1/me/federation/library-shares/incoming',
    );
    incoming.value = (data.incoming_offers || []).map((o) => ({
      id: o.id ?? '',
      peer_id: o.peer_id ?? '',
      library_id: o.library_id ?? '',
      library_name: o.library_name ?? '',
      permission: (o.permission === 'readwrite' ? 'readwrite' : 'read') as 'read' | 'readwrite',
      status: (o.status ?? 'pending') as 'pending' | 'accepted' | 'rejected',
      offered_at: unixToIso(o.offered_at) ?? '',
      responded_at: o.responded_at ?? null,
      accepted_by: o.accepted_by ?? null,
    }));
  } catch (e) {
    errorIncoming.value = errMessage(e, 'Failed to load incoming share offers.');
    toasts.error(errorIncoming.value);
  } finally {
    loadingIncoming.value = false;
  }
}

async function loadOutgoing(): Promise<void> {
  loadingOutgoing.value = true;
  errorOutgoing.value = null;
  try {
    const data = await http.get<{ outgoing_shares?: HubOutgoingShare[] }>(
      '/api/v1/me/federation/library-shares/outgoing',
    );
    outgoing.value = (data.outgoing_shares || []).map((s) => ({
      id: s.id ?? '',
      library_id: s.library_id ?? '',
      library_name: s.library_name ?? '',
      peer_id: s.peer_id ?? '',
      permission: (s.permission === 'readwrite' ? 'readwrite' : 'read') as 'read' | 'readwrite',
      status: (s.status ?? 'pending') as 'pending' | 'accepted' | 'rejected',
      shared_at: unixToIso(s.shared_at) ?? '',
      revoked_at: s.revoked_at ?? null,
    }));
  } catch (e) {
    errorOutgoing.value = errMessage(e, 'Failed to load outgoing shares.');
    toasts.error(errorOutgoing.value);
  } finally {
    loadingOutgoing.value = false;
  }
}

async function loadAll(): Promise<void> {
  await Promise.all([loadIncoming(), loadOutgoing()]);
}

async function acceptOffer(id: string): Promise<void> {
  if (isProcessing(id)) return;
  processingIds.value.add(id);
  try {
    await http.post(`/api/v1/me/federation/library-shares/incoming/${id}/accept`);
    toasts.success('Share offer accepted.');
    await loadAll();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to accept share offer.'));
  } finally {
    processingIds.value.delete(id);
  }
}

async function rejectOffer(id: string): Promise<void> {
  if (isProcessing(id)) return;
  processingIds.value.add(id);
  try {
    await http.post(`/api/v1/me/federation/library-shares/incoming/${id}/reject`);
    toasts.success('Share offer rejected.');
    await loadAll();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to reject share offer.'));
  } finally {
    processingIds.value.delete(id);
  }
}

async function revokeShare(id: string): Promise<void> {
  if (isProcessing(id)) return;
  processingIds.value.add(id);
  try {
    await http.delete(`/api/v1/me/federation/library-shares/outgoing/${id}`);
    toasts.success('Share revoked.');
    await loadAll();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to revoke share.'));
  } finally {
    processingIds.value.delete(id);
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString();
}

/** Badge tone for incoming offer status. */
function incomingStatusTone(status: string): 'warning' | 'success' | 'error' {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'warning';
  }
}

/** Badge tone for outgoing share status. */
function outgoingStatusTone(status: string): 'warning' | 'success' | 'neutral' {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'neutral';
    default:
      return 'warning';
  }
}

/** Badge tone for permission level. */
function permissionTone(permission: string): 'info' | 'success' {
  switch (permission) {
    case 'readwrite':
      return 'success';
    case 'read':
    default:
      return 'info';
  }
}

const isInitialLoad = computed(() => loadingIncoming.value && incoming.value.length === 0 && outgoing.value.length === 0);

onMounted(() => loadAll());
</script>

<template>
  <section class="fed-shares" aria-labelledby="fed-shares-heading">
    <header class="fed-shares__head">
      <h1 id="fed-shares-heading" class="fed-shares__title">Federation Library Shares</h1>
      <p class="fed-shares__subtitle">Manage library share offers between your federation peers.</p>
    </header>

    <div class="fed-shares__tabs" role="tablist" aria-label="Share offers">
      <button
        role="tab"
        class="fed-shares__tab"
        :class="{ 'is-active': activeTab === 'incoming' }"
        :aria-selected="activeTab === 'incoming'"
        @click="activeTab = 'incoming'"
      >
        Incoming
        <span v-if="incoming.filter(o => o.status === 'pending').length > 0" class="fed-shares__tab-badge">
          {{ incoming.filter(o => o.status === 'pending').length }}
        </span>
      </button>
      <button
        role="tab"
        class="fed-shares__tab"
        :class="{ 'is-active': activeTab === 'outgoing' }"
        :aria-selected="activeTab === 'outgoing'"
        @click="activeTab = 'outgoing'"
      >
        Outgoing
      </button>
    </div>

    <!-- INCOMING TAB -->
    <div v-show="activeTab === 'incoming'" role="tabpanel" aria-labelledby="tab-incoming">
      <div v-if="isInitialLoad" class="fed-shares__skel"><Skeleton variant="text" :lines="6" /></div>

      <EmptyState
        v-else-if="errorIncoming"
        icon="alert"
        title="Couldn't load incoming offers"
        :description="errorIncoming"
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="rewind" @click="loadIncoming">Retry</Button>
        </template>
      </EmptyState>

      <EmptyState
        v-else-if="incoming.length === 0"
        icon="bookmark"
        title="No incoming library share offers"
        description="Library share offers from other federation peers will appear here."
      />

      <div v-else class="fed-shares__table-wrap">
        <table class="fed-shares__table" aria-label="Incoming library share offers">
          <thead>
            <tr>
              <th scope="col">Library</th>
              <th scope="col">Permission</th>
              <th scope="col">Status</th>
              <th scope="col">Offered</th>
              <th scope="col" class="fed-shares__actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="offer in incoming" :key="offer.id">
              <td><span class="fed-shares__library">{{ offer.library_name }}</span></td>
              <td>
                <Badge :tone="permissionTone(offer.permission)">{{ offer.permission }}</Badge>
              </td>
              <td>
                <Badge :tone="incomingStatusTone(offer.status)">{{ offer.status }}</Badge>
              </td>
              <td class="fed-shares__date">{{ formatDate(offer.offered_at) }}</td>
              <td>
                <div v-if="offer.status === 'pending'" class="fed-shares__actions">
                  <Button
                    variant="solid"
                    size="sm"
                    :aria-label="`Accept share of ${offer.library_name}`"
                    :disabled="isProcessing(offer.id)"
                    @click="acceptOffer(offer.id)"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    :aria-label="`Reject share of ${offer.library_name}`"
                    :disabled="isProcessing(offer.id)"
                    @click="rejectOffer(offer.id)"
                  >
                    Reject
                  </Button>
                </div>
                <span v-else class="fed-shares__responded">
                  {{ offer.status === 'accepted' ? 'Accepted' : 'Rejected' }}
                  <span v-if="offer.responded_at"> · {{ formatDate(offer.responded_at) }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- OUTGOING TAB -->
    <div v-show="activeTab === 'outgoing'" role="tabpanel" aria-labelledby="tab-outgoing">
      <div v-if="isInitialLoad" class="fed-shares__skel"><Skeleton variant="text" :lines="6" /></div>

      <EmptyState
        v-else-if="errorOutgoing"
        icon="alert"
        title="Couldn't load outgoing shares"
        :description="errorOutgoing"
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="rewind" @click="loadOutgoing">Retry</Button>
        </template>
      </EmptyState>

      <EmptyState
        v-else-if="outgoing.length === 0"
        icon="bookmark"
        title="No outgoing library shares"
        description="Libraries you share with federation peers will appear here."
      />

      <div v-else class="fed-shares__table-wrap">
        <table class="fed-shares__table" aria-label="Outgoing library shares">
          <thead>
            <tr>
              <th scope="col">Library</th>
              <th scope="col">Peer</th>
              <th scope="col">Permission</th>
              <th scope="col">Status</th>
              <th scope="col">Shared</th>
              <th scope="col" class="fed-shares__actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="share in outgoing" :key="share.id">
              <td><span class="fed-shares__library">{{ share.library_name }}</span></td>
              <td class="fed-shares__peer">{{ share.peer_id }}</td>
              <td>
                <Badge :tone="permissionTone(share.permission)">{{ share.permission }}</Badge>
              </td>
              <td>
                <Badge :tone="outgoingStatusTone(share.status)">
                  {{ share.status === 'rejected' ? 'Declined' : share.status }}
                </Badge>
              </td>
              <td class="fed-shares__date">{{ formatDate(share.shared_at) }}</td>
              <td>
                <div v-if="share.status !== 'rejected'" class="fed-shares__actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    :aria-label="`Revoke share of ${share.library_name}`"
                    :disabled="isProcessing(share.id)"
                    @click="revokeShare(share.id)"
                  >
                    Revoke
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fed-shares {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.fed-shares__head {
  margin-bottom: var(--space-6);
}
.fed-shares__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}
.fed-shares__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}
.fed-shares__tabs {
  display: flex;
  gap: var(--space-1);
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: var(--space-6);
}
.fed-shares__tab {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-muted);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  margin-bottom: -1px;
}
.fed-shares__tab:hover {
  color: var(--text);
}
.fed-shares__tab.is-active {
  color: var(--accent-text);
  border-bottom-color: var(--accent);
}
.fed-shares__tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 var(--space-1);
  font-size: var(--text-2xs);
  font-weight: var(--font-bold);
  background: var(--accent);
  color: var(--text-on-accent);
  border-radius: var(--radius-full);
}
.fed-shares__skel {
  padding-block: var(--space-2);
}
.fed-shares__table-wrap {
  overflow-x: auto;
}
.fed-shares__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.fed-shares__table th {
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
.fed-shares__table td {
  padding: var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.fed-shares__library {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.fed-shares__peer {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.fed-shares__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.fed-shares__responded {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.fed-shares__actions-col {
  width: 1%;
}
.fed-shares__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>