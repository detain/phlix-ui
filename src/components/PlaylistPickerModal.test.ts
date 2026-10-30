/**
 * PlaylistPickerModal (R13-01) — pins the pick-existing-or-create contract,
 * including the two-leg create law that moved here from the deleted
 * window.prompt flows in MediaCard / MediaDetail:
 *   - create sends the item's OWN library_id (server 400s without it);
 *   - landing the item is the SECOND leg (server create never adds);
 *   - leg-2 failure offers an UNDO that deletes the stray empty playlist
 *     (R13-10);
 *   - no library_id ⇒ the create tab fails loud with zero requests, while
 *     existing-playlist adds stay available (adds need no library server-side).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import PlaylistPickerModal from './PlaylistPickerModal.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import type { ApiClient, PlaylistSummary } from '../api/client';

const PLAYLISTS: PlaylistSummary[] = [
  {
    id: 'pl1',
    name: 'Faves',
    library_id: 'lib-1',
    smart_playlist_id: null,
    created_at: '2026-10-01 10:00:00',
    updated_at: '2026-10-02 10:00:00',
    created_by: 'u1',
  },
  {
    id: 'pl2',
    name: 'Road trips',
    library_id: 'lib-1',
    smart_playlist_id: null,
    created_at: '2026-10-01 10:00:00',
    updated_at: '2026-10-02 11:00:00',
    created_by: 'u1',
  },
];

function target(overrides: Record<string, unknown> = {}) {
  return { id: 'm1', name: 'Dune', library_id: 'lib-1', ...overrides };
}

/** Raw vi.fn() bag (kept un-erased so tests can re-mock per case); cast to
 *  ApiClient only at the props boundary. */
function fakeClient() {
  return {
    getPlaylists: vi.fn().mockResolvedValue(PLAYLISTS),
    addToPlaylist: vi.fn().mockResolvedValue({ message: 'Item added to collection' }),
    createPlaylist: vi.fn().mockResolvedValue({ id: 'pl-new', name: 'Fresh' }),
    deletePlaylist: vi.fn().mockResolvedValue({ message: 'ok' }),
  };
}

type FakeClient = ReturnType<typeof fakeClient>;

function mountPicker(client: FakeClient, item: Record<string, unknown> | null = target()) {
  return mount(PlaylistPickerModal, {
    props: { modelValue: true, item: item as never, client: client as unknown as ApiClient },
    attachTo: document.body,
  });
}

