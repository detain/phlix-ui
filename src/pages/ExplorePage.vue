<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * ExplorePage — shows similar items for a selected media item.
 * Route: /app/explore?item={mediaId}
 * Calls GET /api/v1/media/{id}/similar?limit=20 and displays as a MediaGrid.
 */
import { onMounted, watch, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import MediaGrid from '../components/MediaGrid.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import ItemDataInspector from '../components/ItemDataInspector.vue';
import { useItemInspector } from '../composables/useItemInspector';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { resolvePlayable } from '../composables/useResolvePlayable';
import { usePlayerStore } from '../stores/usePlayerStore';
import type { MediaItem } from '../types/media-item';

/** Similar item from the similar-items engine (P4-S1). */
interface SimilarItem {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  score: number;
  reason: 'genre' | 'actor' | 'director' | 'rating' | 'year';
}

const route = useRoute();
const router = useRouter();
const apiBase = useMediaApiBase();
const toasts = useToastStore();
const auth = useAuthStore();
const userItemData = useUserItemDataStore();
const player = usePlayerStore();

// The selected media item id — from route query `?item=xxx`
const selectedId = computed(() => {
  if (typeof route.query.item === 'string') return route.query.item;
  return null;
});

const items = ref<MediaItem[]>([]);
const loading = ref(false);
const loadingMore = ref(false);
const hasMore = ref(false);
const total = ref<number | null>(null);
const error = ref<string | null>(null);

/** Convert a SimilarItem (from @phlix/contracts) to a MediaItem for MediaCard. */
function similarToMediaItem(s: SimilarItem): MediaItem {
  return {
    id: s.id,
    name: s.title,
    type: 'movie',
    poster_url: s.posterUrl ?? null,
    genres: [],
    year: s.year ?? null,
    rating: null,
    runtime: null,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    sort_title: s.title,
    poster_srcset: null,
  };
}

async function load(): Promise<void> {
  const id = selectedId.value;
  if (!id) return;

  loading.value = true;
  error.value = null;
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    const data = await client.get<{ items: SimilarItem[] }>(
      `/api/v1/media/${encodeURIComponent(id)}/similar`,
      { limit: '20' },
    );
    items.value = (data.items ?? []).map(similarToMediaItem);
    total.value = items.value.length;
    hasMore.value = false;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load similar items';
  } finally {
    loading.value = false;
  }
}

// --- card actions ------------------------------------------------------------
function go(name: string, id: string): void {
  router?.push({ name, params: { id } }).catch(() => {});
}

function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

async function onPlay(item: MediaItem): Promise<void> {
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    const resolved = await resolvePlayable(
      client,
      apiBase.value,
      item,
      player.resumeMap,
    );
    if (!resolved) {
      toasts.info('Nothing to play yet');
      return;
    }
    go('player', resolved.id);
  } catch (e) {
    if (isAbort(e)) return;
    toasts.info('Nothing to play yet');
  }
}

function onInfo(item: MediaItem): void {
  if (router?.hasRoute('media')) go('media', item.id);
  else toasts.info(`Details for "${item.name}" are coming soon`);
}

function onWatchlist(item: MediaItem): void {
  if (userItemData.isFavorite(item.id)) {
    toasts.success(`Added "${item.name}" to your favorites`);
  } else {
    toasts.info(`Removed "${item.name}" from your favorites`);
  }
}

function onMarkWatched(item: MediaItem): void {
  if (userItemData.isWatched(item.id)) {
    toasts.success(`Marked "${item.name}" as watched`);
  } else {
    toasts.info(`Marked "${item.name}" as unwatched`);
  }
}

// S15 — admin ⋯-menu metadata actions. "Edit metadata" opens the shared
// MetadataMatchModal (the same surface "Match metadata" uses — there is no
// separate editing API); "Explore item data" opens the read-only client-side
// inspector. Both produce visible UI here just like the other MediaCard hosts.
const matchTarget = ref<MediaItem | null>(null);
const matchOpen = ref(false);
const { inspectorItem, inspectorOpen, openInspector } = useItemInspector();

function onMatch(item: MediaItem): void {
  matchTarget.value = item;
  matchOpen.value = true;
}
function onMatchApplied(updated: MediaItem): void {
  items.value = items.value.map((i) => (i.id === updated.id ? updated : i));
  toasts.success(`Updated metadata for "${updated.name}"`);
}

function retry(): void {
  void load();
}

onMounted(() => {
  if (selectedId.value) void load();
});

watch(selectedId, (id) => {
  if (id) void load();
});
</script>

<template>
  <div class="explore-page">
    <div class="explore-header">
      <h1 class="explore-title">Explore Similar</h1>
    </div>

    <Spinner v-if="loading && items.length === 0" label="Loading similar items" />

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load similar items"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="retry">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="!loading && items.length === 0 && selectedId"
      icon="film"
      title="No similar items found"
      description="We couldn't find any similar items for this title."
    />

    <EmptyState
      v-else-if="!selectedId"
      icon="search"
      title="Select an item to explore"
      description="Choose a title from your library to see similar recommendations."
    />

    <MediaGrid
      v-else
      :items="items"
      :total="total"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more="hasMore"
      :can-match="auth.isAdmin"
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
      @mark-watched="onMarkWatched"
      @edit-metadata="onMatch"
      @explore-data="openInspector"
    />

    <MetadataMatchModal
      v-if="auth.isAdmin"
      v-model="matchOpen"
      :item="matchTarget"
      @applied="onMatchApplied"
    />

    <ItemDataInspector v-if="auth.isAdmin" v-model="inspectorOpen" :item="inspectorItem" />
  </div>
</template>

<style scoped>
.explore-page {
  padding: var(--space-6);
  max-width: none;
  margin: 0 auto;
}

.explore-header {
  margin-bottom: var(--space-6);
}

.explore-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
  color: var(--text);
}
</style>
