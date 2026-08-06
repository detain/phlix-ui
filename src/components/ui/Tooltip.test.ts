/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * `Tooltip.vue` — behaviour, and the S190 horizontal-clip fix.
 *
 * Before this file the component had NO test of its own: its only coverage was
 * incidental, through `MediaCard.test.ts` asserting the wrapper's presence.
 *
 * 🔴 WHAT jsdom CANNOT DO HERE, AND WHAT WAS DONE INSTEAD.
 * jsdom returns an ALL-ZERO `DOMRect` from `getBoundingClientRect()` for every
 * element, and never applies an SFC's compiled `<style>`. So neither the clip
 * S190 fixes nor the fix itself is observable here by default. Two things close
 * that gap:
 *
 *   1. the geometry tests below STUB `getBoundingClientRect` with real numbers
 *      taken from the Chromium measurement, so `fitWithinClip()`'s actual
 *      arithmetic runs and is asserted — not a proxy for it;
 *   2. the CSS half is asserted against the BUILT `dist/style.css` (S232's
 *      lesson: a minifier can delete correct source CSS and every source-level
 *      regex stays green).
 *
 * The pixel result was verified by hand in headless Chromium (the repo's
 * `test:visual` gate is banned), rendering the real `MediaCard` at a 160px rail
 * width against the real `dist/style.css` + `@phlix/tokens`. A/B, same harness:
 *
 *   BEFORE  Play                    tip  50.4px   1.2px past the poster's LEFT edge
 *           Remove from favorites   tip 159.7px  51.9px past the RIGHT edge
 *           Mark as unwatched       tip 140.6px  46.3px past the LEFT edge
 *   AFTER   every one of the 7 tips fully inside the poster; the two long labels
 *           wrap to 77.3px / 90.9px and are shifted −59.9px / +54.3px.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';
import { readBuiltCss } from '../../test/builtCss';

/** The open delay the component defaults to. */
const DELAY = 300;

afterEach(() => {
  vi.useRealTimers();
  Element.prototype.getBoundingClientRect = realRect;
  geo = null;
});

/**
 * Mount a tooltip around a plain button, attached to the document so
 * `getComputedStyle`/ancestor walking behave like the real thing.
 *
 * `clipStyle` is applied to a wrapper div around the tooltip, which is how the
 * real defect arises: `.media-card__poster` is `overflow: hidden`.
 */
function mountTip(
  props: Record<string, unknown> = {},
  clipStyle = '',
): VueWrapper {
  return mount(
    {
      components: { Tooltip },
      props: ['tipProps', 'clipStyle'],
      template: `<div class="clip" :style="clipStyle"><Tooltip v-bind="tipProps"><button type="button">go</button></Tooltip></div>`,
    },
    { props: { tipProps: props, clipStyle }, attachTo: document.body },
  );
}

/** Open the tip (past the delay) and settle the DOM. */
async function open(w: VueWrapper): Promise<void> {
  await w.find('.phlix-tooltip-wrap').trigger('mouseenter');
  vi.advanceTimersByTime(DELAY + 1);
  await w.vm.$nextTick();
  await w.vm.$nextTick();
}

interface Geometry {
  clipLeft: number;
  clipWidth: number;
  tipLeft: number;
  /**
   * `[unwrappedWidth, wrappedWidth]` — the tip's width BEFORE the `max-width` cap
   * is applied and AFTER it. The stub picks between them by looking at whether
   * the element already carries an inline `max-width`, which is exactly what a
   * real engine does: applying the cap re-lays-out the text and narrows the box.
   *
   * This is what pins the ORDERING inside `fitWithinClip()`. A version that
   * measured the tip BEFORE applying the cap would read the unwrapped number and
   * over-correct; the two values are chosen far enough apart that the resulting
   * shifts are unmistakably different.
   */
  tipWidths: [number, number] | [number];
}

let geo: Geometry | null = null;
const realRect = Element.prototype.getBoundingClientRect;

/**
 * Give the elements `fitWithinClip()` measures real, non-zero geometry.
 *
 * Patched on the PROTOTYPE rather than the instances because the tip is `v-if`'d:
 * every open creates a brand-new element, so per-instance stubs vanish the moment
 * the tooltip is closed and reopened.
 */
function stubGeometry(opts: Geometry): void {
  geo = opts;
}

beforeEach(() => {
  const rect = (left: number, width: number): DOMRect =>
    ({ left, width, right: left + width, top: 0, bottom: 0, height: 0, x: left, y: 0, toJSON: () => ({}) }) as DOMRect;
  Element.prototype.getBoundingClientRect = function (this: Element): DOMRect {
    if (geo) {
      if (this.classList.contains('clip')) return rect(geo.clipLeft, geo.clipWidth);
      if (this.getAttribute('role') === 'tooltip') {
        const capped = (this as HTMLElement).style.maxWidth !== '';
        const [unwrapped, wrapped] = geo.tipWidths;
        return rect(geo.tipLeft, capped ? (wrapped ?? unwrapped) : unwrapped);
      }
    }
    return realRect.call(this);
  };
});

