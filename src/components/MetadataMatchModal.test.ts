/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import MetadataMatchModal from './MetadataMatchModal.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { ApiError } from '../api/client';
import type { MediaItem } from '../types/media-item';
import type { MatchCandidate, MatchSearchResult, MatchApplyResult } from '../api/client';

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

function candidate(over: Partial<MatchCandidate> = {}): MatchCandidate {
  return {
    tmdb_id: 42,
    type: 'movie',
    title: 'Dune',
    year: 2021,
    overview: 'A boy and a desert.',
    poster_url: 'https://img/dune.jpg',
    backdrop_url: null,
    vote_average: 8.1,
    ...over,
  };
}

const okSearch = (results: MatchCandidate[]): MatchSearchResult => ({ results, query: 'Dune', type: 'movie' });

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  document.body.innerHTML = '';
});

/** Mount closed, stub the auth client's match methods, then open to trigger the watch. */
function setup(opts: {
  search?: () => Promise<MatchSearchResult>;
  apply?: () => Promise<MatchApplyResult<MediaItem>>;
  item?: MediaItem;
}) {
  const auth = useAuthStore();
  const searchSpy = vi.spyOn(auth.client, 'matchSearch').mockImplementation(opts.search ?? (() => Promise.resolve(okSearch([candidate()]))));
  const applySpy = vi.spyOn(auth.client, 'matchApply').mockImplementation(
    (opts.apply ?? (() => Promise.resolve({ item: media({ name: 'Dune (matched)' }), applied: { item_id: 'm1', mode: 'movie', tmdb_id: 42, matched: true, children_enriched: 0 } }))) as never,
  );
  const w = mount(MetadataMatchModal, {
    props: { modelValue: false, item: opts.item ?? media() },
    attachTo: document.body,
  });
  return { w, auth, searchSpy, applySpy };
}

