<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 -->

<script setup lang="ts">
/**
 * InviteLinksPage (R5.2d) — hub's invite-links page.
 *
 * API surface:
 *   GET    /api/v1/me/invite-links  → { invite_links }  (entries carry url:null)
 *   POST   /api/v1/me/invite-links  → { url, token, expires_at, id }
 *   DELETE /api/v1/me/invite-links/{id} → 204 No Content
 *
 * Supporting dropdowns:
 *   GET /api/v1/me/servers          → { servers }
 *   GET /api/v1/me/libraries?server_id={id} → { libraries }
 *
 * Note: server_name and library_name are NOT in the invite-links response —
 * they must be looked up via the servers/libraries arrays.
 *
 * One-time-secret shape (phlix-hub 779fc7f, hash-storage law): the invite secret
 * is an opaque 64-hex token the hub stores only as sha256(token). The create
 * response is the ONLY place {url, token} ever appear in plaintext, so the modal
 * keeps the form visible after success and shows the result prominently with a
 * copy affordance and a "shown once" warning; listed rows have url:null and get
 * no copy button.
 */
import { ref, computed, onMounted } from 'vue';
import { api, ApiClient } from '../api/client';
import {
  InviteLinksApi,
  ServersApi,
  LibrariesApi,
  type CreateInviteLinkResponse,
  type InviteLink,
  type Server,
  type Library,
} from '../api/invite-links';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import PageHint from '../components/ui/PageHint.vue';
import { hubPageHelp } from './hubHelpLinks';
import Select from '../components/ui/Select.vue';

const EXPIRY_OPTIONS = [
  { value: 604800, label: '7 days' },
  { value: 2592000, label: '30 days' },
  { value: 7776000, label: '90 days' },
  { value: 31536000, label: '1 year' },
  { value: 0, label: 'Never' },
] as const;

const PERMISSION_OPTIONS = [
  { value: 'read', label: 'Read' },
  { value: 'readwrite', label: 'Read/Write' },
] as const;

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http = props.client ?? api;
const inviteLinksApi = new InviteLinksApi(http);
const serversApi = new ServersApi(http);
const librariesApi = new LibrariesApi(http);
const toasts = useToastStore();

// ─── Link list state ─────────────────────────────────────────────────────────

