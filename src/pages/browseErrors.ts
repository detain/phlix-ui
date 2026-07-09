/**
 * Maps a library-load failure `code` (from `useLibrariesStore.errorCode`, sourced
 * from the hub relay proxy's 503 `ApiError` body) to an actionable EmptyState
 * `{title, description}` for the Browse surface.
 *
 * On the hub, `apiBase` resolves to the selected server's relay proxy, so a browse
 * of a server whose tunnel isn't connected propagates one of these codes:
 *   - `server.relay_unavailable` / `server.no_tunnel` — the server is online but
 *     its secure relay tunnel isn't connected yet, so its libraries can't be
 *     loaded over the hub (it should reconnect automatically).
 *   - `server.offline` — the server is offline.
 * Any other/unknown code (or a direct-server failure with no code) falls back to
 * the generic "Couldn't load your libraries" title with the store's own message
 * as the description.
 *
 * Pure + side-effect free so it is trivially unit-testable without mounting the
 * heavy BrowsePage SFC.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
export function libraryLoadErrorInfo(
  code: string | null,
  fallbackDescription: string,
): { title: string; description: string } {
  switch (code) {
    case 'server.relay_unavailable':
    case 'server.no_tunnel':
      return {
        title: 'Server relay not connected',
        description:
          "This server is online but its secure relay tunnel isn't connected yet, so its libraries can't be loaded over the hub. It should reconnect automatically — try again in a moment.",
      };
    case 'server.offline':
      return {
        title: 'Server offline',
        description:
          'This server is offline, so its libraries can’t be loaded. It will be browsable again once it reconnects to the hub.',
      };
    default:
      return { title: "Couldn't load your libraries", description: fallbackDescription };
  }
}
