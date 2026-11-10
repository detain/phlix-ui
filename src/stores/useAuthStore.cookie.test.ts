/**
 * CP-016 (store half) — the auth store's logout orchestration under cookie
 * custody (COOKIE-DESIGN §4.3(5), CU-118 navigation-owner law preserved).
 *
 * At 9a2fdc13 `useAuthStore.logout()` was fully synchronous: it cleared the
 * client, its own refs, and hard-navigated — all before any network leg could
 * even exist. Under cookie custody that ordering silently aborted the
 * cookie-clearing POST the cure adds (browsers tear in-flight requests on
 * unload), so the "logged out" page rode a still-live HttpOnly pair. The
 * orchestration must be: reactive refs first (sync — every existing
 * sync-assert suite depends on it), then AWAIT the client leg, then navigate
 * exactly once.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from './useAuthStore';
import { resetCookieSessionProbe, setDefaultTokenStore } from '../api/client';
import { CookieTokenStore } from '../api/tokenStore';

function jsonResponse(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'content-type': 'application/json' },
    });
}

interface CapturedCall {
    url: string;
    init: RequestInit;
}

beforeEach(() => {
    localStorage.clear();
    resetCookieSessionProbe();
    setDefaultTokenStore(null);
    setActivePinia(createPinia());
});

afterEach(() => {
    setDefaultTokenStore(null);
    resetCookieSessionProbe();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    localStorage.clear();
});

describe('useAuthStore.logout under cookie custody (CP-016 store half)', () => {
    it('S1 clears reactive state synchronously, delivers the cookie POST, and navigates ONCE after it settles', async () => {
        setDefaultTokenStore(new CookieTokenStore());
        const calls: CapturedCall[] = [];
        let settle!: () => void;
        const gate = new Promise<void>((resolve) => {
            settle = resolve;
        });
        const fetchImpl = vi.fn((url: string, init?: RequestInit): Promise<Response> => {
            calls.push({ url, init: init ?? {} });
            return gate.then(() => jsonResponse({ ok: true }));
        });
        vi.stubGlobal('fetch', fetchImpl);
        const locationObj = { href: '' };
        const locationSpy = vi
            .spyOn(window, 'location', 'get')
            .mockReturnValue(locationObj as Location);

        try {
            const s = useAuthStore();
            const done = s.logout();

            // Reactive law (unchanged): the flags flip synchronously — every
            // existing sync-assert suite (useAuthStore.test, UserMenu.test,
            // useProfileStore.test) relies on this half of the ordering.
            expect(s.isLoggedIn).toBe(false);
            expect(s.user).toBeNull();

            // The leg exists and is in flight while the page stays put:
            // navigating first would abort exactly the request that ends the
            // HttpOnly session — the silent-logout defect this cure closes.
            expect(calls.filter((c) => c.url.endsWith('/api/v1/auth/logout'))).toHaveLength(1);
            // Macrotask yield: drains the microtask queue, so any regression
            // that resolves the logout promise WITHOUT the leg (navigate-first
            // defect restore) lands its href HERE and reddens this pin —
            // while a conforming implementation is still gated and stays put.
            await new Promise((r) => setTimeout(r, 0));
            expect(locationObj.href).toBe('');

            settle();
            await done;

            // One navigation owner, landing after delivery.
            expect(locationObj.href).toBe('/login');
        } finally {
            locationSpy.mockRestore();
        }
    });

    it('S2 bearer custody keeps a zero-network logout: refs flip synchronously, nothing else is asked of the wire', async () => {
        // The boot default (no registration) is the localStorage bearer store —
        // every pre-cookie host. The cure must add no leg for them.
        const calls: CapturedCall[] = [];
        const fetchImpl = vi.fn((url: string, init?: RequestInit): Promise<Response> => {
            calls.push({ url, init: init ?? {} });
            return Promise.resolve(jsonResponse({ ok: true }));
        });
        vi.stubGlobal('fetch', fetchImpl);
        const locationObj = { href: '' };
        const locationSpy = vi
            .spyOn(window, 'location', 'get')
            .mockReturnValue(locationObj as Location);

        try {
            const s = useAuthStore();
            const done = s.logout();

            expect(s.isLoggedIn).toBe(false);
            await done;

            expect(calls).toHaveLength(0);
            expect(locationObj.href).toBe('/login');
        } finally {
            locationSpy.mockRestore();
        }
    });
});
