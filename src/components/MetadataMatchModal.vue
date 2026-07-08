<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * MetadataMatchModal (U5) — admin-only interactive metadata matcher for ONE item.
 *
 * Opened from a media card action or the detail/series page, it lets an admin
 * fix a wrong/unmatched item by searching TMDB and applying a chosen result:
 *  (a) on open it auto-searches using the item's own title/year (the server
 *      derives the `tv`/`movie` type from the item);
 *  (b) the admin can edit the query + optional year and re-search manually;
 *  (c) picking a result applies it (`match/apply`), and on success emits the
 *      re-shaped item so the host can refresh the poster/metadata in place.
 *
 * Built on the shared `Modal` (focus-trap + Esc + backdrop close come for free).
 * It owns loading / empty / error states and surfaces the server's
 * `422 metadata.tmdb_unconfigured` as a clear "configure a TMDB API key" message.
 * The API goes through the auth store's `ApiClient` (admin-gated server-side);
 * the trigger that opens this is itself gated on `isAdmin` by the host.
 */
import { ref, watch, computed, onBeforeUnmount } from 'vue';
import type { MediaItem } from '../types/media-item';
import {
  ApiError,
  isTmdbUnconfigured,
  type MatchCandidate,
  type MatchApplyResult,
  type MatchContext,
} from '../api/client';
import { errMessage } from '../api/errors';
import { useAuthStore } from '../stores/useAuthStore';
import Modal from './ui/Modal.vue';
import Button from './ui/Button.vue';
import Icon from './Icon.vue';
import Spinner from './ui/Spinner.vue';

const props = defineProps<{
  /** Two-way open state (drives the underlying Modal). */
  modelValue: boolean;
  /** The item being matched. Null is tolerated (modal renders nothing useful). */
  item: MediaItem | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  /** Emitted with the re-shaped item after a successful apply. */
  (e: 'applied', item: MediaItem): void;
}>();

const auth = useAuthStore();

const query = ref('');
const year = ref('');
const results = ref<MatchCandidate[]>([]);
const searching = ref(false);
const searched = ref(false);
const error = ref<string | null>(null);
const unconfigured = ref(false);
/** tmdb_id currently being applied (drives the per-row busy state). */
const applyingId = ref<string | null>(null);
const applyError = ref<string | null>(null);
const matchContext = ref<MatchContext | null>(null);
const queryDirty = ref(false);

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
});

// In-flight search controller — each search() aborts the previous one and guards
// its own result against being superseded (the house pattern from
// MediaDetailPage.vue's loadSeasons/loadSimilar). A slower earlier response can no
// longer clobber a newer search's state, and closing/unmounting aborts cleanly.
let searchController: AbortController | null = null;

function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pathBreadcrumb(path: string): string {
  const separator = ' › ';
  const segments = path.split(/[/\\]/);
  return segments.map((seg) => escapeHtml(seg)).join(separator);
}

/** A stable key for a candidate row (tmdb id + type — ids can repeat across types). */
function candidateKey(c: MatchCandidate): string {
  return `${c.type}:${c.tmdb_id}`;
}

function abortSearch(): void {
  searchController?.abort();
  searchController = null;
}

function resetState(): void {
  results.value = [];
  searching.value = false;
  searched.value = false;
  error.value = null;
  unconfigured.value = false;
  applyingId.value = null;
  applyError.value = null;
  matchContext.value = null;
  queryDirty.value = false;
}

/** Run a search (auto on open or manual from the form). */
async function search(): Promise<void> {
  if (!props.item) return;
  // Supersede any in-flight search, then become the current controller.
  searchController?.abort();
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  searchController = controller;
  const stale = (): boolean => searchController !== controller;

  searching.value = true;
  searched.value = true;
  error.value = null;
  unconfigured.value = false;
  applyError.value = null;
  try {
    const res = await auth.client.matchSearch(
      props.item.id,
      {
        query: query.value.trim() || undefined,
        year: year.value.trim() || undefined,
      },
      controller?.signal,
    );
    if (stale()) return; // a newer search (or a close) superseded this one
    results.value = res.results;
    matchContext.value = res.context ?? null;
    if (matchContext.value?.parsed_title && !queryDirty.value) {
      const newQuery = matchContext.value.parsed_title;
      if (query.value !== newQuery) {
        query.value = newQuery;
      }
    }
  } catch (e) {
    if (stale() || isAbort(e)) return; // superseded / aborted — leave state to the winner
    results.value = [];
    if (isTmdbUnconfigured(e)) {
      unconfigured.value = true;
    } else {
      error.value = errMessage(e, 'Search failed. Please try again.');
    }
  } finally {
    if (!stale()) searching.value = false;
  }
}

