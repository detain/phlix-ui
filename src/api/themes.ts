/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';
import { LocalStorageTokenStore } from './tokenStore';
import { normalizeServerTheme, type ServerTheme } from '../composables/themeTokens';

/**
 * The theme catalogue endpoint (S85/S86).
 *
 * `GET /api/v1/themes` returns every theme this server knows about: the three
 * host built-ins plus whatever the enabled theme plugins registered, each with
 * its own token map and a `builtIn` flag.
 *
 * Two properties of the endpoint shape this client:
 *
 *  - **It is authenticated.** The route sits inside `WebPortalRouter`'s
 *    `AuthMiddleware` group, because the list names the theme plugins installed
 *    on the server (a plugin-fingerprinting aid) and because the audience that
 *    can act on it — the appearance picker — is signed in by definition. Nothing
 *    about the first paint may depend on this call succeeding; the built-ins are
 *    in the SPA's own bundled CSS, and a previously-chosen plugin theme repaints
 *    from `localStorage`. See `applyStoredThemeEarly`.
 *  - **`tokens` is each theme's OWN map, not a flattened one.** A theme with a
 *    non-null `extends` is layered client-side (`resolveThemeTokens` +
 *    `resolveThemeBase`); the LIST response contains every base this server
 *    knows, so one call is always enough.
 *
 * Only `GET /api/v1/themes` is used. `GET /api/v1/themes/{id}` exists but the
 * SPA deliberately never calls it — see `resolveThemeTokens`'s docblock for why
 * the detail endpoint's non-self-sufficiency for an `extends`ing theme is moot
 * rather than merely unhandled.
 */

/**
 * Fetch and normalise the server's theme catalogue.
 *
 * Every entry goes through {@link normalizeServerTheme}, which re-applies the
 * key allowlist and the value grammar; an entry that cannot be normalised is
 * DROPPED rather than throwing, so one malformed theme (an older/newer server,
 * a mangled proxy response) cannot cost the user the whole picker.
 *
 * A transport/auth failure is NOT swallowed here — it propagates so the caller
 * (`useThemesStore.load`) can record it and leave the built-ins in place.
 */
export async function fetchThemes(apiBase: string, signal?: AbortSignal): Promise<ServerTheme[]> {
  const client = new ApiClient({
    baseUrl: apiBase,
    // Guarded for SSR/no-window exactly like `fetchLibraries`: this only ever
    // runs client-side, but the token store touches localStorage on construct.
    tokenStore: typeof window !== 'undefined' ? new LocalStorageTokenStore() : undefined,
  });

  // Path only — ApiClient prepends `baseUrl` itself.
  const res = await client.get<{ themes?: unknown }>('/api/v1/themes', undefined, signal);
  const raw = Array.isArray(res.themes) ? res.themes : [];

  const out: ServerTheme[] = [];
  for (const entry of raw) {
    const theme = normalizeServerTheme(entry);
    if (theme !== null) out.push(theme);
  }
  return out;
}
