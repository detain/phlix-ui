/**
 * canManagePlaylist — the pure Option-A manageability law. Component mounts
 * (PlaylistDetailPage / PlaylistPickerModal) pin the SAME rule end-to-end;
 * this table pins its truth table directly so a future editor cannot quietly
 * widen it without reddening both layers.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect } from 'vitest';
import { canManagePlaylist } from './playlistPermissions';

describe('canManagePlaylist', () => {
  it('lets the owner manage their own row', () => {
    expect(canManagePlaylist('u1', 'u1', false)).toBe(true);
  });

  it('refuses a member a foreign-owned row', () => {
    expect(canManagePlaylist('u2', 'u1', false)).toBe(false);
  });

  it('refuses a member a legacy NULL-owned row (admin-manage-only)', () => {
    expect(canManagePlaylist(null, 'u1', false)).toBe(false);
  });

  it('refuses everyone while no session user is known (fail closed)', () => {
    expect(canManagePlaylist('u1', null, false)).toBe(false);
    expect(canManagePlaylist(null, null, false)).toBe(false);
  });

  it('admins manage every row, including NULL-owned and foreign-owned', () => {
    expect(canManagePlaylist('u2', 'admin', true)).toBe(true);
    expect(canManagePlaylist(null, 'admin', true)).toBe(true);
  });

  it('an unauthenticated admin flag still manages (server-side gate is the real door)', () => {
    // isAdmin only ever derives from a fetched session user; the pairing with
    // currentUserId === null cannot occur in-app. The law keeps admin FIRST so
    // the row reads like the server's check (admin bypass, then ownership).
    expect(canManagePlaylist(null, null, true)).toBe(true);
  });
});
