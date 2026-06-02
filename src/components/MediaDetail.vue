<script setup lang="ts">
/**
 * MediaDetail (R2.5) — the title detail surface (`/app/media/:id`).
 *
 * Presentational: a poster-derived ambient glow behind a hero (poster + title,
 * meta, genre/cast chips, overview) with Play / Resume / +Watchlist actions, and
 * a "More like this" rail below. Driven purely by props so it is easy to test;
 * the page container (`MediaDetailPage.vue`) fetches the item + similar list and
 * wires navigation. Degrades gracefully when metadata is sparse (missing poster,
 * overview, cast, runtime…). Keyboard-operable, reduced-motion safe, no emoji.
 */
import { computed, ref, onMounted } from 'vue';
import type { MediaItem } from '../types/media-item';
import Icon from './Icon.vue';
import Button from './ui/Button.vue';
import Chip from './ui/Chip.vue';
import MediaRow from './MediaRow.vue';

const props = withDefaults(
  defineProps<{
    item: MediaItem;
    /** Persisted resume position (seconds) — shows the Resume action when set. */
    resumeSeconds?: number | null;
    /** "More like this" items. */
    similar?: MediaItem[];
    /** Similar rail is still loading. */
    similarLoading?: boolean;
    /** Show a back affordance (emits `back`). */
    showBack?: boolean;
  }>(),
  { resumeSeconds: null, similar: () => [], similarLoading: false, showBack: true },
);

const emit = defineEmits<{
  (e: 'play', item: MediaItem): void;
  (e: 'resume', item: MediaItem): void;
  (e: 'watchlist', item: MediaItem): void;
  (e: 'info', item: MediaItem): void;
  (e: 'back'): void;
}>();

const fallbackIcon = computed(() =>
  props.item.type === 'audio' ? 'music' : props.item.type === 'image' ? 'image' : props.item.type === 'series' ? 'tv' : 'film',
);

const cast = computed(() => props.item.actors?.slice(0, 8) ?? []);

/** Format the resume seconds as h:mm:ss / m:ss for the Resume label. */
const resumeLabel = computed(() => {
  const s = props.resumeSeconds;
  if (!s || s <= 0) return null;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  return `${h > 0 ? `${h}:` : ''}${mm}:${String(sec).padStart(2, '0')}`;
});

const loaded = ref(false);
const imgEl = ref<HTMLImageElement | null>(null);
function onLoad() {
  loaded.value = true;
}
onMounted(() => {
  if (imgEl.value?.complete) loaded.value = true;
});
</script>

<template>
  <article class="media-detail">
    <div
      v-if="item.poster_url"
      class="media-detail__ambient"
      :style="{ backgroundImage: `url(${item.poster_url})` }"
      aria-hidden="true"
    />

    <div class="media-detail__bar">
      <Button v-if="showBack" variant="ghost" size="sm" left-icon="arrow-left" @click="emit('back')">Back</Button>
    </div>

    <div class="media-detail__hero">
      <div class="media-detail__poster">
        <img
          v-if="item.poster_url"
          ref="imgEl"
          class="media-detail__img"
          :class="{ 'is-loaded': loaded }"
          :src="item.poster_url"
          :alt="item.name"
          decoding="async"
          @load="onLoad"
        />
        <div v-else class="media-detail__fallback" aria-hidden="true"><Icon :name="fallbackIcon" /></div>
      </div>

      <div class="media-detail__info">
        <h1 class="media-detail__title">{{ item.name }}</h1>

        <div class="media-detail__meta numeric">
          <span v-if="item.year" class="media-detail__meta-item">
            <Icon name="calendar" class="media-detail__meta-icon" />{{ item.year }}
          </span>
          <span v-if="item.rating" class="media-detail__cert">{{ item.rating }}</span>
          <span v-if="item.runtime" class="media-detail__meta-item">{{ item.runtime }}m</span>
          <span class="media-detail__type">{{ item.type }}</span>
        </div>

        <div v-if="item.genres?.length" class="media-detail__genres">
          <Chip v-for="g in item.genres" :key="g" size="sm">{{ g }}</Chip>
        </div>

        <p class="media-detail__overview">{{ item.overview || 'No overview available.' }}</p>

        <div class="media-detail__actions">
          <Button variant="solid" left-icon="play" @click="emit('play', item)">Play</Button>
          <Button v-if="resumeLabel" variant="outline" left-icon="rewind" @click="emit('resume', item)">
            Resume <span class="media-detail__resume-at numeric">{{ resumeLabel }}</span>
          </Button>
          <Button variant="ghost" left-icon="bookmark-plus" @click="emit('watchlist', item)">Watchlist</Button>
        </div>

        <dl v-if="item.director || cast.length" class="media-detail__credits">
          <div v-if="item.director" class="media-detail__credit">
            <dt>Director</dt>
            <dd>{{ item.director }}</dd>
          </div>
          <div v-if="cast.length" class="media-detail__credit">
            <dt>Cast</dt>
            <dd class="media-detail__cast">
              <Chip v-for="a in cast" :key="a" size="sm" icon="user">{{ a }}</Chip>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <MediaRow
      v-if="similarLoading || similar.length"
      class="media-detail__similar"
      title="More like this"
      :items="similar"
      :loading="similarLoading"
      hide-when-empty
      @play="emit('play', $event)"
      @watchlist="emit('watchlist', $event)"
      @info="emit('info', $event)"
    />
  </article>
