<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../api/client';

interface Server {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline' | 'connecting';
  owner: string;
  library_count?: number;
  last_seen?: string;
}

const servers = ref<Server[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadServers() {
  try {
    const data = await api.get<{ servers: Server[] }>('/api/v1/servers');
    servers.value = data.servers || [];
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load servers';
  } finally {
    loading.value = false;
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'online': return '#22c55e';
    case 'offline': return '#ef4444';
    case 'connecting': return '#eab308';
    default: return '#6b7280';
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleString();
}

onMounted(() => {
  loadServers();
});
</script>

<template>
  <div class="my-servers-page">
    <div class="page-header">
      <h1 class="page-title">My Servers</h1>
      <p class="page-subtitle">Manage your connected media servers</p>
    </div>

    <div v-if="loading" class="loading">Loading servers...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="servers-list">
      <div v-for="server in servers" :key="server.id" class="server-card">
        <div class="server-status" :style="{ backgroundColor: getStatusColor(server.status) }"></div>
        <div class="server-info">
          <h3 class="server-name">{{ server.name }}</h3>
          <p class="server-url">{{ server.url }}</p>
          <div class="server-meta">
            <span>{{ server.owner }}</span>
            <span v-if="server.library_count !== undefined">{{ server.library_count }} libraries</span>
            <span>Last seen: {{ formatDate(server.last_seen) }}</span>
          </div>
        </div>
        <div class="server-actions">
          <button class="btn btn-primary">Manage</button>
        </div>
      </div>

      <div v-if="servers.length === 0" class="empty-state">
        <p>No servers connected yet.</p>
        <button class="btn btn-primary">Add Server</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-servers-page {
  max-width: 900px;
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

.servers-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.server-card {
  background: var(--color-surface, #27272a);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.server-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.server-info {
  flex: 1;
}

.server-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text, #e4e4e7);
  margin: 0 0 4px;
}

.server-url {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #a1a1aa);
  margin: 0 0 8px;
  font-family: monospace;
}

.server-meta {
  display: flex;
  gap: 16px;
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

.btn-primary {
  background: var(--color-primary, #3b82f6);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-hover, #2563eb);
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: var(--color-text-secondary, #a1a1aa);
}
</style>
