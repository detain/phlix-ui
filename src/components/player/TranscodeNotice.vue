<script setup lang="ts">
/**
 * TranscodeNotice (R3.8) — the direct-play guard's visible fallback.
 *
 * Shown by <Player> when the current file can't be played in the browser
 * (a non-web container like MKV by extension, or a fatal <video> decode/format
 * error such as HEVC). It's an OPAQUE overlay so the user sees a clear
 * explanation instead of a silent black frame. Server-side transcoding is not
 * wired yet (per project memory), so the only action offered is to go back.
 */
import Icon from '../Icon.vue';

defineProps<{
  /** Title of the media that can't be played (for a more specific message). */
  title?: string;
}>();

const emit = defineEmits<{ (e: 'back'): void }>();
</script>

<template>
  <div class="transcode" role="alert">
    <div class="transcode__card">
      <Icon name="alert" class="transcode__icon" />
      <h3 class="transcode__heading">Can&rsquo;t play this file here</h3>
      <p class="transcode__body">
        <template v-if="title">&ldquo;{{ title }}&rdquo; is</template><template v-else>This title is</template>
        in a format your browser can&rsquo;t play directly (for example MKV or HEVC). Transcoding isn&rsquo;t
        available yet.
      </p>
      <button type="button" class="transcode__back" @click="emit('back')">
        <Icon name="arrow-left" />
        <span>Go back</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.transcode {
  position: absolute;
  z-index: 8;
  inset: 0;
  display: grid;
  place-items: center;
  padding: var(--space-6);
  /* opaque enough to hide the black/errored video frame behind it */
  background: radial-gradient(circle at 50% 40%, rgba(20, 14, 6, 0.92), rgba(0, 0, 0, 0.97));
}
.transcode__card {
  max-width: 28rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}
.transcode__icon {
  width: 48px;
  height: 48px;
  color: var(--amber-300, var(--accent));
}
.transcode__heading {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  color: #fff;
}
.transcode__body {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed, 1.6);
  color: rgba(255, 255, 255, 0.72);
}
.transcode__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  transition: background var(--dur-fast) var(--ease-out);
}
.transcode__back :deep(svg) {
  width: 16px;
  height: 16px;
}
.transcode__back:hover {
  background: rgba(255, 255, 255, 0.2);
}
.transcode__back:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

@media (prefers-reduced-motion: reduce) {
  .transcode__back {
    transition: none;
  }
}
</style>
