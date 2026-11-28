/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import CaptionsMenu from './CaptionsMenu.vue';
import Select from '../ui/Select.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';
import { listSubtitleTracks } from './captions';
import type { TextTrackInfo } from './captions';
import { DE_MESSAGES } from '../../i18n/locales/de';

function track(language: string, label: string, index = 0): TextTrackInfo {
  return { index, language, label, kind: 'subtitles' };
}

const mounted: ReturnType<typeof mount>[] = [];
function mountMenu(
  props: Partial<{ tracks: TextTrackInfo[]; audioTracks: TextTrackInfo[]; activeAudio: number; open: boolean }> = {},
  config: unknown = null,
) {
  const w = mount(CaptionsMenu, {
    props: { tracks: [], audioTracks: [], activeAudio: -1, open: false, ...props },
    global: { provide: { phlixConfig: config } },
    attachTo: document.body,
  });
  mounted.push(w);
  return w;
}

const EN = track('en', 'English', 0);
const ES = track('es', 'Spanish', 1);

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (mounted.length) mounted.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('CaptionsMenu — trigger', () => {
  it('renders no panel while closed and toggles open on click', async () => {
    const w = mountMenu({ tracks: [EN] });
    expect(w.find('[role="dialog"]').exists()).toBe(false);
    await w.find('.capmenu__btn').trigger('click');
    expect(w.emitted('update:open')?.[0]).toEqual([true]);
  });

  it("reflects captions on/off in the button's accessible name", async () => {
    const w = mountMenu({ tracks: [EN] });
    expect(w.find('.capmenu__btn').attributes('aria-label')).toBe('Captions (off)');
    usePlayerStore().setSubtitle('en'); // now a track matches
    await nextTick();
    expect(w.find('.capmenu__btn').attributes('aria-label')).toBe('Captions (on)');
  });
});

describe('CaptionsMenu — track picker', () => {
  it('lists Off + each subtitle track, marking the active one', async () => {
    usePlayerStore().setSubtitle('es');
    const w = mountMenu({ tracks: [EN, ES], open: true });
    await nextTick();
    const radios = w.get('[aria-label="Subtitle track"]').findAll('[role="radio"]');
    expect(radios.map((r) => r.text())).toEqual(['Off', 'English', 'Spanish']);
    expect(radios[0].attributes('aria-checked')).toBe('false'); // Off not selected
    expect(radios[2].attributes('aria-checked')).toBe('true'); // Spanish selected
  });

  it('selecting a track sets the store + persists the default language', async () => {
    const w = mountMenu({ tracks: [EN, ES], open: true });
    await nextTick();
    const radios = w.get('[aria-label="Subtitle track"]').findAll('[role="radio"]');
    await radios[1].trigger('click'); // English
    expect(usePlayerStore().subtitleLang).toBe('en');
    expect(usePreferencesStore().defaultSubtitleLang).toBe('en');
    expect(usePreferencesStore().subtitlePreferenceSet).toBe(true); // user made a choice
  });

  it('selecting Off clears the store + default and marks the preference as set', async () => {
    usePlayerStore().setSubtitle('en');
    usePreferencesStore().defaultSubtitleLang = 'en';
    const w = mountMenu({ tracks: [EN], open: true });
    await nextTick();
    const off = w.get('[aria-label="Subtitle track"]').findAll('[role="radio"]')[0];
    await off.trigger('click');
    expect(usePlayerStore().subtitleLang).toBeNull();
    expect(usePreferencesStore().defaultSubtitleLang).toBeNull();
    // Explicit Off is a real choice — flag set so the player won't re-enable
    // captions via a server default on a later poll.
    expect(usePreferencesStore().subtitlePreferenceSet).toBe(true);
  });

  it('marks "Off" as selected when subtitleLang resolves to no track', async () => {
    usePlayerStore().setSubtitle('de'); // a language with no matching track
    const w = mountMenu({ tracks: [EN, ES], open: true });
    await nextTick();
    const radios = w.get('[aria-label="Subtitle track"]').findAll('[role="radio"]');
    expect(radios[0].attributes('aria-checked')).toBe('true'); // Off, since 'de' is unavailable
    expect(radios[0].attributes('tabindex')).toBe('0'); // and is the group's tab stop
  });

  it('uses roving tabindex + arrow keys to move and select within the radiogroup', async () => {
    const w = mountMenu({ tracks: [EN, ES], open: true });
    await nextTick();
    const group = w.get('[aria-label="Subtitle track"]');
    const radios = group.findAll('[role="radio"]');
    const store = usePlayerStore();
    // captions off → "Off" is the single tab stop
    expect(radios.map((r) => r.attributes('tabindex'))).toEqual(['0', '-1', '-1']);
    await group.trigger('keydown', { key: 'ArrowDown' }); // Off → English (selection follows focus)
    expect(store.subtitleLang).toBe('en');
    await nextTick();
    expect(group.findAll('[role="radio"]').map((r) => r.attributes('tabindex'))).toEqual(['-1', '0', '-1']);
    await group.trigger('keydown', { key: 'End' }); // → Spanish (last)
    expect(store.subtitleLang).toBe('es');
    await group.trigger('keydown', { key: 'ArrowDown' }); // last → wraps to Off
    expect(store.subtitleLang).toBeNull();
    await group.trigger('keydown', { key: 'ArrowUp' }); // Off → wraps to Spanish (last)
    expect(store.subtitleLang).toBe('es');
    await group.trigger('keydown', { key: 'Home' }); // → Off
    expect(store.subtitleLang).toBeNull();
    await group.trigger('keydown', { key: 'x' }); // non-nav key: no change
    expect(store.subtitleLang).toBeNull();
  });

  it('navigates the audio radiogroup with arrow keys (selection follows focus)', async () => {
    const audio = [track('en', 'English', 0), track('fr', 'Commentary', 1)];
    const w = mountMenu({ tracks: [EN], audioTracks: audio, activeAudio: 0, open: true });
    await nextTick();
    const group = w.get('[aria-label="Audio track"]');
    await group.trigger('keydown', { key: 'ArrowDown' }); // 0 → 1
    expect(w.emitted('select-audio')?.at(-1)).toEqual([1]);
  });
});

