<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * SeriesSeasons (R-series) — the season/specials → episode tree on a series
 * detail page. Presentational: given pre-grouped {@link SeasonGroup}s (built by
 * `groupEpisodesBySeason`), it renders one collapsible `<details>` per season
 * (Specials last) with its episodes in order, and emits `play` for the chosen
 * episode. Driven purely by props so it tests without a router/store; the page
 * container fetches the children, groups them, and wires navigation.
 */
import { ref, computed, inject } from 'vue';
import type { MediaItem, MediaFile } from '../types/media-item';
import type { SeasonGroup } from './series-grouping';
import { api } from '../api/client';
import Icon from './Icon.vue';

const props = withDefaults(
    defineProps<{
        seasons: SeasonGroup[];
        /** Open only the first season by default (others collapsed). */
        openFirstOnly?: boolean;
        /** API base URL for fetching episode detail (files are detail-only). */
        apiBase?: string;
    }>(),
    { openFirstOnly: true, apiBase: '' },
);

const emit = defineEmits<{
    (e: 'play', item: MediaItem): void;
    /** The episode row body was clicked — open that episode's detail/info page
     *  (like a movie). The explicit play button still emits `play`. */
    (e: 'open', item: MediaItem): void;
}>();

const auth = inject('auth', { isAdmin: false } as { isAdmin: boolean }) as { isAdmin: boolean };

const episodeFiles = ref<Record<string, MediaFile[]>>({});
const expandedEpisodes = ref<Set<string>>(new Set());

function episodeFilesById(episodeId: string): MediaFile[] | undefined {
    return episodeFiles.value[episodeId];
}

function isExpanded(episodeId: string): boolean {
    return expandedEpisodes.value.has(episodeId);
}

async function fetchEpisodeFiles(episodeId: string): Promise<void> {
    if (episodeFiles.value[episodeId] !== undefined) return;
    try {
        const detail = await api.get<MediaItem>(
            `${props.apiBase}/api/v1/media/${encodeURIComponent(episodeId)}`,
        );
        episodeFiles.value[episodeId] = detail.files ?? [];
    } catch {
        episodeFiles.value[episodeId] = [];
    }
}

function toggleExpanded(episodeId: string): void {
    if (isExpanded(episodeId)) {
        expandedEpisodes.value.delete(episodeId);
    } else {
        expandedEpisodes.value.add(episodeId);
        fetchEpisodeFiles(episodeId);
    }
}

/** "1. Pilot" — episode number (when known) then per-episode title/name. */
function episodeTitle(ep: MediaItem): string {
    const title = ep.episode_title || ep.name;
    return typeof ep.episode_number === 'number' ? `${ep.episode_number}. ${title}` : title;
}

/** Runtime label (minutes, matching the rest of the UI) or null. */
function runtimeLabel(ep: MediaItem): string | null {
    return ep.runtime ? `${ep.runtime}m` : null;
}

/** Human air date ("Jan 5, 2020") from an ISO-ish `air_date`, or null. */
function airDateLabel(ep: MediaItem): string | null {
    const raw = ep.air_date;
    if (!raw) return null;
    const t = Date.parse(raw);
    if (Number.isNaN(t)) return raw;
    return new Date(t).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

/** The episode description — first paragraph of the overview when it has several. */
function episodeDescription(ep: MediaItem): string | null {
    const ov = ep.overview?.trim();
    if (!ov) return null;
    const firstPara = ov.split(/\n\s*\n/)[0]?.trim();
    return firstPara || ov;
}

function shouldOpen(index: number): boolean {
    return props.openFirstOnly ? index === 0 : true;
}

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
    const decimals = value >= 100 ? 0 : value >= 10 ? 1 : 2;
    return `${value.toFixed(decimals)} ${units[unitIndex]}`;
}

