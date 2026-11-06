/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/**
 * CU-101 (review ui__secaudit #1) — the NOOPENER CENSUS gate.
 *
 * `window.open(url, '_blank')` without the `'noopener'` windowFeatures
 * argument hands the opened page a live `window.opener` handle back to the
 * SPA tab — reverse tabnabbing: a hostile (or merely compromised)
 * destination can navigate the origin tab to a phishing URL. Every sink in
 * this package opens server wire data through `safeHref`, which admits ANY
 * external http(s) origin, so the features argument is not decoration.
 *
 * BookDetailPage's download button was the one site that dropped it while
 * the other five carried it. Mount-level DOM assertions cannot see the
 * feature string at all (jsdom never performs the navigation), so — in the
 * house of `escape-html-quotes.test.ts` and the S241 scanner — the law is
 * pinned where it lives: this gate reads the COMMITTED source of every
 * `window.open(` call under `src/` and requires each one to pass a third
 * argument containing `noopener`.
 *
 * Anti-vacuity (the S241 posture): the corpus is enumerated from disk with
 * an exact per-file census — a NEW call site reddens the set-equality pin
 * until its own safety is reviewed, a site vanishing reddens it the same
 * way — and any call whose form this scanner cannot fully parse (multi-line,
 * nested parens) lands in the malformed list, which must stay EMPTY. A
 * pattern the gate cannot read is a failure, never a free pass.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, '..');

/** Every `.vue`/`.ts` source file under `src/` (test files excluded). */
function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      sourceFiles(full, out);
    } else if (/\.(vue|ts)$/.test(entry) && !entry.endsWith('.test.ts')) {
      out.push(full);
    }
  }
  return out;
}

interface OpenSite {
  readonly file: string;
  readonly line: number;
  /** The full argument list text, e.g. `safe, '_blank', 'noopener'`. */
  readonly args: string;
}

/** The shipped truth (2026-11-07): six sites, relative-path keyed. */
const EXPECTED_CENSUS: Record<string, number> = {
  'components/MediaCard.vue': 1,
  'components/MediaDetail.vue': 2,
  'pages/BookDetailPage.vue': 1,
  'pages/SharedWithMePage.vue': 1,
  'pages/MyServersPage.vue': 1,
};

const CALL = /window\.open\(([^()]*)\)/;

const sites: OpenSite[] = [];
const malformed: string[] = [];
const census: Record<string, number> = {};

for (const file of sourceFiles(SRC)) {
  const rel = file.slice(SRC.length + 1);
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((text, index) => {
    if (!text.includes('window.open(')) return;
    const match = text.match(CALL);
    if (match == null) {
      malformed.push(`${rel}:${index + 1} — ${text.trim()}`);
      return;
    }
    sites.push({ file: rel, line: index + 1, args: match[1] });
    census[rel] = (census[rel] ?? 0) + 1;
  });
}

describe('window.open noopener census (CU-101)', () => {
  it('finds the six known window.open sinks on disk', () => {
    expect(sites.length).toBe(6);
  });

  it('the corpus is exactly the reviewed file census', () => {
    // SET EQUALITY: an unreviewed new sink (or a vanished reviewed one)
    // reddens here with the diff printed, like the route-gate enumeration.
    expect(census).toEqual(EXPECTED_CENSUS);
  });

  it('every matched call is fully parseable (no multi-line/nested forms)', () => {
    expect(malformed).toEqual([]);
  });

  for (const site of sites) {
    it(`passes a 'noopener' features argument at ${site.file}:${site.line}`, () => {
      const parts = site.args.split(',').map((p) => p.trim());
      const features = parts[2];
      expect(features, `${site.file}:${site.line} — window.open must pass a third ` +
        `'noopener' windowFeatures argument (reverse-tabnabbing guard; CU-101)`).toBeDefined();
      expect(features).toContain('noopener');
    });
  }
});
