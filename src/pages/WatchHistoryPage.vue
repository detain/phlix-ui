<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * WatchHistoryPage — shows the user's watch history grouped by date.
 * Route: /app/history
 * Fetches from GET /api/v1/me/history if available, otherwise falls back to
 * GET /api/v1/me/progress and shows items with progress > 0.
 */
import { onMounted, computed, ref, type PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import type { ApiClient as ApiClientType } from '../api/client';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';
import Icon from '../components/Icon.vue';
import { useToastStore } from '../stores/useToastStore';
import { resolvePlayable } from '../composables/useResolvePlayable';
import { usePlayerStore } from '../stores/usePlayerStore';
import type { MediaItem } from '../types/media-item';

const props = defineProps({
  /**
   * Optional API client for testing. When provided, this client is used instead of
   * creating a new ApiClient instance. Follows the pattern used by other pages.
   */
  client: {
    type: Object as PropType<ApiClientType>,
    default: null,
  },
});

const router = useRouter();
const injectedClient = useMediaApiBase();
const toasts = useToastStore();
const player = usePlayerStore();

/** Returns the provided client prop or creates a new ApiClient from the injected apiBase. */
function getClient(): ApiClient {
  if (props.client) return props.client;
  return new ApiClient({ baseUrl: injectedClient.value });
}

interface HistoryItem {
  id: string;
  media: MediaItem;
  progress: number; // 0.0 - 1.0
  updated_at: string; // ISO 8601
}

interface GroupedHistory {
  date: string; // YYYY-MM-DD formatted for display
  items: HistoryItem[];
}

const allItems = ref<HistoryItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

/** Group history items by date string (YYYY-MM-DD). */
const groupedHistory = computed<GroupedHistory[]>(() => {
  const map = new Map<string, HistoryItem[]>();
  for (const item of allItems.value) {
    const d = new Date(item.updated_at);
    const dateStr = d.toISOString().split('T')[0];
    if (!map.has(dateStr)) map.set(dateStr, []);
    map.get(dateStr)!.push(item);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a)) // newest first
    .map(([date, items]) => ({ date, items }));
});

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateStr === today.toISOString().split('T')[0]) return 'Today';
  if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday';

  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

async function load(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const client = getClient();

    // Try the dedicated history endpoint first
    try {
      const data = await client.get<{ items: HistoryItem[] }>('/api/v1/me/history');
      allItems.value = data.items ?? [];
      return;
    } catch {
      // Fall back to progress endpoint
    }

    // Fallback: GET /api/v1/me/progress, filter to progress > 0
    const progressData = await client.get<{ items: Array<{ id: string; progress: number; updated_at: string; media: MediaItem }> }>(
      '/api/v1/me/progress',
    );
    allItems.value = (progressData.items ?? [])
      .filter((item) => item.progress > 0)
      .map((item) => ({
        id: item.id,
        media: item.media,
        progress: item.progress,
        updated_at: item.updated_at,
      }));
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load watch history';
  } finally {
    loading.value = false;
  }
}

// --- card actions ------------------------------------------------------------
function go(name: string, id: string): void {
  router?.push({ name, params: { id } }).catch(() => {});
}

function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

async function onPlay(item: MediaItem): Promise<void> {
  try {
    const client = getClient();
    const resolved = await resolvePlayable(
      client,
      injectedClient.value,
      item,
      player.resumeMap,
    );
    if (!resolved) {
      toasts.info('Nothing to play yet');
      return;
    }
    go('player', resolved.id);
  } catch (e) {
    if (isAbort(e)) return;
    toasts.info('Nothing to play yet');
  }
}

function onInfo(item: MediaItem): void {
  if (router?.hasRoute('media')) go('media', item.id);
  else toasts.info(`Details for "${item.name}" are coming soon`);
}

function retry(): void {
  void load();
}

onMounted(() => {
  void load();
});
</script>

<template>
  <div class="history-page">
    <div class="history-header">
      <h1 class="history-title">Watch History</h1>
    </div>

    <Spinner v-if="loading && allItems.length === 0" label="Loading watch history" />

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load watch history"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="retry">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="!loading && allItems.length === 0"
      icon="film"
      title="No watch history yet"
      description="Titles you watch will appear here so you can easily pick up where you left off."
    />

    <div v-else class="history-groups">
      <section
        v-for="group in groupedHistory"
        :key="group.date"
        class="history-group"
      >
        <h2 class="history-group__date">{{ formatDate(group.date) }}</h2>
        <div class="history-group__items">
          <article
            v-for="historyItem in group.items"
            :key="historyItem.id"
            class="history-item"
          >
            <a
              :href="`/app/media/${historyItem.media.id}`"
              class="history-item__poster"
              :aria-label="historyItem.media.name"
            >
              <img
                v-if="historyItem.media.poster_url"
                :src="historyItem.media.poster_url"
                :alt="historyItem.media.name"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="history-item__fallback">
                <Icon :name="historyItem.media.type === 'series' ? 'tv' : 'film'" />
              </div>
              <!-- Progress bar -->
              <div
                v-if="historyItem.progress > 0"
                class="history-item__progress"
                role="progressbar"
                :aria-valuenow="Math.round(historyItem.progress * 100)"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <i :style="{ width: `${historyItem.progress * 100}%` }" />
              </div>
            </a>
            <div class="history-item__info">
              <h3 class="history-item__title">{{ historyItem.media.name }}</h3>
              <p class="history-item__meta numeric">
                <template v-if="historyItem.media.year">{{ historyItem.media.year }}</template>
                <template v-if="historyItem.media.year && historyItem.media.runtime"> · </template>
                <template v-if="historyItem.media.runtime">{{ historyItem.media.runtime }}m</template>
              </p>
              <div class="history-item__actions">
                <button
                  type="button"
                  class="history-item__btn"
                  :aria-label="`Play ${historyItem.media.name}`"
                  @click.prevent="onPlay(historyItem.media)"
                >
                  <Icon name="play" />
                </button>
                <button
                  type="button"
                  class="history-item__btn"
                  :aria-label="`Info for ${historyItem.media.name}`"
                  @click.prevent="onInfo(historyItem.media)"
                >
                  <Icon name="info" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.history-page {
  padding: var(--space-6);
  max-width: none;
  margin: 0 auto;
}

.history-header {
  margin-bottom: var(--space-6);
}

.history-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
  color: var(--text);
}

.history-groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.history-group__date {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-subtle);
}

.history-group__items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-5) var(--space-4);
}

.history-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.history-item__poster {
  position: relative;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface-2);
  display: block;
  text-decoration: none;
}

.history-item__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-item__fallback {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--text-subtle);
  font-size: 2rem;
}

.history-item__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.22);
}

.history-item__progress > i {
  display: block;
  height: 100%;
  background: var(--accent);
  border-radius: inherit;
}

.history-item__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 var(--space-1);
}

.history-item__title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: var(--tracking-snug);
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-item__meta {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.history-item__actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.history-item__btn {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--surface-2);
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

.history-item__btn:hover {
  background: var(--accent);
  color: var(--accent-contrast);
}
</style>
