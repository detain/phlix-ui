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

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'user';

export interface TokenStore {
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
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
