/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import { rectCenter, bestCandidate, type Candidate, type Rect } from './spatial-nav';

/** A 10x10 box at (x,y) top-left. */
function box(x: number, y: number, w = 10, h = 10): Rect {
  return { left: x, top: y, right: x + w, bottom: y + h };
}
function cand(id: string, x: number, y: number, w = 10, h = 10): Candidate {
  return { id, rect: box(x, y, w, h) };
}

describe('rectCenter', () => {
  it('returns the geometric center', () => {
    expect(rectCenter(box(0, 0, 10, 20))).toEqual({ x: 5, y: 10 });
  });
});

describe('bestCandidate', () => {
  const origin = box(100, 100); // center (105,105)

  it('returns null for an empty set', () => {
    expect(bestCandidate(origin, 'right', [])).toBeNull();
  });

  it('picks the aligned neighbour in each direction', () => {
    const cands = [
      cand('right', 200, 100), // center x=205 > 105, y-aligned
      cand('left', 0, 100),
      cand('up', 100, 0),
      cand('down', 100, 200),
    ];
    expect(bestCandidate(origin, 'right', cands)?.id).toBe('right');
    expect(bestCandidate(origin, 'left', cands)?.id).toBe('left');
    expect(bestCandidate(origin, 'up', cands)?.id).toBe('up');
    expect(bestCandidate(origin, 'down', cands)?.id).toBe('down');
  });

  it('ignores candidates behind the origin (wrong half-plane)', () => {
    // only a left-side candidate; asking for 'right' yields null
    expect(bestCandidate(origin, 'right', [cand('l', 0, 100)])).toBeNull();
    expect(bestCandidate(origin, 'down', [cand('u', 100, 0)])).toBeNull();
  });

  it('prefers an axis-overlapping candidate over a closer off-axis one', () => {
    // 'near' is closer in raw distance but off-axis (no vertical overlap);
    // 'aligned' is farther horizontally but overlaps the origin's row.
    const near = cand('near', 130, 0); // center (135,5): up-and-right, no row overlap
    const aligned = cand('aligned', 300, 100); // center (305,105): same row, overlaps
    expect(bestCandidate(origin, 'right', [near, aligned])?.id).toBe('aligned');
  });

  it('among off-axis candidates, minimises projection-biased distance', () => {
    // neither overlaps the row; the one with smaller cross-axis drift wins
    const a = cand('a', 200, 60); // center (205,65): cross |65-105|=40
    const b = cand('b', 200, 0); // center (205,5):  cross |5-105|=100
    expect(bestCandidate(origin, 'right', [a, b])?.id).toBe('a');
  });

  it('breaks exact ties by smallest id', () => {
    // two identical rects in the right half-plane → same score, id 'a' < 'b'
    const a: Candidate = { id: 'a', rect: box(200, 100) };
    const b: Candidate = { id: 'b', rect: box(200, 100) };
    expect(bestCandidate(origin, 'right', [b, a])?.id).toBe('a');
    expect(bestCandidate(origin, 'right', [a, b])?.id).toBe('a');
  });
});
