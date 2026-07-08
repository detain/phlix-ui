/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MESSAGES,
  mergeMessages,
  createTranslator,
  type MessageKey,
  type PhlixMessagesConfig,
} from './messages';

describe('i18n message catalog (R6.5c)', () => {
  describe('DEFAULT_MESSAGES', () => {
    it('is a two-level catalog of non-empty English strings', () => {
      const groups = Object.entries(DEFAULT_MESSAGES);
      expect(groups.length).toBeGreaterThan(0);
      for (const [group, entries] of groups) {
        expect(entries, group).toBeTypeOf('object');
        const leaves = Object.entries(entries as Record<string, unknown>);
        expect(leaves.length, group).toBeGreaterThan(0);
        for (const [key, value] of leaves) {
          expect(value, `${group}.${key}`).toBeTypeOf('string');
          expect((value as string).length, `${group}.${key}`).toBeGreaterThan(0);
        }
      }
    });

    it('includes the seed keys the adopted surfaces rely on', () => {
      expect(DEFAULT_MESSAGES.common.retry).toBe('Retry');
      expect(DEFAULT_MESSAGES.common.close).toBe('Close');
      expect(DEFAULT_MESSAGES.player.play).toBe('Play');
      expect(DEFAULT_MESSAGES.player.pause).toBe('Pause');
      expect(DEFAULT_MESSAGES.player.resumeFrom).toBe('Resume from {time}?');
    });
  });

  describe('mergeMessages', () => {
    it('returns the English defaults when no overrides are given', () => {
      expect(mergeMessages()).toEqual(DEFAULT_MESSAGES);
      expect(mergeMessages(undefined)).toEqual(DEFAULT_MESSAGES);
    });

    it('returns a defensive copy, not the DEFAULT_MESSAGES reference', () => {
      const merged = mergeMessages();
      expect(merged).not.toBe(DEFAULT_MESSAGES);
      expect(merged.player).not.toBe(DEFAULT_MESSAGES.player);
    });

    it('deep-partially overrides a single key, keeping siblings and other groups', () => {
      const merged = mergeMessages({ player: { play: 'Reproducir' } });
      expect(merged.player.play).toBe('Reproducir');
      // sibling key in the same group survives
      expect(merged.player.pause).toBe(DEFAULT_MESSAGES.player.pause);
      // other groups survive untouched
      expect(merged.common.retry).toBe(DEFAULT_MESSAGES.common.retry);
    });

    it('ignores a non-object group override without throwing', () => {
      const merged = mergeMessages({ player: null } as unknown as PhlixMessagesConfig);
      expect(merged.player).toEqual(DEFAULT_MESSAGES.player);
    });

    it('does not mutate DEFAULT_MESSAGES', () => {
      mergeMessages({ player: { play: 'mutated?' } });
      expect(DEFAULT_MESSAGES.player.play).toBe('Play');
    });
  });

  describe('createTranslator / t', () => {
    it('resolves a key to its English default', () => {
      const t = createTranslator();
      expect(t('player.play')).toBe('Play');
      expect(t('common.retry')).toBe('Retry');
    });

    it('resolves a consumer override and leaves non-overridden keys as defaults', () => {
      const t = createTranslator({ common: { retry: 'Try again' } });
      expect(t('common.retry')).toBe('Try again');
      expect(t('player.play')).toBe('Play');
    });

    it('interpolates {param} placeholders', () => {
      const t = createTranslator();
      expect(t('player.resumeFrom', { time: '4:01' })).toBe('Resume from 4:01?');
    });

    it('coerces number params, including 0', () => {
      const t = createTranslator({ common: { retry: 'count={n}' } });
      expect(t('common.retry', { n: 0 })).toBe('count=0');
      expect(t('common.retry', { n: 12 })).toBe('count=12');
    });

    it('leaves a placeholder literal when its param is missing or undefined', () => {
      const t = createTranslator({ common: { retry: 'Hi {name}' } });
      expect(t('common.retry')).toBe('Hi {name}');
      expect(t('common.retry', {})).toBe('Hi {name}');
      expect(t('common.retry', { name: undefined as unknown as string })).toBe('Hi {name}');
    });

    it('replaces every occurrence and supports multiple params', () => {
      const t = createTranslator({ common: { retry: '{a}-{b}-{a}' } });
      expect(t('common.retry', { a: '1', b: '2' })).toBe('1-2-1');
    });

    it('ignores extra params not referenced by the template', () => {
      const t = createTranslator();
      expect(t('player.play', { unused: 'x' })).toBe('Play');
    });

    it('echoes the key when the group or leaf is unknown (never undefined)', () => {
      const t = createTranslator();
      expect(t('nope.nokey' as MessageKey)).toBe('nope.nokey');
      expect(t('player.nokey' as MessageKey)).toBe('player.nokey');
      expect(t('nodot' as MessageKey)).toBe('nodot');
    });
  });
});
