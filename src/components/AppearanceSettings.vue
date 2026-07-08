<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * AppearanceSettings (R4.2) — live, persisted user preferences surfaced from
 * `usePreferencesStore`. Two panels (selected via the `panel` prop, so the
 * SettingsPage can place them in separate tabs):
 *   · appearance — theme gallery (live preview swatches), accent picker, density,
 *                  grid density, card size, atmosphere, reduced motion.
 *   · playback   — autoplay, default volume, default quality, default subtitle
 *                  language, and the R3.5 caption style.
 *
 * Every control writes straight to the store, which persists to localStorage and
 * (via `useTheme` at the app root) reflects theme/accent/density onto <html>
 * instantly — there is no Save button; changes apply live.
 */
import { computed, ref, onBeforeUnmount } from 'vue';
import Switch from './ui/Switch.vue';
import Slider from './ui/Slider.vue';
import Select from './ui/Select.vue';
import Button from './ui/Button.vue';
import Icon from './Icon.vue';
import { usePreferencesStore, type ThemeName } from '../stores/usePreferencesStore';
import { useToastStore } from '../stores/useToastStore';
import { useMessages } from '../composables/useMessages';
import {
  CAPTION_SIZE_OPTIONS,
  CAPTION_COLOR_OPTIONS,
  CAPTION_BACKGROUND_OPTIONS,
  CAPTION_EDGE_OPTIONS,
} from './player/captions';
import type { CaptionSize, CaptionBackground, CaptionEdge } from '../stores/usePreferencesStore';

withDefaults(defineProps<{ panel?: 'appearance' | 'playback' }>(), { panel: 'appearance' });

const prefs = usePreferencesStore();
const toasts = useToastStore();
const { t } = useMessages();

const THEMES: { value: ThemeName; label: string }[] = [
  { value: 'nocturne', label: 'Nocturne' },
  { value: 'daylight', label: 'Daylight' },
  { value: 'midnight', label: 'Midnight' },
];

/** Accent presets — `null` keeps the theme's amber; otherwise a hex override fed
 *  through `deriveAccentVars` by `useTheme`. */
const ACCENTS: { value: string | null; label: string; swatch: string }[] = [
  { value: null, label: 'Amber', swatch: 'var(--amber-500)' },
  { value: '#e5484d', label: 'Crimson', swatch: '#e5484d' },
  { value: '#d6409f', label: 'Magenta', swatch: '#d6409f' },
  { value: '#8e4ec6', label: 'Violet', swatch: '#8e4ec6' },
  { value: '#4c6ef5', label: 'Azure', swatch: '#4c6ef5' },
  { value: '#0fa3a3', label: 'Teal', swatch: '#0fa3a3' },
  { value: '#6cc04a', label: 'Lime', swatch: '#6cc04a' },
];

