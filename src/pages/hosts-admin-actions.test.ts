/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluralize } from '../utils/plural';

/**
 * S324 — host enumeration guard.
 *
 * S15 wired `edit-metadata` / `explore-data` on four hosts but its AC said
 * "every MediaCard host"; the narrower In-scope list is what got built and
 * reviewed, and SearchPage (a MediaGrid host) was left unwired — an admin's two
 * ⋯-menu actions were dead on /app/search. This test re-derives the host
 * inventory at run time (NEVER a hand-written list — that is exactly the S15
 * mistake) and fails if ANY page hosting an emit-capable media component omits
 * the two admin-action listeners or the two modals.
 *
 * S345 lesson 3: the examined set is PRINTED (the denominator) and asserted
 * non-empty, so a scan that matches nothing fails instead of passing vacuously.
 */

/**
 * Emit-capable media components (S15's ⋯-menu surface): every component that
 * forwards `edit-metadata` / `explore-data` to its host (MediaDetail emits them
 * directly). A new forwarder added here is immediately required to be wired on
 * every host that renders it.
 */
const EMIT_COMPONENTS = [
  'MediaGrid',
  'MediaRow',
  'MediaListRow',
  'MediaTableRow',
  'MediaBackdropRow',
  'HomeRow',
  'SeriesDetail',
  'MediaDetail',
];

/**
 * Named exemptions with a reason. Empty today — every host in `src/pages/`
 * wires the actions and mounts both modals. Keep it empty: a host that renders
 * an emit-capable component must either be wired or be justified HERE by name,
 * so a new unwired host fails the scan instead of silently joining a list.
 */
const EXEMPT: Record<string, string> = {};

/** All `*.vue` files under a directory, recursively. */
function listVueFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listVueFiles(full));
    else if (entry.name.endsWith('.vue')) out.push(full);
  }
  return out;
}

describe('S324 — every MediaCard host wires the admin ⋯-menu actions (host enumeration)', () => {
  it('wires @edit-metadata + @explore-data and mounts both modals on EVERY host page', () => {
    const pagesDir = dirname(fileURLToPath(import.meta.url));
    const files = listVueFiles(pagesDir).sort();
    const hosts: string[] = [];
    const unwired: string[] = [];

    for (const file of files) {
      const src = readFileSync(file, 'utf8');
      const hosted = EMIT_COMPONENTS.filter((c) => new RegExp(`<${c}(\\s|>)`).test(src));
      if (hosted.length === 0) continue;

      const rel = file.slice(pagesDir.length + 1);
      const reason = EXEMPT[rel];
      const wired =
        src.includes('@edit-metadata') &&
        src.includes('@explore-data') &&
        src.includes('MetadataMatchModal') &&
        src.includes('ItemDataInspector');

      if (reason !== undefined) {
        hosts.push(`${rel} — EXEMPT (${reason})`);
      } else if (wired) {
        hosts.push(`${rel} — WIRED (${hosted.join(', ')})`);
      } else {
        const missing = [
          !src.includes('@edit-metadata') ? '@edit-metadata' : '',
          !src.includes('@explore-data') ? '@explore-data' : '',
          !src.includes('MetadataMatchModal') ? 'MetadataMatchModal' : '',
          !src.includes('ItemDataInspector') ? 'ItemDataInspector' : '',
        ].filter(Boolean);
        unwired.push(`${rel} — missing ${missing.join(', ')} (renders: ${hosted.join(', ')})`);
      }
    }

    // Print the denominator (S345 lesson 3): the exact host set examined, so a
    // scan that matches NOTHING cannot silently pass.
    console.log(
      `S324 host enumeration: ${hosts.length} ${pluralize(hosts.length, 'host page', 'host pages')} examined:\n  ${hosts.join('\n  ')}`,
    );

    expect(hosts.length).toBeGreaterThan(0);
    expect(unwired).toEqual([]);
  });
});