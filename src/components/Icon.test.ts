/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Icon from './Icon.vue';

describe('Icon', () => {
  it('renders an inline svg for a known name', () => {
    const w = mount(Icon, { props: { name: 'play' } });
    const svg = w.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.classes()).toContain('phlix-icon');
  });

  it('is decorative (aria-hidden) when no label is given', () => {
    const w = mount(Icon, { props: { name: 'search' } });
    const svg = w.find('svg');
    expect(svg.attributes('aria-hidden')).toBe('true');
    expect(svg.attributes('role')).toBeUndefined();
    expect(svg.attributes('aria-label')).toBeUndefined();
  });

  it('exposes role=img + aria-label when labelled', () => {
    const w = mount(Icon, { props: { name: 'play', label: 'Play' } });
    const svg = w.find('svg');
    expect(svg.attributes('role')).toBe('img');
    expect(svg.attributes('aria-label')).toBe('Play');
    expect(svg.attributes('aria-hidden')).toBeUndefined();
  });

  it('applies numeric size as px font-size and string size verbatim', () => {
    const px = mount(Icon, { props: { name: 'x', size: 20 } });
    expect(px.find('svg').attributes('style')).toContain('font-size: 20px');
    const rem = mount(Icon, { props: { name: 'x', size: '1.25rem' } });
    expect(rem.find('svg').attributes('style')).toContain('font-size: 1.25rem');
  });

  it('omits inline font-size when size is not set (inherits em)', () => {
    const w = mount(Icon, { props: { name: 'film' } });
    const style = w.find('svg').attributes('style');
    expect(style === undefined || !style.includes('font-size')).toBe(true);
  });

  it('passes through stroke-width', () => {
    const w = mount(Icon, { props: { name: 'play', strokeWidth: 1.5 } });
    expect(w.find('svg').attributes('stroke-width')).toBe('1.5');
  });

  it('renders every registered icon without error', () => {
    const names = [
      'play', 'pause', 'skip-back', 'skip-forward', 'rewind', 'forward', 'volume',
      'volume-low', 'mute', 'captions', 'pip', 'theater', 'fullscreen', 'fullscreen-exit',
      'expand', 'cast', 'settings', 'speed', 'film', 'image', 'music', 'tv', 'search',
      'filter', 'calendar', 'sort', 'star', 'list', 'plus', 'info', 'x', 'check',
      'bookmark', 'bookmark-plus', 'heart', 'user', 'log-out', 'menu', 'more', 'eye',
      'eye-off', 'arrow-left', 'arrow-up', 'arrow-down', 'chevron-down', 'chevron-up',
      'chevron-left', 'chevron-right', 'spinner', 'alert', 'success', 'error', 'sun',
      'moon', 'monitor',
    ] as const;
    for (const name of names) {
      const w = mount(Icon, { props: { name } });
      expect(w.find('svg').exists(), `icon "${name}" should render`).toBe(true);
    }
  });
});
