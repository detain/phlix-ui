<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MusicLibraryPage — browse music library: artists → albums → tracks.
 *
 * The three-panel drill-down (artist grid → album list → track list) loads real
 * data from the server music API via {@link ApiClient}:
 *   - artists  → `GET /api/v1/music/artists`   (on mount)
 *   - albums   → `GET /api/v1/music/albums`    (on artist select, filtered by artist)
 *   - tracks   → embedded in the album (fast-path), else `GET /api/v1/music/tracks`
 *
 * Playback (crossfade / gapless via {@link useMusicPlayer}) is DEFERRED for
 * UI-3.6 — it is blocked on the server music-track stream endpoint (X8 /
 * SV-3.2, SV-3.3), which does not exist yet. `playTrack` therefore only toggles
 * the highlight so browse/UI stay usable. See performance_worklog_ui.md.
 */
import { ref, computed, onMounted } from 'vue';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import MusicArtistCard from '../components/MusicArtistCard.vue';
import MusicAlbumCard from '../components/MusicAlbumCard.vue';
import MusicTrackList from '../components/MusicTrackList.vue';
import Icon from '../components/Icon.vue';
import type { MusicArtist, MusicAlbum, MusicTrack } from '../types/music';

// --- navigation state ---
type View = 'artists' | 'albums' | 'tracks';
const view = ref<View>('artists');
const selectedArtist = ref<MusicArtist | null>(null);
const selectedAlbum = ref<MusicAlbum | null>(null);

// --- currently playing (track UUID) ---
const playingTrackId = ref<string | null>(null);

// --- library data (loaded from the server music API) ---
const artists = ref<MusicArtist[]>([]);
const albums = ref<MusicAlbum[]>([]);
const tracks = ref<MusicTrack[]>([]);
const loading = ref(false);

const { t } = useMessages();
const apiBase = useMediaApiBase();

/** A fresh client bound to the current media API base (mirrors sibling pages). */
function getClient(): ApiClient {
  return new ApiClient({ baseUrl: apiBase.value });
}

onMounted(async () => {
  loading.value = true;
  try {
    artists.value = await getClient().listArtists();
  } catch {
    artists.value = [];
  } finally {
    loading.value = false;
  }
});

const viewTitle = computed(() => {
  if (view.value === 'artists') return t('music.artists');
  if (view.value === 'albums' && selectedArtist.value) return selectedArtist.value.name;
  if (view.value === 'tracks' && selectedAlbum.value) return selectedAlbum.value.title;
  return t('music.title');
});

async function selectArtist(artist: MusicArtist): Promise<void> {
  selectedArtist.value = artist;
  selectedAlbum.value = null;
  albums.value = [];
  tracks.value = [];
  view.value = 'albums';
  loading.value = true;
  try {
    // Server has no per-artist albums route; listAlbums filters client-side by
    // artist name (the artist has no PK — `name` is the identity).
    albums.value = await getClient().listAlbums(artist.name);
  } catch {
    albums.value = [];
  } finally {
    loading.value = false;
  }
}

async function selectAlbum(album: MusicAlbum): Promise<void> {
  selectedAlbum.value = album;
  view.value = 'tracks';
  // Fast-path: albums from listAlbums carry their embedded track list, so no
  // extra fetch is needed. Fall back to the tracks endpoint only if empty.
  const embedded = album.tracks ?? [];
  if (embedded.length > 0) {
    tracks.value = embedded;
    return;
  }
  tracks.value = [];
  loading.value = true;
  try {
    tracks.value = await getClient().listTracks(album.title);
  } catch {
    tracks.value = [];
  } finally {
    loading.value = false;
  }
}

function playTrack(track: MusicTrack): void {
  // TODO(UI-3.6 playback, X8): wire real audio playback + crossfade/gapless
  // (useMusicPlayer) once the server music-track stream endpoint lands
  // (SV-3.2 / SV-3.3). For now only toggle the now-playing highlight.
  if (playingTrackId.value === track.id) {
    playingTrackId.value = null;
  } else {
    playingTrackId.value = track.id;
  }
}

function goBack(): void {
  if (view.value === 'tracks') {
    view.value = 'albums';
    selectedAlbum.value = null;
    tracks.value = [];
  } else if (view.value === 'albums') {
    view.value = 'artists';
    selectedArtist.value = null;
    albums.value = [];
  }
}
</script>