const DENSITY_OPTIONS = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];
const GRID_DENSITY_OPTIONS = [
  { value: 'cozy', label: 'Cozy' },
  { value: 'comfy', label: 'Comfy' },
  { value: 'dense', label: 'Dense' },
];
const MOTION_OPTIONS = [
  { value: 'auto', label: 'Match system' },
  { value: 'on', label: 'Reduced' },
  { value: 'off', label: 'Full' },
];
// Values MUST match the rung ids `player/quality.ts`'s `qualityId()`/`qualityRungs()`
// produce (and what `QualityMenu.vue` persists to `prefs.defaultQuality`) — e.g.
// '2160p', not '4k' — or a default picked here silently never matches a live rung
// and this control's persisted preference is never honoured (Stream Quality/ABR E3).
const QUALITY_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '2160p', label: '4K' },
  { value: '1440p', label: '1440p' },
  { value: '1080p', label: '1080p' },
  { value: '720p', label: '720p' },
  { value: '480p', label: '480p' },
  { value: '360p', label: '360p' },
  { value: '240p', label: '240p' },
];
const SUBTITLE_OPTIONS = [
  { value: '', label: 'Off' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
];

const formatPercent = (v: number) => `${Math.round(v * 100)}%`;
const formatPx = (v: number) => `${v}px`;

function setSubtitle(v: string | number): void {
  prefs.defaultSubtitleLang = v === '' ? null : String(v);
  // The Settings default-subtitle dropdown is also an explicit user choice
  // (incl. "None" → null), so it sets the same signal the player checks before
  // adopting a server default track.
  prefs.subtitlePreferenceSet = true;
}
function setCaption(key: 'size' | 'textColor' | 'background' | 'edge', v: string | number): void {
  prefs.captionStyle = { ...prefs.captionStyle, [key]: v };
}

// Roving-tabindex radiogroups (theme + accent) — one Tab stop; Arrow/Home/End
// move focus + selection (WAI-ARIA APG), mirroring the player's CaptionsMenu.
const themeRovingIndex = computed(() => Math.max(0, THEMES.findIndex((t) => t.value === prefs.theme)));
const accentRovingIndex = computed(() => Math.max(0, ACCENTS.findIndex((a) => a.value === prefs.accent)));

function moveRadio(e: KeyboardEvent, count: number, current: number): number | null {
  if (count === 0) return null;
  let next = current;
  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowRight': next = (current + 1) % count; break;
    case 'ArrowUp':
    case 'ArrowLeft': next = (current - 1 + count) % count; break;
    case 'Home': next = 0; break;
    case 'End': next = count - 1; break;
    default: return null;
  }
  e.preventDefault();
  const radios = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="radio"]');
  radios[next]?.focus();
  return next;
}
function onThemeKeydown(e: KeyboardEvent): void {
  const next = moveRadio(e, THEMES.length, themeRovingIndex.value);
  if (next !== null) prefs.theme = THEMES[next].value;
}
function onAccentKeydown(e: KeyboardEvent): void {
  const next = moveRadio(e, ACCENTS.length, accentRovingIndex.value);
  if (next !== null) prefs.accent = ACCENTS[next].value;
}

// "Reset all preferences" is destructive (clears filter presets too) — require a
// second click within a short window instead of a modal.
const resetArmed = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;
function onReset(): void {
  if (!resetArmed.value) {
    resetArmed.value = true;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => (resetArmed.value = false), 3500);
    return;
  }
  clearTimeout(resetTimer);
  resetArmed.value = false;
  prefs.reset();
  toasts.info(t('settings.resetDone'));
}
onBeforeUnmount(() => clearTimeout(resetTimer));
</script>

