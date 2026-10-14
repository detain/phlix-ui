<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * PlaylistPickerModal — "Add to playlist" as a pick-existing-or-create-new
 * dialog (R13-01). Replaces the old `window.prompt('Enter playlist name:')`
 * flow in MediaCard / MediaDetail, which could only ever CREATE a playlist
 * (never add to one you already had) and blocked the page while doing it.
 *
 * Server contract (CollectionController, Option-A ownership model):
 *  - `GET /api/v1/collections` lists the actor's playlists + legacy NULL-owner
 *    rows; that list feeds the "existing" tab.
 *  - Creating REQUIRES the item's owning `library_id` and never adds the item —
 *    landing it is a second leg (`POST /api/v1/collections/{id}/items/{itemId}`).
 *    An item without `library_id` therefore cannot seed a create; the New tab
 *    fails loud instead of firing a request the server must 400.
 *  - R13-10: when leg 2 fails after a successful create, the fresh EMPTY
 *    playlist is a stray artifact — the error toast carries an UNDO action that
 *    deletes it (`DELETE /api/v1/collections/{id}`).
 *
 * Copy stays inline English, matching the precedent of every string this
 * component replaces (MENU_LABELS + the playlist toasts were never cataloged).
 */
import { computed, ref, watch } from 'vue';
import Modal from './ui/Modal.vue';
import Button from './ui/Button.vue';
import Combobox from './ui/Combobox.vue';
import Spinner from './ui/Spinner.vue';
import EmptyState from './ui/EmptyState.vue';
import { ApiClient, type ApiClient as ApiClientType, type PlaylistSummary } from '../api/client';
import { errMessage } from '../api/errors';
import { useMediaApiBase } from '../composables/useApiBase';
import { useToastStore } from '../stores/useToastStore';

/** The minimum an item must carry to be addable (structurally satisfied by
 *  both the list shape MediaCard holds and the detail shape MediaDetail holds). */
export interface PlaylistPickTarget {
  id: string;
  name: string;
  /** Present on every wire item since server c42e166a (shape() whitelist). */
  library_id?: string | null;
}

