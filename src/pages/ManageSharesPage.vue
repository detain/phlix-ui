<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * ManageSharesPage (R5.2d) — the hub's library-shares page, re-skinned onto the
 * Nocturne tokens + `@phlix/ui` primitives.
 *
 * Data flows are UNCHANGED from the pre-redo page (presentation-only re-skin):
 *   - GET    /api/v1/shares       → { shares }
 *   - DELETE /api/v1/shares/:id   (revoke, then reload)
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton.
 */
import { ref, onMounted } from 'vue';
import { api, ApiClient } from '../api/client';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import { unixToIso } from '../api/normalize';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';

interface Share {
  id: string;
  library_id: string;
  library_name: string;
  shared_with: string;
  permissions: 'read' | 'write';
  created_at: string;
  expires_at?: string;
}

/** Raw OUTGOING-share shape from the hub's `GET /api/v1/me/shares/` (snake_case;
 *  dates are UNIX seconds). The response envelope is `{ outgoing, incoming }`. */
interface HubShare {
  id?: string;
  library_id?: string;
  library_name?: string;
  collaborator_user_id?: string;
  collaborator_name?: string | null;
  permission_level?: string;
  created_at?: number | null;
  expires_at?: number | null;
}

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get' | 'delete'> = props.client ?? api;
const toasts = useToastStore();

const shares = ref<Share[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

/**
 * Load shares. `initial` shows the full-page skeleton (mount / retry); the
 * after-revoke reload updates the table in place so it doesn't flash out.
 */
async function loadShares(initial = false): Promise<void> {
  if (initial) loading.value = true;
  error.value = null;
  try {
    // The hub returns `{ outgoing, incoming }`; "Manage Shares" lists the
    // libraries the current user shares OUT. permission_level is read|readwrite;
    // dates are UNIX seconds; shared_with falls back to the collaborator id.
    const data = await http.get<{ outgoing?: HubShare[] }>('/api/v1/me/shares/');
    shares.value = (data.outgoing || []).map((s) => ({
      id: s.id ?? '',
      library_id: s.library_id ?? '',
      library_name: s.library_name ?? '',
      shared_with: s.collaborator_name ?? s.collaborator_user_id ?? '',
      permissions: s.permission_level === 'readwrite' ? 'write' : 'read',
      created_at: unixToIso(s.created_at) ?? '',
      expires_at: unixToIso(s.expires_at),
    }));
  } catch (e) {
    error.value = errMessage(e, 'Failed to load shares.');
    toasts.error(error.value);
  } finally {
    if (initial) loading.value = false;
  }
}

async function revokeShare(shareId: string): Promise<void> {
  try {
    await http.delete(`/api/v1/me/shares/${shareId}`);
    toasts.success('Share revoked.');
    await loadShares();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to revoke share.'));
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString();
}

function isExpired(dateStr: string | undefined): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

/** Badge tone for a share permission level. */
function permissionTone(permission: string): 'info' | 'success' | 'neutral' {
  switch (permission) {
    case 'read':
      return 'info';
    case 'write':
      return 'success';
    default:
      return 'neutral';
  }
}

onMounted(() => loadShares(true));
</script>

<template>
  <section class="shares" aria-labelledby="shares-heading">
    <header class="shares__head">
      <h1 id="shares-heading" class="shares__title">Manage Shares</h1>
      <p class="shares__subtitle">View and manage your shared libraries.</p>
    </header>

    <div v-if="loading" class="shares__skel"><Skeleton variant="text" :lines="6" /></div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load shares"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadShares(true)">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="shares.length === 0"
      icon="bookmark"
      title="No library shares"
      description="Libraries you share with others will appear here."
    />

    <div v-else class="shares__table-wrap">
      <table class="shares__table" aria-label="Library shares">
        <thead>
          <tr>
            <th scope="col">Library</th>
            <th scope="col">Shared with</th>
            <th scope="col">Permissions</th>
            <th scope="col">Created</th>
            <th scope="col">Expires</th>
            <th scope="col" class="shares__actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="share in shares" :key="share.id">
            <td><span class="shares__library">{{ share.library_name }}</span></td>
            <td>{{ share.shared_with }}</td>
            <td>
              <Badge :tone="permissionTone(share.permissions)">{{ share.permissions }}</Badge>
            </td>
            <td class="shares__date">{{ formatDate(share.created_at) }}</td>
            <td class="shares__date">
              <span class="shares__expires" :data-testid="`expires-${share.id}`">
                {{ formatDate(share.expires_at) }}
                <Badge v-if="isExpired(share.expires_at)" tone="error">Expired</Badge>
              </span>
            </td>
            <td>
              <div class="shares__actions">
                <Button
                  variant="ghost"
                  size="sm"
                  :aria-label="`Revoke share of ${share.library_name} with ${share.shared_with}`"
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
  </section>
</template>

<style scoped>
.shares {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-6);
}
.shares__head {
  margin-bottom: var(--space-6);
}
.shares__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}
.shares__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}
.shares__skel {
  padding-block: var(--space-2);
}
.shares__table-wrap {
  overflow-x: auto;
}
.shares__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.shares__table th {
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
.shares__table td {
  padding: var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.shares__library {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.shares__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.shares__expires {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.shares__actions-col {
  width: 1%;
}
.shares__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
