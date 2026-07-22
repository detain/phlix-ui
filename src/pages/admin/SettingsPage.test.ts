/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
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
import { useSettingsPrefsStore } from '../../stores/useSettingsPrefs';
import { ApiError } from '../../api/client';
import type { ApiClient } from '../../api/client';
import type { SettingMeta } from '../../api/admin/settings';

/**
 * Fixtures mirror the REAL `GET /api/v1/admin/settings` contract — see
 * `phlix-shared`'s `schemas/server-settings.schema.json`, currently 41 keys
 * across 13 groups: `settings` + `overridden` +
 * `types` + `secretStatus` + a per-key `meta` block whose 13 fields are exactly
 * what `AdminSettingsController::loadSchemaMeta()` emits — `label`, `helpText`,
 * `helpLinks` ([] when absent), `tier` ('standard' when absent), `group`,
 * `enum`, `enumLabels`, `optionHelp`, `minimum`, `maximum`, `default`, `secret`,
 * `restart` (the last two always booleans, the rest null when absent).
 *
 * The subset below is chosen to cover every control type the server's internal
 * type vocabulary can produce (`bool` / `int` / `float` / `string` / enum /
 * secret / `json`), both tiers, `restart: true` and `restart: false`, `enum`
 * members including the empty-string auto-detect sentinel, `optionHelp`, and
 * numeric bounds. Every key here is a key that ACTUALLY EXISTS in the shared
 * schema, and its tier, bounds and restart flag are copied verbatim from it
 * rather than invented — otherwise the fixtures drift into describing a server
 * that does not exist, and the next reader trusts them. (They did: this file
 * named a `hwaccel.probe_timeout` for some time after that key was deleted from
 * the schema.) If you add a key here, copy it from the schema file.
 *
 * All FIVE `secret: true` keys in the schema are represented — `tmdb.api_key`
 * plus the `scrobblers` group's `lastfm.api_key`, `lastfm.shared_secret`,
 * `trakt.client_id` and `trakt.client_secret` (`trakt.client_id` is secret
 * because it is sent as the `trakt-api-key` header, mirroring `lastfm.api_key`)
 * — alongside the plain-public `trakt.redirect_uri`, so the meta-driven secret
 * path is exercised against the real quintet rather than a single key.
 *
 * Crucially, every secret's value in {@link SETTINGS} is the MASK, because that
 * is all the server ever sends: `maskSecrets()` substitutes
 * `SettingsMasker::MASK` before the response leaves the process, and
 * {@link SECRET_STATUS} is the only carrier of "is it actually configured".
 */
function meta(over: Partial<SettingMeta> & Pick<SettingMeta, 'label' | 'group'>): SettingMeta {
  return {
    helpText: `Help for ${over.label}.`,
    helpLinks: [],
    tier: 'standard',
    enum: null,
    enumLabels: null,
    optionHelp: null,
    minimum: null,
    maximum: null,
    default: null,
    secret: false,
    restart: false,
    ...over,
  };
}

const META: Record<string, SettingMeta> = {
  'auth.signup_mode': meta({
    label: 'New user signup mode',
    group: 'auth',
    enum: ['open', 'approval', 'disabled'],
    enumLabels: { open: 'Open', approval: 'Approval required', disabled: 'Disabled' },
    optionHelp: {
      open: 'Accounts are active immediately.',
      approval: 'An administrator must approve each new account.',
      disabled: 'New registrations are blocked entirely.',
    },
    default: 'open',
  }),
  'hwaccel.enabled': meta({
    label: 'Enable hardware acceleration',
    group: 'transcoding',
    helpLinks: [{ text: 'NVENC (NVIDIA)', url: 'https://en.wikipedia.org/wiki/Nvidia_NVENC' }],
    restart: true,
    default: true,
  }),
  'ffmpeg.transcode_timeout': meta({
    label: 'Transcode job timeout',
    group: 'transcoding',
    tier: 'advanced',
    minimum: 60,
    maximum: 86400,
    restart: true,
    default: 7200,
  }),
  'transcoding.preferred_accelerator': meta({
    label: 'Preferred hardware accelerator',
    group: 'transcoding',
    tier: 'advanced',
    restart: true,
    // The auto-detect sentinel is the EMPTY STRING (there is no JSON null
    // member, and 'nvenc' is an encoder, not an hwaccel — neither is in the enum).
    enum: ['', 'cuda', 'qsv', 'vaapi'],
    enumLabels: { '': 'Auto-detect', cuda: 'CUDA (NVIDIA)', qsv: 'Quick Sync (Intel)', vaapi: 'VA-API' },
    optionHelp: {
      '': 'Pick the first probed accelerator that supports the codec.',
      cuda: 'The NVIDIA path; it drives the NVENC encoders.',
    },
    default: '',
  }),
  'tmdb.api_key': meta({
    label: 'TMDb API key',
    group: 'metadata',
    secret: true,
    default: '',
  }),
  'metadata.provider_priority': meta({
    label: 'Metadata provider priority',
    group: 'metadata',
    default: null,
  }),
  'metadata.genres_mode': meta({
    label: 'Metadata genres merge mode',
    group: 'metadata',
    enum: ['first', 'union'],
    enumLabels: { first: 'First source', union: 'Union of all sources' },
    optionHelp: {
      first: 'Use only the highest-priority source that supplies genres.',
      union: 'Merge the distinct genres from every source.',
    },
    default: 'first',
  }),
  'matching.noise_suffixes': meta({
    label: 'Title noise suffixes to strip',
    group: 'matching',
    tier: 'advanced',
    default: null,
  }),
  'marker_detection.similarity_threshold': meta({
    label: 'Marker similarity threshold',
    group: 'markers',
    minimum: 0,
    maximum: 1,
    default: 0.8,
  }),
  'newsletter.send_hour': meta({
    label: 'Newsletter send hour',
    group: 'newsletter',
    minimum: 0,
    maximum: 23,
    default: 8,
  }),
  'subtitles.default_language': meta({
    label: 'Default subtitle language',
    group: 'subtitles',
    default: 'eng',
  }),
  'process.library-scan.enabled': meta({
    label: 'Enable library scanner',
    group: 'subsystem',
    restart: true,
    default: true,
  }),
  'port-forward.port_forwarding.upnp_enabled': meta({
    label: 'Enable UPnP port forwarding',
    group: 'port-forward',
    default: true,
  }),
  // ── The scrobblers group: 4 of the 5 secrets + one plain public URL ────────
  'lastfm.api_key': meta({
    label: 'Last.fm API key',
    group: 'scrobblers',
    secret: true,
    default: '',
  }),
  'lastfm.shared_secret': meta({
    label: 'Last.fm shared secret',
    group: 'scrobblers',
    secret: true,
    default: '',
  }),
  'trakt.client_id': meta({
    label: 'Trakt client ID',
    group: 'scrobblers',
    // Secret despite the "id" name: Phlix sends it as the `trakt-api-key`
    // header, exactly like `lastfm.api_key`.
    secret: true,
    default: '',
  }),
  'trakt.client_secret': meta({
    label: 'Trakt client secret',
    group: 'scrobblers',
    secret: true,
    default: '',
  }),
  'trakt.redirect_uri': meta({
    label: 'Trakt redirect URI',
    group: 'scrobblers',
    // A public URL, NOT a credential — must render as a plain text input.
    default: 'https://your-server.com/api/v1/oauth/trakt/callback',
  }),
};

