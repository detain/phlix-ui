<script setup lang="ts">
/**
 * LoveButton (Feature 10) — the 4-state "Love" affordance.
 *
 * One outline `heart` icon drives all four states purely with CSS (the icon set
 * ships only a wireframe heart). Clicking cycles 0 → 1 → 2 → 3 → 0:
 *
 *   · level 0 — outline / wireframe heart (no fill), the "not loved" baseline
 *   · level 1 — filled heart, scale ~0.9  ("liked")
 *   · level 2 — filled heart, scale ~1.05 ("really like")
 *   · level 3 — filled heart, scale ~1.2  ("love")
 *
 * This is a PURE presentational + controlled component: it owns no state. The
 * parent passes the current `level` and reacts to `cycle` / `update:level`
 * (so it works with both `@cycle` and `v-model:level`). Store/API wiring is the
 * caller's job (Step 10.6).
 *
 * Motion: the fill/scale transition is gated TWICE — (1) the library-wide
 * `html[data-reduced-motion='true'] *` kill-switch from @phlix/tokens neutralizes
 * every transition with !important (the load-bearing guard), and (2) a
 * belt-and-suspenders `@media (prefers-reduced-motion: reduce)` block here. We do
 * NOT invent a new mechanism — we lean on the same convention as the rest of the
 * library (AppBackdrop, the primitives).
 */
import { computed } from 'vue';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    /** Current love level, 0–3. Out-of-range values are clamped for display. */
    level?: number;
    /** Disable interaction (e.g. while a persist is in flight). */
    disabled?: boolean;
  }>(),
  { level: 0, disabled: false },
);

const emit = defineEmits<{
  /** Fired on activation with the NEXT level (0→1→2→3→0). */
  (e: 'cycle', next: number): void;
  /** v-model:level companion — same NEXT level. */
  (e: 'update:level', next: number): void;
}>();

/** Clamp+floor any incoming value into the 0–3 integer range for rendering. */
const current = computed(() => {
  const n = Math.floor(Number(props.level));
  if (!Number.isFinite(n) || n < 0) return 0;
  if (n > 3) return 3;
  return n;
});

const loved = computed(() => current.value > 0);

const ariaLabel = computed(() => {
  switch (current.value) {
    case 1:
      return 'Liked — click to like more';
    case 2:
      return 'Really like — click to love';
    case 3:
      return 'Loved — click to clear';
    default:
      return 'Not loved — click to like';
  }
});

function onActivate(): void {
  if (props.disabled) return;
  const n = (current.value + 1) % 4;
  emit('cycle', n);
  emit('update:level', n);
}
</script>

<template>
  <button
    type="button"
    class="love-button"
    :class="[`love-button--level-${current}`, { 'is-loved': loved }]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-pressed="loved ? 'true' : 'false'"
    :data-level="current"
    @click="onActivate"
  >
    <Icon name="heart" class="love-button__icon" />
  </button>
</template>

<style scoped>
.love-button {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  color: var(--text);
  background: var(--surface-glass-strong);
  border: 1px solid var(--border-strong);
  font-size: 1.1rem;
  cursor: pointer;
  /* Match the card iconbtn idiom: spring on transform, ease on background/color. */
  transition:
    transform var(--dur-fast) var(--ease-spring),
    background var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out);
}
.love-button:disabled {
  cursor: default;
  opacity: 0.55;
}
.love-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

/* The heart icon itself scales per level; the SVG fills once loved. */
.love-button__icon {
  transition: transform var(--dur-base) var(--ease-spring);
}

/* Loved states: amber tint + filled glyph. */
.love-button.is-loved {
  color: var(--accent);
  border-color: var(--accent);
}
.love-button.is-loved :deep(svg) {
  fill: currentColor;
}

/* Per-level scale (level 0 = outline at rest, no scale). */
.love-button--level-1 .love-button__icon {
  transform: scale(0.9);
}
.love-button--level-2 .love-button__icon {
  transform: scale(1.05);
}
.love-button--level-3 .love-button__icon {
  transform: scale(1.2);
}

/* Belt-and-suspenders: the global html[data-reduced-motion='true'] * kill-switch
   from @phlix/tokens already neutralizes transitions with !important; this block
   covers a bare OS preference even before that attribute is applied. */
@media (prefers-reduced-motion: reduce) {
  .love-button,
  .love-button__icon {
    transition: none;
  }
}
</style>
