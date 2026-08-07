/**
 * `src/index.ts` — the library entry's three lazy component exports, plus the
 * S263 pin on the three components exported here for the first time.
 *
 * The barrel is almost entirely `export { … } from` re-exports, which v8 does not
 * instrument. Its only executable lines are the three `defineAsyncComponent`
 * LOADER ARROWS at lines 117-121, and they were measured at `LF:4 LH:0` on
 * 2026-08-07 (S182 re-enumeration) — nothing in the suite had ever resolved one.
 *
 * 🔴 That gap is not cosmetic. UI-3.1/U-H2 deliberately converted `MediaDetail`,
 * `MetadataMatchModal` and `FilterBar` from static default re-exports into async
 * factories to keep ~56 KB out of every consumer's eager boot bundle. A typo in a
 * path, or a chunk the build fails to emit, produces a module that imports and
 * type-checks cleanly and then throws at RUNTIME the first time a consumer renders
 * the component. Executing each loader is the only thing that catches it.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import {
  MediaDetail,
  MetadataMatchModal,
  FilterBar,
  RatingBadge,
  UserRatingPicker,
  ProfileImageSettings,
} from './index';
import { useAuthStore } from './stores/useAuthStore';

/** The loader arrow `defineAsyncComponent` stashes on the wrapper it returns. */
function loaderOf(c: unknown): () => Promise<unknown> {
  const loader = (c as { __asyncLoader?: () => Promise<unknown> }).__asyncLoader;
  if (typeof loader !== 'function') {
    throw new Error('not an async component wrapper — the export is no longer lazy');
  }
  return loader;
}

const LAZY: ReadonlyArray<[string, unknown, string]> = [
  ['MediaDetail', MediaDetail, 'MediaDetail'],
  ['MetadataMatchModal', MetadataMatchModal, 'MetadataMatchModal'],
  ['FilterBar', FilterBar, 'FilterBar'],
];

describe('src/index.ts — the lazy component exports', () => {
  it.each(LAZY)('%s is an ASYNC wrapper, not a static component', (_name, comp) => {
    // The property that keeps the 56 KB out of the eager bundle. A revert to
    // `export { default as X } from './components/X.vue'` reds this — and that
    // revert is invisible to every other gate, because the named export survives.
    expect(typeof comp).toBe('object');
    expect(loaderOf(comp)).toBeTypeOf('function');
  });

  it.each(LAZY)('%s\'s loader RESOLVES to the real SFC', async (_name, comp, expected) => {
    // Executes the arrow itself — the four uncovered lines. A wrong path rejects
    // here rather than at a consumer's first render.
    const mod = (await loaderOf(comp)()) as { default?: { __name?: string } } | { __name?: string };
    const sfc = (mod as { default?: { __name?: string } }).default ?? (mod as { __name?: string });
    expect(sfc).toBeTruthy();
    // Exact name compare, not a substring: `MetadataMatchModal` contains neither
    // of the others, but `MediaDetail` IS a prefix of nothing here only by luck.
    expect(sfc.__name).toBe(expected);
  });

  it('the three loaders resolve to three DISTINCT components', async () => {
    // Anti-vacuity for the loop above: a mutation that points all three factories
    // at the same module would satisfy "each resolves to something truthy".
    const mods = await Promise.all(LAZY.map(([, c]) => loaderOf(c)()));
    const names = mods.map(
      (m) => ((m as { default?: { __name?: string } }).default ?? (m as { __name?: string })).__name,
    );
    expect(new Set(names).size).toBe(3);
    expect(names).toEqual(['MediaDetail', 'MetadataMatchModal', 'FilterBar']);
  });
});