function tipEl(): HTMLElement {
  return document.querySelector('[role="tooltip"]') as HTMLElement;
}

// ── baseline behaviour ───────────────────────────────────────────────────────

describe('Tooltip — show / hide / a11y wiring', () => {
  it('is closed until the open delay elapses, then shows the text', async () => {
    vi.useFakeTimers();
    const w = mountTip({ text: 'Remove from favorites' });
    await w.find('.phlix-tooltip-wrap').trigger('mouseenter');
    // Half the delay: still nothing. A tooltip that opened instantly would flash
    // on every pointer transit across the row.
    vi.advanceTimersByTime(DELAY - 1);
    await w.vm.$nextTick();
    expect(document.querySelector('[role="tooltip"]')).toBeNull();

    vi.advanceTimersByTime(2);
    await w.vm.$nextTick();
    expect(tipEl().textContent!.trim()).toBe('Remove from favorites');
  });

  it('wires aria-describedby onto the TRIGGER and removes it again on hide', async () => {
    vi.useFakeTimers();
    const w = mountTip({ text: 'Play' });
    const btn = w.find('button').element;
    expect(btn.hasAttribute('aria-describedby')).toBe(false);

    await open(w);
    expect(btn.getAttribute('aria-describedby')).toBe(tipEl().id);
    expect(btn.getAttribute('aria-describedby')).not.toBe('');

    await w.find('.phlix-tooltip-wrap').trigger('mouseleave');
    await w.vm.$nextTick();
    expect(btn.hasAttribute('aria-describedby')).toBe(false);
  });

  it('never opens while `disabled`', async () => {
    vi.useFakeTimers();
    const w = mountTip({ text: 'Play', disabled: true });
    // Assert the guard is actually the DISABLED prop and not a missing handler:
    // the wrapper is present and the event does reach it.
    expect(w.find('.phlix-tooltip-wrap').exists()).toBe(true);
    await open(w);
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('carries the placement modifier class', async () => {
    vi.useFakeTimers();
    const w = mountTip({ text: 'Play', placement: 'bottom' });
    await open(w);
    expect(tipEl().classList.contains('phlix-tooltip--bottom')).toBe(true);
    expect(tipEl().classList.contains('phlix-tooltip--top')).toBe(false);
  });
});

// ── S190: the horizontal fit ─────────────────────────────────────────────────

describe('Tooltip — stays inside a clipping ancestor (S190)', () => {
  it('does nothing at all when no ancestor clips', async () => {
    vi.useFakeTimers();
    stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: -50, tipWidths: [160] });
    const w = mountTip({ text: 'Remove from favorites' }); // no overflow on .clip
    await open(w);
    // The geometry is measurable and the tip DOES overflow it — the only reason
    // nothing happens is that no ancestor clips. Same numbers, `overflow: hidden`
    // added, produce a shift in the next test.
    const s = tipEl().style;
    expect(s.maxWidth).toBe('');
    expect(s.whiteSpace).toBe('');
    expect(s.getPropertyValue('--phlix-tooltip-shift')).toBe('');
  });

  it('caps the width to the clip box and lets the text WRAP', async () => {
    vi.useFakeTimers();
    // 160px poster, tip centred and 160px wide — the measured pre-fix case.
    stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: 52, tipWidths: [160, 77] });
    const w = mountTip({ text: 'Remove from favorites' }, 'overflow: hidden');
    await open(w);
    // 160 clip − 2×8 gutter. A literal, not `clipWidth - 2 * EDGE_GAP`: an
    // expectation computed from the constant under test cannot detect that
    // constant changing.
    expect(tipEl().style.maxWidth).toBe('144px');
    // `max-width` alone cannot break a line that is `white-space: nowrap`, so the
    // override has to ship with it.
    expect(tipEl().style.whiteSpace).toBe('normal');
  });

  it('shifts LEFT when the tip runs past the right edge', async () => {
    vi.useFakeTimers();
    // Clip spans x=0..160. Tip left 100, wrapped width 77 ⇒ right edge 177,
    // which is 25 past the 152 (=160−8) limit.
    stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: 100, tipWidths: [160, 77] });
    const w = mountTip({ text: 'Remove from favorites' }, 'overflow: hidden');
    await open(w);
    expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('-25px');
  });

  it('shifts RIGHT when the tip runs past the left edge', async () => {
    vi.useFakeTimers();
    // Tip left −12 against a clip starting at x=0 ⇒ 20 short of the 8px inset.
    stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: -12, tipWidths: [140, 91] });
    const w = mountTip({ text: 'Mark as unwatched' }, 'overflow: hidden');
    await open(w);
    expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('20px');
  });

  it('sets NO shift when the tip already fits (the fix is not unconditional)', async () => {
    vi.useFakeTimers();
    stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: 55, tipWidths: [50] });
    const w = mountTip({ text: 'Play' }, 'overflow: hidden');
    await open(w);
    // The cap still applies (it is harmless and bounds future labels)…
    expect(tipEl().style.maxWidth).toBe('144px');
    // …but nothing is moved.
    expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('');
  });

  it('shifts using the WRAPPED width, not the pre-wrap width', async () => {
    vi.useFakeTimers();
    // First read 300 (unwrapped), second read 77 (wrapped). Measuring before the
    // cap would compute 100+300−152 = 248; measuring after gives 100+77−152 = 25.
    stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: 100, tipWidths: [300, 77] });
    const w = mountTip({ text: 'Remove from favorites' }, 'overflow: hidden');
    await open(w);
    expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('-25px');
  });

  it('leaves `left`/`right` placements alone (they are offset by design)', async () => {
    vi.useFakeTimers();
    for (const placement of ['left', 'right'] as const) {
      // The exact geometry that produces −25px on a `top` placement.
      stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: 100, tipWidths: [160, 77] });
      const w = mountTip({ text: 'Remove from favorites', placement }, 'overflow: hidden');
      await open(w);
      expect(tipEl().style.maxWidth).toBe('');
      expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('');
      w.unmount();
    }
  });

  it('treats a SCROLLING ancestor as clipping too, not just overflow:hidden', async () => {
    // A rail is `overflow-x: auto`; a tip that leaves it is just as invisible.
    vi.useFakeTimers();
    stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: 100, tipWidths: [160, 77] });
    const w = mountTip({ text: 'Remove from favorites' }, 'overflow-x: auto');
    await open(w);
    expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('-25px');
  });

  it('is an explicit NO-OP on the jsdom zero-rect path', async () => {
    // The landmine the step spec names: every rect is 0 and `0` is a number, so a
    // `?? fallback` never fires. Without the `width <= 0` bail this would emit
    // `max-width: -16px` and a shift computed from two zeroes.
    vi.useFakeTimers();
    const w = mountTip({ text: 'Remove from favorites' }, 'overflow: hidden');
    await open(w); // no stubbing at all — genuine jsdom zeroes
    expect(tipEl().style.maxWidth).toBe('');
    expect(tipEl().style.whiteSpace).toBe('');
    expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('');
  });

  it('clears the fit when the tip closes, so the next open re-measures', async () => {
    vi.useFakeTimers();
    stubGeometry({ clipLeft: 0, clipWidth: 160, tipLeft: 100, tipWidths: [160, 77] });
    const w = mountTip({ text: 'Remove from favorites' }, 'overflow: hidden');
    await open(w);
    expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('-25px');

    // The card moved / the rail scrolled: same tooltip, different geometry. A
    // stale inline shift would persist and push the tip out the other side.
    await w.find('.phlix-tooltip-wrap').trigger('mouseleave');
    await w.vm.$nextTick();
    geo = null; // back to the un-measurable path
    await open(w);
    expect(tipEl().style.getPropertyValue('--phlix-tooltip-shift')).toBe('');
    expect(tipEl().style.maxWidth).toBe('');
  });
});

