<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * PosterPicker (Step 15.4) — admin-only poster selection modal.
 *
 * Opens via `v-model:open`, loads available poster candidates per provider
 * from `api.listPosters(item.id)`, groups them into provider sections, and
 * lets the admin pick one which is then applied via `api.setPoster`.
 * Emits `applied(updatedItem)` on success so the host can patch the item in place.
 *
 * Built on the shared `Modal` (focus-trap + Esc + backdrop close come for free).
 * Handles loading, empty, unconfigured (TMDB not set up), and error states.
 * Arrow-key navigable within each provider section (wrapping).
 * Reduced-motion safe. Dialog/grid ARIA.
 */
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import type { MediaItem, PosterCandidate } from '../types/media-item';
import { isTmdbUnconfigured } from '../api/client';
import { errMessage } from '../api/errors';
import { useAuthStore } from '../stores/useAuthStore';
import Modal from './ui/Modal.vue';
import Icon from './Icon.vue';
import Spinner from './ui/Spinner.vue';

const props = defineProps<{
  modelValue: boolean;
  item: MediaItem | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'applied', item: MediaItem): void;
}>();

const auth = useAuthStore();

const COLS = 4;

interface ProviderGroup {
  provider: string;
  candidates: PosterCandidate[];
}

const candidates = ref<PosterCandidate[]>([]);
const grouped = ref<ProviderGroup[]>([]);
const loading = ref(false);
const searched = ref(false);
const error = ref<string | null>(null);
const unconfigured = ref(false);
const selectedUrl = ref<string | null>(null);
const applyingId = ref<string | null>(null);
const applyError = ref<string | null>(null);
const activeSection = ref(0);
const activeIndex = ref(-1);

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
});

function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

function abortLoad(): void {
  loadController?.abort();
  loadController = null;
}

function resetState(): void {
  candidates.value = [];
  grouped.value = [];
  loading.value = false;
  searched.value = false;
  error.value = null;
  unconfigured.value = false;
  selectedUrl.value = null;
  applyingId.value = null;
  applyError.value = null;
  activeSection.value = 0;
  activeIndex.value = -1;
}

function groupCandidates(list: PosterCandidate[]): ProviderGroup[] {
  const byProvider = new Map<string, PosterCandidate[]>();
  for (const c of list) {
    if (!c.poster_url) continue;
    const arr = byProvider.get(c.provider) ?? [];
    arr.push(c);
    byProvider.set(c.provider, arr);
  }
  const pick = (arr: PosterCandidate[]): PosterCandidate => {
    const withDims = arr.filter((c) => c.width != null && c.height != null);
    if (withDims.length > 0) {
      return withDims.sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0))[0]!;
    }
    return arr.sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))[0]!;
  };
  return Array.from(byProvider.entries())
    .map(([provider, cs]) => ({ provider, candidates: [pick(cs)] }))
    .sort((a, b) => {
      if (a.provider === 'tmdb') return -1;
      if (b.provider === 'tmdb') return 1;
      return a.provider.localeCompare(b.provider);
    });
}

let loadController: AbortController | null = null;

async function loadPosters(): Promise<void> {
  if (!props.item) return;
  abortLoad();
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  loadController = controller;
  const stale = (): boolean => loadController !== controller;

  loading.value = true;
  searched.value = true;
  error.value = null;
  unconfigured.value = false;
  applyError.value = null;
  try {
    const res = await auth.client.listPosters(props.item.id, controller?.signal);
    if (stale()) return;
    candidates.value = res.candidates;
    grouped.value = groupCandidates(res.candidates);
    selectedUrl.value = res.current_poster_url;
    if (grouped.value.length > 0 && grouped.value[0]!.candidates.length > 0) {
      activeSection.value = 0;
      activeIndex.value = 0;
    }
  } catch (e) {
    if (stale() || isAbort(e)) return;
    candidates.value = [];
    grouped.value = [];
    if (isTmdbUnconfigured(e)) {
      unconfigured.value = true;
    } else {
      error.value = errMessage(e, 'Failed to load posters. Please try again.');
    }
  } finally {
    if (!stale()) loading.value = false;
  }
}

