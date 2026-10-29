/**
 * Minimal, dependency-free SHA-256 (FIPS 180-4) for the SyncPlay group gate.
 *
 * phlix-syncplay SPEC §4/§8.2 defines `password_hash` as the group-access
 * credential on the wire: the UNSALTED SHA-256 hex digest of the password —
 * a weak gate by design (the digest is replayable), NOT an identity proof,
 * which is why the server derives membership from the JWT subject instead
 * (SPEC §9). The server's `groupPasswordGate` accepts the canonical 64-char
 * lowercase hex digest with precedence over the legacy plaintext `password`
 * arm, so sending the hash keeps the secret off the WebSocket frame body.
 *
 * Why not `crypto.subtle.digest`? Three reasons, each fatal on its own:
 * the `GROUP_JOIN` frame is built SYNCHRONOUSLY inside `socket.onopen`
 * (`api/syncplay.ts`), and subtle is Promise-only; `crypto.subtle` is
 * absent in non-secure contexts (a media server on plain-http LAN — a
 * supported phlix deployment — would refuse to dial its own gate); and the
 * vitest/jsdom surface has no `subtle` at all, so the wire law would be
 * untestable. This mirrors the phlix-mobile-client `src/syncplay/sha256.ts`
 * primitive byte-for-byte in behaviour: pinned by the same NIST/Node
 * known-answer vectors in `syncplaySha256.test.ts`.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * SHA-256 of a UTF-8 string, as 64-char lowercase hex.
 *
 * Pure function (Atomic Predictability): same input, same digest, no state.
 */
export declare function sha256Hex(input: string): string;
/**
 * Hash a SyncPlay group password into the SPEC §4 `password_hash` wire field.
 *
 * Guard clause (Early Exit): an empty password THROWS. `sha256Hex('')` is a
 * perfectly valid digest, but on the wire a hash-of-empty-string reads as a
 * SET (empty) group gate — so the omission decision ("no password → omit the
 * field") belongs to the callers and this throw is the fail-loud tripwire for
 * any future caller that forgets to.
 */
export declare function hashGroupPassword(password: string): string;