function onSubmit(): void {
  void search();
}

function onQueryInput(): void {
  const itemName = props.item?.name ?? '';
  queryDirty.value = query.value !== itemName;
}

/** Apply a candidate, then emit the re-shaped item + close. */
async function applyCandidate(c: MatchCandidate): Promise<void> {
  if (!props.item || applyingId.value) return;
  applyingId.value = candidateKey(c);
  applyError.value = null;
  try {
    const res: MatchApplyResult<MediaItem> = await auth.client.matchApply<MediaItem>(props.item.id, {
      tmdb_id: c.tmdb_id,
      type: c.type,
    });
    emit('applied', res.item);
    open.value = false;
  } catch (e) {
    if (isTmdbUnconfigured(e)) {
      unconfigured.value = true;
    } else if (e instanceof ApiError && e.status === 422) {
      applyError.value = 'No match details were found for that result. Try another.';
    } else {
      applyError.value = errMessage(e, 'Could not apply that match. Please try again.');
    }
  } finally {
    applyingId.value = null;
  }
}

// Prime the form from the item + auto-search each time the modal opens. Closing
// resets state so the next open starts clean (and a re-open re-searches).
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.item) {
      resetState();
      query.value = props.item.name ?? '';
      year.value = props.item.year != null ? String(props.item.year) : '';
      void search();
    } else if (!isOpen) {
      // Abort any in-flight search BEFORE resetting so a late response can't
      // resurrect state after close (its `stale()` guard now trips).
      abortSearch();
      resetState();
    }
  },
  { immediate: true },
);

onBeforeUnmount(abortSearch);
</script>

<template>
  <Modal v-model="open" title="Match metadata" size="lg">
    <div class="match-modal">
      <p v-if="item" class="match-modal__subject">
        Find the right TMDB entry for
        <strong>{{ item.name }}</strong>
        <span v-if="item.year" class="numeric">({{ item.year }})</span>.
      </p>

      <form class="match-modal__form" @submit.prevent="onSubmit">
        <div class="match-modal__field match-modal__field--query">
          <label class="match-modal__label" for="match-query">Search</label>
          <input
            id="match-query"
            v-model="query"
            type="text"
            class="match-modal__input"
            placeholder="Title to search for"
            autocomplete="off"
            @input="onQueryInput"
          />
        </div>
        <div class="match-modal__field match-modal__field--year">
          <label class="match-modal__label" for="match-year">Year</label>
          <input
            id="match-year"
            v-model="year"
            type="text"
            inputmode="numeric"
            class="match-modal__input numeric"
            placeholder="Any"
            autocomplete="off"
          />
        </div>
        <Button type="submit" variant="solid" left-icon="search" :loading="searching">Search</Button>
      </form>

      <details v-if="matchContext && (matchContext.original_filename || matchContext.path || (matchContext.tags && Object.keys(matchContext.tags).length))" class="match-modal__source">
        <summary class="match-modal__source-summary">Source info</summary>
        <div class="match-modal__source-body">
          <p v-if="matchContext.original_filename" class="match-modal__source-filename">
            <span class="match-modal__source-label">File:</span>
            <code>{{ matchContext.original_filename }}</code>
          </p>
          <p v-if="matchContext.path" class="match-modal__source-path" :title="matchContext.path">
            <span class="match-modal__source-label">Path:</span>
            <span v-html="pathBreadcrumb(matchContext.path)" />
          </p>
          <dl v-if="matchContext.tags && Object.keys(matchContext.tags).length" class="match-modal__source-tags">
            <template v-for="(value, key) in matchContext.tags" :key="String(key)">
              <dt>{{ key }}</dt>
              <dd>{{ value }}</dd>
            </template>
          </dl>
        </div>
      </details>

      <!-- TMDB not configured -->
      <div v-if="unconfigured" class="match-modal__state" role="status">
        <Icon name="alert" class="match-modal__state-icon" />
        <p class="match-modal__state-title">TMDB is not configured</p>
        <p class="match-modal__state-hint">
          Configure a TMDB API key in admin settings to search for metadata matches.
        </p>
      </div>

      <!-- search error -->
      <div v-else-if="error" class="match-modal__state" role="alert">
        <Icon name="error" class="match-modal__state-icon" />
        <p class="match-modal__state-title">{{ error }}</p>
        <Button variant="outline" size="sm" left-icon="rewind" @click="onSubmit">Try again</Button>
      </div>

      <!-- loading -->
      <div v-else-if="searching" class="match-modal__loading" role="status" aria-busy="true">
        <Spinner label="Searching TMDB" />
      </div>

      <!-- empty -->
      <div v-else-if="searched && results.length === 0" class="match-modal__state" role="status">
        <Icon name="search" class="match-modal__state-icon" />
        <p class="match-modal__state-title">No results found</p>
        <p class="match-modal__state-hint">Try a different title or clear the year.</p>
      </div>

      <!-- results -->
      <template v-else-if="results.length">
        <p v-if="applyError" class="match-modal__apply-error" role="alert">{{ applyError }}</p>
        <ul class="match-modal__results">
          <li v-for="c in results" :key="candidateKey(c)" class="match-modal__result">
            <div class="match-modal__poster">
              <img
                v-if="c.poster_url"
                :src="c.poster_url"
                :alt="c.title"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="match-modal__poster-fallback" aria-hidden="true">
                <Icon :name="c.type === 'tv' ? 'tv' : 'film'" />
              </div>
            </div>
            <div class="match-modal__result-body">
              <p class="match-modal__result-title">
                {{ c.title }}
                <span v-if="c.year" class="match-modal__result-year numeric">{{ c.year }}</span>
                <span class="match-modal__result-type">{{ c.type }}</span>
              </p>
              <p v-if="c.overview" class="match-modal__result-overview">{{ c.overview }}</p>
            </div>
            <Button
              variant="solid"
              size="sm"
              :loading="applyingId === candidateKey(c)"
              :disabled="applyingId !== null && applyingId !== candidateKey(c)"
              @click="applyCandidate(c)"
            >
              Use this
            </Button>
          </li>
        </ul>
      </template>
    </div>
  </Modal>
