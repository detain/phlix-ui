<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * MusicAlbumPage — album detail view: header + track listing.
 *
 * Loaded directly via `/app/music/album/:name` (Vue router `props: true`),
 * which is reached either from the music library drill-down or by redirecting
 * the legacy server-rendered `/music/albums/{name}` route to the SPA.
 *
 * Data: `GET /api/v1/music/albums/{name}` via {@link ApiClient#getAlbum}.
 * Playback: {@link useMusicPlayer} (signed stream URLs, client-side crossfade).
 */
import { ref, computed, onUnmounted } from 'vue';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase, useMediaDirectBase } from '../composables/useApiBase';
import { useMusicPlayer } from '../composables/useMusicPlayer';
import { ApiClient } from '../api/client';
import MusicTrackList from '../components/MusicTrackList.vue';
import Icon from '../components/Icon.vue';
import type { MusicAlbum, MusicTrack } from '../types/music';

const props = defineProps<{
    /** Album name — router `props: true` passes `:name` as a prop. */
    name: string;
}>();

const { t } = useMessages();
const apiBase = useMediaApiBase();
const directBase = useMediaDirectBase();

// --- audio playback ---
const player = useMusicPlayer({
    apiBase: () => apiBase.value,
    streamBase: () => directBase.value || apiBase.value,
});
onUnmounted(() => player.dispose());

// --- data ---
const album = ref<MusicAlbum | null>(null);
const tracks = ref<MusicTrack[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const playingTrackId = computed(() =>
    player.playing.value ? player.currentTrack.value?.id ?? null : null,
);

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
}

// Load album by name (the server keys albums by name, so `name` IS the identity)
async function loadAlbum(): Promise<void> {
    if (!props.name) return;
    loading.value = true;
    error.value = null;
    try {
        album.value = await getClient().getAlbum(props.name);
        tracks.value = album.value?.tracks ?? [];
    } catch (e) {
        error.value = t('music.albumNotFound') ?? 'Album not found';
        album.value = null;
        tracks.value = [];
    } finally {
        loading.value = false;
    }
}

// Initial load
void loadAlbum();

// --- total duration ---
const totalDurationSecs = computed(() => {
    return tracks.value.reduce((sum, t) => sum + (t.durationSecs ?? 0), 0);
});

