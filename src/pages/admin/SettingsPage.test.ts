/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SettingsPage from './SettingsPage.vue';
import Button from '../../components/ui/Button.vue';
import Switch from '../../components/ui/Switch.vue';
import Select from '../../components/ui/Select.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import { ApiError } from '../../api/client';
import type { ApiClient } from '../../api/client';

const SETTINGS = {
  'auth.signup_mode': 'approval',
  'hwaccel.enabled': true,
  'hwaccel.prefer_hardware': false,
  'hwaccel.probe_timeout': 30,
  'tmdb.api_key': 'super-secret-key',
  'marker_detection.similarity_threshold': 0.8,
  'marker_detection.intro_max_duration': 90,
  'subtitles.enabled': true,
  'subtitles.default_language': 'en',
  'subtitles.burn_in_by_default': false,
  'discovery.discovery_port': 9000,
  'trickplay.enabled': true,
  'trickplay.interval_seconds': 10,
  'newsletter.enabled': false,
  'newsletter.send_hour': 8,
  'port-forward.port_forwarding.upnp_enabled': true,
  'trakt.client_id': 'cid',
  'trakt.client_secret': 'csecret',
  'trakt.redirect_uri': 'https://x/cb',
};

const TYPES = {
  'auth.signup_mode': 'string',
  'hwaccel.enabled': 'bool',
  'hwaccel.prefer_hardware': 'bool',
  'hwaccel.probe_timeout': 'int',
  'tmdb.api_key': 'string',
  'marker_detection.similarity_threshold': 'float',
  'marker_detection.intro_max_duration': 'int',
  'subtitles.enabled': 'bool',
  'subtitles.default_language': 'string',
  'subtitles.burn_in_by_default': 'bool',
  'discovery.discovery_port': 'int',
  'trickplay.enabled': 'bool',
  'trickplay.interval_seconds': 'int',
  'newsletter.enabled': 'bool',
  'newsletter.send_hour': 'int',
  'port-forward.port_forwarding.upnp_enabled': 'bool',
  'trakt.client_id': 'string',
  'trakt.client_secret': 'string',
  'trakt.redirect_uri': 'string',
};

function makeClient(
  over: {
    overridden?: string[];
    putImpl?: ReturnType<typeof vi.fn>;
    /** Extra settings keys (e.g. metadata.genres_mode) merged into GET. */
    extraSettings?: Record<string, unknown>;
    /** Extra types merged into GET. */
    extraTypes?: Record<string, string>;
  } = {},
) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/settings') {
      return {
        data: {
          settings: { ...SETTINGS, ...(over.extraSettings ?? {}) },
          overridden: over.overridden ?? ['tmdb.api_key'],
          types: { ...TYPES, ...(over.extraTypes ?? {}) },
        },
      };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const put =
    over.putImpl ??
    vi.fn(async () => ({ data: { settings: { ...SETTINGS }, overridden: over.overridden ?? [] } }));
  const client = { get, post: vi.fn(), put, patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { client, get, put };
}

/** GET shape carrying the bespoke genres-mode metadata key + its type. */
const METADATA_OVER = {
  extraSettings: {
    'metadata.genres_mode': 'first',
  },
  extraTypes: { 'metadata.genres_mode': 'string' },
};

function mountPage(client: ApiClient): VueWrapper {
  return mount(SettingsPage, { props: { client }, attachTo: document.body });
}

/** Switch to a tab by its visible label. */
async function selectTab(w: VueWrapper, label: string): Promise<void> {
  const tab = w.findAll('[role="tab"]').find((t) => t.text().trim() === label)!;
  await tab.trigger('click');
  await flushPromises();
}

function saveBtn(w: VueWrapper) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === 'Save settings')!;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Admin SettingsPage — load + layout', () => {
  it('shows a skeleton while loading, then the tabs', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-settings__skel').exists()).toBe(true);
    resolve({ data: { settings: { ...SETTINGS }, overridden: [], types: TYPES } });
    await flushPromises();
    expect(w.findAll('[role="tab"]').length).toBe(10);
    w.unmount();
  });

  it('issues GET /api/v1/admin/settings on mount', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/settings');
    w.unmount();
  });

  it('renders all 10 group tabs', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const labels = w.findAll('[role="tab"]').map((t) => t.text().trim());
    expect(labels).toEqual([
      'Access', 'Transcoding', 'Metadata', 'Markers', 'Subtitles', 'Discovery',
      'Trickplay', 'Newsletter', 'Port Forward', 'Scrobblers',
    ]);
    w.unmount();
  });

  it('renders the Transcoding fields with Save disabled', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    expect(w.text()).toContain('Enabled');
    expect(w.text()).toContain('Prefer Hardware');
    expect(w.text()).toContain('Probe Timeout');
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('shows an in-body EmptyState error (+ toast) when loading fails', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    // R5.3c: the load failure now renders a canonical EmptyState (error + Retry)
    // instead of the broken empty tabs/form, and still fires a toast.
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain('boom');
    expect(w.findAll('[role="tab"]').length).toBe(0);
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
    w.unmount();
  });

  it('retries the load from the error state', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce({ data: { settings: { ...SETTINGS }, overridden: [], types: TYPES } });
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledTimes(2);
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.findAll('[role="tab"]').length).toBe(10);
    w.unmount();
  });

  it('renders the custom badge for an overridden key', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata'); // tmdb.api_key is overridden
    expect(w.text()).toContain('custom');
    w.unmount();
  });
});