const links = ref<InviteLink[]>([]);
const servers = ref<Server[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// ─── Create modal state ──────────────────────────────────────────────────────

const showCreateModal = ref(false);
const creating = ref(false);

/**
 * The freshly-created link while the modal shows its one-time result view.
 * Non-null swaps the form for the URL/token reveal; the hub will never expose
 * this payload again once the modal closes.
 */
const createdLink = ref<CreateInviteLinkResponse | null>(null);
const copyingResult = ref<'url' | 'token' | null>(null);

const formServerId = ref<string | null>(null);
const formLibraryId = ref<string | null>(null);
const formPermission = ref<'read' | 'readwrite'>('read');
const formMaxUses = ref<number>(1);
const formExpiresIn = ref<number>(604800); // 7 days default

const libraries = ref<Library[]>([]);
const librariesLoading = ref(false);

// ─── Copy-to-clipboard state ─────────────────────────────────────────────────

const copyingId = ref<string | null>(null);

// ─── Computed ───────────────────────────────────────────────────────────────

/**
 * Map server id → server name for display. The hub's `GET /api/v1/me/servers`
 * returns camelCase `ServerInfoDto` fields (`serverId`/`serverName`) — same as
 * `MyServersPage.vue` consumes. Servers missing an id are skipped so they can't
 * poison the map with an `undefined` key.
 */
const serverNameMap = computed(() => {
  const m = new Map<string, string>();
  for (const s of servers.value) {
    if (s.serverId) m.set(s.serverId, s.serverName ?? s.serverId);
  }
  return m;
});

/** Map library_id → library_name for display. */
const libraryNameMap = computed(() => {
  const m = new Map<string, string>();
  for (const lib of libraries.value) m.set(lib.id, lib.name);
  return m;
});

/**
 * Options for the required "Server" dropdown. Built from the camelCase wire fields;
 * entries with no `serverId` are dropped rather than rendered as an unselectable
 * `{value: undefined}` option (which silently broke create with "Please select a
 * server"). Falls back to the id as the label when the hub reports no name.
 */
const serverOptions = computed(() =>
  servers.value
    .filter((s): s is Server & { serverId: string } => Boolean(s.serverId))
    .map((s) => ({ value: s.serverId, label: s.serverName ?? s.serverId })),
);

const libraryOptions = computed(() => [
  { value: '', label: 'All Libraries' },
  ...libraries.value.map((lib) => ({ value: lib.id, label: lib.name })),
]);

// ─── Load functions ──────────────────────────────────────────────────────────

async function loadLinks(initial = false): Promise<void> {
  if (initial) loading.value = true;
  error.value = null;
  try {
    const data = await inviteLinksApi.list();
    links.value = data.invite_links ?? [];
  } catch (e) {
    error.value = errMessage(e, 'Failed to load invite links.');
    toasts.error(error.value);
  } finally {
    if (initial) loading.value = false;
  }
}

async function loadServers(): Promise<void> {
  try {
    const data = await serversApi.list();
    servers.value = data.servers ?? [];
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load servers.'));
  }
}

async function loadLibraries(serverId: string): Promise<void> {
  librariesLoading.value = true;
  formLibraryId.value = null; // reset library when server changes
  try {
    const data = await librariesApi.listByServer(serverId);
    libraries.value = data.libraries ?? [];
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load libraries.'));
  } finally {
    librariesLoading.value = false;
  }
}

// ─── Actions ─────────────────────────────────────────────────────────────────

async function createLink(): Promise<void> {
  if (!formServerId.value) {
    toasts.error('Please select a server.');
    return;
  }
  creating.value = true;
  try {
    const result = await inviteLinksApi.create({
      server_id: formServerId.value,
      library_id: formLibraryId.value || null,
      permission: formPermission.value,
      max_uses: formMaxUses.value,
      expires_in: formExpiresIn.value,
    });
    // The create payload is shown once and never again — keep the modal open in
    // its result view (URL + token + warning) instead of dismissing it.
    createdLink.value = result;
    // Auto-copy the URL as a safety net in case the user closes without copying.
    try {
      await navigator.clipboard.writeText(result.url);
      toasts.success('Invite link created and copied to clipboard!');
    } catch {
      toasts.success('Invite link created!');
    }
    await loadLinks();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to create invite link.'));
  } finally {
    creating.value = false;
  }
}

async function revokeLink(id: string): Promise<void> {
  try {
    await inviteLinksApi.revoke(id);
    toasts.success('Invite link revoked.');
    await loadLinks();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to revoke invite link.'));
  }
}

/**
 * Copy a listed link's URL. Since phlix-hub 779fc7f the list endpoint returns
 * `url: null` (the token is only ever plaintext at creation), so this guards on
 * it — the template also hides the button, but the function must not write
 * "null" to the clipboard if ever invoked with a null-url link.
 */
async function copyLinkUrl(link: InviteLink): Promise<void> {
  if (link.url === null) return;
  copyingId.value = link.id;
  try {
    await navigator.clipboard.writeText(link.url);
    toasts.success('Link copied to clipboard!');
  } catch {
    toasts.error('Failed to copy link.');
  } finally {
    copyingId.value = null;
  }
}

/** Copy the freshly-created link's full URL from the one-time result view. */
async function copyCreatedUrl(): Promise<void> {
  if (!createdLink.value) return;
  copyingResult.value = 'url';
  try {
    await navigator.clipboard.writeText(createdLink.value.url);
    toasts.success('Invite URL copied to clipboard!');
  } catch {
    toasts.error('Failed to copy URL.');
  } finally {
    copyingResult.value = null;
  }
}

/** Copy the freshly-created link's opaque token from the one-time result view. */
async function copyCreatedToken(): Promise<void> {
  const token = createdLink.value?.token;
  if (!token) return;
  copyingResult.value = 'token';
  try {
    await navigator.clipboard.writeText(token);
    toasts.success('Invite token copied to clipboard!');
  } catch {
    toasts.error('Failed to copy token.');
  } finally {
    copyingResult.value = null;
  }
}

// ─── Modal control ──────────────────────────────────────────────────────────

async function openCreateModal(): Promise<void> {
  resetForm();
  showCreateModal.value = true;
  await loadServers();
}

function closeCreateModal(): void {
  showCreateModal.value = false;
  resetForm();
}

function resetForm(): void {
  createdLink.value = null;
  copyingResult.value = null;
  formServerId.value = null;
  formLibraryId.value = null;
  formPermission.value = 'read';
  formMaxUses.value = 1;
  formExpiresIn.value = 604800;
  libraries.value = [];
}

function onServerChange(serverId: string | number | null): void {
  if (serverId) {
    loadLibraries(String(serverId));
  } else {
    libraries.value = [];
    formLibraryId.value = null;
  }
}

// ─── Display helpers ─────────────────────────────────────────────────────────

function getServerName(serverId: string): string {
  return serverNameMap.value.get(serverId) ?? serverId;
}

function getLibraryName(libraryId: string | null): string {
  if (libraryId === null) return 'All Libraries';
  return libraryNameMap.value.get(libraryId) ?? libraryId;
}

function formatDate(unixSeconds: number | null): string {
  if (unixSeconds === null) return 'Never';
  return new Date(unixSeconds * 1000).toLocaleDateString();
}

function formatUses(useCount: number, maxUses: number): string {
  if (maxUses === 0) return `${useCount} / Unlimited`;
  return `${useCount} / ${maxUses}`;
}

function permissionTone(permission: string): 'info' | 'success' | 'neutral' {
  switch (permission) {
    case 'read':
      return 'info';
    case 'readwrite':
      return 'success';
    default:
      return 'neutral';
  }
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

onMounted(() => loadLinks(true));
</script>

<template>
  <section class="invite-links" aria-labelledby="invite-links-heading">
    <header class="invite-links__head">
      <div class="invite-links__head-text">
        <h1 id="invite-links-heading" class="invite-links__title">Invite Links</h1>
        <p class="invite-links__subtitle">Create and manage invite links for sharing access to your servers.</p>
      </div>
      <Button variant="solid" size="md" left-icon="plus" @click="openCreateModal">
        New Invite
      </Button>
    </header>

    <PageHint :links="hubPageHelp['invite-links'].links" :details="hubPageHelp['invite-links'].details">
      Give someone access to a library on one of your servers by sending them a URL.
      <strong>New Invite</strong> creates a link scoped to a server and permission, with an
      optional use limit and expiry. <strong>Revoke</strong> disables a link immediately.
    </PageHint>

    <!-- Loading skeleton -->
    <div v-if="loading" class="invite-links__skel">
      <Skeleton variant="rect" height="120px" />
      <Skeleton variant="rect" height="120px" />
      <Skeleton variant="rect" height="120px" />
    </div>

    <!-- Error state -->
    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load invite links"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadLinks(true)">Retry</Button>
      </template>
    </EmptyState>

    <!-- Empty state -->
    <EmptyState
      v-else-if="links.length === 0"
      icon="bookmark-plus"
      title="No invite links"
      description="Create an invite link to share access to your servers and libraries."
    />

    <!-- Link cards list -->
    <div v-else class="invite-links__list">
      <article
        v-for="link in links"
        :key="link.id"
        class="invite-link-card"
      >
        <div class="invite-link-card__main">
          <div class="invite-link-card__names">
            <span class="invite-link-card__server">{{ getServerName(link.server_id) }}</span>
            <span class="invite-link-card__separator">›</span>
            <span class="invite-link-card__library">{{ getLibraryName(link.library_id) }}</span>
          </div>
          <div class="invite-link-card__meta">
            <Badge :tone="permissionTone(link.permission)">{{ link.permission }}</Badge>
            <span class="invite-link-card__uses">{{ formatUses(link.use_count, link.max_uses) }} uses</span>
            <span class="invite-link-card__divider">·</span>
            <span class="invite-link-card__expires">
              Expires {{ formatDate(link.expires_at) }}
            </span>
          </div>
        </div>
        <div class="invite-link-card__actions">
          <!-- url is null on listed links (phlix-hub 779fc7f): the token hash is
               one-way, so there is nothing to copy after creation. -->
          <Button
            v-if="link.url"
            variant="ghost"
            size="sm"
            :loading="copyingId === link.id"
            @click="copyLinkUrl(link)"
          >
            Copy URL
          </Button>
          <span v-else class="invite-link-card__secret-note">URL shown only at creation</span>
          <Button
            variant="ghost"
            size="sm"
            @click="revokeLink(link.id)"
          >
            Revoke
          </Button>
        </div>
      </article>
    </div>

    <!-- Create Modal -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="modal-backdrop" @click.self="closeCreateModal">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="create-modal-title">
          <header class="modal__header">
            <h2 id="create-modal-title" class="modal__title">New Invite Link</h2>
            <button type="button" class="modal__close" aria-label="Close" @click="closeCreateModal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div class="modal__body">
            <!-- One-time result view: the hub stores only sha256(token), so this
                 is the LAST chance to capture the URL/token for this link. -->
            <div v-if="createdLink" class="invite-result">
              <p class="invite-result__warning" role="alert">
                <strong>This is shown only once.</strong> The hub keeps just a one-way hash of
                the secret — once you close this dialog the URL can never be recovered.
                Copy it now and store it somewhere safe.
              </p>

              <div class="form-field form-field--full">
                <span class="form-label" id="created-url-label">Invite URL</span>
                <div class="invite-result__row">
                  <code class="invite-result__value" data-testid="created-url">{{ createdLink.url }}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    :loading="copyingResult === 'url'"
                    @click="copyCreatedUrl"
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div v-if="createdLink.token" class="form-field form-field--full">
                <span class="form-label" id="created-token-label">Secret token</span>
                <div class="invite-result__row">
                  <code class="invite-result__value invite-result__value--token" data-testid="created-token">{{ createdLink.token }}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    :loading="copyingResult === 'token'"
                    @click="copyCreatedToken"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            <div v-else class="form-grid">
              <!-- Server select (required) -->
              <div class="form-field">
                <label class="form-label" for="server-select">Server <span class="form-required">*</span></label>
                <Select
                  id="server-select"
                  v-model="formServerId"
                  :options="serverOptions"
                  placeholder="Select a server"
                  @change="onServerChange"
                />
              </div>

              <!-- Library select (optional) -->
              <div class="form-field">
                <label class="form-label" for="library-select">Library</label>
                <Select
                  id="library-select"
                  v-model="formLibraryId"
                  :options="libraryOptions"
                  :disabled="!formServerId || librariesLoading"
                  :placeholder="librariesLoading ? 'Loading...' : 'All Libraries'"
                />
              </div>

              <!-- Permission select -->
              <div class="form-field">
                <label class="form-label" for="permission-select">Permission</label>
                <Select
                  id="permission-select"
                  v-model="formPermission"
                  :options="PERMISSION_OPTIONS"
                />
              </div>

              <!-- Max uses -->
              <div class="form-field">
                <label class="form-label" for="max-uses">Max Uses</label>
                <input
                  id="max-uses"
                  v-model.number="formMaxUses"
                  type="number"
                  min="0"
                  class="form-input"
                />
              </div>

              <!-- Expires in -->
              <div class="form-field form-field--full">
                <label class="form-label" for="expires-select">Expires In</label>
                <Select
                  id="expires-select"
                  v-model="formExpiresIn"
                  :options="EXPIRY_OPTIONS"
                />
              </div>
            </div>
          </div>

          <footer class="modal__footer">
            <template v-if="createdLink">
              <Button variant="solid" size="md" @click="closeCreateModal">Done</Button>
            </template>
            <template v-else>
              <Button variant="ghost" size="md" @click="closeCreateModal">Cancel</Button>
              <Button
                variant="solid"
                size="md"
                :loading="creating"
                :disabled="!formServerId"
                @click="createLink"
              >
                Create Invite
              </Button>
            </template>
          </footer>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.invite-links {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-6);
}

.invite-links__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.invite-links__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}

