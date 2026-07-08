/**
 * Pure spatial-navigation geometry for the TV/remote D-pad focus engine
 * (client-unification parity). No DOM, fully deterministic — the bulk of the
 * test coverage lives against this. The impure wiring (keydown listener,
 * registry, `getBoundingClientRect`) is in `./useSpatialNav`.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

export type Dir = 'up' | 'down' | 'left' | 'right';

export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface Candidate {
  id: string;
  rect: Rect;
}

/** Geometric center of a rect. */
export function rectCenter(r: Rect): { x: number; y: number } {
  return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
}

/** Small slack so a candidate sharing the origin's center edge isn't excluded by float jitter. */
const EPSILON = 0.5;
/** How heavily off-axis (cross-axis) drift is penalised relative to primary-axis distance. */
const CROSS_AXIS_WEIGHT = 2;
/** Bonus subtracted from the score when the candidate overlaps the origin on the cross axis. */
const OVERLAP_BONUS = 1e6;

/** True when ranges [aMin,aMax] and [bMin,bMax] overlap at all. */
function rangesOverlap(aMin: number, aMax: number, bMin: number, bMax: number): boolean {
  return aMin < bMax && bMin < aMax;
}

/**
 * Pick the best candidate in `dir` from `origin`, or null.
 *
 * Candidates whose center is not strictly in the half-plane of `dir` (relative
 * to the origin's center) are discarded. Among the rest, those that overlap the
 * origin on the perpendicular axis are strongly preferred (a large fixed bonus),
 * then the projection-biased distance `primaryAxisDistance + 2 * crossAxisPenalty`
 * is minimised. Ties break on smallest score, then smallest id — fully
 * deterministic.
 */
export function bestCandidate(origin: Rect, dir: Dir, candidates: Candidate[]): Candidate | null {
  const oc = rectCenter(origin);
  let best: Candidate | null = null;
  let bestScore = Infinity;

  for (const c of candidates) {
    const cc = rectCenter(c.rect);
    let primary: number;
    let cross: number;
    let overlaps: boolean;

    switch (dir) {
      case 'right':
        if (cc.x <= oc.x + EPSILON) continue;
        primary = cc.x - oc.x;
        cross = Math.abs(cc.y - oc.y);
        overlaps = rangesOverlap(origin.top, origin.bottom, c.rect.top, c.rect.bottom);
        break;
      case 'left':
        if (cc.x >= oc.x - EPSILON) continue;
        primary = oc.x - cc.x;
        cross = Math.abs(cc.y - oc.y);
        overlaps = rangesOverlap(origin.top, origin.bottom, c.rect.top, c.rect.bottom);
        break;
      case 'down':
        if (cc.y <= oc.y + EPSILON) continue;
        primary = cc.y - oc.y;
        cross = Math.abs(cc.x - oc.x);
        overlaps = rangesOverlap(origin.left, origin.right, c.rect.left, c.rect.right);
        break;
      case 'up':
        if (cc.y >= oc.y - EPSILON) continue;
        primary = oc.y - cc.y;
        cross = Math.abs(cc.x - oc.x);
        overlaps = rangesOverlap(origin.left, origin.right, c.rect.left, c.rect.right);
        break;
    }

    // Lower is better. Overlapping candidates get a big bonus so an aligned-but-
    // farther element beats a closer-but-off-axis one.
    let score = primary + CROSS_AXIS_WEIGHT * cross;
    if (overlaps) score -= OVERLAP_BONUS;

    if (score < bestScore || (score === bestScore && (best === null || c.id < best.id))) {
      bestScore = score;
      best = c;
    }
  }

  return best;
}
