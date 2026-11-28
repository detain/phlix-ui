/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import Spinner from '../components/ui/Spinner.vue';
import ResumePrompt from '../components/player/ResumePrompt.vue';
import RatingBadge from '../components/RatingBadge.vue';
import SourcePriorityEditor from '../components/SourcePriorityEditor.vue';
import CaptionsMenu from '../components/player/CaptionsMenu.vue';
import Select from '../components/ui/Select.vue';
import { createPinia, setActivePinia } from 'pinia';
import { formatTime } from '../components/player/format-time';
import type { PhlixAppConfig } from '../app/types';

/**
 * End-to-end seam check (R6.5c): proves a consumer `PhlixAppConfig.messages`
 * override actually reaches the rendered chrome of real shipped components — and
 * that omitting `messages` renders the byte-for-byte English default. This is the
 * AC ("consumers can override any adopted string; omitting messages is the current
 * English UI") verified at the component layer, not just the resolver.
 */

const wrappers: VueWrapper[] = [];
// `component`/`props` are intentionally loose: this helper mounts several
// unrelated SFCs whose prop shapes differ, and we only assert rendered output.
function mountWith(
  component: unknown,
  props: Record<string, unknown>,
  config: Partial<PhlixAppConfig> | null,
): VueWrapper {
  const w = mount(component as any, {
    props,
    global: { provide: { phlixConfig: config } },
  });
  wrappers.push(w);
  return w;
}

afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
});

describe('i18n adoption (R6.5c)', () => {
  it('Spinner: English default aria-label when no override is provided', () => {
    const w = mountWith(Spinner, {}, null);
    expect(w.find('.phlix-spinner').attributes('aria-label')).toBe('Loading');
  });

  it('Spinner: a consumer override reaches the rendered aria-label', () => {
    const w = mountWith(Spinner, {}, { messages: { common: { loading: 'Cargando' } } });
    expect(w.find('.phlix-spinner').attributes('aria-label')).toBe('Cargando');
  });

  it('Spinner: an explicit prop still wins over both override and default', () => {
    const w = mountWith(Spinner, { label: 'Buffering' }, { messages: { common: { loading: 'Cargando' } } });
    expect(w.find('.phlix-spinner').attributes('aria-label')).toBe('Buffering');
  });

  it('ResumePrompt: default renders the English label byte-identically, keeping the styled time span', () => {
    const w = mountWith(ResumePrompt, { seconds: 241 }, null);
    const time = formatTime(241);
    expect(w.find('.resume__label').text()).toBe(`Resume from ${time}?`);
    // the timecode keeps its own styled span (the split-template technique)
    expect(w.find('.resume__time').text()).toBe(time);
    expect(w.find('.resume__btn--amber').text()).toBe('Resume');
    expect(w.find('.resume__btn--ghost').text()).toBe('Start over');
  });

  it('ResumePrompt: an override is interpolated AND keeps the styled time span', () => {
    const w = mountWith(
      ResumePrompt,
      { seconds: 241 },
      { messages: { player: { resumeFrom: 'Reanudar desde {time}.', resume: 'Reanudar', startOver: 'Empezar de nuevo' } } },
    );
    const time = formatTime(241);
    expect(w.find('.resume__label').text()).toBe(`Reanudar desde ${time}.`);
    expect(w.find('.resume__time').text()).toBe(time);
    expect(w.find('.resume__btn--amber').text()).toBe('Reanudar');
    expect(w.find('.resume__btn--ghost').text()).toBe('Empezar de nuevo');
  });
});

// design-026 (S-ui-design-22b): the same override seam verified for remainder
// surfaces — consumer-supplied catalog values must reach the rendered chrome of
// real shipped components, and the null-config path must render the English
// default byte-for-byte.
describe('i18n adoption (design-026 remainder surfaces)', () => {
  it('RatingBadge: catalog override reaches the unrated span and the rated aria label', () => {
    const w = mountWith(
      RatingBadge,
      { rating: null },
      { messages: { rating: { none: 'Keine Bewertung' } } } as Partial<PhlixAppConfig>,
    );
    expect(w.find('.rating-badge__no-rating').text()).toBe('Keine Bewertung');
    const r = mountWith(
      RatingBadge,
      { rating: 6.5 },
      { messages: { rating: { outOfTen: '{score} von 10' } } } as Partial<PhlixAppConfig>,
    );
    expect(r.attributes('aria-label')).toBe('6.5 von 10');
  });

  it('RatingBadge: omitting messages renders the English default exactly', () => {
    const w = mountWith(RatingBadge, { rating: null }, null);
    expect(w.find('.rating-badge__no-rating').text()).toBe('No rating');
  });

  it('SourcePriorityEditor: catalog override reaches the empty-state line', () => {
    const w = mountWith(
      SourcePriorityEditor,
      { modelValue: [], available: [], label: 'Movie sources' },
      { messages: { source: { empty: 'Noch keine Quellen.' } } } as Partial<PhlixAppConfig>,
    );
    expect(w.text()).toContain('Noch keine Quellen.');
  });

  it('SourcePriorityEditor: omitting messages renders the English default exactly', () => {
    const w = mountWith(SourcePriorityEditor, { modelValue: [], available: [], label: 'Movie sources' }, null);
    expect(w.text()).toContain('No sources — add one below.');
  });
});

// ---- player chrome reaches the override seam (S-ui-player-07) ----------------

describe('i18n adoption (S-ui-player-07)', () => {
  it('CaptionsMenu: caption option labels + generated track fallbacks resolve through overrides', () => {
    setActivePinia(createPinia());
    const w = mount(CaptionsMenu, {
      props: {
        open: true,
        tracks: [{ index: 0, language: '', label: 'Track 1', kind: 'subtitles', labelKind: 'generated' }],
        audioTracks: [],
        activeAudio: -1,
      },
      global: {
        provide: {
          phlixConfig: { messages: { player: { trackNumbered: 'Pista {number}', captionColorYellow: 'Gelb' } } },
        },
      },
    });
    wrappers.push(w);
    expect(w.text()).toContain('Pista 1');
    const colorSelect = w.findAllComponents(Select)[1];
    expect(colorSelect.props('options').map((o) => (typeof o === 'object' ? o.label : String(o)))).toContain('Gelb');
  });
});
