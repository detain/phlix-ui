<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SkipButton (R3.10) — the "Skip intro" / "Skip outro" overlay affordance.
 *
 * Shown when the playhead is inside a server-supplied intro/outro marker
 * (`GET /api/v1/media/:id/playback-info`). Clicking seeks to the END of the active
 * marker: skipping the intro jumps into the show; skipping the outro/credits jumps
 * to the end, which lets the up-next card advance. Purely position-driven and
 * stateless — it emits the absolute target time and the <Player> owns the seek.
 *
 * It deliberately renders OUTSIDE the auto-hiding control chrome so it stays
 * visible while the chrome fades (the convention users expect from "Skip Intro").
 */
import { computed } from 'vue';
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';
import type { TimeMarker } from './playback';

const props = defineProps<{
  /** Current playback position, in seconds. */
  position: number;
  /** Intro range — shows "Skip intro" while the playhead is inside it. */
  introMarker?: TimeMarker | null;
  /** Outro range — shows "Skip outro" while the playhead is inside it. */
  outroMarker?: TimeMarker | null;
}>();

const emit = defineEmits<{
  /** Seek to this absolute time (seconds) — the end of the active marker. */
  (e: 'skip', targetSeconds: number): void;
}>();

const { t } = useMessages();

/** Is `pos` inside `[m.start, m.end)` for a real (non-empty) marker? */
function inMarker(pos: number, m: TimeMarker | null | undefined): boolean {
  return !!m && m.end > m.start && pos >= m.start && pos < m.end;
}

/** The marker covering the current position (intro wins if both somehow overlap),
 *  resolved to a label + the seek target (its end). Null hides the button. */
const active = computed<{ label: string; target: number } | null>(() => {
  if (inMarker(props.position, props.introMarker)) {
    return { label: t('player.skipIntro'), target: props.introMarker!.end };
  }
  if (inMarker(props.position, props.outroMarker)) {
    return { label: t('player.skipOutro'), target: props.outroMarker!.end };
  }
  return null;
});

function onSkip(): void {
  if (active.value) emit('skip', active.value.target);
}
</script>

<template>
  <Transition name="skip">
    <button v-if="active" type="button" class="skip" @click.stop="onSkip">
      <span>{{ active.label }}</span>
      <Icon name="skip-forward" />
    </button>
  </Transition>
</template>

<style scoped>
.skip {
  position: absolute;
  z-index: 6;
  right: var(--space-6);
  bottom: 96px; /* clears the control bar (mirrors ResumePrompt's offset) */
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--accent-contrast, #1a1206);
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-3);
  cursor: pointer;
  transition: filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.skip :deep(svg) {
  width: 16px;
  height: 16px;
}
.skip:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}
.skip:focus-visible {
  outline: none;
  box-shadow: var(--shadow-3), 0 0 0 3px var(--accent-ring);
}

/* enter/leave — slide up + fade (the locked motion language) */
.skip-enter-active,
.skip-leave-active {
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}
.skip-enter-from,
.skip-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
  .skip,
  .skip-enter-active,
  .skip-leave-active {
    transition: none;
  }
}
</style>
