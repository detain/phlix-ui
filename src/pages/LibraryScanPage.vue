<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * LibraryScanPage (R5.2a) — the standalone, scan-only library surface the server
 * app mounts. The admin `LibrariesPage` supersedes it for full CRUD + history +
 * match-metadata; this page stays a lighter surface that just lists libraries and
 * triggers a scan / rescan, re-skinned onto the Nocturne tokens + `@phlix/ui`
 * primitives.
 *
 * Data flows are UNCHANGED from the pre-redo page (presentation-only re-skin):
 *   - GET  /api/v1/libraries                      → { libraries }
 *   - GET  /api/v1/libraries/:id/scan-status      → { job }
 *   - POST /api/v1/libraries/:id/scan
 *   - POST /api/v1/libraries/:id/rescan
 * Status is loaded once per library on mount and re-fetched after a scan/rescan —
 * there is no interval polling (that lives on the admin `LibrariesPage`).
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton
 * so production behavior is identical.
 */
import { ref, onMounted } from 'vue';
import { api, ApiClient } from '../api/client';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';

interface Library {
  id: string;
  name: string;
  type: string;
  paths: string[];
  item_count?: number;
  last_scan_at?: string;
  created_at: string;
}

interface ScanStatus {
  id: string;
  library_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  queued_at: string;
  started_at?: string;
  completed_at?: string;
  error?: string;
}

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get' | 'post'> = props.client ?? api;
const toasts = useToastStore();

const libraries = ref<Library[]>([]);
const scanStatuses = ref<Record<string, ScanStatus>>({});
const loading = ref(true);
const error = ref<string | null>(null);

async function loadLibraries(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const data = await http.get<{ libraries: Library[] }>('/api/v1/libraries');
    libraries.value = data.libraries || [];
    for (const lib of libraries.value) {
      void loadScanStatus(lib.id);
    }
  } catch (e) {
    error.value = errMessage(e, 'Failed to load libraries.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

async function loadScanStatus(libraryId: string): Promise<void> {
  try {
    // The live server returns the job under `scan_status` (LibraryController), while
    // the legacy/admin shape used `job`. Accept BOTH wire keys — the project's
    // SPA-layer contract-drift convention — so the status badge actually renders in
    // production instead of silently staying "Idle".
    const status = await http.get<{ scan_status?: ScanStatus | null; job?: ScanStatus | null }>(
      `/api/v1/libraries/${libraryId}/scan-status`,
    );
    const jobStatus = status.scan_status ?? status.job ?? null;
    if (jobStatus) {
      scanStatuses.value = { ...scanStatuses.value, [libraryId]: jobStatus };
    }
  } catch {
    // No scan status available — leave the library at its last-known (or idle) state.
  }
}

async function triggerScan(libraryId: string): Promise<void> {
  try {
    await http.post(`/api/v1/libraries/${libraryId}/scan`);
    toasts.success('Scan queued.');
    await loadScanStatus(libraryId);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to trigger scan.'));
  }
}

async function triggerRescan(libraryId: string): Promise<void> {
  try {
    await http.post(`/api/v1/libraries/${libraryId}/rescan`);
    toasts.success('Rescan queued.');
    await loadScanStatus(libraryId);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to trigger rescan.'));
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleString();
}

/** True while a library has a scan in flight (Scan/Rescan disabled). */
function isBusy(status: ScanStatus | undefined): boolean {
  return status?.status === 'running' || status?.status === 'queued';
}

/** Human-readable label for a scan-job status. */
function statusLabel(status: ScanStatus | undefined): string {
  if (!status) return 'Idle';
  switch (status.status) {
    case 'queued':
      return 'Queued';
    case 'running':
      return 'Running';
    case 'completed':
      return 'Completed';
    case 'failed':
      return 'Failed';
    default:
      return status.status;
  }
}

/** Badge tone for a scan-job status. */
function statusTone(status: ScanStatus | undefined): 'neutral' | 'info' | 'success' | 'error' {
  if (!status) return 'neutral';
  switch (status.status) {
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

onMounted(loadLibraries);
</script>

<template>
  <section class="library-scan" aria-labelledby="library-scan-heading">
    <header class="library-scan__head">
      <h1 id="library-scan-heading" class="library-scan__title">Library Scanner</h1>
      <p class="library-scan__subtitle">Scan your media libraries to discover new content.</p>
    </header>

    <div v-if="loading" class="library-scan__skel"><Skeleton variant="text" :lines="6" /></div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load libraries"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadLibraries">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="libraries.length === 0"
      icon="film"
      title="No libraries configured"
      description="Add a library to get started."
    />

    <div v-else class="library-scan__table-wrap">
      <table class="library-scan__table" aria-label="Libraries">
        <thead>
          <tr>
            <th scope="col">Library</th>
            <th scope="col">Type</th>
            <th scope="col">Items</th>
            <th scope="col">Last scan</th>
            <th scope="col">Status</th>
            <th scope="col" class="library-scan__actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="library in libraries" :key="library.id">
            <td>
              <div class="library-scan__name">{{ library.name }}</div>
              <div v-if="library.paths.length" class="library-scan__paths">
                {{ library.paths.join(', ') }}
              </div>
            </td>
            <td>{{ library.type }}</td>
            <td class="library-scan__num">
              {{ library.item_count !== undefined ? library.item_count : '—' }}
            </td>
            <td class="library-scan__date">{{ formatDate(library.last_scan_at) }}</td>
            <td>
              <span class="library-scan__status" :data-testid="`status-${library.id}`">
                <Badge :tone="statusTone(scanStatuses[library.id])">
                  {{ statusLabel(scanStatuses[library.id]) }}
                </Badge>
                <span
                  v-if="scanStatuses[library.id]?.status === 'failed' && scanStatuses[library.id]?.error"
                  class="library-scan__error"
                >
                  {{ scanStatuses[library.id]?.error }}
                </span>
              </span>
            </td>
            <td>
              <div class="library-scan__actions">
                <Button
                  variant="solid"
                  size="sm"
                  :aria-label="`Scan ${library.name}`"
                  :disabled="isBusy(scanStatuses[library.id])"
                  @click="triggerScan(library.id)"
                >
                  Scan
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  :aria-label="`Rescan ${library.name}`"
                  :disabled="isBusy(scanStatuses[library.id])"
                  @click="triggerRescan(library.id)"
                >
                  Rescan
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
.library-scan {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-6);
}
.library-scan__head {
  margin-bottom: var(--space-6);
}
.library-scan__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}
.library-scan__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}
.library-scan__skel {
  padding-block: var(--space-2);
}
.library-scan__table-wrap {
  overflow-x: auto;
}
.library-scan__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.library-scan__table th {
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
.library-scan__table td {
  padding: var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.library-scan__name {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.library-scan__paths {
  margin-top: var(--space-1);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  word-break: break-all;
}
.library-scan__num,
.library-scan__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.library-scan__status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.library-scan__error {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.library-scan__actions-col {
  width: 1%;
}
.library-scan__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
