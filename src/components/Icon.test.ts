/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Icon from './Icon.vue';
import { ICON_NAMES, icons } from './icon-registry';

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

  // DERIVED from the registry, never hand-copied. The previous version iterated a
  // literal list that had drifted 12 names behind `icons` — including the two the
  // S110 pager added — so it "covered every registered icon" only in its title.
  // Deriving means a new registration is covered the moment it lands.
  it('renders every registered icon without error', () => {
    expect(ICON_NAMES.length).toBeGreaterThan(60);
    expect(ICON_NAMES).toEqual(Object.keys(icons));

    const rendered: string[] = [];
    for (const name of ICON_NAMES) {
      const w = mount(Icon, { props: { name } });
      expect(w.find('svg').exists(), `icon "${name}" should render`).toBe(true);
      rendered.push(name);
      w.unmount();
    }
    // Cardinality pin: an empty/short registry cannot make this test vacuous.
    expect(rendered).toHaveLength(ICON_NAMES.length);
  });

  it('registers the pager chevrons the S110 pager needs', () => {
    // Named explicitly because the derived loop above would still pass if BOTH the
    // registry entry and the pager's usage were removed together.
    for (const name of ['chevrons-left', 'chevrons-right'] as const) {
      expect(ICON_NAMES, `${name} must be registered`).toContain(name);
      const w = mount(Icon, { props: { name } });
      expect(w.find('svg').exists()).toBe(true);
      w.unmount();
    }
  });
});
