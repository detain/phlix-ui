<script setup lang="ts">
import { onMounted, watch, inject, computed, type ComputedRef } from 'vue';
import { useMediaStore } from '../stores/useMediaStore';
import MediaGrid from '../components/MediaGrid.vue';
import FilterBar from '../components/FilterBar.vue';

defineSlots<{
    'toolbar-extra'?: never;
}>();

const apiBase = inject<ComputedRef<string>>('apiBase') ?? computed(() => '');
const store = useMediaStore();

function load() {
    store.reset();
    store.fetchMedia(apiBase.value);
}

onMounted(load);

watch(apiBase, load);

function onFilterChange() {
    store.reset();
    store.fetchMedia(apiBase.value);
}

function onLoadMore() {
    store.loadMore(apiBase.value);
}
</script>

<template>
    <div class="browse-page">
        <div class="browse-header">
            <h1 class="browse-title">Browse Media</h1>
            <div class="browse-toolbar-extra">
                <slot name="toolbar-extra" />
            </div>
        </div>

        <FilterBar @change="onFilterChange" />

        <div v-if="store.error" class="browse-error">
            <p>{{ store.error }}</p>
            <button class="retry-btn" @click="load">Retry</button>
        </div>

        <MediaGrid :items="store.items" :loading="store.loading && store.items.length === 0" />

        <div v-if="store.hasMore && !store.loading" class="load-more">
            <button class="load-more-btn" @click="onLoadMore">Load more</button>
        </div>

        <div v-if="store.loading && store.items.length > 0" class="loading-more">
            Loading...
        </div>
    </div>
</template>

<style scoped>
.browse-page {
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
}

.browse-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.browse-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text, #e4e4e7);
}

.browse-toolbar-extra {
    display: flex;
    align-items: center;
    gap: 8px;
}

.browse-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 40px;
    color: var(--color-error, #ef4444);
    text-align: center;
}

.retry-btn {
    padding: 8px 16px;
    background: var(--color-error, #ef4444);
    color: #fff;
    border-radius: var(--radius-md, 8px);
    font-size: 0.875rem;
    cursor: pointer;
}

.load-more {
    display: flex;
    justify-content: center;
    padding: 24px;
}

.load-more-btn {
    padding: 10px 24px;
    background: var(--color-surface-elevated, #1e1e2e);
    color: var(--color-text, #e4e4e7);
    border: 1px solid var(--color-border, #27272a);
    border-radius: var(--radius-md, 8px);
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.15s ease;
}

.load-more-btn:hover {
    background: var(--color-border, #27272a);
}

.loading-more {
    text-align: center;
    padding: 16px;
    color: var(--color-text-muted, #a1a1aa);
    font-size: 0.875rem;
}
</style>
