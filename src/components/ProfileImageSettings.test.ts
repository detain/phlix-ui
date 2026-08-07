/**
 * ProfileImageSettings — behavioural cover for a component measured at
 * `LF:73 LH:0`, `FNF:15 FNH:0`, `BRF:62 BRH:0` on 2026-08-07 (S182
 * re-enumeration). It was never at 0% for want of a mention: `s241-image-src-coverage.test.ts`
 * reads this file as TEXT to assert it routes image bindings through `imgSrc()`.
 * A grep-over-source test executes none of the component, which is precisely why
 * it stayed at zero on every axis while looking covered.
 *
 * REACHABILITY — RESOLVED BY S263 (2026-08-07). This block previously read "not
 * re-exported from `src/index.ts` and not imported anywhere under `src/`". S263
 * exported it: this component is the ONLY caller in `src/` of
 * `useAuthStore().uploadAvatar()` / `.deleteAvatar()`, which are themselves the
 * only callers of `ApiClient.uploadAvatar()` / `.deleteAvatar()`, so deleting it
 * would have orphaned two layers beneath it. Pinned by "S263 — the newly exported
 * components" in `src/index.test.ts`, which MOUNTS the barrel binding.
 *
 * ⚠ Both action buttons are `:disabled=` guarded and VTU `trigger()` no-ops on a
 * disabled element. Where a guard is the subject, the `disabled` ATTRIBUTE is
 * asserted with an enabled control beside it.
 *
 * ⚠ jsdom has no `URL.createObjectURL` / `revokeObjectURL`; they are installed as
 * spies here so the revoke/leak contract is observable at all.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ProfileImageSettings from './ProfileImageSettings.vue';
import Button from './ui/Button.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';

let objectUrlSeq = 0;
const created: File[] = [];
const revoked: string[] = [];

function installObjectUrl(): void {
  objectUrlSeq = 0;
  created.length = 0;
  revoked.length = 0;
  // jsdom does not implement either, so these are installed rather than spied.
  URL.createObjectURL = vi.fn((f: Blob) => {
    created.push(f as File);
    objectUrlSeq += 1;
    return `blob:mock/${objectUrlSeq}`;
  }) as unknown as typeof URL.createObjectURL;
  URL.revokeObjectURL = vi.fn((u: string) => {
    revoked.push(u);
  }) as unknown as typeof URL.revokeObjectURL;
}

function file(name: string, type: string, size: number): File {
  const f = new File(['x'], name, { type });
  Object.defineProperty(f, 'size', { value: size });
  return f;
}

const PNG = () => file('avatar.png', 'image/png', 2048);

function mountSettings(
  user: Record<string, unknown> | null = { id: 'u1', name: 'Ada Lovelace', avatar_url: null },
) {
  const auth = useAuthStore();
  auth.user = user as never;
  const upload = vi.spyOn(auth, 'uploadAvatar').mockResolvedValue(undefined);
  const remove = vi.spyOn(auth, 'deleteAvatar').mockResolvedValue(undefined);
  const w = mount(ProfileImageSettings, { attachTo: document.body });
  return { w, auth, upload, remove };
}

/** Drive the hidden `<input type=file>` with a FileList jsdom will accept. */
async function selectFile(w: VueWrapper, f: File | null): Promise<void> {
  const input = w.find<HTMLInputElement>('.pis__file-input');
  Object.defineProperty(input.element, 'files', {
    configurable: true,
    value: f ? { 0: f, length: 1, item: (i: number) => (i === 0 ? f : null) } : { length: 0, item: () => null },
  });
  await input.trigger('change');
  await flushPromises();
}

const primary = (w: VueWrapper) => w.findAllComponents(Button)[0];
const secondary = (w: VueWrapper) => w.findAllComponents(Button)[1];

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  installObjectUrl();
});
afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('ProfileImageSettings — initials fallback', () => {
  it('uses FIRST + LAST initials for a multi-word name', async () => {
    const { w } = mountSettings({ name: 'Ada Lovelace' });
    // Exact string with toBe: "AL" vs "AD" (first two letters) vs "AA" are all
    // plausible mutations that a substring check would let through.
    expect(w.find('.pis__avatar-initials').text()).toBe('AL');
  });

  it('takes the middle name out of the picture — first and LAST, not first two', async () => {
    const { w } = mountSettings({ name: 'Ada Byron Lovelace' });
    expect(w.find('.pis__avatar-initials').text()).toBe('AL');
  });

  it('uses the first TWO letters for a single-word name', async () => {
    const { w } = mountSettings({ name: 'prometheus' });
    expect(w.find('.pis__avatar-initials').text()).toBe('PR');
  });

  it('falls back to `username` when `name` is absent', async () => {
    const { w } = mountSettings({ username: 'grace_h' });
    expect(w.find('.pis__avatar-initials').text()).toBe('GR');
  });

  it('prefers `name` over `username` when both exist', async () => {
    const { w } = mountSettings({ name: 'Ada Lovelace', username: 'zz_ignored' });
    expect(w.find('.pis__avatar-initials').text()).toBe('AL');
  });

  it('renders "?" for a whitespace-only name and for no user at all', async () => {
    expect(mountSettings({ name: '   ' }).w.find('.pis__avatar-initials').text()).toBe('?');
    expect(mountSettings(null).w.find('.pis__avatar-initials').text()).toBe('?');
  });

  it('shows the initials only while there is no image to show', async () => {
    const { w } = mountSettings({ name: 'Ada Lovelace', avatar_url: '/api/v1/avatars/u1.png' });
    expect(w.find('.pis__avatar-initials').exists()).toBe(false);
    expect(w.find('img.pis__avatar-img').exists()).toBe(true);
  });
});

