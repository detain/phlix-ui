/**
 * RatingBadge — behavioural cover for a component measured at `LF:11 LH:0`,
 * `FNF:5 FNH:0`, `BRF:8 BRH:0` on 2026-08-07 (S182 re-enumeration).
 *
 * REACHABILITY — RESOLVED BY S263 (2026-08-07). This block previously read "NOT
 * re-exported from `src/index.ts` … dead as shipped". That is no longer true:
 * S263 ran the reachability question to ground across all four @phlix/ui consumer
 * repos and exported the component. It is now
 * `export { default as RatingBadge } from './components/RatingBadge.vue'` in
 * `src/index.ts`, pinned by "S263 — the newly exported components" in
 * `src/index.test.ts` — which MOUNTS the barrel binding, so the export cannot be
 * dropped without a red.
 *
 * ⚠ jsdom never applies an SFC's compiled `<style>`, so every assertion below is
 * over DOM structure, class lists and ARIA — never computed geometry or colour.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RatingBadge from './RatingBadge.vue';

function filledCount(w: ReturnType<typeof mount>): number {
  return w.findAll('.rating-badge__star.is-filled').length;
}

describe('RatingBadge — star fill', () => {
  it('renders exactly maxStars icons when rated, defaulting to 5', async () => {
    const five = mount(RatingBadge, { props: { rating: 7 } });
    expect(five.findAll('.rating-badge__star')).toHaveLength(5);

    const ten = mount(RatingBadge, { props: { rating: 7, maxStars: 10 } });
    expect(ten.findAll('.rating-badge__star')).toHaveLength(10);
  });

  it('rescales 0-10 onto maxStars by ROUNDING, not truncating', async () => {
    // 7/10 × 5 = 3.5 → 4 under Math.round, 3 under Math.floor. This single case
    // separates the two implementations.
    expect(filledCount(mount(RatingBadge, { props: { rating: 7 } }))).toBe(4);
    // 6/10 × 5 = 3.0 exactly — a control that both implementations agree on, so
    // the case above is doing real work.
    expect(filledCount(mount(RatingBadge, { props: { rating: 6 } }))).toBe(3);
  });

  it('fills the stars as a PREFIX (n <= filledStars), not an arbitrary subset', async () => {
    const w = mount(RatingBadge, { props: { rating: 7 } });
    const flags = w.findAll('.rating-badge__star').map((s) => s.classes().includes('is-filled'));
    // `n < filledStars` would give [t,t,t,f,f]; `n <= filledStars` gives 4 leading.
    expect(flags).toEqual([true, true, true, true, false]);
  });

  it('fills none at 0 and all at 10', async () => {
    expect(filledCount(mount(RatingBadge, { props: { rating: 0 } }))).toBe(0);
    expect(filledCount(mount(RatingBadge, { props: { rating: 10 } }))).toBe(5);
  });

  it('treats a rating of 0 as RATED — stars, not the "No rating" text', async () => {
    // `props.rating === null` must not decay to `!props.rating`: the S177 trap
    // where 0 is not undefined. A truthiness guard renders the unrated branch here.
    const w = mount(RatingBadge, { props: { rating: 0 } });
    expect(w.findAll('.rating-badge__star')).toHaveLength(5);
    expect(w.find('.rating-badge__no-rating').exists()).toBe(false);
    expect(w.classes()).not.toContain('is-unrated');
  });

  it('honours maxStars when rescaling, not just when counting icons', async () => {
    // 7/10 × 10 = 7. A hard-coded `× 5` inside filledStars would give 4 here while
    // still rendering 10 icons — the count-only assertion above cannot see that.
    const w = mount(RatingBadge, { props: { rating: 7, maxStars: 10 } });
    expect(filledCount(w)).toBe(7);
  });
});

describe('RatingBadge — unrated state', () => {
  it('renders the "No rating" text, no stars, and the is-unrated class', async () => {
    const w = mount(RatingBadge, { props: { rating: null } });
    expect(w.find('.rating-badge__no-rating').text()).toBe('No rating');
    expect(w.findAll('.rating-badge__star')).toHaveLength(0);
    expect(w.classes()).toContain('is-unrated');
  });

  it('drops role="img" when unrated and carries it when rated', async () => {
    // `hasRating ? 'img' : undefined` — a screen reader must not announce an
    // image that is only the words "No rating".
    expect(mount(RatingBadge, { props: { rating: null } }).attributes('role')).toBeUndefined();
    expect(mount(RatingBadge, { props: { rating: 5 } }).attributes('role')).toBe('img');
  });
});

describe('RatingBadge — aria-label', () => {
  it('states the score out of TEN, to one decimal, regardless of maxStars', async () => {
    // Exact string with toBe: "7.0 out of 10" vs "7 out of 10" vs "4 out of 5" are
    // all plausible mutations and a substring check would accept several of them.
    expect(mount(RatingBadge, { props: { rating: 7 } }).attributes('aria-label')).toBe(
      '7.0 out of 10',
    );
    expect(
      mount(RatingBadge, { props: { rating: 7.25, maxStars: 10 } }).attributes('aria-label'),
    ).toBe('7.3 out of 10');
  });

  it('says "No rating" when unrated', async () => {
    expect(mount(RatingBadge, { props: { rating: null } }).attributes('aria-label')).toBe(
      'No rating',
    );
  });
});

describe('RatingBadge — size variant', () => {
  it('defaults to md and maps each size to its own modifier class', async () => {
    expect(mount(RatingBadge, { props: { rating: 5 } }).classes()).toContain('rating-badge--md');
    for (const size of ['sm', 'md', 'lg'] as const) {
      const w = mount(RatingBadge, { props: { rating: 5, size } });
      expect(w.classes()).toContain(`rating-badge--${size}`);
      // Exactly one size modifier, so a template that appends rather than
      // replaces is caught.
      expect(w.classes().filter((c) => c.startsWith('rating-badge--'))).toHaveLength(1);
    }
  });
});

describe('RatingBadge — reactivity', () => {
  it('recomputes the fill and the label when the rating prop changes', async () => {
    const w = mount(RatingBadge, { props: { rating: 2 } });
    expect(filledCount(w)).toBe(1);

    await w.setProps({ rating: 9 });
    expect(filledCount(w)).toBe(5);
    expect(w.attributes('aria-label')).toBe('9.0 out of 10');

    await w.setProps({ rating: null });
    expect(w.find('.rating-badge__no-rating').exists()).toBe(true);
  });
});
