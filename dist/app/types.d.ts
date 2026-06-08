import type { RouteRecordRaw } from 'vue-router';
import type { Command } from '../stores/useCommandStore';
import type { ThemeName } from '../stores/usePreferencesStore';
import type { IconName } from '../components/Icon.vue';
import type { LibraryQueryParams } from '../types/library-query';
import type { PhlixMessagesConfig } from '../i18n/messages';
export interface MenuItem {
    id: string;
    label: string;
    icon?: IconName;
    /** Internal route target (rendered as a RouterLink). */
    to?: string;
    /** External URL (rendered as an `<a>`; sanitized against script schemes). */
    href?: string;
    /** Open target for `href` links; `_blank` gets `rel="noopener noreferrer"`. */
    target?: '_self' | '_blank';
    children?: MenuItem[];
    /** When true, the shell renders this item only for an authenticated admin
     *  (`useAuthStore().isAdmin`). Best-effort progressive disclosure for chrome
     *  like the "Admin" entry — the server API stays the real authorization
     *  boundary (admin endpoints are gated server-side regardless). */
    requiresAdmin?: boolean;
    /** When true, the shell expands this item with one nav link per library
     *  (fetched from `/api/v1/libraries`, linking to `/app/library/:id`), shown
     *  indented beneath it. Opt-in so it stays config-driven — only the media
     *  server's "Browse" entry sets it; the hub (no libraries) never does. */
    libraryLinks?: boolean;
}
/** Per-app brand identity rendered into the shell's `#logo` slot. All optional —
 *  omit for the default "Phlix" wordmark. Lets server vs hub diverge by config,
 *  never by `if (app === 'hub')` in shared code. */
export interface BrandingConfig {
    /** Wordmark text (default "Phlix"). */
    wordmark?: string;
    /** Optional logo image URL shown before the wordmark. */
    logoSrc?: string;
    /** Alt text for `logoSrc` (defaults to the wordmark). */
    logoAlt?: string;
    /** Optional short tagline rendered under/after the wordmark. */
    tagline?: string;
}
/** A configured Browse "home row" (a titled, query-scoped shelf). The type is
 *  established here as the config seam; the Browse surface renders it in R2. */
export interface HomeRow {
    id: string;
    title: string;
    /** Query params scoping the row (genre, type, sort, …). */
    query?: Partial<LibraryQueryParams>;
}
export interface PhlixAppConfig {
    app: 'server' | 'hub';
    apiBase: string;
    /** Origin (or absolute URL) of the host serving poster/artwork images when it
     *  differs from the app origin — e.g. a CDN or image proxy. The shell
     *  preconnects to it (R6.2c) so the first poster paints sooner. Optional: when
     *  omitted the image host is inferred from `apiBase` (posters are usually served
     *  from the API host), and a same-origin host is skipped (nothing to warm). */
    imageOrigin?: string;
    routerBase?: string;
    menu?: MenuItem[];
    extraRoutes?: RouteRecordRaw[];
    features?: Record<string, boolean>;
    /** App-injected ⌘K command-palette commands (R1.4). Registered alongside the
     *  built-ins by `createPhlixApp` (provided under the `phlixCommands` key). */
    commands?: Command[];
    /** Initial theme for first-time visitors (no stored preference). Once the user
     *  picks a theme it always wins. Applied pre-mount to avoid a flash. */
    defaultTheme?: ThemeName;
    /** Per-app brand identity for the shell's `#logo` slot. */
    branding?: BrandingConfig;
    /** Configured Browse home rows (consumed by the R2 Browse surface). */
    homeRows?: HomeRow[];
    /** Optional overrides for the adopted end-user-chrome strings (R6.5c i18n seam).
     *  A deep-partial map — override only the `group.key` strings you want; the rest
     *  fall back to the English defaults. Omit entirely for the default English UI.
     *  Resolve strings in components via `useMessages().t('group.key')`. */
    messages?: PhlixMessagesConfig;
}
