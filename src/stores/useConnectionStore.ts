import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/** localStorage key for the persisted connection — the API base a native client
 *  (no baked-in origin) points at, chosen on the Connect screen. */
export const CONNECTION_API_BASE_KEY = 'phlix.connection.apiBase';

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

/**
 * Add a URL scheme to a bare host the user typed without one. Self-hosters on a
 * LAN usually mean plain HTTP (`localhost`, a `127.x`/private IP, or a host with
 * an explicit `:port`), so those default to `http://`; anything else (a public
 * hostname) defaults to `https://`. A value that already has a scheme is returned
 * unchanged. Pure, so the Connect screen can unit-test the inference.
 */
export function withScheme(raw: string): string {
  const value = raw.trim();
  if (value === '' || /^https?:\/\//i.test(value)) return value;
  const localish =
    /^(localhost|127\.0\.0\.1|\[?::1\]?|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/|$)/i.test(value) ||
    /:\d+(\/|$)/.test(value);
  return `${localish ? 'http' : 'https'}://${value}`;
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

  // Optional host callback fired whenever the connection changes. Module-captured
  // (not reactive state) — set once at boot by createPhlixApp from app config.
  let onChange: ((url: string | null) => void) | null = null;

  const isConnected = computed(() => !!apiBase.value);

  /** Register a host callback invoked on every connection change (or clear). */
  function configure(handler: ((url: string | null) => void) | null): void {
    onChange = handler;
  }

  /** Persist the chosen base (normalised) and notify the host. */
  function setApiBase(url: string): void {
    const normalized = normalizeBase(url);
    apiBase.value = normalized || null;
    writeStored(CONNECTION_API_BASE_KEY, apiBase.value);
    onChange?.(apiBase.value);
  }

  /** Forget the connection (e.g. "change server"), and notify the host. */
  function clear(): void {
    apiBase.value = null;
    writeStored(CONNECTION_API_BASE_KEY, null);
    onChange?.(null);
  }

  return { apiBase, isConnected, configure, setApiBase, clear };
});
