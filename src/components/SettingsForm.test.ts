import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import SettingsForm from './SettingsForm.vue';
import Switch from './ui/Switch.vue';
import Skeleton from './ui/Skeleton.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';

const SETTINGS: Record<string, unknown> = {
  'hwaccel.enabled': false,
  'hwaccel.prefer_hardware': false,
  'hwaccel.probe_timeout': 5,
  'tmdb.api_key': 'KEY',
  'marker_detection.similarity_threshold': 0.8,
  'marker_detection.intro_max_duration': 120,
  'subtitles.enabled': false,
  'subtitles.default_language': 'en',
  'subtitles.burn_in_by_default': false,
  'discovery.discovery_port': 1900,
  'trickplay.enabled': true,
  'trickplay.interval_seconds': 10,
  'newsletter.enabled': false,
  'newsletter.send_hour': 8,
  'port-forward.port_forwarding.upnp_enabled': true,
  'trakt.client_id': 'CID',
  'trakt.client_secret': 'SEC',
  'trakt.redirect_uri': 'https://x',
};

const wrappers: VueWrapper[] = [];
function setup(getImpl?: (spy: ReturnType<typeof vi.spyOn>) => void) {
  const auth = useAuthStore();
  const toasts = useToastStore();
  const getSpy = vi.spyOn(auth.client, 'get');
  const putSpy = vi.spyOn(auth.client, 'put').mockResolvedValue({} as never);
  if (getImpl) getImpl(getSpy);
  else getSpy.mockResolvedValue(structuredClone(SETTINGS) as never);
  const tSuccess = vi.spyOn(toasts, 'success');
  const tError = vi.spyOn(toasts, 'error');
  const w = mount(SettingsForm);
  wrappers.push(w);
  return { w, getSpy, putSpy, tSuccess, tError };
}

const group = (w: VueWrapper, title: string) =>
  w.findAll('.setform__group').find((s) => s.find('.setform__title').text() === title)!;

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('SettingsForm — load + render', () => {
  it('shows loading skeletons until the GET resolves', () => {
    const { w } = setup((s) => s.mockReturnValue(new Promise(() => {}) as never));
    expect(w.find('.setform__loading').exists()).toBe(true);
    expect(w.findComponent(Skeleton).exists()).toBe(true);
  });

  it('renders all nine groups with their fields (no empty/unsaveable groups)', async () => {
    const { w } = setup();
    await flushPromises();
    expect(w.findAll('.setform__group')).toHaveLength(9);
    // representative field from each of the four groups whose key prefix != group name
    expect(w.text()).toContain('Hardware acceleration'); // transcoding ← hwaccel.*
    expect(w.text()).toContain('TMDB API Key'); // metadata ← tmdb.*
    expect(w.text()).toContain('Intro similarity threshold'); // markers ← marker_detection.*
    expect(w.text()).toContain('Trakt client ID'); // scrobblers ← trakt.*
    // every group has at least one control row
    for (const g of w.findAll('.setform__group')) {
      expect(g.findAll('.setform__row').length).toBeGreaterThan(0);
    }
  });

  it('loads + clones the baseline even when structuredClone is missing (older Tizen webviews)', async () => {
    const original = globalThis.structuredClone;
    // Build the payload BEFORE removing structuredClone (the setup harness uses it).
    const payload = original(SETTINGS);
    (globalThis as { structuredClone?: unknown }).structuredClone = undefined;
    try {
      const { w } = setup((s) => s.mockResolvedValue(payload as never));
      await flushPromises();
      // Renders normally — the baseline clone fell back to a JSON round-trip.
      expect(w.findAll('.setform__group')).toHaveLength(9);
      // Dirty detection works (baseline === settings on load → nothing dirty).
      expect(w.findAll('button').some((b) => b.text() === 'Save' && !b.attributes('disabled'))).toBe(false);
    } finally {
      globalThis.structuredClone = original;
    }
  });

  it('surfaces a load error with a retry that re-fetches', async () => {
    const { w, getSpy } = setup((s) => s.mockRejectedValueOnce(new Error('boom')));
    await flushPromises();
    expect(w.text()).toContain("Couldn't load settings");
    getSpy.mockResolvedValueOnce(structuredClone(SETTINGS) as never);
    await w.find('.phlix-empty__actions button').trigger('click');
    await flushPromises();
    expect(w.find('.setform__group').exists()).toBe(true);
  });
});

