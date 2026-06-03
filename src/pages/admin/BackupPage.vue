<script setup lang="ts">
/**
 * Admin BackupPage (RA.7) — server backup administration, ported 1:1 from the
 * deleted React `BackupPage` onto the `@phlix/ui` primitives. Section 1 lists
 * backups in a tokenized table with create / restore / upload-to-S3 / delete
 * actions (each mutation refetches the list, matching the React source).
 * Section 2 shows the auto-backup schedule (next-run + interval/retention form).
 * Loading → Skeleton; empty → EmptyState; errors surface as toasts.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminBackupApi,
  type Backup,
  type ScheduleData,
} from '../../api/admin/backup';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
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
const api = new AdminBackupApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ── Formatting helpers (ported 1:1) ──────────────────────────────────────────
/** Human-readable file size from bytes. */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/** Relative time label from an ISO string. */
function relativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}d ago`;
}

/** Next-backup relative label from a unix timestamp. */
function nextBackupRelative(timestamp: number | null): string {
  if (timestamp === null) return 'Not scheduled';
  const now = Math.floor(Date.now() / 1000);
  const diffSec = timestamp - now;
  if (diffSec < 0) return 'Overdue';
  const diffDay = Math.floor(diffSec / 86400);
  if (diffDay === 0) return 'Today';
  if (diffDay === 1) return 'Tomorrow';
  return `in ${diffDay} days`;
}

// ── Section 1: Backup list state ──────────────────────────────────────────────
const backups = ref<Backup[]>([]);
const loading = ref(true);
const s3Uploading = ref<string | null>(null);

async function loadBackups(): Promise<void> {
  loading.value = true;
  try {
    backups.value = await api.list();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load backups.'));
  } finally {
    loading.value = false;
  }
}

// ── Create backup ─────────────────────────────────────────────────────────────
const createOpen = ref(false);
const createLabel = ref('');
const creating = ref(false);

function openCreate(): void {
  createLabel.value = '';
  createOpen.value = true;
}

function closeCreate(): void {
  createOpen.value = false;
  createLabel.value = '';
}

async function submitCreate(): Promise<void> {
  creating.value = true;
  try {
    const trimmed = createLabel.value.trim();
    const result = await api.create(trimmed ? { label: trimmed } : {});
    toasts.success(result.message || 'Backup created.');
    closeCreate();
    await loadBackups();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to create backup.'));
  } finally {
    creating.value = false;
  }
}

// ── Restore backup ────────────────────────────────────────────────────────────
const restoring = ref<Backup | null>(null);
const restoreConfirming = ref(false);

function closeRestore(): void {
  restoring.value = null;
  restoreConfirming.value = false;
}

async function confirmRestore(): Promise<void> {
  const target = restoring.value;
  if (!target) return;
  restoreConfirming.value = true;
  try {
    const result = await api.restore(target.id);
    toasts.success(result.message || 'Restore completed.');
    closeRestore();
  } catch (e) {
    toasts.error(errMessage(e, 'Restore failed.'));
    closeRestore();
  }
}

// ── Delete backup ─────────────────────────────────────────────────────────────
const deleteTarget = ref<Backup | null>(null);
const deleteConfirming = ref(false);

function closeDelete(): void {
  deleteTarget.value = null;
  deleteConfirming.value = false;
}

async function confirmDelete(): Promise<void> {
  const target = deleteTarget.value;
  if (!target) return;
  deleteConfirming.value = true;
  try {
    await api.delete(target.id);
    toasts.success('Backup deleted.');
    closeDelete();
    await loadBackups();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete backup.'));
    closeDelete();
  }
}

// ── Upload to S3 ──────────────────────────────────────────────────────────────
async function uploadToS3(backup: Backup): Promise<void> {
  s3Uploading.value = backup.id;
  try {
    const result = await api.uploadToS3(backup.id);
    toasts.success(result.message || 'Uploaded to S3.');
    await loadBackups();
  } catch (e) {
    toasts.error(errMessage(e, 'S3 upload failed.'));
  } finally {
    s3Uploading.value = null;
  }
}

// ── Section 2: Schedule state ─────────────────────────────────────────────────
const schedule = ref<ScheduleData | null>(null);
const scheduleLoading = ref(true);
const intervalDays = ref('');
const retentionCount = ref('');
const savingSchedule = ref(false);

async function loadSchedule(): Promise<void> {
  scheduleLoading.value = true;
  try {
    const data = await api.getSchedule();
    schedule.value = data;
    intervalDays.value = String(data.auto_backup_interval_days);
    retentionCount.value = String(data.retention_count);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load schedule.'));
  } finally {
    scheduleLoading.value = false;
  }
}

async function saveSchedule(): Promise<void> {
  const interval = parseInt(intervalDays.value, 10);
  const retention = parseInt(retentionCount.value, 10);

  if (isNaN(interval) || interval < 0) {
    toasts.error('Backup interval must be a non-negative number.');
    return;
  }
  if (isNaN(retention) || retention < 1) {
    toasts.error('Retention count must be at least 1.');
    return;
  }

  savingSchedule.value = true;
  try {
    const result = await api.updateSchedule({
      auto_backup_interval_days: interval,
      retention_count: retention,
    });
    toasts.success('Schedule saved.');
    if (schedule.value) {
      schedule.value = {
        ...schedule.value,
        auto_backup_interval_days: result.auto_backup_interval_days,
        retention_count: result.retention_count,
      };
    }
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to save schedule.'));
  } finally {
    savingSchedule.value = false;
  }
}

onMounted(() => {
  void loadBackups();
  void loadSchedule();
});
</script>

<template>
  <div class="admin-backup">
    <!-- Section 1: Backup list -->
    <section class="admin-backup__section" aria-labelledby="backups-heading">
      <header class="admin-backup__head">
        <h1 id="backups-heading" class="admin-backup__title">Backups</h1>
        <Button variant="solid" size="sm" left-icon="plus" @click="openCreate">Create backup</Button>
      </header>

      <div v-if="loading" class="admin-backup__skel"><Skeleton variant="text" :lines="5" /></div>
      <EmptyState
        v-else-if="backups.length === 0"
        icon="film"
        title="No backups yet"
        description="Create one to get started."
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="plus" @click="openCreate">Create backup</Button>
        </template>
      </EmptyState>
      <table v-else class="admin-backup__table" aria-label="Backups">
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Size</th>
            <th scope="col">Created</th>
            <th scope="col">Storage</th>
            <th scope="col" class="admin-backup__actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="backup in backups" :key="backup.id">
            <td>
              <span v-if="backup.label">{{ backup.label }}</span>
              <span v-else class="admin-backup__muted">Unnamed</span>
            </td>
            <td class="admin-backup__num">{{ formatBytes(backup.size_bytes) }}</td>
            <td class="admin-backup__date">
              <span :title="backup.created_at">{{ relativeTime(backup.created_at) }}</span>
            </td>
            <td>
              <Badge :tone="backup.is_s3 ? 'success' : 'neutral'">
                {{ backup.is_s3 ? 'S3' : 'Local' }}
              </Badge>
            </td>
            <td>
              <div class="admin-backup__actions">
                <Button
                  variant="ghost"
                  size="sm"
                  :aria-label="`Restore ${backup.label || backup.id}`"
                  @click="restoring = backup"
                >
                  Restore
                </Button>
                <Button
                  v-if="!backup.is_s3"
                  variant="ghost"
                  size="sm"
                  :loading="s3Uploading === backup.id"
                  :aria-label="`Upload ${backup.label || backup.id} to S3`"
                  @click="uploadToS3(backup)"
                >
                  Upload to S3
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  :aria-label="`Delete ${backup.label || backup.id}`"
                  @click="deleteTarget = backup"
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Section 2: Schedule settings -->
    <section class="admin-backup__section" aria-labelledby="schedule-heading">
      <header class="admin-backup__head">
        <h2 id="schedule-heading" class="admin-backup__subtitle">Scheduled backups</h2>
      </header>

      <div v-if="scheduleLoading" class="admin-backup__skel"><Skeleton variant="text" :lines="3" /></div>
      <div v-else-if="schedule" class="admin-backup__card">
        <p class="admin-backup__next">
          <span class="admin-backup__next-label">Next scheduled backup:</span>
          <template v-if="schedule.next_scheduled_backup !== null">
            <span :title="schedule.next_scheduled_backup_iso ?? ''">
              {{ nextBackupRelative(schedule.next_scheduled_backup) }}
            </span>
            <span v-if="schedule.next_scheduled_backup_iso" class="admin-backup__muted">
              ({{ schedule.next_scheduled_backup_iso }})
            </span>
          </template>
          <span v-else class="admin-backup__muted">Not scheduled</span>
        </p>

        <form class="admin-backup__form" @submit.prevent="saveSchedule">
          <div class="admin-backup__form-row">
            <label class="admin-backup__field">
              <span class="admin-backup__label">Backup interval (days)</span>
              <input
                v-model="intervalDays"
                type="number"
                min="0"
                class="admin-backup__input"
                required
              />
            </label>
            <label class="admin-backup__field">
              <span class="admin-backup__label">Retention count</span>
              <input
                v-model="retentionCount"
                type="number"
                min="1"
                class="admin-backup__input"
                required
              />
            </label>
          </div>
          <div class="admin-backup__form-actions">
            <Button variant="solid" size="sm" :loading="savingSchedule" @click="saveSchedule">
              Save schedule
            </Button>
          </div>
        </form>
      </div>
    </section>

    <!-- Create backup modal -->
    <Modal v-model="createOpen" title="Create backup" @close="closeCreate">
      <form class="admin-backup__form" @submit.prevent="submitCreate">
        <label class="admin-backup__field">
          <span class="admin-backup__label">Label (optional)</span>
          <input
            v-model="createLabel"
            type="text"
            class="admin-backup__input"
            autocomplete="off"
            placeholder="e.g. Weekly backup"
          />
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeCreate">Cancel</Button>
        <Button variant="solid" size="sm" :loading="creating" @click="submitCreate">Create</Button>
      </template>
    </Modal>

    <!-- Restore confirm modal -->
    <Modal
      :model-value="restoring !== null"
      title="Restore backup"
      size="sm"
      @update:model-value="closeRestore"
    >
      <p>This will overwrite your current data. <strong>Continue?</strong></p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeRestore">Cancel</Button>
        <Button variant="solid" size="sm" :loading="restoreConfirming" @click="confirmRestore">
          Restore
        </Button>
      </template>
    </Modal>

    <!-- Delete confirm modal -->
    <Modal
      :model-value="deleteTarget !== null"
      title="Delete backup"
      size="sm"
      @update:model-value="closeDelete"
    >
      <p>
        Are you sure you want to delete backup
        <strong>{{ deleteTarget?.label || deleteTarget?.id }}</strong>? This cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeDelete">Cancel</Button>
        <Button variant="solid" size="sm" :loading="deleteConfirming" @click="confirmDelete">
          Delete
        </Button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.admin-backup {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
.admin-backup__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.admin-backup__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-backup__subtitle {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-backup__skel {
  padding-block: var(--space-2);
}
.admin-backup__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-backup__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-backup__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.admin-backup__num {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.admin-backup__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.admin-backup__muted {
  color: var(--text-subtle);
}
.admin-backup__actions-col {
  width: 1%;
}
.admin-backup__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Schedule card */
.admin-backup__card {
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-backup__next {
  margin-bottom: var(--space-5);
  color: var(--text-muted);
}
.admin-backup__next-label {
  font-weight: var(--font-semibold);
  color: var(--text);
  margin-right: var(--space-2);
}

/* Forms */
.admin-backup__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-backup__form-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}
.admin-backup__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1 1 12rem;
}
.admin-backup__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-backup__input {
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
.admin-backup__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-backup__input::placeholder {
  color: var(--text-subtle);
}
.admin-backup__form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
@media (prefers-reduced-motion: reduce) {
  .admin-backup__input {
    transition: none;
  }
}
</style>
