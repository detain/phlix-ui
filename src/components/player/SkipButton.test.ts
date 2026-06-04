import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SkipButton from './SkipButton.vue';

type Marker = { start: number; end: number } | null;

function mountSkip(props: { position: number; introMarker?: Marker; outroMarker?: Marker }) {
  return mount(SkipButton, { props });
}

describe('SkipButton', () => {
  it('renders nothing when there are no markers', () => {
    const w = mountSkip({ position: 100 });
    expect(w.find('button').exists()).toBe(false);
  });

  it('shows "Skip intro" inside the intro range and emits the intro end on click', async () => {
    const w = mountSkip({ position: 10, introMarker: { start: 5, end: 35 } });
    const btn = w.find('button');
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toContain('Skip intro');
    await btn.trigger('click');
    expect(w.emitted('skip')?.[0]).toEqual([35]);
  });

  it('shows "Skip outro" inside the outro range and emits the outro end on click', async () => {
    const w = mountSkip({ position: 560, outroMarker: { start: 540, end: 600 } });
    const btn = w.find('button');
    expect(btn.text()).toContain('Skip outro');
    await btn.trigger('click');
    expect(w.emitted('skip')?.[0]).toEqual([600]);
  });

  it('treats the range as half-open [start, end): visible at start, hidden at end', async () => {
    const w = mountSkip({ position: 5, introMarker: { start: 5, end: 35 } });
    expect(w.find('button').exists()).toBe(true); // start is inclusive
    await w.setProps({ position: 35 });
    expect(w.find('button').exists()).toBe(false); // end is exclusive
    await w.setProps({ position: 4.9 });
    expect(w.find('button').exists()).toBe(false); // before start
  });

  it('prefers the intro label when both markers cover the position', () => {
    const w = mountSkip({
      position: 10,
      introMarker: { start: 5, end: 35 },
      outroMarker: { start: 8, end: 40 },
    });
    expect(w.find('button').text()).toContain('Skip intro');
  });

  it('ignores an empty / inverted marker (end <= start)', () => {
    const w = mountSkip({ position: 10, introMarker: { start: 20, end: 20 } });
    expect(w.find('button').exists()).toBe(false);
  });

  it('uses an icon and emits nothing until clicked', () => {
    const w = mountSkip({ position: 10, introMarker: { start: 5, end: 35 } });
    expect(w.findAll('.phlix-icon').length).toBeGreaterThanOrEqual(1);
    expect(w.emitted('skip')).toBeUndefined();
  });
});
