/**
 * commandPaletteChord — the platform-appropriate chord hint (review C2).
 *
 * Copyright (c) 2026 Joe Huss <detain@interserver.net>
 *
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import { commandPaletteChord, isApplePlatform } from './commandPaletteChord';

const MAC_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';
const IPAD_UA = 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15';
const WIN_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
const LINUX_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36';

describe('isApplePlatform', () => {
  it('recognises macOS and iPadOS user agents', () => {
    expect(isApplePlatform(MAC_UA)).toBe(true);
    expect(isApplePlatform(IPAD_UA)).toBe(true);
  });

  it('rejects Windows and Linux user agents', () => {
    expect(isApplePlatform(WIN_UA)).toBe(false);
    expect(isApplePlatform(LINUX_UA)).toBe(false);
  });
});

describe('commandPaletteChord', () => {
  it('names the ⌘ chord only on Apple platforms', () => {
    expect(commandPaletteChord(MAC_UA)).toBe('⌘K');
  });

  it('names the Ctrl chord off-Apple (this package ships to windows + desktop hubs)', () => {
    expect(commandPaletteChord(WIN_UA)).toBe('Ctrl+K');
    expect(commandPaletteChord(LINUX_UA)).toBe('Ctrl+K');
  });

  it('falls back to the non-Apple label when no UA is visible (SSR-safe)', () => {
    expect(commandPaletteChord('')).toBe('Ctrl+K');
    expect(commandPaletteChord(undefined)).toBe('Ctrl+K');
  });
});
