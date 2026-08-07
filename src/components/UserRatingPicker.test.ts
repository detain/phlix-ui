/**
 * UserRatingPicker — behavioural cover for a component measured at `LF:37 LH:0`,
 * `FNF:9 FNH:0`, `BRF:26 BRH:0` on 2026-08-07 (S182 re-enumeration).
 *
 * REACHABILITY — RESOLVED BY S263 (2026-08-07). This block previously read "NOT
 * re-exported from `src/index.ts` … dead as shipped". S263 settled the question
 * across all four @phlix/ui consumer repos and exported it; the barrel export is
 * pinned by "S263 — the newly exported components" in `src/index.test.ts`, which
 * MOUNTS the binding taken from the barrel.
 *
 * ⚠ TWO guards protect the same action and they are NOT interchangeable:
 *   - the template's `:disabled="readonly || isSubmitting"`, and
 *   - `onStarClick`'s `if (props.readonly || !isAuthenticated || isSubmitting) return;`
 * VTU's `trigger()` is a silent no-op on a disabled element, so a
 * `trigger('click')`-and-observe-nothing test passes with the JS guard DELETED —
 * that is exactly how 8 guards were once removed from this repo with 4 223 tests
 * green. The readonly tests below therefore do both: assert the `disabled`
 * ATTRIBUTE (with an enabled control beside it), and reach the JS guard with a raw
 * `dispatchEvent`, which jsdom delivers to the listener regardless of `disabled`.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import UserRatingPicker from './UserRatingPicker.vue';
import { useToastStore } from '../stores/useToastStore';

/** POST bodies captured off the global fetch mock, in order. */
interface Captured {
  urls: string[];
  bodies: unknown[];
}

function captureFetch(opts: { fail?: boolean } = {}): Captured {
  const cap: Captured = { urls: [], bodies: [] };
  vi.mocked(globalThis.fetch).mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      cap.urls.push(String(input));
      cap.bodies.push(typeof init?.body === 'string' ? JSON.parse(init.body) : init?.body);
      if (opts.fail) throw new TypeError('network down');
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    },
  );
  return cap;
}

function mountPicker(
  props: Partial<{ modelValue: number | null; mediaId: string; size: number; readonly: boolean }> = {},
  loggedIn = true,
): VueWrapper {
  if (loggedIn) localStorage.setItem('access_token', 'TOKEN');
  return mount(UserRatingPicker, {
    props: { modelValue: null, mediaId: 'itm-1', ...props },
    attachTo: document.body,
  });
}

function stars(w: VueWrapper) {
  return w.findAll('.user-rating-picker__star');
}

