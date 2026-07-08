/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SpeedMenu from './SpeedMenu.vue';
import Select from '../ui/Select.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('SpeedMenu', () => {
  it('offers the 0.25–2× ladder and reflects the store rate', () => {
    const player = usePlayerStore();
    player.setRate(1.5);
    const w = mount(SpeedMenu);
    const sel = w.findComponent(Select);
    expect(sel.props('modelValue')).toBe(1.5);
    const opts = sel.props('options') as ReadonlyArray<{ value: number; label: string }>;
    expect(opts.map((o) => o.value)).toEqual([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);
    expect(opts[0].label).toBe('0.25×');
  });

  it('sets the store rate on change', () => {
    const w = mount(SpeedMenu);
    const player = usePlayerStore();
    w.findComponent(Select).vm.$emit('update:modelValue', 2);
    expect(player.rate).toBe(2);
  });

  it('renders with the glass tone so it reads on the transparent player chrome', () => {
    const w = mount(SpeedMenu);
    expect(w.findComponent(Select).props('tone')).toBe('glass');
    expect(w.find('.phlix-select.is-glass').exists()).toBe(true);
  });
});
