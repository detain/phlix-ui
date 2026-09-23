/**
 * Locale bundle invariants (i18n build-out).
 *
 * Every shipped bundle must be a COMPLETE, structure-identical translation of
 * `DEFAULT_MESSAGES`. The type system already forces key presence/absence at
 * compile time (`satisfies PhlixMessages`); this suite is the RUNTIME record of
 * the same laws plus the things types cannot express:
 *
 *   1. Key-set identity vs the English catalog (recursive — any shape drifts red).
 *   2. Placeholder parity: the set of `{x}` tokens in a translation is EXACTLY
 *      the set in the English source (braces and names verbatim).
 *   3. Plural-segment law: an English pipe template keeps the same segment count
 *      where the target language pluralizes at all. es/fr/de/it/pt_BR have two
 *      CLDR cardinal categories (one | other); ja has ONE category, so every
 *      English pipe form collapses to a single segment and NO ja value may
 *      contain '|'. The only deviation from strict en-parity is additive and
 *      whitelisted: `player.subtitleDownloads` — English hardcodes its plural
 *      ('{count} downloads', no singular branch) while every call site passes
 *      `count`, so inflected languages ship the honest two-slot template here.
 *   4. No English leakage: a translated value equal to its English string is a
 *      defect unless it sits on the per-locale allow-list (brand names, product
 *      terms, and true cognates — each allow-list entry is itself re-verified to
 *      actually equal the English value, so the list cannot silently grow stale).
 *   5. ja rendering sanity: every value contains CJK codepoints except the exact
 *      allow-listed Latin-only set (badges, addresses, product names).
 *   6. Latin-language sanity: a meaningful aggregate of values carries
 *      target-language diacriticals (counted, not asserted per string — 'Menu'
 *      legitimately has none).
 *   7. mergeMessages integration: merging a bundle over the defaults yields the
 *      bundle itself — i.e. every localized value wins, no English survives.
 *   8. Translator smoke: localized plurals resolve separator-free at real counts.
 *
 * Style follows `messages.test.ts`: same imports, same describe/it nesting,
 * derived-not-hardcoded expectations wherever possible.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MESSAGES,
  createTranslator,
  mergeMessages,
  pluralMessageKeys,
  type MessageKey,
  type PhlixMessages,
  type PhlixMessagesConfig,
} from './messages';
import {
  DE_MESSAGES,
  ES_MESSAGES,
  FR_MESSAGES,
  IT_MESSAGES,
  JA_MESSAGES,
  LOCALE_MESSAGES,
  PT_BR_MESSAGES,
  type PhlixLocaleCode,
} from './locales';

/** Catalog viewed as plain nested string maps (leaf access in tests). */
type Nested = Record<string, Record<string, string>>;
const en = DEFAULT_MESSAGES as unknown as Nested;

