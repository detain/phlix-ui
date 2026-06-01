export class ApiError extends Error {
    constructor(message: string, public readonly status: number, public readonly body: unknown = null) {
        super(message);
        this.name = 'ApiError';
    }
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

export class ApiClient {
    private readonly baseUrl: string;
    private readonly tokens: TokenStore;
    private readonly doFetch: typeof fetch;

    constructor(options: ApiClientOptions = {}) {
        this.baseUrl = options.baseUrl ?? (typeof window !== 'undefined' ? window.location.origin : '');
        this.tokens = options.tokenStore ?? {
            getAccessToken: () => null,
            setAccessToken: () => {},
            getRefreshToken: () => null,
            setRefreshToken: () => {},
            getUser: () => null,
            setUser: () => {},
            clear: () => {},
        };
        this.doFetch = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
    }

    async request<T = unknown>(method: string, endpoint: string, data: unknown = null): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        const token = this.tokens.getAccessToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const init: RequestInit = { method, headers, credentials: 'same-origin' };
        if (data !== null && ['POST', 'PUT', 'PATCH'].includes(method)) {
            init.body = JSON.stringify(data);
        }
        const response = await this.doFetch(`${this.baseUrl}${endpoint}`, init);
        if (!response.ok) {
            throw new ApiError('Request failed', response.status);
        }
        return response.json() as Promise<T>;
    }

    async get<T = unknown>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request<T>('GET', endpoint + query);
    }

    async post<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>('POST', endpoint, data ?? null);
    }

    async put<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>('PUT', endpoint, data ?? null);
    }

    async patch<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>('PATCH', endpoint, data ?? null);
    }

    async delete<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>('DELETE', endpoint);
    }

    isLoggedIn(): boolean {
        return this.tokens.getAccessToken() !== null;
    }

    async logout(): Promise<void> {
        this.tokens.clear();
    }
}

export const api = new ApiClient();