.invite-links__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}

.invite-links__skel {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Link cards list */
.invite-links__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.invite-link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: border-color var(--dur-fast) var(--ease-out);
}

.invite-link-card:hover {
  border-color: var(--border-strong);
}

.invite-link-card__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}

.invite-link-card__names {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.invite-link-card__server {
  font-weight: var(--font-semibold);
  color: var(--text);
}

.invite-link-card__separator {
  color: var(--text-subtle);
}

.invite-link-card__library {
  color: var(--text-muted);
}

.invite-link-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.invite-link-card__uses,
.invite-link-card__expires {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.invite-link-card__divider {
  color: var(--text-subtle);
}

.invite-link-card__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.invite-link-card__secret-note {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  font-style: italic;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: var(--space-4);
}

.modal {
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-3);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border);
}

.modal__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0;
}

.modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: var(--text-subtle);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}

.modal__close:hover {
  background: var(--surface-2);
  color: var(--text);
}

.modal__body {
  padding: var(--space-5);
  overflow-y: auto;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--border);
}

/* One-time create result view */
.invite-result {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.invite-result__warning {
  margin: 0;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--accent-ring);
  border-radius: var(--radius-md);
  background: var(--accent-soft);
  color: var(--text);
  font-size: var(--text-sm);
  line-height: 1.5;
}

.invite-result__row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}

.invite-result__value {
  flex: 1;
  min-width: 0;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  color: var(--text);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-sm);
  word-break: break-all;
  user-select: all;
}

.invite-result__value--token {
  font-size: var(--text-xs);
}

/* Form grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-field--full {
  grid-column: 1 / -1;
}

.form-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text);
}

.form-required {
  color: var(--error);
}

.form-input {
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .invite-link-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .invite-link-card__actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
