/**
 * Error-catalog invariants (UI W4 of the error-code doctrine).
 *
 * `src/i18n/errors.ts` maps every wire code from the `@phlix/contracts`
 * registry to a user-facing sentence in each of the seven locales this package
 * ships. The type system already forces per-locale key identity
 * (`Record<ErrorCode, string>`); this suite is the RUNTIME record of the same
 * laws plus what types cannot express — the translation-quality discipline
 * mirrored from `src/i18n/locales.test.ts`:
 *
 *   1. Registry parity: every locale carries EXACTLY the registered codes
 *      (derived from `ERROR_CODES`, never a hand-listed count of keys).
 *   2. Values are non-empty, trimmed strings.
 *   3. Placeholder law: error sentences are static advice — NO `{token}`
 *      interpolation and NO plural `|` pipes in ANY locale (per-request detail
 *      rides the server `error` text through the accessor's fallback chain).
 *   4. No English leakage: a translated value equal to its English string is a
 *      defect. The allow-list is EMPTY by design for this catalog — every one
 *      of the 202×6 translations carries target-language words — and both
 *      directions are pinned (a value drifting back to English fails; so does
 *      a stale allow entry that no longer equals English).
 *   5. ja rendering sanity: every value contains CJK codepoints (empty allow-list).
 *   6. Latin sanity: aggregate diacritical counts at the same bars as the
 *      412-key locale-bundle suite (measured margins here: es 135, fr 128, de
 *      94, it 95, pt_BR 189 — the bars are held, not relaxed, across the
 *      202-key catalog).
 *   7. Accessor degradation matrix: known/unknown/empty/non-string codes ×
 *      locale present/absent/invalid × fallback present/blank — resolve order
 *      locale → en → fallback → generic, never throwing.
 *   8. Title/generic registries are complete and code-consistent.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import { ERROR_CODES, type ErrorCode } from '@phlix/contracts';
import {
  ERROR_MESSAGES,
  ERROR_TITLES,
  GENERIC_ERROR_MESSAGE,
  errorCodeMessage,
  errorCodeTitle,
  isRegisteredErrorCode,
  type PhlixErrorLocale,
} from './errors';

/** Plain string-map view (the union-keyed types would fight dynamic indexing in tests). */
type Flat = Record<string, string>;

const LOCALES: readonly PhlixErrorLocale[] = ['en', 'es', 'fr', 'de', 'it', 'pt_BR', 'ja'];
const TRANSLATED_LOCALES: readonly Exclude<PhlixErrorLocale, 'en'>[] = [
  'es',
  'fr',
  'de',
  'it',
  'pt_BR',
  'ja',
];

const en = ERROR_MESSAGES.en as unknown as Flat;

/** The registry as a sorted key list — the single completeness denominator. */
const REGISTRY_KEYS = [...ERROR_CODES].sort();

/** CJK Unified + kana blocks — same signal as locales.test.ts. */
const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/;

/**
 * Diacritical classes copied verbatim from `locales.test.ts` LATIN_SPECS (each
 * lists letters FOREIGN to English orthography). Bars are NOT scaled down for
 * the smaller catalog — measured margins clear them with room to spare.
 */
const LATIN_SPECS: Record<Exclude<PhlixErrorLocale, 'en' | 'ja'>, { diacritics: RegExp; minValues: number }> = {
  es: { diacritics: /[áéíóúüñ¿¡]/, minValues: 50 },
  fr: { diacritics: /[àâäéèêëîïôùûüçœ]/, minValues: 50 },
  de: { diacritics: /[äöüß]/, minValues: 50 },
  it: { diacritics: /[àèéìòù]/, minValues: 15 },
  pt_BR: { diacritics: /[ãõáâàéêíóôúçü]/, minValues: 50 },
};

describe('error catalog registry parity', () => {
  it('contracts registry is the pinned v0.5.2 set of 202 codes', () => {
    // Guards against a silent re-pin changing the vocabulary without a catalog update.
    expect(ERROR_CODES.length).toBe(202);
    expect(new Set(ERROR_CODES).size).toBe(202);
  });

  for (const locale of LOCALES) {
    it(`${locale} carries EXACTLY the registered codes (no gaps, no extras)`, () => {
      expect(Object.keys(ERROR_MESSAGES[locale] as unknown as Flat).sort()).toEqual(REGISTRY_KEYS);
    });
  }
});