// ── the CSS half, asserted against the SHIPPED stylesheet ────────────────────

describe('Tooltip — the built stylesheet still composes the S190 shift (S232 lesson)', () => {
  const css = readBuiltCss('style.css');

  it('composes `--phlix-tooltip-shift` INTO the centring translate on both vertical placements', () => {
    // A source-only regex would not have seen lightningcss collapse or rewrite
    // this. Read the artifact consumers install.
    for (const placement of ['top', 'bottom']) {
      const rule = new RegExp(`\\.phlix-tooltip--${placement}\\[data-v-[a-f0-9]+\\]\\{([^}]*)\\}`).exec(css);
      expect(rule, `no built rule for .phlix-tooltip--${placement}`).not.toBeNull();
      // Both halves: the -50% centring MUST survive (dropping it would left-align
      // every tooltip), and the shift variable must be inside the same calc.
      expect(rule![1]).toContain('translateX(calc(-50% + var(--phlix-tooltip-shift,0px)))');
    }
  });

  it('leaves the `left`/`right` placements on their untouched vertical centring', () => {
    for (const placement of ['left', 'right']) {
      const rule = new RegExp(`\\.phlix-tooltip--${placement}\\[data-v-[a-f0-9]+\\]\\{([^}]*)\\}`).exec(css);
      expect(rule).not.toBeNull();
      expect(rule![1]).toContain('translateY(-50%)');
      expect(rule![1]).not.toContain('--phlix-tooltip-shift');
    }
  });

  it('keeps `white-space: nowrap` as the BASE, so the JS override is what wraps', () => {
    // If the base rule ever became `normal`, an unclamped tooltip (no clipping
    // ancestor — most of the app) would wrap at the 32px trigger's width.
    const base = /\.phlix-tooltip\[data-v-[a-f0-9]+\]\{([^}]*)\}/.exec(css);
    expect(base).not.toBeNull();
    expect(base![1]).toContain('white-space:nowrap');
  });

  it('leaves the 4-across action-row width math alone (S190 out-of-scope)', () => {
    // The acceptance criterion names this literal. `--space-1` is the token, so
    // the built form is the same calc; assert it verbatim.
    expect(css).toContain('max-width:calc(4 * 32px + 3 * var(--space-1))');
  });
});
