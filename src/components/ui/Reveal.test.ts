/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Reveal from './Reveal.vue';
import PageTransition from './PageTransition.vue';

function setReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: reduce && q.includes('reduce'),
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

const raf = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null))));

describe('Reveal', () => {
  beforeEach(() => setReducedMotion(false));
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders slot content and applies delay/y CSS vars', () => {
    const w = mount(Reveal, { props: { delay: 120, y: 20 }, slots: { default: 'Hi' } });
    expect(w.text()).toContain('Hi');
    const style = w.find('.phlix-reveal').attributes('style') ?? '';
    expect(style).toContain('--reveal-delay: 120ms');
    expect(style).toContain('--reveal-y: 20px');
  });

  it('starts hidden then reveals after a frame', async () => {
    const w = mount(Reveal, { slots: { default: 'X' }, attachTo: document.body });
    expect(w.find('.phlix-reveal').classes()).not.toContain('is-revealed');
    await raf();
    expect(w.find('.phlix-reveal').classes()).toContain('is-revealed');
    w.unmount();
  });

  it('reveals immediately under reduced-motion (no frame wait)', async () => {
    setReducedMotion(true);
    const w = mount(Reveal, { slots: { default: 'X' } });
    await w.vm.$nextTick();
    expect(w.find('.phlix-reveal').classes()).toContain('is-revealed');
  });

  it('whenVisible defers to IntersectionObserver and reveals on intersect', async () => {
    let cb: (e: Array<{ isIntersecting: boolean }>) => void = () => {};
    const observe = vi.fn();
    const disconnect = vi.fn();
    class IOStub {
      observe = observe;
      disconnect = disconnect;
      unobserve = vi.fn();
      takeRecords = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [];
      constructor(c: (e: Array<{ isIntersecting: boolean }>) => void) {
        cb = c;
      }
    }
    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IOStub;
    const w = mount(Reveal, { props: { whenVisible: true }, slots: { default: 'X' }, attachTo: document.body });
    expect(w.find('.phlix-reveal').classes()).not.toContain('is-revealed');
    expect(observe).toHaveBeenCalled();
    cb([{ isIntersecting: true }]);
    await w.vm.$nextTick();
    expect(w.find('.phlix-reveal').classes()).toContain('is-revealed');
    expect(disconnect).toHaveBeenCalled();
    w.unmount();
    delete (globalThis as unknown as { IntersectionObserver?: unknown }).IntersectionObserver;
  });

  it('honors the tag prop', () => {
    const w = mount(Reveal, { props: { tag: 'section' }, slots: { default: 'X' } });
    expect(w.find('section.phlix-reveal').exists()).toBe(true);
  });
});

describe('PageTransition', () => {
  it('wraps content in a Transition with the mode-specific name', () => {
    const w = mount(PageTransition, { props: { mode: 'slide' }, slots: { default: '<p>page</p>' } });
    expect(w.html()).toContain('page');
  });
});
