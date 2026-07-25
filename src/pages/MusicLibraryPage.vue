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
 *   - artists  → `GET /api/v1/music/artists?limit&offset`
 *   - albums   → `GET /api/v1/music/albums?artist&limit&offset` (SERVER-side filter)
 *   - tracks   → embedded in the album row, else/also `GET /api/v1/music/albums/{title}?artist=`
 *
 * **Paging (S110) is not cosmetic — it is the only way to see the library.** The
 * music endpoints serve bounded pages (`?limit=` clamped to `MUSIC_PAGE_SIZE`) and
 * return the TRUE `total`. This page previously fired one unparameterised
 * `listArtists()` and rendered a bare `v-for`, so on a 2,197-artist library the
 * user reached exactly 100 artists with nothing on screen suggesting the other
 * 2,097 existed. Both listings are now offset-paged with a {@link MusicPager} and
 * both show the server's `total`.
 *
 * The album drill-down asks the SERVER to filter by artist. It used to fetch page 1
 * of `/albums` and filter client-side — and because `/albums` is ordered globally
 * by artist then title, page 1 spans only ~23 artists, so 77 of the 100 visible
 * artists drilled down to an EMPTY album list.
 *
 * Playback (crossfade / gapless via {@link useMusicPlayer}) is wired here: the
 * track objects from the server carry a signed `stream_url` (UI-3.6 / X8), which
 * the player consumes for an `<audio src>`. Crossfade + gapless are entirely
 * client-side (dual `<audio>` volume-fade + next-track preload) driven by the
 * usePreferencesStore settings. See performance_worklog_ui.md.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase, useMediaDirectBase } from '../composables/useApiBase';
import { useMusicPlayer } from '../composables/useMusicPlayer';
import { ApiClient, MUSIC_PAGE_SIZE } from '../api/client';
import MusicArtistCard from '../components/MusicArtistCard.vue';
import MusicAlbumCard from '../components/MusicAlbumCard.vue';
import MusicTrackList from '../components/MusicTrackList.vue';
import MusicPager from '../components/MusicPager.vue';
import Icon from '../components/Icon.vue';
import type { MusicArtist, MusicAlbum, MusicTrack } from '../types/music';

// --- navigation state ---
type View = 'artists' | 'albums' | 'tracks';
const view = ref<View>('artists');
const selectedArtist = ref<MusicArtist | null>(null);
const selectedAlbum = ref<MusicAlbum | null>(null);

// --- library data (loaded from the server music API) ---
const artists = ref<MusicArtist[]>([]);
const albums = ref<MusicAlbum[]>([]);
const tracks = ref<MusicTrack[]>([]);
const loading = ref(false);

// --- paging state: one page of artists, one page of the selected artist's albums.
// `total`/`limit` come back from the server (it clamps `limit`), so the pager and
// the header count reflect the DB rather than what this page happens to hold.
const artistTotal = ref(0);
const artistLimit = ref(MUSIC_PAGE_SIZE);
const artistOffset = ref(0);
const albumTotal = ref(0);
const albumLimit = ref(MUSIC_PAGE_SIZE);
const albumOffset = ref(0);

const { t } = useMessages();
const apiBase = useMediaApiBase();
const directBase = useMediaDirectBase();

// --- audio playback (signed stream_url + client-side crossfade/gapless) ---
const player = useMusicPlayer({
  apiBase: () => apiBase.value,
  // Mirror PlayerPage.streamUrlFor: prefer the direct byte-stream origin, fall
  // back to the media-api base (own-server / unit tests).
  streamBase: () => directBase.value || apiBase.value,
});
onUnmounted(() => player.dispose());

// The now-playing highlight shows a pause icon only while actually playing.
const playingTrackId = computed(() =>
  player.playing.value ? player.currentTrack.value?.id ?? null : null,
);

/** A fresh client bound to the current media API base (mirrors sibling pages). */
function getClient(): ApiClient {
  return new ApiClient({ baseUrl: apiBase.value });
}

/**
 * Load one page of artists. `offset` is passed explicitly (never derived inside)
 * so a failed page cannot leave the pager pointing at rows that were never shown.
 */
async function loadArtists(offset: number): Promise<void> {
  loading.value = true;
  try {
    const page = await getClient().listArtists({ limit: MUSIC_PAGE_SIZE, offset });
    artists.value = page.artists;
    artistTotal.value = page.total;
    artistLimit.value = page.limit;
    artistOffset.value = page.offset;
  } catch {
    artists.value = [];
    artistTotal.value = 0;
    artistOffset.value = offset;
  } finally {
    loading.value = false;
  }
}

/**
 * Load one page of ONE artist's albums, filtered SERVER-side. Three artists on the
 * production library hold more than a full page of albums (142 / 109 / 104), so
 * this listing needs its own pager for those albums to be reachable at all.
 */
