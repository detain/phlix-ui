/**
 * SubtitleSearch (Wave 3 F3) — on-demand subtitle search / download modal.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import SubtitleSearch from './SubtitleSearch.vue';
import { ApiClient, type SubtitleCandidate } from '../../api/client';
import { MemoryTokenStore, makeFetch } from '../../api/test/memoryTokenStore';
import { useToastStore } from '../../stores/useToastStore';

function candidate(over: Partial<SubtitleCandidate> = {}): SubtitleCandidate {
  return {
    provider: 'opensubtitles',
    language: 'en',
    downloadId: 'dl-1',
    releaseName: 'Movie.1080p',
    format: 'srt',
    matchedBy: 'hash',
    rating: 8,
    downloadCount: 100,
    hearingImpaired: false,
    fps: 23.976,
    ...over,
  };
}

const mounted: ReturnType<typeof mount>[] = [];
function mountModal(client: ApiClient, props: Record<string, unknown> = {}) {
  const w = mount(SubtitleSearch, {
    props: { open: true, mediaId: 'm-1', apiBase: '', preferredLangs: ['en'], client, ...props },
    attachTo: document.body,
  });
  mounted.push(w);
  return w;
}

/** The search button is the solid button in the modal body (not the footer Close). */
function searchButton(): HTMLButtonElement {
  return Array.from(document.body.querySelectorAll<HTMLButtonElement>('button')).find((b) =>
    b.textContent?.includes('Search'),
  )!;
}
function addButtons(): HTMLButtonElement[] {
  return Array.from(document.body.querySelectorAll<HTMLButtonElement>('.subsearch__item button'));
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (mounted.length) mounted.pop()?.unmount();
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('SubtitleSearch — search', () => {
  it('populates the candidate list from the search results', async () => {
    const { fetch } = makeFetch([
      { status: 200, body: { candidates: [candidate({ releaseName: 'Alpha' }), candidate({ releaseName: 'Beta', downloadId: 'dl-2' })] } },
    ]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });
    mountModal(client);

    searchButton().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();

    const items = document.body.querySelectorAll('.subsearch__item');
    expect(items.length).toBe(2);
    expect(document.body.textContent).toContain('Alpha');
    expect(document.body.textContent).toContain('Beta');
  });

  it('sorts candidates by rating then download count', async () => {
    const { fetch } = makeFetch([
      {
        status: 200,
        body: {
          candidates: [
            candidate({ releaseName: 'Low', rating: 5, downloadId: 'a' }),
            candidate({ releaseName: 'High', rating: 9, downloadId: 'b' }),
          ],
        },
      },
    ]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });
    mountModal(client);

    searchButton().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();

    const releases = Array.from(document.body.querySelectorAll('.subsearch__release')).map((e) => e.textContent);
    expect(releases).toEqual(['High', 'Low']);
  });

  it('shows an empty state when the search returns no candidates', async () => {
    const { fetch } = makeFetch([{ status: 200, body: { candidates: [] } }]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });
    mountModal(client);

    searchButton().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();

    expect(document.body.querySelector('.phlix-empty')).not.toBeNull();
    expect(document.body.textContent).toContain('No subtitles found');
  });

  it('toasts an error when the search request fails', async () => {
    const { fetch } = makeFetch([{ status: 502, body: { error: 'boom' } }]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });
    mountModal(client);
    const toasts = useToastStore();

    searchButton().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();

    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
  });
});

describe('SubtitleSearch — download', () => {
  async function openWithResults(scenarios: Parameters<typeof makeFetch>[0]) {
    const { fetch, calls } = makeFetch([
      { status: 200, body: { candidates: [candidate()] } },
      ...scenarios,
    ]);
    const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });
    const w = mountModal(client);
    searchButton().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();
    return { w, calls };
  }

  it('emits added + toasts success on a 200 download', async () => {
    const { w } = await openWithResults([
      { status: 200, body: { track: { url: '/hls/j/sub-0.vtt', language: 'en', label: 'English', default: false, index: 0 } } },
    ]);
    const toasts = useToastStore();

    addButtons()[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();

    const added = w.emitted('added');
    expect(added).toBeTruthy();
    expect((added![0][0] as { url: string }).url).toBe('/hls/j/sub-0.vtt');
    expect(toasts.toasts.some((t) => t.tone === 'success')).toBe(true);
  });

  it('shows a quota message including remaining + reset on a 429', async () => {
    const { w } = await openWithResults([
      { status: 429, body: { error: 'quota', downloadsRemaining: 2, resetTimeUtc: '2026-07-22T00:00:00Z' } },
    ]);
    const toasts = useToastStore();

    addButtons()[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();

    expect(w.emitted('added')).toBeFalsy();
    const warn = toasts.toasts.find((t) => t.tone === 'warning');
    expect(warn).toBeTruthy();
    // resetTimeUtc present → the reset-time variant is used.
    expect(warn!.message).toContain('Resets at');
  });

  it('toasts a not-found error on a 404', async () => {
    await openWithResults([{ status: 404, body: { error: 'unknown provider' } }]);
    const toasts = useToastStore();

    addButtons()[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    await nextTick();

    const err = toasts.toasts.find((t) => t.tone === 'error');
    expect(err).toBeTruthy();
    expect(err!.message).toContain('no longer available');
  });
});
