<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * MusicArtistCard — card displaying an artist with their image, name, and album count.
 */
import type { MusicArtist } from '../types/music';
import Icon from './Icon.vue';

defineProps<{
  artist: MusicArtist;
}>();

defineEmits<{
  (e: 'click', artist: MusicArtist): void;
}>();
</script>

<template>
  <button type="button" class="artist-card" @click="$emit('click', artist)">
    <div class="artist-card__image-wrap">
      <img
        v-if="artist.imageUrl"
        :src="artist.imageUrl"
        :alt="artist.name"
        class="artist-card__image"
        loading="lazy"
      />
      <div v-else class="artist-card__placeholder">
        <Icon name="music" class="artist-card__placeholder-icon" />
      </div>
    </div>
    <div class="artist-card__info">
      <span class="artist-card__name">{{ artist.name }}</span>
      <span v-if="artist.albumCount !== undefined" class="artist-card__albums">
        {{ artist.albumCount }} album{{ artist.albumCount !== 1 ? 's' : '' }}
      </span>
    </div>
  </button>
</template>

<style scoped>
.artist-card {
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
.artist-card:hover {
  border-color: var(--border-strong, #52525b);
  transform: translateY(-2px);
}
.artist-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.artist-card__image-wrap {
  aspect-ratio: 1;
  border-radius: var(--radius-md, 8px);
  overflow: hidden;
  background: var(--surface-3, #3f3f46);
}
.artist-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.artist-card__placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--surface-2), var(--surface-3));
}
.artist-card__placeholder-icon {
  width: 40%;
  height: 40%;
  color: var(--text-muted, #a1a1aa);
  opacity: 0.5;
}
.artist-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 4px);
}
.artist-card__name {
  font-family: var(--font-display, inherit);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  color: var(--text, #e4e4e7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.artist-card__albums {
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
}
</style>
