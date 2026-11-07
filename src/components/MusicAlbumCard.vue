<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MusicAlbumCard — card displaying an album with its cover, title, year, and track count.
 *
 * The track count goes through the i18n catalog (`music.tracksTotal`, a pipe-form
 * plural) with thousands separators. It used to inline `track{{ n !== 1 ? 's' : '' }}`,
 * both untranslatable and unformatted — the same defect as the three other music
 * surfaces that carried it in a slightly different syntactic shape.
 *
 * CU-115 (review ui__webux): two hosts use this card with two DIFFERENT
 * interaction semantics, and the old always-button form gave neither a URL:
 *   • `to` provided (and a router injected) → MediaCard's custom-RouterLink
 *     pattern: the stretched `.album-card__link` overlay is a REAL anchor, so
 *     middle-click / copy-link / new-tab work while `navigate` still SPA-
 *     intercepts the plain left click (it deliberately does not receive
 *     `.prevent` — vue-router's own guard lets modifier clicks fall through
 *     to the href; a pre-emptive preventDefault would make every click dead).
 *   • no `to` (e.g. MusicLibraryPage, where selecting an album switches an
 *     in-page view instead of navigating) → honest button + `click` emit;
 *     no fake href is fabricated for a destination that is not a route.
 */
import { computed } from 'vue';
import { RouterLink, useRouter, type RouteLocationRaw } from 'vue-router';
import { useMessages } from '../composables/useMessages';
import { useImageSrc } from '../composables/useImageSrc';
import type { MusicAlbum } from '../types/music';
import Icon from './Icon.vue';

const props = defineProps<{
  album: MusicAlbum;
  /** Route the card links to when it has one. Absent → button + `click` emit. */
  to?: RouteLocationRaw;
}>();

defineEmits<{
  (e: 'click', album: MusicAlbum): void;
}>();

// `useRouter()` is inject-based and undefined for standalone mounts — which is
// exactly the branch signal needed: anchor mode requires BOTH a destination and
// a router to resolve and intercept it.
const router = useRouter();

const { t } = useMessages();
/** S241: album art may be a root-relative server path; resolve against the media base. */
const { imgSrc } = useImageSrc();

const trackCountLabel = computed(() => {
  const count = props.album.totalTracks ?? 0;
  return t('music.tracksTotal', { count: count.toLocaleString() });
});

function formatYear(year: number | null): string {
  return year ? String(year) : '—';
}
</script>

<template>
  <article class="album-card">
    <div class="album-card__cover-wrap">
      <img
        v-if="album.albumArtUrl"
        :src="imgSrc(album.albumArtUrl)"
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
        <span class="album-card__tracks" data-count="tracks">
          {{ trackCountLabel }}
        </span>
      </span>
    </div>
    <RouterLink v-if="to && router" :to="to" custom v-slot="{ href, navigate }">
      <!-- M-UI-11 sink census — EXPLICITLY TRUSTED, no safeHref: `href` is
           vue-router's own resolution of the app-declared `to` location
           ({name, params}); no wire-supplied URL reaches this binding. -->
      <a :href="href" class="album-card__link" :aria-label="album.title" @click="navigate" />
    </RouterLink>
    <button
      v-else
      type="button"
      class="album-card__link"
      :aria-label="album.title"
      @click="$emit('click', album)"
    />
  </article>
</template>

<style scoped>
.album-card {
  /* CU-115: root is a plain <article>; the interactive affordance is the
     stretched overlay below (anchor when `to` is given, button otherwise). */
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 12px);
  padding: var(--space-3, 12px);
  border-radius: var(--radius-lg, 12px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  text-align: left;
  transition:
    border-color var(--dur-fast, 0.18s) var(--ease-out, ease),
    transform var(--dur-fast, 0.18s) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}
.album-card:hover {
  border-color: var(--border-strong, #52525b);
  transform: translateY(-2px);
}
.album-card__link {
  position: absolute;
  inset: 0;
  /* the overlay covers the padding box; the radius keeps its focus ring on
     the card's silhouette */
  border-radius: inherit;
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
.album-card__link:focus-visible {
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
