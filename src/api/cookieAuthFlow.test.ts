/**
 * CP-016 — cookie-custody auth FLOW (COOKIE-DESIGN §4.3(2) + §4.3(5)).
 *
 * The two legs this suite convicts-at-parent before curing:
 * - the 401 interceptor's refresh round-trip under cookie custody (at
 *   9a2fdc13 the leg short-circuited on `getRefreshToken() === null`, so a
 *   cookie boot could never refresh: every access-token expiry was a hard
 *   session death — zero refresh POSTs attempted), and
 * - the logout leg (at 9a2fdc13 `logout()` never touched the network, so the
 *   HttpOnly pair survived a "logout" until its own TTL).
 *
 * Bearer custody keeps answering exactly as before — its legs are pinned
 * byte-identical in `client.test.ts` (run unmodified) and by L4 below.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiClient, resetCookieSessionProbe } from './client';
import { CookieTokenStore } from './tokenStore';
import { MemoryTokenStore, makeFetch } from './test/memoryTokenStore';
import { ApiError, TimeoutError } from './errors';

const SAME_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
const REFRESH_URL = `${SAME_ORIGIN}/api/v1/auth/refresh`;

function credentialsOf(call: { init: RequestInit } | undefined): RequestCredentials | undefined {
    return call?.init?.credentials;
}

function headersOf(call: { init: RequestInit } | undefined): Record<string, string> {
    return (call?.init?.headers ?? {}) as Record<string, string>;
}

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

/**
 * URL-aware flow fake: every protected URL 401s on its first hit and 200s on
 * the retry; `/auth/refresh` POSTs answer per `spec.refresh` (default: a 200
 * carrying NO token fields at all — cookie success is the 2xx answer alone).
 * A body whose `json()` rejects proves the client never parsed it.
 */
function makeFlowFetch(spec: {
    refresh?: { status: number; unparsableBody?: true } | { rejectsOnce: true };
} = {}): { fetch: typeof fetch; calls: CapturedCall[]; refreshCalls: CapturedCall[] } {
    const calls: CapturedCall[] = [];
    const refreshCalls: CapturedCall[] = [];
    const seenTargets = new Set<string>();
    let refreshAttempts = 0;
    const fetchImpl = async (url: string, init?: RequestInit): Promise<Response> => {
        const call = { url, init: init ?? {} };
        calls.push(call);
        if (url.endsWith('/api/v1/auth/refresh')) {
            refreshAttempts += 1;
            refreshCalls.push(call);
            if (spec.refresh && 'rejectsOnce' in spec.refresh && refreshAttempts === 1) {
                throw new TypeError('network down');
            }
            if (spec.refresh && 'status' in spec.refresh) {
                const outcome = spec.refresh;
                if (outcome.unparsableBody) {
                    return {
                        ok: outcome.status >= 200 && outcome.status < 300,
                        status: outcome.status,
                        headers: new Headers({ 'content-type': 'application/json' }),
                        json: () => Promise.reject(new SyntaxError('body was never meant to be read')),
                        text: () => Promise.resolve(''),
                    } as unknown as Response;
                }
                return respond(outcome.status, { server: 'rotated the cookie pair' });
            }
            return respond(200, { server: 'rotated the cookie pair' });
        }
        if (!seenTargets.has(url)) {
            seenTargets.add(url);
            return respond(401, { error: 'expired' });
        }
        return respond(200, { ok: true });
    };
    return { fetch: fetchImpl as unknown as typeof fetch, calls, refreshCalls };
}

/** A refresh leg that only settles when its abort signal fires (timeout law). */
function hangingRefreshFetch(calls: CapturedCall[]): typeof fetch {
    const fetchImpl = (url: string, init?: RequestInit): Promise<Response> => {
        calls.push({ url, init: init ?? {} });
        if (url.endsWith('/api/v1/auth/refresh')) {
            return new Promise<Response>((_resolve, reject) => {
                init?.signal?.addEventListener('abort', () =>
                    reject(new DOMException('Aborted', 'AbortError')),
                );
            });
        }
        return Promise.resolve(respond(401, { error: 'expired' }));
    };
    return fetchImpl as unknown as typeof fetch;
}

