<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * MusicTrackList — displays a list of tracks with play buttons and duration.
 */
import type { MusicTrack } from '@phlix/contracts';
import Icon from './Icon.vue';
import { useMessages } from '../composables/useMessages';

const props = defineProps<{
  tracks: MusicTrack[];
  playingTrackId?: number | null;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'play', track: MusicTrack): void;
}>();

const { t } = useMessages();

function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
</script>

<template>
  <div class="track-list" role="list">
    <!-- Loading skeleton -->
    <div v-if="loading && tracks.length === 0" class="track-list__loading">
      <div v-for="n in 8" :key="n" class="track-skel" role="listitem">
        <div class="track-skel__num" />
        <div class="track-skel__title" />
        <div class="track-skel__duration" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="tracks.length === 0" class="track-list__empty" role="status">
      <Icon name="music" class="track-list__empty-icon" />
      <p class="track-list__empty-text">{{ t('music.noTracks') }}</p>
    </div>

    <!-- Track rows -->
    <template v-else>
      <div
        v-for="track in tracks"
        :key="track.id"
        class="track-row"
        :class="{ 'is-playing': playingTrackId === track.id }"
        role="listitem"
      >
        <button
          type="button"
          class="track-row__play"
          :aria-label="playingTrackId === track.id ? t('music.pause') : t('music.play')"
          @click="emit('play', track)"
        >
          <Icon :name="playingTrackId === track.id ? 'pause' : 'play'" class="track-row__play-icon" />
        </button>

        <span class="track-row__num">
          <template v-if="playingTrackId !== track.id && track.trackNumber !== null">
            {{ track.trackNumber }}
          </template>
        </span>

        <span class="track-row__title">{{ track.title }}</span>

        <span class="track-row__duration">{{ formatDuration(track.durationSecs) }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.track-list {
  display: flex;
  flex-direction: column;
}
.track-list__loading,
.track-list__empty {
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
  padding: var(--space-4, 16px);
}
.track-list__empty {
  align-items: center;
  justify-content: center;
  color: var(--text-muted, #a1a1aa);
  text-align: center;
}
.track-list__empty-icon {
  width: 32px;
  height: 32px;
  opacity: 0.5;
  margin-bottom: var(--space-2, 8px);
}
.track-list__empty-text {
  font-size: var(--text-sm, 0.875rem);
}

/* Skeleton */
.track-skel {
  display: grid;
  grid-template-columns: 32px 24px 1fr 48px;
  gap: var(--space-3, 12px);
  align-items: center;
  padding: var(--space-2, 8px) var(--space-3, 12px);
}
.track-skel__num,
.track-skel__title,
.track-skel__duration {
  height: 0.85em;
  border-radius: var(--radius-sm, 6px);
  background: var(--surface-2, #27272a);
  animation: shimmer 1.4s ease infinite;
  background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
  background-size: 400% 100%;
}

/* Track row */
.track-row {
  display: grid;
  grid-template-columns: 32px 24px 1fr 48px;
  gap: var(--space-3, 12px);
  align-items: center;
  padding: var(--space-2, 8px) var(--space-3, 12px);
  border-radius: var(--radius-md, 8px);
  transition: background var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.track-row:hover {
  background: var(--surface-2, #27272a);
}
.track-row.is-playing {
  background: var(--surface-2, #27272a);
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
}
.track-row__play:hover {
  transform: scale(1.1);
}
.track-row__play:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.track-row__play-icon {
  width: 14px;
  height: 14px;
}
.track-row__num {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
  text-align: center;
}
.track-row__title {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text, #e4e4e7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.track-row.is-playing .track-row__title {
  color: var(--accent, #f5a524);
}
.track-row__duration {
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
  font-family: var(--font-mono, monospace);
  text-align: right;
}

@keyframes shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .track-skel__num,
  .track-skel__title,
  .track-skel__duration {
    animation: none;
  }
}
</style>
