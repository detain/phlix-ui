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
