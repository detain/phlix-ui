/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S534 (AD-9 ui adopt-leg) — DOM-free unit spec for the pure layer focus stack,
 * plus the AC2 grep pins: zero `phlix-tizen-client` imports in ui (the
 * dependency direction is the inverse — the tizen package consumes `@phlix/ui`),
 * and the stack stays pure bookkeeping, never a second spatial-nav engine.
 *
 * "DOM-free" is proven, not asserted-by-vibe: every node used here is a string.
 * The spec touches no `document`, no element, no geometry — the stack is
 * exercised exactly as opaque as its type parameter promises.
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLayerFocusStack, sharedLayerFocusStack } from './layerFocusStack';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '../..');
const srcRoot = join(repoRoot, 'src');

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|vue)$/.test(entry.name) && !entry.name.endsWith('.test.ts')) out.push(p);
  }
  return out;
}

describe('createLayerFocusStack — pure LIFO memory over opaque nodes', () => {
  it('starts empty', () => {
    const s = createLayerFocusStack<string>();
    expect(s.depth()).toBe(0);
    expect(s.pop()).toBeNull();
  });

  it('push/depth: remembers order without touching the nodes', () => {
    const s = createLayerFocusStack<string>();
    s.push('card-row-1');
    s.push('sheet-open-btn');
    s.push('modal-close-btn');
    expect(s.depth()).toBe(3);
  });

  it('pop: LIFO — innermost layer first, exact node identity out', () => {
    const s = createLayerFocusStack<string>();
    const a = 'a';
    const b = 'b';
    s.push(a);
    s.push(b);
    expect(s.pop()).toBe(b);
    expect(s.pop()).toBe(a);
    expect(s.depth()).toBe(0);
  });

  it('pop on empty keeps returning null and never goes negative', () => {
    const s = createLayerFocusStack<string>();
    s.push('x');
    s.pop();
    expect(s.pop()).toBeNull();
    expect(s.depth()).toBe(0);
  });

  it('clear: full teardown from any depth, then reusable', () => {
    const s = createLayerFocusStack<string>();
    s.push('a');
    s.push('b');
    s.clear();
    expect(s.depth()).toBe(0);
    expect(s.pop()).toBeNull();
    s.push('c');
    expect(s.pop()).toBe('c');
  });

  it('accepts null-ish opaque slots without corrupting order (focus keys can be absent)', () => {
    const s = createLayerFocusStack<string | null>();
    s.push(null);
    s.push('inner');
    expect(s.depth()).toBe(2);
    expect(s.pop()).toBe('inner');
    expect(s.pop()).toBeNull();
    expect(s.depth()).toBe(0);
  });

  it('instances are independent; the shared singleton is separate from fresh ones', () => {
    const s = createLayerFocusStack<string>();
    const base = sharedLayerFocusStack.depth();
    s.push('mine');
    expect(sharedLayerFocusStack.depth()).toBe(base);
    sharedLayerFocusStack.push('ours');
    expect(s.depth()).toBe(1);
    expect(sharedLayerFocusStack.depth()).toBe(base + 1);
    sharedLayerFocusStack.pop();
    expect(sharedLayerFocusStack.depth()).toBe(base);
  });
});

describe('S534 AC2 grep pins — no fork, no second engine', () => {
  const files = walk(srcRoot);

  it('the pin actually reads a meaningful corpus (detector is not inert)', () => {
    expect(files.length).toBeGreaterThan(200);
  });

  it('no ui source imports phlix-tizen-client (dependency direction is inverse)', () => {
    const offenders = files.filter((f) =>
      /from\s+['"]phlix-tizen-client|import\(\s*['"]phlix-tizen-client|require\(\s*['"]phlix-tizen-client/.test(
        readFileSync(f, 'utf8'),
      ),
    );
    expect(offenders.map((f) => relative(repoRoot, f))).toEqual([]);
  });

  it('layerFocusStack.ts is pure bookkeeping, not a spatial-nav engine', () => {
    const src = readFileSync(join(srcRoot, 'composables', 'layerFocusStack.ts'), 'utf8');
    // No DOM, no Vue lifecycle, no keys, no geometry — an engine would need all four.
    // Prose ("document-wide", "documented") must not trip the code-shape probes, so
    // the DOM checks look for member access, not the bare word.
    for (const banned of ['document.', 'window.', 'addEventListener', 'keydown', 'getBoundingClientRect', "from 'vue'"]) {
      expect(src, `pure stack must not reference ${banned}`).not.toContain(banned);
    }
  });

  it('the shape matches the tizen source of truth (four ops, same signatures)', () => {
    const src = readFileSync(join(srcRoot, 'composables', 'layerFocusStack.ts'), 'utf8');
    for (const op of ['push(node: T): void', 'pop(): T | null', 'depth(): number', 'clear(): void']) {
      expect(src, `stack interface must keep ${op}`).toContain(op);
    }
  });
});
