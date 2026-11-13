/**
 * CU-093 (review ui__enduser #3): app chrome that shipped as hand-coded
 * English on a seven-locale product. These source pins keep the cured
 * surfaces catalog-bound — a re-literalised rail is invisible to the default
 * locale and therefore invisible to casual eyeballs; only the source gate
 * catches it.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_MESSAGES } from './messages';

const here = dirname(fileURLToPath(import.meta.url));
const gridSrc = readFileSync(join(here, '../components/MediaGrid.vue'), 'utf8');
const browseSrc = readFileSync(join(here, '../pages/BrowsePage.vue'), 'utf8');

describe('CU-093 — rails and grid empty state ride the catalog', () => {
  it('MediaGrid renders its empty state from catalog keys', () => {
    expect(gridSrc).toContain("t('library.noMediaTitle')");
    expect(gridSrc).toContain("t('library.noMediaHint')");
    expect(gridSrc).not.toContain('>No media found<');
    expect(gridSrc).not.toContain('>Try adjusting your filters.<');
  });

  it('BrowsePage rails and its first-run empty state come from the browse group', () => {
    for (const key of ['continueWatching', 'nextUp', 'recommended', 'mostWatched']) {
      expect(browseSrc, `rail title ${key}`).toContain(`t('browse.${key}')`);
    }
    expect(browseSrc).toContain("t('browse.noLibrariesTitle')");
    expect(browseSrc).toContain("t('browse.noLibrariesDescription')");
    for (const literal of ['title="Continue watching"', 'title="Next up"', 'title="Recommended"', 'title="Most watched"', 'title="No libraries yet"']) {
      expect(browseSrc, `re-literalised: ${literal}`).not.toContain(literal);
    }
  });

  it('the catalog copy equals the strings the surfaces used to hardcode', () => {
    // Translation anchors: the cure must not silently RE-word the rails.
    const b = DEFAULT_MESSAGES.browse;
    const en = {
      continueWatching: 'Continue watching',
      nextUp: 'Next up',
      recommended: 'Recommended',
      mostWatched: 'Most watched',
      noLibrariesTitle: 'No libraries yet',
      noLibrariesDescription: 'Once a library is added it shows up here as its own section.',
    } as const;
    expect(b).toMatchObject(en);
    expect(DEFAULT_MESSAGES.library.noMediaTitle).toBe('No media found');
    expect(DEFAULT_MESSAGES.library.noMediaHint).toBe('Try adjusting your filters.');
    expect(DEFAULT_MESSAGES.auth.passwordRecoveryHint).toBe(
      'Locked out? Ask your server admin to reset your password.',
    );
  });
});
