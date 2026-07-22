/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import PluginsPage from './PluginsPage.vue';
import Button from '../../components/ui/Button.vue';
import Switch from '../../components/ui/Switch.vue';
import Select from '../../components/ui/Select.vue';
import { useToastStore } from '../../stores/useToastStore';
import { ApiError } from '../../api/client';
import type { ApiClient } from '../../api/client';

const PLUGIN_A = {
  id: 'anidb',
  name: 'anidb',
  version: '1.2.0',
  type: 'metadata',
  enabled: true,
  installed_at: '2026-06-12T00:00:00Z',
};
const PLUGIN_B = {
  id: 'mal',
  name: 'mal',
  version: '0.4.0',
  type: 'metadata',
  enabled: false,
  installed_at: '2026-06-12T00:00:00Z',
};

const DETAIL_A = {
  ...PLUGIN_A,
  settings_schema: {
    api_key: {
      type: 'string',
      required: true,
      secret: true,
      label: 'API Key',
      description: 'Your key',
      link: 'https://anidb.net/software/api',
      link_text: 'AniDB API docs',
    },
    page_size: { type: 'int', required: false, secret: false, label: 'Page size', description: '', default: 25 },
    extras: { type: 'bool', required: false, secret: false, label: 'Extras', description: '' },
  },
  settings: { api_key: '***', page_size: 25, extras: false },
  secret_status: { api_key: { set: true, length: 12 } },
};

const DEFAULT_SOURCE = 'https://github.com/detain/phlix-plugins';

/** A catalog with no plugins (the default-state mock for the lifecycle tests). */
const EMPTY_CATALOG = {
  default_source: DEFAULT_SOURCE,
  sources: [DEFAULT_SOURCE],
  catalogs: [],
  errors: [],
};

/** A catalog with one installed (anidb) + one not-installed (trakt) entry. */
const CATALOG = {
  default_source: DEFAULT_SOURCE,
  sources: [DEFAULT_SOURCE, 'https://example.com/extra.json'],
  catalogs: [
    {
      source: DEFAULT_SOURCE,
      name: 'Phlix Official Plugins',
      plugins: [
        {
          name: 'anidb',
          title: 'AniDB',
          type: 'metadata-provider',
          summary: 'Anime metadata from AniDB.',
          description: '',
          repo: 'https://github.com/detain/phlix-plugin-anidb',
          author: 'detain',
          tags: ['anime', 'metadata'],
          installed: true,
          enabled: true,
        },
        {
          name: 'trakt',
          title: 'Trakt',
          type: 'scrobbler',
          summary: 'Scrobble playback to Trakt.',
          description: '',
          repo: 'https://github.com/detain/phlix-plugin-trakt',
          author: 'detain',
          tags: ['trakt'],
          installed: false,
          enabled: false,
        },
      ],
    },
  ],
  errors: [],
};

interface Overrides {
  plugins?: unknown[];
  detail?: unknown;
  catalog?: unknown;
  updates?: unknown;
  autoUpdate?: boolean;
  channelInfo?: unknown;
}

/** The default (benign) update-check response: nothing to update. */
const NO_UPDATES = { auto_update: false, available: 0, updates: [] };

/** The default channel state: `stable` selected, with a clearly opt-in `dev` option. */
const CHANNEL_INFO = {
  channel: 'stable',
  options: [
    { value: 'stable', label: 'Stable (recommended)', description: 'The default and recommended channel.', advanced: false },
    { value: 'dev', label: 'Development (advanced)', description: 'Opt-in / advanced: tracks the moving "master" branch.', advanced: true },
  ],
};

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/plugins') return { plugins: over.plugins ?? [PLUGIN_A, PLUGIN_B] };
    if (endpoint === '/api/v1/admin/plugins/catalog') return over.catalog ?? EMPTY_CATALOG;
    if (endpoint === '/api/v1/admin/plugins/catalog/channel') return over.channelInfo ?? CHANNEL_INFO;
    if (endpoint === '/api/v1/admin/plugins/updates') return over.updates ?? NO_UPDATES;
    if (endpoint === '/api/v1/admin/plugins/auto-update') return { auto_update: over.autoUpdate ?? false };
    if (/\/api\/v1\/admin\/plugins\/[^/]+$/.test(endpoint)) return { plugin: over.detail ?? DETAIL_A };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  // Routed by endpoint so the update endpoints get their own shapes while the
  // install / enable / disable / sources paths keep the legacy `{ manifest, sources }`.
  const post = vi.fn(async (endpoint: string): Promise<Record<string, unknown>> => {
    if (endpoint === '/api/v1/admin/plugins/updates/apply') return { updated: [], failed: [] };
    if (/\/api\/v1\/admin\/plugins\/[^/]+\/update$/.test(endpoint)) return { plugin: { name: 'x', version: '2.0.0' } };
    // Credential test: `{ success, message }`. A plugin whose own test throws is
    // mapped server-side to `success:false`, so only a transport/501 failure rejects.
    if (/\/api\/v1\/admin\/plugins\/[^/]+\/test$/.test(endpoint)) {
      return { success: true, message: 'Credentials are valid.' };
    }
    return { manifest: {}, sources: [DEFAULT_SOURCE] };
  });
  const put = vi.fn(async (endpoint: string, data?: unknown) => {
    if (endpoint === '/api/v1/admin/plugins/auto-update') return { auto_update: over.autoUpdate ?? true };
    if (endpoint === '/api/v1/admin/plugins/catalog/channel') {
      const requested = (data as { channel?: string } | undefined)?.channel ?? 'stable';
      const channel = requested === 'dev' ? 'dev' : 'stable';
      return { ...CHANNEL_INFO, channel };
    }
    return { plugin: over.detail ?? DETAIL_A };
  });
  const del = vi.fn(async () => ({ sources: [DEFAULT_SOURCE] }));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(PluginsPage, { props: { client }, attachTo: document.body });
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}
function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}
function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1];
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
  // Modals teleport to <body> and a test that fails before its `unmount()` leaves
  // its panel behind. `modalPanel()` reads the LAST panel, so a stale one turns a
  // single regression into a cascade of misleading failures in later tests.
  document.body.innerHTML = '';
});

