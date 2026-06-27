import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import AppearanceSettings from './AppearanceSettings.vue';
import Select from './ui/Select.vue';
import Slider from './ui/Slider.vue';
import Switch from './ui/Switch.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import { useToastStore } from '../stores/useToastStore';

const wrappers: VueWrapper[] = [];
function mountPanel(panel: 'appearance' | 'playback') {
  const w = mount(AppearanceSettings, { props: { panel } });
  wrappers.push(w);
  return w;
}
const selectByLabel = (w: VueWrapper, label: string) =>
  w.findAllComponents(Select).find((c) => c.props('label') === label)!;

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('AppearanceSettings — appearance panel', () => {
  it('selects a theme on click + reflects aria-checked', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    const themes = w.findAll('.aps__theme');
    expect(themes).toHaveLength(3);
    await themes[1].trigger('click'); // daylight
    expect(prefs.theme).toBe('daylight');
    expect(themes[1].attributes('aria-checked')).toBe('true');
    expect(themes[0].attributes('aria-checked')).toBe('false');
  });

  it('renders a consumer settings i18n override, falling back to English elsewhere', () => {
    const w = mount(AppearanceSettings, {
      props: { panel: 'appearance' },
      global: { provide: { phlixConfig: { messages: { settings: { theme: 'Tema', resetAll: 'Restablecer todo' } } } } },
    });
    wrappers.push(w);
    const titles = w.findAll('.aps__title').map((h) => h.text());
    expect(titles).toContain('Tema'); // overridden section title
    expect(w.text()).toContain('Restablecer todo'); // overridden reset button
    expect(titles).toContain('Display'); // un-overridden key still English
  });

  it('theme radiogroup has roving tabindex + arrow-key navigation', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    const themes = w.findAll('.aps__theme');
    // nocturne (index 0) is the single tab stop
    expect(themes[0].attributes('tabindex')).toBe('0');
    expect(themes[1].attributes('tabindex')).toBe('-1');
    await w.find('.aps__themes').trigger('keydown', { key: 'ArrowRight' });
    expect(prefs.theme).toBe('daylight');
    await w.find('.aps__themes').trigger('keydown', { key: 'End' });
    expect(prefs.theme).toBe('midnight');
  });

  it('ignores non-navigation keys in a radiogroup', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    await w.find('.aps__themes').trigger('keydown', { key: 'Enter' });
    await w.find('.aps__themes').trigger('keydown', { key: 'a' });
    expect(prefs.theme).toBe('nocturne'); // unchanged
  });

  it('wraps with ArrowLeft and jumps with Home', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    await w.find('.aps__themes').trigger('keydown', { key: 'ArrowLeft' }); // 0 -> wrap to last
    expect(prefs.theme).toBe('midnight');
    await w.find('.aps__themes').trigger('keydown', { key: 'Home' });
    expect(prefs.theme).toBe('nocturne');
  });

  it('keeps a valid roving tab stop when the accent is a custom hex (no preset match)', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    prefs.accent = '#123456'; // not in the preset list
    await nextTick();
    const accents = w.findAll('.aps__accent');
    expect(accents[0].attributes('tabindex')).toBe('0'); // falls back to index 0
    expect(accents.every((a) => a.attributes('aria-checked') === 'false')).toBe(true);
  });

  it('picks an accent preset and resets to the theme default (null)', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    const accents = w.findAll('.aps__accent');
    await accents[1].trigger('click'); // first hex preset
    expect(prefs.accent).toBe('#e5484d');
    await accents[0].trigger('click'); // "Amber" default = null
    expect(prefs.accent).toBeNull();
  });

  it('accent radiogroup supports arrow-key navigation', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    await w.find('.aps__accents').trigger('keydown', { key: 'ArrowRight' });
    expect(prefs.accent).toBe('#e5484d'); // null(0) -> 1
  });

  it('writes density / grid density / motion via their selects', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    selectByLabel(w, 'Density').vm.$emit('update:modelValue', 'compact');
    selectByLabel(w, 'Grid density').vm.$emit('update:modelValue', 'dense');
    selectByLabel(w, 'Motion').vm.$emit('update:modelValue', 'off');
    expect(prefs.density).toBe('compact');
    expect(prefs.gridDensity).toBe('dense');
    expect(prefs.reducedMotion).toBe('off');
  });

  it('writes card size via the slider', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    w.findComponent(Slider).vm.$emit('update:modelValue', 220);
    expect(prefs.cardSize).toBe(220);
  });

  it('toggles the atmosphere switch', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    expect(prefs.atmosphere).toBe(true);
    w.findComponent(Switch).vm.$emit('update:modelValue', false);
    expect(prefs.atmosphere).toBe(false);
  });

  it('toggles the TV mode switch', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    expect(prefs.tv).toBe(false);
    const tvSwitch = w.findAllComponents(Switch).find((s) => s.props('label') === 'TV mode')!;
    expect(tvSwitch).toBeTruthy();
    tvSwitch.vm.$emit('update:modelValue', true);
    expect(prefs.tv).toBe(true);
  });

  it('requires a second click to reset all preferences (and toasts)', async () => {
    const w = mountPanel('appearance');
    const prefs = usePreferencesStore();
    const toasts = useToastStore();
    const info = vi.spyOn(toasts, 'info');
    prefs.density = 'compact'; // make it non-default
    const status = () => w.find('.aps__foot [role="status"]');
    expect(status().exists()).toBe(true);
    expect(status().attributes('aria-live')).toBe('polite');
    expect(status().text()).toBe(''); // silent until armed
    const btn = w.find('.aps__foot button');
    await btn.trigger('click'); // arm
    expect(btn.text()).toContain('Click again');
    // R6.5a — the armed state is mirrored into the polite live region so a screen
    // reader announces it (a button's own accessible-name change isn't reliably re-read).
    expect(status().text()).toBe('Click again to confirm reset');
    expect(prefs.density).toBe('compact'); // not reset yet
    await btn.trigger('click'); // confirm
    expect(prefs.density).toBe('comfortable'); // back to default
    expect(status().text()).toBe(''); // disarmed again
    expect(info).toHaveBeenCalled();
  });
});

