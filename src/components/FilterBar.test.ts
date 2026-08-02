/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import FilterBar from './FilterBar.vue';
import Combobox from './ui/Combobox.vue';
import { useMediaStore } from '../stores/useMediaStore';
import { usePreferencesStore } from '../stores/usePreferencesStore';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
// Destroy every wrapper this file mounts as soon as its test ends (S118).
//
// Why this is required and not just tidy: FilterBar.vue:322 adds a `scroll`
// listener to `window` in onMounted and only removes it in onBeforeUnmount
// (FilterBar.vue:328). This file called `mount` 26 times against only 2
// explicit `unmount()` calls, so by the time the last describe ran, ~24 live
// FilterBar instances were still subscribed to window `scroll`.
//
// The single `window.dispatchEvent(new Event('scroll'))` in the sticky test
// below therefore woke all of them at once, and awaiting the flush re-rendered
// every leaked instance. Measured on this box: that one await cost 1506 ms of
// the sticky test's 1585 ms in a solo run of this file, and the test reached
// 4174 ms against Vitest's 5000 ms default `testTimeout` when the full 214-file
// suite ran in parallel — which is the intermittent failure S118 exists to stop.
// The cost was NOT timer-related: `vi.getTimerCount()` returned 0 both before
// and after the drain, and moving the await from `vi.runAllTimersAsync()` to a
// bare `nextTick()` simply moved the same ~1.3 s with it.
//
// With auto-unmount only the test's own instance is subscribed, so the sticky
// test measures 71 ms solo / ~150 ms under the full parallel suite.
enableAutoUnmount(afterEach);
afterEach(() => {
  vi.useRealTimers();
});

function mountBar() {
  return mount(FilterBar);
}

describe('FilterBar — artist sort (music libraries)', () => {
  it('omits the Artist sort option by default and includes it when showArtistSort', () => {
    const off = mount(FilterBar);
    expect(off.text()).not.toContain('Artist');

    const on = mount(FilterBar, { props: { showArtistSort: true } });
    expect(on.text()).toContain('Artist');
  });
});

describe('FilterBar — search', () => {
  it('debounces the search and emits change once after the pause', async () => {
    vi.useFakeTimers();
    const w = mountBar();
    const store = useMediaStore();
    const input = w.find('.filterbar__search-input');
    await input.setValue('dune');
    // not committed yet
    expect(store.search).toBe('');
    vi.advanceTimersByTime(260);
    expect(store.search).toBe('dune');
    expect(w.emitted('change')).toHaveLength(1);
  });

  it('clears the search via the inline clear button', async () => {
    const w = mountBar();
    const store = useMediaStore();
    store.setSearch('alien');
    await nextTick();
    const clear = w.find('.filterbar__search-clear');
    expect(clear.exists()).toBe(true);
    await clear.trigger('click');
    expect(store.search).toBe('');
    expect(w.emitted('change')).toBeTruthy();
  });
});