describe('Admin PluginsPage — installed list', () => {
  it('loads installed plugins + catalog and renders rows for orphan plugins', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins/catalog');
    // With an empty catalog, the installed plugins are "orphans" → table rows.
    const text = w.text();
    expect(text).toContain('anidb');
    expect(text).toContain('1.2.0');
    expect(text).toContain('mal');
    w.unmount();
  });

  it('shows a skeleton while loading then the content', async () => {
    let resolveList: (v: unknown) => void = () => {};
    const get = vi.fn((endpoint: string) => {
      if (endpoint === '/api/v1/admin/plugins/catalog') return Promise.resolve(EMPTY_CATALOG);
      if (endpoint === '/api/v1/admin/plugins/auto-update') return Promise.resolve({ auto_update: false });
      if (endpoint === '/api/v1/admin/plugins/catalog/channel') return Promise.resolve(CHANNEL_INFO);
      // Only the installed-list GET stays pending so the skeleton holds.
      return new Promise((r) => {
        resolveList = r;
      });
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-plugins__skel').exists()).toBe(true);
    resolveList({ plugins: [PLUGIN_A] });
    await flushPromises();
    // PLUGIN_A is an orphan (empty catalog) → the orphan table renders.
    expect(w.find('table').exists()).toBe(true);
    w.unmount();
  });

  it('shows the catalog empty state when nothing is installed or catalogued', async () => {
    const { client } = makeClient({ plugins: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No plugins in the catalog');
    w.unmount();
  });

  it('surfaces a list-load failure as an error state + toast', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load installed plugins");
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
    w.unmount();
  });
});

describe('Admin PluginsPage — catalog', () => {
  it('renders a card per catalog plugin with title, summary and tags', async () => {
    const { client } = makeClient({ plugins: [PLUGIN_A], catalog: CATALOG });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('AniDB');
    expect(text).toContain('Trakt');
    expect(text).toContain('Anime metadata from AniDB.');
    expect(text).toContain('anime');
    w.unmount();
  });

  it('shows Install for a not-installed entry and Configure/Uninstall for an installed one', async () => {
    const { client } = makeClient({ plugins: [PLUGIN_A], catalog: CATALOG });
    const w = mountPage(client);
    await flushPromises();
    // trakt → Install; anidb → Configure + Uninstall.
    expect(w.findAllComponents(Button).some((b) => b.attributes('aria-label') === 'Install Trakt')).toBe(true);
    expect(w.findAllComponents(Button).some((b) => b.attributes('aria-label') === 'Configure AniDB')).toBe(true);
    expect(w.findAllComponents(Button).some((b) => b.attributes('aria-label') === 'Uninstall AniDB')).toBe(true);
    w.unmount();
  });

  it('installs a catalog plugin by its repo URL and refetches', async () => {
    const { client, post, get } = makeClient({ plugins: [PLUGIN_A], catalog: CATALOG });
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Install Trakt')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/install', {
      url: 'https://github.com/detain/phlix-plugin-trakt',
    });
    // refreshAll re-fetches both the catalog and the installed list.
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/plugins/catalog').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('lists catalog sources and removes an extra (not the default)', async () => {
    const { client, del } = makeClient({ plugins: [], catalog: CATALOG });
    const w = mountPage(client);
    await flushPromises();
    // The default source has no remove button; the extra one does.
    const removeBtn = w.find('button[aria-label="Remove catalog example.com"]');
    expect(removeBtn.exists()).toBe(true);
    expect(w.find(`button[aria-label="Remove catalog detain/phlix-plugins"]`).exists()).toBe(false);
    await removeBtn.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith(
      `/api/v1/admin/plugins/catalog/sources?url=${encodeURIComponent('https://example.com/extra.json')}`,
    );
    w.unmount();
  });

  it('adds a catalog source via the modal', async () => {
    const { client, post } = makeClient({ plugins: [], catalog: CATALOG });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add catalog')!.trigger('click');
    await flushPromises();
    const input = modalPanel().querySelector<HTMLInputElement>('.admin-plugins__input')!;
    input.value = 'https://github.com/me/my-catalog';
    input.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Add')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/catalog/sources', {
      url: 'https://github.com/me/my-catalog',
    });
    w.unmount();
  });

  it('shows a per-source error when a catalog fails to load', async () => {
    const catalog = {
      default_source: DEFAULT_SOURCE,
      sources: [DEFAULT_SOURCE],
      catalogs: [],
      errors: [{ source: DEFAULT_SOURCE, error: 'HTTP 404' }],
    };
    const { client } = makeClient({ plugins: [], catalog });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load catalog");
    expect(w.text()).toContain('HTTP 404');
    w.unmount();
  });
});

describe('Admin PluginsPage — enable / disable', () => {
  it('enables a disabled plugin via the row toggle + refetches', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // PLUGIN_B (mal) is disabled → its Switch emits true.
    const malSwitch = w.findAllComponents(Switch).find((s) => s.attributes('aria-label') === 'Toggle mal');
    await malSwitch!.vm.$emit('update:modelValue', true);
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/mal/enable');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/plugins').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('disables an enabled plugin via the row toggle', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const anidbSwitch = w.findAllComponents(Switch).find((s) => s.attributes('aria-label') === 'Toggle anidb');
    await anidbSwitch!.vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/disable');
    w.unmount();
  });

  it('disables the Switch and ignores re-entrant toggles while a toggle is in flight', async () => {
    const { client, post } = makeClient();
    // Hold the enable POST open so the toggle stays in flight.
    let releasePost: () => void = () => {};
    post.mockImplementationOnce(() => new Promise((r) => { releasePost = () => r({ manifest: {}, sources: [] }); }));
    const w = mountPage(client);
    await flushPromises();
    const malSwitch = w.findAllComponents(Switch).find((s) => s.attributes('aria-label') === 'Toggle mal')!;
    await malSwitch.vm.$emit('update:modelValue', true);
    await flushPromises();
    // First call fired; while in flight the Switch is disabled.
    expect(post).toHaveBeenCalledTimes(1);
    expect(malSwitch.props('disabled')).toBe(true);
    // A re-entrant toggle is ignored (no second request).
    await malSwitch.vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(post).toHaveBeenCalledTimes(1);
    // Release the in-flight request → guard clears and the Switch re-enables.
    releasePost();
    await flushPromises();
    const malSwitchAfter = w.findAllComponents(Switch).find((s) => s.attributes('aria-label') === 'Toggle mal')!;
    expect(malSwitchAfter.props('disabled')).toBe(false);
    w.unmount();
  });

  it('toasts when enable fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('enable boom'));
    const w = mountPage(client);
    await flushPromises();
    const malSwitch = w.findAllComponents(Switch).find((s) => s.attributes('aria-label') === 'Toggle mal');
    await malSwitch!.vm.$emit('update:modelValue', true);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'enable boom')).toBe(true);
    w.unmount();
  });

  it('shows a persistent banner with the real reason when enable fails', async () => {
    const { client, post } = makeClient();
    // The server surfaces the actual PluginEnableException message via ApiError.
    post.mockRejectedValueOnce(
      new ApiError('OMDb API key not configured. Add your API key in the plugin settings.', 422, {
        error: 'OMDb API key not configured. Add your API key in the plugin settings.',
        code: 'plugin.enable.failed',
      }),
    );
    const w = mountPage(client);
    await flushPromises();
    const malSwitch = w.findAllComponents(Switch).find((s) => s.attributes('aria-label') === 'Toggle mal');
    await malSwitch!.vm.$emit('update:modelValue', true);
    await flushPromises();
    const banner = document.querySelector('.admin-plugins__install-error[role="alert"]');
    expect(banner).toBeTruthy();
    expect(banner!.textContent).toContain("Couldn't enable mal");
    expect(banner!.textContent).toContain('OMDb API key not configured');
    w.unmount();
  });
});

