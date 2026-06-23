/** localStorage keys for the persisted current-server selection. */
export declare const CURRENT_SERVER_ID_KEY = "phlix.currentServerId";
export declare const CURRENT_SERVER_NAME_KEY = "phlix.currentServerName";
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
 */
export declare const useServerStore: import("pinia").StoreDefinition<"server", Pick<{
    currentServerId: import("vue").Ref<string | null, string | null>;
    currentServerName: import("vue").Ref<string | null, string | null>;
    hasCurrent: import("vue").ComputedRef<boolean>;
    setCurrent: (id: string, name?: string) => void;
    clear: () => void;
}, "currentServerId" | "currentServerName">, Pick<{
    currentServerId: import("vue").Ref<string | null, string | null>;
    currentServerName: import("vue").Ref<string | null, string | null>;
    hasCurrent: import("vue").ComputedRef<boolean>;
    setCurrent: (id: string, name?: string) => void;
    clear: () => void;
}, "hasCurrent">, Pick<{
    currentServerId: import("vue").Ref<string | null, string | null>;
    currentServerName: import("vue").Ref<string | null, string | null>;
    hasCurrent: import("vue").ComputedRef<boolean>;
    setCurrent: (id: string, name?: string) => void;
    clear: () => void;
}, "clear" | "setCurrent">>;
