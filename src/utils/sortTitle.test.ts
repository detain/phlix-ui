import { describe, it, expect } from 'vitest';
import { stripLeadingArticle, compareByStrippedTitle, SORT_TITLE_ARTICLES } from './sortTitle';

describe('stripLeadingArticle', () => {
  // Kept byte-for-byte in step with the server's SortTitle::from() parity table.
  it.each<[string, string]>([
    // English articles.
    ['The Plot', 'Plot'],
    ['the matrix', 'matrix'],
    ['THE THING', 'THING'],
    ['A Quiet Place', 'Quiet Place'],
    ['An American Tail', 'American Tail'],
    // Words that merely START with an article's letters.
    ['Theory', 'Theory'],
    ['Theodore', 'Theodore'],
    ['Antman', 'Antman'],
    ['Andes', 'Andes'],
    ['A.I.', 'A.I.'],
    ['Death Race', 'Death Race'],
    // Romance + German articles.
    ['El Camino', 'Camino'],
    ['La La Land', 'La Land'], // only the first article goes
    ['Le Mans', 'Mans'],
    ['Los Angeles', 'Angeles'],
    ['Las Vegas', 'Vegas'],
    ['Die Hard', 'Hard'],
    ['Der Untergang', 'Untergang'],
    ['Das Boot', 'Boot'],
    // Whitespace + degenerate inputs.
    ['The  Double', 'Double'],
    ['  The Spaced', 'The Spaced'], // leading space → not an article prefix
    ['The', 'The'],
    ['The ', ''],
    ['A', 'A'],
    ['', ''],
    // Accent-sensitive: "Thé " is NOT the article "the ".
    ['Thé Café', 'Thé Café'],
  ])('strips %j → %j', (input, expected) => {
    expect(stripLeadingArticle(input)).toBe(expected);
  });

  it('exposes the same article set as the server', () => {
    expect(SORT_TITLE_ARTICLES).toEqual([
      'the', 'a', 'an', 'el', 'la', 'le', 'les', 'los', 'las', 'die', 'der', 'das',
    ]);
  });
});

describe('compareByStrippedTitle', () => {
  it('orders by the stripped key (so "The Plot" follows "Plan", precedes "Quest")', () => {
    const sorted = ['The Plot', 'Quest', 'Plan'].sort(compareByStrippedTitle);
    expect(sorted).toEqual(['Plan', 'The Plot', 'Quest']);
  });

  it('is case-insensitive', () => {
    expect(compareByStrippedTitle('the matrix', 'Matrix')).toBe(0);
  });
});
