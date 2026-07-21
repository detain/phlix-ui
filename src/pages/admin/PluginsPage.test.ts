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
}

/** The default (benign) update-check response: nothing to update. */
const NO_UPDATES = { auto_update: false, available: 0, updates: [] };

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/plugins') return { plugins: over.plugins ?? [PLUGIN_A, PLUGIN_B] };
    if (endpoint === '/api/v1/admin/plugins/catalog') return over.catalog ?? EMPTY_CATALOG;
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
    return { manifest: {}, sources: [DEFAULT_SOURCE] };
  });
  const put = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/plugins/auto-update') return { auto_update: over.autoUpdate ?? true };
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
    expect(panel.textContent).toContain('Not set.');
    expect(panel.textContent).not.toContain('Currently set');
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
