<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../api/client';

interface AuditLog {
  id: string;
  action: string;
  actor: string;
  target?: string;
  details?: string;
  ip_address?: string;
  created_at: string;
}

const logs = ref<AuditLog[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const page = ref(1);
const totalPages = ref(1);

async function loadLogs(pageNum = 1) {
  try {
    loading.value = true;
    const data = await api.get<{ logs: AuditLog[]; total: number; page: number; total_pages: number }>(
      '/api/v1/audit-logs',
      { page: String(pageNum) }
    );
    logs.value = data.logs || [];
    page.value = data.page || 1;
    totalPages.value = data.total_pages || 1;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load audit logs';
  } finally {
    loading.value = false;
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString();
}

function getActionColor(action: string): string {
  if (action.includes('create') || action.includes('add')) return '#22c55e';
  if (action.includes('delete') || action.includes('remove')) return '#ef4444';
  if (action.includes('update') || action.includes('edit')) return '#3b82f6';
  if (action.includes('login') || action.includes('auth')) return '#8b5cf6';
  return '#6b7280';
}

function getActionIcon(action: string): string {
  if (action.includes('create') || action.includes('add')) return '+';
  if (action.includes('delete') || action.includes('remove')) return '-';
  if (action.includes('update') || action.includes('edit')) return '~';
  if (action.includes('login') || action.includes('auth')) return '@';
  return '#';
}

onMounted(() => {
  loadLogs();
});
</script>

<template>
  <div class="audit-logs-page">
    <div class="page-header">
      <h1 class="page-title">Audit Logs</h1>
      <p class="page-subtitle">View system activity and user actions</p>
    </div>

    <div v-if="loading" class="loading">Loading audit logs...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="logs-container">
      <div class="logs-list">
        <div v-for="log in logs" :key="log.id" class="log-entry">
          <div class="log-icon" :style="{ backgroundColor: getActionColor(log.action) }">
            {{ getActionIcon(log.action) }}
          </div>
          <div class="log-content">
            <div class="log-header">
              <span class="log-action">{{ log.action }}</span>
              <span class="log-actor">{{ log.actor }}</span>
              <span class="log-time">{{ formatDate(log.created_at) }}</span>
            </div>
            <p v-if="log.target" class="log-target">Target: {{ log.target }}</p>
            <p v-if="log.details" class="log-details">{{ log.details }}</p>
            <span v-if="log.ip_address" class="log-ip">IP: {{ log.ip_address }}</span>
          </div>
        </div>

        <div v-if="logs.length === 0" class="empty-state">
          <p>No audit logs found.</p>
        </div>
      </div>

      <div v-if="totalPages > 1" class="pagination">
        <button
          class="btn btn-secondary"
          :disabled="page <= 1"
          @click="loadLogs(page - 1)"
        >
          Previous
        </button>
        <span class="page-info">Page {{ page }} of {{ totalPages }}</span>
        <button
          class="btn btn-secondary"
          :disabled="page >= totalPages"
          @click="loadLogs(page + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audit-logs-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text, #e4e4e7);
  margin: 0 0 8px;
}

.page-subtitle {
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

.logs-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.log-entry {
  background: var(--color-surface, #27272a);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  gap: 12px;
}

.log-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.log-content {
  flex: 1;
  min-width: 0;
}

.log-header {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 4px;
}

.log-action {
  font-weight: 600;
  color: var(--color-text, #e4e4e7);
  font-size: 0.875rem;
}

.log-actor {
  color: var(--color-primary, #3b82f6);
  font-size: 0.875rem;
}

.log-time {
  color: var(--color-text-secondary, #a1a1aa);
  font-size: 0.75rem;
  margin-left: auto;
}

.log-target, .log-details {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #a1a1aa);
  margin: 0 0 2px;
  word-break: break-word;
}

.log-ip {
  font-size: 0.75rem;
  color: var(--color-text-secondary, #a1a1aa);
  font-family: monospace;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}

.page-info {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #a1a1aa);
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

.btn-secondary {
  background: var(--color-surface-hover, #3f3f46);
  color: var(--color-text, #e4e4e7);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-surface-active, #52525b);
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: var(--color-text-secondary, #a1a1aa);
}
</style>
