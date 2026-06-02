import type { RouteRecordRaw } from 'vue-router';
import type { Command } from '../stores/useCommandStore';
import type { ThemeName } from '../stores/usePreferencesStore';
import type { IconName } from '../components/Icon.vue';
import type { LibraryQueryParams } from '../types/library-query';

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
}
