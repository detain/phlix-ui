/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/**
 * CU-079 (ui__crossfe #4) — the HOVER-GATE law for MediaCard.
 *
 * On D-pad devices (Tizen/webOS, the same class the `@media (hover: none)`
 * touch block already serves) a pointer is never physically over a card, yet
 * browsers keep a SYNTHETIC hover wherever focus last dragged the pointer — so
 * every `.media-card:hover` style latched onto the previously focused card and
 * stayed: lift, glow ring, zoomed poster, revealed overlay, armed actions, all
 * permanently on the WRONG card. The cure splits each shared
 * `:hover, :focus-within` selector pair: the keyboard arm stays ungated, the
 * pointer arm may only apply when the device genuinely has a hover-capable
 * pointer (`@media (hover: hover)`).
 *
 * This gate parses the COMPONENT STYLE (comments stripped, braces tracked so
 * every rule knows its enclosing @media conditions) and requires every rule
 * whose selector mentions `:hover` to either sit inside a `(hover: hover)`
 * media or be a reduced-motion CANCEL rule (transition/transform pinned to
 * `none` — those must stay reachable for every pointer class; gating them
 * would let a latched hover reintroduce motion on reduced-motion D-pad boxes).
 * Mount-level CSS assertions cannot see any of this (jsdom applies no media
 * evaluation), which is exactly why the law is pinned as a source-structure
 * read — the escape-html-quotes gate is the house precedent for this shape.
 */
