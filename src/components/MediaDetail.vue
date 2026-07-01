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
import { computed, ref, onMounted, inject } from 'vue';
import type { MediaItem } from '../types/media-item';
import type { PhlixAppConfig } from '../app/types';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { useAuthStore } from '../stores/useAuthStore';
import Icon from './Icon.vue';
import ThumbRating from './ThumbRating.vue';
import Button from './ui/Button.vue';
import Menu from './ui/Menu.vue';
import Chip from './ui/Chip.vue';
import MediaRow from './MediaRow.vue';
import { buildMediaItemMenu } from './mediaItemMenu';

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
    /** Admin opt-in (U5): render a "Match metadata" action that emits `match`. */
    canMatch?: boolean;
  }>(),
  { resumeSeconds: null, similar: () => [], similarLoading: false, showBack: true, canMatch: false },
);

const emit = defineEmits<{
  (e: 'play', item: MediaItem): void;
  (e: 'resume', item: MediaItem): void;
  (e: 'watchlist', item: MediaItem): void;
  (e: 'info', item: MediaItem): void;
  (e: 'match', item: MediaItem): void;
  /** A cast/crew member was clicked — host navigates to the person-filtered listing. */
  (e: 'actor', name: string): void;
  /** A genre chip was clicked — host navigates to the genre-filtered listing. */
  (e: 'genre', name: string): void;
  /** A production-company / studio chip was clicked — host navigates to the
   *  company-filtered listing. */
  (e: 'company', name: string): void;
  (e: 'back'): void;
  (e: 'mark-watched', item: MediaItem): void;
  (e: 'refresh', item: MediaItem): void;
  (e: 'choose-poster', item: MediaItem): void;
  (e: 'remove', item: MediaItem): void;
}>();

// Per-user favorite/rating/love state (Feature 17). The hero "Watchlist"/favorite
// control flips this store optimistically (the SAME contract as MediaCard's
// `onFavorite`, Step 17.3) and persists once; the host page's `watchlist` handler
// still runs for back-compat but does NOT toggle again. `apiBase` is read from the
// app config exactly like MediaCard/Player.vue (`inject('phlixConfig')`) — NOT a
// new source — and threaded into the store's `toggleFavorite(id, apiBase)` (the
// store keeps no global apiBase).
const userItemData = useUserItemDataStore();
const phlixConfig = inject<PhlixAppConfig | null>('phlixConfig', null);
const auth = useAuthStore();

/** Whether THIS item is currently favorited per the store (false when unknown). */
const isFavorited = computed(() => userItemData.isFavorite(props.item.id));

/**
 * Hero favorite/Watchlist handler. Flips the favorite flag in the store
 * (optimistic + rollback there) AND persists via one network call, THEN re-emits
 * `watchlist` so existing host wiring (MediaDetailPage) keeps working — the store
 * wiring is additive and matches MediaCard's `onFavorite` shape exactly so the
 * page handler (which never toggles) reads the correct post-toggle state.
 */
function onFavorite(): void {
  void userItemData.toggleFavorite(props.item.id, phlixConfig?.apiBase ?? '');
  emit('watchlist', props.item);
}

/** Current −2..2 thumbs rating for THIS item per the store (0 when unknown). */
const loveLevel = computed(() => userItemData.likeLevel(props.item.id));

/** Whether the current user is an admin. */
const isAdmin = computed(() => auth.isAdmin);

/** Whether this item is marked watched by the user (drives the eye toggle). */
const isWatched = computed(() => userItemData.isWatched(props.item.id));

/**
 * Hero Watched handler. Flips the watched flag in the store (optimistic +
 * rollback + one markWatched/markUnwatched write there) AND re-emits
 * `mark-watched` for the host toast — mirrors `onFavorite`. Also invoked by the
 * ⋯ menu's Mark watched/unwatched item.
 */
function onWatched(): void {
  void userItemData.toggleWatched(props.item.id, phlixConfig?.apiBase ?? '');
  emit('mark-watched', props.item);
}

/**
 * Outbound links to the metadata providers this title is matched to, built from
 * `item.external_ids` ({tmdb, imdb, tvdb, anidb, …}). TMDB movies vs. TV use
 * different path segments, so the type drives the tmdb URL. Only providers with
 * a non-empty id render.
 */