describe('CaptionsMenu — audio picker', () => {
  it('renders the single-entry audio group the Player synthesizes (L2 law)', async () => {
    // The gate counts entries, not user options: the Player hands down exactly
    // ONE entry for a muxed-audio title (its synthesized 'Original' — always
    // the active one) or a single real native track. Multi-entry behavior is
    // pinned byte-for-byte by the >1 test below.
    const w = mountMenu({ tracks: [EN], audioTracks: [track('', 'Original', 0)], activeAudio: 0, open: true });
    await nextTick();
    const radios = w.get('[aria-label="Audio track"]').findAll('[role="radio"]');
    expect(radios).toHaveLength(1);
    expect(radios[0].text()).toBe('Original');
    expect(radios[0].attributes('aria-checked')).toBe('true');
    // The renderer stays dumb: it still emits the pick — the Player owns the
    // highlighted no-op law for synthesized entries.
    await radios[0].trigger('click');
    expect(w.emitted('select-audio')?.[0]).toEqual([0]);
  });

  it('keeps the section hidden when there are no entries (no audio, or presence unknown)', async () => {
    const w = mountMenu({ tracks: [EN], audioTracks: [], open: true });
    await nextTick();
    expect(w.find('[aria-label="Audio track"]').exists()).toBe(false);
  });

  it('shows the audio group when >1 and emits select-audio with the index', async () => {
    const audio = [track('en', 'English', 0), track('fr', "Director's commentary", 1)];
    const w = mountMenu({ tracks: [EN], audioTracks: audio, activeAudio: 0, open: true });
    await nextTick();
    const radios = w.get('[aria-label="Audio track"]').findAll('[role="radio"]');
    expect(radios).toHaveLength(2);
    expect(radios[0].attributes('aria-checked')).toBe('true');
    await radios[1].trigger('click');
    expect(w.emitted('select-audio')?.[0]).toEqual([1]);
  });
});

