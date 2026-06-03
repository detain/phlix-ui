<script setup lang="ts">
/**
 * SpeedMenu (R3.4) — playback-speed picker (0.25–2×) on the `Select` primitive
 * (keyboard-navigable). Drives `usePlayerStore.rate`; the Player mirrors the rate
 * onto the `<video>`. The `<`/`>` keyboard shortcuts (R3.3) drive the same store
 * value, so the menu and the keys stay in sync. Speed is session state (there is
 * no speed preference), so it is intentionally not persisted across reloads.
 */
import { computed } from 'vue';
import Select from '../ui/Select.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { useMessages } from '../../composables/useMessages';

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const player = usePlayerStore();
const { t } = useMessages();

const options = computed(() => SPEEDS.map((v) => ({ value: v, label: `${v}×` })));

function onChange(v: string | number): void {
  player.setRate(Number(v));
}
</script>

<template>
  <Select
    class="speed-menu"
    :model-value="player.rate"
    :options="options"
    :label="t('player.playbackSpeed')"
    @update:model-value="onChange"
  />
</template>

<style scoped>
.speed-menu {
  min-width: 5.5rem;
}
</style>
