/**
 * CP-014 — cookie custody: the CookieTokenStore, the credentials policy and
 * the boot probe (COOKIE-DESIGN §4.3).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiClient, resetCookieSessionProbe, setDefaultTokenStore } from './client';
import { CookieTokenStore, LocalStorageTokenStore, resolveTokenStoreMode } from './tokenStore';
import { MemoryTokenStore, makeFetch } from './test/memoryTokenStore';

const SAME_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

function credentialsOf(call: { init: RequestInit } | undefined): RequestCredentials | undefined {
    return call?.init?.credentials;
}

function headersOf(call: { init: RequestInit } | undefined): Record<string, string> {
    return (call?.init?.headers ?? {}) as Record<string, string>;
}

beforeEach(() => {
    resetCookieSessionProbe();
    setDefaultTokenStore(null);
    localStorage.clear();
});

afterEach(() => {
    resetCookieSessionProbe();
    setDefaultTokenStore(null);
    vi.useRealTimers();
    vi.restoreAllMocks();
    localStorage.clear();
});

describe('CookieTokenStore custody law (§4.3: "No secret ever crosses JS again")', () => {
    it('reads answer null and writes are no-ops', () => {
        const store = new CookieTokenStore();
        store.setAccessToken('a');
        store.setRefreshToken('r');
        store.setUser({ id: 'u' });
        expect(store.getAccessToken()).toBeNull();
        expect(store.getRefreshToken()).toBeNull();
        expect(store.getUser()).toBeNull();
        expect(() => store.clear()).not.toThrow();
    });

    it('never touches localStorage — not even to erase pre-cure residue', () => {
        // A device that logged in under the OLD bearer custody still holds its
        // pair in localStorage at cookie boot. The cure must neither write nor
        // re-adopt it: reads answer null while the foreign rows sit untouched.
        localStorage.setItem('access_token', 'stale-bearer-token');
        const spy = vi.spyOn(Storage.prototype, 'setItem');
        const eraseSpy = vi.spyOn(Storage.prototype, 'removeItem');
        const readSpy = vi.spyOn(Storage.prototype, 'getItem');
        const store = new CookieTokenStore();
        store.setAccessToken('a');
        store.setRefreshToken('r');
        store.setUser({ id: 'u' });
        store.clear();
        expect(store.getAccessToken()).toBeNull();
        expect(store.getRefreshToken()).toBeNull();
        expect(store.getUser()).toBeNull();
        expect(spy).not.toHaveBeenCalled();
        expect(eraseSpy).not.toHaveBeenCalled();
        expect(readSpy).not.toHaveBeenCalled();
        expect(localStorage.getItem('access_token')).toBe('stale-bearer-token');
    });

    it('declares mode "cookie"; every other store resolves to legacy "bearer"', () => {
        expect(new CookieTokenStore().mode).toBe('cookie');
        expect(resolveTokenStoreMode(new CookieTokenStore())).toBe('cookie');
        // Absent mode = the pre-CP-014 shape (host vaults, test doubles, the
        // window-less fallback) — feature-detect, never replace (CD-2a).
        expect(resolveTokenStoreMode(new MemoryTokenStore({ access: 't' }))).toBe('bearer');
        expect(resolveTokenStoreMode(new LocalStorageTokenStore(null))).toBe('bearer');
    });
});

describe('credentials policy (§4.3 "withCredentials:true on same-origin /app builds"; SSRF law)', () => {
    it('cookie custody on a same-origin base sends the cookie', async () => {
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new CookieTokenStore(), fetchImpl: fetch });
        await client.get('/api/v1/libraries');
        expect(credentialsOf(calls[0])).toBe('include');
    });

    it('cookie custody on a RELATIVE base (the vendored /app builds) sends the cookie', async () => {
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({ baseUrl: '', tokenStore: new CookieTokenStore(), fetchImpl: fetch });
        await client.get('/api/v1/libraries');
        expect(credentialsOf(calls[0])).toBe('include');
    });

    it('cookie custody on a CROSS-ORIGIN base never attaches the cookie (SSRF pin)', async () => {
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({ baseUrl: 'https://foreign.example', tokenStore: new CookieTokenStore(), fetchImpl: fetch });
        await client.get('/api/v1/libraries');
        expect(credentialsOf(calls[0])).toBe('same-origin');
    });

    it('bearer custody keeps the pre-existing literal byte-identical', async () => {
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });
        await client.get('/api/v1/libraries');
        expect(credentialsOf(calls[0])).toBe('same-origin');
        expect(headersOf(calls[0])['Authorization']).toBe('Bearer t');
    });

    it('cookie custody omits the Authorization header entirely (store reads null)', async () => {
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new CookieTokenStore(), fetchImpl: fetch });
        await client.get('/api/v1/libraries');
        expect(headersOf(calls[0])['Authorization']).toBeUndefined();
    });

    it('the multipart upload and avatar-delete legs follow the same policy', async () => {
        const { fetch, calls } = makeFetch([
            { status: 200, body: { avatar_url: 'x' } },
            { status: 200, body: {} },
        ]);
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new CookieTokenStore(), fetchImpl: fetch });
        await client.uploadAvatar(new File(['x'], 'a.png'));
        await client.deleteAvatar();
        expect(credentialsOf(calls[0])).toBe('include');
        expect(credentialsOf(calls[1])).toBe('include');
    });
});

describe('probeCookieSession (§4.3 boot detection; no-regression + M4/M7 laws)', () => {
    it('bearer boot short-circuits with ZERO network — no added round-trip', async () => {
        const { fetch, calls } = makeFetch([]);
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });
        await expect(client.probeCookieSession()).resolves.toBe('none');
        expect(calls).toHaveLength(0);
    });

    it('200 ⇒ "session"; the memo answers every later probe — one round-trip per boot', async () => {
        const { fetch, calls } = makeFetch([{ status: 200, body: { user: { id: 'u' } } }]);
        const store = new CookieTokenStore();
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: store, fetchImpl: fetch });
        await expect(client.probeCookieSession()).resolves.toBe('session');
        await expect(client.probeCookieSession()).resolves.toBe('session');
        // A SECOND client (the boot burst dozens of instances) shares the memo.
        const sibling = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: store, fetchImpl: fetch });
        await expect(sibling.probeCookieSession()).resolves.toBe('session');
        expect(calls).toHaveLength(1);
        expect(calls[0]!.url).toBe(`${SAME_ORIGIN}/api/v1/auth/me`);
        expect(credentialsOf(calls[0])).toBe('include');
    });

    it('401 ⇒ "none", cached conclusively', async () => {
        const { fetch, calls } = makeFetch([{ status: 401, body: {} }]);
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new CookieTokenStore(), fetchImpl: fetch });
        await expect(client.probeCookieSession()).resolves.toBe('none');
        await expect(client.probeCookieSession()).resolves.toBe('none');
        expect(calls).toHaveLength(1);
    });

    it('the memo is keyed by RESOLVED TARGET — two boots on one module keep independent verdicts (M9)', async () => {
        // CP-014 R2 pin (review w30L3ui, finding M-a): "multi-server boots each
        // get their own probe — correct per-origin cookie semantics" rests on
        // the Map key. Mutation M9 (lookup answered by values().next().value
        // regardless of target) must redden exactly this test — every other
        // probe test runs a single base, where first-value and keyed-lookup
        // answer identically.
        const urlA = `${SAME_ORIGIN}/api/v1/auth/me`; // base A: session minted
        const urlB = 'https://server-b.example/api/v1/auth/me'; // base B: session-less
        const statusByTarget: Record<string, number> = { [urlA]: 200, [urlB]: 401 };
        const calls: string[] = [];
        const fetchImpl = vi.fn((url: string, _init?: RequestInit) => {
            calls.push(url);
            const status = statusByTarget[url] ?? 500;
            return Promise.resolve({
                ok: status >= 200 && status < 300,
                status,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: () => Promise.resolve({}),
            } as unknown as Response);
        }) as unknown as typeof fetch;
        const clientA = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new CookieTokenStore(), fetchImpl });
        const clientB = new ApiClient({ baseUrl: 'https://server-b.example', tokenStore: new CookieTokenStore(), fetchImpl });
        // Round 1, A memoized first: B must still probe its OWN target and
        // answer 'none' — A's 'session' must never leak across the memo key,
        // and each target round-trips exactly once for the whole boot burst.
        await expect(clientA.probeCookieSession()).resolves.toBe('session');
        await expect(clientB.probeCookieSession()).resolves.toBe('none');
        await expect(clientA.probeCookieSession()).resolves.toBe('session');
        await expect(clientB.probeCookieSession()).resolves.toBe('none');
        expect(calls).toEqual([urlA, urlB]);
        // Round 2, reversed insertion order after the reset seam: whichever
        // target lands in the Map first, the other still answers for itself
        // (this leg is what a first-value lookup cannot fake from either side).
        resetCookieSessionProbe();
        calls.length = 0;
        await expect(clientB.probeCookieSession()).resolves.toBe('none');
        await expect(clientA.probeCookieSession()).resolves.toBe('session');
        expect(calls).toEqual([urlB, urlA]);
    });

    it('network failure ⇒ "unreachable" is NOT cached — the next attempt retries (M4)', async () => {
        let first = true;
        const fetchImpl = vi.fn((_url: string, _init?: RequestInit) => {
            if (first) {
                first = false;
                return Promise.reject(new TypeError('Failed to fetch'));
            }
            return Promise.resolve({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: () => Promise.resolve({ user: { id: 'u' } }),
            } as unknown as Response);
        }) as unknown as typeof fetch;
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new CookieTokenStore(), fetchImpl });
        await expect(client.probeCookieSession()).resolves.toBe('unreachable');
        await expect(client.probeCookieSession()).resolves.toBe('session');
        expect(fetchImpl).toHaveBeenCalledTimes(2);
    });

    it('a hung server times the probe out to "unreachable" and never parks the memo (M7)', async () => {
        vi.useFakeTimers();
        const fetchImpl = vi.fn((_url: string, init?: RequestInit) =>
            new Promise<Response>((_resolve, reject) => {
                init?.signal?.addEventListener('abort', () => reject(new Error('abort')));
            }),
        ) as unknown as typeof fetch;
        const client = new ApiClient({
            baseUrl: SAME_ORIGIN,
            tokenStore: new CookieTokenStore(),
            fetchImpl,
            timeoutMs: 5000,
        });
        const probe = client.probeCookieSession();
        vi.advanceTimersByTime(5001);
        await expect(probe).resolves.toBe('unreachable');
        // Evicted: a fresh probe after the timeout starts a new round-trip.
        resetCookieSessionProbe();
    });

    it('resetCookieSessionProbe re-arms detection after a minted/revoked cookie', async () => {
        const { fetch, calls } = makeFetch([{ status: 401, body: {} }, { status: 401, body: {} }]);
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new CookieTokenStore(), fetchImpl: fetch });
        await expect(client.probeCookieSession()).resolves.toBe('none');
        resetCookieSessionProbe();
        await expect(client.probeCookieSession()).resolves.toBe('none');
        expect(calls).toHaveLength(2);
    });

    it('a cookie store on a foreign base gets "none" from the probe, cookie-free (SSRF belt)', async () => {
        const { fetch, calls } = makeFetch([{ status: 401, body: {} }]);
        const client = new ApiClient({ baseUrl: 'https://foreign.example', tokenStore: new CookieTokenStore(), fetchImpl: fetch });
        await expect(client.probeCookieSession()).resolves.toBe('none');
        expect(credentialsOf(calls[0])).toBe('same-origin');
    });
});