const showAdminFileInfo = computed(() => auth.isAdmin && !!props.apiBase);
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
                        :aria-label="`View ${episodeTitle(ep)}`"
                        @click="emit('open', ep)"
                    >
                        <span class="series-seasons__episode-title">{{ episodeTitle(ep) }}</span>
                        <span
                            v-if="airDateLabel(ep) || runtimeLabel(ep)"
                            class="series-seasons__episode-meta numeric"
                        >
                            <template v-if="airDateLabel(ep)">{{ airDateLabel(ep) }}</template>
                            <template v-if="airDateLabel(ep) && runtimeLabel(ep)"> · </template>
                            <template v-if="runtimeLabel(ep)">{{ runtimeLabel(ep) }}</template>
                        </span>
                        <span v-if="episodeDescription(ep)" class="series-seasons__episode-description">{{
                            episodeDescription(ep)
                        }}</span>
                    </button>
                    <button
                        v-if="showAdminFileInfo"
                        type="button"
                        class="series-seasons__files-btn"
                        :aria-label="`Files info for ${episodeTitle(ep)}${isExpanded(ep.id) ? ' (expanded)' : ''}`"
                        :title="isExpanded(ep.id) ? 'Collapse files' : 'Expand files'"
                        @click.stop="toggleExpanded(ep.id)"
                    >
                        <Icon :name="isExpanded(ep.id) ? 'x' : 'info'" aria-hidden="true" />
                    </button>
                    <div
                        v-if="showAdminFileInfo && isExpanded(ep.id)"
                        class="series-seasons__files-detail"
                    >
                        <span
                            v-if="episodeFilesById(ep.id) === undefined"
                            class="series-seasons__files-loading"
                        >
                            Loading…
                        </span>
                        <template v-else-if="episodeFilesById(ep.id)?.length">
                            <span
                                v-for="(file, fi) in episodeFilesById(ep.id)"
                                :key="fi"
                                class="series-seasons__file-row"
                            >
                                <span class="series-seasons__file-path">{{ file.path }}</span>
                                <span class="series-seasons__file-meta numeric">
                                    {{ formatBytes(file.size_bytes) }}
                                    <template v-if="file.container"> · {{ file.container }}</template>
                                    <template v-if="file.resolution"> · {{ file.resolution }}</template>
                                </span>
                            </span>
                        </template>
                        <span v-else class="series-seasons__files-empty">No files</span>
                    </div>
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
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: start;
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
/* Air date · runtime meta line under the episode title. */
.series-seasons__episode-meta {
    font-size: var(--text-xs);
    color: var(--text-subtle);
    margin-top: 2px;
}
/* Episode description — first paragraph, clamped to a few lines (no longer a
   single nowrap-ellipsis line, so viewers can actually read it). */
.series-seasons__episode-description {
    font-size: var(--text-sm);
    color: var(--text-muted);
    margin-top: var(--space-1);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.series-seasons__files-btn {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: var(--radius);
    background: none;
    color: var(--text-subtle);
    border: none;
    cursor: pointer;
    padding: 0;
}
.series-seasons__files-btn:hover {
    background: var(--surface-3);
    color: var(--text);
}
.series-seasons__files-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-ring);
}

.series-seasons__files-detail {
    width: 100%;
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3);
    margin-top: var(--space-2);
    border-radius: var(--radius);
    background: var(--surface-2);
    border: 1px solid var(--border);
}
.series-seasons__files-loading,
.series-seasons__files-empty {
    font-size: var(--text-sm);
    color: var(--text-muted);
    font-style: italic;
}
.series-seasons__file-row {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--space-1) 0;
    border-bottom: 1px solid var(--border);
}
.series-seasons__file-row:last-child {
    border-bottom: none;
}
.series-seasons__file-path {
    font-family: var(--font-mono, monospace);
    font-size: var(--text-xs);
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.series-seasons__file-meta {
    font-size: var(--text-xs);
    color: var(--text-subtle);
}
</style>
