/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import { useSpatialNav } from './useSpatialNav';
import { focusable, focusableRegistry } from '../directives/focusable';

function stubRect(el: HTMLElement, x: number, y: number, w = 50, h = 50) {
  el.getBoundingClientRect = () =>
    ({ left: x, top: y, right: x + w, bottom: y + h, width: w, height: h, x, y, toJSON() {} }) as DOMRect;
}

/**
 * Layout (each 50x50):
 *   A(0,0)    B(100,0)
 *   C(0,100)  D(100,100)
 */
function makeHost(opts: { enabled?: boolean; onEdge?: (d: string) => void } = {}) {
  const enabled = ref(opts.enabled ?? false);
  let handle: ReturnType<typeof useSpatialNav>;
  const Host = defineComponent({
    directives: { focusable },
    setup() {
      handle = useSpatialNav({ enabled: () => enabled.value, onEdge: opts.onEdge });
      return () =>
        h('div', [
          h('button', { 'data-id': 'A', class: 'A' }),
          h('button', { 'data-id': 'B', class: 'B' }),
          h('button', { 'data-id': 'C', class: 'C' }),
          h('button', { 'data-id': 'D', class: 'D' }),
          h('input', { 'data-id': 'IN', class: 'IN' }),
        ]);
    },
  });
  const w = mount(Host, { attachTo: document.body });
  // apply directive + stub rects manually (mount with attachTo gives live DOM)
  const get = (cls: string) => w.find(`.${cls}`).element as HTMLElement;
  for (const [cls, x, y] of [
    ['A', 0, 0],
    ['B', 100, 0],
    ['C', 0, 100],
    ['D', 100, 100],
    ['IN', 0, 200],
  ] as Array<[string, number, number]>) {
    const el = get(cls);
    focusableRegistry.add(el);
    stubRect(el, x, y);
  }
  return { w, get, enabled, handle: handle! };
}

function fireKey(key: string, target?: HTMLElement) {
  const e = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  if (target) Object.defineProperty(e, 'target', { value: target });
  document.dispatchEvent(e);
  return e;
}

describe('useSpatialNav', () => {
  beforeEach(() => focusableRegistry.clear());

  it('is a no-op while disabled (enabled=false)', () => {
    const { get, w } = makeHost({ enabled: false });
    get('A').focus();
    const e = fireKey('ArrowRight');
    expect(document.activeElement).toBe(get('A'));
    expect(e.defaultPrevented).toBe(false);
    w.unmount();
  });

  it('enabled: arrow moves focus to the geometrically-correct element', () => {
    const { get, w } = makeHost({ enabled: true });
    get('A').focus();
    const e = fireKey('ArrowRight');
    expect(document.activeElement).toBe(get('B'));
    expect(e.defaultPrevented).toBe(true);
    // from B, down → D
    fireKey('ArrowDown');
    expect(document.activeElement).toBe(get('D'));
    // from D, left → C
    fireKey('ArrowLeft');
    expect(document.activeElement).toBe(get('C'));
    // from C, up → A
    fireKey('ArrowUp');
    expect(document.activeElement).toBe(get('A'));
    w.unmount();
  });

  it('bails on a typing target', () => {
    const { get, w } = makeHost({ enabled: true });
    get('A').focus();
    const input = get('IN');
    const e = fireKey('ArrowRight', input);
    expect(document.activeElement).toBe(get('A'));
    expect(e.defaultPrevented).toBe(false);
    w.unmount();
  });

  it('bails on modifier chords', () => {
    const { get, w } = makeHost({ enabled: true });
    get('A').focus();
    const e = new KeyboardEvent('keydown', { key: 'ArrowRight', ctrlKey: true, cancelable: true });
    document.dispatchEvent(e);
    expect(document.activeElement).toBe(get('A'));
    expect(e.defaultPrevented).toBe(false);
    w.unmount();
  });

  it('calls onEdge and returns false at a boundary', () => {
    const onEdge = vi.fn();
    const { get, w } = makeHost({ enabled: true, onEdge });
    get('B').focus(); // nothing to the right of B
    const e = fireKey('ArrowRight');
    expect(onEdge).toHaveBeenCalledWith('right');
    expect(document.activeElement).toBe(get('B'));
    expect(e.defaultPrevented).toBe(false);
    w.unmount();
  });

  it('yields when the active element is inside a [data-focus-trap]', () => {
    const { get, w } = makeHost({ enabled: true });
    const trap = document.createElement('div');
    trap.setAttribute('data-focus-trap', '');
    document.body.appendChild(trap);
    const inner = get('A');
    trap.appendChild(inner); // move A into the trap
    inner.focus();
    const e = fireKey('ArrowRight');
    expect(document.activeElement).toBe(inner); // unchanged
    expect(e.defaultPrevented).toBe(false);
    trap.remove();
    w.unmount();
  });

  it('removes the listener on unmount', () => {
    const { get, w } = makeHost({ enabled: true });
    get('A').focus();
    w.unmount();
    // registry still has rects but listener is gone → focus unchanged
    const before = document.activeElement;
    fireKey('ArrowRight');
    expect(document.activeElement).toBe(before);
  });

  it('move() works imperatively and focusFirst/focus helpers run', () => {
    const { get, handle, w } = makeHost({ enabled: true });
    get('A').focus();
    expect(handle.move('right')).toBe(true);
    expect(document.activeElement).toBe(get('B'));
    handle.focusFirst();
    expect(document.activeElement).toBe(get('A'));
    handle.focus(get('D'));
    expect(document.activeElement).toBe(get('D'));
    handle.focus(null); // no-op
    expect(document.activeElement).toBe(get('D'));
    expect(handle.registry).toBe(focusableRegistry);
    w.unmount();
  });
});
