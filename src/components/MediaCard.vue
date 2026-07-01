<script setup lang="ts">
/**
 * MediaCard (R2.1) — the poster card for the Browse surface.
 *
 * Ports the locked R0 art direction (`src/dev/mockups/poster-card.html`): a 2:3
 * blur-up poster (LQIP gradient under a fade-in image — aspect-ratio reserved so
 * there is no CLS; optionally served responsively via `srcset`/`sizes` when sized
 * URLs are supplied, R6.2b), a top badge stack (NEW · quality), a resume-progress bar
 * sourced from `usePlayerStore`, and a cinematic hover/focus overlay with title,
 * cert/meta, genre chips and amber quick-actions (Play / +Watchlist / Info).
 *
 * The whole poster is a stretched link (`to`, default the player route); the
 * quick-action buttons sit above it and emit `play`/`watchlist`/`info` so the
 * host page wires navigation/watchlist. `#badges` and `#actions` slots allow
 * app-specific adornment. Keyboard-activatable (Enter on the link) and
 * reduced-motion safe.
 */
import { computed, ref, onMounted, inject } from 'vue';
import Icon from './Icon.vue';
import ThumbRating from './ThumbRating.vue';
import Menu from './ui/Menu.vue';
import type { MediaItem, PosterSrcsetInput } from '../types/media-item';
import type { PhlixAppConfig } from '../app/types';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { useAuthStore } from '../stores/useAuthStore';
import { usePrefetch } from '../composables/usePrefetch';
import { resolvePosterSources } from './media-poster';
import { buildMediaItemMenu } from './mediaItemMenu';

const props = withDefaults(
  defineProps<{
    item: MediaItem;
    /** Primary link target for the poster (default: the player route). */
    to?: string;
    /** Optional quality tag rendered as a badge, e.g. "4K · HDR" (not on MediaItem). */
    quality?: string;
    /** Days within which a freshly-added item shows the NEW badge. */
    newWithinDays?: number;
    /**
     * Opt-in responsive poster sources for `srcset` (R6.2b) — a ready-made
     * `srcset` string or an array of sized candidates. Overrides the item's own
     * `poster_srcset`; absent → the card uses the single `poster_url`.
     */
    posterSrcset?: PosterSrcsetInput;
    /**
     * `sizes` hint paired with a width-descriptor `srcset`. Defaults to the
     * poster's rendered width when omitted; ignored without responsive sources.
     */
    posterSizes?: string;
    /**
     * Admin opt-in (U5): render a "Match" quick-action that emits `match` so the
     * host can open the interactive metadata-match modal for this item. Off by
     * default; the host gates it on `isAdmin`. Keeps the card layout intact.
     */
    canMatch?: boolean;
  }>(),
  { newWithinDays: 30, canMatch: false },
);

const emit = defineEmits<{
  (e: 'play', item: MediaItem): void;
  (e: 'watchlist', item: MediaItem): void;
  (e: 'info', item: MediaItem): void;
  (e: 'match', item: MediaItem): void;
  (e: 'mark-watched', item: MediaItem): void;
  (e: 'refresh', item: MediaItem): void;
  (e: 'choose-poster', item: MediaItem): void;
  (e: 'remove', item: MediaItem): void;
}>();

const player = usePlayerStore();
const auth = useAuthStore();

// Per-user favorite/rating/love state (Feature 17). The bookmark/favorite button
// flips this store optimistically; the host page's `watchlist` handler still runs
// for back-compat. `apiBase` is read from the app config exactly like Player.vue
// (`inject('phlixConfig')`) — NOT a new source — and threaded into the store's
// `toggleFavorite(id, apiBase)` (the store keeps no global apiBase).
const userItemData = useUserItemDataStore();
const phlixConfig = inject<PhlixAppConfig | null>('phlixConfig', null);

/** Whether THIS item is currently favorited per the store (false when unknown). */
const isFavorited = computed(() => userItemData.isFavorite(props.item.id));

/** Current −2..2 thumbs rating for THIS item per the store (0 when unknown). */
const loveLevel = computed(() => userItemData.likeLevel(props.item.id));

/** Whether the current user is an admin. */
const isAdmin = computed(() => auth.isAdmin);

/** Whether this item is in the user's watched/favorite state. */
const isWatched = computed(() => userItemData.isFavorite(props.item.id));

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
      emit('mark-watched', props.item);
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
 * Persist the thumbs rating for this item in the store (optimistic + rollback +
 * one PUT there). Bound to ThumbRating's `@cycle` ONLY (not `@update:level`) so a
 * single thumb click triggers exactly one store write + one PUT. The widget hands
 * us the already-computed NEXT level on the −2..2 axis.
 */
function onLove(next: number): void {
  void userItemData.setLike(props.item.id, next, phlixConfig?.apiBase ?? '');
}