<template>
  <!-- ===================== APPEARANCE ===================== -->
  <div v-if="panel === 'appearance'" class="aps">
    <section class="aps__group">
      <h3 class="aps__title">{{ t('settings.theme') }}</h3>
      <div class="aps__themes" role="radiogroup" :aria-label="t('settings.theme')" @keydown="onThemeKeydown">
        <button
          v-for="(t, i) in THEMES"
          :key="t.value"
          type="button"
          role="radio"
          class="aps__theme"
          :class="{ 'is-active': prefs.theme === t.value }"
          :aria-checked="prefs.theme === t.value"
          :tabindex="themeRovingIndex === i ? 0 : -1"
          :data-theme="t.value"
          @click="prefs.theme = t.value"
        >
          <span class="aps__preview">
            <span class="aps__preview-bar"></span>
            <span class="aps__preview-card"></span>
          </span>
          <span class="aps__theme-label">
            {{ t.label }}
            <Icon v-if="prefs.theme === t.value" name="check" class="aps__theme-check" />
          </span>
        </button>
      </div>
    </section>

    <section class="aps__group">
      <h3 class="aps__title">{{ t('settings.accent') }}</h3>
      <div class="aps__accents" role="radiogroup" :aria-label="t('settings.accentColor')" @keydown="onAccentKeydown">
        <button
          v-for="(a, i) in ACCENTS"
          :key="a.label"
          type="button"
          role="radio"
          class="aps__accent"
          :class="{ 'is-active': prefs.accent === a.value }"
          :aria-checked="prefs.accent === a.value"
          :aria-label="a.label"
          :title="a.label"
          :tabindex="accentRovingIndex === i ? 0 : -1"
          @click="prefs.accent = a.value"
        >
          <span class="aps__accent-dot" :style="{ background: a.swatch }">
            <Icon v-if="prefs.accent === a.value" name="check" />
          </span>
        </button>
      </div>
    </section>

    <section class="aps__group">
      <h3 class="aps__title">{{ t('settings.display') }}</h3>
      <div class="aps__row">
        <span class="aps__label" id="aps-density">{{ t('settings.density') }}</span>
        <Select
          :model-value="prefs.density"
          :options="DENSITY_OPTIONS"
          :label="t('settings.density')"
          @update:model-value="(v) => (prefs.density = v as 'comfortable' | 'compact')"
        />
      </div>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.gridDensity') }}</span>
        <Select
          :model-value="prefs.gridDensity"
          :options="GRID_DENSITY_OPTIONS"
          :label="t('settings.gridDensity')"
          @update:model-value="(v) => (prefs.gridDensity = v as 'cozy' | 'comfy' | 'dense')"
        />
      </div>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.cardSize') }} <span class="aps__value">{{ formatPx(prefs.cardSize) }}</span></span>
        <div class="aps__slider">
          <Slider
            :model-value="prefs.cardSize"
            :min="120"
            :max="280"
            :step="10"
            :label="t('settings.cardSize')"
            :format-value="formatPx"
            @update:model-value="(v) => (prefs.cardSize = v)"
          />
        </div>
      </div>
    </section>

    <section class="aps__group">
      <h3 class="aps__title">{{ t('settings.atmosphere') }}</h3>
      <div class="aps__row aps__row--switch">
        <Switch :model-value="prefs.atmosphere" :label="t('settings.filmGrainGlow')" @update:model-value="(v) => (prefs.atmosphere = v)" />
      </div>
      <div class="aps__row aps__row--switch">
        <Switch :model-value="prefs.tv" label="TV mode" @update:model-value="(v) => (prefs.tv = v)" />
      </div>
      <p class="aps__hint">Larger controls and a visible focus outline for TV / remote navigation.</p>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.motion') }}</span>
        <Select
          :model-value="prefs.reducedMotion"
          :options="MOTION_OPTIONS"
          :label="t('settings.motion')"
          @update:model-value="(v) => (prefs.reducedMotion = v as 'auto' | 'on' | 'off')"
        />
      </div>
    </section>

    <div class="aps__foot">
      <Button variant="ghost" :left-icon="resetArmed ? 'alert' : 'rewind'" @click="onReset">
        {{ resetArmed ? t('settings.resetConfirm') : t('settings.resetAll') }}
      </Button>
      <!-- Announce the armed state: a button's own accessible-name change isn't
           reliably re-read by screen readers, so mirror it into a polite live region. -->
      <span class="visually-hidden" role="status" aria-live="polite">{{ resetArmed ? t('settings.resetConfirm') : '' }}</span>
    </div>
  </div>

  <!-- ===================== PLAYBACK ===================== -->
  <div v-else class="aps">
    <section class="aps__group">
      <h3 class="aps__title">{{ t('settings.playback') }}</h3>
      <div class="aps__row aps__row--switch">
        <Switch :model-value="prefs.autoplay" :label="t('settings.autoplayNext')" @update:model-value="(v) => (prefs.autoplay = v)" />
      </div>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.defaultVolume') }} <span class="aps__value">{{ formatPercent(prefs.defaultVolume) }}</span></span>
        <div class="aps__slider">
          <Slider
            :model-value="prefs.defaultVolume"
            :min="0"
            :max="1"
            :step="0.05"
            :label="t('settings.defaultVolume')"
            :format-value="formatPercent"
            @update:model-value="(v) => (prefs.defaultVolume = v)"
          />
        </div>
      </div>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.defaultQuality') }}</span>
        <Select
          :model-value="prefs.defaultQuality"
          :options="QUALITY_OPTIONS"
          :label="t('settings.defaultQuality')"
          @update:model-value="(v) => (prefs.defaultQuality = String(v))"
        />
      </div>
    </section>

    <section class="aps__group">
      <h3 class="aps__title">{{ t('settings.subtitles') }}</h3>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.defaultLanguage') }}</span>
        <Select
          :model-value="prefs.defaultSubtitleLang ?? ''"
          :options="SUBTITLE_OPTIONS"
          :label="t('settings.defaultSubtitleLanguage')"
          @update:model-value="setSubtitle"
        />
      </div>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.captionSize') }}</span>
        <Select :model-value="prefs.captionStyle.size" :options="CAPTION_SIZE_OPTIONS" :label="t('settings.captionSize')" @update:model-value="(v) => setCaption('size', v as CaptionSize)" />
      </div>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.captionColor') }}</span>
        <Select :model-value="prefs.captionStyle.textColor" :options="CAPTION_COLOR_OPTIONS" :label="t('settings.captionColor')" @update:model-value="(v) => setCaption('textColor', String(v))" />
      </div>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.captionBackground') }}</span>
        <Select :model-value="prefs.captionStyle.background" :options="CAPTION_BACKGROUND_OPTIONS" :label="t('settings.captionBackground')" @update:model-value="(v) => setCaption('background', v as CaptionBackground)" />
      </div>
      <div class="aps__row">
        <span class="aps__label">{{ t('settings.captionEdge') }}</span>
        <Select :model-value="prefs.captionStyle.edge" :options="CAPTION_EDGE_OPTIONS" :label="t('settings.captionEdge')" @update:model-value="(v) => setCaption('edge', v as CaptionEdge)" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.aps {
  display: grid;
  gap: var(--space-8);
}
.aps__group {
  display: grid;
  gap: var(--space-4);
}
.aps__title {
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-subtle);
}