const providerLinks = computed<Array<{ key: string; label: string; url: string }>>(() => {
  const ids = props.item.external_ids;
  if (!ids) return [];
  const tmdbKind = props.item.type === 'movie' ? 'movie' : 'tv';
  const builders: Record<string, { label: string; url: (id: string) => string }> = {
    tmdb: { label: 'TMDB', url: (id) => `https://www.themoviedb.org/${tmdbKind}/${encodeURIComponent(id)}` },
    imdb: { label: 'IMDb', url: (id) => `https://www.imdb.com/title/${encodeURIComponent(id)}/` },
    tvdb: { label: 'TheTVDB', url: (id) => `https://thetvdb.com/dereferrer/series/${encodeURIComponent(id)}` },
    anidb: { label: 'AniDB', url: (id) => `https://anidb.net/anime/${encodeURIComponent(id)}` },
    tvmaze: { label: 'TVmaze', url: (id) => `https://www.tvmaze.com/shows/${encodeURIComponent(id)}` },
    trakt: { label: 'Trakt', url: (id) => `https://trakt.tv/search/trakt/${encodeURIComponent(id)}` },
  };
  const links: Array<{ key: string; label: string; url: string }> = [];
  for (const [key, raw] of Object.entries(ids)) {
    const id = typeof raw === 'string' ? raw.trim() : raw != null ? String(raw).trim() : '';
    if (!id) continue;
    const b = builders[key.toLowerCase()];
    if (b) links.push({ key, label: b.label, url: b.url(id) });
  }
  return links;
});

const menuOpen = ref(false);

const menuItems = computed(() =>
  buildMediaItemMenu(props.item, {
    isAdmin: isAdmin.value,
    isWatched: isWatched.value,
    canChoosePoster: isAdmin.value,
  }),
);

function onMenuSelect(item: { label: string }): void {
  switch (item.label) {
    case 'Mark watched':
    case 'Mark unwatched':
      onWatched();
      break;
    case 'Refresh/Match…':
      emit('refresh', props.item);
      break;
    case 'Choose poster…':
      emit('choose-poster', props.item);
      break;
    case 'Remove':
      emit('remove', props.item);
      break;
  }
}

/**
 * Persist the thumbs rating in the store (optimistic + rollback + one PUT there).
 * Bound to ThumbRating's `@cycle` ONLY (not `@update:level`) so a single thumb
 * click triggers exactly one store write + one PUT. The widget hands us the
 * already-computed NEXT level on the −2..2 axis.
 */
function onLove(next: number): void {
  void userItemData.setLike(props.item.id, next, phlixConfig?.apiBase ?? '');
}

const fallbackIcon = computed(() =>
  props.item.type === 'audio' ? 'music' : props.item.type === 'image' ? 'image' : props.item.type === 'series' ? 'tv' : 'film',
);

/** A credited person (cast or crew) for the avatar layout. */
interface Person {
  name: string;
  /** Character (cast) or job (crew) sub-label; null when unknown. */
  sub: string | null;
  profileUrl: string | null;
}

/**
 * Cast for the avatar layout — prefer the rich `item.cast` objects (≤12), else
 * fall back to mapping the flat `item.actors` names (older servers / list-shape).
 */
const cast = computed<Person[]>(() => {
  const rich = props.item.cast;
  if (rich?.length) {
    return rich.slice(0, 12).map((c) => ({ name: c.name, sub: c.role ?? null, profileUrl: c.profile_url ?? null }));
  }
  return (props.item.actors ?? []).slice(0, 12).map((name) => ({ name, sub: null, profileUrl: null }));
});

/**
 * Key crew for the avatar layout — prefer the rich `item.crew` objects (≤8), else
 * fall back to the flat `item.director` as a single "Director" entry.
 */
const crew = computed<Person[]>(() => {
  const rich = props.item.crew;
  if (rich?.length) {
    return rich.slice(0, 8).map((c) => ({ name: c.name, sub: c.job ?? null, profileUrl: c.profile_url ?? null }));
  }
  if (props.item.director) return [{ name: props.item.director, sub: 'Director', profileUrl: null }];
  return [];
});

/**
 * Production companies / studios as clickable chips — prefer the rich
 * `item.production_companies` (name + optional logo), else a single chip for the
 * flat `item.studio` when that's all the server sent.
 */