function cookieClient(
    fetchImpl: typeof fetch,
    overrides: { baseUrl?: string; timeoutMs?: number } = {},
): ApiClient {
    return new ApiClient({
        baseUrl: overrides.baseUrl ?? SAME_ORIGIN,
        tokenStore: new CookieTokenStore(),
        fetchImpl,
        ...(overrides.timeoutMs !== undefined ? { timeoutMs: overrides.timeoutMs } : {}),
    });
}

beforeEach(() => {
    resetCookieSessionProbe();
    localStorage.clear();
});

afterEach(() => {
    resetCookieSessionProbe();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    localStorage.clear();
});

describe('cookie custody 401 refresh (§4.3(2): one cookie-bearing POST, body never read)', () => {
    it('R1 a 401 triggers exactly ONE bodyless refresh POST with policy credentials; the cookie retry carries no Authorization', async () => {
        const { fetch, calls, refreshCalls } = makeFlowFetch();
        const client = cookieClient(fetch);

        await expect(client.get<{ ok: boolean }>('/api/v1/media')).resolves.toEqual({ ok: true });

        expect(refreshCalls).toHaveLength(1);
        expect(refreshCalls[0]!.url).toBe(REFRESH_URL);
        expect(refreshCalls[0]!.init.method).toBe('POST');
        // The HttpOnly cookie IS the credential: nothing crosses JS in either
        // direction. The empty JSON object is the "use my cookie" presentation
        // — an old server rejects it below (R3), a cookie-capable one rotates.
        expect(refreshCalls[0]!.init.body).toBe('{}');
        expect(credentialsOf(refreshCalls[0])).toBe('include');
        expect(headersOf(refreshCalls[0])['Content-Type']).toBe('application/json');

        // The retry is the third call; it carries the cookie, never a bearer.
        expect(calls).toHaveLength(3);
        expect(headersOf(calls[0])['Authorization']).toBeUndefined();
        expect(headersOf(calls[2])['Authorization']).toBeUndefined();
        expect(credentialsOf(calls[2])).toBe('include');
    });

    it('R2 a cookie store mis-pointed CROSS-ORIGIN never attaches the cookie on the refresh leg (SSRF law rides the policy)', async () => {
        const { fetch, refreshCalls } = makeFlowFetch();
        const client = cookieClient(fetch, { baseUrl: 'https://foreign.example' });

        await client.get('/api/v1/media');

        expect(refreshCalls).toHaveLength(1);
        expect(credentialsOf(refreshCalls[0])).toBe('same-origin');
    });

    it('R3 a server too old for the cookie path (400) degrades CLEAN: no retry, the caller sees its one 401, the session expires once', async () => {
        let expiredEvents = 0;
        const onExpired = (): void => {
            expiredEvents += 1;
        };
        window.addEventListener('phlix:auth-expired', onExpired);
        try {
            const { fetch, calls, refreshCalls } = makeFlowFetch({
                refresh: { status: 400 },
            });
            const client = cookieClient(fetch);

            await expect(client.get('/api/v1/media')).rejects.toMatchObject({ status: 401 });
            // Exactly one protected hit + one refresh — the failed refresh must
            // not loop, storm, or double-fire the expiry event.
            expect(calls).toHaveLength(2);
            expect(refreshCalls).toHaveLength(1);
            expect(expiredEvents).toBe(1);
        } finally {
            window.removeEventListener('phlix:auth-expired', onExpired);
        }
    });

    it('R4 §5 CD-2a: a 2xx answer alone IS success — the refresh response is never parsed (its body would even throw on .json())', async () => {
        const { fetch, refreshCalls } = makeFlowFetch({
            refresh: { status: 200, unparsableBody: true },
        });
        const client = cookieClient(fetch);

        // The bearer leg treats a token-less 200 as a dead pair (pinned in
        // client.test.ts); cookie custody must NOT: rotation lives in the
        // Set-Cookie header the browser applies, and page JS reads nothing.
        await expect(client.get<{ ok: boolean }>('/api/v1/media')).resolves.toEqual({ ok: true });
        expect(refreshCalls).toHaveLength(1);
    });

    it('R5 a network failure on the refresh leg is unknown, not determinative: the lock clears and a LATER 401 starts a fresh POST', async () => {
        const { fetch, refreshCalls } = makeFlowFetch({ refresh: { rejectsOnce: true } });
        const client = cookieClient(fetch);

        await expect(client.get('/api/v1/a')).rejects.toBeInstanceOf(ApiError);
        expect(refreshCalls).toHaveLength(1);

        await expect(client.get<{ ok: boolean }>('/api/v1/b')).resolves.toEqual({ ok: true });
        expect(refreshCalls).toHaveLength(2);
    });

    it('R6 single-flight: N concurrent cookie 401s collapse into ONE refresh POST and all N retries resolve', async () => {
        const { fetch, refreshCalls } = makeFlowFetch();
        const client = cookieClient(fetch);

        const N = 5;
        const results = await Promise.all(
            Array.from({ length: N }, (_unused, i) => client.get<{ ok: boolean }>(`/api/v1/r${i}`)),
        );

        expect(refreshCalls).toHaveLength(1);
        for (const r of results) {
            expect(r).toEqual({ ok: true });
        }
    });

    it('R6b single-flight HOLD (w32 review MAJOR-1): while the ONE refresh response is unsettled, ZERO protected retries fire — all N land after it settles', async () => {
        // R6 pins the COLLAPSE half (N 401s → one refresh POST). It cannot see
        // the ORDER half COOKIE-DESIGN §4.3(2) names ("concurrent 401s queue
        // on ONE promise"): with the waiter short-circuited to an eager
        // `Promise.resolve(true)` (client.ts:949) every non-first caller
        // retries against pre-settle state and R6 still passes — measured by
        // the reviewer's executed mutation (zero convictions across the old
        // panel). This test gates the refresh RESPONSE behind a test-owned
        // deferred so the HOLD itself is observable: while the gate is closed
        // the protected path must show exactly its N initial 401 hits and no
        // more. Conviction: the short-circuit mutation fires the N-1 retries
        // inside the gated window (count > N, red).
        const N = 4;
        const calls: CapturedCall[] = [];
        const refreshCalls: CapturedCall[] = [];
        const seenTargets = new Set<string>();
        let settleRefresh!: () => void;
        const refreshGate = new Promise<void>((resolve) => {
            settleRefresh = resolve;
        });
        const fetchImpl = ((url: string, init?: RequestInit): Promise<Response> => {
            const call = { url, init: init ?? {} };
            calls.push(call);
            if (url.endsWith('/api/v1/auth/refresh')) {
                refreshCalls.push(call);
                return refreshGate.then(() => respond(200, { server: 'rotated the cookie pair' }));
            }
            if (!seenTargets.has(url)) {
                seenTargets.add(url);
                return Promise.resolve(respond(401, { error: 'expired' }));
            }
            return Promise.resolve(respond(200, { ok: true }));
        }) as unknown as typeof fetch;
        const client = cookieClient(fetchImpl);

        const protectedCalls = (): number =>
            calls.filter((c) => !c.url.endsWith('/api/v1/auth/refresh')).length;

        const flows = Array.from({ length: N }, (_unused, i) => client.get<{ ok: boolean }>(`/api/v1/r${i}`));
        // HOLD window — FOUR macrotask rounds while the gate stays CLOSED
        // (round-3 forward-fix, REVIEW-w32L2ui-round2 MAJOR-1). The round-2
        // pin shared ONE checkpoint, and the review's executed M-C mutation
        // (waiter arm behind a fixed `setTimeout(() => resolve(true), 0)`)
        // landed its retries exactly outside that single tick — 262/262
        // green. Each round re-asserts the law, so a short-circuit hidden
        // behind ANY fixed delay is convicted at checkpoint delay+1: eager
        // at 1, one-timer at 2, two-timer at 3, three-timer at 4 (the
        // round-3 register's matrix — the class, not just the case).
        for (let checkpoint = 1; checkpoint <= 4; checkpoint += 1) {
            // One tick drains every microtask chain up to the gated refresh
            // — plus every waiter timer queued BEFORE this round's own.
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(refreshCalls, `HOLD checkpoint ${checkpoint}: still exactly ONE refresh POST`).toHaveLength(1);
            // HOLD law: only the N initial hits exist — not one retry fired
            // while the single refresh response was still in flight.
            expect(protectedCalls(), `HOLD checkpoint ${checkpoint}: ZERO retries pre-settle`).toBe(N);
        }

        settleRefresh();
        const results = await Promise.all(flows);

        for (const r of results) {
            expect(r).toEqual({ ok: true });
        }
        expect(refreshCalls).toHaveLength(1);
        // All N retries exist only AFTER the settle: N initial + N retries.
        expect(protectedCalls()).toBe(2 * N);
    });

    it('R7 M7 discipline on the cookie leg: a hung server cannot park the single-flighted waiters (client timeout aborts it)', async () => {
        const calls: CapturedCall[] = [];
        const client = cookieClient(hangingRefreshFetch(calls), { timeoutMs: 10 });

        await expect(client.get('/api/v1/a')).rejects.toBeInstanceOf(TimeoutError);
        expect(calls.filter((c) => c.url.endsWith('/api/v1/auth/refresh'))).toHaveLength(1);
    });

    it('R8 M10 pin completed on the BEARER leg too: the refresh POST keeps the policy answer, never an unconditional cookie', async () => {
        // The M10 BANK deferred the refresh-leg credentials pin to this commit
        // ("definable with CP-016"). R1/R2 pin the cookie direction of the
        // seam ('include' here, never there); this pins the bearer direction:
        // an unconditional `'include'` mutation on the leg reddens exactly
        // here — no bearer-era boot ever starts riding cookies cross-mode.
        const tokens = new MemoryTokenStore({ access: 'old', refresh: 'r-1' });
        const { fetch, calls } = makeFetch([
            { status: 401, body: {} },
            { status: 200, body: { access_token: 'new' } },
            { status: 200, body: { ok: true } },
        ]);
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: tokens, fetchImpl: fetch });

        await client.get('/api/v1/media');

        expect(calls[1]!.url).toBe(REFRESH_URL);
        expect(credentialsOf(calls[1])).toBe('same-origin');
    });
});

