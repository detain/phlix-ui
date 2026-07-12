/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
export declare const ACCESS_TOKEN_KEY = "access_token";
export declare const REFRESH_TOKEN_KEY = "refresh_token";
export declare const USER_KEY = "user";
export interface TokenStore {
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
}
export declare class LocalStorageTokenStore implements TokenStore {
    private readonly storage;
    constructor(storage?: Storage);
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
}
