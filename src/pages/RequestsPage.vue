<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 -->

<script setup lang="ts">
/**
 * RequestsPage (D-HUB-1) — the hub's media-requests page, replacing the
 * Smarty-rendered requests.tpl with a Vue page powered by Nocturne tokens +
 * `@phlix/ui` primitives.
 *
 * S519 / AD-16: debounced (500 ms, drop-superseded) search +
 * status filter over the loaded `HubRequest[]`, and one-promise-source load hygiene
 * (sequence-guarded so a late create/delete reload cannot clobber a newer result).
 * No server surface added (era law) and no request-list cache fabricated — AD-17's
 * `caches.open` artwork layer does not exist in `@phlix/ui` and the bounded
 * `useMediaItemCache` (perf-claim-5 JSON) is deliberately untouched.
 *
 * Data flows (API contract — DO NOT MODIFY):
 *   - GET    /api/v1/me/requests        → { requests[], count }
 *   - POST   /api/v1/me/requests        → { request, message }  201
 *   - DELETE /api/v1/me/requests/{id}  → 204 No Content
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton.
 */
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { api, ApiClient } from '../api/client';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import type { HubRequest, CreateRequestInput } from '../types/request';
import { debounce, REQUEST_SEARCH_DEBOUNCE_MS } from '../utils/debounce';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import PageHint from '../components/ui/PageHint.vue';
import { hubPageHelp } from './hubHelpLinks';
import Modal from '../components/ui/Modal.vue';
import Input from '../components/ui/Input.vue';
import { useImageSrc } from '../composables/useImageSrc';

/** S241: image URLs in a media payload are ROOT-RELATIVE server paths (`/api/v1/artwork/…`),
 *  so bound verbatim they resolve against the HUB origin instead of the selected server's
 *  relay-proxy base. Resolve every image binding through this seam; absolute CDN URLs and
 *  `blob:`/`data:` values pass through byte-for-byte. */
const { imgSrc } = useImageSrc();

