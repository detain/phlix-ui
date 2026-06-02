<script setup lang="ts">
/**
 * PageTransition (R0.5) — route-level crossfade / slide. Wrap the routed
 * component:
 *
 *   <router-view v-slot="{ Component }">
 *     <PageTransition><component :is="Component" /></PageTransition>
 *   </router-view>
 *
 * mode: fade (default) | slide. `out-in` so the leaving view finishes first.
 * Fully disabled under prefers-reduced-motion.
 *
 * Contract: exactly ONE child (Vue <Transition> requirement) — the routed
 * component must have a single root, or Vue warns and the transition breaks.
 */
withDefaults(defineProps<{ mode?: 'fade' | 'slide' }>(), { mode: 'fade' });
</script>

<template>
  <Transition :name="`phlix-page-${mode}`" mode="out-in">
    <slot />
  </Transition>
</template>

<style scoped>
.phlix-page-fade-enter-active,
.phlix-page-fade-leave-active {
  transition: opacity var(--dur-base) var(--ease-out);
}
.phlix-page-fade-enter-from,
.phlix-page-fade-leave-to {
  opacity: 0;
}

.phlix-page-slide-enter-active,
.phlix-page-slide-leave-active {
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-slow) var(--ease-out);
}
.phlix-page-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.phlix-page-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .phlix-page-fade-enter-active,
  .phlix-page-fade-leave-active,
  .phlix-page-slide-enter-active,
  .phlix-page-slide-leave-active {
    transition: none;
  }
  .phlix-page-slide-enter-from,
  .phlix-page-slide-leave-to {
    transform: none;
  }
}
</style>