/* Theme gallery — each swatch re-scopes [data-theme] so the preview shows that
   theme's real palette (bg/surface), regardless of the active theme. */
.aps__themes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-4);
}
.aps__theme {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface-2);
  text-align: left;
  transition: border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-spring);
}
.aps__theme:hover {
  border-color: var(--border-strong);
}
.aps__theme:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.aps__theme.is-active {
  border-color: var(--accent-text);
  box-shadow: var(--glow-amber);
}
.aps__preview {
  display: block;
  height: 64px;
  border-radius: var(--radius-md);
  background: var(--bg);
  border: 1px solid var(--border-subtle);
  padding: var(--space-2);
  position: relative;
  overflow: hidden;
}
.aps__preview-bar {
  display: block;
  width: 38%;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--amber-500);
}
.aps__preview-card {
  position: absolute;
  left: var(--space-2);
  bottom: var(--space-2);
  width: 60%;
  height: 26px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--border);
}
.aps__theme-label {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: var(--fw-medium, 500);
  color: var(--text);
}
.aps__theme-check {
  color: var(--accent-text);
}

/* Accent picker */
.aps__accents {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.aps__accent {
  border-radius: var(--radius-full);
  padding: 3px;
  border: 2px solid transparent;
  transition: border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-spring);
}
.aps__accent:hover {
  transform: scale(1.08);
}
.aps__accent:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
}
.aps__accent.is-active {
  border-color: var(--text);
}
.aps__accent-dot {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #fff;
  font-size: 0.9em;
  box-shadow: var(--shadow-1);
}

/* Rows */
.aps__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
.aps__label {
  font-size: var(--text-sm);
  color: var(--text);
}
.aps__hint {
  margin: 0;
  font-size: var(--text-xs);
  color: var(--text-muted);
}
.aps__value {
  margin-left: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
}
.aps__row :deep(.phlix-select) {
  min-width: 11rem;
}
.aps__slider {
  width: 11rem;
}
.aps__row--switch {
  justify-content: flex-start;
}
.aps__row--switch :deep(.phlix-switch) {
  width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.aps__foot {
  padding-top: var(--space-2);
}
@media (prefers-reduced-motion: reduce) {
  .aps__theme,
  .aps__accent {
    transition: none;
  }
  .aps__accent:hover {
    transform: none;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
