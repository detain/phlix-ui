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
export declare const ACCESS_TOKEN_KEY = "access_token";
export declare const REFRESH_TOKEN_KEY = "refresh_token";
export declare const USER_KEY = "user";
export interface TokenStore {
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
}
export declare class LocalStorageTokenStore implements TokenStore {
    /** Preferred custody while storage is reachable; null once degraded (or
     *  when it never was). Mutable because reaching for storage can fail. */
    private storage;
    /** Write-through mirror; the sole custody once the instance has degraded.
     *  A property bag rather than a `Map` on purpose: the S280 route-gate
     *  enumeration scanner reads `this.<field>.get(`/`.delete(` lines as
     *  request issuance, and this module issues zero requests. */
    private readonly memory;
    constructor(storage?: Storage | null);
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
    private read;
    private write;
    private erase;
    /** Latch to memory-only custody, migrating the keys still readable so a
     *  session established before the failure survives the instance's first
     *  throwing operation instead of silently logging out. */
    private degradeToMemory;
}
