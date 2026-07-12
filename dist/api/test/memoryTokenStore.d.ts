/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { TokenStore } from '../tokenStore';
export declare class MemoryTokenStore implements TokenStore {
    private accessToken;
    private refreshToken;
    private userData;
    constructor(initial?: {
        access?: string;
        refresh?: string;
        user?: unknown;
    });
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown;
    setUser(user: unknown): void;
    clear(): void;
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
export declare function makeFetch(scenarios: FetchScenario[]): {
    fetch: typeof fetch;
    calls: FetchCall[];
};
export {};
