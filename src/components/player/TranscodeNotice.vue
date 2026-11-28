<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * TranscodeNotice (R3.8) — the direct-play guard's visible fallback.
 *
 * Shown by <Player> when playback could not be STARTED: the file needed an
 * on-demand transcode (non-web container by extension, or a fatal <video>
 * decode/format error) and that transcode request itself failed. It's an OPAQUE
 * overlay so the user sees a clear explanation instead of a silent black frame;
 * the actions offered are to retry the transcode or go back (phlix-ui-player-013:
 * a failure notice with no retry trapped viewers at a dead end even when the
 * job was transiently broken and perfectly retryable).
 *
 * ⚠ The copy deliberately does NOT blame the file or its format. The transcode
 * request also fails when the SERVER refused it for a reason unrelated to the
 * media — a parental-control block answering 404, for instance — so a heading
 * like "Can't play this file here" actively misled the viewer.
 */
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';

defineProps<{
  /** Title of the media that can't be played (for a more specific message). */
  title?: string;
}>();

const emit = defineEmits<{ (e: 'back'): void; (e: 'retry'): void }>();

const { t } = useMessages();
</script>

<template>
  <div class="transcode" role="alert">
    <div class="transcode__card">
      <Icon name="alert" class="transcode__icon" />
      <h3 class="transcode__heading">{{ t('player.transcodeHeading') }}</h3>
      <p class="transcode__body">
        {{ title ? t('player.transcodeBodyTitled', { title }) : t('player.transcodeBodyUntitled') }}
      </p>
      <div class="transcode__actions">
        <button type="button" class="transcode__retry" @click="emit('retry')">
          <Icon name="refresh" />
          <span>{{ t('common.retry') }}</span>
        </button>
        <button type="button" class="transcode__back" @click="emit('back')">
          <Icon name="arrow-left" />
          <span>{{ t('player.goBack') }}</span>
        </button>
      </div>
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
.transcode__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
/* phlix-ui-player-013: Retry joined the card, so the two actions share one
   button skin — the grouped selector keeps the original Go back pins valid. */
.transcode__back,
.transcode__retry {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  transition: background var(--dur-fast) var(--ease-out);
}
.transcode__back :deep(svg),
.transcode__retry :deep(svg) {
  width: 16px;
  height: 16px;
}
.transcode__back:hover,
.transcode__retry:hover {
  background: rgba(255, 255, 255, 0.2);
}
.transcode__back:focus-visible,
.transcode__retry:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

@media (prefers-reduced-motion: reduce) {
  .transcode__back,
  .transcode__retry {
    transition: none;
  }
}
</style>
