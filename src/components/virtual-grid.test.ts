import { describe, it, expect } from 'vitest';
import {
  COL_GAP,
  computeCardWidth,
  computeColumns,
  computeRowHeight,
  computeWindow,
  LABEL_HEIGHT,
  ROW_GAP,
} from './virtual-grid';

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
