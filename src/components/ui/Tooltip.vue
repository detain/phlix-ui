<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Tooltip — hover/focus description (R0.4d).
 *
 *   <Tooltip text="Add to watchlist"><IconButton name="plus" label="Add" /></Tooltip>
 *
 * Shows on hover and keyboard focus (focusin), hides on leave/blur/Esc, with a
 * small open delay. role="tooltip"; on show it wires aria-describedby onto the
 * actual trigger element (first child) so screen readers announce it. CSS-placed
 * (top/bottom/left/right). Reduced-motion aware.
 *
 * Contract: the default slot must have a SINGLE element root (the trigger) —
 * aria-describedby is wired onto that element. A text/multi-root slot still shows
 * the tooltip visually but cannot receive the description.
 *
 * HORIZONTAL CLIPPING (S190)
 * ---------------------------------------------------------------------------
 * The tip is `white-space: nowrap` and centred on its trigger, so on a narrow
 * card it can be far wider than the space either side of a 32px icon button —
 * and `.media-card__poster` is `overflow: hidden`, so the excess is CUT OFF, not
 * merely overhanging. `placement` cannot fix this: it is a VERTICAL knob (above
 * vs below the trigger) and does nothing about a tip wider than its container.
 *
 * Measured in real Chromium (bundled playwright build, the real `dist/style.css`
 * and `@phlix/tokens`, markup dumped from the real `MediaCard` render) on a
 * 160px rail card, BEFORE this fix:
 *
 *     "Remove from favorites"  tip 159.7px  →  51.9px past the poster's RIGHT edge
 *     "Mark as watched"        tip 125.7px  →  38.8px past the poster's LEFT edge
 *     "Play"                   tip  50.4px  →   1.2px past the poster's LEFT edge
 *
 * Both edges, depending on which button in the 4-across row hosts the tip. The
 * defect is real, not inferred.
 *
 * The fix is measured at show-time, because the geometry that decides it (how
 * wide the tip renders, where its trigger sits, where the clipping ancestor's
 * edges are) exists only at layout:
 *
 *   1. find the nearest ancestor that actually clips (`overflow` not `visible`);
 *   2. cap the tip at that ancestor's width minus a gutter, and let it WRAP —
 *      a long label becomes two short lines instead of one over-wide one;
 *   3. slide it back inside horizontally with a `--phlix-tooltip-shift` offset
 *      composed into the existing `translateX(-50%)` centring.
 *
 * ⚠ jsdom CANNOT see any of this: `getBoundingClientRect()` returns all-zero
 * rects there, and `0` is a number, so a `?? fallback` never fires and a naive
 * geometry assertion passes on the zero path. The `width <= 0` guard makes that
 * path an explicit NO-OP — under jsdom the tip keeps exactly its pre-S190
 * declarations — and the vitest suite therefore pins the DECLARATIONS and the
 * DOM/attribute structure only. The pixel result is verified separately in
 * Chromium (`npm run test:visual` is banned in this repo; the numbers above and
 * their post-fix counterparts were taken by hand with a headless-Chromium probe).
 *
 * Non-clipping hosts are untouched: with no clipping ancestor there is nothing to
 * clamp to, so the tip renders exactly as it did before.
 */
import { ref, useId, nextTick, onBeforeUnmount } from 'vue';

const props = withDefaults(
  defineProps<{
    text?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    disabled?: boolean;
  }>(),
  { placement: 'top', delay: 300, disabled: false },
);

const id = useId();
const shown = ref(false);
const wrapEl = ref<HTMLElement | null>(null);
const tipEl = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;

/**
 * Breathing room kept between the tip and the clipping ancestor's edge, in px.
 * Matches the 8px the `--top`/`--bottom` rules already put between tip and
 * trigger, so a clamped tip is inset by the same visual gutter it hangs by.
 */
const EDGE_GAP = 8;

function triggerEl(): HTMLElement | null {
  return (wrapEl.value?.firstElementChild as HTMLElement) ?? null;
}

/**
 * The nearest ancestor that would CLIP the tip — the first one whose computed
 * `overflow-x` is not `visible`.
 *
 * `overflow: hidden` on `.media-card__poster` is the case S190 was filed for, but
 * a scrolling rail (`overflow-x: auto`) clips just as hard, so the test is "does
 * this box clip", not "is it hidden". Stops at `<body>`: the viewport is not this
 * component's problem, and treating it as a clip box would move every tooltip on
 * every page.
 */
function clippingAncestor(from: HTMLElement): HTMLElement | null {
  let el = from.parentElement;
  while (el && el !== document.body && el !== document.documentElement) {
    const cs = getComputedStyle(el);
    // The shorthand is read as well as the longhand because **jsdom does not
    // expand `overflow` into `overflow-x`** — measured: `overflow: hidden` there
    // reports `overflowX: 'visible'`, `overflow: 'hidden'`, while an unset
    // element reports `overflowX: 'visible'`, `overflow: ''`. Reading only the
    // longhand would make `.media-card__poster`, the exact box S190 is about,
    // invisible to every jsdom test.
    //
    // It is also correct in a browser rather than merely tolerated: per CSS
    // Overflow 3, when one axis is not `visible` the other computes to `auto`, so
    // "this box clips vertically" already implies "it clips horizontally too".
    const clips = cs.overflowX !== 'visible' || (cs.overflow !== '' && cs.overflow !== 'visible');
    if (clips) return el;
    el = el.parentElement;
  }
  return null;
}