/** The exact sentinel `maskSecrets()` substitutes for every secret value. */
const MASK = '***';

/** The server's internal type vocabulary: schema array/object both map to `json`. */
const TYPES: Record<string, string> = {
  'auth.signup_mode': 'string',
  'hwaccel.enabled': 'bool',
  'ffmpeg.transcode_timeout': 'int',
  'transcoding.preferred_accelerator': 'string',
  'tmdb.api_key': 'string',
  'metadata.provider_priority': 'json',
  'metadata.genres_mode': 'string',
  'matching.noise_suffixes': 'json',
  'marker_detection.similarity_threshold': 'float',
  'newsletter.send_hour': 'int',
  'subtitles.default_language': 'string',
  'process.library-scan.enabled': 'bool',
  'port-forward.port_forwarding.upnp_enabled': 'bool',
  'lastfm.api_key': 'string',
  'lastfm.shared_secret': 'string',
  'trakt.client_id': 'string',
  'trakt.client_secret': 'string',
  'trakt.redirect_uri': 'string',
};

const SETTINGS: Record<string, unknown> = {
  'auth.signup_mode': 'approval',
  'hwaccel.enabled': true,
  'ffmpeg.transcode_timeout': 7200,
  'transcoding.preferred_accelerator': '',
  // Every secret arrives as the mask — never the real value.
  'tmdb.api_key': MASK,
  'metadata.provider_priority': { movie: ['tmdb', 'imdb'], series: ['tmdb'] },
  'metadata.genres_mode': 'first',
  'matching.noise_suffixes': ['directors cut', 'remastered'],
  'marker_detection.similarity_threshold': 0.8,
  'newsletter.send_hour': 8,
  'subtitles.default_language': 'eng',
  'process.library-scan.enabled': true,
  'port-forward.port_forwarding.upnp_enabled': true,
  'lastfm.api_key': MASK,
  'lastfm.shared_secret': MASK,
  'trakt.client_id': MASK,
  'trakt.client_secret': MASK,
  'trakt.redirect_uri': 'https://media.example.com/api/v1/oauth/trakt/callback',
};

/**
 * `secretStatus` as the server emits it: one entry per `secret: true` key, and
 * ONLY those keys. Mixed set/unset so the two indicator states are both live in
 * the default fixture — `tmdb.api_key` and `trakt.client_id` are configured,
 * the rest are not.
 */
const SECRET_STATUS: Record<string, { set: boolean; length: number }> = {
  'tmdb.api_key': { set: true, length: 32 },
  'lastfm.api_key': { set: false, length: 0 },
  'lastfm.shared_secret': { set: false, length: 0 },
  'trakt.client_id': { set: true, length: 64 },
  'trakt.client_secret': { set: false, length: 0 },
};

/** Every group present in META, sorted + humanised — the expected tab captions. */
const TAB_LABELS = [
  'Auth',
  'Markers',
  'Matching',
  'Metadata',
  'Newsletter',
  'Port Forward',
  'Scrobblers',
  'Subsystem',
  'Subtitles',
  'Transcoding',
];

function makeClient(
  over: {
    overridden?: string[];
    putImpl?: ReturnType<typeof vi.fn>;
    postImpl?: ReturnType<typeof vi.fn>;
    /** Omit the `meta` block entirely (older server). */
    omitMeta?: boolean;
    /** Replace the whole GET implementation. */
    getImpl?: ReturnType<typeof vi.fn>;
    /** Override the `settings` map (e.g. to simulate an UNMASKED server). */
    settings?: Record<string, unknown>;
    /** Override `secretStatus`; pass `null` to omit it entirely (older server). */
    secretStatus?: Record<string, { set: boolean; length: number }> | null;
  } = {},
) {
  const get =
    over.getImpl ??
    vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/settings') {
        return {
          data: {
            settings: over.settings ?? { ...SETTINGS },
            overridden: over.overridden ?? ['tmdb.api_key'],
            types: { ...TYPES },
            ...(over.omitMeta ? {} : { meta: { ...META } }),
            ...(over.secretStatus === null
              ? {}
              : { secretStatus: over.secretStatus ?? { ...SECRET_STATUS } }),
          },
        };
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
  const put =
    over.putImpl ??
    vi.fn(async (_endpoint: string, body: { settings: Record<string, unknown> }) => ({
      data: {
        settings: { ...SETTINGS, ...body.settings },
        overridden: over.overridden ?? [],
      },
    }));
  const post = over.postImpl ?? vi.fn(async () => ({ data: { message: 'Restart signal sent' } }));
  const client = { get, post, put, patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { client, get, put, post };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(SettingsPage, {
    // Tiny poll settings keep the restart-wait deterministic and fast.
    props: { client, restartPollIntervalMs: 1, restartPollTimeoutMs: 60 },
    attachTo: document.body,
  });
}

/** Switch to a tab by its visible label. */
async function selectTab(w: VueWrapper, label: string): Promise<void> {
  const tab = w.findAll('[role="tab"]').find((t) => t.text().trim() === label);
  if (!tab) throw new Error(`no tab labelled "${label}" (have: ${w.findAll('[role="tab"]').map((t) => t.text().trim()).join(', ')})`);
  await tab.trigger('click');
  await flushPromises();
}

/**
 * The Switch for a specific FIELD. `findComponent(Switch)` would return the
 * page-header "Advanced" toggle, which is the first Switch in the DOM.
 */
function fieldSwitch(w: VueWrapper, label: string) {
  const found = w.findAllComponents(Switch).find((c) => c.props('label') === label);
  if (!found) {
    throw new Error(
      `no field Switch labelled "${label}" (have: ${w
        .findAllComponents(Switch)
        .map((c) => String(c.props('label')))
        .join(', ')})`,
    );
  }
  return found;
}

function saveBtn(w: VueWrapper) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === 'Save settings')!;
}