describe('FilterBar — advanced panel', () => {
  it('expands/collapses the advanced panel and reflects aria-expanded', async () => {
    const w = mountBar();
    const toggle = w.find('.filterbar__toggle');
    expect(toggle.attributes('aria-expanded')).toBe('false');
    await toggle.trigger('click');
    expect(toggle.attributes('aria-expanded')).toBe('true');
  });

  it('toggles a rating chip and emits change', async () => {
    const w = mountBar();
    const store = useMediaStore();
    await w.find('.filterbar__toggle').trigger('click'); // expand
    const ratingGroup = w.find('[aria-label="Rating"]');
    const firstChip = ratingGroup.find('button.phlix-chip__main');
    await firstChip.trigger('click');
    expect(store.selectedRatings).toContain('G'); // availableRatings[0]
    expect(w.emitted('change')).toBeTruthy();
  });

  it('toggles the metadata match filter and emits change WITHOUT needing search text', async () => {
    const w = mountBar();
    const store = useMediaStore();
    await w.find('.filterbar__toggle').trigger('click'); // expand advanced
    const matchGroup = w.find('[aria-label="Metadata match status"]');
    const chips = matchGroup.findAll('button.phlix-chip__main');
    // MATCH_OPTIONS = [{Matched}, {Unmatched}] — click "Unmatched".
    await chips[1].trigger('click');
    expect(store.matchStatus).toBe('unmatched');
    // change → the page reloads the grid; the filter is applied server-side via
    // queryParams.match with NO search text set (the reported expectation).
    expect(w.emitted('change')).toBeTruthy();
    expect(store.search).toBe('');
    expect(store.queryParams.match).toBe('unmatched');
    // Clicking the same chip again clears it (back to "all").
    await chips[1].trigger('click');
    expect(store.matchStatus).toBe('');
    expect(store.queryParams.match).toBeUndefined();
  });

  it('adds a genre from the Combobox and remounts it (no stale label) so a second add works', async () => {
    const w = mountBar();
    const store = useMediaStore();
    await w.find('.filterbar__toggle').trigger('click');
    // the genre combobox is the first Combobox in the panel
    const inputBefore = w.findComponent(Combobox).find('input').element;
    w.findComponent(Combobox).vm.$emit('update:modelValue', 'Sci-Fi');
    await nextTick();
    expect(store.selectedGenres).toContain('Sci-Fi');
    expect(w.emitted('change')).toBeTruthy();

    // the key bump remounts the combobox → a brand-new input element (fresh, empty)
    const inputAfter = w.findComponent(Combobox).find('input').element;
    expect(inputAfter).not.toBe(inputBefore);

    // a second, distinct add still works (model was reset)
    w.findComponent(Combobox).vm.$emit('update:modelValue', 'Drama');
    await nextTick();
    expect(store.selectedGenres).toEqual(['Sci-Fi', 'Drama']);
  });
});

describe('FilterBar — sort + order', () => {
  it('flips the sort order and emits change', async () => {
    const w = mountBar();
    const store = useMediaStore();
    expect(store.order).toBe('asc');
    await w.find('.filterbar__order').trigger('click');
    expect(store.order).toBe('desc');
    expect(w.emitted('change')).toHaveLength(1);
  });
});

describe('FilterBar — view mode (S67)', () => {
  const LABELS = ['Grid view', 'List view', 'Backdrop view', 'Table view'];

  function viewButtons(w: ReturnType<typeof mountBar>) {
    return w.find('[aria-label="View mode"]').findAll('button');
  }

  it('renders one accessibly-named, keyboard-operable button per mode', () => {
    const w = mountBar();
    const group = w.find('[aria-label="View mode"]');
    expect(group.exists()).toBe(true);
    expect(group.attributes('role')).toBe('group');
    const btns = viewButtons(w);
    expect(btns).toHaveLength(4);
    // icon-only → the accessible name must come from aria-label (title mirrors it
    // as the tooltip); real <button type=button>s are keyboard-operable natively.
    expect(btns.map((b) => b.attributes('aria-label'))).toEqual(LABELS);
    expect(btns.map((b) => b.attributes('title'))).toEqual(LABELS);
    btns.forEach((b) => expect(b.attributes('type')).toBe('button'));
  });

  it('marks the active mode pressed (grid by default) and only that one', () => {
    const w = mountBar();
    expect(viewButtons(w).map((b) => b.attributes('aria-pressed'))).toEqual([
      'true',
      'false',
      'false',
      'false',
    ]);
  });

  it('clicking a mode updates the preference store and moves the pressed state', async () => {
    const w = mountBar();
    const prefs = usePreferencesStore();
    await viewButtons(w)[1].trigger('click'); // List
    expect(prefs.viewMode).toBe('list');
    expect(viewButtons(w).map((b) => b.attributes('aria-pressed'))).toEqual([
      'false',
      'true',
      'false',
      'false',
    ]);
    await viewButtons(w)[3].trigger('click'); // Table
    expect(prefs.viewMode).toBe('table');
    await viewButtons(w)[0].trigger('click'); // back to Grid
    expect(prefs.viewMode).toBe('grid');
  });

  it('is a preference, not a filter — switching mode emits no change (no refetch)', async () => {
    const w = mountBar();
    const store = useMediaStore();
    await viewButtons(w)[2].trigger('click'); // Backdrop
    expect(w.emitted('change')).toBeUndefined();
    expect(store.offset).toBe(0);
    expect(store.search).toBe('');
  });

  it('reflects a mode set outside the bar (e.g. hydrated from storage)', async () => {
    const w = mountBar();
    const prefs = usePreferencesStore();
    prefs.viewMode = 'backdrop';
    await nextTick();
    expect(viewButtons(w).map((b) => b.attributes('aria-pressed'))).toEqual([
      'false',
      'false',
      'true',
      'false',
    ]);
  });
});

