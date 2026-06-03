import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import WebhooksPage from './WebhooksPage.vue';
import Button from '../../components/ui/Button.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const wh1 = {
  id: 'wh-1',
  name: 'My Webhook',
  url: 'https://example.com/webhook',
  events: ['playback.started', 'library.updated'],
  created_at: '2026-05-27T00:00:00Z',
};
const wh2 = {
  id: 'wh-2',
  name: 'Alert Hook',
  url: 'https://alerts.example.com/hook',
  events: ['alert', 'recording.started'],
  created_at: '2026-05-27T00:00:00Z',
};

interface Overrides {
  webhooks?: unknown[];
  testResult?: unknown;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/webhooks') return { webhooks: over.webhooks ?? [wh1, wh2] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async (endpoint: string) => {
    if (endpoint.endsWith('/test')) {
      return over.testResult ?? { success: true, success_count: 1, failure_count: 0, failures: [] };
    }
    return { webhook: { id: 'wh-new', name: 'New', url: 'https://x.com/wh', events: ['playback.started'] } };
  });
  const put = vi.fn(async (_endpoint: string, _data?: unknown) => ({
    webhook: { id: 'wh-1', name: 'Updated', url: 'https://x.com/wh2', events: ['alert'] },
  }));
  const del = vi.fn(async () => ({ message: 'Webhook deleted' }));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(WebhooksPage, { props: { client }, attachTo: document.body });
}

/** Find a Button by its trimmed text. */
function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

/** Find a Button by trimmed text scoped to a container element. */
function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}

/** The currently-open modal panel teleported to body. */
function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1]!;
}

/** Fill the form's name / url / secret inputs (in document order). */
function fillForm(name: string, url: string, secret: string): void {
  const panel = modalPanel();
  const inputs = panel.querySelectorAll<HTMLInputElement>('.admin-webhooks__input');
  inputs[0]!.value = name;
  inputs[0]!.dispatchEvent(new Event('input'));
  inputs[1]!.value = url;
  inputs[1]!.dispatchEvent(new Event('input'));
  inputs[2]!.value = secret;
  inputs[2]!.dispatchEvent(new Event('input'));
}

/** Tick the first event checkbox in the open form. */
function checkFirstEvent(): void {
  const cb = modalPanel().querySelector<HTMLInputElement>('input[type="checkbox"]')!;
  cb.checked = true;
  cb.dispatchEvent(new Event('change'));
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Admin WebhooksPage — list', () => {
  it('loads and renders the webhook rows', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/webhooks');
    const text = w.text();
    expect(text).toContain('My Webhook');
    expect(text).toContain('Alert Hook');
    expect(text).toContain('https://example.com/webhook');
    w.unmount();
  });

  it('shows a skeleton while loading then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-webhooks__skel').exists()).toBe(true);
    resolve({ webhooks: [wh1] });
    await flushPromises();
    expect(w.find('table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when there are no webhooks', async () => {
    const { client } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No webhooks configured');
    w.unmount();
  });

  it('renders the event count badge per row', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // wh1 and wh2 each have 2 events.
    expect(w.findAll('.phlix-badge').length).toBe(2);
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the webhook list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    // R5.3d.1: the load failure renders an in-body EmptyState (error + Retry)
    // instead of the misleading "No webhooks configured", and still fires a toast.
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain('load webhooks');
    expect(w.text()).toContain('boom');
    expect(w.text()).not.toContain('No webhooks configured');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'boom')).toBe(true);
    w.unmount();
  });

  it('retries the webhook list load from the error state', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce({ webhooks: [wh1] });
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledTimes(2);
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.find('table').exists()).toBe(true);
    expect(w.text()).toContain('My Webhook');
    w.unmount();
  });
});

