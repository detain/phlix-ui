/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IndexRail from './IndexRail.vue';
import type { IndexBucket } from '../api/index-buckets';

describe('IndexRail', () => {
  const make = (buckets: IndexBucket[]) =>
    mount(IndexRail, { props: { buckets } });

  it('renders one button per bucket', () => {
    const w = make([
      { key: 'A', label: 'A', offset: 0, count: 5 },
      { key: 'B', label: 'B', offset: 5, count: 3 },
    ]);
    expect(w.findAll('button')).toHaveLength(2);
  });

  it('disables buttons with count=0', () => {
    const w = make([{ key: 'A', label: 'A', offset: 0, count: 0 }]);
    expect(w.find('button').attributes('disabled')).toBeDefined();
  });

  it('emits jump with offset on click', async () => {
    const w = make([{ key: 'B', label: 'B', offset: 10, count: 2 }]);
    await w.find('button').trigger('click');
    expect(w.emitted('jump')).toEqual([[10]]);
  });

  it('shows label text', () => {
    const w = make([{ key: '1990s', label: '1990s', offset: 0, count: 20 }]);
    expect(w.text()).toContain('1990s');
  });

  it('uses custom ariaLabel when provided', () => {
    const w = make([
      { key: '#', label: '#', offset: 0, count: 0, ariaLabel: 'Jump to non-alphabetic titles (0)' },
    ]);
    expect(w.find('button').attributes('aria-label')).toBe('Jump to non-alphabetic titles (0)');
  });

  it('falls back to label-based aria-label when ariaLabel not provided', () => {
    const w = make([{ key: 'A', label: 'A', offset: 0, count: 5 }]);
    expect(w.find('button').attributes('aria-label')).toBe('Jump to A (5)');
  });
});
