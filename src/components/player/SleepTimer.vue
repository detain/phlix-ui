<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SleepTimer (R3.10) — auto-pause after a configurable interval.
 *
 * Counts down from a user-selected duration and calls `onExpire()` when it
 * elapses, which the <Player> wires to pause playback. The timer is shown in
 * the control bar as a dropdown that also displays remaining time when active.
 */
import { ref, computed, onBeforeUnmount } from 'vue';
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';

const props = defineProps<{
  /** Called when the timer expires — the Player pauses playback. */
  onExpire: () => void;
}>();

const { t } = useMessages();

/** Available timer options in seconds. 0 = off. */
const TIMER_OPTIONS = [
  { label: 'Off', value: 0 },
  { label: '5m', value: 5 * 60 },
  { label: '15m', value: 15 * 60 },
  { label: '30m', value: 30 * 60 },
  { label: '45m', value: 45 * 60 },
  { label: '60m', value: 60 * 60 },
  { label: '90m', value: 90 * 60 },
] as const;

type TimerValue = (typeof TIMER_OPTIONS)[number]['value'];

const selectedValue = ref<TimerValue>(0);
const remaining = ref(0);
const isActive = computed(() => remaining.value > 0);

let countdownTimer: ReturnType<typeof setInterval> | undefined;

function clearTimer(): void {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = undefined;
  }
}

function startTimer(seconds: number): void {
  clearTimer();
  remaining.value = seconds;
  if (seconds <= 0) return;
  countdownTimer = setInterval(() => {
    remaining.value -= 1;
    if (remaining.value <= 0) {
      clearTimer();
      remaining.value = 0;
      props.onExpire();
    }
  }, 1000);
}

function onSelect(value: TimerValue): void {
  selectedValue.value = value;
  if (value === 0) {
    clearTimer();
    remaining.value = 0;
  } else {
    startTimer(value);
  }
}

/** Format seconds as `m:ss`. */
function formatRemaining(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Toggle the sleep timer open/closed — if already open and active, cancel it. */
const open = ref(false);
function toggleOpen(): void {
  if (isActive.value) {
    onSelect(0); // cancel active timer
    open.value = false;
  } else {
    open.value = !open.value;
  }
}

function onSelectAndClose(value: TimerValue): void {
  onSelect(value);
  open.value = false;
}

onBeforeUnmount(() => {
  clearTimer();
});

defineExpose({ toggleOpen });
</script>

<template>
  <div class="sleep-timer" :class="{ 'is-active': isActive }">
    <button
      type="button"
      class="sleep-timer__trigger"
      :class="{ 'is-active': isActive }"
      :aria-label="isActive ? `Sleep timer: ${formatRemaining(remaining)} remaining` : t('player.sleepTimer')"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggleOpen"
    >
      <Icon name="moon" />
      <span v-if="isActive" class="sleep-timer__remaining numeric">{{ formatRemaining(remaining) }}</span>
    </button>

    <Transition name="dropdown">
      <ul
        v-if="open"
        class="sleep-timer__menu"
        role="listbox"
        :aria-label="t('player.sleepTimer')"
      >
        <li
          v-for="opt in TIMER_OPTIONS"
          :key="opt.value"
          class="sleep-timer__option"
          :class="{ 'is-selected': selectedValue === opt.value }"
          role="option"
          :aria-selected="selectedValue === opt.value"
          @click="onSelectAndClose(opt.value)"
        >
          {{ opt.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.sleep-timer {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.sleep-timer__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2);
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out);
}

.sleep-timer__trigger:hover,
.sleep-timer__trigger.is-active {
  color: var(--text);
}

.sleep-timer__trigger :deep(svg) {
  width: 18px;
  height: 18px;
}

.sleep-timer__remaining {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--accent);
}

.sleep-timer__menu {
  position: absolute;
  bottom: calc(100% + var(--space-2));
  right: 0;
  min-width: 100px;
  margin: 0;
  padding: var(--space-1);
  list-style: none;
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-3);
  z-index: 20;
}

.sleep-timer__option {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}

.sleep-timer__option:hover {
  background: var(--surface-2);
  color: var(--text);
}

.sleep-timer__option.is-selected {
  color: var(--accent);
  font-weight: var(--font-semibold);
}

/* dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@media (prefers-reduced-motion: reduce) {
  .sleep-timer__trigger,
  .sleep-timer__option,
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: none;
  }
}
</style>
