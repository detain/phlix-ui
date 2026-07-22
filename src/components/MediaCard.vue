<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

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
import { RouterLink, routerKey } from 'vue-router';
import Icon from './Icon.vue';
import ThumbRating from './ThumbRating.vue';
import Menu from './ui/Menu.vue';
import type { MediaItem, PosterSrcsetInput } from '../types/media-item';
import type { PhlixAppConfig } from '../app/types';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { usePrefetch } from '../composables/usePrefetch';
import { resolvePosterSources } from './media-poster';
import { mediaTypeIcon } from '../utils/mediaTypeIcon';
import { buildMediaItemMenu, MENU_LABELS } from './mediaItemMenu';
import { api } from '../api/client';

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
     * Hint to the browser about the relative loading priority of this poster
     * (maps directly to the HTML `fetchpriority` attribute). `high` is
     * appropriate for above-the-fold or first-row posters to improve LCP.
     */
    fetchPriority?: 'high' | 'low' | 'auto';
    /**
     * Admin opt-in (U5): render a "Match" quick-action that emits `match` so the
     * host can open the interactive metadata-match modal for this item. Off by
     * default; the host gates it on `isAdmin`. Keeps the card layout intact.
     */
    canMatch?: boolean;
    /**
     * Suppress the hover action row (Play/Watched/Favorite/Rating/Info/Menu).
     * Used when the card is purely navigational — e.g. the season grid on the
     * series page, where per-item favorite/rating/watched don't apply and the
     * card just links to the season. The poster, badges, hover-lift, title
     * overlay and caption are unchanged, so it stays visually the library card.
     */
    hideActions?: boolean;
    /**
     * Render ONLY the Play quick-action in the hover row (no rating/favorite/
     * watched/info/menu). Used by the season grid on the series page: the card
     * stays purely navigational (poster → season page) but gains a Play button
     * that starts whole-season playback via the `play` emit. Ignored when
     * `hideActions` is set (that suppresses the row entirely).
     */
    playOnly?: boolean;
    /**
     * Override the caption sub-line (defaults to year · runtime). Used by the
     * season grid to show "N episodes" while reusing this exact card design.
     */
    subtitle?: string | null;
  }>(),
  { newWithinDays: 30, canMatch: false, hideActions: false, playOnly: false, subtitle: null },
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
  (e: 'edit-metadata', item: MediaItem): void;
  /**
   * Admin ⋯-menu "Explore item data" — request the host open its raw
   * item-data / metadata inspector for this item. The card already holds the
   * full `MediaItem` (all metadata is client-side), so it emits the item to the
   * host rather than owning an inspector UI itself — mirroring the
   * `edit-metadata` host-event pattern. The host (admin surfaces) wires this to
   * its data-inspector panel/modal.
   */
  (e: 'explore-data', item: MediaItem): void;
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

// Router instance for SPA navigation (null when router unavailable, e.g. standalone mounts).
const router = inject(routerKey, null);

/** Whether THIS item is currently favorited per the store (false when unknown). */
const isFavorited = computed(() => userItemData.isFavorite(props.item.id));

/** Current −2..2 thumbs rating for THIS item per the store (0 when unknown). */
const loveLevel = computed(() => userItemData.likeLevel(props.item.id));

/** Whether the current user is an admin. */
const isAdmin = computed(() => auth.isAdmin);

/** Whether this item is marked watched by the user (drives the eye toggle). */
const isWatched = computed(() => userItemData.isWatched(props.item.id));

const menuOpen = ref(false);

const isSeriesOrSeason = computed(() => props.item.type === 'series' || props.item.type === 'season');

/**
 * Menu items built lazily — computed ONLY when menuOpen is true (Menu mounts).
 * A 40-card window was eagerly building ~400 Menu instances (10 buttons each)
 * even though only a handful are ever opened; this defers the build until the
 * user actually clicks ⋯ on a card. The void isAdmin.value forces Vue to track
 * isAdmin as a dependency so the menu refreshes if admin status changes mid-open.
 */
const menuItems = computed(() => {
  void isAdmin.value;
  if (!menuOpen.value) return [] as ReturnType<typeof buildMediaItemMenu>;
  return buildMediaItemMenu(props.item, {
    isAdmin: isAdmin.value,
    isWatched: isWatched.value,
    isSeriesOrSeason: isSeriesOrSeason.value,
    canChoosePoster: isAdmin.value,
  });
});