async function selectPoster(c: PosterCandidate): Promise<void> {
  if (!props.item || applyingId.value) return;
  applyingId.value = c.poster_url;
  applyError.value = null;
  try {
    const updated: MediaItem = await auth.client.setPoster(props.item.id, c.poster_url);
    emit('applied', updated);
    open.value = false;
  } catch (e) {
    if (isTmdbUnconfigured(e)) {
      unconfigured.value = true;
    } else {
      applyError.value = errMessage(e, 'Could not apply that poster. Please try again.');
    }
  } finally {
    applyingId.value = null;
  }
}

function flatIndex(sectionIdx: number, withinIdx: number): number {
  let idx = 0;
  for (let s = 0; s < sectionIdx; s++) idx += grouped.value[s]!.candidates.length;
  return idx + withinIdx;
}

function sectionOfFlat(globalIdx: number): { sectionIdx: number; localIdx: number } {
  let acc = 0;
  for (let s = 0; s < grouped.value.length; s++) {
    const cnt = grouped.value[s]!.candidates.length;
    if (acc + cnt > globalIdx) return { sectionIdx: s, localIdx: globalIdx - acc };
    acc += cnt;
  }
  return { sectionIdx: grouped.value.length - 1, localIdx: grouped.value.at(-1)!.candidates.length - 1 };
}

function moveLeft(): void {
  const total = candidates.value.length;
  if (total === 0) return;
  const cur = activeIndex.value;
  const { sectionIdx, localIdx } = sectionOfFlat(cur);
  const section = grouped.value[sectionIdx];
  if (!section) return;
  const cols = COLS;

  if (localIdx % cols === 0) {
    if (sectionIdx > 0) {
      const prev = grouped.value[sectionIdx - 1]!;
      const prevLast = prev.candidates.length - 1;
      activeSection.value = sectionIdx - 1;
      activeIndex.value = flatIndex(sectionIdx - 1, Math.min(prevLast, prevLast - (cols - 1 - localIdx)));
    } else {
      const last = grouped.value.at(-1)!;
      const lastRowStart = Math.floor((last.candidates.length - 1) / cols) * cols;
      activeSection.value = grouped.value.length - 1;
      activeIndex.value = flatIndex(grouped.value.length - 1, lastRowStart + (localIdx % cols));
    }
  } else {
    activeIndex.value = cur - 1;
  }
}

function moveRight(): void {
  const total = candidates.value.length;
  if (total === 0) return;
  const cur = activeIndex.value;
  const { sectionIdx, localIdx } = sectionOfFlat(cur);
  const section = grouped.value[sectionIdx];
  if (!section) return;
  const cols = COLS;
  const row = Math.floor(localIdx / cols);
  const colsInThisRow = cols;
  const lastInRow = row * cols + colsInThisRow - 1;

  if (localIdx === lastInRow || localIdx === section.candidates.length - 1) {
    if (sectionIdx < grouped.value.length - 1) {
      const next = grouped.value[sectionIdx + 1]!;
      const nextRow = Math.floor(localIdx / cols);
      activeSection.value = sectionIdx + 1;
      activeIndex.value = flatIndex(sectionIdx + 1, Math.min(next.candidates.length - 1, nextRow * cols + (localIdx % cols)));
    } else {
      activeSection.value = 0;
      activeIndex.value = flatIndex(0, row * cols + (localIdx % cols));
    }
  } else {
    activeIndex.value = cur + 1;
  }
}

