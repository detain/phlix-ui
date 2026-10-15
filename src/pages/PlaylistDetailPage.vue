<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * PlaylistDetailPage (R13-01) — one playlist and its titles.
 * Route: /app/playlists/:id
 *
 * Wire truth (server `CollectionController::show`): the `{collection, items,
 * total}` envelope's `items` are RAW hydrated DB rows — no `poster_url`, no
 * signed artwork, no playback fields (`MediaItemShaper` only runs on the media
 * routes). This page therefore resolves each row through
 * `GET /api/v1/media/{id}` with bounded concurrency, riding the shared
 * `useMediaItemCache` SWR singleton so revisits and browse→detail hops cost
 * zero requests. A row whose detail fetch fails still renders from its raw
 * `{id, name, type}` (poster-less tile) — an item vanished from the library
 * between list and detail fetch, so the remove affordance stays reachable.
 */
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ApiClient, type PlaylistSummary } from '../api/client';
import type { MediaItem } from '../types/media-item';
import { errMessage } from '../api/errors';
import { useMediaApiBase } from '../composables/useApiBase';
import {
  cacheMediaItem,
  getMediaItemCacheEntry,
  isMediaItemCacheFresh,
} from '../composables/useMediaItemCache';
import { usePageTitle } from '../composables/usePageTitle';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { pluralCount } from '../utils/plural';
import { canManagePlaylist } from '../utils/playlistPermissions';
import MediaCard from '../components/MediaCard.vue';
import Button from '../components/ui/Button.vue';
import Modal from '../components/ui/Modal.vue';
import Spinner from '../components/ui/Spinner.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Icon from '../components/Icon.vue';

const props = defineProps<{
  /** Test seam — defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

/** Client for the collection endpoints — same seam + base convention as the
 *  sibling member pages (WatchHistoryPage): injected client wins, otherwise a
 *  fresh client on the CURRENT media API base (tracks hub server switches). */
function getClient(): ApiClient {
  return props.client ?? new ApiClient({ baseUrl: apiBase.value });
}

const route = useRoute();
const router = useRouter();
const apiBase = useMediaApiBase();
const toasts = useToastStore();
const auth = useAuthStore();

/**
 * Server Option-A law (utils/playlistPermissions): visibility ≠ manageability.
 * Legacy NULL-owner and (admin-visible) foreign rows open read-only — the
 * DELETE/update endpoints 404 for anyone but the owner or an admin, so the
 * delete and item-remove affordances must not be offered at all.
 */
const canManage = computed(() =>
  collection.value
    ? canManagePlaylist(collection.value.created_by, auth.user?.id ?? null, auth.isAdmin)
    : false,
);

const playlistId = computed(() => String(route.params.id ?? ''));

const collection = ref<PlaylistSummary | null>(null);
const items = ref<MediaItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const removingIds = ref<Set<string>>(new Set());
const deleteOpen = ref(false);
const deleting = ref(false);

usePageTitle(() => (collection.value ? `${collection.value.name} · Playlists` : null));

/** Up to six in-flight detail fetches; the rest queue. Keeps a 500-item
 *  playlist from opening 500 parallel connections on one page load. */
const DETAIL_CONCURRENCY = 6;

async function mapLimit<T>(
  values: T[],
  limit: number,
  worker: (value: T) => Promise<void>,
): Promise<void> {
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (next < values.length) {
      const index = next++;
      await worker(values[index]);
    }
  });
  await Promise.all(runners);
}

async function load(): Promise<void> {
  const id = playlistId.value;
  if (!id) return;
  loading.value = true;
  error.value = null;
  try {
    const client = getClient();
    const detail = await client.getPlaylist(id);
    collection.value = detail.collection;
    // Paint names immediately from the raw rows; posters/years fill in as the
    // bounded detail fetches land.
    items.value = detail.items.map((row) => ({
      id: row.id,
      name: row.name,
      type: row.type,
    })) as unknown as MediaItem[];
    loading.value = false;

    await mapLimit(detail.items, DETAIL_CONCURRENCY, async (row) => {
      const entry = getMediaItemCacheEntry(row.id);
      if (entry && isMediaItemCacheFresh(entry)) {
        replaceItem(row.id, entry.item);
        return;
      }
      try {
        const res = await client.get<{ item: MediaItem }>(
          `/api/v1/media/${encodeURIComponent(row.id)}`,
        );
        cacheMediaItem(row.id, res.item);
        replaceItem(row.id, res.item);
      } catch {
        /* raw tile stands — see header truth note */
      }
    });
  } catch (e) {
    if (loading.value) {
      error.value = errMessage(e, 'Failed to load this playlist.');
      loading.value = false;
    }
  }
}

/** Swap the placeholder tile for `id` in place (order is the curator's). */
function replaceItem(id: string, item: MediaItem): void {
  const index = items.value.findIndex((i) => i.id === id);
  if (index >= 0) items.value.splice(index, 1, item);
}