/**
 * Bookmark/favorite quick-action handler. Flips the favorite flag in the store
 * (optimistic + rollback there) AND re-emits `watchlist` so existing host wiring
 * (BrowsePage/MediaDetailPage) keeps working — the store wiring is additive.
 */
function onFavorite(): void {
  void userItemData.toggleFavorite(props.item.id, phlixConfig?.apiBase ?? '');
  emit('watchlist', props.item);
}

// Clicking a card's poster opens its info/detail page by default — for every
// type, including movies and episodes — so browsing never starts playback by
// surprise. Direct playback is the overlay "Play" button's job (it emits
// `play`). An explicit `to` prop still wins (e.g. a rail that wants the player).
const href = computed(() => props.to ?? `/app/media/${props.item.id}`);

// Warm the destination route's lazy chunk on hover/focus (R6.1c) so navigating
// from the card is instant. Idempotent + best-effort; no-ops without a router.
const { prefetch } = usePrefetch();
function prefetchTarget(): void {
  prefetch(href.value);
}

const loaded = ref(false);
const imgEl = ref<HTMLImageElement | null>(null);
function onLoad() {
  loaded.value = true;
}
onMounted(() => {
  // Cached images may already be complete before the load listener attaches.
  if (imgEl.value?.complete) loaded.value = true;
});

// Responsive poster sources (R6.2b). Prop wins over the item field; with neither
// supplied this resolves to {} so the <img> renders single-src exactly as before.
const posterSources = computed(() =>
  resolvePosterSources(props.posterSrcset ?? props.item.poster_srcset, props.posterSizes),
);

const isNew = computed(() => {
  const created = props.item.created_at;
  if (!created) return false;
  const t = Date.parse(created);
  if (Number.isNaN(t)) return false;
  return Date.now() - t <= props.newWithinDays * 24 * 60 * 60 * 1000;
});

/** Resume fraction (0–1) = persisted resume seconds ÷ runtime seconds. */
const resumeRatio = computed(() => {
  const secs = player.resumePositionFor(props.item.id);
  const runtime = props.item.runtime;
  if (!secs || !runtime || runtime <= 0) return 0;
  return Math.min(1, Math.max(0, secs / (runtime * 60)));
});

const genres = computed(() => props.item.genres?.slice(0, 3) ?? []);
</script>

