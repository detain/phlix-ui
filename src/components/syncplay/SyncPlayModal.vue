<!--
  * SyncPlay create/join modal.
  *
  * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
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
 *
 * S288 — why there is no public/private SWITCH (M-UI-14 keeps that true):
 *   The server has no `isPublic` (or `description`) concept anywhere. The only
 *   public/private signal it stores and serves is `has_password` on the group
 *   snapshot. A toggle that changes nothing is a lie in the UI; the honest
 *   control is the PASSWORD FIELD below — set it and `has_password` is true,
 *   leave it empty and the room is open. "Public/private" is derived, never
 *   declared.
 *
 * M-UI-14 — password-locked rooms are first-class here:
 *   Create mode offers the gate (REST `password`, which the server hashes);
 *   join mode carries the credential on both rails — plaintext `password` on
 *   the REST join (that rail parses no digest) and the SHA-256
 *   `password_hash` on the `GROUP_JOIN` WS frame, where it also survives the
 *   reconnect ladder. A locked room picked from the listing requires the
 *   field up front; a refusal (REST 400 "Invalid password") surfaces through
 *   the registered `syncplay.invalid_password` catalog copy — never the
 *   server's raw string — and re-prompts inline. Custody: the plaintext
 *   lives only in this form ref until the store digests it; nothing password-
 *   related is persisted, logged, or placed in a URL. WS refusals for the
 *   same code already ride the M-UI-12 toast machinery (`SyncPlayControls`'
 *   wire-error listener); this modal owns the REST side.
 */
import { ref, computed, watch, inject, nextTick } from 'vue';
import Modal from '../ui/Modal.vue';
import Button from '../ui/Button.vue';
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';
import { useSyncPlayStore } from '../../stores/useSyncPlayStore';
import { SyncPlayApi, isSyncPlayInvalidPassword } from '../../api/syncplay';
import type { PhlixAppConfig } from '../../app/types';
import { errorCodeMessage } from '../../i18n/errors';
import type { SyncPlayRoom } from '../../types/syncplay';
import { useMediaApiBase } from '../../composables/useApiBase';

const props = defineProps<{
  modelValue: boolean;
  /** Optional override; falls back to useMediaApiBase(). */
  apiBase?: string;
  /** Optional room ID to pre-fill (e.g., from a join-link ?room= query param). */
  prefilledRoomId?: string;
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

// L1: the create/join switcher was a half-implemented tablist (no tabpanels,
// no roving tabindex, no arrow keys). What it actually is: a two-option choice
// that swaps the fields below — a radiogroup. Arrow keys move BOTH selection
// and focus, exactly like the native radio semantics ARIA promises; the
// unselected option leaves the tab order (roving tabindex).
const createOptionEl = ref<HTMLElement | null>(null);
const joinOptionEl = ref<HTMLElement | null>(null);

function onModeKeydown(e: KeyboardEvent): void {
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      mode.value = 'create';
      createOptionEl.value?.focus();
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      mode.value = 'join';
      joinOptionEl.value?.focus();
      break;
  }
}
const roomName = ref('');
const roomId = ref('');
// M-UI-14: the gate credential. Plaintext, held ONLY in this form ref while
// the user types (and across a refused attempt for an honest retry — the
// dirty-state law of S286-era forms); the store digests it before the socket
// exists, and neither form is ever written to the store, storage, or a log.
const roomPassword = ref('');
const passwordRevealed = ref(false);
/** True when the target room is known to be locked (picked from the listing)
 *  or was refused for a missing/wrong credential — then the field is required. */
const requiresPassword = ref(false);
const passwordInputEl = ref<HTMLInputElement | null>(null);
/** Same seam `SyncPlayControls` uses (M-UI-12): hosts inject `phlixConfig`
 *  app-wide; `locale` selects the catalog row of the refusal copy. */
const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const isLoading = ref(false);
const error = ref<string | null>(null);
// M-UI-14: the join listing shows EVERY visible room — locked ones carry a
// lock icon and pre-require the field. The old `publicRooms` filter hid the
// locked rooms this modal can now enter.
const rooms = ref<SyncPlayRoom[]>([]);
const isLoadingRooms = ref(false);

