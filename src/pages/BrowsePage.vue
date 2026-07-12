<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * BrowsePage — the Browse home surface. A resume-map "Continue Watching" rail,
 * the app's configured query-scoped home rows, then ONE rail per library
 * ("Movies", "TV", "Anime", …) so each library is its own section rather than a
 * single flat all-libraries grid. Each library rail's "See all" opens that
 * library's dedicated page (`/app/library/:id`) where the full filterable grid
 * lives.
 *
 * Libraries come from `useLibrariesStore` (`GET /api/v1/libraries`, sorted by
 * display order then name). Continue Watching is derived from
 * `usePlayerStore.resumeMap` resolved against a small in-page registry fed by the
 * rails' fetches — no extra API. Card actions route to the player / detail view;
 * a rail fetch failure surfaces inside that rail (HomeRow), and a failure to load
 * the library list surfaces as a canonical EmptyState with Retry.
 */
import { onMounted, watch, inject, computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { useLibrariesStore } from '../stores/useLibrariesStore';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { useResumeSync } from '../composables/useResumeSync';
import MediaRow from '../components/MediaRow.vue';
import HomeRow from '../components/HomeRow.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import PosterPicker from '../components/PosterPicker.vue';
import { ApiClient } from '../api/client';
import { libraryLoadErrorInfo } from './browseErrors';
import { resolvePlayable } from '../composables/useResolvePlayable';
import type { MediaItem } from '../types/media-item';
import type { PhlixAppConfig, HomeRow as HomeRowConfig } from '../app/types';

defineSlots<{
  'toolbar-extra'?: never;
}>();

// On the hub this resolves to the relay-proxy base for the selected server, so
// the library rails browse that paired server inline; on the media server it is
// the app's own base (see useMediaApiBase / createPhlixApp).
const apiBase = useMediaApiBase();
const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const homeRows = computed<HomeRowConfig[]>(() => config?.homeRows ?? []);

const libraries = useLibrariesStore();
const player = usePlayerStore();
const toasts = useToastStore();
const auth = useAuthStore();
const userItemData = useUserItemDataStore();
const router = useRouter();
const { syncResume, continueWatchingItems } = useResumeSync();

// Interactive metadata match (U5) — admin-only. A card "Match" action opens the
// modal for that item; on a successful apply we (a) replace the registry entry so
// Continue Watching reflects it AND (b) push the applied item down to every
// HomeRow rail as the `applied-item` prop — each rail patches its OWN internal
// `items` in place if it owns the id (no-op otherwise). The rails render from
// their own fetched `items`, not the registry, so without (b) the clicked card
// would stay stale until a full reload.
const matchTarget = ref<MediaItem | null>(null);
const matchOpen = ref(false);
/** The most recently applied item, broadcast to every rail to reconcile. */
const appliedItem = ref<MediaItem | null>(null);

// Poster picker state — opened from the "Choose poster…" card action.
const posterPickerOpen = ref(false);
const posterPickerTarget = ref<MediaItem | null>(null);

function onMatch(item: MediaItem): void {
  matchTarget.value = item;
  matchOpen.value = true;
}
function onMatchApplied(item: MediaItem): void {
  registry.set(item.id, item);
  // A fresh object identity each apply so re-applying the SAME id still triggers
  // the rails' watch (a structural-equal value wouldn't re-fire on identity).
  appliedItem.value = { ...item };
  toasts.success(`Updated metadata for "${item.name}"`);
}

/** Patch the item's poster in place after the admin picks a new one (same
 *  reconciliation pattern as onMatchApplied — find in registry + broadcast). */
function onPosterApplied(updated: MediaItem): void {
  registry.set(updated.id, updated);
  appliedItem.value = { ...updated };
  toasts.success(`Updated poster for "${updated.name}"`);
}

// One HomeRow config per library: a library-scoped rail titled by the library
// name, whose "See all" carries the library id (consumed by onSeeAll → page).
const libraryRows = computed<HomeRowConfig[]>(() =>
  libraries.items.map((lib) => ({
    id: `library-${lib.id}`,
    title: lib.name,
    // `topLevel` keeps a series library's rail to shows (not a flat dump of every
    // episode); movie/etc. libraries are unaffected (their items are top-level).
    query: { libraryId: lib.id, topLevel: true },
  })),
);

// --- continue-watching (fed directly from the server payload, U-N4) -----
// Registry still used for metadata-match / poster-pick reconciliation with rails.
const registry = reactive(new Map<string, MediaItem>());
function remember(list: MediaItem[]): void {
  list.forEach((i) => registry.set(i.id, i));
}
// `continueWatchingItems` is the REACTIVE ref from `useResumeSync`, holding the
// full MediaItem payloads returned by `GET /users/me/continue-watching`. Reading
// `.value` inside this computed subscribes to it, so a later `syncResume()`
// (login / tab refocus / BrowsePage mount) that reassigns the shared ref
// propagates here — a title paused on another device shows in Continue Watching
// even if not loaded in any rail (U-N4). Positions are sorted via
// `player.resumeMap`.
const continueItems = computed<MediaItem[]>(() => {
  const map = player.resumeMap;
  return continueWatchingItems.value
    .filter((item) => (map[item.id] ?? 0) > 0)
    .sort((a, b) => (map[b.id] ?? 0) - (map[a.id] ?? 0))
    .slice(0, 12);
});

// --- Favorites rail (Feature 17.5) -------------------------------------------
// A dedicated "Favorites" rail fed by `GET /api/v1/users/me/favorites`
// (api.listFavorites → { items, limit, offset }; NO total). It is hidden when
// empty (no favorites → the section renders nothing, via v-if + hideWhenEmpty).
//
// Optimistic local-patch: `useUserItemDataStore.toggleFavorite` (called by MediaCard)
// already mutates the store optimistically. The `watchlist` event from the card
// (back-compat relay) is handled by `onWatchlist` which adds/removes the item from
// `favoriteItems` in-place — no refetch. The rail refreshes only on page (re)entry
// via `onMounted` → `loadFavorites()`.
const FAVORITES_LIMIT = 24;
const favoriteItems = ref<MediaItem[]>([]);
const favoritesLoading = ref(false);
const favoritesError = ref<string | null>(null);

let favoritesClient: ApiClient | null = null;
function favClient(base: string): ApiClient {
  if (!favoritesClient) favoritesClient = new ApiClient({ baseUrl: base });
  else favoritesClient.setBaseUrl(base);
  return favoritesClient;
}

async function loadFavorites(): Promise<void> {
  if (favoritesLoading.value) return;
  favoritesLoading.value = true;
  favoritesError.value = null;
  try {
    const { items } = await favClient(apiBase.value).listFavorites({ limit: FAVORITES_LIMIT });
    favoriteItems.value = items;
    items.forEach((i) => userItemData.hydrate(i));
    remember(items);
  } catch (e) {
    favoritesError.value = e instanceof Error ? e.message : 'Failed to load favorites';
  } finally {
    favoritesLoading.value = false;
  }
}

const showFavorites = computed(
  () => !favoritesLoading.value && !favoritesError.value && favoriteItems.value.length > 0,
);

// --- library list load -------------------------------------------------------
function load(): void {
  void libraries.load(apiBase.value, true);
  void loadFavorites();
}
onMounted(() => {
  void libraries.load(apiBase.value);
  void loadFavorites();
  void syncResume(); // U-N8: re-sync positions when entering BrowsePage
});
watch(apiBase, load);


// Map the store's failure to an actionable title/description. On the hub, a browse
// of a server whose relay tunnel isn't connected surfaces a `server.*` code (see
// libraryLoadErrorInfo); otherwise this falls back to the generic error with the
// store's own message.
const errorInfo = computed(() =>
  libraryLoadErrorInfo(libraries.errorCode ?? null, libraries.error ?? ''),
);

const showEmpty = computed(
  () => libraries.loaded && libraries.items.length === 0 && !libraries.error,
);
const showSpinner = computed(
  () => libraries.loading && libraries.items.length === 0 && !libraries.error,
);

// --- card actions ------------------------------------------------------------
function go(name: string, id: string): void {
  router?.push({ name, params: { id } }).catch(() => {});
}

let playController: AbortController | null = null;
function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

/**
 * Play a card immediately (Feature 9). A movie/episode/audio/image plays as-is;
 * a series/season is resolved to the viewer's next-up / resume episode (or its
 * first) via `resolvePlayable`. A rapid second Play supersedes the first: each
 * call aborts the previous controller, so the older (now-stale) resolve rejects
 * with an `AbortError` we swallow and discards its navigation. Nothing playable
 * (e.g. a series with no episodes) toasts rather than navigating. The poster
 * CLICK still routes to detail — only this Play action resolves-then-plays.
 */
async function onPlay(item: MediaItem): Promise<void> {
  playController?.abort();
  const myController = typeof AbortController !== 'undefined' ? new AbortController() : null;
  playController = myController;
  const stale = (): boolean => myController !== playController;
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    const resolved = await resolvePlayable(
      client,
      apiBase.value,
      item,
      player.resumeMap,
      myController?.signal,
    );
    if (stale()) return;
    if (!resolved) {
      toasts.info('Nothing to play yet');
      return;
    }
    go('player', resolved.id);
  } catch (e) {
    if (stale() || isAbort(e)) return;
    toasts.info('Nothing to play yet');
  }
}
// The card's favorite/bookmark button ALREADY toggled the store optimistically
// (MediaCard.onFavorite → useUserItemDataStore.toggleFavorite, Step 17.3) and then
// re-emits `watchlist` for back-compat. This handler must therefore NOT toggle
// again (a second toggle would flip the favorite right back off). It only surfaces
// a state-aware toast reflecting the NEW persisted state read from the store, so
// favoriting persists across a reload (the single source of truth is the store +
// server, mutated once by the card).
function onWatchlist(item: MediaItem): void {
  // U-N5: patch favoriteItems locally instead of refetching the whole list.
  // The store was already toggled optimistically by MediaCard.
  if (userItemData.isFavorite(item.id)) {
    toasts.success(`Added "${item.name}" to your favorites`);
    if (!favoriteItems.value.some((f) => f.id === item.id)) {
      favoriteItems.value = [...favoriteItems.value, item];
    }
  } else {
    toasts.info(`Removed "${item.name}" from your favorites`);
    favoriteItems.value = favoriteItems.value.filter((f) => f.id !== item.id);
  }
}
function onInfo(item: MediaItem): void {
  if (router?.hasRoute('media')) go('media', item.id);
  else toasts.info(`Details for "${item.name}" are coming soon`);
}

