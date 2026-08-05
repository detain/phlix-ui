<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

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
import { usePreferencesStore } from '../stores/usePreferencesStore';
import MediaGrid from '../components/MediaGrid.vue';
import MediaCard from '../components/MediaCard.vue';
import MediaListRow from '../components/MediaListRow.vue';
import MediaBackdropRow from '../components/MediaBackdropRow.vue';
import MediaTableRow from '../components/MediaTableRow.vue';
import {
  BACKDROP_ROW_HEIGHT,
  computeFixedRowHeight,
  LIST_ROW_HEIGHT,
  TABLE_COLUMNS,
  TABLE_ROW_HEIGHT,
  TABLE_ROW_TEMPLATE_COLUMNS,
} from '../components/virtual-grid';
import FilterBar from '../components/FilterBar.vue';
import IndexRail from '../components/IndexRail.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import PosterPicker from '../components/PosterPicker.vue';
import ItemDataInspector from '../components/ItemDataInspector.vue';
import { useItemInspector } from '../composables/useItemInspector';
import { ApiClient } from '../api/client';
import { resolvePlayable } from '../composables/useResolvePlayable';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import type { MediaItem } from '../types/media-item';
import { fetchIndexBuckets, type IndexBucket } from '../api/index-buckets';
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
// Persisted view mode (S67). The FilterBar owns the toggle; this page only
// reflects the chosen mode onto the single MediaGrid mount (see the template).
const prefs = usePreferencesStore();

/**
 * True while the persisted view mode selects the S68 list renderer / the S69
 * backdrop hero-strip renderer / the S70 table renderer. EVERY other value —
 * including an out-of-union/stale persisted one, which the preferences store
 * deliberately does not sanitize — falls through to the poster grid via the
 * `v-else` in the `#card` slot. That fallback is load-bearing, not decoration.
 *
 * Strict `===`, never `.includes()` (S191/S193): a substring test matches a MUTATED
 * mode value too, so a test that flips `'table'` to `'table-MUTATED'` would still
 * see the table renderer and report a false green.
 */
const listMode = computed(() => prefs.viewMode === 'list');
const backdropMode = computed(() => prefs.viewMode === 'backdrop');
const tableMode = computed(() => prefs.viewMode === 'table');

/**
 * Whether to assert the ARIA `table` structure this render (S70).
 *
 * Gated on there being rows, not merely on the mode, because ARIA `table` requires
 * `row`/`rowgroup` children: with nothing loaded `MediaGrid` renders its skeleton
 * grid or its empty state, both `role="status"`, and a `role="table"` owning a
 * status and no rows is invalid. It also stops a column header strip being drawn
 * over an empty state. The LAYOUT props below are deliberately NOT gated this way —
 * the skeletons must already be the table row's size or the first paint shifts.
 */
const tableSemantics = computed(() => tableMode.value && store.items.length > 0);

/** `aria-rowcount` for the table: every item plus the header row (`-1` = unknown). */
const tableRowCount = computed(() => (store.total > 0 ? store.total + 1 : -1));

/** Shared by the header row here and every `MediaTableRow` — see `TABLE_COLUMNS`. */
const tableHeaderStyle = { gridTemplateColumns: TABLE_ROW_TEMPLATE_COLUMNS };

/**
 * Row geometry handed to the SINGLE MediaGrid mount. Both alternate renderers are
 * one full-width row per item, each pinned to its OWN fixed height. Both numbers
 * MUST come through MediaGrid's props (never CSS) because the grid feeds the same
 * values to its inline `grid-template-columns` AND to the windowing math; and the
 * height must NOT be `computeRowHeight()`'s, which would apply the poster's 2:3
 * ratio to the full row width and reserve a row several times too tall.
 *
 * S70's table row is the third, added here the same way (`TABLE_ROW_HEIGHT` beside
 * `LIST_ROW_HEIGHT`/`BACKDROP_ROW_HEIGHT` in `virtual-grid.ts`, wrapped in
 * `computeFixedRowHeight`) plus one more arm in `gridRowHeight` below.
 */
