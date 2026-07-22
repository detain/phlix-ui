<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * FilterBar (R2.3) — the Browse filter surface.
 *
 * Ports the locked R0 art direction (`src/dev/mockups/browse-grid.html` filter
 * bar): a glassy sticky bar with a debounced search, an expand/collapse advanced
 * panel (genres via the searchable `Combobox`, rating/type `Chip` toggles, a year
 * range, sort + order), a row of removable **active-filter pills** with a live
 * **result count** and "clear all", and **saved presets** persisted through
 * `usePreferencesStore`. Native `<select>`s are gone — everything is the a11y
 * primitive layer. Filters live in `useMediaStore`; URL-sync is handled app-side
 * by `bindMediaStoreToRouter`. Reduced-motion safe; keyboard-operable throughout.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useMediaStore, type SortField, type SortOrder } from '../stores/useMediaStore';
import type { MediaType } from '../types/media-item';
import { usePreferencesStore, type FilterPreset } from '../stores/usePreferencesStore';
import Icon from './Icon.vue';
import Chip from './ui/Chip.vue';
import Combobox from './ui/Combobox.vue';
import Select from './ui/Select.vue';
import Badge from './ui/Badge.vue';

const props = withDefaults(
  defineProps<{
    /** Debounce (ms) before a typed search refetches. */
    searchDebounce?: number;
    /** Stick the bar to the top of the scroll container and condense on scroll. */
    sticky?: boolean;
    /** Offer the "Artist" sort (music libraries only). */
    showArtistSort?: boolean;
  }>(),
  { searchDebounce: 250, sticky: true, showArtistSort: false },
);

const emit = defineEmits<{
  /** Any committed filter change — the host refetches. */
  (e: 'change'): void;
}>();

const store = useMediaStore();
const prefs = usePreferencesStore();

const sortOptions = computed<{ value: SortField; label: string }[]>(() => [
  // Artist first for music libraries so it reads as the primary/default sort.
  ...(props.showArtistSort ? [{ value: 'artist' as SortField, label: 'Artist' }] : []),
  { value: 'name', label: 'Name' },
  { value: 'year', label: 'Year' },
  { value: 'rating', label: 'Rating' },
  { value: 'date_added', label: 'Date added' },
  { value: 'runtime', label: 'Runtime' },
  { value: 'genre', label: 'Genre' },
]);

// ---- search (debounced) -------------------------------------------------
const searchText = ref(store.search);
let searchTimer: ReturnType<typeof setTimeout> | undefined;
watch(
  () => store.search,
  (v) => {
    // Only sync external changes (preset apply, pill remove, URL) — comparing the
    // trimmed local value avoids clobbering an in-progress space the user typed.
    if (v !== searchText.value.trim()) searchText.value = v;
  },
);
function onSearchInput() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    store.setSearch(searchText.value.trim());
    emit('change');
  }, props.searchDebounce);
}
function clearSearch() {
  searchText.value = '';
  store.setSearch('');
  emit('change');
}

// ---- genres (Combobox add → pills) --------------------------------------
const genreToAdd = ref<string | null>(null);
/** Bumped after each add to remount the single-select Combobox with a fresh,
 *  empty query (a null→null modelValue can't reset its internal label). */
const genreComboKey = ref(0);
const genreOptions = computed(() =>
  store.availableGenres.filter((g) => !store.selectedGenres.includes(g)),
);
function addGenre(v: string | number | null) {
  if (v == null || v === '') return;
  const g = String(v);
  if (!store.selectedGenres.includes(g)) {
    store.setGenres([...store.selectedGenres, g]);
    emit('change');
  }
  genreToAdd.value = null; // reset the model
  genreComboKey.value++; // remount → clears the input label
}

// ---- chip toggles -------------------------------------------------------
function toggleRating(r: string) {
  const cur = store.selectedRatings;
  store.setRatings(cur.includes(r) ? cur.filter((x) => x !== r) : [...cur, r]);
  emit('change');
}
function toggleType(t: MediaType) {
  const cur = store.selectedTypes;
  store.setTypes(cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]);
  emit('change');
}
/** Match-status filter is single-select: clicking the active option clears it. */
const MATCH_OPTIONS = [
  { value: 'matched', label: 'Matched' },
  { value: 'unmatched', label: 'Unmatched' },
] as const;
function toggleMatch(v: 'matched' | 'unmatched') {
  store.setMatchStatus(store.matchStatus === v ? '' : v);
  emit('change');
}
function removeActor(a: string) {
  store.setActors(store.selectedActors.filter((x) => x !== a));
  emit('change');
}

