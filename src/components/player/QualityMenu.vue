<script setup lang="ts">
/**
 * QualityMenu (R3.4) — stream-quality / transcode picker on the `Select`
 * primitive. Sourced from server-supplied `qualities` hints — **renders nothing
 * when none are provided** (direct-play with no variants). The selection drives
 * `usePlayerStore.quality` and is persisted to `usePreferencesStore.defaultQuality`
 * so it survives a reload. Actual variant switching is wired by the host
 * (PlayerPage, R3.9) reacting to `player.quality`.
 */
import { computed } from 'vue';
import Select from '../ui/Select.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';
import { useMessages } from '../../composables/useMessages';
import type { SelectOptionInput } from '../ui/listbox';

const props = withDefaults(
  defineProps<{
    /** Server-supplied quality variants (e.g. ['auto','1080p','4k']). */
    qualities?: SelectOptionInput[];
  }>(),
  { qualities: () => [] },
);

const player = usePlayerStore();
const prefs = usePreferencesStore();
const { t } = useMessages();

const hasQualities = computed(() => props.qualities.length > 0);

function onChange(v: string | number): void {
  const q = String(v);
  player.setQuality(q);
  prefs.defaultQuality = q;
}
</script>

<template>
  <Select
    v-if="hasQualities"
    class="quality-menu"
    :model-value="player.quality"
    :options="qualities"
    :label="t('player.quality')"
    @update:model-value="onChange"
  />
</template>

<style scoped>
.quality-menu {
  min-width: 5.5rem;
}
</style>
