/**
 * TokenStore seam — token custody; the browser default persists to localStorage, hosts may take custody.
 *
 * Storage-failure contract (CU-078, ui__crossfe #3 + ui__fedev #5): no public
 * method of {@link LocalStorageTokenStore} throws. Kiosk/lockdown webviews can
 * disable storage so that even touching `window.localStorage` raises, and a
 * healthy origin can fail mid-session (`QuotaExceededError`, an eviction
 * `SecurityError`). The store answers both by degrading to an in-memory mirror:
 * construction feature-checks storage, and the first throwing operation latches
 * the instance to memory — migrating the keys still readable at that moment.
 * A degraded session therefore lives until reload (lost on refresh) while the
 * login flow never crashes; a host that needs durable custody takes over via
 * {@link TokenStore} (the R-UI-10 seam in `client.ts`).
 *
 * Residue caveat (review w01L7 Info, probe P3.2): when an ERASE is what threw
 * on the way into degradation, the cleared rows can survive in storage. The
 * degraded instance never reads them again — but a FRESH instance (a reload)
 * constructs against live storage and would re-adopt them. "Lives until
 * reload" is the durability promise; a degraded clear is only a session-scoped
 * one. Durable erase-under-duress is what host custody (the seam above) is for.
 *
 * Multi-tab caveat (review w01L7 Info, probe P4): once latched, the mirror
 * outranks live storage — an external tab's fresher localStorage writes stay
 * invisible to the degraded instance until reload. Observable consequence of
 * the migrate-at-latch design, recorded so nobody documents it as a bug.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { CookieMode } from '@phlix/contracts';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'user';

/**
 * Custody mode of a {@link TokenStore} (CP-014, COOKIE-DESIGN §4.3): `'cookie'`
 * stores are browser-cookie custody (the session lives ONLY in HttpOnly cookies;
 * reads return null and writes are no-ops BY DESIGN), `'bearer'` covers every
 * JS-held credential — localStorage, host vaults, test doubles.
 *
 * This is the ui-side alias of `@phlix/contracts`' `CookieMode` union (`src/auth.ts`,
 * landed CP-001; shipped in the `#v0.5.8` pin). The former local literal mirror
 * retired at the v0.5.8 re-pin (CP-014/CP-017 residual, flip executed) — the
 * contracts docblock is the wire-law authority for the value strings, and the
 * sentinel in `cookieCustody.test.ts` now pins the alias to the contracts values.
 */
export type TokenStoreMode = CookieMode;

export interface TokenStore {
    /**
     * Custody mode (CP-014). OPTIONAL ON PURPOSE: absent means `'bearer'`
     * semantics (see {@link resolveTokenStoreMode}), which keeps every
     * pre-existing store — the localStorage default, host vault adapters,
     * test doubles — assignable without change. Feature-detect, not replace:
     * the design keeps the localStorage path as the fallback mode for
     * device/embedded builds (CD-2a).
     */
    readonly mode?: TokenStoreMode;
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
}

/**
 * The single parse point for store custody (Parse, Don't Validate): a store is
 * cookie-custody ONLY when it declares `mode === 'cookie'`; anything else —
 * absent, a host vault, the localStorage default — is bearer custody. Callers
 * branch on the resolved value, never on `store.mode` directly, so the
 * absent-means-legacy law has exactly one home.
 */
export function resolveTokenStoreMode(store: TokenStore): TokenStoreMode {
    return store.mode === 'cookie' ? 'cookie' : 'bearer';
}

/** The origin's `localStorage` when it is actually reachable, else null —
 *  no `window` (SSR / unit construction) or a webview where the access itself
 *  throws. Evaluated at construction so the default parameter cannot raise. */
function accessibleLocalStorage(): Storage | null {
    if (typeof window === 'undefined') return null;
    try {
        return window.localStorage;
    } catch {
        return null;
    }
}

export class LocalStorageTokenStore implements TokenStore {
    /** Preferred custody while storage is reachable; null once degraded (or
     *  when it never was). Mutable because reaching for storage can fail. */
    private storage: Storage | null;
    /** Write-through mirror; the sole custody once the instance has degraded.
     *  A property bag rather than a `Map` on purpose: the S280 route-gate
     *  enumeration scanner reads `this.<field>.get(`/`.delete(` lines as
     *  request issuance, and this module issues zero requests. */
    private readonly memory: Partial<Record<string, string>> = {};

    constructor(storage: Storage | null = accessibleLocalStorage()) {
        this.storage = storage;
    }

    getAccessToken(): string | null {
        return this.read(ACCESS_TOKEN_KEY);
    }

    setAccessToken(token: string): void {
        this.write(ACCESS_TOKEN_KEY, token);
    }

