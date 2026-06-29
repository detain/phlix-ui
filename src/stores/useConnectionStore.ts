import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/** localStorage key for the persisted connection — the API base a native client
 *  (no baked-in origin) points at, chosen on the Connect screen. */
export const CONNECTION_API_BASE_KEY = 'phlix.connection.apiBase';

/** localStorage key for the origin (`scheme://host[:port]`) the user last
 *  explicitly confirmed sending its Bearer token to. The Connect flow requires a
 *  one-time confirm before committing a NEW origin, so a typo'd / hostile address
 *  cannot silently receive the token on the next authed call. */
export const CONNECTION_CONFIRMED_ORIGIN_KEY = 'phlix.connection.confirmedOrigin';

function readStored(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode / quota) — the choice just isn't persisted */
  }
}

/**
 * Normalise a user-entered base URL: trim surrounding whitespace and strip any
 * trailing slash(es) so concatenating a root-relative path (`/health`,
 * `/api/v1/…`) yields a clean URL with no double slash.
 */
export function normalizeBase(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

/** Schemes we will ever talk a Phlix API over. Anything else (`javascript:`,
 *  `data:`, `file:`, `ftp:`, …) is rejected outright — never prefixed, never
 *  persisted, never handed a Bearer token. */
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

/**
 * Is `host` a loopback / private-network address that legitimately tends to run
 * plain HTTP? Matches `localhost`, IPv6 loopback, the RFC1918 private IPv4 ranges
 * (`10.*`, `172.16–31.*`, `192.168.*`), CGNAT (`100.64–127.*`), and the LAN-only
 * mDNS / split-horizon TLDs self-hosters use (`*.local`, `*.lan`, `*.home`,
 * `*.internal`). `host` is a bare hostname WITHOUT scheme/port (as produced by
 * `new URL().hostname`, which lowercases and strips IPv6 brackets). Public
 * hostnames return false so they default to (and warn about the absence of) HTTPS.
 */
export function isPrivateHost(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, '');
  if (h === 'localhost' || h === '::1' || h.endsWith('.localhost')) return true;
  // LAN-only / split-horizon TLDs — never publicly resolvable, commonly plain http.
  if (/\.(local|lan|home|internal|intranet)$/.test(h)) return true;
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(h);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  if (a === 127) return true; // loopback
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 169 && b === 254) return true; // link-local 169.254.0.0/16
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT 100.64.0.0/10
  return false;
}

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
export function withScheme(raw: string): string {
  const value = raw.trim();
  if (value === '') return '';

  // A value "has a scheme" only when a `scheme:` prefix is NOT immediately a
  // `host:port` — i.e. the text after the first colon is not purely a port number.
  // This keeps `localhost:8096` / `media.example.com:8443` as bare hosts (port,
  // not scheme) while still catching `javascript:…`, `data:…`, `file:///…`.
  const schemeMatch = /^([a-z][a-z0-9+.-]*):(.*)$/i.exec(value);
  const hasScheme = schemeMatch !== null && !/^\d+(\/|\?|#|$)/.test(schemeMatch[2] ?? '');

  let candidate: string;
  if (hasScheme) {
    // Already has SOME scheme. Only http(s) survive; everything else is rejected
    // below by the URL/protocol check (we don't prefix a value that has a scheme).
    candidate = value;
  } else {
    // Bare host (optionally with port/path). Infer http for private hosts — but
    // ONLY when the host itself is private, so a public `host:8443` stays https.
    const hostPart = value.split(/[/?#]/, 1)[0]?.split(':', 1)[0] ?? '';
    candidate = `${isPrivateHost(hostPart) ? 'http' : 'https'}://${value}`;
  }

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return '';
  }
  if (!ALLOWED_PROTOCOLS.has(url.protocol)) return '';
  return candidate;
}

/**
 * True when `raw` resolves (via {@link withScheme}) to a well-formed
 * `http:`/`https:` base. Convenience predicate over `withScheme`'s `''`-on-reject
 * contract, for callers that only need the yes/no (e.g. field validation).
 */
export function isAllowedBase(raw: string): boolean {
  return withScheme(raw) !== '';
}

/**
 * True when `base` resolves to plain `http:` AND its host is public (not a
 * loopback / private address). These are the connections where a Bearer token
 * could be intercepted in transit, so the Connect screen warns before committing.
 * Anything that isn't a valid http(s) base, or that is http to a private host, or
 * that is https, returns false.
 */
export function isPlaintextPublic(base: string): boolean {
  const resolved = withScheme(base);
  if (!resolved) return false;
  let url: URL;
  try {
    url = new URL(resolved);
  } catch {
    return false;
  }
  return url.protocol === 'http:' && !isPrivateHost(url.hostname);
}

/** The canonical origin (`scheme://host[:port]`) of a resolved base, or `''` if
 *  it is not a valid http(s) base. Used to decide whether a Connect attempt is
 *  pointing the client — and thus its Bearer token — at a NEW origin. */
export function originOf(base: string): string {
  const resolved = withScheme(base);
  if (!resolved) return '';
  try {
    return new URL(resolved).origin;
  } catch {
    return '';
  }
}

/**
 * Probe a candidate server/hub base by GETting its public `/health` endpoint
 * (`{ status: 'ok', version, … }`), used by the Connect screen to confirm a URL
 * points at a reachable Phlix back end before persisting it. Resolves `true` when
 * the endpoint answers like Phlix, `false` on any non-OK status, malformed body,
 * timeout, CORS rejection, or network error — the caller surfaces a "couldn't
 * reach" message but may still let the user connect anyway (some servers don't
 * expose `/health` cross-origin). `fetchImpl` is injectable for unit tests.
 */
export async function probeServer(
  base: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 6000,
): Promise<boolean> {
  const normalized = normalizeBase(base);
  if (!normalized) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl(`${normalized}/health`, { signal: controller.signal });
    if (!res.ok) return false;
    const data = (await res.json().catch(() => null)) as { status?: unknown; version?: unknown } | null;
    return !!data && (data.status === 'ok' || data.version !== undefined);
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

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
export const useConnectionStore = defineStore('connection', () => {
  const apiBase = ref<string | null>(readStored(CONNECTION_API_BASE_KEY));
  // The origin the user last explicitly confirmed handing its Bearer token to.
  const confirmedOrigin = ref<string | null>(readStored(CONNECTION_CONFIRMED_ORIGIN_KEY));

  // Optional host callback fired whenever the connection changes. Module-captured
  // (not reactive state) — set once at boot by createPhlixApp from app config.
  let onChange: ((url: string | null) => void) | null = null;

  const isConnected = computed(() => !!apiBase.value);

  /** Register a host callback invoked on every connection change (or clear). */
  function configure(handler: ((url: string | null) => void) | null): void {
    onChange = handler;
  }

  /**
   * Does committing `url` point the client at a NEW origin (one the user has not
   * already confirmed)? True when the resolved origin differs from the last
   * confirmed one — the Connect flow uses this to gate a one-time token-send
   * confirm. An invalid / non-http(s) `url` is treated as new (it must be
   * rejected upstream anyway).
   */
  function isNewOrigin(url: string): boolean {
    const origin = originOf(url);
    return origin === '' || origin !== confirmedOrigin.value;
  }

  /** Record `url`'s origin as user-confirmed (persisted) so it won't re-prompt. */
  function confirmOrigin(url: string): void {
    const origin = originOf(url);
    confirmedOrigin.value = origin || null;
    writeStored(CONNECTION_CONFIRMED_ORIGIN_KEY, confirmedOrigin.value);
  }

  /** Persist the chosen base (normalised) and notify the host. Also marks the
   *  base's origin as confirmed — callers reaching here have already passed any
   *  new-origin token-send confirm in the Connect flow. */
  function setApiBase(url: string): void {
    const normalized = normalizeBase(url);
    apiBase.value = normalized || null;
    writeStored(CONNECTION_API_BASE_KEY, apiBase.value);
    if (apiBase.value) confirmOrigin(apiBase.value);
    onChange?.(apiBase.value);
  }

  /** Forget the connection (e.g. "change server"), and notify the host. */
  function clear(): void {
    apiBase.value = null;
    confirmedOrigin.value = null;
    writeStored(CONNECTION_API_BASE_KEY, null);
    writeStored(CONNECTION_CONFIRMED_ORIGIN_KEY, null);
    onChange?.(null);
  }

  return {
    apiBase,
    confirmedOrigin,
    isConnected,
    configure,
    isNewOrigin,
    confirmOrigin,
    setApiBase,
    clear,
  };
});
