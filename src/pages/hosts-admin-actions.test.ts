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
 * the admin-action listeners (`@edit-metadata`, `@explore-data`, and `@refresh`
 * — the ⋯-menu "Match metadata" item's emit, also dead on unwired SearchPage
 * until S324 wired it) or the two modals.
 *
 * S345 lesson 3: the examined set is PRINTED (the denominator) and asserted
 * non-empty, so a scan that matches nothing fails instead of passing vacuously.
 *
 * The scan is TEMPLATE-scoped (see {@link templateOf}): a host "wires" an action
 * by writing the listener on a component tag and "mounts" a modal by writing its
 * tag — an import alone satisfies neither, so both checks are template-tag checks.
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

/**
 * The SFC's root `<template>` block with HTML comments stripped.
 *
 * The scan is deliberately TEMPLATE-scoped: a host "wires" an action only by
 * writing the listener on a component tag in its template, and "mounts" a modal
 * only by writing its tag there — an `import` alone satisfies neither. Scanning
 * only the template also keeps script-side false positives out (a
 * `PropType<HomeRow>` type annotation can never read as a host tag) and makes
 * the mount checks meaningful (marker PRESENCE in the file cannot pass for a
 * template MOUNT).
 *
 * The root block runs from the first BARE `<template>` to the LAST
 * `</template>` — inner `<template #slot>` blocks sit inside the root, so a
 * non-greedy first-`</template>` match would truncate at a slot's closing tag
 * and miss every component rendered after it (measured: SearchPage's
 * `#actions` slot made `<MediaGrid` invisible to the old regex).
 */
function templateOf(src: string): string {
  const start = src.indexOf('<template>');
  const end = src.lastIndexOf('</template>');
  if (start === -1 || end === -1 || end <= start) return '';
  return src
    .slice(start + '<template>'.length, end)
    .replace(/<!--[\s\S]*?-->/g, '');
}

/** True when `tpl` renders `<Name …/>` / `<Name …>` as a component tag. */
function rendersTag(tpl: string, name: string): boolean {
  return new RegExp(`<${name}(?:\\s|/?>)`).test(tpl);
}

describe('S324 — every MediaCard host wires the admin ⋯-menu actions (host enumeration)', () => {
  it('wires the admin ⋯-menu actions (edit-metadata / explore-data / refresh) and mounts both modals on EVERY host page', () => {
    const pagesDir = dirname(fileURLToPath(import.meta.url));
    const files = listVueFiles(pagesDir).sort();
    const hosts: string[] = [];
    const unwired: string[] = [];

    for (const file of files) {
      const src = readFileSync(file, 'utf8');
      const tpl = templateOf(src);
      const hosted = EMIT_COMPONENTS.filter((c) => rendersTag(tpl, c));
      if (hosted.length === 0) continue;

      const rel = file.slice(pagesDir.length + 1);
      const reason = EXEMPT[rel];
      // `@refresh` is the ⋯-menu "Match metadata" item's emit (MediaCard routes
      // MENU_LABELS.matchMetadata to `refresh`, distinct from the quick-action
      // button's `match`) — a host that wires the two named AC actions but not
      // `@refresh` still ships a dead admin menu item (the S324 bug class).
      const wired =
        /@edit-metadata/.test(tpl) &&
        /@explore-data/.test(tpl) &&
        /@refresh/.test(tpl) &&
        rendersTag(tpl, 'MetadataMatchModal') &&
        rendersTag(tpl, 'ItemDataInspector');

      if (reason !== undefined) {
        hosts.push(`${rel} — EXEMPT (${reason})`);
      } else if (wired) {
        hosts.push(`${rel} — WIRED (${hosted.join(', ')})`);
      } else {
        const missing = [
          !/@edit-metadata/.test(tpl) ? '@edit-metadata' : '',
          !/@explore-data/.test(tpl) ? '@explore-data' : '',
          !/@refresh/.test(tpl) ? '@refresh' : '',
          !rendersTag(tpl, 'MetadataMatchModal') ? '<MetadataMatchModal>' : '',
          !rendersTag(tpl, 'ItemDataInspector') ? '<ItemDataInspector>' : '',
        ].filter(Boolean);
        unwired.push(`${rel} — missing ${missing.join(', ')} (renders: ${hosted.join(', ')})`);
      }
    }

    // Print the denominator (S345 lesson 3): the exact host set examined, so a
    // scan that matches NOTHING cannot silently pass. Vitest's default reporter
    // hides console output on a passing run, but the anti-vacuous
    // `hosts.length > 0` assertion below is the guard that matters — and on the
    // failing run (the case that needs a human) stdout is shown.
    console.log(
      `S324 host enumeration: ${hosts.length} ${pluralize(hosts.length, 'host page', 'host pages')} examined:\n  ${hosts.join('\n  ')}`,
    );

    expect(hosts.length).toBeGreaterThan(0);
    expect(unwired).toEqual([]);
  });
});
