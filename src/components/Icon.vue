<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Icon — the single SVG icon component for @phlix/ui (R0.3).
 *
 * Usage:  <Icon name="play" />            (decorative — aria-hidden)
 *         <Icon name="play" label="Play" /> (meaningful — role=img + aria-label)
 *         <Icon name="search" :size="20" /> (px) · <Icon name="x" size="1.25rem" />
 *
 * Icons are Lucide, resolved via unplugin-icons' `~icons/lucide/*` virtual
 * modules — each compiles to an inline SVG and only the names imported below are
 * bundled (tree-shaken). Icons inherit `currentColor` and size in `em` of the
 * surrounding text by default, so they tint + scale with their context.
 */
import { computed } from 'vue';

// Playback / player
import IconPlay from '~icons/lucide/play';
import IconPause from '~icons/lucide/pause';
import IconSkipBack from '~icons/lucide/skip-back';
import IconSkipForward from '~icons/lucide/skip-forward';
import IconRotateCcw from '~icons/lucide/rotate-ccw';
import IconRotateCw from '~icons/lucide/rotate-cw';
import IconVolume from '~icons/lucide/volume-2';
import IconVolumeLow from '~icons/lucide/volume-1';
import IconVolumeMute from '~icons/lucide/volume-x';
import IconShuffle from '~icons/lucide/shuffle';
import IconRepeat from '~icons/lucide/repeat';
import IconRepeatOnce from '~icons/lucide/repeat-1';
import IconListMusic from '~icons/lucide/list-music';
import IconCaptions from '~icons/lucide/captions';
import IconCaptionsOff from '~icons/lucide/captions-off';
import IconPip from '~icons/lucide/picture-in-picture-2';
import IconTheater from '~icons/lucide/rectangle-horizontal';
import IconMaximize from '~icons/lucide/maximize';
import IconMinimize from '~icons/lucide/minimize';
import IconExpand from '~icons/lucide/maximize-2';
import IconCast from '~icons/lucide/cast';
import IconSettings from '~icons/lucide/settings';
import IconGauge from '~icons/lucide/gauge';

// Browse / media
import IconFilm from '~icons/lucide/film';
import IconImage from '~icons/lucide/image';
import IconMusic from '~icons/lucide/music';
import IconTv from '~icons/lucide/tv';
import IconBook from '~icons/lucide/book';
import IconHeadphones from '~icons/lucide/headphones';
import IconDisc from '~icons/lucide/disc-3';
import IconMic from '~icons/lucide/mic-2';
import IconVideo from '~icons/lucide/video';
import IconSearch from '~icons/lucide/search';
import IconFilter from '~icons/lucide/sliders-horizontal';
import IconCalendar from '~icons/lucide/calendar';
import IconSort from '~icons/lucide/arrow-up-down';
import IconStar from '~icons/lucide/star';
import IconList from '~icons/lucide/list';

// Actions / misc
import IconPlus from '~icons/lucide/plus';
import IconInfo from '~icons/lucide/info';
import IconX from '~icons/lucide/x';
import IconCheck from '~icons/lucide/check';
import IconLock from '~icons/lucide/lock';
import IconBookmark from '~icons/lucide/bookmark';
import IconBookmarkPlus from '~icons/lucide/bookmark-plus';
import IconHeart from '~icons/lucide/heart';
import IconThumbsUp from '~icons/lucide/thumbs-up';
import IconThumbsDown from '~icons/lucide/thumbs-down';
import IconUser from '~icons/lucide/user';
import IconLogOut from '~icons/lucide/log-out';
import IconMenu from '~icons/lucide/menu';
import IconMore from '~icons/lucide/more-horizontal';
import IconEye from '~icons/lucide/eye';
import IconEyeOff from '~icons/lucide/eye-off';
import IconKey from '~icons/lucide/key';
import IconTrash from '~icons/lucide/trash';

// Arrows / chevrons
import IconArrowLeft from '~icons/lucide/arrow-left';
import IconArrowRight from '~icons/lucide/arrow-right';
import IconArrowUp from '~icons/lucide/arrow-up';
import IconArrowDown from '~icons/lucide/arrow-down';
import IconChevronDown from '~icons/lucide/chevron-down';
import IconChevronUp from '~icons/lucide/chevron-up';
import IconChevronLeft from '~icons/lucide/chevron-left';
import IconChevronRight from '~icons/lucide/chevron-right';