describe('MetadataMatchModal', () => {
  it('auto-searches on open, prefilled from the item, and renders results', async () => {
    const { w, searchSpy } = setup({ search: () => Promise.resolve(okSearch([candidate(), candidate({ tmdb_id: 7, title: 'Dune Part Two', year: 2024 })])) });
    await w.setProps({ modelValue: true });
    await flushPromises();

    // auto-searched for this item with no manual overrides (server derives type)
    expect(searchSpy).toHaveBeenCalledWith('m1', { query: 'Dune', year: '2021' }, expect.anything());
    const rows = document.body.querySelectorAll('.match-modal__result');
    expect(rows.length).toBe(2);
    // the query input is prefilled with the item's title
    const input = document.body.querySelector('#match-query') as HTMLInputElement;
    expect(input.value).toBe('Dune');
    w.unmount();
  });

  it('manual re-search forwards the entered query + year', async () => {
    const { w, searchSpy } = setup({});
    await w.setProps({ modelValue: true });
    await flushPromises();
    searchSpy.mockClear();

    const query = document.body.querySelector('#match-query') as HTMLInputElement;
    const year = document.body.querySelector('#match-year') as HTMLInputElement;
    query.value = 'Blade Runner';
    query.dispatchEvent(new Event('input', { bubbles: true }));
    year.value = '1982';
    year.dispatchEvent(new Event('input', { bubbles: true }));
    await flushPromises();

    (document.body.querySelector('form.match-modal__form') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flushPromises();

    expect(searchSpy).toHaveBeenCalledWith('m1', { query: 'Blade Runner', year: '1982' }, expect.anything());
    w.unmount();
  });

  it('"Use this" applies, emits the updated item, and closes', async () => {
    const updated = media({ name: 'Dune (matched)', poster_url: 'https://img/new.jpg' });
    const { w, applySpy } = setup({ apply: () => Promise.resolve({ item: updated, applied: { item_id: 'm1', mode: 'movie', tmdb_id: 42, matched: true, children_enriched: 0 } }) });
    await w.setProps({ modelValue: true });
    await flushPromises();

    const useBtn = Array.from(document.body.querySelectorAll('button')).find((b) => b.textContent?.includes('Use this'))!;
    useBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();

    expect(applySpy).toHaveBeenCalledWith('m1', { tmdb_id: 42, type: 'movie' });
    expect(w.emitted('applied')!.at(-1)).toEqual([updated]);
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([false]);
    w.unmount();
  });

  it('shows the empty state when no results', async () => {
    const { w } = setup({ search: () => Promise.resolve(okSearch([])) });
    await w.setProps({ modelValue: true });
    await flushPromises();
    expect(document.body.textContent).toContain('No results found');
    w.unmount();
  });

  it('shows the search error state and can retry', async () => {
    const { w, searchSpy } = setup({ search: () => Promise.reject(new ApiError('boom', 502, { code: 'metadata.tmdb_unreachable' })) });
    await w.setProps({ modelValue: true });
    await flushPromises();
    expect(document.body.querySelector('[role="alert"]')?.textContent).toContain('boom');

    searchSpy.mockResolvedValueOnce(okSearch([candidate()]));
    (Array.from(document.body.querySelectorAll('button')).find((b) => b.textContent?.includes('Try again'))!).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    expect(document.body.querySelectorAll('.match-modal__result').length).toBe(1);
    w.unmount();
  });

  it('shows the "configure TMDB" message on 422 tmdb_unconfigured', async () => {
    const { w } = setup({ search: () => Promise.reject(new ApiError('TMDB not configured', 422, { code: 'metadata.tmdb_unconfigured' })) });
    await w.setProps({ modelValue: true });
    await flushPromises();
    expect(document.body.textContent).toContain('TMDB is not configured');
    expect(document.body.textContent).toContain('admin settings');
    w.unmount();
  });

  it('passes an AbortSignal into matchSearch', async () => {
    const { w, searchSpy } = setup({});
    await w.setProps({ modelValue: true });
    await flushPromises();
    // third arg is the abort signal (undefined only when AbortController is absent)
    const signal = searchSpy.mock.calls[0]?.[2];
    expect(signal === undefined || signal instanceof AbortSignal).toBe(true);
    expect(signal).toBeInstanceOf(AbortSignal);
    w.unmount();
  });

  it('does not let a superseded (slower earlier) search overwrite a newer one', async () => {
    // First search resolves SLOWLY with "Old"; a second search started before it
    // resolves returns "New". The slower first response must NOT win.
    let resolveFirst!: (r: MatchSearchResult) => void;
    const first = new Promise<MatchSearchResult>((res) => {
      resolveFirst = res;
    });
    let call = 0;
    const search = (): Promise<MatchSearchResult> => {
      call += 1;
      return call === 1 ? first : Promise.resolve(okSearch([candidate({ tmdb_id: 99, title: 'New Result' })]));
    };
    const { w } = setup({ search });
    await w.setProps({ modelValue: true }); // kicks off search #1 (pending)

    // start search #2 while #1 is still pending
    (document.body.querySelector('form.match-modal__form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );
    await flushPromises(); // #2 resolves → "New Result"

    // now the slow first response lands — it is stale and must be ignored
    resolveFirst(okSearch([candidate({ tmdb_id: 1, title: 'Old Result' })]));
    await flushPromises();

    expect(document.body.textContent).toContain('New Result');
    expect(document.body.textContent).not.toContain('Old Result');
    expect(document.body.querySelectorAll('.match-modal__result').length).toBe(1);
    w.unmount();
  });

  it('aborting on close: a late response after close does not update state', async () => {
    let resolveLate!: (r: MatchSearchResult) => void;
    const late = new Promise<MatchSearchResult>((res) => {
      resolveLate = res;
    });
    const { w } = setup({ search: () => late });
    await w.setProps({ modelValue: true }); // search in flight
    await w.setProps({ modelValue: false }); // close → abortSearch() + resetState()
    await flushPromises();

    // the in-flight response lands AFTER close — its stale() guard must trip,
    // leaving no results behind
    resolveLate(okSearch([candidate({ tmdb_id: 5, title: 'Ghost' })]));
    await flushPromises();
    expect(document.body.textContent ?? '').not.toContain('Ghost');
    expect(document.body.querySelectorAll('.match-modal__result').length).toBe(0);
    w.unmount();
  });

  it('surfaces an apply failure inline without closing', async () => {
    const { w } = setup({ apply: () => Promise.reject(new ApiError('no match', 422, { code: 'metadata.no_match' })) });
    await w.setProps({ modelValue: true });
    await flushPromises();
    const useBtn = Array.from(document.body.querySelectorAll('button')).find((b) => b.textContent?.includes('Use this'))!;
    useBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    expect(document.body.querySelector('.match-modal__apply-error')?.textContent).toContain('No match details');
    // not closed
    expect(w.emitted('update:modelValue')).toBeFalsy();
    w.unmount();
  });
});
