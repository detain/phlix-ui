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

/**
 * Fixtures mirror the hub's REAL wire payload — `SharedLibraryDto::toPayload()` —
 * NOT the shape the page used to assume. Keys are snake_case, dates are UNIX
 * seconds, and there is deliberately no `status`/`owner_email`/`id`/`updated_at`:
 * `getSharedWithMe()` filters revoked shares out server-side, so every share the
 * page receives is live.
 */
const CREATED_AT = 1777593600; // 2026-05-01T00:00:00Z
const activeShare = {
  share_id: 'i1',
  owner_user_id: 'u-alice',
  owner_name: 'Alice Anderson',
  server_id: 'srv-1',
  server_name: 'Home Theater',
  library_id: 'lib-1',
  library_name: 'Movies',
  library_item_count: 0,
  permission_level: 'read',
  access_urls: ['https://home-theater.example.com'],
  created_at: CREATED_AT,
  expires_at: null as number | null,
};
/** A share whose `expires_at` is in the past — the only lifecycle state that exists. */
const expiredShare = {
  ...activeShare,
  share_id: 'i2',
  library_name: 'Shows',
  permission_level: 'readwrite',
  created_at: 1780272000, // 2026-06-01T00:00:00Z
  expires_at: 1780358400, // 2026-06-02T00:00:00Z — before the frozen "now" below
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
    expect(w.text()).toContain('Alice Anderson');
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

describe('SharedWithMePage — real hub payload is rendered as a LIVE share', () => {
  // This is the discriminating regression test for the contract mismatch that made
  // every active share render as "Access revoked by owner": the page read `status`,
  // `owner_email` and an ISO `created_at`, none of which the hub sends.
  it('renders the owner name and a valid date, and NEVER claims access was revoked', async () => {
    const { client } = makeClient([activeShare]);
    const w = mountPage(client);
    await flushPromises();

    expect(w.text()).toContain('Alice Anderson');
    expect(w.text()).not.toContain('Access revoked by owner');
    expect(w.text()).not.toContain('Invalid Date');
    expect(w.text()).toContain(new Date(CREATED_AT * 1000).toLocaleDateString());
    expect(w.findAll('.share-card--expired')).toHaveLength(0);
    w.unmount();
  });

  it('keys each card on share_id (the real key) so rows are not all `undefined`', async () => {
    const { client } = makeClient([activeShare, expiredShare]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.findAll('.share-card')).toHaveLength(2);
    w.unmount();
  });

  it('maps permission_level onto the permission badge', async () => {
    const { client } = makeClient([activeShare]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.findAllComponents(Badge).map((b) => b.text().trim())).toContain('Read only');
    w.unmount();
  });

  it('renders Read / Write for a readwrite permission_level', async () => {
    const { client } = makeClient([{ ...activeShare, permission_level: 'readwrite' }]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.findAllComponents(Badge).map((b) => b.text().trim())).toContain('Read / Write');
    w.unmount();
  });

  it('shows an em dash rather than "Invalid Date" when created_at is null', async () => {
    const { client } = makeClient([{ ...activeShare, created_at: null }]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).not.toContain('Invalid Date');
    expect(w.text()).toContain('—');
    w.unmount();
  });

  it('does not display library_item_count (the hub hardcodes it to 0)', async () => {
    const { client } = makeClient([activeShare]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).not.toMatch(/\b0 items\b/);
    expect(w.text()).not.toContain('Items');
    w.unmount();
  });

  it('sorts by created_at (unix seconds) descending, newest first', async () => {
    const { client } = makeClient([activeShare, expiredShare]);
    const w = mountPage(client);
    await flushPromises();
    // expiredShare is newer (2026-06-01) than activeShare (2026-05-01).
    const titles = w.findAll('.share-card__library').map((el) => el.text().trim());
    expect(titles).toEqual(['Shows', 'Movies']);
    w.unmount();
  });
});

describe('SharedWithMePage — expiry (derived from expires_at, not a fake status)', () => {
  it('a past expires_at renders an Expired badge and dims the card', async () => {
    const { client } = makeClient([expiredShare]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.findAllComponents(Badge).map((b) => b.text().trim())).toContain('Expired');
    expect(w.findAll('.share-card--expired')).toHaveLength(1);
    w.unmount();
  });

  it('a null expires_at renders "Never" and no Expired badge', async () => {
    const { client } = makeClient([activeShare]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Never');
    expect(w.findAllComponents(Badge).map((b) => b.text().trim())).not.toContain('Expired');
    w.unmount();
  });

  it('a future expires_at is not treated as expired', async () => {
    const future = Math.floor(Date.now() / 1000) + 86_400;
    const { client } = makeClient([{ ...activeShare, expires_at: future }]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.findAllComponents(Badge).map((b) => b.text().trim())).not.toContain('Expired');
    w.unmount();
  });
});

describe('SharedWithMePage — Open Server links to a real destination', () => {
  // The old `/browse/:serverId/:libraryId` target matched NO route in the SPA (every
  // route lives under /app), so the button was a guaranteed 404. The payload's
  // `access_urls` is the same hostname-candidate data MyServersPage opens.
  it('opens access_urls[0] in a new tab, mirroring MyServersPage', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const { client } = makeClient([activeShare]);
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Open Server')!.trigger('click');
    expect(open).toHaveBeenCalledWith(
      'https://home-theater.example.com',
      '_blank',
      'noopener,noreferrer',
    );
    w.unmount();
  });

  it('never renders a link to the non-existent /browse route', async () => {
    const { client } = makeClient([activeShare]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.html()).not.toContain('/browse/');
    w.unmount();
  });

  it('disables the button and does not open a tab when access_urls is empty', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const { client } = makeClient([{ ...activeShare, access_urls: [] }]);
    const w = mountPage(client);
    await flushPromises();
    const btn = findBtnByText(w, 'Open Server')!;
    expect(btn.attributes('disabled')).toBeDefined();
    await btn.trigger('click');
    expect(open).not.toHaveBeenCalled();
    w.unmount();
  });
});
