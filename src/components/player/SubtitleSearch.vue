<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SubtitleSearch (Wave 3 F3) — on-demand "add subtitles" flow for the player.
 *
 * Opened from the captions menu ("Add subtitles…") when the item lacks a track in
 * the desired language. Presents a language picker (multi-select, pre-seeded with
 * the user's preferred + UI languages), a Search action that calls
 * `ApiClient.searchSubtitles`, and a ranked candidate list. Each candidate's Add
 * action calls `ApiClient.downloadSubtitle`; on success the returned track is
 * parsed and emitted (`added`) so the Player can render it as a `<track>` and make
 * it selectable, plus a success toast. Quota (429) / not-found (404) / other
 * failures surface as clear, friendly toasts.
 *
 * Self-contained: it owns its network client (constructed from `apiBase`, or an
 * injected `client` for tests), its search/download state, and double-submit
 * guards. It renders inside the shared focus-trapped, Esc/backdrop-dismissible
 * Modal, so the candidate list is keyboard-navigable out of the box.
 */
import { computed, ref, watch } from 'vue';
import Modal from '../ui/Modal.vue';
import Button from '../ui/Button.vue';
import Chip from '../ui/Chip.vue';
import Spinner from '../ui/Spinner.vue';
import Badge from '../ui/Badge.vue';
import EmptyState from '../ui/EmptyState.vue';
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';
import { useToastStore } from '../../stores/useToastStore';
import { ApiClient, ApiError, type SubtitleCandidate } from '../../api/client';
import { parseSubtitleTracks, type SubtitleTrack } from './transcode';

const props = withDefaults(
  defineProps<{
    /** Modal open state (v-model:open). */
    open?: boolean;
    /** Media item id the subtitles are searched/downloaded for. */
    mediaId: string;
    /** API base for the subtitle endpoints (same as the Player's transcode base). */
    apiBase?: string;
    /** BCP-47 codes to pre-select in the language picker (preferred + UI + 'en'). */
    preferredLangs?: string[];
    /** Injected client for tests; when omitted a client is built from `apiBase`. */
    client?: ApiClient;
  }>(),
  { open: false, apiBase: '', preferredLangs: () => [], client: undefined },
);

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void;
  /** A subtitle was downloaded + attached — payload is the parsed track. */
  (e: 'added', track: SubtitleTrack): void;
}>();

const { t } = useMessages();
const toasts = useToastStore();

/** Common subtitle languages offered in the picker (BCP-47 short codes). */
const COMMON_LANGS = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'ja', 'ko', 'zh', 'ar'] as const;

/** Best-effort human language name (e.g. 'en' → "English"), guarded for envs
 *  without `Intl.DisplayNames`. */
function languageLabel(code: string): string {
  if (!code) return code;
  try {
    const DN = (Intl as { DisplayNames?: typeof Intl.DisplayNames }).DisplayNames;
    if (DN) return new DN(['en'], { type: 'language' }).of(code) ?? code;
  } catch {
    /* unsupported code / no ICU — fall through */
  }
  return code;
}

/** The full picker option set: the common list plus any preferred code not in it. */
const languageOptions = computed<string[]>(() => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const code of [...props.preferredLangs, ...COMMON_LANGS]) {
    const c = (code || '').toLowerCase();
    if (!c || seen.has(c)) continue;
    seen.add(c);
    out.push(c);
  }
  return out;
});

/** Currently-selected language codes (multi). Seeded from `preferredLangs`. */
const selected = ref<Set<string>>(new Set());

function seedSelection(): void {
  const next = new Set<string>();
  for (const code of props.preferredLangs) {
    const c = (code || '').toLowerCase();
    if (c) next.add(c);
  }
  if (next.size === 0) next.add('en'); // always give the user something to search
  selected.value = next;
}

function toggleLang(code: string): void {
  const next = new Set(selected.value);
  if (next.has(code)) next.delete(code);
  else next.add(code);
  selected.value = next;
}

const searching = ref(false);
const searched = ref(false);
const candidates = ref<SubtitleCandidate[]>([]);
/** provider:downloadId keys currently being downloaded (double-submit guard). */
const downloading = ref<Set<string>>(new Set());
/** provider:downloadId keys already added this session (button → done state). */
const added = ref<Set<string>>(new Set());

