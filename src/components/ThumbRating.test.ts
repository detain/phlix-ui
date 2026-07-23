/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import ThumbRating from './ThumbRating.vue';

const sfcSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'ThumbRating.vue'),
  'utf8',
);

const up = (w: ReturnType<typeof mount>) => w.find('.thumb-rating__btn--up');
const down = (w: ReturnType<typeof mount>) => w.find('.thumb-rating__btn--down');

describe('ThumbRating — level 0 (not set)', () => {
  it('shows BOTH thumbs as wireframe (no filled/blue class, aria-pressed false)', () => {
    const w = mount(ThumbRating, { props: { level: 0 } });
    expect(up(w).exists()).toBe(true);
    expect(down(w).exists()).toBe(true);
    for (const btn of [up(w), down(w)]) {
      expect(btn.classes()).not.toContain('is-filled');
      expect(btn.classes()).not.toContain('is-blue');
      expect(btn.attributes('aria-pressed')).toBe('false');
    }
    expect(w.find('.thumb-rating').attributes('data-level')).toBe('0');
  });

  it('clicking thumbs-up emits cycle + update:level with 1', async () => {
    const w = mount(ThumbRating, { props: { level: 0 } });
    await up(w).trigger('click');
    expect(w.emitted('cycle')!.at(-1)).toEqual([1]);
    expect(w.emitted('update:level')!.at(-1)).toEqual([1]);
  });

  it('clicking thumbs-down emits cycle + update:level with −1', async () => {
    const w = mount(ThumbRating, { props: { level: 0 } });
    await down(w).trigger('click');
    expect(w.emitted('cycle')!.at(-1)).toEqual([-1]);
    expect(w.emitted('update:level')!.at(-1)).toEqual([-1]);
  });
});

describe('ThumbRating — up axis (like/love)', () => {
  it('level 1 renders ONLY the up button, filled/white (not blue), pressed', () => {
    const w = mount(ThumbRating, { props: { level: 1 } });
    expect(up(w).exists()).toBe(true);
    expect(down(w).exists()).toBe(false);
    expect(up(w).classes()).toContain('is-filled');
    expect(up(w).classes()).not.toContain('is-blue');
    expect(up(w).attributes('aria-pressed')).toBe('true');
  });

  it('clicking up at level 1 advances to 2 (blue + larger)', async () => {
    const w = mount(ThumbRating, { props: { level: 1 } });
    await up(w).trigger('click');
    expect(w.emitted('cycle')!.at(-1)).toEqual([2]);
    await w.setProps({ level: 2 });
    expect(up(w).classes()).toContain('is-filled');
    expect(up(w).classes()).toContain('is-blue');
    expect(down(w).exists()).toBe(false);
  });

  it('clicking up at level 2 wraps back to 0', async () => {
    const w = mount(ThumbRating, { props: { level: 2 } });
    await up(w).trigger('click');
    expect(w.emitted('cycle')!.at(-1)).toEqual([0]);
    expect(w.emitted('update:level')!.at(-1)).toEqual([0]);
  });

  it('full up cycle across successive clicks: 0 → 1 → 2 → 0', async () => {
    const w = mount(ThumbRating, { props: { level: 0 } });
    for (const want of [1, 2, 0]) {
      await up(w).trigger('click');
      expect(w.emitted('cycle')!.at(-1)).toEqual([want]);
      await w.setProps({ level: want });
    }
  });
});

describe('ThumbRating — down axis (dislike/strongly dislike)', () => {
  it('level −1 renders ONLY the down button, filled/white (not blue), pressed', () => {
    const w = mount(ThumbRating, { props: { level: -1 } });
    expect(down(w).exists()).toBe(true);
    expect(up(w).exists()).toBe(false);
    expect(down(w).classes()).toContain('is-filled');
    expect(down(w).classes()).not.toContain('is-blue');
    expect(down(w).attributes('aria-pressed')).toBe('true');
  });

  it('level −2 renders ONLY the down button, blue + filled', () => {
    const w = mount(ThumbRating, { props: { level: -2 } });
    expect(down(w).exists()).toBe(true);
    expect(up(w).exists()).toBe(false);
    expect(down(w).classes()).toContain('is-filled');
    expect(down(w).classes()).toContain('is-blue');
  });

  it('full down cycle across successive clicks: 0 → −1 → −2 → 0', async () => {
    const w = mount(ThumbRating, { props: { level: 0 } });
    for (const want of [-1, -2, 0]) {
      await down(w).trigger('click');
      expect(w.emitted('cycle')!.at(-1)).toEqual([want]);
      expect(w.emitted('update:level')!.at(-1)).toEqual([want]);
      await w.setProps({ level: want });
    }
  });
});

