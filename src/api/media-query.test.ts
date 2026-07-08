/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import { buildMediaQuery, buildMediaUrl } from './media-query';

describe('buildMediaQuery', () => {
  it('returns an empty string for an empty query', () => {
    expect(buildMediaQuery()).toBe('');
    expect(buildMediaQuery({})).toBe('');
  });

  it('serializes scalar params', () => {
    const q = buildMediaQuery({ search: 'dune', sort: 'year', order: 'desc', limit: 18, offset: 0 });
    const sp = new URLSearchParams(q);
    expect(sp.get('search')).toBe('dune');
    expect(sp.get('sort')).toBe('year');
    expect(sp.get('order')).toBe('desc');
    expect(sp.get('limit')).toBe('18');
    expect(sp.get('offset')).toBe('0');
  });

  it('serializes the match-status filter', () => {
    expect(new URLSearchParams(buildMediaQuery({ match: 'unmatched' })).get('match')).toBe('unmatched');
    expect(new URLSearchParams(buildMediaQuery({})).has('match')).toBe(false);
  });

  it('appends repeated array params (genres/ratings/types/actors/companies)', () => {
    const q = buildMediaQuery({
      genres: ['Sci-Fi', 'Drama'],
      ratings: ['PG-13', 'R'],
      types: ['movie'],
      actors: ['Zendaya'],
      companies: ['Legendary', 'Warner Bros'],
    });
    const sp = new URLSearchParams(q);
    // `key[]=` form so PHP parses them into arrays (server requires is_array)
    expect(sp.getAll('genres[]')).toEqual(['Sci-Fi', 'Drama']);
    expect(sp.getAll('ratings[]')).toEqual(['PG-13', 'R']);
    expect(sp.getAll('types[]')).toEqual(['movie']);
    expect(sp.getAll('actors[]')).toEqual(['Zendaya']);
    expect(sp.getAll('companies[]')).toEqual(['Legendary', 'Warner Bros']);
    // and NOT the bare repeated form that the server drops
    expect(sp.getAll('genres')).toEqual([]);
    expect(sp.getAll('companies')).toEqual([]);
  });

  it('omits limit/offset when not supplied (partial-query tolerant)', () => {
    const sp = new URLSearchParams(buildMediaQuery({ genres: ['Sci-Fi'] }));
    expect(sp.has('limit')).toBe(false);
    expect(sp.has('offset')).toBe(false);
  });

  it('serializes libraryId when set, and omits it when blank/absent', () => {
    expect(new URLSearchParams(buildMediaQuery({ libraryId: 'lib-7' })).get('libraryId')).toBe('lib-7');
    expect(new URLSearchParams(buildMediaQuery({ genres: ['Sci-Fi'] })).has('libraryId')).toBe(false);
    expect(new URLSearchParams(buildMediaQuery({ libraryId: '' })).has('libraryId')).toBe(false);
  });

  it('serializes parentId (series detail drill-down) when set', () => {
    expect(new URLSearchParams(buildMediaQuery({ parentId: 'series-7' })).get('parentId')).toBe('series-7');
    expect(new URLSearchParams(buildMediaQuery({ genres: ['Drama'] })).has('parentId')).toBe(false);
  });

  it('serializes topLevel as `1` only when true', () => {
    expect(new URLSearchParams(buildMediaQuery({ topLevel: true })).get('topLevel')).toBe('1');
    expect(new URLSearchParams(buildMediaQuery({ topLevel: false })).has('topLevel')).toBe(false);
    expect(new URLSearchParams(buildMediaQuery({})).has('topLevel')).toBe(false);
  });

  it('emits yearFrom/yearTo and offset=0 (a falsy but meaningful value)', () => {
    const sp = new URLSearchParams(buildMediaQuery({ yearFrom: 1980, yearTo: 2024, offset: 0 }));
    expect(sp.get('yearFrom')).toBe('1980');
    expect(sp.get('yearTo')).toBe('2024');
    expect(sp.get('offset')).toBe('0');
  });

  it('builds a full URL against the api base', () => {
    expect(buildMediaUrl('https://api.test', { limit: 6 })).toBe('https://api.test/api/v1/media?limit=6');
    expect(buildMediaUrl('', {})).toBe('/api/v1/media?');
  });
});
