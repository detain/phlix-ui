<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin TasksPage (S78) — the one place an operator can fire the server's
 * maintenance work by hand, grouped by what it touches.
 *
 * ## Only buttons whose endpoint exists
 *
 * S78's brief lists eight sections. Four of them (Library scan-all,
 * Recommendations "recompute similarity", Newsletter "send now", and a
 * server-side "check for updates NOW" trigger) name endpoints the server does
 * **not** register — verified against
 * `ApplicationRouterWirePathGuardTest::ROUTE_MANIFEST`, which is an exact list
 * of every composed route. A button that 404s is worse than an absent one, so
 * those are either omitted or replaced by a link to the page that really owns
 * the capability (Libraries for per-library scans, Plugins for plugin updates,
 * Settings for the restart control), and every absence is EXPLAINED in the
 * section that names it. Every `Button` on this page below the "Go to …" links
 * posts to a route that is in that manifest.
 *
 * ## The four absent sections, decided by name (S330)
 *
 * The AC audit (S330) closed each absent action explicitly rather than leaving
 * it silently missing — the exact failure S78's mismatch existed to correct:
 *
 *  - **Library scan-all** — closed. There is no server endpoint that scans
 *    every library at once; scans are per library on the Libraries page. The
 *    honest note below stays.
 *  - **Recommendations "recompute similarity"** — closed. Similarity is
 *    computed per item in the background as media is scanned
 *    (`SimilarityWorker`); a server-wide recompute is O(N²) per library and
 *    unwanted, so there is a note, not a button.
 *  - **Newsletter "send now"** — closed. The newsletter is sent on the
 *    server's weekly schedule; a send-now is unwanted, so there is a note, not
 *    a button.
 *  - **Server "check for updates NOW"** — S273-owned. `AdminUpdatesController`
 *    has no force-check endpoint; the button below refetches the last
 *    background check's result and says so.
 *
 * ## Three response shapes, rendered three different ways
 *
 * - **sync (200)** — `reap-scan-jobs`, `reap-transcode-jobs`,
 *   `cleanup-orphaned-stats`. The work is finished when the promise resolves;
 *   the numbers in the response ARE the outcome, so they are rendered inline.
 * - **queued, fresh (202 `created:true`)** — a new job id to watch.
 * - **queued, already running (200 `created:false`)** — the server refused to
 *   stack a second run and handed back the EXISTING job. This must not look
 *   like a fresh submission, or the operator concludes their click did nothing
 *   and clicks again. The two messages are deliberately worded so neither is a
 *   substring of the other.
 *
 * ## `dedupe-paths` shows which mode it is in
 *
 * The server defaults `apply` to `false` and requires a strict boolean `true`
 * to actually merge rows. A safe default is only safe if the operator can see
 * which mode is armed, so the mode is a radio pair with the live mode echoed
 * into the button label AND a warning banner, and Apply routes through a
 * confirmation modal. Dry run fires immediately — previewing is harmless.
 */
import { ref, reactive, computed, onMounted, onBeforeUnmount, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminMaintenanceApi,
  type MaintenanceTask,
  type MaintenanceTaskName,
  type MaintenanceJob,
  type QueuedTaskResult,
} from '../../api/admin/maintenance';
import { AdminBackupApi } from '../../api/admin/backup';
import { AdminUpdatesApi, type CoreUpdateStatus } from '../../api/admin/updates';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import PageHint from '../../components/ui/PageHint.vue';
import { adminPageHelp } from './helpLinks';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const client =
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() });
const api = new AdminMaintenanceApi(client);
const backupApi = new AdminBackupApi(client);
const updatesApi = new AdminUpdatesApi(client);
const toasts = useToastStore();

// ── Per-action feedback ──────────────────────────────────────────────────────
/** Tone of an inline result line. Mirrors `Badge`'s tones. */
type FeedbackTone = 'success' | 'error' | 'warning' | 'info';
interface Feedback {
  tone: FeedbackTone;
  text: string;
}

/** Every action id on this page. Used to key `busy`/`feedback` — no free strings. */
const ACTION_IDS = [
  'dedupe-paths',
  'storage-snapshot',
  'cleanup-orphaned-stats',
  'reap-scan-jobs',
  'reap-transcode-jobs',
  'backup-create',
  'update-status',
] as const;
type ActionId = (typeof ACTION_IDS)[number];