function restartBanner(w: VueWrapper) {
  return w.find('.settings-restart-banner');
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('Admin SettingsPage — load + layout', () => {
  it('shows a skeleton while loading, then the tabs', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-settings__skel').exists()).toBe(true);
    resolve({ data: { settings: { ...SETTINGS }, overridden: [], types: { ...TYPES }, meta: { ...META } } });
    await flushPromises();
    expect(w.findAll('[role="tab"]').length).toBe(TAB_LABELS.length);
    w.unmount();
  });

  it('issues GET /api/v1/admin/settings on mount', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/settings');
    w.unmount();
  });

  it('derives one tab per meta group, with humanised captions', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.findAll('[role="tab"]').map((t) => t.text().trim())).toEqual(TAB_LABELS);
    w.unmount();
  });

  it('does not show a raw group key as a tab caption', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const labels = w.findAll('[role="tab"]').map((t) => t.text().trim());
    expect(labels).not.toContain('port-forward');
    expect(labels).toContain('Port Forward');
    w.unmount();
  });

  it('renders the Transcoding fields (from meta labels) with Save disabled', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    expect(w.text()).toContain('Enable hardware acceleration');
    expect(w.text()).toContain('Transcode job timeout');
    expect(w.text()).toContain('Preferred hardware accelerator');
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('shows an in-body EmptyState error (+ toast) when loading fails', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
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
      .mockResolvedValueOnce({ data: { settings: { ...SETTINGS }, overridden: [], types: { ...TYPES }, meta: { ...META } } });
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledTimes(2);
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.findAll('[role="tab"]').length).toBe(TAB_LABELS.length);
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

describe('Admin SettingsPage — degradation when the server sends no `meta`', () => {
  it('still renders every key from `types` instead of a blank page', async () => {
    const { client } = makeClient({ omitMeta: true });
    const w = mountPage(client);
    await flushPromises();
    // One "Other" tab holding all keys, rather than zero tabs.
    expect(w.findAll('[role="tab"]').map((t) => t.text().trim())).toEqual(['Other']);
    expect(w.text()).not.toContain('No settings in this group.');
    // Labels derive from the key when meta cannot supply one.
    expect(w.text()).toContain('Subtitles Default Language');
    expect(w.find('#field-subtitles\\.default_language').exists()).toBe(true);
    w.unmount();
  });

  it('warns the admin that the server did not supply metadata', async () => {
    const { client } = makeClient({ omitMeta: true });
    const w = mountPage(client);
    await flushPromises();
    const notice = w.find('.settings-meta-notice');
    expect(notice.exists()).toBe(true);
    expect(notice.text()).toContain('did not send settings metadata');
    w.unmount();
  });

  it('shows no such notice when meta IS present', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.settings-meta-notice').exists()).toBe(false);
    w.unmount();
  });

  it('can still edit and save a key without meta', async () => {
    const { client, put } = makeClient({ omitMeta: true });
    const w = mountPage(client);
    await flushPromises();
    await w.find<HTMLInputElement>('#field-subtitles\\.default_language').setValue('spa');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'subtitles.default_language': 'spa' },
    });
    w.unmount();
  });
});

describe('Admin SettingsPage — number field (int/float) edit + save', () => {
  it('renders min/max attributes and saves a coerced int', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Newsletter');
    const input = w.find<HTMLInputElement>('#field-newsletter\\.send_hour');
    expect(input.attributes('min')).toBe('0');
    expect(input.attributes('max')).toBe('23');
    await input.setValue('19');
    expect(saveBtn(w).attributes('disabled')).toBeUndefined();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'newsletter.send_hour': 19 },
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
    await selectTab(w, 'Port Forward');
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    await fieldSwitch(w, 'Enable UPnP port forwarding').vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(saveBtn(w).attributes('disabled')).toBeUndefined();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'port-forward.port_forwarding.upnp_enabled': false },
    });
    w.unmount();
  });
});

describe('Admin SettingsPage — string + select + secret edit + save', () => {
  it('edits a plain string field', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subtitles');
    await w.find<HTMLInputElement>('#field-subtitles\\.default_language').setValue('fre');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'subtitles.default_language': 'fre' },
    });
    w.unmount();
  });

  it('renders auth.signup_mode as a Select with meta enum + enumLabels', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Auth');
    const select = w.findComponent(Select);
    expect(select.exists()).toBe(true);
    expect(select.props('modelValue')).toBe('approval');
    const options = select.props('options') as Array<{ value: string; label: string }>;
    expect(options.map((o) => o.value)).toEqual(['open', 'approval', 'disabled']);
    expect(options.map((o) => o.label)).toEqual(['Open', 'Approval required', 'Disabled']);
    // No raw text input for this string key — it's a proper dropdown.
    expect(w.find('#field-auth\\.signup_mode').exists()).toBe(false);
    w.unmount();
  });

  it('saves the chosen enum value via PUT', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Auth');
    w.findComponent(Select).vm.$emit('update:modelValue', 'disabled');
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'auth.signup_mode': 'disabled' },
    });
    w.unmount();
  });

  it('gives the empty-string auto-detect enum member a readable caption', async () => {
    const { client } = makeClient();
    const prefs = useSettingsPrefsStore();
    prefs.setAdvancedMode(true);
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    const select = w.findAllComponents(Select).at(-1)!;
    const options = select.props('options') as Array<{ value: string; label: string }>;
    expect(options[0]).toEqual({ value: '', label: 'Auto-detect' });
    expect(options.map((o) => o.value)).toEqual(['', 'cuda', 'qsv', 'vaapi']);
    w.unmount();
  });

  it('renders a secret field as a password input', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    expect(w.find('#field-tmdb\\.api_key').attributes('type')).toBe('password');
    w.unmount();
  });

  it('saves a secret the admin actually typed', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    await w.find<HTMLInputElement>('#field-tmdb\\.api_key').setValue('new-key');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'tmdb.api_key': 'new-key' },
    });
    w.unmount();
  });
});

