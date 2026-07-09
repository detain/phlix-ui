/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TranscodeNotice from './TranscodeNotice.vue';

describe('TranscodeNotice', () => {
  it('is an assertive alert with a heading and explanation', () => {
    const w = mount(TranscodeNotice);
    expect(w.find('[role="alert"]').exists()).toBe(true);
    expect(w.find('.transcode__heading').exists()).toBe(true);
    // Reworded for the on-demand-transcode era: it now signals a FAILURE to
    // prepare a playable stream, not "transcoding isn't available".
    expect(w.text().toLowerCase()).toContain('play');
  });

  it('mentions the media title when given one', () => {
    const w = mount(TranscodeNotice, { props: { title: 'Big Buck Bunny' } });
    expect(w.text()).toContain('Big Buck Bunny');
  });

  it('falls back to a generic phrasing without a title', () => {
    const w = mount(TranscodeNotice);
    expect(w.text().toLowerCase()).toContain('this title');
  });

  it('emits back from the Go back button', async () => {
    const w = mount(TranscodeNotice, { props: { title: 'X' } });
    await w.find('.transcode__back').trigger('click');
    expect(w.emitted('back')).toHaveLength(1);
  });

  it('uses the alert icon (no emoji glyphs)', () => {
    const w = mount(TranscodeNotice);
    expect(w.find('.transcode__icon').exists()).toBe(true);
    expect(w.html()).not.toMatch(/[🎬▶❚🔊🔇⤢⤓←↑↓]/u);
  });
});
