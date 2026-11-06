<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SearchPage (`/app/search`) — full search surface replacing the legacy Smarty
 * `/search` page (D-SRV-1). Renders a search input (auto-focused, pre-filled from
 * `?q=` URL param on mount), a virtualized results grid, loading skeleton on
 * initial search, and an empty state when no results are found.
 */
import { onMounted, watch, ref, computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import MediaGrid from '../components/MediaGrid.vue';
import MetadataMatchModal from '../components/MetadataMatchModal.vue';
import ItemDataInspector from '../components/ItemDataInspector.vue';
import PosterPicker from '../components/PosterPicker.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Spinner from '../components/ui/Spinner.vue';
import { useItemInspector } from '../composables/useItemInspector';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';
import { usePlayerStore } from '../stores/usePlayerStore';
import { resolvePlayable } from '../composables/useResolvePlayable';
import { wireErrorLine } from '../utils/wireErrors';
import { ApiClient } from '../api/client';
import { errMessage } from '../api/errors';
import { useMessages } from '../composables/useMessages';
import { debounce } from '../utils/debounce';
import { searchErrorCode, searchErrorInfo } from './searchErrors';
import type { PhlixAppConfig } from '../app/types';
import type { MediaItem } from '../types/media-item';

const route = useRoute();
const router = useRouter();
const apiBase = useMediaApiBase();
const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const userItemData = useUserItemDataStore();
const toasts = useToastStore();
const auth = useAuthStore();
const player = usePlayerStore();
const { t } = useMessages();

// --- search state -------------------------------------------------------
const query = ref<string>('');
const items = ref<MediaItem[]>([]);
/**
 * ui__webux M5 — the FULL server-side match count, separate from the capped
 * page in `items`. Null when the wire carries no usable number (a stale proxy
 * may omit it); the grid then sizes itself off the loaded count, exactly as it
 * did before this ref existed.
 */
const serverTotal = ref<number | null>(null);
const loading = ref(false);
/**
 * ui__webux M6 — the error card is classified through `searchErrors.ts`
 * (contracts error catalog, app locale), not the raw thrown text: a hub-relay
 * 503 carrying `server.offline` renders the localized card in every shipped
 * locale; a code-less failure keeps the pre-existing generic card + own message.
 */
const error = ref<{ title: string; description: string } | null>(null);
const hasSearched = ref(false);

// Debounce so we don't hammer the API on every keystroke. S524: the shared
// trailing-fire primitive (src/utils/debounce.ts) replaces the hand-rolled
// clearTimeout/setTimeout pair — same 300 ms window (passed explicitly; the
// module default is not used here), same one-timer supersede shared across
// @input and @submit. The old pair had NO unmount cancel and the S524
// zero-drift law keeps that status quo deliberately (pin: the pending fire
// survives unmount) — adding cancel() would change behavior, not migrate it.
const scheduleSearch = debounce(() => {
    // Update the URL with the new query without full navigation
    if (query.value.trim() === '') {
        router.replace({ query: {} });
    } else {
        router.replace({ query: { q: query.value.trim() } });
    }
    void doSearch();
}, 300);

async function doSearch(): Promise<void> {
    const q = query.value.trim();

    // Reset when query is cleared
    if (q === '') {
        items.value = [];
        serverTotal.value = null;
        hasSearched.value = false;
        error.value = null;
        return;
    }

    hasSearched.value = true;
    loading.value = true;
    error.value = null;

    try {
        const client = new ApiClient({ baseUrl: apiBase.value });
        const result = await client.get<{ items: MediaItem[]; query: string; total: number }>(
            '/api/v1/media/search',
            { q },
        );
        items.value = result.items ?? [];
        // ui__webux M5: trust-but-verify the wire count — a non-number (stale
        // proxy, changed shape) degrades to null instead of rendering "NaN".
        serverTotal.value =
            typeof result.total === 'number' && Number.isFinite(result.total) ? result.total : null;
        // Hydrate user item data so cards show favorite/watched state
        items.value.forEach((item) => userItemData.hydrate(item));
    } catch (e) {
        // ui__webux M6: classify through the contracts error catalog (see
        // searchErrors.ts) — raw wire/SQL text is never the user's headline.
        error.value = searchErrorInfo(searchErrorCode(e), errMessage(e), config?.locale);
        items.value = [];
        serverTotal.value = null;
    } finally {
        loading.value = false;
    }
}

// Auto-focus the input on mount
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
    // Pre-fill query from ?q= URL param
    const q = (route.query.q as string | undefined) ?? '';
    query.value = q;
    inputRef.value?.focus();
    if (q.trim() !== '') {
        void doSearch();
    }
});

// Re-run search when URL query changes (e.g. browser back/forward)
watch(
    () => route.query.q,
    (newQ) => {
        const q = (newQ as string | undefined) ?? '';
        if (q !== query.value) {
            query.value = q;
            if (q.trim() !== '') {
                void doSearch();
            } else {
                items.value = [];
                serverTotal.value = null;
                hasSearched.value = false;
            }
        }
    },
);

