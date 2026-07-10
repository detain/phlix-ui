/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** localStorage key for the persisted connection — the API base a native client
 *  (no baked-in origin) points at, chosen on the Connect screen. */
export declare const CONNECTION_API_BASE_KEY = "phlix.connection.apiBase";
/** localStorage key for the origin (`scheme://host[:port]`) the user last
 *  explicitly confirmed sending its Bearer token to. The Connect flow requires a
 *  one-time confirm before committing a NEW origin, so a typo'd / hostile address
 *  cannot silently receive the token on the next authed call. */
export declare const CONNECTION_CONFIRMED_ORIGIN_KEY = "phlix.connection.confirmedOrigin";
/**
 * Normalise a user-entered base URL: trim surrounding whitespace and strip any
 * trailing slash(es) so concatenating a root-relative path (`/health`,
 * `/api/v1/…`) yields a clean URL with no double slash.
 */
export declare function normalizeBase(url: string): string;
/**
 * Is `host` a loopback / private-network address that legitimately tends to run
 * plain HTTP? Matches `localhost`, IPv6 loopback, the RFC1918 private IPv4 ranges
 * (`10.*`, `172.16–31.*`, `192.168.*`), CGNAT (`100.64–127.*`), and the LAN-only
 * mDNS / split-horizon TLDs self-hosters use (`*.local`, `*.lan`, `*.home`,
 * `*.internal`). `host` is a bare hostname WITHOUT scheme/port (as produced by
 * `new URL().hostname`, which lowercases and strips IPv6 brackets). Public
 * hostnames return false so they default to (and warn about the absence of) HTTPS.
 */
export declare function isPrivateHost(host: string): boolean;
/**
 * Add a URL scheme to a bare host the user typed without one and validate it.
 * Self-hosters on a LAN usually mean plain HTTP, so `localhost`, a loopback /
 * RFC1918 private IP (incl. an explicit `:port`) defaults to `http://`; anything
 * else — including a PUBLIC hostname with a non-standard port like `host:8443` —
 * defaults to `https://`. A value that already carries an `http:`/`https:` scheme
 * is kept as-is.
 *
 * Returns `''` for an empty value OR any value that, once a scheme is inferred,
 * does not parse as a well-formed `http:`/`https:` URL. This is the choke point
 * that stops a `javascript:`/`data:`/`file:` payload from being prefixed and
 * falling through into a still-dangerous string. PURE, so the Connect screen can
 * unit-test the inference + allow-listing.
 */
export declare function withScheme(raw: string): string;
/**
 * True when `raw` resolves (via {@link withScheme}) to a well-formed
 * `http:`/`https:` base. Convenience predicate over `withScheme`'s `''`-on-reject
 * contract, for callers that only need the yes/no (e.g. field validation).
 */
export declare function isAllowedBase(raw: string): boolean;
/**
 * True when `base` resolves to plain `http:` AND its host is public (not a
 * loopback / private address). These are the connections where a Bearer token
 * could be intercepted in transit, so the Connect screen warns before committing.
 * Anything that isn't a valid http(s) base, or that is http to a private host, or
 * that is https, returns false.
 */
export declare function isPlaintextPublic(base: string): boolean;
/** The canonical origin (`scheme://host[:port]`) of a resolved base, or `''` if
 *  it is not a valid http(s) base. Used to decide whether a Connect attempt is
 *  pointing the client — and thus its Bearer token — at a NEW origin. */
export declare function originOf(base: string): string;
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
    confirmedOrigin: import("vue").Ref<string | null, string | null>;
    isConnected: import("vue").ComputedRef<boolean>;
    configure: (handler: ((url: string | null) => void) | null) => void;
    isNewOrigin: (url: string) => boolean;
    confirmOrigin: (url: string) => void;
    setApiBase: (url: string) => void;
    clear: () => void;
}, "apiBase" | "confirmedOrigin">, Pick<{
    apiBase: import("vue").Ref<string | null, string | null>;
    confirmedOrigin: import("vue").Ref<string | null, string | null>;
    isConnected: import("vue").ComputedRef<boolean>;
    configure: (handler: ((url: string | null) => void) | null) => void;
    isNewOrigin: (url: string) => boolean;
    confirmOrigin: (url: string) => void;
    setApiBase: (url: string) => void;
    clear: () => void;
}, "isConnected">, Pick<{
    apiBase: import("vue").Ref<string | null, string | null>;
    confirmedOrigin: import("vue").Ref<string | null, string | null>;
    isConnected: import("vue").ComputedRef<boolean>;
    configure: (handler: ((url: string | null) => void) | null) => void;
    isNewOrigin: (url: string) => boolean;
    confirmOrigin: (url: string) => void;
    setApiBase: (url: string) => void;
    clear: () => void;
}, "clear" | "configure" | "isNewOrigin" | "confirmOrigin" | "setApiBase">>;