describe('ProfileImageSettings — avatar source', () => {
  it('renders the persisted avatar_url through the imgSrc seam', async () => {
    const { w } = mountSettings({ name: 'A B', avatar_url: '/api/v1/avatars/u1.png' });
    expect(w.find('img.pis__avatar-img').attributes('src')).toBe('/api/v1/avatars/u1.png');
    expect(w.find('img.pis__avatar-img').attributes('alt')).toBe('Your profile image');
  });

  it('a pending PREVIEW outranks the persisted avatar', async () => {
    const { w } = mountSettings({ name: 'A B', avatar_url: '/api/v1/avatars/u1.png' });
    await selectFile(w, PNG());
    // `if (previewUrl) return previewUrl` comes first in displayAvatarUrl;
    // reordering the two returns leaves the old server image on screen.
    expect(w.find('img.pis__avatar-img').attributes('src')).toBe('blob:mock/1');
  });
});

describe('ProfileImageSettings — file selection and validation', () => {
  it('accepts a PNG, shows the pending name and size in KB, and creates ONE object URL', async () => {
    const { w } = mountSettings();
    await selectFile(w, file('portrait.png', 'image/png', 1536));

    expect(w.find('.pis__pending-name').text()).toBe('portrait.png');
    expect(w.find('.pis__pending-size').text()).toBe('1.5 KB');
    expect(created).toHaveLength(1);
  });

  it('accepts JPEG and WEBP as well as PNG', async () => {
    for (const type of ['image/jpeg', 'image/webp']) {
      const { w } = mountSettings();
      await selectFile(w, file(`a.${type.slice(6)}`, type, 100));
      expect(w.find('.pis__pending').exists()).toBe(true);
    }
  });

  it('REJECTS a GIF with a type toast, no preview and no object URL', async () => {
    const { w } = mountSettings();
    await selectFile(w, file('anim.gif', 'image/gif', 100));

    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', 'Please select a PNG, JPEG, or WEBP image.'],
    ]);
    expect(w.find('.pis__pending').exists()).toBe(false);
    expect(created).toHaveLength(0);
  });

  it('REJECTS a file over 5 MB with the SIZE message, not the type message', async () => {
    // The two rejection paths must be distinguishable: a mutation that collapses
    // them into one message reds exactly one of this pair.
    const { w } = mountSettings();
    await selectFile(w, file('huge.png', 'image/png', 5 * 1024 * 1024 + 1));

    expect(useToastStore().toasts.map((t) => t.message)).toEqual([
      'File is too large. Maximum size is 5 MB.',
    ]);
    expect(w.find('.pis__pending').exists()).toBe(false);
  });

  it('ACCEPTS a file of exactly 5 MB — the boundary is `>`, not `>=`', async () => {
    const { w } = mountSettings();
    await selectFile(w, file('exact.png', 'image/png', 5 * 1024 * 1024));
    expect(useToastStore().toasts).toHaveLength(0);
    expect(w.find('.pis__pending-name').text()).toBe('exact.png');
  });

  it('does nothing at all when the picker is dismissed with no file', async () => {
    const { w } = mountSettings();
    await selectFile(w, null);
    expect(useToastStore().toasts).toHaveLength(0);
    expect(created).toHaveLength(0);
    expect(w.find('.pis__pending').exists()).toBe(false);
  });

  it('REVOKES the previous preview when a second file is chosen', async () => {
    const { w } = mountSettings();
    await selectFile(w, file('one.png', 'image/png', 100));
    expect(revoked).toEqual([]);

    await selectFile(w, file('two.png', 'image/png', 100));
    // Dropping `revokePreview()` from onFileChange leaks the first blob.
    expect(revoked).toEqual(['blob:mock/1']);
    expect(w.find('img.pis__avatar-img').attributes('src')).toBe('blob:mock/2');
  });

  it('REVOKES the outstanding preview on unmount', async () => {
    const { w } = mountSettings();
    await selectFile(w, PNG());
    expect(revoked).toEqual([]);
    w.unmount();
    // `onBeforeUnmount(revokePreview)` — deleting that line leaks on every teardown.
    expect(revoked).toEqual(['blob:mock/1']);
  });

  it('revokes NOTHING on unmount when no preview was ever created', async () => {
    const { w } = mountSettings();
    w.unmount();
    expect(revoked).toEqual([]);
  });
});

