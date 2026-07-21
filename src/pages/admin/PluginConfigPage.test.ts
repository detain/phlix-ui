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

function makeClient(
  over: {
    putImpl?: ReturnType<typeof vi.fn>;
    /**
     * Override `secret_status`; pass `null` to omit it entirely, standing in for
     * a server too old to emit it.
     */
    secretStatus?: Record<string, { set: boolean; length: number }> | null;
  } = {},
) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/plugins') return { plugins: [PLUGIN] };
    if (endpoint === '/api/v1/admin/plugins/acme') {
      return {
        plugin: {
          ...PLUGIN,
          settings_schema: SCHEMA,
          // `api_key` is `secret: true`, so the server has already replaced its
          // real value with the mask sentinel — a configured secret and an empty
          // one are byte-identical here. Only `secret_status` tells them apart.
          settings: {
            api_key: '***',
            endpoint: 'https://api.example.test',
            retries: 3,
            timeout_ms: 5000,
            verbose: 'false',
          },
          ...(over.secretStatus === null
            ? {}
            : { secret_status: over.secretStatus ?? { api_key: { set: true, length: 24 } } }),
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

/**
 * Masked-secret UX (mirrors the SettingsPage treatment in 48c31b8).
 *
 * The server replaces every `secret: true` value with `***` before it leaves the
 * process, so `settings.api_key` reads identically whether the secret is
 * configured or empty. These assert the CONSEQUENCES of the fix rather than its
 * flags: the sentinel never reaches the DOM, an untouched secret never reaches
 * the payload (so the stored value survives), a typed one does, and the
 * Configured/Not set cue tracks `secret_status` and nothing else.
 */
describe('PluginConfigPage — masked secrets + secret_status', () => {
  const secretInput = (w: VueWrapper) => w.find('#setting-api_key');
  const secretValue = (w: VueWrapper) =>
    (secretInput(w).element as HTMLInputElement).value;

  it('never renders the mask sentinel, in the input or anywhere else', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    expect(secretValue(w)).toBe('');
    expect(w.html()).not.toContain('***');
    w.unmount();
  });

  it('keeps a real secret out of the DOM even if a server regressed and sent one', async () => {
    // Defence in depth: the seed is unconditional for secret keys, so a plaintext
    // value on the wire still never lands in the input.
    const { client } = makeClient();
    const get = client.get as unknown as ReturnType<typeof vi.fn>;
    get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/plugins') return { plugins: [PLUGIN] };
      return {
        plugin: {
          ...PLUGIN,
          settings_schema: SCHEMA,
          settings: { api_key: 'sk-live-leaked-secret', endpoint: 'https://api.example.test' },
          secret_status: { api_key: { set: true, length: 21 } },
        },
      };
    });
    const w = await openPlugin(client);
    expect(secretValue(w)).toBe('');
    expect(w.html()).not.toContain('sk-live-leaked-secret');
    w.unmount();
  });

  it('renders the secret as a password field, not a plaintext one', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    expect(secretInput(w).attributes('type')).toBe('password');
    expect(secretInput(w).attributes('autocomplete')).toBe('new-password');
    w.unmount();
  });

  it('omits an untouched secret from the save payload, so the stored value survives', async () => {
    const { client, put } = makeClient();
    const w = await openPlugin(client);
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(payload.settings).not.toHaveProperty('api_key');
    w.unmount();
  });

  it('includes a secret the admin actually typed', async () => {
    const { client, put } = makeClient();
    const w = await openPlugin(client);
    await secretInput(w).setValue('brand-new-key');
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(payload.settings.api_key).toBe('brand-new-key');
    w.unmount();
  });

  it('omits a secret typed and then cleared, rather than wiping the stored value', async () => {
    const { client, put } = makeClient();
    const w = await openPlugin(client);
    await secretInput(w).setValue('oops');
    await secretInput(w).setValue('');
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(payload.settings).not.toHaveProperty('api_key');
    w.unmount();
  });

  it('shows a Configured cue with the stored length when secret_status.set is true', async () => {
    const { client } = makeClient({ secretStatus: { api_key: { set: true, length: 24 } } });
    const w = await openPlugin(client);
    const cue = w.find('#secret-status-api_key');
    expect(cue.text()).toContain('Configured');
    expect(cue.text()).toContain('24 characters');
    w.unmount();
  });

  it('shows a Not set cue when secret_status.set is false', async () => {
    const { client } = makeClient({ secretStatus: { api_key: { set: false, length: 0 } } });
    const w = await openPlugin(client);
    const cue = w.find('#secret-status-api_key');
    expect(cue.text()).toContain('Not set');
    expect(cue.text()).not.toContain('Configured');
    w.unmount();
  });

  it('flips the cue when secret_status flips, with an identical schema', async () => {
    // Proves the indicator is driven by secret_status and nothing else — the
    // schema and the masked `settings` map are byte-identical across both cases.
    const set = await openPlugin(makeClient({ secretStatus: { api_key: { set: true, length: 8 } } }).client);
    expect(set.find('#secret-status-api_key').text()).toContain('Configured');
    set.unmount();

    const unset = await openPlugin(
      makeClient({ secretStatus: { api_key: { set: false, length: 0 } } }).client,
    );
    expect(unset.find('#secret-status-api_key').text()).toContain('Not set');
    unset.unmount();
  });

  it('does not claim "Not set" when the server sent no secret_status at all', async () => {
    // An older server omits the map entirely. Unknown must not be reported as
    // "nothing is configured" — that would invite an admin to overwrite a good
    // secret believing none was stored.
    const { client } = makeClient({ secretStatus: null });
    const w = await openPlugin(client);
    const cue = w.find('#secret-status-api_key');
    expect(cue.text()).not.toContain('Not set');
    expect(cue.text()).not.toContain('Configured');
    expect(cue.text()).toContain('did not report');
    w.unmount();
  });

  it('describes the secret input with its status line for screen readers', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    const describedBy = secretInput(w).attributes('aria-describedby');
    expect(describedBy).toBe('secret-status-api_key');
    // The referenced node must actually exist, or the association is dead.
    expect(w.find(`#${describedBy}`).exists()).toBe(true);
    w.unmount();
  });

  it('renders the status cue only for secret fields', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    expect(w.findAll('.admin-plugin-config__secret-status').length).toBe(1);
    expect(w.find('#secret-status-endpoint').exists()).toBe(false);
    w.unmount();
  });
});

