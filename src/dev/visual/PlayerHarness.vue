<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Player surface visual harness (R6.4b). Mounts the real `Player` chrome with a
 * tiny, valid, offline `sample.mp4` (h.264) as the stream source so the
 * `<video>` loads WITHOUT a fatal error — a 404/undecodable source would flip
 * `transcodeNeeded` and replace the chrome with the TranscodeNotice. Playback
 * never starts (no autoplay), so the store stays `paused` and the chrome stays
 * VISIBLE: scrims, Now-Playing metadata, the center play button, the control bar
 * (scrubber + time + volume/speed/quality/captions/info/theater/fullscreen).
 *
 * Ambient ("Ambilight") is intentionally OFF here (atmosphere disabled in the
 * harness bootstrap) for determinism — the live ambient sampling is verified
 * separately in R3.6/R6.3. Acceptance target: `src/dev/mockups/player-chrome.html`.
 */
import Player from '../../components/Player.vue';
import { HERO } from './mock-data';
import type { MediaItem } from '../../types/media-item';

// Drop the poster so the <video> shows its own (clean, dark) first frame behind
// the chrome — the generic poster art's play glyph would otherwise sit behind the
// real center play button. Title/meta still come from the Now-Playing overlay.
const media: MediaItem = { ...HERO, poster_url: null };

// Served as a static file by the Vite dev server (the same mechanism that serves
// the dev `*.html` harness pages); `.mp4` is a direct-play container so the
// transcode guard stays off.
const sampleUrl = '/src/dev/visual/sample.mp4';
</script>

<template>
  <div class="vh-player">
    <Player :media="media" :stream-url="sampleUrl" />
  </div>
</template>

<style scoped>
.vh-player {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-6);
}
.vh-player > :deep(.player) {
  max-width: 1040px;
}
</style>
