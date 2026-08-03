/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type ActiveThemeStyle, type ServerTheme } from '../composables/themeTokens';
/**
 * useThemesStore (S86) — the server's theme catalogue, fetched once per session.
 *
 * Deliberately shaped like `useLibrariesStore`: `load()` is idempotent, dedupes
 * a concurrent in-flight call, and a failure is RECORDED rather than thrown. A
 * failed load must be a complete non-event for the user — the three built-in
 * themes live in the SPA's own stylesheet and are already painted, so an
 * unreachable/unauthenticated `/api/v1/themes` just means the picker shows
 * three entries instead of four.
 *
 * The store holds only the catalogue. Nothing here touches the DOM; applying a
 * theme is `useTheme`'s job, which reads `styleFor()`.
 */
export declare const useThemesStore: import("pinia").StoreDefinition<"themes", Pick<{
    items: import("vue").Ref<{
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[], ServerTheme[] | {
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    pluginThemes: import("vue").ComputedRef<{
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[]>;
    load: (apiBase: string, force?: boolean) => Promise<void>;
    byId: (id: string) => ServerTheme | undefined;
    styleFor: (id: string) => ActiveThemeStyle | null;
}, "error" | "loading" | "items" | "loaded">, Pick<{
    items: import("vue").Ref<{
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[], ServerTheme[] | {
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    pluginThemes: import("vue").ComputedRef<{
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[]>;
    load: (apiBase: string, force?: boolean) => Promise<void>;
    byId: (id: string) => ServerTheme | undefined;
    styleFor: (id: string) => ActiveThemeStyle | null;
}, "pluginThemes">, Pick<{
    items: import("vue").Ref<{
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[], ServerTheme[] | {
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    pluginThemes: import("vue").ComputedRef<{
        id: string;
        name: string;
        dark: boolean;
        extends: string | null;
        tokens: Record<string, string>;
        source: string | null;
        builtIn: boolean;
    }[]>;
    load: (apiBase: string, force?: boolean) => Promise<void>;
    byId: (id: string) => ServerTheme | undefined;
    styleFor: (id: string) => ActiveThemeStyle | null;
}, "load" | "byId" | "styleFor">>;
