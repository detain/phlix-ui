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
import { onMounted, onBeforeUnmount, watch, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { useMediaStore } from '../stores/useMediaStore';
import { useLibrariesStore } from '../stores/useLibrariesStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import MediaGrid from '../components/MediaGrid.vue';
import FilterBar from '../components/FilterBar.vue';
import LetterRail from '../components/LetterRail.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import PosterPicker from '../components/PosterPicker.vue';
import { ApiClient } from '../api/client';
import { resolvePlayable } from '../composables/useResolvePlayable';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import type { MediaItem } from '../types/media-item';
import { fetchLetterIndex, type LetterBucket } from '../api/letter-index';
import { usePageTitle } from '../composables/usePageTitle';

// On the hub this is the relay-proxy base for the selected server (so the grid
// browses that paired server inline); on the media server it is the app's own base.
const apiBase = useMediaApiBase();

const route = useRoute();
const router = useRouter();
const store = useMediaStore();
const libraries = useLibrariesStore();
const auth = useAuthStore();
const player = usePlayerStore();
const toasts = useToastStore();
const userItemData = useUserItemDataStore();

// A-Z jump rail (P6). Only applies to the default name-ascending sort; clicking
// a letter scrolls the pre-sized grid to that letter's first title.
const gridRef = ref<InstanceType<typeof MediaGrid> | null>(null);
const letters = ref<LetterBucket[]>([]);
let lettersAbort: AbortController | null = null;
const showRail = computed(() => letters.value.some((b) => b.count > 0));

async function loadLetters(): Promise<void> {
  lettersAbort?.abort();
  if (store.sort !== 'name' || store.order !== 'asc') {
    letters.value = [];
    return;
  }
  const ctrl = new AbortController();
  lettersAbort = ctrl;
  const result = await fetchLetterIndex(apiBase.value, store.queryParams, ctrl.signal);
  if (!ctrl.signal.aborted) letters.value = result;
}

function onJump(offset: number): void {
  gridRef.value?.scrollToIndex(offset);
}

// Interactive metadata match (U5) — admin-only. The card "Match" action opens a
// modal for that item; a successful apply reloads the scope so the refreshed
// poster/metadata shows in the grid.
const matchTarget = ref<MediaItem | null>(null);
const matchOpen = ref(false);

// Poster picker state — opened from the "Choose poster…" card action.
const posterPickerOpen = ref(false);
const posterPickerTarget = ref<MediaItem | null>(null);

function onMatch(item: MediaItem): void {
  matchTarget.value = item;
  matchOpen.value = true;
}
function onMatchApplied(): void {
  reload();
}

function onPosterApplied(updated: MediaItem): void {
  store.items = store.items.map((i) => (i.id === updated.id ? updated : i));
  toasts.success(`Updated poster for "${updated.name}"`);
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
  void loadLetters();
}

/** Seed the FilterBar from deep-link query params — e.g. an actor link from a
 *  detail page (`?actors=Name`) or a bookmarked `?match=unmatched` — so the grid
 *  lands already filtered. Runs after `clearFilters()` so it isn't wiped. */
function applyIncomingFilters(): void {
  const a = route.query.actors;
  const actors = Array.isArray(a) ? a.filter((x): x is string => !!x) : a ? [a] : [];
  if (actors.length) store.setActors(actors);
  const g = route.query.genres;
  const genres = Array.isArray(g) ? g.filter((x): x is string => !!x) : g ? [g] : [];
  if (genres.length) store.setGenres(genres);
  const c = route.query.companies;
  const companies = Array.isArray(c) ? c.filter((x): x is string => !!x) : c ? [c] : [];
  if (companies.length) store.setCompanies(companies);
  const m = Array.isArray(route.query.match) ? route.query.match[0] : route.query.match;
  if (m === 'matched' || m === 'unmatched') store.setMatchStatus(m);
}

/** Reload the current scope + filters (api base resolved/changed, or Retry). */
function reload(): void {
  store.reset();
  store.fetchMedia(apiBase.value);
  void loadLetters();
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
/** The grid asks for the pages covering its visible window — drives both
 *  scrolling and the A-Z jump (random access), so a jumped-to letter's skeleton
 *  slots fill with the right titles instead of staying blank. */
function onNeedRange(startIndex: number, endIndex: number): void {
  store.ensureRange(apiBase.value, startIndex, endIndex);
}

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
function onWatchlist(): void {
  /* watchlist toast lives on Browse; the grid here just plays/infos */
}
function onInfo(item: MediaItem): void {
  if (router?.hasRoute('media')) go('media', item.id);
}

function onMarkWatched(item: MediaItem): void {
  void userItemData.toggleFavorite(item.id, apiBase.value);
  if (userItemData.isFavorite(item.id)) {
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
    store.items = store.items.filter((i) => i.id !== item.id);
    toasts.success(`Removed "${item.name}"`);
  } catch (e) {
    if (stale() || isAbort(e)) return;
    toasts.error(`Failed to remove "${item.name}": ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
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
        ref="gridRef"
        :items="store.items"
        :total="store.total"
        :loading="store.loading && store.items.length === 0"
        :loading-more="store.loading && store.items.length > 0"
        :has-more="store.hasMore"
        :can-match="auth.isAdmin"
        @need-range="onNeedRange"
        @play="onPlay"
        @watchlist="onWatchlist"
        @info="onInfo"
        @match="onMatch"
        @mark-watched="onMarkWatched"
        @refresh="onRefresh"
        @choose-poster="onChoosePoster"
        @remove="onRemove"
      />

      <LetterRail v-if="showRail" :letters="letters" @jump="onJump" />
    </section>

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
