/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { ApiClient, setDefaultTokenStore, setDefaultApiHeaders } from '../api/client';
import { MemoryTokenStore, makeFetch } from '../api/test/memoryTokenStore';
import { createPhlixApp } from './createPhlixApp';
import { useAuthStore } from '../stores/useAuthStore';

/**
 * R-UI-10 — the token custody seam.
 *
 * `PhlixAppConfig.tokenStore` registers a host-owned `TokenStore` (the Windows
 * client's DPAPI vault adapter is the motivating consumer) into the shared
 * custody registry; `ApiClient` resolves it DYNAMICALLY per request when no
 * explicit store was passed at construction. These tests pin the registry law —
 * in particular that a client constructed BEFORE registration (exactly the
 * situation of the import-constructed module-singleton `api`) still flows
 * through the store registered later at boot. A constructor-time capture would
 * keep the vault session in `localStorage` while the vault looks empty: the
 * custody-theater regression the seam exists to prevent.
 */
function authOf(call: { init: RequestInit } | undefined): string | undefined {
    const headers = (call?.init?.headers ?? {}) as Record<string, string>;
    return headers['Authorization'];
}

afterEach(() => {
    // Registry state is module-level: every test leaves it exactly as found.
    setDefaultTokenStore(null);
    setDefaultApiHeaders({});
    localStorage.clear();
});

describe('R-UI-10 token custody seam', () => {
    it('a client without an explicit store reads the configured store, not localStorage', async () => {
        localStorage.setItem('access_token', 'ls-token');
        setDefaultTokenStore(new MemoryTokenStore({ access: 'vault-token' }));
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({ baseUrl: '', fetchImpl: fetch });

        await client.get('/api/v1/libraries');

        expect(authOf(calls[0])).toBe('Bearer vault-token');
    });

    it('a client constructed BEFORE registration resolves the store registered later', async () => {
        // Mirrors the `api` singleton lifecycle: import-time construction, boot-time
        // registration. Kills any constructor-time capture of the default store.
        const { fetch, calls } = makeFetch([
            { status: 200, body: {} },
            { status: 200, body: {} },
            { status: 200, body: {} },
        ]);
        const client = new ApiClient({ baseUrl: '', fetchImpl: fetch });

        await client.get('/api/v1/x'); // pre-registration: localStorage custody
        localStorage.setItem('access_token', 'ls-token');
        await client.get('/api/v1/x');
        setDefaultTokenStore(new MemoryTokenStore({ access: 'late-vault' }));
        await client.get('/api/v1/x');

        expect(authOf(calls[0])).toBeUndefined();
        expect(authOf(calls[1])).toBe('Bearer ls-token');
        expect(authOf(calls[2])).toBe('Bearer late-vault');
    });

    it('an explicit construction store wins over the configured default', async () => {
        setDefaultTokenStore(new MemoryTokenStore({ access: 'configured' }));
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
        const client = new ApiClient({
            baseUrl: '',
            tokenStore: new MemoryTokenStore({ access: 'explicit' }),
            fetchImpl: fetch,
        });

        await client.get('/api/v1/x');

        expect(authOf(calls[0])).toBe('Bearer explicit');
    });

    it('resetting to null falls back to localStorage custody', async () => {
        setDefaultTokenStore(new MemoryTokenStore({ access: 'vault-token' }));
        setDefaultTokenStore(null);
        localStorage.setItem('access_token', 'ls-token');
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);

        await new ApiClient({ baseUrl: '', fetchImpl: fetch }).get('/api/v1/x');

        expect(authOf(calls[0])).toBe('Bearer ls-token');
    });

    it('createPhlixApp({ tokenStore }) registers the store boot-wide', async () => {
        // The host seam end to end: config → registry → a plain client.
        createPhlixApp({ tokenStore: new MemoryTokenStore({ access: 'boot-vault' }) });
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);

        await new ApiClient({ baseUrl: '', fetchImpl: fetch }).get('/api/v1/x');

        expect(authOf(calls[0])).toBe('Bearer boot-vault');
    });

    it('createPhlixApp without tokenStore (re-)registers the localStorage default', async () => {
        setDefaultTokenStore(new MemoryTokenStore({ access: 'stale-vault' }));
        localStorage.setItem('access_token', 'ls-token');
        createPhlixApp({}); // omitted config restores default custody
        const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);

        await new ApiClient({ baseUrl: '', fetchImpl: fetch }).get('/api/v1/x');

        expect(authOf(calls[0])).toBe('Bearer ls-token');
    });

    it('useAuthStore writes tokens into the configured store, never localStorage', () => {
        setActivePinia(createPinia());
        const vault = new MemoryTokenStore();
        setDefaultTokenStore(vault);

        useAuthStore().setTokens('new-access', 'new-refresh');

        expect(vault.getAccessToken()).toBe('new-access');
        expect(vault.getRefreshToken()).toBe('new-refresh');
        expect(localStorage.getItem('access_token')).toBeNull();
        expect(localStorage.getItem('refresh_token')).toBeNull();
    });
});
