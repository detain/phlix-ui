/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * SkipControls (S-ui-player-21 / phlix-ui-player-027) — the upcoming-markers row
 * must render FULL-SENTENCE catalog labels per type ('Skip intro' /
 * 'Skip end credits' / 'Skip credits'), never an English-concatenated
 * `Skip ${shortLabel}` accessible name (which doubled the word on the ad branch
 * — 'Skip Skip credits'), must drop the dead `ad` arm from the label map while
 * keeping the wire-shape union, must render nothing for marker types outside the
 * skipable set, and must localize entirely through the catalog.
 */
import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SkipControls from './SkipControls.vue';
import type { SkipMarker } from './SkipControls.vue';

/** Markers chosen so all three skipable types share the 30s window at pos=30
 *  (intro 10s+5 … outro 25s+5 … credits 32s-5) with an `ad` and an unknown type
 *  also inside the window — both must never render. */
const MARKERS: SkipMarker[] = [
  { id: 'i', type: 'intro', startMs: 10_000, endMs: 60_000, label: 'Intro' },
  { id: 'a', type: 'ad', startMs: 28_000, endMs: 95_000, label: 'Ad' },
  { id: 'r', type: 'recap' as SkipMarker['type'], startMs: 29_000, endMs: 96_000, label: 'Recap' },
  { id: 'o', type: 'outro', startMs: 25_000, endMs: 90_000, label: 'Outro' },
  { id: 'c', type: 'credits', startMs: 32_000, endMs: 99_000, label: 'Credits' },
];

function mountControls(messages?: Record<string, Record<string, string>>) {
  return mount(SkipControls, {
    props: { position: 30, markers: MARKERS },
    global: messages ? { provide: { phlixConfig: { messages } } } : {},
    attachTo: document.body,
  });
}

describe('SkipControls — full-sentence catalog labels (phlix-ui-player-027)', () => {
  it('labels intro/outro/credits with the full-sentence catalog strings', () => {
    const w = mountControls();
    const labels = w.findAll('.skip-controls__label').map((el) => el.text());
    expect(labels).toEqual(['Skip intro', 'Skip end credits', 'Skip credits']);
  });

  it('renders buttons sorted by start time and never an ad or unknown type', () => {
    const w = mountControls();
    const btns = w.findAll('.skip-controls__btn');
    expect(btns).toHaveLength(3);
    expect(w.text()).not.toContain('Ad');
    expect(w.text()).not.toContain('Recap');
  });

  it('does not set a concatenated aria-label — the accessible name is the full-sentence text', () => {
    const w = mountControls();
    for (const btn of w.findAll('.skip-controls__btn')) {
      expect(btn.attributes('aria-label')).toBeUndefined();
    }
    expect(w.text()).not.toMatch(/Skip Skip/i);
  });

  it('the row itself keeps the localized "Skip controls" group label', () => {
    const w = mountControls();
    expect(w.find('.skip-controls').attributes('aria-label')).toBe('Skip controls');
  });

  it('resolves every label through the catalog (German override)', () => {
    const w = mountControls({
      player: {
        skipIntro: 'Vorspann überspringen',
        skipOutro: 'Abspann überspringen',
        skipLabelSkipCredits: 'Credits überspringen',
        skipControls: 'Skip-Steuerung',
      },
    });
    const labels = w.findAll('.skip-controls__label').map((el) => el.text());
    expect(labels).toEqual(['Vorspann überspringen', 'Abspann überspringen', 'Credits überspringen']);
    expect(w.find('.skip-controls').attributes('aria-label')).toBe('Skip-Steuerung');
  });

  it('emits skip at the marker start in seconds', async () => {
    const onSkip = vi.fn();
    const w = mount(SkipControls, {
      props: { position: 30, markers: MARKERS, onSkip },
      attachTo: document.body,
    });
    await w.findAll('.skip-controls__btn')[0].trigger('click');
    expect(onSkip).toHaveBeenCalledWith(10);
  });

  it('renders nothing when no skipable marker is in range', () => {
    const w = mount(SkipControls, {
      props: { position: 0, markers: MARKERS.filter((m) => m.type === 'ad') },
      attachTo: document.body,
    });
    expect(w.find('.skip-controls').exists()).toBe(false);
  });
});