const FULL_WIDTH_COLUMNS = 1;
const listModeRowHeight = computeFixedRowHeight(LIST_ROW_HEIGHT);
const backdropModeRowHeight = computeFixedRowHeight(BACKDROP_ROW_HEIGHT);
const tableModeRowHeight = computeFixedRowHeight(TABLE_ROW_HEIGHT);

/** `undefined` in poster-grid mode, so the grid keeps its measured auto-fit layout. */
const gridColumns = computed(() =>
  listMode.value || backdropMode.value || tableMode.value ? FULL_WIDTH_COLUMNS : undefined,
);
const gridRowHeight = computed(() =>
  listMode.value
    ? listModeRowHeight
    : backdropMode.value
      ? backdropModeRowHeight
      : tableMode.value
        ? tableModeRowHeight
        : undefined,
);

// A-Z jump rail (P6). Only applies to the default name-ascending sort; clicking
// a letter scrolls the pre-sized grid to that letter's first title.
const gridRef = ref<InstanceType<typeof MediaGrid> | null>(null);
const buckets = ref<IndexBucket[]>([]);
let bucketsAbort: AbortController | null = null;
const showRail = computed(() => buckets.value.some((b) => b.count > 0));

async function loadBuckets(): Promise<void> {
  bucketsAbort?.abort();
  const ctrl = new AbortController();
  bucketsAbort = ctrl;
  const qp = store.queryParams;
  const result = await fetchIndexBuckets(
    apiBase.value,
    {
      field: store.sort,
      order: qp.order,
      libraryId: qp.libraryId,
      query: qp.search,
      topLevel: qp.topLevel,
      yearMin: qp.yearFrom,
      yearMax: qp.yearTo,
      match: qp.match,
      genres: qp.genres,
      ratings: qp.ratings?.map((r) => Number(r)),
      actors: qp.actors,
      studios: qp.companies,
    },
    ctrl.signal,
  );
  if (!ctrl.signal.aborted) buckets.value = result.buckets;
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

// S15: "Explore item data" opens the read-only client-side inspector; "Edit
// metadata" routes to the same onMatch/MetadataMatchModal as "Match metadata".
const { inspectorItem, inspectorOpen, openInspector } = useItemInspector();

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

/** True for a music library — it defaults to (and offers) the artist sort. */
const isMusic = computed(() => libraries.byId(libraryId.value)?.type === 'music');

// Music libraries default to sorting by ARTIST (grouping tracks by artist). The
// libraries list can resolve AFTER the initial scope (deep link), so react to the
// type becoming known — but never override a sort the viewer has since changed.
// Non-music libraries never keep the (music-only) artist sort left over from a
// previously-viewed music library.
watch(
  [libraryId, isMusic],
  () => {
    if (isMusic.value && store.sort === 'name') {
      store.setSort('artist');
      store.reset();
      void store.fetchMedia(apiBase.value);
    } else if (!isMusic.value && store.sort === 'artist') {
      store.setSort('name');
      store.reset();
      void store.fetchMedia(apiBase.value);
    }
  },
  { immediate: true },
);

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
  void loadBuckets();
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
  void loadBuckets();
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
watch(() => store.sort, () => { void loadBuckets(); });

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

      <FilterBar :show-artist-sort="isMusic" @change="onFilterChange" />

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

      <!--
        ONE MediaGrid mount, whatever the view mode (S67/S68). `data-view-mode`
        reflects the persisted preference onto the grid root as a hook for
        NON-LAYOUT concerns only (e2e/unit selectors, per-mode colour/spacing
        inside a card).

        The alternate renderers live INSIDE this mount, in the `#card` slot below,
        which keeps the existing pagination / virtualization / `need-range`
        machinery untouched. Never add a second MediaGrid (or a parallel paging
        path) per mode.

        Per-mode LAYOUT goes through the `columns` / `row-height` props — never
        through CSS. Once MediaGrid is virtualized it writes an INLINE
        `grid-template-columns: repeat(<columns>, minmax(0, 1fr))` from the SAME
        `columns` value it feeds the windowing math (`startIndex`/`endIndex`/
        `padTop`/`totalHeight`), so a rule like
        `[data-view-mode="list"] .media-grid { grid-template-columns: 1fr }` would
        need `!important` to beat the inline style and would then desync the
        rendered layout from that math: blank bands, mis-positioned rows and wrong
        `need-range` pages while scrolling a long library. Likewise the row height:
        `computeRowHeight()` applies `POSTER_RATIO` to the card width, so a
        list/backdrop/table row must pin its own height via `row-height`
        (`computeFixedRowHeight`) instead of being measured as a 2:3 poster.
        Passing `row-height` also makes MediaGrid ENFORCE it — the row tracks get
        `grid-auto-rows: <row-height − ROW_GAP>` — so a renderer only has to clip
        its own content (`overflow: hidden`); it cannot silently grow taller than
        the row the windowing math reserved.

        S70 seam: add a `v-else-if` branch for 'table' in the `#card` slot (S68's
        'list' and S69's 'backdrop' are already there), wiring the SAME ten host
        events (MediaGrid only wires its own default card — filling `#card` moves
        that responsibility here, so a missing listener is a dead button), plus its
        own `columns`/`row-height` via the `gridColumns`/`gridRowHeight` computeds
        above. Both existing alternate renderers COMPOSE `MediaCard` for their
        poster column rather than re-implementing its ⋯ action menu — that ~90-line
        dispatcher already exists verbatim in `MediaCard` AND `MediaDetail`, so a
        renderer that copies it a third time is a defect, not a shortcut.
        The final `v-else` grid branch must stay UNCONDITIONAL: a
        stale/garbage persisted `viewMode` is tolerated rather than sanitized (see
        the `viewMode` docblock in usePreferencesStore.ts) and it is the only thing
        THIS PAGE renders for an out-of-union value.

        Subtlety worth knowing before you "simplify" that `v-else` into another
        `v-else-if` (S68 found this the hard way): a chain where every branch is
        false makes the slot yield only a comment vnode, which Vue's `renderSlot`
        treats as EMPTY — it then silently renders MediaGrid's own default card
        instead. So the bug hides in plain sight (items still appear, and still
        work, because the grid-level listeners above are also still bound) right up
        until someone prunes those listeners as "dead". Keep the `v-else`; the
        LibraryPage test that invokes the slot directly is what enforces it.

        ✅ S70's table semantics, and the shape they had to take. The `#card` seam
        cannot emit `<table>/<thead>/<tr>`: the slot yields ONE DETACHED CELL per
        item inside MediaGrid's `display: grid` container, and only a virtualized
        WINDOW of those cells exists at a time, so nothing can open a `<tbody>`
        before the first row and close it after the last. The semantics are
        therefore roles on divs — and MediaGrid's DOM chain
        (`.media-grid-root` > `.media-grid-sizer` > `.media-grid` > the slot cell)
        put two `generic` boxes between a `role="table"` wrapper here and its
        `role="row"` cells, which breaks the ownership ARIA `table` requires. That
        is what MediaGrid's new `grid-role` prop fixes: it marks those two boxes
        `role="presentation"` (flattening them out of the a11y tree) and puts
        `role="rowgroup"` on `.media-grid`, so the wrapper below owns a real
        rowgroup of real rows. `aria-owns` was NOT used — the cell set remounts on
        every scroll tick, so an id list would need rewriting continuously.
        The header row is consequently rendered OUTSIDE MediaGrid (a virtualized,
        `translateY`-offset container would scroll it away and consume a row slot),
        which is exactly why its `grid-template-columns` and every row's come from
        the ONE `TABLE_ROW_TEMPLATE_COLUMNS` constant: they are two separate CSS
        grids and nothing else keeps their columns aligned.

        ⚠ Known, bounded ARIA wart, recorded rather than papered over. MediaGrid's
        `loadingMore` indicator (`role="status"`) and its back-to-top `<button>` live
        inside `.media-grid-root`, so while either is on screen it re-parents onto
        the `role="table"` below and a validator will flag a non-`row`/`rowgroup`
        child. Both are transient; the steady state is exactly two rowgroups. The
        PERMANENT case — no items, where MediaGrid renders a `role="status"`
        skeleton/empty state and there are no rows at all — is avoided by gating the
        wrapper's role on `tableSemantics` (see its docblock). Fixing the transient
        case properly means MediaGrid rendering its own `role="table"` box around
        just the sizer, with a header slot; that is a bigger change to a public
        component than S70 needs.

        Note on what `MediaBackdropRow` actually paints: it has a wide-backdrop state
        and a poster-derived fallback, and BOTH are live traffic. This surface's
        payload carries `backdrop_url` (a `/w780` URL) + `backdrop_srcset` (`w780` +
        `w1280`) as of the companion server step S101, but both are null for the seven
        backdrop-less types and for unmatched titles, and absent altogether against an
        older server. Both states are pinned by `LibraryPage.test.ts` in both
        directions; don't "fix" the renderer by deleting a branch.
      -->
      <div
        class="library-table"
        :role="tableSemantics ? 'table' : undefined"
        :aria-label="tableSemantics ? `${libraryName} titles` : undefined"
        :aria-rowcount="tableSemantics ? tableRowCount : undefined"
      >
        <!-- Header row: OUTSIDE the grid (see the note above), aligned to the body
             rows only by the shared TABLE_ROW_TEMPLATE_COLUMNS. The poster column's
             header is visually hidden rather than empty — a nameless
             `role="columnheader"` announces nothing. -->
        <div v-if="tableSemantics" class="library-table__head" role="rowgroup">
          <div class="library-table__head-row" role="row" aria-rowindex="1" :style="tableHeaderStyle">
            <span
              v-for="(col, i) in TABLE_COLUMNS"
              :key="col.label"
              class="library-table__head-cell"
              :class="{ 'library-table__head-cell--hidden': i === 0 }"
              role="columnheader"
              >{{ col.label }}</span
            >
          </div>
        </div>

        <MediaGrid
          ref="gridRef"
          :data-view-mode="prefs.viewMode"
          :grid-role="tableSemantics ? 'rowgroup' : undefined"
          :items="store.items"
          :total="store.total"
          :loading="store.loading && store.items.length === 0"
          :loading-more="store.loading && store.items.length > 0"
          :has-more="store.hasMore"
          :can-match="auth.isAdmin"
          :columns="gridColumns"
          :row-height="gridRowHeight"
          @need-range="onNeedRange"
          @play="onPlay"
          @watchlist="onWatchlist"
          @info="onInfo"
          @match="onMatch"
          @mark-watched="onMarkWatched"
          @refresh="onRefresh"
          @edit-metadata="onMatch"
          @explore-data="openInspector"
          @choose-poster="onChoosePoster"
          @remove="onRemove"
        >
          <!-- EVERY branch wires the identical ten host events. The listeners on
               MediaGrid above stay in place for its own default-card path (the grid
               is also used without a `#card` slot elsewhere), but real user clicks
               now travel through these. `index` is the item's ABSOLUTE index — the
               table row needs it for `aria-rowindex`, since a virtualized rowgroup
               holds only a window and AT would otherwise count "row 3 of 7". -->
          <template #card="{ item, index }">
            <MediaListRow
              v-if="listMode"
              :item="item"
              :can-match="auth.isAdmin"
              @play="onPlay"
              @watchlist="onWatchlist"
              @info="onInfo"
              @match="onMatch"
              @mark-watched="onMarkWatched"
              @refresh="onRefresh"
              @choose-poster="onChoosePoster"
              @remove="onRemove"
              @edit-metadata="onMatch"
              @explore-data="openInspector"
            />
            <MediaBackdropRow
              v-else-if="backdropMode"
              :item="item"
              :can-match="auth.isAdmin"
              @play="onPlay"
              @watchlist="onWatchlist"
              @info="onInfo"
              @match="onMatch"
              @mark-watched="onMarkWatched"
              @refresh="onRefresh"
              @choose-poster="onChoosePoster"
              @remove="onRemove"
              @edit-metadata="onMatch"
              @explore-data="openInspector"
            />
            <MediaTableRow
              v-else-if="tableMode"
              :item="item"
              :index="index"
              :can-match="auth.isAdmin"
              @play="onPlay"
              @watchlist="onWatchlist"
              @info="onInfo"
              @match="onMatch"
              @mark-watched="onMarkWatched"
              @refresh="onRefresh"
              @choose-poster="onChoosePoster"
              @remove="onRemove"
              @edit-metadata="onMatch"
              @explore-data="openInspector"
            />
            <!-- UNCONDITIONAL fallback — see the note above; never make this a
                 `v-else-if`. `lazy=false` mirrors MediaGrid's own default card (S35:
                 JS windowing already keeps the DOM near-viewport, and native
                 lazy-load over transform-repositioned cards stalls). -->
            <MediaCard
              v-else
              :item="item"
              :can-match="auth.isAdmin"
              :lazy="false"
              @play="onPlay"
              @watchlist="onWatchlist"
              @info="onInfo"
              @match="onMatch"
              @mark-watched="onMarkWatched"
              @refresh="onRefresh"
              @choose-poster="onChoosePoster"
              @remove="onRemove"
              @edit-metadata="onMatch"
              @explore-data="openInspector"
            />
          </template>
        </MediaGrid>
      </div>

      <IndexRail v-if="showRail" :buckets="buckets" @jump="onJump" />
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

    <ItemDataInspector v-if="auth.isAdmin" v-model="inspectorOpen" :item="inspectorItem" />
  </div>
</template>

<style scoped>
.library-page {
  /* No own outer padding — `.shell__main` (AppLayout) already supplies the page
     gutter (var(--space-6) block / var(--space-5) inline). Adding padding here
     double-counted it, pushing the title down and content away from the edges
     (updates.md #8/#9). Rely on the shell's single gutter instead. */
  padding: 0;
  max-width: none;
  margin: 0 auto;
}
.library-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  /* Tightened from --space-4 → --space-3 so the FilterBar sits closer to the
     title (updates.md #8). */
  margin-bottom: var(--space-3);
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

/* --- S70 table view: the header row, rendered OUTSIDE MediaGrid --- */
.library-table__head-row {
  display: grid;
  /* grid-template-columns comes from the inline style (TABLE_ROW_TEMPLATE_COLUMNS)
     so it is literally the same string every MediaTableRow writes — the header and
     the body are two separate grids and nothing else keeps them aligned. */
  align-items: center;
  /* Same column gap as `.media-table-row`, or the tracks line up and the CONTENT
     inside them does not. */
  column-gap: var(--space-5);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-strong);
  font-size: var(--text-2xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide, 0.06em);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.library-table__head-cell {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* The poster column's header is NAMED but not shown: an empty `columnheader`
   announces nothing, and a visible "Poster" label over a thumbnail is noise.
   Clipped rather than `display:none`/`visibility:hidden`, both of which would also
   remove it from the accessibility tree — and it must keep occupying its grid track
   or every following column shifts against the body rows. */
.library-table__head-cell--hidden {
  clip-path: inset(50%);
  color: transparent;
}
</style>
