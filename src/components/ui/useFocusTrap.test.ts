/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import { useFocusTrap } from './useFocusTrap';

function makeHarness(startActive = false) {
  const active = ref(startActive);
  const Host = defineComponent({
    setup() {
      const container = ref<HTMLElement | null>(null);
      useFocusTrap(container, active, { lockScroll: false });
      return () => h('div', { ref: container, class: 'trap' }, [h('button', 'ok')]);
    },
  });
  const w = mount(Host, { attachTo: document.body });
  return { w, active, el: () => w.find('.trap').element as HTMLElement };
}

describe('useFocusTrap data-focus-trap attribute', () => {
  it('adds data-focus-trap on activate and removes on deactivate', async () => {
    const { w, active, el } = makeHarness(false);
    expect(el().hasAttribute('data-focus-trap')).toBe(false);
    active.value = true;
    await w.vm.$nextTick();
    expect(el().hasAttribute('data-focus-trap')).toBe(true);
    active.value = false;
    await w.vm.$nextTick();
    expect(el().hasAttribute('data-focus-trap')).toBe(false);
    w.unmount();
  });

  it('is present when mounted already active', async () => {
    const { w, el } = makeHarness(true);
    await w.vm.$nextTick();
    expect(el().hasAttribute('data-focus-trap')).toBe(true);
    w.unmount();
  });
});
