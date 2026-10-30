/**
 * German politeness-register guard (review ui__copywriter M-UI-03).
 *
 * The German message catalog (`locales/de.ts`) speaks informal Du — "Melde dich an",
 * "Erstelle dein Konto" — while the separate error-catalog layer (`errors.ts` DE)
 * shipped its entire user-facing half in formal Sie, and the ConfirmDialog default
 * added a third register island. On a German TV the app greeted users with "dein
 * Kino", the confirm dialog addressed them formally, and every error toast reverted
 * to Sie: one product, two voices, in the estate's biggest non-English market.
 *
 * The cure swept every Sie-form to the Du register. THIS test is what keeps the
 * sweep from silently re-polluting: any new German string in either catalog that
 * addresses the reader formally reddens here, not on someone's screen.
 *
 * Scope law: the pattern matches CAPITALIZED polite forms only (German formal
 * address is always capitalized: Sie/Ihr/Ihnen family). Lowercase `sie` ("they"),
 * names, and compounds are never matched.
 */
import { describe, expect, it } from 'vitest';
import { DE_MESSAGES } from './locales/de';
import { ERROR_MESSAGES, ERROR_TITLES, GENERIC_ERROR_MESSAGE } from './errors';

/** Capitalized Sie-family address words (pronoun + possessive declensions). */
const SIE_FORM = /\b(Sie|Ihr|Ihre|Ihren|Ihrem|Ihres|Ihnen)\b/;

/** Walk every string in a nested catalog shape; report dotted paths of offenders. */
function sieFormPaths(node: unknown, prefix = ''): string[] {
  if (typeof node === 'string') {
    return SIE_FORM.test(node) ? [prefix] : [];
  }
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => sieFormPaths(v, `${prefix}${prefix ? '.' : ''}${k}`));
  }
  return [];
}

describe('German catalogs speak one register (Du) end to end', () => {
  it('the DE message catalog (locales/de.ts) carries zero formal Sie-address', () => {
    expect(sieFormPaths(DE_MESSAGES)).toEqual([]);
  });

  it('the DE error catalog (errors.ts) carries zero formal Sie-address', () => {
    expect(sieFormPaths(ERROR_MESSAGES.de)).toEqual([]);
  });

  it('the DE error TITLES and the DE generic fallback carry zero formal Sie-address', () => {
    expect(sieFormPaths(ERROR_TITLES.de ?? {})).toEqual([]);
    expect(sieFormPaths(GENERIC_ERROR_MESSAGE.de)).toEqual([]);
  });

  it('the guard itself bites (hostile fixture, never shipped)', () => {
    // If the walker ever silently visits nothing, the three pins above pass
    // vacuously. This fixture proves the scanner reaches string leaves.
    expect(sieFormPaths({ a: 'Melde dich an.', b: { c: 'Versuchen Sie es erneut.' } })).toEqual(['b.c']);
  });
});
