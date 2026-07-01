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
import { ref, computed, inject, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MediaItem } from '../types/media-item';
import { ApiClient } from '../api/client';
import { useMediaApiBase } from '../composables/useApiBase';
import { buildMediaUrl } from '../api/media-query';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import MediaDetail from '../components/MediaDetail.vue';
import SeriesDetail from '../components/SeriesDetail.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import PosterPicker from '../components/PosterPicker.vue';
import { type SeasonGroup } from '../components/series-grouping';
import { loadSeriesSeasons } from '../composables/useSeriesSeasons';
import { pickPlayableEpisode } from '../composables/useResolvePlayable';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import { usePageTitle } from '../composables/usePageTitle';

interface MediaListResponse {
  items: MediaItem[];
  total: number;
}

// On the hub this is the relay-proxy base for the selected server (so the detail
// view + "More like this" rail browse that paired server inline); on the media
// server it is the app's own base.
const apiBase = useMediaApiBase();
// The `/app` router base so the season grid's links carry the right prefix.
const phlixConfig = inject<{ routerBase?: string } | undefined>('phlixConfig', undefined);
const routerBase = computed(() => phlixConfig?.routerBase || '/app');
const route = useRoute();
const router = useRouter();
const player = usePlayerStore();
const toasts = useToastStore();
const auth = useAuthStore();
const userItemData = useUserItemDataStore();

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
    matchTarget.value = data;
    loading.value = false;
    // Seed the per-user favorite/love state from the server `user_data` block so
    // the heart/bookmark (on the detail hero + any card rendered from this item)
    // reflects the real persisted state the moment the page opens. Safe + idempotent
    // — `hydrate` no-ops on a null item and defaults missing `user_data` to neutral.
    userItemData.hydrate(data);
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
  // A series itself isn't directly playable — "Play" starts the viewer's
  // resume-in-progress / next-up episode (the furthest-along in-progress episode
  // in whole-series playback order), or the very first episode when they've never
  // watched it. The season tree is already loaded for the detail view, so reuse it
  // via the pure `pickPlayableEpisode` (no redundant fetch). null (no playable
  // episodes — incl. a Specials-only tree) toasts rather than navigating to an
  // unplayable series id.
  if (m.type === 'series') {
    const next = pickPlayableEpisode(seasons.value, player.resumeMap);
    if (next) go('player', next.id);
    else toasts.info('No episodes to play yet');
    return;
  }
  go('player', m.id);
}
// State-aware toast for the `watchlist` action. EVERY `watchlist` emitter that
// reaches this handler has ALREADY toggled the favorite store + persisted the
// change before re-emitting: the "More like this" rail cards via MediaCard's
// `onFavorite` (Step 17.3) AND the detail hero's own favorite button via
// MediaDetail's `onFavorite` (Step 17.4). So this handler must NOT toggle again
// (a second toggle would flip it straight back) — it only reports the resulting
// persisted state from the store, which is now correct for both paths.
function onWatchlist(m: MediaItem): void {
  if (userItemData.isFavorite(m.id)) {
    toasts.success(`Added "${m.name}" to your favorites`);
  } else {
    toasts.info(`Removed "${m.name}" from your favorites`);
  }
}
function onInfo(m: MediaItem): void {
  go('media', m.id); // navigate to that title's detail (re-fetches via the id watch)
}
function onBack(): void {
  router?.back();
}
/** A cast member was clicked — open that title's library, filtered to the actor,
 *  so "all the matching media with that actor" shows. Needs the item's owning
 *  library (present on the detail shape); a no-op if it's absent. */
function onActor(name: string): void {
  const libId = item.value?.library_id;
  if (libId && router?.hasRoute('library')) {
    void router.push({ name: 'library', params: { id: libId }, query: { actors: name } });
  }
}
/** A genre chip was clicked — open the owning library filtered to that genre. */
function onGenre(genre: string): void {
  const libId = item.value?.library_id;
  if (libId && router?.hasRoute('library')) {
    void router.push({ name: 'library', params: { id: libId }, query: { genres: genre } });
  }
}
/** A studio / production-company chip was clicked — open the owning library
 *  filtered to that company. */
