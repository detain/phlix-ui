/**
 * Shared error vocabulary + friendly message formatting for the Phlix UI (R5.3a).
 *
 * Centralizes what used to be a `function errMessage()` copy-pasted into ~16
 * pages, and adds two network-resilience error types the `ApiClient` now throws
 * so offline / slow-network failures surface as friendly, recoverable copy
 * instead of an opaque `TypeError: Failed to fetch`.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/** A non-2xx HTTP response. `message` is the server-provided error text. */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown = null,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** The request never reached the server (offline / DNS / connection refused). */
export class NetworkError extends Error {
  constructor(message = 'You appear to be offline. Check your connection and try again.') {
    super(message);
    this.name = 'NetworkError';
  }
}

/** The request was aborted because it exceeded the client timeout. */
export class TimeoutError extends Error {
  constructor(message = 'The request timed out. Please try again.') {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Resolve any thrown value to a human-readable message.
 *
 * `NetworkError`/`TimeoutError`/`ApiError` already carry friendly text, so this
 * is the same "prefer the Error's message, else the caller fallback" logic the
 * pages used locally — now shared, and aware of the new typed errors.
 */
export function errMessage(e: unknown, fallback = 'Something went wrong.'): string {
  if (e instanceof Error && e.message) {
    return e.message;
  }
  return fallback;
}

/** True when the browser reports it is offline (SSR-safe; defaults to online). */
export function isOffline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}
