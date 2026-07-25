<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MusicPager — offset/limit pager for the music library listings (S110).
 *
 * The music endpoints serve bounded pages (`?limit=` is clamped to
 * `MUSIC_PAGE_SIZE` = the server's `PageLimit::MAX`) and return the TRUE `total`.
 * Before this existed, `MusicLibraryPage` fired one unparameterised request and
 * rendered whatever came back, so a user reached 100 of 2,197 artists with no
 * indication the other 2,097 existed.
 *
 * It is a controlled component: it owns no offset, it emits the offset to load.
 * `first`/`last` are not decoration — with 22 artist pages, prev/next alone makes
 * the far end of the library technically reachable but practically not, and the
 * jump `<select>` gives direct random access to any page.
 *
 * Deliberately NOT exported from the package index: like the other `Music*`
 * internals it only makes sense inside these pages.
 */
import { computed } from 'vue';
import { useMessages } from '../composables/useMessages';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    /** Offset of the page currently displayed. */
    offset: number;
    /** Page size actually applied by the server. */
    limit: number;
    /** TRUE total row count for the (possibly filtered) listing. */
    total: number;
    /**
     * Name of the LISTING this pages — e.g. `"Artists"`. The `<nav>` landmark is
     * named `"{label} pagination"` (`music.paginationOf`), so it does not announce
     * itself identically to the grid it sits under; omit it and the landmark falls
     * back to `music.pagination`.
     */
    label?: string;
    /**
     * `id` of the element this pager drives, for `aria-controls` on the page-jump
     * `<select>` — so an AT user can tell that changing it replaces that grid.
     */
    controls?: string;
    /** Disable every control (while a page is in flight). */
    disabled?: boolean;
  }>(),
  { label: undefined, controls: undefined, disabled: false },
);

const emit = defineEmits<{
  /** Load this offset. Always in `[0, (pages-1) * limit]`. */
  (e: 'go', offset: number): void;
}>();

const { t } = useMessages();

/**
 * Upper bound on the jump `<select>`'s options. `total` is server data; a garbage
 * or hostile value must not be allowed to mint unbounded DOM nodes. Music's real
 * worst case is 29,245 tracks / 100 = 293 pages, well inside this.
 *
 * ⚠ Known ceiling, stated so it is a decision and not a surprise: above
 * `MAX_JUMP_OPTIONS × limit` rows (100,000 at the default page size) the select is
 * dropped and the listing keeps only sequential access through the arrows. Raising
 * the cap is the wrong fix if that ever bites — a page-number `<input type=number>`
 * or a letter rail scales, a `<select>` does not.
 */
const MAX_JUMP_OPTIONS = 1000;

/** Never 0 or negative, so the page arithmetic below cannot divide by zero. */
const pageSize = computed(() => (props.limit > 0 ? Math.floor(props.limit) : 1));
const rowTotal = computed(() => (props.total > 0 ? Math.floor(props.total) : 0));
const pages = computed(() => Math.max(1, Math.ceil(rowTotal.value / pageSize.value)));
/** 1-based, clamped — an offset past the end still reports the last page. */
const page = computed(() =>
  Math.min(pages.value, Math.max(1, Math.floor(props.offset / pageSize.value) + 1)),
);
const hasPrev = computed(() => page.value > 1);
const hasNext = computed(() => page.value < pages.value);
const showJump = computed(() => pages.value > 1 && pages.value <= MAX_JUMP_OPTIONS);

/**
 * Inclusive 1-based row range shown by the current page.
 *
 * `rangeFrom`'s `rowTotal === 0` arm is defensive only — it does NOT describe a state
 * this component can render. Both computeds are read in exactly one place, the readout
 * inside `<nav v-if="pages > 1">`, and `pages > 1` implies `rowTotal > pageSize` (with
 * `pageSize ≥ 1` by construction above), so `rowTotal` is at least 2 wherever they are
 * evaluated; Vue computeds are lazy and there is no `defineExpose`, so nothing else can
 * evaluate them either. Kept rather than simplified away because without it an empty
 * listing would read `Showing 1–0 of 0` if a later change ever rendered this readout
 * outside that gate.
 */
const rangeFrom = computed(() => (rowTotal.value === 0 ? 0 : (page.value - 1) * pageSize.value + 1));
const rangeTo = computed(() => Math.min(page.value * pageSize.value, rowTotal.value));

/**
 * "Artists pagination" — the landmark must not be announced identically to the grid
 * it pages, which is what passing the bare listing name did.
 */
const navLabel = computed(() =>
  props.label === undefined || props.label === ''
    ? t('music.pagination')
    : t('music.paginationOf', { label: props.label }),
);