function formatDuration(secs: number): string {
    if (!isFinite(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// --- playback ---
function playTrack(track: MusicTrack): void {
    if (player.currentTrack.value?.id === track.id && player.playing.value) {
        player.pause();
        return;
    }
    if (player.currentTrack.value?.id === track.id) {
        void player.play();
        return;
    }
    player.loadTracks(tracks.value);
    void player.play(track);
}

function playAll(): void {
    if (tracks.value.length === 0) return;
    player.loadTracks(tracks.value);
    void player.play(tracks.value[0]);
}
</script>

<template>
    <div class="album-page">
        <!-- Back link -->
        <nav class="album-page__back-nav">
            <router-link to="/app/music" class="album-page__back-link">
                <Icon name="arrow-left" class="album-page__back-icon" />
                <span>{{ t('player.back') }}</span>
            </router-link>
        </nav>

        <!-- Loading skeleton -->
        <div v-if="loading" class="album-page__loading" role="status" aria-busy="true">
            <div class="album-skel">
                <div class="album-skel__art" />
                <div class="album-skel__info">
                    <div class="album-skel__title" />
                    <div class="album-skel__artist" />
                    <div class="album-skel__meta" />
                </div>
            </div>
            <div class="album-page__skel-tracks">
                <div v-for="n in 8" :key="n" class="track-skel">
                    <div class="track-skel__num" />
                    <div class="track-skel__title" />
                    <div class="track-skel__duration" />
                </div>
            </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="album-page__error" role="alert">
            <Icon name="alert-circle" class="album-page__error-icon" />
            <p>{{ error }}</p>
        </div>

        <!-- Album detail -->
        <template v-else-if="album">
            <!-- Album header -->
            <header class="album-header">
                <div class="album-header__art">
                    <svg v-if="!album.albumArtUrl" viewBox="0 0 100 100" class="album-header__art-placeholder">
                        <rect x="10" y="10" width="80" height="80" rx="5" fill="#3b2d5c"/>
                        <rect x="25" y="25" width="50" height="50" rx="3" fill="#6b4d8a"/>
                    </svg>
                    <img
                        v-else
                        :src="album.albumArtUrl"
                        :alt="album.title"
                        class="album-header__art-img"
                    >
                </div>
                <div class="album-header__info">
                    <h1 class="album-header__title">{{ album.title }}</h1>
                    <p class="album-header__artist">{{ album.artist ?? 'Unknown Artist' }}</p>
                    <p class="album-header__meta">
                        <span v-if="album.year">{{ album.year }}</span>
                        <span v-if="album.year"> · </span>
                        <span>{{ album.totalTracks }} {{ album.totalTracks === 1 ? 'track' : 'tracks' }}</span>
                        <span v-if="totalDurationSecs > 0"> · {{ formatDuration(totalDurationSecs) }}</span>
                    </p>
                    <button
                        type="button"
                        class="album-header__play-btn"
                        :aria-label="t('music.play')"
                        @click="playAll"
                    >
                        <Icon name="play" class="album-header__play-icon" />
                        {{ t('music.play') }}
                    </button>
                </div>
            </header>

            <!-- Track listing -->
            <section class="album-tracks" aria-label="Track listing">
                <MusicTrackList
                    :tracks="tracks"
                    :playing-track-id="playingTrackId"
                    @play="playTrack"
                />
            </section>
        </template>

        <!-- Empty album -->
        <div v-else class="album-page__empty" role="status">
            <Icon name="music" class="album-page__empty-icon" />
            <p>{{ t('music.noTracks') }}</p>
        </div>
    </div>
</template>

<style scoped>
.album-page {
    padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
    max-width: 900px;
    margin: 0 auto;
}

/* Back nav */
.album-page__back-nav {
    margin-bottom: var(--space-6, 24px);
}
.album-page__back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    text-decoration: none;
    transition: color var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.album-page__back-link:hover {
    color: var(--accent, #f5a524);
}
.album-page__back-icon {
    width: 16px;
    height: 16px;
}

/* Album header */
.album-header {
    display: flex;
    gap: var(--space-6, 24px);
    margin-bottom: var(--space-8, 32px);
    align-items: flex-start;
}
.album-header__art {
    flex: 0 0 200px;
    width: 200px;
}
.album-header__art-placeholder {
    width: 200px;
    height: 200px;
    border-radius: var(--radius-lg, 12px);
}
.album-header__art-img {
    width: 200px;
    height: 200px;
    border-radius: var(--radius-lg, 12px);
    object-fit: cover;
}
.album-header__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2, 8px);
}
.album-header__title {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-3xl, 1.875rem);
    letter-spacing: var(--tracking-tight, -0.02em);
    color: var(--text, #e4e4e7);
    margin: 0;
}
.album-header__artist {
    font-size: var(--text-lg, 1.125rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}
.album-header__meta {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}
.album-header__play-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    margin-top: var(--space-3, 12px);
    padding: var(--space-2, 8px) var(--space-4, 16px);
    border-radius: var(--radius-full, 999px);
    background: var(--accent, #f5a524);
    color: var(--accent-contrast, #1a1205);
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    border: none;
    cursor: pointer;
    transition: transform var(--dur-fast, 0.18s) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
                background var(--dur-fast, 0.18s) var(--ease-out, ease);
    width: fit-content;
}
.album-header__play-btn:hover {
    transform: scale(1.05);
    background: var(--accent-hover, #e09800);
}
.album-header__play-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.album-header__play-icon {
    width: 16px;
    height: 16px;
}

/* Track listing */
.album-tracks {
    margin-top: var(--space-4, 16px);
}

/* Loading skeleton */
.album-page__loading {
    display: flex;
    flex-direction: column;
    gap: var(--space-6, 24px);
}
.album-skel {
    display: flex;
    gap: var(--space-6, 24px);
}
.album-skel__art {
    width: 200px;
    height: 200px;
    border-radius: var(--radius-lg, 12px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
    flex: 0 0 200px;
}
.album-skel__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding-top: var(--space-2, 8px);
}
.album-skel__title {
    height: 2rem;
    width: 60%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.album-skel__artist,
.album-skel__meta {
    height: 1rem;
    width: 35%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.album-page__skel-tracks {
    display: flex;
    flex-direction: column;
    gap: var(--space-1, 4px);
}
.track-skel {
    display: grid;
    grid-template-columns: 32px 24px 1fr 48px;
    gap: var(--space-3, 12px);
    align-items: center;
    padding: var(--space-2, 8px) var(--space-3, 12px);
}
.track-skel__num,
.track-skel__title,
.track-skel__duration {
    height: 0.85em;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}

/* Error state */
.album-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--danger, #f87171);
    text-align: center;
}
.album-page__error-icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    margin-bottom: var(--space-2, 8px);
}

/* Empty state */
.album-page__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--text-muted, #a1a1aa);
    text-align: center;
}
.album-page__empty-icon {
    width: 40px;
    height: 40px;
    opacity: 0.5;
    margin-bottom: var(--space-2, 8px);
}

@keyframes shimmer {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
    .album-skel__art,
    .album-skel__title,
    .album-skel__artist,
    .album-skel__meta,
    .track-skel__num,
    .track-skel__title,
    .track-skel__duration {
        animation: none;
    }
}
</style>
