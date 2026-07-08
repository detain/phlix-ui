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
