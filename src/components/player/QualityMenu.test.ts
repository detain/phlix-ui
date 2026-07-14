/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import QualityMenu from './QualityMenu.vue';
import Select from '../ui/Select.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';
import type { HlsLevel } from './hls-playback';

function level(index: number, height: number, width: number, bitrate: number): HlsLevel {
  return { index, height, width, bitrate, name: `${height}p` };
}

/** A 3-rung ladder, highest-first as hls.js lists it. */
const ladder: HlsLevel[] = [level(0, 1080, 1920, 5_000_000), level(1, 720, 1280, 2_800_000), level(2, 480, 854, 1_400_000)];

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('QualityMenu', () => {
  it('renders nothing when there are no levels (native HLS / direct play)', () => {
    const w = mount(QualityMenu, { props: { levels: [] } });
    expect(w.findComponent(Select).exists()).toBe(false);
  });

  it('renders nothing with a single rung (no real choice)', () => {
    const w = mount(QualityMenu, { props: { levels: [level(0, 1080, 1920, 5_000_000)] } });
    expect(w.findComponent(Select).exists()).toBe(false);
  });

  it('renders Auto + one rung per resolution, highest-first, with ≥2 levels', () => {
    const w = mount(QualityMenu, { props: { levels: ladder } });
    const sel = w.findComponent(Select);
    expect(sel.exists()).toBe(true);
    const opts = sel.props('options') as ReadonlyArray<{ value: string; label: string }>;
    expect(opts.map((o) => o.value)).toEqual(['auto', '1080p', '720p', '480p']);
    expect(opts[1].label).toBe('1080p');
  });

  it('collapses duplicate-resolution levels to a single rung', () => {
    const dupes: HlsLevel[] = [level(0, 1080, 1920, 6_000_000), level(1, 1080, 1920, 4_000_000), level(2, 720, 1280, 2_800_000)];
    const w = mount(QualityMenu, { props: { levels: dupes } });
    const opts = w.findComponent(Select).props('options') as ReadonlyArray<{ value: string }>;
    expect(opts.map((o) => o.value)).toEqual(['auto', '1080p', '720p']);
  });

  it('labels the 2160p rung "4K"', () => {
    const w = mount(QualityMenu, { props: { levels: [level(0, 2160, 3840, 20_000_000), level(1, 1080, 1920, 5_000_000)] } });
    const opts = w.findComponent(Select).props('options') as ReadonlyArray<{ value: string; label: string }>;
    expect(opts.map((o) => o.value)).toEqual(['auto', '2160p', '1080p']);
    expect(opts[1].label).toBe('4K');
  });

  it('shows the live active level in the Auto label ("Auto (720p)")', () => {
    const w = mount(QualityMenu, { props: { levels: ladder, autoEnabled: true, activeHeight: 720 } });
    const opts = w.findComponent(Select).props('options') as ReadonlyArray<{ value: string; label: string }>;
    expect(opts[0].label).toBe('Auto (720p)');
  });

  it('reflects Auto as the selection while ABR owns the choice', () => {
    const w = mount(QualityMenu, { props: { levels: ladder, autoEnabled: true, currentLevel: 1 } });
    expect(w.findComponent(Select).props('modelValue')).toBe('auto');
  });

  it('reflects the pinned rung as the selection when ABR is off', () => {
    const w = mount(QualityMenu, { props: { levels: ladder, autoEnabled: false, currentLevel: 2 } });
    expect(w.findComponent(Select).props('modelValue')).toBe('480p');
  });

  it('emits the resolved level index, persists the rung id, and mirrors the store on a rung pick', () => {
    const w = mount(QualityMenu, { props: { levels: ladder } });
    const player = usePlayerStore();
    const prefs = usePreferencesStore();
    w.findComponent(Select).vm.$emit('update:modelValue', '720p');
    expect(w.emitted('select')?.[0]).toEqual([1]); // hls.js level index for 720p
    expect(player.quality).toBe('720p');
    expect(prefs.defaultQuality).toBe('720p'); // survives reload
  });

  it('emits "auto" and persists "auto" when Auto is picked', () => {
    const w = mount(QualityMenu, { props: { levels: ladder, autoEnabled: false, currentLevel: 0 } });
    const prefs = usePreferencesStore();
    w.findComponent(Select).vm.$emit('update:modelValue', 'auto');
    expect(w.emitted('select')?.[0]).toEqual(['auto']);
    expect(prefs.defaultQuality).toBe('auto');
  });

  it('renders with the glass tone so it reads on the transparent player chrome', () => {
    const w = mount(QualityMenu, { props: { levels: ladder } });
    expect(w.findComponent(Select).props('tone')).toBe('glass');
    expect(w.find('.phlix-select.is-glass').exists()).toBe(true);
  });
});

