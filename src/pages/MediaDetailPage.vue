<script setup lang="ts">
/**
 * MediaDetailPage (R2.5) — route container for `/app/media/:id`.
 *
 * Fetches the title by id (`GET /api/v1/media/:id`) plus a genre-scoped "More
 * like this" list, resolves the resume position from `usePlayerStore`, and wires
 * the detail actions (Play / Resume → player route, Watchlist → toast, similar
 * card → navigate). Deep-links work and re-fetch when the route id changes
 * (navigating between details). Loading → Skeleton; error → EmptyState + retry.
 */
import { ref, computed, inject, onMounted, watch, onBeforeUnmount, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MediaItem } from '../types/media-item';
import { ApiClient } from '../api/client';
import { buildMediaUrl } from '../api/media-query';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import MediaDetail from '../components/MediaDetail.vue';
import SeriesSeasons from '../components/SeriesSeasons.vue';
import {
  groupEpisodesBySeason,
  hasSeasonRows,
  firstEpisode,
  type SeasonGroup,
} from '../components/series-grouping';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import Spinner from '../components/ui/Spinner.vue';
import { usePageTitle } from '../composables/usePageTitle';

interface MediaListResponse {
  items: MediaItem[];
  total: number;
}

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const route = useRoute();
const router = useRouter();
const player = usePlayerStore();
const toasts = useToastStore();

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

async function fetchChildren(client: ApiClient, parentId: string, signal?: AbortSignal): Promise<MediaItem[]> {
  // A high limit so a full series' episodes arrive in one page (the season tree
  // renders the whole show at once); the browse API caps at 100 per request.
  const url = buildMediaUrl(apiBase.value, { parentId, limit: 100, sort: 'name', order: 'asc' });
  const res = await client.get<MediaListResponse>(url, undefined, signal);
  return res.items ?? [];
}

async function loadSeasons(client: ApiClient, series: MediaItem): Promise<void> {
  const myController = controller;
  const stale = () => disposed || myController !== controller;
  seasonsLoading.value = true;
  seasons.value = [];
  try {
    let children = await fetchChildren(client, series.id, myController?.signal);
    if (stale()) return;
    // If the server models seasons as their own `type: 'season'` rows, fetch each
    // season's episodes and flatten so grouping is uniformly by season_number
    // (keeping any episodes parented directly onto the series too).
    if (hasSeasonRows(children)) {
      const seasonRows = children.filter((c) => c.type === 'season');
      const lists = await Promise.all(
        seasonRows.map((s) =>
          fetchChildren(client, s.id, myController?.signal).catch(() => [] as MediaItem[]),
        ),
      );
      if (stale()) return;
      const directEpisodes = children.filter((c) => c.type !== 'season');
      children = [...directEpisodes, ...lists.flat()];
    }
    seasons.value = groupEpisodesBySeason(children);
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
function onPlayEpisode(ep: MediaItem): void {
  go('player', ep.id);
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
      <MediaDetail
        :item="item"
        :resume-seconds="resumeSeconds"
        :similar="similar"
        :similar-loading="similarLoading"
        @play="onPlay"
        @resume="onPlay"
        @watchlist="onWatchlist"
        @info="onInfo"
        @back="onBack"
      />

      <!-- Series drill-down: season/specials → episodes (below the hero). -->
      <section v-if="isSeries" class="media-detail-page__seasons" aria-label="Episodes">
        <h2 class="media-detail-page__seasons-title">Episodes</h2>

        <div
          v-if="seasonsLoading"
          class="media-detail-page__seasons-loading"
          role="status"
          aria-busy="true"
        >
          <Spinner label="Loading episodes" />
        </div>

        <SeriesSeasons
          v-else-if="seasons.length"
          :seasons="seasons"
          @play="onPlayEpisode"
        />

        <EmptyState
          v-else
          icon="tv"
          title="No episodes yet"
          description="This series has no episodes available to watch."
        />
      </section>
    </template>
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

.media-detail-page__seasons {
  max-width: 1100px;
  margin: var(--space-8) auto 0;
  padding: 0 var(--space-6) var(--space-6);
}
.media-detail-page__seasons-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-4);
}
.media-detail-page__seasons-loading {
  display: flex;
  justify-content: center;
  padding: var(--space-8) 0;
}
</style>