</template>

<style scoped>
.match-modal {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  color: var(--text);
}
.match-modal__subject {
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.match-modal__subject .numeric {
  margin-left: var(--space-1);
}

.match-modal__form {
  display: flex;
  align-items: flex-end;
  gap: var(--space-3);
}
.match-modal__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.match-modal__field--query {
  flex: 1;
}
.match-modal__field--year {
  width: 6rem;
}
.match-modal__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
}
.match-modal__input {
  width: 100%;
  height: var(--control-h);
  padding-inline: var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  font-size: var(--text-sm);
}
.match-modal__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-ring);
}

.match-modal__loading {
  display: flex;
  justify-content: center;
  padding: var(--space-8) 0;
}

.match-modal__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-8) var(--space-4);
  text-align: center;
  color: var(--text-subtle);
}
.match-modal__state-icon {
  width: 32px;
  height: 32px;
  opacity: 0.6;
}
.match-modal__state-title {
  font-weight: var(--font-semibold);
  color: var(--text-muted);
}
.match-modal__state-hint {
  font-size: var(--text-sm);
}

.match-modal__apply-error {
  font-size: var(--text-sm);
  color: var(--accent-text, var(--text));
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
}

.match-modal__results {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}
.match-modal__result {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
}
.match-modal__poster {
  flex-shrink: 0;
  width: 48px;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--surface-3);
}
.match-modal__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.match-modal__poster-fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--text-subtle);
}
.match-modal__result-body {
  flex: 1;
  min-width: 0;
}
.match-modal__result-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
}
.match-modal__result-year {
  color: var(--text-subtle);
  font-weight: var(--font-regular, 400);
}
.match-modal__result-type {
  font-size: var(--text-2xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-subtle);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  padding: 0 var(--space-2);
}
.match-modal__result-overview {
  margin-top: var(--space-1);
  font-size: var(--text-xs);
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.match-modal__source {
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
}
.match-modal__source-summary {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  cursor: pointer;
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.match-modal__source-summary::before {
  content: '▶';
  font-size: var(--text-2xs);
  transition: transform 0.15s;
}
.match-modal__source[open] .match-modal__source-summary::before {
  transform: rotate(90deg);
}
.match-modal__source-body {
  margin-top: var(--space-2);
  padding-top: var(--space-2);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.match-modal__source-label {
  font-size: var(--text-2xs);
  font-weight: var(--font-semibold);
  color: var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-right: var(--space-2);
}
.match-modal__source-filename code {
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
  font-size: var(--text-xs);
  color: var(--text-muted);
}
.match-modal__source-path {
  font-size: var(--text-xs);
  color: var(--text-muted);
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}
.match-modal__source-tags {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
}
.match-modal__source-tags dt {
  color: var(--text-subtle);
  font-weight: var(--font-semibold);
}
.match-modal__source-tags dd {
  color: var(--text-muted);
  margin: 0;
}
</style>
