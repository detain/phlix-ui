/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import VolumeControl from './VolumeControl.vue';
import Slider from '../ui/Slider.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('VolumeControl', () => {
  it('shows the store volume on the slider', () => {
    const player = usePlayerStore();
    player.setVolume(0.4);
    const w = mount(VolumeControl);
    expect(w.findComponent(Slider).props('modelValue')).toBeCloseTo(0.4);
  });

  it('sets the store volume (and persists it) when the slider moves', async () => {
    const w = mount(VolumeControl);
    const player = usePlayerStore();
    const prefs = usePreferencesStore();
    w.findComponent(Slider).vm.$emit('update:modelValue', 0.7);
    await nextTick();
    expect(player.volume).toBeCloseTo(0.7);
    expect(prefs.defaultVolume).toBeCloseTo(0.7); // survives reload
  });

  it('mutes (and shows 0) without losing the stored volume — mute memory', async () => {
    const player = usePlayerStore();
    player.setVolume(0.6);
    const w = mount(VolumeControl);
    await w.find('.volume__btn').trigger('click'); // mute
    expect(player.muted).toBe(true);
    expect(player.volume).toBeCloseTo(0.6); // remembered
    expect(w.findComponent(Slider).props('modelValue')).toBe(0); // shows 0 while muted
    await w.find('.volume__btn').trigger('click'); // unmute
    expect(player.muted).toBe(false);
    expect(w.findComponent(Slider).props('modelValue')).toBeCloseTo(0.6); // restored
  });

  it('dragging the slider to 0 mutes', async () => {
    const w = mount(VolumeControl);
    const player = usePlayerStore();
    w.findComponent(Slider).vm.$emit('update:modelValue', 0);
    await nextTick();
    expect(player.muted).toBe(true);
  });

  it('reflects the volume level in the icon', async () => {
    const player = usePlayerStore();
    const w = mount(VolumeControl);
    player.setVolume(0.3);
    await nextTick();
    expect(w.find('.volume__btn').attributes('aria-label')).toBe('Mute');
    player.toggleMute();
    await nextTick();
    expect(w.find('.volume__btn').attributes('aria-label')).toBe('Unmute');
  });
});
