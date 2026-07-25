/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import {
    ApiClient,
    ApiError,
    isTmdbUnconfigured,
    setDefaultApiHeaders,
    getDefaultApiHeaders,
    MUSIC_PAGE_SIZE,
} from './client';
import { NetworkError, TimeoutError } from './errors';
import { MemoryTokenStore, makeFetch } from './test/memoryTokenStore';

describe('ApiClient', () => {
    it('attaches the bearer header when an access token is present', async () => {
        const tokens = new MemoryTokenStore({ access: 'tok-123' });
        const { fetch, calls } = makeFetch([{ status: 200, body: { ok: true } }]);
        const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

        await client.get('/api/v1/auth/me');

        expect(calls).toHaveLength(1);
        expect(calls[0]!.url).toBe('https://h/api/v1/auth/me');
        const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
        expect(headers['Authorization']).toBe('Bearer tok-123');
        expect(headers['Content-Type']).toBe('application/json');
    });

    it('omits the bearer header when no access token is stored', async () => {
        const tokens = new MemoryTokenStore();
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

        await client.get('/api/v1/libraries');

        const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
        expect(headers['Authorization']).toBeUndefined();
    });

    it('prepends a non-empty baseUrl to a relative endpoint', async () => {
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({
            baseUrl: '/api/v1/servers/srv-1/proxy',
            tokenStore: new MemoryTokenStore({ access: 't' }),
            fetchImpl: fetch,
        });

        await client.get('/api/v1/libraries');

        expect(calls[0]!.url).toBe('/api/v1/servers/srv-1/proxy/api/v1/libraries');
    });

    it('does NOT double-prepend a baseUrl the endpoint already starts with', async () => {
        // Regression: media helpers (buildMediaUrl) bake the base INTO the endpoint
        // and are fetched through a client whose baseUrl is that same base. On the
        // hub the base is the relay-proxy path, so a naive prepend produced
        // `…/proxy/api/v1/servers/{id}/proxy/api/v1/media` → 404.
        const base = '/api/v1/servers/srv-1/proxy';
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({
            baseUrl: base,
            tokenStore: new MemoryTokenStore({ access: 't' }),
            fetchImpl: fetch,
        });

        await client.get(`${base}/api/v1/media?libraryId=lib-1`);

        expect(calls[0]!.url).toBe('/api/v1/servers/srv-1/proxy/api/v1/media?libraryId=lib-1');
    });

    it('serialises a JSON body for POST/PUT/PATCH but not GET/DELETE', async () => {
        const tokens = new MemoryTokenStore({ access: 't' });
        const { fetch, calls } = makeFetch([
            { status: 200, body: {} },
            { status: 200, body: {} },
            { status: 200, body: {} },
            { status: 200, body: {} },
            { status: 200, body: {} },
        ]);
        const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

        await client.post('/p', { a: 1 });
        await client.put('/p', { b: 2 });
        await client.patch('/p', { c: 3 });
        await client.get('/p');
        await client.delete('/p');

        expect(calls[0]!.init!.body).toBe(JSON.stringify({ a: 1 }));
        expect(calls[1]!.init!.body).toBe(JSON.stringify({ b: 2 }));
        expect(calls[2]!.init!.body).toBe(JSON.stringify({ c: 3 }));
        expect(calls[3]!.init!.body).toBeUndefined();
        expect(calls[4]!.init!.body).toBeUndefined();
    });

    describe('custom headers', () => {
        // Reset the module-level default-headers registry so state never leaks
        // between tests (or into the rest of the suite).
        afterEach(() => {
            setDefaultApiHeaders({});
        });

        it('sends per-instance headers on every request', async () => {
            const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
            const client = new ApiClient({
                baseUrl: '',
                tokenStore: new MemoryTokenStore(),
                fetchImpl: fetch,
                headers: { 'X-Phlix-Device-ID': 'dev-1', 'X-Phlix-Device-Type': 'tizen' },
            });

            await client.get('/x');

            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect(headers['X-Phlix-Device-ID']).toBe('dev-1');
            expect(headers['X-Phlix-Device-Type']).toBe('tizen');
        });

        it('sends setDefaultApiHeaders headers on a client constructed AFTER the call', async () => {
            setDefaultApiHeaders({ 'X-Phlix-Device-ID': 'dev-default', 'X-Phlix-Session-ID': 'sess-1' });
            expect(getDefaultApiHeaders()).toEqual({
                'X-Phlix-Device-ID': 'dev-default',
                'X-Phlix-Session-ID': 'sess-1',
            });

            const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });

            await client.get('/x');

            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect(headers['X-Phlix-Device-ID']).toBe('dev-default');
            expect(headers['X-Phlix-Session-ID']).toBe('sess-1');
        });

        it('never lets default/instance headers override Content-Type or Authorization', async () => {
            setDefaultApiHeaders({ 'Content-Type': 'text/evil', Authorization: 'Bearer hijack' });
            const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
            const client = new ApiClient({
                baseUrl: '',
                tokenStore: new MemoryTokenStore({ access: 'real-token' }),
                fetchImpl: fetch,
                headers: { 'Content-Type': 'text/also-evil', Authorization: 'Bearer also-hijack' },
            });

            await client.get('/x');

            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect(headers['Content-Type']).toBe('application/json');
            expect(headers['Authorization']).toBe('Bearer real-token');
        });

        it('omits a falsy header value rather than sending an empty header', async () => {
            const { fetch, calls } = makeFetch([{ status: 200, body: {} }, { status: 200, body: {} }]);

            // Empty instance header value.
            const instanceClient = new ApiClient({
                baseUrl: '',
                tokenStore: new MemoryTokenStore(),
                fetchImpl: fetch,
                headers: { 'X-Phlix-Session-ID': '', 'X-Phlix-Device-ID': 'd' },
            });
            await instanceClient.get('/x');
            const instanceHeaders = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect('X-Phlix-Session-ID' in instanceHeaders).toBe(false);
            expect(instanceHeaders['X-Phlix-Device-ID']).toBe('d');

            // Empty default header value (also dropped from getDefaultApiHeaders()).
            setDefaultApiHeaders({ 'X-Phlix-Session-ID': '', 'X-Phlix-Device-ID': 'd2' });
            expect(getDefaultApiHeaders()).toEqual({ 'X-Phlix-Device-ID': 'd2' });
            const defaultClient = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });
            await defaultClient.get('/x');
            const defaultHeaders = (calls[1]!.init!.headers ?? {}) as Record<string, string>;
            expect('X-Phlix-Session-ID' in defaultHeaders).toBe(false);
            expect(defaultHeaders['X-Phlix-Device-ID']).toBe('d2');
        });

        it('defaults the registry to empty (no leak into the base case)', async () => {
            expect(getDefaultApiHeaders()).toEqual({});
            const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });
            await client.get('/x');
            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect(Object.keys(headers)).toEqual(['Content-Type']);
        });
    });

    describe('token refresh on 401', () => {
        it('refreshes and retries once with the new token, then succeeds', async () => {
            const tokens = new MemoryTokenStore({ access: 'old', refresh: 'r-1' });
            const { fetch, calls } = makeFetch([
                { status: 401, body: { error: 'expired' } },
                { status: 200, body: { access_token: 'new', refresh_token: 'r-2' } },
                { status: 200, body: { id: 'u1' } },
            ]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const result = await client.get<{ id: string }>('/api/v1/auth/me');

            expect(result).toEqual({ id: 'u1' });
            expect(calls[1]!.url).toBe('https://h/api/v1/auth/refresh');
            expect(calls[1]!.init!.body).toBe(JSON.stringify({ refresh_token: 'r-1' }));
            expect(tokens.getAccessToken()).toBe('new');
            expect(tokens.getRefreshToken()).toBe('r-2');
            const retryHeaders = (calls[2]!.init!.headers ?? {}) as Record<string, string>;
            expect(retryHeaders['Authorization']).toBe('Bearer new');
        });

        it('does not retry when there is no refresh token (throws the 401)', async () => {
            const tokens = new MemoryTokenStore({ access: 'old' });
            const { fetch, calls } = makeFetch([{ status: 401, body: { error: 'nope' } }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            await expect(client.get('/api/v1/auth/me')).rejects.toBeInstanceOf(ApiError);
            expect(calls).toHaveLength(1);
        });

        it('throws the 401 when the refresh call itself fails', async () => {
            const tokens = new MemoryTokenStore({ access: 'old', refresh: 'r' });
            const { fetch, calls } = makeFetch([
                { status: 401, body: { error: 'expired' } },
                { status: 401, body: { error: 'bad refresh' } },
            ]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            await expect(client.get('/api/v1/auth/me')).rejects.toMatchObject({ status: 401 });
            expect(calls).toHaveLength(2);
        });

        it('keeps the old refresh token if the refresh response omits a new one', async () => {
            const tokens = new MemoryTokenStore({ access: 'old', refresh: 'keep-me' });
            const { fetch } = makeFetch([
                { status: 401, body: {} },
                { status: 200, body: { access_token: 'fresh' } },
                { status: 200, body: { ok: true } },
            ]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            await client.get('/x');

            expect(tokens.getAccessToken()).toBe('fresh');
            expect(tokens.getRefreshToken()).toBe('keep-me');
        });

        it('refreshToken() returns false on a network error', async () => {
            const tokens = new MemoryTokenStore({ refresh: 'r' });
            const fetchImpl = (async () => {
                throw new Error('network down');
            }) as unknown as typeof fetch;
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl });

            await expect(client.refreshToken()).resolves.toBe(false);
        });

        it('refreshToken() returns false when the response has no access_token', async () => {
            const tokens = new MemoryTokenStore({ refresh: 'r' });
            const { fetch } = makeFetch([{ status: 200, body: { nothing: true } }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            await expect(client.refreshToken()).resolves.toBe(false);
        });
    });

    describe('single-flight token refresh (B3)', () => {
        // A URL-aware fetch: every non-refresh request 401s on its first hit (per
        // URL) and 200s on the retry; `/auth/refresh` POSTs are counted and each
        // rotates the access token. With concurrent requests all hitting a 401 at
        // once, single-flighting must collapse the N refresh calls into ONE POST.
        // A deferred microtask makes the responses settle out of call order so any
        // accidental per-caller refresh would race a fresh (un-rotated) POST.
        function makeUrlAwareFetch(): {
            fetch: typeof fetch;
            refreshCount: () => number;
        } {
            const seen = new Set<string>();
            let refreshCalls = 0;
            let issued = 0;
            const fetchImpl = async (url: string, init?: RequestInit): Promise<Response> => {
                // Yield so concurrent callers all enqueue before any settles.
                await Promise.resolve();
                const respond = (status: number, body: unknown): Response =>
                    ({
                        ok: status >= 200 && status < 300,
                        status,
                        headers: new Headers({ 'content-type': 'application/json' }),
                        json: () => Promise.resolve(body),
                        text: () => Promise.resolve(JSON.stringify(body)),
                    }) as unknown as Response;

                if (url.endsWith('/api/v1/auth/refresh')) {
                    refreshCalls += 1;
                    issued += 1;
                    // Echo the presented refresh token so a stale (already-rotated)
                    // token would be observable; rotate to a fresh access token.
                    return respond(200, { access_token: `acc-${issued}`, refresh_token: `ref-${issued}` });
                }

                const auth = ((init?.headers ?? {}) as Record<string, string>)['Authorization'];
                if (!seen.has(url)) {
                    seen.add(url);
                    return respond(401, { error: 'expired' });
                }
                // Retry after refresh — must carry the rotated bearer token.
                return respond(200, { ok: true, sentAuth: auth });
            };
            return { fetch: fetchImpl as unknown as typeof fetch, refreshCount: () => refreshCalls };
        }

        it('collapses N concurrent 401s into a SINGLE refresh POST; all requests resolve', async () => {
            const tokens = new MemoryTokenStore({ access: 'old', refresh: 'ref-0' });
            const { fetch, refreshCount } = makeUrlAwareFetch();
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const N = 6;
            const results = await Promise.all(
                Array.from({ length: N }, (_unused, i) =>
                    client.get<{ ok: boolean; sentAuth: string }>(`/api/v1/r${i}`),
                ),
            );

            // Exactly one refresh POST despite all N requests racing a 401.
            expect(refreshCount()).toBe(1);
            // Every request resolved against its retry.
            expect(results).toHaveLength(N);
            for (const r of results) {
                expect(r.ok).toBe(true);
                // The retry carried the rotated access token from the single refresh.
                expect(r.sentAuth).toBe('Bearer acc-1');
            }
            expect(tokens.getAccessToken()).toBe('acc-1');
            expect(tokens.getRefreshToken()).toBe('ref-1');
        });

        it('clears the in-flight promise so a LATER expiry starts a fresh refresh POST', async () => {
            const tokens = new MemoryTokenStore({ access: 'old', refresh: 'ref-0' });
            const { fetch, refreshCount } = makeUrlAwareFetch();
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            // First wave — one refresh.
            await client.get('/api/v1/a');
            expect(refreshCount()).toBe(1);

            // A second, fully-settled refresh must start a brand-new POST (the
            // `.finally()` cleared `refreshPromise`).
            const second = await client.refreshToken();
            expect(second).toBe(true);
            expect(refreshCount()).toBe(2);
        });
    });

    describe('error handling', () => {
        it('throws ApiError with the JSON `error` message and status', async () => {
            const { fetch } = makeFetch([{ status: 403, body: { error: 'Forbidden', code: 'auth.not_admin' } }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });

            await expect(client.get('/api/v1/admin/x')).rejects.toMatchObject({
                message: 'Forbidden',
                status: 403,
            });
        });

        it('falls back to the JSON `message` field then to a generic message', async () => {
            const c1 = new ApiClient({
                baseUrl: '',
                tokenStore: new MemoryTokenStore(),
                fetchImpl: makeFetch([{ status: 500, body: { message: 'boom' } }]).fetch,
            });
            await expect(c1.get('/x')).rejects.toMatchObject({ message: 'boom' });

            const c2 = new ApiClient({
                baseUrl: '',
                tokenStore: new MemoryTokenStore(),
                fetchImpl: makeFetch([{ status: 500, body: {} }]).fetch,
            });
            await expect(c2.get('/x')).rejects.toMatchObject({ message: 'Request failed' });
        });

        it('handles non-JSON (text) error bodies', async () => {
            const { fetch } = makeFetch([{ status: 502, body: 'gateway', json: false }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });

            await expect(client.get('/x')).rejects.toMatchObject({ message: 'Request failed', status: 502 });
        });
    });

    describe('helpers', () => {
        it('isLoggedIn reflects the stored access token', () => {
            const loggedOut = new ApiClient({ tokenStore: new MemoryTokenStore() });
            const loggedIn = new ApiClient({ tokenStore: new MemoryTokenStore({ access: 't' }) });
            expect(loggedOut.isLoggedIn()).toBe(false);
            expect(loggedIn.isLoggedIn()).toBe(true);
        });

        it('getCurrentUser unwraps the { user } envelope and normalizes is_admin', async () => {
            const { fetch, calls } = makeFetch([
                { status: 200, body: { user: { id: 'me', is_admin: 1 } } },
            ]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: new MemoryTokenStore({ access: 't' }), fetchImpl: fetch });

            const user = await client.getCurrentUser();
            expect(user).toMatchObject({ id: 'me', is_admin: true });
            expect(calls[0]!.url).toBe('https://h/api/v1/auth/me');
        });

        it('appends query params on GET', async () => {
            const { fetch, calls } = makeFetch([{ status: 200, body: [] }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: new MemoryTokenStore(), fetchImpl: fetch });
            await client.get('/api/v1/search', { q: 'star wars', page: '2' });
            expect(calls[0]!.url).toContain('/api/v1/search?');
            expect(calls[0]!.url).toContain('q=star+wars');
            expect(calls[0]!.url).toContain('page=2');
        });

        it('logout clears tokens', () => {
            const tokens = new MemoryTokenStore({ access: 'a', refresh: 'r', user: { id: 1 } });
            const client = new ApiClient({ tokenStore: tokens });
            client.logout(false);
            expect(tokens.getAccessToken()).toBeNull();
            expect(tokens.getRefreshToken()).toBeNull();
            expect(tokens.getUser()).toBeNull();
        });

        it('logout redirects to /login by default', () => {
            const tokens = new MemoryTokenStore({ access: 'a' });
            const client = new ApiClient({ tokenStore: tokens });
            const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({ href: '' } as Location);
            client.logout();
            expect(window.location.href).toBe('/login');
            locationSpy.mockRestore();
        });

        it('logout redirects to custom loginPath when configured', () => {
            const tokens = new MemoryTokenStore({ access: 'a' });
            const client = new ApiClient({ tokenStore: tokens, loginPath: '/app/login' });
            const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({ href: '' } as Location);
            client.logout();
            expect(window.location.href).toBe('/app/login');
            locationSpy.mockRestore();
        });

        it('logout does not redirect when redirect is false', () => {
            const tokens = new MemoryTokenStore({ access: 'a' });
            const client = new ApiClient({ tokenStore: tokens, loginPath: '/app/login' });
            const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({ href: 'http://localhost/' } as Location);
            client.logout(false);
            expect(window.location.href).toBe('http://localhost/');
            locationSpy.mockRestore();
        });
    });

    describe('network resilience (R5.3a)', () => {
        // A fetch that only settles when its abort signal fires — lets us drive
        // both the timeout path and a caller-initiated cancellation deterministically.
        const abortableFetch = ((_url: string, init?: RequestInit): Promise<Response> =>
            new Promise<Response>((_resolve, reject) => {
                init?.signal?.addEventListener('abort', () =>
                    reject(new DOMException('Aborted', 'AbortError')),
                );
            })) as unknown as typeof fetch;

        function stubOnLine(value: boolean): () => void {
            const orig = Object.getOwnPropertyDescriptor(navigator, 'onLine');
            Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => value });
            return () => {
                if (orig) Object.defineProperty(navigator, 'onLine', orig);
                else Object.defineProperty(navigator, 'onLine', { configurable: true, value: true });
            };
        }

        it('rejects with TimeoutError once a request exceeds timeoutMs', async () => {
            vi.useFakeTimers();
            try {
                const client = new ApiClient({ baseUrl: '', fetchImpl: abortableFetch, timeoutMs: 50 });
                const p = client.get('/slow');
                const expectation = expect(p).rejects.toBeInstanceOf(TimeoutError);
                await vi.advanceTimersByTimeAsync(50);
                await expectation;
            } finally {
                vi.useRealTimers();
            }
        });

        it('maps a fetch network TypeError to a friendly NetworkError', async () => {
            const failing = (() => Promise.reject(new TypeError('Failed to fetch'))) as unknown as typeof fetch;
            const client = new ApiClient({ baseUrl: '', fetchImpl: failing });
            await expect(client.get('/x')).rejects.toBeInstanceOf(NetworkError);
            await expect(client.get('/x')).rejects.toMatchObject({
                message: expect.stringMatching(/offline/i),
            });
        });

        it('maps any failure to NetworkError while the browser is offline', async () => {
            const restore = stubOnLine(false);
            try {
                const failing = (() => Promise.reject(new Error('weird'))) as unknown as typeof fetch;
                const client = new ApiClient({ baseUrl: '', fetchImpl: failing });
                await expect(client.get('/x')).rejects.toBeInstanceOf(NetworkError);
            } finally {
                restore();
            }
        });

        it('rethrows an unrecognized error unchanged while online (no wrapping)', async () => {
            const boom = new Error('mystery failure');
            const failing = (() => Promise.reject(boom)) as unknown as typeof fetch;
            const client = new ApiClient({ baseUrl: '', fetchImpl: failing });
            await expect(client.get('/x')).rejects.toBe(boom);
        });

        it('preserves a caller-initiated AbortError (so supersede logic still works)', async () => {
            const client = new ApiClient({ baseUrl: '', fetchImpl: abortableFetch });
            const ac = new AbortController();
            const p = client.get('/x', undefined, ac.signal);
            ac.abort();
            await expect(p).rejects.toMatchObject({ name: 'AbortError' });
            await expect(p).rejects.not.toBeInstanceOf(NetworkError);
        });

        it('surfaces ApiError (non-2xx) unchanged through the timeout wrapper', async () => {
            const client = new ApiClient({
                baseUrl: '',
                fetchImpl: makeFetch([{ status: 404, body: { error: 'nope' } }]).fetch,
            });
            await expect(client.get('/x')).rejects.toBeInstanceOf(ApiError);
        });

        it('does not time out a request that resolves promptly (timer is cleared)', async () => {
            vi.useFakeTimers();
            try {
                const client = new ApiClient({
                    baseUrl: '',
                    fetchImpl: makeFetch([{ status: 200, body: { ok: true } }]).fetch,
                    timeoutMs: 50,
                });
                const result = await client.get<{ ok: boolean }>('/fast');
                expect(result).toEqual({ ok: true });
                // Advancing past the timeout must not reject an already-settled request.
                await vi.advanceTimersByTimeAsync(100);
            } finally {
                vi.useRealTimers();
            }
        });
    });

    describe('interactive metadata match (U5)', () => {
        it('matchSearch hits the search endpoint, forwards manual params + parses results', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: {
                        results: [
                            { tmdb_id: 42, type: 'movie', title: 'Dune', year: 2021, overview: 'o', poster_url: 'p', backdrop_url: 'b', vote_average: 8.1 },
                        ],
                        query: 'Dune',
                        type: 'movie',
                    },
                },
            ]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.matchSearch('m1', { query: 'Dune', year: 2021 });

            expect(calls).toHaveLength(1);
            const url = new URL(calls[0]!.url);
            expect(url.pathname).toBe('/api/v1/media/m1/match/search');
            expect(url.searchParams.get('query')).toBe('Dune');
            expect(url.searchParams.get('year')).toBe('2021');
            expect(calls[0]!.init!.method).toBe('GET');
            expect(res.results).toHaveLength(1);
            expect(res.results[0]!.tmdb_id).toBe(42);
            expect(res.query).toBe('Dune');
            expect(res.type).toBe('movie');
        });

        it('matchSearch omits empty/absent params (server derives from the item)', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { results: [], query: '', type: 'tv' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.matchSearch('s1', { query: '', year: '' });

            const url = new URL(calls[0]!.url);
            expect(url.searchParams.has('query')).toBe(false);
            expect(url.searchParams.has('year')).toBe(false);
            // a malformed/empty payload still yields a defended array
            expect(res.results).toEqual([]);
        });

        it('matchSearch defends a non-array results payload to []', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch } = makeFetch([{ status: 200, body: { results: null, query: 1, type: 'bogus' } }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.matchSearch('m1', { type: 'tv' });
            expect(res.results).toEqual([]);
            expect(res.type).toBe('tv'); // falls back to the requested type
        });

        it('matchSearch surfaces 422 tmdb_unconfigured via isTmdbUnconfigured', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const unconfigured = { status: 422, body: { error: 'TMDB not configured', code: 'metadata.tmdb_unconfigured' } };
            const { fetch } = makeFetch([unconfigured, unconfigured]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            await expect(client.matchSearch('m1')).rejects.toMatchObject({ status: 422 });
            try {
                await client.matchSearch('m1');
                throw new Error('expected matchSearch to reject');
            } catch (e) {
                expect(isTmdbUnconfigured(e)).toBe(true);
            }
        });

        it('matchApply POSTs the chosen tmdb_id/type and returns the re-shaped item', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: {
                        item: { id: 'm1', name: 'Dune', type: 'movie' },
                        applied: { item_id: 'm1', mode: 'movie', tmdb_id: 42, matched: true, children_enriched: 0 },
                    },
                },
            ]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.matchApply('m1', { tmdb_id: 42, type: 'movie' });

            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/match/apply');
            expect(calls[0]!.init!.method).toBe('POST');
            expect(calls[0]!.init!.body).toBe(JSON.stringify({ tmdb_id: 42, type: 'movie' }));
            expect((res.item as { name: string }).name).toBe('Dune');
            expect(res.applied.matched).toBe(true);
        });

        it('isTmdbUnconfigured is false for non-422 / non-code errors', () => {
            expect(isTmdbUnconfigured(new ApiError('x', 404, { code: 'metadata.tmdb_unconfigured' }))).toBe(false);
            expect(isTmdbUnconfigured(new ApiError('x', 422, { code: 'metadata.no_match' }))).toBe(false);
            expect(isTmdbUnconfigured(new Error('plain'))).toBe(false);
        });
    });

    describe('favorites + ratings (item 17)', () => {
        it('addFavorite POSTs to the favorite endpoint with no body', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'Added to favorites' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.addFavorite('m1');

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/favorite');
            expect(calls[0]!.init!.method).toBe('POST');
            expect(calls[0]!.init!.body).toBeUndefined();
            expect(res.message).toBe('Added to favorites');
        });

        it('addFavorite url-encodes the id', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'ok' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.addFavorite('a/b');

            expect(calls[0]!.url).toBe('https://h/api/v1/media/a%2Fb/favorite');
        });

        it('removeFavorite DELETEs the favorite endpoint', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'Removed from favorites' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.removeFavorite('m1');

            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/favorite');
            expect(calls[0]!.init!.method).toBe('DELETE');
            expect(calls[0]!.init!.body).toBeUndefined();
            expect(res.message).toBe('Removed from favorites');
        });

        it('setRating PUTs the rating in the body', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'Rating saved' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.setRating('m1', 8);

            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/rating');
            expect(calls[0]!.init!.method).toBe('PUT');
            expect(calls[0]!.init!.body).toBe(JSON.stringify({ rating: 8 }));
            expect(res.message).toBe('Rating saved');
        });

        it('setRating(null) clears the rating (sends rating:null in the body)', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'Rating saved' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.setRating('m1', null);

            expect(calls[0]!.init!.method).toBe('PUT');
            expect(calls[0]!.init!.body).toBe(JSON.stringify({ rating: null }));
        });

        it('listFavorites GETs the favorites endpoint, forwards paging + returns the envelope', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: {
                        items: [
                            { id: 'm1', name: 'Dune', type: 'movie', user_data: { favorite: true, rating: 8 } },
                        ],
                        limit: 25,
                        offset: 50,
                    },
                },
            ]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.listFavorites({ limit: 25, offset: 50 });

            expect(calls).toHaveLength(1);
            const url = new URL(calls[0]!.url);
            expect(url.pathname).toBe('/api/v1/users/me/favorites');
            expect(url.searchParams.get('limit')).toBe('25');
            expect(url.searchParams.get('offset')).toBe('50');
            expect(calls[0]!.init!.method).toBe('GET');
            expect(res.items).toHaveLength(1);
            expect(res.items[0]!.id).toBe('m1');
            expect(res.items[0]!.user_data).toEqual({ favorite: true, rating: 8 });
            expect(res.limit).toBe(25);
            expect(res.offset).toBe(50);
        });

        it('listFavorites omits paging params when none are given', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { items: [], limit: 50, offset: 0 } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.listFavorites();

            const url = new URL(calls[0]!.url);
            expect(url.searchParams.has('limit')).toBe(false);
            expect(url.searchParams.has('offset')).toBe(false);
        });

        it('listFavorites defends a malformed payload (non-array items → [], paging falls back)', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch } = makeFetch([{ status: 200, body: { items: null } }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.listFavorites({ limit: 10 });

            expect(res.items).toEqual([]);
            expect(res.limit).toBe(10); // falls back to the requested limit
            expect(res.offset).toBe(0);
        });

        it('setLikeLevel PUTs the level in the body', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'Love level saved' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.setLikeLevel('m1', 2);

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/like');
            expect(calls[0]!.init!.method).toBe('PUT');
            expect(calls[0]!.init!.body).toBe(JSON.stringify({ level: 2 }));
            expect(res.message).toBe('Love level saved');
        });

        it('setLikeLevel sends level:0 in the body (clears love)', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'Love level saved' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.setLikeLevel('m1', 0);

            expect(calls[0]!.init!.method).toBe('PUT');
            expect(calls[0]!.init!.body).toBe(JSON.stringify({ level: 0 }));
        });

        it('setLikeLevel url-encodes the id', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'ok' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.setLikeLevel('a/b', 3);

            expect(calls[0]!.url).toBe('https://h/api/v1/media/a%2Fb/like');
        });

        it('a 204 No Content success resolves to undefined WITHOUT parsing the (empty) body', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            // A real empty-body 204: calling .json() on it throws. handleResponse must
            // short-circuit on the 204 BEFORE ever touching .json(), so this never fires.
            const jsonSpy = vi.fn(() => Promise.reject(new SyntaxError('Unexpected end of JSON input')));
            const fetchImpl = () =>
                Promise.resolve({
                    ok: true,
                    status: 204,
                    headers: new Headers(),
                    json: jsonSpy,
                    text: () => Promise.resolve(''),
                } as unknown as Response);
            const client = new ApiClient({
                baseUrl: 'https://h',
                tokenStore: tokens,
                fetchImpl: fetchImpl as unknown as typeof fetch,
            });

            // removeFavorite() goes through delete() → handleResponse(); a 204 must
            // resolve (not throw) so the caller's success path runs.
            const res = await client.removeFavorite('m1');
            expect(res).toBeUndefined();
            expect(jsonSpy).not.toHaveBeenCalled();
        });

        it('markWatched POSTs to the watched endpoint with no body', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'Marked as watched' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.markWatched('m1');

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/watched');
            expect(calls[0]!.init!.method).toBe('POST');
            expect(calls[0]!.init!.body).toBeUndefined();
            expect(res.message).toBe('Marked as watched');
        });

        it('markWatched url-encodes the id', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'ok' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.markWatched('a/b');

            expect(calls[0]!.url).toBe('https://h/api/v1/media/a%2Fb/watched');
        });

        it('markUnwatched POSTs to the unwatched endpoint with no body', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'Marked as unwatched' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.markUnwatched('m1');

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/unwatched');
            expect(calls[0]!.init!.method).toBe('POST');
            expect(calls[0]!.init!.body).toBeUndefined();
            expect(res.message).toBe('Marked as unwatched');
        });

        it('markUnwatched url-encodes the id', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { message: 'ok' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.markUnwatched('a/b');

            expect(calls[0]!.url).toBe('https://h/api/v1/media/a%2Fb/unwatched');
        });

        it('deleteMediaItem DELETEs the media endpoint and returns the id', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { id: 'm1' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.deleteMediaItem('m1');

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1');
            expect(calls[0]!.init!.method).toBe('DELETE');
            expect(calls[0]!.init!.body).toBeUndefined();
            expect(res.id).toBe('m1');
        });

        it('deleteMediaItem url-encodes the id', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { id: 'a/b' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.deleteMediaItem('a/b');

            expect(calls[0]!.url).toBe('https://h/api/v1/media/a%2Fb');
        });
    });

    describe('poster list + set (item 15)', () => {
        it('listPosters GETs the posters endpoint and returns candidates + current url', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: {
                        candidates: [
                            {
                                provider: 'tmdb',
                                poster_url: 'https://image.tmdb.org/t/p/w500/abc.jpg',
                                width: 500,
                                height: 750,
                                votes: 120,
                                vote_average: 7.5,
                                tmdb_id: 123,
                            },
                            { provider: 'fanart.tv', poster_url: 'https://fanart.io/xyz.jpg' },
                        ],
                        current_poster_url: 'https://image.tmdb.org/t/p/w500/abc.jpg',
                    },
                },
            ]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.listPosters('m1');

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/posters');
            expect(calls[0]!.init!.method).toBe('GET');
            expect(res.candidates).toHaveLength(2);
            expect(res.candidates[0]!.provider).toBe('tmdb');
            expect(res.candidates[0]!.poster_url).toBe('https://image.tmdb.org/t/p/w500/abc.jpg');
            expect(res.candidates[0]!.width).toBe(500);
            expect(res.candidates[0]!.votes).toBe(120);
            expect(res.candidates[1]!.provider).toBe('fanart.tv');
            expect(res.current_poster_url).toBe('https://image.tmdb.org/t/p/w500/abc.jpg');
        });

        it('listPosters url-encodes the id', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { candidates: [], current_poster_url: null } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.listPosters('a/b');

            expect(calls[0]!.url).toBe('https://h/api/v1/media/a%2Fb/posters');
        });

        it('listPosters defends malformed payloads (non-array candidates → [], null current → null)', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch } = makeFetch([{ status: 200, body: { candidates: null, current_poster_url: 42 } }]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.listPosters('m1');

            expect(res.candidates).toEqual([]);
            expect(res.current_poster_url).toBeNull();
        });

        it('listPosters surfaces 422 tmdb_unconfigured via isTmdbUnconfigured', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const unconfigured = { status: 422, body: { error: 'TMDB not configured', code: 'metadata.tmdb_unconfigured' } };
            const { fetch } = makeFetch([unconfigured, unconfigured]);
            const client = new ApiClient({ baseUrl: '', tokenStore: tokens, fetchImpl: fetch });

            await expect(client.listPosters('m1')).rejects.toMatchObject({ status: 422 });
            try {
                await client.listPosters('m1');
                throw new Error('expected listPosters to reject');
            } catch (e) {
                expect(isTmdbUnconfigured(e)).toBe(true);
            }
        });

        it('setPoster PUTs the poster_url in the body', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: { id: 'm1', name: 'Dune', type: 'movie', poster_url: 'https://new.poster.jpg' },
                },
            ]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const res = await client.setPoster('m1', 'https://new.poster.jpg');

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/media/m1/poster');
            expect(calls[0]!.init!.method).toBe('PUT');
            expect(calls[0]!.init!.body).toBe(JSON.stringify({ poster_url: 'https://new.poster.jpg' }));
            expect((res as { poster_url: string }).poster_url).toBe('https://new.poster.jpg');
        });

        it('setPoster url-encodes the id', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { id: 'a/b' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.setPoster('a/b', 'https://p.jpg');

            expect(calls[0]!.url).toBe('https://h/api/v1/media/a%2Fb/poster');
        });

        it('setPoster sends an empty string to clear the poster', async () => {
            const tokens = new MemoryTokenStore({ access: 't' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { id: 'm1', poster_url: '' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.setPoster('m1', '');

            expect(calls[0]!.init!.body).toBe(JSON.stringify({ poster_url: '' }));
        });
    });

    // -----------------------------------------------------------------------
    // Music listings (S110). These endpoints serve BOUNDED pages — `?limit=` is
    // clamped to MUSIC_PAGE_SIZE server-side — and return the true `total`, so the
    // client's job is to (a) send limit/offset, (b) hand `total` back, and (c) let
    // the SERVER filter albums by artist. Filtering client-side over one page is
    // the S110 bug: `/albums` is ordered globally by artist then title, so its
    // first 100 rows span ~23 of 2,197 artists.
    // -----------------------------------------------------------------------
    describe('music listings (S110 paging)', () => {
        function client(fetchImpl: typeof fetch): ApiClient {
            return new ApiClient({
                baseUrl: 'https://h',
                tokenStore: new MemoryTokenStore({ access: 't' }),
                fetchImpl,
            });
        }

        it('MUSIC_PAGE_SIZE mirrors the server clamp (PageLimit::MAX)', () => {
            expect(MUSIC_PAGE_SIZE).toBe(100);
        });

        it('listArtists sends limit + offset and returns the server total, not the page length', async () => {
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: {
                        artists: [{ name: 'Radiohead', album_count: 9, image_url: null }],
                        total: 2197,
                        limit: 100,
                        offset: 2100,
                    },
                },
            ]);

            const page = await client(fetch).listArtists({ limit: 100, offset: 2100 });

            expect(calls[0]!.url).toBe('https://h/api/v1/music/artists?limit=100&offset=2100');
            expect(page.artists).toHaveLength(1);
            expect(page.artists[0]!.name).toBe('Radiohead');
            // The point of the whole step: 1 row on the page, 2,197 in the library.
            expect(page.total).toBe(2197);
            expect(page.limit).toBe(100);
            expect(page.offset).toBe(2100);
        });

        it('listArtists sends no query at all when no paging params are given', async () => {
            const { fetch, calls } = makeFetch([{ status: 200, body: { artists: [] } }]);

            await client(fetch).listArtists();

            expect(calls[0]!.url).toBe('https://h/api/v1/music/artists');
        });

        it('listArtists degrades a malformed payload to an empty page', async () => {
            const { fetch } = makeFetch([{ status: 200, body: { artists: 'nope', total: 'nope' } }]);

            const page = await client(fetch).listArtists({ offset: 0 });

            expect(page.artists).toEqual([]);
            expect(page.total).toBe(0);
            expect(page.limit).toBe(MUSIC_PAGE_SIZE);
            expect(page.offset).toBe(0);
        });

        it('carries the artist track_count through the normaliser', async () => {
            // Dropping it forced the artist page to sum whichever album page was
            // loaded, so its header contradicted the DB and changed while paging.
            const { fetch } = makeFetch([
                {
                    status: 200,
                    body: {
                        artist: {
                            name: 'Michael Jackson',
                            album_count: 142,
                            track_count: 710,
                            image_url: null,
                        },
                    },
                },
            ]);

            const artist = await client(fetch).getArtist('Michael Jackson');

            expect(artist.albumCount).toBe(142);
            expect(artist.trackCount).toBe(710);
        });

        it('leaves trackCount undefined when the server omits it', async () => {
            const { fetch } = makeFetch([
                { status: 200, body: { artists: [{ name: 'A', album_count: 1 }] } },
            ]);

            const page = await client(fetch).listArtists();

            expect(page.artists[0]!.trackCount).toBeUndefined();
        });

        it('accepts a numeric-string track_count (the JSON the daemon can emit)', async () => {
            const { fetch } = makeFetch([
                { status: 200, body: { artist: { name: 'A', album_count: '3', track_count: '17' } } },
            ]);

            const artist = await client(fetch).getArtist('A');

            expect(artist.albumCount).toBe(3);
            expect(artist.trackCount).toBe(17);
        });

        it('listArtists falls back to the page length when a server omits total', async () => {
            const { fetch } = makeFetch([{ status: 200, body: { artists: [{ name: 'A' }, { name: 'B' }] } }]);

            const page = await client(fetch).listArtists({ limit: 100, offset: 0 });

            expect(page.total).toBe(2);
        });

        it('listAlbums asks the SERVER to filter by artist and never filters client-side', async () => {
            // The server honours ?artist=; the payload here deliberately contains a
            // row for a DIFFERENT artist. A client-side filter would drop it — and
            // that filter is exactly what made 77 of 100 artists drill down empty,
            // so its absence is the property under test.
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: {
                        albums: [
                            { name: 'OK Computer', artist: 'Radiohead', track_count: 12, tracks: [] },
                            { name: 'Homework', artist: 'Daft Punk', track_count: 16, tracks: [] },
                        ],
                        total: 2,
                        limit: 100,
                        offset: 0,
                        artist: 'Radiohead',
                    },
                },
            ]);

            const page = await client(fetch).listAlbums({ artist: 'Radiohead', limit: 100, offset: 0 });

            expect(calls[0]!.url).toBe(
                'https://h/api/v1/music/albums?limit=100&offset=0&artist=Radiohead',
            );
            expect(page.albums.map((a) => a.title)).toEqual(['OK Computer', 'Homework']);
            expect(page.artist).toBe('Radiohead');
            expect(page.total).toBe(2);
        });

        it('listAlbums url-encodes an artist name with spaces and symbols', async () => {
            const { fetch, calls } = makeFetch([{ status: 200, body: { albums: [] } }]);

            await client(fetch).listAlbums({ artist: 'Simon & Garfunkel' });

            expect(calls[0]!.url).toBe('https://h/api/v1/music/albums?artist=Simon+%26+Garfunkel');
        });

        it('listAlbums omits ?artist= for an empty or absent artist', async () => {
            const { fetch, calls } = makeFetch([
                { status: 200, body: { albums: [] } },
                { status: 200, body: { albums: [] } },
            ]);
            const c = client(fetch);

            await c.listAlbums({ artist: '', limit: 100 });
            await c.listAlbums({ limit: 100 });

            expect(calls[0]!.url).toBe('https://h/api/v1/music/albums?limit=100');
            expect(calls[1]!.url).toBe('https://h/api/v1/music/albums?limit=100');
        });

        it('listAlbums sends no query at all when no params are given', async () => {
            // The sibling of the `listArtists` pin above. `get()` turns an EMPTY params
            // object into a bare trailing `?`, so "omit the object" and "pass {}" are
            // different URLs — the helper has to choose `undefined`, and this is the
            // only caller shape (no limit, no offset, no artist) that reaches it.
            const { fetch, calls } = makeFetch([{ status: 200, body: { albums: [] } }]);

            await client(fetch).listAlbums();

            expect(calls[0]!.url).toBe('https://h/api/v1/music/albums');
            expect(calls[0]!.url, 'not even an empty query string').not.toContain('?');
        });

        it('listAlbums degrades a malformed payload to an empty page', async () => {
            // The docblock promises this in those words. The degraded shape has to be a
            // whole PAGE (total/limit/offset present), not just an empty array, or a
            // pager reading `total` off it renders against `undefined`.
            const { fetch } = makeFetch([
                { status: 200, body: { albums: 'nope', total: 'nope', artist: { nope: true } } },
            ]);

            const page = await client(fetch).listAlbums({ offset: 0 });

            expect(page.albums).toEqual([]);
            expect(page.total).toBe(0);
            expect(page.limit).toBe(MUSIC_PAGE_SIZE);
            expect(page.offset).toBe(0);
            expect(page.artist, 'a non-string artist echo is not an artist').toBeNull();
        });

        it('listAlbums reports a null artist echo when the server did not filter', async () => {
            const { fetch } = makeFetch([{ status: 200, body: { albums: [], total: 5091 } }]);

            const page = await client(fetch).listAlbums({ limit: 100, offset: 0 });

            expect(page.artist).toBeNull();
            expect(page.total).toBe(5091);
        });

        it('normalizes an album row: tracks_truncated flags a partial embedded list', async () => {
            const { fetch } = makeFetch([
                {
                    status: 200,
                    body: {
                        albums: [
                            {
                                name: 'Long One',
                                artist: 'A',
                                year: 1999,
                                track_count: 125,
                                tracks_truncated: true,
                                tracks: [{ id: 't1', name: 'One', duration_secs: 10, track_number: 1 }],
                            },
                            {
                                name: 'Short One',
                                artist: 'A',
                                year: 2001,
                                track_count: 1,
                                tracks: [{ id: 't2', name: 'Two', duration_secs: 20, track_number: 1 }],
                            },
                        ],
                    },
                },
            ]);

            const page = await client(fetch).listAlbums({ artist: 'A' });

            expect(page.albums[0]!.tracksTruncated).toBe(true);
            // `totalTracks` stays the TRUE count even though one track is embedded.
            expect(page.albums[0]!.totalTracks).toBe(125);
            expect(page.albums[0]!.tracks).toHaveLength(1);
            expect(page.albums[1]!.tracksTruncated).toBe(false);
        });

        it('getAlbum appends ?artist= to disambiguate a shared album title', async () => {
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: {
                        album: {
                            name: 'Greatest Hits',
                            artist: 'Queen',
                            track_count: 17,
                            tracks: [{ id: 't1', name: 'Bohemian Rhapsody', duration_secs: 355 }],
                        },
                    },
                },
            ]);

            const album = await client(fetch).getAlbum('Greatest Hits', 'Queen');

            expect(calls[0]!.url).toBe(
                'https://h/api/v1/music/albums/Greatest%20Hits?artist=Queen',
            );
            expect(album.artist).toBe('Queen');
            expect(album.tracks).toHaveLength(1);
        });

        it('getAlbum omits the query when no artist is given', async () => {
            const { fetch, calls } = makeFetch([{ status: 200, body: { album: { name: 'X' } } }]);

            await client(fetch).getAlbum('X');

            expect(calls[0]!.url).toBe('https://h/api/v1/music/albums/X');
        });

        it('listTracks sends limit + offset and returns the whole-library total', async () => {
            const { fetch, calls } = makeFetch([
                {
                    status: 200,
                    body: {
                        tracks: [{ id: 'u1', name: 'Track', duration_secs: 30, track_number: 1, stream_url: '/s' }],
                        total: 29245,
                        limit: 100,
                        offset: 100,
                    },
                },
            ]);

            const page = await client(fetch).listTracks({ limit: 100, offset: 100 });

            expect(calls[0]!.url).toBe('https://h/api/v1/music/tracks?limit=100&offset=100');
            expect(page.tracks[0]!.streamUrl).toBe('/s');
            expect(page.total).toBe(29245);
            expect(page.offset).toBe(100);
        });

        it('listTracks sends no query at all when no params are given', async () => {
            const { fetch, calls } = makeFetch([{ status: 200, body: { tracks: [] } }]);

            await client(fetch).listTracks();

            expect(calls[0]!.url).toBe('https://h/api/v1/music/tracks');
            expect(calls[0]!.url, 'not even an empty query string').not.toContain('?');
        });

        it('listTracks degrades a malformed payload to an empty page', async () => {
            const { fetch } = makeFetch([
                { status: 200, body: { tracks: { 0: 'not-an-array' }, total: null } },
            ]);

            const page = await client(fetch).listTracks({ limit: 100, offset: 200 });

            expect(page.tracks).toEqual([]);
            // `total` degrades to the row count, and the REQUESTED paging echoes back —
            // so a pager fed this page hides itself rather than rendering NaN pages.
            expect(page.total).toBe(0);
            expect(page.limit).toBe(100);
            expect(page.offset).toBe(200);
        });
    });
});
