/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SharedWithMePage from './SharedWithMePage.vue';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import { api, type ApiClient } from '../api/client';

const activeShare = {
  id: 'i1',
  library_id: 'lib-1',
  library_name: 'Movies',
  server_id: 'srv-1',
  server_name: 'Home Theater',
  owner_user_id: 'u-alice',
  owner_email: 'alice@example.com',
  permission: 'read',
  status: 'active',
  created_at: '2026-05-01T00:00:00Z',
  updated_at: '2026-05-01T00:00:00Z',
};
const revokedShare = {
  ...activeShare,
  id: 'i2',
  library_name: 'Shows',
  permission: 'readwrite',
  status: 'revoked',
  created_at: '2026-06-01T00:00:00Z',
};

function makeClient(incoming: unknown[] = [activeShare]) {
  const get = vi.fn(async () => ({ incoming, outgoing: [] }));
  const client = { get } as unknown as ApiClient;
  return { client, get };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(SharedWithMePage, { props: { client }, attachTo: document.body });
}

function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('SharedWithMePage — states', () => {
  it('loads incoming shares on mount and renders a card', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/shares');
    expect(w.text()).toContain('Movies');
    expect(w.text()).toContain('Home Theater');
    expect(w.text()).toContain('alice@example.com');
    w.unmount();
  });

  it('shows a skeleton while loading', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const w = mountPage({ get } as unknown as ApiClient);
    expect(w.find('.shared-with-me__skel').exists()).toBe(true);
    resolve({ incoming: [activeShare], outgoing: [] });
    await flushPromises();
    expect(w.find('.shared-with-me__skel').exists()).toBe(false);
    w.unmount();
  });

  it('shows the empty state when nothing is shared', async () => {
    const { client } = makeClient([]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No shared libraries');
    w.unmount();
  });

  it('treats a response with no `incoming` key as empty', async () => {
    const get = vi.fn(async () => ({ outgoing: [] }));
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('No shared libraries');
    w.unmount();
  });

  it('shows an error EmptyState with a Retry that re-loads', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('shares down'))
      .mockResolvedValueOnce({ incoming: [activeShare], outgoing: [] });
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load shared libraries");
    expect(w.text()).toContain('shares down');
    await findBtnByText(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('Movies');
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ incoming: [], outgoing: [] } as never);
    const w = mount(SharedWithMePage, { attachTo: document.body });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/me/shares');
    w.unmount();
  });
});

describe('SharedWithMePage — permission + active/revoked', () => {
  it('active share shows the permission + Active badges and a Browse Library button', async () => {
    const { client } = makeClient([activeShare]);
    const w = mountPage(client);
    await flushPromises();
    const labels = w.findAllComponents(Badge).map((b) => b.text().trim());
    expect(labels).toEqual(expect.arrayContaining(['Read only', 'Active']));
    const browse = findBtnByText(w, 'Browse Library');
    expect(browse).toBeTruthy();
    // Button renders a <button>; `:to` falls through as a plain attribute.
    expect(browse!.attributes('to')).toBe('/browse/srv-1/lib-1');
    w.unmount();
  });

  it('revoked share shows the revoked label instead of a Browse button', async () => {
    const { client } = makeClient([revokedShare]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Access revoked by owner');
    expect(findBtnByText(w, 'Browse Library')).toBeFalsy();
    const labels = w.findAllComponents(Badge).map((b) => b.text().trim());
    expect(labels).toEqual(expect.arrayContaining(['Read / Write', 'Revoked']));
    w.unmount();
  });

  it('renders both active and revoked cards together', async () => {
    const { client } = makeClient([activeShare, revokedShare]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.findAll('.share-card')).toHaveLength(2);
    expect(w.findAll('.share-card--revoked')).toHaveLength(1);
    w.unmount();
  });
});