function moveUp(): void {
  const total = candidates.value.length;
  if (total === 0) return;
  const cur = activeIndex.value;
  const { sectionIdx, localIdx } = sectionOfFlat(cur);
  const section = grouped.value[sectionIdx];
  if (!section) return;
  const cols = COLS;

  if (localIdx < cols) {
    if (sectionIdx > 0) {
      const prev = grouped.value[sectionIdx - 1]!;
      const prevRows = Math.ceil(prev.candidates.length / cols);
      const targetRow = prevRows - 1;
      activeSection.value = sectionIdx - 1;
      activeIndex.value = flatIndex(sectionIdx - 1, Math.min(targetRow * cols + (localIdx % cols), prev.candidates.length - 1));
    } else {
      const last = grouped.value.at(-1)!;
      const lastRows = Math.ceil(last.candidates.length / cols);
      const targetRow = lastRows - 1;
      activeSection.value = grouped.value.length - 1;
      activeIndex.value = flatIndex(grouped.value.length - 1, Math.min(targetRow * cols + (localIdx % cols), last.candidates.length - 1));
    }
  } else {
    activeIndex.value = cur - cols;
  }
}

function moveDown(): void {
  const total = candidates.value.length;
  if (total === 0) return;
  const cur = activeIndex.value;
  const { sectionIdx, localIdx } = sectionOfFlat(cur);
  const section = grouped.value[sectionIdx];
  if (!section) return;
  const cols = COLS;
  const row = Math.floor(localIdx / cols);
  const rows = Math.ceil(section.candidates.length / cols);

  if (row >= rows - 1 || localIdx + cols >= section.candidates.length) {
    if (sectionIdx < grouped.value.length - 1) {
      activeSection.value = sectionIdx + 1;
      activeIndex.value = flatIndex(sectionIdx + 1, localIdx % cols);
    } else {
      activeSection.value = 0;
      activeIndex.value = flatIndex(0, localIdx % cols);
    }
  } else {
    activeIndex.value = cur + cols;
  }
}

function onGridKeydown(e: KeyboardEvent): void {
  switch (e.key) {
    case 'ArrowLeft': e.preventDefault(); moveLeft(); break;
    case 'ArrowRight': e.preventDefault(); moveRight(); break;
    case 'ArrowUp': e.preventDefault(); moveUp(); break;
    case 'ArrowDown': e.preventDefault(); moveDown(); break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (activeIndex.value >= 0) {
        const globalIdx = activeIndex.value;
        const { sectionIdx, localIdx } = sectionOfFlat(globalIdx);
        const c = grouped.value[sectionIdx]?.candidates[localIdx];
        if (c) void selectPoster(c);
      }
      break;
    case 'Escape':
      if (open.value) { e.preventDefault(); open.value = false; }
      break;
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.item) {
      resetState();
      void loadPosters();
    } else if (!isOpen) {
      abortLoad();
      resetState();
    }
  },
  { immediate: true },
);

onBeforeUnmount(abortLoad);
</script>

