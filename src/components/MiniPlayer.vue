<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MiniPlayer (R3.7) — the persistent docked mini-player.
 *
 * Mounted ONCE at the app shell (sibling of <RouterView>) so it survives route
 * changes. Driven entirely by the singleton `usePlayerStore`: it shows only when
 * `miniPlayer` is on and there is a current media + a playable source (direct
 * `streamUrl` and/or a transcoded `hlsMasterUrl`), plays its OWN
 * <video> from the stored position (so playback continues across navigation),
 * mirrors play/pause with the store both ways, and offers play/pause · expand ·
 * close. Expand emits the media id for the host to navigate to the full player;
 * close stops + clears via `store.closePlayer()`.
 *
 * The route-leave trigger that calls `store.showMiniPlayer()` lives in the
 * PlayerPage integration (R3.9); this component just renders the dock when asked.
 */
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useSyncPlayStore, SYNC_DRIFT_THRESHOLD_SECONDS } from '../stores/useSyncPlayStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { UseResumeReporter } from '../composables/useResumeReporter';
import Icon from './Icon.vue';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase } from '../composables/useApiBase';
import { attachHls } from './player/hls-playback';
import type { HlsHandle } from './player/hls-playback';
import { useImageSrc } from '../composables/useImageSrc';

/** S241: image URLs in a media payload are ROOT-RELATIVE server paths (`/api/v1/artwork/…`),
 *  so bound verbatim they resolve against the HUB origin instead of the selected server's
 *  relay-proxy base. Resolve every image binding through this seam; absolute CDN URLs and
 *  `blob:`/`data:` values pass through byte-for-byte. */
const { imgSrc } = useImageSrc();

const emit = defineEmits<{ (e: 'expand', id: string): void }>();

const player = usePlayerStore();
// S-ui-player-05 (phlix-ui-player-007): the dock is a LIVE SyncPlay surface.
// Room membership and the 5s report timer survive a Player unmount behind the
// dock; the dock must feed the position (else the group broadcasts a frozen
// anchor) and apply inbound play/pause/seek (else remote commands die unseen).
const syncPlay = useSyncPlayStore();
const { t } = useMessages();
const videoRef = ref<HTMLVideoElement | null>(null);
const hlsHandle = ref<HlsHandle | null>(null);

// The shell-mounted resume reporter (provided by `PhlixApp`) — the SAME instance
// the full Player injects, so a title watched to its end in the persistent dock
// sends its finish signal on the live server session too (S30). The dock is a
// child of `PhlixApp`'s template, below the `provide('resumeReporter', …)`, so this
// resolves to the shared reporter that owns the live session id (never a second
// instance). Absent in standalone/test mounts (no provider) → `onEnded` skips it.
const resumeReporter = inject<UseResumeReporter | null>('resumeReporter', null);
/** Single-fire latch for the end-of-playback finish signal; re-armed when the dock's
 *  current item changes (below) so replay / next episode can finish again. */
let finishSignaled = false;

// Per-user favorite state (Feature 16.2). A SINGLE compact favorite toggle in the
// dock (NOT the ThumbRating widget — the dock stays compact) bound to the current
// item. The store keeps no global apiBase, so each call is threaded the MEDIA-scoped
// base (M-UI-10) — server-scoped user-item data rides the same base as the media it
// annotates, which on hub-hosted mounts is the relay-proxy base, not the app-own one.
//
// No hydrate here: the item shown in the dock is the one the full Player/PlayerPage
// already set + hydrated into the store (Player.vue onMounted/watch + PlayerPage),
// so reading `store.isFavorite(id)` reflects that without a redundant double-fetch.
const userItemData = useUserItemDataStore();
const mediaApiBase = useMediaApiBase();

/** Favorited state of the current dock item per the store (false when unknown). */
const isFavorited = computed(() => (player.current ? userItemData.isFavorite(player.current.id) : false));

/** Flip the favorite for the current item (optimistic + rollback + one write in the store). */
function toggleFavorite(): void {
  const id = player.current?.id;
  if (!id) return;
  void userItemData.toggleFavorite(id, mediaApiBase.value);
}

const visible = computed(() => player.miniPlayer && !!player.current && (!!player.streamUrl || !!player.hlsMasterUrl));
const title = computed(() => player.current?.name ?? '');
const progressPct = computed(() => Math.max(0, Math.min(1, player.progress)));

