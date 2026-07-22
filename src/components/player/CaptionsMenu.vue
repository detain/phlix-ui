<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * CaptionsMenu (R3.5) — the control-bar CC button + its popover.
 *
 * The button (icon reflects on/off) opens a focus-trapped popover with: a
 * subtitle-track radio list (Off + each track — selection drives
 * `usePlayerStore.subtitleLang` and persists `usePreferencesStore.defaultSubtitleLang`),
 * an audio-track radio list (only when the browser exposes >1 audio track —
 * emitted up to the Player), and the four caption-style `Select`s
 * (size/color/background/edge → `usePreferencesStore.captionStyle`).
 *
 * Esc / click-outside close it and return focus to the button. The Player
 * suppresses the global key map while it is open so the inner `Select` arrow/Esc
 * keys don't double-fire transport shortcuts. The `c` key is the quick on/off.
 */
import { computed, ref, toRef, onBeforeUnmount, watch } from 'vue';
import Icon from '../Icon.vue';
import IconButton from '../ui/IconButton.vue';
import Select from '../ui/Select.vue';
import { useFocusTrap } from '../ui/useFocusTrap';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';
import { useMessages } from '../../composables/useMessages';
import type { CaptionSize, CaptionBackground, CaptionEdge } from '../../stores/usePreferencesStore';
import {
  type TextTrackInfo,
  CAPTION_SIZE_OPTIONS,
  CAPTION_COLOR_OPTIONS,
  CAPTION_BACKGROUND_OPTIONS,
  CAPTION_EDGE_OPTIONS,
} from './captions';

const props = withDefaults(
  defineProps<{
    /** Subtitle/caption tracks enumerated from the `<video>` (Player owns it). */
    tracks?: TextTrackInfo[];
    /** Audio tracks (only rendered when more than one is present). */
    audioTracks?: TextTrackInfo[];
    /** Index of the active audio track (-1 = none/unknown). */
    activeAudio?: number;
    /** Popover open state (v-model:open). */
    open?: boolean;
  }>(),
  { tracks: () => [], audioTracks: () => [], activeAudio: -1, open: false },
);

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void;
  (e: 'select-audio', index: number): void;
  /** "Add subtitles…" pressed — the Player opens the on-demand search (Wave 3 F3). */
  (e: 'add-subtitles'): void;
}>();

const player = usePlayerStore();
const prefs = usePreferencesStore();
// Aliased to avoid colliding with the `t` track loop variables in the template.
const { t: translate } = useMessages();

const rootEl = ref<HTMLElement | null>(null);
const panelEl = ref<HTMLElement | null>(null);

const activeLang = computed(() => player.subtitleLang);
/** Captions are "on" only when the selected language resolves to a real track. */
const captionsOn = computed(() => props.tracks.some((t) => t.language === activeLang.value));
const iconName = computed(() => (captionsOn.value ? 'captions' : 'captions-off'));

// Roving-tabindex anchors: the checked radio is the group's single Tab stop
// (the subtitle group always has one — "Off" when no track is active).
const subtitleCheckedIndex = computed(() =>
  captionsOn.value ? props.tracks.findIndex((t) => t.language === activeLang.value) + 1 : 0,
);
const audioRovingIndex = computed(() => (props.activeAudio >= 0 ? props.activeAudio : 0));

function setOpen(v: boolean): void {
  emit('update:open', v);
}
function close(): void {
  setOpen(false);
}

function selectSubtitle(lang: string | null): void {
  player.setSubtitle(lang);
  prefs.defaultSubtitleLang = lang; // persist as the cross-session default
  // Mark that the user has explicitly chosen a caption state — INCLUDING "Off"
  // (lang === null). This is the signal the player checks before adopting a
  // server `default:true` track, so an explicit Off is no longer mistaken for
  // "no preference" and is never overridden by a later poll / episode switch.
  prefs.subtitlePreferenceSet = true;
}
function selectAudio(index: number): void {
  emit('select-audio', index);
}
/** Close the popover and ask the Player to open the subtitle-search modal. */
function addSubtitles(): void {
  emit('add-subtitles');
  close();
}

/** Arrow/Home/End within a `radiogroup` (selection follows focus, per WAI-ARIA);
 *  returns the new index, or null when the key isn't a navigation key. */