const HERE = dirname(fileURLToPath(import.meta.url));
const mediaCardCss = (() => {
  const sfc = readFileSync(join(HERE, '../components/MediaCard.vue'), 'utf8');
  const style = sfc.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  if (!style) throw new Error('MediaCard.vue: no <style> block found');
  return style[1].replace(/\/\*[\s\S]*?\*\//g, '');
})();

interface Rule {
  selector: string;
  decls: string;
  /** Conditions of every @media block enclosing the rule, outermost first. */
  media: string[];
}

/**
 * Recursive brace-balanced CSS walk over `text` starting just after an open
 * brace; collects every style rule (with its @media ancestry) and returns the
 * index of the matching close brace. `@media` bodies recurse with the
 * condition pushed; plain-rule bodies are consumed via {@link skipBlock} —
 * nothing inside a declaration block is a card style rule this law governs.
 */
function readRules(text: string, from: number, mediaStack: string[], out: Rule[]): number {
  let i = from;
  let token = '';
  while (i < text.length) {
    const ch = text[i];
    if (ch === '{') {
      const selector = token.trim();
      if (selector.startsWith('@media')) {
        mediaStack.push(selector.slice('@media'.length).trim());
        // The recursion returns the index of the media block's `}` — step
        // PAST it, or this loop misreads the close as the parent's own.
        i = readRules(text, i + 1, mediaStack, out) + 1;
        mediaStack.pop();
      } else {
        const end = skipBlock(text, i);
        if (!selector.startsWith('@')) {
          out.push({ selector, decls: text.slice(i + 1, end), media: [...mediaStack] });
        }
        i = end + 1;
      }
      token = '';
      continue;
    }
    if (ch === '}') return i;
    if (ch === ';') {
      token = '';
      i++;
      continue;
    }
    token += ch;
    i++;
  }
  throw new Error('unbalanced CSS while parsing the MediaCard style block');
}

/** Top-level driver: runs until the sheet's end (a sheet body has no closing
 *  brace — that EOF is success at this level, an error at every nested one). */
function collectRules(css: string): Rule[] {
  const out: Rule[] = [];
  let i = 0;
  let token = '';
  while (i < css.length) {
    const ch = css[i];
    if (ch === '{') {
      const selector = token.trim();
      if (selector.startsWith('@media')) {
        const stack = [selector.slice('@media'.length).trim()];
        i = readRules(css, i + 1, stack, out) + 1;
      } else {
        const end = skipBlock(css, i);
        if (!selector.startsWith('@')) {
          out.push({ selector, decls: css.slice(i + 1, end), media: [] });
        }
        i = end + 1;
      }
      token = '';
      continue;
    }
    if (ch === ';') {
      token = '';
      i++;
      continue;
    }
    token += ch;
    i++;
  }
  return out;
}

/** Index of the `}` matching the `{` at `open` (nesting-aware). */
function skipBlock(text: string, open: number): number {
  let depth = 0;
  for (let j = open; j < text.length; j++) {
    if (text[j] === '{') depth++;
    else if (text[j] === '}') {
      depth--;
      if (depth === 0) return j;
    }
  }
  throw new Error('unbalanced CSS block');
}

const rules: Rule[] = collectRules(mediaCardCss);

const isHoverRule = (r: Rule): boolean => r.selector.includes(':hover');
const isHoverGated = (r: Rule): boolean => r.media.some((m) => /hover:\s*hover/.test(m));
/** Reduced-motion CANCEL: declarations are ONLY transition/transform none. */
const CANCEL_ONLY = /^\s*(transition|transform)\s*:\s*none\s*(!\s*important)?\s*$/;
const isCancelRule = (r: Rule): boolean => {
  const decls = r.decls.split(';').filter((d) => d.trim() !== '');
  return decls.length > 0 && decls.every((d) => CANCEL_ONLY.test(d));
};

describe('MediaCard hover-gate law (CU-079)', () => {
  it('parses a non-trivial card stylesheet (anti-vacuous)', () => {
    // The reader must actually see the card's rules — an empty/broken parse
    // would make every law below trivially true. 7 = the CU-079 split sites
    // (lift, glow, poster-zoom, progress-hide, overlay, actions, iconbtn).
    expect(rules.some((r) => r.selector === '.media-card')).toBe(true);
    expect(rules.filter(isHoverRule).length).toBeGreaterThanOrEqual(7);
  });

  it('every :hover rule is gated by @media (hover: hover) or a reduced-motion cancel', () => {
    for (const r of rules.filter(isHoverRule)) {
      expect(
        isHoverGated(r) || isCancelRule(r),
        `ungated :hover rule "${r.selector}" (media: ${r.media.join(' / ') || 'top level'}; decls: ${r.decls.trim()}) — a D-pad synthetic hover latches it forever`,
      ).toBe(true);
    }
  });

  it('the keyboard arm keeps an UNGATED focus-within presence per state', () => {
    // The cure must not become "no focus styles on coarse pointers": each
    // hover-gated state needs its focus-within twin OUTSIDE any
    // (hover: hover) block.
    const ungatedFocusArms = new Set(
      rules
        .filter(
          (r) =>
            r.selector.includes(':focus-within') &&
            !r.media.some((m) => /hover:\s*hover/.test(m)),
        )
        .map((r) => r.selector),
    );
    expect(ungatedFocusArms.has('.media-card:focus-within')).toBe(true);
    expect(ungatedFocusArms.has('.media-card:focus-within::after')).toBe(true);
    expect(ungatedFocusArms.has('.media-card:focus-within .media-card__img.is-loaded')).toBe(true);
    expect(ungatedFocusArms.has('.media-card:focus-within .media-card__progress')).toBe(true);
    expect(ungatedFocusArms.has('.media-card:focus-within .media-card__overlay')).toBe(true);
    expect(ungatedFocusArms.has('.media-card:focus-within .media-card__actions')).toBe(true);
  });

  it('the coarse-pointer reveal block for touch still exists', () => {
    // The touch counterpart: a (hover: none) block arming overlay + actions —
    // CU-079 must not have quietly deleted the pre-existing cure above it.
    const hoverNone = rules.filter((r) => r.media.some((m) => /hover:\s*none/.test(m)));
    expect(hoverNone.length).toBeGreaterThanOrEqual(2);
  });
});
