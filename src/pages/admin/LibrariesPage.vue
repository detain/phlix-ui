<script setup lang="ts">
/**
 * Admin LibrariesPage (RA.15) — full library CRUD + async scan surface, ported
 * 1:1 from the deleted React `LibrariesPage` onto the `@phlix/ui` primitives.
 * This SUPERSEDES the scan-only `LibraryScanPage`: it lists libraries (name,
 * type, path count, live scan status) in a tokenized table; adds / edits them
 * through a `Modal` form (paths entered one-per-line — the React filesystem
 * `PathPicker` is not ported); deletes with a confirm `Modal`; triggers async
 * scan / rescan / match-metadata; shows coarse live status by polling the 1.1b
 * `scan-status` endpoint; and lists per-library scan history in a `Modal`.
 *
 * Polling design (resident-safe): a single `setInterval` per library polls
 * `scanStatus`, stopping as soon as the job reaches a terminal state
 * (`completed`/`failed`) or `scan_status` is `null`. All intervals are tracked
 * in a ref and cleared in `onBeforeUnmount` — no leaked timers, no global
 * mutable state. The interval period is the `pollIntervalMs` prop (default
 * 2000ms) so tests can drive it with fake timers.
 *
 * Honesty about progress: the worker leaves `items_*` at `0` and `current_path`
 * at `null`, so this page shows lifecycle status only — never a fabricated
 * per-file progress bar. On `failed` it shows the server `error` string.
 */
import { ref, computed, onMounted, onBeforeUnmount, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminLibrariesApi,
  LIBRARY_TYPES,
  type Library,
  type LibraryType,
  type ScanJob,
} from '../../api/admin/libraries';
import { useToastStore } from '../../stores/useToastStore';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Select from '../../components/ui/Select.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import type { SelectOptionInput } from '../../components/ui/listbox';

/** Default polling period for live scan status (ms). */
const DEFAULT_POLL_INTERVAL_MS = 2000;

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
  /** Polling period for scan-status; small values for tests. */
  pollIntervalMs?: number;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminLibrariesApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

const pollMs = computed(() => props.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS);

function errMessage(e: unknown, fallback: string): string {
  return e instanceof Error && e.message ? e.message : fallback;
}

const typeOptions = computed<SelectOptionInput[]>(() =>
  LIBRARY_TYPES.map((t) => ({ value: t, label: t })),
);

/** Whether a scan-job status is terminal (polling should stop). */
function isTerminal(status: ScanJob['status']): boolean {
  return status === 'completed' || status === 'failed';
}

/** Human-readable summary of a library's current scan status. */
function statusLabel(job: ScanJob | null | undefined): string {
  if (!job) return 'Idle';
  switch (job.status) {
    case 'queued':
      return 'Queued';
    case 'running':
      return 'Running';
    case 'completed':
      return 'Completed';
    case 'failed':
      return 'Failed';
    default:
      return job.status;
  }
}

/** Badge tone for a scan-job status. */
function statusTone(job: ScanJob | null | undefined): 'neutral' | 'info' | 'success' | 'error' {
  if (!job) return 'neutral';
  switch (job.status) {
    case 'queued':
    case 'running':
      return 'info';
    case 'completed':
      return 'success';
    case 'failed':
      return 'error';
    default:
      return 'neutral';
  }
}

// ── List + status state ───────────────────────────────────────────────────────
const libraries = ref<Library[]>([]);
const loading = ref(true);
const statuses = ref<Record<string, ScanJob | null>>({});

// Live-polling timers, keyed by library id.
const timers: Record<string, ReturnType<typeof setInterval>> = {};

function stopPolling(libraryId: string): void {
  const timer = timers[libraryId];
  if (timer !== undefined) {
    clearInterval(timer);
    delete timers[libraryId];
  }
}