/**
 * Secret handling — asserted by CONSEQUENCE, not by flag.
 *
 * The server masks every `secret: true` value (`maskSecrets()`), publishes a
 * separate `secretStatus` map, and skips a PUT value equal to the mask
 * sentinel. These tests pin the three things that actually matter to an admin:
 * no secret material ever reaches the DOM, an untouched secret cannot be
 * clobbered by a save, and the page tells the truth about whether a secret is
 * configured.
 */
describe('Admin SettingsPage — masked secrets + secretStatus', () => {
  /** The rendered field block for a secret key, including its status line. */
  function secretField(w: VueWrapper, key: string) {
    const input = w.find(`#field-${key.replace(/\./g, '\\.')}`);
    if (!input.exists()) throw new Error(`no field rendered for "${key}"`);
    const block = input.element.closest('.admin-settings__field');
    if (!block) throw new Error(`field "${key}" has no enclosing field block`);
    return block as HTMLElement;
  }

  it('never renders the mask sentinel into a secret input', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    // The server sent '***' for this key; the box must still start empty, or
    // the admin cannot tell a stored secret from the literal string '***'.
    expect(w.find<HTMLInputElement>('#field-tmdb\\.api_key').element.value).toBe('');
    w.unmount();
  });

  it('never renders a plaintext secret, even if the server fails to mask it', async () => {
    // Defence in depth: a server regression that leaked the real value must not
    // put it in the DOM. The UI drops secret values unconditionally.
    const leaked = 'super-secret-key-do-not-leak';
    const { client } = makeClient({
      settings: { ...SETTINGS, 'tmdb.api_key': leaked, 'trakt.client_secret': leaked },
    });
    const w = mountPage(client);
    await flushPromises();

    for (const tab of ['Metadata', 'Scrobblers']) {
      await selectTab(w, tab);
      expect(w.html()).not.toContain(leaked);
    }
    await selectTab(w, 'Metadata');
    expect(w.find<HTMLInputElement>('#field-tmdb\\.api_key').element.value).toBe('');
    w.unmount();
  });

  it('shows a Configured cue with the stored length when secretStatus.set is true', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    // SECRET_STATUS marks tmdb.api_key set, length 32.
    const text = secretField(w, 'tmdb.api_key').textContent ?? '';
    expect(text).toContain('Configured');
    expect(text).toContain('32 characters');
    expect(text).not.toContain('Not set');
    w.unmount();
  });

  it('shows a Not set cue when secretStatus.set is false', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    // Same tab, same code path, opposite status: trakt.client_id is set,
    // trakt.client_secret is not — the cue must follow secretStatus, not meta.
    const configured = secretField(w, 'trakt.client_id').textContent ?? '';
    const unset = secretField(w, 'trakt.client_secret').textContent ?? '';
    expect(configured).toContain('Configured');
    expect(configured).toContain('64 characters');
    expect(unset).toContain('Not set');
    expect(unset).not.toContain('Configured');
    w.unmount();
  });

  it('flips the cue when secretStatus flips, with identical meta', async () => {
    // Proves the indicator is driven by secretStatus and nothing else.
    const { client } = makeClient({
      secretStatus: { ...SECRET_STATUS, 'tmdb.api_key': { set: false, length: 0 } },
    });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    const text = secretField(w, 'tmdb.api_key').textContent ?? '';
    expect(text).toContain('Not set');
    expect(text).not.toContain('Configured');
    w.unmount();
  });

  it('does not claim "Not set" when the server sent no secretStatus at all', async () => {
    const { client } = makeClient({ secretStatus: null });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    const text = secretField(w, 'tmdb.api_key').textContent ?? '';
    expect(text).not.toContain('Not set');
    expect(text).not.toContain('Configured');
    expect(text).toContain('did not report');
    w.unmount();
  });

  it('excludes an UNTOUCHED secret from the PUT payload entirely', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    // Change only the public sibling; every secret on this tab stays untouched.
    await w.find<HTMLInputElement>('#field-trakt\\.redirect_uri').setValue('https://x.test/cb');
    await saveBtn(w).trigger('click');
    await flushPromises();

    const body = put.mock.calls[0][1] as { settings: Record<string, unknown> };
    expect(body.settings).toEqual({ 'trakt.redirect_uri': 'https://x.test/cb' });
    // The consequence: no secret key is present under ANY value — not the mask,
    // not an empty string — so the server cannot overwrite a stored credential.
    for (const key of Object.keys(SECRET_STATUS)) {
      expect(body.settings).not.toHaveProperty(key);
    }
    w.unmount();
  });

  it('leaves a secret out of the payload after typing and then clearing it', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    const input = w.find<HTMLInputElement>('#field-trakt\\.client_secret');
    await input.setValue('typed-then-removed');
    await input.setValue('');
    await w.find<HTMLInputElement>('#field-trakt\\.redirect_uri').setValue('https://x.test/cb');
    await saveBtn(w).trigger('click');
    await flushPromises();

    const body = put.mock.calls[0][1] as { settings: Record<string, unknown> };
    expect(body.settings).not.toHaveProperty('trakt.client_secret');
    w.unmount();
  });

  it('includes a MODIFIED secret in the PUT payload as the typed plaintext', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    await w.find<HTMLInputElement>('#field-trakt\\.client_secret').setValue('brand-new-secret');
    await saveBtn(w).trigger('click');
    await flushPromises();

    const body = put.mock.calls[0][1] as { settings: Record<string, unknown> };
    expect(body.settings).toEqual({ 'trakt.client_secret': 'brand-new-secret' });
    // Never the sentinel — that would mean "unchanged" and silently no-op.
    expect(body.settings['trakt.client_secret']).not.toBe(MASK);
    w.unmount();
  });

  it('does not enable Save merely by rendering secret fields', async () => {
    // Guards the regression where pre-filling the model marks secrets dirty on
    // mount, which would push all five into every save.
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    expect(saveBtn(w).props('disabled')).toBe(true);
    w.unmount();
  });

  it('offers no Show toggle until the admin types a new value', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    const showButtons = () => w.findAllComponents(Button).filter((b) => b.text().trim() === 'Show');
    // Revealing a value the browser does not have is pointless and misleading.
    expect(showButtons()).toHaveLength(0);

    await w.find<HTMLInputElement>('#field-tmdb\\.api_key').setValue('typed-key');
    await flushPromises();
    expect(showButtons()).toHaveLength(1);
    w.unmount();
  });

  it('reveals what the admin typed when Show is used', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    await w.find<HTMLInputElement>('#field-tmdb\\.api_key').setValue('typed-key');
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.text().trim() === 'Show')!.trigger('click');
    await flushPromises();

    const input = w.find<HTMLInputElement>('#field-tmdb\\.api_key');
    expect(input.attributes('type')).toBe('text');
    expect(input.element.value).toBe('typed-key');
    w.unmount();
  });

  it('re-hides and re-empties a secret after a successful save', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    await w.find<HTMLInputElement>('#field-tmdb\\.api_key').setValue('typed-key');
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.text().trim() === 'Show')!.trigger('click');
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();

    const input = w.find<HTMLInputElement>('#field-tmdb\\.api_key');
    // The typed secret must not linger in the DOM in the clear after saving.
    expect(input.attributes('type')).toBe('password');
    expect(input.element.value).toBe('');
    expect(w.html()).not.toContain('typed-key');
    w.unmount();
  });

  it('updates the cue to Configured after saving a secret that was Not set', async () => {
    // The PUT response carries no secretStatus, so the page must reconcile it
    // from what it persisted rather than keep showing a stale "Not set".
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    expect(secretField(w, 'trakt.client_secret').textContent ?? '').toContain('Not set');

    await w.find<HTMLInputElement>('#field-trakt\\.client_secret').setValue('abcdefgh');
    await saveBtn(w).trigger('click');
    await flushPromises();

    const text = secretField(w, 'trakt.client_secret').textContent ?? '';
    expect(text).toContain('Configured');
    expect(text).toContain('8 characters');
    w.unmount();
  });

  it('renders the public trakt.redirect_uri as a plain text input, not a secret', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    const input = w.find<HTMLInputElement>('#field-trakt\\.redirect_uri');
    expect(input.attributes('type')).toBe('text');
    // A non-secret keeps its value — only secrets are blanked.
    expect(input.element.value).toBe('https://media.example.com/api/v1/oauth/trakt/callback');
    expect(secretField(w, 'trakt.redirect_uri').textContent ?? '').not.toContain('Configured');
    w.unmount();
  });
});

