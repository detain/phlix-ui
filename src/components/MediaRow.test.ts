/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readBuiltCss, scopedRuleBodies } from '../test/builtCss';
import MediaRow from './MediaRow.vue';
import MediaCard from './MediaCard.vue';
import EmptyState from './ui/EmptyState.vue';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Stub `window.matchMedia` so a query matches iff `predicate(query)` is true. */
function stubMatchMedia(predicate: (query: string) => boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: predicate(query),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

/**
 * Make a rail element report a fixed, overflowing geometry — jsdom does not lay
 * out, so `scrollWidth`/`clientWidth` are otherwise 0. Returns a setter for the
 * current `scrollLeft` (to simulate paging to the end).
 */
function simulateOverflow(
  el: HTMLElement,
  opts: { scrollWidth: number; clientWidth: number },
): (scrollLeft: number) => void {
  let scrollLeft = 0;
  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => opts.clientWidth });
  Object.defineProperty(el, 'scrollWidth', { configurable: true, get: () => opts.scrollWidth });
  Object.defineProperty(el, 'scrollLeft', { configurable: true, get: () => scrollLeft });
  return (v: number) => {
    scrollLeft = v;
  };
}

/**
 * Whether an arrow (matched by `selector`) is currently suppressed. `v-show`
 * toggles the inline `display: none`, which is deterministic in jsdom — unlike
 * `isVisible()`, which walks computed layout and is unreliable here.
 */
function arrowHidden(w: ReturnType<typeof mount>, selector: string): boolean {
  return (w.find(selector).attributes('style') ?? '').includes('display: none');
}

