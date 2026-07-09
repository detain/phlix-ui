<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * SyncPlayPage — group-watch rooms management.
 * Route: /app/syncplay
 * Shows user's active rooms and provides create/join functionality.
 */
import { ref, computed, onMounted } from 'vue';
import { useMessages } from '../composables/useMessages';
import { useSyncPlayStore } from '../stores/useSyncPlayStore';
import { useMediaApiBase } from '../composables/useApiBase';
import SyncPlayModal from '../components/syncplay/SyncPlayModal.vue';
import Button from '../components/ui/Button.vue';
import Icon from '../components/Icon.vue';
import Spinner from '../components/ui/Spinner.vue';
import Card from '../components/ui/Card.vue';
import type { SyncPlayRole } from '../types/syncplay';

const { t } = useMessages();
const syncPlay = useSyncPlayStore();
const mediaApiBase = useMediaApiBase();

const showModal = ref(false);

const effectiveApiBase = computed(() => mediaApiBase.value);

function getRoleLabel(role: SyncPlayRole): string {
  switch (role) {
    case 'owner':
      return t('syncplay.roleOwner');
    case 'editor':
      return t('syncplay.roleModerator');
    case 'contributor':
      return t('syncplay.roleMember');
    case 'none':
      return t('syncplay.roleMember');
    default:
      return role;
  }
}

const statusIcon = computed(() => {
  switch (syncPlay.syncStatus) {
    case 'synced':
      return 'check';
    case 'outOfSync':
      return 'alert';
    case 're-syncing':
      return 'spinner';
    default:
      return 'check';
  }
});

const statusLabel = computed(() => {
  switch (syncPlay.syncStatus) {
    case 'synced':
      return t('syncplay.synced');
    case 'outOfSync':
      return t('syncplay.outOfSync');
    case 're-syncing':
      return t('syncplay.reSyncing');
    default:
      return t('syncplay.synced');
  }
});

async function refresh(): Promise<void> {
  if (syncPlay.isInRoom && syncPlay.currentRoom) {
    await syncPlay.refreshState(effectiveApiBase.value);
    await syncPlay.refreshMembers(effectiveApiBase.value);
  }
}

onMounted(() => {
  void refresh();
});

async function handleLeaveRoom(): Promise<void> {
  if (syncPlay.currentRoom) {
    await syncPlay.leaveRoom(effectiveApiBase.value);
  }
}
</script>

