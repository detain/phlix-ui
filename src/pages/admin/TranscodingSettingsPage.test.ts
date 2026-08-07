/**
 * TranscodingSettingsPage — behavioural cover for a page that shipped with NO test
 * file at all (S182; the same file the S06 audit flagged and S177 re-found).
 *
 * Measured before this file existed: `LF:76 LH:0, FNF:19 FNH:0, BRF:47 BRH:0` —
 * zero on every axis, while the page is live at `src/app/admin.ts:182`
 * (`/admin/transcoding`).
 *
 * What this file deliberately does NOT do: mount the page and assert it rendered.
 * That moves `LH` and pins nothing. Every test below names a production line whose
 * mutation it kills — the three-way save fan-out (`isAcceleratorDirty` /
 * `isHdrDirty` / `isToneMapDirty`), the `preferredAccelerator !== null` guard, the
 * `e instanceof ApiError` message split, and `syncOriginals()`'s dirty reset.
 *
 * ⚠ The Save button is `:disabled="!hasAnyChanges"`, and VTU's `trigger()` is a
 * no-op on a disabled element — 8 guards were once deleted in this repo with 4 223
 * tests still green. So the disabled state is asserted as an ATTRIBUTE with a
 * succeeding control beside it (a dirty mount where the attribute is absent), and
 * submission is driven through the `<form @submit.prevent>` which is never
 * disabled. See `the Save button's disabled guard` describe block.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { computed } from 'vue';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import TranscodingSettingsPage from './TranscodingSettingsPage.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
import Button from '../../components/ui/Button.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { ApiError } from '../../api/errors';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';
import type {
  AcceleratorsResponse,
  HardwareAccelerator,
  ToneMappingSettings,
} from '../../api/admin/transcoding';

const ACCEL_URL = '/api/v1/admin/transcoding/accelerators';
const TONE_URL = '/api/v1/admin/transcoding/tone-mapping';

function accel(over: Partial<HardwareAccelerator> = {}): HardwareAccelerator {
  return { name: 'cuda', encoders: ['h264_nvenc', 'hevc_nvenc'], isHardware: true, ...over };
}

interface ClientOpts {
  accelerators?: HardwareAccelerator[];
  ffmpegVersion?: string;
  preferredAccelerator?: string | null;
  tone?: Partial<ToneMappingSettings>;
  /** Reject the accelerators GET with this. */
  getAccelError?: unknown;
  /** Reject the tone-mapping GET with this. */
  getToneError?: unknown;
  /** Reject the accelerators PUT with this. */
  putAccelError?: unknown;
  /** Reject the tone-mapping PUT with this. */
  putToneError?: unknown;
}

function makeClient(opts: ClientOpts = {}) {
  const data: AcceleratorsResponse = {
    accelerators: opts.accelerators ?? [
      accel(),
      accel({ name: 'software', encoders: ['libx264'], isHardware: false }),
    ],
    ffmpegVersion: opts.ffmpegVersion ?? '6.1.1',
    preferredAccelerator:
      opts.preferredAccelerator === undefined ? 'cuda' : opts.preferredAccelerator,
  };
  const tone: ToneMappingSettings = {
    prefer_hdr_output: false,
    tone_map_mode: 'none',
    ...(opts.tone ?? {}),
  };

  const get = vi.fn(async (url: string) => {
    if (url === ACCEL_URL) {
      if (opts.getAccelError) throw opts.getAccelError;
      return { success: true, data };
    }
    if (url === TONE_URL) {
      if (opts.getToneError) throw opts.getToneError;
      return { success: true, data: tone };
    }
    throw new Error(`unexpected GET ${url}`);
  });

  const put = vi.fn(async (url: string) => {
    if (url === ACCEL_URL) {
      if (opts.putAccelError) throw opts.putAccelError;
      return { success: true, message: 'ok' };
    }
    if (url === TONE_URL) {
      if (opts.putToneError) throw opts.putToneError;
      return { success: true, message: 'ok' };
    }
    throw new Error(`unexpected PUT ${url}`);
  });

  const client = {
    get,
    put,
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  } as unknown as ApiClient;

  return { client, get, put };
}