describe('CaptionsMenu — style controls', () => {
  it('writes size/color/background/edge to prefs.captionStyle', async () => {
    const w = mountMenu({ tracks: [EN], open: true });
    await nextTick();
    const prefs = usePreferencesStore();
    const selects = w.findAllComponents(Select); // size, color, background, edge (in order)
    expect(selects).toHaveLength(4);
    selects[0].vm.$emit('update:modelValue', 'xl');
    selects[1].vm.$emit('update:modelValue', '#ffd400');
    selects[2].vm.$emit('update:modelValue', 'semi');
    selects[3].vm.$emit('update:modelValue', 'outline');
    await nextTick();
    expect(prefs.captionStyle).toEqual({ size: 'xl', textColor: '#ffd400', background: 'semi', edge: 'outline' });
  });

  it('binds the current style as the Select model values', async () => {
    const prefs = usePreferencesStore();
    prefs.captionStyle = { size: 'lg', textColor: '#66e0ff', background: 'solid', edge: 'raised' };
    const w = mountMenu({ tracks: [EN], open: true });
    await nextTick();
    const selects = w.findAllComponents(Select);
    expect(selects[0].props('modelValue')).toBe('lg');
    expect(selects[1].props('modelValue')).toBe('#66e0ff');
  });
});

describe('CaptionsMenu — dismissal', () => {
  it('closes on Escape (focus trap) and returns update:open false', async () => {
    const w = mountMenu({ tracks: [EN], open: true });
    await nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    await nextTick();
    expect(w.emitted('update:open')?.at(-1)).toEqual([false]);
  });

  it('closes on an outside pointerdown', async () => {
    const w = mountMenu({ tracks: [EN], open: true });
    await nextTick();
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await nextTick();
    expect(w.emitted('update:open')?.at(-1)).toEqual([false]);
  });

  it('a pointerdown INSIDE the menu does not close it', async () => {
    const w = mountMenu({ tracks: [EN], open: true });
    await nextTick();
    (w.find('.capmenu__panel').element as HTMLElement).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await nextTick();
    expect(w.emitted('update:open')).toBeUndefined();
  });
});

// ---- delay steppers (S-ui-once-16 / phlix-ui-once-020) -----------------------

