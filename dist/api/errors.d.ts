/**
 * Shared error vocabulary + friendly message formatting for the Phlix UI (R5.3a).
 *
 * Centralizes what used to be a `function errMessage()` copy-pasted into ~16
 * pages, and adds two network-resilience error types the `ApiClient` now throws
 * so offline / slow-network failures surface as friendly, recoverable copy
 * instead of an opaque `TypeError: Failed to fetch`.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** A non-2xx HTTP response. `message` is the server-provided error text. */
export declare class ApiError extends Error {
    readonly status: number;
    readonly body: unknown;
    constructor(message: string, status: number, body?: unknown);
}
/** The request never reached the server (offline / DNS / connection refused). */
export declare class NetworkError extends Error {
    constructor(message?: string);
}
/** The request was aborted because it exceeded the client timeout. */
export declare class TimeoutError extends Error {
    constructor(message?: string);
}
/**
 * Resolve any thrown value to a human-readable message.
 *
 * `NetworkError`/`TimeoutError`/`ApiError` already carry friendly text, so this
 * is the same "prefer the Error's message, else the caller fallback" logic the
 * pages used locally — now shared, and aware of the new typed errors.
 */
export declare function errMessage(e: unknown, fallback?: string): string;
/** True when the browser reports it is offline (SSR-safe; defaults to online). */
export declare function isOffline(): boolean;
