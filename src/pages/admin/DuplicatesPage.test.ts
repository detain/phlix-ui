/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import DuplicatesPage from './DuplicatesPage.vue';
import Button from '../../components/ui/Button.vue';
import Select from '../../components/ui/Select.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const lib = { id: 'lib-1', name: 'Movies', type: 'series', paths: ['/m'], options: {} };

function group(over: Record<string, unknown> = {}) {
  return {
    canonical_key: 'hunterxhunter',
    type: 'series',
    library_id: 'lib-1',
    primary: { id: 'p1', name: 'Hunter x Hunter', type: 'series', descendant_count: 101 },
    duplicates: [{ id: 'd1', name: 'Hunter x Hunter', type: 'series', descendant_count: 1 }],
    ...over,
  };
}

interface Overrides {
  libraries?: unknown[];
  groups?: unknown[];
  mergeResult?: Record<string, unknown>;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/libraries') return { libraries: over.libraries ?? [lib] };
    if (endpoint.endsWith('/duplicates')) return { groups: over.groups ?? [group()] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => over.mergeResult ?? { moved: 1, deleted: 2 });
  const client = { get, post, put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { client, get, post };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(DuplicatesPage, { props: { client }, attachTo: document.body });
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Admin DuplicatesPage — library picker + load', () => {
  it('lists libraries, auto-selects the first, and loads its duplicate groups', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/libraries');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/libraries/lib-1/duplicates');
    expect(w.findComponent(Select).exists()).toBe(true);
    w.unmount();
  });

  it('loads groups for a newly picked library', async () => {
    const lib2 = { ...lib, id: 'lib-2', name: 'Shows' };
    const { client, get } = makeClient({ libraries: [lib, lib2] });
    const w = mountPage(client);
    await flushPromises();
    w.findComponent(Select).vm.$emit('update:modelValue', 'lib-2');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/libraries/lib-2/duplicates');
    w.unmount();
  });

  it('shows an empty state when a library has no duplicate groups', async () => {
    const { client } = makeClient({ groups: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No duplicates');
    w.unmount();
  });

  it('shows an empty state when there are no libraries', async () => {
    const { client } = makeClient({ libraries: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No libraries yet');
    w.unmount();
  });

  it('shows an error state (+ toast) when the library list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('DB down'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.findComponent(EmptyState).text()).toContain('load libraries');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'DB down')).toBe(true);
    w.unmount();
  });

  it('shows an error state (+ toast) when the duplicate load fails', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') return { libraries: [lib] };
      throw new Error('finder boom');
    });
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load duplicates");
    expect(toasts.toasts.some((t) => t.message === 'finder boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin DuplicatesPage — group render', () => {
  it('renders the canonical key + type, marks the primary as Keep, and shows child counts', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const groupEl = w.find('[data-testid="group-hunterxhunter"]');
    expect(groupEl.exists()).toBe(true);
    const text = groupEl.text();
    expect(text).toContain('hunterxhunter');
    expect(text).toContain('series');
    expect(text).toContain('Keep');
    // Both child counts shown (primary 101, duplicate 1).
    expect(text).toContain('101 children');
    expect(text).toContain('1 children');
    w.unmount();
  });

  it('renders each duplicate as a checkbox, pre-checked by default', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const checkbox = w.find<HTMLInputElement>('[data-testid="dup-hunterxhunter-d1"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.element.checked).toBe(true);
    w.unmount();
  });
});

describe('Admin DuplicatesPage — merge', () => {
  it('Merge calls the apply API with the primary id + checked duplicate ids, then refreshes', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.filter((c) => String(c[0]).endsWith('/duplicates')).length;
    await findBtn(w, 'Merge selected')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/media/merge', {
      primary_id: 'p1',
      duplicate_ids: ['d1'],
    });
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'success' && t.message.includes('1 moved'))).toBe(true);
    // Refresh re-fetched the group list after the merge.
    const after = get.mock.calls.filter((c) => String(c[0]).endsWith('/duplicates')).length;
    expect(after).toBeGreaterThan(before);
    w.unmount();
  });

  it('only sends the duplicate ids that remain checked', async () => {
    const twoDup = group({
      duplicates: [
        { id: 'd1', name: 'A', type: 'series', descendant_count: 1 },
        { id: 'd2', name: 'B', type: 'series', descendant_count: 2 },
      ],
    });
    const { client, post } = makeClient({ groups: [twoDup] });
    const w = mountPage(client);
    await flushPromises();
    // Uncheck d2 → only d1 should be merged.
    const cb = w.find<HTMLInputElement>('[data-testid="dup-hunterxhunter-d2"]');
    cb.element.checked = false;
    await cb.trigger('change');
    await findBtn(w, 'Merge selected')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/media/merge', {
      primary_id: 'p1',
      duplicate_ids: ['d1'],
    });
    w.unmount();
  });

  it('toasts and does not call the API when nothing is checked', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // Uncheck the single duplicate.
    const cb = w.find<HTMLInputElement>('[data-testid="dup-hunterxhunter-d1"]');
    cb.element.checked = false;
    await cb.trigger('change');
    await findBtn(w, 'Merge selected')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when the merge API fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('merge boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Merge selected')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'merge boom')).toBe(true);
    w.unmount();
  });
});
