/**
 * PhlixAppConfig README completeness guard (review ui__docmaint M-UI-08).
 *
 * The README's `Configuration — PhlixAppConfig` table presents itself as the field
 * reference for `createPhlixApp`. It shipped for weeks claiming completeness while
 * omitting 11 of the 23 real fields — including the wsUrl/wsPath socket seams —
 * because nothing mechanically compared the table against the interface.
 *
 * This test IS that comparison: every field declared in `src/app/types.ts`
 * (`export interface PhlixAppConfig`) must have a table row in `README.md`, and
 * the table must not name fields that no longer exist. The README is prose; the
 * interface is the contract. If they drift, this reddens — here, not on a host
 * integrator's screen.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const README = readFileSync(resolve(__dirname, '../../README.md'), 'utf8');
const TYPES = readFileSync(resolve(__dirname, './types.ts'), 'utf8');

/** Field names of `export interface PhlixAppConfig` (optionality stripped). */
function interfaceFields(): string[] {
  const start = TYPES.indexOf('export interface PhlixAppConfig');
  if (start < 0) {
    throw new Error('PhlixAppConfig interface vanished from src/app/types.ts');
  }
  const open = TYPES.indexOf('{', start);
  let depth = 0;
  let end = -1;
  for (let j = open; j < TYPES.length; j += 1) {
    if (TYPES[j] === '{') depth += 1;
    else if (TYPES[j] === '}') {
      depth -= 1;
      if (depth === 0) {
        end = j;
        break;
      }
    }
  }
  const body = TYPES.slice(open + 1, end);
  const fields: string[] = [];
  for (const line of body.split('\n')) {
    const m = line.match(/^\s{2,}(\w+)\??\s*:/);
    if (m) fields.push(m[1]);
  }
  return fields;
}

/** Field names in the README PhlixAppConfig table (first cell, optionality stripped). */
function readmeTableFields(): string[] {
  const section = README.slice(README.indexOf('## Configuration — `PhlixAppConfig`'));
  if (!section.startsWith('## Configuration')) {
    throw new Error('README lost the "Configuration — PhlixAppConfig" section');
  }
  const tableEnd = section.indexOf('\n```');
  const table = section.slice(0, tableEnd > 0 ? tableEnd : undefined);
  const fields: string[] = [];
  for (const line of table.split('\n')) {
    const m = line.match(/^\|\s*`(\w+)\??`\s*\|/);
    if (m) fields.push(m[1]);
  }
  return fields;
}

describe('PhlixAppConfig README table ↔ interface completeness', () => {
  it('documents every shipped field (M-UI-08)', () => {
    const shipped = interfaceFields();
    const documented = new Set(readmeTableFields());
    const missing = shipped.filter((f) => !documented.has(f));
    expect(missing).toEqual([]);
  });

  it('never cites fields the interface no longer has', () => {
    const shipped = new Set(interfaceFields());
    const documented = readmeTableFields();
    const phantom = documented.filter((f) => !shipped.has(f));
    expect(phantom).toEqual([]);
  });

  it('the guard itself sees all 23 fields (tripwire against parser rot)', () => {
    // If the interface parser silently degrades to an empty list, both
    // comparisons above pass vacuously. Pin the denominator from the interface.
    expect(interfaceFields().length).toBeGreaterThanOrEqual(23);
    expect(readmeTableFields().length).toBeGreaterThanOrEqual(interfaceFields().length);
  });
});
