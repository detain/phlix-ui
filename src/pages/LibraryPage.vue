<script setup lang="ts">
/**
 * LibraryPage (`/app/library/:id`) — the dedicated, full, filterable grid for a
 * SINGLE library, opened from a Browse rail's "See all" or a library nav link.
 * It is the per-library counterpart to the Browse home: where Browse shows one
 * short rail per library, this shows the whole library with the FilterBar.
 *
 * It scopes the shared `useMediaStore` to the route's `:id` (`setLibraryId`)
 * before loading, re-scopes when navigating between libraries, and clears the
 * scope on teardown so a later unscoped consumer of the store isn't left pinned
 * to this library. The title comes from `useLibrariesStore` (loading the list if
 * a deep link landed here first).
 */
import { onMounted, onBeforeUnmount, watch, inject, computed, ref, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaStore } from '../stores/useMediaStore';
import { useLibrariesStore } from '../stores/useLibrariesStore';
import { useAuthStore } from '../stores/useAuthStore';
import MediaGrid from '../components/MediaGrid.vue';
import FilterBar from '../components/FilterBar.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import type { MediaItem } from '../types/media-item';
import { usePageTitle } from '../composables/usePageTitle';

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);

const route = useRoute();
const router = useRouter();
const store = useMediaStore();
const libraries = useLibrariesStore();
const auth = useAuthStore();

// Interactive metadata match (U5) — admin-only. The card "Match" action opens a
// modal for that item; a successful apply reloads the scope so the refreshed
// poster/metadata shows in the grid.
const matchTarget = ref<MediaItem | null>(null);
const matchOpen = ref(false);
function onMatch(item: MediaItem): void {
  matchTarget.value = item;
  matchOpen.value = true;
}
function onMatchApplied(): void {
  reload();
}

const libraryId = computed(() => {
  const id = route.params.id;
  return Array.isArray(id) ? id[0] : (id ?? '');
});
const libraryName = computed(() => libraries.byId(libraryId.value)?.name ?? 'Library');

// Title = the real library name once the libraries list resolves (a deep link may
// land before it loads). The `?? undefined` keeps the title at the route default
// rather than the generic "Library" placeholder until the name is known.
usePageTitle(() => libraries.byId(libraryId.value)?.name);

/** Enter (or switch to) a library: start from a clean filter slate, scope the
 *  shared store, and load page 0. Clearing filters here is what stops one
 *  library's FilterBar selections from bleeding into the next. */
function scope(): void {
  if (!libraryId.value) return; // guarded in the template (no id → EmptyState)
  store.clearFilters();
  store.setLibraryId(libraryId.value);
  // Show top-level items only — a series library lists shows (not a flat dump of
  // every season/episode); movie/music/etc. libraries are unaffected since their
  // items are already top-level. The server lifts this while a search is active,
  // so searching still finds episodes. Series cards drill into their detail tree.
  store.setTopLevel(true);
  applyIncomingFilters();
  store.reset();
  store.fetchMedia(apiBase.value);
}

/** Seed the FilterBar from deep-link query params — e.g. an actor link from a
 *  detail page (`?actors=Name`) or a bookmarked `?match=unmatched` — so the grid
 *  lands already filtered. Runs after `clearFilters()` so it isn't wiped. */
function applyIncomingFilters(): void {
  const a = route.query.actors;
  const actors = Array.isArray(a) ? a.filter((x): x is string => !!x) : a ? [a] : [];
  if (actors.length) store.setActors(actors);
  const m = Array.isArray(route.query.match) ? route.query.match[0] : route.query.match;
  if (m === 'matched' || m === 'unmatched') store.setMatchStatus(m);
}

/** Reload the current scope + filters (api base resolved/changed, or Retry). */
function reload(): void {
  store.reset();
  store.fetchMedia(apiBase.value);
}

onMounted(() => {
  // Ensure the list is available so the header can name the library (a deep link
  // may land here before Browse has populated the store).
  void libraries.load(apiBase.value);
  scope();
});

// Switching between libraries without leaving the page re-scopes from a clean
// slate; an api-base change just reloads the current scope.
watch(libraryId, scope);
watch(apiBase, reload);

onBeforeUnmount(() => {
  // Drop the scope, the top-level restriction, and the filter state so the next
  // (possibly unscoped) consumer of the shared singleton store starts clean.
  store.setLibraryId(undefined);
  store.setTopLevel(false);
  store.clearFilters();
  store.reset();
});

function onFilterChange(): void {
  reload();
}
function onLoadMore(): void {
  store.loadMore(apiBase.value);
}

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
function onWatchlist(): void {
  /* watchlist toast lives on Browse; the grid here just plays/infos */
}
function onInfo(item: MediaItem): void {
  if (router?.hasRoute('media')) go('media', item.id);
}
</script>

<template>
  <div class="library-page">
    <EmptyState
      v-if="!libraryId"
      icon="alert"
      title="Library not found"
      description="No library was specified."
    />

    <section v-else class="library">
      <div class="library-header">
        <h1 class="library-title">{{ libraryName }}</h1>
        <span class="library-count numeric">{{ store.total.toLocaleString() }} titles</span>
      </div>

      <FilterBar @change="onFilterChange" />

      <EmptyState
        v-if="store.error"
        icon="alert"
        title="Couldn't load titles"
        :description="store.error"
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="rewind" @click="reload">Retry</Button>
        </template>
      </EmptyState>

      <MediaGrid
        :items="store.items"
        :loading="store.loading && store.items.length === 0"
        :loading-more="store.loading && store.items.length > 0"
        :has-more="store.hasMore"
        :can-match="auth.isAdmin"
        @load-more="onLoadMore"
        @play="onPlay"
        @watchlist="onWatchlist"
        @info="onInfo"
        @match="onMatch"
      />
    </section>

    <MetadataMatchModal
      v-if="auth.isAdmin"
      v-model="matchOpen"
      :item="matchTarget"
      @applied="onMatchApplied"
    />
  </div>
</template>

<style scoped>
.library-page {
  padding: var(--space-6);
  max-width: none;
  margin: 0 auto;
}
.library-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.library-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.library-count {
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
</style>