<template>
  <article class="media-card" @pointerenter="prefetchTarget" @focusin="prefetchTarget">
    <div class="media-card__poster">
      <a :href="href" class="media-card__link" :aria-label="item.name">
        <span class="visually-hidden">{{ item.name }}</span>
      </a>

      <img
        v-if="item.poster_url"
        ref="imgEl"
        class="media-card__img"
        :class="{ 'is-loaded': loaded }"
        :src="item.poster_url"
        :srcset="posterSources.srcset"
        :sizes="posterSources.sizes"
        :alt="item.name"
        loading="lazy"
        decoding="async"
        @load="onLoad"
      />
      <div v-else class="media-card__fallback" aria-hidden="true">
        <Icon :name="item.type === 'audio' ? 'music' : item.type === 'image' ? 'image' : item.type === 'series' ? 'tv' : 'film'" />
      </div>

      <div class="media-card__badges">
        <span v-if="isNew" class="media-card__badge media-card__badge--new">New</span>
        <slot name="badges" :item="item" />
        <span v-if="quality" class="media-card__badge media-card__badge--quality">{{ quality }}</span>
      </div>

      <div
        v-if="resumeRatio > 0"
        class="media-card__progress"
        role="progressbar"
        :aria-valuenow="Math.round(resumeRatio * 100)"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`Resume ${item.name}`"
      >
        <i :style="{ width: `${resumeRatio * 100}%` }" />
      </div>

      <div class="media-card__overlay">
        <h3 class="media-card__title">{{ item.name }}</h3>
        <div class="media-card__meta">
          <span v-if="item.year" class="numeric">{{ item.year }}</span>
          <span v-if="item.year && (item.rating || item.runtime)" class="media-card__dot" />
          <span v-if="item.rating" class="media-card__cert">{{ item.rating }}</span>
          <span v-if="item.rating && item.runtime" class="media-card__dot" />
          <span v-if="item.runtime" class="numeric">{{ item.runtime }}m</span>
        </div>
        <div v-if="genres.length" class="media-card__genres">
          <span v-for="g in genres" :key="g">{{ g }}</span>
        </div>
        <!--
          CANONICAL action-row order (locked cross-wave per plan_missing.md §2 —
          every later W1/W2 card edit must PRESERVE this sequence):
            [ Play ] [ Love(placeholder) ] [ Favorite/Bookmark ] [ Info ]
            [ ⋯ Menu(placeholder) ] [ Match(admin) ]
          Love (10.5/10.6) and the ⋯ menu (W2) are reserved SLOTS here so those
          steps drop their button into the correct position WITHOUT reflowing the
          row. Every button uses @click.stop.prevent so it never falls through to
          the card's stretched info link.
        -->
        <div class="media-card__actions">
          <!-- [ Play ] -->
          <button
            type="button"
            class="media-card__iconbtn media-card__iconbtn--play"
            aria-label="Play"
            @click.stop.prevent="emit('play', item)"
          >
            <Icon name="play" />
          </button>

          <!-- [ Rating ] — thumbs up/down (−2..2 like_level). Only `@cycle` is
               bound (NOT `@update:level`) so each thumb click triggers exactly ONE
               store write + ONE PUT. `.stop.prevent` keeps the click off the
               stretched link. -->
          <ThumbRating
            :level="loveLevel"
            @cycle="onLove"
            @click.stop.prevent
          />

          <!-- [ Favorite/Bookmark ] -->
          <button
            type="button"
            class="media-card__iconbtn"
            :class="{ 'is-active': isFavorited }"
            :aria-label="isFavorited ? 'Remove from favorites' : 'Add to favorites'"
            :aria-pressed="isFavorited ? 'true' : 'false'"
            @click.stop.prevent="onFavorite"
          >
            <Icon :name="isFavorited ? 'bookmark' : 'bookmark-plus'" />
          </button>

          <!-- [ Info ] -->
          <button
            type="button"
            class="media-card__iconbtn"
            aria-label="More info"
            @click.stop.prevent="emit('info', item)"
          >
            <Icon name="info" />
          </button>

          <!-- [ ⋯ Menu ] -->
          <Menu v-model:open="menuOpen" :items="menuItems" @select="onMenuSelect">
            <button type="button" class="media-card__iconbtn" aria-label="More actions" @click.stop.prevent>
              <Icon name="more" />
            </button>
          </Menu>

          <!-- [ Match(admin) ] -->
          <button
            v-if="canMatch"
            type="button"
            class="media-card__iconbtn"
            aria-label="Match metadata"
            @click.stop.prevent="emit('match', item)"
          >
            <Icon name="search" />
          </button>
          <slot name="actions" :item="item" />
        </div>
      </div>
    </div>

    <div class="media-card__caption">
      <div class="media-card__caption-title" :title="item.name">{{ item.name }}</div>
      <div class="media-card__caption-sub numeric">
        <template v-if="item.year">{{ item.year }}</template>
        <template v-if="item.year && item.runtime"> · </template>
        <template v-if="item.runtime">{{ item.runtime }}m</template>
      </div>
    </div>
  </article>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.media-card {
  position: relative;
  width: 100%;
  border-radius: var(--radius-lg);
  background: var(--surface-2);
  isolation: isolate;
  transition: transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out);
}
.media-card:hover,
.media-card:focus-within {
  transform: translateY(-8px) scale(1.025);
  box-shadow: var(--shadow-4);
}
.media-card:focus-within {
  box-shadow: var(--shadow-4), 0 0 0 3px var(--accent-ring);
}

.media-card__poster {
  position: relative;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: linear-gradient(145deg, var(--surface-3), var(--surface));
  box-shadow: var(--shadow-2);
}
/* LQIP tint sits beneath the poster while it loads (blur-up). */
.media-card__poster::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(120% 80% at 30% 20%, var(--amber-900), var(--surface) 70%);
}

.media-card__link {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--radius-lg);
  outline: none;
}
.media-card__link:focus-visible {
  box-shadow: inset 0 0 0 3px var(--accent-ring);
}

.media-card__img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  filter: blur(12px);
  transform: scale(1.04);
  transition: opacity var(--dur-slow) var(--ease-out), filter var(--dur-slow) var(--ease-out),
    transform var(--dur-slower) var(--ease-out);
}
.media-card__img.is-loaded {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}
.media-card:hover .media-card__img.is-loaded,
.media-card:focus-within .media-card__img.is-loaded {
  transform: scale(1.06);
}

.media-card__fallback {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  height: 100%;
  font-size: 2.4rem;
  color: var(--text-subtle);
}

