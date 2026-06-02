import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import CaptionsMenu from './CaptionsMenu.vue';
import Select from '../ui/Select.vue';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { usePreferencesStore } from '../../stores/usePreferencesStore';
import type { TextTrackInfo } from './captions';

function track(language: string, label: string, index = 0): TextTrackInfo {
  return { index, language, label, kind: 'subtitles' };
}

const mounted: ReturnType<typeof mount>[] = [];
function mountMenu(props: Partial<{ tracks: TextTrackInfo[]; audioTracks: TextTrackInfo[]; activeAudio: number; open: boolean }> = {}) {
  const w = mount(CaptionsMenu, {
    props: { tracks: [], audioTracks: [], activeAudio: -1, open: false, ...props },
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
  });

  it('selecting Off clears the store + default', async () => {
    usePlayerStore().setSubtitle('en');
    usePreferencesStore().defaultSubtitleLang = 'en';
    const w = mountMenu({ tracks: [EN], open: true });
    await nextTick();
    const off = w.get('[aria-label="Subtitle track"]').findAll('[role="radio"]')[0];
    await off.trigger('click');
    expect(usePlayerStore().subtitleLang).toBeNull();
    expect(usePreferencesStore().defaultSubtitleLang).toBeNull();
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
  it('hides the audio group when there is 0 or 1 audio track', async () => {
    const w = mountMenu({ tracks: [EN], audioTracks: [track('en', 'English', 0)], open: true });
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
