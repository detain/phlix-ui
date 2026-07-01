import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LetterRail from './LetterRail.vue';

const letters = [
  { letter: '#', offset: 0, count: 0 },
  { letter: 'A', offset: 0, count: 12 },
  { letter: 'B', offset: 12, count: 0 },
  { letter: 'C', offset: 12, count: 5 },
];

describe('LetterRail', () => {
  it('renders one button per bucket and disables the empty ones', () => {
    const w = mount(LetterRail, { props: { letters } });
    const btns = w.findAll('.letter-rail__btn');
    expect(btns).toHaveLength(4);
    expect(btns[0].attributes('disabled')).toBeDefined(); // '#' count 0
    expect(btns[1].attributes('disabled')).toBeUndefined(); // 'A' count 12
    expect(btns[2].attributes('disabled')).toBeDefined(); // 'B' count 0
    expect(btns[1].find('.index-rail__label').text()).toBe('A');
  });

  it('emits `jump` with the bucket offset when a non-empty letter is clicked', async () => {
    const w = mount(LetterRail, { props: { letters } });
    await w.findAll('.letter-rail__btn')[3].trigger('click'); // 'C' offset 12
    expect(w.emitted('jump')?.[0]).toEqual([12]);
  });

  it('labels `#` as non-alphabetic for screen readers', () => {
    const w = mount(LetterRail, { props: { letters } });
    expect(w.findAll('.letter-rail__btn')[0].attributes('aria-label')).toContain('non-alphabetic');
  });
});