function moveRadio(e: KeyboardEvent, count: number, current: number): number | null {
  if (count === 0) return null;
  let next = current;
  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      next = (current + 1) % count;
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      next = (current - 1 + count) % count;
      break;
    case 'Home':
      next = 0;
      break;
    case 'End':
      next = count - 1;
      break;
    default:
      return null;
  }
  e.preventDefault();
  const radios = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="radio"]');
  radios[next]?.focus();
  return next;
}
function onSubtitleKeydown(e: KeyboardEvent): void {
  const next = moveRadio(e, props.tracks.length + 1, subtitleCheckedIndex.value);
  if (next === null) return;
  selectSubtitle(next === 0 ? null : props.tracks[next - 1].language);
}
function onAudioKeydown(e: KeyboardEvent): void {
  const next = moveRadio(e, props.audioTracks.length, audioRovingIndex.value);
  if (next === null) return;
  selectAudio(props.audioTracks[next].index);
}

function setSize(v: string | number): void {
  prefs.captionStyle = { ...prefs.captionStyle, size: v as CaptionSize };
}
function setColor(v: string | number): void {
  prefs.captionStyle = { ...prefs.captionStyle, textColor: String(v) };
}
function setBackground(v: string | number): void {
  prefs.captionStyle = { ...prefs.captionStyle, background: v as CaptionBackground };
}
function setEdge(v: string | number): void {
  prefs.captionStyle = { ...prefs.captionStyle, edge: v as CaptionEdge };
}

// Real modal-ish semantics: trap Tab inside the panel, focus it on open, Esc
// closes. No scroll-lock (this lives inside the player, incl. fullscreen).
useFocusTrap(panelEl, toRef(props, 'open'), {
  lockScroll: false,
  onEscape: () => {
    close();
    return true;
  },
});

// Click outside the trigger+panel closes it (capture phase, like Select).
function onDocPointer(e: PointerEvent): void {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) close();
}
watch(
  () => props.open,
  (v) => {
    if (typeof document === 'undefined') return;
    if (v) document.addEventListener('pointerdown', onDocPointer, true);
    else document.removeEventListener('pointerdown', onDocPointer, true);
  },
  { immediate: true },
);
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.removeEventListener('pointerdown', onDocPointer, true);
});
</script>