function onCompany(name: string): void {
  const libId = item.value?.library_id;
  if (libId && router?.hasRoute('library')) {
    void router.push({ name: 'library', params: { id: libId }, query: { companies: name } });
  }
}

// Interactive metadata match (U5) — admin-only. "Match metadata" opens the modal
// for the current item; a successful apply swaps in the server's re-shaped item
// (instant poster/metadata refresh) and re-pulls the season tree for a series so
// the enriched children show too.
const matchTarget = ref<MediaItem | null>(null);
const matchOpen = ref(false);

// Poster picker state — opened from the "Choose poster…" card/detail action.
const posterPickerOpen = ref(false);

function onMatch(): void {
  if (item.value) {
    matchTarget.value = item.value;
    matchOpen.value = true;
  }
}
function onMatchApplied(updated: MediaItem): void {
  item.value = updated;
  matchTarget.value = updated;
  toasts.success(`Updated metadata for "${updated.name}"`);
  if (updated.type === 'series') {
    const client = new ApiClient({ baseUrl: apiBase.value });
    void loadSeasons(client, updated);
  }
}

// MediaDetail/MediaCard already toggled the watched store + persisted before
// re-emitting `mark-watched`, so only report the resulting state here (mirrors
// `onWatchlist`) — a second toggle would flip it straight back.
function onMarkWatched(m: MediaItem): void {
  if (userItemData.isWatched(m.id)) {
    toasts.success(`Marked "${m.name}" as watched`);
  } else {
    toasts.info(`Marked "${m.name}" as unwatched`);
  }
}

function onRefresh(m: MediaItem): void {
  matchTarget.value = m;
  matchOpen.value = true;
}

function onChoosePoster(m: MediaItem): void {
  matchTarget.value = m;
  posterPickerOpen.value = true;
}

function onPosterApplied(updated: MediaItem): void {
  item.value = updated;
  matchTarget.value = updated;
  toasts.success(`Updated poster for "${updated.name}"`);
}

let removeController: AbortController | null = null;
async function onRemove(m: MediaItem): Promise<void> {
  if (!window.confirm(`Remove "${m.name}" from the library? This cannot be undone.`)) return;
  removeController?.abort();
  const myController = typeof AbortController !== 'undefined' ? new AbortController() : null;
  removeController = myController;
  const stale = (): boolean => myController !== removeController;
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    await client.deleteMediaItem(m.id);
    if (stale()) return;
    item.value = null;
    toasts.success(`Removed "${m.name}"`);
    router?.back();
  } catch (e) {
    if (stale() || isAbort(e)) return;
    toasts.error(`Failed to remove "${m.name}": ${e instanceof Error ? e.message : 'Unknown error'}`);
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
        @mark-watched="onMarkWatched"
        @refresh="onRefresh"
        @choose-poster="onChoosePoster"
        @remove="onRemove"
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
        @actor="onActor"
        @genre="onGenre"
        @company="onCompany"
        @mark-watched="onMarkWatched"
        @refresh="onRefresh"
        @choose-poster="onChoosePoster"
        @remove="onRemove"
        @back="onBack"
      />
    </template>

    <MetadataMatchModal
      v-if="auth.isAdmin"
      v-model="matchOpen"
      :item="matchTarget"
      @applied="onMatchApplied"
    />

    <PosterPicker
      v-if="auth.isAdmin"
      v-model="posterPickerOpen"
      :item="matchTarget"
      @applied="onPosterApplied"
    />
  </div>
</template>

<style scoped>
.media-detail-page {
  width: 100%;
}
.media-detail-page__loading {
  max-width: none;
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
