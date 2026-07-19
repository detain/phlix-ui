<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * MusicTracksPage — full track listing with search, play controls, and pagination.
 *
 * Fetches all tracks from `GET /api/v1/music/tracks` and provides:
 *   - Client-side search/filter by track name
 *   - Play All / Play button per track
 *   - Pagination via limit/offset query params
 *
 * Playback is driven by the shared {@link useMusicPlayer} composable.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase, useMediaDirectBase } from '../composables/useApiBase';
import { useMusicPlayer } from '../composables/useMusicPlayer';
import { ApiClient } from '../api/client';
import Icon from '../components/Icon.vue';
import type { MusicTrack } from '../types/music';

// --- state ---
const tracks = ref<MusicTrack[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const limit = ref(100);
const offset = ref(0);
const total = ref(0);

const { t } = useMessages();
const apiBase = useMediaApiBase();
const directBase = useMediaDirectBase();

// --- audio playback (signed stream_url + client-side crossfade/gapless) ---
const player = useMusicPlayer({
  apiBase: () => apiBase.value,
  streamBase: () => directBase.value || apiBase.value,
});
onUnmounted(() => player.dispose());

const playingTrackId = computed(() =>
  player.playing.value ? player.currentTrack.value?.id ?? null : null,
);

/** A fresh client bound to the current media API base. */
function getClient(): ApiClient {
  return new ApiClient({ baseUrl: apiBase.value });
}

onMounted(async () => {
  await loadTracks();
});

async function loadTracks(): Promise<void> {
  loading.value = true;
  try {
    const client = getClient();
    const res = await client.get<{ tracks?: unknown[]; total?: number }>(
      '/api/v1/music/tracks',
      { limit: String(limit.value), offset: String(offset.value) }
    );
    const raw = Array.isArray(res.tracks) ? res.tracks : [];
    tracks.value = raw.map(normalizeTrack);
    total.value = typeof res.total === 'number' ? res.total : raw.length;
  } catch {
    tracks.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

/** Normalize a raw track object to MusicTrack shape. */
function normalizeTrack(raw: unknown): MusicTrack {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const title = String(r['title'] ?? r['name'] ?? 'Unknown Track');
  const id = String(r['id'] ?? '');
  return {
    id,
    title,
    durationSecs: Number(r['duration_secs'] ?? 0) || 0,
    trackNumber: r['track_number'] != null ? Number(r['track_number']) : null,
    streamUrl: r['stream_url'] != null ? String(r['stream_url']) : null,
  };
}

// --- search/filter ---
const filteredTracks = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return tracks.value;
  return tracks.value.filter((t) => t.title.toLowerCase().includes(q));
});

// --- playback ---
function playTrack(track: MusicTrack): void {
  if (player.currentTrack.value?.id === track.id && player.playing.value) {
    player.pause();
    return;
  }
  if (player.currentTrack.value?.id === track.id) {
    void player.play();
    return;
  }
  player.loadTracks(tracks.value);
  void player.play(track);
}

function playAll(): void {
  if (tracks.value.length === 0) return;
  player.loadTracks(tracks.value);
  void player.play(tracks.value[0]);
}

// --- pagination ---
const hasNext = computed(() => offset.value + limit.value < total.value);
const hasPrev = computed(() => offset.value > 0);

async function nextPage(): Promise<void> {
  if (!hasNext.value) return;
  offset.value += limit.value;
  await loadTracks();
}

async function prevPage(): Promise<void> {
  if (!hasPrev.value) return;
  offset.value = Math.max(0, offset.value - limit.value);
  await loadTracks();
}

// --- formatting ---
function formatDuration(secs: number): string {
  if (!isFinite(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function onSeek(event: Event): void {
  const value = Number((event.target as HTMLInputElement).value);
  player.seek(value);
}
</script>

<template>
  <div class="tracks-page">
    <!-- Header -->
    <header class="tracks-page__head">
      <h1 class="tracks-page__title">{{ t('music.allTracks') }}</h1>
      <div class="tracks-page__controls">
        <div class="search-box">
          <Icon name="search" class="search-box__icon" />
          <input
            v-model="searchQuery"
            type="text"
            class="search-box__input"
            :placeholder="t('music.searchTracks')"
            aria-label="Search tracks"
          >
        </div>
        <button
          type="button"
          class="btn btn--primary"
          :disabled="filteredTracks.length === 0"
          @click="playAll"
        >
          <Icon name="play" class="btn__icon" />
          {{ t('music.playAll') }}
        </button>
      </div>
    </header>

    <!-- Track count -->
    <p class="tracks-page__count" role="status" aria-live="polite">
      {{ filteredTracks.length }} {{ filteredTracks.length === 1 ? 'track' : 'tracks' }}
      <span v-if="searchQuery"> ({{ t('music.matching') }} "{{ searchQuery }}")</span>
    </p>

    <!-- Loading skeleton -->
    <div v-if="loading && tracks.length === 0" class="tracks-page__loading" role="status" aria-busy="true">
      <div v-for="n in 8" :key="n" class="track-skel">
        <div class="track-skel__num" />
        <div class="track-skel__title" />
        <div class="track-skel__artist" />
        <div class="track-skel__album" />
        <div class="track-skel__duration" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="filteredTracks.length === 0" class="tracks-page__empty" role="status">
      <Icon name="music" class="tracks-page__empty-icon" />
      <p class="tracks-page__empty-text">
        {{ searchQuery ? t('music.noTracksMatch') : t('music.noTracks') }}
      </p>
    </div>

    <!-- Track table -->
    <div v-else class="track-table" role="table" aria-label="Music tracks">
      <div class="track-table__header" role="row">
        <span class="col-num" role="columnheader">#</span>
        <span class="col-title" role="columnheader">{{ t('music.title') }}</span>
        <span class="col-artist" role="columnheader">{{ t('music.artist') }}</span>
        <span class="col-album" role="columnheader">{{ t('music.album') }}</span>
        <span class="col-duration" role="columnheader">{{ t('music.duration') }}</span>
        <span class="col-play" role="columnheader"><span class="sr-only">Play</span></span>
      </div>

      <div
        v-for="track in filteredTracks"
        :key="track.id"
        class="track-row"
        :class="{ 'is-playing': playingTrackId === track.id }"
        role="row"
      >
        <span class="col-num track-row__num">
          <template v-if="playingTrackId !== track.id && track.trackNumber !== null">
            {{ track.trackNumber }}
          </template>
          <template v-else-if="playingTrackId === track.id">
            <Icon name="pause" class="track-row__playing-icon" />
          </template>
        </span>

        <span class="col-title track-row__title">{{ track.title }}</span>

        <span class="col-artist track-row__artist">—</span>
        <span class="col-album track-row__album">—</span>

        <span class="col-duration track-row__duration">{{ formatDuration(track.durationSecs) }}</span>

        <button
          type="button"
          class="col-play track-row__play"
          :aria-label="playingTrackId === track.id ? t('music.pause') : t('music.play')"
          @click="playTrack(track)"
        >
          <Icon :name="playingTrackId === track.id ? 'pause' : 'play'" class="track-row__play-icon" />
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="total > limit" class="pagination">
      <button
        type="button"
        class="pagination__btn"
        :disabled="!hasPrev"
        @click="prevPage"
      >
        {{ t('music.previous') }}
      </button>
      <span class="pagination__info">
        {{ offset + 1 }} – {{ Math.min(offset + limit, total) }} {{ t('music.of') }} {{ total }}
      </span>
      <button
        type="button"
        class="pagination__btn"
        :disabled="!hasNext"
        @click="nextPage"
      >
        {{ t('music.next') }}
      </button>
    </div>

    <!-- Now-playing transport bar -->
    <footer v-if="player.currentTrack.value" class="music-bar" role="region" :aria-label="t('music.nowPlaying')">
      <div class="music-bar__meta">
        <span class="music-bar__title">{{ player.currentTrack.value.title }}</span>
        <span v-if="player.error.value" class="music-bar__error" role="alert">
          {{ t('music.streamError') }}
        </span>
        <span v-else-if="player.loading.value" class="music-bar__status" role="status" aria-live="polite">
          {{ t('music.loading') }}
        </span>
      </div>
      <div class="music-bar__controls">
        <button
          type="button"
          class="music-bar__btn"
          :disabled="!player.hasPrev.value"
          :aria-label="t('music.previous')"
          @click="player.previous()"
        >
          <Icon name="skip-back" class="music-bar__icon" />
        </button>
        <button
          type="button"
          class="music-bar__btn music-bar__btn--primary"
          :aria-label="player.playing.value ? t('music.pause') : t('music.play')"
          @click="player.toggle()"
        >
          <Icon :name="player.playing.value ? 'pause' : 'play'" class="music-bar__icon" />
        </button>
        <button
          type="button"
          class="music-bar__btn"
          :disabled="!player.hasNext.value"
          :aria-label="t('music.next')"
          @click="player.next()"
        >
          <Icon name="skip-forward" class="music-bar__icon" />
        </button>
      </div>
      <div class="music-bar__progress">
        <span class="music-bar__time">{{ formatTime(player.position.value) }}</span>
        <input
          type="range"
          class="music-bar__seek"
          min="0"
          :max="player.duration.value || 0"
          :value="player.position.value"
          :aria-label="t('music.seek')"
          @input="onSeek"
        >
        <span class="music-bar__time">{{ formatTime(player.duration.value) }}</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.tracks-page {
  padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
  max-width: 1200px;
  margin: 0 auto;
}

.tracks-page__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4, 16px);
  margin-bottom: var(--space-4, 16px);
}

.tracks-page__title {
  font-family: var(--font-display, inherit);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-2xl, 1.5rem);
  color: var(--text, #e4e4e7);
  margin: 0;
}

.tracks-page__controls {
  display: flex;
  align-items: center;
  gap: var(--space-3, 12px);
}

.tracks-page__count {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
  margin: 0 0 var(--space-4, 16px);
}

/* Search box */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}
.search-box__icon {
  position: absolute;
  left: var(--space-3, 12px);
  width: 16px;
  height: 16px;
  color: var(--text-muted, #a1a1aa);
  pointer-events: none;
}
.search-box__input {
  padding: var(--space-2, 8px) var(--space-3, 12px) var(--space-2, 8px) 36px;
  border-radius: var(--radius-md, 8px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  color: var(--text, #e4e4e7);
  font-size: var(--text-sm, 0.875rem);
  width: 220px;
  transition: border-color var(--dur-fast, 0.18s);
}
.search-box__input::placeholder {
  color: var(--text-muted, #a1a1aa);
}
.search-box__input:focus {
  outline: none;
  border-color: var(--accent, #f5a524);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  padding: var(--space-2, 8px) var(--space-4, 16px);
  border-radius: var(--radius-md, 8px);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--fw-medium, 500);
  cursor: pointer;
  transition: background var(--dur-fast, 0.18s);
  border: 1px solid transparent;
}
.btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.btn--primary {
  background: var(--accent, #f5a524);
  color: var(--accent-contrast, #1a1205);
}
.btn--primary:hover:not(:disabled) {
  background: var(--accent-hover, #e09000);
}
.btn__icon {
  width: 14px;
  height: 14px;
}

/* Track table */
.track-table {
  display: grid;
  grid-template-columns: 40px 1fr 150px 150px 60px 40px;
  gap: 0;
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
}

.track-table__header {
  display: contents;
}
.track-table__header > span {
  padding: var(--space-3, 12px) var(--space-3, 12px);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--fw-semibold, 600);
  color: var(--text-muted, #a1a1aa);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--surface-3, #3f3f46);
  border-bottom: 1px solid var(--border, #3f3f46);
}

.track-row {
  display: contents;
}
.track-row > span,
.track-row > button {
  padding: var(--space-2, 8px) var(--space-3, 12px);
  display: flex;
  align-items: center;
  font-size: var(--text-sm, 0.875rem);
  color: var(--text, #e4e4e7);
  border-bottom: 1px solid var(--border, #3f3f46);
}
.track-row:last-child > span,
.track-row:last-child > button {
  border-bottom: none;
}
.track-row:hover > span,
.track-row:hover > button {
  background: var(--surface-3, #3f3f46);
}
.track-row.is-playing > span,
.track-row.is-playing > button {
  background: var(--surface-3, #3f3f46);
}
.track-row.is-playing .track-row__title {
  color: var(--accent, #f5a524);
}

.track-row__num {
  justify-content: center;
  color: var(--text-muted, #a1a1aa);
  font-size: var(--text-xs, 0.75rem);
}
.track-row__playing-icon {
  width: 14px;
  height: 14px;
  color: var(--accent, #f5a524);
  animation: pulse 1s ease-in-out infinite;
}
.track-row__title {
  font-weight: var(--fw-medium, 500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.track-row__artist,
.track-row__album {
  color: var(--text-muted, #a1a1aa);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.track-row__duration {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
  justify-content: flex-end;
}
.track-row__play {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full, 999px);
  background: var(--accent, #f5a524);
  color: var(--accent-contrast, #1a1205);
  cursor: pointer;
  transition: transform var(--dur-fast, 0.18s) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  border: none;
  padding: 0;
  justify-self: center;
}
.track-row__play:hover {
  transform: scale(1.1);
}
.track-row__play:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.track-row__play-icon {
  width: 12px;
  height: 12px;
}

/* Loading skeleton */
.tracks-page__loading {
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
}
.track-skel {
  display: grid;
  grid-template-columns: 40px 1fr 150px 150px 60px 40px;
  gap: 0;
  padding: var(--space-2, 8px) var(--space-3, 12px);
  background: var(--surface-2, #27272a);
}
.track-skel__num,
.track-skel__title,
.track-skel__artist,
.track-skel__album,
.track-skel__duration {
  height: 1em;
  border-radius: var(--radius-sm, 6px);
  background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

/* Empty state */
.tracks-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16, 64px) var(--space-4, 16px);
  color: var(--text-muted, #a1a1aa);
  text-align: center;
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  border-radius: var(--radius-lg, 12px);
}
.tracks-page__empty-icon {
  width: 40px;
  height: 40px;
  opacity: 0.5;
  margin-bottom: var(--space-2, 8px);
}
.tracks-page__empty-text {
  font-size: var(--text-sm, 0.875rem);
  margin: 0;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4, 16px);
  margin-top: var(--space-6, 24px);
}
.pagination__btn {
  padding: var(--space-2, 8px) var(--space-4, 16px);
  border-radius: var(--radius-md, 8px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  color: var(--text, #e4e4e7);
  font-size: var(--text-sm, 0.875rem);
  cursor: pointer;
  transition: background var(--dur-fast, 0.18s);
}
.pagination__btn:hover:not(:disabled) {
  background: var(--surface-3, #3f3f46);
}
.pagination__btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.pagination__info {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
}

/* Now-playing transport bar */
.music-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: var(--space-4, 16px);
  padding: var(--space-3, 12px) var(--space-4, 16px);
  background: var(--surface-1, #18181b);
  border-top: 1px solid var(--border, #3f3f46);
}
.music-bar__meta {
  flex: 1 1 0;
  min-width: 0;
}
.music-bar__title {
  display: block;
  font-size: var(--text-sm, 0.875rem);
  color: var(--text, #e4e4e7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.music-bar__error {
  display: block;
  font-size: var(--text-xs, 0.75rem);
  color: var(--danger, #f87171);
}
.music-bar__status {
  display: block;
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
}
.music-bar__controls {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
}
.music-bar__btn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full, 999px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  color: var(--text, #e4e4e7);
  cursor: pointer;
}
.music-bar__btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.music-bar__btn--primary {
  background: var(--accent, #f5a524);
  color: var(--accent-contrast, #1a1205);
  border-color: transparent;
}
.music-bar__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.music-bar__icon {
  width: 16px;
  height: 16px;
}
.music-bar__progress {
  flex: 2 1 0;
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
}
.music-bar__seek {
  flex: 1 1 0;
  min-width: 0;
  accent-color: var(--accent, #f5a524);
}
.music-bar__time {
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
  font-family: var(--font-mono, monospace);
  min-width: 3ch;
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@keyframes shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@media (prefers-reduced-motion: reduce) {
  .track-skel__num,
  .track-skel__title,
  .track-skel__artist,
  .track-skel__album,
  .track-skel__duration {
    animation: none;
  }
  .track-row__playing-icon {
    animation: none;
  }
}
</style>
