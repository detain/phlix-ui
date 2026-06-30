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
import MediaRow from '../components/MediaRow.vue';
import HomeRow from '../components/HomeRow.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import { ApiClient } from '../api/client';
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

// --- continue-watching registry (resume ids resolved against rail items) -----
const registry = reactive(new Map<string, MediaItem>());
function remember(list: MediaItem[]): void {
  list.forEach((i) => registry.set(i.id, i));
}

const continueItems = computed<MediaItem[]>(() => {
  const map = player.resumeMap;
  return Object.keys(map)
    .map((id) => registry.get(id))
    .filter((x): x is MediaItem => !!x)
    .sort((a, b) => (map[b.id] ?? 0) - (map[a.id] ?? 0))
    .slice(0, 12);
});

// --- Favorites rail (Feature 17.5) -------------------------------------------
// A dedicated "Favorites" rail fed by `GET /api/v1/users/me/favorites`
// (api.listFavorites → { items, limit, offset }; NO total). It is hidden when
// empty (no favorites → the section renders nothing, via v-if + hideWhenEmpty).
//
// Refresh-on-toggle: favoriting/unfavoriting happens through
// `useUserItemDataStore.toggleFavorite` (optimistic). The store's reactive
// `entries` map is the single source of truth, so we derive a signature of the
// currently-favorited ids from it and re-fetch the rail whenever that set
// changes — so an un-favorited item drops off (and a newly favorited one shows
// up) on the next fetch. We also hydrate the fetched items into the store so
// each card's bookmark reflects the correct state.
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

// Signature of the favorited id set, derived from the store's reactive cache.
// Sorted+joined so it changes iff the SET of favorited ids changes (toggle on
// a card flips an entry's `favorite` flag → this string changes → re-fetch).
const favoriteSignature = computed(() => {
  const ids: string[] = [];
  userItemData.entries.forEach((entry, id) => {
    if (entry.favorite) ids.push(id);
  });
  return ids.sort().join(',');
});

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
});
watch(apiBase, load);
// Re-fetch the Favorites rail when the favorited id set changes (a card toggle
// flips the store entry). Skip the initial fire — onMounted already loaded it.
watch(favoriteSignature, () => {
  void loadFavorites();
});

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
function onPlay(item: MediaItem): void {
  // A series isn't directly playable — its "Play" opens the detail page (the
  // season/episode tree) where an episode is chosen. Everything else plays.
  if (item.type === 'series' && router?.hasRoute('media')) {
    go('media', item.id);
    return;
  }
  go('player', item.id);
}
// The card's favorite/bookmark button ALREADY toggled the store optimistically
// (MediaCard.onFavorite → useUserItemDataStore.toggleFavorite, Step 17.3) and then
// re-emits `watchlist` for back-compat. This handler must therefore NOT toggle
// again (a second toggle would flip the favorite right back off). It only surfaces
// a state-aware toast reflecting the NEW persisted state read from the store, so
// favoriting persists across a reload (the single source of truth is the store +
// server, mutated once by the card).
function onWatchlist(item: MediaItem): void {
  if (userItemData.isFavorite(item.id)) {
    toasts.success(`Added "${item.name}" to your favorites`);
  } else {
    toasts.info(`Removed "${item.name}" from your favorites`);
  }
}
function onInfo(item: MediaItem): void {
  if (router?.hasRoute('media')) go('media', item.id);
  else toasts.info(`Details for "${item.name}" are coming soon`);
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
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
      @match="onMatch"
    />

    <!-- Favorites rail (Feature 17.5) — fed by api.listFavorites(); hidden when
         empty; re-fetched when a favorite is toggled (favoriteSignature watch). -->
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
    />

    <div v-if="showSpinner" class="browse-loading">
      <Spinner label="Loading libraries" />
    </div>

    <EmptyState
      v-if="libraries.error"
      icon="alert"
      title="Couldn't load your libraries"
      :description="libraries.error"
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