describe('Admin PluginsPage — install from URL', () => {
  it('submits the URL and refetches on success', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Install from URL')!.trigger('click');
    await flushPromises();
    const input = modalPanel().querySelector<HTMLInputElement>('.admin-plugins__input')!;
    input.value = 'https://example.com/p.zip';
    input.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Install')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/install', {
      url: 'https://example.com/p.zip',
    });
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/plugins').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('requires a URL', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Install from URL')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Install')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('URL is required'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  async function submitInstall(w: VueWrapper, url: string) {
    await findBtn(w, 'Install from URL')!.trigger('click');
    await flushPromises();
    const input = modalPanel().querySelector<HTMLInputElement>('.admin-plugins__input')!;
    input.value = url;
    input.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Install')!.trigger('click');
    await flushPromises();
  }

  it('surfaces the server\'s real reason for a failed install (toast + banner)', async () => {
    const { client, post } = makeClient();
    const serverMsg = 'Cannot create plugins base directory /var/www/phlix/var/plugins (Read-only file system).';
    post.mockRejectedValueOnce(new ApiError(serverMsg, 422, { code: 'plugin.install.failed' }));
    const w = mountPage(client);
    await flushPromises();
    await submitInstall(w, 'https://bad.example/x');
    const toasts = useToastStore();
    // The operator sees the actual cause (a filesystem/permissions error), not a
    // generic "couldn't download" — both as a toast and a persistent banner.
    expect(toasts.toasts.some((t) => t.message.includes('Cannot create plugins base directory'))).toBe(true);
    const banner = w.find('.admin-plugins__install-error');
    expect(banner.exists()).toBe(true);
    expect(banner.text()).toContain('Cannot create plugins base directory');
    w.unmount();
  });

  it('falls back to a generic message when the server gives no detail', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new ApiError('', 422, { code: 'plugin.install.failed' }));
    const w = mountPage(client);
    await flushPromises();
    await submitInstall(w, 'https://bad.example/x');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('could not be downloaded'))).toBe(true);
    w.unmount();
  });

  it('surfaces the real plugin.url.invalid_scheme code as a helpful message', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new ApiError('bad scheme', 400, { code: 'plugin.url.invalid_scheme' }));
    const w = mountPage(client);
    await flushPromises();
    await submitInstall(w, 'ftp://bad.example/x');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('use https://'))).toBe(true);
    w.unmount();
  });
});

describe('Admin PluginsPage — uninstall', () => {
  it('confirms before deleting', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Uninstall anidb')!.trigger('click');
    await flushPromises();
    // Not yet deleted — waiting on confirm.
    expect(del).not.toHaveBeenCalled();
    await findBtnIn(w, modalPanel(), 'Uninstall')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb');
    w.unmount();
  });

  it('cancels the uninstall confirm without deleting', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Uninstall anidb')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    w.unmount();
  });

  it('removes the plugin from the list after a successful uninstall (no manual refresh)', async () => {
    // Stateful installed-list mock: the plugin is dropped after the uninstall
    // DELETE, so the post-uninstall refetch (`refreshAll` → `loadPlugins`)
    // reflects the removal without any manual page refresh.
    let installed = [PLUGIN_A, PLUGIN_B];
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/plugins') return { plugins: installed };
      if (endpoint === '/api/v1/admin/plugins/catalog') return EMPTY_CATALOG;
      if (endpoint === '/api/v1/admin/plugins/updates') return NO_UPDATES;
      if (endpoint === '/api/v1/admin/plugins/auto-update') return { auto_update: false };
      if (/\/api\/v1\/admin\/plugins\/[^/]+$/.test(endpoint)) return { plugin: DETAIL_A };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const del = vi.fn(async () => {
      installed = installed.filter((p) => p.name !== 'anidb');
      return { uninstalled: true, name: 'anidb' };
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: del } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('anidb');
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Uninstall anidb')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Uninstall')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb');
    // The row is gone from the reactive list without a page refresh.
    expect(w.text()).not.toContain('anidb');
    expect(w.text()).toContain('mal');
    w.unmount();
  });
});

