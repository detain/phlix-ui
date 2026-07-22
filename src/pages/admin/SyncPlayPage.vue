<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin SyncPlayPage (RA.14) — manage group-watching sessions, ported 1:1 from
 * the deleted React `SyncPlayPage` onto the `@phlix/ui` primitives. Lists all
 * SyncPlay groups in a tokenized table, creates a new group (with an optional
 * password) via a `Modal` form, and joins an existing group by id (also via a
 * `Modal`). Creating a group refetches the list afterward (matching the React
 * source); joining does not. Errors surface as toasts.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminSyncPlayApi,
  type CreateGroupInput,
  type JoinGroupInput,
  type SyncPlayGroup,
} from '../../api/admin/syncPlay';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import { adminPageHelp } from './helpLinks';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminSyncPlayApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ── Groups list state ─────────────────────────────────────────────────────────
const groups = ref<SyncPlayGroup[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadGroups(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    groups.value = await api.listGroups();
  } catch (e) {
    error.value = errMessage(e, 'Failed to load groups.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

// ── Create group modal ─────────────────────────────────────────────────────────
const createModalOpen = ref(false);
const createName = ref('');
const createPassword = ref('');
const submittingCreate = ref(false);

function openCreateModal(): void {
  createName.value = '';
  createPassword.value = '';
  createModalOpen.value = true;
}

function closeCreateModal(): void {
  createModalOpen.value = false;
}

async function submitCreateForm(): Promise<void> {
  if (!createName.value.trim()) {
    toasts.error('Group name is required.');
    return;
  }
  submittingCreate.value = true;
  try {
    const input: CreateGroupInput = { name: createName.value.trim() };
    if (createPassword.value.trim()) {
      input.password = createPassword.value.trim();
    }
    await api.createGroup(input);
    toasts.success('Group created.');
    closeCreateModal();
    await loadGroups();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to create group.'));
  } finally {
    submittingCreate.value = false;
  }
}

// ── Join group modal ───────────────────────────────────────────────────────────
const joinModalOpen = ref(false);
const joinGroupId = ref('');
const joinPassword = ref('');
const submittingJoin = ref(false);

function openJoinModal(groupId?: string): void {
  joinGroupId.value = groupId ?? '';
  joinPassword.value = '';
  joinModalOpen.value = true;
}

function closeJoinModal(): void {
  joinModalOpen.value = false;
}

async function submitJoinForm(): Promise<void> {
  if (!joinGroupId.value.trim()) {
    toasts.error('Group ID is required.');
    return;
  }
  submittingJoin.value = true;
  try {
    const input: JoinGroupInput = {};
    if (joinPassword.value.trim()) {
      input.password = joinPassword.value.trim();
    }
    await api.joinGroup(joinGroupId.value.trim(), input);
    toasts.success('Joined group.');
    closeJoinModal();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to join group.'));
  } finally {
    submittingJoin.value = false;
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function memberLabel(count: number): string {
  return `${count} member${count !== 1 ? 's' : ''}`;
}

onMounted(loadGroups);
</script>

<template>
  <section class="admin-syncplay" aria-labelledby="syncplay-heading">
    <header class="admin-syncplay__head">
      <div class="admin-syncplay__heading-group">
        <h1 id="syncplay-heading" class="admin-syncplay__title">SyncPlay</h1>
        <p class="admin-syncplay__subtitle">
          Watch together with synchronized playback for multiple viewers.
        </p>
      </div>
      <Button variant="solid" size="sm" left-icon="plus" @click="openCreateModal">
        Create group
      </Button>
    </header>

    <PageHint :links="adminPageHelp.syncplay.links" :details="adminPageHelp.syncplay.details">
      SyncPlay keeps playback in step across several viewers so everyone watches the same moment
      together. <strong>Create group</strong> starts a new shared session (optionally
      password-protected), and <strong>Join</strong> on a listed group lets someone hop into an
      existing session by ID.
    </PageHint>

    <div v-if="loading" class="admin-syncplay__skel"><Skeleton variant="text" :lines="5" /></div>
    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load groups"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadGroups">Retry</Button>
      </template>
    </EmptyState>
    <EmptyState
      v-else-if="groups.length === 0"
      icon="tv"
      title="No groups yet"
      description="Create one to start watching together."
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="plus" @click="openCreateModal">
          Create group
        </Button>
      </template>
    </EmptyState>
    <table v-else class="admin-syncplay__table" aria-label="SyncPlay groups">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Members</th>
          <th scope="col">Status</th>
          <th scope="col">Media</th>
          <th scope="col" class="admin-syncplay__actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.id">
          <td>
            <span class="admin-syncplay__name">{{ group.name }}</span>
            <Badge v-if="group.has_password" tone="warning">Password</Badge>
          </td>
          <td>{{ memberLabel(group.member_count) }}</td>
          <td>
            <Badge :tone="group.is_playing ? 'accent' : 'neutral'">
              {{ group.is_playing ? 'Playing' : 'Idle' }}
            </Badge>
          </td>
          <td class="admin-syncplay__media">{{ group.current_media ?? '—' }}</td>
          <td>
            <Button
              variant="ghost"
              size="sm"
              :aria-label="`Join ${group.name}`"
              @click="openJoinModal(group.id)"
            >
              Join
            </Button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Create group modal -->
    <Modal v-model="createModalOpen" title="Create SyncPlay group" @close="closeCreateModal">
      <form class="admin-syncplay__form" @submit.prevent="submitCreateForm">
        <label class="admin-syncplay__field">
          <span class="admin-syncplay__label">Group name</span>
          <input
            v-model="createName"
            type="text"
            class="admin-syncplay__input"
            autocomplete="off"
            placeholder="Movie Night"
            required
          />
        </label>
        <label class="admin-syncplay__field">
          <span class="admin-syncplay__label">Password (optional)</span>
          <input
            v-model="createPassword"
            type="password"
            class="admin-syncplay__input"
            autocomplete="new-password"
            data-lpignore="true"
            data-1p-ignore
            data-bwignore
            data-form-type="other"
            placeholder="Leave empty for an open group"
          />
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeCreateModal">Cancel</Button>
        <Button variant="solid" size="sm" :loading="submittingCreate" @click="submitCreateForm">
          Create group
        </Button>
      </template>
    </Modal>

    <!-- Join group modal -->
    <Modal v-model="joinModalOpen" title="Join SyncPlay group" @close="closeJoinModal">
      <form class="admin-syncplay__form" @submit.prevent="submitJoinForm">
        <label class="admin-syncplay__field">
          <span class="admin-syncplay__label">Group ID</span>
          <input
            v-model="joinGroupId"
            type="text"
            class="admin-syncplay__input"
            autocomplete="off"
            placeholder="sp_abc123def456"
            required
          />
        </label>
        <label class="admin-syncplay__field">
          <span class="admin-syncplay__label">Password (if required)</span>
          <input
            v-model="joinPassword"
            type="password"
            class="admin-syncplay__input"
            autocomplete="new-password"
            data-lpignore="true"
            data-1p-ignore
            data-bwignore
            data-form-type="other"
            placeholder="Leave empty if no password"
          />
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeJoinModal">Cancel</Button>
        <Button variant="solid" size="sm" :loading="submittingJoin" @click="submitJoinForm">
          Join group
        </Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-syncplay {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-syncplay__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.admin-syncplay__heading-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-syncplay__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-syncplay__subtitle {
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.admin-syncplay__skel {
  padding-block: var(--space-2);
}
.admin-syncplay__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-syncplay__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-syncplay__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.admin-syncplay__name {
  color: var(--text);
  font-weight: var(--font-medium);
  margin-right: var(--space-2);
}
.admin-syncplay__media {
  color: var(--text-subtle);
  white-space: nowrap;
}
.admin-syncplay__actions-col {
  width: 1%;
}

/* Forms */
.admin-syncplay__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-syncplay__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-syncplay__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-syncplay__input {
  width: 100%;
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
.admin-syncplay__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-syncplay__input::placeholder {
  color: var(--text-subtle);
}
@media (prefers-reduced-motion: reduce) {
  .admin-syncplay__input {
    transition: none;
  }
}
</style>
