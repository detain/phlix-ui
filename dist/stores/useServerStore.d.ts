/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** localStorage keys for the persisted current-server selection. */
export declare const CURRENT_SERVER_ID_KEY = "phlix.currentServerId";
export declare const CURRENT_SERVER_NAME_KEY = "phlix.currentServerName";
export declare const CURRENT_SERVER_URL_KEY = "phlix.currentServerUrl";
/**
 * useServerStore — the hub's "current server" selection.
 *
 * On the hub the SPA browses ONE paired media server at a time, with every media
 * API call routed through the relay proxy (`/api/v1/servers/{id}/proxy/…`). This
 * store holds which server is selected; {@link createPhlixApp} derives the media
 * `apiBase` (provided as `mediaApiBase`) from it, so selecting a server re-points
 * the Browse/library/detail pages at that server's proxied API reactively.
 *
 * The selection is persisted to `localStorage` so a reload or a deep link into a
 * media route keeps browsing the same server (the id isn't carried in the route).
 * It is a no-op concept on the media server itself (where there is no "other
 * server" to browse — `mediaApiBase` just equals the app base).
 *
 * `currentServerUrl` is the paired server's own public origin (its first advertised
 * hostname candidate), persisted alongside the selection. The player uses it to
 * stream media bytes DIRECTLY from the server (`{url}/media/:id/stream?sig`) with
 * native Range, since the relay proxy does not route the byte-stream endpoint; it
 * is empty when the server reported no reachable URL (then playback falls back to
 * an HLS transcode over the proxy). See {@link mediaDirectBaseFor}.
 */
export declare const useServerStore: import("pinia").StoreDefinition<"server", Pick<{
    currentServerId: import("vue").Ref<string | null, string | null>;
    currentServerName: import("vue").Ref<string | null, string | null>;
    currentServerUrl: import("vue").Ref<string | null, string | null>;
    hasCurrent: import("vue").ComputedRef<boolean>;
    setCurrent: (id: string, name?: string, url?: string) => void;
    clear: () => void;
}, "currentServerId" | "currentServerName" | "currentServerUrl">, Pick<{
    currentServerId: import("vue").Ref<string | null, string | null>;
    currentServerName: import("vue").Ref<string | null, string | null>;
    currentServerUrl: import("vue").Ref<string | null, string | null>;
    hasCurrent: import("vue").ComputedRef<boolean>;
    setCurrent: (id: string, name?: string, url?: string) => void;
    clear: () => void;
}, "hasCurrent">, Pick<{
    currentServerId: import("vue").Ref<string | null, string | null>;
    currentServerName: import("vue").Ref<string | null, string | null>;
    currentServerUrl: import("vue").Ref<string | null, string | null>;
    hasCurrent: import("vue").ComputedRef<boolean>;
    setCurrent: (id: string, name?: string, url?: string) => void;
    clear: () => void;
}, "clear" | "setCurrent">>;
