/**
 * Known-answer tests for the local SHA-256 (FIPS 180-4) feeding the SyncPlay
 * `password_hash` wire field.
 *
 * Every literal below comes from Node's `crypto.createHash('sha256')` (an
 * independent implementation) or the published NIST examples; the boundary
 * lengths (55/56/64/111) pin the padding rules — those are where hand-rolled
 * digest implementations break. The trailing cross-check re-derives the
 * digest for a mixed sample from `node:crypto` itself, so the primitive and
 * the platform oracle cannot silently diverge.
 *
 * Ported from phlix-mobile-client `src/__tests__/syncplay/sha256.test.ts`
 * (same primitive, same law) for M-UI-14.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { sha256Hex, hashGroupPassword } from './syncplaySha256';

describe('sha256Hex — FIPS 180-4 known answers', () => {
  it.each([
    ['', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
    ['abc', 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
    [
      'The quick brown fox jumps over the lazy dog',
      'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592',
    ],
    [
      'secret123',
      'fcf730b6d95236ecd3c9fc2d92d7b6b2bb061514961aec041d6c7a7192f592e4',
    ],
    // Padding boundaries: 55 bytes fit the tail block, 56 spill to a new one.
    [
      'a'.repeat(55),
      '9f4390f8d30c2dd92ec9f095b65e2b9ae9b0a925a5258e241c9f1e910f734318',
    ],
    [
      'a'.repeat(56),
      'b35439a4ac6f0948b6d6f9e3c6af0f5f590ce20f1bde7090ef7970686ec6738a',
    ],
    [
      'a'.repeat(64),
      'ffe054fe7ae0cb6dc65c3af9b61d5209f439851db43d0ba5997337df154668eb',
    ],
    // Multi-block message.
    [
      'a'.repeat(111),
      '6374f73208854473827f6f6a3f43b1f53eaa3b82c21c1a6d69a2110b2a79baad',
    ],
    // UTF-8 multibyte + astral plane (surrogate pair) encoding law.
    [
      'phlix-测试-🎬',
      '20798601bdd14baedd5ee890f3d7467d7a10ab7343ec58a0f6395631f20e45f9',
    ],
  ])('digests %p', (input, expected) => {
    expect(sha256Hex(input)).toBe(expected);
  });

  it('always returns canonical 64-char lowercase hex (server gate parser law)', () => {
    expect(sha256Hex('anything')).toMatch(/^[0-9a-f]{64}$/);
  });

  it('agrees with node:crypto for a mixed sample', () => {
    const samples = [
      'correct horse battery staple',
      'a'.repeat(127),
      'a'.repeat(128),
      'a'.repeat(129),
      'ünïcödé 🎥密码',
      'sp_' + 'x'.repeat(40),
    ];
    for (const sample of samples) {
      expect(sha256Hex(sample)).toBe(createHash('sha256').update(sample, 'utf8').digest('hex'));
    }
  });
});

describe('hashGroupPassword', () => {
  it('is the sha256 hex of the password (SPEC §4 password_hash field)', () => {
    expect(hashGroupPassword('secret123')).toBe(sha256Hex('secret123'));
  });

  // The docblock PROMISES this guard: empty passwords must never reach the
  // wire as the hash-of-empty-string (the server reads that as a SET empty
  // gate) — callers omit the field instead; this throw is the tripwire for a
  // future caller that skips the omission guard. (sha256Hex('') above stays a
  // valid digest — the primitive is correct; only the GATE use-case forbids it.)
  it('throws on an empty password instead of producing hash-of-empty-string', () => {
    expect(() => hashGroupPassword('')).toThrow(/empty password/);
  });
});
