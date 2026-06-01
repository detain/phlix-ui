<script setup lang="ts">
import type { MediaItem } from '../types/media-item';

defineProps<{
    item: MediaItem;
    to?: string;
}>();
</script>

<template>
    <article class="media-card">
        <a :href="to ?? `/app/player/${item.id}`" class="card-link">
            <div class="card-poster">
                <img
                    v-if="item.poster_url"
                    :src="item.poster_url"
                    :alt="item.name"
                    loading="lazy"
                />
                <div v-else class="poster-placeholder">
                    <span class="placeholder-icon">🎬</span>
                    <span class="placeholder-type">{{ item.type }}</span>
                </div>
            </div>
            <div class="card-overlay">
                <span v-if="item.year" class="card-year">{{ item.year }}</span>
                <span v-if="item.rating" class="card-rating">{{ item.rating }}</span>
            </div>
            <div class="card-info">
                <h3 class="card-title" :title="item.name">{{ item.name }}</h3>
                <p v-if="item.genres?.length" class="card-genres">
                    {{ item.genres.slice(0, 2).join(', ') }}
                </p>
            </div>
        </a>
    </article>
</template>

<style scoped>
.media-card {
    position: relative;
    border-radius: var(--radius-md, 8px);
    overflow: hidden;
    background: var(--color-surface, #141420);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.media-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.card-link {
    display: block;
    text-decoration: none;
    color: inherit;
}

.card-poster {
    position: relative;
    aspect-ratio: 2/3;
    background: var(--color-surface-elevated, #1e1e2e);
    overflow: hidden;
}

.card-poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.media-card:hover .card-poster img {
    transform: scale(1.05);
}

.poster-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 8px;
    color: var(--color-text-muted, #a1a1aa);
}

.placeholder-icon {
    font-size: 2rem;
    opacity: 0.5;
}

.placeholder-type {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
}

.card-overlay {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    gap: 4px;
    padding: 6px;
}

.card-year,
.card-rating {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 2px 5px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.65);
    color: #fff;
}

.card-info {
    padding: 10px 8px;
}

.card-title {
    font-size: 0.85rem;
    font-weight: 500;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
}

.card-genres {
    font-size: 0.7rem;
    color: var(--color-text-muted, #a1a1aa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
