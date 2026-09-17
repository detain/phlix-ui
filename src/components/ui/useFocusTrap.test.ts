/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import { useFocusTrap, layerFocusDepth, clearLayerFocus } from './useFocusTrap';
import { focusableRegistry } from '../../directives/focusable';
import Modal from './Modal.vue';

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

/* ---------------------------------------------------------------------------
 * S534 — AD-9 layer focus memory: stacked layers remember their own opener,
 * outer memory survives inner closes, and an orphaned-opener close parks on a
 * defined spatial anchor instead of leaking focus to `document.body`.
 * Single-layer restore above stays byte-identical (AC2).
 * ------------------------------------------------------------------------- */

const mk = (cls: string, label: string) => {
  const el = document.createElement('button');
  el.className = cls;
  el.textContent = label;
  return el;
};

function layer(cls: string) {
  const active = ref(false);
  const Host = defineComponent({
    setup() {
      const container = ref<HTMLElement | null>(null);
      useFocusTrap(container, active, { lockScroll: false });
      return () =>
        h('div', { ref: container, class: cls }, [h('button', { class: `${cls}__a` }, 'a')]);
    },
  });
  const w = mount(Host, { attachTo: document.body });
  return { w, active, inner: () => w.find(`.${cls}__a`).element as HTMLElement };
}