// ---- year range ---------------------------------------------------------
const currentYear = computed(() => {
  // avoid Date in module scope; resolved lazily, falls back gracefully
  try {
    return new Date().getFullYear();
  } catch {
    return 2025;
  }
});
const yearOptions = computed(() => {
  const out: { value: number; label: string }[] = [];
  for (let y = currentYear.value; y >= 1900; y--) out.push({ value: y, label: String(y) });
  return out;
});
function setYearFrom(v: string | number | null) {
  store.setYearRange(v == null || v === '' ? undefined : Number(v), store.yearTo);
  emit('change');
}
function setYearTo(v: string | number | null) {
  store.setYearRange(store.yearFrom, v == null || v === '' ? undefined : Number(v));
  emit('change');
}

// ---- rating range -------------------------------------------------------
function setMinRating(v: number | null) {
  store.setMinRating(v == null ? undefined : Number(v));
  emit('change');
}
function setMaxRating(v: number | null) {
  store.setMaxRating(v == null ? undefined : Number(v));
  emit('change');
}

// ---- sort + order -------------------------------------------------------
function onSort(v: string | number) {
  store.setSort(v as SortField);
  emit('change');
}
function toggleOrder() {
  store.order = (store.order === 'asc' ? 'desc' : 'asc') as SortOrder;
  store.offset = 0;
  emit('change');
}

// ---- active-filter pills ------------------------------------------------
interface ActivePill {
  key: string;
  label: string;
  remove: () => void;
}
const activePills = computed<ActivePill[]>(() => {
  const pills: ActivePill[] = [];
  if (store.search) {
    pills.push({
      key: 'search',
      label: `“${store.search}”`,
      remove: clearSearch,
    });
  }
  store.selectedGenres.forEach((g) =>
    pills.push({
      key: `g:${g}`,
      label: g,
      remove: () => {
        store.setGenres(store.selectedGenres.filter((x) => x !== g));
        emit('change');
      },
    }),
  );
  store.selectedRatings.forEach((r) =>
    pills.push({ key: `r:${r}`, label: r, remove: () => toggleRating(r) }),
  );
  store.selectedTypes.forEach((t) =>
    pills.push({ key: `t:${t}`, label: t, remove: () => toggleType(t) }),
  );
  store.selectedActors.forEach((a) =>
    pills.push({ key: `a:${a}`, label: a, remove: () => removeActor(a) }),
  );
  if (store.matchStatus) {
    pills.push({
      key: 'match',
      label: store.matchStatus === 'matched' ? 'Matched' : 'Unmatched',
      remove: () => toggleMatch(store.matchStatus as 'matched' | 'unmatched'),
    });
  }
  if (store.yearFrom !== undefined) {
    pills.push({
      key: 'yf',
      label: `From ${store.yearFrom}`,
      remove: () => setYearFrom(null),
    });
  }
  if (store.yearTo !== undefined) {
    pills.push({ key: 'yt', label: `To ${store.yearTo}`, remove: () => setYearTo(null) });
  }
  if (store.minRating !== undefined) {
    pills.push({
      key: 'minR',
      label: `Min ${store.minRating.toFixed(1)}★`,
      remove: () => setMinRating(null),
    });
  }
  if (store.maxRating !== undefined) {
    pills.push({
      key: 'maxR',
      label: `Max ${store.maxRating.toFixed(1)}★`,
      remove: () => setMaxRating(null),
    });
  }
  return pills;
});
const hasActiveFilters = computed(() => activePills.value.length > 0);

/** Count of filters living in the advanced panel (drives the toggle badge). */
const advancedCount = computed(
  () =>
    store.selectedGenres.length +
    store.selectedRatings.length +
    store.selectedTypes.length +
    store.selectedActors.length +
    (store.matchStatus ? 1 : 0) +
    (store.yearFrom !== undefined ? 1 : 0) +
    (store.yearTo !== undefined ? 1 : 0) +
    (store.minRating !== undefined ? 1 : 0) +
    (store.maxRating !== undefined ? 1 : 0),
);

