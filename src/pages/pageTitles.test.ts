/**
 * copywriter m6 tripwire: the catalog's own sentence-case law (messages.ts header:
 * "Titles and headings are not exempt") was unenforced across surfaces — ten page
 * h1s and two catalog titles shipped Title Case ('Manage Shares', 'Music Library').
 * This scans every static page h1 plus the cited catalog pair, so a future
 * 'Settings Page' heading reddens CI instead of drifting the nav typography again.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_MESSAGES } from '../i18n/messages';

const PAGES = dirname(fileURLToPath(import.meta.url));

/** Sentence case: across the title, capitals are allowed only at position 0
 *  (leading word) or inside an all-uppercase short token (initialism: MCP, URL).
 *  A mid-title capital letter — 'Manage Shares' — is a violation. The check is
 *  per title, not per token, so a second capitalized word cannot slip through. */
function isSentenceCase(text: string): boolean {
  const tokens = text.split(/\s+/);
  for (let i = 0; i < tokens.length; i++) {
    const letters = tokens[i].replace(/[^\p{L}]/gu, '');
    if (!letters) continue;
    if (/^\p{Lu}{1,4}$/u.test(letters)) continue; // initialism (also the lone-word title 'MCP')
    if (i === 0) {
      if (/^\p{Lu}\p{Ll}*$/u.test(letters)) continue; // 'Watch' — leading capital, rest lowercase
      return false; // 'WATCH' beyond 4 caps, 'iPhone', etc.
    }
    if (/^\p{Ll}+$/u.test(letters)) continue; // non-leading token fully lowercase
    return false; // 'Shares', 'With', 'You' mid-title
  }
  return true;
}

// 'For You' is the sanctioned rail brand name (copywriter m9: nav, router meta
// and h1 all agree on it). An exception list, not a silent hole in the law.
const SENTENCE_CASE_EXCEPTIONS = new Set(['For You']);

describe('page titles (copywriter m6 — sentence-case law, enforced)', () => {
  it('every static page h1 is sentence case', () => {
    const offenders: string[] = [];
    for (const f of readdirSync(PAGES).filter((n) => n.endsWith('Page.vue'))) {
      const src = readFileSync(join(PAGES, f), 'utf8');
      for (const m of src.matchAll(/<h1[^>]*>([^<>{}]+)<\/h1>/g)) {
        const t = m[1].trim();
        if (!isSentenceCase(t) && !SENTENCE_CASE_EXCEPTIONS.has(t)) offenders.push(`${f}: '${t}'`);
      }
    }
    expect(offenders, 'Title-Case h1s: ' + offenders.join(', ')).toEqual([]);
  });

  it('the predicate itself has teeth (mid-title capitals fail; initialisms pass)', () => {
    expect(isSentenceCase('Manage Shares')).toBe(false);
    expect(isSentenceCase('MCP Tokens')).toBe(false);
    expect(isSentenceCase('Shared With Me')).toBe(false);
    expect(isSentenceCase('Music Library')).toBe(false);
    expect(isSentenceCase('Manage shares')).toBe(true);
    expect(isSentenceCase('MCP tokens')).toBe(true);
    expect(isSentenceCase('Shared with me')).toBe(true);
    expect(isSentenceCase('Federation')).toBe(true);
    expect(isSentenceCase('Watch history')).toBe(true);
  });

  it('the formerly-Title-Case page surfaces landed sentence-cased', () => {
    // Verbatim pins: these exact strings must still render (only case moved).
    const cases: Array<[string, string]> = [
      ['ManageSharesPage.vue', 'Manage shares'],
      ['FederationSharesPage.vue', 'Federation library shares'],
      ['InviteLinksPage.vue', 'Invite links'],
      ['RequestsPage.vue', 'Media requests'],
      ['SharedWithMePage.vue', 'Shared with me'],
      ['MyServersPage.vue', 'My servers'],
      ['McpTokensPage.vue', 'MCP tokens'],
      ['SecuritySettingsPage.vue', 'Passkey settings'],
      ['LibraryScanPage.vue', 'Library scanner'],
      ['AuditLogsPage.vue', 'Audit logs'],
      // ParentalControlsPage.vue dropped from this static list: its h1 now
      // renders t('parental.title') (M13 option A), so the file no longer
      // contains the literal. The law is still enforced twice over: the
      // catalog value is pinned sentence-case below, and the suite mounts
      // the page and asserts the rendered h1.
    ];
    for (const [f, want] of cases) {
      expect(readFileSync(join(PAGES, f), 'utf8'), f).toContain(`>${want}</h1>`);
    }
  });

  it('the recommendations h1 matches the nav rail name (copywriter m9: one surface, one name)', () => {
    expect(readFileSync(join(PAGES, 'RecommendationsPage.vue'), 'utf8')).toContain('>For You</h1>');
  });

  it('the cited catalog titles are sentence case', () => {
    expect(DEFAULT_MESSAGES.music.title).toBe('Music library');
    expect(DEFAULT_MESSAGES.parental.title).toBe('Parental controls');
  });
});
