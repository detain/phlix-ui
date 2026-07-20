/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import PluginConfigPage from './PluginConfigPage.vue';
import Button from '../../components/ui/Button.vue';
import { useSettingsPrefsStore } from '../../stores/useSettingsPrefs';
import type { ApiClient } from '../../api/client';
import type { PluginSettingsSchema } from '../../api/admin/plugins';

/**
 * Descriptors mirror the server's projected manifest shape: `type`, `required`,
 * `secret`, `label`, `description`, optional `default`, optional `link` /
 * `link_text` (both independently optional — they come from the manifest OR the
 * server's `config/plugin_field_help.php` overlay), and the optional `tier`
 * added for the Standard/Advanced toggle. A manifest that predates `tier` simply
 * omits it and must keep rendering as a standard field.
 */
const SCHEMA: PluginSettingsSchema = {
  api_key: {
    type: 'string',
    required: true,
    secret: true,
    label: 'API key',
    description: 'Credential for the upstream service.',
    link: 'https://example.test/api-keys',
    link_text: 'Get an API key',
  },
  // link WITHOUT link_text — the natural authoring slip. The link must still render.
  endpoint: {
    type: 'string',
    required: false,
    secret: false,
    label: 'Endpoint',
    description: 'Base URL of the service.',
    link: 'https://example.test/endpoints',
  },
  // No tier at all → treated as standard.
  retries: {
    type: 'int',
    required: false,
    secret: false,
    label: 'Retries',
    description: 'How many times to retry.',
    default: 3,
  },
  timeout_ms: {
    type: 'int',
    required: false,
    secret: false,
    label: 'Timeout (ms)',
    description: 'Give up after this long.',
    tier: 'advanced',
    default: 5000,
  },
  verbose: {
    type: 'bool',
    required: false,
    secret: false,
    label: 'Verbose logging',
    description: 'Log every request.',
    tier: 'advanced',
  },
};

const PLUGIN = { name: 'acme', version: '1.2.3', type: 'metadata', enabled: true };

function makeClient(over: { putImpl?: ReturnType<typeof vi.fn> } = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/plugins') return { plugins: [PLUGIN] };
    if (endpoint === '/api/v1/admin/plugins/acme') {
      return {
        plugin: {
          ...PLUGIN,
          settings_schema: SCHEMA,
          settings: {
            api_key: '***',
            endpoint: 'https://api.example.test',
            retries: 3,
            timeout_ms: 5000,
            verbose: 'false',
          },
        },
      };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const put =
    over.putImpl ??
    vi.fn(async () => ({
      plugin: { ...PLUGIN, settings_schema: SCHEMA, settings: {} },
    }));
  const client = { get, post: vi.fn(), put, patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { client, get, put };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(PluginConfigPage, { props: { client }, attachTo: document.body });
}

/** Load the page and expand the single plugin's configuration form. */
async function openPlugin(client: ApiClient): Promise<VueWrapper> {
  const w = mountPage(client);
  await flushPromises();
  await w.find('.admin-plugin-config__plugin-btn').trigger('click');
  await flushPromises();
  return w;
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
  document.body.innerHTML = '';
});

describe('PluginConfigPage — Advanced toggle (plan §3.3)', () => {
  it('renders an Advanced switch in the page header', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.settings-advanced-toggle').exists()).toBe(true);
    expect(w.find('.settings-advanced-toggle__label').text()).toBe('Advanced');
    w.unmount();
  });

  it('greys (disables) advanced-tier fields in Standard mode without hiding them', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    const advanced = w.find('#setting-timeout_ms');
    expect(advanced.exists()).toBe(true); // rendered, not hidden
    expect(advanced.attributes('disabled')).toBeDefined();
    expect(w.find('#setting-verbose').attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('badges advanced-tier fields', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    const badges = w.findAll('.admin-plugin-config__advanced-badge');
    expect(badges.length).toBe(2); // timeout_ms + verbose
    expect(badges[0]!.text()).toBe('Advanced');
    w.unmount();
  });

  it('treats a descriptor with NO tier as standard (editable, unbadged)', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    expect(w.find('#setting-retries').attributes('disabled')).toBeUndefined();
    expect(w.find('#setting-endpoint').attributes('disabled')).toBeUndefined();
    w.unmount();
  });

  it('enables advanced fields once Advanced mode is on', async () => {
    const { client } = makeClient();
    useSettingsPrefsStore().setAdvancedMode(true);
    const w = await openPlugin(client);
    expect(w.find('#setting-timeout_ms').attributes('disabled')).toBeUndefined();
    expect(w.find('#setting-verbose').attributes('disabled')).toBeUndefined();
    w.unmount();
  });

  it('shares the Advanced preference with the server Settings page (same store)', async () => {
    const { client } = makeClient();
    const prefs = useSettingsPrefsStore();
    prefs.setAdvancedMode(true);
    const w = await openPlugin(client);
    expect(JSON.parse(localStorage.getItem('phlix-settings-prefs')!)).toEqual({
      advancedMode: true,
    });
    w.unmount();
  });

  it('omits disabled advanced keys from the save payload (partial update)', async () => {
    const { client, put } = makeClient();
    const w = await openPlugin(client);
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(Object.keys(payload.settings).sort()).toEqual(['endpoint', 'retries']);
    expect(payload.settings).not.toHaveProperty('timeout_ms');
    expect(payload.settings).not.toHaveProperty('verbose');
    w.unmount();
  });

  it('includes advanced keys once Advanced mode is on', async () => {
    const { client, put } = makeClient();
    useSettingsPrefsStore().setAdvancedMode(true);
    const w = await openPlugin(client);
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(Object.keys(payload.settings).sort()).toEqual([
      'endpoint',
      'retries',
      'timeout_ms',
      'verbose',
    ]);
    w.unmount();
  });
});

describe('PluginConfigPage — overlay help links', () => {
  it('renders a link that supplies its own anchor text', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    const link = w
      .findAll('a')
      .find((a) => a.attributes('href') === 'https://example.test/api-keys')!;
    expect(link).toBeTruthy();
    expect(link.text()).toContain('Get an API key');
    w.unmount();
  });

  it('still renders a link that has NO link_text, using a default anchor', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    const link = w
      .findAll('a')
      .find((a) => a.attributes('href') === 'https://example.test/endpoints');
    expect(link).toBeTruthy();
    expect(link!.text()).toContain('Learn more');
    w.unmount();
  });

  it('keeps external-link security attributes on overlay links', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    const link = w
      .findAll('a')
      .find((a) => a.attributes('href') === 'https://example.test/endpoints')!;
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer');
    w.unmount();
  });

  it('renders no link for a descriptor that has none', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    expect(w.findAll('a').some((a) => a.attributes('href')?.includes('retries'))).toBe(false);
    w.unmount();
  });
});
