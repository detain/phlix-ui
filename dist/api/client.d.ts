export declare class ApiError extends Error {
    readonly status: number;
    readonly body: unknown;
    constructor(message: string, status: number, body?: unknown);
}
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
}
export declare function normalizeBool(value: unknown): boolean;
export declare class ApiClient {
    private readonly baseUrl;
    private readonly tokens;
    private readonly doFetch;
    constructor(options?: ApiClientOptions);
    request<T = unknown>(method: string, endpoint: string, data?: unknown): Promise<T>;
    private handleResponse;
    private extractError;
    refreshToken(): Promise<boolean>;
    get<T = unknown>(endpoint: string, params?: Record<string, string>): Promise<T>;
    post<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    put<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    patch<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    delete<T = unknown>(endpoint: string): Promise<T>;
    isLoggedIn(): boolean;
    getCurrentUser(): Promise<AuthUser>;
    logout(redirect?: boolean): void;
}
export declare const api: ApiClient;
