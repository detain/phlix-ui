/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Read the shipped token CSS as a string. (`?raw` is swallowed by the CSS plugin
// under vitest, so read the co-located file directly.)
const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'index.css'), 'utf8');

/**
 * R6.5a — lock the GLOBAL reduced-motion kill-switch.
 *
 * `html[data-reduced-motion='true'] *` (set by useTheme when the effective motion
 * preference is reduced — OS `prefers-reduced-motion` via the store's 'auto' default,
 * or an explicit 'on') is the load-bearing guard the WHOLE library leans on: it
 * neutralizes every CSS `animation`/`transition` and programmatic smooth-scroll with
 * `!important`, so per-component `@media (prefers-reduced-motion)` blocks are only
 * belt-and-suspenders. If this rule is ever removed or weakened the entire
 * reduced-motion path silently regresses, yet every other unit test would still pass.
 * This test reads the shipped token CSS and fails on that regression.
 */
const flat = css.replace(/\s+/g, ' ');

describe('reduced-motion global kill-switch (tokens/index.css)', () => {
  it('targets every element + pseudo-element under html[data-reduced-motion="true"]', () => {
    expect(flat).toContain("html[data-reduced-motion='true'] *");
    expect(flat).toContain("html[data-reduced-motion='true'] *::before");
    expect(flat).toContain("html[data-reduced-motion='true'] *::after");
  });

  it('neutralizes animation, transition and smooth-scroll with !important', () => {
    // isolate the rule body so a stray duration elsewhere can't satisfy these
    const start = css.indexOf("html[data-reduced-motion='true']");
    expect(start).toBeGreaterThanOrEqual(0);
    const body = css.slice(start, css.indexOf('}', start) + 1).replace(/\s+/g, ' ');

    expect(body).toMatch(/animation-duration:\s*0\.001ms\s*!important/);
    expect(body).toMatch(/animation-iteration-count:\s*1\s*!important/);
    expect(body).toMatch(/transition-duration:\s*0\.001ms\s*!important/);
    expect(body).toMatch(/scroll-behavior:\s*auto\s*!important/);
  });
});
