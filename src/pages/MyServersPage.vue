<script setup lang="ts">
/**
 * MyServersPage (R5.2b) — the hub's connected-media-servers list, re-skinned onto
 * the Nocturne tokens + `@phlix/ui` primitives.
 *
 * Data flow:
 *   - GET /api/v1/me/servers → { servers }  (the signed-in user's own servers)
 *   - "Add server" opens a modal that POSTs a claim code to the hub
 *     (POST /api/v1/server-claims/claim) to link a media server, then refreshes.
 * The per-row "Manage" button opens that server's own web UI (its first
 * advertised hostname candidate) in a new tab; it is disabled when the server
 * has not reported a reachable URL.
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton
 * (which now carries the session token, so the listing loads for a logged-in user).
 */
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api, ApiClient } from '../api/client';
import { claimServer, ClaimError } from '../api/claimServer';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useServerStore } from '../stores/useServerStore';
import { errMessage } from '../api/errors';
import { unixToIso } from '../api/normalize';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Modal from '../components/ui/Modal.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';

interface Server {
  id: string;
  name: string;
  url: string;
  status: string;
  owner: string;
  library_count?: number;
  last_seen?: string;
}

/** Raw item shape from the hub's `GET /api/v1/me/servers` (camelCase ServerInfoDto). */
interface HubServer {
  serverId?: string;
  serverName?: string;
  status?: string;
  hostnameCandidates?: string[];
  lastSeenAt?: number | null;
  /** Library count the server last reported via heartbeat (hub `server_libraries`
   *  cache, surfaced by ServerInfoDto.libraryCount). Null/absent on older hubs. */
  libraryCount?: number | null;
}

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get'> = props.client ?? api;
const toasts = useToastStore();
const auth = useAuthStore();
const serverStore = useServerStore();
const router = useRouter();
// The Browse target — the SPA's `/app` Browse home. Carries the full router-base
// prefix (history base is '/'); `routerBase` defaults to '/app'.
const phlixConfig = inject<{ routerBase?: string } | undefined>('phlixConfig', undefined);
const browseHome = phlixConfig?.routerBase || '/app';

const servers = ref<Server[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// "Add server" claim flow: the user pastes the claim code shown on their media
// server; we POST it to the hub (POST /api/v1/server-claims/claim) to link it.
const addOpen = ref(false);
const claimCode = ref('');
const claiming = ref(false);
const claimError = ref<string | null>(null);

function openAdd(): void {
  claimCode.value = '';
  claimError.value = null;
  addOpen.value = true;
}

async function submitClaim(): Promise<void> {
  claiming.value = true;
  claimError.value = null;
  try {
    // Same-origin: the hub serves this SPA, so a relative base resolves to it.
    await claimServer('', claimCode.value);
    addOpen.value = false;
    toasts.success('Server added.');
    await loadServers();
  } catch (e) {
    claimError.value = e instanceof ClaimError ? e.message : errMessage(e, 'Could not add the server.');
  } finally {
    claiming.value = false;
  }
}

async function loadServers(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const data = await http.get<{ servers: HubServer[] }>('/api/v1/me/servers');
    // These are the current user's OWN servers (the hub scopes by user_id), so
    // "owner" is always them — the hub returns no owner name, so use the session.
    const ownerName = auth.user?.username || auth.user?.name || auth.user?.email || '—';
    servers.value = (data.servers || []).map((s) => ({
      id: s.serverId ?? '',
      name: s.serverName ?? '',
      // The hub has no single canonical URL — use the first hostname candidate.
      url: s.hostnameCandidates?.[0] ?? '',
      status: s.status ?? 'offline',
      owner: ownerName,
      last_seen: unixToIso(s.lastSeenAt),
      // Library count the hub caches from the server's heartbeats; undefined on
      // older hubs that don't report it → the table renders "—".
      library_count: typeof s.libraryCount === 'number' ? s.libraryCount : undefined,
    }));
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

/**
 * Open the media server's own web UI in a new tab. The URL is the first
 * hostname candidate the server advertised to the hub at pairing time; when the
 * server reported none (`url` is empty) the Manage button is disabled.
 */
function manageServer(server: Server): void {
  if (!server.url) return;
  window.open(server.url, '_blank', 'noopener,noreferrer');
}

/**
 * Browse this server's libraries INLINE on the hub. Selecting it sets the hub's
 * "current server" (persisted) so `mediaApiBase` resolves to that server's relay
 * proxy (`/api/v1/servers/{id}/proxy`), then navigates to the Browse home where
 * the library rails load over the reverse tunnel. Only offered for an online
 * server — the proxy needs the server's tunnel connected (an offline server's
 * proxy returns 503).
 */
function browseServer(server: Server): void {
  if (server.status !== 'online') return;
  // Pass the server's own public origin (its first hostname candidate) so the
  // player can stream media bytes DIRECTLY from the server with native Range — the
  // relay proxy doesn't route `/media/:id/stream`. Empty when the server reported
  // no reachable URL; playback then falls back to an HLS transcode over the proxy.
  serverStore.setCurrent(server.id, server.name, server.url);
  void router.push(browseHome);
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
      <Button variant="solid" size="sm" left-icon="plus" @click="openAdd">Add server</Button>
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
        <Button variant="solid" size="sm" left-icon="plus" @click="openAdd">Add server</Button>
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
                <Button
                  variant="solid"
                  size="sm"
                  left-icon="play"
                  :disabled="server.status !== 'online'"
                  :title="server.status === 'online' ? `Browse ${server.name} here` : 'This server is offline — it must be connected to browse it here'"
                  :aria-label="`Browse ${server.name}`"
                  @click="browseServer(server)"
                >Browse</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  :disabled="!server.url"
                  :title="server.url ? `Open ${server.url}` : 'This server has not reported a reachable URL yet'"
                  :aria-label="`Manage ${server.name}`"
                  @click="manageServer(server)"
                >Manage</Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-model="addOpen" title="Add a server">
      <form class="my-servers__add-form" @submit.prevent="submitClaim">
        <p class="my-servers__add-help">
          On your media server, open <strong>Settings → Connect to hub</strong> to get a claim code,
          then paste it here.
        </p>
        <label class="my-servers__add-label" for="claim-code">Claim code</label>
        <input
          id="claim-code"
          v-model="claimCode"
          class="my-servers__add-input"
          type="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="e.g. ABCD-1234"
          :disabled="claiming"
        />
        <p v-if="claimError" class="my-servers__add-error" role="alert">{{ claimError }}</p>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" :disabled="claiming" @click="addOpen = false">Cancel</Button>
        <Button
          variant="solid"
          size="sm"
          left-icon="plus"
          :loading="claiming"
          :disabled="claiming"
          @click="submitClaim"
        >
          Add server
        </Button>
      </template>
    </Modal>
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
.my-servers__add-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.my-servers__add-help {
  margin: 0 0 var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
.my-servers__add-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.my-servers__add-input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-family: var(--font-mono, monospace);
  color: var(--text);
  background: var(--surface-sunken, var(--surface));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md, 8px);
}
.my-servers__add-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}
.my-servers__add-error {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--danger, var(--text));
}
</style>