describe('Admin PluginsPage — configure', () => {
  async function openConfigure(w: VueWrapper) {
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Configure anidb')!.trigger('click');
    await flushPromises();
  }

  it('builds form fields from the settings schema', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb');
    const panel = modalPanel();
    expect(panel.textContent).toContain('API Key');
    expect(panel.textContent).toContain('Page size');
    // Secret renders as a password input that starts EMPTY (never prefilled
    // with the value or the mask).
    const secret = panel.querySelector<HTMLInputElement>('input[type="password"]')!;
    expect(secret).toBeTruthy();
    expect(secret.value).toBe('');
    // …and its stored-status is shown instead, with the length (not the value).
    expect(panel.textContent).toContain('Currently set (12 characters)');
    // A "where to get it" link is rendered from the schema.
    const link = panel.querySelector<HTMLAnchorElement>('a[href="https://anidb.net/software/api"]');
    expect(link).toBeTruthy();
    expect(link!.textContent).toContain('AniDB API docs');
    // Non-secret int renders as a number input.
    expect(panel.querySelector('input[type="number"]')).toBeTruthy();
    w.unmount();
  });

  it('shows "Not set" for an unstored secret', async () => {
    const detail = {
      ...DETAIL_A,
      settings: { ...DETAIL_A.settings, api_key: '***' },
      secret_status: { api_key: { set: false, length: 0 } },
    };
    const { client } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    expect(panel.textContent).toContain('Not set');
    expect(panel.textContent).toContain('No value is stored yet.');
    expect(panel.textContent).not.toContain('Currently set');
    // A positively-reported unset secret is NOT the unknown state.
    expect(panel.textContent).not.toContain('did not report');
    w.unmount();
  });

  /**
   * The third secret state. `secret_status` is absent from every server that
   * predates it, and reporting that absence as "Not set" asserts a secret is
   * missing when it may well be stored — which invites the admin to overwrite a
   * working credential. Unknown must read as unknown.
   */
  it('does not claim "Not set" when the server sent no secret_status at all', async () => {
    const detail = { ...DETAIL_A };
    delete (detail as { secret_status?: unknown }).secret_status;
    const { client } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const cue = panel.querySelector('#plugin-secret-status-api_key')!;
    expect(cue.textContent).toContain('did not report');
    expect(cue.textContent).not.toContain('Not set');
    expect(cue.textContent).not.toContain('Currently set');
    w.unmount();
  });

  it('flips the cue when secret_status flips, with an identical schema', async () => {
    // Proves the cue is driven by secret_status and nothing else — the schema
    // and the masked `settings` map are byte-identical across both mounts.
    const set = mountPage(makeClient({ detail: { ...DETAIL_A, secret_status: { api_key: { set: true, length: 8 } } } }).client);
    await flushPromises();
    await openConfigure(set);
    expect(modalPanel().querySelector('#plugin-secret-status-api_key')!.textContent).toContain(
      'Configured',
    );
    set.unmount();

    const unset = mountPage(makeClient({ detail: { ...DETAIL_A, secret_status: { api_key: { set: false, length: 0 } } } }).client);
    await flushPromises();
    await openConfigure(unset);
    expect(modalPanel().querySelector('#plugin-secret-status-api_key')!.textContent).toContain(
      'Not set',
    );
    unset.unmount();
  });

  it('never renders the mask sentinel, in the input or anywhere else', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    expect(panel.querySelector<HTMLInputElement>('input[type="password"]')!.value).toBe('');
    expect(panel.innerHTML).not.toContain('***');
    w.unmount();
  });

  it('keeps a real secret out of the DOM even if a server regressed and sent one', async () => {
    // Defence in depth: the seed is unconditional for secret keys, so a plaintext
    // value on the wire still never lands in the input.
    const detail = { ...DETAIL_A, settings: { ...DETAIL_A.settings, api_key: 'sk-live-leaked' } };
    const { client } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    expect(panel.querySelector<HTMLInputElement>('input[type="password"]')!.value).toBe('');
    expect(panel.innerHTML).not.toContain('sk-live-leaked');
    w.unmount();
  });

  it('renders the secret as a password field with autocomplete off', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const secret = modalPanel().querySelector<HTMLInputElement>('#plugin-setting-api_key')!;
    expect(secret.getAttribute('type')).toBe('password');
    expect(secret.getAttribute('autocomplete')).toBe('new-password');
    w.unmount();
  });

  it('describes the secret input with its status line for screen readers', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const describedBy = panel
      .querySelector('#plugin-setting-api_key')!
      .getAttribute('aria-describedby');
    expect(describedBy).toBe('plugin-secret-status-api_key');
    // The referenced node must actually exist, or the association is dead.
    expect(panel.querySelector(`#${describedBy}`)).toBeTruthy();
    w.unmount();
  });

  it('renders the status cue only for secret fields', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    expect(panel.querySelectorAll('.admin-plugins__secret-status').length).toBe(1);
    expect(panel.querySelector('#plugin-secret-status-page_size')).toBeFalsy();
    // …and the non-secret input carries no dangling describedby.
    expect(
      panel.querySelector('#plugin-setting-page_size')!.getAttribute('aria-describedby'),
    ).toBeNull();
    w.unmount();
  });

  it('associates a real <label> with each input, so clicking the label focuses it', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    for (const key of ['api_key', 'page_size']) {
      const label = panel.querySelector<HTMLLabelElement>(`label[for="plugin-setting-${key}"]`);
      expect(label).toBeTruthy();
      // htmlFor resolves only when an element with that id actually exists.
      expect(label!.control).toBe(panel.querySelector(`#plugin-setting-${key}`));
    }
    w.unmount();
  });

  /**
   * Explicit secret removal. Secret inputs start blank and blank means "keep",
   * so clearing the box cannot express "delete this". Remove is the opt-in;
   * `''` is what the server persists as an empty secret.
   */
  it('offers Remove for a configured secret and sends an empty string for it', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Remove')!.trigger('click');
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/settings', {
      settings: { api_key: '' },
    });
    w.unmount();
  });

  it('does NOT offer Remove for a secret the server reports as unset', async () => {
    const detail = { ...DETAIL_A, secret_status: { api_key: { set: false, length: 0 } } };
    const { client } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    expect(findBtnIn(w, modalPanel(), 'Remove')).toBeFalsy();
    w.unmount();
  });

  it('still offers Remove when the server sent no secret_status at all', async () => {
    // Unknown is not the same as unset — that admin may well have a stored value.
    const detail = { ...DETAIL_A };
    delete (detail as { secret_status?: unknown }).secret_status;
    const { client } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    expect(findBtnIn(w, modalPanel(), 'Remove')).toBeTruthy();
    w.unmount();
  });

  it('Undo cancels a pending removal, leaving the secret out of the payload', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Remove')!.trigger('click');
    await findBtnIn(w, panel, 'Undo')!.trigger('click');
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    // Undo leaves NOTHING pending, so the page's "no changes" short-circuit
    // fires and no request is made at all — the stored secret is untouched.
    expect(put).not.toHaveBeenCalled();
    w.unmount();
  });

  it('announces the pending removal and disables the secret input', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Remove')!.trigger('click');
    expect(panel.textContent).toContain('will be deleted when you save');
    expect(panel.textContent).not.toContain('Currently set');
    const secret = panel.querySelector<HTMLInputElement>('input[type="password"]')!;
    expect(secret.disabled).toBe(true);
    expect(secret.value).toBe('');
    w.unmount();
  });

  it('drops a half-typed replacement when Remove is clicked', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const secret = panel.querySelector<HTMLInputElement>('input[type="password"]')!;
    secret.value = 'half-typed-new-key';
    secret.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Remove')!.trigger('click');
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/settings', {
      settings: { api_key: '' },
    });
    w.unmount();
  });

  it('does NOT send an unchanged secret (preserves the stored value)', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    // Change only the (non-secret) number field; leave the masked secret as-is.
    const numberInput = panel.querySelector<HTMLInputElement>('input[type="number"]')!;
    numberInput.value = '50';
    numberInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    // Exactly { page_size: 50 } — the unchanged masked secret (api_key) is omitted.
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/settings', {
      settings: { page_size: 50 },
    });
    w.unmount();
  });

  it('sends a secret only when the admin edits it', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const secret = panel.querySelector<HTMLInputElement>('input[type="password"]')!;
    secret.value = 'brand-new-key';
    secret.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/settings', {
      settings: { api_key: 'brand-new-key' },
    });
    w.unmount();
  });

  it('shows per-field validation errors from a 400', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(
      new ApiError('invalid', 400, {
        code: 'plugin.settings.validation_failed',
        errors: { page_size: 'must be an integer' },
      }),
    );
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const numberInput = panel.querySelector<HTMLInputElement>('input[type="number"]')!;
    numberInput.value = '7';
    numberInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('must be an integer');
    w.unmount();
  });

  it('banners a validation failure inside the modal, not just as a toast', async () => {
    // The offending field can sit far below the fold in a long schema; a toast
    // is gone before the admin finds it, so the modal itself must say so.
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(
      new ApiError('invalid', 400, {
        code: 'plugin.settings.validation_failed',
        errors: { page_size: 'must be an integer' },
      }),
    );
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const numberInput = panel.querySelector<HTMLInputElement>('input[type="number"]')!;
    numberInput.value = '7';
    numberInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    const banner = modalPanel().querySelector('.admin-plugins__config-error')!;
    expect(banner).toBeTruthy();
    expect(banner.getAttribute('role')).toBe('alert');
    expect(banner.textContent).toContain('fix the errors below');
    w.unmount();
  });

  it('banners a non-validation save failure with the server reason', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new ApiError('disk is full', 500, {}));
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const numberInput = panel.querySelector<HTMLInputElement>('input[type="number"]')!;
    numberInput.value = '7';
    numberInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(modalPanel().querySelector('.admin-plugins__config-error')!.textContent).toContain(
      'disk is full',
    );
    w.unmount();
  });

  it('clears a stale save banner when the modal is reopened', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new ApiError('disk is full', 500, {}));
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    let panel = modalPanel();
    const numberInput = panel.querySelector<HTMLInputElement>('input[type="number"]')!;
    numberInput.value = '7';
    numberInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    await openConfigure(w);
    panel = modalPanel();
    expect(panel.querySelector('.admin-plugins__config-error')).toBeFalsy();
    w.unmount();
  });

  /**
   * Clearing an optional field must express "unset", not "the empty string".
   * Only `null` reaches the server as an unset value; `''` is a value in its own
   * right and would be stored as one.
   */
  it('sends null — not an empty string — for a field the admin cleared', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const numberInput = panel.querySelector<HTMLInputElement>('#plugin-setting-page_size')!;
    numberInput.value = '';
    numberInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/settings', {
      settings: { page_size: null },
    });
    w.unmount();
  });

  /**
   * `array` / `object` settings have no dedicated control — they edit as JSON in
   * a text box. Seeding must serialise (or the box shows `[object Object]`) and
   * saving must parse (or the server receives a string where it validates a
   * structured value).
   */
  it('round-trips an array setting as JSON rather than sending a raw string', async () => {
    const detail = {
      ...PLUGIN_A,
      settings_schema: {
        hosts: { type: 'array', required: false, secret: false, label: 'Hosts', description: '' },
      },
      settings: { hosts: ['a.example', 'b.example'] },
      secret_status: {},
    };
    const { client, put } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const input = panel.querySelector<HTMLInputElement>('#plugin-setting-hosts')!;
    // Seeded as JSON text, not "[object Object]" / a comma-joined blur.
    expect(input.value).toBe('["a.example","b.example"]');
    input.value = '["c.example"]';
    input.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/settings', {
      settings: { hosts: ['c.example'] },
    });
    w.unmount();
  });

  it('falls back to the raw string for malformed JSON, so the server can reject it', async () => {
    const detail = {
      ...PLUGIN_A,
      settings_schema: {
        hosts: { type: 'array', required: false, secret: false, label: 'Hosts', description: '' },
      },
      settings: { hosts: [] },
      secret_status: {},
    };
    const { client, put } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const input = panel.querySelector<HTMLInputElement>('#plugin-setting-hosts')!;
    input.value = '[not json';
    input.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/settings', {
      settings: { hosts: '[not json' },
    });
    w.unmount();
  });

  it('skips the PUT when nothing changed', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).not.toHaveBeenCalled();
    w.unmount();
  });

  it('renders a no-settings empty state for a plugin without a schema', async () => {
    const detail = { ...PLUGIN_A, settings_schema: {}, settings: {} };
    const { client } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Configure anidb')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('No configurable settings');
    w.unmount();
  });

  it('toasts when loading the detail fails', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/plugins') return { plugins: [PLUGIN_A] };
      if (endpoint === '/api/v1/admin/plugins/catalog') return EMPTY_CATALOG;
      throw new Error('detail boom');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Configure anidb')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'detail boom')).toBe(true);
    w.unmount();
  });

  // ── Test credentials ───────────────────────────────────────────────────────
  //
  // `POST /plugins/{name}/test` lets an admin check a credential BEFORE saving
  // it. Two things make it more than a thin button: the payload must obey the
  // same secret contract as save (a typed secret goes, an untouched one is
  // omitted — never the `***` mask, which the plugin would test as if it were
  // the key), and the result is only ever true of the exact values submitted, so
  // it must not outlive them.

  /** The last `settings` object posted to the test endpoint. */
  function lastTestPayload(post: ReturnType<typeof vi.fn>): Record<string, unknown> {
    const call = post.mock.calls.filter((c) => String(c[0]).endsWith('/test')).at(-1)!;
    return (call[1] as { settings: Record<string, unknown> }).settings;
  }
  const testResultEl = () => modalPanel().querySelector('.admin-plugins__test-result');

  it('tests the credentials against the server and renders the outcome', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    // No result until the admin asks for one.
    expect(testResultEl()).toBeFalsy();
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/test', { settings: {} });
    expect(testResultEl()!.textContent).toContain('Passed');
    expect(testResultEl()!.textContent).toContain('Credentials are valid.');
    w.unmount();
  });

  /**
   * The whole point of testing before saving: the value under test is the one in
   * the box, not the one on disk.
   */
  it('submits the values the admin typed, including a brand-new secret', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    const panel = modalPanel();
    const secret = panel.querySelector<HTMLInputElement>('#plugin-setting-api_key')!;
    secret.value = 'freshly-typed-key';
    secret.dispatchEvent(new Event('input'));
    const numberInput = panel.querySelector<HTMLInputElement>('#plugin-setting-page_size')!;
    numberInput.value = '50';
    numberInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    expect(lastTestPayload(post)).toEqual({ api_key: 'freshly-typed-key', page_size: 50 });
    w.unmount();
  });

  /**
   * The mask sentinel must never be submitted for a secret the admin left alone.
   * The server hands `settings` straight to third-party plugin code, so sending
   * `***` would have the plugin authenticate with the literal string `***` and
   * report a failure for a credential that is actually fine. Omitting the key is
   * correct AND sufficient: the server instantiates the entry with its persisted
   * settings first, so the stored secret is what gets tested.
   */
  it('never sends the mask sentinel for a secret the admin did not touch', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    // Dirty only the non-secret field, so the payload is provably non-empty and
    // an omitted `api_key` cannot be mistaken for "nothing was sent at all".
    const numberInput = modalPanel().querySelector<HTMLInputElement>('#plugin-setting-page_size')!;
    numberInput.value = '50';
    numberInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    const payload = lastTestPayload(post);
    expect(payload).toEqual({ page_size: 50 });
    expect('api_key' in payload).toBe(false);
    expect(Object.values(payload)).not.toContain('***');
    w.unmount();
  });

  it('renders a rejected credential as a failure, with the server reason', async () => {
    const { client, post } = makeClient();
    post.mockResolvedValueOnce({ success: false, message: 'AniDB rejected the key.' });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    const el = testResultEl()!;
    expect(el.textContent).toContain('Failed');
    expect(el.textContent).toContain('AniDB rejected the key.');
    expect(el.className).toContain('admin-plugins__test-result--failure');
    w.unmount();
  });

  /**
   * A `501 plugin.test_not_supported` means the plugin ships no
   * `testCredentials()` method at all — nothing was tested. Presenting that as a
   * failure tells the admin their working API key is bad and sends them off to
   * regenerate a perfectly good credential.
   */
  it('presents a 501 as "not supported" rather than as a failed test', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(
      new ApiError('This plugin does not support credential testing.', 501, {
        code: 'plugin.test_not_supported',
        error: 'This plugin does not support credential testing.',
      }),
    );
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    const el = testResultEl()!;
    expect(el.textContent).toContain('Not supported');
    expect(el.textContent).toContain('does not support testing credentials');
    // Emphatically NOT the failure presentation.
    expect(el.textContent).not.toContain('Failed');
    expect(el.className).not.toContain('admin-plugins__test-result--failure');
    w.unmount();
  });

  it('reports a transport failure as a failure, not as "not supported"', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new ApiError('upstream timed out', 502, {}));
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    const el = testResultEl()!;
    expect(el.textContent).toContain('Failed');
    expect(el.textContent).toContain('upstream timed out');
    expect(el.textContent).not.toContain('Not supported');
    w.unmount();
  });

  /**
   * §6.2 #18. A PASS is a claim about the exact values that were submitted. Once
   * a field changes, that claim no longer describes what is on screen — a green
   * "Credentials are valid." beside a freshly mistyped key is worse than no
   * result at all.
   */
  it('clears a stale result as soon as any field is edited', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    expect(testResultEl()!.textContent).toContain('Passed');
    const secret = modalPanel().querySelector<HTMLInputElement>('#plugin-setting-api_key')!;
    secret.value = 'a-different-key';
    secret.dispatchEvent(new Event('input'));
    await flushPromises();
    expect(testResultEl()).toBeFalsy();
    w.unmount();
  });

  /** Arming a secret for removal changes what is submitted without touching an input. */
  it('clears a stale result when a secret is armed for removal', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    expect(testResultEl()).toBeTruthy();
    await findBtnIn(w, modalPanel(), 'Remove')!.trigger('click');
    await flushPromises();
    expect(testResultEl()).toBeFalsy();
    w.unmount();
  });

  it('does not carry a result over to a different plugin', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w); // anidb
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    expect(testResultEl()!.textContent).toContain('Passed');
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    // …now configure a DIFFERENT plugin: anidb's PASS says nothing about mal.
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Configure mal')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('API Key'); // the form did open
    expect(testResultEl()).toBeFalsy();
    w.unmount();
  });

  /**
   * The result must reach a screen-reader user, and it does so through the
   * modal body's EXISTING `aria-live="polite"` — a second live region inside the
   * first makes the two announcements race.
   */
  it('announces the result through the modal body live region, not a second one', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    await findBtnIn(w, modalPanel(), 'Test credentials')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    const live = panel.querySelector('[aria-live="polite"]')!;
    expect(live).toBeTruthy();
    expect(live.contains(testResultEl())).toBe(true);
    // The result itself declares no competing live region / alert role.
    expect(testResultEl()!.getAttribute('aria-live')).toBeNull();
    expect(testResultEl()!.getAttribute('role')).toBeNull();
    w.unmount();
  });

  it('gives the Test button an accessible name naming the plugin', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    expect(findBtnIn(w, modalPanel(), 'Test credentials')!.attributes('aria-label')).toBe(
      'Test the credentials for anidb',
    );
    w.unmount();
  });

  it('offers no Test button for a plugin with no settings at all', async () => {
    const detail = { ...PLUGIN_A, settings_schema: {}, settings: {}, secret_status: {} };
    const { client } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await openConfigure(w);
    expect(findBtnIn(w, modalPanel(), 'Test credentials')).toBeFalsy();
    w.unmount();
  });
});