/**
 * S06 — anti-autofill hints on secret inputs.
 *
 * A real browser/password-manager autofill offer cannot be reliably driven in
 * jsdom, so the regression guard is the rendered DOM: every secret input must
 * carry `autocomplete="new-password"` plus the four password-manager opt-out
 * hints (`data-lpignore` / `data-1p-ignore` / `data-bwignore` /
 * `data-form-type="other"`), and a NON-secret text field on the same tab must
 * NOT carry them — guarding against blanket over-application.
 */
describe('Admin SettingsPage — anti-autofill hints on secret inputs (S06)', () => {
  /** The full anti-autofill attribute set applied to every admin secret input. */
  function expectAntiAutofill(el: HTMLInputElement): void {
    expect(el.getAttribute('autocomplete')).toBe('new-password');
    expect(el.getAttribute('data-lpignore')).toBe('true');
    expect(el.hasAttribute('data-1p-ignore')).toBe(true);
    expect(el.hasAttribute('data-bwignore')).toBe(true);
    expect(el.getAttribute('data-form-type')).toBe('other');
  }

  it('stamps the full anti-autofill set on a secret input', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    expectAntiAutofill(w.find<HTMLInputElement>('#field-tmdb\\.api_key').element);
    w.unmount();
  });

  it('stamps every secret input on a multi-secret tab', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    for (const key of [
      'lastfm.api_key',
      'lastfm.shared_secret',
      'trakt.client_id',
      'trakt.client_secret',
    ]) {
      expectAntiAutofill(w.find<HTMLInputElement>(`#field-${key.replace(/\./g, '\\.')}`).element);
    }
    w.unmount();
  });

  it('does NOT stamp the hints on a non-secret text field (no over-application)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    // trakt.redirect_uri is a public URL rendered as a plain text input.
    const el = w.find<HTMLInputElement>('#field-trakt\\.redirect_uri').element;
    expect(el.getAttribute('autocomplete')).toBe('off');
    expect(el.hasAttribute('data-form-type')).toBe(false);
    expect(el.hasAttribute('data-1p-ignore')).toBe(false);
    expect(el.hasAttribute('data-lpignore')).toBe(false);
    expect(el.hasAttribute('data-bwignore')).toBe(false);
    w.unmount();
  });
});

describe('Admin SettingsPage — json fields (schema array / object)', () => {
  it('renders an object-typed key as pretty JSON in a textarea, never [object Object]', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    const ta = w.find<HTMLTextAreaElement>('#field-metadata\\.provider_priority');
    expect(ta.exists()).toBe(true);
    expect(ta.element.tagName).toBe('TEXTAREA');
    expect(ta.element.value).not.toContain('[object Object]');
    expect(JSON.parse(ta.element.value)).toEqual({ movie: ['tmdb', 'imdb'], series: ['tmdb'] });
    w.unmount();
  });

  it('renders an array-typed key as a JSON array, not a comma-joined string', async () => {
    const { client } = makeClient();
    const prefs = useSettingsPrefsStore();
    prefs.setAdvancedMode(true); // matching.noise_suffixes is advanced-tier
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Matching');
    const ta = w.find<HTMLTextAreaElement>('#field-matching\\.noise_suffixes');
    expect(ta.exists()).toBe(true);
    expect(JSON.parse(ta.element.value)).toEqual(['directors cut', 'remastered']);
    w.unmount();
  });

  it('PUTs a parsed object (not the raw string) for a json key', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    await w
      .find<HTMLTextAreaElement>('#field-metadata\\.provider_priority')
      .setValue('{"movie":["imdb"]}');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'metadata.provider_priority': { movie: ['imdb'] } },
    });
    w.unmount();
  });

  it('shows an inline parse error and REFUSES to PUT invalid JSON', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    await w
      .find<HTMLTextAreaElement>('#field-metadata\\.provider_priority')
      .setValue('{"movie": [oops}');
    await flushPromises();
    const err = w.findAll('[role="alert"]').find((e) => e.text().includes('Invalid JSON'));
    expect(err).toBeTruthy();
    expect(
      w.find('#field-metadata\\.provider_priority').attributes('aria-invalid'),
    ).toBe('true');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).not.toHaveBeenCalled();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('invalid JSON'))).toBe(true);
    w.unmount();
  });

  it('clears the parse error and saves once the JSON is valid again', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    const ta = w.find<HTMLTextAreaElement>('#field-metadata\\.provider_priority');
    await ta.setValue('{ broken');
    await flushPromises();
    await ta.setValue('{"movie":["tmdb"]}');
    await flushPromises();
    expect(w.findAll('[role="alert"]').some((e) => e.text().includes('Invalid JSON'))).toBe(false);
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'metadata.provider_priority': { movie: ['tmdb'] } },
    });
    w.unmount();
  });

  it('reformatting a json field without changing its value leaves Save disabled', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    // Same value, different whitespace — semantically unchanged.
    await w
      .find<HTMLTextAreaElement>('#field-metadata\\.provider_priority')
      .setValue('{"movie":["tmdb","imdb"],"series":["tmdb"]}');
    await flushPromises();
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    w.unmount();
  });
});

