/**
 * Tests for the one pluralisation mechanism (S134).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import {
  PLURAL_CATEGORIES,
  isPluralTemplate,
  plural,
  pluralCategory,
  pluralCount,
  pluralize,
  selectPluralTemplate,
} from './plural';

describe('pluralCategory', () => {
  it('classifies English cardinals the way CLDR does, not the way `=== 1` does', () => {
    expect(pluralCategory(1, { locale: 'en' })).toBe('one');
    expect(pluralCategory(0, { locale: 'en' })).toBe('other');
    expect(pluralCategory(2, { locale: 'en' })).toBe('other');
    expect(pluralCategory(1.5, { locale: 'en' })).toBe('other');
    // -1 is `one` in English CLDR ("minus one item"), which `n === 1` gets WRONG.
    expect(pluralCategory(-1, { locale: 'en' })).toBe('one');
  });

  it('uses the locale, so a non-English locale is not baked out', () => {
    // Russian: 1 and 21 are `one`, 2-4 are `few`, 0 and 5-20 are `many`.
    expect(pluralCategory(1, { locale: 'ru' })).toBe('one');
    expect(pluralCategory(21, { locale: 'ru' })).toBe('one');
    expect(pluralCategory(3, { locale: 'ru' })).toBe('few');
    expect(pluralCategory(5, { locale: 'ru' })).toBe('many');
    // Japanese has a single category for every cardinal.
    expect(pluralCategory(1, { locale: 'ja' })).toBe('other');
    expect(pluralCategory(7, { locale: 'ja' })).toBe('other');
  });

  it('supports ordinals', () => {
    expect(pluralCategory(1, { locale: 'en', type: 'ordinal' })).toBe('one');
    expect(pluralCategory(2, { locale: 'en', type: 'ordinal' })).toBe('two');
    expect(pluralCategory(3, { locale: 'en', type: 'ordinal' })).toBe('few');
    expect(pluralCategory(4, { locale: 'en', type: 'ordinal' })).toBe('other');
  });

  it('normalises a non-finite count to `other` instead of throwing', () => {
    expect(pluralCategory(Number.NaN, { locale: 'en' })).toBe('other');
    expect(pluralCategory(Number.POSITIVE_INFINITY, { locale: 'en' })).toBe('other');
  });

  it('exposes the six LDML categories in canonical order', () => {
    expect(PLURAL_CATEGORIES).toEqual(['zero', 'one', 'two', 'few', 'many', 'other']);
  });
});

/**
 * `Intl.PluralRules` instances are memoised in a Map keyed by locale + type.
 *
 * ⚠ These tests deliberately do NOT claim to pin a separator collision. The
 * "obvious" collision (`('en-cardinal', undefined)` vs `('en', 'cardinal')`) does
 * not exist: with `type` restricted to two fixed strings, `A + 'cardinal' ===
 * B + 'ordinal'` reduces to `'ardinal' === 'ordinal'`. A first draft of this block
 * asserted that collision and passed with the separator mutated to BOTH `''` and
 * `'-'` — it was vacuous, and only an unmutated control run exposed it.
 *
 * What IS real and worth pinning is that the key incorporates BOTH components, so
 * one lookup is never served another's rules. Mutation-verified: keying on the
 * locale alone makes the cardinal/ordinal test red; keying on the type alone makes
 * the cross-locale test red.
 */
describe('rules cache keying', () => {
  it('keeps cardinal and ordinal rules distinct for one locale (key includes the TYPE)', () => {
    // 2 is `other` for English cardinals (2 items) but `two` for ordinals (2nd).
    // Prime cardinal first so a type-blind key would serve it back for the ordinal.
    expect(pluralCategory(2, { locale: 'en', type: 'cardinal' })).toBe('other');
    expect(pluralCategory(2, { locale: 'en', type: 'ordinal' })).toBe('two');
    // …and in the reverse order, so neither ordering is a lucky pass.
    expect(pluralCategory(3, { locale: 'en', type: 'ordinal' })).toBe('few');
    expect(pluralCategory(3, { locale: 'en', type: 'cardinal' })).toBe('other');
  });

  it('keeps rules distinct across locales at one type (key includes the LOCALE)', () => {
    // 3 is `other` in English but `few` in Russian; 1 is `one` in both, and
    // `other` in Japanese. A locale-blind key would serve the first one's rules.
    expect(pluralCategory(3, { locale: 'en' })).toBe('other');
    expect(pluralCategory(3, { locale: 'ru' })).toBe('few');
    expect(pluralCategory(1, { locale: 'ja' })).toBe('other');
    expect(pluralCategory(1, { locale: 'en' })).toBe('one');
  });

  it('is stable across repeated lookups (the memo returns a consistent answer)', () => {
    const first = pluralCategory(5, { locale: 'ru' });
    expect(first).toBe('many');
    for (let i = 0; i < 50; i++) {
      expect(pluralCategory(5, { locale: 'ru' })).toBe(first);
    }
  });
});

