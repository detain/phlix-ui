/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import Scrubber from './Scrubber.vue';
import { formatTime } from './format-time';

function mountScrubber(props: Record<string, unknown> = {}) {
  const w = mount(Scrubber, {
    props: { position: 0, duration: 200, buffered: 100, ...props },
    attachTo: document.body,
  });
  const track = w.get('.scrubber');
  // jsdom has no layout — give the track a deterministic geometry
  vi.spyOn(track.element, 'getBoundingClientRect').mockReturnValue({ left: 0, width: 100 } as DOMRect);
  // pointer capture isn't implemented in jsdom
  (track.element as HTMLElement).setPointerCapture = vi.fn();
  (track.element as HTMLElement).releasePointerCapture = vi.fn();
  return { w, track };
}

/** test-utils can't set read-only clientX on pointer events — dispatch manually. */
function firePointer(el: Element, type: string, clientX: number, pointerId = 1): void {
  const ev = new MouseEvent(type, { clientX, bubbles: true, cancelable: true });
  Object.defineProperty(ev, 'pointerId', { value: pointerId });
  el.dispatchEvent(ev);
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('formatTime', () => {
  it('formats m:ss and h:mm:ss', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(9)).toBe('0:09');
    expect(formatTime(90)).toBe('1:30');
    expect(formatTime(3700)).toBe('1:01:40');
    expect(formatTime(-5)).toBe('0:00');
    expect(formatTime(NaN)).toBe('0:00');
  });
});

describe('Scrubber — rendering', () => {
  it('sizes the played + buffered fills via a compositor transform (scaleX, not width) — R6.3', () => {
    const w = mount(Scrubber, { props: { position: 50, duration: 200, buffered: 100 } });
    const played = w.find('.scrubber__played').attributes('style') ?? '';
    const buffered = w.find('.scrubber__buffered').attributes('style') ?? '';
    // Fills scale horizontally from the left (composited) instead of animating
    // `width` (layout/paint) on every timeupdate/drag frame.
    expect(played).toContain('scaleX(0.25)'); // 50/200
    expect(buffered).toContain('scaleX(0.5)'); // 100/200
    // guard against a regression back to the layout-triggering width property
    expect(played).not.toContain('width');
    expect(buffered).not.toContain('width');
    // the playhead still tracks position (a single out-of-flow element)
    expect(w.find('.scrubber__head').attributes('style')).toContain('left: 25%');
  });

  it('exposes the ARIA slider contract', () => {
    const w = mount(Scrubber, { props: { position: 50, duration: 200 } });
    const el = w.get('.scrubber');
    expect(el.attributes('role')).toBe('slider');
    expect(el.attributes('aria-orientation')).toBe('horizontal'); // R6.5a — match ui/Slider
    expect(el.attributes('aria-valuemin')).toBe('0');
    expect(el.attributes('aria-valuemax')).toBe('200');
    expect(el.attributes('aria-valuenow')).toBe('50');
    expect(el.attributes('aria-valuetext')).toBe('0:50');
    expect(el.attributes('tabindex')).toBe('0');
  });

  it('renders chapter ticks inside the duration (and ignores out-of-range)', () => {
    const w = mount(Scrubber, {
      props: { position: 0, duration: 200, chapters: [{ start: 50 }, { start: 150 }, { start: 999 }, { start: 0 }] },
    });
    const ticks = w.findAll('.scrubber__tick');
    expect(ticks).toHaveLength(2); // 0 and 999 dropped
    expect(ticks[0].attributes('style')).toContain('left: 25%');
    expect(ticks[1].attributes('style')).toContain('left: 75%');
  });
});

describe('Scrubber — hover preview', () => {
  it('shows a timestamp bubble following the cursor on hover (no thumbnail)', async () => {
    const { w, track } = mountScrubber({ position: 0, duration: 200 });
    expect(w.find('.scrubber__preview').exists()).toBe(false);
    await track.trigger('pointerenter');
    firePointer(track.element, 'pointermove', 50);
    await w.vm.$nextTick();
    const preview = w.find('.scrubber__preview');
    expect(preview.exists()).toBe(true);
    expect(preview.find('.scrubber__thumb').exists()).toBe(false); // degrades to bubble
    expect(preview.find('.scrubber__time').text()).toBe('1:40'); // 50% of 200s
    await track.trigger('pointerleave');
    expect(w.find('.scrubber__preview').exists()).toBe(false);
  });

  it('shows a thumbnail when thumbnailAt yields one', async () => {
    const { w, track } = mountScrubber({ position: 0, duration: 200, thumbnailAt: (t: number) => `thumb-${Math.round(t)}.jpg` });
    await track.trigger('pointerenter');
    firePointer(track.element, 'pointermove', 25);
    await w.vm.$nextTick();
    const thumb = w.find('.scrubber__thumb');
    expect(thumb.exists()).toBe(true);
    expect(thumb.attributes('style')).toContain('thumb-50.jpg'); // 25% of 200
  });
});

