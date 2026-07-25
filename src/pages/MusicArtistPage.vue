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
 *   - Albums: `GET /api/v1/music/albums?artist={name}&limit&offset` — filtered
 *     SERVER-side (S99) and offset-paged (S110)
 * Clicking an album navigates to `/app/music/album/:name`.
 *
 * ⚠ This used to fetch page 1 of `/albums` and filter it client-side. `/albums` is
 * ordered globally by artist then title and clamped to `MUSIC_PAGE_SIZE`, so page 1
 * spans only ~23 of the library's 2,197 artists: any artist outside that window
 * rendered an EMPTY album list. The `?artist=` filter is both correct and ~140×
 * cheaper server-side (0.95 ms vs 134 ms, measured on production).
 */
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient, MUSIC_PAGE_SIZE } from '../api/client';
import MusicAlbumCard from '../components/MusicAlbumCard.vue';
import MusicPager from '../components/MusicPager.vue';
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
/** Whole-page failure (the artist itself could not be read) — replaces the page. */
const error = ref<string | null>(null);
/**
 * ONE album page failed. Distinct from `error`: the artist and the previously loaded
 * albums are still on screen, so this renders as a banner and the pager stays usable.
 */
const pageError = ref<string | null>(null);

// --- album paging (three production artists hold more than one page: 142/109/104) ---
const albumTotal = ref(0);
const albumLimit = ref(MUSIC_PAGE_SIZE);
const albumOffset = ref(0);

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
}

/**
 * Load ONE album page for this artist. The single loader for both entry points —
 * `loadArtist` (mount) and `goToAlbumOffset` (pager) — because when they were two
 * copies they immediately drifted in their failure handling.
 */
async function loadAlbumPage(offset: number): Promise<void> {
    const page = await getClient().listAlbums({
        artist: props.name,
        limit: MUSIC_PAGE_SIZE,
        offset,
    });
    albums.value = page.albums;
    albumTotal.value = page.total;
    albumLimit.value = page.limit;
    albumOffset.value = page.offset;
}

async function loadArtist(): Promise<void> {
    if (!props.name) return;
    loading.value = true;
    error.value = null;
    try {
        // Artist info and the artist's first album page, in parallel.
        const [artistData] = await Promise.all([
            getClient().getArtist(props.name),
            loadAlbumPage(0),
        ]);
        artist.value = artistData;
    } catch {
        // A FIRST load has nothing to preserve, so this is the whole-page error.
        error.value = t('music.artistNotFound') ?? 'Artist not found';
        artist.value = null;
        albums.value = [];
        albumTotal.value = 0;
        albumOffset.value = 0;
    } finally {
        loading.value = false;
    }
}

/**
 * Load another album page for the same artist (no need to re-read artist info).
 *
 * **Shared PAGE-failure policy — identical in all four music listings** (canonical
 * note: `MusicLibraryPage.loadArtists`): a failed page keeps the rows, the `total` and
 * the `offset` and sets `pageError`. Zeroing `total` — which this did — removed the
 * pager, so a blip on page 2 of a 142-album artist left an empty grid, no pager and a
 * false "No albums" with no way back. That dead end was new with S110's pager.
 *
 * FIRST-load failure is NOT uniform across the four pages (three shapes, all
 * deliberate — see the canonical note). THIS page has its own shape: a failed
 * `loadArtist()` replaces the WHOLE page, which is why there are two refs — `error`
 * for the artist itself, `pageError` for one album page of an artist already on
 * screen. Keeping them separate is what lets an album-page blip stay a banner.
 */
async function goToAlbumOffset(offset: number): Promise<void> {
    if (offset === albumOffset.value) return;
    loading.value = true;
    pageError.value = null;
    try {
        await loadAlbumPage(offset);
    } catch {
        pageError.value = t('music.pageLoadFailed');
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    void loadArtist();
});

/**
 * Navigate to the album, carrying the ARTIST as a query param. Without it the album
 * detail route resolves a shared title to the server's deterministic first match,
 * and 2,622 of production's 5,091 album titles are shared between artists (zero
 * repeat WITHIN an artist, so artist+title is exact). A query param rather than a
 * second route param, so a consumer's existing `/music/album/:name` route keeps
 * working unchanged.
 */
function goToAlbum(album: MusicAlbum): void {
    void router.push({
        name: 'music-album',
        params: { name: album.title },
        query: { artist: album.artist ?? props.name },
    });
}

/**
 * Album count for the header — the server's filtered `total`, falling back to the
 * artist row's own `album_count`. Never `albums.length`, which is one page.
 */
const albumCount = computed(() => albumTotal.value || artist.value?.albumCount || 0);
const albumCountLabel = computed(() =>
    albumCount.value === 1
        ? t('music.albumsTotalOne')
        : t('music.albumsTotal', { count: albumCount.value.toLocaleString() }),
);

/**
 * The artist's TRUE track total, from the server's `track_count` — NOT a sum over
 * the loaded album page. Summing the page made the header report the tracks of
 * whichever 100 albums were loaded, so the 142-album artist showed one number on
 * page 1 and a smaller one on page 2. Falls back to the page sum only when the
 * server sent no `track_count` at all.
 */
const trackCount = computed(
    () => artist.value?.trackCount
        ?? albums.value.reduce((sum, a) => sum + (a.totalTracks ?? 0), 0),
);
const trackCountLabel = computed(() =>
    trackCount.value === 1
        ? t('music.tracksTotalOne')
        : t('music.tracksTotal', { count: trackCount.value.toLocaleString() }),
);
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
                        <span data-count="albums">{{ albumCountLabel }}</span>
                        <span v-if="trackCount > 0" data-count="tracks"> · {{ trackCountLabel }}</span>
                    </p>
                </div>
            </header>

            <!-- Albums section -->
            <section class="artist-albums" aria-label="Albums">
                <h2 class="artist-albums__title">{{ t('music.albums') }}</h2>
                <!-- One page failed: banner, not a replacement — the albums the user
                     was looking at are still below, and the pager still works. -->
                <div v-if="pageError" class="artist-albums__page-error" role="alert">
                    <Icon name="alert-circle" class="artist-albums__empty-icon" />
                    <p>{{ pageError }}</p>
                </div>
                <!-- The `aria-controls` IDREF is on this always-rendered wrapper, not
                     on the grid inside the v-if, so it never dangles mid-load. -->
                <div id="music-artist-albums">
                    <div v-if="albums.length === 0 && !pageError" class="artist-albums__empty">
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
                </div>
                <MusicPager
                    :offset="albumOffset"
                    :limit="albumLimit"
                    :total="albumTotal"
                    :disabled="loading"
                    :label="t('music.albums')"
                    controls="music-artist-albums"
                    @go="goToAlbumOffset"
                />
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
.artist-albums__page-error {
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
    margin-bottom: var(--space-4, 16px);
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border-radius: var(--radius-md, 8px);
    background: var(--surface-2, #27272a);
    border: 1px solid var(--danger, #f87171);
    color: var(--danger, #f87171);
    font-size: var(--text-sm, 0.875rem);
}
.artist-albums__page-error p {
    margin: 0;
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
