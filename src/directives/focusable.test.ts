import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { focusable, focusableRegistry, installFocusable } from './focusable';

describe('v-focusable directive', () => {
  beforeEach(() => focusableRegistry.clear());

  it('mounted: adds to registry, sets tabindex -1 and data-focusable; unmount removes', () => {
    const w = mount({
      directives: { focusable },
      template: `<button v-focusable>hi</button>`,
    });
    const el = w.find('button').element as HTMLElement;
    expect(el.getAttribute('tabindex')).toBe('-1');
    expect(el.hasAttribute('data-focusable')).toBe(true);
    expect(focusableRegistry.has(el)).toBe(true);
    w.unmount();
    expect(focusableRegistry.has(el)).toBe(false);
  });

  it('does not clobber an existing tabindex', () => {
    const w = mount({
      directives: { focusable },
      template: `<button v-focusable tabindex="0">hi</button>`,
    });
    expect((w.find('button').element as HTMLElement).getAttribute('tabindex')).toBe('0');
    w.unmount();
  });

  it('disabled: tagged but excluded from the registry, and toggles on update', async () => {
    const w = mount({
      directives: { focusable },
      data: () => ({ disabled: true }),
      template: `<button v-focusable="{ disabled }">hi</button>`,
    });
    const el = w.find('button').element as HTMLElement;
    expect(el.hasAttribute('data-focusable')).toBe(true);
    expect(focusableRegistry.has(el)).toBe(false);
    await w.setData({ disabled: false });
    expect(focusableRegistry.has(el)).toBe(true);
    await w.setData({ disabled: true });
    expect(focusableRegistry.has(el)).toBe(false);
    w.unmount();
  });

  it('stashes group/order as data-attrs', () => {
    const w = mount({
      directives: { focusable },
      template: `<button v-focusable="{ group: 'rail', order: 3 }">hi</button>`,
    });
    const el = w.find('button').element as HTMLElement;
    expect(el.getAttribute('data-focus-group')).toBe('rail');
    expect(el.getAttribute('data-focus-order')).toBe('3');
    w.unmount();
  });

  it('installFocusable registers the global directive', () => {
    const calls: Array<[string, unknown]> = [];
    const fakeApp = { directive: (name: string, def: unknown) => calls.push([name, def]) } as never;
    installFocusable(fakeApp);
    expect(calls[0][0]).toBe('focusable');
    expect(calls[0][1]).toBe(focusable);
  });
});
