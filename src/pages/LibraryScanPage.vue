<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../api/client';

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

const libraries = ref<Library[]>([]);
const scanStatuses = ref<Record<string, ScanStatus>>({});
const loading = ref(true);
const error = ref<string | null>(null);

async function loadLibraries() {
  try {
    const data = await api.get<{ libraries: Library[] }>('/api/v1/libraries');
    libraries.value = data.libraries || [];
    for (const lib of libraries.value) {
      loadScanStatus(lib.id);
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load libraries';
  } finally {
    loading.value = false;
  }
}

async function loadScanStatus(libraryId: string) {
  try {
    const status = await api.get<{ job: ScanStatus }>(`/api/v1/libraries/${libraryId}/scan-status`);
    if (status.job) {
      scanStatuses.value[libraryId] = status.job;
    }
  } catch {
    // No scan status available
  }
}

async function triggerScan(libraryId: string) {
  try {
    await api.post(`/api/v1/libraries/${libraryId}/scan`);
    await loadScanStatus(libraryId);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to trigger scan';
  }
}

async function triggerRescan(libraryId: string) {
  try {
    await api.post(`/api/v1/libraries/${libraryId}/rescan`);
    await loadScanStatus(libraryId);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to trigger rescan';
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleString();
}

function getStatusBadge(status: ScanStatus | undefined): string {
  if (!status) return '';
  switch (status.status) {
    case 'queued': return '⏳ Queued';
    case 'running': return '🔄 Running';
    case 'completed': return '✅ Completed';
    case 'failed': return `❌ Failed: ${status.error || 'Unknown error'}`;
    default: return status.status;
  }
}

onMounted(() => {
  loadLibraries();
});
</script>

<template>
  <div class="library-scan-page">
    <div class="scan-header">
      <h1 class="scan-title">Library Scanner</h1>
      <p class="scan-subtitle">Scan your media libraries to discover new content</p>
    </div>

    <div v-if="loading" class="loading">Loading libraries...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="libraries-list">
      <div v-for="library in libraries" :key="library.id" class="library-card">
        <div class="library-info">
          <h3 class="library-name">{{ library.name }}</h3>
          <span class="library-type">{{ library.type }}</span>
          <p class="library-paths">{{ library.paths.join(', ') }}</p>
          <div class="library-meta">
            <span v-if="library.item_count !== undefined">{{ library.item_count }} items</span>
            <span>Last scan: {{ formatDate(library.last_scan_at) }}</span>
          </div>
          <div v-if="scanStatuses[library.id]" class="scan-status">
            {{ getStatusBadge(scanStatuses[library.id]) }}
          </div>
        </div>
        <div class="library-actions">
          <button
            class="btn btn-scan"
            @click="triggerScan(library.id)"
            :disabled="scanStatuses[library.id]?.status === 'running' || scanStatuses[library.id]?.status === 'queued'"
          >
            Scan
          </button>
          <button
            class="btn btn-rescan"
            @click="triggerRescan(library.id)"
            :disabled="scanStatuses[library.id]?.status === 'running' || scanStatuses[library.id]?.status === 'queued'"
          >
            Rescan
          </button>
        </div>
      </div>

      <div v-if="libraries.length === 0" class="empty-state">
        No libraries configured. Add a library to get started.
      </div>
    </div>
  </div>
</template>

<style scoped>
.library-scan-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.scan-header {
  margin-bottom: 32px;
}

.scan-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text, #e4e4e7);
  margin: 0 0 8px;
}

.scan-subtitle {
  color: var(--color-text-secondary, #a1a1aa);
  margin: 0;
}

.loading, .error {
  text-align: center;
  padding: 48px;
  color: var(--color-text-secondary, #a1a1aa);
}

.error {
  color: #ef4444;
}

.libraries-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.library-card {
  background: var(--color-surface, #27272a);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.library-info {
  flex: 1;
}

.library-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text, #e4e4e7);
  margin: 0 0 4px;
}

.library-type {
  display: inline-block;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--color-text-secondary, #a1a1aa);
  background: var(--color-surface-hover, #3f3f46);
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.library-paths {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #a1a1aa);
  margin: 0 0 8px;
  font-family: monospace;
}

.library-meta {
  display: flex;
  gap: 16px;
  font-size: 0.875rem;
  color: var(--color-text-secondary, #a1a1aa);
}

.scan-status {
  margin-top: 8px;
  font-size: 0.875rem;
}

.library-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-scan {
  background: var(--color-primary, #3b82f6);
  color: white;
}

.btn-scan:hover:not(:disabled) {
  background: var(--color-primary-hover, #2563eb);
}

.btn-rescan {
  background: var(--color-surface-hover, #3f3f46);
  color: var(--color-text, #e4e4e7);
}

.btn-rescan:hover:not(:disabled) {
  background: var(--color-surface-active, #52525b);
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: var(--color-text-secondary, #a1a1aa);
}
</style>