<template>
  <div ref="rootEl" class="capmenu">
    <button
      type="button"
      class="capmenu__btn"
      :class="{ 'is-active': captionsOn }"
      :aria-label="captionsOn ? translate('player.captionsOn') : translate('player.captionsOff')"
      aria-haspopup="dialog"
      :aria-expanded="open"
      @click="setOpen(!open)"
    >
      <Icon :name="iconName" />
    </button>

    <div
      v-if="open"
      ref="panelEl"
      class="capmenu__panel"
      role="dialog"
      aria-modal="true"
      :aria-label="translate('player.captionsAndSubtitles')"
      tabindex="-1"
    >
      <div class="capmenu__head">
        <h3 class="capmenu__title">{{ translate('player.subtitles') }}</h3>
        <IconButton name="x" :label="translate('common.close')" size="sm" @click="close" />
      </div>

      <div class="capmenu__group" role="radiogroup" :aria-label="translate('player.subtitleTrack')" @keydown="onSubtitleKeydown">
        <button
          type="button"
          class="capmenu__opt"
          role="radio"
          :aria-checked="!captionsOn"
          :tabindex="subtitleCheckedIndex === 0 ? 0 : -1"
          @click="selectSubtitle(null)"
        >
          <span class="capmenu__check"><Icon v-if="!captionsOn" name="check" /></span>
          <span class="capmenu__optlabel">{{ translate('player.off') }}</span>
        </button>
        <button
          v-for="(t, i) in tracks"
          :key="t.language"
          type="button"
          class="capmenu__opt"
          role="radio"
          :aria-checked="activeLang === t.language"
          :tabindex="subtitleCheckedIndex === i + 1 ? 0 : -1"
          @click="selectSubtitle(t.language)"
        >
          <span class="capmenu__check"><Icon v-if="activeLang === t.language" name="check" /></span>
          <span class="capmenu__optlabel">{{ t.label }}</span>
        </button>
      </div>

      <button type="button" class="capmenu__add" @click="addSubtitles">
        <span class="capmenu__check"><Icon name="plus" /></span>
        <span class="capmenu__optlabel">{{ translate('player.addSubtitles') }}</span>
      </button>

      <template v-if="audioTracks.length > 1">
        <h3 class="capmenu__title capmenu__title--sub">{{ translate('player.audio') }}</h3>
        <div class="capmenu__group" role="radiogroup" :aria-label="translate('player.audioTrack')" @keydown="onAudioKeydown">
          <button
            v-for="t in audioTracks"
            :key="t.index"
            type="button"
            class="capmenu__opt"
            role="radio"
            :aria-checked="activeAudio === t.index"
            :tabindex="audioRovingIndex === t.index ? 0 : -1"
            @click="selectAudio(t.index)"
          >
            <span class="capmenu__check"><Icon v-if="activeAudio === t.index" name="check" /></span>
            <span class="capmenu__optlabel">{{ t.label }}</span>
          </button>
        </div>
      </template>

      <h3 class="capmenu__title capmenu__title--sub">{{ translate('player.captionStyle') }}</h3>
      <div class="capmenu__style">
        <div class="capmenu__field">
          <span class="capmenu__fieldlabel">{{ translate('player.size') }}</span>
          <Select
            :model-value="prefs.captionStyle.size"
            :options="CAPTION_SIZE_OPTIONS"
            :label="translate('player.captionSize')"
            @update:model-value="setSize"
          />
        </div>
        <div class="capmenu__field">
          <span class="capmenu__fieldlabel">{{ translate('player.color') }}</span>
          <Select
            :model-value="prefs.captionStyle.textColor"
            :options="CAPTION_COLOR_OPTIONS"
            :label="translate('player.captionColor')"
            @update:model-value="setColor"
          />
        </div>
        <div class="capmenu__field">
          <span class="capmenu__fieldlabel">{{ translate('player.background') }}</span>
          <Select
            :model-value="prefs.captionStyle.background"
            :options="CAPTION_BACKGROUND_OPTIONS"
            :label="translate('player.captionBackground')"
            @update:model-value="setBackground"
          />
        </div>
        <div class="capmenu__field">
          <span class="capmenu__fieldlabel">{{ translate('player.edge') }}</span>
          <Select
            :model-value="prefs.captionStyle.edge"
            :options="CAPTION_EDGE_OPTIONS"
            :label="translate('player.captionEdge')"
            @update:model-value="setEdge"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.capmenu {
  position: relative;
  display: inline-flex;
}
/* control-bar button on the dark video (mirrors Player's .player__iconbtn) */
.capmenu__btn {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.92);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.capmenu__btn:hover {
  background: rgba(255, 255, 255, 0.12);
}
.capmenu__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.capmenu__btn.is-active {
  color: var(--amber-300, var(--accent));
}
.capmenu__btn :deep(svg) {
  width: 21px;
  height: 21px;
}

.capmenu__panel {
  position: absolute;
  z-index: 20;
  right: 0;
  bottom: calc(100% + 8px);
  width: 280px;
  max-height: 60vh;
  overflow-y: auto;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-4);
  outline: none;
}
.capmenu__panel:focus-visible {
  box-shadow: var(--shadow-4), 0 0 0 3px var(--accent-ring);
}
.capmenu__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}
.capmenu__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.capmenu__title--sub {
  margin-top: var(--space-4);
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.capmenu__group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.capmenu__opt {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-align: left;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.capmenu__opt:hover {
  background: var(--surface-3);
  color: var(--text);
}
.capmenu__opt:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-ring);
}
.capmenu__opt[aria-checked='true'] {
  color: var(--accent-text);
  font-weight: var(--font-semibold);
}
.capmenu__check {
  display: inline-grid;
  place-items: center;
  width: 1em;
  font-size: 1.05em;
}
.capmenu__optlabel {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.capmenu__add {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  margin-top: var(--space-2);
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-align: left;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.capmenu__add:hover {
  background: var(--surface-3);
  color: var(--text);
}
.capmenu__add:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-ring);
}
.capmenu__style {
  display: grid;
  gap: var(--space-2);
}
.capmenu__field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}
.capmenu__fieldlabel {
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.capmenu__field :deep(.phlix-select) {
  min-width: 9.5rem;
}
@media (prefers-reduced-motion: reduce) {
  .capmenu__btn,
  .capmenu__opt {
    transition: none;
  }
}
</style>
