<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
  -->

<script setup lang="ts">
/**
 * AudiobooksPage — audiobooks library grid listing.
 *
 * Loaded via `/app/audiobooks` (Vue router), which is reached either from the
 * navigation or by redirecting the legacy server-rendered `/audiobooks` route to the SPA.
 *
 * Data: `GET /api/v1/audiobooks` via {@link ApiClient}.
 */
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import type { AudiobookListItem } from '../types/audiobook';
import Icon from '../components/Icon.vue';

const router = useRouter();
const apiBase = useMediaApiBase();

// --- data ---
const audiobooks = ref<AudiobookListItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
}

async function loadAudiobooks(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
        const res = await getClient().get<{ audiobooks: AudiobookListItem[] }>('/api/v1/audiobooks');
        audiobooks.value = res.audiobooks ?? [];
    } catch {
        error.value = 'Could not load audiobooks';
        audiobooks.value = [];
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    void loadAudiobooks();
});

function goToAudiobook(audiobook: AudiobookListItem): void {
    void router.push({ name: 'audiobook-detail', params: { id: audiobook.id } });
}

/**
 * Format duration from milliseconds to human-readable string.
 */
function formatDuration(ms: number | undefined): string {
    if (!ms || ms <= 0) return '—';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}
</script>

<template>
    <div class="audiobooks-page">
        <!-- Page header -->
        <header class="audiobooks-page__header">
            <h1 class="audiobooks-page__title">Audiobooks</h1>
            <p class="audiobooks-page__description">Your audiobook library</p>
        </header>

        <!-- Loading skeleton -->
        <div v-if="loading" class="audiobooks-page__loading" role="status" aria-busy="true">
            <div v-for="n in 12" :key="n" class="audiobook-skel">
                <div class="audiobook-skel__cover" />
                <div class="audiobook-skel__title" />
                <div class="audiobook-skel__author" />
            </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="audiobooks-page__error" role="alert">
            <Icon name="alert-circle" class="audiobooks-page__error-icon" />
            <p>{{ error }}</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="audiobooks.length === 0" class="audiobooks-page__empty" role="status">
            <Icon name="bookmark" class="audiobooks-page__empty-icon" />
            <p>No audiobooks found in your library.</p>
            <p class="audiobooks-page__empty-hint">
                Add an audiobook library to start browsing your collection.
            </p>
        </div>

        <!-- Audiobooks grid -->
        <div v-else class="audiobooks-page__grid">
            <button
                v-for="audiobook in audiobooks"
                :key="audiobook.id"
                type="button"
                class="audiobook-card"
                @click="goToAudiobook(audiobook)"
            >
                <div class="audiobook-card__cover">
                    <img
                        v-if="audiobook.cover_url"
                        :src="audiobook.cover_url"
                        :alt="audiobook.name"
                        class="audiobook-card__img"
                        loading="lazy"
                    >
                    <div v-else class="audiobook-card__placeholder">
                        <Icon name="bookmark" class="audiobook-card__placeholder-icon" />
                    </div>
                </div>
                <div class="audiobook-card__info">
                    <h3 class="audiobook-card__title">{{ audiobook.name }}</h3>
                    <span v-if="audiobook.metadata?.author" class="audiobook-card__author">
                        {{ audiobook.metadata.author }}
                    </span>
                    <span v-if="audiobook.metadata?.narrator" class="audiobook-card__narrator">
                        Narrated by {{ audiobook.metadata.narrator }}
                    </span>
                    <span v-if="audiobook.metadata?.duration_ms" class="audiobook-card__duration">
                        {{ formatDuration(audiobook.metadata.duration_ms) }}
                    </span>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>
.audiobooks-page {
    padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
    max-width: 1200px;
    margin: 0 auto;
}

/* Header */
.audiobooks-page__header {
    margin-bottom: var(--space-8, 32px);
}
.audiobooks-page__title {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-3xl, 1.875rem);
    letter-spacing: var(--tracking-tight, -0.02em);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-2, 8px);
}
.audiobooks-page__description {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}

/* Grid */
.audiobooks-page__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--space-5, 20px);
}

/* Audiobook card */
.audiobook-card {
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
.audiobook-card:hover {
    transform: scale(1.03);
    border-color: var(--accent, #f5a524);
    background: var(--surface-3, #3f3f46);
}
.audiobook-card:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.audiobook-card__cover {
    aspect-ratio: 1 / 1;
    border-radius: var(--radius-md, 8px);
    overflow: hidden;
    background: var(--surface-3, #3f3f46);
}
.audiobook-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.audiobook-card__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface-3, #3f3f46);
}
.audiobook-card__placeholder-icon {
    width: 48px;
    height: 48px;
    opacity: 0.5;
}
.audiobook-card__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1, 4px);
}
.audiobook-card__title {
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    color: var(--text, #e4e4e7);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.audiobook-card__author {
    font-size: var(--text-xs, 0.75rem);
    color: var(--text-muted, #a1a1aa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.audiobook-card__narrator {
    font-size: var(--text-xs, 0.75rem);
    color: var(--text-muted, #a1a1aa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-style: italic;
}
.audiobook-card__duration {
    font-size: var(--text-xs, 0.75rem);
    color: var(--accent, #f5a524);
}

/* Loading skeleton */
.audiobooks-page__loading {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--space-5, 20px);
}
.audiobook-skel {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding: var(--space-4, 16px);
    border-radius: var(--radius-lg, 12px);
    background: var(--surface-2, #27272a);
    border: 1px solid var(--border, #3f3f46);
}
.audiobook-skel__cover {
    aspect-ratio: 1 / 1;
    border-radius: var(--radius-md, 8px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.audiobook-skel__title {
    height: 0.85em;
    width: 75%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.audiobook-skel__author {
    height: 0.7em;
    width: 50%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}

/* Error state */
.audiobooks-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--danger, #f87171);
    text-align: center;
}
.audiobooks-page__error-icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    margin-bottom: var(--space-2, 8px);
}

/* Empty state */
.audiobooks-page__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--text-muted, #a1a1aa);
    text-align: center;
}
.audiobooks-page__empty-icon {
    width: 40px;
    height: 40px;
    opacity: 0.5;
    margin-bottom: var(--space-2, 8px);
}
.audiobooks-page__empty-hint {
    font-size: var(--text-sm, 0.875rem);
}

@keyframes shimmer {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
    .audiobook-skel__cover,
    .audiobook-skel__title,
    .audiobook-skel__author {
        animation: none;
    }
}
</style>
