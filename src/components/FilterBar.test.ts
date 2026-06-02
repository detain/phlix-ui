import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import FilterBar from './FilterBar.vue';
import Combobox from './ui/Combobox.vue';
import { useMediaStore } from '../stores/useMediaStore';
import { usePreferencesStore } from '../stores/usePreferencesStore';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.useRealTimers();
});

function mountBar() {
  return mount(FilterBar);
}

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
    const w = mountBar();
    expect(w.find('.filterbar').classes()).toContain('is-sticky');
    expect(w.find('.filterbar').classes()).not.toContain('is-stuck');
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    await nextTick();
    expect(w.find('.filterbar').classes()).toContain('is-stuck');
  });

  it('does not stick when sticky=false', () => {
    const w = mount(FilterBar, { props: { sticky: false } });
    expect(w.find('.filterbar').classes()).not.toContain('is-sticky');
  });
});