/**
 * Explicit secret removal.
 *
 * Secret inputs start blank and a blank field means "keep the stored value", so
 * clearing the box cannot express "delete this". Remove is the explicit opt-in;
 * `''` is what the server persists as an empty secret (it skips a secret only
 * when the submitted value is the mask sentinel).
 */
describe('PluginConfigPage — removing a stored secret', () => {
  const removeBtn = (w: VueWrapper) =>
    w.findAllComponents(Button).find((b) => b.text().trim() === 'Remove');
  const undoBtn = (w: VueWrapper) =>
    w.findAllComponents(Button).find((b) => b.text().trim() === 'Undo');
  const cue = (w: VueWrapper) => w.find('#secret-status-api_key').text();

  it('offers Remove for a configured secret', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    expect(removeBtn(w)).toBeTruthy();
    w.unmount();
  });

  it('does NOT offer Remove for a secret the server reports as unset', async () => {
    const { client } = makeClient({ secretStatus: { api_key: { set: false, length: 0 } } });
    const w = await openPlugin(client);
    expect(removeBtn(w)).toBeFalsy();
    w.unmount();
  });

  it('still offers Remove when the server sent no secret_status at all', async () => {
    // Unknown ≠ unset — an older server's admin must not lose the ability to clear.
    const { client } = makeClient({ secretStatus: null });
    const w = await openPlugin(client);
    expect(removeBtn(w)).toBeTruthy();
    w.unmount();
  });

  it('sends an empty string for a removed secret, which is what clears it', async () => {
    const { client, put } = makeClient();
    const w = await openPlugin(client);
    await removeBtn(w)!.trigger('click');
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(payload.settings.api_key).toBe('');
    w.unmount();
  });

  it('Undo cancels a pending removal, leaving the secret out of the payload', async () => {
    const { client, put } = makeClient();
    const w = await openPlugin(client);
    await removeBtn(w)!.trigger('click');
    await undoBtn(w)!.trigger('click');
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(payload.settings).not.toHaveProperty('api_key');
    w.unmount();
  });

  it('announces the pending removal and disables the input', async () => {
    const { client } = makeClient();
    const w = await openPlugin(client);
    await removeBtn(w)!.trigger('click');
    expect(cue(w)).toContain('Will be removed');
    expect(cue(w)).not.toContain('Configured');
    expect(w.find('#setting-api_key').attributes('disabled')).toBeDefined();
    w.unmount();
  });

  it('drops a half-typed replacement when Remove is clicked', async () => {
    // The two intents are mutually exclusive; the last one clicked wins and a
    // stale keystroke must not ride along with the removal.
    const { client, put } = makeClient();
    const w = await openPlugin(client);
    await w.find('#setting-api_key').setValue('half-typed-new-key');
    await removeBtn(w)!.trigger('click');
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(payload.settings.api_key).toBe('');
    w.unmount();
  });

  it('clears a pending removal when a different plugin is selected', async () => {
    const { client, put } = makeClient();
    const w = await openPlugin(client);
    await removeBtn(w)!.trigger('click');
    // Collapse (deselect) and reopen — the armed state must not survive.
    await w.find('.admin-plugin-config__plugin-btn').trigger('click');
    await flushPromises();
    await w.find('.admin-plugin-config__plugin-btn').trigger('click');
    await flushPromises();
    await saveBtn(w).trigger('click');
    await flushPromises();
    const payload = put.mock.calls[0]![1] as { settings: Record<string, unknown> };
    expect(payload.settings).not.toHaveProperty('api_key');
    w.unmount();
  });
});