describe('Admin SettingsPage — Advanced tier gating', () => {
  it('renders advanced fields greyed + disabled (never hidden) in Standard mode', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    const advanced = w.find('#field-ffmpeg\\.transcode_timeout');
    expect(advanced.exists()).toBe(true); // rendered, not hidden
    expect(advanced.attributes('disabled')).toBeDefined();
    expect(w.text()).toContain('Advanced');
    w.unmount();
  });

  it('disables the advanced enum Select too (no control escapes the gate)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    const accelSelect = w.findAllComponents(Select).at(-1)!;
    expect(accelSelect.props('disabled')).toBe(true);
    w.unmount();
  });

  it('disables the advanced json textarea too', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Matching');
    expect(w.find('#field-matching\\.noise_suffixes').attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('enables advanced fields once Advanced mode is on', async () => {
    const { client } = makeClient();
    const prefs = useSettingsPrefsStore();
    prefs.setAdvancedMode(true);
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    expect(w.find('#field-ffmpeg\\.transcode_timeout').attributes('disabled')).toBeUndefined();
    expect(w.findAllComponents(Select).at(-1)!.props('disabled')).toBe(false);
    w.unmount();
  });

  it('leaves standard-tier fields editable in Standard mode', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subtitles');
    expect(w.find('#field-subtitles\\.default_language').attributes('disabled')).toBeUndefined();
    w.unmount();
  });
});

describe('Admin SettingsPage — per-option help (schema optionHelp)', () => {
  it('renders one help line per enum option', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Auth');
    const help = w.find('.admin-settings__option-help');
    expect(help.exists()).toBe(true);
    expect(help.text()).toContain('Accounts are active immediately.');
    expect(help.text()).toContain('An administrator must approve each new account.');
    expect(help.text()).toContain('New registrations are blocked entirely.');
    w.unmount();
  });

  it('labels each option-help entry with its enumLabel', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Auth');
    const terms = w.findAll('.admin-settings__option-help-term').map((t) => t.text());
    expect(terms).toEqual(['Open', 'Approval required', 'Disabled']);
    w.unmount();
  });

  it('omits the option-help list for an enum with no optionHelp', async () => {
    const noHelp: Record<string, SettingMeta> = {
      'subtitles.default_language': meta({
        label: 'Default subtitle language',
        group: 'subtitles',
        enum: ['eng', 'fre'],
      }),
    };
    const { client } = makeClient({
      getImpl: vi.fn(async () => ({
        data: {
          settings: { 'subtitles.default_language': 'eng' },
          overridden: [],
          types: { 'subtitles.default_language': 'string' },
          meta: noHelp,
        },
      })),
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-settings__option-help').exists()).toBe(false);
    w.unmount();
  });
});

describe('Admin SettingsPage — per-field restart note (§3.35)', () => {
  it('marks every restart:true field with a note', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    // 3 of the 3 transcoding fixture keys are restart:true.
    expect(w.findAll('.field-restart-note').length).toBe(3);
    expect(w.find('.field-restart-note').text()).toContain('Requires a server restart');
    w.unmount();
  });

  it('does not mark restart:false fields', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subtitles');
    expect(w.findAll('.field-restart-note').length).toBe(0);
    w.unmount();
  });
});