/**
 * Per-field help links. `link` and `link_text` are INDEPENDENTLY optional — the
 * manifest and the server's `plugin_field_help.php` overlay each supply either
 * key on its own — so a link that arrives without anchor text must still render
 * rather than being silently dropped.
 */
describe('Admin PluginsPage — configure: field help links', () => {
  const DETAIL_LINKS = {
    ...PLUGIN_A,
    settings_schema: {
      api_key: {
        type: 'string',
        required: true,
        secret: true,
        label: 'API key',
        description: 'Credential for the upstream service.',
        link: 'https://example.test/api-keys',
        link_text: 'Get an API key',
      },
      // link WITHOUT link_text — the natural authoring slip.
      endpoint: {
        type: 'string',
        required: false,
        secret: false,
        label: 'Endpoint',
        description: 'Base URL of the service.',
        link: 'https://example.test/endpoints',
      },
      retries: {
        type: 'int',
        required: false,
        secret: false,
        label: 'Retries',
        description: 'How many times to retry.',
      },
    },
    settings: { api_key: '***', endpoint: 'https://api.example.test', retries: 3 },
    secret_status: { api_key: { set: true, length: 24 } },
  };

  async function open(w: VueWrapper) {
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Configure anidb')!
      .trigger('click');
    await flushPromises();
  }

  it('renders a link that supplies its own anchor text', async () => {
    const { client } = makeClient({ detail: DETAIL_LINKS });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    const link = modalPanel().querySelector<HTMLAnchorElement>(
      'a[href="https://example.test/api-keys"]',
    );
    expect(link).toBeTruthy();
    expect(link!.textContent).toContain('Get an API key');
    w.unmount();
  });

  it('still renders a link that has NO link_text, using a default anchor', async () => {
    const { client } = makeClient({ detail: DETAIL_LINKS });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    const link = modalPanel().querySelector<HTMLAnchorElement>(
      'a[href="https://example.test/endpoints"]',
    );
    expect(link).toBeTruthy();
    expect(link!.textContent).toContain('Where to get this');
    w.unmount();
  });

  it('keeps external-link security attributes on help links', async () => {
    const { client } = makeClient({ detail: DETAIL_LINKS });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    const link = modalPanel().querySelector<HTMLAnchorElement>(
      'a[href="https://example.test/endpoints"]',
    )!;
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    w.unmount();
  });

  it('renders no link for a descriptor that has none', async () => {
    const { client } = makeClient({ detail: DETAIL_LINKS });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    const panel = modalPanel();
    // Three fields, but only two carry a link.
    expect(panel.querySelectorAll('.phlix-help-text__link').length).toBe(2);
    expect(panel.textContent).toContain('How many times to retry.');
    w.unmount();
  });
});

