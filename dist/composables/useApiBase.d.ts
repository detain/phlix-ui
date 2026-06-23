import { type ComputedRef } from 'vue';
/**
 * Resolve the app's OWN API base (the hub or the media server hosting this SPA)
 * as a reactive `ComputedRef<string>`. This is the base for the host's own
 * endpoints — auth (`/auth/*`), the hub directory (`/me/*`), admin — which must
 * NEVER be proxied to a paired server.
 *
 * Accepts the injected `apiBase` as either a plain string or a `ComputedRef`.
 */
export declare function useApiBase(): ComputedRef<string>;
/**
 * Resolve the base for MEDIA browsing (libraries / media / detail / player) as a
 * reactive `ComputedRef<string>`.
 *
 * On the media server this equals {@link useApiBase} (the app's own base). On the
 * hub it is the relay-proxy base for the currently selected server
 * (`/api/v1/servers/{id}/proxy`), provided by `createPhlixApp` as a computed that
 * tracks `useServerStore`; selecting a different server re-points every media
 * fetch reactively. Falls back to the plain `apiBase` when no `mediaApiBase` is
 * provided (e.g. unit tests that only provide `apiBase`).
 */
export declare function useMediaApiBase(): ComputedRef<string>;
/**
 * Resolve the base the player streams media BYTES from directly, as a reactive
 * `ComputedRef<string>`.
 *
 * On the hub this is the currently selected server's own public origin (e.g.
 * `https://server.example`), provided by `createPhlixApp` as a computed over
 * `useServerStore`; the player prefixes a signed `/media/:id/stream` path with it
 * so a `<video src>` streams straight from the paired server (native Range) rather
 * than through the relay proxy, which does not route the byte-stream endpoint.
 * Resolves to '' on the media server or when no server (or no reachable URL) is
 * selected — the caller then falls back to {@link useMediaApiBase}.
 */
export declare function useMediaDirectBase(): ComputedRef<string>;