describe('CaptionsMenu — delay steppers (S-ui-once-16)', () => {
  function buttons(w: ReturnType<typeof mountMenu>, group: 'Subtitle delay' | 'Audio delay') {
    const g = w.get(`[role="group"][aria-label="${group}"]`);
    return {
      decrease: g.get('[aria-label="Decrease delay"]'),
      increase: g.get('[aria-label="Increase delay"]'),
      reset: g.get('[aria-label="Reset delay"]'),
      value: g.get('.capmenu__stepvalue'),
    };
  }

  it('renders both steppers at 0.0s with reset disabled at zero', () => {
    const w = mountMenu({ tracks: [EN], open: true });
    const sub = buttons(w, 'Subtitle delay');
    const aud = buttons(w, 'Audio delay');
    expect(sub.value.text()).toBe('0.0s');
    expect(aud.value.text()).toBe('0.0s');
    expect(sub.reset.attributes('disabled')).toBeDefined();
    expect(aud.reset.attributes('disabled')).toBeDefined();
  });

  it('±0.1 steps move the store AND persist the preference channel (subtitle)', async () => {
    const w = mountMenu({ tracks: [EN], open: true });
    const player = usePlayerStore();
    const prefs = usePreferencesStore();
    const { increase, decrease, value } = buttons(w, 'Subtitle delay');
    await increase.trigger('click');
    await increase.trigger('click');
    await increase.trigger('click');
    expect(value.text()).toBe('+0.3s'); // toFixed(1) — float drift 0.30000000000000004 absorbed
    expect(player.subtitleOffset).toBe(0.3);
    expect(prefs.subtitleOffsetSeconds).toBe(0.3);
    await decrease.trigger('click');
    expect(value.text()).toBe('+0.2s');
    expect(player.subtitleOffset).toBe(0.2);
    expect(prefs.subtitleOffsetSeconds).toBe(0.2);
  });

  it('the audio stepper writes the audio channels (independent of subtitle)', async () => {
    const w = mountMenu({ tracks: [EN], open: true });
    const player = usePlayerStore();
    const prefs = usePreferencesStore();
    const { increase, value } = buttons(w, 'Audio delay');
    await increase.trigger('click');
    expect(value.text()).toBe('+0.1s');
    expect(player.audioOffset).toBe(0.1);
    expect(prefs.audioOffsetSeconds).toBe(0.1);
    expect(player.subtitleOffset).toBe(0); // channels stay independent
  });

  it('clamps to ±10 s at both the store and the stepper edge', async () => {
    const player = usePlayerStore();
    player.setSubtitleOffset(50); // out-of-band write clamps, never lands raw
    expect(player.subtitleOffset).toBe(10);
    const w = mountMenu({ tracks: [EN], open: true });
    const sub = buttons(w, 'Subtitle delay');
    expect(sub.value.text()).toBe('+10.0s');
    await sub.increase.trigger('click'); // at the ceiling the step is inert
    expect(player.subtitleOffset).toBe(10);
    expect(usePreferencesStore().subtitleOffsetSeconds).toBe(10);
    player.setAudioOffset(-50);
    expect(player.audioOffset).toBe(-10);
    await nextTick(); // out-of-band store write — let the template re-render
    expect(buttons(w, 'Audio delay').value.text()).toBe('-10.0s');
  });

  it('refuses non-finite offsets and leaves store + prefs at the last good value', () => {
    const player = usePlayerStore();
    player.setSubtitleOffset(0.3);
    player.setSubtitleOffset(Number.NaN);
    expect(player.subtitleOffset).toBe(0.3);
    player.setSubtitleOffset(Infinity);
    expect(player.subtitleOffset).toBe(0.3);
    expect(usePreferencesStore().subtitleOffsetSeconds).toBe(0.3); // refused writes never persist
  });

  it('reset returns to 0.0s and re-disables itself', async () => {
    const w = mountMenu({ tracks: [EN], open: true });
    const player = usePlayerStore();
    player.setSubtitleOffset(0.5);
    await nextTick();
    const { reset, value } = buttons(w, 'Subtitle delay');
    expect(reset.attributes('disabled')).toBeUndefined();
    await reset.trigger('click');
    expect(value.text()).toBe('0.0s');
    expect(player.subtitleOffset).toBe(0);
    expect(usePreferencesStore().subtitleOffsetSeconds).toBe(0);
  });

  it('the stepper value persists across remount via the preferences store', async () => {
    const w = mountMenu({ tracks: [EN], open: true });
    const { increase } = buttons(w, 'Subtitle delay');
    await increase.trigger('click');
    await increase.trigger('click');
    await increase.trigger('click'); // 0.3 s
    window.dispatchEvent(new Event('pagehide')); // flush the debounced persist
    w.unmount();

    setActivePinia(createPinia()); // fresh stores — only localStorage survives
    const w2 = mountMenu({ tracks: [EN], open: true });
    expect(buttons(w2, 'Subtitle delay').value.text()).toBe('+0.3s'); // hydrated display
    expect(usePlayerStore().subtitleOffset).toBe(0.3); // session mirror re-seeded from prefs
  });
});

// ---- localized render (S-ui-player-07 / phlix-ui-player-018) ------------------