async function pollOnce(libraryId: string): Promise<void> {
  try {
    const job = await api.scanStatus(libraryId);
    statuses.value = { ...statuses.value, [libraryId]: job };
    if (job === null || isTerminal(job.status)) {
      stopPolling(libraryId);
    }
  } catch {
    // Transient poll failure: stop this library's polling so we do not hammer a
    // failing endpoint; status simply stays as last known.
    stopPolling(libraryId);
  }
}

function startPolling(libraryId: string): void {
  // Avoid stacking intervals for the same library.
  if (timers[libraryId] !== undefined) return;
  timers[libraryId] = setInterval(() => {
    void pollOnce(libraryId);
  }, pollMs.value);
}

async function loadLibraries(): Promise<void> {
  loading.value = true;
  try {
    const rows = await api.list();
    libraries.value = rows;
    // Prime status + resume polling for any library with an in-flight job.
    await Promise.all(
      rows.map(async (lib) => {
        try {
          const job = await api.scanStatus(lib.id);
          statuses.value = { ...statuses.value, [lib.id]: job };
          if (job !== null && !isTerminal(job.status)) {
            startPolling(lib.id);
          }
        } catch {
          // Ignore a per-library status failure on initial load.
        }
      }),
    );
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load libraries.'));
  } finally {
    loading.value = false;
  }
}

// ── Add / edit form ───────────────────────────────────────────────────────────
const formOpen = ref(false);
const editing = ref<Library | null>(null);
const name = ref('');
const type = ref<LibraryType>(LIBRARY_TYPES[0]);
const pathsText = ref('');
const submitting = ref(false);

const formTitle = computed(() => (editing.value ? 'Edit library' : 'Add library'));