async function removeItem(item: MediaItem): Promise<void> {
  const playlist = collection.value;
  if (!playlist || !canManage.value || removingIds.value.has(item.id)) return;
  removingIds.value = new Set(removingIds.value).add(item.id);
  try {
    await getClient().removeFromPlaylist(playlist.id, item.id);
    items.value = items.value.filter((i) => i.id !== item.id);
    toasts.success(`Removed “${item.name}” from the playlist`);
  } catch (e) {
    toasts.error('Failed to remove from playlist', { message: errMessage(e) });
  } finally {
    const next = new Set(removingIds.value);
    next.delete(item.id);
    removingIds.value = next;
  }
}

async function confirmDeletePlaylist(): Promise<void> {
  const playlist = collection.value;
  if (!playlist || !canManage.value || deleting.value) return;
  deleting.value = true;
  try {
    await getClient().deletePlaylist(playlist.id);
    toasts.success(`Playlist “${playlist.name}” deleted`);
    deleteOpen.value = false;
    if (router?.hasRoute('playlists')) void router.replace({ name: 'playlists' });
  } catch (e) {
    toasts.error('Failed to delete playlist', { message: errMessage(e) });
  } finally {
    deleting.value = false;
  }
}

watch(playlistId, () => void load());
onMounted(() => void load());
</script>

<template>
  <div class="playlist-detail">
    <Spinner v-if="loading" label="Loading playlist…" />

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn’t load this playlist"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="refresh" @click="load">Retry</Button>
      </template>
    </EmptyState>

    <template v-else-if="collection">
      <header class="playlist-detail__head">
        <div>
          <h1 class="playlist-detail__title">{{ collection.name }}</h1>
          <p class="playlist-detail__count">
            {{ pluralCount(items.length, 'item', 'items') }}
          </p>
        </div>
        <div class="playlist-detail__actions">
          <Button v-if="canManage" variant="ghost" size="sm" @click="deleteOpen = true">Delete playlist</Button>
          <p v-else class="playlist-detail__readonly">Shared playlist — only its owner (or an admin) can change it.</p>
        </div>
      </header>

      <EmptyState
        v-if="items.length === 0"
        icon="list"
        title="This playlist is empty"
        :description="
          canManage
            ? 'Add titles from any card’s ⋯ menu — “Add to playlist”.'
            : 'Titles can only be added by the playlist’s owner.'
        "
      />

      <ul v-else class="playlist-detail__grid">
        <li v-for="item in items" :key="item.id" class="playlist-detail__cell">
          <MediaCard :item="item" />
          <button
            v-if="canManage"
            type="button"
            class="playlist-detail__remove"
            :aria-label="`Remove ${item.name} from playlist`"
            :disabled="removingIds.has(item.id)"
            @click="removeItem(item)"
          >
            <Icon name="x" />
            <span>Remove</span>
          </button>
        </li>
      </ul>
    </template>

    <!-- Delete-playlist confirm (UsersPage inline-modal precedent). Owner/admin
         only — same manageability gate as the button that arms it. -->
    <Modal
      v-if="canManage"
      :model-value="deleteOpen"
      title="Delete playlist"
      size="sm"
      @update:model-value="deleteOpen = $event"
    >
      <p>
        Delete playlist <strong>{{ collection?.name }}</strong>
        ({{ pluralCount(items.length, 'item', 'items') }})?
        This cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="deleteOpen = false">Cancel</Button>
        <Button variant="danger" size="sm" :loading="deleting" @click="confirmDeletePlaylist">
          Delete
        </Button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.playlist-detail {
  padding: var(--space-6, 1.5rem) var(--space-4, 1rem);
  max-width: var(--shell-max-width, 1400px);
  margin: 0 auto;
}
.playlist-detail__head {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-5, 1.25rem);
  gap: var(--space-3, 0.75rem);
}
.playlist-detail__title {
  font-size: var(--text-2xl, 1.5rem);
  margin: 0;
}
.playlist-detail__count {
  color: var(--text-muted, #a1a1aa);
  font-size: var(--text-sm, 0.875rem);
  margin: var(--space-1, 0.25rem) 0 0;
}
.playlist-detail__readonly {
  color: var(--text-muted, #a1a1aa);
  font-size: var(--text-xs, 0.75rem);
  margin: 0;
  text-align: right;
}
.playlist-detail__grid {
  display: grid;
  gap: var(--space-4, 1rem);
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}
.playlist-detail__cell {
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 0.25rem);
}
.playlist-detail__remove {
  align-items: center;
  align-self: flex-start;
  appearance: none;
  background: none;
  border: 0;
  color: var(--text-muted, #a1a1aa);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: var(--text-xs, 0.75rem);
  gap: var(--space-1, 0.25rem);
  padding: var(--space-1, 0.25rem);
}
.playlist-detail__remove:hover:not(:disabled) {
  color: var(--danger, #dc2626);
}
.playlist-detail__remove:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
