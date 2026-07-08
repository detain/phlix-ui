<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * QualityMenu OPEN-state harness (E4) — visual baseline + axe a11y target.
 *
 * The `player` surface harness serves a direct-play `sample.mp4`, so hls.js never
 * attaches and the live level ladder stays empty — and `QualityMenu` only renders
 * once there are ≥2 switchable rungs. So the menu-OPEN state can NOT be captured on
 * the real player chrome without a live multi-variant transcode server. This
 * component-level harness feeds `QualityMenu` a deterministic offline ladder and
 * opens the `Select` listbox on mount, so the visual suite can snapshot the fully
 * expanded menu and the axe suite can assert its ARIA is clean — the glass tone on
 * a dark, player-like backdrop, exactly as it reads over the transparent chrome.
 *
 * Not shipped (`src/dev/**` is excluded from the lib build + coverage).
 */
import { onMounted, nextTick } from 'vue';
import QualityMenu from '../../components/player/QualityMenu.vue';
import type { HlsLevel } from '../../components/player/hls-playback';

// A 4-rung ladder (highest-first, as hls.js lists it) plus the Auto sentinel the
// menu prepends → five visible rows when open.
const ladder: HlsLevel[] = [
  { index: 0, height: 1080, width: 1920, bitrate: 5_000_000, name: '1080p' },
  { index: 1, height: 720, width: 1280, bitrate: 2_800_000, name: '720p' },
  { index: 2, height: 480, width: 854, bitrate: 1_400_000, name: '480p' },
  { index: 3, height: 240, width: 426, bitrate: 400_000, name: '240p' },
];

// Open the listbox once mounted so the OPEN menu is what gets captured. `Select`
// opens on trigger click; nothing clicks outside afterwards, so it stays open for
// the deterministic screenshot / axe pass.
onMounted(async () => {
  await nextTick();
  document
    .querySelector<HTMLButtonElement>('.quality-menu .phlix-select__trigger')
    ?.click();
});
</script>

<template>
  <div class="vh-quality-menu">
    <QualityMenu :levels="ladder" :auto-enabled="true" :active-height="720" />
  </div>
</template>

<style scoped>
.vh-quality-menu {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 6rem 1.5rem;
  /* Dark, player-like backdrop so the translucent glass-tone menu reads with the
     same contrast it has over the real (dark) player chrome. */
  background: #0b0b0d;
}
</style>