function onMenuSelect(menuItem: { label: string }): void {
  const L = MENU_LABELS;
  const toasts = useToastStore();
  switch (menuItem.label) {
    case L.markPlayed:
    case L.markUnplayed:
      onWatched();
      break;
    case L.like:
      void userItemData.setLike(props.item.id, 1, phlixConfig?.apiBase ?? '');
      break;
    case L.dislike:
      void userItemData.setLike(props.item.id, -1, phlixConfig?.apiBase ?? '');
      break;
    case L.addToPlaylist: {
      const name = window.prompt('Enter playlist name:');
      if (!name?.trim()) break;
      const trimmed = name.trim();
      toasts.info('Creating playlist\u2026');
      api
        .createPlaylist(trimmed, props.item.id)
        .then(() => toasts.success('Playlist created'))
        .catch((err) => {
          toasts.error('Failed to create playlist', {
            message: err instanceof Error ? err.message : String(err),
          });
        });
      break;
    }
    case L.download:
      toasts.info('Preparing download\u2026');
      api
        .getDownloadUrl(props.item.id)
        .then(({ url }) => {
          window.open(url, '_blank', 'noopener');
          toasts.success('Download started');
        })
        .catch((err) => {
          toasts.error('Download failed', {
            message: err instanceof Error ? err.message : String(err),
          });
        });
      break;
    case L.missingEpisodes:
      toasts.info('Loading\u2026');
      api
        .getMissingEpisodes(props.item.id)
        .then((report) => {
          // The server returns an envelope { total_expected, total_existing,
          // missing_episodes: [...] } \u2014 NOT a bare array. The canonical count is
          // the length of missing_episodes (robust even when the item has extra
          // episodes beyond episode_count, where total_expected - total_existing
          // would under-count). Previously read `.length` off the envelope object,
          // so the count was always `undefined` and the zero-missing branch never
          // fired (the toast read "undefined episodes missing").
          const count = report.missing_episodes.length;
          if (count === 0) {
            toasts.success('No missing episodes');
          } else {
            toasts.warning(`${count} episode${count === 1 ? '' : 's'} missing`);
          }
        })
        .catch((err) => {
          toasts.error('Failed to load missing episodes', {
            message: err instanceof Error ? err.message : String(err),
          });
        });
      break;
    case L.shuffle:
      api
        .shufflePlay(props.item.id)
        .then(() => toasts.success('Shuffle play started'))
        .catch((err) => {
          toasts.error('Shuffle play failed', {
            message: err instanceof Error ? err.message : String(err),
          });
        });
      break;
    case L.editMetadata:
      emit('edit-metadata', props.item);
      break;
    case L.exploreData:
      // "Explore item data" — open the host's item-data inspector for this item
      // (the full MediaItem is already client-side). Emits the item to the host,
      // mirroring `edit-metadata`; NOT a dead "isn't available yet" toast.
      emit('explore-data', props.item);
      break;
    case L.matchMetadata:
      emit('refresh', props.item);
      break;
    case L.editImages:
      emit('choose-poster', props.item);
      break;
    case L.remove:
      emit('remove', props.item);
      break;
    default:
      toasts.info(`${menuItem.label} isn't available yet`);
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

/**
 * Watched (eye) quick-action handler. Flips the watched flag in the store
 * (optimistic + rollback + one markWatched/markUnwatched write there) AND
 * re-emits `mark-watched` so the host page's toast wiring runs. Mirrors
 * `onFavorite` exactly — the host handler must NOT toggle again, only report the
 * resulting state. Also invoked by the ⋯ menu's Mark watched/unwatched item.
 */
function onWatched(): void {
  void userItemData.toggleWatched(props.item.id, phlixConfig?.apiBase ?? '');
  emit('mark-watched', props.item);
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

/**
 * UI-2.5 [U-R2] — lazy-MOUNT the overlay action row only while the card is
 * hovered or keyboard-focused (it is CSS-hidden until then anyway). A 40-card
 * windowed grid was eagerly mounting ~400 invisible Play/Rating/Favorite/
 * Watched/Info/⋯-Menu/Match instances every time a row scrolled into the
 * window; deferring the mount keeps them out of the component tree until the
 * user actually reaches the card.
 *
 * Keyboard accessibility is PRESERVED: the stretched `.media-card__link`
 * anchor is a real focusable entry point, so tabbing onto the card fires
 * `focusin` and reveals the action row BEFORE the user can tab into the
 * buttons. `focusout` only collapses the row when focus truly leaves the card
 * (relatedTarget is outside), so moving focus link → Play never yanks the row.
 *
 * Coarse-pointer (touch) devices have no hover; the CSS `@media (hover: none)`
 * rule reveals the overlay permanently there, so we keep the actions mounted on
 * touch to preserve the single-tap-to-Play behaviour.
 */
const hovered = ref(false);
const focused = ref(false);
const coarsePointer =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: none)').matches;
const actionsVisible = computed(
  () => !props.hideActions && (hovered.value || focused.value || coarsePointer),
);

function onPointerEnter(): void {
  hovered.value = true;
  prefetchTarget();
}
function onPointerLeave(): void {
  hovered.value = false;
}
function onFocusIn(): void {
  focused.value = true;
  prefetchTarget();
}
function onFocusOut(e: FocusEvent): void {
  // Collapse only when focus actually LEFT the card. Moving focus from the
  // stretched link INTO a just-revealed action button keeps focus within the
  // card (relatedTarget is a descendant), so the row must stay mounted.
  const next = e.relatedTarget as Node | null;
  const root = e.currentTarget as HTMLElement | null;
  if (!next || !root || !root.contains(next)) {
    focused.value = false;
  }
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
  <article
    class="media-card"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div class="media-card__poster">
      <!-- SPA navigation via RouterLink (intercepts left-click for ~100ms SPA nav);
           falls back to plain anchor when router is unavailable (standalone mounts).
           The raw anchor href is preserved so middle-click/SEO/copy-link work. -->
      <RouterLink v-if="router" :to="href" custom v-slot="{ navigate }">
        <!-- @click (NOT @click.prevent): vue-router's navigate calls preventDefault
             itself only when it actually SPA-navigates, and lets ctrl/cmd/shift/middle
             clicks fall through to the native href for new-tab. A .prevent here would
             set defaultPrevented before navigate, making guardEvent bail → dead click. -->
        <a :href="href" class="media-card__link" :aria-label="item.name" @click="navigate">
          <span class="visually-hidden">{{ item.name }}</span>
        </a>
      </RouterLink>
      <a v-else :href="href" class="media-card__link" :aria-label="item.name">
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
        :fetchpriority="fetchPriority"
        @load="onLoad"
      />
      <div v-else class="media-card__fallback" aria-hidden="true">
        <Icon :name="mediaTypeIcon(item.type)" />
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
        <!-- Lazy-mounted (UI-2.5 [U-R2]): only present while hovered/focused
             (or on touch). CSS reveal still animates opacity/pointer-events. -->
        <div v-if="actionsVisible" class="media-card__actions">
          <!-- [ Play ] -->
          <button
            type="button"
            class="media-card__iconbtn media-card__iconbtn--play"
            aria-label="Play"
            @click.stop.prevent="emit('play', item)"
          >
            <Icon name="play" />
          </button>

          <!-- Everything past Play is suppressed in `playOnly` mode (season
               cards: navigational + whole-season Play, nothing else). -->
          <template v-if="!playOnly">
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

          <!-- [ Watched ] — eye toggle. Open eye = watched, closed (slashed) eye =
               not watched. Click flips the per-user watched flag (store optimistic
               + one write). -->
          <button
            type="button"
            class="media-card__iconbtn media-card__iconbtn--watched"
            :class="{ 'is-active': isWatched }"
            :aria-label="isWatched ? 'Mark as unwatched' : 'Mark as watched'"
            :aria-pressed="isWatched ? 'true' : 'false'"
            @click.stop.prevent="onWatched"
          >
            <Icon :name="isWatched ? 'eye' : 'eye-off'" />
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

          <!-- [ ⋯ Menu ] — the trigger MUST call the Menu's own `toggle` (from
               the slot): `@click.stop.prevent` keeps the click off the card's
               stretched link, but `.stop` also prevents it bubbling to the Menu
               wrapper's own click handler, so without calling `toggle` here the
               menu would never open. -->
          <Menu v-model:open="menuOpen" :items="menuItems" @select="onMenuSelect">
            <template #default="{ toggle }">
              <button
                type="button"
                class="media-card__iconbtn"
                aria-label="More actions"
                :aria-expanded="menuOpen ? 'true' : 'false'"
                aria-haspopup="menu"
                @click.stop.prevent="toggle"
              >
                <Icon name="more" />
              </button>
            </template>
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
          </template>
        </div>
      </div>
    </div>

    <div class="media-card__caption">
      <div class="media-card__caption-title" :title="item.name">{{ item.name }}</div>
      <div class="media-card__caption-sub numeric">
        <template v-if="subtitle != null">{{ subtitle }}</template>
        <template v-else>
          <template v-if="item.year">{{ item.year }}</template>
          <template v-if="item.year && item.runtime"> · </template>
          <template v-if="item.runtime">{{ item.runtime }}m</template>
        </template>
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
  transition: transform var(--dur-slow) var(--ease-out);
}
/* Shadow layer: box-shadow lives here; only opacity is animated (compositor-only,
   avoids per-frame paint on hover). pointer-events: none ensures clicks pass through. */
.media-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-out);
  box-shadow: var(--shadow-4);
  pointer-events: none;
  z-index: -1;
}
.media-card:hover,
.media-card:focus-within {
  transform: translateY(-8px) scale(1.025);
}
.media-card:hover::after,
.media-card:focus-within::after {
  opacity: 1;
}
/* Focus ring: additive on top of shadow for :focus-within */
.media-card:focus-within::after {
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
  margin-top: var(--space-3);
  display: flex;
  align-items: center;
  /* WRAP so the full set of quick-actions (Play/Rating/Favorite/Watched/Info/
     Menu/Match) never overflows the clipped poster and gets cut off on narrow
     cards — the old nowrap row shrank buttons to unusable slivers or clipped
     them past the poster's right edge. */
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-1);
  /* Reclaim part of the overlay's --space-4 side padding for the action row only
     (title/meta keep the full inset) so all 8 quick-actions fit 2 rows of 4 even
     on the narrower Browse-rail cards (160–180px vs the ≥200px library grid).
     8px still separates the outermost buttons from the poster edge. */
  margin-inline: calc(-1 * var(--space-2));
  /* Cap each row at four 32px buttons (the thumbs widget is one flex item holding
     two of them: 32+4+32=68 ⇒ both row compositions come to 140px), so the full
     8-button set lays out as 2 rows of 4 on EVERY card width — the rail cards
     stop wrapping into 3 ragged rows and the wider library cards can't stretch
     to 5-per-row either. */
  max-width: calc(4 * 32px + 3 * var(--space-1));
  /* Off by default so an idle (opacity:0) overlay never swallows clicks meant
     for the stretched link; enabled once the overlay is actually shown. */
  pointer-events: none;
}
.media-card:hover .media-card__actions,
.media-card:focus-within .media-card__actions {
  pointer-events: auto;
}
/* The thumbs widget defaults to `var(--text)` (near-black on daylight) — force it
   WHITE + non-shrinking + slightly smaller in the (always-dark) card overlay, and
   give it the same legibility drop-shadow as the icon buttons. Scoped to the card
   so ThumbRating on the light detail page keeps its themed colour. */
