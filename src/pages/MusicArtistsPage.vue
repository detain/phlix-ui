<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
  -->

<script setup lang="ts">
/**
 * MusicArtistsPage — artists grid listing.
 *
 * Loaded directly via `/app/music/artists` (Vue router `props: true`),
 * which is reached either from the music library drill-down or by redirecting
 * the legacy server-rendered `/music/artists` route to the SPA.
 *
 * Data: `GET /api/v1/music/artists` via {@link ApiClient#listArtists}.
 * Clicking an artist navigates to `/app/music/artist/{name}`.
 */
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import Icon from '../components/Icon.vue';
import type { MusicArtist } from '../types/music';

const { t } = useMessages();
const router = useRouter();
const apiBase = useMediaApiBase();

// --- data ---
const artists = ref<MusicArtist[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
}

async function loadArtists(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
        artists.value = await getClient().listArtists();
    } catch {
        error.value = t('music.artistsNotFound') ?? 'Could not load artists';
        artists.value = [];
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    void loadArtists();
});

function goToArtist(artist: MusicArtist): void {
    void router.push({ name: 'music-artist', params: { name: artist.name } });
}
</script>

<template>
    <div class="artists-page">
        <!-- Page header -->
        <header class="artists-page__header">
            <h1 class="artists-page__title">{{ t('music.artists') }}</h1>
            <p class="artists-page__description">
                {{ t('music.artistsDescription') ?? 'Browse your music collection by artist' }}
            </p>
        </header>

        <!-- Loading skeleton -->
        <div v-if="loading" class="artists-page__loading" role="status" aria-busy="true">
            <div v-for="n in 12" :key="n" class="artist-skel">
                <div class="artist-skel__art" />
                <div class="artist-skel__name" />
                <div class="artist-skel__meta" />
            </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="artists-page__error" role="alert">
            <Icon name="alert-circle" class="artists-page__error-icon" />
            <p>{{ error }}</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="artists.length === 0" class="artists-page__empty" role="status">
            <Icon name="music" class="artists-page__empty-icon" />
            <p>{{ t('music.noArtists') }}</p>
        </div>

        <!-- Artists grid -->
        <div v-else class="artists-page__grid">
            <button
                v-for="artist in artists"
                :key="artist.id"
                type="button"
                class="artist-card"
                @click="goToArtist(artist)"
            >
                <div class="artist-card__art">
                    <svg v-if="!artist.imageUrl" viewBox="0 0 100 100" class="artist-card__placeholder">
                        <rect x="10" y="10" width="80" height="80" rx="40" fill="#3b2d5c"/>
                        <rect x="25" y="25" width="50" height="50" rx="25" fill="#6b4d8a"/>
                        <circle cx="50" cy="42" r="15" fill="#9b6dcc"/>
                        <path d="M30 70 Q50 55 70 70" stroke="#9b6dcc" stroke-width="4" fill="none" stroke-linecap="round"/>
                    </svg>
                    <img
                        v-else
                        :src="artist.imageUrl"
                        :alt="artist.name"
                        class="artist-card__img"
                    >
                </div>
                <div class="artist-card__info">
                    <h3 class="artist-card__name">{{ artist.name }}</h3>
                    <span class="artist-card__meta">
                        {{ artist.albumCount ?? 0 }} {{ artist.albumCount === 1 ? 'album' : 'albums' }}
                    </span>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>
.artists-page {
    padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
    max-width: 1200px;
    margin: 0 auto;
}

/* Header */
.artists-page__header {
    margin-bottom: var(--space-8, 32px);
}
.artists-page__title {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-3xl, 1.875rem);
    letter-spacing: var(--tracking-tight, -0.02em);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-2, 8px);
}
.artists-page__description {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}

/* Grid */
.artists-page__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-5, 20px);
}

/* Artist card */
.artist-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding: var(--space-4, 16px);
    border-radius: var(--radius-lg, 12px);
    background: var(--surface-2, #27272a);
    border: 1px solid var(--border, #3f3f46);
    cursor: pointer;
    text-align: left;
    transition: transform var(--dur-fast, 0.18s) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
                border-color var(--dur-fast, 0.18s) var(--ease-out, ease),
                background var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.artist-card:hover {
    transform: scale(1.03);
    border-color: var(--accent, #f5a524);
    background: var(--surface-3, #3f3f46);
}
.artist-card:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.artist-card__art {
    aspect-ratio: 1;
    border-radius: var(--radius-md, 8px);
    overflow: hidden;
    background: var(--surface-3, #3f3f46);
}
.artist-card__placeholder {
    width: 100%;
    height: 100%;
}
.artist-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.artist-card__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1, 4px);
}
.artist-card__name {
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    color: var(--text, #e4e4e7);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.artist-card__meta {
    font-size: var(--text-xs, 0.75rem);
    color: var(--text-muted, #a1a1aa);
}

/* Loading skeleton */
.artists-page__loading {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-5, 20px);
}
.artist-skel {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding: var(--space-4, 16px);
    border-radius: var(--radius-lg, 12px);
    background: var(--surface-2, #27272a);
    border: 1px solid var(--border, #3f3f46);
}
.artist-skel__art {
    aspect-ratio: 1;
    border-radius: var(--radius-md, 8px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.artist-skel__name {
    height: 0.85em;
    width: 75%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.artist-skel__meta {
    height: 0.7em;
    width: 45%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}

/* Error state */
.artists-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--danger, #f87171);
    text-align: center;
}
.artists-page__error-icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    margin-bottom: var(--space-2, 8px);
}

/* Empty state */
.artists-page__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--text-muted, #a1a1aa);
    text-align: center;
}
.artists-page__empty-icon {
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
    .artist-skel__art,
    .artist-skel__name,
    .artist-skel__meta {
        animation: none;
    }
}
</style>
