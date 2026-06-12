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
import { computed } from 'vue';
import type { MediaItem } from '../types/media-item';
import type { SeasonGroup } from './series-grouping';
import { seasonRouteParam } from './series-grouping';
import MediaDetail from './MediaDetail.vue';
import Icon from './Icon.vue';

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
    }>(),
    { loading: false, resumeSeconds: null, routerBase: '/app' },
);

const emit = defineEmits<{
    (e: 'play', item: MediaItem): void;
    (e: 'resume', item: MediaItem): void;
    (e: 'watchlist', item: MediaItem): void;
    (e: 'info', item: MediaItem): void;
    (e: 'back'): void;
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

const hasSeasons = computed(() => props.seasons.length > 0);
</script>

<template>
    <div class="series-detail">
        <MediaDetail
            :item="item"
            :resume-seconds="resumeSeconds"
            :similar="[]"
            :similar-loading="false"
            @play="emit('play', $event)"
            @resume="emit('resume', $event)"
            @watchlist="emit('watchlist', $event)"
            @info="emit('info', $event)"
            @back="emit('back')"
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

            <ul v-else-if="hasSeasons" class="series-detail__grid">
                <li v-for="season in seasons" :key="season.key" class="series-detail__cell">
                    <RouterLink :to="seasonTo(season)" class="series-detail__card">
                        <div class="series-detail__poster">
                            <img
                                v-if="seasonPoster(season)"
                                class="series-detail__img"
                                :src="seasonPoster(season) ?? undefined"
                                :alt="season.label"
                                loading="lazy"
                                decoding="async"
                            />
                            <div v-else class="series-detail__fallback" aria-hidden="true">
                                <Icon name="tv" />
                            </div>
                        </div>
                        <div class="series-detail__caption">
                            <span class="series-detail__label">{{ season.label }}</span>
                            <span class="series-detail__count numeric">{{ episodeCountLabel(season) }}</span>
                        </div>
                    </RouterLink>
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
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--space-5);
}
.series-detail__cell {
    min-width: 0;
}

.series-detail__card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    border-radius: var(--radius-lg);
    color: inherit;
    text-decoration: none;
    outline: none;
}
.series-detail__card:focus-visible .series-detail__poster {
    box-shadow: var(--shadow-2), 0 0 0 3px var(--accent-ring);
}

.series-detail__poster {
    position: relative;
    aspect-ratio: 2 / 3;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: linear-gradient(145deg, var(--surface-3), var(--surface));
    box-shadow: var(--shadow-2);
    transition: transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out);
}
.series-detail__card:hover .series-detail__poster {
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--shadow-4);
}
.series-detail__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.series-detail__fallback {
    display: grid;
    place-items: center;
    height: 100%;
    font-size: 2.4rem;
    color: var(--text-subtle);
}

.series-detail__caption {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 var(--space-1);
}
.series-detail__label {
    font-family: var(--font-display);
    font-weight: var(--font-medium);
    font-size: var(--text-base);
    color: var(--text);
    letter-spacing: var(--tracking-snug);
}
.series-detail__count {
    font-size: var(--text-xs);
    color: var(--text-subtle);
}

.series-detail__empty {
    color: var(--text-muted);
}

@media (prefers-reduced-motion: reduce) {
    .series-detail__poster {
        transition: none;
    }
    .series-detail__card:hover .series-detail__poster {
        transform: none;
    }
}
</style>