describe('ProfileImageSettings — the primary button', () => {
  it('reads "Choose Image" with no selection and "Upload" with one', async () => {
    const { w } = mountSettings();
    expect(primary(w).text()).toBe('Choose Image');
    expect(primary(w).props('leftIcon')).toBe('image');

    await selectFile(w, PNG());
    expect(primary(w).text()).toBe('Upload');
    expect(primary(w).props('leftIcon')).toBe('arrow-up');
  });

  it('opens the hidden file picker when nothing is selected', async () => {
    const { w, upload } = mountSettings();
    const click = vi.spyOn(w.find<HTMLInputElement>('.pis__file-input').element, 'click');
    await primary(w).trigger('click');
    expect(click).toHaveBeenCalledTimes(1);
    expect(upload).not.toHaveBeenCalled();
  });

  it('UPLOADS the selected file, toasts, and keeps the preview on screen', async () => {
    const { w, upload } = mountSettings();
    const f = file('portrait.png', 'image/png', 100);
    await selectFile(w, f);

    await primary(w).trigger('click');
    await flushPromises();

    expect(upload).toHaveBeenCalledWith(f);
    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['success', 'Avatar updated successfully.'],
    ]);
    // selectedFile is cleared, so the label reverts…
    expect(primary(w).text()).toBe('Choose Image');
    expect(w.find('.pis__pending').exists()).toBe(false);
    // …but the blob is deliberately NOT revoked: the comment says it matches what
    // the server will now serve. Revoking it here would blank the avatar.
    expect(revoked).toEqual([]);
    expect(w.find('img.pis__avatar-img').attributes('src')).toBe('blob:mock/1');
  });

  it('surfaces an upload Error\'s OWN message', async () => {
    const { w, upload } = mountSettings();
    upload.mockRejectedValue(new Error('413 payload too large'));
    await selectFile(w, PNG());
    await primary(w).trigger('click');
    await flushPromises();

    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', '413 payload too large'],
    ]);
    // The selection survives a failure so the user can retry.
    expect(primary(w).text()).toBe('Upload');
  });

  it('uses the GENERIC copy when the rejection is not an Error — the other arm', async () => {
    const { w, upload } = mountSettings();
    upload.mockRejectedValue('just a string');
    await selectFile(w, PNG());
    await primary(w).trigger('click');
    await flushPromises();

    expect(useToastStore().toasts.map((t) => t.message)).toEqual(['Avatar upload failed.']);
  });
});

describe('ProfileImageSettings — the secondary button', () => {
  it('reads "Remove" with no selection and "Cancel" with one', async () => {
    const { w } = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    expect(secondary(w).text()).toBe('Remove');
    await selectFile(w, PNG());
    expect(secondary(w).text()).toBe('Cancel');
  });

  it('CANCEL discards the pending selection, revokes its blob, and calls no API', async () => {
    const { w, remove } = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    await selectFile(w, PNG());

    await secondary(w).trigger('click');
    await flushPromises();

    expect(remove).not.toHaveBeenCalled();
    expect(revoked).toEqual(['blob:mock/1']);
    expect(w.find('.pis__pending').exists()).toBe(false);
    // The persisted avatar is back on screen.
    expect(w.find('img.pis__avatar-img').attributes('src')).toBe('/a.png');
  });

  it('REMOVE deletes the persisted avatar and toasts', async () => {
    const { w, auth, remove } = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    remove.mockImplementation(async () => {
      (auth.user as unknown as { avatar_url: string | null }).avatar_url = null;
    });

    await secondary(w).trigger('click');
    await flushPromises();

    expect(remove).toHaveBeenCalledTimes(1);
    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['success', 'Avatar removed.'],
    ]);
    expect(w.find('.pis__avatar-initials').text()).toBe('AB');
  });

  it('surfaces a removal Error\'s own message, and the generic copy otherwise', async () => {
    const a = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    a.remove.mockRejectedValue(new Error('avatar is locked'));
    await secondary(a.w).trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.map((t) => t.message)).toEqual(['avatar is locked']);

    setActivePinia(createPinia());
    const b = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    b.remove.mockRejectedValue({ code: 'ENOTANERROR' });
    await secondary(b.w).trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.map((t) => t.message)).toEqual(['Avatar removal failed.']);
  });
});

