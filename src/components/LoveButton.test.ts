/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import LoveButton from './LoveButton.vue';

const sfcSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'LoveButton.vue'),
  'utf8',
);

describe('LoveButton — cycling', () => {
  it('cycles 0 → 1 → 2 → 3 → 0 and emits both cycle + update:level each click', async () => {
    // The component is controlled — re-feed the emitted level back as the prop
    // so a chain of clicks advances through the real sequence (parent-owned state).
    const w = mount(LoveButton, { props: { level: 0 } });

    const expected = [1, 2, 3, 0, 1];
    for (const want of expected) {
      await w.find('button').trigger('click');
      const cycle = w.emitted('cycle');
      const update = w.emitted('update:level');
      expect(cycle).toBeTruthy();
      expect(update).toBeTruthy();
      // most recent emission of each carries the NEXT level
      expect(cycle![cycle!.length - 1]).toEqual([want]);
      expect(update![update!.length - 1]).toEqual([want]);
      // feed it back so the next click advances from the new level
      await w.setProps({ level: want });
    }
  });

  it('from level 3 wraps back to 0', async () => {
    const w = mount(LoveButton, { props: { level: 3 } });
    await w.find('button').trigger('click');
    expect(w.emitted('cycle')!.at(-1)).toEqual([0]);
    expect(w.emitted('update:level')!.at(-1)).toEqual([0]);
  });

  it('does not emit when disabled', async () => {
    const w = mount(LoveButton, { props: { level: 1, disabled: true } });
    await w.find('button').trigger('click');
    expect(w.emitted('cycle')).toBeUndefined();
    expect(w.emitted('update:level')).toBeUndefined();
    expect(w.find('button').attributes('disabled')).toBeDefined();
  });
});

describe('LoveButton — visual state per level', () => {
  it('level 0 is the outline/wireframe heart (no fill, not pressed, no scale class beyond level-0)', () => {
    const w = mount(LoveButton, { props: { level: 0 } });
    const btn = w.find('button');
    expect(btn.classes()).toContain('love-button--level-0');
    expect(btn.classes()).not.toContain('is-loved');
    expect(btn.attributes('aria-pressed')).toBe('false');
    expect(btn.attributes('data-level')).toBe('0');
  });

  it('levels 1–3 are filled (is-loved + aria-pressed) with the per-level scale class', () => {
    for (const level of [1, 2, 3]) {
      const w = mount(LoveButton, { props: { level } });
      const btn = w.find('button');
      expect(btn.classes()).toContain(`love-button--level-${level}`);
      expect(btn.classes()).toContain('is-loved');
      expect(btn.attributes('aria-pressed')).toBe('true');
      expect(btn.attributes('data-level')).toBe(String(level));
    }
  });

  it('clamps out-of-range / non-integer levels for display', () => {
    expect(mount(LoveButton, { props: { level: 9 } }).find('button').attributes('data-level')).toBe('3');
    expect(mount(LoveButton, { props: { level: -2 } }).find('button').attributes('data-level')).toBe('0');
    expect(mount(LoveButton, { props: { level: 1.7 } }).find('button').attributes('data-level')).toBe('1');
    expect(mount(LoveButton, { props: { level: NaN } }).find('button').attributes('data-level')).toBe('0');
  });

  it('renders the heart icon (only glyph the icon set ships for this control)', () => {
    const w = mount(LoveButton, { props: { level: 2 } });
    expect(w.find('.love-button__icon').exists()).toBe(true);
  });

  it('reflects a reactive level change in class + aria after the prop updates', async () => {
    const w = mount(LoveButton, { props: { level: 0 } });
    expect(w.find('button').attributes('aria-pressed')).toBe('false');
    await w.setProps({ level: 2 });
    await nextTick();
    const btn = w.find('button');
    expect(btn.classes()).toContain('love-button--level-2');
    expect(btn.attributes('aria-pressed')).toBe('true');
  });
});

describe('LoveButton — accessibility + keyboard', () => {
  it('aria-label is meaningful and changes per level', () => {
    const labels = [0, 1, 2, 3].map(
      (level) => mount(LoveButton, { props: { level } }).find('button').attributes('aria-label'),
    );
    // all four are distinct, non-empty strings
    expect(new Set(labels).size).toBe(4);
    for (const l of labels) expect((l ?? '').length).toBeGreaterThan(0);
  });

  it('is a real <button> so Enter/Space activate it natively (click fires)', async () => {
    const w = mount(LoveButton, { props: { level: 0 } });
    expect(w.find('button').element.tagName).toBe('BUTTON');
    expect(w.find('button').attributes('type')).toBe('button');
    // a native button dispatches a click on Enter/Space; simulate the resulting click
    await w.find('button').trigger('keydown.enter');
    await w.find('button').trigger('click');
    expect(w.emitted('cycle')!.at(-1)).toEqual([1]);
  });
});

describe('LoveButton — reduced motion', () => {
  it('declares a transition by default and disables it under prefers-reduced-motion', () => {
    // The scoped <style> carries the transition + the @media (prefers-reduced-motion)
    // override; assert both are present in the SFC source so the gate can never be
    // silently dropped (the global html[data-reduced-motion] kill-switch is the
    // primary guard, tested in tokens/reduced-motion.test.ts).
    const flat = sfcSource.replace(/\s+/g, ' ');
    expect(flat).toContain('transition:');
    expect(flat).toContain('@media (prefers-reduced-motion: reduce)');
    // the media block neutralizes the transition (use the LAST occurrence — the
    // first match is in the docblock comment, the real CSS rule is last).
    const start = flat.lastIndexOf('@media (prefers-reduced-motion: reduce)');
    const block = flat.slice(start, flat.indexOf('}', flat.indexOf('}', start) + 1) + 1);
    expect(block).toContain('transition: none');
  });
});