<template>
  <Modal v-model="open" title="Choose poster" size="lg" @keydown="onGridKeydown">
    <div class="poster-picker">

      <p v-if="item" class="poster-picker__subject">
        Select a poster for
        <strong>{{ item.name }}</strong>
      </p>

      <div v-if="loading" class="poster-picker__loading" role="status" aria-busy="true">
        <Spinner label="Loading posters" />
      </div>

      <div v-else-if="unconfigured" class="poster-picker__state" role="status">
        <Icon name="alert" class="poster-picker__state-icon" />
        <p class="poster-picker__state-title">TMDB is not configured</p>
        <p class="poster-picker__state-hint">
          Configure a TMDB API key in admin settings to search for poster alternatives.
        </p>
      </div>

      <div v-else-if="error" class="poster-picker__state" role="alert">
        <Icon name="error" class="poster-picker__state-icon" />
        <p class="poster-picker__state-title">{{ error }}</p>
      </div>

      <template v-else-if="grouped.length">
        <p v-if="applyError" class="poster-picker__apply-error" role="alert">{{ applyError }}</p>

        <div
          v-for="({ provider, candidates: cs }, sIdx) in grouped"
          :key="provider"
          class="poster-picker__section"
        >
          <h3 class="poster-picker__section-title">{{ provider }}</h3>
          <ul
            class="poster-picker__grid"
            role="listbox"
            :aria-label="`${provider} posters`"
          >
            <li
              v-for="(c, cIdx) in cs"
              :key="c.poster_url"
              class="poster-picker__cell"
              role="option"
              :aria-selected="c.poster_url === selectedUrl"
            >
              <button
                type="button"
                class="poster-picker__thumb"
                :class="{
                  'is-current': c.poster_url === selectedUrl,
                  'is-active': flatIndex(sIdx, cIdx) === activeIndex,
                  'is-applying': applyingId === c.poster_url,
                }"
                :aria-label="`${provider} poster${c.poster_url === selectedUrl ? ' (current)' : ''}`"
                :disabled="applyingId !== null && applyingId !== c.poster_url"
                @click="void selectPoster(c)"
                @pointermove="activeIndex = flatIndex(sIdx, cIdx)"
              >
                <img
                  v-if="c.poster_url"
                  :src="c.poster_url"
                  :alt="`${provider} poster`"
                  loading="lazy"
                  decoding="async"
                />
                <div v-else class="poster-picker__thumb-fallback" aria-hidden="true">
                  <Icon name="image" />
                </div>
              </button>
              <div v-if="c.vote_average != null" class="poster-picker__meta numeric">
                {{ c.vote_average.toFixed(1) }}
              </div>
            </li>
          </ul>
        </div>
      </template>

      <div v-else-if="searched && !loading && grouped.length === 0" class="poster-picker__state" role="status">
        <Icon name="image" class="poster-picker__state-icon" />
        <p class="poster-picker__state-title">No posters available</p>
        <p class="poster-picker__state-hint">No poster alternatives were found for this item.</p>
      </div>

    </div>
  </Modal>
</template>

<style scoped>
.poster-picker {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  color: var(--text);
}
.poster-picker__subject {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.poster-picker__loading {
  display: flex;
  justify-content: center;
  padding: var(--space-8) 0;
}

.poster-picker__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-8) var(--space-4);
  text-align: center;
  color: var(--text-subtle);
}
.poster-picker__state-icon {
  width: 32px;
  height: 32px;
  opacity: 0.6;
}
.poster-picker__state-title {
  font-weight: var(--font-semibold);
  color: var(--text-muted);
}
.poster-picker__state-hint {
  font-size: var(--text-sm);
}

.poster-picker__apply-error {
  font-size: var(--text-sm);
  color: var(--accent-text, var(--text));
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
}

.poster-picker__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
}
.poster-picker__section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.poster-picker__section-title {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-subtle);
}

.poster-picker__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}
@media (min-width: 640px) {
  .poster-picker__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.poster-picker__cell {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.poster-picker__thumb {
  position: relative;
  aspect-ratio: 2 / 3;
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--surface-3);
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color var(--dur-base) var(--ease-out),
    transform var(--dur-fast) var(--ease-spring),
    box-shadow var(--dur-base) var(--ease-out);
  padding: 0;
}
.poster-picker__thumb:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.poster-picker__thumb:hover:not(:disabled) {
  transform: scale(1.04);
  box-shadow: var(--shadow-3);
}
.poster-picker__thumb.is-current {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent);
}
.poster-picker__thumb.is-active:not(.is-current) {
  border-color: var(--border-strong);
}
.poster-picker__thumb.is-applying {
  opacity: 0.6;
}
.poster-picker__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.poster-picker__thumb-fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--text-subtle);
}

.poster-picker__meta {
  text-align: center;
  font-size: var(--text-2xs);
  color: var(--text-subtle);
}

@media (prefers-reduced-motion: reduce) {
  .poster-picker__thumb {
    transition: none;
  }
  .poster-picker__thumb:hover:not(:disabled) {
    transform: none;
  }
}
</style>
