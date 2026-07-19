<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * PhotoViewPage (`/app/photo/photo/{id}`) — single photo view.
 *
 * Displays a full-size photo with navigation prev/next, zoom capability,
 * metadata sidebar (filename, date, camera info), and download button.
 *
 * Data: `GET /api/v1/photo/photos/{id}` via photoApi.getPhoto.
 * Also fetches album photos for prev/next navigation.
 * Note: `full_url` is a signed URL that can expire — handle by re-fetching.
 */
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { photoApi } from '../api/photos';
import type { PhotoDetail, Photo } from '../types/photo';
import { formatExifSummary } from '../types/photo';
import Icon from '../components/Icon.vue';
import Button from '../components/ui/Button.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';

const props = defineProps<{
    /** Photo id */
    id: string;
}>();

const apiBase = useMediaApiBase();
const route = useRoute();
const router = useRouter();

const libraryId = computed<string | null>(() => {
    const q = route.query.library_id;
    return typeof q === 'string' && q ? q : null;
});

const albumId = computed<string | null>(() => {
    const q = route.query.album_id;
    return typeof q === 'string' && q ? q : null;
});

// Photo data
const photo = ref<PhotoDetail | null>(null);
const albumPhotos = ref<Photo[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const imageError = ref(false);

// Zoom state
const zoomLevel = ref(1);
const isZoomed = ref(false);

// Current photo index in album for navigation
const currentIndex = computed(() => {
    if (!photo.value) return -1;
    return albumPhotos.value.findIndex((p) => p.id === photo.value!.id);
});

const hasPrev = computed(() => currentIndex.value > 0);
const hasNext = computed(() => currentIndex.value < albumPhotos.value.length - 1);

const prevPhoto = computed(() => hasPrev.value ? albumPhotos.value[currentIndex.value - 1] : null);
const nextPhoto = computed(() => hasNext.value ? albumPhotos.value[currentIndex.value + 1] : null);

// EXIF data formatted for display
const exifLines = computed<string[]>(() => {
    if (!photo.value?.exif) return [];
    return formatExifSummary(photo.value.exif);
});

async function loadPhoto(): Promise<void> {
    if (!props.id) return;
    loading.value = true;
    error.value = null;
    imageError.value = false;
    try {
        photo.value = await photoApi.getPhoto(apiBase.value, props.id);
        // Load album photos for navigation if we have an album id
        if (albumId.value && libraryId.value) {
            const album = await photoApi.getAlbum(apiBase.value, albumId.value, libraryId.value);
            albumPhotos.value = album.photos;
        } else {
            albumPhotos.value = [];
        }
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to load photo';
        photo.value = null;
    } finally {
        loading.value = false;
    }
}

function navigatePrev(): void {
    if (prevPhoto.value) {
        router.replace({
            path: `/app/photo/photo/${prevPhoto.value.id}`,
            query: { ...route.query },
        });
    }
}

function navigateNext(): void {
    if (nextPhoto.value) {
        router.replace({
            path: `/app/photo/photo/${nextPhoto.value.id}`,
            query: { ...route.query },
        });
    }
}

function toggleZoom(): void {
    if (isZoomed.value) {
        zoomLevel.value = 1;
        isZoomed.value = false;
    } else {
        zoomLevel.value = 2;
        isZoomed.value = true;
    }
}

function resetZoom(): void {
    zoomLevel.value = 1;
    isZoomed.value = false;
}

function goBack(): void {
    if (albumId.value) {
        router.push({
            path: `/app/photo/album/${albumId.value}`,
            query: libraryId.value ? { library_id: libraryId.value } : {},
        });
    } else {
        router.push({
            path: '/app/photo/albums',
            query: libraryId.value ? { library_id: libraryId.value } : {},
        });
    }
}

function handleImageLoadError(): void {
    imageError.value = true;
}

// Keyboard navigation
function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft' && hasPrev.value) {
        navigatePrev();
    } else if (e.key === 'ArrowRight' && hasNext.value) {
        navigateNext();
    } else if (e.key === 'Escape' && isZoomed.value) {
        resetZoom();
    } else if (e.key === 'z' || e.key === 'Z') {
        toggleZoom();
    }
}

onMounted(() => {
    void loadPhoto();
    window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
});

watch(() => props.id, () => {
    void loadPhoto();
});
</script>

