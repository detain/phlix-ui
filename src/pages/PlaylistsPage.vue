<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * PlaylistsPage (R13-01) — the member-facing playlist list.
 * Route: /app/playlists
 *
 * Before this page existed the playlist surface was WRITE-ONLY: "Add to
 * playlist" created rows through `POST /api/v1/playlists` but nothing in the
 * SPA ever read `GET /api/v1/collections` back, so a user could never see or
 * open the playlists they had made. Visibility model (server Option A,
 * migration 112): the endpoint returns the actor's own rows plus legacy
 * `created_by = NULL` rows, so this list is exactly "mine + shared heritage".
 *
 * Copy is inline English, matching the member-flow precedent (the playlist
 * toasts/menu labels this page complements were never cataloged).
 */
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ApiClient, type PlaylistSummary } from '../api/client';
import { errMessage } from '../api/errors';
import { useMediaApiBase } from '../composables/useApiBase';
import { usePageTitle } from '../composables/usePageTitle';
import Button from '../components/ui/Button.vue';
import Icon from '../components/Icon.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';

const props = defineProps<{
  /** Test seam — defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const apiBase = useMediaApiBase();

/** Same seam + base convention as the sibling member pages (WatchHistoryPage). */
function getClient(): ApiClient {
  return props.client ?? new ApiClient({ baseUrl: apiBase.value });
}

const router = useRouter();
usePageTitle(() => 'Playlists');

const playlists = ref<PlaylistSummary[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function load(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    // Newest activity first — the server returns repository order.
    playlists.value = (await getClient().getPlaylists()).sort((a, b) =>
      (b.updated_at ?? '').localeCompare(a.updated_at ?? ''),
    );
  } catch (e) {
    error.value = errMessage(e, 'Failed to load playlists.');
  } finally {
    loading.value = false;
  }
}

function open(playlist: PlaylistSummary): void {
  if (router?.hasRoute('playlist')) {
    void router.push({ name: 'playlist', params: { id: playlist.id } });
  }
}

function emptyActionTarget(): void {
  if (router?.hasRoute('browse')) void router.push({ name: 'browse' });
}

onMounted(() => void load());
</script>

<template>
  <div class="playlists-page">
    <header class="playlists-page__head">
      <h1 class="playlists-page__title">Playlists</h1>
      <p class="playlists-page__hint">
        Add any title to a playlist from its ⋯ menu; your playlists collect here.
      </p>
    </header>

    <Spinner v-if="loading" label="Loading playlists…" />

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn’t load playlists"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="refresh" @click="load">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="playlists.length === 0"
      icon="list"
      title="No playlists yet"
      description="Open any title’s menu and choose “Add to playlist” to create your first one."
    >
      <template #actions>
        <Button variant="ghost" size="sm" @click="emptyActionTarget">Browse titles</Button>
      </template>
    </EmptyState>

    <ul v-else class="playlists-page__grid">
      <li v-for="playlist in playlists" :key="playlist.id">
        <button
          type="button"
          class="playlist-tile"
          :aria-label="`Open playlist ${playlist.name}`"
          @click="open(playlist)"
        >
          <span class="playlist-tile__art"><Icon name="list" /></span>
          <span class="playlist-tile__name" :title="playlist.name">{{ playlist.name }}</span>
          <span v-if="playlist.updated_at" class="playlist-tile__meta">
            Updated {{ playlist.updated_at.slice(0, 10) }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.playlists-page {
  padding: var(--space-6, 1.5rem) var(--space-4, 1rem);
  max-width: var(--shell-max-width, 1400px);
  margin: 0 auto;
}
.playlists-page__head {
  margin-bottom: var(--space-5, 1.25rem);
}
.playlists-page__title {
  font-size: var(--text-2xl, 1.5rem);
  margin: 0 0 var(--space-1, 0.25rem);
}
.playlists-page__hint {
  color: var(--text-muted, #a1a1aa);
  font-size: var(--text-sm, 0.875rem);
  margin: 0;
}
.playlists-page__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-4, 1rem);
  margin: 0;
  padding: 0;
}
.playlist-tile {
  appearance: none;
  background: var(--surface-2, #18181b);
  border: 1px solid var(--border, #27272a);
  border-radius: var(--radius-lg, 0.75rem);
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 0.5rem);
  font: inherit;
  padding: var(--space-4, 1rem);
  text-align: left;
  width: 100%;
}
.playlist-tile:hover {
  border-color: var(--accent, #f5c518);
}
.playlist-tile__art {
  color: var(--accent, #f5c518);
  font-size: var(--text-xl, 1.25rem);
}
.playlist-tile__name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playlist-tile__meta {
  color: var(--text-muted, #a1a1aa);
  font-size: var(--text-xs, 0.75rem);
}
</style>