const props = defineProps<{
  modelValue: boolean;
  /** The media item to land in a playlist; null keeps the modal inert. */
  item: PlaylistPickTarget | null;
  /** Test seam — same `client` prop pattern the pages use. */
  client?: ApiClientType | null;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

const apiBase = useMediaApiBase();
const toasts = useToastStore();

function getClient(): ApiClient {
  if (props.client) return props.client as ApiClient;
  return new ApiClient({ baseUrl: apiBase.value });
}

type Tab = 'existing' | 'new';
const tab = ref<Tab>('existing');
const playlists = ref<PlaylistSummary[]>([]);
const loading = ref(false);
const loadError = ref<string | null>(null);
const selectedId = ref<string | null>(null);
const newName = ref('');
const busy = ref(false);

/** A card item without a usable owning library id cannot seed a create —
 *  same fail-loud law the pre-picker flow enforced inline. */
const canCreate = computed(
  () => typeof props.item?.library_id === 'string' && props.item.library_id.trim() !== '',
);

const options = computed(() =>
  playlists.value.map((p) => ({ value: p.id, label: p.name })),
);

const confirmEnabled = computed(() => {
  if (busy.value || !props.item) return false;
  return tab.value === 'existing' ? selectedId.value !== null : canCreate.value && newName.value.trim() !== '';
});

// `immediate` so hosts that mount the picker via `v-if` (cards do — nothing
// exists until opened) still trigger the load: on that pattern the watcher
// never sees a false→true transition, it starts at true.
watch(
  () => props.modelValue,
  (open) => {
    if (!open) return;
    tab.value = 'existing';
    selectedId.value = null;
    newName.value = '';
    void loadPlaylists();
  },
  { immediate: true },
);

async function loadPlaylists(): Promise<void> {
  loading.value = true;
  loadError.value = null;
  try {
    playlists.value = await getClient().getPlaylists();
    // First entry pre-selected so Enter/Add works immediately on a small list.
    selectedId.value = playlists.value[0]?.id ?? null;
  } catch (e) {
    loadError.value = errMessage(e, 'Failed to load playlists.');
  } finally {
    loading.value = false;
  }
}

function close(): void {
  emit('update:modelValue', false);
}

async function onConfirm(): Promise<void> {
  const item = props.item;
  if (!item || busy.value) return;
  busy.value = true;
  try {
    if (tab.value === 'existing') {
      await addToExisting(item, selectedId.value);
    } else {
      await createAndAdd(item, newName.value.trim());
    }
  } finally {
    busy.value = false;
  }
}

async function addToExisting(
  item: PlaylistPickTarget,
  playlistId: string | null,
): Promise<void> {
  if (!playlistId) return;
  const target = playlists.value.find((p) => p.id === playlistId);
  try {
    await getClient().addToPlaylist(playlistId, item.id);
    toasts.success(target ? `Added to playlist “${target.name}”` : 'Added to playlist');
    close();
  } catch (e) {
    toasts.error('Failed to add to playlist', { message: errMessage(e) });
  }
}

/**
 * Two-leg create (server create never adds the item). Leg-2 failure keeps the
 * created playlist alive but offers an undo that deletes it (R13-10).
 */
async function createAndAdd(item: PlaylistPickTarget, name: string): Promise<void> {
  if (!canCreate.value || name === '') return;
  const api = getClient();
  let created: { id: string; name: string };
  try {
    created = await api.createPlaylist(name, item.library_id as string);
  } catch (e) {
    toasts.error('Failed to create playlist', { message: errMessage(e) });
    return;
  }
  try {
    await api.addToPlaylist(created.id, item.id);
    toasts.success(`Added to playlist “${created.name}”`);
    close();
  } catch (e) {
    const message = errMessage(e);
    toasts.error('Playlist created, but adding the item failed.', {
      message,
      duration: 10000,
      action: {
        label: 'Delete empty playlist',
        onClick: () => {
          api
            .deletePlaylist(created.id)
            .then(() => toasts.success('Empty playlist deleted'))
            .catch((cleanupError) =>
              toasts.error('Failed to delete the empty playlist.', {
                message: errMessage(cleanupError),
              }),
            );
        },
      },
    });
    close();
  }
}
</script>

<template>
  <Modal :model-value="modelValue" title="Add to playlist" size="sm" @update:model-value="emit('update:modelValue', $event)" @close="close">
    <div class="playlist-picker">
      <p v-if="item" class="playlist-picker__target">
        {{ item.name }}
      </p>

      <div class="playlist-picker__tabs" role="tablist" aria-label="Playlist choice">
        <button
          type="button"
          role="tab"
          class="playlist-picker__tab"
          :class="{ 'playlist-picker__tab--active': tab === 'existing' }"
          :aria-selected="tab === 'existing'"
          @click="tab = 'existing'"
        >
          Existing playlist
        </button>
        <button
          type="button"
          role="tab"
          class="playlist-picker__tab"
          :class="{ 'playlist-picker__tab--active': tab === 'new' }"
          :aria-selected="tab === 'new'"
          @click="tab = 'new'"
        >
          New playlist
        </button>
      </div>

      <div v-if="tab === 'existing'" class="playlist-picker__panel">
        <Spinner v-if="loading" label="Loading playlists…" />
        <p v-else-if="loadError" class="playlist-picker__error" role="alert">{{ loadError }}</p>
        <EmptyState
          v-else-if="playlists.length === 0"
          icon="list"
          title="No playlists yet"
          description="Switch to “New playlist” to create your first one."
        />
        <Combobox
          v-else
          v-model="selectedId"
          :options="options"
          label="Playlist"
          placeholder="Select a playlist…"
        />
      </div>

      <div v-else class="playlist-picker__panel">
        <p v-if="!canCreate" class="playlist-picker__error" role="alert">
          This item has no owning library id, so a new playlist cannot be created for it.
        </p>
        <label v-else class="playlist-picker__field">
          <span class="playlist-picker__label">Playlist name</span>
          <input
            v-model="newName"
            type="text"
            class="playlist-picker__input"
            placeholder="My playlist"
            autocomplete="off"
            @keyup.enter="onConfirm"
          />
        </label>
      </div>

    </div>
    <template #footer>
      <Button variant="ghost" size="sm" @click="close">Cancel</Button>
      <Button variant="solid" size="sm" :disabled="!confirmEnabled" :loading="busy" @click="onConfirm">
        Add
      </Button>
    </template>
  </Modal>
</template>

<style scoped>
.playlist-picker {
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 0.75rem);
}
.playlist-picker__target {
  margin: 0;
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
  overflow-wrap: anywhere;
}
.playlist-picker__tabs {
  display: flex;
  gap: var(--space-1, 0.25rem);
  border-bottom: 1px solid var(--border, #27272a);
}
.playlist-picker__tab {
  appearance: none;
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  color: var(--text-muted, #a1a1aa);
  cursor: pointer;
  font: inherit;
  font-size: var(--text-sm, 0.875rem);
  padding: var(--space-2, 0.5rem) var(--space-3, 0.75rem);
}
.playlist-picker__tab--active {
  color: var(--text, #fafafa);
  border-bottom-color: var(--accent, #f5c518);
}
.playlist-picker__panel {
  min-height: 4.5rem;
}
.playlist-picker__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 0.25rem);
}
.playlist-picker__label {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
}
.playlist-picker__input {
  background: var(--surface-2, #18181b);
  border: 1px solid var(--border, #27272a);
  border-radius: var(--radius-sm, 0.375rem);
  color: var(--text, #fafafa);
  font: inherit;
  padding: var(--space-2, 0.5rem) var(--space-3, 0.75rem);
}
.playlist-picker__input:focus-visible {
  outline: 2px solid var(--accent, #f5c518);
  outline-offset: 1px;
}
.playlist-picker__error {
  color: var(--danger, #dc2626);
  font-size: var(--text-sm, 0.875rem);
  margin: 0;
}
</style>