/**
 * OAuth redirect URL.
 *
 * `serializeDetail()` has emitted `redirect_url` all along. A scrobbler plugin
 * (Trakt, Last.fm) cannot be authorised until that exact string is pasted into
 * the provider's own application settings, and this modal is the only surface
 * that reveals it — so losing it would leave admins with no way to discover it.
 */
describe('Admin PluginsPage — configure: OAuth redirect URL', () => {
  const REDIRECT = 'https://media.example.test/api/v1/plugins/trakt/callback';
  const DETAIL_OAUTH = { ...DETAIL_A, redirect_url: REDIRECT };

  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
  });

  async function open(w: VueWrapper) {
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Configure anidb')!
      .trigger('click');
    await flushPromises();
  }

  it('renders the redirect URL verbatim so it can be pasted into the provider', async () => {
    const { client } = makeClient({ detail: DETAIL_OAUTH });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    const panel = modalPanel();
    expect(panel.textContent).toContain('Redirect URL');
    expect(panel.querySelector('.admin-plugins__redirect-value')!.textContent).toBe(REDIRECT);
    w.unmount();
  });

  it('renders nothing when the server reports no redirect URL', async () => {
    const { client } = makeClient(); // DETAIL_A has no redirect_url
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    expect(modalPanel().querySelector('.admin-plugins__redirect')).toBeFalsy();
    w.unmount();
  });

  it('still shows the redirect URL for a plugin with no configurable settings', async () => {
    // An OAuth plugin whose whole configuration happens at the provider still
    // needs its callback URL surfaced.
    const detail = { ...PLUGIN_A, settings_schema: {}, settings: {}, redirect_url: REDIRECT };
    const { client } = makeClient({ detail });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    const panel = modalPanel();
    expect(panel.textContent).toContain('No configurable settings');
    expect(panel.querySelector('.admin-plugins__redirect-value')!.textContent).toBe(REDIRECT);
    w.unmount();
  });

  it('copies the redirect URL to the clipboard', async () => {
    const { client } = makeClient({ detail: DETAIL_OAUTH });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    await findBtnIn(w, modalPanel(), 'Copy')!.trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith(REDIRECT);
    w.unmount();
  });

  it('gives the copy button an accessible name that names the plugin', async () => {
    const { client } = makeClient({ detail: DETAIL_OAUTH });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    const copy = findBtnIn(w, modalPanel(), 'Copy')!;
    expect(copy.attributes('aria-label')).toBe('Copy the redirect URL for anidb');
    w.unmount();
  });

  it('announces a successful copy in a live region as well as a toast', async () => {
    const { client } = makeClient({ detail: DETAIL_OAUTH });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    const status = () => modalPanel().querySelector('[role="status"].admin-plugins__visually-hidden')!;
    expect(status().textContent).toBe('');
    await findBtnIn(w, modalPanel(), 'Copy')!.trigger('click');
    await flushPromises();
    expect(status().textContent).toContain('copied to clipboard');
    expect(useToastStore().toasts.some((t) => t.message.includes('copied to clipboard'))).toBe(true);
    w.unmount();
  });

  it('tells the admin to copy manually when the clipboard is unavailable', async () => {
    writeText.mockRejectedValueOnce(new Error('denied'));
    const { client } = makeClient({ detail: DETAIL_OAUTH });
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    await findBtnIn(w, modalPanel(), 'Copy')!.trigger('click');
    await flushPromises();
    const status = modalPanel().querySelector('[role="status"].admin-plugins__visually-hidden')!;
    expect(status.textContent).toContain('Copy it manually');
    // …and the URL is still on screen to copy by hand.
    expect(modalPanel().querySelector('.admin-plugins__redirect-value')!.textContent).toBe(REDIRECT);
    w.unmount();
  });

  it('does not leak one plugin\'s redirect URL into the next plugin opened', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/plugins') return { plugins: [PLUGIN_A, PLUGIN_B] };
      if (endpoint === '/api/v1/admin/plugins/catalog') return EMPTY_CATALOG;
      if (endpoint === '/api/v1/admin/plugins/updates') return NO_UPDATES;
      if (endpoint === '/api/v1/admin/plugins/auto-update') return { auto_update: false };
      if (endpoint === '/api/v1/admin/plugins/anidb') return { plugin: DETAIL_OAUTH };
      return { plugin: { ...PLUGIN_B, settings_schema: {}, settings: {} } };
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await open(w);
    expect(modalPanel().querySelector('.admin-plugins__redirect-value')!.textContent).toBe(REDIRECT);
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Configure mal')!
      .trigger('click');
    await flushPromises();
    expect(modalPanel().querySelector('.admin-plugins__redirect')).toBeFalsy();
    w.unmount();
  });
});

