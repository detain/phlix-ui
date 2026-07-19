<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * PhotoAlbumPage (`/app/photo/album/{id}`) — single album view.
 *
 * Shows a grid of photo thumbnails within an album. Clicking a photo
 * opens the photo detail view at `/app/photo/photo/{id}`.
 *
 * Data: `GET /api/v1/photo/albums/{id}?library_id=` via photoApi.getAlbum.
 */
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { photoApi } from '../api/photos';
import type { PhotoAlbum } from '../types/photo';
import { albumTitle } from '../types/photo';
import Icon from '../components/Icon.vue';
import Button from '../components/ui/Button.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';

const props = defineProps<{
    /** Album id (md5 hash of date) */
    id: string;
}>();

const apiBase = useMediaApiBase();
const route = useRoute();
const router = useRouter();

const libraryId = computed<string | null>(() => {
    const q = route.query.library_id;
    return typeof q === 'string' && q ? q : null;
});

const album = ref<PhotoAlbum | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const imageErrors = ref<Set<string>>(new Set());

async function loadAlbum(): Promise<void> {
    if (!props.id || !libraryId.value) return;
    loading.value = true;
    error.value = null;
    try {
        album.value = await photoApi.getAlbum(apiBase.value, props.id, libraryId.value);
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to load album';
        album.value = null;
    } finally {
        loading.value = false;
    }
}

function openPhoto(photoId: string): void {
    router.push({
        path: `/app/photo/photo/${photoId}`,
        query: libraryId.value ? { library_id: libraryId.value, album_id: props.id } : { album_id: props.id },
    });
}

function handleImageError(photoId: string): void {
    imageErrors.value.add(photoId);
}

function goBack(): void {
    router.push({
        path: '/app/photo/albums',
        query: libraryId.value ? { library_id: libraryId.value } : {},
    });
}

function startSlideshow(): void {
    router.push({
        path: '/app/photo/slideshow',
        query: libraryId.value ? { library_id: libraryId.value, album: props.id } : { album: props.id },
    });
}

onMounted(() => {
    if (libraryId.value) {
        void loadAlbum();
    }
});

watch([() => props.id, libraryId], () => {
    if (props.id && libraryId.value) {
        void loadAlbum();
    }
});
</script>

<template>
    <div class="photo-album-page">
        <header class="page-header">
            <div class="header-content">
                <Button variant="ghost" class="back-button" @click="goBack">
                    <Icon name="arrow-left" />
                    Back to Albums
                </Button>
                <div class="title-section">
                    <h1 class="page-title">{{ album ? albumTitle(album) : 'Album' }}</h1>
                    <p v-if="album" class="photo-count">
                        {{ album.photo_count }} {{ album.photo_count === 1 ? 'photo' : 'photos' }}
                    </p>
                </div>
                <Button
                    v-if="album && album.photos.length > 0"
                    variant="subtle"
                    class="slideshow-button"
                    @click="startSlideshow"
                >
                    <Icon name="play" />
                    Slideshow
                </Button>
            </div>
        </header>

        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
            <Spinner size="large" />
            <p>Loading album...</p>
        </div>

        <!-- Error state -->
        <EmptyState v-else-if="error" icon="alert-circle" :title="error">
            <Button variant="solid" @click="loadAlbum">Retry</Button>
        </EmptyState>

        <!-- No library selected -->
        <EmptyState v-else-if="!libraryId" icon="image" title="No Library Selected">
            <p>This album requires a library context. Please access it from the albums listing.</p>
            <Button variant="subtle" @click="goBack">Go to Albums</Button>
        </EmptyState>

        <!-- No album found -->
        <EmptyState v-else-if="!album" icon="image" title="Album Not Found">
            <p>This album could not be found.</p>
            <Button variant="subtle" @click="goBack">Go to Albums</Button>
        </EmptyState>

        <!-- No photos in album -->
        <EmptyState v-else-if="album.photos.length === 0" icon="image" title="No Photos">
            <p>This album is empty.</p>
        </EmptyState>

        <!-- Photo grid -->
        <div v-else class="photo-grid">
            <article
                v-for="photo in album.photos"
                :key="photo.id"
                class="photo-card"
                @click="openPhoto(photo.id)"
            >
                <div class="photo-thumbnail">
                    <img
                        v-if="photo.thumbnail_url && !imageErrors.has(photo.id)"
                        :src="photo.thumbnail_url"
                        :alt="photo.name"
                        loading="lazy"
                        @error="handleImageError(photo.id)"
                    />
                    <div v-else class="photo-placeholder">
                        <Icon name="image" />
                    </div>
                </div>
                <div class="photo-info">
                    <p class="photo-name" :title="photo.name">{{ photo.name }}</p>
                </div>
            </article>
        </div>
    </div>
</template>

<style scoped>
.photo-album-page {
    padding: var(--space-6);
    max-width: 1600px;
    margin: 0 auto;
}

.page-header {
    margin-bottom: var(--space-6);
}

.header-content {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
}

.back-button {
    flex-shrink: 0;
}

.title-section {
    flex: 1;
    min-width: 200px;
}

.page-title {
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-fg);
    margin: 0;
}

.photo-count {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin: var(--space-1) 0 0;
}

.slideshow-button {
    flex-shrink: 0;
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

.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--space-4);
}

.photo-card {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    border: 1px solid var(--color-border);
}

.photo-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.photo-thumbnail {
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--color-bg);
}

.photo-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
}

.photo-card:hover .photo-thumbnail img {
    transform: scale(1.05);
}

.photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-muted);
}

.photo-placeholder :deep(svg) {
    width: 48px;
    height: 48px;
}

.photo-info {
    padding: var(--space-3);
}

.photo-name {
    font-size: var(--text-sm);
    color: var(--color-fg);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>