// ---- computed -----------------------------------------------------------
const canCreate = computed(() => roomName.value.trim().length > 0);
const canJoin = computed(
  () =>
    roomId.value.trim().length > 0 &&
    (!requiresPassword.value || roomPassword.value !== ''),
);
const canSubmit = computed(() => (mode.value === 'create' ? canCreate.value : canJoin.value) && !isLoading.value);

// ---- watchers -----------------------------------------------------------
watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      error.value = null;
      roomName.value = '';
      // M-UI-14: every open is a fresh form — the credential and the "locked"
      // escalation never bleed into the next attempt.
      roomPassword.value = '';
      passwordRevealed.value = false;
      requiresPassword.value = false;
      // If a prefilledRoomId is provided (e.g. from a join-link), use it
      if (props.prefilledRoomId) {
        roomId.value = props.prefilledRoomId;
        mode.value = 'join';
      } else {
        roomId.value = '';
        mode.value = 'create';
      }
      // Load joinable rooms when modal opens
      await loadRooms();
    }
  },
);

// ---- methods ------------------------------------------------------------
async function loadRooms(): Promise<void> {
  isLoadingRooms.value = true;
  try {
    const api = new SyncPlayApi(effectiveApiBase.value);
    // M-UI-14: unfiltered listing; the server's members-or-admin scoping is
    // what decides VISIBILITY, `has_password` only decides whether the field
    // is required. (Outsiders never see other people's rooms anyway — a
    // locked room reached by raw id/join-link still prompts via the 400.)
    rooms.value = await api.listGroups();
  } catch {
    rooms.value = [];
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
        password: roomPassword.value,
      });
    } else {
      await syncPlay.joinRoom(effectiveApiBase.value, roomId.value.trim(), roomPassword.value);
    }
    // S283: this was `if (syncPlay.currentRoom) emit(...)` on BOTH arms. The
    // create arm always had a room, but the join arm never did — `joinRoom()`
    // left `currentRoom` null — so `joined` was silently unreachable on the one
    // path the event exists for. `joinRoom()` now back-fills the room from the
    // join response, and the guard is a narrowing assertion rather than a
    // silent skip: a successful submit that produced no room is a bug, not a
    // reason to say nothing.
    if (syncPlay.currentRoom) {
      emit('joined', syncPlay.currentRoom);
    }
    emit('update:modelValue', false);
  } catch (e) {
    // M-UI-14: the locked-room refusal is not a dead end, it is a prompt.
    // The localized copy comes from the registered catalog code (same 7
    // locales the M-UI-12 toasts speak), never the server's wire string —
    // the WS-ingest sanitize law applied to the REST rail.
    if (mode.value === 'join' && isSyncPlayInvalidPassword(e)) {
      requiresPassword.value = true;
      error.value = errorCodeMessage('syncplay.invalid_password', config?.locale, null);
      void nextTick(() => passwordInputEl.value?.focus());
    } else {
      error.value = e instanceof Error ? e.message : 'Operation failed';
    }
  } finally {
    isLoading.value = false;
  }
}

function selectRoom(room: SyncPlayRoom): void {
  mode.value = 'join';
  roomId.value = room.id;
  roomName.value = room.name;
  // A locked pick is KNOWN-locked: require the credential up front instead of
  // making the user pay for a refused round trip first.
  if (!room.isPublic) requiresPassword.value = true;
}

function close(): void {
  emit('update:modelValue', false);
}
</script>

