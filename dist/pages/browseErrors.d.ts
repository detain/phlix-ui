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
export declare function libraryLoadErrorInfo(code: string | null, fallbackDescription: string): {
    title: string;
    description: string;
};