// S-ui-player-05 (phlix-ui-player-007): inbound commands reach the dock.
// Mirrors Player.vue's session watcher — apply state, feed the position, and
// drift-correct onto the committed anchor. Gated on `visible`: while the full
// Player is mounted it owns the element (PlayerPage shows one surface at a
// time); the dock's copy would be a second pair of hands on the same media.
watch(
  () => syncPlay.currentSession,
  (session) => {
    if (!visible.value) return;
    if (!session) return;
    const v = videoRef.value;
    if (!v) return;
    if (session.state === 'playing') {
      void v.play()?.catch(() => {});
      player.play();
    } else if (session.state === 'paused') {
      v.pause();
      player.pause();
    }
    syncPlay.updateLocalPosition(v.currentTime);
    // driftAmount is 0 for paused/waiting (the store's law), so this only moves
    // the element when a playing group and this element genuinely disagree.
    if (Math.abs(syncPlay.driftAmount) > SYNC_DRIFT_THRESHOLD_SECONDS) {
      const target = Math.min(v.duration || session.playbackPosition, Math.max(0, session.playbackPosition));
      v.currentTime = target;
      player.updateProgress(target, v.duration || player.duration);
    }
  },
);

function onLoadedMetadata(): void {
  const v = videoRef.value;
  if (!v) return;
  v.volume = player.volume;
  v.muted = player.muted;
  v.playbackRate = player.rate;
  // resume the same spot the full player left off
  if (player.position > 0 && (!v.duration || player.position < v.duration)) v.currentTime = player.position;
  if (player.playing) void v.play()?.catch(() => {});
}
function onPlay(): void {
  player.play();
  // S-ui-player-05 (phlix-ui-player-008, dock arm): echo-suppressed broadcast —
  // inert unless the group's committed state disagrees with this element.
  syncPlay.notifyTransportCommand('', 'play');
}
function onPause(): void {
  player.pause();
  syncPlay.notifyTransportCommand('', 'pause');
}
function onTimeUpdate(): void {
  const v = videoRef.value;
  if (!v) return;
  player.updateProgress(v.currentTime, v.duration);
  // S-ui-player-05 (phlix-ui-player-007): the report feed. Without this the
  // still-running timer kept broadcasting the position the Player had when it
  // unmounted — the room watched a statue.
  if (syncPlay.isInRoom) syncPlay.updateLocalPosition(v.currentTime);
}
/** End of playback in the dock — tell the server this item finished so it leaves
 *  continue-watching (S30). Reuses the SAME shell reporter (and its live session)
 *  the full Player uses. Guarded to fire once per playback-end via `finishSignaled`
 *  (re-armed on a dock-item change); best-effort — the reporter no-ops when logged
 *  out / no session and swallows its own failures, so this never disturbs the dock. */
function onEnded(): void {
  if (finishSignaled) return;
  finishSignaled = true;
  void resumeReporter?.finish();
}
function togglePlay(): void {
  const v = videoRef.value;
  if (!v) return;
  if (v.paused) void v.play()?.catch(() => {});
  else v.pause();
}
function expand(): void {
  if (player.current) emit('expand', player.current.id);
}
function close(): void {
  // S506 — flush the final position BEFORE `closePlayer()` nulls `player.current`,
  // so `reportFinal()` reads the live tail rather than falling back to the last
  // retained checkpoint. The dock is mounted once in the shell (its `onBeforeUnmount`
  // fires only at app teardown), so this close/quit handler is the path that must flush.
  void resumeReporter?.reportFinal?.();
  player.closePlayer();
}

/**
 * Monotonic setup-generation token (mirrors PhotoViewPage's `loadSeq`): a
 * hide→show while an attach is in flight overlaps two setupHls runs, and only
 * the NEWEST run may own `hlsHandle`. Without the token the first run passed
 * the post-await re-check (visible again, same URL) and installed, then the
 * second run overwrote `hlsHandle` and the first segment-fetcher was orphaned
 * alive. Every superseded run destroys its own handle after the await and
 * returns without assigning; teardown bumps the token too, so an in-flight-at-
 * unmount install self-destroys instead of stranding a fetcher on a dead dock.
 */
let setupSeq = 0;

