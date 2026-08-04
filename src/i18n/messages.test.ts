/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MESSAGES,
  mergeMessages,
  createTranslator,
  pluralMessageKeys,
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

  /**
   * S134 — plural selection.
   *
   * The catalogue has always authored plurals in the pipe form, but the resolver
   * only interpolated, so `'{count} member | {count} members'` reached the screen
   * verbatim: users read `2 member | 2 members`. Selection now runs BEFORE
   * interpolation, via `Intl.PluralRules`.
   */
  describe('pluralMessageKeys', () => {
    it('finds the pipe-form messages by scanning the catalogue, not from a hand-kept list', () => {
      const keys = pluralMessageKeys();
      expect(keys.length).toBeGreaterThan(0);
      // Every reported key must really be a pipe template — the derivation, not a copy.
      for (const key of keys) {
        const [group, leaf] = key.split('.') as [string, string];
        const value = (DEFAULT_MESSAGES as unknown as Record<string, Record<string, string>>)[
          group
        ]![leaf]!;
        expect(value, key).toContain('|');
      }
    });

    it('reports EVERY pipe message in the catalogue (no separator survives a t() call)', () => {
      // Independently re-derive the set here: if `pluralMessageKeys` ever narrows
      // (e.g. someone scopes it to one group), this catches it.
      const expected: string[] = [];
      for (const [group, entries] of Object.entries(DEFAULT_MESSAGES)) {
        for (const [leaf, value] of Object.entries(entries as Record<string, string>)) {
          if (value.includes('|')) expected.push(`${group}.${leaf}`);
        }
      }
      expect([...pluralMessageKeys()].sort()).toEqual(expected.sort());
      // The three known at the time of writing, so a REMOVAL is also visible.
      expect(expected).toEqual(
        expect.arrayContaining(['syncplay.members', 'music.albumCount', 'music.trackCount']),
      );
    });

    it('resolves every plural message to a separator-free string at every boundary count', () => {
      const t = createTranslator();
      for (const key of pluralMessageKeys()) {
        for (const count of [0, 1, 2, 5, 100]) {
          const out = t(key as MessageKey, { count });
          expect(out, `${key}/${count}`).not.toContain('|');
          expect(out, `${key}/${count}`).not.toContain('{count}');
        }
      }
    });
  });

  describe('createTranslator — plural selection', () => {
    it('selects singular vs plural for a pipe message and interpolates the count', () => {
      const t = createTranslator();
      expect(t('syncplay.members', { count: 1 })).toBe('1 member');
      expect(t('syncplay.members', { count: 2 })).toBe('2 members');
      expect(t('syncplay.members', { count: 0 })).toBe('0 members');
    });

    it('selects for the music counts too', () => {
      const t = createTranslator();
      expect(t('music.albumCount', { count: 1 })).toBe('1 album');
      expect(t('music.albumCount', { count: 9 })).toBe('9 albums');
      expect(t('music.trackCount', { count: 1 })).toBe('1 track');
      expect(t('music.trackCount', { count: 12 })).toBe('12 tracks');
    });

    it('accepts a numeric-string count (params are `string | number`)', () => {
      const t = createTranslator();
      expect(t('syncplay.members', { count: '1' })).toBe('1 member');
      expect(t('syncplay.members', { count: '4' })).toBe('4 members');
    });

    it('degrades a count-less plural call to the LAST form rather than leaking the separator', () => {
      // This is the safety net for the `SyncPlayModal.vue` defect; the
      // `plural/plural-message-needs-count` lint rule is what actually prevents it.
      const t = createTranslator();
      /* eslint-disable plural/plural-message-needs-count -- these calls omit `count`
         ON PURPOSE: they are the test for the degradation path. The rule flagging
         them is the rule working, and disabling it here (with a reason) rather
         than exempting test files keeps the rule live everywhere else. */
      expect(t('syncplay.members')).toBe('{count} members');
      expect(t('syncplay.members')).not.toContain('|');
      expect(t('syncplay.members', { name: 'x' })).toBe('{count} members');
      /* eslint-enable plural/plural-message-needs-count */
    });

    it('selects on a consumer OVERRIDE, so a translated plural works too', () => {
      const t = createTranslator({ syncplay: { members: '{count} Mitglied | {count} Mitglieder' } });
      expect(t('syncplay.members', { count: 1 })).toBe('1 Mitglied');
      expect(t('syncplay.members', { count: 3 })).toBe('3 Mitglieder');
    });

    it('leaves non-plural messages exactly as before (no behavioural drift)', () => {
      const t = createTranslator();
      expect(t('player.play')).toBe('Play');
      expect(t('player.resumeFrom', { time: '4:01' })).toBe('Resume from 4:01?');
      expect(t('common.retry', { count: 2 })).toBe('Retry');
    });
  });
});
