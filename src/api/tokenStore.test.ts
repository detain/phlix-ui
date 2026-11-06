/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it, beforeEach } from 'vitest';
import {
    ACCESS_TOKEN_KEY,
    LocalStorageTokenStore,
    REFRESH_TOKEN_KEY,
    USER_KEY,
} from './tokenStore';

describe('LocalStorageTokenStore', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('uses the exact legacy localStorage keys', () => {
        expect(ACCESS_TOKEN_KEY).toBe('access_token');
        expect(REFRESH_TOKEN_KEY).toBe('refresh_token');
        expect(USER_KEY).toBe('user');
    });

    it('reads and writes the access + refresh tokens', () => {
        const store = new LocalStorageTokenStore();
        expect(store.getAccessToken()).toBeNull();
        store.setAccessToken('a');
        store.setRefreshToken('r');
        expect(store.getAccessToken()).toBe('a');
        expect(store.getRefreshToken()).toBe('r');
        expect(localStorage.getItem('access_token')).toBe('a');
        expect(localStorage.getItem('refresh_token')).toBe('r');
    });

    it('round-trips the user object as JSON', () => {
        const store = new LocalStorageTokenStore();
        store.setUser({ id: 'u1', is_admin: true });
        expect(store.getUser()).toEqual({ id: 'u1', is_admin: true });
        expect(localStorage.getItem('user')).toBe(JSON.stringify({ id: 'u1', is_admin: true }));
    });

    it('returns null for a corrupt user value rather than throwing', () => {
        localStorage.setItem('user', '{not-json');
        const store = new LocalStorageTokenStore();
        expect(store.getUser()).toBeNull();
    });

    it('clear() removes all three keys', () => {
        const store = new LocalStorageTokenStore();
        store.setAccessToken('a');
        store.setRefreshToken('r');
        store.setUser({ id: 1 });
        store.clear();
        expect(localStorage.getItem('access_token')).toBeNull();
        expect(localStorage.getItem('refresh_token')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
    });
});

/**
 * CU-078 (ui__crossfe #3 + ui__fedev #5) — the storage-failure contract: no
 * public method throws at a host whose webview disables or revokes storage;
 * custody degrades to an in-memory mirror (lives until reload) instead of
 * crashing login.
 */
describe('LocalStorageTokenStore storage-failure degradation (CU-078)', () => {
    /** A kiosk/lockdown webview: every storage operation raises. */
    function brokenStorage(): Storage {
        const boom = (): never => {
            throw new Error('SecurityError: storage is disabled');
        };
        return {
            getItem: boom,
            setItem: boom,
            removeItem: boom,
            clear: boom,
            key: boom,
            length: 0,
        } as unknown as Storage;
    }

    it('never throws on an all-throwing storage; custody flows to memory and clear works', () => {
        const store = new LocalStorageTokenStore(brokenStorage());
        expect(() => store.setAccessToken('a')).not.toThrow();
        expect(() => store.setRefreshToken('r')).not.toThrow();
        expect(() => store.setUser({ id: 'u1' })).not.toThrow();
        expect(store.getAccessToken()).toBe('a');
        expect(store.getRefreshToken()).toBe('r');
        expect(store.getUser()).toEqual({ id: 'u1' });
        expect(() => store.clear()).not.toThrow();
        expect(store.getAccessToken()).toBeNull();
        expect(store.getUser()).toBeNull();
    });

    it('degrades on a throwing read; written values survive via the mirror, unread keys go null', () => {
        const backing = new Map<string, string>([['refresh_token', 'r-pre']]);
        let readsHostile = false;
        const store = new LocalStorageTokenStore({
            getItem: (k: string) => {
                if (readsHostile) throw new Error('SecurityError');
                return backing.get(k) ?? null;
            },
            setItem: (k: string, v: string) => {
                backing.set(k, v);
            },
            removeItem: (k: string) => {
                backing.delete(k);
            },
        } as unknown as Storage);
        store.setAccessToken('a-written'); // healthy write: storage AND mirror
        readsHostile = true;              // the origin revokes reads mid-session
        expect(store.getRefreshToken()).toBeNull(); // unreadable, never mirrored — null, no throw
        expect(store.getAccessToken()).toBe('a-written'); // the mirror kept custody
    });

    it('a QuotaExceeded write latches to memory; reads see the new value and migrate readable keys', () => {
        const backing = new Map<string, string>([
            ['access_token', 'old-token'],
            ['refresh_token', 'r-old'],
        ]);
        const quotaFull = {
            getItem: (k: string) => backing.get(k) ?? null,
            setItem: () => {
                throw new Error('QuotaExceededError');
            },
            removeItem: (k: string) => {
                backing.delete(k);
            },
        } as unknown as Storage;
        const store = new LocalStorageTokenStore(quotaFull);
        expect(store.getAccessToken()).toBe('old-token'); // readable pre-latch
        store.setAccessToken('new-token'); // throws inside — latches
        expect(store.getAccessToken()).toBe('new-token'); // new value from the latch
        expect(store.getRefreshToken()).toBe('r-old'); // migrated by the latch
    });

    it('an explicit null storage (no window / SSR) starts in memory mode', () => {
        const store = new LocalStorageTokenStore(null);
        expect(() => store.setAccessToken('a')).not.toThrow();
        expect(store.getAccessToken()).toBe('a');
        expect(localStorage.getItem('access_token')).toBeNull(); // never touched storage
    });
});
