/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import FederationSharesPage from './FederationSharesPage.vue';
import Button from '../components/ui/Button.vue';
import { useToastStore } from '../stores/useToastStore';
import type { ApiClient } from '../api/client';

const incomingOffer = {
  id: 'in1',
  peer_id: 'peer-a',
  library_id: 'lib-1',
  library_name: 'Movies',
  permission: 'read',
  status: 'pending',
  offered_at: 1746057600,
  responded_at: null,
  accepted_by: null,
};
const outgoingShare = {
  id: 'out1',
  library_id: 'lib-9',
  library_name: 'Shows',
  peer_id: 'peer-b',
  permission: 'readwrite',
  status: 'accepted',
  shared_at: 1746057600,
  revoked_at: null,
};

interface Overrides {
  incoming?: unknown[];
  outgoing?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint.endsWith('/incoming')) return { incoming_offers: over.incoming ?? [incomingOffer] };
    if (endpoint.endsWith('/outgoing')) return { outgoing_shares: over.outgoing ?? [outgoingShare] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({}));
  const del = vi.fn(async () => ({}));
  const client = { get, post, delete: del } as unknown as ApiClient;
  return { client, get, post, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(FederationSharesPage, { props: { client }, attachTo: document.body });
}

function findBtnByLabel(w: VueWrapper, label: string) {
  return w.findAllComponents(Button).find((b) => b.attributes('aria-label') === label);
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('FederationSharesPage — load + tabs', () => {
  it('loads both incoming and outgoing on mount', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/federation/library-shares/incoming');
    expect(get).toHaveBeenCalledWith('/api/v1/me/federation/library-shares/outgoing');
    expect(w.text()).toContain('Movies'); // incoming (default tab)
    w.unmount();
  });

  it('switching to the Outgoing tab shows outgoing shares + peer', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const outgoingTab = w.findAll('[role="tab"]').find((t) => t.text().trim().startsWith('Outgoing'))!;
    await outgoingTab.trigger('click');
    await flushPromises();
    expect(outgoingTab.attributes('aria-selected')).toBe('true');
    expect(w.text()).toContain('Shows');
    expect(w.text()).toContain('peer-b');
    w.unmount();
  });

  it('shows the incoming empty state when there are no offers', async () => {
    const { client } = makeClient({ incoming: [], outgoing: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No incoming library share offers');
    w.unmount();
  });

  it('shows an incoming error EmptyState + toasts on failure', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/incoming')) throw new Error('incoming down');
      return { outgoing_shares: [] };
    });
    const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load incoming offers");
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'incoming down')).toBe(true);
    w.unmount();
  });
});

describe('FederationSharesPage — accept / reject', () => {
  it('Accept → POSTs the accept endpoint, toasts, and reloads', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.length;
    await findBtnByLabel(w, 'Accept share of Movies')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/me/federation/library-shares/incoming/in1/accept');
    expect(get.mock.calls.length).toBeGreaterThan(before);
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Share offer accepted.')).toBe(true);
    w.unmount();
  });

  it('Reject → POSTs the reject endpoint and toasts', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByLabel(w, 'Reject share of Movies')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/me/federation/library-shares/incoming/in1/reject');
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Share offer rejected.')).toBe(true);
    w.unmount();
  });

  it('toasts an error when accept fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('accept failed'));
    const w = mountPage(client);
    await flushPromises();
    await findBtnByLabel(w, 'Accept share of Movies')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.tone === 'error' && t.message === 'accept failed')).toBe(true);
    w.unmount();
  });

  it('disables the row buttons while an accept is in flight (per-row processing)', async () => {
    let resolvePost: (v: unknown) => void = () => {};
    const post = vi.fn(() => new Promise((r) => (resolvePost = r)));
    const get = vi.fn(async (endpoint: string) =>
      endpoint.endsWith('/incoming') ? { incoming_offers: [incomingOffer] } : { outgoing_shares: [] },
    );
    const w = mountPage({ get, post, delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    await findBtnByLabel(w, 'Accept share of Movies')!.trigger('click');
    await w.vm.$nextTick();
    expect(findBtnByLabel(w, 'Accept share of Movies')!.attributes('disabled')).toBeDefined();
    expect(findBtnByLabel(w, 'Reject share of Movies')!.attributes('disabled')).toBeDefined();
    resolvePost({});
    await flushPromises();
    w.unmount();
  });
});

describe('FederationSharesPage — revoke (outgoing)', () => {
  it('Revoke → DELETEs the outgoing share, toasts, and reloads', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const outgoingTab = w.findAll('[role="tab"]').find((t) => t.text().trim().startsWith('Outgoing'))!;
    await outgoingTab.trigger('click');
    await flushPromises();
    await findBtnByLabel(w, 'Revoke share of Shows')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/me/federation/library-shares/outgoing/out1');
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Share revoked.')).toBe(true);
    w.unmount();
  });

  it('shows the outgoing empty state when there are no shares', async () => {
    const { client } = makeClient({ incoming: [], outgoing: [] });
    const w = mountPage(client);
    await flushPromises();
    const outgoingTab = w.findAll('[role="tab"]').find((t) => t.text().trim().startsWith('Outgoing'))!;
    await outgoingTab.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('No outgoing library shares');
    w.unmount();
  });

  it('toasts an error when revoke fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('revoke failed'));
    const w = mountPage(client);
    await flushPromises();
    const outgoingTab = w.findAll('[role="tab"]').find((t) => t.text().trim().startsWith('Outgoing'))!;
    await outgoingTab.trigger('click');
    await flushPromises();
    await findBtnByLabel(w, 'Revoke share of Shows')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.tone === 'error' && t.message === 'revoke failed')).toBe(true);
    w.unmount();
  });
});
