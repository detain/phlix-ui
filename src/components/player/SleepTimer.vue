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
 *
 * S-ui-player-21 (phlix-ui-player-026): the `role="listbox"` is now fully
 * keyboard-operable — opening (trigger ArrowDown/ArrowUp, click, or the Player's
 * exposed `toggleOpen()`) moves a roving focus onto the options (single tab
 * stop, WAI-ARIA listbox pattern); ArrowUp/Down walk with wrap-around, Home/End
 * jump to the edges, Enter/Space select and close, Escape closes and restores
 * focus to the trigger, Tab closes without stealing focus, and a pointer-down
 * outside the root dismisses the menu (the same click-outside idiom
 * UserMenu/CaptionsMenu use). Option labels resolve through the catalog
 * (`player.off` + `media.runtimeMinutes` — reused, not shadow-minted) and the
 * active trigger name uses the `player.sleepTimerRemaining` template instead of
 * an English concatenation.
 */
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';

const props = defineProps<{
  /** Called when the timer expires — the Player pauses playback. */
  onExpire: () => void;
}>();

const { t } = useMessages();

/** Minutes offered besides Off; labels interpolate `media.runtimeMinutes`. */
const SLEEP_MINUTES = [5, 15, 30, 45, 60, 90] as const;

/** Available timer options in seconds. 0 = off. Labels are localized. */
const options = computed<{ value: number; label: string }[]>(() => [
  { value: 0, label: t('player.off') },
  ...SLEEP_MINUTES.map((m) => ({ value: m * 60, label: t('media.runtimeMinutes', { minutes: m }) })),
]);

const selectedValue = ref(0);
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

function onSelect(value: number): void {
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

/**
 * Toggle the sleep timer open/closed — if already open and active, cancel it.
 * This is the exposed Player-shortcut contract (`toggleOpen`); it must not
 * change without updating `Player.vue`'s sleep-timer key handler.
 */
const open = ref(false);
const rootEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLButtonElement | null>(null);
const menuEl = ref<HTMLElement | null>(null);
/** Index holding the listbox's single tab stop (roving focus). */
const activeIndex = ref(0);

function toggleOpen(): void {
  if (isActive.value) {
    onSelect(0); // cancel active timer
    open.value = false;
  } else {
    open.value = !open.value;
  }
}

/** Current option elements in DOM order (rendered only while open). */
function optionEls(): HTMLElement[] {
  return Array.from(menuEl.value?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
}

function focusItemAt(items: HTMLElement[], index: number): void {
  if (items.length === 0) return;
  const wrapped = ((index % items.length) + items.length) % items.length;
  items[wrapped]?.focus();
}

function openMenu(): void {
  // Land the roving stop on the selected option so opening is orientation-first.
  const selected = options.value.findIndex((o) => o.value === selectedValue.value);
  activeIndex.value = selected >= 0 ? selected : 0;
  open.value = true;
}

function closeMenu(restoreFocusToTrigger: boolean): void {
  open.value = false;
  if (restoreFocusToTrigger) {
    void nextTick(() => triggerEl.value?.focus());
  }
}

function pick(value: number, restoreFocusToTrigger = true): void {
  onSelect(value);
  open.value = false;
  if (restoreFocusToTrigger) {
    void nextTick(() => triggerEl.value?.focus());
  }
}

/** Keyboard on the listbox container (events bubble from the focused option). */
function onMenuKeydown(e: KeyboardEvent): void {
  const items = optionEls();
  if (items.length === 0) return;
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      focusItemAt(items, activeIndex.value + 1);
      break;
    case 'ArrowUp':
      e.preventDefault();
      focusItemAt(items, activeIndex.value - 1);
      break;
    case 'Home':
      e.preventDefault();
      focusItemAt(items, 0);
      break;
    case 'End':
      e.preventDefault();
      focusItemAt(items, items.length - 1);
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      pick(options.value[activeIndex.value]?.value ?? 0);
      break;
    case 'Escape':
      // Own the Escape: close + restore focus, and do not let the Player's
      // global keydown handler react to the same press.
      e.preventDefault();
      e.stopPropagation();
      closeMenu(true);
      break;
    case 'Tab':
      // Let Tab leave the menu naturally — close without moving focus.
      closeMenu(false);
      break;
  }
}

/** Roving focus: the focused option becomes the single tab stop. */
function onFocusOption(index: number): void {
  activeIndex.value = index;
}

/** Click-outside (capture, like UserMenu/CaptionsMenu): dismiss silently. */
function onDocPointer(e: Event): void {
  if (rootEl.value && e.target instanceof Node && !rootEl.value.contains(e.target)) {
    closeMenu(false);
  }
}

watch(open, (isOpen) => {
  if (typeof document === 'undefined') return;
  if (isOpen) {
    document.addEventListener('pointerdown', onDocPointer, true);
    void nextTick(() => focusItemAt(optionEls(), activeIndex.value));
  } else {
    document.removeEventListener('pointerdown', onDocPointer, true);
  }
});

onBeforeUnmount(() => {
  clearTimer();
  if (typeof document !== 'undefined') {
    document.removeEventListener('pointerdown', onDocPointer, true);
  }
});

defineExpose({ toggleOpen });
</script>

<template>
  <div ref="rootEl" class="sleep-timer" :class="{ 'is-active': isActive }">
    <button
      ref="triggerEl"
      type="button"
      class="sleep-timer__trigger"
      :class="{ 'is-active': isActive }"
      :aria-label="isActive ? t('player.sleepTimerRemaining', { time: formatRemaining(remaining) }) : t('player.sleepTimer')"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="open ? 'sleep-timer-menu' : undefined"
      @click="toggleOpen"
      @keydown.down.prevent="openMenu"
      @keydown.up.prevent="openMenu"
    >
      <Icon name="moon" />
      <span v-if="isActive" class="sleep-timer__remaining numeric">{{ formatRemaining(remaining) }}</span>
    </button>

    <Transition name="dropdown">
      <ul
        v-if="open"
        ref="menuEl"
        id="sleep-timer-menu"
        class="sleep-timer__menu"
        role="listbox"
        :aria-label="t('player.sleepTimer')"
        @keydown="onMenuKeydown"
      >
        <li
          v-for="(opt, i) in options"
          :key="opt.value"
          class="sleep-timer__option"
          :class="{ 'is-selected': selectedValue === opt.value }"
          role="option"
          :aria-selected="selectedValue === opt.value"
          :tabindex="activeIndex === i ? 0 : -1"
          @focus="onFocusOption(i)"
          @click="pick(opt.value)"
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
  outline: none;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}

.sleep-timer__option:hover {
  background: var(--surface-2);
  color: var(--text);
}

.sleep-timer__option:focus-visible {
  background: var(--surface-2);
  color: var(--text);
  box-shadow: 0 0 0 2px var(--accent-ring);
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