/** Drop every inline declaration `fitWithinClip()` may have written. */
function clearFit(tip: HTMLElement | null): void {
  if (!tip) return;
  tip.style.maxWidth = '';
  tip.style.whiteSpace = '';
  tip.style.removeProperty('--phlix-tooltip-shift');
}

/**
 * Cap the tip's width to the clipping ancestor and slide it back inside.
 *
 * Runs once the tip is in the DOM (so it has a rect). It writes only a width cap,
 * a wrap override and one custom property, so the stylesheet stays the single
 * owner of the placement rules — the shift is COMPOSED INTO the existing
 * `translateX(-50%)` rather than replacing it, which is what keeps `placement`
 * working unchanged.
 *
 * ⚠ The writes are IMPERATIVE, not a reactive `:style` binding, and that is
 * load-bearing rather than a style choice. The cap has to be in the DOM before
 * the next line measures the tip; a Vue-owned binding does not flush until after
 * this function returns, so the measurement would read the UNWRAPPED width and
 * over-correct. Caught by measurement, not by review: with the binding, the
 * 160px-card "Remove from favorites" case shifted −59.9px instead of −18.6px. It
 * still happened to land inside the card there, which is exactly how it would
 * have shipped unnoticed.
 */
function fitWithinClip(): void {
  const wrap = wrapEl.value;
  const tip = tipEl.value;
  if (!wrap || !tip) return;
  clearFit(tip);
  // `left`/`right` placements are offset horizontally BY DESIGN; shifting them
  // back would drag the tip onto its own trigger. S190 is explicitly scoped to
  // the horizontal overflow of the vertically-placed tips.
  if (props.placement === 'left' || props.placement === 'right') return;

  const clip = clippingAncestor(wrap);
  if (!clip) return;
  const box = clip.getBoundingClientRect();
  // jsdom reports 0 for every rect, and `0` is a number, so nothing downstream
  // would notice. Bail rather than compute a nonsense `max-width: -16px` and a
  // shift derived from two zeroes.
  if (box.width <= 0) return;

  // Let the tip wrap instead of running off the side. `white-space` has to be
  // overridden here as well: the base rule is `nowrap`, and a `max-width` alone
  // cannot break a line that is not allowed to break.
  tip.style.maxWidth = `${Math.max(0, box.width - EDGE_GAP * 2)}px`;
  tip.style.whiteSpace = 'normal';

  // Measured AFTER the cap — the wrap changes the tip's width.
  const r = tip.getBoundingClientRect();
  const pastRight = r.right - (box.right - EDGE_GAP);
  const pastLeft = box.left + EDGE_GAP - r.left;
  let shift = 0;
  if (pastRight > 0) shift = -pastRight;
  else if (pastLeft > 0) shift = pastLeft;
  if (shift !== 0) tip.style.setProperty('--phlix-tooltip-shift', `${shift}px`);
}

function show() {
  if (props.disabled) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    shown.value = true;
    triggerEl()?.setAttribute('aria-describedby', id);
    void nextTick(fitWithinClip);
  }, props.delay);
}
function hide() {
  clearTimeout(timer);
  clearFit(tipEl.value);
  shown.value = false;
  triggerEl()?.removeAttribute('aria-describedby');
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <span
    ref="wrapEl"
    class="phlix-tooltip-wrap"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
    @keydown.esc="hide"
  >
    <slot />
    <Transition name="phlix-tooltip">
      <span
        v-if="shown && (text || $slots.content)"
        :id="id"
        ref="tipEl"
        role="tooltip"
        class="phlix-tooltip"
        :class="`phlix-tooltip--${placement}`"
      >
        <slot name="content">{{ text }}</slot>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.phlix-tooltip-wrap { position: relative; display: inline-flex; }
.phlix-tooltip {
  position: absolute;
  z-index: 1100;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--surface-glass-strong);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-3);
  backdrop-filter: blur(8px);
  color: var(--text);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  white-space: nowrap;
  pointer-events: none;
}
/* S190 — `--phlix-tooltip-shift` is composed INTO the centring translate rather
   than replacing it, so an unclamped tip (shift unset ⇒ 0px) is byte-identical to
   the pre-S190 rendering and `placement` keeps working untouched. The variable is
   set inline by `fitWithinClip()` only when a real clipping ancestor was
   measured. */
.phlix-tooltip--top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(calc(-50% + var(--phlix-tooltip-shift, 0px)));
}
.phlix-tooltip--bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(calc(-50% + var(--phlix-tooltip-shift, 0px)));
}
.phlix-tooltip--left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.phlix-tooltip--right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }

.phlix-tooltip-enter-active, .phlix-tooltip-leave-active { transition: opacity var(--dur-fast) var(--ease-out); }
.phlix-tooltip-enter-from, .phlix-tooltip-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .phlix-tooltip-enter-active, .phlix-tooltip-leave-active { transition: none; }
}
</style>
