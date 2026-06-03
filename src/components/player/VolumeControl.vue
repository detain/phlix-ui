<script setup lang="ts">
/**
 * VolumeControl (R3.4) — mute toggle + a `Slider`-based volume, with mute memory.
 *
 * Reads/writes `usePlayerStore` (the Player mirrors store volume/muted onto the
 * `<video>`). Muting keeps the stored volume so unmute restores it; the slider
 * shows 0 while muted. The chosen volume is persisted to
 * `usePreferencesStore.defaultVolume` so it survives a reload.
 */
import { computed, watch } from 'vue';
import IconButton from '../ui/IconButton.vue';
import Slider from '../ui/Slider.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';
import { useMessages } from '../../composables/useMessages';

const player = usePlayerStore();
const prefs = usePreferencesStore();
const { t } = useMessages();

/** Effective level shown on the slider — zero while muted. */
const level = computed(() => (player.muted ? 0 : player.volume));

const iconName = computed(() => {
  if (player.muted || player.volume <= 0) return 'mute';
  return player.volume < 0.5 ? 'volume-low' : 'volume';
});

function onInput(v: number): void {
  player.setVolume(v); // store unmutes when v > 0
  if (v <= 0 && !player.muted) player.toggleMute(); // dragging to 0 mutes
}

// persist the chosen volume so it survives a reload
watch(
  () => player.volume,
  (v) => {
    prefs.defaultVolume = v;
  },
);
</script>

<template>
  <div class="volume">
    <IconButton
      :name="iconName"
      :label="player.muted ? t('player.unmute') : t('player.mute')"
      size="sm"
      class="volume__btn"
      @click="player.toggleMute()"
    />
    <Slider
      class="volume__slider"
      :model-value="level"
      :min="0"
      :max="1"
      :step="0.05"
      :label="t('player.volume')"
      :format-value="(v: number) => `${Math.round(v * 100)}%`"
      @update:model-value="onInput"
    />
  </div>
</template>

<style scoped>
.volume {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.volume__slider {
  width: 84px;
}
/* The control bar sits on the dark video — keep the icon button readable. */
.volume__btn {
  color: rgba(255, 255, 255, 0.92);
}
</style>
