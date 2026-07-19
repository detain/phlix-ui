<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * PhotoSlideshowPage (`/app/photo/slideshow`) — photo slideshow.
 *
 * Auto-advances through photos at a configurable interval.
 * Supports prev/next navigation and pause/play.
 * Gets `?album={id}` and `?library_id=` params from URL.
 *
 * Data: `GET /api/v1/photo/slideshow?library_id=&album_id=&interval=` via photoApi.getSlideshow.
 * Note: `url` (stream_url) is a signed URL that can expire — handle by re-fetching.
 */
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { photoApi } from '../api/photos';
import type { SlideshowItem } from '../types/photo';
import Icon from '../components/Icon.vue';
import Button from '../components/ui/Button.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';

const apiBase = useMediaApiBase();
const route = useRoute();
const router = useRouter();

const libraryId = computed<string | null>(() => {
    const q = route.query.library_id;
    return typeof q === 'string' && q ? q : null;
});

const albumId = computed<string | null>(() => {
    const q = route.query.album;
    return typeof q === 'string' && q ? q : null;
});

const requestedInterval = computed<number>(() => {
    const q = route.query.interval;
    if (typeof q === 'string') {
        const n = parseInt(q, 10);
        if (!isNaN(n) && n >= 1 && n <= 300) return n;
    }
    return 5; // default 5 seconds
});

// Slideshow state
const slides = ref<SlideshowItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const imageError = ref(false);

// Playback state
const currentIndex = ref(0);
const isPlaying = ref(true);
const interval = ref(requestedInterval.value);
let timer: ReturnType<typeof setInterval> | null = null;

const currentSlide = computed<SlideshowItem | null>(() => {
    return slides.value[currentIndex.value] ?? null;
});

const hasPrev = computed(() => currentIndex.value > 0);
const hasNext = computed(() => currentIndex.value < slides.value.length - 1);

const progress = computed(() => {
    if (slides.value.length === 0) return 0;
    return ((currentIndex.value + 1) / slides.value.length) * 100;
});

async function loadSlideshow(): Promise<void> {
    if (!libraryId.value) return;
    loading.value = true;
    error.value = null;
    imageError.value = false;
    try {
        const response = await photoApi.getSlideshow(apiBase.value, libraryId.value, {
            albumId: albumId.value ?? undefined,
            interval: requestedInterval.value,
        });
        slides.value = response.slideshow;
        interval.value = response.interval;
        currentIndex.value = 0;
        // Start playing if we have slides
        if (slides.value.length > 0) {
            startTimer();
        }
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to load slideshow';
        slides.value = [];
    } finally {
        loading.value = false;
    }
}

function startTimer(): void {
    stopTimer();
    if (slides.value.length <= 1) return;
    timer = setInterval(() => {
        if (isPlaying.value) {
            advance();
        }
    }, interval.value * 1000);
}