describe('Admin SettingsPage — number field (int) edit + save', () => {
  it('renders min/max attributes and saves a coerced int', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Discovery');
    const input = w.find<HTMLInputElement>('#field-discovery\\.discovery_port');
    expect(input.attributes('min')).toBe('1');
    expect(input.attributes('max')).toBe('65535');
    await input.setValue('8080');
    expect(saveBtn(w).attributes('disabled')).toBeUndefined();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'discovery.discovery_port': 8080 },
    });
    // The Save button must fire exactly once (it is type="button" + @click, NOT a
    // submit button inside the form — that would double-fire the PUT).
    expect(put).toHaveBeenCalledTimes(1);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Settings saved.')).toBe(true);
    w.unmount();
  });

  it('coerces a float field with parseFloat', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Markers');
    const input = w.find<HTMLInputElement>('#field-marker_detection\\.similarity_threshold');
    expect(input.attributes('min')).toBe('0');
    expect(input.attributes('max')).toBe('1');
    await input.setValue('0.5');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'marker_detection.similarity_threshold': 0.5 },
    });
    w.unmount();
  });
});

describe('Admin SettingsPage — bool field (Switch) edit + save', () => {
  it('toggling a Switch enables Save and persists a real boolean', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    // hwaccel.enabled is the first Switch (currently true) → toggle off.
    await w.findComponent(Switch).vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(saveBtn(w).attributes('disabled')).toBeUndefined();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'hwaccel.enabled': false },
    });
    w.unmount();
  });
});

describe('Admin SettingsPage — string + select + password edit + save', () => {
  it('edits a plain string field (Trakt redirect URI)', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    const input = w.find<HTMLInputElement>('#field-trakt\\.redirect_uri');
    await input.setValue('https://new/cb');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'trakt.redirect_uri': 'https://new/cb' },
    });
    w.unmount();
  });

  it('edits an enumerated string via the Select', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subtitles');
    w.findComponent(Select).vm.$emit('update:modelValue', 'fr');
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'subtitles.default_language': 'fr' },
    });
    w.unmount();
  });

  it('renders auth.signup_mode as a Select with the three options + current value', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Access');
    const select = w.findComponent(Select);
    expect(select.exists()).toBe(true);
    expect(select.props('modelValue')).toBe('approval');
    const optionLabels = (select.props('options') as Array<{ value: string; label: string }>).map(
      (o) => o.value,
    );
    expect(optionLabels).toEqual(['open', 'approval', 'disabled']);
    // No raw text input for this string key — it's a proper dropdown.
    expect(w.find('#field-auth\\.signup_mode').exists()).toBe(false);
    w.unmount();
  });

  it('saves the chosen auth.signup_mode value via PUT', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Access');
    w.findComponent(Select).vm.$emit('update:modelValue', 'disabled');
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'auth.signup_mode': 'disabled' },
    });
    w.unmount();
  });

  it('renders password fields masked and toggles visibility', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    const input = w.find<HTMLInputElement>('#field-tmdb\\.api_key');
    expect(input.attributes('type')).toBe('password');
    const toggle = w.findAllComponents(Button).find((b) => b.text().trim() === 'Show')!;
    await toggle.trigger('click');
    await flushPromises();
    expect(w.find<HTMLInputElement>('#field-tmdb\\.api_key').attributes('type')).toBe('text');
    // Now edit + save the (string) secret.
    await w.find<HTMLInputElement>('#field-tmdb\\.api_key').setValue('new-key');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'tmdb.api_key': 'new-key' },
    });
    w.unmount();
  });

  it('shows inline help text for the TMDB key', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    expect(w.text()).toContain('The Movie Database');
    w.unmount();
  });
});

describe('Admin SettingsPage — dirty state', () => {
  it('reverting a value back to the original re-disables Save', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Discovery');
    const input = w.find<HTMLInputElement>('#field-discovery\\.discovery_port');
    await input.setValue('1234');
    expect(saveBtn(w).attributes('disabled')).toBeUndefined();
    await input.setValue('9000'); // back to original
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    w.unmount();
  });
});