describe('SettingsForm — per-section dirty + save', () => {
  it('marks only the edited group dirty and saves just that group on click', async () => {
    const { w, putSpy, tSuccess } = setup();
    await flushPromises();
    expect(group(w, 'Subtitles').find('.setform__dirty').exists()).toBe(false);

    // toggle "Enable subtitles" (first Switch in the Subtitles group)
    group(w, 'Subtitles').findComponent(Switch).vm.$emit('update:modelValue', true);
    await nextTick();
    expect(group(w, 'Subtitles').find('.setform__dirty').exists()).toBe(true);
    expect(group(w, 'Transcoding').find('.setform__dirty').exists()).toBe(false); // isolated

    await group(w, 'Subtitles').find('.setform__actions button').trigger('click');
    await flushPromises();
    expect(putSpy).toHaveBeenCalledTimes(1);
    const [, patch] = putSpy.mock.calls[0] as [string, Record<string, unknown>];
    expect(patch).toHaveProperty('subtitles.enabled', true);
    expect(patch).toHaveProperty('subtitles.default_language'); // whole group sent
    expect(patch).not.toHaveProperty('hwaccel.enabled'); // not other groups
    expect(tSuccess).toHaveBeenCalled();
    await nextTick();
    expect(group(w, 'Subtitles').find('.setform__dirty').exists()).toBe(false); // cleared
  });

  it('disables a clean group Save button', async () => {
    const { w } = setup();
    await flushPromises();
    expect(group(w, 'Metadata').find('.setform__actions button').attributes('disabled')).toBeDefined();
  });

  it('persists a numeric field as a number', async () => {
    const { w, putSpy } = setup();
    await flushPromises();
    await group(w, 'Discovery').find('input').setValue('8080');
    await group(w, 'Discovery').find('.setform__actions button').trigger('click');
    await flushPromises();
    const [, patch] = putSpy.mock.calls.at(-1) as [string, Record<string, unknown>];
    expect(patch['discovery.discovery_port']).toBe(8080);
    expect(typeof patch['discovery.discovery_port']).toBe('number');
  });

  it('clearing a numeric field stores 0 (never NaN)', async () => {
    const { w, putSpy } = setup();
    await flushPromises();
    await group(w, 'Discovery').find('input').setValue('');
    await group(w, 'Discovery').find('.setform__actions button').trigger('click');
    await flushPromises();
    const [, patch] = putSpy.mock.calls.at(-1) as [string, Record<string, unknown>];
    expect(patch['discovery.discovery_port']).toBe(0);
  });

  it('toasts an error and keeps the group dirty when the save fails', async () => {
    const { w, putSpy, tError } = setup();
    await flushPromises();
    putSpy.mockRejectedValueOnce(new Error('nope'));
    group(w, 'Subtitles').findComponent(Switch).vm.$emit('update:modelValue', true);
    await nextTick();
    await group(w, 'Subtitles').find('.setform__actions button').trigger('click');
    await flushPromises();
    expect(tError).toHaveBeenCalled();
    expect(group(w, 'Subtitles').find('.setform__dirty').exists()).toBe(true); // still dirty
  });

  it('honors the `groups` prop to limit which sections render', async () => {
    const auth = useAuthStore();
    vi.spyOn(auth.client, 'get').mockResolvedValue(structuredClone(SETTINGS) as never);
    const w = mount(SettingsForm, { props: { groups: ['subtitles'] } });
    wrappers.push(w);
    await flushPromises();
    expect(w.findAll('.setform__group')).toHaveLength(1);
    expect(w.find('.setform__title').text()).toBe('Subtitles');
  });
});
