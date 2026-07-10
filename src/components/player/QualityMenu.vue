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
 * ladder (`variants`), the menu falls back to the server ladder — but ONLY the
 * variants that resolve to a live hls.js level (an unmatchable rung is hidden,
 * never rendered as a dead option). The server's `id: 'original'` variant (the
 * untouched source rendition) additionally surfaces as an "Original (1080p)"
 * option mapped to the hls.js level matching its height/bitrate. A selection
 * emits the resolved hls.js level index (or `'auto'`) that the player applies via
 * the controller's `setLevel`; a rung with no matching level is never silently
 * applied as `'auto'`.
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
import { AUTO_QUALITY, ORIGINAL_QUALITY, qualityRungs, qualityLabel, qualityForLevel, levelIndexForQuality, levelIndexForVariant, qualityId } from './quality';

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
 * height). Only used when hls.js levels are insufficient (< 2 distinct rungs),
 * and restricted to variants that CAN actually be applied — i.e. that resolve to
 * a live hls.js level. A variant with no matching level used to render as a dead
 * option whose pick silently fell back to 'auto'; now it is simply hidden, so
 * every rung the menu shows is genuinely switchable.
 */
const variantRungs = computed<SelectOption[]>(() => {
  const seen = new Set<string>();
  const rungs: SelectOption[] = [];
  if (!props.variants) return [];
  for (const v of [...props.variants].sort((a, b) => b.height - a.height)) {
    const id = qualityId(v.height);
    if (seen.has(id)) continue;
    if (levelIndexForQuality(props.levels, id) < 0) continue; // unmatchable → hide
    seen.add(id);
    rungs.push({ value: id, label: qualityLabel(v.height) });
  }
  return rungs;
});

/** Use hls.js rungs when sufficient, otherwise fall back to server variants. */
const rungs = computed(() => (hlsRungs.value.length >= 2 ? hlsRungs.value : variantRungs.value));

/** The server's untouched-source rendition (`id: 'original'`), when advertised. */
const originalVariant = computed<Variant | null>(
  () => props.variants?.find((v) => v.id === ORIGINAL_QUALITY && v.height > 0) ?? null,
);

/** The hls.js level carrying the original rendition, or `-1` (option hidden). */
const originalLevelIndex = computed(() => levelIndexForVariant(props.levels, originalVariant.value));

/** The "Original (1080p)" option — only when it maps to a real hls.js level. */
const originalOption = computed<SelectOption | null>(() =>
  originalVariant.value && originalLevelIndex.value >= 0
    ? { value: ORIGINAL_QUALITY, label: t('player.qualityOriginal', { height: originalVariant.value.height }) }
    : null,
);

/** Show the menu only when there's a real choice — Auto + ≥2 switchable rungs. */
const hasQualities = computed(() => rungs.value.length >= 2);

const autoLabel = computed(() =>
  props.activeHeight != null
    ? t('player.qualityAutoActive', { label: qualityLabel(props.activeHeight) })
    : t('player.qualityAuto'),
);

const options = computed<SelectOption[]>(() => [
  { value: AUTO_QUALITY, label: autoLabel.value },
  ...(originalOption.value ? [originalOption.value] : []),
  ...rungs.value,
]);

/** The selected rung for the Select: 'auto' whenever ABR owns it, else the pinned
 *  rung. When the pinned level IS the original rendition AND the user's choice was
 *  'original' (store/prefs — the store seeds from `prefs.defaultQuality`), show
 *  'original' rather than the ambiguous resolution rung that maps to the same level. */
const selected = computed(() => {
  if (props.autoEnabled) return AUTO_QUALITY;
  if (
    originalOption.value &&
    props.currentLevel === originalLevelIndex.value &&
    (player.quality === ORIGINAL_QUALITY || prefs.defaultQuality === ORIGINAL_QUALITY)
  ) {
    return ORIGINAL_QUALITY;
  }
  return qualityForLevel(props.levels, props.currentLevel);
});

function onChange(v: string | number): void {
  const id = String(v);
  if (id === AUTO_QUALITY) {
    player.setQuality(id);
    prefs.defaultQuality = id;
    emit('select', 'auto');
    return;
  }
  // Resolve the hls.js level FIRST. A rung that doesn't map to a live level is
  // never applied as a silent 'auto' downgrade — the pick is simply ignored (the
  // option lists above already hide unmatchable rungs, so this is a stale-race
  // guard, not a normal path).
  const index = id === ORIGINAL_QUALITY ? originalLevelIndex.value : levelIndexForQuality(props.levels, id);
  if (index < 0) return;
  player.setQuality(id);
  prefs.defaultQuality = id;
  emit('select', index);
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