function candidateKey(c: SubtitleCandidate): string {
  return `${c.provider}:${c.downloadId}`;
}

/** Candidates sorted by the strongest ranking signals: rating, then popularity. */
const sortedCandidates = computed<SubtitleCandidate[]>(() =>
  [...candidates.value].sort((a, b) => b.rating - a.rating || b.downloadCount - a.downloadCount),
);

const canSearch = computed(() => selected.value.size > 0 && !searching.value);

function apiClient(): ApiClient {
  return props.client ?? new ApiClient({ baseUrl: props.apiBase ?? '' });
}

async function runSearch(): Promise<void> {
  if (!canSearch.value) return;
  searching.value = true;
  searched.value = true;
  try {
    candidates.value = await apiClient().searchSubtitles(props.mediaId, [...selected.value]);
  } catch {
    candidates.value = [];
    toasts.error(t('player.subtitleSearchError'));
  } finally {
    searching.value = false;
  }
}

function close(): void {
  emit('update:open', false);
}

/** Map a failed download to a clear, friendly toast (quota-aware). */
function reportDownloadError(e: unknown): void {
  if (e instanceof ApiError) {
    if (e.status === 429) {
      const body = (e.body && typeof e.body === 'object' ? e.body : {}) as {
        downloadsRemaining?: unknown;
        resetTimeUtc?: unknown;
      };
      const remaining =
        typeof body.downloadsRemaining === 'number' ? body.downloadsRemaining : null;
      const reset = typeof body.resetTimeUtc === 'string' ? body.resetTimeUtc : null;
      if (reset) {
        toasts.warning(t('player.subtitleQuotaReset', { time: formatReset(reset) }));
      } else if (remaining !== null) {
        toasts.warning(t('player.subtitleQuotaRemaining', { count: remaining }));
      } else {
        toasts.warning(t('player.subtitleQuota'));
      }
      return;
    }
    if (e.status === 404) {
      toasts.error(t('player.subtitleAddNotFound'));
      return;
    }
  }
  toasts.error(t('player.subtitleAddError'));
}

