/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { afterEach, describe, expect, it, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import PosterPicker from './PosterPicker.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { ApiError } from '../api/errors';
import { TMDB_UNCONFIGURED_CODE } from '../api/client';
import type { MediaItem, PosterCandidatesResponse, PosterCandidate } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    type: 'movie',
    poster_url: null,
    genres: [],
    year: 2021,
    rating: null,
    runtime: null,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

function candidate(over: Partial<PosterCandidate> = {}): PosterCandidate {
  return {
    provider: 'tmdb',
    poster_url: 'https://image.tmdb.org/t/p/w500/abc.jpg',
    width: 500,
    height: 750,
    votes: 120,
    vote_average: 7.5,
    tmdb_id: 123,
    ...over,
  };
}

const okResponse = (candidates: PosterCandidate[], current: string | null = null): PosterCandidatesResponse => ({
  candidates,
  current_poster_url: current,
});

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  document.body.innerHTML = '';
});

afterEach(() => {
  document.body.innerHTML = '';
});

function setup(opts: {
  listPosters?: () => Promise<PosterCandidatesResponse>;
  setPoster?: () => Promise<MediaItem>;
  item?: MediaItem;
}) {
  const auth = useAuthStore();
  const listPostersSpy = vi.spyOn(auth.client, 'listPosters').mockImplementation(
    opts.listPosters ?? (() => Promise.resolve(okResponse([candidate(), candidate({ provider: 'fanart.tv', poster_url: 'https://fanart.io/xyz.jpg' })]))),
  );
  const setPosterSpy = vi.spyOn(auth.client, 'setPoster').mockImplementation(
    opts.setPoster ?? (() => Promise.resolve(media({ id: 'm1', poster_url: 'https://image.tmdb.org/t/p/w500/abc.jpg' }))),
  );
  const w = mount(PosterPicker, {
    props: { modelValue: false, item: opts.item ?? media() },
    attachTo: document.body,
  });
  return { w, auth, listPostersSpy, setPosterSpy };
}