</template>

<style scoped>
.media-detail {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}

/* poster-derived ambient glow */
.media-detail__ambient {
  position: absolute;
  inset: 0 0 auto 0;
  height: 60vh;
  z-index: 0;
  background-size: cover;
  background-position: center top;
  opacity: 0.18;
  filter: blur(60px) saturate(1.3);
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, #000, transparent);
  mask-image: linear-gradient(to bottom, #000, transparent);
}

.media-detail__bar {
  position: relative;
  z-index: 1;
  margin-bottom: var(--space-4);
}

.media-detail__hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 280px) 1fr;
  gap: var(--space-8);
  align-items: start;
}

.media-detail__poster {
  position: relative;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: linear-gradient(145deg, var(--surface-3), var(--surface));
  box-shadow: var(--shadow-4);
}
.media-detail__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-out);
}
.media-detail__img.is-loaded {
  opacity: 1;
}
.media-detail__fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 3rem;
  color: var(--text-subtle);
}

.media-detail__title {
  font-family: var(--font-display);
  font-weight: var(--font-bold);
  font-size: var(--text-3xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-3);
}

.media-detail__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-muted);
  font-size: var(--text-sm);
  margin-bottom: var(--space-4);
}
.media-detail__meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}
.media-detail__meta-icon {
  font-size: var(--text-sm);
}
.media-detail__cert {
  padding: 1px var(--space-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  font-weight: var(--font-semibold);
  font-size: var(--text-xs);
}
.media-detail__type {
  text-transform: capitalize;
  color: var(--text-subtle);
}

.media-detail__genres {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.media-detail__overview {
  max-width: 60ch;
  color: var(--text-muted);
  line-height: var(--leading-relaxed, 1.6);
  margin-bottom: var(--space-6);
}

.media-detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}
.media-detail__resume-at {
  margin-left: var(--space-1);
  opacity: 0.8;
  font-size: var(--text-xs);
}

.media-detail__credits {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
}
.media-detail__credit {
  display: flex;
  gap: var(--space-3);
  align-items: baseline;
}
.media-detail__credit dt {
  flex: 0 0 4.5rem;
  color: var(--text-subtle);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
.media-detail__credit dd {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.media-detail__cast {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.media-detail__similar {
  position: relative;
  z-index: 1;
  margin-top: var(--space-10);
}

@media (max-width: 720px) {
  .media-detail__hero {
    grid-template-columns: 1fr;
  }
  .media-detail__poster {
    max-width: 220px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .media-detail__img {
    transition: none;
  }
}
</style>
