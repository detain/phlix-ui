import { afterEach, describe, expect, it, vi } from 'vitest';
import {
    ApiClient,
    ApiError,
    isTmdbUnconfigured,
    setDefaultApiHeaders,
    getDefaultApiHeaders,
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
});
