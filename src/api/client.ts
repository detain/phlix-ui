import { ApiError, NetworkError, TimeoutError, isOffline } from './errors';

/** Re-exported so `import { ApiError } from '.../api/client'` deep imports keep working. */
export { ApiError } from './errors';

/** Default per-request timeout (ms) before the client aborts with a `TimeoutError`. */
const DEFAULT_TIMEOUT_MS = 15000;

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

export function normalizeBool(value: unknown): boolean {
    return value === true || value === 1 || value === '1' || value === 'true';
}

export class ApiClient {
    private readonly baseUrl: string;
    private readonly tokens: TokenStore;
    private readonly doFetch: typeof fetch;
    private readonly timeoutMs: number;

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
        this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    }

    async request<T = unknown>(
        method: string,
        endpoint: string,
        data: unknown = null,
        signal?: AbortSignal,
    ): Promise<T> {
        const build = (effectiveSignal: AbortSignal): RequestInit => {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };
            const token = this.tokens.getAccessToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const init: RequestInit = {
                method,
                headers,
                credentials: 'same-origin',
                signal: effectiveSignal,
            };
            if (data !== null && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
                init.body = JSON.stringify(data);
            }
            return init;
        };

        const url = `${this.baseUrl}${endpoint}`;

        // Drive every request through our own controller so we can enforce a
        // timeout AND honour a caller's abort signal (e.g. a superseded media
        // request). The timeout sets `timedOut` before aborting so we can tell
        // it apart from a caller-initiated cancellation.
        const controller = new AbortController();
        let timedOut = false;
        const timer = setTimeout(() => {
            timedOut = true;
            controller.abort();
        }, this.timeoutMs);
        const onCallerAbort = (): void => controller.abort();
        if (signal) {
            if (signal.aborted) {
                controller.abort();
            } else {
                signal.addEventListener('abort', onCallerAbort, { once: true });
            }
        }

        try {
            let response = await this.doFetch(url, build(controller.signal));

            if (response.status === 401) {
                const refreshed = await this.refreshToken();
                if (refreshed) {
                    response = await this.doFetch(url, build(controller.signal));
                }
            }

            return await this.handleResponse<T>(response);
        } catch (e) {
            if (timedOut) {
                throw new TimeoutError();
            }
            // A caller-initiated cancellation must stay an AbortError so the
            // store's supersede logic still recognises it.
            if (signal?.aborted) {
                throw e;
            }
            if (e instanceof ApiError) {
                throw e;
            }
            // fetch() rejects with a TypeError on a network failure (DNS,
            // connection refused, offline) — surface it as a friendly NetworkError.
            if (e instanceof TypeError || isOffline()) {
                throw new NetworkError();
            }
            throw e;
        } finally {
            clearTimeout(timer);
            if (signal) {
                signal.removeEventListener('abort', onCallerAbort);
            }
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get('content-type') ?? '';
        const isJson = contentType.includes('application/json');
        const payload: unknown = isJson
            ? await response.json()
            : await response.text();

        if (!response.ok) {
            const message = this.extractError(payload);
            throw new ApiError(message, response.status, payload);
        }

        return payload as T;
    }

    private extractError(payload: unknown): string {
        if (payload && typeof payload === 'object') {
            const obj = payload as Record<string, unknown>;
            if (typeof obj['error'] === 'string') {
                return obj['error'];
            }
            if (typeof obj['message'] === 'string') {
                return obj['message'];
            }
        }
        return 'Request failed';
    }

    async refreshToken(): Promise<boolean> {
        const refreshToken = this.tokens.getRefreshToken();
        if (!refreshToken) {
            return false;
        }
        try {
            const response = await this.doFetch(`${this.baseUrl}/api/v1/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ refresh_token: refreshToken }),
            });
            if (!response.ok) {
                return false;
            }
            const data = (await response.json()) as {
                access_token?: string;
                refresh_token?: string;
            };
            if (typeof data.access_token !== 'string') {
                return false;
            }
            this.tokens.setAccessToken(data.access_token);
            if (typeof data.refresh_token === 'string') {
                this.tokens.setRefreshToken(data.refresh_token);
            }
            return true;
        } catch {
            return false;
        }
    }

    async get<T = unknown>(endpoint: string, params?: Record<string, string>, signal?: AbortSignal): Promise<T> {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request<T>('GET', endpoint + query, null, signal);
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

    async getCurrentUser(): Promise<AuthUser> {
        const { user } = await this.get<{ user: Record<string, unknown> }>('/api/v1/auth/me');
        return { ...(user as AuthUser), is_admin: normalizeBool(user['is_admin']) };
    }

    logout(redirect = true): void {
        this.tokens.clear();
        if (redirect && typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }
}

export const api = new ApiClient();