<template>
    <div class="photo-view-page">
        <header class="page-header">
            <div class="header-content">
                <Button variant="ghost" class="back-button" @click="goBack">
                    <Icon name="arrow-left" />
                    Back
                </Button>
                <h1 v-if="photo" class="photo-name">{{ photo.name }}</h1>
                <div class="header-actions">
                    <Button
                        v-if="photo"
                        variant="subtle"
                        title="Toggle zoom (Z)"
                        @click="toggleZoom"
                    >
                        <Icon :name="isZoomed ? 'fullscreen-exit' : 'expand'" />
                    </Button>
                    <a
                        v-if="photo?.full_url"
                        :href="photo.full_url"
                        download
                        class="download-link"
                        target="_blank"
                        rel="noopener"
                    >
                        <Button variant="subtle" title="Download">
                            <Icon name="arrow-down" />
                        </Button>
                    </a>
                </div>
            </div>
        </header>

        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
            <Spinner size="large" />
            <p>Loading photo...</p>
        </div>

        <!-- Error state -->
        <EmptyState v-else-if="error" icon="alert-circle" :title="error">
            <Button variant="solid" @click="loadPhoto">Retry</Button>
        </EmptyState>

        <!-- Photo view -->
        <div v-else-if="photo" class="photo-view">
            <!-- Main image area -->
            <div class="image-container" :class="{ zoomed: isZoomed }">
                <div class="image-wrapper" :style="{ transform: `scale(${zoomLevel})` }">
                    <img
                        v-if="photo.full_url && !imageError"
                        :src="photo.full_url"
                        :alt="photo.name"
                        @error="handleImageLoadError"
                        @click="toggleZoom"
                    />
                    <div v-else class="image-placeholder">
                        <Icon name="image" />
                        <p>Failed to load image</p>
                    </div>
                </div>

                <!-- Navigation arrows -->
                <Button
                    v-if="hasPrev"
                    variant="ghost"
                    class="nav-button nav-prev"
                    @click="navigatePrev"
                >
                    <Icon name="chevron-left" />
                </Button>
                <Button
                    v-if="hasNext"
                    variant="ghost"
                    class="nav-button nav-next"
                    @click="navigateNext"
                >
                    <Icon name="chevron-right" />
                </Button>
            </div>

            <!-- Metadata sidebar -->
            <aside class="metadata-sidebar">
                <div class="sidebar-section">
                    <h3 class="section-title">File Info</h3>
                    <dl class="metadata-list">
                        <div class="metadata-item">
                            <dt>Filename</dt>
                            <dd>{{ photo.name }}</dd>
                        </div>
                        <div class="metadata-item">
                            <dt>Resolution</dt>
                            <dd v-if="photo.exif.width && photo.exif.height">
                                {{ photo.exif.width }} × {{ photo.exif.height }}
                            </dd>
                            <dd v-else>Unknown</dd>
                        </div>
                    </dl>
                </div>

                <div v-if="exifLines.length > 0" class="sidebar-section">
                    <h3 class="section-title">Camera Info</h3>
                    <ul class="exif-list">
                        <li v-for="(line, idx) in exifLines" :key="idx">{{ line }}</li>
                    </ul>
                </div>

                <div class="sidebar-section">
                    <h3 class="section-title">Navigation</h3>
                    <div class="nav-info">
                        <p v-if="albumPhotos.length > 0">
                            Photo {{ currentIndex + 1 }} of {{ albumPhotos.length }}
                        </p>
                        <div class="nav-hints">
                            <kbd>←</kbd> Previous
                            <kbd>→</kbd> Next
                            <kbd>Z</kbd> Zoom
                            <kbd>Esc</kbd> Reset
                        </div>
                    </div>
                </div>
            </aside>
        </div>

        <!-- Photo not found -->
        <EmptyState v-else icon="image" title="Photo Not Found">
            <p>This photo could not be found.</p>
            <Button variant="subtle" @click="goBack">Go Back</Button>
        </EmptyState>
    </div>
</template>

<style scoped>
.photo-view-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
}

.page-header {
    flex-shrink: 0;
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
}

.header-content {
    display: flex;
    align-items: center;
    gap: var(--space-4);
}

.back-button {
    flex-shrink: 0;
}

.photo-name {
    flex: 1;
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-fg);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.header-actions {
    display: flex;
    gap: var(--space-2);
    flex-shrink: 0;
}

.download-link {
    text-decoration: none;
}

.loading-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    color: var(--color-muted);
}

.photo-view {
    flex: 1;
    display: flex;
    min-height: 0;
    overflow: hidden;
}

.image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: var(--color-bg);
}

.image-wrapper {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--transition-normal);
    cursor: zoom-in;
}

.image-wrapper.zoomed {
    cursor: zoom-out;
}

.image-wrapper img {
    max-width: 100%;
    max-height: calc(100vh - 200px);
    object-fit: contain;
}

.image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    color: var(--color-muted);
    padding: var(--space-8);
}

.image-placeholder :deep(svg) {
    width: 64px;
    height: 64px;
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
}

.nav-prev {
    left: var(--space-4);
}

.nav-next {
    right: var(--space-4);
}

.metadata-sidebar {
    width: 280px;
    flex-shrink: 0;
    padding: var(--space-6);
    overflow-y: auto;
    border-left: 1px solid var(--color-border);
    background: var(--color-surface);
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
}

.sidebar-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.section-title {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
}

.metadata-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
}

.metadata-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
}

.metadata-item dt {
    font-size: var(--text-xs);
    color: var(--color-muted);
}

.metadata-item dd {
    font-size: var(--text-sm);
    color: var(--color-fg);
    margin: 0;
    word-break: break-all;
}

.exif-list {
    margin: 0;
    padding-left: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
}

.exif-list li {
    font-size: var(--text-sm);
    color: var(--color-fg);
}

.nav-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.nav-info p {
    font-size: var(--text-sm);
    color: var(--color-fg);
    margin: 0;
}

.nav-hints {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    font-size: var(--text-xs);
    color: var(--color-muted);
}

.nav-hints kbd {
    display: inline-block;
    padding: 2px 6px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-family: monospace;
    font-size: var(--text-xs);
}
</style>