describe('plural', () => {
  const forms = { one: 'episode', other: 'episodes' };

  it('selects by category, not by `count === 1`', () => {
    expect(plural(1, forms, { locale: 'en' })).toBe('episode');
    expect(plural(0, forms, { locale: 'en' })).toBe('episodes');
    expect(plural(2, forms, { locale: 'en' })).toBe('episodes');
  });

  it('falls back to `other` when the locale asks for a form the caller did not supply', () => {
    // An English-authored two-form call rendered under Russian: `few` is missing.
    expect(plural(3, forms, { locale: 'ru' })).toBe('episodes');
    expect(plural(1, forms, { locale: 'ru' })).toBe('episode');
  });

  it('honours the extra categories when they ARE supplied', () => {
    const ru = { one: 'файл', few: 'файла', many: 'файлов', other: 'файла' };
    expect(plural(1, ru, { locale: 'ru' })).toBe('файл');
    expect(plural(3, ru, { locale: 'ru' })).toBe('файла');
    expect(plural(7, ru, { locale: 'ru' })).toBe('файлов');
  });

  it('treats an explicitly empty form as a real choice, not a missing one', () => {
    // The `${n} item${n === 1 ? '' : 's'}` shape migrates to a bare-suffix call;
    // `''` must not be confused with "no form supplied" and fall through.
    expect(plural(1, { one: '', other: 's' }, { locale: 'en' })).toBe('');
    expect(plural(4, { one: '', other: 's' }, { locale: 'en' })).toBe('s');
  });
});

describe('pluralize', () => {
  it('is the two-form English shortcut', () => {
    expect(pluralize(1, 'entry', 'entries', { locale: 'en' })).toBe('entry');
    expect(pluralize(9, 'entry', 'entries', { locale: 'en' })).toBe('entries');
  });

  it('handles irregular plurals, which a suffix rule could not', () => {
    expect(pluralize(1, 'person', 'people', { locale: 'en' })).toBe('person');
    expect(pluralize(3, 'person', 'people', { locale: 'en' })).toBe('people');
  });
});

describe('pluralCount', () => {
  it('renders the count and the matching form', () => {
    expect(pluralCount(1, 'photo', 'photos', { locale: 'en' })).toBe('1 photo');
    expect(pluralCount(0, 'photo', 'photos', { locale: 'en' })).toBe('0 photos');
    expect(pluralCount(37, 'photo', 'photos', { locale: 'en' })).toBe('37 photos');
  });

  it('does not group digits by default, so migrated call sites render byte-identically', () => {
    expect(pluralCount(1234, 'photo', 'photos', { locale: 'en' })).toBe('1234 photos');
  });

  it('groups digits on request', () => {
    expect(pluralCount(1234, 'photo', 'photos', { locale: 'en', formatNumber: true })).toBe(
      '1,234 photos',
    );
  });
});

describe('selectPluralTemplate', () => {
  it('picks the matching part of a pipe-form template', () => {
    const template = '{count} member | {count} members';
    expect(selectPluralTemplate(template, 1, { locale: 'en' })).toBe('{count} member');
    expect(selectPluralTemplate(template, 2, { locale: 'en' })).toBe('{count} members');
    expect(selectPluralTemplate(template, 0, { locale: 'en' })).toBe('{count} members');
  });

  it('returns a template with no separator untouched', () => {
    expect(selectPluralTemplate('Play', 1, { locale: 'en' })).toBe('Play');
    expect(selectPluralTemplate('Resume from {time}?', 3, { locale: 'en' })).toBe(
      'Resume from {time}?',
    );
  });

  it('trims whitespace around the separator', () => {
    expect(selectPluralTemplate('a|b', 1, { locale: 'en' })).toBe('a');
    expect(selectPluralTemplate('  a   |   b  ', 5, { locale: 'en' })).toBe('b');
  });

  it('maps parts onto the LOCALE’s own categories, not a fixed two-slot split', () => {
    // Russian uses one/few/many/other, so a four-part override lands on all four.
    const ru = '{count} файл | {count} файла | {count} файлов | {count} файла';
    expect(selectPluralTemplate(ru, 1, { locale: 'ru' })).toBe('{count} файл');
    expect(selectPluralTemplate(ru, 3, { locale: 'ru' })).toBe('{count} файла');
    expect(selectPluralTemplate(ru, 7, { locale: 'ru' })).toBe('{count} файлов');
  });

  it('degrades rather than throwing when the part count does not match the locale', () => {
    // Two parts under Russian (four categories): the last part covers the rest.
    const two = 'one | many';
    expect(selectPluralTemplate(two, 1, { locale: 'ru' })).toBe('one');
    expect(selectPluralTemplate(two, 3, { locale: 'ru' })).toBe('many');
    expect(selectPluralTemplate(two, 7, { locale: 'ru' })).toBe('many');
    // More parts than categories under English: the extras are simply unused.
    expect(selectPluralTemplate('a | b | c | d', 1, { locale: 'en' })).toBe('a');
    expect(selectPluralTemplate('a | b | c | d', 2, { locale: 'en' })).toBe('b');
  });

  it('never leaks the separator into its output', () => {
    for (const count of [0, 1, 2, 5, 21, 100]) {
      for (const locale of ['en', 'ru', 'ja', 'cy', 'ar']) {
        const out = selectPluralTemplate('a | b | c | d | e | f', count, { locale });
        expect(out, `${locale}/${count}`).not.toContain('|');
      }
    }
  });
});

describe('isPluralTemplate', () => {
  it('identifies the pipe form', () => {
    expect(isPluralTemplate('{count} member | {count} members')).toBe(true);
    expect(isPluralTemplate('Play')).toBe(false);
  });
});