describe('MediaRow', () => {
  it('renders the title and one MediaCard per item', () => {
    const items = [media({ id: 'a' }), media({ id: 'b' }), media({ id: 'c' })];
    const w = mount(MediaRow, { props: { title: 'Recently Added', items } });
    expect(w.find('.media-row__title').text()).toBe('Recently Added');
    expect(w.findAllComponents(MediaCard)).toHaveLength(3);
  });

  it('shows a formatted count next to the title when given', () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [media()], count: 1284 } });
    expect(w.find('.media-row__count').text()).toBe('1,284');
  });

  it('renders skeleton cells (no MediaCard) on the initial load', () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [], loading: true, skeletonCount: 4 } });
    const rail = w.find('.media-row__rail');
    expect(rail.attributes('aria-busy')).toBe('true');
    expect(w.findAll('.media-row__skel-poster')).toHaveLength(4);
    expect(w.findComponent(MediaCard).exists()).toBe(false);
  });

  it('renders an EmptyState when settled with no items', () => {
    const w = mount(MediaRow, { props: { title: 'My List', items: [], emptyText: 'Nothing saved.' } });
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(w.text()).toContain('Nothing saved.');
  });

  it('collapses entirely when hideWhenEmpty + settled empty', () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [], hideWhenEmpty: true } });
    expect(w.find('.media-row').exists()).toBe(false);
    expect(w.findComponent(EmptyState).exists()).toBe(false);
  });

  it('still renders skeletons while loading even with hideWhenEmpty', () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [], loading: true, hideWhenEmpty: true } });
    expect(w.find('.media-row').exists()).toBe(true);
  });

  it('renders an error with a retry button that emits retry', async () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [], error: 'Boom' } });
    const alert = w.find('[role="alert"]');
    expect(alert.text()).toContain('Boom');
    await w.find('.media-row__retry').trigger('click');
    expect(w.emitted('retry')).toHaveLength(1);
  });

  it('forwards play/watchlist/info from a card', async () => {
    const item = media({ id: 'z' });
    const w = mount(MediaRow, { props: { title: 'X', items: [item] } });
    const card = w.findComponent(MediaCard);
    card.vm.$emit('play', item);
    card.vm.$emit('watchlist', item);
    card.vm.$emit('info', item);
    expect(w.emitted('play')?.[0]).toEqual([item]);
    expect(w.emitted('watchlist')?.[0]).toEqual([item]);
    expect(w.emitted('info')?.[0]).toEqual([item]);
  });

  // S15: the admin ⋯-menu "Edit metadata" / "Explore item data" actions must
  // bubble up so the host page (Browse rails) can open the match modal / inspector.
  it('forwards edit-metadata/explore-data from a card (S15)', () => {
    const item = media({ id: 'z' });
    const w = mount(MediaRow, { props: { title: 'X', items: [item] } });
    const card = w.findComponent(MediaCard);
    card.vm.$emit('edit-metadata', item);
    card.vm.$emit('explore-data', item);
    expect(w.emitted('edit-metadata')?.[0]).toEqual([item]);
    expect(w.emitted('explore-data')?.[0]).toEqual([item]);
  });

  it('passes a custom card link target via cardTo', () => {
    const item = media({ id: 'q' });
    const w = mount(MediaRow, {
      props: { title: 'X', items: [item], cardTo: (i: MediaItem) => `/x/${i.id}` },
    });
    expect(w.findComponent(MediaCard).props('to')).toBe('/x/q');
  });

  it('renders the #action slot in the head', () => {
    const w = mount(MediaRow, {
      props: { title: 'X', items: [media()] },
      slots: { action: '<a class="seeall">See all</a>' },
    });
    expect(w.find('.media-row__action .seeall').exists()).toBe(true);
  });

  // S21 — prev/next scroll arrows.
  describe('scroll arrows (S21)', () => {
    const many = [media({ id: 'a' }), media({ id: 'b' }), media({ id: 'c' })];

    it('does not show either arrow when the rail does not overflow', () => {
      // jsdom does not lay out, so scrollWidth == clientWidth == 0 → no overflow.
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(true);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(true);
    });

    it('shows the next arrow (prev hidden) at the start, and flips at the end', async () => {
      stubMatchMedia(() => false); // fine pointer, motion allowed
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      const rail = w.find('.media-row__rail');
      const setScrollLeft = simulateOverflow(rail.element as HTMLElement, {
        scrollWidth: 1000,
        clientWidth: 300,
      });

      // At the left extreme: prev useless (hidden), next available.
      await rail.trigger('scroll');
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(true);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(false);

      // Paged to the right extreme: next useless (hidden), prev available.
      setScrollLeft(700);
      await rail.trigger('scroll');
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(false);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(true);
    });

    it('calls scrollBy by ~90% of the visible width when an arrow is clicked', async () => {
      stubMatchMedia(() => false);
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      const rail = w.find('.media-row__rail');
      simulateOverflow(rail.element as HTMLElement, { scrollWidth: 1000, clientWidth: 300 });
      const scrollBy = vi.fn();
      (rail.element as unknown as { scrollBy: unknown }).scrollBy = scrollBy;

      await rail.trigger('scroll');
      await w.find('.media-row__arrow--next').trigger('click');
      expect(scrollBy).toHaveBeenCalledWith({ left: 300 * 0.9, behavior: 'smooth' });

      await w.find('.media-row__arrow--prev').trigger('click');
      expect(scrollBy).toHaveBeenLastCalledWith({ left: -300 * 0.9, behavior: 'smooth' });
    });

    it('hides the arrows on a coarse-pointer / no-hover device even when overflowing', async () => {
      stubMatchMedia((q) => q.includes('coarse') || q.includes('hover'));
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      const rail = w.find('.media-row__rail');
      simulateOverflow(rail.element as HTMLElement, { scrollWidth: 1000, clientWidth: 300 });
      await rail.trigger('scroll');
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(true);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(true);
    });

    it('hides the arrows under prefers-reduced-motion even when overflowing', async () => {
      stubMatchMedia((q) => q.includes('reduced-motion'));
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      const rail = w.find('.media-row__rail');
      simulateOverflow(rail.element as HTMLElement, { scrollWidth: 1000, clientWidth: 300 });
      await rail.trigger('scroll');
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(true);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(true);
    });

    it('exposes accessible labels on the arrow buttons', () => {
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      expect(w.find('.media-row__arrow--prev').attributes('aria-label')).toBe('Scroll left');
      expect(w.find('.media-row__arrow--next').attributes('aria-label')).toBe('Scroll right');
    });
  });
});