.media-card__badges {
  position: absolute;
  z-index: 3;
  top: var(--space-3);
  left: var(--space-3);
  right: var(--space-3);
  display: flex;
  gap: var(--space-2);
  align-items: flex-start;
  pointer-events: none;
}
.media-card__badge {
  font-size: var(--text-2xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 3px var(--space-2);
  border-radius: var(--radius-sm);
  line-height: 1.4;
  backdrop-filter: blur(8px);
}
.media-card__badge--new {
  background: var(--accent);
  color: var(--accent-contrast);
  box-shadow: var(--shadow-1);
}
.media-card__badge--quality {
  margin-left: auto;
  background: var(--surface-glass-strong);
  color: var(--text);
  border: 1px solid var(--border-strong);
  font-family: var(--font-mono);
}

.media-card__progress {
  position: absolute;
  z-index: 3;
  left: var(--space-3);
  right: var(--space-3);
  bottom: var(--space-3);
  height: 4px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.22);
  overflow: hidden;
  transition: opacity var(--dur-base) var(--ease-out);
}
.media-card__progress > i {
  display: block;
  height: 100%;
  background: var(--accent);
  border-radius: inherit;
  box-shadow: 0 0 8px var(--accent);
}
.media-card:hover .media-card__progress,
.media-card:focus-within .media-card__progress {
  opacity: 0;
}

.media-card__overlay {
  position: absolute;
  z-index: 4;
  inset: 0;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-4);
  background: linear-gradient(
    to top,
    rgba(8, 6, 3, 0.96) 0%,
    rgba(8, 6, 3, 0.78) 32%,
    rgba(8, 6, 3, 0.15) 64%,
    transparent 100%
  );
  opacity: 0;
  transform: translateY(8px);
  transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out);
  pointer-events: none;
}
:global([data-theme='daylight']) .media-card__overlay {
  background: linear-gradient(
    to top,
    rgba(20, 14, 4, 0.94) 0%,
    rgba(20, 14, 4, 0.72) 34%,
    rgba(20, 14, 4, 0.1) 66%,
    transparent 100%
  );
}
.media-card:hover .media-card__overlay,
.media-card:focus-within .media-card__overlay {
  opacity: 1;
  transform: translateY(0);
}
.media-card__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-md);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-snug);
  color: #fff;
}
.media-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-1);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.72);
}
.media-card__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}
.media-card__cert {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  padding: 0 4px;
  line-height: 1.5;
}
.media-card__genres {
  margin-top: var(--space-2);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}
.media-card__genres span {
  font-size: var(--text-2xs);
  color: rgba(255, 255, 255, 0.62);
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
}
.media-card__actions {
  margin-top: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  /* Off by default so an idle (opacity:0) overlay never swallows clicks meant
     for the stretched link; enabled once the overlay is actually shown. */
  pointer-events: none;
}
.media-card:hover .media-card__actions,
.media-card:focus-within .media-card__actions {
  pointer-events: auto;
}

/* Touch devices have no hover, so the overlay never reveals and a first tap on
   the Play button used to fall straight through to the stretched info link
   (`.media-card__link`) — the user saw "the play button just opens the info
   page". On coarse pointers, surface the overlay + arm the quick-actions so a
   single tap on Play starts playback directly. Hover-capable pointers keep the
   reveal-on-hover behaviour above. */
@media (hover: none) {
  .media-card__overlay {
    opacity: 1;
    transform: none;
  }
  .media-card__actions {
    pointer-events: auto;
  }
}
.media-card__iconbtn {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  /* White wireframe icons on a transparent background — no button chrome, so the
     overlay reads as icons over the poster rather than a row of pills. */
  color: var(--text);
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-spring), color var(--dur-base) var(--ease-out);
}
/* Hover feedback without a background: tint amber + a small scale. */
.media-card__iconbtn:hover {
  transform: scale(1.08);
  color: var(--accent);
}
.media-card__iconbtn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
/* Favorited state: the bookmark renders filled + amber so it reads as "saved". */
.media-card__iconbtn.is-active {
  color: var(--accent);
}
.media-card__iconbtn.is-active :deep(svg) {
  fill: currentColor;
}
.media-card__iconbtn--play {
  width: 46px;
  height: 46px;
  /* No background chrome either — the play glyph itself carries the amber accent. */
  background: transparent;
  color: var(--accent);
  border: none;
  box-shadow: none;
  font-size: 1.25rem;
}

.media-card__caption {
  padding: var(--space-3) var(--space-1) 0;
}
.media-card__caption-title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: var(--text-base);
  letter-spacing: var(--tracking-snug);
  line-height: var(--leading-snug);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.media-card__caption-sub {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  margin-top: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .media-card,
  .media-card__img,
  .media-card__overlay,
  .media-card__progress,
  .media-card__iconbtn {
    transition: none;
  }
  .media-card:hover,
  .media-card:focus-within {
    transform: none;
  }
  .media-card__img {
    filter: none;
    transform: none;
  }
}
:global([data-reduced-motion='true']) .media-card,
:global([data-reduced-motion='true']) .media-card__img,
:global([data-reduced-motion='true']) .media-card__overlay {
  transition: none;
}
:global([data-reduced-motion='true']) .media-card:hover,
:global([data-reduced-motion='true']) .media-card:focus-within {
  transform: none;
}
</style>
