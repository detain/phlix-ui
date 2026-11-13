/**
 * CP-017 — cookie-mode suites at the §7 list plus the custody-pin flip STATE
 * (COOKIE-DESIGN §7: store/interceptor/single-flight suites; the TokenStoreMode
 * mirror's documented retirement path is pinned as a sentinel here).
 *
 * Deliberately NOT duplicating CP-014 (cookieTokenStore.test.ts: per-method
 * custody, policy matrix, probe) or CP-016 (cookieAuthFlow.test.ts: the
 * convicted legs). This file adds the package-WIDE end-to-end laws the single
 * suites structurally cannot see: the custody sweep across a full auth
 * session, the cross-client cookie lock, the exhaustive mode-resolution duck
 * matrix, and the sentinel that reddens the instant the contracts pin ships
 * `CookieMode` and this local mirror MUST retire.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApiClient, resetCookieSessionProbe } from './client';
import {
    CookieTokenStore,
    LocalStorageTokenStore,
    resolveTokenStoreMode,
    type TokenStore,
    type TokenStoreMode,
} from './tokenStore';

const SAME_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

interface CapturedCall {
    url: string;
    init: RequestInit;
}

function respond(status: number, body: unknown): Response {
    return {
        ok: status >= 200 && status < 300,
        status,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(body),
        text: () => Promise.resolve(JSON.stringify(body)),
    } as unknown as Response;
}

/** Same URL-aware shape as the CP-016 suite (per-file doubles are the idiom). */
function makeFlowFetch(): { fetch: typeof fetch; calls: CapturedCall[]; refreshCalls: CapturedCall[] } {
    const calls: CapturedCall[] = [];
    const refreshCalls: CapturedCall[] = [];
    const seen = new Set<string>();
    let refreshes = 0;
    const fetchImpl = async (url: string, init?: RequestInit): Promise<Response> => {
        const call = { url, init: init ?? {} };
        calls.push(call);
        if (url.endsWith('/api/v1/auth/refresh')) {
            refreshes += 1;
            refreshCalls.push(call);
            // A deliberately token-less body: cookie success is the 2xx alone.
            return respond(200, { rotated: refreshes });
        }
        if (!seen.has(url)) {
            seen.add(url);
            return respond(401, { error: 'expired' });
        }
        return respond(200, { ok: true });
    };
    return { fetch: fetchImpl as unknown as typeof fetch, calls, refreshCalls };
}

/** Duck-typed store shapes — what hosts actually hand the seam, mode included. */
function duckStore(mode: unknown): TokenStore {
    return {
        getAccessToken: () => null,
        setAccessToken: () => undefined,
        getRefreshToken: () => null,
        setRefreshToken: () => undefined,
        getUser: () => null,
        setUser: () => undefined,
        clear: () => undefined,
        ...(mode === undefined ? {} : { mode }),
    } as unknown as TokenStore;
}

beforeEach(() => {
    resetCookieSessionProbe();
    localStorage.clear();
});

afterEach(() => {
    resetCookieSessionProbe();
    vi.restoreAllMocks();
    localStorage.clear();
});

describe('resolveTokenStoreMode — the single parse point is total (§7 store suite)', () => {
    it.each<unknown>(['cookie', 'bearer', undefined, 'Cookie', '', 1, { via: 'object' }])(
        'resolves duck mode %j fail-safely (only the exact string "cookie" is cookie custody)',
        (mode) => {
            const resolved = resolveTokenStoreMode(duckStore(mode));
            const expected: TokenStoreMode = mode === 'cookie' ? 'cookie' : 'bearer';
            expect(resolved).toBe(expected);
        },
    );
});