describe('AppearanceSettings — playback panel', () => {
  it('toggles autoplay', async () => {
    const w = mountPanel('playback');
    const prefs = usePreferencesStore();
    expect(prefs.autoplay).toBe(true);
    w.findComponent(Switch).vm.$emit('update:modelValue', false);
    expect(prefs.autoplay).toBe(false);
  });

  it('writes default volume via the slider', async () => {
    const w = mountPanel('playback');
    const prefs = usePreferencesStore();
    w.findComponent(Slider).vm.$emit('update:modelValue', 0.5);
    expect(prefs.defaultVolume).toBe(0.5);
  });

  it('writes default quality', async () => {
    const w = mountPanel('playback');
    const prefs = usePreferencesStore();
    selectByLabel(w, 'Default quality').vm.$emit('update:modelValue', '1080p');
    expect(prefs.defaultQuality).toBe('1080p');
  });

  it('maps the subtitle select Off (empty) <-> null and a language code', async () => {
    const w = mountPanel('playback');
    const prefs = usePreferencesStore();
    const sub = selectByLabel(w, 'Default subtitle language');
    sub.vm.$emit('update:modelValue', 'en');
    expect(prefs.defaultSubtitleLang).toBe('en');
    expect(prefs.subtitlePreferenceSet).toBe(true); // explicit user choice
    sub.vm.$emit('update:modelValue', '');
    expect(prefs.defaultSubtitleLang).toBeNull();
    expect(prefs.subtitlePreferenceSet).toBe(true); // choosing "None" is still a choice
  });

  it('updates caption style as a new object (size/color/background/edge)', async () => {
    const w = mountPanel('playback');
    const prefs = usePreferencesStore();
    const before = prefs.captionStyle;
    selectByLabel(w, 'Caption size').vm.$emit('update:modelValue', 'lg');
    selectByLabel(w, 'Caption color').vm.$emit('update:modelValue', '#ffd60a');
    selectByLabel(w, 'Caption background').vm.$emit('update:modelValue', 'solid');
    selectByLabel(w, 'Caption edge').vm.$emit('update:modelValue', 'outline');
    expect(prefs.captionStyle.size).toBe('lg');
    expect(prefs.captionStyle.textColor).toBe('#ffd60a');
    expect(prefs.captionStyle.background).toBe('solid');
    expect(prefs.captionStyle.edge).toBe('outline');
    expect(prefs.captionStyle).not.toBe(before); // immutable update (new object)
  });

  it('renders no emoji glyphs (icon-only)', () => {
    const w = mountPanel('playback');
    expect(/[🙈👁🎬▶❚🔊🔇🎭]/u.test(w.html())).toBe(false);
  });
});
