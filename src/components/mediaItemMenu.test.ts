import { describe, it, expect } from 'vitest';
import { buildMediaItemMenu } from './mediaItemMenu';
import type { MediaItem } from '../types/media-item';

const makeItem = (overrides: Partial<MediaItem> = {}): MediaItem =>
  ({
    id: 'm1',
    name: 'Test Media',
    type: 'movie',
    genres: [],
    year: 2024,
    rating: null,
    runtime: 90,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    poster_url: null,
    ...overrides,
  } as MediaItem);

describe('buildMediaItemMenu', () => {
  it('returns mark-watched label when item is not watched', () => {
    const item = makeItem();
    const menu = buildMediaItemMenu(item, { isAdmin: false, isWatched: false, canChoosePoster: false });
    expect(menu[0].label).toBe('Mark watched');
  });

  it('returns mark-unwatched label when item is watched', () => {
    const item = makeItem();
    const menu = buildMediaItemMenu(item, { isAdmin: false, isWatched: true, canChoosePoster: false });
    expect(menu[0].label).toBe('Mark unwatched');
  });

  it('non-admin gets only the watched toggle', () => {
    const item = makeItem();
    const menu = buildMediaItemMenu(item, { isAdmin: false, isWatched: false, canChoosePoster: false });
    expect(menu).toHaveLength(1);
  });

  it('admin gets Refresh/Match… item', () => {
    const item = makeItem();
    const menu = buildMediaItemMenu(item, { isAdmin: true, isWatched: false, canChoosePoster: false });
    const labels = menu.map((m) => m.label);
    expect(labels).toContain('Refresh/Match…');
  });

  it('admin without canChoosePoster does not get Choose poster…', () => {
    const item = makeItem();
    const menu = buildMediaItemMenu(item, { isAdmin: true, isWatched: false, canChoosePoster: false });
    const labels = menu.map((m) => m.label);
    expect(labels).not.toContain('Choose poster…');
  });

  it('admin with canChoosePoster gets Choose poster…', () => {
    const item = makeItem();
    const menu = buildMediaItemMenu(item, { isAdmin: true, isWatched: false, canChoosePoster: true });
    const labels = menu.map((m) => m.label);
    expect(labels).toContain('Choose poster…');
  });

  it('admin without canDelete does not get Remove', () => {
    const item = makeItem({});
    const menu = buildMediaItemMenu(item, { isAdmin: true, isWatched: false, canChoosePoster: false });
    const labels = menu.map((m) => m.label);
    expect(labels).not.toContain('Remove');
  });

  it('admin with canDelete=true gets Remove as danger', () => {
    const item = makeItem({ canDelete: true } as unknown as MediaItem);
    const menu = buildMediaItemMenu(item, { isAdmin: true, isWatched: false, canChoosePoster: false });
    const removeItem = menu.find((m) => m.label === 'Remove');
    expect(removeItem).toBeDefined();
    expect(removeItem!.danger).toBe(true);
  });

  it('non-admin never gets Remove even with canDelete=true', () => {
    const item = makeItem({ canDelete: true } as unknown as MediaItem);
    const menu = buildMediaItemMenu(item, { isAdmin: false, isWatched: false, canChoosePoster: false });
    const labels = menu.map((m) => m.label);
    expect(labels).not.toContain('Remove');
  });

  it('non-admin never gets Refresh/Match…', () => {
    const item = makeItem();
    const menu = buildMediaItemMenu(item, { isAdmin: false, isWatched: true, canChoosePoster: false });
    const labels = menu.map((m) => m.label);
    expect(labels).not.toContain('Refresh/Match…');
  });

  it('non-admin never gets Choose poster…', () => {
    const item = makeItem();
    const menu = buildMediaItemMenu(item, { isAdmin: false, isWatched: true, canChoosePoster: true });
    const labels = menu.map((m) => m.label);
    expect(labels).not.toContain('Choose poster…');
  });

  it('full admin menu: watched + Refresh + Choose poster + Remove', () => {
    const item = makeItem({ canDelete: true } as unknown as MediaItem);
    const menu = buildMediaItemMenu(item, { isAdmin: true, isWatched: true, canChoosePoster: true });
    expect(menu).toHaveLength(4);
    expect(menu[0].label).toBe('Mark unwatched');
    expect(menu[1].label).toBe('Refresh/Match…');
    expect(menu[2].label).toBe('Choose poster…');
    expect(menu[3].label).toBe('Remove');
    expect(menu[3].danger).toBe(true);
  });

  it('admin with canDelete=false does not get Remove', () => {
    const item = makeItem({ canDelete: false } as unknown as MediaItem);
    const menu = buildMediaItemMenu(item, { isAdmin: true, isWatched: false, canChoosePoster: true });
    const labels = menu.map((m) => m.label);
    expect(labels).not.toContain('Remove');
  });
});
