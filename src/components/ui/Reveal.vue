<script setup lang="ts">
/**
 * Reveal (R0.5) — entrance animation (fade + rise). Reveals on mount, or on
 * scroll-into-view with `whenVisible`. Stagger a list by mapping increasing
 * `delay`s (`<Reveal v-for=… :delay="i * 60">`). Fully disabled under
 * prefers-reduced-motion (content shows instantly, no transform).
 */
import { onMounted, onBeforeUnmount, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    tag?: string;
    /** delay in ms before the reveal transition starts (use for staggering). */
    delay?: number;
    /** initial vertical offset in px. */
    y?: number;
    /** reveal only once it scrolls into view. */
    whenVisible?: boolean;
  }>(),
  { tag: 'div', delay: 0, y: 12, whenVisible: false },
);

const el = ref<HTMLElement | null>(null);
const revealed = ref(false);
const settled = ref(false); // drop will-change once the entrance finishes
let io: IntersectionObserver | null = null;

const prefersReduced =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

onMounted(() => {
  if (prefersReduced) {
    revealed.value = true;
    return;
  }
  if (props.whenVisible && typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          revealed.value = true;
          io?.disconnect();
          io = null;
        }
      },
      { threshold: 0.1 },
    );
    if (el.value) io.observe(el.value);
  } else {
    // next frame so the hidden → shown transition actually plays
    requestAnimationFrame(() => requestAnimationFrame(() => (revealed.value = true)));
  }
});

onBeforeUnmount(() => {
  io?.disconnect();
  io = null;
});
</script>

<template>
  <component
    :is="tag"
    ref="el"
    class="phlix-reveal"
    :class="{ 'is-revealed': revealed, 'is-settled': settled }"
    :style="{ '--reveal-delay': `${delay}ms`, '--reveal-y': `${y}px` }"
    @transitionend="settled = true"
  >
    <slot />
  </component>
</template>

<style scoped>
.phlix-reveal {
  opacity: 0;
  transform: translateY(var(--reveal-y, 12px));
  transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}
.phlix-reveal.is-revealed {
  opacity: 1;
  transform: none;
}
.phlix-reveal.is-settled {
  will-change: auto;
}
@media (prefers-reduced-motion: reduce) {
  .phlix-reveal {
    opacity: 1;
    transform: none;
    transition: none;
    will-change: auto;
  }
}
</style>