describe('PlaylistPickerModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    document.body.innerHTML = '';
    // Default session owns both fixture playlists (created_by 'u1') → the
    // baseline add/create flows stay available. Manageability-law tests below
    // re-sign-in as a member who does NOT own them.
    useAuthStore().user = { id: 'u1' };
  });

  it('opens on the Existing tab, loads playlists, and pre-selects the first', async () => {
    const client = fakeClient();
    mountPicker(client);
    await flushPromises();

    expect(client.getPlaylists).toHaveBeenCalledTimes(1);
    // Footer Add is enabled because a playlist is pre-selected.
    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    expect(addBtn).toBeDefined();
    expect(addBtn?.disabled).toBe(false);
  });

  it('existing tab → addToPlaylist(selected, itemId) + success toast + close', async () => {
    const client = fakeClient();
    const w = mountPicker(client);
    await flushPromises();
    const toasts = useToastStore();
    const success = vi.spyOn(toasts, 'success');

    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    (addBtn as HTMLButtonElement).click();
    await flushPromises();

    expect(client.createPlaylist).not.toHaveBeenCalled();
    expect(client.addToPlaylist).toHaveBeenCalledWith('pl1', 'm1');
    expect(success).toHaveBeenCalledWith('Added to playlist “Faves”');
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('existing tab → a failed add surfaces honestly and keeps the dialog open', async () => {
    const client = fakeClient();
    client.addToPlaylist.mockRejectedValue(new Error('collection.items failed'));
    const w = mountPicker(client);
    await flushPromises();
    const error = vi.spyOn(useToastStore(), 'error');

    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    (addBtn as HTMLButtonElement).click();
    await flushPromises();

    expect(error).toHaveBeenCalledWith('Failed to add to playlist', {
      message: 'collection.items failed',
    });
    expect(w.emitted('update:modelValue')).toBeUndefined();
  });

  it('new tab → two legs: createPlaylist(name, item.library_id) then addToPlaylist(created.id, itemId)', async () => {
    const client = fakeClient();
    const w = mountPicker(client);
    await flushPromises();
    const success = vi.spyOn(useToastStore(), 'success');

    // Switch to the New tab and type a name.
    const newTab = Array.from(document.querySelectorAll('[role="radio"]')).find(
      (b) => b.textContent?.trim() === 'New playlist',
    );
    (newTab as HTMLElement).click();
    await flushPromises();
    await typeNewName('Fresh');

    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    (addBtn as HTMLButtonElement).click();
    await flushPromises();

    expect(client.createPlaylist).toHaveBeenCalledTimes(1);
    expect(client.createPlaylist).toHaveBeenCalledWith('Fresh', 'lib-1');
    expect(client.addToPlaylist).toHaveBeenCalledWith('pl-new', 'm1');
    expect(success).toHaveBeenCalledWith('Added to playlist “Fresh”');
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('new tab → leg-2 failure reports the created playlist AND offers an undo that deletes it (R13-10)', async () => {
    const client = fakeClient();
    client.addToPlaylist.mockRejectedValue(new Error('collection.items failed'));
    mountPicker(client);
    await flushPromises();

    const newTab = Array.from(document.querySelectorAll('[role="radio"]')).find(
      (b) => b.textContent?.trim() === 'New playlist',
    );
    (newTab as HTMLElement).click();
    await flushPromises();
    await typeNewName('Fresh');

    const error = vi.spyOn(useToastStore(), 'error');
    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    (addBtn as HTMLButtonElement).click();
    await flushPromises();

    expect(client.createPlaylist).toHaveBeenCalledTimes(1);
    const call = error.mock.calls.find(([msg]) => String(msg).startsWith('Playlist created'));
    expect(call).toBeDefined();
    const opts = call?.[1] as { message: string; action?: { label: string; onClick: () => void } };
    expect(opts.message).toBe('collection.items failed');
    expect(opts.action?.label).toBe('Delete empty playlist');

    // Fire the offered UNDO — the stray empty playlist gets deleted.
    const success = vi.spyOn(useToastStore(), 'success');
    opts.action!.onClick();
    await flushPromises();
    expect(client.deletePlaylist).toHaveBeenCalledWith('pl-new');
    expect(success).toHaveBeenCalledWith('Empty playlist deleted');
  });

  it('new tab → an item without a library_id shows the fail-loud note and sends no request', async () => {
    const client = fakeClient();
    mountPicker(client, target({ library_id: null }));
    await flushPromises();

    const newTab = Array.from(document.querySelectorAll('[role="radio"]')).find(
      (b) => b.textContent?.trim() === 'New playlist',
    );
    (newTab as HTMLElement).click();
    await flushPromises();

    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    expect((addBtn as HTMLButtonElement).disabled).toBe(true);
    expect(document.body.textContent).toContain('no owning library id');
    expect(client.createPlaylist).not.toHaveBeenCalled();
  });

  it('empty account → the Existing tab shows the “No playlists yet” state', async () => {
    const client = fakeClient();
    client.getPlaylists.mockResolvedValue([]);
    mountPicker(client);
    await flushPromises();

    expect(document.body.textContent).toContain('No playlists yet');
    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    expect((addBtn as HTMLButtonElement).disabled).toBe(true);
  });

  // ── Option-A manageability law (visibility ≠ modifiability) ────────────────
  // The server lists own + legacy NULL-owner rows to every member but 404s
  // writes on rows the actor cannot manage. The picker therefore shows those
  // rows DISABLED (never pre-selected, never addable) — see utils/
  // playlistPermissions for the single source of the rule.

  /** Combobox options as rendered (the list stays in the DOM while closed). */
  function renderedOptions(): Array<{ text: string; disabled: boolean }> {
    return Array.from(
      document.querySelectorAll<HTMLElement>('.phlix-combobox__option'),
    ).map((li) => ({
      text: li.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      disabled: li.getAttribute('aria-disabled') === 'true',
    }));
  }

  it('member sees foreign-owned rows as disabled “read-only” options, none pre-selected', async () => {
    useAuthStore().user = { id: 'someone-else' };
    const client = fakeClient();
    mountPicker(client);
    await flushPromises();

    const opts = renderedOptions();
    expect(opts.length).toBe(2);
    expect(opts.every((o) => o.disabled)).toBe(true);
    expect(opts[0].text).toContain('Faves');
    expect(opts[0].text).toContain('(shared — read-only)');
    // Nothing manageable ⇒ Add stays disabled and clicks fire zero requests.
    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    expect((addBtn as HTMLButtonElement).disabled).toBe(true);
    (addBtn as HTMLButtonElement).click();
    await flushPromises();
    expect(client.addToPlaylist).not.toHaveBeenCalled();
  });

  it('member: NULL-owner row disabled, own row pre-selected and addable (mixed list)', async () => {
    const client = fakeClient();
    client.getPlaylists.mockResolvedValue([
      { ...PLAYLISTS[0], id: 'legacy', name: 'Heritage', created_by: null },
      PLAYLISTS[1],
    ] as PlaylistSummary[]);
    mountPicker(client);
    await flushPromises();

    const opts = renderedOptions();
    expect(opts[0].disabled).toBe(true); // heritage NULL row visible but inert
    expect(opts[1].disabled).toBe(false); // own row
    // Pre-selection skipped the disabled row and landed on the own one.
    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    expect((addBtn as HTMLButtonElement).disabled).toBe(false);
    (addBtn as HTMLButtonElement).click();
    await flushPromises();
    expect(client.addToPlaylist).toHaveBeenCalledWith('pl2', 'm1');
  });

  it('admin: NULL-owner row is manageable — selectable and addable', async () => {
    useAuthStore().user = { id: 'admin-1', is_admin: true };
    const client = fakeClient();
    client.getPlaylists.mockResolvedValue([
      { ...PLAYLISTS[0], created_by: null },
    ] as PlaylistSummary[]);
    mountPicker(client);
    await flushPromises();

    const opts = renderedOptions();
    expect(opts[0].disabled).toBe(false);
    const addBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Add',
    );
    expect((addBtn as HTMLButtonElement).disabled).toBe(false);
    (addBtn as HTMLButtonElement).click();
    await flushPromises();
    expect(client.addToPlaylist).toHaveBeenCalledWith('pl1', 'm1');
  });

  it('footer “Manage playlists →” appears only with the route registered', async () => {
    const client = fakeClient();
    mountPicker(client);
    await flushPromises();
    // Router-less mount (this helper) ⇒ no dead link.
    expect(document.querySelector('[data-testid="picker-manage-playlists"]')).toBeNull();

    // Router-mounted picker with the playlists route ⇒ live RouterLink.
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/app/playlists', name: 'playlists', component: { template: '<div />' } },
      ],
    });
    await router.push('/app/playlists');
    await router.isReady();
    mount(PlaylistPickerModal, {
      props: { modelValue: true, item: target() as never, client: client as unknown as ApiClient },
      attachTo: document.body,
      global: { plugins: [router] },
    });
    await flushPromises();

    const link = document.querySelector<HTMLAnchorElement>('[data-testid="picker-manage-playlists"]');
    expect(link).not.toBeNull();
    expect(link?.textContent?.trim()).toBe('Manage playlists →');
    expect(link?.getAttribute('href')).toBe('/app/playlists');
  });

  it('M-UI-30: the Existing/New switcher is a real radiogroup — aria-checked tracks the choice, the tabindex roves, and arrow keys move selection AND focus', async () => {
    const client = fakeClient();
    mountPicker(client);
    await flushPromises();

    const group = document.querySelector('[role="radiogroup"]') as HTMLElement | null;
    expect(group, 'radiogroup container').not.toBeNull();
    const radios = Array.from(group!.querySelectorAll('[role="radio"]')) as HTMLElement[];
    expect(radios).toHaveLength(2);
    const [existing, newOption] = radios;

    expect(existing.getAttribute('aria-checked')).toBe('true');
    expect(newOption.getAttribute('aria-checked')).toBe('false');
    expect(existing.tabIndex).toBe(0);
    expect(newOption.tabIndex).toBe(-1);

    // ArrowRight moves BOTH selection and focus (the native-radio promise the
    // half-implemented tablist used to break).
    group!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await flushPromises();
    expect(existing.getAttribute('aria-checked')).toBe('false');
    expect(newOption.getAttribute('aria-checked')).toBe('true');
    expect(newOption.tabIndex).toBe(0);
    expect(document.activeElement).toBe(newOption);

    // The defect class is gone, not decorated: no tablist/tab artifacts remain.
    expect(document.querySelector('[role="tablist"], [role="tab"], [role="tabpanel"]')).toBeNull();
  });

});

/** Type into the New-tab name input (the Modal teleports to <body>, so the
 *  wrapper cannot see it — query the document and drive v-model via input). */
async function typeNewName(name: string): Promise<void> {
  const wrapper = document.querySelector('.playlist-picker');
  const input = wrapper?.querySelector('input[type="text"]') as HTMLInputElement | null;
  expect(input, 'New-tab name input (teleported)').not.toBeNull();
  (input as HTMLInputElement).value = name;
  input!.dispatchEvent(new Event('input', { bubbles: true }));
  await flushPromises();
}
