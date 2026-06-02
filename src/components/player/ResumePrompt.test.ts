import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ResumePrompt from './ResumePrompt.vue';
import { formatTime } from './format-time';

describe('ResumePrompt', () => {
  it('renders the formatted resume position', () => {
    const w = mount(ResumePrompt, { props: { seconds: 5025 } }); // 1:23:45
    expect(w.find('.resume__time').text()).toBe(formatTime(5025));
    expect(w.text()).toContain('Resume from');
    expect(w.find('[role="region"]').attributes('aria-label')).toBe('Resume playback');
  });

  it('emits resume from the Resume button', async () => {
    const w = mount(ResumePrompt, { props: { seconds: 125 } });
    await w.find('.resume__btn--amber').trigger('click');
    expect(w.emitted('resume')).toHaveLength(1);
    expect(w.emitted('restart')).toBeUndefined();
  });

  it('emits restart from the Start over button', async () => {
    const w = mount(ResumePrompt, { props: { seconds: 125 } });
    await w.find('.resume__btn--ghost').trigger('click');
    expect(w.emitted('restart')).toHaveLength(1);
    expect(w.emitted('resume')).toBeUndefined();
  });

  it('uses icons (no emoji glyphs)', () => {
    const w = mount(ResumePrompt, { props: { seconds: 60 } });
    expect(w.findAll('.phlix-icon').length).toBeGreaterThanOrEqual(2);
    expect(w.html()).not.toMatch(/[🎬▶❚🔊🔇⤢⤓←↑↓]/u);
  });
});
