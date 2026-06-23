import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/** localStorage keys for the persisted current-server selection. */
export const CURRENT_SERVER_ID_KEY = 'phlix.currentServerId';
export const CURRENT_SERVER_NAME_KEY = 'phlix.currentServerName';
export const CURRENT_SERVER_URL_KEY = 'phlix.currentServerUrl';

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
    /* storage unavailable (private mode / quota) — selection just isn't persisted */
  }
}

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
export const useServerStore = defineStore('server', () => {
  const currentServerId = ref<string | null>(readStored(CURRENT_SERVER_ID_KEY));
  const currentServerName = ref<string | null>(readStored(CURRENT_SERVER_NAME_KEY));
  const currentServerUrl = ref<string | null>(readStored(CURRENT_SERVER_URL_KEY));

  const hasCurrent = computed(() => currentServerId.value !== null);

  /**
   * Select the server to browse (persisted). Pass a display name for the shell and
   * the server's own public origin (used for direct media streaming; omit/empty
   * when the server has no reachable URL).
   */
  function setCurrent(id: string, name?: string, url?: string): void {
    currentServerId.value = id;
    currentServerName.value = name ?? null;
    currentServerUrl.value = url && url !== '' ? url : null;
    writeStored(CURRENT_SERVER_ID_KEY, id);
    writeStored(CURRENT_SERVER_NAME_KEY, name ?? null);
    writeStored(CURRENT_SERVER_URL_KEY, currentServerUrl.value);
  }

  /** Clear the selection (e.g. on logout or "back to all servers"). */
  function clear(): void {
    currentServerId.value = null;
    currentServerName.value = null;
    currentServerUrl.value = null;
    writeStored(CURRENT_SERVER_ID_KEY, null);
    writeStored(CURRENT_SERVER_NAME_KEY, null);
    writeStored(CURRENT_SERVER_URL_KEY, null);
  }

  return { currentServerId, currentServerName, currentServerUrl, hasCurrent, setCurrent, clear };
});
