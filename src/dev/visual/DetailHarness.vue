<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MediaDetail surface visual harness (R6.4b). Mounts the real `MediaDetail`
 * composition component (poster-derived ambient hero + meta/genre/cast chips +
 * Play/Resume/Watchlist + a "More like this" rail) with deterministic offline
 * mock data. No locked mockup exists for detail (designed in R2.5 within the
 * locked tokens); this is a pure regression baseline.
 */
import MediaDetail from '../../components/MediaDetail.vue';
import { HERO, SIMILAR } from './mock-data';

// ~42 min in — exercises the Resume action's formatted-timecode branch.
const resumeSeconds = 42 * 60;
</script>

<template>
  <div class="vh-detail">
    <MediaDetail :item="HERO" :resume-seconds="resumeSeconds" :similar="SIMILAR" :show-back="true" />
  </div>
</template>

<style scoped>
.vh-detail {
  min-height: 100vh;
}
</style>
