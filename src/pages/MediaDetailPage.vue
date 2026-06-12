<script setup lang="ts">
/**
 * MediaDetailPage (R2.5) — route container for `/app/media/:id`.
 *
 * Fetches the title by id (`GET /api/v1/media/:id`). A SERIES renders
 * `SeriesDetail` (info + a grid of season cards, each linking to its own
 * per-season page — U3); a movie/episode renders `MediaDetail` + a genre-scoped
 * "More like this" rail. Resolves the resume position from `usePlayerStore` and
 * wires the detail actions (Play / Resume → player route, Watchlist → toast,
 * similar/info card → navigate). Deep-links work and re-fetch when the route id
 * changes. Loading → Skeleton; error → EmptyState + retry.
 */
import { ref, computed, inject, onMounted, watch, onBeforeUnmount, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MediaItem } from '../types/media-item';
import { ApiClient } from '../api/client';
import { buildMediaUrl } from '../api/media-query';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import MediaDetail from '../components/MediaDetail.vue';
import SeriesDetail from '../components/SeriesDetail.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import { firstEpisode, type SeasonGroup } from '../components/series-grouping';
import { loadSeriesSeasons } from '../composables/useSeriesSeasons';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import { usePageTitle } from '../composables/usePageTitle';

interface MediaListResponse {
  items: MediaItem[];
  total: number;
}

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
// The `/app` router base so the season grid's links carry the right prefix.
const phlixConfig = inject<{ routerBase?: string } | undefined>('phlixConfig', undefined);
const routerBase = computed(() => phlixConfig?.routerBase || '/app');
const route = useRoute();
const router = useRouter();
const player = usePlayerStore();
const toasts = useToastStore();
const auth = useAuthStore();

const item = ref<MediaItem | null>(null);
const similar = ref<MediaItem[]>([]);
const seasons = ref<SeasonGroup[]>([]);
const loading = ref(true);
const similarLoading = ref(false);
const seasonsLoading = ref(false);
const error = ref<string | null>(null);

const currentId = computed(() => String(route.params.id ?? ''));
const resumeSeconds = computed(() => player.resumePositionFor(currentId.value));
const isSeries = computed(() => item.value?.type === 'series');

// Title reflects the actual title/series name once it loads (e.g. "Assassination
// Classroom · Phlix"); until then the route default (set by afterEach) stands.
usePageTitle(() => item.value?.name);

let controller: AbortController | null = null;
let disposed = false;

function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

async function loadSimilar(client: ApiClient, base: MediaItem): Promise<void> {
  const genre = base.genres?.[0];
  if (!genre) {
    similar.value = [];
    return;
  }
  // Pin the controller for THIS load so a superseded similar fetch (rapid
  // detail→detail navigation) can't clobber the newer one's state/loading flag.
  const myController = controller;
  const stale = () => disposed || myController !== controller;
  similarLoading.value = true;
  try {
    const url = buildMediaUrl(apiBase.value, { genres: [genre], limit: 13, sort: 'rating', order: 'desc' });
    const res = await client.get<MediaListResponse>(url, undefined, myController?.signal);
    if (stale()) return;
    similar.value = (res.items ?? []).filter((m) => m.id !== base.id).slice(0, 12);
  } catch (e) {
    if (stale() || isAbort(e)) return;
    similar.value = []; // a missing similar list is non-fatal
  } finally {
    if (!stale()) similarLoading.value = false;
  }
}

async function loadSeasons(client: ApiClient, series: MediaItem): Promise<void> {
  const myController = controller;
  const stale = () => disposed || myController !== controller;
  seasonsLoading.value = true;
  seasons.value = [];
  try {
    // The shared routine fetches the series' children once (flattening any
    // server-modelled `type: 'season'` container rows to their episodes) and
    // groups them by season number — the season grid + per-season page share it.
    const groups = await loadSeriesSeasons(client, apiBase.value, series.id, myController?.signal);
    if (stale()) return;
    seasons.value = groups;
  } catch (e) {
    if (stale() || isAbort(e)) return;
    seasons.value = []; // a missing season tree is non-fatal — the hero still renders
  } finally {
    if (!stale()) seasonsLoading.value = false;
  }
}

