/**
 * safeClone — a deep clone that doesn't assume `structuredClone` exists.
 *
 * `structuredClone` is the right tool (handles cycles, typed arrays, Maps/Sets),
 * but it's only Chrome 98+ / Tizen webviews on older TVs lack it. This guard uses
 * the native implementation when present and falls back to the JSON round-trip
 * otherwise. The JSON fallback is sufficient for the plain JSON-ish settings
 * payloads phlix-ui clones (no functions / cycles / non-JSON values), and modern
 * browsers keep identical structuredClone behaviour.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
export function safeClone<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}