.media-card__actions :deep(.thumb-rating) {
  flex: 0 0 auto;
  gap: var(--space-1);
}
.media-card__actions :deep(.thumb-rating__btn) {
  /* 2rem — matches .media-card__iconbtn so a row of four fits the rail cards. */
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  color: #fff;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.65));
}
.media-card__actions :deep(.thumb-rating__btn.is-blue) {
  color: var(--thumb-blue, #3b82f6);
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
  flex: 0 0 auto;
  /* 2rem touch target — small enough that four buttons + gaps fit the 160–180px
     rail cards (2 rows of 4), no smaller. */
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  /* ALWAYS-white wireframe icons over the (always-dark) overlay gradient — the
     old `var(--text)` was near-black on the daylight theme, so the buttons were
     invisible on light mode. A drop-shadow keeps them legible over bright poster
     areas too. No button chrome, so the overlay reads as icons over the poster. */
  color: #fff;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.65));
  transition: transform var(--dur-fast) var(--ease-spring), color var(--dur-base) var(--ease-out);
}
/* Hover feedback without a background: tint amber + a small scale. */
.media-card__iconbtn:hover {
  transform: scale(1.12);
  color: var(--accent);
}
.media-card__iconbtn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
/* Active (saved/watched) state tints amber. */
.media-card__iconbtn.is-active {
  color: var(--accent);
}
/* Favorited: the bookmark renders FILLED + amber so it reads as "saved". The
   watched eye only tints (a filled eyeball reads poorly), so it's excluded. */
.media-card__iconbtn.is-active:not(.media-card__iconbtn--watched) :deep(svg) {
  fill: currentColor;
}
/* The Play button is styled EXACTLY like its siblings — white idle glyph, amber
   only on hover/focus/active (the old permanently-amber 40px special case made it
   the odd one out and overflowed the rail cards' 2×4 action layout). The modifier
   class is kept as a stable hook for tests/hosts. */

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