async function mountPage(client: ApiClient): Promise<VueWrapper> {
  const w = mount(TranscodingSettingsPage, { props: { client }, attachTo: document.body });
  await flushPromises();
  return w;
}

/** PUT calls made to a specific URL, as `[url, body]` pairs. */
function putsTo(put: ReturnType<typeof vi.fn>, url: string): unknown[] {
  return put.mock.calls.filter((c) => c[0] === url).map((c) => c[1]);
}

/** The one Save button (`type=submit`). */
function saveButton(w: VueWrapper) {
  return w.find('button[type="submit"]');
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

// ─────────────────────────────────────────────────────────────────────────────
describe('TranscodingSettingsPage — load', () => {
  it('requests BOTH endpoints exactly once on mount', async () => {
    const { client, get } = makeClient();
    await mountPage(client);
    expect(get.mock.calls.map((c) => c[0]).sort()).toEqual([ACCEL_URL, TONE_URL].sort());
    expect(get).toHaveBeenCalledTimes(2);
  });

  it('renders one row per accelerator, labelled hardware or software by isHardware', async () => {
    const { client } = await Promise.resolve(makeClient());
    const w = await mountPage(client);

    const rows = w.findAll('.transcoding-settings__accel');
    expect(rows).toHaveLength(2);

    // Exact text with toBe, never toContain: "hardware" and "software" are the two
    // possible tones and a substring match would let a swapped ternary pass.
    const badgeOf = (i: number) => rows[i].findAll('.phlix-badge').at(-1)!.text();
    expect(rows[0].find('.transcoding-settings__accel-name').text()).toBe('cuda hardware');
    expect(badgeOf(0)).toBe('hardware');
    expect(rows[1].find('.transcoding-settings__accel-name').text()).toBe('software software');
    expect(badgeOf(1)).toBe('software');
  });

  it('joins the encoder list with a comma-space', async () => {
    const { client } = makeClient({ accelerators: [accel({ encoders: ['a', 'b', 'c'] })] });
    const w = await mountPage(client);
    expect(w.find('.transcoding-settings__accel-encoders').text()).toBe('a, b, c');
  });

  it('marks ONLY the preferred accelerator selected and checks only its radio', async () => {
    const { client } = makeClient({ preferredAccelerator: 'software' });
    const w = await mountPage(client);

    const rows = w.findAll('.transcoding-settings__accel');
    expect(rows[0].classes()).not.toContain('transcoding-settings__accel--selected');
    expect(rows[1].classes()).toContain('transcoding-settings__accel--selected');

    const radios = w.findAll<HTMLInputElement>('input[type="radio"]');
    expect(radios.map((r) => r.element.checked)).toEqual([false, true]);
  });

  it('selects NOTHING when the server reports no preferred accelerator', async () => {
    const { client } = makeClient({ preferredAccelerator: null });
    const w = await mountPage(client);
    expect(w.findAll('.transcoding-settings__accel--selected')).toHaveLength(0);
  });

  it('renders the FFmpeg version verbatim in the badge', async () => {
    const { client } = makeClient({ ffmpegVersion: '7.0.2-static' });
    const w = await mountPage(client);
    expect(w.find('.transcoding-settings__meta .phlix-badge').text()).toBe('FFmpeg 7.0.2-static');
  });

  it('falls back to "unknown" for an EMPTY version string — `||`, not `??`', async () => {
    // Kills `ffmpegVersion ?? 'unknown'`: `''` is not nullish, so `??` would render
    // the bare "FFmpeg" and this assertion would fail.
    const { client } = makeClient({ ffmpegVersion: '' });
    const w = await mountPage(client);
    expect(w.find('.transcoding-settings__meta .phlix-badge').text()).toBe('FFmpeg unknown');
  });

  it('shows the no-accelerators message instead of a radio group when the list is empty', async () => {
    const { client } = makeClient({ accelerators: [] });
    const w = await mountPage(client);
    expect(w.find('.transcoding-settings__empty-accel').text()).toBe('No accelerators detected.');
    expect(w.find('.transcoding-settings__accelerators').exists()).toBe(false);
    expect(w.findAll('input[type="radio"]')).toHaveLength(0);
  });

  it('hydrates the tone-mapping controls from the tone-mapping GET, not from defaults', async () => {
    const { client } = makeClient({ tone: { prefer_hdr_output: true, tone_map_mode: 'libplacebo' } });
    const w = await mountPage(client);
    expect(w.findComponent(Switch).props('modelValue')).toBe(true);
    expect(w.findComponent(Select).props('modelValue')).toBe('libplacebo');
  });

  it('offers exactly the three documented tone-map modes, in order', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    const options = w.findComponent(Select).props('options') as ReadonlyArray<{ value: string }>;
    expect(options.map((o) => o.value)).toEqual(['none', 'zscale', 'libplacebo']);
  });

  it('replaces the skeleton with the form once loading resolves', async () => {
    const { client } = makeClient();
    const w = mount(TranscodingSettingsPage, { props: { client }, attachTo: document.body });
    // Pre-flush: `loading` starts true, so the skeleton is up and no form exists.
    expect(w.find('.transcoding-settings__skel').exists()).toBe(true);
    expect(w.find('form').exists()).toBe(false);
    await flushPromises();
    expect(w.find('.transcoding-settings__skel').exists()).toBe(false);
    expect(w.find('form').exists()).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
describe('TranscodingSettingsPage — load failure', () => {
  it('shows the error EmptyState carrying the thrown message and toasts it', async () => {
    const { client } = makeClient({ getAccelError: new ApiError('accelerator probe timed out', 504) });
    const w = await mountPage(client);

    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toBe("Couldn't load transcoding settings");
    expect(empty.props('description')).toBe('accelerator probe timed out');
    expect(w.find('form').exists()).toBe(false);

    const toasts = useToastStore();
    expect(toasts.toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', 'accelerator probe timed out'],
    ]);
  });

  it('uses the FALLBACK copy when the thrown value carries no message', async () => {
    // Distinguishes the two arms of `errMessage(e, 'Failed to load…')`: a control
    // with a real message is asserted above, so a mutation that hard-codes either
    // string reds one of the two.
    const { client } = makeClient({ getToneError: { notAnError: true } });
    const w = await mountPage(client);
    expect(w.findComponent(EmptyState).props('description')).toBe(
      'Failed to load transcoding settings.',
    );
  });

  it('a FAILING tone-mapping GET fails the whole load — Promise.all, not allSettled', async () => {
    const { client } = makeClient({ getToneError: new ApiError('tone endpoint 500', 500) });
    const w = await mountPage(client);
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    // The accelerator data resolved fine, but nothing renders from it.
    expect(w.findAll('.transcoding-settings__accel')).toHaveLength(0);
  });

  it('the EmptyState retry action re-runs BOTH gets and recovers the form', async () => {
    let fail = true;
    const get = vi.fn(async (url: string) => {
      if (fail) throw new ApiError('down', 503);
      if (url === ACCEL_URL) {
        return {
          success: true,
          data: { accelerators: [accel()], ffmpegVersion: '6.0', preferredAccelerator: 'cuda' },
        };
      }
      return { success: true, data: { prefer_hdr_output: false, tone_map_mode: 'none' } };
    });
    const client = { get, put: vi.fn(), post: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;

    const w = await mountPage(client);
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    expect(get).toHaveBeenCalledTimes(2);

    fail = false;
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();

    expect(get).toHaveBeenCalledTimes(4);
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.find('form').exists()).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
describe('TranscodingSettingsPage — the Save button\'s disabled guard', () => {
  // ⚠ VTU `trigger()` silently no-ops on a disabled element, so "clicking Save and
  // observing no PUT" would pass even if the guard were deleted. These two tests
  // read the ATTRIBUTE, and the second is the succeeding control that proves the
  // first assertion is capable of failing.

  it('is DISABLED while nothing is dirty', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    expect(saveButton(w).attributes('disabled')).toBe('');
    expect(w.findAllComponents(Button).find((b) => b.props('type') === 'submit')!
      .props('disabled')).toBe(true);
  });

  it('is ENABLED after any one field changes — the control for the assertion above', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    expect(saveButton(w).attributes('disabled')).toBeUndefined();
  });

  it('re-DISABLES after a successful save, because syncOriginals() clears the dirty state', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    expect(saveButton(w).attributes('disabled')).toBeUndefined();

    await w.find('form').trigger('submit');
    await flushPromises();
    // Neutering syncOriginals() in handleSubmit leaves this enabled.
    expect(saveButton(w).attributes('disabled')).toBe('');
  });

  it('stays enabled after a FAILED save — the dirty state must not be cleared', async () => {
    const { client } = makeClient({ putToneError: new ApiError('nope', 500) });
    const w = await mountPage(client);
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();

    await w.find('form').trigger('submit');
    await flushPromises();
    expect(saveButton(w).attributes('disabled')).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
describe('TranscodingSettingsPage — save fan-out', () => {
  it('sends ONLY the accelerator PUT when only the accelerator changed', async () => {
    const { client, put } = makeClient({ preferredAccelerator: 'cuda' });
    const w = await mountPage(client);

    await w.findAll('input[type="radio"]')[1].setValue();
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    expect(putsTo(put, ACCEL_URL)).toEqual([{ name: 'software' }]);
    expect(putsTo(put, TONE_URL)).toEqual([]);
  });

  it('sends ONLY the tone-mapping PUT when only the HDR switch changed', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);

    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    expect(putsTo(put, ACCEL_URL)).toEqual([]);
    expect(putsTo(put, TONE_URL)).toEqual([
      { prefer_hdr_output: true, tone_map_mode: 'none' },
    ]);
  });

  it('sends ONLY the tone-mapping PUT when only the tone-map MODE changed', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);

    await w.findComponent(Select).vm.$emit('update:modelValue', 'zscale');
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    expect(putsTo(put, ACCEL_URL)).toEqual([]);
    expect(putsTo(put, TONE_URL)).toEqual([
      { prefer_hdr_output: false, tone_map_mode: 'zscale' },
    ]);
  });

  it('sends BOTH PUTs, but the tone-mapping one only ONCE, when all three changed', async () => {
    // `isHdrDirty || isToneMapDirty` is a single guard over one PUT; a mutation
    // that splits it into two `if`s would double-post.
    const { client, put } = makeClient();
    const w = await mountPage(client);

    await w.findAll('input[type="radio"]')[1].setValue();
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await w.findComponent(Select).vm.$emit('update:modelValue', 'libplacebo');
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    expect(putsTo(put, ACCEL_URL)).toEqual([{ name: 'software' }]);
    expect(putsTo(put, TONE_URL)).toEqual([
      { prefer_hdr_output: true, tone_map_mode: 'libplacebo' },
    ]);
  });

  it('sends NOTHING at all when submitted with no changes', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    // Submitted through the form, which is NOT disabled — this reaches
    // handleSubmit() for real and proves the per-field guards, not the button.
    await w.find('form').trigger('submit');
    await flushPromises();
    expect(put).not.toHaveBeenCalled();
    const toasts = useToastStore();
    expect(toasts.toasts.map((t) => t.message)).toEqual(['Transcoding settings saved.']);
  });

  it('skips the accelerator PUT when the selection is dirty but NULL', async () => {
    // Kills `&& preferredAccelerator.value !== null`. Starting preferred is 'cuda';
    // setting it back to null makes isAcceleratorDirty true with a null payload.
    const { client, put } = makeClient({ preferredAccelerator: 'cuda' });
    const w = await mountPage(client);
    (w.vm as unknown as { preferredAccelerator: string | null }).preferredAccelerator = null;
    await flushPromises();
    // Anti-vacuity: prove the write LANDED. Without this the test would pass even
    // if the assignment were a no-op, because a clean form also sends no PUT.
    expect(w.findAll('.transcoding-settings__accel--selected')).toHaveLength(0);
    expect(w.findAll<HTMLInputElement>('input[type="radio"]').map((r) => r.element.checked)).toEqual([
      false,
      false,
    ]);

    await w.find('form').trigger('submit');
    await flushPromises();
    expect(putsTo(put, ACCEL_URL)).toEqual([]);
  });

  it('toasts success exactly once on a save that touched both endpoints', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    await w.findAll('input[type="radio"]')[1].setValue();
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    const toasts = useToastStore();
    expect(toasts.toasts.map((t) => [t.tone, t.message])).toEqual([
      ['success', 'Transcoding settings saved.'],
    ]);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
describe('TranscodingSettingsPage — save failure', () => {
  it('surfaces an ApiError\'s OWN message', async () => {
    const { client } = makeClient({ putToneError: new ApiError('accelerator is busy', 409) });
    const w = await mountPage(client);
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    const toasts = useToastStore();
    expect(toasts.toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', 'accelerator is busy'],
    ]);
  });

  it('uses the GENERIC copy for a non-ApiError, which is the other arm of the same ternary', async () => {
    // The pair matters: with only one of these, `e instanceof ApiError` could be
    // inverted or deleted and one test would still pass.
    const { client } = makeClient({ putToneError: new TypeError('fetch exploded') });
    const w = await mountPage(client);
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    const toasts = useToastStore();
    expect(toasts.toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', 'Failed to save transcoding settings.'],
    ]);
    expect(toasts.toasts[0].message).not.toBe('fetch exploded');
  });

  it('does NOT toast success when the accelerator PUT rejects, and skips the tone PUT', async () => {
    const { client, put } = makeClient({ putAccelError: new ApiError('no such accelerator', 400) });
    const w = await mountPage(client);
    await w.findAll('input[type="radio"]')[1].setValue();
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    expect(putsTo(put, TONE_URL)).toEqual([]);
    const toasts = useToastStore();
    expect(toasts.toasts.map((t) => t.tone)).toEqual(['error']);
  });

  it('clears `submitting` in the finally block so the button is usable again', async () => {
    const { client } = makeClient({ putToneError: new ApiError('boom', 500) });
    const w = await mountPage(client);
    await w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await flushPromises();
    await w.find('form').trigger('submit');
    await flushPromises();

    const submit = w.findAllComponents(Button).find((b) => b.props('type') === 'submit')!;
    expect(submit.props('loading')).toBe(false);
    expect(saveButton(w).attributes('aria-busy')).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
describe('TranscodingSettingsPage — the `apiBase` injection seam', () => {
  // With no `client` prop the page builds its OWN ApiClient from the injected
  // `apiBase`. That injection accepts EITHER a plain string OR a ComputedRef, and
  // the two arms of `typeof injectedApiBase === 'string' ? … : …?.value ?? ''` are
  // the only place a hub-relayed base can be threaded through. `baseUrl` is
  // private, so both arms are observed through the URL that reaches `fetch`.

  function captureFetchUrls(): string[] {
    const urls: string[] = [];
    vi.mocked(globalThis.fetch).mockImplementation(async (input: RequestInfo | URL) => {
      urls.push(String(input));
      throw new TypeError('network down');
    });
    return urls;
  }

  it('prefixes requests with a ComputedRef apiBase (the non-string arm)', async () => {
    const urls = captureFetchUrls();
    const w = mount(TranscodingSettingsPage, {
      global: { provide: { apiBase: computed(() => 'https://relay.example/s/7') } },
      attachTo: document.body,
    });
    await flushPromises();

    expect(urls).toContain('https://relay.example/s/7' + ACCEL_URL);
    expect(urls).toContain('https://relay.example/s/7' + TONE_URL);
    // The failure surfaced, so the page is genuinely wired to that client.
    expect(w.findComponent(EmptyState).exists()).toBe(true);
  });

  it('prefixes requests with a plain-string apiBase (the string arm)', async () => {
    const urls = captureFetchUrls();
    mount(TranscodingSettingsPage, {
      global: { provide: { apiBase: 'https://direct.example' } },
      attachTo: document.body,
    });
    await flushPromises();

    expect(urls).toContain('https://direct.example' + ACCEL_URL);
    // Control against the ComputedRef case above: a mutation that always reads
    // `.value` yields `undefined` here and this assertion reds.
    expect(urls.some((u) => u.startsWith('undefined'))).toBe(false);
  });
});
