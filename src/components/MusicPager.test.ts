/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import MusicPager from './MusicPager.vue';

const wrappers: VueWrapper[] = [];

function mountPager(props: {
  offset: number;
  limit: number;
  total: number;
  label?: string;
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

  it('emits nothing while disabled, even if a control is clicked directly', async () => {
    const w = mountPager({ offset: 500, limit: 100, total: 2197, disabled: true });
    await w.find('[data-nav="next"]').trigger('click');
    expect(w.emitted('go')).toBeUndefined();
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

  it('labels the nav with the caller-supplied label and falls back to a default', () => {
    const labelled = mountPager({ offset: 0, limit: 100, total: 200, label: 'Artists' });
    expect(labelled.find('nav').attributes('aria-label')).toBe('Artists');

    const bare = mountPager({ offset: 0, limit: 100, total: 200 });
    expect(bare.find('nav').attributes('aria-label')).toBe('Pagination');
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