// Track if we should show the empty "no results" state vs. the prompt to search
const showNoResults = computed(
    () => hasSearched.value && !loading.value && items.value.length === 0 && error.value === null,
);
const showResults = computed(
    () => hasSearched.value && !loading.value && items.value.length > 0,
);
const showPrompt = computed(() => !hasSearched.value && query.value.trim() === '');
const showError = computed(() => hasSearched.value && error.value !== null);

// ui__webux M5 — when the wire knows there are more matches than the capped
// page carries, the list says so out loud: without this line a 25-of-400
// result set reads like the complete answer.
const showCapNotice = computed(
    () => serverTotal.value !== null && items.value.length < serverTotal.value,
);
const capNotice = computed(() =>
    serverTotal.value === null
        ? ''
        : t('search.showingOf', {
              shown: items.value.length.toLocaleString(),
              total: serverTotal.value.toLocaleString(),
          }),
);

// S324 — admin ⋯-menu metadata actions (S15's "every MediaCard host" AC; this
// host was the one S15's In-scope list omitted). "Edit metadata" opens the shared
// MetadataMatchModal (the same surface "Match metadata" uses — there is no
// separate editing API); "Explore item data" opens the read-only client-side
// inspector. Both produce visible UI here just like the other MediaCard hosts.
const matchTarget = ref<MediaItem | null>(null);
const matchOpen = ref(false);
const { inspectorItem, inspectorOpen, openInspector } = useItemInspector();

function onMatch(item: MediaItem): void {
  matchTarget.value = item;
  matchOpen.value = true;
}
function onMatchApplied(updated: MediaItem): void {
  items.value = items.value.map((i) => (i.id === updated.id ? updated : i));
  toasts.success(`Updated metadata for “${updated.name}”.`);
}

// CU-089 (ui__enduser #1): the results grid bound ONLY the admin metadata pair
// — every member-visible card action (Play, details, watchlist, watched) was
// dead on search results, the one surface where members actually hunt for
// something to watch. The handlers mirror BrowsePage's card-action protocol:
// resolve-then-navigate with abort-supersede for Play, store-state toasts for
// the self-toggled card actions, and the admin PosterPicker/Remove modals for
// the ⋯-menu's remaining commands.
function go(name: string, id: string): void {
  void router.push({ name, params: { id } }).catch(() => {});
}

let playController: AbortController | null = null;
function isAbort(e: unknown): boolean {
  return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

/**
 * Play a result card (BrowsePage Feature-9 protocol): a movie/episode/audio/
 * image plays as-is; a series/season resolves to the viewer's next-up / resume
 * episode via `resolvePlayable`. A rapid second Play supersedes the first —
 * the stale resolve's navigation is discarded. Nothing playable toasts.
 */
async function onPlay(item: MediaItem): Promise<void> {
  playController?.abort();
  const myController = typeof AbortController !== 'undefined' ? new AbortController() : null;
  playController = myController;
  const stale = (): boolean => myController !== playController;
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    const resolved = await resolvePlayable(
      client,
      apiBase.value,
      item,
      player.resumeMap,
      myController?.signal,
    );
    if (stale()) return;
    if (!resolved) {
      toasts.info(t('library.nothingToPlay'));
      return;
    }
    go('player', resolved.id);
  } catch (e) {
    if (stale() || isAbort(e)) return;
    toasts.info(t('library.nothingToPlay'));
  }
}

function onInfo(item: MediaItem): void {
  if (router.hasRoute('media')) go('media', item.id);
  else toasts.info(t('common.detailsUnavailable', { name: item.name }));
}

// The card ALREADY toggled the store optimistically before re-emitting
// (watchlist/mark-watched back-compat relay) — these handlers must NOT toggle
// again, they only report the resulting state (BrowsePage's law, verbatim).
function onWatchlist(item: MediaItem): void {
  if (userItemData.isFavorite(item.id)) {
    toasts.success(t('itemActions.addedToList', { name: item.name }));
  } else {
    toasts.info(t('itemActions.removedFromList', { name: item.name }));
  }
}
function onMarkWatched(item: MediaItem): void {
  if (userItemData.isWatched(item.id)) {
    toasts.success(`Marked “${item.name}” as watched.`);
  } else {
    toasts.info(`Marked “${item.name}” as unwatched.`);
  }
}

const posterPickerOpen = ref(false);
const posterPickerTarget = ref<MediaItem | null>(null);
function onChoosePoster(item: MediaItem): void {
  posterPickerTarget.value = item;
  posterPickerOpen.value = true;
}
function onPosterApplied(updated: MediaItem): void {
  items.value = items.value.map((i) => (i.id === updated.id ? updated : i));
  toasts.success(`Updated poster for “${updated.name}”.`);
}