function filledFlags(w: VueWrapper): boolean[] {
  return stars(w).map((s) => s.classes().includes('is-filled'));
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('UserRatingPicker — signed-out state', () => {
  it('renders the sign-in prompt and NO stars when logged out', async () => {
    const w = mountPicker({}, false);
    expect(w.find('.user-rating-picker__signin').text()).toBe('Sign in to rate');
    expect(w.find('.user-rating-picker__lock').exists()).toBe(true);
    expect(stars(w)).toHaveLength(0);
  });

  it('renders stars and NO prompt when logged in — the control for the above', async () => {
    const w = mountPicker();
    expect(w.find('.user-rating-picker__signin').exists()).toBe(false);
    expect(stars(w)).toHaveLength(5);
  });
});

describe('UserRatingPicker — display fill', () => {
  it('renders `size` stars, defaulting to 5', async () => {
    expect(stars(mountPicker())).toHaveLength(5);
    expect(stars(mountPicker({ size: 10 }))).toHaveLength(10);
  });

  it('maps modelValue from the 0-10 scale onto the star count by rounding', async () => {
    // 7/10 × 5 = 3.5 → 4 (round) vs 3 (floor).
    expect(filledFlags(mountPicker({ modelValue: 7 }))).toEqual([true, true, true, true, false]);
    // Control both implementations agree on.
    expect(filledFlags(mountPicker({ modelValue: 4 }))).toEqual([true, true, false, false, false]);
  });

  it('fills nothing when unrated', async () => {
    expect(filledFlags(mountPicker({ modelValue: null }))).toEqual([false, false, false, false, false]);
  });

  it('fills nothing at modelValue 0, and still previews a hover from there', async () => {
    // ⚠ HONEST NOTE, measured 2026-08-07 (S182 mutation run U4). `filledStars`
    // opens with `if (displayRating.value === null) return 0;` and that guard is an
    // EQUIVALENT MUTANT: weakening it to `!displayRating.value`, or deleting it
    // outright, leaves this whole file green — because `Math.round((null / 10) * size)`
    // is already 0. No test can distinguish them, and claiming otherwise would be a
    // tautological assertion dressed up as a guard check. What IS pinned is the
    // RETURN VALUE: changing `return 0` to `return 99` reds "fills nothing when
    // unrated". The hover assertion below is the real subject here.
    const w = mountPicker({ modelValue: 0 });
    expect(filledFlags(w)).toEqual([false, false, false, false, false]);
    await stars(w)[2].trigger('mouseenter');
    expect(filledFlags(w)).toEqual([true, true, true, false, false]);
  });
});

describe('UserRatingPicker — hover preview', () => {
  it('previews the hovered star count and marks them is-hovered', async () => {
    const w = mountPicker({ modelValue: 2 });
    expect(filledFlags(w)).toEqual([true, false, false, false, false]);

    await stars(w)[3].trigger('mouseenter');
    expect(filledFlags(w)).toEqual([true, true, true, true, false]);
    expect(stars(w).map((s) => s.classes().includes('is-hovered'))).toEqual([
      true,
      true,
      true,
      true,
      false,
    ]);
  });

  it('REVERTS to the saved rating on mouseleave', async () => {
    const w = mountPicker({ modelValue: 2 });
    await stars(w)[4].trigger('mouseenter');
    expect(filledFlags(w)).toEqual([true, true, true, true, true]);

    await w.find('.user-rating-picker').trigger('mouseleave');
    expect(filledFlags(w)).toEqual([true, false, false, false, false]);
    expect(stars(w).some((s) => s.classes().includes('is-hovered'))).toBe(false);
  });

  it('scales the hover preview by `size`, not by a hard-coded 5', async () => {
    // Hovering star 3 of 10 → 3/10 × 10 = 3 on the 0-10 scale → round(3/10 × 10) = 3
    // filled. A hard-coded `/ 5` would give 6 → 6 filled.
    const w = mountPicker({ modelValue: null, size: 10 });
    await stars(w)[2].trigger('mouseenter');
    expect(filledFlags(w).filter(Boolean)).toHaveLength(3);
  });

  it('does NOT preview when readonly, even though mouseenter still reaches the handler', async () => {
    // `readonly` disables the button, and VTU trigger() no-ops on disabled — so the
    // event is dispatched RAW to reach the guard for real.
    const w = mountPicker({ modelValue: 2, readonly: true });
    stars(w)[4].element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));
    await flushPromises();
    expect(filledFlags(w)).toEqual([true, false, false, false, false]);
  });
});

describe('UserRatingPicker — submitting a rating', () => {
  it('POSTs the 0-10 score to the media ratings endpoint and emits the new value', async () => {
    const cap = captureFetch();
    const w = mountPicker({ modelValue: null, mediaId: 'itm-9' });

    await stars(w)[3].trigger('click');
    await flushPromises();

    expect(cap.urls).toHaveLength(1);
    expect(cap.urls[0].endsWith('/api/v1/media/itm-9/ratings')).toBe(true);
    // Exact body: source/type/score are three separate fields the server reads.
    expect(cap.bodies[0]).toEqual({ source: 'user', type: 'user', score: 8 });
    expect(w.emitted('update:modelValue')).toEqual([[8]]);
  });

  it('percent-encodes the media id', async () => {
    const cap = captureFetch();
    const w = mountPicker({ mediaId: 'a/b c' });
    await stars(w)[0].trigger('click');
    await flushPromises();
    expect(cap.urls[0].endsWith('/api/v1/media/a%2Fb%20c/ratings')).toBe(true);
  });

  it('rounds the score to ONE decimal on a scale that does not divide evenly', async () => {
    // 1/3 × 10 = 3.3333… → 3.3, not 3.333333333333333.
    const cap = captureFetch();
    const w = mountPicker({ size: 3 });
    await stars(w)[0].trigger('click');
    await flushPromises();
    expect((cap.bodies[0] as { score: number }).score).toBe(3.3);
  });

  it('toasts success and clears the hover state after a save', async () => {
    captureFetch();
    const w = mountPicker({ modelValue: 2 });
    await stars(w)[4].trigger('mouseenter');
    await stars(w)[4].trigger('click');
    await flushPromises();

    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['success', 'Rating saved'],
    ]);
    // isHovering/hoverRating reset in `finally`, so the preview classes are gone
    // even though the parent has not yet echoed the new modelValue back down.
    expect(stars(w).some((s) => s.classes().includes('is-hovered'))).toBe(false);
  });

  it('toasts an ERROR and emits NOTHING when the POST rejects', async () => {
    captureFetch({ fail: true });
    const w = mountPicker();
    await stars(w)[2].trigger('click');
    await flushPromises();

    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', 'Failed to save rating'],
    ]);
    expect(w.emitted('update:modelValue')).toBeUndefined();
  });

  it('re-enables the stars after a FAILED save, because `isSubmitting` clears in finally', async () => {
    captureFetch({ fail: true });
    const w = mountPicker();
    await stars(w)[2].trigger('click');
    await flushPromises();

    expect(stars(w)[2].attributes('disabled')).toBeUndefined();
    // …and a second attempt actually fires, which a leaked isSubmitting would block.
    const cap = captureFetch();
    await stars(w)[2].trigger('click');
    await flushPromises();
    expect(cap.urls).toHaveLength(1);
  });
});

