/**
 * useThemeSyncStore — the law of one server-side copy of the theme pref.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Keeps the account's server-side theme in step with the device.
 *
 * Three laws, each pinned in `useThemeSyncStore.test.ts`:
 *
 *  1. **Adoption is silent and server-wins.** Once per login the store reads
 *     `GET /api/v1/users/me/settings`; a theme that is known here (a built-in
 *     or in the catalogue) and differs from the local preference REPLACES it —
 *     that is the cross-device unification this feature exists for, and a
 *     console-client choice therefore follows the user into the browser.
 *     EVERY failure on that path (hub 404, offline, auth, malformed envelope)
 *     degrades to local-only with zero UI noise: the server copy is a bonus,
 *     never a dependency. A dead catalogue short-circuits the sync entirely —
 *     `/api/v1/users/me/settings` is absent on exactly the mounts where
 *     `/api/v1/themes` is absent (the hub), so there is nothing to ask.
 *  2. **An adoption never echoes back as a save.** `serverTheme` holds the
 *     value known durable on the server and is written BEFORE the preference
 *     it triggers; the selection watcher in `useTheme` routes through
 *     `queuePut`, whose first check is equality against it.
 *  3. **A failed save is disclosure, not drama.** `putFailed` drives one
 *     unobtrusive inline hint. Nothing rolls back, nothing repaints — the
 *     instant local apply (S86) stays exactly as it was; the next successful
 *     save clears the flag.
 *
 * Optimistic bookkeeping, stated honestly: `serverTheme` advances only on a
 * PUT that both carried the LATEST user value and succeeded — so the guard
 * can never bless a value the server rejected, and a stale in-flight write
 * (user moved on while it was sent) does not move the guard either.
 */
export declare const useThemeSyncStore: import("pinia").StoreDefinition<"themeSync", Pick<{
    serverTheme: import("vue").Ref<string | null, string | null>;
    putFailed: import("vue").Ref<boolean, boolean>;
    syncFromServer: (apiBase: string | null) => Promise<void>;
    queuePut: (apiBase: string, theme: string) => void;
    endSession: () => void;
}, "serverTheme" | "putFailed">, Pick<{
    serverTheme: import("vue").Ref<string | null, string | null>;
    putFailed: import("vue").Ref<boolean, boolean>;
    syncFromServer: (apiBase: string | null) => Promise<void>;
    queuePut: (apiBase: string, theme: string) => void;
    endSession: () => void;
}, never>, Pick<{
    serverTheme: import("vue").Ref<string | null, string | null>;
    putFailed: import("vue").Ref<boolean, boolean>;
    syncFromServer: (apiBase: string | null) => Promise<void>;
    queuePut: (apiBase: string, theme: string) => void;
    endSession: () => void;
}, "syncFromServer" | "queuePut" | "endSession">>;
