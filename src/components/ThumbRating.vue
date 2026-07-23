<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * ThumbRating — the thumbs up/down "rating" affordance (replaces LoveButton).
 *
 * A single integer `level` on the range −2..+2 captures both the direction and
 * the magnitude of the viewer's opinion:
 *
 *   · −2 — strongly dislike (solid blue thumbs-DOWN, slightly larger)
 *   · −1 — dislike          (solid white thumbs-DOWN)
 *   ·  0 — not set          (BOTH thumbs shown as white wireframes/outlines)
 *   · +1 — like             (solid white thumbs-UP)
 *   · +2 — love             (solid blue thumbs-UP, slightly larger)
 *
 * Interaction — each visible thumb advances its own axis and wraps through 0:
 *   · thumbs-UP:   0 → 1 → 2 → 0
 *   · thumbs-DOWN: 0 → −1 → −2 → 0
 * At level 0 BOTH thumbs are shown (so either axis can be started). Once an axis
 * is engaged only that axis's thumb is shown; clicking it keeps cycling, and
 * landing back on 0 restores both wireframes.
 *
 * This is a PURE presentational + controlled component: it owns no state. The
 * parent passes the current `level`; the component computes the NEXT level for
 * whichever thumb was clicked and emits it via `cycle` AND `update:level` (so it
 * works with both `@cycle` and `v-model:level`). Store/API wiring is the caller's
 * job — do NOT bind both events to a mutating handler or you double-write.
 *
 * Colour: the amber-themed token set has no blue, so the max-magnitude (±2)
 * "solid blue" state the product asks for uses a local `--thumb-blue` custom
 * property declared on the root. White/wireframe uses `var(--text)`.
 *
 * Motion: the fill/scale transition is gated TWICE — (1) the library-wide
 * `html[data-reduced-motion='true'] *` kill-switch from @phlix/tokens neutralizes
 * every transition with !important (the load-bearing guard), and (2) a
 * belt-and-suspenders `@media (prefers-reduced-motion: reduce)` block here.
 */
import { computed } from 'vue';
import Icon from './Icon.vue';
import Tooltip from './ui/Tooltip.vue';

const props = withDefaults(
  defineProps<{
    /** Current rating level, −2..+2. Out-of-range values are clamped for display. */
    level?: number;
    /** Disable interaction (e.g. while a persist is in flight). */
    disabled?: boolean;
  }>(),
  { level: 0, disabled: false },
);

const emit = defineEmits<{
  /** Fired on activation with the NEXT level for the clicked axis. */
  (e: 'cycle', next: number): void;
  /** v-model:level companion — same NEXT level. */
  (e: 'update:level', next: number): void;
}>();

/** Clamp+floor any incoming value into the −2..+2 integer range for rendering. */
const current = computed(() => {
  const n = Math.trunc(Number(props.level));
  if (!Number.isFinite(n)) return 0;
  if (n < -2) return -2;
  if (n > 2) return 2;
  return n;
});

/** Show the thumbs-UP button whenever we are not on the down axis. */
const showUp = computed(() => current.value >= 0);
/** Show the thumbs-DOWN button whenever we are not on the up axis. */
const showDown = computed(() => current.value <= 0);

/** Up axis active (filled) at +1/+2; blue + larger at +2. */
const upFilled = computed(() => current.value >= 1);
const upBlue = computed(() => current.value === 2);
/** Down axis active (filled) at −1/−2; blue + larger at −2. */
const downFilled = computed(() => current.value <= -1);
const downBlue = computed(() => current.value === -2);

function nextUp(): number {
  // 0 → 1 → 2 → 0 (from any non-positive level, start the up axis at 1).
  if (current.value <= 0) return 1;
  if (current.value === 1) return 2;
  return 0;
}

function nextDown(): number {
  // 0 → −1 → −2 → 0 (from any non-negative level, start the down axis at −1).
  if (current.value >= 0) return -1;
  if (current.value === -1) return -2;
  return 0;
}

function onUp(): void {
  if (props.disabled) return;
  const n = nextUp();
  emit('cycle', n);
  emit('update:level', n);
}

function onDown(): void {
  if (props.disabled) return;
  const n = nextDown();
  emit('cycle', n);
  emit('update:level', n);
}
</script>

<template>
  <div class="thumb-rating" :data-level="current">
    <Tooltip v-if="showUp" text="Like">
      <button
        type="button"
        class="thumb-rating__btn thumb-rating__btn--up"
        :class="{ 'is-filled': upFilled, 'is-blue': upBlue }"
        :disabled="disabled"
        aria-label="Like"
        :aria-pressed="upFilled ? 'true' : 'false'"
        @click="onUp"
      >
        <Icon name="thumbs-up" class="thumb-rating__icon" />
      </button>
    </Tooltip>

    <Tooltip v-if="showDown" text="Dislike">
      <button
        type="button"
        class="thumb-rating__btn thumb-rating__btn--down"
        :class="{ 'is-filled': downFilled, 'is-blue': downBlue }"
        :disabled="disabled"
        aria-label="Dislike"
        :aria-pressed="downFilled ? 'true' : 'false'"
        @click="onDown"
      >
        <Icon name="thumbs-down" class="thumb-rating__icon" />
      </button>
    </Tooltip>
  </div>
</template>

<style scoped>
.thumb-rating {
  /* No blue token exists in the amber-themed set; the product wants a clear
     "solid blue" for the max-magnitude (±2) state, so define it locally here. */
  --thumb-blue: #3b82f6;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.thumb-rating__btn {
  /* Bigger than the old 40px love button so the wireframe thumbs read clearly. */
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  /* Wireframe-on-transparent: the resting glyph uses the theme foreground token so
     it inverts correctly per theme (light glyph on Nocturne/Midnight, dark on
     Daylight) instead of a hardcoded near-white. */
  color: var(--text);
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition:
    transform var(--dur-fast) var(--ease-spring),
    color var(--dur-base) var(--ease-out);
}
.thumb-rating__btn:disabled {
  cursor: default;
  opacity: 0.55;
}
.thumb-rating__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

/* The glyph scales per state; wireframe at rest, filled once the axis engages. */
.thumb-rating__icon {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  transition: transform var(--dur-base) var(--ease-spring);
}

/* level ±1 — solid white (filled glyph). */
.thumb-rating__btn.is-filled {
  color: var(--text);
}
.thumb-rating__btn.is-filled :deep(svg) {
  fill: currentColor;
}

/* level ±2 — solid blue + slightly larger. */
.thumb-rating__btn.is-blue {
  color: var(--thumb-blue);
}
.thumb-rating__btn.is-blue .thumb-rating__icon {
  transform: scale(1.15);
}

/* Belt-and-suspenders: the global html[data-reduced-motion='true'] * kill-switch
   from @phlix/tokens already neutralizes transitions with !important; this block
   covers a bare OS preference even before that attribute is applied. */
@media (prefers-reduced-motion: reduce) {
  .thumb-rating__btn,
  .thumb-rating__icon {
    transition: none;
  }
}
</style>
