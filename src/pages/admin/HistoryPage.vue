<script setup lang="ts">
/**
 * Admin HistoryPage (RA.13) — the user-facing "Watch History" view, ported 1:1
 * from the deleted React `HistoryPage` onto the `@phlix/ui` primitives. Lists
 * recently-watched items in a tokenized table, shows a progress bar for
 * in-progress items (0 < progress < 100), removes a single item, and clears all
 * history behind a confirmation Modal. Each mutation refetches the list
 * afterward (matching the React source). Errors surface as toasts.
 *
 * Deviation from React: the per-item "Continue watching" action emits a
 * `continue` event with the media id rather than calling react-router's
 * `navigate` — the package admin pages have no router DI, so the host wires
 * navigation. See the worklog / report.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import { AdminHistoryApi, type RecentlyWatchedItem } from '../../api/admin/history';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Icon from '../../components/Icon.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const emit = defineEmits<{ (e: 'continue', mediaItemId: string): void }>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminHistoryApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

const items = ref<RecentlyWatchedItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showClearConfirm = ref(false);
const clearing = ref(false);

async function loadHistory(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    items.value = await api.getRecentlyWatched();
  } catch (e) {
    error.value = errMessage(e, 'Failed to load watch history.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

async function handleRemoveItem(mediaItemId: string): Promise<void> {
  try {
    await api.removeFromHistory(mediaItemId);
    toasts.success('Removed from watch history.');
    await loadHistory();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to remove item.'));
  }
}

async function handleClearHistory(): Promise<void> {
  clearing.value = true;
  try {
    await api.clearHistory();
    toasts.success('Watch history cleared.');
    showClearConfirm.value = false;
    await loadHistory();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to clear history.'));
  } finally {
    clearing.value = false;
  }
}

function handleContinueWatching(mediaItemId: string): void {
  emit('continue', mediaItemId);
}

/** Format a relative "X ago" string from an ISO timestamp. */
function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  const diffMonth = Math.floor(diffDay / 30);
  return `${diffMonth} month${diffMonth === 1 ? '' : 's'} ago`;
}

function mediaTitle(item: RecentlyWatchedItem): string {
  return item.title ?? item.name ?? item.media_item_id ?? item.id;
}

function mediaType(item: RecentlyWatchedItem): string {
  return item.media_type ?? item.type ?? 'media';
}

function thumbnailUrl(item: RecentlyWatchedItem): string | undefined {
  return item.thumbnail_url ?? item.poster_url;
}

function showProgressBar(item: RecentlyWatchedItem): boolean {
  const progress = item.progress_percent;
  return progress !== undefined && progress > 0 && progress < 100;
}

function progressValue(item: RecentlyWatchedItem): number {
  return Math.round(item.progress_percent ?? 0);
}

function targetId(item: RecentlyWatchedItem): string {
  return item.media_item_id ?? item.id;
}

const hasItems = computed(() => Array.isArray(items.value) && items.value.length > 0);

onMounted(loadHistory);
</script>

<template>
  <section class="admin-history" aria-labelledby="history-heading">
    <header class="admin-history__head">
      <h1 id="history-heading" class="admin-history__title">Watch History</h1>
      <Button
        v-if="hasItems"
        variant="outline"
        size="sm"
        left-icon="x"
        @click="showClearConfirm = true"
      >
        Clear All
      </Button>
    </header>

    <PageHint>
      Everything that's been watched on the server, with how far each title was played.
      <strong>Continue</strong> appears on partly-watched items to jump back to where you left off,
      <strong>Remove</strong> deletes a single entry, and <strong>Clear All</strong> wipes the
      entire history (after a confirmation).
    </PageHint>

    <div v-if="loading" class="admin-history__skel"><Skeleton variant="text" :lines="6" /></div>
    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load watch history"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadHistory">Retry</Button>
      </template>
    </EmptyState>
    <EmptyState
      v-else-if="!hasItems"
      icon="film"
      title="No watch history yet"
      description="Items you watch will appear here."
    />
    <template v-else>
      <ul class="admin-history__list" aria-label="Watch history">
        <li v-for="item in items" :key="item.id" class="admin-history__item">
          <div class="admin-history__thumb">
            <img
              v-if="thumbnailUrl(item)"
              :src="thumbnailUrl(item)"
              :alt="`Thumbnail for ${mediaTitle(item)}`"
              class="admin-history__img"
            />
            <span v-else class="admin-history__placeholder" aria-hidden="true">
              <Icon name="film" />
            </span>
          </div>

          <div class="admin-history__info">
            <div class="admin-history__title-row">
              <span class="admin-history__item-title">{{ mediaTitle(item) }}</span>
              <Badge tone="neutral">{{ mediaType(item) }}</Badge>
            </div>

            <p v-if="item.last_watched_at" class="admin-history__time">
              Watched {{ formatTimeAgo(item.last_watched_at) }}
            </p>

            <div v-if="showProgressBar(item)" class="admin-history__progress">
              <div
                class="admin-history__progress-track"
                role="progressbar"
                :aria-valuenow="item.progress_percent"
                :aria-valuemin="0"
                :aria-valuemax="100"
              >
                <div class="admin-history__progress-fill" :style="{ width: `${item.progress_percent}%` }" />
              </div>
              <span class="admin-history__progress-label">{{ progressValue(item) }}%</span>
            </div>
          </div>

          <div class="admin-history__actions">
            <Button
              v-if="showProgressBar(item)"
              variant="solid"
              size="sm"
              left-icon="play"
              :aria-label="`Continue watching ${mediaTitle(item)}`"
              @click="handleContinueWatching(targetId(item))"
            >
              Continue
            </Button>
            <Button
              variant="ghost"
              size="sm"
              left-icon="x"
              :aria-label="`Remove ${mediaTitle(item)} from history`"
              @click="handleRemoveItem(targetId(item))"
            >
              Remove
            </Button>
          </div>
        </li>
      </ul>

      <p v-if="items.length >= 50" class="admin-history__more" role="note">
        Showing {{ items.length }} items. Older items are not shown.
      </p>
    </template>

    <!-- Clear history confirmation modal -->
    <Modal
      v-model="showClearConfirm"
      title="Clear Watch History"
      size="sm"
      @close="showClearConfirm = false"
    >
      <p>Clear all items from your watch history? This cannot be undone.</p>
      <template #footer>
        <Button variant="ghost" size="sm" :disabled="clearing" @click="showClearConfirm = false">
          Cancel
        </Button>
        <Button variant="solid" size="sm" :loading="clearing" @click="handleClearHistory">
          Clear All
        </Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-history {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-history__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.admin-history__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-history__skel {
  padding-block: var(--space-2);
}
.admin-history__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  list-style: none;
  margin: 0;
  padding: 0;
}
.admin-history__item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-history__thumb {
  flex: none;
  width: 4rem;
  height: 2.5rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--surface-2);
}
.admin-history__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.admin-history__placeholder {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--text-subtle);
}
.admin-history__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-history__title-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.admin-history__item-title {
  font-weight: var(--font-semibold);
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.admin-history__time {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.admin-history__progress {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.admin-history__progress-track {
  flex: 1;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--surface-glass-strong);
  overflow: hidden;
}
.admin-history__progress-fill {
  height: 100%;
  background: var(--accent);
}
.admin-history__progress-label {
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
}
.admin-history__actions {
  flex: none;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.admin-history__more {
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
</style>