function clearAll() {
  searchText.value = '';
  store.setSearch('');
  store.setGenres([]);
  store.setRatings([]);
  store.setTypes([]);
  store.setActors([]);
  store.setMatchStatus('');
  store.setYearRange(undefined, undefined);
  store.setMinRating(undefined);
  store.setMaxRating(undefined);
  emit('change');
}

// ---- expand / collapse --------------------------------------------------
const expanded = ref(false);

// ---- presets ------------------------------------------------------------
const presets = computed(() => prefs.filterPresets);
const naming = ref(false);
const presetName = ref('');
function startSavePreset() {
  naming.value = true;
  presetName.value = '';
}
function confirmSavePreset() {
  const name = presetName.value.trim();
  if (!name) return;
  prefs.saveFilterPreset(name, store.toQuery());
  naming.value = false;
  presetName.value = '';
}
function applyPreset(p: FilterPreset) {
  store.applyQuery(p.query);
  searchText.value = store.search;
  emit('change');
}
function removePreset(p: FilterPreset) {
  prefs.removeFilterPreset(p.id);
}

// ---- sticky condensed mode ----------------------------------------------
const stuck = ref(false);
function onScroll() {
  if (typeof window === 'undefined') return;
  stuck.value = window.scrollY > 24;
}
onMounted(() => {
  if (props.sticky && typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
onBeforeUnmount(() => {
  clearTimeout(searchTimer);
  if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div class="filterbar" :class="{ 'is-sticky': sticky, 'is-stuck': sticky && stuck }">
    <!-- primary row: search · sort · order · filters toggle -->
    <div class="filterbar__main">
      <label class="filterbar__search">
        <Icon name="search" class="filterbar__search-icon" />
        <input
          v-model="searchText"
          type="search"
          class="filterbar__search-input"
          placeholder="Search titles, people, genres…"
          aria-label="Search media"
          @input="onSearchInput"
        />
        <button
          v-if="searchText"
          type="button"
          class="filterbar__search-clear"
          aria-label="Clear search"
          @click="clearSearch"
        >
          <Icon name="x" />
        </button>
      </label>

      <div class="filterbar__sort">
        <Select
          :model-value="store.sort"
          :options="sortOptions"
          label="Sort by"
          @update:model-value="onSort"
        />
        <button
          type="button"
          class="filterbar__order"
          :aria-label="`Sort ${store.order === 'asc' ? 'ascending' : 'descending'}`"
          @click="toggleOrder"
        >
          <Icon :name="store.order === 'asc' ? 'arrow-up' : 'arrow-down'" />
        </button>
      </div>

      <button
        type="button"
        class="filterbar__toggle"
        :aria-expanded="expanded"
        @click="expanded = !expanded"
      >
        <Icon name="filter" />
        <span>Filters</span>
        <Badge v-if="advancedCount" class="filterbar__toggle-badge">{{ advancedCount }}</Badge>
        <Icon :name="expanded ? 'chevron-up' : 'chevron-down'" class="filterbar__toggle-caret" />
      </button>
    </div>

    <!-- advanced panel -->
    <Transition name="filterbar-panel">
      <div v-show="expanded" class="filterbar__advanced">
        <div class="filterbar__field">
          <span class="filterbar__field-label">Genres</span>
          <Combobox
            :key="genreComboKey"
            :model-value="genreToAdd"
            :options="genreOptions"
            placeholder="Add a genre…"
            @update:model-value="addGenre"
          />
        </div>

        <div class="filterbar__field">
          <span class="filterbar__field-label">Rating</span>
          <div class="filterbar__chips" role="group" aria-label="Rating">
            <Chip
              v-for="r in store.availableRatings"
              :key="r"
              :selected="store.selectedRatings.includes(r)"
              @update:selected="toggleRating(r)"
            >
              {{ r }}
            </Chip>
          </div>
        </div>

        <div class="filterbar__field">
          <span class="filterbar__field-label">Type</span>
          <div class="filterbar__chips" role="group" aria-label="Type">
            <Chip
              v-for="t in store.availableTypes"
              :key="t"
              :selected="store.selectedTypes.includes(t)"
              @update:selected="toggleType(t)"
            >
              {{ t }}
            </Chip>
          </div>
        </div>

        <div class="filterbar__field">
          <span class="filterbar__field-label">Metadata</span>
          <div class="filterbar__chips" role="group" aria-label="Metadata match status">
            <Chip
              v-for="m in MATCH_OPTIONS"
              :key="m.value"
              :selected="store.matchStatus === m.value"
              @update:selected="toggleMatch(m.value)"
            >
              {{ m.label }}
            </Chip>
          </div>
        </div>

        <div class="filterbar__field">
          <span class="filterbar__field-label">Year</span>
          <div class="filterbar__years">
            <Combobox
              :model-value="store.yearFrom ?? null"
              :options="yearOptions"
              placeholder="From"
              label="Year from"
              @update:model-value="setYearFrom"
            />
            <span class="filterbar__years-dash" aria-hidden="true">–</span>
            <Combobox
              :model-value="store.yearTo ?? null"
              :options="yearOptions"
              placeholder="To"
              label="Year to"
              @update:model-value="setYearTo"
            />
          </div>
        </div>

        <div class="filterbar__field">
          <span class="filterbar__field-label">Rating range</span>
          <div class="filterbar__ratings">
            <label class="filterbar__rating-input">
              <span>Min</span>
              <input
                type="number"
                class="filterbar__rating-number"
                :value="store.minRating ?? ''"
                placeholder="0"
                min="0"
                max="10"
                step="0.5"
                aria-label="Minimum rating"
                @change="setMinRating(($event.target as HTMLInputElement).value === '' ? null : Number(($event.target as HTMLInputElement).value))"
              />
            </label>
            <span class="filterbar__years-dash" aria-hidden="true">–</span>
            <label class="filterbar__rating-input">
              <span>Max</span>
              <input
                type="number"
                class="filterbar__rating-number"
                :value="store.maxRating ?? ''"
                placeholder="10"
                min="0"
                max="10"
                step="0.5"
                aria-label="Maximum rating"
                @change="setMaxRating(($event.target as HTMLInputElement).value === '' ? null : Number(($event.target as HTMLInputElement).value))"
              />
            </label>
          </div>
        </div>

        <!-- presets -->
        <div class="filterbar__field filterbar__presets">
          <span class="filterbar__field-label">Presets</span>
          <div class="filterbar__chips">
            <Chip
              v-for="p in presets"
              :key="p.id"
              removable
              :remove-label="`Delete preset ${p.name}`"
              @click="applyPreset(p)"
              @remove="removePreset(p)"
            >
              {{ p.name }}
            </Chip>
            <span v-if="!presets.length" class="filterbar__presets-empty">No saved presets</span>
          </div>
          <div v-if="naming" class="filterbar__preset-save">
            <input
              v-model="presetName"
              type="text"
              class="filterbar__preset-input"
              placeholder="Preset name"
              aria-label="Preset name"
              @keydown.enter.prevent="confirmSavePreset"
              @keydown.esc="naming = false"
            />
            <button type="button" class="filterbar__preset-confirm" @click="confirmSavePreset">
              <Icon name="check" /> Save
            </button>
          </div>
          <button
            v-else
            type="button"
            class="filterbar__preset-add"
            :disabled="!hasActiveFilters"
            @click="startSavePreset"
          >
            <Icon name="plus" /> Save current
          </button>
        </div>
      </div>
    </Transition>

    <!-- active filters + count (count region persists so aria-live updates in place) -->
    <div class="filterbar__active">
      <span class="filterbar__count" aria-live="polite">
        <b>{{ store.total.toLocaleString() }}</b>
        {{ store.total === 1 ? 'title' : 'titles' }}
      </span>
      <template v-if="hasActiveFilters">
        <div class="filterbar__pills">
          <Chip
            v-for="pill in activePills"
            :key="pill.key"
            removable
            :remove-label="`Remove ${pill.label}`"
            @remove="pill.remove"
          >
            {{ pill.label }}
          </Chip>
        </div>
        <button type="button" class="filterbar__clear" @click="clearAll">Clear all</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.filterbar {
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 12px);
  padding: var(--space-3, 12px);
  /* Explicit, controlled gap between the bar and the first row/grid that follows
     it (updates.md #8). margin-bottom (not the grid's margin-top) keeps the gap
     even while the bar is stuck — rows never collide with the sticky bar. The
     `is-stuck` shadow is driven by `window.scrollY` (see onScroll), independent of
     layout, so this margin cannot affect the stuck-shadow state. */
  margin-bottom: var(--space-4, 16px);
  border-radius: var(--radius-xl, 16px);
  background: var(--surface-glass, rgba(20, 20, 28, 0.6));
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle, #1f1f23);
  box-shadow: var(--shadow-2, 0 4px 16px rgba(0, 0, 0, 0.3));
}
.filterbar.is-sticky {
  position: sticky;
  top: var(--space-2, 8px);
  z-index: 10;
}
.filterbar.is-stuck {
  box-shadow: var(--shadow-3, 0 8px 24px rgba(0, 0, 0, 0.45));
}

.filterbar__main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3, 12px);
}

/* search */
.filterbar__search {
  position: relative;
  flex: 1 1 260px;
  min-width: 200px;
  display: flex;
  align-items: center;
}
.filterbar__search-icon {
  position: absolute;
  left: var(--space-3, 12px);
  width: 17px;
  height: 17px;
  color: var(--text-subtle, #71717a);
  pointer-events: none;
}
.filterbar__search-input {
  width: 100%;
  padding: var(--space-3, 12px) var(--space-3, 12px) var(--space-3, 12px) var(--space-9, 38px);
  background: var(--surface, #141420);
  border: 1px solid var(--border, #27272a);
  border-radius: var(--radius-md, 8px);
  color: var(--text, #e4e4e7);
  font-size: var(--text-sm, 0.875rem);
  outline: none;
  transition: border-color var(--dur-base, 0.18s), box-shadow var(--dur-base, 0.18s);
}
.filterbar__search-input::placeholder {
  color: var(--text-subtle, #71717a);
}
.filterbar__search-input:focus {
  border-color: var(--accent-ring, #f5a524);
  box-shadow: 0 0 0 3px var(--accent-soft, rgba(245, 165, 36, 0.18));
}
.filterbar__search-clear {
  position: absolute;
  right: var(--space-2, 8px);
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full, 999px);
  color: var(--text-subtle, #71717a);
  cursor: pointer;
}
.filterbar__search-clear:hover {
  color: var(--text, #e4e4e7);
  background: var(--surface-2, #1e1e2e);
}

/* sort + order */
.filterbar__sort {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
}
.filterbar__order {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md, 8px);
  border: 1px solid var(--border, #27272a);
  background: var(--surface, #141420);
  color: var(--text-muted, #a1a1aa);
  cursor: pointer;
  transition: color var(--dur-base, 0.18s), border-color var(--dur-base, 0.18s);
}
.filterbar__order:hover {
  color: var(--text, #e4e4e7);
  border-color: var(--border-strong, #3f3f46);
}

/* filters toggle */
.filterbar__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  padding: var(--space-3, 12px) var(--space-4, 16px);
  border-radius: var(--radius-md, 8px);
  border: 1px solid var(--border, #27272a);
  background: var(--surface, #141420);
  color: var(--text-muted, #a1a1aa);
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  cursor: pointer;
  transition: color var(--dur-base, 0.18s), border-color var(--dur-base, 0.18s);
}
.filterbar__toggle:hover {
  color: var(--text, #e4e4e7);
  border-color: var(--border-strong, #3f3f46);
}
.filterbar__toggle-caret {
  width: 15px;
  height: 15px;
}

/* advanced panel */
.filterbar__advanced {
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 16px);
  padding-top: var(--space-2, 8px);
  border-top: 1px solid var(--border-subtle, #1f1f23);
}
.filterbar__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
}
.filterbar__field-label {
  font-size: var(--text-2xs, 0.7rem);
  font-weight: 700;
  letter-spacing: var(--tracking-wide, 0.06em);
  text-transform: uppercase;
  color: var(--text-subtle, #71717a);
}
.filterbar__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2, 8px);
}
.filterbar__years {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  max-width: 360px;
}
.filterbar__years-dash {
  color: var(--text-subtle, #71717a);
}

.filterbar__ratings {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  max-width: 360px;
}

.filterbar__rating-input {
  display: flex;
  align-items: center;
  gap: var(--space-1, 4px);
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-subtle, #71717a);
}

.filterbar__rating-number {
  width: 60px;
  padding: var(--space-2, 8px) var(--space-2, 8px);
  background: var(--surface, #141420);
  border: 1px solid var(--border, #27272a);
  border-radius: var(--radius-md, 8px);
  color: var(--text, #e4e4e7);
  font-size: var(--text-sm, 0.875rem);
  text-align: center;
  outline: none;
  transition: border-color var(--dur-base, 0.18s), box-shadow var(--dur-base, 0.18s);
}

.filterbar__rating-number:focus {
  border-color: var(--accent-ring, #f5a524);
  box-shadow: 0 0 0 3px var(--accent-soft, rgba(245, 165, 36, 0.18));
}

.filterbar__rating-number::placeholder {
  color: var(--text-subtle, #71717a);
}

/* presets */
.filterbar__presets-empty {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-subtle, #71717a);
}
.filterbar__preset-save {
  display: flex;
  gap: var(--space-2, 8px);
  margin-top: var(--space-1, 4px);
}
.filterbar__preset-input {
  flex: 0 1 200px;
  padding: var(--space-2, 8px) var(--space-3, 12px);
  background: var(--surface, #141420);
  border: 1px solid var(--border, #27272a);
  border-radius: var(--radius-md, 8px);
  color: var(--text, #e4e4e7);
  font-size: var(--text-sm, 0.875rem);
  outline: none;
}
.filterbar__preset-input:focus {
  border-color: var(--accent-ring, #f5a524);
}
.filterbar__preset-add,
.filterbar__preset-confirm {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1, 4px);
  align-self: flex-start;
  padding: var(--space-2, 8px) var(--space-3, 12px);
  border-radius: var(--radius-md, 8px);
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  cursor: pointer;
}
.filterbar__preset-add {
  color: var(--text-muted, #a1a1aa);
  border: 1px dashed var(--border-strong, #3f3f46);
  background: transparent;
}
.filterbar__preset-add:hover:not(:disabled) {
  color: var(--accent, #f5a524);
  border-color: var(--accent-ring, #f5a524);
}
.filterbar__preset-add:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.filterbar__preset-confirm {
  color: var(--accent-contrast, #1a1205);
  background: var(--accent, #f5a524);
  border: none;
}

/* active filters row */
.filterbar__active {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3, 12px);
  padding-top: var(--space-2, 8px);
  border-top: 1px solid var(--border-subtle, #1f1f23);
}
.filterbar__count {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
}
.filterbar__count b {
  color: var(--text, #e4e4e7);
  font-family: var(--font-mono, monospace);
}
.filterbar__pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2, 8px);
}
.filterbar__clear {
  margin-left: auto;
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  color: var(--text-subtle, #71717a);
  background: none;
  border: none;
  cursor: pointer;
}
.filterbar__clear:hover {
  color: var(--text, #e4e4e7);
}
/* keyboard focus ring on the hand-rolled chrome buttons (the search input + the
   genre/year Comboboxes/Selects/Chips already carry their own :focus-visible) */
.filterbar__search-clear:focus-visible,
.filterbar__order:focus-visible,
.filterbar__toggle:focus-visible,
.filterbar__preset-add:focus-visible,
.filterbar__preset-confirm:focus-visible,
.filterbar__clear:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

/* panel transition */
.filterbar-panel-enter-active,
.filterbar-panel-leave-active {
  transition: opacity var(--dur-base, 0.18s) var(--ease-out, ease);
}
.filterbar-panel-enter-from,
.filterbar-panel-leave-to {
  opacity: 0;
}

.is-stuck .filterbar__advanced {
  /* condensed when stuck: tighter top spacing */
  padding-top: var(--space-1, 4px);
}

@media (prefers-reduced-motion: reduce) {
  .filterbar__search-input,
  .filterbar__order,
  .filterbar__toggle,
  .filterbar-panel-enter-active,
  .filterbar-panel-leave-active {
    transition: none;
  }
}
</style>