describe('UserRatingPicker — the in-flight guard', () => {
  it('DISABLES every star and shows a spinner while a save is in flight', async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => {
      release = r;
    });
    vi.mocked(globalThis.fetch).mockImplementation(async () => {
      await gate;
      return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
    });

    const w = mountPicker();
    // Control: nothing is disabled and no spinner before the click.
    expect(stars(w).map((s) => s.attributes('disabled'))).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(w.find('.user-rating-picker__spinner').exists()).toBe(false);

    await stars(w)[1].trigger('click');
    await w.vm.$nextTick();

    expect(stars(w).map((s) => s.attributes('disabled'))).toEqual(['', '', '', '', '']);
    expect(w.find('.user-rating-picker__spinner').exists()).toBe(true);

    release();
    await flushPromises();
    expect(w.find('.user-rating-picker__spinner').exists()).toBe(false);
  });

  it('the JS re-entrancy guard rejects a second click even when dispatched RAW', async () => {
    // The button is disabled mid-flight, so VTU trigger() would no-op and this
    // test would pass with `|| isSubmitting.value` deleted from onStarClick.
    // dispatchEvent reaches the listener anyway, which is what makes it a real test.
    let calls = 0;
    let release!: () => void;
    const gate = new Promise<void>((r) => {
      release = r;
    });
    vi.mocked(globalThis.fetch).mockImplementation(async () => {
      calls += 1;
      await gate;
      return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
    });

    const w = mountPicker();
    await stars(w)[1].trigger('click');
    await w.vm.$nextTick();
    expect(calls).toBe(1);

    stars(w)[4].element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    expect(calls).toBe(1);

    release();
    await flushPromises();
  });
});

describe('UserRatingPicker — the readonly guard', () => {
  it('marks every star DISABLED when readonly', async () => {
    const w = mountPicker({ readonly: true });
    expect(stars(w).map((s) => s.attributes('disabled'))).toEqual(['', '', '', '', '']);
    expect(w.classes()).toContain('is-readonly');
  });

  it('leaves every star ENABLED when not readonly — the control for the above', async () => {
    const w = mountPicker({ readonly: false });
    expect(stars(w).map((s) => s.attributes('disabled'))).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(w.classes()).not.toContain('is-readonly');
  });

  it('a RAW click on a readonly star POSTs nothing and emits nothing', async () => {
    // This is the assertion the `disabled` attribute cannot make: it proves the
    // handler itself refuses, not merely that the browser would not dispatch.
    const cap = captureFetch();
    const w = mountPicker({ readonly: true });
    stars(w)[2].element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();

    expect(cap.urls).toEqual([]);
    expect(w.emitted('update:modelValue')).toBeUndefined();
    expect(useToastStore().toasts).toHaveLength(0);
  });

  it('the SAME raw click DOES post when readonly is false — proving the test can fail', async () => {
    const cap = captureFetch();
    const w = mountPicker({ readonly: false });
    stars(w)[2].element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();

    expect(cap.urls).toHaveLength(1);
    expect(w.emitted('update:modelValue')).toEqual([[6]]);
  });
});
