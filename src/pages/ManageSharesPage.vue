<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../api/client';

interface Share {
  id: string;
  library_id: string;
  library_name: string;
  shared_with: string;
  permissions: 'read' | 'write';
  created_at: string;
  expires_at?: string;
}

const shares = ref<Share[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadShares() {
  try {
    const data = await api.get<{ shares: Share[] }>('/api/v1/shares');
    shares.value = data.shares || [];
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load shares';
  } finally {
    loading.value = false;
  }
}

async function revokeShare(shareId: string) {
  try {
    await api.delete(`/api/v1/shares/${shareId}`);
    await loadShares();
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to revoke share';
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString();
}

function isExpired(dateStr: string | undefined): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

onMounted(() => {
  loadShares();
});
</script>

<template>
  <div class="manage-shares-page">
    <div class="page-header">
      <h1 class="page-title">Manage Shares</h1>
      <p class="page-subtitle">View and manage your shared libraries</p>
    </div>

    <div v-if="loading" class="loading">Loading shares...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="shares-list">
      <div v-for="share in shares" :key="share.id" class="share-card">
        <div class="share-info">
          <h3 class="share-library">{{ share.library_name }}</h3>
          <div class="share-meta">
            <span>Shared with: {{ share.shared_with }}</span>
            <span class="permission-badge" :class="share.permissions">{{ share.permissions }}</span>
            <span v-if="share.expires_at && isExpired(share.expires_at)" class="expired-badge">Expired</span>
          </div>
          <p class="share-dates">
            Created: {{ formatDate(share.created_at) }}
            <span v-if="share.expires_at"> | Expires: {{ formatDate(share.expires_at) }}</span>
          </p>
        </div>
        <div class="share-actions">
          <button class="btn btn-danger" @click="revokeShare(share.id)">Revoke</button>
        </div>
      </div>

      <div v-if="shares.length === 0" class="empty-state">
        <p>No library shares found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.manage-shares-page {
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

.shares-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.share-card {
  background: var(--color-surface, #27272a);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.share-info {
  flex: 1;
}

.share-library {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text, #e4e4e7);
  margin: 0 0 4px;
}

.share-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--color-text-secondary, #a1a1aa);
  margin-bottom: 4px;
}

.permission-badge {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
}

.permission-badge.read {
  background: var(--color-primary, #3b82f6);
  color: white;
}

.permission-badge.write {
  background: #22c55e;
  color: white;
}

.expired-badge {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: #ef4444;
  color: white;
}

.share-dates {
  font-size: 0.75rem;
  color: var(--color-text-secondary, #a1a1aa);
  margin: 0;
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

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: var(--color-text-secondary, #a1a1aa);
}
</style>