/** Recursively flatten any-depth catalog to sorted `group.key` paths. */
function flattenKeys(catalog: unknown, prefix = ''): string[] {
  const out: string[] = [];
  for (const [key, value] of Object.entries(catalog as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') out.push(...flattenKeys(value, path));
    else out.push(path);
  }
  return out.sort();
}

/** The set of `{x}` placeholder tokens in a message value (names verbatim). */
function placeholderSet(value: string): string[] {
  return [...new Set(value.match(/\{\w+\}/g) ?? [])].sort();
}

/** Pipe-form segment count of a message value. */
function segmentCount(value: string): number {
  return value.split('|').length;
}

/** Plural keys derived FROM the English catalog, never listed by hand. */
const EN_PLURAL_KEYS = new Set(pluralMessageKeys());

/**
 * The single ALLOWED deviation from en-parity (see module docblock point 3):
 * inflected languages may add a two-slot pipe template where English shipped a
 * hardcoded plural. Any other new pipe is a test failure by construction.
 */
const ADDITIVE_PLURAL_KEYS: readonly string[] = ['player.subtitleDownloads'];

/**
 * Values legitimately identical to English per locale: brands (Phlix, SyncPlay),
 * product names (theme names inside 'Theme: …'), international abbreviations
 * (SDH, ID), technical strings ({fps} fps, Original ({height}p)), example
 * addresses, and TRUE cognates (fr 'Pagination', de 'Moderator', it 'Password',
 * es 'Color'). Kept exact so both directions are pinned: an unlisted English
 * echo fails, and a stale allow entry (value now translated) also fails.
 */
const UNTRANSLATED_OK: Record<PhlixLocaleCode, readonly string[]> = {
  es: [
    'auth.emailPlaceholder',
    'player.audio',
    'player.color',
    'player.qualityOriginal',
    'player.skipLabelIntro',
    'player.subtitleFps',
    'player.subtitleHearingImpaired',
    'syncplay.syncPlay',
    'syncplay.title',
  ],
  fr: [
    'auth.emailPlaceholder',
    'common.notifications',
    'music.album',
    'music.albumCount',
    'music.albums',
    'music.albumsTotal',
    'music.pagination',
    'music.pause',
    'palette.groupNavigation',
    'player.audio',
    'player.directStream',
    'player.pause',
    'player.qualityAuto',
    'player.qualityAutoActive',
    'player.qualityOriginal',
    'player.skipLabelIntro',
    'player.subtitleHearingImpaired',
    'player.volume',
    'shell.menu',
    'syncplay.syncPlay',
    'syncplay.title',
  ],
  de: [
    'auth.emailPlaceholder',
    'music.album',
    'music.crossfade',
    'music.pause',
    'palette.groupNavigation',
    'palette.groupTheme',
    'palette.themeDaylight',
    'palette.themeMidnight',
    'palette.themeNocturne',
    'parental.scheduleName',
    'parental.tags',
    'player.audio',
    'player.pause',
    'player.qualityAuto',
    'player.qualityAutoActive',
    'player.qualityOriginal',
    'player.skipLabelIntro',
    'player.subtitleFps',
    'player.subtitleHearingImpaired',
    'settings.crossfade',
    'settings.tabServer',
    'settings.theme',
    'syncplay.roleModerator',
    'syncplay.syncPlay',
    'syncplay.title',
  ],
  it: [
    'auth.email',
    'auth.emailPlaceholder',
    'auth.password',
    'music.album',
    'music.crossfade',
    'player.audio',
    'player.miniPlayer',
    'player.qualityAuto',
    'player.qualityAutoActive',
    'player.skipLabelIntro',
    'player.subtitleFps',
    'player.subtitleHearingImpaired',
    'player.volume',
    'settings.crossfade',
    'settings.tabServer',
    'shell.account',
    'shell.accountNamed',
    'shell.menu',
    'syncplay.syncPlay',
    'syncplay.title',
  ],
  pt_BR: [
    'auth.emailPlaceholder',
    'player.miniPlayer',
    'player.qualityAuto',
    'player.qualityAutoActive',
    'player.qualityOriginal',
    'player.subtitleHearingImpaired',
    'player.volume',
    'parental.tags',
    'shell.menu',
    'syncplay.syncPlay',
    'syncplay.title',
  ],
  ja: [
    'auth.emailPlaceholder',
    'connect.addressPlaceholder',
    'player.subtitleHearingImpaired',
    'syncplay.syncPlay',
    'syncplay.title',
  ],
};

/** CJK Unified + kana blocks — the ja rendering-sanity signal. */
const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/;

/**
 * Diacritical classes are deliberately NOT shared: each lists the letters that
 * are FOREIGN to English orthography, so a plain-ASCII-only bundle (i.e. an
 * untranslated or lazily-stripped one) cannot pass. it is the sparsest language
 * here (its grave accents are rarer in short UI labels), hence its lower bar.
 */
const LATIN_SPECS: Partial<Record<PhlixLocaleCode, { diacritics: RegExp; minValues: number }>> = {
  es: { diacritics: /[áéíóúüñ¿¡]/, minValues: 50 },
  fr: { diacritics: /[àâäéèêëîïôùûüçœ]/, minValues: 50 },
  de: { diacritics: /[äöüß]/, minValues: 50 },
  it: { diacritics: /[àèéìòù]/, minValues: 15 },
  pt_BR: { diacritics: /[ãõáâàéêíóôúçü]/, minValues: 50 },
};

interface LocaleSpec {
  tag: PhlixLocaleCode;
  name: string;
  bundle: PhlixMessages;
  /** CLDR cardinal category count the bundle is authored against. */
  pluralSegments: 1 | 2;
}

const LOCALES: LocaleSpec[] = [
  { tag: 'es', name: 'Español', bundle: ES_MESSAGES, pluralSegments: 2 },
  { tag: 'fr', name: 'Français', bundle: FR_MESSAGES, pluralSegments: 2 },
  { tag: 'de', name: 'Deutsch', bundle: DE_MESSAGES, pluralSegments: 2 },
  { tag: 'it', name: 'Italiano', bundle: IT_MESSAGES, pluralSegments: 2 },
  { tag: 'pt_BR', name: 'Português (Brasil)', bundle: PT_BR_MESSAGES, pluralSegments: 2 },
  { tag: 'ja', name: '日本語', bundle: JA_MESSAGES, pluralSegments: 1 },
];

for (const spec of LOCALES) {
  const nested = spec.bundle as unknown as Nested;

  describe(`${spec.tag} locale bundle (${spec.name})`, () => {
    it('covers EXACTLY the English key set (recursive identity, no extras, no gaps)', () => {
      expect(flattenKeys(spec.bundle)).toEqual(flattenKeys(DEFAULT_MESSAGES));
    });

    it('has only non-empty, trimmed string values', () => {
      for (const [group, entries] of Object.entries(nested)) {
        for (const [key, value] of Object.entries(entries)) {
          expect(typeof value, `${group}.${key}`).toBe('string');
          expect(value.trim(), `${group}.${key}`).toBe(value);
          expect(value.length, `${group}.${key}`).toBeGreaterThan(0);
        }
      }
    });

    it('preserves the placeholder set of every English message verbatim', () => {
      for (const path of flattenKeys(DEFAULT_MESSAGES)) {
        // `admin` leaf keys themselves contain dots — the group is the FIRST
        // segment; everything after the first dot is the leaf key verbatim.
        const dot = path.indexOf('.');
        const group = path.slice(0, dot);
        const key = path.slice(dot + 1);
        expect(placeholderSet(nested[group]![key]!), path).toEqual(placeholderSet(en[group]![key]!));
      }
    });

    it('keeps the CLDR plural-segment law per language', () => {
      for (const [group, entries] of Object.entries(nested)) {
        for (const [key, value] of Object.entries(entries)) {
          const path = `${group}.${key}`;
          const isEnPlural = EN_PLURAL_KEYS.has(path);
          const isAdditive = ADDITIVE_PLURAL_KEYS.includes(path);
          if (isEnPlural) {
            expect(segmentCount(value), path).toBe(spec.pluralSegments);
          } else if (isAdditive) {
            // only the inflected locales may add the honest two-slot form
            expect(segmentCount(value), path).toBe(spec.pluralSegments === 1 ? 1 : 2);
          } else {
            expect(value, path).not.toContain('|');
          }
          // every segment of a pipe template stands on its own
          if (value.includes('|')) {
            for (const part of value.split('|')) expect(part.trim().length, `${path} segment`).toBeGreaterThan(0);
            // counts must appear in EVERY slot, not just one
            if (en[group]![key]!.includes('{count}')) {
              for (const part of value.split('|')) expect(part, `${path} segment`).toContain('{count}');
            }
          }
        }
      }
    });

    it('has no English leakage beyond the allow-list (both directions pinned)', () => {
      const allow = new Set(UNTRANSLATED_OK[spec.tag]);
      for (const [group, entries] of Object.entries(nested)) {
        for (const [key, value] of Object.entries(entries)) {
          const path = `${group}.${key}`;
          if (value === en[group]![key]!) {
            expect(allow.has(path), `${path} equals English but is not allow-listed`).toBe(true);
          } else {
            expect(allow.has(path), `${path} is allow-listed as identical but no longer equals English`).toBe(false);
          }
        }
      }
    });

    const latin = LATIN_SPECS[spec.tag];
    if (latin) {
      it(`carries target-language diacriticals in an aggregate of values`, () => {
        let count = 0;
        for (const entries of Object.values(nested)) {
          for (const value of Object.values(entries)) if (latin.diacritics.test(value)) count++;
        }
        expect(count).toBeGreaterThanOrEqual(latin.minValues);
      });
    }

    if (spec.tag === 'ja') {
      it('renders every value in CJK except the exact Latin-only allow-list', () => {
        const latinOnly: string[] = [];
        for (const [group, entries] of Object.entries(nested)) {
          for (const [key, value] of Object.entries(entries)) {
            if (!CJK.test(value)) latinOnly.push(`${group}.${key}`);
          }
        }
        expect(latinOnly.sort()).toEqual([...UNTRANSLATED_OK.ja].sort());
      });
    }

    it('mergeMessages(bundle) over the defaults yields the bundle — zero English survives', () => {
      const merged = mergeMessages(spec.bundle as PhlixMessagesConfig) as unknown as Nested;
      expect(merged).toEqual(nested);
      // explicit per-group sample (first non-allow-listed leaf): localized value wins
      for (const [group, entries] of Object.entries(nested)) {
        const sampled = Object.entries(entries).find(
          ([key]) => !UNTRANSLATED_OK[spec.tag].includes(`${group}.${key}`),
        );
        expect(sampled, `group ${group} has only allow-listed keys?`).toBeTruthy();
        expect(merged[group]![sampled![0]!], `${group} sample`).toBe(sampled![1]);
      }
    });

    it('createTranslator(bundle) resolves localized plurals separator-free', () => {
      const t = createTranslator(spec.bundle as PhlixMessagesConfig);
      for (const path of EN_PLURAL_KEYS) {
        for (const count of [0, 1, 2, 7]) {
          const out = t(path as MessageKey, { count });
          expect(out, `${path}/${count}`).not.toContain('|');
          expect(out, `${path}/${count}`).not.toContain('{count}');
          expect(out, `${path}/${count}`).not.toBe(path);
        }
      }
    });
  });
}

describe('locale registry', () => {
  it('LOCALE_MESSAGES carries exactly the six shipped tags', () => {
    expect(Object.keys(LOCALE_MESSAGES).sort()).toEqual(['de', 'es', 'fr', 'it', 'ja', 'pt_BR']);
  });

  it('registry entries are the named exports themselves (no copies)', () => {
    expect(LOCALE_MESSAGES.es).toBe(ES_MESSAGES);
    expect(LOCALE_MESSAGES.fr).toBe(FR_MESSAGES);
    expect(LOCALE_MESSAGES.de).toBe(DE_MESSAGES);
    expect(LOCALE_MESSAGES.it).toBe(IT_MESSAGES);
    expect(LOCALE_MESSAGES.pt_BR).toBe(PT_BR_MESSAGES);
    expect(LOCALE_MESSAGES.ja).toBe(JA_MESSAGES);
  });
});