describe('error catalog value laws', () => {
  for (const locale of LOCALES) {
    describe(locale, () => {
      const catalog = ERROR_MESSAGES[locale] as unknown as Flat;

      it('has only non-empty, trimmed string values', () => {
        for (const [code, value] of Object.entries(catalog)) {
          expect(typeof value, code).toBe('string');
          expect(value.trim(), code).toBe(value);
          expect(value.length, code).toBeGreaterThan(0);
        }
      });

      it('carries no {placeholder} tokens and no plural | pipes (static advice law)', () => {
        for (const [code, value] of Object.entries(catalog)) {
          expect(value, code).not.toMatch(/\{\w+\}/);
          expect(value, code).not.toContain('|');
        }
      });
    });
  }

  for (const locale of TRANSLATED_LOCALES) {
    const catalog = ERROR_MESSAGES[locale] as unknown as Flat;

    // The allow-list is deliberately EMPTY: unlike the UI-chrome bundle (brand
    // badges, `{fps}` templates), every error sentence is translatable prose.
    // Both directions pinned, same as UNTRANSLATED_OK in locales.test.ts:
    // an English echo below fails, and nothing may be listed that no longer equals English.
    it(`${locale} has zero English leakage (empty allow-list, both directions)`, () => {
      const UNTRANSLATED_OK: readonly string[] = [];
      for (const [code, value] of Object.entries(catalog)) {
        if (value === en[code]) {
          expect(UNTRANSLATED_OK.includes(code), `${code} equals English but is not allow-listed`).toBe(true);
        }
      }
      for (const code of UNTRANSLATED_OK) {
        expect(catalog[code], `${code} allow-listed but no longer present`).toBeTypeOf('string');
        expect(catalog[code] === en[code], `${code} is allow-listed as identical but no longer equals English`).toBe(true);
      }
    });
  }

  it('ja renders every value in CJK (empty allow-list)', () => {
    const nonCjk = Object.entries(ERROR_MESSAGES.ja as unknown as Flat)
      .filter(([, value]) => !CJK.test(value))
      .map(([code]) => code);
    expect(nonCjk).toEqual([]);
  });

  for (const locale of Object.keys(LATIN_SPECS) as (keyof typeof LATIN_SPECS)[]) {
    it(`${locale} carries target-language diacriticals in an aggregate of values`, () => {
      const spec = LATIN_SPECS[locale];
      let count = 0;
      for (const value of Object.values(ERROR_MESSAGES[locale] as unknown as Flat)) {
        if (spec.diacritics.test(value)) count++;
      }
      expect(count).toBeGreaterThanOrEqual(spec.minValues);
    });
  }
});

describe('error catalog side tables', () => {
  const TITLE_CODES = ['server.offline', 'server.relay_unavailable', 'server.no_tunnel'];

  it('ERROR_TITLES covers exactly the Browse EmptyState codes in every locale', () => {
    for (const locale of LOCALES) {
      expect(Object.keys(ERROR_TITLES[locale]).sort()).toEqual([...TITLE_CODES].sort());
      for (const [code, title] of Object.entries(ERROR_TITLES[locale])) {
        expect(isRegisteredErrorCode(code), code).toBe(true);
        expect(title, `${locale}:${code}`).toBeTruthy();
      }
    }
  });

  it('ERROR_TITLES keeps non-empty values without English echo outside en', () => {
    const enTitles = ERROR_TITLES.en as Flat;
    for (const locale of TRANSLATED_LOCALES) {
      for (const [code, title] of Object.entries(ERROR_TITLES[locale])) {
        expect(title!.trim().length, `${locale}:${code}`).toBeGreaterThan(0);
        expect(title === enTitles[code], `${locale}:${code} title equals English`).toBe(false);
      }
    }
  });

  it('GENERIC_ERROR_MESSAGE is complete for every locale with CJK in ja', () => {
    expect(Object.keys(GENERIC_ERROR_MESSAGE).sort()).toEqual([...LOCALES].sort());
    for (const locale of LOCALES) {
      expect(GENERIC_ERROR_MESSAGE[locale].trim().length).toBeGreaterThan(0);
    }
    expect(CJK.test(GENERIC_ERROR_MESSAGE.ja)).toBe(true);
  });

  it('every locale catalog is a distinct object (no shared reference aliases)', () => {
    const seen = new Set<object>();
    for (const locale of LOCALES) {
      const catalog = ERROR_MESSAGES[locale];
      expect(seen.has(catalog), locale).toBe(false);
      seen.add(catalog);
    }
  });
});

