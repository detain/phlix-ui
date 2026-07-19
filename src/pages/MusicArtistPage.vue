<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
  -->

<script setup lang="ts">
/**
 * MusicArtistPage — artist detail view: header + albums grid.
 *
 * Loaded directly via `/app/music/artist/:name` (Vue router `props: true`),
 * which is reached either from the artists listing or by redirecting the
 * legacy server-rendered `/music/artists/{name}` route to the SPA.
 *
 * Data:
 *   - Artist info: `GET /api/v1/music/artists/{name}` via {@link ApiClient#getArtist}
 *   - Albums: `GET /api/v1/music/albums` filtered client-side by artist name
 *     (no server-side per-artist albums endpoint — mirrors {@link MusicLibraryPage})
 * Clicking an album navigates to `/app/music/album/:name`.
 */
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import MusicAlbumCard from '../components/MusicAlbumCard.vue';
import Icon from '../components/Icon.vue';
import type { MusicArtist, MusicAlbum } from '../types/music';

const props = defineProps<{
    /** Artist name — router `props: true` passes `:name` as a prop. */
    name: string;
}>();

const { t } = useMessages();
const router = useRouter();
const apiBase = useMediaApiBase();

// --- data ---
const artist = ref<MusicArtist | null>(null);
const albums = ref<MusicAlbum[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
}

async function loadArtist(): Promise<void> {
    if (!props.name) return;
    loading.value = true;
    error.value = null;
    try {
        // Fetch artist info and albums in parallel
        const [artistData, allAlbums] = await Promise.all([
            getClient().getArtist(props.name),
            getClient().listAlbums(),
        ]);
        artist.value = artistData;
        // Filter albums client-side by artist name (mirrors MusicLibraryPage pattern)
        albums.value = allAlbums.filter(
            (a) => a.artist && a.artist.toLowerCase() === props.name.toLowerCase(),
        );
    } catch {
        error.value = t('music.artistNotFound') ?? 'Artist not found';
        artist.value = null;
        albums.value = [];
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    void loadArtist();
});

function goToAlbum(album: MusicAlbum): void {
    void router.push({ name: 'music-album', params: { name: album.title } });
}

// Total track count across all albums
const totalTracks = computed(() => {
    return albums.value.reduce((sum, a) => sum + (a.totalTracks ?? 0), 0);
});
</script>

