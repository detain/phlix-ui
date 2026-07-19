<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * PhotoAlbumsPage (`/app/photo/albums`) — photo albums listing.
 *
 * Lists all photo albums for a library, grouped by date (month/year).
 * Each album card shows the cover photo, album name (date), photo count,
 * and date range. Clicking navigates to `/app/photo/album/{id}`.
 *
 * Data: `GET /api/v1/photo/albums?library_id=` via photoApi.getAlbums.
 * Requires a `library_id` query param to identify which library to browse.
 * If no library is selected, prompts user to select one from their libraries.
 */
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { useLibrariesStore } from '../stores/useLibrariesStore';
import { photoApi } from '../api/photos';
import type { PhotoAlbum } from '../types/photo';
import { albumTitle } from '../types/photo';
import Icon from '../components/Icon.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';

const apiBase = useMediaApiBase();
const libraries = useLibrariesStore();
const route = useRoute();
const router = useRouter();

// Find the photo library from the query param or first photo library
const libraryId = computed<string | null>(() => {
    const q = route.query.library_id;
    if (typeof q === 'string' && q) return q;
    // Find first photo library
    const photoLib = libraries.items.find((l) => l.type === 'photo');
    return photoLib?.id ?? null;
});

const library = computed(() => libraryId.value ? libraries.byId(libraryId.value) : null);

// Album data
const albums = ref<PhotoAlbum[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// Group albums by month/year for section headers
interface AlbumGroup {
    label: string;
    albums: PhotoAlbum[];
}

const groupedAlbums = computed<AlbumGroup[]>(() => {
    const groups: Map<string, PhotoAlbum[]> = new Map();

    for (const album of albums.value) {
        // Parse YYYY-MM-DD to get year/month for grouping
        const parts = album.date.split('-');
        if (parts.length >= 2) {
            const year = parts[0];
            const month = parts[1];
            const label = new Date(parseInt(year), parseInt(month) - 1, 1)
                .toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
            if (!groups.has(label)) {
                groups.set(label, []);
            }
            groups.get(label)!.push(album);
        } else {
            // Unknown date goes in its own group
            const label = 'Undated';
            if (!groups.has(label)) {
                groups.set(label, []);
            }
            groups.get(label)!.push(album);
        }
    }

    return Array.from(groups.entries()).map(([label, albs]) => ({ label, albums: albs }));
});

async function loadAlbums(): Promise<void> {
    if (!libraryId.value) return;
    loading.value = true;
    error.value = null;
    try {
        albums.value = await photoApi.getAlbums(apiBase.value, libraryId.value);
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to load albums';
        albums.value = [];
    } finally {
        loading.value = false;
    }
}

function openAlbum(album: PhotoAlbum): void {
    router.push({
        path: `/app/photo/album/${album.id}`,
        query: libraryId.value ? { library_id: libraryId.value } : {},
    });
}

function formatPhotoCount(count: number): string {
    return count === 1 ? '1 photo' : `${count} photos`;
}

// Load libraries first, then albums
onMounted(async () => {
    await libraries.load(apiBase.value);
    if (libraryId.value) {
        void loadAlbums();
    }
});

// Reload when library changes
watch(libraryId, () => {
    if (libraryId.value) {
        void loadAlbums();
    }
});

// If no library selected, show library picker
const showLibraryPicker = computed(() => !libraryId.value && libraries.items.length > 0);
const photoLibraries = computed(() => libraries.items.filter((l) => l.type === 'photo'));

function selectLibrary(id: string): void {
    router.replace({ query: { library_id: id } });
}
</script>

<template>
    <div class="photo-albums-page">
        <header class="page-header">
            <div class="header-content">
                <h1 class="page-title">
                    <Icon name="image" class="title-icon" />
                    Photo Albums
                </h1>
                <p v-if="library" class="library-name">{{ library.name }}</p>
            </div>
        </header>

        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
            <Spinner size="large" />
            <p>Loading albums...</p>
        </div>

        <!-- Error state -->
        <EmptyState v-else-if="error" icon="alert-circle" :title="error">
            <Button variant="solid" @click="loadAlbums">Retry</Button>
        </EmptyState>

        <!-- No library selected -->
        <EmptyState v-else-if="showLibraryPicker" icon="image" title="Select a Photo Library">
            <p>Choose a photo library to browse:</p>
            <div class="library-picker">
                <Button
                    v-for="lib in photoLibraries"
                    :key="lib.id"
                    variant="subtle"
                    @click="selectLibrary(lib.id)"
                >
                    {{ lib.name }}
                </Button>
            </div>
        </EmptyState>

        <!-- No photo libraries -->
        <EmptyState v-else-if="!loading && photoLibraries.length === 0" icon="image" title="No Photo Libraries">
            <p>You don't have any photo libraries configured.</p>
        </EmptyState>

        <!-- No albums -->
        <EmptyState v-else-if="!loading && albums.length === 0" icon="image" title="No Albums Yet">
            <p>This library has no photos.</p>
        </EmptyState>

        <!-- Albums grid -->
        <div v-else class="albums-content">
            <section v-for="group in groupedAlbums" :key="group.label" class="album-group">
                <h2 class="group-label">{{ group.label }}</h2>
                <div class="albums-grid">
                    <article
                        v-for="album in group.albums"
                        :key="album.id"
                        class="album-card"
                        @click="openAlbum(album)"
                    >
                        <div class="album-cover">
                            <img
                                v-if="album.cover_photo?.thumbnail_url"
                                :src="album.cover_photo.thumbnail_url"
                                :alt="albumTitle(album)"
                                loading="lazy"
                            />
                            <div v-else class="album-cover-placeholder">
                                <Icon name="image" />
                            </div>
                        </div>
                        <div class="album-info">
                            <h3 class="album-title">{{ albumTitle(album) }}</h3>
                            <p class="album-count">{{ formatPhotoCount(album.photo_count) }}</p>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.photo-albums-page {
    padding: var(--space-6);
    max-width: 1400px;
    margin: 0 auto;
}

.page-header {
    margin-bottom: var(--space-8);
}

.header-content {
    display: flex;
    align-items: baseline;
    gap: var(--space-4);
    flex-wrap: wrap;
}

.page-title {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-fg);
    margin: 0;
}

.title-icon {
    color: var(--color-accent);
}

.library-name {
    color: var(--color-muted);
    font-size: var(--text-lg);
    margin: 0;
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-16);
    gap: var(--space-4);
    color: var(--color-muted);
}

.library-picker {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-4);
    justify-content: center;
}

.albums-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
}

.album-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}

.group-label {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-fg);
    margin: 0;
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--color-border);
}

.albums-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-5);
}

.album-card {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    border: 1px solid var(--color-border);
}

.album-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.album-cover {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: var(--color-bg);
}

.album-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.album-cover-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-muted);
}

.album-cover-placeholder :deep(svg) {
    width: 48px;
    height: 48px;
}

.album-info {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
}

.album-title {
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-fg);
    margin: 0;
}

.album-count {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin: 0;
}
</style>