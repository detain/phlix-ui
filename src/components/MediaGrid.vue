<script setup lang="ts">
import type { MediaItem } from '../types/media-item';
import MediaCard from './MediaCard.vue';

defineProps<{
    items: MediaItem[];
    loading?: boolean;
}>();
</script>

<template>
    <div class="media-grid-container">
        <div v-if="loading" class="media-grid-skeleton">
            <div v-for="n in 12" :key="n" class="skeleton-card">
                <div class="skeleton-poster" />
                <div class="skeleton-title" />
            </div>
        </div>
        <div v-else-if="items.length === 0" class="media-grid-empty">
            <p>No media found.</p>
            <p class="empty-hint">Try adjusting your filters.</p>
        </div>
        <div v-else class="media-grid">
            <MediaCard v-for="item in items" :key="item.id" :item="item" />
        </div>
    </div>
</template>

<style scoped>
.media-grid-container {
    width: 100%;
}

.media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
}

@media (min-width: 640px) {
    .media-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
}

@media (min-width: 1024px) {
    .media-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

.media-grid-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: var(--color-text-muted, #a1a1aa);
    text-align: center;
}

.empty-hint {
    font-size: 0.875rem;
    margin-top: 8px;
    opacity: 0.7;
}

.media-grid-skeleton {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
}

.skeleton-card {
    border-radius: var(--radius-md, 8px);
    overflow: hidden;
}

.skeleton-poster {
    aspect-ratio: 2/3;
    background: linear-gradient(
        90deg,
        var(--color-surface, #141420) 0%,
        var(--color-surface-elevated, #1e1e2e) 50%,
        var(--color-surface, #141420) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-title {
    height: 1em;
    width: 70%;
    margin: 10px 8px;
    border-radius: 4px;
    background: var(--color-surface, #141420);
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
