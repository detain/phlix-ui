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
import { ref, onMounted, onBeforeUnmount } from 'vue';
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
  }>(),
  { limit: 18 },
);

const emit = defineEmits<{
  (e: 'items-loaded', items: MediaItem[]): void;
  (e: 'play', item: MediaItem): void;
  (e: 'watchlist', item: MediaItem): void;
  (e: 'info', item: MediaItem): void;
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
      hide-when-empty
      @retry="load"
      @play="emit('play', $event)"
      @watchlist="emit('watchlist', $event)"
      @info="emit('info', $event)"
    >
      <template #action>
        <button type="button" class="home-row__seeall" @click="emit('see-all', row)">See all</button>
      </template>
    </MediaRow>
  </div>
</template>

<style scoped>
.home-row__seeall {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--accent);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
}
.home-row__seeall:hover {
  background: var(--accent-soft);
}
</style>
