/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { afterEach, vi } from 'vitest';

globalThis.fetch = vi.fn();

// Ensure real timers are always restored after each test.
// This prevents timer state pollution when tests forget to call
// vi.useRealTimers() in their afterEach/afterAll hooks.
afterEach(() => {
  vi.useRealTimers();
});
