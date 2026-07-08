<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

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
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import type { MediaItem } from '../types/media-item';
import { ApiClient } from '../api/client';
import { useMediaApiBase, useMediaDirectBase } from '../composables/useApiBase';
import { buildMediaUrl } from '../api/media-query';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import Player from '../components/Player.vue';
import type { Chapter } from '../components/player/Scrubber.vue';
import type { TimeMarker } from '../components/player/playback';
import { hasSeasonRows } from '../components/series-grouping';
import { orderEpisodesForPlayback, previousEpisode, nextEpisode } from '../components/player/episode-order';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import { usePageTitle } from '../composables/usePageTitle';

interface MediaListResponse {
  items: MediaItem[];
  total: number;
}

/**
 * Per-session cache of the ordered (playback) episode list for a whole series,
 * keyed by the resolved series-root id. Binge navigation (Next, Next, Next…)
 * walks the same series, so once it's fetched + ordered we reuse it and just
 * recompute prev/next from the current id — no parent-hop walk, no root-children
 * fetch, no N season-children fetches per episode click. Module-level so it
 * survives the page's own remount on each player→player route change; lifetime =
 * the SPA session (a small Map, one entry per series watched — bounded by how
 * many distinct series the user opens in a session). */
const seriesEpisodeCache = new Map<string, MediaItem[]>();

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

// On the hub this is the relay-proxy base for the selected server, so the
// player's metadata/playback-info fetches hit that paired server inline; on the
// media server it is the app's own base. (NOTE: streaming the media bytes over
// the relay tunnel is P3 — out of scope here; this only re-points the page's API
// fetches, matching the rest of the media surface.)
const apiBase = useMediaApiBase();
// The paired server's own public origin on the hub (else ''). The player streams
// media bytes from here directly (native Range) since the proxy doesn't route the
// byte-stream endpoint; transcode/HLS still go over `apiBase` (the proxy).
const directBase = useMediaDirectBase();
const route = useRoute();
const router = useRouter();
const player = usePlayerStore();
// Per-user favorite/love state (Feature 16). The by-id fetch below resolves the
// MediaDetail — the AUTHORITATIVE source of `user_data` — so the page seeds the
// store from it as soon as the item loads. <Player> also hydrates from
// `props.media` on mount/media-change, but `hydrate` is idempotent (it `set()`s
// the entry keyed by id from the item's `user_data`), so the page seeding the
// SAME item is the source of truth and the Player's redundant re-hydrate is a
// harmless no-op. This guarantees the favorite + Love controls pre-fill from the
// server the moment the player opens.
const userItemData = useUserItemDataStore();

const item = ref<MediaItem | null>(null);
const streamUrl = ref('');
const chapters = ref<Chapter[]>([]);
const introMarker = ref<TimeMarker | null>(null);
const outroMarker = ref<TimeMarker | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const theater = ref(false);
/** Prev/Next episode in the whole-series order (U2) — null for movies or at the
 *  ends of the series. Drives the Player's prev/next-episode buttons. */
const prevEp = ref<MediaItem | null>(null);
const nextEp = ref<MediaItem | null>(null);

const currentId = computed(() => String(route.params.id ?? ''));

// The playing item's title becomes the page title once it loads (and updates on
// up-next advance, since the id watch reloads `item`); until then the route
// default stands.
usePageTitle(() => item.value?.name);

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
 *  (which can't await playback-info) always threads a fresh URL via player.next().
 *
 *  Prefers the server-minted **signed** `stream_url` (`/media/:id/stream?exp&sig`)
 *  when present: `/media/:id/stream` is no longer world-readable and a `<video src>`
 *  can't attach a Bearer header, so a bare path would 401 for SPA sessions (which
 *  hold a localStorage token, not a cookie). Only the single-item detail shape
 *  carries `stream_url`; queue/up-next rows (from the list endpoint) fall back to
 *  the bare path, which is fine because advancing navigates the route and re-fetches
 *  the detail (and thus a fresh signed URL) before that item actually plays. The
 *  signed path is root-relative, so prefix a base for cross-origin hosts.
 *
 *  On the hub the signed path is prefixed with the paired server's OWN public
 *  origin (`directBase`) so the `<video>` streams the bytes straight from the
 *  server with native Range — the relay proxy does not route `/media/:id/stream`
 *  (it carries only JSON/browse + small HLS segments). The signature authenticates
 *  the request cross-origin (no cookie needed). If the server reported no reachable
 *  origin, `directBase` is '' and we fall back to the media-api base; an unreachable
 *  origin surfaces as a `<video>` error that flips the player to an HLS transcode
 *  over the proxy (see Player.onVideoError). On the media server `directBase` is ''
 *  so this is unchanged (the page origin serves the bytes). */