const busy = reactive<Record<ActionId, boolean>>(
  Object.fromEntries(ACTION_IDS.map((id) => [id, false])) as Record<ActionId, boolean>,
);
const feedback = reactive<Record<ActionId, Feedback | null>>(
  Object.fromEntries(ACTION_IDS.map((id) => [id, null])) as Record<ActionId, Feedback | null>,
);

function ok(id: ActionId, text: string): void {
  feedback[id] = { tone: 'success', text };
  toasts.success(text);
}
function warn(id: ActionId, text: string): void {
  feedback[id] = { tone: 'warning', text };
  toasts.info(text);
}
/** Render the REASON, not a generic "failed" — the AC asks for the reason on screen. */
function fail(id: ActionId, e: unknown, fallback: string): void {
  const text = errMessage(e, fallback);
  feedback[id] = { tone: 'error', text };
  toasts.error(text);
}

// ── Task catalogue (GET …/tasks) ─────────────────────────────────────────────
/**
 * UI-side fallbacks so the buttons exist even when the catalogue call fails.
 * The server's `GET …/tasks` entry wins whenever it is available, so a label or
 * description changed server-side shows up here without a UI release.
 */
const TASK_FALLBACKS: Record<MaintenanceTaskName, Omit<MaintenanceTask, 'task'>> = {
  'storage-snapshot': {
    mode: 'queued',
    label: 'Storage snapshot',
    description: 'Recompute per-bucket storage usage. Walks the vault, so it runs on the queue.',
    destructive: false,
  },
  'reap-scan-jobs': {
    mode: 'sync',
    label: 'Reap stale scan jobs',
    description: 'Fail library-scan rows stuck in "running". Minimum age is six hours.',
    destructive: false,
  },
  'reap-transcode-jobs': {
    mode: 'sync',
    label: 'Reap stale transcode jobs',
    description: 'Fail transcode jobs whose worker went away.',
    destructive: false,
  },
  'cleanup-orphaned-stats': {
    mode: 'sync',
    label: 'Clean up orphaned stats',
    description: 'Delete statistics rows whose media item no longer exists.',
    destructive: true,
  },
  'dedupe-paths': {
    mode: 'queued',
    label: 'Merge duplicate paths',
    description: 'Find media rows that share a file path and merge them onto one row.',
    destructive: true,
  },
};

const catalogue = ref<MaintenanceTask[]>([]);

/** Server metadata for a task, falling back to the UI-side copy. */
function meta(name: MaintenanceTaskName): Omit<MaintenanceTask, 'task'> {
  const fromServer = catalogue.value.find((t) => t.task === name);
  return fromServer ?? TASK_FALLBACKS[name];
}

async function loadCatalogue(): Promise<void> {
  try {
    catalogue.value = await api.listTasks();
  } catch {
    // Non-fatal: the buttons run off TASK_FALLBACKS. Losing the descriptions is
    // not worth an error banner over an action list that still works.
    catalogue.value = [];
  }
}

// ── Job list (GET …/jobs) + polling ──────────────────────────────────────────
const jobs = ref<MaintenanceJob[]>([]);
const jobsLoading = ref(true);
const jobsError = ref<string | null>(null);

/** The drainer polls every 5 s; matching it keeps the table at most one tick stale. */
const POLL_INTERVAL_MS = 5000;
let pollTimer: ReturnType<typeof setInterval> | null = null;

function hasActiveJob(): boolean {
  return jobs.value.some((j) => j.status === 'queued' || j.status === 'running');
}

