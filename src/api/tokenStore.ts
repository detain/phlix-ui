/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'user';

export interface TokenStore {
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
}

export class LocalStorageTokenStore implements TokenStore {
    constructor(private readonly storage: Storage = window.localStorage) {}

    getAccessToken(): string | null {
        return this.storage.getItem(ACCESS_TOKEN_KEY);
    }

    setAccessToken(token: string): void {
        this.storage.setItem(ACCESS_TOKEN_KEY, token);
    }

    getRefreshToken(): string | null {
        return this.storage.getItem(REFRESH_TOKEN_KEY);
    }

    setRefreshToken(token: string): void {
        this.storage.setItem(REFRESH_TOKEN_KEY, token);
    }

    getUser(): unknown | null {
        const raw = this.storage.getItem(USER_KEY);
        if (raw === null) return null;
        try {
            return JSON.parse(raw) as unknown;
        } catch {
            return null;
        }
    }

    setUser(user: unknown): void {
        this.storage.setItem(USER_KEY, JSON.stringify(user));
    }

    clear(): void {
        this.storage.removeItem(ACCESS_TOKEN_KEY);
        this.storage.removeItem(REFRESH_TOKEN_KEY);
        this.storage.removeItem(USER_KEY);
    }
}