describe('QualityMenu — Original rendition + no silent auto', () => {
  function variant(id: string, height: number, bitrate: number) {
    return { id, label: id === 'original' ? 'Original' : `${height}p`, height, width: Math.round((height * 16) / 9), bitrate };
  }

  it('renders an "Original (<height>p)" option right after Auto when the original variant maps to a level', () => {
    const w = mount(QualityMenu, {
      props: { levels: ladder, variants: [variant('original', 1080, 5_000_000), variant('720p', 720, 2_800_000)] },
    });
    const opts = w.findComponent(Select).props('options') as ReadonlyArray<{ value: string; label: string }>;
    expect(opts.map((o) => o.value)).toEqual(['auto', 'original', '1080p', '720p', '480p']);
    expect(opts[1].label).toBe('Original (1080p)');
  });

  it('applies Original: emits its matched hls.js level index and persists "original" to prefs', () => {
    const w = mount(QualityMenu, {
      props: { levels: ladder, variants: [variant('original', 1080, 5_000_000)] },
    });
    const player = usePlayerStore();
    const prefs = usePreferencesStore();
    w.findComponent(Select).vm.$emit('update:modelValue', 'original');
    expect(w.emitted('select')?.[0]).toEqual([0]); // ladder's 1080p@5M level
    expect(player.quality).toBe('original');
    expect(prefs.defaultQuality).toBe('original'); // survives reload like other rungs
  });

  it('hides the Original option when no hls.js level matches the original variant', () => {
    const w = mount(QualityMenu, {
      props: { levels: ladder, variants: [variant('original', 2160, 20_000_000)] },
    });
    const opts = w.findComponent(Select).props('options') as ReadonlyArray<{ value: string }>;
    expect(opts.map((o) => o.value)).toEqual(['auto', '1080p', '720p', '480p']);
  });

  it('reflects Original as the selection when its level is pinned and the stored choice is original', () => {
    usePreferencesStore().defaultQuality = 'original';
    const w = mount(QualityMenu, {
      props: {
        levels: ladder,
        variants: [variant('original', 1080, 5_000_000)],
        autoEnabled: false,
        currentLevel: 0,
      },
    });
    expect(w.findComponent(Select).props('modelValue')).toBe('original');
  });

  it('NEVER emits a silent "auto" for a rung with no matching hls.js level (pick is ignored)', () => {
    const w = mount(QualityMenu, { props: { levels: ladder } });
    const prefs = usePreferencesStore();
    w.findComponent(Select).vm.$emit('update:modelValue', '1440p'); // stale/unmatchable rung
    expect(w.emitted('select')).toBeFalsy(); // no silent downgrade to auto
    expect(prefs.defaultQuality).toBe('auto'); // and the stale pick is not persisted
  });

  it('shows all server variants when hls.js has < 2 levels (manual selection allowed)', () => {
    // hls.js only loaded one 480p level but the server advertises a 3-rung ladder.
    // When hls.js has < 2 levels, ALL server variants are shown so the user can
    // manually select any quality - the player will load the variant playlist directly.
    const w = mount(QualityMenu, {
      props: {
        levels: [level(0, 480, 854, 1_400_000)],
        variants: [variant('1080p', 1080, 5_000_000), variant('720p', 720, 2_800_000), variant('480p', 480, 1_400_000)],
      },
    });
    // With the fix: all 3 variants are shown, so hasQualities=true and menu shows
    expect(w.findComponent(Select).exists()).toBe(true);
    const opts = w.findComponent(Select).props('options') as ReadonlyArray<{ value: string }>;
    expect(opts.map((o) => o.value)).toEqual(['auto', '1080p', '720p', '480p']);
  });
});

