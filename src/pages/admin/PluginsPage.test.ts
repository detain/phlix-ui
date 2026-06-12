import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import PluginsPage from './PluginsPage.vue';
import Button from '../../components/ui/Button.vue';
import Switch from '../../components/ui/Switch.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
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
    api_key: { type: 'string', required: true, secret: true, label: 'API Key', description: 'Your key' },
    page_size: { type: 'int', required: false, secret: false, label: 'Page size', description: '', default: 25 },
    extras: { type: 'bool', required: false, secret: false, label: 'Extras', description: '' },
  },
  settings: { api_key: '***', page_size: 25, extras: false },
};

interface Overrides {
  plugins?: unknown[];
  detail?: unknown;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/plugins') return { plugins: over.plugins ?? [PLUGIN_A, PLUGIN_B] };
    if (/\/api\/v1\/admin\/plugins\/[^/]+$/.test(endpoint)) return { plugin: over.detail ?? DETAIL_A };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({ manifest: {} }));
  const put = vi.fn(async () => ({ plugin: over.detail ?? DETAIL_A }));
  const del = vi.fn(async () => ({}));
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

describe('Admin PluginsPage — list', () => {
  it('loads and renders the plugin rows', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins');
    const text = w.text();
    expect(text).toContain('anidb');
    expect(text).toContain('1.2.0');
    expect(text).toContain('mal');
    w.unmount();
  });

  it('shows a skeleton while loading then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-plugins__skel').exists()).toBe(true);
    resolve({ plugins: [PLUGIN_A] });
    await flushPromises();
    expect(w.find('table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when no plugins are installed', async () => {
    const { client } = makeClient({ plugins: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No plugins installed');
    w.unmount();
  });

  it('shows an error state (+ toast) when the list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain('load plugins');
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
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
    post.mockImplementationOnce(() => new Promise((r) => { releasePost = () => r({ manifest: {} }); }));
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
});

describe('Admin PluginsPage — install', () => {
  it('submits the URL and refetches on success', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Install plugin')!.trigger('click');
    await flushPromises();
    const input = document.querySelector<HTMLInputElement>('.admin-plugins__input')!;
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
    await findBtn(w, 'Install plugin')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Install')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('URL is required'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  async function submitInstall(w: VueWrapper, url: string) {
    await findBtn(w, 'Install plugin')!.trigger('click');
    await flushPromises();
    const input = document.querySelector<HTMLInputElement>('.admin-plugins__input')!;
    input.value = url;
    input.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Install')!.trigger('click');
    await flushPromises();
  }

  it('surfaces the real plugin.install.failed code as a helpful message', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new ApiError('failed', 422, { code: 'plugin.install.failed' }));
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
    // Secret renders as a password input prefilled with the mask.
    const secret = panel.querySelector<HTMLInputElement>('input[type="password"]')!;
    expect(secret).toBeTruthy();
    expect(secret.value).toBe('***');
    // Non-secret int renders as a number input.
    expect(panel.querySelector('input[type="number"]')).toBeTruthy();
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
