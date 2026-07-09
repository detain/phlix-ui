<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * ChapterList (P2-S3) — chapter list overlay in the player gear surface.
 *
 * Shows a scrollable list of all chapters for the current media. Each row
 * displays the chapter index, title (or "Chapter N"), and start time. Clicking
 * a row seeks the player to that chapter's start. The panel opens via a
 * trigger button in the player's control bar and closes on click-outside or
 * Escape.
 */
import { computed, ref, toRef, onBeforeUnmount, watch } from 'vue';
import Icon from '../Icon.vue';
import IconButton from '../ui/IconButton.vue';
import { useFocusTrap } from '../ui/useFocusTrap';
import { useMessages } from '../../composables/useMessages';
import { formatTime } from './format-time';

/** Chapter marker for display in the list. */
export interface ChapterDisplay {
  /** Chapter start, in seconds. */
  start: number;
  /** Chapter end, in seconds (used to compute duration). */
  end?: number;
  /** Chapter title (absent = "Chapter N"). */
  title?: string | null;
}

const props = withDefaults(
  defineProps<{
    /** All chapters for the current media. */
    chapters?: ChapterDisplay[];
    /** Popover open state (v-model:open). */
    open?: boolean;
  }>(),
  { chapters: () => [], open: false },
);

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void;
  /** Seek to a chapter's start time. */
  (e: 'seek', seconds: number): void;
}>();

const { t: translate } = useMessages();

// ---- open/close ------------------------------------------------------------

function close(): void {
  emit('update:open', false);
}
function toggle(): void {
  emit('update:open', !props.open);
}

// ---- chapter list formatting ------------------------------------------------

/** Chapters with derived labels for display. */
const chapterRows = computed<Array<{ chapter: ChapterDisplay; label: string; startLabel: string; durationLabel?: string; index: number }>>(() =>
  props.chapters.map((chapter, i) => {
    const index = i + 1;
    const label = chapter.title?.trim() || `Chapter ${index}`;
    const startLabel = formatTime(chapter.start);
    let durationLabel: string | undefined;
    if (chapter.end != null && chapter.end > chapter.start) {
      const dur = chapter.end - chapter.start;
      durationLabel = formatTime(dur);
    }
    return { chapter, label, startLabel, durationLabel, index };
  }),
);

// ---- focus trap + click-outside --------------------------------------------

const rootEl = ref<HTMLElement | null>(null);
const panelEl = ref<HTMLElement | null>(null);

// Trap focus inside the panel, close on Escape.
useFocusTrap(panelEl, toRef(props, 'open'), {
  lockScroll: false,
  onEscape: () => {
    close();
    return true;
  },
});

// Click outside the trigger+panel closes it (capture phase, mirrors CaptionsMenu).
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
);

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointer, true);
});

function onSeek(chapter: ChapterDisplay): void {
  emit('seek', chapter.start);
  close();
}
</script>

<template>
  <div ref="rootEl" class="chapterlist">
    <button
      type="button"
      class="chapterlist__btn player__iconbtn"
      :class="{ 'is-active': open }"
      :aria-label="translate('player.chapters')"
      aria-haspopup="dialog"
      :aria-expanded="open"
      @click="toggle"
    >
      <Icon name="list" />
    </button>

    <div
      v-if="open"
      ref="panelEl"
      class="chapterlist__panel"
      role="dialog"
      aria-modal="true"
      :aria-label="translate('player.chapterList')"
      tabindex="-1"
    >
      <div class="chapterlist__head">
        <h3 class="chapterlist__title">{{ translate('player.chapters') }}</h3>
        <IconButton name="x" :label="translate('common.close')" size="sm" @click="close" />
      </div>

      <ul v-if="chapterRows.length > 0" class="chapterlist__list" role="listbox" :aria-label="translate('player.chapterList')">
        <li
          v-for="row in chapterRows"
          :key="row.index"
          class="chapterlist__item"
          role="option"
          :aria-selected="false"
        >
          <button
            type="button"
            class="chapterlist__row"
            @click="onSeek(row.chapter)"
          >
            <span class="chapterlist__index">{{ row.index }}</span>
            <span class="chapterlist__name">{{ row.label }}</span>
            <span class="chapterlist__meta">
              <span class="chapterlist__time">{{ row.startLabel }}</span>
              <span v-if="row.durationLabel" class="chapterlist__duration">· {{ row.durationLabel }}</span>
            </span>
          </button>
        </li>
      </ul>

      <p v-else class="chapterlist__empty">{{ translate('player.noChapters') }}</p>
    </div>
  </div>
</template>

<style scoped>
.chapterlist {
  position: relative;
  display: inline-flex;
}

/* Button — mirrors Player's .player__iconbtn */
.chapterlist__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.chapterlist__btn:hover,
.chapterlist__btn.is-active {
  background: rgba(255, 255, 255, 0.15);
}
.chapterlist__btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
.chapterlist__btn svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Panel */
.chapterlist__panel {
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  width: 280px;
  max-height: 320px;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
}

.chapterlist__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.chapterlist__title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.chapterlist__list {
  list-style: none;
  margin: 0;
  padding: 6px 0;
  overflow-y: auto;
  flex: 1;
}

.chapterlist__item {
  margin: 0;
}

.chapterlist__row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.87);
  cursor: pointer;
  text-align: left;
  transition: background 0.1s;
}
.chapterlist__row:hover,
.chapterlist__row:focus-visible {
  background: rgba(255, 255, 255, 0.08);
  outline: none;
}

.chapterlist__index {
  flex-shrink: 0;
  width: 20px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  text-align: right;
}

.chapterlist__name {
  flex: 1;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapterlist__meta {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

.chapterlist__time {
  font-variant-numeric: tabular-nums;
}

.chapterlist__empty {
  padding: 16px 12px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin: 0;
}
</style>
