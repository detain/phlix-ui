<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * RecommendationsPage — personalized recommendations based on watch history.
 * Route: /app/recommendations
 * Calls GET /api/v1/me/recommendations?limit=20 and displays "Because you watched X" cards.
 */
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import MediaGrid from '../components/MediaGrid.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { resolvePlayable } from '../composables/useResolvePlayable';
import { usePlayerStore } from '../stores/usePlayerStore';
import type { MediaItem } from '../types/media-item';

/** User recommendation from the because-you-watched engine (P4-S2). */
interface UserRecommendation {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  score: number;
  reason: 'because_you_watched';
  computedAt: string;
}

const router = useRouter();
const apiBase = useMediaApiBase();
const toasts = useToastStore();
const auth = useAuthStore();
const userItemData = useUserItemDataStore();
const player = usePlayerStore();

const items = ref<MediaItem[]>([]);
const loading = ref(false);
const loadingMore = ref(false);
const hasMore = ref(false);
const total = ref<number | null>(null);
const error = ref<string | null>(null);

/** Convert a UserRecommendation (from @phlix/contracts) to a MediaItem for MediaCard. */
function recommendationToMediaItem(r: UserRecommendation): MediaItem {
  return {
    id: r.id,
    name: r.title,
    type: 'movie',
    poster_url: r.posterUrl ?? null,
    genres: [],
    year: r.year ?? null,
    rating: null,
    runtime: null,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    sort_title: r.title,
    poster_srcset: null,
  };
}

async function load(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    const data = await client.get<{ recommendations: UserRecommendation[] }>(
      '/api/v1/me/recommendations',
      { limit: '20' },
    );
    items.value = (data.recommendations ?? []).map(recommendationToMediaItem);
    total.value = items.value.length;
    hasMore.value = false;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load recommendations';
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

function retry(): void {
  void load();
}

onMounted(() => {
  void load();
});
</script>

<template>
  <div class="recommendations-page">
    <div class="recommendations-header">
      <h1 class="recommendations-title">Recommended for You</h1>
      <p class="recommendations-subtitle">Because you watched…</p>
    </div>

    <Spinner v-if="loading && items.length === 0" label="Loading recommendations" />

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load recommendations"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="retry">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="!loading && items.length === 0"
      icon="star"
      title="No recommendations yet"
      description="Watch a few titles and we'll suggest others you'll love."
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
    />
  </div>
</template>

<style scoped>
.recommendations-page {
  padding: var(--space-6);
  max-width: none;
  margin: 0 auto;
}

.recommendations-header {
  margin-bottom: var(--space-6);
}

.recommendations-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
  color: var(--text);
}

.recommendations-subtitle {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: var(--space-1);
}
</style>