const props = defineProps<{
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get' | 'post' | 'delete'> = props.client ?? api;
const toasts = useToastStore();

const requests = ref<HubRequest[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showCreateModal = ref(false);

// Create-form state
const formType = ref<'movie' | 'series'>('movie');
const formTmdbId = ref<number | string>('');
const formTitle = ref('');
const formPosterUrl = ref('');
const formSeason = ref<number | string>('');
const formEpisode = ref<number | string>('');
const submitting = ref(false);

// ── S519 / AD-16: debounced search + status filter on the requests list ──────
// The list is already fetched in full from `GET /api/v1/me/requests`, so filtering
// is a pure client-side pass over the loaded rows — no new server surface (era law).
// `searchInput` holds raw keystrokes; `searchQuery` holds the DEBOUNCED value the
// filter actually reads. `debounce` owns one timer and supersedes any in-flight fire,
// so a burst of typing recomputes the list once, after it settles — never per
// character (the AD-16 "no boolean soup/flicker" contract).
const searchInput = ref('');
const searchQuery = ref('');
type StatusFilter = 'all' | HubRequest['status'];
const statusFilter = ref<StatusFilter>('all');

const applySearch = debounce((raw: string): void => {
  searchQuery.value = raw.trim().toLowerCase();
}, REQUEST_SEARCH_DEBOUNCE_MS);

watch(searchInput, (v) => applySearch(v));

/** True when either filter would hide rows the user has loaded. */
const filtersActive = computed(
  () => searchQuery.value !== '' || statusFilter.value !== 'all',
);

/** Reset both filters (used by the no-matches empty state). */
function clearFilters(): void {
  applySearch.cancel(); // drop a keystroke that has not yet settled
  searchInput.value = '';
  searchQuery.value = '';
  statusFilter.value = 'all';
}

const sortedRequests = computed(() =>
  [...requests.value].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  ),
);

/** The rendered list: `sortedRequests` narrowed by the debounced query + status. */
const filteredRequests = computed(() => {
  const q = searchQuery.value;
  const status = statusFilter.value;
  return sortedRequests.value.filter((req) => {
    const matchesStatus = status === 'all' || req.status === status;
    const matchesQuery = q === '' || req.title.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });
});

/** Monotonic load counter — the "one promise source" identity for {@link loadRequests}. */
let loadSeq = 0;

/** Load requests. `initial` shows the full-page skeleton on mount/retry; the
 * after-delete/create reload updates the list in place so it doesn't flash out.
 *
 * AD-17 hygiene (no store, no cache): a create/delete reload can resolve AFTER a
 * newer load started, which would clobber the fresher result and re-flash rows the
 * user just acted on. Each call stamps a sequence number and a resolution is applied
 * ONLY while it is still the latest — a superseded late arrival is discarded silently.
 * Mirrors the repo's established `gen !== generation` discipline (useMediaStore,
 * MusicLibraryPage). */
async function loadRequests(initial = false): Promise<void> {
  const seq = ++loadSeq;
  if (initial) loading.value = true;
  error.value = null;
  try {
    const data = await http.get<{ requests?: HubRequest[]; count?: number }>('/api/v1/me/requests');
    if (seq !== loadSeq) return; // superseded by a newer load — discard the late arrival
    requests.value = data.requests ?? [];
  } catch (e) {
    if (seq !== loadSeq) return; // a newer load owns the UI now — don't surface a stale error
    error.value = errMessage(e, 'Failed to load requests.');
    toasts.error(error.value);
  } finally {
    if (initial && seq === loadSeq) loading.value = false;
  }
}

/** Create a new request, then refresh the list and close the modal. */
async function createRequest(): Promise<void> {
  if (!formTmdbId.value || !formTitle.value.trim()) return;
  submitting.value = true;
  try {
    const input: CreateRequestInput = {
      type: formType.value,
      tmdb_id: Number(formTmdbId.value),
      title: formTitle.value.trim(),
    };
    if (formPosterUrl.value.trim()) {
      input.poster_url = formPosterUrl.value.trim();
    }
    if (formType.value === 'series') {
      if (formSeason.value !== '') input.season = Number(formSeason.value);
      if (formEpisode.value !== '') input.episode = Number(formEpisode.value);
    }
    await http.post('/api/v1/me/requests', input);
    toasts.success('Request submitted.');
    resetForm();
    showCreateModal.value = false;
    await loadRequests();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to submit request.'));
  } finally {
    submitting.value = false;
  }
}

/** Delete an own request, then refresh the list. */
async function deleteRequest(id: string): Promise<void> {
  try {
    await http.delete(`/api/v1/me/requests/${id}`);
    toasts.success('Request deleted.');
    await loadRequests();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete request.'));
  }
}

function resetForm(): void {
  formType.value = 'movie';
  formTmdbId.value = '';
  formTitle.value = '';
  formPosterUrl.value = '';
  formSeason.value = '';
  formEpisode.value = '';
}

/** Badge tone + label for a request type. */
function typeBadge(type: string): { tone: 'info' | 'accent'; label: string } {
  return type === 'series'
    ? { tone: 'info', label: 'Series' }
    : { tone: 'accent', label: 'Movie' };
}

/** Bold committed color for each status — follows the 5-pillar philosophy. */
function statusBadge(
  status: string,
): { tone: 'warning' | 'info' | 'success' | 'error' | 'neutral'; label: string } {
  switch (status) {
    case 'pending':
      return { tone: 'warning', label: 'Pending' };
    case 'approved':
      return { tone: 'info', label: 'Approved' };
    case 'available':
      return { tone: 'success', label: 'Available' };
    case 'rejected':
      return { tone: 'error', label: 'Rejected' };
    default:
      return { tone: 'neutral', label: status };
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString();
}

onMounted(() => loadRequests(true));
// Drop any pending debounce fire when the page unmounts so a late keystroke cannot
// write to a torn-down instance.
onUnmounted(() => applySearch.cancel());
</script>

<template>
  <section class="requests" aria-labelledby="requests-heading">
    <header class="requests__head">
      <div class="requests__head-text">
        <h1 id="requests-heading" class="requests__title">Media Requests</h1>
        <p class="requests__subtitle">Request movies or TV series to be added to your library.</p>
      </div>
      <Button variant="solid" size="sm" @click="showCreateModal = true">New Request</Button>
    </header>

    <PageHint :links="hubPageHelp.requests.links" :details="hubPageHelp.requests.details">
      Ask a server owner to add a specific movie or show. <strong>New Request</strong> takes
      the title and its TMDB id; a request moves from Pending to Approved or Rejected as the
      owner acts on it. Requesting something does not download it.
    </PageHint>

    <div v-if="loading" class="requests__skel"><Skeleton variant="text" :lines="6" /></div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load requests"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadRequests(true)">Retry</Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="requests.length === 0"
      icon="film"
      title="No requests yet"
      description="Movies or series you request will appear here."
    />

    <!-- Populated: search/filter toolbar, then either the matched cards or a no-matches state. -->
    <template v-else>
      <div class="requests__toolbar">
        <Input
          v-model="searchInput"
          class="requests__search"
          label="Search requests"
          type="search"
          placeholder="Filter by title…"
        />
        <div class="requests__filter-group">
          <label class="requests__filter-label" for="requests-status">Status</label>
          <select id="requests-status" v-model="statusFilter" class="requests__filter">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="available">Available</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <p v-if="filtersActive" class="requests__count" role="status">
          {{ filteredRequests.length }} of {{ requests.length }} shown
        </p>
      </div>

      <EmptyState
        v-if="filteredRequests.length === 0"
        icon="search"
        title="No matching requests"
        description="Nothing matches your search or filter. Try clearing them."
      >
        <template #actions>
          <Button variant="ghost" size="sm" @click="clearFilters">Clear filters</Button>
        </template>
      </EmptyState>

      <div v-else class="requests__list">
      <article
        v-for="req in filteredRequests"
        :key="req.id"
        class="request-card"
      >
        <div class="request-card__poster" aria-hidden="true">
          <img
            v-if="req.poster_url"
            :src="imgSrc(req.poster_url)"
            :alt="req.title"
            class="request-card__poster-img"
            loading="lazy"
          />
          <div v-else class="request-card__poster-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        </div>

        <div class="request-card__body">
          <div class="request-card__title-row">
            <h2 class="request-card__title">{{ req.title }}</h2>
            <div class="request-card__badges">
              <Badge :tone="typeBadge(req.type).tone">{{ typeBadge(req.type).label }}</Badge>
              <Badge :tone="statusBadge(req.status).tone">{{ statusBadge(req.status).label }}</Badge>
            </div>
          </div>

          <div class="request-card__meta">
            <span class="request-card__tmdb">TMDB {{ req.tmdb_id }}</span>
            <span v-if="req.type === 'series'" class="request-card__episode">
              S{{ String(req.season).padStart(2, '0') }}E{{ String(req.episode).padStart(2, '0') }}
            </span>
            <span class="request-card__date">Submitted {{ formatDate(req.created_at) }}</span>
          </div>

          <p v-if="req.status === 'rejected' && req.rejection_reason" class="request-card__rejection">
            {{ req.rejection_reason }}
          </p>
        </div>

        <div class="request-card__actions">
          <Button
            variant="ghost"
            size="sm"
            :aria-label="`Delete request for ${req.title}`"
            @click="deleteRequest(req.id)"
          >
            Delete
          </Button>
        </div>
      </article>
      </div>
    </template>

    <!-- Create Request Modal -->
    <Modal v-model="showCreateModal" title="New Media Request" size="md" @close="resetForm">
      <form class="request-form" @submit.prevent="createRequest">
        <div class="request-form__row">
          <div class="request-form__field">
            <label class="request-form__label" for="req-type">Type</label>
            <select
              id="req-type"
              v-model="formType"
              class="request-form__select"
            >
              <option value="movie">Movie</option>
              <option value="series">TV Series</option>
            </select>
          </div>

          <div class="request-form__field">
            <Input
              v-model="formTmdbId"
              label="TMDB ID"
              type="number"
              placeholder="e.g. 550"
              :min="1"
            />
          </div>
        </div>

        <div class="request-form__field">
          <Input
            v-model="formTitle"
            label="Title"
            type="text"
            placeholder="e.g. The Matrix"
          />
        </div>

        <div class="request-form__field">
          <Input
            v-model="formPosterUrl"
            label="Poster URL (optional)"
            type="text"
            placeholder="https://image.tmdb.org/t/p/w500/..."
          />
        </div>

        <template v-if="formType === 'series'">
          <div class="request-form__row">
            <div class="request-form__field">
              <Input
                v-model="formSeason"
                label="Season"
                type="number"
                placeholder="e.g. 1"
                :min="1"
              />
            </div>

            <div class="request-form__field">
              <Input
                v-model="formEpisode"
                label="Episode"
                type="number"
                placeholder="e.g. 1"
                :min="1"
              />
            </div>
          </div>
        </template>
      </form>

      <template #footer>
        <Button variant="ghost" size="sm" @click="showCreateModal = false; resetForm()">
          Cancel
        </Button>
        <Button
          variant="solid"
          size="sm"
          :disabled="!formTmdbId || !formTitle.trim() || submitting"
          :loading="submitting"
          @click="createRequest"
        >
          Submit Request
        </Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.requests {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-6);
}
.requests__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.requests__head-text { flex: 1; }
.requests__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-1);
}
.requests__subtitle {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin: 0;
}
.requests__skel { padding-block: var(--space-2); }