describe('Scrubber — drag to seek (pointer)', () => {
  it('emits scrub-start on down, preview-only during drag, single seek on release', async () => {
    const { w, track } = mountScrubber({ position: 0, duration: 200 });
    firePointer(track.element, 'pointerdown', 25);
    await w.vm.$nextTick();
    expect(w.emitted('scrub-start')).toHaveLength(1);
    expect(w.emitted('seek')).toBeUndefined(); // no seek on down — preview only

    firePointer(track.element, 'pointermove', 75);
    await w.vm.$nextTick();
    expect(w.emitted('seek')).toBeUndefined(); // no seek during drag
    // head follows the drag, not the (still 0) position prop
    expect(w.find('.scrubber__head').attributes('style')).toContain('left: 75%');

    firePointer(track.element, 'pointerup', 75);
    await w.vm.$nextTick();
    expect(w.emitted('seek')?.[0]).toEqual([150]); // single seek on release: 75% × 200s
    expect(w.emitted('scrub-end')).toHaveLength(1);
  });

  it('does not seek when duration is 0', async () => {
    const { w, track } = mountScrubber({ position: 0, duration: 0 });
    firePointer(track.element, 'pointerdown', 50);
    await w.vm.$nextTick();
    expect(w.emitted('seek')).toBeUndefined();
    expect(w.emitted('scrub-start')).toBeUndefined();
  });

  it('a hover move (not dragging) does not emit seek', async () => {
    const { w, track } = mountScrubber({ position: 0, duration: 200 });
    await track.trigger('pointerenter');
    firePointer(track.element, 'pointermove', 50);
    await w.vm.$nextTick();
    expect(w.emitted('seek')).toBeUndefined();
  });

  it('ends the drag on pointercancel (no stuck dragging state)', async () => {
    const { w, track } = mountScrubber({ position: 0, duration: 200 });
    firePointer(track.element, 'pointerdown', 25);
    await w.vm.$nextTick();
    firePointer(track.element, 'pointercancel', 25);
    await w.vm.$nextTick();
    expect(w.emitted('scrub-end')).toHaveLength(1);
    // a subsequent move no longer seeks (drag was released)
    const seeksBefore = w.emitted('seek')?.length ?? 0;
    firePointer(track.element, 'pointermove', 75);
    await w.vm.$nextTick();
    expect(w.emitted('seek')?.length ?? 0).toBe(seeksBefore);
  });
});

describe('Scrubber — thumbnail url hardening', () => {
  it('quotes + escapes the thumbnail url so it cannot break out of CSS url()', async () => {
    const { w, track } = mountScrubber({
      position: 0,
      duration: 200,
      thumbnailAt: () => 'evil.jpg") ; background: url("x',
    });
    await track.trigger('pointerenter');
    firePointer(track.element, 'pointermove', 50);
    await w.vm.$nextTick();
    const style = w.find('.scrubber__thumb').attributes('style') ?? '';
    // the inner double-quotes are backslash-escaped (no unescaped breakout quote)
    expect(style).toContain('\\"');
    expect(style).not.toMatch(/url\("evil\.jpg"\)/); // not left as a bare closeable url
  });
});

describe('Scrubber — keyboard', () => {
  it('nudges ±step with arrows and jumps with Home/End', async () => {
    const w = mount(Scrubber, { props: { position: 100, duration: 200, step: 5 } });
    const el = w.get('.scrubber');
    await el.trigger('keydown', { key: 'ArrowRight' });
    expect(w.emitted('seek')?.[0]).toEqual([105]);
    await el.trigger('keydown', { key: 'ArrowLeft' });
    expect(w.emitted('seek')?.[1]).toEqual([95]);
    await el.trigger('keydown', { key: 'Home' });
    expect(w.emitted('seek')?.[2]).toEqual([0]);
    await el.trigger('keydown', { key: 'End' });
    expect(w.emitted('seek')?.[3]).toEqual([200]);
  });

  it('clamps arrow nudges to [0, duration] and ignores other keys', async () => {
    const w = mount(Scrubber, { props: { position: 2, duration: 200, step: 5 } });
    const el = w.get('.scrubber');
    await el.trigger('keydown', { key: 'ArrowLeft' });
    expect(w.emitted('seek')?.[0]).toEqual([0]); // clamped
    await el.trigger('keydown', { key: 'Enter' });
    expect(w.emitted('seek')).toHaveLength(1); // unchanged
  });
});
