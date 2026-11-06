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
 * UI-m19 (review ui__secaudit) — the ESCAPE-COMPLETENESS gate.
 *
 * A local `escapeHtml` helper that forgets a quote family looks identical to
 * a complete one for as long as every call site stays in TEXT position — the
 * defect only wakes when someone interpolates its output into a (single-)
 * quoted HTML attribute. Mount-level DOM assertions cannot see the difference
 * at all (entity serialization decodes back to the character), so the law is
 * pinned where it lives: this gate reads the COMMITTED source of every
 * `function escapeHtml` under `src/` and requires the full five-entity set
 * (`&amp; &lt; &gt; &quot; &#39;`). Copy the helper anywhere without them and
 * CI goes red before any reviewer has to notice.
 *
 * Anti-vacuity (the S241 posture): the corpus is enumerated from disk and a
 * minimum size is asserted — an empty match is a FAILURE, not a free pass —
 * and each check runs against the extracted function BODY, not the whole
 * file, so an unrelated `'&#39;'` literal elsewhere cannot satisfy it.
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

/** An `escapeHtml` definition's body: first line-anchored `}` ends it. */
const HELPER = /function escapeHtml\b[^{]*\{([\s\S]*?)\n\}/;
const ENTITIES = ['&amp;', '&lt;', '&gt;', '&quot;', '&#39;'];

describe('escapeHtml quote completeness (UI-m19)', () => {
  const helpers = sourceFiles(SRC)
    .map((file) => ({ file, match: readFileSync(file, 'utf8').match(HELPER) }))
    .filter((hit) => hit.match != null);

  it('finds the known escapeHtml helpers on disk', () => {
    expect(helpers.length).toBeGreaterThanOrEqual(2);
  });

  for (const hit of helpers) {
    it(`escapes all five entities in ${hit.file.slice(SRC.length + 1)}`, () => {
      for (const entity of ENTITIES) {
        expect(hit.match?.[1]).toContain(entity);
      }
    });
  }

  /**
   * CU-102 (ui__secaudit #2) — LAW 2: the same completeness extends to every
   * HTML BUILDER, not just functions named escapeHtml. Any top-level
   * `function` whose body writes `<span class=` markup feeds a v-html sink;
   * each must either perform the full five-entity escaping itself or hand
   * every fragment to the file's complete escapeHtml. The trigger was
   * LogsPage's highlightJson: it pre-escaped only `< > &` and interpolated
   * the captured key/value as-is — a quote-forgotten path that sat right
   * under UI-m19's nose because the gate only looked at helpers named
   * escapeHtml.
   */
  const BUILDER = /function (\w+)\b[^{]*\{([\s\S]*?)\n\}/g;
  const builders: { file: string; name: string; body: string }[] = [];
  for (const file of sourceFiles(SRC)) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(BUILDER)) {
      if (m[2].includes('<span class=')) {
        builders.push({ file: file.slice(SRC.length + 1), name: m[1], body: m[2] });
      }
    }
  }

  it('finds the HTML-builder functions on disk (anti-vacuous)', () => {
    expect(builders.length).toBeGreaterThanOrEqual(1);
  });

  for (const b of builders) {
    it(`builder ${b.name} (${b.file}) escapes completely`, () => {
      const ownAllFive = ENTITIES.every((entity) => b.body.includes(entity));
      // Handing off to a helper counts ONLY if the call exists; helper
      // completeness is the per-file law asserted above (same-file helpers
      // named escapeHtml are already required to be complete — an INCOMPLETE
      // helper would fail Law 1's own case for this file).
      const delegates = b.body.includes('escapeHtml(');
      expect(
        ownAllFive || delegates,
        `${b.file}:${b.name} writes <span class=… markup but neither escapes all five entities itself nor calls escapeHtml`,
      ).toBe(true);
    });
  }
});
