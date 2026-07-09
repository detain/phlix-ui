<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin HistoryPage — the **all-users** "Watch History" oversight view. Reads
 * the admin-only endpoint `GET /api/v1/admin/watch-history` (every user's
 * history, not just the current admin's) and lists who watched what & when.
 *
 * This is a READ-ONLY surface: there is no admin delete/clear endpoint, so the
 * per-user mutation actions (Remove / Clear all / Continue) were removed — they
 * would be semantically wrong against a cross-user list. Each row's title links
 * to the media detail page (`/app/media/:id`) so an admin can open it. A
 * progress bar reflects each entry's `progress_percent`.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import { AdminHistoryApi, type AdminWatchHistoryItem } from '../../api/admin/history';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Icon from '../../components/Icon.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminHistoryApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

const items = ref<AdminWatchHistoryItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadHistory(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    items.value = await api.getAllWatchHistory();
  } catch (e) {
    error.value = errMessage(e, 'Failed to load watch history.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
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

/** The media detail route for a row. Admin pages are always mounted under `/app`. */
function mediaTo(item: AdminWatchHistoryItem): string {
  return `/app/media/${item.media_item_id || item.id}`;
}

/** Who watched the item: display name, falling back to username, then a dash. */
function userLabel(item: AdminWatchHistoryItem): string {
  return item.display_name || item.username || '—';
}

function showProgressBar(item: AdminWatchHistoryItem): boolean {
  const progress = item.progress_percent;
  return progress > 0 && progress < 100;
}

function progressValue(item: AdminWatchHistoryItem): number {
  return Math.round(item.progress_percent);
}

const hasItems = computed(() => Array.isArray(items.value) && items.value.length > 0);

onMounted(loadHistory);
</script>

<template>
  <section class="admin-history" aria-labelledby="history-heading">
    <header class="admin-history__head">
      <h1 id="history-heading" class="admin-history__title">Watch History</h1>
    </header>

    <PageHint>
      A read-only view of what everyone on the server has watched — who watched
      each title and when, with how far each entry was played. Click a title to
      open it.
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
      description="Items watched across all users will appear here."
    />
    <template v-else>
      <ul class="admin-history__list" aria-label="Watch history">
        <li v-for="item in items" :key="item.id" class="admin-history__item">
          <div class="admin-history__thumb">
            <span class="admin-history__placeholder" aria-hidden="true">
              <Icon name="film" />
            </span>
          </div>

          <div class="admin-history__info">
            <div class="admin-history__title-row">
              <RouterLink :to="mediaTo(item)" class="admin-history__item-title">
                {{ item.media_name }}
              </RouterLink>
              <Badge tone="neutral">{{ item.media_type }}</Badge>
            </div>

            <p class="admin-history__user">Watched by {{ userLabel(item) }}</p>

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
        </li>
      </ul>

      <p v-if="items.length >= 50" class="admin-history__more" role="note">
        Showing {{ items.length }} items (capped at 200). Older items are not shown.
      </p>
    </template>
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
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.admin-history__item-title:hover {
  color: var(--accent);
  text-decoration: underline;
}
.admin-history__user {
  font-size: var(--text-xs);
  color: var(--text-muted);
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
.admin-history__more {
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
</style>
