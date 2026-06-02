import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import QualityMenu from './QualityMenu.vue';
import Select from '../ui/Select.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('QualityMenu', () => {
  it('renders nothing when no qualities are provided (direct play)', () => {
    const w = mount(QualityMenu, { props: { qualities: [] } });
    expect(w.findComponent(Select).exists()).toBe(false);
  });

  it('renders a Select of the provided qualities', () => {
    const w = mount(QualityMenu, { props: { qualities: ['auto', '1080p', '4k'] } });
    const sel = w.findComponent(Select);
    expect(sel.exists()).toBe(true);
    expect(sel.props('modelValue')).toBe('auto'); // store default quality
  });

  it('sets the store quality and persists it on change', () => {
    const w = mount(QualityMenu, { props: { qualities: ['auto', '1080p', '4k'] } });
    const player = usePlayerStore();
    const prefs = usePreferencesStore();
    w.findComponent(Select).vm.$emit('update:modelValue', '4k');
    expect(player.quality).toBe('4k');
    expect(prefs.defaultQuality).toBe('4k'); // survives reload
  });
});