/**
 * E4 — accessibility coverage. The QualityMenu delegates its ARIA/keyboard
 * semantics to the `Select` primitive, so these assertions mount the REAL Select
 * child (not a stub) and prove the menu exposes correct listbox/option roles,
 * a named trigger, `aria-selected` on the active rung, `aria-activedescendant`
 * tracking, and keyboard operability — the interactive half of "a11y clean" that
 * the on-demand axe suite (`e2e/a11y.spec.ts`, `quality-menu` surface) mirrors in
 * a real browser. Same pattern as `SpeedMenu`/`Select`'s own a11y tests.
 */
describe('QualityMenu — a11y (ARIA + keyboard)', () => {
  it('exposes a named combobox trigger (role / aria-haspopup / aria-expanded / aria-label)', () => {
    const w = mount(QualityMenu, { props: { levels: ladder } });
    const trigger = w.find('.phlix-select__trigger');
    expect(trigger.attributes('role')).toBe('combobox'); // so aria-activedescendant is valid when open
    expect(trigger.attributes('aria-haspopup')).toBe('listbox');
    expect(trigger.attributes('aria-expanded')).toBe('false');
    expect(trigger.attributes('aria-label')).toBe('Quality');
  });

  it('opens a named listbox of role=option rungs (Auto + one per resolution)', async () => {
    const w = mount(QualityMenu, { props: { levels: ladder } });
    await w.find('.phlix-select__trigger').trigger('click');
    const list = w.find('[role="listbox"]');
    expect(list.exists()).toBe(true);
    expect(list.attributes('aria-label')).toBe('Quality');
    const options = w.findAll('[role="option"]');
    expect(options).toHaveLength(4); // auto + 1080p + 720p + 480p
    expect(options.map((o) => o.text().trim())).toEqual(['Auto', '1080p', '720p', '480p']);
  });

  it('marks the Auto option aria-selected while ABR owns the choice', async () => {
    const w = mount(QualityMenu, { props: { levels: ladder, autoEnabled: true, activeHeight: 720 } });
    await w.find('.phlix-select__trigger').trigger('click');
    const selected = w.findAll('[role="option"]').filter((o) => o.attributes('aria-selected') === 'true');
    expect(selected).toHaveLength(1);
    expect(selected[0].text()).toContain('Auto');
  });

  it('marks the pinned rung aria-selected when ABR is off', async () => {
    const w = mount(QualityMenu, { props: { levels: ladder, autoEnabled: false, currentLevel: 2 } });
    await w.find('.phlix-select__trigger').trigger('click');
    const selected = w.findAll('[role="option"]').filter((o) => o.attributes('aria-selected') === 'true');
    expect(selected).toHaveLength(1);
    expect(selected[0].text()).toContain('480p');
  });

  it('is keyboard-operable: ArrowDown tracks aria-activedescendant, Enter picks the rung', async () => {
    const w = mount(QualityMenu, { props: { levels: ladder } });
    const trigger = w.find('.phlix-select__trigger');
    await trigger.trigger('keydown', { key: 'ArrowDown' }); // open, active = selected (auto, 0)
    await trigger.trigger('keydown', { key: 'ArrowDown' }); // -> 1080p (1)
    const activeId = trigger.attributes('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(w.find(`#${activeId}`).attributes('role')).toBe('option');
    expect(w.find(`#${activeId}`).text()).toContain('1080p');
    await trigger.trigger('keydown', { key: 'Enter' });
    expect(w.emitted('select')?.at(-1)).toEqual([0]); // hls.js level index for 1080p
    expect(trigger.attributes('aria-expanded')).toBe('false'); // Enter closes + returns focus
  });

  it('Escape closes the listbox without emitting a selection', async () => {
    const w = mount(QualityMenu, { props: { levels: ladder } });
    const trigger = w.find('.phlix-select__trigger');
    await trigger.trigger('click');
    expect(trigger.attributes('aria-expanded')).toBe('true');
    await trigger.trigger('keydown', { key: 'Escape' });
    expect(trigger.attributes('aria-expanded')).toBe('false');
    expect(w.emitted('select')).toBeFalsy();
  });
});