describe('Admin WebhooksPage — create', () => {
  it('creates a webhook via the modal form', async () => {
    const { client, post, get } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    fillForm('New', 'https://x.com/wh', 's3cr3t');
    checkFirstEvent();
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/webhooks', {
      name: 'New',
      url: 'https://x.com/wh',
      secret: 's3cr3t',
      events: ['playback.started'],
    });
    // Refetches the list after the mutation.
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/webhooks').length).toBeGreaterThan(1);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Webhook created.')).toBe(true);
    w.unmount();
  });

  it('shows all 5 event categories in the form', async () => {
    const { client } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    const text = modalPanel().textContent ?? '';
    for (const label of ['Playback', 'Library', 'Downloads', 'Recordings', 'System']) {
      expect(text).toContain(label);
    }
    w.unmount();
  });

  it('validates: requires a name', async () => {
    const { client, post } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(modalPanel().querySelector('[role="alert"]')!.textContent).toContain('Name is required');
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('validates: requires a URL', async () => {
    const { client, post } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    fillForm('Name', '', '');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(modalPanel().querySelector('[role="alert"]')!.textContent).toContain('URL is required');
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('validates: rejects an invalid URL', async () => {
    const { client, post } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    fillForm('Name', 'not-a-url', 'sec');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(modalPanel().querySelector('[role="alert"]')!.textContent).toContain('valid http');
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('validates: requires a secret when creating', async () => {
    const { client, post } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    fillForm('Name', 'https://x.com', '');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(modalPanel().querySelector('[role="alert"]')!.textContent).toContain('Secret is required');
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('validates: requires at least one event', async () => {
    const { client, post } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    fillForm('Name', 'https://x.com', 'sec');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(modalPanel().querySelector('[role="alert"]')!.textContent).toContain('at least one event');
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toggles the secret visibility', async () => {
    const { client } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    const secretInput = () =>
      modalPanel().querySelectorAll<HTMLInputElement>('.admin-webhooks__input')[2]!;
    expect(secretInput().type).toBe('password');
    await findBtnIn(w, modalPanel(), 'Show')!.trigger('click');
    await flushPromises();
    expect(secretInput().type).toBe('text');
    w.unmount();
  });

  it('un-checks an already-checked event (toggle off branch)', async () => {
    const { client, post } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    fillForm('Name', 'https://x.com', 'sec');
    checkFirstEvent(); // on
    await flushPromises();
    checkFirstEvent(); // off again
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    // No event selected → blocked by validation.
    expect(post).not.toHaveBeenCalled();
    expect(modalPanel().querySelector('[role="alert"]')!.textContent).toContain('at least one event');
    w.unmount();
  });

  it('surfaces a server error in the form alert (not a toast)', async () => {
    const { client, post } = makeClient({ webhooks: [] });
    post.mockRejectedValueOnce(new Error('URL is not a valid webhook URL'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    fillForm('Name', 'https://x.com', 'sec');
    checkFirstEvent();
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(modalPanel().querySelector('[role="alert"]')!.textContent).toContain('not a valid webhook URL');
    w.unmount();
  });

  it('cancels the add form without mutating', async () => {
    const { client, post } = makeClient({ webhooks: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add webhook')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    expect(findBtn(w, 'Create')).toBeUndefined();
    w.unmount();
  });
});

describe('Admin WebhooksPage — edit', () => {
  it('opens a pre-filled edit form (secret blank, hint shown)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit My Webhook')!.trigger('click');
    await flushPromises();
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('.admin-webhooks__input');
    expect(inputs[0]!.value).toBe('My Webhook');
    expect(inputs[1]!.value).toBe('https://example.com/webhook');
    expect(inputs[2]!.value).toBe(''); // secret never pre-filled
    expect(inputs[2]!.placeholder).toBe('(unchanged)');
    expect(modalPanel().textContent).toContain('Leave blank to keep the current secret');
    w.unmount();
  });

  it('updates a webhook without a secret in the body', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit My Webhook')!.trigger('click');
    await flushPromises();
    const nameInput = modalPanel().querySelectorAll<HTMLInputElement>('.admin-webhooks__input')[0]!;
    nameInput.value = 'Renamed';
    nameInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/webhooks/wh-1', {
      name: 'Renamed',
      url: 'https://example.com/webhook',
      events: ['playback.started', 'library.updated'],
    });
    const body = put.mock.calls[0]![1] as Record<string, unknown>;
    expect(body).not.toHaveProperty('secret');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Webhook updated.')).toBe(true);
    w.unmount();
  });

  it('includes the secret in the update body when entered', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit My Webhook')!.trigger('click');
    await flushPromises();
    const secretInput = modalPanel().querySelectorAll<HTMLInputElement>('.admin-webhooks__input')[2]!;
    secretInput.value = 'rotated';
    secretInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    const body = put.mock.calls[0]![1] as Record<string, unknown>;
    expect(body.secret).toBe('rotated');
    w.unmount();
  });
});

describe('Admin WebhooksPage — delete', () => {
  it('deletes after confirmation and refetches', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete My Webhook')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/webhooks/wh-1');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/webhooks').length).toBeGreaterThan(1);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Webhook deleted.')).toBe(true);
    w.unmount();
  });

  it('cancels the delete confirm without deleting', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete My Webhook')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when delete fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('delete boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete My Webhook')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'delete boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin WebhooksPage — test delivery', () => {
  it('shows the success result and closes the modal', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Test My Webhook')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/webhooks/wh-1/test');
    expect(modalPanel().textContent).toContain('Delivery succeeded');
    expect(modalPanel().textContent).toContain('Delivered successfully (1/1 webhooks)');
    await findBtnIn(w, modalPanel(), 'Close')!.trigger('click');
    await flushPromises();
    expect(findBtn(w, 'Close')).toBeUndefined();
    w.unmount();
  });

  it('shows the failure result', async () => {
    const { client } = makeClient({
      testResult: { success: false, success_count: 0, failure_count: 1, failures: ['Connection refused'] },
    });
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Test Alert Hook')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('Delivery failed');
    expect(modalPanel().textContent).toContain('1 of 1 webhook(s) failed');
    w.unmount();
  });

  it('shows a failure result when the test call rejects', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('test boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Test My Webhook')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('Delivery failed');
    expect(modalPanel().textContent).toContain('test boom');
    w.unmount();
  });
});
