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

  it('appends repeated array params (genres/ratings/types/actors)', () => {
    const q = buildMediaQuery({
      genres: ['Sci-Fi', 'Drama'],
      ratings: ['PG-13', 'R'],
      types: ['movie'],
      actors: ['Zendaya'],
    });
    const sp = new URLSearchParams(q);
    // `key[]=` form so PHP parses them into arrays (server requires is_array)
    expect(sp.getAll('genres[]')).toEqual(['Sci-Fi', 'Drama']);
    expect(sp.getAll('ratings[]')).toEqual(['PG-13', 'R']);
    expect(sp.getAll('types[]')).toEqual(['movie']);
    expect(sp.getAll('actors[]')).toEqual(['Zendaya']);
    // and NOT the bare repeated form that the server drops
    expect(sp.getAll('genres')).toEqual([]);
  });

  it('omits limit/offset when not supplied (partial-query tolerant)', () => {
    const sp = new URLSearchParams(buildMediaQuery({ genres: ['Sci-Fi'] }));
    expect(sp.has('limit')).toBe(false);
    expect(sp.has('offset')).toBe(false);
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