/** Set up HLS playback via hls.js when hlsMasterUrl is persisted from a transcoded session. */
async function setupHls(): Promise<void> {
  const v = videoRef.value;
  if (!v || !player.hlsMasterUrl) return;
  const seq = ++setupSeq;
  const masterUrl = player.hlsMasterUrl;
  // Destroy any previous handle before creating a new one.
  hlsHandle.value?.destroy();
  hlsHandle.value = null;
  try {
    const handle = await attachHls(v, masterUrl, {
      startPosition: player.position,
      onReady: () => {
        const video = videoRef.value;
        if (!video) return;
        video.volume = player.volume;
        video.muted = player.muted;
        video.playbackRate = player.rate;
        if (player.playing) void video.play()?.catch(() => {});
      },
    });
    // `attachHls` awaits (manifest load). During that window this run can go stale
    // three ways: a newer setupHls superseded it (`seq !== setupSeq`), the dock
    // unmounted (teardown bumps the token), or it hid / the stream changed — the
    // hide-branch destroyed `hlsHandle` while it was still null, so installing
    // now would strand a LIVE segment-fetcher with no owner. A stale run discards
    // its own handle instead of assigning.
    if (seq !== setupSeq || !visible.value || player.hlsMasterUrl !== masterUrl) {
      handle.destroy();
      return;
    }
    hlsHandle.value = handle;
  } catch {
    // attachHls rejects when the browser supports neither MSE nor native HLS
    // (hls-playback.ts). A rejected attach owns NO handle, so there is nothing
    // to destroy and nothing to install; without this catch the rejection
    // escaped the async watch/onMounted callbacks as an unhandled promise
    // rejection. The dock degrades to its poster exactly like the native-HLS
    // branch above, and a newer run supersedes via the seq law unchanged.
    return;
  }
}

/** Watch [visible, hlsMasterUrl] to attach/tear down HLS.
 *  flush:'post' — the dock's <video> lives inside `v-if="visible"`: the default
 *  pre-flush would run this callback BEFORE the re-show render remounts the element,
 *  so `setupHls` would read a null `videoRef` and silently drop the attach (the
 *  hide→show overlap the generation guard above owns could then never even spawn
 *  the second run). After the render the element is there, and the generation
 *  token keeps the newest run the sole owner of `hlsHandle`.
 *
 *  phlix-ui-player-002/003 rewrite of the trigger + gate:
 *  - The gate is the MASTER alone. The old `hlsMasterUrl && !streamUrl`
 *    condition encoded a state production never yields (PlayerPage.setCurrent
 *    always carries a direct URL; useHlsTranscode.start:451 persists the master
 *    beside it), so the dock never attached a real session. A master means
 *    "play this via hls.js" — hls.attachMedia owns the element from there.
 *  - Keyed on the master itself, not just `visible`: a queue advance that
 *    clears a stale master while the dock stays open (003) must tear the live
 *    handle down — `visible` alone never changed, so the old watcher left a
 *    previous item's segment-fetcher bleeding into the next session. In-flight
 *    runs self-destroy via setupHls's own post-await equality guard. */
watch(
  () => [visible.value, player.hlsMasterUrl] as const,
  async ([vis, master]) => {
    if (!vis || !master) {
      // Tear down HLS when hiding OR when the master goes away — the handle
      // keeps fetching segments if left alive.
      hlsHandle.value?.destroy();
      hlsHandle.value = null;
      return;
    }
    await setupHls();
  },
  { flush: 'post' },
);

// Also try to attach on mount in case visible + master were already true
// (e.g. store state restored, or the dock mounts mid-transcode-session).
// No `!streamUrl` condition (phlix-ui-player-002): the production pair has both.
onMounted(async () => {
  if (visible.value && player.hlsMasterUrl) {
    await setupHls();
  }
});

// Re-arm the finish latch when the docked item changes (replay / next episode /
// the user starts another title in the dock) so each item can send its own
// end-of-playback finish signal. Mirrors Player.vue's per-source reset.
watch(
  () => player.current?.id,
  () => {
    finishSignaled = false;
  },
);

// reflect a store play/pause (e.g. from OS media keys) onto the mini element
watch(
  () => player.playing,
  (p) => {
    const v = videoRef.value;
    if (!v) return;
    if (p && v.paused) void v.play()?.catch(() => {});
    else if (!p && !v.paused) v.pause();
  },
);

// External transport command bus (R-player-seam) — a host outside the Vue tree
// (Electron tray / media keys, TV remotes) pushes a seek intent onto the store.
// When the mini-player is the live element owner, apply it to OUR element clamped
// to [0, duration] and push the new position into the store (mirroring how
// onTimeUpdate keeps the store in sync), so seek works whether the full player or
// the dock is on screen.
watch(
  () => player.lastCommand,
  (cmd) => {
    const v = videoRef.value;
    if (!cmd || !v) return;
    const target = cmd.type === 'seekTo' ? cmd.value : player.position + cmd.value;
    const dur = v.duration && v.duration > 0 ? v.duration : player.duration;
    const clamped = dur > 0 ? Math.min(dur, Math.max(0, target)) : Math.max(0, target);
    v.currentTime = clamped;
    player.updateProgress(clamped, v.duration || undefined);
  },
);

