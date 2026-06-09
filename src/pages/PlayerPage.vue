<script setup lang="ts">
/**
 * PlayerPage (R3.9) — route container for `/app/player/:id`, the final R3 step.
 *
 * Wires the redesigned <Player> (R3.1–R3.8) to the real backend + the singleton
 * usePlayerStore:
 *  - resolves the playable URL (the deterministic direct-stream /media/:id/stream
 *    endpoint) and supplies a SYNCHRONOUS `streamUrlFor` resolver so the player's
 *    up-next auto-advance threads a fresh URL into usePlayerStore.next();
 *  - reads GET /api/v1/media/:id/playback-info for intro/outro skip markers + chapter
 *    ticks (best-effort enrichment — absent markers just disable those affordances);
 *  - builds a genre-scoped "up next" queue (usePlayerStore.setQueue) so the R3.8
 *    up-next card + autoplay actually have something to advance to;
 *  - handles `play-next` by navigating the route to the new id (URL stays correct;
 *    the id watch re-loads the title + a fresh queue);
 *  - hands playback off to the persistent <MiniPlayer> on route-leave
 *    (store.showMiniPlayer()) and reclaims it on enter/reload (store.hideMiniPlayer()),
 *    so audio/video continues across navigation and expanding the dock returns here;
 *  - paints a poster-derived ambient backdrop + loading / error / skeleton states.
 *
 * Resume restoration + the mkv/hevc transcode notice live INSIDE <Player> (R3.8);
 * this page just feeds it real data. Deep-links work and re-fetch when the id changes.
 */
import { ref, computed, inject, onMounted, watch, onBeforeUnmount, type ComputedRef } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import type { MediaItem } from '../types/media-item';
import { ApiClient } from '../api/client';
import { buildMediaUrl } from '../api/media-query';
import { usePlayerStore } from '../stores/usePlayerStore';
import Player from '../components/Player.vue';
import type { Chapter } from '../components/player/Scrubber.vue';
import type { TimeMarker } from '../components/player/playback';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';

interface MediaListResponse {
  items: MediaItem[];
  total: number;
}

/** Server playback-info contract (GET /api/v1/media/:id/playback-info): intro/outro
 *  skip markers + chapter ticks. Times are in seconds. There is NO stream url —
 *  playback uses the deterministic /media/:id/stream endpoint (streamUrlFor). */
interface ServerMarker {
  start_seconds: number;
  end_seconds: number;
}
interface PlaybackInfo {
  intro_marker: ServerMarker | null;
  outro_marker: ServerMarker | null;
  chapters: { start_seconds: number; end_seconds?: number; title?: string | null }[];
}

// createPhlixApp provides `apiBase` as a plain string; accept a ComputedRef too so a
// host can inject a reactive base. (The legacy page read `.value` and got undefined.)
const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const route = useRoute();
const router = useRouter();
const player = usePlayerStore();

const item = ref<MediaItem | null>(null);
const streamUrl = ref('');
const chapters = ref<Chapter[]>([]);
const introMarker = ref<TimeMarker | null>(null);
const outroMarker = ref<TimeMarker | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const theater = ref(false);

const currentId = computed(() => String(route.params.id ?? ''));

/** Poster-derived ambient backdrop. The url() value is escaped (backslash/quote
 *  escaped, CR/LF stripped) like Scrubber.previewThumbCss so a poster URL containing
 *  `)`/`"` can't break out of the declaration (the R3.2-hardened CSS pattern). */
