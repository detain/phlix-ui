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
 * Note: `url` (stream_url) is a signed URL that can expire — an image error
 * triggers ONE silent position-keeping re-fetch (latch in `handleImageError`),
 * then the placeholder.
 */
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { useImageSrc } from '../composables/useImageSrc';
import { photoApi } from '../api/photos';
import type { SlideshowItem } from '../types/photo';
import Icon from '../components/Icon.vue';
import Button from '../components/ui/Button.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import { isTypingTarget } from '../components/player/shortcuts';
import { layerFocusDepth } from '../components/ui/useFocusTrap';

const apiBase = useMediaApiBase();
/** S241: image URLs in the media payload are ROOT-RELATIVE server paths; resolve
 *  them against the same (possibly relay-proxied) base the payload came from. */
const { imgSrc } = useImageSrc();
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
/**
 * Signed stream URLs expire mid-show. `urlRefetchAttempted` latches ONE silent
 * re-fetch per error episode (a genuinely broken URL must not turn every slide
 * into a refetch storm); the in-flight flag keeps a burst of error events from
 * firing parallel fetches. Both re-arm on a full reload and on user navigation.
 */
let urlRefetchAttempted = false;
let urlRefetchInFlight = false;

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
    if (!libraryId.value) {
        // No library in the route: the PREVIOUS album's slides are stale and must
        // not keep auto-advancing (or hold their expiring URLs) behind the
        // empty-state screen. Tear the show down before returning.
        stopTimer();
        slides.value = [];
        currentIndex.value = 0;
        imageError.value = false;
        error.value = null;
        urlRefetchAttempted = false;
        return;
    }
    loading.value = true;
    error.value = null;
    imageError.value = false;
    urlRefetchAttempted = false;
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

/**
 * Refresh the signed slide URLs in place (M8): keep the viewer's position by
 * re-joining on the current slide's id, falling back to the closest index when
 * the refreshed set changed shape. Any failure degrades to the placeholder
 * path — this call never loops (the latch in `handleImageError` owns that).
 */
async function refetchSlideshow(): Promise<void> {
    if (!libraryId.value) return;
    urlRefetchInFlight = true;
    try {
        const anchorId = currentSlide.value?.id ?? null;
        const keptIndex = currentIndex.value;
        const response = await photoApi.getSlideshow(apiBase.value, libraryId.value, {
            albumId: albumId.value ?? undefined,
            interval: requestedInterval.value,
        });
        slides.value = response.slideshow;
        interval.value = response.interval;
        const idx = anchorId === null ? -1 : slides.value.findIndex((s) => s.id === anchorId);
        currentIndex.value = idx >= 0 ? idx : Math.min(keptIndex, Math.max(0, slides.value.length - 1));
        imageError.value = false;
        startTimer();
    } catch {
        imageError.value = true;
    } finally {
        urlRefetchInFlight = false;
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
        urlRefetchAttempted = false;
    }
}

function goNext(): void {
    if (hasNext.value) {
        currentIndex.value++;
        imageError.value = false;
        urlRefetchAttempted = false;
    }
}

/** Jump to a thumbnail-selected slide (user navigation re-arms the refetch latch). */
function goToSlide(index: number): void {
    if (index < 0 || index >= slides.value.length) return;
    currentIndex.value = index;
    imageError.value = false;
    urlRefetchAttempted = false;
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
    // A failed image is usually an expired signed URL, not a dead photo: refresh
    // the show ONCE (silently, position-keeping) before falling back to the
    // placeholder. The latch only re-arms on a full reload or user navigation.
    if (!urlRefetchAttempted && !urlRefetchInFlight && libraryId.value) {
        urlRefetchAttempted = true;
        void refetchSlideshow();
        return;
    }
    imageError.value = true;
}

/**
 * Fourth-guard mirror of shortcuts.ts's `isButtonTarget` (handleShortcut, Space
 * case): Space/Enter already activate a focused button or link, so a global
 * handler must not also claim the key. Kept local (with the same shape and
 * name) so this page stays the only slideshow file touched.
 */
function isButtonTarget(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null;
    if (!el || !el.tagName) return false;
    const tag = el.tagName.toLowerCase();
    return tag === 'button' || tag === 'a' || el.getAttribute?.('role') === 'button';
}

// Keyboard shortcuts — guarded on the house pattern from
// components/player/shortcuts.ts (useKeyboardShortcuts): modifier chords belong
// to the browser/OS, keys typed into a field belong to that field, keys
// pressed while ANY focus layer is open (Command Palette, a Modal…) belong to
// the layer on top, and Space on a button/link belongs to THAT control.
// Without these, ' '/Esc leaked through the palette and Esc closed the
// overlay AND exited the slideshow in one keystroke; without the button
// guard, preventDefault on Space also killed the thumbnail strip's native
// keyup activation of its <button> thumbnails.
function handleKeydown(e: KeyboardEvent): void {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTypingTarget(e.target)) return;
    if (layerFocusDepth() > 0) return;
    switch (e.key) {
        case 'ArrowLeft':
            goPrev();
            break;
        case 'ArrowRight':
            goNext();
            break;
        case ' ':
            // The global play/pause is for bare focus only — a focused control
            // (thumbnail, transport button) keeps its native Space activation.
            if (isButtonTarget(e.target)) return;
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
                    :src="imgSrc(currentSlide.url)"
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

                <!-- Thumbnail strip — real buttons: every slide is reachable by
                     Tab and activatable by Enter/Space, each named for SRs. -->
                <div class="thumbnail-strip" role="group" aria-label="Slides">
                    <button
                        v-for="(slide, idx) in slides"
                        :key="slide.id"
                        type="button"
                        class="thumbnail"
                        :class="{ active: idx === currentIndex }"
                        :aria-label="slide.caption ? `Photo ${idx + 1}: ${slide.caption}` : `Photo ${idx + 1}`"
                        :aria-current="idx === currentIndex ? 'true' : undefined"
                        @click.stop="goToSlide(idx)"
                    >
                        <img
                            :src="imgSrc(slide.thumbnail_url)"
                            :alt="''"
                            loading="lazy"
                        />
                    </button>
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
    /* Element is a <button> now (keyboard-reachable) — strip the UA chrome so it
       renders exactly like the old div. */
    display: block;
    padding: 0;
    background: none;
}

.thumbnail:focus-visible {
    outline: none;
    opacity: 1;
    box-shadow: 0 0 0 3px var(--accent-ring, rgba(229, 9, 20, 0.5));
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