<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../api/client';

interface FederationPeer {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'pending';
  shared_libraries_count?: number;
  last_sync?: string;
}

const peers = ref<FederationPeer[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadPeers() {
  try {
    const data = await api.get<{ peers: FederationPeer[] }>('/api/v1/federation/peers');
    peers.value = data.peers || [];
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load federation peers';
  } finally {
    loading.value = false;
  }
}

async function connectPeer(peerUrl: string) {
  try {
    await api.post('/api/v1/federation/connect', { url: peerUrl });
    await loadPeers();
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to connect to peer';
  }
}

async function disconnectPeer(peerId: string) {
  try {
    await api.post(`/api/v1/federation/peers/${peerId}/disconnect`);
    await loadPeers();
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to disconnect peer';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'connected': return '#22c55e';
    case 'disconnected': return '#ef4444';
    case 'pending': return '#eab308';
    default: return '#6b7280';
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleString();
}

onMounted(() => {
  loadPeers();
});
</script>

<template>
  <div class="federation-page">
    <div class="page-header">
      <h1 class="page-title">Federation</h1>
      <p class="page-subtitle">Connect with other Phlix servers to share libraries</p>
    </div>

    <div v-if="loading" class="loading">Loading federation peers...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="federation-content">
      <div class="peers-section">
        <h2 class="section-title">Connected Peers</h2>
        <div class="peers-list">
          <div v-for="peer in peers" :key="peer.id" class="peer-card">
            <div class="peer-status" :style="{ backgroundColor: getStatusColor(peer.status) }"></div>
            <div class="peer-info">
              <h3 class="peer-name">{{ peer.name }}</h3>
              <p class="peer-url">{{ peer.url }}</p>
              <div class="peer-meta">
                <span v-if="peer.shared_libraries_count !== undefined">{{ peer.shared_libraries_count }} shared libraries</span>
                <span>Last sync: {{ formatDate(peer.last_sync) }}</span>
              </div>
            </div>
            <div class="peer-actions">
              <button
                v-if="peer.status === 'connected'"
                class="btn btn-secondary"
                @click="disconnectPeer(peer.id)"
              >
                Disconnect
              </button>
              <span v-else-if="peer.status === 'pending'" class="status-badge">Pending</span>
            </div>
          </div>

          <div v-if="peers.length === 0" class="empty-state">
            <p>No federation peers connected.</p>
          </div>
        </div>
      </div>

      <div class="add-peer-section">
        <h2 class="section-title">Add Peer</h2>
        <form class="add-peer-form" @submit.prevent="connectPeer('')">
          <input
            type="url"
            placeholder="https://other-server.example.com"
            class="peer-input"
          />
          <button type="submit" class="btn btn-primary">Connect</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.federation-page {
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

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text, #e4e4e7);
  margin: 0 0 16px;
}

.peers-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.peer-card {
  background: var(--color-surface, #27272a);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.peer-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.peer-info {
  flex: 1;
}

.peer-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text, #e4e4e7);
  margin: 0 0 2px;
}

.peer-url {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #a1a1aa);
  margin: 0 0 4px;
  font-family: monospace;
}

.peer-meta {
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: var(--color-text-secondary, #a1a1aa);
}

.btn {
  padding: 6px 12px;
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

.btn-secondary {
  background: var(--color-surface-hover, #3f3f46);
  color: var(--color-text, #e4e4e7);
}

.btn-secondary:hover {
  background: var(--color-surface-active, #52525b);
}

.status-badge {
  font-size: 0.75rem;
  padding: 4px 8px;
  background: var(--color-surface-hover, #3f3f46);
  border-radius: 4px;
  color: var(--color-text-secondary, #a1a1aa);
}

.add-peer-form {
  display: flex;
  gap: 8px;
}

.peer-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--color-border, #3f3f46);
  border-radius: 6px;
  background: var(--color-surface, #27272a);
  color: var(--color-text, #e4e4e7);
  font-size: 0.875rem;
}

.peer-input::placeholder {
  color: var(--color-text-secondary, #a1a1aa);
}

.empty-state {
  text-align: center;
  padding: 24px;
  color: var(--color-text-secondary, #a1a1aa);
}
</style>