describe('Admin SettingsPage — save error paths', () => {
  it('renders per-field validation errors on a 400 with errors', async () => {
    const putImpl = vi.fn().mockRejectedValue(
      new ApiError('Validation failed', 400, {
        errors: { 'discovery.discovery_port': 'Must be between 1 and 65535' },
      }),
    );
    const { client } = makeClient({ putImpl });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Discovery');
    await w.find<HTMLInputElement>('#field-discovery\\.discovery_port').setValue('99999');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(w.find('[role="alert"]').text()).toContain('Must be between 1 and 65535');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('validation errors'))).toBe(true);
    w.unmount();
  });

  it('toasts the message on a 400 without an errors map', async () => {
    const putImpl = vi.fn().mockRejectedValue(new ApiError('Bad request', 400, {}));
    const { client } = makeClient({ putImpl });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    await w.findComponent(Switch).vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Bad request')).toBe(true);
    w.unmount();
  });

  it('toasts the ApiError message on a 500', async () => {
    const putImpl = vi.fn().mockRejectedValue(new ApiError('Internal server error', 500));
    const { client } = makeClient({ putImpl });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    await w.findComponent(Switch).vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Internal server error')).toBe(true);
    w.unmount();
  });

  it('toasts a generic message on a non-ApiError failure', async () => {
    const putImpl = vi.fn().mockRejectedValue(new Error('network down'));
    const { client } = makeClient({ putImpl });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    await w.findComponent(Switch).vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Failed to save settings.')).toBe(true);
    w.unmount();
  });
});

describe('Admin SettingsPage — save success refresh', () => {
  it('clears dirty state after a successful save (Save re-disabled)', async () => {
    const put = vi.fn(async () => ({
      data: { settings: { ...SETTINGS, 'hwaccel.enabled': false }, overridden: ['hwaccel.enabled'] },
    }));
    const { client } = makeClient({ putImpl: put });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    await w.findComponent(Switch).vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    // The refreshed overridden list now badges hwaccel.enabled on the active tab.
    expect(w.text()).toContain('custom');
    w.unmount();
  });
});

describe('Admin SettingsPage — tab a11y (ui/Tabs adoption, R6.5a.2)', () => {
  it('uses roving tabindex: the active tab is 0, inactive tabs are -1', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const tabs = w.findAll('[role="tab"]');
    expect(tabs[0]!.attributes('tabindex')).toBe('0');
    expect(tabs[0]!.attributes('aria-selected')).toBe('true');
    expect(tabs[1]!.attributes('tabindex')).toBe('-1');
    expect(tabs[1]!.attributes('aria-selected')).toBe('false');
    w.unmount();
  });

  it('wires each tab to its panel via aria-controls ↔ tabpanel aria-labelledby', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const active = w.findAll('[role="tab"]').find((t) => t.attributes('aria-selected') === 'true')!;
    const panel = w.find('[role="tabpanel"]');
    expect(panel.exists()).toBe(true);
    expect(active.attributes('aria-controls')).toBe(panel.attributes('id'));
    expect(panel.attributes('aria-labelledby')).toBe(active.attributes('id'));
    w.unmount();
  });

  it('moves the active tab with ArrowRight (roving keyboard nav)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const list = w.find('[role="tablist"]');
    expect(w.find('[role="tab"][aria-selected="true"]').text().trim()).toBe('Access');
    await list.trigger('keydown', { key: 'ArrowRight' });
    await flushPromises();
    expect(w.find('[role="tab"][aria-selected="true"]').text().trim()).toBe('Transcoding');
    w.unmount();
  });
});

describe('Admin SettingsPage — Metadata genres mode', () => {
  it('does NOT fetch metadata sources — the priority editor moved to Libraries', async () => {
    const { client, get } = makeClient(METADATA_OVER);
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    // The global source-priority editor is gone; no sources endpoint is hit.
    expect(get).not.toHaveBeenCalledWith('/api/v1/admin/metadata/sources');
    w.unmount();
  });

  it('renders genres_mode as a Select and saves the chosen value', async () => {
    const { client, put } = makeClient(METADATA_OVER);
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    // The genres-mode select is the LAST Select in the Metadata tab.
    const selects = w.findAllComponents(Select);
    const genresSelect = selects[selects.length - 1]!;
    genresSelect.vm.$emit('update:modelValue', 'union');
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'metadata.genres_mode': 'union' },
    });
    w.unmount();
  });

  it('still renders the Metadata tab (TMDB key + genres mode) when genres_mode is absent', async () => {
    // The default makeClient() has no genres_mode key; the tab must still render
    // the TMDB key field and the genres select (defaulting to "first").
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    expect(w.text()).toContain('TMDB API Key');
    expect(w.text()).toContain('Genres mode');
    w.unmount();
  });
});