const companies = computed<Array<{ name: string; logoUrl: string | null }>>(() => {
  const rich = props.item.production_companies;
  if (rich?.length) return rich.map((c) => ({ name: c.name, logoUrl: c.logo_url ?? null }));
  if (props.item.studio) return [{ name: props.item.studio, logoUrl: null }];
  return [];
});

/** 1–2 letter initials for an avatar fallback when there's no profile photo. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

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

/** Format bytes as a human-readable size string (e.g. "2.4 GB"). */
function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let value = bytes;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  if (unitIndex === 0 && bytes >= 960) {
    unitIndex = 1;
    value = bytes / 1024;
  }
  if (unitIndex > 0 && Math.round(value) === 1) return `1 ${units[unitIndex]}`;
  return `${value.toFixed(value < 100 ? 1 : 0)} ${units[unitIndex]}`;
}

const loaded = ref(false);
const imgEl = ref<HTMLImageElement | null>(null);
function onLoad() {
  loaded.value = true;
}
onMounted(() => {
  if (imgEl.value?.complete) loaded.value = true;
});

/** Encoded backdrop URL for CSS background-image; null when absent. */
const backdropUrl = computed(() => {
  const url = props.item.backdrop_url;
  return url ? encodeURI(url) : null;
});
</script>

<template>
  <article class="media-detail">
    <div
      v-if="backdropUrl"
      class="media-detail__backdrop"
      :style="{ backgroundImage: `url(${backdropUrl})` }"
      aria-hidden="true"
    />

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
          <button
            v-for="g in item.genres"
            :key="g"
            type="button"
            class="media-detail__genre"
            :aria-label="`Show ${g} titles`"
            @click="emit('genre', g)"
          >
            <Chip size="sm">{{ g }}</Chip>
          </button>
        </div>

        <div v-if="companies.length" class="media-detail__companies">
          <span class="media-detail__companies-label">Studios</span>
          <div class="media-detail__company-list">
            <button
              v-for="c in companies"
              :key="c.name"
              type="button"
              class="media-detail__company"
              :aria-label="`Show ${c.name} titles`"
              @click="emit('company', c.name)"
            >
              <Chip size="sm">
                <img
                  v-if="c.logoUrl"
                  class="media-detail__company-logo"
                  :src="c.logoUrl"
                  :alt="c.name"
                  loading="lazy"
                  decoding="async"
                />
                <span>{{ c.name }}</span>
              </Chip>
            </button>
          </div>
        </div>

        <p class="media-detail__overview">{{ item.overview || 'No overview available.' }}</p>

        <div class="media-detail__actions">
          <Button variant="solid" left-icon="play" @click="emit('play', item)">Play</Button>
          <Button v-if="resumeLabel" variant="outline" left-icon="rewind" @click="emit('resume', item)">
            Resume <span class="media-detail__resume-at numeric">{{ resumeLabel }}</span>
          </Button>
          <Button
            variant="ghost"
            class="media-detail__favorite"
            :class="{ 'is-active': isFavorited }"
            :left-icon="isFavorited ? 'bookmark' : 'bookmark-plus'"
            :aria-label="isFavorited ? 'Remove from favorites' : 'Add to favorites'"
            :aria-pressed="isFavorited ? 'true' : 'false'"
            @click="onFavorite"
          >
            {{ isFavorited ? 'In favorites' : 'Watchlist' }}
          </Button>
          <Button
            variant="ghost"
            class="media-detail__watched"
            :class="{ 'is-active': isWatched }"
            :left-icon="isWatched ? 'eye' : 'eye-off'"
            :aria-label="isWatched ? 'Mark as unwatched' : 'Mark as watched'"
            :aria-pressed="isWatched ? 'true' : 'false'"
            @click="onWatched"
          >
            {{ isWatched ? 'Watched' : 'Mark watched' }}
          </Button>
          <!-- [ Rating ] — thumbs up/down (−2..2 like_level). Only `@cycle` is
               bound (NOT `@update:level`) so each thumb click triggers exactly ONE
               store write + ONE PUT. -->
          <ThumbRating :level="loveLevel" @cycle="onLove" />

          <!-- [ ⋯ Menu ] -->
          <Menu v-model:open="menuOpen" :items="menuItems" @select="onMenuSelect">
            <button type="button" class="media-detail__menu-btn" aria-label="More actions" @click.stop.prevent>
              <Icon name="more" />
            </button>
          </Menu>

          <Button v-if="canMatch" variant="ghost" left-icon="search" @click="emit('match', item)">Match metadata</Button>
        </div>

        <div v-if="providerLinks.length" class="media-detail__links">
          <span class="media-detail__links-label">Links</span>
          <div class="media-detail__links-list">
            <a
              v-for="link in providerLinks"
              :key="link.key"
              class="media-detail__link"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Open on ${link.label} (opens in a new tab)`"
            >
              <span>{{ link.label }}</span>
              <Icon name="arrow-right" class="media-detail__link-icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div v-if="crew.length || cast.length" class="media-detail__credits">
          <section v-if="crew.length" class="media-detail__credit-group">
            <h2 class="media-detail__credit-heading">Crew</h2>
            <ul class="media-detail__people">
              <li v-for="(p, i) in crew" :key="`crew-${i}-${p.name}`">
                <button
                  type="button"
                  class="media-detail__person"
                  :aria-label="`Show titles with ${p.name}`"
                  @click="emit('actor', p.name)"
                >
                  <span class="media-detail__avatar">
                    <img
                      v-if="p.profileUrl"
                      class="media-detail__avatar-img"
                      :src="p.profileUrl"
                      :alt="p.name"
                      loading="lazy"
                      decoding="async"
                    />
                    <span v-else class="media-detail__avatar-initials" aria-hidden="true">{{ initials(p.name) }}</span>
                  </span>
                  <span class="media-detail__person-name">{{ p.name }}</span>
                  <span v-if="p.sub" class="media-detail__person-sub">{{ p.sub }}</span>
                </button>
              </li>
            </ul>
          </section>

          <section v-if="cast.length" class="media-detail__credit-group">
            <h2 class="media-detail__credit-heading">Cast</h2>
            <ul class="media-detail__people">
              <li v-for="(p, i) in cast" :key="`cast-${i}-${p.name}`">
                <button
                  type="button"
                  class="media-detail__person"
                  :aria-label="`Show titles with ${p.name}`"
                  @click="emit('actor', p.name)"
                >
                  <span class="media-detail__avatar">
                    <img
                      v-if="p.profileUrl"
                      class="media-detail__avatar-img"
                      :src="p.profileUrl"
                      :alt="p.name"
                      loading="lazy"
                      decoding="async"
                    />
                    <span v-else class="media-detail__avatar-initials" aria-hidden="true">{{ initials(p.name) }}</span>
                  </span>
                  <span class="media-detail__person-name">{{ p.name }}</span>
                  <span v-if="p.sub" class="media-detail__person-sub">{{ p.sub }}</span>
                </button>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>

    <section v-if="item.files?.length" class="media-detail__files">
      <h2 class="media-detail__files-heading">Files</h2>
      <ul class="media-detail__files-list">
        <li v-for="(file, i) in item.files" :key="i" class="media-detail__file">
          <span class="media-detail__file-path">{{ file.path }}</span>
          <span class="media-detail__file-meta">
            <span v-if="file.container" class="media-detail__file-container">{{ file.container }}</span>
            <span v-if="file.resolution" class="media-detail__file-resolution">{{ file.resolution }}</span>
            <span class="media-detail__file-size">{{ formatBytes(file.size_bytes) }}</span>
          </span>
        </li>
      </ul>
    </section>

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
  max-width: none;
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

/* backdrop layer — full-width background image behind the hero, with dark
   gradient overlay so title/meta text remains readable on top. */
.media-detail__backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%);
}

@media (prefers-reduced-motion: reduce) {
  .media-detail__backdrop {
    transition: none;
  }
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
  margin-bottom: var(--space-4);
}
/* Each genre is a button that filters the listing by that genre. */
.media-detail__genre {
  display: inline-flex;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-full);
}
.media-detail__genre:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.media-detail__genre:hover :deep(.phlix-chip) {
  border-color: var(--accent-ring);
  color: var(--text);
}

.media-detail__companies {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  margin-bottom: var(--space-5);
}
.media-detail__companies-label {
  color: var(--text-subtle);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
.media-detail__company-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.media-detail__company {
  display: inline-flex;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-full);
}
.media-detail__company:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.media-detail__company:hover :deep(.phlix-chip) {
  border-color: var(--accent-ring);
  color: var(--text);
}
.media-detail__company-logo {
  height: 1.1em;
  max-width: 4em;
  object-fit: contain;
  vertical-align: middle;
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
/* Favorited state: the hero favorite button reads filled + amber so it matches
   the card's bookmark and signals the item is saved. */
.media-detail__favorite.is-active {
  color: var(--accent);
}
.media-detail__favorite.is-active :deep(svg) {
  fill: currentColor;
}

/* Menu ⋯ trigger button in the hero action row. Icon-only — NO background box or
   border (the old `surface-glass-strong` fill rendered as an opaque white box on
   the daylight theme, unlike the other ghost actions). Just the foreground glyph
   with an amber hover tint. */
.media-detail__menu-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-spring), color var(--dur-base) var(--ease-out);
}
.media-detail__menu-btn:hover {
  transform: scale(1.08);
  color: var(--text);
}
.media-detail__menu-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

/* Watched state on the hero eye button reads amber like the favorite button. */
.media-detail__watched.is-active {
  color: var(--accent);
}

/* Outbound provider links (TMDB / IMDb / TVDB / AniDB …). */
.media-detail__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  margin-bottom: var(--space-6);
}
.media-detail__links-label {
  color: var(--text-subtle);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
.media-detail__links-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.media-detail__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text-muted);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  text-decoration: none;
  transition: border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.media-detail__link:hover {
  border-color: var(--accent-ring);
  color: var(--text);
}
.media-detail__link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.media-detail__link-icon {
  font-size: 0.85em;
  transform: rotate(-45deg);
  opacity: 0.7;
}

.media-detail__credits {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin: 0;
}
.media-detail__credit-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.media-detail__credit-heading {
  color: var(--text-subtle);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
/* Cast/crew are a grid of poster-shaped cards — the SAME 2:3 tile + caption as
   the library/season cards (was a wall of small round avatars). */
.media-detail__people {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-5);
  list-style: none;
  margin: 0;
  padding: 0;
}
/* Each person is a button that filters the listing by their name. */
.media-detail__person {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-2);
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: var(--radius-lg);
  background: none;
  color: inherit;
  cursor: pointer;
  text-align: left;
  transition: transform var(--dur-slow) var(--ease-out);
}
.media-detail__person:hover .media-detail__avatar {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--shadow-4);
}
.media-detail__person:hover .media-detail__person-name {
  color: var(--text);
}
.media-detail__person:focus-visible {
  outline: none;
}
.media-detail__person:focus-visible .media-detail__avatar {
  box-shadow: var(--shadow-2), 0 0 0 3px var(--accent-ring);
}
.media-detail__avatar {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: linear-gradient(145deg, var(--surface-3), var(--surface));
  box-shadow: var(--shadow-2);
  transition: transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out);
}
.media-detail__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-detail__avatar-initials {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  letter-spacing: var(--tracking-tight);
}
.media-detail__person-name {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  line-height: var(--leading-tight, 1.2);
}
.media-detail__person-sub {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  line-height: var(--leading-tight, 1.2);
}
@media (prefers-reduced-motion: reduce) {
  .media-detail__person,
  .media-detail__avatar {
    transition: none;
  }
  .media-detail__person:hover .media-detail__avatar {
    transform: none;
  }
}

.media-detail__similar {
  position: relative;
  z-index: 1;
  margin-top: var(--space-10);
}

.media-detail__files {
  position: relative;
  z-index: 1;
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-subtle);
  max-width: 800px;
}
.media-detail__files-heading {
  color: var(--text-subtle);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-3);
}
.media-detail__files-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.media-detail__file {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-4);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  font-size: var(--text-sm);
}
.media-detail__file-path {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  color: var(--text-muted);
  word-break: break-all;
  flex: 1;
  min-width: 0;
}
.media-detail__file-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
  color: var(--text-subtle);
  font-size: var(--text-xs);
}
.media-detail__file-container {
  font-family: var(--font-mono, monospace);
  text-transform: uppercase;
}
.media-detail__file-resolution {
  font-family: var(--font-mono, monospace);
}
.media-detail__file-size {
  font-family: var(--font-mono, monospace);
  color: var(--text-muted);
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
