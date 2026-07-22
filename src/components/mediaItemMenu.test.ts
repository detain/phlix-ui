/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { buildMediaItemMenu, MENU_LABELS } from './mediaItemMenu';
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

const ctx = (over: Partial<Parameters<typeof buildMediaItemMenu>[1]> = {}) => ({
  isAdmin: false,
  isWatched: false,
  isSeriesOrSeason: false,
  canChoosePoster: false,
  ...over,
});

describe('buildMediaItemMenu', () => {
  it('everyone gets the core actions (playlist, played, download, shuffle)', () => {
    const labels = buildMediaItemMenu(makeItem(), ctx()).map((m) => m.label);
    expect(labels).toContain(MENU_LABELS.addToPlaylist);
    expect(labels).toContain(MENU_LABELS.markPlayed);
    expect(labels).toContain(MENU_LABELS.download);
    expect(labels).toContain(MENU_LABELS.shuffle);
  });

  it('does NOT offer Like/Dislike — the ThumbRating widget is the single control (S03)', () => {
    // Regression guard: the redundant, less-capable menu aliases were removed in
    // S03. Assert on the string literals (the MENU_LABELS keys were deleted) so
    // re-introducing either menu entry fails here. Like/Dislike now live ONLY on
    // the ThumbRating widget.
    const labels = buildMediaItemMenu(makeItem(), ctx({ isAdmin: true })).map((m) => m.label);
    expect(labels).not.toContain('Like');
    expect(labels).not.toContain('Dislike');
    expect(MENU_LABELS).not.toHaveProperty('like');
    expect(MENU_LABELS).not.toHaveProperty('dislike');
  });

  it('shows "Mark played" when not watched and "Mark unplayed" when watched', () => {
    expect(buildMediaItemMenu(makeItem(), ctx({ isWatched: false })).map((m) => m.label)).toContain(
      MENU_LABELS.markPlayed,
    );
    const watched = buildMediaItemMenu(makeItem(), ctx({ isWatched: true })).map((m) => m.label);
    expect(watched).toContain(MENU_LABELS.markUnplayed);
    expect(watched).not.toContain(MENU_LABELS.markPlayed);
  });

  it('only series/season items get "View missing episodes"', () => {
    expect(buildMediaItemMenu(makeItem(), ctx({ isSeriesOrSeason: false })).map((m) => m.label)).not.toContain(
      MENU_LABELS.missingEpisodes,
    );
    expect(buildMediaItemMenu(makeItem(), ctx({ isSeriesOrSeason: true })).map((m) => m.label)).toContain(
      MENU_LABELS.missingEpisodes,
    );
  });

  it('non-admin does NOT get the admin actions (match metadata/edit metadata/explore/remove)', () => {
    const labels = buildMediaItemMenu(makeItem(), ctx({ isAdmin: false })).map((m) => m.label);
    expect(labels).not.toContain(MENU_LABELS.matchMetadata);
    expect(labels).not.toContain(MENU_LABELS.editMetadata);
    expect(labels).not.toContain(MENU_LABELS.exploreData);
    expect(labels).not.toContain(MENU_LABELS.editImages);
    expect(labels).not.toContain(MENU_LABELS.remove);
  });

  it('admin gets a single match metadata action, edit metadata, and explore item data', () => {
    const labels = buildMediaItemMenu(makeItem(), ctx({ isAdmin: true })).map((m) => m.label);
    expect(labels).toContain(MENU_LABELS.matchMetadata);
    // The three formerly-duplicate labels collapsed to one entry (S02).
    expect(labels.filter((l) => l === MENU_LABELS.matchMetadata)).toHaveLength(1);
    expect(labels).toContain(MENU_LABELS.editMetadata);
    expect(labels).toContain(MENU_LABELS.exploreData);
  });

  it('no longer offers the retired "Refresh metadata"/"Identify from beginning" labels (S02 merge)', () => {
    // Regression guard: the two duplicate affordances were folded into the single
    // "Match metadata" entry. Assert on the string literals (the MENU_LABELS keys
    // were deleted) so re-introducing either label fails here.
    const labels = buildMediaItemMenu(makeItem(), ctx({ isAdmin: true })).map((m) => m.label);
    expect(labels).not.toContain('Refresh metadata');
    expect(labels).not.toContain('Identify from beginning');
    // ...and the MENU_LABELS map itself no longer exposes the retired keys.
    expect(MENU_LABELS).not.toHaveProperty('refreshMetadata');
    expect(MENU_LABELS).not.toHaveProperty('identify');
  });

  it('"Edit images" is gated on canChoosePoster', () => {
    expect(
      buildMediaItemMenu(makeItem(), ctx({ isAdmin: true, canChoosePoster: false })).map((m) => m.label),
    ).not.toContain(MENU_LABELS.editImages);
    expect(
      buildMediaItemMenu(makeItem(), ctx({ isAdmin: true, canChoosePoster: true })).map((m) => m.label),
    ).toContain(MENU_LABELS.editImages);
  });

  it('Remove is admin + canDelete only, and flagged danger', () => {
    expect(buildMediaItemMenu(makeItem(), ctx({ isAdmin: true })).map((m) => m.label)).not.toContain(
      MENU_LABELS.remove,
    );
    const item = makeItem({ canDelete: true } as unknown as MediaItem);
    const remove = buildMediaItemMenu(item, ctx({ isAdmin: true })).find((m) => m.label === MENU_LABELS.remove);
    expect(remove?.danger).toBe(true);
    // never for a non-admin, even with canDelete
    expect(buildMediaItemMenu(item, ctx({ isAdmin: false })).map((m) => m.label)).not.toContain(
      MENU_LABELS.remove,
    );
  });
});