function streamUrlFor(m: MediaItem): string {
  const base = directBase.value || apiBase.value;
  if (m.stream_url) {
    return /^https?:\/\//.test(m.stream_url) ? m.stream_url : `${base}${m.stream_url}`;
  }
  return `${base}/media/${encodeURIComponent(m.id)}/stream`;
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

/** Fetch a parent's direct children (seasons/episodes), high limit so a full
 *  series arrives in one page — mirrors MediaDetailPage.fetchChildren. */
async function fetchChildren(client: ApiClient, parentId: string, signal?: AbortSignal): Promise<MediaItem[]> {
  const url = buildMediaUrl(apiBase.value, { parentId, limit: 100, sort: 'name', order: 'asc' });
  const res = await client.get<MediaListResponse>(url, undefined, signal);
  return res.items ?? [];
}

/** Walk parent_id up from an episode to its series root (episode → season →
 *  series). Best-effort: returns the highest ancestor reached (or the item
 *  itself) so a partial chain still yields a usable grouping root. Bounded to a
 *  few hops to avoid a pathological cycle. */
async function resolveSeriesRoot(client: ApiClient, item: MediaItem, signal?: AbortSignal): Promise<MediaItem> {
  let node = item;
  for (let hops = 0; hops < 4 && node.parent_id; hops += 1) {
    const res = await client.get<{ item: MediaItem }>(
      `/api/v1/media/${encodeURIComponent(node.parent_id)}`,
      undefined,
      signal,
    );
    const parent = res.item;
    if (!parent) break;
    node = parent;
    if (parent.type === 'series') break;
  }
  return node;
}

/** Set the prev/next refs from an already-ordered whole-series playback list. */
function applyNeighbours(ordered: MediaItem[], currentEpId: string): void {
  prevEp.value = previousEpisode(ordered, currentEpId);
  nextEp.value = nextEpisode(ordered, currentEpId);
}

/** Find a cached ordered playback list that already contains `episodeId`, or
 *  null. Binge nav stays within one series, so the next sibling is almost always
 *  in a list we fetched a click ago — a cache hit skips ALL series-tree fetches. */
function cachedOrderedFor(episodeId: string): MediaItem[] | null {
  for (const ordered of seriesEpisodeCache.values()) {
    if (ordered.some((e) => e.id === episodeId)) return ordered;
  }
  return null;
}

/** Build the whole-series ordered episode list and resolve the prev/next
 *  neighbours of the currently-playing episode (U2). Non-fatal: any failure just
 *  leaves the buttons hidden. Only runs for episode content; movies clear them.
 *  Caches the ordered list per series-root id so repeated (binge) navigation
 *  within the same series reuses it and skips the parent-hop walk + children
 *  fetches entirely (Finding 1). Uses the PLAYBACK ordering (numbered seasons
 *  only; Specials excluded from the auto-advance chain — Finding 2). */
async function loadEpisodeNeighbours(client: ApiClient, base: MediaItem): Promise<void> {
  prevEp.value = null;
  nextEp.value = null;
  const isEpisode = base.type === 'episode' || (base.episode_number ?? null) !== null;
  if (!isEpisode) return;
  // Cache hit: this episode is already in a fetched series order — just recompute
  // prev/next, no fetches.
  const cached = cachedOrderedFor(base.id);
  if (cached) {
    applyNeighbours(cached, base.id);
    return;
  }
  const myController = controller;
  const stale = () => disposed || myController !== controller;
  try {
    const root = await resolveSeriesRoot(client, base, myController?.signal);
    if (stale()) return;
    let children = await fetchChildren(client, root.id, myController?.signal);
    if (stale()) return;
    // Flatten season-container rows to their episodes (uniform season grouping).
    if (hasSeasonRows(children)) {
      const seasonRows = children.filter((c) => c.type === 'season');
      const lists = await Promise.all(
        seasonRows.map((s) => fetchChildren(client, s.id, myController?.signal).catch(() => [] as MediaItem[])),
      );
      if (stale()) return;
      children = [...children.filter((c) => c.type !== 'season'), ...lists.flat()];
    }
    const ordered = orderEpisodesForPlayback(children);
    if (ordered.length) seriesEpisodeCache.set(root.id, ordered);
    applyNeighbours(ordered, base.id);
  } catch (e) {
    if (stale() || isAbort(e)) return;
    prevEp.value = null;
    nextEp.value = null;
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
  prevEp.value = null;
  nextEp.value = null;
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
    // Seed the per-user favorite/love controls from the fetched MediaDetail's
    // server `user_data` (Feature 16). This is the authoritative source; <Player>
    // also hydrates from the same item on mount, but `hydrate` is idempotent so
    // pre-filling here ensures the controls reflect server state when the player
    // opens. Guarded on a non-null fetched item.
    if (mediaItem) userItemData.hydrate(mediaItem);
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
    void loadEpisodeNeighbours(client, mediaItem);
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
/** Prev/Next episode button (U2) — navigate to the adjacent episode's player
 *  route; the id watch re-loads the item, queue, and neighbours. */
function onPlayEpisode(ep: MediaItem): void {
  router?.push({ name: 'player', params: { id: ep.id } }).catch(() => {});
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
        :prev-episode="prevEp"
        :next-episode="nextEp"
        :autoplay="true"
        @back="onBack"
        @play-next="onPlayNext"
        @play-episode="onPlayEpisode"
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
  max-width: none;
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