/** Format an ISO reset timestamp to a local time string, degrading to the raw value. */
function formatReset(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

async function add(c: SubtitleCandidate): Promise<void> {
  const key = candidateKey(c);
  if (downloading.value.has(key) || added.value.has(key)) return; // guard double-submit
  const next = new Set(downloading.value);
  next.add(key);
  downloading.value = next;
  try {
    const res = await apiClient().downloadSubtitle(props.mediaId, {
      provider: c.provider,
      downloadId: c.downloadId,
      language: c.language,
      format: c.format || undefined,
      releaseName: c.releaseName || undefined,
      hearingImpaired: c.hearingImpaired,
    });
    const track = parseSubtitleTracks([res.track])[0];
    const doneKeys = new Set(added.value);
    doneKeys.add(key);
    added.value = doneKeys;
    const lang = languageLabel(c.language);
    toasts.success(lang ? t('player.subtitleAdded', { language: lang }) : t('player.subtitleAddedGeneric'));
    if (track) emit('added', track);
  } catch (e) {
    reportDownloadError(e);
  } finally {
    const rest = new Set(downloading.value);
    rest.delete(key);
    downloading.value = rest;
  }
}

// Reset the picker + results each time the modal opens (a fresh search per item).
watch(
  () => props.open,
  (v) => {
    if (!v) return;
    seedSelection();
    candidates.value = [];
    searched.value = false;
    searching.value = false;
    downloading.value = new Set();
    added.value = new Set();
  },
  { immediate: true },
);
</script>

<template>
  <Modal
    :model-value="open"
    :title="t('player.subtitleSearchTitle')"
    size="md"
    @update:model-value="(v) => emit('update:open', v)"
  >
    <div class="subsearch">
      <fieldset class="subsearch__langs">
        <legend class="subsearch__legend">{{ t('player.subtitleSearchLanguages') }}</legend>
        <div class="subsearch__chips">
          <Chip
            v-for="code in languageOptions"
            :key="code"
            :selected="selected.has(code)"
            size="md"
            :aria-label="languageLabel(code)"
            @update:selected="toggleLang(code)"
          >
            {{ languageLabel(code) }}
          </Chip>
        </div>
      </fieldset>

      <div class="subsearch__actions">
        <Button
          variant="solid"
          left-icon="search"
          :loading="searching"
          :disabled="!canSearch"
          @click="runSearch"
        >
          {{ t('player.subtitleSearchAction') }}
        </Button>
      </div>

      <!-- Searching -->
      <div v-if="searching" class="subsearch__status" role="status">
        <Spinner :label="t('player.subtitleSearching')" />
        <span>{{ t('player.subtitleSearching') }}</span>
      </div>

      <!-- Empty state (searched, no results) -->
      <EmptyState
        v-else-if="searched && sortedCandidates.length === 0"
        icon="captions"
        :title="t('player.subtitleSearchEmpty')"
        :description="t('player.subtitleSearchEmptyHint')"
      />

      <!-- Pre-search prompt -->
      <p v-else-if="!searched" class="subsearch__prompt">{{ t('player.subtitleSearchPrompt') }}</p>

      <!-- Candidate list -->
      <ul v-else class="subsearch__list">
        <li v-for="c in sortedCandidates" :key="candidateKey(c)" class="subsearch__item">
          <div class="subsearch__meta">
            <p class="subsearch__release">{{ c.releaseName || c.provider }}</p>
            <div class="subsearch__signals">
              <Badge tone="neutral" size="sm">{{ languageLabel(c.language) }}</Badge>
              <Badge v-if="c.hearingImpaired" tone="info" size="sm" :label="t('player.subtitleHearingImpairedFull')">
                {{ t('player.subtitleHearingImpaired') }}
              </Badge>
              <span class="subsearch__provider">{{ c.provider }}</span>
              <span v-if="c.rating > 0" class="subsearch__stat" :aria-label="t('player.subtitleRating', { rating: c.rating })">
                <Icon name="star" /> {{ c.rating }}
              </span>
              <span v-if="c.downloadCount > 0" class="subsearch__stat">{{ t('player.subtitleDownloads', { count: c.downloadCount }) }}</span>
              <span v-if="c.fps" class="subsearch__stat">{{ t('player.subtitleFps', { fps: c.fps }) }}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            :left-icon="added.has(candidateKey(c)) ? 'check' : 'plus'"
            :loading="downloading.has(candidateKey(c))"
            :disabled="downloading.has(candidateKey(c)) || added.has(candidateKey(c))"
            :aria-label="t('player.subtitleAddLabel', { release: c.releaseName || c.format || c.language, provider: c.provider })"
            @click="add(c)"
          >
            {{ downloading.has(candidateKey(c)) ? t('player.subtitleAdding') : t('player.subtitleAdd') }}
          </Button>
        </li>
      </ul>
    </div>

    <template #footer>
      <Button variant="ghost" @click="close">{{ t('common.close') }}</Button>
    </template>
  </Modal>
</template>

<style scoped>
.subsearch {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-width: min(28rem, 80vw);
}
.subsearch__langs {
  border: 0;
  margin: 0;
  padding: 0;
}
.subsearch__legend {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--space-2);
  padding: 0;
}
.subsearch__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.subsearch__actions {
  display: flex;
  justify-content: flex-start;
}
.subsearch__status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-muted);
  font-size: var(--text-sm);
  padding: var(--space-4) 0;
}
.subsearch__prompt {
  color: var(--text-muted);
  font-size: var(--text-sm);
  padding: var(--space-2) 0;
}
.subsearch__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  max-height: 42vh;
  overflow-y: auto;
}
.subsearch__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border: 1px solid var(--border-subtle, var(--border-strong));
}
.subsearch__meta {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.subsearch__release {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.subsearch__signals {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-muted);
}
.subsearch__provider {
  text-transform: capitalize;
}
.subsearch__stat {
  display: inline-flex;
  align-items: center;
  gap: 0.2em;
}
.subsearch__stat :deep(svg) {
  width: 0.9em;
  height: 0.9em;
}
</style>
