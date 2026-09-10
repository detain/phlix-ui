<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * ProfilesPage (S82) — the self-service "Manage Profiles" surface, routed at
 * `<base>/profiles` and reachable from the UserMenu.
 *
 * Every row comes from the real list endpoint (`GET /api/v1/profiles` through
 * `useProfileStore`), and every mutation goes to the matching self-service
 * route — rename is `PUT`, delete is `DELETE` (the server's 409
 * `profile.last_profile` refusal surfaces inline, never silently), switching
 * is the store's `POST …/switch` which re-mints the session. No local-only
 * writes: a failure leaves the row exactly as the server has it and reports
 * the error. Loading and error states are first-class (same three-state shape
 * as the Who's-watching gate).
 */
import { computed, onMounted, ref } from 'vue';
import { useProfileStore } from '../stores/useProfileStore';
import { useMessages } from '../composables/useMessages';
import type { OwnProfile } from '../api/admin/users';

const profiles = useProfileStore();
const { t } = useMessages();

onMounted(() => {
  void profiles.load();
});

const busy = computed(() => profiles.loading && !profiles.loaded);
const failed = computed(() => !profiles.loaded && profiles.error !== null);
const empty = computed(() => profiles.loaded && profiles.profiles.length === 0);

// ── inline rename ─────────────────────────────────────────────────────────────
const editingId = ref<string | null>(null);
const editName = ref('');
const saving = ref(false);

function startRename(p: OwnProfile): void {
  editingId.value = p.id;
  editName.value = p.name;
}
function cancelRename(): void {
  editingId.value = null;
  editName.value = '';
}
async function saveRename(): Promise<void> {
  if (editingId.value === null || saving.value) return;
  const name = editName.value.trim();
  if (name.length < 3) {
    profiles.error = t('profiles.renameTooShort');
    return;
  }
  saving.value = true;
  try {
    await profiles.rename(editingId.value, name);
    cancelRename();
  } finally {
    saving.value = false;
  }
}

// ── delete ────────────────────────────────────────────────────────────────────
const deletingId = ref<string | null>(null);
async function remove(p: OwnProfile): Promise<void> {
  if (deletingId.value !== null) return;
  deletingId.value = p.id;
  try {
    await profiles.removeProfile(p.id);
  } finally {
    deletingId.value = null;
  }
}

// ── create ────────────────────────────────────────────────────────────────────
const adding = ref(false);
const newName = ref('');
const creating = ref(false);
async function create(): Promise<void> {
  if (creating.value) return;
  const name = newName.value.trim();
  if (name.length < 3) return;
  creating.value = true;
  const ok = await profiles.createProfile(name);
  creating.value = false;
  if (ok) {
    adding.value = false;
    newName.value = '';
  }
}

async function use(p: OwnProfile): Promise<void> {
  await profiles.switchTo(p.id);
}
</script>

<template>
  <section class="manage-profiles">
    <header class="manage-profiles__head">
      <h1 class="manage-profiles__title">{{ t('profiles.manageTitle') }}</h1>
      <p class="manage-profiles__hint">{{ t('profiles.manageHint') }}</p>
    </header>

    <p v-if="busy" class="manage-profiles__state" data-testid="profiles-loading">{{ t('profiles.loading') }}</p>

    <div v-else-if="failed" class="manage-profiles__state manage-profiles__state--error" role="alert"
      data-testid="profiles-error">
      <p>{{ profiles.error }}</p>
      <button type="button" class="manage-profiles__action" data-testid="profiles-retry" @click="profiles.retry()">
        {{ t('common.retry') }}
      </button>
    </div>

    <template v-else>
      <p v-if="empty" class="manage-profiles__state" data-testid="profiles-empty">{{ t('profiles.empty') }}</p>

      <ul class="manage-profiles__list" data-testid="profiles-list">
        <li v-for="p in profiles.profiles" :key="p.id" class="manage-profiles__row" :data-testid="`profile-row-${p.id}`">
          <template v-if="editingId === p.id">
            <input
              v-model="editName"
              class="manage-profiles__input"
              data-testid="profile-rename-input"
              :maxlength="50"
              :aria-label="t('profiles.rename')"
              @keyup.enter="saveRename"
              @keyup.esc="cancelRename"
            />
            <button type="button" class="manage-profiles__action" data-testid="profile-rename-save" :disabled="saving"
              @click="saveRename">
              {{ t('profiles.save') }}
            </button>
            <button type="button" class="manage-profiles__action manage-profiles__action--ghost"
              data-testid="profile-rename-cancel" @click="cancelRename">
              {{ t('profiles.cancel') }}
            </button>
          </template>
          <template v-else>
            <button type="button" class="manage-profiles__pick" :disabled="profiles.switchingId !== null"
              :data-testid="`profile-use-${p.id}`" @click="use(p)">
              {{ p.is_active ? t('profiles.active') : t('profiles.use') }}
            </button>
            <span class="manage-profiles__name" :data-testid="`profile-name-${p.id}`">{{ p.name }}</span>
            <button type="button" class="manage-profiles__action manage-profiles__action--ghost"
              :data-testid="`profile-rename-${p.id}`" @click="startRename(p)">
              {{ t('profiles.rename') }}
            </button>
            <button type="button" class="manage-profiles__action manage-profiles__action--danger"
              :disabled="deletingId !== null || profiles.profiles.length <= 1"
              :title="profiles.profiles.length <= 1 ? t('profiles.deleteBlocked') : undefined"
              :data-testid="`profile-delete-${p.id}`" @click="remove(p)">
              {{ t('profiles.delete') }}
            </button>
          </template>
        </li>
      </ul>

      <div class="manage-profiles__create">
        <button v-if="!adding" type="button" class="manage-profiles__action" data-testid="profiles-add-open"
          @click="adding = true">
          + {{ t('profiles.add') }}
        </button>
        <template v-else>
          <input v-model="newName" class="manage-profiles__input" data-testid="profiles-add-input" :maxlength="50"
            :aria-label="t('profiles.add')" @keyup.enter="create" />
          <button type="button" class="manage-profiles__action" data-testid="profiles-add-save" :disabled="creating"
            @click="create">
            {{ t('profiles.save') }}
          </button>
        </template>
      </div>

      <p v-if="profiles.error" class="manage-profiles__state manage-profiles__state--error" role="alert"
        data-testid="profiles-mutation-error">
        {{ profiles.error }}
      </p>
    </template>
  </section>
</template>

<style scoped>
.manage-profiles {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}
.manage-profiles__head {
  margin-bottom: var(--space-6);
}
.manage-profiles__title {
  margin: 0 0 var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--fw-bold, 700);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.manage-profiles__hint,
.manage-profiles__state {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.manage-profiles__state--error {
  color: var(--danger, #e5484d);
}
.manage-profiles__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0 0 var(--space-6);
  padding: 0;
  list-style: none;
}
.manage-profiles__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--surface-2);
}
.manage-profiles__name {
  flex: 1;
  min-width: 0;
  color: var(--text);
  font-weight: var(--fw-medium, 500);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.manage-profiles__pick {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent-text);
  font-size: var(--text-xs);
  font-weight: var(--fw-semibold, 600);
}
.manage-profiles__pick:disabled {
  opacity: 0.55;
}
.manage-profiles__action {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface-3);
  color: var(--text);
  font-size: var(--text-xs);
}
.manage-profiles__action:disabled {
  opacity: 0.5;
}
.manage-profiles__action--ghost {
  background: transparent;
  border-color: transparent;
  color: var(--text-muted);
}
.manage-profiles__action--danger {
  border-color: var(--danger, #e5484d);
  color: var(--danger, #e5484d);
  background: transparent;
}
.manage-profiles__input {
  flex: 1;
  min-width: 0;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface-1, var(--surface-2));
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
}
.manage-profiles__create {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
</style>