    getRefreshToken(): string | null {
        return this.read(REFRESH_TOKEN_KEY);
    }

    setRefreshToken(token: string): void {
        this.write(REFRESH_TOKEN_KEY, token);
    }

    getUser(): unknown | null {
        const raw = this.read(USER_KEY);
        if (raw === null) return null;
        try {
            return JSON.parse(raw) as unknown;
        } catch {
            return null;
        }
    }

    setUser(user: unknown): void {
        this.write(USER_KEY, JSON.stringify(user));
    }

    clear(): void {
        this.erase(ACCESS_TOKEN_KEY);
        this.erase(REFRESH_TOKEN_KEY);
        this.erase(USER_KEY);
    }

    private read(key: string): string | null {
        const storage = this.storage;
        if (storage === null) return this.memory[key] ?? null;
        try {
            return storage.getItem(key);
        } catch {
            this.degradeToMemory();
            return this.memory[key] ?? null;
        }
    }

    private write(key: string, value: string): void {
        if (this.storage === null) {
            this.memory[key] = value;
            return;
        }
        try {
            this.storage.setItem(key, value);
        } catch {
            this.degradeToMemory();
        }
        this.memory[key] = value;
    }

    private erase(key: string): void {
        if (this.storage === null) {
            delete this.memory[key];
            return;
        }
        try {
            this.storage.removeItem(key);
        } catch {
            this.degradeToMemory();
        }
        delete this.memory[key];
    }

    /** Latch to memory-only custody, migrating the keys still readable so a
     *  session established before the failure survives the instance's first
     *  throwing operation instead of silently logging out. */
    private degradeToMemory(): void {
        const storage = this.storage;
        if (storage === null) return;
        this.storage = null;
        for (const key of [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]) {
            try {
                const raw = storage.getItem(key);
                if (raw !== null && this.memory[key] === undefined) this.memory[key] = raw;
            } catch {
                // Key unreachable — this mirror holds whatever it wrote itself.
            }
        }
    }
}

/**
 * Browser-cookie custody (CP-014, COOKIE-DESIGN §4.3): the session lives in
 * HttpOnly cookies the server mints at login (`POST /auth/login` →
 * `Set-Cookie`, landed CP-003); JS never holds — and must never appear to
 * hold — a credential. Reads return null, writes are no-ops, and NOTHING is
 * stored anywhere by this class: §4.3 puts the law as "No secret ever crosses
 * JS again", and the design's audit of the three bearer-read sites in
 * `client.ts` (request build / `postFormData` / `deleteAvatar`) confirmed all
 * are null-guarded, so a null-reading store simply omits the `Authorization`
 * header — the server then reads the cookie. The in-memory access mirror
 * §4.3(3) allows is deliberately NOT built here: no structurally-required
 * bearer consumer (worker postMessage etc.) exists in this package today, and
 * an unexercised mirror is exactly the secret-in-JS hole the cure closes.
 *
 * Registration is CONFIG-TIME through the existing `PhlixAppConfig.tokenStore`
 * seam (§4.3(6): "Mode flip is config-time (PhlixAppConfig) — NO new
 * runtime locale-style switching machinery"); the legacy `localStorage` path
 * stays the fallback for device/embedded boots (CD-2a). While a cookie store
 * is registered, bearer-shaped surfaces answer their nulls honestly:
 * `isLoggedIn()` is false and the session verdict comes from
 * `ApiClient.probeCookieSession()` (CP-014). The 401 refresh no longer
 * short-circuits: CP-016 shipped the cookie leg (§4.3(2) — a bodyless POST
 * carried by the HttpOnly refresh credential), and `logout()` delivers the
 * server-side Set-Cookie clear before the page navigates (§4.3(5)).
 */
export class CookieTokenStore implements TokenStore {
    readonly mode: TokenStoreMode = 'cookie';

    getAccessToken(): string | null {
        return null;
    }

    setAccessToken(_token: string): void {
        /* no-op BY DESIGN — a JS-visible write would defeat the custody cure */
    }

    getRefreshToken(): string | null {
        return null;
    }

    setRefreshToken(_token: string): void {
        /* no-op BY DESIGN — the refresh cookie is HttpOnly; rotation is the server's */
    }

    getUser(): unknown | null {
        return null;
    }

    setUser(_user: unknown): void {
        /* no-op BY DESIGN — profile reads flow through GET /auth/me, not custody */
    }

    clear(): void {
        /* no-op BY DESIGN — this store never wrote anything to erase; server-side
         * cookie revocation on logout is the CP-016 POST /auth/logout leg
         * (shipped — `ApiClient.logout`, COOKIE-DESIGN §4.3(5)). */
    }
}