/**
 * S09 — the inter-rail gap, and the containment claim its AC asks to be
 * re-checked.
 *
 * jsdom does not apply an SFC's compiled `<style>`. Measured 2026-08-01, putting
 * `.media-row`'s `margin-block` back to the pre-S09 `var(--space-8)` left the
 * full 4,207-test suite GREEN.
 *
 * The AC's second half — "`content-visibility` / `contain-intrinsic-size` on
 * `.media-row` re-checked for first-paint jump" — rests on a specific structural
 * claim written into the SFC: the tightened spacing is a MARGIN, and margins sit
 * outside the `contain-intrinsic-size` box, so the reserved height is unchanged
 * and there is no first-paint jump. Convert that margin to padding (a plausible
 * later "tidy-up") and the claim silently becomes false, because padding is
 * inside the containment box. These assertions pin the claim, not just the number.
 */
describe('MediaRow — rail spacing + containment CSS contract (S09)', () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), './MediaRow.vue'), 'utf8');
  const rowBlock = /(?<![\w.-])\.media-row\s*\{([^}]*)\}/.exec(src);

  it('keeps the tightened inter-rail gap', () => {
    expect(rowBlock).not.toBeNull();
    expect(rowBlock![1]).toMatch(/margin-block:\s*var\(--space-6\);/);
  });

  it('keeps the spacing OUTSIDE the containment box (margin, never padding)', () => {
    // Padding is inside `contain-intrinsic-size`; margin is not. Swapping them
    // would change the reserved height and reintroduce the first-paint jump the
    // AC asks to be re-checked.
    expect(rowBlock![1]).not.toMatch(/padding(-block|-top|-bottom)?:/);
  });

  it('still declares the content-visibility / contain-intrinsic-size pair', () => {
    // Both, together: `content-visibility: auto` without a reserved box is the
    // CLS bug, and a reserved box without `content-visibility` does nothing.
    expect(rowBlock![1]).toMatch(/content-visibility:\s*auto;/);
    expect(rowBlock![1]).toMatch(
      /contain-intrinsic-size:\s*auto\s+var\(--media-row-intrinsic-h,\s*380px\);/,
    );
  });
});

/**
 * S221 — S21's ONE structural acceptance criterion, which until now was guarded
 * by nothing.
 *
 * Measured on master @ `704de590`, with THIS file reverted to master's version so
 * the guard below could not participate:
 *
 *   control (unmutated)                 Test Files 249 passed / Tests 4950 passed | 10 skipped
 *   both arrows moved inside the <ul>   Test Files 249 passed / Tests 4950 passed | 10 skipped
 *
 * — byte-identical, plus `eslint` exit 0 and `vue-tsc --noEmit` exit 0, for
 * precisely the structure the AC forbids. Every pre-existing arrow assertion
 * goes through `wrapper.find('.media-row__arrow--prev')`, and `find()` matches at
 * ANY depth, so the relocation is invisible to all of them.
 *
 * The structure is load-bearing, not cosmetic: the arrows are `position:
 * absolute` and resolve against `.media-row__viewport`. Inside the rail they
 * would resolve against a horizontally SCROLLING box and slide away with the
 * content — the exact bug S21 exists to avoid.
 */
describe('MediaRow — arrows are siblings of the rail, never descendants (S221)', () => {
  const many = [media({ id: 'a' }), media({ id: 'b' }), media({ id: 'c' })];
  const mountRow = () => mount(MediaRow, { props: { title: 'X', items: many } });

  it.each([['.media-row__arrow--prev'], ['.media-row__arrow--next']])(
    '%s is not inside .media-row__rail, and IS a sibling of it',
    (selector) => {
      const w = mountRow();
      const rail = w.find('.media-row__rail').element;
      const arrow = w.find(selector).element;

      // The AC's literal prohibition. `rail.querySelector` is the depth-aware
      // form of the same question, so a nested-two-levels-deep relocation is
      // caught too, not only a direct child.
      expect(rail.contains(arrow)).toBe(false);
      expect(rail.querySelector(selector)).toBeNull();

      // The AC's literal requirement: SIBLING — same parent as the rail.
      expect(arrow.parentElement).not.toBeNull();
      expect(arrow.parentElement).toBe(rail.parentElement);
    },
  );

  it('the rail holds nothing but item cells', () => {
    const w = mountRow();
    const rail = w.find('.media-row__rail').element;
    expect([...rail.children].map((c) => c.className)).toEqual(
      Array(many.length).fill('media-row__cell'),
    );
  });

  it('the shared parent is the dedicated positioned wrapper', () => {
    // Named explicitly because the CSS contract below is keyed on this class: a
    // rename that skipped the stylesheet would leave the arrows resolving against
    // the page instead of the rail.
    const w = mountRow();
    expect(w.find('.media-row__rail').element.parentElement?.className).toBe('media-row__viewport');
  });
});

