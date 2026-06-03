/** Re-exported so `import { ApiError } from '.../api/client'` deep imports keep working. */
export { ApiError } from './errors';
export interface AuthUser {
    id: string;
    email?: string;
    username?: string;
    name?: string;
    is_admin?: boolean;
    [key: string]: unknown;
}
export interface TokenStore {
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
}
export interface ApiClientOptions {
    baseUrl?: string;
    tokenStore?: TokenStore;
    fetchImpl?: typeof fetch;
    /** Per-request timeout in ms before aborting with a `TimeoutError` (default 15000). */
    timeoutMs?: number;
}
export declare function normalizeBool(value: unknown): boolean;
export declare class ApiClient {
    private readonly baseUrl;
    private readonly tokens;
    private readonly doFetch;
    private readonly timeoutMs;
    constructor(options?: ApiClientOptions);
    request<T = unknown>(method: string, endpoint: string, data?: unknown, signal?: AbortSignal): Promise<T>;
    private handleResponse;
    private extractError;
    refreshToken(): Promise<boolean>;
    get<T = unknown>(endpoint: string, params?: Record<string, string>, signal?: AbortSignal): Promise<T>;
    post<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    put<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    patch<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    delete<T = unknown>(endpoint: string): Promise<T>;
    isLoggedIn(): boolean;
    getCurrentUser(): Promise<AuthUser>;
    logout(redirect?: boolean): void;
}
export declare const api: ApiClient;