<template>
    <div class="artist-page">
        <!-- Back link -->
        <nav class="artist-page__back-nav">
            <router-link to="/app/music/artists" class="artist-page__back-link">
                <Icon name="arrow-left" class="artist-page__back-icon" />
                <span>{{ t('music.artists') }}</span>
            </router-link>
        </nav>

        <!-- Loading skeleton -->
        <div v-if="loading" class="artist-page__loading" role="status" aria-busy="true">
            <div class="artist-skel">
                <div class="artist-skel__art" />
                <div class="artist-skel__info">
                    <div class="artist-skel__name" />
                    <div class="artist-skel__meta" />
                </div>
            </div>
            <div class="artist-page__skel-albums">
                <div v-for="n in 6" :key="n" class="album-skel">
                    <div class="album-skel__cover" />
                    <div class="album-skel__title" />
                    <div class="album-skel__meta" />
                </div>
            </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="artist-page__error" role="alert">
            <Icon name="alert-circle" class="artist-page__error-icon" />
            <p>{{ error }}</p>
        </div>

        <!-- Artist detail -->
        <template v-else-if="artist">
            <!-- Artist header -->
            <header class="artist-header">
                <div class="artist-header__art">
                    <svg v-if="!artist.imageUrl" viewBox="0 0 100 100" class="artist-header__art-placeholder">
                        <rect x="10" y="10" width="80" height="80" rx="40" fill="#3b2d5c"/>
                        <rect x="25" y="25" width="50" height="50" rx="25" fill="#6b4d8a"/>
                        <circle cx="50" cy="42" r="15" fill="#9b6dcc"/>
                        <path d="M30 70 Q50 55 70 70" stroke="#9b6dcc" stroke-width="4" fill="none" stroke-linecap="round"/>
                    </svg>
                    <img
                        v-else
                        :src="artist.imageUrl"
                        :alt="artist.name"
                        class="artist-header__art-img"
                    >
                </div>
                <div class="artist-header__info">
                    <h1 class="artist-header__name">{{ artist.name }}</h1>
                    <p class="artist-header__meta">
                        <span>{{ albums.length }} {{ albums.length === 1 ? 'album' : 'albums' }}</span>
                        <span v-if="totalTracks > 0"> · {{ totalTracks }} tracks</span>
                    </p>
                </div>
            </header>

            <!-- Albums section -->
            <section class="artist-albums" aria-label="Albums">
                <h2 class="artist-albums__title">{{ t('music.albums') }}</h2>
                <div v-if="albums.length === 0" class="artist-albums__empty">
                    <Icon name="image" class="artist-albums__empty-icon" />
                    <p>{{ t('music.noAlbums') }}</p>
                </div>
                <div v-else class="artist-albums__grid">
                    <MusicAlbumCard
                        v-for="album in albums"
                        :key="album.id"
                        :album="album"
                        @click="goToAlbum"
                    />
                </div>
            </section>
        </template>

        <!-- Empty artist (shouldn't happen with error handling above) -->
        <div v-else class="artist-page__empty" role="status">
            <Icon name="music" class="artist-page__empty-icon" />
            <p>{{ t('music.artistNotFound') }}</p>
        </div>
    </div>
</template>

<style scoped>
.artist-page {
    padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
    max-width: 1200px;
    margin: 0 auto;
}

/* Back nav */
.artist-page__back-nav {
    margin-bottom: var(--space-6, 24px);
}
.artist-page__back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    text-decoration: none;
    transition: color var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.artist-page__back-link:hover {
    color: var(--accent, #f5a524);
}
.artist-page__back-icon {
    width: 16px;
    height: 16px;
}

/* Artist header */
.artist-header {
    display: flex;
    gap: var(--space-6, 24px);
    margin-bottom: var(--space-10, 40px);
    align-items: flex-start;
}
.artist-header__art {
    flex: 0 0 200px;
    width: 200px;
}
.artist-header__art-placeholder {
    width: 200px;
    height: 200px;
    border-radius: var(--radius-lg, 12px);
}
.artist-header__art-img {
    width: 200px;
    height: 200px;
    border-radius: var(--radius-lg, 12px);
    object-fit: cover;
}
.artist-header__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2, 8px);
    padding-top: var(--space-4, 16px);
}
.artist-header__name {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-3xl, 1.875rem);
    letter-spacing: var(--tracking-tight, -0.02em);
    color: var(--text, #e4e4e7);
    margin: 0;
}
.artist-header__meta {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}

/* Albums section */
.artist-albums {
    margin-top: var(--space-4, 16px);
}
.artist-albums__title {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-xl, 1.25rem);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-5, 20px);
}
.artist-albums__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-5, 20px);
}
.artist-albums__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-12, 48px) var(--space-4, 16px);
    color: var(--text-muted, #a1a1aa);
    text-align: center;
}
.artist-albums__empty-icon {
    width: 32px;
    height: 32px;
    opacity: 0.5;
    margin-bottom: var(--space-1, 4px);
}

/* Loading skeleton */
.artist-page__loading {
    display: flex;
    flex-direction: column;
    gap: var(--space-6, 24px);
}
.artist-skel {
    display: flex;
    gap: var(--space-6, 24px);
}
.artist-skel__art {
    width: 200px;
    height: 200px;
    border-radius: var(--radius-lg, 12px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
    flex: 0 0 200px;
}
.artist-skel__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding-top: var(--space-4, 16px);
}
.artist-skel__name {
    height: 2.5rem;
    width: 50%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.artist-skel__meta {
    height: 1rem;
    width: 30%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.artist-page__skel-albums {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-5, 20px);
}
.album-skel {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding: var(--space-3, 12px);
    border-radius: var(--radius-lg, 12px);
    background: var(--surface-2, #27272a);
    border: 1px solid var(--border, #3f3f46);
}
.album-skel__cover {
    aspect-ratio: 1;
    border-radius: var(--radius-md, 8px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.album-skel__title {
    height: 0.85em;
    width: 75%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.album-skel__meta {
    height: 0.7em;
    width: 45%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}

/* Error state */
.artist-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--danger, #f87171);
    text-align: center;
}
.artist-page__error-icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    margin-bottom: var(--space-2, 8px);
}

/* Empty state */
.artist-page__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--text-muted, #a1a1aa);
    text-align: center;
}
.artist-page__empty-icon {
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
    .artist-skel__meta,
    .album-skel__cover,
    .album-skel__title,
    .album-skel__meta {
        animation: none;
    }
}
</style>
