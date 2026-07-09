<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Browse surface visual harness (R6.4b). Mounts the real `MediaRow`
 * (Continue Watching rail) + `MediaGrid` poster grid with deterministic offline
 * mock data. A large `overscan` makes the virtualized grid render every item
 * regardless of viewport/scroll-measurement timing, so the screenshot is stable.
 * Acceptance target: `src/dev/mockups/browse-grid.html`.
 */
import MediaRow from '../../components/MediaRow.vue';
import MediaGrid from '../../components/MediaGrid.vue';
import { LIBRARY, CONTINUE } from './mock-data';
</script>

<template>
  <div class="vh-browse">
    <MediaRow title="Continue Watching" :items="CONTINUE" />
    <section class="vh-browse__grid">
      <h2 class="vh-browse__heading">All titles</h2>
      <MediaGrid :items="LIBRARY" :overscan="24" />
    </section>
  </div>
</template>

<style scoped>
.vh-browse {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-7) var(--space-6) var(--space-12);
  display: grid;
  gap: var(--space-8);
}
.vh-browse__heading {
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-5);
}
</style>
