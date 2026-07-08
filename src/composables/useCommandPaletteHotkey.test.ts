/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { useCommandPaletteHotkey } from './useCommandPaletteHotkey';
import { useCommandStore } from '../stores/useCommandStore';

// A renderless host so the composable runs inside a real component scope
// (so its `onScopeDispose` cleanup fires on unmount).
const Host = defineComponent({
  setup() {
    useCommandPaletteHotkey();
    return () => null;
  },
});

let wrapper: VueWrapper | null = null;

function key(init: KeyboardEventInit): void {
  document.dispatchEvent(new KeyboardEvent('keydown', init));
}

beforeEach(() => {
  setActivePinia(createPinia());
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
});

describe('useCommandPaletteHotkey', () => {
  it('opens the palette on Cmd+K', () => {
    wrapper = mount(Host);
    const store = useCommandStore();
    expect(store.open).toBe(false);
    key({ key: 'k', metaKey: true });
    expect(store.open).toBe(true);
  });

  it('toggles the palette closed on a second Ctrl+K', () => {
    wrapper = mount(Host);
    const store = useCommandStore();
    key({ key: 'k', ctrlKey: true });
    expect(store.open).toBe(true);
    key({ key: 'k', ctrlKey: true });
    expect(store.open).toBe(false);
  });

  it('accepts an uppercase K (Shift held)', () => {
    wrapper = mount(Host);
    const store = useCommandStore();
    key({ key: 'K', metaKey: true });
    expect(store.open).toBe(true);
  });

  it('ignores Alt+Cmd+K (modifier guard)', () => {
    wrapper = mount(Host);
    const store = useCommandStore();
    key({ key: 'k', metaKey: true, altKey: true });
    expect(store.open).toBe(false);
  });

  it('ignores a bare K with no meta/ctrl modifier', () => {
    wrapper = mount(Host);
    const store = useCommandStore();
    key({ key: 'k' });
    expect(store.open).toBe(false);
  });

  it('ignores other modified keys', () => {
    wrapper = mount(Host);
    const store = useCommandStore();
    key({ key: 'j', metaKey: true });
    expect(store.open).toBe(false);
  });

  it('detaches the listener on scope dispose (unmount)', () => {
    wrapper = mount(Host);
    const store = useCommandStore();
    wrapper.unmount();
    wrapper = null;
    key({ key: 'k', metaKey: true });
    expect(store.open).toBe(false); // listener removed → no toggle
  });
});
