<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * TranscodePreparing — overlay shown while the server warms up an on-demand HLS
 * transcode for a file that can't be direct-played.
 *
 * Replaces the old dead-end notice for the common case: instead of "can't play,
 * go back", the player now starts a transcode and shows this spinner + progress
 * until the HLS stream is ready, then reveals the normal chrome. The notice
 * ({@link ./TranscodeNotice.vue}) is reserved for an actual transcode failure.
 */
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';

const props = defineProps<{
  /** Title of the media being prepared (for a more specific message). */
  title?: string;
  /** Best-effort 0–100 progress; the bar is indeterminate-looking near 0. */
  progress?: number;
}>();

defineEmits<{ (e: 'back'): void }>();

const { t } = useMessages();

const pct = (): number => Math.max(0, Math.min(100, Math.round(props.progress ?? 0)));
</script>

<template>
  <div class="prep" role="status" aria-live="polite">
    <div class="prep__card">
      <Icon name="spinner" class="prep__spinner" />
      <h3 class="prep__heading">{{ t('player.transcodePreparingHeading') }}</h3>
      <p class="prep__body">
        {{ title ? t('player.transcodePreparingTitled', { title }) : t('player.transcodePreparingUntitled') }}
      </p>
      <div
        class="prep__bar"
        role="progressbar"
        :aria-valuenow="pct()"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="prep__bar-fill" :style="{ width: pct() + '%' }" />
      </div>
      <button type="button" class="prep__back" @click="$emit('back')">
        <Icon name="arrow-left" />
        <span>{{ t('player.goBack') }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.prep {
  position: absolute;
  z-index: 8;
  inset: 0;
  display: grid;
  place-items: center;
  padding: var(--space-6);
  background: radial-gradient(circle at 50% 40%, rgba(6, 12, 20, 0.92), rgba(0, 0, 0, 0.97));
}
.prep__card {
  max-width: 28rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}
.prep__spinner {
  width: 44px;
  height: 44px;
  color: var(--accent);
  animation: prep-spin 1s linear infinite;
}
.prep__heading {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  color: #fff;
}
.prep__body {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed, 1.6);
  color: rgba(255, 255, 255, 0.72);
}
.prep__bar {
  width: 14rem;
  max-width: 70vw;
  height: 4px;
  border-radius: var(--radius-full, 999px);
  background: rgba(255, 255, 255, 0.16);
  overflow: hidden;
}
.prep__bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: inherit;
  transition: width var(--dur-normal, 0.3s) var(--ease-out);
  min-width: 8%;
}
.prep__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  transition: background var(--dur-fast) var(--ease-out);
}
.prep__back :deep(svg) {
  width: 16px;
  height: 16px;
}
.prep__back:hover {
  background: rgba(255, 255, 255, 0.2);
}
.prep__back:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

@keyframes prep-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .prep__spinner {
    animation: none;
  }
  .prep__bar-fill,
  .prep__back {
    transition: none;
  }
}
</style>