describe('ProfileImageSettings — disabled guards', () => {
  // ⚠ Attribute assertions with succeeding controls. A `trigger()`-based test
  // cannot see these guards at all: VTU no-ops on a disabled element.

  it('DISABLES Remove when there is neither a selection nor a persisted avatar', async () => {
    const { w } = mountSettings({ name: 'A B', avatar_url: null });
    expect(secondary(w).props('disabled')).toBe(true);
    expect(w.findAll('button')[1].attributes('disabled')).toBe('');
  });

  it('ENABLES Remove once an avatar exists — the control for the above', async () => {
    const { w } = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    expect(secondary(w).props('disabled')).toBe(false);
    expect(w.findAll('button')[1].attributes('disabled')).toBeUndefined();
  });

  it('ENABLES Cancel from a pending selection alone, with no persisted avatar', async () => {
    // `!selectedFile && !hasPersistedAvatar` — flipping the `&&` to `||` disables
    // the button in exactly this state.
    const { w } = mountSettings({ name: 'A B', avatar_url: null });
    await selectFile(w, PNG());
    expect(secondary(w).props('disabled')).toBe(false);
  });

  it('DISABLES BOTH buttons while an upload is in flight, and shows the spinner on the primary', async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => {
      release = r;
    });
    const { w, upload } = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    upload.mockImplementation(async () => {
      await gate;
    });

    await selectFile(w, PNG());
    expect(primary(w).props('disabled')).toBe(false);

    await primary(w).trigger('click');
    await w.vm.$nextTick();

    expect(primary(w).props('loading')).toBe(true);
    expect(secondary(w).props('disabled')).toBe(true);
    expect(w.findAll('button').map((b) => b.attributes('disabled'))).toEqual(['', '']);

    release();
    await flushPromises();
    expect(primary(w).props('loading')).toBe(false);
    expect(w.findAll('button')[0].attributes('disabled')).toBeUndefined();
  });

  it('DISABLES BOTH buttons while a removal is in flight, with the spinner on the secondary', async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => {
      release = r;
    });
    const { w, remove } = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    remove.mockImplementation(async () => {
      await gate;
    });

    await secondary(w).trigger('click');
    await w.vm.$nextTick();

    expect(secondary(w).props('loading')).toBe(true);
    expect(primary(w).props('disabled')).toBe(true);

    release();
    await flushPromises();
    expect(secondary(w).props('loading')).toBe(false);
  });

  it('renders the format hint', async () => {
    const { w } = mountSettings();
    expect(w.find('.pis__hint').text()).toBe('PNG, JPEG, or WEBP — max 5 MB.');
    expect(w.find('.pis__file-input').attributes('accept')).toBe(
      'image/png,image/jpeg,image/webp',
    );
  });
});

describe('ProfileImageSettings — re-entrancy guards behind the disabled buttons', () => {
  // ⚠ Both buttons are disabled while their action is in flight, so VTU
  // `trigger()` no-ops and a click-based test proves nothing about the JS guards
  // (`if (!selectedFile || uploadLoading) return;` / `if (deleteLoading) return;`).
  // Raw dispatchEvent reaches the listener regardless of `disabled`.

  it('a RAW second click during an upload does not issue a second uploadAvatar()', async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => {
      release = r;
    });
    const { w, upload } = mountSettings();
    upload.mockImplementation(async () => {
      await gate;
    });

    await selectFile(w, PNG());
    await primary(w).trigger('click');
    await w.vm.$nextTick();
    expect(upload).toHaveBeenCalledTimes(1);

    w.findAll('button')[0].element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    expect(upload).toHaveBeenCalledTimes(1);

    release();
    await flushPromises();
  });

  it('a RAW second click during a removal does not issue a second deleteAvatar()', async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => {
      release = r;
    });
    const { w, remove } = mountSettings({ name: 'A B', avatar_url: '/a.png' });
    remove.mockImplementation(async () => {
      await gate;
    });

    await secondary(w).trigger('click');
    await w.vm.$nextTick();
    expect(remove).toHaveBeenCalledTimes(1);

    w.findAll('button')[1].element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    expect(remove).toHaveBeenCalledTimes(1);

    release();
    await flushPromises();
  });

  it('upload is a no-op with NOTHING selected, even reached raw', async () => {
    // The `!selectedFile.value` half of the same guard: the button is enabled in
    // this state but wired to openFilePicker(), so the guard is only reachable by
    // a click that arrives while `selectedFile` is null.
    const { w, upload } = mountSettings();
    const clickSpy = vi.spyOn(w.find<HTMLInputElement>('.pis__file-input').element, 'click');
    w.findAll('button')[0].element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    expect(upload).not.toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