<template>
  <Modal :model-value="modelValue" :title="t('syncplay.title')" size="md" @update:model-value="emit('update:modelValue', $event)" @close="close">
    <form class="syncplay-modal" @submit.prevent="submit">
      <!-- Mode choice (radiogroup — see L1 note in script) -->
      <div
        class="syncplay-modal__tabs"
        role="radiogroup"
        :aria-label="t('syncplay.modeSelect')"
        @keydown="onModeKeydown"
      >
        <button
          ref="createOptionEl"
          type="button"
          role="radio"
          class="syncplay-modal__tab"
          :class="{ 'is-active': mode === 'create' }"
          :aria-checked="mode === 'create'"
          :tabindex="mode === 'create' ? 0 : -1"
          @click="mode = 'create'"
        >
          {{ t('syncplay.createRoom') }}
        </button>
        <button
          ref="joinOptionEl"
          type="button"
          role="radio"
          class="syncplay-modal__tab"
          :class="{ 'is-active': mode === 'join' }"
          :aria-checked="mode === 'join'"
          :tabindex="mode === 'join' ? 0 : -1"
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
        <!-- M-UI-14: the gate. Optional here — empty means "no password",
             which is the only public/private decision the server knows. -->
        <div class="syncplay-modal__field">
          <label class="syncplay-modal__label" for="room-password">{{ t('syncplay.roomPassword') }}</label>
          <div class="syncplay-modal__pw-wrap">
            <input
              id="room-password"
              v-model="roomPassword"
              :type="passwordRevealed ? 'text' : 'password'"
              class="syncplay-modal__input"
              autocomplete="off"
              spellcheck="false"
              aria-describedby="room-password-optional"
            />
            <button
              type="button"
              class="syncplay-modal__pw-toggle"
              :aria-label="passwordRevealed ? t('auth.hidePassword') : t('auth.showPassword')"
              :aria-pressed="passwordRevealed"
              @click="passwordRevealed = !passwordRevealed"
            >
              <Icon :name="passwordRevealed ? 'eye-off' : 'eye'" />
            </button>
          </div>
          <p id="room-password-optional" class="syncplay-modal__hint">{{ t('syncplay.passwordOptional') }}</p>
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
        <!-- M-UI-14: always offered (a room's lock state is unknown until the
             server or the listing says so); required once it IS known. -->
        <div class="syncplay-modal__field">
          <label class="syncplay-modal__label" for="room-password">{{ t('syncplay.roomPassword') }}</label>
          <div class="syncplay-modal__pw-wrap">
            <input
              id="room-password"
              ref="passwordInputEl"
              v-model="roomPassword"
              :type="passwordRevealed ? 'text' : 'password'"
              class="syncplay-modal__input"
              :required="requiresPassword"
              autocomplete="off"
              spellcheck="false"
              :aria-describedby="requiresPassword ? 'room-password-hint' : undefined"
            />
            <button
              type="button"
              class="syncplay-modal__pw-toggle"
              :aria-label="passwordRevealed ? t('auth.hidePassword') : t('auth.showPassword')"
              :aria-pressed="passwordRevealed"
              @click="passwordRevealed = !passwordRevealed"
            >
              <Icon :name="passwordRevealed ? 'eye-off' : 'eye'" />
            </button>
          </div>
          <p v-if="requiresPassword" id="room-password-hint" class="syncplay-modal__hint">{{ t('syncplay.lockedRoomHint') }}</p>
        </div>
      </div>

      <!-- Error message -->
      <p v-if="error" class="syncplay-modal__error" role="alert">{{ error }}</p>

      <!-- Rooms list (M-UI-14: locked rooms are listed with a lock, not hidden) -->
      <div v-if="mode === 'join' && rooms.length > 0" class="syncplay-modal__rooms">
        <h3 class="syncplay-modal__rooms-title">{{ t('syncplay.availableRooms') }}</h3>
        <ul class="syncplay-modal__rooms-list">
          <li v-for="room in rooms" :key="room.id" class="syncplay-modal__room">
            <button
              type="button"
              class="syncplay-modal__room-btn"
              @click="selectRoom(room)"
            >
              <Icon name="user" class="syncplay-modal__room-icon" />
              <span class="syncplay-modal__room-name">{{ room.name }}</span>
              <Icon
                v-if="!room.isPublic"
                name="lock"
                :label="t('syncplay.lockedRoom')"
                class="syncplay-modal__room-lock"
              />
              <!-- `t('syncplay.members')` was called with NO count, so `{count}`
                   was never substituted and this read "5 {count} member |
                   {count} members". The message renders the number itself. -->
              <span class="syncplay-modal__room-count">{{
                t('syncplay.members', { count: room.memberCount })
              }}</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Loading indicator for rooms -->
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

/* M-UI-14: password field chrome — same idiom as AuthField's reveal toggle. */
.syncplay-modal__pw-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.syncplay-modal__pw-wrap .syncplay-modal__input {
  padding-right: 52px;
}

.syncplay-modal__pw-toggle {
  position: absolute;
  right: var(--space-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-subtle);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}

.syncplay-modal__pw-toggle:hover {
  color: var(--text);
  background: var(--surface-2);
}

.syncplay-modal__pw-toggle:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.syncplay-modal__hint {
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

.syncplay-modal__room-lock {
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