describe('FilterBar — active filter pills', () => {
  it('renders a removable pill per active filter and removes it on demand', async () => {
    const w = mountBar();
    const store = useMediaStore();
    store.setGenres(['Sci-Fi']);
    store.setRatings(['R']);
    store.setYearRange(1990, undefined);
    store.total = 1284;
    await nextTick();

    const pills = w.find('.filterbar__pills');
    expect(pills.text()).toContain('Sci-Fi');
    expect(pills.text()).toContain('R');
    expect(pills.text()).toContain('From 1990');
    // result count formatted with thousands separator
    expect(w.find('.filterbar__count').text()).toContain('1,284');

    // remove the genre pill (find the chip whose label is Sci-Fi)
    const sciFiChip = pills
      .findAll('.phlix-chip')
      .find((c) => c.text().includes('Sci-Fi'));
    await sciFiChip!.find('.phlix-chip__remove').trigger('click');
    expect(store.selectedGenres).toEqual([]);
  });

  it('shows a singular "title" label for a single result', async () => {
    const w = mountBar();
    const store = useMediaStore();
    store.setRatings(['R']);
    store.total = 1;
    await nextTick();
    expect(w.find('.filterbar__count').text()).toContain('1 title');
    expect(w.find('.filterbar__count').text()).not.toContain('titles');
  });

  it('clear all wipes every filter', async () => {
    const w = mountBar();
    const store = useMediaStore();
    store.setSearch('x');
    store.setGenres(['Sci-Fi']);
    store.setRatings(['R']);
    store.setTypes(['movie']);
    store.setYearRange(1990, 2000);
    await nextTick();
    await w.find('.filterbar__clear').trigger('click');
    expect(store.search).toBe('');
    expect(store.selectedGenres).toEqual([]);
    expect(store.selectedRatings).toEqual([]);
    expect(store.selectedTypes).toEqual([]);
    expect(store.yearFrom).toBeUndefined();
    expect(store.yearTo).toBeUndefined();
  });

  it('shows the library count but no pills/clear when no filters are set', () => {
    const w = mountBar();
    // count region persists (so its aria-live updates in place)
    expect(w.find('.filterbar__active').exists()).toBe(true);
    expect(w.find('.filterbar__pills').exists()).toBe(false);
    expect(w.find('.filterbar__clear').exists()).toBe(false);
  });
});