// pause our element if the dock is torn down while still playing
onBeforeUnmount(() => {
  // S506 — final flush on full-app teardown (the persistent dock only unmounts when
  // the shell does; the user close/quit path flushes in `close()` above). Best-effort
  // and idempotent-safe: the reporter no-ops when logged out or with no session.
  void resumeReporter?.reportFinal?.();
  setupSeq++; // supersede any in-flight setupHls — its post-await guard self-destroys the handle
  hlsHandle.value?.destroy();
  hlsHandle.value = null;
  videoRef.value?.pause?.();
});
</script>

<template>
  <Transition name="mini">
    <div v-if="visible" class="mini" role="region" data-player-surface="" :aria-label="t('player.miniPlayer')">
      <!-- data-player-surface dock parity marker for D-pad input arbitration [S-ui-player-09] -->
      <video
        ref="videoRef"
        class="mini__video"
        :src="player.streamUrl"
        :poster="imgSrc(player.current?.poster_url) ?? undefined"
        preload="metadata"
        playsinline
        @loadedmetadata="onLoadedMetadata"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeUpdate"
        @ended="onEnded"
        @click="expand"
      />

      <div class="mini__body">
        <p class="mini__title">{{ title }}</p>
        <div class="mini__controls">
          <button type="button" class="mini__btn" :aria-label="player.playing ? t('player.pause') : t('player.play')" @click="togglePlay">
            <Icon :name="player.playing ? 'pause' : 'play'" />
          </button>
          <button
            v-if="player.current"
            type="button"
            class="mini__btn mini__btn--favorite"
            :class="{ 'is-on': isFavorited }"
            :aria-label="isFavorited ? t('itemActions.removeFavorite') : t('itemActions.addFavorite')"
            :aria-pressed="isFavorited ? 'true' : 'false'"
            @click="toggleFavorite"
          >
            <Icon :name="isFavorited ? 'bookmark' : 'bookmark-plus'" />
          </button>
          <button type="button" class="mini__btn" :aria-label="t('player.expand')" @click="expand">
            <Icon name="expand" />
          </button>
          <button type="button" class="mini__btn mini__btn--close" :aria-label="t('player.closePlayer')" @click="close">
            <Icon name="x" />
          </button>
        </div>
      </div>

      <div class="mini__progress" aria-hidden="true">
        <div class="mini__progress-fill" :style="{ transform: `scaleX(${progressPct})` }" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mini {
  position: fixed;
  right: var(--space-5);
  bottom: var(--space-5);
  z-index: var(--z-overlay, 60);
  width: 340px;
  max-width: calc(100vw - 2 * var(--space-5));
  display: flex;
  gap: var(--space-3);
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  background: var(--surface-glass-strong, rgba(20, 20, 20, 0.7));
  border: 1px solid var(--border-strong, rgba(255, 255, 255, 0.12));
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-3);
  isolation: isolate;
}

.mini__video {
  width: 112px;
  aspect-ratio: 16 / 9;
  flex: none;
  border-radius: var(--radius-md);
  background: #000;
  object-fit: cover;
  cursor: pointer;
}

.mini__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-1);
  min-width: 0;
  flex: 1;
}
.mini__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  /* Theme-aware: the dock background is `--surface-glass-strong`, which is a
     dark glass in Nocturne/Midnight but off-white in Daylight. A hardcoded
     white title vanished on the light theme — use the semantic text token. */
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini__controls {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
.mini__btn {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  /* Theme-aware icon colour — a hardcoded white was invisible on the Daylight
     theme's off-white dock (only the close button showed, and only on hover). */
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.mini__btn:hover {
  background: var(--surface-3);
  color: var(--text);
}
.mini__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.mini__btn :deep(svg) {
  width: 18px;
  height: 18px;
}
.mini__btn--close:hover {
  color: var(--accent-text);
}
/* Favorited reads filled + amber (like MediaCard/Player), scoped to the favorite
   button so it does NOT fill the play/expand/close glyphs. */
.mini__btn--favorite.is-on {
  color: var(--accent);
}
.mini__btn--favorite.is-on :deep(svg) {
  fill: currentColor;
}

/* progress bar pinned to the bottom edge */
.mini__progress {
  position: absolute;
  left: var(--space-2);
  right: var(--space-2);
  bottom: 4px;
  height: 3px;
  border-radius: var(--radius-full);
  background: var(--border-strong);
  overflow: hidden;
}
.mini__progress-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transform-origin: left center;
  transition: transform var(--dur-fast) linear;
}

/* enter/leave */
.mini-enter-active,
.mini-leave-active {
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}
.mini-enter-from,
.mini-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  .mini-enter-active,
  .mini-leave-active,
  .mini__progress-fill {
    transition: none;
  }
}
</style>