/** Parse the one-path-per-line textarea into a trimmed, non-empty list. */
function parsePaths(): string[] {
  return pathsText.value
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

function openAdd(): void {
  editing.value = null;
  name.value = '';
  type.value = LIBRARY_TYPES[0];
  pathsText.value = '';
  formOpen.value = true;
}

function openEdit(lib: Library): void {
  editing.value = lib;
  name.value = lib.name;
  // `type` is shown read-only on edit (not updatable); keep a valid value.
  const known = LIBRARY_TYPES.find((t) => t === lib.type);
  type.value = known ?? LIBRARY_TYPES[0];
  pathsText.value = lib.paths.join('\n');
  formOpen.value = true;
}

function closeForm(): void {
  formOpen.value = false;
  editing.value = null;
}

async function submitForm(): Promise<void> {
  if (!name.value.trim()) {
    toasts.error('Name is required.');
    return;
  }
  const paths = parsePaths();
  if (paths.length === 0) {
    toasts.error('Select at least one path.');
    return;
  }
  submitting.value = true;
  try {
    const existing = editing.value;
    if (existing) {
      // Edit: send only editable fields — NEVER `type`.
      await api.update(existing.id, { name: name.value, paths });
      toasts.success('Library updated.');
    } else {
      const result = await api.create({ name: name.value, type: type.value, paths });
      toasts.success(result.message || 'Library created.');
    }
    closeForm();
    await loadLibraries();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to save library.'));
  } finally {
    submitting.value = false;
  }
}

// ── Delete confirm ─────────────────────────────────────────────────────────────
const deleting = ref<Library | null>(null);

async function confirmDelete(): Promise<void> {
  const target = deleting.value;
  if (!target) return;
  try {
    await api.remove(target.id);
    toasts.success('Library deleted.');
    deleting.value = null;
    await loadLibraries();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete library.'));
    deleting.value = null;
  }
}

// ── Scan / rescan / match-metadata ─────────────────────────────────────────────
async function triggerScan(lib: Library, kind: 'scan' | 'rescan' | 'metadata'): Promise<void> {
  try {
    const result =
      kind === 'metadata'
        ? await api.matchMetadata(lib.id)
        : kind === 'rescan'
          ? await api.rescan(lib.id)
          : await api.scan(lib.id);
    const fallback =
      kind === 'metadata'
        ? `Metadata match queued (job ${result.job_id}).`
        : `Scan queued (job ${result.job_id}).`;
    toasts.success(result.message || fallback);
    // Reflect the queued state immediately, then start polling.
    const prev = statuses.value[lib.id];
    statuses.value = {
      ...statuses.value,
      [lib.id]: prev ? { ...prev, status: 'queued' } : null,
    };
    startPolling(lib.id);
    // Kick an immediate poll so the UI updates without waiting a full tick.
    void pollOnce(lib.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to queue scan.'));
  }
}

// ── Scan history ───────────────────────────────────────────────────────────────
const historyFor = ref<Library | null>(null);
const history = ref<ScanJob[]>([]);
const historyLoading = ref(false);

const historyTitle = computed(() =>
  historyFor.value ? `Scan history — ${historyFor.value.name}` : 'Scan history',
);
const historyModalOpen = computed({
  get: () => historyFor.value !== null,
  set: (v: boolean) => {
    if (!v) closeHistory();
  },
});

async function openHistory(lib: Library): Promise<void> {
  historyFor.value = lib;
  history.value = [];
  historyLoading.value = true;
  try {
    history.value = await api.scanHistory(lib.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load history.'));
  } finally {
    historyLoading.value = false;
  }
}

function closeHistory(): void {
  historyFor.value = null;
  history.value = [];
}

onMounted(loadLibraries);

// Clear ALL intervals on unmount — no leaked timers.
onBeforeUnmount(() => {
  for (const id of Object.keys(timers)) {
    clearInterval(timers[id]);
    delete timers[id];
  }
});
</script>

<template>
  <section class="admin-libraries" aria-labelledby="libraries-heading">
    <header class="admin-libraries__head">
      <h1 id="libraries-heading" class="admin-libraries__title">Libraries</h1>
      <Button variant="solid" size="sm" left-icon="plus" @click="openAdd">Add library</Button>
    </header>

    <p class="admin-libraries__hint">
      Scan progress is coarse in this release — only the lifecycle
      (queued / running / completed / failed) is reported, not per-file detail.
    </p>

    <div v-if="loading" class="admin-libraries__skel"><Skeleton variant="text" :lines="6" /></div>
    <EmptyState
      v-else-if="libraries.length === 0"
      icon="film"
      title="No libraries yet"
      description="Add one to get started."
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="plus" @click="openAdd">Add library</Button>
      </template>
    </EmptyState>
    <table v-else class="admin-libraries__table" aria-label="Libraries">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Paths</th>
          <th scope="col">Status</th>
          <th scope="col" class="admin-libraries__actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lib in libraries" :key="lib.id">
          <td>{{ lib.name }}</td>
          <td>{{ lib.type }}</td>
          <td>{{ lib.paths.length }} paths</td>
          <td>
            <span class="admin-libraries__status" :data-testid="`status-${lib.id}`">
              <Badge :tone="statusTone(statuses[lib.id])">{{ statusLabel(statuses[lib.id]) }}</Badge>
              <span
                v-if="statuses[lib.id]?.status === 'failed' && statuses[lib.id]?.error"
                class="admin-libraries__error"
              >
                {{ statuses[lib.id]?.error }}
              </span>
            </span>
          </td>
          <td>
            <div class="admin-libraries__actions">
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Edit ${lib.name}`"
                @click="openEdit(lib)"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Scan ${lib.name}`"
                @click="triggerScan(lib, 'scan')"
              >
                Scan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Rescan ${lib.name}`"
                @click="triggerScan(lib, 'rescan')"
              >
                Rescan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Match metadata for ${lib.name}`"
                @click="triggerScan(lib, 'metadata')"
              >
                Match metadata
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`History for ${lib.name}`"
                @click="openHistory(lib)"
              >
                History
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Delete ${lib.name}`"
                @click="deleting = lib"
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add / edit modal -->
    <Modal v-model="formOpen" :title="formTitle" @close="closeForm">
      <form class="admin-libraries__form" @submit.prevent="submitForm">
        <label class="admin-libraries__field">
          <span class="admin-libraries__label">Name</span>
          <input v-model="name" type="text" class="admin-libraries__input" autocomplete="off" required />
        </label>
        <div class="admin-libraries__field">
          <span class="admin-libraries__label">Type</span>
          <input
            v-if="editing"
            class="admin-libraries__input"
            :value="type"
            readonly
            aria-readonly="true"
            aria-label="Type"
          />
          <Select
            v-else
            :model-value="type"
            :options="typeOptions"
            label="Type"
            @update:model-value="(v) => (type = String(v) as LibraryType)"
          />
          <span v-if="editing" class="admin-libraries__hint-text">Type cannot be changed.</span>
        </div>
        <label class="admin-libraries__field">
          <span class="admin-libraries__label">Paths (one per line)</span>
          <textarea
            v-model="pathsText"
            class="admin-libraries__textarea"
            rows="4"
            autocomplete="off"
            placeholder="/media/movies"
          ></textarea>
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeForm">Cancel</Button>
        <Button variant="solid" size="sm" :loading="submitting" @click="submitForm">
          {{ editing ? 'Save' : 'Create' }}
        </Button>
      </template>
    </Modal>

    <!-- Delete confirm modal -->
    <Modal
      :model-value="deleting !== null"
      title="Delete library"
      size="sm"
      @update:model-value="deleting = null"
    >
      <p>
        Delete library <strong>{{ deleting?.name }}</strong>? This cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="deleting = null">Cancel</Button>
        <Button variant="solid" size="sm" @click="confirmDelete">Delete</Button>
      </template>
    </Modal>

    <!-- Scan history modal -->
    <Modal v-model="historyModalOpen" :title="historyTitle" size="lg">
      <div v-if="historyLoading" class="admin-libraries__skel"><Skeleton variant="text" :lines="4" /></div>
      <EmptyState v-else-if="history.length === 0" icon="list" title="No scans yet" />
      <table v-else class="admin-libraries__table" aria-label="Scan history">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Queued</th>
            <th scope="col">Completed</th>
            <th scope="col">Error</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in history" :key="job.id">
            <td>{{ job.type }}</td>
            <td><Badge :tone="statusTone(job)">{{ statusLabel(job) }}</Badge></td>
            <td class="admin-libraries__date">{{ job.queued_at ?? '' }}</td>
            <td class="admin-libraries__date">{{ job.completed_at ?? '' }}</td>
            <td>{{ job.error ?? '' }}</td>
          </tr>
        </tbody>
      </table>
      <template #footer>
        <Button variant="solid" size="sm" @click="closeHistory">Close</Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-libraries {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-libraries__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-3);
}
.admin-libraries__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-libraries__hint {
  margin-bottom: var(--space-5);
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
.admin-libraries__skel {
  padding-block: var(--space-2);
}
.admin-libraries__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-libraries__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-libraries__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.admin-libraries__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.admin-libraries__status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.admin-libraries__error {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.admin-libraries__actions-col {
  width: 1%;
}
.admin-libraries__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Form */
.admin-libraries__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-libraries__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-libraries__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-libraries__hint-text {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.admin-libraries__input,
.admin-libraries__textarea {
  width: 100%;
  padding: var(--space-2) var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.admin-libraries__input {
  height: var(--control-h);
}
.admin-libraries__textarea {
  resize: vertical;
  font-family: var(--font-mono, monospace);
}
.admin-libraries__input:focus-visible,
.admin-libraries__textarea:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-libraries__input::placeholder,
.admin-libraries__textarea::placeholder {
  color: var(--text-subtle);
}
@media (prefers-reduced-motion: reduce) {
  .admin-libraries__input,
  .admin-libraries__textarea {
    transition: none;
  }
}
</style>