function stopPolling(): void {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

/** Start polling only while something is in flight; stop the moment nothing is. */
function syncPolling(): void {
  if (hasActiveJob()) {
    if (pollTimer === null) {
      pollTimer = setInterval(() => {
        void refreshJobs();
      }, POLL_INTERVAL_MS);
    }
    return;
  }
  stopPolling();
}

async function refreshJobs(): Promise<void> {
  jobsError.value = null;
  try {
    jobs.value = await api.listJobs({ limit: 20 });
  } catch (e) {
    jobsError.value = errMessage(e, 'Failed to load maintenance jobs.');
  } finally {
    jobsLoading.value = false;
    syncPolling();
  }
}

/** Put a job the server just handed back at the head of the table, de-duplicated by id. */
function mergeJob(job: MaintenanceJob | null): void {
  if (!job) {
    return;
  }
  jobs.value = [job, ...jobs.value.filter((j) => j.id !== job.id)];
  syncPolling();
}

// ── Queued-task feedback: fresh vs already-running ───────────────────────────
/**
 * The two messages a queued POST can produce.
 *
 * They are worded so that NEITHER is a substring of the other — a UI test that
 * used `toContain` on overlapping copy would pass on the wrong branch, and this
 * branch is exactly the one an operator misreads.
 */
function queuedMessage(result: QueuedTaskResult, label: string): { fresh: boolean; text: string } {
  const id = result.job?.id ?? 'unknown';
  return result.created
    ? { fresh: true, text: `${label}: queued a new run (job ${id}).` }
    : { fresh: false, text: `${label}: already running — showing the existing job (${id}).` };
}

function applyQueuedResult(id: ActionId, result: QueuedTaskResult, label: string): void {
  const message = queuedMessage(result, label);
  mergeJob(result.job);
  if (message.fresh) {
    ok(id, message.text);
  } else {
    warn(id, message.text);
  }
}

// ── Library: merge duplicate paths (dedupe-paths, queued, dry run by default) ─
/** `'preview'` sends `apply:false`; `'apply'` sends a strict boolean `true`. */
const dedupeMode = ref<'preview' | 'apply'>('preview');
const dedupeConfirmOpen = ref(false);
const dedupeIsApply = computed(() => dedupeMode.value === 'apply');

async function runDedupe(): Promise<void> {
  busy['dedupe-paths'] = true;
  const applying = dedupeIsApply.value;
  try {
    const result = await api.dedupePaths({ apply: applying });
    applyQueuedResult('dedupe-paths', result, applying ? 'Merge duplicate paths (APPLY)' : 'Merge duplicate paths (dry run)');
  } catch (e) {
    fail('dedupe-paths', e, 'Failed to start the duplicate-path merge.');
  } finally {
    busy['dedupe-paths'] = false;
  }
}

/** Dry run fires straight away; the destructive mode goes through a confirm. */
function submitDedupe(): void {
  if (dedupeIsApply.value) {
    dedupeConfirmOpen.value = true;
    return;
  }
  void runDedupe();
}

function confirmDedupe(): void {
  dedupeConfirmOpen.value = false;
  void runDedupe();
}

// ── Stats/health: storage snapshot (queued) ──────────────────────────────────
async function runStorageSnapshot(): Promise<void> {
  busy['storage-snapshot'] = true;
  try {
    applyQueuedResult('storage-snapshot', await api.storageSnapshot(), 'Storage snapshot');
  } catch (e) {
    fail('storage-snapshot', e, 'Failed to start the storage snapshot.');
  } finally {
    busy['storage-snapshot'] = false;
  }
}

// ── Stats/health: cleanup orphaned stats (sync, destructive) ─────────────────
const cleanupConfirmOpen = ref(false);

async function runCleanup(): Promise<void> {
  cleanupConfirmOpen.value = false;
  busy['cleanup-orphaned-stats'] = true;
  try {
    const { data } = await api.cleanupOrphanedStats();
    const suffix = data.truncated
      ? ` The per-table cap of ${data.limit} was reached — run it again to continue.`
      : '';
    ok('cleanup-orphaned-stats', `Deleted ${data.total} orphaned statistics rows.${suffix}`);
  } catch (e) {
    fail('cleanup-orphaned-stats', e, 'Failed to clean up orphaned statistics.');
  } finally {
    busy['cleanup-orphaned-stats'] = false;
  }
}

// ── Reapers (both sync) ──────────────────────────────────────────────────────
async function runReapScanJobs(): Promise<void> {
  busy['reap-scan-jobs'] = true;
  try {
    const { data } = await api.reapScanJobs();
    // `floor_applied` is surfaced, not swallowed: the operator asked for one age
    // and got another, and a silently-raised bound is how a "nothing happened"
    // report starts.
    const note = data.floor_applied
      ? ` The requested age of ${data.requested_older_than_seconds}s was raised to the ${data.older_than_seconds}s minimum.`
      : '';
    ok('reap-scan-jobs', `Reaped ${data.reaped} stale scan jobs.${note}`);
  } catch (e) {
    fail('reap-scan-jobs', e, 'Failed to reap stale scan jobs.');
  } finally {
    busy['reap-scan-jobs'] = false;
  }
}

async function runReapTranscodeJobs(): Promise<void> {
  busy['reap-transcode-jobs'] = true;
  try {
    const { data } = await api.reapTranscodeJobs();
    ok('reap-transcode-jobs', `Reaped ${data.reaped} stale transcode jobs.`);
  } catch (e) {
    fail('reap-transcode-jobs', e, 'Failed to reap stale transcode jobs.');
  } finally {
    busy['reap-transcode-jobs'] = false;
  }
}

// ── Backups: create now ──────────────────────────────────────────────────────
async function runBackupNow(): Promise<void> {
  busy['backup-create'] = true;
  try {
    const result = await backupApi.create({});
    ok('backup-create', result.message || 'Backup created.');
  } catch (e) {
    fail('backup-create', e, 'Failed to create a backup.');
  } finally {
    busy['backup-create'] = false;
  }
}

// ── Server: update status ────────────────────────────────────────────────────
/**
 * There is NO "check for updates now" endpoint. `AdminUpdatesController::status`
 * reports the state of the last BACKGROUND check and triggers nothing, so this
 * button is labelled for what it does — refetch that state — rather than
 * implying it forces a fresh check.
 */
const updateStatus = ref<CoreUpdateStatus | null>(null);

async function refreshUpdateStatus(): Promise<void> {
  busy['update-status'] = true;
  try {
    const status = await updatesApi.getStatus();
    updateStatus.value = status;
    ok(
      'update-status',
      status.updateAvailable
        ? `Update available: ${status.latestVersion ?? 'unknown'} (running ${status.currentVersion}).`
        : `Up to date on ${status.currentVersion}.`,
    );
  } catch (e) {
    fail('update-status', e, 'Failed to read the update status.');
  } finally {
    busy['update-status'] = false;
  }
}

// ── Presentation helpers ─────────────────────────────────────────────────────
/** Tone class for an action's inline result line, or `''` when it has none. */
function feedbackClass(id: ActionId): string {
  const entry = feedback[id];
  return entry === null ? '' : `admin-tasks__feedback--${entry.tone}`;
}

function jobTone(status: MaintenanceJob['status']): 'neutral' | 'info' | 'success' | 'error' {
  if (status === 'completed') return 'success';
  if (status === 'failed') return 'error';
  if (status === 'running') return 'info';
  return 'neutral';
}

onMounted(() => {
  void loadCatalogue();
  void refreshJobs();
});

onBeforeUnmount(stopPolling);
</script>

<template>
  <div class="admin-tasks">
    <header class="admin-tasks__head">
      <h1 class="admin-tasks__title">Tasks</h1>
      <Button
        variant="ghost"
        size="sm"
        left-icon="refresh"
        :loading="jobsLoading"
        @click="refreshJobs"
      >
        Refresh jobs
      </Button>
    </header>

    <PageHint :links="adminPageHelp.tasks.links" :details="adminPageHelp.tasks.details">
      Run the server's maintenance work by hand. <strong>Sync</strong> tasks finish before the
      button stops spinning and report their numbers here; <strong>queued</strong> tasks are handed
      to the maintenance worker and appear in <strong>Recent jobs</strong> below. Firing a queued
      task that is already running does not start a second one.
    </PageHint>

    <!-- ── Library ──────────────────────────────────────────────────────── -->
    <section class="admin-tasks__section" aria-labelledby="tasks-library-heading">
      <h2 id="tasks-library-heading" class="admin-tasks__subtitle">Library</h2>

      <div class="admin-tasks__card">
        <div class="admin-tasks__card-head">
          <h3 class="admin-tasks__card-title">{{ meta('dedupe-paths').label }}</h3>
          <Badge tone="info">queued</Badge>
          <Badge tone="warning">destructive</Badge>
        </div>
        <p class="admin-tasks__desc">{{ meta('dedupe-paths').description }}</p>

        <fieldset class="admin-tasks__modes">
          <legend class="admin-tasks__legend">Mode</legend>
          <label class="admin-tasks__mode">
            <input v-model="dedupeMode" type="radio" name="dedupe-mode" value="preview" />
            <span>Dry run — report what would be merged, change nothing</span>
          </label>
          <label class="admin-tasks__mode">
            <input v-model="dedupeMode" type="radio" name="dedupe-mode" value="apply" />
            <span>Apply — permanently merge the duplicate rows</span>
          </label>
        </fieldset>

        <p v-if="dedupeIsApply" class="admin-tasks__armed" role="status">
          Apply mode is armed: this run will delete duplicate media rows.
        </p>
        <p v-else class="admin-tasks__safe" role="status">
          Dry-run mode: nothing will be changed.
        </p>

        <div class="admin-tasks__actions">
          <Button
            :variant="dedupeIsApply ? 'danger' : 'solid'"
            size="sm"
            :loading="busy['dedupe-paths']"
            @click="submitDedupe"
          >
            {{ dedupeIsApply ? 'Merge duplicate paths (apply)' : 'Merge duplicate paths (dry run)' }}
          </Button>
        </div>

        <p
          v-if="feedback['dedupe-paths']"
          class="admin-tasks__feedback"
          :class="feedbackClass('dedupe-paths')"
          role="status"
        >
          {{ feedback['dedupe-paths']?.text }}
        </p>
      </div>

      <p class="admin-tasks__note">
        There is no server endpoint that scans every library at once. Scans are started per library
        on the
        <RouterLink :to="{ name: 'admin-libraries' }">Libraries</RouterLink>
        page.
      </p>
    </section>

    <!-- ── Recommendations ─────────────────────────────────────────────── -->
    <section class="admin-tasks__section" aria-labelledby="tasks-recommendations-heading">
      <h2 id="tasks-recommendations-heading" class="admin-tasks__subtitle">Recommendations</h2>
      <p class="admin-tasks__note">
        There is no server endpoint that recomputes similarity across every item. Similarity is
        computed per item in the background as media is scanned, and recommendations are derived
        from those scores automatically.
      </p>
    </section>

    <!-- ── Stats & health ───────────────────────────────────────────────── -->
    <section class="admin-tasks__section" aria-labelledby="tasks-stats-heading">
      <h2 id="tasks-stats-heading" class="admin-tasks__subtitle">Stats &amp; health</h2>

      <div class="admin-tasks__card">
        <div class="admin-tasks__card-head">
          <h3 class="admin-tasks__card-title">{{ meta('storage-snapshot').label }}</h3>
          <Badge tone="info">queued</Badge>
        </div>
        <p class="admin-tasks__desc">{{ meta('storage-snapshot').description }}</p>
        <div class="admin-tasks__actions">
          <Button variant="solid" size="sm" :loading="busy['storage-snapshot']" @click="runStorageSnapshot">
            Take storage snapshot
          </Button>
        </div>
        <p
          v-if="feedback['storage-snapshot']"
          class="admin-tasks__feedback"
          :class="feedbackClass('storage-snapshot')"
          role="status"
        >
          {{ feedback['storage-snapshot']?.text }}
        </p>
      </div>

      <div class="admin-tasks__card">
        <div class="admin-tasks__card-head">
          <h3 class="admin-tasks__card-title">{{ meta('cleanup-orphaned-stats').label }}</h3>
          <Badge tone="neutral">sync</Badge>
          <Badge tone="warning">destructive</Badge>
        </div>
        <p class="admin-tasks__desc">{{ meta('cleanup-orphaned-stats').description }}</p>
        <div class="admin-tasks__actions">
          <Button
            variant="danger"
            size="sm"
            :loading="busy['cleanup-orphaned-stats']"
            @click="cleanupConfirmOpen = true"
          >
            Clean up orphaned stats
          </Button>
        </div>
        <p
          v-if="feedback['cleanup-orphaned-stats']"
          class="admin-tasks__feedback"
          :class="feedbackClass('cleanup-orphaned-stats')"
          role="status"
        >
          {{ feedback['cleanup-orphaned-stats']?.text }}
        </p>
      </div>

      <!-- Job health -->
      <div class="admin-tasks__card">
        <div class="admin-tasks__card-head">
          <h3 class="admin-tasks__card-title">Recent jobs</h3>
        </div>
        <div v-if="jobsLoading" class="admin-tasks__skel"><Skeleton variant="text" :lines="3" /></div>
        <EmptyState
          v-else-if="jobsError"
          icon="alert"
          title="Couldn't load maintenance jobs"
          :description="jobsError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="refreshJobs">Retry jobs</Button>
          </template>
        </EmptyState>
        <p v-else-if="jobs.length === 0" class="admin-tasks__desc">No maintenance jobs yet.</p>
        <table v-else class="admin-tasks__table" aria-label="Recent maintenance jobs">
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Status</th>
              <th scope="col">Queued</th>
              <th scope="col">Finished</th>
              <th scope="col">Error</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobs" :key="job.id">
              <td>{{ job.task }}</td>
              <td><Badge :tone="jobTone(job.status)">{{ job.status }}</Badge></td>
              <td class="admin-tasks__date">{{ job.queued_at ?? '—' }}</td>
              <td class="admin-tasks__date">{{ job.completed_at ?? '—' }}</td>
              <td class="admin-tasks__err">{{ job.error ?? '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Backups ──────────────────────────────────────────────────────── -->
    <section class="admin-tasks__section" aria-labelledby="tasks-backup-heading">
      <h2 id="tasks-backup-heading" class="admin-tasks__subtitle">Backups</h2>
      <div class="admin-tasks__card">
        <div class="admin-tasks__card-head">
          <h3 class="admin-tasks__card-title">Create a backup now</h3>
          <Badge tone="neutral">sync</Badge>
        </div>
        <p class="admin-tasks__desc">
          Snapshot the database and settings immediately, outside the automatic schedule.
        </p>
        <div class="admin-tasks__actions">
          <Button variant="solid" size="sm" :loading="busy['backup-create']" @click="runBackupNow">
            Create backup now
          </Button>
          <RouterLink :to="{ name: 'admin-backup' }" class="admin-tasks__link">
            Go to Backup
          </RouterLink>
        </div>
        <p
          v-if="feedback['backup-create']"
          class="admin-tasks__feedback"
          :class="feedbackClass('backup-create')"
          role="status"
        >
          {{ feedback['backup-create']?.text }}
        </p>
      </div>
    </section>

    <!-- ── Reapers ──────────────────────────────────────────────────────── -->
    <section class="admin-tasks__section" aria-labelledby="tasks-reapers-heading">
      <h2 id="tasks-reapers-heading" class="admin-tasks__subtitle">Reapers</h2>

      <div class="admin-tasks__card">
        <div class="admin-tasks__card-head">
          <h3 class="admin-tasks__card-title">{{ meta('reap-scan-jobs').label }}</h3>
          <Badge tone="neutral">sync</Badge>
        </div>
        <p class="admin-tasks__desc">{{ meta('reap-scan-jobs').description }}</p>
        <div class="admin-tasks__actions">
          <Button variant="solid" size="sm" :loading="busy['reap-scan-jobs']" @click="runReapScanJobs">
            Reap stale scan jobs
          </Button>
        </div>
        <p
          v-if="feedback['reap-scan-jobs']"
          class="admin-tasks__feedback"
          :class="feedbackClass('reap-scan-jobs')"
          role="status"
        >
          {{ feedback['reap-scan-jobs']?.text }}
        </p>
      </div>

      <div class="admin-tasks__card">
        <div class="admin-tasks__card-head">
          <h3 class="admin-tasks__card-title">{{ meta('reap-transcode-jobs').label }}</h3>
          <Badge tone="neutral">sync</Badge>
        </div>
        <p class="admin-tasks__desc">{{ meta('reap-transcode-jobs').description }}</p>
        <div class="admin-tasks__actions">
          <Button
            variant="solid"
            size="sm"
            :loading="busy['reap-transcode-jobs']"
            @click="runReapTranscodeJobs"
          >
            Reap stale transcode jobs
          </Button>
        </div>
        <p
          v-if="feedback['reap-transcode-jobs']"
          class="admin-tasks__feedback"
          :class="feedbackClass('reap-transcode-jobs')"
          role="status"
        >
          {{ feedback['reap-transcode-jobs']?.text }}
        </p>
      </div>
    </section>

    <!-- ── Plugins ──────────────────────────────────────────────────────── -->
    <section class="admin-tasks__section" aria-labelledby="tasks-plugins-heading">
      <h2 id="tasks-plugins-heading" class="admin-tasks__subtitle">Plugins</h2>
      <p class="admin-tasks__note">
        Checking for and applying plugin updates lives on the
        <RouterLink :to="{ name: 'admin-plugins' }">Plugins</RouterLink>
        page, which already owns the per-plugin update list and the catalogue pin.
      </p>
    </section>

    <!-- ── Newsletter ───────────────────────────────────────────────────── -->
    <section class="admin-tasks__section" aria-labelledby="tasks-newsletter-heading">
      <h2 id="tasks-newsletter-heading" class="admin-tasks__subtitle">Newsletter</h2>
      <p class="admin-tasks__note">
        There is no server endpoint that sends the newsletter immediately. It is sent on the
        server's weekly schedule, configured in the server settings.
      </p>
    </section>

    <!-- ── Server ───────────────────────────────────────────────────────── -->
    <section class="admin-tasks__section" aria-labelledby="tasks-server-heading">
      <h2 id="tasks-server-heading" class="admin-tasks__subtitle">Server</h2>
      <div class="admin-tasks__card">
        <div class="admin-tasks__card-head">
          <h3 class="admin-tasks__card-title">Update status</h3>
        </div>
        <p class="admin-tasks__desc">
          The version check runs in the background on the server; there is no endpoint that forces
          one. This refetches the result of the last check.
        </p>
        <div class="admin-tasks__actions">
          <Button variant="solid" size="sm" :loading="busy['update-status']" @click="refreshUpdateStatus">
            Check update status
          </Button>
        </div>
        <p v-if="updateStatus" class="admin-tasks__desc">
          Running {{ updateStatus.currentVersion }} · latest seen
          {{ updateStatus.latestVersion ?? 'unknown' }}
        </p>
        <p
          v-if="feedback['update-status']"
          class="admin-tasks__feedback"
          :class="feedbackClass('update-status')"
          role="status"
        >
          {{ feedback['update-status']?.text }}
        </p>
      </div>
      <p class="admin-tasks__note">
        Restarting the server is on the
        <RouterLink :to="{ name: 'admin-settings' }">Settings</RouterLink>
        page, which already owns that control.
      </p>
    </section>

    <!-- Cleanup confirm -->
    <Modal
      :model-value="cleanupConfirmOpen"
      title="Clean up orphaned stats"
      size="sm"
      @update:model-value="cleanupConfirmOpen = false"
    >
      <p>
        This permanently deletes statistics rows whose media item no longer exists. It cannot be
        undone. <strong>Continue?</strong>
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="cleanupConfirmOpen = false">Cancel</Button>
        <Button variant="danger" size="sm" :loading="busy['cleanup-orphaned-stats']" @click="runCleanup">
          Delete orphaned stats
        </Button>
      </template>
    </Modal>

    <!-- Dedupe apply confirm -->
    <Modal
      :model-value="dedupeConfirmOpen"
      title="Apply duplicate-path merge"
      size="sm"
      @update:model-value="dedupeConfirmOpen = false"
    >
      <p>
        Apply mode permanently merges duplicate media rows and deletes the losers. Run a dry run
        first if you have not. <strong>Continue?</strong>
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="dedupeConfirmOpen = false">Cancel</Button>
        <Button variant="danger" size="sm" :loading="busy['dedupe-paths']" @click="confirmDedupe">
          Merge for real
        </Button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.admin-tasks {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
.admin-tasks__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
.admin-tasks__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-tasks__subtitle {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-4);
}
.admin-tasks__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-tasks__card {
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.admin-tasks__card-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}
.admin-tasks__card-title {
  font-weight: var(--font-semibold);
  font-size: var(--text-md, var(--text-sm));
  color: var(--text);
  margin-right: var(--space-2);
}
.admin-tasks__desc {
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.admin-tasks__note {
  color: var(--text-subtle);
  font-size: var(--text-sm);
}
.admin-tasks__link {
  color: var(--accent-ring, var(--text));
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}
.admin-tasks__modes {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  border: 0;
  padding: 0;
}
.admin-tasks__legend {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-tasks__mode {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.admin-tasks__armed {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--error, var(--text));
}
.admin-tasks__safe {
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
.admin-tasks__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}
.admin-tasks__feedback {
  font-size: var(--text-sm);
}
.admin-tasks__feedback--success {
  color: var(--success, var(--text));
}
.admin-tasks__feedback--error {
  color: var(--error, var(--text));
}
.admin-tasks__feedback--warning {
  color: var(--warning, var(--text));
}
.admin-tasks__feedback--info {
  color: var(--text-muted);
}
.admin-tasks__skel {
  padding-block: var(--space-2);
}
.admin-tasks__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-tasks__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-tasks__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.admin-tasks__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.admin-tasks__err {
  color: var(--error, var(--text-muted));
}
</style>