<template>
  <div class="syncplay-page">
    <header class="syncplay-page__header">
      <div class="syncplay-page__title-row">
        <h1 class="syncplay-page__title">{{ t('syncplay.syncPlay') }}</h1>
        <Button variant="solid" @click="showModal = true">
          <Icon name="plus" />
          {{ t('syncplay.createRoom') }}
        </Button>
      </div>
    </header>

    <!-- Loading state -->
    <div v-if="syncPlay.isLoading" class="syncplay-page__loading" role="status" aria-busy="true">
      <Spinner :label="t('syncplay.loading')" />
    </div>

    <!-- Error state -->
    <div v-else-if="syncPlay.error" class="syncplay-page__error" role="alert">
      <Icon name="error" class="syncplay-page__error-icon" />
      <p class="syncplay-page__error-text">{{ syncPlay.error }}</p>
      <Button variant="ghost" size="sm" @click="syncPlay.clearError()">
        {{ t('common.dismiss') }}
      </Button>
    </div>

    <!-- Active room -->
    <section v-else-if="syncPlay.isInRoom" class="syncplay-page__section">
      <h2 class="syncplay-page__section-title">Current Room</h2>
      <Card class="syncplay-page__room-card" :padding="false">
        <div class="syncplay-page__room">
          <div class="syncplay-page__room-info">
            <Icon name="user" class="syncplay-page__room-icon" />
            <div>
              <p class="syncplay-page__room-name">{{ syncPlay.currentRoom?.name }}</p>
              <p class="syncplay-page__room-meta">
                {{ t('syncplay.members', { count: syncPlay.members.length }) }}
              </p>
            </div>
          </div>
          <div class="syncplay-page__room-status">
            <span
              class="syncplay-page__status-badge"
              :class="`syncplay-page__status-badge--${syncPlay.syncStatus}`"
            >
              <Icon :name="statusIcon" size="sm" />
              {{ statusLabel }}
            </span>
            <Button variant="ghost" size="sm" @click="handleLeaveRoom">
              {{ t('syncplay.leaveRoom') }}
            </Button>
          </div>
        </div>
      </Card>

      <!-- Members list -->
      <div class="syncplay-page__members">
        <h3 class="syncplay-page__members-title">{{ t('syncplay.members', { count: syncPlay.members.length }) }}</h3>
        <ul class="syncplay-page__member-list">
          <li
            v-for="member in syncPlay.members"
            :key="member.id"
            class="syncplay-page__member"
          >
            <span class="syncplay-page__member-avatar">
              {{ member.name.charAt(0).toUpperCase() ?? '?' }}
            </span>
            <span class="syncplay-page__member-name">{{ member.name }}</span>
            <span class="syncplay-page__member-role">
              {{ getRoleLabel(member.role) }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- No active room -->
    <div v-else class="syncplay-page__empty">
      <Icon name="user" class="syncplay-page__empty-icon" />
      <p class="syncplay-page__empty-text">You're not in a SyncPlay room</p>
      <p class="syncplay-page__empty-hint">Create or join a room to watch together with others.</p>
      <div class="syncplay-page__empty-actions">
        <Button variant="solid" @click="showModal = true">
          <Icon name="plus" />
          {{ t('syncplay.createRoom') }}
        </Button>
      </div>
    </div>

    <!-- SyncPlay modal -->
    <SyncPlayModal v-model="showModal" />
  </div>
</template>

<style scoped>
.syncplay-page {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}

.syncplay-page__header {
  margin-bottom: var(--space-6);
}

.syncplay-page__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.syncplay-page__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.syncplay-page__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.syncplay-page__section-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.syncplay-page__loading {
  display: flex;
  justify-content: center;
  padding: var(--space-8) 0;
}

.syncplay-page__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--color-destructive-subtle);
  border-radius: var(--radius-lg);
  text-align: center;
}

.syncplay-page__error-icon {
  color: var(--color-destructive);
  width: 32px;
  height: 32px;
}

.syncplay-page__error-text {
  color: var(--color-destructive);
  margin: 0;
}

.syncplay-page__room-card {
  overflow: hidden;
}

.syncplay-page__room {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4);
}

.syncplay-page__room-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.syncplay-page__room-icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent);
}

.syncplay-page__room-name {
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.syncplay-page__room-meta {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0;
}

.syncplay-page__room-status {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.syncplay-page__status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
}

.syncplay-page__status-badge--synced {
  background: var(--color-success-subtle);
  color: var(--color-success);
}

.syncplay-page__status-badge--outOfSync {
  background: var(--color-warning-subtle);
  color: var(--color-warning);
}

.syncplay-page__status-badge--re-syncing {
  background: var(--color-info-subtle);
  color: var(--color-info);
}

.syncplay-page__members {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.syncplay-page__members-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0 0 var(--space-3) 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.syncplay-page__member-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.syncplay-page__member {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2);
  border-radius: var(--radius-md);
}

.syncplay-page__member:hover {
  background: var(--bg-tertiary);
}

.syncplay-page__member-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  color: var(--color-accent-contrast);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--text-sm);
}

.syncplay-page__member-name {
  flex: 1;
  font-weight: 500;
  color: var(--text-primary);
}

.syncplay-page__member-role {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.syncplay-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-12) var(--space-6);
  text-align: center;
}

.syncplay-page__empty-icon {
  width: 48px;
  height: 48px;
  color: var(--text-tertiary);
}

.syncplay-page__empty-text {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.syncplay-page__empty-hint {
  color: var(--text-secondary);
  margin: 0;
  max-width: 300px;
}

.syncplay-page__empty-actions {
  margin-top: var(--space-4);
  display: flex;
  gap: var(--space-3);
}
</style>
