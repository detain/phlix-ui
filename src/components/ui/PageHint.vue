<script setup lang="ts">
/**
 * PageHint — a subtle, reusable help / callout panel for the top of a page
 * (item 6). Generalises the old inline `.admin-libraries__hint` paragraph into a
 * drop-in component so every admin page can carry a short, plain-English
 * description of what the page does and what its key controls mean.
 *
 * Body goes in the default slot (so callers can highlight control names with
 * `<strong>`). An optional `title` renders a small heading above the body, and
 * `tone` picks the accent colour ('info' — muted blue; 'accent' — brand amber).
 *
 * Accessibility: the whole panel is `role="note"`; the leading info icon is
 * decorative (`aria-hidden`, inherited from `<Icon>` with no `label`).
 */
import Icon from '../Icon.vue';

withDefaults(
  defineProps<{
    /** Optional small heading rendered above the body text. */
    title?: string;
    /** Accent colour of the left border + icon. */
    tone?: 'info' | 'accent';
  }>(),
  { title: undefined, tone: 'info' },
);
</script>

<template>
  <aside class="phlix-page-hint" :class="`phlix-page-hint--${tone}`" role="note">
    <span class="phlix-page-hint__icon"><Icon name="info" /></span>
    <div class="phlix-page-hint__body">
      <p v-if="title" class="phlix-page-hint__title">{{ title }}</p>
      <p class="phlix-page-hint__text"><slot /></p>
    </div>
  </aside>
</template>

<style scoped>
.phlix-page-hint {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--accent);
  background: var(--surface-2);
  color: var(--text-subtle);
  font-size: var(--text-sm);
  line-height: 1.55;
}
.phlix-page-hint--info {
  border-left-color: var(--info);
  background: var(--info-bg);
}
.phlix-page-hint--accent {
  border-left-color: var(--accent);
  background: var(--accent-soft);
}
.phlix-page-hint__icon {
  flex-shrink: 0;
  margin-top: 0.1em;
  font-size: 1.15em;
}
.phlix-page-hint--info .phlix-page-hint__icon { color: var(--info); }
.phlix-page-hint--accent .phlix-page-hint__icon { color: var(--accent); }
.phlix-page-hint__body { min-width: 0; }
.phlix-page-hint__title {
  margin: 0 0 var(--space-1);
  font-weight: var(--font-semibold);
  color: var(--text);
}
.phlix-page-hint__text { margin: 0; }
.phlix-page-hint__text :deep(strong) {
  font-weight: var(--font-semibold);
  color: var(--text);
}
</style>