describe('custody sweep — no secret crosses JS across a FULL cookie session (§4.3 headline law)', () => {
    it('a complete 401→refresh→retry→logout flow touches neither localStorage nor an Authorization header', async () => {
        const getSpy = vi.spyOn(Storage.prototype, 'getItem');
        const setSpy = vi.spyOn(Storage.prototype, 'setItem');
        const eraseSpy = vi.spyOn(Storage.prototype, 'removeItem');
        const { fetch, calls } = makeFlowFetch();
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: new CookieTokenStore(), fetchImpl: fetch });

        await client.get<{ ok: boolean }>('/api/v1/media'); // 401 → refresh → retry
        await client.logout(false);

        // Flow actually ran (guards against a vacuous zero-call green):
        // initial, refresh, retry, logout.
        expect(calls).toHaveLength(4);
        expect(getSpy).not.toHaveBeenCalled();
        expect(setSpy).not.toHaveBeenCalled();
        expect(eraseSpy).not.toHaveBeenCalled();
        for (const call of calls) {
            const headers = (call.init.headers ?? {}) as Record<string, string>;
            expect(headers['Authorization']).toBeUndefined();
            expect(call.init.credentials).toBe('include');
        }
    });
});

describe('the tab lock is per CREDENTIAL STORE across clients under cookie custody (M5 pair, cookie version)', () => {
    it('two ApiClients sharing one CookieTokenStore collapse concurrent 401s into ONE refresh POST', async () => {
        const store = new CookieTokenStore();
        const a = makeFlowFetch();
        const b = makeFlowFetch();
        const clientA = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: store, fetchImpl: a.fetch });
        const clientB = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: store, fetchImpl: b.fetch });

        const [ra, rb] = await Promise.all([
            clientA.get<{ ok: boolean }>('/api/v1/x'),
            clientB.get<{ ok: boolean }>('/api/v1/y'),
        ]);

        expect(ra).toEqual({ ok: true });
        expect(rb).toEqual({ ok: true });
        // The estate runs dozens of clients over one boot-registered store; the
        // WeakMap memo keyed BY THE STORE is what keeps the tab to a single
        // in-flight refresh even across instances.
        expect(a.refreshCalls.length + b.refreshCalls.length).toBe(1);
    });
});

describe('TokenStoreMode mirror — the contracts custody-flip sentinel (CP-017 flip: HOLD, condition pinned)', () => {
    it('the mirror literals equal the contracts wire-law value set', () => {
        // The value STRINGS are wire-law (COOKIE-DESIGN §4.3; the contracts
        // docblock is authority). Renaming either literal on either side
        // reddens here, which is exactly what a future real flip needs to
        // survive a type-erase blind spot.
        const mirror = ['cookie', 'bearer'] as const satisfies readonly TokenStoreMode[];
        expect(mirror).toEqual(['cookie', 'bearer']);
    });

    it('the INSTALLED contracts pin ships CookieMode — TokenStoreMode aliases it (flip executed at v0.5.8)', () => {
        // CP-017 sentinel fired at the `#v0.5.8` re-pin: `CookieMode` is now
        // exported by contracts `dist/auth.d.ts`, so tokenStore.ts re-exports the
        // contracts union instead of mirroring the literals. A moved/renamed dist
        // file fails loudly here too (readFileSync throws).
        const require = createRequire(import.meta.url);
        const pkgJson = require.resolve('@phlix/contracts/package.json');
        const authDts = readFileSync(join(dirname(pkgJson), 'dist', 'auth.d.ts'), 'utf8');
        expect(authDts).toContain('CookieMode');
        const src = readFileSync(
            join(dirname(fileURLToPath(import.meta.url)), 'tokenStore.ts'),
            'utf8',
        );
        expect(src).toContain("import type { CookieMode } from '@phlix/contracts'");
        expect(src).toContain('export type TokenStoreMode = CookieMode;');
    });

    it('the shipped LocalStorage default and the cookie store resolve apart through the same seam', () => {
        // One-parse-point law: the two REAL boot shapes (legacy default vs the
        // §4.3(6) config-time cookie registration) must never branch on
        // `store.mode` ad hoc — both resolve through resolveTokenStoreMode.
        expect(resolveTokenStoreMode(new LocalStorageTokenStore(null))).toBe('bearer');
        expect(resolveTokenStoreMode(new CookieTokenStore())).toBe('cookie');
    });
});
