/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import type { TokenStore } from '../tokenStore';

export class MemoryTokenStore implements TokenStore {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;
    private userData: unknown = null;

    constructor(initial: { access?: string; refresh?: string; user?: unknown } = {}) {
        this.accessToken = initial.access ?? null;
        this.refreshToken = initial.refresh ?? null;
        this.userData = initial.user ?? null;
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    setAccessToken(token: string): void {
        this.accessToken = token;
    }

    getRefreshToken(): string | null {
        return this.refreshToken;
    }

    setRefreshToken(token: string): void {
        this.refreshToken = token;
    }

    getUser(): unknown {
        return this.userData;
    }

    setUser(user: unknown): void {
        this.userData = user;
    }

    clear(): void {
        this.accessToken = null;
        this.refreshToken = null;
        this.userData = null;
    }
}

interface FetchCall {
    url: string;
    init: RequestInit;
}

interface FetchScenario {
    status: number;
    body: unknown;
    json?: boolean;
}

export function makeFetch(scenarios: FetchScenario[]): { fetch: typeof fetch; calls: FetchCall[] } {
    const calls: FetchCall[] = [];
    let scenarioIndex = 0;

    const fetchImpl = (url: string, init?: RequestInit): Promise<Response> => {
        calls.push({ url, init: init ?? {} });
        const scenario = scenarios[scenarioIndex++] ?? { status: 500, body: {} };
        const body = typeof scenario.body === 'string' ? scenario.body : JSON.stringify(scenario.body);
        return Promise.resolve({
            ok: scenario.status >= 200 && scenario.status < 300,
            status: scenario.status,
            headers: new Headers({ 'content-type': scenario.json === false ? 'text/plain' : 'application/json' }),
            json: () => Promise.resolve(scenario.body),
            text: () => Promise.resolve(body as string),
        } as unknown as Response);
    };

    return { fetch: fetchImpl as unknown as typeof fetch, calls };
}
