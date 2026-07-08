<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * SeasonPage (U3) — route container for `/app/media/:id/season/:season`.
 *
 * Renders a single season of a series: the series + its children are fetched
 * once (`GET /api/v1/media/:id` + the shared `loadSeriesSeasons` parentId fetch),
 * grouped by season, and the requested `:season` (the season number; `0` =
 * Specials) is selected. Shows a season header (poster/name/overview + a
 * back-link to the series) and the season's episode list (reusing
 * SeriesSeasons' episode rows). Play an episode → the player route. An invalid /
 * missing season number shows an empty state with a link back to the series.
 */
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MediaItem } from '../types/media-item';
import { ApiClient } from '../api/client';
import { useMediaApiBase } from '../composables/useApiBase';
import { loadSeriesSeasons } from '../composables/useSeriesSeasons';
import { findSeasonByParam, type SeasonGroup } from '../components/series-grouping';
import SeriesSeasons from '../components/SeriesSeasons.vue';
import Icon from '../components/Icon.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import { usePageTitle } from '../composables/usePageTitle';

// On the hub this is the relay-proxy base for the selected server; on the media
// server it is the app's own base.
const apiBase = useMediaApiBase();
const route = useRoute();
const router = useRouter();

const series = ref<MediaItem | null>(null);
const season = ref<SeasonGroup | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const seriesId = computed(() => String(route.params.id ?? ''));
const seasonParam = computed(() => String(route.params.season ?? ''));

// Title: "<Series> · Season N" (Specials when the bucket is null). Until the
// data loads the route default (afterEach) stands.
usePageTitle(() => {
    if (!series.value) return undefined;
    if (!season.value) return series.value.name;
    return `${series.value.name} · ${season.value.label}`;
});

const seasonGroups = computed<SeasonGroup[]>(() => (season.value ? [season.value] : []));

let controller: AbortController | null = null;
let disposed = false;

