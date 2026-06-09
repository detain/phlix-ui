<script setup lang="ts">
/**
 * SeriesSeasons (R-series) — the season/specials → episode tree on a series
 * detail page. Presentational: given pre-grouped {@link SeasonGroup}s (built by
 * `groupEpisodesBySeason`), it renders one collapsible `<details>` per season
 * (Specials last) with its episodes in order, and emits `play` for the chosen
 * episode. Driven purely by props so it tests without a router/store; the page
 * container fetches the children, groups them, and wires navigation.
 */
import type { MediaItem } from '../types/media-item';
import type { SeasonGroup } from './series-grouping';
import Icon from './Icon.vue';

const props = withDefaults(
    defineProps<{
        seasons: SeasonGroup[];
        /** Open only the first season by default (others collapsed). */
        openFirstOnly?: boolean;
    }>(),
    { openFirstOnly: true },
);

const emit = defineEmits<{
    (e: 'play', item: MediaItem): void;
}>();

/** "1. Pilot" — episode number (when known) then per-episode title/name. */
function episodeTitle(ep: MediaItem): string {
    const title = ep.episode_title || ep.name;
    return typeof ep.episode_number === 'number' ? `${ep.episode_number}. ${title}` : title;
}

/** Runtime label (minutes, matching the rest of the UI) or null. */
function runtimeLabel(ep: MediaItem): string | null {
    return ep.runtime ? `${ep.runtime}m` : null;
}

function shouldOpen(index: number): boolean {
    return props.openFirstOnly ? index === 0 : true;
}
</script>

<template>
    <section class="series-seasons" aria-label="Seasons and episodes">
        <details
            v-for="(season, i) in seasons"
            :key="season.key"
            class="series-seasons__season"
            :open="shouldOpen(i)"
        >
            <summary class="series-seasons__summary">
                <Icon name="chevron-right" class="series-seasons__chevron" aria-hidden="true" />
                <span class="series-seasons__season-label">{{ season.label }}</span>
                <span class="series-seasons__season-count numeric"
                    >{{ season.episodes.length }}
                    {{ season.episodes.length === 1 ? 'episode' : 'episodes' }}</span
                >
            </summary>

            <ul class="series-seasons__episodes">
                <li v-for="ep in season.episodes" :key="ep.id" class="series-seasons__episode">
                    <button
                        type="button"
                        class="series-seasons__play"
                        :aria-label="`Play ${episodeTitle(ep)}`"
                        @click="emit('play', ep)"
                    >
                        <Icon name="play" />
                    </button>
                    <button
                        type="button"
                        class="series-seasons__episode-main"
                        @click="emit('play', ep)"
                    >
                        <span class="series-seasons__episode-title">{{ episodeTitle(ep) }}</span>
                        <span v-if="ep.overview" class="series-seasons__episode-overview">{{
                            ep.overview
                        }}</span>
                    </button>
                    <span v-if="runtimeLabel(ep)" class="series-seasons__episode-runtime numeric">{{
                        runtimeLabel(ep)
                    }}</span>
                </li>
            </ul>
        </details>
    </section>
</template>

<style scoped>
.series-seasons {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.series-seasons__season {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface);
    overflow: hidden;
}

.series-seasons__summary {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    cursor: pointer;
    list-style: none;
    user-select: none;
}
.series-seasons__summary::-webkit-details-marker {
    display: none;
}
.series-seasons__summary:hover {
    background: var(--surface-2);
}
.series-seasons__summary:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--accent-ring);
}

.series-seasons__chevron {
    color: var(--text-subtle);
    transition: transform var(--dur-fast) var(--ease-out);
    flex: 0 0 auto;
}
.series-seasons__season[open] .series-seasons__chevron {
    transform: rotate(90deg);
}

.series-seasons__season-label {
    font-family: var(--font-display);
    font-weight: var(--font-semibold);
    font-size: var(--text-md);
    color: var(--text);
}
.series-seasons__season-count {
    margin-left: auto;
    font-size: var(--text-sm);
    color: var(--text-subtle);
}

.series-seasons__episodes {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--border);
}

.series-seasons__episode {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border);
}
.series-seasons__episode:last-child {
    border-bottom: none;
}
.series-seasons__episode:hover {
    background: var(--surface-2);
}

.series-seasons__play {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius-full, 999px);
    background: var(--accent);
    color: var(--accent-contrast, #fff);
}
.series-seasons__play:hover {
    filter: brightness(1.08);
}
.series-seasons__play:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-ring);
}

.series-seasons__episode-main {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: left;
    background: none;
    color: inherit;
}
.series-seasons__episode-title {
    font-weight: var(--font-medium);
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.series-seasons__episode-overview {
    font-size: var(--text-sm);
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.series-seasons__episode-runtime {
    flex: 0 0 auto;
    font-size: var(--text-sm);
    color: var(--text-subtle);
}
</style>