/* ── Search / filter toolbar (S519 / AD-16) ────────── */
.requests__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.requests__search { flex: 1 1 14rem; min-width: 0; }
.requests__filter-group { display: flex; flex-direction: column; gap: var(--space-1); }
.requests__filter-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text);
}
.requests__filter {
  display: block;
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-out);
}
.requests__filter:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.requests__count {
  margin: 0 0 var(--space-1);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  font-variant-numeric: tabular-nums;
}

/* ── Request list ─────────────────────────────────── */
.requests__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.request-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  transition: border-color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out);
}
.request-card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-2);
}

/* ── Poster thumbnail ──────────────────────────────── */
.request-card__poster {
  flex-shrink: 0;
  width: 3.5rem;
  height: 5rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--surface-glass-strong);
}
.request-card__poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.request-card__poster-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--text-subtle);
}
.request-card__poster-placeholder svg {
  width: 1.5rem;
  height: 1.5rem;
}

/* ── Card body ────────────────────────────────────── */
.request-card__body { flex: 1; min-width: 0; }
.request-card__title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-1);
}
.request-card__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.request-card__badges {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
}
.request-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  font-variant-numeric: tabular-nums;
}
.request-card__tmdb {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
}
.request-card__rejection {
  margin: var(--space-2) 0 0;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  color: var(--error);
  background: var(--error-bg);
  border-radius: var(--radius-sm);
  border: 1px solid color-mix(in srgb, var(--error) 25%, transparent);
}

/* ── Actions ─────────────────────────────────────── */
.request-card__actions { flex-shrink: 0; }

/* ── Create modal form ────────────────────────────── */
.request-form { display: flex; flex-direction: column; gap: var(--space-4); }
.request-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
.request-form__field { display: flex; flex-direction: column; gap: var(--space-1); }
.request-form__label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text);
}
.request-form__select {
  display: block;
  width: 100%;
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-out);
}
.request-form__select:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
</style>