describe('PosterPicker', () => {
  it('opens and loads candidates grouped by provider', async () => {
    const { w, listPostersSpy } = setup({
      listPosters: () => Promise.resolve(okResponse([
        candidate({ provider: 'tmdb', poster_url: 'https://tmdb.io/p1.jpg' }),
        candidate({ provider: 'tmdb', poster_url: 'https://tmdb.io/p2.jpg', votes: 80 }),
        candidate({ provider: 'fanart.tv', poster_url: 'https://fanart.io/xyz.jpg' }),
      ])),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    expect(listPostersSpy).toHaveBeenCalledWith('m1', expect.anything());
    const sections = document.body.querySelectorAll('.poster-picker__section');
    expect(sections.length).toBe(2);
    const titles = Array.from(document.body.querySelectorAll('.poster-picker__section-title')).map((el) => el.textContent);
    expect(titles).toEqual(expect.arrayContaining(['tmdb', 'fanart.tv']));
    const thumbs = document.body.querySelectorAll('.poster-picker__thumb');
    expect(thumbs.length).toBe(2); // one best poster per provider
  });

  it('renders loading spinner while fetching', async () => {
    let resolve!: () => void;
    const { w, listPostersSpy } = setup({
      listPosters: () => new Promise<PosterCandidatesResponse>((r) => { resolve = () => r(okResponse([])); }),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();
    expect(listPostersSpy).toHaveBeenCalled();
    expect(document.body.querySelector('.poster-picker__loading')).toBeTruthy();
    resolve!();
    await flushPromises();
  });

  it('renders empty state when no candidates', async () => {
    const { w } = setup({ listPosters: () => Promise.resolve(okResponse([])) });
    await w.setProps({ modelValue: true });
    await flushPromises();

    expect(document.body.querySelector('.poster-picker__state')).toBeTruthy();
    expect(document.body.querySelector('.poster-picker__state-title')?.textContent).toContain('No posters');
  });

  it('renders unconfigured state when TMDB is not set up', async () => {
    const { w } = setup({
      listPosters: () => Promise.reject(new ApiError('TMDB not configured', 422, { code: TMDB_UNCONFIGURED_CODE })),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    expect(document.body.querySelector('.poster-picker__state-title')?.textContent).toContain('TMDB');
  });

  it('renders error state on load failure', async () => {
    const { w } = setup({ listPosters: () => Promise.reject(new Error('Network error')) });
    await w.setProps({ modelValue: true });
    await flushPromises();

    expect(document.body.querySelector('.poster-picker__state-title')?.textContent).toContain('Network error');
  });

  it('rings the current poster with is-current class', async () => {
    const { w } = setup({
      listPosters: () => Promise.resolve(okResponse([
        candidate({ poster_url: 'https://tmdb.io/current.jpg' }),
        candidate({ provider: 'fanart.tv', poster_url: 'https://fanart.io/other.jpg' }),
      ], 'https://tmdb.io/current.jpg')),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    const current = document.body.querySelector('.poster-picker__thumb.is-current');
    expect(current).toBeTruthy();
    const img = current!.querySelector('img');
    expect(img?.getAttribute('src')).toBe('https://tmdb.io/current.jpg');
  });

  it('selecting a poster calls setPoster and emits applied on success', async () => {
    const { w, setPosterSpy } = setup({
      setPoster: () => Promise.resolve(media({ id: 'm1', name: 'Dune', poster_url: 'https://new.jpg' })),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    const thumbs = document.body.querySelectorAll('.poster-picker__thumb');
    await thumbs[0]!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();

    expect(setPosterSpy).toHaveBeenCalledWith('m1', expect.anything());
    expect(w.emitted('applied')).toBeTruthy();
    const applied = w.emitted('applied')![0]![0] as MediaItem;
    expect(applied.poster_url).toBe('https://new.jpg');
  });

  it('selecting a poster closes the modal', async () => {
    const { w } = setup({
      setPoster: () => Promise.resolve(media({ id: 'm1', poster_url: 'https://new.jpg' })),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    const thumbs = document.body.querySelectorAll('.poster-picker__thumb');
    await thumbs[0]!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();

    const emitted = w.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1]![0]).toBe(false);
  });

  it('shows applying state on the selected thumb while setPoster is in flight', async () => {
    let resolveSet!: () => void;
    const { w } = setup({
      setPoster: () => new Promise<MediaItem>((r) => { resolveSet = () => r(media({ id: 'm1', poster_url: 'https://new.jpg' })); }),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    const thumbs = document.body.querySelectorAll('.poster-picker__thumb');
    await thumbs[0]!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();

    expect(thumbs[0]!.classList.contains('is-applying')).toBe(true);
    resolveSet!();
    await flushPromises();
  });

  it('aborts in-flight load when closed before load completes', async () => {
    let rejectLoad!: (e: Error) => void;
    const { w, listPostersSpy } = setup({
      listPosters: () => new Promise<PosterCandidatesResponse>((_, r) => { rejectLoad = r; }),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    const controller = listPostersSpy.mock.calls[0]![1] as AbortController | undefined;
    expect(controller).toBeDefined();

    await w.setProps({ modelValue: false });
    await flushPromises();
    rejectLoad!(new Error('aborted'));

    expect(w.emitted('applied')).toBeUndefined();
  });

  it('keyboard navigation updates active thumb within sections', async () => {
    const { w } = setup({
      listPosters: () => Promise.resolve(okResponse([
        candidate({ provider: 'tmdb', poster_url: 'https://tmdb.io/1.jpg' }),
        candidate({ provider: 'tmdb', poster_url: 'https://tmdb.io/2.jpg' }),
        candidate({ provider: 'tmdb', poster_url: 'https://tmdb.io/3.jpg' }),
        candidate({ provider: 'tmdb', poster_url: 'https://tmdb.io/4.jpg' }),
        candidate({ provider: 'fanart.tv', poster_url: 'https://fanart.io/1.jpg' }),
        candidate({ provider: 'fanart.tv', poster_url: 'https://fanart.io/2.jpg' }),
      ])),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    const grid = document.body.querySelector('.poster-picker__grid');
    expect(grid).toBeTruthy();

    grid!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await flushPromises();

    const active = document.body.querySelector('.poster-picker__thumb.is-active');
    expect(active).toBeTruthy();
  });

  it('pointermove sets active index', async () => {
    const { w } = setup({});
    await w.setProps({ modelValue: true });
    await flushPromises();

    const thumbs = document.body.querySelectorAll('.poster-picker__thumb');
    const secondThumb = thumbs[1] as HTMLElement;
    secondThumb.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));
    await flushPromises();

    expect(thumbs[1]!.classList.contains('is-active')).toBe(true);
  });

  it('resets state when reopened', async () => {
    const { w, listPostersSpy } = setup({
      listPosters: () => Promise.resolve(okResponse([candidate({ poster_url: 'https://x.jpg' })])),
    });
    await w.setProps({ modelValue: true });
    await flushPromises();

    const callCount1 = listPostersSpy.mock.calls.length;
    await w.setProps({ modelValue: false });
    await flushPromises();

    await w.setProps({ modelValue: true });
    await flushPromises();
    expect(listPostersSpy.mock.calls.length).toBe(callCount1 + 1);
  });
});
