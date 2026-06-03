<script setup lang="ts">
/**
 * ResumePrompt (R3.8) — the "resume where you left off" prompt shown on open.
 *
 * A small non-modal glass bar the <Player> renders when the persisted resume map
 * has an in-band position for the current media. It only presents the choice;
 * the parent owns the seek/clear (Resume → seek + play, Start over → seek 0 +
 * clearResume + play) and dismisses the prompt once playback begins.
 */
import { computed } from 'vue';
import Icon from '../Icon.vue';
import { formatTime } from './format-time';
import { useMessages } from '../../composables/useMessages';

defineProps<{
  /** Stored resume position, in seconds. */
  seconds: number;
}>();

const emit = defineEmits<{ (e: 'resume'): void; (e: 'restart'): void }>();

const { t } = useMessages();
// Split the "Resume from {time}?" template on its `{time}` placeholder so the
// timecode keeps its own styled <span>. Order-flexible: a translation may place
// `{time}` anywhere and the parts render around the span accordingly.
const resumeLabelParts = computed(() => t('player.resumeFrom').split('{time}'));
</script>

<template>
  <div class="resume" role="region" :aria-label="t('player.resumePlayback')">
    <p class="resume__label">
      {{ resumeLabelParts[0] }}<span class="resume__time numeric">{{ formatTime(seconds) }}</span>{{ resumeLabelParts[1] }}
    </p>
    <div class="resume__actions">
      <button type="button" class="resume__btn resume__btn--amber" @click="emit('resume')">
        <Icon name="play" />
        <span>{{ t('player.resume') }}</span>
      </button>
      <button type="button" class="resume__btn resume__btn--ghost" @click="emit('restart')">
        <Icon name="rewind" />
        <span>{{ t('player.startOver') }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.resume {
  position: absolute;
  z-index: 6;
  left: 50%;
  bottom: 96px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-glass-strong, rgba(20, 20, 20, 0.72));
  border: 1px solid var(--border-strong, rgba(255, 255, 255, 0.12));
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-3);
  max-width: calc(100% - 2 * var(--space-6));
}
.resume__label {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.92);
}
.resume__time {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--amber-300, var(--accent));
}
.resume__actions {
  display: flex;
  gap: var(--space-2);
  flex: none;
}
.resume__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: filter var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.resume__btn :deep(svg) {
  width: 14px;
  height: 14px;
}
.resume__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.resume__btn--amber {
  background: var(--accent);
  color: var(--accent-contrast, #1a1206);
  box-shadow: var(--glow-amber, none);
}
/* keep the amber glow AND show the focus ring (compose both; the bare
   .resume__btn:focus-visible would otherwise replace the glow on focus) */
.resume__btn--amber:focus-visible {
  outline: none;
  box-shadow: var(--glow-amber, none), 0 0 0 3px var(--accent-ring);
}
.resume__btn--amber:hover {
  filter: brightness(1.08);
}
.resume__btn--ghost {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.resume__btn--ghost:hover {
  background: rgba(255, 255, 255, 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .resume__btn {
    transition: none;
  }
}
</style>
