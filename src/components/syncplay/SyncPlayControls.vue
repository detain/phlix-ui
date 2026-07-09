<!--
  * SyncPlay player controls — synced transport and buffer-wait indicator.
  *
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * SyncPlayControls — synced transport buttons (play/pause/seek) and
 * buffer-wait indicator for collaborative group playback.
 *
 * Shows when the user is in a SyncPlay room and provides:
 *   - Synced play/pause toggle (broadcasts to all room members)
 *   - Synced seek controls
 *   - Buffer-wait indicator when any member is buffering
 */
import { ref, computed, watch } from 'vue';
import Icon from '../Icon.vue';
import { useSyncPlayStore } from '../../stores/useSyncPlayStore';
import { useMessages } from '../../composables/useMessages';
import { useMediaApiBase } from '../../composables/useApiBase';

const props = defineProps<{
  /** Current playback position in seconds (from parent player). */
  position: number;
  /** Current playback duration in seconds (from parent player). */
  duration: number;
  /** Whether the local video is currently playing. */
  isPlaying: boolean;
  /** Whether the local video is buffering. */
  isBuffering?: boolean;
  /** Optional API base URL override; falls back to useMediaApiBase(). */
  apiBase?: string;
}>();

const emit = defineEmits<{
  /** Request a seek to a specific position. */
  (e: 'seek', position: number): void;
  /** Request play. */
  (e: 'play'): void;
  /** Request pause. */
  (e: 'pause'): void;
}>();

const { t } = useMessages();
const syncPlay = useSyncPlayStore();
const mediaApiBase = useMediaApiBase();
const effectiveApiBase = computed(() => props.apiBase ?? mediaApiBase.value);

// ---- buffer-wait state ---------------------------------------------------
/** Whether any room member is currently buffering (tracked locally). */
const waitingForMembers = ref(false);
/** The list of members who are currently buffering. */
const bufferingMembers = ref<string[]>([]);

// Check if we're waiting for buffer sync
const isWaitingForBuffer = computed(() => {
  return waitingForMembers.value || syncPlay.syncStatus === 're-syncing';
});

// ---- synced transport -----------------------------------------------------
/**
 * Send a synced play command to all room members.
 */
async function syncedPlay(): Promise<void> {
  if (!syncPlay.isInRoom) return;
  try {
    await syncPlay.sendCommand(effectiveApiBase.value, 'play');
    emit('play');
  } catch (e) {
    console.error('[SyncPlay] Failed to send play command:', e);
  }
}

/**
 * Send a synced pause command to all room members.
 */
async function syncedPause(): Promise<void> {
  if (!syncPlay.isInRoom) return;
  try {
    await syncPlay.sendCommand(effectiveApiBase.value, 'pause');
    emit('pause');
  } catch (e) {
    console.error('[SyncPlay] Failed to send pause command:', e);
  }
}

/**
 * Toggle play/pause and broadcast to room.
 */
async function syncedTogglePlay(): Promise<void> {
  if (props.isPlaying) {
    await syncedPause();
  } else {
    await syncedPlay();
  }
}

/**
 * Send a synced seek command to all room members.
 */
async function syncedSeek(position: number): Promise<void> {
  if (!syncPlay.isInRoom) return;
  try {
    await syncPlay.sendCommand(effectiveApiBase.value, 'seek', { position });
    emit('seek', position);
  } catch (e) {
    console.error('[SyncPlay] Failed to send seek command:', e);
  }
}

// Seek by delta (rewind/fast-forward)
const SEEK_DELTA = 10; // seconds

/**
 * Rewind by SEEK_DELTA seconds and broadcast to room.
 */
async function syncedRewind(): Promise<void> {
  const newPosition = Math.max(0, props.position - SEEK_DELTA);
  await syncedSeek(newPosition);
}

/**
 * Fast-forward by SEEK_DELTA seconds and broadcast to room.
 */
async function syncedFastForward(): Promise<void> {
  const newPosition = Math.min(props.duration, props.position + SEEK_DELTA);
  await syncedSeek(newPosition);
}

// ---- remote state sync ----------------------------------------------------
// When the server indicates we're waiting for members, show the indicator
watch(
  () => syncPlay.syncStatus,
  (status) => {
    if (status === 're-syncing') {
      waitingForMembers.value = true;
    } else if (status === 'synced') {
      waitingForMembers.value = false;
      bufferingMembers.value = [];
    }
  },
);
</script>

