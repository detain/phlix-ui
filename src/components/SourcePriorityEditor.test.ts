/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SourcePriorityEditor from './SourcePriorityEditor.vue';
import Select from './ui/Select.vue';

const AVAILABLE = ['tmdb', 'imdb', 'tvdb', 'fanart', 'local', 'anidb'];

function mountEditor(modelValue: string[], available: string[] = AVAILABLE) {
  return mount(SourcePriorityEditor, {
    props: { modelValue, available, label: 'Movie sources' },
  });
}

/** Last `update:modelValue` payload emitted, or undefined. */
function lastEmit(w: ReturnType<typeof mountEditor>): string[] | undefined {
  const events = w.emitted('update:modelValue');
  return events ? (events[events.length - 1]![0] as string[]) : undefined;
}

describe('SourcePriorityEditor — rendering', () => {
  it('renders every source in the order as an ordered list', () => {
    const w = mountEditor(['tmdb', 'imdb']);
    const items = w.findAll('.source-priority__item');
    expect(items.length).toBe(2);
    expect(items[0]!.text()).toContain('tmdb');
    expect(items[1]!.text()).toContain('imdb');
    expect(w.find('ol').exists()).toBe(true);
  });

  it('renders a source absent from `available` (never silently dropped) with an unknown marker', () => {
    const w = mountEditor(['tmdb', 'mystery'], ['tmdb', 'imdb']);
    expect(w.findAll('.source-priority__item').length).toBe(2);
    expect(w.text()).toContain('mystery');
    expect(w.find('.source-priority__unknown').exists()).toBe(true);
  });

  it('shows an empty state when the order is empty', () => {
    const w = mountEditor([]);
    expect(w.find('.source-priority__empty').exists()).toBe(true);
    expect(w.findAll('.source-priority__item').length).toBe(0);
  });
});

describe('SourcePriorityEditor — reorder', () => {
  it('Move down on the first item emits the swapped order', async () => {
    const w = mountEditor(['tmdb', 'imdb']);
    await w.find('[aria-label="Move tmdb down"]').trigger('click');
    expect(lastEmit(w)).toEqual(['imdb', 'tmdb']);
  });

  it('Move up on the second item emits the swapped order', async () => {
    const w = mountEditor(['tmdb', 'imdb', 'tvdb']);
    await w.find('[aria-label="Move imdb up"]').trigger('click');
    expect(lastEmit(w)).toEqual(['imdb', 'tmdb', 'tvdb']);
  });

  it('Move down in the middle emits the swapped order', async () => {
    const w = mountEditor(['tmdb', 'imdb', 'tvdb']);
    await w.find('[aria-label="Move imdb down"]').trigger('click');
    expect(lastEmit(w)).toEqual(['tmdb', 'tvdb', 'imdb']);
  });

  it('does not mutate the original modelValue array (emits a fresh array)', async () => {
    const original = ['tmdb', 'imdb'];
    const w = mountEditor(original);
    await w.find('[aria-label="Move tmdb down"]').trigger('click');
    expect(original).toEqual(['tmdb', 'imdb']); // untouched
    expect(lastEmit(w)).not.toBe(original);
  });
});

describe('SourcePriorityEditor — add / remove', () => {
  it('removing an item emits the order without it', async () => {
    const w = mountEditor(['tmdb', 'imdb']);
    await w.find('[aria-label="Remove imdb"]').trigger('click');
    expect(lastEmit(w)).toEqual(['tmdb']);
  });

  it('adding an available source appends it to the order', () => {
    const w = mountEditor(['tmdb']);
    w.findComponent(Select).vm.$emit('update:modelValue', 'anidb');
    expect(lastEmit(w)).toEqual(['tmdb', 'anidb']);
  });

  it('does not re-add a source already in the order', () => {
    const w = mountEditor(['tmdb']);
    w.findComponent(Select).vm.$emit('update:modelValue', 'tmdb');
    expect(w.emitted('update:modelValue')).toBeUndefined();
  });

  it('hides the Add control when every available source is already in the order', () => {
    const w = mountEditor(AVAILABLE, AVAILABLE);
    expect(w.findComponent(Select).exists()).toBe(false);
  });
});

describe('SourcePriorityEditor — accessibility / keyboard', () => {
  it('disables Up on the first row and Down on the last row', () => {
    const w = mountEditor(['tmdb', 'imdb', 'tvdb']);
    const up = w.findAll('[aria-label^="Move"][aria-label$="up"]');
    const down = w.findAll('[aria-label^="Move"][aria-label$="down"]');
    expect((up[0]!.element as HTMLButtonElement).disabled).toBe(true);
    expect((up[1]!.element as HTMLButtonElement).disabled).toBe(false);
    expect((down[down.length - 1]!.element as HTMLButtonElement).disabled).toBe(true);
  });

  it('every control is a real button with an explicit aria-label', () => {
    const w = mountEditor(['tmdb', 'imdb']);
    const buttons = w.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);
    for (const b of buttons) {
      expect(b.attributes('type')).toBe('button');
      expect(b.attributes('aria-label')).toBeTruthy();
    }
  });
});