describe('Admin SettingsPage — help affordances', () => {
  it('names the field in the help trigger accessible name', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subtitles');
    const trigger = w.find('.phlix-help-popover__trigger');
    expect(trigger.attributes('aria-label')).toBe('Help for Default subtitle language');
    w.unmount();
  });

  it('reveals the meta helpText + helpLinks when the popover is opened', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    await w.find('.phlix-help-popover__trigger').trigger('click');
    await flushPromises();
    const panel = document.querySelector('.phlix-help-popover__panel');
    expect(panel).toBeTruthy();
    expect(panel!.textContent).toContain('Help for Enable hardware acceleration.');
    const link = panel!.querySelector('a')!;
    expect(link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Nvidia_NVENC');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link.getAttribute('target')).toBe('_blank');
    w.unmount();
  });

  it('renders no help trigger for a key with neither helpText nor helpLinks', async () => {
    const { client } = makeClient({
      getImpl: vi.fn(async () => ({
        data: {
          settings: { 'subtitles.default_language': 'eng' },
          overridden: [],
          types: { 'subtitles.default_language': 'string' },
          meta: {
            'subtitles.default_language': {
              ...meta({ label: 'Default subtitle language', group: 'subtitles' }),
              helpText: '',
              helpLinks: [],
            },
          },
        },
      })),
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.phlix-help-popover__trigger').exists()).toBe(false);
    w.unmount();
  });
});

describe('Admin SettingsPage — dirty state', () => {
  it('reverting a value back to the original re-disables Save', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Newsletter');
    const input = w.find<HTMLInputElement>('#field-newsletter\\.send_hour');
    await input.setValue('12');
    expect(saveBtn(w).attributes('disabled')).toBeUndefined();
    await input.setValue('8'); // back to original
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('never sends a disabled advanced key, even if it was dirtied before the gate closed', async () => {
    const { client, put } = makeClient();
    const prefs = useSettingsPrefsStore();
    prefs.setAdvancedMode(true);
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Transcoding');
    await w.find<HTMLInputElement>('#field-ffmpeg\\.transcode_timeout').setValue('3600');
    prefs.setAdvancedMode(false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', { settings: {} });
    w.unmount();
  });
});

describe('Admin SettingsPage — save error paths', () => {
  it('renders per-field validation errors on a 400 with errors', async () => {
    const putImpl = vi.fn().mockRejectedValue(
      new ApiError('Validation failed', 400, {
        errors: { 'newsletter.send_hour': 'Must be between 0 and 23' },
      }),
    );
    const { client } = makeClient({ putImpl });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Newsletter');
    await w.find<HTMLInputElement>('#field-newsletter\\.send_hour').setValue('99');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(w.find('[role="alert"]').text()).toContain('Must be between 0 and 23');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('validation errors'))).toBe(true);
    w.unmount();
  });

  it('toasts the message on a 400 without an errors map', async () => {
    const putImpl = vi.fn().mockRejectedValue(new ApiError('Bad request', 400, {}));
    const { client } = makeClient({ putImpl });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Port Forward');
    await fieldSwitch(w, 'Enable UPnP port forwarding').vm.$emit('update:modelValue', false);
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
    await selectTab(w, 'Port Forward');
    await fieldSwitch(w, 'Enable UPnP port forwarding').vm.$emit('update:modelValue', false);
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
    await selectTab(w, 'Port Forward');
    await fieldSwitch(w, 'Enable UPnP port forwarding').vm.$emit('update:modelValue', false);
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
    const { client } = makeClient({ overridden: ['port-forward.port_forwarding.upnp_enabled'] });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Port Forward');
    await fieldSwitch(w, 'Enable UPnP port forwarding').vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(saveBtn(w).attributes('disabled')).toBeDefined();
    expect(w.text()).toContain('custom');
    w.unmount();
  });
});

describe('Admin SettingsPage — restart banner (§3.35)', () => {
  it('shows NO banner while a restart:true field is merely being edited', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subsystem');
    expect(restartBanner(w).exists()).toBe(false);
    await fieldSwitch(w, 'Enable library scanner').vm.$emit('update:modelValue', false);
    await flushPromises();
    // Dirty, unsaved — a restart is not required yet.
    expect(restartBanner(w).exists()).toBe(false);
    w.unmount();
  });

  it('shows the banner AFTER a restart:true key is successfully saved', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subsystem');
    await fieldSwitch(w, 'Enable library scanner').vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    const banner = restartBanner(w);
    expect(banner.exists()).toBe(true);
    expect(banner.text()).toContain('Enable library scanner');
    expect(banner.text()).toContain('require a server restart');
    // The Restart button is reachable exactly when it is needed.
    expect(banner.text()).toContain('Restart server');
    w.unmount();
  });

  it('shows NO banner after saving a restart:false key', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subtitles');
    await w.find<HTMLInputElement>('#field-subtitles\\.default_language').setValue('ger');
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(restartBanner(w).exists()).toBe(false);
    w.unmount();
  });

  it('survives a page reload (state is persisted, not derived from dirty)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subsystem');
    await fieldSwitch(w, 'Enable library scanner').vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(restartBanner(w).exists()).toBe(true);
    w.unmount();

    // Fresh mount = fresh page load. localStorage is NOT cleared in between.
    const { client: client2 } = makeClient();
    const w2 = mountPage(client2);
    await flushPromises();
    expect(restartBanner(w2).exists()).toBe(true);
    expect(restartBanner(w2).text()).toContain('Enable library scanner');
    w2.unmount();
  });

  it('can be dismissed, and stays dismissed across a reload', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subsystem');
    await fieldSwitch(w, 'Enable library scanner').vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    await w.find('.settings-restart-banner__dismiss').trigger('click');
    await flushPromises();
    expect(restartBanner(w).exists()).toBe(false);
    w.unmount();

    const { client: client2 } = makeClient();
    const w2 = mountPage(client2);
    await flushPromises();
    expect(restartBanner(w2).exists()).toBe(false);
    w2.unmount();
  });

  it('POSTs the restart, waits for the server, then clears the banner', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subsystem');
    await fieldSwitch(w, 'Enable library scanner').vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    await w.find('.settings-restart-banner__btn').trigger('click');
    await vi.waitFor(() => expect(restartBanner(w).exists()).toBe(false));
    expect(post).toHaveBeenCalledWith('/api/v1/admin/restart', {});
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Server is back online.')).toBe(true);
    w.unmount();
  });

  it('keeps the banner and reports a timeout when the server never comes back', async () => {
    // GET works for the initial load, then fails forever (server still down).
    let calls = 0;
    const getImpl = vi.fn(async () => {
      calls += 1;
      if (calls === 1) {
        return {
          data: {
            settings: { ...SETTINGS },
            overridden: [],
            types: { ...TYPES },
            meta: { ...META },
          },
        };
      }
      throw new Error('ECONNREFUSED');
    });
    const { client } = makeClient({ getImpl });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subsystem');
    await fieldSwitch(w, 'Enable library scanner').vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    await w.find('.settings-restart-banner__btn').trigger('click');

    const toasts = useToastStore();
    await vi.waitFor(() =>
      expect(toasts.toasts.some((t) => t.message.includes('did not respond within'))).toBe(true),
    );
    // The page never blanked into its error state, and the banner is still there.
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(restartBanner(w).exists()).toBe(true);
    expect(w.findAll('[role="tab"]').length).toBe(TAB_LABELS.length);
    w.unmount();
  });

  it('toasts and keeps the banner when the restart request itself fails', async () => {
    const postImpl = vi.fn().mockRejectedValue(new ApiError('Restart not permitted', 403));
    const { client } = makeClient({ postImpl });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Subsystem');
    await fieldSwitch(w, 'Enable library scanner').vm.$emit('update:modelValue', false);
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    await w.find('.settings-restart-banner__btn').trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Restart not permitted')).toBe(true);
    expect(restartBanner(w).exists()).toBe(true);
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
    expect(w.find('[role="tab"][aria-selected="true"]').text().trim()).toBe('Auth');
    await list.trigger('keydown', { key: 'ArrowRight' });
    await flushPromises();
    expect(w.find('[role="tab"][aria-selected="true"]').text().trim()).toBe('Markers');
    w.unmount();
  });
});

