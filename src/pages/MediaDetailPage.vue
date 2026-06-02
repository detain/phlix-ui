<script setup lang="ts">
/**
 * MediaDetailPage (R2.5) — route container for `/app/media/:id`.
 *
 * Fetches the title by id (`GET /api/v1/media/:id`) plus a genre-scoped "More
 * like this" list, resolves the resume position from `usePlayerStore`, and wires
 * the detail actions (Play / Resume → player route, Watchlist → toast, similar
 * card → navigate). Deep-links work and re-fetch when the route id changes
 * (navigating between details). Loading → Skeleton; error → EmptyState + retry.
 */
import { ref, computed, inject, onMounted, watch, onBeforeUnmount, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MediaItem } from '../types/media-item';
import { ApiClient } from '../api/client';
import { buildMediaUrl } from '../api/media-query';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useToastStore } from '../stores/useToastStore';
import MediaDetail from '../components/MediaDetail.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';

interface MediaListResponse {
  items: MediaItem[];
  total: number;
}

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const route = useRoute();
const router = useRouter();
const player = usePlayerStore();
const toasts = useToastStore();

const item = ref<MediaItem | null>(null);
const similar = ref<MediaItem[]>([]);
const loading = ref(true);
const similarLoading = ref(false);
const error = ref<string | null>(null);

const currentId = computed(() => String(route.params.id ?? ''));
const resumeSeconds = computed(() => player.resumePositionFor(currentId.value));

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

async function load(): Promise<void> {
  const id = currentId.value;
  controller?.abort();
  controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  loading.value = true;
  error.value = null;
  similar.value = [];
  if (!id) {
    error.value = 'No media id provided';
    loading.value = false;
    return;
  }
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    const data = await client.get<MediaItem>(`/api/v1/media/${encodeURIComponent(id)}`, undefined, controller?.signal);
    if (disposed) return;
    item.value = data;
    loading.value = false;
    void loadSimilar(client, data);
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
  go('player', m.id);
}
function onWatchlist(m: MediaItem): void {
  toasts.success(`Added "${m.name}" to your list`);
}
function onInfo(m: MediaItem): void {
  go('media', m.id); // navigate to that title's detail (re-fetches via the id watch)
}
function onBack(): void {
  router?.back();
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

    <MediaDetail
      v-else-if="item"
      :item="item"
      :resume-seconds="resumeSeconds"
      :similar="similar"
      :similar-loading="similarLoading"
      @play="onPlay"
      @resume="onPlay"
      @watchlist="onWatchlist"
      @info="onInfo"
      @back="onBack"
    />
  </div>
</template>

<style scoped>
.media-detail-page {
  width: 100%;
}
.media-detail-page__loading {
  max-width: 1100px;
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
