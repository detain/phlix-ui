/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BACKDROP_ROW_NARROW_POSTER_WIDTH,
  COL_GAP,
  computeCardWidth,
  computeColumns,
  computeFixedRowHeight,
  computeRowHeight,
  computeWindow,
  effectiveItemCount,
  fixedRowContentHeight,
  labelHeightForRootFontSize,
  BACKDROP_ROW_HEIGHT,
  BACKDROP_ROW_POSTER_WIDTH,
  LABEL_HEIGHT,
  LABEL_HEIGHT_FIXED_PX,
  LIST_ROW_HEIGHT,
  LIST_ROW_POSTER_WIDTH,
  POSTER_RATIO,
  REM_BASIS_PX,
  ROW_GAP,
  shouldLoadMore,
} from './virtual-grid';

const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Every `<style>` block of an SFC, or the whole file for a plain stylesheet. */
function styleSheetsOf(source: string, file: string): string[] {
  const sheets = file.endsWith('.css')
    ? [source]
    : [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  // Comments out: several rules carry explanatory comments that quote the very
  // tokens/values they deliberately do not use.
  return sheets.map((s) => s.replace(/\/\*[\s\S]*?\*\//g, ''));
}

/**
 * Every gap declaration that applies to the `.media-grid` CONTAINER itself, from
 * anywhere in a stylesheet — the base rule, a `@media` arm, a `:deep()` override.
 *
 * S69 review r2, finding 3: the first version of this guard matched
 * `/\n\.media-grid \{([^}]*)\}/`, anchored on a newline plus zero indentation, so it
 * could only ever see the top-level rule. An indented `@media`-arm override (the very
 * pattern this step just established for row renderers) or a host `:deep(.media-grid)`
 * rule evaded it completely while desyncing the windowing math.
 *
 * Matches the INNERMOST `selector { … }` rules (a body containing `{` is skipped, so
 * an `@media` wrapper is never mistaken for a selector) and keeps only those whose
 * selector list has a part ENDING in `.media-grid` / `.media-grid--modifier`, i.e.
 * the container and not a descendant of it. `.media-grid-root` / `-sizer` are
 * different blocks and correctly excluded (single dash, not a BEM modifier).
 */
function mediaGridGapDeclarations(
  source: string,
  file = 'x.vue',
): { selector: string; property: string; value: string }[] {
  const out: { selector: string; property: string; value: string }[] = [];
  for (const sheet of styleSheetsOf(source, file)) {
    for (const rule of sheet.matchAll(/([^{}@;]+)\{([^{}]*)\}/g)) {
      const selector = rule[1].trim().replace(/\s+/g, ' ');
      const targetsContainer = selector.split(',').some((part) =>
        // unwrap Vue's :deep()/::v-deep()/:global()/::slotted() so the inner
        // selector is judged, then require the part to END at .media-grid
        /\.media-grid(?:--[\w-]+)?(?::{1,2}[\w-]+(?:\([^)]*\))?)*$/.test(
          part.replace(/:{1,2}(?:deep|v-deep|global|slotted)\(([^)]*)\)/g, '$1').trim(),
        ),
      );
      if (!targetsContainer) continue;
      for (const decl of rule[2].matchAll(/(?:^|[;{])\s*(gap|row-gap|column-gap)\s*:\s*([^;}]+)/g)) {
        out.push({ selector, property: decl[1], value: decl[2].trim() });
      }
    }
  }
  return out;
}

/**
 * S69 review, finding 7 — the ONE input that can change a fixed renderer's row
 * pitch. `ROW_GAP`/`COL_GAP` have to be absolute px (the windowing math runs before
 * layout exists), so `.media-grid`'s stylesheet has to agree with them rather than
 * the reverse. It used to declare `var(--space-6) var(--space-5)` = `1.5rem 1.25rem`,
 * so any root font-size other than 16px gave a real gap the math did not know about —
 * a per-row error that accumulates through `padTop`/`totalHeight` (~1200px over 200
 * rows at a 20px root) and is worst for the pinned-row renderers, whose whole row
 * height is constants. This reads the declaration back so the pair cannot drift again.
 */
describe('virtual-grid — the gap constants match MediaGrid’s stylesheet', () => {
  const mediaGridSfc = readFileSync(join(SRC_DIR, 'components/MediaGrid.vue'), 'utf8');

  it('declares the row/column gap as the SAME px the windowing math assumes', () => {
    const decls = mediaGridGapDeclarations(mediaGridSfc, 'MediaGrid.vue');
    expect(decls, 'could not find a .media-grid gap declaration in MediaGrid.vue').toHaveLength(1);
    expect(decls[0].property).toBe('gap');
    expect(decls[0].value).toBe(`${ROW_GAP}px ${COL_GAP}px`);
  });

  /**
   * The broadened half of the guard (S69 review r2, finding 3). A gap override does
   * not have to live in MediaGrid.vue's base rule to desync the windowing math — an
   * `@media` arm in the same file, or a `:deep(.media-grid)` rule in ANY component
   * that hosts a grid, does it just as well. So the whole of `src/` is swept, and
   * every declaration that reaches the container has to be the pinned px pair.
   */
  it('has no OTHER .media-grid gap anywhere in src/ — no @media arm, no :deep() override', () => {
    const files = readdirSync(SRC_DIR, { recursive: true, encoding: 'utf8' }).filter(
      (f) => (f.endsWith('.vue') || f.endsWith('.css')) && !f.endsWith('.d.ts'),
    );
    const found = files.flatMap((f) =>
      mediaGridGapDeclarations(readFileSync(join(SRC_DIR, f), 'utf8'), f).map((d) => ({
        ...d,
        file: f,
      })),
    );
    expect(found.length, 'expected at least MediaGrid.vue’s own declaration').toBeGreaterThan(0);
    for (const d of found) {
      const expected =
        d.property === 'gap'
          ? `${ROW_GAP}px ${COL_GAP}px`
          : `${d.property === 'row-gap' ? ROW_GAP : COL_GAP}px`;
      expect(
        d.value,
        `${d.file} declares \`${d.property}: ${d.value}\` for \`${d.selector}\`, which the ` +
          'windowing math does not know about — it assumes ROW_GAP/COL_GAP',
      ).toBe(expected);
      // --space-6 / --space-5 are 1.5rem / 1.25rem: correct spacing tokens, wrong tool
      // for a value a pure arithmetic module has to know as a number.
      expect(d.value).not.toContain('var(--space-');
    }
  });

  /**
   * The extractor is the guard, so it gets its own tests — otherwise "no override
   * found" is indistinguishable from "cannot see overrides", which is exactly how the
   * narrow version passed while an `@media` arm could slip through. S70 copies this
   * pattern, so the holes have to be closed here.
   */
  describe('the extractor itself', () => {
    const pinned = `<style scoped>\n.media-grid {\n  gap: ${ROW_GAP}px ${COL_GAP}px;\n}\n</style>`;

    it('sees a gap override hidden inside a @media arm', () => {
      const withArm = `${pinned.replace('</style>', '')}
@media (max-width: 720px) {
  .media-grid {
    gap: 30px 25px;
  }
}
</style>`;
      const values = mediaGridGapDeclarations(withArm).map((d) => d.value);
      expect(values, 'an indented @media-arm override must not evade the guard').toContain(
        '30px 25px',
      );
      expect(values).toHaveLength(2);
    });

    it('sees a host `:deep(.media-grid)` override and a single-axis one', () => {
      const host = `<style scoped>
.library :deep(.media-grid) {
  row-gap: 40px;
}
.wrap :deep(.media-grid--skeleton) { column-gap: 8px; }
</style>`;
      expect(mediaGridGapDeclarations(host)).toEqual([
        { selector: '.library :deep(.media-grid)', property: 'row-gap', value: '40px' },
        { selector: '.wrap :deep(.media-grid--skeleton)', property: 'column-gap', value: '8px' },
      ]);
    });

    it('ignores gaps that are NOT on the grid container', () => {
      const noise = `<style scoped>
/* a comment quoting gap: 99px 99px must not count */
.media-grid-root { gap: 1px; }
.media-grid-sizer { gap: 2px; }
.media-grid .media-grid-empty { gap: 3px; }
.media-grid > .cell { gap: 4px; }
.media-grid { width: 100%; }
</style>`;
      expect(mediaGridGapDeclarations(noise)).toEqual([]);
    });

    it('reads only <style> blocks, so prose and script strings cannot trip it', () => {
      const sfc = `<script setup lang="ts">
// \`.media-grid { gap: 99px 99px }\` in a comment is documentation, not CSS
const css = '.media-grid { gap: 77px 77px }';
</script>
${pinned}`;
      expect(mediaGridGapDeclarations(sfc).map((d) => d.value)).toEqual([
        `${ROW_GAP}px ${COL_GAP}px`,
      ]);
    });
  });
});

/**
 * The OTHER root-font-size input to `computeRowHeight` (S69 review r2, finding 2a).
 * The gap was fixed by pinning px in the stylesheet; the label block cannot be,
 * because it is text — pinning its height clips a viewer's larger type and pinning
 * its font sizes opts card captions out of font scaling. So the caption stays
 * rem-valued and the MATH scales. These tests pin both halves: the scaling function,
 * and the four `MediaCard.vue` declarations LABEL_HEIGHT is derived from (the same
 * stylesheet-readback style as the gap guard above, so a caption restyle cannot
 * silently invalidate the constant).
 */
describe('virtual-grid — labelHeightForRootFontSize', () => {
  it('is exactly LABEL_HEIGHT at the 16px root the constant was derived at', () => {
    expect(labelHeightForRootFontSize(REM_BASIS_PX)).toBe(LABEL_HEIGHT);
  });

  it('scales the rem-derived part and leaves the one px part alone', () => {
    // (56 - 2) * 20/16 + 2 = 69.5 — the caption is really ~64.6px at a 20px root, so
    // the ~4px of slack the constant carries at 16px stays proportional.
    expect(labelHeightForRootFontSize(20)).toBeCloseTo(
      (LABEL_HEIGHT - LABEL_HEIGHT_FIXED_PX) * (20 / REM_BASIS_PX) + LABEL_HEIGHT_FIXED_PX,
      6,
    );
    expect(labelHeightForRootFontSize(20)).toBeCloseTo(69.5, 6);
    // and it is strictly monotonic, so a bigger root can never reserve LESS
    expect(labelHeightForRootFontSize(12)).toBeLessThan(LABEL_HEIGHT);
    expect(labelHeightForRootFontSize(24)).toBeGreaterThan(LABEL_HEIGHT);
  });

  it('falls back to LABEL_HEIGHT for the values jsdom/SSR actually produce', () => {
    // jsdom reports the root font size as "medium" → NaN; SSR has no CSSOM at all.
    expect(labelHeightForRootFontSize(Number.NaN)).toBe(LABEL_HEIGHT);
    expect(labelHeightForRootFontSize(0)).toBe(LABEL_HEIGHT);
    expect(labelHeightForRootFontSize(-16)).toBe(LABEL_HEIGHT);
    expect(labelHeightForRootFontSize(Number.POSITIVE_INFINITY)).toBe(LABEL_HEIGHT);
    expect(labelHeightForRootFontSize(null)).toBe(LABEL_HEIGHT);
    expect(labelHeightForRootFontSize(undefined)).toBe(LABEL_HEIGHT);
  });

  it('still matches the MediaCard caption rules LABEL_HEIGHT is derived from', () => {
    const card = readFileSync(join(SRC_DIR, 'components/MediaCard.vue'), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    const ruleOf = (selector: string): string =>
      new RegExp(`\\.media-card__${selector} \\{([^}]*)\\}`).exec(card)?.[1] ?? '';
    const caption = ruleOf('caption');
    const title = ruleOf('caption-title');
    const sub = ruleOf('caption-sub');
    // 0.75rem top padding + (0.9375rem x 1.3) + (0.75rem x 1.55) + 2px = 52.1px at a
    // 16px root, which is what the 56 (and the rem/px split) is derived from. Change
    // any of these four and LABEL_HEIGHT / LABEL_HEIGHT_FIXED_PX must be re-derived.
    expect(caption, 'the caption block must still be two single lines').toContain(
      'padding: var(--space-3) var(--space-1) 0;',
    );
    expect(title).toContain('font-size: var(--text-base);');
    expect(title).toContain('line-height: var(--leading-snug);');
    expect(sub).toContain('font-size: var(--text-xs);');
    expect(sub).toContain(`margin-top: ${LABEL_HEIGHT_FIXED_PX}px;`);
    // …and nothing in there may be px-valued except that margin, or the rem/px split
    // labelHeightForRootFontSize() applies would be wrong.
    expect(`${caption}${title}`).not.toMatch(/\d+px/);
  });
});

describe('virtual-grid — computeColumns', () => {
  it('mirrors CSS auto-fill: floor((width + gap) / (cardSize + gap))', () => {
    // (1000 + 20) / (180 + 20) = 5.1 → 5 columns
    expect(computeColumns(1000, 180, 20)).toBe(5);
    // (1280 + 20) / (200 + 20) = 5.9 → 5 columns
    expect(computeColumns(1280, 200, 20)).toBe(5);
    // exactly fits 6 tracks
    expect(computeColumns(1340, 200, 20)).toBe(6);
  });

  it('never returns fewer than one column even for tiny / zero widths', () => {
    expect(computeColumns(100, 180, 20)).toBe(1);
    expect(computeColumns(0, 180, 20)).toBe(1);
    expect(computeColumns(-50, 180, 20)).toBe(1);
    expect(computeColumns(1000, 0, 20)).toBe(1);
  });

  it('defaults the gap to COL_GAP', () => {
    expect(computeColumns(1000, 180)).toBe(computeColumns(1000, 180, COL_GAP));
  });
});

describe('virtual-grid — computeCardWidth', () => {
  it('divides the remaining width after inter-card gaps', () => {
    // (1000 - 20*4) / 5 = 184
    expect(computeCardWidth(1000, 5, 20)).toBe(184);
    // single column = full width
    expect(computeCardWidth(800, 1, 20)).toBe(800);
  });

  it('returns 0 for degenerate inputs', () => {
    expect(computeCardWidth(1000, 0, 20)).toBe(0);
    expect(computeCardWidth(0, 5, 20)).toBe(0);
  });
});

describe('virtual-grid — computeRowHeight', () => {
  it('is poster (2:3) + label block + row gap', () => {
    // 184 * 1.5 + 56 + 24 = 356
    expect(computeRowHeight(184, LABEL_HEIGHT, ROW_GAP)).toBe(184 * 1.5 + LABEL_HEIGHT + ROW_GAP);
    expect(computeRowHeight(184)).toBe(356);
  });

  it('returns 0 for a zero-width card', () => {
    expect(computeRowHeight(0)).toBe(0);
  });
});

// S68 — the list renderer's rows are a FIXED height, so the 2:3 poster ratio must
// NOT be applied to the (full-width) row. These guard exactly that.
describe('virtual-grid — computeFixedRowHeight (S68 non-poster rows)', () => {
  it('is the row content height plus the row gap beneath it', () => {
    expect(computeFixedRowHeight(180)).toBe(204);
    expect(computeFixedRowHeight(180)).toBe(180 + ROW_GAP);
  });

  /**
   * The gap is a single constant, added here and removed by
   * `fixedRowContentHeight()` (which is what MediaGrid uses for BOTH its
   * `grid-auto-rows` track height and its placeholder cells). It is deliberately
   * NOT a parameter: `.media-grid`'s CSS gap is fixed, so a caller-supplied gap
   * could only ever disagree with the layout — a correct row height with
   * mis-sized cells (S68 review, LOW-5).
   */
  it('round-trips exactly with fixedRowContentHeight (one gap, one place)', () => {
    for (const content of [1, 60, 180, LIST_ROW_HEIGHT, 999]) {
      expect(fixedRowContentHeight(computeFixedRowHeight(content))).toBe(content);
    }
    expect(fixedRowContentHeight(204)).toBe(180);
    expect(fixedRowContentHeight(204)).toBe(204 - ROW_GAP);
    // never negative, so a nonsense row height can't produce a negative cell
    expect(fixedRowContentHeight(0)).toBe(0);
    expect(fixedRowContentHeight(10)).toBe(0);
  });

  it('returns 0 for a zero/negative content height', () => {
    expect(computeFixedRowHeight(0)).toBe(0);
    expect(computeFixedRowHeight(-40)).toBe(0);
  });

  it('does NOT scale with the row width, unlike computeRowHeight', () => {
    // A one-column list row IS the container width (computeCardWidth(W, 1)).
    const rowWidth = computeCardWidth(1400, 1, COL_GAP); // 1400
    const posterDerived = computeRowHeight(rowWidth); // 1400 * 1.5 + 56 + 24
    const listRow = computeFixedRowHeight(LIST_ROW_HEIGHT);
    expect(posterDerived).toBe(1400 * POSTER_RATIO + LABEL_HEIGHT + ROW_GAP);
    expect(listRow).toBe(LIST_ROW_HEIGHT + ROW_GAP);
    // the whole point: the poster formula would reserve a ~10x too tall row
    expect(posterDerived).toBeGreaterThan(listRow * 10);
  });

  it('derives LIST_ROW_HEIGHT from the FIXED poster column width, not the row width', () => {
    expect(LIST_ROW_POSTER_WIDTH).toBeGreaterThan(0);
    expect(LIST_ROW_HEIGHT).toBe(LIST_ROW_POSTER_WIDTH * POSTER_RATIO);
    // stays constant however wide the viewport gets
    expect(computeFixedRowHeight(LIST_ROW_HEIGHT)).toBe(
      computeFixedRowHeight(LIST_ROW_POSTER_WIDTH * POSTER_RATIO),
    );
  });

  it('windows a one-column list correctly (row index == item index)', () => {
    const rowHeight = computeFixedRowHeight(LIST_ROW_HEIGHT); // 204
    const r = computeWindow({
      scrollTop: 20 * rowHeight,
      viewportHeight: 768,
      rowHeight,
      columns: 1,
      itemCount: 5000,
      overscan: 2,
    });
    expect(r.rowCount).toBe(5000);
    expect(r.totalHeight).toBe(5000 * rowHeight);
    // firstVisible = 20 → startRow 18; visibleRows = ceil(768/204)+1 = 5
    expect(r.startRow).toBe(18);
    expect(r.startIndex).toBe(18); // one column → index == row
    expect(r.endRow).toBe(20 + 5 + 2);
    expect(r.endIndex).toBe(27);
    expect(r.padTop).toBe(18 * rowHeight);
  });
});

// S69 — the backdrop hero strip is the SECOND fixed-height renderer. Same
// constraint as the list row, at a different size: the 2:3 ratio applies to the
// strip's FIXED poster column, never to the full-width row.
describe('virtual-grid — backdrop hero strip geometry (S69)', () => {
  it('derives BACKDROP_ROW_HEIGHT from the FIXED poster column width', () => {
    expect(BACKDROP_ROW_POSTER_WIDTH).toBe(200);
    expect(BACKDROP_ROW_HEIGHT).toBe(BACKDROP_ROW_POSTER_WIDTH * POSTER_RATIO);
    expect(BACKDROP_ROW_HEIGHT).toBe(300);
  });

  it('is a taller strip than a list row, but still nowhere near a full-width poster', () => {
    // The two fixed-height renderers must not accidentally collapse to one size…
    expect(BACKDROP_ROW_HEIGHT).toBeGreaterThan(LIST_ROW_HEIGHT);
    // …and the strip height must NOT be the poster formula applied to the row: at
    // a 1400px-wide one-column row that reserves ~2100px per item, so a 5000-item
    // library would size its sizer ~7x too tall and every padTop would be wrong.
    const posterDerived = computeRowHeight(computeCardWidth(1400, 1, COL_GAP));
    expect(posterDerived).toBeGreaterThan(computeFixedRowHeight(BACKDROP_ROW_HEIGHT) * 6);
  });

  it('feeds MediaGrid a row height of exactly the strip plus one row gap', () => {
    expect(computeFixedRowHeight(BACKDROP_ROW_HEIGHT)).toBe(BACKDROP_ROW_HEIGHT + ROW_GAP);
    expect(computeFixedRowHeight(BACKDROP_ROW_HEIGHT)).toBe(324);
    // the cell inside the pinned row track is the strip height again (no drift)
    expect(fixedRowContentHeight(computeFixedRowHeight(BACKDROP_ROW_HEIGHT))).toBe(
      BACKDROP_ROW_HEIGHT,
    );
  });

  /**
   * S69 review, finding 2. The narrow arm changes the poster TRACK only. If it ever
   * derived a second height from that width, the rendered row pitch would become
   * viewport-dependent while `MediaGrid` is still fed one constant — the exact
   * layout/windowing desync the fixed-height renderers exist to avoid.
   */
  it('narrows the poster column for small viewports WITHOUT changing the row height', () => {
    expect(BACKDROP_ROW_NARROW_POSTER_WIDTH).toBe(LIST_ROW_POSTER_WIDTH);
    expect(BACKDROP_ROW_NARROW_POSTER_WIDTH).toBeLessThan(BACKDROP_ROW_POSTER_WIDTH);
    // the strip height is NOT re-derived from the narrow width…
    expect(BACKDROP_ROW_HEIGHT).not.toBe(BACKDROP_ROW_NARROW_POSTER_WIDTH * POSTER_RATIO);
    // …so the number MediaGrid windows on is the same at every viewport
    expect(computeFixedRowHeight(BACKDROP_ROW_HEIGHT)).toBe(324);
  });

  it('windows a one-column backdrop list correctly (row index == item index)', () => {
    const rowHeight = computeFixedRowHeight(BACKDROP_ROW_HEIGHT); // 324
    const r = computeWindow({
      scrollTop: 10 * rowHeight,
      viewportHeight: 900,
      rowHeight,
      columns: 1,
      itemCount: 2000,
      overscan: 2,
    });
    expect(r.rowCount).toBe(2000);
    expect(r.totalHeight).toBe(2000 * 324); // 648000, NOT the poster-derived height
    // firstVisible = 10 → startRow 8; visibleRows = ceil(900/324)+1 = 4
    expect(r.startRow).toBe(8);
    expect(r.startIndex).toBe(8); // one column → index == row
    expect(r.endRow).toBe(10 + 4 + 2);
    expect(r.endIndex).toBe(16);
    expect(r.padTop).toBe(8 * 324);
  });
});

describe('virtual-grid — computeWindow', () => {
  const base = {
    viewportHeight: 768,
    rowHeight: 356,
    columns: 5,
    overscan: 2,
  };

  it('windows only the visible rows (plus overscan) at the top of a huge list', () => {
    const r = computeWindow({ ...base, scrollTop: 0, itemCount: 5000 });
    // 5000 items / 5 cols = 1000 rows; total height = 1000 * 356
    expect(r.rowCount).toBe(1000);
    expect(r.totalHeight).toBe(1000 * 356);
    // firstVisible = 0; visibleRows = ceil(768/356)+1 = 4; +overscan 2 = rows [0,6)
    expect(r.startRow).toBe(0);
    expect(r.endRow).toBe(6);
    expect(r.startIndex).toBe(0);
    expect(r.endIndex).toBe(30); // 6 rows * 5 cols
    expect(r.padTop).toBe(0);
    // the key invariant: a tiny window regardless of item count
    expect(r.endIndex - r.startIndex).toBeLessThanOrEqual(30);
  });

  it('slides the window and offsets padTop when scrolled into the middle', () => {
    // scroll 100 rows down: scrollTop = 100 * 356 = 35600
    const r = computeWindow({ ...base, scrollTop: 100 * 356, itemCount: 5000 });
    // firstVisible = 100; startRow = 98 (overscan), endRow = 100 + 4 + 2 = 106
    expect(r.startRow).toBe(98);
    expect(r.endRow).toBe(106);
    expect(r.startIndex).toBe(98 * 5);
    expect(r.endIndex).toBe(106 * 5);
    expect(r.padTop).toBe(98 * 356);
    // still a constant-size window
    expect(r.endIndex - r.startIndex).toBe(8 * 5);
  });

  it('clamps the window to the last row near the end of the list', () => {
    // scroll to the very bottom
    const r = computeWindow({ ...base, scrollTop: 999 * 356, itemCount: 5000 });
    expect(r.endRow).toBe(1000); // never past rowCount
    expect(r.endIndex).toBe(5000); // never past itemCount
  });

  it('handles a partial final row (itemCount not divisible by columns)', () => {
    const r = computeWindow({ ...base, scrollTop: 1_000_000, itemCount: 5002 });
    expect(r.rowCount).toBe(Math.ceil(5002 / 5)); // 1001 rows
    expect(r.endIndex).toBe(5002); // clamped to itemCount, not 1001*5
  });

  it('returns the whole set as a no-op window when rowHeight is unknown (0)', () => {
    const r = computeWindow({ ...base, rowHeight: 0, scrollTop: 0, itemCount: 40 });
    expect(r.startIndex).toBe(0);
    expect(r.endIndex).toBe(40);
    expect(r.padTop).toBe(0);
    expect(r.totalHeight).toBe(0);
  });

  it('handles an empty list', () => {
    const r = computeWindow({ ...base, scrollTop: 0, itemCount: 0 });
    expect(r.rowCount).toBe(0);
    expect(r.startIndex).toBe(0);
    expect(r.endIndex).toBe(0);
    expect(r.totalHeight).toBe(0);
  });

  it('treats columns < 1 as a single column', () => {
    const r = computeWindow({ ...base, columns: 0, scrollTop: 0, itemCount: 10 });
    expect(r.rowCount).toBe(10); // 10 items, 1 col
  });
});

describe('virtual-grid — flat memory (R6.3)', () => {
  // R6.3 AC: the virtual scroller's memory stays flat — only a windowful of rows
  // is ever rendered, regardless of how far you scroll or how large the library is.
  const cfg = { viewportHeight: 768, rowHeight: 356, columns: 5, overscan: 2 };
  // Rows ever rendered = the rows intersecting the viewport (+1 partial) plus the
  // overscan band above AND below — a constant, independent of the item count.
  const visibleRows = Math.ceil(cfg.viewportHeight / cfg.rowHeight) + 1; // 4
  const maxWindowItems = (visibleRows + 2 * cfg.overscan) * cfg.columns; // 8 rows × 5 = 40

  it('never renders more than (visibleRows + 2·overscan)·columns items anywhere in a 5000-item list', () => {
    const itemCount = 5000;
    const totalHeight = Math.ceil(itemCount / cfg.columns) * cfg.rowHeight;
    let maxSeen = 0;
    // sweep the entire scrollable range (fine-grained — catches any row boundary)
    for (let step = 0; step <= 400; step++) {
      const scrollTop = (totalHeight * step) / 400;
      const { startIndex, endIndex } = computeWindow({ ...cfg, scrollTop, itemCount });
      const windowSize = endIndex - startIndex;
      expect(windowSize).toBeGreaterThan(0); // always renders the visible band
      expect(windowSize).toBeLessThanOrEqual(maxWindowItems); // never grows unbounded
      maxSeen = Math.max(maxSeen, windowSize);
    }
    // the window genuinely reaches the cap mid-list (the bound isn't trivially loose)
    expect(maxSeen).toBe(maxWindowItems);
  });

  it('renders the same-size window for a 5k and a 500k library at the same scroll position', () => {
    const scrollTop = cfg.rowHeight * 100; // 100 rows down — well inside both
    const small = computeWindow({ ...cfg, scrollTop, itemCount: 5_000 });
    const huge = computeWindow({ ...cfg, scrollTop, itemCount: 500_000 });
    // identical DOM footprint — memory does not grow with the library size
    expect(huge.endIndex - huge.startIndex).toBe(small.endIndex - small.startIndex);
    // only the spacer height (totalHeight) scales with the library, not the slice
    expect(huge.totalHeight).toBeGreaterThan(small.totalHeight);
  });
});

describe('virtual-grid — effectiveItemCount', () => {
  it('uses the server total when it exceeds the loaded count (pre-sizes the page)', () => {
    expect(effectiveItemCount(50, 1200)).toBe(1200);
  });
  it('never returns less than what is already loaded', () => {
    expect(effectiveItemCount(80, 50)).toBe(80);
    expect(effectiveItemCount(80, 80)).toBe(80);
  });
  it('falls back to the loaded count when total is absent/invalid', () => {
    expect(effectiveItemCount(40)).toBe(40);
    expect(effectiveItemCount(40, null)).toBe(40);
    expect(effectiveItemCount(40, Number.NaN)).toBe(40);
  });
  it('truncates a fractional total', () => {
    expect(effectiveItemCount(0, 99.9)).toBe(99);
  });
});

describe('virtual-grid — shouldLoadMore', () => {
  const base = { hasMore: true, loading: false, loadingMore: false };
  it('loads when the window reaches the loaded edge and more remain', () => {
    expect(shouldLoadMore(50, 50, base)).toBe(true);
    expect(shouldLoadMore(60, 50, base)).toBe(true);
  });
  it('does not load while the window is still within loaded items', () => {
    expect(shouldLoadMore(40, 50, base)).toBe(false);
  });
  it('does not load when nothing remains or a fetch is in flight', () => {
    expect(shouldLoadMore(50, 50, { ...base, hasMore: false })).toBe(false);
    expect(shouldLoadMore(50, 50, { ...base, loading: true })).toBe(false);
    expect(shouldLoadMore(50, 50, { ...base, loadingMore: true })).toBe(false);
  });
});
