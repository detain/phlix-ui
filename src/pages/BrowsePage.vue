<script setup lang="ts">
/**
 * BrowsePage (R2.4) — the Browse surface shell: a resume-map "Continue Watching"
 * rail, the app's configured query-scoped home rows, then the filtered,
 * virtualized library grid (ports `src/dev/mockups/browse-grid.html`).
 *
 * Home rows come from `config.homeRows` and lazy-load on scroll (`HomeRow`).
 * Continue Watching is derived from `usePlayerStore.resumeMap` resolved against a
 * small in-page registry fed by the grid + home-row fetches — no extra API. Card
 * actions route to the player (and the detail view once R2.5 adds it); fetch
 * failures surface as toasts while the grid keeps its inline retry.
 */
import { onMounted, watch, inject, computed, reactive, ref, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useMediaStore } from '../stores/useMediaStore';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import MediaGrid from '../components/MediaGrid.vue';
import MediaRow from '../components/MediaRow.vue';
import HomeRow from '../components/HomeRow.vue';
import FilterBar from '../components/FilterBar.vue';
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

const store = useMediaStore();
const player = usePlayerStore();
const toasts = useToastStore();
const router = useRouter();

const gridSection = ref<HTMLElement | null>(null);

// --- continue-watching registry (resume ids resolved against loaded items) ---
const registry = reactive(new Map<string, MediaItem>());
function remember(list: MediaItem[]): void {
  list.forEach((i) => registry.set(i.id, i));
}
watch(() => store.items, (items) => remember(items), { immediate: true });

const continueItems = computed<MediaItem[]>(() => {
  const map = player.resumeMap;
  return Object.keys(map)
    .map((id) => registry.get(id))
    .filter((x): x is MediaItem => !!x)
    .sort((a, b) => (map[b.id] ?? 0) - (map[a.id] ?? 0))
    .slice(0, 12);
});

// --- grid load ---------------------------------------------------------------
function load(): void {
  store.reset();
  store.fetchMedia(apiBase.value);
}
onMounted(load);
watch(apiBase, load);

function onFilterChange(): void {
  store.reset();
  store.fetchMedia(apiBase.value);
}
function onLoadMore(): void {
  store.loadMore(apiBase.value);
}

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
  // Detail route arrives in R2.5; until then surface a notice rather than
  // silently starting playback (the poster click already opens the player).
  if (router?.hasRoute('media')) go('media', item.id);
  else toasts.info(`Details for "${item.name}" are coming soon`);
}

// --- see-all (apply a home row's query to the grid) --------------------------
function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
function onSeeAll(row: HomeRowConfig): void {
  store.applyQuery((row.query ?? {}) as Record<string, string | string[]>);
  load();
  gridSection.value?.scrollIntoView?.({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
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

    <HomeRow
      v-for="row in homeRows"
      :key="row.id"
      :row="row"
      :api-base="apiBase"
      @items-loaded="remember"
      @see-all="onSeeAll"
      @play="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
    />

    <section ref="gridSection" class="browse-library">
      <div class="browse-header">
        <h1 class="browse-title">Browse</h1>
        <span class="browse-count numeric">{{ store.total.toLocaleString() }} titles</span>
      </div>

      <FilterBar @change="onFilterChange" />

      <div v-if="store.error" class="browse-error" role="alert">
        <p>{{ store.error }}</p>
        <button type="button" class="browse-retry" @click="load">Retry</button>
      </div>

      <MediaGrid
        :items="store.items"
        :loading="store.loading && store.items.length === 0"
        :loading-more="store.loading && store.items.length > 0"
        :has-more="store.hasMore"
        @load-more="onLoadMore"
        @play="onPlay"
        @watchlist="onWatchlist"
        @info="onInfo"
      />
    </section>
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

.browse-library {
  margin-top: var(--space-8);
}

.browse-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.browse-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.browse-count {
  font-size: var(--text-sm);
  color: var(--text-subtle);
}

.browse-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-10);
  color: var(--danger, var(--text-muted));
  text-align: center;
}
.browse-retry {
  padding: var(--space-2) var(--space-4);
  background: var(--accent);
  color: var(--accent-contrast);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}
</style>
