/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ShortcutsHelp from './ShortcutsHelp.vue';
import Icon from '../Icon.vue';
import { PLAYER_SHORTCUTS } from './shortcuts';

const mounted: ReturnType<typeof mount>[] = [];
function mountHelp(open = true) {
  const w = mount(ShortcutsHelp, { props: { open }, attachTo: document.body });
  mounted.push(w);
  return w;
}
afterEach(() => {
  // unmount so useFocusTrap's document keydown listener is removed
  while (mounted.length) mounted.pop()?.unmount();
});

describe('ShortcutsHelp', () => {
  it('renders nothing when closed', () => {
    const w = mountHelp(false);
    expect(w.find('.shortcuts').exists()).toBe(false);
  });

  it('renders a dialog listing every shortcut when open', () => {
    const w = mountHelp();
    const dialog = w.find('[role="dialog"]');
    expect(dialog.exists()).toBe(true);
    expect(dialog.attributes('aria-modal')).toBe('true');
    expect(w.findAll('.shortcuts__row')).toHaveLength(PLAYER_SHORTCUTS.length);
  });

  it('renders arrow keys as SVG icons with friendly labels (never glyph chars)', () => {
    const w = mountHelp();
    const arrowIcons = w.findAllComponents(Icon).filter((i) => String(i.props('name')).startsWith('arrow-'));
    expect(arrowIcons.length).toBeGreaterThanOrEqual(4); // left/right/up/down
    expect(arrowIcons.some((i) => i.props('label') === 'Left arrow')).toBe(true);
    expect(w.html()).not.toMatch(/[←↑↓]/u);
  });

  it('renders the – range separator for the seek-to-% row', () => {
    const w = mountHelp();
    expect(w.find('.shortcuts__sep').text()).toBe('–');
  });

  it('closes via the close button', async () => {
    const w = mountHelp();
    await w.find('.shortcuts__head button').trigger('click');
    expect(w.emitted('close')).toHaveLength(1);
  });

  it('closes via the backdrop click', async () => {
    const w = mountHelp();
    await w.find('.shortcuts').trigger('click'); // @click.self on the backdrop
    expect(w.emitted('close')).toHaveLength(1);
  });

  it('closes on Escape (focus-trapped, document capture)', async () => {
    const w = mountHelp();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await w.vm.$nextTick();
    expect(w.emitted('close')).toHaveLength(1);
  });
});
