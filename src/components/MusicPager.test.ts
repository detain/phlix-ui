/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import MusicPager from './MusicPager.vue';

const wrappers: VueWrapper[] = [];

function mountPager(props: {
  offset: number;
  limit: number;
  total: number;
  label?: string;
  /** `id` of the listing the pager drives (`aria-controls` on the jump select). */
  controls?: string;
  disabled?: boolean;
}): VueWrapper {
  const w = mount(MusicPager, {
    props,
    global: { stubs: { Icon: { props: ['name'], template: '<i :data-icon="name" />' } } },
  });
  wrappers.push(w);
  return w;
}

afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
});

/** The offsets emitted by `go`, in order. */
function emitted(w: VueWrapper): number[] {
  return (w.emitted('go') ?? []).map((args) => (args as number[])[0]!);
}

describe('MusicPager', () => {
  it('renders nothing when the whole listing fits on one page', () => {
    const w = mountPager({ offset: 0, limit: 100, total: 100 });
    expect(w.find('.music-pager').exists()).toBe(false);
  });

  it('renders nothing for an empty listing', () => {
    const w = mountPager({ offset: 0, limit: 100, total: 0 });
    expect(w.find('.music-pager').exists()).toBe(false);
  });

  it('renders when there is a second page', () => {
    const w = mountPager({ offset: 0, limit: 100, total: 101 });
    expect(w.find('.music-pager').exists()).toBe(true);
    expect(w.find('[data-nav="info"]').text()).toContain('Page 1 of 2');
  });

  // 2,197 artists / 100 per page = 22 pages — the production shape S110 exists for.
  it('computes the page count and range for the production artist library', () => {
    const w = mountPager({ offset: 0, limit: 100, total: 2197 });
    expect(w.find('[data-nav="info"]').text()).toContain('Page 1 of 22');
    expect(w.find('[data-nav="info"]').text()).toContain('Showing 1–100 of 2,197');
  });

  it('reports the partial last page range', () => {
    const w = mountPager({ offset: 2100, limit: 100, total: 2197 });
    expect(w.find('[data-nav="info"]').text()).toContain('Page 22 of 22');
    expect(w.find('[data-nav="info"]').text()).toContain('Showing 2,101–2,197 of 2,197');
  });

  it('emits the first/prev/next/last offsets', async () => {
    const w = mountPager({ offset: 500, limit: 100, total: 2197 });

    await w.find('[data-nav="first"]').trigger('click');
    await w.find('[data-nav="prev"]').trigger('click');
    await w.find('[data-nav="next"]').trigger('click');
    await w.find('[data-nav="last"]').trigger('click');

    // last page = ceil(2197/100) = 22 → offset 2100, which is how the 2,197th
    // artist becomes reachable in one click instead of 21 Next presses.
    expect(emitted(w)).toEqual([0, 400, 600, 2100]);
  });

  it('disables first/prev on the first page and next/last on the last', () => {
    const first = mountPager({ offset: 0, limit: 100, total: 2197 });
    expect(first.find('[data-nav="first"]').attributes('disabled')).toBeDefined();
    expect(first.find('[data-nav="prev"]').attributes('disabled')).toBeDefined();
    expect(first.find('[data-nav="next"]').attributes('disabled')).toBeUndefined();
    expect(first.find('[data-nav="last"]').attributes('disabled')).toBeUndefined();

    const last = mountPager({ offset: 2100, limit: 100, total: 2197 });
    expect(last.find('[data-nav="first"]').attributes('disabled')).toBeUndefined();
    expect(last.find('[data-nav="next"]').attributes('disabled')).toBeDefined();
    expect(last.find('[data-nav="last"]').attributes('disabled')).toBeDefined();
  });

  /**
   * S138 — the in-flight gate, pinned on BOTH of its halves.
   *
   * **Why this gate is load-bearing for a DIFFERENT component.** `MusicLibraryPage`
   * deliberately leaves `loading` UNGUARDED in its generation-guard work: its
   * `finally { loading.value = false; }` runs even for an abandoned request, because a
   * generation-guarded reset would strand the skeleton on the artists grid forever
   * (see the `loadArtists` doc block in `MusicLibraryPage.vue`). That is only safe
   * because at most one page load is ever in flight — and it is THIS gate that makes
   * it true, since the pager is the one control that can start a second load.
   *
   * ⚠️ **The obvious test cannot see the JS half, and passes anyway.** Vue Test Utils'
   * `trigger()` opens with `if (this.element && !this.isDisabled())`, and `isDisabled()`
   * is true for a BUTTON/SELECT carrying a `disabled` attribute
   * (`@vue/test-utils/dist/vue-test-utils.esm-bundler.mjs`, `BaseWrapper`). So
   * `trigger('click')` on a disabled control dispatches NOTHING: the assertion that
   * followed it passed because no event was ever delivered, not because the guard
   * rejected one. Measured 2026-08-02 — deleting `if (props.disabled) return;` from
   * `MusicPager.vue` left the WHOLE suite green at 229 files / 4223 passed. Same
   * "passes for the wrong reason" class as an impossible-selector negative.
   *
   * The JS half is therefore driven by a RAW `dispatchEvent`, which VTU never sees and
   * so cannot short-circuit; Vue's own DOM invoker stamps `_vts` on an event that has
   * none and runs the handler, so the listener really is reached. The
   * `still delivers` test below is the control that proves that route is not inert —
   * without it, a silently-swallowed dispatch would fake exactly the green this
   * describe exists to stop.
   *
   * **This pager is NOT the only one (measured 2026-08-02, S138 AC bullet 3).** A scan
   * for `<button|select|input>` carrying BOTH a `:disabled` binding and an event
   * handler found 31 sites in 18 files; seven of them hold a `disabled` early-return
   * that `trigger()` likewise cannot reach, and deleting ALL SEVEN at once still left
   * the full suite at 229 files / 4223 passed:
   *
   *   `ThumbRating.vue` `onUp` + `onDown` · `ui/Switch.vue` `toggle` ·
   *   `ui/Chip.vue` `onMain` · `ui/Select.vue` `onTriggerKeydown` ·
   *   `ui/Combobox.vue` `onKeydown` · `ui/Tabs.vue` `select` (`!t || t.disabled`)
   *
   * Near-siblings guarded on an equivalent non-`disabled` condition, same blind spot:
   * `SourcePriorityEditor.vue` `moveUp`/`moveDown`, `MusicTracksPage.vue` `playAll`,
   * `admin/PluginsPage.vue` `removeCatalogSource`, `admin/SettingsPage.vue`
   * `restartServer`. Left as a follow-up rather than fixed here (S138's scope is the
   * pager); the two helpers below are the whole technique needed to close them.
   */
  describe('disabled — the in-flight gate MusicLibraryPage depends on', () => {
    /** A click VTU's `trigger()` refuses to deliver to a disabled control. */
    async function rawClick(el: Element): Promise<void> {
      el.dispatchEvent(new Event('click'));
      await nextTick();
    }

    /** A `change` VTU's `trigger()` refuses to deliver to a disabled `<select>`. */
    async function rawChange(el: HTMLSelectElement, value: string): Promise<void> {
      el.value = value;
      el.dispatchEvent(new Event('change'));
      await nextTick();
    }

    it('still delivers when NOT disabled — the raw-dispatch route is not inert', async () => {
      const w = mountPager({ offset: 500, limit: 100, total: 2197 });
      await rawClick(w.find('[data-nav="next"]').element);
      await rawChange(w.find('[data-nav="jump"]').element as HTMLSelectElement, '3');
      // 500/100 → page 6; next → offset 600, jump to page 3 → offset 200. If this is
      // ever `[]` the dispatch below proves nothing and the next test is vacuous.
      expect(emitted(w)).toEqual([600, 200]);
    });

    it('emits nothing when a disabled control is driven anyway (the JS guard)', async () => {
      const w = mountPager({ offset: 500, limit: 100, total: 2197, disabled: true });
      for (const nav of ['first', 'prev', 'next', 'last']) {
        await rawClick(w.find(`[data-nav="${nav}"]`).element);
      }
      // Second entry point into the same guard: `onJump` has no `disabled` check of
      // its own, it relies entirely on `goToPage`'s.
      await rawChange(w.find('[data-nav="jump"]').element as HTMLSelectElement, '3');
      expect(w.emitted('go')).toBeUndefined();
    });

    it('marks every control disabled, so the browser gate holds too', () => {
      // In a real browser the primary barrier is the HTML attribute, not the JS
      // guard — so pin it. Asserted on ALL FIVE controls, not one: `first`/`prev`
      // and `next`/`last` are each already disabled by an edge condition on some
      // page, so testing only one arm would pass for `!hasPrev`'s reason. Offset 500
      // of 2,197 is a middle page where every arrow is otherwise enabled.
      const w = mountPager({ offset: 500, limit: 100, total: 2197, disabled: true });
      for (const nav of ['first', 'prev', 'next', 'last', 'jump']) {
        expect(
          w.find(`[data-nav="${nav}"]`).attributes('disabled'),
          `[data-nav="${nav}"] must carry the disabled attribute while a page is in flight`,
        ).toBeDefined();
      }
    });
  });

  it('jumps to an arbitrary page through the select (random access, not 21 clicks)', async () => {
    const w = mountPager({ offset: 0, limit: 100, total: 2197 });
    const select = w.find<HTMLSelectElement>('[data-nav="jump"]');
    expect(select.findAll('option')).toHaveLength(22);

    await select.setValue('14');

    expect(emitted(w)).toEqual([1300]);
  });

  it('clamps a jump beyond the last page', async () => {
    const w = mountPager({ offset: 0, limit: 100, total: 250 });
    // The select cannot offer an out-of-range page, so drive the handler through a
    // hand-made event to pin the clamp itself.
    const select = w.find('[data-nav="jump"]').element as HTMLSelectElement;
    const option = document.createElement('option');
    option.value = '99';
    select.appendChild(option);
    select.value = '99';
    await w.find('[data-nav="jump"]').trigger('change');

    expect(emitted(w)).toEqual([200]);
  });

  it('ignores a non-numeric jump value', async () => {
    const w = mountPager({ offset: 0, limit: 100, total: 250 });
    const select = w.find('[data-nav="jump"]').element as HTMLSelectElement;
    const option = document.createElement('option');
    option.value = 'not-a-number';
    select.appendChild(option);
    select.value = 'not-a-number';
    await w.find('[data-nav="jump"]').trigger('change');

    expect(w.emitted('go')).toBeUndefined();
  });

  it('treats a non-positive limit as 1 rather than dividing by zero', () => {
    const w = mountPager({ offset: 0, limit: 0, total: 3 });
    expect(w.find('[data-nav="info"]').text()).toContain('Page 1 of 3');
    expect(w.find('[data-nav="info"]').text()).toContain('Showing 1–1 of 3');
  });

  it('clamps an out-of-range offset to the last page instead of inventing pages', () => {
    const w = mountPager({ offset: 999999, limit: 100, total: 250 });
    expect(w.find('[data-nav="info"]').text()).toContain('Page 3 of 3');
    expect(w.find('[data-nav="next"]').attributes('disabled')).toBeDefined();
  });

  it('drops the jump select rather than mint unbounded options for an absurd total', () => {
    // `total` is server data: 1,000,000 rows / limit 1 would be a million <option>
    // nodes. The arrows still work, so the listing stays navigable.
    const w = mountPager({ offset: 0, limit: 1, total: 1000000 });
    expect(w.find('.music-pager').exists()).toBe(true);
    expect(w.find('[data-nav="jump"]').exists()).toBe(false);
    expect(w.find('[data-nav="next"]').exists()).toBe(true);
  });

  it('names the landmark for the listing it pages, never identically to it', () => {
    // Passing the bare listing name made the nav announce itself as "Artists" —
    // indistinguishable from the grid above it — and left `music.pagination`
    // unreachable in the product.
    const labelled = mountPager({ offset: 0, limit: 100, total: 200, label: 'Artists' });
    expect(labelled.find('nav').attributes('aria-label')).toBe('Artists pagination');
    expect(labelled.find('nav').attributes('aria-label')).not.toBe('Artists');

    const bare = mountPager({ offset: 0, limit: 100, total: 200 });
    expect(bare.find('nav').attributes('aria-label')).toBe('Pagination');

    const blank = mountPager({ offset: 0, limit: 100, total: 200, label: '' });
    expect(blank.find('nav').attributes('aria-label')).toBe('Pagination');
  });

  // ---- a11y: a page change must be announced, not silent --------------------

  it('announces the page readout as a live region', () => {
    const w = mountPager({ offset: 100, limit: 100, total: 2197 });
    const info = w.find('[data-nav="info"]');
    // Without a live region, pressing Next replaces the grid and says nothing.
    expect(info.attributes('role')).toBe('status');
    expect(info.attributes('aria-live')).toBe('polite');
    expect(info.attributes('aria-atomic')).toBe('true');
    // NOT aria-current: that state marks the current item within a SET of navigable
    // items, and this is a status string. See the single-owner test below.
    expect(info.attributes('aria-current')).toBeUndefined();
  });

  it('has exactly ONE aria-current in the whole nav, on the selected option', () => {
    // Two of them (the readout AND the option) is the kind of drift that a test
    // pinning only "one aria-current OPTION" would not catch, so this counts every
    // node in the landmark.
    const w = mountPager({ offset: 200, limit: 100, total: 2197 });
    const all = w.findAll('[aria-current]');
    expect(all).toHaveLength(1);
    expect(all[0]!.element.tagName).toBe('OPTION');
    expect(all[0]!.text()).toBe('3');
    expect(all[0]!.attributes('aria-current')).toBe('page');
  });

  it('still has exactly one aria-current when the jump select is dropped', () => {
    // Above MAX_JUMP_OPTIONS there is no option list, so there is no set of page
    // items and therefore nothing may claim `aria-current`.
    const w = mountPager({ offset: 0, limit: 1, total: 1000000 });
    expect(w.find('[data-nav="jump"]').exists()).toBe(false);
    expect(w.findAll('[aria-current]')).toHaveLength(0);
  });

  it('points the jump select at the listing it drives, and marks the current option', () => {
    const w = mountPager({ offset: 200, limit: 100, total: 2197, controls: 'the-grid' });
    expect(w.find('[data-nav="jump"]').attributes('aria-controls')).toBe('the-grid');

    const current = w.findAll('option').filter((o) => o.attributes('aria-current') === 'page');
    expect(current).toHaveLength(1);
    expect(current[0]!.text()).toBe('3');
  });

  it('omits aria-controls when no listing id is supplied', () => {
    const w = mountPager({ offset: 0, limit: 100, total: 2197 });
    expect(w.find('[data-nav="jump"]').attributes('aria-controls')).toBeUndefined();
  });

  // INFO-13: `:value="page"` is a plain binding, not `v-model` — pin that the select
  // actually re-reflects the current page after the parent navigates.
  it('reflects the current page in the jump select after a prop-driven navigation', async () => {
    const w = mountPager({ offset: 0, limit: 100, total: 2197 });
    const select = w.find<HTMLSelectElement>('[data-nav="jump"]');
    expect(select.element.value).toBe('1');

    await w.setProps({ offset: 1300 });

    expect(select.element.value).toBe('14');
    expect(w.find('[data-nav="info"]').text()).toContain('Page 14 of 22');
    const current = w.findAll('option').filter((o) => o.attributes('aria-current') === 'page');
    expect(current).toHaveLength(1);
    expect(current[0]!.text()).toBe('14');
  });

  it('gives every control an accessible name', () => {
    const w = mountPager({ offset: 100, limit: 100, total: 2197 });
    expect(w.find('[data-nav="first"]').attributes('aria-label')).toBe('First page');
    expect(w.find('[data-nav="prev"]').attributes('aria-label')).toBe('Previous page');
    expect(w.find('[data-nav="next"]').attributes('aria-label')).toBe('Next page');
    expect(w.find('[data-nav="last"]').attributes('aria-label')).toBe('Last page');
    expect(w.find('.music-pager__jump-label').text()).toBe('Jump to page');
  });

  it('honours a consumer message override for the pager strings', () => {
    const w = mount(MusicPager, {
      props: { offset: 0, limit: 100, total: 2197 },
      global: {
        stubs: { Icon: { props: ['name'], template: '<i :data-icon="name" />' } },
        provide: {
          phlixConfig: {
            messages: { music: { pageOf: 'Seite {page} von {pages}', nextPage: 'Nächste Seite' } },
          },
        },
      },
    });
    wrappers.push(w);
    expect(w.find('[data-nav="info"]').text()).toContain('Seite 1 von 22');
    expect(w.find('[data-nav="next"]').attributes('aria-label')).toBe('Nächste Seite');
  });
});
