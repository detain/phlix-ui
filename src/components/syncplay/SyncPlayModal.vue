<!--
  * SyncPlay create/join modal.
  *
  * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * SyncPlayModal — create or join a SyncPlay room.
 *
 * Props:
 *   - modelValue: controls visibility (v-model)
 *   - apiBase: the API base URL for SyncPlay requests
 *
 * Emits:
 *   - 'update:modelValue': close the modal
 *   - 'joined': when user successfully joins/creates a room (room data)
 */
import { ref, computed, watch } from 'vue';
import Modal from '../ui/Modal.vue';
import Button from '../ui/Button.vue';
import Switch from '../ui/Switch.vue';
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';
import { useSyncPlayStore } from '../../stores/useSyncPlayStore';
import { SyncPlayApi } from '../../api/syncplay';
import type { SyncPlayRoom } from '../../types/syncplay';
import { useMediaApiBase } from '../../composables/useApiBase';

const props = defineProps<{
  modelValue: boolean;
  /** Optional override; falls back to useMediaApiBase(). */
  apiBase?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'joined', room: SyncPlayRoom): void;
}>();

const { t } = useMessages();
const syncPlay = useSyncPlayStore();
const mediaApiBase = useMediaApiBase();
const effectiveApiBase = computed(() => props.apiBase ?? mediaApiBase.value);

// ---- form state ---------------------------------------------------------
const mode = ref<'create' | 'join'>('create');
const roomName = ref('');
const roomId = ref('');
const isPublic = ref(true);
const isLoading = ref(false);
const error = ref<string | null>(null);
const publicRooms = ref<SyncPlayRoom[]>([]);
const isLoadingRooms = ref(false);

// ---- computed -----------------------------------------------------------
const canCreate = computed(() => roomName.value.trim().length > 0);
const canJoin = computed(() => roomId.value.trim().length > 0);
const canSubmit = computed(() => (mode.value === 'create' ? canCreate.value : canJoin.value) && !isLoading.value);

// ---- watchers -----------------------------------------------------------
watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      error.value = null;
      roomName.value = '';
      roomId.value = '';
      isPublic.value = true;
      mode.value = 'create';
      // Load public rooms when modal opens
      await loadPublicRooms();
    }
  },
);

// ---- methods ------------------------------------------------------------
async function loadPublicRooms(): Promise<void> {
  isLoadingRooms.value = true;
  try {
    const api = new SyncPlayApi(effectiveApiBase.value);
    publicRooms.value = await api.listPublicRooms();
  } catch {
    publicRooms.value = [];
  } finally {
    isLoadingRooms.value = false;
  }
}

async function submit(): Promise<void> {
  if (!canSubmit.value) return;
  isLoading.value = true;
  error.value = null;
  try {
    if (mode.value === 'create') {
      await syncPlay.createAndJoinRoom(effectiveApiBase.value, {
        name: roomName.value.trim(),
        isPublic: isPublic.value,
      });
      if (syncPlay.currentRoom) {
        emit('joined', syncPlay.currentRoom);
      }
    } else {
      await syncPlay.joinRoom(effectiveApiBase.value, roomId.value.trim());
      if (syncPlay.currentRoom) {
        emit('joined', syncPlay.currentRoom);
      }
    }
    emit('update:modelValue', false);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Operation failed';
  } finally {
    isLoading.value = false;
  }
}

function selectPublicRoom(room: SyncPlayRoom): void {
  mode.value = 'join';
  roomId.value = room.id;
  roomName.value = room.name;
}

function close(): void {
  emit('update:modelValue', false);
}
</script>