/* ---------------------------------------------------------------------------- *
 * S263 — the three components exported from this barrel for the first time.
 *
 * WHY A MOUNT AND NOT A `toBeDefined()`.
 * `RatingBadge`, `UserRatingPicker` and `ProfileImageSettings` sat in `src/` with
 * no barrel export and no importer, and were therefore tree-shaken out of every
 * published artefact — `rating-badge` / `user-rating-picker` / `profile-image-settings`
 * each occurred ZERO times in `dist/phlix-ui.js`, `dist/ui.css` and `dist/style.css`,
 * while exported siblings (`phlix-icon`, `thumb-rating`) occurred once. So the
 * failure mode being pinned is "the export line goes away again and the component
 * silently leaves the bundle", which `expect(X).toBeDefined()` would catch but a
 * repoint to the wrong SFC would not.
 *
 * ⚠ The trap this file must not reproduce: `src/__tests__/s241-image-src-coverage.test.ts`
 * `readFileSync`s `ProfileImageSettings.vue` and matches it as TEXT. That put the
 * file inside the coverage tool's field of view without executing one line of it,
 * which is how it read as "covered" at `LF:73 LH:0`. Every assertion below runs
 * through a real `mount()` of the binding taken FROM THE BARREL, so it can only
 * pass if the export exists AND the component actually renders.
 * ---------------------------------------------------------------------------- */

/** The `__name` Vue's SFC compiler stamps on a `<script setup>` component. */
function sfcName(c: unknown): string | undefined {
  return (c as { __name?: string }).__name;
}

describe('S263 — the newly exported components', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('RatingBadge is exported and RENDERS its stars', () => {
    // Deleting `export { default as RatingBadge } …` from src/index.ts makes this
    // binding undefined and `mount` throws — the export cannot be dropped silently.
    expect(sfcName(RatingBadge)).toBe('RatingBadge'); // EXACT, never a substring match
    const w = mount(RatingBadge, { props: { rating: 7.5 } });
    expect(w.find('.rating-badge').exists()).toBe(true);
    // 7.5/10 × 5 = 3.75 → 4 filled of 5. A specific number, so a component that
    // renders an empty root cannot pass.
    expect(w.findAll('.rating-badge__star')).toHaveLength(5);
    expect(w.findAll('.rating-badge__star.is-filled')).toHaveLength(4);
    w.unmount();
  });

  it('UserRatingPicker is exported and RENDERS its signed-out prompt', () => {
    expect(sfcName(UserRatingPicker)).toBe('UserRatingPicker');
    // No access_token in localStorage ⇒ the `!isAuthenticated` branch. Chosen
    // deliberately: it needs no fetch mock, so this pin stays a pin and does not
    // duplicate UserRatingPicker.test.ts's behavioural cover.
    const w = mount(UserRatingPicker, { props: { modelValue: null, mediaId: 'itm-1' } });
    expect(w.find('.user-rating-picker__signin').text()).toBe('Sign in to rate');
    expect(w.findAll('.user-rating-picker__star')).toHaveLength(0);
    w.unmount();
  });

  it('ProfileImageSettings is exported and RENDERS the initials fallback', () => {
    expect(sfcName(ProfileImageSettings)).toBe('ProfileImageSettings');
    const auth = useAuthStore();
    auth.user = { id: 'u1', name: 'Ada Lovelace', avatar_url: null } as never;
    const w = mount(ProfileImageSettings);
    expect(w.find('.pis__avatar-initials').text()).toBe('AL');
    expect(w.find('.pis__hint').text()).toBe('PNG, JPEG, or WEBP — max 5 MB.');
    w.unmount();
  });

  it('the three barrel bindings are three DISTINCT components', () => {
    // Anti-vacuity for the three cases above: a barrel that pointed all three
    // names at one SFC would satisfy "each renders something".
    const names = [RatingBadge, UserRatingPicker, ProfileImageSettings].map(sfcName);
    expect(names).toEqual(['RatingBadge', 'UserRatingPicker', 'ProfileImageSettings']);
    expect(new Set([RatingBadge, UserRatingPicker, ProfileImageSettings]).size).toBe(3);
  });
});
