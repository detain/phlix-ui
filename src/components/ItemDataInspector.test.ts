/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ItemDataInspector from './ItemDataInspector.vue';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    type: 'movie',
    poster_url: null,
    genres: ['Sci-Fi'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: 'A boy and a desert.',
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  document.body.innerHTML = '';
});

describe('ItemDataInspector (S15)', () => {
  it('renders nothing in <body> while closed', () => {
    mount(ItemDataInspector, { props: { modelValue: false, item: media() } });
    expect(document.body.querySelector('[data-test="item-json"]')).toBeNull();
  });

  it('renders the item as read-only JSON when open', async () => {
    mount(ItemDataInspector, { props: { modelValue: true, item: media({ id: 'x9', name: 'Arrival' }) } });
    await flushPromises();
    const pre = document.body.querySelector('[data-test="item-json"]');
    expect(pre).not.toBeNull();
    // The full item object is serialized (a real client-side view, no network).
    expect(pre?.textContent).toContain('"id": "x9"');
    expect(pre?.textContent).toContain('"name": "Arrival"');
    expect(pre?.textContent).toContain('"type": "movie"');
  });

  it('shows a placeholder when no item is supplied', async () => {
    mount(ItemDataInspector, { props: { modelValue: true, item: null } });
    await flushPromises();
    expect(document.body.querySelector('[data-test="item-json"]')).toBeNull();
    expect(document.body.textContent).toContain('No item selected.');
  });

  it('emits update:modelValue(false) when Close is clicked', async () => {
    const w = mount(ItemDataInspector, { props: { modelValue: true, item: media() } });
    await flushPromises();
    const close = Array.from(document.body.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Close',
    );
    expect(close).toBeTruthy();
    close!.click();
    await flushPromises();
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('Copy JSON writes the serialized item to the clipboard when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    mount(ItemDataInspector, { props: { modelValue: true, item: media({ id: 'cp' }) } });
    await flushPromises();
    const copy = Array.from(document.body.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Copy JSON',
    );
    copy!.click();
    await flushPromises();
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(String(writeText.mock.calls[0][0])).toContain('"id": "cp"');
  });
});

/**
 * S-ui-design-26 (phlix-ui-design-034) — JSON panel surface contract.
 * The scale ships --surface / --surface-2 / --surface-3; `--surface-1` is
 * phantom, so the panel background was dropped at computed-value time and
 * monospace JSON floated over whatever scrolled behind it. Fix: the real
 * --surface. Source-level pin (jsdom has no scoped-style cascade).
 */
describe('ItemDataInspector — JSON panel surface contract (S-ui-design-26)', () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), './ItemDataInspector.vue'), 'utf8');

  it('has no phantom --surface-1 use', () => {
    expect(src).not.toContain('--surface-1');
  });

  it('paints the JSON panel with the real --surface token, fallback-free', () => {
    const rule = /\.item-inspector__json\s*\{([^}]*)\}/.exec(src);
    expect(rule, 'json panel rule missing').not.toBeNull();
    expect(rule![1]).toMatch(/background:\s*var\(--surface\);/);
  });
});

// ── design-026 (S-ui-design-22b): the inspector chrome is catalog-backed.
describe('ItemDataInspector — design-026 catalog routing (S-ui-design-22b)', () => {
  it('modal title and hint render from consumer catalog values', async () => {
    const messages = {
      inspector: { titled: 'Itemdaten — {name}', hint: 'Schreibgeschützte Ansicht der gespeicherten Daten.' },
    };
    mount(ItemDataInspector, {
      props: { modelValue: true, item: media({ id: 'x9', name: 'Arrival' }) },
      attachTo: document.body,
      global: { provide: { phlixConfig: { messages } } },
    });
    await flushPromises();
    expect(document.body.textContent).toContain('Itemdaten — Arrival');
    const hint = document.body.querySelector('.item-inspector__hint');
    expect(hint?.textContent?.trim()).toBe('Schreibgeschützte Ansicht der gespeicherten Daten.');
  });

  it('English defaults for hint, empty state and buttons still render through the catalog', async () => {
    const w = mount(ItemDataInspector, {
      props: { modelValue: true, item: media() },
      attachTo: document.body,
    });
    await flushPromises();
    const hint = document.body.querySelector('.item-inspector__hint');
    expect(hint?.textContent?.trim()).toBe("Read-only view of this item’s stored data (no changes are saved).");
    expect(document.body.textContent).toContain('Copy JSON');
    expect(document.body.textContent).toContain('Item data — Dune');
    w.unmount();
  });

  it('the no-item placeholder renders from the catalog', async () => {
    const messages = { inspector: { noItem: 'Kein Eintrag ausgewählt.' } };
    mount(ItemDataInspector, {
      props: { modelValue: true, item: null },
      attachTo: document.body,
      global: { provide: { phlixConfig: { messages } } },
    });
    await flushPromises();
    expect(document.body.textContent).toContain('Kein Eintrag ausgewählt.');
  });
});