async function load(): Promise<void> {
  const id = currentId.value;
  controller?.abort();
  controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  loading.value = true;
  error.value = null;
  similar.value = [];
  seasons.value = [];
  if (!id) {
    error.value = 'No media id provided';
    loading.value = false;
    return;
  }
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    // The server wraps the item as { item } (matches getMediaItem / WebPortalRouter).
    const response = await client.get<{ item: MediaItem }>(
      `/api/v1/media/${encodeURIComponent(id)}`,
      undefined,
      controller?.signal,
    );
    if (disposed) return;
    const data = response.item;
    item.value = data;
    loading.value = false;
    // A series drills into its season/episode tree; everything else shows the
    // genre-based "More like this" rail. (Mutually exclusive so the tree isn't
    // buried under a similar rail.)
    if (data.type === 'series') {
      void loadSeasons(client, data);
    } else {
      void loadSimilar(client, data);
    }
  } catch (e) {
    if (disposed || isAbort(e)) return;
    error.value = e instanceof Error ? e.message : 'Failed to load title';
    loading.value = false;
  }
}

onMounted(load);
watch(currentId, load);
onBeforeUnmount(() => {
  disposed = true;
  controller?.abort();
  controller = null;
});

function go(name: string, id: string): void {
  router?.push({ name, params: { id } }).catch(() => {});
}
function onPlay(m: MediaItem): void {
  // A series itself isn't directly playable — "Play" starts its first episode
  // (first season, first episode). With no episodes loaded yet there's nothing
  // to start, so it no-ops rather than navigating to an unplayable series id.
  if (m.type === 'series') {
    const first = firstEpisode(seasons.value);
    if (first) go('player', first.id);
    else toasts.info('No episodes to play yet');
    return;
  }
  go('player', m.id);
}
function onWatchlist(m: MediaItem): void {
  toasts.success(`Added "${m.name}" to your list`);
}
function onInfo(m: MediaItem): void {
  go('media', m.id); // navigate to that title's detail (re-fetches via the id watch)
}
function onBack(): void {
  router?.back();
}

// Interactive metadata match (U5) — admin-only. "Match metadata" opens the modal
// for the current item; a successful apply swaps in the server's re-shaped item
// (instant poster/metadata refresh) and re-pulls the season tree for a series so
// the enriched children show too.
const matchOpen = ref(false);
function onMatch(): void {
  if (item.value) matchOpen.value = true;
}
function onMatchApplied(updated: MediaItem): void {
  item.value = updated;
  toasts.success(`Updated metadata for "${updated.name}"`);
  if (updated.type === 'series') {
    const client = new ApiClient({ baseUrl: apiBase.value });
    void loadSeasons(client, updated);
  }
}
</script>

<template>
  <div class="media-detail-page">
    <div v-if="loading" class="media-detail-page__loading" role="status" aria-busy="true" aria-label="Loading title">
      <div class="media-detail-page__loading-hero">
        <Skeleton variant="rect" radius="var(--radius-lg)" height="420px" />
        <div class="media-detail-page__loading-info">
          <Skeleton variant="text" width="60%" height="2rem" />
          <Skeleton variant="text" :lines="4" />
          <Skeleton variant="rect" width="9rem" height="2.5rem" radius="var(--radius-md)" />
        </div>
      </div>
    </div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load this title"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" @click="load">Retry</Button>
        <Button variant="ghost" @click="onBack">Back</Button>
      </template>
    </EmptyState>

    <template v-else-if="item">
      <!-- A series shows its info + a grid of SEASON cards (each linking to its
           own per-season page); a movie/episode keeps the detail + similar rail. -->
      <SeriesDetail
        v-if="isSeries"
        :item="item"
        :seasons="seasons"
        :loading="seasonsLoading"
        :resume-seconds="resumeSeconds"
        :router-base="routerBase"
        :can-match="auth.isAdmin"
        @play="onPlay"
        @resume="onPlay"
        @watchlist="onWatchlist"
        @info="onInfo"
        @match="onMatch"
        @back="onBack"
      />

      <MediaDetail
        v-else
        :item="item"
        :resume-seconds="resumeSeconds"
        :similar="similar"
        :similar-loading="similarLoading"
        :can-match="auth.isAdmin"
        @play="onPlay"
        @resume="onPlay"
        @watchlist="onWatchlist"
        @info="onInfo"
        @match="onMatch"
        @back="onBack"
      />
    </template>

    <MetadataMatchModal
      v-if="auth.isAdmin"
      v-model="matchOpen"
      :item="item"
      @applied="onMatchApplied"
    />
  </div>
</template>

<style scoped>
.media-detail-page {
  width: 100%;
}
.media-detail-page__loading {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.media-detail-page__loading-hero {
  display: grid;
  grid-template-columns: minmax(0, 280px) 1fr;
  gap: var(--space-8);
  align-items: start;
}
.media-detail-page__loading-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
@media (max-width: 720px) {
  .media-detail-page__loading-hero {
    grid-template-columns: 1fr;
  }
}
</style>