function stopTimer(): void {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function advance(): void {
    if (slides.value.length === 0) return;
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
    imageError.value = false;
}

function goPrev(): void {
    if (hasPrev.value) {
        currentIndex.value--;
        imageError.value = false;
    }
}

function goNext(): void {
    if (hasNext.value) {
        currentIndex.value++;
        imageError.value = false;
    }
}

function togglePlay(): void {
    isPlaying.value = !isPlaying.value;
}

function exit(): void {
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

function handleImageError(): void {
    imageError.value = true;
}

// Keyboard shortcuts
function handleKeydown(e: KeyboardEvent): void {
    switch (e.key) {
        case 'ArrowLeft':
            goPrev();
            break;
        case 'ArrowRight':
            goNext();
            break;
        case ' ':
            e.preventDefault();
            togglePlay();
            break;
        case 'Escape':
            exit();
            break;
    }
}

onMounted(() => {
    void loadSlideshow();
    window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    stopTimer();
    window.removeEventListener('keydown', handleKeydown);
});

watch([libraryId, albumId], () => {
    void loadSlideshow();
});
</script>

<template>
    <div class="photo-slideshow-page">
        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
            <Spinner size="large" />
            <p>Loading slideshow...</p>
        </div>

        <!-- Error state -->
        <EmptyState v-else-if="error" icon="alert-circle" :title="error">
            <Button variant="solid" @click="loadSlideshow">Retry</Button>
            <Button variant="subtle" @click="exit">Exit</Button>
        </EmptyState>

        <!-- No library selected -->
        <EmptyState v-else-if="!libraryId" icon="image" title="No Library Selected">
            <p>Please access the slideshow from an album.</p>
            <Button variant="subtle" @click="exit">Go Back</Button>
        </EmptyState>

        <!-- No slides -->
        <EmptyState v-else-if="slides.length === 0" icon="image" title="No Photos">
            <p>This slideshow has no photos.</p>
            <Button variant="subtle" @click="exit">Go Back</Button>
        </EmptyState>

        <!-- Slideshow view -->
        <div v-else class="slideshow-container">
            <!-- Main image area -->
            <div class="slideshow-main" @click="togglePlay">
                <img
                    v-if="currentSlide?.url && !imageError"
                    :key="currentSlide.id"
                    :src="currentSlide.url"
                    :alt="currentSlide.caption || `Slide ${currentIndex + 1}`"
                    class="slide-image"
                    @error="handleImageError"
                />
                <div v-else class="slide-placeholder">
                    <Icon name="image" />
                    <p>Failed to load image</p>
                </div>

                <!-- Caption overlay -->
                <div v-if="currentSlide?.caption" class="caption-overlay">
                    {{ currentSlide.caption }}
                </div>
            </div>

            <!-- Controls -->
            <div class="slideshow-controls">
                <!-- Progress bar -->
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: `${progress}%` }" />
                </div>

                <div class="controls-row">
                    <!-- Navigation info -->
                    <div class="slide-counter">
                        {{ currentIndex + 1 }} / {{ slides.length }}
                    </div>

                    <!-- Main controls -->
                    <div class="main-controls">
                        <Button
                            variant="ghost"
                            :title="hasPrev ? 'Previous (←)' : ''"
                            :disabled="!hasPrev"
                            @click.stop="goPrev"
                        >
                            <Icon name="skip-back" />
                        </Button>
                        <Button
                            variant="solid"
                            :title="isPlaying ? 'Pause (Space)' : 'Play (Space)'"
                            @click.stop="togglePlay"
                        >
                            <Icon :name="isPlaying ? 'pause' : 'play'" />
                        </Button>
                        <Button
                            variant="ghost"
                            :title="hasNext ? 'Next (→)' : ''"
                            :disabled="!hasNext"
                            @click.stop="goNext"
                        >
                            <Icon name="skip-forward" />
                        </Button>
                    </div>

                    <!-- Exit button -->
                    <Button variant="ghost" title="Exit (Esc)" @click.stop="exit">
                        <Icon name="x" />
                    </Button>
                </div>

                <!-- Thumbnail strip -->
                <div class="thumbnail-strip">
                    <div
                        v-for="(slide, idx) in slides"
                        :key="slide.id"
                        class="thumbnail"
                        :class="{ active: idx === currentIndex }"
                        @click.stop="currentIndex = idx"
                    >
                        <img
                            :src="slide.thumbnail_url"
                            :alt="`Thumbnail ${idx + 1}`"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.photo-slideshow-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #000;
    color: #fff;
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

.slideshow-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.slideshow-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.slide-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    animation: fade-in 0.3s ease-out;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.slide-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    color: var(--color-muted);
}

.slide-placeholder :deep(svg) {
    width: 64px;
    height: 64px;
}

.caption-overlay {
    position: absolute;
    bottom: var(--space-6);
    left: 50%;
    transform: translateX(-50%);
    padding: var(--space-2) var(--space-4);
    background: rgba(0, 0, 0, 0.7);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: #fff;
    max-width: 80%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.slideshow-controls {
    flex-shrink: 0;
    background: rgba(0, 0, 0, 0.9);
    padding: var(--space-3) var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.progress-bar {
    height: 3px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--color-accent, #e50914);
    transition: width 0.3s linear;
}

.controls-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.slide-counter {
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.7);
    min-width: 60px;
}

.main-controls {
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.main-controls :deep(button) {
    color: #fff;
}

.main-controls :deep(button):hover {
    background: rgba(255, 255, 255, 0.1);
}

.main-controls :deep(button):disabled {
    opacity: 0.3;
}

.thumbnail-strip {
    display: flex;
    gap: var(--space-2);
    overflow-x: auto;
    padding: var(--space-1) 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.thumbnail-strip::-webkit-scrollbar {
    height: 4px;
}

.thumbnail-strip::-webkit-scrollbar-track {
    background: transparent;
}

.thumbnail-strip::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
}

.thumbnail {
    flex-shrink: 0;
    width: 60px;
    height: 45px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity var(--transition-fast);
    border: 2px solid transparent;
}

.thumbnail:hover {
    opacity: 0.8;
}

.thumbnail.active {
    opacity: 1;
    border-color: var(--color-accent, #e50914);
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>