describe('cookie custody logout (§4.3(5): the POST must be DELIVERED before the page navigates)', () => {
    it('L1 logout POSTs /auth/logout with policy credentials and never parses the answer (endpoint 302s; verdict is irrelevant)', async () => {
        const jsonSpy = vi.fn();
        const textSpy = vi.fn();
        const calls: CapturedCall[] = [];
        const fetchImpl = ((url: string, init?: RequestInit): Promise<Response> => {
            calls.push({ url, init: init ?? {} });
            return Promise.resolve({
                ok: false,
                status: 302,
                headers: new Headers({ 'content-type': 'text/html' }),
                json: jsonSpy,
                text: textSpy,
            } as unknown as Response);
        }) as unknown as typeof fetch;
        const client = cookieClient(fetchImpl);

        await expect(client.logout(false)).resolves.toBeUndefined();

        expect(calls).toHaveLength(1);
        expect(calls[0]!.url).toBe(`${SAME_ORIGIN}/api/v1/auth/logout`);
        expect(calls[0]!.init.method).toBe('POST');
        expect(credentialsOf(calls[0])).toBe('include');
        expect(calls[0]!.init.body).toBeUndefined();
        expect(jsonSpy).not.toHaveBeenCalled();
        expect(textSpy).not.toHaveBeenCalled();
    });

    it('L2 a rejecting logout POST never blocks teardown: the promise resolves and the redirect still lands', async () => {
        const locationObj = { href: '' };
        const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue(locationObj as Location);
        const fetchImpl = vi.fn().mockRejectedValue(new TypeError('offline')) as unknown as typeof fetch;
        const client = cookieClient(fetchImpl, { baseUrl: '' });

        try {
            await expect(client.logout()).resolves.toBeUndefined();
            expect(fetchImpl).toHaveBeenCalledTimes(1);
            expect(locationObj.href).toBe('/login');
        } finally {
            locationSpy.mockRestore();
        }
    });

    it('L3 ordering (the defect itself): the redirect WAITS for the POST to settle — a navigation fired first would abort it', async () => {
        const locationObj = { href: '' };
        const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue(locationObj as Location);
        let settle!: () => void;
        const gate = new Promise<void>((resolve) => {
            settle = resolve;
        });
        const calls: CapturedCall[] = [];
        const fetchImpl = (async (url: string, init?: RequestInit): Promise<Response> => {
            calls.push({ url, init: init ?? {} });
            await gate;
            return respond(200, { ok: true });
        }) as unknown as typeof fetch;
        const client = new ApiClient({
            baseUrl: SAME_ORIGIN,
            tokenStore: new CookieTokenStore(),
            fetchImpl,
            loginPath: '/app/login',
        });

        try {
            const done = client.logout();
            // While the leg is in flight the navigation owner holds the page.
            expect(calls).toHaveLength(1);
            expect(locationObj.href).toBe('');
            settle();
            await done;
            expect(locationObj.href).toBe('/app/login');
        } finally {
            locationSpy.mockRestore();
        }
    });

    it('L4 bearer custody issues ZERO logout network requests — the wire path stays byte-identical (no added leg, no timing change)', async () => {
        const calls: CapturedCall[] = [];
        const fetchImpl = ((url: string, init?: RequestInit): Promise<Response> => {
            calls.push({ url, init: init ?? {} });
            return Promise.resolve(respond(200, {}));
        }) as unknown as typeof fetch;
        const tokens = new MemoryTokenStore({ access: 'a', refresh: 'r' });
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: tokens, fetchImpl });

        await expect(client.logout(false)).resolves.toBeUndefined();

        expect(calls).toHaveLength(0);
        expect(tokens.getAccessToken()).toBeNull();
    });

    it('L5 local teardown precedes the leg: the store is cleared BEFORE the POST is even attempted', async () => {
        const order: string[] = [];
        const store = new CookieTokenStore();
        vi.spyOn(store, 'clear').mockImplementation(() => {
            order.push('clear');
        });
        let settle!: () => void;
        const gate = new Promise<void>((resolve) => {
            settle = resolve;
        });
        const fetchImpl = (async (): Promise<Response> => {
            order.push('fetch');
            await gate;
            return respond(200, { ok: true });
        }) as unknown as typeof fetch;
        const client = new ApiClient({ baseUrl: SAME_ORIGIN, tokenStore: store, fetchImpl });

        const done = client.logout(false);
        settle();
        await done;

        expect(order).toEqual(['clear', 'fetch']);
    });

    it('L6 the logout leg carries the same bounded-delivery discipline (M7): a hung server cannot park the navigation forever', async () => {
        const locationObj = { href: '' };
        const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue(locationObj as Location);
        const fetchImpl = ((url: string, init?: RequestInit): Promise<Response> => {
            if (url.endsWith('/api/v1/auth/logout')) {
                return new Promise<Response>((_resolve, reject) => {
                    init?.signal?.addEventListener('abort', () =>
                        reject(new DOMException('Aborted', 'AbortError')),
                    );
                });
            }
            return Promise.resolve(respond(200, {}));
        }) as unknown as typeof fetch;
        const client = new ApiClient({
            baseUrl: SAME_ORIGIN,
            tokenStore: new CookieTokenStore(),
            fetchImpl,
            timeoutMs: 10,
        });

        try {
            // Still pending: navigation not yet taken.
            const done = client.logout();
            expect(locationObj.href).toBe('');
            // The 10ms leg timer aborts the fetch; logout swallows it and navigates.
            await done;
            expect(locationObj.href).toBe('/login');
        } finally {
            locationSpy.mockRestore();
        }
    });
});
