<script setup lang="ts">
import { onMounted, ref, inject, computed, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { MediaItem } from '../types/media-item';
import { ApiClient } from '../api/client';
import Player from '../components/Player.vue';

const apiBase = inject<ComputedRef<string>>('apiBase', computed(() => ''));
const route = useRoute();

const media = ref<MediaItem | null>(null);
const streamUrl = ref('');
const loading = ref(true);
const error = ref<string | null>(null);

async function load() {
    const id = route.params.id as string;
    if (!id) {
        error.value = 'No media ID provided';
        loading.value = false;
        return;
    }

    try {
        const client = new ApiClient({ baseUrl: apiBase.value });
        const [mediaData, streamData] = await Promise.all([
            client.get<MediaItem>(`/api/v1/media/${id}`),
            client.get<{ url: string }>(`/api/v1/media/${id}/playback-info`).catch(() => null),
        ]);

        media.value = mediaData;
        if (streamData?.url) {
            streamUrl.value = streamData.url;
        } else {
            streamUrl.value = `${apiBase.value}/media/${id}/stream`;
        }
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to load media';
    } finally {
        loading.value = false;
    }
}

onMounted(load);
</script>

<template>
    <div class="player-page">
        <div v-if="loading" class="player-loading">Loading...</div>
        <div v-else-if="error" class="player-error">
            <p>{{ error }}</p>
            <button class="retry-btn" @click="load">Retry</button>
        </div>
        <Player v-else-if="media" :media="media" :stream-url="streamUrl" />
    </div>
</template>

<style scoped>
.player-page {
    width: 100%;
    min-height: 100vh;
    background: #000;
}

.player-loading,
.player-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    gap: 16px;
    color: rgba(255, 255, 255, 0.7);
}

.player-error {
    color: var(--color-error, #ef4444);
}

.retry-btn {
    padding: 8px 16px;
    background: var(--color-primary, #6366f1);
    color: #fff;
    border-radius: 8px;
    font-size: 0.875rem;
    cursor: pointer;
}
</style>
