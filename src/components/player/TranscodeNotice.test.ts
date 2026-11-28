/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TranscodeNotice from './TranscodeNotice.vue';
import { DEFAULT_MESSAGES } from '../../i18n/messages';

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

  // phlix-ui-player-013: the failure notice used to offer Go back ONLY — once
  // the poll's transient tolerance was exhausted the viewer sat on a dead end
  // even though the job was often perfectly retryable. Retry rides the
  // EXISTING catalog key common.retry: zero new strings minted.
  it('offers a Retry button that emits retry (phlix-ui-player-013)', async () => {
    const w = mount(TranscodeNotice, { props: { title: 'X' } });
    const retry = w.find('.transcode__retry');
    expect(retry.exists()).toBe(true);
    // The label is the existing catalog string — NOT a new key.
    expect(retry.text()).toBe(DEFAULT_MESSAGES.common.retry);
    await retry.trigger('click');
    expect(w.emitted('retry')).toHaveLength(1);
    // Go back stays: Retry adds an action, it never removes the escape path.
    expect(w.find('.transcode__back').exists()).toBe(true);
    // The two buttons are independent: one click never fires both actions.
    expect(w.emitted('back')).toBeUndefined();
  });

  it('renders exactly the two announced actions as buttons', () => {
    const w = mount(TranscodeNotice);
    expect(w.findAll('button')).toHaveLength(2);
  });

  it('uses the alert icon (no emoji glyphs)', () => {
    const w = mount(TranscodeNotice);
    expect(w.find('.transcode__icon').exists()).toBe(true);
    expect(w.html()).not.toMatch(/[🎬▶❚🔊🔇⤢⤓←↑↓]/u);
  });
});
