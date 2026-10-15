/**
 * Playlist manageability — the client mirror of the server's Option-A law.
 *
 * Server truth (phlix-server `CollectionController`, migration 112): a
 * playlist row's VISIBILITY set is `{created_by = me} ∪ {created_by IS NULL}`
 * for every member, but its MANAGEABILITY set — update, delete, add/remove
 * items — is `{created_by = me}` plus admins. Legacy `NULL`-owner rows are
 * therefore readable-by-members but admin-manage-only; an add/remove against
 * one 404s (ownership miss renders the byte-identical not-found envelope).
 *
 * Keeping this as a pure function means the picker, the detail page, and any
 * future playlist surface gate on ONE definition instead of re-deriving the
 * rule per template.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * May the current actor modify (delete / add / remove items in) a playlist
 * whose `created_by` is `createdBy`?
 *
 * @param createdBy  The row's owner id, or `null` for legacy shared rows.
 * @param currentUserId  The signed-in user's id, or `null` when unknown
 *                       (no session established yet) — fails closed.
 * @param isAdmin    Active session's admin flag.
 */
export function canManagePlaylist(
  createdBy: string | null,
  currentUserId: string | null,
  isAdmin: boolean,
): boolean {
  if (isAdmin) return true;
  if (currentUserId === null || createdBy === null) return false;
  return createdBy === currentUserId;
}