describe('errorCodeMessage — degradation matrix', () => {
  it('resolves a registered code per locale, and from en when no locale is given', () => {
    const code: ErrorCode = 'auth.required';
    expect(errorCodeMessage(code)).toBe(en[code]!);
    for (const locale of TRANSLATED_LOCALES) {
      expect(errorCodeMessage(code, locale)).toBe((ERROR_MESSAGES[locale] as unknown as Flat)[code]);
    }
  });

  it('an unknown code falls through to the caller fallback (server debug text)', () => {
    expect(errorCodeMessage('no.such.code', 'es', 'The server said no.')).toBe('The server said no.');
    expect(errorCodeMessage('no.such.code', null, 'The server said no.')).toBe('The server said no.');
  });

  it('blank/whitespace fallback behaves as absent and lands on the generic label', () => {
    expect(errorCodeMessage('no.such.code', 'fr', '   ')).toBe(GENERIC_ERROR_MESSAGE.fr);
    expect(errorCodeMessage('no.such.code', 'ja')).toBe(GENERIC_ERROR_MESSAGE.ja);
  });

  it('empty / null / undefined / non-string codes degrade through the chain without throwing', () => {
    expect(errorCodeMessage('', 'es', 'keep me')).toBe('keep me');
    expect(errorCodeMessage(null, 'es', 'keep me')).toBe('keep me');
    expect(errorCodeMessage(undefined, 'es', 'keep me')).toBe('keep me');
    // Untrusted runtime values (JS consumers) must parse-degrade, never crash.
    expect(() => errorCodeMessage(42 as unknown as string, 'de', null)).not.toThrow();
    expect(errorCodeMessage(42 as unknown as string, 'de', null)).toBe(GENERIC_ERROR_MESSAGE.de);
    expect(errorCodeMessage({} as unknown as string, 'de')).toBe(GENERIC_ERROR_MESSAGE.de);
  });

  it('an invalid runtime locale tag degrades to en, keeping the code message', () => {
    const code: ErrorCode = 'quota.exceeded';
    expect(errorCodeMessage(code, 'xx' as unknown as PhlixErrorLocale)).toBe(en[code]!);
    expect(errorCodeMessage('no.such.code', 'xx' as unknown as PhlixErrorLocale, null)).toBe(
      GENERIC_ERROR_MESSAGE.en,
    );
  });

  it('a registered code ALWAYS beats a provided fallback (code-first doctrine)', () => {
    const code: ErrorCode = 'rate_limited';
    expect(errorCodeMessage(code, 'en', 'STALE SERVER TEXT')).toBe(en[code]!);
    expect(errorCodeMessage(code, 'pt_BR', 'STALE SERVER TEXT')).toBe(
      (ERROR_MESSAGES.pt_BR as unknown as Flat)[code],
    );
  });

  it('every registered code resolves locale-first in all seven locales (full sweep)', () => {
    for (const code of ERROR_CODES) {
      for (const locale of LOCALES) {
        const message = errorCodeMessage(code, locale, 'IGNORED');
        expect(message, `${locale}:${code}`).toBe((ERROR_MESSAGES[locale] as unknown as Flat)[code]!);
      }
    }
  });
});

describe('errorCodeTitle', () => {
  it('returns the localized headline for the Browse codes', () => {
    expect(errorCodeTitle('server.offline')).toBe('Server offline');
    expect(errorCodeTitle('server.offline', 'es')).toBe(ERROR_TITLES.es['server.offline']);
    expect(errorCodeTitle('server.no_tunnel', 'ja')).toBe(ERROR_TITLES.ja['server.no_tunnel']);
  });

  it('returns null for registered codes without a title, and for any junk', () => {
    expect(errorCodeTitle('auth.required')).toBeNull();
    expect(errorCodeTitle('not.a.code')).toBeNull();
    expect(errorCodeTitle(null)).toBeNull();
    expect(errorCodeTitle(undefined)).toBeNull();
    expect(errorCodeTitle('')).toBeNull();
    expect(errorCodeTitle(7 as unknown as string)).toBeNull();
  });
});

describe('isRegisteredErrorCode', () => {
  it('accepts every registry code verbatim', () => {
    for (const code of ERROR_CODES) expect(isRegisteredErrorCode(code), code).toBe(true);
  });

  it('rejects near-misses and non-strings', () => {
    for (const junk of ['', ' AUTH.REQUIRED ', 'auth.required ', 'auth.require', 'nope', 42, null, undefined, {}]) {
      expect(isRegisteredErrorCode(junk)).toBe(false);
    }
  });
});
