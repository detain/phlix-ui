/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Sheet from './Sheet.vue';

/**
 * S-ui-design-23 (design-028): the close affordance's accessible name must come
 * from the i18n catalog, not a hard-coded "Close" literal. Sheet teleports its
 * panel to <body> (Modal.test.ts precedent), so assertions query the document.
 */

afterEach(() => {
  document.body.innerHTML = '';
});

function mountSheet(messages: Record<string, unknown> | null = null) {
  return mount(Sheet, {
    props: { modelValue: true, title: 'Panel' },
    slots: { default: 'Body' },
    attachTo: document.body,
    global: { provide: { phlixConfig: messages ? { messages } : null } },
  });
}

describe('Sheet — close button name through the catalog (S-ui-design-23 / design-028)', () => {
  it('close button takes the English catalog value byte-identically', () => {
    mountSheet();
    const close = document.body.querySelector('.phlix-sheet__header button[aria-label]');
    expect(close?.getAttribute('aria-label')).toBe('Close');
  });

  it('a consumer catalog renames the close button (renders through the catalog, not a literal)', () => {
    mountSheet({ common: { close: 'Schließen' } });
    const close = document.body.querySelector('.phlix-sheet__header button[aria-label]');
    expect(close?.getAttribute('aria-label')).toBe('Schließen');
  });

  it('hideClose still removes the affordance entirely (pin unchanged by the routing)', () => {
    mount(Sheet, {
      props: { modelValue: true, title: 'Panel', hideClose: true },
      attachTo: document.body,
      global: { provide: { phlixConfig: null } },
    });
    expect(document.body.querySelector('.phlix-sheet__header button')).toBeNull();
  });
});
