<!--
  * SyncPlay player overlay — shown when in a SyncPlay room.
  *
  * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SyncPlayOverlay — overlay badge showing SyncPlay room status below the player.
 *
 * Shows:
 *   - SyncPlay badge with room name
 *   - Member count and online users list
 *   - Sync status indicator (synced/outOfSync/re-syncing)
 *   - Leave room button
 */
import { computed } from 'vue';
import Icon from '../Icon.vue';
import Button from '../ui/Button.vue';
import { useSyncPlayStore } from '../../stores/useSyncPlayStore';
import { useMessages } from '../../composables/useMessages';
import { useMediaApiBase } from '../../composables/useApiBase';

const props = defineProps<{
  /** Optional API base URL override; falls back to useMediaApiBase(). */
  apiBase?: string;
}>();

const { t } = useMessages();
const syncPlay = useSyncPlayStore();
const mediaApiBase = useMediaApiBase();
const effectiveApiBase = computed(() => props.apiBase ?? mediaApiBase.value);

const roomName = computed(() => syncPlay.currentRoom?.name ?? 'SyncPlay');
const memberCount = computed(() => syncPlay.onlineMembers.length);
const status = computed(() => syncPlay.syncStatus);

const statusLabel = computed(() => {
  switch (status.value) {
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

const statusIcon = computed(() => {
  switch (status.value) {
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

async function leaveRoom(): Promise<void> {
  await syncPlay.leaveRoom(effectiveApiBase.value);
}
</script>

<template>
  <div v-if="syncPlay.isInRoom" class="syncplay-overlay">
    <div class="syncplay-overlay__badge">
      <Icon name="user" class="syncplay-overlay__icon" />
      <span class="syncplay-overlay__label">SyncPlay: {{ roomName }}</span>
    </div>

    <div class="syncplay-overlay__status" :class="`syncplay-overlay__status--${status}`">
      <Icon :name="statusIcon" class="syncplay-overlay__status-icon" />
      <span class="syncplay-overlay__status-label">{{ statusLabel }}</span>
    </div>

    <div class="syncplay-overlay__members">
      <span class="syncplay-overlay__member-count">
        <Icon name="user" />
        {{ memberCount }} {{ t('syncplay.members', { count: memberCount }) }}
      </span>
      <ul class="syncplay-overlay__member-list">
        <li
          v-for="member in syncPlay.onlineMembers.slice(0, 5)"
          :key="member.id"
          class="syncplay-overlay__member"
        >
          <span class="syncplay-overlay__member-dot" />
          <span class="syncplay-overlay__member-name">{{ member.name }}</span>
        </li>
        <li v-if="syncPlay.onlineMembers.length > 5" class="syncplay-overlay__member syncplay-overlay__member--more">
          +{{ syncPlay.onlineMembers.length - 5 }} more
        </li>
      </ul>
    </div>

    <Button variant="ghost" size="sm" @click="leaveRoom">
      {{ t('syncplay.leaveRoom') }}
    </Button>
  </div>
</template>

<style scoped>
.syncplay-overlay {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  flex-wrap: wrap;
}

.syncplay-overlay__badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  background: var(--accent-soft);
  border-radius: var(--radius-full);
  border: 1px solid var(--accent-ring);
}

.syncplay-overlay__icon {
  color: var(--accent-text);
  font-size: var(--text-sm);
}

.syncplay-overlay__label {
  font-size: var(--text-xs);
  font-weight: var(--fw-semibold);
  color: var(--accent-text);
  letter-spacing: var(--tracking-tight);
}

.syncplay-overlay__status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
}

.syncplay-overlay__status--synced {
  background: color-mix(in srgb, var(--success) 15%, transparent);
  color: var(--success);
}

.syncplay-overlay__status--outOfSync {
  background: color-mix(in srgb, var(--error) 15%, transparent);
  color: var(--error);
}

.syncplay-overlay__status--re-syncing {
  background: color-mix(in srgb, var(--warning) 15%, transparent);
  color: var(--warning);
}

.syncplay-overlay__status--re-syncing .syncplay-overlay__status-icon {
  animation: spin 1s linear infinite;
}

.syncplay-overlay__status-icon {
  font-size: var(--text-xs);
}

.syncplay-overlay__members {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
}

.syncplay-overlay__member-count {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  flex-shrink: 0;
}

.syncplay-overlay__member-list {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
  overflow: hidden;
}

.syncplay-overlay__member {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.syncplay-overlay__member--more {
  color: var(--text-subtle);
}

.syncplay-overlay__member-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
  flex-shrink: 0;
}

.syncplay-overlay__member-name {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