function isAbort(e: unknown): boolean {
    return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

async function load(): Promise<void> {
    const id = seriesId.value;
    controller?.abort();
    controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const myController = controller;
    const stale = (): boolean => disposed || myController !== controller;
    loading.value = true;
    error.value = null;
    series.value = null;
    season.value = null;
    if (!id) {
        error.value = 'No series id provided';
        loading.value = false;
        return;
    }
    try {
        const client = new ApiClient({ baseUrl: apiBase.value });
        const response = await client.get<{ item: MediaItem }>(
            `/api/v1/media/${encodeURIComponent(id)}`,
            undefined,
            myController?.signal,
        );
        if (stale()) return;
        series.value = response.item;
        const groups = await loadSeriesSeasons(client, apiBase.value, id, myController?.signal);
        if (stale()) return;
        season.value = findSeasonByParam(groups, seasonParam.value);
        loading.value = false;
    } catch (e) {
        if (stale() || isAbort(e)) return;
        error.value = e instanceof Error ? e.message : 'Failed to load season';
        loading.value = false;
    }
}

onMounted(load);
// Re-fetch when the series id OR the season number changes (navigating between
// seasons of the same series, or to a different series).
watch([seriesId, seasonParam], load);
onBeforeUnmount(() => {
    disposed = true;
    controller?.abort();
    controller = null;
});

function go(name: string, params: Record<string, string>): void {
    router?.push({ name, params }).catch(() => {});
}
function onPlayEpisode(ep: MediaItem): void {
    go('player', { id: ep.id });
}
/** Clicking an episode row opens its detail/info page (like a movie); the row's
 *  explicit play button still starts playback via onPlayEpisode. */
function onOpenEpisode(ep: MediaItem): void {
    go('media', { id: ep.id });
}
function onBackToSeries(): void {
    if (seriesId.value) go('media', { id: seriesId.value });
    else router?.back();
}

const seasonPoster = computed(() => season.value?.seasonPoster ?? series.value?.poster_url ?? null);
const seasonOverview = computed(() => season.value?.seasonItem?.overview ?? null);
</script>

<template>
    <div class="season-page">
        <div v-if="loading" class="season-page__loading" role="status" aria-busy="true" aria-label="Loading season">
            <Skeleton variant="text" width="40%" height="1.6rem" />
            <Skeleton variant="text" :lines="3" />
        </div>

        <EmptyState
            v-else-if="error"
            icon="alert"
            title="Couldn't load this season"
            :description="error"
        >
            <template #actions>
                <Button variant="solid" @click="load">Retry</Button>
                <Button variant="ghost" @click="onBackToSeries">Back to series</Button>
            </template>
        </EmptyState>

        <template v-else-if="series && season">
            <header class="season-page__header">
                <button type="button" class="season-page__back" @click="onBackToSeries">
                    <Icon name="arrow-left" />
                    <span>{{ series.name }}</span>
                </button>

                <div class="season-page__hero">
                    <div class="season-page__poster">
                        <img
                            v-if="seasonPoster"
                            class="season-page__img"
                            :src="seasonPoster"
                            :alt="`${series.name} ${season.label}`"
                            decoding="async"
                        />
                        <div v-else class="season-page__fallback" aria-hidden="true"><Icon name="tv" /></div>
                    </div>
                    <div class="season-page__info">
                        <p class="season-page__series-name">{{ series.name }}</p>
                        <h1 class="season-page__title">{{ season.label }}</h1>
                        <p class="season-page__count numeric">
                            {{ season.episodes.length }}
                            {{ season.episodes.length === 1 ? 'episode' : 'episodes' }}
                        </p>
                        <p v-if="seasonOverview" class="season-page__overview">{{ seasonOverview }}</p>
                    </div>
                </div>
            </header>

            <section class="season-page__episodes" aria-label="Episodes">
                <SeriesSeasons
                    v-if="season.episodes.length"
                    :seasons="seasonGroups"
                    :open-first-only="false"
                    :api-base="apiBase"
                    @play="onPlayEpisode"
                    @open="onOpenEpisode"
                />
                <EmptyState
                    v-else
                    icon="tv"
                    title="No episodes yet"
                    description="This season has no episodes available to watch."
                />
            </section>
        </template>

        <EmptyState
            v-else-if="series"
            icon="tv"
            title="Season not found"
            :description="`${series.name} has no such season.`"
        >
            <template #actions>
                <Button variant="solid" @click="onBackToSeries">Back to series</Button>
            </template>
        </EmptyState>
    </div>
</template>

<style scoped>
.season-page {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: var(--space-6);
}

.season-page__loading {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}

.season-page__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-muted);
    font-size: var(--text-sm);
    background: none;
    margin-bottom: var(--space-4);
    cursor: pointer;
}
.season-page__back:hover {
    color: var(--text);
}
.season-page__back:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-ring);
    border-radius: var(--radius-sm);
}

.season-page__hero {
    display: grid;
    grid-template-columns: minmax(0, 200px) 1fr;
    gap: var(--space-6);
    align-items: start;
    margin-bottom: var(--space-6);
}
.season-page__poster {
    position: relative;
    aspect-ratio: 2 / 3;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: linear-gradient(145deg, var(--surface-3), var(--surface));
    box-shadow: var(--shadow-4);
}
.season-page__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.season-page__fallback {
    display: grid;
    place-items: center;
    height: 100%;
    font-size: 2.6rem;
    color: var(--text-subtle);
}

.season-page__series-name {
    color: var(--text-subtle);
    font-size: var(--text-sm);
    margin-bottom: var(--space-1);
}
.season-page__title {
    font-family: var(--font-display);
    font-weight: var(--font-bold);
    font-size: var(--text-2xl);
    letter-spacing: var(--tracking-tight);
    color: var(--text);
}
.season-page__count {
    color: var(--text-muted);
    font-size: var(--text-sm);
    margin-top: var(--space-1);
}
.season-page__overview {
    max-width: 60ch;
    color: var(--text-muted);
    line-height: var(--leading-relaxed, 1.6);
    margin-top: var(--space-3);
}

@media (max-width: 720px) {
    .season-page__hero {
        grid-template-columns: 1fr;
    }
    .season-page__poster {
        max-width: 180px;
    }
}
</style>
