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
import { onMounted, watch, inject, computed, reactive, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useLibrariesStore } from '../stores/useLibrariesStore';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import MediaRow from '../components/MediaRow.vue';
import HomeRow from '../components/HomeRow.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';
import type { MediaItem } from '../types/media-item';
import type { PhlixAppConfig, HomeRow as HomeRowConfig } from '../app/types';

defineSlots<{
  'toolbar-extra'?: never;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const homeRows = computed<HomeRowConfig[]>(() => config?.homeRows ?? []);

const libraries = useLibrariesStore();
const player = usePlayerStore();
const toasts = useToastStore();
const router = useRouter();

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

// --- library list load -------------------------------------------------------
function load(): void {
  void libraries.load(apiBase.value, true);
}
onMounted(() => {
  void libraries.load(apiBase.value);
});
watch(apiBase, load);

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
  go('player', item.id);
}
function onWatchlist(item: MediaItem): void {
  toasts.success(`Added "${item.name}" to your list`);
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
      hide-when-empty
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
    />

    <!-- App-configured, query-scoped shelves (genre/type rails); optional. "See
         all" only shows when the shelf is library-scoped (has a navigable target). -->
    <HomeRow
      v-for="row in homeRows"
      :key="row.id"
      :row="row"
      :api-base="apiBase"
      :show-see-all="!!row.query?.libraryId"
      @items-loaded="remember"
      @see-all="onSeeAll"
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
    />

    <!-- One section per library — the headline of the Browse surface. -->
    <HomeRow
      v-for="row in libraryRows"
      :key="row.id"
      :row="row"
      :api-base="apiBase"
      @items-loaded="remember"
      @see-all="onSeeAll"
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
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
  </div>
</template>

<style scoped>
.browse-page {
  padding: var(--space-6);
  max-width: 1320px;
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