<template>
  <Modal :model-value="modelValue" :title="t('syncplay.title')" size="md" @update:model-value="emit('update:modelValue', $event)" @close="close">
    <form class="syncplay-modal" @submit.prevent="submit">
      <!-- Mode tabs -->
      <div class="syncplay-modal__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          class="syncplay-modal__tab"
          :class="{ 'is-active': mode === 'create' }"
          :aria-selected="mode === 'create'"
          @click="mode = 'create'"
        >
          {{ t('syncplay.createRoom') }}
        </button>
        <button
          type="button"
          role="tab"
          class="syncplay-modal__tab"
          :class="{ 'is-active': mode === 'join' }"
          :aria-selected="mode === 'join'"
          @click="mode = 'join'"
        >
          {{ t('syncplay.joinRoom') }}
        </button>
      </div>

      <!-- Create mode fields -->
      <div v-if="mode === 'create'" class="syncplay-modal__fields">
        <div class="syncplay-modal__field">
          <label class="syncplay-modal__label" for="room-name">{{ t('syncplay.roomName') }}</label>
          <input
            id="room-name"
            v-model="roomName"
            type="text"
            class="syncplay-modal__input"
            :placeholder="t('syncplay.roomNamePlaceholder')"
            autocomplete="off"
          />
        </div>

        <div class="syncplay-modal__field syncplay-modal__field--toggle">
          <Switch v-model="isPublic" :label="t('syncplay.publicRoom')" />
          <span class="syncplay-modal__toggle-hint">
            {{ isPublic ? t('syncplay.publicHint') : t('syncplay.privateHint') }}
          </span>
        </div>
      </div>

      <!-- Join mode fields -->
      <div v-else class="syncplay-modal__fields">
        <div class="syncplay-modal__field">
          <label class="syncplay-modal__label" for="room-id">{{ t('syncplay.roomId') }}</label>
          <input
            id="room-id"
            v-model="roomId"
            type="text"
            class="syncplay-modal__input"
            :placeholder="t('syncplay.roomIdPlaceholder')"
            autocomplete="off"
          />
        </div>
      </div>

      <!-- Error message -->
      <p v-if="error" class="syncplay-modal__error" role="alert">{{ error }}</p>

      <!-- Public rooms list -->
      <div v-if="mode === 'join' && publicRooms.length > 0" class="syncplay-modal__rooms">
        <h3 class="syncplay-modal__rooms-title">{{ t('syncplay.publicRooms') }}</h3>
        <ul class="syncplay-modal__rooms-list">
          <li v-for="room in publicRooms" :key="room.id" class="syncplay-modal__room">
            <button
              type="button"
              class="syncplay-modal__room-btn"
              @click="selectPublicRoom(room)"
            >
              <Icon name="user" class="syncplay-modal__room-icon" />
              <span class="syncplay-modal__room-name">{{ room.name }}</span>
              <span class="syncplay-modal__room-count">{{ room.memberCount }} {{ t('syncplay.members') }}</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Loading indicator for public rooms -->
      <div v-if="isLoadingRooms" class="syncplay-modal__loading" role="status">
        <Icon name="spinner" />
        <span>{{ t('common.loading') }}</span>
      </div>
    </form>

    <template #footer>
      <Button variant="ghost" type="button" @click="close">{{ t('common.close') }}</Button>
      <Button
        variant="solid"
        type="button"
        :loading="isLoading"
        :disabled="!canSubmit"
        @click="submit"
      >
        {{ mode === 'create' ? t('syncplay.createRoom') : t('syncplay.joinRoom') }}
      </Button>
    </template>
  </Modal>
</template>

<style scoped>
.syncplay-modal {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.syncplay-modal__tabs {
  display: flex;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--surface-1);
  border-radius: var(--radius-md);
}

.syncplay-modal__tab {
  flex: 1;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}

.syncplay-modal__tab:hover {
  color: var(--text);
}

.syncplay-modal__tab.is-active {
  color: var(--text);
  background: var(--surface-2);
  box-shadow: var(--shadow-1);
}

.syncplay-modal__fields {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.syncplay-modal__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.syncplay-modal__field--toggle {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.syncplay-modal__label {
  font-size: var(--text-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-subtle);
}

.syncplay-modal__input {
  width: 100%;
  height: 46px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  border: 1px solid var(--border);
  color: var(--text);
  font: inherit;
  font-size: var(--text-base);
  transition: border-color var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
}

.syncplay-modal__input::placeholder {
  color: var(--text-faint);
}

.syncplay-modal__input:focus {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
  background: color-mix(in srgb, var(--surface) 95%, transparent);
}

.syncplay-modal__toggle-hint {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.syncplay-modal__error {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--error) 15%, transparent);
  border: 1px solid color-mix(in srgb, var(--error) 40%, transparent);
  color: var(--error);
  font-size: var(--text-sm);
}

.syncplay-modal__rooms {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.syncplay-modal__rooms-title {
  font-size: var(--text-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-subtle);
}

.syncplay-modal__rooms-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.syncplay-modal__room-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
  text-align: left;
}

.syncplay-modal__room-btn:hover {
  background: var(--surface-2);
  border-color: var(--border);
}

.syncplay-modal__room-icon {
  color: var(--text-subtle);
  flex-shrink: 0;
}

.syncplay-modal__room-name {
  flex: 1;
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  color: var(--text);
}

.syncplay-modal__room-count {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.syncplay-modal__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4);
  color: var(--text-subtle);
  font-size: var(--text-sm);
}
</style>
