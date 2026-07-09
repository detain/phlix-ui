<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * MusicAlbumCard — card displaying an album with its cover, title, year, and track count.
 */
import type { MusicAlbum } from '../types/music';
import Icon from './Icon.vue';

defineProps<{
  album: MusicAlbum;
}>();

defineEmits<{
  (e: 'click', album: MusicAlbum): void;
}>();

function formatYear(year: number | null): string {
  return year ? String(year) : '—';
}
</script>

<template>
  <button type="button" class="album-card" @click="$emit('click', album)">
    <div class="album-card__cover-wrap">
      <img
        v-if="album.albumArtUrl"
        :src="album.albumArtUrl"
        :alt="album.title"
        class="album-card__cover"
        loading="lazy"
      />
      <div v-else class="album-card__placeholder">
        <Icon name="image" class="album-card__placeholder-icon" />
      </div>
    </div>
    <div class="album-card__info">
      <span class="album-card__title">{{ album.title }}</span>
      <span class="album-card__meta">
        <span class="album-card__year">{{ formatYear(album.year) }}</span>
        <span class="album-card__dot" aria-hidden="true">·</span>
        <span class="album-card__tracks">
          {{ album.totalTracks }} track{{ album.totalTracks !== 1 ? 's' : '' }}
        </span>
      </span>
    </div>
  </button>
</template>

<style scoped>
.album-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 12px);
  padding: var(--space-3, 12px);
  border-radius: var(--radius-lg, 12px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  text-align: left;
  cursor: pointer;
  transition:
    border-color var(--dur-fast, 0.18s) var(--ease-out, ease),
    transform var(--dur-fast, 0.18s) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}
.album-card:hover {
  border-color: var(--border-strong, #52525b);
  transform: translateY(-2px);
}
.album-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.album-card__cover-wrap {
  aspect-ratio: 1;
  border-radius: var(--radius-md, 8px);
  overflow: hidden;
  background: var(--surface-3, #3f3f46);
}
.album-card__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.album-card__placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--surface-2), var(--surface-3));
}
.album-card__placeholder-icon {
  width: 40%;
  height: 40%;
  color: var(--text-muted, #a1a1aa);
  opacity: 0.5;
}
.album-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 4px);
}
.album-card__title {
  font-family: var(--font-display, inherit);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  color: var(--text, #e4e4e7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.album-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-1, 4px);
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
}
.album-card__dot {
  opacity: 0.5;
}
</style>
