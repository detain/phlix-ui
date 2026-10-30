/**
 * One-word law for the saved-items feature (review ui__copywriter M-UI-02).
 *
 * The same action shipped as three names: the rail heading said "My List",
 * the card/detail button said "Watchlist", its filled state said "In
 * favorites", and the toast said "added to your favorites". Every catalog
 * now names the feature with ONE noun family (list/Liste/lista/リスト),
 * and no user-visible value in the item-action or season groups keeps the
 * old "favorites" word — this test is what keeps that true.
 *
 * Scope: catalog VALUES (the user-visible layer). Key names and the
 * `watchlist` component-event name intentionally keep their old identifiers
 * — they are code surface, not copy (back-compat law for slot users).
 */
import { describe, expect, it } from 'vitest';
import { DEFAULT_MESSAGES } from './messages';
import { DE_MESSAGES } from './locales/de';
import { ES_MESSAGES } from './locales/es';
import { FR_MESSAGES } from './locales/fr';
import { IT_MESSAGES } from './locales/it';
import { JA_MESSAGES } from './locales/ja';
import { PT_BR_MESSAGES } from './locales/pt_BR';

type Group = Record<string, string>;

/** The one permitted noun family (lowercase substring) per locale. */
const LIST_FAMILY: Record<string, string> = {
  en: 'list',
  de: 'liste',
  es: 'lista',
  fr: 'liste',
  it: 'lista',
  ja: 'リスト',
  pt_BR: 'lista',
};

/** Words that used to name the feature — banned from the values of these groups.
 * ('ウォッチリスト' sneaks past the JA family check — it contains 'リスト' — so the
 * old word itself must be banned token-wise; teeth-proven at authoring.) */
const OLD_WORDS = ['favorit', 'preferit', 'favorite', 'watchlist', 'ウォッチ', 'お気に入り', 'da vedere'];

type Groups = { itemActions: Group; season: Group };

const CATALOGS: Record<string, Groups> = {
  en: DEFAULT_MESSAGES as unknown as Groups,
  de: DE_MESSAGES as unknown as Groups,
  es: ES_MESSAGES as unknown as Groups,
  fr: FR_MESSAGES as unknown as Groups,
  it: IT_MESSAGES as unknown as Groups,
  ja: JA_MESSAGES as unknown as Groups,
  pt_BR: PT_BR_MESSAGES as unknown as Groups,
};


describe('M-UI-02 one-word law: the saved-items feature is the LIST family everywhere', () => {
  for (const [locale, catalog] of Object.entries(CATALOGS)) {
    const family = LIST_FAMILY[locale]!;

    it(`${locale}: every item-action label carries the single list noun`, () => {
      for (const group of ['itemActions', 'season'] as const) {
        for (const key of ['watchlist', 'inFavorites', 'addFavorite', 'removeFavorite'] as const) {
          const value = catalog[group][key]!;
          expect(value.toLowerCase(), `${group}.${key} = ${value}`).toContain(family);
        }
      }
    });

    it(`${locale}: no item-action or season value resurrects the old favorites word`, () => {
      for (const group of ['itemActions', 'season'] as const) {
        for (const [key, value] of Object.entries(catalog[group])) {
          for (const old of OLD_WORDS) {
            expect(value.toLowerCase(), `${group}.${key} = ${value}`).not.toContain(old);
          }
        }
      }
    });
  }

  it('the delivery toasts interpolate the item name in every catalog', () => {
    for (const [locale, catalog] of Object.entries(CATALOGS)) {
      expect(catalog.itemActions['addedToList'], locale).toContain('{name}');
      expect(catalog.itemActions['removedFromList'], locale).toContain('{name}');
    }
  });
});
