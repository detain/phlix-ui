<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * QualityMenu (R3.4 + R3.9) — stream-quality picker on the `Select` primitive.
 *
 * Fed the LIVE hls.js quality ladder from the host's transcode controller
 * (E1/E2 `useHlsTranscode`): `levels` is the source of truth for what is actually
 * switchable, so the menu renders `Auto` + one rung per distinct resolution
 * (highest-first). It only appears once there are ≥2 switchable rungs — a single-
 * quality stream (or the native-HLS/Safari path, where `levels` is empty and the
 * browser owns ABR) has nothing to choose, so the menu stays hidden.
 *
 * When the hls.js manifest exposes fewer distinct rungs than the server's quality
 * ladder (`variants`), the menu falls back to the server ladder so the user still
 * has a choice. A selection emits the hls.js level index (or `'auto'`) that the
 * player applies via the controller's `setLevel`; if the chosen rung is not yet
 * loaded in hls.js the selection falls back to `'auto'`.
 *
 * The `Auto` label reflects the level ABR is currently playing ("Auto (720p)"),
 * updating live as the bitrate climbs. A selection:
 *   - persists the stable rung id to `usePreferencesStore.defaultQuality` (survives
 *     a reload; the host re-pins it on the next session) and mirrors it onto
 *     `usePlayerStore.quality`, then
 *   - emits `select` with the resolved hls.js level index (or `'auto'`) for the
 *     host (Player.vue) to apply via the controller's `setLevel`.
 */
import { computed } from 'vue';
import Select from '../ui/Select.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';
import { useMessages } from '../../composables/useMessages';
import type { HlsLevel } from './hls-playback';
import type { Variant } from './transcode';
import type { SelectOption } from '../ui/listbox';
import { AUTO_QUALITY, qualityRungs, qualityLabel, qualityForLevel, levelIndexForQuality, qualityId } from './quality';

const props = withDefaults(
  defineProps<{
    /** The live hls.js quality ladder (empty on native-HLS / before manifest parse). */
    levels?: HlsLevel[];
    /** Server-provided quality ladder from the transcode start/status response.
     *  Used as fallback when hls.js levels are insufficient (e.g. manifest only
     *  has one quality but the server knows about more). */
    variants?: Variant[] | null;
    /** Pinned hls.js level index, or `-1` when ABR ("Auto") is choosing. */
    currentLevel?: number;
    /** True while ABR owns the choice — the reliable "is Auto" signal (E2). */
    autoEnabled?: boolean;
    /** Height (px) of the level ABR is currently playing, for the "Auto (720p)" label. */
    activeHeight?: number | null;
  }>(),
  { levels: () => [], variants: null, currentLevel: -1, autoEnabled: true, activeHeight: null },
);

const emit = defineEmits<{
  /** A quality choice — the hls.js level index to pin, or `'auto'` for ABR. */
  (e: 'select', level: number | 'auto'): void;
}>();

const player = usePlayerStore();
const prefs = usePreferencesStore();
const { t } = useMessages();

/** The switchable rungs from hls.js levels. */
const hlsRungs = computed(() => qualityRungs(props.levels));

/**
 * The switchable rungs from server variants (highest-first, one per distinct
 * height). Only used when hls.js levels are insufficient (< 2 distinct rungs).
 */
const variantRungs = computed<SelectOption[]>(() => {
  const seen = new Set<string>();
  const rungs: SelectOption[] = [];
  if (!props.variants) return [];
  for (const v of [...props.variants].sort((a, b) => b.height - a.height)) {
    const id = qualityId(v.height);
    if (seen.has(id)) continue;
    seen.add(id);
    rungs.push({ value: id, label: qualityLabel(v.height) });
  }
  return rungs;
});

/** Use hls.js rungs when sufficient, otherwise fall back to server variants. */
const rungs = computed(() => (hlsRungs.value.length >= 2 ? hlsRungs.value : variantRungs.value));

/** Show the menu only when there's a real choice — Auto + ≥2 switchable rungs. */
const hasQualities = computed(() => rungs.value.length >= 2);

const autoLabel = computed(() =>
  props.activeHeight != null
    ? t('player.qualityAutoActive', { label: qualityLabel(props.activeHeight) })
    : t('player.qualityAuto'),
);

const options = computed<SelectOption[]>(() => [{ value: AUTO_QUALITY, label: autoLabel.value }, ...rungs.value]);

/** The selected rung for the Select: 'auto' whenever ABR owns it, else the pinned rung. */
const selected = computed(() =>
  props.autoEnabled ? AUTO_QUALITY : qualityForLevel(props.levels, props.currentLevel),
);

function onChange(v: string | number): void {
  const id = String(v);
  player.setQuality(id);
  prefs.defaultQuality = id;
  if (id === AUTO_QUALITY) {
    emit('select', 'auto');
    return;
  }
  // Find the hls.js level index for this quality. If hls.js levels are a subset
  // of server variants (e.g. manifest has 1 level but server has 3), the index
  // will be -1 and we fall back to 'auto'.
  const index = levelIndexForQuality(props.levels, id);
  emit('select', index >= 0 ? index : 'auto');
}
</script>

<template>
  <Select
    v-if="hasQualities"
    class="quality-menu"
    tone="glass"
    :model-value="selected"
    :options="options"
    :label="t('player.quality')"
    @update:model-value="onChange"
  />
</template>

<style scoped>
.quality-menu {
  min-width: 5.5rem;
}
</style>