async function loadAlbums(artist: MusicArtist, offset: number): Promise<void> {
  loading.value = true;
  try {
    const page = await getClient().listAlbums({
      artist: artist.name,
      limit: MUSIC_PAGE_SIZE,
      offset,
    });
    albums.value = page.albums;
    albumTotal.value = page.total;
    albumLimit.value = page.limit;
    albumOffset.value = page.offset;
  } catch {
    albums.value = [];
    albumTotal.value = 0;
    albumOffset.value = offset;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await loadArtists(0);
});

const viewTitle = computed(() => {
  if (view.value === 'artists') return t('music.artists');
  if (view.value === 'albums' && selectedArtist.value) return selectedArtist.value.name;
  if (view.value === 'tracks' && selectedAlbum.value) return selectedAlbum.value.title;
  return t('music.title');
});

/** "2,197 artists" / "1 artist" — the DB count, not `artists.length`. */
const artistTotalLabel = computed(() =>
  artistTotal.value === 1
    ? t('music.artistsTotalOne')
    : t('music.artistsTotal', { count: artistTotal.value.toLocaleString() }),
);

/** "142 albums" for the selected artist — again the server's filtered `total`. */
const albumTotalLabel = computed(() =>
  albumTotal.value === 1
    ? t('music.albumsTotalOne')
    : t('music.albumsTotal', { count: albumTotal.value.toLocaleString() }),
);

async function selectArtist(artist: MusicArtist): Promise<void> {
  selectedArtist.value = artist;
  selectedAlbum.value = null;
  albums.value = [];
  tracks.value = [];
  albumTotal.value = 0;
  albumOffset.value = 0;
  view.value = 'albums';
  await loadAlbums(artist, 0);
}

/** Pager handler for the artists grid. */
async function goToArtistOffset(offset: number): Promise<void> {
  if (offset === artistOffset.value) return;
  await loadArtists(offset);
}

/** Pager handler for the selected artist's album list. */
async function goToAlbumOffset(offset: number): Promise<void> {
  const artist = selectedArtist.value;
  if (!artist || offset === albumOffset.value) return;
  await loadAlbums(artist, offset);
}

async function selectAlbum(album: MusicAlbum): Promise<void> {
  selectedAlbum.value = album;
  view.value = 'tracks';
  // Fast-path: an album LIST row carries its embedded track list, so no extra
  // fetch is needed — unless the server flagged that list as a truncated prefix
  // (`tracks_truncated`, S99: 100 tracks max per album on a list row) or sent
  // none at all. The album DETAIL route is exempt from that cap and returns the
  // whole thing; `artist` disambiguates a title shared by several artists (2,622
  // of production's 5,091 album titles are). Note what is NOT used here: the
  // `/tracks` listing, which has no album filter and would return nothing for any
  // album outside its own first page.
  const embedded = album.tracks ?? [];
  if (embedded.length > 0 && album.tracksTruncated !== true) {
    tracks.value = embedded;
    return;
  }
  tracks.value = embedded;
  loading.value = true;
  try {
    const full = await getClient().getAlbum(album.title, album.artist ?? selectedArtist.value?.name);
    if (full.tracks && full.tracks.length > 0) tracks.value = full.tracks;
  } catch {
    // Keep whatever prefix the list row gave us rather than blanking the view.
  } finally {
    loading.value = false;
  }
}

function playTrack(track: MusicTrack): void {
  // Toggle if the row is already the current, playing track; otherwise load the
  // visible track list as the queue (so next/prev work) and play from `track`.
  if (player.currentTrack.value?.id === track.id && player.playing.value) {
    player.pause();
    return;
  }
  if (player.currentTrack.value?.id === track.id) {
    void player.play();
    return;
  }
  player.loadTracks(tracks.value);
  void player.play(track);
}

/** Format seconds as `m:ss` for the transport bar. */
function formatTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function onSeek(event: Event): void {
  const value = Number((event.target as HTMLInputElement).value);
  player.seek(value);
}

/**
 * Return to the artists grid, dropping the album page state with it. The artist
 * page (offset/total) is deliberately KEPT, so coming back from an artist on page
 * 14 does not dump the user back at page 1.
 */
function goToArtists(): void {
  view.value = 'artists';
  selectedArtist.value = null;
  selectedAlbum.value = null;
  albums.value = [];
  albumTotal.value = 0;
  albumOffset.value = 0;
}

