import { afterEach, describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Menu from './Menu.vue';
import { nextTick } from 'vue';

const items = [
  { label: 'Watched' },
  { label: 'Unwatched' },
  { label: 'Refresh', disabled: true },
  { label: 'Remove', danger: true },
];

function getMenuEl() {
  return document.querySelector('[role="menu"]');
}

function getMenuItems() {
  return Array.from(document.querySelectorAll('[role="menuitem"]'));
}

function cleanMenu() {
  const el = document.querySelector('[role="menu"]');
  el?.remove();
}

afterEach(() => {
  cleanMenu();
});

describe('Menu', () => {
  it('does not render the menu list when closed', () => {
    mount(Menu, { props: { items, open: false } });
    expect(getMenuEl()).toBeNull();
  });

  it('renders the menu list when open', async () => {
    mount(Menu, {
      props: { items, open: true },
      attachTo: document.body,
    });
    await flushPromises();
    await nextTick();
    expect(getMenuEl()).not.toBeNull();
    expect(getMenuItems().length).toBe(4);
  });

  it('opens on trigger click', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('click');
    await flushPromises();
    await nextTick();
    expect(getMenuEl()).not.toBeNull();
    expect(getMenuItems().length).toBe(4);
    w.unmount();
  });

  it('closes on outside click', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('click');
    await flushPromises();
    await nextTick();
    expect(getMenuEl()).not.toBeNull();
    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await flushPromises();
    await nextTick();
    expect(getMenuEl()).toBeNull();
    w.unmount();
  });

  it('closes on Escape', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('click');
    await flushPromises();
    await nextTick();
    expect(getMenuEl()).not.toBeNull();
    await w.find('.phlix-menu').trigger('keydown', { key: 'Escape' });
    await flushPromises();
    await nextTick();
    expect(getMenuEl()).toBeNull();
    w.unmount();
  });

  it('ArrowDown opens at first and navigates, skipping disabled', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Watched');

    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Unwatched');

    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Remove');

    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Watched');
    w.unmount();
  });

  it('ArrowUp opens at last and navigates, wrapping', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowUp' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Remove');
    w.unmount();
  });

  it('Home goes to first enabled, End to last enabled', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowUp' });
    await flushPromises();
    await nextTick();
    await w.find('.phlix-menu').trigger('keydown', { key: 'Home' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Watched');

    await w.find('.phlix-menu').trigger('keydown', { key: 'End' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Remove');
    w.unmount();
  });

  it('Enter selects the active item and emits select', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    await w.find('.phlix-menu').trigger('keydown', { key: 'Enter' });
    await flushPromises();
    await nextTick();
    expect(w.emitted('select')![0]).toMatchObject([{ label: 'Watched' }, 0]);
    expect(getMenuEl()).toBeNull();
    w.unmount();
  });

  it('Space selects the active item', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    await w.find('.phlix-menu').trigger('keydown', { key: ' ' });
    await flushPromises();
    await nextTick();
    expect(w.emitted('select')![0]).toMatchObject([{ label: 'Watched' }, 0]);
    expect(getMenuEl()).toBeNull();
    w.unmount();
  });

  it('clicking a menuitem selects it', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('click');
    await flushPromises();
    await nextTick();
    getMenuItems()[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();
    expect(w.emitted('select')![0]).toMatchObject([{ label: 'Unwatched' }, 1]);
    expect(getMenuEl()).toBeNull();
    w.unmount();
  });

  it('disabled item is skipped in keyboard navigation', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Watched');

    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Unwatched');

    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    expect(getMenuItems().find((el) => el.getAttribute('tabindex') === '0')?.textContent?.trim()).toBe('Remove');
    w.unmount();
  });

  it('clicking a disabled item does not select', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('click');
    await flushPromises();
    await nextTick();
    getMenuItems()[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();
    expect(w.emitted('select')).toBeFalsy();
    expect(getMenuEl()).not.toBeNull();
    w.unmount();
  });

  it('danger item has is-danger class', async () => {
    const w = mount(Menu, {
      props: { items, open: true },
      attachTo: document.body,
    });
    await flushPromises();
    await nextTick();
    const dangerItem = getMenuItems()[3];
    expect(dangerItem.classList.contains('is-danger')).toBe(true);
    expect(dangerItem.classList.contains('is-disabled')).toBe(false);
    w.unmount();
  });

  it('disabled item has aria-disabled and is-disabled class', async () => {
    const w = mount(Menu, {
      props: { items, open: true },
      attachTo: document.body,
    });
    await flushPromises();
    await nextTick();
    const disabledItem = getMenuItems()[2];
    expect(disabledItem.classList.contains('is-disabled')).toBe(true);
    expect(disabledItem.getAttribute('aria-disabled')).toBe('true');
    w.unmount();
  });

  it('only active item has tabindex=0 (roving tabindex)', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('keydown', { key: 'ArrowDown' });
    await flushPromises();
    await nextTick();
    const tabindex0 = getMenuItems().filter((el) => el.getAttribute('tabindex') === '0');
    const tabindexNeg1 = getMenuItems().filter((el) => el.getAttribute('tabindex') === '-1');
    expect(tabindex0.length).toBe(1);
    expect(tabindexNeg1.length).toBe(3);
    w.unmount();
  });

  it('pointermove sets active item', async () => {
    const w = mount(Menu, {
      props: { items, open: true },
      attachTo: document.body,
    });
    await flushPromises();
    await nextTick();
    const removeItem = getMenuItems()[3];
    removeItem.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));
    await flushPromises();
    await nextTick();
    expect(removeItem.getAttribute('tabindex')).toBe('0');
    w.unmount();
  });

  it('v-model:open emits update:open(true) on open', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('click');
    await flushPromises();
    await nextTick();
    expect(w.emitted('update:open')![0]).toEqual([true]);
    w.unmount();
  });

  it('emits select with item and index', async () => {
    const w = mount(Menu, {
      props: { items, open: true },
      attachTo: document.body,
    });
    await flushPromises();
    await nextTick();
    getMenuItems()[3].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();
    const [item, index] = w.emitted('select')![0] as [{ label: string }, number];
    expect(item.label).toBe('Remove');
    expect(index).toBe(3);
    w.unmount();
  });

  it('item with onClick calls it on select', async () => {
    const onClick = vi.fn();
    const w = mount(Menu, {
      props: { items: [{ label: 'Action', onClick }], open: true },
      attachTo: document.body,
    });
    await flushPromises();
    await nextTick();
    getMenuItems()[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();
    expect(onClick).toHaveBeenCalled();
    w.unmount();
  });

  it('Tab closes the menu without selecting', async () => {
    const w = mount(Menu, {
      props: { items, open: false },
      slots: { default: '<button>Trigger</button>' },
      attachTo: document.body,
    });
    await w.find('.phlix-menu').trigger('click');
    await flushPromises();
    await nextTick();
    expect(getMenuEl()).not.toBeNull();
    await w.find('.phlix-menu').trigger('keydown', { key: 'Tab' });
    await flushPromises();
    await nextTick();
    expect(getMenuEl()).toBeNull();
    expect(w.emitted('select')).toBeFalsy();
    w.unmount();
  });
});
