<script setup lang="ts">
/**
 * Admin DashboardPage (RA.2) — the server stats dashboard, ported from the
 * deleted React `DashboardPage` onto the `@phlix/ui` primitives. Five cards:
 * Now Playing (live sessions + progress bars, auto-refreshing every 30s), Top
 * Users (leaderboard), Top Media (ranked list), Storage (per-type breakdown),
 * and Recent Activity (event feed with load-more). A 7d/30d/90d range filter
 * drives the top-users + top-media queries. Errors surface as toasts; the
 * now-playing refresh timer clears on unmount.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminDashboardApi,
  type ActivityEvent,
  type NowPlayingItem,
  type StorageSummary,
  type TopMedia,
  type TopUser,
} from '../../api/admin/dashboard';
import { useToastStore } from '../../stores/useToastStore';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import Select from '../../components/ui/Select.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import type { SelectOptionInput } from '../../components/ui/listbox';

const ACTIVITY_PAGE_SIZE = 20;
const NOW_PLAYING_REFRESH_MS = 30_000;

type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminDashboardApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ---------------------------------------------------------------------------
// Formatting helpers (ported from the React source)
// ---------------------------------------------------------------------------

/** Format seconds as "Xh Ym" or "Xm" (dash glyph if 0). */
function formatDuration(seconds: number): string {
  if (seconds === 0) return '—';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/** Format bytes as a human-readable string (B/KB/MB/GB/TB). */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

/** Return a relative time string like "2m ago". */
function relativeTime(isoDate: string): string {
  const t = new Date(isoDate).getTime();
  if (!Number.isFinite(t)) return '';
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/** Media-type badge tone. */
function mediaTypeTone(type: string): BadgeTone {
  switch ((type ?? '').toLowerCase()) {
    case 'movie':
      return 'accent';
    case 'series':
      return 'success';
    case 'photo':
      return 'warning';
    case 'audiobook':
      return 'info';
    default:
      return 'neutral';
  }
}

/** Event-type badge tone. */
function eventTypeTone(eventType: string): BadgeTone {
  switch ((eventType ?? '').toLowerCase()) {
    case 'playback':
      return 'accent';
    case 'library':
      return 'success';
    default:
      return 'neutral';
  }
}

// ---------------------------------------------------------------------------
// Date-range filter (drives top-users + top-media)
// ---------------------------------------------------------------------------

const RANGE_OPTIONS: SelectOptionInput[] = [
  { value: 7, label: 'Last 7 days' },
  { value: 30, label: 'Last 30 days' },
  { value: 90, label: 'Last 90 days' },
];
const dateRange = ref<number>(30);

// ---------------------------------------------------------------------------
// Section data + loading state
// ---------------------------------------------------------------------------

const nowPlaying = ref<NowPlayingItem[]>([]);
const topUsers = ref<TopUser[]>([]);
const topMedia = ref<TopMedia[]>([]);
const storage = ref<StorageSummary[]>([]);
const activity = ref<ActivityEvent[]>([]);

const loadingNowPlaying = ref(true);
const loadingTopUsers = ref(true);
const loadingTopMedia = ref(true);
const loadingStorage = ref(true);
const loadingActivity = ref(true);
const loadingMoreActivity = ref(false);
const activityHasMore = ref(true);

const totalTranscodeCache = computed(() =>
  storage.value.reduce((sum, s) => sum + s.transcode_cache_bytes, 0),
);

// ---------------------------------------------------------------------------
// Fetchers
// ---------------------------------------------------------------------------

async function fetchNowPlaying(): Promise<void> {
  try {
    nowPlaying.value = await api.getNowPlaying();
  } catch {
    toasts.error('Failed to load now playing.');
  } finally {
    loadingNowPlaying.value = false;
  }
}

async function fetchTopUsers(days: number): Promise<void> {
  loadingTopUsers.value = true;
  try {
    topUsers.value = await api.getTopUsers(10, days);
  } catch {
    toasts.error('Failed to load top users.');
  } finally {
    loadingTopUsers.value = false;
  }
}

async function fetchTopMedia(days: number): Promise<void> {
  loadingTopMedia.value = true;
  try {
    topMedia.value = await api.getTopMedia(10, days);
  } catch {
    toasts.error('Failed to load top media.');
  } finally {
    loadingTopMedia.value = false;
  }
}

async function fetchStorage(): Promise<void> {
  try {
    storage.value = await api.getStorage();
  } catch {
    toasts.error('Failed to load storage.');
  } finally {
    loadingStorage.value = false;
  }
}

async function fetchActivity(limit: number, append = false): Promise<void> {
  if (append) loadingMoreActivity.value = true;
  else loadingActivity.value = true;
  try {
    const data = await api.getActivity(limit);
    if (append) activity.value = [...activity.value, ...data];
    else activity.value = data;
    activityHasMore.value = data.length === ACTIVITY_PAGE_SIZE;
  } catch {
    toasts.error('Failed to load activity.');
  } finally {
    loadingActivity.value = false;
    loadingMoreActivity.value = false;
  }
}

function loadMoreActivity(): void {
  void fetchActivity(activity.value.length + ACTIVITY_PAGE_SIZE, true);
}

// ---------------------------------------------------------------------------
// Lifecycle: initial load, range refetch, now-playing auto-refresh
// ---------------------------------------------------------------------------

let refreshTimer: ReturnType<typeof setInterval> | null = null;

watch(dateRange, (days) => {
  void fetchTopUsers(days);
  void fetchTopMedia(days);
});

onMounted(() => {
  void fetchNowPlaying();
  void fetchStorage();
  void fetchActivity(ACTIVITY_PAGE_SIZE);
  void fetchTopUsers(dateRange.value);
  void fetchTopMedia(dateRange.value);
  refreshTimer = setInterval(() => {
    void api
      .getNowPlaying()
      .then((data) => {
        nowPlaying.value = data;
      })
      .catch(() => {
        // Swallow refresh errors so the timer doesn't spam toasts.
      });
  }, NOW_PLAYING_REFRESH_MS);
});

onBeforeUnmount(() => {
  if (refreshTimer !== null) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
});
</script>

<template>
  <section class="admin-dash" aria-labelledby="dash-heading">
    <header class="admin-dash__head">
      <h1 id="dash-heading" class="admin-dash__title">Dashboard</h1>
      <Select
        :model-value="dateRange"
        :options="RANGE_OPTIONS"
        label="Date range"
        class="admin-dash__range"
        @update:model-value="(v) => (dateRange = Number(v))"
      />
    </header>

    <div class="admin-dash__grid">
      <!-- Now Playing -->
      <section class="admin-dash__card" aria-labelledby="np-heading">
        <header class="admin-dash__card-head">
          <h2 id="np-heading" class="admin-dash__card-title">Now Playing</h2>
          <Badge
            v-if="nowPlaying.length > 0"
            tone="accent"
            :label="`${nowPlaying.length} active sessions`"
          >
            {{ nowPlaying.length }}
          </Badge>
        </header>
        <div v-if="loadingNowPlaying" class="admin-dash__skel"><Skeleton variant="text" :lines="4" /></div>
        <EmptyState v-else-if="nowPlaying.length === 0" icon="play" title="No active sessions" />
        <ul v-else class="admin-dash__np-list" role="list">
          <li v-for="item in nowPlaying" :key="item.session_id" class="admin-dash__np-item">
            <div class="admin-dash__np-info">
              <span class="admin-dash__np-user">{{ item.user_name }}</span>
              <span class="admin-dash__np-mtitle" :title="item.media_title">{{ item.media_title }}</span>
              <Badge :tone="mediaTypeTone(item.media_type)">{{ item.media_type }}</Badge>
            </div>
            <div class="admin-dash__np-progress">
              <div
                class="admin-dash__bar"
                role="progressbar"
                :aria-valuenow="item.progress_percent"
                :aria-valuemin="0"
                :aria-valuemax="100"
              >
                <div class="admin-dash__bar-fill" :style="{ width: `${item.progress_percent}%` }" />
              </div>
              <span class="admin-dash__np-pct">{{ item.progress_percent }}%</span>
            </div>
          </li>
        </ul>
      </section>

      <!-- Top Users -->
      <section class="admin-dash__card" aria-labelledby="tu-heading">
        <header class="admin-dash__card-head">
          <h2 id="tu-heading" class="admin-dash__card-title">Top Users</h2>
        </header>
        <div v-if="loadingTopUsers" class="admin-dash__skel"><Skeleton variant="text" :lines="4" /></div>
        <EmptyState v-else-if="topUsers.length === 0" icon="user" title="No user data yet" />
        <table v-else class="admin-dash__table" aria-label="Top users leaderboard">
          <thead>
            <tr>
              <th scope="col" class="admin-dash__rank">#</th>
              <th scope="col">User</th>
              <th scope="col">Watch Time</th>
              <th scope="col">Plays</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(u, i) in topUsers" :key="u.user_id">
              <td class="admin-dash__rank">{{ i + 1 }}</td>
              <td>{{ u.user_name }}</td>
              <td>{{ formatDuration(u.total_watch_time_seconds) }}</td>
              <td>{{ u.play_count }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Top Media -->
      <section class="admin-dash__card" aria-labelledby="tm-heading">
        <header class="admin-dash__card-head">
          <h2 id="tm-heading" class="admin-dash__card-title">Top Media</h2>
        </header>
        <div v-if="loadingTopMedia" class="admin-dash__skel"><Skeleton variant="text" :lines="4" /></div>
        <EmptyState v-else-if="topMedia.length === 0" icon="film" title="No media data yet" />
        <ol v-else class="admin-dash__media-list" role="list">
          <li v-for="(m, i) in topMedia" :key="m.media_item_id" class="admin-dash__media-item">
            <span class="admin-dash__media-rank">{{ i + 1 }}</span>
            <div class="admin-dash__media-info">
              <span class="admin-dash__media-title" :title="m.media_title">{{ m.media_title }}</span>
              <Badge :tone="mediaTypeTone(m.media_type)">{{ m.media_type }}</Badge>
            </div>
            <div class="admin-dash__media-stats">
              <span>{{ m.play_count }} plays</span>
              <span>{{ formatDuration(m.total_duration_seconds) }}</span>
            </div>
          </li>
        </ol>
      </section>

      <!-- Storage -->
      <section class="admin-dash__card admin-dash__card--full" aria-labelledby="st-heading">
        <header class="admin-dash__card-head">
          <h2 id="st-heading" class="admin-dash__card-title">Storage</h2>
        </header>
        <div v-if="loadingStorage" class="admin-dash__skel"><Skeleton variant="text" :lines="3" /></div>
        <EmptyState v-else-if="storage.length === 0" icon="image" title="No storage data" />
        <template v-else>
          <div class="admin-dash__storage-grid">
            <div v-for="s in storage" :key="s.media_type" class="admin-dash__storage-card">
              <Badge :tone="mediaTypeTone(s.media_type)">{{ s.media_type }}</Badge>
              <div class="admin-dash__storage-count">{{ s.item_count.toLocaleString() }} items</div>
              <div class="admin-dash__storage-size">{{ formatBytes(s.total_bytes) }}</div>
            </div>
          </div>
          <p v-if="totalTranscodeCache > 0" class="admin-dash__storage-note">
            Transcode cache: {{ formatBytes(totalTranscodeCache) }}
          </p>
        </template>
      </section>

      <!-- Recent Activity -->
      <section class="admin-dash__card admin-dash__card--full" aria-labelledby="act-heading">
        <header class="admin-dash__card-head">
          <h2 id="act-heading" class="admin-dash__card-title">Recent Activity</h2>
        </header>
        <div v-if="loadingActivity" class="admin-dash__skel"><Skeleton variant="text" :lines="5" /></div>
        <EmptyState v-else-if="activity.length === 0" icon="list" title="No recent activity" />
        <div v-else class="admin-dash__activity">
          <ul class="admin-dash__activity-list" role="list">
            <li v-for="e in activity" :key="e.id" class="admin-dash__activity-item">
              <Badge :tone="eventTypeTone(e.event_type)">{{ e.event_type }}</Badge>
              <span class="admin-dash__activity-user">{{ e.user_name }}</span>
              <span class="admin-dash__activity-title" :title="e.media_title">{{ e.media_title }}</span>
              <time class="admin-dash__activity-time" :datetime="e.created_at" :title="e.created_at">
                {{ relativeTime(e.created_at) }}
              </time>
            </li>
          </ul>
          <Button
            v-if="activityHasMore"
            variant="outline"
            size="sm"
            :loading="loadingMoreActivity"
            @click="loadMoreActivity"
          >
            Load more
          </Button>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.admin-dash {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-dash__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.admin-dash__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-dash__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-5);
}
.admin-dash__card {
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-dash__card--full {
  grid-column: 1 / -1;
}
.admin-dash__card-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.admin-dash__card-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-dash__skel {
  padding-block: var(--space-2);
}

/* Now Playing */
.admin-dash__np-list,
.admin-dash__media-list,
.admin-dash__activity-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.admin-dash__np-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.admin-dash__np-info {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}
.admin-dash__np-user {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.admin-dash__np-mtitle,
.admin-dash__media-title,
.admin-dash__activity-title {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-muted);
}
.admin-dash__np-progress {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.admin-dash__bar {
  flex: 1;
  height: 0.4rem;
  border-radius: var(--radius-full);
  background: var(--surface-3);
  overflow: hidden;
}
.admin-dash__bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: var(--radius-full);
}
.admin-dash__np-pct {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
}

/* Tables */
.admin-dash__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-dash__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-dash__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-dash__rank {
  width: 2rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
}

/* Top Media */
.admin-dash__media-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.admin-dash__media-rank {
  width: 1.5rem;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
}
.admin-dash__media-info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.admin-dash__media-stats {
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  white-space: nowrap;
}

/* Storage */
.admin-dash__storage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--space-3);
}
.admin-dash__storage-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
}
.admin-dash__storage-count {
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.admin-dash__storage-size {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums;
  color: var(--text);
}
.admin-dash__storage-note {
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-subtle);
}

/* Activity */
.admin-dash__activity {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-dash__activity-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}
.admin-dash__activity-user {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.admin-dash__activity-time {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  white-space: nowrap;
}
</style>
