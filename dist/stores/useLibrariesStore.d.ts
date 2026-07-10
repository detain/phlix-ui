/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type LibrarySummary } from '../api/libraries';
/**
 * useLibrariesStore — a tiny shared cache of the viewer's libraries (already
 * sorted for display). Both the Browse rails and the dynamic library nav read
 * from here, so the list is fetched once per session and reused (the shell nav
 * and the Browse page would otherwise each hit `/api/v1/libraries`).
 *
 * `load()` is idempotent: it no-ops once loaded (pass `force` after a library
 * is created/removed in admin) and dedupes a concurrent in-flight call. A failed
 * load leaves `items` empty and records `error`; the Browse page renders an
 * EmptyState and the nav simply shows no library links (it never blocks the app).
 */
export declare const useLibrariesStore: import("pinia").StoreDefinition<"libraries", Pick<{
    items: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        name: string;
        type: string;
        display_order?: number | undefined;
        item_count?: number | undefined;
    }[], LibrarySummary[] | {
        [x: string]: unknown;
        id: string;
        name: string;
        type: string;
        display_order?: number | undefined;
        item_count?: number | undefined;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    errorCode: import("vue").Ref<string | null, string | null>;
    load: (apiBase: string, force?: boolean) => Promise<void>;
    byId: (id: string) => LibrarySummary | undefined;
}, "error" | "loading" | "items" | "loaded" | "errorCode">, Pick<{
    items: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        name: string;
        type: string;
        display_order?: number | undefined;
        item_count?: number | undefined;
    }[], LibrarySummary[] | {
        [x: string]: unknown;
        id: string;
        name: string;
        type: string;
        display_order?: number | undefined;
        item_count?: number | undefined;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    errorCode: import("vue").Ref<string | null, string | null>;
    load: (apiBase: string, force?: boolean) => Promise<void>;
    byId: (id: string) => LibrarySummary | undefined;
}, never>, Pick<{
    items: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        name: string;
        type: string;
        display_order?: number | undefined;
        item_count?: number | undefined;
    }[], LibrarySummary[] | {
        [x: string]: unknown;
        id: string;
        name: string;
        type: string;
        display_order?: number | undefined;
        item_count?: number | undefined;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    errorCode: import("vue").Ref<string | null, string | null>;
    load: (apiBase: string, force?: boolean) => Promise<void>;
    byId: (id: string) => LibrarySummary | undefined;
}, "load" | "byId">>;