/** Emit the offset for a 1-based page number, clamped into range. */
function goToPage(target: number): void {
  if (props.disabled) return;
  const clamped = Math.min(pages.value, Math.max(1, Math.floor(target)));
  emit('go', (clamped - 1) * pageSize.value);
}

function onJump(event: Event): void {
  const value = Number((event.target as HTMLSelectElement).value);
  if (Number.isFinite(value)) goToPage(value);
}
</script>

<template>
  <nav
    v-if="pages > 1"
    class="music-pager"
    :aria-label="navLabel"
  >
    <button
      type="button"
      class="music-pager__btn"
      :disabled="disabled || !hasPrev"
      :aria-label="t('music.firstPage')"
      data-nav="first"
      @click="goToPage(1)"
    >
      <Icon name="chevrons-left" class="music-pager__icon" />
    </button>
    <button
      type="button"
      class="music-pager__btn"
      :disabled="disabled || !hasPrev"
      :aria-label="t('music.prevPage')"
      data-nav="prev"
      @click="goToPage(page - 1)"
    >
      <Icon name="chevron-left" class="music-pager__icon" />
    </button>

    <!-- role=status + aria-live: pressing Next replaces the grid silently otherwise,
         so this readout is the ONLY thing that tells an AT user the page changed.
         It deliberately carries NO `aria-current`: that state marks the current item
         WITHIN A SET of navigable items, and this is a status string, not an item.
         The single `aria-current="page"` in this nav is on the selected <option> of
         the jump control below — the only actual set of page items here. Keeping
         exactly one is pinned by a test. -->
    <span
      class="music-pager__info"
      data-nav="info"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ t('music.pageOf', { page, pages }) }}
      <span class="music-pager__range">
        · {{ t('music.showingRange', {
          from: rangeFrom.toLocaleString(),
          to: rangeTo.toLocaleString(),
          total: rowTotal.toLocaleString(),
        }) }}
      </span>
    </span>

    <label v-if="showJump" class="music-pager__jump">
      <span class="music-pager__jump-label">{{ t('music.jumpToPage') }}</span>
      <select
        class="music-pager__select"
        :value="page"
        :disabled="disabled"
        :aria-controls="controls"
        data-nav="jump"
        @change="onJump"
      >
        <option
          v-for="p in pages"
          :key="p"
          :value="p"
          :aria-current="p === page ? 'page' : undefined"
        >{{ p }}</option>
      </select>
    </label>

    <button
      type="button"
      class="music-pager__btn"
      :disabled="disabled || !hasNext"
      :aria-label="t('music.nextPage')"
      data-nav="next"
      @click="goToPage(page + 1)"
    >
      <Icon name="chevron-right" class="music-pager__icon" />
    </button>
    <button
      type="button"
      class="music-pager__btn"
      :disabled="disabled || !hasNext"
      :aria-label="t('music.lastPage')"
      data-nav="last"
      @click="goToPage(pages)"
    >
      <Icon name="chevrons-right" class="music-pager__icon" />
    </button>
  </nav>
</template>

<style scoped>
/* ⚠ Do NOT add `grid-column: 1 / -1` back. It was here while the pager lived INSIDE
   `.music-page__grid`; every call site now mounts it as a SIBLING of the grid it
   pages, precisely so its `aria-controls` can reference that grid instead of its own
   ancestor. Re-adding a grid-item declaration is an invitation to re-nest the pager,
   which would silently undo that. A pager that must span a grid should be given the
   span by the page, not assume one. */
.music-pager {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
  margin-top: var(--space-6, 24px);
}
.music-pager__btn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md, 8px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  color: var(--text, #e4e4e7);
  cursor: pointer;
  transition: background var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.music-pager__btn:hover:not(:disabled) {
  background: var(--surface-3, #3f3f46);
}
.music-pager__btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.music-pager__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.music-pager__icon {
  width: 16px;
  height: 16px;
}
.music-pager__info {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
  padding: 0 var(--space-2, 8px);
}
.music-pager__range {
  font-variant-numeric: tabular-nums;
}
.music-pager__jump {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
}
.music-pager__jump-label {
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
}
.music-pager__select {
  padding: var(--space-1, 4px) var(--space-2, 8px);
  border-radius: var(--radius-md, 8px);
  background: var(--surface-2, #27272a);
  border: 1px solid var(--border, #3f3f46);
  color: var(--text, #e4e4e7);
  font-size: var(--text-sm, 0.875rem);
  cursor: pointer;
}
.music-pager__select:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
</style>