// Status / theme
import IconSpinner from '~icons/lucide/loader-circle';
import IconAlert from '~icons/lucide/circle-alert';
import IconSuccess from '~icons/lucide/circle-check';
import IconError from '~icons/lucide/circle-x';
import IconSun from '~icons/lucide/sun';
import IconMoon from '~icons/lucide/moon';
import IconMonitor from '~icons/lucide/monitor';

const icons = {
  // playback (maps the legacy play/pause/volume/mute/back emoji)
  play: IconPlay,
  pause: IconPause,
  'skip-back': IconSkipBack,
  'skip-forward': IconSkipForward,
  rewind: IconRotateCcw,
  forward: IconRotateCw,
  volume: IconVolume,
  'volume-low': IconVolumeLow,
  mute: IconVolumeMute,
  shuffle: IconShuffle,
  repeat: IconRepeat,
  'repeat-1': IconRepeatOnce,
  'list-music': IconListMusic,
  captions: IconCaptions,
  'captions-off': IconCaptionsOff,
  pip: IconPip,
  theater: IconTheater,
  fullscreen: IconMaximize,
  'fullscreen-exit': IconMinimize,
  expand: IconExpand,
  cast: IconCast,
  settings: IconSettings,
  speed: IconGauge,
  // media (replaces the legacy film-clapper emoji placeholder)
  film: IconFilm,
  image: IconImage,
  music: IconMusic,
  tv: IconTv,
  // per-MediaType fallbacks — one per non-video kind in the media_items.type
  // ENUM, so book/audiobook/track/album/artist/video rows stop falling through
  // to the generic film icon (see mediaTypeIcon in utils/mediaTypeIcon).
  book: IconBook,
  headphones: IconHeadphones,
  disc: IconDisc,
  mic: IconMic,
  video: IconVideo,
  search: IconSearch,
  filter: IconFilter,
  calendar: IconCalendar,
  sort: IconSort,
  star: IconStar,
  list: IconList,
  // actions
  plus: IconPlus,
  info: IconInfo,
  x: IconX,
  check: IconCheck,
  lock: IconLock,
  bookmark: IconBookmark,
  'bookmark-plus': IconBookmarkPlus,
  heart: IconHeart,
  'thumbs-up': IconThumbsUp,
  'thumbs-down': IconThumbsDown,
  user: IconUser,
  'log-out': IconLogOut,
  menu: IconMenu,
  more: IconMore,
  eye: IconEye,
  'eye-off': IconEyeOff,
  refresh: IconRotateCw,
  key: IconKey,
  trash: IconTrash,
  // arrows / chevrons (replaces the legacy arrow emoji)
  'arrow-left': IconArrowLeft,
  'arrow-right': IconArrowRight,
  'arrow-up': IconArrowUp,
  'arrow-down': IconArrowDown,
  'chevron-down': IconChevronDown,
  'chevron-up': IconChevronUp,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  // status / theme
  spinner: IconSpinner,
  alert: IconAlert,
  'alert-circle': IconAlert,
  success: IconSuccess,
  error: IconError,
  sun: IconSun,
  moon: IconMoon,
  monitor: IconMonitor,
} as const;

export type IconName = keyof typeof icons;

const props = withDefaults(
  defineProps<{
    /** Icon name from the Lucide registry. */
    name: IconName;
    /** Optional CSS length (number → px). Omit to inherit 1em of the text. */
    size?: number | string;
    /** Accessible label. When set the icon is exposed as role="img"; otherwise it is aria-hidden. */
    label?: string;
    /** Stroke width override (Lucide default 2). */
    strokeWidth?: number | string;
  }>(),
  { size: undefined, label: undefined, strokeWidth: undefined },
);

const component = computed(() => icons[props.name]);

const sizeValue = computed(() =>
  props.size === undefined ? undefined : typeof props.size === 'number' ? `${props.size}px` : props.size,
);
</script>

<template>
  <component
    :is="component"
    class="phlix-icon"
    :style="sizeValue ? { fontSize: sizeValue } : undefined"
    :stroke-width="strokeWidth"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  />
</template>

<style>
.phlix-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  color: inherit;
  vertical-align: -0.125em;
}
</style>
