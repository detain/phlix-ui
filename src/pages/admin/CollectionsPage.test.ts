import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import CollectionsPage from './CollectionsPage.vue';
import Button from '../../components/ui/Button.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const colA = {
  id: 'col-1',
  name: 'Action Movies',
  library_id: 'lib-1',
  item_count: 5,
  created_at: '2026-05-27T00:00:00Z',
};
const colB = {
  id: 'col-2',
  name: 'Comedies',
  library_id: 'lib-1',
  item_count: 0,
  created_at: '2026-05-26T00:00:00Z',
};
const itemA = { id: 'item-1', title: 'First Film' };
const itemB = { id: 'item-2' };

interface Overrides {
  collections?: unknown[];
  items?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/collections') return { collections: over.collections ?? [colA, colB] };
    if (/\/api\/v1\/collections\/[^/]+$/.test(endpoint)) {
      return { collection: colA, items: over.items ?? [itemA, itemB] };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({ message: 'ok', collection: colA }));
  const put = vi.fn(async () => ({ message: 'ok', collection: colA }));
  const del = vi.fn(async () => ({ message: 'ok' }));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(CollectionsPage, { props: { client }, attachTo: document.body });
}

/** Find a Button by its (trimmed) text. */
function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

/** Find a Button by trimmed text but only inside `root` (a teleported panel). */
function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}

/** The last (currently-open) modal panel teleported to body. */
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

describe('Admin CollectionsPage — list', () => {
  it('loads and renders the collection rows', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/collections');
    const text = w.text();
    expect(text).toContain('Action Movies');
    expect(text).toContain('Comedies');
    expect(text).toContain('5');
    w.unmount();
  });

  it('shows a skeleton while loading then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-collections__skel').exists()).toBe(true);
    resolve({ collections: [colA] });
    await flushPromises();
    expect(w.find('table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when there are no collections', async () => {
    const { client } = makeClient({ collections: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No collections yet');
    w.unmount();
  });

  it('toasts when the list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin CollectionsPage — create / edit / delete', () => {
  it('creates a collection via the modal form', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'New collection')!.trigger('click');
    await flushPromises();
    const inputs = document.querySelectorAll<HTMLInputElement>('.phlix-modal__panel .admin-collections__input');
    inputs[0].value = 'Thrillers'; inputs[0].dispatchEvent(new Event('input'));
    // library prefilled from collections[0]; override it.
    inputs[1].value = 'lib-9'; inputs[1].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/collections', { name: 'Thrillers', library_id: 'lib-9' });
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/collections').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('requires a name on create', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'New collection')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Name is required.')).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('requires a library on create when none is prefilled', async () => {
    const { client, post } = makeClient({ collections: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'New collection')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.phlix-modal__panel .admin-collections__input')!;
    nameInput.value = 'Docs'; nameInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Library is required.')).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when create fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('create boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'New collection')!.trigger('click');
    await flushPromises();
    const inputs = document.querySelectorAll<HTMLInputElement>('.phlix-modal__panel .admin-collections__input');
    inputs[0].value = 'Thrillers'; inputs[0].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'create boom')).toBe(true);
    w.unmount();
  });

  it('cancels the add form without mutating', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'New collection')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    expect(findBtn(w, 'Create')).toBeUndefined();
    w.unmount();
  });

  it('edits a collection (name only, no library field)', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit Action Movies')!.trigger('click');
    await flushPromises();
    // Edit modal exposes only the name field.
    const inputs = document.querySelectorAll<HTMLInputElement>('.phlix-modal__panel .admin-collections__input');
    expect(inputs.length).toBe(1);
    inputs[0].value = 'Renamed'; inputs[0].dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/collections/col-1', { name: 'Renamed' });
    w.unmount();
  });

  it('toasts when an edit (PUT) fails', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new Error('update boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit Action Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'update boom')).toBe(true);
    w.unmount();
  });

  it('deletes a collection after confirmation', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Action Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/collections/col-1');
    w.unmount();
  });

  it('toasts when deleting fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('delete boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Action Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'delete boom')).toBe(true);
    w.unmount();
  });

  it('cancels the delete confirm without deleting', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Action Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    w.unmount();
  });
});

describe('Admin CollectionsPage — refresh', () => {
  it('refreshes a collection from the row action', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Refresh Action Movies')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/collections/col-1/refresh');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Collection refreshed.')).toBe(true);
    w.unmount();
  });

  it('toasts when refresh fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('refresh boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Refresh Action Movies')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'refresh boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin CollectionsPage — items modal', () => {
  async function openItems(w: VueWrapper) {
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'View items in Action Movies')!.trigger('click');
    await flushPromises();
  }

  it('loads the items and renders titles (id fallback)', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    expect(get).toHaveBeenCalledWith('/api/v1/collections/col-1');
    expect(document.body.textContent).toContain('First Film');
    // itemB has no title → renders its id.
    expect(document.body.textContent).toContain('item-2');
    w.unmount();
  });

  it('shows an items skeleton while loading then the table', async () => {
    let resolveItems: (v: unknown) => void = () => {};
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/collections') return { collections: [colA] };
      return new Promise((r) => { resolveItems = r; });
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    expect(modalPanel().querySelector('.admin-collections__skel')).toBeTruthy();
    resolveItems({ collection: colA, items: [itemA] });
    await flushPromises();
    expect(document.body.textContent).toContain('First Film');
    w.unmount();
  });

  it('shows an empty state when the collection has no items', async () => {
    const { client } = makeClient({ items: [] });
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    expect(document.body.textContent).toContain('No items in this collection.');
    w.unmount();
  });

  it('toasts when items fail to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/collections') return { collections: [colA] };
      throw new Error('items boom');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'items boom')).toBe(true);
    w.unmount();
  });

  it('removes an item and refetches', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    const before = get.mock.calls.filter((c) => c[0] === '/api/v1/collections/col-1').length;
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Remove First Film')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/collections/col-1/items/item-1');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/collections/col-1').length).toBeGreaterThan(before);
    w.unmount();
  });

  it('toasts when removing an item fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('remove boom'));
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Remove First Film')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'remove boom')).toBe(true);
    w.unmount();
  });

  it('bulk-adds items by query', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    const bulkInput = modalPanel().querySelector<HTMLInputElement>('.admin-collections__bulk .admin-collections__input')!;
    bulkInput.value = 'genre:action'; bulkInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Add')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/collections/col-1/bulk-add', { query: 'genre:action' });
    w.unmount();
  });

  it('requires a query before bulk-adding', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    await findBtnIn(w, modalPanel(), 'Add')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('query is required'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when bulk-add fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('bulk boom'));
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    const bulkInput = modalPanel().querySelector<HTMLInputElement>('.admin-collections__bulk .admin-collections__input')!;
    bulkInput.value = 'genre:action'; bulkInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Add')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'bulk boom')).toBe(true);
    w.unmount();
  });

  it('closes the items modal via Close', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await openItems(w);
    expect(document.body.textContent).toContain('First Film');
    await findBtnIn(w, modalPanel(), 'Close')!.trigger('click');
    await flushPromises();
    expect(findBtn(w, 'Close')).toBeUndefined();
    w.unmount();
  });
});