describe('Admin PluginsPage — updates', () => {
  /** An update-check response with one actionable update (anidb → 1.3.0). */
  const UPDATES = {
    auto_update: false,
    available: 1,
    updates: [
      {
        name: 'anidb',
        installed_version: '1.2.0',
        latest_version: '1.3.0',
        update_available: true,
        repo: 'https://github.com/detain/phlix-plugin-anidb',
        checkable: true,
        error: null,
      },
      {
        name: 'mal',
        installed_version: '0.4.0',
        latest_version: '0.4.0',
        update_available: false,
        repo: null,
        checkable: true,
        error: null,
      },
    ],
  };

  it('checks for updates and toasts the summary', async () => {
    const { client, get } = makeClient({ updates: UPDATES });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Check for updates')!.trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins/updates');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === '1 update available.')).toBe(true);
    w.unmount();
  });

  it('toasts an up-to-date summary when nothing needs updating', async () => {
    const { client } = makeClient(); // default NO_UPDATES
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Check for updates')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'All plugins are up to date.')).toBe(true);
    w.unmount();
  });

  it('shows an Update button for a plugin with an update and POSTs the update + refetches', async () => {
    // PLUGIN_A (anidb) is an orphan with the empty catalog → renders a table row.
    const { client, post, get } = makeClient({ plugins: [PLUGIN_A], updates: UPDATES });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Check for updates')!.trigger('click');
    await flushPromises();
    const updateBtn = w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Update anidb');
    expect(updateBtn).toBeTruthy();
    await updateBtn!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/update');
    // refreshAll re-fetches the installed list after a successful update.
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/plugins').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('shows the Update affordance on a catalog card for an installed+updatable plugin', async () => {
    const { client } = makeClient({ plugins: [PLUGIN_A], catalog: CATALOG, updates: UPDATES });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Check for updates')!.trigger('click');
    await flushPromises();
    // anidb is an installed catalog card → its Update button is present.
    expect(w.findAllComponents(Button).some((b) => b.attributes('aria-label') === 'Update AniDB')).toBe(true);
    expect(w.text()).toContain('Update → v1.3.0');
    w.unmount();
  });

  it('toasts the update error code as a helpful message', async () => {
    const { client, post } = makeClient({ plugins: [PLUGIN_A], updates: UPDATES });
    post.mockRejectedValueOnce(new ApiError('no source', 404, { code: 'plugin.update.no_source' }));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Check for updates')!.trigger('click');
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Update anidb')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('no update source'))).toBe(true);
    w.unmount();
  });

  it('applies all updates via "Update all" and refetches', async () => {
    const { client, post } = makeClient({ plugins: [PLUGIN_A], updates: UPDATES });
    post.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/plugins/updates/apply') {
        return { updated: [{ name: 'anidb', from: '1.2.0', to: '1.3.0' }], failed: [] };
      }
      return { manifest: {}, sources: [DEFAULT_SOURCE] };
    });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Check for updates')!.trigger('click');
    await flushPromises();
    // The "Update all (N)" button appears once an update is known.
    const updateAll = w.findAllComponents(Button).find((b) => b.text().trim().startsWith('Update all'));
    expect(updateAll).toBeTruthy();
    await updateAll!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/updates/apply');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === '1 plugin updated.')).toBe(true);
    w.unmount();
  });

  it('PUTs the auto-update flag when the header Switch is toggled', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const autoSwitch = w
      .findAllComponents(Switch)
      .find((s) => s.attributes('aria-label') === 'Toggle automatic plugin updates');
    expect(autoSwitch).toBeTruthy();
    await autoSwitch!.vm.$emit('update:modelValue', true);
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/auto-update', { enabled: true });
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Auto-update enabled.')).toBe(true);
    w.unmount();
  });

  it('loads the initial auto-update value on mount', async () => {
    const { client, get } = makeClient({ autoUpdate: true });
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins/auto-update');
    const autoSwitch = w
      .findAllComponents(Switch)
      .find((s) => s.attributes('aria-label') === 'Toggle automatic plugin updates');
    expect(autoSwitch!.props('modelValue')).toBe(true);
    w.unmount();
  });
});

