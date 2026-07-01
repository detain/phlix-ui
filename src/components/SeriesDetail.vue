<script setup lang="ts">
/**
 * SeriesDetail (U3) — the series surface for `/app/media/:id` when the item is a
 * series. Renders the series hero (poster/overview/genres/year/rating via the
 * shared MediaDetail) and, below it, a GRID OF SEASON CARDS — one per season,
 * each linking to its own per-season page (`/app/media/:id/season/:season`)
 * instead of dumping the whole episode tree inline.
 *
 * Presentational + driven by props (the pre-grouped {@link SeasonGroup}s built by
 * the page container) so it tests without a router/store. It emits the same
 * hero actions as MediaDetail (`play`/`resume`/`watchlist`/`info`/`back`) — the
 * page wires navigation. Season cards are `<RouterLink>`s so they are real,
 * keyboard-operable navigation; a season poster falls back to the series poster.
 */
import { computed, ref, watch, onMounted, onBeforeUnmount, inject } from 'vue';
import type { MediaItem } from '../types/media-item';
import type { SeasonGroup } from './series-grouping';
import { seasonRouteParam } from './series-grouping';
import MediaDetail from './MediaDetail.vue';
import MediaCard from './MediaCard.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import { useMediaApiBase, useMediaDirectBase } from '../composables/useApiBase';
import type { PhlixAppConfig } from '../app/types';

const props = withDefaults(
    defineProps<{
        /** The series item (drives the hero). */
        item: MediaItem;
        /** Pre-grouped seasons for the grid. */
        seasons: SeasonGroup[];
        /** Seasons are still loading (shows a spinner-less skeleton-free busy region). */
        loading?: boolean;
        /** Persisted resume position (seconds) for the hero Resume action. */
        resumeSeconds?: number | null;
        /** The router base so season links carry the `/app` prefix. */
        routerBase?: string;
        /** Admin opt-in (U5): show a "Match metadata" action on the series hero. */
        canMatch?: boolean;
    }>(),
    { loading: false, resumeSeconds: null, routerBase: '/app', canMatch: false },
);

const emit = defineEmits<{
    (e: 'play', item: MediaItem): void;
    (e: 'resume', item: MediaItem): void;
    (e: 'watchlist', item: MediaItem): void;
    (e: 'info', item: MediaItem): void;
    (e: 'match', item: MediaItem): void;
    (e: 'back'): void;
    (e: 'mark-watched', item: MediaItem): void;
    (e: 'refresh', item: MediaItem): void;
    (e: 'choose-poster', item: MediaItem): void;
    (e: 'remove', item: MediaItem): void;
}>();

/** Per-season route path, e.g. `/app/media/sh1/season/2` (Specials → `0`). */
function seasonTo(group: SeasonGroup): string {
    return `${props.routerBase}/media/${props.item.id}/season/${seasonRouteParam(group)}`;
}

/** Season card poster: the season's own poster, else the series poster. */
function seasonPoster(group: SeasonGroup): string | null {
    return group.seasonPoster ?? props.item.poster_url ?? null;
}

function episodeCountLabel(group: SeasonGroup): string {
    const n = group.episodes.length;
    return `${n} ${n === 1 ? 'episode' : 'episodes'}`;
}

/**
 * Adapt a season group to a `MediaItem` so the season grid can reuse the SAME
 * `MediaCard` design as the library listings (U-cards). When the server modelled
 * the season as its own `type: 'season'` row we reuse it (real id → its poster
 * falls back to the series poster); otherwise we synthesise a minimal season item
 * (the card is navigational — `hide-actions` — so there's no per-item store write
 * keyed on the synthetic id).
 */
function seasonAsItem(group: SeasonGroup): MediaItem {
    if (group.seasonItem) {
        // Reuse the real season row but always title the card with the season
        // label ("Season 1"/"Specials"), not the row's raw name.
        return { ...group.seasonItem, name: group.label, poster_url: seasonPoster(group) };
    }
    return {
        id: `${props.item.id}:${group.key}`,
        name: group.label,
        type: 'season',
        poster_url: seasonPoster(group),
        genres: [],
        year: null,
        rating: null,
        runtime: null,
        overview: null,
        actors: [],
        director: null,
        created_at: null,
        updated_at: null,
    };
}

const hasSeasons = computed(() => props.seasons.length > 0);

