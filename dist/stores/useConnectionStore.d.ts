/** localStorage key for the persisted connection — the API base a native client
 *  (no baked-in origin) points at, chosen on the Connect screen. */
export declare const CONNECTION_API_BASE_KEY = "phlix.connection.apiBase";
/**
 * Normalise a user-entered base URL: trim surrounding whitespace and strip any
 * trailing slash(es) so concatenating a root-relative path (`/health`,
 * `/api/v1/…`) yields a clean URL with no double slash.
 */
export declare function normalizeBase(url: string): string;
/**
 * Add a URL scheme to a bare host the user typed without one. Self-hosters on a
 * LAN usually mean plain HTTP (`localhost`, a `127.x`/private IP, or a host with
 * an explicit `:port`), so those default to `http://`; anything else (a public
 * hostname) defaults to `https://`. A value that already has a scheme is returned
 * unchanged. Pure, so the Connect screen can unit-test the inference.
 */
export declare function withScheme(raw: string): string;
/**
 * Probe a candidate server/hub base by GETting its public `/health` endpoint
 * (`{ status: 'ok', version, … }`), used by the Connect screen to confirm a URL
 * points at a reachable Phlix back end before persisting it. Resolves `true` when
 * the endpoint answers like Phlix, `false` on any non-OK status, malformed body,
 * timeout, CORS rejection, or network error — the caller surfaces a "couldn't
 * reach" message but may still let the user connect anyway (some servers don't
 * expose `/health` cross-origin). `fetchImpl` is injectable for unit tests.
 */
export declare function probeServer(base: string, fetchImpl?: typeof fetch, timeoutMs?: number): Promise<boolean>;
/**
 * useConnectionStore — the runtime-chosen API base for native clients.
 *
 * A web-hosted server/hub serves the SPA from its own origin, so its `apiBase` is
 * baked in at boot and this store stays empty. A native desktop/TV client
 * (Windows/Tizen/…) ships with NO server baked in — it must ask the user which
 * Phlix server (or hub) to talk to. The Connect screen persists that choice here
 * (and to `localStorage`), and {@link createPhlixApp} provides `apiBase` as a
 * computed over it, so picking/changing a server re-points every API call
 * reactively without a reload.
 *
 * `configure(onChange)` lets the host shell mirror the chosen URL into its own
 * durable store (e.g. the Electron client writes it back via `setServerUrl` so
 * `resolveAppConfig` re-seeds it next launch).
 */
export declare const useConnectionStore: import("pinia").StoreDefinition<"connection", Pick<{
    apiBase: import("vue").Ref<string | null, string | null>;
    isConnected: import("vue").ComputedRef<boolean>;
    configure: (handler: ((url: string | null) => void) | null) => void;
    setApiBase: (url: string) => void;
    clear: () => void;
}, "apiBase">, Pick<{
    apiBase: import("vue").Ref<string | null, string | null>;
    isConnected: import("vue").ComputedRef<boolean>;
    configure: (handler: ((url: string | null) => void) | null) => void;
    setApiBase: (url: string) => void;
    clear: () => void;
}, "isConnected">, Pick<{
    apiBase: import("vue").Ref<string | null, string | null>;
    isConnected: import("vue").ComputedRef<boolean>;
    configure: (handler: ((url: string | null) => void) | null) => void;
    setApiBase: (url: string) => void;
    clear: () => void;
}, "clear" | "configure" | "setApiBase">>;