describe('Admin PluginsPage — catalog channel (S27)', () => {
  /** The channel Select is the one whose aria-label names the release channel. */
  function channelSelect(w: VueWrapper) {
    return w
      .findAllComponents(Select)
      .find((s) => s.props('label') === 'Catalog channel');
  }

  it('loads the channel on mount, defaults to Stable, and renders the Dev option', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins/catalog/channel');
    const sel = channelSelect(w);
    expect(sel).toBeTruthy();
    // Stable is the default selection.
    expect(sel!.props('modelValue')).toBe('stable');
    // Both options are offered, with Dev present.
    const optionValues = (sel!.props('options') as unknown as Array<{ value: string }>).map(
      (o) => o.value,
    );
    expect(optionValues).toEqual(['stable', 'dev']);
    w.unmount();
  });

  it('marks Dev opt-in/advanced with a warning once selected, and PUTs the choice', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // Stable selected → no advanced warning badge yet.
    expect(w.text()).not.toContain('Opt-in · advanced');

    const sel = channelSelect(w);
    await sel!.vm.$emit('update:modelValue', 'dev');
    await flushPromises();

    // Persisted to the endpoint.
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/catalog/channel', { channel: 'dev' });
    // Bound to the confirmed value + the opt-in/advanced labelling is shown.
    expect(sel!.props('modelValue')).toBe('dev');
    expect(w.text()).toContain('Opt-in · advanced');
    expect(w.text()).toContain('tracks the moving "master" branch');

    const toasts = useToastStore();
    expect(
      toasts.toasts.some((t) => t.message === 'Catalog channel set to Development (advanced).'),
    ).toBe(true);
    w.unmount();
  });

  it('reflects a persisted Dev channel on load with the advanced warning', async () => {
    const { client } = makeClient({
      channelInfo: {
        channel: 'dev',
        options: [
          { value: 'stable', label: 'Stable (recommended)', description: 'The default.', advanced: false },
          { value: 'dev', label: 'Development (advanced)', description: 'Opt-in / advanced: tracks master.', advanced: true },
        ],
      },
    });
    const w = mountPage(client);
    await flushPromises();
    const sel = channelSelect(w);
    expect(sel!.props('modelValue')).toBe('dev');
    expect(w.text()).toContain('Opt-in · advanced');
    w.unmount();
  });

  it('reverts the optimistic selection and shows an error toast when the PUT fails', async () => {
    const { client, put } = makeClient();
    // Force the channel PUT to reject (e.g. the server refuses an invalid
    // channel) while every other PUT keeps its normal behaviour.
    (
      put as unknown as {
        mockImplementation: (f: (endpoint: string) => Promise<unknown>) => void;
      }
    ).mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/plugins/catalog/channel') {
        throw new ApiError('Invalid catalog channel.', 400, {
          code: 'plugin.catalog.channel.invalid',
        });
      }
      return { plugin: DETAIL_A };
    });

    const w = mountPage(client);
    await flushPromises();
    const sel = channelSelect(w);
    expect(sel!.props('modelValue')).toBe('stable');

    await sel!.vm.$emit('update:modelValue', 'dev');
    await flushPromises();

    // The choice was attempted…
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/catalog/channel', { channel: 'dev' });
    // …but the optimistic selection is reverted to the previous channel, and the
    // opt-in/advanced warning never appears since the change did not take.
    expect(sel!.props('modelValue')).toBe('stable');
    expect(w.text()).not.toContain('Opt-in · advanced');

    const toasts = useToastStore();
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'error' && t.message === 'Invalid catalog channel.',
      ),
    ).toBe(true);
    // No success toast was emitted.
    expect(toasts.toasts.some((t) => t.message.startsWith('Catalog channel set to'))).toBe(false);
    w.unmount();
  });
});