const prefs = usePreferencesStore();
/** Season cards track the same size as the library grid so they match visually. */
const cardSize = computed(() => prefs.cardSize ?? 200);
const mediaApiBase = useMediaApiBase();
const mediaDirectBase = useMediaDirectBase();
const phlixConfig = inject<PhlixAppConfig | null>('phlixConfig', null);

const themeAudioEl = ref<HTMLAudioElement | null>(null);
let audioStarted = false;

const themeAudioUrl = computed(() => {
    const url = props.item.theme_audio_url;
    if (!url) return null;
    if (/^https?:\/\//.test(url)) return url;
    const base = mediaDirectBase.value || mediaApiBase.value || (phlixConfig?.apiBase ?? '');
    return `${base}${url}`;
});

const shouldPlayThemeAudio = computed(
    () =>
        !prefs.effectiveReducedMotion &&
        prefs.seriesThemeAutoplay &&
        !!themeAudioUrl.value,
);

function startThemeAudio(): void {
    if (!shouldPlayThemeAudio.value || audioStarted) return;
    const el = themeAudioEl.value;
    if (!el) return;
    audioStarted = true;
    const playResult = el.play();
    if (playResult != null) {
        playResult.catch(() => {
            audioStarted = false;
        });
    }
}

function stopThemeAudio(): void {
    const el = themeAudioEl.value;
    if (!el) return;
    el.pause();
    el.src = '';
    el.load();
    audioStarted = false;
}

onMounted(() => {
    if (shouldPlayThemeAudio.value) {
        startThemeAudio();
    }
});

watch(shouldPlayThemeAudio, (play) => {
    if (play) {
        startThemeAudio();
    } else {
        stopThemeAudio();
    }
});

onBeforeUnmount(() => {
    stopThemeAudio();
});
</script>

<template>
    <div class="series-detail">
        <audio
            v-if="themeAudioUrl"
            ref="themeAudioEl"
            :src="themeAudioUrl"
            class="series-detail__theme-audio"
            loop
            aria-hidden="true"
            tabindex="-1"
        />

        <MediaDetail
            :item="item"
            :resume-seconds="resumeSeconds"
            :similar="[]"
            :similar-loading="false"
            :can-match="canMatch"
            @play="emit('play', $event)"
            @resume="emit('resume', $event)"
            @watchlist="emit('watchlist', $event)"
            @info="emit('info', $event)"
            @match="emit('match', $event)"
            @back="emit('back')"
            @mark-watched="emit('mark-watched', $event)"
            @refresh="emit('refresh', $event)"
            @choose-poster="emit('choose-poster', $event)"
            @remove="emit('remove', $event)"
        />

        <section class="series-detail__seasons" aria-label="Seasons">
            <h2 class="series-detail__seasons-title">Seasons</h2>

            <div
                v-if="loading"
                class="series-detail__seasons-loading"
                role="status"
                aria-busy="true"
                aria-label="Loading seasons"
            />

            <ul
                v-else-if="hasSeasons"
                class="series-detail__grid"
                :style="{ gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize}px, 1fr))` }"
            >
                <li v-for="season in seasons" :key="season.key" class="series-detail__cell">
                    <MediaCard
                        :item="seasonAsItem(season)"
                        :to="seasonTo(season)"
                        :subtitle="episodeCountLabel(season)"
                        hide-actions
                    />
                </li>
            </ul>

            <p v-else class="series-detail__empty">This series has no seasons available to watch.</p>
        </section>
    </div>
</template>

<style scoped>
.series-detail {
    width: 100%;
}

.series-detail__theme-audio {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.series-detail__seasons {
    max-width: 1100px;
    margin: var(--space-8) auto 0;
    padding: 0 var(--space-6) var(--space-6);
}
.series-detail__seasons-title {
    font-family: var(--font-display);
    font-weight: var(--font-semibold);
    font-size: var(--text-xl);
    letter-spacing: var(--tracking-tight);
    color: var(--text);
    margin-bottom: var(--space-4);
}
.series-detail__seasons-loading {
    min-height: 8rem;
}

.series-detail__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    /* Column template is set inline from the card-size preference so season cards
       track the same size as the library grid; this is the SSR/no-JS fallback. */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--space-5);
}
.series-detail__cell {
    min-width: 0;
}

.series-detail__empty {
    color: var(--text-muted);
}
</style>