describe('FilterBar — teardown & sync', () => {
  it('reflects external store.search changes in the input (back-sync)', async () => {
    const w = mountBar();
    const store = useMediaStore();
    store.setSearch('neo');
    await nextTick();
    expect((w.find('.filterbar__search-input').element as HTMLInputElement).value).toBe('neo');
  });

  it('does not commit a pending debounced search after unmount', async () => {
    vi.useFakeTimers();
    const w = mountBar();
    const store = useMediaStore();
    await w.find('.filterbar__search-input').setValue('matrix');
    w.unmount();
    vi.advanceTimersByTime(300);
    expect(store.search).toBe('');
  });

  it('removes the scroll listener on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    const w = mountBar();
    w.unmount();
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

describe('FilterBar — presets', () => {
  it('save is disabled until there is an active filter', async () => {
    const w = mountBar();
    const store = useMediaStore();
    await w.find('.filterbar__toggle').trigger('click');
    expect(w.find('.filterbar__preset-add').attributes('disabled')).toBeDefined();
    store.setRatings(['R']);
    await nextTick();
    expect(w.find('.filterbar__preset-add').attributes('disabled')).toBeUndefined();
  });

  it('saves the current filters as a named preset', async () => {
    const w = mountBar();
    const store = useMediaStore();
    const prefs = usePreferencesStore();
    store.setGenres(['Sci-Fi']);
    store.setRatings(['R']);
    await w.find('.filterbar__toggle').trigger('click');
    await w.find('.filterbar__preset-add').trigger('click');
    await w.find('.filterbar__preset-input').setValue('My Set');
    await w.find('.filterbar__preset-confirm').trigger('click');
    expect(prefs.filterPresets).toHaveLength(1);
    expect(prefs.filterPresets[0].name).toBe('My Set');
    expect(prefs.filterPresets[0].query).toMatchObject({ genres: ['Sci-Fi'], ratings: ['R'] });
  });

  it('applies a saved preset to the store and removes it', async () => {
    const w = mountBar();
    const store = useMediaStore();
    const prefs = usePreferencesStore();
    prefs.saveFilterPreset('Action', { genres: ['Action'], ratings: ['PG-13'] });
    await w.find('.filterbar__toggle').trigger('click');

    const presetChip = w
      .find('.filterbar__presets')
      .findAll('.phlix-chip')
      .find((c) => c.text().includes('Action'));
    await presetChip!.find('.phlix-chip__main').trigger('click');
    expect(store.selectedGenres).toEqual(['Action']);
    expect(store.selectedRatings).toEqual(['PG-13']);
    expect(w.emitted('change')).toBeTruthy();

    await presetChip!.find('.phlix-chip__remove').trigger('click');
    expect(prefs.filterPresets).toEqual([]);
  });
});

describe('FilterBar — sticky', () => {
  it('adds is-stuck once the window scrolls past the threshold', async () => {
    vi.useFakeTimers();
    try {
      const w = mountBar();
      expect(w.find('.filterbar').classes()).toContain('is-sticky');
      expect(w.find('.filterbar').classes()).not.toContain('is-stuck');
      // jsdom doesn't have window.scrollY, so we must define it
      Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      await vi.runAllTimersAsync();
      await nextTick();
      expect(w.find('.filterbar').classes()).toContain('is-stuck');
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not stick when sticky=false', () => {
    const w = mount(FilterBar, { props: { sticky: false } });
    expect(w.find('.filterbar').classes()).not.toContain('is-sticky');
  });
});

/**
 * S08 — the explicit gap below the FilterBar, and the sticky-shadow contract
 * the acceptance criterion asks to be re-checked.
 *
 * S08's third in-scope item was "add one explicit gap element between
 * <FilterBar> and <MediaGrid>" instead of leaning on the bar's own internal
 * padding as an implicit spacer. It shipped as a `margin-bottom` on `.filterbar`
 * itself. jsdom does not apply an SFC's compiled `<style>`, so nothing saw it:
 * measured 2026-08-01, deleting the declaration left the full 4,207-test suite
 * GREEN.
 *
 * The is-stuck half of the AC — "FilterBar's sticky `is-stuck` shadow state
 * still renders correctly" — has two halves too. The class toggle is already
 * covered above ("adds is-stuck once the window scrolls past the threshold");
 * what the toggle is FOR (a heavier shadow than the resting bar) is CSS and was
 * likewise unpinned.
 */
describe('FilterBar — spacing + sticky-shadow CSS contract (S08)', () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), './FilterBar.vue'), 'utf8');

  /** The base `.filterbar { … }` block (not `.filterbar.is-sticky` / `.is-stuck`). */
  const base = /(?<![\w.-])\.filterbar\s*\{([^}]*)\}/.exec(src);

  it('declares the explicit gap below the bar', () => {
    expect(base).not.toBeNull();
    expect(base![1]).toMatch(/margin-bottom:\s*var\(--space-4,\s*16px\);/);
  });

  it('uses margin-BOTTOM, not the grid\'s margin-top, so the gap survives while stuck', () => {
    // A sticky element keeps its own margins; a following sibling's margin-top
    // would collapse under it and let rows touch the bar. This is the reason the
    // shipped fix put the gap here rather than on MediaGrid.
    expect(base![1]).not.toMatch(/margin-top:/);
  });

  it('keeps `is-stuck` a strictly heavier shadow than the resting bar', () => {
    const stuck = /\.filterbar\.is-stuck\s*\{([^}]*)\}/.exec(src);
    expect(stuck).not.toBeNull();
    expect(stuck![1]).toMatch(/box-shadow:\s*var\(--shadow-3/);
    // …and the resting bar must use a DIFFERENT (lighter) shadow, or the stuck
    // state would be indistinguishable and the toggle test above would be
    // pinning a class that changes nothing.
    expect(base![1]).toMatch(/box-shadow:\s*var\(--shadow-2/);
  });
});