const ambientStyle = computed(() => {
  const url = item.value?.poster_url;
  if (!url) return undefined;
  const safe = url.replace(/[\\"]/g, '\\$&').replace(/[\r\n]/g, '');
  return { backgroundImage: `url("${safe}")` };
});

let controller: AbortController | null = null;
let disposed = false;

function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

/** Direct-stream URL for any media id — synchronous, so the player's up-next advance
 *  (which can't await playback-info) always threads a fresh URL via player.next(). */
function streamUrlFor(m: MediaItem): string {
  return `${apiBase.value}/media/${encodeURIComponent(m.id)}/stream`;
}

/** Map a server marker ({start_seconds,end_seconds}) to a client TimeMarker, or null. */
function toMarker(m: ServerMarker | null | undefined): TimeMarker | null {
  return m ? { start: m.start_seconds, end: m.end_seconds } : null;
}

/** Genre-scoped "up next" queue so the end-of-video up-next card + autoplay have
 *  something to advance to. Non-fatal: a missing queue just disables up-next. The
 *  pinned controller makes a superseded fetch (rapid player→player nav) a no-op. */
async function loadQueue(client: ApiClient, base: MediaItem): Promise<void> {
  const genre = base.genres?.[0];
  if (!genre) {
    player.setQueue([]);
    return;
  }
  // Pin the controller for THIS load so a superseded queue fetch (rapid player→player
  // nav) can't clobber the newer one — mirrors MediaDetailPage.loadSimilar.
  const myController = controller;
  const stale = () => disposed || myController !== controller;
  try {
    const url = buildMediaUrl(apiBase.value, { genres: [genre], limit: 13, sort: 'rating', order: 'desc' });
    const res = await client.get<MediaListResponse>(url, undefined, myController?.signal);
    if (stale()) return;
    player.setQueue((res.items ?? []).filter((m) => m.id !== base.id).slice(0, 12));
  } catch (e) {
    if (stale() || isAbort(e)) return;
    player.setQueue([]); // a missing up-next list is non-fatal
  }
}

async function load(): Promise<void> {
  const id = currentId.value;
  controller?.abort();
  controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  loading.value = true;
  error.value = null;
  chapters.value = [];
  introMarker.value = null;
  outroMarker.value = null;
  player.hideMiniPlayer(); // the full player owns playback while we're on this route
  if (!id) {
    error.value = 'No media id provided';
    loading.value = false;
    return;
  }
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    const response = await client.get<{ item: MediaItem }>(
      `/api/v1/media/${encodeURIComponent(id)}`,
      undefined,
      controller?.signal,
    );
    if (disposed) return;
    const mediaItem = response.item;
    item.value = mediaItem;
    // Playback is the deterministic direct-stream endpoint (synchronous, so up-next
    // auto-advance threads the same resolver). Resolve it up front.
    streamUrl.value = streamUrlFor(mediaItem);
    // Enrich with intro/outro skip markers + chapter ticks from playback-info. Best-
    // effort: a 404 / non-JSON / slow response just leaves them empty (no skip buttons,
    // no chapter ticks) and never blocks playback.
    const info = await client
      .get<PlaybackInfo>(`/api/v1/media/${encodeURIComponent(id)}/playback-info`, undefined, controller?.signal)
      .catch(() => null);
    if (disposed) return;
    chapters.value = (info?.chapters ?? []).map((c) => ({ start: c.start_seconds, title: c.title ?? undefined }));
    introMarker.value = toMarker(info?.intro_marker);
    outroMarker.value = toMarker(info?.outro_marker);
    loading.value = false;
    void loadQueue(client, mediaItem);
  } catch (e) {
    if (disposed || isAbort(e)) return;
    error.value = e instanceof Error ? e.message : 'Failed to load media';
    loading.value = false;
  }
}

onMounted(load);
watch(currentId, load);

// Hand playback off to the persistent mini-player when navigating AWAY from the player
// route (param changes between player items fire onBeforeRouteUpdate, NOT leave, so a
// binge-advance keeps the full player). Only when there's a live session to continue.
onBeforeRouteLeave(() => {
  if (player.current && player.streamUrl) player.showMiniPlayer();
});

onBeforeUnmount(() => {
  disposed = true;
  controller?.abort();
  controller = null;
});

function onBack(): void {
  router?.back();
}
/** Player advanced the queue (up-next countdown or "Play now"); the store is already
 *  on the new item — sync the route so the URL + :id match (the id watch re-loads). */
function onPlayNext(next: MediaItem): void {
  router?.push({ name: 'player', params: { id: next.id } }).catch(() => {});
}
function onTheater(active: boolean): void {
  theater.value = active;
}
</script>

<template>
  <div class="player-page" :class="{ 'is-theater': theater }">
    <div
      v-if="ambientStyle && !loading && !error"
      class="player-page__ambient"
      :style="ambientStyle"
      aria-hidden="true"
    />

    <div class="player-page__stage">
      <div
        v-if="loading"
        class="player-page__skeleton"
        role="status"
        aria-busy="true"
        aria-label="Loading player"
      >
        <Skeleton variant="rect" radius="var(--radius-xl)" height="100%" />
      </div>

      <EmptyState
        v-else-if="error"
        class="player-page__error"
        icon="alert"
        title="Couldn't play this title"
        :description="error"
      >
        <template #actions>
          <Button variant="solid" @click="load">Retry</Button>
          <Button variant="ghost" @click="onBack">Back</Button>
        </template>
      </EmptyState>

      <Player
        v-else-if="item"
        :media="item"
        :stream-url="streamUrl"
        :stream-url-for="streamUrlFor"
        :api-base="apiBase"
        :chapters="chapters"
        :intro-marker="introMarker"
        :outro-marker="outroMarker"
        @back="onBack"
        @play-next="onPlayNext"
        @theater="onTheater"
      />
    </div>
  </div>
</template>

<style scoped>
.player-page {
  position: relative;
  width: 100%;
  min-height: 100%;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* poster-derived ambient glow behind the stage */
.player-page__ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.16;
  filter: blur(80px) saturate(1.35);
  pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, #000 0%, transparent 75%);
}

.player-page__stage {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-6);
}

/* loading skeleton occupies the player's 16:9 footprint */
.player-page__skeleton {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 90vh;
}

.player-page__error {
  min-height: 50vh;
}

/* theater mode (driven by <Player>'s @theater) — go full-bleed + dim the surround */
.player-page.is-theater {
  background: #05070b;
}
.player-page.is-theater .player-page__stage {
  max-width: none;
  padding: 0;
}
.player-page.is-theater .player-page__ambient {
  opacity: 0.05;
}

@media (prefers-reduced-motion: reduce) {
  .player-page__ambient {
    transition: none;
  }
}
</style>