// The card/menu already toggled the watched store + persisted the change before
// re-emitting `mark-watched` (MediaCard.onWatched), so this handler must NOT
// toggle again — it only reports the resulting persisted state (mirrors
// `onWatchlist`).
function onMarkWatched(item: MediaItem): void {
  if (userItemData.isWatched(item.id)) {
    toasts.success(`Marked "${item.name}" as watched`);
  } else {
    toasts.info(`Marked "${item.name}" as unwatched`);
  }
}

function onRefresh(item: MediaItem): void {
  matchTarget.value = item;
  matchOpen.value = true;
}

function onChoosePoster(item: MediaItem): void {
  posterPickerTarget.value = item;
  posterPickerOpen.value = true;
}

let removeController: AbortController | null = null;
async function onRemove(item: MediaItem): Promise<void> {
  if (!window.confirm(`Remove "${item.name}" from the library? This cannot be undone.`)) return;
  removeController?.abort();
  const myController = typeof AbortController !== 'undefined' ? new AbortController() : null;
  removeController = myController;
  const stale = (): boolean => myController !== removeController;
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    await client.deleteMediaItem(item.id);
    if (stale()) return;
    favoriteItems.value = favoriteItems.value.filter((f) => f.id !== item.id);
    registry.delete(item.id);
    toasts.success(`Removed "${item.name}"`);
  } catch (e) {
    if (stale() || isAbort(e)) return;
    toasts.error(`Failed to remove "${item.name}": ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
}

// --- see-all -----------------------------------------------------------------
// A library rail carries its library id in `query.libraryId` → open that
// library's dedicated page. A configured (non-library) home row has no library
// id; route it to the catch-all browse home (its query lives on the rail).
function onSeeAll(row: HomeRowConfig): void {
  const libraryId = row.query?.libraryId;
  if (libraryId) {
    router?.push({ name: 'library', params: { id: libraryId } }).catch(() => {});
  }
}
</script>

<template>
  <div class="browse-page">
    <div class="browse-toolbar">
      <slot name="toolbar-extra" />
    </div>

    <MediaRow
      v-if="continueItems.length"
      title="Continue Watching"
      :items="continueItems"
      :can-match="auth.isAdmin"
      hide-when-empty
      fetch-priority="high"
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
      @match="onMatch"
      @mark-watched="onMarkWatched"
      @refresh="onRefresh"
      @choose-poster="onChoosePoster"
      @remove="onRemove"
    />

    <!-- Favorites rail (Feature 17.5) — fed by api.listFavorites(); hidden when
         empty; patched locally on toggle (U-N5). -->
    <MediaRow
      v-if="showFavorites"
      title="Favorites"
      :items="favoriteItems"
      :can-match="auth.isAdmin"
      hide-when-empty
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
      @match="onMatch"
      @mark-watched="onMarkWatched"
      @refresh="onRefresh"
      @choose-poster="onChoosePoster"
      @remove="onRemove"
    />

    <!-- App-configured, query-scoped shelves (genre/type rails); optional. "See
         all" only shows when the shelf is library-scoped (has a navigable target). -->
    <HomeRow
      v-for="row in homeRows"
      :key="row.id"
      :row="row"
      :api-base="apiBase"
      :show-see-all="!!row.query?.libraryId"
      :can-match="auth.isAdmin"
      :applied-item="appliedItem"
      @items-loaded="remember"
      @see-all="onSeeAll"
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
      @match="onMatch"
      @mark-watched="onMarkWatched"
      @refresh="onRefresh"
      @choose-poster="onChoosePoster"
      @remove="onRemove"
    />

    <!-- One section per library — the headline of the Browse surface. -->
    <HomeRow
      v-for="row in libraryRows"
      :key="row.id"
      :row="row"
      :api-base="apiBase"
      :can-match="auth.isAdmin"
      :applied-item="appliedItem"
      @items-loaded="remember"
      @see-all="onSeeAll"
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
      @match="onMatch"
      @mark-watched="onMarkWatched"
      @refresh="onRefresh"
      @choose-poster="onChoosePoster"
      @remove="onRemove"
    />

    <div v-if="showSpinner" class="browse-loading">
      <Spinner label="Loading libraries" />
    </div>

    <EmptyState
      v-if="libraries.error"
      icon="alert"
      :title="errorInfo.title"
      :description="errorInfo.description"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="load">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="showEmpty"
      icon="film"
      title="No libraries yet"
      description="Once a library is added it shows up here as its own section."
    />

    <MetadataMatchModal
      v-if="auth.isAdmin"
      v-model="matchOpen"
      :item="matchTarget"
      @applied="onMatchApplied"
    />

    <PosterPicker
      v-if="auth.isAdmin"
      v-model="posterPickerOpen"
      :item="posterPickerTarget"
      @applied="onPosterApplied"
    />
  </div>
</template>

<style scoped>
.browse-page {
  padding: var(--space-6);
  max-width: none;
  margin: 0 auto;
}

.browse-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
  min-height: 0;
}
.browse-toolbar:empty {
  display: none;
}

.browse-loading {
  display: flex;
  justify-content: center;
  padding: var(--space-8) 0;
}
</style>
