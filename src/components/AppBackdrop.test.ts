/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppBackdrop from './AppBackdrop.vue';

function setMedia(reduceMotion = false, reduceData = false) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: (reduceMotion && q.includes('reduced-motion')) || (reduceData && q.includes('reduced-data')),
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('AppBackdrop', () => {
  beforeEach(() => setMedia(false, false));
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders grain + vignette by default, ambient only when requested', async () => {
    const w = mount(AppBackdrop);
    await w.vm.$nextTick();
    expect(w.find('.phlix-backdrop__grain').exists()).toBe(true);
    expect(w.find('.phlix-backdrop__vignette').exists()).toBe(true);
    expect(w.find('.phlix-backdrop__ambient').exists()).toBe(false);
  });

  it('renders ambient color glow when ambient + ambientColor given', async () => {
    const w = mount(AppBackdrop, { props: { ambient: true, ambientColor: '#f5a524' } });
    await w.vm.$nextTick();
    const amb = w.find('.phlix-backdrop__ambient');
    expect(amb.exists()).toBe(true);
    // browsers normalize #f5a524 → rgb(245, 165, 36)
    expect(amb.attributes('style')).toMatch(/radial-gradient/);
    expect(amb.attributes('style')).toContain('245, 165, 36');
  });

  it('uses a blurred poster image for ambient when ambientImage given', async () => {
    const w = mount(AppBackdrop, { props: { ambient: true, ambientImage: 'https://x/p.jpg' } });
    await w.vm.$nextTick();
    const amb = w.find('.phlix-backdrop__ambient');
    expect(amb.classes()).toContain('is-image');
    expect(amb.attributes('style')).toContain('p.jpg');
  });

  it('renders nothing when disabled', async () => {
    const w = mount(AppBackdrop, { props: { enabled: false, ambient: true, ambientColor: '#fff' } });
    await w.vm.$nextTick();
    expect(w.find('.phlix-backdrop__grain').exists()).toBe(false);
    expect(w.find('.phlix-backdrop__vignette').exists()).toBe(false);
    expect(w.find('.phlix-backdrop__ambient').exists()).toBe(false);
  });

  it('auto-disables under prefers-reduced-motion', async () => {
    setMedia(true, false);
    const w = mount(AppBackdrop, { props: { ambient: true, ambientColor: '#fff' } });
    await w.vm.$nextTick();
    expect(w.find('.phlix-backdrop__grain').exists()).toBe(false);
    expect(w.find('.phlix-backdrop__ambient').exists()).toBe(false);
  });

  it('auto-disables under prefers-reduced-data', async () => {
    setMedia(false, true);
    const w = mount(AppBackdrop);
    await w.vm.$nextTick();
    expect(w.find('.phlix-backdrop__grain').exists()).toBe(false);
  });

  it('is decorative (aria-hidden on each rendered layer)', async () => {
    const w = mount(AppBackdrop, { props: { ambient: true, ambientColor: '#fff' } });
    await w.vm.$nextTick();
    expect(w.find('.phlix-backdrop__grain').attributes('aria-hidden')).toBe('true');
    expect(w.find('.phlix-backdrop__vignette').attributes('aria-hidden')).toBe('true');
    expect(w.find('.phlix-backdrop__ambient').attributes('aria-hidden')).toBe('true');
  });

  it('sanitizes a malicious ambientImage URL (no url() breakout)', async () => {
    const w = mount(AppBackdrop, {
      props: { ambient: true, ambientImage: 'x.jpg") ; background: red; --x:url("y' },
    });
    await w.vm.$nextTick();
    const style = w.find('.phlix-backdrop__ambient').attributes('style') ?? '';
    // the injected quote/paren are percent-encoded → no breakout out of url(...)
    expect(style).not.toContain('background: red'); // not a real declaration
    expect(style).toContain('%22'); // encoded "
    expect(style).toContain('%29'); // encoded )
  });

  it('scales grain opacity by intensity', async () => {
    const w = mount(AppBackdrop, { props: { intensity: 0.5 } });
    await w.vm.$nextTick();
    expect(w.find('.phlix-backdrop__grain').attributes('style')).toContain('* 0.5');
  });
});