<template>
  <div class="music-page">
    <!-- Header -->
    <header class="music-page__head">
      <div class="music-page__breadcrumb">
        <button
          v-if="view !== 'artists'"
          type="button"
          class="music-page__back"
          :aria-label="t('player.back')"
          @click="goBack"
        >
          <Icon name="arrow-left" class="music-page__back-icon" />
        </button>
        <nav v-if="view !== 'artists'" class="music-page__crumb-nav" aria-label="Breadcrumb">
          <button type="button" class="music-page__crumb" @click="view = 'artists'; selectedArtist = null; albums = []">
            {{ t('music.artists') }}
          </button>
          <Icon name="chevron-right" class="music-page__crumb-sep" />
          <span class="music-page__crumb-current">{{ viewTitle }}</span>
        </nav>
      </div>
      <h1 class="music-page__title">{{ viewTitle }}</h1>
    </header>

    <!-- Artists grid -->
    <div v-if="view === 'artists'" class="music-page__grid">
      <div v-if="loading" class="music-page__loading" role="status" aria-busy="true">
        <div v-for="n in 12" :key="n" class="artist-skel">
          <div class="artist-skel__img" />
          <div class="artist-skel__name" />
          <div class="artist-skel__albums" />
        </div>
      </div>
      <div v-else-if="artists.length === 0" class="music-page__empty" role="status">
        <Icon name="music" class="music-page__empty-icon" />
        <p class="music-page__empty-text">{{ t('music.noArtists') }}</p>
      </div>
      <template v-else>
        <MusicArtistCard
          v-for="artist in artists"
          :key="artist.id"
          :artist="artist"
          @click="selectArtist"
        />
      </template>
    </div>

    <!-- Albums list -->
    <div v-else-if="view === 'albums'" class="music-page__grid">
      <div v-if="loading" class="music-page__loading" role="status" aria-busy="true">
        <div v-for="n in 8" :key="n" class="album-skel">
          <div class="album-skel__cover" />
          <div class="album-skel__title" />
          <div class="album-skel__meta" />
        </div>
      </div>
      <div v-else-if="albums.length === 0" class="music-page__empty" role="status">
        <Icon name="image" class="music-page__empty-icon" />
        <p class="music-page__empty-text">{{ t('music.noAlbums') }}</p>
      </div>
      <template v-else>
        <MusicAlbumCard
          v-for="album in albums"
          :key="album.id"
          :album="album"
          @click="selectAlbum"
        />
      </template>
    </div>

    <!-- Tracks list -->
    <div v-else-if="view === 'tracks'">
      <MusicTrackList
        :tracks="tracks"
        :playing-track-id="playingTrackId"
        :loading="loading"
        @play="playTrack"
      />
    </div>
  </div>
</template>

<style scoped>
.music-page {
  padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
  max-width: 1200px;
  margin: 0 auto;
}
.music-page__head {
  margin-bottom: var(--space-6, 24px);
}
.music-page__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  margin-bottom: var(--space-2, 8px);
}
.music-page__back {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md, 8px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  color: var(--text, #e4e4e7);
  cursor: pointer;
  transition: background var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.music-page__back:hover {
  background: var(--surface-3, #3f3f46);
}
.music-page__back:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.music-page__back-icon {
  width: 16px;
  height: 16px;
}
.music-page__crumb-nav {
  display: flex;
  align-items: center;
  gap: var(--space-1, 4px);
}
.music-page__crumb {
  font-size: var(--text-sm, 0.875rem);
  color: var(--accent, #f5a524);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.music-page__crumb:hover {
  text-decoration: underline;
}
.music-page__crumb-sep {
  width: 12px;
  height: 12px;
  color: var(--text-muted, #a1a1aa);
  opacity: 0.5;
}
.music-page__crumb-current {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
}
.music-page__title {
  font-family: var(--font-display, inherit);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-2xl, 1.5rem);
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text, #e4e4e7);
}

/* Grid */
.music-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-5, 20px);
}

/* Loading skeletons */
.music-page__loading {
  display: contents;
}
.artist-skel,
.album-skel {
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 12px);
  padding: var(--space-3, 12px);
  border-radius: var(--radius-lg, 12px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
}
.artist-skel__img,
.album-skel__cover {
  aspect-ratio: 1;
  border-radius: var(--radius-md, 8px);
  background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
.artist-skel__name,
.album-skel__title {
  height: 0.85em;
  width: 75%;
  border-radius: var(--radius-sm, 6px);
  background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
.artist-skel__albums,
.album-skel__meta {
  height: 0.7em;
  width: 45%;
  border-radius: var(--radius-sm, 6px);
  background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

/* Empty state */
.music-page__empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
  padding: var(--space-16, 64px) var(--space-4, 16px);
  color: var(--text-muted, #a1a1aa);
  text-align: center;
}
.music-page__empty-icon {
  width: 40px;
  height: 40px;
  opacity: 0.5;
  margin-bottom: var(--space-2, 8px);
}
.music-page__empty-text {
  font-size: var(--text-sm, 0.875rem);
}

@keyframes shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .artist-skel__img,
  .artist-skel__name,
  .artist-skel__albums,
  .album-skel__cover,
  .album-skel__title,
  .album-skel__meta {
    animation: none;
  }
}
</style>