describe('Admin SettingsPage — §11 Definition of Done', () => {
  it('auto-renders a brand-new schema key with no UI change (correct tab, label, control, tier)', async () => {
    const newKey = 'future.brand_new_toggle';
    const { client } = makeClient({
      getImpl: vi.fn(async () => ({
        data: {
          settings: { ...SETTINGS, [newKey]: true },
          overridden: [],
          types: { ...TYPES, [newKey]: 'bool' },
          meta: {
            ...META,
            [newKey]: meta({
              label: 'A setting that did not exist yesterday',
              group: 'future-things',
              tier: 'advanced',
              restart: true,
              helpText: 'Invented by a schema author, rendered by nobody in particular.',
            }),
          },
        },
      })),
    });
    const w = mountPage(client);
    await flushPromises();
    // New tab appeared, humanised.
    expect(w.findAll('[role="tab"]').map((t) => t.text().trim())).toContain('Future Things');
    await selectTab(w, 'Future Things');
    // Correct label, control, tier gate and restart note — all from meta alone.
    expect(w.text()).toContain('A setting that did not exist yesterday');
    expect(fieldSwitch(w, 'A setting that did not exist yesterday').props('disabled')).toBe(true);
    expect(w.text()).toContain('Advanced');
    expect(w.find('.field-restart-note').exists()).toBe(true);
    w.unmount();
  });
});

/**
 * Explicit secret removal.
 *
 * Because secret inputs start blank and a blank field means "keep the stored
 * value", clearing the box cannot express "delete this". The Remove control is
 * the explicit opt-in, and `''` is the only value the server reads as "clear
 * it" (`update()` skips a secret only when it equals the mask sentinel).
 */
describe('Admin SettingsPage — removing a stored secret', () => {
  /** The rendered field block for a secret key. */
  function secretField(w: VueWrapper, key: string): HTMLElement {
    const input = w.find(`#field-${key.replace(/\./g, '\\.')}`);
    if (!input.exists()) throw new Error(`no field rendered for "${key}"`);
    const block = input.element.closest('.admin-settings__field');
    if (!block) throw new Error(`field "${key}" has no enclosing field block`);
    return block as HTMLElement;
  }

  /** The Remove / Undo button inside a secret field block, if rendered. */
  function fieldButton(w: VueWrapper, key: string, label: string) {
    const block = secretField(w, key);
    return w
      .findAllComponents(Button)
      .find((b) => b.text().trim() === label && block.contains(b.element));
  }

  it('offers Remove for a configured secret', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    expect(fieldButton(w, 'tmdb.api_key', 'Remove')).toBeTruthy();
    w.unmount();
  });

  it('does NOT offer Remove for a secret the server reports as unset', async () => {
    // Nothing to remove — the control would be a no-op that implies otherwise.
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    expect(fieldButton(w, 'trakt.client_secret', 'Remove')).toBeFalsy();
    expect(fieldButton(w, 'trakt.client_id', 'Remove')).toBeTruthy();
    w.unmount();
  });

  it('still offers Remove when the server reported no secretStatus at all', async () => {
    // Unknown ≠ unset. An older server's admin may well have a stored value and
    // must not be left without any way to clear it.
    const { client } = makeClient({ secretStatus: null });
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    expect(fieldButton(w, 'tmdb.api_key', 'Remove')).toBeTruthy();
    w.unmount();
  });

  it('sends an empty string for a removed secret, which is what clears it', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    await fieldButton(w, 'tmdb.api_key', 'Remove')!.trigger('click');
    await saveBtn(w).trigger('click');
    await flushPromises();
    const body = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(body.settings['tmdb.api_key']).toBe('');
    w.unmount();
  });

  it('enables Save on an armed removal alone, with nothing else edited', async () => {
    // A pending removal is not "dirty" (an armed field is blank, which IS its
    // baseline), so without explicit handling the intent would be unsendable.
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    expect(saveBtn(w).props('disabled')).toBe(true);
    await fieldButton(w, 'tmdb.api_key', 'Remove')!.trigger('click');
    expect(saveBtn(w).props('disabled')).toBe(false);
    w.unmount();
  });

  it('Undo cancels a pending removal, leaving the secret out of the payload', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Scrobblers');
    await fieldButton(w, 'trakt.client_id', 'Remove')!.trigger('click');
    await fieldButton(w, 'trakt.client_id', 'Undo')!.trigger('click');
    // Nothing is pending any more, so make an unrelated edit to enable Save.
    await w.find<HTMLInputElement>('#field-trakt\\.redirect_uri').setValue('https://x.test/cb');
    await saveBtn(w).trigger('click');
    await flushPromises();
    const body = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(body.settings).not.toHaveProperty('trakt.client_id');
    w.unmount();
  });

  it('announces the pending removal and disables the input so it cannot also carry a value', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    await fieldButton(w, 'tmdb.api_key', 'Remove')!.trigger('click');
    const text = secretField(w, 'tmdb.api_key').textContent ?? '';
    expect(text).toContain('Will be removed');
    expect(text).not.toContain('Configured');
    const input = w.find<HTMLInputElement>('#field-tmdb\\.api_key');
    expect(input.attributes('disabled')).toBeDefined();
    expect(input.element.value).toBe('');
    w.unmount();
  });

  it('drops a half-typed replacement when Remove is clicked', async () => {
    // The two intents are mutually exclusive; the last one clicked must win,
    // and a stale keystroke must not ride along with the removal.
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    const input = w.find('#field-tmdb\\.api_key');
    await input.setValue('half-typed-new-key');
    await fieldButton(w, 'tmdb.api_key', 'Remove')!.trigger('click');
    await saveBtn(w).trigger('click');
    await flushPromises();
    const body = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(body.settings['tmdb.api_key']).toBe('');
    w.unmount();
  });

  it('does not carry a pending removal across a reload', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await selectTab(w, 'Metadata');
    await fieldButton(w, 'tmdb.api_key', 'Remove')!.trigger('click');
    await saveBtn(w).trigger('click');
    await flushPromises();
    // The save landed; the armed state must not survive to fire again.
    expect(saveBtn(w).props('disabled')).toBe(true);
    await saveBtn(w).trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledTimes(1);
    w.unmount();
  });
});
