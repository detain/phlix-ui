<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * HomeRow (R2.4) — a query-scoped, lazy-loading container around `MediaRow`.
 *
 * Each configured `config.homeRows` entry becomes one HomeRow. It defers its
 * fetch until the rail scrolls near the viewport (IntersectionObserver) so a
 * Browse page with many rows only pays for what the user actually reaches; under
 * SSR / jsdom / no-IO it loads immediately. It owns its own loading / error /
 * empty state via `MediaRow`, fetches its page through `ApiClient`, surfaces
 * failures as a toast, and emits the loaded items so the page can build a
 * resume-map "Continue Watching" rail without a second request.
 */
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import MediaRow from './MediaRow.vue';
import type { MediaItem } from '../types/media-item';
import type { HomeRow as HomeRowConfig } from '../app/types';
import { ApiClient } from '../api/client';
import { buildMediaUrl } from '../api/media-query';
import { useToastStore } from '../stores/useToastStore';

interface MediaResponse {
  items: MediaItem[];
  total: number;
}

const props = withDefaults(
  defineProps<{
    row: HomeRowConfig;
    apiBase: string;
    /** Items fetched for the rail. */
    limit?: number;
    /** Show the "See all" affordance. Off for query-only shelves that have no
     *  navigable target (e.g. a configured genre row) so the button isn't dead. */
    showSeeAll?: boolean;
    /** Admin opt-in (U5): render each card's "Match" action + forward `match`. */
    canMatch?: boolean;
    /**
     * U5 match-apply refresh: when an item is matched elsewhere on the page it is
     * pushed down here; if this rail currently shows that id it patches its own
     * `items` in place so the new poster/title render without a re-fetch.
     * No-ops for a rail that doesn't own the id.
     */
    appliedItem?: MediaItem | null;
  }>(),
  { limit: 18, showSeeAll: true, canMatch: false, appliedItem: null },
);

const emit = defineEmits<{
  (e: 'items-loaded', items: MediaItem[]): void;
  (e: 'play', item: MediaItem): void;
  (e: 'watchlist', item: MediaItem): void;
  (e: 'info', item: MediaItem): void;
  (e: 'match', item: MediaItem): void;
  (e: 'mark-watched', item: MediaItem): void;
  (e: 'refresh', item: MediaItem): void;
  (e: 'choose-poster', item: MediaItem): void;
  (e: 'remove', item: MediaItem): void;
  /** Admin ⋯-menu "Edit metadata" — host opens the metadata-match modal. */
  (e: 'edit-metadata', item: MediaItem): void;
  /** Admin ⋯-menu "Explore item data" — host opens the read-only inspector. */
  (e: 'explore-data', item: MediaItem): void;
  (e: 'see-all', row: HomeRowConfig): void;
}>();

const toasts = useToastStore();

const items = ref<MediaItem[]>([]);
const total = ref<number | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const loadedOnce = ref(false);

const rootEl = ref<HTMLElement | null>(null);
let io: IntersectionObserver | null = null;
let controller: AbortController | null = null;
let disposed = false;

function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

async function load(): Promise<void> {
  if (loading.value) return;
  loading.value = true;
  error.value = null;
  controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  try {
    const client = new ApiClient({ baseUrl: props.apiBase });
    const url = buildMediaUrl(props.apiBase, { ...props.row.query, limit: props.limit, offset: 0 });
    const res = await client.get<MediaResponse>(url, undefined, controller?.signal);
    if (disposed) return; // unmounted while in flight — don't touch state or emit
    items.value = res.items ?? [];
    total.value = typeof res.total === 'number' ? res.total : items.value.length;
    loadedOnce.value = true;
    emit('items-loaded', items.value);
  } catch (e) {
    if (disposed || isAbort(e)) return; // superseded / torn down — stay quiet
    error.value = e instanceof Error ? e.message : 'Failed to load';
    toasts.error(`Couldn't load "${props.row.title}"`);
  } finally {
    if (!disposed) loading.value = false;
  }
}

function startObserving(): void {
  // No IntersectionObserver (SSR / jsdom) → load eagerly so the row still works.
  if (typeof IntersectionObserver === 'undefined' || !rootEl.value) {
    void load();
    return;
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        io?.disconnect();
        io = null;
        void load();
      }
    },
    { rootMargin: '300px' },
  );
  io.observe(rootEl.value);
}

/**
 * Patch one already-rendered item in place (U5 match-apply refresh). If this
 * rail currently shows `item.id`, its entry is replaced with the new object so
 * the updated poster/title render without a re-fetch; otherwise it no-ops, so a
 * page can broadcast to every rail and only the owning one reacts.
 */
function updateItem(item: MediaItem): void {
  const idx = items.value.findIndex((i) => i.id === item.id);
  if (idx !== -1) items.value = items.value.map((i, n) => (n === idx ? item : i));
}

// Reconcile when the page broadcasts a freshly-applied item.
watch(
  () => props.appliedItem,
  (item) => {
    if (item) updateItem(item);
  },
);

onMounted(startObserving);
onBeforeUnmount(() => {
  disposed = true;
  controller?.abort();
  controller = null;
  io?.disconnect();
  io = null;
});
</script>

<template>
  <div ref="rootEl">
    <MediaRow
      :title="row.title"
      :items="items"
      :loading="loading || (!loadedOnce && !error)"
      :error="error"
      :count="total"
      :can-match="canMatch"
      hide-when-empty
      @retry="load"
      @play="emit('play', $event)"
      @watchlist="emit('watchlist', $event)"
      @info="emit('info', $event)"
      @match="emit('match', $event)"
      @mark-watched="emit('mark-watched', $event)"
      @refresh="emit('refresh', $event)"
      @choose-poster="emit('choose-poster', $event)"
      @remove="emit('remove', $event)"
      @edit-metadata="emit('edit-metadata', $event)"
      @explore-data="emit('explore-data', $event)"
    >
      <template v-if="showSeeAll" #action>
        <button type="button" class="home-row__seeall" @click="emit('see-all', row)">See all</button>
      </template>
    </MediaRow>
  </div>
</template>

<style scoped>
.home-row__seeall {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--accent-text);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
}
.home-row__seeall:hover {
  background: var(--accent-soft);
}
.home-row__seeall:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
</style>