describe('ThumbRating — disabled + clamping', () => {
  it('does not emit when disabled (up)', async () => {
    const w = mount(ThumbRating, { props: { level: 0, disabled: true } });
    await up(w).trigger('click');
    expect(w.emitted('cycle')).toBeUndefined();
    expect(w.emitted('update:level')).toBeUndefined();
    expect(up(w).attributes('disabled')).toBeDefined();
  });

  it('does not emit when disabled (down)', async () => {
    const w = mount(ThumbRating, { props: { level: 0, disabled: true } });
    await down(w).trigger('click');
    expect(w.emitted('cycle')).toBeUndefined();
    expect(down(w).attributes('disabled')).toBeDefined();
  });

  it('clamps out-of-range / non-integer levels for display', async () => {
    expect(mount(ThumbRating, { props: { level: 9 } }).find('.thumb-rating').attributes('data-level')).toBe('2');
    expect(mount(ThumbRating, { props: { level: -9 } }).find('.thumb-rating').attributes('data-level')).toBe('-2');
    expect(mount(ThumbRating, { props: { level: 1.7 } }).find('.thumb-rating').attributes('data-level')).toBe('1');
    expect(mount(ThumbRating, { props: { level: NaN } }).find('.thumb-rating').attributes('data-level')).toBe('0');
  });

  it('reflects a reactive level change (0 → 2) in the rendered buttons', async () => {
    const w = mount(ThumbRating, { props: { level: 0 } });
    expect(down(w).exists()).toBe(true);
    await w.setProps({ level: 2 });
    await nextTick();
    expect(down(w).exists()).toBe(false);
    expect(up(w).classes()).toContain('is-blue');
  });
});

describe('ThumbRating — accessibility', () => {
  it('both thumbs are real type="button" elements with Like/Dislike aria-labels', () => {
    const w = mount(ThumbRating, { props: { level: 0 } });
    expect(up(w).element.tagName).toBe('BUTTON');
    expect(up(w).attributes('type')).toBe('button');
    expect(up(w).attributes('aria-label')).toBe('Like');
    expect(down(w).attributes('aria-label')).toBe('Dislike');
  });
});

describe('ThumbRating — theme token (S18)', () => {
  it('the resting wireframe glyph uses var(--text), not a hardcoded near-white rgba', () => {
    // The base .thumb-rating__btn colour must be the theme foreground token so the
    // wireframe thumbs invert correctly per theme (Nocturne/Daylight/Midnight)
    // instead of always rendering near-white.
    const flat = sfcSource.replace(/\s+/g, ' ');
    expect(flat).not.toContain('rgba(255, 255, 255, 0.92)');
    const start = flat.indexOf('.thumb-rating__btn {');
    expect(start).toBeGreaterThanOrEqual(0);
    const block = flat.slice(start, flat.indexOf('}', start) + 1);
    expect(block).toContain('color: var(--text)');
  });
});

describe('ThumbRating — reduced motion', () => {
  it('declares a transition by default and disables it under prefers-reduced-motion', () => {
    // The scoped <style> carries the transition + the @media (prefers-reduced-motion)
    // override; assert both are present so the gate can never be silently dropped
    // (the global html[data-reduced-motion] kill-switch is the primary guard).
    const flat = sfcSource.replace(/\s+/g, ' ');
    expect(flat).toContain('transition:');
    expect(flat).toContain('@media (prefers-reduced-motion: reduce)');
    const start = flat.lastIndexOf('@media (prefers-reduced-motion: reduce)');
    const block = flat.slice(start, flat.indexOf('}', flat.indexOf('}', start) + 1) + 1);
    expect(block).toContain('transition: none');
  });
});
