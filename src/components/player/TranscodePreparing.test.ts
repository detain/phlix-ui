import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TranscodePreparing from './TranscodePreparing.vue';

describe('TranscodePreparing', () => {
  it('is a polite status with a heading and progressbar', () => {
    const w = mount(TranscodePreparing);
    expect(w.find('[role="status"]').exists()).toBe(true);
    expect(w.find('.prep__heading').exists()).toBe(true);
    expect(w.find('[role="progressbar"]').exists()).toBe(true);
  });

  it('reflects progress on the bar (rounded + clamped 0–100)', () => {
    const w = mount(TranscodePreparing, { props: { progress: 42.6 } });
    const bar = w.find('[role="progressbar"]');
    expect(bar.attributes('aria-valuenow')).toBe('43');
    expect(w.find('.prep__bar-fill').attributes('style')).toContain('width: 43%');
  });

  it('clamps out-of-range progress', () => {
    expect(mount(TranscodePreparing, { props: { progress: 250 } }).find('[role="progressbar"]').attributes('aria-valuenow')).toBe('100');
    expect(mount(TranscodePreparing, { props: { progress: -10 } }).find('[role="progressbar"]').attributes('aria-valuenow')).toBe('0');
  });

  it('mentions the media title when given one', () => {
    const w = mount(TranscodePreparing, { props: { title: 'Big Buck Bunny' } });
    expect(w.text()).toContain('Big Buck Bunny');
  });

  it('emits back from the Go back button', async () => {
    const w = mount(TranscodePreparing);
    await w.find('.prep__back').trigger('click');
    expect(w.emitted('back')).toHaveLength(1);
  });

  it('uses no emoji glyphs', () => {
    const w = mount(TranscodePreparing);
    expect(w.html()).not.toMatch(/[🎬▶❚🔊🔇⤢⤓←↑↓]/u);
  });
});