<template>
  <div v-if="syncPlay.isInRoom" class="syncplay-controls">
    <!-- Buffer-wait indicator -->
    <div
      v-if="isWaitingForBuffer"
      class="syncplay-controls__wait"
      role="status"
      :aria-label="t('syncplay.waitingForMembers')"
    >
      <Icon name="spinner" class="syncplay-controls__wait-icon" />
      <span class="syncplay-controls__wait-label">
        {{ t('syncplay.waitingForMembers') }}
      </span>
      <span v-if="bufferingMembers.length > 0" class="syncplay-controls__wait-members">
        {{ bufferingMembers.slice(0, 3).join(', ') }}
        <span v-if="bufferingMembers.length > 3">+{{ bufferingMembers.length - 3 }}</span>
      </span>
    </div>

    <!-- Synced transport controls -->
    <div class="syncplay-controls__transport">
      <!-- Rewind -->
      <button
        type="button"
        class="syncplay-controls__btn"
        :aria-label="t('syncplay.rewind')"
        @click="syncedRewind"
      >
        <Icon name="rewind" />
      </button>

      <!-- Play/Pause (synced) -->
      <button
        type="button"
        class="syncplay-controls__btn syncplay-controls__btn--primary"
        :aria-label="isPlaying ? t('syncplay.pauseAll') : t('syncplay.playAll')"
        @click="syncedTogglePlay"
      >
        <Icon :name="isPlaying ? 'pause' : 'play'" />
      </button>

      <!-- Fast-forward -->
      <button
        type="button"
        class="syncplay-controls__btn"
        :aria-label="t('syncplay.fastForward')"
        @click="syncedFastForward"
      >
        <Icon name="forward" />
      </button>
    </div>

    <!-- Sync status indicator -->
    <div
      class="syncplay-controls__status"
      :class="`syncplay-controls__status--${syncPlay.syncStatus}`"
    >
      <Icon
        :name="syncPlay.syncStatus === 'synced' ? 'check' : syncPlay.syncStatus === 'outOfSync' ? 'alert' : 'spinner'"
        class="syncplay-controls__status-icon"
      />
      <span class="syncplay-controls__status-label">
        {{ syncPlay.syncStatus === 'synced' ? t('syncplay.synced') :
           syncPlay.syncStatus === 'outOfSync' ? t('syncplay.outOfSync') :
           t('syncplay.reSyncing') }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.syncplay-controls {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

/* Buffer-wait indicator */
.syncplay-controls__wait {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  background: color-mix(in srgb, var(--warning) 15%, transparent);
  border: 1px solid color-mix(in srgb, var(--warning) 40%, transparent);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  color: var(--warning);
}

.syncplay-controls__wait-icon {
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;
}

.syncplay-controls__wait-label {
  font-weight: var(--fw-medium);
}

.syncplay-controls__wait-members {
  color: var(--text-subtle);
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Synced transport controls */
.syncplay-controls__transport {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.syncplay-controls__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--surface-2);
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
}

.syncplay-controls__btn:hover {
  background: var(--surface-3);
  color: var(--text);
}

.syncplay-controls__btn:active {
  transform: scale(0.95);
}

.syncplay-controls__btn--primary {
  width: 44px;
  height: 44px;
  background: var(--accent);
  color: var(--accent-text);
  border-radius: var(--radius-full);
}

.syncplay-controls__btn--primary:hover {
  background: color-mix(in srgb, var(--accent) 85%, white);
  color: var(--accent-text);
}

.syncplay-controls__btn--primary :deep(svg) {
  width: 20px;
  height: 20px;
}

/* Sync status indicator */
.syncplay-controls__status {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  margin-left: auto;
}

.syncplay-controls__status--synced {
  background: color-mix(in srgb, var(--success) 15%, transparent);
  color: var(--success);
}

.syncplay-controls__status--outOfSync {
  background: color-mix(in srgb, var(--error) 15%, transparent);
  color: var(--error);
}

.syncplay-controls__status--re-syncing {
  background: color-mix(in srgb, var(--warning) 15%, transparent);
  color: var(--warning);
}

.syncplay-controls__status--re-syncing .syncplay-controls__status-icon {
  animation: spin 1s linear infinite;
}

.syncplay-controls__status-icon {
  width: 12px;
  height: 12px;
}

.syncplay-controls__status-label {
  letter-spacing: var(--tracking-tight);
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