describe('CaptionsMenu — option + track labels localize at render (S-ui-player-07)', () => {
  it('caption style Selects render overridden option labels', async () => {
    const w = mountMenu(
      { tracks: [EN], open: true },
      { messages: { player: { captionColorWhite: 'Weiß', captionEdgeOutline: 'Kontur' } } },
    );
    await nextTick();
    const selects = w.findAllComponents(Select);
    expect(selects[1].props('options').map((o) => (typeof o === 'object' ? o.label : String(o)))).toEqual(['Weiß', 'Yellow', 'Cyan', 'Green']);
    expect(selects[3].props('options').map((o) => (typeof o === 'object' ? o.label : String(o)))).toContain('Kontur');
  });

  it('language-derived track labels resolve in the mounted message locale', async () => {
    const video = {
      textTracks: [
        { kind: 'subtitles', label: '', language: 'de', mode: 'disabled', activeCues: null, addEventListener() {}, removeEventListener() {} },
      ],
    } as unknown as HTMLVideoElement;
    const w = mountMenu({ tracks: listSubtitleTracks(video), open: true }, { locale: 'de', messages: DE_MESSAGES });
    await nextTick();
    const labels = w.findAll('.capmenu__optlabel').map((n) => n.text());
    expect(labels).toContain('Deutsch');
    expect(labels).not.toContain('German');
  });

  it('generated Track/Audio fallbacks resolve through the catalog', async () => {
    const w = mountMenu(
      {
        tracks: [{ index: 0, language: '', label: 'Track 1', kind: 'subtitles', labelKind: 'generated' } as TextTrackInfo],
        audioTracks: [{ index: 0, language: '', label: 'Audio 1', kind: 'audio', labelKind: 'generated' } as TextTrackInfo],
        open: true,
      },
      { locale: 'de', messages: DE_MESSAGES },
    );
    await nextTick();
    const labels = w.findAll('.capmenu__optlabel').map((n) => n.text());
    expect(labels).toContain('Spur 1');
    expect(labels).toContain('Tonspur 1');
  });
});

// ---- duplicate same-language tracks (S-ui-player-16 / phlix-ui-player-017) ----

describe('CaptionsMenu — duplicate same-language tracks are reachable (S-ui-player-16)', () => {
  /** Minimal <video> stand-in exposing textTracks for listSubtitleTracks. */
  function videoWithTracks(count: number) {
    return {
      textTracks: Array.from({ length: count }, () => ({
        kind: 'subtitles',
        label: '',
        language: 'eng',
        mode: 'disabled',
        activeCues: null,
        addEventListener() {},
        removeEventListener() {},
      })),
    } as unknown as HTMLVideoElement;
  }

  it('shows BOTH "eng" tracks with distinct labels (the second used to vanish)', async () => {
    const w = mountMenu({ tracks: listSubtitleTracks(videoWithTracks(2)), open: true });
    await nextTick();
    const radios = w.get('[aria-label="Subtitle track"]').findAll('[role="radio"]');
    expect(radios.map((r) => r.text())).toEqual(['Off', 'English', 'Track 2']);
  });

  it('clicking the duplicate stores its uid and checks exactly that radio', async () => {
    const w = mountMenu({ tracks: listSubtitleTracks(videoWithTracks(2)), open: true });
    await nextTick();
    const group = () => w.get('[aria-label="Subtitle track"]').findAll('[role="radio"]');
    await group()[2].trigger('click');
    expect(usePlayerStore().subtitleLang).toBe('eng#2');
    expect(usePreferencesStore().defaultSubtitleLang).toBe('eng#2');
    await nextTick();
    expect(group().map((r) => r.attributes('aria-checked'))).toEqual(['false', 'false', 'true']);
    expect(w.find('.capmenu__btn').attributes('aria-label')).toBe('Captions (on)');
    // first track unselected despite sharing the language
    expect(group()[1].find('.capmenu__check svg').exists()).toBe(false);
  });

  it('arrow navigation reaches the duplicate', async () => {
    const w = mountMenu({ tracks: listSubtitleTracks(videoWithTracks(2)), open: true });
    await nextTick();
    await w.get('[aria-label="Subtitle track"]').trigger('keydown', { key: 'End' });
    expect(usePlayerStore().subtitleLang).toBe('eng#2');
  });

  it('the two uid-keyed radios carry distinct tab stops when the duplicate is active', async () => {
    usePlayerStore().setSubtitle('eng#2');
    const w = mountMenu({ tracks: listSubtitleTracks(videoWithTracks(2)), open: true });
    await nextTick();
    const radios = w.get('[aria-label="Subtitle track"]').findAll('[role="radio"]');
    expect(radios.map((r) => r.attributes('tabindex'))).toEqual(['-1', '-1', '0']);
  });
});