function goBack(): void {
  if (view.value === 'tracks') {
    view.value = 'albums';
    selectedAlbum.value = null;
    tracks.value = [];
  } else if (view.value === 'albums') {
    goToArtists();
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
          <button type="button" class="music-page__crumb" @click="goToArtists">
            {{ t('music.artists') }}
          </button>
          <Icon name="chevron-right" class="music-page__crumb-sep" />
          <span class="music-page__crumb-current">{{ viewTitle }}</span>
        </nav>
      </div>
      <h1 class="music-page__title">{{ viewTitle }}</h1>
      <!-- The TRUE library size, straight from the endpoint's `total`. Without it
           a 100-row page is indistinguishable from a 100-artist library. -->
      <p v-if="view === 'artists'" class="music-page__count" data-count="artists" role="status">
        {{ artistTotalLabel }}
      </p>
      <p v-else-if="view === 'albums'" class="music-page__count" data-count="albums" role="status">
        {{ albumTotalLabel }}
      </p>
    </header>

    <!-- Artists grid. The pager sits OUTSIDE the grid so its `aria-controls` can
         name the grid it drives rather than point at its own ancestor. -->
    <template v-if="view === 'artists'">
      <div id="music-artists-grid" class="music-page__grid">
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
      <MusicPager
        class="music-page__pager"
        data-pager="artists"
        :offset="artistOffset"
        :limit="artistLimit"
        :total="artistTotal"
        :disabled="loading"
        :label="t('music.artists')"
        controls="music-artists-grid"
        @go="goToArtistOffset"
      />
    </template>

    <!-- Albums list -->
    <template v-else-if="view === 'albums'">
      <div id="music-albums-grid" class="music-page__grid">
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
      <MusicPager
        class="music-page__pager"
        data-pager="albums"
        :offset="albumOffset"
        :limit="albumLimit"
        :total="albumTotal"
        :disabled="loading"
        :label="t('music.albums')"
        controls="music-albums-grid"
        @go="goToAlbumOffset"
      />
    </template>

    <!-- Tracks list -->
    <div v-else-if="view === 'tracks'">
      <MusicTrackList
        :tracks="tracks"
        :playing-track-id="playingTrackId"
        :loading="loading"
        @play="playTrack"
      />
    </div>

    <!-- Now-playing transport bar -->
    <footer v-if="player.currentTrack.value" class="music-bar" role="region" :aria-label="t('music.nowPlaying')">
      <div class="music-bar__meta">
        <span class="music-bar__title">{{ player.currentTrack.value.title }}</span>
        <span v-if="player.error.value" class="music-bar__error" role="alert">
          {{ t('music.streamError') }}
        </span>
        <span v-else-if="player.loading.value" class="music-bar__status" role="status" aria-live="polite">
          {{ t('music.loading') }}
        </span>
      </div>
      <div class="music-bar__controls">
        <button
          type="button"
          class="music-bar__btn"
          :disabled="!player.hasPrev.value"
          :aria-label="t('music.previous')"
          @click="player.previous()"
        >
          <Icon name="skip-back" class="music-bar__icon" />
        </button>
        <button
          type="button"
          class="music-bar__btn music-bar__btn--primary"
          :aria-label="player.playing.value ? t('music.pause') : t('music.play')"
          @click="player.toggle()"
        >
          <Icon :name="player.playing.value ? 'pause' : 'play'" class="music-bar__icon" />
        </button>
        <button
          type="button"
          class="music-bar__btn"
          :disabled="!player.hasNext.value"
          :aria-label="t('music.next')"
          @click="player.next()"
        >
          <Icon name="skip-forward" class="music-bar__icon" />
        </button>
      </div>
      <div class="music-bar__progress">
        <span class="music-bar__time">{{ formatTime(player.position.value) }}</span>
        <input
          type="range"
          class="music-bar__seek"
          min="0"
          :max="player.duration.value || 0"
          :value="player.position.value"
          :aria-label="t('music.seek')"
          @input="onSeek"
        >
        <span class="music-bar__time">{{ formatTime(player.duration.value) }}</span>
      </div>
    </footer>
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
.music-page__count {
  margin-top: var(--space-1, 4px);
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
  font-variant-numeric: tabular-nums;
}

/* Grid */
.music-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-5, 20px);
}

/* The pager is a SIBLING of the grid (so its `aria-controls` can name the grid),
   so it needs no column span — just the same top gap the grid child had. */
.music-page__pager {
  margin-top: var(--space-6, 24px);
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

/* Now-playing transport bar */
.music-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: var(--space-4, 16px);
  padding: var(--space-3, 12px) var(--space-4, 16px);
  background: var(--surface-1, #18181b);
  border-top: 1px solid var(--border, #3f3f46);
}
.music-bar__meta {
  flex: 1 1 0;
  min-width: 0;
}
.music-bar__title {
  display: block;
  font-size: var(--text-sm, 0.875rem);
  color: var(--text, #e4e4e7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.music-bar__error {
  display: block;
  font-size: var(--text-xs, 0.75rem);
  color: var(--danger, #f87171);
}
.music-bar__status {
  display: block;
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
}
.music-bar__controls {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
}
.music-bar__btn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full, 999px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  color: var(--text, #e4e4e7);
  cursor: pointer;
}
.music-bar__btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.music-bar__btn--primary {
  background: var(--accent, #f5a524);
  color: var(--accent-contrast, #1a1205);
  border-color: transparent;
}
.music-bar__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.music-bar__icon {
  width: 16px;
  height: 16px;
}
.music-bar__progress {
  flex: 2 1 0;
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
}
.music-bar__seek {
  flex: 1 1 0;
  min-width: 0;
  accent-color: var(--accent, #f5a524);
}
.music-bar__time {
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
  font-family: var(--font-mono, monospace);
  min-width: 3ch;
  text-align: center;
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