describe('S534 layer focus memory — stacked push/pop', () => {
  beforeEach(() => clearLayerFocus());
  afterEach(() => {
    focusableRegistry.clear();
    document.body.innerHTML = '';
    clearLayerFocus();
  });

  it('push on open, pop on close — depth tracks the layer lifecycle', async () => {
    const opener = mk('page-opener', 'open');
    document.body.appendChild(opener);
    opener.focus();
    const sheet = layer('sheet');
    expect(layerFocusDepth()).toBe(0);
    sheet.active.value = true;
    await nextTick();
    expect(layerFocusDepth()).toBe(1);
    sheet.active.value = false;
    await nextTick();
    expect(layerFocusDepth()).toBe(0);
    sheet.w.unmount();
  });

  it('body opener keeps the pre-S534 restore path (park must not fire for a live body)', async () => {
    (document.activeElement as HTMLElement | null)?.blur?.();
    const sheet = layer('sheet0');
    sheet.active.value = true;
    await nextTick();
    const anchor = mk('anchor', 'topbar');
    anchor.setAttribute('data-focus-anchor', '');
    document.body.appendChild(anchor);
    sheet.active.value = false;
    await nextTick();
    // prevFocus was <body> (still in the DOM): restore runs, park stays silent.
    expect(document.activeElement).not.toBe(anchor);
    sheet.w.unmount();
  });

  it('Modal-over-Sheet: inner close restores the INNER layer opener; outer memory intact (depth + restore)', async () => {
    const opener = mk('page-opener', 'open');
    document.body.appendChild(opener);
    opener.focus();

    const sheet = layer('sheet');
    sheet.active.value = true;
    await nextTick();
    sheet.inner().focus(); // focus sits inside the sheet when the modal opens
    expect(layerFocusDepth()).toBe(1);

    const modal = mount(Modal, { props: { modelValue: true, title: 'Over' }, attachTo: document.body });
    await nextTick();
    expect(layerFocusDepth()).toBe(2);

    modal.setProps({ modelValue: false });
    await modal.vm.$nextTick();
    // Inner layer restored ITS opener — the sheet's button, not the page opener.
    expect(document.activeElement).toBe(sheet.inner());
    // Outer layer's memory survived the inner close — closing the sheet now
    // still walks focus back to the page opener.
    expect(layerFocusDepth()).toBe(1);
    sheet.active.value = false;
    await nextTick();
    expect(document.activeElement).toBe(opener);
    expect(layerFocusDepth()).toBe(0);
    modal.unmount();
    sheet.w.unmount();
  });

  it('outer layer unmounting under a still-open inner one leaves the inner slot intact; inner orphan parks', async () => {
    const opener = mk('page-opener', 'open');
    document.body.appendChild(opener);
    opener.focus();
    const anchor = mk('anchor', 'topbar');
    anchor.setAttribute('data-focus-anchor', '');
    document.body.appendChild(anchor);

    const sheet = layer('sheet');
    sheet.active.value = true;
    await nextTick();
    sheet.inner().focus();
    const top = layer('top');
    top.active.value = true;
    await nextTick();
    await nextTick(); // activate() re-asserts focus inside its own nextTick — two flushes
    expect(layerFocusDepth()).toBe(2);

    sheet.w.unmount(); // non-LIFO: outer dies first, WITHOUT stealing focus
    expect(layerFocusDepth()).toBe(1); // inner slot survived untouched
    expect(document.activeElement).toBe(top.inner());

    top.active.value = false; // its opener lived inside the removed sheet → orphaned
    await nextTick();
    expect(layerFocusDepth()).toBe(0);
    expect(document.activeElement).toBe(anchor); // parked, not dangling on body
    top.w.unmount();
  });

  it('orphaned opener on the LAST layer parks on [data-focus-anchor] — never dangles on body', async () => {
    const opener = mk('page-opener', 'open');
    document.body.appendChild(opener);
    opener.focus();
    const anchor = mk('anchor', 'topbar');
    anchor.setAttribute('data-focus-anchor', '');
    document.body.appendChild(anchor);

    const sheet = layer('sheet');
    sheet.active.value = true;
    await nextTick();

    opener.remove(); // the opener is yanked out from under the layer
    sheet.active.value = false;
    await nextTick();
    expect(document.activeElement).toBe(anchor);
    expect(document.activeElement).not.toBe(document.body);
    sheet.w.unmount();
  });

  it('no explicit anchor → parks on the first live focusable in the spatial registry', async () => {
    const opener = mk('page-opener', 'open');
    document.body.appendChild(opener);
    opener.focus();
    const parkA = mk('park-a', 'A');
    const parkB = mk('park-b', 'B');
    document.body.append(parkA, parkB);
    focusableRegistry.add(parkB); // insertion order: B first
    focusableRegistry.add(parkA);

    const sheet = layer('sheet');
    sheet.active.value = true;
    await nextTick();
    opener.remove();
    sheet.active.value = false;
    await nextTick();
    expect(document.activeElement).toBe(parkB);
    sheet.w.unmount();
  });

  it('desktop posture: no anchor, empty registry → orphan close changes nothing (pre-S534 byte-identical)', async () => {
    const opener = mk('page-opener', 'open');
    document.body.appendChild(opener);
    opener.focus();
    const sheet = layer('sheet');
    sheet.active.value = true;
    await nextTick();
    await nextTick();
    opener.remove();
    sheet.active.value = false;
    await nextTick();
    // Park is SILENT with no anchor and an empty registry: the close performs no
    // focus op at all (focus sits where the trap left it until the DOM itself
    // drops it on unmount) — exactly the pre-S534 posture, byte for byte.
    expect(document.activeElement).toBe(sheet.inner());
    sheet.w.unmount();
    expect(document.activeElement).toBe(document.body);
  });

  it('in-DOM opener restore wins over the anchor (single-layer flow unchanged)', async () => {
    const opener = mk('page-opener', 'open');
    document.body.appendChild(opener);
    opener.focus();
    const anchor = mk('anchor', 'topbar');
    anchor.setAttribute('data-focus-anchor', '');
    document.body.appendChild(anchor);

    const sheet = layer('sheet');
    sheet.active.value = true;
    await nextTick();
    sheet.active.value = false;
    await nextTick();
    expect(document.activeElement).toBe(opener);
    sheet.w.unmount();
  });

  it('clearLayerFocus tears the whole stack down without breaking close-time restore', async () => {
    const opener = mk('page-opener', 'open');
    document.body.appendChild(opener);
    opener.focus();
    const sheet = layer('sheet');
    sheet.active.value = true;
    await nextTick();
    clearLayerFocus();
    expect(layerFocusDepth()).toBe(0);
    sheet.active.value = false;
    await nextTick();
    // Per-instance memory still restores its live opener after a global clear.
    expect(document.activeElement).toBe(opener);
    sheet.w.unmount();
  });
});