/** R13-05-shape: the item pending removal — non-null arms the shared ConfirmDialog. */
const removeTarget = ref<MediaItem | null>(null);
function onRemove(item: MediaItem): void {
  removeTarget.value = item;
}
async function confirmRemove(): Promise<void> {
  const item = removeTarget.value;
  removeTarget.value = null;
  if (!item) return;
  try {
    const client = new ApiClient({ baseUrl: apiBase.value });
    await client.deleteMediaItem(item.id);
    items.value = items.value.filter((i) => i.id !== item.id);
    toasts.success(`Removed “${item.name}”.`);
  } catch (e) {
    toasts.error(`Failed to remove “${item.name}”.`, {
      // Wire-error law: catalog copy for registered codes, generic line for
      // raw server text, own message for typed client errors.
      message: wireErrorLine(e, 'Unknown error', config?.locale),
    });
  }
}
</script>

<template>
    <div class="search-page">
        <header class="search-header">
            <h1 class="search-title">Search</h1>
            <form
                class="search-form"
                @submit.prevent="scheduleSearch"
            >
                <input
                    ref="inputRef"
                    v-model="query"
                    type="search"
                    name="q"
                    :aria-label="t('search.inputLabel')"
                    placeholder="Search movies, shows, music, books..."
                    class="search-input"
                    autocomplete="off"
                    autofocus
                    @input="scheduleSearch"
                >
                <Button type="submit" variant="solid">
                    Search
                </Button>
            </form>
        </header>

        <!-- Loading skeleton -->
        <div v-if="loading" class="search-loading">
            <Spinner label="Searching…" />
        </div>

        <!-- Error state (ui__webux M6: title + description classified via searchErrors.ts) -->
        <EmptyState
            v-else-if="showError"
            icon="alert"
            :title="error?.title ?? 'Search failed'"
            :description="error?.description"
        >
            <template #actions>
                <Button variant="solid" size="sm" @click="doSearch">Retry</Button>
            </template>
        </EmptyState>

        <!-- No query yet — prompt the user -->
        <EmptyState
            v-else-if="showPrompt"
            icon="search"
            title="Search your library"
            description="Enter a query above to find movies, shows, music, books, and more."
        />

        <!-- No results found -->
        <EmptyState
            v-else-if="showNoResults"
            icon="film"
            :title="`No results for &quot;${query}&quot;`"
            description="Try a different spelling or fewer words."
        />

        <!-- Results grid -->
        <template v-else-if="showResults">
            <p v-if="showCapNotice" class="search-cap-notice">{{ capNotice }}</p>
            <MediaGrid
                :items="items"
                :total="serverTotal"
                :can-match="auth.isAdmin"
                @play="onPlay"
                @info="onInfo"
                @watchlist="onWatchlist"
                @mark-watched="onMarkWatched"
                @match="onMatch"
                @refresh="onMatch"
                @edit-metadata="onMatch"
                @explore-data="openInspector"
                @choose-poster="onChoosePoster"
                @remove="onRemove"
            />
        </template>

        <MetadataMatchModal
            v-if="auth.isAdmin"
            v-model="matchOpen"
            :item="matchTarget"
            @applied="onMatchApplied"
        />

        <ItemDataInspector v-if="auth.isAdmin" v-model="inspectorOpen" :item="inspectorItem" />

        <PosterPicker
            v-if="auth.isAdmin"
            v-model="posterPickerOpen"
            :item="posterPickerTarget"
            @applied="onPosterApplied"
        />

        <ConfirmDialog
            :open="removeTarget !== null"
            :message="removeTarget
                ? `Remove “${removeTarget.name}” from the library? This cannot be undone.`
                : ''"
            confirm-label="Remove"
            danger
            @update:open="(v: boolean) => { if (!v) removeTarget = null; }"
            @confirm="confirmRemove"
        />
    </div>
</template>

<style scoped>
.search-page {
    padding: var(--space-6);
    max-width: var(--content-max-width, 1400px);
    margin: 0 auto;
}

.search-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
}

.search-title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text);
    margin: 0;
}

.search-form {
    display: flex;
    gap: var(--space-3);
    align-items: center;
}

.search-input {
    flex: 1;
    height: 2.75rem;
    padding: 0 var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-1);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
}

.search-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-alpha);
}

.search-input::placeholder {
    color: var(--text-muted);
}

/* Hide the native search clear button */
.search-input::-webkit-search-cancel-button {
    -webkit-appearance: none;
}

.search-loading {
    display: flex;
    justify-content: center;
    padding: var(--space-12) 0;
}

/* ui__webux M5 — the cap line sits directly above the grid it qualifies. */
.search-cap-notice {
    margin: 0 0 var(--space-4);
    font-size: var(--text-sm);
    color: var(--text-muted);
}
</style>