/**
 * S221 (CSS half) — the arrows' wrapper must stay a positioned, UN-contained box,
 * asserted against the BUILT stylesheet.
 *
 * A source-only regex cannot see the build. `dist/style.css` is what every
 * consumer installs (`files: ["dist"]`, no `prepare` script), lightningcss is
 * free to move/merge/drop declarations, and `dist:check` already fails any PR
 * whose `src/` changed without a rebuild — so this reads the bytes that ship.
 */
describe('MediaRow — arrow wrapper CSS contract, built stylesheet (S221)', () => {
  const css = readBuiltCss('style.css');
  const viewport = scopedRuleBodies(css, '.media-row__viewport');

  it('declares .media-row__viewport at all', () => {
    // Guards the assertions below against going vacuously true: "no rule at all"
    // would otherwise satisfy every "declares no containment" check below.
    expect(viewport.length).toBeGreaterThan(0);
  });

  it('makes it a containing block for the absolutely positioned arrows', () => {
    expect(viewport.join(';')).toMatch(/position:\s*relative/);
  });

  it('gives it NO containment of its own', () => {
    // The whole point of the extra wrapper: `.media-row` above it paint-contains
    // (measured — see the S222 note in MediaRow.vue), so if the wrapper contained
    // as well, the arrows would be clipped to the rail's own box.
    for (const body of viewport) {
      expect(body).not.toMatch(/content-visibility:/);
      expect(body).not.toMatch(/(^|[;{])\s*contain:/);
    }
  });
});

/**
 * S222 — WHICH element receives `content-visibility: auto`, asserted against the
 * built stylesheet.
 *
 * S09's existing assertion (above) reads the SFC source. That is enough to catch
 * the declaration being deleted from the `.media-row` block, but it is blind to
 * the two failure modes that matter most here, both of which look identical from
 * source: lightningcss dropping the declaration on the way to `dist/`, and the
 * declaration being present but landing on the WRONG selector.
 *
 * Wrong-selector is not hypothetical. S21's acceptance criterion was written
 * believing the containment sat on `.media-row__rail`; it has always sat on
 * `.media-row`, the outer `<section>` (`git show 469a3dce^` predates S21). That
 * single mistaken premise is the whole of S222.
 *
 * Placement is behaviourally load-bearing, measured in real headless Chromium
 * against this same `dist/style.css` (bundled playwright build; `test:visual`
 * never run) — a probe positioned 30px outside `.media-row`'s left edge is NOT
 * painted with `content-visibility: auto` and IS painted without it. So the
 * property decides whether the arrows' halo survives, and moving it to the rail
 * would silently move that clip edge.
 */
describe('MediaRow — content-visibility placement, built stylesheet (S222)', () => {
  const css = readBuiltCss('style.css');
  const bodies = (sel: string) => scopedRuleBodies(css, sel).join(';');

  it('lands on .media-row, the outer section', () => {
    expect(bodies('.media-row')).toMatch(/content-visibility:\s*auto/);
  });

  it('is paired with the reserved intrinsic box on the same element', () => {
    // `content-visibility: auto` without a reserved size is the CLS bug R6.2a
    // was fixed to avoid, and a reserved size alone does nothing.
    expect(bodies('.media-row')).toMatch(
      /contain-intrinsic-size:\s*auto\s+var\(--media-row-intrinsic-h,\s*380px\)/,
    );
  });

  it('lands on NEITHER the rail NOR the arrow wrapper', () => {
    // The half of S21's AC that was never true. If a later change "fixes" the AC
    // by moving the property down onto the rail, the arrows stop being outside
    // the containment (they never were) AND the reserved-box pairing above is
    // orphaned — so pin both boxes explicitly, not just the row.
    expect(bodies('.media-row__rail')).not.toMatch(/content-visibility:/);
    expect(bodies('.media-row__viewport')).not.toMatch(/content-visibility:/);
  });

  it('appears exactly once in the whole shipped stylesheet', () => {
    // A copy landing on some other selector would satisfy every assertion above
    // while quietly introducing a second clip box.
    expect(css.match(/content-visibility:/g) ?? []).toHaveLength(1);
  });
});

/**
 * S419 — the hover-lift headroom contract, asserted against the BUILT stylesheet.
 *
 * THE DEFECT (S222's measured finding; the "tracked as its own step" comment was
 * false — S419 is that step, finally allocated): `.media-row__rail` declares
 * `overflow-x: auto`, which per CSS Overflow 3 forces `overflow-y` to COMPUTE to
 * `auto`, making the rail a scroll container on both axes. A scroll container
 * clips to its padding box (the scrollport), and the rail had zero `padding-top`,
 * so the top of `.media-card:hover`'s lift was clipped away on every home rail.
 *
 * NUMBERS re-verified at tip `58b1e5e4` (MediaRow.vue/MediaCard.vue/dist-style.css
 * byte-identical since the S222 audit pin `24b60e49`):
 *  - Lift: `translateY(-8px) scale(1.025)` (pinned below — this test is the
 *    coupling that keeps the headroom honest if the lift ever changes).
 *  - S222's recorded headless-Chromium probe (no chromium on this venue; the
 *    measurement is INHERITED, the rule bytes below are re-read from dist):
 *    11.00px of overhang above the cell's top in every variant; `padding-top`
 *    on the rail was the only lever that restored paint.
 *  - Ceiling re-derived arithmetically from the shipped rules alone: 8px
 *    translate + half of 2.5% scale growth on the card box; at the rail's own
 *    `grid-auto-columns` max (180px → ≈270px poster) that is ≈11.9px. A 16px
 *    clearance contains both numbers; 16px is ALSO the largest value whose
 *    negative-margin compensation cannot pull the rail's box up onto the head
 *    (head `margin-bottom: var(--space-4)` = 16px), which would steal pointer
 *    events from the head's action link.
 *
 * THE MECHANISM pinned here (one rule, three declarations):
 *    --media-row-lift-clearance: var(--space-4);
 *    padding-top: var(--media-row-lift-clearance);          <- room INSIDE the scrollport
 *    margin: calc(var(--media-row-lift-clearance) * -1) 0 0; <- same room given back OUTSIDE
 * The cards stay pixel-exactly where they were (rhythm preserved — the reason
 * S222 left the defect open); only the clip edge moves up into the dead space
 * of the head's margin. Both levers key on the SAME custom property so they
 * cannot drift apart.
 *
 * jsdom geometry is VACUOUS here (the S09 block above measured it: reverting
 * real spacing rules left the whole suite green), so every assertion reads the
 * SHIPPED `dist/style.css` rule bytes, not pixels and not SFC source text —
 * the S232/S221 built-CSS method.
 */
describe('MediaRow — hover-lift headroom in the rail scroll box, built stylesheet (S419)', () => {
  const css = readBuiltCss('style.css');
  const railBodies = scopedRuleBodies(css, '.media-row__rail');
  // The BASE rail rule, identified by a declaration the lever-mutations never
  // touch — so removing one lever cannot make the other assertions vacuous.
  const base = railBodies.find((b) => /grid-auto-flow:\s*column/.test(b)) ?? '';

  it('declares the rail base rule in the shipped stylesheet at all', () => {
    // Vacuity guard: every assertion below reads `base`, and an empty string
    // would otherwise pass as "no wrong value present".
    expect(base).not.toBe('');
  });

  it('keeps the rail a horizontal scroll container — the scrollport is the clipper', () => {
    // The fix is premised on the rail being the clipper (CSS Overflow 3:
    // overflow-y computes to auto here). If the rail ever stops scrolling,
    // the headroom+compensation pair is dead weight and this comment is a lie.
    expect(base).toMatch(/overflow-x:\s*auto/);
  });

  it('gives the scrollport top headroom via padding-top on the rail', () => {
    // S222: paint returns only when the rail has room INSIDE its own scroll box.
    expect(base).toMatch(/padding-top:\s*var\(--media-row-lift-clearance\)/);
  });

  it('sizes the clearance from the --media-row-lift-clearance token, bound to var(--space-4)', () => {
    expect(base).toMatch(/--media-row-lift-clearance:\s*var\(--space-4\)/);
  });

  it('gives the same room back outside the rail, in the same rule (rhythm-neutral)', () => {
    // Negative margin-top on the rail collapses (head 16 + rail -16 → 0) or
    // adds (16 - 16 → 0) with the head's margin-bottom to the SAME zero net —
    // the cards land pixel-exactly where they were before the fix either way.
    expect(base).toMatch(
      /margin:\s*calc\(\s*(?:var\(--media-row-lift-clearance\)\s*\*\s*-1|-1\s*\*\s*var\(--media-row-lift-clearance\))\s*\)/,
    );
    // And margin's other slots stay zero: no new side/bottom rhythm.
    expect(base).toMatch(
      /margin:\s*calc\([^)]*\)\s+0\s+0/,
    );
  });

  it('resolves the clearance to at least the ≈11.9px lift ceiling', () => {
    // Parse what the token ACTUALLY resolves to in the shipped sheet rather
    // than trusting its name: extract the referenced token, find its declared
    // value, convert rem→px (16px base, asserted below — the sheet sets no
    // root font-size), and floor-check against the re-derived ceiling.
    const ref = /--media-row-lift-clearance:\s*var\((--[\w-]+)\)/.exec(base);
    expect(ref).not.toBeNull();
    const declared = new RegExp(`${ref![1]}\\s*:\\s*([\\d.]+)rem`).exec(css);
    expect(declared).not.toBeNull();
    expect(parseFloat(declared![1]) * 16).toBeGreaterThanOrEqual(12);
    // The rem→px conversion is only sound while nothing rebases the root font.
    // Component-level `font-size:` declarations are irrelevant here; only the
    // rem-defining selectors (html / :root / :host) could move the base.
    for (const rebase of css.match(/(?:html|:root|:host)[^{}]*\{[^}]*\}/g) ?? []) {
      expect(rebase).not.toMatch(/(^|[;{])\s*font-size\s*:/);
    }
  });

  it('leaves the bottom gutter exactly as it was (two-sided control)', () => {
    // The clip was only ever at the TOP edge; padding-bottom carries the
    // existing bottom shadow/scrollbar room and must not be "tidied" along
    // with the fix — and must not become the headroom lever (bottom overflow
    // behaves differently: it is scrollable, not unreachable-clipped).
    expect(base).toMatch(/padding-bottom:\s*var\(--space-3\)/);
    expect(base).not.toMatch(/padding-bottom:\s*var\(--media-row-lift-clearance\)/);
  });

  it('leaves the head rhythm partner untouched (two-sided control)', () => {
    // The compensation arithmetic above depends on this staying var(--space-4).
    const head = scopedRuleBodies(css, '.media-row__head').join(';');
    expect(head).toMatch(/margin-bottom:\s*var\(--space-4\)/);
  });

  it('pins the lift the headroom was sized for, unchanged', () => {
    // Coupling guard: if the transform grows, the 12px floor silently fails —
    // changing this string MUST be a conscious act paired with the clearance.
    const lift = /([^{}]+)\{transform:translateY\(-8px\)\s?scale\(1\.025\)\}/.exec(css);
    expect(lift).not.toBeNull();
    const selector = lift![1];
    expect(selector).toContain('media-card');
    expect(selector).toContain(':hover');
    expect(selector).toContain(':focus-within');
    expect(css.match(/translateY\(-8px\)scale\(1\.025\)/g) ?? []).toHaveLength(1);
  });
});
